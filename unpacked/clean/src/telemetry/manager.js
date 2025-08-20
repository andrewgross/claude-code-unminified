/**
 * Telemetry Management System
 * 
 * Handles collection, processing, and emission of telemetry data for Claude Code CLI.
 * Provides privacy-respecting analytics and error reporting capabilities.
 * 
 * Referenced throughout the codebase but was missing implementation.
 */

import { configManager } from '../config/manager.js';
import { errorHandler } from '../utils/error-handler.js';

/**
 * Telemetry Event Types
 */
const EVENT_TYPES = {
    // Application lifecycle
    APP_START: 'tengu_init',
    APP_EXIT: 'tengu_exit',
    
    // User interactions
    USER_INPUT: 'tengu_user_input',
    COMMAND_EXECUTED: 'tengu_command_executed',
    
    // API interactions
    API_REQUEST: 'tengu_api_request',
    API_RESPONSE: 'tengu_api_response',
    QUERY_ERROR: 'tengu_query_error',
    
    // Model operations
    MODEL_FALLBACK: 'tengu_model_fallback_triggered',
    AUTO_COMPACT: 'tengu_auto_compact_succeeded',
    POST_COMPACT_TURN: 'tengu_post_autocompact_turn',
    
    // System operations
    MCP_CONNECTION: 'tengu_mcp_connection',
    TOOL_EXECUTION: 'tengu_tool_execution',
    ERROR_OCCURRED: 'tengu_error',
    
    // Feature usage
    FEATURE_USED: 'tengu_feature_used',
    OFF_SWITCH_QUERY: 'tengu_off_switch_query',
    FALLBACK_SYSTEM_MSG: 'tengu_fallback_system_msg'
};

/**
 * Telemetry Manager Class
 */
export class TelemetryManager {
    constructor(options = {}) {
        this.enabled = options.enabled !== false; // Default enabled
        this.debug = options.debug || false;
        this.batchSize = options.batchSize || 10;
        this.flushInterval = options.flushInterval || 30000; // 30 seconds
        this.endpoint = options.endpoint || null;
        
        // Event storage
        this.eventQueue = [];
        this.sessionId = this._generateSessionId();
        this.startTime = Date.now();
        
        // Batch processing
        this.flushTimer = null;
        this.isFlushing = false;
        
        // Initialize based on configuration
        this._initialize();
    }
    
    /**
     * Initialize telemetry system
     */
    _initialize() {
        // Check if telemetry is disabled in config
        const settings = configManager.get();
        if (settings?.telemetry?.enabled === false) {
            this.enabled = false;
        }
        
        // Set up periodic flushing
        if (this.enabled) {
            this._startPeriodicFlush();
        }
        
        // Set up exit handlers to flush remaining events (only in non-test environment)
        if (process.env.NODE_ENV !== 'test') {
            process.on('exit', () => this._flushSync());
            process.on('SIGINT', () => {
                this._flushSync();
                process.exit(0);
            });
            process.on('SIGTERM', () => {
                this._flushSync();
                process.exit(0);
            });
        }
    }
    
    /**
     * Track a telemetry event
     * 
     * @param {string} eventName - Event name
     * @param {Object} data - Event data
     * @param {Object} metadata - Additional metadata
     */
    track(eventName, data = {}, metadata = {}) {
        if (!this.enabled) {
            return;
        }
        
        const event = {
            id: this._generateEventId(),
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            eventName: eventName,
            data: this._sanitizeData(data),
            metadata: {
                version: this._getVersion(),
                platform: process.platform,
                nodeVersion: process.version,
                ...metadata
            }
        };
        
        this.eventQueue.push(event);
        
        if (this.debug) {
            console.log('📊 Telemetry Event:', JSON.stringify(event, null, 2));
        }
        
        // Flush if batch size reached
        if (this.eventQueue.length >= this.batchSize) {
            this._flush();
        }
    }
    
    /**
     * Track API request
     * 
     * @param {Object} requestData - Request information
     */
    trackRequest(requestData) {
        this.track(EVENT_TYPES.API_REQUEST, {
            model: requestData.model,
            messagesLength: requestData.messagesLength,
            temperature: requestData.temperature,
            betas: requestData.betas || [],
            permissionMode: requestData.permissionMode,
            promptCategory: requestData.promptCategory
        });
    }
    
    /**
     * Track API response
     * 
     * @param {Object} responseData - Response information
     */
    trackResponse(responseData) {
        this.track(EVENT_TYPES.API_RESPONSE, {
            model: responseData.model,
            usage: responseData.usage,
            duration: responseData.duration,
            success: responseData.success,
            statusCode: responseData.statusCode
        });
    }
    
    /**
     * Track error occurrence
     * 
     * @param {Error} error - Error that occurred
     * @param {Object} context - Error context
     */
    trackError(error, context = {}) {
        this.track(EVENT_TYPES.ERROR_OCCURRED, {
            errorType: error.name,
            errorMessage: error.message,
            errorCode: error.code,
            context: context
        });
    }
    
    /**
     * Track feature usage
     * 
     * @param {string} feature - Feature name
     * @param {Object} usage - Usage details
     */
    trackFeature(feature, usage = {}) {
        this.track(EVENT_TYPES.FEATURE_USED, {
            feature: feature,
            ...usage
        });
    }
    
    /**
     * Track user input
     * 
     * @param {string} inputType - Type of input (prompt, command, etc.)
     * @param {Object} metadata - Input metadata (length, etc.)
     */
    trackUserInput(inputType, metadata = {}) {
        this.track(EVENT_TYPES.USER_INPUT, {
            inputType: inputType,
            length: metadata.length,
            hasFiles: metadata.hasFiles,
            hasImages: metadata.hasImages
        });
    }
    
    /**
     * Track MCP operation
     * 
     * @param {string} operation - MCP operation
     * @param {Object} details - Operation details
     */
    trackMCP(operation, details = {}) {
        this.track(EVENT_TYPES.MCP_CONNECTION, {
            operation: operation,
            serverCount: details.serverCount,
            transportTypes: details.transportTypes,
            success: details.success
        });
    }
    
    /**
     * Enable telemetry
     */
    enable() {
        this.enabled = true;
        this._startPeriodicFlush();
        this.track('telemetry_enabled');
    }
    
    /**
     * Disable telemetry
     */
    disable() {
        this.enabled = false;
        this._stopPeriodicFlush();
        this._flush(); // Flush remaining events
        this.track('telemetry_disabled');
    }
    
    /**
     * Get telemetry status
     * 
     * @returns {Object} Telemetry status
     */
    getStatus() {
        return {
            enabled: this.enabled,
            sessionId: this.sessionId,
            queuedEvents: this.eventQueue.length,
            uptime: Date.now() - this.startTime,
            lastFlush: this.lastFlush || null
        };
    }
    
    /**
     * Flush events immediately
     * 
     * @returns {Promise} Flush promise
     */
    async flush() {
        return this._flush();
    }
    
    // Private methods
    
    /**
     * Generate unique session ID
     */
    _generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Generate unique event ID
     */
    _generateEventId() {
        return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Get application version
     */
    _getVersion() {
        // Try to get version from package.json
        try {
            const packageJson = require('../../package.json');
            return packageJson.version || 'unknown';
        } catch (error) {
            return 'unknown';
        }
    }
    
    /**
     * Sanitize data to remove sensitive information
     * 
     * @param {Object} data - Data to sanitize
     * @returns {Object} Sanitized data
     */
    _sanitizeData(data) {
        if (!data || typeof data !== 'object') {
            return data;
        }
        
        const sensitiveFields = [
            'apikey', 'token', 'password', 'secret', 'key',
            'authorization', 'credential', 'auth'
        ];
        
        const sanitized = {};
        
        for (const [key, value] of Object.entries(data)) {
            const keyLower = key.toLowerCase();
            const isSensitive = sensitiveFields.some(field => keyLower.includes(field));
            
            if (isSensitive) {
                sanitized[key] = '[REDACTED]';
            } else if (Array.isArray(value)) {
                sanitized[key] = value; // Don't sanitize arrays
            } else if (typeof value === 'object' && value !== null) {
                sanitized[key] = this._sanitizeData(value);
            } else {
                sanitized[key] = value;
            }
        }
        
        return sanitized;
    }
    
    /**
     * Start periodic flushing
     */
    _startPeriodicFlush() {
        if (this.flushTimer) {
            return;
        }
        
        this.flushTimer = setInterval(() => {
            this._flush();
        }, this.flushInterval);
    }
    
    /**
     * Stop periodic flushing
     */
    _stopPeriodicFlush() {
        if (this.flushTimer) {
            clearInterval(this.flushTimer);
            this.flushTimer = null;
        }
    }
    
    /**
     * Flush events asynchronously
     */
    async _flush() {
        if (!this.enabled || this.isFlushing || this.eventQueue.length === 0) {
            return;
        }
        
        this.isFlushing = true;
        const events = [...this.eventQueue];
        this.eventQueue = [];
        
        try {
            if (this.debug) {
                console.log(`📤 Flushing ${events.length} telemetry events`);
            }
            
            // In a real implementation, this would send to telemetry service
            // For now, we'll just log in debug mode
            if (this.debug) {
                events.forEach(event => {
                    console.log('📊 Event:', event.eventName, event.data);
                });
            }
            
            this.lastFlush = Date.now();
            
        } catch (error) {
            // Re-queue events if flush failed
            this.eventQueue.unshift(...events);
            errorHandler.handle(error, { operation: 'telemetry_flush' });
        } finally {
            this.isFlushing = false;
        }
    }
    
    /**
     * Flush events synchronously (for exit handlers)
     */
    _flushSync() {
        if (!this.enabled || this.eventQueue.length === 0) {
            return;
        }
        
        if (this.debug) {
            console.log(`📤 Final flush: ${this.eventQueue.length} telemetry events`);
            this.eventQueue.forEach(event => {
                console.log('📊 Event:', event.eventName, event.data);
            });
        }
        
        this.eventQueue = [];
    }
}

// Export singleton instance
export const telemetryManager = new TelemetryManager({
    enabled: process.env.TELEMETRY_ENABLED !== 'false',
    debug: process.env.DEBUG === 'true'
});

// Export event types for use throughout the codebase
export { EVENT_TYPES };