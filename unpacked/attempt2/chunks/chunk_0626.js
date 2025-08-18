/* chunk:626 bytes:[14282826, 14302487) size:19661 source:unpacked-cli.js */
var Fa3 = h.object({
        shellId: h.string().describe("The ID of the background shell"),
        command: h.string().describe("The command that was run in the shell"),
        status: h.enum(["running", "completed", "failed", "killed"]).describe("The current status of the shell command"),
        exitCode: h.number().nullable().describe("The exit code of the command, if available"),
        stdout: h.string().describe("The standard output of the command"),
        stderr: h.string().describe("The standard error output of the command"),
        stdoutLines: h.number().describe("Total number of lines in original stdout, even if truncated or filtered"),
        stderrLines: h.number().describe("Total number of lines in original stderr, even if truncated or filtered"),
        error: h.string().optional().describe("Error message if the shell command failed"),
        filterPattern: h.string().optional().describe("The regex pattern used for filtering (only present when filter is applied)"),
        timestamp: h.string().describe("The current timestamp when the output was retrieved")
    }),
    _L8 = h.strictObject({
        bash_id: h.string().describe("The ID of the background shell to retrieve output from"),
        filter: h.string().optional().describe("Optional regular expression to filter the output lines. Only lines matching this regex will be included in the result. Any lines that do not match will no longer be available to read.")
    }),
    Ug1 = {
        name: "BashOutput",
        async description() {
            return "Retrieves output from a background bash shell"
        },
        async prompt() {
            return LmB()
        },
        userFacingName() {
            return "BashOutput"
        },
        isEnabled() {
            return !0
        },
        inputSchema: _L8,
        isConcurrencySafe() {
            return !0
        },
        isReadOnly() {
            return !0
        },
        async checkPermissions(A) {
            return {
                behavior: "allow",
                updatedInput: A
            }
        },
        async validateInput({
            bash_id: A,
            filter: B
        }) {
            if (B) try {
                new RegExp(B, "i")
            } catch (Z) {
                return {
                    result: !1,
                    message: `Invalid regex pattern "${B}": ${Z instanceof Error?Z.message:String(Z)}`,
                    errorCode: 1
                }
            }
            if (!gG1(A)) return {
                result: !1,
                message: `No shell found with ID: ${A}`,
                errorCode: 2
            };
            return {
                result: !0
            }
        },
        async * call({
            bash_id: A,
            filter: B
        }) {
            let Q = Ib1(A),
                Z = MmB(Q.stdout, B),
                D = MmB(Q.stderr, B),
                {
                    truncatedContent: G
                } = qT0(KS(Z)),
                {
                    truncatedContent: F
                } = qT0(KS(D)),
                I = Q.stdout.split(`
`).length,
                Y = Q.stderr.split(`
`).length;
            yield {
                type: "result",
                data: {
                    ...Q,
                    stdout: G,
                    stderr: F,
                    stdoutLines: I,
                    stderrLines: Y,
                    timestamp: new Date().toISOString(),
                    ...B && {
                        filterPattern: B
                    }
                }
            }
        },
        mapToolResultToToolResultBlockParam(A, B) {
            let Q = [];
            if (Q.push(`<status>${A.status}</status>`), A.exitCode !== null && A.exitCode !== void 0) Q.push(`<exit_code>${A.exitCode}</exit_code>`);
            if (A.stdout.trim()) Q.push(`<stdout>
${A.stdout.trimEnd()}
</stdout>`);
            if (A.stderr.trim()) Q.push(`<stderr>
${A.stderr.trim()}
</stderr>`);
            return Q.push(`<timestamp>${A.timestamp}</timestamp>`), {
                tool_use_id: B,
                type: "tool_result",
                content: Q.join(`

`)
            }
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage(A, B, Q) {
            let Z = {
                stdout: A.stdout,
                stderr: A.stderr,
                isImage: !1,
                sandbox: !1,
                returnCodeInterpretation: A.error || void 0
            };
            return ed.createElement(Kd, {
                content: Z,
                verbose: Q.verbose
            })
        },
        renderToolUseMessage(A) {
            if (A?.filter) return `Reading shell output (filtered: ${A.filter})`;
            return "Reading shell output"
        },
        renderToolUseRejectedMessage() {
            return ed.createElement(P5, null)
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            return ed.createElement(f6, {
                result: A,
                verbose: B
            })
        }
    };
var $R = G1(z1(), 1);

function xL8(A) {
    let B = 0,
        Q = 0;
    for (let Z of A)
        if (typeof Z !== "string") B++, Q += Z.content.length;
    return {
        searchCount: B,
        totalResultCount: Q
    }
}
var vL8 = h.strictObject({
        query: h.string().min(2).describe("The search query to use"),
        allowed_domains: h.array(h.string()).optional().describe("Only include search results from these domains"),
        blocked_domains: h.array(h.string()).optional().describe("Never include search results from these domains")
    }),
    bL8 = h.object({
        title: h.string().describe("The title of the search result"),
        url: h.string().describe("The URL of the search result")
    }),
    fL8 = h.object({
        tool_use_id: h.string().describe("ID of the tool use"),
        content: h.array(bL8).describe("Array of search hits")
    }),
    $a3 = h.object({
        query: h.string().describe("The search query that was executed"),
        results: h.array(h.union([fL8, h.string()])).describe("Search results and/or text commentary from the model"),
        durationSeconds: h.number().describe("Time taken to complete the search operation")
    }),
    hL8 = (A) => {
        return {
            type: "web_search_20250305",
            name: "web_search",
            allowed_domains: A.allowed_domains,
            blocked_domains: A.blocked_domains,
            max_uses: 8
        }
    };

function gL8(A, B, Q) {
    let Z = [],
        D = "",
        G = !0;
    for (let F of A) {
        if (F.type === "server_tool_use") {
            if (G) {
                if (G = !1, D.trim().length > 0) Z.push(D.trim());
                D = ""
            }
            continue
        }
        if (F.type === "web_search_tool_result") {
            if (!Array.isArray(F.content)) {
                let Y = `Web search error: ${F.content.error_code}`;
                R1(new Error(Y)), Z.push(Y);
                continue
            }
            let I = F.content.map((Y) => ({
                title: Y.title,
                url: Y.url
            }));
            Z.push({
                tool_use_id: F.tool_use_id,
                content: I
            })
        }
        if (F.type === "text")
            if (G) D += F.text;
            else G = !0, D = F.text
    }
    if (D.length) Z.push(D.trim());
    return {
        query: B,
        results: Z,
        durationSeconds: Q
    }
}
var JH = {
    name: Jv1,
    async description(A) {
        return `Claude wants to search the web for: ${A.query}`
    },
    userFacingName() {
        return "Web Search"
    },
    isEnabled() {
        return DZ() === "firstParty"
    },
    inputSchema: vL8,
    isConcurrencySafe() {
        return !0
    },
    isReadOnly() {
        return !0
    },
    async checkPermissions(A, B) {
        let Q = B.getToolPermissionContext(),
            Z = fz(Q, JH, "deny").get(JH.name);
        if (Z) return {
            behavior: "deny",
            message: `${JH.name} denied access.`,
            decisionReason: {
                type: "rule",
                rule: Z
            }
        };
        let D = fz(Q, JH, "ask").get(JH.name);
        if (D) return {
            behavior: "ask",
            message: `Claude requested permissions to use ${JH.name}, but you haven't granted it yet.`,
            decisionReason: {
                type: "rule",
                rule: D
            }
        };
        let G = fz(Q, JH, "allow").get(JH.name);
        if (G) return {
            behavior: "allow",
            updatedInput: A,
            decisionReason: {
                type: "rule",
                rule: G
            }
        };
        return {
            behavior: "ask",
            message: `Claude requested permissions to use ${JH.name}, but you haven't granted it yet.`
        }
    },
    async prompt() {
        return vLB
    },
    renderToolUseMessage({
        query: A,
        allowed_domains: B,
        blocked_domains: Q
    }, {
        verbose: Z
    }) {
        if (!A) return null;
        let D = "";
        if (A) D += `"${A}"`;
        if (Z) {
            if (B && B.length > 0) D += `, only allowing domains: ${B.join(", ")}`;
            if (Q && Q.length > 0) D += `, blocking domains: ${Q.join(", ")}`
        }
        return D
    },
    renderToolUseRejectedMessage() {
        return $R.default.createElement(P5, null)
    },
    renderToolUseErrorMessage(A, {
        verbose: B
    }) {
        return $R.default.createElement(f6, {
            result: A,
            verbose: B
        })
    },
    renderToolUseProgressMessage(A) {
        if (A.length === 0) return null;
        let B = A[A.length - 1];
        if (!B?.data) return null;
        let Q = B.data;
        switch (Q.type) {
            case "query_update":
                return $R.default.createElement(OA, null, $R.default.createElement(T, {
                    dimColor: !0
                }, "Searching: ", Q.query));
            case "search_results_received":
                return $R.default.createElement(OA, null, $R.default.createElement(T, {
                    dimColor: !0
                }, "Found ", Q.resultCount, ' results for "', Q.query, '"'));
            default:
                return null
        }
    },
    renderToolResultMessage(A) {
        let {
            searchCount: B
        } = xL8(A.results), Q = A.durationSeconds >= 1 ? `${Math.round(A.durationSeconds)}s` : `${Math.round(A.durationSeconds*1000)}ms`;
        return $R.default.createElement(v, {
            justifyContent: "space-between",
            width: "100%"
        }, $R.default.createElement(OA, {
            height: 1
        }, $R.default.createElement(T, null, "Did ", B, " search", B !== 1 ? "es" : "", " in ", Q)))
    },
    async validateInput(A) {
        let {
            query: B,
            allowed_domains: Q,
            blocked_domains: Z
        } = A;
        if (!B.length) return {
            result: !1,
            message: "Error: Missing query",
            errorCode: 1
        };
        if (Q && Z) return {
            result: !1,
            message: "Error: Cannot specify both allowed_domains and blocked_domains in the same request",
            errorCode: 2
        };
        return {
            result: !0
        }
    },
    async * call(A, B) {
        let Q = performance.now(),
            {
                query: Z
            } = A,
            D = D2({
                content: "Perform a web search for the query: " + Z
            }),
            G = hL8(A),
            F = V01([D], ["You are an assistant for performing a web search tool use"], B.options.maxThinkingTokens, [], B.abortController.signal, {
                getToolPermissionContext: B.getToolPermissionContext,
                model: AG(),
                prependCLISysprompt: !0,
                toolChoice: void 0,
                isNonInteractiveSession: B.options.isNonInteractiveSession,
                extraToolSchemas: [G],
                promptCategory: "web_search_tool"
            }),
            I = [],
            Y = null,
            W = "",
            J = 0,
            X = new Map;
        for await (let $ of F) {
            if (I.push($), $.type === "stream_event" && $.event?.type === "content_block_start") {
                let L = $.event.content_block;
                if (L && L.type === "server_tool_use") {
                    Y = L.id, W = "";
                    continue
                }
            }
            if (Y && $.type === "stream_event" && $.event?.type === "content_block_delta") {
                let L = $.event.delta;
                if (L?.type === "input_json_delta" && L.partial_json) {
                    W += L.partial_json;
                    try {
                        let N = W.match(/"query"\s*:\s*"((?:[^"\\]|\\.)*)"/);
                        if (N && N[1]) {
                            let R = JSON.parse('"' + N[1] + '"');
                            if (!X.has(Y) || X.get(Y) !== R) X.set(Y, R), J++, yield {
                                type: "progress",
                                toolUseID: `search-progress-${J}`,
                                data: {
                                    type: "query_update",
                                    query: R
                                }
                            }
                        }
                    } catch {}
                }
            }
            if ($.type === "stream_event" && $.event?.type === "content_block_start") {
                let L = $.event.content_block;
                if (L && L.type === "web_search_tool_result") {
                    let N = L.tool_use_id,
                        R = X.get(N) || Z,
                        O = L.content;
                    J++, yield {
                        type: "progress",
                        toolUseID: N || `search-progress-${J}`,
                        data: {
                            type: "search_results_received",
                            resultCount: Array.isArray(O) ? O.length : 0,
                            query: R
                        }
                    }
                }
            }
        }
        let C = I.filter(($) => $.type === "assistant").flatMap(($) => $.message.content),
            H = (performance.now() - Q) / 1000;
        yield {
            type: "result",
            data: gL8(C, Z, H)
        }
    },
    mapToolResultToToolResultBlockParam(A, B) {
        let {
            query: Q,
            results: Z
        } = A, D = `Web search results for query: "${Q}"

`;
        return Z.forEach((G) => {
            if (typeof G === "string") D += G + `

`;
            else if (G.content.length > 0) D += `Links: ${JSON.stringify(G.content)}

`;
            else D += `No links found.

`
        }), {
            tool_use_id: B,
            type: "tool_result",
            content: D.trim()
        }
    }
};
var La3 = h.strictObject({});
var ET0 = new Set([tK.name, k7]),
    RmB = (A) => A.filter((B) => !ET0.has(B.name)),
    Qq = (A, B) => {
        let Q = [SI1, VQ, p$, jS, GU, tK, x8, FF, m$, BH, QR, vI, ...B ? [hF] : [], JH, Ug1, Eg1],
            Z = _s(A),
            D = Q.filter((F) => {
                return !Z.some((I) => I.ruleValue.toolName === F.name && I.ruleValue.ruleContent === void 0)
            }),
            G = D.map((F) => F.isEnabled());
        return D.filter((F, I) => G[I])
    };
var uL8 = {
        type: "local-jsx",
        name: "hooks",
        description: "Manage hook configurations for tool events",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A, B) {
            let Q = B.getToolPermissionContext(),
                Z = Qq(Q, !1).map((D) => D.name);
            return NT0.createElement(VmB, {
                toolNames: Z,
                onExit: A
            })
        },
        userFacingName() {
            return "hooks"
        }
    },
    OmB = uL8;
import {
    relative as mL8
} from "path";
var dL8 = {
        type: "local",
        name: "files",
        description: "List all files currently in context",
        isEnabled: () => !1,
        isHidden: !1,
        async call(A, B) {
            let Q = B.readFileState ? hv(B.readFileState) : [];
            if (Q.length === 0) return "No files in context";
            return `Files in context:
${Q.map((D)=>mL8(t0(),D)).join(`
`)}`
        },
        userFacingName() {
            return "files"
        }
    },
    TmB = dL8;
var RT0 = G1(z1(), 1);
var a2 = G1(z1(), 1),
    XH = G1(z1(), 1);
import {
    join as pS
} from "path";
var qR = {
    FOLDER_NAME: ".claude",
    AGENTS_DIR: "agents"
};

function PmB(A, B, Q, Z, D, G) {
    let F = B.replace(/\n/g, "\\n"),
        Y = Q.length === 1 && Q[0] === "*" ? "" : `
tools: ${Q.join(", ")}`,
        W = G ? `
model: ${G}` : "",
        J = D ? `
color: ${D}` : "";
    return `---
name: ${A}
description: ${F}${Y}${W}${J}
---

${Z}
`
}

function wg1(A) {
    switch (A) {
        case "flagSettings":
            throw new Error(`Cannot get directory path for ${A} agents`);
        case "userSettings":
            return pS(e9(), qR.AGENTS_DIR);
        case "projectSettings":
            return pS(t0(), qR.FOLDER_NAME, qR.AGENTS_DIR);
        case "policySettings":
            return pS(mg(), qR.FOLDER_NAME, qR.AGENTS_DIR);
        case "localSettings":
            return pS(t0(), qR.FOLDER_NAME, qR.AGENTS_DIR)
    }
}

function SmB(A) {
    switch (A) {
        case "projectSettings":
            return pS(".", qR.FOLDER_NAME, qR.AGENTS_DIR);
        default:
            return wg1(A)
    }
}

function LT0(A) {
    let B = wg1(A.source);
    return pS(B, `${A.agentType}.md`)
}

function $g1(A) {
    if (A.source === "built-in") return "Built-in";
    if (A.source === "plugin") throw new Error("Cannot get file path for plugin agents");
    let B = wg1(A.source),
        Q = A.filename || A.agentType;
    return pS(B, `${Q}.md`)
}

function jmB(A) {
    if (A.source === "built-in") return "Built-in";
    let B = SmB(A.source);
    return pS(B, `${A.agentType}.md`)
}

function kmB(A) {
    if (A.source === "built-in") return "Built-in";
    if (A.source === "plugin") return `Plugin: ${A.plugin||"Unknown"}`;
    let B = SmB(A.source),
        Q = A.filename || A.agentType;
    return pS(B, `${Q}.md`)
}

function cL8(A) {
    let B = wg1(A),
        Q = j1();
    if (!Q.existsSync(B)) Q.mkdirSync(B);
    return B
}
async function ymB(A, B, Q, Z, D, G = !0, F, I) {
    if (A === "built-in") throw new Error("Cannot save built-in agents");
    cL8(A);
    let Y = LT0({
            source: A,
            agentType: B
        }),
        W = j1();
    if (G && W.existsSync(Y)) throw new Error(`Agent file already exists: ${Y}`);
    let J = PmB(B, Q, Z, D, F, I);
    W.writeFileSync(Y, J, {
        encoding: "utf-8",
        flush: !0
    })
}
async function _mB(A, B, Q, Z, D, G) {
    if (A.source === "built-in") throw new Error("Cannot update built-in agents");
    let F = j1(),
        I = $g1(A),
        Y = PmB(A.agentType, B, Q, Z, D, G);
    F.writeFileSync(I, Y, {
        encoding: "utf-8",
        flush: !0
    })
}
async function xmB(A) {
    if (A.source === "built-in") throw new Error("Cannot delete built-in agents");
    let B = j1(),
        Q = $g1(A);
    if (B.existsSync(Q)) B.unlinkSync(Q)
}
var tA = G1(z1(), 1);
var Ac = G1(z1(), 1);