/**
 * Hook Execution Engine
 * 
 * Main orchestration engine for executing hooks with proper filtering,
 * timeout handling, and result aggregation.
 * 
 * Key chunks analyzed:
 * - chunk_0588.js:2-31 (_jB function - hook command matcher)  
 * - chunk_0588.js:73-201 (VF1 function - main hook execution engine)
 * - chunk_0588.js:304-358 (event-specific hook executors)
 * - chunk_0587.js:495-513 (uW8 function - hook configuration aggregator)
 */

import { executeHookCommand, parseHookOutput, processHookResult, matchesHookPattern, DEFAULT_HOOK_TIMEOUT } from './execution.js';
import { getHooksConfig } from './config.js';
import { createAbortController, combineAbortSignals } from '../utils/signals.js';

/**
 * Hook event types supported by Claude Code
 */
export const HOOK_EVENTS = {
    PRE_TOOL_USE: 'PreToolUse',
    POST_TOOL_USE: 'PostToolUse',
    USER_PROMPT_SUBMIT: 'UserPromptSubmit',
    SESSION_START: 'SessionStart',
    STOP: 'Stop',
    SUBAGENT_STOP: 'SubagentStop', 
    PRE_COMPACT: 'PreCompact',
    NOTIFICATION: 'Notification'
};

/**
 * Get matching hook commands for an event
 * 
 * Extracted from chunk_0588.js:2-31 (_jB function):
 * - Retrieves hook configuration from settings
 * - Matches hooks based on event type and query parameter
 * - Filters hooks by matcher patterns
 * - Deduplicates command hooks by command string
 * 
 * @param {string} eventType - Hook event type
 * @param {Object} eventData - Event-specific data for matching
 * @returns {Array} Array of matching hook configurations
 */
export function getMatchingHookCommands(eventType, eventData) {
    try {
        const hookConfig = getHookConfiguration()?.[eventType] ?? [];
        let query = undefined;
        
        // Determine query parameter based on event type
        switch (eventData.hook_event_name) {
            case HOOK_EVENTS.PRE_TOOL_USE:
            case HOOK_EVENTS.POST_TOOL_USE:
                query = eventData.tool_name;
                break;
            case HOOK_EVENTS.SESSION_START:
                query = eventData.source;
                break;
            case HOOK_EVENTS.PRE_COMPACT:
                query = eventData.trigger;
                break;
            default:
                break;
        }
        
        console.log(`Getting matching hook commands for ${eventType} with query: ${query}`);
        console.log(`Found ${hookConfig.length} hook matchers in settings`);
        
        let matchingHooks;
        
        // Filter hooks based on query and matchers
        if (!query) {
            // No query - include all hooks
            matchingHooks = hookConfig.flatMap(config => config.hooks);
        } else {
            // Filter by matcher pattern
            matchingHooks = hookConfig
                .filter(config => !config.matcher || matchesHookPattern(query, config.matcher))
                .flatMap(config => config.hooks);
        }
        
        // Deduplicate command hooks by command string
        const commandHooks = Array.from(
            new Map(
                matchingHooks
                    .filter(hook => hook.type === 'command')
                    .map(hook => [hook.command, hook])
            ).values()
        );
        
        // Include all callback hooks (no deduplication needed)
        const callbackHooks = matchingHooks.filter(hook => hook.type === 'callback');
        
        const allHooks = [...commandHooks, ...callbackHooks];
        
        console.log(`Matched ${allHooks.length} unique hooks for query "${query || 'no match query'}" (${matchingHooks.length} before deduplication)`);
        
        return allHooks;
    } catch (error) {
        console.error('Error getting matching hook commands:', error);
        return [];
    }
}

/**
 * Main hook execution engine generator
 * 
 * Extracted from chunk_0588.js:73-201 (VF1 function):
 * - Executes all matching hooks for an event
 * - Handles timeouts and abort signals
 * - Processes hook outputs and generates messages
 * - Yields progress messages and final results
 * 
 * @param {Object} eventData - Hook event data
 * @param {string} toolUseId - Tool use ID for context
 * @param {string} toolName - Tool name for matching
 * @param {AbortSignal} signal - Abort signal for cancellation
 * @param {number} timeout - Timeout in milliseconds
 * @param {boolean} nonBlocking - Whether hooks are non-blocking
 * @returns {AsyncGenerator} Generator yielding hook execution results
 */
export async function* executeHooks(eventData, toolUseId, toolName = null, signal = null, timeout = DEFAULT_HOOK_TIMEOUT, nonBlocking = false) {
    const eventType = eventData.hook_event_name;
    const eventKey = toolName ? `${eventType}:${toolName}` : eventType;
    
    // Check if hooks are disabled
    const hooksConfig = getHooksConfig();
    if (hooksConfig?.disableAllHooks) {
        console.log(`Skipping hooks for ${eventKey} due to 'disableAllHooks' setting`);
        return;
    }
    
    console.log(`Executing hooks for ${eventKey}`);
    
    // Get matching hooks
    const hooks = getMatchingHookCommands(eventType, eventData).filter(
        hook => hook.type === 'command' || hook.type === 'callback'
    );
    
    console.log(`Found ${hooks.length} hook commands to execute`);
    
    if (hooks.length === 0) {
        return;
    }
    
    // Check for early abort
    if (signal?.aborted) {
        return;
    }
    
    // Prepare hook input data
    let hookInputJson;
    try {
        hookInputJson = JSON.stringify(eventData);
    } catch (error) {
        console.error(new Error(`Failed to stringify hook ${eventKey} input`, { cause: error }));
        yield {
            message: createWarningMessage(`Failed to prepare hook input: ${error instanceof Error ? error.message : String(error)}`, toolUseId)
        };
        return;
    }
    
    // Log hook execution
    logHookExecution(eventKey, hooks.length);
    
    // Generate progress messages for each hook
    for (const hook of hooks) {
        yield {
            message: {
                type: 'progress',
                data: {
                    type: 'running_hook',
                    hookName: eventKey,
                    command: hook.type === 'command' ? hook.command : 'callback'
                },
                parentToolUseID: toolUseId,
                toolUseID: `hook-${generateUUID()}`,
                timestamp: new Date().toISOString(),
                uuid: generateUUID()
            }
        };
    }
    
    // Execute all hooks concurrently
    const hookPromises = hooks.map(async (hook) => {
        if (hook.type === 'callback') {
            // Execute callback hook
            let abortSignal, cleanup;
            
            if (signal) {
                const combined = combineAbortSignals(signal, AbortSignal.timeout(timeout));
                abortSignal = combined.signal;
                cleanup = combined.cleanup;
            } else {
                abortSignal = AbortSignal.timeout(timeout);
            }
            
            return executeCallbackHook(toolUseId, hook, eventData, abortSignal).finally(cleanup);
        }
        
        // Execute command hook
        const hookTimeout = hook.timeout ? hook.timeout * 1000 : timeout;
        let abortSignal, cleanup;
        
        if (signal) {
            const combined = combineAbortSignals(signal, AbortSignal.timeout(hookTimeout));
            abortSignal = combined.signal;
            cleanup = combined.cleanup;
        } else {
            abortSignal = AbortSignal.timeout(hookTimeout);
        }
        
        try {
            console.log(`Executing hook command: ${hook.command} with timeout ${hookTimeout}ms`);
            
            // Execute the hook command
            const executionResult = await executeHookCommand(hook.command, hookInputJson, abortSignal);
            
            cleanup?.();
            
            console.log(`Hook command completed with status ${executionResult.status}: ${hook.command}`);
            
            if (executionResult.stdout) {
                console.log(`Hook stdout: ${executionResult.stdout.substring(0, 200)}...`);
            }
            if (executionResult.stderr) {
                console.log(`Hook stderr: ${executionResult.stderr}`);
            }
            
            // Handle cancellation
            if (executionResult.aborted) {
                return {
                    message: createInfoMessage(`**${eventKey}** [${hook.command}] **cancelled**`, toolUseId),
                    outcome: 'cancelled'
                };
            }
            
            // Parse hook output
            const { json: hookJson, plainText, validationError } = parseHookOutput(executionResult.stdout);
            
            // Handle validation errors
            if (validationError) {
                return {
                    message: createWarningMessage(`**${eventKey}** [${hook.command}] **JSON validation failed**:\n${validationError}`, toolUseId),
                    outcome: 'non_blocking_error'
                };
            }
            
            // Process JSON output
            if (hookJson) {
                console.log(`Parsed JSON output from hook: ${JSON.stringify(hookJson)}`);
                
                const processedResult = processHookResult(hookJson, hook.command, eventType);
                console.log(`Processed hook result: ${JSON.stringify(processedResult)}`);
                
                // Show output if not suppressed and command succeeded
                if (!hookJson.suppressOutput && plainText && executionResult.status === 0) {
                    return {
                        message: createSuccessMessage(`**${eventKey}** [${hook.command}] **completed**:\n${plainText}`, toolUseId),
                        outcome: 'success',
                        result: processedResult
                    };
                }
                
                return {
                    outcome: 'success',
                    result: processedResult
                };
            } else if (plainText && executionResult.status === 0) {
                // Handle plain text output
                return {
                    message: createSuccessMessage(`**${eventKey}** [${hook.command}] **completed**:\n${plainText}`, toolUseId),
                    outcome: 'success'
                };
            } else {
                // Handle non-zero exit status
                const errorText = executionResult.stderr || plainText || 'No output';
                return {
                    message: createWarningMessage(`**${eventKey}** [${hook.command}] **failed** (exit ${executionResult.status}):\n${errorText}`, toolUseId),
                    outcome: 'non_blocking_error'
                };
            }
            
        } catch (error) {
            cleanup?.();
            console.error(`Hook command execution failed: ${hook.command}`, error);
            
            return {
                message: createErrorMessage(`**${eventKey}** [${hook.command}] **error**: ${error.message}`, toolUseId),
                outcome: 'blocking_error'
            };
        }
    });
    
    // Await all hook executions
    const hookResults = await Promise.all(hookPromises);
    
    // Yield individual hook results
    for (const result of hookResults) {
        if (result.message) {
            yield { message: result.message };
        }
        if (result.result) {
            yield { result: result.result };
        }
    }
}

/**
 * Execute PreToolUse hooks
 * 
 * Extracted from chunk_0588.js:304-312 (djB function)
 * 
 * @param {Object} eventData - PreToolUse event data
 * @param {string} toolName - Tool name
 * @param {string} toolUseId - Tool use ID
 * @returns {AsyncGenerator} Hook execution results
 */
export async function* executePreToolUseHooks(eventData, toolName, toolUseId) {
    yield* executeHooks(eventData, toolUseId, toolName);
}

/**
 * Execute PostToolUse hooks
 * 
 * Extracted from chunk_0588.js:313-350 (ujB function)
 * 
 * @param {Object} eventData - PostToolUse event data  
 * @param {string} toolUseId - Tool use ID
 * @param {string} toolName - Tool name
 * @param {Object} toolResult - Tool execution result
 * @param {number} duration - Tool execution duration
 * @param {AbortSignal} signal - Abort signal
 * @returns {AsyncGenerator} Hook execution results
 */
export async function* executePostToolUseHooks(eventData, toolUseId, toolName, toolResult, duration, signal) {
    yield* executeHooks(eventData, toolUseId, toolName, signal, DEFAULT_HOOK_TIMEOUT, true);
}

/**
 * Execute UserPromptSubmit hooks
 * 
 * Extracted from chunk_0588.js:351-358 (cjB function)
 * 
 * @param {Object} eventData - UserPromptSubmit event data
 * @param {string} toolUseId - Tool use ID  
 * @param {string} prompt - User prompt
 * @returns {AsyncGenerator} Hook execution results
 */
export async function* executeUserPromptSubmitHooks(eventData, toolUseId, prompt) {
    yield* executeHooks(eventData, toolUseId);
}

/**
 * Get hook configuration from settings
 * 
 * Extracted from chunk_0587.js:495-513 (uW8 function):
 * - Combines settings-based hooks and runtime hooks
 * - Merges hook configurations by event type
 * - Returns structured hook configuration object
 * 
 * @returns {Object} Hook configuration by event type
 */
function getHookConfiguration() {
    const allHooks = {};
    
    // Get hooks from settings
    const settingsHooks = getSettingsHooks();
    if (settingsHooks) {
        for (const [eventType, configs] of Object.entries(settingsHooks)) {
            allHooks[eventType] = configs.map(config => ({
                matcher: config.matcher,
                hooks: config.hooks
            }));
        }
    }
    
    // Get runtime hooks  
    const runtimeHooks = getRuntimeHooks();
    if (runtimeHooks) {
        for (const [eventType, configs] of Object.entries(runtimeHooks)) {
            if (!allHooks[eventType]) {
                allHooks[eventType] = [];
            }
            
            for (const config of configs) {
                allHooks[eventType].push({
                    matcher: config.matcher,
                    hooks: config.hooks
                });
            }
        }
    }
    
    return allHooks;
}

/**
 * Execute callback hook (placeholder implementation)
 * 
 * @param {string} toolUseId - Tool use ID
 * @param {Object} hook - Hook configuration
 * @param {Object} eventData - Event data
 * @param {AbortSignal} signal - Abort signal
 * @returns {Promise<Object>} Hook execution result
 */
async function executeCallbackHook(toolUseId, hook, eventData, signal) {
    // Placeholder implementation for callback hooks
    // In the real implementation, this would execute JavaScript callbacks
    return {
        message: createInfoMessage(`Callback hook executed: ${hook.name || 'unnamed'}`, toolUseId),
        outcome: 'success'
    };
}

/**
 * Get hooks from settings (placeholder)
 * 
 * @returns {Object|null} Settings-based hooks configuration
 */
function getSettingsHooks() {
    // Placeholder - would get hooks from settings system
    return null;
}

/**
 * Get runtime hooks (placeholder)
 * 
 * @returns {Object|null} Runtime hooks configuration  
 */
function getRuntimeHooks() {
    // Placeholder - would get runtime-registered hooks
    return null;
}

/**
 * Log hook execution for telemetry
 * 
 * @param {string} hookName - Hook name
 * @param {number} numCommands - Number of commands
 */
function logHookExecution(hookName, numCommands) {
    // Placeholder for telemetry logging
    console.log(`Executing hook: ${hookName} with ${numCommands} commands`);
}

/**
 * Generate UUID for hook execution
 * 
 * @returns {string} UUID string
 */
function generateUUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Create info message object
 * 
 * @param {string} content - Message content
 * @param {string} toolUseId - Tool use ID
 * @returns {Object} Info message
 */
function createInfoMessage(content, toolUseId) {
    return {
        type: 'info',
        content,
        toolUseId,
        timestamp: new Date().toISOString()
    };
}

/**
 * Create warning message object
 * 
 * @param {string} content - Message content  
 * @param {string} toolUseId - Tool use ID
 * @returns {Object} Warning message
 */
function createWarningMessage(content, toolUseId) {
    return {
        type: 'warning',
        content,
        toolUseId,
        timestamp: new Date().toISOString()
    };
}

/**
 * Create success message object
 * 
 * @param {string} content - Message content
 * @param {string} toolUseId - Tool use ID  
 * @returns {Object} Success message
 */
function createSuccessMessage(content, toolUseId) {
    return {
        type: 'success', 
        content,
        toolUseId,
        timestamp: new Date().toISOString()
    };
}

/**
 * Create error message object
 * 
 * @param {string} content - Message content
 * @param {string} toolUseId - Tool use ID
 * @returns {Object} Error message  
 */
function createErrorMessage(content, toolUseId) {
    return {
        type: 'error',
        content,
        toolUseId,
        timestamp: new Date().toISOString()
    };
}