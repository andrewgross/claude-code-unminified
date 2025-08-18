/**
 * Test script to validate the humanify pipeline on the first chunk
 */

const HumanifyPipeline = require('./humanify-pipeline');
const fs = require('fs');
const path = require('path');

class InteractiveRenamer extends HumanifyPipeline {
  /**
   * Override generateSemanticName to use Claude interactively
   */
  async generateSemanticName(identifier) {
    console.log(`\n=== Renaming Request ===`);
    console.log(`Type: ${identifier.type}`);
    console.log(`Current name: ${identifier.name}`);
    console.log(`Context:`);
    console.log(identifier.context);
    console.log(`=======================`);
    
    // In a real implementation, this would send the request to Claude
    // For now, we'll create a more intelligent placeholder
    const semanticName = this.generatePlaceholderName(identifier);
    
    console.log(`Suggested rename: ${identifier.name} → ${semanticName}`);
    return semanticName;
  }

  /**
   * Generate intelligent placeholder names based on context analysis
   */
  generatePlaceholderName(identifier) {
    const { name, type, context, init } = identifier;
    
    // Analyze context for clues
    const contextLower = context.toLowerCase();
    
    // Function detection patterns
    if (type === 'function') {
      if (contextLower.includes('create') || contextLower.includes('make')) {
        return `create${this.capitalize(name)}`;
      }
      if (contextLower.includes('parse') || contextLower.includes('process')) {
        return `process${this.capitalize(name)}`;
      }
      if (contextLower.includes('get') || contextLower.includes('fetch')) {
        return `get${this.capitalize(name)}`;
      }
      return `function_${name}`;
    }
    
    // Variable detection patterns
    if (type === 'variable') {
      // Check if it's an import/require
      if (contextLower.includes('require(') || contextLower.includes('import')) {
        if (contextLower.includes('fs')) return 'fileSystem';
        if (contextLower.includes('path')) return 'pathUtil';
        if (contextLower.includes('crypto')) return 'cryptoUtil';
        if (contextLower.includes('util')) return 'utilities';
        return `imported_${name}`;
      }
      
      // Check if it's a function assignment
      if (contextLower.includes('=>') || contextLower.includes('function')) {
        return `handler_${name}`;
      }
      
      // Check if it's an object/config
      if (contextLower.includes('{') || contextLower.includes('object')) {
        return `config_${name}`;
      }
      
      // Check for common patterns
      if (contextLower.includes('error') || contextLower.includes('err')) {
        return `error_${name}`;
      }
      if (contextLower.includes('result') || contextLower.includes('response')) {
        return `result_${name}`;
      }
      if (contextLower.includes('data') || contextLower.includes('payload')) {
        return `data_${name}`;
      }
      
      return `variable_${name}`;
    }
    
    if (type === 'parameter') {
      return `param_${name}`;
    }
    
    return `renamed_${name}`;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

async function testFirstChunk() {
  const pipeline = new InteractiveRenamer();
  
  // Set up progress callback
  pipeline.progressCallback = (current, total) => {
    const percent = Math.round((current / total) * 100);
    console.log(`Progress: ${current}/${total} (${percent}%)`);
  };
  
  try {
    // Test on first chunk only
    const chunkPath = path.join(__dirname, 'chunks', 'chunk_0001.js');
    console.log(`Testing pipeline on: ${chunkPath}`);
    
    const result = await pipeline.processChunk(chunkPath);
    
    // Write test output
    const outputPath = 'test-output-chunk-0001.js';
    fs.writeFileSync(outputPath, result);
    
    console.log(`\nTest completed!`);
    console.log(`Original file: ${chunkPath}`);
    console.log(`Processed file: ${outputPath}`);
    console.log(`Total renames made: ${pipeline.globalRenameMap.size}`);
    
    // Show some example renames
    if (pipeline.globalRenameMap.size > 0) {
      console.log('\nExample renames:');
      let count = 0;
      for (const [oldName, newName] of pipeline.globalRenameMap) {
        console.log(`  ${oldName} → ${newName}`);
        if (++count >= 10) break; // Show first 10
      }
    }
    
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testFirstChunk();
}

module.exports = InteractiveRenamer;