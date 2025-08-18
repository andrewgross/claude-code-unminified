/**
 * CLI Dispatcher Module for Claude Code
 * 
 * This module handles command routing and execution dispatch.
 * It determines which command handler should process the parsed arguments
 * and manages the overall command execution flow.
 * 
 * @module CLIDispatcher
 */

import { performance } from 'perf_hooks';
import { processStdinInput } from './parser.js';

/**
 * Command execution context passed to command handlers
 * @typedef {Object} ExecutionContext
 * @property {Object} options - Global CLI options
 * @property {string} workingDirectory - Current working directory
 * @property {Object} environment - Environment variables
 * @property {Function} logger - Logging function
 * @property {AbortController} abortController - For cancellation support
 * @property {Object} stdin - Stdin content if piped
 */

/**
 * Command execution result
 * @typedef {Object} ExecutionResult
 * @property {boolean} success - Whether command executed successfully
 * @property {number} exitCode - Exit code (0 for success)
 * @property {string} message - Result message
 * @property {Object} data - Additional result data
 * @property {number} duration - Execution time in milliseconds
 * @property {Array} errors - Any errors encountered
 * @property {Array} warnings - Any warnings generated
 */

/**
 * Available command types for routing
 */
export const COMMAND_TYPES = {
    MAIN: 'main',
    CONFIG: 'config',
    MCP: 'mcp',
    SYSTEM: 'system',
    ERROR: 'error'
};

/**
 * Command aliases for common shortcuts
 */
export const COMMAND_ALIASES = {
    'c': 'config',
    'm': 'mcp',
    's': 'mcp serve'
};

/**
 * Main command dispatcher class
 */
export class CommandDispatcher {
    constructor() {
        this.commandHandlers = new Map();
        this.middlewares = [];
        this.abortController = new AbortController();
        this.logger = console; // Default logger, can be replaced
    }
    
    /**
     * Registers a command handler for a specific command type
     * @param {string} commandType - The command type to handle
     * @param {Function} handler - The handler function
     */
    registerHandler(commandType, handler) {
        if (typeof handler !== 'function') {
            throw new Error('Command handler must be a function');
        }
        this.commandHandlers.set(commandType, handler);
    }
    
    /**
     * Registers middleware to run before command execution
     * @param {Function} middleware - Middleware function
     */
    registerMiddleware(middleware) {
        if (typeof middleware !== 'function') {
            throw new Error('Middleware must be a function');
        }
        this.middlewares.push(middleware);
    }
    
    /**
     * Sets the logger instance
     * @param {Object} logger - Logger instance with log, error, warn, debug methods
     */
    setLogger(logger) {
        this.logger = logger;
    }
    
    /**
     * Resolves command aliases to their full command names
     * @param {string} command - Command to resolve
     * @returns {string} Resolved command name
     */
    resolveAlias(command) {
        return COMMAND_ALIASES[command] || command;
    }
    
    /**
     * Creates execution context for command handlers
     * @param {Object} parsedCommand - Parsed command from parser
     * @returns {Promise<ExecutionContext>} Execution context
     */
    async createExecutionContext(parsedCommand) {
        const stdinContent = await processStdinInput();
        
        return {
            options: parsedCommand.options || {},
            workingDirectory: process.cwd(),
            environment: process.env,
            logger: this.logger,
            abortController: this.abortController,
            stdin: stdinContent ? { content: stdinContent, hasData: true } : { hasData: false },
            parsedCommand,
            startTime: performance.now()
        };
    }
    
    /**
     * Runs registered middleware in sequence
     * @param {ExecutionContext} context - Execution context
     * @returns {Promise<ExecutionContext>} Modified context
     */
    async runMiddleware(context) {
        let currentContext = context;
        
        for (const middleware of this.middlewares) {
            try {
                currentContext = await middleware(currentContext) || currentContext;
            } catch (error) {
                this.logger.error('Middleware error:', error);
                throw new Error(`Middleware failed: ${error.message}`);
            }
        }
        
        return currentContext;
    }
    
    /**
     * Determines the command type from parsed arguments
     * @param {Object} parsedCommand - Parsed command structure
     * @returns {string} Command type
     */
    determineCommandType(parsedCommand) {
        if (parsedCommand.type === 'error') {
            return COMMAND_TYPES.ERROR;
        }
        
        if (parsedCommand.type) {
            return parsedCommand.type;
        }
        
        // Fallback to main command
        return COMMAND_TYPES.MAIN;
    }
    
    /**
     * Executes pre-command validation and setup
     * @param {Object} parsedCommand - Parsed command structure
     * @param {ExecutionContext} context - Execution context
     * @returns {Promise<Object>} Validation result
     */
    async preExecutionValidation(parsedCommand, context) {
        const result = {
            success: true,
            errors: [],
            warnings: []
        };
        
        // Check for required authentication for certain commands
        const authRequiredCommands = ['mcp', 'remote'];
        if (authRequiredCommands.includes(parsedCommand.type) && !process.env.CLAUDE_API_KEY) {
            result.errors.push('Authentication required. Please set CLAUDE_API_KEY or run setup-token command.');
            result.success = false;
        }
        
        // Check for required permissions
        if (parsedCommand.type === 'system' && process.platform === 'win32') {
            // Add Windows-specific validation
            result.warnings.push('System commands may require administrator privileges on Windows.');
        }
        
        // Validate working directory access
        try {
            await import('fs').then(fs => fs.promises.access(context.workingDirectory));
        } catch (error) {
            result.errors.push(`Cannot access working directory: ${context.workingDirectory}`);
            result.success = false;
        }
        
        return result;
    }
    
    /**
     * Handles command execution errors gracefully
     * @param {Error} error - The error that occurred
     * @param {string} commandType - The command type being executed
     * @param {ExecutionContext} context - Execution context
     * @returns {ExecutionResult} Error result
     */
    handleExecutionError(error, commandType, context) {
        const duration = performance.now() - context.startTime;
        
        this.logger.error(`Command execution failed [${commandType}]:`, error);
        
        // Provide helpful error suggestions
        const suggestions = this.generateErrorSuggestions(error, commandType);
        
        return {
            success: false,
            exitCode: 1,
            message: error.message || 'Command execution failed',
            data: {
                commandType,
                suggestions,
                stack: context.options.debug ? error.stack : undefined
            },
            duration,
            errors: [error.message],
            warnings: []
        };
    }
    
    /**
     * Generates helpful suggestions based on error type
     * @param {Error} error - The error that occurred
     * @param {string} commandType - The command type
     * @returns {Array<string>} Array of suggestions
     */
    generateErrorSuggestions(error, commandType) {
        const suggestions = [];
        
        if (error.code === 'ENOENT') {
            suggestions.push('Check if the required files or directories exist');
            suggestions.push('Verify your current working directory');
        }
        
        if (error.code === 'EACCES') {
            suggestions.push('Check file permissions');
            suggestions.push('Try running with appropriate privileges');
        }
        
        if (error.message.includes('authentication')) {
            suggestions.push('Run "claude setup-token" to configure authentication');
            suggestions.push('Check your API key configuration');
        }
        
        if (error.message.includes('network') || error.message.includes('timeout')) {
            suggestions.push('Check your internet connection');
            suggestions.push('Verify proxy settings if applicable');
        }
        
        // Command-specific suggestions
        switch (commandType) {
            case COMMAND_TYPES.MCP:
                suggestions.push('Try "claude mcp list" to see available servers');
                suggestions.push('Check MCP server configuration');
                break;
            case COMMAND_TYPES.CONFIG:
                suggestions.push('Use "claude config list" to see available options');
                suggestions.push('Check configuration file permissions');
                break;
        }
        
        return suggestions;
    }
    
    /**
     * Main dispatch method that routes commands to appropriate handlers
     * @param {Object} parsedCommand - Parsed command from parser
     * @returns {Promise<ExecutionResult>} Command execution result
     */
    async dispatch(parsedCommand) {
        const startTime = performance.now();
        
        try {
            // Create execution context
            const context = await this.createExecutionContext(parsedCommand);
            
            // Run middleware
            const enhancedContext = await this.runMiddleware(context);
            
            // Determine command type
            const commandType = this.determineCommandType(parsedCommand);
            
            // Pre-execution validation
            const validation = await this.preExecutionValidation(parsedCommand, enhancedContext);
            if (!validation.success) {
                return {
                    success: false,
                    exitCode: 1,
                    message: 'Pre-execution validation failed',
                    data: { validation },
                    duration: performance.now() - startTime,
                    errors: validation.errors,
                    warnings: validation.warnings
                };
            }
            
            // Get command handler
            const handler = this.commandHandlers.get(commandType);
            if (!handler) {
                throw new Error(`No handler registered for command type: ${commandType}`);
            }
            
            // Execute command
            this.logger.debug && this.logger.debug(`Executing command: ${commandType}`);
            const result = await handler(parsedCommand, enhancedContext);
            
            // Ensure result has required properties
            const duration = performance.now() - startTime;
            return {
                success: true,
                exitCode: 0,
                message: 'Command executed successfully',
                data: {},
                duration,
                errors: [],
                warnings: validation.warnings,
                ...result
            };
            
        } catch (error) {
            return this.handleExecutionError(error, 
                this.determineCommandType(parsedCommand), 
                { startTime, options: parsedCommand.options || {} });
        }
    }
    
    /**
     * Cancels the current command execution
     */
    cancel() {
        this.abortController.abort();
        this.logger.warn('Command execution cancelled by user');
    }
    
    /**
     * Cleans up resources after command execution
     */
    cleanup() {
        // Reset abort controller for next command
        this.abortController = new AbortController();
    }
}

/**
 * Default dispatcher instance
 */
export const defaultDispatcher = new CommandDispatcher();

/**
 * Convenience function to dispatch a command using the default dispatcher
 * @param {Object} parsedCommand - Parsed command from parser
 * @returns {Promise<ExecutionResult>} Command execution result
 */
export async function dispatchCommand(parsedCommand) {
    return await defaultDispatcher.dispatch(parsedCommand);
}

/**
 * Registers a command handler with the default dispatcher
 * @param {string} commandType - Command type to handle
 * @param {Function} handler - Handler function
 */
export function registerCommandHandler(commandType, handler) {
    defaultDispatcher.registerHandler(commandType, handler);
}

/**
 * Registers middleware with the default dispatcher
 * @param {Function} middleware - Middleware function
 */
export function registerMiddleware(middleware) {
    defaultDispatcher.registerMiddleware(middleware);
}

/**
 * Authentication middleware
 * @param {ExecutionContext} context - Execution context
 * @returns {Promise<ExecutionContext>} Modified context
 */
export async function authenticationMiddleware(context) {
    // Add authentication information to context
    context.auth = {
        hasApiKey: !!process.env.CLAUDE_API_KEY,
        apiKeySource: process.env.CLAUDE_API_KEY ? 'environment' : null
    };
    
    return context;
}

/**
 * Logging middleware
 * @param {ExecutionContext} context - Execution context
 * @returns {Promise<ExecutionContext>} Modified context
 */
export async function loggingMiddleware(context) {
    const { options, parsedCommand } = context;
    
    if (options.verbose || options.debug) {
        context.logger.log(`Executing command: ${parsedCommand.type || 'main'}`);
        context.logger.log(`Working directory: ${context.workingDirectory}`);
        
        if (options.debug) {
            context.logger.log(`Command options:`, options);
            context.logger.log(`Environment:`, Object.keys(context.environment).length, 'variables');
        }
    }
    
    return context;
}

// Register default middleware
registerMiddleware(authenticationMiddleware);
registerMiddleware(loggingMiddleware);

export default {
    CommandDispatcher,
    dispatchCommand,
    registerCommandHandler,
    registerMiddleware,
    COMMAND_TYPES,
    COMMAND_ALIASES
};