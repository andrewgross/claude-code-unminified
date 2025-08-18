# Claude Code CLI - Technical Architecture Specification

## Overview

This document provides a detailed technical specification for the Claude Code CLI based on analysis of the unpacked JavaScript bundle. The original code is a bundled, obfuscated application that we're converting to a clean, readable architecture.

## Source Analysis Summary

- **Total Lines**: ~369,000 lines across 650 chunks
- **Bundle Type**: ES Module/CommonJS hybrid with obfuscated variable names
- **Main Technology Stack**: Node.js, React, Commander.js
- **Third-party Dependencies**: Extensive Sentry SDK integration (245 references)

## Architecture Components

### 1. CLI Framework (chunks 640-650)

**Technology**: Commander.js for command-line parsing
**Location**: Final chunks contain the main CLI setup

#### Main Commands Structure:
```javascript
// Source reference: chunk_0649.js lines 5-664
claude [prompt]                    // Interactive mode (default)
claude config <subcommand>         // Configuration management  
claude mcp <subcommand>           // MCP server management
claude setup-token               // Authentication setup
claude doctor                    // Health diagnostics
claude update                    // Version management
claude install [target]          // Installation management
claude migrate-installer         // Migration utilities
```

#### Command Options:
- `--debug, -d`: Debug mode
- `--print, -p`: Non-interactive output
- `--output-format`: text/json/stream-json
- `--model`: Model selection
- `--mcp-config`: MCP server configuration
- `--settings`: Settings file/JSON
- `--continue, -c`: Continue recent conversation
- `--resume, -r`: Resume specific session

### 2. Configuration Management (chunk_0649.js:368-420)

#### Config Subcommands:
- `config get <key>`: Retrieve configuration value
- `config set <key> <value>`: Set configuration value  
- `config remove <key>`: Remove configuration value
- `config list`: List all configuration values
- `config add <key> <values...>`: Add to configuration arrays

#### Scope Options:
- `--global, -g`: Global configuration scope
- Local configuration (default)

### 3. MCP (Model Control Protocol) Management (chunk_0649.js:421-618)

#### MCP Subcommands:
- `mcp serve`: Start MCP server
- `mcp add <name> <command> [args]`: Add server configuration
- `mcp remove <name>`: Remove server
- `mcp list`: List configured servers
- `mcp get <name>`: Get server details
- `mcp add-json <name> <json>`: Add server via JSON
- `mcp add-from-claude-desktop`: Import from Claude Desktop
- `mcp reset-project-choices`: Reset project approvals

#### Transport Types:
- `stdio`: Standard I/O transport
- `sse`: Server-Sent Events  
- `http`: HTTP transport

#### Configuration Scopes:
- `local`: Project-level (.mcp.json)
- `user`: User-level configuration
- `project`: Project-specific settings

### 4. Core Application Logic (chunks 630-645)

**Technology**: React with hooks for interactive UI
**Location**: chunks 630-650 contain React components and state management

#### Key Functionality:
- Interactive chat interface
- Message processing and streaming
- Tool usage and permissions
- Session management and resumption
- Git integration for teleport functionality

#### React Components Structure:
```javascript
// Source reference: chunk_0645.js
- SlB: Git stash dialog component
- Interactive prompt handling
- Error boundary components
- Loading states and spinners
```

### 5. Module System (chunks 1-40)

**Pattern**: CommonJS/ES Module bundling with factory functions
```javascript
// Source reference: chunk_0001.js:25-27
var E = (A, B) => () => (B || A((B = {
    exports: {}
}).exports, B), B.exports);
```

#### Bundling Pattern:
- Each major dependency wrapped in factory function
- Lazy loading with module caching
- ES Module interop layer
- Import/export transformation

### 6. Sentry Integration (chunks 2-30, distributed)

**Extent**: 245 references across 20+ chunks, primarily chunks 2-30
**Purpose**: Error tracking, performance monitoring, instrumentation

#### Major Sentry Components:
- **Error Boundaries**: chunks 2-5
- **Stack Trace Parsing**: chunks 8-12  
- **Instrumentation Handlers**: chunks 15-20
- **Browser/DOM Integration**: chunks 20-25
- **Performance Monitoring**: chunks 25-30

#### Sentry-heavy Chunks:
- chunk_0025.js: 26 references (most intensive)
- chunk_0010.js: 20 references
- chunk_0003.js: 17 references
- chunk_0011.js: 15 references

## Data Flow Architecture

### 1. CLI Initialization Flow
```
chunk_0649.js:664 -> process.argv parsing -> command routing -> action handlers
```

### 2. Interactive Mode Flow
```
Main command -> React UI initialization -> Message loop -> Tool execution -> Response handling
```

### 3. MCP Integration Flow
```
MCP command -> Server discovery -> Transport initialization -> Protocol handling
```

## Key Technical Patterns

### 1. Obfuscated Variables
- Original uses single-letter and short cryptic names (A, B, Q, Z, tlB, alB, etc.)
- Pattern: `var ${hash} = ${expression}`
- Needs systematic renaming for readability

### 2. Module Wrapping
```javascript
var ModuleName = E((exports, module) => {
    // Module implementation
    module.exports = implementation;
});
```

### 3. React Hooks Pattern
```javascript
// Source: chunk_0645.js:6
let [state, setState] = Z3.useState(initialValue);
Z3.useEffect(() => { /* effect */ }, [dependencies]);
```

## Clean Architecture Implementation Plan

### Phase 1: Directory Structure
```
./clean/
├── src/
│   ├── cli/                 # Command-line interface
│   │   ├── commands/        # Individual command implementations
│   │   ├── options.js       # CLI option definitions
│   │   └── index.js         # Main CLI setup
│   ├── core/                # Core Claude functionality
│   │   ├── messaging/       # Message handling
│   │   ├── tools/          # Tool management
│   │   ├── sessions/       # Session management
│   │   └── streaming/      # Response streaming
│   ├── mcp/                 # MCP server management
│   │   ├── server.js        # MCP server implementation
│   │   ├── transport/       # Transport implementations
│   │   ├── config.js        # Server configuration
│   │   └── discovery.js     # Server discovery
│   ├── config/              # Configuration management
│   │   ├── manager.js       # Config CRUD operations
│   │   ├── scopes.js        # Local/global scopes
│   │   └── validation.js    # Config validation
│   ├── ui/                  # Interactive UI components
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom React hooks
│   │   └── renderer.js     # Terminal rendering
│   └── utils/               # Utility functions
│       ├── git.js          # Git operations
│       ├── files.js        # File system utilities
│       └── validation.js   # Input validation
├── spec/                    # Technical documentation
└── docs/                    # User documentation
```

### Phase 2: Code Extraction Priority

1. **CLI Commands** (chunks 640-650)
   - Extract command definitions and options
   - Create clean command handlers
   - Remove Sentry initialization

2. **Core Logic** (chunks 630-640)
   - Extract React components
   - Clean up state management
   - Remove instrumentation hooks

3. **MCP Integration** (chunks 620-630)
   - Extract server management
   - Clean transport implementations
   - Simplify configuration handling

4. **Utility Functions** (chunks 1-100)
   - Extract Node.js utilities
   - Remove bundling overhead
   - Clean up module exports

### Phase 3: Sentry Removal Strategy

**Target**: Remove all 245 Sentry references
**Approach**: 
1. Identify core chunks (2-30) with heavy Sentry usage
2. Extract functional code, discard monitoring code
3. Replace error tracking with simple console logging
4. Remove performance monitoring entirely

### Phase 4: Variable Renaming Strategy

**Pattern Replacement**:
- `tlB` -> `createRequire`
- `W1` -> `nodeRequire` 
- `E` -> `createModule`
- `G1` -> `createEsModuleInterop`
- Single letters (A, B, Q, Z) -> descriptive names based on context

## Implementation Guidelines

### Code Style
- Use descriptive variable and function names
- Add comprehensive JSDoc comments
- Follow consistent naming conventions
- Remove unnecessary abstractions

### Error Handling
- Replace Sentry with simple error logging
- Use standard Node.js error patterns
- Provide helpful error messages
- Remove performance monitoring

### Dependencies
- Minimize external dependencies
- Extract only necessary functionality from bundles
- Use standard Node.js APIs where possible
- Document all remaining dependencies

### Testing Strategy
- Extract testable units from bundled code
- Create unit tests for core functionality
- Test CLI commands in isolation
- Verify MCP integration works correctly

This specification provides the roadmap for converting the obfuscated, bundled Claude Code CLI into a clean, maintainable, and understandable codebase while preserving all core functionality.