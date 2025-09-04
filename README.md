# Claude Code Deobfuscation Project

This repository contains unminified JavaScript code from the Claude Code package, processed using humanifyjs and OpenAI GPT-4o mini for deobfuscation and analysis.

## Project Structure

### Source Files (`claude-code-files/`)

Contains the original minified files from the Claude Code JavaScript package:

- `cli.js` - Main CLI executable (9.1MB, heavily minified)
- `sdk.mjs` - SDK module file (12KB)
- `sdk-tools.d.ts` - TypeScript definitions for SDK tools (8.8KB)
- `sdk.d.ts` - Main SDK TypeScript definitions (4KB)
- `package.json` - Package metadata
- `README.md` - Original Claude Code documentation
- `yoga.wasm` - WebAssembly binary for layout engine (88KB)

### Deobfuscated Output (`output/`)

Contains the processed, human-readable versions of the minified code:

- `deobfuscated.js` - Primary deobfuscated output from the main CLI file (30.9MB)
- `index.js` - Additional deobfuscated module code (101KB) 
- `bundle.json` - Metadata about the bundled modules structure
- `node_modules/` - Dependencies used during processing

## Goal

The primary goal of this project is to make the Claude Code JavaScript implementation more readable and analyzable by:

1. Deobfuscating minified variable names and function signatures
2. Restoring readable code structure and formatting
3. Providing insight into the internal workings of Claude Code's CLI and SDK

## Processing Tools

- **humanifyjs** - Primary deobfuscation tool for JavaScript minified code
- **OpenAI GPT-4o mini** - AI assistance for code analysis and variable naming
- **Node.js toolchain** - Runtime environment for processing scripts

## Usage

The deobfuscated files in `output/` can be examined to understand:
- Claude Code's architecture and implementation patterns
- API integration methods with Anthropic's services
- CLI command handling and user interface logic
- SDK functionality and tool integrations

## Notes

- The original files remain unchanged in `claude-code-files/`
- All deobfuscated output is for analysis purposes only
- The deobfuscation process may not be 100% accurate due to aggressive minification
- Some variable names and structures may still require manual interpretation