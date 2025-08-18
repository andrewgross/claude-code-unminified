#!/usr/bin/env node
/**
 * Practical Humanify - Focus on recognizable patterns for meaningful names
 * Uses pattern matching on code context to generate human-readable names
 */

const HumanifyPipeline = require('./humanify-pipeline');
const fs = require('fs');
const path = require('path');

class PracticalHumanifier extends HumanifyPipeline {
  constructor() {
    super();
    this.startTime = Date.now();
    this.patterns = this.initializePatterns();
    this.nameQualityStats = {
      semantic: 0,        // Names based on clear semantic meaning
      contextual: 0,      // Names based on context clues
      generic: 0         // Generic but readable names
    };
  }

  /**
   * Initialize practical patterns for naming
   */
  initializePatterns() {
    return {
      // Module and import patterns
      moduleImport: {
        pattern: /require\s*\(\s*["'](.*?)["']\s*\)/,
        generate: (match, name) => {
          const moduleName = match[1].split('/').pop().replace(/[^a-zA-Z0-9]/g, '');
          return `${moduleName}Module`;
        }
      },
      
      // File system operations
      fileSystem: {
        pattern: /(fs|readFile|writeFile|mkdir|stat|exists)/i,
        generate: (match, name) => name.includes('sync') ? 'fsOperationSync' : 'fsOperation'
      },
      
      // Object manipulation
      objectCreate: {
        pattern: /Object\.create/,
        generate: () => 'createObject'
      },
      objectDefineProperty: {
        pattern: /defineProperty/,
        generate: () => 'defineProperty'
      },
      objectPrototype: {
        pattern: /Object\.prototype\.hasOwnProperty/,
        generate: () => 'hasOwnProperty'
      },
      objectGetPrototype: {
        pattern: /getPrototypeOf/,
        generate: () => 'getPrototype'
      },
      objectKeys: {
        pattern: /Object\.keys|getOwnPropertyNames/,
        generate: () => 'getObjectKeys'
      },
      
      // Function patterns
      arrowFunction: {
        pattern: /=>\s*{/,
        generate: (match, name, context) => {
          if (context.includes('return')) return 'returnHandler';
          if (context.includes('console')) return 'logHandler';
          if (context.includes('throw')) return 'errorHandler';
          return 'handlerFunction';
        }
      },
      
      // Assignment patterns
      destructuringAssign: {
        pattern: /{\s*[\w\s,:\-]+\s*}.*=/,
        generate: () => 'destructuredValue'
      },
      
      // Process and environment
      processEnv: {
        pattern: /process\.env|NODE_ENV/,
        generate: () => 'envConfig'
      },
      processArgv: {
        pattern: /process\.argv/,
        generate: () => 'cmdArgs'
      },
      
      // Utility functions
      utilityFunction: {
        pattern: /function\s*\(\s*[^)]*\s*\)\s*{\s*return/,
        generate: () => 'utilityFunction'
      },
      
      // Error handling
      errorHandling: {
        pattern: /(try|catch|throw|error)/i,
        generate: () => 'errorHandler'
      },
      
      // Async operations
      asyncOperation: {
        pattern: /(async|await|Promise)/,
        generate: () => 'asyncOperation'
      },
      
      // String operations
      stringOperation: {
        pattern: /(split|join|replace|match|trim)/,
        generate: () => 'stringUtil'
      },
      
      // Array operations
      arrayOperation: {
        pattern: /(push|pop|slice|splice|map|filter)/,
        generate: () => 'arrayUtil'
      }
    };
  }

  /**
   * Process file with practical pattern matching
   */
  async processFile(inputPath = 'cli.js', outputPath = 'humanified-cli-practical.js') {
    console.log('🎯 PRACTICAL PATTERN-BASED HUMANIFICATION');
    console.log('=' .repeat(50));
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📄 Input: ${inputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
    console.log(`🎯 Output: ${outputPath}`);
    console.log(`🔍 Using practical pattern matching for meaningful names...`);
    
    try {
      // Read file
      console.log('\n📖 Reading file...');
      const code = fs.readFileSync(inputPath, 'utf-8');
      console.log(`📏 File: ${(code.length / 1024).toFixed(1)}KB, ${code.split('\n').length.toLocaleString()} lines`);
      
      // Parse AST
      console.log('🔍 Parsing AST...');
      const ast = this.parseCode(code);
      
      // Extract identifiers
      console.log('🎯 Extracting identifiers...');
      const identifiers = this.extractIdentifiers(ast);
      console.log(`   Found ${identifiers.length.toLocaleString()} identifiers to analyze`);
      
      if (identifiers.length === 0) {
        console.log('ℹ️  No identifiers need renaming');
        fs.writeFileSync(outputPath, code);
        return outputPath;
      }
      
      // Generate meaningful names using pattern matching
      console.log('🧠 Generating names with pattern matching...');
      const renames = this.generatePracticalRenames(identifiers);
      console.log(`   Generated ${renames.size.toLocaleString()} practical renames`);
      
      // Apply renames
      console.log('🔄 Applying renames to AST...');
      this.applyRenames(ast, renames);
      
      // Generate and format code
      console.log('📝 Generating readable code...');
      const newCode = this.generateCodeFromAST(ast);
      
      console.log('🎨 Formatting code...');
      const finalCode = await this.formatCodeSafe(newCode);
      
      // Write output
      fs.writeFileSync(outputPath, finalCode);
      
      // Print results
      this.printPracticalResults(inputPath, outputPath, renames.size);
      this.savePracticalOutputs(outputPath, renames);
      
      return outputPath;
      
    } catch (error) {
      console.error(`❌ Practical processing failed:`, error.message);
      throw error;
    }
  }

  /**
   * Generate practical renames using pattern matching
   */
  generatePracticalRenames(identifiers) {
    const renames = new Map();
    
    console.log('🔍 Analyzing patterns in code context...');
    
    identifiers.forEach((identifier, index) => {
      try {
        const meaningfulName = this.generatePracticalName(identifier);
        const uniqueName = this.ensureUniqueName(meaningfulName, identifier.name);
        
        if (uniqueName && uniqueName !== identifier.name) {
          renames.set(identifier.name, uniqueName);
          this.globalRenameMap.set(identifier.name, uniqueName);
          
          // Track quality
          this.assessPracticalQuality(uniqueName, identifier);
          
          // Show progress for interesting renames
          if (this.isSemanticName(uniqueName)) {
            console.log(`   ✨ ${identifier.name.padEnd(8)} → ${uniqueName.padEnd(20)} [${identifier.type}]`);
          }
        }
        
        // Progress update
        if ((index + 1) % 200 === 0 || (index + 1) === identifiers.length) {
          const progress = Math.round(((index + 1) / identifiers.length) * 100);
          console.log(`   📈 ${(index + 1).toLocaleString()}/${identifiers.length.toLocaleString()} (${progress}%) - ${renames.size.toLocaleString()} renames`);
        }
        
      } catch (error) {
        console.warn(`Warning: Failed to process ${identifier.name}: ${error.message}`);
      }
    });
    
    return renames;
  }

  /**
   * Generate practical name based on context patterns
   */
  generatePracticalName(identifier) {
    const { name, type, context } = identifier;
    const contextStr = (context || '').toLowerCase();
    
    // Try each pattern in priority order
    for (const [patternName, patternConfig] of Object.entries(this.patterns)) {
      const match = contextStr.match(patternConfig.pattern);
      if (match) {
        try {
          const generatedName = patternConfig.generate(match, name, contextStr);
          if (generatedName && generatedName !== name) {
            return generatedName;
          }
        } catch (error) {
          // Continue to next pattern
        }
      }
    }
    
    // Fallback based on type and basic patterns
    return this.generateFallbackName(identifier, contextStr);
  }

  /**
   * Generate fallback names when no patterns match
   */
  generateFallbackName(identifier, contextStr) {
    const { name, type } = identifier;
    
    // Type-based naming with context hints
    if (type === 'function') {
      if (contextStr.includes('return')) return 'getterFunction';
      if (contextStr.includes('set') || contextStr.includes('assign')) return 'setterFunction';
      if (contextStr.includes('console')) return 'logFunction';
      if (contextStr.includes('error')) return 'errorFunction';
      return 'handlerFunction';
    }
    
    if (type === 'parameter') {
      if (contextStr.includes('function') || contextStr.includes('=>')) return 'funcParam';
      if (contextStr.includes('callback')) return 'callbackParam';
      return 'inputParam';
    }
    
    if (type === 'variable') {
      if (contextStr.includes('require')) return 'moduleVar';
      if (contextStr.includes('function')) return 'funcVar';
      if (contextStr.includes('object')) return 'objectVar';
      if (contextStr.includes('array')) return 'arrayVar';
      if (contextStr.includes('string')) return 'stringVar';
      if (contextStr.includes('number')) return 'numberVar';
      return 'dataVar';
    }
    
    return 'renamedVar';
  }

  /**
   * Assess practical name quality
   */
  assessPracticalQuality(name, identifier) {
    if (this.isSemanticName(name)) {
      this.nameQualityStats.semantic++;
    } else if (this.isContextualName(name)) {
      this.nameQualityStats.contextual++;
    } else {
      this.nameQualityStats.generic++;
    }
  }

  /**
   * Check if name is semantic (has clear meaning)
   */
  isSemanticName(name) {
    const semanticKeywords = [
      'module', 'file', 'create', 'define', 'prototype', 'property',
      'async', 'error', 'handler', 'operation', 'config', 'env'
    ];
    return semanticKeywords.some(keyword => name.toLowerCase().includes(keyword));
  }

  /**
   * Check if name is contextual (based on usage context)
   */
  isContextualName(name) {
    const contextualKeywords = [
      'function', 'param', 'var', 'data', 'object', 'array', 'string'
    ];
    return contextualKeywords.some(keyword => name.toLowerCase().includes(keyword));
  }

  /**
   * Enhanced unique name generation
   */
  ensureUniqueName(baseName, originalName) {
    const used = this.globalRenameMap;
    
    if (!used.has(baseName)) return baseName;
    
    // Try semantic variations first
    const variations = [
      baseName + 'Ref',
      baseName + 'Instance',
      baseName + 'Helper',
      baseName + 'Util'
    ];
    
    for (const variation of variations) {
      if (!used.has(variation)) return variation;
    }
    
    // Numbered fallback
    let counter = 1;
    let uniqueName = `${baseName}${counter}`;
    while (used.has(uniqueName)) {
      uniqueName = `${baseName}${++counter}`;
    }
    
    return uniqueName;
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
   * Print practical results
   */
  printPracticalResults(inputPath, outputPath, renameCount) {
    const totalTime = Date.now() - this.startTime;
    const total = this.nameQualityStats.semantic + this.nameQualityStats.contextual + this.nameQualityStats.generic;
    
    console.log('\n🎯 PRACTICAL HUMANIFICATION COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(1)}s`);
    console.log(`🔄 Total renames: ${renameCount.toLocaleString()}`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`🏃 Speed: ${Math.round(renameCount / (totalTime / 1000))} renames/s`);
    
    console.log('\n📊 PRACTICAL NAME QUALITY:');
    console.log(`   ✨ Semantic names:   ${this.nameQualityStats.semantic.toLocaleString()} (${Math.round(this.nameQualityStats.semantic/total*100)}%)`);
    console.log(`   🎯 Contextual names: ${this.nameQualityStats.contextual.toLocaleString()} (${Math.round(this.nameQualityStats.contextual/total*100)}%)`);
    console.log(`   📝 Generic names:    ${this.nameQualityStats.generic.toLocaleString()} (${Math.round(this.nameQualityStats.generic/total*100)}%)`);
    
    console.log('\n🏆 TOP SEMANTIC RENAMES:');
    let count = 0;
    for (const [oldName, newName] of this.globalRenameMap) {
      if (this.isSemanticName(newName)) {
        console.log(`   ${String(count + 1).padStart(2)}. ${oldName.padEnd(8)} → ${newName}`);
        if (++count >= 15) break;
      }
    }
    
    console.log('\n✨ Practically readable with meaningful names!');
  }

  /**
   * Save practical outputs
   */
  savePracticalOutputs(outputPath, renames) {
    // Save rename map
    const renameMapPath = outputPath.replace('.js', '-practical-rename-map.json');
    fs.writeFileSync(renameMapPath, JSON.stringify(
      Object.fromEntries(renames), 
      null, 
      2
    ));
    
    // Save quality report
    const qualityPath = outputPath.replace('.js', '-practical-quality.json');
    const qualityReport = {
      timestamp: new Date().toISOString(),
      totalRenames: renames.size,
      qualityStats: this.nameQualityStats,
      semanticSample: this.getSemanticSample(15),
      patternsUsed: Object.keys(this.patterns)
    };
    
    fs.writeFileSync(qualityPath, JSON.stringify(qualityReport, null, 2));
    
    console.log(`📋 Practical rename map: ${renameMapPath}`);
    console.log(`📊 Quality report: ${qualityPath}`);
  }

  /**
   * Get sample of semantic names
   */
  getSemanticSample(count = 15) {
    const sample = [];
    let collected = 0;
    
    for (const [oldName, newName] of this.globalRenameMap) {
      if (this.isSemanticName(newName)) {
        sample.push({ original: oldName, renamed: newName });
        if (++collected >= count) break;
      }
    }
    
    return sample;
  }
}

async function main() {
  const humanifier = new PracticalHumanifier();
  const inputFile = process.argv[2] || 'cli.js';
  const outputFile = process.argv[3] || 'humanified-cli-practical.js';
  
  try {
    await humanifier.processFile(inputFile, outputFile);
  } catch (error) {
    console.error('❌ PRACTICAL HUMANIFICATION FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = PracticalHumanifier;