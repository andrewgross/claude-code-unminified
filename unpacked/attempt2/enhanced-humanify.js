#!/usr/bin/env node
/**
 * Enhanced Humanify - Uses rich semantic context for meaningful names
 * Generates genuinely human-readable variable names based on code purpose
 */

const HumanifyPipeline = require('./humanify-pipeline');
const SemanticContextAnalyzer = require('./semantic-context-analyzer');
const fs = require('fs');
const path = require('path');

class EnhancedHumanifier extends HumanifyPipeline {
  constructor() {
    super();
    this.contextAnalyzer = new SemanticContextAnalyzer();
    this.startTime = Date.now();
    this.nameQualityStats = {
      highQuality: 0,
      mediumQuality: 0,
      lowQuality: 0
    };
  }

  /**
   * Process file with enhanced semantic analysis
   */
  async processFile(inputPath = 'cli.js', outputPath = 'humanified-cli-enhanced.js') {
    console.log('🧠 ENHANCED SEMANTIC HUMANIFICATION');
    console.log('=' .repeat(50));
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📄 Input: ${inputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
    console.log(`🎯 Output: ${outputPath}`);
    console.log(`✨ Using deep semantic context analysis...`);
    
    try {
      // Read file
      console.log('\n📖 Reading file...');
      const code = fs.readFileSync(inputPath, 'utf-8');
      console.log(`📏 File: ${(code.length / 1024).toFixed(1)}KB, ${code.split('\n').length.toLocaleString()} lines`);
      
      // Parse AST
      console.log('🔍 Parsing AST with full semantic analysis...');
      const ast = this.parseCode(code);
      
      // Extract identifiers
      console.log('🎯 Extracting identifiers for semantic analysis...');
      const identifiers = this.extractIdentifiersEnhanced(ast);
      console.log(`   Found ${identifiers.length.toLocaleString()} identifiers to analyze`);
      
      if (identifiers.length === 0) {
        console.log('ℹ️  No identifiers need renaming');
        fs.writeFileSync(outputPath, code);
        return outputPath;
      }
      
      // Generate meaningful names using rich context
      console.log('🧠 Performing deep semantic analysis...');
      const renames = await this.generateMeaningfulRenames(identifiers);
      console.log(`   Generated ${renames.size.toLocaleString()} semantic renames`);
      
      // Apply renames
      console.log('🔄 Applying semantic renames to AST...');
      this.applyRenames(ast, renames);
      
      // Generate and format code
      console.log('📝 Generating human-readable code...');
      const newCode = this.generateCodeFromAST(ast);
      
      console.log('🎨 Formatting code...');
      const finalCode = await this.formatCodeSafe(newCode);
      
      // Write output
      fs.writeFileSync(outputPath, finalCode);
      
      // Print comprehensive results
      this.printEnhancedResults(inputPath, outputPath, renames.size);
      this.saveEnhancedOutputs(outputPath, renames);
      
      return outputPath;
      
    } catch (error) {
      console.error(`❌ Enhanced processing failed:`, error.message);
      throw error;
    }
  }

  /**
   * Extract identifiers with enhanced context collection
   */
  extractIdentifiersEnhanced(ast) {
    const identifiers = [];
    const self = this;
    
    require('@babel/traverse').default(ast, {
      enter(path) {
        const node = path.node;
        
        // Collect all renameable identifiers with full context
        if (node.type === 'VariableDeclarator' && node.id?.type === 'Identifier') {
          const name = node.id.name;
          if (self.shouldRename(name)) {
            identifiers.push({
              type: 'variable',
              name,
              astPath: path,
              node: node
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
              node: node
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
   * Generate meaningful renames using rich semantic context
   */
  async generateMeaningfulRenames(identifiers) {
    const renames = new Map();
    const batchSize = 100;
    
    console.log('🔍 Analyzing semantic context for each identifier...');
    
    for (let i = 0; i < identifiers.length; i += batchSize) {
      const batch = identifiers.slice(i, i + batchSize);
      
      // Process batch with full semantic analysis
      const batchRenames = await this.processBatchWithContext(batch);
      
      // Merge results
      for (const [oldName, newName] of batchRenames) {
        renames.set(oldName, newName);
        this.globalRenameMap.set(oldName, newName);
      }
      
      // Progress update
      const progress = Math.min(i + batchSize, identifiers.length);
      const percentage = Math.round((progress / identifiers.length) * 100);
      console.log(`   📈 ${progress.toLocaleString()}/${identifiers.length.toLocaleString()} (${percentage}%) - ${renames.size.toLocaleString()} meaningful names generated`);
    }
    
    return renames;
  }

  /**
   * Process batch with full semantic context analysis
   */
  async processBatchWithContext(batch) {
    const renames = new Map();
    
    for (const identifier of batch) {
      try {
        // Extract comprehensive context
        const context = this.contextAnalyzer.analyzeIdentifierContext(identifier, identifier.astPath);
        
        // Generate meaningful name based on context
        const meaningfulName = this.contextAnalyzer.generateMeaningfulName(identifier, context);
        
        // Ensure uniqueness
        const uniqueName = this.ensureUniqueName(meaningfulName, identifier.name);
        
        if (uniqueName && uniqueName !== identifier.name) {
          renames.set(identifier.name, uniqueName);
          
          // Track name quality
          this.assessNameQuality(uniqueName, context);
          
          // Log high-quality renames for review
          if (this.isHighQualityName(uniqueName, context)) {
            console.log(`   ✨ ${identifier.name.padEnd(8)} → ${uniqueName.padEnd(20)} [${context.semanticHints.join(', ')}]`);
          }
        }
        
      } catch (error) {
        console.warn(`Warning: Failed to analyze ${identifier.name}: ${error.message}`);
        
        // Fallback to basic rename
        const fallbackName = `enhanced${identifier.name.toUpperCase()}`;
        renames.set(identifier.name, this.ensureUniqueName(fallbackName, identifier.name));
        this.nameQualityStats.lowQuality++;
      }
    }
    
    return renames;
  }

  /**
   * Assess the quality of generated names
   */
  assessNameQuality(name, context) {
    const hasSemanticHints = context.semanticHints.length > 0;
    const hasMeaningfulPurpose = context.purposeInference.type !== 'unknown';
    const isDescriptive = name.length > 5 && !/^(func|var|obj|param)/i.test(name);
    
    if (hasSemanticHints && hasMeaningfulPurpose && isDescriptive) {
      this.nameQualityStats.highQuality++;
    } else if (hasSemanticHints || hasMeaningfulPurpose) {
      this.nameQualityStats.mediumQuality++;
    } else {
      this.nameQualityStats.lowQuality++;
    }
  }

  /**
   * Check if a name is high quality
   */
  isHighQualityName(name, context) {
    return context.semanticHints.length > 0 && 
           context.purposeInference.type !== 'unknown' &&
           name.length > 8 &&
           !/^(func|var|obj|param)/i.test(name);
  }

  /**
   * Enhanced unique name generation
   */
  ensureUniqueName(baseName, originalName) {
    const used = this.globalRenameMap;
    
    // If base name is unique, use it
    if (!used.has(baseName)) return baseName;
    
    // Try variations
    const variations = [
      baseName + 'Handler',
      baseName + 'Function',
      baseName + 'Value',
      baseName + 'Data'
    ];
    
    for (const variation of variations) {
      if (!used.has(variation)) return variation;
    }
    
    // Fallback to numbered suffix
    let counter = 1;
    let uniqueName = `${baseName}${counter}`;
    while (used.has(uniqueName)) {
      uniqueName = `${baseName}${++counter}`;
    }
    
    return uniqueName;
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
   * Print enhanced results with quality metrics
   */
  printEnhancedResults(inputPath, outputPath, renameCount) {
    const totalTime = Date.now() - this.startTime;
    const totalQuality = this.nameQualityStats.highQuality + this.nameQualityStats.mediumQuality + this.nameQualityStats.lowQuality;
    
    console.log('\n🧠 ENHANCED SEMANTIC HUMANIFICATION COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(1)}s`);
    console.log(`🔄 Total renames: ${renameCount.toLocaleString()}`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`🏃 Speed: ${Math.round(renameCount / (totalTime / 1000))} renames/s`);
    
    console.log('\n📊 NAME QUALITY ANALYSIS:');
    console.log(`   ✨ High quality:   ${this.nameQualityStats.highQuality.toLocaleString()} (${Math.round(this.nameQualityStats.highQuality/totalQuality*100)}%)`);
    console.log(`   🎯 Medium quality: ${this.nameQualityStats.mediumQuality.toLocaleString()} (${Math.round(this.nameQualityStats.mediumQuality/totalQuality*100)}%)`);
    console.log(`   ⚡ Basic quality:  ${this.nameQualityStats.lowQuality.toLocaleString()} (${Math.round(this.nameQualityStats.lowQuality/totalQuality*100)}%)`);
    
    console.log('\n🏆 SAMPLE HIGH-QUALITY RENAMES:');
    let count = 0;
    for (const [oldName, newName] of this.globalRenameMap) {
      if (newName.length > 8 && !/^(func|var|obj|param)/i.test(newName)) {
        console.log(`   ${String(count + 1).padStart(2)}. ${oldName.padEnd(8)} → ${newName}`);
        if (++count >= 15) break;
      }
    }
    
    console.log('\n✨ Enhanced with genuine semantic understanding!');
  }

  /**
   * Save enhanced outputs
   */
  saveEnhancedOutputs(outputPath, renames) {
    // Save detailed rename map with context
    const renameMapPath = outputPath.replace('.js', '-enhanced-rename-map.json');
    fs.writeFileSync(renameMapPath, JSON.stringify(
      Object.fromEntries(renames), 
      null, 
      2
    ));
    
    // Save quality analysis
    const qualityPath = outputPath.replace('.js', '-quality-report.json');
    const qualityReport = {
      timestamp: new Date().toISOString(),
      totalRenames: renames.size,
      qualityMetrics: this.nameQualityStats,
      qualityPercentages: {
        highQuality: Math.round((this.nameQualityStats.highQuality / renames.size) * 100),
        mediumQuality: Math.round((this.nameQualityStats.mediumQuality / renames.size) * 100),
        lowQuality: Math.round((this.nameQualityStats.lowQuality / renames.size) * 100)
      },
      sampleHighQualityRenames: this.getSampleHighQualityRenames(10)
    };
    
    fs.writeFileSync(qualityPath, JSON.stringify(qualityReport, null, 2));
    
    console.log(`📋 Enhanced rename map: ${renameMapPath}`);
    console.log(`📊 Quality report: ${qualityPath}`);
  }

  /**
   * Get sample high-quality renames for the report
   */
  getSampleHighQualityRenames(count = 10) {
    const samples = [];
    let collected = 0;
    
    for (const [oldName, newName] of this.globalRenameMap) {
      if (newName.length > 8 && !/^(func|var|obj|param)/i.test(newName)) {
        samples.push({ original: oldName, renamed: newName });
        if (++collected >= count) break;
      }
    }
    
    return samples;
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
}

async function main() {
  const humanifier = new EnhancedHumanifier();
  const inputFile = process.argv[2] || 'cli.js';
  const outputFile = process.argv[3] || 'humanified-cli-enhanced.js';
  
  try {
    await humanifier.processFile(inputFile, outputFile);
  } catch (error) {
    console.error('❌ ENHANCED HUMANIFICATION FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = EnhancedHumanifier;