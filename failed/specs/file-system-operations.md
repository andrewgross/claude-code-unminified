# File System Operations Specification

## Overview
Claude Code implements comprehensive file system operations for project analysis, file manipulation, configuration management, and cross-platform path handling. The system provides secure, efficient, and intelligent file operations with deep project understanding.

## Architecture

### Core Components
- **File Operations Engine**: Core file I/O operations
- **Path Resolver**: Cross-platform path handling and resolution
- **Project Analyzer**: Deep project structure analysis and understanding
- **Configuration Loader**: Multi-format configuration file processing
- **Permission Manager**: File system permission and security controls
- **Watch System**: File system change monitoring and event handling

### Security Model
All file operations operate within a security sandbox with:
- Path traversal protection
- Permission validation
- Access control lists
- Audit logging
- Safe path resolution

## Core File Operations

### File Reading
```javascript
class FileOperations {
    async readFile(filePath, options = {}) {
        // Validate file path and permissions
        // Handle different file encodings
        // Support partial reading (offset/limit)
        // Cache frequently accessed files
        
        const normalizedPath = this.pathResolver.normalize(filePath);
        await this.validateReadPermission(normalizedPath);
        
        return this.safeReadFile(normalizedPath, options);
    }
    
    async readFileLines(filePath, startLine = 1, endLine = null) {
        // Read specific line ranges efficiently
        // Handle large files with streaming
        // Provide line number context
        
        const lines = await this.streamFileLines(filePath);
        return this.extractLineRange(lines, startLine, endLine);
    }
    
    async readBinaryFile(filePath, options = {}) {
        // Handle binary file reading
        // Support different buffer sizes
        // Provide binary format detection
        
        return this.readFile(filePath, { ...options, encoding: null });
    }
}
```

### File Writing
```javascript
async writeFile(filePath, content, options = {}) {
    // Validate write permissions
    // Create directory structure if needed
    // Handle different encodings
    // Atomic write operations with backup
    
    const normalizedPath = this.pathResolver.normalize(filePath);
    await this.validateWritePermission(normalizedPath);
    await this.ensureDirectoryExists(path.dirname(normalizedPath));
    
    return this.atomicWrite(normalizedPath, content, options);
}

async appendToFile(filePath, content, options = {}) {
    // Append content to existing file
    // Handle concurrent writes
    // Maintain file integrity
    
    const normalizedPath = this.pathResolver.normalize(filePath);
    await this.validateWritePermission(normalizedPath);
    
    return this.safeAppend(normalizedPath, content, options);
}

async atomicWrite(filePath, content, options = {}) {
    // Write to temporary file first
    // Verify write success
    // Atomic rename to final location
    // Clean up on failure
    
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    try {
        await fs.writeFile(tempPath, content, options);
        await fs.rename(tempPath, filePath);
    } catch (error) {
        await this.cleanupTempFile(tempPath);
        throw error;
    }
}
```

### Directory Operations
```javascript
async createDirectory(dirPath, options = {}) {
    // Create directory with parent directories
    // Handle permission settings
    // Avoid race conditions
    
    const normalizedPath = this.pathResolver.normalize(dirPath);
    await this.validateCreatePermission(normalizedPath);
    
    return fs.mkdir(normalizedPath, { recursive: true, ...options });
}

async listDirectory(dirPath, options = {}) {
    // List directory contents
    // Support filtering and sorting
    // Include file metadata
    // Handle permissions
    
    const normalizedPath = this.pathResolver.normalize(dirPath);
    await this.validateReadPermission(normalizedPath);
    
    const entries = await fs.readdir(normalizedPath, { withFileTypes: true });
    return this.processDirectoryEntries(entries, options);
}

async deleteDirectory(dirPath, options = {}) {
    // Recursive directory deletion
    // Safety checks and confirmations
    // Handle locked files
    // Audit logging
    
    const normalizedPath = this.pathResolver.normalize(dirPath);
    await this.validateDeletePermission(normalizedPath);
    await this.auditDeletion(normalizedPath);
    
    return fs.rm(normalizedPath, { recursive: true, force: options.force });
}
```

## Path Resolution

### Cross-Platform Path Handling
```javascript
class PathResolver {
    normalize(inputPath) {
        // Normalize path separators
        // Resolve relative paths
        // Handle home directory expansion
        // Prevent path traversal attacks
        
        let normalized = path.normalize(inputPath);
        
        // Handle home directory (~)
        if (normalized.startsWith('~/')) {
            normalized = path.join(os.homedir(), normalized.slice(2));
        }
        
        // Prevent path traversal
        if (this.containsTraversal(normalized)) {
            throw new Error('Path traversal detected');
        }
        
        return normalized;
    }
    
    resolve(relativePath, basePath = process.cwd()) {
        // Resolve relative paths against base
        // Handle different path formats
        // Validate resolved paths
        
        const resolved = path.resolve(basePath, relativePath);
        return this.normalize(resolved);
    }
    
    isWithinAllowedPath(targetPath, allowedPaths) {
        // Check if path is within allowed directories
        // Handle symlinks and aliases
        // Support glob patterns
        
        const normalizedTarget = this.normalize(targetPath);
        
        for (const allowedPath of allowedPaths) {
            if (this.isPathWithin(normalizedTarget, allowedPath)) {
                return true;
            }
        }
        
        return false;
    }
    
    containsTraversal(inputPath) {
        // Detect path traversal attempts
        // Check for ../ sequences
        // Validate against multiple encoding schemes
        
        const dangerous = ['../', '..\\', '%2e%2e%2f', '%2e%2e%5c'];
        return dangerous.some(pattern => 
            inputPath.toLowerCase().includes(pattern)
        );
    }
}
```

### Path Utilities
```javascript
getFileExtension(filePath) {
    return path.extname(filePath).toLowerCase();
}

getFileBaseName(filePath) {
    return path.basename(filePath, path.extname(filePath));
}

joinPaths(...pathSegments) {
    return this.normalize(path.join(...pathSegments));
}

relativePath(fromPath, toPath) {
    return path.relative(fromPath, toPath);
}

isAbsolute(inputPath) {
    return path.isAbsolute(inputPath);
}
```

## Project Analysis

### Project Structure Discovery
```javascript
class ProjectAnalyzer {
    async analyzeProject(rootPath) {
        // Discover project type and structure
        // Identify important files and directories
        // Map dependencies and relationships
        // Extract metadata and configurations
        
        const analysis = {
            rootPath: this.pathResolver.normalize(rootPath),
            projectType: await this.detectProjectType(rootPath),
            structure: await this.mapProjectStructure(rootPath),
            configurations: await this.findConfigurations(rootPath),
            dependencies: await this.analyzeDependencies(rootPath),
            gitInfo: await this.getGitInformation(rootPath)
        };
        
        return analysis;
    }
    
    async detectProjectType(rootPath) {
        // Detect project type from files and structure
        // Support multiple project types
        // Handle polyglot projects
        
        const indicators = {
            'package.json': 'nodejs',
            'requirements.txt': 'python',
            'Cargo.toml': 'rust',
            'pom.xml': 'java',
            'go.mod': 'go',
            '.csproj': 'csharp',
            'composer.json': 'php'
        };
        
        for (const [file, type] of Object.entries(indicators)) {
            if (await this.fileExists(path.join(rootPath, file))) {
                return type;
            }
        }
        
        return 'unknown';
    }
    
    async mapProjectStructure(rootPath) {
        // Create hierarchical map of project structure
        // Identify important directories
        // Track file sizes and types
        // Build dependency graph
        
        const structure = await this.walkDirectory(rootPath, {
            includeHidden: false,
            respectGitignore: true,
            maxDepth: 10
        });
        
        return this.organizeStructure(structure);
    }
}
```

### File Type Detection
```javascript
class FileTypeDetector {
    detectFileType(filePath, content = null) {
        // Detect file type from extension and content
        // Handle files without extensions
        // Support magic number detection
        
        const extension = path.extname(filePath).toLowerCase();
        const baseName = path.basename(filePath);
        
        // Check known extensions
        if (this.extensionMap.has(extension)) {
            return this.extensionMap.get(extension);
        }
        
        // Check special filenames
        if (this.specialFiles.has(baseName.toLowerCase())) {
            return this.specialFiles.get(baseName.toLowerCase());
        }
        
        // Content-based detection
        if (content) {
            return this.detectFromContent(content);
        }
        
        return 'unknown';
    }
    
    isTextFile(filePath) {
        const textTypes = ['text', 'code', 'config', 'documentation'];
        const fileType = this.detectFileType(filePath);
        return textTypes.includes(fileType.category);
    }
    
    isBinaryFile(filePath) {
        return !this.isTextFile(filePath);
    }
    
    getLanguageFromFile(filePath) {
        // Determine programming language from file
        // Support multiple language detection methods
        // Handle ambiguous cases
        
        const extension = path.extname(filePath).toLowerCase();
        const languageMap = {
            '.js': 'javascript',
            '.ts': 'typescript',
            '.py': 'python',
            '.rs': 'rust',
            '.go': 'go',
            '.java': 'java',
            '.cpp': 'cpp',
            '.c': 'c',
            '.rb': 'ruby',
            '.php': 'php'
        };
        
        return languageMap[extension] || 'text';
    }
}
```

## Configuration Loading

### Multi-Format Configuration Loader
```javascript
class ConfigurationLoader {
    async loadConfig(configPath) {
        // Auto-detect configuration format
        // Parse and validate configuration
        // Handle include/import statements
        // Apply environment variable substitution
        
        const fileType = this.detectConfigFormat(configPath);
        const content = await this.fileOps.readFile(configPath, { encoding: 'utf8' });
        
        let config;
        switch (fileType) {
            case 'json':
                config = await this.parseJSON(content, configPath);
                break;
            case 'yaml':
                config = await this.parseYAML(content, configPath);
                break;
            case 'toml':
                config = await this.parseTOML(content, configPath);
                break;
            case 'ini':
                config = await this.parseINI(content, configPath);
                break;
            default:
                throw new Error(`Unsupported config format: ${fileType}`);
        }
        
        return this.processConfig(config, configPath);
    }
    
    detectConfigFormat(filePath) {
        const extension = path.extname(filePath).toLowerCase();
        const formatMap = {
            '.json': 'json',
            '.yaml': 'yaml',
            '.yml': 'yaml',
            '.toml': 'toml',
            '.ini': 'ini',
            '.conf': 'ini'
        };
        
        return formatMap[extension] || 'json';
    }
    
    async processConfig(config, configPath) {
        // Process configuration after parsing
        // Handle includes and imports
        // Substitute environment variables
        // Validate configuration schema
        
        // Handle includes
        if (config.$include) {
            config = await this.processIncludes(config, configPath);
        }
        
        // Environment variable substitution
        config = this.substituteEnvironmentVars(config);
        
        // Validation
        await this.validateConfig(config);
        
        return config;
    }
}
```

### Configuration Discovery
```javascript
class ConfigDiscovery {
    async findConfigurations(rootPath) {
        // Discover all configuration files in project
        // Identify configuration types and purposes
        // Build configuration dependency graph
        
        const configPatterns = [
            '**/*.json',
            '**/*.yaml',
            '**/*.yml',
            '**/*.toml',
            '**/*.ini',
            '**/.*rc',
            '**/.env*',
            '**/config/*'
        ];
        
        const configFiles = [];
        
        for (const pattern of configPatterns) {
            const matches = await this.glob(pattern, { 
                cwd: rootPath,
                ignore: this.getIgnorePatterns()
            });
            configFiles.push(...matches);
        }
        
        return this.categorizeConfigs(configFiles);
    }
    
    categorizeConfigs(configFiles) {
        // Categorize configuration files by purpose
        // Identify application vs. tool configurations
        // Build configuration relationships
        
        const categories = {
            application: [],
            build: [],
            deployment: [],
            ide: [],
            testing: [],
            linting: [],
            git: [],
            ci: [],
            docker: [],
            unknown: []
        };
        
        for (const file of configFiles) {
            const category = this.identifyConfigCategory(file);
            categories[category].push(file);
        }
        
        return categories;
    }
}
```

## File System Watching

### Change Monitoring
```javascript
class FileSystemWatcher {
    constructor() {
        this.watchers = new Map();
        this.callbacks = new Map();
        this.debounceTimers = new Map();
    }
    
    watch(path, callback, options = {}) {
        // Watch file or directory for changes
        // Debounce rapid changes
        // Handle different change types
        // Support recursive watching
        
        const normalizedPath = this.pathResolver.normalize(path);
        
        if (this.watchers.has(normalizedPath)) {
            // Add callback to existing watcher
            this.addCallback(normalizedPath, callback);
            return;
        }
        
        const watcher = fs.watch(normalizedPath, {
            recursive: options.recursive || false,
            ...options
        }, (eventType, filename) => {
            this.handleFileChange(normalizedPath, eventType, filename);
        });
        
        this.watchers.set(normalizedPath, watcher);
        this.callbacks.set(normalizedPath, [callback]);
    }
    
    handleFileChange(watchPath, eventType, filename) {
        // Process file system changes
        // Debounce rapid changes
        // Filter irrelevant changes
        // Notify callbacks
        
        const fullPath = path.join(watchPath, filename || '');
        const changeKey = `${watchPath}:${filename}`;
        
        // Debounce changes
        if (this.debounceTimers.has(changeKey)) {
            clearTimeout(this.debounceTimers.get(changeKey));
        }
        
        this.debounceTimers.set(changeKey, setTimeout(() => {
            this.notifyCallbacks(watchPath, {
                eventType,
                filename,
                fullPath,
                timestamp: Date.now()
            });
            this.debounceTimers.delete(changeKey);
        }, 100)); // 100ms debounce
    }
    
    unwatch(path) {
        // Stop watching file or directory
        // Clean up resources
        // Remove callbacks
        
        const normalizedPath = this.pathResolver.normalize(path);
        const watcher = this.watchers.get(normalizedPath);
        
        if (watcher) {
            watcher.close();
            this.watchers.delete(normalizedPath);
            this.callbacks.delete(normalizedPath);
        }
    }
}
```

## Permission Management

### File System Permissions
```javascript
class FilePermissionManager {
    async validateReadPermission(filePath) {
        // Check if file can be read
        // Validate against access control lists
        // Log access attempts
        
        const normalizedPath = this.pathResolver.normalize(filePath);
        
        // Check file exists and is readable
        try {
            await fs.access(normalizedPath, fs.constants.R_OK);
        } catch (error) {
            throw new Error(`Cannot read file: ${normalizedPath}`);
        }
        
        // Check against allowed paths
        if (!this.isPathAllowed(normalizedPath, 'read')) {
            throw new Error(`Read access denied: ${normalizedPath}`);
        }
        
        // Audit log
        this.auditAccess('read', normalizedPath);
    }
    
    async validateWritePermission(filePath) {
        // Check if file can be written
        // Validate against access control lists
        // Check for dangerous operations
        
        const normalizedPath = this.pathResolver.normalize(filePath);
        const dirPath = path.dirname(normalizedPath);
        
        // Check directory is writable
        try {
            await fs.access(dirPath, fs.constants.W_OK);
        } catch (error) {
            throw new Error(`Cannot write to directory: ${dirPath}`);
        }
        
        // Check against allowed paths
        if (!this.isPathAllowed(normalizedPath, 'write')) {
            throw new Error(`Write access denied: ${normalizedPath}`);
        }
        
        // Check for dangerous file types
        if (this.isDangerousFile(normalizedPath)) {
            throw new Error(`Write to dangerous file type denied: ${normalizedPath}`);
        }
        
        // Audit log
        this.auditAccess('write', normalizedPath);
    }
    
    isPathAllowed(filePath, operation) {
        // Check if path is allowed for operation
        // Support glob patterns in ACL
        // Handle different permission levels
        
        const acl = this.getAccessControlList();
        const rules = acl[operation] || [];
        
        for (const rule of rules) {
            if (this.matchesPattern(filePath, rule.pattern)) {
                return rule.allow;
            }
        }
        
        return false; // Deny by default
    }
    
    isDangerousFile(filePath) {
        // Identify dangerous file types and locations
        // Prevent writes to system files
        // Check for executable files
        
        const dangerousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.ps1'];
        const dangerousPaths = ['/bin/', '/sbin/', '/etc/', 'C:\\Windows\\'];
        
        const extension = path.extname(filePath).toLowerCase();
        if (dangerousExtensions.includes(extension)) {
            return true;
        }
        
        for (const dangerousPath of dangerousPaths) {
            if (filePath.startsWith(dangerousPath)) {
                return true;
            }
        }
        
        return false;
    }
}
```

## Performance Optimization

### File Operation Caching
```javascript
class FileCache {
    constructor(maxSize = 100 * 1024 * 1024) { // 100MB default
        this.cache = new Map();
        this.sizes = new Map();
        this.accessTimes = new Map();
        this.maxSize = maxSize;
        this.currentSize = 0;
    }
    
    get(filePath, maxAge = 30000) { // 30 second default
        // Get cached file content
        // Check cache validity
        // Update access time
        
        const cached = this.cache.get(filePath);
        if (!cached) return null;
        
        const accessTime = this.accessTimes.get(filePath);
        if (Date.now() - accessTime > maxAge) {
            this.evict(filePath);
            return null;
        }
        
        this.accessTimes.set(filePath, Date.now());
        return cached;
    }
    
    set(filePath, content) {
        // Cache file content
        // Implement LRU eviction
        // Track cache size
        
        const size = Buffer.byteLength(content);
        
        // Evict if necessary
        this.ensureSpace(size);
        
        this.cache.set(filePath, content);
        this.sizes.set(filePath, size);
        this.accessTimes.set(filePath, Date.now());
        this.currentSize += size;
    }
    
    ensureSpace(requiredSize) {
        // Ensure cache has space for new entry
        // Evict least recently used entries
        // Respect maximum cache size
        
        while (this.currentSize + requiredSize > this.maxSize && this.cache.size > 0) {
            const lruPath = this.findLRU();
            this.evict(lruPath);
        }
    }
}
```

This file system operations specification provides comprehensive coverage of Claude Code's file handling capabilities, from basic I/O operations to advanced project analysis and security controls.