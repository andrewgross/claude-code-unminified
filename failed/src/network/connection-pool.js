/**
 * Connection Pool Manager Module
 * 
 * Manages a pool of network connections for efficient reuse, load balancing,
 * and automatic scaling based on demand. Supports different connection types
 * and provides health monitoring and failover capabilities.
 */

const EventEmitter = require('events');
const { TransportFactory } = require('./transport-factory');

/**
 * Connection States
 */
const ConnectionState = {
    IDLE: 'idle',
    ACTIVE: 'active',
    CONNECTING: 'connecting',
    ERROR: 'error',
    CLOSING: 'closing',
    CLOSED: 'closed'
};

/**
 * Pool Strategies
 */
const PoolStrategy = {
    ROUND_ROBIN: 'round_robin',
    LEAST_CONNECTIONS: 'least_connections',
    LEAST_RESPONSE_TIME: 'least_response_time',
    RANDOM: 'random',
    WEIGHTED: 'weighted'
};

/**
 * Connection Pool Manager
 * Manages a pool of connections with load balancing and health monitoring
 */
class ConnectionPoolManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            minConnections: options.minConnections || 1,
            maxConnections: options.maxConnections || 10,
            strategy: options.strategy || PoolStrategy.ROUND_ROBIN,
            healthCheckInterval: options.healthCheckInterval || 30000,
            maxIdleTime: options.maxIdleTime || 300000, // 5 minutes
            retryAttempts: options.retryAttempts || 3,
            retryDelay: options.retryDelay || 1000,
            connectionTimeout: options.connectionTimeout || 30000,
            acquireTimeout: options.acquireTimeout || 10000,
            weights: options.weights || {},
            ...options
        };

        this.pools = new Map(); // poolId -> pool configuration
        this.connections = new Map(); // connectionId -> connection info
        this.activeRequests = new Map(); // requestId -> request info
        
        this.transportFactory = options.transportFactory || new TransportFactory();
        
        this.stats = {
            totalConnections: 0,
            activeConnections: 0,
            idleConnections: 0,
            failedConnections: 0,
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            avgResponseTime: 0,
            connectionCreations: 0,
            connectionDestructions: 0
        };

        this.healthCheckTimer = null;
        this.cleanupTimer = null;
        
        this._startHealthCheck();
        this._startCleanup();
        
        this.emit('initialized');
    }

    /**
     * Creates a new connection pool
     * @param {string} poolId - Unique pool identifier
     * @param {Object} poolConfig - Pool configuration
     * @returns {Object} Pool configuration
     */
    createPool(poolId, poolConfig) {
        if (this.pools.has(poolId)) {
            throw new Error(`Pool '${poolId}' already exists`);
        }

        const config = {
            id: poolId,
            transportOptions: poolConfig.transportOptions || {},
            minConnections: poolConfig.minConnections || this.options.minConnections,
            maxConnections: poolConfig.maxConnections || this.options.maxConnections,
            strategy: poolConfig.strategy || this.options.strategy,
            weight: poolConfig.weight || 1,
            enabled: poolConfig.enabled !== false,
            connections: [],
            roundRobinIndex: 0,
            stats: {
                activeConnections: 0,
                totalRequests: 0,
                successfulRequests: 0,
                failedRequests: 0,
                avgResponseTime: 0,
                lastUsed: Date.now()
            }
        };

        this.pools.set(poolId, config);
        this.emit('poolCreated', { poolId, config });

        // Create initial connections
        this._ensureMinimumConnections(poolId);

        return config;
    }

    /**
     * Removes a connection pool
     * @param {string} poolId - Pool identifier
     * @returns {Promise} Promise resolving when pool is destroyed
     */
    async destroyPool(poolId) {
        const pool = this.pools.get(poolId);
        if (!pool) {
            throw new Error(`Pool '${poolId}' not found`);
        }

        // Close all connections in the pool
        const closePromises = pool.connections.map(async (connectionId) => {
            try {
                await this._closeConnection(connectionId);
            } catch (error) {
                this.emit('error', { type: 'pool-destroy', poolId, connectionId, error });
            }
        });

        await Promise.allSettled(closePromises);
        
        this.pools.delete(poolId);
        this.emit('poolDestroyed', { poolId });
    }

    /**
     * Acquires a connection from a pool
     * @param {string} poolId - Pool identifier
     * @param {Object} options - Request options
     * @returns {Promise} Promise resolving to connection
     */
    async acquireConnection(poolId, options = {}) {
        const pool = this.pools.get(poolId);
        if (!pool) {
            throw new Error(`Pool '${poolId}' not found`);
        }

        if (!pool.enabled) {
            throw new Error(`Pool '${poolId}' is disabled`);
        }

        const startTime = Date.now();
        const timeout = options.timeout || this.options.acquireTimeout;
        
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`Connection acquire timeout after ${timeout}ms`));
            }, timeout);
        });

        const acquirePromise = this._doAcquireConnection(poolId, options);

        try {
            const connection = await Promise.race([acquirePromise, timeoutPromise]);
            const duration = Date.now() - startTime;
            
            this.emit('connectionAcquired', { poolId, connectionId: connection.id, duration });
            return connection;
            
        } catch (error) {
            this.emit('connectionAcquireFailed', { poolId, error, duration: Date.now() - startTime });
            throw error;
        }
    }

    /**
     * Internal method to acquire a connection
     * @param {string} poolId - Pool identifier
     * @param {Object} options - Request options
     * @returns {Promise} Promise resolving to connection
     */
    async _doAcquireConnection(poolId, options) {
        const pool = this.pools.get(poolId);
        
        // Try to find an idle connection
        const availableConnection = this._findAvailableConnection(pool);
        if (availableConnection) {
            return this._activateConnection(availableConnection);
        }

        // Create new connection if under limit
        if (pool.connections.length < pool.maxConnections) {
            return await this._createConnection(poolId, options);
        }

        // Wait for a connection to become available
        return await this._waitForConnection(poolId, options);
    }

    /**
     * Finds an available connection in the pool
     * @param {Object} pool - Pool configuration
     * @returns {Object|null} Available connection or null
     */
    _findAvailableConnection(pool) {
        const idleConnections = pool.connections
            .map(id => this.connections.get(id))
            .filter(conn => conn && conn.state === ConnectionState.IDLE);

        if (idleConnections.length === 0) {
            return null;
        }

        // Apply selection strategy
        switch (pool.strategy) {
            case PoolStrategy.ROUND_ROBIN:
                return this._selectRoundRobin(pool, idleConnections);
            
            case PoolStrategy.LEAST_CONNECTIONS:
                return this._selectLeastConnections(idleConnections);
            
            case PoolStrategy.LEAST_RESPONSE_TIME:
                return this._selectLeastResponseTime(idleConnections);
            
            case PoolStrategy.RANDOM:
                return this._selectRandom(idleConnections);
            
            case PoolStrategy.WEIGHTED:
                return this._selectWeighted(pool, idleConnections);
            
            default:
                return idleConnections[0];
        }
    }

    /**
     * Selects connection using round-robin strategy
     * @param {Object} pool - Pool configuration
     * @param {Array} connections - Available connections
     * @returns {Object} Selected connection
     */
    _selectRoundRobin(pool, connections) {
        const index = pool.roundRobinIndex % connections.length;
        pool.roundRobinIndex = (pool.roundRobinIndex + 1) % connections.length;
        return connections[index];
    }

    /**
     * Selects connection with least active requests
     * @param {Array} connections - Available connections
     * @returns {Object} Selected connection
     */
    _selectLeastConnections(connections) {
        return connections.reduce((prev, current) => 
            current.activeRequests < prev.activeRequests ? current : prev
        );
    }

    /**
     * Selects connection with lowest average response time
     * @param {Array} connections - Available connections
     * @returns {Object} Selected connection
     */
    _selectLeastResponseTime(connections) {
        return connections.reduce((prev, current) => 
            current.avgResponseTime < prev.avgResponseTime ? current : prev
        );
    }

    /**
     * Selects random connection
     * @param {Array} connections - Available connections
     * @returns {Object} Selected connection
     */
    _selectRandom(connections) {
        const index = Math.floor(Math.random() * connections.length);
        return connections[index];
    }

    /**
     * Selects connection using weighted strategy
     * @param {Object} pool - Pool configuration
     * @param {Array} connections - Available connections
     * @returns {Object} Selected connection
     */
    _selectWeighted(pool, connections) {
        const weights = connections.map(conn => 
            this.options.weights[conn.id] || pool.weight || 1
        );
        
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < connections.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return connections[i];
            }
        }
        
        return connections[0];
    }

    /**
     * Activates an idle connection
     * @param {Object} connection - Connection to activate
     * @returns {Object} Activated connection
     */
    _activateConnection(connection) {
        connection.state = ConnectionState.ACTIVE;
        connection.activeRequests++;
        connection.lastUsed = Date.now();
        
        this.stats.activeConnections++;
        this.stats.idleConnections--;
        
        return connection;
    }

    /**
     * Creates a new connection
     * @param {string} poolId - Pool identifier
     * @param {Object} options - Connection options
     * @returns {Promise} Promise resolving to new connection
     */
    async _createConnection(poolId, options = {}) {
        const pool = this.pools.get(poolId);
        const connectionId = this._generateConnectionId(poolId);
        
        const connectionInfo = {
            id: connectionId,
            poolId,
            state: ConnectionState.CONNECTING,
            transport: null,
            created: Date.now(),
            lastUsed: Date.now(),
            activeRequests: 0,
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            responseTime: [],
            avgResponseTime: 0,
            errors: []
        };

        this.connections.set(connectionId, connectionInfo);
        pool.connections.push(connectionId);
        
        this.emit('connectionCreating', { poolId, connectionId });

        try {
            // Create transport using factory
            const transport = this.transportFactory.create({
                ...pool.transportOptions,
                ...options.transportOptions
            });

            // Initialize transport
            await transport.initialize();
            
            connectionInfo.transport = transport;
            connectionInfo.state = ConnectionState.IDLE;
            
            this.stats.totalConnections++;
            this.stats.idleConnections++;
            this.stats.connectionCreations++;

            // Set up transport event handlers
            this._setupTransportHandlers(connectionInfo);

            this.emit('connectionCreated', { poolId, connectionId });
            return this._activateConnection(connectionInfo);

        } catch (error) {
            // Clean up failed connection
            this.connections.delete(connectionId);
            const index = pool.connections.indexOf(connectionId);
            if (index > -1) {
                pool.connections.splice(index, 1);
            }
            
            this.stats.failedConnections++;
            this.emit('connectionCreateFailed', { poolId, connectionId, error });
            throw error;
        }
    }

    /**
     * Sets up event handlers for transport
     * @param {Object} connectionInfo - Connection information
     */
    _setupTransportHandlers(connectionInfo) {
        const { transport } = connectionInfo;

        transport.on('error', (error) => {
            connectionInfo.errors.push({
                timestamp: Date.now(),
                error: error.message || error
            });
            
            // Keep only recent errors
            if (connectionInfo.errors.length > 10) {
                connectionInfo.errors = connectionInfo.errors.slice(-10);
            }
            
            this.emit('connectionError', { 
                connectionId: connectionInfo.id, 
                poolId: connectionInfo.poolId, 
                error 
            });
        });

        transport.on('closed', () => {
            connectionInfo.state = ConnectionState.CLOSED;
            this.emit('connectionClosed', { 
                connectionId: connectionInfo.id, 
                poolId: connectionInfo.poolId 
            });
        });
    }

    /**
     * Waits for a connection to become available
     * @param {string} poolId - Pool identifier
     * @param {Object} options - Wait options
     * @returns {Promise} Promise resolving to connection
     */
    async _waitForConnection(poolId, options) {
        // Simple implementation - in production, use more sophisticated queuing
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const timeout = options.timeout || this.options.acquireTimeout;
            
            const checkInterval = setInterval(() => {
                if (Date.now() - startTime > timeout) {
                    clearInterval(checkInterval);
                    reject(new Error('Connection wait timeout'));
                    return;
                }

                try {
                    const connection = this._findAvailableConnection(this.pools.get(poolId));
                    if (connection) {
                        clearInterval(checkInterval);
                        resolve(this._activateConnection(connection));
                    }
                } catch (error) {
                    clearInterval(checkInterval);
                    reject(error);
                }
            }, 100);
        });
    }

    /**
     * Releases a connection back to the pool
     * @param {string} connectionId - Connection identifier
     * @param {Object} result - Request result for statistics
     */
    releaseConnection(connectionId, result = {}) {
        const connection = this.connections.get(connectionId);
        if (!connection) {
            return;
        }

        connection.activeRequests = Math.max(0, connection.activeRequests - 1);
        connection.totalRequests++;
        connection.lastUsed = Date.now();
        
        // Update statistics
        if (result.success !== false) {
            connection.successfulRequests++;
            this.stats.successfulRequests++;
        } else {
            connection.failedRequests++;
            this.stats.failedRequests++;
        }

        if (result.responseTime) {
            connection.responseTime.push(result.responseTime);
            // Keep only recent response times
            if (connection.responseTime.length > 100) {
                connection.responseTime = connection.responseTime.slice(-100);
            }
            
            // Calculate average response time
            connection.avgResponseTime = connection.responseTime.reduce((sum, time) => sum + time, 0) / connection.responseTime.length;
        }

        // Update connection state
        if (connection.state === ConnectionState.ACTIVE) {
            connection.state = ConnectionState.IDLE;
            this.stats.activeConnections--;
            this.stats.idleConnections++;
        }

        // Update pool statistics
        const pool = this.pools.get(connection.poolId);
        if (pool) {
            pool.stats.totalRequests++;
            pool.stats.lastUsed = Date.now();
            
            if (result.success !== false) {
                pool.stats.successfulRequests++;
            } else {
                pool.stats.failedRequests++;
            }
        }

        this.emit('connectionReleased', { 
            connectionId, 
            poolId: connection.poolId, 
            result 
        });
    }

    /**
     * Closes a connection
     * @param {string} connectionId - Connection identifier
     * @returns {Promise} Promise resolving when connection is closed
     */
    async _closeConnection(connectionId) {
        const connection = this.connections.get(connectionId);
        if (!connection) {
            return;
        }

        connection.state = ConnectionState.CLOSING;
        
        try {
            if (connection.transport) {
                await connection.transport.close();
            }
        } catch (error) {
            this.emit('error', { type: 'connection-close', connectionId, error });
        }

        // Remove from pool
        const pool = this.pools.get(connection.poolId);
        if (pool) {
            const index = pool.connections.indexOf(connectionId);
            if (index > -1) {
                pool.connections.splice(index, 1);
            }
        }

        // Update statistics
        this.stats.totalConnections--;
        if (connection.state === ConnectionState.ACTIVE) {
            this.stats.activeConnections--;
        } else if (connection.state === ConnectionState.IDLE) {
            this.stats.idleConnections--;
        }
        this.stats.connectionDestructions++;

        this.connections.delete(connectionId);
        this.emit('connectionDestroyed', { connectionId, poolId: connection.poolId });
    }

    /**
     * Ensures minimum number of connections in a pool
     * @param {string} poolId - Pool identifier
     */
    async _ensureMinimumConnections(poolId) {
        const pool = this.pools.get(poolId);
        if (!pool || !pool.enabled) {
            return;
        }

        const currentConnections = pool.connections.length;
        const needed = pool.minConnections - currentConnections;

        if (needed > 0) {
            const createPromises = Array.from({ length: needed }, () => 
                this._createConnection(poolId).catch(error => 
                    this.emit('error', { type: 'min-connection-create', poolId, error })
                )
            );

            await Promise.allSettled(createPromises);
        }
    }

    /**
     * Starts health check timer
     */
    _startHealthCheck() {
        if (this.options.healthCheckInterval <= 0) {
            return;
        }

        this.healthCheckTimer = setInterval(() => {
            this._performHealthCheck();
        }, this.options.healthCheckInterval);
    }

    /**
     * Performs health check on all connections
     */
    async _performHealthCheck() {
        this.emit('healthCheckStarted');
        
        const checkPromises = Array.from(this.connections.values()).map(async (connection) => {
            try {
                await this._checkConnectionHealth(connection);
            } catch (error) {
                this.emit('healthCheckFailed', { 
                    connectionId: connection.id, 
                    poolId: connection.poolId, 
                    error 
                });
            }
        });

        await Promise.allSettled(checkPromises);
        this.emit('healthCheckCompleted');
    }

    /**
     * Checks health of a specific connection
     * @param {Object} connection - Connection to check
     */
    async _checkConnectionHealth(connection) {
        if (connection.state === ConnectionState.CLOSED || 
            connection.state === ConnectionState.CLOSING) {
            return;
        }

        // Check if connection has been idle too long
        const idleTime = Date.now() - connection.lastUsed;
        if (idleTime > this.options.maxIdleTime && connection.activeRequests === 0) {
            await this._closeConnection(connection.id);
            return;
        }

        // Check error rate
        const recentErrors = connection.errors.filter(
            error => Date.now() - error.timestamp < 300000 // 5 minutes
        );

        if (recentErrors.length > 10) {
            this.emit('connectionUnhealthy', { 
                connectionId: connection.id, 
                poolId: connection.poolId,
                reason: 'high-error-rate',
                errorCount: recentErrors.length 
            });
        }
    }

    /**
     * Starts cleanup timer
     */
    _startCleanup() {
        this.cleanupTimer = setInterval(() => {
            this._performCleanup();
        }, 60000); // Run every minute
    }

    /**
     * Performs cleanup tasks
     */
    async _performCleanup() {
        // Ensure minimum connections for all pools
        const ensurePromises = Array.from(this.pools.keys()).map(poolId => 
            this._ensureMinimumConnections(poolId)
        );

        await Promise.allSettled(ensurePromises);

        // Update global statistics
        this._updateGlobalStats();
    }

    /**
     * Updates global statistics
     */
    _updateGlobalStats() {
        const allConnections = Array.from(this.connections.values());
        
        this.stats.totalRequests = allConnections.reduce(
            (sum, conn) => sum + conn.totalRequests, 0
        );

        const responseTimes = allConnections.flatMap(conn => conn.responseTime);
        this.stats.avgResponseTime = responseTimes.length > 0
            ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
            : 0;
    }

    /**
     * Generates unique connection ID
     * @param {string} poolId - Pool identifier
     * @returns {string} Unique connection ID
     */
    _generateConnectionId(poolId) {
        return `${poolId}_conn_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }

    /**
     * Gets pool statistics
     * @param {string} poolId - Pool identifier
     * @returns {Object|null} Pool statistics
     */
    getPoolStats(poolId) {
        const pool = this.pools.get(poolId);
        if (!pool) {
            return null;
        }

        const connections = pool.connections.map(id => this.connections.get(id)).filter(Boolean);
        
        return {
            id: poolId,
            enabled: pool.enabled,
            strategy: pool.strategy,
            minConnections: pool.minConnections,
            maxConnections: pool.maxConnections,
            currentConnections: connections.length,
            idleConnections: connections.filter(c => c.state === ConnectionState.IDLE).length,
            activeConnections: connections.filter(c => c.state === ConnectionState.ACTIVE).length,
            stats: pool.stats
        };
    }

    /**
     * Gets manager statistics
     * @returns {Object} Manager statistics
     */
    getStats() {
        return {
            ...this.stats,
            poolsCount: this.pools.size,
            pools: Array.from(this.pools.keys()).map(id => this.getPoolStats(id))
        };
    }

    /**
     * Enables or disables a pool
     * @param {string} poolId - Pool identifier
     * @param {boolean} enabled - Whether to enable the pool
     */
    setPoolEnabled(poolId, enabled) {
        const pool = this.pools.get(poolId);
        if (!pool) {
            throw new Error(`Pool '${poolId}' not found`);
        }

        pool.enabled = enabled;
        this.emit('poolToggled', { poolId, enabled });

        if (enabled) {
            this._ensureMinimumConnections(poolId);
        }
    }

    /**
     * Shuts down the connection pool manager
     * @returns {Promise} Promise resolving when shutdown is complete
     */
    async shutdown() {
        this.emit('shutdownStarted');

        // Clear timers
        if (this.healthCheckTimer) {
            clearInterval(this.healthCheckTimer);
        }
        
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
        }

        // Destroy all pools
        const destroyPromises = Array.from(this.pools.keys()).map(poolId => 
            this.destroyPool(poolId).catch(error => 
                this.emit('error', { type: 'shutdown-destroy-pool', poolId, error })
            )
        );

        await Promise.allSettled(destroyPromises);
        
        this.emit('shutdownCompleted');
    }
}

module.exports = {
    ConnectionPoolManager,
    ConnectionState,
    PoolStrategy
};