/**
 * Claude Code Error Handling System
 * 
 * Comprehensive error handling system providing structured error types,
 * centralized error handling, recovery strategies, logging, and user-friendly presentation.
 * 
 * @example
 * ```javascript
 * const { 
 *   ClaudeCodeError, 
 *   NetworkError, 
 *   handleAsyncOperation, 
 *   ErrorRecoveryManager,
 *   ErrorLogger,
 *   UserErrorPresenter 
 * } = require('./src/errors');
 * 
 * // Create a network error
 * const error = new NetworkError('Connection failed', {
 *   code: 'ECONNREFUSED',
 *   suggestions: ['Check your internet connection', 'Verify the server is running']
 * });
 * 
 * // Handle operations with error recovery
 * await handleAsyncOperation(
 *   async () => makeApiCall(),
 *   { retryOnNetworkError: true },
 *   {
 *     NetworkError: async (error) => {
 *       console.log('Network error occurred, retrying...');
 *       await new Promise(resolve => setTimeout(resolve, 1000));
 *       return retryOperation();
 *     }
 *   }
 * );
 * 
 * // Present errors to users
 * const presenter = new UserErrorPresenter();
 * presenter.presentError(error);
 * ```
 */

// Import all error types
const {
    ClaudeCodeError,
    UserError,
    ConfigurationError,
    AuthenticationError,
    NetworkError,
    FileSystemError,
    MCPError,
    ValidationError,
    SessionError,
    CommandError,
    ParseError,
    ToolExecutionError,
    PermissionError,
    NotFoundError,
    TimeoutError,
    RateLimitError,
    ResourceError,
    DependencyError,
    ConcurrencyError,
    transformError
} = require('./error-types');

// Import error handlers
const {
    handleAsyncOperation,
    handleSyncOperation,
    retryOperation,
    CircuitBreaker,
    GlobalErrorHandler,
    ErrorAggregator
} = require('./error-handler');

// Import recovery manager
const {
    ErrorRecoveryManager,
    authRecoveryStrategy,
    networkRecoveryStrategy,
    fileSystemRecoveryStrategy,
    timeoutRecoveryStrategy,
    notFoundRecoveryStrategy
} = require('./recovery-manager');

// Import error reporter
const {
    ErrorLogger,
    ConsoleLogger,
    FileLogger,
    RemoteLogger,
    ErrorAnalytics
} = require('./error-reporter');

// Import user presenter
const {
    UserErrorPresenter,
    UIErrorPresenter,
    InteractiveErrorHandler
} = require('./user-presenter');

/**
 * Default error handling system instance
 * Provides a ready-to-use error handling setup with common configurations.
 */
class DefaultErrorSystem {
    constructor(options = {}) {
        this.options = {
            enableGlobalHandler: options.enableGlobalHandler !== false,
            enableRecovery: options.enableRecovery !== false,
            enableLogging: options.enableLogging !== false,
            enableAnalytics: options.enableAnalytics !== false,
            logLevel: options.logLevel || 'error',
            verboseMode: options.verboseMode || false,
            ...options
        };
        
        this.setupComponents();
    }
    
    setupComponents() {
        // Error logger
        if (this.options.enableLogging) {
            this.logger = new ErrorLogger({
                logLevel: this.options.logLevel,
                enableConsole: true,
                enableFile: this.options.logToFile,
                logFilePath: this.options.logFilePath,
                sensitiveFields: this.options.sensitiveFields
            });
        }
        
        // Error analytics
        if (this.options.enableAnalytics) {
            this.analytics = new ErrorAnalytics({
                retentionPeriod: this.options.analyticsRetentionPeriod
            });
        }
        
        // Recovery manager
        if (this.options.enableRecovery) {
            this.recoveryManager = new ErrorRecoveryManager({
                maxRecoveryAttempts: this.options.maxRecoveryAttempts,
                recoveryTimeout: this.options.recoveryTimeout
            });
        }
        
        // User presenter
        this.presenter = new UserErrorPresenter({
            verboseMode: this.options.verboseMode,
            useColors: this.options.useColors,
            showSuggestions: this.options.showSuggestions
        });
        
        // Global error handler
        if (this.options.enableGlobalHandler) {
            this.globalHandler = new GlobalErrorHandler({
                errorLogger: this.logger,
                exitOnError: this.options.exitOnError
            });
            
            this.globalHandler.on('uncaughtException', (error) => {
                this.handleUncaughtError(error);
            });
            
            this.globalHandler.on('unhandledRejection', (error) => {
                this.handleUncaughtError(error);
            });
        }
    }
    
    async handleError(error, context = {}) {
        // Transform error if needed
        const transformedError = error instanceof ClaudeCodeError ? error : transformError(error, context);
        
        // Log error
        if (this.logger) {
            await this.logger.logError(transformedError, context);
        }
        
        // Record for analytics
        if (this.analytics) {
            this.analytics.recordError(transformedError, context);
        }
        
        // Attempt recovery
        let recoveryResult = null;
        if (this.recoveryManager && transformedError.isRecoverable()) {
            recoveryResult = await this.recoveryManager.attemptRecovery(transformedError, context);
        }
        
        // Present to user
        if (!recoveryResult || !recoveryResult.success) {
            this.presenter.presentError(transformedError);
        }
        
        return {
            error: transformedError,
            recovery: recoveryResult,
            handled: true
        };
    }
    
    async handleUncaughtError(error) {
        console.error('\n💥 Uncaught Error - This should not happen!\n');
        
        try {
            await this.handleError(error, { source: 'uncaught', fatal: true });
        } catch (handlerError) {
            console.error('Error handler failed:', handlerError.message);
            console.error('Original error:', error.message);
            console.error(error.stack);
        }
    }
    
    createHandler(defaultContext = {}) {
        return async (operation, context = {}) => {
            return await handleAsyncOperation(
                operation,
                { ...defaultContext, ...context },
                {
                    default: async (error) => {
                        const result = await this.handleError(error, context);
                        
                        if (result.recovery && result.recovery.success) {
                            // Recovery succeeded, potentially retry operation
                            if (result.recovery.action === 'retry') {
                                return await operation();
                            }
                        }
                        
                        throw error;
                    }
                }
            );
        };
    }
    
    getStats() {
        const stats = {
            system: {
                enabledFeatures: {
                    logging: !!this.logger,
                    analytics: !!this.analytics,
                    recovery: !!this.recoveryManager,
                    globalHandler: !!this.globalHandler
                }
            }
        };
        
        if (this.analytics) {
            stats.analytics = this.analytics.generateReport();
        }
        
        if (this.recoveryManager) {
            stats.recovery = this.recoveryManager.getRecoveryStats();
        }
        
        return stats;
    }
}

/**
 * Create a default error system instance
 */
function createErrorSystem(options = {}) {
    return new DefaultErrorSystem(options);
}

/**
 * Convenience function for handling async operations with error recovery
 */
async function withErrorHandling(operation, context = {}, options = {}) {
    const errorSystem = options.errorSystem || createErrorSystem(options);
    const handler = errorSystem.createHandler(context);
    return await handler(operation, context);
}

/**
 * Convenience function for creating and throwing specific error types
 */
function createError(type, message, options = {}) {
    const errorTypes = {
        network: NetworkError,
        auth: AuthenticationError,
        filesystem: FileSystemError,
        validation: ValidationError,
        notfound: NotFoundError,
        permission: PermissionError,
        timeout: TimeoutError,
        config: ConfigurationError,
        mcp: MCPError,
        session: SessionError,
        command: CommandError,
        parse: ParseError,
        resource: ResourceError,
        dependency: DependencyError
    };
    
    const ErrorClass = errorTypes[type] || ClaudeCodeError;
    return new ErrorClass(message, options);
}

// Export everything
module.exports = {
    // Error types
    ClaudeCodeError,
    UserError,
    ConfigurationError,
    AuthenticationError,
    NetworkError,
    FileSystemError,
    MCPError,
    ValidationError,
    SessionError,
    CommandError,
    ParseError,
    ToolExecutionError,
    PermissionError,
    NotFoundError,
    TimeoutError,
    RateLimitError,
    ResourceError,
    DependencyError,
    ConcurrencyError,
    
    // Error handlers
    handleAsyncOperation,
    handleSyncOperation,
    retryOperation,
    CircuitBreaker,
    GlobalErrorHandler,
    ErrorAggregator,
    
    // Recovery system
    ErrorRecoveryManager,
    authRecoveryStrategy,
    networkRecoveryStrategy,
    fileSystemRecoveryStrategy,
    timeoutRecoveryStrategy,
    notFoundRecoveryStrategy,
    
    // Reporting and logging
    ErrorLogger,
    ConsoleLogger,
    FileLogger,
    RemoteLogger,
    ErrorAnalytics,
    
    // User presentation
    UserErrorPresenter,
    UIErrorPresenter,
    InteractiveErrorHandler,
    
    // Utilities
    transformError,
    createError,
    createErrorSystem,
    withErrorHandling,
    
    // Default system
    DefaultErrorSystem
};