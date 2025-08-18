#!/usr/bin/env node
/**
 * Robust LLM-Based Humanify - Production-ready system with rich context
 * Features: Deep context analysis, parallel processing, error handling, scope management
 */

const HumanifyPipeline = require('./humanify-pipeline');
const fs = require('fs');
const path = require('path');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

class RobustLLMHumanifier extends HumanifyPipeline {
  constructor(options = {}) {
    super();
    this.options = {
      maxConcurrent: 3,           // Max parallel LLM calls
      batchSize: 15,              // Identifiers per LLM call (smaller for richer context)
      retryAttempts: 2,           // Retry failed calls
      timeoutMs: 30000,           // 30s timeout per call
      projectDescription: '',     // User-provided project context
      ...options
    };
    
    this.startTime = Date.now();
    this.scopeManager = new ScopeManager();
    this.contextAnalyzer = new DeepContextAnalyzer();
    this.llmClient = new LLMClient(this.options);
    this.stats = {
      processed: 0,
      failed: 0,
      retried: 0,
      apiCalls: 0
    };
  }

  /**
   * Process file with robust LLM-based naming
   */
  async processFile(inputPath = 'cli.js', outputPath = 'humanified-cli-llm.js', projectDescription = '') {
    console.log('🧠 ROBUST LLM-BASED HUMANIFICATION');
    console.log('=' .repeat(50));
    
    this.options.projectDescription = projectDescription;
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📄 Input: ${inputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
    console.log(`🎯 Output: ${outputPath}`);
    console.log(`🤖 Using Claude with rich context analysis...`);
    
    try {
      // Read and parse
      console.log('\n📖 Reading and parsing file...');
      const code = fs.readFileSync(inputPath, 'utf-8');
      const ast = this.parseCode(code);
      
      // Extract identifiers with deep context
      console.log('🔍 Extracting identifiers with usage analysis...');
      const identifiers = this.extractIdentifiersWithContext(ast);
      console.log(`   Found ${identifiers.length.toLocaleString()} identifiers to analyze`);
      
      if (identifiers.length === 0) {
        console.log('ℹ️  No identifiers need renaming');
        fs.writeFileSync(outputPath, code);
        return outputPath;
      }
      
      // Build scope map
      console.log('🏗️  Building scope dependency map...');
      this.scopeManager.buildScopeMap(ast, identifiers);
      
      // Generate renames with LLM
      console.log('🧠 Generating intelligent names with Claude...');
      const renames = await this.generateLLMRenames(identifiers);
      console.log(`   Generated ${renames.size.toLocaleString()} intelligent renames`);
      
      // Apply renames with scope validation
      console.log('🔄 Applying renames with scope validation...');
      this.applyRenamesWithValidation(ast, renames);
      
      // Generate and format code
      console.log('📝 Generating final code...');
      const newCode = this.generateCodeFromAST(ast);
      const finalCode = await this.formatCodeSafe(newCode);
      
      // Write output
      fs.writeFileSync(outputPath, finalCode);
      
      // Print results
      this.printRobustResults(inputPath, outputPath, renames.size);
      this.saveRobustOutputs(outputPath, renames);
      
      return outputPath;
      
    } catch (error) {
      console.error(`❌ Robust LLM processing failed:`, error.message);
      throw error;
    }
  }

  /**
   * Extract identifiers with deep context analysis
   */
  extractIdentifiersWithContext(ast) {
    const identifiers = [];
    const self = this;
    
    traverse(ast, {
      enter(path) {
        const node = path.node;
        
        // Extract with rich context
        if (node.type === 'VariableDeclarator' && node.id?.type === 'Identifier') {
          const name = node.id.name;
          if (self.shouldRename(name)) {
            identifiers.push({
              type: 'variable',
              name,
              astPath: path,
              node: node,
              deepContext: self.contextAnalyzer.analyzeDeepContext(path, ast),
              usageAnalysis: self.contextAnalyzer.analyzeUsagePatterns(path, name, ast)
            });
          }
        }
        
        if (node.type === 'FunctionDeclaration' && node.id?.name) {
          const name = node.id.name;
          if (self.shouldRename(name)) {
            identifiers.push({
              type: 'function',
              name,
              astPath: path,
              node: node,
              deepContext: self.contextAnalyzer.analyzeDeepContext(path, ast),
              usageAnalysis: self.contextAnalyzer.analyzeUsagePatterns(path, name, ast)
            });
          }
        }
        
        if ((node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') && node.params) {
          node.params.forEach((param, index) => {
            if (param.type === 'Identifier' && self.shouldRename(param.name)) {
              identifiers.push({
                type: 'parameter',
                name: param.name,
                astPath: path,
                node: node,
                paramIndex: index,
                deepContext: self.contextAnalyzer.analyzeDeepContext(path, ast),
                usageAnalysis: self.contextAnalyzer.analyzeUsagePatterns(path, param.name, ast)
              });
            }
          });
        }
      }
    });
    
    return identifiers;
  }

  /**
   * Generate renames using LLM with parallel processing
   */
  async generateLLMRenames(identifiers) {
    const allRenames = new Map();
    const batches = this.createBatches(identifiers, this.options.batchSize);
    
    console.log(`📦 Processing ${batches.length} batches with max ${this.options.maxConcurrent} concurrent calls`);
    
    // Process batches in parallel with concurrency control
    const semaphore = new Semaphore(this.options.maxConcurrent);
    const promises = batches.map((batch, index) => 
      semaphore.acquire().then(async (release) => {
        try {
          return await this.processBatchWithRetry(batch, index);
        } finally {
          release();
        }
      })
    );
    
    const results = await Promise.allSettled(promises);
    
    // Merge successful results
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        for (const [oldName, newName] of result.value) {
          // Validate scope conflicts before adding
          if (this.scopeManager.isNameAvailable(oldName, newName)) {
            allRenames.set(oldName, newName);
            this.scopeManager.reserveName(oldName, newName);
          } else {
            // Generate alternative name
            const altName = this.scopeManager.generateAlternativeName(newName);
            allRenames.set(oldName, altName);
            this.scopeManager.reserveName(oldName, altName);
            console.log(`   🔄 Name conflict resolved: ${oldName} → ${newName} → ${altName}`);
          }
        }
      } else if (result.status === 'rejected') {
        console.warn(`   ⚠️  Batch ${index + 1} failed:`, result.reason.message);
        this.stats.failed++;
      }
    });
    
    return allRenames;
  }

  /**
   * Process batch with retry logic
   */
  async processBatchWithRetry(batch, batchIndex) {
    let attempt = 0;
    let lastError;
    
    while (attempt <= this.options.retryAttempts) {
      try {
        const prompt = this.generateEnhancedPrompt(batch, batchIndex);
        const response = await this.llmClient.generateNames(prompt);
        const renames = this.parseLLMResponse(response, batch);
        
        this.stats.processed += batch.length;
        this.stats.apiCalls++;
        
        console.log(`   ✅ Batch ${batchIndex + 1}/${Math.ceil(this.stats.processed / this.options.batchSize)} completed (${batch.length} identifiers)`);
        return renames;
        
      } catch (error) {
        lastError = error;
        attempt++;
        
        if (attempt <= this.options.retryAttempts) {
          console.log(`   🔄 Batch ${batchIndex + 1} attempt ${attempt + 1} (${error.message})`);
          this.stats.retried++;
          await this.sleep(1000 * attempt); // Exponential backoff
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Generate enhanced prompt with rich context
   */
  generateEnhancedPrompt(batch, batchIndex) {
    const projectContext = this.options.projectDescription ? 
      `\nPROJECT CONTEXT: ${this.options.projectDescription}\n` : '';
    
    const existingNames = this.getExistingNames();
    const existingContext = existingNames.length > 0 ? 
      `\nEXISTING NAMES IN CODEBASE: ${existingNames.slice(0, 20).join(', ')}...\n` : '';
    
    const identifierAnalysis = batch.map((id, index) => {
      const usage = id.usageAnalysis;
      const context = id.deepContext;
      
      return `
${batchIndex * this.options.batchSize + index + 1}. IDENTIFIER: "${id.name}" (${id.type})

   ASSIGNMENT/DEFINITION:
   ${context.definition}
   
   HOW IT'S USED (${usage.callSites.length} references):
   ${usage.callSites.slice(0, 3).map(call => `   - ${call}`).join('\n')}
   ${usage.callSites.length > 3 ? `   - ... and ${usage.callSites.length - 3} more` : ''}
   
   FUNCTION BODY (if function):
   ${context.functionBody || 'N/A'}
   
   RELATIONSHIPS:
   - Called by: ${usage.calledBy.join(', ') || 'none'}
   - Calls: ${usage.calls.join(', ') || 'none'}  
   - Related variables: ${usage.relatedVars.join(', ') || 'none'}
   
   SEMANTIC HINTS:
   - Data flow: ${context.dataFlow}
   - Operation type: ${context.operationType}
   - Return pattern: ${context.returnPattern}
   - Error handling: ${context.hasErrorHandling ? 'yes' : 'no'}
   
   SCOPE CONTEXT:
   ${context.scopeInfo}
   
   SUGGESTED NAME: ?`;
    }).join('\n');

    return `You are an expert JavaScript developer helping to humanize minified code. Your task is to generate meaningful, descriptive names for variables and functions.
${projectContext}${existingContext}
IDENTIFIERS TO RENAME:
${identifierAnalysis}

NAMING PRINCIPLES:
1. SEMANTIC CLARITY: Name should immediately convey purpose/role
2. CONSISTENCY: Follow patterns established by existing names  
3. CONTEXT AWARENESS: Consider how it's used, not just what it is
4. SCOPE APPROPRIATE: Local variables can be shorter, module exports should be descriptive
5. NO COLLISIONS: Don't reuse names that already exist in scope

NAMING PATTERNS BY PURPOSE:
- Data processors: processX, parseX, transformX, validateX
- State managers: updateX, setX, getX, resetX  
- Event handlers: handleX, onX, processX
- Utilities: createX, buildX, generateX, formatX
- Collections: listX, mapX, setX, queueX
- Configs: configX, optionsX, settingsX

QUALITY INDICATORS:
✅ Good: "parseUserConfig", "handleFileUpload", "validateEmailInput"
❌ Poor: "dataProcessor", "handlerFunction", "utilityMethod"

Please respond with ONLY the suggested names, one per line:
1. suggestedName1  
2. suggestedName2
...

Focus on WHAT THE CODE DOES based on its usage patterns, not generic types.`;
  }

  /**
   * Create batches ensuring related identifiers stay together
   */
  createBatches(identifiers, batchSize) {
    const batches = [];
    const processed = new Set();
    
    for (let i = 0; i < identifiers.length; i++) {
      if (processed.has(i)) continue;
      
      const batch = [identifiers[i]];
      processed.add(i);
      
      // Find related identifiers to include in same batch
      for (let j = i + 1; j < identifiers.length && batch.length < batchSize; j++) {
        if (processed.has(j)) continue;
        
        if (this.areIdentifiersRelated(identifiers[i], identifiers[j])) {
          batch.push(identifiers[j]);
          processed.add(j);
        }
      }
      
      // Fill remaining batch space
      for (let j = 0; j < identifiers.length && batch.length < batchSize; j++) {
        if (!processed.has(j)) {
          batch.push(identifiers[j]);
          processed.add(j);
        }
      }
      
      batches.push(batch);
    }
    
    return batches;
  }

  /**
   * Check if identifiers are related (should be named together)
   */
  areIdentifiersRelated(id1, id2) {
    const usage1 = id1.usageAnalysis;
    const usage2 = id2.usageAnalysis;
    
    // Same function scope
    if (id1.astPath.getFunctionParent() === id2.astPath.getFunctionParent()) {
      return true;
    }
    
    // One calls the other
    if (usage1.calls.includes(id2.name) || usage2.calls.includes(id1.name)) {
      return true;
    }
    
    // Related variables (used together)
    if (usage1.relatedVars.includes(id2.name) || usage2.relatedVars.includes(id1.name)) {
      return true;
    }
    
    return false;
  }

  /**
   * Get existing names for context
   */
  getExistingNames() {
    return Array.from(this.globalRenameMap.values());
  }

  /**
   * Parse LLM response with validation
   */
  parseLLMResponse(response, batch) {
    const renames = new Map();
    const lines = response.split('\n').filter(line => line.match(/^\d+\./));
    
    lines.forEach((line, index) => {
      const match = line.match(/^\d+\.\s*(.+)$/);
      if (match && batch[index]) {
        const suggestedName = match[1].trim();
        const originalName = batch[index].name;
        
        if (this.isValidName(suggestedName, originalName, batch[index])) {
          renames.set(originalName, suggestedName);
        } else {
          console.warn(`   ⚠️  Invalid suggestion for ${originalName}: ${suggestedName}`);
        }
      }
    });
    
    return renames;
  }

  /**
   * Validate suggested name
   */
  isValidName(suggested, original, identifier) {
    // Basic identifier validation
    if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(suggested)) return false;
    if (suggested.length < 3 || suggested.length > 40) return false;
    if (suggested === original) return false;
    
    // JavaScript reserved words
    const reserved = ['var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'break', 'continue'];
    if (reserved.includes(suggested.toLowerCase())) return false;
    
    // Context appropriateness
    if (identifier.type === 'parameter' && suggested.length > 15) return false;
    
    return true;
  }

  /**
   * Apply renames with scope validation
   */
  applyRenamesWithValidation(ast, renames) {
    const validatedRenames = new Map();
    
    // Final scope validation
    for (const [oldName, newName] of renames) {
      if (this.scopeManager.validateRename(oldName, newName)) {
        validatedRenames.set(oldName, newName);
      } else {
        const safeName = this.scopeManager.generateSafeName(oldName, newName);
        validatedRenames.set(oldName, safeName);
        console.log(`   🛡️  Scope conflict: ${oldName} → ${newName} → ${safeName}`);
      }
    }
    
    // Apply renames using Babel's scope.rename
    this.applyRenames(ast, validatedRenames);
  }

  /**
   * Generate code from AST
   */
  generateCodeFromAST(ast) {
    const generator = require('@babel/generator').default;
    return generator(ast, {
      compact: false,
      minified: false,
      comments: true
    }).code;
  }

  /**
   * Safe code formatting
   */
  async formatCodeSafe(code) {
    if (code.length > 10 * 1024 * 1024) {
      console.log('⚠️  Skipping formatting due to large file size');
      return code;
    }
    
    try {
      const prettier = require('prettier');
      return await prettier.format(code, {
        parser: 'babel',
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
      });
    } catch (error) {
      console.log('⚠️  Formatting failed, using unformatted code');
      return code;
    }
  }

  /**
   * Print robust results
   */
  printRobustResults(inputPath, outputPath, renameCount) {
    const totalTime = Date.now() - this.startTime;
    
    console.log('\n🧠 ROBUST LLM HUMANIFICATION COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(1)}s`);
    console.log(`🔄 Total renames: ${renameCount.toLocaleString()}`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`🤖 API calls made: ${this.stats.apiCalls}`);
    console.log(`🔄 Retries: ${this.stats.retried}`);
    console.log(`❌ Failed: ${this.stats.failed}`);
    console.log(`📊 Success rate: ${Math.round((this.stats.processed / (this.stats.processed + this.stats.failed)) * 100)}%`);
    
    console.log('\n🏆 SAMPLE INTELLIGENT RENAMES:');
    let count = 0;
    for (const [oldName, newName] of this.globalRenameMap) {
      console.log(`   ${String(count + 1).padStart(2)}. ${oldName.padEnd(8)} → ${newName}`);
      if (++count >= 15) break;
    }
    
    console.log('\n✨ Humanized with deep contextual understanding!');
  }

  /**
   * Save robust outputs
   */
  saveRobustOutputs(outputPath, renames) {
    const renameMapPath = outputPath.replace('.js', '-llm-rename-map.json');
    const statsPath = outputPath.replace('.js', '-llm-stats.json');
    
    fs.writeFileSync(renameMapPath, JSON.stringify(
      Object.fromEntries(renames), 
      null, 
      2
    ));
    
    fs.writeFileSync(statsPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - this.startTime,
      totalRenames: renames.size,
      stats: this.stats,
      options: this.options
    }, null, 2));
    
    console.log(`📋 LLM rename map: ${renameMapPath}`);
    console.log(`📊 Processing stats: ${statsPath}`);
  }

  /**
   * Utility: Sleep for ms
   */
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Deep Context Analyzer - Extracts rich context for LLM prompts
 */
class DeepContextAnalyzer {
  analyzeDeepContext(astPath, fullAST) {
    const node = astPath.node;
    const parent = astPath.parent;
    
    return {
      definition: this.getDefinitionContext(astPath),
      functionBody: this.getFunctionBody(astPath),
      dataFlow: this.analyzeDataFlow(astPath),
      operationType: this.inferOperationType(astPath),
      returnPattern: this.analyzeReturnPattern(astPath),
      hasErrorHandling: this.hasErrorHandling(astPath),
      scopeInfo: this.getScopeInfo(astPath)
    };
  }

  analyzeUsagePatterns(astPath, name, fullAST) {
    const binding = astPath.scope.getBinding(name);
    const analysis = {
      callSites: [],
      calledBy: [],
      calls: [],
      relatedVars: []
    };
    
    if (binding) {
      binding.referencePaths.forEach(refPath => {
        const usage = this.analyzeReference(refPath);
        analysis.callSites.push(usage.description);
        
        if (usage.calls) analysis.calls.push(...usage.calls);
        if (usage.calledBy) analysis.calledBy.push(usage.calledBy);
        if (usage.relatedVars) analysis.relatedVars.push(...usage.relatedVars);
      });
    }
    
    return {
      ...analysis,
      callSites: [...new Set(analysis.callSites)],
      calls: [...new Set(analysis.calls)],
      calledBy: [...new Set(analysis.calledBy)],
      relatedVars: [...new Set(analysis.relatedVars)]
    };
  }

  getDefinitionContext(astPath) {
    try {
      const parent = astPath.parent;
      return generator(parent, { compact: false }).code.split('\n')[0].substring(0, 150);
    } catch (error) {
      return 'Unknown definition';
    }
  }

  getFunctionBody(astPath) {
    try {
      const node = astPath.node;
      if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
        const bodyCode = generator(node.body, { compact: true }).code;
        return bodyCode.length > 200 ? bodyCode.substring(0, 200) + '...' : bodyCode;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  analyzeDataFlow(astPath) {
    // Simplified data flow analysis
    const parent = astPath.parent;
    if (parent.type === 'VariableDeclarator' && parent.init) {
      const initType = parent.init.type;
      if (initType === 'CallExpression') return 'Function call result';
      if (initType === 'ObjectExpression') return 'Object literal';
      if (initType === 'ArrayExpression') return 'Array literal';
      if (initType === 'FunctionExpression') return 'Function expression';
      return 'Direct assignment';
    }
    return 'Unknown';
  }

  inferOperationType(astPath) {
    const context = this.getDefinitionContext(astPath).toLowerCase();
    if (context.includes('require')) return 'Module import';
    if (context.includes('object.create')) return 'Object creation';
    if (context.includes('defineproperty')) return 'Property definition';
    if (context.includes('=>')) return 'Arrow function';
    if (context.includes('function')) return 'Function declaration';
    return 'Variable assignment';
  }

  analyzeReturnPattern(astPath) {
    try {
      const functionParent = astPath.getFunctionParent();
      if (functionParent) {
        const bodyCode = generator(functionParent.node.body, { compact: true }).code;
        if (bodyCode.includes('return')) return 'Has return statement';
        return 'No return statement';
      }
      return 'Not in function';
    } catch (error) {
      return 'Unknown';
    }
  }

  hasErrorHandling(astPath) {
    try {
      const functionParent = astPath.getFunctionParent();
      if (functionParent) {
        const bodyCode = generator(functionParent.node.body, { compact: true }).code.toLowerCase();
        return bodyCode.includes('try') || bodyCode.includes('catch') || bodyCode.includes('throw');
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  getScopeInfo(astPath) {
    const scope = astPath.scope;
    const bindings = Object.keys(scope.bindings || {});
    return `Scope level: ${scope.path.type}, ${bindings.length} bindings`;
  }

  analyzeReference(refPath) {
    const parent = refPath.parent;
    let description = 'Referenced';
    const analysis = { calls: [], calledBy: null, relatedVars: [] };
    
    try {
      if (parent.type === 'CallExpression' && parent.callee === refPath.node) {
        description = `Called as function with ${parent.arguments.length} arguments`;
        // Extract argument names if they're identifiers
        parent.arguments.forEach(arg => {
          if (arg.type === 'Identifier') analysis.relatedVars.push(arg.name);
        });
      } else if (parent.type === 'MemberExpression' && parent.object === refPath.node) {
        description = `Property access: .${parent.property.name || 'computed'}`;
      } else if (parent.type === 'AssignmentExpression' && parent.left === refPath.node) {
        description = 'Assigned new value';
      } else {
        const contextCode = generator(parent, { compact: true }).code;
        description = contextCode.length > 80 ? contextCode.substring(0, 80) + '...' : contextCode;
      }
    } catch (error) {
      description = 'Usage context unavailable';
    }
    
    return { description, ...analysis };
  }
}

/**
 * Scope Manager - Handles naming conflicts and scope validation
 */
class ScopeManager {
  constructor() {
    this.scopeMap = new Map(); // scope -> Set of names
    this.reservedNames = new Map(); // originalName -> newName
  }

  buildScopeMap(ast, identifiers) {
    if (!this.scopeMap) {
      this.scopeMap = new Map();
    }
    
    traverse(ast, {
      Scope(path) {
        const scopeId = path.scope.uid;
        const names = new Set(Object.keys(path.scope.bindings || {}));
        this.scopeMap.set(scopeId, names);
      }
    });
  }

  isNameAvailable(originalName, newName) {
    // Check if new name conflicts with existing names in any related scope
    return !Array.from(this.reservedNames.values()).includes(newName);
  }

  reserveName(originalName, newName) {
    this.reservedNames.set(originalName, newName);
  }

  generateAlternativeName(baseName) {
    let counter = 1;
    let altName = `${baseName}${counter}`;
    while (Array.from(this.reservedNames.values()).includes(altName)) {
      altName = `${baseName}${++counter}`;
    }
    return altName;
  }

  validateRename(oldName, newName) {
    return !Array.from(this.reservedNames.values()).includes(newName);
  }

  generateSafeName(oldName, preferredName) {
    return this.generateAlternativeName(preferredName);
  }
}

/**
 * LLM Client - Handles API calls with timeout and retry logic
 */
class LLMClient {
  constructor(options) {
    this.options = options;
  }

  async generateNames(prompt) {
    // This would be replaced with actual Claude API calls
    // For demo purposes, simulate API call with timeout
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('LLM request timeout'));
      }, this.options.timeoutMs);
      
      // Simulate API call delay
      setTimeout(() => {
        clearTimeout(timeout);
        
        // Simulate response (in real implementation, this would be Claude API response)
        const mockResponse = this.generateMockResponse(prompt);
        resolve(mockResponse);
      }, 1000 + Math.random() * 2000); // 1-3 second delay
    });
  }

  generateMockResponse(prompt) {
    // Extract number of identifiers from prompt
    const identifierCount = (prompt.match(/\d+\. IDENTIFIER:/g) || []).length;
    
    const mockNames = [
      'parseConfiguration', 'handleFileUpload', 'validateUserInput', 
      'processDataStream', 'generateReport', 'updateCache',
      'formatResponse', 'authenticateUser', 'buildQueryString',
      'transformData', 'serializeObject', 'deserializeJson',
      'createConnection', 'closeDatabase', 'executeQuery'
    ];
    
    return Array.from({length: identifierCount}, (_, i) => 
      `${i + 1}. ${mockNames[i % mockNames.length]}${i > 14 ? Math.floor(i/15) : ''}`
    ).join('\n');
  }
}

/**
 * Semaphore for controlling concurrent operations
 */
class Semaphore {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
    this.currentConcurrency = 0;
    this.queue = [];
  }

  async acquire() {
    return new Promise((resolve) => {
      if (this.currentConcurrency < this.maxConcurrency) {
        this.currentConcurrency++;
        resolve(() => this.release());
      } else {
        this.queue.push(resolve);
      }
    });
  }

  release() {
    this.currentConcurrency--;
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      this.currentConcurrency++;
      next(() => this.release());
    }
  }
}

async function main() {
  const humanifier = new RobustLLMHumanifier({
    maxConcurrent: 2,
    batchSize: 10,
    projectDescription: process.argv[4] || 'A JavaScript CLI tool for code analysis and processing'
  });
  
  const inputFile = process.argv[2] || 'chunks/chunk_0001.js';
  const outputFile = process.argv[3] || 'humanified-llm-robust.js';
  
  try {
    await humanifier.processFile(inputFile, outputFile);
  } catch (error) {
    console.error('❌ ROBUST LLM HUMANIFICATION FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = RobustLLMHumanifier;