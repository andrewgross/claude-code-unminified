/**
 * Transport Layer - MCP Communication Layer
 * 
 * This module provides the transport layer for MCP (Model Context Protocol) communication.
 * It includes a TransportFactory for creating transport instances and implementations
 * for different transport types: STDIO (child process), SSE (Server-Sent Events),
 * and HTTP (direct HTTP requests).
 * 
 * @module Transport
 */

import { EventEmitter } from 'events';
import { spawn } from 'child_process';
import { Readable } from 'stream';

/**
 * Transport types
 */
export const TransportType = {
    STDIO: 'stdio',
    SSE: 'sse',
    HTTP: 'http'
};

/**
 * Transport states
 */
export const TransportState = {
    DISCONNECTED: 'disconnected',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    ERROR: 'error'
};

/**
 * Base Transport class - abstract base for all transport implementations
 */
export class BaseTransport extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            logger: console,
            timeout: 30000,
            maxMessageSize: 10 * 1024 * 1024, // 10MB
            reconnectAttempts: 3,
            reconnectDelay: 1000,
            ...options
        };
        
        this.state = TransportState.DISCONNECTED;
        this.reconnectCount = 0;
        this.messageQueue = [];
        this.isConnecting = false;
    }
    
    /**
     * Connects the transport
     * @returns {Promise<void>}
     * @abstract
     */
    async connect() {
        throw new Error('connect() must be implemented by transport subclass');
    }
    
    /**
     * Disconnects the transport
     * @returns {Promise<void>}
     * @abstract
     */
    async disconnect() {
        throw new Error('disconnect() must be implemented by transport subclass');
    }
    
    /**
     * Sends a message
     * @param {Object} message - Message to send
     * @returns {Promise<void>}
     * @abstract
     */
    async send(message) {
        throw new Error('send() must be implemented by transport subclass');
    }
    
    /**
     * Sends a request and waits for response
     * @param {Object} request - Request message
     * @param {Object} options - Request options
     * @returns {Promise<Object>} Response message
     */
    async sendRequest(request, options = {}) {
        if (!request.id) {
            throw new Error('Request must have an ID');
        }
        
        const timeout = options.timeout || this.options.timeout;
        
        return new Promise(async (resolve, reject) => {
            const timeoutId = setTimeout(() => {
                this.removeListener(`response_${request.id}`, responseHandler);
                reject(new Error(`Request ${request.id} timed out after ${timeout}ms`));
            }, timeout);
            
            const responseHandler = (response) => {
                clearTimeout(timeoutId);
                resolve(response);
            };
            
            this.once(`response_${request.id}`, responseHandler);
            
            try {
                await this.send(request);
            } catch (error) {
                clearTimeout(timeoutId);
                this.removeListener(`response_${request.id}`, responseHandler);
                reject(error);
            }
        });
    }
    
    /**
     * Sends a notification
     * @param {Object} notification - Notification message
     * @returns {Promise<void>}
     */
    async sendNotification(notification) {
        if (notification.id !== undefined) {
            throw new Error('Notifications must not have an ID');
        }
        
        await this.send(notification);
    }
    
    /**
     * Updates transport state
     * @param {string} newState - New transport state
     * @protected
     */
    updateState(newState) {
        const oldState = this.state;
        this.state = newState;
        
        this.emit('stateChanged', { oldState, newState });
        
        if (newState === TransportState.CONNECTED) {
            this.emit('connected');
            this.reconnectCount = 0;
        } else if (newState === TransportState.DISCONNECTED) {
            this.emit('disconnected');
        } else if (newState === TransportState.ERROR) {
            this.emit('error', new Error('Transport entered error state'));
        }
    }
    
    /**
     * Handles incoming messages
     * @param {Object} message - Incoming message
     * @protected
     */
    handleMessage(message) {
        try {
            // Validate message size
            const messageStr = JSON.stringify(message);
            if (messageStr.length > this.options.maxMessageSize) {
                throw new Error(`Message size exceeds maximum: ${messageStr.length}`);
            }
            
            this.emit('message', message);
            
            // If it's a response, emit specific response event
            if (message.id !== undefined && message.method === undefined) {
                this.emit(`response_${message.id}`, message);
            }
            
        } catch (error) {
            this.options.logger.error('Error handling message:', error);
            this.emit('error', error);
        }
    }
    
    /**
     * Attempts to reconnect
     * @protected
     */
    async attemptReconnect() {
        if (this.reconnectCount >= this.options.reconnectAttempts) {
            this.options.logger.error('Max reconnect attempts reached, giving up');
            return;
        }
        
        this.reconnectCount++;
        const delay = this.options.reconnectDelay * Math.pow(2, this.reconnectCount - 1);
        
        this.options.logger.log(
            `Attempting reconnection ${this.reconnectCount}/${this.options.reconnectAttempts} in ${delay}ms`
        );
        
        setTimeout(async () => {
            try {
                await this.connect();
            } catch (error) {
                this.options.logger.error(`Reconnection attempt ${this.reconnectCount} failed:`, error);
                await this.attemptReconnect();
            }
        }, delay);
    }
}

/**
 * STDIO Transport - communicates with child processes via stdin/stdout
 */
export class StdioTransport extends BaseTransport {
    constructor(config, options = {}) {
        super(options);
        
        this.config = config;
        this.process = null;
        this.buffer = '';
        this.isShuttingDown = false;
    }
    
    /**
     * Connects by spawning child process
     * @returns {Promise<void>}
     */
    async connect() {
        if (this.state === TransportState.CONNECTED || this.isConnecting) {
            return;
        }
        
        this.isConnecting = true;
        this.updateState(TransportState.CONNECTING);
        
        try {
            // Spawn the child process
            this.process = spawn(this.config.command, this.config.args || [], {
                stdio: ['pipe', 'pipe', 'pipe'],
                env: { ...process.env, ...this.config.env },
                cwd: this.config.cwd || process.cwd(),
                shell: false
            });
            
            // Setup process event handlers
            this.setupProcessHandlers();
            
            // Wait for process to start
            await this.waitForProcessStart();
            
            this.updateState(TransportState.CONNECTED);
            this.isConnecting = false;
            
            this.options.logger.log(`STDIO transport connected: ${this.config.command}`);
            
        } catch (error) {
            this.isConnecting = false;
            this.updateState(TransportState.ERROR);
            throw new Error(`Failed to start process: ${error.message}`);
        }
    }
    
    /**
     * Disconnects by terminating child process
     * @returns {Promise<void>}
     */
    async disconnect() {
        if (this.state === TransportState.DISCONNECTED) {
            return;
        }
        
        this.isShuttingDown = true;
        
        if (this.process) {
            this.process.kill('SIGTERM');
            
            // Force kill after timeout
            setTimeout(() => {
                if (this.process && !this.process.killed) {
                    this.process.kill('SIGKILL');
                }
            }, 5000);
        }
        
        this.updateState(TransportState.DISCONNECTED);
        
        this.options.logger.log('STDIO transport disconnected');
    }
    
    /**
     * Sends message via stdin
     * @param {Object} message - Message to send
     * @returns {Promise<void>}
     */
    async send(message) {
        if (this.state !== TransportState.CONNECTED || !this.process) {
            throw new Error('Transport not connected');
        }
        
        const messageStr = JSON.stringify(message);
        
        return new Promise((resolve, reject) => {
            this.process.stdin.write(messageStr + '\n', (error) => {
                if (error) {
                    reject(new Error(`Failed to send message: ${error.message}`));
                } else {
                    resolve();
                }
            });
        });
    }
    
    /**
     * Sets up child process event handlers
     * @private
     */
    setupProcessHandlers() {
        if (!this.process) return;
        
        // Handle stdout data
        this.process.stdout.on('data', (data) => {
            this.handleStdoutData(data.toString());
        });
        
        // Handle stderr
        this.process.stderr.on('data', (data) => {
            this.options.logger.warn(`Process stderr: ${data.toString()}`);
        });
        
        // Handle process exit
        this.process.on('exit', (code, signal) => {
            this.options.logger.log(`Process exited with code ${code}, signal ${signal}`);
            
            if (!this.isShuttingDown) {
                this.updateState(TransportState.DISCONNECTED);
                
                // Attempt reconnection if enabled
                if (this.options.reconnectAttempts > 0) {
                    this.attemptReconnect();
                }
            }
        });
        
        // Handle process errors
        this.process.on('error', (error) => {
            this.options.logger.error('Process error:', error);
            this.updateState(TransportState.ERROR);
            this.emit('error', error);
        });
    }
    
    /**
     * Handles stdout data and parses JSON messages
     * @param {string} data - Raw stdout data
     * @private
     */
    handleStdoutData(data) {
        this.buffer += data;
        
        // Process complete lines
        const lines = this.buffer.split('\n');
        this.buffer = lines.pop() || ''; // Keep incomplete line in buffer
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;
            
            try {
                const message = JSON.parse(trimmedLine);
                this.handleMessage(message);
            } catch (error) {
                this.options.logger.error(`Failed to parse JSON message: ${trimmedLine}`, error);
            }
        }
    }
    
    /**
     * Waits for process to start successfully
     * @returns {Promise<void>}
     * @private
     */
    async waitForProcessStart() {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Process start timeout'));
            }, this.options.timeout);
            
            const onExit = (code) => {
                clearTimeout(timeout);
                reject(new Error(`Process exited with code ${code}`));
            };
            
            const onError = (error) => {
                clearTimeout(timeout);
                this.process.removeListener('exit', onExit);
                reject(error);
            };
            
            // Wait for first stdout data to confirm process is ready
            const onData = () => {
                clearTimeout(timeout);
                this.process.removeListener('exit', onExit);
                this.process.removeListener('error', onError);
                resolve();
            };
            
            this.process.once('exit', onExit);
            this.process.once('error', onError);
            this.process.stdout.once('data', onData);
            
            // If process doesn't output anything, resolve after short delay
            setTimeout(() => {
                if (this.process && !this.process.killed) {
                    clearTimeout(timeout);
                    this.process.removeListener('exit', onExit);
                    this.process.removeListener('error', onError);
                    this.process.stdout.removeListener('data', onData);
                    resolve();
                }
            }, 1000);
        });
    }
}

/**
 * SSE Transport - communicates via Server-Sent Events
 */
export class SSETransport extends BaseTransport {
    constructor(config, options = {}) {
        super(options);
        
        this.config = config;
        this.eventSource = null;
        this.httpClient = null; // For sending requests
    }
    
    /**
     * Connects to SSE endpoint
     * @returns {Promise<void>}
     */
    async connect() {
        if (this.state === TransportState.CONNECTED || this.isConnecting) {
            return;
        }
        
        this.isConnecting = true;
        this.updateState(TransportState.CONNECTING);
        
        try {
            // Dynamic import to handle environments without EventSource
            const { EventSource } = await import('eventsource');
            
            // Create EventSource connection
            this.eventSource = new EventSource(this.config.url, {
                headers: this.config.headers || {}
            });
            
            // Setup event handlers
            this.setupEventSourceHandlers();
            
            // Wait for connection
            await this.waitForConnection();
            
            this.updateState(TransportState.CONNECTED);
            this.isConnecting = false;
            
            this.options.logger.log(`SSE transport connected: ${this.config.url}`);
            
        } catch (error) {
            this.isConnecting = false;
            this.updateState(TransportState.ERROR);
            throw new Error(`Failed to connect to SSE endpoint: ${error.message}`);
        }
    }
    
    /**
     * Disconnects from SSE endpoint
     * @returns {Promise<void>}
     */
    async disconnect() {
        if (this.state === TransportState.DISCONNECTED) {
            return;
        }
        
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
        
        this.updateState(TransportState.DISCONNECTED);
        
        this.options.logger.log('SSE transport disconnected');
    }
    
    /**
     * Sends message via HTTP POST
     * @param {Object} message - Message to send
     * @returns {Promise<void>}
     */
    async send(message) {
        if (this.state !== TransportState.CONNECTED) {
            throw new Error('Transport not connected');
        }
        
        try {
            // Use fetch if available, otherwise require http module
            if (typeof fetch !== 'undefined') {
                await this.sendWithFetch(message);
            } else {
                await this.sendWithHttp(message);
            }
        } catch (error) {
            throw new Error(`Failed to send message: ${error.message}`);
        }
    }
    
    /**
     * Sends message using fetch API
     * @param {Object} message - Message to send
     * @returns {Promise<void>}
     * @private
     */
    async sendWithFetch(message) {
        const response = await fetch(this.config.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.config.headers
            },
            body: JSON.stringify(message)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    }
    
    /**
     * Sends message using Node.js http module
     * @param {Object} message - Message to send
     * @returns {Promise<void>}
     * @private
     */
    async sendWithHttp(message) {
        const { default: https } = await import('https');
        const { default: http } = await import('http');
        const url = new URL(this.config.url);
        
        const client = url.protocol === 'https:' ? https : http;
        
        return new Promise((resolve, reject) => {
            const postData = JSON.stringify(message);
            
            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname + url.search,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                    ...this.config.headers
                }
            };
            
            const req = client.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve();
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.write(postData);
            req.end();
        });
    }
    
    /**
     * Sets up EventSource event handlers
     * @private
     */
    setupEventSourceHandlers() {
        if (!this.eventSource) return;
        
        this.eventSource.onopen = () => {
            this.options.logger.log('SSE connection opened');
        };
        
        this.eventSource.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                this.handleMessage(message);
            } catch (error) {
                this.options.logger.error('Failed to parse SSE message:', error);
            }
        };
        
        this.eventSource.onerror = (error) => {
            this.options.logger.error('SSE error:', error);
            
            if (this.eventSource.readyState === EventSource.CLOSED) {
                this.updateState(TransportState.DISCONNECTED);
                
                // Attempt reconnection if enabled
                if (this.options.reconnectAttempts > 0) {
                    this.attemptReconnect();
                }
            } else {
                this.updateState(TransportState.ERROR);
            }
            
            this.emit('error', error);
        };
    }
    
    /**
     * Waits for SSE connection to open
     * @returns {Promise<void>}
     * @private
     */
    async waitForConnection() {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('SSE connection timeout'));
            }, this.options.timeout);
            
            const onOpen = () => {
                clearTimeout(timeout);
                this.eventSource.removeEventListener('error', onError);
                resolve();
            };
            
            const onError = (error) => {
                clearTimeout(timeout);
                this.eventSource.removeEventListener('open', onOpen);
                reject(error);
            };
            
            this.eventSource.addEventListener('open', onOpen);
            this.eventSource.addEventListener('error', onError);
        });
    }
}

/**
 * HTTP Transport - communicates via direct HTTP requests
 */
export class HTTPTransport extends BaseTransport {
    constructor(config, options = {}) {
        super(options);
        
        this.config = config;
        this.isPolling = false;
        this.pollInterval = null;
    }
    
    /**
     * Connects by testing endpoint availability
     * @returns {Promise<void>}
     */
    async connect() {
        if (this.state === TransportState.CONNECTED || this.isConnecting) {
            return;
        }
        
        this.isConnecting = true;
        this.updateState(TransportState.CONNECTING);
        
        try {
            // Test connection with a simple request
            await this.testConnection();
            
            this.updateState(TransportState.CONNECTED);
            this.isConnecting = false;
            
            this.options.logger.log(`HTTP transport connected: ${this.config.url}`);
            
        } catch (error) {
            this.isConnecting = false;
            this.updateState(TransportState.ERROR);
            throw new Error(`Failed to connect to HTTP endpoint: ${error.message}`);
        }
    }
    
    /**
     * Disconnects by stopping any polling
     * @returns {Promise<void>}
     */
    async disconnect() {
        if (this.state === TransportState.DISCONNECTED) {
            return;
        }
        
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
            this.pollInterval = null;
        }
        
        this.isPolling = false;
        
        this.updateState(TransportState.DISCONNECTED);
        
        this.options.logger.log('HTTP transport disconnected');
    }
    
    /**
     * Sends message via HTTP POST
     * @param {Object} message - Message to send
     * @returns {Promise<Object>} Response message
     */
    async send(message) {
        if (this.state !== TransportState.CONNECTED) {
            throw new Error('Transport not connected');
        }
        
        try {
            const response = await this.sendHttpRequest(message);
            
            // HTTP transport expects immediate responses
            if (message.id !== undefined) {
                this.handleMessage(response);
            }
            
            return response;
            
        } catch (error) {
            throw new Error(`Failed to send HTTP message: ${error.message}`);
        }
    }
    
    /**
     * Sends HTTP request
     * @param {Object} message - Message to send
     * @returns {Promise<Object>} Response
     * @private
     */
    async sendHttpRequest(message) {
        if (typeof fetch !== 'undefined') {
            return await this.sendWithFetch(message);
        } else {
            return await this.sendWithHttp(message);
        }
    }
    
    /**
     * Sends message using fetch API
     * @param {Object} message - Message to send
     * @returns {Promise<Object>} Response
     * @private
     */
    async sendWithFetch(message) {
        const response = await fetch(this.config.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.config.headers
            },
            body: JSON.stringify(message)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    }
    
    /**
     * Sends message using Node.js http module
     * @param {Object} message - Message to send
     * @returns {Promise<Object>} Response
     * @private
     */
    async sendWithHttp(message) {
        const { default: https } = await import('https');
        const { default: http } = await import('http');
        const url = new URL(this.config.url);
        
        const client = url.protocol === 'https:' ? https : http;
        
        return new Promise((resolve, reject) => {
            const postData = JSON.stringify(message);
            
            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname + url.search,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                    ...this.config.headers
                }
            };
            
            const req = client.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            const response = JSON.parse(data);
                            resolve(response);
                        } catch (error) {
                            reject(new Error(`Invalid JSON response: ${error.message}`));
                        }
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                    }
                });
            });
            
            req.on('error', (error) => {
                reject(error);
            });
            
            req.write(postData);
            req.end();
        });
    }
    
    /**
     * Tests connection to endpoint
     * @returns {Promise<void>}
     * @private
     */
    async testConnection() {
        // Send a simple ping message to test connectivity
        const pingMessage = {
            jsonrpc: '2.0',
            method: 'ping',
            id: 'connection_test'
        };
        
        await this.sendHttpRequest(pingMessage);
    }
}

/**
 * Transport Factory - creates transport instances
 */
export class TransportFactory {
    constructor(options = {}) {
        this.options = {
            logger: console,
            ...options
        };
    }
    
    /**
     * Creates a transport instance based on type
     * @param {string} type - Transport type
     * @param {Object} config - Transport configuration
     * @param {Object} options - Transport options
     * @returns {BaseTransport} Transport instance
     */
    createTransport(type, config, options = {}) {
        const transportOptions = {
            ...this.options,
            ...options
        };
        
        switch (type) {
            case TransportType.STDIO:
                return new StdioTransport(config, transportOptions);
                
            case TransportType.SSE:
                if (!config.url) {
                    throw new Error('SSE transport requires URL configuration');
                }
                return new SSETransport(config, transportOptions);
                
            case TransportType.HTTP:
                if (!config.url) {
                    throw new Error('HTTP transport requires URL configuration');
                }
                return new HTTPTransport(config, transportOptions);
                
            default:
                throw new Error(`Unknown transport type: ${type}`);
        }
    }
    
    /**
     * Gets supported transport types
     * @returns {Array} Supported transport types
     */
    getSupportedTypes() {
        return Object.values(TransportType);
    }
}

export default TransportFactory;