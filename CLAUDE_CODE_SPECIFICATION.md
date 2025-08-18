# Claude Code CLI Application Specification

## Overview

**Application**: Claude Code CLI  
**Version**: 1.0.83  
**Type**: Webpack-bundled CommonJS TypeScript application  
**Entry Point**: `#!/usr/bin/env node`  
**File Size**: 3,484 lines of minified/compiled code  

This document provides a comprehensive specification library of features for the Claude Code CLI application, extracted from reverse-engineering the compiled JavaScript bundle.

## Core Architecture

### Technology Stack
- **CLI Framework**: Commander.js for command-line argument parsing
- **UI Framework**: React components for interactive terminal UI
- **Build System**: Webpack bundling with module system
- **Language**: TypeScript (compiled to JavaScript)
- **Error Reporting**: Sentry SDK integration
- **Process Management**: Cross-spawn for cross-platform process execution

### Module Structure
The application is structured as a webpack bundle with the following key module categories:
- **CLI Core**: Command parsing, execution flow, and argument handling
- **MCP Integration**: Model Context Protocol server management
- **Authentication**: Token management, OAuth, API key handling
- **Session Management**: Conversation persistence, resume functionality
- **File System**: Project analysis, file operations, and configuration
- **Transport Layer**: HTTP, WebSocket, and stream handling
- **UI Components**: React-based terminal interfaces

## Command Line Interface

### Primary Entry Point
```bash
claude [prompt] [options]
```

**Options:**
- `--verbose` - Enable verbose logging output
- `--debug` - Enable debug mode with detailed diagnostics
- `--print` - Enable print mode for formatted output
- `--output-format <format>` - Output format: json, stream-json, text (default)
- `--input-format <format>` - Input format: json, stream-json, text (default)  
- `--max-turns <number>` - Limit maximum conversation turns
- `--model <model>` - Specify AI model to use
- `--continue` - Continue previous conversation session
- `--resume <sessionId>` - Resume specific conversation by ID
- `--teleport [session]` - Resume teleport session functionality
- `--remote <description>` - Create remote session with description

### Configuration Management
```bash
claude config <subcommand> [options]
```

**Subcommands:**
- `get <key> [-g|--global]` - Retrieve configuration value
- `set <key> <value> [-g|--global]` - Set configuration value
- `remove <key> [values...] [-g|--global]` - Remove configuration value or array items
- `list [-g|--global]` - List all configuration values
- `add <key> <values...> [-g|--global]` - Add items to configuration array

**Configuration Scopes:**
- **Global** (`-g`, `--global`): User-wide settings across all projects
- **Local**: Directory-specific settings
- **Project**: Project-wide settings for team collaboration

### MCP (Model Context Protocol) Server Management
```bash
claude mcp <subcommand> [options]
```

**Core MCP Commands:**
- `serve [-d|--debug] [--verbose]` - Start Claude Code MCP server
- `add <name> <commandOrUrl> [args...]` - Add new MCP server
- `remove <name> [-s|--scope]` - Remove existing MCP server
- `list` - List all configured MCP servers
- `get <name>` - Get detailed information about specific server
- `add-json <name> <json> [-s|--scope]` - Add server using JSON configuration
- `add-from-claude-desktop [-s|--scope]` - Import servers from Claude Desktop
- `reset-project-choices` - Reset project-specific server choices

**MCP Add Options:**
- `-s|--scope <scope>` - Configuration scope: local, user, project
- `-t|--transport <transport>` - Transport method: stdio, sse, http
- `-e|--env <env...>` - Environment variables for server
- `-H|--header <header...>` - WebSocket headers for connection

### System Management
```bash
claude <system-command> [options]
```

**System Commands:**
- `migrate-installer` - Migrate from global to local installation
- `setup-token` - Set up long-lived authentication token
- `doctor` - Check auto-updater health and system diagnostics
- `update` - Check for and install application updates
- `install [target] [--force]` - Install Claude Code native build

## Core Features

### 1. Interactive AI Conversations
- **Default Mode**: Interactive chat session with Claude AI
- **Prompt Input**: Accept initial prompts via command line or interactively
- **Session Continuity**: Continue previous conversations seamlessly
- **Multi-turn Conversations**: Support for extended back-and-forth dialogue
- **Model Selection**: Choose from available Claude AI models

### 2. Session Management
- **Session Persistence**: Automatic saving of conversation history
- **Resume Functionality**: Resume conversations by session ID
- **Teleport Sessions**: Special remote session handling
- **Checkpointing**: Save conversation state at specific points
- **History Management**: View and manage conversation history

### 3. MCP Server Integration
- **Multi-Transport Support**: stdio, Server-Sent Events (SSE), HTTP
- **Server Health Monitoring**: Automatic health checking and status reporting
- **Configuration Import/Export**: Share server configurations
- **Scope Management**: Project, user, and local server configurations
- **Desktop Integration**: Import existing Claude Desktop server configs

### 4. Authentication & Security
- **Multiple Auth Methods**: API keys, OAuth tokens, session tokens
- **Token Management**: Secure storage and rotation of authentication tokens
- **Permission System**: Granular tool and operation permissions
- **Environment Variables**: Configuration via environment variables
- **Setup Wizards**: Guided authentication setup for new users

### 5. File System Operations
- **Project Analysis**: Deep understanding of project structure
- **File Content Analysis**: Read and analyze code files
- **Configuration Management**: Handle various configuration file types
- **Directory Operations**: Recursive directory reading and processing
- **Path Resolution**: Cross-platform path handling

### 6. Input/Output Formats
- **Text Mode** (Default): Human-readable conversational interface
- **JSON Format**: Structured data input/output for programmatic use
- **Stream-JSON**: Real-time streaming JSON for live processing
- **SDK Integration**: Direct API access through SDK URLs

### 7. Tool & Permission Management
- **Tool Contexts**: Manage contexts for different tool operations
- **Permission Prompts**: Interactive permission approval system
- **Allowed/Disallowed Lists**: Configure tool access permissions
- **External Tool Integration**: Connect with external development tools

## Technical Implementation Details

### Module System
The application uses a custom webpack module system with the following patterns:
```javascript
var E=(A,B)=>()=>(B||A((B={exports:{}}).exports,B),B.exports);
```
This creates a module wrapper for CommonJS-style exports.

### Error Handling
- **Sentry Integration**: Comprehensive error reporting and telemetry
- **Stack Traces**: Detailed error stack analysis
- **Error Recovery**: Graceful handling of various failure modes
- **Debug Logging**: Extensive logging for troubleshooting

### Process Management
- **Cross-Spawn**: Cross-platform process spawning and management  
- **Signal Handling**: Proper handling of process signals and cleanup
- **Child Process Communication**: IPC with spawned processes
- **Process Monitoring**: Health checking of background processes

### Network & Transport
- **HTTP/HTTPS Client**: Full-featured HTTP client with proxy support
- **WebSocket Support**: Real-time bidirectional communication
- **Transport Abstraction**: Unified interface for different transport types
- **Connection Pooling**: Efficient connection management

### Configuration System
The application supports a hierarchical configuration system:

1. **Global Configuration**: `~/.config/claude-code/` (or OS equivalent)
2. **Project Configuration**: `.claude/` directory in project root
3. **Local Configuration**: Directory-specific settings
4. **Environment Variables**: Runtime configuration overrides

**Key Configuration Files:**
- `.mcp.json` - MCP server definitions
- `config.json` - General application settings
- `auth.json` - Authentication tokens and credentials

### React UI Components
The application includes sophisticated React-based terminal UI components:
- **Interactive Prompts**: Multi-choice selection interfaces
- **Progress Indicators**: Real-time progress and loading states
- **Form Inputs**: Configuration and setup forms
- **Error Displays**: Formatted error presentation
- **Help Systems**: Interactive help and documentation

## Integration Points

### Claude Desktop Integration
- Import existing MCP server configurations
- Shared authentication tokens
- Consistent user experience across platforms

### Development Tool Integration
- Code editor integrations
- CI/CD pipeline compatibility
- Version control system awareness
- Project structure understanding

### External Service Integration
- API endpoint connections
- Webhook support
- Third-party service authentication
- Cloud platform integration

## Security Considerations

### Authentication
- Secure token storage using OS credential managers
- Token rotation and expiration handling
- Multi-factor authentication support
- API key encryption and protection

### Permission System
- Granular tool permissions
- Interactive permission prompts
- Permission context management
- Audit logging of permission changes

### Network Security
- TLS/SSL for all network communications
- Certificate validation
- Proxy authentication support
- Network request filtering

## Performance Characteristics

### Optimization Features
- **Webpack Bundling**: Single-file distribution reduces startup time
- **Module Lazy Loading**: On-demand loading of feature modules
- **Connection Pooling**: Efficient network resource usage
- **Caching**: Intelligent caching of responses and configurations
- **Stream Processing**: Efficient handling of large data streams

### Resource Management
- **Memory Management**: Efficient memory usage and garbage collection
- **File Handle Management**: Proper cleanup of file system resources
- **Process Cleanup**: Automatic cleanup of child processes
- **Connection Cleanup**: Proper teardown of network connections

## Extensibility

### Plugin Architecture
The MCP server system provides a plugin architecture allowing:
- Custom tool integration
- External service connections
- Workflow automation
- Custom transport implementations

### Configuration Extensibility
- Custom configuration scopes
- Environment-specific configurations
- Template-based configurations
- Dynamic configuration loading

This specification provides a comprehensive overview of the Claude Code CLI application's capabilities, architecture, and implementation details as extracted from the compiled JavaScript bundle.