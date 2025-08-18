/**
 * Protocol Handler - MCP Protocol Communication
 * 
 * This module handles the Model Context Protocol (MCP) communication layer.
 * It manages JSON-RPC message formatting, request/response handling,
 * protocol validation, and message routing between clients and servers.
 * Implements MCP specification version 2024-11-05.
 * 
 * @module ProtocolHandler
 */

import { EventEmitter } from 'events';

/**
 * MCP Protocol version
 */
export const MCP_VERSION = '2024-11-05';

/**
 * JSON-RPC version
 */
export const JSONRPC_VERSION = '2.0';

/**
 * MCP Protocol methods
 */
export const MCPMethods = {
    // Lifecycle
    INITIALIZE: 'initialize',
    INITIALIZED: 'notifications/initialized',
    
    // Tools
    TOOLS_LIST: 'tools/list',
    TOOLS_CALL: 'tools/call',
    
    // Resources
    RESOURCES_LIST: 'resources/list',
    RESOURCES_READ: 'resources/read',
    RESOURCES_SUBSCRIBE: 'resources/subscribe',
    RESOURCES_UNSUBSCRIBE: 'resources/unsubscribe',
    
    // Prompts
    PROMPTS_LIST: 'prompts/list',
    PROMPTS_GET: 'prompts/get',
    
    // Notifications
    NOTIFICATION_CANCELLED: 'notifications/cancelled',
    NOTIFICATION_PROGRESS: 'notifications/progress',
    NOTIFICATION_ROOTS_LIST_CHANGED: 'notifications/roots/list_changed',
    NOTIFICATION_TOOLS_LIST_CHANGED: 'notifications/tools/list_changed',
    NOTIFICATION_RESOURCES_LIST_CHANGED: 'notifications/resources/list_changed',
    NOTIFICATION_RESOURCES_UPDATED: 'notifications/resources/updated',
    NOTIFICATION_PROMPTS_LIST_CHANGED: 'notifications/prompts/list_changed',
    
    // Utilities
    PING: 'ping',
    COMPLETE: 'completion/complete'
};

/**
 * Protocol error codes
 */
export const MCPErrorCodes = {
    PARSE_ERROR: -32700,
    INVALID_REQUEST: -32600,
    METHOD_NOT_FOUND: -32601,
    INVALID_PARAMS: -32602,
    INTERNAL_ERROR: -32603,
    SERVER_ERROR_START: -32099,
    SERVER_ERROR_END: -32000
};

/**
 * Protocol Handler class - manages MCP protocol communication
 */
export class ProtocolHandler extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            logger: console,
            timeout: 30000,
            maxMessageSize: 10 * 1024 * 1024, // 10MB
            strictValidation: true,
            ...options
        };
        
        // Request tracking: Map<requestId, requestContext>
        this.pendingRequests = new Map();
        
        // Request ID counter
        this.requestIdCounter = 0;
        
        // Message handlers: Map<method, handler>
        this.messageHandlers = new Map();
        
        // Protocol state
        this.protocolState = {
            initialized: false,
            capabilities: null,
            serverInfo: null,
            clientInfo: {
                name: 'claude-code',
                version: '1.0.0'
            }
        };
        
        // Setup default handlers
        this.setupDefaultHandlers();
    }
    
    /**
     * Initializes the protocol handler
     * @returns {Promise<void>}
     */
    async initialize() {
        try {
            this.options.logger.log('Initializing Protocol Handler...');
            
            this.options.logger.log('Protocol Handler initialized successfully');
            this.emit('initialized');
            
        } catch (error) {
            this.options.logger.error('Failed to initialize Protocol Handler:', error);
            throw error;
        }
    }
    
    /**
     * Creates a JSON-RPC request message
     * @param {string} method - RPC method name
     * @param {Object} params - Request parameters
     * @param {number} id - Request ID (optional, auto-generated if not provided)
     * @returns {Object} JSON-RPC request message
     */
    createRequest(method, params = {}, id = null) {
        const requestId = id !== null ? id : ++this.requestIdCounter;
        
        const request = {
            jsonrpc: JSONRPC_VERSION,
            method,
            id: requestId
        };
        
        // Only include params if not empty
        if (params && Object.keys(params).length > 0) {
            request.params = params;
        }
        
        this.validateMessage(request);
        
        return request;
    }
    
    /**
     * Creates a JSON-RPC notification message
     * @param {string} method - RPC method name
     * @param {Object} params - Notification parameters
     * @returns {Object} JSON-RPC notification message
     */
    createNotification(method, params = {}) {
        const notification = {
            jsonrpc: JSONRPC_VERSION,
            method
        };
        
        // Only include params if not empty
        if (params && Object.keys(params).length > 0) {
            notification.params = params;
        }
        
        this.validateMessage(notification);
        
        return notification;
    }
    
    /**
     * Creates a JSON-RPC response message
     * @param {number} id - Request ID
     * @param {*} result - Response result
     * @returns {Object} JSON-RPC response message
     */
    createResponse(id, result) {
        const response = {
            jsonrpc: JSONRPC_VERSION,
            id,
            result
        };
        
        this.validateMessage(response);
        
        return response;
    }
    
    /**
     * Creates a JSON-RPC error response message
     * @param {number} id - Request ID
     * @param {number} code - Error code
     * @param {string} message - Error message
     * @param {*} data - Additional error data
     * @returns {Object} JSON-RPC error response message
     */
    createErrorResponse(id, code, message, data = null) {
        const response = {
            jsonrpc: JSONRPC_VERSION,
            id,
            error: {
                code,
                message
            }
        };
        
        if (data !== null) {
            response.error.data = data;
        }
        
        this.validateMessage(response);
        
        return response;
    }
    
    /**
     * Sends a request and waits for response
     * @param {Object} transport - Transport instance
     * @param {Object} request - Request message
     * @param {Object} options - Request options
     * @returns {Promise<Object>} Response message
     */
    async sendRequest(transport, request, options = {}) {
        if (!request.id) {
            throw new Error('Request must have an ID');
        }
        
        const timeout = options.timeout || this.options.timeout;
        const requestContext = {
            request,
            transport,
            timestamp: Date.now(),
            resolve: null,
            reject: null,
            timeout: null
        };
        
        this.pendingRequests.set(request.id, requestContext);
        
        try {
            // Send the request
            await transport.send(request);
            
            // Wait for response
            return await new Promise((resolve, reject) => {
                requestContext.resolve = resolve;
                requestContext.reject = reject;
                
                // Set timeout
                requestContext.timeout = setTimeout(() => {
                    this.pendingRequests.delete(request.id);
                    reject(new Error(
                        `Request ${request.id} (${request.method}) timed out after ${timeout}ms`
                    ));
                }, timeout);
            });
            
        } catch (error) {
            this.pendingRequests.delete(request.id);
            throw error;
        }
    }
    
    /**
     * Sends a notification (no response expected)
     * @param {Object} transport - Transport instance
     * @param {Object} notification - Notification message
     * @returns {Promise<void>}
     */
    async sendNotification(transport, notification) {
        if (notification.id !== undefined) {
            throw new Error('Notifications must not have an ID');
        }
        
        await transport.send(notification);
        
        this.emit('notificationSent', {
            method: notification.method,
            params: notification.params
        });
    }
    
    /**
     * Processes an incoming message
     * @param {Object} message - Incoming message
     * @param {Object} transport - Transport instance
     * @returns {Promise<void>}
     */
    async processMessage(message, transport) {
        try {
            // Validate message format
            this.validateMessage(message);
            
            // Check message size
            const messageSize = JSON.stringify(message).length;
            if (messageSize > this.options.maxMessageSize) {
                throw new Error(`Message size ${messageSize} exceeds maximum ${this.options.maxMessageSize}`);
            }
            
            // Handle different message types
            if (this.isResponse(message)) {
                await this.handleResponse(message);
            } else if (this.isRequest(message)) {
                await this.handleRequest(message, transport);
            } else if (this.isNotification(message)) {
                await this.handleNotification(message, transport);
            } else {
                throw new Error('Unknown message type');
            }
            
        } catch (error) {
            this.options.logger.error('Error processing message:', error);
            
            // Send error response if it's a request
            if (this.isRequest(message) && message.id !== undefined) {
                const errorResponse = this.createErrorResponse(
                    message.id,
                    MCPErrorCodes.INTERNAL_ERROR,
                    error.message
                );
                
                try {
                    await transport.send(errorResponse);
                } catch (sendError) {
                    this.options.logger.error('Failed to send error response:', sendError);
                }
            }
            
            this.emit('protocolError', { error, message });
        }
    }
    
    /**
     * Registers a message handler
     * @param {string} method - Method name
     * @param {Function} handler - Handler function
     * @returns {void}
     */
    registerHandler(method, handler) {
        this.messageHandlers.set(method, handler);
        
        this.options.logger.log(`Registered handler for method: ${method}`);
    }
    
    /**
     * Unregisters a message handler
     * @param {string} method - Method name
     * @returns {void}
     */
    unregisterHandler(method) {
        this.messageHandlers.delete(method);
        
        this.options.logger.log(`Unregistered handler for method: ${method}`);
    }
    
    /**
     * Gets protocol state
     * @returns {Object} Protocol state
     */
    getProtocolState() {
        return {
            ...this.protocolState,
            pendingRequests: this.pendingRequests.size
        };
    }
    
    /**
     * Validates a message according to JSON-RPC and MCP specifications
     * @param {Object} message - Message to validate
     * @throws {Error} If message is invalid
     * @private
     */
    validateMessage(message) {
        if (!this.options.strictValidation) {
            return;
        }
        
        if (!message || typeof message !== 'object') {
            throw new Error('Message must be an object');
        }
        
        // Check JSON-RPC version
        if (message.jsonrpc !== JSONRPC_VERSION) {
            throw new Error(`Invalid JSON-RPC version: ${message.jsonrpc}`);
        }
        
        // Validate request
        if (this.isRequest(message)) {
            if (!message.method || typeof message.method !== 'string') {
                throw new Error('Request must have a string method');
            }
            
            if (message.id === undefined || message.id === null) {
                throw new Error('Request must have an ID');
            }
        }
        
        // Validate response
        if (this.isResponse(message)) {
            if (message.id === undefined || message.id === null) {
                throw new Error('Response must have an ID');
            }
            
            if (message.result === undefined && message.error === undefined) {
                throw new Error('Response must have either result or error');
            }
            
            if (message.result !== undefined && message.error !== undefined) {
                throw new Error('Response cannot have both result and error');
            }
        }
        
        // Validate notification
        if (this.isNotification(message)) {
            if (!message.method || typeof message.method !== 'string') {
                throw new Error('Notification must have a string method');
            }
            
            if (message.id !== undefined) {
                throw new Error('Notification must not have an ID');
            }
        }
    }
    
    /**
     * Checks if message is a request
     * @param {Object} message - Message to check
     * @returns {boolean} True if message is a request
     * @private
     */
    isRequest(message) {
        return message.method !== undefined && message.id !== undefined;
    }
    
    /**
     * Checks if message is a response
     * @param {Object} message - Message to check
     * @returns {boolean} True if message is a response
     * @private
     */
    isResponse(message) {
        return message.method === undefined && 
               message.id !== undefined && 
               (message.result !== undefined || message.error !== undefined);
    }
    
    /**
     * Checks if message is a notification
     * @param {Object} message - Message to check
     * @returns {boolean} True if message is a notification
     * @private
     */
    isNotification(message) {
        return message.method !== undefined && message.id === undefined;
    }
    
    /**
     * Handles incoming response messages
     * @param {Object} response - Response message
     * @returns {Promise<void>}
     * @private
     */
    async handleResponse(response) {
        const requestContext = this.pendingRequests.get(response.id);
        
        if (!requestContext) {
            this.options.logger.warn(`Received response for unknown request: ${response.id}`);
            return;
        }
        
        // Clear timeout
        if (requestContext.timeout) {
            clearTimeout(requestContext.timeout);
        }
        
        // Remove from pending requests
        this.pendingRequests.delete(response.id);
        
        // Resolve or reject the promise
        if (response.error) {
            const error = new Error(response.error.message);
            error.code = response.error.code;
            error.data = response.error.data;
            requestContext.reject(error);
        } else {
            requestContext.resolve(response);
        }
        
        this.emit('responseReceived', {
            requestId: response.id,
            method: requestContext.request.method,
            success: !response.error,
            responseTime: Date.now() - requestContext.timestamp
        });
    }
    
    /**
     * Handles incoming request messages
     * @param {Object} request - Request message
     * @param {Object} transport - Transport instance
     * @returns {Promise<void>}
     * @private
     */
    async handleRequest(request, transport) {
        const handler = this.messageHandlers.get(request.method);
        
        if (!handler) {
            const errorResponse = this.createErrorResponse(
                request.id,
                MCPErrorCodes.METHOD_NOT_FOUND,
                `Method not found: ${request.method}`
            );
            
            await transport.send(errorResponse);
            return;
        }
        
        try {
            const result = await handler(request.params, { transport, protocol: this });
            
            const response = this.createResponse(request.id, result);
            await transport.send(response);
            
        } catch (error) {
            this.options.logger.error(`Handler error for ${request.method}:`, error);
            
            const errorResponse = this.createErrorResponse(
                request.id,
                MCPErrorCodes.INTERNAL_ERROR,
                error.message,
                error.data
            );
            
            await transport.send(errorResponse);
        }
        
        this.emit('requestHandled', {
            method: request.method,
            requestId: request.id
        });
    }
    
    /**
     * Handles incoming notification messages
     * @param {Object} notification - Notification message
     * @param {Object} transport - Transport instance
     * @returns {Promise<void>}
     * @private
     */
    async handleNotification(notification, transport) {
        const handler = this.messageHandlers.get(notification.method);
        
        if (!handler) {
            this.options.logger.debug(`No handler for notification: ${notification.method}`);
            return;
        }
        
        try {
            await handler(notification.params, { transport, protocol: this });
        } catch (error) {
            this.options.logger.error(`Notification handler error for ${notification.method}:`, error);
        }
        
        this.emit('notificationHandled', {
            method: notification.method
        });
    }
    
    /**
     * Sets up default protocol handlers
     * @private
     */
    setupDefaultHandlers() {
        // Handle initialize request
        this.registerHandler(MCPMethods.INITIALIZE, async (params) => {
            this.protocolState.initialized = true;
            this.protocolState.serverInfo = params;
            
            return {
                protocolVersion: MCP_VERSION,
                capabilities: {
                    tools: { listChanged: true },
                    resources: { subscribe: true, listChanged: true },
                    prompts: { listChanged: true },
                    logging: {}
                },
                serverInfo: this.protocolState.clientInfo
            };
        });
        
        // Handle ping request
        this.registerHandler(MCPMethods.PING, async () => {
            return { status: 'pong' };
        });
        
        // Handle initialized notification
        this.registerHandler(MCPMethods.INITIALIZED, async () => {
            this.emit('protocolInitialized');
        });
    }
    
    /**
     * Cleans up pending requests
     * @private
     */
    cleanup() {
        // Reject all pending requests
        for (const [requestId, context] of this.pendingRequests) {
            if (context.timeout) {
                clearTimeout(context.timeout);
            }
            
            if (context.reject) {
                context.reject(new Error('Protocol handler is shutting down'));
            }
        }
        
        this.pendingRequests.clear();
    }
    
    /**
     * Shuts down the protocol handler
     * @returns {Promise<void>}
     */
    async shutdown() {
        this.options.logger.log('Shutting down Protocol Handler...');
        
        // Clean up pending requests
        this.cleanup();
        
        // Clear message handlers
        this.messageHandlers.clear();
        
        // Remove all event listeners
        this.removeAllListeners();
        
        this.options.logger.log('Protocol Handler shutdown complete');
    }
}

export default ProtocolHandler;