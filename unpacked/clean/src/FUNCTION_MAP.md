# Claude Code CLI - Function Mapping Reference

## 🎯 Purpose

This document maps obfuscated function names from the original bundled implementation to their clean equivalents in our readable architecture.

## 📊 Core Function Mappings

### CLI Framework Functions

| Original | Clean | Purpose | Location | Status |
|----------|-------|---------|-----------|--------|
| `scB` | `Command` | Commander.js Command class | `cli/index.js` | ✅ **MAPPED** |
| `PU` | `Option` | Commander.js Option class | `cli/index.js` | ✅ **MAPPED** |
| `tlB` | `program` | Main CLI program instance | `cli/index.js` | ✅ **MAPPED** |

### Critical Core Functions

| Original | Clean | Purpose | Implementation Status |
|----------|-------|---------|----------------------|
| `Tb()` | `startInteractiveSession()` | Initialize interactive Claude session | ⚠️ **STUB** |
| `X1()` | `initializeTelemetry()` | Setup usage analytics (optional) | ❌ **EXCLUDED** |
| `XN2()` | `getConfigValue()` | Retrieve configuration values | ⚠️ **STUB** |
| `VN2()` | `setConfigValue()` | Persist configuration values | ⚠️ **STUB** |
| `W1` | `configManager` | Global configuration object | ⚠️ **STUB** |

### Configuration System Functions

| Original | Clean | Purpose | Module | Status |
|----------|-------|---------|---------|--------|
| Various obfuscated | `ConfigManager.get()` | Get config value | `config/manager.js` | ⚠️ **STUB** |
| Various obfuscated | `ConfigManager.set()` | Set config value | `config/manager.js` | ⚠️ **STUB** |
| Various obfuscated | `ConfigManager.remove()` | Delete config key | `config/manager.js` | ⚠️ **STUB** |
| Various obfuscated | `ConfigManager.list()` | List all config keys | `config/manager.js` | ⚠️ **STUB** |

### MCP Server Functions

| Original | Clean | Purpose | Module | Status |
|----------|-------|---------|---------|--------|
| Various obfuscated | `MCPServerManager.serve()` | Start MCP server | `mcp/server-manager.js` | ⚠️ **STUB** |
| Various obfuscated | `MCPServerManager.add()` | Add MCP server config | `mcp/server-manager.js` | ⚠️ **STUB** |
| Various obfuscated | `MCPServerManager.remove()` | Remove MCP server | `mcp/server-manager.js` | ⚠️ **STUB** |
| Various obfuscated | `MCPServerManager.list()` | List configured servers | `mcp/server-manager.js` | ⚠️ **STUB** |

### Authentication Functions

| Original | Clean | Purpose | Module | Status |
|----------|-------|---------|---------|--------|
| Various obfuscated | `TokenManager.setup()` | Initialize authentication | `auth/token-manager.js` | ⚠️ **STUB** |
| Various obfuscated | `TokenManager.validate()` | Verify token validity | `auth/token-manager.js` | ⚠️ **STUB** |
| Various obfuscated | `TokenManager.refresh()` | Refresh expired tokens | `auth/token-manager.js` | ⚠️ **STUB** |

## 🔍 Variable Mapping Reference

### Global Variables

| Original | Clean | Type | Purpose | Status |
|----------|-------|------|---------|--------|
| `W1` | `globalConfig` | Object | Global configuration state | ⚠️ **STUB** |
| `tlB` | `cliProgram` | Command | Main CLI program instance | ✅ **IMPLEMENTED** |
| Various | `sessionManager` | SessionManager | Active session tracking | ⚠️ **STUB** |
| Various | `mcpServers` | Map | Active MCP server connections | ⚠️ **STUB** |

### Configuration Variables

| Original | Clean | Type | Purpose | Status |
|----------|-------|------|---------|--------|
| Various | `LOCAL_CONFIG_PATH` | String | Local config file path | ✅ **DEFINED** |
| Various | `GLOBAL_CONFIG_PATH` | String | Global config file path | ✅ **DEFINED** |
| Various | `DEFAULT_CONFIG` | Object | Default configuration values | ⚠️ **PARTIAL** |

## 🧬 React Component Mappings

### UI Components (from chunks 630-640)

| Original | Clean | Purpose | Status |
|----------|-------|---------|--------|
| Various obfuscated | `InteractiveSession` | Main interactive UI component | ❌ **NOT EXTRACTED** |
| Various obfuscated | `MessageDisplay` | Chat message rendering | ❌ **NOT EXTRACTED** |
| Various obfuscated | `InputHandler` | User input processing | ❌ **NOT EXTRACTED** |
| Various obfuscated | `StatusBar` | Session status display | ❌ **NOT EXTRACTED** |
| Various obfuscated | `ToolOutput` | Tool execution results | ❌ **NOT EXTRACTED** |

## 🛠️ Utility Function Mappings

### System Utilities

| Original | Clean | Purpose | Module | Status |
|----------|-------|---------|---------|--------|
| Various | `SystemDiagnostics.check()` | Run system health checks | `utils/diagnostics.js` | ⚠️ **STUB** |
| Various | `UpdateManager.check()` | Check for updates | `utils/update-manager.js` | ⚠️ **STUB** |
| Various | `InstallManager.install()` | Install specific version | `utils/install-manager.js` | ⚠️ **STUB** |
| Various | `MigrationManager.migrate()` | Handle installation migration | `utils/migration.js` | ⚠️ **STUB** |

### Error Handling Functions

| Original | Clean | Purpose | Module | Status |
|----------|-------|---------|---------|--------|
| Various | `ErrorHandler.handle()` | Process and display errors | `utils/error-handler.js` | ⚠️ **STUB** |
| Various | `ValidationError` | Configuration validation errors | `utils/error-handler.js` | ⚠️ **STUB** |
| Various | `APIError` | Claude API communication errors | `utils/error-handler.js` | ⚠️ **STUB** |

## 🔬 High-Priority Extraction Targets

### Functions Requiring Immediate Implementation

1. **`Tb()` → `startInteractiveSession()`**
   - **Location**: chunk_0649.js (main command handler)
   - **Complexity**: HIGH (React UI integration)
   - **Dependencies**: Session management, React components, WebSocket handling

2. **`XN2()` → `getConfigValue()`** 
   - **Location**: chunks 640-645 (config commands)
   - **Complexity**: MEDIUM (JSON file I/O)
   - **Dependencies**: File system access, schema validation

3. **`VN2()` → `setConfigValue()`**
   - **Location**: chunks 640-645 (config commands) 
   - **Complexity**: MEDIUM (JSON persistence)
   - **Dependencies**: File system access, backup/restore

4. **React UI Components**
   - **Location**: chunks 630-640
   - **Complexity**: HIGH (Terminal UI framework)
   - **Dependencies**: React hooks, terminal rendering

## 📋 Implementation Roadmap

### Phase 1: Core Functions (Week 1)
- [ ] Extract and implement `getConfigValue()` / `setConfigValue()`
- [ ] Build configuration JSON I/O operations  
- [ ] Implement basic error handling patterns

### Phase 2: Session Management (Week 2)
- [ ] Extract main session logic from `Tb()`
- [ ] Implement session persistence and resumption
- [ ] Add print mode functionality

### Phase 3: Interactive UI (Week 3-4)
- [ ] Extract React components from chunks 630-640
- [ ] Build terminal UI framework
- [ ] Implement message streaming and tool execution

### Phase 4: Advanced Features (Week 5)
- [ ] MCP server communication protocol
- [ ] Authentication and token management
- [ ] System diagnostics and update management

## 🎯 Validation Strategy

### Function-by-Function Testing
1. **Unit Tests**: Test each clean function in isolation
2. **Integration Tests**: Verify function interactions match original behavior
3. **Behavioral Tests**: Ensure output and side effects are identical
4. **Performance Tests**: Compare execution speed and resource usage

### Mapping Verification  
1. **Code Coverage**: Ensure all original functions have clean equivalents
2. **Parameter Matching**: Verify function signatures are preserved
3. **Return Value Validation**: Confirm outputs match expected formats
4. **Error Handling**: Test error conditions produce same results

This mapping document provides the bridge between the obfuscated original and our clean, maintainable implementation, ensuring no functionality is lost in the translation process.