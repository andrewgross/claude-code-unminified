/**
 * AST-based Semantic Analyzer for intelligent variable naming
 * Uses Babel's AST to understand code context and purpose
 */

const t = require('@babel/types');

class ASTSemanticAnalyzer {
  constructor() {
    this.modulePatterns = new Map();
    this.functionPatterns = new Map();
    this.variablePatterns = new Map();
  }

  /**
   * Analyze an identifier based on its AST context
   */
  analyzeIdentifier(identifier, path) {
    const { name, type } = identifier;
    
    // Get comprehensive AST context
    const astContext = this.extractASTContext(path);
    
    // Analyze based on identifier type and AST structure
    switch (type) {
      case 'function':
        return this.analyzeFunctionIdentifier(name, path, astContext);
      case 'variable':
        return this.analyzeVariableIdentifier(name, path, astContext);
      case 'parameter':
        return this.analyzeParameterIdentifier(name, path, astContext);
      default:
        return this.generateGenericName(name, type);
    }
  }

  /**
   * Extract rich AST context for an identifier
   */
  extractASTContext(path) {
    const context = {
      // Node types in the path hierarchy
      nodeTypes: this.getNodeTypeHierarchy(path),
      
      // Parent and ancestor information
      parent: path.parent,
      parentType: path.parent?.type,
      
      // Binding information
      binding: path.scope.getBinding(path.node.name || path.node.id?.name),
      
      // Usage patterns
      references: [],
      
      // Value analysis (for variables)
      initializer: null,
      
      // Function analysis (for functions)
      params: [],
      body: null,
      
      // Call patterns (for functions)
      callSites: [],
      
      // Import/export context
      isImported: false,
      isExported: false,
      
      // Module context
      moduleInfo: null
    };

    // Enhance with binding analysis
    if (context.binding) {
      context.references = context.binding.referencePaths || [];
      context.isImported = context.binding.kind === 'module';
      
      // Analyze references to understand usage patterns
      context.usagePatterns = this.analyzeUsagePatterns(context.references);
    }

    // Analyze initializer for variables
    if (path.node.init || path.node.value) {
      context.initializer = path.node.init || path.node.value;
      context.initializerType = context.initializer?.type;
      context.initializerAnalysis = this.analyzeInitializer(context.initializer);
    }

    // Analyze function body for functions
    if (t.isFunction(path.node)) {
      context.params = path.node.params;
      context.body = path.node.body;
      context.functionAnalysis = this.analyzeFunctionBody(path.node.body);
    }

    return context;
  }

  /**
   * Get the hierarchy of node types from root to current node
   */
  getNodeTypeHierarchy(path) {
    const hierarchy = [];
    let current = path;
    
    while (current) {
      hierarchy.unshift(current.node.type);
      current = current.parentPath;
    }
    
    return hierarchy;
  }

  /**
   * Analyze usage patterns of an identifier
   */
  analyzeUsagePatterns(references) {
    const patterns = {
      isCalledAsFunction: false,
      isAccessedAsProperty: false,
      isPassedAsArgument: false,
      isReturnValue: false,
      isInConditional: false,
      isInLoop: false,
      callCount: 0,
      propertyAccesses: new Set(),
      argumentPositions: []
    };

    references.forEach(ref => {
      const parent = ref.parent;
      
      // Function call analysis
      if (t.isCallExpression(parent) && parent.callee === ref.node) {
        patterns.isCalledAsFunction = true;
        patterns.callCount++;
      }
      
      // Property access analysis
      if (t.isMemberExpression(parent) && parent.object === ref.node) {
        patterns.isAccessedAsProperty = true;
        if (t.isIdentifier(parent.property)) {
          patterns.propertyAccesses.add(parent.property.name);
        }
      }
      
      // Argument analysis
      if (t.isCallExpression(parent) && parent.arguments.includes(ref.node)) {
        patterns.isPassedAsArgument = true;
        patterns.argumentPositions.push(parent.arguments.indexOf(ref.node));
      }
      
      // Return analysis
      if (t.isReturnStatement(parent)) {
        patterns.isReturnValue = true;
      }
      
      // Control flow analysis
      if (this.isInConditional(ref)) {
        patterns.isInConditional = true;
      }
      
      if (this.isInLoop(ref)) {
        patterns.isInLoop = true;
      }
    });

    return patterns;
  }

  /**
   * Analyze the initializer of a variable
   */
  analyzeInitializer(init) {
    if (!init) return null;

    const analysis = {
      type: init.type,
      isLiteral: t.isLiteral(init),
      isFunction: t.isFunction(init),
      isCallExpression: t.isCallExpression(init),
      isObjectExpression: t.isObjectExpression(init),
      isArrayExpression: t.isArrayExpression(init),
      
      // For call expressions, analyze the callee
      callee: null,
      calleeAnalysis: null,
      
      // For object expressions, analyze properties
      objectProperties: [],
      
      // For literals, get the value
      literalValue: null
    };

    if (t.isCallExpression(init)) {
      analysis.callee = init.callee;
      analysis.calleeAnalysis = this.analyzeCallee(init.callee);
    }

    if (t.isObjectExpression(init)) {
      analysis.objectProperties = init.properties.map(prop => ({
        key: prop.key?.name || prop.key?.value,
        value: prop.value,
        computed: prop.computed
      }));
    }

    if (t.isLiteral(init)) {
      analysis.literalValue = init.value;
    }

    return analysis;
  }

  /**
   * Analyze a function call callee
   */
  analyzeCallee(callee) {
    if (!callee) return null;

    if (t.isIdentifier(callee)) {
      return {
        type: 'identifier',
        name: callee.name,
        isRequire: callee.name === 'require' || callee.name.includes('require'),
        isImport: callee.name.includes('import'),
        isNodeBuiltin: this.isNodeBuiltin(callee.name)
      };
    }

    if (t.isMemberExpression(callee)) {
      return {
        type: 'member',
        object: callee.object?.name,
        property: callee.property?.name,
        isObjectMethod: true,
        isNodeBuiltin: this.isNodeBuiltin(callee.object?.name)
      };
    }

    return { type: callee.type };
  }

  /**
   * Analyze function body to understand purpose
   */
  analyzeFunctionBody(body) {
    if (!body) return null;

    const analysis = {
      statementCount: 0,
      hasReturn: false,
      hasThrow: false,
      hasLoop: false,
      hasConditional: false,
      hasAsyncAwait: false,
      
      // API usage patterns
      usesFileSystem: false,
      usesNetwork: false,
      usesProcess: false,
      usesCrypto: false,
      usesPath: false,
      
      // Common patterns
      isWrapper: false,
      isValidator: false,
      isTransformer: false,
      isFactory: false,
      
      keywordFrequency: new Map()
    };

    // Simple body analysis (would need full traversal for complete analysis)
    if (t.isBlockStatement(body)) {
      analysis.statementCount = body.body.length;
      
      // Quick scan for common patterns
      const bodyCode = body.body.toString();
      
      analysis.hasReturn = bodyCode.includes('return');
      analysis.hasThrow = bodyCode.includes('throw');
      analysis.hasLoop = bodyCode.includes('for') || bodyCode.includes('while');
      analysis.hasConditional = bodyCode.includes('if');
      
      // API detection
      analysis.usesFileSystem = bodyCode.includes('fs.') || bodyCode.includes('readFile') || bodyCode.includes('writeFile');
      analysis.usesNetwork = bodyCode.includes('http') || bodyCode.includes('fetch') || bodyCode.includes('request');
      analysis.usesProcess = bodyCode.includes('process.');
      analysis.usesCrypto = bodyCode.includes('crypto') || bodyCode.includes('hash');
      analysis.usesPath = bodyCode.includes('path.') || bodyCode.includes('join') || bodyCode.includes('resolve');
    }

    return analysis;
  }

  /**
   * Check if an identifier is a Node.js builtin
   */
  isNodeBuiltin(name) {
    const builtins = [
      'fs', 'path', 'http', 'https', 'crypto', 'os', 'util',
      'events', 'stream', 'buffer', 'process', 'child_process'
    ];
    return builtins.includes(name);
  }

  /**
   * Check if a reference is in a conditional statement
   */
  isInConditional(ref) {
    let current = ref.parentPath;
    while (current) {
      if (t.isIfStatement(current.node) || t.isConditionalExpression(current.node) || 
          t.isSwitchStatement(current.node)) {
        return true;
      }
      current = current.parentPath;
    }
    return false;
  }

  /**
   * Check if a reference is in a loop
   */
  isInLoop(ref) {
    let current = ref.parentPath;
    while (current) {
      if (t.isForStatement(current.node) || t.isWhileStatement(current.node) || 
          t.isForInStatement(current.node) || t.isForOfStatement(current.node)) {
        return true;
      }
      current = current.parentPath;
    }
    return false;
  }

  /**
   * Analyze function identifier based on AST context
   */
  analyzeFunctionIdentifier(name, path, astContext) {
    const { functionAnalysis, usagePatterns, binding } = astContext;
    
    // Determine function purpose based on body analysis
    if (functionAnalysis) {
      // File system functions
      if (functionAnalysis.usesFileSystem) {
        if (name.includes('read') || functionAnalysis.hasReturn) {
          return `readFile${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
        }
        if (name.includes('write') || !functionAnalysis.hasReturn) {
          return `writeFile${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
        }
        return `fileSystem${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
      
      // Network functions
      if (functionAnalysis.usesNetwork) {
        return `network${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
      
      // Path functions
      if (functionAnalysis.usesPath) {
        return `pathUtil${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
      
      // Validator functions
      if (functionAnalysis.hasReturn && functionAnalysis.hasConditional && 
          !functionAnalysis.hasLoop) {
        return `validate${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
      
      // Transformer functions
      if (functionAnalysis.hasReturn && functionAnalysis.statementCount > 3) {
        return `transform${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
    }

    // Analyze usage patterns
    if (usagePatterns) {
      // Frequently called functions might be utilities
      if (usagePatterns.callCount > 3) {
        return `util${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
      
      // Functions used in conditionals might be checkers
      if (usagePatterns.isInConditional) {
        return `check${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
    }

    // Default function naming
    return `func${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
  }

  /**
   * Analyze variable identifier based on AST context
   */
  analyzeVariableIdentifier(name, path, astContext) {
    const { initializerAnalysis, usagePatterns, nodeTypes } = astContext;
    
    if (initializerAnalysis) {
      // Require/import analysis
      if (initializerAnalysis.isCallExpression && initializerAnalysis.calleeAnalysis) {
        const callee = initializerAnalysis.calleeAnalysis;
        
        if (callee.isRequire || callee.isImport) {
          // Try to extract module name from arguments
          const args = path.node.init?.arguments;
          if (args && args[0] && t.isStringLiteral(args[0])) {
            const moduleName = args[0].value;
            return this.getModuleName(moduleName);
          }
        }
        
        // Object method calls
        if (callee.isObjectMethod) {
          return `${callee.object || 'obj'}${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
        }
      }
      
      // Literal analysis
      if (initializerAnalysis.isLiteral) {
        const value = initializerAnalysis.literalValue;
        if (typeof value === 'string') {
          if (value.includes('/')) return `path${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
          if (value.includes('http')) return `url${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
          if (value.match(/^[A-Z_]+$/)) return `constant${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
        }
        if (typeof value === 'number') {
          return `num${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
        }
        if (typeof value === 'boolean') {
          return `flag${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
        }
      }
      
      // Function expressions
      if (initializerAnalysis.isFunction) {
        return `handler${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
      
      // Object expressions
      if (initializerAnalysis.isObjectExpression) {
        return `config${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
      
      // Array expressions
      if (initializerAnalysis.isArrayExpression) {
        return `list${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
    }

    // Usage pattern analysis
    if (usagePatterns) {
      if (usagePatterns.isCalledAsFunction) {
        return `func${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
      
      if (usagePatterns.isAccessedAsProperty) {
        const props = Array.from(usagePatterns.propertyAccesses);
        if (props.some(p => p.includes('read') || p.includes('write'))) {
          return `fileSystem${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
        }
        return `obj${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
    }

    // Default variable naming
    return `var${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
  }

  /**
   * Analyze parameter identifier based on AST context
   */
  analyzeParameterIdentifier(name, path, astContext) {
    const functionContext = this.findFunctionContext(path);
    
    if (functionContext) {
      // Check parameter position and function purpose
      const paramIndex = functionContext.params.indexOf(path.node);
      
      // Common parameter patterns
      if (paramIndex === 0) {
        // First parameter often data/input
        return `input${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
      
      if (paramIndex === functionContext.params.length - 1 && 
          functionContext.isAsync) {
        // Last parameter in async functions often callback
        return `callback${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
      }
    }

    return `param${name.replace(/[^a-zA-Z]/g, '').toUpperCase()}`;
  }

  /**
   * Find the containing function context
   */
  findFunctionContext(path) {
    let current = path.parentPath;
    while (current) {
      if (t.isFunction(current.node)) {
        return current.node;
      }
      current = current.parentPath;
    }
    return null;
  }

  /**
   * Generate semantic module name from require path
   */
  getModuleName(modulePath) {
    // Built-in modules
    const builtinMap = {
      'fs': 'fileSystem',
      'path': 'pathUtils',
      'http': 'httpModule',
      'https': 'httpsModule',
      'crypto': 'cryptoModule',
      'os': 'osModule',
      'util': 'utilModule',
      'events': 'eventsModule',
      'stream': 'streamModule',
      'child_process': 'childProcess',
      'node:fs': 'fileSystem',
      'node:path': 'pathUtils',
      'node:http': 'httpModule',
      'node:module': 'moduleUtils'
    };
    
    if (builtinMap[modulePath]) {
      return builtinMap[modulePath];
    }
    
    // Extract meaningful name from module path
    const parts = modulePath.split('/');
    const lastName = parts[parts.length - 1];
    const cleanName = lastName.replace(/[^a-zA-Z0-9]/g, '');
    
    return `${cleanName}Module`;
  }

  /**
   * Generate generic name as fallback
   */
  generateGenericName(name, type) {
    const clean = name.replace(/[^a-zA-Z]/g, '');
    const capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
    
    switch (type) {
      case 'function':
        return `func${capitalized}`;
      case 'variable':
        return `var${capitalized}`;
      case 'parameter':
        return `param${capitalized}`;
      default:
        return `renamed${capitalized}`;
    }
  }
}

module.exports = ASTSemanticAnalyzer;