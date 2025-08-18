/**
 * Agent Task Delegation System
 * 
 * Handles delegation of tasks to sub-agents, including task routing,
 * execution coordination, and result aggregation.
 * 
 * Extracted from:
 * - chunk_0632.js:1-100 (task delegation and agent selection logic)
 * - chunk_0633.js:150-250 (sub-agent execution and coordination) 
 * - chunk_0625.js:300-400 (task routing and agent matching)
 * - chunk_0627.js:50-150 (agent invocation patterns from UI components)
 */

import { agentManager } from './manager.js';
import { agentContextManager } from './context.js';
import { claudeAPIClient } from '../core/api/client.js';

/**
 * Task delegation manager
 */
export class TaskDelegationManager {
    constructor() {
        this.activeDelegations = new Map();
        this.delegationHistory = [];
        this.maxConcurrentDelegations = 5;
    }

    /**
     * Delegate a task to the most appropriate sub-agent
     * 
     * @param {string} taskDescription - Description of the task to delegate
     * @param {Object} options - Delegation options
     * @returns {Promise<Object>} Delegation result
     */
    async delegateTask(taskDescription, options = {}) {
        const {
            preferredAgent = null,
            parentContext = null,
            tools = [],
            model = null,
            debug = false,
            timeout = 300000 // 5 minutes default
        } = options;

        try {
            // Find the best agent for this task
            const selectedAgent = await this.selectAgent(taskDescription, preferredAgent);
            if (!selectedAgent) {
                throw new Error('No suitable agent found for this task');
            }

            // Create execution context
            const context = agentContextManager.createContext(selectedAgent, parentContext);
            agentContextManager.activateContext(context.id);

            // Create delegation record
            const delegation = {
                id: context.id,
                taskDescription,
                agent: selectedAgent,
                context,
                status: 'starting',
                startTime: Date.now(),
                endTime: null,
                result: null,
                error: null,
                options
            };

            this.activeDelegations.set(delegation.id, delegation);

            // Execute the task
            try {
                delegation.status = 'executing';
                context.start();

                const result = await this.executeTaskWithAgent(
                    selectedAgent, 
                    taskDescription, 
                    context, 
                    { ...options, timeout }
                );

                // Complete delegation
                delegation.status = 'completed';
                delegation.endTime = Date.now();
                delegation.result = result;
                context.complete(result);

                // Move to history
                this.delegationHistory.push(delegation);
                this.activeDelegations.delete(delegation.id);
                agentContextManager.deactivateContext(context.id);

                if (debug) {
                    console.log(`Task delegation completed: ${selectedAgent.agentType} - ${delegation.endTime - delegation.startTime}ms`);
                }

                return {
                    success: true,
                    agent: selectedAgent,
                    result,
                    context: context.getSummary(),
                    delegationId: delegation.id
                };

            } catch (error) {
                // Handle execution error
                delegation.status = 'error';
                delegation.endTime = Date.now();
                delegation.error = error;
                context.fail(error);

                this.delegationHistory.push(delegation);
                this.activeDelegations.delete(delegation.id);
                agentContextManager.deactivateContext(context.id);

                if (debug) {
                    console.error(`Task delegation failed: ${selectedAgent.agentType} - ${error.message}`);
                }

                return {
                    success: false,
                    agent: selectedAgent,
                    error: error.message,
                    context: context.getSummary(),
                    delegationId: delegation.id
                };
            }

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Select the most appropriate agent for a task
     * 
     * @param {string} taskDescription - Task description
     * @param {string} preferredAgent - Preferred agent type (optional)
     * @returns {Promise<Object|null>} Selected agent or null
     */
    async selectAgent(taskDescription, preferredAgent = null) {
        const activeAgents = await agentManager.getActiveAgents();

        // If preferred agent is specified, try to find it
        if (preferredAgent) {
            const agent = activeAgents.find(a => a.agentType === preferredAgent);
            if (agent) {
                return agent;
            }
        }

        // Score agents based on task description match
        const scoredAgents = activeAgents.map(agent => ({
            agent,
            score: this.scoreAgentForTask(agent, taskDescription)
        }));

        // Sort by score (descending)
        scoredAgents.sort((a, b) => b.score - a.score);

        // Return the highest scoring agent
        return scoredAgents.length > 0 ? scoredAgents[0].agent : null;
    }

    /**
     * Score an agent's suitability for a task
     * 
     * @param {Object} agent - Agent definition
     * @param {string} taskDescription - Task description
     * @returns {number} Score (higher = better match)
     */
    scoreAgentForTask(agent, taskDescription) {
        let score = 0;
        const taskLower = taskDescription.toLowerCase();
        const whenToUseLower = agent.whenToUse.toLowerCase();

        // Keyword matching in whenToUse description
        const taskWords = taskLower.split(/\s+/);
        const whenToUseWords = whenToUseLower.split(/\s+/);

        for (const taskWord of taskWords) {
            if (taskWord.length > 3 && whenToUseWords.includes(taskWord)) {
                score += 10;
            }
        }

        // Specific patterns that indicate agent suitability
        const patterns = [
            { pattern: /(search|find|look|grep)/i, agents: ['general-purpose'], weight: 15 },
            { pattern: /(status.*line|statusline)/i, agents: ['statusline-setup'], weight: 20 },
            { pattern: /(output.*style|style.*output)/i, agents: ['output-style-setup'], weight: 20 },
            { pattern: /(code|file|analyze|investigate)/i, agents: ['general-purpose'], weight: 5 },
            { pattern: /(research|explore|understand)/i, agents: ['general-purpose'], weight: 8 }
        ];

        for (const { pattern, agents, weight } of patterns) {
            if (pattern.test(taskDescription) && agents.includes(agent.agentType)) {
                score += weight;
            }
        }

        // Tool availability bonus
        if (agent.tools.includes('*')) {
            score += 5; // General purpose agents get a small bonus
        }

        // Built-in agents get slight preference (more tested/reliable)
        if (agent.source === 'built-in') {
            score += 2;
        }

        return score;
    }

    /**
     * Execute a task using a specific agent
     * 
     * @param {Object} agent - Agent to execute the task
     * @param {string} taskDescription - Task description
     * @param {Object} context - Execution context
     * @param {Object} options - Execution options
     * @returns {Promise<Object>} Execution result
     */
    async executeTaskWithAgent(agent, taskDescription, context, options = {}) {
        const { timeout = 300000, tools = [], debug = false } = options;

        // Prepare the message for the agent
        const systemPrompt = agent.systemPrompt;
        const userMessage = {
            role: 'user',
            content: taskDescription
        };

        // Add to context
        context.addMessage(userMessage);

        // Create API request
        const requestOptions = {
            messages: [userMessage],
            systemPrompt,
            model: agent.model || 'claude-3-5-sonnet-20241022',
            maxTokens: 4096,
            temperature: 0.7,
            tools: this.getToolsForAgent(agent, tools)
        };

        // Execute with timeout
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Agent execution timeout')), timeout)
        );

        const executionPromise = claudeAPIClient.sendMessage(requestOptions);

        try {
            const response = await Promise.race([executionPromise, timeoutPromise]);

            // Add response to context
            const assistantMessage = {
                role: 'assistant',
                content: response.content?.[0]?.text || 'No response content',
                usage: response.usage
            };
            context.addMessage(assistantMessage);

            // Update context metadata
            context.updateMetadata({
                tokensUsed: (context.metadata.tokensUsed || 0) + (response.usage?.total_tokens || 0),
                toolCalls: (context.metadata.toolCalls || 0) + (response.tool_calls?.length || 0)
            });

            return {
                content: assistantMessage.content,
                usage: response.usage,
                toolCalls: response.tool_calls || [],
                model: response.model
            };

        } catch (error) {
            // Add error to context
            context.addMessage({
                role: 'error',
                content: error.message
            });

            throw error;
        }
    }

    /**
     * Get available tools for an agent
     * 
     * @param {Object} agent - Agent definition
     * @param {Array} additionalTools - Additional tools to include
     * @returns {Array} Array of tool definitions
     */
    getToolsForAgent(agent, additionalTools = []) {
        // TODO: Implement actual tool definitions lookup
        // This would map agent.tools array to actual tool schemas
        // For now, return empty array (agent can use text responses only)
        return [];
    }

    /**
     * Get active delegations
     * 
     * @returns {Array} Array of active delegations
     */
    getActiveDelegations() {
        return Array.from(this.activeDelegations.values());
    }

    /**
     * Get delegation history
     * 
     * @param {number} limit - Maximum number of records to return
     * @returns {Array} Array of historical delegations
     */
    getDelegationHistory(limit = 50) {
        return this.delegationHistory.slice(-limit);
    }

    /**
     * Cancel an active delegation
     * 
     * @param {string} delegationId - Delegation ID to cancel
     * @returns {boolean} True if delegation was cancelled
     */
    cancelDelegation(delegationId) {
        const delegation = this.activeDelegations.get(delegationId);
        if (!delegation) {
            return false;
        }

        delegation.status = 'cancelled';
        delegation.endTime = Date.now();
        delegation.error = new Error('Delegation cancelled by user');

        delegation.context.fail(delegation.error);
        agentContextManager.deactivateContext(delegation.context.id);

        this.delegationHistory.push(delegation);
        this.activeDelegations.delete(delegationId);

        return true;
    }

    /**
     * Get delegation statistics
     * 
     * @returns {Object} Delegation statistics
     */
    getDelegationStats() {
        const history = this.delegationHistory;
        const active = this.activeDelegations.size;
        const completed = history.filter(d => d.status === 'completed').length;
        const failed = history.filter(d => d.status === 'error').length;
        const cancelled = history.filter(d => d.status === 'cancelled').length;

        const totalDuration = history
            .filter(d => d.endTime)
            .reduce((sum, d) => sum + (d.endTime - d.startTime), 0);

        const averageDuration = (completed + failed) > 0 ? 
            totalDuration / (completed + failed) : 0;

        // Agent usage statistics
        const agentUsage = {};
        history.forEach(d => {
            const agentType = d.agent.agentType;
            if (!agentUsage[agentType]) {
                agentUsage[agentType] = { total: 0, completed: 0, failed: 0 };
            }
            agentUsage[agentType].total++;
            if (d.status === 'completed') agentUsage[agentType].completed++;
            if (d.status === 'error') agentUsage[agentType].failed++;
        });

        return {
            total: history.length,
            active,
            completed,
            failed,
            cancelled,
            successRate: history.length > 0 ? (completed / history.length) * 100 : 0,
            averageDuration,
            agentUsage
        };
    }

    /**
     * Clear delegation history
     */
    clearHistory() {
        this.delegationHistory = [];
    }
}

// Export singleton instance
export const taskDelegationManager = new TaskDelegationManager();