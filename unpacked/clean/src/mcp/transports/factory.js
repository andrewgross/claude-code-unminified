/**
 * MCP Transport Factory
 * 
 * Creates appropriate transport instances based on configuration,
 * handles authentication setup, and manages transport lifecycle.
 * 
 * Key chunks analyzed:
 * - chunk_0584.js:4-36 (SSE transport setup in z01 function)
 * - chunk_0584.js:37-53 (SSE-IDE transport setup)
 * - chunk_0584.js transport selection and connection logic
 */

import { SSEClientTransport } from './sse.js';
import { OAuthAuthProvider } from './auth.js';
import { StdioTransport } from './stdio.js';

/**
 * Transport types supported by MCP
 */
export const TRANSPORT_TYPES = {
    STDIO: 'stdio',
    SSE: 'sse',
    SSE_IDE: 'sse-ide',
    HTTP: 'http',
    WEBSOCKET: 'websocket'
};

/**
 * Create MCP transport based on configuration
 * 
 * Extracted from chunk_0584.js:4-53 (z01 function):
 * - Routes to appropriate transport based on type
 * - Sets up authentication for remote transports
 * - Configures headers and request options
 * - Handles IDE-specific transport variants
 * 
 * @param {string} serverName - Name of MCP server
 * @param {Object} config - Transport configuration
 * @returns {Object} Transport instance
 */
export function createMcpTransport(serverName, config) {
    let transport;
    
    switch (config.type) {
        case TRANSPORT_TYPES.SSE: {
            // Create OAuth authentication provider
            const authProvider = new OAuthAuthProvider(serverName, config);
            
            const options = {
                authProvider,
                requestInit: {
                    headers: {
                        'User-Agent': getUserAgent(),
                        ...(config.headers || {})
                    },
                    signal: AbortSignal.timeout(config.timeout || 60000)
                }
            };
            
            // Configure EventSource with custom fetch for authentication
            if (config.headers) {
                options.eventSourceInit = {
                    fetch: async (url, init) => {
                        const authHeaders = {};
                        
                        // Add OAuth Bearer token if available
                        const tokens = await authProvider.tokens();
                        if (tokens) {
                            authHeaders.Authorization = `Bearer ${tokens.access_token}`;
                        }
                        
                        // Get proxy configuration if needed
                        const proxyConfig = getProxyConfiguration();
                        
                        return fetch(url, {
                            ...init,
                            ...proxyConfig,
                            headers: {
                                'User-Agent': getUserAgent(),
                                ...authHeaders,
                                ...init?.headers,
                                ...config.headers,
                                'Accept': 'text/event-stream'
                            }
                        });
                    }
                };
            }
            
            transport = new SSEClientTransport(new URL(config.url), options);
            break;
        }
        
        case TRANSPORT_TYPES.SSE_IDE: {
            // IDE-specific SSE transport (no OAuth, may have proxy)
            const proxyConfig = getProxyConfiguration();
            const options = proxyConfig.dispatcher ? {
                eventSourceInit: {
                    fetch: async (url, init) => {
                        return fetch(url, {
                            ...init,
                            ...proxyConfig,
                            headers: {
                                'User-Agent': getUserAgent(),
                                ...init?.headers
                            }
                        });
                    }
                }
            } : {};
            
            transport = new SSEClientTransport(
                new URL(config.url), 
                Object.keys(options).length > 0 ? options : undefined
            );
            break;
        }
        
        case TRANSPORT_TYPES.HTTP: {
            // HTTP-based transport with authentication
            const authProvider = new OAuthAuthProvider(serverName, config);
            
            const options = {
                authProvider,
                baseUrl: config.url,
                headers: {
                    'User-Agent': getUserAgent(),
                    ...(config.headers || {})
                },
                timeout: config.timeout || 60000
            };
            
            transport = new HttpTransport(options);
            break;
        }
        
        case TRANSPORT_TYPES.WEBSOCKET: {
            // WebSocket transport for IDE integration
            const options = {
                url: config.url,
                headers: config.headers || {},
                timeout: config.timeout || 60000
            };
            
            transport = new WebSocketTransport(options);
            break;
        }
        
        case TRANSPORT_TYPES.STDIO:
        default: {
            // Local stdio transport
            const options = {
                command: config.command,
                args: config.args || [],
                env: config.env || {},
                cwd: config.cwd,
                timeout: config.timeout || 30000
            };
            
            transport = new StdioTransport(options);
            break;
        }
    }
    
    // Set common transport properties
    if (transport) {
        transport.serverName = serverName;
        transport.config = config;
        transport.type = config.type || TRANSPORT_TYPES.STDIO;
    }
    
    return transport;
}

/**
 * Validate transport configuration
 * 
 * @param {Object} config - Transport configuration to validate
 * @returns {Array} Array of validation errors
 */
export function validateTransportConfig(config) {
    const errors = [];
    
    if (!config || typeof config !== 'object') {
        errors.push('Transport configuration must be an object');
        return errors;
    }
    
    // Validate transport type
    if (config.type && !Object.values(TRANSPORT_TYPES).includes(config.type)) {
        errors.push(`Invalid transport type: ${config.type}. Must be one of: ${Object.values(TRANSPORT_TYPES).join(', ')}`);
    }
    
    // Validate required fields based on transport type
    const transportType = config.type || TRANSPORT_TYPES.STDIO;
    
    switch (transportType) {
        case TRANSPORT_TYPES.SSE:
        case TRANSPORT_TYPES.SSE_IDE:
        case TRANSPORT_TYPES.HTTP:
            if (!config.url) {
                errors.push(`URL is required for ${transportType} transport`);
            } else {
                try {
                    new URL(config.url);
                } catch (error) {
                    errors.push(`Invalid URL for ${transportType} transport: ${config.url}`);
                }
            }
            break;
            
        case TRANSPORT_TYPES.WEBSOCKET:
            if (!config.url) {
                errors.push('URL is required for websocket transport');
            } else if (!config.url.startsWith('ws://') && !config.url.startsWith('wss://')) {
                errors.push('WebSocket URL must start with ws:// or wss://');
            }
            break;
            
        case TRANSPORT_TYPES.STDIO:
            if (!config.command) {
                errors.push('Command is required for stdio transport');
            }
            break;
    }
    
    // Validate headers if present
    if (config.headers && typeof config.headers !== 'object') {
        errors.push('Headers must be an object');
    }
    
    // Validate environment variables if present
    if (config.env && typeof config.env !== 'object') {
        errors.push('Environment variables must be an object');
    }
    
    // Validate args if present
    if (config.args && !Array.isArray(config.args)) {
        errors.push('Arguments must be an array');
    }
    
    // Validate timeout if present
    if (config.timeout && typeof config.timeout !== 'number') {
        errors.push('Timeout must be a number');
    }
    
    return errors;
}

/**
 * Check if transport type supports authentication
 * 
 * @param {string} transportType - Transport type to check
 * @returns {boolean} True if transport supports authentication
 */
export function transportSupportsAuth(transportType) {
    return [TRANSPORT_TYPES.SSE, TRANSPORT_TYPES.HTTP].includes(transportType);
}

/**
 * Check if transport type is remote (requires network)
 * 
 * @param {string} transportType - Transport type to check
 * @returns {boolean} True if transport is remote
 */
export function isRemoteTransport(transportType) {
    return [
        TRANSPORT_TYPES.SSE,
        TRANSPORT_TYPES.SSE_IDE,
        TRANSPORT_TYPES.HTTP,
        TRANSPORT_TYPES.WEBSOCKET
    ].includes(transportType);
}

/**
 * Get default configuration for transport type
 * 
 * @param {string} transportType - Transport type
 * @returns {Object} Default configuration
 */
export function getDefaultTransportConfig(transportType) {
    const baseConfig = {
        type: transportType,
        timeout: 30000
    };
    
    switch (transportType) {
        case TRANSPORT_TYPES.SSE:
        case TRANSPORT_TYPES.SSE_IDE:
            return {
                ...baseConfig,
                timeout: 60000,
                headers: {
                    'Accept': 'text/event-stream',
                    'Cache-Control': 'no-cache'
                }
            };
            
        case TRANSPORT_TYPES.HTTP:
            return {
                ...baseConfig,
                timeout: 60000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            
        case TRANSPORT_TYPES.WEBSOCKET:
            return {
                ...baseConfig,
                timeout: 60000
            };
            
        case TRANSPORT_TYPES.STDIO:
        default:
            return {
                ...baseConfig,
                args: [],
                env: {}
            };
    }
}

/**
 * Create transport with enhanced error handling
 * 
 * @param {string} serverName - Server name
 * @param {Object} config - Transport configuration
 * @returns {Object} Transport result with success flag and transport/error
 */
export function createMcpTransportSafe(serverName, config) {
    try {
        // Validate configuration first
        const validationErrors = validateTransportConfig(config);
        if (validationErrors.length > 0) {
            return {
                success: false,
                error: `Transport configuration validation failed: ${validationErrors.join(', ')}`
            };
        }
        
        // Create transport
        const transport = createMcpTransport(serverName, config);
        
        return {
            success: true,
            transport
        };
        
    } catch (error) {
        return {
            success: false,
            error: `Failed to create transport: ${error.message}`
        };
    }
}

// Helper functions

/**
 * Get user agent string for HTTP requests
 * 
 * @returns {string} User agent string
 */
function getUserAgent() {
    // Placeholder - would return actual Claude Code user agent
    return 'Claude-Code/1.0.0 (MCP-Transport)';
}

/**
 * Get proxy configuration for requests
 * 
 * @returns {Object} Proxy configuration object
 */
function getProxyConfiguration() {
    // Placeholder for proxy configuration
    // In real implementation, would read from environment variables or config
    return {
        dispatcher: null // Would contain proxy dispatcher if configured
    };
}

// Placeholder transport classes (would be implemented in separate files)

/**
 * HTTP Transport (placeholder)
 */
class HttpTransport {
    constructor(options) {
        this.options = options;
        this.type = TRANSPORT_TYPES.HTTP;
    }
    
    async start() {
        throw new Error('HTTP transport not yet implemented');
    }
    
    async send(message) {
        throw new Error('HTTP transport not yet implemented');
    }
    
    async close() {
        // Cleanup logic
    }
}

/**
 * WebSocket Transport (placeholder)
 */
class WebSocketTransport {
    constructor(options) {
        this.options = options;
        this.type = TRANSPORT_TYPES.WEBSOCKET;
    }
    
    async start() {
        throw new Error('WebSocket transport not yet implemented');
    }
    
    async send(message) {
        throw new Error('WebSocket transport not yet implemented');
    }
    
    async close() {
        // Cleanup logic
    }
}

/**
 * Transport Factory Manager
 * 
 * High-level interface for transport creation and management
 */
export class TransportFactory {
    constructor() {
        this._transports = new Map();
        this._config = new Map();
    }
    
    /**
     * Create and register transport
     * 
     * @param {string} serverName - Server name
     * @param {Object} config - Transport configuration
     * @returns {Object} Creation result
     */
    async createTransport(serverName, config) {
        const result = createMcpTransportSafe(serverName, config);
        
        if (result.success) {
            this._transports.set(serverName, result.transport);
            this._config.set(serverName, config);
        }
        
        return result;
    }
    
    /**
     * Get transport for server
     * 
     * @param {string} serverName - Server name
     * @returns {Object|null} Transport instance or null
     */
    getTransport(serverName) {
        return this._transports.get(serverName) || null;
    }
    
    /**
     * Remove and cleanup transport
     * 
     * @param {string} serverName - Server name
     */
    async removeTransport(serverName) {
        const transport = this._transports.get(serverName);
        if (transport) {
            try {
                await transport.close();
            } catch (error) {
                console.warn(`Error closing transport for ${serverName}:`, error);
            }
            
            this._transports.delete(serverName);
            this._config.delete(serverName);
        }
    }
    
    /**
     * Get all registered transports
     * 
     * @returns {Array} Array of transport info
     */
    listTransports() {
        const transports = [];
        
        for (const [serverName, transport] of this._transports) {
            const config = this._config.get(serverName);
            transports.push({
                serverName,
                type: transport.type,
                config,
                connected: transport.isConnected ? transport.isConnected() : false
            });
        }
        
        return transports;
    }
    
    /**
     * Cleanup all transports
     */
    async cleanup() {
        const closePromises = Array.from(this._transports.keys()).map(serverName =>
            this.removeTransport(serverName)
        );
        
        await Promise.allSettled(closePromises);
    }
}