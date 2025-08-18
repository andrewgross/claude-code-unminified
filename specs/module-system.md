# Module System Specification

## Overview
Claude Code uses a webpack-bundled module system with custom module loading, dependency injection, and lazy loading capabilities. This specification details the module architecture, loading mechanisms, and dependency management.

## Webpack Module System

### Module Wrapper Pattern
```javascript
var E = (A, B) => () => (B || A((B = {exports: {}}).exports, B), B.exports);
```
This creates a CommonJS-style module wrapper that:
- Lazily initializes modules on first access
- Provides module.exports compatibility
- Manages module dependencies

### Module Registration
```javascript
var moduleId = E((exports, module) => {
    // Module implementation
    module.exports = moduleContent;
});
```

### Module Dependencies
Modules are organized with dependency injection:
```javascript
var dependentModule = E((exports, module) => {
    var dependency1 = moduleId1();
    var dependency2 = moduleId2();
    
    // Module logic using dependencies
});
```

## Core Module Categories

### 1. CLI Framework Modules
- **Command Parser**: Commander.js integration
- **Argument Processor**: Command-line argument handling
- **Help System**: Documentation and usage information
- **Error Handler**: Command execution error management

### 2. Authentication Modules
- **OAuth Client**: Claude.ai OAuth integration
- **Token Manager**: JWT and session token handling
- **Credential Store**: Secure credential management
- **Permission Engine**: Access control and validation

### 3. MCP Integration Modules
- **MCP Client**: Core MCP protocol implementation
- **Transport Manager**: Multi-protocol transport handling
- **Server Registry**: MCP server configuration and lifecycle
- **Tool Proxy**: Tool execution and result handling

### 4. Session Management Modules
- **Session Store**: Conversation persistence
- **State Manager**: Session state tracking
- **Checkpoint Engine**: Snapshot and recovery
- **Teleport Client**: Remote session synchronization

### 5. File System Modules
- **Path Manager**: Cross-platform path handling
- **File Operations**: File reading, writing, and manipulation
- **Directory Scanner**: Project structure analysis
- **Configuration Loader**: Configuration file processing

### 6. Network Modules
- **HTTP Client**: REST API communication
- **WebSocket Manager**: Real-time communication
- **Transport Abstraction**: Protocol-agnostic communication
- **Connection Pool**: Efficient connection management

### 7. UI Modules
- **React Components**: Terminal UI components
- **Input Handlers**: User input processing
- **Output Formatters**: Response formatting
- **Progress Indicators**: Operation status display

### 8. Utility Modules
- **Logger**: Logging and diagnostics
- **Configuration Manager**: Settings management
- **Crypto Utils**: Encryption and security functions
- **Error Handling**: Exception management and reporting

## Module Loading

### Lazy Loading Pattern
```javascript
// Module only loaded when first accessed
var lazyModule = K21((moduleLoader, exports) => (
    moduleLoader && (exports = moduleLoader(moduleLoader = 0)), 
    exports
));
```

### Dynamic Imports
```javascript
async function loadModule(moduleName) {
    // Check if module already loaded
    if (moduleCache.has(moduleName)) {
        return moduleCache.get(moduleName);
    }
    
    // Load module dynamically
    const module = await import(`./modules/${moduleName}`);
    moduleCache.set(moduleName, module);
    return module;
}
```

### Module Resolution
```javascript
function resolveModule(moduleId) {
    // Check built-in modules
    if (builtinModules.has(moduleId)) {
        return builtinModules.get(moduleId);
    }
    
    // Check registered modules
    if (registeredModules.has(moduleId)) {
        return registeredModules.get(moduleId);
    }
    
    // Dynamic module loading
    return loadDynamicModule(moduleId);
}
```

## Dependency Injection

### Service Container
```javascript
class ServiceContainer {
    constructor() {
        this.services = new Map();
        this.singletons = new Map();
    }
    
    register(name, factory, singleton = false) {
        this.services.set(name, { factory, singleton });
    }
    
    resolve(name) {
        const service = this.services.get(name);
        if (!service) throw new Error(`Service ${name} not found`);
        
        if (service.singleton) {
            if (!this.singletons.has(name)) {
                this.singletons.set(name, service.factory());
            }
            return this.singletons.get(name);
        }
        
        return service.factory();
    }
}
```

### Dependency Graph
```javascript
const dependencies = {
    'cli-parser': [],
    'auth-manager': ['credential-store', 'token-manager'],
    'mcp-client': ['transport-manager', 'tool-proxy'],
    'session-manager': ['session-store', 'state-manager'],
    'main-app': ['cli-parser', 'auth-manager', 'mcp-client', 'session-manager']
};
```

## Module Interfaces

### Standard Module Interface
```javascript
interface Module {
    name: string;
    version: string;
    dependencies: string[];
    initialize(container: ServiceContainer): Promise<void>;
    shutdown(): Promise<void>;
    getExports(): object;
}
```

### Module Lifecycle
```javascript
class ModuleManager {
    async loadModule(moduleId) {
        // Load module code
        // Resolve dependencies
        // Initialize module
        // Register in container
    }
    
    async initializeModules() {
        // Topological sort of dependencies
        // Initialize in dependency order
        // Handle circular dependencies
    }
    
    async shutdownModules() {
        // Shutdown in reverse dependency order
        // Clean up resources
        // Unregister from container
    }
}
```

## Module Configuration

### Module Manifest
```javascript
{
    "name": "mcp-integration",
    "version": "1.0.0",
    "dependencies": [
        "transport-manager",
        "tool-proxy",
        "config-manager"
    ],
    "exports": {
        "MCPClient": "./src/mcp-client.js",
        "ServerManager": "./src/server-manager.js"
    },
    "lazy": true,
    "singleton": false
}
```

### Module Registry
```javascript
const moduleRegistry = {
    modules: new Map(),
    
    register(manifest) {
        this.modules.set(manifest.name, manifest);
    },
    
    get(name) {
        return this.modules.get(name);
    },
    
    list() {
        return Array.from(this.modules.keys());
    }
};
```

## Error Handling

### Module Loading Errors
```javascript
class ModuleLoadError extends Error {
    constructor(moduleName, cause) {
        super(`Failed to load module: ${moduleName}`);
        this.moduleName = moduleName;
        this.cause = cause;
    }
}
```

### Dependency Resolution Errors
```javascript
class DependencyError extends Error {
    constructor(moduleName, missingDependency) {
        super(`Module ${moduleName} has unresolved dependency: ${missingDependency}`);
        this.moduleName = moduleName;
        this.missingDependency = missingDependency;
    }
}
```

### Graceful Degradation
```javascript
async function loadModuleWithFallback(primary, fallback) {
    try {
        return await loadModule(primary);
    } catch (error) {
        console.warn(`Failed to load ${primary}, falling back to ${fallback}`);
        return await loadModule(fallback);
    }
}
```

## Performance Optimization

### Module Caching
```javascript
class ModuleCache {
    constructor() {
        this.cache = new Map();
        this.loadTimes = new Map();
    }
    
    set(moduleId, module) {
        this.cache.set(moduleId, module);
        this.loadTimes.set(moduleId, Date.now());
    }
    
    get(moduleId) {
        return this.cache.get(moduleId);
    }
    
    evictOld(maxAge = 3600000) { // 1 hour
        const now = Date.now();
        for (const [moduleId, loadTime] of this.loadTimes) {
            if (now - loadTime > maxAge) {
                this.cache.delete(moduleId);
                this.loadTimes.delete(moduleId);
            }
        }
    }
}
```

### Code Splitting
- Critical modules bundled in main chunk
- Feature modules loaded on demand
- Vendor dependencies in separate chunks
- Dynamic imports for optional features

### Tree Shaking
- Webpack eliminates unused code
- ES6 modules enable better optimization
- Side-effect tracking for safe elimination

## Development Tools

### Module Inspector
```javascript
class ModuleInspector {
    listModules() {
        // List all registered modules
    }
    
    inspectModule(moduleId) {
        // Show module details and dependencies
    }
    
    analyzeDependencies() {
        // Analyze dependency graph
        // Detect circular dependencies
        // Show dependency sizes
    }
}
```

### Hot Module Replacement (Development)
```javascript
if (module.hot) {
    module.hot.accept('./module', () => {
        // Reload module without full restart
        // Preserve application state
    });
}
```

This module system specification details how Claude Code organizes and manages its codebase through webpack bundling and dynamic module loading.