# Claude Code Error Handling System

A comprehensive error handling system that provides structured error types, centralized error handling, recovery strategies, logging, and user-friendly error presentation.

## Overview

The error handling system is designed to:

- **Standardize error representation** with structured error classes
- **Provide automatic error recovery** for common failure scenarios
- **Log and report errors** with configurable outputs and privacy controls
- **Present user-friendly error messages** with helpful suggestions
- **Enable debugging** with detailed error information and context

## Quick Start

```javascript
const { 
  NetworkError, 
  withErrorHandling, 
  createErrorSystem 
} = require('./src/errors');

// Simple error creation
const error = new NetworkError('Connection failed', {
  suggestions: ['Check your internet connection', 'Try again later']
});

// Automatic error handling with recovery
const result = await withErrorHandling(
  async () => {
    // Your async operation that might fail
    return await makeApiCall();
  },
  { operation: 'API call', retryOnNetworkError: true }
);

// Full error system setup
const errorSystem = createErrorSystem({
  enableLogging: true,
  enableRecovery: true,
  verboseMode: process.env.NODE_ENV === 'development'
});
```

## Error Types Hierarchy

### Base Error Classes

- **`ClaudeCodeError`** - Base class for all Claude Code errors
- **`UserError`** - Errors caused by user input or actions

### Domain-Specific Errors

- **`AuthenticationError`** - Authentication and authorization failures
- **`NetworkError`** - Network connectivity and API issues
- **`FileSystemError`** - File system operations and permissions
- **`MCPError`** - MCP server and tool execution errors
- **`ValidationError`** - Input validation and parsing errors
- **`ConfigurationError`** - Configuration and settings issues

### Specialized Errors

- **`ToolExecutionError`** - Tool-specific execution failures
- **`PermissionError`** - Access control and permission issues
- **`NotFoundError`** - Resource not found scenarios
- **`TimeoutError`** - Operation timeout handling
- **`RateLimitError`** - API rate limiting
- **`ResourceError`** - Resource constraints (memory, disk, etc.)
- **`DependencyError`** - Missing or incompatible dependencies

## Usage Examples

### Creating and Throwing Errors

```javascript
const { NetworkError, ValidationError, createError } = require('./src/errors');

// Direct instantiation
throw new NetworkError('API endpoint unreachable', {
  code: 'ECONNREFUSED',
  context: { url: 'https://api.example.com', timeout: 30000 },
  suggestions: [
    'Check your internet connection',
    'Verify the API endpoint URL',
    'Try again in a few moments'
  ]
});

// Using the factory function
throw createError('validation', 'Invalid email format', {
  context: { field: 'email', value: 'invalid-email' }
});
```

### Error Handling with Recovery

```javascript
const { handleAsyncOperation, retryOperation } = require('./src/errors');

// Basic error handling
const result = await handleAsyncOperation(
  async () => performOperation(),
  { operationName: 'data-sync' },
  {
    NetworkError: async (error) => {
      console.log('Network error, using cached data');
      return getCachedData();
    },
    default: async (error) => {
      console.error('Operation failed:', error.message);
      throw error;
    }
  }
);

// Retry with exponential backoff
const result = await retryOperation(
  async () => makeApiCall(),
  {
    maxAttempts: 3,
    baseDelay: 1000,
    backoffFactor: 2,
    retryCondition: (error) => error.code === 'NETWORK_ERROR'
  }
);
```

### Error Recovery System

```javascript
const { ErrorRecoveryManager } = require('./src/errors');

const recoveryManager = new ErrorRecoveryManager();

// Register custom recovery strategy
recoveryManager.registerRecoveryStrategy('CustomError', {
  name: 'custom_recovery',
  async recover(error, context) {
    if (await canRecover(error)) {
      return {
        success: true,
        action: 'recovered',
        message: 'Successfully recovered from error'
      };
    }
    return { success: false };
  }
});

// Attempt recovery
const result = await recoveryManager.attemptRecovery(error, {
  retryCount: 2,
  fallbackData: cachedData
});
```

### Error Logging and Reporting

```javascript
const { ErrorLogger, ErrorAnalytics } = require('./src/errors');

// Setup logging
const logger = new ErrorLogger({
  enableConsole: true,
  enableFile: true,
  logFilePath: './logs/errors.log',
  enableRemote: true,
  remoteEndpoint: 'https://logging.example.com/errors'
});

// Log errors
await logger.logError(error, {
  userId: 'user123',
  operation: 'file-upload',
  version: '1.2.3'
});

// Analytics and reporting
const analytics = new ErrorAnalytics();
analytics.recordError(error);

const report = analytics.generateReport();
console.log('Error report:', report);
```

### User-Friendly Error Presentation

```javascript
const { UserErrorPresenter, InteractiveErrorHandler } = require('./src/errors');

// Simple error presentation
const presenter = new UserErrorPresenter({
  verboseMode: false,
  showSuggestions: true,
  useColors: true
});

presenter.presentError(error);

// Interactive error handling
const interactiveHandler = new InteractiveErrorHandler();
const result = await interactiveHandler.handleError(error, context);

if (result.action === 'retry') {
  console.log('User chose to retry the operation');
}
```

### Complete Error System Setup

```javascript
const { createErrorSystem } = require('./src/errors');

// Create a comprehensive error system
const errorSystem = createErrorSystem({
  enableGlobalHandler: true,    // Handle uncaught errors
  enableRecovery: true,        // Enable automatic recovery
  enableLogging: true,         // Log errors to console/file
  enableAnalytics: true,       // Collect error statistics
  verboseMode: false,          // User-friendly messages
  logToFile: true,            // Enable file logging
  logFilePath: './logs/errors.log',
  exitOnError: false,         // Don't exit on uncaught errors
  maxRecoveryAttempts: 3,     // Recovery attempt limit
  showSuggestions: true       // Show helpful suggestions
});

// Use the error system handler
const handler = errorSystem.createHandler({
  component: 'main-app',
  version: '1.0.0'
});

const result = await handler(async () => {
  // Your application logic here
  return await performComplexOperation();
});
```

## Configuration Options

### Error Logger Options

```javascript
const loggerOptions = {
  logLevel: 'error',                    // Minimum log level
  enableConsole: true,                  // Log to console
  enableFile: true,                     // Log to file
  enableRemote: false,                  // Send to remote service
  logFilePath: './logs/errors.log',     // Log file path
  maxFileSize: 10 * 1024 * 1024,       // Max file size (10MB)
  maxFiles: 5,                          // Max rotated files
  sensitiveFields: ['password', 'token'], // Fields to redact
  remoteEndpoint: 'https://...',        // Remote logging endpoint
  remoteApiKey: 'api-key'               // API key for remote service
};
```

### Recovery Manager Options

```javascript
const recoveryOptions = {
  maxRecoveryAttempts: 3,          // Max attempts per error
  recoveryTimeout: 30000,          // Timeout per recovery attempt
  enableAutoRecovery: true         // Enable automatic recovery
};
```

### User Presenter Options

```javascript
const presenterOptions = {
  theme: 'default',               // Presentation theme
  verboseMode: false,             // Show detailed error info
  showSuggestions: true,          // Show helpful suggestions
  showContext: true,              // Show error context
  showStack: false,               // Show stack traces
  useColors: true,                // Use terminal colors
  maxContextItems: 5              // Max context items to show
};
```

## Error Context

The error system supports rich context information to help with debugging and recovery:

```javascript
const error = new NetworkError('Connection failed', {
  context: {
    url: 'https://api.example.com',
    method: 'POST',
    timeout: 30000,
    retryCount: 2,
    userAgent: 'ClaudeCode/1.0.0'
  }
});
```

Common context fields:
- `file`, `path`, `filename` - File-related operations
- `url`, `endpoint`, `host` - Network operations
- `command`, `tool`, `server` - Tool and server operations
- `user`, `session` - User and session context
- `operation`, `action` - What was being performed
- `retryCount`, `attempt` - Retry information

## Error Recovery Strategies

The system includes built-in recovery strategies for common error scenarios:

### Authentication Recovery
- Automatically refreshes tokens
- Prompts for re-authentication
- Uses stored credentials

### Network Recovery
- Checks network connectivity
- Uses cached data when available
- Tries alternative endpoints

### File System Recovery
- Creates missing directories
- Suggests alternative file locations
- Attempts backup restoration

### Timeout Recovery
- Suggests retry with longer timeout
- Provides timeout adjustment recommendations

## Integration with Existing Code

The error system is designed to integrate seamlessly with existing Claude Code components:

```javascript
// In network/http-client.js
const { NetworkError, withErrorHandling } = require('../errors');

class HttpClient {
  async request(options) {
    return withErrorHandling(
      async () => {
        // Existing HTTP request logic
        return await this.performRequest(options);
      },
      { 
        operation: 'http-request', 
        url: options.url,
        method: options.method 
      }
    );
  }
}

// In auth/auth-manager.js
const { AuthenticationError } = require('../errors');

class AuthManager {
  async authenticate() {
    if (!this.token.isValid()) {
      throw new AuthenticationError('Token expired', {
        suggestions: [
          'Log in again to refresh your session',
          'Check your internet connection'
        ]
      });
    }
  }
}
```

## Best Practices

1. **Use specific error types** - Choose the most appropriate error class for your scenario
2. **Provide helpful context** - Include relevant information for debugging and recovery
3. **Add suggestions** - Help users understand how to resolve the issue
4. **Make errors recoverable** - When possible, allow automatic or manual recovery
5. **Sanitize sensitive data** - Never log passwords, tokens, or other secrets
6. **Use consistent error codes** - Maintain a registry of error codes across the application
7. **Test error scenarios** - Write tests for both happy path and error conditions

## Performance Considerations

- Error handling adds minimal overhead to normal operations
- Logging is asynchronous and won't block application flow
- Recovery strategies have configurable timeouts to prevent hanging
- Analytics data is kept in memory with automatic cleanup
- File logging includes rotation to prevent disk space issues

## Security Features

- Automatic detection and redaction of sensitive information
- Configurable sensitive field patterns
- Stack trace sanitization in production
- Remote logging with authentication support
- Privacy-conscious error context collection