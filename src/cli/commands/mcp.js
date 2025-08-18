/**
 * MCP (Model Context Protocol) Command Handler for Claude Code
 * 
 * This module handles all MCP-related commands including server management,
 * configuration, and communication with MCP servers.
 * 
 * @module MCPCommand
 */

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';
import chalk from 'chalk';
import { EventEmitter } from 'events';

/**
 * MCP transport types
 */
export const MCP_TRANSPORTS = {
    STDIO: 'stdio',
    SSE: 'sse', 
    HTTP: 'http',
    WEBSOCKET: 'websocket'
};

/**
 * MCP server states
 */
export const MCP_SERVER_STATES = {
    STOPPED: 'stopped',
    STARTING: 'starting',
    RUNNING: 'running',
    ERROR: 'error',
    UNKNOWN: 'unknown'
};

/**
 * MCP configuration scopes
 */
export const MCP_SCOPES = {
    LOCAL: 'local',
    USER: 'user',
    PROJECT: 'project'
};

/**
 * MCP server configuration structure
 * @typedef {Object} MCPServerConfig
 * @property {string} name - Server name
 * @property {string} command - Command to run the server
 * @property {Array<string>} args - Command arguments
 * @property {Object} env - Environment variables
 * @property {string} transport - Transport type
 * @property {Object} options - Transport-specific options
 * @property {string} workingDirectory - Working directory for server
 * @property {boolean} enabled - Whether server is enabled
 * @property {Object} metadata - Additional metadata
 */

/**
 * MCP server manager class
 */
export class MCPServerManager extends EventEmitter {
    constructor() {
        super();
        this.servers = new Map(); // name -> server instance
        this.configs = new Map();  // name -> config
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
     * Gets MCP configuration file path for a scope
     * @param {string} scope - Configuration scope
     * @returns {string} Configuration file path
     */
    getConfigPath(scope) {
        switch (scope) {
            case MCP_SCOPES.LOCAL:
                return path.join(process.cwd(), '.claude', 'mcp-servers.json');
            case MCP_SCOPES.USER:
                return path.join(os.homedir(), '.config', 'claude', 'mcp-servers.json');
            case MCP_SCOPES.PROJECT:
                return path.join(process.cwd(), '.mcp.json');
            default:
                throw new Error(`Invalid MCP scope: ${scope}`);
        }
    }
    
    /**
     * Loads MCP server configurations
     * @param {string} scope - Configuration scope
     * @returns {Promise<Object>} Server configurations
     */
    async loadConfigs(scope = MCP_SCOPES.USER) {
        const configPath = this.getConfigPath(scope);
        
        try {
            const content = await fs.readFile(configPath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return { servers: {} };
            }
            throw new Error(`Failed to load MCP config: ${error.message}`);
        }
    }
    
    /**
     * Saves MCP server configurations
     * @param {Object} config - Server configurations
     * @param {string} scope - Configuration scope
     */
    async saveConfigs(config, scope = MCP_SCOPES.USER) {
        const configPath = this.getConfigPath(scope);
        const dir = path.dirname(configPath);
        
        try {
            await fs.mkdir(dir, { recursive: true });
            const content = JSON.stringify(config, null, 2);
            await fs.writeFile(configPath, content, 'utf8');
        } catch (error) {
            throw new Error(`Failed to save MCP config: ${error.message}`);
        }
    }
    
    /**
     * Gets merged server configurations from all scopes
     * @returns {Promise<Object>} Merged configurations
     */
    async getMergedConfigs() {
        const configs = await Promise.all([
            this.loadConfigs(MCP_SCOPES.PROJECT),
            this.loadConfigs(MCP_SCOPES.LOCAL),
            this.loadConfigs(MCP_SCOPES.USER)
        ]);
        
        // Merge server configurations (project -> local -> user)
        const merged = { servers: {} };
        configs.reverse().forEach(config => {
            Object.assign(merged.servers, config.servers || {});
        });
        
        return merged;
    }
    
    /**
     * Adds a new MCP server configuration
     * @param {string} name - Server name
     * @param {MCPServerConfig} config - Server configuration
     * @param {string} scope - Configuration scope
     */
    async addServer(name, config, scope = MCP_SCOPES.USER) {
        const configs = await this.loadConfigs(scope);
        
        if (!configs.servers) {
            configs.servers = {};
        }
        
        // Validate configuration
        this.validateServerConfig(config);
        
        configs.servers[name] = {
            ...config,
            name,
            enabled: true,
            createdAt: new Date().toISOString()
        };
        
        await this.saveConfigs(configs, scope);
        this.emit('serverAdded', { name, config });
    }
    
    /**
     * Removes an MCP server configuration
     * @param {string} name - Server name
     * @param {string} scope - Configuration scope
     */
    async removeServer(name, scope = MCP_SCOPES.USER) {
        const configs = await this.loadConfigs(scope);
        
        if (!configs.servers || !configs.servers[name]) {
            throw new Error(`Server '${name}' not found in ${scope} scope`);
        }
        
        // Stop server if running
        if (this.servers.has(name)) {
            await this.stopServer(name);
        }
        
        delete configs.servers[name];
        await this.saveConfigs(configs, scope);
        this.emit('serverRemoved', { name });
    }
    
    /**
     * Gets server configuration
     * @param {string} name - Server name
     * @returns {Promise<MCPServerConfig>} Server configuration
     */
    async getServer(name) {
        const configs = await this.getMergedConfigs();
        const server = configs.servers[name];
        
        if (!server) {
            throw new Error(`Server '${name}' not found`);
        }
        
        return server;
    }
    
    /**
     * Lists all configured servers
     * @returns {Promise<Array>} Array of server configurations
     */
    async listServers() {
        const configs = await this.getMergedConfigs();
        return Object.values(configs.servers || {});
    }
    
    /**
     * Starts an MCP server
     * @param {string} name - Server name
     * @param {Object} options - Start options
     */
    async startServer(name, options = {}) {
        if (this.servers.has(name)) {
            throw new Error(`Server '${name}' is already running`);
        }
        
        const config = await this.getServer(name);
        
        if (!config.enabled) {
            throw new Error(`Server '${name}' is disabled`);
        }
        
        try {
            const server = await this.createServerInstance(config, options);
            this.servers.set(name, server);
            
            // Setup event handlers
            server.on('exit', (code) => {
                this.logger.log(`Server '${name}' exited with code ${code}`);
                this.servers.delete(name);
                this.emit('serverExited', { name, code });
            });
            
            server.on('error', (error) => {
                this.logger.error(`Server '${name}' error:`, error);
                this.emit('serverError', { name, error });
            });
            
            this.logger.log(chalk.green(`✓ Started MCP server: ${name}`));
            this.emit('serverStarted', { name, server });
            
            return server;
            
        } catch (error) {
            throw new Error(`Failed to start server '${name}': ${error.message}`);
        }
    }
    
    /**
     * Stops an MCP server
     * @param {string} name - Server name
     */
    async stopServer(name) {
        const server = this.servers.get(name);
        
        if (!server) {
            throw new Error(`Server '${name}' is not running`);
        }
        
        try {
            if (server.kill) {
                server.kill('SIGTERM');
            }
            
            // Wait for graceful shutdown
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    if (server.kill) {
                        server.kill('SIGKILL');
                    }
                    reject(new Error('Server shutdown timed out'));
                }, 10000);
                
                server.on('exit', () => {
                    clearTimeout(timeout);
                    resolve();
                });
            });
            
            this.servers.delete(name);
            this.logger.log(chalk.yellow(`✓ Stopped MCP server: ${name}`));
            this.emit('serverStopped', { name });
            
        } catch (error) {
            throw new Error(`Failed to stop server '${name}': ${error.message}`);
        }
    }
    
    /**
     * Gets status of an MCP server
     * @param {string} name - Server name
     * @returns {Object} Server status information
     */
    getServerStatus(name) {
        const server = this.servers.get(name);
        
        if (!server) {
            return {
                name,
                state: MCP_SERVER_STATES.STOPPED,
                pid: null,
                uptime: null
            };
        }
        
        return {
            name,
            state: MCP_SERVER_STATES.RUNNING,
            pid: server.pid,
            uptime: Date.now() - server.startTime
        };
    }
    
    /**
     * Creates a server instance based on configuration
     * @param {MCPServerConfig} config - Server configuration
     * @param {Object} options - Creation options
     * @returns {Promise<Object>} Server instance
     */
    async createServerInstance(config, options) {
        const { command, args = [], env = {}, workingDirectory, transport } = config;
        
        // Prepare environment variables
        const serverEnv = {
            ...process.env,
            ...env,
            ...options.env
        };
        
        // Prepare spawn options
        const spawnOptions = {
            env: serverEnv,
            cwd: workingDirectory || process.cwd(),
            stdio: transport === MCP_TRANSPORTS.STDIO ? ['pipe', 'pipe', 'pipe'] : 'inherit'
        };
        
        if (options.debug) {
            this.logger.log(`Starting server: ${command} ${args.join(' ')}`);
            this.logger.log(`Working directory: ${spawnOptions.cwd}`);
            this.logger.log(`Transport: ${transport}`);
        }
        
        // Spawn the server process
        const server = spawn(command, args, spawnOptions);
        server.startTime = Date.now();
        
        // Setup stdio handling for stdio transport
        if (transport === MCP_TRANSPORTS.STDIO) {
            this.setupStdioTransport(server, options);
        }
        
        return server;
    }
    
    /**
     * Sets up stdio transport for MCP server
     * @param {Object} server - Server process
     * @param {Object} options - Setup options
     */
    setupStdioTransport(server, options) {
        if (options.debug) {
            server.stdout.on('data', (data) => {
                this.logger.log(`[${server.name}] STDOUT:`, data.toString().trim());
            });
            
            server.stderr.on('data', (data) => {
                this.logger.error(`[${server.name}] STDERR:`, data.toString().trim());
            });
        }
        
        // Setup JSON-RPC communication
        server.sendMessage = (message) => {
            const jsonMessage = JSON.stringify(message) + '\n';
            server.stdin.write(jsonMessage);
        };
        
        // Parse JSON-RPC responses
        let buffer = '';
        server.stdout.on('data', (data) => {
            buffer += data.toString();
            const lines = buffer.split('\n');
            buffer = lines.pop(); // Keep incomplete line in buffer
            
            lines.forEach(line => {
                if (line.trim()) {
                    try {
                        const message = JSON.parse(line);
                        server.emit('message', message);
                    } catch (error) {
                        this.logger.error('Failed to parse JSON-RPC message:', line);
                    }
                }
            });
        });
    }
    
    /**
     * Validates server configuration
     * @param {MCPServerConfig} config - Configuration to validate
     */
    validateServerConfig(config) {
        if (!config.command) {
            throw new Error('Server configuration must include a command');
        }
        
        if (config.transport && !Object.values(MCP_TRANSPORTS).includes(config.transport)) {
            throw new Error(`Invalid transport type: ${config.transport}`);
        }
        
        // Set default transport if not specified
        if (!config.transport) {
            config.transport = MCP_TRANSPORTS.STDIO;
        }
    }
    
    /**
     * Imports servers from Claude Desktop configuration
     * @param {string} scope - Target configuration scope
     * @returns {Promise<Array>} Imported server names
     */
    async importFromClaudeDesktop(scope = MCP_SCOPES.USER) {
        const claudeDesktopPaths = [
            path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json'),
            path.join(os.homedir(), '.config', 'claude', 'claude_desktop_config.json'),
            path.join(os.homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json')
        ];
        
        let claudeConfig = null;
        for (const configPath of claudeDesktopPaths) {
            try {
                const content = await fs.readFile(configPath, 'utf8');
                claudeConfig = JSON.parse(content);
                break;
            } catch (error) {
                // Continue to next path
            }
        }
        
        if (!claudeConfig || !claudeConfig.mcpServers) {
            throw new Error('No Claude Desktop MCP configuration found');
        }
        
        const imported = [];
        const currentConfig = await this.loadConfigs(scope);
        if (!currentConfig.servers) {
            currentConfig.servers = {};
        }
        
        for (const [name, serverConfig] of Object.entries(claudeConfig.mcpServers)) {
            try {
                const mcpConfig = {
                    command: serverConfig.command,
                    args: serverConfig.args || [],
                    env: serverConfig.env || {},
                    transport: MCP_TRANSPORTS.STDIO,
                    enabled: true,
                    importedFrom: 'claude_desktop',
                    importedAt: new Date().toISOString()
                };
                
                currentConfig.servers[name] = mcpConfig;
                imported.push(name);
                
            } catch (error) {
                this.logger.warn(`Failed to import server '${name}': ${error.message}`);
            }
        }
        
        if (imported.length > 0) {
            await this.saveConfigs(currentConfig, scope);
        }
        
        return imported;
    }
    
    /**
     * Stops all running servers
     */
    async stopAllServers() {
        const stopPromises = Array.from(this.servers.keys()).map(name => 
            this.stopServer(name).catch(error => 
                this.logger.error(`Failed to stop server '${name}':`, error)
            )
        );
        
        await Promise.all(stopPromises);
    }
}

/**
 * MCP command handler class
 */
export class MCPCommandHandler {
    constructor() {
        this.serverManager = new MCPServerManager();
        this.logger = console;
    }
    
    /**
     * Sets the logger instance
     * @param {Object} logger - Logger instance
     */
    setLogger(logger) {
        this.logger = logger;
        this.serverManager.setLogger(logger);
    }
    
    /**
     * Handles MCP commands
     * @param {Object} parsedCommand - Parsed command from parser
     * @param {Object} context - Execution context from dispatcher
     * @returns {Promise<Object>} Command execution result
     */
    async handle(parsedCommand, context) {
        try {
            const { action, name, command, json, options } = parsedCommand;
            
            switch (action) {
                case 'serve':
                    return await this.handleServe(options);
                case 'add':
                    return await this.handleAdd(name, command, options);
                case 'remove':
                    return await this.handleRemove(name, options);
                case 'list':
                    return await this.handleList(options);
                case 'get':
                    return await this.handleGet(name, options);
                case 'add-json':
                    return await this.handleAddJson(name, json, options);
                case 'add-from-claude-desktop':
                    return await this.handleAddFromClaudeDesktop(options);
                case 'reset-project-choices':
                    return await this.handleResetProjectChoices(options);
                default:
                    throw new Error(`Unknown MCP action: ${action}`);
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
     * Handles MCP serve command
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleServe(options) {
        try {
            const servers = await this.serverManager.listServers();
            const enabledServers = servers.filter(server => server.enabled);
            
            if (enabledServers.length === 0) {
                this.logger.log(chalk.yellow('No enabled MCP servers found'));
                this.logger.log(chalk.gray('Use "claude mcp add" to add a server'));
                
                return {
                    success: true,
                    exitCode: 0,
                    message: 'No servers to start',
                    data: { serverCount: 0 }
                };
            }
            
            this.logger.log(chalk.cyan(`Starting ${enabledServers.length} MCP servers...`));
            
            const results = [];
            for (const server of enabledServers) {
                try {
                    await this.serverManager.startServer(server.name, options);
                    results.push({ name: server.name, success: true });
                } catch (error) {
                    this.logger.error(`Failed to start ${server.name}:`, error.message);
                    results.push({ name: server.name, success: false, error: error.message });
                }
            }
            
            const successful = results.filter(r => r.success).length;
            const failed = results.length - successful;
            
            if (successful > 0) {
                this.logger.log(chalk.green(`✓ Started ${successful} MCP servers`));
            }
            
            if (failed > 0) {
                this.logger.log(chalk.red(`✗ Failed to start ${failed} MCP servers`));
            }
            
            // Keep servers running
            if (successful > 0) {
                this.logger.log(chalk.gray('Press Ctrl+C to stop all servers'));
                
                // Setup graceful shutdown
                process.on('SIGINT', async () => {
                    this.logger.log(chalk.yellow('\nShutting down MCP servers...'));
                    await this.serverManager.stopAllServers();
                    process.exit(0);
                });
                
                // Keep process alive
                await new Promise(() => {});
            }
            
            return {
                success: successful > 0,
                exitCode: failed > 0 ? 1 : 0,
                message: `Started ${successful}/${results.length} MCP servers`,
                data: { results, successful, failed }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles MCP add command
     * @param {string} name - Server name
     * @param {string} command - Server command
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleAdd(name, command, options) {
        try {
            const scope = options.scope || MCP_SCOPES.USER;
            
            const config = {
                command: command.split(' ')[0],
                args: command.split(' ').slice(1),
                transport: options.transport || MCP_TRANSPORTS.STDIO,
                env: this.parseEnvOptions(options.env),
                workingDirectory: process.cwd()
            };
            
            await this.serverManager.addServer(name, config, scope);
            
            this.logger.log(chalk.green(`✓ Added MCP server '${name}' to ${scope} scope`));
            this.logger.log(chalk.gray(`Command: ${command}`));
            this.logger.log(chalk.gray(`Transport: ${config.transport}`));
            
            return {
                success: true,
                exitCode: 0,
                message: `MCP server '${name}' added successfully`,
                data: { name, config, scope }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles MCP remove command
     * @param {string} name - Server name
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleRemove(name, options) {
        try {
            const scope = options.scope || MCP_SCOPES.USER;
            
            await this.serverManager.removeServer(name, scope);
            
            this.logger.log(chalk.green(`✓ Removed MCP server '${name}' from ${scope} scope`));
            
            return {
                success: true,
                exitCode: 0,
                message: `MCP server '${name}' removed successfully`,
                data: { name, scope }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles MCP list command
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleList(options) {
        try {
            const servers = await this.serverManager.listServers();
            
            if (servers.length === 0) {
                this.logger.log(chalk.gray('No MCP servers configured'));
                this.logger.log(chalk.gray('Use "claude mcp add" to add a server'));
                
                return {
                    success: true,
                    exitCode: 0,
                    message: 'No MCP servers found',
                    data: { servers: [] }
                };
            }
            
            console.log(chalk.cyan('\n=== MCP Servers ===\n'));
            
            for (const server of servers) {
                const status = this.serverManager.getServerStatus(server.name);
                const statusColor = status.state === MCP_SERVER_STATES.RUNNING ? chalk.green : chalk.gray;
                const enabledText = server.enabled ? chalk.green('enabled') : chalk.red('disabled');
                
                console.log(`${chalk.bold(server.name)} (${enabledText}, ${statusColor(status.state)})`);
                console.log(`  Command: ${chalk.white(server.command)} ${server.args?.join(' ') || ''}`);
                console.log(`  Transport: ${chalk.white(server.transport)}`);
                
                if (server.workingDirectory) {
                    console.log(`  Working Directory: ${chalk.gray(server.workingDirectory)}`);
                }
                
                if (server.env && Object.keys(server.env).length > 0) {
                    console.log(`  Environment: ${chalk.gray(Object.keys(server.env).join(', '))}`);
                }
                
                if (status.state === MCP_SERVER_STATES.RUNNING) {
                    console.log(`  PID: ${chalk.white(status.pid)}`);
                    console.log(`  Uptime: ${chalk.white(this.formatUptime(status.uptime))}`);
                }
                
                if (options.verbose && server.metadata) {
                    console.log(`  Metadata: ${chalk.gray(JSON.stringify(server.metadata, null, 2))}`);
                }
                
                console.log();
            }
            
            return {
                success: true,
                exitCode: 0,
                message: `Listed ${servers.length} MCP servers`,
                data: { servers, count: servers.length }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles MCP get command
     * @param {string} name - Server name
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleGet(name, options) {
        try {
            const server = await this.serverManager.getServer(name);
            const status = this.serverManager.getServerStatus(name);
            
            console.log(chalk.cyan(`\n=== MCP Server: ${name} ===\n`));
            
            console.log(`Status: ${status.state === MCP_SERVER_STATES.RUNNING ? chalk.green(status.state) : chalk.gray(status.state)}`);
            console.log(`Enabled: ${server.enabled ? chalk.green('Yes') : chalk.red('No')}`);
            console.log(`Command: ${chalk.white(server.command)}`);
            
            if (server.args && server.args.length > 0) {
                console.log(`Arguments: ${chalk.white(server.args.join(' '))}`);
            }
            
            console.log(`Transport: ${chalk.white(server.transport)}`);
            
            if (server.workingDirectory) {
                console.log(`Working Directory: ${chalk.white(server.workingDirectory)}`);
            }
            
            if (server.env && Object.keys(server.env).length > 0) {
                console.log(`Environment Variables:`);
                Object.entries(server.env).forEach(([key, value]) => {
                    console.log(`  ${key}: ${chalk.white(value)}`);
                });
            }
            
            if (status.state === MCP_SERVER_STATES.RUNNING) {
                console.log(`Process ID: ${chalk.white(status.pid)}`);
                console.log(`Uptime: ${chalk.white(this.formatUptime(status.uptime))}`);
            }
            
            if (server.createdAt) {
                console.log(`Created: ${chalk.gray(new Date(server.createdAt).toLocaleString())}`);
            }
            
            if (server.importedFrom) {
                console.log(`Imported From: ${chalk.gray(server.importedFrom)}`);
            }
            
            console.log();
            
            return {
                success: true,
                exitCode: 0,
                message: `Retrieved details for MCP server '${name}'`,
                data: { server, status }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles MCP add-json command
     * @param {string} name - Server name
     * @param {string} json - JSON configuration
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleAddJson(name, json, options) {
        try {
            const config = JSON.parse(json);
            const scope = options.scope || MCP_SCOPES.USER;
            
            // Validate and normalize configuration
            if (!config.command) {
                throw new Error('JSON configuration must include a command');
            }
            
            const normalizedConfig = {
                command: config.command,
                args: config.args || [],
                env: config.env || {},
                transport: config.transport || MCP_TRANSPORTS.STDIO,
                workingDirectory: config.workingDirectory || process.cwd(),
                metadata: config.metadata || {}
            };
            
            await this.serverManager.addServer(name, normalizedConfig, scope);
            
            this.logger.log(chalk.green(`✓ Added MCP server '${name}' from JSON configuration`));
            
            return {
                success: true,
                exitCode: 0,
                message: `MCP server '${name}' added from JSON successfully`,
                data: { name, config: normalizedConfig, scope }
            };
            
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new Error(`Invalid JSON configuration: ${error.message}`);
            }
            throw error;
        }
    }
    
    /**
     * Handles MCP add-from-claude-desktop command
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleAddFromClaudeDesktop(options) {
        try {
            const scope = options.scope || MCP_SCOPES.USER;
            const imported = await this.serverManager.importFromClaudeDesktop(scope);
            
            if (imported.length === 0) {
                this.logger.log(chalk.yellow('No MCP servers found in Claude Desktop configuration'));
                
                return {
                    success: true,
                    exitCode: 0,
                    message: 'No servers to import',
                    data: { imported: [] }
                };
            }
            
            this.logger.log(chalk.green(`✓ Imported ${imported.length} MCP servers from Claude Desktop:`));
            imported.forEach(name => {
                this.logger.log(`  - ${name}`);
            });
            
            return {
                success: true,
                exitCode: 0,
                message: `Imported ${imported.length} MCP servers from Claude Desktop`,
                data: { imported, scope }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Handles MCP reset-project-choices command
     * @param {Object} options - Command options
     * @returns {Promise<Object>} Command result
     */
    async handleResetProjectChoices(options) {
        try {
            // This would reset project-specific MCP choices
            // For now, just clear the local configuration
            const configPath = this.serverManager.getConfigPath(MCP_SCOPES.LOCAL);
            
            try {
                await fs.unlink(configPath);
                this.logger.log(chalk.green('✓ Reset project MCP choices'));
            } catch (error) {
                if (error.code === 'ENOENT') {
                    this.logger.log(chalk.yellow('No project MCP choices to reset'));
                } else {
                    throw error;
                }
            }
            
            return {
                success: true,
                exitCode: 0,
                message: 'Project MCP choices reset successfully',
                data: {}
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Parses environment variable options
     * @param {Array<string>} envOptions - Environment variable strings
     * @returns {Object} Environment variables object
     */
    parseEnvOptions(envOptions = []) {
        const env = {};
        
        envOptions.forEach(envStr => {
            const [key, ...valueParts] = envStr.split('=');
            if (key && valueParts.length > 0) {
                env[key] = valueParts.join('=');
            }
        });
        
        return env;
    }
    
    /**
     * Formats uptime in human-readable format
     * @param {number} ms - Uptime in milliseconds
     * @returns {string} Formatted uptime
     */
    formatUptime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }
}

/**
 * Default MCP handler instance
 */
export const defaultMCPHandler = new MCPCommandHandler();

/**
 * MCP command handler function for the dispatcher
 * @param {Object} parsedCommand - Parsed command from parser
 * @param {Object} context - Execution context from dispatcher
 * @returns {Promise<Object>} Command execution result
 */
export async function handleMCPCommand(parsedCommand, context) {
    return await defaultMCPHandler.handle(parsedCommand, context);
}

export default {
    MCPServerManager,
    MCPCommandHandler,
    handleMCPCommand,
    MCP_TRANSPORTS,
    MCP_SERVER_STATES,
    MCP_SCOPES,
    defaultMCPHandler
};