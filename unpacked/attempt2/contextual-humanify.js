#!/usr/bin/env node
/**
 * Contextual Humanify - Uses user-provided project description for better naming
 * Non-interactive version that accepts description as command line argument
 */

const PracticalHumanifier = require('./practical-humanify');
const fs = require('fs');

class ContextualHumanifier extends PracticalHumanifier {
  constructor(projectDescription) {
    super();
    this.projectDescription = projectDescription;
    this.contextPatterns = this.buildContextPatterns(projectDescription);
  }

  /**
   * Build context-specific patterns based on user description
   */
  buildContextPatterns(description) {
    const patterns = {};
    const lowerDesc = description.toLowerCase();
    
    // CLI tool patterns
    if (lowerDesc.includes('cli') || lowerDesc.includes('command line')) {
      patterns.cliArgument = {
        pattern: /(process\.argv|commander|yargs|inquirer)/,
        generate: () => 'cliArgument'
      };
      patterns.cliCommand = {
        pattern: /(command|cmd|exec|run)/i,
        generate: () => 'cliCommand'
      };
    }
    
    // Web/API server patterns
    if (lowerDesc.includes('api') || lowerDesc.includes('server') || lowerDesc.includes('express')) {
      patterns.requestHandler = {
        pattern: /(req|request|res|response)/i,
        generate: () => 'requestHandler'
      };
      patterns.routeHandler = {
        pattern: /(route|endpoint|handler)/i,
        generate: () => 'routeHandler'
      };
      patterns.middleware = {
        pattern: /(middleware|next|auth)/i,
        generate: () => 'middleware'
      };
    }
    
    // React/Frontend patterns
    if (lowerDesc.includes('react') || lowerDesc.includes('component') || lowerDesc.includes('frontend')) {
      patterns.reactComponent = {
        pattern: /(component|jsx|props|state)/i,
        generate: () => 'reactComponent'
      };
      patterns.reactHook = {
        pattern: /(use[A-Z]|hook)/i,
        generate: () => 'reactHook'
      };
      patterns.eventHandler = {
        pattern: /(onClick|onChange|onSubmit|handle)/i,
        generate: () => 'eventHandler'
      };
    }
    
    // Data processing patterns
    if (lowerDesc.includes('data') || lowerDesc.includes('processing') || lowerDesc.includes('analytics')) {
      patterns.dataProcessor = {
        pattern: /(transform|process|parse|analyze)/i,
        generate: () => 'dataProcessor'
      };
      patterns.dataValidator = {
        pattern: /(validate|check|verify|sanitize)/i,
        generate: () => 'dataValidator'
      };
      patterns.dataFormatter = {
        pattern: /(format|serialize|stringify)/i,
        generate: () => 'dataFormatter'
      };
    }
    
    // Database patterns
    if (lowerDesc.includes('database') || lowerDesc.includes('db') || lowerDesc.includes('sql') || lowerDesc.includes('mongo')) {
      patterns.dbConnection = {
        pattern: /(connect|connection|pool|client)/i,
        generate: () => 'dbConnection'
      };
      patterns.dbQuery = {
        pattern: /(query|find|insert|update|delete)/i,
        generate: () => 'dbQuery'
      };
      patterns.dbModel = {
        pattern: /(model|schema|collection)/i,
        generate: () => 'dbModel'
      };
    }
    
    // File processing patterns
    if (lowerDesc.includes('file') || lowerDesc.includes('filesystem') || lowerDesc.includes('upload')) {
      patterns.fileProcessor = {
        pattern: /(read|write|upload|download|stream)/i,
        generate: () => 'fileProcessor'
      };
      patterns.fileValidator = {
        pattern: /(validate|check|size|type)/i,
        generate: () => 'fileValidator'
      };
    }
    
    // Authentication patterns
    if (lowerDesc.includes('auth') || lowerDesc.includes('login') || lowerDesc.includes('security')) {
      patterns.authHandler = {
        pattern: /(login|logout|authenticate|authorize)/i,
        generate: () => 'authHandler'
      };
      patterns.tokenHandler = {
        pattern: /(token|jwt|session|cookie)/i,
        generate: () => 'tokenHandler'
      };
    }
    
    // Testing patterns
    if (lowerDesc.includes('test') || lowerDesc.includes('spec') || lowerDesc.includes('mock')) {
      patterns.testHelper = {
        pattern: /(test|spec|mock|stub|expect)/i,
        generate: () => 'testHelper'
      };
    }
    
    // Build/bundler patterns
    if (lowerDesc.includes('webpack') || lowerDesc.includes('build') || lowerDesc.includes('bundle')) {
      patterns.buildConfig = {
        pattern: /(config|settings|options|plugin)/i,
        generate: () => 'buildConfig'
      };
      patterns.bundleProcessor = {
        pattern: /(bundle|chunk|module|loader)/i,
        generate: () => 'bundleProcessor'
      };
    }
    
    return patterns;
  }

  /**
   * Process file with context-aware naming
   */
  async processFile(inputPath = 'cli.js', outputPath = 'humanified-contextual.js') {
    console.log('🎯 CONTEXTUAL HUMANIFICATION');
    console.log('=' .repeat(50));
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📄 Input: ${inputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
    console.log(`🎯 Output: ${outputPath}`);
    console.log(`📋 Context: "${this.projectDescription}"`);
    console.log(`🔍 Using ${Object.keys(this.contextPatterns).length} context-specific patterns`);
    
    // Show detected patterns
    if (Object.keys(this.contextPatterns).length > 0) {
      console.log('🎨 Detected patterns:', Object.keys(this.contextPatterns).join(', '));
    }
    
    return await super.processFile(inputPath, outputPath);
  }

  /**
   * Enhanced pattern matching with context awareness
   */
  generatePracticalName(identifier) {
    // First try context-specific patterns
    const contextName = this.tryContextPatterns(identifier);
    if (contextName) return contextName;
    
    // Fall back to general patterns
    const generalName = super.generatePracticalName(identifier);
    
    // Enhance general names with context
    return this.enhanceNameWithContext(generalName, identifier);
  }

  /**
   * Try context-specific patterns first
   */
  tryContextPatterns(identifier) {
    const { context } = identifier;
    const contextStr = (context || '').toLowerCase();
    
    for (const [patternName, patternConfig] of Object.entries(this.contextPatterns)) {
      const match = contextStr.match(patternConfig.pattern);
      if (match) {
        try {
          return patternConfig.generate(match, identifier.name, contextStr);
        } catch (error) {
          // Continue to next pattern
        }
      }
    }
    
    return null;
  }

  /**
   * Enhance general names with project context
   */
  enhanceNameWithContext(generalName, identifier) {
    const lowerDesc = this.projectDescription.toLowerCase();
    
    // Add context-specific prefixes/suffixes
    if (generalName === 'handlerFunction') {
      if (lowerDesc.includes('cli')) return 'cliHandler';
      if (lowerDesc.includes('api')) return 'apiHandler';
      if (lowerDesc.includes('react')) return 'componentHandler';
      if (lowerDesc.includes('data')) return 'dataHandler';
      if (lowerDesc.includes('file')) return 'fileHandler';
    }
    
    if (generalName === 'dataVar') {
      if (lowerDesc.includes('user')) return 'userData';
      if (lowerDesc.includes('config')) return 'configData';
      if (lowerDesc.includes('api')) return 'apiData';
      if (lowerDesc.includes('file')) return 'fileData';
    }
    
    if (generalName === 'funcVar') {
      if (lowerDesc.includes('validator')) return 'validatorFunction';
      if (lowerDesc.includes('processor')) return 'processorFunction';
      if (lowerDesc.includes('parser')) return 'parserFunction';
    }
    
    return generalName;
  }

  /**
   * Print enhanced results with context information
   */
  printPracticalResults(inputPath, outputPath, renameCount) {
    super.printPracticalResults(inputPath, outputPath, renameCount);
    
    console.log('\n🎯 CONTEXT-AWARE ENHANCEMENTS:');
    console.log(`📋 Project context: "${this.projectDescription}"`);
    console.log(`🎨 Context patterns used: ${Object.keys(this.contextPatterns).length}`);
    
    // Show context-specific renames
    console.log('\n🏆 CONTEXT-AWARE RENAMES:');
    let contextCount = 0;
    for (const [oldName, newName] of this.globalRenameMap) {
      if (this.isContextSpecificName(newName)) {
        console.log(`   ${String(contextCount + 1).padStart(2)}. ${oldName.padEnd(8)} → ${newName} [context-aware]`);
        if (++contextCount >= 10) break;
      }
    }
    
    if (contextCount === 0) {
      console.log('   No context-specific patterns detected in this code sample.');
      console.log('   Names enhanced with general context awareness.');
    }
  }

  /**
   * Check if name is context-specific
   */
  isContextSpecificName(name) {
    const contextKeywords = [
      'cli', 'api', 'react', 'component', 'data', 'db', 'file', 
      'auth', 'request', 'response', 'route', 'middleware', 'token'
    ];
    return contextKeywords.some(keyword => name.toLowerCase().includes(keyword));
  }
}

function showUsage() {
  console.log('🎯 Contextual Humanify - Context-Aware Code Humanification');
  console.log('=' .repeat(60));
  console.log('Usage:');
  console.log('  node contextual-humanify.js <input-file> [output-file] "project description"');
  console.log('');
  console.log('Examples:');
  console.log('  node contextual-humanify.js cli.js output.js "Node.js CLI tool for file processing"');
  console.log('  node contextual-humanify.js app.min.js app-clean.js "React e-commerce frontend with Redux"');
  console.log('  node contextual-humanify.js server.js clean-server.js "Express.js API server with MongoDB"');
  console.log('  node contextual-humanify.js build.js webpack-clean.js "Webpack build configuration"');
  console.log('');
  console.log('The project description helps generate more meaningful variable names');
  console.log('by understanding the domain and technology context of your code.');
  console.log('');
  console.log('Supported contexts:');
  console.log('  • CLI tools (command line interfaces)');
  console.log('  • API servers (Express.js, REST APIs)');
  console.log('  • React frontends (components, hooks, events)');
  console.log('  • Data processing (analytics, transformations)');
  console.log('  • Database operations (SQL, MongoDB)');
  console.log('  • File processing (uploads, streams)');
  console.log('  • Authentication (login, tokens, sessions)');
  console.log('  • Testing frameworks (specs, mocks)');
  console.log('  • Build tools (Webpack, bundlers)');
}

async function main() {
  if (process.argv.length < 4) {
    showUsage();
    process.exit(1);
  }

  const inputFile = process.argv[2];
  const outputFile = process.argv[3] || inputFile.replace('.js', '-contextual.js');
  const projectDescription = process.argv[4];
  
  if (!projectDescription) {
    console.error('❌ Project description is required!');
    console.error('   Example: "React e-commerce app with user authentication"');
    showUsage();
    process.exit(1);
  }
  
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }
  
  try {
    const humanifier = new ContextualHumanifier(projectDescription);
    await humanifier.processFile(inputFile, outputFile);
  } catch (error) {
    console.error('❌ CONTEXTUAL HUMANIFICATION FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = ContextualHumanifier;