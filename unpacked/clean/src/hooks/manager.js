/**
 * Hooks Manager
 * 
 * Manages the comprehensive hooks system for Claude Code.
 * Based on the actual implementation from chunk_0587.js and chunk_0588.js
 */

import { EventEmitter } from 'events';
import { spawn } from 'child_process';

/**
 * Available hook event types - extracted from original chunks
 */
export const HOOK_EVENTS = {
    PRE_TOOL_USE: 'PreToolUse',
    POST_TOOL_USE: 'PostToolUse', 
    USER_PROMPT_SUBMIT: 'UserPromptSubmit',
    NOTIFICATION: 'Notification',
    STOP: 'Stop',
    SUBAGENT_STOP: 'SubagentStop',
    PRE_COMPACT: 'PreCompact',
    SESSION_START: 'SessionStart'
};

/**
 * Execute a hook command with input data
 * 
 * Extracted from chunk_0587.js:205-280 (qL0 function):
 * - Handles process spawning with environment setup
 * - Uses CLAUDE_PROJECT_DIR environment variable 
 * - Supports shell prefix configuration via CLAUDE_CODE_SHELL_PREFIX
 * - Implements stdin data passing and stdout/stderr collection
 * - Handles cancellation via AbortSignal
 * 
 * @param {string} command - Shell command to execute
 * @param {string} input - JSON input data for the command
 * @param {AbortSignal} signal - Abort signal for cancellation
 * @returns {Promise<Object>} Command execution result
 */
async function executeHookCommand(command, input, signal) {
    if (signal.aborted) {
        return {
            stdout: "",
            stderr: "Operation cancelled",
            status: 1,
            aborted: true
        };
    }

    // Get project directory - equivalent to _9() in original
    const projectDir = process.cwd();
    
    // Apply shell prefix if configured
    const finalCommand = process.env.CLAUDE_CODE_SHELL_PREFIX 
        ? `${process.env.CLAUDE_CODE_SHELL_PREFIX} ${command}`
        : command;

    // Spawn the process - fW8 in original is spawn
    const childProcess = spawn(finalCommand, [], {
        env: {
            ...process.env,
            CLAUDE_PROJECT_DIR: projectDir
        },
        cwd: process.cwd(),
        shell: true,
        signal: signal
    });

    let stdout = "";
    let stderr = "";

    // Collect stdout
    childProcess.stdout.on("data", (chunk) => {
        stdout += chunk.toString();
    });

    // Collect stderr
    childProcess.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
    });

    // Promise to handle stdin writing
    const stdinPromise = new Promise((resolve, reject) => {
        childProcess.stdin.on("error", reject);
        childProcess.stdin.write(input);
        childProcess.stdin.end();
        resolve();
    });

    // Promise to handle process errors
    const errorPromise = new Promise((resolve, reject) => {
        childProcess.on("error", reject);
    });

    // Promise to handle process completion
    const exitPromise = new Promise((resolve) => {
        childProcess.on("close", (exitCode) => {
            resolve({
                stdout,
                stderr,
                status: exitCode ?? 1,
                aborted: signal.aborted
            });
        });
    });

    try {
        // Wait for stdin to be written
        await Promise.race([stdinPromise, errorPromise]);
        
        // Wait for process to complete
        return await Promise.race([exitPromise, errorPromise]);
        
    } catch (error) {
        // Handle specific error cases from original implementation
        if (error.code === "EPIPE") {
            console.warn("EPIPE error while writing to hook stdin (hook command likely closed early)");
            return {
                stdout: "",
                stderr: "Hook command closed stdin before hook input was fully written (EPIPE)",
                status: 1
            };
        } else if (error.code === "ABORT_ERR") {
            return {
                stdout: "",
                stderr: "Hook cancelled",
                status: 1,
                aborted: true
            };
        } else {
            return {
                stdout: "",
                stderr: `Error occurred while executing hook command: ${error instanceof Error ? error.message : String(error)}`,
                status: 1
            };
        }
    }
}

/**
 * Hook matcher function
 * 
 * Extracted from chunk_0587.js:355-380 (gW8 function):
 * - Handles wildcard pattern "*" for matching all
 * - Supports pipe-separated patterns for multiple values (e.g., "Read|Write|Edit")
 * - Falls back to regex pattern matching for complex patterns
 * - Validates alphanumeric patterns before attempting regex
 * 
 * @param {string} query - Query to match against
 * @param {string} pattern - Pattern to match
 * @returns {boolean} Whether the query matches the pattern
 */
function matchesHookPattern(query, pattern) {
    if (!pattern || pattern === "*") {
        return true;
    }
    
    // Simple alphanumeric patterns with pipe separator
    if (/^[a-zA-Z0-9_|]+$/.test(pattern)) {
        if (pattern.includes("|")) {
            return pattern.split("|").map(p => p.trim()).includes(query);
        }
        return query === pattern;
    }
    
    // Regex pattern
    try {
        return new RegExp(pattern).test(query);
    } catch {
        console.warn(`Invalid regex pattern in hook matcher: ${pattern}`);
        return false;
    }
}

/**
 * Get matching hooks for an event
 * 
 * Extracted from chunk_0588.js:45-95 (_jB function):
 * - Handles tool-specific query extraction for PreToolUse/PostToolUse events
 * - Iterates through hook matchers to find pattern matches
 * - Returns array of matching hook command strings
 * - Supports different event types with appropriate query extraction
 * 
 * @param {string} eventName - Hook event name
 * @param {Object} eventData - Event data
 * @param {Array} hookMatchers - Hook matchers from settings
 * @returns {Array} Matching hook commands
 */
function getMatchingHooks(eventName, eventData, hookMatchers) {
    try {
        let query = undefined;
        
        // Extract query based on event type
        switch (eventData.hook_event_name) {
            case "PreToolUse":
            case "PostToolUse":
                query = eventData.tool_name;
                break;
            case "SessionStart":
                query = eventData.source;
                break;
            case "PreCompact":
                query = eventData.trigger;
                break;
            default:
                break;
        }
        
        console.log(`Getting matching hook commands for ${eventName} with query: ${query}`);
        console.log(`Found ${hookMatchers.length} hook matchers in settings`);
        
        let allHooks;
        if (!query) {
            // No query - include all hooks
            allHooks = hookMatchers.flatMap(matcher => matcher.hooks);
        } else {
            // Filter by matcher pattern
            allHooks = hookMatchers
                .filter(matcher => !matcher.matcher || matchesHookPattern(query, matcher.matcher))
                .flatMap(matcher => matcher.hooks);
        }
        
        // Deduplicate command hooks by command string
        const commandHooks = Array.from(
            new Map(
                allHooks
                    .filter(hook => hook.type === "command")
                    .map(hook => [hook.command, hook])
            ).values()
        );
        
        const callbackHooks = allHooks.filter(hook => hook.type === "callback");
        
        const matchingHooks = [...commandHooks, ...callbackHooks];
        
        console.log(`Matched ${matchingHooks.length} unique hooks for query "${query || "no match query"}" (${allHooks.length} before deduplication)`);
        
        return matchingHooks;
    } catch {
        return [];
    }
}

/**
 * Parse and validate hook JSON output
 * 
 * Extracted from chunk_0588.js:155-175 (hW8 function):
 * - Attempts JSON parsing of hook stdout
 * - Falls back to plain text if JSON parsing fails
 * - Returns structured result with validation status
 * - Handles empty output gracefully
 * 
 * @param {string} output - Raw stdout from hook
 * @returns {Object} Parsed output with validation
 */
function parseHookOutput(output) {
    try {
        const trimmed = output.trim();
        if (!trimmed) {
            return { json: null, plainText: "", validationError: null };
        }
        
        // Try to parse as JSON
        const parsed = JSON.parse(trimmed);
        return { json: parsed, plainText: trimmed, validationError: null };
    } catch (error) {
        // Not valid JSON, treat as plain text
        return { json: null, plainText: output.trim(), validationError: null };
    }
}

/**
 * Hooks Manager - coordinates hook execution for all events
 * 
 * Extracted from chunk_0588.js:200-400 (VF1 function and related logic):
 * - Manages hook matchers by event type
 * - Provides async generators for Pre/Post hook execution
 * - Handles hook loading from settings configuration
 * - Implements proper error handling and debug logging
 * - Supports hook enabling/disabling and configuration updates
 */
export class HooksManager extends EventEmitter {
    constructor(options = {}) {
        super();
        this._debug = options.debug || false;
        this._enabled = options.enabled !== false;
        this._hookMatchers = new Map(); // eventType -> matcher[]
    }

    /**
     * Load hook matchers from settings
     * @param {Object} settings - Settings containing hook configurations
     */
    loadHookMatchers(settings) {
        // Clear existing matchers
        this._hookMatchers.clear();
        
        if (!settings || !settings.hooks) {
            return;
        }
        
        // Load hooks for each event type
        for (const [eventType, matchers] of Object.entries(settings.hooks)) {
            if (Object.values(HOOK_EVENTS).includes(eventType)) {
                this._hookMatchers.set(eventType, matchers || []);
                
                if (this._debug) {
                    console.log(`Loaded ${matchers?.length || 0} hook matchers for ${eventType}`);
                }
            }
        }
    }

    /**
     * Execute hooks for a specific event
     * Based on VF1 function from chunk_0588.js
     * 
     * @param {string} eventType - Hook event type
     * @param {Object} eventData - Event data to pass to hooks
     * @param {string} toolName - Tool name for filtering (optional)
     * @param {AbortSignal} signal - Abort signal for cancellation
     * @param {number} timeout - Default timeout in milliseconds
     * @returns {AsyncGenerator} Generator yielding hook results
     */
    async* executeHooks(eventType, eventData, toolName = null, signal = null, timeout = 60000) {
        const eventId = toolName ? `${eventType}:${toolName}` : eventType;
        
        if (!this._enabled) {
            console.log(`Skipping hooks for ${eventId} due to 'disableAllHooks' setting`);
            return;
        }

        console.log(`Executing hooks for ${eventId}`);
        
        const hookMatchers = this._hookMatchers.get(eventType) || [];
        const matchingHooks = getMatchingHooks(eventType, eventData, hookMatchers)
            .filter(hook => hook.type === "command" || hook.type === "callback");
        
        console.log(`Found ${matchingHooks.length} hook commands to execute`);
        
        if (matchingHooks.length === 0) {
            return;
        }
        
        if (signal?.aborted) {
            return;
        }

        let inputData;
        try {
            inputData = JSON.stringify(eventData);
        } catch (error) {
            console.error(`Failed to stringify hook ${eventId} input`, error);
            yield {
                message: `Failed to prepare hook input: ${error instanceof Error ? error.message : String(error)}`,
                type: "warning"
            };
            return;
        }

        // Track blocked results for PreToolUse
        const blockingResults = [];

        for (const hook of matchingHooks) {
            yield {
                message: {
                    type: "progress",
                    content: `Executing ${eventId} hook: ${hook.command}`
                }
            };

            if (hook.type === "callback") {
                // Handle callback hooks (for custom JavaScript functions)
                try {
                    const result = await hook.callback(eventData, signal);
                    yield {
                        message: `${eventId} [callback] completed successfully`,
                        outcome: "success",
                        ...result
                    };
                } catch (error) {
                    const errorMessage = `${eventId} [callback] failed to run: ${error instanceof Error ? error.message : String(error)}`;
                    console.error(errorMessage);
                    yield {
                        message: errorMessage,
                        type: "error",
                        outcome: "non_blocking_error"
                    };
                }
                continue;
            }

            // Handle command hooks
            const hookTimeout = hook.timeout ? hook.timeout * 1000 : timeout;
            let hookSignal;
            let cleanup;

            if (signal) {
                const combined = AbortSignal.any([signal, AbortSignal.timeout(hookTimeout)]);
                hookSignal = combined;
            } else {
                hookSignal = AbortSignal.timeout(hookTimeout);
            }

            try {
                console.log(`Executing hook command: ${hook.command} with timeout ${hookTimeout}ms`);
                
                const result = await executeHookCommand(hook.command, inputData, hookSignal);
                
                console.log(`Hook command completed with status ${result.status}: ${hook.command}`);
                
                if (result.stdout) {
                    console.log(`Hook stdout: ${result.stdout.substring(0, 200)}...`);
                }
                if (result.stderr) {
                    console.log(`Hook stderr: ${result.stderr}`);
                }

                if (result.aborted) {
                    yield {
                        message: `${eventId} [${hook.command}] cancelled`,
                        type: "info",
                        outcome: "cancelled"
                    };
                    continue;
                }

                const { json, plainText, validationError } = parseHookOutput(result.stdout);
                
                if (validationError) {
                    yield {
                        message: `${eventId} [${hook.command}] JSON validation failed:\n${validationError}`,
                        type: "warning",
                        outcome: "non_blocking_error"
                    };
                    continue;
                }

                if (json) {
                    console.log(`Parsed JSON output from hook: ${JSON.stringify(json)}`);
                    
                    // Check for blocking in PreToolUse hooks
                    if (eventType === HOOK_EVENTS.PRE_TOOL_USE && result.status === 1) {
                        blockingResults.push({
                            blockingError: json.message || plainText || "Hook blocked execution",
                            command: hook.command
                        });
                        
                        yield {
                            message: json.message || `${eventId} [${hook.command}] blocked execution`,
                            type: "warning",
                            outcome: "blocked",
                            blocked: true,
                            ...json
                        };
                    } else if (!json.suppressOutput && plainText && result.status === 0) {
                        const successMessage = `${eventId} [${hook.command}] completed successfully`;
                        yield {
                            message: json.message || successMessage,
                            type: "info",
                            outcome: "success",
                            ...json
                        };
                    } else {
                        yield {
                            outcome: "success",
                            ...json
                        };
                    }
                } else if (result.status === 0 && plainText) {
                    // Plain text success
                    yield {
                        message: `${eventId} [${hook.command}] completed successfully:\n${plainText}`,
                        type: "info",
                        outcome: "success"
                    };
                } else {
                    // Error case
                    const errorMsg = result.stderr || plainText || `Hook failed with status ${result.status}`;
                    yield {
                        message: `${eventId} [${hook.command}] failed:\n${errorMsg}`,
                        type: "error",
                        outcome: "non_blocking_error"
                    };
                }

            } catch (error) {
                const errorMessage = `${eventId} [${hook.command}] failed to run: ${error instanceof Error ? error.message : String(error)}`;
                console.error(errorMessage);
                yield {
                    message: errorMessage,
                    type: "error",
                    outcome: "non_blocking_error"
                };
            } finally {
                if (cleanup) {
                    cleanup();
                }
            }
        }

        // If we have blocking results, throw an aggregated error
        if (blockingResults.length > 0) {
            const errorMessages = blockingResults.map(r => `- ${r.blockingError}`).join('\n');
            const blockingError = new Error(`${eventType} operation blocked by hook:\n${errorMessages}`);
            blockingError.blockingResults = blockingResults;
            throw blockingError;
        }
    }

    /**
     * Execute pre-tool-use hooks for a specific tool
     * Based on gjB function from chunk_0588.js
     * 
     * @param {string} toolName - Name of the tool
     * @param {Object} toolInput - Tool input data
     * @param {AbortSignal} signal - Abort signal
     * @param {number} timeout - Timeout in milliseconds
     * @returns {AsyncGenerator} Generator yielding hook results
     */
    async* executePreToolHooks(toolName, toolInput, signal = null, timeout = 60000) {
        console.log(`executePreToolHooks called for tool: ${toolName}`);
        
        const eventData = {
            hook_event_name: "PreToolUse",
            tool_name: toolName,
            tool_input: toolInput,
            // Add session context - NS() in original
            timestamp: Date.now(),
            session_id: "current", // This should come from session manager
        };
        
        yield* this.executeHooks(HOOK_EVENTS.PRE_TOOL_USE, eventData, toolName, signal, timeout);
    }

    /**
     * Execute post-tool-use hooks for a specific tool
     * Based on ujB function from chunk_0588.js
     * 
     * @param {string} toolName - Name of the tool
     * @param {Object} toolInput - Tool input data
     * @param {Object} toolResponse - Tool response data
     * @param {AbortSignal} signal - Abort signal
     * @param {number} timeout - Timeout in milliseconds
     * @returns {AsyncGenerator} Generator yielding hook results
     */
    async* executePostToolHooks(toolName, toolInput, toolResponse, signal = null, timeout = 60000) {
        const eventData = {
            hook_event_name: "PostToolUse",
            tool_name: toolName,
            tool_input: toolInput,
            tool_response: toolResponse,
            timestamp: Date.now(),
            session_id: "current",
        };
        
        yield* this.executeHooks(HOOK_EVENTS.POST_TOOL_USE, eventData, toolName, signal, timeout);
    }

    /**
     * Execute user prompt submit hooks
     * 
     * @param {string} prompt - User prompt
     * @param {AbortSignal} signal - Abort signal
     * @returns {AsyncGenerator} Generator yielding hook results
     */
    async* executeUserPromptSubmitHooks(prompt, signal = null) {
        const eventData = {
            hook_event_name: "UserPromptSubmit",
            prompt: prompt,
            timestamp: Date.now(),
            session_id: "current",
        };
        
        yield* this.executeHooks(HOOK_EVENTS.USER_PROMPT_SUBMIT, eventData, null, signal);
    }

    /**
     * Execute session start hooks
     * 
     * @param {string} source - Session start source
     * @param {AbortSignal} signal - Abort signal
     * @returns {AsyncGenerator} Generator yielding hook results
     */
    async* executeSessionStartHooks(source, signal = null) {
        const eventData = {
            hook_event_name: "SessionStart",
            source: source,
            timestamp: Date.now(),
            session_id: "current",
        };
        
        yield* this.executeHooks(HOOK_EVENTS.SESSION_START, eventData, null, signal);
    }

    /**
     * Get hook statistics
     * @returns {Object} Hook statistics
     */
    getStats() {
        const stats = {};
        
        for (const [eventType, matchers] of this._hookMatchers.entries()) {
            const totalHooks = matchers.reduce((sum, matcher) => sum + (matcher.hooks?.length || 0), 0);
            stats[eventType] = {
                matcherCount: matchers.length,
                hookCount: totalHooks,
                matchers: matchers.map(m => ({
                    matcher: m.matcher || "*",
                    hookCount: m.hooks?.length || 0
                }))
            };
        }
        
        return {
            enabled: this._enabled,
            totalMatchers: Array.from(this._hookMatchers.values()).reduce((sum, matchers) => sum + matchers.length, 0),
            totalHooks: Object.values(stats).reduce((sum, stat) => sum + stat.hookCount, 0),
            byEvent: stats
        };
    }

    /**
     * Enable or disable hooks system
     * @param {boolean} enabled - Whether to enable hooks
     */
    setEnabled(enabled) {
        this._enabled = enabled;
        this.emit('enabledChanged', enabled);
    }

    /**
     * Clear all hook matchers
     */
    clearAllHooks() {
        this._hookMatchers.clear();
    }
}

// Export singleton instance
export const hooksManager = new HooksManager();