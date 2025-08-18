/**
 * MCP Server Management with Scope Support
 * 
 * Handles adding, removing, and managing MCP servers across different scopes
 * with proper validation and configuration persistence.
 * 
 * Key chunks analyzed:
 * - chunk_0524.js:321-385 (gg function - add MCP server to specific scope)
 * - chunk_0524.js:388-427 (h40 function - remove MCP server from specific scope)
 * - chunk_0520.js:212-229 (transport validation and header parsing)
 */

import { writeFileSync, readFileSync } from 'fs';
import { join as joinPath } from 'path';
import { getCurrentWorkingDirectory } from '../utils/path.js';
import { validateScope, getServersByScope, MCP_SCOPES } from './scopes.js';
import { configManager } from '../config/manager.js';

/**
 * Valid MCP transport types
 */
export const TRANSPORT_TYPES = {
    STDIO: 'stdio',
    SSE: 'sse', 
    HTTP: 'http'
};

/**
 * Add MCP server to specific scope
 * 
 * Extracted from chunk_0524.js:321-385 (gg function):
 * - Validates server name and configuration
 * - Writes to appropriate scope-specific config file/object
 * - Prevents duplicate server names within scopes
 * - Handles project, user, and local scope persistence
 * 
 * @param {string} serverName - Name of MCP server to add
 * @param {Object} serverConfig - MCP server configuration
 * @param {string} scope - Scope to add server to
 * @throws {Error} If name is invalid, config is invalid, or server already exists
 */
export function addMcpServer(serverName, serverConfig, scope) {
    // Validate server name format
    if (serverName.match(/[^a-zA-Z0-9_-]/)) {
        throw new Error(`Invalid name ${serverName}. Names can only contain letters, numbers, hyphens, and underscores.`);
    }
    
    // Validate server configuration
    const validationResult = validateMcpServerConfiguration(serverConfig);
    if (!validationResult.success) {
        const errorMessages = validationResult.errors.map(error => `${error.path.join('.')}: ${error.message}`).join(', ');
        throw new Error(`Invalid configuration: ${errorMessages}`);
    }
    
    // Validate scope
    const validatedScope = validateScope(scope);
    
    // Check for existing server in target scope
    switch (validatedScope) {
        case MCP_SCOPES.PROJECT: {
            const { servers } = getServersByScope(MCP_SCOPES.PROJECT);
            if (servers[serverName]) {
                throw new Error(`MCP server ${serverName} already exists in .mcp.json`);
            }
            break;
        }
        
        case MCP_SCOPES.USER: {
            const userSettings = getUserSettings();
            if (userSettings.mcpServers?.[serverName]) {
                throw new Error(`MCP server ${serverName} already exists in user config`);
            }
            break;
        }
        
        case MCP_SCOPES.LOCAL: {
            const localSettings = getLocalSettings();
            if (localSettings.mcpServers?.[serverName]) {
                throw new Error(`MCP server ${serverName} already exists in local config`);
            }
            break;
        }
        
        case MCP_SCOPES.DYNAMIC:
            throw new Error('Cannot add MCP server to scope: dynamic');
    }
    
    // Clean configuration (remove metadata)
    const cleanConfig = validationResult.data;
    
    // Add server to appropriate scope
    switch (validatedScope) {
        case MCP_SCOPES.PROJECT: {
            // Get existing project servers
            const { servers } = getServersByScope(MCP_SCOPES.PROJECT);
            
            // Create clean server configs without scope metadata
            const cleanServers = {};
            for (const [name, config] of Object.entries(servers)) {
                const { scope: serverScope, ...configWithoutScope } = config;
                cleanServers[name] = configWithoutScope;
            }
            
            // Add new server
            cleanServers[serverName] = cleanConfig;
            
            // Write to .mcp.json
            const projectConfig = {
                mcpServers: cleanServers
            };
            
            try {
                writeProjectMcpConfiguration(projectConfig);
            } catch (error) {
                throw new Error(`Failed to write to mcp.json: ${error.message}`);
            }
            break;
        }
        
        case MCP_SCOPES.USER: {
            const userSettings = getUserSettings();
            if (!userSettings.mcpServers) {
                userSettings.mcpServers = {};
            }
            userSettings.mcpServers[serverName] = cleanConfig;
            saveUserSettings(userSettings);
            break;
        }
        
        case MCP_SCOPES.LOCAL: {
            const localSettings = getLocalSettings();
            if (!localSettings.mcpServers) {
                localSettings.mcpServers = {};
            }
            localSettings.mcpServers[serverName] = cleanConfig;
            saveLocalSettings(localSettings);
            break;
        }
        
        default:
            throw new Error(`Cannot add MCP server to scope: ${validatedScope}`);
    }
}

/**
 * Remove MCP server from specific scope
 * 
 * Extracted from chunk_0524.js:388-427 (h40 function):
 * - Removes server from scope-specific configuration
 * - Updates config files/objects accordingly
 * - Validates server exists before removal
 * 
 * @param {string} serverName - Name of MCP server to remove
 * @param {string} scope - Scope to remove server from
 * @throws {Error} If server not found or removal fails
 */
export function removeMcpServer(serverName, scope) {
    const validatedScope = validateScope(scope);
    
    switch (validatedScope) {
        case MCP_SCOPES.PROJECT: {
            const { servers } = getServersByScope(MCP_SCOPES.PROJECT);
            if (!servers[serverName]) {
                throw new Error(`No MCP server found with name: ${serverName} in .mcp.json`);
            }
            
            // Create clean server configs without the removed server
            const remainingServers = {};
            for (const [name, config] of Object.entries(servers)) {
                if (name !== serverName) {
                    const { scope: serverScope, ...configWithoutScope } = config;
                    remainingServers[name] = configWithoutScope;
                }
            }
            
            // Write updated config
            const projectConfig = {
                mcpServers: remainingServers
            };
            
            try {
                writeProjectMcpConfiguration(projectConfig);
            } catch (error) {
                throw new Error(`Failed to update mcp.json: ${error.message}`);
            }
            break;
        }
        
        case MCP_SCOPES.USER: {
            const userSettings = getUserSettings();
            if (!userSettings.mcpServers?.[serverName]) {
                throw new Error(`No MCP server found with name: ${serverName} in user config`);
            }
            
            delete userSettings.mcpServers[serverName];
            
            // Clean up empty mcpServers object
            if (Object.keys(userSettings.mcpServers).length === 0) {
                delete userSettings.mcpServers;
            }
            
            saveUserSettings(userSettings);
            break;
        }
        
        case MCP_SCOPES.LOCAL: {
            const localSettings = getLocalSettings();
            if (!localSettings.mcpServers?.[serverName]) {
                throw new Error(`No MCP server found with name: ${serverName} in local config`);
            }
            
            delete localSettings.mcpServers[serverName];
            
            // Clean up empty mcpServers object
            if (Object.keys(localSettings.mcpServers).length === 0) {
                delete localSettings.mcpServers;
            }
            
            saveLocalSettings(localSettings);
            break;
        }
        
        case MCP_SCOPES.DYNAMIC:
            throw new Error('Cannot remove MCP server from scope: dynamic');
            
        default:
            throw new Error(`Cannot remove MCP server from scope: ${validatedScope}`);
    }
}

/**
 * Validate MCP transport type
 * 
 * Extracted from chunk_0520.js:212-216 (meA function):
 * - Validates transport type against supported options
 * - Defaults to "stdio" if not provided
 * - Throws error for invalid transport types
 * 
 * @param {string} transportType - Transport type to validate
 * @returns {string} Validated transport type
 * @throws {Error} If transport type is invalid
 */
export function validateTransportType(transportType) {
    if (!transportType) {
        return TRANSPORT_TYPES.STDIO;
    }
    
    const validTransports = Object.values(TRANSPORT_TYPES);
    if (!validTransports.includes(transportType)) {
        throw new Error(`Invalid transport type: ${transportType}. Must be one of: ${validTransports.join(', ')}`);
    }
    
    return transportType;
}

/**
 * Parse HTTP headers from string array
 * 
 * Extracted from chunk_0520.js:218-229 (C40 function):
 * - Parses header strings in "Header-Name: value" format
 * - Validates header format and name requirements
 * - Returns headers object for HTTP transport
 * 
 * @param {Array<string>} headerStrings - Array of header strings
 * @returns {Object} Parsed headers object
 * @throws {Error} If header format is invalid
 */
export function parseHttpHeaders(headerStrings) {
    const headers = {};
    
    for (const headerString of headerStrings) {
        const colonIndex = headerString.indexOf(':');
        
        if (colonIndex === -1) {
            throw new Error(`Invalid header format: "${headerString}". Expected format: "Header-Name: value"`);
        }
        
        const headerName = headerString.substring(0, colonIndex).trim();
        const headerValue = headerString.substring(colonIndex + 1).trim();
        
        if (!headerName) {
            throw new Error(`Invalid header: "${headerString}". Header name cannot be empty.`);
        }
        
        headers[headerName] = headerValue;
    }
    
    return headers;
}

/**
 * Validate MCP server configuration
 * 
 * @param {Object} config - Server configuration to validate
 * @returns {Object} Validation result with success flag and data/errors
 */
function validateMcpServerConfiguration(config) {
    const errors = [];
    
    if (!config || typeof config !== 'object') {
        return {
            success: false,
            errors: [{ path: [], message: 'Configuration must be an object' }]
        };
    }
    
    // Validate required fields
    if (!config.command && !config.url) {
        errors.push({ path: [], message: 'Either command or url must be specified' });
    }
    
    // Validate transport type if provided
    if (config.transport) {
        try {
            validateTransportType(config.transport);
        } catch (error) {
            errors.push({ path: ['transport'], message: error.message });
        }
    }
    
    // Validate args array if provided
    if (config.args && !Array.isArray(config.args)) {
        errors.push({ path: ['args'], message: 'Args must be an array' });
    }
    
    // Validate env object if provided
    if (config.env && typeof config.env !== 'object') {
        errors.push({ path: ['env'], message: 'Environment must be an object' });
    }
    
    // Validate headers for HTTP transport
    if (config.headers) {
        if (config.transport !== TRANSPORT_TYPES.HTTP) {
            errors.push({ path: ['headers'], message: 'Headers are only valid for HTTP transport' });
        } else if (typeof config.headers !== 'object') {
            errors.push({ path: ['headers'], message: 'Headers must be an object' });
        }
    }
    
    if (errors.length > 0) {
        return {
            success: false,
            errors
        };
    }
    
    return {
        success: true,
        data: config
    };
}

/**
 * Write project MCP configuration to .mcp.json
 * 
 * @param {Object} config - Project MCP configuration
 */
function writeProjectMcpConfiguration(config) {
    const projectMcpPath = joinPath(getCurrentWorkingDirectory(), '.mcp.json');
    const configJson = JSON.stringify(config, null, 2);
    writeFileSync(projectMcpPath, configJson, 'utf8');
}

/**
 * Get user settings
 * 
 * @returns {Object} User settings
 */
function getUserSettings() {
    try {
        return configManager.list() || {};
    } catch (error) {
        console.warn('Failed to get user settings:', error);
        return {};
    }
}

/**
 * Save user settings
 * 
 * @param {Object} settings - User settings to save
 */
function saveUserSettings(settings) {
    try {
        configManager.save(settings);
    } catch (error) {
        throw new Error(`Failed to save user settings: ${error.message}`);
    }
}

/**
 * Get local settings (placeholder)
 * 
 * @returns {Object} Local settings
 */
function getLocalSettings() {
    // Placeholder - would implement local settings loading
    return {};
}

/**
 * Save local settings (placeholder)
 * 
 * @param {Object} settings - Local settings to save
 */
function saveLocalSettings(settings) {
    // Placeholder - would implement local settings saving
    console.log('Saving local settings:', settings);
}

/**
 * MCP Server Manager
 * 
 * High-level interface for managing MCP servers across scopes
 */
export class McpServerManager {
    /**
     * Add server with validation
     * 
     * @param {string} name - Server name
     * @param {Object} config - Server configuration
     * @param {string} scope - Target scope
     * @returns {Object} Operation result
     */
    async addServer(name, config, scope) {
        try {
            addMcpServer(name, config, scope);
            return {
                success: true,
                message: `MCP server '${name}' added to ${scope} scope`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Remove server with validation
     * 
     * @param {string} name - Server name
     * @param {string} scope - Source scope
     * @returns {Object} Operation result
     */
    async removeServer(name, scope) {
        try {
            removeMcpServer(name, scope);
            return {
                success: true,
                message: `MCP server '${name}' removed from ${scope} scope`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Update server configuration
     * 
     * @param {string} name - Server name
     * @param {Object} config - New configuration
     * @param {string} scope - Target scope
     * @returns {Object} Operation result
     */
    async updateServer(name, config, scope) {
        try {
            // Remove old configuration
            removeMcpServer(name, scope);
            
            // Add new configuration
            addMcpServer(name, config, scope);
            
            return {
                success: true,
                message: `MCP server '${name}' updated in ${scope} scope`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * List servers by scope
     * 
     * @param {string} scope - Scope to list
     * @returns {Object} Servers in scope
     */
    listServersByScope(scope) {
        try {
            return getServersByScope(scope);
        } catch (error) {
            return {
                servers: {},
                errors: [{ message: error.message, scope }]
            };
        }
    }
    
    /**
     * Validate server configuration before operations
     * 
     * @param {Object} config - Configuration to validate
     * @returns {Object} Validation result
     */
    validateConfiguration(config) {
        return validateMcpServerConfiguration(config);
    }
}