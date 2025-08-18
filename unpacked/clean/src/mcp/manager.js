/**
 * MCP Server Manager
 * 
 * Manages MCP server configurations and lifecycle.
 * Handles server configurations across different scopes (local, user, project).
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { configManager } from '../config/manager.js';

// Configuration file paths for different scopes
const MCP_CONFIG_PATHS = {
    local: '.mcp.json',
    user: path.join(os.homedir(), '.config', 'claude', 'mcp_servers.json'),
    project: '.mcp.json'  // Same as local, but contextually different
};

// Claude Desktop config paths (for import functionality)
const CLAUDE_DESKTOP_PATHS = {
    macos: path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json'),
    linux: path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json'),
    windows: path.join(os.homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json')
};

export class McpServerManager {
    constructor() {
        this._serverCache = new Map();
        this._configCache = new Map();
    }
    
    /**
     * Get the appropriate config file path for a scope
     * @param {string} scope - Configuration scope
     * @returns {string} Config file path
     */
    _getConfigPath(scope) {
        if (scope === 'user') {
            return MCP_CONFIG_PATHS.user;
        }
        return path.resolve(process.cwd(), MCP_CONFIG_PATHS.local);
    }
    
    /**
     * Load MCP configuration from file
     * @param {string} scope - Configuration scope
     * @returns {object} Configuration object
     */
    _loadConfig(scope) {
        const cacheKey = `${scope}_config`;
        
        if (this._configCache.has(cacheKey)) {
            return this._configCache.get(cacheKey);
        }
        
        const configPath = this._getConfigPath(scope);
        let config = { mcpServers: {} };
        
        try {
            if (fs.existsSync(configPath)) {
                const content = fs.readFileSync(configPath, 'utf8');
                const parsed = JSON.parse(content);
                
                // Handle different config formats
                if (parsed.mcpServers) {
                    config = parsed;
                } else {
                    // Assume the entire file is the servers object
                    config = { mcpServers: parsed };
                }
            }
        } catch (error) {
            console.warn(`Warning: Failed to load MCP config from ${configPath}:`, error.message);
        }
        
        this._configCache.set(cacheKey, config);
        return config;
    }
    
    /**
     * Save MCP configuration to file
     * @param {object} config - Configuration to save
     * @param {string} scope - Configuration scope
     */
    _saveConfig(config, scope) {
        const configPath = this._getConfigPath(scope);
        
        try {
            // Ensure directory exists for user scope
            if (scope === 'user') {
                fs.mkdirSync(path.dirname(configPath), { recursive: true });
            }
            
            const content = JSON.stringify(config, null, 2);
            fs.writeFileSync(configPath, content, 'utf8');
            
            // Update cache
            const cacheKey = `${scope}_config`;
            this._configCache.set(cacheKey, config);
            
        } catch (error) {
            throw new Error(`Failed to save MCP config to ${configPath}: ${error.message}`);
        }
    }
    
    /**
     * Validate server configuration
     * @param {object} serverConfig - Server configuration to validate
     * @throws {Error} If configuration is invalid
     */
    _validateServerConfig(serverConfig) {
        if (!serverConfig.name || typeof serverConfig.name !== 'string') {
            throw new Error('Server name is required and must be a string');
        }
        
        if (!serverConfig.command || typeof serverConfig.command !== 'string') {
            throw new Error('Server command is required and must be a string');
        }
        
        // Validate transport type
        const validTransports = ['stdio', 'sse', 'http'];
        const transport = serverConfig.transport || 'stdio';
        if (!validTransports.includes(transport)) {
            throw new Error(`Invalid transport type: ${transport}. Must be one of: ${validTransports.join(', ')}`);
        }
        
        // Validate args if present
        if (serverConfig.args && !Array.isArray(serverConfig.args)) {
            throw new Error('Server args must be an array');
        }
        
        // Validate env if present
        if (serverConfig.env && typeof serverConfig.env !== 'object') {
            throw new Error('Server env must be an object');
        }
    }
    
    /**
     * Add an MCP server configuration
     * @param {object} serverConfig - Server configuration
     * @param {string} scope - Configuration scope (local, user, project)
     */
    async addServer(serverConfig, scope = 'local') {
        this._validateServerConfig(serverConfig);
        
        const config = this._loadConfig(scope);
        
        // Check if server already exists
        if (config.mcpServers[serverConfig.name]) {
            throw new Error(`Server '${serverConfig.name}' already exists in ${scope} scope`);
        }
        
        // Add server to configuration
        const serverEntry = {
            command: serverConfig.command,
            args: serverConfig.args || [],
            transport: serverConfig.transport || 'stdio'
        };
        
        // Add optional fields
        if (serverConfig.env) {
            serverEntry.env = serverConfig.env;
        }
        
        if (serverConfig.headers) {
            serverEntry.headers = serverConfig.headers;
        }
        
        config.mcpServers[serverConfig.name] = serverEntry;
        
        this._saveConfig(config, scope);
        
        console.log(`✅ Added MCP server '${serverConfig.name}' to ${scope} scope`);
        console.log(`   Command: ${serverConfig.command}`);
        console.log(`   Transport: ${serverEntry.transport}`);
        
        if (serverConfig.args && serverConfig.args.length > 0) {
            console.log(`   Args: [${serverConfig.args.join(', ')}]`);
        }
    }
    
    /**
     * Remove an MCP server configuration
     * @param {string} name - Server name
     * @param {string} scope - Configuration scope
     */
    async removeServer(name, scope = 'local') {
        const config = this._loadConfig(scope);
        
        if (!config.mcpServers[name]) {
            throw new Error(`Server '${name}' not found in ${scope} scope`);
        }
        
        delete config.mcpServers[name];
        this._saveConfig(config, scope);
        
        console.log(`✅ Removed MCP server '${name}' from ${scope} scope`);
    }
    
    /**
     * List all configured MCP servers
     * @param {string} scope - Optional scope filter
     * @returns {Array} List of server configurations with metadata
     */
    async listServers(scope = null) {
        const servers = [];
        const scopes = scope ? [scope] : ['local', 'user'];
        
        for (const currentScope of scopes) {
            try {
                const config = this._loadConfig(currentScope);
                const configPath = this._getConfigPath(currentScope);
                
                for (const [name, serverConfig] of Object.entries(config.mcpServers)) {
                    servers.push({
                        name,
                        ...serverConfig,
                        scope: currentScope,
                        configPath,
                        status: 'configured' // TODO: Add actual status checking
                    });
                }
            } catch (error) {
                // Skip scope if config can't be loaded
                continue;
            }
        }
        
        return servers.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    /**
     * Get details about a specific MCP server
     * @param {string} name - Server name
     * @returns {object|null} Server configuration with metadata
     */
    async getServer(name) {
        const servers = await this.listServers();
        return servers.find(server => server.name === name) || null;
    }
    
    /**
     * Get Claude Desktop configuration path for current platform
     * @returns {string|null} Path to Claude Desktop config
     */
    _getClaudeDesktopConfigPath() {
        const platform = process.platform;
        
        switch (platform) {
            case 'darwin':
                return CLAUDE_DESKTOP_PATHS.macos;
            case 'linux':
                return CLAUDE_DESKTOP_PATHS.linux;
            case 'win32':
                return CLAUDE_DESKTOP_PATHS.windows;
            default:
                return null;
        }
    }
    
    /**
     * Import MCP servers from Claude Desktop configuration
     * @param {string} scope - Target scope for imported servers
     * @returns {number} Number of imported servers
     */
    async importFromClaudeDesktop(scope = 'user') {
        const desktopConfigPath = this._getClaudeDesktopConfigPath();
        
        if (!desktopConfigPath) {
            throw new Error(`Claude Desktop import not supported on platform: ${process.platform}`);
        }
        
        if (!fs.existsSync(desktopConfigPath)) {
            throw new Error(`Claude Desktop config not found at: ${desktopConfigPath}`);
        }
        
        let desktopConfig;
        try {
            const content = fs.readFileSync(desktopConfigPath, 'utf8');
            desktopConfig = JSON.parse(content);
        } catch (error) {
            throw new Error(`Failed to read Claude Desktop config: ${error.message}`);
        }
        
        if (!desktopConfig.mcpServers) {
            console.log('No MCP servers found in Claude Desktop configuration');
            return 0;
        }
        
        const config = this._loadConfig(scope);
        let importedCount = 0;
        
        for (const [name, serverConfig] of Object.entries(desktopConfig.mcpServers)) {
            try {
                // Skip if server already exists
                if (config.mcpServers[name]) {
                    console.log(`Skipping '${name}' - already exists in ${scope} scope`);
                    continue;
                }
                
                // Convert Claude Desktop format to Claude Code format
                const convertedConfig = {
                    command: serverConfig.command,
                    args: serverConfig.args || [],
                    transport: 'stdio' // Claude Desktop uses stdio
                };
                
                if (serverConfig.env) {
                    convertedConfig.env = serverConfig.env;
                }
                
                config.mcpServers[name] = convertedConfig;
                importedCount++;
                
                console.log(`✅ Imported '${name}' from Claude Desktop`);
                
            } catch (error) {
                console.warn(`Warning: Failed to import '${name}':`, error.message);
            }
        }
        
        if (importedCount > 0) {
            this._saveConfig(config, scope);
            console.log(`\n✅ Successfully imported ${importedCount} MCP servers to ${scope} scope`);
        }
        
        return importedCount;
    }
    
    /**
     * Reset all project-scoped MCP server choices
     */
    async resetProjectChoices() {
        // This would typically clear enabled/disabled server lists
        // For now, we'll clear any project-specific overrides
        
        const projectConfigPath = path.resolve(process.cwd(), '.mcp.json');
        
        if (fs.existsSync(projectConfigPath)) {
            try {
                const config = JSON.parse(fs.readFileSync(projectConfigPath, 'utf8'));
                
                // Clear any approval/rejection lists
                if (config.enabledMcpjsonServers) {
                    delete config.enabledMcpjsonServers;
                }
                if (config.disabledMcpjsonServers) {
                    delete config.disabledMcpjsonServers;
                }
                
                fs.writeFileSync(projectConfigPath, JSON.stringify(config, null, 2), 'utf8');
                console.log('✅ Reset project MCP server choices');
            } catch (error) {
                console.warn('Warning: Failed to reset project choices:', error.message);
            }
        } else {
            console.log('No project MCP configuration found');
        }
    }
    
    /**
     * Clear configuration cache
     */
    clearCache() {
        this._configCache.clear();
        this._serverCache.clear();
    }
}

// Export singleton instance
export const mcpServerManager = new McpServerManager();