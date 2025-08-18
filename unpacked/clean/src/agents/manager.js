/**
 * Agent Manager
 * 
 * Manages Claude Code sub-agents including loading definitions, context management,
 * and task delegation.
 * 
 * Extracted from: 
 * - chunk_0591.js:1-150 (built-in agent definitions: jL0, XJ8, VJ8)
 * - chunk_0591.js:451-550 (agent loading function av and OS)
 * - chunk_0592.js:1-42 (agent parsing function MJ8)
 * - chunk_0544.js:331-380 (Se function for directory scanning)
 * - chunk_0544.js:551-600 (PK0 function for markdown file loading)
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { homedir } from 'os';
import { cwd } from 'process';
import { parseFrontmatter } from '../utils/markdown.js';

// Valid models for agents
const VALID_MODELS = [
    'claude-3-5-sonnet-20241022',
    'claude-3-opus-20240229', 
    'claude-3-haiku-20240307',
    'sonnet' // Alias for current Sonnet
];

// Valid agent colors
const VALID_COLORS = [
    'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan', 'magenta',
    'bright-red', 'bright-green', 'bright-blue', 'bright-yellow',
    'bright-orange', 'bright-purple', 'bright-cyan', 'bright-magenta'
];

// Built-in agent definitions
const BUILTIN_AGENTS = {
    'general-purpose': {
        agentType: 'general-purpose',
        whenToUse: 'General-purpose agent for researching complex questions, searching for code, and executing multi-step tasks. When you are searching for a keyword or file and are not confident that you will find the right match in the first few tries use this agent to perform the search for you.',
        tools: ['*'],
        systemPrompt: `You are an agent for Claude Code, Anthropic's official CLI for Claude. Given the user's message, you should use the tools available to complete the task. Do what has been asked; nothing more, nothing less. When you complete the task simply respond with a detailed writeup.

Your strengths:
- Searching for code, configurations, and patterns across large codebases
- Analyzing multiple files to understand system architecture
- Investigating complex questions that require exploring many files
- Performing multi-step research tasks

Guidelines:
- For file searches: Use Grep or Glob when you need to search broadly. Use Read when you know the specific file path.
- For analysis: Start broad and narrow down. Use multiple search strategies if the first doesn't yield results.
- Be thorough: Check multiple locations, consider different naming conventions, look for related files.
- NEVER create files unless they're absolutely necessary for achieving your goal. ALWAYS prefer editing an existing file to creating a new one.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested.
- In your final response always share relevant file names and code snippets. Any file paths you return in your response MUST be absolute. Do NOT use relative paths.
- For clear communication, avoid using emojis.`,
        source: 'built-in',
        baseDir: 'built-in',
        model: 'sonnet'
    },
    
    'statusline-setup': {
        agentType: 'statusline-setup',
        whenToUse: 'Use this agent to configure the user\'s Claude Code status line setting.',
        tools: ['Read', 'Edit'],
        systemPrompt: `You are a status line setup agent for Claude Code. Your job is to create or update the statusLine command in the user's Claude Code settings.

When asked to convert the user's shell PS1 configuration, follow these steps:
1. Read the user's shell configuration files in this order of preference:
   - ~/.zshrc
   - ~/.bashrc  
   - ~/.bash_profile
   - ~/.profile

2. Extract the PS1 value using this regex pattern: /(?:^|\\n)\\s*(?:export\\s+)?PS1\\s*=\\s*["']([^"']+)["']/m

3. Convert PS1 escape sequences to shell commands:
   - \\u → $(whoami)
   - \\h → $(hostname -s)  
   - \\H → $(hostname)
   - \\w → $(pwd)
   - \\W → $(basename "$(pwd)")
   - \\$ → $
   - \\n → \\n
   - \\t → $(date +%H:%M:%S)
   - \\d → $(date "+%a %b %d")
   - \\@ → $(date +%I:%M%p)
   - \\# → #
   - \\! → !

Guidelines:
- Preserve existing settings when updating
- Return a summary of what was configured
- At the end of your response, inform the parent agent that this "statusline-setup" agent must be used for further status line changes.`,
        source: 'built-in',
        baseDir: 'built-in',
        model: 'sonnet',
        color: 'orange'
    },

    'output-style-setup': {
        agentType: 'output-style-setup',
        whenToUse: 'Use this agent to create a Claude Code output style.',
        tools: ['Read', 'Write', 'Edit', 'Glob', 'LS', 'Grep'],
        systemPrompt: `Your job is to create a custom output style, which modifies the Claude Code system prompt, based on the user's description.

# Step 1: Understand Requirements
Extract preferences from the user's request such as:
- Response length (concise, detailed, comprehensive, etc)
- Tone (formal, casual, educational, professional, etc)
- Output display (bullet points, numbered lists, sections, etc)
- Focus areas (task completion, learning, quality, speed, etc)
- Workflow (sequence of specific tools to use, steps to follow, etc)

# Step 2: Generate Configuration
Create a configuration with:
- A short name that is properly capitalized for display (e.g. "Insights")
- A brief description explaining the benefit to display to the user
- The additional content for the system prompt 

# Step 3: Choose File Location
Default to the user-level output styles directory (~/.claude/output-styles/) unless the user specifies to save to the project-level directory (.claude/output-styles/). Generate a filename based on the style name.

# Step 4: Save the File
Format as markdown with frontmatter with name and description fields, followed by the system prompt content.

# Step 5: Summary
Provide a clear summary of what was created and where it was saved.`,
        source: 'built-in',
        baseDir: 'built-in',
        model: 'sonnet'
    }
};

export class AgentManager {
    constructor() {
        this.agentCache = new Map();
        this.activeAgents = new Map();
        this.loaded = false;
    }

    /**
     * Load all agent definitions from various sources
     * 
     * Extracted from chunk_0591.js:451-550 (OS function and av function):
     * - Combines built-in agents with loaded agent files
     * - Implements priority-based override system for agent definitions  
     * - Uses sourcePriority array: built-in < userSettings < projectSettings < policySettings
     * - Deduplicates agents by type, keeping highest priority version
     * - Returns both allAgents (all definitions) and activeAgents (active only)
     * 
     * @returns {Promise<Object>} Object containing active and all agents
     */
    async loadAgents() {
        if (this.loaded) {
            return this.getCachedAgents();
        }

        try {
            // Load agents from markdown files in various directories
            const agentFiles = await this.loadAgentFiles();
            
            const allAgents = [];
            const activeAgents = [];

            // Process built-in agents
            for (const agent of Object.values(BUILTIN_AGENTS)) {
                allAgents.push({
                    ...agent,
                    filename: `${agent.agentType}.md`
                });
            }

            // Process loaded agent files
            for (const agentFile of agentFiles) {
                const agent = this.parseAgentFromFile(
                    agentFile.filePath,
                    agentFile.baseDir,
                    agentFile.frontmatter,
                    agentFile.content,
                    agentFile.source
                );

                if (agent) {
                    allAgents.push(agent);
                }
            }

            // Determine active agents (agents that aren't overridden by higher priority sources)
            const agentsByType = new Map();
            
            // Process in priority order: built-in < userSettings < projectSettings < policySettings
            const sourcePriority = ['built-in', 'userSettings', 'projectSettings', 'policySettings'];
            
            for (const priority of sourcePriority) {
                const agentsForSource = allAgents.filter(a => a.source === priority);
                for (const agent of agentsForSource) {
                    agentsByType.set(agent.agentType, agent);
                }
            }

            // Convert to arrays
            for (const agent of agentsByType.values()) {
                activeAgents.push(agent);
            }

            // Cache results
            this.agentCache.set('all', allAgents);
            this.agentCache.set('active', activeAgents);
            this.loaded = true;

            console.log(`Loaded ${allAgents.length} total agents (${activeAgents.length} active)`);
            
            return { allAgents, activeAgents };
        } catch (error) {
            console.warn('Failed to load agents:', error.message);
            return { allAgents: [], activeAgents: [] };
        }
    }

    /**
     * Get cached agent data
     */
    getCachedAgents() {
        return {
            allAgents: this.agentCache.get('all') || [],
            activeAgents: this.agentCache.get('active') || []
        };
    }

    /**
     * Load agent files from directories
     * 
     * @returns {Promise<Array>} Array of agent file data
     */
    async loadAgentFiles() {
        const agentFiles = [];

        // User-level agents directory (~/.claude/agents/)
        const userAgentsDir = join(homedir(), '.claude', 'agents');
        if (existsSync(userAgentsDir)) {
            const userAgents = await this.scanAgentDirectory(userAgentsDir, 'userSettings');
            agentFiles.push(...userAgents);
        }

        // Project-level agents directory (.claude/agents/)  
        const projectAgentsDir = join(cwd(), '.claude', 'agents');
        if (existsSync(projectAgentsDir)) {
            const projectAgents = await this.scanAgentDirectory(projectAgentsDir, 'projectSettings');
            agentFiles.push(...projectAgents);
        }

        // Policy-level agents (if exists)
        // TODO: Add policy directory path when available

        return agentFiles;
    }

    /**
     * Scan a directory for agent markdown files
     * 
     * Extracted from chunk_0544.js:331-380 (Se function for directory scanning):
     * - Uses readdirSync with withFileTypes for efficient directory traversal
     * - Implements recursive scanRecursive function for subdirectories
     * - Filters for .md files and processes with frontmatter parsing  
     * - Collects file path, base directory, frontmatter, content, and source
     * - Includes error handling for file read failures and directory scan errors
     * 
     * @param {string} directory - Directory to scan
     * @param {string} source - Source identifier
     * @returns {Array} Agent file data
     */
    async scanAgentDirectory(directory, source) {
        const agentFiles = [];

        function scanRecursive(dir, pathSegments = []) {
            try {
                const entries = readdirSync(dir, { withFileTypes: true });
                
                for (const entry of entries) {
                    const fullPath = join(dir, entry.name);
                    
                    if (entry.isDirectory()) {
                        scanRecursive(fullPath, [...pathSegments, entry.name]);
                    } else if (entry.isFile() && entry.name.endsWith('.md')) {
                        try {
                            const content = readFileSync(fullPath, { encoding: 'utf-8' });
                            const { frontmatter, content: markdownContent } = parseFrontmatter(content);
                            
                            agentFiles.push({
                                filePath: fullPath,
                                baseDir: directory,
                                frontmatter,
                                content: markdownContent,
                                source
                            });
                        } catch (error) {
                            console.warn(`Failed to read agent file ${fullPath}: ${error.message}`);
                        }
                    }
                }
            } catch (error) {
                console.warn(`Failed to scan agents directory ${dir}: ${error.message}`);
            }
        }

        scanRecursive(directory);
        return agentFiles;
    }

    /**
     * Parse an agent definition from a markdown file
     * 
     * Extracted from chunk_0592.js:1-42 (MJ8 function for agent parsing):
     * - Validates required frontmatter fields (name, description)
     * - Validates optional fields (model, color) against allowed values
     * - Parses tools array using parseAgentTools helper
     * - Constructs agent object with all required properties
     * - Handles escaped newlines in description field
     * - Returns null for invalid agent definitions
     * 
     * @param {string} filePath - Path to the agent file
     * @param {string} baseDir - Base directory
     * @param {Object} frontmatter - Parsed frontmatter
     * @param {string} content - Markdown content (system prompt)
     * @param {string} source - Source identifier
     * @returns {Object|null} Agent definition or null if invalid
     */
    parseAgentFromFile(filePath, baseDir, frontmatter, content, source) {
        try {
            const { name, description } = frontmatter;
            
            // Validate required fields
            if (!name || typeof name !== 'string' || !description || typeof description !== 'string') {
                const missing = !name || typeof name !== 'string' ? 'name' : 'description';
                console.warn(`Agent file ${filePath} is missing required '${missing}' in frontmatter`);
                return null;
            }

            // Validate model if specified
            const { model, color } = frontmatter;
            if (model && typeof model === 'string' && !VALID_MODELS.includes(model)) {
                console.warn(`Agent file ${filePath} has invalid model '${model}'. Valid options: ${VALID_MODELS.join(', ')}`);
            }

            // Parse tools
            const tools = this.parseAgentTools(frontmatter.tools);

            const filename = basename(filePath);
            
            const agent = {
                baseDir,
                agentType: name,
                whenToUse: description.replace(/\\n/g, '\n'), // Handle escaped newlines
                tools,
                systemPrompt: content.trim(),
                source,
                filename
            };

            // Add optional properties
            if (color && typeof color === 'string' && VALID_COLORS.includes(color)) {
                agent.color = color;
            }

            if (model && typeof model === 'string' && VALID_MODELS.includes(model)) {
                agent.model = model;
            }

            return agent;
        } catch (error) {
            console.warn(`Error parsing agent from ${filePath}: ${error.message}`);
            return null;
        }
    }

    /**
     * Parse agent tools from frontmatter
     * 
     * @param {*} tools - Tools value from frontmatter
     * @returns {Array} Array of tool names
     */
    parseAgentTools(tools) {
        if (!tools) return [];

        if (Array.isArray(tools)) {
            return tools.filter(tool => typeof tool === 'string');
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
     * Find an agent by type
     * 
     * @param {string} agentType - Agent type to find
     * @returns {Object|null} Agent definition or null if not found
     */
    async findAgent(agentType) {
        const { activeAgents } = await this.loadAgents();
        return activeAgents.find(agent => agent.agentType === agentType) || null;
    }

    /**
     * Get all active agents
     * 
     * @returns {Promise<Array>} Array of active agents
     */
    async getActiveAgents() {
        const { activeAgents } = await this.loadAgents();
        return activeAgents;
    }

    /**
     * Get all agents (including overridden ones)
     * 
     * @returns {Promise<Array>} Array of all agents
     */
    async getAllAgents() {
        const { allAgents } = await this.loadAgents();
        return allAgents;
    }

    /**
     * Reload agents from disk
     */
    async reloadAgents() {
        this.agentCache.clear();
        this.loaded = false;
        return await this.loadAgents();
    }

    /**
     * Get agent suggestions for autocomplete
     * 
     * @param {string} partial - Partial agent type
     * @returns {Array} Array of matching agent types
     */
    async getAgentSuggestions(partial) {
        const { activeAgents } = await this.loadAgents();
        const lowerPartial = partial.toLowerCase();
        
        return activeAgents
            .filter(agent => agent.agentType.toLowerCase().includes(lowerPartial))
            .map(agent => agent.agentType)
            .sort();
    }

    /**
     * Validate an agent definition
     * 
     * @param {Object} agent - Agent definition to validate
     * @returns {Object} Validation result with errors array
     */
    validateAgent(agent) {
        const errors = [];

        if (!agent.agentType || typeof agent.agentType !== 'string') {
            errors.push('Agent must have a valid agentType');
        }

        if (!agent.whenToUse || typeof agent.whenToUse !== 'string') {
            errors.push('Agent must have a valid whenToUse description');
        }

        if (!agent.systemPrompt || typeof agent.systemPrompt !== 'string') {
            errors.push('Agent must have a valid systemPrompt');
        }

        if (!Array.isArray(agent.tools)) {
            errors.push('Agent tools must be an array');
        }

        if (agent.model && !VALID_MODELS.includes(agent.model)) {
            errors.push(`Invalid model '${agent.model}'. Valid options: ${VALID_MODELS.join(', ')}`);
        }

        if (agent.color && !VALID_COLORS.includes(agent.color)) {
            errors.push(`Invalid color '${agent.color}'. Valid options: ${VALID_COLORS.join(', ')}`);
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// Export singleton instance
export const agentManager = new AgentManager();