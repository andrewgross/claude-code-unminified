/**
 * Jest Test Setup
 * 
 * Global configuration and utilities for all tests
 */

import { beforeEach, afterEach, jest } from '@jest/globals';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

// Global test configuration
const TEST_TIMEOUT = 30000;
const TEST_CONFIG_DIR = path.join(os.tmpdir(), 'claude-code-test-config');

// Clean up test environment before each test
beforeEach(async () => {
  // Clear any environment variables that might affect tests
  delete process.env.CLAUDE_API_KEY;
  delete process.env.CLAUDE_CONFIG_DIR;
  
  // Set test-specific environment
  process.env.NODE_ENV = 'test';
  process.env.CLAUDE_CONFIG_DIR = TEST_CONFIG_DIR;
  
  // Ensure test config directory exists and is clean
  if (fs.existsSync(TEST_CONFIG_DIR)) {
    fs.rmSync(TEST_CONFIG_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_CONFIG_DIR, { recursive: true });
  
  // Mock console output for cleaner test output
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Clean up after each test
afterEach(async () => {
  // Restore console
  jest.restoreAllMocks();
  
  // Clean up test config directory
  if (fs.existsSync(TEST_CONFIG_DIR)) {
    try {
      fs.rmSync(TEST_CONFIG_DIR, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  }
});

// Global test utilities
global.testUtils = {
  /**
   * Get a temporary test directory
   */
  getTempDir: () => {
    const tempDir = path.join(os.tmpdir(), `claude-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    fs.mkdirSync(tempDir, { recursive: true });
    return tempDir;
  },
  
  /**
   * Create a test configuration file
   */
  createTestConfig: (config = {}, global = false) => {
    const configPath = global 
      ? path.join(TEST_CONFIG_DIR, 'global.json')
      : path.join(TEST_CONFIG_DIR, 'local.json');
    
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return configPath;
  },
  
  /**
   * Create a test token file
   */
  createTestToken: (token = 'test-token-12345') => {
    const tokenDir = path.join(TEST_CONFIG_DIR, 'auth');
    const tokenPath = path.join(tokenDir, 'token');
    
    fs.mkdirSync(tokenDir, { recursive: true });
    fs.writeFileSync(tokenPath, token);
    fs.chmodSync(tokenPath, 0o600);
    return tokenPath;
  },
  
  /**
   * Wait for a specified amount of time
   */
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  /**
   * Get test fixtures path
   */
  getFixturePath: (filename) => path.join(process.cwd(), 'tests', 'fixtures', filename),
  
  /**
   * Mock process.exit for tests
   */
  mockProcessExit: () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    return mockExit;
  },
  
  /**
   * Capture console output
   */
  captureConsole: () => {
    const logs = [];
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => logs.push({ type: 'log', args });
    console.error = (...args) => logs.push({ type: 'error', args });
    
    return {
      logs,
      restore: () => {
        console.log = originalLog;
        console.error = originalError;
      }
    };
  }
};

// Increase default timeout for all tests
jest.setTimeout(TEST_TIMEOUT);