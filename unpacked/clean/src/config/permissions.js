/**
 * Permission System for Claude Code
 * 
 * Handles file access control, permission rules, and security policies.
 * Extracted from chunk_0521.js containing permission checking logic.
 * 
 * Key chunks analyzed:
 * - chunk_0521.js:21-78 (ty function - read permission checker)
 * - chunk_0521.js:80-120 (vg function - write/edit permission checker) 
 * - chunk_0521.js:xs function (core permission rule evaluator)
 */

import { getCurrentWorkingDirectory } from './environment.js';
import { resolvePath, isWithinPath } from '../utils/path.js';

/**
 * Permission behaviors for file access
 */
export const PERMISSION_BEHAVIORS = {
    ALLOW: 'allow',
    DENY: 'deny', 
    ASK: 'ask'
};

/**
 * Permission operation types
 */
export const PERMISSION_OPERATIONS = {
    READ: 'read',
    EDIT: 'edit',
    EXECUTE: 'execute'
};

/**
 * Decision reason types for permission results
 */
export const DECISION_REASON_TYPES = {
    RULE: 'rule',
    MODE: 'mode', 
    OTHER: 'other'
};

/**
 * Check read permissions for a tool with file path
 * 
 * Extracted from chunk_0521.js:21-78 (ty function):
 * - Validates tool has getPath method
 * - Checks permission rules for read access
 * - Handles special cases like bash output files
 * - Falls back to asking permission if no rules match
 * 
 * @param {Object} tool - Tool object with name and getPath method
 * @param {Object} toolInput - Tool input parameters
 * @param {Object} permissionContext - Context with mode and rules
 * @returns {Object} Permission result with behavior and reason
 */
export function checkReadPermissions(tool, toolInput, permissionContext) {
    // Validate tool has required getPath method
    if (typeof tool.getPath !== 'function') {
        return {
            behavior: PERMISSION_BEHAVIORS.ASK,
            message: `Claude requested permissions to use ${tool.name}, but you haven't granted it yet.`
        };
    }
    
    const filePath = tool.getPath(toolInput);
    
    // First check if write permissions cover this (write implies read)
    const writeCheck = checkWritePermissions(tool, toolInput, permissionContext);
    if (writeCheck.behavior === PERMISSION_BEHAVIORS.ALLOW) {
        return writeCheck;
    }
    
    // Check explicit deny rules for read operation
    const denyRule = evaluatePermissionRule(filePath, permissionContext, PERMISSION_OPERATIONS.READ, 'deny');
    if (denyRule) {
        return {
            behavior: PERMISSION_BEHAVIORS.DENY,
            message: `Permission to read ${filePath} has been denied.`,
            decisionReason: {
                type: DECISION_REASON_TYPES.RULE,
                rule: denyRule
            }
        };
    }
    
    // Check ask rules for read operation
    const askRule = evaluatePermissionRule(filePath, permissionContext, PERMISSION_OPERATIONS.READ, 'ask');
    if (askRule) {
        return {
            behavior: PERMISSION_BEHAVIORS.ASK,
            message: `Claude requested permissions to read from ${filePath}, but you haven't granted it yet.`,
            decisionReason: {
                type: DECISION_REASON_TYPES.RULE,
                rule: askRule
            }
        };
    }
    
    // Allow access within current working directory for default mode
    if (isWithinCurrentWorkingDirectory(filePath, permissionContext)) {
        return {
            behavior: PERMISSION_BEHAVIORS.ALLOW,
            updatedInput: toolInput,
            decisionReason: {
                type: DECISION_REASON_TYPES.MODE,
                mode: 'default'
            }
        };
    }
    
    // Check if this is a bash output file (special case)
    const resolvedPath = resolvePath(filePath);
    const bashOutputsPath = getBashOutputsPath();
    if (resolvedPath.startsWith(bashOutputsPath)) {
        return {
            behavior: PERMISSION_BEHAVIORS.ALLOW,
            updatedInput: toolInput,
            decisionReason: {
                type: DECISION_REASON_TYPES.OTHER,
                reason: 'Bash output files from current session are allowed for reading'
            }
        };
    }
    
    // Check explicit allow rules for read operation
    const allowRule = evaluatePermissionRule(filePath, permissionContext, PERMISSION_OPERATIONS.READ, 'allow');
    if (allowRule) {
        return {
            behavior: PERMISSION_BEHAVIORS.ALLOW,
            updatedInput: toolInput,
            decisionReason: {
                type: DECISION_REASON_TYPES.RULE,
                rule: allowRule
            }
        };
    }
    
    // Default: ask for permission
    return {
        behavior: PERMISSION_BEHAVIORS.ASK,
        message: `Claude requested permissions to read from ${filePath}, but you haven't granted it yet.`
    };
}

/**
 * Check write/edit permissions for a tool with file path
 * 
 * Extracted from chunk_0521.js:80-120 (vg function):
 * - Validates tool has getPath method
 * - Checks deny/ask/allow rules for edit operations
 * - Handles special cases for settings files
 * - Supports acceptEdits mode for within-directory writes
 * 
 * @param {Object} tool - Tool object with name and getPath method
 * @param {Object} toolInput - Tool input parameters 
 * @param {Object} permissionContext - Context with mode and rules
 * @returns {Object} Permission result with behavior and reason
 */
export function checkWritePermissions(tool, toolInput, permissionContext) {
    // Validate tool has required getPath method
    if (typeof tool.getPath !== 'function') {
        return {
            behavior: PERMISSION_BEHAVIORS.ASK,
            message: `Claude requested permissions to use ${tool.name}, but you haven't granted it yet.`
        };
    }
    
    const filePath = tool.getPath(toolInput);
    
    // Check explicit deny rules for edit operation
    const denyRule = evaluatePermissionRule(filePath, permissionContext, PERMISSION_OPERATIONS.EDIT, 'deny');
    if (denyRule) {
        return {
            behavior: PERMISSION_BEHAVIORS.DENY,
            message: `Permission to edit ${filePath} has been denied.`,
            decisionReason: {
                type: DECISION_REASON_TYPES.RULE,
                rule: denyRule
            }
        };
    }
    
    // Check ask rules for edit operation
    const askRule = evaluatePermissionRule(filePath, permissionContext, PERMISSION_OPERATIONS.EDIT, 'ask');
    if (askRule) {
        return {
            behavior: PERMISSION_BEHAVIORS.ASK,
            message: `Claude requested permissions to write to ${filePath}, but you haven't granted it yet.`,
            decisionReason: {
                type: DECISION_REASON_TYPES.RULE,
                rule: askRule
            }
        };
    }
    
    // Special handling for Claude Code settings files
    if (isClaudeCodeSettingsFile(filePath)) {
        return {
            behavior: PERMISSION_BEHAVIORS.ASK,
            message: `Claude requested permissions to write to ${filePath}, but you haven't granted it yet.`,
            decisionReason: {
                type: DECISION_REASON_TYPES.OTHER,
                reason: 'Ask for permission to edit Claude Code settings files or slash commands'
            }
        };
    }
    
    // Allow edits within working directory in acceptEdits mode
    if (permissionContext.mode === 'acceptEdits' && isWithinCurrentWorkingDirectory(filePath, permissionContext)) {
        return {
            behavior: PERMISSION_BEHAVIORS.ALLOW,
            updatedInput: toolInput,
            decisionReason: {
                type: DECISION_REASON_TYPES.MODE,
                mode: 'acceptEdits'
            }
        };
    }
    
    // Check explicit allow rules for edit operation
    const allowRule = evaluatePermissionRule(filePath, permissionContext, PERMISSION_OPERATIONS.EDIT, 'allow');
    if (allowRule) {
        return {
            behavior: PERMISSION_BEHAVIORS.ALLOW,
            updatedInput: toolInput,
            decisionReason: {
                type: DECISION_REASON_TYPES.RULE,
                rule: allowRule
            }
        };
    }
    
    // Default: ask for permission
    return {
        behavior: PERMISSION_BEHAVIORS.ASK,
        message: `Claude requested permissions to write to ${filePath}, but you haven't granted it yet.`
    };
}

/**
 * Core permission rule evaluator
 * 
 * Extracted from chunk_0521.js (xs function):
 * - Evaluates permission rules against file paths
 * - Supports different operations (read, edit, execute)
 * - Handles default behaviors when no rules match
 * 
 * @param {string} filePath - File path to check permissions for
 * @param {Object} permissionContext - Context with rules and mode
 * @param {string} operation - Operation type (read, edit, execute)
 * @param {string} defaultBehavior - Default behavior if no rules match
 * @returns {Object|null} Matching rule or null if no match
 */
export function evaluatePermissionRule(filePath, permissionContext, operation, defaultBehavior) {
    const rules = permissionContext.rules || [];
    const resolvedPath = resolvePath(filePath);
    
    // Find matching rule for the operation and behavior
    for (const rule of rules) {
        if (rule.operation !== operation) continue;
        if (rule.behavior !== defaultBehavior) continue;
        
        // Check if path matches rule pattern
        if (matchesPathPattern(resolvedPath, rule.pattern)) {
            return rule;
        }
    }
    
    return null;
}

/**
 * Check if file path is within current working directory
 * 
 * @param {string} filePath - File path to check
 * @param {Object} permissionContext - Context with working directory info
 * @returns {boolean} True if within current working directory
 */
function isWithinCurrentWorkingDirectory(filePath, permissionContext) {
    const cwd = getCurrentWorkingDirectory();
    const resolvedPath = resolvePath(filePath);
    return isWithinPath(resolvedPath, cwd);
}

/**
 * Check if file is a Claude Code settings file
 * 
 * @param {string} filePath - File path to check
 * @returns {boolean} True if this is a settings file
 */
function isClaudeCodeSettingsFile(filePath) {
    const settingsPatterns = [
        /\.claude[\/\\]settings\.json$/,
        /\.claude[\/\\].*\.md$/,
        /CLAUDE\.md$/,
        /claude_code_settings\.json$/
    ];
    
    return settingsPatterns.some(pattern => pattern.test(filePath));
}

/**
 * Get bash outputs path for current session
 * 
 * @returns {string} Path to bash outputs directory
 */
function getBashOutputsPath() {
    // This would need to be implemented based on session management
    // For now, return a placeholder path
    const cwd = getCurrentWorkingDirectory();
    return `${cwd}/.claude/bash-outputs`;
}

/**
 * Check if file path matches a permission rule pattern
 * 
 * @param {string} filePath - File path to check
 * @param {string} pattern - Rule pattern (glob or regex)
 * @returns {boolean} True if path matches pattern
 */
function matchesPathPattern(filePath, pattern) {
    try {
        // Handle glob patterns
        if (pattern.includes('*') || pattern.includes('?')) {
            const globRegex = globToRegex(pattern);
            return globRegex.test(filePath);
        }
        
        // Handle exact matches
        return filePath === pattern;
    } catch (error) {
        console.warn(`Invalid permission rule pattern: ${pattern}`, error);
        return false;
    }
}

/**
 * Convert glob pattern to regex
 * 
 * @param {string} glob - Glob pattern
 * @returns {RegExp} Regular expression for glob
 */
function globToRegex(glob) {
    const regex = glob
        .replace(/\./g, '\\.')
        .replace(/\*/g, '.*')
        .replace(/\?/g, '.');
    return new RegExp(`^${regex}$`);
}

/**
 * Permission Context Builder
 * 
 * Helper class to build permission contexts with rules and mode
 */
export class PermissionContext {
    constructor() {
        this.rules = [];
        this.mode = 'default';
    }
    
    /**
     * Add a permission rule
     * 
     * @param {string} operation - Operation type (read, edit, execute)
     * @param {string} pattern - File path pattern
     * @param {string} behavior - Permission behavior (allow, deny, ask)
     * @returns {PermissionContext} This context for chaining
     */
    addRule(operation, pattern, behavior) {
        this.rules.push({
            operation,
            pattern,
            behavior
        });
        return this;
    }
    
    /**
     * Set the permission mode
     * 
     * @param {string} mode - Permission mode (default, acceptEdits, etc.)
     * @returns {PermissionContext} This context for chaining
     */
    setMode(mode) {
        this.mode = mode;
        return this;
    }
    
    /**
     * Build the permission context object
     * 
     * @returns {Object} Permission context
     */
    build() {
        return {
            rules: [...this.rules],
            mode: this.mode
        };
    }
}