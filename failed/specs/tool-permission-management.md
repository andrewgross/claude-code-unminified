# Tool & Permission Management Specification

## Overview
Claude Code implements a sophisticated tool and permission management system that controls access to system resources, external tools, and sensitive operations. The system provides granular permission control, interactive approval workflows, and comprehensive audit capabilities.

## Architecture

### Core Components
- **Tool Registry**: Centralized tool discovery and registration
- **Permission Engine**: Access control and validation system
- **Approval Workflow**: Interactive permission prompting system
- **Context Manager**: Tool execution context and isolation
- **Audit System**: Comprehensive logging and monitoring
- **Policy Manager**: Rule-based permission policies

### Permission Model
```javascript
{
    userId: string,
    toolName: string,
    context: {
        sessionId: string,
        projectPath: string,
        workingDirectory: string,
        gitInfo: object
    },
    permissions: {
        level: "allow" | "deny" | "prompt",
        constraints: object,
        expiration: timestamp,
        conditions: object[]
    }
}
```

## Tool Registry

### Tool Discovery
```javascript
class ToolRegistry {
    constructor() {
        this.tools = new Map();
        this.categories = new Map();
        this.aliases = new Map();
        this.metadata = new Map();
    }
    
    registerTool(toolDefinition) {
        // Register a new tool
        // Validate tool interface
        // Check for conflicts
        // Update metadata
        
        const tool = this.validateToolDefinition(toolDefinition);
        
        if (this.tools.has(tool.name)) {
            throw new Error(`Tool ${tool.name} already registered`);
        }
        
        this.tools.set(tool.name, tool);
        this.updateCategories(tool);
        this.registerAliases(tool);
        this.updateMetadata(tool);
        
        return tool;
    }
    
    validateToolDefinition(definition) {
        // Validate tool definition structure
        // Check required fields
        // Validate parameter schemas
        // Verify security properties
        
        const required = ['name', 'description', 'execute'];
        const missing = required.filter(field => !definition[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        
        // Validate parameter schema
        if (definition.parameters) {
            this.validateParameterSchema(definition.parameters);
        }
        
        // Security validation
        this.validateToolSecurity(definition);
        
        return {
            ...definition,
            id: this.generateToolId(definition.name),
            registeredAt: Date.now(),
            version: definition.version || '1.0.0'
        };
    }
    
    discoverTools(searchPaths) {
        // Discover tools from filesystem
        // Load tool definitions from files
        // Auto-register discovered tools
        // Handle loading errors gracefully
        
        const discovered = [];
        
        for (const searchPath of searchPaths) {
            const toolFiles = this.findToolFiles(searchPath);
            
            for (const toolFile of toolFiles) {
                try {
                    const toolDef = this.loadToolDefinition(toolFile);
                    const tool = this.registerTool(toolDef);
                    discovered.push(tool);
                } catch (error) {
                    console.warn(`Failed to load tool from ${toolFile}: ${error.message}`);
                }
            }
        }
        
        return discovered;
    }
}
```

### Tool Categories
```javascript
const toolCategories = {
    filesystem: {
        description: 'File system operations',
        tools: ['Read', 'Write', 'Delete', 'List', 'Move', 'Copy'],
        riskLevel: 'medium',
        defaultPermission: 'prompt'
    },
    network: {
        description: 'Network and internet operations',
        tools: ['HttpGet', 'HttpPost', 'WebSocket', 'Fetch'],
        riskLevel: 'high',
        defaultPermission: 'prompt'
    },
    execution: {
        description: 'Code and command execution',
        tools: ['Bash', 'Execute', 'Spawn', 'Eval'],
        riskLevel: 'critical',
        defaultPermission: 'deny'
    },
    data: {
        description: 'Data processing and transformation',
        tools: ['Parse', 'Transform', 'Validate', 'Convert'],
        riskLevel: 'low',
        defaultPermission: 'allow'
    },
    ai: {
        description: 'AI and machine learning tools',
        tools: ['Analyze', 'Generate', 'Classify', 'Summarize'],
        riskLevel: 'low',
        defaultPermission: 'allow'
    }
};
```

## Permission Engine

### Permission Validation
```javascript
class PermissionEngine {
    async checkPermission(toolName, input, context) {
        // Check if tool usage is permitted
        // Evaluate permission policies
        // Apply contextual rules
        // Return permission decision
        
        const tool = this.toolRegistry.getTool(toolName);
        if (!tool) {
            throw new Error(`Unknown tool: ${toolName}`);
        }
        
        // Get applicable policies
        const policies = await this.getPoliciesForTool(toolName, context);
        
        // Evaluate each policy
        for (const policy of policies) {
            const result = await this.evaluatePolicy(policy, tool, input, context);
            
            if (result.decision !== 'continue') {
                return result;
            }
        }
        
        // Default permission handling
        return this.getDefaultPermission(tool, input, context);
    }
    
    evaluatePolicy(policy, tool, input, context) {
        // Evaluate a single permission policy
        // Check conditions and constraints
        // Apply business rules
        // Return policy decision
        
        const evaluation = {
            policyId: policy.id,
            decision: 'continue',
            reason: null,
            constraints: [],
            modifications: {}
        };
        
        // Check conditions
        if (policy.conditions) {
            for (const condition of policy.conditions) {
                if (!this.evaluateCondition(condition, tool, input, context)) {
                    evaluation.decision = policy.onConditionFail || 'deny';
                    evaluation.reason = `Condition failed: ${condition.description}`;
                    return evaluation;
                }
            }
        }
        
        // Apply constraints
        if (policy.constraints) {
            evaluation.constraints = this.applyConstraints(policy.constraints, input);
        }
        
        // Apply input modifications
        if (policy.modifications) {
            evaluation.modifications = this.applyModifications(policy.modifications, input);
        }
        
        evaluation.decision = policy.action || 'allow';
        return evaluation;
    }
    
    async getPoliciesForTool(toolName, context) {
        // Get all applicable policies for tool
        // Filter by context and scope
        // Order by priority
        
        const allPolicies = await this.policyManager.getAllPolicies();
        
        return allPolicies
            .filter(policy => this.isPolicyApplicable(policy, toolName, context))
            .sort((a, b) => (b.priority || 0) - (a.priority || 0));
    }
}
```

### Permission Policies
```javascript
class PolicyManager {
    createPolicy(policyDefinition) {
        // Create new permission policy
        // Validate policy structure
        // Check for policy conflicts
        // Store policy persistently
        
        const policy = {
            id: this.generatePolicyId(),
            name: policyDefinition.name,
            description: policyDefinition.description,
            scope: policyDefinition.scope || 'user',
            priority: policyDefinition.priority || 0,
            conditions: policyDefinition.conditions || [],
            constraints: policyDefinition.constraints || {},
            action: policyDefinition.action,
            createdAt: Date.now(),
            modifiedAt: Date.now()
        };
        
        this.validatePolicy(policy);
        this.storageManager.savePolicy(policy);
        
        return policy;
    }
    
    createAllowAllPolicy(toolName, scope = 'session') {
        // Create policy to allow all uses of a tool
        // Useful for trusted operations
        // Can be temporary or permanent
        
        return this.createPolicy({
            name: `Allow All ${toolName}`,
            description: `Allow all uses of ${toolName} without prompting`,
            scope: scope,
            conditions: [
                { type: 'tool_name_equals', value: toolName }
            ],
            action: 'allow',
            priority: 100
        });
    }
    
    createRestrictivePolicy(toolName, constraints) {
        // Create restrictive policy for dangerous tools
        // Apply strict constraints
        // Require explicit approval
        
        return this.createPolicy({
            name: `Restrict ${toolName}`,
            description: `Restrictive policy for ${toolName}`,
            scope: 'global',
            conditions: [
                { type: 'tool_name_equals', value: toolName }
            ],
            constraints: constraints,
            action: 'prompt',
            priority: 200
        });
    }
}
```

## Interactive Approval System

### Permission Prompts
```javascript
class ApprovalWorkflow {
    async promptForPermission(toolName, input, context, reason) {
        // Display interactive permission prompt
        // Collect user decision
        // Handle approval options
        // Store decision for future use
        
        const promptData = {
            toolName: toolName,
            input: this.sanitizeInput(input),
            context: this.sanitizeContext(context),
            reason: reason,
            timestamp: Date.now(),
            options: this.getApprovalOptions(toolName, context)
        };
        
        const decision = await this.displayPrompt(promptData);
        
        // Store decision for future reference
        if (decision.remember) {
            await this.storeDecision(toolName, input, context, decision);
        }
        
        return decision;
    }
    
    displayPrompt(promptData) {
        // Display permission prompt UI
        // Handle different prompt types
        // Support keyboard shortcuts
        // Show relevant context
        
        return new Promise((resolve) => {
            const prompt = new PermissionPrompt({
                toolName: promptData.toolName,
                input: promptData.input,
                context: promptData.context,
                reason: promptData.reason,
                options: promptData.options,
                onDecision: resolve
            });
            
            prompt.show();
        });
    }
    
    getApprovalOptions(toolName, context) {
        // Get available approval options
        // Consider tool risk level
        // Apply context-specific options
        
        const baseOptions = [
            { id: 'allow_once', label: 'Allow this time', hotkey: 'y' },
            { id: 'deny_once', label: 'Deny this time', hotkey: 'n' },
            { id: 'allow_session', label: 'Allow for this session', hotkey: 's' },
            { id: 'deny_session', label: 'Deny for this session', hotkey: 'd' }
        ];
        
        const tool = this.toolRegistry.getTool(toolName);
        const riskLevel = this.getRiskLevel(tool);
        
        if (riskLevel === 'low') {
            baseOptions.push({
                id: 'allow_always',
                label: 'Always allow this tool',
                hotkey: 'a'
            });
        }
        
        if (context.projectPath) {
            baseOptions.push({
                id: 'allow_project',
                label: 'Allow for this project',
                hotkey: 'p'
            });
        }
        
        return baseOptions;
    }
}
```

### Decision Storage
```javascript
class DecisionStorage {
    async storeDecision(toolName, input, context, decision) {
        // Store user permission decisions
        // Create reusable policies
        // Handle decision scopes
        // Manage expiration
        
        const storedDecision = {
            id: this.generateDecisionId(),
            toolName: toolName,
            inputPattern: this.createInputPattern(input),
            contextPattern: this.createContextPattern(context),
            decision: decision.action,
            scope: decision.scope,
            createdAt: Date.now(),
            expiresAt: this.calculateExpiration(decision),
            usage: {
                count: 0,
                lastUsed: null
            }
        };
        
        await this.storage.storeDecision(storedDecision);
        
        // Create corresponding policy if needed
        if (this.shouldCreatePolicy(decision)) {
            await this.createPolicyFromDecision(storedDecision);
        }
        
        return storedDecision;
    }
    
    createInputPattern(input) {
        // Create pattern from input for future matching
        // Handle sensitive data appropriately
        // Support flexible matching
        
        const pattern = {};
        
        for (const [key, value] of Object.entries(input)) {
            if (this.isSensitiveField(key)) {
                // Don't store sensitive data in patterns
                pattern[key] = { type: 'sensitive', hasValue: !!value };
            } else if (typeof value === 'string' && value.length < 100) {
                pattern[key] = { type: 'exact', value: value };
            } else {
                pattern[key] = { type: 'exists', hasValue: !!value };
            }
        }
        
        return pattern;
    }
    
    async findMatchingDecision(toolName, input, context) {
        // Find existing decision that matches current request
        // Apply pattern matching
        // Check expiration
        // Return best match
        
        const decisions = await this.storage.getDecisionsForTool(toolName);
        
        for (const decision of decisions) {
            if (this.isExpired(decision)) {
                continue;
            }
            
            if (this.matchesPattern(input, decision.inputPattern) &&
                this.matchesContext(context, decision.contextPattern)) {
                
                // Update usage tracking
                await this.updateUsageTracking(decision.id);
                
                return decision;
            }
        }
        
        return null;
    }
}
```

## Tool Execution Context

### Execution Isolation
```javascript
class ToolExecutor {
    async executeTool(toolName, input, context, permissions) {
        // Execute tool with proper isolation
        // Apply permission constraints
        // Monitor execution
        // Handle failures gracefully
        
        const tool = this.toolRegistry.getTool(toolName);
        const executionId = this.generateExecutionId();
        
        // Create execution context
        const execContext = await this.createExecutionContext(tool, input, context, permissions);
        
        try {
            // Pre-execution hooks
            await this.runPreExecutionHooks(tool, input, execContext);
            
            // Execute tool with monitoring
            const result = await this.monitoredExecution(tool, input, execContext);
            
            // Post-execution hooks
            await this.runPostExecutionHooks(tool, input, result, execContext);
            
            // Audit logging
            await this.auditExecution(executionId, tool, input, result, 'success');
            
            return result;
            
        } catch (error) {
            // Error handling and logging
            await this.auditExecution(executionId, tool, input, error, 'error');
            throw error;
        } finally {
            // Cleanup
            await this.cleanupExecutionContext(execContext);
        }
    }
    
    createExecutionContext(tool, input, context, permissions) {
        // Create isolated execution environment
        // Apply security constraints
        // Set up monitoring
        // Configure resource limits
        
        const execContext = {
            id: this.generateContextId(),
            tool: tool,
            input: this.sanitizeInput(input),
            originalContext: context,
            permissions: permissions,
            constraints: this.buildConstraints(permissions),
            startTime: Date.now(),
            resources: {
                maxMemory: this.getMemoryLimit(tool),
                maxExecutionTime: this.getTimeLimit(tool),
                allowedPaths: this.getAllowedPaths(permissions),
                allowedNetworks: this.getAllowedNetworks(permissions)
            }
        };
        
        return execContext;
    }
    
    async monitoredExecution(tool, input, context) {
        // Execute tool with monitoring
        // Track resource usage
        // Enforce time limits
        // Handle cancellation
        
        const monitor = new ExecutionMonitor(context);
        
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                monitor.cancel();
                reject(new Error(`Tool execution timeout: ${tool.name}`));
            }, context.resources.maxExecutionTime);
            
            monitor.execute(tool, input)
                .then(result => {
                    clearTimeout(timeout);
                    resolve(result);
                })
                .catch(error => {
                    clearTimeout(timeout);
                    reject(error);
                });
        });
    }
}
```

### Resource Monitoring
```javascript
class ExecutionMonitor {
    constructor(context) {
        this.context = context;
        this.cancelled = false;
        this.resourceUsage = {
            memory: 0,
            cpu: 0,
            disk: 0,
            network: 0
        };
    }
    
    async execute(tool, input) {
        // Execute tool with resource monitoring
        // Track usage metrics
        // Enforce limits
        // Handle resource exhaustion
        
        this.startMonitoring();
        
        try {
            const result = await tool.execute(input, this.context);
            
            if (this.cancelled) {
                throw new Error('Tool execution was cancelled');
            }
            
            return result;
        } finally {
            this.stopMonitoring();
        }
    }
    
    startMonitoring() {
        // Start resource monitoring
        // Set up periodic checks
        // Monitor process stats
        
        this.monitoringInterval = setInterval(() => {
            this.checkResourceUsage();
        }, 1000); // Check every second
    }
    
    checkResourceUsage() {
        // Check current resource usage
        // Compare against limits
        // Take action if exceeded
        
        const usage = this.getCurrentUsage();
        this.resourceUsage = usage;
        
        if (usage.memory > this.context.resources.maxMemory) {
            this.cancel();
            throw new Error('Memory limit exceeded');
        }
        
        // Log resource usage for auditing
        this.logResourceUsage(usage);
    }
    
    cancel() {
        // Cancel tool execution
        // Clean up resources
        // Notify monitoring systems
        
        this.cancelled = true;
        this.stopMonitoring();
    }
}
```

## Audit and Compliance

### Audit Logging
```javascript
class AuditLogger {
    async logPermissionRequest(toolName, input, context, decision, user) {
        // Log permission request and decision
        // Include relevant context
        // Protect sensitive information
        // Ensure audit integrity
        
        const auditEntry = {
            id: this.generateAuditId(),
            timestamp: Date.now(),
            type: 'permission_request',
            user: user,
            tool: toolName,
            input: this.sanitizeForAudit(input),
            context: this.sanitizeContext(context),
            decision: decision,
            sessionId: context.sessionId,
            projectPath: context.projectPath
        };
        
        await this.writeAuditEntry(auditEntry);
    }
    
    async logToolExecution(executionId, toolName, input, result, status, user) {
        // Log tool execution details
        // Include performance metrics
        // Record success/failure status
        // Track resource usage
        
        const auditEntry = {
            id: this.generateAuditId(),
            timestamp: Date.now(),
            type: 'tool_execution',
            executionId: executionId,
            user: user,
            tool: toolName,
            input: this.sanitizeForAudit(input),
            result: this.sanitizeResult(result),
            status: status,
            duration: this.calculateDuration(executionId),
            resourceUsage: this.getResourceUsage(executionId)
        };
        
        await this.writeAuditEntry(auditEntry);
    }
    
    sanitizeForAudit(data) {
        // Remove sensitive information from audit logs
        // Maintain audit value while protecting privacy
        // Handle different data types
        
        if (typeof data !== 'object' || data === null) {
            return data;
        }
        
        const sanitized = {};
        
        for (const [key, value] of Object.entries(data)) {
            if (this.isSensitiveField(key)) {
                sanitized[key] = '[REDACTED]';
            } else if (typeof value === 'object') {
                sanitized[key] = this.sanitizeForAudit(value);
            } else if (typeof value === 'string' && value.length > 1000) {
                sanitized[key] = value.substring(0, 1000) + '... [TRUNCATED]';
            } else {
                sanitized[key] = value;
            }
        }
        
        return sanitized;
    }
}
```

### Compliance Reporting
```javascript
class ComplianceReporter {
    async generatePermissionReport(startDate, endDate, options = {}) {
        // Generate permission usage report
        // Include statistics and trends
        // Support different output formats
        // Filter by various criteria
        
        const auditEntries = await this.auditLogger.getEntriesInRange(
            startDate, 
            endDate, 
            { type: 'permission_request' }
        );
        
        const report = {
            period: { start: startDate, end: endDate },
            summary: this.generateSummary(auditEntries),
            toolUsage: this.analyzeToolUsage(auditEntries),
            userActivity: this.analyzeUserActivity(auditEntries),
            riskAnalysis: this.analyzeRisks(auditEntries),
            trends: this.identifyTrends(auditEntries),
            recommendations: this.generateRecommendations(auditEntries)
        };
        
        return this.formatReport(report, options.format || 'json');
    }
    
    analyzeRisks(auditEntries) {
        // Analyze risk patterns in tool usage
        // Identify potential security issues
        // Flag unusual activity
        // Provide risk scores
        
        const risks = {
            highRiskTools: this.identifyHighRiskUsage(auditEntries),
            unusualPatterns: this.detectUnusualPatterns(auditEntries),
            policyViolations: this.findPolicyViolations(auditEntries),
            riskScore: this.calculateOverallRiskScore(auditEntries)
        };
        
        return risks;
    }
    
    generateRecommendations(auditEntries) {
        // Generate recommendations based on usage patterns
        // Suggest policy improvements
        // Identify automation opportunities
        // Recommend security enhancements
        
        const recommendations = [];
        
        // Analyze frequently approved tools
        const frequentTools = this.getFrequentlyApprovedTools(auditEntries);
        for (const tool of frequentTools) {
            if (tool.approvalRate > 0.95) {
                recommendations.push({
                    type: 'auto_approve',
                    tool: tool.name,
                    reason: `Tool ${tool.name} is approved 95%+ of the time`,
                    suggestion: 'Consider creating an auto-approve policy'
                });
            }
        }
        
        // Analyze denied tools
        const deniedTools = this.getFrequentlyDeniedTools(auditEntries);
        for (const tool of deniedTools) {
            if (tool.denialRate > 0.8) {
                recommendations.push({
                    type: 'restrict',
                    tool: tool.name,
                    reason: `Tool ${tool.name} is denied 80%+ of the time`,
                    suggestion: 'Consider creating a restrictive policy'
                });
            }
        }
        
        return recommendations;
    }
}
```

This tool and permission management specification provides comprehensive coverage of Claude Code's security and access control systems, ensuring safe and auditable tool usage.