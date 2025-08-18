/**
 * @fileoverview Terminal Utilities
 * 
 * This module provides utility functions for terminal operations,
 * text formatting, size calculations, and terminal feature detection.
 */

/**
 * Time formatting utilities
 */

/**
 * Formats time in milliseconds to human-readable string
 * 
 * @param {number} milliseconds - Time in milliseconds
 * @returns {string} Formatted time string
 */
export const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else {
        return `${seconds}s`;
    }
};

/**
 * Formats duration with high precision for performance metrics
 * 
 * @param {number} milliseconds - Duration in milliseconds
 * @returns {string} Formatted duration
 */
export const formatDuration = (milliseconds) => {
    if (milliseconds < 1000) {
        return `${Math.round(milliseconds)}ms`;
    } else if (milliseconds < 60000) {
        return `${(milliseconds / 1000).toFixed(1)}s`;
    } else {
        return formatTime(milliseconds);
    }
};

/**
 * Formats timestamp to human-readable date/time
 * 
 * @param {Date|string|number} timestamp - Timestamp to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted timestamp
 */
export const formatTimestamp = (timestamp, options = {}) => {
    const date = new Date(timestamp);
    const { includeDate = true, includeTime = true, relative = false } = options;
    
    if (relative) {
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) { // Less than 1 minute
            return 'Just now';
        } else if (diff < 3600000) { // Less than 1 hour
            const minutes = Math.floor(diff / 60000);
            return `${minutes}m ago`;
        } else if (diff < 86400000) { // Less than 1 day
            const hours = Math.floor(diff / 3600000);
            return `${hours}h ago`;
        } else {
            const days = Math.floor(diff / 86400000);
            return `${days}d ago`;
        }
    }
    
    let formatted = '';
    
    if (includeDate) {
        formatted += date.toLocaleDateString();
    }
    
    if (includeTime) {
        if (formatted) formatted += ' ';
        formatted += date.toLocaleTimeString();
    }
    
    return formatted;
};

/**
 * Data formatting utilities
 */

/**
 * Formats bytes to human-readable size
 * 
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted size string
 */
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

/**
 * Formats large numbers with appropriate units
 * 
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
export const formatNumber = (num, decimals = 1) => {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const tier = Math.log10(Math.abs(num)) / 3 | 0;
    
    if (tier === 0) return num.toString();
    
    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;
    
    return scaled.toFixed(decimals) + suffix;
};

/**
 * Formats percentage values
 * 
 * @param {number} value - Decimal value (0-1) or percentage (0-100)
 * @param {number} decimals - Number of decimal places
 * @param {boolean} isDecimal - Whether input is decimal (0-1) or percentage (0-100)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1, isDecimal = true) => {
    const percentage = isDecimal ? value * 100 : value;
    return `${percentage.toFixed(decimals)}%`;
};

/**
 * Text processing utilities
 */

/**
 * Truncates text to specified length with ellipsis
 * 
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} ellipsis - Ellipsis string
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength, ellipsis = '...') => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - ellipsis.length) + ellipsis;
};

/**
 * Wraps text to specified width
 * 
 * @param {string} text - Text to wrap
 * @param {number} width - Maximum line width
 * @param {Object} options - Wrapping options
 * @returns {string[]} Array of wrapped lines
 */
export const wrapText = (text, width, options = {}) => {
    const { breakWords = false, indent = '', hangingIndent = '' } = options;
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const linePrefix = lines.length === 0 ? indent : hangingIndent;
        
        if (testLine.length + linePrefix.length <= width) {
            currentLine = testLine;
        } else {
            if (currentLine) {
                lines.push(linePrefix + currentLine);
                currentLine = word;
            } else if (breakWords && word.length > width - linePrefix.length) {
                // Break long words
                const chunks = word.match(new RegExp(`.{1,${width - linePrefix.length}}`, 'g'));
                chunks.forEach((chunk, index) => {
                    if (index === chunks.length - 1) {
                        currentLine = chunk;
                    } else {
                        lines.push((index === 0 ? linePrefix : hangingIndent) + chunk);
                    }
                });
            } else {
                currentLine = word;
            }
        }
    }
    
    if (currentLine) {
        const linePrefix = lines.length === 0 ? indent : hangingIndent;
        lines.push(linePrefix + currentLine);
    }
    
    return lines;
};

/**
 * Pads text to specified width with alignment
 * 
 * @param {string} text - Text to pad
 * @param {number} width - Target width
 * @param {string} align - Alignment ('left', 'right', 'center')
 * @param {string} padChar - Character to use for padding
 * @returns {string} Padded text
 */
export const padText = (text, width, align = 'left', padChar = ' ') => {
    if (text.length >= width) return text;
    
    const padLength = width - text.length;
    
    switch (align) {
        case 'right':
            return padChar.repeat(padLength) + text;
        case 'center':
            const leftPad = Math.floor(padLength / 2);
            const rightPad = padLength - leftPad;
            return padChar.repeat(leftPad) + text + padChar.repeat(rightPad);
        default:
            return text + padChar.repeat(padLength);
    }
};

/**
 * Status and icon utilities
 */

/**
 * Unicode symbols for various statuses and UI elements
 */
export const symbols = {
    // Status indicators
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ',
    question: '?',
    
    // Progress indicators
    loading: '⏳',
    spinner: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
    
    // Navigation
    arrowUp: '↑',
    arrowDown: '↓',
    arrowLeft: '←',
    arrowRight: '→',
    pointer: '❯',
    
    // Selection
    selected: '●',
    unselected: '○',
    checkedBox: '☑',
    uncheckedBox: '☐',
    
    // Miscellaneous
    bullet: '•',
    ellipsis: '…',
    separator: '─',
    corner: '└',
    tree: '├',
    treeLast: '└'
};

/**
 * Gets appropriate icon for status
 * 
 * @param {string} status - Status name
 * @returns {string} Unicode icon
 */
export const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
        case 'success':
        case 'completed':
        case 'done':
            return symbols.success;
        case 'error':
        case 'failed':
        case 'failure':
            return symbols.error;
        case 'warning':
        case 'warn':
            return symbols.warning;
        case 'info':
        case 'information':
            return symbols.info;
        case 'running':
        case 'loading':
        case 'pending':
            return symbols.loading;
        case 'question':
            return symbols.question;
        default:
            return symbols.bullet;
    }
};

/**
 * Gets appropriate color for status
 * 
 * @param {string} status - Status name
 * @returns {string} Color name
 */
export const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'success':
        case 'completed':
        case 'done':
            return 'green';
        case 'error':
        case 'failed':
        case 'failure':
            return 'red';
        case 'warning':
        case 'warn':
            return 'yellow';
        case 'info':
        case 'information':
            return 'blue';
        case 'running':
        case 'loading':
        case 'pending':
            return 'cyan';
        case 'question':
            return 'magenta';
        default:
            return 'white';
    }
};

/**
 * Terminal capability detection
 */

/**
 * Detects terminal capabilities
 * 
 * @returns {Object} Object describing terminal capabilities
 */
export const getTerminalCapabilities = () => {
    const capabilities = {
        colors: false,
        trueColor: false,
        unicode: false,
        width: 80,
        height: 24,
        isTTY: false
    };
    
    // Check if running in Node.js environment
    if (typeof process !== 'undefined') {
        capabilities.isTTY = process.stdout && process.stdout.isTTY;
        capabilities.width = process.stdout ? process.stdout.columns || 80 : 80;
        capabilities.height = process.stdout ? process.stdout.rows || 24 : 24;
        
        // Color support detection
        const colorLevel = process.env.FORCE_COLOR || (process.stdout && process.stdout.hasColors && process.stdout.hasColors()) || 0;
        capabilities.colors = colorLevel > 0;
        capabilities.trueColor = colorLevel >= 3;
        
        // Unicode support (simplified detection)
        capabilities.unicode = process.env.LANG && process.env.LANG.includes('UTF-8');
    }
    
    return capabilities;
};

/**
 * Checks if terminal supports colors
 * 
 * @returns {boolean} True if colors are supported
 */
export const supportsColor = () => {
    return getTerminalCapabilities().colors;
};

/**
 * Checks if terminal supports Unicode
 * 
 * @returns {boolean} True if Unicode is supported
 */
export const supportsUnicode = () => {
    return getTerminalCapabilities().unicode;
};

/**
 * Layout and spacing utilities
 */

/**
 * Creates a horizontal line of specified width
 * 
 * @param {number} width - Line width
 * @param {string} char - Character to use for line
 * @returns {string} Horizontal line
 */
export const createHorizontalLine = (width, char = '─') => {
    return char.repeat(width);
};

/**
 * Creates a border around text
 * 
 * @param {string} text - Text to border
 * @param {Object} options - Border options
 * @returns {string} Bordered text
 */
export const createBorder = (text, options = {}) => {
    const {
        char = '─',
        padding = 1,
        corners = ['┌', '┐', '└', '┘'],
        sides = ['│', '│']
    } = options;
    
    const lines = text.split('\n');
    const maxWidth = Math.max(...lines.map(line => line.length));
    const totalWidth = maxWidth + (padding * 2);
    
    const topLine = corners[0] + char.repeat(totalWidth) + corners[1];
    const bottomLine = corners[2] + char.repeat(totalWidth) + corners[3];
    
    const borderedLines = [topLine];
    
    lines.forEach(line => {
        const paddedLine = padText(line, maxWidth, 'left');
        const spacer = ' '.repeat(padding);
        borderedLines.push(sides[0] + spacer + paddedLine + spacer + sides[1]);
    });
    
    borderedLines.push(bottomLine);
    
    return borderedLines.join('\n');
};

/**
 * Validation utilities
 */

/**
 * Common validation functions
 */
export const validators = {
    /**
     * Validates email format
     * @param {string} email - Email to validate
     * @returns {Object} Validation result
     */
    email: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            valid: emailRegex.test(email),
            message: 'Please enter a valid email address'
        };
    },
    
    /**
     * Validates URL format
     * @param {string} url - URL to validate
     * @returns {Object} Validation result
     */
    url: (url) => {
        try {
            new URL(url);
            return { valid: true };
        } catch {
            return { valid: false, message: 'Please enter a valid URL' };
        }
    },
    
    /**
     * Validates minimum length
     * @param {number} min - Minimum length
     * @returns {Function} Validator function
     */
    minLength: (min) => (value) => ({
        valid: String(value).length >= min,
        message: `Must be at least ${min} characters long`
    }),
    
    /**
     * Validates maximum length
     * @param {number} max - Maximum length
     * @returns {Function} Validator function
     */
    maxLength: (max) => (value) => ({
        valid: String(value).length <= max,
        message: `Must be no more than ${max} characters long`
    }),
    
    /**
     * Validates numeric input
     * @param {string|number} value - Value to validate
     * @returns {Object} Validation result
     */
    numeric: (value) => ({
        valid: !isNaN(Number(value)),
        message: 'Must be a valid number'
    }),
    
    /**
     * Validates required field
     * @param {any} value - Value to validate
     * @returns {Object} Validation result
     */
    required: (value) => ({
        valid: value !== undefined && value !== null && String(value).trim() !== '',
        message: 'This field is required'
    })
};