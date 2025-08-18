/**
 * MCP Protocol Communication
 * 
 * Implements Model Context Protocol communication for tool execution.
 * Handles process spawning, message protocol, and tool invocation.
 */

import { spawn } from 'child_process';
import { EventEmitter } from 'events';

/**
 * MCP Message Buffer for handling streaming JSON messages
 */
class MessageBuffer {
    constructor() {
        this.buffer = '';
    }

    /**
     * Append data to buffer
     * @param {Buffer|string} data - Raw data
     */
    append(data) {
        this.buffer += data.toString();
    }

    /**
     * Read a complete JSON message from the buffer
     * @returns {object|null} Parsed JSON message or null if incomplete
     */
    readMessage() {
        const newlineIndex = this.buffer.indexOf('\n');
        if (newlineIndex === -1) {
            return null; // No complete message yet
        }

        const messageLine = this.buffer.slice(0, newlineIndex);
        this.buffer = this.buffer.slice(newlineIndex + 1);

        try {
            return JSON.parse(messageLine);
        } catch (error) {
            throw new Error(`Failed to parse JSON message: ${error.message}`);
        }
    }

    /**
     * Clear the buffer
     */
    clear() {
        this.buffer = '';
    }
}

/**
 * MCP Client Transport for stdio communication
 */
export class McpStdioTransport extends EventEmitter {
    constructor(serverConfig) {
        super();
        this.serverConfig = serverConfig;
        this.process = null;
        this.messageBuffer = new MessageBuffer();
        this.abortController = new AbortController();
        this.connected = false;
    }

    /**
     * Start the MCP server process and establish connection
     */
    async start() {
        if (this.process) {
            throw new Error('MCP transport already started');
        }

        return new Promise((resolve, reject) => {
            try {
                // Spawn the MCP server process
                this.process = spawn(
                    this.serverConfig.command,
                    this.serverConfig.args || [],
                    {
                        stdio: ['pipe', 'pipe', 'pipe'],
                        env: {
                            ...process.env,
                            ...this.serverConfig.env
                        },
                        shell: false,
                        signal: this.abortController.signal
                    }
                );

                // Handle process events
                this.process.on('error', (error) => {
                    if (error.name === 'AbortError') {
                        this.emit('close');
                        return;
                    }
                    this.emit('error', error);
                    reject(error);
                });

                this.process.on('spawn', () => {
                    this.connected = true;
                    this.emit('connect');
                    resolve();
                });

                this.process.on('close', (code) => {
                    this.connected = false;
                    this.process = null;
                    this.emit('close', code);
                });

                // Handle stdout data (MCP messages)
                this.process.stdout.on('data', (data) => {
                    this.messageBuffer.append(data);
                    this._processMessages();
                });

                this.process.stdout.on('error', (error) => {
                    this.emit('error', error);
                });

                // Handle stderr (server logs)
                this.process.stderr.on('data', (data) => {
                    this.emit('stderr', data.toString());
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Process messages from the buffer
     */
    _processMessages() {
        while (true) {
            try {
                const message = this.messageBuffer.readMessage();
                if (message === null) break;
                
                this.emit('message', message);
            } catch (error) {
                this.emit('error', error);
                break;
            }
        }
    }

    /**
     * Send a message to the MCP server
     * @param {object} message - MCP protocol message
     */
    async send(message) {
        if (!this.process?.stdin) {
            throw new Error('MCP transport not connected');
        }

        return new Promise((resolve, reject) => {
            const messageStr = JSON.stringify(message) + '\n';
            
            if (this.process.stdin.write(messageStr)) {
                resolve();
            } else {
                this.process.stdin.once('drain', resolve);
                this.process.stdin.once('error', reject);
            }
        });
    }

    /**
     * Close the transport and terminate the process
     */
    async close() {
        if (!this.process) return;

        this.abortController.abort();
        
        // Give the process a moment to close gracefully
        await new Promise(resolve => {
            if (!this.process) {
                resolve();
                return;
            }
            
            this.process.once('close', resolve);
            this.process.kill('SIGTERM');
            
            // Force kill after timeout
            setTimeout(() => {
                if (this.process) {
                    this.process.kill('SIGKILL');
                    resolve();
                }
            }, 5000);
        });

        this.messageBuffer.clear();
        this.process = null;
        this.connected = false;
    }

    /**
     * Check if transport is connected
     */
    isConnected() {
        return this.connected && this.process && !this.process.killed;
    }
}

/**
 * MCP Client for managing server connections and tool execution
 */
export class McpClient extends EventEmitter {
    constructor(serverConfig, options = {}) {
        super();
        this.serverConfig = serverConfig;
        this.options = options;
        this.transport = null;
        this.tools = new Map();
        this.resources = new Map();
        this.nextRequestId = 1;
        this.pendingRequests = new Map();
        this.serverCapabilities = null;
    }

    /**
     * Connect to the MCP server
     */
    async connect() {
        if (this.transport) {
            throw new Error('Already connected to MCP server');
        }

        // Create transport based on server configuration
        switch (this.serverConfig.transport || 'stdio') {
            case 'stdio':
                this.transport = new McpStdioTransport(this.serverConfig);
                break;
            default:
                throw new Error(`Unsupported transport: ${this.serverConfig.transport}`);
        }

        // Set up transport event handlers
        this.transport.on('message', (message) => this._handleMessage(message));
        this.transport.on('error', (error) => this.emit('error', error));
        this.transport.on('close', () => this.emit('disconnect'));
        this.transport.on('stderr', (data) => {
            if (this.options.debug) {
                console.error(`[MCP ${this.serverConfig.name} stderr]:`, data);
            }
        });

        // Start the transport
        await this.transport.start();

        // Perform MCP handshake
        await this._performHandshake();

        this.emit('connect');
    }

    /**
     * Perform MCP protocol handshake
     */
    async _performHandshake() {
        try {
            // Send initialize request
            const initResponse = await this._sendRequest('initialize', {
                protocolVersion: '2024-11-05',
                capabilities: {
                    tools: {},
                    resources: {},
                    prompts: {}
                },
                clientInfo: {
                    name: 'claude-code-clean',
                    version: '1.0.0'
                }
            });

            this.serverCapabilities = initResponse.capabilities;

            // Send initialized notification
            await this._sendNotification('initialized', {});

            // List available tools
            if (this.serverCapabilities.tools) {
                const toolsResponse = await this._sendRequest('tools/list', {});
                for (const tool of toolsResponse.tools || []) {
                    this.tools.set(tool.name, tool);
                }
            }

            // List available resources
            if (this.serverCapabilities.resources) {
                const resourcesResponse = await this._sendRequest('resources/list', {});
                for (const resource of resourcesResponse.resources || []) {
                    this.resources.set(resource.uri, resource);
                }
            }

        } catch (error) {
            throw new Error(`MCP handshake failed: ${error.message}`);
        }
    }

    /**
     * Handle incoming messages from the transport
     * @param {object} message - MCP protocol message
     */
    _handleMessage(message) {
        if (this.options.debug) {
            console.log(`[MCP ${this.serverConfig.name} <-]:`, JSON.stringify(message, null, 2));
        }

        if (message.id && this.pendingRequests.has(message.id)) {
            // This is a response to a request
            const { resolve, reject } = this.pendingRequests.get(message.id);
            this.pendingRequests.delete(message.id);

            if (message.error) {
                reject(new Error(`MCP Error: ${message.error.message}`));
            } else {
                resolve(message.result);
            }
        } else if (message.method) {
            // This is a request or notification from the server
            this.emit('request', message);
        }
    }

    /**
     * Send a request and wait for response
     * @param {string} method - MCP method name
     * @param {object} params - Request parameters
     * @returns {Promise<object>} Response result
     */
    async _sendRequest(method, params) {
        if (!this.transport) {
            throw new Error('Not connected to MCP server');
        }

        const id = this.nextRequestId++;
        const message = {
            jsonrpc: '2.0',
            id,
            method,
            params
        };

        return new Promise((resolve, reject) => {
            this.pendingRequests.set(id, { resolve, reject });

            this.transport.send(message).catch(error => {
                this.pendingRequests.delete(id);
                reject(error);
            });

            // Timeout handling
            setTimeout(() => {
                if (this.pendingRequests.has(id)) {
                    this.pendingRequests.delete(id);
                    reject(new Error(`Request timeout: ${method}`));
                }
            }, 30000);
        });
    }

    /**
     * Send a notification (no response expected)
     * @param {string} method - MCP method name
     * @param {object} params - Notification parameters
     */
    async _sendNotification(method, params) {
        if (!this.transport) {
            throw new Error('Not connected to MCP server');
        }

        const message = {
            jsonrpc: '2.0',
            method,
            params
        };

        if (this.options.debug) {
            console.log(`[MCP ${this.serverConfig.name} ->]:`, JSON.stringify(message, null, 2));
        }

        await this.transport.send(message);
    }

    /**
     * Execute a tool
     * @param {string} toolName - Name of the tool to execute
     * @param {object} arguments_ - Tool arguments
     * @returns {Promise<object>} Tool execution result
     */
    async executeTool(toolName, arguments_) {
        if (!this.tools.has(toolName)) {
            throw new Error(`Tool '${toolName}' not available on server '${this.serverConfig.name}'`);
        }

        const result = await this._sendRequest('tools/call', {
            name: toolName,
            arguments: arguments_
        });

        return result;
    }

    /**
     * Read a resource
     * @param {string} uri - Resource URI
     * @returns {Promise<object>} Resource content
     */
    async readResource(uri) {
        if (!this.resources.has(uri)) {
            throw new Error(`Resource '${uri}' not available on server '${this.serverConfig.name}'`);
        }

        const result = await this._sendRequest('resources/read', {
            uri
        });

        return result;
    }

    /**
     * Get list of available tools
     * @returns {Array} Available tools
     */
    getAvailableTools() {
        return Array.from(this.tools.values());
    }

    /**
     * Get list of available resources
     * @returns {Array} Available resources
     */
    getAvailableResources() {
        return Array.from(this.resources.values());
    }

    /**
     * Get server capabilities
     * @returns {object} Server capabilities
     */
    getServerCapabilities() {
        return this.serverCapabilities;
    }

    /**
     * Disconnect from the MCP server
     */
    async disconnect() {
        if (!this.transport) return;

        try {
            await this.transport.close();
        } finally {
            this.transport = null;
            this.tools.clear();
            this.resources.clear();
            this.pendingRequests.clear();
            this.serverCapabilities = null;
            this.emit('disconnect');
        }
    }

    /**
     * Check if connected to the server
     */
    isConnected() {
        return this.transport && this.transport.isConnected();
    }
}

/**
 * MCP Connection Pool for managing multiple server connections
 */
export class McpConnectionPool extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = options;
        this.connections = new Map();
    }

    /**
     * Add a server to the pool
     * @param {string} name - Server name
     * @param {object} serverConfig - Server configuration
     */
    async addServer(name, serverConfig) {
        if (this.connections.has(name)) {
            throw new Error(`Server '${name}' is already in the connection pool`);
        }

        const client = new McpClient(
            { ...serverConfig, name },
            { debug: this.options.debug }
        );

        client.on('error', (error) => {
            this.emit('serverError', name, error);
        });

        client.on('disconnect', () => {
            this.connections.delete(name);
            this.emit('serverDisconnect', name);
        });

        try {
            await client.connect();
            this.connections.set(name, client);
            this.emit('serverConnect', name);
        } catch (error) {
            throw new Error(`Failed to connect to MCP server '${name}': ${error.message}`);
        }
    }

    /**
     * Remove a server from the pool
     * @param {string} name - Server name
     */
    async removeServer(name) {
        const client = this.connections.get(name);
        if (!client) return;

        await client.disconnect();
        this.connections.delete(name);
    }

    /**
     * Get a connected client
     * @param {string} name - Server name
     * @returns {McpClient|null} MCP client or null if not connected
     */
    getClient(name) {
        return this.connections.get(name) || null;
    }

    /**
     * Execute a tool on any available server
     * @param {string} toolName - Tool name
     * @param {object} arguments_ - Tool arguments
     * @returns {Promise<object>} Tool execution result
     */
    async executeTool(toolName, arguments_) {
        for (const [serverName, client] of this.connections) {
            if (client.tools.has(toolName)) {
                try {
                    return await client.executeTool(toolName, arguments_);
                } catch (error) {
                    console.warn(`Tool execution failed on server '${serverName}':`, error.message);
                    continue;
                }
            }
        }

        throw new Error(`Tool '${toolName}' not available on any connected MCP server`);
    }

    /**
     * Get all available tools from all connected servers
     * @returns {Array} Available tools with server information
     */
    getAllAvailableTools() {
        const tools = [];
        for (const [serverName, client] of this.connections) {
            for (const tool of client.getAvailableTools()) {
                tools.push({
                    ...tool,
                    serverName
                });
            }
        }
        return tools;
    }

    /**
     * Disconnect all servers
     */
    async disconnectAll() {
        const disconnectPromises = Array.from(this.connections.values()).map(
            client => client.disconnect()
        );
        
        await Promise.allSettled(disconnectPromises);
        this.connections.clear();
    }

    /**
     * Get connection status for all servers
     * @returns {Array} Connection status information
     */
    getConnectionStatus() {
        const status = [];
        for (const [name, client] of this.connections) {
            status.push({
                name,
                connected: client.isConnected(),
                toolCount: client.tools.size,
                resourceCount: client.resources.size
            });
        }
        return status;
    }
}