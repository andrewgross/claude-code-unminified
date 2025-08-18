/* chunk:614 bytes:[14077247, 14095910) size:18663 source:unpacked-cli.js */
function QT0({
    onComplete: A
}) {
    let [B] = tQ(), Q = B.mcp.clients, [Z, D] = MU.default.useState({
        type: "list"
    }), [G, F] = MU.default.useState([]), I = MU.default.useMemo(() => Q.filter((Y) => Y.name !== "ide").sort((Y, W) => Y.name.localeCompare(W.name)), [Q]);
    switch (MU.default.useEffect(() => {
            async function Y() {
                let W = await Promise.all(I.map(async (J) => {
                    let X = J.config.scope,
                        V = J.config.type === "sse",
                        C = J.config.type === "http",
                        K = void 0;
                    if (V || C) {
                        let $ = await new Nd(J.name, J.config).tokens();
                        K = Boolean($)
                    }
                    let H = {
                        name: J.name,
                        client: J,
                        scope: X
                    };
                    if (V) return {
                        ...H,
                        transport: "sse",
                        isAuthenticated: K,
                        config: J.config
                    };
                    else if (C) return {
                        ...H,
                        transport: "http",
                        isAuthenticated: K,
                        config: J.config
                    };
                    else return {
                        ...H,
                        transport: "stdio",
                        config: J.config
                    }
                }));
                F(W)
            }
            Y()
        }, [I]), MU.useEffect(() => {
            if (G.length === 0 && I.length > 0) return;
            if (G.length === 0) A("No MCP servers configured. Please run /doctor if this is unexpected. Otherwise, run `claude mcp` or visit https://docs.anthropic.com/en/docs/claude-code/mcp to learn more.")
        }, [G.length, I.length, A]), Z.type) {
        case "list":
            return MU.default.createElement(oO0, {
                servers: G,
                onSelectServer: (Y) => D({
                    type: "server-menu",
                    server: Y
                }),
                onComplete: A
            });
        case "server-menu": {
            let Y = c61(B.mcp.tools, Z.server.name);
            if (Z.server.transport === "stdio") return MU.default.createElement(tO0, {
                server: Z.server,
                serverToolsCount: Y.length,
                onViewTools: () => D({
                    type: "server-tools",
                    server: Z.server
                }),
                onCancel: () => D({
                    type: "list"
                }),
                onComplete: A
            });
            else return MU.default.createElement(eO0, {
                server: Z.server,
                serverToolsCount: Y.length,
                onViewTools: () => D({
                    type: "server-tools",
                    server: Z.server
                }),
                onCancel: () => D({
                    type: "list"
                }),
                onComplete: A
            })
        }
        case "server-tools":
            return MU.default.createElement(AT0, {
                server: Z.server,
                onSelectTool: (Y, W) => D({
                    type: "server-tool-detail",
                    server: Z.server,
                    toolIndex: W
                }),
                onBack: () => D({
                    type: "server-menu",
                    server: Z.server
                })
            });
        case "server-tool-detail": {
            let W = c61(B.mcp.tools, Z.server.name)[Z.toolIndex];
            if (!W) return D({
                type: "server-tools",
                server: Z.server
            }), null;
            return MU.default.createElement(BT0, {
                tool: W,
                server: Z.server,
                onBack: () => D({
                    type: "server-tools",
                    server: Z.server
                })
            })
        }
    }
}
var zW = G1(z1(), 1);

function ZT0({
    serverName: A,
    onComplete: B
}) {
    let [Q] = fB(), [Z] = tQ(), D = HA1(), [G, F] = zW.useState(!0), [I, Y] = zW.useState(null);
    if (zW.useEffect(() => {
            async function W() {
                try {
                    if (!Z.mcp.clients.find((V) => V.name === A)) {
                        Y(`MCP server "${A}" not found`), F(!1);
                        return
                    }
                    switch ((await D(A)).client.type) {
                        case "connected":
                            B(`Successfully reconnected to ${A}`);
                            break;
                        case "needs-auth":
                            Y(`${A} requires authentication`), F(!1), B(`${A} requires authentication. Use /mcp to authenticate.`);
                            break;
                        case "pending":
                        case "failed":
                            Y(`Failed to reconnect to ${A}`), F(!1), B(`Failed to reconnect to ${A}`);
                            break
                    }
                } catch (J) {
                    let X = J instanceof Error ? J.message : String(J);
                    Y(X), F(!1), B(`Error: ${X}`)
                }
            }
            W()
        }, [A, D, Z.mcp.clients, B]), G) return zW.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1
    }, zW.default.createElement(T, {
        color: "text"
    }, "Reconnecting to ", zW.default.createElement(T, {
        bold: !0
    }, A)), zW.default.createElement(v, null, zW.default.createElement(g6, null), zW.default.createElement(T, null, " Establishing connection to MCP server")));
    if (I) return zW.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1
    }, zW.default.createElement(v, null, zW.default.createElement(T, null, pB("error", Q)(s0.cross), " "), zW.default.createElement(T, {
        color: "error"
    }, "Failed to reconnect to ", A)), zW.default.createElement(T, {
        dimColor: !0
    }, "Error: ", I));
    return null
}
var WN8 = {
        type: "local-jsx",
        name: "mcp",
        description: "Manage MCP servers",
        isEnabled: () => !0,
        isHidden: !1,
        argumentHint: "[reconnect <server-name>]",
        async call(A, B, Q) {
            if (Q) {
                let Z = Q.trim().split(/\s+/);
                if (Z[0] === "reconnect" && Z[1]) {
                    let D = Z.slice(1).join(" ");
                    return DT0.default.createElement(ZT0, {
                        serverName: D,
                        onComplete: A
                    })
                }
            }
            return DT0.default.createElement(QT0, {
                onComplete: A
            })
        },
        userFacingName() {
            return "mcp"
        }
    },
    VuB = WN8;
var CuB = {
    type: "prompt",
    name: "pr-comments",
    description: "Get comments from a GitHub pull request",
    progressMessage: "fetching PR comments",
    useSmallFastModel: !0,
    isEnabled: () => !0,
    isHidden: !1,
    userFacingName() {
        return "pr-comments"
    },
    source: "builtin",
    async getPromptForCommand(A) {
        return [{
            type: "text",
            text: `You are an AI assistant integrated into a git-based version control system. Your task is to fetch and display comments from a GitHub pull request.

Follow these steps:

1. Use \`gh pr view --json number,headRepository\` to get the PR number and repository info
2. Use \`gh api /repos/{owner}/{repo}/issues/{number}/comments\` to get PR-level comments
3. Use \`gh api /repos/{owner}/{repo}/pulls/{number}/comments\` to get review comments. Pay particular attention to the following fields: \`body\`, \`diff_hunk\`, \`path\`, \`line\`, etc. If the comment references some code, consider fetching it using eg \`gh api /repos/{owner}/{repo}/contents/{path}?ref={branch} | jq .content -r | base64 -d\`
4. Parse and format all comments in a readable way
5. Return ONLY the formatted comments, with no additional text

Format the comments as:

## Comments

[For each comment thread:]
- @author file.ts#line:
  \`\`\`diff
  [diff_hunk from the API response]
  \`\`\`
  > quoted comment text
  
  [any replies indented]

If there are no comments, return "No comments found."

Remember:
1. Only show the actual comments, no explanatory text
2. Include both PR-level and code review comments
3. Preserve the threading/nesting of comment replies
4. Show the file and line number context for code review comments
5. Use jq to parse the JSON responses from the GitHub API

${A?"Additional user input: "+A:""}
`
        }]
    }
};
var Eb = G1(ax(), 1);
var JN8 = 5,
    KuB = "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    XN8 = "https://raw.githubusercontent.com/anthropics/claude-code/refs/heads/main/CHANGELOG.md";
async function GT0() {
    let A = await J9.get(XN8);
    if (A.status === 200) {
        let B = H0();
        gA({
            ...B,
            cachedChangelog: A.data,
            changelogLastFetched: Date.now()
        })
    }
}

function NI1() {
    return H0().cachedChangelog ?? ""
}

function HuB(A) {
    try {
        if (!A) return {};
        let B = {},
            Q = A.split(/^## /gm).slice(1);
        for (let Z of Q) {
            let D = Z.trim().split(`
`);
            if (D.length === 0) continue;
            let G = D[0];
            if (!G) continue;
            let F = G.split(" - ")[0]?.trim() || "";
            if (!F) continue;
            let I = D.slice(1).filter((Y) => Y.trim().startsWith("- ")).map((Y) => Y.trim().substring(2).trim()).filter(Boolean);
            if (I.length > 0) B[F] = I
        }
        return B
    } catch (B) {
        return R1(B instanceof Error ? B : new Error("Failed to parse changelog")), {}
    }
}

function VN8(A, B, Q = NI1()) {
    try {
        let Z = HuB(Q),
            D = Eb.coerce(A),
            G = B ? Eb.coerce(B) : null;
        if (!G || D && Eb.gt(D, G, {
                loose: !0
            })) return Object.entries(Z).filter(([F]) => !G || Eb.gt(F, G, {
            loose: !0
        })).sort(([F], [I]) => Eb.gt(F, I, {
            loose: !0
        }) ? -1 : 1).flatMap(([F, I]) => I).filter(Boolean).slice(0, JN8)
    } catch (Z) {
        return R1(Z instanceof Error ? Z : new Error("Failed to get release notes")), []
    }
    return []
}

function FT0(A = NI1()) {
    try {
        let B = HuB(A);
        return Object.keys(B).sort((Z, D) => Eb.gt(Z, D, {
            loose: !0
        }) ? 1 : -1).map((Z) => {
            let D = B[Z];
            if (!D || D.length === 0) return null;
            let G = D.filter(Boolean);
            if (G.length === 0) return null;
            return [Z, G]
        }).filter((Z) => Z !== null)
    } catch (B) {
        return R1(B instanceof Error ? B : new Error("Failed to get release notes")), []
    }
}

function eh1(A, B = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/s/claude-code",
    VERSION: "1.0.83"
}.VERSION) {
    if (A !== B || !NI1()) GT0().catch((D) => R1(D instanceof Error ? D : new Error("Failed to fetch changelog")));
    let Q = VN8(B, A);
    return {
        hasReleaseNotes: Q.length > 0,
        releaseNotes: Q
    }
}

function zuB(A) {
    return A.map(([B, Q]) => {
        let Z = `Version ${B}:`,
            D = Q.map((G) => `• ${G}`).join(`
`);
        return `${Z}
${D}`
    }).join(`

`)
}
var CN8 = {
        description: "View release notes",
        isEnabled: () => !0,
        isHidden: !1,
        name: "release-notes",
        userFacingName() {
            return "release-notes"
        },
        type: "local",
        async call() {
            let A = [];
            try {
                let Q = new Promise((Z, D) => {
                    setTimeout(() => D(new Error("Timeout")), 500)
                });
                await Promise.race([GT0(), Q]), A = FT0(NI1())
            } catch {}
            if (A.length > 0) return zuB(A);
            let B = FT0();
            if (B.length > 0) return zuB(B);
            return `See the full changelog at: ${KuB}`
        }
    },
    EuB = CN8;
var UR = G1(z1(), 1);
var vX = G1(z1(), 1);

function LI1({
    logs: A,
    maxHeight: B = 1 / 0,
    onCancel: Q,
    onSelect: Z
}) {
    let {
        columns: D
    } = r9(), [G] = fB();
    if (A.length === 0) return null;
    let F = B - 3,
        I = Math.max(0, A.length - F),
        Y = 12,
        W = 12,
        J = 10,
        X = 15,
        V = A.map((K) => {
            let H = qv1(K.modified).padEnd(Y),
                z = qv1(K.created).padEnd(W),
                $ = `${K.messageCount}`.padStart(J),
                L = (K.gitBranch || "-").substring(0, X - 1).padEnd(X),
                N = K.summary || K.firstPrompt,
                R = K.isSidechain ? " (sidechain)" : "",
                P = `${K.isBookmarked?pB("claude",G)("✻ "):""}${H}${z}${$} ${L}${N}${R}`;
            return {
                label: P.length > D - 2 ? `${P.slice(0,D-5)}...` : P,
                value: K.value.toString(),
                isBookmarked: K.isBookmarked
            }
        }),
        C = A.length.toString().length;
    return vX.default.createElement(v, {
        flexDirection: "column",
        height: B - 1
    }, vX.default.createElement(v, {
        paddingLeft: 3 + C
    }, vX.default.createElement(T, {
        bold: !0,
        color: "text"
    }, "Modified"), vX.default.createElement(T, null, "    "), vX.default.createElement(T, {
        bold: !0,
        color: "text"
    }, "Created"), vX.default.createElement(T, null, "     "), vX.default.createElement(T, {
        bold: !0,
        color: "text"
    }, "# Messages"), vX.default.createElement(T, null, " "), vX.default.createElement(T, {
        bold: !0,
        color: "text"
    }, "Git Branch"), vX.default.createElement(T, null, "     "), vX.default.createElement(T, {
        bold: !0,
        color: "text"
    }, "Summary")), vX.default.createElement(uA, {
        options: V,
        onChange: (K) => Z(parseInt(K, 10)),
        visibleOptionCount: F,
        onCancel: Q
    }), I > 0 && vX.default.createElement(v, {
        paddingLeft: 2
    }, vX.default.createElement(T, {
        color: "secondaryText"
    }, "and ", I, " more…")))
}

function KN8({
    onDone: A,
    onResume: B
}) {
    let [Q, Z] = UR.useState([]), [D, G] = UR.useState(!0), {
        rows: F
    } = r9();
    UR.useEffect(() => {
        async function J() {
            try {
                let X = await ko();
                if (X.length === 0) A("No conversations found to resume");
                else Z(X)
            } catch (X) {
                A("Failed to load conversations")
            } finally {
                G(!1)
            }
        }
        J()
    }, [A]);
    async function I(J) {
        let X = Q[J];
        if (!X) {
            A("Failed to load selected conversation");
            return
        }
        let V = VK(X.messages.find((C) => C.sessionId)?.sessionId);
        if (!V) {
            A("Failed to resume conversation");
            return
        }
        if (X.isBookmarked) X1("tengu_bookmark_resumed", {});
        B(V, X)
    }

    function Y() {
        A()
    }
    if (D) return null;
    let W = Q.filter((J) => !J.isSidechain);
    return UR.createElement(LI1, {
        logs: W,
        maxHeight: F - 2,
        onCancel: Y,
        onSelect: I
    })
}
var HN8 = {
        type: "local-jsx",
        name: "resume",
        description: "Resume a conversation",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A, B) {
            return UR.createElement(KN8, {
                onDone: A,
                onResume: (Z, D) => {
                    B.resume?.(Z, D), A(void 0, {
                        skipMessage: !0
                    })
                }
            })
        },
        userFacingName() {
            return "resume"
        }
    },
    UuB = HN8;
var Ag1 = {
    type: "prompt",
    name: "review",
    description: "Review a pull request",
    isEnabled: () => !0,
    isHidden: !1,
    progressMessage: "reviewing pull request",
    userFacingName() {
        return "review"
    },
    source: "builtin",
    async getPromptForCommand(A) {
        return [{
            type: "text",
            text: `
      You are an expert code reviewer. Follow these steps:

      1. If no PR number is provided in the args, use ${VQ.name}("gh pr list") to show open PRs
      2. If a PR number is provided, use ${VQ.name}("gh pr view <number>") to get PR details
      3. Use ${VQ.name}("gh pr diff <number>") to get the diff
      4. Analyze the changes and provide a thorough code review that includes:
         - Overview of what the PR does
         - Analysis of code quality and style
         - Specific suggestions for improvements
         - Any potential issues or risks
      
      Keep your review concise but thorough. Focus on:
      - Code correctness
      - Following project conventions
      - Performance implications
      - Test coverage
      - Security considerations

      Format your review with clear sections and bullet points.

      PR number: ${A}
    `
        }]
    }
};
var Bq = G1(z1(), 1);
var bQ = G1(z1(), 1);

function zN8(A, B, Q) {
    let Z = Vg(A);
    if (A === null && KB()) {
        let D = _w1();
        if (B) {
            let G = Q ? ` · Resets at ${c11(Q,!0)}` : "";
            Z = `${e1.bold("Default")} ${D} (currently Sonnet${G})`
        } else if (aG()) Z = `${e1.bold("Default")} ${D} (currently Opus)`;
        else Z = `${e1.bold("Sonnet")} ${D}`
    }
    return Z
}

function EN8({
    type: A
}) {
    switch (A) {
        case "check":
            return bQ.createElement(T, {
                color: "success"
            }, " ", s0.tick);
        case "error":
            return bQ.createElement(T, {
                color: "error"
            }, " ", s0.warning);
        case "info":
            return bQ.createElement(T, {
                color: "secondaryText"
            }, " L ")
    }
}

function UN8({
    item: A
}) {
    return bQ.createElement(v, null, bQ.createElement(EN8, {
        type: A.type
    }), bQ.createElement(T, null, A.label))
}