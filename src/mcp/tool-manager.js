/**
 * Tool Manager - MCP Tool Execution and Registry
 * 
 * This module manages the registry and execution of MCP tools. It handles
 * tool discovery from servers, maintains a centralized tool registry,
 * validates tool calls, executes tools through their respective servers,
 * and manages tool permissions and access control.
 * 
 * @module ToolManager
 */

import { EventEmitter } from 'events';

/**
 * Tool execution states
 */
export const ToolState = {
    PENDING: 'pending',
    EXECUTING: 'executing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
};

/**
 * Tool Manager class - handles MCP tool registry and execution
 */
export class ToolManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            logger: console,
            timeout: 30000,
            maxConcurrentExecutions: 10,
            retryAttempts: 2,
            retryDelay: 1000,
            ...options
        };
        
        // Tool registry: Map<toolName, toolDefinition>
        this.toolRegistry = new Map();
        
        // Server-to-tools mapping: Map<serverName, Set<toolName>>
        this.serverTools = new Map();
        
        // Active executions: Map<executionId, executionContext>
        this.activeExecutions = new Map();
        
        // Execution counter for unique IDs
        this.executionCounter = 0;
        
        // Tool permissions and access control
        this.toolPermissions = new Map();
        
        // Tool usage statistics
        this.usageStats = new Map();
    }
    
    /**
     * Initializes the tool manager
     * @returns {Promise<void>}
     */
    async initialize() {
        try {
            this.options.logger.log('Initializing Tool Manager...');
            
            // Load any persisted tool permissions
            await this.loadToolPermissions();
            
            this.options.logger.log('Tool Manager initialized successfully');
            this.emit('initialized');
            
        } catch (error) {
            this.options.logger.error('Failed to initialize Tool Manager:', error);
            throw error;
        }
    }
    
    /**
     * Registers a tool from a server
     * @param {string} toolName - Tool name
     * @param {Object} toolDefinition - Tool definition
     * @returns {void}
     */
    registerTool(toolName, toolDefinition) {
        const normalizedToolDef = this.normalizeToolDefinition(toolDefinition);
        
        // Check for name conflicts
        if (this.toolRegistry.has(toolName)) {
            const existing = this.toolRegistry.get(toolName);
            
            if (existing.serverName !== normalizedToolDef.serverName) {
                this.options.logger.warn(
                    `Tool name conflict: '${toolName}' exists in both ` +
                    `'${existing.serverName}' and '${normalizedToolDef.serverName}' servers`
                );
                
                // Create namespaced version
                const namespacedName = `${normalizedToolDef.serverName}.${toolName}`;
                normalizedToolDef.namespacedName = namespacedName;
                this.toolRegistry.set(namespacedName, normalizedToolDef);
                
                // Update server tools mapping
                if (!this.serverTools.has(normalizedToolDef.serverName)) {
                    this.serverTools.set(normalizedToolDef.serverName, new Set());
                }
                this.serverTools.get(normalizedToolDef.serverName).add(namespacedName);
                
                this.options.logger.log(
                    `Registered namespaced tool: '${namespacedName}'`
                );
                
                this.emit('toolRegistered', {
                    name: namespacedName,
                    originalName: toolName,
                    serverName: normalizedToolDef.serverName,
                    definition: normalizedToolDef
                });
                
                return;
            }
        }
        
        // Register the tool
        this.toolRegistry.set(toolName, normalizedToolDef);
        
        // Update server tools mapping
        if (!this.serverTools.has(normalizedToolDef.serverName)) {
            this.serverTools.set(normalizedToolDef.serverName, new Set());
        }
        this.serverTools.get(normalizedToolDef.serverName).add(toolName);
        
        // Initialize usage stats
        if (!this.usageStats.has(toolName)) {
            this.usageStats.set(toolName, {
                callCount: 0,
                successCount: 0,
                errorCount: 0,
                totalExecutionTime: 0,
                averageExecutionTime: 0,
                lastUsed: null
            });
        }
        
        this.options.logger.log(
            `Registered tool: '${toolName}' from server '${normalizedToolDef.serverName}'`
        );
        
        this.emit('toolRegistered', {
            name: toolName,
            serverName: normalizedToolDef.serverName,
            definition: normalizedToolDef
        });
    }
    
    /**
     * Unregisters a tool
     * @param {string} toolName - Tool name
     * @returns {void}
     */
    unregisterTool(toolName) {
        const toolDefinition = this.toolRegistry.get(toolName);
        
        if (!toolDefinition) {
            return;
        }
        
        // Remove from registry
        this.toolRegistry.delete(toolName);
        
        // Update server tools mapping
        const serverTools = this.serverTools.get(toolDefinition.serverName);
        if (serverTools) {
            serverTools.delete(toolName);
            if (serverTools.size === 0) {
                this.serverTools.delete(toolDefinition.serverName);
            }
        }
        
        this.options.logger.log(`Unregistered tool: '${toolName}'`);
        
        this.emit('toolUnregistered', {
            name: toolName,
            serverName: toolDefinition.serverName
        });
    }
    
    /**
     * Removes all tools associated with a server
     * @param {string} serverName - Server name
     * @returns {void}
     */
    removeToolsByServer(serverName) {
        const serverTools = this.serverTools.get(serverName);
        
        if (!serverTools) {
            return;
        }
        
        const toolsToRemove = Array.from(serverTools);
        
        for (const toolName of toolsToRemove) {
            this.unregisterTool(toolName);
        }
        
        this.options.logger.log(
            `Removed ${toolsToRemove.length} tools from server '${serverName}'`
        );
        
        this.emit('serverToolsRemoved', {
            serverName,
            toolNames: toolsToRemove
        });
    }
    
    /**
     * Executes a tool
     * @param {string} toolName - Tool name
     * @param {Object} parameters - Tool parameters
     * @param {Object} options - Execution options
     * @returns {Promise<Object>} Tool execution result
     */
    async executeTool(toolName, parameters = {}, options = {}) {
        // Check if we're at the concurrent execution limit
        if (this.activeExecutions.size >= this.options.maxConcurrentExecutions) {
            throw new Error('Maximum concurrent tool executions reached');
        }
        
        // Get tool definition
        const toolDefinition = this.toolRegistry.get(toolName);
        
        if (!toolDefinition) {
            throw new Error(`Tool '${toolName}' not found in registry`);
        }
        
        // Check tool permissions
        await this.checkToolPermissions(toolName, options);
        
        // Validate parameters
        this.validateToolParameters(toolDefinition, parameters);
        
        // Create execution context
        const executionId = ++this.executionCounter;
        const executionContext = {
            id: executionId,
            toolName,
            parameters,
            serverName: toolDefinition.serverName,
            state: ToolState.PENDING,
            startTime: new Date(),
            endTime: null,
            result: null,
            error: null,
            retryCount: 0,
            sessionId: options.sessionId,
            context: options.context || new Map()
        };
        
        this.activeExecutions.set(executionId, executionContext);
        
        try {
            this.options.logger.log(
                `Executing tool '${toolName}' (execution ${executionId})`
            );
            
            const result = await this.performToolExecution(executionContext, options);
            
            // Update execution context
            executionContext.state = ToolState.COMPLETED;
            executionContext.endTime = new Date();
            executionContext.result = result;
            
            // Update usage statistics
            this.updateUsageStats(toolName, executionContext, true);
            
            this.options.logger.log(
                `Tool '${toolName}' execution ${executionId} completed successfully`
            );
            
            this.emit('toolExecuted', {
                executionId,
                toolName,
                parameters,
                result,
                executionTime: executionContext.endTime - executionContext.startTime
            });
            
            return result;
            
        } catch (error) {
            // Update execution context
            executionContext.state = ToolState.FAILED;
            executionContext.endTime = new Date();
            executionContext.error = error;
            
            // Update usage statistics
            this.updateUsageStats(toolName, executionContext, false);
            
            this.options.logger.error(
                `Tool '${toolName}' execution ${executionId} failed:`,
                error
            );
            
            this.emit('toolError', {
                executionId,
                toolName,
                parameters,
                error,
                executionTime: executionContext.endTime - executionContext.startTime
            });
            
            throw error;
            
        } finally {
            // Clean up execution context
            this.activeExecutions.delete(executionId);
        }
    }
    
    /**
     * Gets available tools
     * @returns {Array} Available tools
     */
    getAvailableTools() {
        return Array.from(this.toolRegistry.entries()).map(([name, definition]) => ({
            name,
            description: definition.description,
            serverName: definition.serverName,
            inputSchema: definition.inputSchema,
            namespacedName: definition.namespacedName
        }));
    }
    
    /**
     * Gets tool information
     * @param {string} toolName - Tool name
     * @returns {Object|null} Tool information
     */
    getToolInfo(toolName) {
        const definition = this.toolRegistry.get(toolName);
        
        if (!definition) {
            return null;
        }
        
        const stats = this.usageStats.get(toolName);
        
        return {
            name: toolName,
            definition,
            statistics: stats,
            isActive: this.isToolActive(toolName)
        };
    }
    
    /**
     * Gets tools by server
     * @param {string} serverName - Server name
     * @returns {Array} Tools from the server
     */
    getToolsByServer(serverName) {
        const serverTools = this.serverTools.get(serverName);
        
        if (!serverTools) {
            return [];
        }
        
        return Array.from(serverTools).map(toolName => ({
            name: toolName,
            definition: this.toolRegistry.get(toolName)
        }));
    }
    
    /**
     * Gets active tool executions
     * @returns {Array} Active executions
     */
    getActiveExecutions() {
        return Array.from(this.activeExecutions.values()).map(execution => ({
            id: execution.id,
            toolName: execution.toolName,
            serverName: execution.serverName,
            state: execution.state,
            startTime: execution.startTime,
            sessionId: execution.sessionId
        }));
    }
    
    /**
     * Cancels a tool execution
     * @param {number} executionId - Execution ID
     * @returns {Promise<void>}
     */
    async cancelExecution(executionId) {
        const execution = this.activeExecutions.get(executionId);
        
        if (!execution) {
            throw new Error(`Execution ${executionId} not found`);
        }
        
        execution.state = ToolState.CANCELLED;
        
        this.options.logger.log(`Cancelled tool execution ${executionId}`);
        
        this.emit('executionCancelled', {
            executionId,
            toolName: execution.toolName
        });
    }
    
    /**
     * Clears the tool registry
     * @returns {void}
     */
    clearRegistry() {
        const toolCount = this.toolRegistry.size;
        
        this.toolRegistry.clear();
        this.serverTools.clear();
        
        this.options.logger.log(`Cleared tool registry (${toolCount} tools removed)`);
        
        this.emit('registryCleared', { toolCount });
    }
    
    /**
     * Gets registry status
     * @returns {Object} Registry status
     */
    getRegistryStatus() {
        return {
            totalTools: this.toolRegistry.size,
            serverCount: this.serverTools.size,
            activeExecutions: this.activeExecutions.size,
            toolsByServer: Object.fromEntries(
                Array.from(this.serverTools.entries()).map(([server, tools]) => [
                    server,
                    tools.size
                ])
            )
        };
    }
    
    /**
     * Normalizes tool definition
     * @param {Object} toolDefinition - Raw tool definition
     * @returns {Object} Normalized tool definition
     * @private
     */
    normalizeToolDefinition(toolDefinition) {
        return {
            name: toolDefinition.name,
            description: toolDefinition.description || '',
            inputSchema: toolDefinition.inputSchema || { type: 'object', properties: {} },
            serverName: toolDefinition.serverName,
            discoveredAt: toolDefinition.discoveredAt || new Date(),
            version: toolDefinition.version,
            category: toolDefinition.category,
            tags: toolDefinition.tags || [],
            deprecated: toolDefinition.deprecated || false,
            ...toolDefinition
        };
    }
    
    /**
     * Validates tool parameters against schema
     * @param {Object} toolDefinition - Tool definition
     * @param {Object} parameters - Parameters to validate
     * @throws {Error} If parameters are invalid
     * @private
     */
    validateToolParameters(toolDefinition, parameters) {
        const schema = toolDefinition.inputSchema;
        
        if (!schema) {
            return; // No schema to validate against
        }
        
        // Basic validation
        if (schema.type === 'object') {
            if (typeof parameters !== 'object' || parameters === null) {
                throw new Error(`Tool '${toolDefinition.name}' expects object parameters`);
            }
            
            // Check required properties
            if (schema.required && Array.isArray(schema.required)) {
                for (const requiredProp of schema.required) {
                    if (!(requiredProp in parameters)) {
                        throw new Error(
                            `Tool '${toolDefinition.name}' missing required parameter: ${requiredProp}`
                        );
                    }
                }
            }
            
            // Validate property types (basic validation)
            if (schema.properties) {
                for (const [propName, propSchema] of Object.entries(schema.properties)) {
                    if (propName in parameters) {
                        this.validatePropertyType(
                            parameters[propName],
                            propSchema,
                            `${toolDefinition.name}.${propName}`
                        );
                    }
                }
            }
        }
    }
    
    /**
     * Validates a property type
     * @param {*} value - Value to validate
     * @param {Object} schema - Property schema
     * @param {string} path - Property path for error messages
     * @throws {Error} If value doesn't match schema
     * @private
     */
    validatePropertyType(value, schema, path) {
        if (!schema.type) return;
        
        const expectedType = schema.type;
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        
        if (expectedType !== actualType) {
            throw new Error(
                `Parameter '${path}' expected type '${expectedType}', got '${actualType}'`
            );
        }
        
        // Additional validations can be added here (string length, number ranges, etc.)
    }
    
    /**
     * Checks tool permissions
     * @param {string} toolName - Tool name
     * @param {Object} options - Execution options
     * @throws {Error} If permission denied
     * @private
     */
    async checkToolPermissions(toolName, options) {
        const permissions = this.toolPermissions.get(toolName);
        
        if (!permissions) {
            return; // No permissions set, allow by default
        }
        
        // Check if tool is disabled
        if (permissions.disabled) {
            throw new Error(`Tool '${toolName}' is disabled`);
        }
        
        // Check session-based permissions
        if (permissions.allowedSessions && options.sessionId) {
            if (!permissions.allowedSessions.includes(options.sessionId)) {
                throw new Error(
                    `Tool '${toolName}' not allowed for session '${options.sessionId}'`
                );
            }
        }
        
        // Additional permission checks can be added here
    }
    
    /**
     * Performs the actual tool execution
     * @param {Object} executionContext - Execution context
     * @param {Object} options - Execution options
     * @returns {Promise<Object>} Execution result
     * @private
     */
    async performToolExecution(executionContext, options) {
        executionContext.state = ToolState.EXECUTING;
        
        // Get server reference (this would be injected or passed in)
        // For now, we'll emit an event that the MCP manager can handle
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error(`Tool execution timeout after ${this.options.timeout}ms`));
            }, options.timeout || this.options.timeout);
            
            // Emit tool execution request
            this.emit('executeToolRequest', {
                executionContext,
                resolve: (result) => {
                    clearTimeout(timeout);
                    resolve(result);
                },
                reject: (error) => {
                    clearTimeout(timeout);
                    reject(error);
                }
            });
        });
    }
    
    /**
     * Updates usage statistics for a tool
     * @param {string} toolName - Tool name
     * @param {Object} executionContext - Execution context
     * @param {boolean} success - Whether execution was successful
     * @private
     */
    updateUsageStats(toolName, executionContext, success) {
        let stats = this.usageStats.get(toolName);
        
        if (!stats) {
            stats = {
                callCount: 0,
                successCount: 0,
                errorCount: 0,
                totalExecutionTime: 0,
                averageExecutionTime: 0,
                lastUsed: null
            };
            this.usageStats.set(toolName, stats);
        }
        
        const executionTime = executionContext.endTime - executionContext.startTime;
        
        stats.callCount++;
        stats.totalExecutionTime += executionTime;
        stats.averageExecutionTime = stats.totalExecutionTime / stats.callCount;
        stats.lastUsed = executionContext.endTime;
        
        if (success) {
            stats.successCount++;
        } else {
            stats.errorCount++;
        }
    }
    
    /**
     * Checks if a tool has active executions
     * @param {string} toolName - Tool name
     * @returns {boolean} True if tool has active executions
     * @private
     */
    isToolActive(toolName) {
        for (const execution of this.activeExecutions.values()) {
            if (execution.toolName === toolName && 
                execution.state === ToolState.EXECUTING) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Loads tool permissions from storage
     * @returns {Promise<void>}
     * @private
     */
    async loadToolPermissions() {
        // This would load from file system or configuration
        // For now, we'll just initialize an empty permissions map
        this.toolPermissions = new Map();
    }
    
    /**
     * Shuts down the tool manager
     * @returns {Promise<void>}
     */
    async shutdown() {
        this.options.logger.log('Shutting down Tool Manager...');
        
        // Cancel all active executions
        for (const executionId of this.activeExecutions.keys()) {
            try {
                await this.cancelExecution(executionId);
            } catch (error) {
                this.options.logger.error(
                    `Error cancelling execution ${executionId}:`,
                    error
                );
            }
        }
        
        // Clear registry
        this.clearRegistry();
        
        // Remove all event listeners
        this.removeAllListeners();
        
        this.options.logger.log('Tool Manager shutdown complete');
    }
}

export default ToolManager;