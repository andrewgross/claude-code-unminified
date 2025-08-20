/**
 * Enhanced MCP Server Management
 * 
 * Advanced server management features including batch operations, 
 * reconnection handling, resource management, and connection monitoring.
 * 
 * Key chunks analyzed:
 * - chunk_0584.js:385-417 (JL0 function - server reconnection logic)
 * - chunk_0584.js:418-476 (HW8, AF1 functions - batch connection management)
 * - chunk_0584.js:477-516 (XL0 function - resource prefetching)
 * - chunk_0584.js:254-261 (eG1 function - connection cleanup)
 * - chunk_0524.js:321-427 (server addition/removal with validation)
 */

import { EventEmitter } from 'events';
import { getAllMcpServers, findServerByName, MCP_SCOPES, APPROVAL_STATES } from './scopes.js';
import { isRemoteTransport, transportSupportsAuth, validateTransportConfig } from './transports/factory.js';

/**
 * Enhanced MCP Server Management
 * 
 * Provides advanced server management capabilities beyond the basic manager:
 * - Batch server operations
 * - Connection monitoring and health checking
 * - Automatic reconnection with backoff
 * - Resource prefetching and caching
 * - Performance metrics and logging
 */
export class EnhancedMcpManager extends EventEmitter {
    constructor(baseManager = null, options = {}) {
        super();
        
        this._baseManager = baseManager;
        this._connectionMetrics = new Map();
        this._reconnectionTimers = new Map();
        this._healthCheckInterval = options.healthCheckInterval || 30000;
        this._maxReconnectAttempts = options.maxReconnectAttempts || 3;
        this._batchSize = options.batchSize || 5;
        this._resourceCache = new Map();
        
        // Connection state tracking
        this._connectionStates = new Map();
        this._lastConnectionAttempt = new Map();
        
        this._isMonitoring = false;
        this._monitoringInterval = null;
        
        // Bind event handlers
        this._setupEventHandlers();
    }
    
    /**
     * Set up event handlers for connection monitoring
     */
    _setupEventHandlers() {
        // Only set up handlers if we have a base manager
        if (!this._baseManager) {
            return;
        }
        
        // Listen to base manager events
        this._baseManager._connectionPool.on('serverConnect', (name) => {
            this._updateConnectionState(name, 'connected');
            this._recordConnectionMetric(name, 'connect', true);
            this.emit('serverConnected', name);
        });
        
        this._baseManager._connectionPool.on('serverDisconnect', (name) => {
            this._updateConnectionState(name, 'disconnected');
            this._recordConnectionMetric(name, 'disconnect', false);
            this.emit('serverDisconnected', name);
            
            // Schedule reconnection if not intentionally stopped
            this._scheduleReconnection(name);
        });
        
        this._baseManager._connectionPool.on('serverError', (name, error) => {
            this._updateConnectionState(name, 'error');
            this._recordConnectionMetric(name, 'error', false, error.message);
            this.emit('serverError', name, error);
        });
    }
    
    /**
     * Start enhanced server monitoring
     * 
     * Extracted patterns from chunk_0584.js:424-476 (AF1 function):
     * - Batched connection attempts with concurrency control
     * - Comprehensive metrics collection
     * - Error handling and recovery
     * - Resource state tracking
     */
    async startEnhancedMonitoring() {
        if (this._isMonitoring) {
            return;
        }
        
        this._isMonitoring = true;
        console.log('🔍 Starting enhanced MCP server monitoring');
        
        // Start periodic health checks
        this._monitoringInterval = setInterval(() => {
            this._performHealthChecks();
        }, this._healthCheckInterval);
        
        // Initial connection status check
        await this._performHealthChecks();
        
        this.emit('monitoringStarted');
    }
    
    /**
     * Stop enhanced server monitoring
     */
    async stopEnhancedMonitoring() {
        if (!this._isMonitoring) {
            return;
        }
        
        this._isMonitoring = false;
        
        if (this._monitoringInterval) {
            clearInterval(this._monitoringInterval);
            this._monitoringInterval = null;
        }
        
        // Clear all reconnection timers
        for (const timer of this._reconnectionTimers.values()) {
            clearTimeout(timer);
        }
        this._reconnectionTimers.clear();
        
        console.log('🛑 Stopped enhanced MCP server monitoring');
        this.emit('monitoringStopped');
    }
    
    /**
     * Connect servers with enhanced batch processing
     * 
     * Extracted from chunk_0584.js:418-476 with patterns:
     * - HW8 function: Batch processing with controlled concurrency
     * - AF1 function: Server type categorization and metrics
     * - Connection attempt timing and status reporting
     */
    async connectServersEnhanced(serverNames = null, options = {}) {
        const {
            batchSize = this._batchSize,
            includeRemote = true,
            scopeFilter = null,
            timeout = 30000
        } = options;
        
        console.log('🚀 Starting enhanced server connection process');
        
        // Get servers to connect
        const allServers = this.getMergedServers();
        const serversToConnect = Object.entries(allServers)
            .filter(([name, config]) => {
                // Filter by server names if specified
                if (serverNames && !serverNames.includes(name)) {
                    return false;
                }
                
                // Filter by scope if specified
                if (scopeFilter && config.scope !== scopeFilter) {
                    return false;
                }
                
                // Filter remote servers if not included
                if (!includeRemote && isRemoteTransport(config.transport)) {
                    return false;
                }
                
                // Only connect approved project servers
                if (config.scope === MCP_SCOPES.PROJECT) {
                    return this._baseManager.getProjectApprovalStatus(name) === APPROVAL_STATES.APPROVED;
                }
                
                return true;
            })
            .map(([name, config]) => ({ name, config }));
        
        if (serversToConnect.length === 0) {
            console.log('No servers to connect');
            return { connected: 0, failed: 0, total: 0 };
        }
        
        // Categorize servers by transport type (like AF1 function)
        const transportStats = {
            total: serversToConnect.length,
            stdio: serversToConnect.filter(s => !s.config.transport || s.config.transport === 'stdio').length,
            sse: serversToConnect.filter(s => s.config.transport === 'sse').length,
            http: serversToConnect.filter(s => s.config.transport === 'http').length,
            'sse-ide': serversToConnect.filter(s => s.config.transport === 'sse-ide').length,
            'ws-ide': serversToConnect.filter(s => s.config.transport === 'ws-ide').length
        };
        
        console.log(`📊 Transport distribution:`, transportStats);
        
        const results = {
            connected: 0,
            failed: 0,
            total: serversToConnect.length,
            details: []
        };
        
        // Process servers in batches (HW8 pattern)
        await this._processBatch(serversToConnect, batchSize, async (serverInfo) => {
            const { name, config } = serverInfo;
            const startTime = Date.now();
            
            try {
                console.log(`🔄 Connecting to ${name} (${config.transport || 'stdio'})...`);
                this._recordConnectionAttempt(name);
                
                // Use base manager's enhanced connection method
                await this._baseManager.startServersWithScopes([name]);
                
                const duration = Date.now() - startTime;
                console.log(`✅ Connected to ${name} in ${duration}ms`);
                
                results.connected++;
                results.details.push({
                    name,
                    status: 'connected',
                    duration,
                    transport: config.transport || 'stdio'
                });
                
                this._recordConnectionMetric(name, 'connect', true, null, duration);
                
            } catch (error) {
                const duration = Date.now() - startTime;
                console.warn(`❌ Failed to connect to ${name}: ${error.message}`);
                
                results.failed++;
                results.details.push({
                    name,
                    status: 'failed',
                    error: error.message,
                    duration,
                    transport: config.transport || 'stdio'
                });
                
                this._recordConnectionMetric(name, 'connect', false, error.message, duration);
            }
        });
        
        console.log(`🎯 Enhanced connection complete: ${results.connected}/${results.total} successful`);
        this.emit('batchConnectionComplete', results);
        
        return results;
    }
    
    /**
     * Reconnect specific server with enhanced error handling
     * 
     * Extracted from chunk_0584.js:385-417 (JL0 function):
     * - Clean disconnection before reconnection
     * - Resource state preservation during reconnection
     * - Comprehensive error handling and fallback
     */
    async reconnectServerEnhanced(serverName, options = {}) {
        const {
            cleanDisconnect = true,
            preserveCache = true,
            maxAttempts = this._maxReconnectAttempts
        } = options;
        
        console.log(`🔄 Enhanced reconnection attempt for ${serverName}`);
        
        const serverInfo = this._baseManager.findServer(serverName);
        if (!serverInfo) {
            throw new Error(`Server '${serverName}' not found in any scope`);
        }
        
        const config = serverInfo.config;
        let attempt = 0;
        
        while (attempt < maxAttempts) {
            attempt++;
            
            try {
                // Clean disconnection if requested (eG1 pattern)
                if (cleanDisconnect) {
                    console.log(`🧹 Cleaning existing connection for ${serverName}`);
                    await this._cleanServerConnection(serverName, config);
                }
                
                // Clear previous connection state
                this._connectionStates.delete(serverName);
                
                // Attempt reconnection using base manager
                console.log(`🔗 Reconnection attempt ${attempt}/${maxAttempts} for ${serverName}`);
                await this._baseManager.startServersWithScopes([serverName]);
                
                // Verify connection succeeded
                const connectionStatus = this._baseManager.getConnectionStatus()
                    .find(status => status.serverName === serverName);
                
                if (connectionStatus?.connected) {
                    console.log(`✅ Successfully reconnected ${serverName}`);
                    this._recordConnectionMetric(serverName, 'reconnect', true);
                    
                    // Prefetch resources if server supports them
                    if (connectionStatus.client?.capabilities?.resources) {
                        await this._prefetchServerResources(serverName);
                    }
                    
                    this.emit('serverReconnected', serverName);
                    return { success: true, attempts: attempt };
                } else {
                    throw new Error('Connection verification failed');
                }
                
            } catch (error) {
                console.warn(`❌ Reconnection attempt ${attempt} failed for ${serverName}: ${error.message}`);
                
                if (attempt >= maxAttempts) {
                    this._recordConnectionMetric(serverName, 'reconnect', false, error.message);
                    this.emit('serverReconnectFailed', serverName, error);
                    throw new Error(`Failed to reconnect ${serverName} after ${maxAttempts} attempts: ${error.message}`);
                }
                
                // Wait before next attempt with exponential backoff
                const backoffTime = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
                console.log(`⏳ Waiting ${backoffTime}ms before next reconnection attempt`);
                await new Promise(resolve => setTimeout(resolve, backoffTime));
            }
        }
    }
    
    /**
     * Prefetch and cache server resources
     * 
     * Extracted from chunk_0584.js:477-516 (XL0 function):
     * - Comprehensive resource collection (tools, commands, resources)
     * - Unicode sanitization and filtering
     * - Metadata aggregation and metrics
     * - Promise-based batch processing
     */
    async prefetchAllResources(serverNames = null) {
        const connectedServers = this._baseManager.getConnectionStatus()
            .filter(status => {
                if (!status.connected) return false;
                if (serverNames && !serverNames.includes(status.serverName)) return false;
                return true;
            });
        
        if (connectedServers.length === 0) {
            console.log('No connected servers to prefetch resources from');
            return { tools: [], commands: [], resources: [], servers: 0 };
        }
        
        console.log(`🔍 Prefetching resources from ${connectedServers.length} connected servers`);
        
        const results = {
            tools: [],
            commands: [],
            resources: [],
            servers: connectedServers.length,
            errors: []
        };
        
        // Process each server for resource collection
        const resourcePromises = connectedServers.map(async (serverStatus) => {
            const { serverName, client } = serverStatus;
            
            try {
                console.log(`📦 Fetching resources from ${serverName}`);
                
                const serverResults = {
                    tools: [],
                    commands: [],
                    resources: [],
                    server: serverName
                };
                
                // Fetch tools if supported
                if (client.capabilities?.tools) {
                    try {
                        const toolsResponse = await client.request({ method: 'tools/list' });
                        if (toolsResponse.tools) {
                            serverResults.tools = toolsResponse.tools.map(tool => ({
                                ...tool,
                                serverName,
                                mcpName: `mcp__${serverName}__${tool.name}`,
                                isMcp: true,
                                annotations: tool.annotations || {}
                            }));
                        }
                    } catch (error) {
                        console.warn(`Failed to fetch tools from ${serverName}:`, error.message);
                        results.errors.push({ server: serverName, type: 'tools', error: error.message });
                    }
                }
                
                // Fetch prompts/commands if supported
                if (client.capabilities?.prompts) {
                    try {
                        const promptsResponse = await client.request({ method: 'prompts/list' });
                        if (promptsResponse.prompts) {
                            serverResults.commands = promptsResponse.prompts.map(prompt => ({
                                ...prompt,
                                serverName,
                                mcpName: `mcp__${serverName}__${prompt.name}`,
                                isMcp: true,
                                type: 'prompt'
                            }));
                        }
                    } catch (error) {
                        console.warn(`Failed to fetch commands from ${serverName}:`, error.message);
                        results.errors.push({ server: serverName, type: 'commands', error: error.message });
                    }
                }
                
                // Fetch resources if supported
                if (client.capabilities?.resources) {
                    try {
                        const resourcesResponse = await client.request({ method: 'resources/list' });
                        if (resourcesResponse.resources) {
                            serverResults.resources = resourcesResponse.resources.map(resource => ({
                                ...resource,
                                serverName,
                                server: serverName
                            }));
                        }
                    } catch (error) {
                        console.warn(`Failed to fetch resources from ${serverName}:`, error.message);
                        results.errors.push({ server: serverName, type: 'resources', error: error.message });
                    }
                }
                
                // Cache server resources
                this._resourceCache.set(serverName, {
                    ...serverResults,
                    timestamp: Date.now(),
                    ttl: 300000 // 5 minutes
                });
                
                console.log(`✅ Cached ${serverResults.tools.length} tools, ${serverResults.commands.length} commands, ${serverResults.resources.length} resources from ${serverName}`);
                
                return serverResults;
                
            } catch (error) {
                console.error(`Failed to prefetch resources from ${serverName}:`, error);
                results.errors.push({ server: serverName, type: 'general', error: error.message });
                return { tools: [], commands: [], resources: [], server: serverName };
            }
        });
        
        // Wait for all resource fetching to complete
        const serverResults = await Promise.allSettled(resourcePromises);
        
        // Aggregate results
        for (const result of serverResults) {
            if (result.status === 'fulfilled') {
                const { tools, commands, resources } = result.value;
                results.tools.push(...tools);
                results.commands.push(...commands);
                results.resources.push(...resources);
            }
        }
        
        // Calculate metadata metrics (like XL0 pattern)
        const commandsMetadataLength = results.commands.reduce((total, command) => {
            return total + 
                (command.name?.length || 0) + 
                (command.description?.length || 0) + 
                (command.argumentHint?.length || 0);
        }, 0);
        
        console.log(`🎯 Resource prefetch complete:`);
        console.log(`   - Tools: ${results.tools.length}`);
        console.log(`   - Commands: ${results.commands.length}`);
        console.log(`   - Resources: ${results.resources.length}`);
        console.log(`   - Metadata size: ${commandsMetadataLength} chars`);
        
        this.emit('resourcesPrefetched', {
            tools_count: results.tools.length,
            commands_count: results.commands.length,
            resources_count: results.resources.length,
            commands_metadata_length: commandsMetadataLength,
            servers_processed: connectedServers.length,
            errors_count: results.errors.length
        });
        
        return results;
    }
    
    /**
     * Get comprehensive server status with metrics
     */
    getEnhancedServerStatus() {
        const baseStatus = this._baseManager.getConnectionStatus();
        const enhanced = baseStatus.map(status => {
            const metrics = this._connectionMetrics.get(status.serverName) || {};
            const state = this._connectionStates.get(status.serverName) || 'unknown';
            const cachedResources = this._resourceCache.get(status.serverName);
            
            return {
                ...status,
                enhancedState: state,
                metrics: {
                    connectionAttempts: metrics.connectionAttempts || 0,
                    successfulConnections: metrics.successfulConnections || 0,
                    failures: metrics.failures || 0,
                    lastError: metrics.lastError,
                    averageConnectionTime: metrics.averageConnectionTime || 0,
                    totalUptime: this._calculateUptime(status.serverName)
                },
                cache: cachedResources ? {
                    tools: cachedResources.tools.length,
                    commands: cachedResources.commands.length,
                    resources: cachedResources.resources.length,
                    lastUpdated: new Date(cachedResources.timestamp).toISOString(),
                    isExpired: Date.now() - cachedResources.timestamp > cachedResources.ttl
                } : null
            };
        });
        
        return enhanced;
    }
    
    // Private helper methods
    
    /**
     * Update connection state tracking
     */
    _updateConnectionState(serverName, state) {
        this._connectionStates.set(serverName, state);
        this._lastConnectionAttempt.set(serverName, Date.now());
    }
    
    /**
     * Record connection metrics
     */
    _recordConnectionMetric(serverName, type, success, error = null, duration = null) {
        const metrics = this._connectionMetrics.get(serverName) || {
            connectionAttempts: 0,
            successfulConnections: 0,
            failures: 0,
            totalConnectionTime: 0,
            errors: []
        };
        
        if (type === 'connect' || type === 'reconnect') {
            metrics.connectionAttempts++;
            if (success) {
                metrics.successfulConnections++;
                if (duration) {
                    metrics.totalConnectionTime += duration;
                    metrics.averageConnectionTime = metrics.totalConnectionTime / metrics.successfulConnections;
                }
            } else {
                metrics.failures++;
                if (error) {
                    metrics.lastError = error;
                    metrics.errors.push({ timestamp: Date.now(), error });
                    // Keep only last 10 errors
                    if (metrics.errors.length > 10) {
                        metrics.errors = metrics.errors.slice(-10);
                    }
                }
            }
        }
        
        this._connectionMetrics.set(serverName, metrics);
    }
    
    /**
     * Record connection attempt
     */
    _recordConnectionAttempt(serverName) {
        this._lastConnectionAttempt.set(serverName, Date.now());
    }
    
    /**
     * Calculate server uptime
     */
    _calculateUptime(serverName) {
        const connectionStatus = this._baseManager.getConnectionStatus()
            .find(status => status.serverName === serverName);
        
        if (!connectionStatus?.connected) {
            return 0;
        }
        
        const lastAttempt = this._lastConnectionAttempt.get(serverName);
        return lastAttempt ? Date.now() - lastAttempt : 0;
    }
    
    /**
     * Process items in batches with controlled concurrency
     * Based on HW8 pattern from chunk_0584.js:418-423
     */
    async _processBatch(items, batchSize, processor) {
        for (let i = 0; i < items.length; i += batchSize) {
            const batch = items.slice(i, i + batchSize);
            await Promise.all(batch.map(processor));
        }
    }
    
    /**
     * Clean server connection (based on eG1 pattern)
     */
    async _cleanServerConnection(serverName, config) {
        try {
            await this._baseManager.stopServers([serverName]);
            console.log(`🧹 Cleaned connection for ${serverName}`);
        } catch (error) {
            console.warn(`Warning: Failed to clean connection for ${serverName}:`, error.message);
        }
    }
    
    /**
     * Schedule automatic reconnection for disconnected server
     */
    _scheduleReconnection(serverName) {
        // Clear existing timer
        if (this._reconnectionTimers.has(serverName)) {
            clearTimeout(this._reconnectionTimers.get(serverName));
        }
        
        // Schedule reconnection with backoff
        const metrics = this._connectionMetrics.get(serverName) || {};
        const failureCount = metrics.failures || 0;
        const backoffTime = Math.min(5000 * Math.pow(2, failureCount), 60000);
        
        const timer = setTimeout(async () => {
            try {
                console.log(`🔄 Automatic reconnection attempt for ${serverName}`);
                await this.reconnectServerEnhanced(serverName, { maxAttempts: 1 });
            } catch (error) {
                console.warn(`Automatic reconnection failed for ${serverName}:`, error.message);
            } finally {
                this._reconnectionTimers.delete(serverName);
            }
        }, backoffTime);
        
        this._reconnectionTimers.set(serverName, timer);
        console.log(`⏳ Scheduled reconnection for ${serverName} in ${backoffTime}ms`);
    }
    
    /**
     * Perform health checks on connected servers
     */
    async _performHealthChecks() {
        if (!this._isMonitoring) {
            return;
        }
        
        const connectedServers = this._baseManager.getConnectionStatus()
            .filter(status => status.connected);
        
        for (const serverStatus of connectedServers) {
            try {
                // Simple ping check - try to list tools
                if (serverStatus.client?.capabilities?.tools) {
                    await serverStatus.client.request({ method: 'tools/list' }, 5000);
                }
                
                this._updateConnectionState(serverStatus.serverName, 'healthy');
                
            } catch (error) {
                console.warn(`Health check failed for ${serverStatus.serverName}:`, error.message);
                this._updateConnectionState(serverStatus.serverName, 'unhealthy');
                this.emit('serverUnhealthy', serverStatus.serverName, error);
            }
        }
    }
    
    /**
     * Prefetch resources for specific server
     */
    async _prefetchServerResources(serverName) {
        try {
            const result = await this.prefetchAllResources([serverName]);
            console.log(`📦 Prefetched resources for ${serverName}: ${result.tools.length} tools, ${result.commands.length} commands`);
        } catch (error) {
            console.warn(`Failed to prefetch resources for ${serverName}:`, error.message);
        }
    }
    
    /**
     * Get merged servers (delegate to base manager)
     */
    getMergedServers() {
        return this._baseManager.getMergedServers();
    }
}

// Export class for manager.js to instantiate
// (singleton instance will be created in manager.js to avoid circular dependency)
export let enhancedMcpManager = null;