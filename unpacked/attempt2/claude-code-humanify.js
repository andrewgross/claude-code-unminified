#!/usr/bin/env node
/**
 * Claude Code Humanify - Uses Claude Code CLI for LLM-powered naming
 * Leverages existing Claude Code installation instead of API keys
 */

const ContextualHumanifier = require('./contextual-humanify');
const EnhancedPromptDemo = require('./enhanced-prompt-demo');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class ClaudeCodeHumanifier extends ContextualHumanifier {
  constructor(projectDescription) {
    super(projectDescription);
    this.promptDemo = new EnhancedPromptDemo();
  }

  /**
   * Process file with Claude Code CLI integration
   */
  async processWithClaudeCode(inputPath, outputPath) {
    console.log('🤖 CLAUDE CODE HUMANIFICATION');
    console.log('=' .repeat(50));
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📄 Input: ${inputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
    console.log(`🎯 Output: ${outputPath}`);
    console.log(`📋 Context: "${this.projectDescription}"`);
    console.log(`🤖 Using Claude Code CLI for intelligent naming...`);
    
    // Check if claude command is available
    const hasClaudeCode = await this.checkClaudeCodeAvailable();
    if (!hasClaudeCode) {
      console.log('⚠️  Claude Code CLI not found, falling back to pattern matching...');
      return await super.processFile(inputPath, outputPath);
    }
    
    try {
      // Read and parse file
      console.log('\n📖 Reading and parsing file...');
      const code = fs.readFileSync(inputPath, 'utf-8');
      const ast = this.parseCode(code);
      
      // Extract identifiers with rich context
      console.log('🔍 Extracting identifiers with rich context...');
      const identifiers = this.promptDemo.extractIdentifiersWithRichContext(ast);
      console.log(`   Found ${identifiers.length.toLocaleString()} identifiers to analyze`);
      
      if (identifiers.length === 0) {
        console.log('ℹ️  No identifiers need renaming');
        fs.writeFileSync(outputPath, code);
        return outputPath;
      }
      
      // Process identifiers with Claude Code
      console.log('🧠 Generating intelligent names with Claude Code...');
      const renames = await this.generateNamesWithClaudeCode(identifiers);
      console.log(`   Generated ${renames.size.toLocaleString()} intelligent renames`);
      
      // Apply renames
      console.log('🔄 Applying renames to AST...');
      this.applyRenames(ast, renames);
      
      // Generate code
      console.log('📝 Generating final code...');
      const newCode = this.generateCodeFromAST(ast);
      const finalCode = await this.formatCodeSafe(newCode);
      
      // Write output
      fs.writeFileSync(outputPath, finalCode);
      
      // Print results
      this.printClaudeCodeResults(inputPath, outputPath, renames.size);
      this.saveClaudeCodeOutputs(outputPath, renames);
      
      return outputPath;
      
    } catch (error) {
      console.error(`❌ Claude Code processing failed:`, error.message);
      console.log('🔄 Falling back to pattern matching...');
      return await super.processFile(inputPath, outputPath);
    }
  }

  /**
   * Check if Claude Code CLI is available
   */
  async checkClaudeCodeAvailable() {
    return new Promise((resolve) => {
      const claude = spawn('claude', ['--version'], { stdio: 'pipe' });
      
      claude.on('close', (code) => {
        resolve(code === 0);
      });
      
      claude.on('error', () => {
        resolve(false);
      });
      
      // Timeout after 3 seconds
      setTimeout(() => {
        claude.kill();
        resolve(false);
      }, 3000);
    });
  }

  /**
   * Generate names using Claude Code CLI
   */
  async generateNamesWithClaudeCode(identifiers) {
    const allRenames = new Map();
    const batchSize = 10; // Smaller batches for better context
    
    console.log(`📦 Processing ${Math.ceil(identifiers.length / batchSize)} batches with Claude Code`);
    
    for (let i = 0; i < identifiers.length; i += batchSize) {
      const batch = identifiers.slice(i, i + batchSize);
      
      try {
        console.log(`   🤖 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(identifiers.length/batchSize)} (${batch.length} identifiers)...`);
        
        const batchRenames = await this.processBatchWithClaudeCode(batch, Math.floor(i/batchSize));
        
        // Merge results
        for (const [oldName, newName] of batchRenames) {
          // Validate and ensure uniqueness
          const uniqueName = this.ensureUniqueName(newName, oldName);
          allRenames.set(oldName, uniqueName);
          this.globalRenameMap.set(oldName, uniqueName);
        }
        
        console.log(`   ✅ Batch complete: ${batchRenames.size} names generated`);
        
      } catch (error) {
        console.warn(`   ⚠️  Batch ${Math.floor(i/batchSize) + 1} failed: ${error.message}`);
        console.log(`   🔄 Using pattern matching fallback for this batch...`);
        
        // Fallback to pattern matching for failed batch
        batch.forEach(identifier => {
          const fallbackName = this.generatePracticalName(identifier);
          const uniqueName = this.ensureUniqueName(fallbackName, identifier.name);
          allRenames.set(identifier.name, uniqueName);
          this.globalRenameMap.set(identifier.name, uniqueName);
        });
      }
      
      // Small delay between batches to be respectful
      if (i + batchSize < identifiers.length) {
        await this.sleep(1000);
      }
    }
    
    return allRenames;
  }

  /**
   * Process batch with Claude Code CLI
   */
  async processBatchWithClaudeCode(batch, batchIndex) {
    // Generate enhanced prompt
    const prompt = this.promptDemo.generateEnhancedPrompt(batch, this.projectDescription);
    
    // Create temporary prompt file
    const promptFile = path.join(process.cwd(), `temp-prompt-${batchIndex}.txt`);
    fs.writeFileSync(promptFile, prompt);
    
    try {
      // Call Claude Code with the prompt
      const response = await this.callClaudeCode(promptFile);
      
      // Parse response
      const renames = this.parseLLMResponse(response, batch);
      
      return renames;
      
    } finally {
      // Clean up temp file
      if (fs.existsSync(promptFile)) {
        fs.unlinkSync(promptFile);
      }
    }
  }

  /**
   * Call Claude Code CLI with prompt file
   */
  async callClaudeCode(promptFile) {
    return new Promise((resolve, reject) => {
      let output = '';
      let errorOutput = '';
      
      // Use claude -p to process the prompt file
      const claude = spawn('claude', ['-p', promptFile], {
        stdio: 'pipe',
        cwd: process.cwd()
      });
      
      claude.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      claude.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });
      
      claude.on('close', (code) => {
        if (code === 0) {
          resolve(output.trim());
        } else {
          reject(new Error(`Claude Code CLI failed (code ${code}): ${errorOutput}`));
        }
      });
      
      claude.on('error', (error) => {
        reject(new Error(`Failed to spawn Claude Code CLI: ${error.message}`));
      });
      
      // Timeout after 60 seconds
      setTimeout(() => {
        claude.kill();
        reject(new Error('Claude Code CLI timeout'));
      }, 60000);
    });
  }

  /**
   * Parse LLM response from Claude Code
   */
  parseLLMResponse(response, batch) {
    const renames = new Map();
    
    // Look for numbered responses
    const lines = response.split('\n').filter(line => line.match(/^\d+\./));
    
    lines.forEach((line, index) => {
      const match = line.match(/^\d+\.\s*(.+)$/);
      if (match && batch[index]) {
        const suggestedName = match[1].trim();
        const originalName = batch[index].name;
        
        if (this.isValidName(suggestedName, originalName, batch[index])) {
          renames.set(originalName, suggestedName);
        } else {
          console.warn(`   ⚠️  Invalid Claude suggestion for ${originalName}: ${suggestedName}`);
          // Fallback to pattern matching
          const fallback = this.generatePracticalName(batch[index]);
          renames.set(originalName, fallback);
        }
      }
    });
    
    // If no valid responses, fallback to pattern matching
    if (renames.size === 0) {
      console.warn('   ⚠️  No valid responses from Claude, using pattern matching fallback');
      batch.forEach(identifier => {
        const fallbackName = this.generatePracticalName(identifier);
        renames.set(identifier.name, fallbackName);
      });
    }
    
    return renames;
  }

  /**
   * Validate suggested name from Claude
   */
  isValidName(suggested, original, identifier) {
    // Basic validation
    if (!suggested || suggested === original) return false;
    if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(suggested)) return false;
    if (suggested.length < 3 || suggested.length > 40) return false;
    
    // Reserved words check
    const reserved = ['var', 'let', 'const', 'function', 'return', 'if', 'else'];
    if (reserved.includes(suggested.toLowerCase())) return false;
    
    return true;
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
   * Print Claude Code results
   */
  printClaudeCodeResults(inputPath, outputPath, renameCount) {
    const totalTime = Date.now() - this.startTime;
    
    console.log('\n🤖 CLAUDE CODE HUMANIFICATION COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(1)}s`);
    console.log(`🔄 Total renames: ${renameCount.toLocaleString()}`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`🤖 Powered by Claude Code CLI`);
    
    console.log('\n🏆 SAMPLE INTELLIGENT RENAMES:');
    let count = 0;
    for (const [oldName, newName] of this.globalRenameMap) {
      console.log(`   ${String(count + 1).padStart(2)}. ${oldName.padEnd(8)} → ${newName}`);
      if (++count >= 15) break;
    }
    
    console.log('\n✨ Humanized with Claude\'s intelligence!');
  }

  /**
   * Save Claude Code outputs
   */
  saveClaudeCodeOutputs(outputPath, renames) {
    const renameMapPath = outputPath.replace('.js', '-claude-rename-map.json');
    const statsPath = outputPath.replace('.js', '-claude-stats.json');
    
    fs.writeFileSync(renameMapPath, JSON.stringify(
      Object.fromEntries(renames), 
      null, 
      2
    ));
    
    fs.writeFileSync(statsPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalRenames: renames.size,
      processingTime: Date.now() - this.startTime,
      method: 'Claude Code CLI',
      projectDescription: this.projectDescription
    }, null, 2));
    
    console.log(`📋 Claude rename map: ${renameMapPath}`);
    console.log(`📊 Processing stats: ${statsPath}`);
  }

  /**
   * Sleep utility
   */
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

function showUsage() {
  console.log('🤖 Claude Code Humanify - LLM-Powered Variable Naming');
  console.log('=' .repeat(55));
  console.log('Usage:');
  console.log('  node claude-code-humanify.js <input-file> [output-file] "project description"');
  console.log('');
  console.log('Examples:');
  console.log('  node claude-code-humanify.js cli.js output.js "Node.js CLI tool"');
  console.log('  node claude-code-humanify.js app.min.js clean-app.js "React e-commerce frontend"');
  console.log('');
  console.log('Requirements:');
  console.log('  • Claude Code CLI installed and accessible');
  console.log('  • Project context description for better naming');
  console.log('');
  console.log('Features:');
  console.log('  • Uses Claude Code CLI (no API key needed)');
  console.log('  • Rich context analysis for intelligent naming');
  console.log('  • Automatic fallback to pattern matching');
  console.log('  • Batch processing with error recovery');
}

async function main() {
  if (process.argv.length < 4) {
    showUsage();
    process.exit(1);
  }

  const inputFile = process.argv[2];
  const outputFile = process.argv[3] || inputFile.replace('.js', '-claude-humanified.js');
  const projectDescription = process.argv[4];
  
  if (!projectDescription) {
    console.error('❌ Project description is required!');
    console.error('   Example: "React e-commerce app with user authentication"');
    showUsage();
    process.exit(1);
  }
  
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }
  
  try {
    const humanifier = new ClaudeCodeHumanifier(projectDescription);
    await humanifier.processWithClaudeCode(inputFile, outputFile);
  } catch (error) {
    console.error('❌ CLAUDE CODE HUMANIFICATION FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = ClaudeCodeHumanifier;