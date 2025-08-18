/**
 * Claude Code Error Handler
 * 
 * Centralized error handling system providing standardized error processing,
 * transformation, logging, and response generation.
 */

const { EventEmitter } = require('events');
const { transformError } = require('./error-types');

/**
 * Standardized error handling wrapper for async operations
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
 * Standardized error handling wrapper for sync operations
 */
function handleSyncOperation(operation, context = {}, errorHandlers = {}) {
    try {
        return operation();
    } catch (error) {
        // Transform known error types
        const handledError = transformError(error, context);
        
        // Apply specific error handlers (sync only)
        if (errorHandlers[handledError.constructor.name]) {
            const handler = errorHandlers[handledError.constructor.name];
            if (typeof handler === 'function') {
                return handler(handledError);
            }
        }
        
        if (errorHandlers[handledError.code]) {
            const handler = errorHandlers[handledError.code];
            if (typeof handler === 'function') {
                return handler(handledError);
            }
        }
        
        if (errorHandlers.default) {
            const handler = errorHandlers.default;
            if (typeof handler === 'function') {
                return handler(handledError);
            }
        }
        
        throw handledError;
    }
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
        retryCondition = (error) => error.isRecoverable?.() || error.code === 'NETWORK_ERROR',
        onRetry = null
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
            
            if (onRetry) {
                await onRetry(lastError, attempt, delay);
            }
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError;
}

/**
 * Circuit breaker pattern for error handling
 */
class CircuitBreaker extends EventEmitter {
    constructor(operation, options = {}) {
        super();
        
        this.operation = operation;
        this.options = {
            failureThreshold: options.failureThreshold || 5,
            resetTimeout: options.resetTimeout || 60000,
            monitoringPeriod: options.monitoringPeriod || 10000,
            ...options
        };
        
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.failures = 0;
        this.nextAttempt = Date.now();
        this.stats = {
            total: 0,
            failures: 0,
            successes: 0,
            timeouts: 0,
            rejected: 0
        };
    }
    
    async execute(...args) {
        this.stats.total++;
        
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                this.stats.rejected++;
                const error = new Error('Circuit breaker is OPEN');
                error.code = 'CIRCUIT_BREAKER_OPEN';
                throw transformError(error);
            }
            
            this.state = 'HALF_OPEN';
            this.emit('halfOpen');
        }
        
        try {
            const result = await this.operation(...args);
            
            if (this.state === 'HALF_OPEN') {
                this.state = 'CLOSED';
                this.failures = 0;
                this.emit('closed');
            }
            
            this.stats.successes++;
            return result;
            
        } catch (error) {
            this.failures++;
            this.stats.failures++;
            
            const transformedError = transformError(error);
            
            if (this.failures >= this.options.failureThreshold) {
                this.state = 'OPEN';
                this.nextAttempt = Date.now() + this.options.resetTimeout;
                this.emit('opened', transformedError);
            }
            
            throw transformedError;
        }
    }
    
    getStats() {
        return {
            ...this.stats,
            state: this.state,
            failures: this.failures,
            nextAttempt: this.nextAttempt,
            failureRate: this.stats.total > 0 ? this.stats.failures / this.stats.total : 0
        };
    }
    
    reset() {
        this.state = 'CLOSED';
        this.failures = 0;
        this.nextAttempt = Date.now();
        this.emit('reset');
    }
}

/**
 * Global error handler for unhandled errors
 */
class GlobalErrorHandler extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            exitOnError: options.exitOnError !== false,
            logErrors: options.logErrors !== false,
            errorLogger: options.errorLogger,
            errorReporter: options.errorReporter,
            ...options
        };
        
        this.setupHandlers();
    }
    
    setupHandlers() {
        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            this.handleUncaughtException(error);
        });
        
        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
            this.handleUnhandledRejection(reason, promise);
        });
        
        // Handle process warnings
        process.on('warning', (warning) => {
            this.handleWarning(warning);
        });
    }
    
    handleUncaughtException(error) {
        const transformedError = transformError(error, { 
            type: 'uncaughtException',
            timestamp: Date.now()
        });
        
        this.emit('uncaughtException', transformedError);
        
        if (this.options.logErrors && this.options.errorLogger) {
            this.options.errorLogger.logError(transformedError, { 
                fatal: true,
                source: 'uncaughtException'
            });
        }
        
        if (this.options.errorReporter) {
            this.options.errorReporter.reportError(transformedError, { 
                fatal: true,
                source: 'uncaughtException'
            });
        }
        
        console.error('Uncaught Exception:', transformedError.message);
        console.error(transformedError.stack);
        
        if (this.options.exitOnError) {
            process.exit(1);
        }
    }
    
    handleUnhandledRejection(reason, promise) {
        const error = reason instanceof Error ? reason : new Error(String(reason));
        const transformedError = transformError(error, { 
            type: 'unhandledRejection',
            promise: promise.toString(),
            timestamp: Date.now()
        });
        
        this.emit('unhandledRejection', transformedError, promise);
        
        if (this.options.logErrors && this.options.errorLogger) {
            this.options.errorLogger.logError(transformedError, { 
                source: 'unhandledRejection'
            });
        }
        
        if (this.options.errorReporter) {
            this.options.errorReporter.reportError(transformedError, { 
                source: 'unhandledRejection'
            });
        }
        
        console.error('Unhandled Promise Rejection:', transformedError.message);
        console.error(transformedError.stack);
    }
    
    handleWarning(warning) {
        this.emit('warning', warning);
        
        if (this.options.logErrors && this.options.errorLogger) {
            this.options.errorLogger.logError(transformError(new Error(warning.message), {
                type: 'warning',
                name: warning.name,
                code: warning.code
            }), { 
                source: 'processWarning',
                severity: 'warning'
            });
        }
    }
}

/**
 * Error aggregator for collecting and batching errors
 */
class ErrorAggregator extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            batchSize: options.batchSize || 10,
            flushInterval: options.flushInterval || 30000,
            maxRetries: options.maxRetries || 3,
            ...options
        };
        
        this.errors = [];
        this.flushTimer = null;
        this.setupFlushTimer();
    }
    
    add(error, context = {}) {
        const transformedError = transformError(error, context);
        
        this.errors.push({
            error: transformedError,
            context: context,
            timestamp: Date.now()
        });
        
        this.emit('errorAdded', transformedError, context);
        
        if (this.errors.length >= this.options.batchSize) {
            this.flush();
        }
    }
    
    async flush() {
        if (this.errors.length === 0) return;
        
        const errorsToFlush = [...this.errors];
        this.errors = [];
        
        this.emit('beforeFlush', errorsToFlush);
        
        try {
            await this.processErrorBatch(errorsToFlush);
            this.emit('afterFlush', errorsToFlush);
        } catch (flushError) {
            // Put errors back if flush fails
            this.errors.unshift(...errorsToFlush);
            this.emit('flushError', transformError(flushError), errorsToFlush);
        }
    }
    
    async processErrorBatch(errors) {
        // Override in subclasses to implement specific batching logic
        for (const errorEntry of errors) {
            this.emit('processError', errorEntry.error, errorEntry.context);
        }
    }
    
    setupFlushTimer() {
        if (this.flushTimer) {
            clearInterval(this.flushTimer);
        }
        
        this.flushTimer = setInterval(() => {
            this.flush();
        }, this.options.flushInterval);
    }
    
    destroy() {
        if (this.flushTimer) {
            clearInterval(this.flushTimer);
            this.flushTimer = null;
        }
        
        // Flush remaining errors
        this.flush();
    }
}

module.exports = {
    handleAsyncOperation,
    handleSyncOperation,
    retryOperation,
    CircuitBreaker,
    GlobalErrorHandler,
    ErrorAggregator
};