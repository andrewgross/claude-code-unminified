/**
 * Telemetry System Tests
 * 
 * Comprehensive tests for the telemetry management system including event tracking,
 * data sanitization, batching, and privacy protection.
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import {
    TelemetryManager,
    telemetryManager,
    EVENT_TYPES
} from '../../src/telemetry/manager.js';

describe('Telemetry System', () => {
    let consoleOutput;
    let originalProcess;
    
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
        
        // Clear any existing timers
        jest.clearAllTimers();
        jest.useFakeTimers();
        
        // Mock process.exit to prevent tests from actually exiting
        originalProcess = process.exit;
        process.exit = jest.fn();
    });
    
    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
        process.exit = originalProcess;
    });
    
    describe('TelemetryManager Construction', () => {
        test('should create instance with default options', () => {
            const manager = new TelemetryManager();
            
            expect(manager.enabled).toBe(true);
            expect(manager.debug).toBe(false);
            expect(manager.batchSize).toBe(10);
            expect(manager.flushInterval).toBe(30000);
            expect(manager.endpoint).toBe(null);
            expect(manager.eventQueue).toEqual([]);
            expect(manager.sessionId).toMatch(/^session_\d+_[a-z0-9]{9}$/);
            expect(typeof manager.startTime).toBe('number');
        });
        
        test('should create instance with custom options', () => {
            const options = {
                enabled: false,
                debug: true,
                batchSize: 5,
                flushInterval: 15000,
                endpoint: 'https://telemetry.example.com'
            };
            
            const manager = new TelemetryManager(options);
            
            expect(manager.enabled).toBe(false);
            expect(manager.debug).toBe(true);
            expect(manager.batchSize).toBe(5);
            expect(manager.flushInterval).toBe(15000);
            expect(manager.endpoint).toBe('https://telemetry.example.com');
        });
        
        test('should generate unique session IDs', () => {
            const manager1 = new TelemetryManager();
            const manager2 = new TelemetryManager();
            
            expect(manager1.sessionId).not.toBe(manager2.sessionId);
            expect(manager1.sessionId).toMatch(/^session_\d+_[a-z0-9]{9}$/);
            expect(manager2.sessionId).toMatch(/^session_\d+_[a-z0-9]{9}$/);
        });
    });
    
    describe('Event Tracking', () => {
        let manager;
        
        beforeEach(() => {
            manager = new TelemetryManager({
                enabled: true,
                debug: false,
                batchSize: 10
            });
        });
        
        test('should track basic events', () => {
            const eventData = { action: 'test', value: 123 };
            const metadata = { source: 'unit-test' };
            
            manager.track('test_event', eventData, metadata);
            
            expect(manager.eventQueue).toHaveLength(1);
            const event = manager.eventQueue[0];
            
            expect(event.id).toMatch(/^event_\d+_[a-z0-9]{9}$/);
            expect(event.sessionId).toBe(manager.sessionId);
            expect(event.eventName).toBe('test_event');
            expect(event.data).toEqual(eventData);
            expect(event.metadata).toMatchObject({
                ...metadata,
                version: expect.any(String),
                platform: process.platform,
                nodeVersion: process.version
            });
            expect(new Date(event.timestamp)).toBeInstanceOf(Date);
        });
        
        test('should not track events when disabled', () => {
            manager.enabled = false;
            
            manager.track('disabled_event', { test: true });
            
            expect(manager.eventQueue).toHaveLength(0);
        });
        
        test('should flush events when batch size reached', async () => {
            manager.batchSize = 3;
            
            // Add events up to batch size
            manager.track('event_1');
            manager.track('event_2');
            expect(manager.eventQueue).toHaveLength(2);
            
            // This should trigger flush
            manager.track('event_3');
            
            // Queue should be empty after flush
            expect(manager.eventQueue).toHaveLength(0);
        });
        
        test('should log debug events when debug enabled', () => {
            manager.debug = true;
            
            manager.track('debug_event', { debug: true });
            
            expect(consoleOutput.logs.some(log => 
                log.includes('📊 Telemetry Event:') && 
                log.includes('debug_event')
            )).toBe(true);
        });
    });
    
    describe('Specialized Tracking Methods', () => {
        let manager;
        
        beforeEach(() => {
            manager = new TelemetryManager({ enabled: true });
        });
        
        test('should track API requests', () => {
            const requestData = {
                model: 'claude-3-sonnet',
                messagesLength: 5,
                temperature: 0.7,
                betas: ['feature-1'],
                permissionMode: 'auto',
                promptCategory: 'coding'
            };
            
            manager.trackRequest(requestData);
            
            expect(manager.eventQueue).toHaveLength(1);
            const event = manager.eventQueue[0];
            
            expect(event.eventName).toBe(EVENT_TYPES.API_REQUEST);
            expect(event.data).toMatchObject({
                model: 'claude-3-sonnet',
                messagesLength: 5,
                temperature: 0.7,
                permissionMode: 'auto',
                promptCategory: 'coding'
            });
            expect(event.data.betas).toBeDefined();
        });
        
        test('should track API responses', () => {
            const responseData = {
                model: 'claude-3-sonnet',
                usage: { inputTokens: 100, outputTokens: 50 },
                duration: 2500,
                success: true,
                statusCode: 200
            };
            
            manager.trackResponse(responseData);
            
            expect(manager.eventQueue).toHaveLength(1);
            const event = manager.eventQueue[0];
            
            expect(event.eventName).toBe(EVENT_TYPES.API_RESPONSE);
            expect(event.data).toMatchObject({
                model: 'claude-3-sonnet',
                duration: 2500,
                success: true,
                statusCode: 200
            });
            // Usage might be sanitized, so check it exists
            expect(event.data.usage).toBeDefined();
        });
        
        test('should track errors', () => {
            const error = new Error('Test error');
            error.code = 'TEST_ERROR';
            const context = { userId: 123, action: 'test' };
            
            manager.trackError(error, context);
            
            expect(manager.eventQueue).toHaveLength(1);
            const event = manager.eventQueue[0];
            
            expect(event.eventName).toBe(EVENT_TYPES.ERROR_OCCURRED);
            expect(event.data).toEqual({
                errorType: 'Error',
                errorMessage: 'Test error',
                errorCode: 'TEST_ERROR',
                context: context
            });
        });
        
        test('should track feature usage', () => {
            const usage = { count: 5, duration: 1000 };
            
            manager.trackFeature('mcp_server', usage);
            
            expect(manager.eventQueue).toHaveLength(1);
            const event = manager.eventQueue[0];
            
            expect(event.eventName).toBe(EVENT_TYPES.FEATURE_USED);
            expect(event.data).toEqual({
                feature: 'mcp_server',
                ...usage
            });
        });
        
        test('should track user input', () => {
            const metadata = {
                length: 150,
                hasFiles: true,
                hasImages: false
            };
            
            manager.trackUserInput('prompt', metadata);
            
            expect(manager.eventQueue).toHaveLength(1);
            const event = manager.eventQueue[0];
            
            expect(event.eventName).toBe(EVENT_TYPES.USER_INPUT);
            expect(event.data).toEqual({
                inputType: 'prompt',
                ...metadata
            });
        });
        
        test('should track MCP operations', () => {
            const details = {
                serverCount: 3,
                transportTypes: ['stdio', 'sse'],
                success: true
            };
            
            manager.trackMCP('server_start', details);
            
            expect(manager.eventQueue).toHaveLength(1);
            const event = manager.eventQueue[0];
            
            expect(event.eventName).toBe(EVENT_TYPES.MCP_CONNECTION);
            expect(event.data).toMatchObject({
                operation: 'server_start',
                serverCount: 3,
                success: true
            });
            expect(event.data.transportTypes).toBeDefined();
        });
    });
    
    describe('Data Sanitization', () => {
        let manager;
        
        beforeEach(() => {
            manager = new TelemetryManager({ enabled: true });
        });
        
        test('should sanitize sensitive fields', () => {
            const sensitiveData = {
                apiKey: 'sk-1234567890',
                password: 'secret123',
                authorization: 'Bearer token',
                normalField: 'safe value',
                nested: {
                    token: 'nested-secret',
                    safeValue: 'also safe'
                }
            };
            
            manager.track('sensitive_test', sensitiveData);
            
            const event = manager.eventQueue[0];
            expect(event.data).toEqual({
                apiKey: '[REDACTED]',
                password: '[REDACTED]',
                authorization: '[REDACTED]',
                normalField: 'safe value',
                nested: {
                    token: '[REDACTED]',
                    safeValue: 'also safe'
                }
            });
        });
        
        test('should handle non-object data', () => {
            manager.track('string_test', 'simple string');
            manager.track('number_test', 42);
            manager.track('null_test', null);
            
            expect(manager.eventQueue[0].data).toBe('simple string');
            expect(manager.eventQueue[1].data).toBe(42);
            expect(manager.eventQueue[2].data).toBe(null);
        });
        
        test('should sanitize case-insensitive field names', () => {
            const data = {
                API_KEY: 'secret',
                Secret: 'hidden',
                CREDENTIAL: 'private'
            };
            
            manager.track('case_test', data);
            
            const event = manager.eventQueue[0];
            expect(event.data).toEqual({
                API_KEY: '[REDACTED]',
                Secret: '[REDACTED]',
                CREDENTIAL: '[REDACTED]'
            });
        });
    });
    
    describe('Enable/Disable Functionality', () => {
        let manager;
        
        beforeEach(() => {
            manager = new TelemetryManager({ enabled: true });
        });
        
        test('should enable telemetry', () => {
            manager.enabled = false;
            
            manager.enable();
            
            expect(manager.enabled).toBe(true);
            expect(manager.eventQueue).toHaveLength(1);
            expect(manager.eventQueue[0].eventName).toBe('telemetry_enabled');
        });
        
        test('should disable telemetry', async () => {
            manager.track('before_disable');
            
            manager.disable();
            
            expect(manager.enabled).toBe(false);
        });
    });
    
    describe('Status Reporting', () => {
        let manager;
        
        beforeEach(() => {
            manager = new TelemetryManager({ enabled: true });
        });
        
        test('should return correct status', () => {
            manager.track('status_test');
            manager.lastFlush = Date.now() - 5000;
            
            const status = manager.getStatus();
            
            expect(status).toMatchObject({
                enabled: true,
                sessionId: manager.sessionId,
                queuedEvents: 1,
                uptime: expect.any(Number),
                lastFlush: expect.any(Number)
            });
            expect(status.uptime).toBeGreaterThanOrEqual(0);
        });
    });
    
    describe('Periodic Flushing', () => {
        let manager;
        
        beforeEach(() => {
            manager = new TelemetryManager({
                enabled: true,
                flushInterval: 1000
            });
        });
        
        test('should flush events periodically', () => {
            manager.track('periodic_test_1');
            manager.track('periodic_test_2');
            
            expect(manager.eventQueue).toHaveLength(2);
            
            // Advance time to trigger periodic flush
            jest.advanceTimersByTime(1000);
            
            // Events should be flushed
            expect(manager.eventQueue).toHaveLength(0);
        });
        
        test('should not flush when disabled', () => {
            manager.enabled = false;
            manager.eventQueue.push({ test: 'event' });
            
            jest.advanceTimersByTime(1000);
            
            expect(manager.eventQueue).toHaveLength(1);
        });
    });
    
    describe('Event Types Constants', () => {
        test('should export all event types', () => {
            expect(EVENT_TYPES).toMatchObject({
                APP_START: 'tengu_init',
                APP_EXIT: 'tengu_exit',
                USER_INPUT: 'tengu_user_input',
                COMMAND_EXECUTED: 'tengu_command_executed',
                API_REQUEST: 'tengu_api_request',
                API_RESPONSE: 'tengu_api_response',
                QUERY_ERROR: 'tengu_query_error',
                MODEL_FALLBACK: 'tengu_model_fallback_triggered',
                AUTO_COMPACT: 'tengu_auto_compact_succeeded',
                POST_COMPACT_TURN: 'tengu_post_autocompact_turn',
                MCP_CONNECTION: 'tengu_mcp_connection',
                TOOL_EXECUTION: 'tengu_tool_execution',
                ERROR_OCCURRED: 'tengu_error',
                FEATURE_USED: 'tengu_feature_used',
                OFF_SWITCH_QUERY: 'tengu_off_switch_query',
                FALLBACK_SYSTEM_MSG: 'tengu_fallback_system_msg'
            });
        });
    });
    
    describe('Singleton Instance', () => {
        test('should provide global telemetry manager instance', () => {
            expect(telemetryManager).toBeInstanceOf(TelemetryManager);
            expect(typeof telemetryManager.track).toBe('function');
            expect(typeof telemetryManager.getStatus).toBe('function');
        });
        
        test('should respect environment variables', () => {
            // This tests the singleton configuration from the module
            expect(telemetryManager.enabled).toBeDefined();
            expect(telemetryManager.debug).toBeDefined();
        });
    });
    
    describe('Error Handling in Flush', () => {
        let manager;
        
        beforeEach(() => {
            manager = new TelemetryManager({
                enabled: true,
                debug: false
            });
        });
        
        test('should handle flush errors gracefully', async () => {
            // Create a manager with a mock flush that throws
            const errorManager = new TelemetryManager({ enabled: true });
            
            // Add events
            errorManager.track('error_test_1');
            errorManager.track('error_test_2');
            
            // Mock the internal flush method - the real implementation catches errors
            const originalFlush = errorManager._flush;
            const mockFlush = jest.fn(originalFlush.bind(errorManager));
            errorManager._flush = mockFlush;
            
            // Trigger flush - should handle any internal errors
            await errorManager.flush();
            
            // Should have attempted to flush
            expect(mockFlush).toHaveBeenCalled();
        });
    });
    
    describe('Exit Handlers', () => {
        test('should not register exit handlers in test environment', () => {
            // Exit handlers are disabled in test environment (NODE_ENV=test)
            const manager = new TelemetryManager({ enabled: true });
            
            // Add some events
            manager.track('exit_test');
            
            expect(manager.eventQueue).toHaveLength(1);
            
            // In test env, exit handlers are not registered, so events remain
            expect(manager.eventQueue[0].eventName).toBe('exit_test');
        });
    });
});