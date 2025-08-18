/**
 * Print Mode Session Handler
 * 
 * Handles the non-interactive --print mode for Claude Code CLI.
 * Processes single prompts and outputs results in specified formats.
 */

import { tokenManager } from '../auth/token.js';
import { configManager } from '../../config/manager.js';

/**
 * Execute Claude in print mode (non-interactive)
 * 
 * @param {string} prompt - The prompt to process
 * @param {object} options - Print mode options
 */
export async function executePrintMode(prompt, options) {
    if (options.debug) {
        console.error('Debug: Print mode starting...');
        console.error(`Debug: Options:`, JSON.stringify(options, null, 2));
    }
    
    // Validate prompt
    if (!prompt || prompt.trim() === '') {
        console.error('Error: No prompt provided for print mode');
        console.error('Usage: claude --print "your prompt here"');
        process.exit(1);
    }
    
    // Check authentication
    const isAuthenticated = await tokenManager.isAuthenticated();
    if (!isAuthenticated) {
        console.error('Error: No authentication token found');
        console.error('Please run "claude setup-token" to configure authentication');
        process.exit(1);
    }
    
    // Get configuration
    const config = configManager.list();
    const model = options.model || config.model || 'claude-3-5-sonnet-20241022';
    const outputFormat = options.outputFormat || 'text';
    
    if (options.debug) {
        console.error(`Debug: Using model: ${model}`);
        console.error(`Debug: Output format: ${outputFormat}`);
    }
    
    try {
        // Simulate API call (TODO: implement actual Claude API integration)
        const response = await simulateClaudeAPI(prompt, {
            model,
            token: await tokenManager.getToken(),
            outputFormat,
            maxTurns: options.maxTurns,
            systemPrompt: options.systemPrompt,
            debug: options.debug
        });
        
        // Format and output response
        await outputResponse(response, outputFormat, options);
        
    } catch (error) {
        if (options.debug) {
            console.error('Debug: Error in print mode:', error);
        }
        
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Simulate Claude API call (placeholder for actual implementation)
 * 
 * @param {string} prompt - User prompt
 * @param {object} options - API options
 * @returns {object} Simulated API response
 */
async function simulateClaudeAPI(prompt, options) {
    if (options.debug) {
        console.error('Debug: Simulating Claude API call...');
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
        content: [
            {
                type: 'text',
                text: `I received your prompt: "${prompt}"\n\n⚠️ This is a simulated response. The actual Claude API integration is not yet implemented.\n\nTo fully implement print mode, we would need to:\n1. Integrate with the Claude API\n2. Handle streaming responses\n3. Process tool calls\n4. Format output according to specifications\n\nModel: ${options.model}\nThis functionality will be implemented in a future version.`
            }
        ],
        usage: {
            input_tokens: 50,
            output_tokens: 100
        },
        model: options.model,
        id: `sim_${Date.now()}`,
        stop_reason: 'end_turn'
    };
}

/**
 * Output the response in the specified format
 * 
 * @param {object} response - API response
 * @param {string} format - Output format ('text', 'json', 'stream-json')
 * @param {object} options - Additional options
 */
async function outputResponse(response, format, options) {
    switch (format) {
        case 'json':
            // Single JSON result
            console.log(JSON.stringify(response, null, 2));
            break;
            
        case 'stream-json':
            // Streaming JSON format (simulate streaming)
            const chunks = [
                { type: 'response_start', response: { id: response.id, model: response.model } },
                { type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } },
                ...response.content[0].text.split(' ').map((word, i) => ({
                    type: 'content_block_delta',
                    index: 0,
                    delta: { type: 'text_delta', text: (i === 0 ? '' : ' ') + word }
                })),
                { type: 'content_block_stop', index: 0 },
                { type: 'message_delta', delta: { stop_reason: response.stop_reason } },
                { type: 'message_stop' }
            ];
            
            for (const chunk of chunks) {
                console.log(JSON.stringify(chunk));
                if (options.debug) {
                    // Add small delay to simulate streaming
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
            }
            break;
            
        case 'text':
        default:
            // Plain text output (default)
            for (const content of response.content) {
                if (content.type === 'text') {
                    console.log(content.text);
                }
            }
            break;
    }
}

/**
 * Process stdin input for print mode
 * 
 * @param {string} inputFormat - Input format ('text' or 'stream-json')
 * @returns {Promise<string>} Processed input
 */
export async function processStdinInput(inputFormat = 'text') {
    return new Promise((resolve, reject) => {
        let input = '';
        
        process.stdin.on('readable', () => {
            let chunk = process.stdin.read();
            if (chunk !== null) {
                input += chunk;
            }
        });
        
        process.stdin.on('end', () => {
            try {
                if (inputFormat === 'stream-json') {
                    // Parse streaming JSON input
                    const lines = input.trim().split('\n');
                    const messages = [];
                    
                    for (const line of lines) {
                        if (line.trim()) {
                            const parsed = JSON.parse(line);
                            if (parsed.type === 'message' && parsed.content) {
                                messages.push(parsed.content);
                            }
                        }
                    }
                    
                    resolve(messages.join('\n'));
                } else {
                    // Plain text input
                    resolve(input.trim());
                }
            } catch (error) {
                reject(new Error(`Failed to parse input: ${error.message}`));
            }
        });
        
        process.stdin.on('error', reject);
    });
}