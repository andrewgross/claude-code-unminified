---
description: Run tests and analyze results
allowed-tools: Bash(npm test:*), Bash(jest:*), Bash(yarn test:*), Read, Glob
---

# Test Runner and Analysis

Run the project's test suite and analyze the results.

## Arguments
$ARGUMENTS

## Process

1. **Identify Test Framework**: Look for test configuration and scripts
2. **Run Tests**: Execute the appropriate test command
3. **Analyze Results**: 
   - Report test coverage
   - Identify failing tests
   - Suggest improvements

## Test Execution

First, let me check what testing framework and scripts are available:

```
!`cat package.json | grep -A 10 -B 2 "scripts"`
```

Based on the available scripts, I'll run the most appropriate test command and analyze the output.