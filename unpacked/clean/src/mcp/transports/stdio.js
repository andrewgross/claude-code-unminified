/**
 * MCP Stdio Transport
 * 
 * Local stdio transport for MCP servers that run as child processes.
 * Handles process lifecycle, message serialization, and error handling.
 */

import { spawn } from 'child_process';
import { EventEmitter } from 'events';

/**
 * Stdio Transport for MCP
 * 
 * Runs MCP servers as local child processes and communicates via stdin/stdout.
 */
export class StdioTransport extends EventEmitter {
    constructor(options) {
        super();
        
        this.command = options.command;
        this.args = options.args || [];
        this.env = options.env || {};
        this.cwd = options.cwd || process.cwd();
        this.timeout = options.timeout || 30000;
        
        this.type = 'stdio';
        this.serverName = null;
        this.config = null;
        
        // Process state
        this._process = null;
        this._connected = false;
        this._messageQueue = [];
        this._messageId = 0;
        this._pendingResponses = new Map();
        
        // Event handlers
        this.onopen = null;
        this.onmessage = null;
        this.onerror = null;
        this.onclose = null;
    }
    
    /**
     * Start the stdio transport
     */
    async start() {
        if (this._process) {
            throw new Error('Stdio transport already started');
        }
        
        return new Promise((resolve, reject) => {
            try {
                // Spawn child process
                this._process = spawn(this.command, this.args, {
                    stdio: ['pipe', 'pipe', 'pipe'],
                    env: { ...process.env, ...this.env },
                    cwd: this.cwd
                });
                
                // Set up process event handlers
                this._process.on('error', (error) => {
                    this._handleError(new Error(`Process spawn failed: ${error.message}`));
                    reject(error);
                });
                
                this._process.on('exit', (code, signal) => {
                    this._connected = false;
                    const message = `Process exited with code ${code} (signal: ${signal})`;
                    console.log(message);
                    
                    if (this.onclose) {
                        this.onclose();
                    }
                    
                    this.emit('close', { code, signal });
                });
                
                // Set up stdio handlers
                this._process.stdout.on('data', (data) => {
                    this._handleStdoutData(data);
                });
                
                this._process.stderr.on('data', (data) => {
                    const errorMsg = data.toString().trim();
                    if (errorMsg) {
                        console.warn(`[${this.serverName}] stderr:`, errorMsg);
                    }
                });
                
                // Mark as connected
                this._connected = true;
                
                if (this.onopen) {
                    this.onopen();
                }
                
                this.emit('open');
                resolve();
                
            } catch (error) {
                reject(new Error(`Failed to start stdio transport: ${error.message}`));
            }
        });
    }
    
    /**
     * Send message to MCP server
     */
    async send(message) {
        if (!this._connected || !this._process) {
            throw new Error('Not connected');
        }
        
        try {
            const messageWithId = {
                ...message,
                id: message.id || this._generateMessageId()
            };
            
            const serialized = JSON.stringify(messageWithId) + '\n';
            
            return new Promise((resolve, reject) => {
                this._process.stdin.write(serialized, (error) => {
                    if (error) {
                        reject(new Error(`Failed to write to stdin: ${error.message}`));
                    } else {
                        // Store pending response handler if this is a request
                        if (messageWithId.method) {
                            this._pendingResponses.set(messageWithId.id, { resolve, reject });
                            
                            // Set timeout for response
                            setTimeout(() => {
                                if (this._pendingResponses.has(messageWithId.id)) {
                                    this._pendingResponses.delete(messageWithId.id);
                                    reject(new Error(`Request timeout for message ${messageWithId.id}`));
                                }
                            }, this.timeout);
                        } else {
                            resolve();
                        }
                    }
                });
            });
            
        } catch (error) {
            this._handleError(error);
            throw error;
        }
    }
    
    /**
     * Close the transport
     */
    async close() {
        if (!this._process) {
            return;
        }
        
        this._connected = false;
        
        try {
            // Gracefully close stdin
            if (this._process.stdin && !this._process.stdin.destroyed) {
                this._process.stdin.end();
            }
            
            // Give process time to exit gracefully
            await new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    if (this._process && !this._process.killed) {
                        this._process.kill('SIGTERM');
                    }
                    resolve();
                }, 5000);
                
                if (this._process) {
                    this._process.once('exit', () => {
                        clearTimeout(timeout);
                        resolve();
                    });
                } else {
                    clearTimeout(timeout);
                    resolve();
                }
            });
            
            // Force kill if still running
            if (this._process && !this._process.killed) {
                this._process.kill('SIGKILL');
            }
            
        } catch (error) {
            console.warn('Error during stdio transport close:', error);
        } finally {
            this._process = null;
            
            if (this.onclose) {
                this.onclose();
            }
            
            this.emit('close');
        }
    }
    
    /**
     * Check if transport is connected
     */
    isConnected() {
        return this._connected && this._process && !this._process.killed;
    }
    
    /**
     * Get connection status
     */
    getConnectionStatus() {
        return {
            connected: this.isConnected(),
            command: this.command,
            args: this.args,
            pid: this._process?.pid,
            killed: this._process?.killed || false
        };
    }
    
    // Private methods
    
    /**
     * Handle stdout data from process
     */
    _handleStdoutData(data) {
        const lines = data.toString().split('\n');
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;
            
            try {
                const message = JSON.parse(trimmedLine);
                this._handleMessage(message);
            } catch (error) {
                console.warn(`Failed to parse MCP message: ${trimmedLine}`, error);
            }
        }
    }
    
    /**
     * Handle parsed MCP message
     */
    _handleMessage(message) {
        // Handle response to pending request
        if (message.id && this._pendingResponses.has(message.id)) {
            const { resolve, reject } = this._pendingResponses.get(message.id);
            this._pendingResponses.delete(message.id);
            
            if (message.error) {
                reject(new Error(`MCP Error: ${message.error.message}`));
            } else {
                resolve(message.result);
            }
            return;
        }
        
        // Handle incoming request or notification
        if (this.onmessage) {
            this.onmessage(message);
        }
        
        this.emit('message', message);
    }
    
    /**
     * Handle transport error
     */
    _handleError(error) {
        console.error('Stdio transport error:', error);
        
        if (this.onerror) {
            this.onerror(error);
        }
        
        this.emit('error', error);
    }
    
    /**
     * Generate unique message ID
     */
    _generateMessageId() {
        return `stdio_${++this._messageId}_${Date.now()}`;
    }
}

/**
 * Create stdio transport with default configuration
 */
export function createStdioTransport(command, options = {}) {
    return new StdioTransport({
        command,
        ...options
    });
}