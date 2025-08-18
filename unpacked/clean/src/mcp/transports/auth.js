/**
 * OAuth 2.0 Authentication Provider for MCP Transports
 * 
 * Implements OAuth 2.0 with PKCE for MCP server authentication,
 * including client registration, token management, and browser integration.
 * 
 * Key chunks analyzed:
 * - chunk_0583.js:99-180 (Nd class - OAuth 2.0 auth provider)
 * - chunk_0583.js:25-98 (q$ function - OAuth completion flow)
 * - chunk_0583.js client registration and token management
 */

import { randomBytes, createHash } from 'crypto';
import { open as openUrl } from 'open'; // For opening browser URLs
import { configManager } from '../../config/manager.js';

/**
 * OAuth 2.0 Authentication Provider
 * 
 * Extracted from chunk_0583.js:99-180 (Nd class):
 * - Handles OAuth 2.0 authorization code flow with PKCE
 * - Manages client registration and credential storage
 * - Integrates with browser for authorization flow
 * - Handles token refresh and persistence
 */
export class OAuthAuthProvider {
    constructor(serverName, serverConfig, redirectUri = 'http://localhost:3001/oauth/callback', handleRedirection = false) {
        this.serverName = serverName;
        this.serverConfig = serverConfig;
        this.redirectUri = redirectUri;
        this.handleRedirection = handleRedirection;
        
        // OAuth state management
        this._codeVerifier = null;
        this._authorizationUrl = null;
        this._state = null;
    }
    
    /**
     * Get redirect URL for OAuth flow
     */
    get redirectUrl() {
        return this.redirectUri;
    }
    
    /**
     * Get authorization URL for OAuth flow
     */
    get authorizationUrl() {
        return this._authorizationUrl;
    }
    
    /**
     * Client metadata for OAuth registration
     * 
     * Extracted from chunk_0583.js:116-124:
     * - Defines OAuth client metadata according to RFC 7591
     * - Includes supported grant types and response types
     * - Uses no client authentication (public client)
     */
    get clientMetadata() {
        return {
            client_name: `Claude Code (${this.serverName})`,
            redirect_uris: [this.redirectUri],
            grant_types: ['authorization_code', 'refresh_token'],
            response_types: ['code'],
            token_endpoint_auth_method: 'none'
        };
    }
    
    /**
     * Generate or retrieve OAuth state parameter
     * 
     * Extracted from chunk_0583.js:125-128:
     * - Generates cryptographically secure random state
     * - Uses base64url encoding for URL safety
     * - Caches state for session duration
     * 
     * @returns {Promise<string>} OAuth state parameter
     */
    async state() {
        if (!this._state) {
            this._state = this._generateSecureRandom(32).toString('base64url');
            console.log(`Generated new OAuth state for ${this.serverName}`);
        }
        return this._state;
    }
    
    /**
     * Get stored client information
     * 
     * Extracted from chunk_0583.js:129-139:
     * - Retrieves client credentials from persistent storage
     * - Uses server name and config to generate storage key
     * - Returns client_id and client_secret if available
     * 
     * @returns {Promise<Object|undefined>} Client credentials or undefined
     */
    async clientInformation() {
        const settings = this._getSettings();
        const storageKey = this._getStorageKey();
        const clientData = settings?.mcpOAuth?.[storageKey];
        
        if (clientData?.clientId) {
            console.log(`Found client info for ${this.serverName}`);
            return {
                client_id: clientData.clientId,
                client_secret: clientData.clientSecret
            };
        }
        
        console.log(`No client info found for ${this.serverName}`);
        return undefined;
    }
    
    /**
     * Save client information to persistent storage
     * 
     * Extracted from chunk_0583.js:140-160:
     * - Stores OAuth client credentials securely
     * - Preserves existing token data during client updates
     * - Uses structured storage format for multiple servers
     * 
     * @param {Object} clientInfo - Client registration response
     */
    async saveClientInformation(clientInfo) {
        const settings = this._getSettings();
        const storageKey = this._getStorageKey();
        
        const updatedSettings = {
            ...settings,
            mcpOAuth: {
                ...settings.mcpOAuth,
                [storageKey]: {
                    ...settings.mcpOAuth?.[storageKey],
                    serverName: this.serverName,
                    serverUrl: this.serverConfig.url,
                    clientId: clientInfo.client_id,
                    clientSecret: clientInfo.client_secret,
                    // Preserve existing token data
                    accessToken: settings.mcpOAuth?.[storageKey]?.accessToken || '',
                    expiresAt: settings.mcpOAuth?.[storageKey]?.expiresAt || 0
                }
            }
        };
        
        this._saveSettings(updatedSettings);
        console.log(`Saved client info for ${this.serverName}`);
    }
    
    /**
     * Get current OAuth tokens
     * 
     * Extracted from chunk_0583.js:161-180:
     * - Retrieves stored access and refresh tokens
     * - Checks token expiration and validity
     * - Returns token object compatible with OAuth 2.0 spec
     * 
     * @returns {Promise<Object|undefined>} OAuth tokens or undefined
     */
    async tokens() {
        const settings = this._getSettings();
        const storageKey = this._getStorageKey();
        const tokenData = settings?.mcpOAuth?.[storageKey];
        
        if (!tokenData) {
            console.log(`No token data found for ${this.serverName}`);
            return undefined;
        }
        
        const expiresInSeconds = (tokenData.expiresAt - Date.now()) / 1000;
        
        if (expiresInSeconds <= 0 && !tokenData.refreshToken) {
            console.log(`Token expired without refresh token for ${this.serverName}`);
            return undefined;
        }
        
        return {
            access_token: tokenData.accessToken,
            refresh_token: tokenData.refreshToken,
            expires_in: expiresInSeconds,
            scope: tokenData.scope,
            token_type: 'Bearer'
        };
    }
    
    /**
     * Save OAuth tokens to persistent storage
     * 
     * @param {Object} tokens - OAuth token response
     */
    async saveTokens(tokens) {
        const settings = this._getSettings();
        const storageKey = this._getStorageKey();
        
        const expiresAt = tokens.expires_in 
            ? Date.now() + (tokens.expires_in * 1000)
            : Date.now() + (3600 * 1000); // Default 1 hour
        
        const updatedSettings = {
            ...settings,
            mcpOAuth: {
                ...settings.mcpOAuth,
                [storageKey]: {
                    ...settings.mcpOAuth?.[storageKey],
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                    expiresAt,
                    scope: tokens.scope || ''
                }
            }
        };
        
        this._saveSettings(updatedSettings);
        console.log(`Saved tokens for ${this.serverName}, expires at: ${new Date(expiresAt).toISOString()}`);
    }
    
    /**
     * Generate PKCE code verifier and challenge
     * 
     * @returns {Object} Code verifier and challenge
     */
    generatePKCE() {
        // Generate code verifier (43-128 characters, URL-safe)
        this._codeVerifier = this._generateSecureRandom(32).toString('base64url');
        
        // Generate code challenge (SHA256 hash of verifier, base64url encoded)
        const codeChallenge = createHash('sha256')
            .update(this._codeVerifier)
            .digest('base64url');
        
        return {
            code_verifier: this._codeVerifier,
            code_challenge: codeChallenge,
            code_challenge_method: 'S256'
        };
    }
    
    /**
     * Build authorization URL for OAuth flow
     * 
     * @param {string} authorizationEndpoint - OAuth authorization endpoint
     * @param {Object} clientInfo - Client registration info
     * @returns {Promise<string>} Authorization URL
     */
    async buildAuthorizationUrl(authorizationEndpoint, clientInfo) {
        const pkce = this.generatePKCE();
        const state = await this.state();
        
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: clientInfo.client_id,
            redirect_uri: this.redirectUri,
            scope: 'mcpServers',
            state: state,
            code_challenge: pkce.code_challenge,
            code_challenge_method: pkce.code_challenge_method
        });
        
        this._authorizationUrl = `${authorizationEndpoint}?${params.toString()}`;
        return this._authorizationUrl;
    }
    
    /**
     * Exchange authorization code for tokens
     * 
     * @param {string} authorizationCode - OAuth authorization code
     * @param {string} tokenEndpoint - OAuth token endpoint
     * @param {Object} clientInfo - Client registration info
     * @returns {Promise<Object>} Token response
     */
    async exchangeCode(authorizationCode, tokenEndpoint, clientInfo) {
        if (!this._codeVerifier) {
            throw new Error('No code verifier available - must call generatePKCE() first');
        }
        
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: this.redirectUri,
            client_id: clientInfo.client_id,
            code_verifier: this._codeVerifier
        });
        
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: params
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Token exchange failed (${response.status}): ${errorData}`);
        }
        
        const tokens = await response.json();
        await this.saveTokens(tokens);
        
        return tokens;
    }
    
    /**
     * Refresh access token using refresh token
     * 
     * @param {string} tokenEndpoint - OAuth token endpoint
     * @param {Object} clientInfo - Client registration info
     * @returns {Promise<Object>} New token response
     */
    async refreshToken(tokenEndpoint, clientInfo) {
        const currentTokens = await this.tokens();
        if (!currentTokens?.refresh_token) {
            throw new Error('No refresh token available');
        }
        
        const params = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: currentTokens.refresh_token,
            client_id: clientInfo.client_id
        });
        
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: params
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Token refresh failed (${response.status}): ${errorData}`);
        }
        
        const tokens = await response.json();
        await this.saveTokens(tokens);
        
        return tokens;
    }
    
    /**
     * Redirect user to authorization URL
     * 
     * @param {string} authorizationUrl - Authorization URL to open
     */
    async redirectToAuthorization(authorizationUrl) {
        try {
            if (this.handleRedirection) {
                // Open authorization URL in browser
                await openUrl(authorizationUrl);
                console.log(`Opened authorization URL for ${this.serverName}`);
            } else {
                console.log(`Please open this URL to authorize ${this.serverName}:`);
                console.log(authorizationUrl);
            }
        } catch (error) {
            console.error('Failed to open authorization URL:', error);
            console.log(`Please manually open: ${authorizationUrl}`);
        }
    }
    
    /**
     * Clear stored authentication data
     */
    async clearAuth() {
        const settings = this._getSettings();
        const storageKey = this._getStorageKey();
        
        if (settings?.mcpOAuth?.[storageKey]) {
            const updatedSettings = { ...settings };
            delete updatedSettings.mcpOAuth[storageKey];
            
            // Clean up empty mcpOAuth object
            if (Object.keys(updatedSettings.mcpOAuth).length === 0) {
                delete updatedSettings.mcpOAuth;
            }
            
            this._saveSettings(updatedSettings);
            console.log(`Cleared auth data for ${this.serverName}`);
        }
    }
    
    // Private helper methods
    
    /**
     * Generate storage key for server
     * 
     * @returns {string} Storage key based on server name and URL
     */
    _getStorageKey() {
        // Create unique key based on server name and URL
        return `${this.serverName}_${createHash('md5').update(this.serverConfig.url).digest('hex').substring(0, 8)}`;
    }
    
    /**
     * Generate cryptographically secure random bytes
     * 
     * @param {number} size - Number of bytes to generate
     * @returns {Buffer} Random bytes
     */
    _generateSecureRandom(size) {
        return randomBytes(size);
    }
    
    /**
     * Get settings from configuration manager
     * 
     * @returns {Object} Current settings
     */
    _getSettings() {
        try {
            return configManager.list() || {};
        } catch (error) {
            console.warn('Failed to get settings for OAuth:', error);
            return {};
        }
    }
    
    /**
     * Save settings via configuration manager
     * 
     * @param {Object} settings - Settings to save
     */
    _saveSettings(settings) {
        try {
            configManager.save(settings);
        } catch (error) {
            console.error('Failed to save OAuth settings:', error);
            throw new Error(`Failed to save OAuth settings: ${error.message}`);
        }
    }
}

/**
 * OAuth completion flow helper function
 * 
 * Extracted from chunk_0583.js:25-98 (q$ function):
 * - Handles complete OAuth authorization flow
 * - Includes client registration, authorization, and token exchange
 * - Manages error cases and token validation
 * 
 * @param {OAuthAuthProvider} authProvider - OAuth auth provider
 * @param {Object} options - Flow options
 * @returns {Promise<string>} Authorization result
 */
export async function completeOAuthFlow(authProvider, options) {
    const { serverUrl, authorizationCode, resourceMetadataUrl } = options;
    
    try {
        console.log(`Starting OAuth flow for server: ${serverUrl}`);
        
        // Discover OAuth endpoints from resource metadata
        let metadata;
        if (resourceMetadataUrl) {
            const metadataResponse = await fetch(resourceMetadataUrl);
            if (metadataResponse.ok) {
                metadata = await metadataResponse.json();
            }
        }
        
        // Default endpoints if metadata not available
        const authorizationEndpoint = metadata?.authorization_endpoint || `${serverUrl}/oauth/authorize`;
        const tokenEndpoint = metadata?.token_endpoint || `${serverUrl}/oauth/token`;
        const registrationEndpoint = metadata?.registration_endpoint || `${serverUrl}/oauth/register`;
        
        // Get or register OAuth client
        let clientInfo = await authProvider.clientInformation();
        
        if (!clientInfo && registrationEndpoint) {
            console.log('Registering OAuth client...');
            
            const registrationResponse = await fetch(registrationEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(authProvider.clientMetadata)
            });
            
            if (!registrationResponse.ok) {
                throw new Error(`Client registration failed: ${registrationResponse.status}`);
            }
            
            clientInfo = await registrationResponse.json();
            await authProvider.saveClientInformation(clientInfo);
        }
        
        if (!clientInfo) {
            throw new Error('No client information available and registration failed');
        }
        
        // Handle authorization code exchange
        if (authorizationCode) {
            console.log('Exchanging authorization code for tokens...');
            await authProvider.exchangeCode(authorizationCode, tokenEndpoint, clientInfo);
            
            const tokens = await authProvider.tokens();
            if (tokens) {
                console.log(`OAuth flow successful, token expires in: ${tokens.expires_in} seconds`);
                return 'AUTHORIZED';
            } else {
                throw new Error('Failed to retrieve tokens after exchange');
            }
        }
        
        // Check if we have valid tokens
        const existingTokens = await authProvider.tokens();
        if (existingTokens && existingTokens.expires_in > 30) {
            console.log('Using existing valid tokens');
            return 'AUTHORIZED';
        }
        
        // If we have a refresh token, try to refresh
        if (existingTokens?.refresh_token) {
            console.log('Refreshing expired tokens...');
            try {
                await authProvider.refreshToken(tokenEndpoint, clientInfo);
                return 'AUTHORIZED';
            } catch (error) {
                console.warn('Token refresh failed:', error);
                // Fall through to authorization flow
            }
        }
        
        // Start authorization flow
        console.log('Starting authorization flow...');
        const authUrl = await authProvider.buildAuthorizationUrl(authorizationEndpoint, clientInfo);
        await authProvider.redirectToAuthorization(authUrl);
        
        return 'AUTHORIZATION_REQUIRED';
        
    } catch (error) {
        console.error(`OAuth flow error for ${serverUrl}:`, error);
        throw error;
    }
}