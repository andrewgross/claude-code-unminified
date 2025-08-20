/**
 * MCP Error Integration
 * 
 * Integrates MCP-specific errors with the global error handling system.
 * Provides error mapping, handling, and recovery strategies for MCP operations.
 */

import { 
    ClaudeCodeError, 
    NetworkError, 
    AuthenticationError, 
    ConfigurationError,
    errorHandler 
} from '../utils/error-handler.js';
import { RetryHelper } from '../utils/retry-handler.js';

/**
 * MCP Transport Error
 */
export class MCPTransportError extends ClaudeCodeError {
    constructor(message, transportType = null, serverName = null) {
        super(message, 'MCP_TRANSPORT_ERROR', { transportType, serverName });
        this.name = 'MCPTransportError';
        this.transportType = transportType;
        this.serverName = serverName;
    }
}

/**
 * MCP Protocol Error
 */
export class MCPProtocolError extends ClaudeCodeError {
    constructor(message, method = null, params = null) {
        super(message, 'MCP_PROTOCOL_ERROR', { method, params });
        this.name = 'MCPProtocolError';
        this.method = method;
        this.params = params;
    }
}

/**
 * MCP Server Error
 */
export class MCPServerError extends ClaudeCodeError {
    constructor(message, serverName = null, errorCode = null) {
        super(message, 'MCP_SERVER_ERROR', { serverName, errorCode });
        this.name = 'MCPServerError';
        this.serverName = serverName;
        this.errorCode = errorCode;
    }
}

/**
 * MCP Configuration Error
 */
export class MCPConfigurationError extends ConfigurationError {
    constructor(message, serverName = null, scope = null) {
        super(message, null, null);
        this.name = 'MCPConfigurationError';
        this.serverName = serverName;
        this.scope = scope;
        this.code = 'MCP_CONFIG_ERROR';
        this.details = { serverName, scope };
    }
}

/**
 * MCP Error Handler
 * 
 * Specialized error handler for MCP operations
 */
export class MCPErrorHandler {
    constructor(baseErrorHandler = errorHandler) {
        this.baseHandler = baseErrorHandler;
    }
    
    /**
     * Handle MCP server connection errors
     * 
     * @param {Error} error - Connection error
     * @param {string} serverName - Server name
     * @param {string} transportType - Transport type
     */
    handleConnectionError(error, serverName, transportType = 'unknown') {
        // Wrap in MCP-specific error if needed
        let mcpError = error;
        if (!(error instanceof MCPTransportError)) {
            mcpError = new MCPTransportError(
                `Failed to connect to MCP server '${serverName}': ${error.message}`,
                transportType,
                serverName
            );
        }
        
        console.error(`🔌 MCP Connection Error [${serverName}]:`, mcpError.message);
        
        if (transportType === 'sse') {
            console.error('💡 SSE connection issues may be due to:');
            console.error('   - Network connectivity problems');
            console.error('   - Authentication failures');
            console.error('   - Server unavailability');
        } else if (transportType === 'stdio') {
            console.error('💡 STDIO connection issues may be due to:');
            console.error('   - Command not found or not executable');
            console.error('   - Permission issues');
            console.error('   - Process startup failures');
        }
        
        return this.baseHandler.handle(mcpError, { serverName, transportType });
    }
    
    /**
     * Handle MCP authentication errors
     * 
     * @param {Error} error - Auth error
     * @param {string} serverName - Server name
     * @param {string} provider - Auth provider
     */
    handleAuthError(error, serverName, provider = 'unknown') {
        const authError = new AuthenticationError(
            `Authentication failed for MCP server '${serverName}': ${error.message}`,
            provider
        );
        
        console.error(`🔐 MCP Auth Error [${serverName}]:`, authError.message);
        console.error('💡 Try running the authentication flow again');
        
        return this.baseHandler.handle(authError, { serverName, provider });
    }
    
    /**
     * Handle MCP configuration errors
     * 
     * @param {Error} error - Config error
     * @param {string} serverName - Server name
     * @param {string} scope - Configuration scope
     */
    handleConfigError(error, serverName, scope = 'unknown') {
        const configError = new MCPConfigurationError(
            `Configuration error for MCP server '${serverName}': ${error.message}`,
            serverName,
            scope
        );
        
        console.error(`⚙️  MCP Config Error [${serverName}]:`, configError.message);
        
        // Show scope-specific suggestions
        if (scope === 'user') {
            console.error('💡 Check your user MCP configuration in ~/.claude/settings.json');
        } else if (scope === 'project') {
            console.error('💡 Check your project MCP configuration in ./.mcp.json');
        }
        
        return this.baseHandler.handle(configError, { serverName, scope });
    }
    
    /**
     * Handle MCP server operational errors
     * 
     * @param {Error} error - Server error
     * @param {string} serverName - Server name
     * @param {string} operation - Operation that failed
     */
    handleServerError(error, serverName, operation = 'unknown') {
        const serverError = new MCPServerError(
            `MCP server '${serverName}' error during ${operation}: ${error.message}`,
            serverName,
            error.code
        );
        
        console.error(`🖥️  MCP Server Error [${serverName}]:`, serverError.message);
        
        return this.baseHandler.handle(serverError, { serverName, operation });
    }
    
    /**
     * Handle MCP protocol errors
     * 
     * @param {Error} error - Protocol error
     * @param {string} method - MCP method
     * @param {Object} params - Method parameters
     */
    handleProtocolError(error, method, params = {}) {
        const protocolError = new MCPProtocolError(
            `MCP protocol error for method '${method}': ${error.message}`,
            method,
            params
        );
        
        console.error(`📡 MCP Protocol Error [${method}]:`, protocolError.message);
        
        return this.baseHandler.handle(protocolError, { method, params });
    }
    
    /**
     * Handle MCP errors with retry logic
     * 
     * @param {Function} operation - MCP operation to retry
     * @param {string} serverName - Server name
     * @param {Object} options - Retry options
     */
    async handleWithRetry(operation, serverName, options = {}) {
        try {
            return await RetryHelper.mcp(operation, {
                ...options,
                onRetry: (attempt, error) => {
                    console.log(`🔄 Retrying MCP operation for ${serverName} (attempt ${attempt}): ${error.message}`);
                }
            });
        } catch (error) {
            return this.handleServerError(error, serverName, options.operation || 'unknown');
        }
    }
    
    /**
     * Create recovery suggestions for MCP errors
     * 
     * @param {Error} error - MCP error
     * @returns {Array} Recovery suggestions
     */
    getRecoverySuggestions(error) {
        const suggestions = [];
        
        if (error instanceof MCPTransportError) {
            suggestions.push('Check server configuration and connectivity');
            if (error.transportType === 'sse') {
                suggestions.push('Verify SSE endpoint URL and authentication');
            } else if (error.transportType === 'stdio') {
                suggestions.push('Ensure the command exists and is executable');
            }
        }
        
        if (error instanceof AuthenticationError) {
            suggestions.push('Re-run authentication flow');
            suggestions.push('Check API keys and credentials');
        }
        
        if (error instanceof MCPConfigurationError) {
            suggestions.push('Validate server configuration format');
            suggestions.push('Check required fields are present');
            suggestions.push('Use `claude mcp list` to verify configuration');
        }
        
        if (error instanceof MCPServerError) {
            suggestions.push('Check server logs for more details');
            suggestions.push('Verify server is running and responsive');
            suggestions.push('Try restarting the MCP server');
        }
        
        return suggestions;
    }
}

/**
 * Error recovery strategies for MCP operations
 */
export class MCPErrorRecovery {
    /**
     * Attempt to recover from connection errors
     * 
     * @param {Error} error - Connection error
     * @param {string} serverName - Server name
     * @param {Object} config - Server configuration
     * @returns {Promise<boolean>} Whether recovery was successful
     */
    static async recoverConnection(error, serverName, config) {
        console.log(`🔧 Attempting to recover connection to ${serverName}...`);
        
        // For stdio transport, check if command exists
        if (config.transport === 'stdio' || !config.transport) {
            try {
                // Try to find the command
                const { spawn } = require('child_process');
                const child = spawn('which', [config.command]);
                
                return new Promise((resolve) => {
                    child.on('exit', (code) => {
                        if (code === 0) {
                            console.log(`✅ Command '${config.command}' found for ${serverName}`);
                            resolve(true);
                        } else {
                            console.log(`❌ Command '${config.command}' not found for ${serverName}`);
                            resolve(false);
                        }
                    });
                });
            } catch (err) {
                return false;
            }
        }
        
        // For SSE transport, check connectivity
        if (config.transport === 'sse') {
            try {
                const response = await fetch(config.url, { 
                    method: 'HEAD',
                    timeout: 5000 
                });
                
                if (response.ok) {
                    console.log(`✅ SSE endpoint is reachable for ${serverName}`);
                    return true;
                } else {
                    console.log(`❌ SSE endpoint returned ${response.status} for ${serverName}`);
                    return false;
                }
            } catch (err) {
                console.log(`❌ SSE endpoint is not reachable for ${serverName}: ${err.message}`);
                return false;
            }
        }
        
        return false;
    }
    
    /**
     * Attempt to fix common configuration issues
     * 
     * @param {MCPConfigurationError} error - Configuration error
     * @returns {Object} Suggested fixes
     */
    static suggestConfigFixes(error) {
        const fixes = {
            issues: [],
            suggestions: []
        };
        
        if (error.serverName) {
            fixes.issues.push(`Server: ${error.serverName}`);
            
            // Common configuration issues
            if (error.message.includes('command')) {
                fixes.issues.push('Missing or invalid command field');
                fixes.suggestions.push('Ensure "command" field specifies a valid executable');
            }
            
            if (error.message.includes('url')) {
                fixes.issues.push('Missing or invalid URL field');
                fixes.suggestions.push('Ensure "url" field contains a valid HTTP/HTTPS URL');
            }
            
            if (error.message.includes('transport')) {
                fixes.issues.push('Invalid transport type');
                fixes.suggestions.push('Use "stdio", "sse", or "http" for transport field');
            }
        }
        
        return fixes;
    }
}

// Export singleton instance
export const mcpErrorHandler = new MCPErrorHandler();

// Export helper functions
export function handleMCPError(error, context = {}) {
    const { serverName, transportType, operation, method } = context;
    
    if (error.name?.includes('Auth')) {
        return mcpErrorHandler.handleAuthError(error, serverName, transportType);
    }
    
    if (error.name?.includes('Config')) {
        return mcpErrorHandler.handleConfigError(error, serverName, context.scope);
    }
    
    if (error.name?.includes('Transport')) {
        return mcpErrorHandler.handleConnectionError(error, serverName, transportType);
    }
    
    if (method) {
        return mcpErrorHandler.handleProtocolError(error, method, context.params);
    }
    
    return mcpErrorHandler.handleServerError(error, serverName, operation);
}