/**
 * Interactive Session Handler
 * 
 * Handles the default interactive mode for Claude Code CLI.
 * Provides a simplified terminal-based chat interface.
 */

import * as readline from 'readline';
import { tokenManager } from '../auth/token.js';
import { configManager } from '../../config/manager.js';

/**
 * Initialize an interactive session with Claude
 * 
 * @param {string} initialPrompt - Optional initial prompt
 * @param {object} options - Session options
 */
export async function initializeInteractiveSession(initialPrompt, options) {
    console.log('🤖 Claude Code - Interactive Session');
    console.log('=====================================\n');
    
    // Check authentication
    const isAuthenticated = await tokenManager.isAuthenticated();
    if (!isAuthenticated) {
        console.log('❌ No authentication token found');
        console.log('Please run "claude setup-token" to configure authentication\n');
        process.exit(1);
    }
    
    // Get configuration
    const config = configManager.list();
    const model = options.model || config.model || 'claude-3-5-sonnet-20241022';
    
    console.log(`✅ Authenticated | Model: ${model} | Theme: ${config.theme}`);
    console.log('💡 Type /help for commands, /quit to exit\n');
    
    // Initialize session state
    const session = new InteractiveSession({
        model,
        debug: options.debug,
        verbose: options.verbose,
        initialPrompt
    });
    
    await session.start();
}

/**
 * Interactive Session Class
 * Manages the conversational flow and state
 */
class InteractiveSession {
    constructor(options) {
        this.model = options.model;
        this.debug = options.debug;
        this.verbose = options.verbose;
        this.initialPrompt = options.initialPrompt;
        this.conversationHistory = [];
        this.rl = null;
    }
    
    /**
     * Start the interactive session
     */
    async start() {
        // Create readline interface
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '🤖 Claude: '
        });
        
        // Handle process termination
        this.rl.on('SIGINT', () => {
            console.log('\n\nGoodbye! 👋');
            process.exit(0);
        });
        
        // Handle line input
        this.rl.on('line', async (input) => {
            await this.handleUserInput(input.trim());
        });
        
        // Process initial prompt if provided
        if (this.initialPrompt) {
            console.log(`User: ${this.initialPrompt}\n`);
            await this.processPrompt(this.initialPrompt);
        }
        
        // Start the prompt
        this.showPrompt();
    }
    
    /**
     * Handle user input from readline
     * @param {string} input - User input
     */
    async handleUserInput(input) {
        if (!input) {
            this.showPrompt();
            return;
        }
        
        // Handle commands
        if (input.startsWith('/')) {
            await this.handleCommand(input);
            return;
        }
        
        // Process as regular prompt
        await this.processPrompt(input);
    }
    
    /**
     * Handle special commands
     * @param {string} command - Command string
     */
    async handleCommand(command) {
        const cmd = command.toLowerCase();
        
        switch (cmd) {
            case '/help':
                this.showHelp();
                break;
                
            case '/quit':
            case '/exit':
                console.log('Goodbye! 👋');
                process.exit(0);
                break;
                
            case '/clear':
                console.clear();
                console.log('🤖 Claude Code - Interactive Session');
                console.log('=====================================\n');
                console.log('Conversation history cleared.\n');
                this.conversationHistory = [];
                break;
                
            case '/history':
                this.showHistory();
                break;
                
            case '/model':
                console.log(`Current model: ${this.model}`);
                break;
                
            case '/debug':
                this.debug = !this.debug;
                console.log(`Debug mode ${this.debug ? 'enabled' : 'disabled'}`);
                break;
                
            default:
                console.log(`Unknown command: ${command}`);
                console.log('Type /help for available commands');
        }
        
        console.log();
        this.showPrompt();
    }
    
    /**
     * Process a user prompt
     * @param {string} prompt - User prompt
     */
    async processPrompt(prompt) {
        try {
            // Add user message to history
            this.conversationHistory.push({
                role: 'user',
                content: prompt,
                timestamp: Date.now()
            });
            
            if (this.debug) {
                console.log(`Debug: Processing prompt with model ${this.model}`);
            }
            
            // Simulate Claude API call
            console.log('🤔 Claude is thinking...\n');
            
            const response = await this.simulateClaudeAPI(prompt);
            
            // Display response
            console.log(`Claude: ${response.content}\n`);
            
            // Add assistant response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: response.content,
                timestamp: Date.now()
            });
            
            if (this.debug) {
                console.log(`Debug: Response tokens: ${response.usage?.output_tokens || 'unknown'}`);
                console.log();
            }
            
        } catch (error) {
            console.log(`Error: ${error.message}\n`);
            
            if (this.debug) {
                console.log(`Debug: ${error.stack}\n`);
            }
        }
        
        this.showPrompt();
    }
    
    /**
     * Simulate Claude API call (placeholder)
     * @param {string} prompt - User prompt
     * @returns {object} Simulated response
     */
    async simulateClaudeAPI(prompt) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const responses = [
            `I understand you asked: "${prompt}"\n\n⚠️ This is a simulated response from the interactive session handler. The actual Claude API integration is not yet implemented.\n\nIn a full implementation, this would:\n• Send your prompt to the Claude API\n• Stream the response in real-time\n• Handle tool calls and code execution\n• Maintain conversation context\n\nYour conversation history is being tracked locally for this demo.`,
            
            `Thanks for the message: "${prompt}"\n\nI'm currently running in demo mode. Here are some things you can try:\n• /help - Show available commands\n• /history - View conversation history\n• /model - Show current model\n• /clear - Clear conversation\n• /quit - Exit Claude Code\n\nThe full Claude API integration will be implemented in a future version.`,
            
            `You said: "${prompt}"\n\nThis interactive session is showing how the clean Claude Code architecture works:\n\n✅ Authentication system working\n✅ Configuration management working  \n✅ Interactive session framework ready\n⏳ Claude API integration pending\n⏳ React UI components pending\n⏳ Tool execution pending\n\nType /help for more commands.`
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        return {
            content: randomResponse,
            usage: {
                input_tokens: Math.floor(prompt.length / 4),
                output_tokens: Math.floor(randomResponse.length / 4)
            },
            model: this.model
        };
    }
    
    /**
     * Show command help
     */
    showHelp() {
        console.log('Available Commands:');
        console.log('==================');
        console.log('/help     - Show this help message');
        console.log('/quit     - Exit Claude Code');
        console.log('/clear    - Clear conversation history');
        console.log('/history  - Show conversation history');
        console.log('/model    - Show current model');
        console.log('/debug    - Toggle debug mode');
        console.log('');
        console.log('Just type your message to chat with Claude!');
    }
    
    /**
     * Show conversation history
     */
    showHistory() {
        if (this.conversationHistory.length === 0) {
            console.log('No conversation history yet.');
            return;
        }
        
        console.log('Conversation History:');
        console.log('====================');
        
        for (const [index, message] of this.conversationHistory.entries()) {
            const timestamp = new Date(message.timestamp).toLocaleTimeString();
            const role = message.role === 'user' ? 'You' : 'Claude';
            console.log(`${index + 1}. [${timestamp}] ${role}: ${message.content.substring(0, 100)}${message.content.length > 100 ? '...' : ''}`);
        }
    }
    
    /**
     * Show the input prompt
     */
    showPrompt() {
        if (this.rl) {
            this.rl.prompt();
        }
    }
}