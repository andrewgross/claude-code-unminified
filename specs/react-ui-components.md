# React UI Components Specification

## Overview
Claude Code implements a sophisticated React-based terminal UI system that provides interactive prompts, progress indicators, forms, and displays for the command-line interface. The system uses Ink (React for CLI) to create rich interactive experiences in the terminal.

## Architecture

### Core Components
- **Component Library**: Reusable UI components for terminal interfaces
- **Hook System**: Custom React hooks for terminal-specific functionality
- **Context Providers**: Application state management through React context
- **Layout System**: Flexible layout components for terminal UIs
- **Input Management**: Keyboard and mouse input handling
- **Theme System**: Consistent styling and theming across components

### Technology Stack
- **Ink**: React for CLI applications
- **React**: Component-based UI framework
- **Chalk**: Terminal string styling
- **CLI-Boxes**: Terminal box drawing
- **Figures**: Unicode symbols for terminal

## Core UI Components

### Interactive Prompts
```javascript
import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';

const SelectPrompt = ({ options, onSelect, defaultValue, title }) => {
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

const MultiSelectPrompt = ({ options, onSubmit, title, defaultValues = [] }) => {
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

const TextInputPrompt = ({ placeholder, onSubmit, validator, title, secure = false }) => {
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
```

### Progress Indicators
```javascript
import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';

const ProgressBar = ({ current, total, label, showPercentage = true, showStats = true }) => {
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
    const barLength = 40;
    const filled = Math.round((percentage / 100) * barLength);
    const empty = barLength - filled;
    
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    
    return (
        <Box flexDirection="column">
            {label && (
                <Box marginBottom={1}>
                    <Text>{label}</Text>
                </Box>
            )}
            <Box>
                <Text color="green">{bar}</Text>
                {showPercentage && (
                    <Text color="cyan"> {percentage}%</Text>
                )}
            </Box>
            {showStats && (
                <Box>
                    <Text dimColor>
                        {current} / {total} completed
                    </Text>
                </Box>
            )}
        </Box>
    );
};

const SpinnerComponent = ({ text, type = 'dots', color = 'cyan' }) => {
    return (
        <Box>
            <Text color={color}>
                <Spinner type={type} />
            </Text>
            <Text> {text}</Text>
        </Box>
    );
};

const MultiStepProgress = ({ steps, currentStep, completedSteps = new Set() }) => {
    return (
        <Box flexDirection="column">
            {steps.map((step, index) => {
                const isCompleted = completedSteps.has(index);
                const isCurrent = index === currentStep;
                const isUpcoming = index > currentStep;
                
                let icon = '○';
                let color = 'gray';
                
                if (isCompleted) {
                    icon = '✓';
                    color = 'green';
                } else if (isCurrent) {
                    icon = '◉';
                    color = 'cyan';
                } else if (isUpcoming) {
                    icon = '○';
                    color = 'gray';
                }
                
                return (
                    <Box key={index}>
                        <Text color={color}>{icon}</Text>
                        <Text color={isCurrent ? 'white' : 'gray'}> {step.title}</Text>
                        {step.description && isCurrent && (
                            <Text dimColor> - {step.description}</Text>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

const ActivityIndicator = ({ activities }) => {
    return (
        <Box flexDirection="column">
            {activities.map((activity, index) => (
                <Box key={index}>
                    {activity.status === 'running' ? (
                        <Text color="yellow">
                            <Spinner type="dots" />
                        </Text>
                    ) : activity.status === 'completed' ? (
                        <Text color="green">✓</Text>
                    ) : activity.status === 'failed' ? (
                        <Text color="red">✗</Text>
                    ) : (
                        <Text color="gray">○</Text>
                    )}
                    <Text color={activity.status === 'running' ? 'white' : 'gray'}>
                        {' '}{activity.name}
                    </Text>
                    {activity.duration && (
                        <Text dimColor> ({activity.duration}ms)</Text>
                    )}
                </Box>
            ))}
        </Box>
    );
};
```

### Layout Components
```javascript
import React from 'react';
import { Box, Text } from 'ink';

const Panel = ({ title, children, border = true, padding = 1 }) => {
    return (
        <Box 
            flexDirection="column" 
            borderStyle={border ? 'round' : undefined}
            borderColor="gray"
            padding={padding}
        >
            {title && (
                <Box marginBottom={1}>
                    <Text bold color="cyan">{title}</Text>
                </Box>
            )}
            {children}
        </Box>
    );
};

const TwoColumnLayout = ({ left, right, leftWidth = '50%' }) => {
    return (
        <Box>
            <Box width={leftWidth} marginRight={2}>
                {left}
            </Box>
            <Box flexGrow={1}>
                {right}
            </Box>
        </Box>
    );
};

const TabPanel = ({ tabs, activeTab, onTabChange, children }) => {
    useInput((input, key) => {
        if (key.leftArrow) {
            const newIndex = Math.max(0, activeTab - 1);
            onTabChange(newIndex);
        } else if (key.rightArrow) {
            const newIndex = Math.min(tabs.length - 1, activeTab + 1);
            onTabChange(newIndex);
        }
    });
    
    return (
        <Box flexDirection="column">
            <Box>
                {tabs.map((tab, index) => (
                    <Box key={index} marginRight={2}>
                        <Text 
                            color={index === activeTab ? 'cyan' : 'gray'}
                            bold={index === activeTab}
                        >
                            {tab.title}
                        </Text>
                    </Box>
                ))}
            </Box>
            <Box marginTop={1} borderStyle="single" borderColor="gray" padding={1}>
                {children}
            </Box>
            <Box marginTop={1}>
                <Text dimColor>
                    Use left/right arrow keys to switch tabs
                </Text>
            </Box>
        </Box>
    );
};

const StatusBar = ({ left, center, right }) => {
    return (
        <Box borderStyle="single" borderColor="gray" padding={1}>
            <Box flexGrow={1}>
                {left}
            </Box>
            <Box>
                {center}
            </Box>
            <Box flexGrow={1} justifyContent="flex-end">
                {right}
            </Box>
        </Box>
    );
};
```

### Form Components
```javascript
import React, { useState } from 'react';
import { Box, Text } from 'ink';

const Form = ({ fields, onSubmit, onCancel, title }) => {
    const [values, setValues] = useState({});
    const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const [errors, setErrors] = useState({});
    
    const currentField = fields[currentFieldIndex];
    
    const handleFieldSubmit = (value) => {
        const updatedValues = { ...values, [currentField.name]: value };
        setValues(updatedValues);
        
        // Validate field if validator provided
        if (currentField.validator) {
            const validation = currentField.validator(value);
            if (!validation.valid) {
                setErrors(prev => ({ ...prev, [currentField.name]: validation.message }));
                return;
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[currentField.name];
                    return newErrors;
                });
            }
        }
        
        // Move to next field or submit form
        if (currentFieldIndex < fields.length - 1) {
            setCurrentFieldIndex(prev => prev + 1);
        } else {
            // All fields completed, validate entire form
            const formErrors = validateForm(updatedValues, fields);
            if (Object.keys(formErrors).length === 0) {
                onSubmit(updatedValues);
            } else {
                setErrors(formErrors);
                // Go back to first field with error
                const firstErrorField = fields.findIndex(field => formErrors[field.name]);
                setCurrentFieldIndex(firstErrorField);
            }
        }
    };
    
    const handleFieldCancel = () => {
        if (currentFieldIndex > 0) {
            setCurrentFieldIndex(prev => prev - 1);
        } else {
            onCancel();
        }
    };
    
    return (
        <Box flexDirection="column">
            {title && (
                <Box marginBottom={1}>
                    <Text bold color="cyan">{title}</Text>
                </Box>
            )}
            
            {/* Progress indicator */}
            <Box marginBottom={1}>
                <Text dimColor>
                    Step {currentFieldIndex + 1} of {fields.length}
                </Text>
            </Box>
            
            {/* Current field */}
            <Box marginBottom={1}>
                {renderField(currentField, values[currentField.name], handleFieldSubmit, handleFieldCancel)}
            </Box>
            
            {/* Error display */}
            {errors[currentField.name] && (
                <Box marginBottom={1}>
                    <Text color="red">Error: {errors[currentField.name]}</Text>
                </Box>
            )}
            
            {/* Previous values display */}
            {currentFieldIndex > 0 && (
                <Box marginTop={1}>
                    <Text dimColor>Previous values:</Text>
                    {fields.slice(0, currentFieldIndex).map(field => (
                        <Text key={field.name} dimColor>
                            {field.label}: {formatValue(values[field.name], field.type)}
                        </Text>
                    ))}
                </Box>
            )}
        </Box>
    );
};

const renderField = (field, currentValue, onSubmit, onCancel) => {
    switch (field.type) {
        case 'text':
        case 'email':
        case 'password':
            return (
                <TextInputPrompt
                    title={field.label}
                    placeholder={field.placeholder}
                    secure={field.type === 'password'}
                    onSubmit={onSubmit}
                    validator={field.validator}
                />
            );
            
        case 'select':
            return (
                <SelectPrompt
                    title={field.label}
                    options={field.options}
                    onSelect={onSubmit}
                    defaultValue={currentValue}
                />
            );
            
        case 'multiselect':
            return (
                <MultiSelectPrompt
                    title={field.label}
                    options={field.options}
                    onSubmit={onSubmit}
                    defaultValues={currentValue || []}
                />
            );
            
        case 'confirm':
            return (
                <ConfirmPrompt
                    title={field.label}
                    onConfirm={(confirmed) => onSubmit(confirmed)}
                />
            );
            
        default:
            return (
                <TextInputPrompt
                    title={field.label}
                    placeholder={field.placeholder}
                    onSubmit={onSubmit}
                />
            );
    }
};
```

## Custom Hooks

### Input Handling Hooks
```javascript
import { useState, useEffect } from 'react';
import { useInput } from 'ink';

const useKeyboardNavigation = (items, options = {}) => {
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

const useAsyncOperation = (operation) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    
    const execute = async (...args) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await operation(...args);
            setResult(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    
    const reset = () => {
        setIsLoading(false);
        setError(null);
        setResult(null);
    };
    
    return {
        execute,
        reset,
        isLoading,
        error,
        result,
        isIdle: !isLoading && !error && !result
    };
};

const useTimer = (duration, options = {}) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isRunning, setIsRunning] = useState(options.autoStart || false);
    const [isCompleted, setIsCompleted] = useState(false);
    
    useEffect(() => {
        if (!isRunning || timeRemaining <= 0) return;
        
        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                const newTime = prev - 1000;
                if (newTime <= 0) {
                    setIsCompleted(true);
                    setIsRunning(false);
                    options.onComplete?.();
                    return 0;
                }
                return newTime;
            });
        }, 1000);
        
        return () => clearInterval(interval);
    }, [isRunning, timeRemaining]);
    
    const start = () => {
        setIsRunning(true);
        setIsCompleted(false);
    };
    
    const pause = () => setIsRunning(false);
    
    const reset = () => {
        setTimeRemaining(duration);
        setIsRunning(false);
        setIsCompleted(false);
    };
    
    return {
        timeRemaining,
        isRunning,
        isCompleted,
        start,
        pause,
        reset,
        formattedTime: formatTime(timeRemaining)
    };
};
```

### State Management Hooks
```javascript
import { useState, useEffect, useContext, createContext } from 'react';

const AppStateContext = createContext();

const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within AppStateProvider');
    }
    return context;
};

const usePersistentState = (key, defaultValue, storage = localStorage) => {
    const [state, setState] = useState(() => {
        try {
            const item = storage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error loading state for key ${key}:`, error);
            return defaultValue;
        }
    });
    
    useEffect(() => {
        try {
            storage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error saving state for key ${key}:`, error);
        }
    }, [key, state, storage]);
    
    return [state, setState];
};

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    
    return debouncedValue;
};

const useInterval = (callback, delay) => {
    const [isRunning, setIsRunning] = useState(false);
    
    useEffect(() => {
        if (!isRunning || delay === null) return;
        
        const interval = setInterval(callback, delay);
        return () => clearInterval(interval);
    }, [callback, delay, isRunning]);
    
    return {
        start: () => setIsRunning(true),
        stop: () => setIsRunning(false),
        isRunning
    };
};
```

## Context Providers

### Application Context
```javascript
import React, { createContext, useContext, useReducer } from 'react';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const appStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
            
        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false };
            
        case 'CLEAR_ERROR':
            return { ...state, error: null };
            
        case 'SET_USER':
            return { ...state, user: action.payload };
            
        case 'SET_CONFIGURATION':
            return { ...state, configuration: { ...state.configuration, ...action.payload } };
            
        case 'ADD_NOTIFICATION':
            return { 
                ...state, 
                notifications: [...state.notifications, { 
                    id: Date.now(), 
                    timestamp: new Date(),
                    ...action.payload 
                }]
            };
            
        case 'REMOVE_NOTIFICATION':
            return { 
                ...state, 
                notifications: state.notifications.filter(n => n.id !== action.payload)
            };
            
        case 'UPDATE_MCP_SERVERS':
            return { ...state, mcpServers: action.payload };
            
        case 'SET_SESSION_INFO':
            return { ...state, sessionInfo: action.payload };
            
        default:
            return state;
    }
};

const initialState = {
    isLoading: false,
    error: null,
    user: null,
    configuration: {},
    notifications: [],
    mcpServers: [],
    sessionInfo: null,
    theme: 'auto'
};

export const AppStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState);
    
    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within AppStateProvider');
    }
    return context;
};

export const useAppDispatch = () => {
    const context = useContext(AppDispatchContext);
    if (!context) {
        throw new Error('useAppDispatch must be used within AppStateProvider');
    }
    return context;
};
```

### Theme Provider
```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
    light: {
        primary: 'blue',
        secondary: 'cyan',
        success: 'green',
        warning: 'yellow',
        error: 'red',
        text: 'black',
        background: 'white',
        muted: 'gray'
    },
    dark: {
        primary: 'cyan',
        secondary: 'blue',
        success: 'green',
        warning: 'yellow',
        error: 'red',
        text: 'white',
        background: 'black',
        muted: 'gray'
    }
};

export const ThemeProvider = ({ children, initialTheme = 'dark' }) => {
    const [currentTheme, setCurrentTheme] = useState(initialTheme);
    
    const theme = themes[currentTheme];
    
    const toggleTheme = () => {
        setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    const setTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
        }
    };
    
    const value = {
        theme,
        currentTheme,
        toggleTheme,
        setTheme,
        availableThemes: Object.keys(themes)
    };
    
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
```

## Utility Functions

### Terminal Utilities
```javascript
import figures from 'figures';
import chalk from 'chalk';

export const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else {
        return `${seconds}s`;
    }
};

export const formatBytes = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const getStatusIcon = (status) => {
    switch (status) {
        case 'success':
        case 'completed':
            return figures.tick;
        case 'error':
        case 'failed':
            return figures.cross;
        case 'warning':
            return figures.warning;
        case 'info':
            return figures.info;
        case 'running':
        case 'loading':
            return figures.ellipsis;
        default:
            return figures.bullet;
    }
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'success':
        case 'completed':
            return 'green';
        case 'error':
        case 'failed':
            return 'red';
        case 'warning':
            return 'yellow';
        case 'info':
            return 'blue';
        case 'running':
        case 'loading':
            return 'cyan';
        default:
            return 'white';
    }
};

export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
};

export const wrapText = (text, width) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
        if (currentLine.length + word.length + 1 <= width) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }
    
    if (currentLine) lines.push(currentLine);
    return lines;
};
```

This React UI components specification provides comprehensive coverage of Claude Code's terminal user interface system, enabling rich interactive experiences in the command-line environment.