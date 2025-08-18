# MCP Integration Specification

## Overview
The Model Context Protocol (MCP) integration provides a comprehensive system for managing external servers that extend Claude's capabilities through tools, resources, and prompts. This specification details the MCP client implementation, server lifecycle management, and transport protocols.

## Architecture

### Core Components
- **MCP Client**: Core client implementation for MCP protocol
- **Server Manager**: Lifecycle management for MCP servers  
- **Transport Layer**: Multi-protocol transport abstraction
- **Configuration Manager**: Server configuration and persistence
- **Health Monitor**: Server health checking and status reporting
- **Resource Manager**: MCP resource access and caching

### Protocol Implementation
Claude Code implements MCP specification version 2024-11-05 with support for:
- **Tools**: Server-provided tools for Claude to use
- **Resources**: File/data resources accessible to Claude
- **Prompts**: Pre-defined prompts and prompt templates
- **Sampling**: Server-side sampling capabilities

## Server Management

### Server Lifecycle
```
Configuration → Initialization → Connection → Ready → Monitoring → Shutdown
```

#### Lifecycle States
- `pending` - Server configured but not yet approved
- `starting` - Server initialization in progress
- `connected` - Transport connection established
- `ready` - Server handshake completed, tools available
- `error` - Server encountered an error
- `stopped` - Server intentionally stopped
- `disconnected` - Connection lost, attempting reconnect

### Server Configuration

#### Server Definition Structure
```javascript
{
    name: string,              // Unique server identifier
    command: string | URL,     // Command to execute or URL to connect
    args?: string[],          // Command arguments
    transport: "stdio" | "sse" | "http",
    env?: Record<string, string>,     // Environment variables
    headers?: Record<string, string>, // WebSocket/HTTP headers
    scope: "local" | "user" | "project",
    enabled: boolean,
    autoRestart: boolean
}
```

#### Configuration Scopes
- **Local**: Directory-specific (`.claude/mcp_servers.json`)
- **User**: User-wide (`~/.config/claude-code/mcp_servers.json`)
- **Project**: Project-wide (`.mcp.json`)

### Server Discovery

#### Automatic Discovery
1. **Project MCP File**: Check for `.mcp.json` in project root
2. **Claude Desktop Import**: Import from Claude Desktop configuration
3. **Environment Detection**: Scan for common MCP server patterns
4. **Registry Lookup**: Check public MCP server registry

#### Manual Registration
```bash
# Add server with stdio transport
claude mcp add myserver "python server.py" --transport stdio

# Add server with SSE transport  
claude mcp add webserver "http://localhost:8000/mcp" --transport sse

# Add with environment variables
claude mcp add dbserver "node db-server.js" --env DB_URL=postgres://...
```

## Transport Protocols

### STDIO Transport
**Use Case**: Local executables, Python/Node.js scripts
**Protocol**: JSON-RPC over stdin/stdout
**Connection**: Spawned child process

```javascript
class StdioTransport {
    spawn(command, args, options) {
        // Process spawning with stdio pipes
        // JSON-RPC message framing
        // Process lifecycle management
    }
    
    send(message) {
        // Send JSON-RPC message to stdin
    }
    
    receive() {
        // Read JSON-RPC messages from stdout
    }
}
```

### Server-Sent Events (SSE) Transport
**Use Case**: Web-based MCP servers, remote services  
**Protocol**: JSON-RPC over HTTP with SSE
**Connection**: HTTP endpoint with EventSource

```javascript
class SSETransport {
    connect(url, headers) {
        // Establish EventSource connection
        // Handle reconnection logic
        // Manage authentication headers
    }
    
    send(message) {
        // POST JSON-RPC message to endpoint
    }
    
    receive() {
        // Handle incoming SSE events
    }
}
```

### HTTP Transport
**Use Case**: RESTful MCP servers, API gateways
**Protocol**: JSON-RPC over HTTP POST
**Connection**: HTTP client with request/response

```javascript
class HttpTransport {
    request(message) {
        // Send HTTP POST request
        // Handle authentication
        // Process response
    }
    
    poll() {
        // Optional polling for server-initiated messages
    }
}
```

## Protocol Messages

### Initialization Sequence
```
Client → Server: initialize request
Client ← Server: initialize response
Client → Server: initialized notification
```

### Tool Discovery
```javascript
// List available tools
{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "id": 1
}

// Response with tool definitions
{
    "jsonrpc": "2.0", 
    "id": 1,
    "result": {
        "tools": [
            {
                "name": "read_file",
                "description": "Read a file from the filesystem",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "path": {"type": "string"}
                    }
                }
            }
        ]
    }
}
```

### Tool Execution
```javascript
// Tool call request
{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
        "name": "read_file",
        "arguments": {
            "path": "/path/to/file.txt"
        }
    },
    "id": 2
}

// Tool result response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
        "content": [
            {
                "type": "text",
                "text": "File contents here..."
            }
        ]
    }
}
```

## Server Health Monitoring

### Health Check System
```javascript
class HealthMonitor {
    checkHealth(server) {
        // Send ping message
        // Monitor response time
        // Track error rates
        // Update server status
    }
    
    scheduleHealthChecks() {
        // Periodic health monitoring
        // Exponential backoff on failures
        // Automatic restart on crashes
    }
}
```

### Health Metrics
- **Response Time**: Tool call latency
- **Success Rate**: Percentage of successful tool calls
- **Uptime**: Server availability duration
- **Error Rate**: Frequency of errors
- **Memory Usage**: Process memory consumption (stdio only)

### Recovery Strategies
1. **Automatic Restart**: Restart crashed servers
2. **Circuit Breaker**: Disable failing servers temporarily
3. **Fallback**: Use alternative servers for same tools
4. **Graceful Degradation**: Continue without failed server

## Resource Management

### Resource Types
- **Files**: Filesystem resources
- **URLs**: Web resources  
- **Databases**: Database connections
- **APIs**: External API endpoints
- **Custom**: Server-defined resource types

### Resource Access
```javascript
// List resources
client.listResources()

// Read resource
client.readResource("file:///path/to/file")

// Subscribe to resource changes
client.subscribeResource("file:///path/to/dir")
```

### Caching Strategy
- **Resource Content**: Cache resource data locally
- **Schema Caching**: Cache resource schemas
- **TTL Management**: Time-based cache expiration
- **Invalidation**: Server-driven cache invalidation

## Configuration Management

### Project MCP Configuration (`.mcp.json`)
```json
{
    "mcpServers": {
        "filesystem": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed"],
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

### User Configuration
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

### Server Sandboxing
- **Process Isolation**: Each server runs in separate process
- **Resource Limits**: CPU and memory constraints
- **Network Restrictions**: Limited network access
- **File System Restrictions**: Scoped file system access

### Authentication
- **API Keys**: Support for server API key authentication
- **OAuth**: OAuth2 flow for web-based servers
- **Certificates**: TLS client certificate authentication
- **Custom Auth**: Server-specific authentication schemes

### Permission System
- **Tool Permissions**: Granular tool access control
- **Resource Permissions**: Resource access restrictions
- **Approval Workflows**: Interactive permission prompts
- **Audit Logging**: Log all server interactions

## Error Handling

### Error Categories
- **Transport Errors**: Connection and communication failures
- **Protocol Errors**: MCP protocol violations
- **Tool Errors**: Tool execution failures
- **Resource Errors**: Resource access failures
- **Authentication Errors**: Authentication and authorization failures

### Error Recovery
```javascript
class ErrorRecovery {
    handleTransportError(error, server) {
        // Attempt reconnection with backoff
        // Switch to fallback transport
        // Mark server as temporarily unavailable
    }
    
    handleProtocolError(error, server) {
        // Log protocol violation
        // Reset connection state
        // Disable problematic features
    }
    
    handleToolError(error, tool, server) {
        // Retry with exponential backoff
        // Fall back to alternative tools
        // Report error to user
    }
}
```

## Performance Optimization

### Connection Pooling
- **Transport Reuse**: Reuse HTTP connections
- **Process Pooling**: Pool stdio processes
- **Connection Limits**: Limit concurrent connections

### Message Batching
- **Tool Batching**: Batch multiple tool calls
- **Resource Batching**: Batch resource requests
- **Response Streaming**: Stream large responses

### Caching Strategies
- **Tool Schema Cache**: Cache tool definitions
- **Resource Cache**: Cache frequently accessed resources
- **Response Cache**: Cache deterministic tool responses

## Integration APIs

### Client API
```javascript
class MCPClient {
    // Server management
    async addServer(config) {}
    async removeServer(name) {}
    async listServers() {}
    
    // Tool operations
    async listTools(serverId) {}
    async callTool(serverId, toolName, args) {}
    
    // Resource operations
    async listResources(serverId) {}
    async readResource(serverId, uri) {}
    
    // Health monitoring
    async getServerHealth(serverId) {}
    async monitorServer(serverId, callback) {}
}
```

### Extension Points
- **Custom Transports**: Implement new transport protocols
- **Tool Interceptors**: Intercept and modify tool calls
- **Resource Providers**: Custom resource implementations
- **Health Checkers**: Custom health check implementations

## Testing & Development

### Test Infrastructure
- **Mock Servers**: Simulated MCP servers for testing
- **Transport Mocks**: Mock transport implementations
- **Error Simulation**: Simulate various error conditions
- **Performance Testing**: Load testing with multiple servers

### Development Tools
- **Server Inspector**: Debug MCP server interactions
- **Message Logger**: Log all MCP protocol messages
- **Performance Profiler**: Profile tool call performance
- **Configuration Validator**: Validate server configurations

This MCP integration specification provides comprehensive coverage of how Claude Code manages and interacts with Model Context Protocol servers to extend its capabilities.