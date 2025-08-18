/**
 * @fileoverview Session Checkpointing and Recovery System
 * 
 * This module provides comprehensive checkpointing functionality for sessions,
 * including automatic and manual checkpoints, restoration, and recovery mechanisms.
 */

const { EventEmitter } = require('events');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs').promises;

/**
 * Manages session checkpointing and recovery operations
 * Provides automatic checkpoints, manual snapshots, and recovery mechanisms
 */
class CheckpointManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            maxCheckpoints: options.maxCheckpoints || 50,
            checkpointRetention: options.checkpointRetention || 30 * 24 * 60 * 60 * 1000, // 30 days
            compressionEnabled: options.compressionEnabled !== false,
            interval: options.interval || 300000, // 5 minutes
            autoCheckpointThreshold: options.autoCheckpointThreshold || 10, // messages
            ...options
        };

        this.persistence = options.persistence;
        if (!this.persistence) {
            throw new Error('Persistence layer is required for CheckpointManager');
        }

        // Checkpoint storage
        this.checkpoints = new Map();
        this.checkpointIndex = new Map(); // sessionId -> [checkpointIds]
        
        // Recovery points
        this.recoveryPoints = new Map();
        
        // Checkpoint statistics
        this.stats = {
            checkpointsCreated: 0,
            autoCheckpoints: 0,
            manualCheckpoints: 0,
            restoreOperations: 0,
            compressionSavings: 0
        };
        
        this._initialized = false;
    }

    /**
     * Initializes the checkpoint manager
     * @returns {Promise<void>}
     */
    async initialize() {
        if (this._initialized) return;
        
        // Load existing checkpoints index
        await this._loadCheckpointIndex();
        
        // Clean up old checkpoints
        await this._cleanupExpiredCheckpoints();
        
        this._initialized = true;
        this.emit('checkpoint_manager:initialized');
    }

    /**
     * Creates an automatic checkpoint
     * @param {string} sessionId - Session identifier
     * @param {Object} sessionData - Current session state
     * @param {string} trigger - What triggered the checkpoint
     * @returns {Promise<string>} Checkpoint ID
     */
    async createAutoCheckpoint(sessionId, sessionData, trigger = 'interval') {
        return await this._createCheckpoint(sessionId, sessionData, {
            type: 'auto',
            trigger,
            label: `Auto checkpoint - ${trigger}`
        });
    }

    /**
     * Creates a manual checkpoint with a custom label
     * @param {string} sessionId - Session identifier
     * @param {Object} sessionData - Current session state
     * @param {string} label - Checkpoint label
     * @returns {Promise<string>} Checkpoint ID
     */
    async createManualCheckpoint(sessionId, sessionData, label) {
        return await this._createCheckpoint(sessionId, sessionData, {
            type: 'manual',
            trigger: 'user',
            label: label || `Manual checkpoint - ${new Date().toLocaleString()}`
        });
    }

    /**
     * Creates a checkpoint before a potentially risky operation
     * @param {string} sessionId - Session identifier
     * @param {Object} sessionData - Current session state
     * @param {string} operation - Description of the risky operation
     * @returns {Promise<string>} Checkpoint ID
     */
    async createSafetyCheckpoint(sessionId, sessionData, operation) {
        return await this._createCheckpoint(sessionId, sessionData, {
            type: 'safety',
            trigger: 'pre_operation',
            label: `Safety checkpoint - before ${operation}`,
            metadata: { operation }
        });
    }

    /**
     * Lists all checkpoints for a session
     * @param {string} sessionId - Session identifier
     * @param {Object} options - Listing options
     * @returns {Promise<Array>} List of checkpoints
     */
    async listCheckpoints(sessionId, options = {}) {
        const checkpointIds = this.checkpointIndex.get(sessionId) || [];
        const checkpoints = [];

        for (const checkpointId of checkpointIds) {
            const checkpoint = await this._loadCheckpoint(checkpointId);
            if (checkpoint) {
                checkpoints.push({
                    id: checkpoint.id,
                    sessionId: checkpoint.sessionId,
                    createdAt: checkpoint.createdAt,
                    label: checkpoint.label,
                    type: checkpoint.type,
                    trigger: checkpoint.trigger,
                    messageCount: checkpoint.conversationSnapshot.length,
                    size: checkpoint.size,
                    compressed: checkpoint.compressed || false
                });
            }
        }

        // Apply filters
        if (options.type) {
            return checkpoints.filter(cp => cp.type === options.type);
        }

        if (options.since) {
            const sinceDate = new Date(options.since);
            return checkpoints.filter(cp => new Date(cp.createdAt) >= sinceDate);
        }

        if (options.limit) {
            return checkpoints.slice(-options.limit);
        }

        return checkpoints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    /**
     * Gets detailed information about a checkpoint
     * @param {string} checkpointId - Checkpoint identifier
     * @returns {Promise<Object|null>} Checkpoint details
     */
    async getCheckpointInfo(checkpointId) {
        const checkpoint = await this._loadCheckpoint(checkpointId);
        if (!checkpoint) return null;

        return {
            id: checkpoint.id,
            sessionId: checkpoint.sessionId,
            createdAt: checkpoint.createdAt,
            label: checkpoint.label,
            type: checkpoint.type,
            trigger: checkpoint.trigger,
            conversationStats: {
                messageCount: checkpoint.conversationSnapshot.length,
                participants: [...new Set(checkpoint.conversationSnapshot.map(m => m.role))],
                timespan: {
                    first: checkpoint.conversationSnapshot[0]?.timestamp,
                    last: checkpoint.conversationSnapshot[checkpoint.conversationSnapshot.length - 1]?.timestamp
                }
            },
            sessionState: checkpoint.sessionState,
            environmentSnapshot: checkpoint.environmentSnapshot,
            size: checkpoint.size,
            compressed: checkpoint.compressed || false,
            metadata: checkpoint.metadata || {}
        };
    }

    /**
     * Restores a session from a checkpoint
     * @param {string} checkpointId - Checkpoint to restore from
     * @returns {Promise<string>} New session ID for the restored session
     */
    async restoreFromCheckpoint(checkpointId) {
        const checkpoint = await this._loadCheckpoint(checkpointId);
        if (!checkpoint) {
            throw new Error(`Checkpoint ${checkpointId} not found`);
        }

        // Create a new session ID for the restored session
        const newSessionId = this._generateSessionId();
        
        // Prepare restored session data
        const restoredSessionData = {
            session_id: newSessionId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            title: `${checkpoint.sessionState.title} (restored from ${checkpoint.createdAt})`,
            conversation: [...checkpoint.conversationSnapshot],
            state: { ...checkpoint.sessionState },
            metadata: {
                ...checkpoint.sessionState.metadata,
                restored_from: checkpointId,
                original_session: checkpoint.sessionId,
                restore_timestamp: new Date().toISOString()
            },
            version: '1.0'
        };

        // Save the restored session
        await this.persistence.saveSession(newSessionId, restoredSessionData);
        
        // Create a recovery point
        await this._createRecoveryPoint(newSessionId, checkpointId, checkpoint.sessionId);
        
        this.stats.restoreOperations++;
        this.emit('checkpoint:restored', { 
            checkpointId, 
            newSessionId, 
            originalSessionId: checkpoint.sessionId 
        });
        
        return newSessionId;
    }

    /**
     * Restores session state in-place (overwrites current session)
     * @param {string} sessionId - Session to restore to
     * @param {string} checkpointId - Checkpoint to restore from
     * @returns {Promise<void>}
     */
    async restoreInPlace(sessionId, checkpointId) {
        const checkpoint = await this._loadCheckpoint(checkpointId);
        if (!checkpoint) {
            throw new Error(`Checkpoint ${checkpointId} not found`);
        }

        if (checkpoint.sessionId !== sessionId) {
            throw new Error('Cannot restore checkpoint from different session in-place');
        }

        // Create a safety checkpoint before restoration
        const currentSession = await this.persistence.loadSession(sessionId);
        if (currentSession) {
            await this.createSafetyCheckpoint(sessionId, currentSession, 'in-place restore');
        }

        // Restore the session data
        const restoredSessionData = {
            ...currentSession,
            conversation: [...checkpoint.conversationSnapshot],
            state: { ...checkpoint.sessionState },
            updated_at: new Date().toISOString(),
            metadata: {
                ...currentSession.metadata,
                last_restore: {
                    checkpointId,
                    timestamp: new Date().toISOString(),
                    type: 'in_place'
                }
            }
        };

        await this.persistence.saveSession(sessionId, restoredSessionData);
        
        this.emit('checkpoint:restored_in_place', { sessionId, checkpointId });
    }

    /**
     * Compares two checkpoints
     * @param {string} checkpointId1 - First checkpoint
     * @param {string} checkpointId2 - Second checkpoint
     * @returns {Promise<Object>} Comparison results
     */
    async compareCheckpoints(checkpointId1, checkpointId2) {
        const cp1 = await this._loadCheckpoint(checkpointId1);
        const cp2 = await this._loadCheckpoint(checkpointId2);
        
        if (!cp1 || !cp2) {
            throw new Error('One or both checkpoints not found');
        }

        return {
            checkpoints: {
                first: { id: cp1.id, createdAt: cp1.createdAt, label: cp1.label },
                second: { id: cp2.id, createdAt: cp2.createdAt, label: cp2.label }
            },
            messageDifference: cp2.conversationSnapshot.length - cp1.conversationSnapshot.length,
            timeDifference: new Date(cp2.createdAt) - new Date(cp1.createdAt),
            stateDifferences: this._compareObjects(cp1.sessionState, cp2.sessionState),
            conversationDifferences: this._compareConversations(
                cp1.conversationSnapshot, 
                cp2.conversationSnapshot
            )
        };
    }

    /**
     * Creates a checkpoint branch (experimental feature)
     * @param {string} fromCheckpointId - Checkpoint to branch from
     * @param {string} branchName - Name for the new branch
     * @returns {Promise<string>} New session ID for the branch
     */
    async createBranch(fromCheckpointId, branchName) {
        const checkpoint = await this._loadCheckpoint(fromCheckpointId);
        if (!checkpoint) {
            throw new Error(`Checkpoint ${fromCheckpointId} not found`);
        }

        const branchSessionId = this._generateSessionId();
        
        const branchSessionData = {
            session_id: branchSessionId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            title: `${checkpoint.sessionState.title} - Branch: ${branchName}`,
            conversation: [...checkpoint.conversationSnapshot],
            state: { ...checkpoint.sessionState },
            metadata: {
                ...checkpoint.sessionState.metadata,
                branch_info: {
                    branched_from: fromCheckpointId,
                    original_session: checkpoint.sessionId,
                    branch_name: branchName,
                    branch_timestamp: new Date().toISOString()
                }
            },
            version: '1.0'
        };

        await this.persistence.saveSession(branchSessionId, branchSessionData);
        
        this.emit('checkpoint:branched', { 
            fromCheckpointId, 
            branchSessionId, 
            branchName 
        });
        
        return branchSessionId;
    }

    /**
     * Deletes a specific checkpoint
     * @param {string} checkpointId - Checkpoint to delete
     * @returns {Promise<void>}
     */
    async deleteCheckpoint(checkpointId) {
        const checkpoint = await this._loadCheckpoint(checkpointId);
        if (!checkpoint) return;

        // Remove from index
        const sessionCheckpoints = this.checkpointIndex.get(checkpoint.sessionId) || [];
        const updatedCheckpoints = sessionCheckpoints.filter(id => id !== checkpointId);
        this.checkpointIndex.set(checkpoint.sessionId, updatedCheckpoints);

        // Delete checkpoint file
        await this.persistence.deleteCheckpoint(checkpointId);
        
        // Remove from memory cache
        this.checkpoints.delete(checkpointId);
        
        this.emit('checkpoint:deleted', { checkpointId, sessionId: checkpoint.sessionId });
    }

    /**
     * Deletes all checkpoints for a session
     * @param {string} sessionId - Session identifier
     * @returns {Promise<number>} Number of checkpoints deleted
     */
    async deleteSessionCheckpoints(sessionId) {
        const checkpointIds = this.checkpointIndex.get(sessionId) || [];
        let deletedCount = 0;

        for (const checkpointId of checkpointIds) {
            try {
                await this.deleteCheckpoint(checkpointId);
                deletedCount++;
            } catch (error) {
                this.emit('error', { 
                    type: 'checkpoint_delete_failed', 
                    checkpointId, 
                    error 
                });
            }
        }

        this.checkpointIndex.delete(sessionId);
        
        return deletedCount;
    }

    /**
     * Gets checkpoint statistics
     * @returns {Object} Statistics object
     */
    getStats() {
        return {
            ...this.stats,
            activeCheckpoints: this.checkpoints.size,
            sessionsWithCheckpoints: this.checkpointIndex.size,
            averageCheckpointsPerSession: this.checkpointIndex.size > 0 ? 
                Array.from(this.checkpointIndex.values()).reduce((sum, arr) => sum + arr.length, 0) / 
                this.checkpointIndex.size : 0
        };
    }

    /**
     * Performs cleanup operations
     * @param {Object} options - Cleanup options
     * @returns {Promise<Object>} Cleanup results
     */
    async cleanup(options = {}) {
        const results = {
            checkpointsDeleted: 0,
            bytesFreed: 0
        };

        // Clean up expired checkpoints
        const expiredResults = await this._cleanupExpiredCheckpoints();
        results.checkpointsDeleted += expiredResults.deleted;
        results.bytesFreed += expiredResults.bytesFreed;

        // Clean up excess checkpoints per session
        for (const [sessionId, checkpointIds] of this.checkpointIndex) {
            if (checkpointIds.length > this.options.maxCheckpoints) {
                const excessCount = checkpointIds.length - this.options.maxCheckpoints;
                const oldestCheckpoints = checkpointIds.slice(0, excessCount);
                
                for (const checkpointId of oldestCheckpoints) {
                    try {
                        await this.deleteCheckpoint(checkpointId);
                        results.checkpointsDeleted++;
                    } catch (error) {
                        this.emit('error', { type: 'cleanup_error', checkpointId, error });
                    }
                }
            }
        }

        return results;
    }

    /**
     * Shuts down the checkpoint manager
     * @returns {Promise<void>}
     */
    async shutdown() {
        // Save checkpoint index
        await this._saveCheckpointIndex();
        
        // Clear memory caches
        this.checkpoints.clear();
        this.checkpointIndex.clear();
        this.recoveryPoints.clear();
        
        this.emit('checkpoint_manager:shutdown');
    }

    // Private methods

    async _createCheckpoint(sessionId, sessionData, options) {
        if (!this._initialized) {
            await this.initialize();
        }

        const checkpointId = this._generateCheckpointId();
        const timestamp = new Date().toISOString();

        // Create checkpoint data structure
        const checkpointData = {
            id: checkpointId,
            sessionId,
            createdAt: timestamp,
            type: options.type,
            trigger: options.trigger,
            label: options.label,
            conversationSnapshot: [...(sessionData.conversation || [])],
            sessionState: {
                title: sessionData.title,
                model: sessionData.state?.model,
                context: { ...sessionData.state?.context },
                tools: [...(sessionData.state?.tools || [])],
                permissions: { ...sessionData.state?.permissions },
                metadata: { ...sessionData.metadata }
            },
            environmentSnapshot: this._captureEnvironmentSnapshot(),
            metadata: options.metadata || {},
            version: '1.0'
        };

        // Calculate size before compression
        const rawSize = JSON.stringify(checkpointData).length;
        
        // Compress if enabled and size is significant
        let compressed = false;
        if (this.options.compressionEnabled && rawSize > 10000) {
            checkpointData.conversationSnapshot = await this._compressConversation(
                checkpointData.conversationSnapshot
            );
            compressed = true;
            
            const compressedSize = JSON.stringify(checkpointData).length;
            this.stats.compressionSavings += rawSize - compressedSize;
        }

        checkpointData.size = rawSize;
        checkpointData.compressed = compressed;

        // Save checkpoint
        await this.persistence.saveCheckpoint(checkpointId, checkpointData);
        
        // Update index
        if (!this.checkpointIndex.has(sessionId)) {
            this.checkpointIndex.set(sessionId, []);
        }
        this.checkpointIndex.get(sessionId).push(checkpointId);

        // Cache in memory
        this.checkpoints.set(checkpointId, checkpointData);

        // Update statistics
        this.stats.checkpointsCreated++;
        if (options.type === 'auto') {
            this.stats.autoCheckpoints++;
        } else if (options.type === 'manual') {
            this.stats.manualCheckpoints++;
        }

        this.emit('checkpoint:created', { 
            checkpointId, 
            sessionId, 
            type: options.type,
            size: rawSize,
            compressed 
        });

        return checkpointId;
    }

    async _loadCheckpoint(checkpointId) {
        // Check memory cache first
        if (this.checkpoints.has(checkpointId)) {
            return this.checkpoints.get(checkpointId);
        }

        // Load from persistence
        const checkpoint = await this.persistence.loadCheckpoint(checkpointId);
        if (checkpoint) {
            // Decompress if needed
            if (checkpoint.compressed) {
                checkpoint.conversationSnapshot = await this._decompressConversation(
                    checkpoint.conversationSnapshot
                );
            }
            
            // Cache in memory
            this.checkpoints.set(checkpointId, checkpoint);
        }

        return checkpoint;
    }

    async _loadCheckpointIndex() {
        try {
            const index = await this.persistence.loadCheckpointIndex();
            if (index) {
                for (const [sessionId, checkpointIds] of Object.entries(index)) {
                    this.checkpointIndex.set(sessionId, checkpointIds);
                }
            }
        } catch (error) {
            this.emit('warning', { type: 'index_load_failed', error });
        }
    }

    async _saveCheckpointIndex() {
        try {
            const index = {};
            for (const [sessionId, checkpointIds] of this.checkpointIndex) {
                index[sessionId] = checkpointIds;
            }
            await this.persistence.saveCheckpointIndex(index);
        } catch (error) {
            this.emit('error', { type: 'index_save_failed', error });
        }
    }

    async _cleanupExpiredCheckpoints() {
        const cutoffTime = Date.now() - this.options.checkpointRetention;
        let deleted = 0;
        let bytesFreed = 0;

        for (const [sessionId, checkpointIds] of this.checkpointIndex) {
            const validCheckpoints = [];
            
            for (const checkpointId of checkpointIds) {
                try {
                    const checkpoint = await this._loadCheckpoint(checkpointId);
                    if (checkpoint && new Date(checkpoint.createdAt).getTime() > cutoffTime) {
                        validCheckpoints.push(checkpointId);
                    } else {
                        if (checkpoint) {
                            bytesFreed += checkpoint.size || 0;
                        }
                        await this.persistence.deleteCheckpoint(checkpointId);
                        this.checkpoints.delete(checkpointId);
                        deleted++;
                    }
                } catch (error) {
                    this.emit('error', { type: 'cleanup_error', checkpointId, error });
                }
            }
            
            this.checkpointIndex.set(sessionId, validCheckpoints);
        }

        return { deleted, bytesFreed };
    }

    async _createRecoveryPoint(newSessionId, checkpointId, originalSessionId) {
        const recoveryData = {
            restoredSessionId: newSessionId,
            sourceCheckpointId: checkpointId,
            originalSessionId,
            timestamp: new Date().toISOString()
        };
        
        this.recoveryPoints.set(newSessionId, recoveryData);
    }

    _captureEnvironmentSnapshot() {
        return {
            cwd: process.cwd(),
            timestamp: new Date().toISOString(),
            memory: process.memoryUsage(),
            uptime: process.uptime(),
            version: process.version,
            platform: process.platform
        };
    }

    async _compressConversation(conversation) {
        // Simple compression strategy - summarize older messages
        if (conversation.length <= 20) {
            return conversation;
        }

        const recentMessages = conversation.slice(-15);
        const oldMessages = conversation.slice(0, -15);
        
        // Create a summary of old messages
        const summary = {
            id: `compressed_${crypto.randomBytes(4).toString('hex')}`,
            role: 'system',
            content: `[Compressed ${oldMessages.length} messages from ${oldMessages[0].timestamp} to ${oldMessages[oldMessages.length-1].timestamp}]`,
            timestamp: oldMessages[0].timestamp,
            metadata: { 
                type: 'compression_summary',
                originalCount: oldMessages.length
            }
        };

        return [summary, ...recentMessages];
    }

    async _decompressConversation(conversation) {
        // For now, just return as-is since we use simple compression
        // In a full implementation, this would reverse the compression
        return conversation;
    }

    _compareObjects(obj1, obj2, path = '') {
        const differences = [];
        
        const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
        
        for (const key of keys) {
            const currentPath = path ? `${path}.${key}` : key;
            
            if (!(key in obj1)) {
                differences.push({ path: currentPath, type: 'added', value: obj2[key] });
            } else if (!(key in obj2)) {
                differences.push({ path: currentPath, type: 'removed', value: obj1[key] });
            } else if (obj1[key] !== obj2[key]) {
                if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                    differences.push(...this._compareObjects(obj1[key], obj2[key], currentPath));
                } else {
                    differences.push({ 
                        path: currentPath, 
                        type: 'changed', 
                        oldValue: obj1[key], 
                        newValue: obj2[key] 
                    });
                }
            }
        }
        
        return differences;
    }

    _compareConversations(conv1, conv2) {
        return {
            messageCountDiff: conv2.length - conv1.length,
            newMessages: conv2.slice(conv1.length),
            hasModifications: conv1.length > 0 && 
                JSON.stringify(conv1.slice(0, Math.min(conv1.length, conv2.length))) !== 
                JSON.stringify(conv2.slice(0, Math.min(conv1.length, conv2.length)))
        };
    }

    _generateCheckpointId() {
        return `checkpoint_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
    }

    _generateSessionId() {
        return `session_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
    }
}

module.exports = CheckpointManager;