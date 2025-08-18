/**
 * Configuration Command Handler for Claude Code
 * 
 * This module handles all configuration-related commands including getting,
 * setting, removing, listing, and adding configuration values.
 * 
 * @module ConfigCommand
 */

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import chalk from 'chalk';

/**
 * Configuration scopes
 */
export const CONFIG_SCOPES = {
    LOCAL: 'local',      // Project-specific configuration
    USER: 'user',        // User-specific configuration
    GLOBAL: 'global'     // System-wide configuration
};

/**
 * Valid configuration keys with their types and descriptions
 */
export const CONFIG_SCHEMA = {
    // Core settings
    model: {
        type: 'string',
        description: 'Default AI model to use',
        default: 'claude-3-sonnet',
        values: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku']
    },
    apiKey: {
        type: 'string',
        description: 'Claude API key for authentication',
        sensitive: true
    },
    
    // Output settings
    outputFormat: {
        type: 'string',
        description: 'Default output format',
        default: 'text',
        values: ['text', 'json', 'stream-json']
    },
    inputFormat: {
        type: 'string', 
        description: 'Default input format',
        default: 'text',
        values: ['text', 'json', 'stream-json']
    },
    verbose: {
        type: 'boolean',
        description: 'Enable verbose logging by default',
        default: false
    },
    debug: {
        type: 'boolean',
        description: 'Enable debug mode by default',
        default: false
    },
    
    // Session settings
    maxTurns: {
        type: 'number',
        description: 'Default maximum conversation turns',
        default: null,
        min: 1,
        max: 1000
    },
    autoSave: {
        type: 'boolean',
        description: 'Automatically save sessions',
        default: true
    },
    
    // MCP settings
    mcpServers: {
        type: 'array',
        description: 'Configured MCP servers',
        default: []
    },
    mcpTimeout: {
        type: 'number',
        description: 'MCP server timeout in milliseconds',
        default: 30000,
        min: 1000,
        max: 300000
    },
    
    // Network settings
    httpTimeout: {
        type: 'number',
        description: 'HTTP request timeout in milliseconds',
        default: 30000,
        min: 1000,
        max: 300000
    },
    proxy: {
        type: 'string',
        description: 'HTTP proxy URL',
        default: null
    },
    
    // UI settings
    theme: {
        type: 'string',
        description: 'Color theme for output',
        default: 'auto',
        values: ['auto', 'light', 'dark', 'none']
    },
    pagerEnabled: {
        type: 'boolean',
        description: 'Use pager for long output',
        default: true
    },
    
    // Advanced settings
    tracePropagationTargets: {
        type: 'array',
        description: 'URLs for trace propagation',
        default: ['localhost']
    }
};

/**
 * Configuration manager class
 */
export class ConfigManager {
    constructor() {
        this.configCache = new Map();
        this.logger = console;
    }
    
    /**
     * Sets the logger instance
     * @param {Object} logger - Logger instance
     */
    setLogger(logger) {
        this.logger = logger;
    }
    
    /**
     * Gets configuration file path for a scope
     * @param {string} scope - Configuration scope
     * @returns {string} Configuration file path
     */
    getConfigPath(scope) {
        switch (scope) {
            case CONFIG_SCOPES.LOCAL:
                return path.join(process.cwd(), '.claude', 'config.json');
            case CONFIG_SCOPES.USER:
                return path.join(os.homedir(), '.config', 'claude', 'config.json');
            case CONFIG_SCOPES.GLOBAL:
                return path.join('/etc', 'claude', 'config.json');
            default:
                throw new Error(`Invalid configuration scope: ${scope}`);
        }
    }
    
    /**
     * Ensures configuration directory exists
     * @param {string} configPath - Configuration file path
     */
    async ensureConfigDir(configPath) {
        const dir = path.dirname(configPath);
        try {
            await fs.mkdir(dir, { recursive: true });
        } catch (error) {
            if (error.code !== 'EEXIST') {
                throw error;
            }
        }
    }
    
    /**
     * Loads configuration from file
     * @param {string} scope - Configuration scope
     * @returns {Promise<Object>} Configuration object
     */
    async loadConfig(scope) {
        const cacheKey = scope;
        if (this.configCache.has(cacheKey)) {
            return this.configCache.get(cacheKey);
        }
        
        const configPath = this.getConfigPath(scope);
        
        try {
            const content = await fs.readFile(configPath, 'utf8');
            const config = JSON.parse(content);
            this.configCache.set(cacheKey, config);
            return config;
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Return empty config if file doesn't exist
                const emptyConfig = {};
                this.configCache.set(cacheKey, emptyConfig);
                return emptyConfig;
            }
            throw error;
        }
    }
    
    /**
     * Saves configuration to file
     * @param {string} scope - Configuration scope
     * @param {Object} config - Configuration object
     */
    async saveConfig(scope, config) {
        const configPath = this.getConfigPath(scope);
        await this.ensureConfigDir(configPath);
        
        const content = JSON.stringify(config, null, 2);
        await fs.writeFile(configPath, content, 'utf8');
        
        // Update cache
        this.configCache.set(scope, config);
    }
    
    /**
     * Gets merged configuration from all scopes (global -> user -> local)
     * @returns {Promise<Object>} Merged configuration
     */
    async getMergedConfig() {
        const configs = await Promise.all([
            this.loadConfig(CONFIG_SCOPES.GLOBAL),
            this.loadConfig(CONFIG_SCOPES.USER), 
            this.loadConfig(CONFIG_SCOPES.LOCAL)
        ]);
        
        return Object.assign({}, ...configs);
    }
    
    /**
     * Validates configuration key
     * @param {string} key - Configuration key
     * @returns {Object} Schema information for the key
     */
    validateKey(key) {
        const schema = CONFIG_SCHEMA[key];
        if (!schema) {
            const availableKeys = Object.keys(CONFIG_SCHEMA).join(', ');
            throw new Error(`Invalid configuration key '${key}'. Available keys: ${availableKeys}`);
        }
        return schema;
    }
    
    /**
     * Validates configuration value against schema
     * @param {string} key - Configuration key
     * @param {*} value - Value to validate
     * @returns {*} Validated and converted value
     */
    validateValue(key, value) {
        const schema = this.validateKey(key);
        
        // Type conversion and validation
        switch (schema.type) {
            case 'string':
                if (typeof value !== 'string') {
                    value = String(value);
                }
                if (schema.values && !schema.values.includes(value)) {
                    throw new Error(`Invalid value '${value}' for '${key}'. Valid values: ${schema.values.join(', ')}`);
                }
                break;
                
            case 'number':
                if (typeof value === 'string') {
                    value = parseFloat(value);
                }
                if (typeof value !== 'number' || isNaN(value)) {
                    throw new Error(`Invalid number value for '${key}': ${value}`);
                }
                if (schema.min !== undefined && value < schema.min) {
                    throw new Error(`Value for '${key}' must be at least ${schema.min}`);
                }
                if (schema.max !== undefined && value > schema.max) {
                    throw new Error(`Value for '${key}' must be at most ${schema.max}`);
                }
                break;
                
            case 'boolean':
                if (typeof value === 'string') {
                    const lower = value.toLowerCase();
                    if (lower === 'true' || lower === '1' || lower === 'yes') {
                        value = true;
                    } else if (lower === 'false' || lower === '0' || lower === 'no') {
                        value = false;
                    } else {
                        throw new Error(`Invalid boolean value for '${key}': ${value}`);
                    }
                } else if (typeof value !== 'boolean') {
                    throw new Error(`Invalid boolean value for '${key}': ${value}`);
                }
                break;
                
            case 'array':
                if (!Array.isArray(value)) {
                    // Convert single value to array
                    value = [value];
                }
                break;
        }
        
        return value;
    }
    
    /**
     * Determines configuration scope based on options
     * @param {Object} options - Command options
     * @returns {string} Configuration scope
     */
    determineScope(options) {
        if (options.global) {
            return CONFIG_SCOPES.GLOBAL;
        }
        // Default to user scope unless we're in a project directory
        return this.isInProjectDirectory() ? CONFIG_SCOPES.LOCAL : CONFIG_SCOPES.USER;
    }
    
    /**
     * Checks if current directory is a project directory
     * @returns {boolean} Whether in project directory
     */
    isInProjectDirectory() {
        // Check for common project indicators
        try {
            const cwd = process.cwd();
            const indicators = ['package.json', '.git', '.claude', 'pyproject.toml', 'Cargo.toml'];
            return indicators.some(indicator => {
                try {
                    require('fs').accessSync(path.join(cwd, indicator));
                    return true;
                } catch {
                    return false;
                }
            });
        } catch {
            return false;
        }
    }
    
    /**
     * Clears configuration cache
     */
    clearCache() {
        this.configCache.clear();
    }
}

/**
 * Configuration command handler class
 */
export class ConfigCommandHandler {
    constructor() {
        this.configManager = new ConfigManager();
        this.logger = console;
    }
    
    /**
     * Sets the logger instance
     * @param {Object} logger - Logger instance
     */
    setLogger(logger) {
        this.logger = logger;
        this.configManager.setLogger(logger);
    }
    
    /**
     * Handles configuration commands
     * @param {Object} parsedCommand - Parsed command from parser
     * @param {Object} context - Execution context from dispatcher
     * @returns {Promise<Object>} Command execution result
     */
    async handle(parsedCommand, context) {
        try {
            const { action, key, value, values, options } = parsedCommand;
            
            switch (action) {
                case 'get':
                    return await this.handleGet(key, options);
                case 'set':
                    return await this.handleSet(key, value, options);
                case 'remove':
                    return await this.handleRemove(key, values, options);
                case 'list':
                    return await this.handleList(options);
                case 'add':
                    return await this.handleAdd(key, values, options);
                default:
                    throw new Error(`Unknown config action: ${action}`);
            }
        } catch (error) {
            return {
                success: false,
                exitCode: 1,
                message: error.message,
                data: { error: error.stack },
                errors: [error.message]
            };
        }
    }
    
    /**
     * Handles config get command
     * @param {string} key - Configuration key
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleGet(key, options) {
        try {
            this.configManager.validateKey(key);
            const config = await this.configManager.getMergedConfig();
            const value = config[key];
            const schema = CONFIG_SCHEMA[key];
            
            if (value === undefined) {
                // Show default value if available
                if (schema.default !== undefined) {
                    this.logger.log(chalk.gray(`${key} = ${this.formatValue(schema.default)} (default)`));
                } else {
                    this.logger.log(chalk.gray(`${key} is not set`));
                }
            } else {
                // Check if value is sensitive
                if (schema.sensitive) {
                    this.logger.log(chalk.yellow(`${key} = [REDACTED]`));
                } else {
                    this.logger.log(`${key} = ${this.formatValue(value)}`);
                }
            }
            
            return {
                success: true,
                exitCode: 0,
                message: `Retrieved configuration for '${key}'`,
                data: { key, value, isDefault: value === undefined }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles config set command
     * @param {string} key - Configuration key
     * @param {*} value - Configuration value
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleSet(key, value, options) {
        try {
            const validatedValue = this.configManager.validateValue(key, value);
            const scope = this.configManager.determineScope(options);
            
            const config = await this.configManager.loadConfig(scope);
            config[key] = validatedValue;
            await this.configManager.saveConfig(scope, config);
            
            this.logger.log(chalk.green(`✓ Set ${key} = ${this.formatValue(validatedValue)} (${scope} scope)`));
            
            return {
                success: true,
                exitCode: 0,
                message: `Configuration '${key}' set successfully`,
                data: { key, value: validatedValue, scope }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles config remove command
     * @param {string} key - Configuration key
     * @param {Array} values - Values to remove (for arrays)
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleRemove(key, values, options) {
        try {
            this.configManager.validateKey(key);
            const scope = this.configManager.determineScope(options);
            const config = await this.configManager.loadConfig(scope);
            
            if (values.length > 0 && CONFIG_SCHEMA[key].type === 'array') {
                // Remove specific values from array
                if (Array.isArray(config[key])) {
                    config[key] = config[key].filter(item => !values.includes(item));
                    this.logger.log(chalk.green(`✓ Removed values from ${key}: ${values.join(', ')}`));
                } else {
                    throw new Error(`Configuration '${key}' is not an array`);
                }
            } else {
                // Remove entire key
                if (config[key] !== undefined) {
                    delete config[key];
                    this.logger.log(chalk.green(`✓ Removed configuration '${key}'`));
                } else {
                    this.logger.log(chalk.yellow(`Configuration '${key}' was not set`));
                }
            }
            
            await this.configManager.saveConfig(scope, config);
            
            return {
                success: true,
                exitCode: 0,
                message: `Configuration '${key}' removed successfully`,
                data: { key, removedValues: values, scope }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles config list command
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleList(options) {
        try {
            const config = await this.configManager.getMergedConfig();
            
            console.log(chalk.cyan('\n=== Claude Code Configuration ===\n'));
            
            // Group by category
            const categories = this.groupConfigByCategory();
            
            for (const [category, keys] of Object.entries(categories)) {
                console.log(chalk.bold(category));
                
                for (const key of keys) {
                    const schema = CONFIG_SCHEMA[key];
                    const value = config[key];
                    const hasValue = value !== undefined;
                    const displayValue = hasValue 
                        ? (schema.sensitive ? '[REDACTED]' : this.formatValue(value))
                        : chalk.gray(`${this.formatValue(schema.default)} (default)`);
                    
                    console.log(`  ${chalk.white(key.padEnd(25))} ${displayValue}`);
                    
                    if (options.verbose) {
                        console.log(`  ${chalk.gray(' '.repeat(25))} ${schema.description}`);
                    }
                }
                console.log();
            }
            
            // Show configuration file locations
            if (options.verbose) {
                console.log(chalk.cyan('=== Configuration Files ===\n'));
                for (const scope of Object.values(CONFIG_SCOPES)) {
                    const configPath = this.configManager.getConfigPath(scope);
                    console.log(`  ${scope.padEnd(8)} ${configPath}`);
                }
                console.log();
            }
            
            return {
                success: true,
                exitCode: 0,
                message: 'Configuration listed successfully',
                data: { config, configCount: Object.keys(config).length }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles config add command (for array values)
     * @param {string} key - Configuration key
     * @param {Array} values - Values to add
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleAdd(key, values, options) {
        try {
            const schema = this.configManager.validateKey(key);
            
            if (schema.type !== 'array') {
                throw new Error(`Configuration '${key}' is not an array type`);
            }
            
            const scope = this.configManager.determineScope(options);
            const config = await this.configManager.loadConfig(scope);
            
            // Initialize array if it doesn't exist
            if (!config[key]) {
                config[key] = [];
            } else if (!Array.isArray(config[key])) {
                throw new Error(`Configuration '${key}' exists but is not an array`);
            }
            
            // Add new values (avoid duplicates)
            const added = [];
            for (const value of values) {
                if (!config[key].includes(value)) {
                    config[key].push(value);
                    added.push(value);
                }
            }
            
            await this.configManager.saveConfig(scope, config);
            
            if (added.length > 0) {
                this.logger.log(chalk.green(`✓ Added to ${key}: ${added.join(', ')}`));
            } else {
                this.logger.log(chalk.yellow(`All values already exist in ${key}`));
            }
            
            return {
                success: true,
                exitCode: 0,
                message: `Values added to '${key}' successfully`,
                data: { key, addedValues: added, scope }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Groups configuration keys by category for display
     * @returns {Object} Grouped configuration keys
     */
    groupConfigByCategory() {
        return {
            'Core Settings': ['model', 'apiKey'],
            'Output Settings': ['outputFormat', 'inputFormat', 'verbose', 'debug', 'theme', 'pagerEnabled'],
            'Session Settings': ['maxTurns', 'autoSave'],
            'MCP Settings': ['mcpServers', 'mcpTimeout'],
            'Network Settings': ['httpTimeout', 'proxy'],
            'Advanced Settings': ['tracePropagationTargets']
        };
    }
    
    /**
     * Formats a value for display
     * @param {*} value - Value to format
     * @returns {string} Formatted value
     */
    formatValue(value) {
        if (value === null) {
            return chalk.gray('null');
        }
        if (value === undefined) {
            return chalk.gray('undefined');
        }
        if (Array.isArray(value)) {
            return `[${value.map(v => this.formatValue(v)).join(', ')}]`;
        }
        if (typeof value === 'string') {
            return `"${value}"`;
        }
        return String(value);
    }
}

/**
 * Default config handler instance
 */
export const defaultConfigHandler = new ConfigCommandHandler();

/**
 * Config command handler function for the dispatcher
 * @param {Object} parsedCommand - Parsed command from parser
 * @param {Object} context - Execution context from dispatcher
 * @returns {Promise<Object>} Command execution result
 */
export async function handleConfigCommand(parsedCommand, context) {
    return await defaultConfigHandler.handle(parsedCommand, context);
}

export default {
    ConfigManager,
    ConfigCommandHandler,
    handleConfigCommand,
    CONFIG_SCOPES,
    CONFIG_SCHEMA,
    defaultConfigHandler
};