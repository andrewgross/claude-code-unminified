# Configuration System Specification

## Overview
Claude Code implements a hierarchical configuration system supporting multiple scopes, validation, migration, and secure storage. The system manages user preferences, project settings, tool configurations, and system parameters across global, project, and local contexts.

## Architecture

### Core Components
- **Configuration Manager**: Central configuration orchestration
- **Scope Handler**: Multi-level configuration hierarchy
- **Schema Validator**: Configuration validation and type checking
- **Migration Engine**: Configuration version migration
- **Secure Storage**: Encrypted storage for sensitive settings
- **Watch System**: Real-time configuration change monitoring

### Configuration Hierarchy
```
Global (User-wide) → Project (Repository-wide) → Local (Directory-specific) → Environment Variables → CLI Arguments
```

## Configuration Scopes

### 1. Global Scope
**Location**: `~/.config/claude-code/config.json` (Unix) or `%APPDATA%/claude-code/config.json` (Windows)
**Purpose**: User-wide settings that apply to all Claude Code instances

```javascript
{
    "user": {
        "name": "user@example.com",
        "defaultModel": "claude-3-sonnet",
        "theme": "auto",
        "outputFormat": "text",
        "verbose": false
    },
    "api": {
        "baseUrl": "https://api.anthropic.com",
        "timeout": 30000,
        "retries": 3
    },
    "ui": {
        "colorOutput": true,
        "showProgress": true,
        "confirmDestructive": true
    }
}
```

### 2. Project Scope  
**Location**: `.claude/config.json` in project root
**Purpose**: Project-wide settings shared across team members

```javascript
{
    "project": {
        "name": "my-project",
        "description": "Project description",
        "defaultContext": "./docs"
    },
    "tools": {
        "allowed": ["Read", "Write", "Bash"],
        "restricted": ["Exec"],
        "permissions": {
            "Read": {
                "paths": ["./src", "./docs", "./tests"]
            },
            "Write": {
                "paths": ["./src", "./tests"]
            }
        }
    },
    "mcp": {
        "servers": ["project-tools", "database-connector"]
    }
}
```

### 3. Local Scope
**Location**: `.claude/local.json` in current directory
**Purpose**: Directory-specific overrides (gitignored)

```javascript
{
    "local": {
        "workingDirectory": "/custom/path",
        "tempFiles": "./tmp",
        "cacheSize": "100MB"
    },
    "debug": {
        "enabled": true,
        "level": "verbose",
        "logFile": "./debug.log"
    }
}
```

## Configuration Schema

### Schema Definition
```javascript
const configSchema = {
    user: {
        type: 'object',
        properties: {
            name: { type: 'string', format: 'email' },
            defaultModel: { 
                type: 'string', 
                enum: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'] 
            },
            theme: { 
                type: 'string', 
                enum: ['light', 'dark', 'auto'] 
            },
            outputFormat: { 
                type: 'string', 
                enum: ['text', 'json', 'stream-json'] 
            },
            verbose: { type: 'boolean' }
        }
    },
    api: {
        type: 'object',
        properties: {
            baseUrl: { type: 'string', format: 'uri' },
            timeout: { type: 'integer', minimum: 1000, maximum: 300000 },
            retries: { type: 'integer', minimum: 0, maximum: 10 }
        }
    },
    tools: {
        type: 'object',
        properties: {
            allowed: { 
                type: 'array', 
                items: { type: 'string' },
                uniqueItems: true
            },
            restricted: { 
                type: 'array', 
                items: { type: 'string' },
                uniqueItems: true
            },
            permissions: {
                type: 'object',
                additionalProperties: {
                    type: 'object',
                    properties: {
                        paths: {
                            type: 'array',
                            items: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
};
```

### Validation Engine
```javascript
class ConfigValidator {
    validate(config, schema) {
        // JSON Schema validation
        // Custom validation rules
        // Cross-field validation
        // Security validation
    }
    
    validateType(value, expectedType) {
        // Type checking with coercion
        // Format validation (email, URI, etc.)
        // Range validation for numbers
    }
    
    validateSecurity(config) {
        // Check for potential security issues
        // Validate file paths are safe
        // Check URL destinations
        // Validate permissions are not overly broad
    }
}
```

## Configuration Operations

### Read Operations
```javascript
class ConfigurationManager {
    get(key, scope = 'merged') {
        // Get configuration value with scope resolution
        // Handle dotted key notation (e.g., 'user.name')
        // Apply default values
        return this.resolveConfig(key, scope);
    }
    
    getAll(scope = 'merged') {
        // Get entire configuration object
        // Merge all applicable scopes
        // Apply transformations and defaults
    }
    
    resolveConfig(key, scope) {
        // Resolve configuration with scope priority:
        // CLI args > Environment > Local > Project > Global > Defaults
        const sources = this.getConfigSources(scope);
        return this.mergeConfigs(sources, key);
    }
}
```

### Write Operations
```javascript
set(key, value, scope = 'global') {
    // Validate value against schema
    // Write to appropriate config file
    // Trigger change notifications
    // Update cached values
}

remove(key, scope = 'global') {
    // Remove configuration key
    // Clean up empty objects
    // Validate remaining configuration
    // Update cached values
}

add(key, values, scope = 'global') {
    // Add values to array configuration
    // Ensure uniqueness if required
    // Validate each added value
}
```

### Migration System
```javascript
class ConfigMigration {
    migrate(config, fromVersion, toVersion) {
        const migrations = this.getMigrations(fromVersion, toVersion);
        let migratedConfig = config;
        
        for (const migration of migrations) {
            migratedConfig = migration.transform(migratedConfig);
        }
        
        return migratedConfig;
    }
    
    createBackup(config, version) {
        // Create backup before migration
        // Include metadata and timestamp
        // Store in backup directory
    }
}
```

## Environment Integration

### Environment Variables
```javascript
const envMapping = {
    'CLAUDE_API_KEY': 'api.key',
    'CLAUDE_MODEL': 'user.defaultModel',
    'CLAUDE_VERBOSE': 'user.verbose',
    'CLAUDE_OUTPUT_FORMAT': 'user.outputFormat',
    'CLAUDE_CONFIG_DIR': 'paths.configDir'
};

class EnvironmentHandler {
    loadFromEnvironment() {
        // Map environment variables to config keys
        // Apply type conversion
        // Validate environment values
    }
    
    exportToEnvironment(config) {
        // Export configuration to environment
        // Used for child processes
        // Handle sensitive data appropriately
    }
}
```

### CLI Argument Override
```javascript
class ArgumentHandler {
    applyCliOverrides(config, args) {
        // Override config with CLI arguments
        // Handle flag to config mapping
        // Validate CLI argument values
        
        const overrides = {
            model: args.model || config.user.defaultModel,
            verbose: args.verbose || config.user.verbose,
            outputFormat: args.outputFormat || config.user.outputFormat
        };
        
        return this.mergeConfig(config, overrides);
    }
}
```

## Secure Configuration

### Sensitive Data Handling
```javascript
class SecureConfigHandler {
    encryptValue(value, key) {
        // Encrypt sensitive configuration values
        // Use key derivation from user credentials
        // Apply authenticated encryption (AES-GCM)
    }
    
    decryptValue(encryptedValue, key) {
        // Decrypt configuration values
        // Verify authenticity
        // Handle decryption failures gracefully
    }
    
    identifySensitiveKeys() {
        // Identify keys that contain sensitive data
        return ['api.key', 'auth.token', 'database.password'];
    }
}
```

### Access Control
```javascript
class ConfigAccessControl {
    canRead(key, context) {
        // Check if context can read configuration key
        // Apply role-based access control
        // Consider scope restrictions
    }
    
    canWrite(key, value, context) {
        // Check if context can write configuration
        // Validate write permissions
        // Check for dangerous configurations
    }
    
    auditAccess(operation, key, context) {
        // Log configuration access
        // Track changes for security audit
        // Monitor unusual access patterns
    }
}
```

## Configuration Watching

### File System Watching
```javascript
class ConfigWatcher {
    watchConfigFiles() {
        // Watch configuration files for changes
        // Debounce rapid changes
        // Validate changes before applying
        // Notify dependent systems
    }
    
    handleConfigChange(filePath, changeType) {
        // React to configuration file changes
        // Reload and validate configuration
        // Update cached configurations
        // Broadcast change events
    }
}
```

### Change Notifications
```javascript
class ConfigChangeNotifier {
    subscribe(keyPattern, callback) {
        // Subscribe to configuration changes
        // Support glob patterns for keys
        // Handle scope-specific changes
    }
    
    notify(changedKeys, oldConfig, newConfig) {
        // Notify subscribers of changes
        // Include change details
        // Handle notification failures
    }
}
```

## Configuration Templates

### Template System
```javascript
class ConfigTemplate {
    applyTemplate(templateName, variables = {}) {
        // Apply predefined configuration template
        // Substitute template variables
        // Validate resulting configuration
        
        const template = this.loadTemplate(templateName);
        return this.processTemplate(template, variables);
    }
    
    createTemplate(name, config, description) {
        // Create reusable configuration template
        // Extract variables from configuration
        // Save template with metadata
    }
}
```

### Built-in Templates
```javascript
const templates = {
    development: {
        user: { verbose: true },
        api: { timeout: 60000 },
        debug: { enabled: true, level: 'debug' }
    },
    production: {
        user: { verbose: false },
        api: { timeout: 30000, retries: 5 },
        debug: { enabled: false }
    },
    team: {
        tools: {
            allowed: ['Read', 'Write'],
            permissions: {
                Read: { paths: ['./src', './docs'] },
                Write: { paths: ['./src'] }
            }
        }
    }
};
```

## Configuration Backup and Restore

### Backup System
```javascript
class ConfigBackup {
    createBackup(reason = 'manual') {
        // Create configuration backup
        // Include all scopes and metadata
        // Compress and timestamp backup
        
        const backup = {
            timestamp: Date.now(),
            reason: reason,
            version: this.getConfigVersion(),
            configs: {
                global: this.loadGlobalConfig(),
                project: this.loadProjectConfig(),
                local: this.loadLocalConfig()
            }
        };
        
        return this.saveBackup(backup);
    }
    
    restoreBackup(backupId) {
        // Restore configuration from backup
        // Validate backup integrity
        // Create current backup before restore
        // Apply restored configuration
    }
    
    listBackups() {
        // List available configuration backups
        // Include metadata and descriptions
        // Sort by timestamp
    }
}
```

## Performance Optimization

### Configuration Caching
```javascript
class ConfigCache {
    constructor() {
        this.cache = new Map();
        this.timestamps = new Map();
    }
    
    get(key, maxAge = 5000) {
        // Get cached configuration value
        // Check cache validity
        // Invalidate expired entries
        
        const cached = this.cache.get(key);
        const timestamp = this.timestamps.get(key);
        
        if (cached && Date.now() - timestamp < maxAge) {
            return cached;
        }
        
        return null;
    }
    
    set(key, value) {
        // Cache configuration value
        // Update timestamp
        // Implement LRU eviction
        this.cache.set(key, value);
        this.timestamps.set(key, Date.now());
    }
}
```

### Lazy Loading
```javascript
class LazyConfigLoader {
    loadOnDemand(scope) {
        // Load configuration files only when needed
        // Cache loaded configurations
        // Handle loading failures gracefully
        
        if (!this.loaded.has(scope)) {
            const config = this.loadConfigFile(scope);
            this.loaded.set(scope, config);
        }
        
        return this.loaded.get(scope);
    }
}
```

## Testing and Validation

### Configuration Testing
```javascript
class ConfigTester {
    validateConfigFile(filePath) {
        // Load and validate configuration file
        // Check schema compliance
        // Test value constraints
        // Report validation errors
    }
    
    testMergedConfig() {
        // Test final merged configuration
        // Verify scope precedence
        // Check for conflicts
        // Validate complete configuration
    }
    
    simulateConfigChange(key, value, scope) {
        // Simulate configuration change
        // Test impact on application
        // Validate change doesn't break system
    }
}
```

This configuration system specification provides a comprehensive framework for managing Claude Code's complex configuration requirements across multiple scopes and environments.