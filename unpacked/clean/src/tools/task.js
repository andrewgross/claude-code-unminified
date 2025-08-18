/**
 * Task Tool - Sub-agent Delegation
 * 
 * Implementation of the Task tool that allows Claude to delegate tasks to specialized
 * sub-agents with their own context windows and system prompts.
 * 
 * Extracted from:
 * - chunk_0625.js:1-50 (Task tool schema definition: kL8, hn3)
 * - chunk_0625.js:120-200 (Task tool implementation: SI1 object)
 * - chunk_0625.js:200-400 (Task tool call method and execution logic)
 */

import { agentManager } from '../agents/manager.js';
import { agentContextManager } from '../agents/context.js';
import { claudeAPIClient } from '../core/api/client.js';

// Task tool input schema (extracted from kL8 in chunk_0625.js:1-5)
const TASK_INPUT_SCHEMA = {
    type: 'object',
    properties: {
        description: {
            type: 'string',
            description: 'A short (3-5 word) description of the task'
        },
        prompt: {
            type: 'string', 
            description: 'The task for the agent to perform'
        },
        subagent_type: {
            type: 'string',
            description: 'The type of specialized agent to use for this task'
        }
    },
    required: ['description', 'prompt', 'subagent_type']
};

// Task tool result schema (extracted from hn3 in chunk_0625.js:6-25)
const TASK_RESULT_SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    type: { type: 'string', enum: ['text'] },
                    text: { type: 'string' }
                }
            }
        },
        totalToolUseCount: { type: 'number' },
        totalDurationMs: { type: 'number' },
        totalTokens: { type: 'number' },
        usage: {
            type: 'object',
            properties: {
                input_tokens: { type: 'number' },
                output_tokens: { type: 'number' },
                cache_creation_input_tokens: { type: 'number', nullable: true },
                cache_read_input_tokens: { type: 'number', nullable: true }
            }
        }
    }
};

/**
 * Task Tool Implementation
 * Based on SI1 object from chunk_0625.js:120-400
 */
export class TaskTool {
    constructor() {
        this.name = 'Task';
        this.inputSchema = TASK_INPUT_SCHEMA;
        this.resultSchema = TASK_RESULT_SCHEMA;
    }

    /**
     * Get tool description
     * 
     * @returns {Promise<string>} Tool description
     */
    async description() {
        return 'Launch a new task';
    }

    /**
     * Check if tool is enabled
     * 
     * @returns {boolean} Always true
     */
    isEnabled() {
        return true;
    }

    /**
     * Get user-facing name for the tool
     * 
     * @param {Object} input - Tool input parameters
     * @returns {string} Display name
     */
    userFacingName(input) {
        if (input?.subagent_type && input.subagent_type !== 'general-purpose') {
            return input.subagent_type;
        }
        return 'Task';
    }

    /**
     * Get background color for user-facing name
     * 
     * @param {Object} input - Tool input parameters
     * @returns {string|undefined} Color name or undefined
     */
    userFacingNameBackgroundColor(input) {
        if (!input?.subagent_type) return;
        
        // Map agent types to colors (based on agent color property)
        const agent = agentManager.findAgent(input.subagent_type);
        return agent?.color;
    }

    /**
     * Check tool permissions
     * 
     * @param {Object} input - Tool input parameters
     * @returns {Promise<Object>} Permission result
     */
    async checkPermissions(input) {
        return {
            behavior: 'allow',
            updatedInput: input
        };
    }

    /**
     * Render tool use message for UI
     * 
     * @param {Object} input - Tool input parameters
     * @param {Object} options - Rendering options
     * @returns {string|null} Rendered message
     */
    renderToolUseMessage(input, options) {
        const { description, prompt, subagent_type } = input;
        const { verbose } = options;

        if (!description || !prompt) return null;

        if (verbose) {
            return `Task: ${description}${subagent_type ? ` (using ${subagent_type} agent)` : ''}\n\nPrompt: ${prompt}`;
        }
        
        return description;
    }

    /**
     * Execute the Task tool - delegate to sub-agent
     * 
     * Extracted from chunk_0625.js:200-400 (SI1.call method):
     * - Validates subagent_type and looks up agent definition
     * - Creates dedicated agent context for isolated execution
     * - Constructs messages array with user prompt
     * - Handles both streaming and non-streaming execution modes
     * - Yields progress updates throughout execution
     * - Manages tool use counting and token tracking
     * - Returns final result with execution metrics
     * 
     * @param {Object} input - Tool input parameters
     * @param {Object} context - Execution context
     * @param {Object} toolId - Tool execution ID
     * @param {Object} streamHandler - Stream handler for progress updates
     * @returns {AsyncGenerator} Tool execution results
     */
    async *call(input, context, toolId, streamHandler) {
        const { prompt, subagent_type, description } = input;
        const startTime = Date.now();

        try {
            // Find the specified agent
            const agent = await agentManager.findAgent(subagent_type);
            if (!agent) {
                throw new Error(`Agent type '${subagent_type}' not found`);
            }

            // Create agent context
            const agentContext = agentContextManager.createContext(agent);
            agentContextManager.activateContext(agentContext.id);
            agentContext.start();

            // Yield initial progress
            yield {
                type: 'progress',
                content: `Starting ${subagent_type} agent...`
            };

            // Prepare system prompt and messages
            const systemPrompt = agent.systemPrompt;
            const messages = [{
                role: 'user',
                content: prompt
            }];

            // Add to agent context
            agentContext.addMessage(messages[0]);

            // Execute with Claude API
            const requestOptions = {
                messages,
                systemPrompt,
                model: agent.model || context.options.mainLoopModel || 'claude-3-5-sonnet-20241022',
                maxTokens: 4096,
                temperature: 0.7,
                tools: this.getAgentTools(agent, context)
            };

            // Handle streaming response
            if (context.options.stream !== false) {
                yield* this.handleStreamingExecution(requestOptions, agentContext, context, streamHandler);
            } else {
                yield* this.handleNonStreamingExecution(requestOptions, agentContext, context);
            }

        } catch (error) {
            const endTime = Date.now();
            
            yield {
                type: 'error',
                content: `Task execution failed: ${error.message}`,
                totalDurationMs: endTime - startTime,
                totalToolUseCount: 0,
                totalTokens: 0
            };
        }
    }

    /**
     * Handle streaming execution of sub-agent
     * 
     * @param {Object} requestOptions - API request options
     * @param {Object} agentContext - Agent context
     * @param {Object} context - Main execution context
     * @param {Object} streamHandler - Stream handler
     */
    async *handleStreamingExecution(requestOptions, agentContext, context, streamHandler) {
        const startTime = Date.now();
        let totalTokens = 0;
        let toolUseCount = 0;

        try {
            const stream = await claudeAPIClient.sendMessage({
                ...requestOptions,
                stream: true
            });

            let responseText = '';
            let currentUsage = null;

            for await (const chunk of stream) {
                if (chunk.type === 'content_block_delta') {
                    if (chunk.delta?.text) {
                        responseText += chunk.delta.text;
                        yield {
                            type: 'content',
                            content: chunk.delta.text
                        };
                    }
                } else if (chunk.type === 'message_delta') {
                    if (chunk.usage) {
                        currentUsage = chunk.usage;
                        totalTokens = currentUsage.input_tokens + currentUsage.output_tokens;
                    }
                } else if (chunk.type === 'tool_use') {
                    toolUseCount++;
                    yield {
                        type: 'tool_use',
                        content: `Using tool: ${chunk.name}`
                    };
                }
            }

            // Add response to agent context
            agentContext.addMessage({
                role: 'assistant',
                content: responseText,
                usage: currentUsage
            });

            // Update agent context metadata
            agentContext.updateMetadata({
                tokensUsed: totalTokens,
                toolCalls: toolUseCount
            });

            // Complete agent execution
            const result = {
                content: responseText,
                usage: currentUsage
            };
            agentContext.complete(result);

            // Yield final result
            const endTime = Date.now();
            yield {
                type: 'result',
                content: [{
                    type: 'text',
                    text: responseText
                }],
                totalToolUseCount: toolUseCount,
                totalDurationMs: endTime - startTime,
                totalTokens,
                usage: currentUsage || {
                    input_tokens: 0,
                    output_tokens: 0,
                    cache_creation_input_tokens: null,
                    cache_read_input_tokens: null
                }
            };

        } catch (error) {
            agentContext.fail(error);
            throw error;
        } finally {
            agentContextManager.deactivateContext(agentContext.id);
        }
    }

    /**
     * Handle non-streaming execution of sub-agent
     * 
     * @param {Object} requestOptions - API request options
     * @param {Object} agentContext - Agent context
     * @param {Object} context - Main execution context
     */
    async *handleNonStreamingExecution(requestOptions, agentContext, context) {
        const startTime = Date.now();

        try {
            const response = await claudeAPIClient.sendMessage(requestOptions);
            
            const responseText = response.content?.[0]?.text || '';
            const usage = response.usage || {};
            const totalTokens = usage.input_tokens + usage.output_tokens;

            // Add response to agent context
            agentContext.addMessage({
                role: 'assistant', 
                content: responseText,
                usage
            });

            // Update agent context metadata
            agentContext.updateMetadata({
                tokensUsed: totalTokens,
                toolCalls: response.tool_calls?.length || 0
            });

            // Complete agent execution
            agentContext.complete({ content: responseText, usage });

            // Yield complete result
            const endTime = Date.now();
            yield {
                type: 'result',
                content: [{
                    type: 'text',
                    text: responseText
                }],
                totalToolUseCount: response.tool_calls?.length || 0,
                totalDurationMs: endTime - startTime,
                totalTokens,
                usage: {
                    input_tokens: usage.input_tokens || 0,
                    output_tokens: usage.output_tokens || 0,
                    cache_creation_input_tokens: usage.cache_creation_input_tokens || null,
                    cache_read_input_tokens: usage.cache_read_input_tokens || null
                }
            };

        } catch (error) {
            agentContext.fail(error);
            throw error;
        } finally {
            agentContextManager.deactivateContext(agentContext.id);
        }
    }

    /**
     * Get tools available to the agent
     * 
     * @param {Object} agent - Agent definition
     * @param {Object} context - Execution context
     * @returns {Array} Array of tool definitions
     */
    getAgentTools(agent, context) {
        // If agent has wildcard tools, return all available tools
        if (agent.tools.includes('*')) {
            return context.options.tools || [];
        }

        // Filter tools based on agent's allowed tools
        const availableTools = context.options.tools || [];
        return availableTools.filter(tool => 
            agent.tools.includes(tool.name) || 
            agent.tools.some(pattern => 
                pattern.includes('*') && tool.name.match(this.patternToRegex(pattern))
            )
        );
    }

    /**
     * Convert tool pattern to regex
     * 
     * @param {string} pattern - Tool pattern (may include wildcards)
     * @returns {RegExp} Regular expression
     */
    patternToRegex(pattern) {
        const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regexPattern = escaped.replace(/\\\*/g, '.*');
        return new RegExp(`^${regexPattern}$`);
    }
}

// Export singleton instance
export const taskTool = new TaskTool();