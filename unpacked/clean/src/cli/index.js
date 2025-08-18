#!/usr/bin/env node

/**
 * Claude Code CLI - Main Entry Point
 * 
 * This is the main CLI entry point for Claude Code, providing an interactive
 * AI assistant interface with support for various commands and tools.
 * 
 * Extracted from: chunk_0649.js (original bundled implementation)
 */

import { Command, Option } from 'commander';
import { mainCommand } from './commands/main.js';
import { configCommands } from './commands/config.js';
import { mcpCommands } from './commands/mcp.js';
import { utilityCommands } from './commands/utility.js';

/**
 * Create and configure the main CLI application
 */
export async function createCLI() {
    const program = new Command();

    // Main application metadata
    program
        .name('claude')
        .description('Claude Code - starts an interactive session by default, use -p/--print for non-interactive output')
        .argument('[prompt]', 'Your prompt', String)
        .helpOption('-h, --help', 'Display help for command');

    // Global options
    program
        .option('-d, --debug', 'Enable debug mode', () => true)
        .addOption(new Option('-d2e, --debug-to-stderr', 'Enable debug mode (to stderr)')
            .argParser(Boolean)
            .hideHelp())
        .option('--verbose', 'Override verbose mode setting from config', () => true)
        .option('-p, --print', 'Print response and exit (useful for pipes)', () => true)
        .addOption(new Option('--output-format <format>', 'Output format (only works with --print): "text" (default), "json" (single result), or "stream-json" (realtime streaming)')
            .choices(['text', 'json', 'stream-json']))
        .addOption(new Option('--input-format <format>', 'Input format (only works with --print): "text" (default), or "stream-json" (realtime streaming input)')
            .choices(['text', 'stream-json']))
        .option('--mcp-debug', '[DEPRECATED. Use --debug instead] Enable MCP debug mode (shows MCP server errors)', () => true)
        .option('--dangerously-skip-permissions', 'Bypass all permission checks. Recommended only for sandboxes with no internet access.', () => true)
        .addOption(new Option('--max-turns <turns>', 'Maximum number of agentic turns in non-interactive mode. This will early exit the conversation after the specified number of turns. (only works with --print)')
            .argParser(Number)
            .hideHelp())
        .option('--allowedTools <tools...>', 'Comma or space-separated list of tool names to allow (e.g. "Bash(git:*) Edit")')
        .option('--disallowedTools <tools...>', 'Comma or space-separated list of tool names to deny (e.g. "Bash(git:*) Edit")')
        .option('--mcp-config <configs...>', 'Load MCP servers from JSON files or strings (space-separated)')
        .addOption(new Option('--permission-prompt-tool <tool>', 'MCP tool to use for permission prompts (only works with --print)')
            .argParser(String)
            .hideHelp())
        .addOption(new Option('--system-prompt <prompt>', 'System prompt to use for the session  (only works with --print)')
            .argParser(String)
            .hideHelp())
        .addOption(new Option('--system-prompt-file <file>', 'Read system prompt from a file (only works with --print)')
            .argParser(String)
            .hideHelp())
        .addOption(new Option('--append-system-prompt <prompt>', 'Append a system prompt to the default system prompt')
            .argParser(String))
        .addOption(new Option('--permission-mode <mode>', 'Permission mode to use for the session')
            .argParser(String)
            .choices(['strict', 'normal', 'permissive'])) // Inferred from context
        .option('-c, --continue', 'Continue the most recent conversation', () => true)
        .option('-r, --resume [sessionId]', 'Resume a conversation - provide a session ID or interactively select a conversation to resume', (value) => value || true)
        .option('--model <model>', 'Model for the current session. Provide an alias for the latest model (e.g. \'sonnet\' or \'opus\') or a model\'s full name (e.g. \'claude-sonnet-4-20250514\').')
        .option('--fallback-model <model>', 'Enable automatic fallback to specified model when default model is overloaded (only works with --print)')
        .option('--settings <file-or-json>', 'Path to a settings JSON file or a JSON string to load additional settings from')
        .option('--add-dir <directories...>', 'Additional directories to allow tool access to')
        .option('--ide', 'Automatically connect to IDE on startup if exactly one valid IDE is available', () => true)
        .option('--strict-mcp-config', 'Only use MCP servers from --mcp-config, ignoring all other MCP configurations', () => true)
        .option('--session-id <uuid>', 'Use a specific session ID for the conversation (must be a valid UUID)')
        .action(mainCommand);

    // Add subcommands
    configCommands(program);
    mcpCommands(program);  
    utilityCommands(program);

    // Parse arguments and execute
    await program.parseAsync(process.argv);
    
    return program;
}

// Main execution if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    createCLI().catch(error => {
        console.error('Failed to start Claude CLI:', error);
        process.exit(1);
    });
}