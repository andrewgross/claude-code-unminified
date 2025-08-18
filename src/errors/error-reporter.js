/**
 * Claude Code Error Reporter
 * 
 * Handles error logging, reporting, and analytics with support for multiple
 * logging destinations and configurable privacy controls.
 */

const { EventEmitter } = require('events');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

/**
 * Error Logger with multiple output destinations
 */
class ErrorLogger extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            logLevel: options.logLevel || 'error',
            enableConsole: options.enableConsole !== false,
            enableFile: options.enableFile || false,
            enableRemote: options.enableRemote || false,
            logFilePath: options.logFilePath || path.join(process.cwd(), 'logs', 'errors.log'),
            maxFileSize: options.maxFileSize || 10 * 1024 * 1024, // 10MB
            maxFiles: options.maxFiles || 5,
            sensitiveFields: options.sensitiveFields || [
                'password', 'token', 'key', 'secret', 'auth', 'credential',
                'cookie', 'session', 'api_key', 'access_token', 'refresh_token'
            ],
            ...options
        };
        
        this.loggers = [];
        this.setupDefaultLoggers();
    }
    
    setupDefaultLoggers() {
        if (this.options.enableConsole) {
            this.addLogger(new ConsoleLogger(this.options));
        }
        
        if (this.options.enableFile) {
            this.addLogger(new FileLogger(this.options));
        }
        
        if (this.options.enableRemote && this.options.remoteEndpoint) {
            this.addLogger(new RemoteLogger(this.options));
        }
    }
    
    addLogger(logger) {
        this.loggers.push(logger);
        this.emit('loggerAdded', logger);
    }
    
    removeLogger(logger) {
        const index = this.loggers.indexOf(logger);
        if (index !== -1) {
            this.loggers.splice(index, 1);
            this.emit('loggerRemoved', logger);
        }
    }
    
    async logError(error, context = {}) {
        const logEntry = this.createLogEntry(error, context);
        
        this.emit('beforeLog', logEntry);
        
        const promises = this.loggers.map(async logger => {
            try {
                await logger.log(logEntry);
            } catch (loggerError) {
                this.emit('loggerError', loggerError, logger);
                console.error(`Logger ${logger.constructor.name} failed:`, loggerError.message);
            }
        });
        
        await Promise.allSettled(promises);
        
        this.emit('afterLog', logEntry);
    }
    
    createLogEntry(error, context) {
        const entry = {
            id: this.generateLogId(),
            timestamp: new Date().toISOString(),
            level: this.mapSeverityToLevel(error.severity || 'error'),
            message: error.message,
            name: error.name,
            code: error.code,
            category: error.category,
            context: this.sanitizeContext({ ...context, ...error.context }),
            stack: error.stack,
            userAgent: this.getUserAgent(),
            platform: process.platform,
            arch: process.arch,
            nodeVersion: process.version,
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime()
        };
        
        return entry;
    }
    
    generateLogId() {
        return crypto.randomBytes(8).toString('hex');
    }
    
    getUserAgent() {
        return `ClaudeCode/${process.env.npm_package_version || 'unknown'} (${process.platform}; ${process.arch}) Node.js/${process.version}`;
    }
    
    sanitizeContext(context) {
        if (!context || typeof context !== 'object') {
            return context;
        }
        
        const sanitized = Array.isArray(context) ? [] : {};
        
        for (const [key, value] of Object.entries(context)) {
            if (this.isSensitiveField(key)) {
                sanitized[key] = '[REDACTED]';
            } else if (typeof value === 'object' && value !== null) {
                sanitized[key] = this.sanitizeContext(value);
            } else if (typeof value === 'string' && this.containsSensitiveInfo(value)) {
                sanitized[key] = this.redactSensitiveInfo(value);
            } else {
                sanitized[key] = value;
            }
        }
        
        return sanitized;
    }
    
    isSensitiveField(fieldName) {
        const lowerField = fieldName.toLowerCase();
        return this.options.sensitiveFields.some(sensitive => 
            lowerField.includes(sensitive.toLowerCase())
        );
    }
    
    containsSensitiveInfo(str) {
        // Check for patterns that might contain sensitive information
        const patterns = [
            /\b[A-Za-z0-9]{20,}\b/, // Long alphanumeric strings (likely tokens)
            /(?:bearer|token|key|secret)\s*[:=]\s*[A-Za-z0-9]+/i,
            /\b(?:sk|pk|api)[-_][A-Za-z0-9]+/i
        ];
        
        return patterns.some(pattern => pattern.test(str));
    }
    
    redactSensitiveInfo(str) {
        return str.replace(/\b[A-Za-z0-9]{20,}\b/g, '[REDACTED_TOKEN]')
                  .replace(/(?:bearer|token|key|secret)\s*[:=]\s*[A-Za-z0-9]+/gi, '$1: [REDACTED]');
    }
    
    mapSeverityToLevel(severity) {
        const mapping = {
            critical: 'error',
            error: 'error',
            warning: 'warn',
            info: 'info',
            debug: 'debug'
        };
        return mapping[severity] || 'error';
    }
}

/**
 * Console Logger
 */
class ConsoleLogger {
    constructor(options = {}) {
        this.options = options;
    }
    
    async log(entry) {
        const color = this.getColorForLevel(entry.level);
        const timestamp = new Date(entry.timestamp).toLocaleTimeString();
        
        console.error(`[${timestamp}] ${color(`${entry.level.toUpperCase()}:`)} ${entry.message}`);
        
        if (entry.code) {
            console.error(`Code: ${entry.code}`);
        }
        
        if (entry.context && Object.keys(entry.context).length > 0) {
            console.error('Context:', JSON.stringify(entry.context, null, 2));
        }
        
        if (entry.level === 'error' && entry.stack && this.options.showStack) {
            console.error('Stack:', entry.stack);
        }
    }
    
    getColorForLevel(level) {
        // Simple color mapping without external dependencies
        const colors = {
            error: (text) => `\x1b[31m${text}\x1b[0m`, // Red
            warn: (text) => `\x1b[33m${text}\x1b[0m`,  // Yellow
            info: (text) => `\x1b[36m${text}\x1b[0m`,  // Cyan
            debug: (text) => `\x1b[90m${text}\x1b[0m`  // Gray
        };
        return colors[level] || ((text) => text);
    }
}

/**
 * File Logger with rotation support
 */
class FileLogger {
    constructor(options = {}) {
        this.options = options;
        this.currentFileSize = 0;
        this.ensureLogDirectory();
    }
    
    async ensureLogDirectory() {
        const logDir = path.dirname(this.options.logFilePath);
        try {
            await fs.mkdir(logDir, { recursive: true });
        } catch (error) {
            console.error('Failed to create log directory:', error.message);
        }
    }
    
    async log(entry) {
        const logLine = JSON.stringify(entry) + '\n';
        
        try {
            await this.checkAndRotateLog();
            await fs.appendFile(this.options.logFilePath, logLine);
            this.currentFileSize += Buffer.byteLength(logLine);
        } catch (error) {
            console.error('Failed to write to log file:', error.message);
        }
    }
    
    async checkAndRotateLog() {
        try {
            const stats = await fs.stat(this.options.logFilePath);
            this.currentFileSize = stats.size;
            
            if (this.currentFileSize >= this.options.maxFileSize) {
                await this.rotateLog();
            }
        } catch (error) {
            // File doesn't exist yet, which is fine
            this.currentFileSize = 0;
        }
    }
    
    async rotateLog() {
        const logDir = path.dirname(this.options.logFilePath);
        const logName = path.basename(this.options.logFilePath, path.extname(this.options.logFilePath));
        const logExt = path.extname(this.options.logFilePath);
        
        // Rotate existing files
        for (let i = this.options.maxFiles - 1; i >= 1; i--) {
            const oldFile = path.join(logDir, `${logName}.${i}${logExt}`);
            const newFile = path.join(logDir, `${logName}.${i + 1}${logExt}`);
            
            try {
                await fs.rename(oldFile, newFile);
            } catch (error) {
                // File doesn't exist, continue
            }
        }
        
        // Move current log to .1
        const firstRotated = path.join(logDir, `${logName}.1${logExt}`);
        try {
            await fs.rename(this.options.logFilePath, firstRotated);
            this.currentFileSize = 0;
        } catch (error) {
            console.error('Failed to rotate log file:', error.message);
        }
    }
}

/**
 * Remote Logger for sending logs to external services
 */
class RemoteLogger {
    constructor(options = {}) {
        this.options = {
            endpoint: options.remoteEndpoint,
            apiKey: options.remoteApiKey,
            batchSize: options.batchSize || 10,
            flushInterval: options.flushInterval || 30000,
            retryAttempts: options.retryAttempts || 3,
            timeout: options.timeout || 10000,
            ...options
        };
        
        this.buffer = [];
        this.flushTimer = null;
        this.setupFlushTimer();
    }
    
    async log(entry) {
        this.buffer.push(entry);
        
        if (this.buffer.length >= this.options.batchSize) {
            await this.flush();
        }
    }
    
    async flush() {
        if (this.buffer.length === 0) return;
        
        const entries = [...this.buffer];
        this.buffer = [];
        
        for (let attempt = 1; attempt <= this.options.retryAttempts; attempt++) {
            try {
                await this.sendToRemote(entries);
                return;
            } catch (error) {
                if (attempt === this.options.retryAttempts) {
                    console.error('Failed to send logs to remote endpoint after all retries:', error.message);
                    // Put entries back in buffer for next flush
                    this.buffer.unshift(...entries);
                } else {
                    // Wait before retry
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                }
            }
        }
    }
    
    async sendToRemote(entries) {
        const https = require('https');
        const url = require('url');
        
        const parsedUrl = new url.URL(this.options.endpoint);
        const postData = JSON.stringify({ logs: entries });
        
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'User-Agent': 'ClaudeCode-ErrorReporter',
                ...(this.options.apiKey && { 'Authorization': `Bearer ${this.options.apiKey}` })
            },
            timeout: this.options.timeout
        };
        
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(data);
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                    }
                });
            });
            
            req.on('error', reject);
            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });
            
            req.write(postData);
            req.end();
        });
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
        
        // Flush remaining logs
        this.flush();
    }
}

/**
 * Error Analytics and Reporting
 */
class ErrorAnalytics extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            retentionPeriod: options.retentionPeriod || 7 * 24 * 60 * 60 * 1000, // 7 days
            ...options
        };
        
        this.errorStats = new Map();
        this.recentErrors = [];
    }
    
    recordError(error, context = {}) {
        const record = {
            id: crypto.randomBytes(8).toString('hex'),
            timestamp: Date.now(),
            errorType: error.constructor.name,
            errorCode: error.code,
            category: error.category,
            severity: error.severity,
            message: error.message,
            context: this.sanitizeForAnalytics(context)
        };
        
        this.recentErrors.push(record);
        this.updateStats(record);
        this.cleanupOldRecords();
        
        this.emit('errorRecorded', record);
    }
    
    updateStats(record) {
        const key = `${record.errorType}:${record.errorCode || 'unknown'}`;
        
        if (!this.errorStats.has(key)) {
            this.errorStats.set(key, {
                count: 0,
                firstSeen: record.timestamp,
                lastSeen: record.timestamp,
                errorType: record.errorType,
                errorCode: record.errorCode,
                category: record.category,
                severity: record.severity
            });
        }
        
        const stats = this.errorStats.get(key);
        stats.count++;
        stats.lastSeen = record.timestamp;
    }
    
    cleanupOldRecords() {
        const cutoff = Date.now() - this.options.retentionPeriod;
        
        this.recentErrors = this.recentErrors.filter(record => 
            record.timestamp > cutoff
        );
        
        // Clean up stats for errors that haven't occurred recently
        for (const [key, stats] of this.errorStats.entries()) {
            if (stats.lastSeen < cutoff) {
                this.errorStats.delete(key);
            }
        }
    }
    
    getTopErrors(limit = 10) {
        return Array.from(this.errorStats.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }
    
    getErrorTrends(timeWindow = 24 * 60 * 60 * 1000) { // 24 hours
        const cutoff = Date.now() - timeWindow;
        const recentErrors = this.recentErrors.filter(r => r.timestamp > cutoff);
        
        const trends = {};
        
        recentErrors.forEach(record => {
            const hour = Math.floor((record.timestamp - cutoff) / (60 * 60 * 1000));
            const key = `${record.errorType}:${record.errorCode || 'unknown'}`;
            
            if (!trends[key]) {
                trends[key] = Array(24).fill(0);
            }
            
            if (hour >= 0 && hour < 24) {
                trends[key][hour]++;
            }
        });
        
        return trends;
    }
    
    generateReport() {
        const now = Date.now();
        const dayAgo = now - (24 * 60 * 60 * 1000);
        const weekAgo = now - (7 * 24 * 60 * 60 * 1000);
        
        const recentErrors24h = this.recentErrors.filter(r => r.timestamp > dayAgo);
        const recentErrors7d = this.recentErrors.filter(r => r.timestamp > weekAgo);
        
        return {
            summary: {
                totalErrors: this.recentErrors.length,
                errorsLast24h: recentErrors24h.length,
                errorsLast7d: recentErrors7d.length,
                uniqueErrorTypes: this.errorStats.size,
                reportGeneratedAt: new Date().toISOString()
            },
            topErrors: this.getTopErrors(),
            trends: this.getErrorTrends(),
            byCategory: this.groupByCategory(),
            bySeverity: this.groupBySeverity()
        };
    }
    
    groupByCategory() {
        const groups = {};
        
        for (const record of this.recentErrors) {
            const category = record.category || 'unknown';
            if (!groups[category]) {
                groups[category] = 0;
            }
            groups[category]++;
        }
        
        return groups;
    }
    
    groupBySeverity() {
        const groups = {};
        
        for (const record of this.recentErrors) {
            const severity = record.severity || 'unknown';
            if (!groups[severity]) {
                groups[severity] = 0;
            }
            groups[severity]++;
        }
        
        return groups;
    }
    
    sanitizeForAnalytics(context) {
        // Remove or hash sensitive information for analytics
        const sanitized = { ...context };
        
        const sensitiveKeys = ['token', 'password', 'key', 'secret', 'auth'];
        
        for (const key of Object.keys(sanitized)) {
            if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
                sanitized[key] = '[REDACTED]';
            }
        }
        
        return sanitized;
    }
}

module.exports = {
    ErrorLogger,
    ConsoleLogger,
    FileLogger,
    RemoteLogger,
    ErrorAnalytics
};