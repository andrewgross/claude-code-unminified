/**
 * Claude Code Recovery Manager
 * 
 * Provides error recovery strategies and automatic recovery mechanisms
 * for handling various types of errors that can be recovered from.
 */

const { EventEmitter } = require('events');
const path = require('path');
const fs = require('fs').promises;
const { 
    AuthenticationError, 
    NetworkError, 
    FileSystemError,
    TimeoutError,
    NotFoundError 
} = require('./error-types');

/**
 * Error recovery system
 */
class ErrorRecoveryManager extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            maxRecoveryAttempts: options.maxRecoveryAttempts || 3,
            recoveryTimeout: options.recoveryTimeout || 30000,
            enableAutoRecovery: options.enableAutoRecovery !== false,
            ...options
        };
        
        this.recoveryStrategies = new Map();
        this.recoveryHistory = [];
        this.activeRecoveries = new Map();
        
        this.registerBuiltinStrategies();
    }
    
    registerRecoveryStrategy(errorType, strategy) {
        if (!this.recoveryStrategies.has(errorType)) {
            this.recoveryStrategies.set(errorType, []);
        }
        this.recoveryStrategies.get(errorType).push(strategy);
        
        this.emit('strategyRegistered', errorType, strategy);
    }
    
    async attemptRecovery(error, context = {}) {
        const recoveryId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        try {
            this.activeRecoveries.set(recoveryId, {
                error,
                context,
                startTime: Date.now()
            });
            
            this.emit('recoveryStarted', recoveryId, error);
            
            const strategies = [
                ...this.recoveryStrategies.get(error.constructor.name) || [],
                ...this.recoveryStrategies.get(error.code) || [],
                ...this.recoveryStrategies.get('*') || []
            ];
            
            for (const strategy of strategies) {
                try {
                    const startTime = Date.now();
                    const result = await Promise.race([
                        strategy.recover(error, context),
                        new Promise((_, reject) => 
                            setTimeout(() => reject(new Error('Recovery timeout')), 
                            this.options.recoveryTimeout)
                        )
                    ]);
                    
                    const recoveryTime = Date.now() - startTime;
                    
                    if (result.success) {
                        this.recordRecovery(error, strategy, result, recoveryTime);
                        this.emit('recoverySucceeded', recoveryId, error, strategy, result);
                        return result;
                    }
                    
                } catch (recoveryError) {
                    this.emit('recoveryStrategyFailed', recoveryId, error, strategy, recoveryError);
                    console.warn(`Recovery strategy '${strategy.name}' failed:`, recoveryError.message);
                }
            }
            
            const failureResult = { success: false, error };
            this.emit('recoveryFailed', recoveryId, error);
            return failureResult;
            
        } finally {
            this.activeRecoveries.delete(recoveryId);
        }
    }
    
    recordRecovery(error, strategy, result, recoveryTime) {
        const record = {
            timestamp: Date.now(),
            errorType: error.constructor.name,
            errorCode: error.code,
            errorMessage: error.message,
            strategy: strategy.name,
            success: result.success,
            recoveryTime,
            action: result.action,
            details: result.message
        };
        
        this.recoveryHistory.push(record);
        
        // Keep history manageable
        if (this.recoveryHistory.length > 1000) {
            this.recoveryHistory.splice(0, 500);
        }
        
        this.emit('recoveryRecorded', record);
    }
    
    getRecoveryHistory(options = {}) {
        const { 
            errorType, 
            strategy, 
            since, 
            limit = 100 
        } = options;
        
        let filtered = this.recoveryHistory;
        
        if (errorType) {
            filtered = filtered.filter(r => r.errorType === errorType);
        }
        
        if (strategy) {
            filtered = filtered.filter(r => r.strategy === strategy);
        }
        
        if (since) {
            filtered = filtered.filter(r => r.timestamp >= since);
        }
        
        return filtered.slice(-limit);
    }
    
    getRecoveryStats() {
        const stats = {
            totalAttempts: this.recoveryHistory.length,
            successfulRecoveries: this.recoveryHistory.filter(r => r.success).length,
            failedRecoveries: this.recoveryHistory.filter(r => !r.success).length,
            averageRecoveryTime: 0,
            strategiesUsed: new Set(),
            errorTypesRecovered: new Set()
        };
        
        if (stats.totalAttempts > 0) {
            stats.successRate = (stats.successfulRecoveries / stats.totalAttempts) * 100;
            
            const totalTime = this.recoveryHistory.reduce((sum, r) => sum + (r.recoveryTime || 0), 0);
            stats.averageRecoveryTime = totalTime / this.recoveryHistory.length;
            
            this.recoveryHistory.forEach(r => {
                stats.strategiesUsed.add(r.strategy);
                stats.errorTypesRecovered.add(r.errorType);
            });
            
            stats.strategiesUsed = Array.from(stats.strategiesUsed);
            stats.errorTypesRecovered = Array.from(stats.errorTypesRecovered);
        }
        
        return stats;
    }
    
    registerBuiltinStrategies() {
        // Authentication recovery strategy
        this.registerRecoveryStrategy('AuthenticationError', authRecoveryStrategy);
        
        // Network recovery strategy
        this.registerRecoveryStrategy('NetworkError', networkRecoveryStrategy);
        
        // File system recovery strategy
        this.registerRecoveryStrategy('FileSystemError', fileSystemRecoveryStrategy);
        
        // Timeout recovery strategy
        this.registerRecoveryStrategy('TimeoutError', timeoutRecoveryStrategy);
        
        // Not found recovery strategy
        this.registerRecoveryStrategy('NotFoundError', notFoundRecoveryStrategy);
    }
}

// Built-in recovery strategies

const authRecoveryStrategy = {
    name: 'auth_recovery',
    async recover(error, context) {
        if (error instanceof AuthenticationError) {
            // Attempt token refresh
            if (context.authManager) {
                try {
                    await context.authManager.refreshToken();
                    return { 
                        success: true, 
                        action: 'token_refreshed',
                        message: 'Authentication token refreshed successfully'
                    };
                } catch (refreshError) {
                    // Try to get new credentials
                    if (context.authManager.canReauthenticate) {
                        return {
                            success: true,
                            action: 'redirect_login',
                            message: 'Please log in again',
                            requiresUserAction: true
                        };
                    }
                }
            }
            
            // Check for stored credentials
            if (context.credentialStore) {
                try {
                    const credentials = await context.credentialStore.get();
                    if (credentials && credentials.isValid()) {
                        return {
                            success: true,
                            action: 'credentials_restored',
                            message: 'Authentication restored from stored credentials'
                        };
                    }
                } catch (credError) {
                    // Credential store error, continue to failure
                }
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
            try {
                const isOnline = await checkNetworkConnectivity();
                
                if (!isOnline) {
                    return {
                        success: true,
                        action: 'wait_for_connection',
                        message: 'Network connection lost. Please check your connection and try again.',
                        requiresUserAction: true
                    };
                }
            } catch (connectivityError) {
                // Unable to check connectivity, proceed with other recovery methods
            }
            
            // Attempt to use cached data if available
            if (context.cache && context.cacheKey) {
                try {
                    const cachedData = await context.cache.get(context.cacheKey);
                    if (cachedData && !cachedData.expired) {
                        return {
                            success: true,
                            action: 'use_cached_data',
                            data: cachedData.data,
                            message: 'Using cached data due to network error'
                        };
                    }
                } catch (cacheError) {
                    // Cache error, continue with other recovery methods
                }
            }
            
            // Try alternative endpoints
            if (context.alternativeEndpoints && context.alternativeEndpoints.length > 0) {
                return {
                    success: true,
                    action: 'try_alternative_endpoint',
                    alternatives: context.alternativeEndpoints,
                    message: 'Trying alternative service endpoints'
                };
            }
        }
        return { success: false };
    }
};

const fileSystemRecoveryStrategy = {
    name: 'filesystem_recovery',
    async recover(error, context) {
        if (error instanceof FileSystemError || error instanceof NotFoundError) {
            // Try to create missing directories
            if (error.code === 'ENOENT' && context.filePath && context.createDirectories) {
                try {
                    const dirPath = path.dirname(context.filePath);
                    await fs.mkdir(dirPath, { recursive: true });
                    return {
                        success: true,
                        action: 'created_directory',
                        message: `Created missing directory: ${dirPath}`
                    };
                } catch (createError) {
                    // Continue to other recovery methods
                }
            }
            
            // Suggest alternative file locations
            if (error.code === 'ENOENT' && context.filePath) {
                try {
                    const suggestions = await findAlternativeFiles(context.filePath);
                    if (suggestions.length > 0) {
                        return {
                            success: true,
                            action: 'suggest_alternatives',
                            suggestions: suggestions,
                            message: 'File not found. Here are some similar files:',
                            requiresUserAction: true
                        };
                    }
                } catch (searchError) {
                    // Continue to other recovery methods
                }
            }
            
            // Try to restore from backup
            if (context.backupDirectory && context.filePath) {
                try {
                    const backupPath = path.join(context.backupDirectory, path.basename(context.filePath));
                    const backupExists = await fs.access(backupPath).then(() => true).catch(() => false);
                    
                    if (backupExists) {
                        return {
                            success: true,
                            action: 'restore_from_backup',
                            backupPath: backupPath,
                            message: `Found backup file at: ${backupPath}`,
                            requiresUserAction: true
                        };
                    }
                } catch (backupError) {
                    // Continue to other recovery methods
                }
            }
        }
        return { success: false };
    }
};

const timeoutRecoveryStrategy = {
    name: 'timeout_recovery',
    async recover(error, context) {
        if (error instanceof TimeoutError) {
            // Suggest retry with longer timeout
            return {
                success: true,
                action: 'retry_with_longer_timeout',
                suggestedTimeout: (error.timeout || 30000) * 2,
                message: 'Operation timed out. Consider retrying with a longer timeout.'
            };
        }
        return { success: false };
    }
};

const notFoundRecoveryStrategy = {
    name: 'notfound_recovery',
    async recover(error, context) {
        if (error instanceof NotFoundError) {
            // Try fuzzy search for similar resources
            if (context.searchFunction && error.resource) {
                try {
                    const suggestions = await context.searchFunction(error.resource, {
                        fuzzy: true,
                        limit: 5
                    });
                    
                    if (suggestions.length > 0) {
                        return {
                            success: true,
                            action: 'suggest_similar_resources',
                            suggestions: suggestions,
                            message: `${error.type} '${error.resource}' not found. Did you mean one of these?`,
                            requiresUserAction: true
                        };
                    }
                } catch (searchError) {
                    // Continue to other recovery methods
                }
            }
            
            // Suggest common locations or commands
            if (error.type === 'file' && error.resource) {
                const commonLocations = [
                    process.cwd(),
                    process.env.HOME,
                    path.join(process.env.HOME, 'Documents'),
                    '/tmp'
                ].filter(Boolean);
                
                return {
                    success: true,
                    action: 'suggest_common_locations',
                    locations: commonLocations,
                    message: 'File not found. Try looking in these common locations:',
                    requiresUserAction: true
                };
            }
        }
        return { success: false };
    }
};

// Helper functions

async function checkNetworkConnectivity() {
    const dns = require('dns').promises;
    
    try {
        await dns.lookup('google.com');
        return true;
    } catch (error) {
        return false;
    }
}

async function findAlternativeFiles(filePath, maxSuggestions = 5) {
    const directory = path.dirname(filePath);
    const filename = path.basename(filePath);
    const extension = path.extname(filename);
    const basename = path.basename(filename, extension);
    
    try {
        const files = await fs.readdir(directory);
        
        const suggestions = files
            .filter(file => {
                // Find files with similar names or same extension
                return file.includes(basename) || 
                       (extension && path.extname(file) === extension) ||
                       levenshteinDistance(file, filename) <= 3;
            })
            .map(file => path.join(directory, file))
            .slice(0, maxSuggestions);
            
        return suggestions;
    } catch (error) {
        return [];
    }
}

function levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,     // deletion
                matrix[j - 1][i] + 1,     // insertion
                matrix[j - 1][i - 1] + indicator // substitution
            );
        }
    }
    
    return matrix[str2.length][str1.length];
}

module.exports = {
    ErrorRecoveryManager,
    authRecoveryStrategy,
    networkRecoveryStrategy,
    fileSystemRecoveryStrategy,
    timeoutRecoveryStrategy,
    notFoundRecoveryStrategy
};