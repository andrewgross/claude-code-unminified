/**
 * MCP Server Manager
 * 
 * Manages MCP server configurations and lifecycle with enhanced scope support.
 * Handles server configurations across different scopes (local, user, project).
 * Integrates with scope-based configuration system and project approval workflows.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { configManager } from '../config/manager.js';
import { McpConnectionPool } from './protocol.js';
import { 
    createMcpTransport, 
    createMcpTransportSafe,
    validateTransportConfig,
    transportSupportsAuth,
    isRemoteTransport,
    TRANSPORT_TYPES,
    TransportFactory
} from './transports/factory.js';
import { 
    getAllMcpServers, 
    findServerByName, 
    getServersByScope,
    getProjectServerApprovalStatus,
    validateScope,
    getScopeFilePath,
    getScopeDescription,
    MCP_SCOPES,
    APPROVAL_STATES,
    ScopeConfigurationManager
} from './scopes.js';
import { 
    addMcpServer, 
    removeMcpServer, 
    validateTransportType, 
    parseHttpHeaders,
    McpServerManager as McpServerOperations
} from './management.js';
import { enhancedMcpManager } from './enhanced.js';
import { mcpServerValidator, mcpHealthMonitor } from './validation.js';

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
    constructor(options = {}) {
        this._serverCache = new Map();
        this._configCache = new Map();
        this._connectionPool = new McpConnectionPool({
            debug: options.debug
        });
        
        // Initialize scope configuration manager
        this._scopeManager = new ScopeConfigurationManager();
        this._operationsManager = new McpServerOperations();
        
        // Initialize transport factory for SSE and other remote transports
        this._transportFactory = new TransportFactory();
        
        // Initialize enhanced features
        this._validator = mcpServerValidator;
        this._healthMonitor = mcpHealthMonitor;
        this._enhancedManager = enhancedMcpManager;
        
        // Set up connection pool event handlers
        this._connectionPool.on('serverConnect', (name) => {
            console.log(`✅ MCP server '${name}' connected`);
        });
        
        this._connectionPool.on('serverDisconnect', (name) => {
            console.log(`⚠️  MCP server '${name}' disconnected`);
        });
        
        this._connectionPool.on('serverError', (name, error) => {
            console.error(`❌ MCP server '${name}' error:`, error.message);
        });
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
     * Add an MCP server configuration using enhanced scope system with validation
     * @param {object} serverConfig - Server configuration
     * @param {string} scope - Configuration scope (local, user, project)
     */
    async addServer(serverConfig, scope = 'local') {
        try {
            // Enhanced validation first
            console.log(`🔍 Validating server configuration for '${serverConfig.name}'`);
            const validation = this._validator.validateServerConfiguration(
                serverConfig.name, 
                serverConfig, 
                scope
            );
            
            if (!validation.isValid) {
                const fatalErrors = validation.errors.filter(e => e.type === 'fatal');
                throw new Error(`Configuration validation failed: ${fatalErrors.map(e => e.message).join(', ')}`);
            }
            
            // Show warnings if any
            if (validation.warnings.length > 0) {
                console.warn('⚠️  Configuration warnings:');
                validation.warnings.forEach(warning => {
                    console.warn(`   - ${warning.message}`);
                    if (warning.suggestion) {
                        console.warn(`     Suggestion: ${warning.suggestion}`);
                    }
                });
            }
            
            // Show suggestions if any
            if (validation.suggestions.length > 0) {
                console.log('💡 Configuration suggestions:');
                validation.suggestions.forEach(suggestion => {
                    console.log(`   - ${suggestion.message}`);
                });
            }
            
            // Use the enhanced scope-based management system
            const result = await this._operationsManager.addServer(serverConfig.name, serverConfig, scope);
            
            if (result.success) {
                // Clear cache to ensure fresh data
                this.clearCache();
                
                console.log(result.message);
                console.log(`   Command: ${serverConfig.command}`);
                console.log(`   Transport: ${serverConfig.transport || 'stdio'}`);
                
                if (serverConfig.args && serverConfig.args.length > 0) {
                    console.log(`   Args: [${serverConfig.args.join(', ')}]`);
                }
                
                // Show scope information
                const scopeDesc = getScopeDescription(scope);
                console.log(`   Scope: ${scopeDesc}`);
                
                // Show validation metadata
                console.log(`   Remote: ${validation.metadata.isRemote ? 'Yes' : 'No'}`);
                console.log(`   Auth Support: ${validation.metadata.supportsAuth ? 'Yes' : 'No'}`);
                
                return result;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            // Fallback to legacy method if enhanced system fails
            console.warn('Falling back to legacy add method:', error.message);
            return this._legacyAddServer(serverConfig, scope);
        }
    }

    /**
     * Legacy add server method (fallback)
     * @param {object} serverConfig - Server configuration
     * @param {string} scope - Configuration scope
     */
    async _legacyAddServer(serverConfig, scope) {
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
        
        return { success: true };
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
     * Start MCP server connections
     * @param {Array} serverNames - Optional list of server names to start
     */
    async startServers(serverNames = null) {
        const servers = await this.listServers();
        const serversToStart = serverNames 
            ? servers.filter(server => serverNames.includes(server.name))
            : servers;
        
        const startPromises = serversToStart.map(async (serverConfig) => {
            try {
                await this._connectionPool.addServer(serverConfig.name, {
                    command: serverConfig.command,
                    args: serverConfig.args,
                    transport: serverConfig.transport,
                    env: serverConfig.env
                });
            } catch (error) {
                console.warn(`Warning: Failed to start MCP server '${serverConfig.name}':`, error.message);
            }
        });
        
        await Promise.allSettled(startPromises);
        
        const connectedCount = this._connectionPool.getConnectionStatus()
            .filter(status => status.connected).length;
        
        console.log(`Started ${connectedCount}/${serversToStart.length} MCP servers`);
    }
    
    /**
     * Stop MCP server connections
     * @param {Array} serverNames - Optional list of server names to stop
     */
    async stopServers(serverNames = null) {
        if (serverNames) {
            for (const name of serverNames) {
                await this._connectionPool.removeServer(name);
            }
        } else {
            await this._connectionPool.disconnectAll();
        }
    }
    
    /**
     * Execute a tool using MCP protocol
     * @param {string} toolName - Name of the tool to execute
     * @param {object} arguments_ - Tool arguments
     * @returns {Promise<object>} Tool execution result
     */
    async executeTool(toolName, arguments_) {
        try {
            return await this._connectionPool.executeTool(toolName, arguments_);
        } catch (error) {
            throw new Error(`Tool execution failed: ${error.message}`);
        }
    }
    
    /**
     * Get all available tools from connected servers
     * @returns {Array} Available tools with server information
     */
    getAvailableTools() {
        return this._connectionPool.getAllAvailableTools();
    }
    
    /**
     * Get connection status for all servers
     * @returns {Array} Connection status information
     */
    getConnectionStatus() {
        return this._connectionPool.getConnectionStatus();
    }
    
    /**
     * Get MCP client for a specific server
     * @param {string} serverName - Name of the server
     * @returns {McpClient|null} MCP client or null if not connected
     */
    getClient(serverName) {
        return this._connectionPool.getClient(serverName);
    }
    
    /**
     * Clear configuration cache
     */
    clearCache() {
        this._configCache.clear();
        this._serverCache.clear();
    }
    
    // Enhanced Scope-Based Methods
    
    /**
     * Get all MCP servers with scope precedence and approval filtering
     * @returns {Object} Combined MCP server configuration from all scopes
     */
    getAllServersWithScopes() {
        return getAllMcpServers();
    }
    
    /**
     * Find server by name across all scopes with precedence
     * @param {string} serverName - Server name to find
     * @returns {Object|null} Server configuration with scope metadata
     */
    findServer(serverName) {
        return findServerByName(serverName);
    }
    
    /**
     * Get servers by specific scope
     * @param {string} scope - Scope to retrieve servers from
     * @returns {Object} Servers and errors for the scope
     */
    getServersByScope(scope) {
        return getServersByScope(scope);
    }
    
    /**
     * Check project server approval status
     * @param {string} serverName - Server name to check
     * @returns {string} Approval status (pending, approved, rejected)
     */
    getProjectApprovalStatus(serverName) {
        return getProjectServerApprovalStatus(serverName);
    }
    
    /**
     * Get scope file path with existence status
     * @param {string} scope - Scope name
     * @returns {string} File path with status
     */
    getScopeInfo(scope) {
        return {
            filePath: getScopeFilePath(scope),
            description: getScopeDescription(scope),
            isValid: Object.values(MCP_SCOPES).includes(scope)
        };
    }
    
    /**
     * List servers with enhanced scope information
     * @param {string} scope - Optional scope filter
     * @returns {Array} List of servers with detailed scope information
     */
    async listServersWithScopes(scope = null) {
        const servers = [];
        const scopes = scope ? [scope] : Object.values(MCP_SCOPES).filter(s => s !== MCP_SCOPES.DYNAMIC);
        
        for (const currentScope of scopes) {
            try {
                const { servers: scopeServers, errors } = getServersByScope(currentScope);
                
                for (const [name, serverConfig] of Object.entries(scopeServers)) {
                    const server = {
                        name,
                        ...serverConfig,
                        scope: currentScope,
                        scopeDescription: getScopeDescription(currentScope),
                        configPath: getScopeFilePath(currentScope),
                        status: 'configured'
                    };
                    
                    // Add approval status for project servers
                    if (currentScope === MCP_SCOPES.PROJECT) {
                        server.approvalStatus = getProjectServerApprovalStatus(name);
                        server.needsApproval = server.approvalStatus === APPROVAL_STATES.PENDING;
                    }
                    
                    servers.push(server);
                }
                
                // Log any errors
                if (errors.length > 0) {
                    console.warn(`Errors in ${currentScope} scope:`, errors);
                }
                
            } catch (error) {
                console.warn(`Failed to load servers from ${currentScope} scope:`, error.message);
            }
        }
        
        return servers.sort((a, b) => {
            // Sort by scope precedence, then by name
            const scopePriority = {
                [MCP_SCOPES.LOCAL]: 1,
                [MCP_SCOPES.PROJECT]: 2,
                [MCP_SCOPES.USER]: 3
            };
            
            const aPriority = scopePriority[a.scope] || 99;
            const bPriority = scopePriority[b.scope] || 99;
            
            if (aPriority !== bPriority) {
                return aPriority - bPriority;
            }
            
            return a.name.localeCompare(b.name);
        });
    }
    
    /**
     * Check server availability across scopes
     * @param {string} serverName - Server name to check
     * @returns {Object} Detailed availability information
     */
    checkServerAvailability(serverName) {
        return this._scopeManager.checkServerAvailability(serverName);
    }
    
    /**
     * Get merged servers from all scopes (approved only)
     * @returns {Object} All approved MCP servers
     */
    getMergedServers() {
        return this._scopeManager.getMergedServers();
    }
    
    /**
     * Validate scope configuration
     * @param {string} scope - Scope to validate
     * @param {Object} config - Configuration to validate
     * @returns {Array} Validation errors
     */
    validateScopeConfiguration(scope, config) {
        return this._scopeManager.validateScopeConfiguration(scope, config);
    }
    
    /**
     * Start servers with scope-based filtering and enhanced transport support
     * @param {Array} serverNames - Optional list of server names
     * @param {string} scopeFilter - Optional scope filter
     */
    async startServersWithScopes(serverNames = null, scopeFilter = null) {
        const mergedServers = this.getMergedServers();
        const availableServers = Object.entries(mergedServers)
            .filter(([name, config]) => {
                // Filter by server names if specified
                if (serverNames && !serverNames.includes(name)) {
                    return false;
                }
                
                // Filter by scope if specified
                if (scopeFilter && config.scope !== scopeFilter) {
                    return false;
                }
                
                // Only start approved project servers
                if (config.scope === MCP_SCOPES.PROJECT) {
                    return getProjectServerApprovalStatus(name) === APPROVAL_STATES.APPROVED;
                }
                
                return true;
            })
            .map(([name, config]) => ({ name, ...config }));
        
        const startPromises = availableServers.map(async (serverConfig) => {
            try {
                // Use enhanced transport creation for remote servers
                if (isRemoteTransport(serverConfig.transport)) {
                    console.log(`Starting ${serverConfig.transport} server: ${serverConfig.name}`);
                    
                    // Validate transport configuration
                    const validationErrors = validateTransportConfig(serverConfig);
                    if (validationErrors.length > 0) {
                        throw new Error(`Invalid transport config: ${validationErrors.join(', ')}`);
                    }
                    
                    // Create transport using factory
                    const transportResult = await this._transportFactory.createTransport(serverConfig.name, serverConfig);
                    if (!transportResult.success) {
                        throw new Error(transportResult.error);
                    }
                    
                    // Start the transport
                    const transport = transportResult.transport;
                    await transport.start();
                    
                    console.log(`✅ ${serverConfig.transport.toUpperCase()} server '${serverConfig.name}' started`);
                    
                    // Show authentication info for remote servers
                    if (transportSupportsAuth(serverConfig.transport)) {
                        const authStatus = transport._authProvider ? 
                            await this._checkAuthStatus(transport._authProvider) : 'No auth';
                        console.log(`   Auth status: ${authStatus}`);
                    }
                    
                } else {
                    // Use existing connection pool for stdio servers
                    await this._connectionPool.addServer(serverConfig.name, {
                        command: serverConfig.command,
                        args: serverConfig.args,
                        transport: serverConfig.transport || 'stdio',
                        env: serverConfig.env
                    });
                }
                
            } catch (error) {
                console.warn(`Warning: Failed to start MCP server '${serverConfig.name}' from ${serverConfig.scope} scope:`, error.message);
                
                // Show additional info for transport errors
                if (isRemoteTransport(serverConfig.transport)) {
                    console.warn(`   Transport: ${serverConfig.transport}`);
                    console.warn(`   URL: ${serverConfig.url}`);
                    if (transportSupportsAuth(serverConfig.transport)) {
                        console.warn('   Try running authentication flow if this is an auth error');
                    }
                }
            }
        });
        
        await Promise.allSettled(startPromises);
        
        // Count connections from both transport factory and connection pool
        const connectionPoolCount = this._connectionPool.getConnectionStatus()
            .filter(status => status.connected).length;
        const transportFactoryCount = this._transportFactory.listTransports()
            .filter(transport => transport.connected).length;
        
        const totalConnected = connectionPoolCount + transportFactoryCount;
        
        console.log(`Started ${totalConnected}/${availableServers.length} MCP servers (scope-filtered)`);
        console.log(`  - Local (stdio): ${connectionPoolCount}`);
        console.log(`  - Remote (SSE/HTTP): ${transportFactoryCount}`);
    }
    
    /**
     * Show detailed server information including scope details
     * @param {string} serverName - Server name
     * @returns {Object|null} Detailed server information
     */
    async getServerDetails(serverName) {
        const availability = this.checkServerAvailability(serverName);
        
        if (!availability.found) {
            return null;
        }
        
        const config = availability.config;
        const connectionStatus = this._connectionPool.getConnectionStatus()
            .find(status => status.serverName === serverName);
        
        return {
            name: serverName,
            ...config,
            scope: availability.scope,
            scopeDescription: getScopeDescription(availability.scope),
            approvalStatus: availability.approvalStatus,
            needsApproval: availability.approvalStatus === APPROVAL_STATES.PENDING,
            connectionStatus: connectionStatus?.connected ? 'connected' : 'disconnected',
            tools: connectionStatus?.connected ? this._connectionPool.getServerTools(serverName) : [],
            configPath: getScopeFilePath(availability.scope)
        };
    }
    
    // Enhanced Management Methods
    
    /**
     * Start enhanced monitoring with health checks and metrics
     */
    async startEnhancedMonitoring() {
        console.log('🚀 Starting enhanced MCP server monitoring');
        
        // Start health monitoring
        this._healthMonitor.startMonitoring();
        
        // Start enhanced connection manager
        await this._enhancedManager.startEnhancedMonitoring();
        
        console.log('✅ Enhanced monitoring started');
    }
    
    /**
     * Stop enhanced monitoring
     */
    async stopEnhancedMonitoring() {
        console.log('🛑 Stopping enhanced MCP server monitoring');
        
        // Stop health monitoring
        this._healthMonitor.stopMonitoring();
        
        // Stop enhanced connection manager
        await this._enhancedManager.stopEnhancedMonitoring();
        
        console.log('✅ Enhanced monitoring stopped');
    }
    
    /**
     * Connect servers with enhanced batch processing and monitoring
     */
    async connectServersEnhanced(serverNames = null, options = {}) {
        return await this._enhancedManager.connectServersEnhanced(serverNames, options);
    }
    
    /**
     * Reconnect server with enhanced error handling and recovery
     */
    async reconnectServerEnhanced(serverName, options = {}) {
        return await this._enhancedManager.reconnectServerEnhanced(serverName, options);
    }
    
    /**
     * Prefetch and cache resources from connected servers
     */
    async prefetchAllResources(serverNames = null) {
        return await this._enhancedManager.prefetchAllResources(serverNames);
    }
    
    /**
     * Get comprehensive server status with health metrics
     */
    getEnhancedServerStatus() {
        return this._enhancedManager.getEnhancedServerStatus();
    }
    
    /**
     * Get health monitoring status
     */
    getHealthStatus() {
        return this._healthMonitor.getHealthStatus();
    }
    
    /**
     * Validate server configuration before adding
     */
    validateServerConfiguration(name, config, scope = 'local') {
        return this._validator.validateServerConfiguration(name, config, scope);
    }
    
    /**
     * Get validation cache statistics
     */
    getValidationCacheStats() {
        return this._validator.getCacheStats();
    }
    
    /**
     * Clear all caches (configuration, validation, etc.)
     */
    clearAllCaches() {
        this.clearCache();
        this._validator.clearCache();
        console.log('🧹 Cleared all MCP manager caches');
    }
    
    /**
     * Get comprehensive MCP system status
     */
    getSystemStatus() {
        const baseStatus = this.getConnectionStatus();
        const enhancedStatus = this.getEnhancedServerStatus();
        const healthStatus = this.getHealthStatus();
        const validationStats = this.getValidationCacheStats();
        
        return {
            servers: {
                total: baseStatus.length,
                connected: baseStatus.filter(s => s.connected).length,
                failed: baseStatus.filter(s => !s.connected).length
            },
            enhanced: {
                monitoring: healthStatus.isMonitoring,
                monitoringInterval: healthStatus.monitoringInterval,
                healthyServers: enhancedStatus.filter(s => s.enhancedState === 'healthy').length
            },
            validation: validationStats,
            lastUpdated: new Date().toISOString()
        };
    }
}

// Export singleton instance
export const mcpServerManager = new McpServerManager();