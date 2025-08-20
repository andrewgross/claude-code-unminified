/**
 * Error Handler System Tests
 * 
 * Comprehensive tests for the error handling system including custom error types,
 * error processing, logging, and user-friendly error display.
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import {
    ClaudeCodeError,
    APIError,
    ValidationError,
    ModelOverloadError,
    AuthenticationError,
    ConfigurationError,
    NetworkError,
    ToolExecutionError,
    ErrorHandler,
    errorHandler,
    handleStreamError,
    generateErrorMessage,
    generateFallbackMessages,
    createSystemMessage
} from '../../src/utils/error-handler.js';

describe('Error Handler System', () => {
    let consoleOutput;
    
    beforeEach(() => {
        consoleOutput = {
            logs: [],
            errors: []
        };
        
        jest.spyOn(console, 'log').mockImplementation((...args) => {
            consoleOutput.logs.push(args.join(' '));
        });
        
        jest.spyOn(console, 'error').mockImplementation((...args) => {
            consoleOutput.errors.push(args.join(' '));
        });
    });
    
    afterEach(() => {
        jest.restoreAllMocks();
    });
    
    describe('Custom Error Types', () => {
        test('ClaudeCodeError should extend Error correctly', () => {
            const error = new ClaudeCodeError('Test message', 'TEST_CODE', { detail: 'test' });
            
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ClaudeCodeError);
            expect(error.name).toBe('ClaudeCodeError');
            expect(error.message).toBe('Test message');
            expect(error.code).toBe('TEST_CODE');
            expect(error.details).toEqual({ detail: 'test' });
            expect(error.timestamp).toBeDefined();
            expect(typeof error.timestamp).toBe('string');
        });
        
        test('APIError should have retry logic', () => {
            const retryableError = new APIError('Rate limited', 429, { retry: true });
            expect(retryableError.isRetryable).toBe(true);
            expect(retryableError.statusCode).toBe(429);
            
            const nonRetryableError = new APIError('Invalid request', 400, null);
            expect(nonRetryableError.isRetryable).toBe(false);
            expect(nonRetryableError.statusCode).toBe(400);
        });
        
        test('ValidationError should capture field information', () => {
            const error = new ValidationError('Invalid field', 'mcpServers', { invalid: true });
            
            expect(error.name).toBe('ValidationError');
            expect(error.field).toBe('mcpServers');
            expect(error.value).toEqual({ invalid: true });
            expect(error.code).toBe('VALIDATION_ERROR');
        });
        
        test('ModelOverloadError should handle fallback information', () => {
            const error = new ModelOverloadError('claude-3-opus', 'claude-3-sonnet');
            
            expect(error.name).toBe('ModelOverloadError');
            expect(error.originalModel).toBe('claude-3-opus');
            expect(error.fallbackModel).toBe('claude-3-sonnet');
            expect(error.statusCode).toBe(429);
        });
        
        test('NetworkError should distinguish timeout errors', () => {
            const timeoutError = new NetworkError('Request timeout', 'https://api.example.com', true);
            expect(timeoutError.timeout).toBe(true);
            expect(timeoutError.code).toBe('NETWORK_TIMEOUT');
            
            const connectionError = new NetworkError('Connection failed', 'https://api.example.com', false);
            expect(connectionError.timeout).toBe(false);
            expect(connectionError.code).toBe('NETWORK_ERROR');
        });
    });
    
    describe('ErrorHandler Class', () => {
        let handler;
        
        beforeEach(() => {
            handler = new ErrorHandler({
                debug: false,
                verbose: false,
                logErrors: true,
                exitOnFatal: false // Don't exit during tests
            });
        });
        
        test('should handle basic errors', () => {
            const error = new Error('Test error');
            const result = handler.handle(error, { action: 'test' });
            
            expect(result.handled).toBe(true);
            expect(result.error).toBe(error);
            expect(result.context).toEqual({ action: 'test' });
            expect(result.fatal).toBe(false);
            expect(consoleOutput.errors.length).toBeGreaterThan(0);
        });
        
        test('should handle API errors specifically', () => {
            const apiError = new APIError('Rate limit exceeded', 429);
            handler.handleAPIError(apiError);
            
            expect(consoleOutput.errors.some(msg => msg.includes('API Error'))).toBe(true);
            expect(consoleOutput.errors.some(msg => msg.includes('Status: 429'))).toBe(true);
            expect(consoleOutput.errors.some(msg => msg.includes('temporary'))).toBe(true);
        });
        
        test('should handle validation errors with suggestions', () => {
            const validationError = new ValidationError('Invalid MCP config', 'mcpServers', {});
            handler.handleValidationError(validationError);
            
            expect(consoleOutput.errors.some(msg => msg.includes('Configuration Error'))).toBe(true);
            expect(consoleOutput.errors.some(msg => msg.includes('Field: mcpServers'))).toBe(true);
        });
        
        test('should identify retryable errors correctly', () => {
            const retryableError = new APIError('Timeout', 504);
            const nonRetryableError = new ValidationError('Bad config');
            const networkError = new NetworkError('Connection lost');
            
            expect(handler.isRetryableError(retryableError)).toBe(true);
            expect(handler.isRetryableError(nonRetryableError)).toBe(false);
            expect(handler.isRetryableError(networkError)).toBe(true);
        });
        
        test('should generate error messages for API responses', () => {
            const error = new ModelOverloadError('claude-3-opus', 'claude-3-sonnet');
            const message = handler.generateErrorMessage(error, 'claude-3-opus', false);
            
            expect(message.type).toBe('error');
            expect(message.model).toBe('claude-3-opus');
            expect(message.error.retryable).toBe(true);
            expect(message.error.fallbackAvailable).toBe(true);
            expect(message.error.fallbackModel).toBe('claude-3-sonnet');
        });
        
        test('should generate fallback messages', () => {
            const assistantMessages = [
                { type: 'assistant', content: 'Partial response...' }
            ];
            const messages = handler.generateFallbackMessages(assistantMessages, 'API timeout');
            
            expect(messages).toHaveLength(2);
            expect(messages[0].type).toBe('system');
            expect(messages[0].content).toContain('API timeout');
            expect(messages[1].content).toContain('interrupted');
        });
        
        test('should create system messages', () => {
            const message = handler.createSystemMessage('Operation completed', 'info');
            
            expect(message.type).toBe('system');
            expect(message.content).toBe('Operation completed');
            expect(message.level).toBe('info');
            expect(message.timestamp).toBeDefined();
        });
    });
    
    describe('Stream Error Handling', () => {
        test('should handle stream errors', () => {
            const streamError = new Error('Stream interrupted');
            streamError.code = 'STREAM_ERROR';
            
            handleStreamError(streamError, { stream: 'test-stream' });
            
            expect(consoleOutput.errors.some(msg => msg.includes('Stream Error'))).toBe(true);
        });
    });
    
    describe('Helper Functions', () => {
        test('generateErrorMessage should format errors correctly', () => {
            const error = new APIError('Service unavailable', 503);
            const message = generateErrorMessage(error, 'claude-3-sonnet', true);
            
            expect(message.type).toBe('error');
            expect(message.model).toBe('claude-3-sonnet');
            expect(message.error.statusCode).toBe(503);
            expect(message.error.retryable).toBe(true);
        });
        
        test('generateFallbackMessages should create proper generator', () => {
            const assistantMessages = [];
            const generator = generateFallbackMessages(assistantMessages, 'Test reason');
            const messages = Array.from(generator);
            
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('system');
            expect(messages[0].content).toContain('Test reason');
        });
        
        test('createSystemMessage should create proper message format', () => {
            const message = createSystemMessage('Test message', 'warning');
            
            expect(message.type).toBe('system');
            expect(message.content).toBe('Test message');
            expect(message.level).toBe('warning');
            expect(typeof message.timestamp).toBe('string');
        });
    });
    
    describe('Error Handler Integration', () => {
        test('singleton instance should be available', () => {
            expect(errorHandler).toBeInstanceOf(ErrorHandler);
            expect(errorHandler.handle).toBeInstanceOf(Function);
        });
        
        test('should handle errors in debug mode', () => {
            const debugHandler = new ErrorHandler({ debug: true, exitOnFatal: false });
            const error = new Error('Debug test');
            error.stack = 'Error: Debug test\n    at test';
            
            debugHandler.handle(error);
            
            expect(consoleOutput.errors.some(msg => msg.includes('Stack:'))).toBe(true);
        });
        
        test('should handle errors in verbose mode', () => {
            const verboseHandler = new ErrorHandler({ verbose: true, exitOnFatal: false });
            const error = new Error('Verbose test');
            
            verboseHandler.handle(error, { userId: 123, action: 'test' });
            
            expect(consoleOutput.errors.some(msg => msg.includes('Context:'))).toBe(true);
        });
    });
    
    describe('Error Serialization', () => {
        test('ClaudeCodeError should serialize to JSON', () => {
            const error = new ClaudeCodeError('Serialization test', 'SERIAL_TEST', { data: 'value' });
            const json = error.toJSON();
            
            expect(json.name).toBe('ClaudeCodeError');
            expect(json.message).toBe('Serialization test');
            expect(json.code).toBe('SERIAL_TEST');
            expect(json.details).toEqual({ data: 'value' });
            expect(json.timestamp).toBeDefined();
            expect(json.stack).toBeDefined();
        });
    });
});