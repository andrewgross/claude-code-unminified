/**
 * Option Parsing Validation Tests
 * 
 * Tests that validate our CLI correctly parses and handles various command-line options
 */

import { describe, test, expect, beforeAll } from '@jest/globals';
import { 
  compareCommandOutputs, 
  isOriginalCLIAvailable,
  expectCommandsToMatch,
  CLITester
} from '../helpers/comparison.js';

describe('Option Parsing Validation', () => {
  let originalAvailable = false;
  let cleanCLI;

  beforeAll(async () => {
    originalAvailable = await isOriginalCLIAvailable();
    cleanCLI = new CLITester('clean');
    
    if (!originalAvailable) {
      console.warn('Original Claude CLI not available - testing clean implementation only');
    }
  });

  describe('Basic Option Parsing', () => {
    test('--debug flag is recognized', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--debug', '--print', 'test'], { timeout: 5000 });
        // Debug mode should be active - check for debug output patterns
        expect(result.stdout).toMatch(/debug|Debug|DEBUG/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--debug', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.7,
        allowExitCodeDifference: true 
      });
    });

    test('--verbose flag is recognized', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--verbose', '--print', 'test'], { timeout: 5000 });
        // Should not fail with unknown option error
        expect(result.stderr).not.toMatch(/unknown option|unrecognized/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--verbose', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.7,
        allowExitCodeDifference: true 
      });
    });

    test('--print flag enables print mode', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--print', 'Hello world'], { timeout: 5000 });
        
        // Print mode should not start interactive session
        expect(result.stdout).not.toMatch(/Interactive Session/);
        // Should contain some response (either real or simulated)
        expect(result.stdout.length).toBeGreaterThan(0);
        return;
      }

      const comparison = await compareCommandOutputs(['--print', 'Hello world']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5, // Allow significant differences in responses
        allowExitCodeDifference: true 
      });
    });
  });

  describe('Output Format Options', () => {
    test('--output-format text is valid', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--output-format', 'text', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/invalid choice|unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--output-format', 'text', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('--output-format json is valid', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--output-format', 'json', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/invalid choice|unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--output-format', 'json', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('--output-format stream-json is valid', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--output-format', 'stream-json', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/invalid choice|unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--output-format', 'stream-json', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('invalid --output-format shows error', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.expectFailure(['--output-format', 'invalid', '--print', 'test']);
        expect(result.stderr).toMatch(/invalid choice|argument.*invalid/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--output-format', 'invalid', '--print', 'test']);
      expect(comparison.clean.exitCode).not.toBe(0);
      expect(comparison.original.exitCode).not.toBe(0);
    });
  });

  describe('Input Format Options', () => {
    test('--input-format text is valid', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--input-format', 'text', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/invalid choice|unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--input-format', 'text', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('invalid --input-format shows error', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.expectFailure(['--input-format', 'invalid', '--print', 'test']);
        expect(result.stderr).toMatch(/invalid choice|argument.*invalid/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--input-format', 'invalid', '--print', 'test']);
      expect(comparison.clean.exitCode).not.toBe(0);
      expect(comparison.original.exitCode).not.toBe(0);
    });
  });

  describe('Model Options', () => {
    test('--model option is recognized', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--model', 'claude-3-5-sonnet-20241022', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--model', 'claude-3-5-sonnet-20241022', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('--fallback-model option is recognized', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--fallback-model', 'claude-3-haiku-20240307', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--fallback-model', 'claude-3-haiku-20240307', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });
  });

  describe('Permission Options', () => {
    test('--permission-mode strict is valid', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--permission-mode', 'strict', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/invalid choice|unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--permission-mode', 'strict', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('--allowedTools accepts list', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--allowedTools', 'Read,Write', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--allowedTools', 'Read,Write', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('--disallowedTools accepts list', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--disallowedTools', 'Bash,Delete', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--disallowedTools', 'Bash,Delete', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });
  });

  describe('Session Management Options', () => {
    test('--continue flag is recognized', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--continue', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--continue', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('--resume without value is valid', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--resume', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--resume', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('--session-id accepts UUID', async () => {
      const testUuid = '550e8400-e29b-41d4-a716-446655440000';
      
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--session-id', testUuid, '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--session-id', testUuid, '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });
  });

  describe('MCP Options', () => {
    test('--mcp-debug flag is recognized', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--mcp-debug', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--mcp-debug', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.7,
        allowExitCodeDifference: true 
      });
    });

    test('--mcp-config accepts file path', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--mcp-config', '/tmp/test.json', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--mcp-config', '/tmp/test.json', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('--strict-mcp-config flag is recognized', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run(['--strict-mcp-config', '--print', 'test'], { timeout: 5000 });
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--strict-mcp-config', '--print', 'test']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });
  });

  describe('Error Handling', () => {
    test('unknown option shows error', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.expectFailure(['--unknown-option', 'value']);
        expect(result.stderr).toMatch(/unknown option|unrecognized/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--unknown-option', 'value']);
      expect(comparison.clean.exitCode).not.toBe(0);
      expect(comparison.original.exitCode).not.toBe(0);
      expect(comparison.clean.stderr).toMatch(/unknown option|unrecognized/i);
      expect(comparison.original.stderr).toMatch(/unknown option|unrecognized/i);
    });

    test('option requiring value without value shows error', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.expectFailure(['--model']);
        expect(result.stderr).toMatch(/option.*requires.*argument|missing.*argument/i);
        return;
      }

      const comparison = await compareCommandOutputs(['--model']);
      expect(comparison.clean.exitCode).not.toBe(0);
      expect(comparison.original.exitCode).not.toBe(0);
    });
  });

  describe('Combined Options', () => {
    test('multiple flags work together', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.run([
          '--debug', 
          '--verbose', 
          '--output-format', 'json',
          '--print', 
          'test'
        ], { timeout: 5000 });
        
        expect(result.stderr).not.toMatch(/unknown option|invalid choice/i);
        return;
      }

      const comparison = await compareCommandOutputs([
        '--debug', 
        '--verbose', 
        '--output-format', 'json',
        '--print', 
        'test'
      ]);
      
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.5,
        allowExitCodeDifference: true 
      });
    });

    test('conflicting options handled gracefully', async () => {
      // Test options that might conflict (like --continue and --resume)
      if (!originalAvailable) {
        const result = await cleanCLI.run([
          '--continue', 
          '--resume', 
          '--print', 
          'test'
        ], { timeout: 5000 });
        
        // Should not crash, though behavior may vary
        expect(result.stderr).not.toMatch(/unknown option/i);
        return;
      }

      const comparison = await compareCommandOutputs([
        '--continue', 
        '--resume', 
        '--print', 
        'test'
      ]);
      
      // Both implementations should handle this consistently
      expect(comparison.clean.exitCode === comparison.original.exitCode).toBe(true);
    });
  });
});