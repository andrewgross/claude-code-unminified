/**
 * Server Manager - MCP Server Lifecycle Management
 * 
 * This module manages the lifecycle of MCP (Model Context Protocol) servers,
 * including starting, stopping, monitoring, and maintaining server connections.
 * It supports multiple transport protocols (stdio, sse, http) and handles
 * server discovery, configuration, and health monitoring.
 * 
 * @module ServerManager
 */

import { EventEmitter } from 'events';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * MCP Server states
 */
export const ServerState = {
    PENDING: 'pending',
    STARTING: 'starting', 
    CONNECTED: 'connected',
    READY: 'ready',
    ERROR: 'error',
    STOPPED: 'stopped',
    DISCONNECTED: 'disconnected'
};

/**
 * Server Manager class - handles MCP server lifecycle
 */
export class ServerManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            logger: console,
            healthCheckInterval: 30000,
            maxRetries: 3,
            retryDelay: 5000,
            processTimeout: 30000,
            ...options
        };
        
        // Server registry
        this.servers = new Map();
        
        // Transport factory
        this.transportFactory = options.transportFactory;
        
        // Health monitoring
        this.healthCheckTimer = null;
        this.isShuttingDown = false;
        
        // Process cleanup on exit
        process.on('exit', () => this.cleanup());
        process.on('SIGINT', () => this.shutdown());
        process.on('SIGTERM', () => this.shutdown());
    }
    
    /**
     * Initializes the server manager
     * @param {Object} config - Server configurations
     * @returns {Promise<void>}
     */
    async initialize(config = {}) {
        try {
            this.options.logger.log('Initializing Server Manager...');
            
            // Load server configurations
            if (config.servers) {
                await this.loadServerConfigurations(config.servers);
            }
            
            // Start health monitoring
            this.startHealthMonitoring();
            
            this.options.logger.log('Server Manager initialized successfully');
            this.emit('initialized');
            
        } catch (error) {
            this.options.logger.error('Failed to initialize Server Manager:', error);
            throw error;
        }
    }
    
    /**
     * Loads server configurations
     * @param {Object} configurations - Server configuration objects
     * @returns {Promise<void>}
     */
    async loadServerConfigurations(configurations) {
        for (const [name, config] of Object.entries(configurations)) {
            try {
                await this.addServer(name, config);
            } catch (error) {
                this.options.logger.error(`Failed to load server '${name}':`, error);
            }
        }
    }
    
    /**
     * Adds a server to the registry
     * @param {string} name - Server name
     * @param {Object} config - Server configuration
     * @returns {Promise<Object>} Server instance
     */
    async addServer(name, config) {
        if (this.servers.has(name)) {
            throw new Error(`Server '${name}' already exists`);
        }
        
        const server = {
            name,
            config: this.validateServerConfig(config),
            state: ServerState.PENDING,
            transport: null,
            process: null,
            startTime: null,
            lastError: null,
            retryCount: 0,
            healthMetrics: {
                uptime: 0,
                responseTime: 0,
                successRate: 100,
                errorCount: 0,
                lastHealthCheck: null
            }
        };
        
        this.servers.set(name, server);
        
        this.options.logger.log(`Added server '${name}' to registry`);
        this.emit('serverAdded', { name, config: server.config });
        
        return server;
    }
    
    /**
     * Removes a server from the registry
     * @param {string} name - Server name
     * @returns {Promise<void>}
     */
    async removeServer(name) {
        const server = this.servers.get(name);
        
        if (!server) {
            throw new Error(`Server '${name}' not found`);
        }
        
        // Stop the server if running
        if (server.state !== ServerState.STOPPED) {
            await this.stopServer(name);
        }
        
        this.servers.delete(name);
        
        this.options.logger.log(`Removed server '${name}' from registry`);
        this.emit('serverRemoved', { name });
    }
    
    /**
     * Starts a specific server
     * @param {string} name - Server name
     * @param {Object} options - Start options
     * @returns {Promise<Object>} Start result
     */
    async startServer(name, options = {}) {
        const server = this.servers.get(name);
        
        if (!server) {
            throw new Error(`Server '${name}' not found`);
        }
        
        if (server.state === ServerState.READY || server.state === ServerState.STARTING) {
            return { name, state: server.state, alreadyRunning: true };
        }
        
        try {
            this.updateServerState(server, ServerState.STARTING);
            
            // Create transport based on configuration
            server.transport = this.transportFactory.createTransport(
                server.config.transport,
                server.config
            );
            
            // Set up transport event handlers
            this.setupTransportHandlers(server);
            
            // Connect the transport
            await server.transport.connect();
            
            server.startTime = new Date();
            server.retryCount = 0;
            
            this.updateServerState(server, ServerState.CONNECTED);
            
            // Initialize MCP protocol
            await this.initializeMCPProtocol(server);
            
            this.updateServerState(server, ServerState.READY);
            
            this.options.logger.log(`Server '${name}' started successfully`);
            this.emit('serverStarted', { 
                name, 
                state: server.state,
                startTime: server.startTime
            });
            
            return { name, state: server.state, success: true };
            
        } catch (error) {
            server.lastError = error;
            this.updateServerState(server, ServerState.ERROR);
            
            this.options.logger.error(`Failed to start server '${name}':`, error);
            this.emit('serverError', { name, error });
            
            throw error;
        }
    }
    
    /**
     * Stops a specific server
     * @param {string} name - Server name
     * @returns {Promise<void>}
     */
    async stopServer(name) {
        const server = this.servers.get(name);
        
        if (!server) {
            throw new Error(`Server '${name}' not found`);
        }
        
        if (server.state === ServerState.STOPPED) {
            return;
        }
        
        try {
            // Disconnect transport
            if (server.transport) {
                await server.transport.disconnect();
                server.transport = null;
            }
            
            // Kill process if it's a spawned process
            if (server.process && !server.process.killed) {
                server.process.kill('SIGTERM');
                
                // Force kill after timeout
                setTimeout(() => {
                    if (!server.process.killed) {
                        server.process.kill('SIGKILL');
                    }
                }, 5000);
                
                server.process = null;
            }
            
            this.updateServerState(server, ServerState.STOPPED);
            
            this.options.logger.log(`Server '${name}' stopped`);
            this.emit('serverStopped', { name });
            
        } catch (error) {
            this.options.logger.error(`Error stopping server '${name}':`, error);
            throw error;
        }
    }
    
    /**
     * Starts all configured servers
     * @param {Object} options - Start options
     * @returns {Promise<Object>} Start results
     */
    async startAllServers(options = {}) {
        const results = {
            successful: [],
            failed: []
        };
        
        const serverNames = Array.from(this.servers.keys());
        
        for (const name of serverNames) {
            try {
                const result = await this.startServer(name, options);
                results.successful.push(result);
            } catch (error) {
                results.failed.push({ name, error: error.message });
            }
        }
        
        this.options.logger.log(
            `Started ${results.successful.length}/${serverNames.length} servers`
        );
        
        return results;
    }
    
    /**
     * Stops all running servers
     * @returns {Promise<void>}
     */
    async stopAllServers() {
        const serverNames = Array.from(this.servers.keys());
        
        for (const name of serverNames) {
            try {
                await this.stopServer(name);
            } catch (error) {
                this.options.logger.error(`Error stopping server '${name}':`, error);
            }
        }
        
        this.options.logger.log('All servers stopped');
    }
    
    /**
     * Gets a server instance
     * @param {string} name - Server name
     * @returns {Object|null} Server instance
     */
    getServer(name) {
        return this.servers.get(name);
    }
    
    /**
     * Lists all servers
     * @returns {Array} Server list
     */
    listServers() {
        return Array.from(this.servers.values());
    }
    
    /**
     * Gets server statuses
     * @returns {Object} Server statuses
     */
    getServerStatuses() {
        const statuses = {};
        
        for (const [name, server] of this.servers) {
            statuses[name] = {
                state: server.state,
                startTime: server.startTime,
                lastError: server.lastError?.message,
                retryCount: server.retryCount,
                healthMetrics: server.healthMetrics
            };
        }
        
        return statuses;
    }
    
    /**
     * Validates server configuration
     * @param {Object} config - Server configuration
     * @returns {Object} Validated configuration
     * @private
     */
    validateServerConfig(config) {
        if (!config.command && !config.url) {
            throw new Error('Server configuration must have either command or url');
        }
        
        if (!config.transport) {
            throw new Error('Server configuration must specify transport type');
        }
        
        const validTransports = ['stdio', 'sse', 'http'];
        if (!validTransports.includes(config.transport)) {
            throw new Error(
                `Invalid transport '${config.transport}'. Valid options: ${validTransports.join(', ')}`
            );
        }
        
        return {
            command: config.command,
            args: config.args || [],
            transport: config.transport,
            url: config.url,
            env: config.env || {},
            headers: config.headers || {},
            scope: config.scope || 'local',
            enabled: config.enabled !== false,
            autoRestart: config.autoRestart !== false,
            timeout: config.timeout || this.options.processTimeout,
            ...config
        };
    }
    
    /**
     * Sets up transport event handlers
     * @param {Object} server - Server instance
     * @private
     */
    setupTransportHandlers(server) {
        if (!server.transport) return;
        
        server.transport.on('message', (message) => {
            this.emit('serverMessage', { 
                name: server.name, 
                message 
            });
        });
        
        server.transport.on('error', (error) => {
            server.lastError = error;
            this.updateServerState(server, ServerState.ERROR);
            
            this.options.logger.error(`Server '${server.name}' transport error:`, error);
            this.emit('serverError', { 
                name: server.name, 
                error 
            });
            
            // Attempt restart if configured
            if (server.config.autoRestart && !this.isShuttingDown) {
                this.scheduleRestart(server);
            }
        });
        
        server.transport.on('disconnect', () => {
            if (server.state !== ServerState.STOPPED) {
                this.updateServerState(server, ServerState.DISCONNECTED);
                
                this.options.logger.warn(`Server '${server.name}' disconnected`);
                this.emit('serverDisconnected', { 
                    name: server.name 
                });
                
                // Attempt reconnection if configured
                if (server.config.autoRestart && !this.isShuttingDown) {
                    this.scheduleRestart(server);
                }
            }
        });
    }
    
    /**
     * Initializes MCP protocol with server
     * @param {Object} server - Server instance
     * @returns {Promise<void>}
     * @private
     */
    async initializeMCPProtocol(server) {
        try {
            // Send initialize request
            const initRequest = {
                jsonrpc: '2.0',
                method: 'initialize',
                params: {
                    protocolVersion: '2024-11-05',
                    capabilities: {
                        roots: {
                            listChanged: true
                        },
                        sampling: {}
                    },
                    clientInfo: {
                        name: 'claude-code',
                        version: '1.0.0'
                    }
                },
                id: 1
            };
            
            const response = await server.transport.sendRequest(initRequest);
            
            if (response.error) {
                throw new Error(`MCP initialize error: ${response.error.message}`);
            }
            
            // Send initialized notification
            const notification = {
                jsonrpc: '2.0',
                method: 'notifications/initialized'
            };
            
            await server.transport.sendNotification(notification);
            
            this.options.logger.log(`MCP protocol initialized for server '${server.name}'`);
            
        } catch (error) {
            throw new Error(`Failed to initialize MCP protocol: ${error.message}`);
        }
    }
    
    /**
     * Updates server state
     * @param {Object} server - Server instance
     * @param {string} newState - New state
     * @private
     */
    updateServerState(server, newState) {
        const oldState = server.state;
        server.state = newState;
        
        this.emit('serverStateChanged', {
            name: server.name,
            oldState,
            newState,
            timestamp: new Date()
        });
    }
    
    /**
     * Schedules a server restart
     * @param {Object} server - Server instance
     * @private
     */
    scheduleRestart(server) {
        if (server.retryCount >= this.options.maxRetries) {
            this.options.logger.error(
                `Max retries exceeded for server '${server.name}', giving up`
            );
            return;
        }
        
        server.retryCount++;
        const delay = this.options.retryDelay * Math.pow(2, server.retryCount - 1);
        
        this.options.logger.log(
            `Scheduling restart for server '${server.name}' in ${delay}ms (attempt ${server.retryCount})`
        );
        
        setTimeout(async () => {
            if (!this.isShuttingDown && server.state !== ServerState.READY) {
                try {
                    await this.startServer(server.name);
                } catch (error) {
                    this.options.logger.error(
                        `Restart attempt ${server.retryCount} failed for server '${server.name}':`,
                        error
                    );
                }
            }
        }, delay);
    }
    
    /**
     * Starts health monitoring
     * @private
     */
    startHealthMonitoring() {
        if (this.healthCheckTimer) {
            clearInterval(this.healthCheckTimer);
        }
        
        this.healthCheckTimer = setInterval(
            () => this.performHealthChecks(),
            this.options.healthCheckInterval
        );
        
        this.options.logger.log('Health monitoring started');
    }
    
    /**
     * Performs health checks on all running servers
     * @private
     */
    async performHealthChecks() {
        if (this.isShuttingDown) return;
        
        for (const server of this.servers.values()) {
            if (server.state === ServerState.READY) {
                await this.checkServerHealth(server);
            }
        }
    }
    
    /**
     * Checks health of a specific server
     * @param {Object} server - Server instance
     * @returns {Promise<void>}
     * @private
     */
    async checkServerHealth(server) {
        try {
            const startTime = Date.now();
            
            // Send ping request
            const pingRequest = {
                jsonrpc: '2.0',
                method: 'ping',
                id: Date.now()
            };
            
            await server.transport.sendRequest(pingRequest, { timeout: 5000 });
            
            const responseTime = Date.now() - startTime;
            
            // Update health metrics
            server.healthMetrics.responseTime = responseTime;
            server.healthMetrics.lastHealthCheck = new Date();
            server.healthMetrics.uptime = server.startTime ? 
                Date.now() - server.startTime.getTime() : 0;
                
        } catch (error) {
            server.healthMetrics.errorCount++;
            server.healthMetrics.lastHealthCheck = new Date();
            
            // Calculate success rate
            const totalChecks = server.healthMetrics.errorCount + 
                (server.healthMetrics.successCount || 0);
            server.healthMetrics.successRate = totalChecks > 0 ? 
                ((totalChecks - server.healthMetrics.errorCount) / totalChecks) * 100 : 100;
            
            this.options.logger.warn(
                `Health check failed for server '${server.name}':`,
                error.message
            );
        }
    }
    
    /**
     * Cleanup function called on process exit
     * @private
     */
    cleanup() {
        if (this.healthCheckTimer) {
            clearInterval(this.healthCheckTimer);
        }
        
        // Kill all spawned processes
        for (const server of this.servers.values()) {
            if (server.process && !server.process.killed) {
                server.process.kill('SIGKILL');
            }
        }
    }
    
    /**
     * Shutdown function for graceful shutdown
     * @returns {Promise<void>}
     */
    async shutdown() {
        this.isShuttingDown = true;
        
        this.options.logger.log('Shutting down Server Manager...');
        
        // Stop health monitoring
        if (this.healthCheckTimer) {
            clearInterval(this.healthCheckTimer);
        }
        
        // Stop all servers
        await this.stopAllServers();
        
        // Remove all event listeners
        this.removeAllListeners();
        
        this.options.logger.log('Server Manager shutdown complete');
    }
}

export default ServerManager;