/**
 * System Doctor - Health Check Utility
 * 
 * Provides system health diagnostics for Claude Code installation.
 * Checks authentication, configuration, and system requirements.
 */

import * as fs from 'fs';
import * as path from 'path';
import { tokenManager } from '../core/auth/token.js';
import { configManager } from '../config/manager.js';
import { mcpServerManager } from '../mcp/manager.js';

export class SystemDoctor {
    constructor() {
        this.checks = [];
    }
    
    /**
     * Run all system diagnostics
     * @returns {object} Diagnostic results
     */
    async runDiagnostics() {
        const results = {
            checks: [],
            overall: { passed: true },
            recommendations: []
        };
        
        // Run all health checks
        await this._checkNodeVersion(results);
        await this._checkAuthentication(results);
        await this._checkConfiguration(results);
        await this._checkPermissions(results);
        await this._checkMCPConfig(results);
        
        // Determine overall status
        results.overall.passed = results.checks.every(check => check.passed);
        
        // Add recommendations for failed checks
        if (!results.overall.passed) {
            this._addRecommendations(results);
        }
        
        return results;
    }
    
    /**
     * Check Node.js version compatibility
     */
    async _checkNodeVersion(results) {
        const version = process.version;
        const majorVersion = parseInt(version.slice(1).split('.')[0]);
        
        // Claude Code requires Node.js 18+
        const isCompatible = majorVersion >= 18;
        
        results.checks.push({
            name: 'Node.js Version',
            passed: isCompatible,
            message: isCompatible 
                ? `Node.js ${version} (compatible)`
                : `Node.js ${version} (requires v18.0.0 or higher)`,
            details: isCompatible ? null : 'Please upgrade Node.js to version 18 or higher'
        });
    }
    
    /**
     * Check authentication status
     */
    async _checkAuthentication(results) {
        const tokenInfo = await tokenManager.getTokenInfo();
        
        results.checks.push({
            name: 'Authentication',
            passed: tokenInfo.authenticated,
            message: tokenInfo.message,
            details: tokenInfo.authenticated 
                ? `Token: ${tokenInfo.maskedToken} (${tokenInfo.tokenLength} chars)`
                : 'Run "claude setup-token" to configure authentication'
        });
    }
    
    /**
     * Check configuration files
     */
    async _checkConfiguration(results) {
        const config = configManager.list();
        const hasValidConfig = config && typeof config === 'object';
        
        // Check for essential configuration
        const hasModel = config.model && typeof config.model === 'string';
        const hasValidPermissionMode = ['strict', 'normal', 'permissive'].includes(config.permissionMode);
        
        const configValid = hasValidConfig && hasModel && hasValidPermissionMode;
        
        results.checks.push({
            name: 'Configuration',
            passed: configValid,
            message: configValid 
                ? `Configuration loaded (model: ${config.model})`
                : 'Configuration issues detected',
            details: configValid 
                ? `Permission mode: ${config.permissionMode}, Theme: ${config.theme}`
                : 'Run "claude config list" to check configuration'
        });
    }
    
    /**
     * Check file permissions and access
     */
    async _checkPermissions(results) {
        let permissionsOk = true;
        let details = [];
        
        // Check config directory access
        const globalConfigPath = configManager.getGlobalConfigPath();
        const globalConfigDir = path.dirname(globalConfigPath);
        
        try {
            if (!fs.existsSync(globalConfigDir)) {
                fs.mkdirSync(globalConfigDir, { recursive: true });
            }
            fs.accessSync(globalConfigDir, fs.constants.R_OK | fs.constants.W_OK);
        } catch (error) {
            permissionsOk = false;
            details.push(`Cannot access config directory: ${globalConfigDir}`);
        }
        
        // Check token file access
        const tokenPath = tokenManager.getTokenPath();
        const tokenDir = path.dirname(tokenPath);
        
        try {
            if (!fs.existsSync(tokenDir)) {
                fs.mkdirSync(tokenDir, { recursive: true });
            }
            fs.accessSync(tokenDir, fs.constants.R_OK | fs.constants.W_OK);
        } catch (error) {
            permissionsOk = false;
            details.push(`Cannot access token directory: ${tokenDir}`);
        }
        
        results.checks.push({
            name: 'File Permissions',
            passed: permissionsOk,
            message: permissionsOk 
                ? 'File system access OK'
                : 'File permission issues detected',
            details: details.length > 0 ? details.join(', ') : null
        });
    }
    
    /**
     * Check MCP server configuration
     */
    async _checkMCPConfig(results) {
        try {
            const servers = await mcpServerManager.listServers();
            const serverCount = servers.length;
            
            results.checks.push({
                name: 'MCP Configuration',
                passed: true, // MCP config is optional
                message: serverCount > 0 
                    ? `${serverCount} MCP server(s) configured`
                    : 'No MCP servers configured (optional)',
                details: serverCount > 0 
                    ? `Servers: ${servers.map(s => `${s.name} (${s.scope})`).join(', ')}`
                    : 'MCP servers can be added with "claude mcp add"'
            });
        } catch (error) {
            results.checks.push({
                name: 'MCP Configuration',
                passed: false,
                message: 'Failed to check MCP configuration',
                details: error.message
            });
        }
    }
    
    /**
     * Add recommendations based on failed checks
     */
    _addRecommendations(results) {
        const failedChecks = results.checks.filter(check => !check.passed);
        
        for (const check of failedChecks) {
            switch (check.name) {
                case 'Node.js Version':
                    results.recommendations.push('Upgrade Node.js to version 18 or higher');
                    break;
                case 'Authentication':
                    results.recommendations.push('Run "claude setup-token" to configure authentication');
                    break;
                case 'Configuration':
                    results.recommendations.push('Check configuration with "claude config list"');
                    break;
                case 'File Permissions':
                    results.recommendations.push('Check file permissions for config and token directories');
                    break;
                default:
                    results.recommendations.push(`Fix issues with: ${check.name}`);
            }
        }
        
        // Add general recommendations
        results.recommendations.push('Check network connectivity if API calls fail');
        results.recommendations.push('Run "claude doctor" again after fixing issues');
    }
}