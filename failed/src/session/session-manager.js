/**
 * @fileoverview Session Management System - Main Coordinator
 * 
 * This module provides the primary interface for managing conversation sessions
 * including creation, persistence, recovery, and lifecycle management.
 */

const crypto = require('crypto');
const path = require('path');
const os = require('os');
const { EventEmitter } = require('events');

const ConversationManager = require('./conversation');
const CheckpointManager = require('./checkpoint');
const ContextManager = require('./context-manager');
const PersistenceLayer = require('./persistence');

/**
 * Main session management coordinator
 * Handles session lifecycle, state management, and coordination between subsystems
 */
class SessionManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            sessionDir: options.sessionDir || path.join(os.homedir(), '.claude', 'sessions'),
            maxActiveSessions: options.maxActiveSessions || 10,
            checkpointInterval: options.checkpointInterval || 300000, // 5 minutes
            maxMessageHistory: options.maxMessageHistory || 1000,
            enableAutoCleanup: options.enableAutoCleanup !== false,
            compressionEnabled: options.compressionEnabled !== false,
            ...options
        };

        // Initialize subsystems
        this.persistence = new PersistenceLayer({
            baseDir: this.options.sessionDir,
            compressionEnabled: this.options.compressionEnabled
        });
        
        this.conversation = new ConversationManager({
            maxHistory: this.options.maxMessageHistory
        });
        
        this.checkpoint = new CheckpointManager({
            persistence: this.persistence,
            interval: this.options.checkpointInterval
        });
        
        this.context = new ContextManager();

        // Active sessions cache
        this.activeSessions = new Map();
        this.currentSessionId = null;
        
        // Metrics and monitoring
        this.metrics = {
            sessionsCreated: 0,
            messagesProcessed: 0,
            checkpointsCreated: 0,
            sessionsRestored: 0
        };

        this._setupEventHandlers();
        this._startPeriodicCheckpointing();
    }

    /**
     * Creates a new conversation session
     * @param {Object} options - Session creation options
     * @param {string} options.title - Optional session title
     * @param {string} options.model - AI model to use
     * @param {string} options.projectPath - Associated project directory
     * @param {Object} options.initialContext - Initial conversation context
     * @returns {Promise<string>} Session ID
     */
    async createSession(options = {}) {
        const sessionId = this._generateSessionId();
        const timestamp = new Date().toISOString();

        const sessionData = {
            session_id: sessionId,
            created_at: timestamp,
            updated_at: timestamp,
            title: options.title || this._generateTitle(options.initialPrompt),
            conversation: [],
            state: {
                model: options.model || 'claude-3-sonnet',
                context: options.initialContext || {},
                tools: options.availableTools || [],
                permissions: options.permissions || {}
            },
            metadata: {
                project_path: options.projectPath || process.cwd(),
                git_info: await this._getGitInfo(),
                environment: this._getEnvironmentSnapshot()
            },
            version: '1.0'
        };

        // Initialize conversation manager for this session
        await this.conversation.initialize(sessionId, sessionData.conversation);
        
        // Set up context
        await this.context.initialize(sessionId, sessionData.state.context);
        
        // Save initial session state
        await this.persistence.saveSession(sessionId, sessionData);
        
        // Add to active sessions
        this.activeSessions.set(sessionId, sessionData);
        this.currentSessionId = sessionId;
        
        this.metrics.sessionsCreated++;
        this.emit('session:created', { sessionId, sessionData });
        
        return sessionId;
    }

    /**
     * Resumes an existing session
     * @param {string} sessionId - Session to resume
     * @returns {Promise<Object>} Session data
     */
    async resumeSession(sessionId) {
        try {
            // Check if already active
            if (this.activeSessions.has(sessionId)) {
                this.currentSessionId = sessionId;
                return this.activeSessions.get(sessionId);
            }

            // Load from persistence
            const sessionData = await this.persistence.loadSession(sessionId);
            if (!sessionData) {
                throw new Error(`Session ${sessionId} not found`);
            }

            // Restore conversation state
            await this.conversation.initialize(sessionId, sessionData.conversation);
            
            // Restore context
            await this.context.initialize(sessionId, sessionData.state.context);
            
            // Add to active sessions
            this.activeSessions.set(sessionId, sessionData);
            this.currentSessionId = sessionId;
            
            // Update last accessed time
            sessionData.updated_at = new Date().toISOString();
            await this.persistence.updateSessionMetadata(sessionId, {
                updated_at: sessionData.updated_at
            });

            this.metrics.sessionsRestored++;
            this.emit('session:resumed', { sessionId, sessionData });
            
            return sessionData;
        } catch (error) {
            this.emit('error', { type: 'session:resume_failed', sessionId, error });
            throw error;
        }
    }

    /**
     * Adds a message to the current conversation
     * @param {Object} message - Message to add
     * @param {string} message.role - Message role (user/assistant/system)
     * @param {string} message.content - Message content
     * @param {Object} message.metadata - Optional message metadata
     * @returns {Promise<void>}
     */
    async addMessage(message) {
        if (!this.currentSessionId) {
            throw new Error('No active session. Create or resume a session first.');
        }

        const sessionData = this.activeSessions.get(this.currentSessionId);
        if (!sessionData) {
            throw new Error('Current session not found in active sessions');
        }

        // Add timestamp and ID to message
        const enrichedMessage = {
            id: this._generateMessageId(),
            timestamp: new Date().toISOString(),
            ...message
        };

        // Add to conversation manager
        await this.conversation.addMessage(this.currentSessionId, enrichedMessage);
        
        // Update session data
        sessionData.conversation.push(enrichedMessage);
        sessionData.updated_at = enrichedMessage.timestamp;
        
        // Persist the message
        await this.persistence.appendMessage(this.currentSessionId, enrichedMessage);
        
        // Update session metadata
        await this.persistence.updateSessionMetadata(this.currentSessionId, {
            updated_at: sessionData.updated_at,
            message_count: sessionData.conversation.length
        });

        this.metrics.messagesProcessed++;
        this.emit('message:added', { 
            sessionId: this.currentSessionId, 
            message: enrichedMessage 
        });

        // Trigger checkpoint if needed
        if (this._shouldCreateCheckpoint(sessionData)) {
            await this.checkpoint.createAutoCheckpoint(this.currentSessionId, sessionData);
        }
    }

    /**
     * Gets conversation history for a session
     * @param {string} sessionId - Session ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Message history
     */
    async getConversationHistory(sessionId, options = {}) {
        if (this.activeSessions.has(sessionId)) {
            const sessionData = this.activeSessions.get(sessionId);
            return this.conversation.getHistory(sessionId, options);
        }
        
        return await this.persistence.getConversationHistory(sessionId, options);
    }

    /**
     * Lists all sessions
     * @param {Object} filters - Filter options
     * @returns {Promise<Array>} Session list
     */
    async listSessions(filters = {}) {
        const sessions = await this.persistence.listSessions(filters);
        
        // Enrich with active session status
        return sessions.map(session => ({
            ...session,
            is_active: this.activeSessions.has(session.session_id),
            is_current: session.session_id === this.currentSessionId
        }));
    }

    /**
     * Searches sessions by content
     * @param {string} query - Search query
     * @param {Object} filters - Additional filters
     * @returns {Promise<Array>} Search results
     */
    async searchSessions(query, filters = {}) {
        return await this.persistence.searchSessions(query, filters);
    }

    /**
     * Creates a manual checkpoint
     * @param {string} label - Checkpoint label
     * @param {string} sessionId - Optional session ID (defaults to current)
     * @returns {Promise<string>} Checkpoint ID
     */
    async createCheckpoint(label, sessionId = null) {
        const targetSessionId = sessionId || this.currentSessionId;
        if (!targetSessionId) {
            throw new Error('No session specified and no current session active');
        }

        const sessionData = this.activeSessions.get(targetSessionId) || 
                           await this.persistence.loadSession(targetSessionId);
        
        if (!sessionData) {
            throw new Error(`Session ${targetSessionId} not found`);
        }

        return await this.checkpoint.createManualCheckpoint(targetSessionId, sessionData, label);
    }

    /**
     * Restores session from a checkpoint
     * @param {string} checkpointId - Checkpoint to restore from
     * @returns {Promise<string>} Restored session ID
     */
    async restoreFromCheckpoint(checkpointId) {
        return await this.checkpoint.restoreFromCheckpoint(checkpointId);
    }

    /**
     * Closes a session
     * @param {string} sessionId - Session to close
     * @returns {Promise<void>}
     */
    async closeSession(sessionId) {
        if (this.activeSessions.has(sessionId)) {
            const sessionData = this.activeSessions.get(sessionId);
            
            // Create final checkpoint
            await this.checkpoint.createAutoCheckpoint(sessionId, sessionData, 'session_close');
            
            // Clean up resources
            await this.conversation.cleanup(sessionId);
            await this.context.cleanup(sessionId);
            
            // Remove from active sessions
            this.activeSessions.delete(sessionId);
            
            if (this.currentSessionId === sessionId) {
                this.currentSessionId = null;
            }
            
            this.emit('session:closed', { sessionId });
        }
    }

    /**
     * Deletes a session permanently
     * @param {string} sessionId - Session to delete
     * @returns {Promise<void>}
     */
    async deleteSession(sessionId) {
        // Close if active
        if (this.activeSessions.has(sessionId)) {
            await this.closeSession(sessionId);
        }
        
        // Delete from persistence
        await this.persistence.deleteSession(sessionId);
        
        // Delete associated checkpoints
        await this.checkpoint.deleteSessionCheckpoints(sessionId);
        
        this.emit('session:deleted', { sessionId });
    }

    /**
     * Gets current session information
     * @returns {Object|null} Current session data
     */
    getCurrentSession() {
        if (!this.currentSessionId) {
            return null;
        }
        
        return this.activeSessions.get(this.currentSessionId);
    }

    /**
     * Gets session metrics and statistics
     * @returns {Object} Metrics object
     */
    getMetrics() {
        return {
            ...this.metrics,
            activeSessions: this.activeSessions.size,
            currentSessionId: this.currentSessionId,
            uptime: process.uptime()
        };
    }

    /**
     * Performs cleanup of old sessions and temporary data
     * @param {Object} options - Cleanup options
     * @returns {Promise<Object>} Cleanup results
     */
    async cleanup(options = {}) {
        const results = {
            sessionsDeleted: 0,
            checkpointsDeleted: 0,
            bytesFreed: 0
        };

        if (this.options.enableAutoCleanup) {
            const cleanupResults = await this.persistence.cleanup(options);
            Object.assign(results, cleanupResults);
            
            this.emit('cleanup:completed', results);
        }

        return results;
    }

    /**
     * Shuts down the session manager
     * @returns {Promise<void>}
     */
    async shutdown() {
        // Close all active sessions
        for (const sessionId of this.activeSessions.keys()) {
            await this.closeSession(sessionId);
        }

        // Stop periodic checkpointing
        if (this.checkpointTimer) {
            clearInterval(this.checkpointTimer);
        }

        // Shutdown subsystems
        await this.checkpoint.shutdown();
        await this.persistence.shutdown();

        this.emit('session_manager:shutdown');
    }

    // Private methods

    _generateSessionId() {
        return `session_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
    }

    _generateMessageId() {
        return `msg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    }

    _generateTitle(initialPrompt) {
        if (!initialPrompt) {
            return `Session ${new Date().toLocaleString()}`;
        }
        
        // Extract meaningful title from initial prompt
        const words = initialPrompt.slice(0, 100).split(' ').slice(0, 8);
        return words.join(' ') + (initialPrompt.length > 100 ? '...' : '');
    }

    async _getGitInfo() {
        try {
            const { execSync } = require('child_process');
            const branch = execSync('git rev-parse --abbrev-ref HEAD', { 
                encoding: 'utf8',
                timeout: 1000 
            }).trim();
            const commit = execSync('git rev-parse --short HEAD', { 
                encoding: 'utf8',
                timeout: 1000 
            }).trim();
            
            return { branch, commit, repository: process.cwd() };
        } catch (error) {
            return null;
        }
    }

    _getEnvironmentSnapshot() {
        return {
            cwd: process.cwd(),
            node_version: process.version,
            platform: process.platform,
            arch: process.arch,
            memory: process.memoryUsage(),
            timestamp: new Date().toISOString()
        };
    }

    _shouldCreateCheckpoint(sessionData) {
        const messageCount = sessionData.conversation.length;
        const lastUpdate = new Date(sessionData.updated_at);
        const timeSinceUpdate = Date.now() - lastUpdate.getTime();

        // Checkpoint every 10 messages or 5 minutes
        return messageCount % 10 === 0 || timeSinceUpdate > this.options.checkpointInterval;
    }

    _setupEventHandlers() {
        // Handle conversation manager events
        this.conversation.on('message:processed', (data) => {
            this.emit('conversation:message_processed', data);
        });

        // Handle checkpoint events
        this.checkpoint.on('checkpoint:created', (data) => {
            this.metrics.checkpointsCreated++;
            this.emit('checkpoint:created', data);
        });

        // Handle persistence events
        this.persistence.on('error', (error) => {
            this.emit('persistence:error', error);
        });
    }

    _startPeriodicCheckpointing() {
        if (this.options.checkpointInterval > 0) {
            this.checkpointTimer = setInterval(async () => {
                for (const [sessionId, sessionData] of this.activeSessions) {
                    if (this._shouldCreateCheckpoint(sessionData)) {
                        try {
                            await this.checkpoint.createAutoCheckpoint(sessionId, sessionData);
                        } catch (error) {
                            this.emit('error', { 
                                type: 'periodic_checkpoint_failed', 
                                sessionId, 
                                error 
                            });
                        }
                    }
                }
            }, this.options.checkpointInterval);
        }
    }
}

module.exports = SessionManager;