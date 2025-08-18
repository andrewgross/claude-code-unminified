/**
 * @fileoverview Progress Indicators Components
 * 
 * This module provides React/Ink components for displaying progress indicators,
 * spinners, progress bars, and activity indicators in the terminal.
 */

import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';

/**
 * ProgressBar - Displays a visual progress bar with optional statistics
 * 
 * @param {Object} props - Component properties
 * @param {number} props.current - Current progress value
 * @param {number} props.total - Total/maximum progress value
 * @param {string} props.label - Optional label for the progress bar
 * @param {boolean} props.showPercentage - Whether to show percentage
 * @param {boolean} props.showStats - Whether to show current/total stats
 * @returns {JSX.Element} Progress bar component
 */
export const ProgressBar = ({ current, total, label, showPercentage = true, showStats = true }) => {
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
    const barLength = 40;
    const filled = Math.round((percentage / 100) * barLength);
    const empty = barLength - filled;
    
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    
    return (
        <Box flexDirection="column">
            {label && (
                <Box marginBottom={1}>
                    <Text>{label}</Text>
                </Box>
            )}
            <Box>
                <Text color="green">{bar}</Text>
                {showPercentage && (
                    <Text color="cyan"> {percentage}%</Text>
                )}
            </Box>
            {showStats && (
                <Box>
                    <Text dimColor>
                        {current} / {total} completed
                    </Text>
                </Box>
            )}
        </Box>
    );
};

/**
 * SpinnerComponent - Displays an animated spinner with text
 * 
 * @param {Object} props - Component properties
 * @param {string} props.text - Text to display alongside spinner
 * @param {string} props.type - Spinner animation type
 * @param {string} props.color - Spinner color
 * @returns {JSX.Element} Spinner component
 */
export const SpinnerComponent = ({ text, type = 'dots', color = 'cyan' }) => {
    return (
        <Box>
            <Text color={color}>
                <Spinner type={type} />
            </Text>
            <Text> {text}</Text>
        </Box>
    );
};

/**
 * MultiStepProgress - Displays progress through multiple steps
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.steps - Array of step objects with title and description
 * @param {number} props.currentStep - Index of currently active step
 * @param {Set} props.completedSteps - Set of completed step indices
 * @returns {JSX.Element} Multi-step progress component
 */
export const MultiStepProgress = ({ steps, currentStep, completedSteps = new Set() }) => {
    return (
        <Box flexDirection="column">
            {steps.map((step, index) => {
                const isCompleted = completedSteps.has(index);
                const isCurrent = index === currentStep;
                const isUpcoming = index > currentStep;
                
                let icon = '○';
                let color = 'gray';
                
                if (isCompleted) {
                    icon = '✓';
                    color = 'green';
                } else if (isCurrent) {
                    icon = '◉';
                    color = 'cyan';
                } else if (isUpcoming) {
                    icon = '○';
                    color = 'gray';
                }
                
                return (
                    <Box key={index}>
                        <Text color={color}>{icon}</Text>
                        <Text color={isCurrent ? 'white' : 'gray'}> {step.title}</Text>
                        {step.description && isCurrent && (
                            <Text dimColor> - {step.description}</Text>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
};

/**
 * ActivityIndicator - Shows multiple concurrent activities and their status
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.activities - Array of activity objects with name, status, duration
 * @returns {JSX.Element} Activity indicator component
 */
export const ActivityIndicator = ({ activities }) => {
    return (
        <Box flexDirection="column">
            {activities.map((activity, index) => (
                <Box key={index}>
                    {activity.status === 'running' ? (
                        <Text color="yellow">
                            <Spinner type="dots" />
                        </Text>
                    ) : activity.status === 'completed' ? (
                        <Text color="green">✓</Text>
                    ) : activity.status === 'failed' ? (
                        <Text color="red">✗</Text>
                    ) : (
                        <Text color="gray">○</Text>
                    )}
                    <Text color={activity.status === 'running' ? 'white' : 'gray'}>
                        {' '}{activity.name}
                    </Text>
                    {activity.duration && (
                        <Text dimColor> ({activity.duration}ms)</Text>
                    )}
                </Box>
            ))}
        </Box>
    );
};

/**
 * CircularProgress - Displays a text-based circular progress indicator
 * 
 * @param {Object} props - Component properties
 * @param {number} props.progress - Progress value (0-100)
 * @param {number} props.size - Size of the circular indicator
 * @param {string} props.color - Color of the progress indicator
 * @returns {JSX.Element} Circular progress component
 */
export const CircularProgress = ({ progress = 0, size = 10, color = 'cyan' }) => {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    const angle = (clampedProgress / 100) * 360;
    
    // Simple text-based circular progress using Unicode characters
    const segments = 8; // 8 segments for full circle
    const filledSegments = Math.round((clampedProgress / 100) * segments);
    
    const chars = ['◜', '◝', '◞', '◟', '◜', '◝', '◞', '◟'];
    const filledChar = '●';
    const emptyChar = '○';
    
    let display = '';
    for (let i = 0; i < segments; i++) {
        display += i < filledSegments ? filledChar : emptyChar;
    }
    
    return (
        <Box flexDirection="column" alignItems="center">
            <Text color={color}>{display}</Text>
            <Text color="cyan">{Math.round(clampedProgress)}%</Text>
        </Box>
    );
};

/**
 * LoadingDots - Animated loading dots indicator
 * 
 * @param {Object} props - Component properties
 * @param {string} props.text - Text to show before dots
 * @param {number} props.count - Number of dots to cycle through
 * @param {number} props.speed - Animation speed in milliseconds
 * @returns {JSX.Element} Loading dots component
 */
export const LoadingDots = ({ text = 'Loading', count = 3, speed = 500 }) => {
    const [dotCount, setDotCount] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount(prev => (prev + 1) % (count + 1));
        }, speed);
        
        return () => clearInterval(interval);
    }, [count, speed]);
    
    const dots = '.'.repeat(dotCount);
    
    return (
        <Box>
            <Text>{text}{dots}</Text>
        </Box>
    );
};

/**
 * Timer - Displays a countdown or elapsed time
 * 
 * @param {Object} props - Component properties
 * @param {number} props.duration - Duration in milliseconds (for countdown)
 * @param {boolean} props.countdown - Whether this is a countdown timer
 * @param {Function} props.onComplete - Callback when countdown reaches zero
 * @param {boolean} props.autoStart - Whether to start automatically
 * @returns {JSX.Element} Timer component
 */
export const Timer = ({ duration, countdown = false, onComplete, autoStart = false }) => {
    const [timeRemaining, setTimeRemaining] = useState(countdown ? duration : 0);
    const [isRunning, setIsRunning] = useState(autoStart);
    
    useEffect(() => {
        if (!isRunning) return;
        
        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                const newTime = countdown ? prev - 1000 : prev + 1000;
                
                if (countdown && newTime <= 0) {
                    setIsRunning(false);
                    onComplete?.();
                    return 0;
                }
                
                return newTime;
            });
        }, 1000);
        
        return () => clearInterval(interval);
    }, [isRunning, countdown, onComplete]);
    
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(Math.abs(milliseconds) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    };
    
    const color = countdown && timeRemaining < 10000 ? 'red' : 'cyan'; // Red when less than 10 seconds
    
    return (
        <Box>
            <Text color={color}>{formatTime(timeRemaining)}</Text>
        </Box>
    );
};

/**
 * BatchProgress - Shows progress for batch operations
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.items - Array of items being processed
 * @param {number} props.completed - Number of completed items
 * @param {number} props.failed - Number of failed items
 * @param {string} props.currentItem - Name of currently processing item
 * @returns {JSX.Element} Batch progress component
 */
export const BatchProgress = ({ items, completed, failed, currentItem }) => {
    const total = items.length;
    const remaining = total - completed - failed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return (
        <Box flexDirection="column">
            <ProgressBar current={completed} total={total} showPercentage={true} />
            
            <Box marginTop={1}>
                <Box marginRight={4}>
                    <Text color="green">✓ {completed}</Text>
                </Box>
                <Box marginRight={4}>
                    <Text color="red">✗ {failed}</Text>
                </Box>
                <Box>
                    <Text color="yellow">⏳ {remaining}</Text>
                </Box>
            </Box>
            
            {currentItem && (
                <Box marginTop={1}>
                    <Text dimColor>Processing: </Text>
                    <Text color="cyan">{currentItem}</Text>
                    <Text color="yellow">
                        <Spinner type="dots" />
                    </Text>
                </Box>
            )}
        </Box>
    );
};