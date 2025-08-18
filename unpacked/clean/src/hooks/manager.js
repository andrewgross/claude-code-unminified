/**
 * Hooks Manager
 * 
 * Manages the comprehensive hooks system for Claude Code.
 * Supports all hook event types with shell command execution and blocking capabilities.
 */

import { EventEmitter } from 'events';
import { spawn } from 'child_process';
import { spawnWithHooks } from '../utils/hooks.js';

/**
 * Available hook event types
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
 * Hook execution result
 */
class HookResult {
    constructor(success = true, blocked = false, output = '', error = null, data = null) {
        this.success = success;
        this.blocked = blocked;  // For PreToolUse hooks to block execution
        this.output = output;
        this.error = error;
        this.data = data;
        this.timestamp = Date.now();
    }
}

/**
 * Individual hook configuration
 */
class Hook {
    constructor(config) {
        this.type = config.type || 'command';
        this.command = config.command;
        this.timeout = config.timeout || 60000; // 60 second default
        this.env = config.env || {};
        this.name = config.name || `hook-${Date.now()}`;
    }

    /**
     * Execute the hook with provided data
     * @param {Object} data - Data to pass to hook via stdin
     * @param {Object} options - Execution options
     * @returns {Promise<HookResult>}
     */
    async execute(data, options = {}) {
        if (this.type !== 'command') {
            return new HookResult(false, false, '', 
                new Error(`Unsupported hook type: ${this.type}`));
        }

        return new Promise((resolve) => {
            const env = {
                ...process.env,
                ...this.env,
                CLAUDE_PROJECT_DIR: process.cwd(),
                CLAUDE_HOOK_EVENT: options.eventType || '',
                CLAUDE_HOOK_NAME: this.name
            };

            // Parse command and args
            const [cmd, ...args] = this.command.split(' ');
            
            const child = spawnWithHooks(cmd, args, {
                env,
                stdio: ['pipe', 'pipe', 'pipe'],
                cwd: process.cwd(),
                timeout: this.timeout
            });

            let stdout = '';
            let stderr = '';
            let timedOut = false;

            // Set up timeout
            const timeoutId = setTimeout(() => {
                timedOut = true;
                child.kill('SIGTERM');
                
                // Force kill after additional 5 seconds
                setTimeout(() => {
                    if (!child.killed) {
                        child.kill('SIGKILL');
                    }
                }, 5000);
            }, this.timeout);

            // Collect output
            if (child.stdout) {
                child.stdout.on('data', (chunk) => {
                    stdout += chunk.toString();
                });
            }

            if (child.stderr) {
                child.stderr.on('data', (chunk) => {
                    stderr += chunk.toString();
                });
            }

            // Handle completion
            child.on('close', (code, signal) => {
                clearTimeout(timeoutId);

                if (timedOut) {
                    resolve(new HookResult(false, false, stdout, 
                        new Error(`Hook timed out after ${this.timeout}ms`)));
                    return;
                }

                if (signal) {
                    resolve(new HookResult(false, false, stdout,
                        new Error(`Hook killed with signal: ${signal}`)));
                    return;
                }

                // Check for blocking (exit code 1 for PreToolUse hooks)
                const blocked = options.eventType === HOOK_EVENTS.PRE_TOOL_USE && code === 1;
                const success = code === 0 || blocked;

                let parsedOutput = null;
                try {
                    // Try to parse stdout as JSON for structured responses
                    if (stdout.trim()) {
                        parsedOutput = JSON.parse(stdout.trim());
                    }
                } catch {
                    // Keep as string if not valid JSON
                    parsedOutput = stdout.trim();
                }

                resolve(new HookResult(success, blocked, stdout, 
                    code !== 0 && !blocked ? new Error(stderr || `Hook failed with code ${code}`) : null,
                    parsedOutput));
            });

            child.on('error', (error) => {
                clearTimeout(timeoutId);
                resolve(new HookResult(false, false, '', error));
            });

            // Send input data via stdin
            if (child.stdin) {
                try {
                    const inputData = JSON.stringify(data, null, 2);
                    child.stdin.write(inputData);
                    child.stdin.end();
                } catch (error) {
                    clearTimeout(timeoutId);
                    child.kill();
                    resolve(new HookResult(false, false, '', 
                        new Error(`Failed to send data to hook: ${error.message}`)));
                }
            }
        });
    }
}

/**
 * Hooks Manager - coordinates hook execution for all events
 */
export class HooksManager extends EventEmitter {
    constructor(options = {}) {
        super();
        this._hooks = new Map(); // eventType -> [Hook[]]
        this._debug = options.debug || false;
        this._enabled = options.enabled !== false;
        
        // Initialize hook storage for all event types
        Object.values(HOOK_EVENTS).forEach(eventType => {
            this._hooks.set(eventType, []);
        });
    }

    /**
     * Register a hook for a specific event type
     * @param {string} eventType - Hook event type
     * @param {Object} hookConfig - Hook configuration
     * @param {string} matcher - Tool/action matcher pattern
     */
    registerHook(eventType, hookConfig, matcher = '*') {
        if (!Object.values(HOOK_EVENTS).includes(eventType)) {
            throw new Error(`Invalid hook event type: ${eventType}`);
        }

        const hook = new Hook({
            ...hookConfig,
            matcher,
            name: hookConfig.name || `${eventType}-${matcher}-${Date.now()}`
        });

        const hooks = this._hooks.get(eventType) || [];
        hooks.push(hook);
        this._hooks.set(eventType, hooks);

        if (this._debug) {
            console.log(`Registered ${eventType} hook: ${hook.name}`);
        }

        this.emit('hookRegistered', { eventType, hook, matcher });
    }

    /**
     * Execute hooks for a specific event
     * @param {string} eventType - Hook event type
     * @param {Object} data - Event data to pass to hooks
     * @param {Object} options - Execution options
     * @returns {Promise<Object>} Combined hook results
     */
    async executeHooks(eventType, data, options = {}) {
        if (!this._enabled) {
            return { success: true, blocked: false, results: [] };
        }

        const hooks = this._hooks.get(eventType) || [];
        
        if (hooks.length === 0) {
            return { success: true, blocked: false, results: [] };
        }

        // Filter hooks by matcher if tool information is provided
        const applicableHooks = hooks.filter(hook => {
            if (!data.tool || hook.matcher === '*') {
                return true;
            }
            
            return this._matchesTool(hook.matcher, data.tool);
        });

        if (applicableHooks.length === 0) {
            return { success: true, blocked: false, results: [] };
        }

        if (this._debug) {
            console.log(`Executing ${applicableHooks.length} ${eventType} hooks`);
        }

        const results = [];
        let anyBlocked = false;

        // Execute hooks sequentially for blocking events, parallel for non-blocking
        const isBlockingEvent = eventType === HOOK_EVENTS.PRE_TOOL_USE;

        if (isBlockingEvent) {
            // Execute sequentially and stop on first block
            for (const hook of applicableHooks) {
                const result = await hook.execute(data, { eventType, ...options });
                results.push(result);

                if (result.blocked) {
                    anyBlocked = true;
                    if (this._debug) {
                        console.log(`Hook ${hook.name} blocked execution`);
                    }
                    break; // Stop on first block
                }

                if (!result.success && this._debug) {
                    console.warn(`Hook ${hook.name} failed:`, result.error?.message);
                }
            }
        } else {
            // Execute in parallel for non-blocking events
            const promises = applicableHooks.map(hook => 
                hook.execute(data, { eventType, ...options }));
            
            const hookResults = await Promise.allSettled(promises);
            
            hookResults.forEach((settled, index) => {
                if (settled.status === 'fulfilled') {
                    results.push(settled.value);
                } else {
                    results.push(new HookResult(false, false, '', settled.reason));
                    if (this._debug) {
                        console.warn(`Hook ${applicableHooks[index].name} failed:`, settled.reason?.message);
                    }
                }
            });
        }

        const success = results.some(r => r.success);
        
        this.emit('hooksExecuted', {
            eventType,
            success,
            blocked: anyBlocked,
            results,
            data
        });

        return { success, blocked: anyBlocked, results };
    }

    /**
     * Check if a tool matcher pattern matches a tool
     * @param {string} matcher - Matcher pattern (e.g., "Bash(git:*)", "Edit", "*")
     * @param {Object} tool - Tool information
     * @returns {boolean}
     */
    _matchesTool(matcher, tool) {
        if (!tool || !tool.name) {
            return matcher === '*';
        }

        // Simple pattern matching
        if (matcher === '*' || matcher === tool.name) {
            return true;
        }

        // Handle patterns like "Bash(git:*)"
        const parenIndex = matcher.indexOf('(');
        if (parenIndex > 0) {
            const toolName = matcher.substring(0, parenIndex);
            const argsPattern = matcher.substring(parenIndex + 1, matcher.length - 1);
            
            if (tool.name !== toolName) {
                return false;
            }
            
            // Match against tool arguments
            if (argsPattern === '*') {
                return true;
            }
            
            // Check if any argument matches the pattern
            if (tool.args && Array.isArray(tool.args)) {
                return tool.args.some(arg => 
                    this._matchesPattern(String(arg), argsPattern));
            }
        }

        return false;
    }

    /**
     * Check if a string matches a wildcard pattern
     * @param {string} text - Text to match
     * @param {string} pattern - Pattern with * wildcards
     * @returns {boolean}
     */
    _matchesPattern(text, pattern) {
        // Convert glob pattern to regex
        const regexPattern = pattern
            .replace(/[.+^${}()|[\]\\]/g, '\\$&') // Escape special regex chars
            .replace(/\*/g, '.*'); // Replace * with .*
            
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(text);
    }

    /**
     * Remove all hooks for an event type
     * @param {string} eventType - Hook event type
     */
    clearHooks(eventType = null) {
        if (eventType) {
            this._hooks.set(eventType, []);
        } else {
            Object.values(HOOK_EVENTS).forEach(event => {
                this._hooks.set(event, []);
            });
        }
    }

    /**
     * Get hook statistics
     * @returns {Object} Hook statistics
     */
    getStats() {
        const stats = {};
        
        for (const [eventType, hooks] of this._hooks.entries()) {
            stats[eventType] = {
                count: hooks.length,
                hooks: hooks.map(h => ({
                    name: h.name,
                    matcher: h.matcher,
                    command: h.command
                }))
            };
        }
        
        return {
            enabled: this._enabled,
            totalHooks: Array.from(this._hooks.values()).reduce((sum, hooks) => sum + hooks.length, 0),
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
}

// Export singleton instance
export const hooksManager = new HooksManager();