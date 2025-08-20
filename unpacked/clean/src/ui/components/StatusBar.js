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

    return React.createElement(Box, { flexDirection: "column", marginTop: 1 },
        React.createElement(Box, null,
            React.createElement(Text, { dimColor: true },
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            )
        ),
        
        React.createElement(Box, { justifyContent: "space-between" },
            React.createElement(Box, null,
                React.createElement(Text, { dimColor: true },
                    `💬 ${messageCount} messages`
                ),
                React.createElement(Text, { dimColor: true }, " • "),
                React.createElement(Text, { dimColor: true },
                    `🧠 ${getMemoryInfo()}`
                ),
                isProcessing && [
                    React.createElement(Text, { dimColor: true, key: "separator" }, " • "),
                    React.createElement(Text, { color: "yellow", key: "processing" },
                        "⏳ Processing..."
                    )
                ]
            ),
            
            React.createElement(Text, { dimColor: true },
                `${currentTime.toLocaleTimeString()} • /help for commands • Ctrl+C to exit`
            )
        )
    );
}