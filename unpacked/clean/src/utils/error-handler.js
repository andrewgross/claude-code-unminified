/**
 * Error Handling System
 * 
 * Comprehensive error handling system for Claude Code CLI with custom error types,
 * error processing, logging, and user-friendly error display.
 * 
 * Extracted from references throughout the codebase to missing error handlers.
 */

import chalk from 'chalk';

/**
 * Custom Error Types
 */

/**
 * Base Claude Code Error
 */
export class ClaudeCodeError extends Error {
    constructor(message, code = null, details = null) {
        super(message);
        this.name = 'ClaudeCodeError';
        this.code = code;
        this.details = details;
        this.timestamp = new Date().toISOString();
        
        // Maintains proper stack trace for where error was thrown (Node.js only)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ClaudeCodeError);
        }
    }
    
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            details: this.details,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

/**
 * API Communication Error
 */
export class APIError extends ClaudeCodeError {
    constructor(message, statusCode = null, response = null) {
        super(message, `API_ERROR_${statusCode}`, { statusCode, response });
        this.name = 'APIError';
        this.statusCode = statusCode;
        this.response = response;
    }
    
    get isRetryable() {
        // Retryable status codes
        return [408, 429, 500, 502, 503, 504].includes(this.statusCode);
    }
}

/**
 * Configuration Validation Error
 */
export class ValidationError extends ClaudeCodeError {
    constructor(message, field = null, value = null) {
        super(message, 'VALIDATION_ERROR', { field, value });
        this.name = 'ValidationError';
        this.field = field;
        this.value = value;
    }
}

/**
 * Model Overload Error (for fallback handling)
 */
export class ModelOverloadError extends APIError {
    constructor(originalModel, fallbackModel = null) {
        super(`Model ${originalModel} is overloaded`, 429, null);
        this.name = 'ModelOverloadError';
        this.originalModel = originalModel;
        this.fallbackModel = fallbackModel;
    }
}

/**
 * Authentication Error
 */
export class AuthenticationError extends ClaudeCodeError {
    constructor(message, provider = null) {
        super(message, 'AUTH_ERROR', { provider });
        this.name = 'AuthenticationError';
        this.provider = provider;
    }
}

/**
 * Configuration Error
 */
export class ConfigurationError extends ClaudeCodeError {
    constructor(message, configPath = null, key = null) {
        super(message, 'CONFIG_ERROR', { configPath, key });
        this.name = 'ConfigurationError';
        this.configPath = configPath;
        this.key = key;
    }
}

/**
 * Network Error
 */
export class NetworkError extends ClaudeCodeError {
    constructor(message, url = null, timeout = false) {
        super(message, timeout ? 'NETWORK_TIMEOUT' : 'NETWORK_ERROR', { url, timeout });
        this.name = 'NetworkError';
        this.url = url;
        this.timeout = timeout;
    }
}

/**
 * Tool Execution Error
 */
export class ToolExecutionError extends ClaudeCodeError {
    constructor(message, toolName = null, input = null) {
        super(message, 'TOOL_ERROR', { toolName, input });
        this.name = 'ToolExecutionError';
        this.toolName = toolName;
        this.input = input;
    }
}

/**
 * Error Handler Class
 */
export class ErrorHandler {
    constructor(options = {}) {
        this.debug = options.debug || false;
        this.verbose = options.verbose || false;
        this.logErrors = options.logErrors !== false; // Default true
        this.exitOnFatal = options.exitOnFatal !== false; // Default true
    }
    
    /**
     * Main error handling method
     * 
     * @param {Error} error - Error to handle
     * @param {Object} context - Additional context
     * @param {boolean} fatal - Whether error is fatal
     */
    handle(error, context = {}, fatal = false) {
        // Log error details
        if (this.logErrors) {
            this._logError(error, context, fatal);
        }
        
        // Display user-friendly error message
        this._displayError(error, context, fatal);
        
        // Handle fatal errors
        if (fatal && this.exitOnFatal) {
            process.exit(1);
        }
        
        return {
            handled: true,
            error: error,
            context: context,
            fatal: fatal,
            timestamp: new Date().toISOString()
        };
    }
    
    /**
     * Handle API errors specifically
     * 
     * @param {APIError} error - API error
     * @param {Object} context - Request context
     */
    handleAPIError(error, context = {}) {
        if (error instanceof APIError) {
            console.error(chalk.red('🌐 API Error:'), error.message);
            
            if (error.statusCode) {
                console.error(chalk.gray(`Status: ${error.statusCode}`));
            }
            
            if (error.isRetryable) {
                console.error(chalk.yellow('This error may be temporary. You can try again.'));
            }
            
            if (this.debug && error.response) {
                console.error(chalk.gray('Response details:'), JSON.stringify(error.response, null, 2));
            }
        } else {
            this.handle(error, context);
        }
    }
    
    /**
     * Handle validation errors specifically
     * 
     * @param {ValidationError} error - Validation error
     * @param {Object} context - Validation context
     */
    handleValidationError(error, context = {}) {
        if (error instanceof ValidationError) {
            console.error(chalk.red('⚠️  Configuration Error:'), error.message);
            
            if (error.field) {
                console.error(chalk.gray(`Field: ${error.field}`));
            }
            
            if (error.value !== null && error.value !== undefined) {
                console.error(chalk.gray(`Value: ${JSON.stringify(error.value)}`));
            }
            
            // Show helpful suggestions
            this._showValidationSuggestions(error);
        } else {
            this.handle(error, context);
        }
    }
    
    /**
     * Handle stream errors (used by API client)
     * 
     * @param {Error} error - Stream error
     * @param {Object} context - Stream context
     */
    handleStreamError(error, context = {}) {
        console.error(chalk.red('🌊 Stream Error:'), error.message);
        
        if (error.code) {
            console.error(chalk.gray(`Code: ${error.code}`));
        }
        
        if (this.debug) {
            console.error(chalk.gray('Context:'), JSON.stringify(context, null, 2));
            console.error(chalk.gray('Stack:'), error.stack);
        }
    }
    
    /**
     * Generate error message for API responses
     * 
     * @param {Error} error - Error to format
     * @param {string} model - Model that caused the error
     * @param {boolean} isNonInteractive - Whether in non-interactive mode
     * @returns {Object} Formatted error message
     */
    generateErrorMessage(error, model = null, isNonInteractive = false) {
        const baseMessage = {
            type: 'error',
            timestamp: new Date().toISOString(),
            error: {
                message: error.message,
                type: error.name || 'Error',
                code: error.code || null
            }
        };
        
        if (model) {
            baseMessage.model = model;
        }
        
        // Add specific handling for different error types
        if (error instanceof ModelOverloadError) {
            baseMessage.error.retryable = true;
            baseMessage.error.fallbackAvailable = !!error.fallbackModel;
            if (error.fallbackModel) {
                baseMessage.error.fallbackModel = error.fallbackModel;
            }
        }
        
        if (error instanceof APIError) {
            baseMessage.error.statusCode = error.statusCode;
            baseMessage.error.retryable = error.isRetryable;
        }
        
        return baseMessage;
    }
    
    /**
     * Generate fallback messages for conversation errors
     * 
     * @param {Array} assistantMessages - Messages from assistant
     * @param {string} reason - Reason for fallback
     * @returns {Array} Fallback messages
     */
    generateFallbackMessages(assistantMessages, reason) {
        const messages = [];
        
        // Add error system message
        messages.push({
            type: 'system',
            content: `Error occurred: ${reason}`,
            timestamp: new Date().toISOString(),
            level: 'error'
        });
        
        // If we have partial assistant messages, indicate they were interrupted
        if (assistantMessages && assistantMessages.length > 0) {
            messages.push({
                type: 'system',
                content: 'Previous response was interrupted due to an error.',
                timestamp: new Date().toISOString(),
                level: 'warning'
            });
        }
        
        return messages;
    }
    
    /**
     * Create a formatted system message
     * 
     * @param {string} message - Message content
     * @param {string} level - Message level (info, warning, error)
     * @returns {Object} System message object
     */
    createSystemMessage(message, level = 'info') {
        return {
            type: 'system',
            content: message,
            level: level,
            timestamp: new Date().toISOString()
        };
    }
    
    /**
     * Check if an error should trigger retry logic
     * 
     * @param {Error} error - Error to check
     * @returns {boolean} Whether error is retryable
     */
    isRetryableError(error) {
        if (error instanceof APIError) {
            return error.isRetryable;
        }
        
        if (error instanceof NetworkError) {
            return true; // Network errors are generally retryable
        }
        
        // Check for specific error codes/messages that indicate retryable conditions
        const retryableMessages = [
            'timeout',
            'network error',
            'connection reset',
            'service unavailable',
            'rate limit'
        ];
        
        const errorMessage = error.message.toLowerCase();
        return retryableMessages.some(msg => errorMessage.includes(msg));
    }
    
    // Private methods
    
    /**
     * Log error details
     * 
     * @private
     * @param {Error} error - Error to log
     * @param {Object} context - Error context
     * @param {boolean} fatal - Whether error is fatal
     */
    _logError(error, context, fatal) {
        const logLevel = fatal ? 'FATAL' : 'ERROR';
        const timestamp = new Date().toISOString();
        
        console.error(`[${timestamp}] ${logLevel}: ${error.message}`);
        
        if (error.code) {
            console.error(`[${timestamp}] Code: ${error.code}`);
        }
        
        if (this.verbose && Object.keys(context).length > 0) {
            console.error(`[${timestamp}] Context:`, JSON.stringify(context, null, 2));
        }
        
        if (this.debug && error.stack) {
            console.error(`[${timestamp}] Stack:`, error.stack);
        }
    }
    
    /**
     * Display user-friendly error message
     * 
     * @private
     * @param {Error} error - Error to display
     * @param {Object} context - Error context
     * @param {boolean} fatal - Whether error is fatal
     */
    _displayError(error, context, fatal) {
        const prefix = fatal ? '💀 Fatal Error:' : '❌ Error:';
        
        console.error(chalk.red(prefix), error.message);
        
        // Show specific error type information
        if (error instanceof ClaudeCodeError && error.details) {
            const details = error.details;
            Object.entries(details).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    console.error(chalk.gray(`  ${key}: ${JSON.stringify(value)}`));
                }
            });
        }
        
        // Show helpful context
        if (context.action) {
            console.error(chalk.gray(`  Action: ${context.action}`));
        }
        
        if (context.suggestion) {
            console.error(chalk.blue(`💡 Suggestion: ${context.suggestion}`));
        }
    }
    
    /**
     * Show validation-specific suggestions
     * 
     * @private
     * @param {ValidationError} error - Validation error
     */
    _showValidationSuggestions(error) {
        const suggestions = [];
        
        if (error.field) {
            switch (error.field) {
                case 'mcpServers':
                    suggestions.push('Check your MCP server configuration format');
                    suggestions.push('Ensure all required fields are present');
                    break;
                case 'apiKey':
                    suggestions.push('Verify your API key is set correctly');
                    suggestions.push('Run `claude auth` to authenticate');
                    break;
                case 'model':
                    suggestions.push('Check that the model name is valid');
                    suggestions.push('Use `claude config list` to see available models');
                    break;
                default:
                    suggestions.push('Check the configuration documentation');
            }
        }
        
        suggestions.forEach(suggestion => {
            console.error(chalk.blue(`💡 ${suggestion}`));
        });
    }
}

// Export singleton instance
export const errorHandler = new ErrorHandler({
    debug: process.env.DEBUG === 'true',
    verbose: process.env.VERBOSE === 'true'
});

// Export helper functions that match the API client expectations
export function handleStreamError(error, context = {}) {
    errorHandler.handleStreamError(error, context);
}

export function generateErrorMessage(error, model = null, isNonInteractive = false) {
    return errorHandler.generateErrorMessage(error, model, isNonInteractive);
}

export function* generateFallbackMessages(assistantMessages, reason) {
    const messages = errorHandler.generateFallbackMessages(assistantMessages, reason);
    for (const message of messages) {
        yield message;
    }
}

export function createSystemMessage(message, level = 'info') {
    return errorHandler.createSystemMessage(message, level);
}