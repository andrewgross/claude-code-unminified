/**
 * @fileoverview Interactive Prompts Components
 * 
 * This module provides React/Ink components for interactive terminal prompts
 * including select, multi-select, text input, and confirmation prompts.
 */

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

/**
 * SelectPrompt - Interactive single selection prompt
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.options - Array of options with {label, value} structure
 * @param {Function} props.onSelect - Callback when option is selected
 * @param {string} props.defaultValue - Default selected value
 * @param {string} props.title - Prompt title
 * @returns {JSX.Element|null} Select prompt component
 */
export const SelectPrompt = ({ options, onSelect, defaultValue, title }) => {
    const [selectedIndex, setSelectedIndex] = useState(
        defaultValue ? options.findIndex(opt => opt.value === defaultValue) : 0
    );
    const [submitted, setSubmitted] = useState(false);
    
    useInput((input, key) => {
        if (submitted) return;
        
        if (key.upArrow) {
            setSelectedIndex(prev => Math.max(0, prev - 1));
        } else if (key.downArrow) {
            setSelectedIndex(prev => Math.min(options.length - 1, prev + 1));
        } else if (key.return) {
            setSubmitted(true);
            onSelect(options[selectedIndex].value);
        } else if (key.escape) {
            setSubmitted(true);
            onSelect(null);
        }
    });
    
    if (submitted) return null;
    
    return (
        <Box flexDirection="column">
            {title && (
                <Box marginBottom={1}>
                    <Text bold>{title}</Text>
                </Box>
            )}
            {options.map((option, index) => (
                <Box key={option.value}>
                    <Text color={index === selectedIndex ? 'cyan' : 'white'}>
                        {index === selectedIndex ? '❯' : ' '} {option.label}
                    </Text>
                </Box>
            ))}
            <Box marginTop={1}>
                <Text dimColor>
                    Use arrow keys to navigate • Enter to select • Esc to cancel
                </Text>
            </Box>
        </Box>
    );
};

/**
 * MultiSelectPrompt - Interactive multiple selection prompt
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.options - Array of options with {label, value} structure
 * @param {Function} props.onSubmit - Callback when selections are submitted
 * @param {string} props.title - Prompt title
 * @param {Array} props.defaultValues - Default selected values
 * @returns {JSX.Element|null} Multi-select prompt component
 */
export const MultiSelectPrompt = ({ options, onSubmit, title, defaultValues = [] }) => {
    const [selected, setSelected] = useState(new Set(defaultValues));
    const [focusIndex, setFocusIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    
    useInput((input, key) => {
        if (submitted) return;
        
        if (key.upArrow) {
            setFocusIndex(prev => Math.max(0, prev - 1));
        } else if (key.downArrow) {
            setFocusIndex(prev => Math.min(options.length - 1, prev + 1));
        } else if (input === ' ') {
            const value = options[focusIndex].value;
            setSelected(prev => {
                const newSelected = new Set(prev);
                if (newSelected.has(value)) {
                    newSelected.delete(value);
                } else {
                    newSelected.add(value);
                }
                return newSelected;
            });
        } else if (key.return) {
            setSubmitted(true);
            onSubmit(Array.from(selected));
        } else if (key.escape) {
            setSubmitted(true);
            onSubmit([]);
        }
    });
    
    if (submitted) return null;
    
    return (
        <Box flexDirection="column">
            {title && (
                <Box marginBottom={1}>
                    <Text bold>{title}</Text>
                </Box>
            )}
            {options.map((option, index) => {
                const isSelected = selected.has(option.value);
                const isFocused = index === focusIndex;
                
                return (
                    <Box key={option.value}>
                        <Text color={isFocused ? 'cyan' : 'white'}>
                            {isFocused ? '❯' : ' '} {isSelected ? '☑' : '☐'} {option.label}
                        </Text>
                    </Box>
                );
            })}
            <Box marginTop={1}>
                <Text dimColor>
                    Space to select • Enter to confirm • Esc to cancel
                </Text>
            </Box>
        </Box>
    );
};

/**
 * TextInputPrompt - Interactive text input prompt
 * 
 * @param {Object} props - Component properties
 * @param {string} props.placeholder - Input placeholder text
 * @param {Function} props.onSubmit - Callback when text is submitted
 * @param {Function} props.validator - Optional validation function
 * @param {string} props.title - Prompt title
 * @param {boolean} props.secure - Whether to mask input (password field)
 * @returns {JSX.Element|null} Text input prompt component
 */
export const TextInputPrompt = ({ placeholder, onSubmit, validator, title, secure = false }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    
    useInput((input, key) => {
        if (submitted) return;
        
        if (key.return) {
            if (validator) {
                const validation = validator(value);
                if (!validation.valid) {
                    setError(validation.message);
                    return;
                }
            }
            
            setSubmitted(true);
            onSubmit(value);
        } else if (key.escape) {
            setSubmitted(true);
            onSubmit(null);
        } else if (key.backspace || key.delete) {
            setValue(prev => prev.slice(0, -1));
            setError(null);
        } else if (input && input.length === 1) {
            setValue(prev => prev + input);
            setError(null);
        }
    });
    
    if (submitted) return null;
    
    const displayValue = secure ? '*'.repeat(value.length) : value;
    
    return (
        <Box flexDirection="column">
            {title && (
                <Box marginBottom={1}>
                    <Text bold>{title}</Text>
                </Box>
            )}
            <Box>
                <Text>{placeholder}: </Text>
                <Text color="cyan">{displayValue}</Text>
            </Box>
            {error && (
                <Box marginTop={1}>
                    <Text color="red">Error: {error}</Text>
                </Box>
            )}
            <Box marginTop={1}>
                <Text dimColor>
                    Type to enter text • Enter to submit • Esc to cancel
                </Text>
            </Box>
        </Box>
    );
};

/**
 * ConfirmPrompt - Interactive yes/no confirmation prompt
 * 
 * @param {Object} props - Component properties
 * @param {string} props.title - Confirmation question
 * @param {Function} props.onConfirm - Callback when confirmed/denied
 * @param {boolean} props.defaultValue - Default value (true for yes, false for no)
 * @returns {JSX.Element|null} Confirmation prompt component
 */
export const ConfirmPrompt = ({ title, onConfirm, defaultValue = false }) => {
    const [confirmed, setConfirmed] = useState(defaultValue);
    const [submitted, setSubmitted] = useState(false);
    
    useInput((input, key) => {
        if (submitted) return;
        
        if (key.leftArrow || key.rightArrow) {
            setConfirmed(prev => !prev);
        } else if (input === 'y' || input === 'Y') {
            setConfirmed(true);
        } else if (input === 'n' || input === 'N') {
            setConfirmed(false);
        } else if (key.return) {
            setSubmitted(true);
            onConfirm(confirmed);
        } else if (key.escape) {
            setSubmitted(true);
            onConfirm(null);
        }
    });
    
    if (submitted) return null;
    
    return (
        <Box flexDirection="column">
            <Box marginBottom={1}>
                <Text bold>{title}</Text>
            </Box>
            <Box>
                <Text color={confirmed ? 'cyan' : 'white'}>
                    {confirmed ? '❯ Yes' : '  Yes'}
                </Text>
                <Text> / </Text>
                <Text color={!confirmed ? 'cyan' : 'white'}>
                    {!confirmed ? '❯ No' : '  No'}
                </Text>
            </Box>
            <Box marginTop={1}>
                <Text dimColor>
                    Y/N or arrow keys to choose • Enter to confirm • Esc to cancel
                </Text>
            </Box>
        </Box>
    );
};

/**
 * NumberInputPrompt - Interactive number input prompt
 * 
 * @param {Object} props - Component properties
 * @param {string} props.placeholder - Input placeholder text
 * @param {Function} props.onSubmit - Callback when number is submitted
 * @param {string} props.title - Prompt title
 * @param {number} props.min - Minimum allowed value
 * @param {number} props.max - Maximum allowed value
 * @param {number} props.step - Step increment for arrow keys
 * @returns {JSX.Element|null} Number input prompt component
 */
export const NumberInputPrompt = ({ placeholder, onSubmit, title, min, max, step = 1 }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    
    useInput((input, key) => {
        if (submitted) return;
        
        if (key.return) {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                setError('Please enter a valid number');
                return;
            }
            
            if (min !== undefined && numValue < min) {
                setError(`Value must be at least ${min}`);
                return;
            }
            
            if (max !== undefined && numValue > max) {
                setError(`Value must be at most ${max}`);
                return;
            }
            
            setSubmitted(true);
            onSubmit(numValue);
        } else if (key.escape) {
            setSubmitted(true);
            onSubmit(null);
        } else if (key.upArrow) {
            const numValue = parseFloat(value) || 0;
            setValue(String(numValue + step));
            setError(null);
        } else if (key.downArrow) {
            const numValue = parseFloat(value) || 0;
            setValue(String(numValue - step));
            setError(null);
        } else if (key.backspace || key.delete) {
            setValue(prev => prev.slice(0, -1));
            setError(null);
        } else if (input && /^[0-9.-]$/.test(input)) {
            setValue(prev => prev + input);
            setError(null);
        }
    });
    
    if (submitted) return null;
    
    return (
        <Box flexDirection="column">
            {title && (
                <Box marginBottom={1}>
                    <Text bold>{title}</Text>
                </Box>
            )}
            <Box>
                <Text>{placeholder}: </Text>
                <Text color="cyan">{value}</Text>
            </Box>
            {error && (
                <Box marginTop={1}>
                    <Text color="red">Error: {error}</Text>
                </Box>
            )}
            <Box marginTop={1}>
                <Text dimColor>
                    Type number • Arrow keys to increment/decrement • Enter to submit • Esc to cancel
                </Text>
            </Box>
        </Box>
    );
};