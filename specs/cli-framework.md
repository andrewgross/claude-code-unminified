# CLI Framework Specification

## Overview
The Claude Code CLI framework is built on Commander.js with a sophisticated argument parsing and command dispatch system. This specification details the command-line interface structure, argument processing, and execution flow.

## Architecture

### Core Components
- **Command Parser**: Commander.js-based argument parsing
- **Command Registry**: Dynamic command registration system  
- **Execution Engine**: Command dispatch and execution management
- **Option Handler**: Global and command-specific option processing
- **Help System**: Auto-generated help documentation

### Entry Point Structure
```javascript
#!/usr/bin/env node

// Main entry function processes:
// 1. Environment setup
// 2. Command line argument parsing
// 3. Authentication verification
// 4. Command dispatch
```

## Command Structure

### Primary Command
```bash
claude [prompt] [options]
```

**Behavior:**
- If `[prompt]` provided: Start session with initial prompt
- If no prompt: Enter interactive mode
- Supports piped input from stdin

### Global Options
| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `--verbose` | boolean | Enable verbose logging | false |
| `--debug` | boolean | Enable debug mode | false |
| `--print` | boolean | Enable print mode | false |
| `--output-format` | string | Output format: json, stream-json, text | text |
| `--input-format` | string | Input format: json, stream-json, text | text |
| `--max-turns` | number | Maximum conversation turns | undefined |
| `--model` | string | AI model to use | default |
| `--continue` | boolean | Continue previous session | false |
| `--resume` | string | Resume session by ID | undefined |
| `--teleport` | string/boolean | Teleport session functionality | undefined |
| `--remote` | string | Create remote session | undefined |

### Subcommands

#### Configuration Commands
```bash
claude config <action> [args] [options]
```

**Actions:**
- `get <key>` - Retrieve configuration value
- `set <key> <value>` - Set configuration value  
- `remove <key> [values...]` - Remove configuration
- `list` - List all configurations
- `add <key> <values...>` - Add to configuration array

**Options:**
- `-g, --global` - Apply to global scope

#### MCP Commands
```bash
claude mcp <action> [args] [options]
```

**Actions:**
- `serve` - Start MCP server
- `add <name> <command>` - Add MCP server
- `remove <name>` - Remove MCP server
- `list` - List MCP servers
- `get <name>` - Get server details
- `add-json <name> <json>` - Add via JSON
- `add-from-claude-desktop` - Import from Claude Desktop
- `reset-project-choices` - Reset project choices

**MCP-Specific Options:**
- `-s, --scope <scope>` - Configuration scope (local, user, project)
- `-t, --transport <transport>` - Transport type (stdio, sse, http)
- `-e, --env <env...>` - Environment variables
- `-H, --header <header...>` - WebSocket headers
- `-d, --debug` - Debug mode for serve
- `--verbose` - Verbose output for serve

#### System Commands
```bash
claude <system-command> [options]
```

**System Commands:**
- `migrate-installer` - Migration from global installation
- `setup-token` - Authentication token setup
- `doctor` - System health check
- `update` - Check and install updates
- `install [target]` - Install native build

**Install Options:**
- `--force` - Force installation

## Argument Processing

### Parsing Flow
```
Command Line Input
       ↓
Commander.js Parser
       ↓
Argument Validation
       ↓
Option Normalization  
       ↓
Command Dispatch
       ↓
Execution
```

### Validation Rules
1. **Mutual Exclusivity**: Some options cannot be used together
2. **Required Arguments**: Certain commands require specific arguments
3. **Type Checking**: Arguments validated against expected types
4. **Range Validation**: Numeric arguments checked for valid ranges

### Input Sources
1. **Command Line Arguments**: Primary input method
2. **Environment Variables**: Configuration overrides
3. **Configuration Files**: Stored preferences
4. **Interactive Prompts**: Runtime input collection
5. **Stdin Pipes**: Piped input processing

## Command Dispatch

### Dispatch Logic
```javascript
// Simplified dispatch flow
if (isConfigCommand(args)) {
    await handleConfigCommand(args);
} else if (isMcpCommand(args)) {
    await handleMcpCommand(args);
} else if (isSystemCommand(args)) {
    await handleSystemCommand(args);
} else {
    await handleMainCommand(args);
}
```

### Command Resolution
1. **Exact Match**: Direct command name matching
2. **Alias Resolution**: Command aliases and shortcuts
3. **Fallback Handling**: Default behavior for unmatched input
4. **Error Handling**: Invalid command processing

## Help System

### Auto-Generated Help
Commander.js automatically generates help for:
- Command usage patterns
- Option descriptions
- Subcommand listings
- Example usage

### Custom Help Extensions
- **Interactive Help**: Context-aware assistance
- **Example Generation**: Dynamic usage examples
- **Error Suggestions**: "Did you mean..." functionality
- **Documentation Links**: References to full documentation

## Error Handling

### Command-Level Errors
- **Invalid Arguments**: Missing or malformed arguments
- **Permission Errors**: Insufficient access rights
- **Validation Failures**: Argument validation errors
- **Execution Errors**: Runtime command failures

### Error Response Format
```javascript
{
    type: "error",
    subtype: "validation_error" | "permission_error" | "execution_error",
    message: "Human readable error message",
    details: {}, // Additional error context
    suggestions: [] // Possible solutions
}
```

## Integration Points

### Process Integration
- **Environment Variables**: System environment access
- **Working Directory**: Current directory context
- **Process Signals**: Signal handling (SIGINT, SIGTERM)
- **Exit Codes**: Standard exit code conventions

### System Integration
- **Shell Integration**: Shell completion support
- **Path Resolution**: Cross-platform path handling
- **User Authentication**: System credential access
- **File System**: Configuration and cache directories

## Configuration

### CLI Behavior Configuration
```javascript
{
    "defaultModel": "claude-3-sonnet",
    "outputFormat": "text",
    "verbose": false,
    "maxTurns": null,
    "autoUpdate": true
}
```

### Command Aliases
Support for custom command aliases:
```javascript
{
    "aliases": {
        "c": "config",
        "m": "mcp",
        "s": "mcp serve"
    }
}
```

## Performance Considerations

### Startup Optimization
- **Lazy Loading**: Commands loaded on-demand
- **Module Bundling**: Webpack optimization
- **Argument Parsing**: Efficient parsing algorithms
- **Cache Utilization**: Configuration and state caching

### Memory Management
- **Command Cleanup**: Proper resource cleanup after execution
- **Stream Handling**: Efficient stream processing
- **Process Management**: Child process lifecycle management

## Testing Specifications

### Command Testing
- **Unit Tests**: Individual command validation
- **Integration Tests**: End-to-end command execution
- **Error Testing**: Error condition handling
- **Performance Tests**: Command execution timing

### Mock Infrastructure
- **Argument Mocking**: Simulated command line input
- **Environment Mocking**: Controlled environment variables
- **File System Mocking**: Isolated file system operations
- **Network Mocking**: Controlled network responses

## Extension Points

### Custom Commands
Framework supports extension through:
- **Plugin System**: Dynamic command loading
- **Hook System**: Pre/post command execution hooks
- **Middleware**: Request/response processing middleware
- **Custom Parsers**: Specialized argument parsing

### Integration Hooks
- **Pre-execution**: Validation and setup hooks
- **Post-execution**: Cleanup and logging hooks  
- **Error Handling**: Custom error processing
- **Output Formatting**: Custom output formatters

This CLI framework specification provides the foundation for understanding how Claude Code processes command-line interactions and dispatches functionality throughout the application.