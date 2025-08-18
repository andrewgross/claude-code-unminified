/**
 * Humanify Pipeline - Transform minified JavaScript into human-readable code
 * Uses Babel for AST manipulation and Claude for semantic variable naming
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const prettier = require('prettier');

class HumanifyPipeline {
  constructor() {
    this.globalRenameMap = new Map(); // Track renames across chunks
    this.processedChunks = new Map();
    this.progressCallback = null;
  }

  /**
   * Parse JavaScript code into AST
   */
  parseCode(code) {
    try {
      return parser.parse(code, {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        allowReturnOutsideFunction: true,
        plugins: ['jsx', 'typescript', 'decorators-legacy']
      });
    } catch (error) {
      console.error('Parse error:', error.message);
      throw error;
    }
  }

  /**
   * Extract all identifiers that need renaming from AST
   */
  extractIdentifiers(ast) {
    const identifiers = [];
    const scopeMap = new Map();
    const self = this;

    traverse(ast, {
      enter(path) {
        // Track scope information
        if (path.scope) {
          const scopeId = path.scope.uid;
          if (!scopeMap.has(scopeId)) {
            scopeMap.set(scopeId, {
              bindings: Object.keys(path.scope.bindings),
              parent: path.scope.parent?.uid
            });
          }
        }
      },
      
      // Function declarations
      FunctionDeclaration(path) {
        const name = path.node.id?.name;
        if (name && self.shouldRename(name)) {
          identifiers.push({
            type: 'function',
            name,
            path,
            context: self.extractContext(path),
            scope: path.scope.uid,
            astPath: path  // Store full AST path for semantic analysis
          });
        }
      },

      // Variable declarations
      VariableDeclarator(path) {
        if (t.isIdentifier(path.node.id)) {
          const name = path.node.id.name;
          if (self.shouldRename(name)) {
            identifiers.push({
              type: 'variable',
              name,
              path,
              context: self.extractContext(path),
              scope: path.scope.uid,
              init: path.node.init,
              astPath: path  // Store full AST path for semantic analysis
            });
          }
        }
      },

      // Function expressions and arrow functions
      'FunctionExpression|ArrowFunctionExpression'(path) {
        // Handle parameters
        path.node.params.forEach((param, index) => {
          if (t.isIdentifier(param) && self.shouldRename(param.name)) {
            identifiers.push({
              type: 'parameter',
              name: param.name,
              path,
              context: self.extractContext(path),
              scope: path.scope.uid,
              paramIndex: index,
              astPath: path  // Store full AST path for semantic analysis
            });
          }
        });
      }
    });

    return identifiers;
  }

  /**
   * Determine if an identifier should be renamed
   */
  shouldRename(name) {
    // Skip if already renamed
    if (this.globalRenameMap.has(name)) {
      return false;
    }

    // Skip built-in identifiers and common patterns
    const skipPatterns = [
      /^[A-Z][A-Z_]*$/, // Constants like 'VERSION'
      /^_+$/, // Underscore patterns
      /^(require|module|exports|console|process|global|window|document)$/,
      /^[a-zA-Z]$/, // Single letters (sometimes intentional)
    ];

    // Rename if it looks minified (short, cryptic names)
    const isMinified = (
      name.length <= 3 && 
      /^[a-zA-Z][a-zA-Z0-9]*[0-9]*$/.test(name) &&
      !skipPatterns.some(pattern => pattern.test(name))
    );

    return isMinified;
  }

  /**
   * Extract surrounding context for an identifier
   */
  extractContext(path, maxLength = 500) {
    const code = generator(path.parent).code;
    const lines = code.split('\n');
    
    // Take up to maxLength characters around the identifier
    const context = lines.slice(0, Math.min(lines.length, 10)).join('\n');
    
    if (context.length > maxLength) {
      return context.substring(0, maxLength) + '...';
    }
    
    return context;
  }

  /**
   * Process a single chunk file
   */
  async processChunk(chunkPath) {
    console.log(`Processing ${chunkPath}...`);
    
    const code = fs.readFileSync(chunkPath, 'utf-8');
    const ast = this.parseCode(code);
    const identifiers = this.extractIdentifiers(ast);
    
    console.log(`Found ${identifiers.length} identifiers to rename`);
    
    // Process identifiers in batches to avoid overwhelming the context
    const batchSize = 5;
    const renames = new Map();
    
    for (let i = 0; i < identifiers.length; i += batchSize) {
      const batch = identifiers.slice(i, i + batchSize);
      
      for (const identifier of batch) {
        const newName = await this.generateSemanticName(identifier);
        if (newName && newName !== identifier.name) {
          renames.set(identifier.name, newName);
          this.globalRenameMap.set(identifier.name, newName);
        }
      }
      
      // Progress update
      if (this.progressCallback) {
        this.progressCallback(Math.min(i + batchSize, identifiers.length), identifiers.length);
      }
    }

    // Apply renames to AST
    this.applyRenames(ast, renames);
    
    // Generate new code
    const newCode = generator(ast).code;
    
    // Store processed result
    this.processedChunks.set(chunkPath, newCode);
    
    return newCode;
  }

  /**
   * Apply renames to AST using Babel's scope-aware renaming
   */
  applyRenames(ast, renames) {
    traverse(ast, {
      Scope(path) {
        for (const [oldName, newName] of renames) {
          if (path.scope.hasBinding(oldName)) {
            try {
              path.scope.rename(oldName, newName);
            } catch (error) {
              console.warn(`Failed to rename ${oldName} to ${newName}:`, error.message);
            }
          }
        }
      }
    });
  }

  /**
   * Generate semantic name using Claude (placeholder for interaction)
   */
  async generateSemanticName(identifier) {
    // This is where we'll interact with Claude to get semantic names
    // For now, return a placeholder that indicates the type and original name
    const prefix = identifier.type === 'function' ? 'fn' : 
                   identifier.type === 'variable' ? 'var' : 'param';
    return `${prefix}_${identifier.name}`;
  }

  /**
   * Process all chunks in the chunks directory
   */
  async processAllChunks() {
    const chunksDir = path.join(__dirname, 'chunks');
    const manifestPath = path.join(chunksDir, 'manifest.json');
    
    if (!fs.existsSync(manifestPath)) {
      throw new Error('manifest.json not found in chunks directory');
    }
    
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    const totalChunks = manifest.chunks.length;
    
    console.log(`Processing ${totalChunks} chunks...`);
    
    for (let i = 0; i < manifest.chunks.length; i++) {
      const chunk = manifest.chunks[i];
      const chunkPath = path.join(chunksDir, chunk.file);
      
      try {
        await this.processChunk(chunkPath);
        console.log(`Completed chunk ${i + 1}/${totalChunks}: ${chunk.file}`);
      } catch (error) {
        console.error(`Error processing ${chunk.file}:`, error.message);
        // Continue with next chunk
      }
    }
    
    return this.mergeChunks(manifest);
  }

  /**
   * Merge all processed chunks into final output
   */
  mergeChunks(manifest) {
    let mergedCode = '';
    
    for (const chunk of manifest.chunks) {
      const chunkPath = path.join(__dirname, 'chunks', chunk.file);
      if (this.processedChunks.has(chunkPath)) {
        const code = this.processedChunks.get(chunkPath);
        // Remove chunk comment header
        const cleanCode = code.replace(/^\/\* chunk:\d+ bytes:\[[\d, ]+\) size:\d+ source:[\w\-.]+ \*\/\n?/, '');
        mergedCode += cleanCode + '\n';
      }
    }
    
    return mergedCode;
  }

  /**
   * Format the final code with Prettier
   */
  async formatCode(code) {
    try {
      return await prettier.format(code, {
        parser: 'babel',
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
      });
    } catch (error) {
      console.warn('Prettier formatting failed:', error.message);
      return code;
    }
  }

  /**
   * Main pipeline execution
   */
  async run(outputPath = 'humanified-cli.js') {
    console.log('Starting humanification pipeline...');
    
    try {
      // Process all chunks
      const mergedCode = await this.processAllChunks();
      
      // Format code
      console.log('Formatting code...');
      const formattedCode = await this.formatCode(mergedCode);
      
      // Write output
      fs.writeFileSync(outputPath, formattedCode);
      
      console.log(`\nHumanification complete!`);
      console.log(`Output written to: ${outputPath}`);
      console.log(`Total renames: ${this.globalRenameMap.size}`);
      
      // Save rename map for reference
      const renameMapPath = outputPath.replace('.js', '-rename-map.json');
      fs.writeFileSync(renameMapPath, JSON.stringify(
        Object.fromEntries(this.globalRenameMap), 
        null, 
        2
      ));
      
      console.log(`Rename map saved to: ${renameMapPath}`);
      
    } catch (error) {
      console.error('Pipeline failed:', error);
      throw error;
    }
  }
}

module.exports = HumanifyPipeline;