# Session Management Specification

## Overview
Claude Code implements comprehensive session management for persistent conversations, state management, checkpointing, and recovery. This system enables users to continue conversations across CLI invocations and manage multiple concurrent contexts.

## Architecture

### Core Components
- **Session Store**: Persistent conversation storage
- **State Manager**: Conversation state tracking
- **Checkpoint System**: Conversation snapshots and recovery points
- **Resume Engine**: Session continuation and restoration
- **Teleport System**: Remote session synchronization

### Session Lifecycle
```
Creation → Active → Checkpointing → Suspension → Resume → Cleanup
```

## Session Storage

### Session Structure
```javascript
{
    session_id: string,           // Unique session identifier
    created_at: timestamp,        // Session creation time
    updated_at: timestamp,        // Last activity time
    title: string,               // User-defined or auto-generated title
    conversation: Message[],      // Full conversation history
    state: {
        model: string,           // Active AI model
        context: object,         // Conversation context
        tools: string[],         // Available tools
        permissions: object      // Permission state
    },
    metadata: {
        project_path: string,    // Associated project directory
        git_info: object,        // Git repository context
        environment: object      // Environment variables snapshot
    }
}
```

### Storage Backend
- **Local Storage**: `~/.claude/sessions/` directory
- **Format**: JSONL (JSON Lines) for efficient appending
- **Indexing**: Session metadata cache for fast lookup
- **Compression**: Optional gzip compression for large sessions

## Session Operations

### Session Creation
```javascript
class SessionManager {
    async createSession(initialPrompt, options = {}) {
        // Generate unique session ID
        // Initialize conversation with system prompt
        // Set up tool permissions and context
        // Save initial state
    }
}
```

### Conversation Persistence
```javascript
async appendToSession(sessionId, message) {
    // Validate session exists
    // Append message to conversation log
    // Update session metadata
    // Trigger checkpoint if needed
}
```

### Session Resume
```javascript
async resumeSession(sessionId) {
    // Load session from storage
    // Restore conversation state
    // Reinitialize tool contexts
    // Continue conversation
}
```

## Checkpointing System

### Automatic Checkpoints
- **Message Intervals**: Every N messages
- **Time Intervals**: Every N minutes
- **Tool Usage**: Before/after tool executions
- **Error Recovery**: Before potentially risky operations

### Manual Checkpoints
```bash
# Create checkpoint with label
claude checkpoint "before refactor"

# List available checkpoints
claude checkpoints list

# Restore from checkpoint
claude restore checkpoint-id
```

### Checkpoint Storage
```javascript
{
    checkpoint_id: string,
    session_id: string,
    created_at: timestamp,
    label: string,
    conversation_state: object,
    environment_snapshot: object,
    git_state: object
}
```

## Teleport System

### Remote Session Sync
```javascript
class TeleportManager {
    async uploadSession(sessionId) {
        // Encrypt session data
        // Upload to Claude.ai servers
        // Generate teleport code
    }
    
    async downloadSession(teleportCode) {
        // Authenticate with teleport code
        // Download encrypted session
        // Decrypt and restore locally
    }
}
```

### Teleport Workflow
```
Local Session → Encrypt → Upload → Generate Code → Share Code → Download → Decrypt → Restore
```

## State Management

### Conversation State
- **Message History**: Complete conversation log
- **Context Variables**: Active context and variables
- **Tool State**: Tool configuration and permissions
- **Environment State**: Working directory and environment

### State Persistence
```javascript
class StateManager {
    saveState(sessionId, state) {
        // Serialize conversation state
        // Save to persistent storage
        // Update state cache
    }
    
    loadState(sessionId) {
        // Load from persistent storage
        // Deserialize state objects
        // Validate state integrity
    }
}
```

## Session Discovery

### Session Listing
```bash
claude sessions list                    # List all sessions
claude sessions list --recent          # Recent sessions only
claude sessions list --project         # Project-specific sessions
```

### Session Search
```javascript
async searchSessions(query, filters = {}) {
    // Full-text search in conversation content
    // Filter by date range, project, model
    // Rank results by relevance
    return searchResults;
}
```

### Session Metadata
- **Auto-generated Titles**: Based on conversation content
- **Tags**: User-defined or auto-generated tags
- **Project Association**: Link to project directories
- **Git Context**: Associated repository and branch info

## Session Cleanup

### Automatic Cleanup
- **Age-based**: Remove sessions older than N days
- **Size-based**: Remove when total storage exceeds limit  
- **Activity-based**: Remove inactive sessions

### Manual Cleanup
```bash
claude sessions clean                   # Interactive cleanup
claude sessions clean --older-than 30d # Remove old sessions
claude sessions delete session-id      # Delete specific session
```

## Performance Optimization

### Lazy Loading
- Load session metadata quickly
- Stream conversation history on demand
- Progressive message loading for large sessions

### Caching
- **Metadata Cache**: Fast session listing
- **Content Cache**: Recently accessed messages
- **State Cache**: Active session state

### Compression
- **Message Compression**: Compress old messages
- **Attachment Handling**: External storage for large attachments
- **Incremental Updates**: Only store message deltas