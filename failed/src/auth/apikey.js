/**
 * API Key Authentication Module
 * 
 * Handles API key-based authentication for the Claude Code CLI,
 * including validation, storage, and management of API keys.
 */

import crypto from 'crypto';
import { promises as fs } from 'fs';
import { homedir } from 'os';
import path from 'path';

/**
 * API key configuration
 */
const API_KEY_CONFIG = {
  VALIDATION_URL: 'https://api.anthropic.com/v1/auth/validate',
  API_BASE_URL: 'https://api.anthropic.com/v1',
  MIN_KEY_LENGTH: 32,
  MAX_KEY_LENGTH: 256,
  KEY_PREFIX_PATTERN: /^sk-ant-/,
  STORAGE_DIR: path.join(homedir(), '.claude-cli'),
  CREDENTIALS_FILE: 'credentials.json'
};

/**
 * API Key manager class
 */
export class ApiKeyManager {
  constructor(config = {}) {
    this.config = { ...API_KEY_CONFIG, ...config };
    this.credentialsPath = path.join(this.config.STORAGE_DIR, this.config.CREDENTIALS_FILE);
  }

  /**
   * Validates API key format and structure
   * @param {string} apiKey - API key to validate
   * @returns {Object} Validation result with details
   */
  validateKeyFormat(apiKey) {
    const result = {
      isValid: false,
      errors: [],
      warnings: []
    };

    if (!apiKey || typeof apiKey !== 'string') {
      result.errors.push('API key must be a non-empty string');
      return result;
    }

    const trimmedKey = apiKey.trim();
    
    // Check length
    if (trimmedKey.length < this.config.MIN_KEY_LENGTH) {
      result.errors.push(`API key too short (minimum ${this.config.MIN_KEY_LENGTH} characters)`);
    }
    
    if (trimmedKey.length > this.config.MAX_KEY_LENGTH) {
      result.errors.push(`API key too long (maximum ${this.config.MAX_KEY_LENGTH} characters)`);
    }

    // Check format prefix
    if (!this.config.KEY_PREFIX_PATTERN.test(trimmedKey)) {
      result.warnings.push('API key does not match expected format (should start with sk-ant-)');
    }

    // Check for suspicious characters or patterns
    if (trimmedKey.includes(' ')) {
      result.errors.push('API key contains spaces');
    }

    // Check for common encoding issues
    if (trimmedKey.includes('%') && decodeURIComponent(trimmedKey) !== trimmedKey) {
      result.warnings.push('API key appears to be URL encoded');
    }

    result.isValid = result.errors.length === 0;
    return result;
  }

  /**
   * Validates API key by making a test request to the API
   * @param {string} apiKey - API key to validate
   * @returns {Promise<Object>} Validation result with user info
   */
  async validateKeyWithAPI(apiKey) {
    const formatValidation = this.validateKeyFormat(apiKey);
    
    if (!formatValidation.isValid) {
      return {
        isValid: false,
        errors: formatValidation.errors,
        warnings: formatValidation.warnings
      };
    }

    try {
      const response = await fetch(this.config.VALIDATION_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json',
          'User-Agent': 'claude-cli/1.0'
        }
      });

      if (response.status === 401) {
        return {
          isValid: false,
          errors: ['Invalid API key - authentication failed'],
          warnings: formatValidation.warnings
        };
      }

      if (response.status === 403) {
        return {
          isValid: false,
          errors: ['API key does not have sufficient permissions'],
          warnings: formatValidation.warnings
        };
      }

      if (!response.ok) {
        return {
          isValid: false,
          errors: [`API validation failed: ${response.status} ${response.statusText}`],
          warnings: formatValidation.warnings
        };
      }

      const data = await response.json();
      
      return {
        isValid: true,
        warnings: formatValidation.warnings,
        user: {
          id: data.user?.id,
          email: data.user?.email,
          name: data.user?.name,
          plan: data.user?.plan,
          usage: data.usage
        },
        permissions: data.permissions || [],
        rateLimit: {
          remaining: response.headers.get('x-ratelimit-remaining'),
          reset: response.headers.get('x-ratelimit-reset'),
          limit: response.headers.get('x-ratelimit-limit')
        }
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [`Failed to validate API key: ${error.message}`],
        warnings: formatValidation.warnings
      };
    }
  }

  /**
   * Stores API key securely in local credentials file
   * @param {string} apiKey - API key to store
   * @param {Object} metadata - Additional metadata to store with key
   * @returns {Promise<void>}
   */
  async storeApiKey(apiKey, metadata = {}) {
    try {
      // Ensure storage directory exists
      await fs.mkdir(this.config.STORAGE_DIR, { recursive: true, mode: 0o700 });
      
      const credentials = {
        apiKey: this.encryptApiKey(apiKey),
        metadata: {
          ...metadata,
          createdAt: new Date().toISOString(),
          keyId: this.generateKeyId(apiKey)
        },
        version: '1.0'
      };

      // Write credentials with restricted permissions
      await fs.writeFile(
        this.credentialsPath,
        JSON.stringify(credentials, null, 2),
        { mode: 0o600 }
      );

      console.log('API key stored successfully');
    } catch (error) {
      throw new Error(`Failed to store API key: ${error.message}`);
    }
  }

  /**
   * Retrieves stored API key
   * @returns {Promise<Object|null>} Decrypted API key and metadata or null if not found
   */
  async retrieveApiKey() {
    try {
      const data = await fs.readFile(this.credentialsPath, 'utf8');
      const credentials = JSON.parse(data);
      
      return {
        apiKey: this.decryptApiKey(credentials.apiKey),
        metadata: credentials.metadata,
        version: credentials.version
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null; // No credentials stored
      }
      throw new Error(`Failed to retrieve API key: ${error.message}`);
    }
  }

  /**
   * Removes stored API key
   * @returns {Promise<boolean>} True if key was removed, false if not found
   */
  async removeApiKey() {
    try {
      await fs.unlink(this.credentialsPath);
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false; // No credentials to remove
      }
      throw new Error(`Failed to remove API key: ${error.message}`);
    }
  }

  /**
   * Checks if API key is stored
   * @returns {Promise<boolean>} True if API key exists
   */
  async hasStoredApiKey() {
    try {
      await fs.access(this.credentialsPath);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets API key status and metadata without returning the key itself
   * @returns {Promise<Object|null>} Key metadata or null if not found
   */
  async getApiKeyStatus() {
    try {
      const credentials = await this.retrieveApiKey();
      if (!credentials) {
        return null;
      }

      return {
        hasKey: true,
        keyId: credentials.metadata.keyId,
        createdAt: credentials.metadata.createdAt,
        userInfo: credentials.metadata.user,
        permissions: credentials.metadata.permissions,
        version: credentials.version
      };
    } catch (error) {
      throw new Error(`Failed to get API key status: ${error.message}`);
    }
  }

  /**
   * Rotates API key by validating new key and replacing old one
   * @param {string} newApiKey - New API key to replace current one
   * @returns {Promise<Object>} Validation result for new key
   */
  async rotateApiKey(newApiKey) {
    const validation = await this.validateKeyWithAPI(newApiKey);
    
    if (!validation.isValid) {
      throw new Error(`New API key is invalid: ${validation.errors.join(', ')}`);
    }

    // Store the new key
    await this.storeApiKey(newApiKey, {
      user: validation.user,
      permissions: validation.permissions,
      rotated: true,
      previousKeyId: (await this.getApiKeyStatus())?.keyId
    });

    return validation;
  }

  /**
   * Encrypts API key for storage (simple XOR with key derived from system info)
   * Note: This is basic obfuscation, not cryptographically secure encryption
   * @param {string} apiKey - API key to encrypt
   * @returns {string} Encrypted API key
   */
  encryptApiKey(apiKey) {
    const key = this.getEncryptionKey();
    let encrypted = '';
    
    for (let i = 0; i < apiKey.length; i++) {
      encrypted += String.fromCharCode(apiKey.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    
    return Buffer.from(encrypted, 'binary').toString('base64');
  }

  /**
   * Decrypts API key from storage
   * @param {string} encryptedKey - Encrypted API key
   * @returns {string} Decrypted API key
   */
  decryptApiKey(encryptedKey) {
    const key = this.getEncryptionKey();
    const encrypted = Buffer.from(encryptedKey, 'base64').toString('binary');
    let decrypted = '';
    
    for (let i = 0; i < encrypted.length; i++) {
      decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    
    return decrypted;
  }

  /**
   * Generates encryption key based on system information
   * @returns {string} Encryption key
   */
  getEncryptionKey() {
    const systemInfo = `${homedir()}${process.platform}${process.arch}`;
    return crypto.createHash('sha256').update(systemInfo).digest('hex').substring(0, 32);
  }

  /**
   * Generates a unique identifier for an API key
   * @param {string} apiKey - API key to generate ID for
   * @returns {string} Key ID
   */
  generateKeyId(apiKey) {
    return crypto.createHash('sha256').update(apiKey).digest('hex').substring(0, 16);
  }

  /**
   * Tests API key functionality with a simple request
   * @param {string} apiKey - API key to test
   * @returns {Promise<Object>} Test result
   */
  async testApiKey(apiKey) {
    try {
      const response = await fetch(`${this.config.API_BASE_URL}/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'claude-cli/1.0'
        }
      });

      if (!response.ok) {
        return {
          success: false,
          error: `API test failed: ${response.status} ${response.statusText}`,
          statusCode: response.status
        };
      }

      const data = await response.json();
      
      return {
        success: true,
        models: data.data || [],
        rateLimit: {
          remaining: response.headers.get('x-ratelimit-remaining'),
          reset: response.headers.get('x-ratelimit-reset'),
          limit: response.headers.get('x-ratelimit-limit')
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `API test error: ${error.message}`
      };
    }
  }
}

/**
 * Factory function for API key validation
 * @param {string} apiKey - API key to validate
 * @returns {Promise<Object>} Validation result
 */
export async function validateApiKey(apiKey) {
  const manager = new ApiKeyManager();
  return await manager.validateKeyWithAPI(apiKey);
}

/**
 * Factory function to store API key
 * @param {string} apiKey - API key to store
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<void>}
 */
export async function storeApiKey(apiKey, metadata = {}) {
  const manager = new ApiKeyManager();
  return await manager.storeApiKey(apiKey, metadata);
}

/**
 * Factory function to retrieve stored API key
 * @returns {Promise<Object|null>} Stored API key data or null
 */
export async function getStoredApiKey() {
  const manager = new ApiKeyManager();
  return await manager.retrieveApiKey();
}

export default ApiKeyManager;