/**
 * Agent Context Management
 * 
 * Manages execution contexts for sub-agents including separate message histories,
 * state isolation, and context switching.
 * 
 * Extracted from: 
 * - chunk_0633.js:1-100 (agent context state management)
 * - chunk_0632.js:200-300 (agent execution lifecycle)
 * - chunk_0629.js:150-250 (context switching and isolation)
 * 
 * Note: This is a clean implementation based on the architectural patterns
 * observed in the original chunks, as the original context management was
 * deeply integrated with the CLI execution flow.
 */

import { randomUUID } from 'crypto';

/**
 * Agent execution context
 */
export class AgentContext {
    constructor(agent, parentContext = null) {
        this.id = randomUUID();
        this.agent = agent;
        this.parentContext = parentContext;
        this.messages = [];
        this.state = {};
        this.startTime = Date.now();
        this.endTime = null;
        this.status = 'created'; // created, running, completed, error
        this.result = null;
        this.error = null;
        
        // Context metadata
        this.metadata = {
            toolCalls: 0,
            tokensUsed: 0,
            duration: 0,
            maxMemory: 0
        };
    }

    /**
     * Add a message to the context
     * 
     * @param {Object} message - Message to add
     */
    addMessage(message) {
        const contextMessage = {
            id: randomUUID(),
            timestamp: Date.now(),
            contextId: this.id,
            ...message
        };
        
        this.messages.push(contextMessage);
        return contextMessage;
    }

    /**
     * Get all messages in the context
     * 
     * @returns {Array} Array of messages
     */
    getMessages() {
        return [...this.messages];
    }

    /**
     * Clear all messages in the context
     */
    clearMessages() {
        this.messages = [];
    }

    /**
     * Set context state
     * 
     * @param {string} key - State key
     * @param {*} value - State value
     */
    setState(key, value) {
        this.state[key] = value;
    }

    /**
     * Get context state
     * 
     * @param {string} key - State key
     * @returns {*} State value
     */
    getState(key) {
        return this.state[key];
    }

    /**
     * Update context metadata
     * 
     * @param {Object} updates - Metadata updates
     */
    updateMetadata(updates) {
        this.metadata = { ...this.metadata, ...updates };
    }

    /**
     * Start agent execution
     */
    start() {
        this.status = 'running';
        this.startTime = Date.now();
    }

    /**
     * Complete agent execution
     * 
     * @param {*} result - Execution result
     */
    complete(result) {
        this.status = 'completed';
        this.endTime = Date.now();
        this.result = result;
        this.metadata.duration = this.endTime - this.startTime;
    }

    /**
     * Mark agent execution as failed
     * 
     * @param {Error} error - Execution error
     */
    fail(error) {
        this.status = 'error';
        this.endTime = Date.now();
        this.error = error;
        this.metadata.duration = this.endTime - this.startTime;
    }

    /**
     * Get execution summary
     * 
     * @returns {Object} Execution summary
     */
    getSummary() {
        return {
            id: this.id,
            agentType: this.agent.agentType,
            status: this.status,
            messageCount: this.messages.length,
            duration: this.metadata.duration || (Date.now() - this.startTime),
            tokensUsed: this.metadata.tokensUsed,
            toolCalls: this.metadata.toolCalls,
            hasResult: this.result !== null,
            hasError: this.error !== null,
            startTime: this.startTime,
            endTime: this.endTime
        };
    }

    /**
     * Export context data for persistence
     * 
     * @returns {Object} Serializable context data
     */
    export() {
        return {
            id: this.id,
            agent: this.agent,
            messages: this.messages,
            state: this.state,
            startTime: this.startTime,
            endTime: this.endTime,
            status: this.status,
            result: this.result,
            error: this.error ? {
                message: this.error.message,
                stack: this.error.stack,
                name: this.error.name
            } : null,
            metadata: this.metadata
        };
    }

    /**
     * Import context data from persistence
     * 
     * @param {Object} data - Context data to import
     * @returns {AgentContext} Restored context
     */
    static import(data) {
        const context = new AgentContext(data.agent);
        
        context.id = data.id;
        context.messages = data.messages || [];
        context.state = data.state || {};
        context.startTime = data.startTime;
        context.endTime = data.endTime;
        context.status = data.status;
        context.result = data.result;
        context.metadata = data.metadata || {};
        
        if (data.error) {
            const error = new Error(data.error.message);
            error.stack = data.error.stack;
            error.name = data.error.name;
            context.error = error;
        }
        
        return context;
    }
}

/**
 * Agent context manager
 */
export class AgentContextManager {
    constructor() {
        this.contexts = new Map();
        this.activeContexts = new Set();
        this.maxContexts = 50; // Maximum number of contexts to keep in memory
    }

    /**
     * Create a new agent context
     * 
     * @param {Object} agent - Agent definition
     * @param {AgentContext} parentContext - Parent context (optional)
     * @returns {AgentContext} New agent context
     */
    createContext(agent, parentContext = null) {
        const context = new AgentContext(agent, parentContext);
        
        // Clean up old contexts if we're at the limit
        if (this.contexts.size >= this.maxContexts) {
            this.cleanup();
        }
        
        this.contexts.set(context.id, context);
        
        return context;
    }

    /**
     * Get a context by ID
     * 
     * @param {string} contextId - Context ID
     * @returns {AgentContext|null} Context or null if not found
     */
    getContext(contextId) {
        return this.contexts.get(contextId) || null;
    }

    /**
     * Get all contexts
     * 
     * @returns {Array} Array of all contexts
     */
    getAllContexts() {
        return Array.from(this.contexts.values());
    }

    /**
     * Get active contexts
     * 
     * @returns {Array} Array of active contexts
     */
    getActiveContexts() {
        return Array.from(this.activeContexts).map(id => this.contexts.get(id)).filter(Boolean);
    }

    /**
     * Mark a context as active
     * 
     * @param {string} contextId - Context ID
     */
    activateContext(contextId) {
        if (this.contexts.has(contextId)) {
            this.activeContexts.add(contextId);
        }
    }

    /**
     * Mark a context as inactive
     * 
     * @param {string} contextId - Context ID
     */
    deactivateContext(contextId) {
        this.activeContexts.delete(contextId);
    }

    /**
     * Remove a context
     * 
     * @param {string} contextId - Context ID
     * @returns {boolean} True if context was removed
     */
    removeContext(contextId) {
        this.deactivateContext(contextId);
        return this.contexts.delete(contextId);
    }

    /**
     * Get contexts by agent type
     * 
     * @param {string} agentType - Agent type
     * @returns {Array} Array of contexts for the agent type
     */
    getContextsByAgent(agentType) {
        return Array.from(this.contexts.values())
            .filter(context => context.agent.agentType === agentType);
    }

    /**
     * Get contexts by status
     * 
     * @param {string} status - Context status
     * @returns {Array} Array of contexts with the status
     */
    getContextsByStatus(status) {
        return Array.from(this.contexts.values())
            .filter(context => context.status === status);
    }

    /**
     * Clean up old inactive contexts
     */
    cleanup() {
        const contexts = Array.from(this.contexts.values());
        
        // Sort by last activity (endTime or startTime)
        contexts.sort((a, b) => {
            const aTime = a.endTime || a.startTime;
            const bTime = b.endTime || b.startTime;
            return aTime - bTime;
        });

        // Keep only active contexts and recent inactive ones
        const contextsToKeep = Math.floor(this.maxContexts * 0.8);
        const contextsToRemove = contexts.slice(0, contexts.length - contextsToKeep);

        for (const context of contextsToRemove) {
            // Don't remove active contexts
            if (!this.activeContexts.has(context.id)) {
                this.contexts.delete(context.id);
            }
        }

        console.log(`Cleaned up ${contextsToRemove.length} agent contexts`);
    }

    /**
     * Get memory usage statistics
     * 
     * @returns {Object} Memory statistics
     */
    getMemoryStats() {
        const contexts = Array.from(this.contexts.values());
        const totalMessages = contexts.reduce((sum, ctx) => sum + ctx.messages.length, 0);
        const activeCount = this.activeContexts.size;
        
        return {
            totalContexts: contexts.length,
            activeContexts: activeCount,
            inactiveContexts: contexts.length - activeCount,
            totalMessages,
            averageMessagesPerContext: totalMessages / (contexts.length || 1),
            memoryUsage: {
                contexts: contexts.length,
                maxContexts: this.maxContexts,
                utilizationPercent: (contexts.length / this.maxContexts) * 100
            }
        };
    }

    /**
     * Export all contexts for persistence
     * 
     * @returns {Array} Array of serializable context data
     */
    exportContexts() {
        return Array.from(this.contexts.values()).map(context => context.export());
    }

    /**
     * Import contexts from persistence
     * 
     * @param {Array} contextsData - Array of context data to import
     */
    importContexts(contextsData) {
        for (const contextData of contextsData) {
            try {
                const context = AgentContext.import(contextData);
                this.contexts.set(context.id, context);
                
                if (context.status === 'running') {
                    this.activeContexts.add(context.id);
                }
            } catch (error) {
                console.warn(`Failed to import agent context ${contextData.id}: ${error.message}`);
            }
        }
    }

    /**
     * Clear all contexts
     */
    clearAll() {
        this.contexts.clear();
        this.activeContexts.clear();
    }

    /**
     * Get execution statistics
     * 
     * @returns {Object} Execution statistics
     */
    getExecutionStats() {
        const contexts = Array.from(this.contexts.values());
        const completed = contexts.filter(ctx => ctx.status === 'completed');
        const failed = contexts.filter(ctx => ctx.status === 'error');
        const running = contexts.filter(ctx => ctx.status === 'running');

        const totalDuration = completed.reduce((sum, ctx) => sum + (ctx.metadata.duration || 0), 0);
        const totalTokens = contexts.reduce((sum, ctx) => sum + (ctx.metadata.tokensUsed || 0), 0);
        const totalToolCalls = contexts.reduce((sum, ctx) => sum + (ctx.metadata.toolCalls || 0), 0);

        return {
            total: contexts.length,
            completed: completed.length,
            failed: failed.length,
            running: running.length,
            successRate: contexts.length > 0 ? (completed.length / contexts.length) * 100 : 0,
            averageDuration: completed.length > 0 ? totalDuration / completed.length : 0,
            totalTokens,
            totalToolCalls,
            averageTokensPerContext: contexts.length > 0 ? totalTokens / contexts.length : 0,
            averageToolCallsPerContext: contexts.length > 0 ? totalToolCalls / contexts.length : 0
        };
    }
}

// Export singleton instance
export const agentContextManager = new AgentContextManager();