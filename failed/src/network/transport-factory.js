/**
 * Transport Factory Module
 * 
 * Provides a factory pattern for creating different types of network transports
 * with automatic selection based on environment and requirements.
 */

const { HttpClient } = require('./http-client');
const { WebSocketManager } = require('./websocket-manager');
const EventEmitter = require('events');

/**
 * Transport Types
 */
const TransportType = {
    HTTP: 'http',
    WEBSOCKET: 'websocket',
    FETCH: 'fetch',
    XHR: 'xhr',
    NODE_HTTP: 'node_http',
    NODE_HTTPS: 'node_https'
};

/**
 * Transport Protocols
 */
const TransportProtocol = {
    HTTP: 'http:',
    HTTPS: 'https:',
    WS: 'ws:',
    WSS: 'wss:'
};

/**
 * Base Transport Interface
 * All transport implementations should extend this class
 */
class BaseTransport extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = options;
        this.type = 'base';
        this.isConnected = false;
        this.stats = {
            requests: 0,
            successes: 0,
            failures: 0,
            bytesTransferred: 0
        };
    }

    /**
     * Initialize the transport
     * @returns {Promise} Promise resolving when transport is ready
     */
    async initialize() {
        throw new Error('initialize() must be implemented by transport');
    }

    /**
     * Send data using the transport
     * @param {*} data - Data to send
     * @param {Object} options - Send options
     * @returns {Promise} Promise resolving to response
     */
    async send(data, options = {}) {
        throw new Error('send() must be implemented by transport');
    }

    /**
     * Close the transport connection
     * @returns {Promise} Promise resolving when closed
     */
    async close() {
        throw new Error('close() must be implemented by transport');
    }

    /**
     * Get transport statistics
     * @returns {Object} Transport statistics
     */
    getStats() {
        return { ...this.stats, type: this.type, isConnected: this.isConnected };
    }

    /**
     * Reset transport statistics
     */
    resetStats() {
        this.stats = {
            requests: 0,
            successes: 0,
            failures: 0,
            bytesTransferred: 0
        };
    }
}

/**
 * HTTP Transport Implementation
 */
class HttpTransport extends BaseTransport {
    constructor(options = {}) {
        super(options);
        this.type = TransportType.HTTP;
        this.client = new HttpClient(options);
        
        // Forward events from HTTP client
        this.client.on('requestStart', (data) => this.emit('requestStart', data));
        this.client.on('requestEnd', (data) => this.emit('requestEnd', data));
    }

    async initialize() {
        // HTTP client is ready immediately
        this.isConnected = true;
        this.emit('ready');
        return Promise.resolve();
    }

    async send(data, options = {}) {
        try {
            this.stats.requests++;
            
            const url = options.url || this.options.url;
            if (!url) {
                throw new Error('URL is required for HTTP transport');
            }

            const method = options.method || 'POST';
            const result = await this.client.request(url, {
                method,
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    ...this.options.headers,
                    ...options.headers
                },
                ...options
            });

            this.stats.successes++;
            this.stats.bytesTransferred += this._estimateDataSize(data);
            
            this.emit('sendSuccess', { data, result });
            return result;

        } catch (error) {
            this.stats.failures++;
            this.emit('sendError', { data, error });
            throw error;
        }
    }

    async close() {
        this.isConnected = false;
        this.emit('closed');
        return Promise.resolve();
    }

    _estimateDataSize(data) {
        if (typeof data === 'string') return data.length;
        if (data instanceof ArrayBuffer) return data.byteLength;
        if (data instanceof Uint8Array) return data.length;
        try {
            return JSON.stringify(data).length;
        } catch {
            return 0;
        }
    }
}

/**
 * WebSocket Transport Implementation
 */
class WebSocketTransport extends BaseTransport {
    constructor(options = {}) {
        super(options);
        this.type = TransportType.WEBSOCKET;
        this.manager = new WebSocketManager(options);
        this.connectionId = options.connectionId || 'default';
        
        // Forward events from WebSocket manager
        this.manager.on('connected', (data) => {
            if (data.id === this.connectionId) {
                this.isConnected = true;
                this.emit('connected', data);
            }
        });
        
        this.manager.on('disconnected', (data) => {
            if (data.id === this.connectionId) {
                this.isConnected = false;
                this.emit('disconnected', data);
            }
        });
        
        this.manager.on('message', (data) => {
            if (data.id === this.connectionId) {
                this.emit('message', data);
            }
        });
        
        this.manager.on('error', (data) => {
            if (data.id === this.connectionId) {
                this.emit('error', data);
            }
        });
    }

    async initialize() {
        const url = this.options.url;
        if (!url) {
            throw new Error('URL is required for WebSocket transport');
        }

        await this.manager.connect(this.connectionId, url, this.options);
        this.emit('ready');
    }

    async send(data, options = {}) {
        try {
            this.stats.requests++;
            
            const success = this.manager.send(this.connectionId, data);
            
            if (success) {
                this.stats.successes++;
                this.stats.bytesTransferred += this._estimateDataSize(data);
                this.emit('sendSuccess', { data });
                return { success: true };
            } else {
                throw new Error('Failed to send message');
            }

        } catch (error) {
            this.stats.failures++;
            this.emit('sendError', { data, error });
            throw error;
        }
    }

    async close() {
        this.manager.disconnect(this.connectionId);
        this.isConnected = false;
        this.emit('closed');
    }

    _estimateDataSize(data) {
        if (typeof data === 'string') return data.length;
        try {
            return JSON.stringify(data).length;
        } catch {
            return 0;
        }
    }
}

/**
 * Node.js HTTP/HTTPS Transport Implementation
 */
class NodeHttpTransport extends BaseTransport {
    constructor(options = {}) {
        super(options);
        this.type = options.secure ? TransportType.NODE_HTTPS : TransportType.NODE_HTTP;
        this.httpModule = null;
        this.agent = null;
    }

    async initialize() {
        try {
            // Dynamically import http/https modules
            if (this.options.secure || this.options.url?.startsWith('https:')) {
                this.httpModule = require('https');
                this.type = TransportType.NODE_HTTPS;
            } else {
                this.httpModule = require('http');
                this.type = TransportType.NODE_HTTP;
            }

            // Create agent for connection pooling
            this.agent = new this.httpModule.Agent({
                keepAlive: this.options.keepAlive !== false,
                maxSockets: this.options.maxSockets || 30,
                timeout: this.options.timeout || 30000
            });

            this.isConnected = true;
            this.emit('ready');

        } catch (error) {
            this.emit('error', { error, type: 'initialization' });
            throw error;
        }
    }

    async send(data, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                this.stats.requests++;
                
                const url = new URL(options.url || this.options.url);
                const serializedData = typeof data === 'string' ? data : JSON.stringify(data);
                
                const requestOptions = {
                    hostname: url.hostname,
                    port: url.port || (url.protocol === 'https:' ? 443 : 80),
                    path: url.pathname + url.search,
                    method: options.method || 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(serializedData),
                        'User-Agent': 'ClaudeCode-NodeTransport/1.0',
                        ...this.options.headers,
                        ...options.headers
                    },
                    agent: this.agent,
                    timeout: options.timeout || this.options.timeout
                };

                const req = this.httpModule.request(requestOptions, (res) => {
                    let responseData = '';
                    
                    res.on('data', (chunk) => {
                        responseData += chunk;
                    });
                    
                    res.on('end', () => {
                        try {
                            this.stats.successes++;
                            this.stats.bytesTransferred += serializedData.length;
                            
                            const result = {
                                status: res.statusCode,
                                statusText: res.statusMessage,
                                headers: res.headers,
                                data: this._parseResponseData(responseData, res.headers['content-type'])
                            };
                            
                            this.emit('sendSuccess', { data, result });
                            resolve(result);
                            
                        } catch (parseError) {
                            this.stats.failures++;
                            this.emit('sendError', { data, error: parseError });
                            reject(parseError);
                        }
                    });
                });

                req.on('error', (error) => {
                    this.stats.failures++;
                    this.emit('sendError', { data, error });
                    reject(error);
                });

                req.on('timeout', () => {
                    const error = new Error('Request timeout');
                    this.stats.failures++;
                    this.emit('sendError', { data, error });
                    req.destroy();
                    reject(error);
                });

                // Send data
                req.write(serializedData);
                req.end();

            } catch (error) {
                this.stats.failures++;
                this.emit('sendError', { data, error });
                reject(error);
            }
        });
    }

    async close() {
        if (this.agent) {
            this.agent.destroy();
        }
        this.isConnected = false;
        this.emit('closed');
    }

    _parseResponseData(data, contentType) {
        if (!data) return null;
        
        if (contentType && contentType.includes('application/json')) {
            try {
                return JSON.parse(data);
            } catch (error) {
                return data;
            }
        }
        
        return data;
    }
}

/**
 * Transport Factory Class
 * Creates appropriate transport instances based on configuration
 */
class TransportFactory {
    constructor() {
        this.transportTypes = new Map([
            [TransportType.HTTP, HttpTransport],
            [TransportType.WEBSOCKET, WebSocketTransport],
            [TransportType.FETCH, HttpTransport], // Alias for HTTP with fetch preference
            [TransportType.XHR, HttpTransport],   // Alias for HTTP with XHR preference
            [TransportType.NODE_HTTP, NodeHttpTransport],
            [TransportType.NODE_HTTPS, NodeHttpTransport]
        ]);
        
        this.environments = this._detectEnvironments();
    }

    /**
     * Creates a transport instance
     * @param {Object} options - Transport configuration
     * @returns {BaseTransport} Transport instance
     */
    create(options = {}) {
        const type = this._determineTransportType(options);
        const TransportClass = this.transportTypes.get(type);
        
        if (!TransportClass) {
            throw new Error(`Unsupported transport type: ${type}`);
        }

        const transportOptions = this._prepareTransportOptions(type, options);
        return new TransportClass(transportOptions);
    }

    /**
     * Creates multiple transports with failover support
     * @param {Array} configurations - Array of transport configurations
     * @returns {FailoverTransport} Failover transport instance
     */
    createFailover(configurations = []) {
        const transports = configurations.map(config => this.create(config));
        return new FailoverTransport({ transports });
    }

    /**
     * Determines the best transport type based on options and environment
     * @param {Object} options - Transport options
     * @returns {string} Transport type
     */
    _determineTransportType(options) {
        // Explicit type specification
        if (options.type && this.transportTypes.has(options.type)) {
            return options.type;
        }

        // URL-based detection
        if (options.url) {
            const url = new URL(options.url);
            
            if (url.protocol === 'ws:' || url.protocol === 'wss:') {
                return TransportType.WEBSOCKET;
            }
            
            if (url.protocol === 'http:' || url.protocol === 'https:') {
                // Choose based on environment
                if (this.environments.isNode) {
                    return url.protocol === 'https:' 
                        ? TransportType.NODE_HTTPS 
                        : TransportType.NODE_HTTP;
                } else {
                    return TransportType.HTTP;
                }
            }
        }

        // Environment-based defaults
        if (this.environments.isNode) {
            return TransportType.NODE_HTTP;
        } else if (this.environments.isBrowser) {
            return TransportType.HTTP;
        }

        // Fallback
        return TransportType.HTTP;
    }

    /**
     * Prepares transport-specific options
     * @param {string} type - Transport type
     * @param {Object} options - Original options
     * @returns {Object} Prepared options
     */
    _prepareTransportOptions(type, options) {
        const baseOptions = { ...options };

        switch (type) {
            case TransportType.HTTP:
            case TransportType.FETCH:
                if (options.preferFetch !== false && this.environments.supportsFetch) {
                    baseOptions.preferFetch = true;
                }
                break;

            case TransportType.XHR:
                baseOptions.preferXHR = true;
                break;

            case TransportType.NODE_HTTPS:
                baseOptions.secure = true;
                break;

            case TransportType.WEBSOCKET:
                if (!baseOptions.connectionId) {
                    baseOptions.connectionId = this._generateConnectionId();
                }
                break;
        }

        return baseOptions;
    }

    /**
     * Detects environment capabilities
     * @returns {Object} Environment detection results
     */
    _detectEnvironments() {
        const isNode = typeof process !== 'undefined' && 
                      process.versions && 
                      process.versions.node;
        
        const isBrowser = typeof window !== 'undefined' && 
                         typeof document !== 'undefined';
        
        const isWebWorker = typeof self !== 'undefined' && 
                           typeof importScripts !== 'undefined';
        
        const supportsFetch = typeof fetch !== 'undefined';
        const supportsWebSocket = typeof WebSocket !== 'undefined';
        const supportsXHR = typeof XMLHttpRequest !== 'undefined';

        return {
            isNode,
            isBrowser,
            isWebWorker,
            supportsFetch,
            supportsWebSocket,
            supportsXHR
        };
    }

    /**
     * Generates a unique connection ID
     * @returns {string} Unique connection ID
     */
    _generateConnectionId() {
        return `conn_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }

    /**
     * Registers a custom transport type
     * @param {string} type - Transport type name
     * @param {class} transportClass - Transport class
     */
    registerTransport(type, transportClass) {
        this.transportTypes.set(type, transportClass);
    }

    /**
     * Gets available transport types
     * @returns {Array} Array of available transport types
     */
    getAvailableTypes() {
        return Array.from(this.transportTypes.keys());
    }

    /**
     * Gets environment information
     * @returns {Object} Environment information
     */
    getEnvironmentInfo() {
        return { ...this.environments };
    }
}

/**
 * Failover Transport Implementation
 * Attempts to use transports in order until one succeeds
 */
class FailoverTransport extends BaseTransport {
    constructor(options = {}) {
        super(options);
        this.type = 'failover';
        this.transports = options.transports || [];
        this.activeTransportIndex = 0;
        this.maxRetries = options.maxRetries || 3;
        
        // Forward events from active transport
        this._setupEventForwarding();
    }

    async initialize() {
        if (this.transports.length === 0) {
            throw new Error('No transports configured for failover');
        }

        // Try to initialize transports in order
        for (let i = 0; i < this.transports.length; i++) {
            try {
                await this.transports[i].initialize();
                this.activeTransportIndex = i;
                this.isConnected = true;
                this.emit('ready');
                this.emit('transportSelected', { 
                    index: i, 
                    type: this.transports[i].type 
                });
                return;
            } catch (error) {
                this.emit('transportFailed', { 
                    index: i, 
                    type: this.transports[i].type, 
                    error 
                });
                
                if (i === this.transports.length - 1) {
                    throw new Error('All transports failed to initialize');
                }
            }
        }
    }

    async send(data, options = {}) {
        let lastError;
        
        for (let attempt = 0; attempt < this.maxRetries; attempt++) {
            for (let i = this.activeTransportIndex; i < this.transports.length; i++) {
                try {
                    this.stats.requests++;
                    const result = await this.transports[i].send(data, options);
                    
                    this.stats.successes++;
                    this.activeTransportIndex = i;
                    this.emit('sendSuccess', { data, result, transportIndex: i });
                    
                    return result;
                    
                } catch (error) {
                    lastError = error;
                    this.stats.failures++;
                    
                    this.emit('transportError', { 
                        transportIndex: i, 
                        error, 
                        attempt: attempt + 1 
                    });
                    
                    // Try next transport
                    continue;
                }
            }
            
            // Reset to first transport for next attempt
            this.activeTransportIndex = 0;
        }
        
        this.emit('sendError', { data, error: lastError });
        throw lastError || new Error('All transports failed');
    }

    async close() {
        await Promise.allSettled(
            this.transports.map(transport => transport.close())
        );
        
        this.isConnected = false;
        this.emit('closed');
    }

    _setupEventForwarding() {
        this.transports.forEach((transport, index) => {
            transport.on('error', (data) => {
                this.emit('transportError', { ...data, transportIndex: index });
            });
            
            transport.on('connected', (data) => {
                if (index === this.activeTransportIndex) {
                    this.emit('connected', data);
                }
            });
            
            transport.on('disconnected', (data) => {
                if (index === this.activeTransportIndex) {
                    this.emit('disconnected', data);
                }
            });
        });
    }

    getStats() {
        const baseStats = super.getStats();
        const transportStats = this.transports.map(transport => transport.getStats());
        
        return {
            ...baseStats,
            activeTransportIndex: this.activeTransportIndex,
            transportCount: this.transports.length,
            transportStats
        };
    }
}

// Create singleton factory instance
const transportFactory = new TransportFactory();

module.exports = {
    TransportFactory,
    BaseTransport,
    HttpTransport,
    WebSocketTransport,
    NodeHttpTransport,
    FailoverTransport,
    TransportType,
    TransportProtocol,
    
    // Singleton factory instance
    factory: transportFactory,
    
    // Convenience functions
    create: (options) => transportFactory.create(options),
    createFailover: (configurations) => transportFactory.createFailover(configurations)
};