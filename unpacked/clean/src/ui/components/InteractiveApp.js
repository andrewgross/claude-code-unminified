/**
 * Interactive App Component
 * 
 * Main React component for Claude Code interactive sessions.
 * Provides a rich terminal UI with message history, input handling, and commands.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text } from 'ink';
import { ChatInterface } from './ChatInterface.js';
import { StatusBar } from './StatusBar.js';
import { Header } from './Header.js';
import { hooksManager } from '../../hooks/manager.js';
import { slashCommandRegistry, executeSlashCommand } from '../../commands/slash/registry.js';

export function InteractiveApp({ 
    initialPrompt, 
    model, 
    debug = false, 
    verbose = false,
    onExit 
}) {
    const [messages, setMessages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [sessionInfo, setSessionInfo] = useState({
        model,
        messageCount: 0,
        startTime: Date.now()
    });

    // Handle initial prompt and load slash commands
    useEffect(() => {
        // Load slash commands on startup
        slashCommandRegistry.loadCommands().catch(error => {
            console.warn('Failed to load slash commands:', error.message);
        });
        
        if (initialPrompt) {
            handleUserMessage(initialPrompt);
        }
    }, [initialPrompt]);

    /**
     * Process user input message
     */
    const handleUserMessage = useCallback(async (message) => {
        if (!message.trim()) return;

        // Handle slash commands
        if (message.startsWith('/')) {
            await handleSlashCommand(message);
            return;
        }

        // Execute UserPromptSubmit hooks for non-command messages
        try {
            for await (const hookResult of hooksManager.executeUserPromptSubmitHooks(message)) {
                if (debug && hookResult.message) {
                    console.log(`UserPromptSubmit Hook: ${hookResult.message}`);
                }
            }
        } catch (error) {
            console.warn('UserPromptSubmit hook failed:', error.message);
            // Continue processing despite hook failure
        }

        // Add user message to history
        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: message,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsProcessing(true);

        try {
            // Simulate API call (replace with real Claude API)
            const response = await simulateClaudeResponse(message);
            
            const assistantMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: response.content,
                timestamp: Date.now(),
                usage: response.usage
            };

            setMessages(prev => [...prev, assistantMessage]);
            
            // Update session info
            setSessionInfo(prev => ({
                ...prev,
                messageCount: prev.messageCount + 2
            }));

        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                role: 'error',
                content: `Error: ${error.message}`,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsProcessing(false);
        }
    }, []);

    /**
     * Handle slash commands using the registry
     */
    const handleSlashCommand = useCallback(async (command) => {
        const context = {
            model: sessionInfo.model,
            messageCount: messages.length,
            startTime: sessionInfo.startTime,
            debug,
            onExit,
            setModel: (model) => {
                setSessionInfo(prev => ({ ...prev, model }));
            },
            setDebug: (debugMode) => {
                setSessionInfo(prev => ({ ...prev, debug: debugMode }));
            },
            clearMessages: () => {
                setMessages([]);
            },
            getToolPermissionContext: () => ({
                alwaysAllowRules: {},
                // Add other permission context as needed
            })
        };
        
        try {
            const result = await executeSlashCommand(command, context);
            
            const systemMessage = {
                id: Date.now(),
                role: result.type === 'error' ? 'error' : 'system',
                content: result.content,
                timestamp: Date.now(),
                ...(result.command && { command: result.command }),
                ...(result.prompt && { prompt: result.prompt })
            };
            
            // Handle special actions
            if (result.action === 'clear') {
                setMessages([]);
                return;
            } else if (result.action === 'quit') {
                if (onExit) {
                    onExit();
                } else {
                    process.exit(0);
                }
                return;
            }
            
            setMessages(prev => [...prev, systemMessage]);
            
            // If this was a custom command with a prompt, we could potentially
            // send that prompt to Claude for processing here
            if (result.type === 'custom_command' && result.prompt) {
                // TODO: Optionally send the custom command prompt to Claude API
                // This would make custom commands actually execute Claude prompts
                console.log('Custom command prompt generated:', result.prompt);
            }
            
        } catch (error) {
            const errorMessage = {
                id: Date.now(),
                role: 'error',
                content: `Command execution failed: ${error.message}`,
                timestamp: Date.now()
            };
            
            setMessages(prev => [...prev, errorMessage]);
        }
    }, [sessionInfo, messages, debug, onExit]);

    /**
     * Get help content (now handled by slash command registry)
     */
    const getHelpContent = () => {
        return slashCommandRegistry.getHelpText();
    };

    /**
     * Get history content
     */
    const getHistoryContent = () => {
        const userMessages = messages.filter(m => m.role === 'user').length;
        const assistantMessages = messages.filter(m => m.role === 'assistant').length;
        const sessionDuration = Math.floor((Date.now() - sessionInfo.startTime) / 1000);
        
        return `Session History:
• Messages: ${messages.length} total (${userMessages} from you, ${assistantMessages} from Claude)
• Duration: ${sessionDuration}s
• Model: ${sessionInfo.model}
• Started: ${new Date(sessionInfo.startTime).toLocaleTimeString()}`;
    };

    /**
     * Get status content
     */
    const getStatusContent = () => {
        const memUsage = process.memoryUsage();
        const uptime = Math.floor(process.uptime());
        
        return `System Status:
• Node.js: ${process.version}
• Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(memUsage.heapTotal / 1024 / 1024)}MB
• Uptime: ${uptime}s
• Platform: ${process.platform}
• Active Messages: ${messages.length}`;
    };

    /**
     * Simulate Claude API response
     */
    const simulateClaudeResponse = async (message) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
        
        const responses = [
            `I understand you said: "${message}"\n\n✨ This is a React-powered interactive session! The UI is built with Ink.js and provides a rich terminal experience.\n\nFeatures working:\n• Message history tracking\n• Real-time input handling\n• Command system (/help, /clear, etc.)\n• Status monitoring\n• Simulated streaming responses\n\nTry typing /help to see available commands!`,
            
            `Thanks for your message: "${message}"\n\nThe React UI implementation includes:\n🎨 Rich terminal components\n📝 Message threading\n⚡ Real-time updates\n🔧 Debug mode support\n📊 Session statistics\n\nThis demonstrates how the clean architecture can support both simple readline (what we had before) and complex React UIs like the original Claude Code.`,
            
            `You wrote: "${message}"\n\n🚀 This React-based interface shows the power of the clean architecture:\n\n✅ Modular components\n✅ State management\n✅ Command handling\n✅ Error boundaries\n✅ Performance monitoring\n\nThe clean implementation successfully supports the original's React UI while maintaining readability and maintainability.`
        ];
        
        const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
        
        return {
            content: selectedResponse,
            usage: {
                input_tokens: Math.floor(message.length / 4),
                output_tokens: Math.floor(selectedResponse.length / 4)
            }
        };
    };

    return React.createElement(Box, { flexDirection: "column", height: "100%" },
        React.createElement(Header, {
            model: sessionInfo.model,
            messageCount: sessionInfo.messageCount,
            debug: debug
        }),
        
        React.createElement(Box, { flexGrow: 1, flexDirection: "column" },
            React.createElement(ChatInterface, {
                messages: messages,
                isProcessing: isProcessing,
                onMessage: handleUserMessage,
                debug: debug
            })
        ),

        React.createElement(StatusBar, {
            messageCount: messages.length,
            isProcessing: isProcessing,
            model: sessionInfo.model
        })
    );
}