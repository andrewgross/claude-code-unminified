/* chunk:625 bytes:[14264449, 14282825) size:18376 source:unpacked-cli.js */
var $T0 = 3,
    kL8 = h.object({
        description: h.string().describe("A short (3-5 word) description of the task"),
        prompt: h.string().describe("The task for the agent to perform"),
        subagent_type: h.string().describe("The type of specialized agent to use for this task")
    }),
    hn3 = h.object({
        content: h.array(h.object({
            type: h.literal("text"),
            text: h.string()
        })),
        totalToolUseCount: h.number(),
        totalDurationMs: h.number(),
        totalTokens: h.number(),
        usage: h.object({
            input_tokens: h.number(),
            output_tokens: h.number(),
            cache_creation_input_tokens: h.number().nullable(),
            cache_read_input_tokens: h.number().nullable(),
            server_tool_use: h.object({
                web_search_requests: h.number()
            }).nullable(),
            service_tier: h.enum(["standard", "priority", "batch"]).nullable()
        }),
        exitPlanModeInput: h.object({
            plan: h.string()
        }).optional()
    }),
    SI1 = {
        async prompt({
            tools: A
        }) {
            return await EmB(A)
        },
        name: k7,
        async description() {
            return "Launch a new task"
        },
        inputSchema: kL8,
        async * call({
            prompt: A,
            subagent_type: B
        }, {
            abortController: Q,
            options: {
                debug: Z,
                tools: D,
                verbose: G,
                isNonInteractiveSession: F,
                mcpClients: I,
                mcpResources: Y,
                mainLoopModel: W
            },
            getToolPermissionContext: J,
            readFileState: X,
            setInProgressToolUseIDs: V,
            setResponseLength: C
        }, K, H) {
            let z = Date.now();
            if (A.trim().startsWith("/")) {
                let H1 = Kg1(A);
                if (!H1) throw new Error("Invalid slash command format");
                let {
                    commandName: A0
                } = H1, V0 = await Fg1();
                if (!Hg1(A0, V0)) throw new Error(`Unknown command: /${A0}. Available commands: ${V0.filter((o1)=>!o1.isHidden).map((o1)=>`/${o1.userFacingName()}`).sort((o1,e)=>o1.localeCompare(e)).join(", ")}`)
            }
            let $ = await OS(),
                L = $.find((H1) => H1.agentType === B),
                N = L?.source === "built-in";
            if (!L) throw new Error(`Agent type '${B}' not found. Available agents: ${$.map((H1)=>H1.agentType).join(", ")}`);
            if (L.color) R01(B, L.color);
            let R = T_A(L.model, W),
                O = [L.systemPrompt],
                j = MA1(L.tools, D, L.source).resolvedTools;
            X1("tengu_agent_tool_selected", {
                agent_type: L.agentType,
                model: R,
                source: L.source,
                color: L.color,
                is_built_in_agent: N
            });
            let f = {
                    abortController: Q,
                    options: {
                        debug: Z,
                        verbose: G,
                        isNonInteractiveSession: F ?? !1,
                        mcpClients: I,
                        mcpResources: Y
                    },
                    getToolPermissionContext: J,
                    readFileState: X,
                    setInProgressToolUseIDs: V,
                    tools: j
                },
                k = jL8(),
                c = [D2({
                    content: A
                })],
                [u, a, l] = await Promise.all([PX(), bS(), Promise.resolve([])]),
                y = Array.from(f.getToolPermissionContext().additionalWorkingDirectories.keys()),
                t = O ? await XT0(Array.isArray(O) ? O : [O], R, y) : await JT0(R, y),
                E1 = [],
                C1 = 0,
                _1 = void 0,
                F0 = UmB(B, N);
            for await (let H1 of wR({
                messages: c,
                systemPrompt: t,
                userContext: u,
                systemContext: a,
                canUseTool: K,
                toolUseContext: {
                    abortController: Q,
                    options: {
                        isNonInteractiveSession: F ?? !1,
                        tools: j,
                        commands: l,
                        debug: Z,
                        verbose: G,
                        mainLoopModel: R,
                        maxThinkingTokens: $b(c),
                        mcpClients: [],
                        mcpResources: {}
                    },
                    getToolPermissionContext: J,
                    readFileState: X,
                    getQueuedCommands: () => [],
                    removeQueuedCommands: () => {},
                    setInProgressToolUseIDs: V,
                    setResponseLength: C,
                    agentId: k
                },
                promptCategory: F0
            })) {
                if (H1.type !== "assistant" && H1.type !== "user" && H1.type !== "progress") continue;
                if (E1.push(H1), H1.type !== "assistant" && H1.type !== "user") continue;
                WF1(H1, () => {}, (V0) => C((o1) => o1 + V0.length), () => {}, () => {});
                let A0 = IF(E1);
                for (let V0 of IF([H1]))
                    for (let o1 of V0.message.content) {
                        if (o1.type !== "tool_use" && o1.type !== "tool_result") continue;
                        if (o1.type === "tool_use") {
                            if (C1++, o1.name === tK.name && o1.input) {
                                let e = tK.inputSchema.safeParse(o1.input);
                                if (e.success) _1 = {
                                    plan: e.data.plan
                                }
                            }
                        }
                        yield {
                            type: "progress",
                            toolUseID: `agent_${H.message.id}`,
                            data: {
                                message: V0,
                                normalizedMessages: A0,
                                type: "agent_progress"
                            }
                        }
                    }
            }
            let W0 = ZI(E1.filter((H1) => H1.type !== "system" && H1.type !== "progress"));
            if (W0 && gb1(W0))
                if (_1) throw new tJ(`${GF1}${_1.plan}`);
                else throw new tJ;
            let g1 = E1.filter((H1) => H1.type === "assistant");
            if (g1.length === 0) throw new Error("No assistant messages found");
            let w1 = ZI(g1),
                Q1 = (w1.message.usage.cache_creation_input_tokens ?? 0) + (w1.message.usage.cache_read_input_tokens ?? 0) + w1.message.usage.input_tokens + w1.message.usage.output_tokens,
                k1 = w1.message.content.filter((H1) => H1.type === "text");
            if (await KeA([...c, ...E1]), X1("tengu_agent_tool_completed", {
                    model: R,
                    prompt_char_count: A.length,
                    response_char_count: k1.length,
                    assistant_message_count: E1.length,
                    total_tool_uses: C1,
                    duration_ms: Date.now() - z,
                    total_tokens: Q1,
                    is_built_in_agent: N
                }), L.callback) L.callback();
            yield {
                type: "result",
                data: {
                    content: k1,
                    totalDurationMs: Date.now() - z,
                    totalTokens: Q1,
                    totalToolUseCount: C1,
                    usage: w1.message.usage,
                    exitPlanModeInput: _1
                }
            }
        },
        isReadOnly() {
            return !0
        },
        isConcurrencySafe() {
            return !0
        },
        isEnabled() {
            return !0
        },
        userFacingName(A) {
            if (A?.subagent_type && A.subagent_type !== jL0.agentType) return A.subagent_type;
            return "Task"
        },
        userFacingNameBackgroundColor(A) {
            if (!A?.subagent_type) return;
            return M01(A.subagent_type)
        },
        async checkPermissions(A) {
            return {
                behavior: "allow",
                updatedInput: A
            }
        },
        mapToolResultToToolResultBlockParam(A, B) {
            if (A.exitPlanModeInput) return {
                tool_use_id: B,
                type: "tool_result",
                content: [{
                    type: "text",
                    text: "The agent created a new plan that was approved by the user. Please go ahead and start implementing this plan and use the todo tool if applicable. We are no longer in plan mode and you do not need to use the " + tK.name + ` tool.

User-approved plan:` + A.exitPlanModeInput.plan
                }]
            };
            return {
                tool_use_id: B,
                type: "tool_result",
                content: A.content
            }
        },
        renderToolResultMessage({
            totalDurationMs: A,
            totalToolUseCount: B,
            totalTokens: Q,
            usage: Z,
            content: D
        }, G, {
            tools: F,
            verbose: I,
            theme: Y
        }) {
            let J = `Done (${[B===1?"1 tool use":`${B} tool uses`,SI(Q)+" tokens",tm(A)].join(" · ")})`,
                X = YU({
                    content: J,
                    usage: Z
                });
            return dQ.createElement(v, {
                flexDirection: "column"
            }, I ? G.map((V) => dQ.createElement(OA, {
                key: V.uuid
            }, dQ.createElement(PS, {
                message: V.data.message,
                messages: V.data.normalizedMessages,
                addMargin: !1,
                tools: F,
                verbose: I,
                erroredToolUseIDs: new Set,
                inProgressToolUseIDs: new Set,
                resolvedToolUseIDs: new Set,
                progressMessagesForMessage: G,
                shouldAnimate: !1,
                shouldShowDot: !1
            }))) : null, I && D && D.length > 0 && dQ.createElement(OA, null, dQ.createElement(v, {
                flexDirection: "column"
            }, dQ.createElement(T, {
                color: "success",
                bold: !0
            }, "Agent Response:"), D.map((V, C) => dQ.createElement(v, {
                key: C,
                marginTop: C === 0 ? 0 : 1
            }, dQ.createElement(T, null, ZW(V.text, Y)))))), dQ.createElement(OA, {
                height: 1
            }, dQ.createElement(PS, {
                message: X,
                messages: IF([X]),
                addMargin: !1,
                tools: F,
                verbose: I,
                erroredToolUseIDs: new Set,
                inProgressToolUseIDs: new Set,
                resolvedToolUseIDs: new Set,
                progressMessagesForMessage: [],
                shouldAnimate: !1,
                shouldShowDot: !1
            })))
        },
        renderToolUseMessage({
            description: A,
            prompt: B,
            subagent_type: Q
        }, {
            theme: Z,
            verbose: D
        }) {
            if (!A || !B) return null;
            if (D) return `Task: ${A}${Q?` (using ${Q} agent)`:""}

Prompt: ${ZW(B,Z)}`;
            return A
        },
        renderToolUseProgressMessage(A, {
            tools: B,
            verbose: Q
        }) {
            if (!A.length) return dQ.createElement(OA, {
                height: 1
            }, dQ.createElement(T, {
                color: "secondaryText"
            }, "Initializing…"));
            let Z = A.filter((I) => {
                    return I.data.message.message.content.some((W) => W.type === "tool_use")
                }).length,
                D = Q ? A : A.slice(-$T0),
                G = D.filter((I) => {
                    return I.data.message.message.content.some((W) => W.type === "tool_use")
                }).length,
                F = Z - G;
            if (!Q && A.length > $T0) D = A.slice(-$T0 + 1);
            return dQ.createElement(OA, null, dQ.createElement(v, {
                flexDirection: "column"
            }, D.map((I) => dQ.createElement(PS, {
                key: I.uuid,
                message: I.data.message,
                messages: I.data.normalizedMessages,
                addMargin: !1,
                tools: B,
                verbose: Q,
                erroredToolUseIDs: new Set,
                inProgressToolUseIDs: new Set,
                resolvedToolUseIDs: zL0(A),
                progressMessagesForMessage: A,
                shouldAnimate: !1,
                shouldShowDot: !1,
                style: "condensed"
            })), F > 0 && dQ.createElement(T, {
                color: "secondaryText"
            }, "+", F, " more tool ", F === 1 ? "use" : "uses")))
        },
        renderToolUseRejectedMessage(A, {
            progressMessagesForMessage: B,
            tools: Q,
            verbose: Z
        }) {
            return dQ.createElement(dQ.Fragment, null, this.renderToolUseProgressMessage(B, {
                tools: Q,
                verbose: Z
            }), dQ.createElement(P5, null))
        },
        renderToolUseErrorMessage(A, {
            progressMessagesForMessage: B,
            tools: Q,
            verbose: Z
        }) {
            return dQ.createElement(dQ.Fragment, null, this.renderToolUseProgressMessage(B, {
                tools: Q,
                verbose: Z
            }), dQ.createElement(f6, {
                result: A,
                verbose: Z
            }))
        }
    };
var OA1 = G1(z1(), 1);
var NmB = `
- Kills a running background bash shell by its ID
- Takes a shell_id parameter identifying the shell to kill
- Returns a success or failure status 
- Use this tool when you need to terminate a long-running shell
- Shell IDs can be found using the /bashes command
`;
var yL8 = h.strictObject({
        shell_id: h.string().describe("The ID of the background shell to kill")
    }),
    nn3 = h.object({
        success: h.boolean().describe("Whether the shell was successfully killed"),
        message: h.string().describe("Status message about the operation"),
        shell_id: h.string().describe("The ID of the shell that was killed")
    }),
    Eg1 = {
        name: "KillBash",
        userFacingName: () => "Kill Bash",
        inputSchema: yL8,
        isEnabled() {
            return !0
        },
        isConcurrencySafe() {
            return !0
        },
        isReadOnly() {
            return !1
        },
        async checkPermissions(A) {
            return {
                behavior: "allow",
                updatedInput: A
            }
        },
        async validateInput({
            shell_id: A
        }) {
            if (!gG1(A)) return {
                result: !1,
                message: `No shell found with ID: ${A}`,
                errorCode: 1
            };
            return {
                result: !0
            }
        },
        async description() {
            return "Kill a background bash shell by ID"
        },
        async prompt() {
            return NmB
        },
        mapToolResultToToolResultBlockParam(A, B) {
            return {
                tool_use_id: B,
                type: "tool_result",
                content: JSON.stringify(A)
            }
        },
        renderToolUseMessage({
            shell_id: A
        }) {
            if (!A) return null;
            return `Kill shell: ${A}`
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolUseRejectedMessage() {
            return OA1.default.createElement(P5, null)
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            return OA1.default.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        renderToolResultMessage(A) {
            if (A.success) return OA1.default.createElement(v, null, OA1.default.createElement(T, null, "  ⎿  "), OA1.default.createElement(T, null, "Shell ", A.shell_id, " killed"));
            return null
        },
        async * call({
            shell_id: A
        }) {
            let B = gG1(A);
            if (B.status !== "running") {
                yield {
                    type: "result",
                    data: {
                        success: !1,
                        message: `Shell ${A} is not running (status: ${B.status})`,
                        shell_id: A
                    }
                };
                return
            }
            let Q = Yb1(A);
            yield {
                type: "result",
                data: {
                    success: Q,
                    message: Q ? `Successfully killed shell: ${A} (${B.command})` : `Failed to kill shell: ${A}`,
                    shell_id: A
                }
            }
        }
    };
var ed = G1(z1(), 1);

function LmB() {
    return `
- Retrieves output from a running or completed background bash shell
- Takes a shell_id parameter identifying the shell
- Always returns only new output since the last check
- Returns stdout and stderr output along with shell status
- Supports optional regex filtering to show only lines matching a pattern
- Use this tool when you need to monitor or check the output of a long-running shell
- Shell IDs can be found using the /bashes command
`
}

function qT0(A) {
    let B = IG1();
    if (A.length <= B) return {
        totalLines: A.split(`
`).length,
        truncatedContent: A
    };
    let Q = A.slice(0, B),
        Z = A.slice(B).split(`
`).length,
        D = `${Q}

... [${Z} lines truncated] ...`;
    return {
        totalLines: A.split(`
`).length,
        truncatedContent: D
    }
}

function MmB(A, B) {
    if (!B || !A.trim()) return A;
    let Q = new RegExp(B, "i");
    return A.split(`
`).filter((G) => Q.test(G)).join(`
`)
}