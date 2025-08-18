#!/usr/bin/env node
/**
 * Direct Humanify - Process cli.js directly without chunking
 * Uses AST-based semantic analysis for efficient local processing
 */

const ClaudeHumanifier = require('./interactive-humanify');
const fs = require('fs');
const path = require('path');

class DirectHumanifier extends ClaudeHumanifier {
  constructor() {
    super();
    this.startTime = Date.now();
  }

  /**
   * Process the original cli.js file directly
   */
  async processCliFile(inputPath = 'cli.js', outputPath = 'humanified-cli-direct.js') {
    console.log('🎯 DIRECT CLI HUMANIFICATION');
    console.log('=' .repeat(50));
    
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file ${inputPath} not found`);
    }
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📄 Input: ${inputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
    console.log(`🎯 Output: ${outputPath}`);
    console.log(`⚡ Processing directly with AST analysis...`);
    
    try {
      // Read and process the file
      console.log('\n📖 Reading file...');
      const code = fs.readFileSync(inputPath, 'utf-8');
      
      console.log('🔍 Parsing and analyzing AST...');
      const processedCode = await this.processChunk(inputPath);
      
      console.log('🎨 Formatting code...');
      const formattedCode = await this.formatCode(processedCode);
      
      console.log('💾 Writing output...');
      fs.writeFileSync(outputPath, formattedCode);
      
      // Generate statistics
      const stats = this.generateStats(fileSize);
      this.printResults(outputPath, stats);
      
      // Save additional outputs
      this.saveOutputs(outputPath, stats);
      
      return outputPath;
      
    } catch (error) {
      console.error(`❌ Processing failed:`, error.message);
      throw error;
    }
  }

  /**
   * Override to handle single file processing
   */
  async processChunk(filePath) {
    const startTime = Date.now();
    console.log(`🔧 Processing ${path.basename(filePath)}...`);
    
    const code = fs.readFileSync(filePath, 'utf-8');
    
    console.log(`📏 File size: ${(code.length / 1024).toFixed(1)}KB`);
    console.log(`📏 Lines: ${code.split('\n').length.toLocaleString()}`);
    
    const ast = this.parseCode(code);
    const identifiers = this.extractIdentifiers(ast);
    
    console.log(`🔍 Found ${identifiers.length.toLocaleString()} identifiers to analyze`);
    
    if (identifiers.length === 0) {
      console.log(`ℹ️  No identifiers need renaming`);
      return code;
    }

    // Process all identifiers
    const allRenames = new Map();
    let processed = 0;
    
    console.log(`🧠 Analyzing identifiers with AST semantic analysis...`);
    
    // Process in batches for progress updates
    const batchSize = 100;
    for (let i = 0; i < identifiers.length; i += batchSize) {
      const batch = identifiers.slice(i, i + batchSize);
      
      batch.forEach(identifier => {
        const newName = this.generateIntelligentName(identifier);
        if (newName && newName !== identifier.name) {
          allRenames.set(identifier.name, newName);
          this.globalRenameMap.set(identifier.name, newName);
        }
        processed++;
      });
      
      // Progress update every 500 identifiers
      if (processed % 500 === 0 || processed === identifiers.length) {
        const percent = Math.round((processed / identifiers.length) * 100);
        console.log(`   📈 Progress: ${processed.toLocaleString()}/${identifiers.length.toLocaleString()} (${percent}%) - ${allRenames.size.toLocaleString()} renames generated`);
      }
    }

    console.log(`✅ Semantic analysis complete: ${allRenames.size.toLocaleString()} renames`);
    console.log(`🔄 Applying renames to AST...`);

    // Apply renames to AST
    this.applyRenames(ast, allRenames);
    
    // Generate new code
    console.log(`📝 Generating code from AST...`);
    const newCode = generator(ast).code;
    
    const processingTime = Date.now() - startTime;
    console.log(`⏱️  Processing completed in ${(processingTime / 1000).toFixed(1)}s`);
    
    return newCode;
  }

  /**
   * Generate processing statistics
   */
  generateStats(originalFileSize) {
    const totalTime = Date.now() - this.startTime;
    const totalRenames = this.globalRenameMap.size;
    
    return {
      processingTime: {
        total: totalTime,
        totalSeconds: Math.round(totalTime / 1000)
      },
      file: {
        originalSize: originalFileSize,
        originalSizeMB: (originalFileSize / 1024 / 1024).toFixed(2)
      },
      renames: {
        total: totalRenames,
        density: (totalRenames / (originalFileSize / 1024)).toFixed(2) // renames per KB
      },
      performance: {
        mbPerSecond: ((originalFileSize / 1024 / 1024) / (totalTime / 1000)).toFixed(3),
        renamesPerSecond: Math.round(totalRenames / (totalTime / 1000))
      }
    };
  }

  /**
   * Print final results
   */
  printResults(outputPath, stats) {
    console.log('\n🎉 DIRECT HUMANIFICATION COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total time: ${stats.processingTime.totalSeconds}s`);
    console.log(`📄 Original file: ${stats.file.originalSizeMB}MB`);
    console.log(`🔄 Total renames: ${stats.renames.total.toLocaleString()}`);
    console.log(`📊 Rename density: ${stats.renames.density} renames/KB`);
    console.log(`⚡ Processing speed: ${stats.performance.mbPerSecond} MB/s`);
    console.log(`🏃 Rename rate: ${stats.performance.renamesPerSecond.toLocaleString()} renames/s`);
    console.log(`📁 Output file: ${outputPath}`);
    
    console.log('\n🏆 TOP 20 RENAMES:');
    let count = 0;
    for (const [oldName, newName] of this.globalRenameMap) {
      console.log(`   ${String(count + 1).padStart(2)}. ${oldName.padEnd(12)} → ${newName}`);
      if (++count >= 20) break;
    }
    
    console.log('\n✨ Ready for human analysis!');
  }

  /**
   * Save additional output files
   */
  saveOutputs(outputPath, stats) {
    // Save rename map
    const renameMapPath = outputPath.replace('.js', '-rename-map.json');
    fs.writeFileSync(renameMapPath, JSON.stringify(
      Object.fromEntries(this.globalRenameMap), 
      null, 
      2
    ));
    
    // Save statistics
    const statsPath = outputPath.replace('.js', '-stats.json');
    fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
    
    console.log(`📋 Rename map: ${renameMapPath}`);
    console.log(`📊 Statistics: ${statsPath}`);
  }
}

// Import generator
const generator = require('@babel/generator').default;

async function main() {
  const humanifier = new DirectHumanifier();
  
  // Check for command line arguments
  const inputFile = process.argv[2] || 'cli.js';
  const outputFile = process.argv[3] || 'humanified-cli-direct.js';
  
  try {
    await humanifier.processCliFile(inputFile, outputFile);
  } catch (error) {
    console.error('\n❌ HUMANIFICATION FAILED:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = DirectHumanifier;