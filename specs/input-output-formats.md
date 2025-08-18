# Input/Output Formats Specification

## Overview
Claude Code supports multiple input and output formats to enable flexible integration with different workflows and tools. The system provides text, JSON, and streaming JSON formats with configurable formatting options and efficient processing capabilities.

## Architecture

### Core Components
- **Format Registry**: Manages available input/output formats
- **Parser Engine**: Processes input in various formats
- **Formatter Engine**: Generates output in specified formats
- **Stream Processor**: Handles streaming data formats
- **Validation System**: Validates format compliance and structure
- **Transformation Pipeline**: Converts between different formats

### Supported Formats

#### Input Formats
- **Text**: Human-readable text input (default)
- **JSON**: Structured JSON input for programmatic use
- **Stream-JSON**: Line-delimited JSON for real-time processing

#### Output Formats
- **Text**: Formatted text output for human consumption
- **JSON**: Structured JSON output for programmatic processing
- **Stream-JSON**: Real-time streaming JSON output

## Text Format

### Text Input Processing
```javascript
class TextInputParser {
    parse(input, options = {}) {
        // Process raw text input
        // Handle different encodings
        // Parse special commands and markers
        // Extract metadata from text
        
        const processedInput = {
            type: 'text',
            content: this.processTextContent(input),
            metadata: this.extractMetadata(input),
            commands: this.parseSpecialCommands(input)
        };
        
        return this.validateTextInput(processedInput, options);
    }
    
    processTextContent(input) {
        // Clean and normalize text content
        // Handle line endings and whitespace
        // Process escape sequences
        // Extract structured elements
        
        let content = input.trim();
        
        // Normalize line endings
        content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        // Process special markers
        content = this.processMarkdown(content);
        content = this.processCodeBlocks(content);
        
        return content;
    }
    
    extractMetadata(input) {
        // Extract metadata from text headers
        // Parse YAML front matter
        // Identify document structure
        
        const metadata = {};
        
        // Check for YAML front matter
        const yamlMatch = input.match(/^---\n([\s\S]*?)\n---/);
        if (yamlMatch) {
            metadata.frontMatter = this.parseYAML(yamlMatch[1]);
        }
        
        // Extract other metadata markers
        metadata.language = this.detectLanguage(input);
        metadata.structure = this.analyzeStructure(input);
        
        return metadata;
    }
}
```

### Text Output Formatting
```javascript
class TextOutputFormatter {
    format(data, options = {}) {
        // Format data for human-readable output
        // Apply styling and colors
        // Handle different content types
        // Support internationalization
        
        const formatter = this.getFormatter(data.type);
        let output = formatter.format(data, options);
        
        if (options.colorize && this.supportsColor()) {
            output = this.applyColors(output, options.theme);
        }
        
        return this.finalizeOutput(output, options);
    }
    
    formatMessage(message, options = {}) {
        // Format different message types
        // Handle role-based formatting
        // Apply appropriate styling
        
        switch (message.role) {
            case 'assistant':
                return this.formatAssistantMessage(message, options);
            case 'user':
                return this.formatUserMessage(message, options);
            case 'system':
                return this.formatSystemMessage(message, options);
            default:
                return this.formatGenericMessage(message, options);
        }
    }
    
    formatAssistantMessage(message, options = {}) {
        // Format AI assistant responses
        // Handle thinking content
        // Format tool usage
        // Apply consistent styling
        
        let output = '';
        
        if (message.content) {
            for (const content of message.content) {
                switch (content.type) {
                    case 'text':
                        output += this.formatTextContent(content.text, options);
                        break;
                    case 'thinking':
                        if (options.showThinking) {
                            output += this.formatThinkingContent(content.content, options);
                        }
                        break;
                    case 'tool_use':
                        output += this.formatToolUse(content, options);
                        break;
                }
            }
        }
        
        return output;
    }
}
```

## JSON Format

### JSON Input Processing
```javascript
class JSONInputParser {
    parse(input, options = {}) {
        // Parse JSON input with validation
        // Handle different JSON structures
        // Support schema validation
        // Process nested objects and arrays
        
        try {
            const parsed = JSON.parse(input);
            return this.processJSONStructure(parsed, options);
        } catch (error) {
            throw new Error(`Invalid JSON input: ${error.message}`);
        }
    }
    
    processJSONStructure(data, options = {}) {
        // Process parsed JSON structure
        // Validate against expected schema
        // Transform data if needed
        // Extract metadata and context
        
        const processed = {
            type: 'json',
            data: this.transformData(data, options),
            schema: this.inferSchema(data),
            metadata: this.extractJSONMetadata(data)
        };
        
        if (options.validate) {
            this.validateSchema(processed.data, options.schema);
        }
        
        return processed;
    }
    
    validateSchema(data, schema) {
        // Validate JSON data against schema
        // Support JSON Schema specification
        // Provide detailed error messages
        // Handle nested validation
        
        if (!schema) return;
        
        const validator = this.getValidator(schema);
        const result = validator.validate(data);
        
        if (!result.valid) {
            throw new Error(`Schema validation failed: ${result.errors.join(', ')}`);
        }
    }
}
```

### JSON Output Formatting
```javascript
class JSONOutputFormatter {
    format(data, options = {}) {
        // Format data as JSON output
        // Handle serialization options
        // Support pretty printing
        // Include metadata if requested
        
        const jsonOptions = {
            indent: options.pretty ? 2 : 0,
            includeMetadata: options.includeMetadata || false,
            dateFormat: options.dateFormat || 'iso',
            maxDepth: options.maxDepth || 100
        };
        
        const output = this.serializeData(data, jsonOptions);
        
        if (options.validate) {
            this.validateJSONOutput(output);
        }
        
        return output;
    }
    
    serializeData(data, options) {
        // Serialize data to JSON
        // Handle special data types
        // Apply formatting options
        // Manage circular references
        
        const replacer = this.createReplacer(options);
        const space = options.indent || undefined;
        
        try {
            return JSON.stringify(data, replacer, space);
        } catch (error) {
            if (error.message.includes('circular')) {
                return this.handleCircularReferences(data, options);
            }
            throw error;
        }
    }
    
    createReplacer(options) {
        // Create JSON replacer function
        // Handle date formatting
        // Process special objects
        // Apply depth limits
        
        const visited = new WeakSet();
        let depth = 0;
        
        return (key, value) => {
            if (depth > options.maxDepth) {
                return '[Max Depth Exceeded]';
            }
            
            // Handle dates
            if (value instanceof Date) {
                return this.formatDate(value, options.dateFormat);
            }
            
            // Handle circular references
            if (typeof value === 'object' && value !== null) {
                if (visited.has(value)) {
                    return '[Circular Reference]';
                }
                visited.add(value);
            }
            
            depth++;
            return value;
        };
    }
}
```

## Stream-JSON Format

### Streaming JSON Input
```javascript
class StreamJSONInputParser {
    constructor() {
        this.buffer = '';
        this.messageQueue = [];
        this.isProcessing = false;
    }
    
    async *parseStream(inputStream) {
        // Parse streaming JSON input
        // Handle line-delimited JSON
        // Process messages in real-time
        // Maintain message order
        
        for await (const chunk of inputStream) {
            this.buffer += chunk;
            yield* this.processBuffer();
        }
        
        // Process any remaining data
        if (this.buffer.trim()) {
            yield* this.processRemainingBuffer();
        }
    }
    
    *processBuffer() {
        // Process accumulated buffer
        // Extract complete JSON messages
        // Handle partial messages
        
        const lines = this.buffer.split('\n');
        this.buffer = lines.pop() || ''; // Keep incomplete line
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;
            
            try {
                const message = JSON.parse(trimmedLine);
                yield this.processStreamMessage(message);
            } catch (error) {
                console.warn(`Invalid JSON line: ${trimmedLine}`);
            }
        }
    }
    
    processStreamMessage(message) {
        // Process individual stream message
        // Validate message structure
        // Add streaming metadata
        // Handle different message types
        
        const processed = {
            type: 'stream_json_message',
            timestamp: Date.now(),
            data: message,
            metadata: {
                messageId: this.generateMessageId(),
                sequenceNumber: this.getNextSequence()
            }
        };
        
        return this.validateStreamMessage(processed);
    }
}
```

### Streaming JSON Output
```javascript
class StreamJSONOutputFormatter {
    constructor() {
        this.messageCount = 0;
        this.sessionId = this.generateSessionId();
    }
    
    async *formatStream(dataStream, options = {}) {
        // Format data as streaming JSON
        // Output one JSON object per line
        // Handle backpressure and flow control
        // Maintain message ordering
        
        for await (const data of dataStream) {
            const formatted = this.formatStreamMessage(data, options);
            
            if (options.validate) {
                this.validateStreamOutput(formatted);
            }
            
            yield formatted + '\n';
        }
    }
    
    formatStreamMessage(data, options) {
        // Format individual message for streaming
        // Add streaming metadata
        // Ensure single-line JSON
        // Handle message ordering
        
        const message = {
            id: this.generateMessageId(),
            timestamp: new Date().toISOString(),
            session_id: this.sessionId,
            sequence: ++this.messageCount,
            type: data.type || 'message',
            data: data
        };
        
        if (options.includeMetadata) {
            message.metadata = this.extractMetadata(data);
        }
        
        return JSON.stringify(message);
    }
    
    formatProgressUpdate(progress, total, message = '') {
        // Format progress updates for streaming
        // Standardize progress message format
        // Include timing information
        
        return this.formatStreamMessage({
            type: 'progress',
            progress: {
                current: progress,
                total: total,
                percentage: total > 0 ? Math.round((progress / total) * 100) : 0,
                message: message,
                eta: this.calculateETA(progress, total)
            }
        });
    }
}
```

## Format Configuration

### Format Registry
```javascript
class FormatRegistry {
    constructor() {
        this.parsers = new Map();
        this.formatters = new Map();
        this.validators = new Map();
        this.transformers = new Map();
    }
    
    registerParser(format, parser) {
        // Register input parser for format
        // Validate parser interface
        // Handle parser conflicts
        
        if (!this.validateParserInterface(parser)) {
            throw new Error(`Invalid parser interface for format: ${format}`);
        }
        
        this.parsers.set(format, parser);
    }
    
    registerFormatter(format, formatter) {
        // Register output formatter for format
        // Validate formatter interface
        // Handle formatter conflicts
        
        if (!this.validateFormatterInterface(formatter)) {
            throw new Error(`Invalid formatter interface for format: ${format}`);
        }
        
        this.formatters.set(format, formatter);
    }
    
    getParser(format) {
        const parser = this.parsers.get(format);
        if (!parser) {
            throw new Error(`No parser registered for format: ${format}`);
        }
        return parser;
    }
    
    getFormatter(format) {
        const formatter = this.formatters.get(format);
        if (!formatter) {
            throw new Error(`No formatter registered for format: ${format}`);
        }
        return formatter;
    }
}
```

### Format Detection
```javascript
class FormatDetector {
    detectInputFormat(input) {
        // Auto-detect input format
        // Handle ambiguous cases
        // Support format hints
        
        const trimmed = input.trim();
        
        // Check for JSON
        if (this.looksLikeJSON(trimmed)) {
            return 'json';
        }
        
        // Check for Stream-JSON (multiple lines of JSON)
        if (this.looksLikeStreamJSON(trimmed)) {
            return 'stream-json';
        }
        
        // Default to text
        return 'text';
    }
    
    looksLikeJSON(input) {
        // Heuristic JSON detection
        // Check for JSON structure markers
        // Handle edge cases
        
        if (!input.startsWith('{') && !input.startsWith('[')) {
            return false;
        }
        
        try {
            JSON.parse(input);
            return true;
        } catch {
            return false;
        }
    }
    
    looksLikeStreamJSON(input) {
        // Detect stream-JSON format
        // Check for line-delimited JSON
        // Validate multiple JSON objects
        
        const lines = input.split('\n').map(line => line.trim()).filter(line => line);
        
        if (lines.length < 2) return false;
        
        // Check if all lines are valid JSON
        return lines.every(line => {
            try {
                JSON.parse(line);
                return true;
            } catch {
                return false;
            }
        });
    }
}
```

## Format Transformation

### Data Transformation Pipeline
```javascript
class FormatTransformer {
    transform(data, sourceFormat, targetFormat, options = {}) {
        // Transform data between formats
        // Apply format-specific conversions
        // Preserve data integrity
        // Handle conversion losses
        
        if (sourceFormat === targetFormat) {
            return data;
        }
        
        const pipeline = this.buildTransformationPipeline(sourceFormat, targetFormat);
        
        let transformed = data;
        for (const step of pipeline) {
            transformed = step.transform(transformed, options);
        }
        
        return this.validateTransformation(transformed, targetFormat);
    }
    
    buildTransformationPipeline(source, target) {
        // Build transformation pipeline
        // Find optimal conversion path
        // Handle intermediate formats
        
        const directTransform = this.getDirectTransform(source, target);
        if (directTransform) {
            return [directTransform];
        }
        
        // Find path through intermediate formats
        return this.findTransformationPath(source, target);
    }
    
    registerTransformation(source, target, transformer) {
        // Register transformation between formats
        // Support bidirectional transformations
        // Validate transformer interface
        
        const key = `${source}->${target}`;
        this.transformers.set(key, transformer);
    }
}
```

### Content Type Mapping
```javascript
class ContentTypeMapper {
    getContentType(format, options = {}) {
        // Get MIME type for format
        // Handle format variants
        // Support custom content types
        
        const contentTypes = {
            text: 'text/plain; charset=utf-8',
            json: 'application/json; charset=utf-8',
            'stream-json': 'application/x-ndjson; charset=utf-8'
        };
        
        let contentType = contentTypes[format];
        if (!contentType) {
            contentType = 'application/octet-stream';
        }
        
        // Apply options
        if (options.charset && options.charset !== 'utf-8') {
            contentType = contentType.replace('utf-8', options.charset);
        }
        
        return contentType;
    }
    
    getFileExtension(format) {
        // Get file extension for format
        // Support multiple extensions
        // Handle format variants
        
        const extensions = {
            text: '.txt',
            json: '.json',
            'stream-json': '.ndjson'
        };
        
        return extensions[format] || '.dat';
    }
}
```

## Performance Optimization

### Streaming Optimization
```javascript
class StreamOptimizer {
    optimizeInputStream(stream, format) {
        // Optimize input stream processing
        // Apply format-specific optimizations
        // Handle backpressure
        
        switch (format) {
            case 'json':
                return this.optimizeJSONStream(stream);
            case 'stream-json':
                return this.optimizeStreamJSONInput(stream);
            case 'text':
                return this.optimizeTextStream(stream);
            default:
                return stream;
        }
    }
    
    optimizeOutputStream(stream, format) {
        // Optimize output stream formatting
        // Buffer output for efficiency
        // Handle format-specific optimizations
        
        const bufferSize = this.getOptimalBufferSize(format);
        return this.createBufferedStream(stream, bufferSize);
    }
    
    getOptimalBufferSize(format) {
        // Determine optimal buffer size for format
        // Consider format characteristics
        // Account for system resources
        
        const bufferSizes = {
            text: 64 * 1024,      // 64KB for text
            json: 256 * 1024,     // 256KB for JSON
            'stream-json': 32 * 1024  // 32KB for streaming
        };
        
        return bufferSizes[format] || 64 * 1024;
    }
}
```

### Caching Strategy
```javascript
class FormatCache {
    constructor() {
        this.parseCache = new Map();
        this.formatCache = new Map();
        this.maxCacheSize = 1000;
    }
    
    getCachedParse(input, format) {
        // Get cached parse result
        // Validate cache freshness
        // Handle cache hits/misses
        
        const key = this.generateCacheKey(input, format);
        const cached = this.parseCache.get(key);
        
        if (cached && this.isCacheValid(cached)) {
            cached.hits++;
            return cached.result;
        }
        
        return null;
    }
    
    setCachedParse(input, format, result) {
        // Cache parse result
        // Implement LRU eviction
        // Track cache statistics
        
        const key = this.generateCacheKey(input, format);
        
        if (this.parseCache.size >= this.maxCacheSize) {
            this.evictLeastUsed();
        }
        
        this.parseCache.set(key, {
            result: result,
            timestamp: Date.now(),
            hits: 1
        });
    }
}
```

This input/output formats specification provides comprehensive coverage of Claude Code's flexible data processing capabilities across different formats and use cases.