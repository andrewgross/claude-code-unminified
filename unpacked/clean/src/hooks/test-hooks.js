/**
 * Quick test of the hooks system
 */

import { hooksManager } from './manager.js';

// Test hook matchers configuration
const testHookMatchers = {
    "PreToolUse": [
        {
            matcher: "*",
            hooks: [
                {
                    type: "command",
                    command: "echo",
                    timeout: 5
                }
            ]
        }
    ],
    "UserPromptSubmit": [
        {
            matcher: "*", 
            hooks: [
                {
                    type: "command",
                    command: "echo",
                    timeout: 5
                }
            ]
        }
    ]
};

// Test the hooks system
async function testHooks() {
    console.log('Testing hooks system...');
    
    // Load test configuration
    hooksManager.loadHookMatchers(testHookMatchers);
    
    // Test UserPromptSubmit hook
    console.log('\n--- Testing UserPromptSubmit Hook ---');
    try {
        for await (const result of hooksManager.executeUserPromptSubmitHooks('test prompt')) {
            console.log('Hook result:', result);
        }
    } catch (error) {
        console.error('Hook failed:', error.message);
    }
    
    // Test PreToolUse hook
    console.log('\n--- Testing PreToolUse Hook ---');
    try {
        for await (const result of hooksManager.executePreToolHooks('TestTool', { param: 'value' })) {
            console.log('Hook result:', result);
        }
    } catch (error) {
        console.error('Hook failed:', error.message);
    }
    
    // Get stats
    console.log('\n--- Hook Statistics ---');
    console.log(JSON.stringify(hooksManager.getStats(), null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) {
    testHooks().catch(console.error);
}