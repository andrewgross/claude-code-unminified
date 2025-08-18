/**
 * Slash Commands Registry
 * 
 * Central registry for all slash commands (built-in, custom, and MCP-provided).
 * Handles command lookup, execution, and management.
 */

import { BUILTIN_COMMANDS, executeBuiltinCommand, parseSlashCommand } from './builtins.js';
import { loadCustomSlashCommands, executeCustomCommand } from './custom.js';
import { loadMcpSlashCommands, executeMcpSlashCommand, isMcpAvailable } from './mcp.js';

/**
 * Slash command registry that manages all available commands
 */
class SlashCommandRegistry {
    constructor() {
        this.builtinCommands = BUILTIN_COMMANDS;
        this.customCommands = new Map();
        this.mcpCommands = new Map();
        this.loaded = false;
    }
    
    /**
     * Load all slash commands (custom and MCP)
     */
    async loadCommands() {
        if (this.loaded) return;
        
        try {
            // Load custom commands from markdown files
            const customCommands = await loadCustomSlashCommands();
            this.customCommands.clear();
            
            for (const command of customCommands) {
                this.customCommands.set(command.name, command);
            }
            
            // Load MCP dynamic commands if MCP servers are available
            if (isMcpAvailable()) {
                const mcpCommands = await loadMcpSlashCommands();
                this.mcpCommands.clear();
                
                for (const command of mcpCommands) {
                    this.mcpCommands.set(command.name, command);
                }
                
                console.log(`Loaded ${mcpCommands.length} MCP slash commands`);
            }
            
            this.loaded = true;
            console.log(`Loaded ${customCommands.length} custom slash commands`);
        } catch (error) {
            console.warn('Failed to load slash commands:', error.message);
        }
    }
    
    /**
     * Get all available commands
     * 
     * @returns {Object} Object with command categories
     */
    getAllCommands() {
        return {
            builtin: Object.values(this.builtinCommands),
            custom: Array.from(this.customCommands.values()),
            mcp: Array.from(this.mcpCommands.values())
        };
    }
    
    /**
     * Find a command by name
     * 
     * @param {string} name - Command name
     * @returns {Object|null} Command definition or null if not found
     */
    findCommand(name) {
        // Check built-in commands first
        if (this.builtinCommands[name]) {
            return {
                type: 'builtin',
                command: this.builtinCommands[name]
            };
        }
        
        // Check for aliases in built-in commands
        for (const [cmdName, cmd] of Object.entries(this.builtinCommands)) {
            if (cmd.aliases && cmd.aliases.includes(name)) {
                return {
                    type: 'builtin',
                    command: cmd,
                    alias: name
                };
            }
        }
        
        // Check custom commands
        if (this.customCommands.has(name)) {
            return {
                type: 'custom',
                command: this.customCommands.get(name)
            };
        }
        
        // Check MCP commands
        if (this.mcpCommands.has(name)) {
            return {
                type: 'mcp',
                command: this.mcpCommands.get(name)
            };
        }
        
        return null;
    }
    
    /**
     * Execute a slash command
     * 
     * @param {string} input - Raw slash command input
     * @param {Object} context - Execution context
     * @returns {Promise<Object>} Command result
     */
    async executeCommand(input, context) {
        const parsed = parseSlashCommand(input);
        if (!parsed) {
            return {
                type: 'error',
                content: 'Invalid slash command format'
            };
        }
        
        const { command, args } = parsed;
        const commandDef = this.findCommand(command);
        
        if (!commandDef) {
            return {
                type: 'error',
                content: `Unknown command: /${command}. Type /help for available commands.`
            };
        }
        
        try {
            switch (commandDef.type) {
                case 'builtin':
                    return await executeBuiltinCommand(command, args, context);
                    
                case 'custom':
                    return await executeCustomCommand(command, args, context);
                    
                case 'mcp':
                    return await executeMcpSlashCommand(commandDef.command.name, args, context);
                    
                default:
                    return {
                        type: 'error',
                        content: `Unknown command type: ${commandDef.type}`
                    };
            }
        } catch (error) {
            return {
                type: 'error',
                content: `Command execution failed: ${error.message}`
            };
        }
    }
    
    /**
     * Reload MCP commands from connected servers
     */
    async reloadMcpCommands() {
        try {
            if (isMcpAvailable()) {
                const mcpCommands = await loadMcpSlashCommands();
                this.mcpCommands.clear();
                
                for (const command of mcpCommands) {
                    this.mcpCommands.set(command.name, command);
                }
                
                console.log(`Reloaded ${mcpCommands.length} MCP slash commands`);
            } else {
                this.mcpCommands.clear();
                console.log('No MCP servers available, cleared MCP commands');
            }
        } catch (error) {
            console.warn('Failed to reload MCP commands:', error.message);
        }
    }
    
    /**
     * Register an MCP command dynamically
     * 
     * @param {Object} command - MCP command definition
     */
    registerMcpCommand(command) {
        this.mcpCommands.set(command.name, command);
    }
    
    /**
     * Unregister an MCP command
     * 
     * @param {string} name - Command name
     */
    unregisterMcpCommand(name) {
        this.mcpCommands.delete(name);
    }
    
    /**
     * Reload custom commands from disk
     */
    async reloadCustomCommands() {
        try {
            const customCommands = await loadCustomSlashCommands();
            this.customCommands.clear();
            
            for (const command of customCommands) {
                this.customCommands.set(command.name, command);
            }
            
            console.log(`Reloaded ${customCommands.length} custom slash commands`);
        } catch (error) {
            console.warn('Failed to reload custom commands:', error.message);
        }
    }
    
    /**
     * Get command suggestions for autocomplete
     * 
     * @param {string} partial - Partial command name
     * @returns {Array} Array of matching command names
     */
    getCommandSuggestions(partial) {
        const suggestions = [];
        const lowerPartial = partial.toLowerCase();
        
        // Built-in commands
        for (const name of Object.keys(this.builtinCommands)) {
            if (name.toLowerCase().startsWith(lowerPartial)) {
                suggestions.push(name);
            }
        }
        
        // Custom commands  
        for (const name of this.customCommands.keys()) {
            if (name.toLowerCase().startsWith(lowerPartial)) {
                suggestions.push(name);
            }
        }
        
        // MCP commands
        for (const name of this.mcpCommands.keys()) {
            if (name.toLowerCase().startsWith(lowerPartial)) {
                suggestions.push(name);
            }
        }
        
        return suggestions.sort();
    }
    
    /**
     * Get help text for all commands or a specific command
     * 
     * @param {string} commandName - Optional specific command name
     * @returns {string} Help text
     */
    getHelpText(commandName) {
        if (commandName) {
            const commandDef = this.findCommand(commandName);
            if (commandDef) {
                const cmd = commandDef.command;
                return `${cmd.name}: ${cmd.description}\nUsage: ${cmd.usage || `/${cmd.name}`}`;
            } else {
                return `Unknown command: ${commandName}`;
            }
        }
        
        // Generate help for all commands
        const allCommands = this.getAllCommands();
        const helpSections = [];
        
        if (allCommands.builtin.length > 0) {
            helpSections.push('**Built-in Commands:**');
            for (const cmd of allCommands.builtin) {
                const usage = cmd.usage || `/${cmd.name}`;
                helpSections.push(`${usage.padEnd(20)} - ${cmd.description}`);
            }
        }
        
        if (allCommands.custom.length > 0) {
            helpSections.push('\n**Custom Commands:**');
            for (const cmd of allCommands.custom) {
                const usage = `/${cmd.name}`;
                helpSections.push(`${usage.padEnd(20)} - ${cmd.description}`);
            }
        }
        
        if (allCommands.mcp.length > 0) {
            helpSections.push('\n**MCP Commands:**');
            for (const cmd of allCommands.mcp) {
                const usage = `/${cmd.name}`;
                helpSections.push(`${usage.padEnd(20)} - ${cmd.description}`);
            }
        }
        
        helpSections.push('\nType /help <command> for detailed help on a specific command.');
        helpSections.push('Just type your message to chat with Claude!');
        
        return helpSections.join('\n');
    }
}

// Export singleton instance
export const slashCommandRegistry = new SlashCommandRegistry();

// Helper functions
export { parseSlashCommand };
export const executeSlashCommand = (input, context) => slashCommandRegistry.executeCommand(input, context);
export const loadSlashCommands = () => slashCommandRegistry.loadCommands();
export const getSlashCommandSuggestions = (partial) => slashCommandRegistry.getCommandSuggestions(partial);
export const getSlashCommandHelp = (commandName) => slashCommandRegistry.getHelpText(commandName);