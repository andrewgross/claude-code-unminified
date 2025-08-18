#!/usr/bin/env node
/**
 * Interactive LLM Humanify - Asks user for project context
 * Provides better naming through user-provided domain knowledge
 */

const HumanifyPipeline = require('./humanify-pipeline');
const EnhancedPromptDemo = require('./enhanced-prompt-demo');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

class InteractiveLLMHumanifier extends EnhancedPromptDemo {
  constructor() {
    super();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Interactive project context gathering
   */
  async gatherProjectContext(inputPath) {
    console.log('🧠 INTELLIGENT CODE HUMANIFICATION');
    console.log('=' .repeat(50));
    console.log(`📄 Input file: ${inputPath}`);
    
    const fileSize = fs.statSync(inputPath).size;
    console.log(`📊 File size: ${(fileSize / 1024 / 1024).toFixed(1)}MB`);
    
    console.log('\n🤔 To generate meaningful variable names, I need to understand your code...\n');
    
    const context = {};
    
    // Primary project description
    context.projectType = await this.askQuestion(
      '📝 What type of application/library is this? (e.g., "React web app", "Node.js API server", "CLI tool", "data processing library")\n   → '
    );
    
    // Domain/purpose
    context.domain = await this.askQuestion(
      '🎯 What domain does it work in? (e.g., "e-commerce", "data visualization", "file processing", "developer tools")\n   → '
    );
    
    // Main functionality
    context.functionality = await this.askQuestion(
      '⚙️  What are its main functions? (e.g., "processes user data and generates reports", "manages authentication and user sessions")\n   → '
    );
    
    // Technology stack clues
    context.techStack = await this.askQuestion(
      '🔧 What technologies does it use? (e.g., "Express.js, MongoDB", "React, Redux", "Webpack, Babel") [optional]\n   → ',
      true // optional
    );
    
    // Expected patterns
    context.patterns = await this.askQuestion(
      '🔍 Any specific patterns to expect? (e.g., "lots of async/await", "heavy DOM manipulation", "file system operations") [optional]\n   → ',
      true // optional
    );
    
    // Generate comprehensive description
    const description = this.buildProjectDescription(context);
    
    console.log('\n✨ Generated project context:');
    console.log('─'.repeat(40));
    console.log(`"${description}"`);
    console.log('─'.repeat(40));
    
    const confirm = await this.askQuestion('\n👍 Does this look accurate? (y/n) → ');
    
    if (confirm.toLowerCase().startsWith('n')) {
      console.log('\n📝 Please provide a custom description:');
      const customDesc = await this.askQuestion('   → ');
      return customDesc.trim();
    }
    
    return description;
  }

  /**
   * Build comprehensive project description from user inputs
   */
  buildProjectDescription(context) {
    let description = `${context.projectType}`;
    
    if (context.domain) {
      description += ` for ${context.domain}`;
    }
    
    if (context.functionality) {
      description += ` that ${context.functionality}`;
    }
    
    if (context.techStack) {
      description += `, built with ${context.techStack}`;
    }
    
    if (context.patterns) {
      description += `. Expected patterns: ${context.patterns}`;
    }
    
    return description;
  }

  /**
   * Ask user a question with optional validation
   */
  async askQuestion(question, optional = false) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        const trimmed = answer.trim();
        
        if (!optional && !trimmed) {
          console.log('⚠️  This field is required. Please provide an answer.');
          resolve(this.askQuestion(question, optional));
        } else {
          resolve(trimmed);
        }
      });
    });
  }

  /**
   * Main interactive process
   */
  async processInteractively(inputPath, outputPath) {
    try {
      // Gather project context
      const projectDescription = await this.gatherProjectContext(inputPath);
      this.rl.close();
      
      console.log('\n🚀 Starting intelligent humanification...');
      console.log(`🎯 Project context: "${projectDescription}"\n`);
      
      // Show what the enhanced prompt would look like
      console.log('🧠 ENHANCED CONTEXT ANALYSIS');
      console.log('=' .repeat(50));
      
      const code = fs.readFileSync(inputPath, 'utf-8');
      const ast = this.parseCode(code);
      const identifiers = this.extractIdentifiersWithRichContext(ast).slice(0, 2); // Show 2 for demo
      
      console.log('📋 Sample of enhanced prompt to Claude:\n');
      console.log(this.generateEnhancedPrompt(identifiers, projectDescription));
      
      console.log('\n' + '=' .repeat(50));
      console.log('💡 NAMING QUALITY PREVIEW');
      console.log('With this rich context, Claude would generate names like:');
      
      // Show expected naming improvements
      const expectedNames = this.generateExpectedNames(identifiers, projectDescription);
      expectedNames.forEach((name, index) => {
        console.log(`   ${identifiers[index].name.padEnd(8)} → ${name.padEnd(25)} [${name.reasoning}]`);
      });
      
      console.log('\n✨ Ready to integrate with Claude API for production-quality results!');
      
      // Option to proceed with pattern matching as fallback
      console.log('\n🔄 For now, using pattern matching as fallback...');
      await this.processWithPatternMatching(inputPath, outputPath, projectDescription);
      
    } catch (error) {
      console.error('❌ Interactive processing failed:', error.message);
      throw error;
    }
  }

  /**
   * Generate expected naming examples based on context
   */
  generateExpectedNames(identifiers, projectDescription) {
    return identifiers.map(id => {
      const semantic = id.semanticHints;
      const dataFlow = id.dataFlow.type;
      
      // Context-aware naming logic
      if (semantic.includes('object_creation') && projectDescription.includes('CLI')) {
        return {
          name: 'createCliObject',
          reasoning: 'Object creation in CLI context'
        };
      }
      
      if (semantic.includes('prototype_operation') && projectDescription.includes('processing')) {
        return {
          name: 'hasProcessingProperty', 
          reasoning: 'Property check in processing context'
        };
      }
      
      if (dataFlow === 'function_definition' && projectDescription.includes('data')) {
        return {
          name: 'processDataWrapper',
          reasoning: 'Function wrapper for data processing'
        };
      }
      
      // Fallback semantic names
      if (semantic.includes('file_system')) {
        return {
          name: 'fileSystemHandler',
          reasoning: 'File system operation'
        };
      }
      
      return {
        name: 'contextAwareHandler',
        reasoning: 'Generic but contextual'
      };
    });
  }

  /**
   * Fallback: Process with pattern matching using project context
   */
  async processWithPatternMatching(inputPath, outputPath, projectDescription) {
    const PracticalHumanifier = require('./practical-humanify');
    
    // Enhance pattern matching with project context
    class ContextAwarePracticalHumanifier extends PracticalHumanifier {
      constructor(projectContext) {
        super();
        this.projectContext = projectContext;
        this.contextPatterns = this.buildContextPatterns(projectContext);
      }

      buildContextPatterns(context) {
        const patterns = {};
        
        // Add context-specific patterns
        if (context.toLowerCase().includes('cli')) {
          patterns.cliArgument = {
            pattern: /process\.argv|commander|yargs/,
            generate: () => 'cliArgument'
          };
        }
        
        if (context.toLowerCase().includes('api') || context.toLowerCase().includes('server')) {
          patterns.apiHandler = {
            pattern: /(req|res|request|response)/i,
            generate: () => 'apiHandler'
          };
        }
        
        if (context.toLowerCase().includes('react') || context.toLowerCase().includes('component')) {
          patterns.reactComponent = {
            pattern: /(component|props|state|jsx)/i,
            generate: () => 'reactComponent'
          };
        }
        
        if (context.toLowerCase().includes('data')) {
          patterns.dataProcessor = {
            pattern: /(transform|process|parse|validate)/i,
            generate: () => 'dataProcessor'
          };
        }
        
        return patterns;
      }

      generatePracticalName(identifier) {
        // Try context-specific patterns first
        const contextName = this.tryContextPatterns(identifier);
        if (contextName) return contextName;
        
        // Fall back to standard patterns
        return super.generatePracticalName(identifier);
      }

      tryContextPatterns(identifier) {
        const { context } = identifier;
        const contextStr = (context || '').toLowerCase();
        
        for (const [patternName, patternConfig] of Object.entries(this.contextPatterns)) {
          const match = contextStr.match(patternConfig.pattern);
          if (match) {
            return patternConfig.generate(match, identifier.name, contextStr);
          }
        }
        
        return null;
      }
    }
    
    const contextHumanifier = new ContextAwarePracticalHumanifier(projectDescription);
    await contextHumanifier.processFile(inputPath, outputPath);
    
    console.log('\n🎯 Context-aware pattern matching completed!');
    console.log('📋 Names generated with awareness of your project domain.');
  }

  /**
   * Show usage instructions
   */
  static showUsage() {
    console.log('🧠 Interactive LLM-Based Humanify');
    console.log('=' .repeat(40));
    console.log('Usage:');
    console.log('  node interactive-llm-humanify.js <input-file> [output-file]');
    console.log('');
    console.log('Examples:');
    console.log('  node interactive-llm-humanify.js cli.js');
    console.log('  node interactive-llm-humanify.js app.min.js humanified-app.js');
    console.log('');
    console.log('The tool will ask you questions about your code to provide');
    console.log('better naming suggestions tailored to your specific project.');
  }
}

async function main() {
  if (process.argv.length < 3) {
    InteractiveLLMHumanifier.showUsage();
    process.exit(1);
  }

  const inputFile = process.argv[2];
  const outputFile = process.argv[3] || inputFile.replace('.js', '-humanified.js');
  
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }
  
  try {
    const humanifier = new InteractiveLLMHumanifier();
    await humanifier.processInteractively(inputFile, outputFile);
  } catch (error) {
    console.error('❌ INTERACTIVE HUMANIFICATION FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = InteractiveLLMHumanifier;