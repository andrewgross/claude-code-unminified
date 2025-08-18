/**
 * Jest Configuration for Claude Code CLI Testing
 * 
 * Configured for ES modules support and comprehensive testing
 */

export default {
  // Use ES modules
  preset: null,
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(execa|strip-final-newline|npm-run-path|path-key|shebang-command|shebang-regex|which|isexe|cross-spawn|human-signals|mimic-fn|onetime|signal-exit|strip-final-newline)/)'
  ],
  
  // Test patterns
  testMatch: [
    '<rootDir>/tests/**/*.test.js',
    '<rootDir>/tests/**/*.spec.js'
  ],
  
  // Coverage configuration
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Test environment setup
  setupFilesAfterEnv: ['<rootDir>/tests/helpers/setup.js'],
  
  // Timeout configuration
  testTimeout: 30000,
  
  // Reporter configuration
  reporters: ['default'],
  
  // Verbose output for debugging
  verbose: false,
  
  // Exit on first test failure in CI
  bail: process.env.CI ? 1 : 0,
  
  // Mock configuration
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  
  // Test file detection
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/'
  ]
};