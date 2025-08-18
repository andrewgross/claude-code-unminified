/* chunk:602 bytes:[13853933, 13872466) size:18533 source:unpacked-cli.js */
function BE8(A, B, Q, Z) {
    let D = i01(B),
        G = i01(Q),
        F = encodeURIComponent(`**Bug Description**
${G}

**Environment Info**
- Platform: ${sA.platform}
- Terminal: ${sA.terminal}
- Version: ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION||"unknown"}
- Feedback ID: ${A}

**Errors**
\`\`\`json
`),
        I = encodeURIComponent("\n```\n"),
        Y = encodeURIComponent(`
**Note:** Error logs were truncated.
`),
        W = JSON.stringify(Z),
        J = encodeURIComponent(W),
        X = `${TbB}/new?title=${encodeURIComponent(D)}&labels=user-reported,bug&body=`,
        V = AE8 - X.length - F.length - I.length - Y.length,
        C = "";
    if (J.length <= V) C = F + J + I;
    else {
        let K = J.substring(0, V);
        C = F + K + I + Y
    }
    return `${TbB}/new?title=${encodeURIComponent(D)}&body=${C}&labels=user-reported,bug`
}
async function QE8(A) {
    try {
        let B = await jI({
                systemPrompt: ["Generate a concise, technical issue title (max 80 chars) for a public GitHub issue based on this bug report for Claude Code.", "Claude Code is an agentic coding CLI based on the Anthropic API.", "The title should:", "- Be concise, specific and descriptive of the actual problem", "- Use technical terminology appropriate for a software issue", '- For error messages, extract the key error (e.g., "Missing Tool Result Block" rather than the full message)', '- Start with a noun or verb (not "Bug:" or "Issue:")', "- Be direct and clear for developers to understand the problem", '- If you cannot determine a clear issue, use "Bug Report: [brief description]"', "- Any LLM API errors are from the Anthropic API, not from any other model provider", "Your response will be directly used as the title of the Github issue, and as such should not contain any other commentary or explaination"],
                userPrompt: A,
                isNonInteractiveSession: !1,
                promptCategory: "bug_title"
            }),
            Q = B.message.content[0]?.type === "text" ? B.message.content[0].text : "Bug Report";
        if (Q.startsWith(CJ)) return PbB(A);
        return Q
    } catch (B) {
        return R1(B instanceof Error ? B : new Error(String(B))), PbB(A)
    }
}

function PbB(A) {
    let B = A.split(`
`)[0] || "";
    if (B.length <= 60 && B.length > 5) return B;
    let Q = B.slice(0, 60);
    if (B.length > 60) {
        let Z = Q.lastIndexOf(" ");
        if (Z > 30) Q = Q.slice(0, Z);
        Q += "..."
    }
    return Q.length < 10 ? "Bug Report" : Q
}

function af1(A) {
    if (A instanceof Error) {
        let B = new Error(i01(A.message));
        if (A.stack) B.stack = i01(A.stack);
        R1(B)
    } else {
        let B = i01(String(A));
        R1(new Error(B))
    }
}
async function ZE8(A) {
    try {
        let B = AL();
        if (B.error) return {
            success: !1
        };
        let Q = {
                "Content-Type": "application/json",
                "User-Agent": Cy(),
                ...B.headers
            },
            Z = await J9.post("https://api.anthropic.com/api/claude_cli_feedback", {
                content: JSON.stringify(A)
            }, {
                headers: Q
            });
        if (Z.status === 200) {
            let D = Z.data;
            if (D?.feedback_id) return {
                success: !0,
                feedbackId: D.feedback_id
            };
            return af1(new Error("Failed to submit feedback: request did not return feedback_id")), {
                success: !1
            }
        }
        return af1(new Error("Failed to submit feedback:" + Z.status)), {
            success: !1
        }
    } catch (B) {
        if (J9.isAxiosError(B) && B.response?.status === 403) {
            let Q = B.response.data;
            if (Q?.error?.type === "permission_error" && Q?.error?.message?.includes("Custom data retention settings")) return af1(new Error("Cannot submit feedback because custom data retention settings are enabled")), {
                success: !1,
                isZdrOrg: !0
            }
        }
        return af1(B), {
            success: !1
        }
    }
}
var TR0 = G1(z1(), 1),
    DE8 = {
        type: "local-jsx",
        name: "bug",
        description: "Submit feedback about Claude Code",
        isEnabled: () => !(process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_BUG_COMMAND || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC),
        isHidden: !1,
        async call(A, {
            messages: B
        }) {
            return TR0.createElement(SbB, {
                messages: B,
                onDone: A
            })
        },
        userFacingName() {
            return "bug"
        }
    },
    jbB = DE8;
var kbB = 40000,
    GE8 = EA(async () => {
        if (!await XL()) return null;
        try {
            let [A, B, Q, Z] = await Promise.all([F2("git", ["branch", "--show-current"], {
                preserveOutputOnError: !1
            }).then(({
                stdout: G
            }) => G.trim()), F2("git", ["rev-parse", "--abbrev-ref", "origin/HEAD"], {
                preserveOutputOnError: !1
            }).then(({
                stdout: G
            }) => G.replace("origin/", "").trim()), F2("git", ["status", "--short"], {
                preserveOutputOnError: !1
            }).then(({
                stdout: G
            }) => G.trim()), F2("git", ["log", "--oneline", "-n", "5"], {
                preserveOutputOnError: !1
            }).then(({
                stdout: G
            }) => G.trim())]), D = Q.length > kbB ? Q.substring(0, kbB) + `
... (truncated because it exceeds 40k characters. If you need more information, run "git status" using BashTool)` : Q;
            return `This is the git status at the start of the conversation. Note that this status is a snapshot in time, and will not update during the conversation.
Current branch: ${A}

Main branch (you will usually use this for PRs): ${B}

Status:
${D||"(clean)"}

Recent commits:
${Z}`
        } catch (A) {
            return R1(A instanceof Error ? A : new Error(String(A))), null
        }
    }),
    bS = EA(async () => {
        let A = await GE8();
        return {
            ...A ? {
                gitStatus: A
            } : {}
        }
    }),
    PX = EA(async () => {
        let A = LkB();
        return {
            ...A ? {
                claudeMd: A
            } : {},
            "important-instruction-reminders": `Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
`
        }
    });

function ybB() {
    return
}
async function FE8({
    setMessages: A,
    readFileState: B
}) {
    await V7(), A([]), PX.cache.clear?.(), DW.cache.clear?.(), rE(_9()), B.clear(), qk0(), await HeA();
    let Q = await WU("clear");
    if (Q.length > 0) A(Q)
}
var IE8 = {
        type: "local",
        name: "clear",
        description: "Clear conversation history and free up context",
        aliases: ["reset"],
        isEnabled: () => !0,
        isHidden: !1,
        async call(A, B) {
            return await FE8(B), ""
        },
        userFacingName() {
            return "clear"
        }
    },
    _bB = IE8;

function xbB() {
    let A = AG(),
        B = AL0(A);
    return P01(A) - B
}
var YE8 = 13000,
    WE8 = 20000,
    JE8 = 20000;

function fS(A) {
    let B = xbB() - YE8,
        Q = fd() ? B : xbB(),
        Z = Math.max(0, Math.round((Q - A) / Q * 100)),
        D = Q - WE8,
        G = Q - JE8,
        F = A >= D,
        I = A >= G,
        Y = fd() && A >= B;
    return {
        percentLeft: Z,
        isAboveWarningThreshold: F,
        isAboveErrorThreshold: I,
        isAboveAutoCompactThreshold: Y
    }
}

function fd() {
    return H0().autoCompactEnabled
}
async function XE8(A) {
    if (!fd()) return !1;
    let B = UJ(A),
        {
            isAboveAutoCompactThreshold: Q
        } = fS(B);
    return Q
}
async function vbB(A, B) {
    if (!await XE8(A)) return {
        messages: A,
        wasCompacted: !1
    };
    try {
        let {
            messagesAfterCompacting: Z,
            userDisplayMessage: D
        } = await rb1(A, B, !0, void 0, !0);
        if (D) Z.push(q3(D, "info"));
        return {
            messages: Z,
            wasCompacted: !0
        }
    } catch (Z) {
        if (!x61(Z, RF1)) R1(Z instanceof Error ? Z : new Error(String(Z)));
        return {
            messages: A,
            wasCompacted: !1
        }
    }
}
var of1 = G1(z1(), 1),
    VE8 = 20000,
    CE8 = 40000,
    KE8 = 3,
    HE8 = 2000,
    zE8 = new Set(["Read", "Bash", "Grep", "Glob", "LS", "WebSearch", "WebFetch", "Edit", "Write"]),
    PR0 = new Set,
    EE8 = new Set,
    bbB = new Map,
    rf1 = !1,
    sf1 = [];

function UE8(A) {
    if (!A.content) return 0;
    if (typeof A.content === "string") return zJ(A.content);
    return A.content.reduce((B, Q) => {
        if (Q.type === "text") return B + zJ(Q.text);
        else if (Q.type === "image") return B + HE8;
        return B
    }, 0)
}

function wE8(A, B) {
    let Q = bbB.get(A);
    if (Q === void 0) Q = UE8(B), bbB.set(A, Q);
    return Q
}

function $E8(A) {
    return sf1.push(A), () => {
        sf1 = sf1.filter((B) => B !== A)
    }
}

function qE8() {
    sf1.forEach((A) => A())
}
async function tf1(A, B) {
    if (rf1 = !1, IQ(process.env.DISABLE_MICROCOMPACT)) return {
        messages: A
    };
    IQ(process.env.USE_API_CONTEXT_MANAGEMENT);
    let Q = B !== void 0,
        Z = Q ? B : CE8,
        D = [],
        G = new Map;
    for (let V of A)
        if ((V.type === "user" || V.type === "assistant") && Array.isArray(V.message.content)) {
            for (let C of V.message.content)
                if (C.type === "tool_use" && zE8.has(C.name)) {
                    if (!PR0.has(C.id)) D.push(C.id)
                } else if (C.type === "tool_result" && D.includes(C.tool_use_id)) {
                let K = wE8(C.tool_use_id, C);
                G.set(C.tool_use_id, K)
            }
        } let F = D.slice(-KE8),
        I = Array.from(G.values()).reduce((V, C) => V + C, 0),
        Y = 0,
        W = new Set;
    for (let V of D) {
        if (F.includes(V)) continue;
        if (I - Y > Z) W.add(V), Y += G.get(V) || 0
    }
    if (!Q) {
        let V = UJ(A);
        if (!fS(V).isAboveWarningThreshold || Y < VE8) W.clear(), Y = 0
    }
    let J = (V) => {
        return PR0.has(V) || W.has(V)
    };
    W.size > 0;
    let X = [];
    for (let V of A) {
        if (V.type === "attachment" && EE8.has(V.uuid)) continue;
        if (V.type !== "user" && V.type !== "assistant") {
            X.push(V);
            continue
        }
        if (!Array.isArray(V.message.content)) {
            X.push(V);
            continue
        }
        if (V.type === "user") {
            let C = [];
            for (let K of V.message.content)
                if (K.type === "tool_result" && J(K.tool_use_id)) C.push({
                    ...K,
                    content: "[Old tool result content cleared]"
                });
                else C.push(K);
            if (C.length > 0) X.push({
                ...V,
                message: {
                    ...V.message,
                    content: C
                }
            })
        } else {
            let C = [];
            for (let K of V.message.content) C.push(K);
            X.push({
                ...V,
                message: {
                    ...V.message,
                    content: C
                }
            })
        }
    }
    for (let V of W) PR0.add(V);
    if (W.size > 0) return X1("tengu_microcompact", {
        toolsCompacted: W.size,
        totalUncompactedTokens: I,
        tokensAfterCompaction: I - Y,
        tokensSaved: Y,
        triggerType: Q ? "manual" : "auto"
    }), rf1 = !0, qE8(), {
        messages: X
    };
    return {
        messages: X
    }
}

function fbB() {
    let [A, B] = of1.useState(rf1);
    return of1.useEffect(() => {
        return $E8(() => {
            B(rf1)
        })
    }, []), A
}
var NE8 = {
        type: "local",
        name: "compact",
        description: "Clear conversation history but keep a summary in context. Optional: /compact [instructions for summarization]",
        isEnabled: () => !0,
        isHidden: !1,
        argumentHint: "<optional custom summarization instructions>",
        async call(A, B) {
            let {
                abortController: Q,
                messages: Z
            } = B;
            if (Z.length === 0) throw new Error("No messages to compact");
            let D = A.trim();
            try {
                let F = (await tf1(Z)).messages,
                    I = await rb1(F, B, !1, D);
                return PX.cache.clear?.(), DW.cache.clear?.(), "Compacted. ctrl+r to see full summary" + (I.userDisplayMessage ? `
${e1.dim(I.userDisplayMessage)}` : "")
            } catch (G) {
                if (Q.signal.aborted) throw new Error("Compaction canceled.");
                else if (G instanceof Error && G.message === MF1) throw new Error(MF1);
                else throw R1(G instanceof Error ? G : new Error(String(G))), new Error(`Error during compaction: ${G}`)
            }
        },
        userFacingName() {
            return "compact"
        }
    },
    hbB = NE8;
var M2 = G1(z1(), 1),
    n01 = G1(z1(), 1);
var rQ = G1(z1(), 1);

function ef1({
    onThemeSelect: A,
    showIntroText: B = !1,
    helpText: Q = "",
    showHelpTextBelow: Z = !1,
    hideEscToCancel: D = !1,
    skipExitHandling: G = !1
}) {
    let [F] = fB(), {
        setPreviewTheme: I,
        savePreview: Y
    } = QI0(), W = U2(G ? () => {} : void 0), X = rQ.createElement(v, {
        flexDirection: "column",
        gap: 1,
        paddingLeft: 1
    }, B && rQ.createElement(T, null, "Let's get started."), rQ.createElement(v, {
        flexDirection: "column"
    }, rQ.createElement(T, {
        bold: !0
    }, "Choose the text style that looks best with your terminal:"), Q && !Z && rQ.createElement(T, {
        dimColor: !0
    }, Q)), rQ.createElement(uA, {
        options: [{
            label: "Dark mode",
            value: "dark"
        }, {
            label: "Light mode",
            value: "light"
        }, {
            label: "Dark mode (colorblind-friendly)",
            value: "dark-daltonized"
        }, {
            label: "Light mode (colorblind-friendly)",
            value: "light-daltonized"
        }, {
            label: "Dark mode (ANSI colors only)",
            value: "dark-ansi"
        }, {
            label: "Light mode (ANSI colors only)",
            value: "light-ansi"
        }],
        onFocus: (V) => {
            I(V)
        },
        onChange: (V) => {
            Y(), A(V)
        },
        onCancel: G ? () => {
            Y()
        } : async () => {
            Y(), await P4(0)
        },
        visibleOptionCount: 6,
        defaultValue: F
    }), rQ.createElement(v, {
        flexDirection: "column",
        paddingTop: 1
    }, rQ.createElement(T, {
        bold: !0
    }, "Preview"), rQ.createElement(v, {
        paddingLeft: 1,
        marginRight: 1,
        borderStyle: "round",
        flexDirection: "column"
    }, rQ.createElement(JC, {
        patch: {
            oldStart: 1,
            newStart: 1,
            oldLines: 3,
            newLines: 3,
            lines: ["function greet() {", '-  console.log("Hello, World!");', '+  console.log("Hello, Claude!");', "}"]
        },
        dim: !1
    }))));
    if (!B) return rQ.createElement(rQ.Fragment, null, rQ.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingX: 1,
        marginTop: 1
    }, X), Z && Q && rQ.createElement(v, {
        marginLeft: 3,
        marginTop: 1
    }, rQ.createElement(T, {
        dimColor: !0
    }, Q)), !D && rQ.createElement(v, {
        marginLeft: 3
    }, rQ.createElement(T, {
        dimColor: !0
    }, W.pending ? rQ.createElement(rQ.Fragment, null, "Press ", W.keyName, " again to exit") : rQ.createElement(rQ.Fragment, null, "Esc to cancel"))));
    return X
}
var H8 = G1(z1(), 1),
    gbB = G1(z1(), 1);
var SR0 = "__NO_PREFERENCE__";

function Ah1({
    initial: A,
    onSelect: B
}) {
    let Q = A === null ? SR0 : A,
        [Z, D] = gbB.useState(Q),
        G = M_A(),
        F = U2(),
        I = KB() && !aG();
    return H8.createElement(v, {
        flexDirection: "column"
    }, H8.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "remember",
        paddingX: 2,
        paddingY: 1,
        width: "100%"
    }, H8.createElement(v, {
        marginBottom: 1,
        flexDirection: "column"
    }, H8.createElement(T, {
        color: "remember",
        bold: !0
    }, "Select Model"), H8.createElement(T, {
        dimColor: !0
    }, "Switch between Claude models. Applies to this session and future Claude Code sessions. For custom model names, specify with --model.")), H8.createElement(v, {
        flexDirection: "column",
        paddingX: 1
    }, H8.createElement(uA, {
        defaultValue: Z,
        focusValue: G.some((Y) => Y.value === Z) ? Z : G[0]?.value ?? void 0,
        options: G.map((Y) => ({
            ...Y,
            value: Y.value === null ? SR0 : Y.value
        })),
        onFocus: (Y) => D(Y),
        onChange: (Y) => B(Y === SR0 ? null : Y),
        onCancel: () => {}
    })), I && H8.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, H8.createElement(T, {
        dimColor: !0
    }, "Want Opus 4.1? Run ", H8.createElement(T, {
        color: "remember"
    }, "/upgrade"), " to upgrade to Max"))), H8.createElement(v, {
        paddingX: 1
    }, H8.createElement(T, {
        dimColor: !0
    }, F.pending ? H8.createElement(H8.Fragment, null, "Press ", F.keyName, " again to exit") : H8.createElement(H8.Fragment, null, "Enter to confirm · Esc to exit"))))
}
var MJ = G1(z1(), 1);