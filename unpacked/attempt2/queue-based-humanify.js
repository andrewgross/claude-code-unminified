#!/usr/bin/env node
/**
 * Queue-Based Humanify - Iterative processing with dependency resolution
 * Allows LLM to defer difficult identifiers until more context is available
 */

const ContextualHumanifier = require('./contextual-humanify');
const EnhancedPromptDemo = require('./enhanced-prompt-demo');
const { spawn } = require('child_process');
const fs = require('fs');

class QueueBasedHumanifier extends ContextualHumanifier {
  constructor(projectDescription) {
    super(projectDescription);
    this.promptDemo = new EnhancedPromptDemo();
    this.processingQueue = [];
    this.deferredQueue = [];
    this.processedNames = new Map(); // oldName -> newName
    this.currentRound = 1;
    this.maxRounds = 5;
  }

  /**
   * Process with queue-based dependency resolution
   */
  async processWithQueue(inputPath, outputPath) {
    console.log('🔄 QUEUE-BASED ITERATIVE HUMANIFICATION');
    console.log('=' .repeat(50));
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📄 Input: ${inputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
    console.log(`📋 Context: "${this.projectDescription}"`);
    
    // Check Claude Code availability
    const hasClaudeCode = await this.checkClaudeCodeAvailable();
    if (!hasClaudeCode) {
      console.log('⚠️  Claude Code not available, using pattern matching');
      return await super.processFile(inputPath, outputPath);
    }
    
    try {
      const code = fs.readFileSync(inputPath, 'utf-8');
      const ast = this.parseCode(code);
      
      // Extract identifiers with rich context
      const identifiers = this.promptDemo.extractIdentifiersWithRichContext(ast);
      console.log(`🎯 Found ${identifiers.length} identifiers to process`);
      
      // Initialize processing queue
      this.processingQueue = [...identifiers];
      
      // Process in rounds until queue is empty or max rounds reached
      while (this.processingQueue.length > 0 && this.currentRound <= this.maxRounds) {
        console.log(`\n🔄 ROUND ${this.currentRound}: Processing ${this.processingQueue.length} identifiers`);
        
        await this.processRound();
        
        // Move deferred items back to main queue for next round
        if (this.deferredQueue.length > 0) {
          console.log(`⏸️  Deferred ${this.deferredQueue.length} identifiers for next round`);
          this.processingQueue = [...this.deferredQueue];
          this.deferredQueue = [];
        }
        
        this.currentRound++;
      }
      
      // Handle any remaining unprocessed identifiers
      this.handleRemainingIdentifiers();
      
      // Apply all renames to AST
      console.log(`\n🔄 Applying ${this.processedNames.size} renames to AST`);
      this.applyRenames(ast, this.processedNames);
      
      // Generate final code
      const newCode = this.generateCodeFromAST(ast);
      const finalCode = await this.formatCodeSafe(newCode);
      fs.writeFileSync(outputPath, finalCode);
      
      this.printQueueResults(inputPath, outputPath);
      
      return outputPath;
      
    } catch (error) {
      console.error(`❌ Queue processing failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Process one round of the queue
   */
  async processRound() {
    const batchSize = 4; // Small batches for focused context
    const batches = this.createBatches(this.processingQueue, batchSize);
    
    console.log(`📦 Processing ${batches.length} batches`);
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`   🎯 Batch ${i + 1}/${batches.length}: ${batch.length} identifiers`);
      
      try {
        const prompt = this.buildContextAwarePrompt(batch);
        const response = await this.callClaudeCode(prompt);
        const results = this.parseQueueResponse(response, batch);
        
        // Process results
        let processed = 0;
        let deferred = 0;
        
        results.forEach((result, index) => {
          const identifier = batch[index];
          
          if (result.action === 'rename') {
            this.processedNames.set(identifier.name, result.newName);
            this.globalRenameMap.set(identifier.name, result.newName);
            processed++;
          } else if (result.action === 'defer') {
            this.deferredQueue.push(identifier);
            deferred++;
          }
        });
        
        console.log(`   ✅ Batch complete: ${processed} processed, ${deferred} deferred`);
        
      } catch (error) {
        console.warn(`   ⚠️  Batch failed: ${error.message}, using fallback`);
        
        // Fallback to pattern matching for failed batch
        batch.forEach(identifier => {
          const fallbackName = this.generatePracticalName(identifier);
          const uniqueName = this.ensureUniqueName(fallbackName, identifier.name);
          this.processedNames.set(identifier.name, uniqueName);
          this.globalRenameMap.set(identifier.name, uniqueName);
        });
      }
      
      await this.sleep(500); // Brief pause between batches
    }
    
    // Clear main queue (processed items removed, deferred moved to deferredQueue)
    this.processingQueue = [];
  }

  /**
   * Build context-aware prompt that includes previously renamed identifiers
   */
  buildContextAwarePrompt(batch) {
    const renamedContext = this.buildRenamedContext();
    
    return `You are renaming minified JavaScript variables in a ${this.projectDescription}.

PREVIOUSLY RENAMED VARIABLES (for context):
${renamedContext}

CURRENT BATCH TO PROCESS:
${this.formatBatchForPrompt(batch)}

INSTRUCTIONS:
- Generate meaningful names based on context and usage
- Consider how these relate to previously renamed variables  
- If you don't have enough context to make a good name, respond with "DEFER"
- Use the project context: ${this.projectDescription}

Respond in this format:
1. newVariableName (or "DEFER" if insufficient context)
2. anotherVariableName (or "DEFER")
...

Only provide the name or "DEFER", nothing else.`;
  }

  /**
   * Build context from previously renamed variables
   */
  buildRenamedContext() {
    if (this.processedNames.size === 0) {
      return 'None yet (first round)';
    }
    
    const examples = Array.from(this.processedNames.entries())
      .slice(-10) // Last 10 renames for context
      .map(([old, renamed]) => `${old} → ${renamed}`)
      .join('\n');
      
    return `${examples}\n(${this.processedNames.size} total renames so far)`;
  }

  /**
   * Format batch for prompt
   */
  formatBatchForPrompt(batch) {
    return batch.map((identifier, index) => {
      const context = this.extractDetailedContext(identifier);
      return `${index + 1}. "${identifier.name}" (${identifier.type})
   Definition: ${context.definition}
   Usage: ${context.usage}
   Context: ${context.semantic}`;
    }).join('\n\n');
  }

  /**
   * Extract detailed context for identifier
   */
  extractDetailedContext(identifier) {
    return {
      definition: identifier.definition || 'Unknown',
      usage: identifier.usage?.patterns?.join(', ') || 'No usage data',
      semantic: identifier.semanticHints?.join(', ') || 'No patterns detected'
    };
  }

  /**
   * Parse queue response with defer capability
   */
  parseQueueResponse(response, batch) {
    const lines = response.split('\n').filter(line => line.match(/^\d+\./));
    const results = [];
    
    lines.forEach((line, index) => {
      const match = line.match(/^\d+\.\s*(.+)$/);
      if (match && batch[index]) {
        const suggestion = match[1].trim();
        
        if (suggestion.toUpperCase() === 'DEFER') {
          results.push({ action: 'defer' });
        } else if (this.isValidName(suggestion, batch[index].name, batch[index])) {
          const uniqueName = this.ensureUniqueName(suggestion, batch[index].name);
          results.push({ action: 'rename', newName: uniqueName });
        } else {
          // Invalid suggestion, defer for later
          results.push({ action: 'defer' });
        }
      } else {
        results.push({ action: 'defer' });
      }
    });
    
    return results;
  }

  /**
   * Handle identifiers that couldn't be processed after all rounds
   */
  handleRemainingIdentifiers() {
    if (this.processingQueue.length > 0) {
      console.log(`\n🔄 Processing ${this.processingQueue.length} remaining identifiers with pattern matching`);
      
      this.processingQueue.forEach(identifier => {
        const fallbackName = this.generatePracticalName(identifier);
        const uniqueName = this.ensureUniqueName(fallbackName, identifier.name);
        this.processedNames.set(identifier.name, uniqueName);
        this.globalRenameMap.set(identifier.name, uniqueName);
      });
    }
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
      
      // Add related identifiers to same batch
      for (let j = i + 1; j < identifiers.length && batch.length < batchSize; j++) {
        if (processed.has(j)) continue;
        
        if (this.areIdentifiersRelated(identifiers[i], identifiers[j])) {
          batch.push(identifiers[j]);
          processed.add(j);
        }
      }
      
      // Fill remaining space with unrelated identifiers
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
   * Check if identifiers are related
   */
  areIdentifiersRelated(id1, id2) {
    // Same function scope
    const func1 = id1.astPath?.getFunctionParent?.();
    const func2 = id2.astPath?.getFunctionParent?.();
    if (func1 && func2 && func1 === func2) return true;
    
    // Related by usage patterns
    const usage1 = id1.usageAnalysis || {};
    const usage2 = id2.usageAnalysis || {};
    
    if (usage1.calls?.includes(id2.name) || usage2.calls?.includes(id1.name)) {
      return true;
    }
    
    return false;
  }

  /**
   * Check if Claude Code is available
   */
  async checkClaudeCodeAvailable() {
    return new Promise((resolve) => {
      const claude = spawn('claude', ['--version'], { stdio: 'pipe' });
      claude.on('close', (code) => resolve(code === 0));
      claude.on('error', () => resolve(false));
      setTimeout(() => { claude.kill(); resolve(false); }, 3000);
    });
  }

  /**
   * Call Claude Code CLI
   */
  async callClaudeCode(promptText) {
    return new Promise((resolve, reject) => {
      let output = '';
      let errorOutput = '';
      
      const claude = spawn('claude', ['-p', promptText], { stdio: 'pipe' });
      
      claude.stdout.on('data', (data) => { output += data.toString(); });
      claude.stderr.on('data', (data) => { errorOutput += data.toString(); });
      
      claude.on('close', (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(new Error(`Claude failed (${code}): ${errorOutput}`));
        }
      });
      
      claude.on('error', (error) => {
        reject(new Error(`Claude spawn failed: ${error.message}`));
      });
      
      setTimeout(() => {
        claude.kill();
        reject(new Error('Claude timeout'));
      }, 120000); // 2 minute timeout
    });
  }

  /**
   * Print queue processing results
   */
  printQueueResults(inputPath, outputPath) {
    const totalTime = Date.now() - this.startTime;
    
    console.log('\n🔄 QUEUE-BASED HUMANIFICATION COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(1)}s`);
    console.log(`🔄 Total renames: ${this.processedNames.size}`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`🔁 Processing rounds: ${this.currentRound - 1}`);
    console.log(`🤖 Method: Queue-based iterative processing`);
    
    console.log('\n🏆 SAMPLE INTELLIGENT RENAMES:');
    let count = 0;
    for (const [oldName, newName] of this.processedNames) {
      console.log(`   ${String(count + 1).padStart(2)}. ${oldName.padEnd(8)} → ${newName}`);
      if (++count >= 15) break;
    }
  }

  /**
   * Validate suggested name
   */
  isValidName(suggested, original, identifier) {
    if (!suggested || suggested === original) return false;
    if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(suggested)) return false;
    if (suggested.length < 3 || suggested.length > 40) return false;
    
    const reserved = ['var', 'let', 'const', 'function', 'return'];
    if (reserved.includes(suggested.toLowerCase())) return false;
    
    return true;
  }

  /**
   * Generate code from AST
   */
  generateCodeFromAST(ast) {
    const generator = require('@babel/generator').default;
    return generator(ast, { compact: false, minified: false, comments: true }).code;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

async function main() {
  if (process.argv.length < 4) {
    console.log('Usage: node queue-based-humanify.js <input> [output] "project description"');
    process.exit(1);
  }

  const inputFile = process.argv[2];
  const outputFile = process.argv[3] || inputFile.replace('.js', '-queue-humanified.js');
  const projectDescription = process.argv[4];
  
  if (!projectDescription) {
    console.error('Project description required');
    process.exit(1);
  }
  
  if (!fs.existsSync(inputFile)) {
    console.error(`Input file not found: ${inputFile}`);
    process.exit(1);
  }
  
  try {
    const humanifier = new QueueBasedHumanifier(projectDescription);
    await humanifier.processWithQueue(inputFile, outputFile);
  } catch (error) {
    console.error('Processing failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = QueueBasedHumanifier;