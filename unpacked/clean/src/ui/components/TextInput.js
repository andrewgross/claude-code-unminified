/**
 * Text Input Component
 * 
 * Enhanced text input with multi-line support, history navigation,
 * and keyboard shortcuts for Claude Code.
 */

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

export function TextInput({ 
    value = '', 
    onChange, 
    onSubmit, 
    placeholder = 'Type your message...', 
    disabled = false,
    multiline = false 
}) {
    const [cursorPosition, setCursorPosition] = useState(value.length);
    const [isActive, setIsActive] = useState(true);

    useInput((input, key) => {
        if (disabled) return;

        // Handle special keys
        if (key.return) {
            if (key.shift || multiline) {
                // Add newline for multiline input
                const newValue = value.slice(0, cursorPosition) + '\n' + value.slice(cursorPosition);
                onChange?.(newValue);
                setCursorPosition(cursorPosition + 1);
            } else {
                // Submit the input
                onSubmit?.(value);
            }
            return;
        }

        if (key.backspace) {
            if (cursorPosition > 0) {
                const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
                onChange?.(newValue);
                setCursorPosition(cursorPosition - 1);
            }
            return;
        }

        if (key.delete) {
            if (cursorPosition < value.length) {
                const newValue = value.slice(0, cursorPosition) + value.slice(cursorPosition + 1);
                onChange?.(newValue);
            }
            return;
        }

        if (key.leftArrow) {
            setCursorPosition(Math.max(0, cursorPosition - 1));
            return;
        }

        if (key.rightArrow) {
            setCursorPosition(Math.min(value.length, cursorPosition + 1));
            return;
        }

        if (key.home || (key.ctrl && input === 'a')) {
            setCursorPosition(0);
            return;
        }

        if (key.end || (key.ctrl && input === 'e')) {
            setCursorPosition(value.length);
            return;
        }

        // Handle regular input
        if (input && !key.ctrl && !key.meta) {
            const newValue = value.slice(0, cursorPosition) + input + value.slice(cursorPosition);
            onChange?.(newValue);
            setCursorPosition(cursorPosition + input.length);
        }
    });

    // Split value into lines for display
    const lines = value.split('\n');
    const currentLineIndex = value.slice(0, cursorPosition).split('\n').length - 1;
    const currentLinePosition = cursorPosition - value.slice(0, cursorPosition).lastIndexOf('\n') - 1;

    /**
     * Render input with cursor
     */
    const renderInputWithCursor = () => {
        if (!value && !isActive) {
            return <Text dimColor>{placeholder}</Text>;
        }

        return lines.map((line, lineIndex) => {
            if (lineIndex === currentLineIndex && isActive) {
                // Show cursor on current line
                const beforeCursor = line.slice(0, currentLinePosition);
                const atCursor = line.slice(currentLinePosition, currentLinePosition + 1) || ' ';
                const afterCursor = line.slice(currentLinePosition + 1);

                return (
                    <Text key={lineIndex}>
                        {beforeCursor}
                        <Text inverse>{atCursor}</Text>
                        {afterCursor}
                        {lineIndex < lines.length - 1 && '\n'}
                    </Text>
                );
            } else {
                return (
                    <Text key={lineIndex}>
                        {line}
                        {lineIndex < lines.length - 1 && '\n'}
                    </Text>
                );
            }
        });
    };

    return (
        <Box flexDirection="column">
            <Box>
                <Text color={disabled ? 'gray' : 'white'}>
                    💬{' '}
                </Text>
                <Box flexGrow={1}>
                    {renderInputWithCursor()}
                </Box>
            </Box>
            
            {multiline && (
                <Box marginTop={1}>
                    <Text dimColor>
                        Press Shift+Enter for newline, Enter to send
                    </Text>
                </Box>
            )}
        </Box>
    );
}