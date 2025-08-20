/**
 * Message List Component
 * 
 * Displays the conversation history with proper formatting and styling.
 * Handles different message types and provides scrolling behavior.
 */

import React, { useEffect, useRef } from 'react';
import { Box, Text, Newline } from 'ink';

export function MessageList({ messages, isProcessing, debug = false }) {
    const messagesEndRef = useRef();

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView?.({ behavior: 'smooth' });
        }
    }, [messages]);

    /**
     * Format message timestamp
     */
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    /**
     * Get message styling based on role
     */
    const getMessageStyle = (role) => {
        switch (role) {
            case 'user':
                return { color: 'blue', prefix: '👤 You' };
            case 'assistant':
                return { color: 'green', prefix: '🤖 Claude' };
            case 'system':
                return { color: 'yellow', prefix: '⚙️  System' };
            case 'error':
                return { color: 'red', prefix: '❌ Error' };
            default:
                return { color: 'white', prefix: '📝 Message' };
        }
    };

    /**
     * Render individual message
     */
    const renderMessage = (message, index) => {
        const style = getMessageStyle(message.role);
        const showTimestamp = debug || message.role === 'error';

        return React.createElement(Box, { 
            key: message.id || index, 
            flexDirection: "column", 
            marginBottom: 1 
        },
            React.createElement(Box, null,
                React.createElement(Text, { color: style.color, bold: true },
                    style.prefix
                ),
                showTimestamp && React.createElement(Text, { dimColor: true },
                    ` [${formatTime(message.timestamp)}]`
                )
            ),
            
            React.createElement(Box, { marginLeft: 2 },
                React.createElement(Text, null,
                    ...message.content.split('\n').map((line, lineIndex) => [
                        lineIndex > 0 && React.createElement(Newline, { key: `newline-${lineIndex}` }),
                        line
                    ]).flat().filter(Boolean)
                )
            ),
            
            debug && message.usage && React.createElement(Box, { marginLeft: 2, marginTop: 1 },
                React.createElement(Text, { dimColor: true },
                    `Tokens: ${message.usage.input_tokens}↑ ${message.usage.output_tokens}↓`
                )
            )
        );
    };

    /**
     * Render processing indicator
     */
    const renderProcessingIndicator = () => {
        if (!isProcessing) return null;

        return React.createElement(Box, { marginBottom: 1 },
            React.createElement(Text, { color: "cyan", bold: true },
                "🤖 Claude"
            ),
            React.createElement(Box, { marginLeft: 2 },
                React.createElement(Text, { dimColor: true },
                    "🤔 Thinking..."
                )
            )
        );
    };

    return React.createElement(Box, { flexDirection: "column" },
        messages.length === 0 ? 
            React.createElement(Box, null,
                React.createElement(Text, { dimColor: true },
                    "🎉 Welcome to Claude Code Interactive Session!",
                    React.createElement(Newline),
                    React.createElement(Newline),
                    "• Type your message and press Enter to chat with Claude",
                    React.createElement(Newline),
                    "• Use /help to see available commands",
                    React.createElement(Newline),
                    "• Use ↑↓ arrows to navigate input history",
                    React.createElement(Newline),
                    "• Press Ctrl+C to exit anytime",
                    React.createElement(Newline),
                    React.createElement(Newline),
                    "Ready to help! What would you like to know?"
                )
            ) :
            [
                ...messages.map(renderMessage),
                renderProcessingIndicator()
            ].filter(Boolean),
        React.createElement('div', { ref: messagesEndRef })
    );
}