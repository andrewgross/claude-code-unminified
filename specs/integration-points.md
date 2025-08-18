# Integration Points Specification

## Overview
Claude Code provides extensive integration capabilities with external tools, services, and development environments. This specification details all integration points, APIs, protocols, and extensibility mechanisms that enable seamless workflow integration and third-party connectivity.

## Architecture

### Integration Categories
- **Development Environment Integration**: IDE plugins, editor extensions, workflow tools
- **Version Control Integration**: Git, GitHub, GitLab, and other VCS systems
- **CI/CD Integration**: Pipeline integration, automated testing, deployment hooks
- **API Integration**: External APIs, web services, and cloud platforms
- **Tool Integration**: Development tools, testing frameworks, and utilities
- **Desktop Integration**: Claude Desktop synchronization and shared configurations

### Integration Protocols
- **HTTP/HTTPS APIs**: RESTful API endpoints for external communication
- **WebSocket APIs**: Real-time bidirectional communication
- **MCP (Model Context Protocol)**: Standardized tool and service integration
- **File System Integration**: File watching, project analysis, and workspace detection
- **Process Integration**: CLI tool chaining, pipe support, and subprocess management

## API Specifications

### RESTful API Endpoints
```javascript
/**
 * Claude Code REST API for external integration
 */
class ClaudeCodeAPIServer {
    constructor(options = {}) {
        this.port = options.port || 8080;
        this.host = options.host || 'localhost';
        this.apiVersion = options.version || 'v1';
        this.authRequired = options.auth !== false;
        this.rateLimiter = new RateLimiter(options.rateLimit);
        this.router = new APIRouter();
        
        this.setupRoutes();
    }
    
    setupRoutes() {
        const api = this.router.group(`/api/${this.apiVersion}`);
        
        // Session Management
        api.post('/sessions', this.createSession);
        api.get('/sessions/:id', this.getSession);
        api.put('/sessions/:id', this.updateSession);
        api.delete('/sessions/:id', this.deleteSession);
        api.post('/sessions/:id/messages', this.addMessage);
        
        // Configuration
        api.get('/config', this.getConfiguration);
        api.put('/config', this.updateConfiguration);
        api.get('/config/:scope', this.getScopedConfiguration);
        
        // MCP Server Management
        api.get('/mcp/servers', this.listMCPServers);
        api.post('/mcp/servers', this.addMCPServer);
        api.get('/mcp/servers/:id', this.getMCPServer);
        api.put('/mcp/servers/:id', this.updateMCPServer);
        api.delete('/mcp/servers/:id', this.removeMCPServer);
        api.post('/mcp/servers/:id/tools/:tool/execute', this.executeTool);
        
        // Project Analysis
        api.post('/projects/analyze', this.analyzeProject);
        api.get('/projects/:id/structure', this.getProjectStructure);
        api.get('/projects/:id/files', this.getProjectFiles);
        
        // Health and Status
        api.get('/health', this.healthCheck);
        api.get('/status', this.getStatus);
        api.get('/metrics', this.getMetrics);
    }
    
    async createSession(req, res) {
        const { initialPrompt, model, tools, permissions } = req.body;
        
        try {
            const session = await this.sessionManager.createSession({
                initialPrompt,
                model: model || this.config.defaultModel,
                tools: tools || [],
                permissions: permissions || {},
                apiContext: {
                    userAgent: req.headers['user-agent'],
                    origin: req.headers['origin'],
                    timestamp: Date.now()
                }
            });
            
            res.json({
                success: true,
                data: {
                    sessionId: session.id,
                    model: session.model,
                    createdAt: session.createdAt
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
                code: error.code
            });
        }
    }
    
    async addMessage(req, res) {
        const { id } = req.params;
        const { message, role, attachments } = req.body;
        
        try {
            const response = await this.sessionManager.addMessage(id, {
                message,
                role: role || 'user',
                attachments: attachments || [],
                timestamp: Date.now()
            });
            
            res.json({
                success: true,
                data: {
                    messageId: response.messageId,
                    response: response.content,
                    usage: response.usage
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
                code: error.code
            });
        }
    }
    
    async executeTool(req, res) {
        const { id: serverId, tool: toolName } = req.params;
        const { input, context } = req.body;
        
        try {
            const result = await this.mcpManager.executeTool(serverId, toolName, {
                input,
                context: {
                    ...context,
                    apiRequest: true,
                    timestamp: Date.now()
                }
            });
            
            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
                code: error.code
            });
        }
    }
}
```

### WebSocket API for Real-time Communication
```javascript
/**
 * WebSocket API for real-time communication
 */
class ClaudeCodeWebSocketAPI {
    constructor(server, options = {}) {
        this.wss = new WebSocketServer({ 
            server,
            path: options.path || '/ws'
        });
        this.connections = new Map();
        this.subscriptions = new Map();
        
        this.setupWebSocketHandlers();
    }
    
    setupWebSocketHandlers() {
        this.wss.on('connection', (ws, req) => {
            const connectionId = this.generateConnectionId();
            const connection = {
                id: connectionId,
                ws,
                subscriptions: new Set(),
                authenticated: false,
                metadata: {
                    userAgent: req.headers['user-agent'],
                    origin: req.headers['origin'],
                    connectedAt: Date.now()
                }
            };
            
            this.connections.set(connectionId, connection);
            
            ws.on('message', (data) => {
                this.handleMessage(connection, data);
            });
            
            ws.on('close', () => {
                this.handleDisconnection(connection);
            });
            
            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
                this.handleDisconnection(connection);
            });
            
            // Send welcome message
            this.sendMessage(connection, {
                type: 'welcome',
                connectionId,
                serverVersion: this.version
            });
        });
    }
    
    async handleMessage(connection, data) {
        try {
            const message = JSON.parse(data);
            
            switch (message.type) {
                case 'auth':
                    await this.handleAuth(connection, message);
                    break;
                    
                case 'subscribe':
                    await this.handleSubscription(connection, message);
                    break;
                    
                case 'unsubscribe':
                    await this.handleUnsubscription(connection, message);
                    break;
                    
                case 'session_message':
                    await this.handleSessionMessage(connection, message);
                    break;
                    
                case 'tool_execute':
                    await this.handleToolExecution(connection, message);
                    break;
                    
                default:
                    this.sendError(connection, `Unknown message type: ${message.type}`);
            }
        } catch (error) {
            this.sendError(connection, `Invalid message format: ${error.message}`);
        }
    }
    
    async handleSessionMessage(connection, message) {
        if (!connection.authenticated) {
            this.sendError(connection, 'Authentication required');
            return;
        }
        
        const { sessionId, content, role } = message;
        
        try {
            const stream = this.sessionManager.addMessageStream(sessionId, {
                content,
                role: role || 'user',
                timestamp: Date.now()
            });
            
            // Stream response back to client
            for await (const chunk of stream) {
                this.sendMessage(connection, {
                    type: 'session_response',
                    sessionId,
                    messageId: message.messageId,
                    chunk
                });
            }
            
        } catch (error) {
            this.sendMessage(connection, {
                type: 'session_error',
                sessionId,
                messageId: message.messageId,
                error: error.message
            });
        }
    }
    
    async handleSubscription(connection, message) {
        const { channel, filters } = message;
        
        if (!this.isValidChannel(channel)) {
            this.sendError(connection, `Invalid channel: ${channel}`);
            return;
        }
        
        connection.subscriptions.add(channel);
        
        if (!this.subscriptions.has(channel)) {
            this.subscriptions.set(channel, new Set());
        }
        
        this.subscriptions.get(channel).add(connection.id);
        
        this.sendMessage(connection, {
            type: 'subscribed',
            channel,
            filters
        });
    }
    
    broadcast(channel, message) {
        const subscribers = this.subscriptions.get(channel);
        if (!subscribers) return;
        
        for (const connectionId of subscribers) {
            const connection = this.connections.get(connectionId);
            if (connection && connection.ws.readyState === WebSocket.OPEN) {
                this.sendMessage(connection, {
                    type: 'broadcast',
                    channel,
                    data: message
                });
            }
        }
    }
}
```

## Development Environment Integration

### IDE Plugin Interface
```javascript
/**
 * IDE Plugin Interface for Claude Code integration
 */
class IDEPluginInterface {
    constructor(ide) {
        this.ide = ide;
        this.claudeClient = new ClaudeCodeClient();
        this.activeSession = null;
        this.contextManager = new ContextManager();
        
        this.registerCommands();
        this.setupEventHandlers();
    }
    
    registerCommands() {
        // Register IDE commands
        this.ide.registerCommand('claude.startSession', this.startSession.bind(this));
        this.ide.registerCommand('claude.askQuestion', this.askQuestion.bind(this));
        this.ide.registerCommand('claude.explainCode', this.explainCode.bind(this));
        this.ide.registerCommand('claude.generateTests', this.generateTests.bind(this));
        this.ide.registerCommand('claude.refactorCode', this.refactorCode.bind(this));
        this.ide.registerCommand('claude.findBugs', this.findBugs.bind(this));
        this.ide.registerCommand('claude.optimizeCode', this.optimizeCode.bind(this));
    }
    
    setupEventHandlers() {
        // File change handlers
        this.ide.onFileOpen((file) => {
            this.contextManager.addFile(file);
        });
        
        this.ide.onFileChange((file) => {
            this.contextManager.updateFile(file);
        });
        
        // Selection handlers
        this.ide.onSelectionChange((selection) => {
            this.contextManager.updateSelection(selection);
        });
        
        // Project handlers
        this.ide.onProjectOpen((project) => {
            this.contextManager.setProject(project);
        });
    }
    
    async startSession() {
        try {
            const context = await this.contextManager.getCurrentContext();
            
            this.activeSession = await this.claudeClient.createSession({
                context: context,
                tools: ['Read', 'Write', 'Analyze'],
                permissions: {
                    fileAccess: context.projectPath,
                    networkAccess: false
                }
            });
            
            this.ide.showMessage('Claude Code session started');
            this.updateStatusBar('Connected');
            
        } catch (error) {
            this.ide.showError(`Failed to start session: ${error.message}`);
        }
    }
    
    async askQuestion() {
        if (!this.activeSession) {
            await this.startSession();
        }
        
        const question = await this.ide.showInputBox({
            prompt: 'Ask Claude a question',
            placeholder: 'What would you like to know?'
        });
        
        if (!question) return;
        
        try {
            const context = await this.contextManager.getCurrentContext();
            const response = await this.claudeClient.sendMessage(this.activeSession.id, {
                message: question,
                context: context
            });
            
            this.showResponsePanel(response);
            
        } catch (error) {
            this.ide.showError(`Error: ${error.message}`);
        }
    }
    
    async explainCode() {
        const selection = this.ide.getActiveSelection();
        if (!selection || !selection.text) {
            this.ide.showWarning('Please select some code to explain');
            return;
        }
        
        try {
            const context = await this.contextManager.getCurrentContext();
            const response = await this.claudeClient.sendMessage(this.activeSession.id, {
                message: 'Please explain this code:',
                context: {
                    ...context,
                    selectedCode: selection.text,
                    fileName: selection.fileName,
                    startLine: selection.startLine,
                    endLine: selection.endLine
                }
            });
            
            this.showResponsePanel(response, {
                title: 'Code Explanation',
                relatedFile: selection.fileName,
                relatedLines: [selection.startLine, selection.endLine]
            });
            
        } catch (error) {
            this.ide.showError(`Error explaining code: ${error.message}`);
        }
    }
    
    async generateTests() {
        const selection = this.ide.getActiveSelection();
        if (!selection) {
            this.ide.showWarning('Please select a function or class to generate tests for');
            return;
        }
        
        try {
            const context = await this.contextManager.getCurrentContext();
            const response = await this.claudeClient.sendMessage(this.activeSession.id, {
                message: 'Generate unit tests for this code:',
                context: {
                    ...context,
                    selectedCode: selection.text,
                    fileName: selection.fileName,
                    language: this.detectLanguage(selection.fileName)
                }
            });
            
            // Create new test file
            const testFileName = this.generateTestFileName(selection.fileName);
            await this.ide.createFile(testFileName, response.content);
            await this.ide.openFile(testFileName);
            
        } catch (error) {
            this.ide.showError(`Error generating tests: ${error.message}`);
        }
    }
}
```

### VS Code Extension
```typescript
import * as vscode from 'vscode';
import { ClaudeCodeClient } from './claude-client';

export function activate(context: vscode.ExtensionContext) {
    const claudeClient = new ClaudeCodeClient({
        apiUrl: vscode.workspace.getConfiguration('claudeCode').get('apiUrl'),
        apiKey: vscode.workspace.getConfiguration('claudeCode').get('apiKey')
    });
    
    // Register commands
    const commands = [
        vscode.commands.registerCommand('claude-code.startSession', () => {
            const panel = vscode.window.createWebviewPanel(
                'claudeCode',
                'Claude Code',
                vscode.ViewColumn.Two,
                {
                    enableScripts: true,
                    localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
                }
            );
            
            panel.webview.html = getWebviewContent(context, panel.webview);
            
            // Handle messages from webview
            panel.webview.onDidReceiveMessage(
                message => handleWebviewMessage(message, claudeClient),
                undefined,
                context.subscriptions
            );
        }),
        
        vscode.commands.registerCommand('claude-code.explainSelection', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            const selection = editor.document.getText(editor.selection);
            if (!selection) {
                vscode.window.showWarningMessage('Please select some code to explain');
                return;
            }
            
            try {
                const response = await claudeClient.explainCode(selection, {
                    language: editor.document.languageId,
                    fileName: editor.document.fileName
                });
                
                showResponseInPanel(response);
            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        }),
        
        vscode.commands.registerCommand('claude-code.generateTests', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;
            
            const document = editor.document;
            const selection = editor.selection;
            const selectedText = document.getText(selection);
            
            if (!selectedText) {
                vscode.window.showWarningMessage('Please select a function or class');
                return;
            }
            
            try {
                const tests = await claudeClient.generateTests(selectedText, {
                    language: document.languageId,
                    fileName: document.fileName,
                    testFramework: getTestFramework(document.languageId)
                });
                
                // Create new test file
                const testFileName = generateTestFileName(document.fileName);
                const testUri = vscode.Uri.file(testFileName);
                
                await vscode.workspace.fs.writeFile(testUri, Buffer.from(tests));
                await vscode.window.showTextDocument(testUri);
                
            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        })
    ];
    
    context.subscriptions.push(...commands);
    
    // Register providers
    const completionProvider = new ClaudeCompletionProvider(claudeClient);
    const hoverProvider = new ClaudeHoverProvider(claudeClient);
    const diagnosticProvider = new ClaudeDiagnosticProvider(claudeClient);
    
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider('*', completionProvider),
        vscode.languages.registerHoverProvider('*', hoverProvider),
        vscode.languages.registerCodeActionsProvider('*', diagnosticProvider)
    );
}

class ClaudeCompletionProvider implements vscode.CompletionItemProvider {
    constructor(private claudeClient: ClaudeCodeClient) {}
    
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): Promise<vscode.CompletionItem[]> {
        const context = this.getCompletionContext(document, position);
        
        try {
            const completions = await this.claudeClient.getCompletions(context);
            
            return completions.map(completion => {
                const item = new vscode.CompletionItem(
                    completion.label,
                    vscode.CompletionItemKind.Snippet
                );
                
                item.insertText = new vscode.SnippetString(completion.insertText);
                item.documentation = new vscode.MarkdownString(completion.documentation);
                item.sortText = completion.sortText;
                
                return item;
            });
        } catch (error) {
            console.error('Completion error:', error);
            return [];
        }
    }
}
```

## Version Control Integration

### Git Integration
```javascript
/**
 * Git integration for enhanced context and workflow support
 */
class GitIntegration {
    constructor(projectPath) {
        this.projectPath = projectPath;
        this.git = new GitRepository(projectPath);
        this.hooks = new Map();
        
        this.setupGitHooks();
    }
    
    async getCurrentContext() {
        const [branch, status, log, diff] = await Promise.all([
            this.git.getCurrentBranch(),
            this.git.getStatus(),
            this.git.getRecentCommits(10),
            this.git.getDiff('--cached')
        ]);
        
        return {
            repository: {
                path: this.projectPath,
                branch: branch,
                isClean: status.isClean,
                hasUnstagedChanges: status.hasUnstagedChanges,
                hasStagedChanges: status.hasStagedChanges
            },
            recentCommits: log,
            stagedDiff: diff,
            remoteUrl: await this.git.getRemoteUrl()
        };
    }
    
    async analyzeChanges() {
        const diff = await this.git.getDiff();
        const stats = await this.git.getDiffStats();
        
        return {
            summary: {
                filesChanged: stats.filesChanged,
                insertions: stats.insertions,
                deletions: stats.deletions
            },
            changes: await this.categorizeChanges(diff),
            affectedFiles: stats.files
        };
    }
    
    async categorizeChanges(diff) {
        const categories = {
            features: [],
            bugfixes: [],
            refactoring: [],
            documentation: [],
            tests: [],
            configuration: [],
            other: []
        };
        
        const files = this.parseDiff(diff);
        
        for (const file of files) {
            const category = this.classifyFileChanges(file);
            categories[category].push(file);
        }
        
        return categories;
    }
    
    classifyFileChanges(file) {
        const path = file.path.toLowerCase();
        const changes = file.changes;
        
        // Documentation files
        if (path.includes('readme') || path.includes('doc') || path.endsWith('.md')) {
            return 'documentation';
        }
        
        // Test files
        if (path.includes('test') || path.includes('spec') || path.includes('__tests__')) {
            return 'tests';
        }
        
        // Configuration files
        if (path.includes('config') || path.includes('.json') || path.includes('.yaml')) {
            return 'configuration';
        }
        
        // Analyze change patterns
        const hasNewFunctions = changes.additions.some(line => 
            line.includes('function') || line.includes('def ') || line.includes('async ')
        );
        
        const hasFixKeywords = changes.additions.some(line =>
            /fix|bug|error|issue/i.test(line)
        );
        
        const hasRefactorKeywords = changes.additions.some(line =>
            /refactor|restructure|reorganize/i.test(line)
        );
        
        if (hasFixKeywords) return 'bugfixes';
        if (hasRefactorKeywords) return 'refactoring';
        if (hasNewFunctions) return 'features';
        
        return 'other';
    }
    
    async generateCommitMessage(stagedChanges) {
        const analysis = await this.analyzeChanges();
        const context = await this.getCurrentContext();
        
        const prompt = `
Based on the following git changes, generate a concise commit message following conventional commit format:

Changes Summary:
- Files changed: ${analysis.summary.filesChanged}
- Insertions: ${analysis.summary.insertions}
- Deletions: ${analysis.summary.deletions}

Change Categories:
${Object.entries(analysis.changes)
    .filter(([_, files]) => files.length > 0)
    .map(([category, files]) => `- ${category}: ${files.length} files`)
    .join('\n')}

Recent commit history:
${context.recentCommits.slice(0, 3).map(commit => `- ${commit.message}`).join('\n')}

Generate a commit message in the format: <type>(<scope>): <description>
`;
        
        return this.claudeClient.generateCommitMessage(prompt, {
            changes: analysis,
            context: context
        });
    }
    
    setupGitHooks() {
        // Pre-commit hook for code analysis
        this.addHook('pre-commit', async () => {
            const stagedFiles = await this.git.getStagedFiles();
            const issues = await this.analyzeCodeQuality(stagedFiles);
            
            if (issues.critical.length > 0) {
                console.error('Critical issues found:', issues.critical);
                return false; // Block commit
            }
            
            if (issues.warnings.length > 0) {
                console.warn('Warnings found:', issues.warnings);
            }
            
            return true;
        });
        
        // Post-commit hook for documentation updates
        this.addHook('post-commit', async () => {
            const lastCommit = await this.git.getLastCommit();
            const affectedFiles = await this.git.getChangedFiles(lastCommit.hash);
            
            // Check if documentation needs updating
            const needsDocUpdate = this.checkDocumentationNeeds(affectedFiles);
            if (needsDocUpdate) {
                console.log('Consider updating documentation for these changes');
            }
        });
    }
    
    addHook(hookName, handler) {
        if (!this.hooks.has(hookName)) {
            this.hooks.set(hookName, []);
        }
        this.hooks.get(hookName).push(handler);
    }
    
    async executeHook(hookName, ...args) {
        const handlers = this.hooks.get(hookName) || [];
        const results = await Promise.all(
            handlers.map(handler => handler(...args))
        );
        
        return results.every(result => result !== false);
    }
}
```

## CI/CD Integration

### Pipeline Integration
```javascript
/**
 * CI/CD Pipeline integration for automated Claude Code usage
 */
class CIPipelineIntegration {
    constructor(options = {}) {
        this.claudeClient = new ClaudeCodeClient(options.apiConfig);
        this.pipelineConfig = options.pipeline || {};
        this.stages = new Map();
        
        this.registerDefaultStages();
    }
    
    registerDefaultStages() {
        // Code quality analysis stage
        this.addStage('code-quality', async (context) => {
            const analysis = await this.claudeClient.analyzeCodeQuality({
                projectPath: context.workspace,
                includePatterns: this.pipelineConfig.includePatterns,
                excludePatterns: this.pipelineConfig.excludePatterns
            });
            
            return {
                passed: analysis.criticalIssues === 0,
                report: analysis,
                recommendations: analysis.suggestions
            };
        });
        
        // Documentation validation stage
        this.addStage('docs-validation', async (context) => {
            const validation = await this.claudeClient.validateDocumentation({
                projectPath: context.workspace,
                checkCoverage: true,
                checkAccuracy: true,
                checkExamples: true
            });
            
            return {
                passed: validation.coveragePercentage >= this.pipelineConfig.minDocCoverage,
                report: validation,
                missingDocs: validation.missingDocumentation
            };
        });
        
        // Test generation stage
        this.addStage('test-generation', async (context) => {
            const changedFiles = await this.getChangedFiles(context);
            const testResults = [];
            
            for (const file of changedFiles) {
                if (this.shouldGenerateTests(file)) {
                    const tests = await this.claudeClient.generateTests({
                        filePath: file.path,
                        content: file.content,
                        testFramework: this.detectTestFramework(context.workspace)
                    });
                    
                    testResults.push({
                        file: file.path,
                        testsGenerated: tests.length,
                        testFile: tests.filePath
                    });
                }
            }
            
            return {
                passed: true,
                report: { testsGenerated: testResults },
                artifacts: testResults.map(r => r.testFile)
            };
        });
    }
    
    async runPipeline(context) {
        const results = {
            stages: {},
            overallStatus: 'success',
            startTime: Date.now(),
            endTime: null,
            artifacts: []
        };
        
        for (const [stageName, stageFunction] of this.stages) {
            console.log(`Running stage: ${stageName}`);
            const stageStart = Date.now();
            
            try {
                const stageResult = await stageFunction(context);
                const stageDuration = Date.now() - stageStart;
                
                results.stages[stageName] = {
                    status: stageResult.passed ? 'passed' : 'failed',
                    duration: stageDuration,
                    report: stageResult.report,
                    recommendations: stageResult.recommendations,
                    artifacts: stageResult.artifacts || []
                };
                
                if (stageResult.artifacts) {
                    results.artifacts.push(...stageResult.artifacts);
                }
                
                if (!stageResult.passed) {
                    results.overallStatus = 'failed';
                    
                    if (this.pipelineConfig.failFast) {
                        break;
                    }
                }
                
            } catch (error) {
                results.stages[stageName] = {
                    status: 'error',
                    duration: Date.now() - stageStart,
                    error: error.message,
                    stack: error.stack
                };
                
                results.overallStatus = 'error';
                
                if (this.pipelineConfig.failFast) {
                    break;
                }
            }
        }
        
        results.endTime = Date.now();
        results.totalDuration = results.endTime - results.startTime;
        
        await this.generatePipelineReport(results, context);
        return results;
    }
    
    async generatePipelineReport(results, context) {
        const report = await this.claudeClient.generatePipelineReport({
            results: results,
            context: context,
            template: this.pipelineConfig.reportTemplate
        });
        
        // Save report to artifacts
        const reportPath = path.join(context.workspace, 'claude-pipeline-report.md');
        await fs.writeFile(reportPath, report);
        
        results.artifacts.push(reportPath);
        
        // Post to PR if in pull request context
        if (context.pullRequest) {
            await this.postPRComment(context.pullRequest, report);
        }
        
        return report;
    }
    
    addStage(name, stageFunction) {
        this.stages.set(name, stageFunction);
    }
}

// GitHub Actions integration
const githubActionConfig = {
    name: 'Claude Code Analysis',
    on: {
        pull_request: {
            types: ['opened', 'synchronize', 'reopened']
        },
        push: {
            branches: ['main', 'develop']
        }
    },
    jobs: {
        'claude-analysis': {
            'runs-on': 'ubuntu-latest',
            steps: [
                {
                    name: 'Checkout code',
                    uses: 'actions/checkout@v3'
                },
                {
                    name: 'Setup Node.js',
                    uses: 'actions/setup-node@v3',
                    with: {
                        'node-version': '18'
                    }
                },
                {
                    name: 'Install Claude Code',
                    run: 'npm install -g @anthropic/claude-code'
                },
                {
                    name: 'Run Claude Code Analysis',
                    run: 'claude-code analyze --format=json --output=analysis.json',
                    env: {
                        CLAUDE_API_KEY: '${{ secrets.CLAUDE_API_KEY }}'
                    }
                },
                {
                    name: 'Upload Analysis Results',
                    uses: 'actions/upload-artifact@v3',
                    with: {
                        name: 'claude-analysis',
                        path: 'analysis.json'
                    }
                }
            ]
        }
    }
};
```

## Claude Desktop Integration

### Configuration Synchronization
```javascript
/**
 * Claude Desktop integration for configuration sync
 */
class ClaudeDesktopIntegration {
    constructor() {
        this.desktopConfigPath = this.getDesktopConfigPath();
        this.syncManager = new ConfigSyncManager();
        this.mcpImporter = new MCPImporter();
    }
    
    getDesktopConfigPath() {
        const os = process.platform;
        const homeDir = process.env.HOME || process.env.USERPROFILE;
        
        switch (os) {
            case 'darwin': // macOS
                return path.join(homeDir, 'Library/Application Support/Claude/claude_desktop_config.json');
            case 'win32': // Windows
                return path.join(process.env.APPDATA, 'Claude/claude_desktop_config.json');
            case 'linux':
                return path.join(homeDir, '.config/claude/claude_desktop_config.json');
            default:
                throw new Error(`Unsupported platform: ${os}`);
        }
    }
    
    async importDesktopConfig() {
        try {
            if (!await this.fileExists(this.desktopConfigPath)) {
                return { imported: false, reason: 'Desktop config not found' };
            }
            
            const desktopConfig = await this.loadDesktopConfig();
            const importResults = {
                mcpServers: 0,
                settings: 0,
                errors: []
            };
            
            // Import MCP servers
            if (desktopConfig.mcpServers) {
                for (const [serverName, serverConfig] of Object.entries(desktopConfig.mcpServers)) {
                    try {
                        await this.mcpImporter.importServer(serverName, serverConfig);
                        importResults.mcpServers++;
                    } catch (error) {
                        importResults.errors.push({
                            type: 'mcp_server',
                            server: serverName,
                            error: error.message
                        });
                    }
                }
            }
            
            // Import other settings
            if (desktopConfig.settings) {
                try {
                    await this.syncManager.importSettings(desktopConfig.settings);
                    importResults.settings++;
                } catch (error) {
                    importResults.errors.push({
                        type: 'settings',
                        error: error.message
                    });
                }
            }
            
            return {
                imported: true,
                results: importResults
            };
            
        } catch (error) {
            return {
                imported: false,
                reason: error.message
            };
        }
    }
    
    async exportToDesktop() {
        try {
            const claudeCodeConfig = await this.exportClaudeCodeConfig();
            const desktopConfig = await this.loadDesktopConfig() || {};
            
            // Merge configurations
            const mergedConfig = this.mergeConfigurations(desktopConfig, claudeCodeConfig);
            
            // Backup existing config
            if (await this.fileExists(this.desktopConfigPath)) {
                const backupPath = `${this.desktopConfigPath}.backup.${Date.now()}`;
                await fs.copyFile(this.desktopConfigPath, backupPath);
            }
            
            // Write merged config
            await this.ensureDirectoryExists(path.dirname(this.desktopConfigPath));
            await fs.writeFile(
                this.desktopConfigPath, 
                JSON.stringify(mergedConfig, null, 2)
            );
            
            return { exported: true };
            
        } catch (error) {
            return {
                exported: false,
                reason: error.message
            };
        }
    }
    
    async syncBidirectional() {
        const [importResult, exportResult] = await Promise.all([
            this.importDesktopConfig(),
            this.exportToDesktop()
        ]);
        
        return {
            import: importResult,
            export: exportResult,
            synced: importResult.imported && exportResult.exported
        };
    }
    
    async loadDesktopConfig() {
        if (await this.fileExists(this.desktopConfigPath)) {
            const content = await fs.readFile(this.desktopConfigPath, 'utf8');
            return JSON.parse(content);
        }
        return null;
    }
    
    async exportClaudeCodeConfig() {
        const mcpServers = await this.mcpManager.exportServers();
        const settings = await this.configManager.exportSettings();
        
        return {
            mcpServers: this.convertMCPServersToDesktopFormat(mcpServers),
            settings: this.convertSettingsToDesktopFormat(settings)
        };
    }
    
    convertMCPServersToDesktopFormat(servers) {
        const desktopFormat = {};
        
        for (const [name, server] of Object.entries(servers)) {
            desktopFormat[name] = {
                command: server.command,
                args: server.args || [],
                env: server.env || {}
            };
            
            if (server.transport && server.transport !== 'stdio') {
                desktopFormat[name].transport = server.transport;
            }
        }
        
        return desktopFormat;
    }
    
    mergeConfigurations(desktop, claudeCode) {
        return {
            ...desktop,
            mcpServers: {
                ...desktop.mcpServers,
                ...claudeCode.mcpServers
            },
            settings: {
                ...desktop.settings,
                ...claudeCode.settings
            }
        };
    }
}
```

This integration points specification provides comprehensive coverage of Claude Code's external integration capabilities, enabling seamless workflow integration across development environments, version control systems, CI/CD pipelines, and desktop applications.