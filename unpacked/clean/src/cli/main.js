/**
 * Main CLI Entry Point
 * 
 * Core Claude Code CLI application entry point with comprehensive command-line 
 * argument parsing, configuration management, and application bootstrap logic.
 * 
 * Key chunks analyzed:
 * - chunk_0649.js:2-300+ (dT8 function - main CLI entry point)
 * - chunk_0647-0649.js (CLI argument parsing and option definitions)
 * - chunk_0645-0649.js (session management and initialization)
 */

import { Command, Option } from 'commander';
import chalk from 'chalk';
import { configManager } from '../config/manager.js';
import { mcpServerManager } from '../mcp/manager.js';
import { InteractiveApp } from './interactive.js';
import { PrintModeHandler } from './print-mode.js';
import { SessionManager } from './session.js';
import { AuthenticationManager } from './auth.js';
import { createToolSystem } from '../tools/system.js';
import {
    initializeTelemetry,
    processInitialInput,
    initializeSession,
    loadCommands,
    checkAuthentication,
    showAuthError,
    emitTelemetry,
    initializeSystemComponents,
    reportInitialization,
    enableJSONOutput,
    resolvePermissionMode,
    setupToolPermissions,
    initializeLogging,
    validateMcpConfig,
    loadMcpConfigFile,
    handleCLIError,
    createInitialPermissionContext
} from '../utils/cli-helpers.js';

/**
 * Permission modes available for the CLI
 * Extracted from chunk_0520.js:237 ($q1 array)
 */
const PERMISSION_MODES = ['acceptEdits', 'bypassPermissions', 'default', 'plan'];

/**
 * Main CLI Application Entry Point
 * 
 * Extracted from chunk_0649.js:2-300+ (dT8 function):
 * - Comprehensive CLI argument parsing using Commander.js
 * - Configuration loading and validation
 * - MCP server configuration and initialization
 * - Authentication and session management
 * - Interactive vs print mode routing
 * - Error handling and user feedback
 */
export async function main() {
    // Initialize telemetry and logging
    initializeTelemetry();
    
    // Create Commander.js CLI application
    const program = new Command();
    
    // Configure CLI application (from chunk_0649.js:4-5)
    program
        .name('claude')
        .description('Claude Code - starts an interactive session by default, use -p/--print for non-interactive output')
        .argument('[prompt]', 'Your prompt', String)
        .helpOption('-h, --help', 'Display help for command');
    
    // Debug and development options
    program
        .option('-d, --debug', 'Enable debug mode', () => true)
        .addOption(new Option('-d2e, --debug-to-stderr', 'Enable debug mode (to stderr)')
            .argParser(Boolean)
            .hideHelp())
        .option('--verbose', 'Override verbose mode setting from config', () => true);
    
    // Output format options
    program
        .option('-p, --print', 'Print response and exit (useful for pipes)', () => true)
        .addOption(new Option('--output-format <format>', 
            'Output format (only works with --print): "text" (default), "json" (single result), or "stream-json" (realtime streaming)')
            .choices(['text', 'json', 'stream-json']))
        .addOption(new Option('--input-format <format>',
            'Input format (only works with --print): "text" (default), or "stream-json" (realtime streaming input)')
            .choices(['text', 'stream-json']));
    
    // MCP and tool options  
    program
        .option('--mcp-debug', '[DEPRECATED. Use --debug instead] Enable MCP debug mode (shows MCP server errors)', () => true)
        .option('--allowedTools <tools...>', 'Comma or space-separated list of tool names to allow (e.g. "Bash(git:*) Edit")')
        .option('--disallowedTools <tools...>', 'Comma or space-separated list of tool names to deny (e.g. "Bash(git:*) Edit")')
        .option('--mcp-config <configs...>', 'Load MCP servers from JSON files or strings (space-separated)')
        .option('--strict-mcp-config', 'Only use MCP servers from --mcp-config, ignoring all other MCP configurations', () => true);
    
    // Permission and security options
    program
        .option('--dangerously-skip-permissions', 'Bypass all permission checks. Recommended only for sandboxes with no internet access.', () => true)
        .addOption(new Option('--permission-mode <mode>', 'Permission mode to use for the session')
            .argParser(String)
            .choices(PERMISSION_MODES))
        .addOption(new Option('--permission-prompt-tool <tool>', 'MCP tool to use for permission prompts (only works with --print)')
            .argParser(String)
            .hideHelp());
    
    // Session and conversation options
    program
        .option('-c, --continue', 'Continue the most recent conversation', () => true)
        .option('-r, --resume [sessionId]', 'Resume a conversation - provide a session ID or interactively select a conversation to resume', (value) => value || true)
        .option('--session-id <uuid>', 'Use a specific session ID for the conversation (must be a valid UUID)');
    
    // Model and system options
    program
        .option('--model <model>', 'Model for the current session. Provide an alias for the latest model (e.g. \'sonnet\' or \'opus\') or a model\'s full name (e.g. \'claude-sonnet-4-20250514\').')
        .option('--fallback-model <model>', 'Enable automatic fallback to specified model when default model is overloaded (only works with --print)')
        .addOption(new Option('--system-prompt <prompt>', 'System prompt to use for the session (only works with --print)')
            .argParser(String)
            .hideHelp())
        .addOption(new Option('--system-prompt-file <file>', 'Read system prompt from a file (only works with --print)')
            .argParser(String)
            .hideHelp())
        .addOption(new Option('--append-system-prompt <prompt>', 'Append a system prompt to the default system prompt')
            .argParser(String));
    
    // Configuration and directory options
    program
        .option('--settings <file-or-json>', 'Path to a settings JSON file or a JSON string to load additional settings from')
        .option('--add-dir <directories...>', 'Additional directories to allow tool access to')
        .option('--ide', 'Automatically connect to IDE on startup if exactly one valid IDE is available', () => true);
    
    // Hidden/advanced options
    program
        .addOption(new Option('--max-turns <turns>', 'Maximum number of agentic turns in non-interactive mode. This will early exit the conversation after the specified number of turns. (only works with --print)')
            .argParser(Number)
            .hideHelp());
    
    // Main action handler (from chunk_0649.js:5-300+)
    program.action(async (prompt, options) => {
        try {
            // Handle special case for 'code' prompt (chunk_0649.js:6)
            if (prompt === 'code') {
                console.warn(chalk.yellow('Tip: You can launch Claude Code with just `claude`'));
                prompt = undefined;
            }
            
            // Extract options with defaults
            const {
                debug = false,
                debugToStderr = false,
                dangerouslySkipPermissions,
                allowedTools = [],
                disallowedTools = [],
                mcpConfig = [],
                permissionMode,
                addDir = [],
                fallbackModel,
                ide: autoConnectIde = false,
                sessionId,
                settings
            } = options;
            
            const outputFormat = options.outputFormat;
            const inputFormat = options.inputFormat;
            const verbose = options.verbose;
            const printMode = options.print;
            
            // Process settings (from chunk_0649.js:21-46)
            if (settings) {
                await processSettings(settings);
            }
            
            // Validate session ID if provided (from chunk_0649.js:58-66)
            if (sessionId) {
                if (options.continue || options.resume) {
                    console.error(chalk.red('Error: --session-id cannot be used with --continue or --resume.'));
                    process.exit(1);
                }
                
                if (!isValidUUID(sessionId)) {
                    console.error(chalk.red('Error: Invalid session ID. Must be a valid UUID.'));
                    process.exit(1);
                }
                
                if (isSessionInUse(sessionId)) {
                    console.error(chalk.red(`Error: Session ID ${sessionId} is already in use.`));
                    process.exit(1);
                }
            }
            
            // Validate model configuration (from chunk_0649.js:67-69)  
            if (fallbackModel && options.model && fallbackModel === options.model) {
                console.error(chalk.red('Error: Fallback model cannot be the same as the main model. Please specify a different model for --fallback-model.'));
                process.exit(1);
            }
            
            // Process system prompt file (from chunk_0649.js:70-83)
            let systemPrompt = options.systemPrompt;\n            if (options.systemPromptFile) {\n                if (options.systemPrompt) {\n                    console.error(chalk.red('Error: Cannot use both --system-prompt and --system-prompt-file. Please use only one.'));\n                    process.exit(1);\n                }\n                \n                try {\n                    const resolvedPath = resolvePath(options.systemPromptFile);\n                    if (!fileExists(resolvedPath)) {\n                        console.error(chalk.red(`Error: System prompt file not found: ${resolvedPath}`));\n                        process.exit(1);\n                    }\n                    systemPrompt = readFileSync(resolvedPath, 'utf8');\n                } catch (error) {\n                    console.error(chalk.red(`Error reading system prompt file: ${error.message}`));\n                    process.exit(1);\n                }\n            }\n            \n            // Initialize permission mode (from chunk_0649.js:84-87)\n            const permissionModeResolved = resolvePermissionMode({\n                permissionModeCli: permissionMode,\n                dangerouslySkipPermissions\n            });\n            \n            // Process MCP configuration (from chunk_0649.js:89-132)\n            let dynamicMcpConfig = undefined;\n            if (mcpConfig && mcpConfig.length > 0) {\n                dynamicMcpConfig = await processMcpConfig(mcpConfig);\n            }\n            \n            // Set up tool permissions (from chunk_0649.js:133-144)\n            const { toolPermissionContext, warnings } = setupToolPermissions({\n                allowedToolsCli: allowedTools,\n                disallowedToolsCli: disallowedTools, \n                permissionMode: permissionModeResolved,\n                addDirs: addDir\n            });\n            \n            // Show warnings\n            warnings.forEach(warning => {\n                console.error(warning);\n            });\n            \n            // Initialize components\n            initializeLogging();\n            \n            // Get MCP servers configuration (from chunk_0649.js:145-149)\n            const strictMcpConfig = options.strictMcpConfig || false;\n            const existingMcpConfig = strictMcpConfig ? {} : mcpServerManager.getMergedServers();\n            const finalMcpConfig = {\n                ...dynamicMcpConfig,\n                ...existingMcpConfig\n            };\n            \n            // Validate input/output formats (from chunk_0649.js:150-154)\n            validateIOFormats(inputFormat, outputFormat);\n            \n            // Process initial input (from chunk_0649.js:155-156)\n            const initialInput = await processInitialInput(prompt || '', inputFormat ?? 'text');\n            \n            // Initialize tool system\n            const toolSystem = createToolSystem(toolPermissionContext, configManager.get('todoFeatureEnabled'));\n            \n            // Initialize authentication and session management\n            await initializeSession(permissionModeResolved, printMode ?? false, sessionId);\n            \n            // Start MCP servers and get resources (from chunk_0649.js:158-166)\n            const [commands, mcpResources] = await Promise.all([\n                loadCommands(),\n                initialInput || printMode ? \n                    await mcpServerManager.prefetchAllResources() :\n                    { clients: [], tools: [], commands: [] }\n            ]);\n            \n            // Handle authentication if not in print mode (from chunk_0649.js:167-171)\n            if (!printMode) {\n                const authResult = await checkAuthentication(permissionModeResolved, commands);\n                if (authResult && prompt?.trim().toLowerCase() === '/login') {\n                    prompt = '';\n                }\n                if (!authResult) {\n                    showAuthError();\n                    return;\n                }\n            }\n            \n            // Emit telemetry (from chunk_0649.js:172-186)\n            emitTelemetry('tengu_init', {\n                entrypoint: 'claude',\n                hasInitialPrompt: Boolean(prompt),\n                hasStdin: Boolean(initialInput),\n                verbose,\n                debug,\n                debugToStderr,\n                print: printMode,\n                outputFormat,\n                inputFormat,\n                numAllowedTools: allowedTools.length,\n                numDisallowedTools: disallowedTools.length,\n                mcpClientCount: Object.keys(finalMcpConfig).length\n            });\n            \n            // Initialize final systems\n            initializeSystemComponents();\n            reportInitialization(null, 'initialization');\n            \n            // Route to appropriate mode (from chunk_0649.js:186-203)\n            if (printMode) {\n                // Enable JSON output formatting if needed\n                if (outputFormat === 'stream-json' || outputFormat === 'json') {\n                    enableJSONOutput(true);\n                }\n                \n                // Start print mode (non-interactive)\n                await runPrintMode(initialInput, {\n                    toolPermissionContext,\n                    mcpClients: mcpResources.clients,\n                    commands: commands.concat(mcpResources.commands),\n                    tools: mcpResources.tools,\n                    continue: options.continue,\n                    resume: options.resume,\n                    verbose,\n                    outputFormat,\n                    permissionPromptToolName: options.permissionPromptTool,\n                    allowedTools,\n                    maxTurns: options.maxTurns,\n                    systemPrompt,\n                    appendSystemPrompt: options.appendSystemPrompt,\n                    userSpecifiedModel: options.model,\n                    fallbackModel\n                });\n                \n                return;\n            }\n            \n            // Start interactive mode (from chunk_0649.js:205+)\n            await runInteractiveMode({\n                prompt,\n                initialInput,\n                options,\n                toolPermissionContext,\n                commands,\n                mcpResources,\n                dynamicMcpConfig,\n                systemPrompt,\n                permissionModeResolved,\n                verbose,\n                debug,\n                debugToStderr,\n                autoConnectIde,\n                strictMcpConfig\n            });\n            \n        } catch (error) {\n            handleCLIError(error);\n            process.exit(1);\n        }\n    });\n    \n    // Parse command line arguments\n    await program.parseAsync(process.argv);\n}\n\n// Helper functions (extracted from various chunks)\n\n/**\n * Process settings from CLI argument\n * From chunk_0649.js:21-46\n */\nasync function processSettings(settingsArg) {\n    try {\n        const trimmed = settingsArg.trim();\n        const isJSON = trimmed.startsWith('{') && trimmed.endsWith('}');\n        let settingsPath;\n        \n        if (isJSON) {\n            if (!isValidJSON(trimmed)) {\n                process.stderr.write(chalk.red('Error: Invalid JSON provided to --settings\\n'));\n                process.exit(1);\n            }\n            \n            const { generateTempFilePath } = await import('../utils/temp.js');\n            const { writeFileSync } = await import('fs');\n            \n            settingsPath = generateTempFilePath('claude-settings', '.json');\n            writeFileSync(settingsPath, trimmed, 'utf8');\n        } else {\n            const { resolvedPath } = resolvePath(process.cwd(), settingsArg);\n            if (!fileExists(resolvedPath)) {\n                process.stderr.write(chalk.red(`Error: Settings file not found: ${resolvedPath}\\n`));\n                process.exit(1);\n            }\n            settingsPath = resolvedPath;\n        }\n        \n        configManager.loadSettings(settingsPath);\n        configManager.refresh();\n        \n    } catch (error) {\n        process.stderr.write(chalk.red(`Error processing settings: ${error.message}\\n`));\n        process.exit(1);\n    }\n}\n\n/**\n * Process MCP configuration from CLI\n * From chunk_0649.js:89-132 \n */\nasync function processMcpConfig(mcpConfigArgs) {\n    const configs = mcpConfigArgs.map(arg => arg.trim()).filter(arg => arg.length > 0);\n    const mergedConfig = {};\n    const errors = [];\n    \n    for (const configArg of configs) {\n        let serverConfig = null;\n        let configErrors = [];\n        \n        const isJSON = isValidJSON(configArg);\n        \n        if (isJSON) {\n            const result = validateMcpConfig({\n                configObject: JSON.parse(configArg),\n                filePath: 'command line',\n                expandVars: true,\n                scope: 'dynamic'\n            });\n            \n            if (result.config) {\n                serverConfig = result.config.mcpServers;\n            } else {\n                configErrors = result.errors;\n            }\n        } else {\n            const configPath = resolvePath(configArg);\n            const result = loadMcpConfigFile({\n                filePath: configPath,\n                expandVars: true,\n                scope: 'dynamic'\n            });\n            \n            if (result.config) {\n                serverConfig = result.config.mcpServers;\n            } else {\n                configErrors = result.errors;\n            }\n        }\n        \n        if (configErrors.length > 0) {\n            errors.push(...configErrors);\n        } else if (serverConfig) {\n            Object.assign(mergedConfig, serverConfig);\n        }\n    }\n    \n    if (errors.length > 0) {\n        const errorMessage = errors.map(err => \n            `${err.path ? err.path + ': ' : ''}${err.message}`\n        ).join('\\n');\n        throw new Error(`Invalid MCP configuration:\\n${errorMessage}`);\n    }\n    \n    if (Object.keys(mergedConfig).length > 0) {\n        return mapValues(mergedConfig, (config) => ({\n            ...config,\n            scope: 'dynamic'\n        }));\n    }\n    \n    return undefined;\n}\n\n/**\n * Validate input/output format combinations\n * From chunk_0649.js:150-154\n */\nfunction validateIOFormats(inputFormat, outputFormat) {\n    if (inputFormat && !['text', 'stream-json'].includes(inputFormat)) {\n        console.error(`Error: Invalid input format \"${inputFormat}\".`);\n        process.exit(1);\n    }\n    \n    if (inputFormat === 'stream-json' && outputFormat !== 'stream-json') {\n        console.error('Error: --input-format=stream-json requires output-format=stream-json.');\n        process.exit(1);\n    }\n}\n\n/**\n * Run interactive mode\n * From chunk_0649.js:205+ and chunk_0640.js\n */\nasync function runInteractiveMode(config) {\n    const app = new InteractiveApp(config);\n    await app.start();\n}\n\n/**\n * Run print mode (non-interactive)\n * From chunk_0649.js:188-203\n */\nasync function runPrintMode(initialInput, options) {\n    const printHandler = new PrintModeHandler(options);\n    await printHandler.execute(initialInput);\n}\n\n// Utility functions\n\nfunction isValidUUID(uuid) {\n    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;\n    return uuidRegex.test(uuid);\n}\n\nfunction isSessionInUse(sessionId) {\n    // Placeholder - would check active sessions\n    return false;\n}\n\nfunction isValidJSON(str) {\n    try {\n        JSON.parse(str);\n        return true;\n    } catch {\n        return false;\n    }\n}\n\nfunction fileExists(path) {\n    try {\n        const fs = require('fs');\n        return fs.existsSync(path);\n    } catch {\n        return false;\n    }\n}\n\nfunction resolvePath(...args) {\n    const path = require('path');\n    return {\n        resolvedPath: path.resolve(...args)\n    };\n}\n\nfunction mapValues(obj, fn) {\n    const result = {};\n    for (const [key, value] of Object.entries(obj)) {\n        result[key] = fn(value);\n    }\n    return result;\n}\n\n// Placeholder functions for missing implementations\nfunction initializeTelemetry() { /* Implementation needed */ }\nfunction processInitialInput() { /* Implementation needed */ }\nfunction createToolSystem() { /* Implementation needed */ }\nfunction initializeSession() { /* Implementation needed */ }\nfunction loadCommands() { /* Implementation needed */ }\nfunction checkAuthentication() { /* Implementation needed */ }\nfunction showAuthError() { /* Implementation needed */ }\nfunction emitTelemetry() { /* Implementation needed */ }\nfunction initializeSystemComponents() { /* Implementation needed */ }\nfunction reportInitialization() { /* Implementation needed */ }\nfunction enableJSONOutput() { /* Implementation needed */ }\nfunction resolvePermissionMode() { /* Implementation needed */ }\nfunction setupToolPermissions() { /* Implementation needed */ }\nfunction initializeLogging() { /* Implementation needed */ }\nfunction validateMcpConfig() { /* Implementation needed */ }\nfunction loadMcpConfigFile() { /* Implementation needed */ }\nfunction handleCLIError(error) {\n    console.error(chalk.red('Error:'), error.message);\n}