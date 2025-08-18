/**
 * Corrected Claude Code Error Types
 * 
 * Based on verification against original cli.js implementation.
 * Simplified from complex error hierarchy to match actual patterns.
 */

/**
 * Main error class used throughout Claude Code CLI
 * This matches the 'kY' class found in the original implementation
 */
class ClaudeCodeError extends Error {
    constructor(message, formattedMessage) {
        super(message);
        this.name = 'ClaudeCodeError';
        this.formattedMessage = formattedMessage;
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ClaudeCodeError);
        }
    }
}

/**
 * Simple logging functions based on actual implementation
 */

// SA() - Error logging function 
function SA(message) {
    console.error(`ERROR: ${message}`);
}

// n1() - Debug/info logging function
function n1(message) {
    if (process.env.DEBUG) {
        console.log(`DEBUG: ${message}`);
    }
}

// R1() - Error reporting function
function R1(error) {
    if (error instanceof Error) {
        SA(`${error.name}: ${error.message}`);
        if (process.env.DEBUG) {
            console.error(error.stack);
        }
    } else {
        SA(String(error));
    }
}

/**
 * Simple error creation helper
 */
function createError(message, formattedMessage = null) {
    return new ClaudeCodeError(message, formattedMessage || `Error: ${message}\n`);
}

/**
 * Exit with error (common pattern in CLI)
 */
function exitWithError(message, code = 1) {
    process.stderr.write(`Error: ${message}\n`);
    process.exit(code);
}

/**
 * Handle async errors with basic logging
 */
async function handleAsyncError(operation, context = 'operation') {
    try {
        return await operation();
    } catch (error) {
        R1(error);
        throw new ClaudeCodeError(`${context} failed: ${error.message}`);
    }
}

module.exports = {
    ClaudeCodeError,
    SA,
    n1, 
    R1,
    createError,
    exitWithError,
    handleAsyncError
};