/**
 * Header Component
 * 
 * Displays session information and branding at the top of the interface.
 */

import React from 'react';
import { Box, Text } from 'ink';

export function Header({ model, messageCount = 0, debug = false }) {
    return React.createElement(Box, { flexDirection: "column", marginBottom: 1 },
        React.createElement(Box, { justifyContent: "space-between" },
            React.createElement(Text, { color: "cyan", bold: true },
                "🤖 Claude Code - Interactive Session"
            ),
            React.createElement(Text, { dimColor: true },
                new Date().toLocaleString()
            )
        ),
        
        React.createElement(Box, { justifyContent: "space-between" },
            React.createElement(Text, null,
                "Model: ",
                React.createElement(Text, { color: "green" }, model),
                debug && React.createElement(Text, { color: "yellow" }, " [DEBUG]")
            ),
            React.createElement(Text, { dimColor: true },
                "Messages: ", messageCount
            )
        ),
        
        React.createElement(Box, null,
            React.createElement(Text, { dimColor: true },
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            )
        )
    );
}