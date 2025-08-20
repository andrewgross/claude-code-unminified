/**
 * Retry Handler System
 * 
 * Provides intelligent retry logic for API requests, network operations,
 * and other potentially failing operations with exponential backoff.
 * 
 * Used throughout the codebase for handling transient failures gracefully.
 */

import { errorHandler, NetworkError, APIError } from './error-handler.js';

/**
 * Default retry configuration
 */
const DEFAULT_RETRY_CONFIG = {
    maxAttempts: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 30000, // 30 seconds
    exponentialBase: 2,
    jitter: true,
    retryCondition: null // Function to determine if error should be retried
};

/**
 * Retry with exponential backoff
 * 
 * @param {Function} operation - Operation to retry
 * @param {Object} config - Retry configuration
 * @returns {Promise} Result of the operation
 */
export async function withRetry(operation, config = {}) {
    const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
    let lastError;
    
    for (let attempt = 1; attempt <= finalConfig.maxAttempts; attempt++) {
        try {
            // If operation is a factory function, call it with attempt and config
            if (typeof operation === 'function' && operation.length > 0) {
                return await operation(attempt, finalConfig);
            }
            
            // Otherwise call it as a simple operation
            return await operation();
            
        } catch (error) {
            lastError = error;
            
            // Don't retry on the last attempt
            if (attempt === finalConfig.maxAttempts) {
                break;
            }
            
            // Check if error should be retried
            if (!shouldRetryError(error, finalConfig.retryCondition)) {
                throw error;
            }
            
            // Calculate delay with exponential backoff
            const delay = calculateDelay(attempt, finalConfig);
            
            console.log(`🔄 Retry attempt ${attempt}/${finalConfig.maxAttempts} after ${delay}ms delay (${error.message})`);
            
            // Wait before next attempt
            await sleep(delay);
        }
    }
    
    // All attempts failed
    throw lastError;
}

/**
 * Retry specifically for API client operations
 * 
 * @param {Function} clientFactory - Function that creates API client
 * @param {Function} operation - Operation to perform with client
 * @param {Object} config - Retry configuration
 * @returns {Promise} Result of the operation
 */
export async function withAPIRetry(clientFactory, operation, config = {}) {
    const apiConfig = {
        ...DEFAULT_RETRY_CONFIG,
        maxAttempts: 3,
        retryCondition: (error) => {
            // Retry on specific API errors
            if (error instanceof APIError) {
                return error.isRetryable;
            }
            
            // Retry on network errors
            if (error instanceof NetworkError) {
                return true;
            }
            
            // Check for specific error patterns
            const retryablePatterns = [
                /timeout/i,
                /network/i,
                /connection/i,
                /503/,
                /502/,
                /429/
            ];
            
            return retryablePatterns.some(pattern => 
                pattern.test(error.message) || 
                (error.code && pattern.test(error.code))
            );
        },
        ...config
    };
    
    return withRetry(async (attempt, retryConfig) => {
        // Create fresh client for each attempt
        const client = await clientFactory();
        
        try {
            return await operation(client, attempt, retryConfig);
        } catch (error) {
            // Add retry context to error
            error.retryAttempt = attempt;
            error.maxRetryAttempts = apiConfig.maxAttempts;
            throw error;
        }
    }, apiConfig);
}

/**
 * Retry with different strategies
 */
export class RetryStrategy {
    /**
     * Linear backoff strategy
     */
    static linear(baseDelay = 1000) {
        return (attempt) => baseDelay * attempt;
    }
    
    /**
     * Exponential backoff strategy
     */
    static exponential(baseDelay = 1000, multiplier = 2) {
        return (attempt) => baseDelay * Math.pow(multiplier, attempt - 1);
    }
    
    /**
     * Fixed delay strategy
     */
    static fixed(delay = 1000) {
        return () => delay;
    }
    
    /**
     * Custom delay with jitter
     */
    static withJitter(strategyFn) {
        return (attempt) => {
            const baseDelay = strategyFn(attempt);
            const jitter = Math.random() * baseDelay * 0.1; // 10% jitter
            return baseDelay + jitter;
        };
    }
}

/**
 * Specialized retry helper for different operation types
 */
export class RetryHelper {
    /**
     * Retry file system operations
     */
    static async fileSystem(operation, config = {}) {
        return withRetry(operation, {
            maxAttempts: 2,
            baseDelay: 100,
            retryCondition: (error) => {
                // Retry on common file system temporary errors
                const retryableCodes = ['EBUSY', 'ENOENT', 'EMFILE', 'ENFILE'];
                return retryableCodes.includes(error.code);
            },
            ...config
        });
    }
    
    /**
     * Retry network operations
     */
    static async network(operation, config = {}) {
        return withRetry(operation, {
            maxAttempts: 4,
            baseDelay: 1000,
            maxDelay: 10000,
            retryCondition: (error) => {
                if (error instanceof NetworkError) return true;
                
                const networkErrorPatterns = [
                    /ECONNRESET/,
                    /ECONNREFUSED/,
                    /ETIMEDOUT/,
                    /EHOSTUNREACH/,
                    /ENOTFOUND/
                ];
                
                return networkErrorPatterns.some(pattern => 
                    pattern.test(error.code || error.message)
                );
            },
            ...config
        });
    }
    
    /**
     * Retry MCP operations
     */
    static async mcp(operation, config = {}) {
        return withRetry(operation, {
            maxAttempts: 3,
            baseDelay: 2000,
            retryCondition: (error) => {
                // Retry on MCP connection errors but not protocol errors
                const retryableMessages = [
                    'connection',
                    'timeout',
                    'transport'
                ];
                
                return retryableMessages.some(msg => 
                    error.message.toLowerCase().includes(msg)
                );
            },
            ...config
        });
    }
}

/**
 * Circuit breaker pattern for repeated failures
 */
export class CircuitBreaker {
    constructor(options = {}) {
        this.failureThreshold = options.failureThreshold || 5;
        this.resetTimeout = options.resetTimeout || 60000; // 1 minute
        this.monitoringPeriod = options.monitoringPeriod || 300000; // 5 minutes
        
        this.state = 'closed'; // closed, open, half-open
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.nextAttemptTime = null;
    }
    
    async call(operation) {
        if (this.state === 'open') {
            if (Date.now() < this.nextAttemptTime) {
                throw new Error(`Circuit breaker is open. Next attempt allowed at ${new Date(this.nextAttemptTime)}`);
            }
            this.state = 'half-open';
        }
        
        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'closed';
        this.nextAttemptTime = null;
    }
    
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.failureThreshold) {
            this.state = 'open';
            this.nextAttemptTime = Date.now() + this.resetTimeout;
        }
    }
    
    getStatus() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            lastFailureTime: this.lastFailureTime,
            nextAttemptTime: this.nextAttemptTime
        };
    }
}

// Helper functions

/**
 * Determine if an error should be retried
 * 
 * @param {Error} error - Error to check
 * @param {Function} customCondition - Custom retry condition
 * @returns {boolean} Whether to retry
 */
function shouldRetryError(error, customCondition) {
    // Use custom condition if provided
    if (customCondition && typeof customCondition === 'function') {
        return customCondition(error);
    }
    
    // Use default retry logic from error handler
    return errorHandler.isRetryableError(error);
}

/**
 * Calculate delay with exponential backoff and jitter
 * 
 * @param {number} attempt - Current attempt number
 * @param {Object} config - Retry configuration
 * @returns {number} Delay in milliseconds
 */
function calculateDelay(attempt, config) {
    let delay = config.baseDelay * Math.pow(config.exponentialBase, attempt - 1);
    
    // Apply maximum delay limit
    delay = Math.min(delay, config.maxDelay);
    
    // Apply jitter if enabled
    if (config.jitter) {
        const jitter = delay * 0.1 * Math.random(); // Up to 10% jitter
        delay += jitter;
    }
    
    return Math.floor(delay);
}

/**
 * Sleep for specified milliseconds
 * 
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create a timeout promise that rejects after specified time
 * 
 * @param {number} ms - Timeout in milliseconds
 * @param {string} message - Timeout error message
 * @returns {Promise} Promise that rejects after timeout
 */
export function createTimeout(ms, message = 'Operation timed out') {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new NetworkError(message, null, true)), ms);
    });
}

/**
 * Race an operation against a timeout
 * 
 * @param {Promise} operation - Operation to execute
 * @param {number} timeoutMs - Timeout in milliseconds
 * @param {string} timeoutMessage - Timeout error message
 * @returns {Promise} Result of operation or timeout error
 */
export async function withTimeout(operation, timeoutMs, timeoutMessage = 'Operation timed out') {
    return Promise.race([
        operation,
        createTimeout(timeoutMs, timeoutMessage)
    ]);
}