#!/usr/bin/env node
/**
 * Debug Context - Show what semantic context is being extracted
 */

const SemanticContextAnalyzer = require('./semantic-context-analyzer');
const HumanifyPipeline = require('./humanify-pipeline');
const fs = require('fs');

class DebugContext extends HumanifyPipeline {
  constructor() {
    super();
    this.contextAnalyzer = new SemanticContextAnalyzer();
  }

  async debugContext(inputPath = 'chunks/chunk_0001.js') {
    console.log('🔍 DEBUG: Semantic Context Analysis');
    console.log('=' .repeat(50));
    
    const code = fs.readFileSync(inputPath, 'utf-8');
    const ast = this.parseCode(code);
    const identifiers = this.extractIdentifiers(ast).slice(0, 10); // Just first 10
    
    console.log(`\n📊 Analyzing first ${identifiers.length} identifiers:\n`);
    
    for (const identifier of identifiers) {
      try {
        console.log(`🎯 IDENTIFIER: ${identifier.name} (${identifier.type})`);
        console.log('-'.repeat(30));
        
        // Extract context
        const context = this.contextAnalyzer.analyzeIdentifierContext(identifier, identifier.astPath);
        
        console.log(`📋 Immediate Context:`, JSON.stringify(context.codeContext.immediate, null, 2));
        console.log(`🔍 Semantic Hints:`, context.semanticHints);
        console.log(`🎭 Usage Pattern:`, JSON.stringify(context.usagePattern, null, 2));
        console.log(`🧠 Purpose:`, JSON.stringify(context.purposeInference, null, 2));
        
        // Generate name
        const meaningfulName = this.contextAnalyzer.generateMeaningfulName(identifier, context);
        console.log(`✨ Generated Name: ${identifier.name} → ${meaningfulName}`);
        
        console.log('');
      } catch (error) {
        console.log(`❌ Error analyzing ${identifier.name}:`, error.message);
        console.log('');
      }
    }
  }
}

async function main() {
  const contextDebugger = new DebugContext();
  await contextDebugger.debugContext();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = DebugContext;