/**
 * Authentication Manager
 * 
 * Main authentication coordinator that orchestrates OAuth, API key authentication,
 * token management, and session validation for the Claude Code CLI.
 */

import { EventEmitter } from 'events';
import { OAuthFlow } from './oauth.js';
import { ApiKeyManager } from './apikey.js';
import { TokenManager } from './token-manager.js';
import { SessionValidator } from './session-validator.js';

/**
 * Authentication manager configuration
 */
const AUTH_CONFIG = {
  PREFERRED_AUTH_METHOD: 'oauth', // 'oauth' | 'apikey'
  AUTO_REFRESH_TOKENS: true,
  SESSION_MANAGEMENT: true,
  SECURITY_LEVEL: 'standard', // 'basic' | 'standard' | 'strict'
  BACKUP_AUTH_METHODS: ['apikey'], // Fallback methods
  TOKEN_REFRESH_THRESHOLD: 300000, // 5 minutes
  MAX_AUTH_ATTEMPTS: 3
};

/**
 * Authentication states
 */
export const AUTH_STATES = {
  UNAUTHENTICATED: 'unauthenticated',
  AUTHENTICATING: 'authenticating',
  AUTHENTICATED: 'authenticated',
  TOKEN_EXPIRED: 'token_expired',
  REFRESHING: 'refreshing',
  SESSION_INVALID: 'session_invalid',
  ERROR: 'error'
};

/**
 * Main authentication manager class
 */
export class AuthenticationManager extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = { ...AUTH_CONFIG, ...config };
    
    // Initialize component managers
    this.oauthFlow = new OAuthFlow();
    this.apiKeyManager = new ApiKeyManager();
    this.tokenManager = new TokenManager();
    this.sessionValidator = new SessionValidator({ 
      SECURITY_LEVEL: this.config.SECURITY_LEVEL 
    });

    // State management
    this.currentState = AUTH_STATES.UNAUTHENTICATED;
    this.currentUser = null;
    this.authMethod = null;
    this.authAttempts = 0;

    // Set up event listeners
    this.setupEventListeners();
  }

  /**
   * Sets up event listeners for all auth components
   */
  setupEventListeners() {
    // Token manager events
    this.tokenManager.on('tokenRefreshed', (tokens) => {
      this.emit('tokenRefreshed', tokens);
      this.setState(AUTH_STATES.AUTHENTICATED);
    });

    this.tokenManager.on('refreshFailed', (error) => {
      this.emit('refreshFailed', error);
      this.setState(AUTH_STATES.TOKEN_EXPIRED);
    });

    this.tokenManager.on('tokenExpired', (tokens) => {
      this.emit('tokenExpired', tokens);
      this.setState(AUTH_STATES.TOKEN_EXPIRED);
    });

    // Session validator events
    this.sessionValidator.on('sessionTerminated', (info) => {
      this.emit('sessionTerminated', info);
      this.setState(AUTH_STATES.UNAUTHENTICATED);
      this.currentUser = null;
      this.authMethod = null;
    });

    this.sessionValidator.on('validationFailed', (info) => {
      this.emit('sessionValidationFailed', info);
      
      if (info.reason === 'session_terminated') {
        this.setState(AUTH_STATES.SESSION_INVALID);
      }
    });
  }

  /**
   * Initializes authentication system and checks existing credentials
   * @returns {Promise<Object>} Initialization result
   */
  async initialize() {
    try {
      this.setState(AUTH_STATES.AUTHENTICATING);
      
      // Check for existing session
      if (this.config.SESSION_MANAGEMENT) {
        const hasValidSession = await this.sessionValidator.hasActiveSession();
        
        if (hasValidSession) {
          const sessionInfo = await this.sessionValidator.getSessionInfo();
          this.currentUser = {
            email: sessionInfo.userEmail,
            authMethod: sessionInfo.authMethod
          };
          this.authMethod = sessionInfo.authMethod;
          this.setState(AUTH_STATES.AUTHENTICATED);
          
          this.emit('initialized', {
            authenticated: true,
            method: this.authMethod,
            user: this.currentUser
          });
          
          return {
            authenticated: true,
            method: this.authMethod,
            user: this.currentUser,
            sessionInfo
          };
        }
      }

      // Check for stored tokens
      const tokenStatus = await this.tokenManager.getTokenStatus();
      
      if (tokenStatus?.hasTokens) {
        if (!tokenStatus.isExpired) {
          // Try to restore session from tokens
          const restored = await this.restoreFromTokens();
          if (restored) {
            this.setState(AUTH_STATES.AUTHENTICATED);
            this.emit('initialized', {
              authenticated: true,
              method: this.authMethod,
              user: this.currentUser,
              restored: true
            });
            
            return {
              authenticated: true,
              method: this.authMethod,
              user: this.currentUser,
              restored: true
            };
          }
        } else {
          // Tokens expired, try refresh
          if (tokenStatus.hasRefreshToken) {
            try {
              await this.refreshAuthentication();
              this.setState(AUTH_STATES.AUTHENTICATED);
              
              this.emit('initialized', {
                authenticated: true,
                method: this.authMethod,
                user: this.currentUser,
                refreshed: true
              });
              
              return {
                authenticated: true,
                method: this.authMethod,
                user: this.currentUser,
                refreshed: true
              };
            } catch (error) {
              // Refresh failed, continue to unauthenticated state
            }
          }
        }
      }

      // Check for stored API key as fallback
      const hasApiKey = await this.apiKeyManager.hasStoredApiKey();
      
      if (hasApiKey) {
        try {
          const apiKeyData = await this.apiKeyManager.retrieveApiKey();
          const validation = await this.apiKeyManager.validateKeyWithAPI(apiKeyData.apiKey);
          
          if (validation.isValid) {
            this.currentUser = validation.user;
            this.authMethod = 'apikey';
            this.setState(AUTH_STATES.AUTHENTICATED);
            
            // Create session for API key auth
            if (this.config.SESSION_MANAGEMENT) {
              await this.sessionValidator.createSession({
                userId: validation.user.id,
                userEmail: validation.user.email,
                permissions: validation.permissions,
                plan: validation.user.plan,
                authMethod: 'apikey'
              });
            }
            
            this.emit('initialized', {
              authenticated: true,
              method: 'apikey',
              user: this.currentUser
            });
            
            return {
              authenticated: true,
              method: 'apikey',
              user: this.currentUser
            };
          }
        } catch (error) {
          // API key validation failed, continue
        }
      }

      // No valid authentication found
      this.setState(AUTH_STATES.UNAUTHENTICATED);
      this.emit('initialized', { authenticated: false });
      
      return { authenticated: false };
    } catch (error) {
      this.setState(AUTH_STATES.ERROR);
      this.emit('error', error);
      throw new Error(`Authentication initialization failed: ${error.message}`);
    }
  }

  /**
   * Authenticates user with the preferred method
   * @param {Object} options - Authentication options
   * @returns {Promise<Object>} Authentication result
   */
  async authenticate(options = {}) {
    const method = options.method || this.config.PREFERRED_AUTH_METHOD;
    
    if (this.authAttempts >= this.config.MAX_AUTH_ATTEMPTS) {
      throw new Error('Maximum authentication attempts exceeded');
    }

    this.authAttempts++;
    this.setState(AUTH_STATES.AUTHENTICATING);

    try {
      let result;
      
      switch (method) {
        case 'oauth':
          result = await this.authenticateWithOAuth(options);
          break;
        case 'apikey':
          result = await this.authenticateWithApiKey(options);
          break;
        default:
          throw new Error(`Unsupported authentication method: ${method}`);
      }

      // Reset attempt counter on successful auth
      this.authAttempts = 0;
      
      this.setState(AUTH_STATES.AUTHENTICATED);
      this.emit('authenticated', result);
      
      return result;
    } catch (error) {
      this.setState(AUTH_STATES.ERROR);
      this.emit('authenticationFailed', { method, error: error.message, attempts: this.authAttempts });
      throw error;
    }
  }

  /**
   * Authenticates using OAuth flow
   * @param {Object} options - OAuth options
   * @returns {Promise<Object>} Authentication result
   */
  async authenticateWithOAuth(options = {}) {
    try {
      // Start OAuth flow
      const tokenData = await this.oauthFlow.startAuthFlow();
      
      // Store tokens
      await this.tokenManager.storeTokens(tokenData);
      
      // Get user information from API
      const userInfo = await this.getUserInfoFromToken(tokenData.accessToken);
      
      this.currentUser = userInfo;
      this.authMethod = 'oauth';

      // Create session
      if (this.config.SESSION_MANAGEMENT) {
        await this.sessionValidator.createSession({
          userId: userInfo.id,
          userEmail: userInfo.email,
          permissions: userInfo.permissions,
          plan: userInfo.plan,
          authMethod: 'oauth'
        });
      }

      return {
        success: true,
        method: 'oauth',
        user: this.currentUser,
        tokens: {
          hasAccessToken: !!tokenData.accessToken,
          hasRefreshToken: !!tokenData.refreshToken,
          expiresIn: tokenData.expiresIn
        }
      };
    } catch (error) {
      throw new Error(`OAuth authentication failed: ${error.message}`);
    }
  }

  /**
   * Authenticates using API key
   * @param {Object} options - API key options
   * @returns {Promise<Object>} Authentication result
   */
  async authenticateWithApiKey(options = {}) {
    try {
      const apiKey = options.apiKey;
      
      if (!apiKey) {
        throw new Error('API key is required');
      }

      // Validate API key
      const validation = await this.apiKeyManager.validateKeyWithAPI(apiKey);
      
      if (!validation.isValid) {
        throw new Error(`Invalid API key: ${validation.errors.join(', ')}`);
      }

      // Store API key
      await this.apiKeyManager.storeApiKey(apiKey, {
        user: validation.user,
        permissions: validation.permissions
      });

      this.currentUser = validation.user;
      this.authMethod = 'apikey';

      // Create session
      if (this.config.SESSION_MANAGEMENT) {
        await this.sessionValidator.createSession({
          userId: validation.user.id,
          userEmail: validation.user.email,
          permissions: validation.permissions,
          plan: validation.user.plan,
          authMethod: 'apikey'
        });
      }

      return {
        success: true,
        method: 'apikey',
        user: this.currentUser,
        validation: {
          warnings: validation.warnings,
          permissions: validation.permissions,
          rateLimit: validation.rateLimit
        }
      };
    } catch (error) {
      throw new Error(`API key authentication failed: ${error.message}`);
    }
  }

  /**
   * Gets user information from access token
   * @param {string} accessToken - Access token
   * @returns {Promise<Object>} User information
   */
  async getUserInfoFromToken(accessToken) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'claude-cli/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get user info: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to retrieve user information: ${error.message}`);
    }
  }

  /**
   * Refreshes authentication tokens
   * @returns {Promise<Object>} Refresh result
   */
  async refreshAuthentication() {
    if (this.currentState === AUTH_STATES.REFRESHING) {
      // Already refreshing, wait for completion
      return new Promise((resolve) => {
        this.once('tokenRefreshed', resolve);
        this.once('refreshFailed', (error) => {
          throw error;
        });
      });
    }

    this.setState(AUTH_STATES.REFRESHING);

    try {
      const tokens = await this.tokenManager.getTokens();
      
      if (!tokens?.refreshToken) {
        throw new Error('No refresh token available');
      }

      const refreshedTokens = await this.oauthFlow.refreshAccessToken(tokens.refreshToken);
      await this.tokenManager.storeTokens(refreshedTokens);
      
      this.setState(AUTH_STATES.AUTHENTICATED);
      
      return {
        success: true,
        tokens: {
          hasAccessToken: !!refreshedTokens.accessToken,
          hasRefreshToken: !!refreshedTokens.refreshToken,
          expiresIn: refreshedTokens.expiresIn
        }
      };
    } catch (error) {
      this.setState(AUTH_STATES.TOKEN_EXPIRED);
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }

  /**
   * Logs out user and clears all authentication data
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      this.emit('loggingOut', { user: this.currentUser, method: this.authMethod });

      // Terminate session
      if (this.config.SESSION_MANAGEMENT) {
        await this.sessionValidator.terminateSession('user_logout');
      }

      // Remove tokens
      await this.tokenManager.removeTokens();

      // Remove API key if using API key auth
      if (this.authMethod === 'apikey') {
        await this.apiKeyManager.removeApiKey();
      }

      // Clean up OAuth flow
      this.oauthFlow.cleanup();

      // Reset state
      this.currentUser = null;
      this.authMethod = null;
      this.authAttempts = 0;
      this.setState(AUTH_STATES.UNAUTHENTICATED);

      this.emit('loggedOut');
    } catch (error) {
      this.emit('error', error);
      throw new Error(`Logout failed: ${error.message}`);
    }
  }

  /**
   * Gets current authentication status
   * @returns {Promise<Object>} Authentication status
   */
  async getAuthenticationStatus() {
    try {
      const status = {
        isAuthenticated: this.currentState === AUTH_STATES.AUTHENTICATED,
        currentState: this.currentState,
        user: this.currentUser,
        authMethod: this.authMethod,
        authAttempts: this.authAttempts
      };

      if (this.currentState === AUTH_STATES.AUTHENTICATED) {
        // Get detailed status
        if (this.config.SESSION_MANAGEMENT) {
          status.session = await this.sessionValidator.getSessionInfo();
        }

        if (this.authMethod === 'oauth') {
          status.tokens = await this.tokenManager.getTokenStatus();
        } else if (this.authMethod === 'apikey') {
          status.apiKey = await this.apiKeyManager.getApiKeyStatus();
        }
      }

      return status;
    } catch (error) {
      return {
        isAuthenticated: false,
        currentState: AUTH_STATES.ERROR,
        error: error.message
      };
    }
  }

  /**
   * Gets valid access token for API requests
   * @returns {Promise<string|null>} Valid access token or null
   */
  async getAccessToken() {
    if (this.authMethod === 'apikey') {
      const apiKeyData = await this.apiKeyManager.retrieveApiKey();
      return apiKeyData?.apiKey || null;
    } else if (this.authMethod === 'oauth') {
      return await this.tokenManager.getValidAccessToken(
        (refreshToken) => this.oauthFlow.refreshAccessToken(refreshToken)
      );
    }

    return null;
  }

  /**
   * Validates current authentication
   * @returns {Promise<boolean>} True if authentication is valid
   */
  async validateAuthentication() {
    if (this.currentState !== AUTH_STATES.AUTHENTICATED) {
      return false;
    }

    try {
      // Validate session if enabled
      if (this.config.SESSION_MANAGEMENT) {
        const sessionValid = await this.sessionValidator.validateSession();
        if (!sessionValid.isValid) {
          return false;
        }
      }

      // Test API access
      const accessToken = await this.getAccessToken();
      if (!accessToken) {
        return false;
      }

      // Make test API call
      if (this.authMethod === 'apikey') {
        const testResult = await this.apiKeyManager.testApiKey(accessToken);
        return testResult.success;
      } else if (this.authMethod === 'oauth') {
        // Test token with a simple API call
        const response = await fetch('https://api.anthropic.com/v1/user', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'claude-cli/1.0'
          }
        });
        return response.ok;
      }

      return false;
    } catch (error) {
      this.emit('validationError', error);
      return false;
    }
  }

  /**
   * Restores authentication from stored tokens
   * @returns {Promise<boolean>} True if restoration successful
   */
  async restoreFromTokens() {
    try {
      const tokens = await this.tokenManager.getTokens();
      
      if (!tokens) {
        return false;
      }

      // Get user info from stored token
      const userInfo = await this.getUserInfoFromToken(tokens.accessToken);
      
      this.currentUser = userInfo;
      this.authMethod = 'oauth';

      // Recreate session
      if (this.config.SESSION_MANAGEMENT) {
        await this.sessionValidator.createSession({
          userId: userInfo.id,
          userEmail: userInfo.email,
          permissions: userInfo.permissions,
          plan: userInfo.plan,
          authMethod: 'oauth'
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Sets current authentication state
   * @param {string} newState - New authentication state
   */
  setState(newState) {
    const previousState = this.currentState;
    this.currentState = newState;
    this.emit('stateChanged', { previous: previousState, current: newState });
  }

  /**
   * Records user activity
   */
  recordActivity() {
    if (this.config.SESSION_MANAGEMENT) {
      this.sessionValidator.recordActivity();
    }
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    this.oauthFlow.cleanup();
    this.tokenManager.cleanup();
    this.sessionValidator.cleanup();
    this.removeAllListeners();
  }
}

/**
 * Factory function to create authentication manager
 * @param {Object} config - Configuration options
 * @returns {AuthenticationManager} New authentication manager instance
 */
export function createAuthManager(config = {}) {
  return new AuthenticationManager(config);
}

export default AuthenticationManager;