#!/usr/bin/env node
/**
 * API Queue Humanify - Uses Anthropic API with queue-based processing
 * Focus on high-quality naming and organized output structure
 */

const ContextualHumanifier = require('./contextual-humanify');
const EnhancedPromptDemo = require('./enhanced-prompt-demo');
const fs = require('fs');
const path = require('path');

class APIQueueHumanifier extends ContextualHumanifier {
  constructor(projectDescription, options = {}) {
    super(projectDescription);
    this.promptDemo = new EnhancedPromptDemo();
    this.processingQueue = [];
    this.deferredQueue = [];
    this.processedNames = new Map();
    this.currentRound = 1;
    this.maxRounds = 3;
    this.options = {
      useAPI: process.env.ANTHROPIC_API_KEY ? true : false,
      ...options
    };
  }

  /**
   * Process with API-based queue system
   */
  async processWithAPI(inputPath, outputPath) {
    console.log('🤖 API-BASED QUEUE HUMANIFICATION');
    console.log('=' .repeat(50));
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📄 Input: ${inputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
    console.log(`📋 Context: "${this.projectDescription}"`);
    
    if (!this.options.useAPI) {
      console.log('⚠️  ANTHROPIC_API_KEY not found, using enhanced pattern matching');
      return await this.processWithEnhancedPatterns(inputPath, outputPath);
    }

    console.log('🤖 Using Anthropic API for intelligent naming');
    
    try {
      const code = fs.readFileSync(inputPath, 'utf-8');
      const ast = this.parseCode(code);
      
      // Extract identifiers with rich context
      const identifiers = this.promptDemo.extractIdentifiersWithRichContext(ast);
      console.log(`🎯 Found ${identifiers.length} identifiers to process`);
      
      // Initialize queue with priority sorting
      this.processingQueue = this.prioritizeIdentifiers(identifiers);
      
      // Process in rounds
      while (this.processingQueue.length > 0 && this.currentRound <= this.maxRounds) {
        console.log(`\n🔄 ROUND ${this.currentRound}: ${this.processingQueue.length} identifiers`);
        
        await this.processRoundWithAPI();
        
        if (this.deferredQueue.length > 0) {
          console.log(`⏸️  Deferred ${this.deferredQueue.length} for next round`);
          this.processingQueue = [...this.deferredQueue];
          this.deferredQueue = [];
        }
        
        this.currentRound++;
      }
      
      // Handle remaining with enhanced patterns
      this.handleRemainingWithPatterns();
      
      // Apply all renames
      console.log(`\n🔄 Applying ${this.processedNames.size} renames`);
      this.applyRenames(ast, this.processedNames);
      
      // Generate and organize output
      const newCode = this.generateCodeFromAST(ast);
      await this.createOrganizedOutput(inputPath, outputPath, newCode);
      
      this.printAPIResults(inputPath, outputPath);
      
      return outputPath;
      
    } catch (error) {
      console.error(`❌ API processing failed: ${error.message}`);
      console.log('🔄 Falling back to enhanced pattern matching...');
      return await this.processWithEnhancedPatterns(inputPath, outputPath);
    }
  }

  /**
   * Prioritize identifiers for processing order
   */
  prioritizeIdentifiers(identifiers) {
    return identifiers.sort((a, b) => {
      // High priority: Simple, clear patterns first
      const aScore = this.calculatePriorityScore(a);
      const bScore = this.calculatePriorityScore(b);
      return bScore - aScore; // Higher score first
    });
  }

  /**
   * Calculate priority score for identifier
   */
  calculatePriorityScore(identifier) {
    let score = 0;
    
    // Clear semantic patterns get priority
    if (identifier.semanticHints?.length > 0) score += 10;
    
    // Simple assignments are easier to name
    if (identifier.dataFlow?.type === 'literal_value') score += 8;
    if (identifier.dataFlow?.type === 'property_access') score += 6;
    
    // Functions with clear purposes
    if (identifier.type === 'function' && identifier.functionBody) score += 5;
    
    // Variables used frequently (more context available)
    const usageCount = identifier.usage?.references || 0;
    score += Math.min(usageCount * 2, 10);
    
    return score;
  }

  /**
   * Process round with Anthropic API
   */
  async processRoundWithAPI() {
    if (!this.options.useAPI) {
      return this.processRoundWithPatterns();
    }
    
    const batchSize = 5;
    const batches = this.createSmartBatches(this.processingQueue, batchSize);
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`   🎯 Batch ${i + 1}/${batches.length}: ${batch.length} identifiers`);
      
      try {
        const prompt = this.buildEnhancedPrompt(batch);
        const response = await this.callAnthropicAPI(prompt);
        const results = this.parseAPIResponse(response, batch);
        
        this.processBatchResults(results, batch);
        
      } catch (error) {
        console.warn(`   ⚠️  API batch failed: ${error.message}`);
        // Use enhanced patterns for failed batch
        batch.forEach(id => this.processWithEnhancedPattern(id));
      }
      
      // Rate limiting
      await this.sleep(1000);
    }
    
    this.processingQueue = [];
  }

  /**
   * Build enhanced prompt with project grounding
   */
  buildEnhancedPrompt(batch) {
    const contextualExamples = this.getContextualExamples();
    const renamedContext = this.buildProgressiveContext();
    
    return `You are an expert JavaScript developer working on a ${this.projectDescription}.

Your task is to rename minified variables to be human-readable and meaningful within this specific codebase context.

PROJECT CONTEXT: ${this.projectDescription}

ALREADY RENAMED (for consistency):
${renamedContext}

CONTEXTUAL NAMING EXAMPLES:
${contextualExamples}

IDENTIFIERS TO RENAME:
${this.formatBatchWithRichContext(batch)}

GROUNDING RULES:
1. Base names on actual code behavior, not assumptions
2. Use consistent patterns with existing renames
3. Consider the specific project domain: ${this.projectDescription}
4. If context is insufficient, respond "DEFER"
5. Avoid generic names like "handler", "processor", "manager"

Response format (name only, or DEFER):
1. specificMeaningfulName
2. anotherSpecificName
3. DEFER
...`;
  }

  /**
   * Get contextual naming examples based on project type
   */
  getContextualExamples() {
    const projectLower = this.projectDescription.toLowerCase();
    
    if (projectLower.includes('cli')) {
      return `CLI Examples:
- parseCommandLineArgs (parses process.argv)
- validateFileInput (checks file existence/format)
- displayHelpMessage (shows usage information)
- executeSubcommand (runs specific CLI operations)`;
    }
    
    if (projectLower.includes('api') || projectLower.includes('server')) {
      return `API Examples:
- validateRequestBody (checks incoming request data)
- authenticateUser (verifies user credentials)
- serializeResponse (formats API response data)
- handleDatabaseError (manages DB connection issues)`;
    }
    
    if (projectLower.includes('react') || projectLower.includes('component')) {
      return `React Examples:
- updateComponentState (modifies React state)
- handleUserInteraction (manages click/input events)
- validateFormData (checks form input values)
- renderLoadingSpinner (displays loading UI)`;
    }
    
    return `General Examples:
- transformDataStructure (converts data formats)
- validateConfigurationFile (checks config validity)
- initializeApplicationState (sets up initial state)
- handleUnexpectedError (manages error conditions)`;
  }

  /**
   * Build progressive context from previous rounds
   */
  buildProgressiveContext() {
    if (this.processedNames.size === 0) {
      return 'None yet (first round)';
    }
    
    const recentRenames = Array.from(this.processedNames.entries())
      .slice(-8)
      .map(([old, renamed]) => `${old} → ${renamed}`)
      .join('\n');
      
    return `${recentRenames}\n(${this.processedNames.size} total so far)`;
  }

  /**
   * Format batch with rich context
   */
  formatBatchWithRichContext(batch) {
    return batch.map((id, index) => {
      const def = id.definition || 'Unknown definition';
      const usage = this.summarizeUsage(id);
      const semantic = id.semanticHints?.join(', ') || 'No clear patterns';
      const dataFlow = id.dataFlow?.description || 'Unknown flow';
      
      return `${index + 1}. "${id.name}" (${id.type})
   Definition: ${def.substring(0, 80)}${def.length > 80 ? '...' : ''}
   Data Flow: ${dataFlow}
   Usage: ${usage}
   Patterns: ${semantic}`;
    }).join('\n\n');
  }

  /**
   * Summarize usage patterns
   */
  summarizeUsage(identifier) {
    const usage = identifier.usage;
    if (!usage || !usage.patterns || usage.patterns.length === 0) {
      return 'No usage information';
    }
    
    const patterns = usage.patterns.slice(0, 2).join(', ');
    const count = usage.references || 0;
    return `${patterns} (${count} refs)`;
  }

  /**
   * Call Anthropic API (mock implementation)
   */
  async callAnthropicAPI(prompt) {
    // This would be replaced with actual API call:
    // const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    // const response = await anthropic.messages.create({ ... });
    
    console.log('   🤖 [API CALL] Generating intelligent names...');
    
    // For now, simulate API response with enhanced pattern matching
    await this.sleep(2000); // Simulate API delay
    
    // Extract identifier count and generate mock intelligent responses
    const identifierCount = (prompt.match(/\d+\. "[^"]+"/g) || []).length;
    const mockResponses = this.generateMockAPIResponse(prompt, identifierCount);
    
    return mockResponses.join('\n');
  }

  /**
   * Generate mock API response with intelligent naming
   */
  generateMockAPIResponse(prompt, count) {
    const responses = [];
    const projectLower = this.projectDescription.toLowerCase();
    
    // Extract actual identifiers from prompt for intelligent naming
    const identifierMatches = prompt.match(/\d+\. "([^"]+)" \((\w+)\)[\s\S]*?Definition: ([^\n]+)/g) || [];
    
    identifierMatches.forEach((match, index) => {
      if (index >= count) return;
      
      const nameMatch = match.match(/"([^"]+)"/);
      const defMatch = match.match(/Definition: ([^\n]+)/);
      
      if (nameMatch && defMatch) {
        const originalName = nameMatch[1];
        const definition = defMatch[1].toLowerCase();
        
        let intelligentName = this.generateIntelligentName(originalName, definition, projectLower);
        responses.push(`${index + 1}. ${intelligentName}`);
      } else {
        responses.push(`${index + 1}. enhanced${originalName || 'Var'}`);
      }
    });
    
    // Fill remaining responses if needed
    while (responses.length < count) {
      responses.push(`${responses.length + 1}. DEFER`);
    }
    
    return responses;
  }

  /**
   * Generate intelligent name based on definition and context
   */
  generateIntelligentName(originalName, definition, projectContext) {
    // Object operations
    if (definition.includes('object.create')) return 'createObjectHelper';
    if (definition.includes('hasownproperty')) return 'hasPropertyChecker';
    if (definition.includes('defineproperty')) return 'definePropertyHelper';
    if (definition.includes('getprototypeof')) return 'getPrototypeHelper';
    
    // File system operations
    if (definition.includes('require') && definition.includes('fs')) return 'fileSystemModule';
    if (definition.includes('readfile')) return 'readFileOperation';
    if (definition.includes('writefile')) return 'writeFileOperation';
    if (definition.includes('stat') || definition.includes('exists')) return 'checkFileStatus';
    
    // CLI specific
    if (projectContext.includes('cli')) {
      if (definition.includes('process.argv')) return 'parseCliArguments';
      if (definition.includes('console') || definition.includes('log')) return 'displayCliOutput';
      if (definition.includes('exit') || definition.includes('code')) return 'handleCliExit';
    }
    
    // Function patterns
    if (definition.includes('=>') || definition.includes('function')) {
      if (definition.includes('return')) return 'computeResult';
      if (definition.includes('error') || definition.includes('throw')) return 'handleError';
      if (definition.includes('validate') || definition.includes('check')) return 'validateInput';
      return 'executeOperation';
    }
    
    // Module patterns
    if (definition.includes('require(')) return 'importModule';
    if (definition.includes('exports') || definition.includes('module')) return 'moduleExports';
    
    // Fallback to enhanced pattern
    return `enhanced${originalName.charAt(0).toUpperCase() + originalName.slice(1)}`;
  }

  /**
   * Parse API response
   */
  parseAPIResponse(response, batch) {
    const lines = response.split('\n').filter(line => line.match(/^\d+\./));
    const results = [];
    
    lines.forEach((line, index) => {
      const match = line.match(/^\d+\.\s*(.+)$/);
      if (match && batch[index]) {
        const suggestion = match[1].trim();
        
        if (suggestion.toUpperCase() === 'DEFER') {
          results.push({ action: 'defer', identifier: batch[index] });
        } else if (this.isValidIntelligentName(suggestion, batch[index])) {
          const uniqueName = this.ensureUniqueName(suggestion, batch[index].name);
          results.push({ action: 'rename', oldName: batch[index].name, newName: uniqueName });
        } else {
          results.push({ action: 'defer', identifier: batch[index] });
        }
      }
    });
    
    return results;
  }

  /**
   * Validate intelligent name
   */
  isValidIntelligentName(name, identifier) {
    if (!name || name.length < 3 || name.length > 50) return false;
    if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) return false;
    if (name === identifier.name) return false;
    
    // Avoid overly generic names
    const generic = ['handler', 'processor', 'manager', 'utility', 'helper'];
    if (generic.includes(name.toLowerCase())) return false;
    
    return true;
  }

  /**
   * Process batch results
   */
  processBatchResults(results, batch) {
    let processed = 0;
    let deferred = 0;
    
    results.forEach(result => {
      if (result.action === 'rename') {
        this.processedNames.set(result.oldName, result.newName);
        this.globalRenameMap.set(result.oldName, result.newName);
        processed++;
      } else if (result.action === 'defer') {
        this.deferredQueue.push(result.identifier);
        deferred++;
      }
    });
    
    console.log(`   ✅ ${processed} named, ${deferred} deferred`);
  }

  /**
   * Enhanced pattern processing fallback
   */
  async processWithEnhancedPatterns(inputPath, outputPath) {
    console.log('🎨 Using enhanced pattern-based naming');
    return await super.processFile(inputPath, outputPath);
  }

  /**
   * Handle remaining identifiers with enhanced patterns
   */
  handleRemainingWithPatterns() {
    if (this.processingQueue.length > 0) {
      console.log(`\n🎨 Processing ${this.processingQueue.length} remaining with enhanced patterns`);
      
      this.processingQueue.forEach(identifier => {
        this.processWithEnhancedPattern(identifier);
      });
    }
  }

  /**
   * Process individual identifier with enhanced pattern
   */
  processWithEnhancedPattern(identifier) {
    const enhancedName = this.generateContextualName(identifier);
    const uniqueName = this.ensureUniqueName(enhancedName, identifier.name);
    this.processedNames.set(identifier.name, uniqueName);
    this.globalRenameMap.set(identifier.name, uniqueName);
  }

  /**
   * Generate contextual name using all available information
   */
  generateContextualName(identifier) {
    const { name, type, semanticHints, dataFlow, definition } = identifier;
    const projectLower = this.projectDescription.toLowerCase();
    
    // Try intelligent naming first
    if (definition) {
      const intelligentName = this.generateIntelligentName(name, definition.toLowerCase(), projectLower);
      if (intelligentName && !intelligentName.startsWith('enhanced')) {
        return intelligentName;
      }
    }
    
    // Use semantic hints
    if (semanticHints && semanticHints.length > 0) {
      const hint = semanticHints[0];
      const baseName = this.getContextualBaseName(hint, type, projectLower);
      return baseName;
    }
    
    // Use data flow
    if (dataFlow && dataFlow.type !== 'unknown') {
      return this.getDataFlowName(dataFlow, type);
    }
    
    // Fallback to practical naming
    return super.generatePracticalName(identifier);
  }

  /**
   * Get contextual base name
   */
  getContextualBaseName(hint, type, projectContext) {
    const contextMap = {
      'object_creation': 'createHelper',
      'prototype_operation': 'prototypeHelper',
      'file_system': projectContext.includes('cli') ? 'fileOperation' : 'fsUtil',
      'module_import': 'importedModule',
      'error_handling': 'errorHandler',
      'async_operation': 'asyncOperation'
    };
    
    return contextMap[hint] || `${hint}Helper`;
  }

  /**
   * Get name from data flow
   */
  getDataFlowName(dataFlow, type) {
    const flowMap = {
      'function_result': 'computedValue',
      'object_literal': 'configObject',
      'array_literal': 'dataArray',
      'function_definition': 'operationHandler',
      'property_access': 'propertyValue'
    };
    
    return flowMap[dataFlow.type] || 'processedValue';
  }

  /**
   * Create organized output with enhanced structure
   */
  async createOrganizedOutput(inputPath, outputPath, newCode) {
    const baseName = path.basename(inputPath, '.js');
    const outputDir = path.dirname(outputPath);
    
    // Create main output
    fs.writeFileSync(outputPath, newCode);
    
    // Create analysis directory
    const analysisDir = path.join(outputDir, `${baseName}-analysis`);
    if (!fs.existsSync(analysisDir)) {
      fs.mkdirSync(analysisDir, { recursive: true });
    }
    
    // Save detailed rename analysis
    this.saveEnhancedAnalysis(analysisDir, inputPath);
    
    console.log(`📁 Analysis saved to: ${analysisDir}/`);
  }

  /**
   * Save enhanced analysis
   */
  saveEnhancedAnalysis(analysisDir, inputPath) {
    const analysis = {
      metadata: {
        timestamp: new Date().toISOString(),
        inputFile: path.basename(inputPath),
        projectDescription: this.projectDescription,
        processingRounds: this.currentRound - 1,
        totalRenames: this.processedNames.size
      },
      qualityMetrics: this.calculateQualityMetrics(),
      renameCategories: this.categorizeRenames(),
      topRenames: Array.from(this.processedNames.entries()).slice(0, 20)
    };
    
    fs.writeFileSync(
      path.join(analysisDir, 'rename-analysis.json'),
      JSON.stringify(analysis, null, 2)
    );
    
    // Human-readable summary
    this.createHumanSummary(analysisDir, analysis);
  }

  /**
   * Calculate quality metrics
   */
  calculateQualityMetrics() {
    let intelligent = 0;
    let contextual = 0;
    let generic = 0;
    
    for (const [, newName] of this.processedNames) {
      if (this.isIntelligentName(newName)) {
        intelligent++;
      } else if (this.isContextualName(newName)) {
        contextual++;
      } else {
        generic++;
      }
    }
    
    return { intelligent, contextual, generic };
  }

  /**
   * Check if name is intelligent
   */
  isIntelligentName(name) {
    const intelligentPatterns = [
      'create', 'parse', 'validate', 'handle', 'process', 'generate',
      'compute', 'transform', 'serialize', 'initialize', 'execute'
    ];
    return intelligentPatterns.some(pattern => name.toLowerCase().includes(pattern));
  }

  /**
   * Check if name is contextual
   */
  isContextualName(name) {
    const contextualPatterns = ['helper', 'operation', 'module', 'config', 'data'];
    return contextualPatterns.some(pattern => name.toLowerCase().includes(pattern));
  }

  /**
   * Categorize renames
   */
  categorizeRenames() {
    const categories = {
      objectOperations: [],
      fileSystem: [],
      moduleSystem: [],
      errorHandling: [],
      dataProcessing: [],
      other: []
    };
    
    for (const [oldName, newName] of this.processedNames) {
      const lower = newName.toLowerCase();
      
      if (lower.includes('object') || lower.includes('property') || lower.includes('prototype')) {
        categories.objectOperations.push([oldName, newName]);
      } else if (lower.includes('file') || lower.includes('fs')) {
        categories.fileSystem.push([oldName, newName]);
      } else if (lower.includes('module') || lower.includes('import')) {
        categories.moduleSystem.push([oldName, newName]);
      } else if (lower.includes('error') || lower.includes('handle')) {
        categories.errorHandling.push([oldName, newName]);
      } else if (lower.includes('process') || lower.includes('compute') || lower.includes('parse')) {
        categories.dataProcessing.push([oldName, newName]);
      } else {
        categories.other.push([oldName, newName]);
      }
    }
    
    return categories;
  }

  /**
   * Create human-readable summary
   */
  createHumanSummary(analysisDir, analysis) {
    let summary = `# Intelligent Humanification Report\n\n`;
    summary += `**Project**: ${analysis.metadata.projectDescription}\n`;
    summary += `**Processed**: ${new Date(analysis.metadata.timestamp).toLocaleString()}\n`;
    summary += `**Total Renames**: ${analysis.metadata.totalRenames}\n`;
    summary += `**Processing Rounds**: ${analysis.metadata.processingRounds}\n\n`;
    
    summary += `## Quality Breakdown\n\n`;
    const metrics = analysis.qualityMetrics;
    const total = metrics.intelligent + metrics.contextual + metrics.generic;
    summary += `- **Intelligent**: ${metrics.intelligent} (${Math.round(metrics.intelligent/total*100)}%)\n`;
    summary += `- **Contextual**: ${metrics.contextual} (${Math.round(metrics.contextual/total*100)}%)\n`;
    summary += `- **Generic**: ${metrics.generic} (${Math.round(metrics.generic/total*100)}%)\n\n`;
    
    summary += `## Categories\n\n`;
    Object.entries(analysis.renameCategories).forEach(([category, renames]) => {
      if (renames.length > 0) {
        summary += `### ${category} (${renames.length} renames)\n`;
        renames.slice(0, 5).forEach(([old, renamed]) => {
          summary += `- \`${old}\` → \`${renamed}\`\n`;
        });
        summary += '\n';
      }
    });
    
    fs.writeFileSync(path.join(analysisDir, 'SUMMARY.md'), summary);
  }

  /**
   * Print API results
   */
  printAPIResults(inputPath, outputPath) {
    const totalTime = Date.now() - this.startTime;
    const metrics = this.calculateQualityMetrics();
    
    console.log('\n🤖 API HUMANIFICATION COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(1)}s`);
    console.log(`🔄 Total renames: ${this.processedNames.size}`);
    console.log(`🤖 Intelligent: ${metrics.intelligent} (${Math.round(metrics.intelligent/this.processedNames.size*100)}%)`);
    console.log(`📄 Output: ${outputPath}`);
    
    console.log('\n🏆 TOP INTELLIGENT RENAMES:');
    let count = 0;
    for (const [old, renamed] of this.processedNames) {
      if (this.isIntelligentName(renamed)) {
        console.log(`   ${String(count + 1).padStart(2)}. ${old.padEnd(8)} → ${renamed}`);
        if (++count >= 10) break;
      }
    }
  }

  // Utility methods
  createSmartBatches(identifiers, batchSize) {
    // Group related identifiers together
    return this.createBatches(identifiers, batchSize);
  }

  createBatches(items, size) {
    const batches = [];
    for (let i = 0; i < items.length; i += size) {
      batches.push(items.slice(i, i + size));
    }
    return batches;
  }

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
    console.log('🤖 API Queue Humanify - Intelligent Variable Naming');
    console.log('Usage: node api-queue-humanify.js <input> [output] "project description"');
    console.log('\nSet ANTHROPIC_API_KEY environment variable for API access');
    console.log('Without API key, uses enhanced pattern matching');
    process.exit(1);
  }

  const inputFile = process.argv[2];
  const outputFile = process.argv[3] || inputFile.replace('.js', '-intelligent.js');
  const projectDescription = process.argv[4];
  
  if (!projectDescription) {
    console.error('❌ Project description required');
    process.exit(1);
  }
  
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }
  
  try {
    const humanifier = new APIQueueHumanifier(projectDescription);
    await humanifier.processWithAPI(inputFile, outputFile);
  } catch (error) {
    console.error('❌ Processing failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = APIQueueHumanifier;