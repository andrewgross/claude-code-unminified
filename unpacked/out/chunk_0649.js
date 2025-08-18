/* chunk:649 bytes:[14673303, 14708080) size:34777 source:unpacked-cli.js */
async function dT8() {
    hT8();
    let A = new scB;
    A.name("claude").description("Claude Code - starts an interactive session by default, use -p/--print for non-interactive output").argument("[prompt]", "Your prompt", String).helpOption("-h, --help", "Display help for command").option("-d, --debug", "Enable debug mode", () => !0).addOption(new PU("-d2e, --debug-to-stderr", "Enable debug mode (to stderr)").argParser(Boolean).hideHelp()).option("--verbose", "Override verbose mode setting from config", () => !0).option("-p, --print", "Print response and exit (useful for pipes)", () => !0).addOption(new PU("--output-format <format>", 'Output format (only works with --print): "text" (default), "json" (single result), or "stream-json" (realtime streaming)').choices(["text", "json", "stream-json"])).addOption(new PU("--input-format <format>", 'Input format (only works with --print): "text" (default), or "stream-json" (realtime streaming input)').choices(["text", "stream-json"])).option("--mcp-debug", "[DEPRECATED. Use --debug instead] Enable MCP debug mode (shows MCP server errors)", () => !0).option("--dangerously-skip-permissions", "Bypass all permission checks. Recommended only for sandboxes with no internet access.", () => !0).addOption(new PU("--max-turns <turns>", "Maximum number of agentic turns in non-interactive mode. This will early exit the conversation after the specified number of turns. (only works with --print)").argParser(Number).hideHelp()).option("--allowedTools <tools...>", 'Comma or space-separated list of tool names to allow (e.g. "Bash(git:*) Edit")').option("--disallowedTools <tools...>", 'Comma or space-separated list of tool names to deny (e.g. "Bash(git:*) Edit")').option("--mcp-config <configs...>", "Load MCP servers from JSON files or strings (space-separated)").addOption(new PU("--permission-prompt-tool <tool>", "MCP tool to use for permission prompts (only works with --print)").argParser(String).hideHelp()).addOption(new PU("--system-prompt <prompt>", "System prompt to use for the session  (only works with --print)").argParser(String).hideHelp()).addOption(new PU("--system-prompt-file <file>", "Read system prompt from a file (only works with --print)").argParser(String).hideHelp()).addOption(new PU("--append-system-prompt <prompt>", "Append a system prompt to the default system prompt").argParser(String)).addOption(new PU("--permission-mode <mode>", "Permission mode to use for the session").argParser(String).choices($q1)).option("-c, --continue", "Continue the most recent conversation", () => !0).option("-r, --resume [sessionId]", "Resume a conversation - provide a session ID or interactively select a conversation to resume", (Z) => Z || !0).option("--model <model>", "Model for the current session. Provide an alias for the latest model (e.g. 'sonnet' or 'opus') or a model's full name (e.g. 'claude-sonnet-4-20250514').").option("--fallback-model <model>", "Enable automatic fallback to specified model when default model is overloaded (only works with --print)").option("--settings <file-or-json>", "Path to a settings JSON file or a JSON string to load additional settings from").option("--add-dir <directories...>", "Additional directories to allow tool access to").option("--ide", "Automatically connect to IDE on startup if exactly one valid IDE is available", () => !0).option("--strict-mcp-config", "Only use MCP servers from --mcp-config, ignoring all other MCP configurations", () => !0).option("--session-id <uuid>", "Use a specific session ID for the conversation (must be a valid UUID)").action(async (Z, D) => {
        if (Z === "code") X1("tengu_code_prompt_ignored", {}), console.warn(e1.yellow("Tip: You can launch Claude Code with just `claude`")), Z = void 0;
        let {
            debug: G = !1,
            debugToStderr: F = !1,
            dangerouslySkipPermissions: I,
            allowedTools: Y = [],
            disallowedTools: W = [],
            mcpConfig: J = [],
            permissionMode: X,
            addDir: V = [],
            fallbackModel: C,
            ide: K = !1,
            sessionId: H,
            settings: z
        } = D, $ = D.outputFormat, L = D.inputFormat, N = D.verbose, R = D.print;
        if (z) try {
            let o1 = z.trim(),
                e = o1.startsWith("{") && o1.endsWith("}"),
                Z1;
            if (e) {
                if (!T7(o1)) process.stderr.write(e1.red(`Error: Invalid JSON provided to --settings
`)), process.exit(1);
                let {
                    generateTempFilePath: U1
                } = await Promise.resolve().then(() => (mT0(), ZcB)), {
                    writeFileSync: O1
                } = await import("fs");
                Z1 = U1("claude-settings", ".json"), O1(Z1, o1, "utf8")
            } else {
                let {
                    resolvedPath: I1
                } = XV(j1(), z);
                if (!EP0(I1)) process.stderr.write(e1.red(`Error: Settings file not found: ${I1}
`)), process.exit(1);
                Z1 = I1
            }
            ok0(Z1), F81()
        } catch (o1) {
            process.stderr.write(e1.red(`Error processing settings: ${o1 instanceof Error?o1.message:String(o1)}
`)), process.exit(1)
        }
        let O = D.strictMcpConfig || !1,
            P = !1,
            j = void 0;
        if (j) {
            if (!L) L = "stream-json";
            if (!$) $ = "stream-json";
            if (!D.verbose) N = !0;
            if (!D.print) R = !0
        }
        let f = D.teleport ?? null,
            k = D.remote ?? null;
        if (H) {
            if (D.continue || D.resume) process.stderr.write(e1.red(`Error: --session-id cannot be used with --continue or --resume.
`)), process.exit(1);
            let o1 = VK(H);
            if (!o1) process.stderr.write(e1.red(`Error: Invalid session ID. Must be a valid UUID.
`)), process.exit(1);
            if (XeA(o1)) process.stderr.write(e1.red(`Error: Session ID ${o1} is already in use.
`)), process.exit(1)
        }
        let c = Nl();
        if (C && D.model && C === D.model) process.stderr.write(e1.red(`Error: Fallback model cannot be the same as the main model. Please specify a different model for --fallback-model.
`)), process.exit(1);
        let u = D.systemPrompt;
        if (D.systemPromptFile) {
            if (D.systemPrompt) process.stderr.write(e1.red(`Error: Cannot use both --system-prompt and --system-prompt-file. Please use only one.
`)), process.exit(1);
            try {
                let o1 = ilB(D.systemPromptFile);
                if (!EP0(o1)) process.stderr.write(e1.red(`Error: System prompt file not found: ${o1}
`)), process.exit(1);
                u = _T8(o1, "utf8")
            } catch (o1) {
                process.stderr.write(e1.red(`Error reading system prompt file: ${o1 instanceof Error?o1.message:String(o1)}
`)), process.exit(1)
            }
        }
        let a = L5B({
                permissionModeCli: X,
                dangerouslySkipPermissions: I
            }),
            l = void 0;
        if (J && J.length > 0) {
            let o1 = J.map((I1) => I1.trim()).filter((I1) => I1.length > 0),
                e = {},
                Z1 = [];
            for (let I1 of o1) {
                let U1 = null,
                    O1 = [],
                    B1 = T7(I1);
                if (B1) {
                    let x1 = t61({
                        configObject: B1,
                        filePath: "command line",
                        expandVars: !0,
                        scope: "dynamic"
                    });
                    if (x1.config) U1 = x1.config.mcpServers;
                    else O1 = x1.errors
                } else {
                    let x1 = ilB(I1),
                        c1 = g40({
                            filePath: x1,
                            expandVars: !0,
                            scope: "dynamic"
                        });
                    if (c1.config) U1 = c1.config.mcpServers;
                    else O1 = c1.errors
                }
                if (O1.length > 0) Z1.push(...O1);
                else if (U1) e = {
                    ...e,
                    ...U1
                }
            }
            if (Z1.length > 0) {
                let I1 = Z1.map((U1) => `${U1.path?U1.path+": ":""}${U1.message}`).join(`
`);
                throw new Error(`Invalid MCP configuration:
${I1}`)
            }
            if (Object.keys(e).length > 0) l = ij(e, (I1) => ({
                ...I1,
                scope: "dynamic"
            }))
        }
        let {
            toolPermissionContext: y,
            warnings: t
        } = M5B({
            allowedToolsCli: Y,
            disallowedToolsCli: W,
            permissionMode: a,
            addDirs: V
        });
        t.forEach((o1) => {
            console.error(o1)
        }), oMB();
        let E1 = O ? {} : gz(),
            C1 = {
                ...l,
                ...E1
            };
        if (XL0(C1), L && L !== "text" && L !== "stream-json") console.error(`Error: Invalid input format "${L}".`), process.exit(1);
        if (L === "stream-json" && $ !== "stream-json") console.error("Error: --input-format=stream-json requires output-format=stream-json."), process.exit(1);
        if (j) {
            if (L !== "stream-json" || $ !== "stream-json") console.error("Error: --sdk-url requires both --input-format=stream-json and --output-format=stream-json."), process.exit(1)
        }
        let _1 = await mT8(Z || "", L ?? "text"),
            F0 = Qq(y, H0().todoFeatureEnabled);
        await Tb(Ob(), a, R ?? !1, P, H ? VK(H) : void 0);
        let [W0, {
            clients: g1 = [],
            tools: w1 = [],
            commands: Q1 = []
        }] = await Promise.all([Pg1(), _1 || c ? await XL0(C1) : {
            clients: [],
            tools: [],
            commands: []
        }]);
        if (!c) {
            let o1 = await vT8(a, W0);
            if (o1 && Z?.trim().toLowerCase() === "/login") Z = "";
            if (!o1) Nb1()
        }
        if (X1("tengu_init", {
                entrypoint: "claude",
                hasInitialPrompt: Boolean(Z),
                hasStdin: Boolean(_1),
                verbose: N,
                debug: G,
                debugToStderr: F,
                print: R,
                outputFormat: $,
                inputFormat: L,
                numAllowedTools: Y.length,
                numDisallowedTools: W.length,
                mcpClientCount: Object.keys(gz()).length,
                worktree: P
            }), ybB(), nb1(null, "initialization"), c) {
            if ($ === "stream-json" || $ === "json") Gi0(!0);
            ulB(_1, y, g1, W0, Q1, F0, w1, {
                continue: D.continue,
                resume: D.resume,
                verbose: N,
                outputFormat: $,
                permissionPromptToolName: D.permissionPromptTool,
                allowedTools: Y,
                maxTurns: D.maxTurns,
                systemPrompt: u,
                appendSystemPrompt: D.appendSystemPrompt,
                userSpecifiedModel: D.model,
                fallbackModel: C,
                teleport: f,
                sdkUrl: j
            });
            return
        }
        let k1 = uT8(!1);
        X1("tengu_startup_manual_model_config", {
            cli_flag: D.model,
            env_var: process.env.ANTHROPIC_MODEL,
            settings_file: (GB() || {}).model
        });
        let H1 = D.model || process.env.ANTHROPIC_MODEL || (GB() || {}).model;
        if (KB() && !aG() && H1 !== void 0 && H1.includes("opus")) console.error(e1.yellow("Claude Pro users are not currently able to use Opus in Claude Code. The current model is now Sonnet."));
        let A0 = D.model;
        R21(A0), xk0(Pw1() || null);
        let V0 = {
            verbose: N ?? !1,
            mainLoopModel: dW1(),
            todoFeatureEnabled: H0().todoFeatureEnabled,
            toolPermissionContext: y,
            maxRateLimitFallbackActive: !1,
            checkpointing: {
                status: "uninitialized",
                saving: !1,
                checkpoints: {},
                shadowRepoPath: void 0,
                autocheckpointEnabled: !1
            },
            mcp: {
                clients: [],
                tools: [],
                commands: [],
                resources: {}
            },
            plugins: {
                enabled: [],
                disabled: [],
                commands: [],
                agents: []
            },
            statusLineText: void 0
        };
        if (ug1(y), bT8(), D.continue) try {
            X1("tengu_continue", {});
            let o1 = await Rb(void 0, w1);
            if (!o1) console.error("No conversation found to continue"), process.exit(1);
            let e = sE(CB());
            S8(m7.default.createElement(F7, {
                initialState: V0,
                onChangeAppState: Gc
            }, m7.default.createElement(_A1, {
                debug: G || F,
                initialPrompt: _1,
                commands: [...W0, ...Q1],
                initialTools: w1,
                initialMessages: o1.messages,
                initialTodos: e,
                initialCheckpoints: o1.log.checkpoints,
                mcpClients: g1,
                dynamicMcpConfig: l,
                autoConnectIdeFlag: K,
                strictMcpConfig: O,
                appendSystemPrompt: D.appendSystemPrompt
            })), k1)
        } catch (o1) {
            R1(o1 instanceof Error ? o1 : new Error(String(o1))), process.exit(1)
        } else if (D.resume || f || k) {
            let o1 = null,
                e = void 0,
                Z1 = VK(D.resume);
            if (k) {
                X1("tengu_remote_create_session", {
                    description_length: String(k.length)
                });
                let I1 = await hlB(k);
                if (!I1) X1("tengu_remote_create_session_error", {
                    error: "unable_to_create_session"
                }), process.stderr.write(e1.red(`Error: Unable to create remote session
`)), await P4(1), process.exit(1);
                X1("tengu_remote_create_session_success", {
                    session_id: I1.id
                }), process.stdout.write(`Created remote session: ${I1.title}
`), process.stdout.write(`View: https://claude.ai/code/${I1.id}
`), process.stdout.write(`Resume with: claude --teleport ${I1.id}
`), await P4(0), process.exit(0)
            } else if (f) {
                if (f === !0 || f === "") {
                    X1("tengu_teleport_interactive_mode", {});
                    let I1 = await glB();
                    if (!I1) await P4(0), process.exit(0);
                    o1 = I1.messages
                } else if (typeof f === "string") X1("tengu_teleport_resume_session", {
                    mode: "direct"
                }), o1 = (await flB(f, async (U1) => {
                    if (U1 instanceof kY) process.stderr.write(U1.formattedMessage);
                    else process.stderr.write(`Error: ${U1.message}
`);
                    await P4(1)
                })).messages
            }
            if (Z1) {
                let I1 = Z1;
                try {
                    let U1 = await Rb(I1, w1);
                    if (!U1) console.error(`No conversation found with session ID: ${I1}`), process.exit(1);
                    o1 = U1.messages, e = U1.log.checkpoints
                } catch (U1) {
                    R1(U1 instanceof Error ? U1 : new Error(String(U1))), console.error(`Failed to resume session ${I1}`), process.exit(1)
                }
            }
            if (Array.isArray(o1)) S8(m7.default.createElement(F7, {
                initialState: V0,
                onChangeAppState: Gc
            }, m7.default.createElement(_A1, {
                debug: G || F,
                initialPrompt: _1,
                commands: [...W0, ...Q1],
                initialTools: w1,
                initialMessages: o1,
                initialCheckpoints: e,
                mcpClients: g1,
                dynamicMcpConfig: l,
                autoConnectIdeFlag: K,
                strictMcpConfig: O,
                appendSystemPrompt: D.appendSystemPrompt
            })), k1);
            else {
                let I1 = {},
                    U1 = await ko();
                if (!U1.length) console.error("No conversations found to resume"), process.exit(1);
                let {
                    unmount: O1
                } = S8(m7.default.createElement(ZlB, {
                    commands: [...W0, ...Q1],
                    context: I1,
                    debug: G || F,
                    logs: U1,
                    initialTools: w1,
                    mcpClients: g1,
                    dynamicMcpConfig: l,
                    appState: V0,
                    onChangeAppState: Gc,
                    strictMcpConfig: O,
                    appendSystemPrompt: D.appendSystemPrompt
                }), k1);
                I1.unmount = O1
            }
        } else {
            let o1 = sE(CB()),
                e = await WU("startup");
            S8(m7.default.createElement(F7, {
                initialState: V0,
                onChangeAppState: Gc
            }, m7.default.createElement(_A1, {
                debug: G || F,
                commands: [...W0, ...Q1],
                initialPrompt: _1,
                initialTools: w1,
                initialMessages: e,
                initialTodos: o1,
                mcpClients: g1,
                dynamicMcpConfig: l,
                autoConnectIdeFlag: K,
                strictMcpConfig: O,
                appendSystemPrompt: D.appendSystemPrompt
            })), k1)
        }
    }).version(`${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION} (Claude Code)`, "-v, --version", "Output the version number"), A.addOption(new PU("--teleport [session]", "Resume a teleport session, optionally specify session ID").hideHelp()), A.addOption(new PU("--remote <description>", "Create a remote session with the given description").hideHelp());
    let B = A.command("config").description("Manage configuration (eg. claude config set -g theme dark)").helpOption("-h, --help", "Display help for command");
    B.command("get <key>").description("Get a config value").option("-g, --global", "Use global config").helpOption("-h, --help", "Display help for command").action(async (Z, {
        global: D
    }) => {
        await Tb(Ob(), "default", !1, !1, void 0), X1("tengu_config_get", {
            key: Z,
            global: D
        }), lD(JSON.stringify(XN2(Z, D ?? !1)) + `
`), process.exit(0)
    }), B.command("set <key> <value>").description("Set a config value").option("-g, --global", "Use global config").helpOption("-h, --help", "Display help for command").action(async (Z, D, {
        global: G
    }) => {
        await Tb(Ob(), "default", !1, !1, void 0), X1("tengu_config_set", {
            key: Z,
            global: G
        }), VN2(Z, D, G ?? !1), lD(`Set ${Z} to ${D}
`), process.exit(0)
    }), B.command("remove <key> [values...]").alias("rm").description("Remove a config value or items from a config array").option("-g, --global", "Use global config").helpOption("-h, --help", "Display help for command").action(async (Z, D, {
        global: G
    }) => {
        if (await Tb(Ob(), "default", !1, !1, void 0), _o(Z, G ?? !1) && D && D.length > 0) {
            let F = D.flatMap((I) => I.includes(",") ? I.split(",") : I).map((I) => I.trim()).filter((I) => I.length > 0);
            if (F.length === 0) console.error("Error: No valid values provided"), process.exit(1);
            X1("tengu_config_remove", {
                key: Z,
                global: G,
                count: D.length
            }), FN2(Z, F, G ?? !1, !1), console.log(`Removed from ${Z} in ${G?"global":"project"} config: ${F.join(", ")}`)
        } else X1("tengu_config_delete", {
            key: Z,
            global: G
        }), CN2(Z, G ?? !1), lD(JSON.stringify(`Removed ${Z}`) + `
`);
        process.exit(0)
    }), B.command("list").alias("ls").description("List all config values").option("-g, --global", "Use global config", !1).helpOption("-h, --help", "Display help for command").action(async ({
        global: Z
    }) => {
        await Tb(Ob(), "default", !1, !1, void 0), X1("tengu_config_list", {
            global: Z
        }), lD(JSON.stringify(KN2(Z ?? !1), null, 2) + `
`), process.exit(0)
    }), B.command("add <key> <values...>").description("Add items to a config array (space or comma separated)").option("-g, --global", "Use global config").helpOption("-h, --help", "Display help for command").action(async (Z, D, {
        global: G
    }) => {
        await Tb(Ob(), "default", !1, !1, void 0);
        let F = D.flatMap((I) => I.includes(",") ? I.split(",") : I).map((I) => I.trim()).filter((I) => I.length > 0);
        if (F.length === 0) console.error("Error: No valid values provided"), process.exit(1);
        X1("tengu_config_add", {
            key: Z,
            global: G,
            count: D.length
        }), TR1(Z, F, G ?? !1, !1), console.log(`Added to ${Z} in ${G?"global":"project"} config: ${F.join(", ")}`), process.exit(0)
    });
    let Q = A.command("mcp").description("Configure and manage MCP servers").helpOption("-h, --help", "Display help for command");
    return Q.command("serve").description("Start the Claude Code MCP server").helpOption("-h, --help", "Display help for command").option("-d, --debug", "Enable debug mode", () => !0).option("--verbose", "Override verbose mode setting from config", () => !0).action(async ({
        debug: Z,
        verbose: D
    }) => {
        let G = Ob();
        if (X1("tengu_mcp_start", {}), !EP0(G)) console.error(`Error: Directory ${G} does not exist`), process.exit(1);
        try {
            await Tb(G, "default", !1, !1, void 0), await IlB(G, Z ?? !1, D ?? !1)
        } catch (F) {
            console.error("Error: Failed to start MCP server:", F), process.exit(1)
        }
    }), Q.command("add <name> <commandOrUrl> [args...]").description("Add a server").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").option("-t, --transport <transport>", "Transport type (stdio, sse, http)", "stdio").option("-e, --env <env...>", "Set environment variables (e.g. -e KEY=value)").option("-H, --header <header...>", 'Set WebSocket headers (e.g. -H "X-Api-Key: abc123" -H "X-Custom: value")').helpOption("-h, --help", "Display help for command").action(async (Z, D, G, F) => {
        if (!Z) console.error("Error: Server name is required."), console.error("Usage: claude mcp add <name> <command> [args...]"), process.exit(1);
        else if (!D) console.error("Error: Command is required when server name is provided."), console.error("Usage: claude mcp add <name> <command> [args...]"), process.exit(1);
        try {
            let I = l61(F.scope),
                Y = meA(F.transport);
            if (X1("tengu_mcp_add", {
                    type: Y,
                    scope: I,
                    source: "command",
                    transport: Y
                }), Y === "sse") {
                if (!D) console.error("Error: URL is required for SSE transport."), process.exit(1);
                let W = F.header ? C40(F.header) : void 0;
                if (gg(Z, {
                        type: "sse",
                        url: D,
                        headers: W
                    }, I), process.stdout.write(`Added SSE MCP server ${Z} with URL: ${D} to ${I} config
`), W) process.stdout.write(`Headers: ${JSON.stringify(W,null,2)}
`)
            } else if (Y === "http") {
                if (!D) console.error("Error: URL is required for HTTP transport."), process.exit(1);
                let W = F.header ? C40(F.header) : void 0;
                if (gg(Z, {
                        type: "http",
                        url: D,
                        headers: W
                    }, I), process.stdout.write(`Added HTTP MCP server ${Z} with URL: ${D} to ${I} config
`), W) process.stdout.write(`Headers: ${JSON.stringify(W,null,2)}
`)
            } else {
                let W = St0(F.env);
                gg(Z, {
                    type: "stdio",
                    command: D,
                    args: G || [],
                    env: W
                }, I), process.stdout.write(`Added stdio MCP server ${Z} with command: ${D} ${(G||[]).join(" ")} to ${I} config
`)
            }
            process.stdout.write(`File modified: ${zK(I)}
`), process.exit(0)
        } catch (I) {
            console.error(I.message), process.exit(1)
        }
    }), Q.command("remove <name>").description("Remove an MCP server").option("-s, --scope <scope>", "Configuration scope (local, user, or project) - if not specified, removes from whichever scope it exists in").helpOption("-h, --help", "Display help for command").action(async (Z, D) => {
        try {
            if (D.scope) {
                let J = l61(D.scope);
                X1("tengu_mcp_delete", {
                    name: Z,
                    scope: J
                }), h40(Z, J), process.stdout.write(`Removed MCP server ${Z} from ${J} config
`), process.stdout.write(`File modified: ${zK(J)}
`), process.exit(0)
            }
            let G = UQ(),
                F = H0(),
                {
                    servers: I
                } = ZG("project"),
                Y = !!I[Z],
                W = [];
            if (G.mcpServers?.[Z]) W.push("local");
            if (Y) W.push("project");
            if (F.mcpServers?.[Z]) W.push("user");
            if (W.length === 0) process.stderr.write(`No MCP server found with name: "${Z}"
`), process.exit(1);
            else if (W.length === 1) {
                let J = W[0];
                X1("tengu_mcp_delete", {
                    name: Z,
                    scope: J
                }), h40(Z, J), process.stdout.write(`Removed MCP server "${Z}" from ${J} config
`), process.stdout.write(`File modified: ${zK(J)}
`), process.exit(0)
            } else process.stderr.write(`MCP server "${Z}" exists in multiple scopes:
`), W.forEach((J) => {
                process.stderr.write(`  - ${yg(J)} (${zK(J)})
`)
            }), process.stderr.write(`
To remove from a specific scope, use:
`), W.forEach((J) => {
                process.stderr.write(`  claude mcp remove "${Z}" -s ${J}
`)
            }), process.exit(1)
        } catch (G) {
            process.stderr.write(`${G.message}
`), process.exit(1)
        }
    }), Q.command("list").description("List configured MCP servers").helpOption("-h, --help", "Display help for command").action(async () => {
        X1("tengu_mcp_list", {});
        let Z = gz();
        if (Object.keys(Z).length === 0) console.log("No MCP servers configured. Use `claude mcp add` to add a server.");
        else {
            console.log(`Checking MCP server health...
`);
            for (let [D, G] of Object.entries(Z)) {
                let F = await nlB(D, G);
                if (G.type === "sse") console.log(`${D}: ${G.url} (SSE) - ${F}`);
                else if (G.type === "http") console.log(`${D}: ${G.url} (HTTP) - ${F}`);
                else if (!G.type || G.type === "stdio") {
                    let I = Array.isArray(G.args) ? G.args : [];
                    console.log(`${D}: ${G.command} ${I.join(" ")} - ${F}`)
                }
            }
        }
        process.exit(0)
    }), Q.command("get <name>").description("Get details about an MCP server").helpOption("-h, --help", "Display help for command").action(async (Z) => {
        X1("tengu_mcp_get", {
            name: Z
        });
        let D = ds(Z);
        if (!D) console.error(`No MCP server found with name: ${Z}`), process.exit(1);
        console.log(`${Z}:`), console.log(`  Scope: ${yg(D.scope)}`);
        let G = await nlB(Z, D);
        if (console.log(`  Status: ${G}`), D.type === "sse") {
            if (console.log("  Type: sse"), console.log(`  URL: ${D.url}`), D.headers) {
                console.log("  Headers:");
                for (let [F, I] of Object.entries(D.headers)) console.log(`    ${F}: ${I}`)
            }
        } else if (D.type === "http") {
            if (console.log("  Type: http"), console.log(`  URL: ${D.url}`), D.headers) {
                console.log("  Headers:");
                for (let [F, I] of Object.entries(D.headers)) console.log(`    ${F}: ${I}`)
            }
        } else if (D.type === "stdio") {
            console.log("  Type: stdio"), console.log(`  Command: ${D.command}`);
            let F = Array.isArray(D.args) ? D.args : [];
            if (console.log(`  Args: ${F.join(" ")}`), D.env) {
                console.log("  Environment:");
                for (let [I, Y] of Object.entries(D.env)) console.log(`    ${I}=${Y}`)
            }
        }
        console.log(`
To remove this server, run: claude mcp remove "${Z}" -s ${D.scope}`), process.exit(0)
    }), Q.command("add-json <name> <json>").description("Add an MCP server (stdio or SSE) with a JSON string").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").helpOption("-h, --help", "Display help for command").action(async (Z, D, G) => {
        try {
            let F = l61(G.scope),
                I = T7(D);
            gg(Z, I, F);
            let Y = I && typeof I === "object" && "type" in I ? String(I.type || "stdio") : "stdio";
            X1("tengu_mcp_add", {
                scope: F,
                source: "json",
                type: Y
            }), console.log(`Added ${Y} MCP server ${Z} to ${F} config`), process.exit(0)
        } catch (F) {
            console.error(F.message), process.exit(1)
        }
    }), Q.command("add-from-claude-desktop").description("Import MCP servers from Claude Desktop (Mac and WSL only)").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").helpOption("-h, --help", "Display help for command").action(async (Z) => {
        try {
            let D = l61(Z.scope),
                G = L9();
            X1("tengu_mcp_add", {
                scope: D,
                platform: G,
                source: "desktop"
            });
            let F = tcB();
            if (Object.keys(F).length === 0) console.log("No MCP servers found in Claude Desktop configuration or configuration file does not exist."), process.exit(0);
            let {
                unmount: I
            } = S8(m7.default.createElement(F7, null, m7.default.createElement(rcB, {
                servers: F,
                scope: D,
                onDone: () => {
                    I()
                }
            })), {
                exitOnCtrlC: !0
            })
        } catch (D) {
            console.error(D.message), process.exit(1)
        }
    }), Q.command("reset-project-choices").description("Reset all approved and rejected project-scoped (.mcp.json) servers within this project").helpOption("-h, --help", "Display help for command").action(async () => {
        X1("tengu_mcp_reset_mcpjson_choices", {});
        let Z = UQ();
        r5({
            ...Z,
            enabledMcpjsonServers: [],
            disabledMcpjsonServers: [],
            enableAllProjectMcpServers: !1
        }), console.log("All project-scoped (.mcp.json) server approvals and rejections have been reset."), console.log("You will be prompted for approval next time you start Claude Code."), process.exit(0)
    }), A.command("migrate-installer").description("Migrate from global npm installation to local installation").helpOption("-h, --help", "Display help for command").action(async () => {
        if (Mv()) console.log("Already running from local installation. No migration needed."), process.exit(0);
        X1("tengu_migrate_installer_command", {}), await new Promise((Z) => {
            let {
                waitUntilExit: D
            } = S8(m7.default.createElement(F7, null, m7.default.createElement(KA1, null)));
            D().then(() => {
                Z()
            })
        }), process.exit(0)
    }), A.command("setup-token").description("Set up a long-lived authentication token (requires Claude subscription)").helpOption("-h, --help", "Display help for command").action(async () => {
        if (X1("tengu_setup_token_command", {}), await V7(), !KE()) process.stderr.write(e1.yellow(`Warning: You already have authentication configured via environment variable or API key helper.
`)), process.stderr.write(e1.yellow(`The setup-token command will create a new OAuth token which you can use instead.
`));
        await new Promise((Z) => {
            let {
                unmount: D
            } = S8(m7.default.createElement(Hb, {
                onDone: () => {
                    D(), Z()
                },
                mode: "setup-token",
                startingMessage: "This will guide you through long-lived (1-year) auth token setup for your Claude account. Claude subscription required."
            }))
        }), process.exit(0)
    }), A.command("doctor").description("Check the health of your Claude Code auto-updater").helpOption("-h, --help", "Display help for command").action(async () => {
        X1("tengu_doctor_command", {}), await new Promise((Z) => {
            let {
                unmount: D
            } = S8(m7.default.createElement(F7, null, m7.default.createElement(Dh1, {
                onDone: () => {
                    D(), Z()
                }
            })), {
                exitOnCtrlC: !1
            })
        }), process.exit(0)
    }), A.command("update").description("Check for updates and install if available").helpOption("-h, --help", "Display help for command").action(mlB), A.command("install [target]").description("Install Claude Code native build. Use [target] to specify version (stable, latest, or specific version)").option("--force", "Force installation even if already installed").helpOption("-h, --help", "Display help for command").action(async (Z, D) => {
        await Tb(Ob(), "default", !1, !1, void 0), await new Promise((G) => {
            let F = [];
            if (Z) F.push(Z);
            if (D.force) F.push("--force");
            plB.call(() => {
                G(), process.exit(0)
            }, {}, F)
        })
    }), await A.parseAsync(process.argv), A
}