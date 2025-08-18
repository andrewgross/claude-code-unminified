/**
 * @fileoverview Application Context Provider
 * 
 * This module provides React context for global application state management,
 * including user data, configuration, notifications, and system status.
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { AppStateContext } from '../hooks/state-hooks.js';

/**
 * Application state reducer
 * 
 * @param {Object} state - Current state
 * @param {Object} action - Action object
 * @returns {Object} New state
 */
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
            return { 
                ...state, 
                configuration: { ...state.configuration, ...action.payload } 
            };
            
        case 'ADD_NOTIFICATION':
            return { 
                ...state, 
                notifications: [...state.notifications, { 
                    id: Date.now() + Math.random(),
                    timestamp: new Date(),
                    ...action.payload 
                }]
            };
            
        case 'REMOVE_NOTIFICATION':
            return { 
                ...state, 
                notifications: state.notifications.filter(n => n.id !== action.payload)
            };
            
        case 'CLEAR_NOTIFICATIONS':
            return { ...state, notifications: [] };
            
        case 'UPDATE_MCP_SERVERS':
            return { ...state, mcpServers: action.payload };
            
        case 'SET_SESSION_INFO':
            return { ...state, sessionInfo: action.payload };
            
        case 'UPDATE_SYSTEM_STATUS':
            return { 
                ...state, 
                systemStatus: { ...state.systemStatus, ...action.payload }
            };
            
        case 'SET_COMMAND_HISTORY':
            return { ...state, commandHistory: action.payload };
            
        case 'ADD_COMMAND_TO_HISTORY':
            return {
                ...state,
                commandHistory: [action.payload, ...state.commandHistory.slice(0, 99)] // Keep last 100
            };
            
        case 'SET_ACTIVE_TOOLS':
            return { ...state, activeTools: action.payload };
            
        case 'UPDATE_PERFORMANCE_METRICS':
            return {
                ...state,
                performanceMetrics: { ...state.performanceMetrics, ...action.payload }
            };
            
        case 'SET_FEATURE_FLAGS':
            return { 
                ...state, 
                featureFlags: { ...state.featureFlags, ...action.payload }
            };
            
        case 'RESET_STATE':
            return { ...initialState, ...action.payload };
            
        default:
            console.warn(`Unknown action type: ${action.type}`);
            return state;
    }
};

/**
 * Initial application state
 */
const initialState = {
    // Loading and error states
    isLoading: false,
    error: null,
    
    // User and authentication
    user: null,
    isAuthenticated: false,
    
    // Application configuration
    configuration: {
        apiEndpoint: process.env.CLAUDE_API_ENDPOINT || 'https://api.anthropic.com',
        maxTokens: 200000,
        temperature: 0.7,
        model: 'claude-3-sonnet-20241022',
        streaming: true
    },
    
    // Notifications system
    notifications: [],
    
    // MCP servers and tools
    mcpServers: [],
    activeTools: [],
    
    // Session information
    sessionInfo: {
        id: null,
        startTime: null,
        messageCount: 0,
        tokensUsed: 0
    },
    
    // System status
    systemStatus: {
        online: true,
        apiStatus: 'unknown',
        lastHeartbeat: null,
        version: process.env.npm_package_version || '1.0.0'
    },
    
    // Command history
    commandHistory: [],
    
    // Performance metrics
    performanceMetrics: {
        responseTime: 0,
        tokensPerSecond: 0,
        memoryUsage: 0,
        cpuUsage: 0
    },
    
    // Feature flags
    featureFlags: {
        experimentalFeatures: false,
        debugMode: process.env.NODE_ENV === 'development',
        analyticsEnabled: true
    },
    
    // UI state
    ui: {
        sidebarExpanded: true,
        activePanel: 'chat',
        showNotifications: false
    }
};

/**
 * Application dispatch context
 */
const AppDispatchContext = createContext(null);

/**
 * AppProvider - Provides application state context to child components
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} props.initialState - Optional initial state overrides
 * @param {Function} props.onStateChange - Callback when state changes
 * @returns {JSX.Element} Application provider component
 */
export const AppProvider = ({ children, initialState: customInitialState, onStateChange }) => {
    const [state, dispatch] = useReducer(
        appStateReducer, 
        { ...initialState, ...customInitialState }
    );
    
    // Notify parent of state changes
    useEffect(() => {
        onStateChange?.(state);
    }, [state, onStateChange]);
    
    // Auto-clear errors after 10 seconds
    useEffect(() => {
        if (state.error) {
            const timer = setTimeout(() => {
                dispatch({ type: 'CLEAR_ERROR' });
            }, 10000);
            
            return () => clearTimeout(timer);
        }
    }, [state.error]);
    
    // Auto-remove notifications after their duration
    useEffect(() => {
        state.notifications.forEach(notification => {
            if (notification.duration) {
                const timer = setTimeout(() => {
                    dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
                }, notification.duration);
                
                // Clean up timer (this approach has limitations in practice)
                return () => clearTimeout(timer);
            }
        });
    }, [state.notifications]);
    
    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};

/**
 * useAppDispatch - Hook to access app dispatch function
 * 
 * @returns {Function} Dispatch function
 * @throws {Error} If used outside of AppProvider
 */
export const useAppDispatch = () => {
    const context = useContext(AppDispatchContext);
    if (!context) {
        throw new Error('useAppDispatch must be used within AppProvider');
    }
    return context;
};

/**
 * Custom hooks for common app actions
 */

/**
 * useAppActions - Hook providing common app actions
 * 
 * @returns {Object} Object containing action functions
 */
export const useAppActions = () => {
    const dispatch = useAppDispatch();
    
    return {
        // Loading states
        setLoading: useCallback((isLoading) => {
            dispatch({ type: 'SET_LOADING', payload: isLoading });
        }, [dispatch]),
        
        // Error handling
        setError: useCallback((error) => {
            dispatch({ type: 'SET_ERROR', payload: error });
        }, [dispatch]),
        
        clearError: useCallback(() => {
            dispatch({ type: 'CLEAR_ERROR' });
        }, [dispatch]),
        
        // User management
        setUser: useCallback((user) => {
            dispatch({ type: 'SET_USER', payload: user });
        }, [dispatch]),
        
        // Configuration
        updateConfiguration: useCallback((config) => {
            dispatch({ type: 'SET_CONFIGURATION', payload: config });
        }, [dispatch]),
        
        // Notifications
        addNotification: useCallback((notification) => {
            dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
        }, [dispatch]),
        
        removeNotification: useCallback((id) => {
            dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
        }, [dispatch]),
        
        clearNotifications: useCallback(() => {
            dispatch({ type: 'CLEAR_NOTIFICATIONS' });
        }, [dispatch]),
        
        // Session management
        updateSessionInfo: useCallback((info) => {
            dispatch({ type: 'SET_SESSION_INFO', payload: info });
        }, [dispatch]),
        
        // System status
        updateSystemStatus: useCallback((status) => {
            dispatch({ type: 'UPDATE_SYSTEM_STATUS', payload: status });
        }, [dispatch]),
        
        // Command history
        addCommandToHistory: useCallback((command) => {
            dispatch({ type: 'ADD_COMMAND_TO_HISTORY', payload: command });
        }, [dispatch]),
        
        // Performance metrics
        updatePerformanceMetrics: useCallback((metrics) => {
            dispatch({ type: 'UPDATE_PERFORMANCE_METRICS', payload: metrics });
        }, [dispatch]),
        
        // Feature flags
        setFeatureFlags: useCallback((flags) => {
            dispatch({ type: 'SET_FEATURE_FLAGS', payload: flags });
        }, [dispatch]),
        
        // Reset
        resetState: useCallback((newState = {}) => {
            dispatch({ type: 'RESET_STATE', payload: newState });
        }, [dispatch])
    };
};

/**
 * useNotifications - Hook for notification management
 * 
 * @returns {Object} Notification state and actions
 */
export const useNotifications = () => {
    const state = useAppState();
    const { addNotification, removeNotification, clearNotifications } = useAppActions();
    
    const showSuccess = useCallback((message, options = {}) => {
        addNotification({
            type: 'success',
            message,
            duration: 3000,
            ...options
        });
    }, [addNotification]);
    
    const showError = useCallback((message, options = {}) => {
        addNotification({
            type: 'error',
            message,
            duration: 5000,
            ...options
        });
    }, [addNotification]);
    
    const showWarning = useCallback((message, options = {}) => {
        addNotification({
            type: 'warning',
            message,
            duration: 4000,
            ...options
        });
    }, [addNotification]);
    
    const showInfo = useCallback((message, options = {}) => {
        addNotification({
            type: 'info',
            message,
            duration: 3000,
            ...options
        });
    }, [addNotification]);
    
    return {
        notifications: state.notifications,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeNotification,
        clearNotifications
    };
};

/**
 * useConfiguration - Hook for configuration management
 * 
 * @returns {Object} Configuration state and actions
 */
export const useConfiguration = () => {
    const state = useAppState();
    const { updateConfiguration } = useAppActions();
    
    const updateConfig = useCallback((key, value) => {
        updateConfiguration({ [key]: value });
    }, [updateConfiguration]);
    
    const getConfig = useCallback((key, defaultValue = null) => {
        return state.configuration[key] ?? defaultValue;
    }, [state.configuration]);
    
    return {
        configuration: state.configuration,
        updateConfig,
        updateConfiguration,
        getConfig
    };
};

/**
 * useSystemStatus - Hook for system status monitoring
 * 
 * @returns {Object} System status state and actions
 */
export const useSystemStatus = () => {
    const state = useAppState();
    const { updateSystemStatus } = useAppActions();
    
    const setOnline = useCallback((online = true) => {
        updateSystemStatus({ online });
    }, [updateSystemStatus]);
    
    const setApiStatus = useCallback((status) => {
        updateSystemStatus({ apiStatus: status });
    }, [updateSystemStatus]);
    
    const heartbeat = useCallback(() => {
        updateSystemStatus({ lastHeartbeat: new Date().toISOString() });
    }, [updateSystemStatus]);
    
    return {
        systemStatus: state.systemStatus,
        updateSystemStatus,
        setOnline,
        setApiStatus,
        heartbeat
    };
};

/**
 * Higher-order component that provides app context
 * 
 * @param {React.Component} Component - Component to wrap
 * @returns {React.Component} Wrapped component with app context
 */
export const withAppContext = (Component) => {
    const WrappedComponent = (props) => {
        const appState = useAppState();
        const appActions = useAppActions();
        
        return (
            <Component 
                {...props} 
                appState={appState} 
                appActions={appActions} 
            />
        );
    };
    
    WrappedComponent.displayName = `withAppContext(${Component.displayName || Component.name})`;
    return WrappedComponent;
};

export default AppProvider;