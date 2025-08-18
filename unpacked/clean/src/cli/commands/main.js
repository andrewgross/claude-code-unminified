/**
 * Main Command Handler for Claude Code CLI
 * 
 * Handles the default interactive mode and --print mode for Claude Code CLI.
 * This is the primary entry point for user interactions with Claude.
 * 
 * Extracted from: chunk_0649.js:5-367 (original bundled implementation)
 */

import { initializeInteractiveSession } from '../../core/sessions/interactive.js';
import { executePrintMode } from '../../core/sessions/print.js';
import { validateOptions } from '../../utils/validation.js';
import { hooksManager } from '../../hooks/manager.js';
import { getAllHookMatchers } from '../../hooks/config.js';

/**
 * Main command handler - implements both interactive and print modes
 * 
 * @param {string} prompt - Optional prompt argument
 * @param {object} options - Command line options from commander
 */
export async function mainCommand(prompt, options) {
    try {
        // Load hook configuration
        const hookMatchers = getAllHookMatchers();
        hooksManager.loadHookMatchers(hookMatchers);
        
        // Validate command line options
        const validatedOptions = await validateOptions(options);
        
        // Execute SessionStart hooks
        const sessionSource = options.continue ? 'continue' : 
                             options.resume ? 'resume' : 
                             'new';
        
        try {
            for await (const hookResult of hooksManager.executeSessionStartHooks(sessionSource)) {
                if (options.debug && hookResult.message) {
                    console.log(`SessionStart Hook: ${hookResult.message}`);
                }
            }
        } catch (error) {
            console.error('SessionStart hook failed:', error.message);
            // Continue execution despite hook failure
        }

        // Execute UserPromptSubmit hooks if we have a prompt
        if (prompt) {
            try {
                for await (const hookResult of hooksManager.executeUserPromptSubmitHooks(prompt)) {
                    if (options.debug && hookResult.message) {
                        console.log(`UserPromptSubmit Hook: ${hookResult.message}`);
                    }
                }
            } catch (error) {
                console.error('UserPromptSubmit hook failed:', error.message);
                // Continue execution despite hook failure
            }
        }
        
        // Determine execution mode based on options
        if (options.print) {
            // Non-interactive print mode
            await executePrintMode(prompt, validatedOptions);
        } else {
            // Interactive mode (default)
            await initializeInteractiveSession(prompt, validatedOptions);
        }
    } catch (error) {
        console.error('Error executing Claude CLI:', error.message);
        
        if (options.debug) {
            console.error(error.stack);
        }
        
        process.exit(1);
    }
}

/**
 * Utility function to parse tool lists from command line options
 * 
 * @param {string[]} tools - Array of tool specifications
 * @returns {string[]} Normalized tool list
 */
export function parseToolsList(tools) {
    if (!tools) return [];
    
    return tools.flatMap(tool => 
        tool.includes(',') ? tool.split(',') : [tool]
    ).map(tool => tool.trim()).filter(Boolean);
}

/**
 * Utility function to parse MCP configuration from command line
 * 
 * @param {string[]} configs - Array of config file paths or JSON strings
 * @returns {object[]} Parsed MCP configurations
 */
export async function parseMcpConfigs(configs) {
    if (!configs) return [];
    
    const { readFile } = await import('fs/promises');
    const parsedConfigs = [];
    
    for (const config of configs) {
        try {
            let configData;
            
            // Check if it's a file path or JSON string
            if (config.startsWith('{') || config.startsWith('[')) {
                // Assume it's a JSON string
                configData = JSON.parse(config);
            } else {
                // Assume it's a file path
                const fileContent = await readFile(config, 'utf-8');
                configData = JSON.parse(fileContent);
            }
            
            parsedConfigs.push(configData);
        } catch (error) {
            throw new Error(`Failed to parse MCP config "${config}": ${error.message}`);
        }
    }
    
    return parsedConfigs;
}