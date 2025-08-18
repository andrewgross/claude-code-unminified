# Network & Transport Specification

## Overview
Claude Code implements a comprehensive network and transport layer supporting HTTP/HTTPS, WebSockets, and various transport abstractions for MCP servers and external services. The system provides secure, efficient, and reliable network communication with comprehensive error handling and monitoring.

## Architecture

### Core Components
- **HTTP Client**: Full-featured HTTP/HTTPS client with authentication
- **WebSocket Manager**: Real-time bidirectional communication
- **Transport Abstraction**: Protocol-agnostic communication layer
- **Connection Pool**: Efficient connection management and reuse
- **Security Layer**: TLS/SSL, authentication, and validation
- **Monitoring System**: Network performance and health monitoring

### Transport Protocols
- **HTTP/HTTPS**: RESTful API communication
- **WebSocket**: Real-time bidirectional messaging
- **Server-Sent Events (SSE)**: Server-to-client streaming
- **STDIO**: Process-based communication
- **Custom Protocols**: Extensible transport system

## HTTP Client

### Core HTTP Operations
```javascript
class HTTPClient {
    constructor(options = {}) {
        this.baseURL = options.baseURL;
        this.timeout = options.timeout || 30000;
        this.retries = options.retries || 3;
        this.auth = options.auth;
        this.headers = options.headers || {};
        this.interceptors = {
            request: [],
            response: []
        };
    }
    
    async request(config) {
        // Make HTTP request with full configuration
        // Apply interceptors and middleware
        // Handle retries and timeouts
        // Process response
        
        const requestConfig = this.buildRequestConfig(config);
        
        // Apply request interceptors
        for (const interceptor of this.interceptors.request) {
            requestConfig = await interceptor(requestConfig);
        }
        
        let lastError;
        for (let attempt = 0; attempt <= this.retries; attempt++) {
            try {
                const response = await this.executeRequest(requestConfig);
                
                // Apply response interceptors
                let processedResponse = response;
                for (const interceptor of this.interceptors.response) {
                    processedResponse = await interceptor(processedResponse);
                }
                
                return processedResponse;
            } catch (error) {
                lastError = error;
                
                if (!this.shouldRetry(error, attempt)) {
                    throw error;
                }
                
                await this.delayBeforeRetry(attempt);
            }
        }
        
        throw lastError;
    }
    
    async get(url, config = {}) {
        return this.request({ ...config, method: 'GET', url });
    }
    
    async post(url, data, config = {}) {
        return this.request({ ...config, method: 'POST', url, data });
    }
    
    async put(url, data, config = {}) {
        return this.request({ ...config, method: 'PUT', url, data });
    }
    
    async delete(url, config = {}) {
        return this.request({ ...config, method: 'DELETE', url });
    }
    
    async patch(url, data, config = {}) {
        return this.request({ ...config, method: 'PATCH', url, data });
    }
}
```

### Authentication Support
```javascript
class AuthenticationManager {
    addBearerAuth(token) {
        // Add Bearer token authentication
        // Handle token refresh
        // Manage token expiration
        
        this.authType = 'bearer';
        this.token = token;
        
        return (config) => {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${this.token}`;
            return config;
        };
    }
    
    addBasicAuth(username, password) {
        // Add HTTP Basic authentication
        // Encode credentials properly
        // Handle authentication failures
        
        this.authType = 'basic';
        const credentials = Buffer.from(`${username}:${password}`).toString('base64');
        
        return (config) => {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Basic ${credentials}`;
            return config;
        };
    }
    
    addAPIKeyAuth(apiKey, location = 'header', name = 'X-API-Key') {
        // Add API key authentication
        // Support header or query parameter
        // Handle different naming conventions
        
        this.authType = 'apikey';
        this.apiKey = apiKey;
        this.location = location;
        this.name = name;
        
        return (config) => {
            if (location === 'header') {
                config.headers = config.headers || {};
                config.headers[name] = apiKey;
            } else if (location === 'query') {
                config.params = config.params || {};
                config.params[name] = apiKey;
            }
            return config;
        };
    }
    
    async refreshToken() {
        // Refresh expired authentication tokens
        // Handle refresh token flow
        // Update authentication state
        
        if (this.authType !== 'bearer' || !this.refreshToken) {
            throw new Error('Token refresh not supported for this auth type');
        }
        
        const response = await this.httpClient.post('/auth/refresh', {
            refresh_token: this.refreshToken
        });
        
        this.token = response.data.access_token;
        this.refreshToken = response.data.refresh_token || this.refreshToken;
        this.expiresAt = Date.now() + (response.data.expires_in * 1000);
        
        return this.token;
    }
}
```

### Request/Response Interceptors
```javascript
class InterceptorManager {
    addRequestInterceptor(fulfilled, rejected) {
        // Add request interceptor
        // Transform requests before sending
        // Handle request errors
        
        const interceptor = {
            id: this.generateInterceptorId(),
            fulfilled: fulfilled,
            rejected: rejected
        };
        
        this.requestInterceptors.push(interceptor);
        return interceptor.id;
    }
    
    addResponseInterceptor(fulfilled, rejected) {
        // Add response interceptor
        // Transform responses after receiving
        // Handle response errors
        
        const interceptor = {
            id: this.generateInterceptorId(),
            fulfilled: fulfilled,
            rejected: rejected
        };
        
        this.responseInterceptors.push(interceptor);
        return interceptor.id;
    }
    
    createAuthRefreshInterceptor() {
        // Create interceptor for automatic token refresh
        // Handle 401 responses
        // Retry requests after refresh
        
        return this.addResponseInterceptor(
            (response) => response, // Pass through successful responses
            async (error) => {
                const originalRequest = error.config;
                
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    
                    try {
                        await this.authManager.refreshToken();
                        
                        // Update request with new token
                        originalRequest.headers['Authorization'] = 
                            `Bearer ${this.authManager.token}`;
                        
                        // Retry original request
                        return this.httpClient.request(originalRequest);
                    } catch (refreshError) {
                        // Refresh failed, redirect to login
                        this.authManager.logout();
                        throw refreshError;
                    }
                }
                
                throw error;
            }
        );
    }
}
```

## WebSocket Management

### WebSocket Client
```javascript
class WebSocketManager {
    constructor(options = {}) {
        this.connections = new Map();
        this.reconnectDelay = options.reconnectDelay || 1000;
        this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
        this.heartbeatInterval = options.heartbeatInterval || 30000;
    }
    
    connect(url, protocols = [], options = {}) {
        // Establish WebSocket connection
        // Handle connection lifecycle
        // Set up event handlers
        // Implement reconnection logic
        
        const connectionId = this.generateConnectionId();
        const connection = new WebSocketConnection(url, protocols, {
            ...options,
            connectionId: connectionId,
            manager: this
        });
        
        this.connections.set(connectionId, connection);
        
        connection.on('open', () => {
            this.setupHeartbeat(connection);
            this.emit('connection:open', { connectionId, url });
        });
        
        connection.on('close', (event) => {
            this.handleConnectionClose(connectionId, event);
        });
        
        connection.on('error', (error) => {
            this.handleConnectionError(connectionId, error);
        });
        
        connection.on('message', (data) => {
            this.handleMessage(connectionId, data);
        });
        
        return connection;
    }
    
    setupHeartbeat(connection) {
        // Set up heartbeat/ping mechanism
        // Detect connection failures
        // Maintain connection health
        
        const heartbeat = setInterval(() => {
            if (connection.readyState === WebSocket.OPEN) {
                connection.ping();
            } else {
                clearInterval(heartbeat);
            }
        }, this.heartbeatInterval);
        
        connection.heartbeatInterval = heartbeat;
        
        connection.on('pong', () => {
            connection.lastPong = Date.now();
        });
    }
    
    handleConnectionClose(connectionId, event) {
        // Handle WebSocket connection closure
        // Determine if reconnection is needed
        // Clean up resources
        
        const connection = this.connections.get(connectionId);
        if (!connection) return;
        
        clearInterval(connection.heartbeatInterval);
        
        if (connection.shouldReconnect && !connection.manualClose) {
            this.scheduleReconnect(connection);
        } else {
            this.connections.delete(connectionId);
        }
        
        this.emit('connection:close', { connectionId, code: event.code, reason: event.reason });
    }
    
    scheduleReconnect(connection) {
        // Schedule automatic reconnection
        // Implement exponential backoff
        // Respect maximum attempt limits
        
        if (connection.reconnectAttempts >= this.maxReconnectAttempts) {
            this.emit('connection:failed', { 
                connectionId: connection.id,
                reason: 'Max reconnect attempts reached'
            });
            return;
        }
        
        const delay = this.calculateReconnectDelay(connection.reconnectAttempts);
        
        setTimeout(() => {
            connection.reconnectAttempts++;
            connection.reconnect();
        }, delay);
    }
}
```

### WebSocket Message Handling
```javascript
class WebSocketConnection extends EventEmitter {
    constructor(url, protocols, options) {
        super();
        this.url = url;
        this.protocols = protocols;
        this.options = options;
        this.id = options.connectionId;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.shouldReconnect = options.autoReconnect !== false;
        this.messageQueue = [];
        this.isConnecting = false;
        
        this.connect();
    }
    
    connect() {
        // Establish WebSocket connection
        // Set up event handlers
        // Handle connection states
        
        if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.CONNECTING)) {
            return;
        }
        
        this.isConnecting = true;
        this.ws = new WebSocket(this.url, this.protocols);
        
        this.ws.onopen = (event) => {
            this.isConnecting = false;
            this.reconnectAttempts = 0;
            this.processMessageQueue();
            this.emit('open', event);
        };
        
        this.ws.onclose = (event) => {
            this.isConnecting = false;
            this.emit('close', event);
        };
        
        this.ws.onerror = (error) => {
            this.isConnecting = false;
            this.emit('error', error);
        };
        
        this.ws.onmessage = (event) => {
            this.handleIncomingMessage(event.data);
        };
    }
    
    send(data, options = {}) {
        // Send message through WebSocket
        // Queue messages if not connected
        // Handle different data types
        // Support message priorities
        
        const message = {
            data: data,
            timestamp: Date.now(),
            priority: options.priority || 0,
            id: this.generateMessageId()
        };
        
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.sendMessage(message);
        } else {
            if (options.queue !== false) {
                this.queueMessage(message);
            } else {
                throw new Error('WebSocket not connected and queuing disabled');
            }
        }
        
        return message.id;
    }
    
    handleIncomingMessage(data) {
        // Process incoming WebSocket messages
        // Parse different message formats
        // Emit appropriate events
        // Handle protocol-specific messages
        
        let parsedData;
        
        try {
            // Try to parse as JSON first
            parsedData = JSON.parse(data);
        } catch (error) {
            // Handle binary or plain text data
            parsedData = data;
        }
        
        // Handle protocol-specific messages
        if (this.isProtocolMessage(parsedData)) {
            this.handleProtocolMessage(parsedData);
        } else {
            this.emit('message', parsedData);
        }
    }
}
```

## Transport Abstraction

### Transport Interface
```javascript
class TransportInterface {
    constructor(config) {
        this.config = config;
        this.state = 'disconnected';
        this.listeners = new Map();
    }
    
    async connect() {
        // Abstract method - must be implemented by subclasses
        throw new Error('connect() must be implemented by transport');
    }
    
    async disconnect() {
        // Abstract method - must be implemented by subclasses
        throw new Error('disconnect() must be implemented by transport');
    }
    
    async send(message) {
        // Abstract method - must be implemented by subclasses
        throw new Error('send() must be implemented by transport');
    }
    
    on(event, callback) {
        // Add event listener
        // Support multiple listeners per event
        // Handle listener management
        
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        
        this.listeners.get(event).push(callback);
    }
    
    emit(event, data) {
        // Emit event to all listeners
        // Handle listener errors gracefully
        // Support async listeners
        
        const listeners = this.listeners.get(event) || [];
        
        for (const listener of listeners) {
            try {
                listener(data);
            } catch (error) {
                console.error(`Error in transport listener for event ${event}:`, error);
            }
        }
    }
    
    getState() {
        return this.state;
    }
    
    isConnected() {
        return this.state === 'connected';
    }
}
```

### HTTP Transport Implementation
```javascript
class HTTPTransport extends TransportInterface {
    constructor(config) {
        super(config);
        this.httpClient = new HTTPClient({
            baseURL: config.baseURL,
            timeout: config.timeout,
            headers: config.headers
        });
        this.polling = false;
        this.pollingInterval = config.pollingInterval || 5000;
    }
    
    async connect() {
        // Establish HTTP transport connection
        // Start polling if configured
        // Validate endpoint availability
        
        try {
            await this.httpClient.get('/health');
            this.state = 'connected';
            
            if (this.config.polling) {
                this.startPolling();
            }
            
            this.emit('connected');
        } catch (error) {
            this.state = 'error';
            this.emit('error', error);
            throw error;
        }
    }
    
    async disconnect() {
        // Disconnect HTTP transport
        // Stop polling
        // Clean up resources
        
        this.stopPolling();
        this.state = 'disconnected';
        this.emit('disconnected');
    }
    
    async send(message) {
        // Send message via HTTP POST
        // Handle different message types
        // Process response
        
        if (!this.isConnected()) {
            throw new Error('Transport not connected');
        }
        
        try {
            const response = await this.httpClient.post('/messages', message);
            this.emit('message:sent', { message, response });
            return response;
        } catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    
    startPolling() {
        // Start polling for messages
        // Handle polling errors
        // Manage polling lifecycle
        
        if (this.polling) return;
        
        this.polling = true;
        this.pollMessages();
    }
    
    async pollMessages() {
        // Poll for new messages
        // Process received messages
        // Schedule next poll
        
        if (!this.polling || !this.isConnected()) return;
        
        try {
            const response = await this.httpClient.get('/messages/poll');
            
            if (response.data && response.data.messages) {
                for (const message of response.data.messages) {
                    this.emit('message', message);
                }
            }
        } catch (error) {
            this.emit('error', error);
        }
        
        if (this.polling) {
            setTimeout(() => this.pollMessages(), this.pollingInterval);
        }
    }
}
```

### WebSocket Transport Implementation
```javascript
class WebSocketTransport extends TransportInterface {
    constructor(config) {
        super(config);
        this.wsManager = new WebSocketManager(config);
        this.connection = null;
    }
    
    async connect() {
        // Connect via WebSocket
        // Set up message handlers
        // Handle connection events
        
        return new Promise((resolve, reject) => {
            this.connection = this.wsManager.connect(this.config.url, this.config.protocols);
            
            this.connection.on('open', () => {
                this.state = 'connected';
                this.emit('connected');
                resolve();
            });
            
            this.connection.on('error', (error) => {
                this.state = 'error';
                this.emit('error', error);
                reject(error);
            });
            
            this.connection.on('message', (data) => {
                this.emit('message', data);
            });
            
            this.connection.on('close', () => {
                this.state = 'disconnected';
                this.emit('disconnected');
            });
        });
    }
    
    async disconnect() {
        // Disconnect WebSocket
        // Clean up connection
        // Update state
        
        if (this.connection) {
            this.connection.close();
            this.connection = null;
        }
        
        this.state = 'disconnected';
        this.emit('disconnected');
    }
    
    async send(message) {
        // Send message via WebSocket
        // Handle connection state
        // Process message queuing
        
        if (!this.connection || !this.isConnected()) {
            throw new Error('Transport not connected');
        }
        
        const messageId = this.connection.send(message);
        this.emit('message:sent', { message, messageId });
        return messageId;
    }
}
```

## Connection Pooling

### Connection Pool Manager
```javascript
class ConnectionPoolManager {
    constructor(options = {}) {
        this.pools = new Map();
        this.defaultPoolSize = options.defaultPoolSize || 10;
        this.idleTimeout = options.idleTimeout || 30000;
        this.maxPoolSize = options.maxPoolSize || 50;
        this.cleanupInterval = setInterval(() => {
            this.cleanupIdleConnections();
        }, this.idleTimeout / 2);
    }
    
    getPool(poolKey, options = {}) {
        // Get or create connection pool
        // Configure pool parameters
        // Handle pool lifecycle
        
        if (!this.pools.has(poolKey)) {
            const pool = new ConnectionPool({
                key: poolKey,
                maxSize: options.maxSize || this.defaultPoolSize,
                idleTimeout: options.idleTimeout || this.idleTimeout,
                createConnection: options.createConnection,
                validateConnection: options.validateConnection,
                destroyConnection: options.destroyConnection
            });
            
            this.pools.set(poolKey, pool);
        }
        
        return this.pools.get(poolKey);
    }
    
    async getConnection(poolKey, options = {}) {
        // Get connection from pool
        // Create new connection if needed
        // Handle pool exhaustion
        
        const pool = this.getPool(poolKey, options);
        return await pool.acquire();
    }
    
    releaseConnection(poolKey, connection) {
        // Return connection to pool
        // Validate connection health
        // Handle connection errors
        
        const pool = this.pools.get(poolKey);
        if (pool) {
            pool.release(connection);
        } else {
            // Pool doesn't exist, destroy connection
            if (connection && connection.destroy) {
                connection.destroy();
            }
        }
    }
    
    cleanupIdleConnections() {
        // Clean up idle connections across all pools
        // Respect idle timeout settings
        // Maintain minimum pool sizes
        
        for (const [poolKey, pool] of this.pools) {
            pool.cleanup();
            
            // Remove empty pools
            if (pool.isEmpty() && pool.canBeDestroyed()) {
                pool.destroy();
                this.pools.delete(poolKey);
            }
        }
    }
}
```

### Connection Pool Implementation
```javascript
class ConnectionPool {
    constructor(options) {
        this.key = options.key;
        this.maxSize = options.maxSize;
        this.idleTimeout = options.idleTimeout;
        this.createConnection = options.createConnection;
        this.validateConnection = options.validateConnection;
        this.destroyConnection = options.destroyConnection;
        
        this.available = [];
        this.inUse = new Set();
        this.creating = 0;
        this.waitQueue = [];
    }
    
    async acquire() {
        // Acquire connection from pool
        // Wait for available connection
        // Create new connection if needed
        
        // Check for available connection
        while (this.available.length > 0) {
            const connection = this.available.shift();
            
            if (await this.isConnectionValid(connection)) {
                this.inUse.add(connection);
                return connection;
            } else {
                await this.destroyConnectionSafely(connection);
            }
        }
        
        // Create new connection if pool not at capacity
        if (this.getTotalConnections() < this.maxSize) {
            return await this.createNewConnection();
        }
        
        // Wait for connection to become available
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                const index = this.waitQueue.findIndex(item => item.resolve === resolve);
                if (index >= 0) {
                    this.waitQueue.splice(index, 1);
                }
                reject(new Error('Connection pool timeout'));
            }, 10000); // 10 second timeout
            
            this.waitQueue.push({ 
                resolve: (connection) => {
                    clearTimeout(timeout);
                    resolve(connection);
                },
                reject: (error) => {
                    clearTimeout(timeout);
                    reject(error);
                }
            });
        });
    }
    
    release(connection) {
        // Return connection to pool
        // Validate connection health
        // Process waiting requests
        
        this.inUse.delete(connection);
        
        // Check if there are waiting requests
        if (this.waitQueue.length > 0) {
            const waiter = this.waitQueue.shift();
            this.inUse.add(connection);
            waiter.resolve(connection);
            return;
        }
        
        // Add back to available pool
        connection.lastUsed = Date.now();
        this.available.push(connection);
    }
    
    async createNewConnection() {
        // Create new connection
        // Handle creation failures
        // Add to pool
        
        this.creating++;
        
        try {
            const connection = await this.createConnection();
            connection.createdAt = Date.now();
            connection.lastUsed = Date.now();
            
            this.inUse.add(connection);
            return connection;
        } catch (error) {
            throw error;
        } finally {
            this.creating--;
        }
    }
    
    cleanup() {
        // Remove idle connections
        // Respect minimum pool size
        // Handle cleanup errors
        
        const now = Date.now();
        const idleConnections = this.available.filter(
            conn => now - conn.lastUsed > this.idleTimeout
        );
        
        for (const connection of idleConnections) {
            const index = this.available.indexOf(connection);
            if (index >= 0) {
                this.available.splice(index, 1);
                this.destroyConnectionSafely(connection);
            }
        }
    }
}
```

## Network Monitoring

### Performance Monitoring
```javascript
class NetworkMonitor {
    constructor() {
        this.metrics = new Map();
        this.alertThresholds = {
            latency: 5000, // 5 seconds
            errorRate: 0.1, // 10%
            timeoutRate: 0.05 // 5%
        };
    }
    
    recordRequest(url, method, startTime, endTime, success, error) {
        // Record network request metrics
        // Calculate performance statistics
        // Track error patterns
        // Generate alerts if needed
        
        const duration = endTime - startTime;
        const key = `${method} ${url}`;
        
        if (!this.metrics.has(key)) {
            this.metrics.set(key, {
                requests: 0,
                totalDuration: 0,
                successes: 0,
                errors: 0,
                timeouts: 0,
                avgLatency: 0,
                minLatency: Infinity,
                maxLatency: 0,
                errorRate: 0,
                timeoutRate: 0,
                recentErrors: []
            });
        }
        
        const metrics = this.metrics.get(key);
        
        metrics.requests++;
        metrics.totalDuration += duration;
        
        if (success) {
            metrics.successes++;
        } else {
            metrics.errors++;
            metrics.recentErrors.push({
                timestamp: Date.now(),
                error: error?.message || 'Unknown error'
            });
            
            // Keep only recent errors (last 10)
            if (metrics.recentErrors.length > 10) {
                metrics.recentErrors.shift();
            }
            
            if (error?.code === 'TIMEOUT') {
                metrics.timeouts++;
            }
        }
        
        // Update calculated metrics
        metrics.avgLatency = metrics.totalDuration / metrics.requests;
        metrics.minLatency = Math.min(metrics.minLatency, duration);
        metrics.maxLatency = Math.max(metrics.maxLatency, duration);
        metrics.errorRate = metrics.errors / metrics.requests;
        metrics.timeoutRate = metrics.timeouts / metrics.requests;
        
        // Check for alerts
        this.checkAlerts(key, metrics);
    }
    
    checkAlerts(endpoint, metrics) {
        // Check if metrics exceed alert thresholds
        // Generate appropriate alerts
        // Handle alert frequency limits
        
        const alerts = [];
        
        if (metrics.avgLatency > this.alertThresholds.latency) {
            alerts.push({
                type: 'high_latency',
                endpoint: endpoint,
                value: metrics.avgLatency,
                threshold: this.alertThresholds.latency
            });
        }
        
        if (metrics.errorRate > this.alertThresholds.errorRate) {
            alerts.push({
                type: 'high_error_rate',
                endpoint: endpoint,
                value: metrics.errorRate,
                threshold: this.alertThresholds.errorRate
            });
        }
        
        if (metrics.timeoutRate > this.alertThresholds.timeoutRate) {
            alerts.push({
                type: 'high_timeout_rate',
                endpoint: endpoint,
                value: metrics.timeoutRate,
                threshold: this.alertThresholds.timeoutRate
            });
        }
        
        for (const alert of alerts) {
            this.emitAlert(alert);
        }
    }
    
    getHealthReport() {
        // Generate network health report
        // Include performance statistics
        // Highlight problematic endpoints
        // Provide recommendations
        
        const report = {
            timestamp: Date.now(),
            summary: {
                totalEndpoints: this.metrics.size,
                healthyEndpoints: 0,
                degradedEndpoints: 0,
                unhealthyEndpoints: 0
            },
            endpoints: [],
            recommendations: []
        };
        
        for (const [endpoint, metrics] of this.metrics) {
            const health = this.calculateEndpointHealth(metrics);
            
            report.endpoints.push({
                endpoint: endpoint,
                health: health.status,
                metrics: {
                    requests: metrics.requests,
                    avgLatency: Math.round(metrics.avgLatency),
                    errorRate: Math.round(metrics.errorRate * 100) / 100,
                    timeoutRate: Math.round(metrics.timeoutRate * 100) / 100
                },
                issues: health.issues
            });
            
            // Update summary
            if (health.status === 'healthy') {
                report.summary.healthyEndpoints++;
            } else if (health.status === 'degraded') {
                report.summary.degradedEndpoints++;
            } else {
                report.summary.unhealthyEndpoints++;
            }
        }
        
        return report;
    }
}
```

This network and transport specification provides comprehensive coverage of Claude Code's networking capabilities, from basic HTTP operations to advanced connection management and monitoring systems.