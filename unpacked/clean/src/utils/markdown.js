/**
 * Markdown Processing Utilities
 * 
 * Utilities for parsing markdown files with frontmatter and extracting metadata.
 */

/**
 * Parse frontmatter from markdown content
 * 
 * @param {string} content - Raw markdown content
 * @returns {Object} Object with frontmatter and content
 */
export function parseFrontmatter(content) {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return {
            frontmatter: {},
            content: content.trim()
        };
    }
    
    const [, frontmatterText, markdownContent] = match;
    
    try {
        const frontmatter = parseYaml(frontmatterText);
        return {
            frontmatter,
            content: markdownContent.trim()
        };
    } catch (error) {
        console.warn('Failed to parse frontmatter YAML:', error.message);
        return {
            frontmatter: {},
            content: content.trim()
        };
    }
}

/**
 * Simple YAML parser for frontmatter
 * This is a basic implementation that handles common frontmatter patterns
 * 
 * @param {string} yaml - YAML content to parse
 * @returns {Object} Parsed YAML object
 */
function parseYaml(yaml) {
    const result = {};
    const lines = yaml.split('\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            continue; // Skip empty lines and comments
        }
        
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) {
            continue; // Skip lines without colons
        }
        
        const key = trimmed.substring(0, colonIndex).trim();
        const value = trimmed.substring(colonIndex + 1).trim();
        
        if (key && value) {
            result[key] = parseYamlValue(value);
        }
    }
    
    return result;
}

/**
 * Parse a YAML value, handling strings, numbers, booleans, and simple arrays
 * 
 * @param {string} value - Raw value string
 * @returns {*} Parsed value
 */
function parseYamlValue(value) {
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
        return value.slice(1, -1);
    }
    
    // Handle boolean values
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    
    // Handle numbers
    if (/^-?\d+(\.\d+)?$/.test(value)) {
        return parseFloat(value);
    }
    
    // Handle simple arrays (comma or space separated)
    if (value.includes(',')) {
        return value.split(',').map(item => parseYamlValue(item.trim()));
    }
    
    // Handle space-separated arrays for tool lists
    if (value.includes(' ') && !value.includes('(') && !value.includes(')')) {
        const parts = value.split(/\s+/);
        if (parts.length > 1 && parts.every(part => /^[A-Za-z][A-Za-z0-9_-]*(\([^)]*\))?$/.test(part))) {
            return parts;
        }
    }
    
    // Return as string
    return value;
}

/**
 * Extract the first heading from markdown content
 * 
 * @param {string} content - Markdown content
 * @returns {string|null} First heading text or null if none found
 */
export function extractFirstHeading(content) {
    const lines = content.split('\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        const headingMatch = trimmed.match(/^#+\s*(.+)$/);
        if (headingMatch) {
            return headingMatch[1].trim();
        }
    }
    
    return null;
}

/**
 * Extract the first paragraph from markdown content
 * 
 * @param {string} content - Markdown content
 * @returns {string|null} First paragraph text or null if none found
 */
export function extractFirstParagraph(content) {
    const lines = content.split('\n');
    let paragraph = '';
    let inCodeBlock = false;
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip frontmatter
        if (trimmed === '---') {
            continue;
        }
        
        // Track code blocks
        if (trimmed.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        
        if (inCodeBlock) {
            continue;
        }
        
        // Skip headings
        if (trimmed.startsWith('#')) {
            continue;
        }
        
        // Skip empty lines until we find content
        if (!trimmed && !paragraph) {
            continue;
        }
        
        // End paragraph on empty line
        if (!trimmed && paragraph) {
            break;
        }
        
        // Build paragraph
        if (trimmed) {
            paragraph += (paragraph ? ' ' : '') + trimmed;
        }
    }
    
    return paragraph || null;
}

/**
 * Validate markdown frontmatter for slash commands
 * 
 * @param {Object} frontmatter - Parsed frontmatter object
 * @returns {Object} Validation result with errors array
 */
export function validateSlashCommandFrontmatter(frontmatter) {
    const errors = [];
    
    // Check for required fields if specified
    if (frontmatter['allowed-tools']) {
        const tools = frontmatter['allowed-tools'];
        if (!Array.isArray(tools) && typeof tools !== 'string') {
            errors.push('allowed-tools must be a string or array');
        }
    }
    
    // Validate model if specified
    if (frontmatter.model) {
        const validModels = [
            'claude-3-5-sonnet-20241022',
            'claude-3-opus-20240229', 
            'claude-3-haiku-20240307'
        ];
        
        if (!validModels.includes(frontmatter.model)) {
            errors.push(`Invalid model '${frontmatter.model}'. Valid options: ${validModels.join(', ')}`);
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}