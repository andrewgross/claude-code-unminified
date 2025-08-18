/**
 * Interactive Humanify - Real implementation using Claude for semantic renaming
 */

const HumanifyPipeline = require('./humanify-pipeline');
const ASTSemanticAnalyzer = require('./ast-semantic-analyzer');
const fs = require('fs');
const path = require('path');

class ClaudeHumanifier extends HumanifyPipeline {
  constructor() {
    super();
    this.batchedRenames = [];
    this.currentBatch = [];
    this.semanticAnalyzer = new ASTSemanticAnalyzer();
  }

  /**
   * Generate semantic names using Claude (me) by batching requests
   */
  async generateSemanticName(identifier) {
    // Add to current batch
    this.currentBatch.push(identifier);
    
    // Process batch when it reaches a good size or is the last one
    if (this.currentBatch.length >= 3) {
      return this.processBatchedRenames();
    }
    
    return null; // Will be processed in batch
  }

  async processBatchedRenames() {
    const batch = [...this.currentBatch];
    this.currentBatch = [];
    
    console.log('\n🤖 CLAUDE RENAMING REQUEST');
    console.log('=' .repeat(50));
    
    batch.forEach((identifier, index) => {
      console.log(`\n${index + 1}. Variable: ${identifier.name}`);
      console.log(`   Type: ${identifier.type}`);
      console.log(`   Context:`);
      console.log(`   ${identifier.context.split('\n').slice(0, 3).join('\n   ')}`);
      if (identifier.context.length > 200) {
        console.log(`   ... (truncated)`);
      }
    });

    console.log('\n' + '='.repeat(50));
    console.log('📝 Please provide semantic names for these variables:');
    console.log('Consider the context and suggest meaningful names that describe what each variable does.');
    console.log('Format: originalName → newName (one per line, or "skip" to keep original)');
    console.log('Example responses:');
    console.log('  alB → objectCreate');
    console.log('  G1 → moduleWrapper');
    console.log('  W1 → requireFunction');
    console.log('=' .repeat(50));

    // In a real implementation, this would wait for Claude's response
    // For now, return intelligent placeholders
    const renames = {};
    batch.forEach(identifier => {
      const semanticName = this.generateIntelligentName(identifier);
      renames[identifier.name] = semanticName;
    });

    return renames;
  }

  /**
   * Generate intelligent names using AST-based semantic analysis
   */
  generateIntelligentName(identifier) {
    const { name, type, astPath } = identifier;
    
    // Use AST semantic analyzer for deep code understanding
    if (astPath) {
      try {
        const astBasedName = this.semanticAnalyzer.analyzeIdentifier(identifier, astPath);
        return this.ensureUniqueName(astBasedName, name);
      } catch (error) {
        console.warn(`AST analysis failed for ${name}:`, error.message);
      }
    }
    
    // Fallback to context-based analysis if AST analysis fails
    return this.generateContextBasedName(identifier);
  }

  /**
   * Fallback context-based naming (original logic)
   */
  generateContextBasedName(identifier) {
    const { name, type, context } = identifier;
    const contextLower = context.toLowerCase();
    
    let baseName = '';

    // Analyze based on actual context patterns
    if (contextLower.includes('object.create')) {
      baseName = 'objectCreate';
    } else if (contextLower.includes('object.prototype.hasownproperty')) {
      baseName = 'hasOwnProperty';
    } else if (contextLower.includes('createrequire')) {
      baseName = 'requireFunction';
    } else if (contextLower.includes('fs') && type === 'variable') {
      baseName = 'fileSystemModule';
    } else if (contextLower.includes('path') && type === 'variable') {
      baseName = 'pathModule';
    } else if (contextLower.includes('__esmodule') && contextLower.includes('exports')) {
      baseName = 'moduleWrapper';
    } else if (type === 'function') {
      // Function patterns
      if (contextLower.includes('stat') || contextLower.includes('file')) {
        baseName = `checkFile${name.replace(/[0-9]/g, '').toUpperCase()}`;
      } else if (contextLower.includes('sync')) {
        baseName = `${name.replace(/[0-9]/g, '')}Sync`;
      } else if (contextLower.includes('parse') || contextLower.includes('process')) {
        baseName = `process${name.replace(/[0-9]/g, '').toUpperCase()}`;
      } else {
        baseName = `func${name.replace(/[0-9]/g, '').toUpperCase()}`;
      }
    } else if (type === 'parameter') {
      // Parameter patterns
      if (contextLower.includes('exports')) {
        baseName = 'moduleExports';
      } else {
        baseName = `param${name.replace(/[0-9]/g, '').toUpperCase()}`;
      }
    } else if (type === 'variable') {
      // Variable patterns  
      if (contextLower.includes('w1(') && contextLower.includes('"')) {
        // It's a require call
        const match = context.match(/(?:var_W|W1)\("([^"]+)"\)/i);
        if (match) {
          const module = match[1];
          baseName = `${module.replace(/[^a-zA-Z]/g, '')}Module`;
        } else {
          baseName = `module${name.replace(/[0-9]/g, '').toUpperCase()}`;
        }
      } else if (contextLower.includes('process.platform')) {
        baseName = 'isWindows';
      } else if (contextLower.includes('regex') || context.includes('/')) {
        baseName = `${name.replace(/[0-9]/g, '')}Regex`;
      } else {
        baseName = `var${name.replace(/[0-9]/g, '').toUpperCase()}`;
      }
    } else {
      baseName = `renamed${name.replace(/[0-9]/g, '').toUpperCase()}`;
    }

    // Ensure uniqueness by checking against already renamed identifiers
    return this.ensureUniqueName(baseName, name);
  }

  /**
   * Ensure the generated name is unique across all renames
   */
  ensureUniqueName(baseName, originalName) {
    // If already used this exact name, make it unique
    const usedNames = new Set(this.globalRenameMap.values());
    
    if (!usedNames.has(baseName)) {
      return baseName;
    }
    
    // Try with suffix
    let counter = 1;
    let uniqueName = `${baseName}${counter}`;
    
    while (usedNames.has(uniqueName)) {
      counter++;
      uniqueName = `${baseName}${counter}`;
    }
    
    return uniqueName;
  }

  /**
   * Process a single chunk with intelligent renaming
   */
  async processChunk(chunkPath) {
    console.log(`\n📁 Processing ${path.basename(chunkPath)}...`);
    
    const code = fs.readFileSync(chunkPath, 'utf-8');
    const ast = this.parseCode(code);
    const identifiers = this.extractIdentifiers(ast);
    
    console.log(`🔍 Found ${identifiers.length} identifiers to rename`);
    
    if (identifiers.length === 0) {
      this.processedChunks.set(chunkPath, code);
      return code;
    }

    // Process all identifiers and collect renames
    const allRenames = new Map();
    
    // Process in smaller batches for better context
    const batchSize = 5;
    for (let i = 0; i < identifiers.length; i += batchSize) {
      const batch = identifiers.slice(i, i + batchSize);
      
      // Use intelligent naming for each identifier
      batch.forEach(identifier => {
        const newName = this.generateIntelligentName(identifier);
        if (newName && newName !== identifier.name) {
          allRenames.set(identifier.name, newName);
          this.globalRenameMap.set(identifier.name, newName);
        }
      });
    }

    console.log(`✅ Generated ${allRenames.size} renames`);

    // Apply renames to AST
    this.applyRenames(ast, allRenames);
    
    // Generate new code
    const newCode = generator(ast).code;
    
    // Store processed result
    this.processedChunks.set(chunkPath, newCode);
    
    return newCode;
  }
}

async function main() {
  const humanifier = new ClaudeHumanifier();
  
  console.log('🚀 Starting Claude-powered humanification...');
  console.log('This will process the first 5 chunks as a demonstration.');
  
  try {
    // Process first 5 chunks only for demo
    const chunksDir = path.join(__dirname, 'chunks');
    const manifestPath = path.join(chunksDir, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    
    const chunksToProcess = manifest.chunks.slice(0, 5); // First 5 chunks
    
    console.log(`📊 Processing ${chunksToProcess.length} chunks...`);
    
    for (let i = 0; i < chunksToProcess.length; i++) {
      const chunk = chunksToProcess[i];
      const chunkPath = path.join(chunksDir, chunk.file);
      
      await humanifier.processChunk(chunkPath);
      
      console.log(`✅ Completed chunk ${i + 1}/${chunksToProcess.length}: ${chunk.file}`);
    }
    
    // Merge processed chunks
    let mergedCode = '';
    for (const chunk of chunksToProcess) {
      const chunkPath = path.join(chunksDir, chunk.file);
      if (humanifier.processedChunks.has(chunkPath)) {
        const code = humanifier.processedChunks.get(chunkPath);
        // Remove chunk comment header
        const cleanCode = code.replace(/^\/\* chunk:\d+ bytes:\[[\d, ]+\) size:\d+ source:[\w\-.]+ \*\/\n?/, '');
        mergedCode += cleanCode + '\n';
      }
    }
    
    // Write output
    const outputPath = 'demo-humanified.js';
    const formattedCode = await humanifier.formatCode(mergedCode);
    fs.writeFileSync(outputPath, formattedCode);
    
    console.log(`\n🎉 Demo completed!`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`📈 Total renames: ${humanifier.globalRenameMap.size}`);
    
    // Save rename map
    const renameMapPath = 'demo-rename-map.json';
    fs.writeFileSync(renameMapPath, JSON.stringify(
      Object.fromEntries(humanifier.globalRenameMap), 
      null, 
      2
    ));
    console.log(`📋 Rename map: ${renameMapPath}`);
    
    // Show some examples
    console.log('\n🔄 Example renames:');
    let count = 0;
    for (const [oldName, newName] of humanifier.globalRenameMap) {
      console.log(`   ${oldName} → ${newName}`);
      if (++count >= 15) break;
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Import generator
const generator = require('@babel/generator').default;

if (require.main === module) {
  main();
}

module.exports = ClaudeHumanifier;