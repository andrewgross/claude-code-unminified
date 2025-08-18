/**
 * CLI Help System Module for Claude Code
 * 
 * This module provides comprehensive help functionality including auto-generated help,
 * contextual assistance, example generation, and interactive help features.
 * 
 * @module CLIHelp
 */

import chalk from 'chalk';
import { COMMAND_TYPES } from './dispatcher.js';

/**
 * Help content structure
 * @typedef {Object} HelpContent
 * @property {string} command - Command name
 * @property {string} description - Command description
 * @property {string} usage - Usage pattern
 * @property {Array} options - Available options
 * @property {Array} examples - Usage examples
 * @property {Array} seeAlso - Related commands
 */

/**
 * Color theme for help output
 */
const HELP_COLORS = {
    title: chalk.bold.cyan,
    command: chalk.green,
    option: chalk.yellow,
    argument: chalk.blue,
    description: chalk.white,
    example: chalk.gray,
    error: chalk.red,
    warning: chalk.yellow,
    success: chalk.green
};

/**
 * Help system class that manages all help-related functionality
 */
export class HelpSystem {
    constructor() {
        this.helpContent = new Map();
        this.aliases = new Map();
        this.examples = new Map();
        this.setupDefaultContent();
    }
    
    /**
     * Sets up default help content for all commands
     */
    setupDefaultContent() {
        // Main command help
        this.addHelpContent('main', {
            command: 'claude',
            description: 'AI-powered development assistant that helps with coding, debugging, and project management',
            usage: 'claude [prompt] [options]',
            options: [
                { flag: '--verbose', description: 'Enable verbose logging' },
                { flag: '--debug', description: 'Enable debug mode with detailed output' },
                { flag: '--print', description: 'Enable print mode for output formatting' },
                { flag: '--output-format <format>', description: 'Set output format (json, stream-json, text)' },
                { flag: '--input-format <format>', description: 'Set input format (json, stream-json, text)' },
                { flag: '--max-turns <number>', description: 'Limit maximum conversation turns' },
                { flag: '--model <model>', description: 'Specify AI model to use' },
                { flag: '--continue', description: 'Continue previous session' },
                { flag: '--resume <sessionId>', description: 'Resume specific session by ID' },
                { flag: '--teleport [destination]', description: 'Teleport session functionality' },
                { flag: '--remote <endpoint>', description: 'Connect to remote Claude Code instance' }
            ],
            examples: [
                'claude "Help me debug this JavaScript function"',
                'claude --model claude-3-sonnet "Write a Python script"',
                'claude --continue',
                'claude --resume abc123',
                'echo "code to review" | claude'
            ],
            seeAlso: ['config', 'mcp', 'doctor']
        });
        
        // Config command help
        this.addHelpContent('config', {
            command: 'claude config',
            description: 'Manage Claude Code configuration settings',
            usage: 'claude config <action> [args] [options]',
            options: [
                { flag: '-g, --global', description: 'Apply changes to global configuration scope' }
            ],
            examples: [
                'claude config list',
                'claude config get model',
                'claude config set model claude-3-sonnet',
                'claude config add tracePropagationTargets localhost',
                'claude config remove tracePropagationTargets localhost',
                'claude config set --global apiKey your-api-key'
            ],
            seeAlso: ['setup-token', 'doctor']
        });
        
        // MCP command help
        this.addHelpContent('mcp', {
            command: 'claude mcp',
            description: 'Manage MCP (Model Context Protocol) servers for extended functionality',
            usage: 'claude mcp <action> [args] [options]',
            options: [
                { flag: '-s, --scope <scope>', description: 'Configuration scope (local, user, project)' },
                { flag: '-t, --transport <transport>', description: 'Transport type (stdio, sse, http)' },
                { flag: '-e, --env <env...>', description: 'Set environment variables' },
                { flag: '-H, --header <header...>', description: 'Set WebSocket headers' },
                { flag: '-d, --debug', description: 'Enable debug mode for server operations' },
                { flag: '--verbose', description: 'Enable verbose output' }
            ],
            examples: [
                'claude mcp serve',
                'claude mcp list',
                'claude mcp add myserver "python server.py"',
                'claude mcp get myserver',
                'claude mcp remove myserver',
                'claude mcp add-json myserver \'{"command": "node", "args": ["server.js"]}\'',
                'claude mcp add-from-claude-desktop'
            ],
            seeAlso: ['config', 'doctor']
        });
        
        // System commands help
        this.addHelpContent('system', {
            command: 'claude system',
            description: 'System maintenance and setup commands',
            usage: 'claude <system-command> [options]',
            examples: [
                'claude setup-token',
                'claude doctor',
                'claude update',
                'claude install --force',
                'claude migrate-installer'
            ],
            seeAlso: ['config', 'mcp']
        });
    }
    
    /**
     * Adds help content for a specific command
     * @param {string} command - Command name
     * @param {HelpContent} content - Help content object
     */
    addHelpContent(command, content) {
        this.helpContent.set(command, content);
    }
    
    /**
     * Adds command alias for help lookup
     * @param {string} alias - Alias name
     * @param {string} command - Actual command name
     */
    addAlias(alias, command) {
        this.aliases.set(alias, command);
    }
    
    /**
     * Adds example for a command
     * @param {string} command - Command name
     * @param {string} example - Example usage
     * @param {string} description - Example description
     */
    addExample(command, example, description) {
        if (!this.examples.has(command)) {
            this.examples.set(command, []);
        }
        this.examples.get(command).push({ example, description });
    }
    
    /**
     * Formats and displays help for a specific command
     * @param {string} command - Command to show help for
     * @returns {string} Formatted help text
     */
    formatHelp(command) {
        const resolvedCommand = this.aliases.get(command) || command;
        const content = this.helpContent.get(resolvedCommand);
        
        if (!content) {
            return this.formatCommandNotFound(command);
        }
        
        let help = '';
        
        // Title and description
        help += `${HELP_COLORS.title(content.command)}\n`;
        help += `${content.description}\n\n`;
        
        // Usage
        help += `${HELP_COLORS.title('USAGE:')}\n`;
        help += `  ${HELP_COLORS.command(content.usage)}\n\n`;
        
        // Options
        if (content.options && content.options.length > 0) {
            help += `${HELP_COLORS.title('OPTIONS:')}\n`;
            const maxFlagLength = Math.max(...content.options.map(opt => opt.flag.length));
            
            content.options.forEach(option => {
                const flag = HELP_COLORS.option(option.flag.padEnd(maxFlagLength));
                const desc = HELP_COLORS.description(option.description);
                help += `  ${flag}  ${desc}\n`;
            });
            help += '\n';
        }
        
        // Examples
        if (content.examples && content.examples.length > 0) {
            help += `${HELP_COLORS.title('EXAMPLES:')}\n`;
            content.examples.forEach(example => {
                help += `  ${HELP_COLORS.example(example)}\n`;
            });
            help += '\n';
        }
        
        // Additional examples from examples map
        const additionalExamples = this.examples.get(resolvedCommand);
        if (additionalExamples && additionalExamples.length > 0) {
            help += `${HELP_COLORS.title('MORE EXAMPLES:')}\n`;
            additionalExamples.forEach(({ example, description }) => {
                help += `  ${HELP_COLORS.example(example)}\n`;
                if (description) {
                    help += `    ${HELP_COLORS.description(description)}\n`;
                }
            });
            help += '\n';
        }
        
        // See also
        if (content.seeAlso && content.seeAlso.length > 0) {
            help += `${HELP_COLORS.title('SEE ALSO:')}\n`;
            help += `  ${content.seeAlso.map(cmd => HELP_COLORS.command(cmd)).join(', ')}\n\n`;
        }
        
        return help;
    }
    
    /**
     * Formats error message for unknown commands
     * @param {string} command - Unknown command
     * @returns {string} Formatted error message
     */
    formatCommandNotFound(command) {
        const suggestions = this.suggestCommands(command);
        let message = `${HELP_COLORS.error('Error:')} Unknown command '${command}'\n\n`;
        
        if (suggestions.length > 0) {
            message += `${HELP_COLORS.title('Did you mean:')}\n`;
            suggestions.forEach(suggestion => {
                message += `  ${HELP_COLORS.command(suggestion)}\n`;
            });
            message += '\n';
        }
        
        message += `${HELP_COLORS.title('Available commands:')}\n`;
        message += this.formatCommandList();
        
        return message;
    }
    
    /**
     * Suggests similar commands based on input
     * @param {string} input - User input
     * @returns {Array<string>} Array of suggested commands
     */
    suggestCommands(input) {
        const commands = Array.from(this.helpContent.keys());
        const aliases = Array.from(this.aliases.keys());
        const allCommands = [...commands, ...aliases];
        
        // Simple string similarity matching
        const suggestions = allCommands.filter(cmd => {
            const distance = this.calculateLevenshteinDistance(input.toLowerCase(), cmd.toLowerCase());
            return distance <= 2 && distance < cmd.length;
        });
        
        return suggestions.slice(0, 3); // Limit to top 3 suggestions
    }
    
    /**
     * Calculates Levenshtein distance between two strings
     * @param {string} a - First string
     * @param {string} b - Second string
     * @returns {number} Edit distance
     */
    calculateLevenshteinDistance(a, b) {
        const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
        
        for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
        for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
        
        for (let j = 1; j <= b.length; j++) {
            for (let i = 1; i <= a.length; i++) {
                const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i - 1] + 1, // insertion
                    matrix[j - 1][i] + 1, // deletion
                    matrix[j - 1][i - 1] + substitutionCost // substitution
                );
            }
        }
        
        return matrix[b.length][a.length];
    }
    
    /**
     * Formats a list of all available commands
     * @returns {string} Formatted command list
     */
    formatCommandList() {
        const commands = Array.from(this.helpContent.keys());
        let list = '';
        
        commands.forEach(command => {
            const content = this.helpContent.get(command);
            list += `  ${HELP_COLORS.command(command.padEnd(12))} ${HELP_COLORS.description(content.description)}\n`;
        });
        
        return list;
    }
    
    /**
     * Generates contextual help based on current state
     * @param {Object} context - Current execution context
     * @returns {string} Contextual help message
     */
    generateContextualHelp(context) {
        const { parsedCommand, options } = context;
        let help = '';
        
        // Command-specific tips
        if (parsedCommand.type === COMMAND_TYPES.MCP) {
            help += `${HELP_COLORS.title('MCP Tips:')}\n`;
            help += `  • Use 'claude mcp list' to see all configured servers\n`;
            help += `  • Check server logs with --debug flag\n`;
            help += `  • Import servers from Claude Desktop: 'claude mcp add-from-claude-desktop'\n\n`;
        }
        
        if (parsedCommand.type === COMMAND_TYPES.CONFIG) {
            help += `${HELP_COLORS.title('Configuration Tips:')}\n`;
            help += `  • Use --global flag to modify system-wide settings\n`;
            help += `  • List all settings: 'claude config list'\n`;
            help += `  • Reset to defaults: 'claude config remove <key>'\n\n`;
        }
        
        // Environment-specific tips
        if (!process.env.CLAUDE_API_KEY) {
            help += `${HELP_COLORS.warning('⚠ Notice:')} No API key detected. Run 'claude setup-token' to configure authentication.\n\n`;
        }
        
        // Option-specific tips
        if (options.debug) {
            help += `${HELP_COLORS.title('Debug Mode Active:')}\n`;
            help += `  • Verbose logging is enabled\n`;
            help += `  • Stack traces will be shown for errors\n`;
            help += `  • Use --verbose for even more detailed output\n\n`;
        }
        
        return help;
    }
    
    /**
     * Generates interactive help menu
     * @returns {string} Interactive help menu
     */
    generateInteractiveHelp() {
        let help = '';
        
        help += `${HELP_COLORS.title('═══ Claude Code Help ═══')}\n\n`;
        help += `${HELP_COLORS.description('Claude Code is an AI-powered development assistant.')}\n\n`;
        
        help += `${HELP_COLORS.title('Quick Start:')}\n`;
        help += `  ${HELP_COLORS.command('claude "help me debug this code"')}  Start interactive session\n`;
        help += `  ${HELP_COLORS.command('claude setup-token')}                Set up authentication\n`;
        help += `  ${HELP_COLORS.command('claude doctor')}                     Check system health\n\n`;
        
        help += `${HELP_COLORS.title('Main Commands:')}\n`;
        help += this.formatCommandList();
        
        help += `\n${HELP_COLORS.title('Getting Help:')}\n`;
        help += `  ${HELP_COLORS.command('claude --help')}           Show this help\n`;
        help += `  ${HELP_COLORS.command('claude config --help')}    Show config command help\n`;
        help += `  ${HELP_COLORS.command('claude mcp --help')}       Show MCP command help\n\n`;
        
        help += `${HELP_COLORS.title('Examples:')}\n`;
        help += `  ${HELP_COLORS.example('claude "write a python function to sort a list"')}\n`;
        help += `  ${HELP_COLORS.example('echo "const x = 1;" | claude "explain this code"')}\n`;
        help += `  ${HELP_COLORS.example('claude mcp add myserver "python server.py"')}\n`;
        help += `  ${HELP_COLORS.example('claude config set model claude-3-opus')}\n\n`;
        
        help += `${HELP_COLORS.description('For detailed documentation, visit: https://claude.ai/code/docs')}\n`;
        
        return help;
    }
    
    /**
     * Shows help for a specific command or general help
     * @param {string} [command] - Specific command to show help for
     * @param {Object} [context] - Execution context for contextual help
     * @returns {string} Formatted help text
     */
    showHelp(command, context) {
        if (command) {
            let help = this.formatHelp(command);
            
            if (context) {
                help += this.generateContextualHelp(context);
            }
            
            return help;
        } else {
            return this.generateInteractiveHelp();
        }
    }
}

/**
 * Default help system instance
 */
export const defaultHelpSystem = new HelpSystem();

/**
 * Convenience function to show help using the default help system
 * @param {string} [command] - Command to show help for
 * @param {Object} [context] - Execution context
 * @returns {string} Formatted help text
 */
export function showHelp(command, context) {
    return defaultHelpSystem.showHelp(command, context);
}

/**
 * Command handler for help commands
 * @param {Object} parsedCommand - Parsed command structure
 * @param {Object} context - Execution context
 * @returns {Object} Execution result
 */
export function handleHelpCommand(parsedCommand, context) {
    const helpText = defaultHelpSystem.showHelp(parsedCommand.helpCommand, context);
    
    console.log(helpText);
    
    return {
        success: true,
        exitCode: 0,
        message: 'Help displayed successfully',
        data: { helpText }
    };
}

/**
 * Error help handler that suggests fixes for common errors
 * @param {Error} error - The error that occurred
 * @param {string} commandType - Command type that failed
 * @returns {string} Formatted error help
 */
export function formatErrorHelp(error, commandType) {
    let help = `${HELP_COLORS.error('Error:')} ${error.message}\n\n`;
    
    // Command-specific error help
    switch (commandType) {
        case COMMAND_TYPES.CONFIG:
            help += `${HELP_COLORS.title('Common Config Issues:')}\n`;
            help += `  • Invalid key name - use 'claude config list' to see valid keys\n`;
            help += `  • Permission denied - try using --global flag\n`;
            help += `  • Invalid value type - check expected format\n\n`;
            break;
            
        case COMMAND_TYPES.MCP:
            help += `${HELP_COLORS.title('Common MCP Issues:')}\n`;
            help += `  • Server not found - check name with 'claude mcp list'\n`;
            help += `  • Connection failed - verify server is running\n`;
            help += `  • Permission denied - check server configuration\n\n`;
            break;
            
        case COMMAND_TYPES.MAIN:
            help += `${HELP_COLORS.title('Common Session Issues:')}\n`;
            help += `  • Authentication required - run 'claude setup-token'\n`;
            help += `  • Network error - check internet connection\n`;
            help += `  • Session not found - check session ID\n\n`;
            break;
    }
    
    help += `${HELP_COLORS.title('Get More Help:')}\n`;
    help += `  • Run 'claude doctor' to diagnose system issues\n`;
    help += `  • Use --debug flag for detailed error information\n`;
    help += `  • Visit documentation: https://claude.ai/code/docs\n`;
    
    return help;
}

export default {
    HelpSystem,
    showHelp,
    handleHelpCommand,
    formatErrorHelp,
    defaultHelpSystem
};