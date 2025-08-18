/**
 * Claude Code User Error Presenter
 * 
 * Provides user-friendly error presentation with clear messaging,
 * helpful suggestions, and appropriate formatting for different contexts.
 */

const { EventEmitter } = require('events');
const util = require('util');

/**
 * User Error Presenter for terminal output
 */
class UserErrorPresenter extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            theme: options.theme || 'default',
            verboseMode: options.verboseMode || false,
            showSuggestions: options.showSuggestions !== false,
            showContext: options.showContext !== false,
            showStack: options.showStack || process.env.NODE_ENV === 'development',
            maxContextItems: options.maxContextItems || 5,
            useColors: options.useColors !== false && process.stdout.isTTY,
            ...options
        };
    }
    
    presentError(error, outputStream = process.stderr) {
        const presentation = this.formatErrorForUser(error);
        outputStream.write(presentation + '\n');
        
        this.emit('errorPresented', error, presentation);
    }
    
    formatErrorForUser(error) {
        let output = '';
        
        // Error header with icon and color
        const icon = this.getErrorIcon(error.severity);
        const colorFn = this.getErrorColor(error.severity);
        
        output += colorFn(`${icon} ${error.userMessage || error.message}\n`);
        
        // Error code and category (if verbose or important)
        if (this.shouldShowErrorCode(error)) {
            output += this.dim(`Error Code: ${error.code || 'UNKNOWN'}\n`);
        }
        
        if (this.options.verboseMode && error.category) {
            output += this.dim(`Category: ${error.category}\n`);
        }
        
        // Context information
        if (this.options.showContext && this.hasRelevantContext(error)) {
            output += this.formatContext(error.context);
        }
        
        // Validation errors (special handling)
        if (error.validationErrors && error.validationErrors.length > 0) {
            output += this.formatValidationErrors(error.validationErrors);
        }
        
        // Suggestions
        if (this.options.showSuggestions && error.suggestions && error.suggestions.length > 0) {
            output += this.formatSuggestions(error.suggestions);
        }
        
        // Recovery information
        if (error.isRecoverable && error.isRecoverable()) {
            output += this.formatRecoveryInfo(error);
        }
        
        // Debug information (if verbose)
        if (this.options.verboseMode) {
            output += this.formatDebugInfo(error);
        }
        
        return output.trimEnd();
    }
    
    shouldShowErrorCode(error) {
        return this.options.verboseMode || 
               error.severity === 'critical' || 
               (error.code && !['UNKNOWN_ERROR', 'GENERIC_ERROR'].includes(error.code));
    }
    
    hasRelevantContext(error) {
        if (!error.context || typeof error.context !== 'object') {
            return false;
        }
        
        const relevantKeys = this.extractRelevantContextKeys(error.context);
        return relevantKeys.length > 0;
    }
    
    formatContext(context) {
        const relevantContext = this.extractRelevantContext(context);
        
        if (relevantContext.length === 0) {
            return '';
        }
        
        let output = '\n' + this.dim('Details:\n');
        relevantContext.forEach(([key, value]) => {
            const displayKey = this.formatContextKey(key);
            const displayValue = this.formatContextValue(value);
            output += this.dim(`  ${displayKey}: ${displayValue}\n`);
        });
        
        return output;
    }
    
    extractRelevantContext(context) {
        const importantKeys = [
            'file', 'path', 'filename', 'directory',
            'url', 'endpoint', 'host',
            'command', 'tool', 'server',
            'user', 'session',
            'operation', 'action',
            'resource', 'type'
        ];
        
        const relevant = [];
        
        // First, add important keys that exist
        for (const key of importantKeys) {
            if (context[key] !== undefined && context[key] !== null) {
                relevant.push([key, context[key]]);
            }
        }
        
        // Then add other relevant keys (up to limit)
        const remainingSlots = this.options.maxContextItems - relevant.length;
        if (remainingSlots > 0) {
            const otherKeys = Object.keys(context)
                .filter(key => !importantKeys.includes(key))
                .filter(key => !key.startsWith('_'))
                .filter(key => context[key] !== undefined && context[key] !== null)
                .slice(0, remainingSlots);
                
            otherKeys.forEach(key => {
                relevant.push([key, context[key]]);
            });
        }
        
        return relevant;
    }
    
    extractRelevantContextKeys(context) {
        return this.extractRelevantContext(context).map(([key]) => key);
    }
    
    formatContextKey(key) {
        // Convert camelCase/snake_case to readable format
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/_/g, ' ')
            .replace(/^\w/, c => c.toUpperCase())
            .trim();
    }
    
    formatContextValue(value) {
        if (typeof value === 'string') {
            // Truncate long strings
            return value.length > 100 ? value.substring(0, 97) + '...' : value;
        } else if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                return `[${value.length} items]`;
            } else {
                return util.inspect(value, { depth: 1, compact: true, maxStringLength: 50 });
            }
        } else {
            return String(value);
        }
    }
    
    formatValidationErrors(validationErrors) {
        let output = '\n' + this.cyan('Validation Issues:\n');
        
        validationErrors.forEach((error, index) => {
            const prefix = this.cyan(`  ${index + 1}. `);
            const field = error.field ? `${error.field}: ` : '';
            output += `${prefix}${field}${error.message}\n`;
        });
        
        return output;
    }
    
    formatSuggestions(suggestions) {
        let output = '\n' + this.cyan('Suggestions:\n');
        
        suggestions.forEach((suggestion, index) => {
            const prefix = this.cyan(`  ${index + 1}. `);
            output += `${prefix}${suggestion}\n`;
        });
        
        return output;
    }
    
    formatRecoveryInfo(error) {
        let output = '\n' + this.green('🔄 This error may be recoverable.\n');
        
        if (error.category === 'network' || error.code === 'TIMEOUT') {
            output += this.green('  → Try running the command again\n');
        } else if (error.category === 'auth') {
            output += this.green('  → Check your authentication and try again\n');
        } else {
            output += this.green('  → This operation can be retried\n');
        }
        
        return output;
    }
    
    formatDebugInfo(error) {
        let output = '\n' + this.dim('Debug Information:\n');
        
        if (error.timestamp) {
            const timestamp = new Date(error.timestamp).toISOString();
            output += this.dim(`  Timestamp: ${timestamp}\n`);
        }
        
        if (error.category) {
            output += this.dim(`  Category: ${error.category}\n`);
        }
        
        if (error.severity) {
            output += this.dim(`  Severity: ${error.severity}\n`);
        }
        
        // Stack trace
        if (this.options.showStack && error.stack) {
            output += this.formatStackTrace(error.stack);
        }
        
        return output;
    }
    
    formatStackTrace(stack) {
        let output = '\n' + this.dim('Stack Trace:\n');
        
        const lines = stack.split('\n');
        const relevantLines = lines.slice(0, 10); // Show first 10 lines
        
        relevantLines.forEach(line => {
            output += this.dim(`  ${line}\n`);
        });
        
        if (lines.length > 10) {
            output += this.dim(`  ... ${lines.length - 10} more lines\n`);
        }
        
        return output;
    }
    
    getErrorIcon(severity) {
        const icons = {
            critical: '💥',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            debug: '🐛'
        };
        return icons[severity] || '❗';
    }
    
    getErrorColor(severity) {
        if (!this.options.useColors) {
            return (text) => text;
        }
        
        const colors = {
            critical: this.red,
            error: this.red,
            warning: this.yellow,
            info: this.blue,
            debug: this.dim
        };
        
        return colors[severity] || this.red;
    }
    
    // Color functions (without external dependencies)
    red(text) { return this.options.useColors ? `\x1b[31m${text}\x1b[0m` : text; }
    yellow(text) { return this.options.useColors ? `\x1b[33m${text}\x1b[0m` : text; }
    blue(text) { return this.options.useColors ? `\x1b[34m${text}\x1b[0m` : text; }
    green(text) { return this.options.useColors ? `\x1b[32m${text}\x1b[0m` : text; }
    cyan(text) { return this.options.useColors ? `\x1b[36m${text}\x1b[0m` : text; }
    dim(text) { return this.options.useColors ? `\x1b[90m${text}\x1b[0m` : text; }
    bold(text) { return this.options.useColors ? `\x1b[1m${text}\x1b[0m` : text; }
}

/**
 * Error formatter for React/UI components
 */
class UIErrorPresenter {
    constructor(options = {}) {
        this.options = {
            showStack: options.showStack || process.env.NODE_ENV === 'development',
            maxSuggestions: options.maxSuggestions || 3,
            ...options
        };
    }
    
    formatErrorForUI(error) {
        return {
            title: this.getErrorTitle(error),
            message: error.userMessage || error.message,
            severity: error.severity || 'error',
            code: error.code,
            category: error.category,
            suggestions: this.formatSuggestionsForUI(error.suggestions),
            context: this.formatContextForUI(error.context),
            recoverable: error.isRecoverable ? error.isRecoverable() : false,
            timestamp: error.timestamp,
            stack: this.options.showStack ? error.stack : undefined
        };
    }
    
    getErrorTitle(error) {
        const titles = {
            AuthenticationError: 'Authentication Required',
            NetworkError: 'Connection Problem',
            FileSystemError: 'File Access Error',
            ValidationError: 'Input Validation Failed',
            NotFoundError: 'Resource Not Found',
            PermissionError: 'Access Denied',
            TimeoutError: 'Operation Timed Out',
            ConfigurationError: 'Configuration Error'
        };
        
        return titles[error.constructor.name] || 'An Error Occurred';
    }
    
    formatSuggestionsForUI(suggestions) {
        if (!suggestions || suggestions.length === 0) {
            return [];
        }
        
        return suggestions
            .slice(0, this.options.maxSuggestions)
            .map((suggestion, index) => ({
                id: index,
                text: suggestion,
                action: this.extractActionFromSuggestion(suggestion)
            }));
    }
    
    extractActionFromSuggestion(suggestion) {
        // Try to extract actionable parts from suggestions
        if (suggestion.toLowerCase().includes('try again')) {
            return 'retry';
        } else if (suggestion.toLowerCase().includes('check') || suggestion.toLowerCase().includes('verify')) {
            return 'check';
        } else if (suggestion.toLowerCase().includes('contact')) {
            return 'contact';
        } else {
            return 'info';
        }
    }
    
    formatContextForUI(context) {
        if (!context || typeof context !== 'object') {
            return {};
        }
        
        const formatted = {};
        const importantKeys = ['file', 'path', 'url', 'command', 'resource'];
        
        importantKeys.forEach(key => {
            if (context[key] !== undefined) {
                formatted[key] = String(context[key]);
            }
        });
        
        return formatted;
    }
}

/**
 * Interactive Error Handler for CLI prompts
 */
class InteractiveErrorHandler extends EventEmitter {
    constructor(options = {}) {
        super();
        
        this.options = {
            enableInteraction: options.enableInteraction !== false,
            presenter: options.presenter || new UserErrorPresenter(),
            ...options
        };
    }
    
    async handleError(error, context = {}) {
        // Present the error
        this.options.presenter.presentError(error);
        
        // If the error is not recoverable or interaction is disabled, just return
        if (!error.isRecoverable || !error.isRecoverable() || !this.options.enableInteraction) {
            return { action: 'exit', error };
        }
        
        // Offer interactive recovery options
        return await this.offerRecoveryOptions(error, context);
    }
    
    async offerRecoveryOptions(error, context) {
        const options = this.getRecoveryOptions(error, context);
        
        if (options.length === 0) {
            return { action: 'exit', error };
        }
        
        console.log('\n' + this.options.presenter.cyan('What would you like to do?'));
        
        options.forEach((option, index) => {
            console.log(`  ${index + 1}. ${option.label}`);
        });
        
        console.log(`  ${options.length + 1}. Exit`);
        
        try {
            const choice = await this.getUserChoice(1, options.length + 1);
            
            if (choice === options.length + 1) {
                return { action: 'exit', error };
            }
            
            const selectedOption = options[choice - 1];
            return { action: selectedOption.action, option: selectedOption, error };
            
        } catch (inputError) {
            return { action: 'exit', error: inputError };
        }
    }
    
    getRecoveryOptions(error, context) {
        const options = [];
        
        // Common recovery options based on error type
        if (error instanceof require('./error-types').NetworkError) {
            options.push({ action: 'retry', label: 'Try again' });
        }
        
        if (error instanceof require('./error-types').AuthenticationError) {
            options.push({ action: 'reauth', label: 'Log in again' });
        }
        
        if (error instanceof require('./error-types').NotFoundError) {
            options.push({ action: 'search', label: 'Search for alternatives' });
        }
        
        if (error.suggestions && error.suggestions.length > 0) {
            error.suggestions.slice(0, 2).forEach((suggestion, index) => {
                options.push({
                    action: 'suggestion',
                    label: suggestion,
                    suggestionIndex: index
                });
            });
        }
        
        // Always offer retry if recoverable
        if (options.length === 0) {
            options.push({ action: 'retry', label: 'Try again' });
        }
        
        return options;
    }
    
    async getUserChoice(min, max) {
        return new Promise((resolve, reject) => {
            const readline = require('readline');
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            rl.question('Enter your choice: ', (answer) => {
                rl.close();
                
                const choice = parseInt(answer.trim());
                if (isNaN(choice) || choice < min || choice > max) {
                    reject(new Error('Invalid choice'));
                } else {
                    resolve(choice);
                }
            });
        });
    }
}

module.exports = {
    UserErrorPresenter,
    UIErrorPresenter,
    InteractiveErrorHandler
};