/**
 * Claude Code Error Types
 * 
 * Comprehensive error class hierarchy providing structured error handling
 * with categorization, severity levels, context tracking, and user-friendly messages.
 */

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

/**
 * Session-related errors
 */
class SessionError extends ClaudeCodeError {
    constructor(message, options = {}) {
        super(message, {
            ...options,
            category: 'session',
            code: options.code || 'SESSION_ERROR'
        });
    }
}

/**
 * CLI command errors
 */
class CommandError extends UserError {
    constructor(command, message, options = {}) {
        super(message, {
            ...options,
            code: 'COMMAND_ERROR',
            context: { ...options.context, command }
        });
        this.command = command;
    }
}

/**
 * Parsing errors
 */
class ParseError extends UserError {
    constructor(input, expectedFormat, options = {}) {
        const message = `Parse error: cannot parse '${input}' as ${expectedFormat}`;
        super(message, {
            ...options,
            code: 'PARSE_ERROR',
            context: { ...options.context, input, expectedFormat }
        });
        this.input = input;
        this.expectedFormat = expectedFormat;
    }
}

/**
 * Resource constraint errors (memory, disk, etc.)
 */
class ResourceError extends ClaudeCodeError {
    constructor(resourceType, limit, usage, options = {}) {
        const message = `${resourceType} limit exceeded: ${usage}/${limit}`;
        super(message, {
            ...options,
            category: 'resource',
            code: 'RESOURCE_LIMIT_EXCEEDED',
            context: { ...options.context, resourceType, limit, usage },
            suggestions: options.suggestions || [
                `Free up ${resourceType} space`,
                'Close unnecessary applications',
                'Consider increasing limits if possible'
            ]
        });
        this.resourceType = resourceType;
        this.limit = limit;
        this.usage = usage;
    }
}

/**
 * Dependency errors
 */
class DependencyError extends ClaudeCodeError {
    constructor(dependency, version, options = {}) {
        const message = `Missing or incompatible dependency: ${dependency}${version ? ` (${version})` : ''}`;
        super(message, {
            ...options,
            category: 'dependency',
            code: 'DEPENDENCY_ERROR',
            context: { ...options.context, dependency, version },
            suggestions: options.suggestions || [
                `Install ${dependency} if missing`,
                version ? `Ensure ${dependency} version is compatible with ${version}` : '',
                'Check your package manager or installation guide'
            ].filter(Boolean)
        });
        this.dependency = dependency;
        this.version = version;
    }
}

/**
 * Concurrency/race condition errors
 */
class ConcurrencyError extends ClaudeCodeError {
    constructor(operation, conflictType, options = {}) {
        const message = `Concurrency conflict: ${operation} (${conflictType})`;
        super(message, {
            ...options,
            category: 'concurrency',
            code: 'CONCURRENCY_ERROR',
            context: { ...options.context, operation, conflictType },
            recoverable: true,
            suggestions: options.suggestions || [
                'Try the operation again',
                'Wait for other operations to complete',
                'Use proper synchronization if available'
            ]
        });
        this.operation = operation;
        this.conflictType = conflictType;
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
    
    // Transform common Node.js error types
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

module.exports = {
    // Base classes
    ClaudeCodeError,
    UserError,
    
    // Domain-specific errors
    ConfigurationError,
    AuthenticationError,
    NetworkError,
    FileSystemError,
    MCPError,
    ValidationError,
    SessionError,
    CommandError,
    ParseError,
    
    // Specialized errors
    ToolExecutionError,
    PermissionError,
    NotFoundError,
    TimeoutError,
    RateLimitError,
    ResourceError,
    DependencyError,
    ConcurrencyError,
    
    // Utilities
    transformError
};