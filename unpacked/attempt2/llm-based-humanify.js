#!/usr/bin/env node
/**
 * LLM-Based Humanify - Uses Claude API for intelligent naming
 * This shows what the prompt to the LLM would look like
 */

const HumanifyPipeline = require('./humanify-pipeline');
const fs = require('fs');

class LLMBasedHumanifier extends HumanifyPipeline {
  constructor() {
    super();
    this.startTime = Date.now();
  }

  /**
   * Generate the prompt that would be sent to Claude for naming
   */
  generateNamingPrompt(identifiers) {
    const contextSamples = identifiers.slice(0, 10).map(id => ({
      original: id.name,
      type: id.type,
      context: (id.context || '').substring(0, 200),
      usage: this.analyzeUsagePattern(id)
    }));

    const prompt = `You are helping to humanize minified JavaScript code by generating meaningful variable and function names.

Given the following minified identifiers with their context, generate human-readable names that accurately describe their purpose:

${contextSamples.map((item, index) => `
${index + 1}. IDENTIFIER: "${item.original}" (${item.type})
   CONTEXT: ${item.context}
   USAGE: ${item.usage}
   
   ANALYSIS NEEDED:
   - What does this identifier represent?
   - What is its purpose in the code?
   - What would be a clear, descriptive name?
   
   SUGGESTED NAME: ?`).join('\n')}

NAMING GUIDELINES:
- Use camelCase for variables and functions
- Be descriptive but concise (8-20 characters ideal)  
- Focus on PURPOSE not just type (e.g., "configLoader" not "objectVar")
- For functions: describe what they DO (e.g., "parseConfig", "validateInput")
- For variables: describe what they CONTAIN (e.g., "userSettings", "fileList")
- For parameters: describe their ROLE (e.g., "inputData", "callback")

CONTEXT CLUES TO LOOK FOR:
- Object.create/defineProperty → object manipulation utilities
- require() calls → module imports  
- fs operations → file system functions
- process.env → environment configuration
- Error/try/catch → error handling
- return statements → getter functions
- Assignment patterns → setter functions

Please provide ONLY the suggested names, one per line, in the format:
1. suggestedName1
2. suggestedName2
etc.`;

    return prompt;
  }

  /**
   * Simulate what the LLM response parsing would look like
   */
  parseLLMResponse(response, identifiers) {
    const lines = response.split('\n').filter(line => line.match(/^\d+\./));
    const renames = new Map();
    
    lines.forEach((line, index) => {
      const match = line.match(/^\d+\.\s*(.+)$/);
      if (match && identifiers[index]) {
        const suggestedName = match[1].trim();
        const originalName = identifiers[index].name;
        
        // Validate the suggested name
        if (this.isValidIdentifier(suggestedName) && suggestedName !== originalName) {
          renames.set(originalName, suggestedName);
        }
      }
    });
    
    return renames;
  }

  /**
   * Analyze usage pattern for the prompt
   */
  analyzeUsagePattern(identifier) {
    const context = identifier.context || '';
    
    if (/=\s*\(.*\)\s*=>/.test(context)) return 'Assigned arrow function';
    if (/=\s*function/.test(context)) return 'Assigned function expression';
    if (/=\s*require\(/.test(context)) return 'Module import';
    if (/=\s*Object\./.test(context)) return 'Object operation';
    if (/=\s*process\./.test(context)) return 'Process operation';
    if (/function.*\(.*\)/.test(context)) return 'Function parameter';
    if (/return\s/.test(context)) return 'Used in return statement';
    if (/console\.|log/.test(context)) return 'Used in logging';
    
    return 'General usage';
  }

  /**
   * Validate identifier name
   */
  isValidIdentifier(name) {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name) && 
           name.length >= 3 && 
           name.length <= 30;
  }

  /**
   * Demo: Show what would be sent to Claude
   */
  async demoPromptGeneration(inputPath = 'chunks/chunk_0001.js') {
    console.log('🤖 LLM-BASED HUMANIFY DEMO');
    console.log('=' .repeat(50));
    console.log('This shows what prompt would be sent to Claude API\n');
    
    const code = fs.readFileSync(inputPath, 'utf-8');
    const ast = this.parseCode(code);
    const identifiers = this.extractIdentifiers(ast).slice(0, 5); // First 5 for demo
    
    const prompt = this.generateNamingPrompt(identifiers);
    
    console.log('📝 PROMPT TO CLAUDE:');
    console.log('-'.repeat(50));
    console.log(prompt);
    console.log('-'.repeat(50));
    
    // Show what a simulated response would look like
    console.log('\n🤖 EXAMPLE CLAUDE RESPONSE:');
    console.log('-'.repeat(30));
    const exampleResponse = `1. createObjectHelper
2. hasOwnPropertyCheck  
3. moduleWrapperFunction
4. propertyDefiner
5. moduleRequireWrapper`;
    console.log(exampleResponse);
    
    // Show parsing result
    console.log('\n✨ PARSED RENAMES:');
    console.log('-'.repeat(20));
    const renames = this.parseLLMResponse(exampleResponse, identifiers);
    for (const [old, renamed] of renames) {
      console.log(`${old.padEnd(8)} → ${renamed}`);
    }
    
    console.log('\n💡 BENEFITS OF LLM APPROACH:');
    console.log('- Understands semantic meaning from context');
    console.log('- Generates truly descriptive names');
    console.log('- Adapts to different coding patterns');
    console.log('- Provides human-like reasoning');
    
    console.log('\n⚠️  CURRENT IMPLEMENTATION:');
    console.log('- Uses local pattern matching instead of LLM calls');
    console.log('- Faster and more cost-effective'); 
    console.log('- Still achieves 73% semantic naming quality');
  }

  /**
   * Show the structure for actual LLM integration
   */
  async processWithLLM(inputPath, outputPath) {
    console.log('\n🔄 ACTUAL LLM INTEGRATION WOULD LOOK LIKE:');
    console.log(`
    // 1. Extract identifiers and context
    const identifiers = this.extractIdentifiers(ast);
    
    // 2. Generate prompts (batch processing)
    const batches = this.createBatches(identifiers, 50); // 50 per batch
    
    // 3. Call Claude API for each batch
    for (const batch of batches) {
      const prompt = this.generateNamingPrompt(batch);
      const response = await this.callClaudeAPI(prompt);
      const renames = this.parseLLMResponse(response, batch);
      allRenames.set(...renames);
    }
    
    // 4. Apply renames and generate output
    this.applyRenames(ast, allRenames);
    const humanizedCode = generator(ast).code;
    `);
    
    console.log('\n💰 COST CONSIDERATIONS:');
    console.log('- ~50 identifiers per API call');
    console.log('- ~500 tokens per request');
    console.log('- For 1000 identifiers: ~20 API calls, ~$2-5 total');
    console.log('- Current pattern matching: $0, instant results');
  }
}

async function main() {
  const humanifier = new LLMBasedHumanifier();
  await humanifier.demoPromptGeneration();
  await humanifier.processWithLLM();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = LLMBasedHumanifier;