/**
 * MCP Scope-Based Configuration System
 * 
 * Handles hierarchical MCP server configuration with scope precedence,
 * project approval workflows, and scope resolution logic.
 * 
 * Key chunks analyzed:
 * - chunk_0524.js:430-494 (ZG function - core scope resolution)
 * - chunk_0524.js:510-526 (gz function - server aggregation)
 * - chunk_0524.js:496-508 (ds function - server lookup with precedence)
 * - chunk_0520.js:171-236 (scope utilities and validation)
 */

import { join as joinPath } from 'path';
import { existsSync, readFileSync } from 'fs';
import { getCurrentWorkingDirectory } from '../utils/path.js';
import { configManager } from '../config/manager.js';

/**
 * MCP Configuration Scopes in priority order (highest to lowest)
 */
export const MCP_SCOPES = {
    LOCAL: 'local',        // Private to user in current project (highest priority)
    PROJECT: 'project',    // Shared via .mcp.json (medium priority)  
    USER: 'user',          // Available across all user projects (lowest priority)
    DYNAMIC: 'dynamic'     // CLI-provided configurations
};

/**
 * Valid MCP scope options
 */
export const VALID_SCOPES = [MCP_SCOPES.LOCAL, MCP_SCOPES.PROJECT, MCP_SCOPES.USER, MCP_SCOPES.DYNAMIC];

/**
 * Project MCP server approval states
 */
export const APPROVAL_STATES = {
    PENDING: 'pending',
    APPROVED: 'approved', 
    REJECTED: 'rejected'
};

/**
 * Retrieve MCP servers by scope
 * 
 * Extracted from chunk_0524.js:430-494 (ZG function):
 * - Handles "project", "user", and "local" scopes
 * - For project scope: reads .mcp.json files
 * - For user/local: reads from config objects with scope validation
 * - Returns {servers, errors} objects
 * - Includes error handling for missing files/invalid configs
 * 
 * @param {string} scope - MCP scope to retrieve servers for
 * @returns {Object} Object with servers and errors arrays
 */
export function getServersByScope(scope) {
    switch (scope) {
        case MCP_SCOPES.PROJECT: {
            const projectMcpPath = joinPath(getCurrentWorkingDirectory(), '.mcp.json');
            
            if (!existsSync(projectMcpPath)) {
                return {
                    servers: {},
                    errors: []
                };
            }
            
            const { config, errors } = loadProjectMcpConfiguration({
                filePath: projectMcpPath,
                expandVars: true,
                scope: MCP_SCOPES.PROJECT
            });
            
            return {
                servers: addScopeMetadata(config?.mcpServers, scope),
                errors
            };
        }
        
        case MCP_SCOPES.USER: {
            const userMcpServers = getUserMcpServers();
            
            if (!userMcpServers) {
                return {
                    servers: {},
                    errors: []
                };
            }
            
            const { config, errors } = validateMcpConfiguration({
                configObject: {
                    mcpServers: userMcpServers
                },
                expandVars: true,
                scope: MCP_SCOPES.USER
            });
            
            return {
                servers: addScopeMetadata(config?.mcpServers, scope),
                errors
            };
        }
        
        case MCP_SCOPES.LOCAL: {
            const localMcpServers = getLocalMcpServers();
            
            if (!localMcpServers) {
                return {
                    servers: {},
                    errors: []
                };
            }
            
            const { config, errors } = validateMcpConfiguration({
                configObject: {
                    mcpServers: localMcpServers
                },
                expandVars: true,
                scope: MCP_SCOPES.LOCAL
            });
            
            return {
                servers: addScopeMetadata(config?.mcpServers, scope),
                errors
            };
        }
        
        default:
            throw new Error(`Unsupported MCP scope: ${scope}`);
    }
}

/**
 * Look up MCP server with scope precedence
 * 
 * Extracted from chunk_0524.js:496-508 (ds function):
 * - Searches local → project → user scopes in order  
 * - Returns server config with scope metadata
 * - Implements scope priority resolution
 * - Returns null if server not found in any scope
 * 
 * @param {string} serverName - Name of MCP server to find
 * @returns {Object|null} Server configuration with scope or null if not found
 */
export function findServerByName(serverName) {
    // Check local scope first (highest priority)
    const { servers: localServers } = getServersByScope(MCP_SCOPES.LOCAL);
    if (localServers[serverName]) {
        return localServers[serverName];
    }
    
    // Check project scope second (medium priority)
    const { servers: projectServers } = getServersByScope(MCP_SCOPES.PROJECT);
    if (projectServers[serverName]) {
        return projectServers[serverName];
    }
    
    // Check user scope last (lowest priority)
    const { servers: userServers } = getServersByScope(MCP_SCOPES.USER);
    if (userServers[serverName]) {
        return userServers[serverName];
    }
    
    return null;
}

/**
 * Get all MCP servers with scope precedence and approval filtering
 * 
 * Extracted from chunk_0524.js:510-526 (gz function):
 * - Merges servers from all scopes (user, project, local)
 * - Applies project-specific approval logic via wq1()
 * - Returns combined server configuration object
 * - Includes telemetry tracking for scope usage
 * - Local scope overrides project scope, which overrides user scope
 * 
 * @returns {Object} Combined MCP server configuration from all scopes
 */
export function getAllMcpServers() {
    // Get servers from all scopes
    const { servers: userServers } = getServersByScope(MCP_SCOPES.USER);
    const { servers: projectServers } = getServersByScope(MCP_SCOPES.PROJECT);
    const { servers: localServers } = getServersByScope(MCP_SCOPES.LOCAL);
    
    // Filter project servers by approval status
    const approvedProjectServers = {};
    for (const [serverName, config] of Object.entries(projectServers)) {
        if (getProjectServerApprovalStatus(serverName) === APPROVAL_STATES.APPROVED) {
            approvedProjectServers[serverName] = config;
        }
    }
    
    // Merge servers with scope precedence: user < approved project < local
    const mergedServers = Object.assign({}, userServers, approvedProjectServers, localServers);
    
    // Log telemetry for scope usage
    logMcpScopeUsage({
        global: Object.keys(userServers).length,
        project: Object.keys(approvedProjectServers).length,
        user: Object.keys(localServers).length
    });
    
    return mergedServers;
}

/**
 * Check project MCP server approval status
 * 
 * Extracted from chunk_0520.js:231-236 (wq1 function):
 * - Returns "rejected", "approved", or "pending" based on project settings
 * - Checks disabledMcpjsonServers, enabledMcpjsonServers, and enableAllProjectMcpServers
 * - Part of project MCP server approval workflow
 * 
 * @param {string} serverName - Name of MCP server to check
 * @returns {string} Approval status (pending, approved, rejected)
 */
export function getProjectServerApprovalStatus(serverName) {
    const settings = getSettings();
    
    // Check if explicitly rejected
    if (settings?.disabledMcpjsonServers?.includes(serverName)) {
        return APPROVAL_STATES.REJECTED;
    }
    
    // Check if explicitly approved or all project servers enabled
    if (settings?.enabledMcpjsonServers?.includes(serverName) || settings?.enableAllProjectMcpServers) {
        return APPROVAL_STATES.APPROVED;
    }
    
    // Default to pending approval
    return APPROVAL_STATES.PENDING;
}

/**
 * Validate MCP scope name
 * 
 * Extracted from chunk_0520.js:206-210 (l61 function):
 * - Validates scope against valid options (local, user, project, dynamic)
 * - Defaults to "local" scope if not provided
 * - Throws errors for invalid scopes
 * 
 * @param {string} scope - Scope name to validate
 * @returns {string} Validated scope name
 * @throws {Error} If scope is invalid
 */
export function validateScope(scope) {
    if (!scope) {
        return MCP_SCOPES.LOCAL;
    }
    
    if (!VALID_SCOPES.includes(scope)) {
        throw new Error(`Invalid scope: ${scope}. Must be one of: ${VALID_SCOPES.join(', ')}`);
    }
    
    return scope;
}

/**
 * Get scope-to-filepath mapping for display
 * 
 * Extracted from chunk_0520.js:171-192 (zK function):
 * - Maps scope names to actual config file paths
 * - Handles existence checking and displays file status
 * - Returns human-readable file paths with status
 * 
 * @param {string} scope - MCP scope name
 * @returns {string} File path with existence status
 */
export function getScopeFilePath(scope) {
    switch (scope) {
        case MCP_SCOPES.USER: {
            const userConfigPath = getUserConfigPath();
            const exists = existsSync(userConfigPath);
            return `${userConfigPath}${exists ? '' : ' (file does not exist)'}`;
        }
        
        case MCP_SCOPES.PROJECT: {
            const projectMcpPath = joinPath(getCurrentWorkingDirectory(), '.mcp.json');
            const exists = existsSync(projectMcpPath);
            return `${projectMcpPath}${exists ? '' : ' (file does not exist)'}`;
        }
        
        case MCP_SCOPES.LOCAL:
            return `${getUserConfigPath()} [project: ${getCurrentWorkingDirectory()}]`;
            
        case MCP_SCOPES.DYNAMIC:
            return 'Dynamically configured';
            
        default:
            return scope;
    }
}

/**
 * Get user-friendly scope descriptions
 * 
 * Extracted from chunk_0520.js:193-203 (yg function):
 * - Converts scope names to user-friendly descriptions
 * - Provides context about scope behavior and sharing
 * 
 * @param {string} scope - MCP scope name  
 * @returns {string} User-friendly description
 */
export function getScopeDescription(scope) {
    switch (scope) {
        case MCP_SCOPES.LOCAL:
            return 'Local config (private to you in this project)';
        case MCP_SCOPES.PROJECT:
            return 'Project config (shared via .mcp.json)';
        case MCP_SCOPES.USER:
            return 'User config (available in all your projects)';
        default:
            return scope;
    }
}

/**
 * Add scope metadata to server configurations
 * 
 * Extracted from chunk_0524.js:259-267 (f40 function):
 * - Adds scope property to server configurations
 * - Ensures all servers know their originating scope
 * 
 * @param {Object} servers - Server configurations
 * @param {string} scope - Scope name to add
 * @returns {Object} Servers with scope metadata
 */
function addScopeMetadata(servers, scope) {
    if (!servers || typeof servers !== 'object') {
        return {};
    }
    
    const serversWithScope = {};
    for (const [name, config] of Object.entries(servers)) {
        serversWithScope[name] = {
            ...config,
            scope
        };
    }
    
    return serversWithScope;
}

/**
 * Load project MCP configuration from .mcp.json file
 * 
 * @param {Object} options - Configuration options
 * @returns {Object} Configuration result with config and errors
 */
function loadProjectMcpConfiguration(options) {
    try {
        const fileContent = readFileSync(options.filePath, 'utf8');
        const config = JSON.parse(fileContent);
        
        // Basic validation
        if (config && typeof config === 'object' && config.mcpServers) {
            return {
                config,
                errors: []
            };
        } else {
            return {
                config: null,
                errors: [{
                    message: 'Invalid .mcp.json structure - missing mcpServers',
                    file: options.filePath
                }]
            };
        }
    } catch (error) {
        return {
            config: null,
            errors: [{
                message: `Failed to load .mcp.json: ${error.message}`,
                file: options.filePath
            }]
        };
    }
}

/**
 * Validate MCP configuration object
 * 
 * @param {Object} options - Validation options
 * @returns {Object} Validation result with config and errors
 */
function validateMcpConfiguration(options) {
    // Simplified validation - in real implementation would use schema validation
    const { configObject } = options;
    
    if (!configObject || typeof configObject !== 'object') {
        return {
            config: null,
            errors: [{
                message: 'Configuration must be an object',
                scope: options.scope
            }]
        };
    }
    
    if (!configObject.mcpServers || typeof configObject.mcpServers !== 'object') {
        return {
            config: null,
            errors: [{
                message: 'Missing or invalid mcpServers configuration',
                scope: options.scope
            }]
        };
    }
    
    return {
        config: configObject,
        errors: []
    };
}

/**
 * Get user MCP servers from configuration
 * 
 * @returns {Object|null} User MCP server configuration
 */
function getUserMcpServers() {
    try {
        const settings = getSettings();
        return settings?.mcpServers || null;
    } catch (error) {
        console.warn('Failed to get user MCP servers:', error);
        return null;
    }
}

/**
 * Get local MCP servers from configuration  
 * 
 * @returns {Object|null} Local MCP server configuration
 */
function getLocalMcpServers() {
    try {
        const localSettings = getLocalSettings();
        return localSettings?.mcpServers || null;
    } catch (error) {
        console.warn('Failed to get local MCP servers:', error);
        return null;
    }
}

/**
 * Get settings object
 * 
 * @returns {Object} Current settings
 */
function getSettings() {
    try {
        return configManager.list();
    } catch (error) {
        console.warn('Failed to load settings:', error);
        return {};
    }
}

/**
 * Get local settings object (placeholder)
 * 
 * @returns {Object} Local settings
 */
function getLocalSettings() {
    // Placeholder - would implement local settings loading
    return {};
}

/**
 * Get user configuration file path (placeholder)
 * 
 * @returns {string} User config path
 */
function getUserConfigPath() {
    // Placeholder - would return actual user config path
    return '~/.claude/config.json';
}

/**
 * Log MCP scope usage for telemetry
 * 
 * @param {Object} stats - Usage statistics by scope
 */
function logMcpScopeUsage(stats) {
    // Placeholder for telemetry logging
    console.log('MCP scope usage:', stats);
}

/**
 * Scope Configuration Manager
 * 
 * High-level interface for managing MCP scope configurations
 */
export class ScopeConfigurationManager {
    /**
     * Get all available MCP servers with scope filtering
     * 
     * @param {string[]} scopes - Scopes to include (default: all)
     * @returns {Object} Filtered MCP servers by scope
     */
    getServersByScopes(scopes = VALID_SCOPES) {
        const result = {};
        
        for (const scope of scopes) {
            if (VALID_SCOPES.includes(scope)) {
                result[scope] = getServersByScope(scope);
            }
        }
        
        return result;
    }
    
    /**
     * Get merged servers with approval filtering
     * 
     * @returns {Object} All approved MCP servers
     */
    getMergedServers() {
        return getAllMcpServers();
    }
    
    /**
     * Check server availability across scopes
     * 
     * @param {string} serverName - Server name to check
     * @returns {Object} Server availability info
     */
    checkServerAvailability(serverName) {
        const availability = {
            found: false,
            scope: null,
            config: null,
            approvalStatus: null
        };
        
        const server = findServerByName(serverName);
        if (server) {
            availability.found = true;
            availability.scope = server.scope;
            availability.config = server;
            
            if (server.scope === MCP_SCOPES.PROJECT) {
                availability.approvalStatus = getProjectServerApprovalStatus(serverName);
            }
        }
        
        return availability;
    }
    
    /**
     * Validate scope configuration
     * 
     * @param {string} scope - Scope to validate
     * @param {Object} config - Configuration to validate
     * @returns {Array} Validation errors
     */
    validateScopeConfiguration(scope, config) {
        const errors = [];
        
        try {
            validateScope(scope);
        } catch (error) {
            errors.push(error.message);
        }
        
        const { errors: configErrors } = validateMcpConfiguration({
            configObject: config,
            scope
        });
        
        errors.push(...configErrors.map(err => err.message));
        
        return errors;
    }
}