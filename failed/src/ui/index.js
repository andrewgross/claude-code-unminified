/**
 * @fileoverview UI Components Module Index
 * 
 * This module provides a centralized export point for all Claude Code UI components,
 * hooks, providers, and utilities for building interactive terminal interfaces.
 */

// Component exports
export {
    SelectPrompt,
    MultiSelectPrompt,
    TextInputPrompt,
    ConfirmPrompt,
    NumberInputPrompt
} from './components/prompts.js';

export {
    ProgressBar,
    SpinnerComponent,
    MultiStepProgress,
    ActivityIndicator,
    CircularProgress,
    LoadingDots,
    Timer,
    BatchProgress
} from './components/progress.js';

export {
    Panel,
    TwoColumnLayout,
    ThreeColumnLayout,
    TabPanel,
    StatusBar,
    Sidebar,
    GridLayout,
    Card,
    Modal,
    Accordion
} from './components/layout.js';

export {
    Form,
    FieldSet,
    FormField,
    FormActions,
    ValidationSummary,
    FormProgress,
    validators
} from './components/forms.js';

// Hook exports
export {
    useKeyboardNavigation,
    useTextInput,
    useMultiSelect,
    useConfirmation,
    useNumberInput,
    useHotkeys,
    useInputHistory,
    useTabCompletion
} from './hooks/input-hooks.js';

export {
    useAsyncOperation,
    useTimer,
    usePersistentState,
    useDebounce,
    useInterval,
    useToggle,
    useCounter,
    usePrevious,
    useQueue,
    useStack,
    useMap,
    useSet,
    useLocalState,
    useAppState,
    AppStateContext
} from './hooks/state-hooks.js';

// Provider exports
export {
    ThemeProvider,
    useTheme,
    withTheme,
    ThemedText,
    ThemedBox,
    themeUtils
} from './providers/theme-provider.js';

export {
    AppProvider,
    useAppDispatch,
    useAppActions,
    useNotifications,
    useConfiguration,
    useSystemStatus,
    withAppContext
} from './providers/app-provider.js';

// Utility exports
export {
    formatTime,
    formatDuration,
    formatTimestamp,
    formatBytes,
    formatNumber,
    formatPercentage,
    truncateText,
    wrapText,
    padText,
    symbols,
    getStatusIcon,
    getStatusColor,
    getTerminalCapabilities,
    supportsColor,
    supportsUnicode,
    createHorizontalLine,
    createBorder,
    validators as terminalValidators
} from './utils/terminal-utils.js';

/**
 * Pre-configured component bundles for common use cases
 */

/**
 * Basic UI bundle - Essential components for simple interfaces
 */
export const BasicUI = {
    // Components
    SelectPrompt,
    TextInputPrompt,
    ConfirmPrompt,
    ProgressBar,
    SpinnerComponent,
    Panel,
    
    // Hooks
    useKeyboardNavigation,
    useTextInput,
    useConfirmation,
    useAsyncOperation,
    
    // Utils
    formatTime,
    getStatusIcon,
    getStatusColor
};

/**
 * Advanced UI bundle - Full featured components for complex interfaces
 */
export const AdvancedUI = {
    // All components
    SelectPrompt,
    MultiSelectPrompt,
    TextInputPrompt,
    ConfirmPrompt,
    NumberInputPrompt,
    ProgressBar,
    SpinnerComponent,
    MultiStepProgress,
    ActivityIndicator,
    Form,
    TabPanel,
    Modal,
    
    // All hooks
    useKeyboardNavigation,
    useTextInput,
    useMultiSelect,
    useAsyncOperation,
    useTimer,
    useDebounce,
    useHotkeys,
    
    // Providers
    ThemeProvider,
    AppProvider,
    useTheme,
    useAppActions,
    
    // Utils
    formatTime,
    formatBytes,
    wrapText,
    createBorder
};

/**
 * Theme bundle - Theming components and utilities
 */
export const ThemeUI = {
    ThemeProvider,
    useTheme,
    withTheme,
    ThemedText,
    ThemedBox,
    themeUtils
};

/**
 * Form bundle - Form components and validation
 */
export const FormUI = {
    Form,
    FieldSet,
    FormField,
    FormActions,
    ValidationSummary,
    FormProgress,
    validators,
    
    // Input components
    TextInputPrompt,
    NumberInputPrompt,
    SelectPrompt,
    MultiSelectPrompt,
    ConfirmPrompt,
    
    // Input hooks
    useTextInput,
    useNumberInput,
    useMultiSelect,
    useConfirmation
};

/**
 * Layout bundle - Layout and container components
 */
export const LayoutUI = {
    Panel,
    TwoColumnLayout,
    ThreeColumnLayout,
    TabPanel,
    StatusBar,
    Sidebar,
    GridLayout,
    Card,
    Modal,
    Accordion
};

/**
 * Default export with all UI components
 */
export default {
    // Component categories
    prompts: {
        SelectPrompt,
        MultiSelectPrompt,
        TextInputPrompt,
        ConfirmPrompt,
        NumberInputPrompt
    },
    
    progress: {
        ProgressBar,
        SpinnerComponent,
        MultiStepProgress,
        ActivityIndicator,
        CircularProgress,
        LoadingDots,
        Timer,
        BatchProgress
    },
    
    layout: {
        Panel,
        TwoColumnLayout,
        ThreeColumnLayout,
        TabPanel,
        StatusBar,
        Sidebar,
        GridLayout,
        Card,
        Modal,
        Accordion
    },
    
    forms: {
        Form,
        FieldSet,
        FormField,
        FormActions,
        ValidationSummary,
        FormProgress,
        validators
    },
    
    // Hook categories
    hooks: {
        input: {
            useKeyboardNavigation,
            useTextInput,
            useMultiSelect,
            useConfirmation,
            useNumberInput,
            useHotkeys,
            useInputHistory,
            useTabCompletion
        },
        
        state: {
            useAsyncOperation,
            useTimer,
            usePersistentState,
            useDebounce,
            useInterval,
            useToggle,
            useCounter,
            usePrevious,
            useQueue,
            useStack,
            useMap,
            useSet,
            useLocalState,
            useAppState
        }
    },
    
    // Provider categories
    providers: {
        ThemeProvider,
        AppProvider,
        useTheme,
        useAppDispatch,
        useAppActions,
        useNotifications,
        useConfiguration,
        useSystemStatus
    },
    
    // Utility categories
    utils: {
        formatting: {
            formatTime,
            formatDuration,
            formatTimestamp,
            formatBytes,
            formatNumber,
            formatPercentage
        },
        
        text: {
            truncateText,
            wrapText,
            padText
        },
        
        terminal: {
            symbols,
            getStatusIcon,
            getStatusColor,
            getTerminalCapabilities,
            supportsColor,
            supportsUnicode,
            createHorizontalLine,
            createBorder
        },
        
        validation: {
            validators: terminalValidators
        }
    },
    
    // Pre-configured bundles
    bundles: {
        BasicUI,
        AdvancedUI,
        ThemeUI,
        FormUI,
        LayoutUI
    }
};