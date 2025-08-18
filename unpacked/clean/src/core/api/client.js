/**
 * Claude API Client
 * 
 * Handles communication with the Claude API for message processing.
 * Supports streaming responses and tool calls.
 */

import { tokenManager } from '../auth/token.js';

// API Configuration
const CLAUDE_API_BASE = 'https://api.anthropic.com';
const API_VERSION = '2023-06-01';

export class ClaudeAPIClient {
    constructor(options = {}) {
        this.baseURL = options.baseURL || CLAUDE_API_BASE;
        this.version = options.version || API_VERSION;
        this.defaultModel = options.model || 'claude-3-5-sonnet-20241022';
        this.timeout = options.timeout || 30000;
    }

    /**
     * Get authentication headers
     */
    async _getHeaders() {
        const token = await tokenManager.getToken();
        if (!token) {
            throw new Error('No authentication token available. Run "claude setup-token" to configure.');
        }

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'anthropic-version': this.version,
            'User-Agent': 'claude-code-clean/1.0.0'
        };
    }

    /**
     * Make API request
     */
    async _request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = await this._getHeaders();

        const requestOptions = {
            method: options.method || 'POST',
            headers: {
                ...headers,
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error?.message || errorMessage;
                } catch {
                    // Use the basic error message if JSON parsing fails
                }

                throw new Error(errorMessage);
            }

            return response;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }

    /**
     * Send message to Claude API
     */
    async sendMessage(options) {
        const {
            messages,
            model = this.defaultModel,
            maxTokens = 4096,
            systemPrompt,
            temperature = 0.7,
            stream = false,
            tools = []
        } = options;

        const requestBody = {
            model,
            max_tokens: maxTokens,
            messages: this._formatMessages(messages),
            temperature
        };

        if (systemPrompt) {
            requestBody.system = systemPrompt;
        }

        if (tools && tools.length > 0) {
            requestBody.tools = tools;
        }

        if (stream) {
            requestBody.stream = true;
            return this._streamResponse('/v1/messages', requestBody);
        } else {
            const response = await this._request('/v1/messages', {
                method: 'POST',
                body: JSON.stringify(requestBody)
            });

            return await response.json();
        }
    }

    /**
     * Stream response from API
     */
    async _streamResponse(endpoint, requestBody) {
        const response = await this._request(endpoint, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Accept': 'text/event-stream'
            }
        });

        if (!response.body) {
            throw new Error('Streaming not supported');
        }

        return this._parseEventStream(response.body);
    }

    /**
     * Parse Server-Sent Events stream
     */
    async *_parseEventStream(stream) {
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        try {
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep incomplete line in buffer

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6).trim();
                        
                        if (data === '[DONE]') {
                            return;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            yield parsed;
                        } catch (error) {
                            console.warn('Failed to parse streaming data:', data);
                        }
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }
    }

    /**
     * Format messages for API
     */
    _formatMessages(messages) {
        return messages.map(message => {
            if (typeof message === 'string') {
                return { role: 'user', content: message };
            }

            return {
                role: message.role || 'user',
                content: message.content || message.text || ''
            };
        });
    }

    /**
     * Test API connectivity
     */
    async testConnection() {
        try {
            const response = await this.sendMessage({
                messages: [{ role: 'user', content: 'Hello, this is a connection test.' }],
                maxTokens: 50
            });

            return {
                success: true,
                model: response.model,
                usage: response.usage
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get available models (placeholder)
     */
    async getModels() {
        // TODO: Implement actual model listing if API supports it
        return [
            { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet' },
            { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
            { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' }
        ];
    }
}

// Export singleton instance
export const claudeAPIClient = new ClaudeAPIClient();