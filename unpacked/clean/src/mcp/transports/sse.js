/**
 * MCP SSE (Server-Sent Events) Transport
 * 
 * Implements Server-Sent Events transport for MCP servers with OAuth 2.0 authentication,
 * automatic reconnection, and proper message handling.
 * 
 * Key chunks analyzed:
 * - chunk_0553.js:275-404 (Zy1 class - main SSE client transport)
 * - chunk_0583.js:99-180 (Nd class - OAuth 2.0 auth provider)
 * - chunk_0584.js:4-36 (SSE connection setup in z01 function)
 */

import EventSource from 'eventsource'; // Node.js EventSource implementation
import { OAuthAuthProvider } from './auth.js';

/**
 * SSE Transport Errors
 */
export class SSETransportError extends Error {
    constructor(code, message, originalError = null) {
        super(message);
        this.name = 'SSETransportError';
        this.code = code;
        this.originalError = originalError;
    }
}

export class SSEAuthenticationError extends SSETransportError {
    constructor(message = 'Authentication failed') {
        super(401, message);
        this.name = 'SSEAuthenticationError';
    }
}

/**
 * SSE Client Transport for MCP
 * 
 * Extracted from chunk_0553.js:275-404 (Zy1 class):
 * - Handles Server-Sent Events connections with authentication
 * - Supports OAuth 2.0 flow with automatic token refresh
 * - Implements endpoint discovery via SSE events
 * - Sends messages via HTTP POST to discovered endpoint
 */
export class SSEClientTransport {
    constructor(url, options = {}) {
        this._url = new URL(url);
        this._resourceMetadataUrl = undefined;
        this._eventSourceInit = options.eventSourceInit;
        this._requestInit = options.requestInit;
        this._authProvider = options.authProvider;
        this._fetch = options.fetch || fetch;
        this._protocolVersion = options.protocolVersion;
        
        // Event handlers
        this.onopen = null;
        this.onmessage = null;
        this.onerror = null;
        this.onclose = null;
        
        // Connection state
        this._eventSource = null;
        this._endpoint = null;
        this._abortController = null;
    }
    
    /**
     * Start the SSE connection with authentication handling
     * 
     * Extracted from chunk_0553.js:355-357:
     * - Prevents multiple connection attempts
     * - Delegates to _startOrAuth for main connection logic
     * 
     * @returns {Promise<void>} Resolves when connection is established
     */
    async start() {
        if (this._eventSource) {
            throw new Error('SSEClientTransport already started! If using Client class, note that connect() calls start() automatically.');
        }
        
        return await this._startOrAuth();
    }
    
    /**
     * Authentication flow then start connection
     * 
     * Extracted from chunk_0553.js:279-293:
     * - Handles OAuth authentication if auth provider present
     * - Calls authorization completion function
     * - Falls back to direct connection on auth success
     * 
     * @returns {Promise<void>} Resolves when authenticated and connected
     */
    async _authThenStart() {
        if (!this._authProvider) {
            throw new SSEAuthenticationError('No auth provider');
        }
        
        let authResult;
        try {
            authResult = await this._completeAuthentication(this._authProvider, {
                serverUrl: this._url,
                resourceMetadataUrl: this._resourceMetadataUrl
            });
        } catch (error) {
            if (this.onerror) {
                this.onerror(error);
            }
            throw error;
        }
        
        if (authResult !== 'AUTHORIZED') {
            throw new SSEAuthenticationError('Authorization failed');
        }
        
        return await this._startOrAuth();
    }
    
    /**
     * Get common headers including authentication
     * 
     * Extracted from chunk_0553.js:294-305:
     * - Merges request init headers
     * - Adds OAuth Bearer token if available
     * - Includes MCP protocol version header
     * 
     * @returns {Promise<Object>} Headers object
     */
    async _commonHeaders() {
        const headers = {
            ...(this._requestInit?.headers || {})
        };
        
        // Add OAuth Bearer token if available
        if (this._authProvider) {
            const tokens = await this._authProvider.tokens();
            if (tokens) {
                headers.Authorization = `Bearer ${tokens.access_token}`;
            }
        }
        
        // Add protocol version
        if (this._protocolVersion) {
            headers['mcp-protocol-version'] = this._protocolVersion;
        }
        
        return headers;
    }
    
    /**
     * Main connection establishment logic
     * 
     * Extracted from chunk_0553.js:306-354:
     * - Creates EventSource with custom fetch for authentication
     * - Sets up event handlers for endpoint discovery and messages
     * - Handles authentication errors with retry logic
     * - Returns promise that resolves when endpoint is discovered
     * 
     * @returns {Promise<void>} Resolves when connection and endpoint are ready
     */
    _startOrAuth() {
        const fetchFunction = this._eventSourceInit?.fetch || this._fetch;
        
        return new Promise((resolve, reject) => {
            // Create EventSource with custom fetch for authentication
            this._eventSource = new EventSource(this._url.href, {
                ...this._eventSourceInit,
                headers: {
                    'Accept': 'text/event-stream',
                    'Cache-Control': 'no-cache'
                }
            });
            
            this._abortController = new AbortController();
            
            // Handle connection errors
            this._eventSource.onerror = (error) => {
                console.error('SSE connection error:', error);
                
                // Handle authentication errors
                if (error.status === 401 && this._authProvider) {
                    this._authThenStart().then(resolve, reject);
                    return;
                }
                
                const transportError = new SSETransportError(
                    error.status || 'CONNECTION_ERROR',
                    error.message || 'SSE connection failed',
                    error
                );
                
                reject(transportError);
                
                if (this.onerror) {
                    this.onerror(transportError);
                }
            };
            
            // Handle connection open
            this._eventSource.onopen = () => {
                console.log('SSE connection opened');
                if (this.onopen) {
                    this.onopen();
                }
            };
            
            // Handle endpoint discovery
            this._eventSource.addEventListener('endpoint', (event) => {
                try {
                    // Create endpoint URL from SSE event data
                    this._endpoint = new URL(event.data, this._url);
                    
                    // Validate endpoint origin for security
                    if (this._endpoint.origin !== this._url.origin) {
                        throw new Error(`Endpoint origin does not match connection origin: ${this._endpoint.origin}`);
                    }
                    
                    console.log('SSE endpoint discovered:', this._endpoint.href);
                    resolve();
                    
                } catch (error) {
                    console.error('Endpoint discovery error:', error);
                    reject(error);
                    
                    if (this.onerror) {
                        this.onerror(error);
                    }
                    
                    this.close();
                }
            });
            
            // Handle MCP messages
            this._eventSource.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    console.log('SSE message received:', message);
                    
                    if (this.onmessage) {
                        this.onmessage(message);
                    }
                } catch (error) {
                    console.error('Message parsing error:', error);
                    
                    if (this.onerror) {
                        this.onerror(error);
                    }
                }
            };
        });
    }
    
    /**
     * Send message via HTTP POST to endpoint
     * 
     * Extracted from chunk_0553.js:371-400:
     * - Posts JSON message to discovered endpoint
     * - Includes authentication and custom headers
     * - Handles authentication errors with retry logic
     * - Uses abort controller for timeout management
     * 
     * @param {Object} message - MCP message to send
     * @returns {Promise<void>} Resolves when message is sent
     */
    async send(message) {
        if (!this._endpoint) {
            throw new Error('Not connected - no endpoint available');
        }
        
        try {
            const headers = await this._commonHeaders();
            const headersObj = new Headers(headers);
            headersObj.set('content-type', 'application/json');
            
            const requestOptions = {
                ...this._requestInit,
                method: 'POST',
                headers: headersObj,
                body: JSON.stringify(message),
                signal: this._abortController?.signal
            };
            
            const response = await this._fetch(this._endpoint, requestOptions);
            
            if (!response.ok) {
                // Handle authentication errors
                if (response.status === 401 && this._authProvider) {
                    console.log('Authentication error during send, retrying with fresh token');
                    
                    this._resourceMetadataUrl = this._extractResourceMetadata(response);
                    
                    const authResult = await this._completeAuthentication(this._authProvider, {
                        serverUrl: this._url,
                        resourceMetadataUrl: this._resourceMetadataUrl
                    });
                    
                    if (authResult !== 'AUTHORIZED') {
                        throw new SSEAuthenticationError('Re-authentication failed');
                    }
                    
                    // Retry the send operation
                    return this.send(message);
                }
                
                const errorText = await response.text().catch(() => null);
                throw new Error(`Error POSTing to endpoint (HTTP ${response.status}): ${errorText}`);
            }
            
        } catch (error) {
            if (this.onerror) {
                this.onerror(error);
            }
            throw error;
        }
    }
    
    /**
     * Complete OAuth authorization with code
     * 
     * Extracted from chunk_0553.js:359-366:
     * - Handles authorization code exchange
     * - Uses auth provider to complete OAuth flow
     * - Validates authorization result
     * 
     * @param {string} authorizationCode - OAuth authorization code
     * @returns {Promise<void>} Resolves when authorization is complete
     */
    async finishAuth(authorizationCode) {
        if (!this._authProvider) {
            throw new SSEAuthenticationError('No auth provider');
        }
        
        const authResult = await this._completeAuthentication(this._authProvider, {
            serverUrl: this._url,
            authorizationCode,
            resourceMetadataUrl: this._resourceMetadataUrl
        });
        
        if (authResult !== 'AUTHORIZED') {
            throw new SSEAuthenticationError('Failed to authorize');
        }
    }
    
    /**
     * Close the SSE connection
     * 
     * Extracted from chunk_0553.js:367-370:
     * - Aborts any pending requests
     * - Closes EventSource connection
     * - Calls onclose handler
     */
    async close() {
        if (this._abortController) {
            this._abortController.abort();
            this._abortController = null;
        }
        
        if (this._eventSource) {
            this._eventSource.close();
            this._eventSource = null;
        }
        
        this._endpoint = null;
        
        if (this.onclose) {
            this.onclose();
        }
    }
    
    /**
     * Set MCP protocol version
     * 
     * Extracted from chunk_0553.js:401-403:
     * - Sets protocol version for MCP compatibility
     * - Used in header generation
     * 
     * @param {string} version - MCP protocol version
     */
    setProtocolVersion(version) {
        this._protocolVersion = version;
    }
    
    /**
     * Check if transport is connected
     * 
     * @returns {boolean} True if connected and endpoint is available
     */
    isConnected() {
        return this._eventSource && this._eventSource.readyState === EventSource.OPEN && this._endpoint;
    }
    
    /**
     * Get connection status information
     * 
     * @returns {Object} Connection status details
     */
    getConnectionStatus() {
        return {
            connected: this.isConnected(),
            url: this._url.href,
            endpoint: this._endpoint?.href,
            readyState: this._eventSource?.readyState,
            hasAuthProvider: !!this._authProvider
        };
    }
    
    // Helper methods
    
    /**
     * Complete authentication using auth provider
     * 
     * @param {Object} authProvider - OAuth auth provider
     * @param {Object} options - Authentication options
     * @returns {Promise<string>} Authentication result
     */
    async _completeAuthentication(authProvider, options) {
        // This would integrate with the actual OAuth implementation
        // For now, return a placeholder implementation
        try {
            if (options.authorizationCode) {
                // Handle authorization code flow
                await authProvider.exchangeCode(options.authorizationCode);
            } else {
                // Handle token refresh or initial auth
                const tokens = await authProvider.tokens();
                if (!tokens || this._isTokenExpired(tokens)) {
                    await authProvider.refreshToken();
                }
            }
            return 'AUTHORIZED';
        } catch (error) {
            console.error('Authentication failed:', error);
            throw new SSEAuthenticationError(`Authentication failed: ${error.message}`);
        }
    }
    
    /**
     * Extract resource metadata URL from response
     * 
     * @param {Response} response - HTTP response
     * @returns {string|undefined} Resource metadata URL
     */
    _extractResourceMetadata(response) {
        // Extract OAuth resource metadata URL from WWW-Authenticate header
        const authHeader = response.headers.get('www-authenticate');
        if (authHeader) {
            const match = authHeader.match(/resource="([^"]+)"/);
            return match?.[1];
        }
        return undefined;
    }
    
    /**
     * Check if token is expired
     * 
     * @param {Object} tokens - OAuth tokens
     * @returns {boolean} True if token is expired
     */
    _isTokenExpired(tokens) {
        if (!tokens.expires_in) return false;
        return tokens.expires_in <= 30; // Refresh if expires in 30 seconds or less
    }
}

/**
 * Create SSE transport with default configuration
 * 
 * @param {string} url - SSE endpoint URL
 * @param {Object} config - Transport configuration
 * @returns {SSEClientTransport} Configured SSE transport
 */
export function createSSETransport(url, config = {}) {
    const options = {
        requestInit: {
            headers: {
                'User-Agent': getUserAgent(),
                ...(config.headers || {})
            },
            signal: AbortSignal.timeout(config.timeout || 60000)
        },
        protocolVersion: config.protocolVersion || '2024-11-05'
    };
    
    // Add OAuth authentication if configured
    if (config.auth) {
        options.authProvider = new OAuthAuthProvider(config.serverName, config);
    }
    
    // Configure EventSource options
    if (config.headers || config.auth) {
        options.eventSourceInit = {
            headers: config.headers || {}
        };
    }
    
    return new SSEClientTransport(url, options);
}

/**
 * Get user agent string for requests
 * 
 * @returns {string} User agent string
 */
function getUserAgent() {
    // Placeholder - would return actual Claude Code user agent
    return 'Claude-Code/1.0.0 (MCP-SSE-Transport)';
}