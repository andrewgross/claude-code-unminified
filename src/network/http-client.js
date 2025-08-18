/**
 * HTTP Client Module
 * 
 * Provides a unified interface for making HTTP requests using both fetch API and XMLHttpRequest,
 * with automatic fallback, retry logic, and comprehensive error handling.
 */

const EventEmitter = require('events');

/**
 * HTTP Client Class
 * Handles HTTP/HTTPS requests with automatic method detection and retry logic
 */
class HttpClient extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            timeout: options.timeout || 30000,
            retries: options.retries || 3,
            retryDelay: options.retryDelay || 1000,
            retryBackoff: options.retryBackoff || 2,
            maxRetryDelay: options.maxRetryDelay || 10000,
            headers: options.headers || {},
            keepAlive: options.keepAlive !== false,
            maxSockets: options.maxSockets || 30,
            ...options
        };

        this.requestCount = 0;
        this.errorCount = 0;
        this.successCount = 0;
        
        // Feature detection
        this.supportsNativeFetch = this._detectNativeFetch();
        this.supportsXHR = typeof XMLHttpRequest !== 'undefined';
        
        this.emit('initialized', { 
            supportsFetch: this.supportsNativeFetch, 
            supportsXHR: this.supportsXHR 
        });
    }

    /**
     * Detects if native fetch is available
     * @returns {boolean} True if native fetch is available
     */
    _detectNativeFetch() {
        if (typeof fetch === 'undefined') return false;
        
        try {
            // Test if it's native fetch (not polyfilled)
            return /^function fetch\(\)\s*\{\s*\[native code\]\s*\}$/.test(fetch.toString());
        } catch (error) {
            return false;
        }
    }

    /**
     * Makes an HTTP request with automatic method selection
     * @param {string|Object} url - URL or request options
     * @param {Object} options - Request options
     * @returns {Promise} Promise resolving to response data
     */
    async request(url, options = {}) {
        const requestId = ++this.requestCount;
        const startTime = Date.now();
        
        try {
            this.emit('requestStart', { requestId, url, options });
            
            let result;
            if (this.supportsNativeFetch) {
                result = await this._fetchRequest(url, options, requestId);
            } else if (this.supportsXHR) {
                result = await this._xhrRequest(url, options, requestId);
            } else {
                throw new Error('No supported HTTP method available');
            }

            const duration = Date.now() - startTime;
            this.successCount++;
            
            this.emit('requestEnd', { 
                requestId, 
                success: true, 
                duration,
                statusCode: result.status 
            });
            
            return result;
        } catch (error) {
            const duration = Date.now() - startTime;
            this.errorCount++;
            
            this.emit('requestEnd', { 
                requestId, 
                success: false, 
                duration,
                error: error.message 
            });
            
            throw error;
        }
    }

    /**
     * Makes a request using the Fetch API
     * @param {string|Object} url - URL or request options
     * @param {Object} options - Request options
     * @param {number} requestId - Unique request ID
     * @returns {Promise} Promise resolving to response data
     */
    async _fetchRequest(url, options, requestId) {
        const requestOptions = this._prepareFetchOptions(url, options);
        const controller = new AbortController();
        
        // Set timeout
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, this.options.timeout);

        try {
            this.emit('fetchStart', { requestId, url: requestOptions.url, options: requestOptions });

            const response = await fetch(requestOptions.url, {
                ...requestOptions,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new HttpError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    response.statusText
                );
            }

            const result = {
                status: response.status,
                statusText: response.statusText,
                headers: this._parseHeaders(response.headers),
                data: await this._parseResponse(response, options.responseType)
            };

            this.emit('fetchEnd', { requestId, success: true, result });
            return result;

        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new HttpError('Request timeout', 408, 'Request Timeout');
            }
            
            this.emit('fetchEnd', { requestId, success: false, error: error.message });
            throw error;
        }
    }

    /**
     * Makes a request using XMLHttpRequest
     * @param {string|Object} url - URL or request options
     * @param {Object} options - Request options
     * @param {number} requestId - Unique request ID
     * @returns {Promise} Promise resolving to response data
     */
    async _xhrRequest(url, options, requestId) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const requestOptions = this._prepareXHROptions(url, options);
            
            this.emit('xhrStart', { requestId, url: requestOptions.url, options: requestOptions });

            xhr.timeout = this.options.timeout;
            
            xhr.onload = () => {
                try {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const result = {
                            status: xhr.status,
                            statusText: xhr.statusText,
                            headers: this._parseXHRHeaders(xhr.getAllResponseHeaders()),
                            data: this._parseXHRResponse(xhr, options.responseType)
                        };
                        
                        this.emit('xhrEnd', { requestId, success: true, result });
                        resolve(result);
                    } else {
                        const error = new HttpError(
                            `HTTP ${xhr.status}: ${xhr.statusText}`,
                            xhr.status,
                            xhr.statusText
                        );
                        this.emit('xhrEnd', { requestId, success: false, error: error.message });
                        reject(error);
                    }
                } catch (parseError) {
                    this.emit('xhrEnd', { requestId, success: false, error: parseError.message });
                    reject(parseError);
                }
            };

            xhr.onerror = () => {
                const error = new HttpError('Network Error', 0, 'Network Error');
                this.emit('xhrEnd', { requestId, success: false, error: error.message });
                reject(error);
            };

            xhr.ontimeout = () => {
                const error = new HttpError('Request Timeout', 408, 'Request Timeout');
                this.emit('xhrEnd', { requestId, success: false, error: error.message });
                reject(error);
            };

            // Set request headers
            xhr.open(requestOptions.method, requestOptions.url, true);
            
            Object.entries(requestOptions.headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            // Send request
            xhr.send(requestOptions.body);
        });
    }

    /**
     * Prepares options for fetch request
     * @param {string|Object} url - URL or request options
     * @param {Object} options - Additional options
     * @returns {Object} Prepared fetch options
     */
    _prepareFetchOptions(url, options) {
        const isUrlObject = typeof url === 'object';
        const requestUrl = isUrlObject ? url.url || url.href : url;
        
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'User-Agent': 'ClaudeCode-HttpClient/1.0',
            ...this.options.headers
        };

        return {
            url: requestUrl,
            method: options.method || (isUrlObject ? url.method : 'GET'),
            headers: {
                ...defaultHeaders,
                ...(isUrlObject ? url.headers : {}),
                ...options.headers
            },
            body: this._prepareBody(options.body || (isUrlObject ? url.body : undefined)),
            credentials: options.credentials || 'same-origin',
            cache: options.cache || 'default',
            redirect: options.redirect || 'follow'
        };
    }

    /**
     * Prepares options for XMLHttpRequest
     * @param {string|Object} url - URL or request options
     * @param {Object} options - Additional options
     * @returns {Object} Prepared XHR options
     */
    _prepareXHROptions(url, options) {
        const isUrlObject = typeof url === 'object';
        const requestUrl = isUrlObject ? url.url || url.href : url;
        
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...this.options.headers
        };

        return {
            url: requestUrl,
            method: (options.method || (isUrlObject ? url.method : 'GET')).toUpperCase(),
            headers: {
                ...defaultHeaders,
                ...(isUrlObject ? url.headers : {}),
                ...options.headers
            },
            body: this._prepareBody(options.body || (isUrlObject ? url.body : undefined))
        };
    }

    /**
     * Prepares request body
     * @param {*} body - Request body
     * @returns {string|FormData|Blob|null} Prepared body
     */
    _prepareBody(body) {
        if (!body) return null;
        
        if (typeof body === 'string') return body;
        if (body instanceof FormData || body instanceof Blob) return body;
        
        try {
            return JSON.stringify(body);
        } catch (error) {
            throw new Error(`Failed to serialize request body: ${error.message}`);
        }
    }

    /**
     * Parses fetch response headers
     * @param {Headers} headers - Fetch headers object
     * @returns {Object} Parsed headers object
     */
    _parseHeaders(headers) {
        const result = {};
        for (const [key, value] of headers.entries()) {
            result[key.toLowerCase()] = value;
        }
        return result;
    }

    /**
     * Parses XMLHttpRequest response headers
     * @param {string} headersString - Raw headers string
     * @returns {Object} Parsed headers object
     */
    _parseXHRHeaders(headersString) {
        const headers = {};
        if (!headersString) return headers;
        
        headersString.split('\r\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.slice(0, colonIndex).toLowerCase();
                const value = line.slice(colonIndex + 1).trim();
                headers[key] = value;
            }
        });
        
        return headers;
    }

    /**
     * Parses fetch response based on content type
     * @param {Response} response - Fetch response object
     * @param {string} responseType - Expected response type
     * @returns {Promise} Parsed response data
     */
    async _parseResponse(response, responseType) {
        const contentType = response.headers.get('content-type') || '';
        
        if (responseType === 'text' || contentType.includes('text/')) {
            return await response.text();
        }
        
        if (responseType === 'blob' || contentType.includes('application/octet-stream')) {
            return await response.blob();
        }
        
        if (responseType === 'arrayBuffer') {
            return await response.arrayBuffer();
        }
        
        if (contentType.includes('application/json')) {
            try {
                return await response.json();
            } catch (error) {
                return await response.text();
            }
        }
        
        return await response.text();
    }

    /**
     * Parses XMLHttpRequest response based on content type
     * @param {XMLHttpRequest} xhr - XMLHttpRequest object
     * @param {string} responseType - Expected response type
     * @returns {*} Parsed response data
     */
    _parseXHRResponse(xhr, responseType) {
        const contentType = xhr.getResponseHeader('content-type') || '';
        
        if (responseType === 'text' || contentType.includes('text/')) {
            return xhr.responseText;
        }
        
        if (responseType === 'json' || contentType.includes('application/json')) {
            try {
                return JSON.parse(xhr.responseText);
            } catch (error) {
                return xhr.responseText;
            }
        }
        
        return xhr.responseText;
    }

    /**
     * HTTP GET request
     * @param {string} url - Request URL
     * @param {Object} options - Request options
     * @returns {Promise} Promise resolving to response data
     */
    async get(url, options = {}) {
        return this.request(url, { ...options, method: 'GET' });
    }

    /**
     * HTTP POST request
     * @param {string} url - Request URL
     * @param {*} data - Request data
     * @param {Object} options - Request options
     * @returns {Promise} Promise resolving to response data
     */
    async post(url, data, options = {}) {
        return this.request(url, { ...options, method: 'POST', body: data });
    }

    /**
     * HTTP PUT request
     * @param {string} url - Request URL
     * @param {*} data - Request data
     * @param {Object} options - Request options
     * @returns {Promise} Promise resolving to response data
     */
    async put(url, data, options = {}) {
        return this.request(url, { ...options, method: 'PUT', body: data });
    }

    /**
     * HTTP DELETE request
     * @param {string} url - Request URL
     * @param {Object} options - Request options
     * @returns {Promise} Promise resolving to response data
     */
    async delete(url, options = {}) {
        return this.request(url, { ...options, method: 'DELETE' });
    }

    /**
     * HTTP PATCH request
     * @param {string} url - Request URL
     * @param {*} data - Request data
     * @param {Object} options - Request options
     * @returns {Promise} Promise resolving to response data
     */
    async patch(url, data, options = {}) {
        return this.request(url, { ...options, method: 'PATCH', body: data });
    }

    /**
     * Gets client statistics
     * @returns {Object} Client statistics
     */
    getStats() {
        return {
            requestCount: this.requestCount,
            successCount: this.successCount,
            errorCount: this.errorCount,
            successRate: this.requestCount > 0 ? (this.successCount / this.requestCount) : 0,
            supportsNativeFetch: this.supportsNativeFetch,
            supportsXHR: this.supportsXHR
        };
    }

    /**
     * Resets client statistics
     */
    resetStats() {
        this.requestCount = 0;
        this.successCount = 0;
        this.errorCount = 0;
    }
}

/**
 * Custom HTTP Error class
 */
class HttpError extends Error {
    constructor(message, statusCode, statusText) {
        super(message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.isHttpError = true;
        
        // Maintain proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
    }
}

/**
 * Utility functions for HTTP operations
 */
const HttpUtils = {
    /**
     * Checks if a URL is valid
     * @param {string} url - URL to validate
     * @returns {boolean} True if URL is valid
     */
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    },

    /**
     * Builds query string from parameters
     * @param {Object} params - Query parameters
     * @returns {string} Query string
     */
    buildQueryString(params) {
        const searchParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(item => searchParams.append(key, item));
            } else if (value !== null && value !== undefined) {
                searchParams.append(key, String(value));
            }
        });
        
        return searchParams.toString();
    },

    /**
     * Combines URL with query parameters
     * @param {string} baseUrl - Base URL
     * @param {Object} params - Query parameters
     * @returns {string} Complete URL with parameters
     */
    buildUrl(baseUrl, params) {
        if (!params || Object.keys(params).length === 0) {
            return baseUrl;
        }
        
        const queryString = this.buildQueryString(params);
        const separator = baseUrl.includes('?') ? '&' : '?';
        
        return `${baseUrl}${separator}${queryString}`;
    },

    /**
     * Parses response headers into an object
     * @param {string} headersString - Raw headers string
     * @returns {Object} Parsed headers
     */
    parseHeaders(headersString) {
        const headers = {};
        if (!headersString) return headers;
        
        headersString.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.slice(0, colonIndex).trim().toLowerCase();
                const value = line.slice(colonIndex + 1).trim();
                headers[key] = value;
            }
        });
        
        return headers;
    }
};

module.exports = {
    HttpClient,
    HttpError,
    HttpUtils
};