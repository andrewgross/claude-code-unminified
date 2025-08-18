/**
 * Configuration Manager
 * 
 * Handles reading and writing configuration values to local and global config files.
 * Supports nested key access and JSON file persistence.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Configuration file paths
const LOCAL_CONFIG_FILE = '.claude.json';
const GLOBAL_CONFIG_DIR = path.join(os.homedir(), '.config', 'claude');
const GLOBAL_CONFIG_FILE = path.join(GLOBAL_CONFIG_DIR, 'config.json');

// Default configuration values
const DEFAULT_CONFIG = {
    model: 'claude-3-5-sonnet-20241022',
    theme: 'dark',
    verbose: false,
    debug: false,
    permissionMode: 'normal',
    mcp: {
        servers: {},
        tools: []
    },
    auth: {
        tokenPath: null
    }
};

export class ConfigManager {
    constructor() {
        this._localConfigCache = null;
        this._globalConfigCache = null;
    }
    
    /**
     * Get the path to the local config file
     * @returns {string} Path to local config file
     */
    getLocalConfigPath() {
        return path.resolve(process.cwd(), LOCAL_CONFIG_FILE);
    }
    
    /**
     * Get the path to the global config file
     * @returns {string} Path to global config file
     */
    getGlobalConfigPath() {
        return GLOBAL_CONFIG_FILE;
    }
    
    /**
     * Load configuration from file with caching
     * @param {boolean} global - Whether to load global config
     * @returns {object} Configuration object
     */
    _loadConfig(global = false) {
        const cacheKey = global ? '_globalConfigCache' : '_localConfigCache';
        
        if (this[cacheKey] !== null) {
            return this[cacheKey];
        }
        
        const configPath = global ? this.getGlobalConfigPath() : this.getLocalConfigPath();
        
        try {
            if (fs.existsSync(configPath)) {
                const content = fs.readFileSync(configPath, 'utf8');
                const config = JSON.parse(content);
                this[cacheKey] = config;
                return config;
            }
        } catch (error) {
            console.warn(`Warning: Failed to read config file ${configPath}:`, error.message);
        }
        
        this[cacheKey] = {};
        return {};
    }
    
    /**
     * Save configuration to file
     * @param {object} config - Configuration object to save
     * @param {boolean} global - Whether to save to global config
     */
    _saveConfig(config, global = false) {
        const configPath = global ? this.getGlobalConfigPath() : this.getLocalConfigPath();
        
        try {
            if (global) {
                // Ensure global config directory exists
                fs.mkdirSync(GLOBAL_CONFIG_DIR, { recursive: true });
            }
            
            const content = JSON.stringify(config, null, 2);
            fs.writeFileSync(configPath, content, 'utf8');
            
            // Update cache
            const cacheKey = global ? '_globalConfigCache' : '_localConfigCache';
            this[cacheKey] = config;
            
        } catch (error) {
            throw new Error(`Failed to save config to ${configPath}: ${error.message}`);
        }
    }
    
    /**
     * Get a nested value from an object using dot notation
     * @param {object} obj - Object to search
     * @param {string} path - Dot-separated path (e.g., 'mcp.servers.myserver')
     * @returns {any} Value at path or undefined
     */
    _getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    }
    
    /**
     * Set a nested value in an object using dot notation
     * @param {object} obj - Object to modify
     * @param {string} path - Dot-separated path
     * @param {any} value - Value to set
     */
    _setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        
        let current = obj;
        for (const key of keys) {
            if (current[key] === undefined || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[lastKey] = value;
    }
    
    /**
     * Remove a nested value from an object using dot notation
     * @param {object} obj - Object to modify
     * @param {string} path - Dot-separated path
     */
    _removeNestedValue(obj, path) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        
        let current = obj;
        for (const key of keys) {
            if (current[key] === undefined) {
                return; // Path doesn't exist
            }
            current = current[key];
        }
        
        delete current[lastKey];
        
        // Clean up empty parent objects
        this._cleanupEmptyObjects(obj, path);
    }
    
    /**
     * Clean up empty parent objects after removal
     * @param {object} obj - Root object
     * @param {string} path - Path that was removed
     */
    _cleanupEmptyObjects(obj, path) {
        const keys = path.split('.');
        keys.pop(); // Remove the last key since it was already deleted
        
        while (keys.length > 0) {
            let current = obj;
            const pathToCheck = keys.slice();
            const keyToCheck = pathToCheck.pop();
            
            // Navigate to parent object
            for (const key of pathToCheck) {
                current = current[key];
                if (!current) return;
            }
            
            // Check if the object is empty
            if (current[keyToCheck] && 
                typeof current[keyToCheck] === 'object' && 
                Object.keys(current[keyToCheck]).length === 0) {
                delete current[keyToCheck];
                keys.pop(); // Continue checking parent
            } else {
                break; // Stop if object is not empty
            }
        }
    }
    
    /**
     * Get a configuration value
     * @param {string} key - Configuration key to retrieve
     * @param {boolean} global - Whether to check global config only
     * @returns {any} Configuration value or undefined
     */
    get(key, global = false) {
        // Check local config first unless global is specifically requested
        if (!global) {
            const localConfig = this._loadConfig(false);
            const localValue = this._getNestedValue(localConfig, key);
            if (localValue !== undefined) {
                return localValue;
            }
        }
        
        // Check global config
        const globalConfig = this._loadConfig(true);
        const globalValue = this._getNestedValue(globalConfig, key);
        if (globalValue !== undefined) {
            return globalValue;
        }
        
        // Return default value if available
        const defaultValue = this._getNestedValue(DEFAULT_CONFIG, key);
        return defaultValue;
    }
    
    /**
     * Set a configuration value
     * @param {string} key - Configuration key to set
     * @param {any} value - Value to set
     * @param {boolean} global - Whether to set in global config
     * @returns {Promise<void>}
     */
    async set(key, value, global = false) {
        const config = this._loadConfig(global);
        this._setNestedValue(config, key, value);
        this._saveConfig(config, global);
    }
    
    /**
     * Remove a configuration value
     * @param {string} key - Configuration key to remove
     * @param {boolean} global - Whether to remove from global config
     * @returns {Promise<void>}
     */
    async remove(key, global = false) {
        const config = this._loadConfig(global);
        this._removeNestedValue(config, key);
        this._saveConfig(config, global);
    }
    
    /**
     * List all configuration keys and values
     * @param {boolean} global - Whether to list global config only
     * @returns {object} Configuration object
     */
    list(global = false) {
        if (global) {
            return { ...this._loadConfig(true) };
        }
        
        // Merge global and local configs (local overrides global)
        const globalConfig = this._loadConfig(true);
        const localConfig = this._loadConfig(false);
        
        return {
            ...DEFAULT_CONFIG,
            ...globalConfig,
            ...localConfig
        };
    }
    
    /**
     * Add values to a configuration array
     * @param {string} key - Configuration key (should be an array)
     * @param {Array} values - Values to add
     * @param {boolean} global - Whether to modify global config
     * @returns {Promise<void>}
     */
    async add(key, values, global = false) {
        const config = this._loadConfig(global);
        let currentArray = this._getNestedValue(config, key);
        
        if (!Array.isArray(currentArray)) {
            currentArray = [];
        }
        
        // Add new values, avoiding duplicates
        for (const value of values) {
            if (!currentArray.includes(value)) {
                currentArray.push(value);
            }
        }
        
        this._setNestedValue(config, key, currentArray);
        this._saveConfig(config, global);
    }
    
    /**
     * Clear cache (useful for testing or after external config changes)
     */
    clearCache() {
        this._localConfigCache = null;
        this._globalConfigCache = null;
    }
}

// Export singleton instance
export const configManager = new ConfigManager();