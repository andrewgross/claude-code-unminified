/**
 * MCP Module Index - Model Context Protocol Integration
 * 
 * This module exports all MCP-related classes and utilities for use throughout
 * the Claude Code application. It provides a convenient entry point for
 * importing MCP functionality.
 * 
 * @module MCP
 */

// Main coordinator
export { MCPManager, defaultMCPManager } from './mcp-manager.js';

// Core managers
export { ServerManager, ServerState } from './server-manager.js';
export { ToolManager, ToolState } from './tool-manager.js';

// Protocol handling
export { 
    ProtocolHandler, 
    MCP_VERSION, 
    JSONRPC_VERSION,
    MCPMethods,
    MCPErrorCodes 
} from './protocol.js';

// Transport layer
export { 
    TransportFactory,
    BaseTransport,
    StdioTransport,
    SSETransport, 
    HTTPTransport,
    TransportType,
    TransportState
} from './transport.js';

/**
 * Creates a new MCP manager instance with default configuration
 * @param {Object} options - Configuration options
 * @returns {MCPManager} MCP manager instance
 */
export function createMCPManager(options = {}) {
    return new MCPManager(options);
}

/**
 * Default MCP configuration for common use cases
 */
export const defaultMCPConfig = {
    servers: {
        // Example filesystem server
        filesystem: {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-filesystem', process.cwd()],
            transport: 'stdio',
            enabled: false // Disabled by default
        }
    },
    options: {
        logger: console,
        timeout: 30000,
        maxRetries: 3,
        healthCheckInterval: 30000
    }
};

/**
 * Utility function to validate MCP server configuration
 * @param {Object} config - Server configuration
 * @throws {Error} If configuration is invalid
 */
export function validateServerConfig(config) {
    if (!config.command && !config.url) {
        throw new Error('Server configuration must have either command or url');
    }
    
    if (!config.transport) {
        throw new Error('Server configuration must specify transport type');
    }
    
    const validTransports = ['stdio', 'sse', 'http'];
    if (!validTransports.includes(config.transport)) {
        throw new Error(
            `Invalid transport '${config.transport}'. Valid options: ${validTransports.join(', ')}`
        );
    }
    
    return true;
}

/**
 * Creates an example MCP manager setup for development/testing
 * @returns {Promise<MCPManager>} Configured MCP manager
 */
export async function createExampleMCPSetup() {
    const mcpManager = createMCPManager({
        logger: {
            log: (...args) => console.log('[MCP]', ...args),
            warn: (...args) => console.warn('[MCP]', ...args),
            error: (...args) => console.error('[MCP]', ...args),
            debug: (...args) => console.debug('[MCP]', ...args)
        }
    });
    
    // Initialize the manager
    await mcpManager.initialize({
        servers: {
            // Example echo server for testing
            'test-echo': {
                command: 'node',
                args: ['-e', `
                    const readline = require('readline');
                    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
                    
                    rl.on('line', (input) => {
                        try {
                            const msg = JSON.parse(input);
                            if (msg.method === 'initialize') {
                                console.log(JSON.stringify({
                                    jsonrpc: '2.0',
                                    id: msg.id,
                                    result: {
                                        protocolVersion: '2024-11-05',
                                        capabilities: { tools: { listChanged: true } }
                                    }
                                }));
                            } else if (msg.method === 'tools/list') {
                                console.log(JSON.stringify({
                                    jsonrpc: '2.0',
                                    id: msg.id,
                                    result: {
                                        tools: [{
                                            name: 'echo',
                                            description: 'Echoes back the input',
                                            inputSchema: {
                                                type: 'object',
                                                properties: {
                                                    text: { type: 'string' }
                                                },
                                                required: ['text']
                                            }
                                        }]
                                    }
                                }));
                            } else if (msg.method === 'tools/call') {
                                console.log(JSON.stringify({
                                    jsonrpc: '2.0',
                                    id: msg.id,
                                    result: {
                                        content: [{
                                            type: 'text',
                                            text: 'Echo: ' + (msg.params.arguments.text || 'No text provided')
                                        }]
                                    }
                                }));
                            }
                        } catch (e) {
                            console.log(JSON.stringify({
                                jsonrpc: '2.0',
                                id: msg.id || null,
                                error: { code: -32600, message: 'Invalid Request' }
                            }));
                        }
                    });
                `],
                transport: 'stdio'
            }
        }
    });
    
    return mcpManager;
}

export default {
    MCPManager,
    defaultMCPManager,
    createMCPManager,
    createExampleMCPSetup,
    defaultMCPConfig,
    validateServerConfig,
    ServerState,
    ToolState,
    TransportType,
    TransportState,
    MCPMethods,
    MCPErrorCodes
};