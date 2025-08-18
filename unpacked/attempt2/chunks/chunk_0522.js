/* chunk:522 bytes:[12331355, 12348083) size:16728 source:unpacked-cli.js */
var zG4 = h.object({
        allow: h.array(P40()).optional().describe("List of permission rules for allowed operations"),
        deny: h.array(P40()).optional().describe("List of permission rules for denied operations"),
        ask: h.array(P40()).optional().describe("List of permission rules that should always prompt for confirmation"),
        defaultMode: h.enum($q1).optional().describe("Default permission mode when Claude Code needs access"),
        disableBypassPermissionsMode: h.enum(["disable"]).optional().describe("Disable the ability to bypass permission prompts"),
        additionalDirectories: h.array(h.string()).optional().describe("Additional directories to include in the permission scope")
    }).passthrough(),
    EG4 = h.object({
        type: h.literal("command").describe('Hook type (currently only "command" is supported)'),
        command: h.string().describe("Shell command to execute"),
        timeout: h.number().positive().optional().describe("Timeout in seconds for this specific command")
    }),
    UG4 = h.object({
        matcher: h.string().optional().describe('String pattern to match (e.g. tool names like "Write")'),
        hooks: h.array(EG4).describe("List of hooks to execute when the matcher matches")
    }),
    S40 = h.record(h.enum(D12), h.array(UG4)),
    us = h.object({
        $schema: h.literal(qeA).optional().describe("JSON Schema reference for Claude Code settings"),
        apiKeyHelper: h.string().optional().describe("Path to a script that outputs authentication values"),
        awsCredentialExport: h.string().optional().describe("Path to a script that exports AWS credentials"),
        awsAuthRefresh: h.string().optional().describe("Path to a script that refreshes AWS authentication"),
        cleanupPeriodDays: h.number().nonnegative().int().optional().describe("Number of days to retain chat transcripts (0 to disable cleanup)"),
        env: HG4.optional().describe("Environment variables to set for Claude Code sessions"),
        includeCoAuthoredBy: h.boolean().optional().describe("Whether to include Claude's co-authored by attribution in commits and PRs (defaults to true)"),
        permissions: zG4.optional().describe("Tool usage permissions configuration"),
        model: h.string().optional().describe("Override the default model used by Claude Code"),
        enableAllProjectMcpServers: h.boolean().optional().describe("Whether to automatically approve all MCP servers in the project"),
        enabledMcpjsonServers: h.array(h.string()).optional().describe("List of approved MCP servers from .mcp.json"),
        disabledMcpjsonServers: h.array(h.string()).optional().describe("List of rejected MCP servers from .mcp.json"),
        hooks: S40.optional().describe("Custom commands to run before/after tool executions"),
        disableAllHooks: h.boolean().optional().describe("Disable all hooks and statusLine execution"),
        statusLine: h.object({
            type: h.literal("command"),
            command: h.string(),
            padding: h.number().optional()
        }).optional().describe("Custom status line display configuration"),
        enabledPlugins: h.record(h.array(h.string())).optional().describe("Enabled plugins by repository. Keys are repository names, values are arrays of enabled plugin names"),
        forceLoginMethod: h.enum(["claudeai", "console"]).optional().describe('Force a specific login method: "claudeai" for Claude Pro/Max, "console" for Console billing'),
        otelHeadersHelper: h.string().optional().describe("Path to a script that outputs OpenTelemetry headers"),
        outputStyle: h.string().optional().describe("Controls the output style for assistant responses")
    }).passthrough();
import {
    join as W12
} from "path";
import {
    homedir as J12
} from "os";
async function wG4(A, B) {
    let {
        code: Q
    } = await s5("git", ["check-ignore", A], {
        preserveOutputOnError: !1,
        cwd: B
    });
    return Q === 0
}

function $G4() {
    return W12(J12(), ".config", "git", "ignore")
}
async function ms(A, B = t0()) {
    try {
        if (!await FeA(B)) return;
        let Q = `**/${A}`;
        if (await wG4(A, B)) return;
        let Z = $G4(),
            D = j1(),
            G = W12(J12(), ".config", "git");
        if (!D.existsSync(G)) D.mkdirSync(G);
        if (D.existsSync(Z)) D.appendFileSync(Z, `
${Q}
`);
        else D.appendFileSync(Z, `${Q}
`)
    } catch (Q) {
        R1(Q instanceof Error ? Q : new Error(String(Q)))
    }
}
var qG4 = [{
        matches: (A) => A.path === "permissions.defaultMode" && A.code === "invalid_enum_value",
        tip: {
            suggestion: 'Valid modes: "acceptEdits" (ask before file changes), "plan" (analysis only), "bypassPermissions" (auto-accept all), or "default" (standard behavior)',
            docLink: "https://docs.anthropic.com/en/docs/claude-code/iam#permission-modes"
        }
    }, {
        matches: (A) => A.path === "apiKeyHelper" && A.code === "invalid_type",
        tip: {
            suggestion: 'Provide a shell command that outputs your API key to stdout. The script should output only the API key. Example: "/bin/generate_temp_api_key.sh"'
        }
    }, {
        matches: (A) => A.path === "cleanupPeriodDays" && A.code === "too_small" && A.expected === "0",
        tip: {
            suggestion: "Must be 0 or greater. Use 0 to disable automatic cleanup and keep chat transcripts forever, or set a positive number for days to retain (default is 30 days)"
        }
    }, {
        matches: (A) => A.path.startsWith("env.") && A.code === "invalid_type",
        tip: {
            suggestion: 'Environment variables must be strings. Wrap numbers and booleans in quotes. Example: "DEBUG": "true", "PORT": "3000"',
            docLink: "https://docs.anthropic.com/en/docs/claude-code/settings#environment-variables"
        }
    }, {
        matches: (A) => (A.path === "permissions.allow" || A.path === "permissions.deny") && A.code === "invalid_type" && A.expected === "array",
        tip: {
            suggestion: 'Permission rules must be in an array. Format: ["Tool(specifier)"]. Examples: ["Bash(npm run build)", "Edit(docs/**)", "Read(~/.zshrc)"]. Use * for wildcards.'
        }
    }, {
        matches: (A) => A.path.includes("hooks") && A.code === "invalid_type",
        tip: {
            suggestion: 'Hooks use a new format with matchers. Example: {"PostToolUse": [{"matcher": {"tools": ["BashTool"]}, "hooks": [{"type": "command", "command": "echo Done"}]}]}'
        }
    }, {
        matches: (A) => A.code === "invalid_type" && A.expected === "boolean",
        tip: {
            suggestion: 'Use true or false without quotes. Example: "includeCoAuthoredBy": true'
        }
    }, {
        matches: (A) => A.code === "unrecognized_keys",
        tip: {
            suggestion: "Check for typos or refer to the documentation for valid fields",
            docLink: "https://docs.anthropic.com/en/docs/claude-code/settings"
        }
    }, {
        matches: (A) => A.code === "invalid_enum_value" && A.enumValues !== void 0,
        tip: {
            suggestion: void 0
        }
    }, {
        matches: (A) => A.code === "invalid_type" && A.expected === "object" && A.received === null && A.path === "",
        tip: {
            suggestion: "Check for missing commas, unmatched brackets, or trailing commas. Use a JSON validator to identify the exact syntax error."
        }
    }, {
        matches: (A) => A.path === "permissions.additionalDirectories" && A.code === "invalid_type",
        tip: {
            suggestion: 'Must be an array of directory paths. Example: ["~/projects", "/tmp/workspace"]. You can also use --add-dir flag or /add-dir command',
            docLink: "https://docs.anthropic.com/en/docs/claude-code/iam#working-directories"
        }
    }],
    NG4 = {
        permissions: "https://docs.anthropic.com/en/docs/claude-code/iam#configuring-permissions",
        env: "https://docs.anthropic.com/en/docs/claude-code/settings#environment-variables",
        hooks: "https://docs.anthropic.com/en/docs/claude-code/hooks"
    };

function X12(A) {
    let B = qG4.find((Z) => Z.matches(A));
    if (!B) return null;
    let Q = {
        ...B.tip
    };
    if (A.code === "invalid_enum_value" && A.enumValues && !Q.suggestion) Q.suggestion = `Valid values: ${A.enumValues.map((Z)=>`"${Z}"`).join(", ")}`;
    if (!Q.docLink && A.path) {
        let Z = A.path.split(".")[0];
        if (Z) Q.docLink = NG4[Z]
    }
    return Q
}
var C12 = Symbol("Let zodToJsonSchema decide on which parser to use");
var V12 = {
        name: void 0,
        $refStrategy: "root",
        basePath: ["#"],
        effectStrategy: "input",
        pipeStrategy: "all",
        dateStrategy: "format:date-time",
        mapStrategy: "entries",
        removeAdditionalStrategy: "passthrough",
        allowedAdditionalProperties: !0,
        rejectedAdditionalProperties: !1,
        definitionPath: "definitions",
        target: "jsonSchema7",
        strictUnions: !1,
        definitions: {},
        errorMessages: !1,
        markdownDescription: !1,
        patternStrategy: "escape",
        applyRegexFlags: !1,
        emailStrategy: "format:email",
        base64Strategy: "contentEncoding:base64",
        nameStrategy: "ref"
    },
    K12 = (A) => typeof A === "string" ? {
        ...V12,
        name: A
    } : {
        ...V12,
        ...A
    };
var H12 = (A) => {
    let B = K12(A),
        Q = B.name !== void 0 ? [...B.basePath, B.definitionPath, B.name] : B.basePath;
    return {
        ...B,
        currentPath: Q,
        propertyPath: void 0,
        seen: new Map(Object.entries(B.definitions).map(([Z, D]) => [D._def, {
            def: D._def,
            path: [...B.basePath, B.definitionPath, Z],
            jsonSchema: void 0
        }]))
    }
};

function j40(A, B, Q, Z) {
    if (!Z?.errorMessages) return;
    if (Q) A.errorMessage = {
        ...A.errorMessage,
        [B]: Q
    }
}

function n6(A, B, Q, Z, D) {
    A[B] = Q, j40(A, B, Z, D)
}

function z12() {
    return {}
}

function E12(A, B) {
    let Q = {
        type: "array"
    };
    if (A.type?._def && A.type?._def?.typeName !== A2.ZodAny) Q.items = wQ(A.type._def, {
        ...B,
        currentPath: [...B.currentPath, "items"]
    });
    if (A.minLength) n6(Q, "minItems", A.minLength.value, A.minLength.message, B);
    if (A.maxLength) n6(Q, "maxItems", A.maxLength.value, A.maxLength.message, B);
    if (A.exactLength) n6(Q, "minItems", A.exactLength.value, A.exactLength.message, B), n6(Q, "maxItems", A.exactLength.value, A.exactLength.message, B);
    return Q
}

function U12(A, B) {
    let Q = {
        type: "integer",
        format: "int64"
    };
    if (!A.checks) return Q;
    for (let Z of A.checks) switch (Z.kind) {
        case "min":
            if (B.target === "jsonSchema7")
                if (Z.inclusive) n6(Q, "minimum", Z.value, Z.message, B);
                else n6(Q, "exclusiveMinimum", Z.value, Z.message, B);
            else {
                if (!Z.inclusive) Q.exclusiveMinimum = !0;
                n6(Q, "minimum", Z.value, Z.message, B)
            }
            break;
        case "max":
            if (B.target === "jsonSchema7")
                if (Z.inclusive) n6(Q, "maximum", Z.value, Z.message, B);
                else n6(Q, "exclusiveMaximum", Z.value, Z.message, B);
            else {
                if (!Z.inclusive) Q.exclusiveMaximum = !0;
                n6(Q, "maximum", Z.value, Z.message, B)
            }
            break;
        case "multipleOf":
            n6(Q, "multipleOf", Z.value, Z.message, B);
            break
    }
    return Q
}

function w12() {
    return {
        type: "boolean"
    }
}

function kq1(A, B) {
    return wQ(A.type._def, B)
}
var $12 = (A, B) => {
    return wQ(A.innerType._def, B)
};

function k40(A, B, Q) {
    let Z = Q ?? B.dateStrategy;
    if (Array.isArray(Z)) return {
        anyOf: Z.map((D, G) => k40(A, B, D))
    };
    switch (Z) {
        case "string":
        case "format:date-time":
            return {
                type: "string", format: "date-time"
            };
        case "format:date":
            return {
                type: "string", format: "date"
            };
        case "integer":
            return LG4(A, B)
    }
}
var LG4 = (A, B) => {
    let Q = {
        type: "integer",
        format: "unix-time"
    };
    if (B.target === "openApi3") return Q;
    for (let Z of A.checks) switch (Z.kind) {
        case "min":
            n6(Q, "minimum", Z.value, Z.message, B);
            break;
        case "max":
            n6(Q, "maximum", Z.value, Z.message, B);
            break
    }
    return Q
};

function q12(A, B) {
    return {
        ...wQ(A.innerType._def, B),
        default: A.defaultValue()
    }
}

function N12(A, B) {
    return B.effectStrategy === "input" ? wQ(A.schema._def, B) : {}
}

function L12(A) {
    return {
        type: "string",
        enum: Array.from(A.values)
    }
}
var MG4 = (A) => {
    if ("type" in A && A.type === "string") return !1;
    return "allOf" in A
};

function M12(A, B) {
    let Q = [wQ(A.left._def, {
            ...B,
            currentPath: [...B.currentPath, "allOf", "0"]
        }), wQ(A.right._def, {
            ...B,
            currentPath: [...B.currentPath, "allOf", "1"]
        })].filter((G) => !!G),
        Z = B.target === "jsonSchema2019-09" ? {
            unevaluatedProperties: !1
        } : void 0,
        D = [];
    return Q.forEach((G) => {
        if (MG4(G)) {
            if (D.push(...G.allOf), G.unevaluatedProperties === void 0) Z = void 0
        } else {
            let F = G;
            if ("additionalProperties" in G && G.additionalProperties === !1) {
                let {
                    additionalProperties: I,
                    ...Y
                } = G;
                F = Y
            } else Z = void 0;
            D.push(F)
        }
    }), D.length ? {
        allOf: D,
        ...Z
    } : void 0
}

function R12(A, B) {
    let Q = typeof A.value;
    if (Q !== "bigint" && Q !== "number" && Q !== "boolean" && Q !== "string") return {
        type: Array.isArray(A.value) ? "array" : "object"
    };
    if (B.target === "openApi3") return {
        type: Q === "bigint" ? "integer" : Q,
        enum: [A.value]
    };
    return {
        type: Q === "bigint" ? "integer" : Q,
        const: A.value
    }
}
var y40 = void 0,
    nw = {
        cuid: /^[cC][^\s-]{8,}$/,
        cuid2: /^[0-9a-z]+$/,
        ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
        email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
        emoji: () => {
            if (y40 === void 0) y40 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
            return y40
        },
        uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
        ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
        ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
        ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
        ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
        base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
        base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
        nanoid: /^[a-zA-Z0-9_-]{21}$/,
        jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
    };