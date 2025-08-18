#!/usr/bin/env node
/**
 * Semantic Context Analyzer - Enhanced version for meaningful naming
 * Extracts rich contextual information to generate truly human-readable names
 */

const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

class SemanticContextAnalyzer {
  constructor() {
    this.contextCache = new Map();
    this.patterns = this.initializePatterns();
  }

  /**
   * Initialize semantic patterns for common code constructs
   */
  initializePatterns() {
    return {
      // API and library patterns
      fileSystem: /\b(fs|readFile|writeFile|mkdir|rmdir|stat|exists)\b/i,
      network: /\b(http|https|fetch|request|axios|url|socket)\b/i,
      cli: /\b(process\.argv|commander|yargs|inquirer|chalk|ora)\b/i,
      crypto: /\b(crypto|hash|encrypt|decrypt|sign|verify)\b/i,
      
      // Control flow patterns
      errorHandling: /\b(try|catch|throw|error|err)\b/i,
      async: /\b(async|await|promise|then|catch)\b/i,
      loop: /\b(for|while|forEach|map|filter|reduce)\b/i,
      
      // Data patterns
      array: /\b(push|pop|shift|unshift|slice|splice|length)\b/i,
      object: /\b(keys|values|entries|assign|merge)\b/i,
      string: /\b(split|join|replace|match|trim|substring)\b/i,
      
      // Common operations
      config: /\b(config|settings|options|env|NODE_ENV)\b/i,
      logger: /\b(console|log|debug|info|warn|error|trace)\b/i,
      validator: /\b(validate|check|test|match|verify)\b/i,
      parser: /\b(parse|stringify|JSON|xml|yaml)\b/i,
      
      // UI/Terminal patterns
      terminal: /\b(tty|stdout|stderr|stdin|write|cursor)\b/i,
      spinner: /\b(spinner|loading|progress|bar)\b/i,
      color: /\b(color|chalk|red|green|blue|yellow|bold|dim)\b/i
    };
  }

  /**
   * Analyze identifier and extract comprehensive semantic context
   */
  analyzeIdentifierContext(identifier, astPath) {
    const cacheKey = `${identifier.name}-${astPath.node.start}`;
    if (this.contextCache.has(cacheKey)) {
      return this.contextCache.get(cacheKey);
    }

    const context = {
      identifier,
      astPath,
      codeContext: this.extractCodeContext(astPath),
      semanticHints: this.extractSemanticHints(astPath),
      usagePattern: this.analyzeUsagePattern(astPath),
      relationshipContext: this.extractRelationshipContext(astPath),
      purposeInference: this.inferPurpose(astPath)
    };

    this.contextCache.set(cacheKey, context);
    return context;
  }

  /**
   * Extract broader code context around the identifier
   */
  extractCodeContext(astPath) {
    const context = {
      immediate: this.getImmediateContext(astPath),
      parent: this.getParentContext(astPath),
      siblings: this.getSiblingContext(astPath),
      functionBody: this.getFunctionBodyContext(astPath)
    };

    return context;
  }

  /**
   * Get immediate surrounding code (assignment, call expression, etc.)
   */
  getImmediateContext(astPath) {
    try {
      const parent = astPath.parent;
      
      // Variable assignment context
      if (parent.type === 'VariableDeclarator' && parent.init) {
        const initCode = generator(parent.init, { compact: true }).code;
        return {
          type: 'assignment',
          value: this.cleanCode(initCode),
          pattern: this.categorizeAssignment(parent.init)
        };
      }
      
      // Function call context
      if (parent.type === 'CallExpression') {
        const calleeCode = parent.callee ? generator(parent.callee, { compact: true }).code : '';
        return {
          type: 'call',
          callee: this.cleanCode(calleeCode),
          argumentIndex: parent.arguments?.indexOf(astPath.node) || -1
        };
      }
      
      // Object property context
      if (parent.type === 'Property') {
        const keyName = parent.key?.name || 'unknown';
        return {
          type: 'property',
          key: keyName,
          isMethod: parent.method
        };
      }
      
      return { type: 'other', code: this.getNodeCode(parent, 100) };
    } catch (error) {
      return { type: 'error', message: error.message };
    }
  }

  /**
   * Get parent function or block context
   */
  getParentContext(astPath) {
    try {
      // Find parent function
      let functionParent = astPath.getFunctionParent();
      if (functionParent) {
        const funcNode = functionParent.node;
        const funcName = funcNode.id?.name || 'anonymous';
        const isAsync = funcNode.async;
        const isArrow = funcNode.type === 'ArrowFunctionExpression';
        
        return {
          type: 'function',
          name: funcName,
          async: isAsync,
          arrow: isArrow,
          paramCount: funcNode.params?.length || 0
        };
      }
      
      // Find parent block
      let blockParent = astPath.findParent(p => 
        p.isBlockStatement() || p.isProgram()
      );
      
      if (blockParent) {
        return {
          type: 'block',
          statementCount: blockParent.node.body?.length || 0
        };
      }
      
      return { type: 'global' };
    } catch (error) {
      return { type: 'error', message: error.message };
    }
  }

  /**
   * Get sibling variables and functions for context
   */
  getSiblingContext(astPath) {
    try {
      const scope = astPath.scope;
      const bindings = Object.keys(scope.bindings || {});
      
      return {
        siblingCount: bindings.length,
        siblings: bindings.slice(0, 5), // First 5 siblings for context
        hasThis: scope.hasBinding('this'),
        hasArguments: scope.hasBinding('arguments')
      };
    } catch (error) {
      return { siblings: [] };
    }
  }

  /**
   * Get the function body where this identifier is used
   */
  getFunctionBodyContext(astPath) {
    try {
      const functionParent = astPath.getFunctionParent();
      if (!functionParent || !functionParent.node.body) {
        return null;
      }
      
      const bodyCode = generator(functionParent.node.body, { compact: true }).code;
      const summary = this.summarizeFunctionBody(bodyCode);
      
      return {
        length: bodyCode.length,
        summary,
        hasReturn: /return\s/.test(bodyCode),
        hasError: /throw|catch|error/i.test(bodyCode),
        hasAsync: /await\s/.test(bodyCode)
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Extract semantic hints from code patterns
   */
  extractSemanticHints(astPath) {
    const hints = [];
    
    try {
      // Get broader code context to analyze
      const codeToAnalyze = this.getExpandedCode(astPath, 300);
      
      // Check against all patterns
      for (const [category, pattern] of Object.entries(this.patterns)) {
        if (pattern.test(codeToAnalyze)) {
          hints.push(category);
        }
      }
      
      // Additional specific hints
      if (/require\s*\(/i.test(codeToAnalyze)) hints.push('module');
      if (/\.prototype\./i.test(codeToAnalyze)) hints.push('prototype');
      if (/new\s+/i.test(codeToAnalyze)) hints.push('constructor');
      if (/export|module\.exports/i.test(codeToAnalyze)) hints.push('export');
      
    } catch (error) {
      // Ignore errors in hint extraction
    }
    
    return hints;
  }

  /**
   * Analyze how the identifier is used
   */
  analyzeUsagePattern(astPath) {
    try {
      const binding = astPath.scope.getBinding(astPath.node.name);
      if (!binding) return { type: 'unknown' };
      
      const references = binding.referencePaths || [];
      const usages = references.map(ref => {
        const parent = ref.parent;
        if (parent.type === 'CallExpression' && parent.callee === ref.node) {
          return 'called';
        }
        if (parent.type === 'MemberExpression' && parent.object === ref.node) {
          return 'memberAccess';
        }
        if (parent.type === 'AssignmentExpression' && parent.left === ref.node) {
          return 'assigned';
        }
        return 'referenced';
      });
      
      return {
        type: 'usage',
        count: references.length,
        patterns: [...new Set(usages)],
        mostCommon: this.getMostCommonUsage(usages)
      };
    } catch (error) {
      return { type: 'error' };
    }
  }

  /**
   * Extract relationships to other identifiers
   */
  extractRelationshipContext(astPath) {
    try {
      const relationships = {
        dependencies: [],
        dependents: [],
        siblings: []
      };
      
      // Find what this identifier depends on
      const binding = astPath.scope.getBinding(astPath.node.name);
      if (binding && binding.path.isVariableDeclarator() && binding.path.node.init) {
        const initCode = generator(binding.path.node.init, { compact: true }).code;
        const deps = this.extractIdentifiersFromCode(initCode);
        relationships.dependencies = deps.slice(0, 3); // Top 3 dependencies
      }
      
      return relationships;
    } catch (error) {
      return { dependencies: [], dependents: [], siblings: [] };
    }
  }

  /**
   * Infer the purpose of this identifier based on all context
   */
  inferPurpose(astPath) {
    try {
      const node = astPath.node;
      const parent = astPath.parent;
      
      // Function purposes
      if (parent.type === 'FunctionDeclaration' || 
          (parent.type === 'VariableDeclarator' && 
           (parent.init?.type === 'FunctionExpression' || parent.init?.type === 'ArrowFunctionExpression'))) {
        
        const func = parent.type === 'FunctionDeclaration' ? parent : parent.init;
        const bodyCode = func.body ? generator(func.body, { compact: true }).code : '';
        
        return {
          type: 'function',
          purpose: this.inferFunctionPurpose(bodyCode),
          async: func.async,
          paramCount: func.params?.length || 0
        };
      }
      
      // Variable purposes
      if (parent.type === 'VariableDeclarator' && parent.init) {
        const initType = parent.init.type;
        const initCode = generator(parent.init, { compact: true }).code;
        
        return {
          type: 'variable',
          purpose: this.inferVariablePurpose(initType, initCode),
          dataType: this.inferDataType(parent.init)
        };
      }
      
      return { type: 'unknown' };
    } catch (error) {
      return { type: 'error', message: error.message };
    }
  }

  /**
   * Generate a meaningful name based on comprehensive context
   */
  generateMeaningfulName(identifier, context) {
    try {
      const { codeContext, semanticHints, usagePattern, purposeInference } = context;
      
      // Start with base semantic category
      let baseName = this.getSemanticBaseName(semanticHints, purposeInference);
      
      // Enhance with specific context
      if (purposeInference.type === 'function') {
        baseName = this.enhanceFunctionName(baseName, purposeInference, codeContext);
      } else if (purposeInference.type === 'variable') {
        baseName = this.enhanceVariableName(baseName, purposeInference, codeContext);
      }
      
      // Apply usage pattern modifiers
      if (usagePattern.mostCommon === 'called') {
        baseName = baseName.startsWith('handle') ? baseName : `handle${this.capitalize(baseName)}`;
      }
      
      // Ensure it's a valid identifier
      baseName = this.sanitizeIdentifier(baseName);
      
      return baseName || `enhanced${identifier.name.toUpperCase()}`;
      
    } catch (error) {
      return `error${identifier.name.toUpperCase()}`;
    }
  }

  /**
   * Get semantic base name from hints and purpose
   */
  getSemanticBaseName(hints, purpose) {
    // Priority order for semantic categories
    const priorities = [
      'fileSystem', 'network', 'cli', 'crypto',
      'errorHandling', 'async', 'config', 'logger',
      'validator', 'parser', 'terminal', 'spinner'
    ];
    
    for (const category of priorities) {
      if (hints.includes(category)) {
        return this.getCategoryBaseName(category, purpose);
      }
    }
    
    // Default based on purpose
    if (purpose.type === 'function') {
      if (purpose.async) return 'asyncHandler';
      return 'handler';
    } else if (purpose.type === 'variable') {
      if (purpose.dataType === 'string') return 'textValue';
      if (purpose.dataType === 'number') return 'numValue';
      if (purpose.dataType === 'object') return 'config';
      if (purpose.dataType === 'array') return 'items';
      return 'value';
    }
    
    return 'identifier';
  }

  /**
   * Get base name for semantic category
   */
  getCategoryBaseName(category, purpose) {
    const categoryNames = {
      fileSystem: purpose.type === 'function' ? 'fileOperation' : 'filePath',
      network: purpose.type === 'function' ? 'networkCall' : 'networkConfig',
      cli: purpose.type === 'function' ? 'cliCommand' : 'cliOption',
      crypto: purpose.type === 'function' ? 'cryptoOperation' : 'cryptoKey',
      errorHandling: purpose.type === 'function' ? 'errorHandler' : 'errorInfo',
      async: purpose.type === 'function' ? 'asyncOperation' : 'promiseValue',
      config: purpose.type === 'function' ? 'configLoader' : 'configValue',
      logger: purpose.type === 'function' ? 'logFunction' : 'logLevel',
      validator: purpose.type === 'function' ? 'validator' : 'validationRule',
      parser: purpose.type === 'function' ? 'parser' : 'parsedData',
      terminal: purpose.type === 'function' ? 'terminalWrite' : 'terminalState',
      spinner: purpose.type === 'function' ? 'showSpinner' : 'spinnerConfig'
    };
    
    return categoryNames[category] || 'handler';
  }

  /**
   * Enhance function names with specific context
   */
  enhanceFunctionName(baseName, purpose, codeContext) {
    if (codeContext.functionBody) {
      const { summary } = codeContext.functionBody;
      if (summary.includes('return')) baseName = baseName.replace('handler', 'getter');
      if (summary.includes('write') || summary.includes('set')) baseName = baseName.replace('handler', 'setter');
      if (summary.includes('process') || summary.includes('transform')) baseName = baseName.replace('handler', 'processor');
    }
    
    if (purpose.async) {
      baseName = baseName.includes('async') ? baseName : `async${this.capitalize(baseName)}`;
    }
    
    return baseName;
  }

  /**
   * Enhance variable names with specific context
   */
  enhanceVariableName(baseName, purpose, codeContext) {
    if (codeContext.immediate?.type === 'assignment') {
      const { pattern } = codeContext.immediate;
      if (pattern === 'require') return baseName.replace('value', 'Module');
      if (pattern === 'function') return baseName.replace('value', 'Function');
      if (pattern === 'object') return baseName.replace('value', 'Config');
      if (pattern === 'array') return baseName.replace('value', 'List');
    }
    
    return baseName;
  }

  // Helper methods
  cleanCode(code) {
    return code.replace(/\s+/g, ' ').trim().substring(0, 100);
  }

  getNodeCode(node, maxLength = 50) {
    try {
      const code = generator(node, { compact: true }).code;
      return code.length > maxLength ? code.substring(0, maxLength) + '...' : code;
    } catch (error) {
      return 'unknown';
    }
  }

  getExpandedCode(astPath, maxLength = 200) {
    try {
      // Get code from parent block or function
      let parent = astPath.findParent(p => p.isBlockStatement() || p.isFunctionDeclaration());
      if (!parent) parent = astPath.findParent(p => p.isProgram());
      
      const code = generator(parent.node, { compact: true }).code;
      return code.length > maxLength ? code.substring(0, maxLength) + '...' : code;
    } catch (error) {
      return '';
    }
  }

  categorizeAssignment(initNode) {
    if (!initNode) return 'unknown';
    
    switch (initNode.type) {
      case 'CallExpression':
        if (initNode.callee?.name === 'require') return 'require';
        return 'call';
      case 'FunctionExpression':
      case 'ArrowFunctionExpression':
        return 'function';
      case 'ObjectExpression':
        return 'object';
      case 'ArrayExpression':
        return 'array';
      case 'Literal':
        return typeof initNode.value;
      default:
        return 'expression';
    }
  }

  summarizeFunctionBody(bodyCode) {
    const operations = [];
    if (/return\s/.test(bodyCode)) operations.push('return');
    if (/console\.|log/i.test(bodyCode)) operations.push('log');
    if (/throw|error/i.test(bodyCode)) operations.push('error');
    if (/if\s*\(/.test(bodyCode)) operations.push('conditional');
    if (/for|while|forEach/i.test(bodyCode)) operations.push('loop');
    if (/await\s/.test(bodyCode)) operations.push('await');
    
    return operations.join(',') || 'simple';
  }

  getMostCommonUsage(usages) {
    const counts = {};
    usages.forEach(usage => counts[usage] = (counts[usage] || 0) + 1);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, 'referenced');
  }

  extractIdentifiersFromCode(code) {
    const identifiers = [];
    const matches = code.match(/\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g) || [];
    return [...new Set(matches)].slice(0, 5);
  }

  inferFunctionPurpose(bodyCode) {
    if (/return\s/.test(bodyCode)) return 'getter';
    if (/write|set|assign/i.test(bodyCode)) return 'setter';
    if (/process|transform|convert/i.test(bodyCode)) return 'processor';
    if (/validate|check|test/i.test(bodyCode)) return 'validator';
    if (/init|setup|create/i.test(bodyCode)) return 'initializer';
    if (/handle|catch|error/i.test(bodyCode)) return 'handler';
    return 'operation';
  }

  inferVariablePurpose(initType, initCode) {
    if (initType === 'CallExpression' && /require/.test(initCode)) return 'module';
    if (initType === 'ObjectExpression') return 'config';
    if (initType === 'ArrayExpression') return 'collection';
    if (initType === 'FunctionExpression') return 'callback';
    if (/process\.env|config/i.test(initCode)) return 'setting';
    return 'data';
  }

  inferDataType(initNode) {
    if (!initNode) return 'unknown';
    
    switch (initNode.type) {
      case 'Literal':
        return typeof initNode.value;
      case 'ArrayExpression':
        return 'array';
      case 'ObjectExpression':
        return 'object';
      case 'FunctionExpression':
      case 'ArrowFunctionExpression':
        return 'function';
      case 'CallExpression':
        return 'result';
      default:
        return 'value';
    }
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  sanitizeIdentifier(name) {
    // Ensure valid JavaScript identifier
    name = name.replace(/[^a-zA-Z0-9_$]/g, '');
    if (!/^[a-zA-Z_$]/.test(name)) {
      name = '_' + name;
    }
    return name;
  }
}

module.exports = SemanticContextAnalyzer;