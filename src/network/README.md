# Network Transport Module

This module provides a comprehensive network transport system extracted and deobfuscated from the CLI.js file. It includes HTTP clients, WebSocket management, transport factories, connection pooling, and request interceptors.

## Overview

The network transport module consists of five main components:

1. **HTTP Client** (`http-client.js`) - Unified HTTP/HTTPS client with fetch and XMLHttpRequest support
2. **WebSocket Manager** (`websocket-manager.js`) - WebSocket connection management with auto-reconnection
3. **Transport Factory** (`transport-factory.js`) - Factory pattern for creating different transport types
4. **Connection Pool Manager** (`connection-pool.js`) - Connection pooling for efficient resource management
5. **Request Interceptors** (`request-interceptors.js`) - Middleware system for request/response processing

## Quick Start

```javascript
const { NetworkTransportManager } = require('./src/network');

// Create a network manager with default settings
const networkManager = new NetworkTransportManager({
    enablePooling: true,
    enableInterceptors: true
});

// Send an HTTP request
const response = await networkManager.request({
    url: 'https://api.example.com/data',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer token123'
    }
});

// Create a WebSocket connection
await networkManager.connectWebSocket('chat', 'wss://api.example.com/ws');
networkManager.sendWebSocketMessage('chat', { type: 'hello', data: 'world' });
```

## Components

### HTTP Client

The HTTP client provides a unified interface for making HTTP requests using both the modern Fetch API and fallback XMLHttpRequest.

**Features:**
- Automatic method detection (fetch vs XHR)
- Request/response interceptors
- Timeout handling
- Error handling with custom error types
- Statistics tracking
- Support for different response types

**Example:**
```javascript
const { HttpClient } = require('./src/network/http-client');

const client = new HttpClient({
    timeout: 30000,
    retries: 3,
    headers: {
        'User-Agent': 'MyApp/1.0'
    }
});

// GET request
const response = await client.get('https://api.example.com/users');

// POST request with data
const result = await client.post('https://api.example.com/users', {
    name: 'John Doe',
    email: 'john@example.com'
});
```

### WebSocket Manager

Manages WebSocket connections with automatic reconnection, message queuing, and heartbeat monitoring.

**Features:**
- Multiple connection management
- Automatic reconnection with exponential backoff
- Message queuing during disconnections
- Heartbeat/ping-pong monitoring
- Connection state tracking
- Event-driven architecture

**Example:**
```javascript
const { WebSocketManager } = require('./src/network/websocket-manager');

const wsManager = new WebSocketManager({
    reconnect: true,
    reconnectInterval: 5000,
    maxReconnectAttempts: 10,
    heartbeatInterval: 30000
});

// Connect to WebSocket
await wsManager.connect('main', 'wss://api.example.com/ws');

// Listen for messages
wsManager.on('message', ({ id, data }) => {
    console.log(`Message from ${id}:`, data);
});

// Send message
wsManager.send('main', { type: 'ping' });
```

### Transport Factory

Creates appropriate transport instances based on configuration and environment detection.

**Features:**
- Automatic transport selection
- Environment detection (Node.js, browser, web worker)
- Failover transport support
- Custom transport registration
- Protocol-based transport selection

**Example:**
```javascript
const { TransportFactory, TransportType } = require('./src/network/transport-factory');

const factory = new TransportFactory();

// Create HTTP transport
const httpTransport = factory.create({
    type: TransportType.HTTP,
    url: 'https://api.example.com'
});

// Create WebSocket transport
const wsTransport = factory.create({
    type: TransportType.WEBSOCKET,
    url: 'wss://api.example.com/ws'
});

// Create failover transport
const failoverTransport = factory.createFailover([
    { type: TransportType.HTTP, url: 'https://primary-api.example.com' },
    { type: TransportType.HTTP, url: 'https://backup-api.example.com' }
]);
```

### Connection Pool Manager

Manages pools of connections for efficient resource reuse and load balancing.

**Features:**
- Multiple pool management
- Load balancing strategies (round-robin, least connections, etc.)
- Health monitoring
- Automatic scaling (min/max connections)
- Connection lifecycle management
- Statistics and metrics

**Example:**
```javascript
const { ConnectionPoolManager, PoolStrategy } = require('./src/network/connection-pool');

const poolManager = new ConnectionPoolManager({
    minConnections: 2,
    maxConnections: 10,
    strategy: PoolStrategy.LEAST_CONNECTIONS,
    healthCheckInterval: 30000
});

// Create a pool
poolManager.createPool('api-pool', {
    transportOptions: {
        type: 'http',
        url: 'https://api.example.com'
    },
    minConnections: 3,
    maxConnections: 15
});

// Use connection from pool
const connection = await poolManager.acquireConnection('api-pool');
const response = await connection.transport.send(data);
poolManager.releaseConnection(connection.id, { success: true });
```

### Request Interceptors

Middleware system for processing requests and responses with built-in interceptors for common tasks.

**Features:**
- Request/response/error interceptors
- Built-in interceptors (auth, logging, caching, rate limiting, retry)
- Custom interceptor support
- Conditional execution
- Priority-based ordering
- Performance monitoring

**Example:**
```javascript
const { 
    RequestInterceptorManager, 
    InterceptorType,
    LoggingInterceptor 
} = require('./src/network/request-interceptors');

const interceptorManager = new RequestInterceptorManager();

// Register built-in logging interceptor
interceptorManager.register(
    InterceptorType.REQUEST, 
    new LoggingInterceptor({ logLevel: 'debug' })
);

// Create custom interceptor
class CustomHeaderInterceptor extends BaseInterceptor {
    async process(context) {
        return {
            ...context,
            headers: {
                ...context.headers,
                'X-Custom-Header': 'MyValue'
            }
        };
    }
}

interceptorManager.register(
    InterceptorType.REQUEST,
    new CustomHeaderInterceptor({ priority: 100 })
);

// Process request through interceptors
const processedContext = await interceptorManager.processRequest({
    url: 'https://api.example.com/data',
    method: 'GET'
});
```

## Built-in Interceptors

### Authentication Interceptor
Automatically adds authentication headers to requests.

```javascript
const authInterceptor = new AuthenticationInterceptor();
authInterceptor.setAuthToken('api.example.com', 'bearer-token-here');
```

### Logging Interceptor
Logs request and response information with configurable detail levels.

```javascript
const loggingInterceptor = new LoggingInterceptor({
    logLevel: 'info',
    maxBodyLength: 1000
});
```

### Cache Interceptor
Caches responses based on HTTP cache headers or custom TTL.

```javascript
const cacheInterceptor = new CacheInterceptor({
    maxCacheSize: 100,
    defaultTTL: 300000 // 5 minutes
});
```

### Rate Limit Interceptor
Implements rate limiting per domain with configurable limits.

```javascript
const rateLimitInterceptor = new RateLimitInterceptor({
    defaultLimit: { requests: 100, window: 60000 },
    domainLimits: {
        'api.example.com': { requests: 1000, window: 60000 }
    }
});
```

### Retry Interceptor
Automatically retries failed requests with exponential backoff.

```javascript
const retryInterceptor = new RetryInterceptor({
    maxRetries: 3,
    retryDelay: 1000,
    backoffMultiplier: 2,
    retryableErrors: [408, 429, 500, 502, 503, 504]
});
```

## Configuration Options

### NetworkTransportManager Options

```javascript
const manager = new NetworkTransportManager({
    // Enable connection pooling
    enablePooling: true,
    
    // Enable request interceptors
    enableInterceptors: true,
    
    // Default transport type
    defaultTransportType: TransportType.HTTP,
    
    // Pool configuration
    poolConfig: {
        minConnections: 1,
        maxConnections: 10,
        strategy: PoolStrategy.ROUND_ROBIN
    },
    
    // Interceptor configuration
    interceptorConfig: {
        enableBuiltins: true,
        maxProcessingTime: 30000,
        errorHandling: 'continue'
    },
    
    // HTTP client options
    httpOptions: {
        timeout: 30000,
        retries: 3,
        keepAlive: true
    },
    
    // WebSocket options
    websocketOptions: {
        reconnect: true,
        reconnectInterval: 5000,
        heartbeatInterval: 30000
    }
});
```

## Error Handling

All components provide comprehensive error handling with custom error types:

```javascript
const { HttpError, WebSocketError } = require('./src/network');

try {
    const response = await client.request(options);
} catch (error) {
    if (error instanceof HttpError) {
        console.log('HTTP Error:', error.statusCode, error.statusText);
    } else if (error instanceof WebSocketError) {
        console.log('WebSocket Error:', error.message);
    } else {
        console.log('General Error:', error.message);
    }
}
```

## Statistics and Monitoring

All components provide detailed statistics and monitoring capabilities:

```javascript
// Get comprehensive stats
const stats = manager.getStats();
console.log('Network Stats:', {
    requests: stats.manager.requestsSent,
    successRate: stats.manager.requestsSuccessful / stats.manager.requestsSent,
    avgResponseTime: stats.manager.avgResponseTime,
    httpClientStats: stats.httpClient,
    websocketStats: stats.webSocketManager,
    poolStats: stats.connectionPool,
    interceptorStats: stats.interceptors
});
```

## Advanced Usage

### Custom Transport

```javascript
const { BaseTransport } = require('./src/network/transport-factory');

class CustomTransport extends BaseTransport {
    constructor(options) {
        super(options);
        this.type = 'custom';
    }
    
    async initialize() {
        // Initialize custom transport
        this.isConnected = true;
    }
    
    async send(data, options) {
        // Implement custom send logic
        return { status: 200, data: 'response' };
    }
    
    async close() {
        this.isConnected = false;
    }
}

// Register custom transport
transportFactory.registerTransport('custom', CustomTransport);
```

### Custom Interceptor

```javascript
const { BaseInterceptor } = require('./src/network/request-interceptors');

class MetricsInterceptor extends BaseInterceptor {
    constructor(options) {
        super(options);
        this.metrics = new Map();
    }
    
    async process(context) {
        const startTime = Date.now();
        
        // Track metrics
        const domain = new URL(context.url).hostname;
        const stats = this.metrics.get(domain) || { count: 0, totalTime: 0 };
        stats.count++;
        
        if (context.response) {
            stats.totalTime += Date.now() - context.timestamp;
            this.metrics.set(domain, stats);
        }
        
        return context;
    }
}
```

## Best Practices

1. **Use Connection Pooling**: Enable connection pooling for high-traffic applications to improve performance.

2. **Configure Timeouts**: Always set appropriate timeouts for your use case to prevent hanging requests.

3. **Handle Errors Gracefully**: Implement proper error handling and retry logic for network failures.

4. **Monitor Performance**: Use the built-in statistics to monitor performance and identify bottlenecks.

5. **Use Interceptors Wisely**: Leverage interceptors for cross-cutting concerns like authentication, logging, and caching.

6. **Clean Up Resources**: Always call `shutdown()` when your application terminates to clean up connections.

```javascript
// Graceful shutdown
process.on('SIGTERM', async () => {
    await manager.shutdown();
    process.exit(0);
});
```

## Integration with Claude Code CLI

This network transport module is designed to replace the obfuscated network functionality in the original CLI.js file. It provides:

- **Human-readable code** instead of obfuscated transport logic
- **Modular architecture** for easier maintenance and testing
- **Comprehensive error handling** with meaningful error messages
- **Modern JavaScript patterns** using async/await and Promises
- **Event-driven architecture** for better observability
- **Extensive configuration options** for different use cases

The module maintains compatibility with the existing CLI functionality while providing a much cleaner and more maintainable codebase.