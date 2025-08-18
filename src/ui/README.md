# Claude Code UI Components Module

This module provides a comprehensive collection of React/Ink components, hooks, providers, and utilities for building interactive terminal user interfaces in Claude Code.

## Overview

The UI components module has been extracted and deobfuscated from the CLI.js file to provide clean, human-readable React/Ink components with full JSDoc documentation. The module is organized into the following categories:

- **Components**: Interactive UI components for terminal interfaces
- **Hooks**: Custom React hooks for input handling and state management
- **Providers**: Context providers for theming and application state
- **Utils**: Terminal-specific utility functions

## Directory Structure

```
src/ui/
├── components/          # React/Ink UI components
│   ├── prompts.js      # Interactive prompts (select, input, confirm)
│   ├── progress.js     # Progress indicators and spinners
│   ├── layout.js       # Layout components (panels, columns, tabs)
│   └── forms.js        # Form components and validation
├── hooks/              # Custom React hooks
│   ├── input-hooks.js  # Input handling hooks
│   └── state-hooks.js  # State management hooks
├── providers/          # React context providers
│   ├── theme-provider.js # Theming system
│   └── app-provider.js   # Application state management
├── utils/              # Utility functions
│   └── terminal-utils.js # Terminal helpers and formatting
├── index.js            # Main export file
└── README.md           # This file
```

## Quick Start

### Basic Usage

```javascript
import { SelectPrompt, ProgressBar, useKeyboardNavigation } from './src/ui';

// Or import specific categories
import { BasicUI } from './src/ui';
const { SelectPrompt, ProgressBar } = BasicUI;
```

### Using with Providers

```javascript
import React from 'react';
import { render } from 'ink';
import { ThemeProvider, AppProvider } from './src/ui';
import MyApp from './MyApp';

const App = () => (
  <ThemeProvider initialTheme="dark">
    <AppProvider>
      <MyApp />
    </AppProvider>
  </ThemeProvider>
);

render(<App />);
```

## Components

### Interactive Prompts (`components/prompts.js`)

- **SelectPrompt**: Single selection from a list of options
- **MultiSelectPrompt**: Multiple selection with checkboxes
- **TextInputPrompt**: Text input with validation
- **ConfirmPrompt**: Yes/no confirmation dialog
- **NumberInputPrompt**: Numeric input with increment/decrement

Example:
```javascript
import { SelectPrompt } from './src/ui';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' }
];

<SelectPrompt 
  title="Choose an option"
  options={options}
  onSelect={(value) => console.log('Selected:', value)}
/>
```

### Progress Indicators (`components/progress.js`)

- **ProgressBar**: Visual progress bar with percentage
- **SpinnerComponent**: Animated loading spinner
- **MultiStepProgress**: Step-by-step progress indicator
- **ActivityIndicator**: Multiple concurrent activity status
- **Timer**: Countdown or elapsed time display
- **BatchProgress**: Progress for batch operations

### Layout Components (`components/layout.js`)

- **Panel**: Bordered container with optional title
- **TwoColumnLayout** / **ThreeColumnLayout**: Multi-column layouts
- **TabPanel**: Tabbed interface with keyboard navigation
- **StatusBar**: Bottom status bar with left/center/right sections
- **Sidebar**: Navigation sidebar
- **GridLayout**: Grid-based layout system
- **Card**: Content card with header/footer
- **Modal**: Modal dialog overlay
- **Accordion**: Collapsible content sections

### Form Components (`components/forms.js`)

- **Form**: Multi-step form with validation
- **FieldSet**: Grouped form fields
- **FormField**: Individual field wrapper
- **FormActions**: Form buttons (submit, cancel)
- **ValidationSummary**: Form validation errors
- **FormProgress**: Form step progress indicator

## Hooks

### Input Handling (`hooks/input-hooks.js`)

- **useKeyboardNavigation**: List navigation with arrow keys
- **useTextInput**: Text input with validation
- **useMultiSelect**: Multiple selection handling
- **useConfirmation**: Yes/no confirmation state
- **useNumberInput**: Numeric input with increment/decrement
- **useHotkeys**: Global hotkey handling
- **useInputHistory**: Command history (bash-like)
- **useTabCompletion**: Tab completion functionality

### State Management (`hooks/state-hooks.js`)

- **useAsyncOperation**: Async operation with loading states
- **useTimer**: Countdown and elapsed time tracking
- **usePersistentState**: State that persists to storage
- **useDebounce**: Value debouncing
- **useInterval**: Interval management
- **useToggle**: Boolean toggle state
- **useCounter**: Counter with increment/decrement
- **useQueue** / **useStack**: Data structure hooks
- **useMap** / **useSet**: Collection hooks

## Providers

### Theme Provider (`providers/theme-provider.js`)

Provides theming system with multiple built-in themes:

- **light**: Light color scheme
- **dark**: Dark color scheme (default)
- **highContrast**: High contrast for accessibility
- **minimal**: Minimal styling

```javascript
import { ThemeProvider, useTheme } from './src/ui';

const MyComponent = () => {
  const { getColor, createTextProps } = useTheme();
  return <Text {...createTextProps({ color: 'primary' })}>Hello</Text>;
};
```

### App Provider (`providers/app-provider.js`)

Manages global application state including:

- User authentication and data
- Application configuration
- Notifications system
- MCP servers and tools
- Session information
- System status
- Command history
- Performance metrics

```javascript
import { useAppActions, useNotifications } from './src/ui';

const MyComponent = () => {
  const { setLoading, setError } = useAppActions();
  const { showSuccess, showError } = useNotifications();
  
  // Use actions...
};
```

## Utilities

### Terminal Utils (`utils/terminal-utils.js`)

Comprehensive utilities for terminal operations:

- **Time formatting**: `formatTime()`, `formatDuration()`, `formatTimestamp()`
- **Data formatting**: `formatBytes()`, `formatNumber()`, `formatPercentage()`
- **Text processing**: `truncateText()`, `wrapText()`, `padText()`
- **Status helpers**: `getStatusIcon()`, `getStatusColor()`
- **Terminal detection**: `getTerminalCapabilities()`, `supportsColor()`
- **Layout helpers**: `createHorizontalLine()`, `createBorder()`
- **Validation**: Common validators for forms

## Pre-configured Bundles

The module provides several pre-configured bundles for different use cases:

- **BasicUI**: Essential components for simple interfaces
- **AdvancedUI**: Full-featured components for complex interfaces
- **ThemeUI**: Theming components and utilities
- **FormUI**: Form components and validation
- **LayoutUI**: Layout and container components

```javascript
import { BasicUI, FormUI } from './src/ui';
const { SelectPrompt, ProgressBar } = BasicUI;
const { Form, validators } = FormUI;
```

## Examples

### Simple Selection Interface

```javascript
import React, { useState } from 'react';
import { SelectPrompt, ProgressBar } from './src/ui';

const MyApp = () => {
  const [selected, setSelected] = useState(null);
  
  if (!selected) {
    return (
      <SelectPrompt
        title="Choose your action"
        options={[
          { label: 'Start Process', value: 'start' },
          { label: 'View Status', value: 'status' },
          { label: 'Exit', value: 'exit' }
        ]}
        onSelect={setSelected}
      />
    );
  }
  
  return <Text>Selected: {selected}</Text>;
};
```

### Form with Validation

```javascript
import React from 'react';
import { Form, validators } from './src/ui';

const MyForm = () => {
  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      validator: validators.minLength(2)
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validator: validators.email
    }
  ];
  
  return (
    <Form
      title="User Information"
      fields={fields}
      onSubmit={(values) => console.log('Form submitted:', values)}
      onCancel={() => console.log('Form cancelled')}
    />
  );
};
```

### Themed Interface

```javascript
import React from 'react';
import { ThemeProvider, ThemedText, Panel } from './src/ui';

const App = () => (
  <ThemeProvider initialTheme="dark">
    <Panel title="My Application" border>
      <ThemedText variant="primary">Welcome to Claude Code</ThemedText>
      <ThemedText variant="muted">Choose an option below:</ThemedText>
    </Panel>
  </ThemeProvider>
);
```

## Best Practices

1. **Use TypeScript**: While not required, TypeScript provides better development experience
2. **Theme Consistency**: Use theme providers and utilities for consistent styling
3. **Accessibility**: Use high contrast themes when needed
4. **Performance**: Use debouncing for rapid user input
5. **Error Handling**: Implement proper error boundaries and validation
6. **Responsive Design**: Consider terminal size constraints

## Dependencies

This module is designed to work with:

- **React**: Component framework
- **Ink**: React for CLI applications
- **Node.js**: Runtime environment

Additional peer dependencies may be required for specific features like spinners or advanced terminal capabilities.

## Contributing

When adding new components or utilities:

1. Follow JSDoc documentation standards
2. Include proper TypeScript types (if using TypeScript)
3. Add examples in component comments
4. Update the main index.js export file
5. Consider accessibility and terminal compatibility
6. Add appropriate error handling

## Migration from Obfuscated Code

This module has been extracted from the obfuscated CLI.js file. The original patterns have been:

1. **Deobfuscated**: Variable names and function names are now human-readable
2. **Documented**: Full JSDoc documentation added
3. **Organized**: Code split into logical modules and categories
4. **Standardized**: Consistent coding patterns and naming conventions
5. **Enhanced**: Additional functionality and utilities added

The components maintain compatibility with the original Ink/React patterns while providing a much cleaner and more maintainable codebase.