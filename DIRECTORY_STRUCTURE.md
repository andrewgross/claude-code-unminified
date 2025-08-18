# Claude Code Deobfuscated Directory Structure

## Overview
This document outlines the planned directory structure for the deobfuscated Claude Code application, organized by functional domains as identified in the technical specifications.

## Proposed Directory Structure

```
claude-code/
├── specs/                              # Technical specifications (existing)
│   ├── cli-framework.md
│   ├── mcp-integration.md
│   ├── authentication-security.md
│   ├── session-management.md
│   ├── module-system.md
│   └── [additional specs...]
├── src/                                # Deobfuscated source code
│   ├── cli/                           # CLI Framework components
│   │   ├── parser.js                  # Command line argument parsing
│   │   ├── commands/                  # Command implementations
│   │   │   ├── main.js               # Main interactive command
│   │   │   ├── config.js             # Configuration commands
│   │   │   ├── mcp.js                # MCP management commands
│   │   │   └── system.js             # System management commands
│   │   ├── help.js                   # Help system
│   │   └── dispatcher.js             # Command dispatch logic
│   ├── auth/                         # Authentication & Security
│   │   ├── oauth.js                  # OAuth authentication flow
│   │   ├── token-manager.js          # Token management and refresh
│   │   ├── credential-store.js       # OS credential manager integration
│   │   ├── permission-engine.js      # Permission validation and prompts
│   │   └── security-monitor.js       # Security monitoring and audit
│   ├── mcp/                          # MCP Integration
│   │   ├── client.js                 # Core MCP client implementation
│   │   ├── server-manager.js         # Server lifecycle management
│   │   ├── transports/               # Transport implementations
│   │   │   ├── stdio.js              # STDIO transport
│   │   │   ├── sse.js                # Server-Sent Events transport
│   │   │   └── http.js               # HTTP transport
│   │   ├── protocol.js               # MCP protocol message handling
│   │   ├── health-monitor.js         # Server health checking
│   │   └── config.js                 # MCP configuration management
│   ├── session/                      # Session Management
│   │   ├── manager.js                # Session lifecycle management
│   │   ├── store.js                  # Session persistence
│   │   ├── state.js                  # Conversation state management
│   │   ├── checkpoints.js            # Checkpointing system
│   │   └── teleport.js               # Remote session synchronization
│   ├── config/                       # Configuration System
│   │   ├── manager.js                # Configuration management
│   │   ├── scopes.js                 # Multi-scope configuration
│   │   ├── validation.js             # Configuration validation
│   │   └── migration.js              # Configuration migration
│   ├── fs/                           # File System Operations
│   │   ├── operations.js             # Core file operations
│   │   ├── path-resolver.js          # Cross-platform path handling
│   │   ├── project-analyzer.js       # Project structure analysis
│   │   └── config-loader.js          # Configuration file loading
│   ├── io/                           # Input/Output Formats
│   │   ├── formatters/               # Output formatters
│   │   │   ├── text.js               # Text format output
│   │   │   ├── json.js               # JSON format output
│   │   │   └── stream-json.js        # Streaming JSON output
│   │   ├── parsers/                  # Input parsers
│   │   │   ├── text.js               # Text input parsing
│   │   │   ├── json.js               # JSON input parsing
│   │   │   └── stream-json.js        # Streaming JSON parsing
│   │   └── streams.js                # Stream handling utilities
│   ├── tools/                        # Tool & Permission Management
│   │   ├── registry.js               # Tool registry and discovery
│   │   ├── executor.js               # Tool execution engine
│   │   ├── permissions.js            # Tool permission management
│   │   └── context.js                # Tool execution context
│   ├── network/                      # Network & Transport
│   │   ├── http-client.js            # HTTP client with auth
│   │   ├── websocket.js              # WebSocket client
│   │   ├── transport-abstraction.js  # Transport layer abstraction
│   │   └── connection-pool.js        # Connection pooling
│   ├── ui/                           # React UI Components
│   │   ├── components/               # React components
│   │   │   ├── prompts/              # Interactive prompts
│   │   │   ├── progress/             # Progress indicators
│   │   │   ├── forms/                # Input forms
│   │   │   └── displays/             # Output displays
│   │   ├── hooks/                    # Custom React hooks
│   │   └── context/                  # React context providers
│   ├── utils/                        # Utility modules
│   │   ├── logger.js                 # Logging system
│   │   ├── crypto.js                 # Cryptographic utilities
│   │   ├── validation.js             # Input validation utilities
│   │   ├── errors.js                 # Error handling utilities
│   │   └── performance.js            # Performance monitoring
│   ├── core/                         # Core application logic
│   │   ├── app.js                    # Main application entry
│   │   ├── module-loader.js          # Dynamic module loading
│   │   ├── service-container.js      # Dependency injection
│   │   └── event-emitter.js          # Event system
│   └── integrations/                 # External integrations
│       ├── claude-desktop.js         # Claude Desktop integration
│       ├── git.js                    # Git integration
│       └── ide/                      # IDE integrations
├── test/                             # Test files (to be extracted)
│   ├── unit/                         # Unit tests
│   ├── integration/                  # Integration tests
│   └── fixtures/                     # Test fixtures
├── docs/                             # Additional documentation
├── cli.js                            # Original obfuscated file
├── CLAUDE_CODE_SPECIFICATION.md      # Master specification
└── DIRECTORY_STRUCTURE.md            # This file
```

## Deobfuscation Strategy

### Phase 1: Core Framework Extraction
1. **CLI Framework** (`src/cli/`)
   - Extract Commander.js usage and command definitions
   - Separate command implementations
   - Identify argument parsing logic

2. **Module System** (`src/core/`)
   - Extract webpack module wrappers
   - Identify module dependencies
   - Create service container and module loader

### Phase 2: Feature Domain Extraction  
3. **Authentication** (`src/auth/`)
   - OAuth flow implementation
   - Token management
   - Credential storage

4. **MCP Integration** (`src/mcp/`)
   - MCP client protocol
   - Transport implementations
   - Server management

5. **Session Management** (`src/session/`)
   - Session persistence
   - State management
   - Checkpointing

### Phase 3: Supporting Systems
6. **Configuration** (`src/config/`)
   - Multi-scope configuration
   - Validation and migration

7. **File System** (`src/fs/`)
   - File operations
   - Path handling
   - Project analysis

8. **Network & Transport** (`src/network/`)
   - HTTP client
   - WebSocket handling
   - Connection management

### Phase 4: UI and Utilities
9. **React Components** (`src/ui/`)
   - Terminal UI components
   - Interactive prompts
   - Progress indicators

10. **Utilities** (`src/utils/`)
    - Logging system
    - Crypto utilities
    - Error handling

## Deobfuscation Methodology

### 1. Pattern Recognition
- Identify webpack module patterns: `var E=(A,B)=>()=>(B||A((B={exports:{}}).exports,B),B.exports);`
- Recognize CommonJS exports: `module.exports = ...`
- Find function signatures and class definitions

### 2. Symbol Mapping
- Map obfuscated variable names to meaningful names
- Identify function purposes through usage patterns
- Create symbol mapping tables for consistency

### 3. Code Structure Analysis
- Group related functions into modules
- Identify class hierarchies and inheritance
- Map import/export relationships

### 4. Documentation Extraction
- Extract JSDoc comments where present
- Infer function parameters and return types
- Document API interfaces and contracts

### 5. Testing Framework
- Extract test cases from bundled code
- Create unit tests for extracted modules
- Validate deobfuscation accuracy

## File Organization Principles

### 1. Domain Separation
Each major functional area gets its own directory with clear boundaries and minimal coupling.

### 2. Layered Architecture
- **Core**: Fundamental application logic
- **Services**: Business logic and feature implementation  
- **Infrastructure**: External integrations and utilities
- **UI**: User interface components and interactions

### 3. Dependency Flow
- Core depends on nothing
- Services depend on core
- Infrastructure depends on services and core
- UI depends on all layers

### 4. Module Cohesion
- Each module has a single responsibility
- Related functions grouped together
- Clear module interfaces and exports

This structure provides a clear roadmap for deobfuscating and organizing the Claude Code application into maintainable, understandable modules while preserving all functionality.