/**
 * @fileoverview Context and Memory Management
 * 
 * This module manages conversation context, memory optimization, 
 * and intelligent context window management for efficient token usage.
 */

const { EventEmitter } = require('events');
const crypto = require('crypto');

/**
 * Manages conversation context and memory optimization
 * Provides intelligent context windowing, memory management, and context preservation
 */
class ContextManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            maxContextTokens: options.maxContextTokens || 200000,
            reservedTokens: options.reservedTokens || 10000, // Reserved for response
            compressionThreshold: options.compressionThreshold || 0.8, // Start compression at 80%
            contextRetentionStrategy: options.contextRetentionStrategy || 'adaptive', // adaptive, sliding, priority
            memoryOptimizationEnabled: options.memoryOptimizationEnabled !== false,
            semanticSearchEnabled: options.semanticSearchEnabled || false,
            ...options
        };

        // Context storage per session
        this.sessionContexts = new Map();
        
        // Memory optimization structures
        this.memoryCache = new Map();
        this.contextSummaries = new Map();
        this.importantMoments = new Map();
        
        // Context statistics
        this.stats = {
            contextsManaged: 0,
            tokensSaved: 0,
            compressionOperations: 0,
            contextRetrievals: 0,
            memoryOptimizations: 0
        };

        // Context processing pipeline
        this.processors = [
            this._extractEntities.bind(this),
            this._identifyImportantMoments.bind(this),
            this._updateSemanticIndex.bind(this),
            this._optimizeMemoryUsage.bind(this)
        ];
    }

    /**
     * Initializes context management for a session
     * @param {string} sessionId - Session identifier
     * @param {Object} initialContext - Initial context state
     * @returns {Promise<void>}
     */
    async initialize(sessionId, initialContext = {}) {
        if (this.sessionContexts.has(sessionId)) {
            return; // Already initialized
        }

        const contextState = {
            sessionId,
            createdAt: new Date().toISOString(),
            lastOptimized: new Date().toISOString(),
            
            // Core context data
            activeWindow: {
                messages: [],
                tokenCount: 0,
                summary: null,
                compressionLevel: 0
            },
            
            // Memory structures
            longTermMemory: {
                keyFacts: new Map(),
                entities: new Map(),
                relationships: new Map(),
                preferences: new Map()
            },
            
            // Context optimization data
            compressionHistory: [],
            importantMoments: [],
            contextSummaries: [],
            
            // Performance metrics
            metrics: {
                totalTokensProcessed: 0,
                compressionRatio: 0,
                retrievalAccuracy: 0,
                memoryEfficiency: 0
            },
            
            // User-defined context
            userContext: { ...initialContext }
        };

        this.sessionContexts.set(sessionId, contextState);
        this.stats.contextsManaged++;
        
        this.emit('context:initialized', { sessionId, contextState });
    }

    /**
     * Updates context with new message
     * @param {string} sessionId - Session identifier
     * @param {Object} message - New message to add to context
     * @returns {Promise<Object>} Context update result
     */
    async updateContext(sessionId, message) {
        const context = this.sessionContexts.get(sessionId);
        if (!context) {
            throw new Error(`Context not found for session: ${sessionId}`);
        }

        // Add message to active window
        context.activeWindow.messages.push(message);
        context.activeWindow.tokenCount += this._estimateTokens(message.content);
        context.metrics.totalTokensProcessed += this._estimateTokens(message.content);

        // Process message through context pipeline
        const processingResult = await this._processMessage(sessionId, message);
        
        // Check if context window management is needed
        if (this._shouldOptimizeContext(context)) {
            await this._optimizeContext(sessionId);
        }

        this.emit('context:updated', { 
            sessionId, 
            message, 
            contextState: context,
            processingResult 
        });

        return {
            contextSize: context.activeWindow.tokenCount,
            compressionLevel: context.activeWindow.compressionLevel,
            optimizationNeeded: this._shouldOptimizeContext(context),
            processingResult
        };
    }

    /**
     * Retrieves relevant context for a query
     * @param {string} sessionId - Session identifier
     * @param {string} query - Query to find relevant context for
     * @param {Object} options - Retrieval options
     * @returns {Promise<Object>} Relevant context information
     */
    async getRelevantContext(sessionId, query, options = {}) {
        const context = this.sessionContexts.get(sessionId);
        if (!context) {
            throw new Error(`Context not found for session: ${sessionId}`);
        }

        this.stats.contextRetrievals++;

        // Search strategies
        const relevantContext = {
            recentMessages: this._getRecentMessages(context, options.recentCount || 10),
            keyFacts: this._searchKeyFacts(context, query),
            relatedEntities: this._findRelatedEntities(context, query),
            importantMoments: this._getRelatedMoments(context, query),
            contextSummary: context.activeWindow.summary
        };

        // Add semantic search results if enabled
        if (this.options.semanticSearchEnabled) {
            relevantContext.semanticMatches = await this._semanticSearch(sessionId, query);
        }

        // Calculate relevance scores
        relevantContext.relevanceScore = this._calculateRelevanceScore(relevantContext, query);

        return relevantContext;
    }

    /**
     * Optimizes context window to fit within token limits
     * @param {string} sessionId - Session identifier
     * @param {Object} options - Optimization options
     * @returns {Promise<Object>} Optimization result
     */
    async optimizeContext(sessionId, options = {}) {
        const context = this.sessionContexts.get(sessionId);
        if (!context) {
            throw new Error(`Context not found for session: ${sessionId}`);
        }

        const beforeTokens = context.activeWindow.tokenCount;
        const beforeSize = context.activeWindow.messages.length;

        await this._optimizeContext(sessionId, options);

        const afterTokens = context.activeWindow.tokenCount;
        const afterSize = context.activeWindow.messages.length;

        const result = {
            tokensSaved: beforeTokens - afterTokens,
            messagesSaved: beforeSize - afterSize,
            compressionRatio: afterTokens / beforeTokens,
            newCompressionLevel: context.activeWindow.compressionLevel,
            optimizationStrategy: options.strategy || this.options.contextRetentionStrategy
        };

        this.stats.tokensSaved += result.tokensSaved;
        this.stats.compressionOperations++;

        this.emit('context:optimized', { sessionId, result });

        return result;
    }

    /**
     * Adds a key fact to long-term memory
     * @param {string} sessionId - Session identifier
     * @param {string} key - Fact identifier
     * @param {*} value - Fact value
     * @param {Object} metadata - Optional metadata
     * @returns {Promise<void>}
     */
    async addKeyFact(sessionId, key, value, metadata = {}) {
        const context = this.sessionContexts.get(sessionId);
        if (!context) {
            throw new Error(`Context not found for session: ${sessionId}`);
        }

        context.longTermMemory.keyFacts.set(key, {
            value,
            timestamp: new Date().toISOString(),
            accessCount: 0,
            metadata
        });

        this.emit('context:fact_added', { sessionId, key, value, metadata });
    }

    /**
     * Retrieves a key fact from long-term memory
     * @param {string} sessionId - Session identifier
     * @param {string} key - Fact identifier
     * @returns {*} Fact value or undefined
     */
    getKeyFact(sessionId, key) {
        const context = this.sessionContexts.get(sessionId);
        if (!context) return undefined;

        const fact = context.longTermMemory.keyFacts.get(key);
        if (fact) {
            fact.accessCount++;
            fact.lastAccessed = new Date().toISOString();
            return fact.value;
        }
        
        return undefined;
    }

    /**
     * Updates user preferences in context
     * @param {string} sessionId - Session identifier
     * @param {Object} preferences - User preferences to update
     * @returns {Promise<void>}
     */
    async updateUserPreferences(sessionId, preferences) {
        const context = this.sessionContexts.get(sessionId);
        if (!context) {
            throw new Error(`Context not found for session: ${sessionId}`);
        }

        for (const [key, value] of Object.entries(preferences)) {
            context.longTermMemory.preferences.set(key, {
                value,
                updatedAt: new Date().toISOString(),
                source: 'user_explicit'
            });
        }

        this.emit('context:preferences_updated', { sessionId, preferences });
    }

    /**
     * Gets context summary for external systems
     * @param {string} sessionId - Session identifier
     * @returns {Object} Context summary
     */
    getContextSummary(sessionId) {
        const context = this.sessionContexts.get(sessionId);
        if (!context) {
            throw new Error(`Context not found for session: ${sessionId}`);
        }

        return {
            sessionId,
            activeWindowSize: context.activeWindow.messages.length,
            tokenCount: context.activeWindow.tokenCount,
            compressionLevel: context.activeWindow.compressionLevel,
            keyFactsCount: context.longTermMemory.keyFacts.size,
            entitiesCount: context.longTermMemory.entities.size,
            importantMomentsCount: context.importantMoments.length,
            lastOptimized: context.lastOptimized,
            metrics: context.metrics,
            userContext: context.userContext
        };
    }

    /**
     * Exports context for backup or analysis
     * @param {string} sessionId - Session identifier
     * @param {Object} options - Export options
     * @returns {Promise<Object>} Exported context
     */
    async exportContext(sessionId, options = {}) {
        const context = this.sessionContexts.get(sessionId);
        if (!context) {
            throw new Error(`Context not found for session: ${sessionId}`);
        }

        const exportData = {
            sessionId,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };

        if (options.includeActiveWindow !== false) {
            exportData.activeWindow = {
                messages: context.activeWindow.messages,
                tokenCount: context.activeWindow.tokenCount,
                summary: context.activeWindow.summary,
                compressionLevel: context.activeWindow.compressionLevel
            };
        }

        if (options.includeLongTermMemory !== false) {
            exportData.longTermMemory = {
                keyFacts: Object.fromEntries(context.longTermMemory.keyFacts),
                entities: Object.fromEntries(context.longTermMemory.entities),
                relationships: Object.fromEntries(context.longTermMemory.relationships),
                preferences: Object.fromEntries(context.longTermMemory.preferences)
            };
        }

        if (options.includeMetrics !== false) {
            exportData.metrics = context.metrics;
            exportData.compressionHistory = context.compressionHistory;
            exportData.importantMoments = context.importantMoments;
        }

        return exportData;
    }

    /**
     * Imports context from backup
     * @param {string} sessionId - Session identifier
     * @param {Object} contextData - Context data to import
     * @returns {Promise<void>}
     */
    async importContext(sessionId, contextData) {
        if (this.sessionContexts.has(sessionId)) {
            throw new Error(`Context already exists for session: ${sessionId}`);
        }

        // Reconstruct context state from imported data
        const context = {
            sessionId,
            createdAt: contextData.createdAt || new Date().toISOString(),
            lastOptimized: contextData.lastOptimized || new Date().toISOString(),
            
            activeWindow: contextData.activeWindow || {
                messages: [],
                tokenCount: 0,
                summary: null,
                compressionLevel: 0
            },
            
            longTermMemory: {
                keyFacts: new Map(Object.entries(contextData.longTermMemory?.keyFacts || {})),
                entities: new Map(Object.entries(contextData.longTermMemory?.entities || {})),
                relationships: new Map(Object.entries(contextData.longTermMemory?.relationships || {})),
                preferences: new Map(Object.entries(contextData.longTermMemory?.preferences || {}))
            },
            
            compressionHistory: contextData.compressionHistory || [],
            importantMoments: contextData.importantMoments || [],
            contextSummaries: contextData.contextSummaries || [],
            
            metrics: contextData.metrics || {
                totalTokensProcessed: 0,
                compressionRatio: 0,
                retrievalAccuracy: 0,
                memoryEfficiency: 0
            },
            
            userContext: contextData.userContext || {}
        };

        this.sessionContexts.set(sessionId, context);
        this.emit('context:imported', { sessionId, contextData });
    }

    /**
     * Cleans up context resources for a session
     * @param {string} sessionId - Session identifier
     * @returns {Promise<void>}
     */
    async cleanup(sessionId) {
        if (this.sessionContexts.has(sessionId)) {
            this.sessionContexts.delete(sessionId);
            this.memoryCache.delete(sessionId);
            this.contextSummaries.delete(sessionId);
            this.importantMoments.delete(sessionId);
            
            this.emit('context:cleanup', { sessionId });
        }
    }

    /**
     * Gets global context management statistics
     * @returns {Object} Global statistics
     */
    getGlobalStats() {
        return {
            ...this.stats,
            activeContexts: this.sessionContexts.size,
            memoryUsage: this._calculateMemoryUsage()
        };
    }

    // Private methods

    async _processMessage(sessionId, message) {
        const context = this.sessionContexts.get(sessionId);
        const results = {};

        // Run message through processing pipeline
        for (const processor of this.processors) {
            try {
                const processorResult = await processor(context, message);
                Object.assign(results, processorResult);
            } catch (error) {
                this.emit('error', { 
                    type: 'context_processing_error', 
                    sessionId, 
                    processor: processor.name,
                    error 
                });
            }
        }

        return results;
    }

    _shouldOptimizeContext(context) {
        const tokenThreshold = this.options.maxContextTokens * this.options.compressionThreshold;
        return context.activeWindow.tokenCount > tokenThreshold;
    }

    async _optimizeContext(sessionId, options = {}) {
        const context = this.sessionContexts.get(sessionId);
        const strategy = options.strategy || this.options.contextRetentionStrategy;

        switch (strategy) {
            case 'adaptive':
                await this._adaptiveOptimization(context);
                break;
            case 'sliding':
                await this._slidingWindowOptimization(context);
                break;
            case 'priority':
                await this._priorityBasedOptimization(context);
                break;
            default:
                await this._adaptiveOptimization(context);
        }

        context.lastOptimized = new Date().toISOString();
        this.stats.memoryOptimizations++;
    }

    async _adaptiveOptimization(context) {
        // Intelligent optimization that considers message importance and recency
        const messages = context.activeWindow.messages;
        const targetTokens = this.options.maxContextTokens - this.options.reservedTokens;
        
        // Score messages by importance
        const scoredMessages = messages.map((message, index) => ({
            message,
            index,
            score: this._calculateMessageImportance(message, index, messages)
        }));

        // Sort by score (descending) and select top messages within token limit
        scoredMessages.sort((a, b) => b.score - a.score);
        
        let tokenCount = 0;
        const selectedMessages = [];
        
        for (const { message, index } of scoredMessages) {
            const messageTokens = this._estimateTokens(message.content);
            if (tokenCount + messageTokens <= targetTokens) {
                selectedMessages.push({ message, originalIndex: index });
                tokenCount += messageTokens;
            }
        }

        // Restore chronological order
        selectedMessages.sort((a, b) => a.originalIndex - b.originalIndex);
        
        // Create summary of removed messages
        const removedMessages = messages.filter((_, index) => 
            !selectedMessages.some(selected => selected.originalIndex === index)
        );
        
        if (removedMessages.length > 0) {
            const summary = await this._createMessageSummary(removedMessages);
            context.contextSummaries.push(summary);
        }

        // Update context window
        context.activeWindow.messages = selectedMessages.map(({ message }) => message);
        context.activeWindow.tokenCount = tokenCount;
        context.activeWindow.compressionLevel++;
        
        // Update compression history
        context.compressionHistory.push({
            timestamp: new Date().toISOString(),
            strategy: 'adaptive',
            messagesBefore: messages.length,
            messagesAfter: selectedMessages.length,
            tokensSaved: context.metrics.totalTokensProcessed - tokenCount
        });
    }

    async _slidingWindowOptimization(context) {
        // Keep most recent messages within token limit
        const targetTokens = this.options.maxContextTokens - this.options.reservedTokens;
        const messages = context.activeWindow.messages;
        
        let tokenCount = 0;
        let keepFromIndex = messages.length;
        
        // Work backwards from most recent message
        for (let i = messages.length - 1; i >= 0; i--) {
            const messageTokens = this._estimateTokens(messages[i].content);
            if (tokenCount + messageTokens <= targetTokens) {
                tokenCount += messageTokens;
                keepFromIndex = i;
            } else {
                break;
            }
        }
        
        // Create summary of removed messages
        if (keepFromIndex > 0) {
            const removedMessages = messages.slice(0, keepFromIndex);
            const summary = await this._createMessageSummary(removedMessages);
            context.contextSummaries.push(summary);
        }

        // Update context window
        context.activeWindow.messages = messages.slice(keepFromIndex);
        context.activeWindow.tokenCount = tokenCount;
        context.activeWindow.compressionLevel++;
    }

    async _priorityBasedOptimization(context) {
        // Keep high-priority messages (system, error, important moments)
        const messages = context.activeWindow.messages;
        const targetTokens = this.options.maxContextTokens - this.options.reservedTokens;
        
        // Classify messages by priority
        const highPriority = [];
        const mediumPriority = [];
        const lowPriority = [];
        
        messages.forEach((message, index) => {
            const priority = this._getMessagePriority(message, index, messages);
            switch (priority) {
                case 'high':
                    highPriority.push(message);
                    break;
                case 'medium':
                    mediumPriority.push(message);
                    break;
                default:
                    lowPriority.push(message);
            }
        });

        // Select messages starting with high priority
        const selectedMessages = [];
        let tokenCount = 0;
        
        for (const priorityGroup of [highPriority, mediumPriority, lowPriority]) {
            for (const message of priorityGroup) {
                const messageTokens = this._estimateTokens(message.content);
                if (tokenCount + messageTokens <= targetTokens) {
                    selectedMessages.push(message);
                    tokenCount += messageTokens;
                }
            }
        }

        // Update context window
        context.activeWindow.messages = selectedMessages;
        context.activeWindow.tokenCount = tokenCount;
        context.activeWindow.compressionLevel++;
    }

    async _extractEntities(context, message) {
        const entities = new Map();
        const content = message.content.toLowerCase();
        
        // Extract file paths
        const filePaths = message.content.match(/[\/\w\-_\.]+\.[a-zA-Z]+/g) || [];
        filePaths.forEach(path => {
            entities.set(`file:${path}`, {
                type: 'file',
                value: path,
                mentions: 1,
                lastSeen: message.timestamp
            });
        });
        
        // Extract URLs
        const urls = message.content.match(/https?:\/\/[^\s]+/g) || [];
        urls.forEach(url => {
            entities.set(`url:${url}`, {
                type: 'url',
                value: url,
                mentions: 1,
                lastSeen: message.timestamp
            });
        });
        
        // Update long-term memory with entities
        for (const [key, entity] of entities) {
            if (context.longTermMemory.entities.has(key)) {
                const existing = context.longTermMemory.entities.get(key);
                existing.mentions++;
                existing.lastSeen = message.timestamp;
            } else {
                context.longTermMemory.entities.set(key, entity);
            }
        }
        
        return { entities: Array.from(entities.keys()) };
    }

    async _identifyImportantMoments(context, message) {
        const importance = this._calculateMessageImportance(message, context.activeWindow.messages.length - 1, context.activeWindow.messages);
        
        if (importance > 0.7) { // High importance threshold
            const moment = {
                messageId: message.id,
                timestamp: message.timestamp,
                importance,
                reason: this._getImportanceReason(message),
                content: message.content.slice(0, 200) // Preview
            };
            
            context.importantMoments.push(moment);
            
            // Keep only recent important moments
            if (context.importantMoments.length > 50) {
                context.importantMoments = context.importantMoments.slice(-50);
            }
            
            return { importantMoment: moment };
        }
        
        return {};
    }

    async _updateSemanticIndex(context, message) {
        // Placeholder for semantic indexing
        // In production, this would update vector embeddings
        return {};
    }

    async _optimizeMemoryUsage(context, message) {
        // Clean up old cache entries
        const memoryThreshold = 1000000; // 1MB
        const currentMemoryUsage = JSON.stringify(context).length;
        
        if (currentMemoryUsage > memoryThreshold) {
            // Remove oldest cache entries
            const oldestFacts = Array.from(context.longTermMemory.keyFacts.entries())
                .sort(([,a], [,b]) => new Date(a.timestamp) - new Date(b.timestamp))
                .slice(0, Math.floor(context.longTermMemory.keyFacts.size * 0.1));
            
            oldestFacts.forEach(([key]) => {
                context.longTermMemory.keyFacts.delete(key);
            });
            
            return { memoryOptimized: oldestFacts.length };
        }
        
        return {};
    }

    _calculateMessageImportance(message, index, allMessages) {
        let score = 0;
        
        // Recency bonus (more recent = higher score)
        score += (index / allMessages.length) * 0.2;
        
        // Length bonus (longer messages often more important)
        score += Math.min(message.content.length / 1000, 1) * 0.2;
        
        // Content analysis
        if (message.role === 'system') score += 0.3;
        if (message.content.includes('error')) score += 0.2;
        if (message.content.includes('```')) score += 0.1; // Code blocks
        if (message.content.match(/\b(important|critical|urgent|note)\b/i)) score += 0.2;
        
        return Math.min(score, 1);
    }

    _getMessagePriority(message, index, allMessages) {
        const importance = this._calculateMessageImportance(message, index, allMessages);
        
        if (importance > 0.7) return 'high';
        if (importance > 0.4) return 'medium';
        return 'low';
    }

    _getImportanceReason(message) {
        const reasons = [];
        
        if (message.role === 'system') reasons.push('system message');
        if (message.content.includes('error')) reasons.push('error discussion');
        if (message.content.includes('```')) reasons.push('contains code');
        if (message.content.length > 1000) reasons.push('long message');
        if (message.content.match(/\b(important|critical|urgent)\b/i)) reasons.push('marked as important');
        
        return reasons.join(', ') || 'high content relevance';
    }

    async _createMessageSummary(messages) {
        // Create a concise summary of removed messages
        const summary = {
            id: crypto.randomBytes(8).toString('hex'),
            timestamp: new Date().toISOString(),
            messageCount: messages.length,
            timespan: {
                start: messages[0]?.timestamp,
                end: messages[messages.length - 1]?.timestamp
            },
            summary: `Summary of ${messages.length} messages`,
            keyTopics: this._extractKeyTopics(messages),
            importance: messages.reduce((sum, msg, idx) => 
                sum + this._calculateMessageImportance(msg, idx, messages), 0) / messages.length
        };
        
        return summary;
    }

    _extractKeyTopics(messages) {
        // Simple topic extraction
        const wordFreq = {};
        const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for']);
        
        messages.forEach(msg => {
            const words = msg.content.toLowerCase().match(/\w+/g) || [];
            words.forEach(word => {
                if (word.length > 3 && !stopWords.has(word)) {
                    wordFreq[word] = (wordFreq[word] || 0) + 1;
                }
            });
        });
        
        return Object.entries(wordFreq)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([word]) => word);
    }

    _getRecentMessages(context, count) {
        return context.activeWindow.messages.slice(-count);
    }

    _searchKeyFacts(context, query) {
        const queryTerms = query.toLowerCase().split(/\s+/);
        const relevantFacts = [];
        
        for (const [key, fact] of context.longTermMemory.keyFacts) {
            const factText = `${key} ${JSON.stringify(fact.value)}`.toLowerCase();
            let score = 0;
            
            queryTerms.forEach(term => {
                if (factText.includes(term)) {
                    score += 1;
                }
            });
            
            if (score > 0) {
                relevantFacts.push({ key, fact, relevanceScore: score });
            }
        }
        
        return relevantFacts
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, 10);
    }

    _findRelatedEntities(context, query) {
        const queryTerms = query.toLowerCase().split(/\s+/);
        const relatedEntities = [];
        
        for (const [key, entity] of context.longTermMemory.entities) {
            let score = 0;
            
            queryTerms.forEach(term => {
                if (entity.value.toLowerCase().includes(term)) {
                    score += entity.mentions;
                }
            });
            
            if (score > 0) {
                relatedEntities.push({ key, entity, relevanceScore: score });
            }
        }
        
        return relatedEntities
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, 5);
    }

    _getRelatedMoments(context, query) {
        const queryTerms = query.toLowerCase().split(/\s+/);
        
        return context.importantMoments.filter(moment => {
            const content = moment.content.toLowerCase();
            return queryTerms.some(term => content.includes(term));
        }).slice(0, 3);
    }

    async _semanticSearch(sessionId, query) {
        // Placeholder for semantic search implementation
        // Would use vector embeddings in production
        return [];
    }

    _calculateRelevanceScore(context, query) {
        let score = 0;
        
        score += context.recentMessages.length * 0.1;
        score += context.keyFacts.length * 0.2;
        score += context.relatedEntities.length * 0.2;
        score += context.importantMoments.length * 0.3;
        
        return Math.min(score, 1);
    }

    _estimateTokens(text) {
        return Math.ceil(text.length / 4); // Rough estimation
    }

    _calculateMemoryUsage() {
        let totalSize = 0;
        
        for (const [sessionId, context] of this.sessionContexts) {
            totalSize += JSON.stringify(context).length;
        }
        
        return {
            totalBytes: totalSize,
            contextCount: this.sessionContexts.size,
            averageSizePerContext: totalSize / Math.max(this.sessionContexts.size, 1)
        };
    }
}

module.exports = ContextManager;