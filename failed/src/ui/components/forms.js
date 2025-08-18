/**
 * @fileoverview Form Components
 * 
 * This module provides React/Ink components for building interactive forms
 * in the terminal with validation, multi-step workflows, and field management.
 */

import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { SelectPrompt, MultiSelectPrompt, TextInputPrompt, ConfirmPrompt, NumberInputPrompt } from './prompts.js';

/**
 * Form - Multi-step form component with validation
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.fields - Array of form field configurations
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {Function} props.onCancel - Callback when form is cancelled
 * @param {string} props.title - Form title
 * @returns {JSX.Element} Form component
 */
export const Form = ({ fields, onSubmit, onCancel, title }) => {
    const [values, setValues] = useState({});
    const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const [errors, setErrors] = useState({});
    
    const currentField = fields[currentFieldIndex];
    
    /**
     * Handles submission of a single field
     * @param {any} value - The field value
     */
    const handleFieldSubmit = (value) => {
        const updatedValues = { ...values, [currentField.name]: value };
        setValues(updatedValues);
        
        // Validate field if validator provided
        if (currentField.validator) {
            const validation = currentField.validator(value);
            if (!validation.valid) {
                setErrors(prev => ({ ...prev, [currentField.name]: validation.message }));
                return;
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[currentField.name];
                    return newErrors;
                });
            }
        }
        
        // Move to next field or submit form
        if (currentFieldIndex < fields.length - 1) {
            setCurrentFieldIndex(prev => prev + 1);
        } else {
            // All fields completed, validate entire form
            const formErrors = validateForm(updatedValues, fields);
            if (Object.keys(formErrors).length === 0) {
                onSubmit(updatedValues);
            } else {
                setErrors(formErrors);
                // Go back to first field with error
                const firstErrorField = fields.findIndex(field => formErrors[field.name]);
                setCurrentFieldIndex(firstErrorField);
            }
        }
    };
    
    /**
     * Handles cancellation or going back to previous field
     */
    const handleFieldCancel = () => {
        if (currentFieldIndex > 0) {
            setCurrentFieldIndex(prev => prev - 1);
        } else {
            onCancel();
        }
    };
    
    return (
        <Box flexDirection="column">
            {title && (
                <Box marginBottom={1}>
                    <Text bold color="cyan">{title}</Text>
                </Box>
            )}
            
            {/* Progress indicator */}
            <Box marginBottom={1}>
                <Text dimColor>
                    Step {currentFieldIndex + 1} of {fields.length}
                </Text>
            </Box>
            
            {/* Current field */}
            <Box marginBottom={1}>
                {renderField(currentField, values[currentField.name], handleFieldSubmit, handleFieldCancel)}
            </Box>
            
            {/* Error display */}
            {errors[currentField.name] && (
                <Box marginBottom={1}>
                    <Text color="red">Error: {errors[currentField.name]}</Text>
                </Box>
            )}
            
            {/* Previous values display */}
            {currentFieldIndex > 0 && (
                <Box marginTop={1}>
                    <Text dimColor>Previous values:</Text>
                    {fields.slice(0, currentFieldIndex).map(field => (
                        <Text key={field.name} dimColor>
                            {field.label}: {formatValue(values[field.name], field.type)}
                        </Text>
                    ))}
                </Box>
            )}
        </Box>
    );
};

/**
 * FieldSet - Groups related form fields
 * 
 * @param {Object} props - Component properties
 * @param {string} props.legend - Fieldset legend/title
 * @param {React.ReactNode} props.children - Field components
 * @param {boolean} props.border - Whether to show border
 * @returns {JSX.Element} FieldSet component
 */
export const FieldSet = ({ legend, children, border = true }) => {
    return (
        <Box 
            flexDirection="column" 
            borderStyle={border ? 'single' : undefined}
            borderColor="gray"
            padding={1}
        >
            {legend && (
                <Box marginBottom={1}>
                    <Text bold>{legend}</Text>
                </Box>
            )}
            {children}
        </Box>
    );
};

/**
 * FormField - Individual form field wrapper with label and validation
 * 
 * @param {Object} props - Component properties
 * @param {string} props.label - Field label
 * @param {string} props.name - Field name
 * @param {any} props.value - Field value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether field is required
 * @param {React.ReactNode} props.children - Field input component
 * @returns {JSX.Element} FormField component
 */
export const FormField = ({ label, name, value, onChange, error, required, children }) => {
    return (
        <Box flexDirection="column" marginBottom={1}>
            <Box>
                <Text bold>{label}</Text>
                {required && <Text color="red"> *</Text>}
            </Box>
            <Box marginTop={1}>
                {children}
            </Box>
            {error && (
                <Box marginTop={1}>
                    <Text color="red">{error}</Text>
                </Box>
            )}
        </Box>
    );
};

/**
 * FormActions - Form action buttons (submit, cancel, etc.)
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.onSubmit - Submit handler
 * @param {Function} props.onCancel - Cancel handler
 * @param {Function} props.onReset - Reset handler
 * @param {boolean} props.canSubmit - Whether form can be submitted
 * @param {string} props.submitLabel - Submit button label
 * @param {string} props.cancelLabel - Cancel button label
 * @returns {JSX.Element} FormActions component
 */
export const FormActions = ({ 
    onSubmit, 
    onCancel, 
    onReset, 
    canSubmit = true,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel'
}) => {
    return (
        <Box marginTop={1}>
            <Box marginRight={2}>
                <Text color={canSubmit ? 'green' : 'gray'}>
                    {canSubmit ? `✓ ${submitLabel}` : `○ ${submitLabel}`}
                </Text>
            </Box>
            <Box marginRight={2}>
                <Text color="red">✗ {cancelLabel}</Text>
            </Box>
            {onReset && (
                <Box>
                    <Text color="yellow">↻ Reset</Text>
                </Box>
            )}
        </Box>
    );
};

/**
 * ValidationSummary - Displays form validation errors
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.errors - Object containing field errors
 * @param {string} props.title - Summary title
 * @returns {JSX.Element|null} ValidationSummary component
 */
export const ValidationSummary = ({ errors, title = 'Validation Errors' }) => {
    const errorList = Object.entries(errors);
    
    if (errorList.length === 0) return null;
    
    return (
        <Box flexDirection="column" marginBottom={1} borderStyle="single" borderColor="red" padding={1}>
            <Box marginBottom={1}>
                <Text bold color="red">{title}</Text>
            </Box>
            {errorList.map(([field, error]) => (
                <Box key={field}>
                    <Text color="red">• {field}: {error}</Text>
                </Box>
            ))}
        </Box>
    );
};

/**
 * FormProgress - Shows progress through form steps
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.steps - Array of step labels
 * @param {number} props.currentStep - Current step index
 * @param {Set} props.completedSteps - Set of completed step indices
 * @param {Set} props.errorSteps - Set of step indices with errors
 * @returns {JSX.Element} FormProgress component
 */
export const FormProgress = ({ steps, currentStep, completedSteps = new Set(), errorSteps = new Set() }) => {
    return (
        <Box flexDirection="column" marginBottom={2}>
            <Box marginBottom={1}>
                <Text bold>Form Progress</Text>
            </Box>
            <Box>
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.has(index);
                    const isCurrent = index === currentStep;
                    const hasError = errorSteps.has(index);
                    
                    let icon = '○';
                    let color = 'gray';
                    
                    if (hasError) {
                        icon = '✗';
                        color = 'red';
                    } else if (isCompleted) {
                        icon = '✓';
                        color = 'green';
                    } else if (isCurrent) {
                        icon = '◉';
                        color = 'cyan';
                    }
                    
                    return (
                        <Box key={index} marginRight={4}>
                            <Text color={color}>{icon}</Text>
                            <Text color={isCurrent ? 'white' : 'gray'}> {step}</Text>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

/**
 * Renders a form field based on its type configuration
 * 
 * @param {Object} field - Field configuration
 * @param {any} currentValue - Current field value
 * @param {Function} onSubmit - Submit handler
 * @param {Function} onCancel - Cancel handler
 * @returns {JSX.Element} Rendered field component
 */
const renderField = (field, currentValue, onSubmit, onCancel) => {
    switch (field.type) {
        case 'text':
        case 'email':
        case 'password':
            return (
                <TextInputPrompt
                    title={field.label}
                    placeholder={field.placeholder}
                    secure={field.type === 'password'}
                    onSubmit={onSubmit}
                    validator={field.validator}
                />
            );
            
        case 'number':
            return (
                <NumberInputPrompt
                    title={field.label}
                    placeholder={field.placeholder}
                    onSubmit={onSubmit}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                />
            );
            
        case 'select':
            return (
                <SelectPrompt
                    title={field.label}
                    options={field.options}
                    onSelect={onSubmit}
                    defaultValue={currentValue}
                />
            );
            
        case 'multiselect':
            return (
                <MultiSelectPrompt
                    title={field.label}
                    options={field.options}
                    onSubmit={onSubmit}
                    defaultValues={currentValue || []}
                />
            );
            
        case 'confirm':
            return (
                <ConfirmPrompt
                    title={field.label}
                    onConfirm={(confirmed) => onSubmit(confirmed)}
                />
            );
            
        default:
            return (
                <TextInputPrompt
                    title={field.label}
                    placeholder={field.placeholder}
                    onSubmit={onSubmit}
                />
            );
    }
};

/**
 * Validates entire form against field configurations
 * 
 * @param {Object} values - Form values
 * @param {Array} fields - Field configurations
 * @returns {Object} Object containing field errors
 */
const validateForm = (values, fields) => {
    const errors = {};
    
    fields.forEach(field => {
        const value = values[field.name];
        
        // Check required fields
        if (field.required && (value === undefined || value === null || value === '')) {
            errors[field.name] = 'This field is required';
            return;
        }
        
        // Run field validator
        if (field.validator && value !== undefined && value !== null && value !== '') {
            const validation = field.validator(value);
            if (!validation.valid) {
                errors[field.name] = validation.message;
            }
        }
    });
    
    return errors;
};

/**
 * Formats a value for display based on field type
 * 
 * @param {any} value - Value to format
 * @param {string} type - Field type
 * @returns {string} Formatted value
 */
const formatValue = (value, type) => {
    if (value === undefined || value === null) return 'Not set';
    
    switch (type) {
        case 'password':
            return '*'.repeat(String(value).length);
        case 'multiselect':
            return Array.isArray(value) ? value.join(', ') : String(value);
        case 'confirm':
            return value ? 'Yes' : 'No';
        default:
            return String(value);
    }
};

/**
 * Common form validators
 */
export const validators = {
    required: (value) => ({
        valid: value !== undefined && value !== null && value !== '',
        message: 'This field is required'
    }),
    
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            valid: emailRegex.test(value),
            message: 'Please enter a valid email address'
        };
    },
    
    minLength: (min) => (value) => ({
        valid: String(value).length >= min,
        message: `Must be at least ${min} characters long`
    }),
    
    maxLength: (max) => (value) => ({
        valid: String(value).length <= max,
        message: `Must be no more than ${max} characters long`
    }),
    
    numeric: (value) => ({
        valid: !isNaN(Number(value)),
        message: 'Must be a valid number'
    }),
    
    url: (value) => {
        try {
            new URL(value);
            return { valid: true };
        } catch {
            return { valid: false, message: 'Must be a valid URL' };
        }
    }
};