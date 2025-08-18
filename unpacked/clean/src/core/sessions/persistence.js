/**
 * Session Persistence Manager
 * 
 * Handles saving and restoring conversation sessions for resumption.
 * Supports both local and cloud-based session storage.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';
import { configManager } from '../../config/manager.js';

// Session storage directory
const SESSION_DIR = path.join(os.homedir(), '.config', 'claude', 'sessions');
const MAX_SESSIONS = 100; // Maximum number of sessions to keep
const SESSION_RETENTION_DAYS = 30; // Days to keep sessions

/**
 * Session metadata structure
 */
class SessionMetadata {
    constructor(options = {}) {
        this.id = options.id || uuidv4();
        this.title = options.title || 'Untitled Session';
        this.createdAt = options.createdAt || Date.now();
        this.updatedAt = options.updatedAt || Date.now();
        this.messageCount = options.messageCount || 0;
        this.model = options.model || 'claude-3-5-sonnet-20241022';
        this.tags = options.tags || [];
        this.archived = options.archived || false;
        this.size = options.size || 0; // Size in bytes
    }

    /**
     * Update metadata from conversation
     * @param {object} conversation - Conversation data
     */
    updateFromConversation(conversation) {
        this.updatedAt = Date.now();
        this.messageCount = conversation.messages.length;
        this.size = JSON.stringify(conversation).length;
        
        // Auto-generate title from first user message
        if (this.title === 'Untitled Session' && conversation.messages.length > 0) {
            const firstUserMessage = conversation.messages.find(m => m.role === 'user');
            if (firstUserMessage) {
                this.title = firstUserMessage.content.substring(0, 50).trim();
                if (firstUserMessage.content.length > 50) {
                    this.title += '...';
                }
            }
        }
    }

    /**
     * Convert to JSON
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            messageCount: this.messageCount,
            model: this.model,
            tags: this.tags,
            archived: this.archived,
            size: this.size
        };
    }

    /**
     * Create from JSON
     */
    static fromJSON(data) {
        return new SessionMetadata(data);
    }
}

/**
 * Session persistence manager
 */
export class SessionPersistence {
    constructor(options = {}) {
        this.options = options;
        this.sessionDir = options.sessionDir || SESSION_DIR;
        this._ensureSessionDirectory();
    }

    /**
     * Ensure session directory exists
     */
    _ensureSessionDirectory() {
        if (!fs.existsSync(this.sessionDir)) {
            fs.mkdirSync(this.sessionDir, { recursive: true });
        }
    }

    /**
     * Get session file path
     * @param {string} sessionId - Session ID
     * @returns {string} File path
     */
    _getSessionPath(sessionId) {
        return path.join(this.sessionDir, `${sessionId}.json`);
    }

    /**
     * Get metadata file path
     * @returns {string} File path
     */
    _getMetadataPath() {
        return path.join(this.sessionDir, 'metadata.json');
    }

    /**
     * Load metadata index
     * @returns {Array} Session metadata list
     */
    _loadMetadata() {
        const metadataPath = this._getMetadataPath();
        
        try {
            if (fs.existsSync(metadataPath)) {
                const data = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                return data.sessions.map(s => SessionMetadata.fromJSON(s));
            }
        } catch (error) {
            console.warn('Failed to load session metadata:', error.message);
        }
        
        return [];
    }

    /**
     * Save metadata index
     * @param {Array} metadata - Session metadata list
     */
    _saveMetadata(metadata) {
        const metadataPath = this._getMetadataPath();
        
        try {
            const data = {
                version: '1.0',
                lastUpdated: Date.now(),
                sessions: metadata.map(m => m.toJSON())
            };
            
            fs.writeFileSync(metadataPath, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            throw new Error(`Failed to save session metadata: ${error.message}`);
        }
    }

    /**
     * Save a conversation session
     * @param {string} sessionId - Session ID (optional, will generate if not provided)
     * @param {object} conversation - Conversation data
     * @param {object} options - Save options
     * @returns {string} Session ID
     */
    async saveSession(sessionId = null, conversation, options = {}) {
        if (!sessionId) {
            sessionId = uuidv4();
        }

        const sessionPath = this._getSessionPath(sessionId);
        
        // Prepare session data
        const sessionData = {
            id: sessionId,
            version: '1.0',
            savedAt: Date.now(),
            conversation: {
                messages: conversation.messages || [],
                model: conversation.model || 'claude-3-5-sonnet-20241022',
                systemPrompt: conversation.systemPrompt,
                temperature: conversation.temperature || 0.7,
                maxTokens: conversation.maxTokens || 4096,
                context: conversation.context || {}
            },
            metadata: {
                title: options.title,
                tags: options.tags || [],
                archived: options.archived || false
            }
        };

        try {
            // Save session file
            fs.writeFileSync(sessionPath, JSON.stringify(sessionData, null, 2), 'utf8');

            // Update metadata index
            const metadata = this._loadMetadata();
            let sessionMeta = metadata.find(m => m.id === sessionId);
            
            if (!sessionMeta) {
                sessionMeta = new SessionMetadata({
                    id: sessionId,
                    title: options.title,
                    model: sessionData.conversation.model,
                    tags: options.tags
                });
                metadata.push(sessionMeta);
            }
            
            sessionMeta.updateFromConversation(sessionData.conversation);
            
            // Apply retention policy
            this._applyRetentionPolicy(metadata);
            
            this._saveMetadata(metadata);

            return sessionId;
        } catch (error) {
            throw new Error(`Failed to save session: ${error.message}`);
        }
    }

    /**
     * Load a conversation session
     * @param {string} sessionId - Session ID
     * @returns {object|null} Session data or null if not found
     */
    async loadSession(sessionId) {
        const sessionPath = this._getSessionPath(sessionId);
        
        if (!fs.existsSync(sessionPath)) {
            return null;
        }

        try {
            const data = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
            
            // Validate session data
            if (!data.conversation || !Array.isArray(data.conversation.messages)) {
                throw new Error('Invalid session data format');
            }

            return data;
        } catch (error) {
            throw new Error(`Failed to load session: ${error.message}`);
        }
    }

    /**
     * List all sessions
     * @param {object} options - Filter options
     * @returns {Array} Session metadata list
     */
    async listSessions(options = {}) {
        const metadata = this._loadMetadata();
        
        let filtered = metadata;
        
        // Apply filters
        if (options.archived === false) {
            filtered = filtered.filter(m => !m.archived);
        } else if (options.archived === true) {
            filtered = filtered.filter(m => m.archived);
        }
        
        if (options.tags && options.tags.length > 0) {
            filtered = filtered.filter(m => 
                options.tags.some(tag => m.tags.includes(tag))
            );
        }
        
        if (options.model) {
            filtered = filtered.filter(m => m.model === options.model);
        }
        
        // Sort by most recent first
        filtered.sort((a, b) => b.updatedAt - a.createdAt);
        
        // Limit results
        if (options.limit) {
            filtered = filtered.slice(0, options.limit);
        }
        
        return filtered;
    }

    /**
     * Delete a session
     * @param {string} sessionId - Session ID
     * @returns {boolean} Success
     */
    async deleteSession(sessionId) {
        const sessionPath = this._getSessionPath(sessionId);
        
        try {
            // Remove session file
            if (fs.existsSync(sessionPath)) {
                fs.unlinkSync(sessionPath);
            }

            // Update metadata index
            const metadata = this._loadMetadata();
            const filteredMetadata = metadata.filter(m => m.id !== sessionId);
            
            if (filteredMetadata.length !== metadata.length) {
                this._saveMetadata(filteredMetadata);
                return true;
            }
            
            return false;
        } catch (error) {
            throw new Error(`Failed to delete session: ${error.message}`);
        }
    }

    /**
     * Get most recent session
     * @returns {string|null} Most recent session ID
     */
    async getMostRecentSession() {
        const sessions = await this.listSessions({ limit: 1, archived: false });
        return sessions.length > 0 ? sessions[0].id : null;
    }

    /**
     * Archive a session
     * @param {string} sessionId - Session ID
     * @returns {boolean} Success
     */
    async archiveSession(sessionId) {
        const metadata = this._loadMetadata();
        const sessionMeta = metadata.find(m => m.id === sessionId);
        
        if (!sessionMeta) {
            return false;
        }
        
        sessionMeta.archived = true;
        sessionMeta.updatedAt = Date.now();
        
        this._saveMetadata(metadata);
        return true;
    }

    /**
     * Add tags to a session
     * @param {string} sessionId - Session ID
     * @param {Array} tags - Tags to add
     * @returns {boolean} Success
     */
    async tagSession(sessionId, tags) {
        const metadata = this._loadMetadata();
        const sessionMeta = metadata.find(m => m.id === sessionId);
        
        if (!sessionMeta) {
            return false;
        }
        
        // Add new tags (avoid duplicates)
        for (const tag of tags) {
            if (!sessionMeta.tags.includes(tag)) {
                sessionMeta.tags.push(tag);
            }
        }
        
        sessionMeta.updatedAt = Date.now();
        
        this._saveMetadata(metadata);
        return true;
    }

    /**
     * Apply retention policy to sessions
     * @param {Array} metadata - Session metadata list
     */
    _applyRetentionPolicy(metadata) {
        const now = Date.now();
        const retentionMs = SESSION_RETENTION_DAYS * 24 * 60 * 60 * 1000;
        
        // Remove old sessions (keep archived ones)
        const toDelete = [];
        metadata.forEach(meta => {
            if (!meta.archived && (now - meta.updatedAt) > retentionMs) {
                toDelete.push(meta.id);
            }
        });
        
        // Also enforce session count limit
        const nonArchived = metadata.filter(m => !m.archived);
        nonArchived.sort((a, b) => b.updatedAt - a.updatedAt);
        
        if (nonArchived.length > MAX_SESSIONS) {
            const excess = nonArchived.slice(MAX_SESSIONS);
            excess.forEach(meta => toDelete.push(meta.id));
        }
        
        // Delete old session files and remove from metadata
        for (const sessionId of toDelete) {
            try {
                const sessionPath = this._getSessionPath(sessionId);
                if (fs.existsSync(sessionPath)) {
                    fs.unlinkSync(sessionPath);
                }
            } catch (error) {
                console.warn(`Failed to delete old session ${sessionId}:`, error.message);
            }
        }
        
        // Remove from metadata
        if (toDelete.length > 0) {
            const remaining = metadata.filter(m => !toDelete.includes(m.id));
            metadata.length = 0;
            remaining.forEach(m => metadata.push(m));
        }
    }

    /**
     * Clean up old sessions manually
     * @returns {number} Number of sessions cleaned up
     */
    async cleanup() {
        const metadata = this._loadMetadata();
        const beforeCount = metadata.length;
        
        this._applyRetentionPolicy(metadata);
        this._saveMetadata(metadata);
        
        const afterCount = metadata.length;
        return beforeCount - afterCount;
    }

    /**
     * Get storage statistics
     * @returns {object} Storage stats
     */
    async getStorageStats() {
        const metadata = this._loadMetadata();
        
        const stats = {
            totalSessions: metadata.length,
            activeSessions: metadata.filter(m => !m.archived).length,
            archivedSessions: metadata.filter(m => m.archived).length,
            totalMessages: metadata.reduce((sum, m) => sum + m.messageCount, 0),
            totalSize: metadata.reduce((sum, m) => sum + m.size, 0),
            oldestSession: metadata.length > 0 ? Math.min(...metadata.map(m => m.createdAt)) : null,
            newestSession: metadata.length > 0 ? Math.max(...metadata.map(m => m.updatedAt)) : null
        };
        
        return stats;
    }
}

// Export singleton instance
export const sessionPersistence = new SessionPersistence();