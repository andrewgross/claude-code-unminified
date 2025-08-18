/**
 * Token Manager
 * 
 * Manages authentication tokens for Claude API access.
 * Supports secure token storage and validation.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as readline from 'readline';
import { configManager } from '../../config/manager.js';

// Token storage paths
const TOKEN_DIR = path.join(os.homedir(), '.config', 'claude');
const TOKEN_FILE = path.join(TOKEN_DIR, 'auth_token');

export class TokenManager {
    constructor() {
        this.tokenCache = null;
        this.tokenExpiry = null;
    }
    
    /**
     * Get the path to the token file
     * @returns {string} Path to token file
     */
    getTokenPath() {
        const configuredPath = configManager.get('auth.tokenPath');
        return configuredPath || TOKEN_FILE;
    }
    
    /**
     * Create readline interface for user input
     * @returns {readline.Interface}
     */
    _createReadlineInterface() {
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    /**
     * Prompt for user input
     * @param {string} question - Question to ask
     * @param {boolean} hidden - Whether to hide input (for passwords)
     * @returns {Promise<string>} User input
     */
    _prompt(question, hidden = false) {
        return new Promise((resolve) => {
            const rl = this._createReadlineInterface();
            
            if (hidden) {
                // Hide input for sensitive data
                rl.stdoutMuted = true;
                rl._writeToOutput = function _writeToOutput(stringToWrite) {
                    if (rl.stdoutMuted) {
                        rl.output.write('*');
                    } else {
                        rl.output.write(stringToWrite);
                    }
                };
            }
            
            rl.question(question, (answer) => {
                if (hidden) {
                    rl.output.write('\\n');
                }
                rl.close();
                resolve(answer.trim());
            });
        });
    }
    
    /**
     * Validate token format
     * @param {string} token - Token to validate
     * @returns {boolean} Whether token format is valid
     */
    _validateTokenFormat(token) {
        if (!token || typeof token !== 'string') {
            return false;
        }
        
        // Basic token format validation
        // Claude API tokens typically start with specific prefixes
        const validPrefixes = ['sk-ant-', 'claude-'];
        const hasValidPrefix = validPrefixes.some(prefix => token.startsWith(prefix));
        
        // Check minimum length
        const hasValidLength = token.length >= 20;
        
        return hasValidPrefix && hasValidLength;
    }
    
    /**
     * Test token with Claude API
     * @param {string} token - Token to test
     * @returns {Promise<boolean>} Whether token is valid
     */
    async _testToken(token) {
        // TODO: Implement actual API validation
        // For now, just validate format
        if (!this._validateTokenFormat(token)) {
            return false;
        }
        
        // In a real implementation, this would make an API call to validate the token
        console.log('Token format validation passed');
        console.log('⚠️  API validation not implemented - assuming token is valid');
        
        return true;
    }
    
    /**
     * Set up authentication token interactively
     */
    async setupInteractive() {
        console.log('Claude Code Authentication Setup');
        console.log('================================\\n');
        
        console.log('To use Claude Code, you need to provide an authentication token.');
        console.log('You can get a token from: https://console.anthropic.com/\\n');
        
        const token = await this._prompt('Enter your Claude API token: ', true);
        
        if (!token) {
            console.log('\\nNo token provided. Exiting...');
            process.exit(1);
        }
        
        console.log('\\nValidating token...');
        
        const isValid = await this._testToken(token);
        
        if (!isValid) {
            console.log('❌ Invalid token format or token validation failed');
            console.log('Please check your token and try again');
            process.exit(1);
        }
        
        console.log('✅ Token validated successfully');
        
        // Save token securely
        await this.saveToken(token);
        
        console.log('✅ Token saved successfully');
        console.log('\\nYou can now use Claude Code!');
    }
    
    /**
     * Save token to secure storage
     * @param {string} token - Token to save
     */
    async saveToken(token) {
        const tokenPath = this.getTokenPath();
        const tokenDir = path.dirname(tokenPath);
        
        try {
            // Ensure directory exists
            fs.mkdirSync(tokenDir, { recursive: true });
            
            // Set restrictive permissions on directory
            fs.chmodSync(tokenDir, 0o700);
            
            // Save token with restricted permissions
            fs.writeFileSync(tokenPath, token, { 
                encoding: 'utf8',
                mode: 0o600  // Only readable by owner
            });
            
            // Clear cache to force reload
            this.tokenCache = null;
            
        } catch (error) {
            throw new Error(`Failed to save token: ${error.message}`);
        }
    }
    
    /**
     * Load token from storage
     * @returns {string|null} Stored token or null if not found
     */
    _loadToken() {
        if (this.tokenCache) {
            return this.tokenCache;
        }
        
        const tokenPath = this.getTokenPath();
        
        try {
            if (fs.existsSync(tokenPath)) {
                const token = fs.readFileSync(tokenPath, 'utf8').trim();
                this.tokenCache = token;
                return token;
            }
        } catch (error) {
            console.warn(`Warning: Failed to read token file: ${error.message}`);
        }
        
        return null;
    }
    
    /**
     * Get current authentication token
     * @returns {string|null} Current token or null if not available
     */
    async getToken() {
        const token = this._loadToken();
        
        if (!token) {
            return null;
        }
        
        // TODO: Add token expiry checking
        // TODO: Add automatic token refresh
        
        return token;
    }
    
    /**
     * Check if user is authenticated
     * @returns {boolean} Whether user has a valid token
     */
    async isAuthenticated() {
        const token = await this.getToken();
        return token !== null && this._validateTokenFormat(token);
    }
    
    /**
     * Clear stored authentication token
     */
    async clearToken() {
        const tokenPath = this.getTokenPath();
        
        try {
            if (fs.existsSync(tokenPath)) {
                fs.unlinkSync(tokenPath);
                console.log('✅ Authentication token cleared');
            } else {
                console.log('No token found to clear');
            }
            
            // Clear cache
            this.tokenCache = null;
            
        } catch (error) {
            throw new Error(`Failed to clear token: ${error.message}`);
        }
    }
    
    /**
     * Get token info for display
     * @returns {object} Token information
     */
    async getTokenInfo() {
        const token = await this.getToken();
        
        if (!token) {
            return {
                authenticated: false,
                tokenPath: this.getTokenPath(),
                message: 'No authentication token found'
            };
        }
        
        // Mask token for display
        const maskedToken = token.length > 8 
            ? `${token.substring(0, 4)}...${token.substring(token.length - 4)}`
            : '****';
        
        return {
            authenticated: true,
            tokenPath: this.getTokenPath(),
            maskedToken,
            tokenLength: token.length,
            message: 'Authentication token is configured'
        };
    }
}

// Export singleton instance
export const tokenManager = new TokenManager();