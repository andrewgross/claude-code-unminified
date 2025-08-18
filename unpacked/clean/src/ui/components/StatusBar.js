/**
 * Status Bar Component
 * 
 * Shows current session status, processing indicators, and helpful information.
 */

import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

export function StatusBar({ messageCount, isProcessing, model }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    /**
     * Get memory usage info
     */
    const getMemoryInfo = () => {
        const usage = process.memoryUsage();
        const heapMB = Math.round(usage.heapUsed / 1024 / 1024);
        const totalMB = Math.round(usage.heapTotal / 1024 / 1024);
        return `${heapMB}/${totalMB}MB`;
    };

    return (
        <Box flexDirection="column" marginTop={1}>
            <Box>
                <Text dimColor>
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                </Text>
            </Box>
            
            <Box justifyContent="space-between">
                <Box>
                    <Text dimColor>
                        💬 {messageCount} messages
                    </Text>
                    <Text dimColor> • </Text>
                    <Text dimColor>
                        🧠 {getMemoryInfo()}
                    </Text>
                    {isProcessing && (
                        <>
                            <Text dimColor> • </Text>
                            <Text color="yellow">
                                ⏳ Processing...
                            </Text>
                        </>
                    )}
                </Box>
                
                <Text dimColor>
                    {currentTime.toLocaleTimeString()} • /help for commands • Ctrl+C to exit
                </Text>
            </Box>
        </Box>
    );
}