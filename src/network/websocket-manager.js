/**
 * WebSocket Manager Module
 * 
 * Provides a comprehensive WebSocket management system with automatic reconnection,
 * message queuing, heartbeat monitoring, and connection pooling capabilities.
 */

const EventEmitter = require('events');

/**
 * WebSocket Connection States
 */
const ConnectionState = {
    DISCONNECTED: 'disconnected',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    RECONNECTING: 'reconnecting',
    CLOSING: 'closing',
    ERROR: 'error'
};

/**
 * WebSocket Manager Class
 * Manages WebSocket connections with automatic reconnection and message handling
 */
class WebSocketManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            reconnect: options.reconnect !== false,
            reconnectInterval: options.reconnectInterval || 5000,
            maxReconnectAttempts: options.maxReconnectAttempts || 10,
            reconnectBackoff: options.reconnectBackoff || 1.5,
            maxReconnectInterval: options.maxReconnectInterval || 30000,
            heartbeatInterval: options.heartbeatInterval || 30000,
            heartbeatTimeout: options.heartbeatTimeout || 10000,
            heartbeatMessage: options.heartbeatMessage || JSON.stringify({ type: 'ping' }),
            queueMessages: options.queueMessages !== false,
            maxQueueSize: options.maxQueueSize || 100,
            protocols: options.protocols || [],
            headers: options.headers || {},
            ...options
        };

        this.connections = new Map();
        this.messageQueues = new Map();
        this.reconnectTimers = new Map();
        this.heartbeatTimers = new Map();
        this.heartbeatTimeouts = new Map();
        this.stats = {
            totalConnections: 0,
            activeConnections: 0,
            reconnectAttempts: 0,
            messagesSent: 0,
            messagesReceived: 0,
            errors: 0
        };

        this.emit('initialized');
    }

    /**
     * Creates a new WebSocket connection
     * @param {string} id - Connection identifier
     * @param {string} url - WebSocket URL
     * @param {Object} options - Connection options
     * @returns {Promise} Promise resolving when connection is established
     */
    async connect(id, url, options = {}) {
        const connectionOptions = { ...this.options, ...options };
        
        if (this.connections.has(id)) {
            throw new Error(`Connection '${id}' already exists`);
        }

        const connectionInfo = {
            id,
            url,
            state: ConnectionState.CONNECTING,
            ws: null,
            reconnectAttempts: 0,
            options: connectionOptions,
            lastConnected: null,
            lastError: null
        };

        this.connections.set(id, connectionInfo);
        this.messageQueues.set(id, []);
        
        this.emit('connectionStateChange', { id, state: ConnectionState.CONNECTING });

        try {
            await this._createWebSocket(connectionInfo);
            this.stats.totalConnections++;
            this.stats.activeConnections++;
            return connectionInfo;
        } catch (error) {
            this.connections.delete(id);
            this.messageQueues.delete(id);
            throw error;
        }
    }

    /**
     * Creates and configures a WebSocket instance
     * @param {Object} connectionInfo - Connection information
     * @returns {Promise} Promise resolving when WebSocket is ready
     */
    async _createWebSocket(connectionInfo) {
        return new Promise((resolve, reject) => {
            try {
                const { id, url, options } = connectionInfo;
                
                // Create WebSocket with protocols if specified
                const ws = options.protocols && options.protocols.length > 0
                    ? new WebSocket(url, options.protocols)
                    : new WebSocket(url);

                // Configure WebSocket event handlers
                ws.onopen = (event) => {
                    this._handleOpen(connectionInfo, event);
                    resolve();
                };

                ws.onmessage = (event) => {
                    this._handleMessage(connectionInfo, event);
                };

                ws.onclose = (event) => {
                    this._handleClose(connectionInfo, event);
                };

                ws.onerror = (event) => {
                    this._handleError(connectionInfo, event);
                    if (connectionInfo.state === ConnectionState.CONNECTING) {
                        reject(new WebSocketError('Failed to connect', event));
                    }
                };

                connectionInfo.ws = ws;
                
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Handles WebSocket open event
     * @param {Object} connectionInfo - Connection information
     * @param {Event} event - Open event
     */
    _handleOpen(connectionInfo, event) {
        const { id } = connectionInfo;
        
        connectionInfo.state = ConnectionState.CONNECTED;
        connectionInfo.lastConnected = Date.now();
        connectionInfo.reconnectAttempts = 0;
        
        // Clear any existing reconnect timer
        this._clearReconnectTimer(id);
        
        // Start heartbeat if enabled
        if (connectionInfo.options.heartbeatInterval > 0) {
            this._startHeartbeat(connectionInfo);
        }
        
        // Process queued messages
        this._processMessageQueue(id);
        
        this.emit('connectionStateChange', { id, state: ConnectionState.CONNECTED });
        this.emit('connected', { id, event });
    }

    /**
     * Handles WebSocket message event
     * @param {Object} connectionInfo - Connection information
     * @param {MessageEvent} event - Message event
     */
    _handleMessage(connectionInfo, event) {
        const { id } = connectionInfo;
        
        this.stats.messagesReceived++;
        
        try {
            let data;
            
            // Try to parse JSON data
            if (typeof event.data === 'string') {
                try {
                    data = JSON.parse(event.data);
                } catch (parseError) {
                    data = event.data;
                }
            } else {
                data = event.data;
            }
            
            // Handle heartbeat responses
            if (this._isHeartbeatResponse(data)) {
                this._handleHeartbeatResponse(connectionInfo);
                return;
            }
            
            this.emit('message', { id, data, raw: event.data });
            
        } catch (error) {
            this.emit('error', { id, error, type: 'message-parse' });
        }
    }

    /**
     * Handles WebSocket close event
     * @param {Object} connectionInfo - Connection information
     * @param {CloseEvent} event - Close event
     */
    _handleClose(connectionInfo, event) {
        const { id } = connectionInfo;
        
        connectionInfo.state = ConnectionState.DISCONNECTED;
        this.stats.activeConnections = Math.max(0, this.stats.activeConnections - 1);
        
        // Clear timers
        this._clearHeartbeat(id);
        
        this.emit('connectionStateChange', { id, state: ConnectionState.DISCONNECTED });
        this.emit('disconnected', { id, event, code: event.code, reason: event.reason });
        
        // Attempt reconnection if enabled and not a clean close
        if (connectionInfo.options.reconnect && event.code !== 1000) {
            this._scheduleReconnect(connectionInfo);
        }
    }

    /**
     * Handles WebSocket error event
     * @param {Object} connectionInfo - Connection information
     * @param {Event} event - Error event
     */
    _handleError(connectionInfo, event) {
        const { id } = connectionInfo;
        
        connectionInfo.state = ConnectionState.ERROR;
        connectionInfo.lastError = {
            timestamp: Date.now(),
            event
        };
        
        this.stats.errors++;
        
        this.emit('connectionStateChange', { id, state: ConnectionState.ERROR });
        this.emit('error', { id, event, type: 'websocket' });
    }

    /**
     * Schedules a reconnection attempt
     * @param {Object} connectionInfo - Connection information
     */
    _scheduleReconnect(connectionInfo) {
        const { id, options } = connectionInfo;
        
        if (connectionInfo.reconnectAttempts >= options.maxReconnectAttempts) {
            this.emit('maxReconnectAttemptsReached', { id });
            return;
        }
        
        connectionInfo.state = ConnectionState.RECONNECTING;
        connectionInfo.reconnectAttempts++;
        this.stats.reconnectAttempts++;
        
        // Calculate delay with backoff
        const baseDelay = options.reconnectInterval;
        const backoffMultiplier = Math.pow(options.reconnectBackoff, connectionInfo.reconnectAttempts - 1);
        const delay = Math.min(baseDelay * backoffMultiplier, options.maxReconnectInterval);
        
        this.emit('connectionStateChange', { id, state: ConnectionState.RECONNECTING });
        this.emit('reconnecting', { id, attempt: connectionInfo.reconnectAttempts, delay });
        
        const timer = setTimeout(async () => {
            this.reconnectTimers.delete(id);
            
            try {
                connectionInfo.ws = null;
                await this._createWebSocket(connectionInfo);
            } catch (error) {
                this.emit('reconnectFailed', { id, error, attempt: connectionInfo.reconnectAttempts });
                
                if (connectionInfo.reconnectAttempts < options.maxReconnectAttempts) {
                    this._scheduleReconnect(connectionInfo);
                } else {
                    this.emit('maxReconnectAttemptsReached', { id });
                }
            }
        }, delay);
        
        this.reconnectTimers.set(id, timer);
    }

    /**
     * Starts heartbeat monitoring for a connection
     * @param {Object} connectionInfo - Connection information
     */
    _startHeartbeat(connectionInfo) {
        const { id, options } = connectionInfo;
        
        const interval = setInterval(() => {
            if (connectionInfo.state === ConnectionState.CONNECTED) {
                this._sendHeartbeat(connectionInfo);
            }
        }, options.heartbeatInterval);
        
        this.heartbeatTimers.set(id, interval);
    }

    /**
     * Sends a heartbeat message
     * @param {Object} connectionInfo - Connection information
     */
    _sendHeartbeat(connectionInfo) {
        const { id, options } = connectionInfo;
        
        try {
            if (connectionInfo.ws && connectionInfo.ws.readyState === WebSocket.OPEN) {
                connectionInfo.ws.send(options.heartbeatMessage);
                
                // Set timeout for heartbeat response
                const timeout = setTimeout(() => {
                    this.emit('heartbeatTimeout', { id });
                    connectionInfo.ws?.close(1000, 'Heartbeat timeout');
                }, options.heartbeatTimeout);
                
                this.heartbeatTimeouts.set(id, timeout);
            }
        } catch (error) {
            this.emit('error', { id, error, type: 'heartbeat' });
        }
    }

    /**
     * Handles heartbeat response
     * @param {Object} connectionInfo - Connection information
     */
    _handleHeartbeatResponse(connectionInfo) {
        const { id } = connectionInfo;
        
        // Clear heartbeat timeout
        const timeout = this.heartbeatTimeouts.get(id);
        if (timeout) {
            clearTimeout(timeout);
            this.heartbeatTimeouts.delete(id);
        }
        
        this.emit('heartbeatResponse', { id });
    }

    /**
     * Checks if a message is a heartbeat response
     * @param {*} data - Message data
     * @returns {boolean} True if it's a heartbeat response
     */
    _isHeartbeatResponse(data) {
        // Default implementation - can be overridden
        return (
            typeof data === 'object' &&
            data !== null &&
            (data.type === 'pong' || data.type === 'ping')
        );
    }

    /**
     * Processes queued messages for a connection
     * @param {string} id - Connection ID
     */
    _processMessageQueue(id) {
        const queue = this.messageQueues.get(id);
        if (!queue || queue.length === 0) return;
        
        const connectionInfo = this.connections.get(id);
        if (!connectionInfo || connectionInfo.state !== ConnectionState.CONNECTED) return;
        
        while (queue.length > 0) {
            const message = queue.shift();
            try {
                this._sendMessage(id, message);
            } catch (error) {
                // Re-queue failed message at the beginning
                queue.unshift(message);
                break;
            }
        }
    }

    /**
     * Sends a message to a WebSocket connection
     * @param {string} id - Connection ID
     * @param {*} message - Message to send
     * @returns {boolean} True if message was sent successfully
     */
    send(id, message) {
        const connectionInfo = this.connections.get(id);
        if (!connectionInfo) {
            throw new Error(`Connection '${id}' not found`);
        }

        if (connectionInfo.state === ConnectionState.CONNECTED) {
            try {
                return this._sendMessage(id, message);
            } catch (error) {
                this.emit('error', { id, error, type: 'send' });
                return false;
            }
        } else if (connectionInfo.options.queueMessages) {
            return this._queueMessage(id, message);
        } else {
            throw new Error(`Connection '${id}' is not connected and message queueing is disabled`);
        }
    }

    /**
     * Sends a message immediately
     * @param {string} id - Connection ID
     * @param {*} message - Message to send
     * @returns {boolean} True if sent successfully
     */
    _sendMessage(id, message) {
        const connectionInfo = this.connections.get(id);
        const { ws } = connectionInfo;
        
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket is not open');
        }
        
        const serializedMessage = typeof message === 'string' 
            ? message 
            : JSON.stringify(message);
        
        ws.send(serializedMessage);
        this.stats.messagesSent++;
        
        this.emit('messageSent', { id, message });
        return true;
    }

    /**
     * Queues a message for later sending
     * @param {string} id - Connection ID
     * @param {*} message - Message to queue
     * @returns {boolean} True if queued successfully
     */
    _queueMessage(id, message) {
        const queue = this.messageQueues.get(id);
        if (!queue) return false;
        
        const connectionInfo = this.connections.get(id);
        const maxSize = connectionInfo.options.maxQueueSize;
        
        if (queue.length >= maxSize) {
            // Remove oldest message to make room
            const removed = queue.shift();
            this.emit('messageDropped', { id, message: removed, reason: 'queue-full' });
        }
        
        queue.push(message);
        this.emit('messageQueued', { id, message, queueSize: queue.length });
        return true;
    }

    /**
     * Disconnects a WebSocket connection
     * @param {string} id - Connection ID
     * @param {number} code - Close code
     * @param {string} reason - Close reason
     */
    disconnect(id, code = 1000, reason = 'Normal closure') {
        const connectionInfo = this.connections.get(id);
        if (!connectionInfo) return;

        connectionInfo.state = ConnectionState.CLOSING;
        
        // Clear timers
        this._clearReconnectTimer(id);
        this._clearHeartbeat(id);
        
        if (connectionInfo.ws && connectionInfo.ws.readyState === WebSocket.OPEN) {
            connectionInfo.ws.close(code, reason);
        }
        
        // Clean up immediately if WebSocket is not open
        setTimeout(() => {
            this._cleanup(id);
        }, 1000);
    }

    /**
     * Disconnects all connections
     */
    disconnectAll() {
        const connectionIds = Array.from(this.connections.keys());
        connectionIds.forEach(id => this.disconnect(id));
    }

    /**
     * Clears reconnect timer for a connection
     * @param {string} id - Connection ID
     */
    _clearReconnectTimer(id) {
        const timer = this.reconnectTimers.get(id);
        if (timer) {
            clearTimeout(timer);
            this.reconnectTimers.delete(id);
        }
    }

    /**
     * Clears heartbeat timers for a connection
     * @param {string} id - Connection ID
     */
    _clearHeartbeat(id) {
        const interval = this.heartbeatTimers.get(id);
        if (interval) {
            clearInterval(interval);
            this.heartbeatTimers.delete(id);
        }
        
        const timeout = this.heartbeatTimeouts.get(id);
        if (timeout) {
            clearTimeout(timeout);
            this.heartbeatTimeouts.delete(id);
        }
    }

    /**
     * Cleans up connection resources
     * @param {string} id - Connection ID
     */
    _cleanup(id) {
        this.connections.delete(id);
        this.messageQueues.delete(id);
        this._clearReconnectTimer(id);
        this._clearHeartbeat(id);
    }

    /**
     * Gets connection status
     * @param {string} id - Connection ID
     * @returns {Object|null} Connection status or null if not found
     */
    getConnectionStatus(id) {
        const connectionInfo = this.connections.get(id);
        if (!connectionInfo) return null;

        const queue = this.messageQueues.get(id);
        
        return {
            id,
            state: connectionInfo.state,
            url: connectionInfo.url,
            reconnectAttempts: connectionInfo.reconnectAttempts,
            lastConnected: connectionInfo.lastConnected,
            lastError: connectionInfo.lastError,
            queueSize: queue ? queue.length : 0,
            readyState: connectionInfo.ws ? connectionInfo.ws.readyState : null
        };
    }

    /**
     * Gets all connection statuses
     * @returns {Array} Array of connection statuses
     */
    getAllConnectionStatuses() {
        return Array.from(this.connections.keys()).map(id => this.getConnectionStatus(id));
    }

    /**
     * Gets manager statistics
     * @returns {Object} Manager statistics
     */
    getStats() {
        return {
            ...this.stats,
            connectionsCount: this.connections.size,
            totalQueuedMessages: Array.from(this.messageQueues.values())
                .reduce((sum, queue) => sum + queue.length, 0)
        };
    }

    /**
     * Resets statistics
     */
    resetStats() {
        this.stats = {
            totalConnections: 0,
            activeConnections: this.connections.size,
            reconnectAttempts: 0,
            messagesSent: 0,
            messagesReceived: 0,
            errors: 0
        };
    }
}

/**
 * Custom WebSocket Error class
 */
class WebSocketError extends Error {
    constructor(message, event) {
        super(message);
        this.name = 'WebSocketError';
        this.event = event;
        this.isWebSocketError = true;
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, WebSocketError);
        }
    }
}

/**
 * WebSocket utilities
 */
const WebSocketUtils = {
    /**
     * Validates WebSocket URL
     * @param {string} url - URL to validate
     * @returns {boolean} True if valid WebSocket URL
     */
    isValidWebSocketUrl(url) {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.protocol === 'ws:' || parsedUrl.protocol === 'wss:';
        } catch (error) {
            return false;
        }
    },

    /**
     * Gets WebSocket ready state string
     * @param {number} readyState - Numeric ready state
     * @returns {string} String representation
     */
    getReadyStateString(readyState) {
        switch (readyState) {
            case WebSocket.CONNECTING:
                return 'CONNECTING';
            case WebSocket.OPEN:
                return 'OPEN';
            case WebSocket.CLOSING:
                return 'CLOSING';
            case WebSocket.CLOSED:
                return 'CLOSED';
            default:
                return 'UNKNOWN';
        }
    },

    /**
     * Creates a WebSocket URL from components
     * @param {Object} options - URL components
     * @returns {string} Complete WebSocket URL
     */
    buildWebSocketUrl(options) {
        const { 
            protocol = 'ws', 
            host, 
            port, 
            path = '', 
            query = {} 
        } = options;
        
        let url = `${protocol}://${host}`;
        
        if (port && 
            !((protocol === 'ws' && port === 80) || 
              (protocol === 'wss' && port === 443))) {
            url += `:${port}`;
        }
        
        if (path) {
            url += path.startsWith('/') ? path : `/${path}`;
        }
        
        const queryParams = new URLSearchParams(query);
        const queryString = queryParams.toString();
        
        if (queryString) {
            url += `?${queryString}`;
        }
        
        return url;
    }
};

module.exports = {
    WebSocketManager,
    WebSocketError,
    WebSocketUtils,
    ConnectionState
};