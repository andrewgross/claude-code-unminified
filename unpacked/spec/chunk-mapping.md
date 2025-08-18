# Claude Code CLI - Chunk Mapping Reference

## Overview
This document maps the 650 JavaScript chunks to their functional areas, providing a guide for extracting specific functionality during the clean code conversion process.

## Chunk Categories

### CLI Framework (chunks 640-650)
**Primary Purpose**: Command-line interface setup and routing
**Technology**: Commander.js
**Key Functions**: Argument parsing, command registration, help text

| Chunk | Size (bytes) | Key Functionality |
|-------|-------------|-------------------|
| chunk_0649.js | 19,616 | Main CLI setup, all command definitions, process.argv parsing |
| chunk_0650.js | 224 | Export statements, setup completion |
| chunk_0648.js | 19,425 | CLI implementation details |
| chunk_0647.js | 19,362 | Command handlers and options |

**Extraction Priority**: HIGH - Start here for CLI functionality

### Interactive UI & Core Logic (chunks 630-647)
**Primary Purpose**: React-based interactive interface, message handling
**Technology**: React with hooks, state management
**Key Functions**: Chat interface, streaming, tool execution

| Chunk | Size (bytes) | Key Functionality |
|-------|-------------|-------------------|
| chunk_0645.js | 19,392 | Git stash dialog (SlB component), teleport functionality |
| chunk_0644.js | 19,376 | Interactive components |
| chunk_0643.js | 19,380 | React UI state management |
| chunk_0642.js | 19,373 | Message processing |
| chunk_0641.js | 19,386 | Tool execution handling |
| chunk_0640.js | 19,289 | Async function handlers, context management |

**Extraction Priority**: HIGH - Core application logic

### Large Data/Configuration Chunks 
**Primary Purpose**: Configuration data, bundled dependencies
**Characteristics**: Very large chunks with minimal function declarations

| Chunk | Size (bytes) | Likely Content |
|-------|-------------|----------------|
| chunk_0297.js | 553,018 | Largest chunk - likely bundled dependency or data |
| chunk_0316.js | 377,676 | Large bundled dependency |
| chunk_0033.js | 235,667 | Configuration or data tables |
| chunk_0087.js | 225,814 | Bundled library code |
| chunk_0288.js | 196,279 | Library/framework code |
| chunk_0026.js | 189,177 | Data or configuration |

**Extraction Priority**: LOW - May contain useful utilities but mostly bloat

### Sentry Integration (chunks 2-30, scattered)
**Primary Purpose**: Error tracking, performance monitoring, instrumentation
**Technology**: Sentry SDK
**Key Functions**: Error boundaries, stack traces, monitoring

| Chunk | Sentry References | Key Sentry Functionality |
|-------|------------------|-------------------------|
| chunk_0025.js | 26 | Highest Sentry usage - core error tracking |
| chunk_0010.js | 20 | Stack trace processing |
| chunk_0003.js | 17 | Error boundaries, DOM integration |
| chunk_0011.js | 15 | Instrumentation handlers |
| chunk_0027.js | 14 | Performance monitoring |
| chunk_0002.js | 14 | DOM manipulation for Sentry |

**Extraction Priority**: EXCLUDE - Remove entirely from clean version

### Node.js Utilities (chunks 1-100)
**Primary Purpose**: File system, process management, module loading
**Technology**: Node.js built-ins, CommonJS patterns
**Key Functions**: Path handling, file I/O, process utilities

| Chunk Range | Key Functionality |
|-------------|-------------------|
| chunks 1-10 | Module system, require handling, file utilities |
| chunks 11-30 | Process management, spawn utilities, path handling |
| chunks 31-60 | Additional Node.js utilities, bundled modules |

**Extraction Priority**: MEDIUM - Extract useful utilities, discard bundling overhead

## Functional Area Mapping

### 1. CLI Command Structure
**Location**: chunk_0649.js:5-664
**Key Sections**:
- Main command: lines 5-367
- Config subcommands: lines 368-420  
- MCP subcommands: lines 421-618
- Utility commands: lines 619-664

### 2. Configuration Management
**Location**: Distributed across chunks 640-649
**Key Functions**:
- Config get/set/list operations
- Global vs local scope handling
- JSON file management

### 3. MCP Server Integration  
**Location**: chunk_0649.js:421-618
**Key Features**:
- Server discovery and management
- Transport layer (stdio/sse/http)
- Configuration import/export
- Claude Desktop integration

### 4. Interactive Session Management
**Location**: chunks 630-645
**Key Components**:
- React components for UI
- Message streaming and processing  
- Tool execution and permissions
- Session persistence and resumption

### 5. Authentication & Setup
**Location**: chunks 640-650
**Functions**:
- Token-based authentication
- Setup wizard components
- Health check diagnostics

## Extraction Strategy by Functional Area

### Phase 1: CLI Framework
1. Extract command definitions from chunk_0649.js
2. Clean up Commander.js usage
3. Create separate files for each command group
4. Remove Sentry initialization

### Phase 2: Core Application Logic
1. Extract React components from chunks 630-645
2. Separate UI from business logic
3. Clean up state management patterns
4. Remove instrumentation hooks

### Phase 3: Utility Functions
1. Extract Node.js utilities from chunks 1-100  
2. Remove bundling wrapper functions
3. Create clean utility modules
4. Document extracted functions

### Phase 4: MCP Integration
1. Extract MCP code from chunk_0649.js
2. Create separate transport implementations
3. Simplify configuration management
4. Remove unnecessary abstractions

## Variable Renaming Guide

Common obfuscated patterns found across chunks:

| Obfuscated | Context | Suggested Clean Name |
|------------|---------|---------------------|
| `tlB` | createRequire import | `createRequire` |
| `W1` | require function | `nodeRequire` |
| `E` | Module factory function | `createModule` |
| `G1` | ES Module interop | `createEsModuleInterop` |
| `Z3` | React import | `React` |
| `A, B, Q, Z` | Function parameters | Use descriptive names based on context |

## High-Value Extraction Targets

### Immediate Value (Extract First)
1. CLI command definitions (chunk_0649.js)
2. Main interactive loop (chunks 640-645)
3. Configuration management (scattered)
4. MCP server handling (chunk_0649.js:421-618)

### Medium Value (Extract After Core)
1. Node.js utilities (chunks 1-50)
2. React UI components (chunks 630-640)  
3. File system operations (chunks 10-30)
4. Session management (chunks 635-645)

### Low Value (Extract Last or Skip)
1. Sentry integration (chunks 2-30) - REMOVE
2. Large data chunks (297, 316, 33, 87) - May contain some utilities
3. Bundling overhead (distributed) - REMOVE
4. Performance monitoring (chunks 20-30) - REMOVE

This mapping provides a systematic approach to extracting clean, readable code from the obfuscated bundle while prioritizing the most important functionality first.