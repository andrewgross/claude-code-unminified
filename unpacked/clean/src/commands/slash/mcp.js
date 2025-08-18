/**
 * MCP Dynamic Slash Commands
 * 
 * Provides dynamic slash commands from MCP (Model Context Protocol) servers.
 * 
 * Implementation details:
 * - No specific chunk extraction (MCP is a separate system)
 * - Uses mcpServerManager for server discovery and tool enumeration
 * - Converts MCP tools to slash command format dynamically  
 * - Command handlers delegate to MCP tool execution
 * - Supports real-time command availability based on server status
 */

import { mcpServerManager } from '../../mcp/manager.js';

/**
 * Load dynamic slash commands from MCP servers
 * 
 * @returns {Array} Array of MCP command definitions
 */
export async function loadMcpSlashCommands() {
    const commands = [];
    
    try {
        // Get connected MCP servers
        const connectionStatus = mcpServerManager.getConnectionStatus();
        const connectedServers = connectionStatus.filter(server => server.connected);
        
        if (connectedServers.length === 0) {
            return commands; // No connected servers
        }
        
        // Get available tools from all connected servers
        const tools = mcpServerManager.getAvailableTools();
        
        // Convert MCP tools to slash commands
        for (const tool of tools) {
            const command = createMcpSlashCommand(tool);
            if (command) {
                commands.push(command);
            }
        }
        
        return commands;
    } catch (error) {
        console.warn('Failed to load MCP slash commands:', error.message);
        return commands;
    }
}

/**
 * Create a slash command from an MCP tool
 * 
 * @param {Object} tool - MCP tool definition
 * @returns {Object|null} Slash command definition or null if invalid
 */
function createMcpSlashCommand(tool) {
    if (!tool.name || !tool.serverName) {
        return null;
    }
    
    // Generate command name (prefix with server name to avoid conflicts)
    const commandName = `${tool.serverName}:${tool.name}`;
    
    // Extract argument hint from input schema
    const argumentHint = generateArgumentHint(tool.inputSchema);
    
    return {
        type: 'mcp',
        name: commandName,
        description: `${tool.description || tool.name} (MCP:${tool.serverName})`,
        serverName: tool.serverName,
        toolName: tool.name,
        inputSchema: tool.inputSchema,
        argumentHint,
        allowedTools: [], // MCP tools don't need additional tool permissions
        source: 'mcp',
        isEnabled: () => true,
        isHidden: false,
        
        /**
         * Get user-facing name for the command
         */
        userFacingName() {
            return commandName;
        },
        
        /**
         * Execute the MCP tool
         * 
         * @param {string} args - Command arguments
         * @param {Object} context - Execution context
         * @returns {Array} Array of prompt parts (for MCP tools, this executes directly)
         */
        async getPromptForCommand(args, context) {
            // Parse arguments for MCP tool execution
            const toolArgs = parseArgumentsForMcpTool(args, tool.inputSchema);
            
            try {
                // Execute the MCP tool directly
                const result = await mcpServerManager.executeTool(tool.name, toolArgs);
                
                // Format the result as a text response
                let resultText = '';
                
                if (result.content && Array.isArray(result.content)) {
                    for (const content of result.content) {
                        if (content.type === 'text') {
                            resultText += content.text + '\n';
                        } else if (content.type === 'image') {
                            resultText += `[Image: ${content.data}]\n`;
                        } else {
                            resultText += `[${content.type}]: ${JSON.stringify(content, null, 2)}\n`;
                        }
                    }
                } else {
                    resultText = JSON.stringify(result, null, 2);
                }
                
                return [{
                    type: 'text',
                    text: `MCP Tool Result (${tool.serverName}:${tool.name}):\n\n${resultText.trim()}`
                }];
                
            } catch (error) {
                return [{
                    type: 'text',
                    text: `Error executing MCP tool ${tool.name}: ${error.message}`
                }];
            }
        }
    };
}

/**
 * Generate argument hint from MCP tool input schema
 * 
 * @param {Object} inputSchema - MCP tool input schema
 * @returns {string} Argument hint string
 */
function generateArgumentHint(inputSchema) {
    if (!inputSchema || !inputSchema.properties) {
        return '';
    }
    
    const properties = inputSchema.properties;
    const required = inputSchema.required || [];
    const hints = [];
    
    for (const [propName, propDef] of Object.entries(properties)) {
        const isRequired = required.includes(propName);
        const typeInfo = propDef.type || 'string';
        const description = propDef.description ? ` - ${propDef.description}` : '';
        
        if (isRequired) {
            hints.push(`<${propName}:${typeInfo}>${description}`);
        } else {
            hints.push(`[${propName}:${typeInfo}]${description}`);
        }
    }
    
    return hints.join(' ');
}

/**
 * Parse command arguments for MCP tool execution
 * 
 * @param {string} args - Raw argument string
 * @param {Object} inputSchema - MCP tool input schema
 * @returns {Object} Parsed arguments object
 */
function parseArgumentsForMcpTool(args, inputSchema) {
    if (!args || !args.trim()) {
        return {};
    }
    
    const toolArgs = {};
    
    try {
        // First, try to parse as JSON
        if (args.trim().startsWith('{')) {
            return JSON.parse(args);
        }
        
        // Otherwise, parse as key=value pairs
        const argPairs = args.split(/\s+/);
        
        for (const pair of argPairs) {
            const [key, ...valueParts] = pair.split('=');
            if (key && valueParts.length > 0) {
                const value = valueParts.join('=');
                
                // Try to parse value based on schema type
                const propDef = inputSchema?.properties?.[key];
                if (propDef) {
                    toolArgs[key] = parseValueByType(value, propDef.type);
                } else {
                    // Default to string if no schema info
                    toolArgs[key] = value;
                }
            }
        }
        
        // If we couldn't parse key=value pairs, use the whole string as a single argument
        if (Object.keys(toolArgs).length === 0) {
            // Try to guess the primary argument from schema
            if (inputSchema?.properties) {
                const firstProp = Object.keys(inputSchema.properties)[0];
                if (firstProp) {
                    toolArgs[firstProp] = args;
                }
            }
        }
        
    } catch (error) {
        console.warn('Failed to parse MCP tool arguments:', error.message);
        // Fallback: use entire args string as first property
        if (inputSchema?.properties) {
            const firstProp = Object.keys(inputSchema.properties)[0];
            if (firstProp) {
                toolArgs[firstProp] = args;
            }
        }
    }
    
    return toolArgs;
}

/**
 * Parse a value according to its expected type
 * 
 * @param {string} value - String value to parse
 * @param {string} type - Expected type (string, number, boolean, etc.)
 * @returns {*} Parsed value
 */
function parseValueByType(value, type) {
    switch (type) {
        case 'number':
        case 'integer':
            const num = Number(value);
            return isNaN(num) ? value : num;
            
        case 'boolean':
            return value.toLowerCase() === 'true' || value === '1';
            
        case 'array':
            try {
                return JSON.parse(value);
            } catch {
                // Split by comma if not JSON
                return value.split(',').map(item => item.trim());
            }
            
        case 'object':
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
            
        case 'string':
        default:
            return value;
    }
}

/**
 * Execute an MCP slash command
 * 
 * @param {string} commandName - Full command name (serverName:toolName)
 * @param {string} args - Command arguments
 * @param {Object} context - Execution context
 * @returns {Promise<Object>} Command result
 */
export async function executeMcpSlashCommand(commandName, args, context) {
    try {
        const commands = await loadMcpSlashCommands();
        const command = commands.find(cmd => cmd.name === commandName);
        
        if (!command) {
            return {
                type: 'error',
                content: `MCP command not found: /${commandName}`
            };
        }
        
        const result = await command.getPromptForCommand(args, context);
        
        return {
            type: 'mcp_command',
            content: result[0].text,
            serverName: command.serverName,
            toolName: command.toolName
        };
        
    } catch (error) {
        return {
            type: 'error',
            content: `MCP command execution failed: ${error.message}`
        };
    }
}

/**
 * Get list of available MCP commands
 * 
 * @returns {Array} List of MCP command information
 */
export async function getMcpCommands() {
    const commands = await loadMcpSlashCommands();
    return commands.map(cmd => ({
        name: cmd.name,
        description: cmd.description,
        serverName: cmd.serverName,
        toolName: cmd.toolName,
        argumentHint: cmd.argumentHint,
        inputSchema: cmd.inputSchema
    }));
}

/**
 * Check if MCP servers are available and connected
 * 
 * @returns {boolean} True if MCP servers are connected
 */
export function isMcpAvailable() {
    try {
        const connectionStatus = mcpServerManager.getConnectionStatus();
        return connectionStatus.some(server => server.connected);
    } catch (error) {
        return false;
    }
}