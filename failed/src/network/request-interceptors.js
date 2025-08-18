/**
 * Request Interceptors Module
 * 
 * Provides a comprehensive middleware system for intercepting and modifying
 * network requests and responses. Supports authentication, logging, caching,
 * rate limiting, and custom transformations.
 */

const EventEmitter = require('events');

/**
 * Interceptor Types
 */
const InterceptorType = {
    REQUEST: 'request',
    RESPONSE: 'response',
    ERROR: 'error'
};

/**
 * Interceptor Phases
 */
const InterceptorPhase = {
    PRE: 'pre',      // Before processing
    MAIN: 'main',    // During processing
    POST: 'post'     // After processing
};

/**
 * Base Interceptor Class
 * All interceptors should extend this class
 */
class BaseInterceptor {
    constructor(options = {}) {
        this.name = options.name || this.constructor.name;
        this.enabled = options.enabled !== false;
        this.priority = options.priority || 0;
        this.phase = options.phase || InterceptorPhase.MAIN;
        this.conditions = options.conditions || [];
        this.options = options;
    }

    /**
     * Checks if the interceptor should be applied to the request
     * @param {Object} context - Request context
     * @returns {boolean} True if interceptor should be applied
     */
    shouldApply(context) {
        if (!this.enabled) {
            return false;
        }

        if (this.conditions.length === 0) {
            return true;
        }

        return this.conditions.every(condition => {
            if (typeof condition === 'function') {
                return condition(context);
            }
            if (typeof condition === 'object') {
                return this._matchCondition(context, condition);
            }
            return true;
        });
    }

    /**
     * Matches a condition against the context
     * @param {Object} context - Request context
     * @param {Object} condition - Condition to match
     * @returns {boolean} True if condition matches
     */
    _matchCondition(context, condition) {
        for (const [key, value] of Object.entries(condition)) {
            const contextValue = this._getNestedValue(context, key);
            
            if (Array.isArray(value)) {
                if (!value.includes(contextValue)) {
                    return false;
                }
            } else if (value instanceof RegExp) {
                if (!value.test(contextValue)) {
                    return false;
                }
            } else if (contextValue !== value) {
                return false;
            }
        }
        return true;
    }

    /**
     * Gets nested value from object using dot notation
     * @param {Object} obj - Object to search
     * @param {string} path - Dot notation path
     * @returns {*} Value or undefined
     */
    _getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    /**
     * Processes the request/response (must be implemented by subclasses)
     * @param {Object} context - Request context
     * @returns {Promise<Object>} Modified context
     */
    async process(context) {
        throw new Error('process() must be implemented by interceptor');
    }

    /**
     * Handles errors during processing
     * @param {Error} error - Error that occurred
     * @param {Object} context - Request context
     * @returns {Promise<Object>} Modified context or rethrows error
     */
    async handleError(error, context) {
        throw error; // Default behavior - rethrow error
    }
}

/**
 * Request Interceptor Manager
 * Manages and executes interceptors in the correct order
 */
class RequestInterceptorManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            enableBuiltins: options.enableBuiltins !== false,
            maxProcessingTime: options.maxProcessingTime || 30000,
            errorHandling: options.errorHandling || 'continue', // 'continue', 'stop', 'retry'
            retryAttempts: options.retryAttempts || 3,
            retryDelay: options.retryDelay || 1000,
            ...options
        };

        this.interceptors = {
            [InterceptorType.REQUEST]: new Map(),
            [InterceptorType.RESPONSE]: new Map(),
            [InterceptorType.ERROR]: new Map()
        };

        this.stats = {
            totalRequests: 0,
            interceptedRequests: 0,
            failedInterceptions: 0,
            avgProcessingTime: 0,
            interceptorStats: new Map()
        };

        if (this.options.enableBuiltins) {
            this._registerBuiltinInterceptors();
        }

        this.emit('initialized');
    }

    /**
     * Registers an interceptor
     * @param {string} type - Interceptor type (request, response, error)
     * @param {BaseInterceptor} interceptor - Interceptor instance
     * @returns {string} Interceptor ID
     */
    register(type, interceptor) {
        if (!Object.values(InterceptorType).includes(type)) {
            throw new Error(`Invalid interceptor type: ${type}`);
        }

        if (!(interceptor instanceof BaseInterceptor)) {
            throw new Error('Interceptor must extend BaseInterceptor');
        }

        const interceptorId = `${type}_${interceptor.name}_${Date.now()}`;
        this.interceptors[type].set(interceptorId, interceptor);
        
        this.stats.interceptorStats.set(interceptorId, {
            executions: 0,
            successes: 0,
            failures: 0,
            avgExecutionTime: 0,
            totalExecutionTime: 0
        });

        this.emit('interceptorRegistered', { type, interceptorId, interceptor });
        return interceptorId;
    }

    /**
     * Unregisters an interceptor
     * @param {string} interceptorId - Interceptor ID
     * @returns {boolean} True if interceptor was removed
     */
    unregister(interceptorId) {
        for (const [type, interceptors] of Object.entries(this.interceptors)) {
            if (interceptors.has(interceptorId)) {
                interceptors.delete(interceptorId);
                this.stats.interceptorStats.delete(interceptorId);
                this.emit('interceptorUnregistered', { type, interceptorId });
                return true;
            }
        }
        return false;
    }

    /**
     * Processes request through request interceptors
     * @param {Object} context - Request context
     * @returns {Promise<Object>} Modified context
     */
    async processRequest(context) {
        const enhancedContext = {
            ...context,
            timestamp: Date.now(),
            requestId: this._generateRequestId(),
            intercepted: false,
            interceptorResults: []
        };

        this.stats.totalRequests++;
        this.emit('requestProcessingStarted', { requestId: enhancedContext.requestId });

        try {
            const result = await this._executeInterceptors(
                InterceptorType.REQUEST, 
                enhancedContext
            );

            if (result.intercepted) {
                this.stats.interceptedRequests++;
            }

            this.emit('requestProcessingCompleted', { 
                requestId: enhancedContext.requestId,
                intercepted: result.intercepted 
            });

            return result;

        } catch (error) {
            this.stats.failedInterceptions++;
            this.emit('requestProcessingFailed', { 
                requestId: enhancedContext.requestId, 
                error 
            });
            throw error;
        }
    }

    /**
     * Processes response through response interceptors
     * @param {Object} context - Response context (includes request context and response)
     * @returns {Promise<Object>} Modified context
     */
    async processResponse(context) {
        this.emit('responseProcessingStarted', { requestId: context.requestId });

        try {
            const result = await this._executeInterceptors(
                InterceptorType.RESPONSE, 
                context
            );

            this.emit('responseProcessingCompleted', { 
                requestId: context.requestId,
                intercepted: result.intercepted 
            });

            return result;

        } catch (error) {
            this.emit('responseProcessingFailed', { 
                requestId: context.requestId, 
                error 
            });
            throw error;
        }
    }

    /**
     * Processes error through error interceptors
     * @param {Error} error - Error that occurred
     * @param {Object} context - Request/response context
     * @returns {Promise<Object>} Modified context or handled error
     */
    async processError(error, context) {
        const errorContext = {
            ...context,
            error,
            errorTimestamp: Date.now()
        };

        this.emit('errorProcessingStarted', { 
            requestId: context.requestId, 
            error: error.message 
        });

        try {
            const result = await this._executeInterceptors(
                InterceptorType.ERROR, 
                errorContext
            );

            this.emit('errorProcessingCompleted', { 
                requestId: context.requestId,
                handled: result.errorHandled 
            });

            return result;

        } catch (processingError) {
            this.emit('errorProcessingFailed', { 
                requestId: context.requestId, 
                originalError: error,
                processingError 
            });
            throw processingError;
        }
    }

    /**
     * Executes interceptors of a specific type
     * @param {string} type - Interceptor type
     * @param {Object} context - Context to process
     * @returns {Promise<Object>} Modified context
     */
    async _executeInterceptors(type, context) {
        const interceptors = Array.from(this.interceptors[type].values())
            .filter(interceptor => interceptor.shouldApply(context))
            .sort((a, b) => b.priority - a.priority); // Higher priority first

        let currentContext = { ...context };
        const startTime = Date.now();

        for (const interceptor of interceptors) {
            try {
                const interceptorStartTime = Date.now();
                
                currentContext = await this._executeWithTimeout(
                    interceptor.process(currentContext),
                    this.options.maxProcessingTime
                );

                const executionTime = Date.now() - interceptorStartTime;
                this._updateInterceptorStats(interceptor, true, executionTime);
                
                currentContext.intercepted = true;
                currentContext.interceptorResults.push({
                    name: interceptor.name,
                    phase: interceptor.phase,
                    executionTime,
                    success: true
                });

                this.emit('interceptorExecuted', {
                    type,
                    interceptorName: interceptor.name,
                    executionTime,
                    success: true
                });

            } catch (error) {
                this._updateInterceptorStats(interceptor, false, 0);
                
                currentContext.interceptorResults.push({
                    name: interceptor.name,
                    phase: interceptor.phase,
                    success: false,
                    error: error.message
                });

                this.emit('interceptorFailed', {
                    type,
                    interceptorName: interceptor.name,
                    error: error.message
                });

                // Handle error based on configuration
                if (this.options.errorHandling === 'stop') {
                    throw error;
                } else if (this.options.errorHandling === 'retry') {
                    // Implement retry logic if needed
                    currentContext = await this._retryInterceptor(interceptor, currentContext);
                }
                // 'continue' - just continue to next interceptor
            }
        }

        const totalTime = Date.now() - startTime;
        this._updateGlobalStats(totalTime);

        return currentContext;
    }

    /**
     * Executes a promise with timeout
     * @param {Promise} promise - Promise to execute
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise} Promise with timeout
     */
    async _executeWithTimeout(promise, timeout) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`Interceptor execution timeout after ${timeout}ms`));
            }, timeout);
        });

        return Promise.race([promise, timeoutPromise]);
    }

    /**
     * Retries interceptor execution
     * @param {BaseInterceptor} interceptor - Interceptor to retry
     * @param {Object} context - Context to process
     * @returns {Promise<Object>} Modified context
     */
    async _retryInterceptor(interceptor, context) {
        let lastError;
        
        for (let attempt = 0; attempt < this.options.retryAttempts; attempt++) {
            try {
                await new Promise(resolve => 
                    setTimeout(resolve, this.options.retryDelay * Math.pow(2, attempt))
                );
                
                return await interceptor.process(context);
                
            } catch (error) {
                lastError = error;
                this.emit('interceptorRetry', {
                    interceptorName: interceptor.name,
                    attempt: attempt + 1,
                    error: error.message
                });
            }
        }
        
        throw lastError;
    }

    /**
     * Updates interceptor statistics
     * @param {BaseInterceptor} interceptor - Interceptor instance
     * @param {boolean} success - Whether execution was successful
     * @param {number} executionTime - Execution time in milliseconds
     */
    _updateInterceptorStats(interceptor, success, executionTime) {
        const interceptorId = Array.from(this.interceptors[InterceptorType.REQUEST].entries())
            .find(([_, i]) => i === interceptor)?.[0] ||
            Array.from(this.interceptors[InterceptorType.RESPONSE].entries())
            .find(([_, i]) => i === interceptor)?.[0] ||
            Array.from(this.interceptors[InterceptorType.ERROR].entries())
            .find(([_, i]) => i === interceptor)?.[0];

        if (!interceptorId) return;

        const stats = this.stats.interceptorStats.get(interceptorId);
        if (!stats) return;

        stats.executions++;
        if (success) {
            stats.successes++;
            stats.totalExecutionTime += executionTime;
            stats.avgExecutionTime = stats.totalExecutionTime / stats.successes;
        } else {
            stats.failures++;
        }
    }

    /**
     * Updates global statistics
     * @param {number} processingTime - Total processing time
     */
    _updateGlobalStats(processingTime) {
        const totalTime = this.stats.avgProcessingTime * (this.stats.totalRequests - 1) + processingTime;
        this.stats.avgProcessingTime = totalTime / this.stats.totalRequests;
    }

    /**
     * Registers built-in interceptors
     */
    _registerBuiltinInterceptors() {
        // Authentication interceptor
        this.register(InterceptorType.REQUEST, new AuthenticationInterceptor({
            name: 'Authentication',
            priority: 100
        }));

        // Logging interceptor
        this.register(InterceptorType.REQUEST, new LoggingInterceptor({
            name: 'RequestLogging',
            priority: 50
        }));

        this.register(InterceptorType.RESPONSE, new LoggingInterceptor({
            name: 'ResponseLogging',
            priority: 50
        }));

        // Cache interceptor
        this.register(InterceptorType.REQUEST, new CacheInterceptor({
            name: 'RequestCache',
            priority: 90
        }));

        this.register(InterceptorType.RESPONSE, new CacheInterceptor({
            name: 'ResponseCache',
            priority: 90
        }));

        // Rate limiting interceptor
        this.register(InterceptorType.REQUEST, new RateLimitInterceptor({
            name: 'RateLimit',
            priority: 80
        }));

        // Retry interceptor
        this.register(InterceptorType.ERROR, new RetryInterceptor({
            name: 'Retry',
            priority: 100
        }));
    }

    /**
     * Generates unique request ID
     * @returns {string} Unique request ID
     */
    _generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }

    /**
     * Gets manager statistics
     * @returns {Object} Manager statistics
     */
    getStats() {
        const interceptorStats = {};
        for (const [id, stats] of this.stats.interceptorStats.entries()) {
            interceptorStats[id] = { ...stats };
        }

        return {
            ...this.stats,
            interceptorStats,
            registeredInterceptors: {
                request: this.interceptors[InterceptorType.REQUEST].size,
                response: this.interceptors[InterceptorType.RESPONSE].size,
                error: this.interceptors[InterceptorType.ERROR].size
            }
        };
    }

    /**
     * Resets statistics
     */
    resetStats() {
        this.stats = {
            totalRequests: 0,
            interceptedRequests: 0,
            failedInterceptions: 0,
            avgProcessingTime: 0,
            interceptorStats: new Map()
        };

        // Reset individual interceptor stats
        for (const [id] of this.stats.interceptorStats.entries()) {
            this.stats.interceptorStats.set(id, {
                executions: 0,
                successes: 0,
                failures: 0,
                avgExecutionTime: 0,
                totalExecutionTime: 0
            });
        }
    }
}

/**
 * Built-in Interceptors
 */

/**
 * Authentication Interceptor
 * Adds authentication headers to requests
 */
class AuthenticationInterceptor extends BaseInterceptor {
    constructor(options = {}) {
        super(options);
        this.authTokens = new Map();
        this.authProviders = new Map();
    }

    async process(context) {
        const { url, headers = {} } = context;
        
        // Skip if already has authorization
        if (headers.authorization || headers.Authorization) {
            return context;
        }

        // Try to get auth token for the URL
        const authToken = await this._getAuthToken(url);
        if (authToken) {
            return {
                ...context,
                headers: {
                    ...headers,
                    Authorization: `Bearer ${authToken}`
                }
            };
        }

        return context;
    }

    async _getAuthToken(url) {
        // Simple token retrieval - could be enhanced with OAuth, JWT, etc.
        const domain = new URL(url).hostname;
        return this.authTokens.get(domain);
    }

    setAuthToken(domain, token) {
        this.authTokens.set(domain, token);
    }
}

/**
 * Logging Interceptor
 * Logs request and response information
 */
class LoggingInterceptor extends BaseInterceptor {
    constructor(options = {}) {
        super(options);
        this.logLevel = options.logLevel || 'info';
        this.maxBodyLength = options.maxBodyLength || 1000;
    }

    async process(context) {
        if (context.error) {
            this._logError(context);
        } else if (context.response) {
            this._logResponse(context);
        } else {
            this._logRequest(context);
        }

        return context;
    }

    _logRequest(context) {
        const { requestId, method = 'GET', url, headers, body } = context;
        
        console.log(`[${this.logLevel.toUpperCase()}] Request ${requestId}:`, {
            method,
            url,
            headers: this._sanitizeHeaders(headers),
            bodyLength: body ? this._getBodyLength(body) : 0,
            body: this._truncateBody(body)
        });
    }

    _logResponse(context) {
        const { requestId, response } = context;
        const duration = Date.now() - context.timestamp;
        
        console.log(`[${this.logLevel.toUpperCase()}] Response ${requestId}:`, {
            status: response.status,
            statusText: response.statusText,
            duration: `${duration}ms`,
            headers: this._sanitizeHeaders(response.headers),
            bodyLength: this._getBodyLength(response.data)
        });
    }

    _logError(context) {
        const { requestId, error } = context;
        const duration = Date.now() - context.timestamp;
        
        console.error(`[ERROR] Request ${requestId} failed:`, {
            error: error.message,
            duration: `${duration}ms`,
            stack: error.stack
        });
    }

    _sanitizeHeaders(headers) {
        if (!headers) return {};
        
        const sanitized = { ...headers };
        const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
        
        sensitiveHeaders.forEach(header => {
            if (sanitized[header]) {
                sanitized[header] = '[REDACTED]';
            }
            if (sanitized[header.toUpperCase()]) {
                sanitized[header.toUpperCase()] = '[REDACTED]';
            }
        });
        
        return sanitized;
    }

    _getBodyLength(body) {
        if (!body) return 0;
        if (typeof body === 'string') return body.length;
        if (body instanceof ArrayBuffer) return body.byteLength;
        try {
            return JSON.stringify(body).length;
        } catch {
            return 0;
        }
    }

    _truncateBody(body) {
        if (!body) return null;
        
        let str;
        if (typeof body === 'string') {
            str = body;
        } else {
            try {
                str = JSON.stringify(body, null, 2);
            } catch {
                return '[Non-serializable body]';
            }
        }
        
        return str.length > this.maxBodyLength 
            ? str.slice(0, this.maxBodyLength) + '...[truncated]'
            : str;
    }
}

/**
 * Cache Interceptor
 * Caches requests and responses
 */
class CacheInterceptor extends BaseInterceptor {
    constructor(options = {}) {
        super(options);
        this.cache = new Map();
        this.maxCacheSize = options.maxCacheSize || 100;
        this.defaultTTL = options.defaultTTL || 300000; // 5 minutes
        this.cacheableMethodsRequest = options.cacheableMethodsRequest || ['GET', 'HEAD'];
        this.cacheableMethodsResponse = options.cacheableMethodsResponse || ['GET', 'HEAD'];
    }

    async process(context) {
        if (context.response) {
            return this._cacheResponse(context);
        } else {
            return this._checkCache(context);
        }
    }

    async _checkCache(context) {
        const { method = 'GET', url } = context;
        
        if (!this.cacheableMethodsRequest.includes(method.toUpperCase())) {
            return context;
        }

        const cacheKey = this._getCacheKey(method, url);
        const cached = this.cache.get(cacheKey);
        
        if (cached && this._isCacheValid(cached)) {
            return {
                ...context,
                cached: true,
                response: cached.response
            };
        }

        return context;
    }

    async _cacheResponse(context) {
        const { method = 'GET', url, response } = context;
        
        if (!response || !this.cacheableMethodsResponse.includes(method.toUpperCase())) {
            return context;
        }

        const cacheKey = this._getCacheKey(method, url);
        const ttl = this._getCacheTTL(response);
        
        if (ttl > 0) {
            this._ensureCacheSize();
            
            this.cache.set(cacheKey, {
                response,
                timestamp: Date.now(),
                ttl
            });
        }

        return context;
    }

    _getCacheKey(method, url) {
        return `${method.toUpperCase()}:${url}`;
    }

    _isCacheValid(cached) {
        return Date.now() - cached.timestamp < cached.ttl;
    }

    _getCacheTTL(response) {
        // Check Cache-Control header
        const cacheControl = response.headers?.['cache-control'];
        if (cacheControl) {
            const match = cacheControl.match(/max-age=(\d+)/);
            if (match) {
                return parseInt(match[1]) * 1000;
            }
        }
        
        return this.defaultTTL;
    }

    _ensureCacheSize() {
        if (this.cache.size >= this.maxCacheSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
    }
}

/**
 * Rate Limit Interceptor
 * Implements rate limiting for requests
 */
class RateLimitInterceptor extends BaseInterceptor {
    constructor(options = {}) {
        super(options);
        this.limits = new Map();
        this.defaultLimit = options.defaultLimit || { requests: 100, window: 60000 }; // 100 requests per minute
        this.domainLimits = options.domainLimits || {};
    }

    async process(context) {
        const { url } = context;
        const domain = new URL(url).hostname;
        
        const limit = this.domainLimits[domain] || this.defaultLimit;
        const usage = this._getUsage(domain);
        
        if (usage.count >= limit.requests) {
            const waitTime = limit.window - (Date.now() - usage.windowStart);
            if (waitTime > 0) {
                throw new Error(`Rate limit exceeded. Retry after ${waitTime}ms`);
            } else {
                // Reset window
                this._resetUsage(domain);
            }
        }
        
        this._recordUsage(domain);
        
        return {
            ...context,
            rateLimitRemaining: limit.requests - usage.count - 1
        };
    }

    _getUsage(domain) {
        if (!this.limits.has(domain)) {
            this._resetUsage(domain);
        }
        return this.limits.get(domain);
    }

    _resetUsage(domain) {
        this.limits.set(domain, {
            count: 0,
            windowStart: Date.now()
        });
    }

    _recordUsage(domain) {
        const usage = this.limits.get(domain);
        usage.count++;
    }
}

/**
 * Retry Interceptor
 * Implements retry logic for failed requests
 */
class RetryInterceptor extends BaseInterceptor {
    constructor(options = {}) {
        super(options);
        this.maxRetries = options.maxRetries || 3;
        this.retryDelay = options.retryDelay || 1000;
        this.backoffMultiplier = options.backoffMultiplier || 2;
        this.retryableErrors = options.retryableErrors || [408, 429, 500, 502, 503, 504];
    }

    async process(context) {
        const { error } = context;
        
        if (!this._shouldRetry(error, context)) {
            return context;
        }

        const retryCount = (context.retryCount || 0) + 1;
        if (retryCount > this.maxRetries) {
            return context;
        }

        const delay = this.retryDelay * Math.pow(this.backoffMultiplier, retryCount - 1);
        await new Promise(resolve => setTimeout(resolve, delay));

        return {
            ...context,
            retryCount,
            shouldRetry: true
        };
    }

    _shouldRetry(error, context) {
        if (error.statusCode && this.retryableErrors.includes(error.statusCode)) {
            return true;
        }
        
        // Check for network errors
        if (error.code === 'ECONNRESET' || 
            error.code === 'ECONNREFUSED' || 
            error.code === 'ETIMEDOUT') {
            return true;
        }
        
        return false;
    }
}

module.exports = {
    RequestInterceptorManager,
    BaseInterceptor,
    AuthenticationInterceptor,
    LoggingInterceptor,
    CacheInterceptor,
    RateLimitInterceptor,
    RetryInterceptor,
    InterceptorType,
    InterceptorPhase
};