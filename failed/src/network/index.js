/**
 * Network Transport Module - Main Entry Point
 * 
 * Provides a unified interface for all network transport functionality
 * extracted and deobfuscated from the CLI.js file.
 */

const { HttpClient, HttpError, HttpUtils } = require('./http-client');
const { WebSocketManager, WebSocketError, WebSocketUtils, ConnectionState } = require('./websocket-manager');
const { 
    TransportFactory, 
    BaseTransport, 
    HttpTransport, 
    WebSocketTransport, 
    NodeHttpTransport, 
    FailoverTransport,
    TransportType,
    TransportProtocol,
    factory: transportFactory,
    create: createTransport,
    createFailover: createFailoverTransport
} = require('./transport-factory');
const { ConnectionPoolManager, PoolStrategy } = require('./connection-pool');
const {
    RequestInterceptorManager,
    BaseInterceptor,
    AuthenticationInterceptor,
    LoggingInterceptor,
    CacheInterceptor,
    RateLimitInterceptor,
    RetryInterceptor,
    InterceptorType,
    InterceptorPhase
} = require('./request-interceptors');

/**
 * Network Transport Manager
 * Main orchestrator for all network operations
 */
class NetworkTransportManager {
    constructor(options = {}) {
        this.options = {
            enablePooling: options.enablePooling !== false,
            enableInterceptors: options.enableInterceptors !== false,
            defaultTransportType: options.defaultTransportType || TransportType.HTTP,
            poolConfig: options.poolConfig || {},
            interceptorConfig: options.interceptorConfig || {},
            ...options
        };

        // Initialize components
        this.transportFactory = new TransportFactory();
        this.poolManager = this.options.enablePooling 
            ? new ConnectionPoolManager(this.options.poolConfig)
            : null;
        this.interceptorManager = this.options.enableInterceptors
            ? new RequestInterceptorManager(this.options.interceptorConfig)
            : null;

        // Default clients
        this.httpClient = new HttpClient(options.httpOptions);
        this.wsManager = new WebSocketManager(options.websocketOptions);

        this.stats = {
            requestsSent: 0,
            requestsSuccessful: 0,
            requestsFailed: 0,
            bytesSent: 0,
            bytesReceived: 0,
            avgResponseTime: 0
        };
    }

    /**
     * Sends a request using the best available transport
     * @param {Object} options - Request options
     * @returns {Promise} Promise resolving to response
     */
    async request(options) {
        const startTime = Date.now();
        this.stats.requestsSent++;

        try {
            let context = {
                ...options,
                timestamp: startTime,
                requestId: this._generateRequestId()
            };

            // Process through interceptors if enabled
            if (this.interceptorManager) {
                context = await this.interceptorManager.processRequest(context);
                
                // Check if response was cached
                if (context.response) {
                    return this._processResponse(context, startTime);
                }
            }

            // Use connection pool if enabled
            if (this.poolManager && context.poolId) {
                return await this._requestWithPool(context, startTime);
            } else {
                return await this._requestDirect(context, startTime);
            }

        } catch (error) {
            this.stats.requestsFailed++;
            
            // Process error through interceptors if enabled
            if (this.interceptorManager) {
                const errorContext = await this.interceptorManager.processError(error, {
                    ...options,
                    timestamp: startTime
                });
                
                if (errorContext.shouldRetry) {
                    return this.request(options);
                }
            }
            
            throw error;
        }
    }

    /**
     * Sends request using connection pool
     * @param {Object} context - Request context
     * @param {number} startTime - Start time
     * @returns {Promise} Promise resolving to response
     */
    async _requestWithPool(context, startTime) {
        const connection = await this.poolManager.acquireConnection(
            context.poolId,
            { transportOptions: context.transportOptions }
        );

        try {
            const response = await connection.transport.send(context.body || context.data, {
                url: context.url,
                method: context.method,
                headers: context.headers,
                ...context.transportOptions
            });

            const responseTime = Date.now() - startTime;
            this.poolManager.releaseConnection(connection.id, {
                success: true,
                responseTime
            });

            return this._processResponse({ ...context, response }, startTime);

        } catch (error) {
            const responseTime = Date.now() - startTime;
            this.poolManager.releaseConnection(connection.id, {
                success: false,
                responseTime,
                error
            });
            
            throw error;
        }
    }

    /**
     * Sends request directly without pooling
     * @param {Object} context - Request context
     * @param {number} startTime - Start time
     * @returns {Promise} Promise resolving to response
     */
    async _requestDirect(context, startTime) {
        const transport = this.transportFactory.create({
            type: context.transportType || this.options.defaultTransportType,
            url: context.url,
            ...context.transportOptions
        });

        await transport.initialize();

        try {
            const response = await transport.send(context.body || context.data, {
                url: context.url,
                method: context.method,
                headers: context.headers,
                ...context.transportOptions
            });

            return this._processResponse({ ...context, response }, startTime);

        } finally {
            await transport.close();
        }
    }

    /**
     * Processes response and updates statistics
     * @param {Object} context - Response context
     * @param {number} startTime - Start time
     * @returns {Promise} Promise resolving to processed response
     */
    async _processResponse(context, startTime) {
        const responseTime = Date.now() - startTime;
        
        // Update statistics
        this.stats.requestsSuccessful++;
        this.stats.avgResponseTime = (
            (this.stats.avgResponseTime * (this.stats.requestsSuccessful - 1) + responseTime) / 
            this.stats.requestsSuccessful
        );

        if (context.body) {
            this.stats.bytesSent += this._estimateSize(context.body);
        }
        if (context.response?.data) {
            this.stats.bytesReceived += this._estimateSize(context.response.data);
        }

        // Process through response interceptors if enabled
        if (this.interceptorManager) {
            context = await this.interceptorManager.processResponse(context);
        }

        return context.response;
    }

    /**
     * Creates a WebSocket connection
     * @param {string} id - Connection ID
     * @param {string} url - WebSocket URL
     * @param {Object} options - Connection options
     * @returns {Promise} Promise resolving when connected
     */
    async connectWebSocket(id, url, options = {}) {
        return this.wsManager.connect(id, url, options);
    }

    /**
     * Sends a WebSocket message
     * @param {string} id - Connection ID
     * @param {*} message - Message to send
     * @returns {boolean} True if sent successfully
     */
    sendWebSocketMessage(id, message) {
        return this.wsManager.send(id, message);
    }

    /**
     * Disconnects a WebSocket connection
     * @param {string} id - Connection ID
     * @param {number} code - Close code
     * @param {string} reason - Close reason
     */
    disconnectWebSocket(id, code, reason) {
        this.wsManager.disconnect(id, code, reason);
    }

    /**
     * Creates a connection pool
     * @param {string} poolId - Pool ID
     * @param {Object} config - Pool configuration
     * @returns {Object} Pool configuration
     */
    createConnectionPool(poolId, config) {
        if (!this.poolManager) {
            throw new Error('Connection pooling is not enabled');
        }
        return this.poolManager.createPool(poolId, config);
    }

    /**
     * Registers a request interceptor
     * @param {string} type - Interceptor type
     * @param {BaseInterceptor} interceptor - Interceptor instance
     * @returns {string} Interceptor ID
     */
    registerInterceptor(type, interceptor) {
        if (!this.interceptorManager) {
            throw new Error('Interceptors are not enabled');
        }
        return this.interceptorManager.register(type, interceptor);
    }

    /**
     * Estimates size of data
     * @param {*} data - Data to estimate
     * @returns {number} Estimated size in bytes
     */
    _estimateSize(data) {
        if (typeof data === 'string') return data.length;
        if (data instanceof ArrayBuffer) return data.byteLength;
        if (data instanceof Uint8Array) return data.length;
        try {
            return JSON.stringify(data).length;
        } catch {
            return 0;
        }
    }

    /**
     * Generates unique request ID
     * @returns {string} Unique request ID
     */
    _generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }

    /**
     * Gets comprehensive statistics
     * @returns {Object} Statistics from all components
     */
    getStats() {
        const stats = {
            manager: this.stats,
            httpClient: this.httpClient.getStats(),
            webSocketManager: this.wsManager.getStats()
        };

        if (this.poolManager) {
            stats.connectionPool = this.poolManager.getStats();
        }

        if (this.interceptorManager) {
            stats.interceptors = this.interceptorManager.getStats();
        }

        return stats;
    }

    /**
     * Shuts down all network components
     * @returns {Promise} Promise resolving when shutdown is complete
     */
    async shutdown() {
        const promises = [];

        if (this.wsManager) {
            promises.push(new Promise(resolve => {
                this.wsManager.disconnectAll();
                resolve();
            }));
        }

        if (this.poolManager) {
            promises.push(this.poolManager.shutdown());
        }

        await Promise.allSettled(promises);
    }
}

// Export everything for comprehensive access
module.exports = {
    // Main manager
    NetworkTransportManager,

    // HTTP components
    HttpClient,
    HttpError,
    HttpUtils,

    // WebSocket components
    WebSocketManager,
    WebSocketError,
    WebSocketUtils,
    ConnectionState,

    // Transport components
    TransportFactory,
    BaseTransport,
    HttpTransport,
    WebSocketTransport,
    NodeHttpTransport,
    FailoverTransport,
    TransportType,
    TransportProtocol,
    transportFactory,
    createTransport,
    createFailoverTransport,

    // Connection pool components
    ConnectionPoolManager,
    PoolStrategy,

    // Interceptor components
    RequestInterceptorManager,
    BaseInterceptor,
    AuthenticationInterceptor,
    LoggingInterceptor,
    CacheInterceptor,
    RateLimitInterceptor,
    RetryInterceptor,
    InterceptorType,
    InterceptorPhase,

    // Convenience functions
    createNetworkManager: (options) => new NetworkTransportManager(options),
    createHttpClient: (options) => new HttpClient(options),
    createWebSocketManager: (options) => new WebSocketManager(options)
};