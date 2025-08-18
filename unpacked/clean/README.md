# Claude Code CLI - Clean Implementation

This directory contains a clean, readable implementation of the Claude Code CLI extracted from the original bundled JavaScript.

## Project Structure

```
src/
├── cli/                 # Command-line interface
│   ├── commands/        # Individual command implementations  
│   ├── options.js       # CLI option definitions
│   └── index.js         # Main CLI setup
├── core/                # Core Claude functionality
│   ├── messaging/       # Message handling
│   ├── tools/          # Tool management
│   ├── sessions/       # Session management
│   └── streaming/      # Response streaming
├── mcp/                 # MCP server management
│   ├── server.js        # MCP server implementation
│   ├── transport/       # Transport implementations
│   ├── config.js        # Server configuration
│   └── discovery.js     # Server discovery
├── config/              # Configuration management
│   ├── manager.js       # Config CRUD operations
│   ├── scopes.js        # Local/global scopes
│   └── validation.js    # Config validation
├── ui/                  # Interactive UI components
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   └── renderer.js     # Terminal rendering
└── utils/               # Utility functions
    ├── git.js          # Git operations
    ├── files.js        # File system utilities
    └── validation.js   # Input validation
```

## Key Improvements

- **Readable Code**: Removed obfuscated variable names
- **No Sentry**: Removed all error tracking and monitoring code
- **Modular Structure**: Separated concerns into logical modules
- **Clean Dependencies**: Minimized external dependencies
- **Comprehensive Documentation**: Added JSDoc comments throughout

## Original Source Mapping

This clean implementation is extracted from 650 JavaScript chunks totaling ~369k lines:

- **CLI Framework**: chunks 640-650 (Commander.js)
- **Interactive UI**: chunks 630-647 (React components)
- **Core Logic**: chunks 620-640 (Message handling, tools)
- **Node.js Utilities**: chunks 1-100 (File system, process management)
- **Sentry Integration**: chunks 2-30 (REMOVED)

## Commands Implemented

- `claude [prompt]` - Interactive mode (default)
- `claude config <subcommand>` - Configuration management
- `claude mcp <subcommand>` - MCP server management  
- `claude setup-token` - Authentication setup
- `claude doctor` - Health diagnostics
- `claude update` - Version management
- `claude install [target]` - Installation management

## Development

See `/spec/` directory for detailed technical documentation and chunk mapping information.