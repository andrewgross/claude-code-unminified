/**
 * Main Interactive Command Handler for Claude Code
 * 
 * This module handles the primary Claude Code functionality - starting interactive
 * sessions, processing prompts, and managing AI conversations.
 * 
 * @module MainCommand
 */

import { EventEmitter } from 'events';
import readline from 'readline';
import chalk from 'chalk';

/**
 * Interactive session state
 * @typedef {Object} SessionState
 * @property {string} id - Unique session identifier
 * @property {Array} messages - Conversation history
 * @property {string} model - AI model being used
 * @property {Object} context - Session context and metadata
 * @property {boolean} active - Whether session is active
 * @property {Date} startTime - Session start time
 * @property {Object} options - Session options
 */

/**
 * Main command handler class for interactive sessions
 */
export class MainCommandHandler extends EventEmitter {
    constructor() {
        super();
        this.currentSession = null;
        this.readline = null;
        this.logger = console;
        this.isProcessing = false;
    }
    
    /**
     * Sets the logger instance
     * @param {Object} logger - Logger instance
     */
    setLogger(logger) {
        this.logger = logger;
    }
    
    /**
     * Handles the main command execution
     * @param {Object} parsedCommand - Parsed command from parser
     * @param {Object} context - Execution context from dispatcher
     * @returns {Promise<Object>} Command execution result
     */
    async handle(parsedCommand, context) {
        try {
            const { prompt, options } = parsedCommand;
            const { stdin } = context;
            
            // Determine session mode
            if (options.resume) {
                return await this.resumeSession(options.resume, prompt, options, context);
            } else if (options.continue) {
                return await this.continueLastSession(prompt, options, context);
            } else if (options.remote) {
                return await this.startRemoteSession(options.remote, prompt, options, context);
            } else if (stdin.hasData) {
                return await this.processPipedInput(stdin.content, prompt, options, context);
            } else if (prompt) {
                return await this.startSessionWithPrompt(prompt, options, context);
            } else {
                return await this.startInteractiveSession(options, context);
            }
            
        } catch (error) {
            return {
                success: false,
                exitCode: 1,
                message: error.message,
                data: { error: error.stack },
                errors: [error.message]
            };
        }
    }
    
    /**
     * Starts a new interactive session
     * @param {Object} options - Session options
     * @param {Object} context - Execution context
     * @returns {Promise<Object>} Execution result
     */
    async startInteractiveSession(options, context) {
        this.logger.log(chalk.cyan('Starting interactive Claude Code session...'));
        this.logger.log(chalk.gray('Type /help for commands, /exit to quit\n'));
        
        // Create new session
        const session = this.createSession('interactive', options, context);
        this.currentSession = session;
        
        // Setup readline interface
        this.readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: chalk.blue('claude> ')
        });
        
        // Handle readline events
        this.setupReadlineHandlers();
        
        // Start the interactive loop
        return new Promise((resolve) => {
            this.readline.prompt();
            
            // Set up session end handler
            this.once('sessionEnd', (result) => {
                resolve(result);
            });
        });
    }
    
    /**
     * Starts a session with an initial prompt
     * @param {string} prompt - Initial prompt
     * @param {Object} options - Session options
     * @param {Object} context - Execution context
     * @returns {Promise<Object>} Execution result
     */
    async startSessionWithPrompt(prompt, options, context) {
        this.logger.log(chalk.cyan('Processing prompt...'));
        
        const session = this.createSession('prompt', options, context);
        this.currentSession = session;
        
        try {
            const response = await this.processPrompt(prompt, session);
            
            // Display response
            this.displayResponse(response);
            
            // Check if we should continue interactively
            if (!options.print && !options.outputFormat) {
                this.logger.log(chalk.gray('\nContinue conversation? (y/N)'));
                const shouldContinue = await this.promptForContinuation();
                
                if (shouldContinue) {
                    return await this.startInteractiveSession(options, context);
                }
            }
            
            return {
                success: true,
                exitCode: 0,
                message: 'Prompt processed successfully',
                data: { 
                    response: response.content,
                    session: session.id,
                    model: session.model 
                }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Processes piped input from stdin
     * @param {string} input - Piped input content
     * @param {string} additionalPrompt - Additional prompt text
     * @param {Object} options - Session options
     * @param {Object} context - Execution context
     * @returns {Promise<Object>} Execution result
     */
    async processPipedInput(input, additionalPrompt, options, context) {
        this.logger.log(chalk.cyan('Processing piped input...'));
        
        const session = this.createSession('piped', options, context);
        this.currentSession = session;
        
        // Combine piped input with additional prompt
        const fullPrompt = this.combineInputAndPrompt(input, additionalPrompt);
        
        try {
            const response = await this.processPrompt(fullPrompt, session);
            
            // Display response based on output format
            this.displayResponse(response, options.outputFormat);
            
            return {
                success: true,
                exitCode: 0,
                message: 'Piped input processed successfully',
                data: { 
                    response: response.content,
                    session: session.id,
                    inputLength: input.length 
                }
            };
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Resumes an existing session
     * @param {string} sessionId - Session ID to resume
     * @param {string} prompt - Optional additional prompt
     * @param {Object} options - Session options
     * @param {Object} context - Execution context
     * @returns {Promise<Object>} Execution result
     */
    async resumeSession(sessionId, prompt, options, context) {
        this.logger.log(chalk.cyan(`Resuming session: ${sessionId}`));
        
        try {
            const session = await this.loadSession(sessionId);
            this.currentSession = session;
            
            this.logger.log(chalk.green(`Session resumed: ${session.messages.length} messages in history`));
            
            if (prompt) {
                const response = await this.processPrompt(prompt, session);
                this.displayResponse(response);
            }
            
            // Start interactive mode
            return await this.startInteractiveSession(options, context);
            
        } catch (error) {
            throw new Error(`Failed to resume session ${sessionId}: ${error.message}`);
        }
    }
    
    /**
     * Continues the last active session
     * @param {string} prompt - Optional additional prompt
     * @param {Object} options - Session options
     * @param {Object} context - Execution context
     * @returns {Promise<Object>} Execution result
     */
    async continueLastSession(prompt, options, context) {
        this.logger.log(chalk.cyan('Continuing last session...'));
        
        try {
            const lastSessionId = await this.getLastSessionId();
            if (!lastSessionId) {
                throw new Error('No previous session found');
            }
            
            return await this.resumeSession(lastSessionId, prompt, options, context);
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Starts a remote session
     * @param {string} endpoint - Remote endpoint URL
     * @param {string} prompt - Optional initial prompt
     * @param {Object} options - Session options
     * @param {Object} context - Execution context
     * @returns {Promise<Object>} Execution result
     */
    async startRemoteSession(endpoint, prompt, options, context) {
        this.logger.log(chalk.cyan(`Connecting to remote session: ${endpoint}`));
        
        // This would implement remote session connection
        // For now, throw not implemented
        throw new Error('Remote sessions not yet implemented');
    }
    
    /**
     * Creates a new session object
     * @param {string} type - Session type
     * @param {Object} options - Session options
     * @param {Object} context - Execution context
     * @returns {SessionState} New session object
     */
    createSession(type, options, context) {
        const sessionId = this.generateSessionId();
        
        return {
            id: sessionId,
            type,
            messages: [],
            model: options.model || this.getDefaultModel(),
            context: {
                workingDirectory: context.workingDirectory,
                environment: this.sanitizeEnvironment(context.environment),
                startTime: new Date(),
                options: options
            },
            active: true,
            startTime: new Date(),
            options
        };
    }
    
    /**
     * Sets up readline event handlers for interactive session
     */
    setupReadlineHandlers() {
        this.readline.on('line', async (input) => {
            const trimmedInput = input.trim();
            
            // Handle special commands
            if (trimmedInput.startsWith('/')) {
                await this.handleSpecialCommand(trimmedInput);
                this.readline.prompt();
                return;
            }
            
            // Skip empty inputs
            if (!trimmedInput) {
                this.readline.prompt();
                return;
            }
            
            // Process normal prompt
            if (!this.isProcessing) {
                await this.handleInteractivePrompt(trimmedInput);
            }
            
            this.readline.prompt();
        });
        
        this.readline.on('close', () => {
            this.endSession();
        });
        
        this.readline.on('SIGINT', () => {
            if (this.isProcessing) {
                this.logger.log(chalk.yellow('\nCancelling current request...'));
                this.cancelCurrentRequest();
            } else {
                this.logger.log(chalk.yellow('\nUse /exit to quit or Ctrl+C again to force exit'));
            }
        });
    }
    
    /**
     * Handles special commands in interactive mode
     * @param {string} command - Special command (starts with /)
     */
    async handleSpecialCommand(command) {
        const [cmd, ...args] = command.slice(1).split(' ');
        
        switch (cmd.toLowerCase()) {
            case 'help':
                this.displayInteractiveHelp();
                break;
                
            case 'exit':
            case 'quit':
                this.endSession();
                break;
                
            case 'clear':
                console.clear();
                this.logger.log(chalk.cyan('Session cleared\n'));
                break;
                
            case 'history':
                this.displayHistory();
                break;
                
            case 'model':
                await this.handleModelCommand(args);
                break;
                
            case 'save':
                await this.handleSaveCommand(args);
                break;
                
            case 'load':
                await this.handleLoadCommand(args);
                break;
                
            case 'status':
                this.displaySessionStatus();
                break;
                
            default:
                this.logger.log(chalk.red(`Unknown command: ${cmd}`));
                this.logger.log(chalk.gray('Type /help for available commands'));
        }
    }
    
    /**
     * Handles interactive prompt processing
     * @param {string} prompt - User prompt
     */
    async handleInteractivePrompt(prompt) {
        this.isProcessing = true;
        
        try {
            this.logger.log(chalk.gray('Processing...'));
            
            const response = await this.processPrompt(prompt, this.currentSession);
            
            console.log(); // Add spacing
            this.displayResponse(response);
            console.log(); // Add spacing
            
        } catch (error) {
            this.logger.log(chalk.red(`Error: ${error.message}`));
            
            if (this.currentSession.options.debug) {
                this.logger.log(chalk.gray(error.stack));
            }
        } finally {
            this.isProcessing = false;
        }
    }
    
    /**
     * Processes a prompt and returns AI response
     * @param {string} prompt - User prompt
     * @param {SessionState} session - Current session
     * @returns {Promise<Object>} AI response
     */
    async processPrompt(prompt, session) {
        // Add user message to session
        const userMessage = {
            role: 'user',
            content: prompt,
            timestamp: new Date()
        };
        session.messages.push(userMessage);
        
        // This would call the actual AI API
        // For now, return a mock response
        const mockResponse = {
            role: 'assistant',
            content: `I received your prompt: "${prompt}"\n\nThis is a mock response from the deobfuscated CLI framework. In the actual implementation, this would call the Claude AI API to process your request.`,
            model: session.model,
            timestamp: new Date()
        };
        
        session.messages.push(mockResponse);
        
        return mockResponse;
    }
    
    /**
     * Displays AI response based on format options
     * @param {Object} response - AI response object
     * @param {string} format - Output format (text, json, stream-json)
     */
    displayResponse(response, format = 'text') {
        switch (format) {
            case 'json':
                console.log(JSON.stringify(response, null, 2));
                break;
                
            case 'stream-json':
                // Stream JSON line by line
                const lines = response.content.split('\n');
                lines.forEach(line => {
                    console.log(JSON.stringify({ content: line, timestamp: response.timestamp }));
                });
                break;
                
            case 'text':
            default:
                console.log(chalk.white(response.content));
                break;
        }
    }
    
    /**
     * Displays interactive help
     */
    displayInteractiveHelp() {
        console.log(chalk.cyan('\n=== Interactive Commands ==='));
        console.log(chalk.white('/help     - Show this help'));
        console.log(chalk.white('/exit     - End session'));
        console.log(chalk.white('/clear    - Clear screen'));
        console.log(chalk.white('/history  - Show conversation history'));
        console.log(chalk.white('/model    - Change AI model'));
        console.log(chalk.white('/save     - Save session'));
        console.log(chalk.white('/load     - Load session'));
        console.log(chalk.white('/status   - Show session status'));
        console.log(chalk.gray('\nJust type your message to chat with Claude\n'));
    }
    
    /**
     * Displays conversation history
     */
    displayHistory() {
        if (!this.currentSession || this.currentSession.messages.length === 0) {
            this.logger.log(chalk.gray('No conversation history'));
            return;
        }
        
        console.log(chalk.cyan('\n=== Conversation History ==='));
        this.currentSession.messages.forEach((msg, index) => {
            const role = msg.role === 'user' ? chalk.blue('You') : chalk.green('Claude');
            const time = msg.timestamp ? chalk.gray(msg.timestamp.toLocaleTimeString()) : '';
            console.log(`${index + 1}. ${role} ${time}: ${msg.content.substring(0, 100)}...`);
        });
        console.log();
    }
    
    /**
     * Displays current session status
     */
    displaySessionStatus() {
        if (!this.currentSession) {
            this.logger.log(chalk.gray('No active session'));
            return;
        }
        
        const session = this.currentSession;
        const duration = Date.now() - session.startTime.getTime();
        const durationStr = this.formatDuration(duration);
        
        console.log(chalk.cyan('\n=== Session Status ==='));
        console.log(`Session ID: ${chalk.white(session.id)}`);
        console.log(`Type: ${chalk.white(session.type)}`);
        console.log(`Model: ${chalk.white(session.model)}`);
        console.log(`Messages: ${chalk.white(session.messages.length)}`);
        console.log(`Duration: ${chalk.white(durationStr)}`);
        console.log(`Working Directory: ${chalk.white(session.context.workingDirectory)}`);
        console.log();
    }
    
    /**
     * Ends the current session
     */
    endSession() {
        if (this.readline) {
            this.readline.close();
        }
        
        if (this.currentSession) {
            this.logger.log(chalk.cyan('\nSession ended.'));
            this.saveSessionToHistory(this.currentSession);
        }
        
        this.emit('sessionEnd', {
            success: true,
            exitCode: 0,
            message: 'Session ended by user',
            data: { 
                sessionId: this.currentSession?.id,
                messageCount: this.currentSession?.messages.length || 0 
            }
        });
    }
    
    /**
     * Combines piped input with additional prompt
     * @param {string} input - Piped input
     * @param {string} prompt - Additional prompt
     * @returns {string} Combined prompt
     */
    combineInputAndPrompt(input, prompt) {
        if (!prompt) {
            return `Please analyze this input:\n\n${input}`;
        }
        
        return `${prompt}\n\nInput to analyze:\n\n${input}`;
    }
    
    /**
     * Generates a unique session ID
     * @returns {string} Session ID
     */
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Gets the default AI model
     * @returns {string} Default model name
     */
    getDefaultModel() {
        return process.env.CLAUDE_DEFAULT_MODEL || 'claude-3-sonnet';
    }
    
    /**
     * Sanitizes environment variables for session context
     * @param {Object} env - Environment variables
     * @returns {Object} Sanitized environment
     */
    sanitizeEnvironment(env) {
        // Remove sensitive environment variables
        const sensitiveKeys = ['CLAUDE_API_KEY', 'PASSWORD', 'SECRET', 'TOKEN'];
        const sanitized = {};
        
        Object.keys(env).forEach(key => {
            if (!sensitiveKeys.some(sensitiveKey => key.toUpperCase().includes(sensitiveKey))) {
                sanitized[key] = env[key];
            }
        });
        
        return sanitized;
    }
    
    /**
     * Formats duration in human-readable format
     * @param {number} ms - Duration in milliseconds
     * @returns {string} Formatted duration
     */
    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }
    
    /**
     * Prompts user for continuation
     * @returns {Promise<boolean>} Whether to continue
     */
    async promptForContinuation() {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            rl.question('', (answer) => {
                rl.close();
                resolve(answer.toLowerCase().startsWith('y'));
            });
        });
    }
    
    /**
     * Saves session to history (mock implementation)
     * @param {SessionState} session - Session to save
     */
    async saveSessionToHistory(session) {
        // This would save to actual storage
        // For now, just log it
        if (session.options.debug) {
            this.logger.log(chalk.gray(`Session ${session.id} saved to history`));
        }
    }
    
    /**
     * Loads session from storage (mock implementation)
     * @param {string} sessionId - Session ID to load
     * @returns {Promise<SessionState>} Loaded session
     */
    async loadSession(sessionId) {
        // This would load from actual storage
        throw new Error(`Session ${sessionId} not found`);
    }
    
    /**
     * Gets the last active session ID (mock implementation)
     * @returns {Promise<string>} Last session ID
     */
    async getLastSessionId() {
        // This would query actual storage
        return null;
    }
    
    /**
     * Cancels the current request
     */
    cancelCurrentRequest() {
        // This would cancel the AI API request
        this.isProcessing = false;
        this.logger.log(chalk.yellow('Request cancelled'));
    }
}

/**
 * Default main command handler instance
 */
export const defaultMainHandler = new MainCommandHandler();

/**
 * Main command handler function for the dispatcher
 * @param {Object} parsedCommand - Parsed command from parser
 * @param {Object} context - Execution context from dispatcher
 * @returns {Promise<Object>} Command execution result
 */
export async function handleMainCommand(parsedCommand, context) {
    return await defaultMainHandler.handle(parsedCommand, context);
}

export default {
    MainCommandHandler,
    handleMainCommand,
    defaultMainHandler
};