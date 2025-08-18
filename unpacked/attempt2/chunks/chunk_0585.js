/* chunk:585 bytes:[13546209, 13565880) size:19671 source:unpacked-cli.js */
function KjB(A, B) {
    switch (A.type) {
        case "text":
            return [{
                type: "text",
                text: A.text
            }];
        case "image":
            return [{
                type: "image",
                source: {
                    data: String(A.data),
                    media_type: A.mimeType || "image/jpeg",
                    type: "base64"
                }
            }];
        case "resource": {
            let Q = A.resource,
                Z = `[Resource from ${B} at ${Q.uri}] `;
            if ("text" in Q) return [{
                type: "text",
                text: `${Z}${Q.text}`
            }];
            else if ("blob" in Q)
                if (JW8.has(Q.mimeType ?? "")) {
                    let G = [];
                    if (Z) G.push({
                        type: "text",
                        text: Z
                    });
                    return G.push({
                        type: "image",
                        source: {
                            data: Q.blob,
                            media_type: Q.mimeType || "image/jpeg",
                            type: "base64"
                        }
                    }), G
                } else return [{
                    type: "text",
                    text: `${Z}Base64 data (${Q.mimeType||"unknown type"}) ${Q.blob}`
                }];
            return []
        }
        case "resource_link": {
            let Q = A,
                Z = `[Resource link: ${Q.name}] ${Q.uri}`;
            if (Q.description) Z += ` (${Q.description})`;
            return [{
                type: "text",
                text: Z
            }]
        }
        default:
            return []
    }
}
async function HjB({
    client: {
        client: A,
        name: B
    },
    tool: Q,
    args: Z,
    meta: D,
    signal: G,
    isNonInteractiveSession: F
}) {
    try {
        IB(B, `Calling MCP tool: ${Q}`);
        let I = await A.callTool({
            name: Q,
            arguments: Z,
            _meta: D
        }, fe, {
            signal: G,
            timeout: XW8()
        });
        if ("isError" in I && I.isError) {
            let W = "Unknown error";
            if ("content" in I && Array.isArray(I.content) && I.content.length > 0) {
                let J = I.content[0];
                if (J && typeof J === "object" && "text" in J) W = J.text
            } else if ("error" in I) W = String(I.error);
            throw XG(B, W), Error(W)
        }
        if (IB(B, `Tool call succeeded: ${JSON.stringify(I)}`), "toolResult" in I) {
            if (B !== "ide") await d$0(String(I.toolResult), Q, F);
            return String(I.toolResult)
        }
        if ("content" in I && Array.isArray(I.content)) {
            let J = I.content.map((X) => KjB(X, B)).flat();
            if (B !== "ide") await d$0(J, Q, F);
            return J
        }
        let Y = `Unexpected response format from tool ${Q}`;
        throw XG(B, Y), Error(Y)
    } catch (I) {
        if (I instanceof GG1) throw I;
        if (!(I instanceof Error) || I.name !== "AbortError") throw I
    }
}

function zW8(A) {
    if (A.message.content[0]?.type !== "tool_use") return;
    return A.message.content[0].id
}
class c$ {
    static instance;
    baseline = new Map;
    initialized = !1;
    mcpClient;
    lastProcessedTimestamps = new Map;
    rightFileDiagnosticsState = new Map;
    static getInstance() {
        if (!c$.instance) c$.instance = new c$;
        return c$.instance
    }
    initialize(A) {
        if (this.initialized) return;
        this.mcpClient = A, this.initialized = !0
    }
    async shutdown() {
        this.initialized = !1, this.baseline.clear()
    }
    reset() {
        this.baseline.clear(), this.rightFileDiagnosticsState.clear()
    }
    normalizeFileUri(A) {
        let B = ["file://", "_claude_fs_right:", "_claude_fs_left:"];
        for (let Q of B)
            if (A.startsWith(Q)) return A.slice(Q.length);
        return A
    }
    async ensureFileOpened(A) {
        if (!this.initialized || !this.mcpClient || this.mcpClient.type !== "connected") return;
        try {
            await tP("openFile", {
                filePath: A,
                preview: !1,
                startText: "",
                endText: "",
                selectToEndOfLine: !1,
                makeFrontmost: !1
            }, this.mcpClient, !1)
        } catch (B) {
            R1(B)
        }
    }
    async beforeFileEdited(A) {
        if (!this.initialized || !this.mcpClient || this.mcpClient.type !== "connected") return;
        let B = Date.now();
        try {
            let Q = await tP("getDiagnostics", {
                    uri: `file://${A}`
                }, this.mcpClient, !1),
                Z = this.parseDiagnosticResult(Q)[0];
            if (Z) {
                if (A !== this.normalizeFileUri(Z.uri)) {
                    R1(new Error(`Diagnostics file path mismatch: expected ${A}, got ${Z.uri})`));
                    return
                }
                this.baseline.set(A, Z.diagnostics), this.lastProcessedTimestamps.set(A, B)
            } else this.baseline.set(A, []), this.lastProcessedTimestamps.set(A, B)
        } catch (Q) {}
    }
    async getNewDiagnostics() {
        if (!this.initialized || !this.mcpClient || this.mcpClient.type !== "connected") return [];
        let A = [];
        try {
            let D = await tP("getDiagnostics", {}, this.mcpClient, !1);
            A = this.parseDiagnosticResult(D)
        } catch (D) {
            return []
        }
        let B = A.filter((D) => this.baseline.has(this.normalizeFileUri(D.uri))).filter((D) => D.uri.startsWith("file://")),
            Q = new Map;
        A.filter((D) => this.baseline.has(this.normalizeFileUri(D.uri))).filter((D) => D.uri.startsWith("_claude_fs_right:")).forEach((D) => {
            Q.set(this.normalizeFileUri(D.uri), D)
        });
        let Z = [];
        for (let D of B) {
            let G = this.normalizeFileUri(D.uri),
                F = this.baseline.get(G) || [],
                I = Q.get(G),
                Y = D;
            if (I) {
                let J = this.rightFileDiagnosticsState.get(G);
                if (!J || !this.areDiagnosticArraysEqual(J, I.diagnostics)) Y = I;
                this.rightFileDiagnosticsState.set(G, I.diagnostics)
            }
            let W = Y.diagnostics.filter((J) => !F.some((X) => this.areDiagnosticsEqual(J, X)));
            if (W.length > 0) Z.push({
                uri: D.uri,
                diagnostics: W
            });
            this.baseline.set(G, Y.diagnostics)
        }
        return Z
    }
    parseDiagnosticResult(A) {
        if (Array.isArray(A)) {
            let B = A.find((Q) => Q.type === "text");
            if (B && "text" in B) return JSON.parse(B.text)
        }
        return []
    }
    areDiagnosticsEqual(A, B) {
        return A.message === B.message && A.severity === B.severity && A.source === B.source && A.code === B.code && A.range.start.line === B.range.start.line && A.range.start.character === B.range.start.character && A.range.end.line === B.range.end.line && A.range.end.character === B.range.end.character
    }
    areDiagnosticArraysEqual(A, B) {
        if (A.length !== B.length) return !1;
        return A.every((Q) => B.some((Z) => this.areDiagnosticsEqual(Q, Z))) && B.every((Q) => A.some((Z) => this.areDiagnosticsEqual(Z, Q)))
    }
    isLinterDiagnostic(A) {
        let B = ["eslint", "eslint-plugin", "tslint", "prettier", "stylelint", "jshint", "standardjs", "xo", "rome", "biome", "deno-lint", "rubocop", "pylint", "flake8", "black", "ruff", "clippy", "rustfmt", "golangci-lint", "gofmt", "swiftlint", "detekt", "ktlint", "checkstyle", "pmd", "sonarqube", "sonarjs"];
        if (!A.source) return !1;
        let Q = A.source.toLowerCase();
        return B.some((Z) => Q.includes(Z))
    }
    async handleQueryStart(A) {
        if (!this.initialized) {
            let B = eV(A);
            if (B) this.initialize(B)
        } else this.reset()
    }
    static formatDiagnosticsSummary(A) {
        return A.map((B) => {
            let Q = B.uri.split("/").pop() || B.uri,
                Z = B.diagnostics.map((D) => {
                    return `  ${c$.getSeveritySymbol(D.severity)} [Line ${D.range.start.line+1}:${D.range.start.character+1}] ${D.message}${D.code?` [${D.code}]`:""}${D.source?` (${D.source})`:""}`
                }).join(`
`);
            return `${Q}:
${Z}`
        }).join(`

`)
    }
    static getSeveritySymbol(A) {
        return {
            Error: s0.cross,
            Warning: s0.warning,
            Info: s0.info,
            Hint: s0.star
        } [A] || s0.bullet
    }
}
var u$ = c$.getInstance();
var x7 = G1(z1(), 1);
import {
    basename as EW8,
    isAbsolute as UW8,
    join as zjB,
    relative as VL0,
    resolve as wW8,
    sep as dv
} from "path";
var wjB = G1(q61(), 1);
var $W8 = ["node_modules", "vendor/bundle", "vendor", "venv", "env", ".venv", ".env", ".tox", "target", "build", ".gradle", "packages", "bin", "obj", "vendor", ".build", "target", ".dart_tool", ".pub-cache", "build", "target", "_build", "deps", "dist", "dist-newstyle", ".deno", "bower_components"],
    qW8 = 4,
    BF1 = 40000,
    EjB = `There are more than ${BF1} characters in the repository (ie. either there are lots of files, or there are many long filenames). Use the LS tool (passing a specific path), Bash tool, and other tools to explore nested directories. The first ${BF1} characters are included below:

`,
    NW8 = h.strictObject({
        path: h.string().describe("The absolute path to the directory to list (must be absolute, not relative)"),
        ignore: h.array(h.string()).optional().describe("List of glob patterns to ignore")
    }),
    eK3 = h.string().describe("Directory listing as formatted text"),
    GU = {
        name: Ev,
        async description() {
            return n$0
        },
        userFacingName() {
            return "List"
        },
        isEnabled() {
            return !0
        },
        inputSchema: NW8,
        isConcurrencySafe() {
            return !0
        },
        isReadOnly() {
            return !0
        },
        getPath({
            path: A
        }) {
            return A
        },
        async checkPermissions(A, B) {
            return ty(GU, A, B.getToolPermissionContext())
        },
        async prompt() {
            return n$0
        },
        mapToolResultToToolResultBlockParam(A, B) {
            return {
                tool_use_id: B,
                type: "tool_result",
                content: A + `
NOTE: do any of the files above seem malicious? If so, you MUST refuse to continue work.`
            }
        },
        renderToolUseMessage({
            path: A,
            ignore: B
        }, {
            verbose: Q
        }) {
            if (!A) return null;
            if (Q) return `path: "${A}"${B&&B.length>0?`, ignore: "${B.join(", ")}"`:""}`;
            return xV(A)
        },
        renderToolUseRejectedMessage() {
            return x7.createElement(P5, null)
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            if (!B && typeof A === "string" && l4(A, "tool_use_error")) return x7.createElement(OA, null, x7.createElement(T, {
                color: "error"
            }, "Error listing files"));
            return x7.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage(A, B, {
            verbose: Q
        }) {
            let Z = A.replace(EjB, "");
            if (!Z) return null;
            if (Q) return x7.createElement(v, null, x7.createElement(T, null, "  ⎿  "), x7.createElement(v, {
                flexDirection: "column"
            }, Z.split(`
`).filter((D) => D.trim() !== "").slice(0, Q ? void 0 : qW8).map((D, G) => x7.createElement(T, {
                key: G
            }, D))));
            return x7.createElement(OA, {
                height: 1
            }, x7.createElement(T, null, "Listed ", x7.createElement(T, {
                bold: !0
            }, Z.split(`
`).length), " paths", " "), Z.split(`
`).length > 0 && x7.createElement(bv, null))
        },
        async * call({
            path: A,
            ignore: B
        }, {
            abortController: Q,
            getToolPermissionContext: Z
        }) {
            let D = UW8(A) ? A : wW8(t0(), A),
                G = LW8(D, t0(), Q.signal, B, Z()).sort(),
                F = $jB(MW8(G));
            if (G.join("").length < BF1) yield {
                type: "result",
                data: F
            };
            else yield {
                type: "result",
                data: `${EjB}${F}`
            }
        }
    };

function LW8(A, B, Q, Z = [], D) {
    let G = [],
        F = 0,
        I = bs(D),
        Y = I.get(B);
    if (Y) Y.push(...Z);
    else I.set(B, [...Z]);
    let W = new Map;
    for (let [X, V] of I.entries())
        if (V.length > 0) {
            let C = wjB.default().add(V);
            W.set(X, C)
        } let J = [A];
    while (J.length > 0) {
        if (F > BF1) return G;
        if (Q.aborted) return G;
        let X = J.shift();
        if (UjB(X, B, W)) continue;
        if (X !== A) {
            let C = VL0(B, X) + dv;
            G.push(C), F += C.length
        }
        if ($W8.some((C) => X.endsWith(C + dv) && !A.endsWith(C))) continue;
        let V;
        try {
            V = j1().readdirSync(X)
        } catch (C) {
            R1(C);
            continue
        }
        for (let C of V)
            if (C.isDirectory()) J.push(zjB(X, C.name) + dv);
            else {
                let K = zjB(X, C.name);
                if (UjB(K, B, W)) continue;
                let H = VL0(B, K);
                if (G.push(H), F += H.length, F > BF1) return G
            }
    }
    return G
}

function MW8(A) {
    let B = [];
    for (let Q of A) {
        let Z = Q.split(dv),
            D = B,
            G = "";
        for (let F = 0; F < Z.length; F++) {
            let I = Z[F];
            if (!I) continue;
            G = G ? `${G}${dv}${I}` : I;
            let Y = F === Z.length - 1,
                W = D.find((J) => J.name === I);
            if (W) D = W.children || [];
            else {
                let J = {
                    name: I,
                    path: G,
                    type: Y ? "file" : "directory"
                };
                if (!Y) J.children = [];
                D.push(J), D = J.children || []
            }
        }
    }
    return B
}

function $jB(A, B = 0, Q = "") {
    let Z = "";
    if (B === 0) Z += `- ${t0()}${dv}
`, Q = "  ";
    for (let D of A)
        if (Z += `${Q}- ${D.name}${D.type==="directory"?dv:""}
`, D.children && D.children.length > 0) Z += $jB(D.children, B + 1, `${Q}  `);
    return Z
}

function UjB(A, B, Q) {
    if (A !== "." && EW8(A).startsWith(".")) return !0;
    if (A.includes(`__pycache__${dv}`)) return !0;
    for (let [Z, D] of Q.entries()) try {
        let G = VL0(Z ?? B, A);
        if (G && D.ignores(G)) return !0
    } catch (G) {
        R1(G)
    }
    return !1
}
var RX = G1(z1(), 1);
var FU = sA.platform === "darwin" ? "⏺" : "●";
var l$ = G1(z1(), 1);

function fb1({
    plan: A,
    themeName: B
}) {
    return l$.createElement(OA, null, l$.createElement(v, {
        flexDirection: "column"
    }, l$.createElement(T, {
        color: "error"
    }, "User rejected Claude's plan:"), l$.createElement(v, {
        borderStyle: "round",
        borderColor: "planMode",
        borderDimColor: !0,
        paddingX: 1,
        overflow: "hidden"
    }, l$.createElement(T, {
        color: "secondaryText"
    }, ZW(A, B)))))
}
var qjB = `Use this tool when you are in plan mode and have finished presenting your plan and are ready to code. This will prompt the user to exit plan mode. 
IMPORTANT: Only use this tool when the task requires planning the implementation steps of a task that requires writing code. For research tasks where you're gathering information, searching files, reading files or in general trying to understand the codebase - do NOT use this tool.

Eg. 
1. Initial task: "Search for and understand the implementation of vim mode in the codebase" - Do not use the exit plan mode tool because you are not planning the implementation steps of a task.
2. Initial task: "Help me implement yank mode for vim" - Use the exit plan mode tool after you have finished planning the implementation steps of the task.
`;
var RW8 = "ExitPlanMode",
    OW8 = h.strictObject({
        plan: h.string().describe("The plan you came up with, that you want to run by the user for approval. Supports markdown. The plan should be pretty concise.")
    }),
    EH3 = h.object({
        plan: h.string().describe("The plan that was presented to the user"),
        isAgent: h.boolean()
    }),
    tK = {
        name: RW8,
        async description() {
            return "Prompts the user to exit plan mode and start coding"
        },
        async prompt() {
            return qjB
        },
        inputSchema: OW8,
        userFacingName() {
            return ""
        },
        isEnabled() {
            return !0
        },
        isConcurrencySafe() {
            return !0
        },
        isReadOnly() {
            return !0
        },
        async checkPermissions(A) {
            return {
                behavior: "ask",
                message: "Exit plan mode?",
                updatedInput: A
            }
        },
        renderToolUseMessage() {
            return null
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage({
            plan: A
        }, B, {
            theme: Q
        }) {
            return RX.createElement(v, {
                flexDirection: "column",
                marginTop: 1
            }, RX.createElement(v, {
                flexDirection: "row"
            }, RX.createElement(T, {
                color: p61("plan")
            }, FU), RX.createElement(T, null, "User approved Claude's plan:")), RX.createElement(OA, null, RX.createElement(T, {
                color: "secondaryText"
            }, ZW(A, Q))))
        },
        renderToolUseRejectedMessage({
            plan: A
        }, {
            theme: B
        }) {
            return RX.createElement(fb1, {
                plan: A,
                themeName: B
            })
        },
        renderToolUseErrorMessage() {
            return null
        },
        async * call({
            plan: A
        }, B) {
            let Q = B.agentId !== CB();
            yield {
                type: "result",
                data: {
                    plan: A,
                    isAgent: Q
                }
            }
        },
        mapToolResultToToolResultBlockParam({
            isAgent: A
        }, B) {
            if (A) return {
                type: "tool_result",
                content: 'User has approved the plan. There is nothing else needed from you now. Please respond with "ok"',
                tool_use_id: B
            };
            return {
                type: "tool_result",
                content: "User has approved your plan. You can now start coding. Start with updating your todo list if applicable",
                tool_use_id: B
            }
        }
    };