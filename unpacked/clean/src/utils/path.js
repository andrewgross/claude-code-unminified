/**
 * Path Utilities
 * 
 * Utility functions for path resolution, validation, and security checks.
 */

import * as path from 'path';
import { getEnvironmentVariable } from '../config/environment.js';

/**
 * Get current working directory
 * 
 * @returns {string} Current working directory path
 */
export function getCurrentWorkingDirectory() {
    return process.cwd();
}

/**
 * Resolve a file path to absolute path
 * 
 * @param {string} filePath - File path to resolve
 * @returns {string} Resolved absolute path
 */
export function resolvePath(filePath) {
    return path.resolve(filePath);
}

/**
 * Check if a path is within another path
 * 
 * @param {string} childPath - Path to check
 * @param {string} parentPath - Parent path to check against
 * @returns {boolean} True if childPath is within parentPath
 */
export function isWithinPath(childPath, parentPath) {
    const relative = path.relative(parentPath, childPath);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
}

/**
 * Normalize path separators for current platform
 * 
 * @param {string} filePath - Path to normalize
 * @returns {string} Normalized path
 */
export function normalizePath(filePath) {
    return path.normalize(filePath);
}

/**
 * Join path segments
 * 
 * @param {...string} segments - Path segments to join
 * @returns {string} Joined path
 */
export function joinPaths(...segments) {
    return path.join(...segments);
}