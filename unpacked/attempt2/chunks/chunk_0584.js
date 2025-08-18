/* chunk:584 bytes:[13526382, 13546207) size:19825 source:unpacked-cli.js */
var z01 = EA(async (A, B, Q) => {
    try {
        let Z;
        if (B.type === "sse") {
            let C = new Nd(A, B),
                K = {
                    authProvider: C,
                    requestInit: {
                        headers: {
                            "User-Agent": Ya(),
                            ...B.headers || {}
                        },
                        signal: AbortSignal.timeout(60000)
                    }
                };
            if (B.headers) K.eventSourceInit = {
                fetch: async (H, z) => {
                    let $ = {},
                        L = await C.tokens();
                    if (L) $.Authorization = `Bearer ${L.access_token}`;
                    let N = Yg();
                    return fetch(H, {
                        ...z,
                        ...N,
                        headers: {
                            "User-Agent": Ya(),
                            ...$,
                            ...z?.headers,
                            ...B.headers,
                            Accept: "text/event-stream"
                        }
                    })
                }
            };
            Z = new Zy1(new URL(B.url), K)
        } else if (B.type === "sse-ide") {
            let C = Yg(),
                K = C.dispatcher ? {
                    eventSourceInit: {
                        fetch: async (H, z) => {
                            return fetch(H, {
                                ...z,
                                ...C,
                                headers: {
                                    "User-Agent": Ya(),
                                    ...z?.headers
                                }
                            })
                        }
                    }
                } : {};
            Z = new Zy1(new URL(B.url), Object.keys(K).length > 0 ? K : void 0)
        } else if (B.type === "ws-ide") {
            let C = Z_A(),
                K = {
                    headers: {
                        "User-Agent": Ya(),
                        ...B.authToken && {
                            "X-Claude-Code-Ide-Authorization": B.authToken
                        }
                    },
                    ...C || {}
                },
                H = new SO1.default(B.url, ["mcp"], Object.keys(K).length > 0 ? K : void 0);
            Z = new c$0(H)
        } else if (B.type === "http") {
            let C = new Nd(A, B),
                K = Yg(),
                H = {
                    authProvider: C,
                    requestInit: {
                        ...K,
                        headers: {
                            "User-Agent": Ya(),
                            ...B.headers || {}
                        },
                        signal: AbortSignal.timeout(60000)
                    }
                };
            Z = new Wz0(new URL(B.url), H)
        } else {
            let C = process.env.CLAUDE_CODE_SHELL_PREFIX || B.command,
                K = process.env.CLAUDE_CODE_SHELL_PREFIX ? [
                    [B.command, ...B.args].join(" ")
                ] : B.args;
            Z = new pH0({
                command: C,
                args: K,
                env: {
                    ...process.env,
                    ...B.env
                },
                stderr: "pipe"
            })
        }
        if (B.type === "stdio" || !B.type) {
            let C = Z;
            if (C.stderr) C.stderr.on("data", (K) => {
                let H = K.toString().trim();
                if (H) XG(A, `Server stderr: ${H}`)
            })
        }
        let D = new lH0({
            name: "claude-code",
            version: {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.VERSION ?? "unknown"
        }, {
            capabilities: {
                roots: {}
            }
        });
        D.setRequestHandler(EH0, async () => {
            return {
                roots: [{
                    uri: `file://${_9()}`
                }]
            }
        });
        let G = D.connect(Z),
            F = new Promise((C, K) => {
                let H = setTimeout(() => {
                    K(new Error(`Connection to MCP server "${A}" timed out after ${WjB()}ms`))
                }, WjB());
                G.then(() => clearTimeout(H), () => clearTimeout(H))
            });
        try {
            await Promise.race([G, F])
        } catch (C) {
            if (B.type === "sse" && C instanceof Error) {
                if (IB(A, `SSE Connection error: ${JSON.stringify({url:B.url,error:C.message,stack:C.stack})}`), XG(A, C), C.message.includes("401") || C.message.includes("Unauthorized")) return X1("tengu_mcp_server_needs_auth", {}), IB(A, "Authentication required for SSE server"), {
                    name: A,
                    type: "needs-auth",
                    config: B
                }
            } else if (B.type === "http" && C instanceof Error) {
                if (IB(A, `HTTP Connection error: ${JSON.stringify({url:B.url,error:C.message,stack:C.stack})}`), XG(A, C), C.message.includes("401") || C.message.includes("Unauthorized")) return X1("tengu_mcp_server_needs_auth", {}), IB(A, "Authentication required for HTTP server"), {
                    name: A,
                    type: "needs-auth",
                    config: B
                }
            } else if (B.type === "sse-ide" || B.type === "ws-ide") X1("tengu_mcp_ide_server_connection_failed", {});
            throw C
        }
        let I = D.getServerCapabilities(),
            Y = D.getServerVersion(),
            W = D.getInstructions();
        if (B.type === "sse-ide" || B.type === "ws-ide") {
            X1("tengu_mcp_ide_server_connection_succeeded", {
                serverVersion: Y
            });
            try {
                CGB(D)
            } catch (C) {
                XG(A, `Failed to send ide_connected notification: ${C}`)
            }
        }
        let J = async () => {
            if (B.type === "stdio") try {
                let K = Z.pid;
                if (K) {
                    IB(A, "Sending SIGINT to MCP server process");
                    try {
                        process.kill(K, "SIGINT")
                    } catch (H) {
                        IB(A, `Error sending SIGINT: ${H}`);
                        return
                    }
                    await new Promise(async (H) => {
                        let z = !1,
                            $ = setInterval(() => {
                                try {
                                    process.kill(K, 0)
                                } catch {
                                    if (!z) z = !0, clearInterval($), clearTimeout(L), IB(A, "MCP server process exited cleanly"), H()
                                }
                            }, 50),
                            L = setTimeout(() => {
                                if (!z) z = !0, clearInterval($), IB(A, "Cleanup timeout reached, stopping process monitoring"), H()
                            }, 600);
                        try {
                            if (await new Promise((N) => setTimeout(N, 100)), !z) {
                                try {
                                    process.kill(K, 0), IB(A, "SIGINT failed, sending SIGTERM to MCP server process");
                                    try {
                                        process.kill(K, "SIGTERM")
                                    } catch (N) {
                                        IB(A, `Error sending SIGTERM: ${N}`), z = !0, clearInterval($), clearTimeout(L), H();
                                        return
                                    }
                                } catch {
                                    z = !0, clearInterval($), clearTimeout(L), H();
                                    return
                                }
                                if (await new Promise((N) => setTimeout(N, 400)), !z) try {
                                    process.kill(K, 0), IB(A, "SIGTERM failed, sending SIGKILL to MCP server process");
                                    try {
                                        process.kill(K, "SIGKILL")
                                    } catch (N) {
                                        IB(A, `Error sending SIGKILL: ${N}`)
                                    }
                                } catch {
                                    z = !0, clearInterval($), clearTimeout(L), H()
                                }
                            }
                            if (!z) z = !0, clearInterval($), clearTimeout(L), H()
                        } catch {
                            if (!z) z = !0, clearInterval($), clearTimeout(L), H()
                        }
                    })
                }
            } catch (C) {
                IB(A, `Error terminating process: ${C}`)
            }
            try {
                await D.close()
            } catch (C) {
                IB(A, `Error closing client: ${C}`)
            }
        }, X = oL(J), V = async () => {
            X?.(), await J()
        };
        return X1("tengu_mcp_server_connection_succeeded", {}), {
            name: A,
            client: D,
            type: "connected",
            capabilities: I ?? {},
            serverInfo: Y,
            instructions: W,
            config: B,
            cleanup: V
        }
    } catch (Z) {
        if (X1("tengu_mcp_server_connection_failed", {
                totalServers: Q?.totalServers || 1,
                stdioCount: Q?.stdioCount || (B.type === "stdio" ? 1 : 0),
                sseCount: Q?.sseCount || (B.type === "sse" ? 1 : 0),
                httpCount: Q?.httpCount || (B.type === "http" ? 1 : 0),
                sseIdeCount: Q?.sseIdeCount || (B.type === "sse-ide" ? 1 : 0),
                wsIdeCount: Q?.wsIdeCount || (B.type === "ws-ide" ? 1 : 0),
                transportType: B.type
            }), IB(A, `Connection failed: ${Z}`), Z instanceof Error) IB(A, `Error message: ${Z.message}`), IB(A, `Error stack: ${Z.stack}`);
        return XG(A, `Connection failed: ${Z instanceof Error?Z.message:String(Z)}`), {
            name: A,
            type: "failed",
            config: B
        }
    }
}, JjB);
async function eG1(A, B) {
    let Q = JjB(A, B);
    try {
        let Z = await z01(A, B);
        if (Z.type === "connected") await Z.cleanup()
    } catch {}
    z01.cache.delete(Q)
}
var XjB = EA(async (A) => {
        if (A.type !== "connected") return [];
        try {
            if (!A.capabilities?.tools) return [];
            let B = await A.client.request({
                method: "tools/list"
            }, ZD1);
            return (await MY("claude_code_unicode_sanitize") ? ne(B.tools) : B.tools).map((D) => ({
                ...NSB,
                name: "mcp__" + Hq1(A.name) + "__" + D.name,
                isMcp: !0,
                async description() {
                    return D.description ?? ""
                },
                async prompt() {
                    return D.description ?? ""
                },
                isConcurrencySafe() {
                    return D.annotations?.readOnlyHint ?? !1
                },
                isReadOnly() {
                    return D.annotations?.readOnlyHint ?? !1
                },
                isDestructive() {
                    return D.annotations?.destructiveHint ?? !1
                },
                isOpenWorld() {
                    return D.annotations?.openWorldHint ?? !1
                },
                inputJSONSchema: D.inputSchema,
                async * call(G, F, I, Y) {
                    let W = zW8(Y),
                        J = W ? {
                            "claudecode/toolUseId": W
                        } : {};
                    yield {
                        type: "result",
                        data: await HjB({
                            client: A,
                            tool: D.name,
                            args: G,
                            meta: J,
                            signal: F.abortController.signal,
                            isNonInteractiveSession: F.options.isNonInteractiveSession
                        })
                    }
                },
                userFacingName() {
                    let G = D.annotations?.title || D.name;
                    return `${A.name} - ${G} (MCP)`
                }
            })).filter(KW8)
        } catch (B) {
            return XG(A.name, `Failed to fetch tools: ${B instanceof Error?B.message:String(B)}`), []
        }
    }),
    VjB = EA(async (A) => {
        if (A.type !== "connected") return [];
        try {
            if (!A.capabilities?.resources) return [];
            let B = await A.client.request({
                method: "resources/list"
            }, xm);
            if (!B.resources) return [];
            return B.resources.map((Q) => ({
                ...Q,
                server: A.name
            }))
        } catch (B) {
            return XG(A.name, `Failed to fetch resources: ${B instanceof Error?B.message:String(B)}`), []
        }
    }),
    CjB = EA(async (A) => {
        if (A.type !== "connected") return [];
        let B = A;
        try {
            if (!A.capabilities?.prompts) return [];
            let Q = await A.client.request({
                method: "prompts/list"
            }, QD1);
            if (!Q.prompts) return [];
            return (await MY("claude_code_unicode_sanitize") ? ne(Q.prompts) : Q.prompts).map((G) => {
                let F = Object.values(G.arguments ?? {}).map((I) => I.name);
                return {
                    type: "prompt",
                    name: "mcp__" + Hq1(B.name) + "__" + G.name,
                    description: G.description ?? "",
                    isEnabled: () => !0,
                    isHidden: !1,
                    isMcp: !0,
                    progressMessage: "running",
                    userFacingName() {
                        let I = G.title || G.name;
                        return `${B.name}:${I} (MCP)`
                    },
                    argNames: F,
                    source: "mcp",
                    async getPromptForCommand(I) {
                        let Y = I.split(" ");
                        try {
                            return (await B.client.getPrompt({
                                name: G.name,
                                arguments: Hm1(F, Y)
                            })).messages.flatMap((J) => KjB(J.content, A.name))
                        } catch (W) {
                            throw XG(A.name, `Error running command '${G.name}': ${W instanceof Error?W.message:String(W)}`), W
                        }
                    }
                }
            })
        } catch (Q) {
            return XG(A.name, `Failed to fetch commands: ${Q instanceof Error?Q.message:String(Q)}`), []
        }
    });
async function tP(A, B, Q, Z) {
    return HjB({
        client: Q,
        tool: A,
        args: B,
        signal: h4().signal,
        isNonInteractiveSession: Z
    })
}
async function JL0(A, B) {
    try {
        await eG1(A, B);
        let Q = await z01(A, B);
        if (Q.type !== "connected") return {
            client: Q,
            tools: [],
            commands: []
        };
        let Z = !!Q.capabilities?.resources,
            [D, G, F] = await Promise.all([XjB(Q), CjB(Q), Z ? VjB(Q) : Promise.resolve([])]),
            I = [];
        if (Z) {
            if (![C01, K01].some((W) => D.some((J) => J.name === W.name))) I.push(C01, K01)
        }
        return {
            client: Q,
            tools: [...D, ...I],
            commands: G,
            resources: F.length > 0 ? F : void 0
        }
    } catch (Q) {
        return XG(A, `Error during reconnection: ${Q instanceof Error?Q.message:String(Q)}`), {
            client: {
                name: A,
                type: "failed",
                config: B
            },
            tools: [],
            commands: []
        }
    }
}
async function HW8(A, B, Q) {
    for (let Z = 0; Z < A.length; Z += B) {
        let D = A.slice(Z, Z + B);
        await Promise.all(D.map(Q))
    }
}
async function AF1(A, B) {
    let Q = !1,
        Z = Object.entries(B ?? gz()),
        D = Z.length,
        G = Z.filter(([J, X]) => X.type === "stdio").length,
        F = Z.filter(([J, X]) => X.type === "sse").length,
        I = Z.filter(([J, X]) => X.type === "http").length,
        Y = Z.filter(([J, X]) => X.type === "sse-ide").length,
        W = Z.filter(([J, X]) => X.type === "ws-ide").length;
    await HW8(Z, VW8(), async ([J, X]) => {
        try {
            IB(J, "Starting connection attempt");
            let V = Date.now(),
                K = await z01(J, X, {
                    totalServers: D,
                    stdioCount: G,
                    sseCount: F,
                    httpCount: I,
                    sseIdeCount: Y,
                    wsIdeCount: W
                }),
                H = Date.now() - V;
            if (IB(J, `Connection attempt completed in ${H}ms - status: ${K.type}`), K.type !== "connected") {
                A({
                    client: K,
                    tools: [],
                    commands: []
                });
                return
            }
            let z = !!K.capabilities?.resources,
                [$, L, N] = await Promise.all([XjB(K), CjB(K), z ? VjB(K) : Promise.resolve([])]),
                R = [];
            if (z && !Q) Q = !0, R.push(C01, K01);
            A({
                client: K,
                tools: [...$, ...R],
                commands: L,
                resources: N.length > 0 ? N : void 0
            })
        } catch (V) {
            XG(J, `Error fetching tools/commands/resources: ${V instanceof Error?V.message:String(V)}`), A({
                client: {
                    name: J,
                    type: "failed",
                    config: X
                },
                tools: [],
                commands: []
            })
        }
    })
}
var XL0 = EA(async (A) => {
    return new Promise((B) => {
        let Q = 0,
            Z = 0;
        if (Q = Object.keys(A).length, Q === 0) {
            B({
                clients: [],
                tools: [],
                commands: []
            });
            return
        }
        let D = [],
            G = [],
            F = [];
        AF1((I) => {
            if (D.push(I.client), G.push(...I.tools), F.push(...I.commands), Z++, Z >= Q) {
                let Y = F.reduce((W, J) => {
                    let X = J.name.length + (J.description ?? "").length + (J.argumentHint ?? "").length;
                    return W + X
                }, 0);
                X1("tengu_mcp_tools_commands_loaded", {
                    tools_count: G.length,
                    commands_count: F.length,
                    commands_metadata_length: Y
                }), B({
                    clients: D,
                    tools: G,
                    commands: F
                })
            }
        }, A).catch((I) => {
            XG("prefetchAllMcpResources", `Failed to get MCP resources: ${I instanceof Error?I.message:String(I)}`), B({
                clients: [],
                tools: [],
                commands: []
            })
        })
    })
});