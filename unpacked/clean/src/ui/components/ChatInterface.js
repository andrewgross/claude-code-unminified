/**
 * Chat Interface Component
 * 
 * Handles the main chat display and input for interactive sessions.
 * Shows message history, handles user input, and manages conversation flow.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, useInput } from 'ink';
import { TextInput } from './TextInput.js';
import { MessageList } from './MessageList.js';

export function ChatInterface({ 
    messages, 
    isProcessing, 
    onMessage, 
    debug = false 
}) {
    const [inputValue, setInputValue] = useState('');
    const [inputHistory, setInputHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [showInput, setShowInput] = useState(true);
    
    // Handle keyboard shortcuts
    useInput((input, key) => {
        if (key.upArrow && inputHistory.length > 0) {
            const newIndex = Math.min(historyIndex + 1, inputHistory.length - 1);
            setHistoryIndex(newIndex);
            setInputValue(inputHistory[inputHistory.length - 1 - newIndex] || '');
            return;
        }
        
        if (key.downArrow && historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInputValue(newIndex === -1 ? '' : inputHistory[inputHistory.length - 1 - newIndex] || '');
            return;
        }
        
        if (key.downArrow && historyIndex === 0) {
            setHistoryIndex(-1);
            setInputValue('');
            return;
        }
        
        // Ctrl+C to exit
        if (key.ctrl && input === 'c') {
            process.exit(0);
        }
        
        // Ctrl+L to clear screen
        if (key.ctrl && input === 'l') {
            console.clear();
        }
    });

    /**
     * Handle input submission
     */
    const handleSubmit = async (value) => {
        const trimmed = value.trim();
        if (!trimmed) return;

        // Add to history
        setInputHistory(prev => {
            const newHistory = [trimmed, ...prev.slice(0, 99)]; // Keep last 100
            return newHistory;
        });
        
        setHistoryIndex(-1);
        setInputValue('');
        
        // Send message
        await onMessage(trimmed);
    };

    /**
     * Handle input change
     */
    const handleChange = (value) => {
        setInputValue(value);
        setHistoryIndex(-1);
    };

    return React.createElement(Box, { flexDirection: "column", height: "100%" },
        // Message display area
        React.createElement(Box, { flexGrow: 1, flexDirection: "column", marginBottom: 1 },
            React.createElement(MessageList, {
                messages: messages,
                isProcessing: isProcessing,
                debug: debug
            })
        ),

        // Input area
        React.createElement(Box, { flexDirection: "column" },
            React.createElement(Box, { marginBottom: 1 },
                React.createElement(Text, { dimColor: true },
                    "💡 Type your message and press Enter. Use ↑↓ for history, Ctrl+C to exit"
                )
            ),
            
            React.createElement(TextInput, {
                value: inputValue,
                onChange: handleChange,
                onSubmit: handleSubmit,
                placeholder: isProcessing ? "Claude is thinking..." : "Type your message...",
                disabled: isProcessing
            }),
            
            debug && React.createElement(Box, { marginTop: 1 },
                React.createElement(Text, { dimColor: true },
                    `Debug: ${inputHistory.length} in history, index: ${historyIndex}`
                )
            )
        )
    );
}