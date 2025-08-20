/**
 * EventSource Polyfill for Node.js
 * 
 * Extracted from chunk_0151.js to avoid external dependency.
 * This is a minimal polyfill that provides the EventSource functionality
 * needed for our SSE transport without requiring the 'eventsource' package.
 */

import { EventEmitter } from 'events';
import https from 'https';
import http from 'http';
import { URL } from 'url';

// EventSource states
const CONNECTING = 0;
const OPEN = 1;
const CLOSED = 2;

/**
 * Minimal EventSource implementation for Node.js
 * Based on the W3C EventSource specification and the original Claude Code implementation
 */
export class EventSource extends EventEmitter {
    constructor(url, options = {}) {
        super();
        
        this.url = url;
        this.readyState = CONNECTING;
        this.withCredentials = options.withCredentials || false;
        
        // Internal state
        this._reconnectTime = options.reconnectTime || 3000;
        this._lastEventId = '';
        this._request = null;
        this._headers = {
            'Accept': 'text/event-stream',
            'Cache-Control': 'no-cache',
            ...(options.headers || {})
        };
        
        // Add Last-Event-ID header if needed
        if (this._lastEventId) {
            this._headers['Last-Event-ID'] = this._lastEventId;
        }
        
        // Start connection
        this._connect();
    }
    
    _connect() {
        const urlObj = new URL(this.url);
        const options = {
            headers: this._headers,
            timeout: 0 // Keep connection open
        };
        
        const httpModule = urlObj.protocol === 'https:' ? https : http;
        
        this._request = httpModule.request(urlObj, options, (response) => {
            if (response.statusCode === 200) {
                this.readyState = OPEN;
                this.emit('open');
                this._processStream(response);
            } else {
                this._handleError(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
            }
        });
        
        this._request.on('error', (error) => {
            this._handleError(error);
        });
        
        this._request.end();
    }
    
    _processStream(response) {
        let buffer = '';
        
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            buffer += chunk;
            
            // Process complete events (lines ending with double newline)
            const events = buffer.split('\n\n');
            buffer = events.pop(); // Keep incomplete event in buffer
            
            for (const eventData of events) {
                if (eventData.trim()) {
                    this._processEvent(eventData);
                }
            }
        });
        
        response.on('end', () => {
            if (this.readyState === OPEN) {
                this._reconnect();
            }
        });
        
        response.on('error', (error) => {
            this._handleError(error);
        });
    }
    
    _processEvent(eventData) {
        const lines = eventData.split('\n');
        const event = {
            type: 'message',
            data: '',
            id: null,
            retry: null
        };
        
        for (const line of lines) {
            if (line.startsWith('data:')) {
                event.data += (event.data ? '\n' : '') + line.slice(5).trim();
            } else if (line.startsWith('event:')) {
                event.type = line.slice(6).trim();
            } else if (line.startsWith('id:')) {
                event.id = line.slice(3).trim();
                this._lastEventId = event.id;
            } else if (line.startsWith('retry:')) {
                const retry = parseInt(line.slice(6).trim(), 10);
                if (!isNaN(retry)) {
                    event.retry = retry;
                    this._reconnectTime = retry;
                }
            }
        }
        
        // Create message event
        const messageEvent = {
            type: event.type,
            data: event.data,
            lastEventId: this._lastEventId,
            origin: new URL(this.url).origin
        };
        
        // Emit the event
        this.emit(event.type, messageEvent);
        this.emit('message', messageEvent);
    }
    
    _handleError(error) {
        this.emit('error', error);
        if (this.readyState === OPEN) {
            this._reconnect();
        }
    }
    
    _reconnect() {
        if (this.readyState === CLOSED) {
            return;
        }
        
        this.readyState = CONNECTING;
        
        setTimeout(() => {
            if (this.readyState !== CLOSED) {
                this._connect();
            }
        }, this._reconnectTime);
    }
    
    close() {
        this.readyState = CLOSED;
        
        if (this._request) {
            this._request.destroy();
            this._request = null;
        }
        
        this.removeAllListeners();
    }
}

// Export constants
EventSource.CONNECTING = CONNECTING;
EventSource.OPEN = OPEN;
EventSource.CLOSED = CLOSED;

export default EventSource;