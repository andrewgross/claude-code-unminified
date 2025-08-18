/**
 * Header Component
 * 
 * Displays session information and branding at the top of the interface.
 */

import React from 'react';
import { Box, Text } from 'ink';

export function Header({ model, messageCount = 0, debug = false }) {
    return (
        <Box flexDirection="column" marginBottom={1}>
            <Box justifyContent="space-between">
                <Text color="cyan" bold>
                    🤖 Claude Code - Interactive Session
                </Text>
                <Text dimColor>
                    {new Date().toLocaleString()}
                </Text>
            </Box>
            
            <Box justifyContent="space-between">
                <Text>
                    Model: <Text color="green">{model}</Text>
                    {debug && <Text color="yellow"> [DEBUG]</Text>}
                </Text>
                <Text dimColor>
                    Messages: {messageCount}
                </Text>
            </Box>
            
            <Box>
                <Text dimColor>
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                </Text>
            </Box>
        </Box>
    );
}