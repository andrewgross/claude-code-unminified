/**
 * OAuth Authentication Flow Handler
 * 
 * Handles OAuth 2.0 with PKCE (Proof Key for Code Exchange) authentication flow
 * for secure authentication in the Claude Code CLI.
 */

import crypto from 'crypto';
import { spawn } from 'child_process';
import http from 'http';
import { URL } from 'url';

/**
 * OAuth configuration and endpoints
 */
const OAUTH_CONFIG = {
  AUTH_BASE_URL: 'https://claude.ai/api/auth',
  TOKEN_URL: 'https://api.anthropic.com/oauth/token',
  CLIENT_ID: process.env.CLAUDE_CLIENT_ID || 'claude-cli',
  REDIRECT_URI: 'http://localhost:3000/auth/callback',
  SCOPES: ['read', 'write'],
  RESPONSE_TYPE: 'code',
  LOCAL_PORT: 3000
};

/**
 * OAuth flow manager with PKCE support
 */
export class OAuthFlow {
  constructor(config = {}) {
    this.config = { ...OAUTH_CONFIG, ...config };
    this.codeVerifier = null;
    this.codeChallenge = null;
    this.state = null;
    this.server = null;
  }

  /**
   * Generates PKCE code verifier and challenge
   * @returns {Object} Object containing verifier and challenge
   */
  generatePKCEChallenge() {
    // Generate a random 128-character string for code_verifier
    this.codeVerifier = crypto.randomBytes(64).toString('base64url');
    
    // Create code_challenge using SHA256 hash of code_verifier
    const hash = crypto.createHash('sha256').update(this.codeVerifier).digest();
    this.codeChallenge = hash.toString('base64url');
    
    return {
      codeVerifier: this.codeVerifier,
      codeChallenge: this.codeChallenge,
      codeChallengeMethod: 'S256'
    };
  }

  /**
   * Generates a random state parameter for CSRF protection
   * @returns {string} Random state string
   */
  generateState() {
    this.state = crypto.randomBytes(32).toString('hex');
    return this.state;
  }

  /**
   * Constructs the authorization URL with all required parameters
   * @returns {string} Complete authorization URL
   */
  buildAuthorizationUrl() {
    const pkce = this.generatePKCEChallenge();
    const state = this.generateState();
    
    const params = new URLSearchParams({
      client_id: this.config.CLIENT_ID,
      redirect_uri: this.config.REDIRECT_URI,
      response_type: this.config.RESPONSE_TYPE,
      scope: this.config.SCOPES.join(' '),
      state: state,
      code_challenge: pkce.codeChallenge,
      code_challenge_method: pkce.codeChallengeMethod
    });

    return `${this.config.AUTH_BASE_URL}/authorize?${params.toString()}`;
  }

  /**
   * Starts the OAuth flow by opening browser and starting local server
   * @returns {Promise<Object>} Promise that resolves with access token data
   */
  async startAuthFlow() {
    return new Promise((resolve, reject) => {
      const authUrl = this.buildAuthorizationUrl();
      
      // Start local server to handle callback
      this.server = http.createServer(async (req, res) => {
        try {
          const urlParts = new URL(req.url, `http://localhost:${this.config.LOCAL_PORT}`);
          
          if (urlParts.pathname === '/auth/callback') {
            await this.handleCallback(urlParts.searchParams, res, resolve, reject);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
          }
        } catch (error) {
          reject(error);
        }
      });

      this.server.listen(this.config.LOCAL_PORT, () => {
        console.log(`OAuth server listening on port ${this.config.LOCAL_PORT}`);
        this.openBrowser(authUrl);
      });

      this.server.on('error', (error) => {
        reject(new Error(`Server error: ${error.message}`));
      });

      // Timeout after 5 minutes
      setTimeout(() => {
        this.cleanup();
        reject(new Error('OAuth flow timed out after 5 minutes'));
      }, 300000);
    });
  }

  /**
   * Handles the OAuth callback from the authorization server
   * @param {URLSearchParams} params - URL search parameters from callback
   * @param {http.ServerResponse} res - HTTP response object
   * @param {Function} resolve - Promise resolve function
   * @param {Function} reject - Promise reject function
   */
  async handleCallback(params, res, resolve, reject) {
    try {
      const code = params.get('code');
      const state = params.get('state');
      const error = params.get('error');
      const errorDescription = params.get('error_description');

      if (error) {
        const errorMsg = `OAuth error: ${error}${errorDescription ? ` - ${errorDescription}` : ''}`;
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>Authentication Failed</h1><p>${errorMsg}</p>`);
        this.cleanup();
        reject(new Error(errorMsg));
        return;
      }

      if (!code) {
        const errorMsg = 'No authorization code received';
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>Authentication Failed</h1><p>${errorMsg}</p>`);
        this.cleanup();
        reject(new Error(errorMsg));
        return;
      }

      if (state !== this.state) {
        const errorMsg = 'Invalid state parameter - possible CSRF attack';
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>Authentication Failed</h1><p>${errorMsg}</p>`);
        this.cleanup();
        reject(new Error(errorMsg));
        return;
      }

      // Exchange authorization code for access token
      const tokenData = await this.exchangeCodeForToken(code);
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Authentication Successful!</h1>
        <p>You can now close this window and return to your terminal.</p>
        <script>window.close();</script>
      `);
      
      this.cleanup();
      resolve(tokenData);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`<h1>Authentication Error</h1><p>${error.message}</p>`);
      this.cleanup();
      reject(error);
    }
  }

  /**
   * Exchanges authorization code for access token using PKCE
   * @param {string} authorizationCode - Authorization code from callback
   * @returns {Promise<Object>} Token response data
   */
  async exchangeCodeForToken(authorizationCode) {
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: this.config.CLIENT_ID,
      code: authorizationCode,
      redirect_uri: this.config.REDIRECT_URI,
      code_verifier: this.codeVerifier
    });

    try {
      const response = await fetch(this.config.TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'User-Agent': 'claude-cli/1.0'
        },
        body: tokenParams.toString()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Token exchange failed: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const tokenData = await response.json();
      
      // Validate required fields
      if (!tokenData.access_token) {
        throw new Error('Invalid token response: missing access_token');
      }

      return {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        tokenType: tokenData.token_type || 'Bearer',
        expiresIn: tokenData.expires_in,
        scope: tokenData.scope,
        issuedAt: Date.now()
      };
    } catch (error) {
      throw new Error(`Failed to exchange authorization code: ${error.message}`);
    }
  }

  /**
   * Opens the authorization URL in the default browser
   * @param {string} url - Authorization URL to open
   */
  openBrowser(url) {
    const platform = process.platform;
    let command;
    
    switch (platform) {
      case 'darwin': // macOS
        command = 'open';
        break;
      case 'win32': // Windows
        command = 'start';
        break;
      default: // Linux and others
        command = 'xdg-open';
        break;
    }

    try {
      spawn(command, [url], { detached: true, stdio: 'ignore' });
      console.log('Opening browser for authentication...');
    } catch (error) {
      console.error('Failed to open browser automatically. Please visit this URL:');
      console.log(url);
    }
  }

  /**
   * Cleans up resources (closes server)
   */
  cleanup() {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }

  /**
   * Refreshes an expired access token using refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} New token data
   */
  async refreshAccessToken(refreshToken) {
    const refreshParams = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: this.config.CLIENT_ID,
      refresh_token: refreshToken
    });

    try {
      const response = await fetch(this.config.TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'User-Agent': 'claude-cli/1.0'
        },
        body: refreshParams.toString()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Token refresh failed: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown error'}`);
      }

      const tokenData = await response.json();
      
      return {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token || refreshToken, // Keep old refresh token if new one not provided
        tokenType: tokenData.token_type || 'Bearer',
        expiresIn: tokenData.expires_in,
        scope: tokenData.scope,
        issuedAt: Date.now()
      };
    } catch (error) {
      throw new Error(`Failed to refresh access token: ${error.message}`);
    }
  }
}

/**
 * Factory function to create and start OAuth flow
 * @param {Object} config - OAuth configuration overrides
 * @returns {Promise<Object>} Promise that resolves with token data
 */
export async function authenticateWithOAuth(config = {}) {
  const oauthFlow = new OAuthFlow(config);
  return await oauthFlow.startAuthFlow();
}

export default OAuthFlow;