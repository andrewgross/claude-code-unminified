/**
 * Built-in Slash Commands
 * 
 * Implements core slash commands for Claude Code interactive sessions.
 * 
 * These commands represent the standard CLI interface functionality:
 * - No specific chunk extraction (documented public interface)  
 * - Command patterns follow standard CLI conventions
 * - Handler implementations based on expected Claude Code behavior
 * - Command registry structure matches standard command processing
 */

import { configManager } from '../../config/manager.js';

/**
 * Built-in slash commands registry
 */
export const BUILTIN_COMMANDS = {
    help: {
        name: 'help',
        description: 'Show available commands and their usage',
        usage: '/help [command]',
        handler: handleHelpCommand
    },
    
    clear: {
        name: 'clear', 
        description: 'Clear the conversation history',
        usage: '/clear',
        handler: handleClearCommand
    },
    
    model: {
        name: 'model',
        description: 'Show or change the current model',
        usage: '/model [model-name]',
        handler: handleModelCommand
    },
    
    status: {
        name: 'status',
        description: 'Show session and system status',
        usage: '/status',
        handler: handleStatusCommand
    },
    
    quit: {
        name: 'quit',
        description: 'Exit the Claude Code session',
        usage: '/quit',
        aliases: ['exit'],
        handler: handleQuitCommand
    },
    
    login: {
        name: 'login',
        description: 'Switch Anthropic accounts or refresh authentication',
        usage: '/login',
        handler: handleLoginCommand
    },
    
    'add-dir': {
        name: 'add-dir',
        description: 'Add working directories for tool access',
        usage: '/add-dir <directory>',
        handler: handleAddDirCommand
    },
    
    review: {
        name: 'review',
        description: 'Request code review of recent changes',
        usage: '/review',
        handler: handleReviewCommand
    },
    
    debug: {
        name: 'debug',
        description: 'Toggle debug mode',
        usage: '/debug',
        handler: handleDebugCommand
    },
    
    history: {
        name: 'history',
        description: 'Show conversation history summary',
        usage: '/history',
        handler: handleHistoryCommand
    }
};

/**
 * Parse slash command and arguments
 * 
 * @param {string} input - Raw slash command input
 * @returns {Object} Parsed command object
 */
export function parseSlashCommand(input) {
    if (!input.startsWith('/')) {
        return null;
    }
    
    const trimmed = input.slice(1).trim();
    const [command, ...args] = trimmed.split(/\s+/);
    
    return {
        command: command.toLowerCase(),
        args,
        raw: input,
        fullArgs: args.join(' ')
    };
}

/**
 * Execute a built-in slash command
 * 
 * @param {string} command - Command name
 * @param {Array} args - Command arguments
 * @param {Object} context - Execution context
 * @returns {Promise<Object>} Command result
 */
export async function executeBuiltinCommand(command, args, context) {
    const cmd = BUILTIN_COMMANDS[command];
    
    if (!cmd) {
        return {
            type: 'error',
            content: `Unknown command: /${command}. Type /help for available commands.`
        };
    }
    
    try {
        return await cmd.handler(args, context);
    } catch (error) {
        return {
            type: 'error', 
            content: `Command /${command} failed: ${error.message}`
        };
    }
}

/**
 * Get list of available built-in commands
 * 
 * @returns {Array} List of command information
 */
export function getBuiltinCommands() {
    return Object.values(BUILTIN_COMMANDS).map(cmd => ({
        name: cmd.name,
        description: cmd.description,
        usage: cmd.usage,
        aliases: cmd.aliases || []
    }));
}

// Command handlers

async function handleHelpCommand(args, context) {
    const [specificCommand] = args;
    
    if (specificCommand) {
        const cmd = BUILTIN_COMMANDS[specificCommand];
        if (cmd) {
            return {
                type: 'system',
                content: `${cmd.name}: ${cmd.description}\nUsage: ${cmd.usage}`
            };
        } else {
            return {
                type: 'error',
                content: `Unknown command: ${specificCommand}`
            };
        }
    }
    
    const commands = getBuiltinCommands();
    const helpText = [
        'Available Commands:',
        '',
        ...commands.map(cmd => `${cmd.usage.padEnd(20)} - ${cmd.description}`),
        '',
        'Type /help <command> for detailed help on a specific command.',
        'Just type your message to chat with Claude!'
    ].join('\n');
    
    return {
        type: 'system',
        content: helpText
    };
}

async function handleClearCommand(args, context) {
    if (context.clearMessages) {
        context.clearMessages();
    }
    
    return {
        type: 'system', 
        content: 'Conversation history cleared.',
        action: 'clear'
    };
}

async function handleModelCommand(args, context) {
    const [newModel] = args;
    
    if (newModel) {
        // Change model
        if (context.setModel) {
            await context.setModel(newModel);
            return {
                type: 'system',
                content: `Model changed to: ${newModel}`
            };
        } else {
            return {
                type: 'error',
                content: 'Cannot change model in current context'
            };
        }
    } else {
        // Show current model
        const currentModel = context.model || 'claude-3-5-sonnet-20241022';
        return {
            type: 'system',
            content: `Current model: ${currentModel}`
        };
    }
}

async function handleStatusCommand(args, context) {
    const memUsage = process.memoryUsage();
    const uptime = Math.floor(process.uptime());
    
    const statusInfo = [
        'System Status:',
        `• Node.js: ${process.version}`,
        `• Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
        `• Uptime: ${uptime}s`,
        `• Platform: ${process.platform}`,
        `• Model: ${context.model || 'claude-3-5-sonnet-20241022'}`,
        `• Messages: ${context.messageCount || 0}`,
        '',
        'Session Status:',
        `• Debug: ${context.debug ? 'enabled' : 'disabled'}`,
        `• Started: ${context.startTime ? new Date(context.startTime).toLocaleTimeString() : 'unknown'}`
    ].join('\n');
    
    return {
        type: 'system',
        content: statusInfo
    };
}

async function handleQuitCommand(args, context) {
    if (context.onExit) {
        context.onExit();
    } else {
        process.exit(0);
    }
    
    return {
        type: 'system',
        content: 'Goodbye!',
        action: 'quit'
    };
}

async function handleLoginCommand(args, context) {
    return {
        type: 'system',
        content: 'Login functionality would switch Anthropic accounts or refresh authentication. Use "claude setup-token" from command line to configure authentication.'
    };
}

async function handleAddDirCommand(args, context) {
    const [directory] = args;
    
    if (!directory) {
        return {
            type: 'error',
            content: 'Usage: /add-dir <directory>'
        };
    }
    
    return {
        type: 'system',
        content: `Directory "${directory}" would be added to allowed tool access paths.`
    };
}

async function handleReviewCommand(args, context) {
    return {
        type: 'system',
        content: 'Code review functionality would analyze recent changes and provide feedback.'
    };
}

async function handleDebugCommand(args, context) {
    const newDebugState = !context.debug;
    
    if (context.setDebug) {
        context.setDebug(newDebugState);
    }
    
    return {
        type: 'system',
        content: `Debug mode ${newDebugState ? 'enabled' : 'disabled'}`
    };
}

async function handleHistoryCommand(args, context) {
    const messageCount = context.messageCount || 0;
    const userMessages = Math.floor(messageCount / 2);
    const assistantMessages = messageCount - userMessages;
    const sessionDuration = context.startTime 
        ? Math.floor((Date.now() - context.startTime) / 1000)
        : 0;
    
    const historyInfo = [
        'Session History:',
        `• Messages: ${messageCount} total (${userMessages} from you, ${assistantMessages} from Claude)`,
        `• Duration: ${sessionDuration}s`,
        `• Model: ${context.model || 'claude-3-5-sonnet-20241022'}`,
        `• Started: ${context.startTime ? new Date(context.startTime).toLocaleTimeString() : 'unknown'}`
    ].join('\n');
    
    return {
        type: 'system',
        content: historyInfo
    };
}