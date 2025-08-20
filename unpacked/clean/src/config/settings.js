/**
 * Settings Manager
 * 
 * Handles hierarchical configuration loading and merging from multiple sources:
 * user settings, project settings, local settings, flag settings, and policy settings.
 * 
 * Extracted from:
 * - chunk_0527.js:2-31 (dF4 function - main settings loader)
 * - chunk_0527.js:33-43 (GB and qL functions - cached settings access)
 * - chunk_0513.js:1-20 (uw array - settings paths)
 * - chunk_0526.js:521-551 (T02 function - individual file loader)
 * - chunk_0526.js:568-580 (RT function - path resolver)
 * - chunk_0524.js:430-494 (ZG function - MCP server settings)
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { homedir } from 'os';
import { cwd } from 'process';

// Settings paths in priority order (lowest to highest precedence)
// Extracted from chunk_0513.js:1-20 (uw array)
const SETTINGS_PATHS = [
    'userSettings',
    'projectSettings', 
    'localSettings',
    'flagSettings',
    'policySettings'
];

// MCP server scopes for ZG function
// Extracted from chunk_0524.js:430-494
const MCP_SCOPES = ['user', 'project', 'local'];

// Cached settings result
let cachedSettings = null;

/**
 * Parse JSON safely with better error handling
 * Based on chunk_0526.js:535 (T7 function call)
 */
function parseJSON(content) {
    try {
        return JSON.parse(content);
    } catch (error) {
        return null;
    }
}

/**
 * Get configuration directory path based on settings type
 * Extracted from chunk_0526.js:553-566 (Rq1 function)
 * 
 * @param {string} settingsType - Type of settings
 * @returns {string} Directory path
 */
function getConfigDirectory(settingsType) {
    switch (settingsType) {
        case 'userSettings':
            // User-level: ~/.claude/
            return resolve(homedir(), '.claude');
        case 'policySettings':
        case 'projectSettings': 
        case 'localSettings':
            // Project/local level: current working directory
            return resolve(cwd());
        case 'flagSettings': {
            // Flag settings use special handling
            const flagDir = process.env.CLAUDE_FLAG_DIR;
            return flagDir ? resolve(flagDir) : resolve(cwd());
        }
        default:
            return resolve(cwd());
    }
}

/**
 * Get settings file path for a given settings type
 * Extracted from chunk_0526.js:568-580 (RT function)
 * 
 * @param {string} settingsType - Type of settings
 * @returns {string|null} Full file path or null if not applicable
 */
function getSettingsPath(settingsType) {
    const baseDir = getConfigDirectory(settingsType);
    
    switch (settingsType) {
        case 'userSettings':
            return join(baseDir, 'settings.json');
        case 'projectSettings':
            return join(baseDir, '.claude', 'settings.json');
        case 'localSettings':
            return join(baseDir, '.claude', 'settings.local.json');
        case 'policySettings':
            // Policy settings would be at a system level - implementation TBD
            return null;
        case 'flagSettings':
            // Flag settings from environment variable path
            return process.env.CLAUDE_FLAG_SETTINGS_FILE || null;
        default:
            return null;
    }
}

/**
 * Load settings from a single file
 * Extracted from chunk_0526.js:521-551 (T02 function)
 * 
 * @param {string} filePath - Path to settings file
 * @param {string} settingsType - Type of settings for error context
 * @returns {Object} Result with settings and errors
 */
function loadSettingsFile(filePath, settingsType) {
    if (!existsSync(filePath)) {
        return {
            settings: null,
            errors: []
        };
    }

    try {
        // Read and resolve any symlinks
        const content = readFileSync(filePath, { encoding: 'utf8' });
        
        if (content.trim() === '') {
            return {
                settings: {},
                errors: []
            };
        }

        const parsed = parseJSON(content);
        if (parsed === null) {
            return {
                settings: null,
                errors: [{
                    file: filePath,
                    path: '',
                    message: 'Invalid JSON syntax',
                    type: 'parse_error'
                }]
            };
        }

        return {
            settings: parsed,
            errors: []
        };
    } catch (error) {
        const errorMessage = error.code === 'ENOENT' 
            ? `Settings file not found: ${filePath}`
            : `Failed to read settings file: ${error.message}`;
            
        return {
            settings: null,
            errors: [{
                file: filePath,
                path: '',
                message: errorMessage,
                type: 'file_error'
            }]
        };
    }
}

/**
 * Get MCP server configuration for a scope
 * Extracted from chunk_0524.js:430-494 (ZG function)
 * 
 * @param {string} scope - Scope (user, project, local)  
 * @returns {Object} MCP servers and errors
 */
function getMCPServerConfig(scope) {
    switch (scope) {
        case 'project': {
            const mcpPath = join(cwd(), '.mcp.json');
            if (!existsSync(mcpPath)) {
                return {
                    servers: {},
                    errors: []
                };
            }
            
            try {
                const content = readFileSync(mcpPath, { encoding: 'utf8' });
                const config = parseJSON(content);
                
                return {
                    servers: config?.mcpServers || {},
                    errors: []
                };
            } catch (error) {
                return {
                    servers: {},
                    errors: [{
                        file: mcpPath,
                        path: 'mcpServers',
                        message: `Failed to load MCP config: ${error.message}`,
                        type: 'mcp_error'
                    }]
                };
            }
        }
        
        case 'user': {
            // User MCP servers would come from main settings file
            const userSettingsPath = join(homedir(), '.claude', 'settings.json');
            if (!existsSync(userSettingsPath)) {
                return {
                    servers: {},
                    errors: []
                };
            }
            
            try {
                const content = readFileSync(userSettingsPath, { encoding: 'utf8' });
                const config = parseJSON(content);
                return {
                    servers: config?.mcpServers || {},
                    errors: []
                };
            } catch (error) {
                return {
                    servers: {},
                    errors: [{
                        file: userSettingsPath,
                        path: 'mcpServers',
                        message: `Failed to load user MCP config: ${error.message}`,
                        type: 'mcp_error'
                    }]
                };
            }
        }
        
        case 'local': {
            // Local MCP servers from local settings  
            const localPath = join(cwd(), '.claude', 'settings.local.json');
            if (!existsSync(localPath)) {
                return {
                    servers: {},
                    errors: []
                };
            }
            
            try {
                const content = readFileSync(localPath, { encoding: 'utf8' });
                const config = parseJSON(content);
                
                return {
                    servers: config?.mcpServers || {},
                    errors: []
                };
            } catch (error) {
                return {
                    servers: {},
                    errors: [{
                        file: localPath,
                        path: 'mcpServers', 
                        message: `Failed to load local MCP config: ${error.message}`,
                        type: 'mcp_error'
                    }]
                };
            }
        }
        
        default:
            return {
                servers: {},
                errors: []
            };
    }
}

/**
 * Deep merge objects, with special handling for arrays
 * Referenced in chunk_0527.js:21-25 (_W1 function call)
 * 
 * @param {Object} target - Target object
 * @param {Object} source - Source object  
 * @param {Function} arrayMerger - Custom array merger function
 * @returns {Object} Merged object
 */
function deepMerge(target, source, arrayMerger) {
    if (!source || typeof source !== 'object') {
        return target;
    }

    const result = { ...target };
    
    for (const [key, value] of Object.entries(source)) {
        if (value === undefined) {
            continue;
        }
        
        if (Array.isArray(result[key]) && Array.isArray(value) && arrayMerger) {
            result[key] = arrayMerger(result[key], value);
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            result[key] = deepMerge(result[key] || {}, value, arrayMerger);
        } else {
            result[key] = value;
        }
    }
    
    return result;
}

/**
 * Merge arrays by concatenating and removing duplicates
 * Referenced in chunk_0527.js:22 (mF4 function call)
 * 
 * @param {Array} target - Target array
 * @param {Array} source - Source array
 * @returns {Array} Merged array
 */
function mergeArrays(target, source) {
    const merged = [...target, ...source];
    return Array.from(new Set(merged));
}

/**
 * Load and merge all settings from multiple sources
 * Extracted from chunk_0527.js:2-31 (dF4 function)
 * 
 * @returns {Object} Combined settings and errors
 */
function loadAllSettings() {
    let mergedSettings = {};
    const allErrors = [];
    const processedPaths = new Set();
    const pathHashes = new Set();

    // Process settings in priority order
    for (const settingsType of SETTINGS_PATHS) {
        const filePath = getSettingsPath(settingsType);
        if (!filePath) continue;

        // Avoid processing the same file twice (by resolved path)
        const resolvedPath = resolve(filePath);
        if (pathHashes.has(resolvedPath)) continue;
        pathHashes.add(resolvedPath);

        // Load settings from file
        const { settings, errors } = loadSettingsFile(filePath, settingsType);

        // Collect errors with unique keys to avoid duplicates
        for (const error of errors) {
            const errorKey = `${error.file}:${error.path}:${error.message}`;
            if (!processedPaths.has(errorKey)) {
                processedPaths.add(errorKey);
                allErrors.push(error);
            }
        }

        // Merge settings if loaded successfully
        if (settings) {
            mergedSettings = deepMerge(mergedSettings, settings, (target, source) => {
                if (Array.isArray(target) && Array.isArray(source)) {
                    return mergeArrays(target, source);
                }
                return source; // Default behavior
            });
        }
    }

    // Add MCP server errors from different scopes
    for (const scope of MCP_SCOPES) {
        const { errors } = getMCPServerConfig(scope);
        allErrors.push(...errors);
    }

    return {
        settings: mergedSettings,
        errors: allErrors
    };
}

/**
 * Get cached settings, loading if needed
 * Extracted from chunk_0527.js:40-43 (qL function)
 * 
 * @returns {Object} Settings with errors
 */
function getCachedSettingsWithErrors() {
    if (cachedSettings !== null) {
        return cachedSettings;
    }
    
    cachedSettings = loadAllSettings();
    return cachedSettings;
}

/**
 * Get settings object only (without errors)
 * Extracted from chunk_0527.js:33-38 (GB function)
 * 
 * @returns {Object} Settings object
 */
function getCachedSettings() {
    const { settings } = getCachedSettingsWithErrors();
    return settings || {};
}

/**
 * Clear cached settings (force reload on next access)
 */
function clearSettingsCache() {
    cachedSettings = null;
}

/**
 * Validate settings structure
 * 
 * @param {Object} settings - Settings to validate
 * @returns {Object} Validation result with errors
 */
function validateSettings(settings) {
    const errors = [];
    
    if (typeof settings !== 'object' || settings === null) {
        errors.push({
            path: 'root',
            message: 'Settings must be a valid object',
            type: 'validation_error'
        });
        return { isValid: false, errors };
    }

    // Validate hooks if present
    if (settings.hooks && typeof settings.hooks !== 'object') {
        errors.push({
            path: 'hooks',
            message: 'Hooks must be an object',
            type: 'validation_error'  
        });
    }

    // Validate mcpServers if present
    if (settings.mcpServers && typeof settings.mcpServers !== 'object') {
        errors.push({
            path: 'mcpServers',
            message: 'MCP servers must be an object',
            type: 'validation_error'
        });
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Export the main functions
export {
    getCachedSettings,
    getCachedSettingsWithErrors,
    loadAllSettings,
    clearSettingsCache,
    validateSettings,
    getMCPServerConfig,
    loadSettingsFile,
    getSettingsPath,
    SETTINGS_PATHS,
    MCP_SCOPES
};

// Export default as the main settings getter
export default getCachedSettings;