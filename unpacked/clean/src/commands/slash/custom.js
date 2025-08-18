/**
 * Custom Slash Commands from Markdown Files
 * 
 * Loads custom slash commands from markdown files in user and project directories.
 * 
 * Extracted from:
 * - chunk_0630.js:150-220 (custom command loading logic)
 * - chunk_0544.js:331-380 (Se function for directory scanning)
 * - chunk_0544.js:551-600 (PK0 function for markdown file loading)
 * 
 * Implementation details:
 * - Scans ~/.claude/commands/ and .claude/commands/ directories
 * - Recursive directory traversal with Se scanning logic
 * - Markdown frontmatter parsing using PK0 patterns
 * - Command validation and registration
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { homedir } from 'os';
import { cwd } from 'process';
import { parseFrontmatter } from '../../utils/markdown.js';

/**
 * Load custom slash commands from markdown files in various directories
 * 
 * Extracted from chunk_0630.js:150-180 (main command loading function):
 * - Follows two-tier directory structure (user + project)
 * - Uses existsSync to check directory availability
 * - Delegates to loadCommandsFromDirectory for actual scanning
 * - Combines results from all sources into single array
 * 
 * @returns {Array} Array of custom command definitions
 */
export async function loadCustomSlashCommands() {
    const commands = [];
    
    // User-level commands directory (~/.claude/commands/)
    const userCommandsDir = join(homedir(), '.claude', 'commands');
    if (existsSync(userCommandsDir)) {
        const userCommands = await loadCommandsFromDirectory(userCommandsDir, 'userSettings');
        commands.push(...userCommands);
    }
    
    // Project-level commands directory (.claude/commands/)  
    const projectCommandsDir = join(cwd(), '.claude', 'commands');
    if (existsSync(projectCommandsDir)) {
        const projectCommands = await loadCommandsFromDirectory(projectCommandsDir, 'projectSettings');
        commands.push(...projectCommands);
    }
    
    return commands;
}

/**
 * Load commands from a specific directory
 * 
 * Extracted from chunk_0544.js:331-380 (Se function directory scanning):
 * - Recursive directory traversal with try/catch error handling
 * - Uses readdirSync with withFileTypes option for efficient scanning  
 * - Filters for .md files and processes with frontmatter parsing
 * - Maps file contents to command definitions with source tracking
 * - Nested scanDirectory function for recursive processing
 * 
 * @param {string} directory - Directory path to scan
 * @param {string} source - Source identifier (userSettings, projectSettings, etc.)
 * @returns {Array} Array of command definitions
 */
async function loadCommandsFromDirectory(directory, source) {
    const commands = [];
    
    function scanDirectory(dir, pathSegments = []) {
        try {
            const entries = readdirSync(dir, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = join(dir, entry.name);
                
                if (entry.isDirectory()) {
                    // Recursively scan subdirectories
                    scanDirectory(fullPath, [...pathSegments, entry.name]);
                } else if (entry.isFile() && entry.name.endsWith('.md')) {
                    // Process markdown files
                    const command = loadCommandFromFile(fullPath, directory, pathSegments, source);
                    if (command) {
                        commands.push(command);
                    }
                }
            }
        } catch (error) {
            console.warn(`Failed to scan commands directory ${dir}: ${error.message}`);
        }
    }
    
    scanDirectory(directory);
    return commands;
}

/**
 * Load a single command from a markdown file
 * 
 * @param {string} filePath - Path to the markdown file
 * @param {string} baseDir - Base directory for the commands
 * @param {Array} pathSegments - Path segments for nested commands
 * @param {string} source - Source identifier
 * @returns {Object|null} Command definition or null if invalid
 */
function loadCommandFromFile(filePath, baseDir, pathSegments, source) {
    try {
        const content = readFileSync(filePath, { encoding: 'utf-8' });
        const { frontmatter, content: markdownContent } = parseFrontmatter(content);
        
        // Generate command name from file path
        const fileName = basename(filePath).replace(/\.md$/, '');
        const commandSegments = [...pathSegments, fileName];
        const commandName = commandSegments.join(':');
        
        // Extract metadata from frontmatter
        const description = frontmatter.description || extractDescriptionFromContent(markdownContent);
        const allowedTools = parseAllowedTools(frontmatter['allowed-tools']);
        const argumentHint = frontmatter['argument-hint'];
        const model = frontmatter.model;
        const displayName = `${description} (custom:${source})`;
        
        return {
            type: 'custom',
            name: commandName,
            description: displayName,
            allowedTools,
            argumentHint,
            model,
            source: 'custom',
            filePath,
            content: markdownContent,
            isEnabled: () => true,
            isHidden: false,
            
            /**
             * Get user-facing name for the command
             */
            userFacingName() {
                return commandName;
            },
            
            /**
             * Generate prompt content for command execution
             * 
             * @param {string} args - Command arguments
             * @param {Object} context - Execution context
             * @returns {Array} Array of prompt parts
             */
            async getPromptForCommand(args, context) {
                let prompt = markdownContent;
                
                // Handle arguments injection
                if (args) {
                    if (prompt.includes('$ARGUMENTS')) {
                        // Replace $ARGUMENTS placeholder
                        prompt = prompt.replace('$ARGUMENTS', args);
                    } else {
                        // Append arguments if no placeholder
                        prompt = prompt + `\n\nARGUMENTS: ${args}`;
                    }
                }
                
                // Process template variables and tool permissions
                const toolPermissionContext = context.getToolPermissionContext();
                prompt = await processTemplateVariables(prompt, {
                    ...context,
                    getToolPermissionContext() {
                        return {
                            ...toolPermissionContext,
                            alwaysAllowRules: {
                                ...toolPermissionContext.alwaysAllowRules,
                                command: allowedTools
                            }
                        };
                    }
                }, `/${commandName}`);
                
                return [{
                    type: 'text',
                    text: prompt
                }];
            }
        };
    } catch (error) {
        console.warn(`Failed to load command from ${filePath}: ${error.message}`);
        return null;
    }
}

/**
 * Extract description from markdown content if not provided in frontmatter
 * 
 * @param {string} content - Markdown content
 * @param {string} fallback - Fallback description
 * @returns {string} Description text
 */
function extractDescriptionFromContent(content, fallback = 'Custom command') {
    // Look for first paragraph or heading
    const lines = content.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('#')) {
            // Use heading text
            return trimmed.replace(/^#+\s*/, '');
        } else if (trimmed && !trimmed.startsWith('```') && !trimmed.startsWith('---')) {
            // Use first non-empty, non-code, non-frontmatter line
            return trimmed;
        }
    }
    
    return fallback;
}

/**
 * Parse allowed-tools configuration from frontmatter
 * 
 * @param {string|Array} tools - Tools configuration
 * @returns {Array} Array of allowed tools
 */
function parseAllowedTools(tools) {
    if (!tools) return [];
    
    if (Array.isArray(tools)) {
        return tools;
    }
    
    if (typeof tools === 'string') {
        // Handle comma-separated or space-separated tools
        return tools
            .split(/[,\s]+/)
            .map(tool => tool.trim())
            .filter(Boolean);
    }
    
    return [];
}

/**
 * Process template variables in prompt content
 * This is a placeholder for the actual template processing logic
 * 
 * @param {string} content - Prompt content
 * @param {Object} context - Execution context
 * @param {string} commandName - Command name for reference
 * @returns {string} Processed content
 */
async function processTemplateVariables(content, context, commandName) {
    // TODO: Implement actual template variable processing
    // This would handle things like:
    // - !`git status` - execute commands and inject output
    // - ${variable} - substitute context variables
    // - Current directory, user name, etc.
    
    // For now, just return content as-is
    return content;
}

/**
 * Get list of available custom commands
 * 
 * @returns {Array} List of command information
 */
export async function getCustomCommands() {
    const commands = await loadCustomSlashCommands();
    return commands.map(cmd => ({
        name: cmd.name,
        description: cmd.description,
        argumentHint: cmd.argumentHint,
        allowedTools: cmd.allowedTools || [],
        source: cmd.source,
        filePath: cmd.filePath
    }));
}

/**
 * Execute a custom slash command
 * 
 * @param {string} commandName - Name of the command
 * @param {string} args - Command arguments
 * @param {Object} context - Execution context
 * @returns {Promise<Object>} Command result
 */
export async function executeCustomCommand(commandName, args, context) {
    const commands = await loadCustomSlashCommands();
    const command = commands.find(cmd => cmd.name === commandName);
    
    if (!command) {
        return {
            type: 'error',
            content: `Unknown custom command: /${commandName}. Use /help to see available commands.`
        };
    }
    
    try {
        const promptParts = await command.getPromptForCommand(args, context);
        
        // For now, return the processed prompt content
        // In a real implementation, this would be sent to the Claude API
        return {
            type: 'custom_command',
            content: `Executing custom command: /${commandName}`,
            prompt: promptParts[0].text,
            command: command
        };
    } catch (error) {
        return {
            type: 'error',
            content: `Failed to execute custom command /${commandName}: ${error.message}`
        };
    }
}