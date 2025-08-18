/**
 * MCP (Model Control Protocol) Commands for Claude Code CLI
 * 
 * Provides commands for managing MCP servers including adding, removing,
 * listing, and configuring server connections.
 * 
 * Extracted from: chunk_0649.js:421-618 (original bundled implementation)
 */

import { Command } from 'commander';
import { mcpServerManager } from '../../mcp/manager.js';
import { McpServer } from '../../mcp/server.js';

/**
 * Add MCP subcommands to the main program
 * 
 * @param {Command} program - The main commander program
 */
export function mcpCommands(program) {
    const mcpCommand = program
        .command('mcp')
        .description('Configure and manage MCP servers')
        .helpOption('-h, --help', 'Display help for command');

    // Start MCP server
    mcpCommand
        .command('serve')
        .description('Start the Claude Code MCP server')
        .helpOption('-h, --help', 'Display help for command')
        .option('-d, --debug', 'Enable debug mode', () => true)
        .option('--verbose', 'Override verbose mode setting from config', () => true)
        .action(async (options) => {
            await serveMcp(options);
        });

    // Add MCP server
    mcpCommand
        .command('add <name> <commandOrUrl> [args...]')
        .description('Add a server')
        .option('-s, --scope <scope>', 'Configuration scope (local, user, or project)', 'local')
        .option('-t, --transport <transport>', 'Transport type (stdio, sse, http)', 'stdio')
        .option('-e, --env <env...>', 'Set environment variables (e.g. -e KEY=value)')
        .option('-H, --header <header...>', 'Set WebSocket headers (e.g. -H "X-Api-Key: abc123" -H "X-Custom: value")')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (name, commandOrUrl, args, options) => {
            await addMcpServer(name, commandOrUrl, args, options);
        });

    // Remove MCP server
    mcpCommand
        .command('remove <name>')
        .description('Remove an MCP server')
        .option('-s, --scope <scope>', 'Configuration scope (local, user, or project) - if not specified, removes from whichever scope it exists in')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (name, options) => {
            await removeMcpServer(name, options);
        });

    // List MCP servers
    mcpCommand
        .command('list')
        .description('List configured MCP servers')
        .helpOption('-h, --help', 'Display help for command')
        .action(async () => {
            await listMcpServers();
        });

    // Get MCP server details
    mcpCommand
        .command('get <name>')
        .description('Get details about an MCP server')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (name) => {
            await getMcpServer(name);
        });

    // Add MCP server via JSON
    mcpCommand
        .command('add-json <name> <json>')
        .description('Add an MCP server (stdio or SSE) with a JSON string')
        .option('-s, --scope <scope>', 'Configuration scope (local, user, or project)', 'local')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (name, json, options) => {
            await addMcpServerFromJson(name, json, options);
        });

    // Import from Claude Desktop
    mcpCommand
        .command('add-from-claude-desktop')
        .description('Import MCP servers from Claude Desktop (Mac and WSL only)')
        .option('-s, --scope <scope>', 'Configuration scope (local, user, or project)', 'local')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (options) => {
            await importFromClaudeDesktop(options);
        });

    // Reset project choices
    mcpCommand
        .command('reset-project-choices')
        .description('Reset all approved and rejected project-scoped (.mcp.json) servers within this project')
        .helpOption('-h, --help', 'Display help for command')
        .action(async () => {
            await resetProjectChoices();
        });
}

/**
 * Start the Claude Code MCP server
 */
async function serveMcp(options) {
    try {
        const mcpServer = new McpServer();
        await mcpServer.start({
            debug: options.debug,
            verbose: options.verbose
        });
        
        console.log('Claude Code MCP server started');
    } catch (error) {
        console.error(`Error starting MCP server: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Add an MCP server configuration
 */
async function addMcpServer(name, commandOrUrl, args, options) {
    try {
        
        // Parse environment variables
        const env = {};
        if (options.env) {
            for (const envVar of options.env) {
                const [key, value] = envVar.split('=', 2);
                if (key && value !== undefined) {
                    env[key] = value;
                }
            }
        }
        
        // Parse headers
        const headers = {};
        if (options.header) {
            for (const header of options.header) {
                const [key, value] = header.split(':', 2);
                if (key && value !== undefined) {
                    headers[key.trim()] = value.trim();
                }
            }
        }
        
        const serverConfig = {
            name,
            transport: options.transport,
            env: Object.keys(env).length > 0 ? env : undefined,
            headers: Object.keys(headers).length > 0 ? headers : undefined
        };
        
        // Configure based on transport type
        if (options.transport === 'stdio') {
            serverConfig.command = commandOrUrl;
            serverConfig.args = args;
        } else if (options.transport === 'sse' || options.transport === 'http') {
            serverConfig.url = commandOrUrl;
        }
        
        await mcpServerManager.addServer(serverConfig, options.scope);
        console.log(`Added MCP server "${name}" with ${options.transport} transport to ${options.scope} scope`);
    } catch (error) {
        console.error(`Error adding MCP server: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Remove an MCP server configuration
 */
async function removeMcpServer(name, options) {
    try {
        await mcpServerManager.removeServer(name, options.scope);
        console.log(`Removed MCP server: ${name}`);
    } catch (error) {
        console.error(`Error removing MCP server: ${error.message}`);
        process.exit(1);
    }
}

/**
 * List all configured MCP servers
 */
async function listMcpServers() {
    try {
        const servers = await mcpServerManager.listServers();
        
        if (servers.length === 0) {
            console.log('No MCP servers configured');
            return;
        }
        
        console.log('Configured MCP servers:');
        for (const server of servers) {
            console.log(`  ${server.name} (${server.transport}) - ${server.scope} scope`);
        }
    } catch (error) {
        console.error(`Error listing MCP servers: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Get details about a specific MCP server
 */
async function getMcpServer(name) {
    try {
        const server = await mcpServerManager.getServer(name);
        
        if (!server) {
            console.log(`MCP server "${name}" not found`);
            process.exit(1);
        }
        
        console.log(`MCP Server: ${name}`);
        console.log(JSON.stringify(server, null, 2));
    } catch (error) {
        console.error(`Error getting MCP server details: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Add an MCP server from JSON configuration
 */
async function addMcpServerFromJson(name, json, options) {
    try {
        const config = JSON.parse(json);
        
        const serverConfig = {
            name,
            ...config
        };
        
        await mcpServerManager.addServer(serverConfig, options.scope);
        console.log(`Added MCP server "${name}" from JSON to ${options.scope} scope`);
    } catch (error) {
        console.error(`Error adding MCP server from JSON: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Import MCP servers from Claude Desktop configuration
 */
async function importFromClaudeDesktop(options) {
    try {
        const importedCount = await mcpServerManager.importFromClaudeDesktop(options.scope);
        
        if (importedCount === 0) {
            console.log('No MCP servers found in Claude Desktop configuration');
        } else {
            console.log(`Imported ${importedCount} MCP server(s) from Claude Desktop to ${options.scope} scope`);
        }
    } catch (error) {
        console.error(`Error importing from Claude Desktop: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Reset all project-scoped MCP server choices
 */
async function resetProjectChoices() {
    try {
        await mcpServerManager.resetProjectChoices();
        console.log('Reset all project-scoped MCP server choices');
    } catch (error) {
        console.error(`Error resetting project choices: ${error.message}`);
        process.exit(1);
    }
}