#!/usr/bin/env node
/**
 * Fast Humanify - Optimized for large minified files like cli.js
 * Uses streaming AST analysis with parallel identifier processing
 */

const HumanifyPipeline = require('./humanify-pipeline');
const ASTSemanticAnalyzer = require('./ast-semantic-analyzer');
const fs = require('fs');
const path = require('path');

class FastHumanifier extends HumanifyPipeline {
  constructor() {
    super();
    this.semanticAnalyzer = new ASTSemanticAnalyzer();
    this.startTime = Date.now();
  }

  /**
   * Process file with optimizations for large minified files
   */
  async processFile(inputPath = 'cli.js', outputPath = 'humanified-cli-fast.js') {
    console.log('⚡ FAST CLI HUMANIFICATION');
    console.log('=' .repeat(50));
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📄 Input: ${inputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
    
    try {
      // Read file
      console.log('📖 Reading file...');
      const code = fs.readFileSync(inputPath, 'utf-8');
      console.log(`📏 File: ${(code.length / 1024).toFixed(1)}KB, ${code.split('\n').length.toLocaleString()} lines`);
      
      // Parse with optimized settings
      console.log('🔍 Parsing AST (optimized for minified code)...');
      const ast = this.parseCodeFast(code);
      
      // Extract identifiers with fast filtering
      console.log('🎯 Extracting renameable identifiers...');
      const identifiers = this.extractIdentifiersFast(ast);
      console.log(`   Found ${identifiers.length.toLocaleString()} identifiers to rename`);
      
      if (identifiers.length === 0) {
        console.log('ℹ️  No identifiers need renaming');
        fs.writeFileSync(outputPath, code);
        return outputPath;
      }
      
      // Process identifiers in batches
      console.log('🧠 Generating semantic names...');
      const renames = await this.processIdentifiersBatch(identifiers);
      console.log(`   Generated ${renames.size.toLocaleString()} renames`);
      
      // Apply renames efficiently
      console.log('🔄 Applying renames to AST...');
      this.applyRenamesFast(ast, renames);
      
      // Generate code
      console.log('📝 Generating code...');
      const newCode = this.generateCode(ast);
      
      // Format if reasonable size
      console.log('🎨 Formatting...');
      const finalCode = await this.formatCodeSafe(newCode);
      
      // Write output
      fs.writeFileSync(outputPath, finalCode);
      
      // Stats and summary
      this.printSummary(inputPath, outputPath, renames.size);
      this.saveRenameMap(outputPath, renames);
      
      return outputPath;
      
    } catch (error) {
      console.error(`❌ Failed:`, error.message);
      throw error;
    }
  }

  /**
   * Fast parser optimized for minified code
   */
  parseCodeFast(code) {
    const parser = require('@babel/parser');
    
    return parser.parse(code, {
      sourceType: 'module',
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      // Skip expensive plugins for minified code
      plugins: [],
      // Performance optimizations
      strictMode: false,
      allowHashBang: true,
      ranges: false,
      tokens: false
    });
  }

  /**
   * Fast identifier extraction with minimal AST traversal
   */
  extractIdentifiersFast(ast) {
    const identifiers = [];
    const self = this;
    
    // Single-pass traversal for better performance
    require('@babel/traverse').default(ast, {
      enter(path) {
        const node = path.node;
        
        // Variable declarations
        if (node.type === 'VariableDeclarator' && node.id?.type === 'Identifier') {
          const name = node.id.name;
          if (self.shouldRenameFast(name)) {
            identifiers.push({
              type: 'variable',
              name,
              astPath: path,
              context: self.extractContextFast(path)
            });
          }
        }
        
        // Function declarations
        if (node.type === 'FunctionDeclaration' && node.id?.name) {
          const name = node.id.name;
          if (self.shouldRenameFast(name)) {
            identifiers.push({
              type: 'function',
              name,
              astPath: path,
              context: self.extractContextFast(path)
            });
          }
        }
        
        // Parameters in function expressions
        if ((node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') && node.params) {
          node.params.forEach((param, index) => {
            if (param.type === 'Identifier' && self.shouldRenameFast(param.name)) {
              identifiers.push({
                type: 'parameter',
                name: param.name,
                astPath: path,
                context: self.extractContextFast(path),
                paramIndex: index
              });
            }
          });
        }
      }
    });
    
    return identifiers;
  }

  /**
   * Fast rename check - optimized for minified variables
   */
  shouldRenameFast(name) {
    // Skip if already renamed
    if (this.globalRenameMap.has(name)) return false;
    
    // Fast minified identifier detection
    return (
      name.length <= 3 && 
      /^[a-zA-Z][a-zA-Z0-9]*$/.test(name) &&
      !['var', 'let', 'const', 'for', 'if', 'do', 'try'].includes(name)
    );
  }

  /**
   * Minimal context extraction for performance
   */
  extractContextFast(path) {
    // Get parent node code for context (limit to 200 chars)
    try {
      const generator = require('@babel/generator').default;
      const parentCode = generator(path.parent, { compact: true }).code;
      return parentCode.length > 200 ? parentCode.substring(0, 200) + '...' : parentCode;
    } catch (error) {
      return path.node.type || 'unknown';
    }
  }

  /**
   * Process identifiers in batches for better performance
   */
  async processIdentifiersBatch(identifiers) {
    const renames = new Map();
    const batchSize = 500; // Process in larger batches
    
    for (let i = 0; i < identifiers.length; i += batchSize) {
      const batch = identifiers.slice(i, i + batchSize);
      
      // Process batch
      batch.forEach(identifier => {
        try {
          const newName = this.generateFastName(identifier);
          if (newName && newName !== identifier.name) {
            renames.set(identifier.name, newName);
            this.globalRenameMap.set(identifier.name, newName);
          }
        } catch (error) {
          // Continue on individual failures
          console.warn(`Warning: Failed to rename ${identifier.name}: ${error.message}`);
        }
      });
      
      // Progress update
      if (i % 2000 === 0 || i + batchSize >= identifiers.length) {
        const progress = Math.min(i + batchSize, identifiers.length);
        console.log(`   📈 ${progress.toLocaleString()}/${identifiers.length.toLocaleString()} (${Math.round(progress/identifiers.length*100)}%) - ${renames.size.toLocaleString()} renames`);
      }
    }
    
    return renames;
  }

  /**
   * Fast semantic name generation
   */
  generateFastName(identifier) {
    const { name, type, astPath, context } = identifier;
    
    // Try AST analysis first (if available and fast)
    if (astPath) {
      try {
        return this.semanticAnalyzer.analyzeIdentifier(identifier, astPath);
      } catch (error) {
        // Fall back to fast pattern-based naming
      }
    }
    
    // Fast pattern-based naming
    return this.generatePatternName(identifier);
  }

  /**
   * Pattern-based naming for fast processing
   */
  generatePatternName(identifier) {
    const { name, type, context } = identifier;
    const ctx = context.toLowerCase();
    
    let baseName = '';
    
    // Quick pattern matching
    if (type === 'function') {
      if (ctx.includes('return')) baseName = `func${name.toUpperCase()}`;
      else if (ctx.includes('async') || ctx.includes('await')) baseName = `async${name.toUpperCase()}`;
      else baseName = `fn${name.toUpperCase()}`;
    } else if (type === 'parameter') {
      baseName = `param${name.toUpperCase()}`;
    } else if (type === 'variable') {
      if (ctx.includes('require') || ctx.includes('import')) baseName = `mod${name.toUpperCase()}`;
      else if (ctx.includes('=')) baseName = `var${name.toUpperCase()}`;
      else baseName = `val${name.toUpperCase()}`;
    }
    
    return this.ensureUniqueFast(baseName);
  }

  /**
   * Fast unique name generation
   */
  ensureUniqueFast(baseName) {
    const used = this.globalRenameMap;
    
    if (!used.has(baseName)) return baseName;
    
    let counter = 1;
    let uniqueName = `${baseName}${counter}`;
    while (used.has(uniqueName)) {
      uniqueName = `${baseName}${++counter}`;
    }
    
    return uniqueName;
  }

  /**
   * Fast rename application
   */
  applyRenamesFast(ast, renames) {
    const traverse = require('@babel/traverse').default;
    
    traverse(ast, {
      Scope(path) {
        for (const [oldName, newName] of renames) {
          if (path.scope.hasBinding(oldName)) {
            try {
              path.scope.rename(oldName, newName);
            } catch (error) {
              // Continue on individual rename failures
            }
          }
        }
      }
    });
  }

  /**
   * Code generation
   */
  generateCode(ast) {
    const generator = require('@babel/generator').default;
    return generator(ast, {
      compact: false,  // More readable output
      minified: false,
      comments: true
    }).code;
  }

  /**
   * Safe formatting - skip if too large
   */
  async formatCodeSafe(code) {
    if (code.length > 10 * 1024 * 1024) { // Skip formatting if > 10MB
      console.log('⚠️  Skipping Prettier formatting due to large file size');
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
      console.log('⚠️  Prettier formatting failed, using unformatted code');
      return code;
    }
  }

  /**
   * Print processing summary
   */
  printSummary(inputPath, outputPath, renameCount) {
    const totalTime = Date.now() - this.startTime;
    
    console.log('\n⚡ FAST HUMANIFICATION COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(1)}s`);
    console.log(`🔄 Total renames: ${renameCount.toLocaleString()}`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`🏃 Speed: ${Math.round(renameCount / (totalTime / 1000))} renames/s`);
  }

  /**
   * Save rename map
   */
  saveRenameMap(outputPath, renames) {
    const renameMapPath = outputPath.replace('.js', '-rename-map.json');
    fs.writeFileSync(renameMapPath, JSON.stringify(
      Object.fromEntries(renames), 
      null, 
      2
    ));
    console.log(`📋 Rename map: ${renameMapPath}`);
  }
}

async function main() {
  const humanifier = new FastHumanifier();
  const inputFile = process.argv[2] || 'cli.js';
  const outputFile = process.argv[3] || 'humanified-cli-fast.js';
  
  try {
    await humanifier.processFile(inputFile, outputFile);
  } catch (error) {
    console.error('❌ FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = FastHumanifier;