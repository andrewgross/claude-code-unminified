#!/usr/bin/env node
/**
 * Enhanced Prompt Demo - Shows the rich context provided to LLM
 */

const HumanifyPipeline = require('./humanify-pipeline');
const fs = require('fs');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

class EnhancedPromptDemo extends HumanifyPipeline {
  constructor() {
    super();
    this.existingNames = [];
  }

  async demoEnhancedPrompt(inputPath = 'chunks/chunk_0001.js', projectDescription = 'JavaScript CLI tool for code analysis') {
    console.log('🚀 ENHANCED LLM PROMPT DEMONSTRATION');
    console.log('=' .repeat(60));
    console.log(`📁 Analyzing: ${inputPath}`);
    console.log(`📋 Project: ${projectDescription}\n`);
    
    const code = fs.readFileSync(inputPath, 'utf-8');
    const ast = this.parseCode(code);
    const identifiers = this.extractIdentifiersWithRichContext(ast).slice(0, 3); // First 3 for demo
    
    console.log('🧠 ENHANCED PROMPT TO CLAUDE:');
    console.log('=' .repeat(60));
    console.log(this.generateEnhancedPrompt(identifiers, projectDescription));
    console.log('=' .repeat(60));
    
    console.log('\n📊 CONTEXT RICHNESS ANALYSIS:');
    console.log(`✅ Project context: ${projectDescription ? 'Provided' : 'Missing'}`);
    console.log(`✅ Usage patterns: ${identifiers[0].usage.references} references analyzed`);
    console.log(`✅ Function bodies: ${identifiers.filter(i => i.functionBody).length} function implementations`);
    console.log(`✅ Call relationships: ${identifiers[0].relationships.calls.length} function calls tracked`);
    console.log(`✅ Data flow: ${identifiers[0].dataFlow.type} pattern detected`);
    
    console.log('\n🔍 SAMPLE CONTEXT EXTRACTION:');
    console.log('-'.repeat(40));
    const sample = identifiers[0];
    console.log(`Identifier: ${sample.name}`);
    console.log(`Definition: ${sample.definition}`);
    console.log(`Usage count: ${sample.usage.references}`);
    console.log(`Calls: ${sample.relationships.calls.join(', ') || 'none'}`);
    console.log(`Data flow: ${sample.dataFlow.description}`);
  }

  extractIdentifiersWithRichContext(ast) {
    const identifiers = [];
    const allReferences = this.buildReferenceMap(ast);
    
    traverse(ast, {
      VariableDeclarator: (path) => {
        const node = path.node;
        if (node.id?.type === 'Identifier' && this.shouldRename(node.id.name)) {
          identifiers.push(this.analyzeIdentifierWithRichContext(path, node.id.name, allReferences, ast));
        }
      },
      
      FunctionDeclaration: (path) => {
        const node = path.node;
        if (node.id?.name && this.shouldRename(node.id.name)) {
          identifiers.push(this.analyzeIdentifierWithRichContext(path, node.id.name, allReferences, ast));
        }
      }
    });
    
    return identifiers;
  }

  analyzeIdentifierWithRichContext(path, name, allReferences, ast) {
    const node = path.node;
    const binding = path.scope.getBinding(name);
    
    return {
      name,
      type: this.getIdentifierType(path),
      definition: this.getDefinition(path),
      functionBody: this.getFunctionBody(path),
      usage: this.analyzeUsagePattern(name, binding),
      relationships: this.analyzeRelationships(name, binding, allReferences),
      dataFlow: this.analyzeDataFlow(path),
      semanticHints: this.extractSemanticHints(path),
      scopeContext: this.getScopeContext(path)
    };
  }

  buildReferenceMap(ast) {
    const references = new Map();
    
    traverse(ast, {
      Identifier: (path) => {
        const name = path.node.name;
        if (!references.has(name)) {
          references.set(name, []);
        }
        references.get(name).push({
          path,
          usage: this.categorizeUsage(path)
        });
      }
    });
    
    return references;
  }

  getDefinition(path) {
    try {
      const definitionCode = generator(path.parent, { compact: false }).code;
      const firstLine = definitionCode.split('\n')[0];
      return firstLine.length > 120 ? firstLine.substring(0, 120) + '...' : firstLine;
    } catch (error) {
      return 'Definition unavailable';
    }
  }

  getFunctionBody(path) {
    try {
      const node = path.node;
      
      // If this is a function declaration
      if (node.type === 'FunctionDeclaration' && node.body) {
        return this.summarizeFunctionBody(node.body);
      }
      
      // If this is a variable assigned to a function
      if (node.type === 'VariableDeclarator' && node.init) {
        if (node.init.type === 'FunctionExpression' || node.init.type === 'ArrowFunctionExpression') {
          return this.summarizeFunctionBody(node.init.body);
        }
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  summarizeFunctionBody(body) {
    try {
      const bodyCode = generator(body, { compact: true }).code;
      const summary = {
        length: bodyCode.length,
        hasReturn: /return\s/.test(bodyCode),
        hasLoop: /(for|while|forEach)/.test(bodyCode),
        hasAsync: /await\s/.test(bodyCode),
        hasError: /(try|catch|throw)/.test(bodyCode),
        callsCount: (bodyCode.match(/\w+\(/g) || []).length,
        preview: bodyCode.length > 150 ? bodyCode.substring(0, 150) + '...' : bodyCode
      };
      
      return `${summary.preview} [${summary.callsCount} calls, ${summary.hasReturn ? 'returns' : 'void'}${summary.hasAsync ? ', async' : ''}${summary.hasError ? ', error-handling' : ''}]`;
    } catch (error) {
      return 'Function body analysis failed';
    }
  }

  analyzeUsagePattern(name, binding) {
    if (!binding) {
      return { references: 0, patterns: [] };
    }
    
    const usages = binding.referencePaths.map(refPath => {
      const parent = refPath.parent;
      
      if (parent.type === 'CallExpression' && parent.callee === refPath.node) {
        return `Called with ${parent.arguments.length} arguments`;
      }
      if (parent.type === 'MemberExpression' && parent.object === refPath.node) {
        return `Property access: .${parent.property.name || '[computed]'}`;
      }
      if (parent.type === 'AssignmentExpression') {
        return 'Reassigned';
      }
      
      return 'Referenced';
    });
    
    return {
      references: binding.referencePaths.length,
      patterns: [...new Set(usages)]
    };
  }

  analyzeRelationships(name, binding, allReferences) {
    const relationships = {
      calls: [],
      calledBy: [],
      relatedVars: []
    };
    
    if (binding) {
      binding.referencePaths.forEach(refPath => {
        const parent = refPath.parent;
        
        // What this function calls
        if (parent.type === 'CallExpression' && parent.callee === refPath.node) {
          parent.arguments.forEach(arg => {
            if (arg.type === 'Identifier') {
              relationships.relatedVars.push(arg.name);
            }
          });
        }
        
        // Extract function calls from the same scope
        try {
          const scopeCode = generator(refPath.getFunctionParent()?.node || refPath.scope.path.node, { compact: true }).code;
          const functionCalls = scopeCode.match(/(\w+)\(/g) || [];
          relationships.calls.push(...functionCalls.map(call => call.replace('(', '')));
        } catch (error) {
          // Ignore extraction errors
        }
      });
    }
    
    return {
      calls: [...new Set(relationships.calls)].slice(0, 5),
      calledBy: [...new Set(relationships.calledBy)].slice(0, 3),
      relatedVars: [...new Set(relationships.relatedVars)].slice(0, 5)
    };
  }

  analyzeDataFlow(path) {
    const node = path.node;
    
    if (node.type === 'VariableDeclarator' && node.init) {
      const init = node.init;
      
      if (init.type === 'CallExpression') {
        const callee = init.callee;
        if (callee.type === 'Identifier') {
          return {
            type: 'function_result',
            description: `Result of calling ${callee.name}()`
          };
        }
        return {
          type: 'function_result', 
          description: 'Result of function call'
        };
      }
      
      if (init.type === 'ObjectExpression') {
        return {
          type: 'object_literal',
          description: `Object with ${init.properties.length} properties`
        };
      }
      
      if (init.type === 'ArrayExpression') {
        return {
          type: 'array_literal',
          description: `Array with ${init.elements.length} elements`
        };
      }
      
      if (init.type === 'FunctionExpression' || init.type === 'ArrowFunctionExpression') {
        return {
          type: 'function_definition',
          description: `Function with ${init.params.length} parameters`
        };
      }
      
      if (init.type === 'Literal') {
        return {
          type: 'literal_value',
          description: `Literal ${typeof init.value}: ${init.value}`
        };
      }
      
      if (init.type === 'MemberExpression') {
        try {
          const memberCode = generator(init, { compact: true }).code;
          return {
            type: 'property_access',
            description: `Property access: ${memberCode}`
          };
        } catch (error) {
          return {
            type: 'property_access',
            description: 'Property access'
          };
        }
      }
    }
    
    return {
      type: 'unknown',
      description: 'Unknown data flow'
    };
  }

  extractSemanticHints(path) {
    const hints = [];
    const code = this.getDefinition(path).toLowerCase();
    
    if (code.includes('require')) hints.push('module_import');
    if (code.includes('object.create')) hints.push('object_creation');
    if (code.includes('defineproperty')) hints.push('property_definition');
    if (code.includes('prototype')) hints.push('prototype_operation');
    if (code.includes('fs')) hints.push('file_system');
    if (code.includes('process')) hints.push('process_operation');
    if (code.includes('console')) hints.push('logging');
    if (code.includes('error')) hints.push('error_handling');
    if (code.includes('async') || code.includes('await')) hints.push('async_operation');
    
    return hints;
  }

  getScopeContext(path) {
    const scope = path.scope;
    const functionParent = path.getFunctionParent();
    
    return {
      level: scope.path.type,
      bindings: Object.keys(scope.bindings || {}).length,
      functionName: functionParent?.node.id?.name || 'anonymous',
      isGlobal: scope.path.isProgram()
    };
  }

  getIdentifierType(path) {
    const node = path.node;
    if (node.type === 'FunctionDeclaration') return 'function';
    if (node.type === 'VariableDeclarator') return 'variable';
    return 'identifier';
  }

  categorizeUsage(path) {
    const parent = path.parent;
    if (parent.type === 'CallExpression' && parent.callee === path.node) return 'function_call';
    if (parent.type === 'MemberExpression') return 'property_access';
    if (parent.type === 'AssignmentExpression') return 'assignment';
    return 'reference';
  }

  generateEnhancedPrompt(identifiers, projectDescription) {
    const existingNamesContext = this.existingNames.length > 0 ? 
      `\nEXISTING NAMES IN CODEBASE: ${this.existingNames.slice(0, 15).join(', ')}...\n` : '';

    const prompt = `You are an expert JavaScript developer helping to humanize minified code for a ${projectDescription}.

Your task is to generate meaningful, descriptive names that immediately convey purpose and fit the project context.
${existingNamesContext}
IDENTIFIERS TO RENAME:

${identifiers.map((id, index) => {
  return `${index + 1}. IDENTIFIER: "${id.name}" (${id.type})

   DEFINITION:
   ${id.definition}
   
   DATA FLOW: ${id.dataFlow.description}
   
   USAGE ANALYSIS (${id.usage.references} total references):
   ${id.usage.patterns.map(pattern => `   - ${pattern}`).join('\n')}
   
   FUNCTION IMPLEMENTATION:
   ${id.functionBody || 'Not a function / body not available'}
   
   RELATIONSHIPS:
   - Calls functions: ${id.relationships.calls.slice(0, 3).join(', ') || 'none detected'}
   - Works with variables: ${id.relationships.relatedVars.slice(0, 3).join(', ') || 'none detected'}
   
   SEMANTIC CONTEXT:
   - Detected patterns: ${id.semanticHints.join(', ') || 'none'}
   - Scope: ${id.scopeContext.level} (${id.scopeContext.bindings} bindings)
   - Function context: ${id.scopeContext.functionName}
   
   SUGGESTED NAME: ?`;
}).join('\n\n')}

NAMING STRATEGY:
1. CONTEXT-DRIVEN: Base name on HOW it's used, not just WHAT it is
2. PROJECT-AWARE: Consider this is ${projectDescription}
3. RELATIONSHIP-AWARE: Consider its role relative to other functions/variables
4. SEMANTIC CLARITY: Name should be immediately understandable
5. CONSISTENCY: Follow patterns from existing names

QUALITY EXAMPLES:
✅ parseCliArguments (processes command line arguments)
✅ validateConfigSchema (validates configuration object structure)  
✅ generateOutputReport (creates and formats output reports)
✅ handleFileSystemError (manages file system operation errors)

❌ AVOID: dataProcessor, handlerFunction, utilityMethod, configObject

Focus on the SPECIFIC PURPOSE within the ${projectDescription} context.

Respond with ONLY the names, one per line:
1. specificDescriptiveName1
2. specificDescriptiveName2
...`;

    return prompt;
  }
}

async function main() {
  const demo = new EnhancedPromptDemo();
  const inputFile = process.argv[2] || 'chunks/chunk_0001.js';
  const projectDesc = process.argv[3] || 'JavaScript CLI tool for code analysis and humanification';
  
  await demo.demoEnhancedPrompt(inputFile, projectDesc);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = EnhancedPromptDemo;