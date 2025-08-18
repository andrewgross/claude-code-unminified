/**
 * Settings Configuration Manager
 * 
 * Provides a centralized interface for managing Claude Code configuration
 * with support for hierarchical settings, environment variables, validation,
 * and real-time updates.
 * 
 * Coordinates the hierarchical settings system extracted from the original
 * chunk implementations while providing a clean, modern API.
 */

import { 
    getCachedSettings, 
    getCachedSettingsWithErrors, 
    clearSettingsCache, 
    validateSettings,
    getMCPServerConfig,
    SETTINGS_PATHS,
    MCP_SCOPES
} from './settings.js';

export class SettingsManager {
    constructor() {
        this.watchers = new Map();
        this.listeners = new Set();
        this.initialized = false;
    }

    /**
     * Initialize the settings manager
     */
    async initialize() {
        if (this.initialized) return;
        
        // Perform initial settings load and validation
        const result = getCachedSettingsWithErrors();
        
        if (result.errors.length > 0) {
            console.warn(`Settings loaded with ${result.errors.length} errors:`);
            for (const error of result.errors) {
                console.warn(`  - ${error.file}: ${error.message}`);
            }
        }

        this.initialized = true;
    }

    /**
     * Get current settings
     * 
     * @param {string|null} key - Optional key to get specific setting
     * @returns {*} Settings object or specific value
     */
    get(key = null) {
        const settings = getCachedSettings();
        
        if (key === null) {
            return settings;
        }

        // Support dot notation for nested keys
        return this._getNestedValue(settings, key);
    }

    /**
     * Get settings with error information
     * 
     * @returns {Object} Settings and errors
     */
    getWithErrors() {
        return getCachedSettingsWithErrors();
    }

    /**
     * Get a specific setting with a default value
     * 
     * @param {string} key - Setting key (supports dot notation)
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Setting value or default
     */
    getSetting(key, defaultValue = null) {
        const value = this.get(key);
        return value !== undefined ? value : defaultValue;
    }

    /**
     * Check if a setting exists
     * 
     * @param {string} key - Setting key (supports dot notation)  
     * @returns {boolean} True if setting exists
     */
    has(key) {
        return this.get(key) !== undefined;
    }

    /**
     * Get environment variable configuration
     * 
     * @returns {Object} Environment-specific settings
     */
    getEnvironmentConfig() {
        return {
            claudeConfigDir: process.env.CLAUDE_CONFIG_DIR,
            claudeFlagDir: process.env.CLAUDE_FLAG_DIR,
            claudeFlagSettingsFile: process.env.CLAUDE_FLAG_SETTINGS_FILE,
            anthropicApiKey: process.env.ANTHROPIC_API_KEY,
            claudeCodeOauthToken: process.env.CLAUDE_CODE_OAUTH_TOKEN,
            anthropicAuthToken: process.env.ANTHROPIC_AUTH_TOKEN,
            // Add other relevant environment variables
        };
    }

    /**
     * Get MCP server configuration
     * 
     * @param {string|null} scope - Specific scope or null for all
     * @returns {Object} MCP server configuration
     */
    getMCPServers(scope = null) {
        if (scope) {
            return getMCPServerConfig(scope);
        }

        // Merge all scopes with proper precedence (local > project > user)
        const allServers = {};
        const allErrors = [];

        for (const currentScope of MCP_SCOPES.reverse()) { // Reverse for proper precedence
            const { servers, errors } = getMCPServerConfig(currentScope);
            Object.assign(allServers, servers);
            allErrors.push(...errors);
        }

        return {
            servers: allServers,
            errors: allErrors
        };
    }

    /**
     * Get hooks configuration  
     * 
     * @returns {Object} Hooks configuration
     */
    getHooksConfig() {
        return this.getSetting('hooks', {});
    }

    /**
     * Get API key helper configuration
     * 
     * @returns {string|null} API key helper command
     */
    getApiKeyHelper() {
        return this.getSetting('apiKeyHelper', null);
    }

    /**
     * Get AWS configuration
     * 
     * @returns {Object} AWS-related settings
     */
    getAWSConfig() {
        return {
            authRefresh: this.getSetting('awsAuthRefresh', null),
            credentialExport: this.getSetting('awsCredentialExport', null)
        };
    }

    /**
     * Get output style configuration
     * 
     * @returns {string|null} Current output style
     */
    getOutputStyle() {
        return this.getSetting('outputStyle', null);
    }

    /**
     * Get status line configuration
     * 
     * @returns {string|null} Status line command
     */
    getStatusLine() {
        return this.getSetting('statusLine', null);
    }

    /**
     * Get model configuration
     * 
     * @returns {string} Default model
     */
    getDefaultModel() {
        return this.getSetting('defaultModel', 'claude-3-5-sonnet-20241022');
    }

    /**
     * Validate current settings
     * 
     * @returns {Object} Validation result
     */
    validate() {
        const settings = getCachedSettings();
        return validateSettings(settings);
    }

    /**
     * Reload settings from disk
     * 
     * @returns {Promise<Object>} New settings with errors
     */
    async reload() {
        clearSettingsCache();
        const result = getCachedSettingsWithErrors();
        
        // Notify listeners of settings change
        this._notifyListeners('reload', result.settings);
        
        return result;
    }

    /**
     * Add a settings change listener
     * 
     * @param {Function} listener - Listener function
     */
    addListener(listener) {
        this.listeners.add(listener);
    }

    /**
     * Remove a settings change listener
     * 
     * @param {Function} listener - Listener function
     */
    removeListener(listener) {
        this.listeners.delete(listener);
    }

    /**
     * Get settings hierarchy information for debugging
     * 
     * @returns {Object} Information about settings sources
     */
    getHierarchyInfo() {
        return {
            paths: SETTINGS_PATHS,
            mcpScopes: MCP_SCOPES,
            environment: this.getEnvironmentConfig(),
            errors: getCachedSettingsWithErrors().errors
        };
    }

    /**
     * Export current settings (excluding sensitive data)
     * 
     * @returns {Object} Exportable settings
     */
    exportSettings() {
        const settings = getCachedSettings();
        const exported = { ...settings };
        
        // Remove sensitive fields
        delete exported.apiKeyHelper;
        delete exported.awsCredentialExport;
        delete exported.primaryApiKey;
        
        return {
            settings: exported,
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        };
    }

    /**
     * Get nested value from object using dot notation
     * 
     * @private
     * @param {Object} obj - Object to search
     * @param {string} path - Dot-separated path
     * @returns {*} Value or undefined
     */
    _getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && typeof current === 'object' ? current[key] : undefined;
        }, obj);
    }

    /**
     * Notify all listeners of settings changes
     * 
     * @private 
     * @param {string} event - Event type
     * @param {*} data - Event data
     */
    _notifyListeners(event, data) {
        for (const listener of this.listeners) {
            try {
                listener(event, data);
            } catch (error) {
                console.warn('Settings listener error:', error);
            }
        }
    }
}

// Export singleton instance
export const settingsManager = new SettingsManager();

// Export the settings getter as default for backward compatibility
export { getCachedSettings as default };