/**
 * @fileoverview State Management Hooks
 * 
 * This module provides custom React hooks for state management,
 * including async operations, timers, debouncing, and persistence.
 */

import { useState, useEffect, useReducer, useCallback, useRef, useContext, createContext } from 'react';

/**
 * useAsyncOperation - Hook for managing async operations with loading states
 * 
 * @param {Function} operation - Async operation to execute
 * @returns {Object} Async operation state and controls
 */
export const useAsyncOperation = (operation) => {
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

/**
 * useTimer - Hook for countdown and elapsed time tracking
 * 
 * @param {number} duration - Duration in milliseconds
 * @param {Object} options - Timer options
 * @param {boolean} options.autoStart - Whether to start automatically
 * @param {Function} options.onComplete - Callback when timer completes
 * @param {boolean} options.countdown - Whether this is a countdown timer
 * @returns {Object} Timer state and controls
 */
export const useTimer = (duration, options = {}) => {
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isRunning, setIsRunning] = useState(options.autoStart || false);
    const [isCompleted, setIsCompleted] = useState(false);
    const intervalRef = useRef();
    
    useEffect(() => {
        if (!isRunning || timeRemaining <= 0) return;
        
        intervalRef.current = setInterval(() => {
            setTimeRemaining(prev => {
                const newTime = options.countdown !== false ? prev - 1000 : prev + 1000;
                if (options.countdown !== false && newTime <= 0) {
                    setIsCompleted(true);
                    setIsRunning(false);
                    options.onComplete?.();
                    return 0;
                }
                return newTime;
            });
        }, 1000);
        
        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeRemaining, options.countdown, options.onComplete]);
    
    const start = () => {
        setIsRunning(true);
        setIsCompleted(false);
    };
    
    const pause = () => setIsRunning(false);
    
    const reset = () => {
        setTimeRemaining(duration);
        setIsRunning(false);
        setIsCompleted(false);
        clearInterval(intervalRef.current);
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

/**
 * usePersistentState - Hook for state that persists to storage
 * 
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not in storage
 * @param {Object} storage - Storage implementation (default: localStorage)
 * @returns {Array} [state, setState] tuple
 */
export const usePersistentState = (key, defaultValue, storage = globalThis.localStorage) => {
    const [state, setState] = useState(() => {
        try {
            if (!storage) return defaultValue;
            const item = storage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error loading state for key ${key}:`, error);
            return defaultValue;
        }
    });
    
    useEffect(() => {
        try {
            if (!storage) return;
            storage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error saving state for key ${key}:`, error);
        }
    }, [key, state, storage]);
    
    return [state, setState];
};

/**
 * useDebounce - Hook for debouncing values
 * 
 * @param {any} value - Value to debounce
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {any} Debounced value
 */
export const useDebounce = (value, delay) => {
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

/**
 * useInterval - Hook for managing intervals
 * 
 * @param {Function} callback - Callback to execute
 * @param {number} delay - Interval delay in milliseconds
 * @returns {Object} Interval controls
 */
export const useInterval = (callback, delay) => {
    const [isRunning, setIsRunning] = useState(false);
    const callbackRef = useRef();
    
    // Remember the latest callback
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    
    useEffect(() => {
        if (!isRunning || delay === null) return;
        
        const interval = setInterval(() => {
            callbackRef.current?.();
        }, delay);
        
        return () => clearInterval(interval);
    }, [delay, isRunning]);
    
    return {
        start: () => setIsRunning(true),
        stop: () => setIsRunning(false),
        isRunning
    };
};

/**
 * useToggle - Hook for boolean toggle state
 * 
 * @param {boolean} initialValue - Initial toggle state
 * @returns {Array} [value, toggle, setValue] tuple
 */
export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);
    
    const toggle = useCallback(() => {
        setValue(prev => !prev);
    }, []);
    
    return [value, toggle, setValue];
};

/**
 * useCounter - Hook for counter state with increment/decrement
 * 
 * @param {number} initialValue - Initial counter value
 * @param {Object} options - Counter options
 * @param {number} options.min - Minimum value
 * @param {number} options.max - Maximum value
 * @param {number} options.step - Step size for increment/decrement
 * @returns {Object} Counter state and controls
 */
export const useCounter = (initialValue = 0, options = {}) => {
    const [count, setCount] = useState(initialValue);
    
    const increment = useCallback(() => {
        setCount(prev => {
            const newValue = prev + (options.step || 1);
            return options.max !== undefined ? Math.min(newValue, options.max) : newValue;
        });
    }, [options.step, options.max]);
    
    const decrement = useCallback(() => {
        setCount(prev => {
            const newValue = prev - (options.step || 1);
            return options.min !== undefined ? Math.max(newValue, options.min) : newValue;
        });
    }, [options.step, options.min]);
    
    const reset = useCallback(() => {
        setCount(initialValue);
    }, [initialValue]);
    
    const set = useCallback((value) => {
        setCount(value);
    }, []);
    
    return {
        count,
        increment,
        decrement,
        reset,
        set
    };
};

/**
 * usePrevious - Hook to get previous value
 * 
 * @param {any} value - Current value
 * @returns {any} Previous value
 */
export const usePrevious = (value) => {
    const ref = useRef();
    
    useEffect(() => {
        ref.current = value;
    });
    
    return ref.current;
};

/**
 * useQueue - Hook for queue data structure
 * 
 * @param {Array} initialItems - Initial queue items
 * @returns {Object} Queue state and operations
 */
export const useQueue = (initialItems = []) => {
    const [queue, setQueue] = useState(initialItems);
    
    const enqueue = useCallback((item) => {
        setQueue(prev => [...prev, item]);
    }, []);
    
    const dequeue = useCallback(() => {
        let dequeuedItem;
        setQueue(prev => {
            if (prev.length === 0) return prev;
            dequeuedItem = prev[0];
            return prev.slice(1);
        });
        return dequeuedItem;
    }, []);
    
    const peek = useCallback(() => {
        return queue[0];
    }, [queue]);
    
    const clear = useCallback(() => {
        setQueue([]);
    }, []);
    
    return {
        queue,
        size: queue.length,
        enqueue,
        dequeue,
        peek,
        clear,
        isEmpty: queue.length === 0
    };
};

/**
 * useStack - Hook for stack data structure
 * 
 * @param {Array} initialItems - Initial stack items
 * @returns {Object} Stack state and operations
 */
export const useStack = (initialItems = []) => {
    const [stack, setStack] = useState(initialItems);
    
    const push = useCallback((item) => {
        setStack(prev => [...prev, item]);
    }, []);
    
    const pop = useCallback(() => {
        let poppedItem;
        setStack(prev => {
            if (prev.length === 0) return prev;
            poppedItem = prev[prev.length - 1];
            return prev.slice(0, -1);
        });
        return poppedItem;
    }, []);
    
    const peek = useCallback(() => {
        return stack[stack.length - 1];
    }, [stack]);
    
    const clear = useCallback(() => {
        setStack([]);
    }, []);
    
    return {
        stack,
        size: stack.length,
        push,
        pop,
        peek,
        clear,
        isEmpty: stack.length === 0
    };
};

/**
 * useMap - Hook for Map data structure
 * 
 * @param {Array} initialEntries - Initial map entries
 * @returns {Object} Map state and operations
 */
export const useMap = (initialEntries = []) => {
    const [map, setMap] = useState(new Map(initialEntries));
    
    const set = useCallback((key, value) => {
        setMap(prev => {
            const newMap = new Map(prev);
            newMap.set(key, value);
            return newMap;
        });
    }, []);
    
    const get = useCallback((key) => {
        return map.get(key);
    }, [map]);
    
    const remove = useCallback((key) => {
        setMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(key);
            return newMap;
        });
    }, []);
    
    const clear = useCallback(() => {
        setMap(new Map());
    }, []);
    
    const has = useCallback((key) => {
        return map.has(key);
    }, [map]);
    
    return {
        map,
        size: map.size,
        set,
        get,
        remove,
        clear,
        has,
        keys: Array.from(map.keys()),
        values: Array.from(map.values()),
        entries: Array.from(map.entries())
    };
};

/**
 * useSet - Hook for Set data structure
 * 
 * @param {Array} initialValues - Initial set values
 * @returns {Object} Set state and operations
 */
export const useSet = (initialValues = []) => {
    const [set, setSet] = useState(new Set(initialValues));
    
    const add = useCallback((value) => {
        setSet(prev => {
            const newSet = new Set(prev);
            newSet.add(value);
            return newSet;
        });
    }, []);
    
    const remove = useCallback((value) => {
        setSet(prev => {
            const newSet = new Set(prev);
            newSet.delete(value);
            return newSet;
        });
    }, []);
    
    const clear = useCallback(() => {
        setSet(new Set());
    }, []);
    
    const has = useCallback((value) => {
        return set.has(value);
    }, [set]);
    
    const toggle = useCallback((value) => {
        setSet(prev => {
            const newSet = new Set(prev);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return newSet;
        });
    }, []);
    
    return {
        set,
        size: set.size,
        add,
        remove,
        clear,
        has,
        toggle,
        values: Array.from(set)
    };
};

/**
 * useLocalState - Hook for component-local state management with reducer pattern
 * 
 * @param {Function} reducer - State reducer function
 * @param {any} initialState - Initial state
 * @returns {Array} [state, dispatch] tuple
 */
export const useLocalState = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return [state, dispatch];
};

/**
 * Utility function to format time in milliseconds
 * 
 * @param {number} milliseconds - Time in milliseconds
 * @returns {string} Formatted time string
 */
const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(Math.abs(milliseconds) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
};

/**
 * Application state context for global state management
 */
const AppStateContext = createContext();

/**
 * Hook to access application state context
 * 
 * @returns {Object} Application state context
 */
export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within AppStateProvider');
    }
    return context;
};

export { AppStateContext };