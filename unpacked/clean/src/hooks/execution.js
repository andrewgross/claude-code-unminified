/**
 * Hook Execution Engine
 * 
 * Core execution engine for Claude Code hooks with command execution,
 * output parsing, and result processing capabilities.
 * 
 * Key chunks analyzed:
 * - chunk_0587.js:418-480 (qL0 function - shell command execution)
 * - chunk_0587.js:319-347 (hW8 function - hook output parser)
 * - chunk_0587.js:349-417 (yjB function - hook result processor)
 * - chunk_0587.js:482-493 (gW8 function - pattern matcher)
 * - chunk_0588.js:73-201 (VF1 function - main hook execution engine)
 */

import { spawn } from 'child_process';
import { getEnvironmentVariable } from '../config/environment.js';
import { getCurrentWorkingDirectory } from '../utils/path.js';
import { createAbortController } from '../utils/signals.js';

/**
 * Hook execution timeout in milliseconds (default: 30 seconds)
 */
export const DEFAULT_HOOK_TIMEOUT = 30000;

/**
 * Hook execution result types
 */
export const HOOK_RESULT_TYPES = {
    SUCCESS: 'success',
    CANCELLED: 'cancelled', 
    NON_BLOCKING_ERROR: 'non_blocking_error',
    BLOCKING_ERROR: 'blocking_error',
    TIMEOUT: 'timeout'
};

/**
 * Hook permission behaviors
 */
export const HOOK_PERMISSION_BEHAVIORS = {
    ALLOW: 'allow',
    DENY: 'deny',
    ASK: 'ask'
};

/**
 * Execute hook shell command with input and signal handling
 * 
 * Extracted from chunk_0587.js:418-480 (qL0 function):
 * - Executes shell commands with CLAUDE_CODE_SHELL_PREFIX support
 * - Handles stdin input for hook data
 * - Manages abort signals and timeouts
 * - Returns stdout, stderr, status, and abort flag
 * 
 * @param {string} command - Shell command to execute
 * @param {string} input - Stdin input for the command
 * @param {AbortSignal} signal - Abort signal for cancellation
 * @returns {Promise<Object>} Execution result with stdout, stderr, status
 */
export async function executeHookCommand(command, input, signal) {
    // Check if operation was already aborted
    if (signal?.aborted) {
        return {
            stdout: '',
            stderr: 'Operation cancelled',
            status: 1,
            aborted: true
        };
    }
    
    // Get current working directory for execution context
    const workingDirectory = getCurrentWorkingDirectory();
    
    // Apply shell prefix if configured
    const shellPrefix = getEnvironmentVariable('CLAUDE_CODE_SHELL_PREFIX');
    const finalCommand = shellPrefix ? applyShellPrefix(shellPrefix, command) : command;
    
    // Spawn the shell process
    const childProcess = spawn(finalCommand, [], {
        env: {
            ...process.env,
            CLAUDE_PROJECT_DIR: workingDirectory
        },
        cwd: workingDirectory,
        shell: true,
        stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    // Collect stdout data
    childProcess.stdout.on('data', (data) => {
        stdout += data.toString();
    });
    
    // Collect stderr data
    childProcess.stderr.on('data', (data) => {
        stderr += data.toString();
    });
    
    // Handle abort signal
    if (signal) {
        signal.addEventListener('abort', () => {
            childProcess.kill('SIGTERM');
        });
    }
    
    // Write input to stdin
    const stdinPromise = new Promise((resolve, reject) => {
        childProcess.stdin.on('error', reject);
        childProcess.stdin.write(input);
        childProcess.stdin.end();
        resolve();
    });
    
    // Handle process errors
    const errorPromise = new Promise((resolve, reject) => {
        childProcess.on('error', reject);
    });
    
    // Handle process completion
    const completionPromise = new Promise((resolve) => {
        childProcess.on('close', (code) => {
            resolve({
                stdout,
                stderr,
                status: code ?? 1,
                aborted: signal?.aborted || false
            });
        });
    });
    
    try {
        // Wait for stdin write to complete
        await Promise.race([stdinPromise, errorPromise]);
        
        // Wait for process to complete
        return await Promise.race([completionPromise, errorPromise]);
    } catch (error) {
        // Handle specific error cases
        if (error.code === 'EPIPE') {
            console.warn('EPIPE error while writing to hook stdin (hook command likely closed early)');
            return {
                stdout: '',
                stderr: 'Hook command closed stdin before hook input was fully written (EPIPE)',
                status: 1
            };
        } else if (error.code === 'ABORT_ERR') {
            return {
                stdout: '',
                stderr: 'Hook cancelled',
                status: 1,
                aborted: true
            };
        } else {
            return {
                stdout: '',
                stderr: `Error occurred while executing hook command: ${error instanceof Error ? error.message : String(error)}`,
                status: 1
            };
        }
    }
}

/**
 * Parse hook command output into structured data
 * 
 * Extracted from chunk_0587.js:319-347 (hW8 function):
 * - Attempts to parse output as JSON first
 * - Validates against hook output schema
 * - Falls back to plain text if JSON parsing fails
 * - Returns validation errors for debugging
 * 
 * @param {string} output - Raw hook command output
 * @returns {Object} Parsed output with json, plainText, or validationError
 */
export function parseHookOutput(output) {
    const trimmedOutput = output.trim();
    
    // Check if output looks like JSON
    if (!trimmedOutput.startsWith('{')) {
        console.log('Hook output does not start with {, treating as plain text');
        return {
            plainText: output
        };
    }
    
    try {
        const jsonData = JSON.parse(trimmedOutput);
        
        // Validate against hook output schema
        const validationResult = validateHookOutputSchema(jsonData);
        if (validationResult.success) {
            console.log('Successfully parsed and validated hook JSON output');
            return {
                json: validationResult.data
            };
        } else {
            const validationError = formatValidationError(validationResult.error);
            console.log(validationError);
            return {
                plainText: output,
                validationError
            };
        }
    } catch (error) {
        console.log(`Failed to parse hook output as JSON: ${error}`);
        return {
            plainText: output
        };
    }
}

/**
 * Process hook JSON result into execution outcome
 * 
 * Extracted from chunk_0587.js:349-417 (yjB function):
 * - Converts hook JSON output into permission decisions
 * - Handles continue/stop behaviors
 * - Processes approval/blocking decisions  
 * - Extracts event-specific hook outputs
 * 
 * @param {Object} hookJson - Validated hook JSON output
 * @param {string} command - Hook command that was executed
 * @param {string} eventType - Hook event type (PreToolUse, etc.)
 * @returns {Object} Processed hook result with permissions and behaviors
 */
export function processHookResult(hookJson, command, eventType) {
    const result = {};
    
    // Handle continuation behavior
    if (hookJson.continue === false) {
        result.preventContinuation = true;
        if (hookJson.stopReason) {
            result.stopReason = hookJson.stopReason;
        }
    }
    
    // Handle decision-based permission behavior
    if (hookJson.decision) {
        switch (hookJson.decision) {
            case 'approve':
                result.permissionBehavior = HOOK_PERMISSION_BEHAVIORS.ALLOW;
                break;
            case 'block':
                result.permissionBehavior = HOOK_PERMISSION_BEHAVIORS.DENY;
                result.blockingError = {
                    blockingError: hookJson.reason || 'Blocked by hook',
                    command
                };
                break;
            default:
                throw new Error(`Unknown hook decision type: ${hookJson.decision}. Valid types are: approve, block`);
        }
    }
    
    // Add system message if provided
    if (hookJson.systemMessage) {
        result.systemMessage = createSystemMessage(hookJson.systemMessage, 'warning');
    }
    
    // Handle explicit permission decision
    if (hookJson.permissionDecision) {
        switch (hookJson.permissionDecision) {
            case 'allow':
                result.permissionBehavior = HOOK_PERMISSION_BEHAVIORS.ALLOW;
                break;
            case 'deny':
                result.permissionBehavior = HOOK_PERMISSION_BEHAVIORS.DENY;
                result.blockingError = {
                    blockingError: hookJson.reason || 'Blocked by hook',
                    command
                };
                break;
            case 'ask':
                result.permissionBehavior = HOOK_PERMISSION_BEHAVIORS.ASK;
                break;
            default:
                throw new Error(`Unknown hook permissionDecision type: ${hookJson.permissionDecision}. Valid types are: allow, deny, ask`);
        }
    }
    
    // Store permission decision reason
    if (result.permissionBehavior !== undefined && hookJson.reason !== undefined) {
        result.hookPermissionDecisionReason = hookJson.reason;
    }
    
    // Process hook-specific output
    if (hookJson.hookSpecificOutput) {
        // Validate event name matches
        if (eventType && hookJson.hookSpecificOutput.hookEventName !== eventType) {
            throw new Error(`Hook returned incorrect event name: expected '${eventType}' but got '${hookJson.hookSpecificOutput.hookEventName}'`);
        }
        
        switch (hookJson.hookSpecificOutput.hookEventName) {
            case 'PreToolUse':
                if (hookJson.hookSpecificOutput.permissionDecision) {
                    switch (hookJson.hookSpecificOutput.permissionDecision) {
                        case 'allow':
                            result.permissionBehavior = HOOK_PERMISSION_BEHAVIORS.ALLOW;
                            break;
                        case 'deny':
                            result.permissionBehavior = HOOK_PERMISSION_BEHAVIORS.DENY;
                            result.blockingError = {
                                blockingError: hookJson.hookSpecificOutput.permissionDecisionReason || 
                                              hookJson.reason || 'Blocked by hook',
                                command
                            };
                            break;
                        case 'ask':
                            result.permissionBehavior = HOOK_PERMISSION_BEHAVIORS.ASK;
                            break;
                    }
                }
                result.hookPermissionDecisionReason = hookJson.hookSpecificOutput.permissionDecisionReason;
                break;
                
            case 'UserPromptSubmit':
                result.additionalContext = hookJson.hookSpecificOutput.additionalContext;
                break;
                
            case 'SessionStart':
                result.additionalContext = hookJson.hookSpecificOutput.additionalContext;
                break;
                
            case 'PostToolUse':
                result.additionalContext = hookJson.hookSpecificOutput.additionalContext;
                break;
        }
    }
    
    return result;
}

/**
 * Check if tool name matches hook pattern
 * 
 * Extracted from chunk_0587.js:482-493 (gW8 function):
 * - Supports wildcard matching with "*"
 * - Handles pipe-separated tool lists
 * - Uses regex patterns for complex matching
 * - Returns false for invalid regex patterns
 * 
 * @param {string} toolName - Tool name to match
 * @param {string} pattern - Hook pattern to match against
 * @returns {boolean} True if tool name matches pattern
 */
export function matchesHookPattern(toolName, pattern) {
    // Wildcard or empty pattern matches all
    if (!pattern || pattern === '*') {
        return true;
    }
    
    // Handle simple pipe-separated lists
    if (/^[a-zA-Z0-9_|]+$/.test(pattern)) {
        if (pattern.includes('|')) {
            return pattern.split('|').map(p => p.trim()).includes(toolName);
        }
        return toolName === pattern;
    }
    
    // Handle regex patterns
    try {
        return new RegExp(pattern).test(toolName);
    } catch (error) {
        console.log(`Invalid regex pattern in hook matcher: ${pattern}`);
        return false;
    }
}

/**
 * Apply shell prefix to command
 * 
 * @param {string} prefix - Shell prefix to apply
 * @param {string} command - Original command
 * @returns {string} Command with prefix applied
 */
function applyShellPrefix(prefix, command) {
    // Simple implementation - could be more sophisticated
    return `${prefix} ${command}`;
}

/**
 * Validate hook output against schema
 * 
 * @param {Object} data - JSON data to validate
 * @returns {Object} Validation result with success flag and data/error
 */
function validateHookOutputSchema(data) {
    // Simplified validation - in real implementation would use Zod or similar
    const requiredFields = ['continue', 'suppressOutput', 'decision', 'permissionDecision'];
    const validDecisions = ['approve', 'block'];
    const validPermissionDecisions = ['allow', 'deny', 'ask'];
    
    // Basic structure validation
    if (typeof data !== 'object' || data === null) {
        return {
            success: false,
            error: { message: 'Hook output must be an object' }
        };
    }
    
    // Validate decision values if present
    if (data.decision && !validDecisions.includes(data.decision)) {
        return {
            success: false,
            error: { message: `Invalid decision value: ${data.decision}` }
        };
    }
    
    if (data.permissionDecision && !validPermissionDecisions.includes(data.permissionDecision)) {
        return {
            success: false,
            error: { message: `Invalid permissionDecision value: ${data.permissionDecision}` }
        };
    }
    
    return {
        success: true,
        data
    };
}

/**
 * Format validation error for display
 * 
 * @param {Object} error - Validation error object
 * @returns {string} Formatted error message
 */
function formatValidationError(error) {
    return `Hook JSON output validation failed: ${error.message}

Expected schema:
{
  "continue": "boolean (optional)",
  "suppressOutput": "boolean (optional)", 
  "stopReason": "string (optional)",
  "decision": "approve | block (optional)",
  "reason": "string (optional)",
  "systemMessage": "string (optional)",
  "permissionDecision": "allow | deny | ask (optional)",
  "hookSpecificOutput": {
    "for PreToolUse": {
      "hookEventName": "PreToolUse",
      "permissionDecision": "allow | deny | ask (optional)",
      "permissionDecisionReason": "string (optional)"
    },
    "for UserPromptSubmit": {
      "hookEventName": "UserPromptSubmit", 
      "additionalContext": "string (required)"
    }
  }
}`;
}

/**
 * Create system message object
 * 
 * @param {string} content - Message content
 * @param {string} type - Message type (info, warning, error)
 * @returns {Object} System message object
 */
function createSystemMessage(content, type = 'info') {
    return {
        type: 'system',
        content,
        level: type,
        timestamp: new Date().toISOString()
    };
}