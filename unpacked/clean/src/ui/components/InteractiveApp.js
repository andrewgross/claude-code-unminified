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

    // Handle initial prompt
    useEffect(() => {
        if (initialPrompt) {
            handleUserMessage(initialPrompt);
        }
    }, [initialPrompt]);

    /**
     * Process user input message
     */
    const handleUserMessage = useCallback(async (message) => {
        if (!message.trim()) return;

        // Handle commands
        if (message.startsWith('/')) {
            await handleCommand(message);
            return;
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
     * Handle special commands
     */
    const handleCommand = useCallback(async (command) => {
        const cmd = command.toLowerCase().trim();
        
        const systemMessage = {
            id: Date.now(),
            role: 'system',
            content: '',
            timestamp: Date.now()
        };

        switch (cmd) {
            case '/help':
                systemMessage.content = getHelpContent();
                break;
                
            case '/clear':
                setMessages([]);
                return;
                
            case '/history':
                systemMessage.content = getHistoryContent();
                break;
                
            case '/model':
                systemMessage.content = `Current model: ${sessionInfo.model}`;
                break;
                
            case '/status':
                systemMessage.content = getStatusContent();
                break;
                
            case '/debug':
                setSessionInfo(prev => ({ ...prev, debug: !debug }));
                systemMessage.content = `Debug mode ${debug ? 'disabled' : 'enabled'}`;
                break;
                
            case '/quit':
            case '/exit':
                if (onExit) {
                    onExit();
                } else {
                    process.exit(0);
                }
                return;
                
            default:
                systemMessage.content = `Unknown command: ${command}. Type /help for available commands.`;
        }

        setMessages(prev => [...prev, systemMessage]);
    }, [sessionInfo, debug, onExit, messages]);

    /**
     * Get help content
     */
    const getHelpContent = () => {
        return `Available Commands:
/help     - Show this help message
/clear    - Clear conversation history
/history  - Show conversation summary
/model    - Show current model
/status   - Show session status
/debug    - Toggle debug mode
/quit     - Exit Claude Code

Just type your message to chat with Claude!`;
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

    return (
        <Box flexDirection="column" height="100%">
            <Header 
                model={sessionInfo.model}
                messageCount={sessionInfo.messageCount}
                debug={debug}
            />
            
            <Box flexGrow={1} flexDirection="column">
                <ChatInterface
                    messages={messages}
                    isProcessing={isProcessing}
                    onMessage={handleUserMessage}
                    debug={debug}
                />
            </Box>

            <StatusBar
                messageCount={messages.length}
                isProcessing={isProcessing}
                model={sessionInfo.model}
            />
        </Box>
    );
}