/**
 * @fileoverview Layout Components
 * 
 * This module provides React/Ink components for terminal layout management
 * including panels, columns, tabs, and status bars.
 */

import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

/**
 * Panel - A bordered container with optional title
 * 
 * @param {Object} props - Component properties
 * @param {string} props.title - Optional panel title
 * @param {React.ReactNode} props.children - Panel content
 * @param {boolean} props.border - Whether to show border
 * @param {number} props.padding - Internal padding
 * @param {string} props.borderColor - Border color
 * @returns {JSX.Element} Panel component
 */
export const Panel = ({ title, children, border = true, padding = 1, borderColor = 'gray' }) => {
    return (
        <Box 
            flexDirection="column" 
            borderStyle={border ? 'round' : undefined}
            borderColor={borderColor}
            padding={padding}
        >
            {title && (
                <Box marginBottom={1}>
                    <Text bold color="cyan">{title}</Text>
                </Box>
            )}
            {children}
        </Box>
    );
};

/**
 * TwoColumnLayout - Splits content into two columns
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.left - Left column content
 * @param {React.ReactNode} props.right - Right column content
 * @param {string} props.leftWidth - Width of left column (CSS-like value)
 * @param {number} props.gap - Gap between columns
 * @returns {JSX.Element} Two column layout component
 */
export const TwoColumnLayout = ({ left, right, leftWidth = '50%', gap = 2 }) => {
    return (
        <Box>
            <Box width={leftWidth} marginRight={gap}>
                {left}
            </Box>
            <Box flexGrow={1}>
                {right}
            </Box>
        </Box>
    );
};

/**
 * ThreeColumnLayout - Splits content into three columns
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.left - Left column content
 * @param {React.ReactNode} props.center - Center column content
 * @param {React.ReactNode} props.right - Right column content
 * @param {string} props.leftWidth - Width of left column
 * @param {string} props.rightWidth - Width of right column
 * @param {number} props.gap - Gap between columns
 * @returns {JSX.Element} Three column layout component
 */
export const ThreeColumnLayout = ({ left, center, right, leftWidth = '33%', rightWidth = '33%', gap = 1 }) => {
    return (
        <Box>
            <Box width={leftWidth} marginRight={gap}>
                {left}
            </Box>
            <Box flexGrow={1} marginRight={gap}>
                {center}
            </Box>
            <Box width={rightWidth}>
                {right}
            </Box>
        </Box>
    );
};

/**
 * TabPanel - Tabbed interface with keyboard navigation
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.tabs - Array of tab objects with title and content
 * @param {number} props.activeTab - Index of currently active tab
 * @param {Function} props.onTabChange - Callback when tab changes
 * @param {React.ReactNode} props.children - Tab content (alternative to tabs array)
 * @returns {JSX.Element} Tab panel component
 */
export const TabPanel = ({ tabs, activeTab, onTabChange, children }) => {
    useInput((input, key) => {
        if (key.leftArrow) {
            const newIndex = Math.max(0, activeTab - 1);
            onTabChange(newIndex);
        } else if (key.rightArrow) {
            const newIndex = Math.min(tabs.length - 1, activeTab + 1);
            onTabChange(newIndex);
        }
    });
    
    return (
        <Box flexDirection="column">
            <Box>
                {tabs.map((tab, index) => (
                    <Box key={index} marginRight={2}>
                        <Text 
                            color={index === activeTab ? 'cyan' : 'gray'}
                            bold={index === activeTab}
                        >
                            {tab.title}
                        </Text>
                    </Box>
                ))}
            </Box>
            <Box marginTop={1} borderStyle="single" borderColor="gray" padding={1}>
                {children || (tabs[activeTab] && tabs[activeTab].content)}
            </Box>
            <Box marginTop={1}>
                <Text dimColor>
                    Use left/right arrow keys to switch tabs
                </Text>
            </Box>
        </Box>
    );
};

/**
 * StatusBar - Bottom status bar with left, center, and right sections
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.left - Left section content
 * @param {React.ReactNode} props.center - Center section content
 * @param {React.ReactNode} props.right - Right section content
 * @param {string} props.borderColor - Border color
 * @returns {JSX.Element} Status bar component
 */
export const StatusBar = ({ left, center, right, borderColor = 'gray' }) => {
    return (
        <Box borderStyle="single" borderColor={borderColor} padding={1}>
            <Box flexGrow={1}>
                {left}
            </Box>
            <Box>
                {center}
            </Box>
            <Box flexGrow={1} justifyContent="flex-end">
                {right}
            </Box>
        </Box>
    );
};

/**
 * Sidebar - Side navigation panel
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.items - Array of sidebar items with label and value
 * @param {number} props.selectedIndex - Index of selected item
 * @param {Function} props.onSelect - Callback when item is selected
 * @param {string} props.title - Sidebar title
 * @param {number} props.width - Sidebar width
 * @returns {JSX.Element} Sidebar component
 */
export const Sidebar = ({ items, selectedIndex, onSelect, title, width = 20 }) => {
    useInput((input, key) => {
        if (key.upArrow) {
            const newIndex = Math.max(0, selectedIndex - 1);
            onSelect(newIndex, items[newIndex]);
        } else if (key.downArrow) {
            const newIndex = Math.min(items.length - 1, selectedIndex + 1);
            onSelect(newIndex, items[newIndex]);
        } else if (key.return) {
            onSelect(selectedIndex, items[selectedIndex]);
        }
    });
    
    return (
        <Box flexDirection="column" width={width} borderStyle="single" borderColor="gray" padding={1}>
            {title && (
                <Box marginBottom={1}>
                    <Text bold color="cyan">{title}</Text>
                </Box>
            )}
            {items.map((item, index) => (
                <Box key={index}>
                    <Text color={index === selectedIndex ? 'cyan' : 'white'}>
                        {index === selectedIndex ? '❯' : ' '} {item.label}
                    </Text>
                </Box>
            ))}
        </Box>
    );
};

/**
 * GridLayout - Grid-based layout system
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Grid items
 * @param {number} props.columns - Number of columns
 * @param {number} props.gap - Gap between grid items
 * @returns {JSX.Element} Grid layout component
 */
export const GridLayout = ({ children, columns = 2, gap = 1 }) => {
    const childrenArray = React.Children.toArray(children);
    const rows = [];
    
    for (let i = 0; i < childrenArray.length; i += columns) {
        const rowItems = childrenArray.slice(i, i + columns);
        rows.push(rowItems);
    }
    
    return (
        <Box flexDirection="column">
            {rows.map((row, rowIndex) => (
                <Box key={rowIndex} marginBottom={gap}>
                    {row.map((item, colIndex) => (
                        <Box key={colIndex} flexGrow={1} marginRight={colIndex < row.length - 1 ? gap : 0}>
                            {item}
                        </Box>
                    ))}
                </Box>
            ))}
        </Box>
    );
};

/**
 * Card - Content card with optional header and footer
 * 
 * @param {Object} props - Component properties
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {React.ReactNode} props.footer - Card footer content
 * @param {boolean} props.border - Whether to show border
 * @param {number} props.padding - Internal padding
 * @returns {JSX.Element} Card component
 */
export const Card = ({ title, children, footer, border = true, padding = 1 }) => {
    return (
        <Box 
            flexDirection="column" 
            borderStyle={border ? 'round' : undefined}
            borderColor="gray"
            padding={padding}
        >
            {title && (
                <Box marginBottom={1} borderStyle="single" borderBottom borderColor="gray" paddingBottom={1}>
                    <Text bold>{title}</Text>
                </Box>
            )}
            <Box flexGrow={1}>
                {children}
            </Box>
            {footer && (
                <Box marginTop={1} borderStyle="single" borderTop borderColor="gray" paddingTop={1}>
                    {footer}
                </Box>
            )}
        </Box>
    );
};

/**
 * Modal - Modal dialog overlay
 * 
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Callback to close modal
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {number} props.width - Modal width
 * @param {number} props.height - Modal height
 * @returns {JSX.Element|null} Modal component
 */
export const Modal = ({ isOpen, onClose, title, children, width = 60, height = 20 }) => {
    useInput((input, key) => {
        if (key.escape) {
            onClose();
        }
    });
    
    if (!isOpen) return null;
    
    return (
        <Box 
            flexDirection="column" 
            width={width} 
            height={height}
            borderStyle="double"
            borderColor="cyan"
            padding={1}
            justifyContent="center"
            alignItems="center"
        >
            {title && (
                <Box marginBottom={1}>
                    <Text bold color="cyan">{title}</Text>
                </Box>
            )}
            <Box flexGrow={1} width="100%">
                {children}
            </Box>
            <Box marginTop={1}>
                <Text dimColor>Press Esc to close</Text>
            </Box>
        </Box>
    );
};

/**
 * Accordion - Collapsible content sections
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.sections - Array of sections with title and content
 * @param {Set} props.expandedSections - Set of expanded section indices
 * @param {Function} props.onToggle - Callback when section is toggled
 * @returns {JSX.Element} Accordion component
 */
export const Accordion = ({ sections, expandedSections, onToggle }) => {
    const [focusedIndex, setFocusedIndex] = useState(0);
    
    useInput((input, key) => {
        if (key.upArrow) {
            setFocusedIndex(prev => Math.max(0, prev - 1));
        } else if (key.downArrow) {
            setFocusedIndex(prev => Math.min(sections.length - 1, prev + 1));
        } else if (key.return || input === ' ') {
            onToggle(focusedIndex);
        }
    });
    
    return (
        <Box flexDirection="column">
            {sections.map((section, index) => {
                const isExpanded = expandedSections.has(index);
                const isFocused = index === focusedIndex;
                
                return (
                    <Box key={index} flexDirection="column" marginBottom={1}>
                        <Box 
                            borderStyle="single" 
                            borderColor={isFocused ? 'cyan' : 'gray'} 
                            padding={1}
                        >
                            <Text color={isFocused ? 'cyan' : 'white'}>
                                {isExpanded ? '▼' : '▶'} {section.title}
                            </Text>
                        </Box>
                        {isExpanded && (
                            <Box padding={1} borderLeft borderColor="gray" marginLeft={2}>
                                {section.content}
                            </Box>
                        )}
                    </Box>
                );
            })}
            <Box marginTop={1}>
                <Text dimColor>
                    Arrow keys to navigate • Enter/Space to toggle • Sections: {expandedSections.size}/{sections.length}
                </Text>
            </Box>
        </Box>
    );
};