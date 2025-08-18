/**
 * Token Manager
 * 
 * Manages the lifecycle of authentication tokens including storage,
 * refresh, expiration handling, and secure management.
 */

import crypto from 'crypto';
import { promises as fs } from 'fs';
import { homedir } from 'os';
import path from 'path';
import { EventEmitter } from 'events';

/**
 * Token manager configuration
 */
const TOKEN_CONFIG = {
  STORAGE_DIR: path.join(homedir(), '.claude-cli'),
  TOKEN_FILE: 'tokens.json',
  REFRESH_THRESHOLD: 300000, // 5 minutes before expiry
  MAX_REFRESH_ATTEMPTS: 3,
  TOKEN_ENCRYPTION_KEY_FILE: '.token-key',
  BACKUP_RETENTION_DAYS: 7
};

/**
 * Token manager class with automatic refresh and secure storage
 */
export class TokenManager extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = { ...TOKEN_CONFIG, ...config };
    this.tokenPath = path.join(this.config.STORAGE_DIR, this.config.TOKEN_FILE);
    this.keyPath = path.join(this.config.STORAGE_DIR, this.config.TOKEN_ENCRYPTION_KEY_FILE);
    this.refreshTimer = null;
    this.refreshPromise = null;
    this.encryptionKey = null;
  }

  /**
   * Stores tokens securely with encryption
   * @param {Object} tokenData - Token data to store
   * @returns {Promise<void>}
   */
  async storeTokens(tokenData) {
    try {
      // Ensure storage directory exists with restricted permissions
      await fs.mkdir(this.config.STORAGE_DIR, { recursive: true, mode: 0o700 });
      
      const encryptedData = await this.encryptTokenData({
        ...tokenData,
        storedAt: Date.now(),
        version: '1.0'
      });

      // Write with restricted permissions
      await fs.writeFile(this.tokenPath, JSON.stringify(encryptedData, null, 2), { mode: 0o600 });
      
      // Schedule automatic refresh if token has expiry
      this.scheduleTokenRefresh(tokenData);
      
      this.emit('tokensStored', tokenData);
      console.log('Tokens stored successfully');
    } catch (error) {
      this.emit('error', error);
      throw new Error(`Failed to store tokens: ${error.message}`);
    }
  }

  /**
   * Retrieves and decrypts stored tokens
   * @returns {Promise<Object|null>} Decrypted token data or null if not found
   */
  async getTokens() {
    try {
      const encryptedData = await fs.readFile(this.tokenPath, 'utf8');
      const tokenData = JSON.parse(encryptedData);
      
      return await this.decryptTokenData(tokenData);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null; // No tokens stored
      }
      throw new Error(`Failed to retrieve tokens: ${error.message}`);
    }
  }

  /**
   * Gets current valid access token, refreshing if necessary
   * @param {Function} refreshFunction - Function to refresh tokens
   * @returns {Promise<string|null>} Valid access token or null
   */
  async getValidAccessToken(refreshFunction = null) {
    const tokens = await this.getTokens();
    
    if (!tokens) {
      return null;
    }

    // Check if token is expired or will expire soon
    if (this.isTokenExpired(tokens) || this.shouldRefreshToken(tokens)) {
      if (refreshFunction && tokens.refreshToken) {
        try {
          const refreshedTokens = await this.refreshTokens(tokens.refreshToken, refreshFunction);
          return refreshedTokens.accessToken;
        } catch (error) {
          this.emit('refreshFailed', error);
          throw error;
        }
      } else {
        this.emit('tokenExpired', tokens);
        return null; // No way to refresh
      }
    }

    return tokens.accessToken;
  }

  /**
   * Refreshes tokens using refresh token
   * @param {string} refreshToken - Refresh token
   * @param {Function} refreshFunction - Function that handles token refresh
   * @returns {Promise<Object>} New token data
   */
  async refreshTokens(refreshToken, refreshFunction) {
    // Prevent concurrent refresh attempts
    if (this.refreshPromise) {
      return await this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh(refreshToken, refreshFunction);
    
    try {
      const result = await this.refreshPromise;
      this.refreshPromise = null;
      return result;
    } catch (error) {
      this.refreshPromise = null;
      throw error;
    }
  }

  /**
   * Performs the actual token refresh operation
   * @param {string} refreshToken - Refresh token
   * @param {Function} refreshFunction - Function that handles token refresh
   * @returns {Promise<Object>} New token data
   */
  async performTokenRefresh(refreshToken, refreshFunction) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.config.MAX_REFRESH_ATTEMPTS; attempt++) {
      try {
        this.emit('refreshAttempt', { attempt, maxAttempts: this.config.MAX_REFRESH_ATTEMPTS });
        
        const newTokens = await refreshFunction(refreshToken);
        
        // Store the new tokens
        await this.storeTokens(newTokens);
        
        this.emit('tokenRefreshed', newTokens);
        return newTokens;
      } catch (error) {
        lastError = error;
        this.emit('refreshError', { attempt, error });
        
        if (attempt < this.config.MAX_REFRESH_ATTEMPTS) {
          // Exponential backoff
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    // All attempts failed
    this.emit('refreshFailed', lastError);
    throw new Error(`Token refresh failed after ${this.config.MAX_REFRESH_ATTEMPTS} attempts: ${lastError.message}`);
  }

  /**
   * Checks if a token is expired
   * @param {Object} tokenData - Token data with expiry information
   * @returns {boolean} True if token is expired
   */
  isTokenExpired(tokenData) {
    if (!tokenData.expiresIn || !tokenData.issuedAt) {
      return false; // No expiry info available
    }
    
    const expiryTime = tokenData.issuedAt + (tokenData.expiresIn * 1000);
    return Date.now() >= expiryTime;
  }

  /**
   * Checks if a token should be refreshed (before it expires)
   * @param {Object} tokenData - Token data with expiry information
   * @returns {boolean} True if token should be refreshed
   */
  shouldRefreshToken(tokenData) {
    if (!tokenData.expiresIn || !tokenData.issuedAt) {
      return false; // No expiry info available
    }
    
    const expiryTime = tokenData.issuedAt + (tokenData.expiresIn * 1000);
    const refreshTime = expiryTime - this.config.REFRESH_THRESHOLD;
    return Date.now() >= refreshTime;
  }

  /**
   * Schedules automatic token refresh
   * @param {Object} tokenData - Token data to schedule refresh for
   */
  scheduleTokenRefresh(tokenData) {
    // Clear existing timer
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }

    if (!tokenData.expiresIn || !tokenData.issuedAt) {
      return; // No expiry info, can't schedule refresh
    }

    const expiryTime = tokenData.issuedAt + (tokenData.expiresIn * 1000);
    const refreshTime = expiryTime - this.config.REFRESH_THRESHOLD;
    const timeUntilRefresh = refreshTime - Date.now();

    if (timeUntilRefresh > 0) {
      this.refreshTimer = setTimeout(() => {
        this.emit('refreshScheduled', tokenData);
      }, timeUntilRefresh);
    }
  }

  /**
   * Removes stored tokens
   * @returns {Promise<boolean>} True if tokens were removed
   */
  async removeTokens() {
    try {
      // Clear refresh timer
      if (this.refreshTimer) {
        clearTimeout(this.refreshTimer);
        this.refreshTimer = null;
      }

      await fs.unlink(this.tokenPath);
      this.emit('tokensRemoved');
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false; // No tokens to remove
      }
      throw new Error(`Failed to remove tokens: ${error.message}`);
    }
  }

  /**
   * Checks if tokens are stored
   * @returns {Promise<boolean>} True if tokens exist
   */
  async hasTokens() {
    try {
      await fs.access(this.tokenPath);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets token status without returning actual tokens
   * @returns {Promise<Object|null>} Token status information
   */
  async getTokenStatus() {
    const tokens = await this.getTokens();
    
    if (!tokens) {
      return null;
    }

    return {
      hasTokens: true,
      isExpired: this.isTokenExpired(tokens),
      shouldRefresh: this.shouldRefreshToken(tokens),
      expiresAt: tokens.expiresIn && tokens.issuedAt ? 
        new Date(tokens.issuedAt + (tokens.expiresIn * 1000)) : null,
      tokenType: tokens.tokenType,
      scope: tokens.scope,
      storedAt: new Date(tokens.storedAt),
      hasRefreshToken: !!tokens.refreshToken
    };
  }

  /**
   * Creates a backup of current tokens
   * @returns {Promise<string>} Backup file path
   */
  async backupTokens() {
    const tokens = await this.getTokens();
    
    if (!tokens) {
      throw new Error('No tokens to backup');
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(this.config.STORAGE_DIR, `tokens-backup-${timestamp}.json`);
    
    const encryptedData = await this.encryptTokenData(tokens);
    await fs.writeFile(backupPath, JSON.stringify(encryptedData, null, 2), { mode: 0o600 });
    
    // Clean old backups
    await this.cleanOldBackups();
    
    return backupPath;
  }

  /**
   * Cleans up old token backups
   * @returns {Promise<number>} Number of backups removed
   */
  async cleanOldBackups() {
    try {
      const files = await fs.readdir(this.config.STORAGE_DIR);
      const backupFiles = files.filter(file => file.startsWith('tokens-backup-'));
      const cutoffTime = Date.now() - (this.config.BACKUP_RETENTION_DAYS * 24 * 60 * 60 * 1000);
      
      let removedCount = 0;
      
      for (const file of backupFiles) {
        const filePath = path.join(this.config.STORAGE_DIR, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime.getTime() < cutoffTime) {
          await fs.unlink(filePath);
          removedCount++;
        }
      }
      
      return removedCount;
    } catch (error) {
      // Non-critical operation, just log the error
      console.warn('Failed to clean old backups:', error.message);
      return 0;
    }
  }

  /**
   * Encrypts token data for secure storage
   * @param {Object} tokenData - Token data to encrypt
   * @returns {Promise<Object>} Encrypted token data
   */
  async encryptTokenData(tokenData) {
    const key = await this.getOrCreateEncryptionKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-cbc', key);
    
    const encrypted = Buffer.concat([
      cipher.update(JSON.stringify(tokenData), 'utf8'),
      cipher.final()
    ]);
    
    return {
      encrypted: encrypted.toString('base64'),
      iv: iv.toString('base64'),
      version: '1.0'
    };
  }

  /**
   * Decrypts token data from storage
   * @param {Object} encryptedData - Encrypted token data
   * @returns {Promise<Object>} Decrypted token data
   */
  async decryptTokenData(encryptedData) {
    const key = await this.getOrCreateEncryptionKey();
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedData.encrypted, 'base64')),
      decipher.final()
    ]);
    
    return JSON.parse(decrypted.toString('utf8'));
  }

  /**
   * Gets or creates encryption key for token storage
   * @returns {Promise<string>} Encryption key
   */
  async getOrCreateEncryptionKey() {
    if (this.encryptionKey) {
      return this.encryptionKey;
    }

    try {
      // Try to read existing key
      this.encryptionKey = await fs.readFile(this.keyPath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Generate new key
        this.encryptionKey = crypto.randomBytes(32).toString('hex');
        await fs.writeFile(this.keyPath, this.encryptionKey, { mode: 0o600 });
      } else {
        throw error;
      }
    }

    return this.encryptionKey;
  }

  /**
   * Validates token structure
   * @param {Object} tokenData - Token data to validate
   * @returns {Object} Validation result
   */
  validateTokenData(tokenData) {
    const result = { isValid: true, errors: [] };

    if (!tokenData || typeof tokenData !== 'object') {
      result.isValid = false;
      result.errors.push('Token data must be an object');
      return result;
    }

    if (!tokenData.accessToken || typeof tokenData.accessToken !== 'string') {
      result.isValid = false;
      result.errors.push('Access token is required and must be a string');
    }

    if (tokenData.tokenType && typeof tokenData.tokenType !== 'string') {
      result.errors.push('Token type must be a string');
    }

    if (tokenData.expiresIn && (!Number.isInteger(tokenData.expiresIn) || tokenData.expiresIn <= 0)) {
      result.errors.push('Expires in must be a positive integer');
    }

    if (tokenData.issuedAt && (!Number.isInteger(tokenData.issuedAt) || tokenData.issuedAt <= 0)) {
      result.errors.push('Issued at must be a positive integer timestamp');
    }

    if (result.errors.length > 0) {
      result.isValid = false;
    }

    return result;
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    
    this.removeAllListeners();
  }
}

/**
 * Factory function to create token manager
 * @param {Object} config - Configuration overrides
 * @returns {TokenManager} New token manager instance
 */
export function createTokenManager(config = {}) {
  return new TokenManager(config);
}

/**
 * Utility function to check token expiry
 * @param {Object} tokenData - Token data
 * @returns {boolean} True if expired
 */
export function isTokenExpired(tokenData) {
  const manager = new TokenManager();
  return manager.isTokenExpired(tokenData);
}

export default TokenManager;