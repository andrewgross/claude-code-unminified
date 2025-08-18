/**
 * @fileoverview Conversation State Management
 * 
 * This module manages conversation state, message handling, context windows,
 * and conversation flow for Claude Code sessions.
 */

const { EventEmitter } = require('events');
const crypto = require('crypto');

/**
 * Manages conversation state and message handling
 * Provides context window management, message validation, and conversation flow control
 */
class ConversationManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            maxHistory: options.maxHistory || 1000,
            contextWindowSize: options.contextWindowSize || 200000, // tokens
            maxMessageSize: options.maxMessageSize || 50000, // characters
            enableCompression: options.enableCompression !== false,
            retentionPolicy: options.retentionPolicy || 'fifo', // fifo, priority, semantic
            ...options
        };

        // Active conversations cache
        this.conversations = new Map();
        
        // Message processing queue
        this.messageQueue = new Map();
        
        // Context windows for each session
        this.contextWindows = new Map();
        
        // Conversation statistics
        this.stats = {
            totalMessages: 0,
            conversationsActive: 0,
            averageMessageLength: 0,
            contextWindowHits: 0
        };
    }

    /**
     * Initializes conversation manager for a session
     * @param {string} sessionId - Session identifier
     * @param {Array} existingMessages - Existing conversation history
     * @returns {Promise<void>}
     */
    async initialize(sessionId, existingMessages = []) {
        if (this.conversations.has(sessionId)) {
            return; // Already initialized
        }

        const conversationState = {
            sessionId,
            messages: [...existingMessages],
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            messageCount: existingMessages.length,
            totalTokens: 0,
            contextSummary: null,
            tags: new Set(),
            participants: new Set(['user', 'assistant'])
        };

        // Calculate initial token count
        conversationState.totalTokens = this._estimateTokenCount(existingMessages);
        
        // Extract participants and tags
        this._analyzeConversation(conversationState);

        this.conversations.set(sessionId, conversationState);
        this.contextWindows.set(sessionId, this._createContextWindow(conversationState));
        
        this.stats.conversationsActive = this.conversations.size;
        
        this.emit('conversation:initialized', { sessionId, conversationState });
    }

    /**
     * Adds a message to a conversation
     * @param {string} sessionId - Session identifier
     * @param {Object} message - Message to add
     * @returns {Promise<Object>} Processed message
     */
    async addMessage(sessionId, message) {
        const conversation = this.conversations.get(sessionId);
        if (!conversation) {
            throw new Error(`Conversation not found for session: ${sessionId}`);
        }

        // Validate message
        const validatedMessage = this._validateMessage(message);
        
        // Process message through pipeline
        const processedMessage = await this._processMessage(sessionId, validatedMessage);
        
        // Add to conversation
        conversation.messages.push(processedMessage);
        conversation.messageCount++;
        conversation.lastActivity = new Date().toISOString();
        conversation.totalTokens += this._estimateMessageTokens(processedMessage);
        
        // Update context window
        this._updateContextWindow(sessionId, processedMessage);
        
        // Update statistics
        this.stats.totalMessages++;
        this._updateAverageMessageLength(processedMessage);
        
        // Check if context window needs management
        if (conversation.totalTokens > this.options.contextWindowSize) {
            await this._manageContextWindow(sessionId);
        }

        this.emit('message:processed', { 
            sessionId, 
            message: processedMessage,
            conversationState: conversation 
        });
        
        return processedMessage;
    }

    /**
     * Gets conversation history with optional filtering
     * @param {string} sessionId - Session identifier
     * @param {Object} options - Query options
     * @returns {Promise<Array>} Message history
     */
    async getHistory(sessionId, options = {}) {
        const conversation = this.conversations.get(sessionId);
        if (!conversation) {
            throw new Error(`Conversation not found for session: ${sessionId}`);
        }

        let messages = [...conversation.messages];

        // Apply filters
        if (options.role) {
            messages = messages.filter(msg => msg.role === options.role);
        }

        if (options.since) {
            const sinceDate = new Date(options.since);
            messages = messages.filter(msg => new Date(msg.timestamp) >= sinceDate);
        }

        if (options.until) {
            const untilDate = new Date(options.until);
            messages = messages.filter(msg => new Date(msg.timestamp) <= untilDate);
        }

        if (options.limit) {
            messages = messages.slice(-options.limit);
        }

        if (options.search) {
            messages = messages.filter(msg => 
                msg.content.toLowerCase().includes(options.search.toLowerCase())
            );
        }

        return messages;
    }

    /**
     * Gets current context window for a session
     * @param {string} sessionId - Session identifier
     * @returns {Object} Context window information
     */
    getContextWindow(sessionId) {
        const contextWindow = this.contextWindows.get(sessionId);
        if (!contextWindow) {
            throw new Error(`Context window not found for session: ${sessionId}`);
        }

        return {
            messages: contextWindow.activeMessages,
            tokenCount: contextWindow.tokenCount,
            summary: contextWindow.summary,
            compressionLevel: contextWindow.compressionLevel,
            lastUpdate: contextWindow.lastUpdate
        };
    }

    /**
     * Searches conversation content
     * @param {string} sessionId - Session identifier
     * @param {string} query - Search query
     * @param {Object} options - Search options
     * @returns {Promise<Array>} Search results
     */
    async searchMessages(sessionId, query, options = {}) {
        const conversation = this.conversations.get(sessionId);
        if (!conversation) {
            throw new Error(`Conversation not found for session: ${sessionId}`);
        }

        const searchTerms = query.toLowerCase().split(' ');
        const results = [];

        for (let i = 0; i < conversation.messages.length; i++) {
            const message = conversation.messages[i];
            const content = message.content.toLowerCase();
            
            let score = 0;
            let matches = [];

            for (const term of searchTerms) {
                if (content.includes(term)) {
                    score += 1;
                    matches.push(term);
                    
                    // Bonus for exact phrase matches
                    if (content.includes(query.toLowerCase())) {
                        score += 2;
                    }
                }
            }

            if (score > 0) {
                results.push({
                    message,
                    score,
                    matches,
                    context: this._extractContext(conversation.messages, i, 1)
                });
            }
        }

        // Sort by relevance score
        results.sort((a, b) => b.score - a.score);
        
        if (options.limit) {
            return results.slice(0, options.limit);
        }

        return results;
    }

    /**
     * Summarizes a conversation
     * @param {string} sessionId - Session identifier
     * @param {Object} options - Summarization options
     * @returns {Promise<Object>} Conversation summary
     */
    async summarizeConversation(sessionId, options = {}) {
        const conversation = this.conversations.get(sessionId);
        if (!conversation) {
            throw new Error(`Conversation not found for session: ${sessionId}`);
        }

        const summary = {
            sessionId,
            messageCount: conversation.messageCount,
            participantCount: conversation.participants.size,
            timespan: {
                start: conversation.messages[0]?.timestamp,
                end: conversation.messages[conversation.messages.length - 1]?.timestamp
            },
            topics: await this._extractTopics(conversation.messages),
            keyMoments: await this._identifyKeyMoments(conversation.messages),
            statistics: {
                averageMessageLength: this._calculateAverageLength(conversation.messages),
                longestMessage: this._findLongestMessage(conversation.messages),
                mostActiveParticipant: this._findMostActiveParticipant(conversation.messages)
            }
        };

        if (options.includeContent) {
            summary.contentSummary = await this._generateContentSummary(conversation.messages);
        }

        return summary;
    }

    /**
     * Exports conversation in various formats
     * @param {string} sessionId - Session identifier
     * @param {string} format - Export format (json, markdown, text, html)
     * @param {Object} options - Export options
     * @returns {Promise<string>} Exported conversation
     */
    async exportConversation(sessionId, format = 'json', options = {}) {
        const conversation = this.conversations.get(sessionId);
        if (!conversation) {
            throw new Error(`Conversation not found for session: ${sessionId}`);
        }

        switch (format.toLowerCase()) {
            case 'json':
                return this._exportAsJSON(conversation, options);
            case 'markdown':
                return this._exportAsMarkdown(conversation, options);
            case 'text':
                return this._exportAsText(conversation, options);
            case 'html':
                return this._exportAsHTML(conversation, options);
            default:
                throw new Error(`Unsupported export format: ${format}`);
        }
    }

    /**
     * Gets conversation statistics
     * @param {string} sessionId - Session identifier
     * @returns {Object} Conversation statistics
     */
    getConversationStats(sessionId) {
        const conversation = this.conversations.get(sessionId);
        if (!conversation) {
            throw new Error(`Conversation not found for session: ${sessionId}`);
        }

        return {
            sessionId,
            messageCount: conversation.messageCount,
            totalTokens: conversation.totalTokens,
            participants: Array.from(conversation.participants),
            tags: Array.from(conversation.tags),
            createdAt: conversation.createdAt,
            lastActivity: conversation.lastActivity,
            duration: Date.now() - new Date(conversation.createdAt).getTime(),
            averageMessageLength: this._calculateAverageLength(conversation.messages)
        };
    }

    /**
     * Cleans up resources for a session
     * @param {string} sessionId - Session identifier
     * @returns {Promise<void>}
     */
    async cleanup(sessionId) {
        if (this.conversations.has(sessionId)) {
            this.conversations.delete(sessionId);
            this.contextWindows.delete(sessionId);
            this.messageQueue.delete(sessionId);
            
            this.stats.conversationsActive = this.conversations.size;
            
            this.emit('conversation:cleanup', { sessionId });
        }
    }

    /**
     * Gets global conversation statistics
     * @returns {Object} Global statistics
     */
    getGlobalStats() {
        return {
            ...this.stats,
            conversationsActive: this.conversations.size,
            memoryUsage: this._calculateMemoryUsage()
        };
    }

    // Private methods

    _validateMessage(message) {
        if (!message || typeof message !== 'object') {
            throw new Error('Message must be an object');
        }

        if (!message.role || !['user', 'assistant', 'system'].includes(message.role)) {
            throw new Error('Message must have a valid role (user, assistant, system)');
        }

        if (!message.content || typeof message.content !== 'string') {
            throw new Error('Message must have content string');
        }

        if (message.content.length > this.options.maxMessageSize) {
            throw new Error(`Message exceeds maximum size: ${this.options.maxMessageSize}`);
        }

        return {
            id: message.id || crypto.randomBytes(8).toString('hex'),
            role: message.role,
            content: message.content.trim(),
            timestamp: message.timestamp || new Date().toISOString(),
            metadata: message.metadata || {},
            tokens: this._estimateMessageTokens(message)
        };
    }

    async _processMessage(sessionId, message) {
        // Add to processing queue
        if (!this.messageQueue.has(sessionId)) {
            this.messageQueue.set(sessionId, []);
        }
        this.messageQueue.get(sessionId).push(message);

        // Apply message processing pipeline
        let processedMessage = { ...message };
        
        // Extract entities and mentions
        processedMessage.entities = this._extractEntities(message.content);
        processedMessage.mentions = this._extractMentions(message.content);
        
        // Add semantic embeddings if enabled
        if (this.options.enableSemanticSearch) {
            processedMessage.embeddings = await this._generateEmbeddings(message.content);
        }

        // Process queue
        this.messageQueue.get(sessionId).shift();
        
        return processedMessage;
    }

    _createContextWindow(conversationState) {
        return {
            sessionId: conversationState.sessionId,
            activeMessages: [...conversationState.messages],
            tokenCount: conversationState.totalTokens,
            summary: null,
            compressionLevel: 0,
            lastUpdate: new Date().toISOString()
        };
    }

    _updateContextWindow(sessionId, message) {
        const contextWindow = this.contextWindows.get(sessionId);
        if (!contextWindow) return;

        contextWindow.activeMessages.push(message);
        contextWindow.tokenCount += message.tokens || 0;
        contextWindow.lastUpdate = new Date().toISOString();
    }

    async _manageContextWindow(sessionId) {
        const conversation = this.conversations.get(sessionId);
        const contextWindow = this.contextWindows.get(sessionId);
        
        if (!conversation || !contextWindow) return;

        this.stats.contextWindowHits++;
        
        switch (this.options.retentionPolicy) {
            case 'fifo':
                await this._fifoCompression(sessionId);
                break;
            case 'priority':
                await this._priorityCompression(sessionId);
                break;
            case 'semantic':
                await this._semanticCompression(sessionId);
                break;
        }

        this.emit('context_window:managed', { sessionId, method: this.options.retentionPolicy });
    }

    async _fifoCompression(sessionId) {
        const conversation = this.conversations.get(sessionId);
        const contextWindow = this.contextWindows.get(sessionId);
        
        // Keep latest messages, compress older ones
        const targetSize = Math.floor(this.options.contextWindowSize * 0.7);
        let currentTokens = conversation.totalTokens;
        let messagesToCompress = [];
        
        for (let i = 0; i < conversation.messages.length && currentTokens > targetSize; i++) {
            const message = conversation.messages[i];
            messagesToCompress.push(message);
            currentTokens -= (message.tokens || 0);
        }

        if (messagesToCompress.length > 0) {
            const summary = await this._compressMessages(messagesToCompress);
            conversation.messages = [summary, ...conversation.messages.slice(messagesToCompress.length)];
            contextWindow.activeMessages = [...conversation.messages];
            contextWindow.compressionLevel++;
        }
    }

    async _compressMessages(messages) {
        // Simple compression - create a summary message
        const content = `[Compressed ${messages.length} messages from ${messages[0].timestamp} to ${messages[messages.length-1].timestamp}]\n\nSummary: ${messages.map(m => `${m.role}: ${m.content.slice(0, 100)}...`).join('\n')}`;
        
        return {
            id: `compressed_${crypto.randomBytes(8).toString('hex')}`,
            role: 'system',
            content,
            timestamp: new Date().toISOString(),
            metadata: { 
                type: 'compression',
                originalMessageCount: messages.length,
                compressionRatio: content.length / messages.reduce((sum, m) => sum + m.content.length, 0)
            },
            tokens: this._estimateTokenCount([{ content }])
        };
    }

    _estimateTokenCount(messages) {
        if (!Array.isArray(messages)) return 0;
        
        return messages.reduce((total, message) => {
            if (!message.content) return total;
            // Rough estimation: ~4 characters per token
            return total + Math.ceil(message.content.length / 4);
        }, 0);
    }

    _estimateMessageTokens(message) {
        if (!message.content) return 0;
        return Math.ceil(message.content.length / 4);
    }

    _analyzeConversation(conversationState) {
        for (const message of conversationState.messages) {
            if (message.role) {
                conversationState.participants.add(message.role);
            }
        }
    }

    _extractContext(messages, index, radius) {
        const start = Math.max(0, index - radius);
        const end = Math.min(messages.length, index + radius + 1);
        return messages.slice(start, end);
    }

    _extractEntities(content) {
        // Simple entity extraction - would use NLP library in production
        const entities = [];
        
        // Extract file paths
        const filePaths = content.match(/[\/\w\-_\.]+\.\w+/g) || [];
        entities.push(...filePaths.map(path => ({ type: 'file_path', value: path })));
        
        // Extract URLs
        const urls = content.match(/https?:\/\/[^\s]+/g) || [];
        entities.push(...urls.map(url => ({ type: 'url', value: url })));
        
        return entities;
    }

    _extractMentions(content) {
        // Extract @mentions and #tags
        const mentions = [];
        
        const atMentions = content.match(/@[\w\-_]+/g) || [];
        mentions.push(...atMentions.map(mention => ({ type: 'user', value: mention.slice(1) })));
        
        const hashtags = content.match(/#[\w\-_]+/g) || [];
        mentions.push(...hashtags.map(tag => ({ type: 'tag', value: tag.slice(1) })));
        
        return mentions;
    }

    async _extractTopics(messages) {
        // Simple topic extraction - would use NLP in production
        const wordFreq = {};
        const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should']);
        
        for (const message of messages) {
            const words = message.content.toLowerCase().match(/\w+/g) || [];
            for (const word of words) {
                if (word.length > 3 && !stopWords.has(word)) {
                    wordFreq[word] = (wordFreq[word] || 0) + 1;
                }
            }
        }
        
        return Object.entries(wordFreq)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([word, freq]) => ({ word, frequency: freq }));
    }

    async _identifyKeyMoments(messages) {
        // Identify potentially important moments in conversation
        const keyMoments = [];
        
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            
            // Long messages might be important
            if (message.content.length > 1000) {
                keyMoments.push({
                    type: 'long_message',
                    messageIndex: i,
                    timestamp: message.timestamp,
                    reason: 'Message contains substantial content'
                });
            }
            
            // Messages with code blocks
            if (message.content.includes('```')) {
                keyMoments.push({
                    type: 'code_block',
                    messageIndex: i,
                    timestamp: message.timestamp,
                    reason: 'Message contains code'
                });
            }
            
            // Error mentions
            if (message.content.toLowerCase().includes('error')) {
                keyMoments.push({
                    type: 'error_discussion',
                    messageIndex: i,
                    timestamp: message.timestamp,
                    reason: 'Message discusses errors'
                });
            }
        }
        
        return keyMoments.slice(0, 20); // Limit to top 20 key moments
    }

    _calculateAverageLength(messages) {
        if (messages.length === 0) return 0;
        const totalLength = messages.reduce((sum, msg) => sum + msg.content.length, 0);
        return Math.round(totalLength / messages.length);
    }

    _findLongestMessage(messages) {
        return messages.reduce((longest, current) => 
            current.content.length > longest.content.length ? current : longest,
            messages[0] || { content: '' }
        );
    }

    _findMostActiveParticipant(messages) {
        const counts = {};
        for (const message of messages) {
            counts[message.role] = (counts[message.role] || 0) + 1;
        }
        return Object.entries(counts)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 'unknown';
    }

    async _generateContentSummary(messages) {
        // Generate a brief summary of conversation content
        const recentMessages = messages.slice(-20); // Last 20 messages
        const content = recentMessages.map(m => `${m.role}: ${m.content.slice(0, 200)}`).join('\n');
        
        return {
            messageCount: recentMessages.length,
            summary: `Recent conversation covering ${recentMessages.length} messages`,
            lastActivity: recentMessages[recentMessages.length - 1]?.timestamp
        };
    }

    _exportAsJSON(conversation, options) {
        const data = {
            sessionId: conversation.sessionId,
            exportedAt: new Date().toISOString(),
            messageCount: conversation.messageCount,
            messages: options.includeMetadata ? 
                conversation.messages : 
                conversation.messages.map(({ role, content, timestamp }) => ({ role, content, timestamp }))
        };
        
        return JSON.stringify(data, null, 2);
    }

    _exportAsMarkdown(conversation, options) {
        let markdown = `# Conversation Export\n\n`;
        markdown += `**Session ID:** ${conversation.sessionId}\n`;
        markdown += `**Exported:** ${new Date().toISOString()}\n`;
        markdown += `**Messages:** ${conversation.messageCount}\n\n`;
        
        for (const message of conversation.messages) {
            markdown += `## ${message.role} - ${message.timestamp}\n\n`;
            markdown += `${message.content}\n\n`;
            markdown += `---\n\n`;
        }
        
        return markdown;
    }

    _exportAsText(conversation, options) {
        let text = `Conversation Export\n`;
        text += `Session ID: ${conversation.sessionId}\n`;
        text += `Exported: ${new Date().toISOString()}\n`;
        text += `Messages: ${conversation.messageCount}\n`;
        text += `${'='.repeat(50)}\n\n`;
        
        for (const message of conversation.messages) {
            text += `[${message.timestamp}] ${message.role.toUpperCase()}\n`;
            text += `${message.content}\n\n`;
        }
        
        return text;
    }

    _exportAsHTML(conversation, options) {
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Conversation Export</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .message { margin: 20px 0; padding: 15px; border-radius: 5px; }
                .user { background-color: #e3f2fd; }
                .assistant { background-color: #f3e5f5; }
                .system { background-color: #e8f5e8; }
                .timestamp { font-size: 0.8em; color: #666; }
            </style>
        </head>
        <body>
            <h1>Conversation Export</h1>
            <p><strong>Session ID:</strong> ${conversation.sessionId}</p>
            <p><strong>Exported:</strong> ${new Date().toISOString()}</p>
            <p><strong>Messages:</strong> ${conversation.messageCount}</p>
        `;
        
        for (const message of conversation.messages) {
            html += `
            <div class="message ${message.role}">
                <div class="timestamp">${message.timestamp} - ${message.role.toUpperCase()}</div>
                <div class="content">${this._escapeHtml(message.content)}</div>
            </div>
            `;
        }
        
        html += `</body></html>`;
        return html;
    }

    _escapeHtml(text) {
        const div = { textContent: text };
        return div.innerHTML || text.replace(/[&<>"']/g, (m) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[m]);
    }

    _updateAverageMessageLength(message) {
        const currentAverage = this.stats.averageMessageLength;
        const totalMessages = this.stats.totalMessages;
        
        this.stats.averageMessageLength = 
            (currentAverage * (totalMessages - 1) + message.content.length) / totalMessages;
    }

    _calculateMemoryUsage() {
        let totalSize = 0;
        
        for (const [sessionId, conversation] of this.conversations) {
            totalSize += JSON.stringify(conversation).length;
        }
        
        for (const [sessionId, contextWindow] of this.contextWindows) {
            totalSize += JSON.stringify(contextWindow).length;
        }
        
        return {
            totalBytes: totalSize,
            conversationCount: this.conversations.size,
            averageSizePerConversation: totalSize / Math.max(this.conversations.size, 1)
        };
    }
}

module.exports = ConversationManager;