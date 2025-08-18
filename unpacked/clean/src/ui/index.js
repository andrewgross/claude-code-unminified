/**
 * UI Manager
 * 
 * Manages the React-based terminal UI for Claude Code.
 * Provides both simple and rich interactive interfaces.
 */

import React from 'react';
import { render } from 'ink';
import { InteractiveApp } from './components/InteractiveApp.js';

/**
 * Start React-based interactive session
 * 
 * @param {object} options - Session options
 * @returns {object} Session management object
 */
export function startReactSession(options = {}) {
    const {
        initialPrompt,
        model,
        debug = false,
        verbose = false
    } = options;

    let app = null;

    // Handle clean exit
    const handleExit = () => {
        if (app) {
            app.unmount();
        }
        console.log('\n👋 Goodbye!');
        process.exit(0);
    };

    // Setup signal handlers
    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);

    try {
        // Render the React app
        app = render(
            React.createElement(InteractiveApp, {
                initialPrompt,
                model,
                debug,
                verbose,
                onExit: handleExit
            })
        );

        // Return session management object
        return {
            unmount: () => {
                if (app) {
                    app.unmount();
                    app = null;
                }
            },
            
            isActive: () => app !== null,
            
            waitForExit: () => {
                return new Promise((resolve) => {
                    if (!app) {
                        resolve();
                        return;
                    }
                    
                    // Wait for app to unmount
                    const checkInterval = setInterval(() => {
                        if (!app) {
                            clearInterval(checkInterval);
                            resolve();
                        }
                    }, 100);
                });
            }
        };

    } catch (error) {
        console.error('Failed to start React UI:', error.message);
        
        if (debug) {
            console.error(error.stack);
        }
        
        // Fallback to simple terminal interface
        console.log('Falling back to simple terminal interface...');
        return null;
    }
}

/**
 * Check if React UI is available
 * 
 * @returns {boolean} Whether React UI can be used
 */
export function isReactUIAvailable() {
    try {
        // Check if required dependencies are available
        require.resolve('ink');
        require.resolve('react');
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Get UI capabilities
 * 
 * @returns {object} UI capability information
 */
export function getUICapabilities() {
    return {
        reactUI: isReactUIAvailable(),
        simpleTerminal: true,
        colors: process.stdout.hasColors?.() ?? true,
        interactive: process.stdout.isTTY ?? true,
        unicode: process.env.TERM !== 'dumb'
    };
}