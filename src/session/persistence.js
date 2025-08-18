/**
 * @fileoverview File-based Persistence Layer
 * 
 * This module provides comprehensive file-based persistence for sessions,
 * conversation history, checkpoints, and metadata using JSONL format for efficiency.
 */

const fs = require('fs').promises;
const path = require('path');
const { createReadStream, createWriteStream } = require('fs');
const { createGzip, createGunzip } = require('zlib');
const { pipeline } = require('stream').promises;
const { EventEmitter } = require('events');
const crypto = require('crypto');
const readline = require('readline');

/**
 * File-based persistence layer for session data
 * Provides efficient storage and retrieval using JSONL format with optional compression
 */
class PersistenceLayer extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            baseDir: options.baseDir || path.join(require('os').homedir(), '.claude', 'sessions'),
            compressionEnabled: options.compressionEnabled !== false,
            compressionThreshold: options.compressionThreshold || 10000, // bytes
            backupEnabled: options.backupEnabled !== false,
            maxBackups: options.maxBackups || 5,
            indexingEnabled: options.indexingEnabled !== false,
            batchSize: options.batchSize || 100,
            ...options
        };

        // Directory structure
        this.dirs = {
            sessions: path.join(this.options.baseDir, 'sessions'),
            conversations: path.join(this.options.baseDir, 'conversations'),
            checkpoints: path.join(this.options.baseDir, 'checkpoints'),
            indices: path.join(this.options.baseDir, 'indices'),
            backups: path.join(this.options.baseDir, 'backups'),
            temp: path.join(this.options.baseDir, 'temp')
        };

        // File extensions
        this.extensions = {
            session: '.session',
            conversation: '.jsonl',
            conversationCompressed: '.jsonl.gz',
            checkpoint: '.checkpoint',
            index: '.index',
            backup: '.backup'
        };

        // In-memory indices for fast lookups
        this.sessionIndex = new Map();
        this.conversationIndex = new Map();
        this.checkpointIndex = new Map();
        
        // Write queues for batch operations
        this.writeQueues = new Map();
        
        // Statistics
        this.stats = {
            sessionsStored: 0,
            messagesStored: 0,
            checkpointsStored: 0,
            bytesWritten: 0,
            bytesRead: 0,
            compressionSavings: 0
        };

        this._initialized = false;
    }

    /**
     * Initializes the persistence layer
     * @returns {Promise<void>}
     */
    async initialize() {
        if (this._initialized) return;

        // Create directory structure
        await this._ensureDirectories();
        
        // Load existing indices
        await this._loadIndices();
        
        // Start background tasks
        this._startBatchProcessor();
        
        this._initialized = true;
        this.emit('persistence:initialized');
    }

    /**
     * Saves a complete session
     * @param {string} sessionId - Session identifier
     * @param {Object} sessionData - Session data to save
     * @returns {Promise<void>}
     */
    async saveSession(sessionId, sessionData) {
        await this._ensureInitialized();
        
        const sessionPath = this._getSessionPath(sessionId);
        const sessionDataCopy = { ...sessionData };
        
        // Remove conversation from session data (stored separately)
        const conversation = sessionDataCopy.conversation || [];
        delete sessionDataCopy.conversation;
        
        try {
            // Save session metadata
            await this._writeFile(sessionPath, JSON.stringify(sessionDataCopy, null, 2));
            
            // Save conversation if present
            if (conversation.length > 0) {
                await this.saveConversation(sessionId, conversation);
            }
            
            // Update index
            this._updateSessionIndex(sessionId, sessionDataCopy);
            
            this.stats.sessionsStored++;
            this.emit('session:saved', { sessionId, size: JSON.stringify(sessionDataCopy).length });
            
        } catch (error) {
            this.emit('error', { type: 'session_save_failed', sessionId, error });
            throw error;
        }
    }

    /**
     * Loads a session
     * @param {string} sessionId - Session identifier
     * @returns {Promise<Object|null>} Session data or null if not found
     */
    async loadSession(sessionId) {
        await this._ensureInitialized();
        
        const sessionPath = this._getSessionPath(sessionId);
        
        try {
            const sessionData = JSON.parse(await this._readFile(sessionPath));
            
            // Load conversation separately
            const conversation = await this.getConversationHistory(sessionId);
            sessionData.conversation = conversation;
            
            return sessionData;
            
        } catch (error) {
            if (error.code === 'ENOENT') {
                return null; // Session not found
            }
            
            this.emit('error', { type: 'session_load_failed', sessionId, error });
            throw error;
        }
    }

    /**
     * Updates session metadata
     * @param {string} sessionId - Session identifier
     * @param {Object} metadata - Metadata updates
     * @returns {Promise<void>}
     */
    async updateSessionMetadata(sessionId, metadata) {
        const sessionData = await this.loadSession(sessionId);
        if (!sessionData) {
            throw new Error(`Session ${sessionId} not found`);
        }
        
        Object.assign(sessionData, metadata);
        await this.saveSession(sessionId, sessionData);
    }

    /**
     * Saves conversation history for a session
     * @param {string} sessionId - Session identifier
     * @param {Array} messages - Message array to save
     * @returns {Promise<void>}
     */
    async saveConversation(sessionId, messages) {
        const conversationPath = this._getConversationPath(sessionId);
        const lines = messages.map(msg => JSON.stringify(msg)).join('\n');
        
        try {
            if (this.options.compressionEnabled && lines.length > this.options.compressionThreshold) {
                await this._writeCompressedFile(conversationPath + '.gz', lines);
                this._updateCompressionStats(lines.length, conversationPath + '.gz');
            } else {
                await this._writeFile(conversationPath, lines);
            }
            
            // Update conversation index
            this._updateConversationIndex(sessionId, messages);
            
            this.stats.messagesStored += messages.length;
            
        } catch (error) {
            this.emit('error', { type: 'conversation_save_failed', sessionId, error });
            throw error;
        }
    }

    /**
     * Appends a single message to conversation history
     * @param {string} sessionId - Session identifier
     * @param {Object} message - Message to append
     * @returns {Promise<void>}
     */
    async appendMessage(sessionId, message) {
        const conversationPath = this._getConversationPath(sessionId);
        const isCompressed = await this._fileExists(conversationPath + '.gz');
        
        if (isCompressed) {
            // For compressed files, need to decompress, append, and recompress
            const existingMessages = await this.getConversationHistory(sessionId);
            existingMessages.push(message);
            await this.saveConversation(sessionId, existingMessages);
        } else {
            // Simple append for uncompressed files
            const messageLine = JSON.stringify(message) + '\n';
            await this._appendFile(conversationPath, messageLine);
            
            this._updateConversationIndex(sessionId, [message], true);
            this.stats.messagesStored++;
        }
    }

    /**
     * Gets conversation history for a session
     * @param {string} sessionId - Session identifier
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Message array
     */
    async getConversationHistory(sessionId, options = {}) {
        const conversationPath = this._getConversationPath(sessionId);
        const compressedPath = conversationPath + '.gz';
        
        let filePath;
        let isCompressed = false;
        
        if (await this._fileExists(compressedPath)) {
            filePath = compressedPath;
            isCompressed = true;
        } else if (await this._fileExists(conversationPath)) {
            filePath = conversationPath;
        } else {
            return []; // No conversation found
        }
        
        try {
            const messages = [];
            const stream = isCompressed ? 
                createReadStream(filePath).pipe(createGunzip()) :
                createReadStream(filePath);
                
            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });
            
            for await (const line of rl) {
                if (line.trim()) {
                    try {
                        const message = JSON.parse(line);
                        
                        // Apply filters
                        if (options.role && message.role !== options.role) continue;
                        if (options.since && new Date(message.timestamp) < new Date(options.since)) continue;
                        if (options.until && new Date(message.timestamp) > new Date(options.until)) continue;
                        if (options.search && !message.content.toLowerCase().includes(options.search.toLowerCase())) continue;
                        
                        messages.push(message);
                    } catch (parseError) {
                        this.emit('warning', { type: 'message_parse_error', sessionId, line, error: parseError });
                    }
                }
            }
            
            // Apply limit
            if (options.limit) {
                return messages.slice(-options.limit);
            }
            
            return messages;
            
        } catch (error) {
            this.emit('error', { type: 'conversation_load_failed', sessionId, error });
            throw error;
        }
    }

    /**
     * Lists all sessions with optional filtering
     * @param {Object} filters - Filter options
     * @returns {Promise<Array>} Session list
     */
    async listSessions(filters = {}) {
        await this._ensureInitialized();
        
        const sessions = [];
        
        for (const [sessionId, indexEntry] of this.sessionIndex) {
            // Apply filters
            if (filters.since && new Date(indexEntry.updated_at) < new Date(filters.since)) continue;
            if (filters.until && new Date(indexEntry.created_at) > new Date(filters.until)) continue;
            if (filters.model && indexEntry.model !== filters.model) continue;
            if (filters.projectPath && !indexEntry.project_path?.includes(filters.projectPath)) continue;
            
            sessions.push({
                session_id: sessionId,
                title: indexEntry.title,
                created_at: indexEntry.created_at,
                updated_at: indexEntry.updated_at,
                message_count: indexEntry.message_count || 0,
                model: indexEntry.model,
                project_path: indexEntry.project_path
            });
        }
        
        // Sort by update time (most recent first)
        sessions.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        
        if (filters.limit) {
            return sessions.slice(0, filters.limit);
        }
        
        return sessions;
    }

    /**
     * Searches sessions by content
     * @param {string} query - Search query
     * @param {Object} filters - Additional filters
     * @returns {Promise<Array>} Search results
     */
    async searchSessions(query, filters = {}) {
        const searchResults = [];
        const queryTerms = query.toLowerCase().split(/\s+/);
        
        for (const [sessionId, indexEntry] of this.sessionIndex) {
            let score = 0;
            const searchableText = [
                indexEntry.title || '',
                indexEntry.project_path || '',
                sessionId
            ].join(' ').toLowerCase();
            
            // Score based on term matches
            queryTerms.forEach(term => {
                if (searchableText.includes(term)) {
                    score += 1;
                }
            });
            
            if (score > 0) {
                // Also search conversation content
                try {
                    const messages = await this.getConversationHistory(sessionId, { 
                        search: query,
                        limit: 5 
                    });
                    
                    if (messages.length > 0) {
                        score += messages.length;
                        
                        searchResults.push({
                            session_id: sessionId,
                            title: indexEntry.title,
                            score,
                            matches: messages.map(msg => ({
                                timestamp: msg.timestamp,
                                role: msg.role,
                                content: msg.content.slice(0, 200) + '...',
                                relevance: this._calculateRelevance(msg.content, query)
                            }))
                        });
                    }
                } catch (error) {
                    this.emit('error', { type: 'search_error', sessionId, error });
                }
            }
        }
        
        return searchResults
            .sort((a, b) => b.score - a.score)
            .slice(0, filters.limit || 20);
    }

    /**
     * Saves a checkpoint
     * @param {string} checkpointId - Checkpoint identifier
     * @param {Object} checkpointData - Checkpoint data
     * @returns {Promise<void>}
     */
    async saveCheckpoint(checkpointId, checkpointData) {
        const checkpointPath = this._getCheckpointPath(checkpointId);
        
        try {
            const dataString = JSON.stringify(checkpointData, null, 2);
            
            if (this.options.compressionEnabled && dataString.length > this.options.compressionThreshold) {
                await this._writeCompressedFile(checkpointPath + '.gz', dataString);
                this._updateCompressionStats(dataString.length, checkpointPath + '.gz');
            } else {
                await this._writeFile(checkpointPath, dataString);
            }
            
            // Update checkpoint index
            this._updateCheckpointIndex(checkpointId, checkpointData);
            
            this.stats.checkpointsStored++;
            
        } catch (error) {
            this.emit('error', { type: 'checkpoint_save_failed', checkpointId, error });
            throw error;
        }
    }

    /**
     * Loads a checkpoint
     * @param {string} checkpointId - Checkpoint identifier
     * @returns {Promise<Object|null>} Checkpoint data or null if not found
     */
    async loadCheckpoint(checkpointId) {
        const checkpointPath = this._getCheckpointPath(checkpointId);
        const compressedPath = checkpointPath + '.gz';
        
        try {
            let filePath;
            let isCompressed = false;
            
            if (await this._fileExists(compressedPath)) {
                filePath = compressedPath;
                isCompressed = true;
            } else if (await this._fileExists(checkpointPath)) {
                filePath = checkpointPath;
            } else {
                return null;
            }
            
            const data = isCompressed ? 
                await this._readCompressedFile(filePath) :
                await this._readFile(filePath);
                
            return JSON.parse(data);
            
        } catch (error) {
            this.emit('error', { type: 'checkpoint_load_failed', checkpointId, error });
            throw error;
        }
    }

    /**
     * Deletes a session and all associated data
     * @param {string} sessionId - Session identifier
     * @returns {Promise<void>}
     */
    async deleteSession(sessionId) {
        const sessionPath = this._getSessionPath(sessionId);
        const conversationPath = this._getConversationPath(sessionId);
        const compressedConversationPath = conversationPath + '.gz';
        
        try {
            // Delete session file
            await this._deleteFile(sessionPath);
            
            // Delete conversation files
            if (await this._fileExists(conversationPath)) {
                await this._deleteFile(conversationPath);
            }
            if (await this._fileExists(compressedConversationPath)) {
                await this._deleteFile(compressedConversationPath);
            }
            
            // Remove from indices
            this.sessionIndex.delete(sessionId);
            this.conversationIndex.delete(sessionId);
            
            this.emit('session:deleted', { sessionId });
            
        } catch (error) {
            this.emit('error', { type: 'session_delete_failed', sessionId, error });
            throw error;
        }
    }

    /**
     * Deletes a checkpoint
     * @param {string} checkpointId - Checkpoint identifier
     * @returns {Promise<void>}
     */
    async deleteCheckpoint(checkpointId) {
        const checkpointPath = this._getCheckpointPath(checkpointId);
        const compressedPath = checkpointPath + '.gz';
        
        try {
            if (await this._fileExists(checkpointPath)) {
                await this._deleteFile(checkpointPath);
            }
            if (await this._fileExists(compressedPath)) {
                await this._deleteFile(compressedPath);
            }
            
            this.checkpointIndex.delete(checkpointId);
            
        } catch (error) {
            this.emit('error', { type: 'checkpoint_delete_failed', checkpointId, error });
            throw error;
        }
    }

    /**
     * Saves checkpoint index
     * @param {Object} index - Checkpoint index data
     * @returns {Promise<void>}
     */
    async saveCheckpointIndex(index) {
        const indexPath = path.join(this.dirs.indices, 'checkpoints.index');
        await this._writeFile(indexPath, JSON.stringify(index, null, 2));
    }

    /**
     * Loads checkpoint index
     * @returns {Promise<Object|null>} Checkpoint index or null
     */
    async loadCheckpointIndex() {
        const indexPath = path.join(this.dirs.indices, 'checkpoints.index');
        
        try {
            const data = await this._readFile(indexPath);
            return JSON.parse(data);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                this.emit('error', { type: 'index_load_failed', error });
            }
            return null;
        }
    }

    /**
     * Performs cleanup operations
     * @param {Object} options - Cleanup options
     * @returns {Promise<Object>} Cleanup results
     */
    async cleanup(options = {}) {
        const results = {
            sessionsDeleted: 0,
            checkpointsDeleted: 0,
            bytesFreed: 0,
            errors: []
        };

        const maxAge = options.maxAge || 30 * 24 * 60 * 60 * 1000; // 30 days
        const cutoffTime = Date.now() - maxAge;

        // Clean up old sessions
        for (const [sessionId, indexEntry] of this.sessionIndex) {
            if (new Date(indexEntry.updated_at).getTime() < cutoffTime) {
                try {
                    await this.deleteSession(sessionId);
                    results.sessionsDeleted++;
                } catch (error) {
                    results.errors.push({ type: 'session_cleanup_error', sessionId, error });
                }
            }
        }

        // Clean up temporary files
        try {
            const tempFiles = await fs.readdir(this.dirs.temp);
            for (const file of tempFiles) {
                const filePath = path.join(this.dirs.temp, file);
                const stats = await fs.stat(filePath);
                if (stats.mtime.getTime() < cutoffTime) {
                    await fs.unlink(filePath);
                    results.bytesFreed += stats.size;
                }
            }
        } catch (error) {
            results.errors.push({ type: 'temp_cleanup_error', error });
        }

        // Optimize indices
        await this._optimizeIndices();

        return results;
    }

    /**
     * Creates a backup of all session data
     * @param {string} backupPath - Path for backup file
     * @returns {Promise<void>}
     */
    async createBackup(backupPath) {
        const backupData = {
            timestamp: new Date().toISOString(),
            version: '1.0',
            sessions: {},
            conversations: {},
            checkpoints: {},
            indices: {
                sessions: Object.fromEntries(this.sessionIndex),
                conversations: Object.fromEntries(this.conversationIndex),
                checkpoints: Object.fromEntries(this.checkpointIndex)
            }
        };

        // Export all sessions
        for (const sessionId of this.sessionIndex.keys()) {
            try {
                backupData.sessions[sessionId] = await this.loadSession(sessionId);
            } catch (error) {
                this.emit('warning', { type: 'backup_session_error', sessionId, error });
            }
        }

        // Export all checkpoints
        for (const checkpointId of this.checkpointIndex.keys()) {
            try {
                backupData.checkpoints[checkpointId] = await this.loadCheckpoint(checkpointId);
            } catch (error) {
                this.emit('warning', { type: 'backup_checkpoint_error', checkpointId, error });
            }
        }

        await this._writeCompressedFile(backupPath, JSON.stringify(backupData, null, 2));
        
        this.emit('backup:created', { backupPath, size: JSON.stringify(backupData).length });
    }

    /**
     * Restores data from a backup
     * @param {string} backupPath - Path to backup file
     * @returns {Promise<Object>} Restore results
     */
    async restoreFromBackup(backupPath) {
        const backupData = JSON.parse(await this._readCompressedFile(backupPath));
        const results = {
            sessionsRestored: 0,
            checkpointsRestored: 0,
            errors: []
        };

        // Restore sessions
        for (const [sessionId, sessionData] of Object.entries(backupData.sessions || {})) {
            try {
                await this.saveSession(sessionId, sessionData);
                results.sessionsRestored++;
            } catch (error) {
                results.errors.push({ type: 'restore_session_error', sessionId, error });
            }
        }

        // Restore checkpoints
        for (const [checkpointId, checkpointData] of Object.entries(backupData.checkpoints || {})) {
            try {
                await this.saveCheckpoint(checkpointId, checkpointData);
                results.checkpointsRestored++;
            } catch (error) {
                results.errors.push({ type: 'restore_checkpoint_error', checkpointId, error });
            }
        }

        // Rebuild indices
        await this._rebuildIndices();

        return results;
    }

    /**
     * Gets storage statistics
     * @returns {Promise<Object>} Storage statistics
     */
    async getStorageStats() {
        const stats = { ...this.stats };
        
        try {
            stats.diskUsage = await this._calculateDiskUsage();
            stats.fileCount = await this._countFiles();
            stats.indexSizes = {
                sessions: this.sessionIndex.size,
                conversations: this.conversationIndex.size,
                checkpoints: this.checkpointIndex.size
            };
        } catch (error) {
            this.emit('error', { type: 'stats_calculation_error', error });
        }

        return stats;
    }

    /**
     * Shuts down the persistence layer
     * @returns {Promise<void>}
     */
    async shutdown() {
        // Save all indices
        await this._saveIndices();
        
        // Clear write queues
        this.writeQueues.clear();
        
        this.emit('persistence:shutdown');
    }

    // Private methods

    async _ensureInitialized() {
        if (!this._initialized) {
            await this.initialize();
        }
    }

    async _ensureDirectories() {
        for (const dir of Object.values(this.dirs)) {
            await fs.mkdir(dir, { recursive: true });
        }
    }

    async _loadIndices() {
        // Load session index
        try {
            const sessionIndexPath = path.join(this.dirs.indices, 'sessions.index');
            if (await this._fileExists(sessionIndexPath)) {
                const sessionIndex = JSON.parse(await this._readFile(sessionIndexPath));
                for (const [sessionId, indexEntry] of Object.entries(sessionIndex)) {
                    this.sessionIndex.set(sessionId, indexEntry);
                }
            }
        } catch (error) {
            this.emit('warning', { type: 'session_index_load_error', error });
        }

        // Load conversation index
        try {
            const conversationIndexPath = path.join(this.dirs.indices, 'conversations.index');
            if (await this._fileExists(conversationIndexPath)) {
                const conversationIndex = JSON.parse(await this._readFile(conversationIndexPath));
                for (const [sessionId, indexEntry] of Object.entries(conversationIndex)) {
                    this.conversationIndex.set(sessionId, indexEntry);
                }
            }
        } catch (error) {
            this.emit('warning', { type: 'conversation_index_load_error', error });
        }
    }

    async _saveIndices() {
        // Save session index
        try {
            const sessionIndexPath = path.join(this.dirs.indices, 'sessions.index');
            const sessionIndex = Object.fromEntries(this.sessionIndex);
            await this._writeFile(sessionIndexPath, JSON.stringify(sessionIndex, null, 2));
        } catch (error) {
            this.emit('error', { type: 'session_index_save_error', error });
        }

        // Save conversation index
        try {
            const conversationIndexPath = path.join(this.dirs.indices, 'conversations.index');
            const conversationIndex = Object.fromEntries(this.conversationIndex);
            await this._writeFile(conversationIndexPath, JSON.stringify(conversationIndex, null, 2));
        } catch (error) {
            this.emit('error', { type: 'conversation_index_save_error', error });
        }
    }

    _updateSessionIndex(sessionId, sessionData) {
        this.sessionIndex.set(sessionId, {
            title: sessionData.title,
            created_at: sessionData.created_at,
            updated_at: sessionData.updated_at,
            model: sessionData.state?.model,
            project_path: sessionData.metadata?.project_path,
            message_count: sessionData.conversation?.length || 0
        });
    }

    _updateConversationIndex(sessionId, messages, append = false) {
        const existing = this.conversationIndex.get(sessionId) || {
            message_count: 0,
            first_message: null,
            last_message: null
        };

        if (append) {
            existing.message_count += messages.length;
            if (messages.length > 0) {
                existing.last_message = messages[messages.length - 1].timestamp;
                if (!existing.first_message) {
                    existing.first_message = messages[0].timestamp;
                }
            }
        } else {
            existing.message_count = messages.length;
            if (messages.length > 0) {
                existing.first_message = messages[0].timestamp;
                existing.last_message = messages[messages.length - 1].timestamp;
            }
        }

        this.conversationIndex.set(sessionId, existing);
    }

    _updateCheckpointIndex(checkpointId, checkpointData) {
        this.checkpointIndex.set(checkpointId, {
            session_id: checkpointData.sessionId,
            created_at: checkpointData.createdAt,
            type: checkpointData.type,
            size: checkpointData.size
        });
    }

    _getSessionPath(sessionId) {
        return path.join(this.dirs.sessions, sessionId + this.extensions.session);
    }

    _getConversationPath(sessionId) {
        return path.join(this.dirs.conversations, sessionId + this.extensions.conversation);
    }

    _getCheckpointPath(checkpointId) {
        return path.join(this.dirs.checkpoints, checkpointId + this.extensions.checkpoint);
    }

    async _fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    async _readFile(filePath) {
        const data = await fs.readFile(filePath, 'utf8');
        this.stats.bytesRead += data.length;
        return data;
    }

    async _writeFile(filePath, data) {
        await fs.writeFile(filePath, data, 'utf8');
        this.stats.bytesWritten += data.length;
    }

    async _appendFile(filePath, data) {
        await fs.appendFile(filePath, data, 'utf8');
        this.stats.bytesWritten += data.length;
    }

    async _deleteFile(filePath) {
        await fs.unlink(filePath);
    }

    async _readCompressedFile(filePath) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            const stream = createReadStream(filePath)
                .pipe(createGunzip())
                .on('data', chunk => chunks.push(chunk))
                .on('end', () => {
                    const data = Buffer.concat(chunks).toString('utf8');
                    this.stats.bytesRead += data.length;
                    resolve(data);
                })
                .on('error', reject);
        });
    }

    async _writeCompressedFile(filePath, data) {
        const input = Buffer.from(data, 'utf8');
        const output = createWriteStream(filePath);
        const gzip = createGzip();
        
        await pipeline(
            require('stream').Readable.from([input]),
            gzip,
            output
        );
        
        this.stats.bytesWritten += input.length;
    }

    _updateCompressionStats(originalSize, compressedPath) {
        fs.stat(compressedPath).then(stats => {
            this.stats.compressionSavings += originalSize - stats.size;
        }).catch(() => {});
    }

    _calculateRelevance(content, query) {
        const queryTerms = query.toLowerCase().split(/\s+/);
        const contentLower = content.toLowerCase();
        let score = 0;
        
        queryTerms.forEach(term => {
            const matches = (contentLower.match(new RegExp(term, 'g')) || []).length;
            score += matches;
        });
        
        return score / queryTerms.length;
    }

    async _calculateDiskUsage() {
        let totalSize = 0;
        
        for (const dir of Object.values(this.dirs)) {
            try {
                const files = await fs.readdir(dir);
                for (const file of files) {
                    const filePath = path.join(dir, file);
                    const stats = await fs.stat(filePath);
                    if (stats.isFile()) {
                        totalSize += stats.size;
                    }
                }
            } catch (error) {
                // Directory might not exist
            }
        }
        
        return totalSize;
    }

    async _countFiles() {
        let totalFiles = 0;
        
        for (const dir of Object.values(this.dirs)) {
            try {
                const files = await fs.readdir(dir);
                totalFiles += files.length;
            } catch (error) {
                // Directory might not exist
            }
        }
        
        return totalFiles;
    }

    async _rebuildIndices() {
        this.sessionIndex.clear();
        this.conversationIndex.clear();
        this.checkpointIndex.clear();

        // Rebuild session index
        try {
            const sessionFiles = await fs.readdir(this.dirs.sessions);
            for (const file of sessionFiles) {
                if (file.endsWith(this.extensions.session)) {
                    const sessionId = file.replace(this.extensions.session, '');
                    const sessionData = JSON.parse(await this._readFile(path.join(this.dirs.sessions, file)));
                    this._updateSessionIndex(sessionId, sessionData);
                }
            }
        } catch (error) {
            this.emit('error', { type: 'session_index_rebuild_error', error });
        }

        await this._saveIndices();
    }

    async _optimizeIndices() {
        // Remove entries for non-existent sessions
        for (const sessionId of this.sessionIndex.keys()) {
            const sessionPath = this._getSessionPath(sessionId);
            if (!await this._fileExists(sessionPath)) {
                this.sessionIndex.delete(sessionId);
                this.conversationIndex.delete(sessionId);
            }
        }

        await this._saveIndices();
    }

    _startBatchProcessor() {
        // Placeholder for batch write operations
        // In a full implementation, this would handle batched writes for performance
        setInterval(() => {
            // Process write queues
            for (const [key, queue] of this.writeQueues) {
                if (queue.length > 0) {
                    // Process queued operations
                }
            }
        }, 5000);
    }
}

module.exports = PersistenceLayer;