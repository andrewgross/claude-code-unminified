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

        return (
            <Box key={message.id || index} flexDirection="column" marginBottom={1}>
                <Box>
                    <Text color={style.color} bold>
                        {style.prefix}
                    </Text>
                    {showTimestamp && (
                        <Text dimColor>
                            {' '}[{formatTime(message.timestamp)}]
                        </Text>
                    )}
                </Box>
                
                <Box marginLeft={2}>
                    <Text>
                        {message.content.split('\n').map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                                {lineIndex > 0 && <Newline />}
                                {line}
                            </React.Fragment>
                        ))}
                    </Text>
                </Box>
                
                {debug && message.usage && (
                    <Box marginLeft={2} marginTop={1}>
                        <Text dimColor>
                            Tokens: {message.usage.input_tokens}↑ {message.usage.output_tokens}↓
                        </Text>
                    </Box>
                )}
            </Box>
        );
    };

    /**
     * Render processing indicator
     */
    const renderProcessingIndicator = () => {
        if (!isProcessing) return null;

        return (
            <Box marginBottom={1}>
                <Text color="cyan" bold>
                    🤖 Claude
                </Text>
                <Box marginLeft={2}>
                    <Text dimColor>
                        🤔 Thinking...
                    </Text>
                </Box>
            </Box>
        );
    };

    return (
        <Box flexDirection="column">
            {messages.length === 0 ? (
                <Box>
                    <Text dimColor>
                        🎉 Welcome to Claude Code Interactive Session!
                        <Newline />
                        <Newline />
                        • Type your message and press Enter to chat with Claude
                        <Newline />
                        • Use /help to see available commands  
                        <Newline />
                        • Use ↑↓ arrows to navigate input history
                        <Newline />
                        • Press Ctrl+C to exit anytime
                        <Newline />
                        <Newline />
                        Ready to help! What would you like to know?
                    </Text>
                </Box>
            ) : (
                <>
                    {messages.map(renderMessage)}
                    {renderProcessingIndicator()}
                </>
            )}
            <div ref={messagesEndRef} />
        </Box>
    );
}