/**
 * Environment Variables Support
 * 
 * Handles environment variable parsing, validation, and configuration for Claude Code.
 * Extracted from various chunks containing environment variable logic.
 * 
 * Key chunks analyzed:
 * - chunk_0548.js:482-486 (rZ1 function - general env var getter)
 * - chunk_0556.js:349-353 (_U0 function - AWS/Bedrock env getter)  
 * - chunk_0556.js:514-518 (Gv1 function - Vertex AI env getter)
 * - chunk_0501.js:375-379 (IQ function - parse truthy env vars)
 * - chunk_0501.js:381-385 (Pt0 function - parse falsy env vars)
 * - chunk_0527.js (various env var usage patterns)
 * - chunk_0587.js (CLAUDE_CODE_SHELL_PREFIX usage)
 */

/**
 * General environment variable getter
 * 
 * Extracted from chunk_0548.js:482-486 (rZ1 function):
 * - Supports both Node.js process.env and Deno environment
 * - Handles trim() and undefined fallback
 * - Cross-runtime compatibility
 * 
 * @param {string} key - Environment variable key
 * @returns {string|undefined} Trimmed value or undefined
 */
export function getEnvironmentVariable(key) {
    // Node.js environment
    if (typeof globalThis.process !== "undefined") {
        return globalThis.process.env?.[key]?.trim() ?? void 0;
    }
    
    // Deno environment  
    if (typeof globalThis.Deno !== "undefined") {
        return globalThis.Deno.env?.get?.(key)?.trim();
    }
    
    return undefined;
}

/**
 * AWS/Bedrock environment variable getter
 * 
 * Extracted from chunk_0556.js:349-353 (_U0 function):
 * - Specialized getter for AWS/Bedrock related variables
 * - Same cross-runtime pattern as general getter
 * 
 * @param {string} key - Environment variable key
 * @returns {string|undefined} Trimmed value or undefined
 */
export function getAWSEnvironmentVariable(key) {
    if (typeof globalThis.process !== "undefined") {
        return globalThis.process.env?.[key]?.trim() ?? void 0;
    }
    
    if (typeof globalThis.Deno !== "undefined") {
        return globalThis.Deno.env?.get?.(key)?.trim();
    }
    
    return undefined;
}

/**
 * Vertex AI environment variable getter
 * 
 * Extracted from chunk_0556.js:514-518 (Gv1 function):
 * - Specialized getter for Vertex AI related variables
 * - Same cross-runtime pattern as general getter
 * 
 * @param {string} key - Environment variable key
 * @returns {string|undefined} Trimmed value or undefined
 */
export function getVertexEnvironmentVariable(key) {
    if (typeof globalThis.process !== "undefined") {
        return globalThis.process.env?.[key]?.trim() ?? void 0;
    }
    
    if (typeof globalThis.Deno !== "undefined") {
        return globalThis.Deno.env?.get?.(key)?.trim();
    }
    
    return undefined;
}

/**
 * Parse truthy environment variable
 * 
 * Extracted from chunk_0501.js:375-379 (IQ function):
 * - Converts string values to boolean (true)
 * - Accepts: "1", "true", "yes", "on" (case-insensitive)
 * - Returns false for undefined/empty values
 * 
 * @param {string|undefined} value - Environment variable value
 * @returns {boolean} True if value represents truthy
 */
export function parseTruthyEnvironmentVariable(value) {
    if (!value) return false;
    
    const normalized = value.toLowerCase().trim();
    return ["1", "true", "yes", "on"].includes(normalized);
}

/**
 * Parse falsy environment variable
 * 
 * Extracted from chunk_0501.js:381-385 (Pt0 function):
 * - Converts string values to boolean (false)
 * - Accepts: "0", "false", "no", "off" (case-insensitive)
 * - Returns false for undefined/empty values
 * 
 * @param {string|undefined} value - Environment variable value
 * @returns {boolean} True if value represents falsy
 */
export function parseFalsyEnvironmentVariable(value) {
    if (!value) return false;
    
    const normalized = value.toLowerCase().trim();
    return ["0", "false", "no", "off"].includes(normalized);
}

/**
 * Claude Code Environment Variable Registry
 * 
 * Complete registry of all environment variables used by Claude Code.
 * Extracted from comprehensive analysis of all chunks.
 */
export const CLAUDE_ENV_VARS = {
    // Authentication & API Configuration
    ANTHROPIC_API_KEY: 'ANTHROPIC_API_KEY',
    ANTHROPIC_AUTH_TOKEN: 'ANTHROPIC_AUTH_TOKEN', 
    CLAUDE_CODE_OAUTH_TOKEN: 'CLAUDE_CODE_OAUTH_TOKEN',
    ANTHROPIC_BASE_URL: 'ANTHROPIC_BASE_URL',
    ANTHROPIC_MODEL: 'ANTHROPIC_MODEL',
    ANTHROPIC_SMALL_FAST_MODEL: 'ANTHROPIC_SMALL_FAST_MODEL',
    ANTHROPIC_BETAS: 'ANTHROPIC_BETAS',
    ANTHROPIC_CUSTOM_HEADERS: 'ANTHROPIC_CUSTOM_HEADERS',

    // Provider-specific
    CLAUDE_CODE_USE_BEDROCK: 'CLAUDE_CODE_USE_BEDROCK',
    CLAUDE_CODE_USE_VERTEX: 'CLAUDE_CODE_USE_VERTEX',
    CLAUDE_CODE_SKIP_BEDROCK_AUTH: 'CLAUDE_CODE_SKIP_BEDROCK_AUTH',
    CLAUDE_CODE_SKIP_VERTEX_AUTH: 'CLAUDE_CODE_SKIP_VERTEX_AUTH',
    ANTHROPIC_BEDROCK_BASE_URL: 'ANTHROPIC_BEDROCK_BASE_URL',
    ANTHROPIC_VERTEX_BASE_URL: 'ANTHROPIC_VERTEX_BASE_URL',
    ANTHROPIC_VERTEX_PROJECT_ID: 'ANTHROPIC_VERTEX_PROJECT_ID',
    ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION: 'ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION',
    CLOUD_ML_REGION: 'CLOUD_ML_REGION',

    // Configuration & Behavior
    CLAUDE_CONFIG_DIR: 'CLAUDE_CONFIG_DIR',
    CLAUDE_CODE_MAX_RETRIES: 'CLAUDE_CODE_MAX_RETRIES',
    CLAUDE_CODE_MAX_OUTPUT_TOKENS: 'CLAUDE_CODE_MAX_OUTPUT_TOKENS',
    CLAUDE_CODE_EXTRA_BODY: 'CLAUDE_CODE_EXTRA_BODY',
    CLAUDE_CODE_SUBAGENT_MODEL: 'CLAUDE_CODE_SUBAGENT_MODEL',
    CLAUDE_CODE_ENTRYPOINT: 'CLAUDE_CODE_ENTRYPOINT',

    // Feature Flags
    CLAUDE_CODE_DISABLE_AUTOCHECKPOINTING: 'CLAUDE_CODE_DISABLE_AUTOCHECKPOINTING',
    CLAUDE_CODE_DISABLE_TERMINAL_TITLE: 'CLAUDE_CODE_DISABLE_TERMINAL_TITLE',
    CLAUDE_CODE_DISABLE_FINE_GRAINED_TOOL_STREAMING: 'CLAUDE_CODE_DISABLE_FINE_GRAINED_TOOL_STREAMING',
    CLAUDE_CODE_DISABLE_COMMAND_INJECTION_CHECK: 'CLAUDE_CODE_DISABLE_COMMAND_INJECTION_CHECK',
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: 'CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC',
    DISABLE_PROMPT_CACHING: 'DISABLE_PROMPT_CACHING',
    DISABLE_INTERLEAVED_THINKING: 'DISABLE_INTERLEAVED_THINKING',
    DISABLE_AUTOUPDATER: 'DISABLE_AUTOUPDATER',
    DISABLE_TELEMETRY: 'DISABLE_TELEMETRY',
    DISABLE_ERROR_REPORTING: 'DISABLE_ERROR_REPORTING',
    DISABLE_COST_WARNINGS: 'DISABLE_COST_WARNINGS',
    DISABLE_MICROCOMPACT: 'DISABLE_MICROCOMPACT',
    USE_API_CONTEXT_MANAGEMENT: 'USE_API_CONTEXT_MANAGEMENT',

    // IDE & Shell Integration
    CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL: 'CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL',
    CLAUDE_CODE_IDE_HOST_OVERRIDE: 'CLAUDE_CODE_IDE_HOST_OVERRIDE',
    CLAUDE_CODE_IDE_SKIP_VALID_CHECK: 'CLAUDE_CODE_IDE_SKIP_VALID_CHECK',
    CLAUDE_CODE_AUTO_CONNECT_IDE: 'CLAUDE_CODE_AUTO_CONNECT_IDE',
    CLAUDE_CODE_SSE_PORT: 'CLAUDE_CODE_SSE_PORT',
    CLAUDE_CODE_SHELL_PREFIX: 'CLAUDE_CODE_SHELL_PREFIX',
    CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR: 'CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR',

    // Development & Debugging
    ANTHROPIC_LOG: 'ANTHROPIC_LOG',
    OTEL_LOG_USER_PROMPTS: 'OTEL_LOG_USER_PROMPTS',
    CLAUDE_CODE_ENABLE_TELEMETRY: 'CLAUDE_CODE_ENABLE_TELEMETRY',
    IS_DEMO: 'IS_DEMO',
    IS_SANDBOX: 'IS_SANDBOX',
    GITHUB_ACTIONS: 'GITHUB_ACTIONS',
    CLAUDE_CODE_ACTION: 'CLAUDE_CODE_ACTION',

    // Authentication Methods
    CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR: 'CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR',
    CLAUDE_CODE_SESSION_ACCESS_TOKEN: 'CLAUDE_CODE_SESSION_ACCESS_TOKEN',
    CLAUDE_CODE_API_KEY_HELPER_TTL_MS: 'CLAUDE_CODE_API_KEY_HELPER_TTL_MS',

    // Security
    CLAUDE_CODE_CLIENT_CERT: 'CLAUDE_CODE_CLIENT_CERT',
    CLAUDE_CODE_CLIENT_KEY: 'CLAUDE_CODE_CLIENT_KEY',
    CLAUDE_CODE_CLIENT_KEY_PASSPHRASE: 'CLAUDE_CODE_CLIENT_KEY_PASSPHRASE'
};

/**
 * Environment Variable Configuration Class
 * 
 * Provides structured access to Claude Code environment variables
 * with type conversion, validation, and default values.
 */
export class EnvironmentConfig {
    /**
     * Get authentication configuration from environment
     * 
     * @returns {Object} Authentication environment config
     */
    static getAuthConfig() {
        return {
            apiKey: getEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_API_KEY),
            authToken: getEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_AUTH_TOKEN),
            oauthToken: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_OAUTH_TOKEN),
            baseUrl: getEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_BASE_URL) ?? "https://api.anthropic.com",
            model: getEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_MODEL),
            smallFastModel: getEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_SMALL_FAST_MODEL),
            customHeaders: this.parseCustomHeaders(getEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_CUSTOM_HEADERS)),
            betas: this.parseCommaSeparated(getEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_BETAS))
        };
    }

    /**
     * Get provider configuration from environment
     * 
     * @returns {Object} Provider environment config
     */
    static getProviderConfig() {
        return {
            useBedrock: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_USE_BEDROCK)),
            useVertex: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_USE_VERTEX)),
            skipBedrockAuth: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_SKIP_BEDROCK_AUTH)),
            skipVertexAuth: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_SKIP_VERTEX_AUTH)),
            bedrockBaseUrl: getAWSEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_BEDROCK_BASE_URL),
            vertexBaseUrl: getVertexEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_VERTEX_BASE_URL),
            vertexProjectId: getVertexEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_VERTEX_PROJECT_ID),
            smallFastModelAwsRegion: getAWSEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION),
            cloudMlRegion: getVertexEnvironmentVariable(CLAUDE_ENV_VARS.CLOUD_ML_REGION)
        };
    }

    /**
     * Get configuration and behavior settings from environment
     * 
     * @returns {Object} Configuration environment settings
     */
    static getConfigSettings() {
        return {
            configDir: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CONFIG_DIR),
            maxRetries: this.parseInteger(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_MAX_RETRIES), 3),
            maxOutputTokens: this.parseInteger(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_MAX_OUTPUT_TOKENS), 4096),
            extraBody: this.parseJSON(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_EXTRA_BODY)),
            subagentModel: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_SUBAGENT_MODEL),
            entrypoint: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_ENTRYPOINT)
        };
    }

    /**
     * Get feature flags from environment
     * 
     * @returns {Object} Feature flags from environment
     */
    static getFeatureFlags() {
        return {
            disableAutocheckpointing: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_DISABLE_AUTOCHECKPOINTING)),
            disableTerminalTitle: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_DISABLE_TERMINAL_TITLE)),
            disableFineGrainedToolStreaming: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_DISABLE_FINE_GRAINED_TOOL_STREAMING)),
            disableCommandInjectionCheck: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_DISABLE_COMMAND_INJECTION_CHECK)),
            disableNonessentialTraffic: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC)),
            disablePromptCaching: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.DISABLE_PROMPT_CACHING)),
            disableInterleavedThinking: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.DISABLE_INTERLEAVED_THINKING)),
            disableAutoupdater: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.DISABLE_AUTOUPDATER)),
            disableTelemetry: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.DISABLE_TELEMETRY)),
            disableErrorReporting: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.DISABLE_ERROR_REPORTING)),
            disableCostWarnings: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.DISABLE_COST_WARNINGS)),
            disableMicrocompact: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.DISABLE_MICROCOMPACT)),
            useApiContextManagement: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.USE_API_CONTEXT_MANAGEMENT))
        };
    }

    /**
     * Get IDE and shell integration settings from environment
     * 
     * @returns {Object} IDE/shell environment settings
     */
    static getIntegrationSettings() {
        return {
            ideSkipAutoInstall: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL)),
            ideHostOverride: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_IDE_HOST_OVERRIDE),
            ideSkipValidCheck: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_IDE_SKIP_VALID_CHECK)),
            autoConnectIde: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_AUTO_CONNECT_IDE)),
            ssePort: this.parseInteger(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_SSE_PORT)),
            shellPrefix: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_SHELL_PREFIX),
            bashMaintainProjectWorkingDir: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR))
        };
    }

    /**
     * Get development and debugging settings from environment
     * 
     * @returns {Object} Development environment settings  
     */
    static getDevelopmentSettings() {
        return {
            logLevel: getEnvironmentVariable(CLAUDE_ENV_VARS.ANTHROPIC_LOG),
            logUserPrompts: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.OTEL_LOG_USER_PROMPTS)),
            enableTelemetry: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_ENABLE_TELEMETRY)),
            isDemo: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.IS_DEMO)),
            isSandbox: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.IS_SANDBOX)),
            isGithubActions: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.GITHUB_ACTIONS)),
            claudeCodeAction: parseTruthyEnvironmentVariable(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_ACTION))
        };
    }

    /**
     * Get security settings from environment
     * 
     * @returns {Object} Security environment settings
     */
    static getSecuritySettings() {
        return {
            clientCert: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_CLIENT_CERT),
            clientKey: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_CLIENT_KEY),
            clientKeyPassphrase: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_CLIENT_KEY_PASSPHRASE),
            websocketAuthFd: this.parseInteger(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR)),
            sessionAccessToken: getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_SESSION_ACCESS_TOKEN),
            apiKeyHelperTtl: this.parseInteger(getEnvironmentVariable(CLAUDE_ENV_VARS.CLAUDE_CODE_API_KEY_HELPER_TTL_MS), 300000)
        };
    }

    /**
     * Get all environment configuration
     * 
     * @returns {Object} Complete environment configuration
     */
    static getAll() {
        return {
            auth: this.getAuthConfig(),
            provider: this.getProviderConfig(),
            config: this.getConfigSettings(),
            features: this.getFeatureFlags(),
            integration: this.getIntegrationSettings(),
            development: this.getDevelopmentSettings(),
            security: this.getSecuritySettings()
        };
    }

    /**
     * Parse comma-separated values
     * 
     * @param {string|undefined} value - Comma-separated string
     * @returns {Array<string>} Parsed array
     */
    static parseCommaSeparated(value) {
        if (!value) return [];
        return value.split(',').map(v => v.trim()).filter(Boolean);
    }

    /**
     * Parse JSON string safely
     * 
     * @param {string|undefined} value - JSON string
     * @returns {Object|null} Parsed object or null
     */
    static parseJSON(value) {
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    }

    /**
     * Parse integer with default
     * 
     * @param {string|undefined} value - Integer string
     * @param {number} defaultValue - Default value
     * @returns {number} Parsed integer or default
     */
    static parseInteger(value, defaultValue = null) {
        if (!value) return defaultValue;
        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? defaultValue : parsed;
    }

    /**
     * Parse custom headers from string
     * 
     * @param {string|undefined} value - Headers string
     * @returns {Object} Parsed headers object
     */
    static parseCustomHeaders(value) {
        if (!value) return {};
        try {
            return JSON.parse(value);
        } catch {
            // Fall back to simple key=value parsing
            const headers = {};
            value.split(',').forEach(header => {
                const [key, ...valueParts] = header.trim().split('=');
                if (key && valueParts.length > 0) {
                    headers[key.trim()] = valueParts.join('=').trim();
                }
            });
            return headers;
        }
    }
}

// Export singleton for easy access
export const environmentConfig = EnvironmentConfig.getAll();