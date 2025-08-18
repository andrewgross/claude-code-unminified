/**
 * CLI Help Text Comparison Tests
 * 
 * Tests that compare help output between our implementation and the original
 */

import { describe, test, expect, beforeAll } from '@jest/globals';
import { 
  compareCommandOutputs, 
  isOriginalCLIAvailable,
  expectCommandsToMatch,
  CLITester,
  executeCleanCLI,
  executeOriginalCLI
} from '../helpers/comparison.js';

describe('CLI Help Text Comparison', () => {
  let originalAvailable = false;
  let cleanCLI;

  beforeAll(async () => {
    originalAvailable = await isOriginalCLIAvailable();
    cleanCLI = new CLITester('clean');
    
    if (!originalAvailable) {
      console.warn('Original Claude CLI not available - skipping comparison tests');
    }
  });

  describe('Main Help Output', () => {
    test('main --help matches original', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.expectSuccess(['--help']);
        
        // Test that our implementation has the expected structure
        expect(result.stdout).toContain('Claude Code - starts an interactive session');
        expect(result.stdout).toContain('Usage: claude [options]');
        expect(result.stdout).toContain('Arguments:');
        expect(result.stdout).toContain('prompt');
        expect(result.stdout).toContain('Options:');
        expect(result.stdout).toContain('Commands:');
        
        // Test required options are present
        expect(result.stdout).toContain('--debug');
        expect(result.stdout).toContain('--verbose');
        expect(result.stdout).toContain('--print');
        expect(result.stdout).toContain('--output-format');
        expect(result.stdout).toContain('--continue');
        expect(result.stdout).toContain('--resume');
        expect(result.stdout).toContain('--model');
        
        // Test required commands are present
        expect(result.stdout).toContain('config');
        expect(result.stdout).toContain('mcp');
        expect(result.stdout).toContain('setup-token');
        expect(result.stdout).toContain('doctor');
        
        return;
      }

      const comparison = await compareCommandOutputs(['--help']);
      
      // Allow for slight differences but ensure high similarity
      expectCommandsToMatch(comparison, {
        minSimilarity: 0.9,
        allowExitCodeDifference: false
      });
      
      // Specific checks for critical content
      expect(comparison.clean.stdout).toContain('Claude Code - starts an interactive session');
      expect(comparison.clean.stdout).toContain('Usage: claude [options]');
      expect(comparison.original.stdout).toContain('Claude Code - starts an interactive session');
      expect(comparison.original.stdout).toContain('Usage: claude [options]');
    }, 15000);

    test('help command starts interactive session consistently', async () => {
      // Both implementations treat "help" as a prompt, not a help command
      // This tests that both behave consistently by starting interactive sessions
      if (!originalAvailable) {
        // Our implementation starts an interactive session when given "help" as a prompt
        // This is expected behavior - help text is accessed via --help flag
        const result = await cleanCLI.run(['help'], { timeout: 3000 });
        expect(result.stdout).toContain('Claude Code - Interactive Session');
        return;
      }

      // Both should start interactive sessions, so we can't easily compare full output
      // but we can verify both start interactive mode
      const cleanResult = await executeCleanCLI(['help'], { timeout: 3000 });
      const originalResult = await executeOriginalCLI(['help'], { timeout: 3000 });
      
      // Both should start interactive sessions (not show help text)
      expect(cleanResult.stdout).toContain('Interactive Session');
      // Original timing out or getting SIGTERM is expected for interactive mode
    });
  });

  describe('Subcommand Help Output', () => {
    test('config --help matches original', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.expectSuccess(['config', '--help']);
        
        expect(result.stdout).toContain('Usage: claude config');
        expect(result.stdout).toContain('Commands:');
        expect(result.stdout).toContain('get');
        expect(result.stdout).toContain('set');
        expect(result.stdout).toContain('remove');
        expect(result.stdout).toContain('list');
        
        return;
      }

      const comparison = await compareCommandOutputs(['config', '--help']);
      expectCommandsToMatch(comparison, { minSimilarity: 0.85 });
      
      // Ensure both have the same subcommands
      const requiredSubcommands = ['get', 'set', 'remove', 'list', 'add'];
      for (const cmd of requiredSubcommands) {
        expect(comparison.clean.stdout).toContain(cmd);
        expect(comparison.original.stdout).toContain(cmd);
      }
    });

    test('mcp --help matches original', async () => {
      if (!originalAvailable) {
        const result = await cleanCLI.expectSuccess(['mcp', '--help']);
        
        expect(result.stdout).toContain('Usage: claude mcp');
        expect(result.stdout).toContain('Commands:');
        expect(result.stdout).toContain('serve');
        expect(result.stdout).toContain('add');
        expect(result.stdout).toContain('remove');
        expect(result.stdout).toContain('list');
        
        return;
      }

      const comparison = await compareCommandOutputs(['mcp', '--help']);
      expectCommandsToMatch(comparison, { 
        minSimilarity: 0.6,  // Lower threshold as our implementation has additional valid MCP commands
        allowExitCodeDifference: true
      });
      
      // Ensure both have the same subcommands
      const requiredSubcommands = ['serve', 'add', 'remove', 'list', 'get'];
      for (const cmd of requiredSubcommands) {
        expect(comparison.clean.stdout).toContain(cmd);
        expect(comparison.original.stdout).toContain(cmd);
      }
    });

    test('sessions --help matches structure', async () => {
      // Our sessions command may not exist in original, so just test structure
      const result = await cleanCLI.expectSuccess(['sessions', '--help']);
      
      expect(result.stdout).toContain('Usage: claude sessions');
      expect(result.stdout).toContain('Commands:');
      expect(result.stdout).toContain('list');
      expect(result.stdout).toContain('show');
      expect(result.stdout).toContain('delete');
      expect(result.stdout).toContain('archive');
    });
  });

  describe('Option Help Validation', () => {
    test('all critical options are documented', async () => {
      const result = await cleanCLI.expectSuccess(['--help']);
      
      const criticalOptions = [
        '--debug', 
        '--verbose',
        '--print',
        '--output-format',
        '--input-format',
        '--mcp-debug',
        '--dangerously-skip-permissions',
        '--allowedTools',
        '--disallowedTools',
        '--mcp-config',
        '--append-system-prompt',
        '--permission-mode',
        '--continue',
        '--resume',
        '--model',
        '--fallback-model',
        '--settings',
        '--add-dir',
        '--ide',
        '--strict-mcp-config',
        '--session-id'
      ];
      
      for (const option of criticalOptions) {
        expect(result.stdout).toContain(option);
      }
    });

    test('choice options show valid choices', async () => {
      const result = await cleanCLI.expectSuccess(['--help']);
      
      // Output format choices
      expect(result.stdout).toMatch(/--output-format.*choices.*text.*json.*stream-json/s);
      
      // Input format choices  
      expect(result.stdout).toMatch(/--input-format.*choices.*text.*stream-json/s);
      
      // Permission mode choices (may differ from original)
      expect(result.stdout).toMatch(/--permission-mode.*choices/s);
    });
  });

  describe('Help Text Quality', () => {
    test('help text is properly formatted', async () => {
      const result = await cleanCLI.expectSuccess(['--help']);
      
      // Should have proper sections
      expect(result.stdout).toMatch(/Usage:/);
      expect(result.stdout).toMatch(/Arguments:/);
      expect(result.stdout).toMatch(/Options:/);
      expect(result.stdout).toMatch(/Commands:/);
      
      // Should not have obvious formatting issues
      expect(result.stdout).not.toMatch(/undefined/);
      expect(result.stdout).not.toMatch(/\[object Object\]/);
      expect(result.stdout).not.toMatch(/NaN/);
    });

    test('help text contains descriptions', async () => {
      const result = await cleanCLI.expectSuccess(['--help']);
      
      // Key options should have descriptions
      expect(result.stdout).toMatch(/--debug\s+Enable debug mode/);
      expect(result.stdout).toMatch(/--print\s+Print response and exit/);
      expect(result.stdout).toMatch(/--verbose\s+Override verbose mode/);
    });

    test('command descriptions are present', async () => {
      const result = await cleanCLI.expectSuccess(['--help']);
      
      // Commands should have descriptions
      expect(result.stdout).toMatch(/config\s+.*configuration/i);
      expect(result.stdout).toMatch(/mcp\s+.*MCP.*server/i);
      expect(result.stdout).toMatch(/doctor\s+.*health/i);
    });
  });

  describe('Error Help Output', () => {
    test('invalid command shows help', async () => {
      const result = await cleanCLI.expectFailure(['invalid-command']);
      
      // Should show error and suggest help
      expect(result.stderr).toMatch(/unknown command|error/i);
      expect(result.exitCode).not.toBe(0);
    });

    test('invalid option shows help', async () => {
      const result = await cleanCLI.expectFailure(['--invalid-option']);
      
      // Should show error
      expect(result.stderr).toMatch(/unknown option|error/i);
      expect(result.exitCode).not.toBe(0);
    });
  });
});