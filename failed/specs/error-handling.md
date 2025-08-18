# Error Handling Specification

## Overview
Claude Code implements a comprehensive error handling system that provides graceful error recovery, detailed error reporting, user-friendly error messages, and robust debugging capabilities. The system handles errors at multiple layers and provides consistent error experiences across the application.

## Architecture

### Core Components
- **Error Hierarchy**: Structured error classes for different error types
- **Error Boundary System**: React error boundaries for UI error handling
- **Error Reporter**: Centralized error reporting and logging
- **Recovery Engine**: Automatic and manual error recovery mechanisms
- **User Communication**: User-friendly error messages and suggestions
- **Debug System**: Detailed error information for development

### Error Categories
- **User Errors**: Invalid input, configuration errors, usage mistakes
- **System Errors**: File system, network, permission errors
- **Application Errors**: Internal application logic errors
- **External Errors**: API failures, service unavailability
- **Resource Errors**: Memory, disk space, timeout errors

## Error Class Hierarchy

### Base Error Classes
```javascript
/**
 * Base error class for all Claude Code errors
 */
class ClaudeCodeError extends Error {
    constructor(message, options = {}) {
        super(message);
        this.name = this.constructor.name;
        this.code = options.code;
        this.category = options.category || 'application';
        this.severity = options.severity || 'error';
        this.context = options.context || {};
        this.timestamp = Date.now();
        this.userMessage = options.userMessage || message;
        this.suggestions = options.suggestions || [];
        this.recoverable = options.recoverable !== false;
        
        // Capture stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    
    /**
     * Get a user-friendly representation of the error
     */
    toUserString() {
        let result = this.userMessage;
        
        if (this.suggestions.length > 0) {
            result += '\n\nSuggestions:';
            this.suggestions.forEach((suggestion, index) => {
                result += `\n${index + 1}. ${suggestion}`;
            });
        }
        
        return result;
    }
    
    /**
     * Get detailed error information for debugging
     */
    toDebugObject() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            category: this.category,
            severity: this.severity,
            context: this.context,
            timestamp: this.timestamp,
            stack: this.stack,
            recoverable: this.recoverable
        };
    }
    
    /**
     * Check if this error can be recovered from
     */
    isRecoverable() {
        return this.recoverable;
    }
}

/**
 * Errors related to user input and usage
 */
class UserError extends ClaudeCodeError {
    constructor(message, options = {}) {
        super(message, {
            ...options,
            category: 'user',
            severity: options.severity || 'warning'
        });
    }
}

/**
 * Errors related to configuration
 */
class ConfigurationError extends UserError {
    constructor(message, options = {}) {
        super(message, {
            ...options,
            code: options.code || 'CONFIG_ERROR'
        });
    }
}

/**
 * Errors related to authentication and authorization
 */
class AuthenticationError extends ClaudeCodeError {
    constructor(message, options = {}) {
        super(message, {
            ...options,
            category: 'auth',
            code: options.code || 'AUTH_ERROR',
            recoverable: options.recoverable !== false
        });
    }
}

/**
 * Errors related to network operations
 */
class NetworkError extends ClaudeCodeError {
    constructor(message, options = {}) {
        super(message, {
            ...options,
            category: 'network',
            code: options.code || 'NETWORK_ERROR',
            recoverable: true // Network errors are usually recoverable
        });
    }
}

/**
 * Errors related to file system operations
 */
class FileSystemError extends ClaudeCodeError {
    constructor(message, options = {}) {
        super(message, {
            ...options,
            category: 'filesystem',
            code: options.code || 'FS_ERROR'
        });
    }
}

/**
 * Errors related to MCP servers and tools
 */
class MCPError extends ClaudeCodeError {
    constructor(message, options = {}) {
        super(message, {
            ...options,
            category: 'mcp',
            code: options.code || 'MCP_ERROR'
        });
    }
}

/**
 * Errors related to validation
 */
class ValidationError extends UserError {
    constructor(message, validationErrors = [], options = {}) {
        super(message, {
            ...options,
            code: 'VALIDATION_ERROR'
        });
        this.validationErrors = validationErrors;
    }
    
    toUserString() {
        let result = this.userMessage;
        
        if (this.validationErrors.length > 0) {
            result += '\n\nValidation errors:';
            this.validationErrors.forEach((error, index) => {
                result += `\n${index + 1}. ${error.field}: ${error.message}`;
            });
        }
        
        if (this.suggestions.length > 0) {
            result += '\n\nSuggestions:';
            this.suggestions.forEach((suggestion, index) => {
                result += `\n${index + 1}. ${suggestion}`;
            });
        }
        
        return result;
    }
}
```

### Specialized Error Classes
```javascript
/**
 * Tool execution errors
 */
class ToolExecutionError extends MCPError {
    constructor(toolName, message, options = {}) {
        super(message, {
            ...options,
            code: 'TOOL_EXECUTION_ERROR',
            context: { ...options.context, toolName }
        });
        this.toolName = toolName;
    }
}

/**
 * Permission denied errors
 */
class PermissionError extends ClaudeCodeError {
    constructor(resource, action, message, options = {}) {
        const defaultMessage = message || `Permission denied: cannot ${action} ${resource}`;
        super(defaultMessage, {
            ...options,
            category: 'permission',
            code: 'PERMISSION_DENIED',
            context: { ...options.context, resource, action },
            suggestions: options.suggestions || [
                'Check your permissions for this resource',
                'Contact your administrator if you need access',
                'Verify you are in the correct directory or context'
            ]
        });
        this.resource = resource;
        this.action = action;
    }
}

/**
 * Resource not found errors
 */
class NotFoundError extends ClaudeCodeError {
    constructor(resource, type = 'resource', options = {}) {
        const message = `${type} not found: ${resource}`;
        super(message, {
            ...options,
            category: 'notfound',
            code: 'NOT_FOUND',
            context: { ...options.context, resource, type },
            suggestions: options.suggestions || [
                `Check if the ${type} exists and is spelled correctly`,
                `Verify you are in the correct location`,
                `Use 'list' or 'search' commands to find available ${type}s`
            ]
        });
        this.resource = resource;
        this.type = type;
    }
}

/**
 * Timeout errors
 */
class TimeoutError extends ClaudeCodeError {
    constructor(operation, timeout, options = {}) {
        const message = `Operation timed out: ${operation} (${timeout}ms)`;
        super(message, {
            ...options,
            category: 'timeout',
            code: 'TIMEOUT',
            context: { ...options.context, operation, timeout },
            recoverable: true,
            suggestions: options.suggestions || [
                'Try the operation again',
                'Check your network connection',
                'Increase the timeout if possible'
            ]
        });
        this.operation = operation;
        this.timeout = timeout;
    }
}

/**
 * Rate limiting errors
 */
class RateLimitError extends NetworkError {
    constructor(limit, resetTime, options = {}) {
        const message = `Rate limit exceeded. Limit: ${limit}, resets at: ${new Date(resetTime)}`;
        super(message, {
            ...options,
            code: 'RATE_LIMIT_EXCEEDED',
            context: { ...options.context, limit, resetTime },
            suggestions: options.suggestions || [
                'Wait before making more requests',
                `Try again after ${new Date(resetTime).toLocaleTimeString()}`,
                'Consider upgrading your plan for higher limits'
            ]
        });
        this.limit = limit;
        this.resetTime = resetTime;
    }
}
```

## Error Handling Patterns

### Try-Catch Patterns
```javascript
/**
 * Standardized error handling wrapper
 */
async function handleAsyncOperation(operation, context = {}, errorHandlers = {}) {
    try {
        return await operation();
    } catch (error) {
        // Transform known error types
        const handledError = transformError(error, context);
        
        // Apply specific error handlers
        if (errorHandlers[handledError.constructor.name]) {
            return await errorHandlers[handledError.constructor.name](handledError);
        }
        
        if (errorHandlers[handledError.code]) {
            return await errorHandlers[handledError.code](handledError);
        }
        
        if (errorHandlers.default) {
            return await errorHandlers.default(handledError);
        }
        
        throw handledError;
    }
}

/**
 * Transform raw errors into structured error objects
 */
function transformError(error, context = {}) {
    // If already a ClaudeCodeError, return as-is
    if (error instanceof ClaudeCodeError) {
        return error;
    }
    
    // Transform common error types
    if (error.code === 'ENOENT') {
        return new NotFoundError(
            error.path || 'file',
            'file',
            {
                context: { ...context, originalError: error },
                suggestions: [
                    'Check if the file path is correct',
                    'Verify the file exists',
                    'Check file permissions'
                ]
            }
        );
    }
    
    if (error.code === 'EACCES') {
        return new PermissionError(
            error.path || 'resource',
            'access',
            error.message,
            {
                context: { ...context, originalError: error }
            }
        );
    }
    
    if (error.code === 'ENOTDIR' || error.code === 'EISDIR') {
        return new FileSystemError(error.message, {
            code: error.code,
            context: { ...context, originalError: error, path: error.path }
        });
    }
    
    if (error.name === 'TypeError') {
        return new ValidationError('Invalid input type', [], {
            context: { ...context, originalError: error }
        });
    }
    
    if (error.name === 'SyntaxError') {
        return new ValidationError('Invalid syntax', [], {
            context: { ...context, originalError: error }
        });
    }
    
    // Network errors
    if (error.code === 'ECONNREFUSED' || error.code === 'EHOSTUNREACH') {
        return new NetworkError('Connection failed', {
            code: error.code,
            context: { ...context, originalError: error },
            suggestions: [
                'Check your internet connection',
                'Verify the server is running',
                'Check if the URL is correct'
            ]
        });
    }
    
    if (error.code === 'ETIMEDOUT') {
        return new TimeoutError(
            'Network request',
            error.timeout || 30000,
            {
                context: { ...context, originalError: error }
            }
        );
    }
    
    // Default transformation
    return new ClaudeCodeError(error.message || 'Unknown error', {
        code: error.code || 'UNKNOWN_ERROR',
        context: { ...context, originalError: error },
        recoverable: false
    });
}

/**
 * Retry mechanism with exponential backoff
 */
async function retryOperation(operation, options = {}) {
    const {
        maxAttempts = 3,
        baseDelay = 1000,
        maxDelay = 10000,
        backoffFactor = 2,
        retryCondition = (error) => error.isRecoverable?.() || error.code === 'NETWORK_ERROR'
    } = options;
    
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = transformError(error);
            
            // Don't retry if condition not met or it's the last attempt
            if (!retryCondition(lastError) || attempt === maxAttempts) {
                break;
            }
            
            // Calculate delay with exponential backoff
            const delay = Math.min(
                baseDelay * Math.pow(backoffFactor, attempt - 1),
                maxDelay
            );
            
            console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms:`, lastError.message);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError;
}
```

### Error Recovery Strategies
```javascript
/**
 * Error recovery system
 */
class ErrorRecoveryManager {
    constructor() {
        this.recoveryStrategies = new Map();
        this.recoveryHistory = [];
    }
    
    registerRecoveryStrategy(errorType, strategy) {
        if (!this.recoveryStrategies.has(errorType)) {
            this.recoveryStrategies.set(errorType, []);
        }
        this.recoveryStrategies.get(errorType).push(strategy);
    }
    
    async attemptRecovery(error, context = {}) {
        const strategies = [
            ...this.recoveryStrategies.get(error.constructor.name) || [],
            ...this.recoveryStrategies.get(error.code) || [],
            ...this.recoveryStrategies.get('*') || []
        ];
        
        for (const strategy of strategies) {
            try {
                const result = await strategy.recover(error, context);
                
                if (result.success) {
                    this.recordRecovery(error, strategy, result);
                    return result;
                }
            } catch (recoveryError) {
                console.warn('Recovery strategy failed:', recoveryError.message);
            }
        }
        
        return { success: false, error };
    }
    
    recordRecovery(error, strategy, result) {
        this.recoveryHistory.push({
            timestamp: Date.now(),
            errorType: error.constructor.name,
            errorCode: error.code,
            strategy: strategy.name,
            success: result.success,
            recoveryTime: result.recoveryTime
        });
    }
}

// Recovery strategies
const authRecoveryStrategy = {
    name: 'auth_recovery',
    async recover(error, context) {
        if (error instanceof AuthenticationError) {
            // Attempt token refresh
            try {
                await context.authManager?.refreshToken();
                return { 
                    success: true, 
                    action: 'token_refreshed',
                    message: 'Authentication token refreshed successfully'
                };
            } catch (refreshError) {
                // Redirect to login
                return {
                    success: true,
                    action: 'redirect_login',
                    message: 'Please log in again'
                };
            }
        }
        return { success: false };
    }
};

const networkRecoveryStrategy = {
    name: 'network_recovery',
    async recover(error, context) {
        if (error instanceof NetworkError) {
            // Check network connectivity
            const isOnline = await checkNetworkConnectivity();
            
            if (!isOnline) {
                return {
                    success: true,
                    action: 'wait_for_connection',
                    message: 'Network connection lost. Please check your connection and try again.'
                };
            }
            
            // Attempt to use cached data if available
            if (context.cache) {
                const cachedData = await context.cache.get(context.cacheKey);
                if (cachedData) {
                    return {
                        success: true,
                        action: 'use_cached_data',
                        data: cachedData,
                        message: 'Using cached data due to network error'
                    };
                }
            }
        }
        return { success: false };
    }
};

const fileSystemRecoveryStrategy = {
    name: 'filesystem_recovery',
    async recover(error, context) {
        if (error instanceof FileSystemError) {
            // Try to create missing directories
            if (error.code === 'ENOENT' && context.createDirectories) {
                try {
                    const dirPath = path.dirname(context.filePath);
                    await fs.mkdir(dirPath, { recursive: true });
                    return {
                        success: true,
                        action: 'created_directory',
                        message: `Created missing directory: ${dirPath}`
                    };
                } catch (createError) {
                    return { success: false };
                }
            }
            
            // Suggest alternative locations
            if (error.code === 'ENOENT') {
                const suggestions = await findAlternativeFiles(context.filePath);
                if (suggestions.length > 0) {
                    return {
                        success: true,
                        action: 'suggest_alternatives',
                        suggestions: suggestions,
                        message: 'File not found. Here are some similar files:'
                    };
                }
            }
        }
        return { success: false };
    }
};
```

## Error Reporting

### Error Logger
```javascript
class ErrorLogger {
    constructor(options = {}) {
        this.logLevel = options.logLevel || 'error';
        this.loggers = [];
        this.enableConsole = options.enableConsole !== false;
        this.enableFile = options.enableFile || false;
        this.enableRemote = options.enableRemote || false;
        this.sensitiveFields = options.sensitiveFields || ['password', 'token', 'key', 'secret'];
    }
    
    addLogger(logger) {
        this.loggers.push(logger);
    }
    
    async logError(error, context = {}) {
        const logEntry = this.createLogEntry(error, context);
        
        // Console logging
        if (this.enableConsole) {
            this.logToConsole(logEntry);
        }
        
        // Custom loggers
        for (const logger of this.loggers) {
            try {
                await logger.log(logEntry);
            } catch (loggerError) {
                console.error('Logger failed:', loggerError);
            }
        }
    }
    
    createLogEntry(error, context) {
        const entry = {
            timestamp: new Date().toISOString(),
            level: this.mapSeverityToLevel(error.severity),
            message: error.message,
            name: error.name,
            code: error.code,
            category: error.category,
            context: this.sanitizeContext({ ...context, ...error.context }),
            stack: error.stack,
            userAgent: process.version,
            platform: process.platform,
            arch: process.arch
        };
        
        return entry;
    }
    
    sanitizeContext(context) {
        const sanitized = { ...context };
        
        for (const [key, value] of Object.entries(sanitized)) {
            if (this.isSensitiveField(key)) {
                sanitized[key] = '[REDACTED]';
            } else if (typeof value === 'object' && value !== null) {
                sanitized[key] = this.sanitizeContext(value);
            }
        }
        
        return sanitized;
    }
    
    isSensitiveField(fieldName) {
        const lowerField = fieldName.toLowerCase();
        return this.sensitiveFields.some(sensitive => 
            lowerField.includes(sensitive.toLowerCase())
        );
    }
    
    logToConsole(entry) {
        const color = this.getColorForLevel(entry.level);
        const timestamp = new Date(entry.timestamp).toLocaleTimeString();
        
        console.error(`[${timestamp}] ${color(`${entry.level.toUpperCase()}:`)} ${entry.message}`);
        
        if (entry.context && Object.keys(entry.context).length > 0) {
            console.error('Context:', JSON.stringify(entry.context, null, 2));
        }
        
        if (entry.level === 'error' && entry.stack) {
            console.error('Stack:', entry.stack);
        }
    }
    
    getColorForLevel(level) {
        switch (level) {
            case 'error': return chalk.red;
            case 'warn': return chalk.yellow;
            case 'info': return chalk.blue;
            case 'debug': return chalk.gray;
            default: return chalk.white;
        }
    }
    
    mapSeverityToLevel(severity) {
        switch (severity) {
            case 'critical': return 'error';
            case 'error': return 'error';
            case 'warning': return 'warn';
            case 'info': return 'info';
            case 'debug': return 'debug';
            default: return 'error';
        }
    }
}
```

### User Error Communication
```javascript
class UserErrorPresenter {
    constructor(options = {}) {
        this.theme = options.theme || 'default';
        this.verboseMode = options.verboseMode || false;
        this.showSuggestions = options.showSuggestions !== false;
    }
    
    presentError(error, outputStream = process.stderr) {
        const presentation = this.formatErrorForUser(error);
        outputStream.write(presentation + '\n');
    }
    
    formatErrorForUser(error) {
        let output = '';
        
        // Error header
        const icon = this.getErrorIcon(error.severity);
        const color = this.getErrorColor(error.severity);
        
        output += color(`${icon} ${error.userMessage}\n`);
        
        // Error code (if verbose)
        if (this.verboseMode && error.code) {
            output += chalk.dim(`Code: ${error.code}\n`);
        }
        
        // Context information
        if (error.context && Object.keys(error.context).length > 0) {
            const relevantContext = this.extractRelevantContext(error.context);
            if (relevantContext.length > 0) {
                output += '\n' + chalk.dim('Details:\n');
                relevantContext.forEach(([key, value]) => {
                    output += chalk.dim(`  ${key}: ${value}\n`);
                });
            }
        }
        
        // Suggestions
        if (this.showSuggestions && error.suggestions && error.suggestions.length > 0) {
            output += '\n' + chalk.cyan('Suggestions:\n');
            error.suggestions.forEach((suggestion, index) => {
                output += chalk.cyan(`  ${index + 1}. ${suggestion}\n`);
            });
        }
        
        // Recovery options
        if (error.isRecoverable()) {
            output += '\n' + chalk.green('This error may be recoverable. Try running the command again.\n');
        }
        
        // Debug information (if verbose)
        if (this.verboseMode) {
            output += '\n' + chalk.dim('Debug Information:\n');
            output += chalk.dim(`  Timestamp: ${new Date(error.timestamp).toISOString()}\n`);
            output += chalk.dim(`  Category: ${error.category}\n`);
            
            if (error.stack) {
                output += '\n' + chalk.dim('Stack Trace:\n');
                output += chalk.dim(error.stack.split('\n').map(line => `  ${line}`).join('\n') + '\n');
            }
        }
        
        return output;
    }
    
    getErrorIcon(severity) {
        switch (severity) {
            case 'critical':
            case 'error':
                return '✖';
            case 'warning':
                return '⚠';
            case 'info':
                return 'ℹ';
            default:
                return '!';
        }
    }
    
    getErrorColor(severity) {
        switch (severity) {
            case 'critical':
            case 'error':
                return chalk.red;
            case 'warning':
                return chalk.yellow;
            case 'info':
                return chalk.blue;
            default:
                return chalk.white;
        }
    }
    
    extractRelevantContext(context) {
        const relevant = [];
        const importantKeys = ['file', 'path', 'url', 'command', 'tool', 'server'];
        
        for (const key of importantKeys) {
            if (context[key]) {
                relevant.push([key, context[key]]);
            }
        }
        
        return relevant;
    }
}
```

## React Error Boundaries

### UI Error Boundaries
```javascript
import React from 'react';
import { Box, Text } from 'ink';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        const claudeError = transformError(error, { errorInfo });
        
        // Log the error
        if (this.props.onError) {
            this.props.onError(claudeError);
        }
        
        // Report to error logger
        if (this.props.errorLogger) {
            this.props.errorLogger.logError(claudeError, { 
                component: this.constructor.name,
                errorInfo 
            });
        }
    }
    
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback(this.state.error);
            }
            
            return (
                <Box flexDirection="column" padding={1} borderStyle="round" borderColor="red">
                    <Text color="red" bold>Application Error</Text>
                    <Text color="red">{this.state.error.message}</Text>
                    {this.props.showStack && this.state.error.stack && (
                        <Box marginTop={1}>
                            <Text dimColor>Stack trace:</Text>
                            <Text dimColor>{this.state.error.stack}</Text>
                        </Box>
                    )}
                    <Box marginTop={1}>
                        <Text dimColor>Press Ctrl+C to exit</Text>
                    </Box>
                </Box>
            );
        }
        
        return this.props.children;
    }
}

// Usage
const App = () => {
    const handleError = (error) => {
        console.error('UI Error:', error);
    };
    
    return (
        <ErrorBoundary onError={handleError} showStack={process.env.NODE_ENV === 'development'}>
            <MainApplication />
        </ErrorBoundary>
    );
};
```

This error handling specification provides comprehensive coverage of Claude Code's error management system, ensuring robust error handling, recovery, and user communication throughout the application.