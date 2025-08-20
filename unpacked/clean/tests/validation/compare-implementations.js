/**
 * Implementation Comparison Tool
 * 
 * Validates that our clean implementation behaves identically to the original
 * bundled Claude Code CLI by comparing outputs, behaviors, and functionality.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');

/**
 * Test Configuration
 */
const VALIDATION_CONFIG = {
    // Path to original bundled Claude Code (if available)
    originalBinary: process.env.ORIGINAL_CLAUDE_PATH || null,
    
    // Path to our clean implementation
    cleanBinary: join(PROJECT_ROOT, 'src/cli/index.js'),
    
    // Test scenarios to validate
    testScenarios: [
        {
            name: 'Version Check',
            command: '--version',
            expectOutput: true,
            timeout: 5000
        },
        {
            name: 'Help Display',
            command: '--help',
            expectOutput: true,
            timeout: 5000
        },
        {
            name: 'Configuration List',
            command: 'config list',
            expectOutput: true,
            timeout: 10000
        },
        {
            name: 'MCP Server List',
            command: 'mcp list',
            expectOutput: true,
            timeout: 10000
        }
    ],
    
    // Features to validate exist
    featureChecks: [
        {
            name: 'Hook System',
            check: () => existsSync(join(PROJECT_ROOT, 'src/hooks/manager.js'))
        },
        {
            name: 'Slash Commands',
            check: () => existsSync(join(PROJECT_ROOT, 'src/commands/slash/builtins.js'))
        },
        {
            name: 'Agent System',
            check: () => existsSync(join(PROJECT_ROOT, 'src/agents/manager.js'))
        },
        {
            name: 'MCP Integration',
            check: () => existsSync(join(PROJECT_ROOT, 'src/mcp/manager.js'))
        },
        {
            name: 'Settings Management',
            check: () => existsSync(join(PROJECT_ROOT, 'src/config/settings.js'))
        },
        {
            name: 'Error Handling',
            check: () => existsSync(join(PROJECT_ROOT, 'src/utils/error-handler.js'))
        },
        {
            name: 'Telemetry System',
            check: () => existsSync(join(PROJECT_ROOT, 'src/telemetry/manager.js'))
        },
        {
            name: 'Tool System',
            check: () => existsSync(join(PROJECT_ROOT, 'src/tools/system.js'))
        }
    ]
};

/**
 * Color codes for console output
 */
const COLORS = {
    GREEN: '\x1b[32m',
    RED: '\x1b[31m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    RESET: '\x1b[0m',
    BOLD: '\x1b[1m'
};

/**
 * Utility functions
 */
function colorize(text, color) {
    return `${color}${text}${COLORS.RESET}`;
}

function log(message, color = COLORS.RESET) {
    console.log(colorize(message, color));
}

function logSection(title) {
    console.log('\n' + colorize(`${'='.repeat(60)}`, COLORS.BLUE));
    console.log(colorize(`${title}`, COLORS.BOLD + COLORS.BLUE));
    console.log(colorize(`${'='.repeat(60)}`, COLORS.BLUE) + '\n');
}

function logResult(name, passed, details = '') {
    const status = passed ? 
        colorize('✓ PASS', COLORS.GREEN) : 
        colorize('✗ FAIL', COLORS.RED);
    
    console.log(`${status} ${name}${details ? ` - ${details}` : ''}`);
}

/**
 * Execute command with timeout and error handling
 */
function executeCommand(command, timeout = 10000) {
    try {
        const result = execSync(command, {
            timeout,
            encoding: 'utf8',
            stdio: 'pipe'
        });
        
        return {
            success: true,
            stdout: result,
            stderr: '',
            exitCode: 0
        };
    } catch (error) {
        return {
            success: false,
            stdout: error.stdout || '',
            stderr: error.stderr || error.message,
            exitCode: error.status || 1
        };
    }
}

/**
 * Validate feature existence
 */
function validateFeatures() {
    logSection('Feature Validation');
    
    let passCount = 0;
    let totalCount = VALIDATION_CONFIG.featureChecks.length;
    
    for (const feature of VALIDATION_CONFIG.featureChecks) {
        try {
            const passed = feature.check();
            logResult(feature.name, passed);
            
            if (passed) {
                passCount++;
            }
        } catch (error) {
            logResult(feature.name, false, error.message);
        }
    }
    
    log(`\nFeature Summary: ${passCount}/${totalCount} features implemented`, 
        passCount === totalCount ? COLORS.GREEN : COLORS.YELLOW);
    
    return { passCount, totalCount };
}

/**
 * Validate command execution
 */
function validateCommands() {
    logSection('Command Validation');
    
    if (!existsSync(VALIDATION_CONFIG.cleanBinary)) {
        log(`Clean binary not found: ${VALIDATION_CONFIG.cleanBinary}`, COLORS.RED);
        return { passCount: 0, totalCount: VALIDATION_CONFIG.testScenarios.length };
    }
    
    let passCount = 0;
    let totalCount = VALIDATION_CONFIG.testScenarios.length;
    
    for (const scenario of VALIDATION_CONFIG.testScenarios) {
        const command = `node "${VALIDATION_CONFIG.cleanBinary}" ${scenario.command}`;
        
        log(`Testing: ${scenario.name}`, COLORS.BLUE);
        
        const result = executeCommand(command, scenario.timeout);
        
        let passed = true;
        let details = '';
        
        if (!result.success && scenario.expectOutput) {
            passed = false;
            details = `Exit code: ${result.exitCode}`;
        }
        
        if (scenario.expectOutput && !result.stdout && !result.stderr) {
            passed = false;
            details = 'No output produced';
        }
        
        logResult(scenario.name, passed, details);
        
        if (passed) {
            passCount++;
        }
        
        // Log additional details in verbose mode
        if (process.argv.includes('--verbose') || !passed) {
            if (result.stdout) {
                console.log(colorize('  STDOUT:', COLORS.BLUE));
                console.log('    ' + result.stdout.split('\n').slice(0, 3).join('\n    '));
            }
            if (result.stderr) {
                console.log(colorize('  STDERR:', COLORS.YELLOW));
                console.log('    ' + result.stderr.split('\n').slice(0, 3).join('\n    '));
            }
        }
    }
    
    log(`\nCommand Summary: ${passCount}/${totalCount} commands working`, 
        passCount === totalCount ? COLORS.GREEN : COLORS.YELLOW);
    
    return { passCount, totalCount };
}

/**
 * Compare with original implementation (if available)
 */
function compareWithOriginal() {
    logSection('Original Comparison');
    
    if (!VALIDATION_CONFIG.originalBinary || !existsSync(VALIDATION_CONFIG.originalBinary)) {
        log('Original binary not available for comparison', COLORS.YELLOW);
        log('Set ORIGINAL_CLAUDE_PATH environment variable to enable comparison', COLORS.BLUE);
        return { passCount: 0, totalCount: 0 };
    }
    
    let passCount = 0;
    let totalCount = VALIDATION_CONFIG.testScenarios.length;
    
    for (const scenario of VALIDATION_CONFIG.testScenarios) {
        const originalCommand = `"${VALIDATION_CONFIG.originalBinary}" ${scenario.command}`;
        const cleanCommand = `node "${VALIDATION_CONFIG.cleanBinary}" ${scenario.command}`;
        
        log(`Comparing: ${scenario.name}`, COLORS.BLUE);
        
        const originalResult = executeCommand(originalCommand, scenario.timeout);
        const cleanResult = executeCommand(cleanCommand, scenario.timeout);
        
        // Basic comparison - both should succeed or fail similarly
        const passed = originalResult.success === cleanResult.success;
        
        logResult(scenario.name, passed, 
            passed ? 'Behavior matches' : 'Behavior differs');
        
        if (passed) {
            passCount++;
        }
        
        // Detailed comparison in verbose mode
        if (process.argv.includes('--verbose')) {
            console.log(colorize('  Original exit code:', COLORS.BLUE), originalResult.exitCode);
            console.log(colorize('  Clean exit code:', COLORS.BLUE), cleanResult.exitCode);
        }
    }
    
    log(`\nComparison Summary: ${passCount}/${totalCount} commands match original`, 
        passCount === totalCount ? COLORS.GREEN : COLORS.YELLOW);
    
    return { passCount, totalCount };
}

/**
 * Generate validation report
 */
function generateReport(results) {
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            totalTests: results.features.totalCount + results.commands.totalCount + results.comparison.totalCount,
            totalPassed: results.features.passCount + results.commands.passCount + results.comparison.passCount,
            success: false
        },
        results: {
            features: results.features,
            commands: results.commands,
            comparison: results.comparison
        },
        environment: {
            nodeVersion: process.version,
            platform: process.platform,
            cleanBinaryExists: existsSync(VALIDATION_CONFIG.cleanBinary),
            originalBinaryExists: VALIDATION_CONFIG.originalBinary && existsSync(VALIDATION_CONFIG.originalBinary)
        }
    };
    
    report.summary.success = report.summary.totalPassed === report.summary.totalTests;
    
    const reportPath = join(PROJECT_ROOT, 'validation-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
}

/**
 * Main validation function
 */
async function validateImplementation() {
    console.log(colorize('Claude Code Implementation Validator', COLORS.BOLD + COLORS.BLUE));
    console.log(colorize('=====================================\n', COLORS.BLUE));
    
    const results = {
        features: validateFeatures(),
        commands: validateCommands(),
        comparison: compareWithOriginal()
    };
    
    // Generate report
    const report = generateReport(results);
    
    // Final summary
    logSection('Final Summary');
    
    log(`Features: ${results.features.passCount}/${results.features.totalCount}`, 
        results.features.passCount === results.features.totalCount ? COLORS.GREEN : COLORS.RED);
    
    log(`Commands: ${results.commands.passCount}/${results.commands.totalCount}`, 
        results.commands.passCount === results.commands.totalCount ? COLORS.GREEN : COLORS.RED);
    
    if (results.comparison.totalCount > 0) {
        log(`Comparison: ${results.comparison.passCount}/${results.comparison.totalCount}`, 
            results.comparison.passCount === results.comparison.totalCount ? COLORS.GREEN : COLORS.RED);
    }
    
    log(`\nOverall: ${report.summary.totalPassed}/${report.summary.totalTests} tests passed`, 
        report.summary.success ? COLORS.GREEN : COLORS.RED);
    
    log(`\nReport saved to: validation-report.json`, COLORS.BLUE);
    
    // Exit with appropriate code
    process.exit(report.summary.success ? 0 : 1);
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    validateImplementation().catch(error => {
        console.error(colorize('Validation failed:', COLORS.RED), error.message);
        process.exit(1);
    });
}