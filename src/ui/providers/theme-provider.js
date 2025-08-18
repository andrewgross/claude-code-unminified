/**
 * @fileoverview Theme Provider
 * 
 * This module provides React context for theme management in terminal applications,
 * including color schemes, styling utilities, and dynamic theme switching.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Default theme configurations
 */
const themes = {
    light: {
        name: 'light',
        colors: {
            primary: 'blue',
            secondary: 'cyan', 
            success: 'green',
            warning: 'yellow',
            error: 'red',
            info: 'blue',
            text: 'black',
            background: 'white',
            muted: 'gray',
            border: 'gray',
            accent: 'magenta'
        },
        styles: {
            bold: true,
            dim: false,
            italic: false,
            underline: false
        }
    },
    dark: {
        name: 'dark',
        colors: {
            primary: 'cyan',
            secondary: 'blue',
            success: 'green', 
            warning: 'yellow',
            error: 'red',
            info: 'cyan',
            text: 'white',
            background: 'black',
            muted: 'gray',
            border: 'gray',
            accent: 'magenta'
        },
        styles: {
            bold: true,
            dim: false,
            italic: false,
            underline: false
        }
    },
    highContrast: {
        name: 'highContrast',
        colors: {
            primary: 'white',
            secondary: 'yellow',
            success: 'green',
            warning: 'yellow', 
            error: 'red',
            info: 'white',
            text: 'white',
            background: 'black',
            muted: 'white',
            border: 'white',
            accent: 'yellow'
        },
        styles: {
            bold: true,
            dim: false,
            italic: false,
            underline: true
        }
    },
    minimal: {
        name: 'minimal',
        colors: {
            primary: 'white',
            secondary: 'gray',
            success: 'white',
            warning: 'white',
            error: 'white',
            info: 'white',
            text: 'white',
            background: 'black',
            muted: 'gray',
            border: 'gray',
            accent: 'white'
        },
        styles: {
            bold: false,
            dim: true,
            italic: false,
            underline: false
        }
    }
};

/**
 * Theme context for accessing theme state
 */
const ThemeContext = createContext(null);

/**
 * ThemeProvider - Provides theme context to child components
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.initialTheme - Initial theme name
 * @param {Object} props.customThemes - Additional custom themes
 * @param {Function} props.onThemeChange - Callback when theme changes
 * @returns {JSX.Element} Theme provider component
 */
export const ThemeProvider = ({ 
    children, 
    initialTheme = 'dark', 
    customThemes = {},
    onThemeChange 
}) => {
    // Merge default themes with custom themes
    const allThemes = { ...themes, ...customThemes };
    
    const [currentThemeName, setCurrentThemeName] = useState(() => {
        // Try to get theme from environment or storage
        const savedTheme = process.env.CLAUDE_THEME || 
                          (typeof localStorage !== 'undefined' ? localStorage.getItem('claude-theme') : null);
        return savedTheme && allThemes[savedTheme] ? savedTheme : initialTheme;
    });
    
    const currentTheme = allThemes[currentThemeName] || allThemes.dark;
    
    // Save theme to storage when it changes
    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('claude-theme', currentThemeName);
        }
        onThemeChange?.(currentThemeName, currentTheme);
    }, [currentThemeName, currentTheme, onThemeChange]);
    
    /**
     * Changes the current theme
     * @param {string} themeName - Name of theme to switch to
     */
    const setTheme = useCallback((themeName) => {
        if (allThemes[themeName]) {
            setCurrentThemeName(themeName);
        }
    }, [allThemes]);
    
    /**
     * Toggles between light and dark themes
     */
    const toggleTheme = useCallback(() => {
        const newTheme = currentThemeName === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }, [currentThemeName, setTheme]);
    
    /**
     * Cycles through all available themes
     */
    const cycleTheme = useCallback(() => {
        const themeNames = Object.keys(allThemes);
        const currentIndex = themeNames.indexOf(currentThemeName);
        const nextIndex = (currentIndex + 1) % themeNames.length;
        setTheme(themeNames[nextIndex]);
    }, [allThemes, currentThemeName, setTheme]);
    
    /**
     * Gets a color value from the current theme
     * @param {string} colorName - Name of the color
     * @param {string} fallback - Fallback color if not found
     * @returns {string} Color value
     */
    const getColor = useCallback((colorName, fallback = 'white') => {
        return currentTheme.colors[colorName] || fallback;
    }, [currentTheme]);
    
    /**
     * Gets a style value from the current theme
     * @param {string} styleName - Name of the style
     * @param {any} fallback - Fallback value if not found
     * @returns {any} Style value
     */
    const getStyle = useCallback((styleName, fallback = false) => {
        return currentTheme.styles[styleName] ?? fallback;
    }, [currentTheme]);
    
    /**
     * Creates a styled text props object for Ink Text components
     * @param {Object} options - Styling options
     * @returns {Object} Props object for Text component
     */
    const createTextProps = useCallback((options = {}) => {
        const {
            color = 'text',
            bold,
            dim,
            italic,
            underline,
            backgroundColor,
            ...otherProps
        } = options;
        
        return {
            color: getColor(color),
            bold: bold ?? getStyle('bold'),
            dimColor: dim ?? getStyle('dim'),
            italic: italic ?? getStyle('italic'),
            underline: underline ?? getStyle('underline'),
            backgroundColor: backgroundColor ? getColor(backgroundColor) : undefined,
            ...otherProps
        };
    }, [getColor, getStyle]);
    
    /**
     * Creates a styled box props object for Ink Box components
     * @param {Object} options - Styling options
     * @returns {Object} Props object for Box component
     */
    const createBoxProps = useCallback((options = {}) => {
        const {
            borderColor = 'border',
            backgroundColor,
            ...otherProps
        } = options;
        
        return {
            borderColor: getColor(borderColor),
            backgroundColor: backgroundColor ? getColor(backgroundColor) : undefined,
            ...otherProps
        };
    }, [getColor]);
    
    /**
     * Gets semantic colors for common UI states
     */
    const semanticColors = {
        success: getColor('success'),
        error: getColor('error'), 
        warning: getColor('warning'),
        info: getColor('info'),
        primary: getColor('primary'),
        secondary: getColor('secondary'),
        muted: getColor('muted')
    };
    
    const contextValue = {
        // Theme state
        theme: currentTheme,
        themeName: currentThemeName,
        availableThemes: Object.keys(allThemes),
        themes: allThemes,
        
        // Theme controls
        setTheme,
        toggleTheme,
        cycleTheme,
        
        // Color and style utilities
        getColor,
        getStyle,
        createTextProps,
        createBoxProps,
        semanticColors,
        
        // Theme utilities
        isDark: currentThemeName === 'dark' || currentThemeName === 'highContrast',
        isLight: currentThemeName === 'light',
        isHighContrast: currentThemeName === 'highContrast',
        isMinimal: currentThemeName === 'minimal'
    };
    
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * useTheme - Hook to access theme context
 * 
 * @returns {Object} Theme context value
 * @throws {Error} If used outside of ThemeProvider
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

/**
 * withTheme - Higher-order component that injects theme props
 * 
 * @param {React.Component} Component - Component to wrap
 * @returns {React.Component} Wrapped component with theme props
 */
export const withTheme = (Component) => {
    const ThemedComponent = (props) => {
        const theme = useTheme();
        return <Component {...props} theme={theme} />;
    };
    
    ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
    return ThemedComponent;
};

/**
 * ThemedText - Text component with automatic theme styling
 * 
 * @param {Object} props - Component properties
 * @param {string} props.variant - Text variant (primary, secondary, success, error, etc.)
 * @param {React.ReactNode} props.children - Text content
 * @returns {JSX.Element} Themed text component
 */
export const ThemedText = ({ variant = 'text', children, ...props }) => {
    const { createTextProps } = useTheme();
    const textProps = createTextProps({ color: variant, ...props });
    
    // Note: This would need to be imported from 'ink' in actual usage
    // const { Text } = require('ink');
    // return <Text {...textProps}>{children}</Text>;
    
    // For now, return a placeholder that shows the intended structure
    return React.createElement('text', textProps, children);
};

/**
 * ThemedBox - Box component with automatic theme styling
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Box content
 * @returns {JSX.Element} Themed box component
 */
export const ThemedBox = ({ children, ...props }) => {
    const { createBoxProps } = useTheme();
    const boxProps = createBoxProps(props);
    
    // Note: This would need to be imported from 'ink' in actual usage
    // const { Box } = require('ink');
    // return <Box {...boxProps}>{children}</Box>;
    
    // For now, return a placeholder that shows the intended structure
    return React.createElement('box', boxProps, children);
};

/**
 * Theme utilities for common patterns
 */
export const themeUtils = {
    /**
     * Creates a custom theme by extending an existing theme
     * @param {string} baseTheme - Base theme to extend
     * @param {Object} overrides - Theme property overrides
     * @returns {Object} New theme object
     */
    createTheme: (baseTheme, overrides) => {
        const base = themes[baseTheme] || themes.dark;
        return {
            ...base,
            ...overrides,
            colors: {
                ...base.colors,
                ...overrides.colors
            },
            styles: {
                ...base.styles,
                ...overrides.styles
            }
        };
    },
    
    /**
     * Validates a theme object structure
     * @param {Object} theme - Theme to validate
     * @returns {boolean} Whether theme is valid
     */
    validateTheme: (theme) => {
        return theme &&
               typeof theme === 'object' &&
               theme.colors &&
               typeof theme.colors === 'object' &&
               theme.styles &&
               typeof theme.styles === 'object';
    },
    
    /**
     * Gets contrasting text color for a background color
     * @param {string} backgroundColor - Background color name
     * @param {Object} theme - Theme object
     * @returns {string} Contrasting text color
     */
    getContrastingTextColor: (backgroundColor, theme) => {
        // Simple heuristic - in a real implementation you'd check color luminance
        const darkBackgrounds = ['black', 'blue', 'red', 'magenta'];
        return darkBackgrounds.includes(backgroundColor) ? theme.colors.text : theme.colors.background;
    }
};

export default ThemeProvider;