/**
 * MCP Server Validation and Health Monitoring
 * 
 * Comprehensive validation system for MCP server configurations,
 * health monitoring, and diagnostic tools.
 * 
 * Key chunks analyzed:
 * - chunk_0524.js:321-427 (gg function - server validation and addition)
 * - chunk_0524.js:528-655 (t61, g40 functions - config validation)
 * - chunk_0520.js:231-236 (wq1 function - project server approval status)
 * - chunk_0584.js transport validation patterns
 */

import * as fs from 'fs';
import * as path from 'path';
import { configManager } from '../config/manager.js';
import { 
    validateTransportConfig, 
    isRemoteTransport, 
    transportSupportsAuth,
    TRANSPORT_TYPES 
} from './transports/factory.js';
import { 
    MCP_SCOPES, 
    getScopeFilePath, 
    getProjectServerApprovalStatus,
    APPROVAL_STATES 
} from './scopes.js';

/**
 * Server validation error types
 */
export const VALIDATION_ERROR_TYPES = {
    FATAL: 'fatal',
    WARNING: 'warning',
    INFO: 'info'
};

/**
 * MCP Server Validator
 * 
 * Provides comprehensive validation for MCP server configurations
 * including name validation, transport validation, environment checking,
 * and platform-specific validation.
 */
export class McpServerValidator {
    constructor() {
        this._validationCache = new Map();
        this._cacheTimeout = 60000; // 1 minute cache
    }
    
    /**
     * Validate server name
     * 
     * Extracted from chunk_0524.js:322 (gg function):
     * - Names can only contain letters, numbers, hyphens, and underscores
     * - Must not be empty or contain special characters
     * 
     * @param {string} name - Server name to validate
     * @returns {Object} Validation result
     */
    validateServerName(name) {
        const errors = [];
        
        if (!name || typeof name !== 'string') {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'name',
                message: 'Server name is required and must be a string'
            });
            return { isValid: false, errors };
        }
        
        if (name.length === 0) {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'name',
                message: 'Server name cannot be empty'
            });
        }
        
        if (name.match(/[^a-zA-Z0-9_-]/)) {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'name',
                message: 'Invalid name. Names can only contain letters, numbers, hyphens, and underscores'
            });
        }
        
        if (name.length > 50) {
            errors.push({
                type: VALIDATION_ERROR_TYPES.WARNING,
                field: 'name',
                message: 'Server name is very long. Consider using a shorter name'
            });
        }
        
        return {
            isValid: errors.filter(e => e.type === VALIDATION_ERROR_TYPES.FATAL).length === 0,
            errors,
            warnings: errors.filter(e => e.type === VALIDATION_ERROR_TYPES.WARNING)
        };
    }
    
    /**
     * Validate complete server configuration
     * 
     * Extracted from chunk_0524.js:323-346 (gg function validation logic):
     * - Schema validation using Zod patterns
     * - Transport-specific validation
     * - Environment variable validation
     * - Scope conflict detection
     * 
     * @param {string} name - Server name
     * @param {Object} config - Server configuration
     * @param {string} scope - Target scope
     * @returns {Object} Comprehensive validation result
     */
    validateServerConfiguration(name, config, scope = 'local') {
        const cacheKey = `${name}_${JSON.stringify(config)}_${scope}`;
        
        // Check cache first
        const cached = this._validationCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this._cacheTimeout) {
            return cached.result;
        }
        
        const errors = [];
        const warnings = [];
        const suggestions = [];
        
        // Validate server name first
        const nameValidation = this.validateServerName(name);
        if (!nameValidation.isValid) {
            errors.push(...nameValidation.errors);
        }
        warnings.push(...(nameValidation.warnings || []));
        
        // Validate configuration object
        if (!config || typeof config !== 'object') {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'config',
                message: 'Server configuration must be an object'
            });
            
            const result = { isValid: false, errors, warnings, suggestions };
            this._validationCache.set(cacheKey, { result, timestamp: Date.now() });
            return result;
        }
        
        // Validate transport configuration
        const transportErrors = validateTransportConfig(config);
        for (const error of transportErrors) {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'transport',
                message: error
            });
        }
        
        // Transport-specific validation
        const transportType = config.transport || 'stdio';
        this._validateTransportSpecific(transportType, config, errors, warnings, suggestions);
        
        // Platform-specific validation (from chunk_0524.js:573-585)
        this._validatePlatformSpecific(name, config, scope, errors, warnings, suggestions);
        
        // Environment variable validation
        this._validateEnvironmentVariables(name, config, errors, warnings, suggestions);
        
        // Scope conflict validation
        this._validateScopeConflicts(name, scope, errors, warnings, suggestions);
        
        // Security validation
        this._validateSecurity(config, errors, warnings, suggestions);
        
        const result = {
            isValid: errors.filter(e => e.type === VALIDATION_ERROR_TYPES.FATAL).length === 0,
            errors,
            warnings,
            suggestions,
            metadata: {
                transportType,
                isRemote: isRemoteTransport(transportType),
                supportsAuth: transportSupportsAuth(transportType),
                scope,
                validatedAt: new Date().toISOString()
            }
        };
        
        // Cache the result
        this._validationCache.set(cacheKey, { result, timestamp: Date.now() });
        
        return result;
    }
    
    /**
     * Validate transport-specific configuration
     */
    _validateTransportSpecific(transportType, config, errors, warnings, suggestions) {
        switch (transportType) {
            case TRANSPORT_TYPES.STDIO:
                this._validateStdioConfig(config, errors, warnings, suggestions);
                break;
                
            case TRANSPORT_TYPES.SSE:
            case TRANSPORT_TYPES.HTTP:
                this._validateRemoteConfig(config, errors, warnings, suggestions);
                break;
                
            case TRANSPORT_TYPES.SSE_IDE:
            case 'ws-ide':
                this._validateIdeConfig(config, errors, warnings, suggestions);
                break;
        }
    }
    
    /**
     * Validate stdio transport configuration
     */
    _validateStdioConfig(config, errors, warnings, suggestions) {
        if (!config.command) {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'command',
                message: 'Command is required for stdio transport'
            });
            return;
        }
        
        // Check if command exists (basic check)
        const command = config.command.split(' ')[0];
        if (command.includes('/') || command.includes('\\')) {
            // Absolute/relative path - check if file exists
            if (!fs.existsSync(command)) {
                warnings.push({
                    type: VALIDATION_ERROR_TYPES.WARNING,
                    field: 'command',
                    message: `Command path does not exist: ${command}`,
                    suggestion: 'Verify the command path is correct and the file exists'
                });
            }
        }
        
        // Validate arguments
        if (config.args && !Array.isArray(config.args)) {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'args',
                message: 'Arguments must be an array'
            });
        }
        
        // Check for common patterns
        if (config.command === 'python' || config.command === 'python3') {
            suggestions.push({
                field: 'command',
                message: 'Consider using absolute path to Python executable for better reliability'
            });
        }
        
        if (config.command === 'node') {
            suggestions.push({
                field: 'command', 
                message: 'Consider specifying Node.js version or using absolute path'
            });
        }
    }
    
    /**
     * Validate remote transport configuration
     */
    _validateRemoteConfig(config, errors, warnings, suggestions) {
        if (!config.url) {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'url',
                message: 'URL is required for remote transport'
            });
            return;
        }
        
        // Validate URL format
        try {
            const url = new URL(config.url);
            
            // Check protocol
            if (!['http:', 'https:'].includes(url.protocol)) {
                warnings.push({
                    type: VALIDATION_ERROR_TYPES.WARNING,
                    field: 'url',
                    message: 'URL should use HTTP or HTTPS protocol'
                });
            }
            
            // Security check for HTTPS
            if (url.protocol === 'http:' && !url.hostname.includes('localhost') && !url.hostname.includes('127.0.0.1')) {
                warnings.push({
                    type: VALIDATION_ERROR_TYPES.WARNING,
                    field: 'url',
                    message: 'Consider using HTTPS for remote servers',
                    suggestion: 'HTTPS provides better security for remote connections'
                });
            }
            
        } catch (error) {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'url',
                message: `Invalid URL format: ${error.message}`
            });
        }
        
        // Validate headers if present
        if (config.headers) {
            if (typeof config.headers !== 'object') {
                errors.push({
                    type: VALIDATION_ERROR_TYPES.FATAL,
                    field: 'headers',
                    message: 'Headers must be an object'
                });
            } else {
                // Check for sensitive headers
                for (const [key, value] of Object.entries(config.headers)) {
                    if (key.toLowerCase().includes('authorization') && typeof value === 'string' && value.includes('Bearer')) {
                        warnings.push({
                            type: VALIDATION_ERROR_TYPES.WARNING,
                            field: 'headers',
                            message: 'Authorization headers detected. Consider using OAuth flow instead',
                            suggestion: 'Use OAuth authentication for better security'
                        });
                    }
                }
            }
        }
    }
    
    /**
     * Validate IDE transport configuration
     */
    _validateIdeConfig(config, errors, warnings, suggestions) {
        // IDE transports have minimal configuration requirements
        if (!config.url) {
            errors.push({
                type: VALIDATION_ERROR_TYPES.FATAL,
                field: 'url',
                message: 'URL is required for IDE transport'
            });
        }
        
        suggestions.push({
            field: 'transport',
            message: 'IDE transports are intended for development/testing environments'
        });
    }
    
    /**
     * Validate platform-specific configurations
     * 
     * Extracted from chunk_0524.js:573-585:
     * - Windows npx command validation
     * - Platform-specific path handling
     * - Shell wrapper requirements
     */
    _validatePlatformSpecific(name, config, scope, errors, warnings, suggestions) {
        const platform = process.platform;
        
        // Windows-specific validation (from chunk_0524.js:573-585)
        if (platform === 'win32' && (!config.transport || config.transport === 'stdio')) {
            const command = config.command;
            if (command === 'npx' || command.endsWith('\\npx') || command.endsWith('/npx')) {
                warnings.push({
                    type: VALIDATION_ERROR_TYPES.WARNING,
                    field: 'command',
                    message: 'Windows requires cmd /c wrapper to execute npx',
                    suggestion: 'Change command to "cmd" with args ["/c", "npx", ...]. See: https://docs.anthropic.com/en/docs/claude-code/mcp#configure-mcp-servers',
                    mcpErrorMetadata: {
                        scope,
                        serverName: name,
                        severity: 'warning'
                    }
                });
            }
        }
        
        // Path separator validation
        if (config.command && config.command.includes('\\') && platform !== 'win32') {
            warnings.push({
                type: VALIDATION_ERROR_TYPES.WARNING,
                field: 'command',
                message: 'Windows-style path separators detected on non-Windows platform'
            });
        }
        
        if (config.command && config.command.includes('/') && platform === 'win32') {
            suggestions.push({
                field: 'command',
                message: 'Consider using Windows-style path separators on Windows'
            });
        }
    }
    
    /**
     * Validate environment variables
     * 
     * Extracted patterns from chunk_0524.js:276-319 (_G4 function):
     * - Environment variable expansion validation
     * - Missing variable detection
     * - Default value validation
     */
    _validateEnvironmentVariables(name, config, errors, warnings, suggestions) {
        const missingVars = this._findMissingEnvironmentVariables(config);
        
        if (missingVars.length > 0) {
            warnings.push({
                type: VALIDATION_ERROR_TYPES.WARNING,
                field: 'environment',
                message: `Missing environment variables: ${missingVars.join(', ')}`,
                suggestion: `Set the following environment variables: ${missingVars.join(', ')}`,
                mcpErrorMetadata: {
                    serverName: name,
                    severity: 'warning'
                }
            });
        }
        
        // Check for potentially sensitive environment variables
        if (config.env) {
            for (const [key, value] of Object.entries(config.env)) {
                if (key.toLowerCase().includes('password') || 
                    key.toLowerCase().includes('secret') ||
                    key.toLowerCase().includes('key') ||
                    key.toLowerCase().includes('token')) {
                    warnings.push({
                        type: VALIDATION_ERROR_TYPES.WARNING,
                        field: 'env',
                        message: `Potentially sensitive environment variable: ${key}`,
                        suggestion: 'Consider using environment variable expansion instead of hardcoding sensitive values'
                    });
                }
            }
        }
    }
    
    /**
     * Find missing environment variables in configuration
     * Based on _G4 function pattern from chunk_0524.js:276-319
     */
    _findMissingEnvironmentVariables(config) {
        const missingVars = [];
        
        const checkString = (str) => {
            if (typeof str !== 'string') return;
            
            str.replace(/\$\{([^}]+)\}/g, (match, varExpr) => {
                const [varName, defaultValue] = varExpr.split(':-');
                const envValue = process.env[varName];
                
                if (envValue === undefined && defaultValue === undefined) {
                    missingVars.push(varName);
                }
                return match;
            });
        };
        
        // Check different config types
        switch (config.transport) {
            case undefined:
            case 'stdio':
                checkString(config.command);
                if (config.args) {
                    config.args.forEach(checkString);
                }
                if (config.env) {
                    Object.values(config.env).forEach(checkString);
                }
                break;
                
            case 'sse':
            case 'http':
                checkString(config.url);
                if (config.headers) {
                    Object.values(config.headers).forEach(checkString);
                }
                break;
        }
        
        return [...new Set(missingVars)];
    }
    
    /**
     * Validate scope conflicts
     */
    _validateScopeConflicts(name, targetScope, errors, warnings, suggestions) {
        // Check if server already exists in target scope
        try {
            const scopeManager = this._getScopeManager();
            const existingServer = scopeManager.findServerByName(name);
            
            if (existingServer && existingServer.scope === targetScope) {
                errors.push({
                    type: VALIDATION_ERROR_TYPES.FATAL,
                    field: 'scope',
                    message: `MCP server ${name} already exists in ${targetScope} scope`
                });
            } else if (existingServer) {
                warnings.push({
                    type: VALIDATION_ERROR_TYPES.WARNING,
                    field: 'scope',
                    message: `Server ${name} exists in ${existingServer.scope} scope`,
                    suggestion: `Consider using a different name or removing from ${existingServer.scope} scope first`
                });
            }
            
            // Project scope approval validation
            if (targetScope === MCP_SCOPES.PROJECT) {
                const approvalStatus = getProjectServerApprovalStatus(name);
                if (approvalStatus === APPROVAL_STATES.REJECTED) {
                    errors.push({
                        type: VALIDATION_ERROR_TYPES.FATAL,
                        field: 'approval',
                        message: `Server ${name} has been rejected for project scope`
                    });
                } else if (approvalStatus === APPROVAL_STATES.PENDING) {
                    warnings.push({
                        type: VALIDATION_ERROR_TYPES.WARNING,
                        field: 'approval',
                        message: `Server ${name} requires approval for project scope`
                    });
                }
            }
            
        } catch (error) {
            // Ignore scope validation errors - they're not critical
            console.warn('Scope validation error:', error.message);
        }
    }
    
    /**
     * Validate security aspects of configuration
     */
    _validateSecurity(config, errors, warnings, suggestions) {
        // Check for hardcoded credentials
        const configStr = JSON.stringify(config).toLowerCase();
        
        if (configStr.includes('password') || configStr.includes('secret') || configStr.includes('key')) {
            warnings.push({
                type: VALIDATION_ERROR_TYPES.WARNING,
                field: 'security',
                message: 'Potential credentials detected in configuration',
                suggestion: 'Use environment variables or secure credential storage instead'
            });
        }
        
        // Check for HTTP URLs in production-like configs
        if (config.url && config.url.startsWith('http://') && !config.url.includes('localhost')) {
            warnings.push({
                type: VALIDATION_ERROR_TYPES.WARNING,
                field: 'security',
                message: 'Using HTTP for remote connection',
                suggestion: 'Use HTTPS for better security'
            });
        }
        
        // Check for overly permissive configurations
        if (config.env && Object.keys(config.env).length > 10) {
            suggestions.push({
                field: 'environment',
                message: 'Large number of environment variables detected',
                suggestion: 'Consider if all environment variables are necessary'
            });
        }
    }
    
    /**
     * Get scope manager (abstraction for testing)
     */
    _getScopeManager() {
        // In real implementation, this would import and use the scope manager
        // For now, return a minimal implementation
        return {
            findServerByName: () => null
        };
    }
    
    /**
     * Clear validation cache
     */
    clearCache() {
        this._validationCache.clear();
    }
    
    /**
     * Get validation cache statistics
     */
    getCacheStats() {
        const now = Date.now();
        let valid = 0;
        let expired = 0;
        
        for (const cached of this._validationCache.values()) {
            if (now - cached.timestamp < this._cacheTimeout) {
                valid++;
            } else {
                expired++;
            }
        }
        
        return {
            total: this._validationCache.size,
            valid,
            expired,
            cacheTimeout: this._cacheTimeout
        };
    }
}

/**
 * MCP Health Monitor
 * 
 * Monitors server health, connection status, and performance metrics.
 */
export class McpHealthMonitor {
    constructor(options = {}) {
        this._monitoringInterval = options.interval || 30000; // 30 seconds
        this._healthChecks = new Map();
        this._isMonitoring = false;
        this._intervalId = null;
    }
    
    /**
     * Start health monitoring
     */
    startMonitoring() {
        if (this._isMonitoring) {
            return;
        }
        
        this._isMonitoring = true;
        this._intervalId = setInterval(() => {
            this._performHealthChecks();
        }, this._monitoringInterval);
        
        console.log(`🔍 Started MCP health monitoring (interval: ${this._monitoringInterval}ms)`);
    }
    
    /**
     * Stop health monitoring
     */
    stopMonitoring() {
        if (!this._isMonitoring) {
            return;
        }
        
        this._isMonitoring = false;
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = null;
        }
        
        console.log('🛑 Stopped MCP health monitoring');
    }
    
    /**
     * Perform health checks on all connected servers
     */
    async _performHealthChecks() {
        // This would integrate with the actual MCP manager to check server health
        console.log('🔍 Performing health checks...');
        
        // Placeholder for actual health check implementation
        // Would check:
        // - Connection status
        // - Response times
        // - Error rates
        // - Resource availability
    }
    
    /**
     * Get health status for all servers
     */
    getHealthStatus() {
        const healthData = [];
        
        for (const [serverName, health] of this._healthChecks) {
            healthData.push({
                serverName,
                ...health,
                lastCheck: new Date(health.lastCheck).toISOString()
            });
        }
        
        return {
            servers: healthData,
            isMonitoring: this._isMonitoring,
            monitoringInterval: this._monitoringInterval
        };
    }
}

// Export validator and monitor instances
export const mcpServerValidator = new McpServerValidator();
export const mcpHealthMonitor = new McpHealthMonitor();