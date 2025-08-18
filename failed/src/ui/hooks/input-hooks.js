/**
 * @fileoverview Input Handling Hooks
 * 
 * This module provides custom React hooks for handling keyboard input,
 * navigation, and user interactions in terminal applications.
 */

import { useState, useEffect, useCallback } from 'react';
import { useInput } from 'ink';

/**
 * useKeyboardNavigation - Hook for keyboard navigation through lists
 * 
 * @param {Array} items - Array of items to navigate
 * @param {Object} options - Navigation options
 * @param {number} options.initialIndex - Initial selected index
 * @param {boolean} options.wrap - Whether to wrap around at boundaries
 * @param {Function} options.onSelect - Callback when item is selected
 * @param {Function} options.onCancel - Callback when cancelled
 * @returns {Object} Navigation state and controls
 */
export const useKeyboardNavigation = (items, options = {}) => {
    const [selectedIndex, setSelectedIndex] = useState(options.initialIndex || 0);
    const [isActive, setIsActive] = useState(true);
    
    useInput((input, key) => {
        if (!isActive) return;
        
        if (key.upArrow || key.leftArrow) {
            setSelectedIndex(prev => {
                const newIndex = prev - 1;
                return options.wrap ? (newIndex < 0 ? items.length - 1 : newIndex) : Math.max(0, newIndex);
            });
        } else if (key.downArrow || key.rightArrow) {
            setSelectedIndex(prev => {
                const newIndex = prev + 1;
                return options.wrap ? newIndex % items.length : Math.min(items.length - 1, newIndex);
            });
        } else if (key.return) {
            options.onSelect?.(items[selectedIndex], selectedIndex);
        } else if (key.escape) {
            options.onCancel?.();
        }
    });
    
    return {
        selectedIndex,
        setSelectedIndex,
        selectedItem: items[selectedIndex],
        activate: () => setIsActive(true),
        deactivate: () => setIsActive(false),
        isActive
    };
};

/**
 * useTextInput - Hook for text input handling with validation
 * 
 * @param {Object} options - Input options
 * @param {string} options.initialValue - Initial input value
 * @param {Function} options.validator - Validation function
 * @param {Function} options.onSubmit - Submit callback
 * @param {Function} options.onCancel - Cancel callback
 * @param {boolean} options.multiline - Whether to support multiline input
 * @returns {Object} Input state and handlers
 */
export const useTextInput = (options = {}) => {
    const [value, setValue] = useState(options.initialValue || '');
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(true);
    
    useInput((input, key) => {
        if (!isActive) return;
        
        if (key.return && !options.multiline) {
            if (options.validator) {
                const validation = options.validator(value);
                if (!validation.valid) {
                    setError(validation.message);
                    return;
                }
            }
            
            options.onSubmit?.(value);
        } else if (key.return && options.multiline && !key.ctrl) {
            setValue(prev => prev + '\n');
        } else if (key.return && options.multiline && key.ctrl) {
            // Ctrl+Enter submits in multiline mode
            options.onSubmit?.(value);
        } else if (key.escape) {
            options.onCancel?.();
        } else if (key.backspace || key.delete) {
            setValue(prev => prev.slice(0, -1));
            setError(null);
        } else if (key.ctrl && input === 'a') {
            // Ctrl+A - select all (clear for simplicity)
            setValue('');
            setError(null);
        } else if (key.ctrl && input === 'u') {
            // Ctrl+U - clear line
            setValue('');
            setError(null);
        } else if (input && input.length === 1) {
            setValue(prev => prev + input);
            setError(null);
        }
    });
    
    return {
        value,
        setValue,
        error,
        setError,
        isActive,
        activate: () => setIsActive(true),
        deactivate: () => setIsActive(false),
        clear: () => {
            setValue('');
            setError(null);
        }
    };
};

/**
 * useMultiSelect - Hook for multi-selection input handling
 * 
 * @param {Array} items - Array of items to select from
 * @param {Object} options - Selection options
 * @param {Array} options.initialSelected - Initially selected items
 * @param {Function} options.onSubmit - Submit callback
 * @param {Function} options.onCancel - Cancel callback
 * @returns {Object} Selection state and handlers
 */
export const useMultiSelect = (items, options = {}) => {
    const [selected, setSelected] = useState(new Set(options.initialSelected || []));
    const [focusIndex, setFocusIndex] = useState(0);
    const [isActive, setIsActive] = useState(true);
    
    useInput((input, key) => {
        if (!isActive) return;
        
        if (key.upArrow) {
            setFocusIndex(prev => Math.max(0, prev - 1));
        } else if (key.downArrow) {
            setFocusIndex(prev => Math.min(items.length - 1, prev + 1));
        } else if (input === ' ') {
            const item = items[focusIndex];
            setSelected(prev => {
                const newSelected = new Set(prev);
                if (newSelected.has(item)) {
                    newSelected.delete(item);
                } else {
                    newSelected.add(item);
                }
                return newSelected;
            });
        } else if (key.return) {
            options.onSubmit?.(Array.from(selected));
        } else if (key.escape) {
            options.onCancel?.();
        } else if (input === 'a' && key.ctrl) {
            // Ctrl+A - select all
            setSelected(new Set(items));
        } else if (input === 'd' && key.ctrl) {
            // Ctrl+D - deselect all
            setSelected(new Set());
        }
    });
    
    return {
        selected: Array.from(selected),
        selectedSet: selected,
        focusIndex,
        isActive,
        activate: () => setIsActive(true),
        deactivate: () => setIsActive(false),
        toggleItem: (item) => {
            setSelected(prev => {
                const newSelected = new Set(prev);
                if (newSelected.has(item)) {
                    newSelected.delete(item);
                } else {
                    newSelected.add(item);
                }
                return newSelected;
            });
        },
        selectAll: () => setSelected(new Set(items)),
        clearAll: () => setSelected(new Set())
    };
};

/**
 * useConfirmation - Hook for yes/no confirmation input
 * 
 * @param {Object} options - Confirmation options
 * @param {boolean} options.defaultValue - Default confirmation value
 * @param {Function} options.onConfirm - Confirm callback
 * @param {Function} options.onCancel - Cancel callback
 * @returns {Object} Confirmation state and handlers
 */
export const useConfirmation = (options = {}) => {
    const [confirmed, setConfirmed] = useState(options.defaultValue || false);
    const [isActive, setIsActive] = useState(true);
    
    useInput((input, key) => {
        if (!isActive) return;
        
        if (key.leftArrow || key.rightArrow) {
            setConfirmed(prev => !prev);
        } else if (input === 'y' || input === 'Y') {
            setConfirmed(true);
        } else if (input === 'n' || input === 'N') {
            setConfirmed(false);
        } else if (key.return) {
            options.onConfirm?.(confirmed);
        } else if (key.escape) {
            options.onCancel?.();
        }
    });
    
    return {
        confirmed,
        setConfirmed,
        isActive,
        activate: () => setIsActive(true),
        deactivate: () => setIsActive(false)
    };
};

/**
 * useNumberInput - Hook for numeric input with increment/decrement
 * 
 * @param {Object} options - Number input options
 * @param {number} options.initialValue - Initial numeric value
 * @param {number} options.min - Minimum allowed value
 * @param {number} options.max - Maximum allowed value
 * @param {number} options.step - Step for increment/decrement
 * @param {Function} options.onSubmit - Submit callback
 * @param {Function} options.onCancel - Cancel callback
 * @returns {Object} Number input state and handlers
 */
export const useNumberInput = (options = {}) => {
    const [value, setValue] = useState(String(options.initialValue || 0));
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(true);
    
    const step = options.step || 1;
    
    useInput((input, key) => {
        if (!isActive) return;
        
        if (key.return) {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                setError('Please enter a valid number');
                return;
            }
            
            if (options.min !== undefined && numValue < options.min) {
                setError(`Value must be at least ${options.min}`);
                return;
            }
            
            if (options.max !== undefined && numValue > options.max) {
                setError(`Value must be at most ${options.max}`);
                return;
            }
            
            options.onSubmit?.(numValue);
        } else if (key.escape) {
            options.onCancel?.();
        } else if (key.upArrow) {
            const numValue = parseFloat(value) || 0;
            const newValue = numValue + step;
            if (options.max === undefined || newValue <= options.max) {
                setValue(String(newValue));
                setError(null);
            }
        } else if (key.downArrow) {
            const numValue = parseFloat(value) || 0;
            const newValue = numValue - step;
            if (options.min === undefined || newValue >= options.min) {
                setValue(String(newValue));
                setError(null);
            }
        } else if (key.backspace || key.delete) {
            setValue(prev => prev.slice(0, -1));
            setError(null);
        } else if (input && /^[0-9.-]$/.test(input)) {
            setValue(prev => prev + input);
            setError(null);
        }
    });
    
    return {
        value,
        numericValue: parseFloat(value) || 0,
        error,
        isActive,
        activate: () => setIsActive(true),
        deactivate: () => setIsActive(false),
        increment: () => {
            const numValue = parseFloat(value) || 0;
            const newValue = numValue + step;
            if (options.max === undefined || newValue <= options.max) {
                setValue(String(newValue));
            }
        },
        decrement: () => {
            const numValue = parseFloat(value) || 0;
            const newValue = numValue - step;
            if (options.min === undefined || newValue >= options.min) {
                setValue(String(newValue));
            }
        }
    };
};

/**
 * useHotkeys - Hook for global hotkey handling
 * 
 * @param {Object} hotkeys - Object mapping keys to handlers
 * @param {boolean} isActive - Whether hotkeys are active
 * @returns {Object} Hotkey controls
 */
export const useHotkeys = (hotkeys, isActive = true) => {
    const [activeKeys, setActiveKeys] = useState(new Set());
    
    useInput((input, key) => {
        if (!isActive) return;
        
        // Build key combination string
        let keyCombo = '';
        if (key.ctrl) keyCombo += 'ctrl+';
        if (key.alt) keyCombo += 'alt+';
        if (key.shift) keyCombo += 'shift+';
        if (key.meta) keyCombo += 'meta+';
        
        // Add the actual key
        if (input) {
            keyCombo += input.toLowerCase();
        } else if (key.return) {
            keyCombo += 'return';
        } else if (key.escape) {
            keyCombo += 'escape';
        } else if (key.backspace) {
            keyCombo += 'backspace';
        } else if (key.delete) {
            keyCombo += 'delete';
        } else if (key.tab) {
            keyCombo += 'tab';
        } else if (key.upArrow) {
            keyCombo += 'up';
        } else if (key.downArrow) {
            keyCombo += 'down';
        } else if (key.leftArrow) {
            keyCombo += 'left';
        } else if (key.rightArrow) {
            keyCombo += 'right';
        }
        
        // Check if we have a handler for this key combination
        const handler = hotkeys[keyCombo];
        if (handler) {
            handler(input, key);
        }
    });
    
    return {
        activeKeys: Array.from(activeKeys)
    };
};

/**
 * useInputHistory - Hook for maintaining input history (like bash history)
 * 
 * @param {Array} initialHistory - Initial history items
 * @param {number} maxSize - Maximum history size
 * @returns {Object} History state and controls
 */
export const useInputHistory = (initialHistory = [], maxSize = 100) => {
    const [history, setHistory] = useState(initialHistory);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentInput, setCurrentInput] = useState('');
    
    const addToHistory = useCallback((item) => {
        if (item.trim() === '') return;
        
        setHistory(prev => {
            const newHistory = [item, ...prev.filter(h => h !== item)];
            return newHistory.slice(0, maxSize);
        });
        setHistoryIndex(-1);
    }, [maxSize]);
    
    const navigateHistory = useCallback((direction) => {
        if (direction === 'up') {
            setHistoryIndex(prev => {
                const newIndex = Math.min(prev + 1, history.length - 1);
                return newIndex;
            });
        } else if (direction === 'down') {
            setHistoryIndex(prev => {
                const newIndex = Math.max(prev - 1, -1);
                return newIndex;
            });
        }
    }, [history.length]);
    
    const getCurrentHistoryItem = useCallback(() => {
        if (historyIndex === -1) return currentInput;
        return history[historyIndex] || '';
    }, [historyIndex, history, currentInput]);
    
    return {
        history,
        historyIndex,
        currentInput,
        setCurrentInput,
        addToHistory,
        navigateHistory,
        getCurrentHistoryItem,
        clearHistory: () => {
            setHistory([]);
            setHistoryIndex(-1);
        }
    };
};

/**
 * useTabCompletion - Hook for tab completion functionality
 * 
 * @param {Function} completionProvider - Function that provides completions
 * @param {Object} options - Completion options
 * @returns {Object} Tab completion state and controls
 */
export const useTabCompletion = (completionProvider, options = {}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const getSuggestions = useCallback(async (input, cursorPosition = input.length) => {
        try {
            const completions = await completionProvider(input, cursorPosition);
            setSuggestions(completions || []);
            setSelectedSuggestion(0);
            setShowSuggestions(completions && completions.length > 0);
        } catch (error) {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [completionProvider]);
    
    const selectSuggestion = useCallback((index) => {
        if (index >= 0 && index < suggestions.length) {
            setSelectedSuggestion(index);
            return suggestions[index];
        }
        return null;
    }, [suggestions]);
    
    const nextSuggestion = useCallback(() => {
        setSelectedSuggestion(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
        );
    }, [suggestions.length]);
    
    const previousSuggestion = useCallback(() => {
        setSelectedSuggestion(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
        );
    }, [suggestions.length]);
    
    return {
        suggestions,
        selectedSuggestion,
        showSuggestions,
        getSuggestions,
        selectSuggestion,
        nextSuggestion,
        previousSuggestion,
        hideSuggestions: () => setShowSuggestions(false)
    };
};