#!/usr/bin/env node
/**
 * Full Humanify - Process all chunks and create complete humanified CLI
 */

const ClaudeHumanifier = require('./interactive-humanify');
const fs = require('fs');
const path = require('path');

class FullHumanifier extends ClaudeHumanifier {
  constructor() {
    super();
    this.startTime = Date.now();
    this.chunkStats = [];
  }

  async processAllChunks() {
    const chunksDir = path.join(__dirname, 'chunks');
    const manifestPath = path.join(chunksDir, 'manifest.json');
    
    if (!fs.existsSync(manifestPath)) {
      throw new Error('manifest.json not found in chunks directory');
    }
    
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    const totalChunks = manifest.chunks.length;
    
    console.log(`🚀 Starting full humanification of ${totalChunks} chunks...`);
    console.log(`📊 Total file size: ${(manifest.chunks.reduce((sum, chunk) => sum + chunk.size, 0) / 1024 / 1024).toFixed(2)} MB`);
    
    let processedIdentifiers = 0;
    let errorCount = 0;
    
    for (let i = 0; i < manifest.chunks.length; i++) {
      const chunk = manifest.chunks[i];
      const chunkPath = path.join(chunksDir, chunk.file);
      
      try {
        const startTime = Date.now();
        console.log(`\n📁 [${i + 1}/${totalChunks}] Processing ${chunk.file}... (${(chunk.size / 1024).toFixed(1)}KB)`);
        
        await this.processChunk(chunkPath);
        
        const processingTime = Date.now() - startTime;
        const chunkRenames = this.getNewRenamesCount();
        processedIdentifiers += chunkRenames;
        
        this.chunkStats.push({
          file: chunk.file,
          size: chunk.size,
          processingTime,
          renames: chunkRenames
        });
        
        console.log(`✅ Completed ${chunk.file} in ${processingTime}ms (${chunkRenames} renames)`);
        
        // Progress update
        const progress = Math.round(((i + 1) / totalChunks) * 100);
        const elapsed = Date.now() - this.startTime;
        const estimated = totalChunks > 0 ? (elapsed / (i + 1)) * totalChunks : 0;
        const remaining = Math.max(0, estimated - elapsed);
        
        console.log(`📈 Progress: ${progress}% | ETA: ${Math.round(remaining / 1000 / 60)}min | Total renames: ${this.globalRenameMap.size}`);
        
      } catch (error) {
        console.error(`❌ Error processing ${chunk.file}:`, error.message);
        errorCount++;
        
        // Continue with next chunk on error
        if (errorCount > 10) {
          console.error('Too many errors, stopping...');
          throw new Error('Too many processing errors');
        }
      }
    }
    
    return this.mergeAllChunks(manifest);
  }

  /**
   * Get count of new renames since last check
   */
  getNewRenamesCount() {
    if (!this.lastRenameCount) {
      this.lastRenameCount = 0;
    }
    const currentCount = this.globalRenameMap.size;
    const newRenames = currentCount - this.lastRenameCount;
    this.lastRenameCount = currentCount;
    return newRenames;
  }

  /**
   * Merge all processed chunks into final output
   */
  mergeAllChunks(manifest) {
    console.log('\n🔄 Merging all processed chunks...');
    
    let mergedCode = '';
    let mergedChunks = 0;
    
    for (const chunk of manifest.chunks) {
      const chunkPath = path.join(__dirname, 'chunks', chunk.file);
      if (this.processedChunks.has(chunkPath)) {
        const code = this.processedChunks.get(chunkPath);
        // Remove chunk comment header
        const cleanCode = code.replace(/^\/\* chunk:\d+ bytes:\[[\d, ]+\) size:\d+ source:[\w\-.]+ \*\/\n?/, '');
        mergedCode += cleanCode + '\n';
        mergedChunks++;
      }
    }
    
    console.log(`✅ Merged ${mergedChunks}/${manifest.chunks.length} chunks`);
    return mergedCode;
  }

  /**
   * Generate comprehensive statistics
   */
  generateStatistics() {
    const totalTime = Date.now() - this.startTime;
    const totalSize = this.chunkStats.reduce((sum, stat) => sum + stat.size, 0);
    const totalRenames = this.globalRenameMap.size;
    
    const stats = {
      processingTime: {
        total: totalTime,
        average: totalTime / this.chunkStats.length,
        fastest: Math.min(...this.chunkStats.map(s => s.processingTime)),
        slowest: Math.max(...this.chunkStats.map(s => s.processingTime))
      },
      chunks: {
        total: this.chunkStats.length,
        totalSize: totalSize,
        averageSize: totalSize / this.chunkStats.length
      },
      renames: {
        total: totalRenames,
        average: totalRenames / this.chunkStats.length,
        density: totalRenames / (totalSize / 1024) // renames per KB
      },
      performance: {
        mbPerSecond: (totalSize / 1024 / 1024) / (totalTime / 1000),
        renamesPerSecond: totalRenames / (totalTime / 1000)
      }
    };
    
    return stats;
  }

  /**
   * Print detailed statistics
   */
  printStatistics(stats) {
    console.log('\n📊 HUMANIFICATION STATISTICS');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total processing time: ${(stats.processingTime.total / 1000 / 60).toFixed(1)} minutes`);
    console.log(`📁 Processed chunks: ${stats.chunks.total}`);
    console.log(`📄 Total code size: ${(stats.chunks.totalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🔄 Total renames: ${stats.renames.total.toLocaleString()}`);
    console.log(`⚡ Processing speed: ${stats.performance.mbPerSecond.toFixed(2)} MB/s`);
    console.log(`🏃 Rename rate: ${stats.performance.renamesPerSecond.toFixed(0)} renames/s`);
    console.log(`📈 Rename density: ${stats.renames.density.toFixed(1)} renames/KB`);
    
    console.log('\n🏆 TOP RENAMES:');
    const sortedRenames = [...this.globalRenameMap.entries()].slice(0, 20);
    sortedRenames.forEach(([old, newName], i) => {
      console.log(`   ${i + 1}. ${old} → ${newName}`);
    });
  }
}

async function main() {
  const humanifier = new FullHumanifier();
  
  try {
    console.log('🎯 FULL HUMANIFICATION STARTING');
    console.log('This will process all chunks to create humanified-cli.js');
    console.log('=' .repeat(60));
    
    // Process all chunks
    const mergedCode = await humanifier.processAllChunks();
    
    // Format code
    console.log('\n🎨 Formatting final code...');
    const formattedCode = await humanifier.formatCode(mergedCode);
    
    // Write output
    const outputPath = 'humanified-cli.js';
    fs.writeFileSync(outputPath, formattedCode);
    
    // Generate and save statistics
    const stats = humanifier.generateStatistics();
    humanifier.printStatistics(stats);
    
    // Save detailed outputs
    const renameMapPath = 'humanified-cli-rename-map.json';
    fs.writeFileSync(renameMapPath, JSON.stringify(
      Object.fromEntries(humanifier.globalRenameMap), 
      null, 
      2
    ));
    
    const statsPath = 'humanified-cli-stats.json';
    fs.writeFileSync(statsPath, JSON.stringify({
      ...stats,
      chunkDetails: humanifier.chunkStats
    }, null, 2));
    
    console.log('\n🎉 HUMANIFICATION COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`📄 Output file: ${outputPath}`);
    console.log(`📋 Rename map: ${renameMapPath}`);
    console.log(`📊 Statistics: ${statsPath}`);
    console.log(`⭐ Ready for human consumption!`);
    
  } catch (error) {
    console.error('\n❌ HUMANIFICATION FAILED:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = FullHumanifier;