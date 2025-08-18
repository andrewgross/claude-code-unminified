/**
 * Comparison Test Utilities
 * 
 * Utilities for comparing our implementation with the original Claude CLI
 */

import { execa } from 'execa';
import { diff } from 'jest-diff';
import * as path from 'path';

// Path to our clean implementation
const CLEAN_CLI_PATH = path.join(process.cwd(), 'src', 'cli', 'index.js');

// Original Claude CLI command (if available)
const ORIGINAL_CLI_COMMAND = 'claude';

/**
 * Execute our clean implementation with given arguments
 */
export async function executeCleanCLI(args = [], options = {}) {
  try {
    const result = await execa('node', [CLEAN_CLI_PATH, ...args], {
      cwd: process.cwd(),
      timeout: options.timeout || 10000,
      ...options
    });
    
    return {
      success: true,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode || 0,
      command: `node ${CLEAN_CLI_PATH} ${args.join(' ')}`
    };
  } catch (error) {
    return {
      success: false,
      stdout: error.stdout || '',
      stderr: error.stderr || error.message,
      exitCode: error.exitCode || 1,
      command: `node ${CLEAN_CLI_PATH} ${args.join(' ')}`,
      error
    };
  }
}

/**
 * Execute original Claude CLI with given arguments
 */
export async function executeOriginalCLI(args = [], options = {}) {
  try {
    const result = await execa(ORIGINAL_CLI_COMMAND, args, {
      timeout: options.timeout || 10000,
      ...options
    });
    
    return {
      success: true,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode || 0,
      command: `${ORIGINAL_CLI_COMMAND} ${args.join(' ')}`
    };
  } catch (error) {
    return {
      success: false,
      stdout: error.stdout || '',
      stderr: error.stderr || error.message,
      exitCode: error.exitCode || 1,
      command: `${ORIGINAL_CLI_COMMAND} ${args.join(' ')}`,
      error
    };
  }
}

/**
 * Check if original Claude CLI is available
 */
export async function isOriginalCLIAvailable() {
  try {
    await execa(ORIGINAL_CLI_COMMAND, ['--version'], { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Compare command outputs between implementations
 */
export async function compareCommandOutputs(args = [], options = {}) {
  const [cleanResult, originalResult] = await Promise.all([
    executeCleanCLI(args, options),
    executeOriginalCLI(args, options)
  ]);

  const comparison = {
    command: args.join(' '),
    clean: cleanResult,
    original: originalResult,
    matches: {
      exitCode: cleanResult.exitCode === originalResult.exitCode,
      stdout: normalizeOutput(cleanResult.stdout) === normalizeOutput(originalResult.stdout),
      stderr: normalizeOutput(cleanResult.stderr) === normalizeOutput(originalResult.stderr)
    }
  };

  // Calculate similarity scores
  comparison.similarity = {
    stdout: calculateSimilarity(cleanResult.stdout, originalResult.stdout),
    stderr: calculateSimilarity(cleanResult.stderr, originalResult.stderr)
  };

  return comparison;
}

/**
 * Normalize output for comparison (remove timestamps, paths, etc.)
 */
function normalizeOutput(output) {
  if (!output) return '';
  
  return output
    // Remove timestamps
    .replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g, '[TIMESTAMP]')
    .replace(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} [AP]M/g, '[TIMESTAMP]')
    // Remove file paths
    .replace(/\/[^\s]+/g, '[PATH]')
    // Remove session IDs
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi, '[UUID]')
    // Remove random IDs
    .replace(/[0-9a-f]{32,}/g, '[ID]')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculate similarity between two strings (0-1 where 1 is identical)
 */
function calculateSimilarity(str1, str2) {
  if (str1 === str2) return 1;
  if (!str1 || !str2) return 0;

  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1;

  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1, str2) {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Generate a detailed diff report
 */
export function generateDiffReport(comparison) {
  const report = {
    command: comparison.command,
    exitCodeMatch: comparison.matches.exitCode,
    outputDiff: null,
    errorDiff: null,
    similarity: comparison.similarity,
    recommendation: 'PASS'
  };

  // Generate diffs if outputs don't match
  if (!comparison.matches.stdout) {
    report.outputDiff = diff(comparison.original.stdout, comparison.clean.stdout, {
      expand: false,
      contextLines: 3
    });
  }

  if (!comparison.matches.stderr) {
    report.errorDiff = diff(comparison.original.stderr, comparison.clean.stderr, {
      expand: false,
      contextLines: 3
    });
  }

  // Determine recommendation
  const stdoutSimilarity = comparison.similarity.stdout;
  const stderrSimilarity = comparison.similarity.stderr;

  if (stdoutSimilarity < 0.8 || stderrSimilarity < 0.8) {
    report.recommendation = 'INVESTIGATE';
  }
  
  if (stdoutSimilarity < 0.6 || stderrSimilarity < 0.6) {
    report.recommendation = 'FAIL';
  }

  return report;
}

/**
 * Create a test assertion for command comparison
 */
export function expectCommandsToMatch(comparison, options = {}) {
  const { allowExitCodeDifference = false, minSimilarity = 0.9 } = options;
  
  if (!allowExitCodeDifference && !comparison.matches.exitCode) {
    throw new Error(`Exit codes don't match: clean=${comparison.clean.exitCode}, original=${comparison.original.exitCode}`);
  }
  
  if (comparison.similarity.stdout < minSimilarity) {
    const diff = generateDiffReport(comparison);
    throw new Error(`Stdout similarity too low: ${comparison.similarity.stdout.toFixed(2)} < ${minSimilarity}\n${diff.outputDiff || 'No diff available'}`);
  }
  
  if (comparison.similarity.stderr < minSimilarity) {
    const diff = generateDiffReport(comparison);
    throw new Error(`Stderr similarity too low: ${comparison.similarity.stderr.toFixed(2)} < ${minSimilarity}\n${diff.errorDiff || 'No diff available'}`);
  }
}

/**
 * Test helper for validating CLI behavior
 */
export class CLITester {
  constructor(implementation = 'clean') {
    this.implementation = implementation;
    this.execute = implementation === 'clean' ? executeCleanCLI : executeOriginalCLI;
  }

  async run(args, options) {
    return this.execute(args, options);
  }

  async expectSuccess(args, options) {
    const result = await this.run(args, options);
    if (!result.success) {
      throw new Error(`Command failed: ${result.command}\nStderr: ${result.stderr}\nExit code: ${result.exitCode}`);
    }
    return result;
  }

  async expectFailure(args, options) {
    const result = await this.run(args, options);
    if (result.success) {
      throw new Error(`Expected command to fail but it succeeded: ${result.command}`);
    }
    return result;
  }

  async expectOutput(args, expectedOutput, options) {
    const result = await this.expectSuccess(args, options);
    const normalized = normalizeOutput(result.stdout);
    const expectedNormalized = normalizeOutput(expectedOutput);
    
    if (normalized !== expectedNormalized) {
      throw new Error(`Output doesn't match:\nExpected: ${expectedNormalized}\nActual: ${normalized}`);
    }
    
    return result;
  }
}