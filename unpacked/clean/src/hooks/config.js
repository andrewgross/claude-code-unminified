/**
 * Hook Configuration System
 * 
 * Handles loading and parsing of hook configurations from settings.
 * Based on the implementation from chunk_0587.js (UL0, kjB, wL0 functions)
 */

import { configManager } from '../config/manager.js';

// Global cache for hook configurations
let hookConfigCache = null;
let projectHookConfig = null;

/**
 * Normalize and sort hook configuration for consistent processing
 * 
 * Extracted from chunk_0587.js:115-145 (UL0 function):
 * - Sorts event types alphabetically for consistent processing
 * - Sorts matchers by pattern string within each event type  
 * - Sorts hook commands by command string for deterministic ordering
 * - Returns null if no hook configuration provided
 * - Ensures consistent hook execution order across sessions
 * 
 * @param {Object} hooksConfig - Raw hooks configuration from settings
 * @returns {Object|null} Normalized hooks configuration
 */
function normalizeHookConfiguration(hooksConfig) {
    if (!hooksConfig) {
        return null;
    }

    const normalized = {};
    const sortedEventTypes = Object.keys(hooksConfig).sort();

    for (const eventType of sortedEventTypes) {
        const matchers = hooksConfig[eventType];
        if (!matchers) {
            continue;
        }

        // Sort matchers by matcher pattern for consistency
        const sortedMatchers = [...matchers].sort((a, b) => {
            const matcherA = a.matcher || "";
            const matcherB = b.matcher || "";
            return matcherA.localeCompare(matcherB);
        });

        normalized[eventType] = sortedMatchers.map(matcher => ({
            matcher: matcher.matcher,
            hooks: [...matcher.hooks].sort((a, b) => a.command.localeCompare(b.command))
        }));
    }

    return normalized;
}

/**
 * Load hook configuration from settings
 * 
 * Extracted from chunk_0587.js:185-195 (wL0 function):
 * - Retrieves settings using getSettings() call
 * - Normalizes hook configuration via UL0 function  
 * - Caches result in global hookConfigCache variable
 * - Called lazily when hook configuration is first needed
 */
function loadHookConfiguration() {
    const settings = getSettings();
    hookConfigCache = normalizeHookConfiguration(settings?.hooks);
}

/**
 * Get the current hook configuration, loading if necessary
 * 
 * Extracted from chunk_0587.js:165-175 (kjB function):
 * - Uses lazy loading pattern with null cache check
 * - Calls loadHookConfiguration() if cache is empty
 * - Returns cached hook configuration 
 * - Part of the hook configuration caching strategy
 * 
 * @returns {Object|null} Current hook configuration
 */
export function getHookConfiguration() {
    if (hookConfigCache === null) {
        loadHookConfiguration();
    }
    return hookConfigCache;
}

/**
 * Get merged hook configuration from all sources
 * 
 * Extracted from chunk_0587.js:235-285 (uW8 function):
 * - Merges global/user hooks with project-specific hooks
 * - Maintains separate arrays for each event type
 * - Preserves all matchers from both sources (no override)
 * - Allows project hooks to supplement global hooks
 * - Returns combined configuration object
 * 
 * @returns {Object} Merged hook configuration from global and project settings
 */
export function getAllHookMatchers() {
    const merged = {};
    
    // Load global/user hooks
    const globalConfig = getHookConfiguration();
    if (globalConfig) {
        for (const [eventType, matchers] of Object.entries(globalConfig)) {
            merged[eventType] = matchers.map(matcher => ({
                matcher: matcher.matcher,
                hooks: matcher.hooks
            }));
        }
    }
    
    // Load project-specific hooks
    const projectConfig = getProjectHookConfiguration();
    if (projectConfig) {
        for (const [eventType, matchers] of Object.entries(projectConfig)) {
            if (!merged[eventType]) {
                merged[eventType] = [];
            }
            
            for (const matcher of matchers) {
                merged[eventType].push({
                    matcher: matcher.matcher,
                    hooks: matcher.hooks
                });
            }
        }
    }
    
    return merged;
}

/**
 * Get project-specific hook configuration
 * 
 * Extracted from chunk_0587.js:205-215 (SjB function):
 * - Returns cached project hook configuration
 * - Currently returns null (project hooks not implemented)
 * - Placeholder for future project-level hook support
 * - Would read from .claude/hooks.json or similar
 * 
 * @returns {Object|null} Project hook configuration
 */
export function getProjectHookConfiguration() {
    return projectHookConfig;
}

/**
 * Set project-specific hook configuration
 * 
 * @param {Object} config - Project hook configuration
 */
export function setProjectHookConfiguration(config) {
    projectHookConfig = normalizeHookConfiguration(config);
}

/**
 * Check if hook configuration has changed since last load
 * Based on jjB function from chunk_0587.js
 * 
 * @returns {string|null} Change description or null if no changes
 */
export function getHookConfigurationChanges() {
    if (hookConfigCache === null) {
        return null;
    }

    const settings = getSettings();
    const newConfig = normalizeHookConfiguration(settings?.hooks);
    
    const oldJson = JSON.stringify(hookConfigCache);
    const newJson = JSON.stringify(newConfig);
    
    if (oldJson === newJson) {
        return null;
    }

    const changes = [];
    const oldEventTypes = new Set(Object.keys(hookConfigCache || {}));
    const newEventTypes = new Set(Object.keys(newConfig || {}));
    
    // Check for added event types
    for (const eventType of newEventTypes) {
        if (!oldEventTypes.has(eventType)) {
            changes.push(`Added hooks for event: ${eventType}`);
        }
    }
    
    // Check for removed event types
    for (const eventType of oldEventTypes) {
        if (!newEventTypes.has(eventType)) {
            changes.push(`Removed hooks for event: ${eventType}`);
        }
    }
    
    // Check for modified event types
    for (const eventType of newEventTypes) {
        if (oldEventTypes.has(eventType)) {
            const oldMatchers = hookConfigCache[eventType] || [];
            const newMatchers = newConfig[eventType] || [];
            
            if (JSON.stringify(oldMatchers) !== JSON.stringify(newMatchers)) {
                changes.push(`Modified hooks for event: ${eventType}`);
            }
        }
    }
    
    return changes.length > 0 
        ? changes.join('\n') 
        : "Hooks configuration has been modified";
}

/**
 * Refresh hook configuration from settings
 * Based on JF1 function from chunk_0587.js
 */
export function refreshHookConfiguration() {
    const settings = getSettings();
    hookConfigCache = normalizeHookConfiguration(settings?.hooks);
}

/**
 * Get settings object - this should integrate with the actual settings system
 * This is a placeholder for the GB() function from the original
 * 
 * @returns {Object} Current settings
 */
function getSettings() {
    try {
        return configManager.list();
    } catch (error) {
        console.warn('Failed to load settings for hook configuration:', error);
        return {};
    }
}

/**
 * Validate hook configuration structure
 * 
 * @param {Object} config - Hook configuration to validate
 * @returns {Array} Array of validation errors
 */
export function validateHookConfiguration(config) {
    const errors = [];
    
    if (!config || typeof config !== 'object') {
        errors.push('Hook configuration must be an object');
        return errors;
    }
    
    const validEventTypes = [
        'PreToolUse', 'PostToolUse', 'UserPromptSubmit', 
        'Notification', 'Stop', 'SubagentStop', 
        'PreCompact', 'SessionStart'
    ];
    
    for (const [eventType, matchers] of Object.entries(config)) {
        if (!validEventTypes.includes(eventType)) {
            errors.push(`Invalid event type: ${eventType}`);
            continue;
        }
        
        if (!Array.isArray(matchers)) {
            errors.push(`Matchers for ${eventType} must be an array`);
            continue;
        }
        
        for (let i = 0; i < matchers.length; i++) {
            const matcher = matchers[i];
            const matcherPath = `${eventType}[${i}]`;
            
            if (!matcher || typeof matcher !== 'object') {
                errors.push(`${matcherPath}: matcher must be an object`);
                continue;
            }
            
            if (matcher.matcher && typeof matcher.matcher !== 'string') {
                errors.push(`${matcherPath}.matcher: must be a string`);
            }
            
            if (!Array.isArray(matcher.hooks)) {
                errors.push(`${matcherPath}.hooks: must be an array`);
                continue;
            }
            
            for (let j = 0; j < matcher.hooks.length; j++) {
                const hook = matcher.hooks[j];
                const hookPath = `${matcherPath}.hooks[${j}]`;
                
                if (!hook || typeof hook !== 'object') {
                    errors.push(`${hookPath}: hook must be an object`);
                    continue;
                }
                
                if (!hook.type || (hook.type !== 'command' && hook.type !== 'callback')) {
                    errors.push(`${hookPath}.type: must be 'command' or 'callback'`);
                }
                
                if (hook.type === 'command' && !hook.command) {
                    errors.push(`${hookPath}.command: required for command type hooks`);
                }
                
                if (hook.timeout && typeof hook.timeout !== 'number') {
                    errors.push(`${hookPath}.timeout: must be a number`);
                }
            }
        }
    }
    
    return errors;
}

/**
 * Clear hook configuration cache
 */
export function clearHookConfigurationCache() {
    hookConfigCache = null;
    projectHookConfig = null;
}