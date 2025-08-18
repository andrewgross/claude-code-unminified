# Claude Code CLI Authentication System

This directory contains the deobfuscated authentication system for the Claude Code CLI, extracted and reconstructed from the minified CLI.js file.

## Overview

The authentication system provides secure, multi-method authentication for the Claude Code CLI with the following features:

- **OAuth 2.0 with PKCE** - Secure browser-based authentication
- **API Key Authentication** - Direct API key validation and management
- **Token Management** - Automatic token refresh and lifecycle management
- **Session Validation** - Security controls and session management
- **Unified Interface** - Single authentication manager coordinating all methods

## Architecture

### Core Components

1. **`auth-manager.js`** - Main coordinator orchestrating all authentication methods
2. **`oauth.js`** - OAuth 2.0 flow with PKCE implementation
3. **`apikey.js`** - API key validation, storage, and management
4. **`token-manager.js`** - Token lifecycle management and automatic refresh
5. **`session-validator.js`** - Session validation and security controls
6. **`index.js`** - Public API and convenience functions

## Features

### OAuth Authentication
- Full OAuth 2.0 Authorization Code flow with PKCE
- Automatic browser launching for authorization
- Local callback server for secure code exchange
- State parameter validation for CSRF protection
- Secure token storage with encryption

### API Key Authentication
- Format validation and security checks
- API endpoint validation
- Secure local storage with obfuscation
- Key rotation support
- Usage validation and testing

### Token Management
- Automatic token refresh before expiration
- Secure encrypted storage
- Backup and recovery
- Expiration monitoring
- Rate limit handling

### Session Validation
- System fingerprinting for device validation
- Configurable security levels (basic, standard, strict)
- Idle timeout protection
- Session encryption
- Activity tracking

## Usage Examples

### Basic Authentication

```javascript
import { createClaudeAuth } from './auth/index.js';

// Create auth manager
const authManager = createClaudeAuth({
  PREFERRED_AUTH_METHOD: 'oauth',
  SECURITY_LEVEL: 'standard'
});

// Initialize and check existing auth
await authManager.initialize();

// Authenticate user
if (!authManager.currentState === 'authenticated') {
  await authManager.authenticate();
}

// Get access token for API calls
const token = await authManager.getAccessToken();
```

### OAuth Authentication

```javascript
import { OAuthFlow } from './auth/oauth.js';

const oauth = new OAuthFlow();
const tokenData = await oauth.startAuthFlow();
console.log('Access token:', tokenData.accessToken);
```

### API Key Authentication

```javascript
import { ApiKeyManager } from './auth/apikey.js';

const apiManager = new ApiKeyManager();

// Validate and store API key
const validation = await apiManager.validateKeyWithAPI('your-api-key');
if (validation.isValid) {
  await apiManager.storeApiKey('your-api-key', validation);
}
```

### Token Management

```javascript
import { TokenManager } from './auth/token-manager.js';

const tokenManager = new TokenManager();

// Store tokens
await tokenManager.storeTokens({
  accessToken: 'token',
  refreshToken: 'refresh',
  expiresIn: 3600,
  issuedAt: Date.now()
});

// Get valid token (auto-refreshes if needed)
const validToken = await tokenManager.getValidAccessToken(refreshFunction);
```

### Session Validation

```javascript
import { SessionValidator } from './auth/session-validator.js';

const sessionValidator = new SessionValidator({
  SECURITY_LEVEL: 'standard'
});

// Create session
await sessionValidator.createSession(authData);

// Validate session
const validation = await sessionValidator.validateSession();
console.log('Session valid:', validation.isValid);
```

## Configuration

### Authentication Manager Options

```javascript
const config = {
  PREFERRED_AUTH_METHOD: 'oauth', // 'oauth' | 'apikey'
  AUTO_REFRESH_TOKENS: true,
  SESSION_MANAGEMENT: true,
  SECURITY_LEVEL: 'standard', // 'basic' | 'standard' | 'strict'
  BACKUP_AUTH_METHODS: ['apikey'],
  TOKEN_REFRESH_THRESHOLD: 300000, // 5 minutes
  MAX_AUTH_ATTEMPTS: 3
};
```

### Security Levels

- **Basic**: Minimal validation, allows some system changes
- **Standard**: Balanced security with reasonable flexibility
- **Strict**: Maximum security, requires exact system match

## Security Features

### Encryption
- AES-256-CBC encryption for stored tokens and sessions
- System-specific encryption keys
- Secure key derivation from system information

### Validation
- API key format validation
- Token expiration checking
- Session fingerprinting
- Rate limit monitoring

### Storage Security
- Restricted file permissions (600)
- Hidden credential directories
- Encrypted sensitive data
- Automatic cleanup of old backups

## File Storage

The authentication system stores data in `~/.claude-cli/`:

```
~/.claude-cli/
├── credentials.json    # Encrypted API key storage
├── tokens.json        # Encrypted OAuth tokens
├── session.json       # Encrypted session data
├── .token-key         # Token encryption key
└── tokens-backup-*    # Token backups
```

## Events

The authentication system emits various events for monitoring:

```javascript
authManager.on('authenticated', (result) => {
  console.log('User authenticated:', result.user.email);
});

authManager.on('tokenRefreshed', (tokens) => {
  console.log('Tokens refreshed successfully');
});

authManager.on('sessionTerminated', (info) => {
  console.log('Session ended:', info.reason);
});
```

## Error Handling

All components include comprehensive error handling:

```javascript
try {
  await authManager.authenticate();
} catch (error) {
  if (error.message.includes('OAuth')) {
    // Handle OAuth-specific errors
  } else if (error.message.includes('API key')) {
    // Handle API key errors
  }
}
```

## Development Notes

This authentication system was reconstructed from the minified CLI.js file by:

1. **Pattern Analysis**: Identifying authentication-related patterns and functions
2. **Code Structure**: Understanding the webpack module system and dependencies
3. **API Reconstruction**: Rebuilding the API interfaces and method signatures
4. **Security Implementation**: Adding proper security controls and validation
5. **Documentation**: Creating comprehensive JSDoc comments and examples

The code follows modern ES6+ standards with:
- Native ES modules (import/export)
- Async/await for Promise handling
- Class-based architecture
- Event-driven design
- Comprehensive error handling

## Dependencies

The authentication system uses only Node.js built-in modules:
- `crypto` - Encryption and hashing
- `fs/promises` - File system operations
- `http` - Local OAuth callback server
- `url` - URL parsing and construction
- `os` - System information
- `events` - Event emitter functionality
- `child_process` - Browser launching

No external dependencies are required for the core authentication functionality.