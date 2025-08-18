/**
 * MCP Manager - Main MCP Coordinator
 * 
 * This module serves as the main coordinator for the Model Context Protocol integration.
 * It orchestrates server lifecycle management, tool execution, and protocol communication.
 * 
 * @module MCPManager
 */

import { EventEmitter } from 'events';
import { ServerManager } from './server-manager.js';
import { ToolManager } from './tool-manager.js';
import { ProtocolHandler } from './protocol.js';
import { TransportFactory } from './transport.js';

/**
 * MCP Manager class - coordinates all MCP operations
 */
export class MCPManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            logger: console,
            timeout: 30000,
            maxRetries: 3,
            ...options
        };
        
        // Initialize sub-managers
        this.serverManager = new ServerManager({
            logger: this.options.logger,
            transportFactory: new TransportFactory()
        });
        
        this.toolManager = new ToolManager({
            logger: this.options.logger,
            timeout: this.options.timeout
        });
        
        this.protocolHandler = new ProtocolHandler({
            logger: this.options.logger,
            timeout: this.options.timeout
        });
        
        // Track active sessions
        this.activeSessions = new Map();
        this.sessionCounter = 0;
        
        this.setupEventHandlers();
    }
    
    /**
     * Sets up event handlers between components
     * @private
     */
    setupEventHandlers() {
        // Server events
        this.serverManager.on('serverStarted', (data) => {
            this.emit('serverStarted', data);
            this.handleServerStarted(data);
        });
        
        this.serverManager.on('serverStopped', (data) => {
            this.emit('serverStopped', data);
            this.handleServerStopped(data);
        });
        
        this.serverManager.on('serverError', (data) => {
            this.emit('serverError', data);
            this.handleServerError(data);
        });
        
        // Tool events
        this.toolManager.on('toolExecuted', (data) => {
            this.emit('toolExecuted', data);
        });
        
        this.toolManager.on('toolError', (data) => {
            this.emit('toolError', data);
        });
        
        // Protocol events
        this.protocolHandler.on('protocolError', (data) => {
            this.emit('protocolError', data);
        });
        
        this.protocolHandler.on('messageReceived', (data) => {
            this.handleProtocolMessage(data);
        });
        
        // Tool manager events
        this.toolManager.on('executeToolRequest', async (data) => {
            await this.handleToolExecutionRequest(data);
        });
    }
    
    /**
     * Initializes the MCP manager
     * @param {Object} config - Configuration object
     * @returns {Promise<void>}
     */
    async initialize(config = {}) {
        try {
            this.options.logger.log('Initializing MCP Manager...');
            
            // Initialize server manager
            await this.serverManager.initialize(config.servers || {});
            
            // Initialize tool manager
            await this.toolManager.initialize();
            
            // Initialize protocol handler
            await this.protocolHandler.initialize();
            
            this.options.logger.log('MCP Manager initialized successfully');
            this.emit('initialized');
            
        } catch (error) {
            this.options.logger.error('Failed to initialize MCP Manager:', error);
            this.emit('error', error);
            throw error;
        }
    }
    
    /**
     * Starts all configured MCP servers
     * @param {Object} options - Start options
     * @returns {Promise<Object>} Start results
     */
    async startServers(options = {}) {
        try {
            const results = await this.serverManager.startAllServers(options);
            
            // Update tool registry with available tools from started servers
            for (const result of results.successful) {
                await this.discoverTools(result.name);
            }
            
            return results;
            
        } catch (error) {
            this.options.logger.error('Failed to start MCP servers:', error);
            throw error;
        }
    }
    
    /**
     * Stops all running MCP servers
     * @returns {Promise<void>}
     */
    async stopServers() {
        try {
            // Clear active sessions
            this.activeSessions.clear();
            
            // Clear tool registry
            this.toolManager.clearRegistry();
            
            // Stop all servers
            await this.serverManager.stopAllServers();
            
            this.options.logger.log('All MCP servers stopped');
            
        } catch (error) {
            this.options.logger.error('Error stopping MCP servers:', error);
            throw error;
        }
    }
    
    /**
     * Creates a new MCP session
     * @param {Object} options - Session options
     * @returns {Promise<string>} Session ID
     */
    async createSession(options = {}) {
        const sessionId = `session_${++this.sessionCounter}`;
        
        const session = {
            id: sessionId,
            createdAt: new Date(),
            servers: new Set(),
            tools: new Map(),
            context: new Map(),
            ...options
        };
        
        this.activeSessions.set(sessionId, session);
        
        this.options.logger.log(`Created MCP session: ${sessionId}`);
        this.emit('sessionCreated', { sessionId, session });
        
        return sessionId;
    }
    
    /**
     * Destroys an MCP session
     * @param {string} sessionId - Session ID
     * @returns {Promise<void>}
     */
    async destroySession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        
        if (!session) {
            throw new Error(`Session not found: ${sessionId}`);
        }
        
        // Clean up session resources
        session.context.clear();
        session.tools.clear();
        session.servers.clear();
        
        this.activeSessions.delete(sessionId);
        
        this.options.logger.log(`Destroyed MCP session: ${sessionId}`);
        this.emit('sessionDestroyed', { sessionId });
    }
    
    /**
     * Executes a tool within a session context
     * @param {string} sessionId - Session ID
     * @param {string} toolName - Tool name
     * @param {Object} parameters - Tool parameters
     * @param {Object} options - Execution options
     * @returns {Promise<Object>} Tool execution result
     */
    async executeTool(sessionId, toolName, parameters = {}, options = {}) {
        const session = this.activeSessions.get(sessionId);
        
        if (!session) {
            throw new Error(`Session not found: ${sessionId}`);
        }
        
        try {
            const result = await this.toolManager.executeTool(toolName, parameters, {
                sessionId,
                context: session.context,
                ...options
            });
            
            // Update session context with execution result if needed
            if (result.context) {
                for (const [key, value] of Object.entries(result.context)) {
                    session.context.set(key, value);
                }
            }
            
            this.emit('toolExecuted', {
                sessionId,
                toolName,
                parameters,
                result
            });
            
            return result;
            
        } catch (error) {
            this.emit('toolError', {
                sessionId,
                toolName,
                parameters,
                error
            });
            throw error;
        }
    }
    
    /**
     * Handles tool execution requests from the tool manager
     * @param {Object} data - Tool execution request data
     * @returns {Promise<void>}
     * @private
     */
    async handleToolExecutionRequest(data) {
        const { executionContext, resolve, reject } = data;
        
        try {
            // Get the server for this tool
            const toolInfo = this.toolManager.getToolInfo(executionContext.toolName);
            
            if (!toolInfo) {
                throw new Error(`Tool '${executionContext.toolName}' not found`);
            }
            
            const server = this.serverManager.getServer(toolInfo.definition.serverName);
            
            if (!server || !server.transport) {
                throw new Error(`Server '${toolInfo.definition.serverName}' not available`);
            }
            
            // Create tool call request
            const toolCallRequest = this.protocolHandler.createRequest('tools/call', {
                name: executionContext.toolName,
                arguments: executionContext.parameters
            });
            
            // Send request via protocol handler
            const response = await this.protocolHandler.sendRequest(
                server.transport,
                toolCallRequest,
                { timeout: executionContext.timeout }
            );
            
            if (response.error) {
                throw new Error(response.error.message);
            }
            
            resolve(response.result);
            
        } catch (error) {
            reject(error);
        }
    }
    
    /**
     * Discovers available tools from a server
     * @param {string} serverName - Server name
     * @returns {Promise<Array>} Discovered tools
     */
    async discoverTools(serverName) {
        try {
            const server = this.serverManager.getServer(serverName);
            
            if (!server || server.state !== 'ready') {
                throw new Error(`Server '${serverName}' is not running or not ready`);
            }
            
            // Query server for available tools
            const toolsRequest = this.protocolHandler.createRequest('tools/list', {});
            const response = await this.protocolHandler.sendRequest(
                server.transport,
                toolsRequest
            );
            
            if (response.result && response.result.tools) {
                const tools = response.result.tools;
                
                // Register discovered tools
                for (const tool of tools) {
                    this.toolManager.registerTool(tool.name, {
                        ...tool,
                        serverName,
                        discoveredAt: new Date()
                    });
                }
                
                this.options.logger.log(
                    `Discovered ${tools.length} tools from server '${serverName}'`
                );
                
                this.emit('toolsDiscovered', {
                    serverName,
                    tools
                });
                
                return tools;
            }
            
            return [];
            
        } catch (error) {
            this.options.logger.error(
                `Failed to discover tools from server '${serverName}':`,
                error
            );
            throw error;
        }
    }
    
    /**
     * Gets all available tools
     * @returns {Array} Available tools
     */
    getAvailableTools() {
        return this.toolManager.getAvailableTools();
    }
    
    /**
     * Gets tool information
     * @param {string} toolName - Tool name
     * @returns {Object|null} Tool information
     */
    getToolInfo(toolName) {
        return this.toolManager.getToolInfo(toolName);
    }
    
    /**
     * Gets session information
     * @param {string} sessionId - Session ID
     * @returns {Object|null} Session information
     */
    getSession(sessionId) {
        return this.activeSessions.get(sessionId);
    }
    
    /**
     * Lists all active sessions
     * @returns {Array} Active sessions
     */
    getActiveSessions() {
        return Array.from(this.activeSessions.values());
    }
    
    /**
     * Gets manager status
     * @returns {Object} Status information
     */
    getStatus() {
        return {
            initialized: true,
            servers: this.serverManager.getServerStatuses(),
            tools: this.toolManager.getRegistryStatus(),
            sessions: {
                active: this.activeSessions.size,
                total: this.sessionCounter
            }
        };
    }
    
    /**
     * Handles server started event
     * @param {Object} data - Event data
     * @private
     */
    async handleServerStarted(data) {
        try {
            // Discover tools from newly started server
            await this.discoverTools(data.name);
        } catch (error) {
            this.options.logger.error(
                `Failed to discover tools from started server '${data.name}':`,
                error
            );
        }
    }
    
    /**
     * Handles server stopped event
     * @param {Object} data - Event data
     * @private
     */
    handleServerStopped(data) {
        // Remove tools associated with stopped server
        this.toolManager.removeToolsByServer(data.name);
        
        // Remove server from all sessions
        for (const session of this.activeSessions.values()) {
            session.servers.delete(data.name);
        }
    }
    
    /**
     * Handles server error event
     * @param {Object} data - Event data
     * @private
     */
    handleServerError(data) {
        this.options.logger.error(
            `Server '${data.name}' error:`,
            data.error
        );
        
        // Attempt recovery if configured
        if (this.options.autoRestart) {
            this.attemptServerRestart(data.name);
        }
    }
    
    /**
     * Handles protocol messages
     * @param {Object} data - Message data
     * @private
     */
    handleProtocolMessage(data) {
        // Route protocol messages to appropriate handlers
        switch (data.method) {
            case 'notification/tools_changed':
                this.handleToolsChanged(data);
                break;
            case 'notification/resource_changed':
                this.handleResourceChanged(data);
                break;
            default:
                this.options.logger.debug('Unhandled protocol message:', data);
        }
    }
    
    /**
     * Handles tools changed notification
     * @param {Object} data - Message data
     * @private
     */
    async handleToolsChanged(data) {
        try {
            const serverName = data.serverName;
            
            if (serverName) {
                // Refresh tools for the server
                await this.discoverTools(serverName);
                this.emit('toolsChanged', { serverName });
            }
        } catch (error) {
            this.options.logger.error('Failed to handle tools changed:', error);
        }
    }
    
    /**
     * Handles resource changed notification
     * @param {Object} data - Message data
     * @private
     */
    handleResourceChanged(data) {
        this.emit('resourceChanged', data);
    }
    
    /**
     * Attempts to restart a failed server
     * @param {string} serverName - Server name
     * @private
     */
    async attemptServerRestart(serverName) {
        try {
            this.options.logger.log(`Attempting to restart server '${serverName}'...`);
            
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
            
            await this.serverManager.startServer(serverName);
            
            this.options.logger.log(`Successfully restarted server '${serverName}'`);
            
        } catch (error) {
            this.options.logger.error(
                `Failed to restart server '${serverName}':`,
                error
            );
        }
    }
    
    /**
     * Shuts down the MCP manager
     * @returns {Promise<void>}
     */
    async shutdown() {
        try {
            this.options.logger.log('Shutting down MCP Manager...');
            
            // Destroy all active sessions
            for (const sessionId of this.activeSessions.keys()) {
                await this.destroySession(sessionId);
            }
            
            // Stop all servers
            await this.stopServers();
            
            // Clear event listeners
            this.removeAllListeners();
            
            this.options.logger.log('MCP Manager shut down successfully');
            
        } catch (error) {
            this.options.logger.error('Error during MCP Manager shutdown:', error);
            throw error;
        }
    }
}

/**
 * Default MCP manager instance
 */
export const defaultMCPManager = new MCPManager();

export default MCPManager;