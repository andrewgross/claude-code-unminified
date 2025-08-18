# MCP Integration Module

This module provides a comprehensive implementation of the Model Context Protocol (MCP) for Claude Code. It enables communication with external MCP servers to extend Claude's capabilities through tools, resources, and prompts.

## Architecture Overview

The MCP integration consists of several key components:

- **MCPManager**: Main coordinator that orchestrates all MCP operations
- **ServerManager**: Manages MCP server lifecycle (start, stop, monitor)
- **ToolManager**: Handles tool registry and execution
- **ProtocolHandler**: Manages JSON-RPC protocol communication
- **TransportFactory**: Creates transport instances (stdio, sse, http)

## Quick Start

### Basic Usage

```javascript
import { createMCPManager } from './src/mcp/index.js';

// Create and initialize MCP manager
const mcpManager = createMCPManager({
    logger: console,
    timeout: 30000
});

await mcpManager.initialize({
    servers: {
        filesystem: {
            command: 'npx',
            args: ['-y', '@modelcontextprotocol/server-filesystem', '/path/to/allowed'],
            transport: 'stdio'
        }
    }
});

// Start servers
await mcpManager.startServers();

// Create a session
const sessionId = await mcpManager.createSession();

// Execute a tool
const result = await mcpManager.executeTool(sessionId, 'read_file', {
    path: '/path/to/file.txt'
});

console.log(result);
```

### Server Configuration

#### STDIO Transport (Local Executables)

```javascript
{
    name: 'filesystem',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', '/allowed/path'],
    transport: 'stdio',
    env: {
        CUSTOM_VAR: 'value'
    }
}
```

#### SSE Transport (Web Services)

```javascript
{
    name: 'web-service',
    url: 'https://api.example.com/mcp',
    transport: 'sse',
    headers: {
        'Authorization': 'Bearer token'
    }
}
```

#### HTTP Transport (Direct HTTP)

```javascript
{
    name: 'http-service',
    url: 'https://api.example.com/mcp',
    transport: 'http',
    headers: {
        'Authorization': 'Bearer token'
    }
}
```

## Component Details

### MCPManager

The main coordinator that ties everything together:

```javascript
const manager = new MCPManager({
    logger: console,
    timeout: 30000,
    maxRetries: 3
});

// Event handling
manager.on('serverStarted', ({ name }) => {
    console.log(`Server ${name} started`);
});

manager.on('toolExecuted', ({ toolName, result }) => {
    console.log(`Tool ${toolName} executed:`, result);
});
```

### ServerManager

Handles server lifecycle:

```javascript
const serverManager = new ServerManager({
    logger: console,
    transportFactory: new TransportFactory()
});

// Add and start a server
await serverManager.addServer('myserver', {
    command: 'python',
    args: ['server.py'],
    transport: 'stdio'
});

await serverManager.startServer('myserver');
```

### ToolManager

Manages tool registry and execution:

```javascript
const toolManager = new ToolManager({
    logger: console,
    timeout: 30000
});

// Get available tools
const tools = toolManager.getAvailableTools();

// Execute a tool
const result = await toolManager.executeTool('tool_name', {
    param1: 'value1'
});
```

### Transport Layer

Different transport implementations for various communication patterns:

```javascript
import { TransportFactory, TransportType } from './transport.js';

const factory = new TransportFactory();

// Create STDIO transport
const stdioTransport = factory.createTransport(TransportType.STDIO, {
    command: 'python',
    args: ['server.py']
});

// Create SSE transport
const sseTransport = factory.createTransport(TransportType.SSE, {
    url: 'https://api.example.com/mcp'
});
```

## Error Handling

The MCP integration provides comprehensive error handling:

```javascript
manager.on('serverError', ({ name, error }) => {
    console.error(`Server ${name} error:`, error);
});

manager.on('toolError', ({ toolName, error }) => {
    console.error(`Tool ${toolName} error:`, error);
});

try {
    await manager.executeTool(sessionId, 'tool_name', params);
} catch (error) {
    if (error.code === -32601) {
        console.log('Method not found');
    }
}
```

## Health Monitoring

Servers are automatically monitored for health:

```javascript
// Get server status
const statuses = manager.getStatus();
console.log(statuses.servers);

// Manual health check
const health = await manager.checkServerHealth('server_name');
```

## Sessions

Sessions provide isolated contexts for tool execution:

```javascript
// Create session
const sessionId = await manager.createSession({
    context: new Map([['workingDir', '/project']])
});

// Execute tools within session
const result = await manager.executeTool(sessionId, 'tool_name', params);

// Clean up session
await manager.destroySession(sessionId);
```

## Configuration Files

### Project Configuration (.mcp.json)

```json
{
    "mcpServers": {
        "filesystem": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
            "transport": "stdio"
        },
        "database": {
            "command": "python",
            "args": ["-m", "mcp_server_db"],
            "transport": "stdio",
            "env": {
                "DB_CONNECTION": "postgresql://..."
            }
        }
    }
}
```

### User Configuration (~/.config/claude-code/mcp_servers.json)

```json
{
    "servers": {
        "personal-tools": {
            "command": "~/tools/mcp-server",
            "transport": "stdio",
            "enabled": true,
            "autoRestart": true
        }
    },
    "defaults": {
        "autoRestart": true,
        "healthCheckInterval": 30000
    }
}
```

## Security Considerations

- Servers run in separate processes with limited permissions
- Tool execution can be controlled with permission systems
- Network access and file system access are restricted per server
- All communications use secure protocols (HTTPS/TLS when applicable)

## Debugging

Enable debug logging:

```javascript
const manager = createMCPManager({
    logger: {
        log: console.log,
        warn: console.warn,
        error: console.error,
        debug: console.debug // Enable debug logs
    }
});

// Monitor all protocol messages
manager.protocolHandler.on('messageReceived', (msg) => {
    console.debug('Received:', msg);
});

manager.protocolHandler.on('messageSent', (msg) => {
    console.debug('Sent:', msg);
});
```

## Example: Complete Setup

```javascript
import { createExampleMCPSetup } from './src/mcp/index.js';

async function main() {
    // Create example setup
    const manager = await createExampleMCPSetup();
    
    // Start all servers
    const results = await manager.startServers();
    console.log('Started servers:', results.successful);
    
    // Create session
    const sessionId = await manager.createSession();
    
    // List available tools
    const tools = manager.getAvailableTools();
    console.log('Available tools:', tools.map(t => t.name));
    
    // Execute a tool (using the example echo tool)
    if (tools.some(t => t.name === 'echo')) {
        const result = await manager.executeTool(sessionId, 'echo', {
            text: 'Hello, MCP!'
        });
        console.log('Tool result:', result);
    }
    
    // Cleanup
    await manager.destroySession(sessionId);
    await manager.shutdown();
}

main().catch(console.error);
```

This MCP integration provides a robust foundation for extending Claude Code with external tools and services while maintaining security, reliability, and ease of use.