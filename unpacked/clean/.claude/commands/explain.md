---
description: Explain code architecture and patterns in the current project
allowed-tools: Read, Glob, Grep, LS
argument-hint: [file-pattern] - Optional file pattern to focus on
---

You are a senior software engineer helping to explain the codebase architecture and patterns.

## Task

Analyze the current project structure and explain:

1. **Overall Architecture**: High-level project organization
2. **Key Patterns**: Design patterns and conventions used
3. **Data Flow**: How data moves through the system
4. **Key Components**: Main modules and their responsibilities

$ARGUMENTS

## Analysis Approach

1. First examine the project structure using LS and Glob
2. Look for configuration files, package.json, etc. to understand the tech stack
3. Identify main entry points and core modules
4. Trace key data flows and interactions
5. Highlight any interesting patterns or architectural decisions

Provide a comprehensive but accessible explanation suitable for a developer new to the codebase.