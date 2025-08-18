/**
 * Authentication Module Index
 * 
 * Main entry point for the Claude Code CLI authentication system.
 * Provides a clean API for all authentication functionality.
 */

// Main authentication manager
export { 
  AuthenticationManager,
  createAuthManager,
  AUTH_STATES
} from './auth-manager.js';

// OAuth authentication
export { 
  OAuthFlow,
  authenticateWithOAuth
} from './oauth.js';

// API Key authentication
export { 
  ApiKeyManager,
  validateApiKey,
  storeApiKey,
  getStoredApiKey
} from './apikey.js';

// Token management
export { 
  TokenManager,
  createTokenManager,
  isTokenExpired
} from './token-manager.js';

// Session validation
export { 
  SessionValidator,
  createSessionValidator,
  isSessionValid
} from './session-validator.js';

/**
 * Convenience factory function to create a fully configured auth manager
 * @param {Object} config - Configuration options
 * @returns {AuthenticationManager} Configured auth manager
 */
export function createClaudeAuth(config = {}) {
  const { createAuthManager } = await import('./auth-manager.js');
  return createAuthManager({
    PREFERRED_AUTH_METHOD: 'oauth',
    AUTO_REFRESH_TOKENS: true,
    SESSION_MANAGEMENT: true,
    SECURITY_LEVEL: 'standard',
    BACKUP_AUTH_METHODS: ['apikey'],
    ...config
  });
}

/**
 * Quick authentication check
 * @returns {Promise<boolean>} True if user is authenticated
 */
export async function isAuthenticated() {
  try {
    const authManager = await createClaudeAuth();
    await authManager.initialize();
    const status = await authManager.getAuthenticationStatus();
    authManager.cleanup();
    return status.isAuthenticated;
  } catch (error) {
    return false;
  }
}

/**
 * Quick logout function
 * @returns {Promise<boolean>} True if logout successful
 */
export async function logout() {
  try {
    const authManager = await createClaudeAuth();
    await authManager.initialize();
    await authManager.logout();
    authManager.cleanup();
    return true;
  } catch (error) {
    return false;
  }
}

// Default export
export default {
  createClaudeAuth,
  isAuthenticated,
  logout,
  AUTH_STATES
};