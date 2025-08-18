#!/usr/bin/env node

/**
 * CLI Parser Module for Claude Code
 * 
 * This module handles command-line argument parsing using Commander.js.
 * It defines the primary commands, options, and argument validation.
 * 
 * @module CLIParser
 */

import { Command } from 'commander';

/**
 * Global CLI options that apply to all commands
 * @typedef {Object} GlobalOptions
 * @property {boolean} verbose - Enable verbose logging
 * @property {boolean} debug - Enable debug mode
 * @property {boolean} print - Enable print mode
 * @property {string} outputFormat - Output format: json, stream-json, text
 * @property {string} inputFormat - Input format: json, stream-json, text
 * @property {number} maxTurns - Maximum conversation turns
 * @property {string} model - AI model to use
 * @property {boolean} continue - Continue previous session
 * @property {string} resume - Resume session by ID
 * @property {string|boolean} teleport - Teleport session functionality
 * @property {string} remote - Create remote session
 */

/**
 * Creates and configures the main CLI program
 * @returns {Command} Configured Commander.js program instance
 */
export function createCLIProgram() {
    const program = new Command();
    
    // Program metadata
    program
        .name('claude')
        .description('Claude Code CLI - AI-powered development assistant')
        .version('1.0.0', '-v, --version', 'Display version information');
    
    // Global options available to all commands
    program
        .option('--verbose', 'Enable verbose logging', false)
        .option('--debug', 'Enable debug mode', false)
        .option('--print', 'Enable print mode', false)
        .option('--output-format <format>', 'Output format: json, stream-json, text', 'text')
        .option('--input-format <format>', 'Input format: json, stream-json, text', 'text')
        .option('--max-turns <number>', 'Maximum conversation turns', parseInt)
        .option('--model <model>', 'AI model to use')
        .option('--continue', 'Continue previous session', false)
        .option('--resume <sessionId>', 'Resume session by ID')
        .option('--teleport [destination]', 'Teleport session functionality')
        .option('--remote <endpoint>', 'Create remote session');
    
    // Primary command (no subcommand specified)
    program
        .argument('[prompt...]', 'Initial prompt to start session with')
        .action((promptArgs, options, command) => {
            // This will be handled by the dispatcher
            return {
                type: 'main',
                prompt: promptArgs.join(' '),
                options,
                command
            };
        });
    
    return program;
}

/**
 * Creates the config subcommand with its actions and options
 * @param {Command} program - The main program instance
 * @returns {Command} The config subcommand
 */
export function createConfigCommand(program) {
    const configCmd = program
        .command('config <action>')
        .description('Manage configuration settings')
        .option('-g, --global', 'Apply to global scope', false);
    
    // Config get subcommand
    configCmd
        .command('get <key>')
        .description('Retrieve configuration value')
        .action((key, options, command) => {
            return {
                type: 'config',
                action: 'get',
                key,
                options,
                command
            };
        });
    
    // Config set subcommand
    configCmd
        .command('set <key> <value>')
        .description('Set configuration value')
        .action((key, value, options, command) => {
            return {
                type: 'config',
                action: 'set',
                key,
                value,
                options,
                command
            };
        });
    
    // Config remove subcommand
    configCmd
        .command('remove <key> [values...]')
        .description('Remove configuration')
        .action((key, values, options, command) => {
            return {
                type: 'config',
                action: 'remove',
                key,
                values: values || [],
                options,
                command
            };
        });
    
    // Config list subcommand
    configCmd
        .command('list')
        .description('List all configurations')
        .action((options, command) => {
            return {
                type: 'config',
                action: 'list',
                options,
                command
            };
        });
    
    // Config add subcommand
    configCmd
        .command('add <key> <values...>')
        .description('Add to configuration array')
        .action((key, values, options, command) => {
            return {
                type: 'config',
                action: 'add',
                key,
                values,
                options,
                command
            };
        });
    
    return configCmd;
}

/**
 * Creates the MCP subcommand with its actions and options
 * @param {Command} program - The main program instance
 * @returns {Command} The MCP subcommand
 */
export function createMCPCommand(program) {
    const mcpCmd = program
        .command('mcp <action>')
        .description('Manage MCP (Model Context Protocol) servers')
        .option('-s, --scope <scope>', 'Configuration scope (local, user, project)', 'local')
        .option('-t, --transport <transport>', 'Transport type (stdio, sse, http)', 'stdio')
        .option('-e, --env <env...>', 'Environment variables')
        .option('-H, --header <header...>', 'WebSocket headers')
        .option('-d, --debug', 'Debug mode for serve', false)
        .option('--verbose', 'Verbose output for serve', false);
    
    // MCP serve subcommand
    mcpCmd
        .command('serve')
        .description('Start MCP server')
        .action((options, command) => {
            return {
                type: 'mcp',
                action: 'serve',
                options,
                command
            };
        });
    
    // MCP add subcommand
    mcpCmd
        .command('add <name> <command>')
        .description('Add MCP server')
        .action((name, command, options, cmd) => {
            return {
                type: 'mcp',
                action: 'add',
                name,
                command,
                options,
                command: cmd
            };
        });
    
    // MCP remove subcommand
    mcpCmd
        .command('remove <name>')
        .description('Remove MCP server')
        .action((name, options, command) => {
            return {
                type: 'mcp',
                action: 'remove',
                name,
                options,
                command
            };
        });
    
    // MCP list subcommand
    mcpCmd
        .command('list')
        .description('List MCP servers')
        .action((options, command) => {
            return {
                type: 'mcp',
                action: 'list',
                options,
                command
            };
        });
    
    // MCP get subcommand
    mcpCmd
        .command('get <name>')
        .description('Get server details')
        .action((name, options, command) => {
            return {
                type: 'mcp',
                action: 'get',
                name,
                options,
                command
            };
        });
    
    // MCP add-json subcommand
    mcpCmd
        .command('add-json <name> <json>')
        .description('Add via JSON')
        .action((name, json, options, command) => {
            return {
                type: 'mcp',
                action: 'add-json',
                name,
                json,
                options,
                command
            };
        });
    
    // MCP add-from-claude-desktop subcommand
    mcpCmd
        .command('add-from-claude-desktop')
        .description('Import from Claude Desktop')
        .action((options, command) => {
            return {
                type: 'mcp',
                action: 'add-from-claude-desktop',
                options,
                command
            };
        });
    
    // MCP reset-project-choices subcommand
    mcpCmd
        .command('reset-project-choices')
        .description('Reset project choices')
        .action((options, command) => {
            return {
                type: 'mcp',
                action: 'reset-project-choices',
                options,
                command
            };
        });
    
    return mcpCmd;
}

/**
 * Creates system commands (direct commands without subcommand structure)
 * @param {Command} program - The main program instance
 */
export function createSystemCommands(program) {
    // Migrate installer command
    program
        .command('migrate-installer')
        .description('Migration from global installation')
        .action((options, command) => {
            return {
                type: 'system',
                action: 'migrate-installer',
                options,
                command
            };
        });
    
    // Setup token command
    program
        .command('setup-token')
        .description('Authentication token setup')
        .action((options, command) => {
            return {
                type: 'system',
                action: 'setup-token',
                options,
                command
            };
        });
    
    // Doctor command
    program
        .command('doctor')
        .description('System health check')
        .action((options, command) => {
            return {
                type: 'system',
                action: 'doctor',
                options,
                command
            };
        });
    
    // Update command
    program
        .command('update')
        .description('Check and install updates')
        .action((options, command) => {
            return {
                type: 'system',
                action: 'update',
                options,
                command
            };
        });
    
    // Install command
    program
        .command('install [target]')
        .description('Install native build')
        .option('--force', 'Force installation', false)
        .action((target, options, command) => {
            return {
                type: 'system',
                action: 'install',
                target,
                options,
                command
            };
        });
}

/**
 * Validates command arguments based on validation rules
 * @param {Object} parsedArgs - Parsed command arguments
 * @returns {Object} Validation result with success flag and errors
 */
export function validateArguments(parsedArgs) {
    const errors = [];
    const warnings = [];
    
    // Type checking
    if (parsedArgs.options.maxTurns && (!Number.isInteger(parsedArgs.options.maxTurns) || parsedArgs.options.maxTurns <= 0)) {
        errors.push('max-turns must be a positive integer');
    }
    
    // Format validation
    const validFormats = ['json', 'stream-json', 'text'];
    if (parsedArgs.options.outputFormat && !validFormats.includes(parsedArgs.options.outputFormat)) {
        errors.push(`output-format must be one of: ${validFormats.join(', ')}`);
    }
    
    if (parsedArgs.options.inputFormat && !validFormats.includes(parsedArgs.options.inputFormat)) {
        errors.push(`input-format must be one of: ${validFormats.join(', ')}`);
    }
    
    // Mutual exclusivity checks
    if (parsedArgs.options.continue && parsedArgs.options.resume) {
        errors.push('Cannot use both --continue and --resume options');
    }
    
    // Range validation for max-turns
    if (parsedArgs.options.maxTurns && parsedArgs.options.maxTurns > 1000) {
        warnings.push('max-turns is very high, this may consume significant resources');
    }
    
    return {
        success: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Parses command line arguments and returns structured command data
 * @param {string[]} argv - Command line arguments (process.argv)
 * @returns {Object} Parsed command structure
 */
export function parseArguments(argv = process.argv) {
    const program = createCLIProgram();
    
    // Create subcommands
    createConfigCommand(program);
    createMCPCommand(program);
    createSystemCommands(program);
    
    // Enable helpful error messages
    program.exitOverride();
    
    try {
        program.parse(argv);
        
        // Extract parsed data
        const options = program.opts();
        const args = program.args;
        const command = program;
        
        // Determine command type based on arguments
        let commandType = 'main';
        let parsedCommand = {
            type: commandType,
            options,
            args,
            command
        };
        
        // If no arguments provided, enter interactive mode
        if (args.length === 0 && !options.continue && !options.resume) {
            parsedCommand.interactive = true;
        }
        
        // Validate arguments
        const validation = validateArguments(parsedCommand);
        parsedCommand.validation = validation;
        
        return parsedCommand;
        
    } catch (error) {
        // Handle parsing errors gracefully
        return {
            type: 'error',
            error: error.message,
            code: error.code || 'PARSE_ERROR',
            validation: { success: false, errors: [error.message], warnings: [] }
        };
    }
}

/**
 * Processes stdin input for piped data
 * @returns {Promise<string>} Stdin content
 */
export async function processStdinInput() {
    return new Promise((resolve, reject) => {
        if (process.stdin.isTTY) {
            resolve('');
            return;
        }
        
        let input = '';
        process.stdin.setEncoding('utf8');
        
        process.stdin.on('data', (chunk) => {
            input += chunk;
        });
        
        process.stdin.on('end', () => {
            resolve(input.trim());
        });
        
        process.stdin.on('error', (error) => {
            reject(error);
        });
        
        // Set a timeout to prevent hanging
        setTimeout(() => {
            if (!process.stdin.readableEnded) {
                reject(new Error('Stdin input timeout'));
            }
        }, 5000);
    });
}

export default {
    createCLIProgram,
    createConfigCommand,
    createMCPCommand,
    createSystemCommands,
    parseArguments,
    validateArguments,
    processStdinInput
};