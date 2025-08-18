/* chunk:604 bytes:[13891860, 13910881) size:19021 source:unpacked-cli.js */
var RE8 = {
        aliases: ["theme"],
        type: "local-jsx",
        name: "config",
        description: "Open config panel",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A, {
            options: {
                mcpClients: B
            }
        }) {
            let Q = Cy1(B),
                Z = await MY("tengu_auto_checkpointing") && !IQ(process.env.CLAUDE_CODE_DISABLE_AUTOCHECKPOINTING);
            return jR0.createElement(mbB, {
                onClose: A,
                isConnectedToIde: Q,
                isAutocheckpointingAvailable: Z
            })
        },
        userFacingName() {
            return "config"
        }
    },
    dbB = RE8;
var OE8 = {
        type: "local",
        name: "cost",
        description: "Show the total cost and duration of the current session",
        isEnabled: () => !0,
        isHidden: !1,
        async call() {
            if (KB()) return `With your ${LR1()} subscription, no need to monitor cost — your subscription includes Claude Code usage`;
            return yN0()
        },
        userFacingName() {
            return "cost"
        }
    },
    cbB = OE8;
var nbB = G1(z1(), 1);
var F9 = G1(z1(), 1);
var BI1 = G1(z1(), 1);

function Qb() {
    return BI1.createElement(T, {
        color: "permission"
    }, "Press ", BI1.createElement(T, {
        bold: !0
    }, "Enter"), " to continue…")
}
var NG = G1(z1(), 1);
var QI1 = {
    branch: s0.lineUpDownRight,
    lastBranch: s0.lineUpRight,
    line: s0.lineVertical,
    empty: " "
};

function lbB(A, B = {}) {
    let {
        showValues: Q = !0,
        hideFunctions: Z = !1,
        themeName: D = "dark",
        treeCharColors: G = {}
    } = B, F = [], I = new WeakSet;

    function Y(X, V) {
        if (!V) return X;
        return pB(V, D)(X)
    }

    function W(X, V, C, K = 0) {
        if (typeof X === "string") {
            F.push(V + Y(X, G.value));
            return
        }
        if (typeof X !== "object" || X === null) {
            if (Q) {
                let z = String(X);
                F.push(V + Y(z, G.value))
            }
            return
        }
        if (I.has(X)) {
            F.push(V + Y("[Circular]", G.value));
            return
        }
        I.add(X);
        let H = Object.keys(X).filter((z) => {
            let $ = X[z];
            if (Z && typeof $ === "function") return !1;
            return !0
        });
        H.forEach((z, $) => {
            let L = X[z],
                N = $ === H.length - 1,
                R = K === 0 && $ === 0 ? "" : V,
                O = N ? QI1.lastBranch : QI1.branch,
                P = Y(O, G.treeChar),
                j = z.trim() === "" ? "" : Y(z, G.key),
                f = R + P + (j ? " " + j : ""),
                k = z.trim() !== "";
            if (L && typeof L === "object" && I.has(L)) {
                let c = Y("[Circular]", G.value);
                F.push(f + (k ? ": " : f ? " " : "") + c)
            } else if (L && typeof L === "object" && !Array.isArray(L)) {
                F.push(f);
                let c = N ? QI1.empty : QI1.line,
                    u = Y(c, G.treeChar),
                    a = R + u + " ";
                W(L, a, N, K + 1)
            } else if (Array.isArray(L)) F.push(f + (k ? ": " : f ? " " : "") + "[Array(" + L.length + ")]");
            else if (Q) {
                let c = typeof L === "function" ? "[Function]" : String(L),
                    u = Y(c, G.value);
                f += (k ? ": " : f ? " " : "") + u, F.push(f)
            } else F.push(f)
        })
    }
    let J = Object.keys(A);
    if (J.length === 0) return Y("(empty)", G.value);
    if (J.length === 1 && J[0] !== void 0 && J[0].trim() === "" && typeof A[J[0]] === "string") {
        let X = J[0],
            V = Y(QI1.lastBranch, G.treeChar),
            C = Y(A[X], G.value);
        return V + " " + C
    }
    return W(A, "", !0), F.join(`
`)
}

function TE8(A) {
    let B = {};
    return A.forEach((Q) => {
        if (!Q.path) {
            B[""] = Q.message;
            return
        }
        let Z = Q.path.split("."),
            D = Q.path;
        if (Q.invalidValue !== null && Q.invalidValue !== void 0 && Z.length > 0) {
            let G = [];
            for (let F = 0; F < Z.length; F++) {
                let I = Z[F];
                if (!I) continue;
                let Y = parseInt(I, 10);
                if (!isNaN(Y) && F === Z.length - 1) {
                    let W;
                    if (typeof Q.invalidValue === "string") W = `"${Q.invalidValue}"`;
                    else if (Q.invalidValue === null) W = "null";
                    else if (Q.invalidValue === void 0) W = "undefined";
                    else W = String(Q.invalidValue);
                    G.push(W)
                } else G.push(I)
            }
            D = G.join(".")
        }
        Km1(B, D, Q.message, Object)
    }), B
}

function pbB({
    errors: A
}) {
    let [B] = fB();
    if (A.length === 0) return null;
    let Q = A.reduce((D, G) => {
            let F = G.file || "(file not specified)";
            if (!D[F]) D[F] = [];
            return D[F].push(G), D
        }, {}),
        Z = Object.keys(Q).sort();
    return NG.createElement(v, {
        flexDirection: "column",
        marginTop: 1,
        marginBottom: 1
    }, NG.createElement(T, {
        bold: !0
    }, "Invalid Settings"), Z.map((D) => {
        let G = Q[D] || [];
        G.sort((W, J) => {
            if (!W.path && J.path) return -1;
            if (W.path && !J.path) return 1;
            return (W.path || "").localeCompare(J.path || "")
        });
        let F = TE8(G),
            I = new Map;
        G.forEach((W) => {
            if (W.suggestion || W.docLink) {
                let J = `${W.suggestion||""}|${W.docLink||""}`;
                if (!I.has(J)) I.set(J, {
                    suggestion: W.suggestion,
                    docLink: W.docLink
                })
            }
        });
        let Y = lbB(F, {
            showValues: !0,
            themeName: B,
            treeCharColors: {
                treeChar: "secondaryText",
                key: "text",
                value: "secondaryText"
            }
        });
        return NG.createElement(v, {
            key: D,
            flexDirection: "column"
        }, NG.createElement(T, null, D), NG.createElement(v, {
            marginLeft: 1
        }, NG.createElement(T, {
            color: "secondaryText"
        }, Y)), I.size > 0 && NG.createElement(v, {
            flexDirection: "column",
            marginTop: 1
        }, Array.from(I.values()).map((W, J) => NG.createElement(v, {
            key: `suggestion-pair-${J}`,
            flexDirection: "column",
            marginBottom: 1
        }, W.suggestion && NG.createElement(T, {
            color: "secondaryText",
            wrap: "wrap"
        }, W.suggestion), W.docLink && NG.createElement(T, {
            color: "secondaryText",
            wrap: "wrap"
        }, "Learn more: ", W.docLink)))))
    }))
}
var c3 = G1(z1(), 1);

function kR0({
    scope: A,
    parsingErrors: B,
    warnings: Q
}) {
    let Z = B.length > 0,
        D = Q.length > 0;
    if (!Z && !D) return null;
    return c3.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, c3.default.createElement(v, null, (Z || D) && c3.default.createElement(T, {
        color: Z ? "error" : "warning"
    }, "[", Z ? "Failed to parse" : "Contains warnings", "]", " "), c3.default.createElement(T, null, yg(A))), c3.default.createElement(v, null, c3.default.createElement(T, {
        dimColor: !0
    }, "Location: "), c3.default.createElement(T, {
        dimColor: !0
    }, zK(A))), c3.default.createElement(v, {
        marginLeft: 1,
        flexDirection: "column"
    }, B.map((G, F) => {
        let I = G.mcpErrorMetadata?.serverName;
        return c3.default.createElement(v, {
            key: `error-${F}`
        }, c3.default.createElement(T, null, c3.default.createElement(T, {
            color: "secondaryText"
        }, "└ "), c3.default.createElement(T, {
            color: "error"
        }, "[Error]"), c3.default.createElement(T, {
            color: "secondaryText"
        }, " ", I && `[${I}] `, G.path && G.path !== "" ? `${G.path}: ` : "", G.message)))
    }), Q.map((G, F) => {
        let I = G.mcpErrorMetadata?.serverName;
        return c3.default.createElement(v, {
            key: `warning-${F}`
        }, c3.default.createElement(T, null, c3.default.createElement(T, {
            color: "secondaryText"
        }, "└ "), c3.default.createElement(T, {
            color: "warning"
        }, "[Warning]"), c3.default.createElement(T, {
            color: "secondaryText"
        }, " ", I && `[${I}] `, G.path && G.path !== "" ? `${G.path}: ` : "", G.message)))
    })))
}

function Zh1() {
    let A = ZG("user"),
        B = ZG("project"),
        Q = ZG("local"),
        Z = {
            user: A.errors.filter((I) => I.mcpErrorMetadata && I.mcpErrorMetadata.severity === "fatal"),
            project: B.errors.filter((I) => I.mcpErrorMetadata && I.mcpErrorMetadata.severity === "fatal"),
            local: Q.errors.filter((I) => I.mcpErrorMetadata && I.mcpErrorMetadata.severity === "fatal")
        },
        D = {
            user: A.errors.filter((I) => I.mcpErrorMetadata && I.mcpErrorMetadata.severity === "warning"),
            project: B.errors.filter((I) => I.mcpErrorMetadata && I.mcpErrorMetadata.severity === "warning"),
            local: Q.errors.filter((I) => I.mcpErrorMetadata && I.mcpErrorMetadata.severity === "warning")
        },
        G = Z.user.length > 0 || Z.project.length > 0 || Z.local.length > 0,
        F = D.user.length > 0 || D.project.length > 0 || D.local.length > 0;
    if (!G && !F) return null;
    return c3.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1,
        marginBottom: 1
    }, c3.default.createElement(T, {
        bold: !0
    }, "MCP Config Diagnostics"), c3.default.createElement(v, {
        marginTop: 1
    }, c3.default.createElement(T, {
        color: "secondaryText"
    }, "For help configuring MCP servers, see:", " ", c3.default.createElement(C3, {
        url: "https://docs.anthropic.com/en/docs/claude-code/mcp"
    }, "https://docs.anthropic.com/en/docs/claude-code/mcp"))), c3.default.createElement(kR0, {
        scope: "user",
        parsingErrors: Z.user,
        warnings: D.user
    }), c3.default.createElement(kR0, {
        scope: "project",
        parsingErrors: Z.project,
        warnings: D.project
    }), c3.default.createElement(kR0, {
        scope: "local",
        parsingErrors: Z.local,
        warnings: D.local
    }))
}
import {
    join as ibB
} from "path";

function Zb(A) {
    if (A === "all") return "Agents";
    if (A === "built-in") return "Built-in agents";
    if (A === "plugin") return "Plugin agents";
    return E21(Fq1(A))
}

function PE8(A) {
    return
}

function Dh1({
    onDone: A
}) {
    let [B, Q] = F9.useState(null), [Z, D] = F9.useState([]), [G, F] = F9.useState(null), {
        errors: I
    } = qL(), Y = F9.useMemo(() => DW().map((J) => ({
        path: J.path,
        type: J.type,
        tokens: zJ(J.content)
    })), []), W = I.filter((J) => J.mcpErrorMetadata === void 0);
    if (F9.useEffect(() => {
            o11().then(Q), (async () => {
                let V = j1(),
                    C = ibB(e9(), "agents"),
                    K = ibB(_9(), ".claude", "agents"),
                    {
                        activeAgents: H,
                        failedFiles: z
                    } = await av();
                F({
                    activeAgents: H.map(($) => ({
                        agentType: $.agentType,
                        source: $.source
                    })),
                    userAgentsDir: C,
                    projectAgentsDir: K,
                    userDirExists: V.existsSync(C),
                    projectDirExists: V.existsSync(K),
                    failedFiles: z
                })
            })();
            let J = gz(),
                X = [];
            AF1(async ({
                client: V,
                tools: C
            }) => {
                if (V.type === "connected")
                    for (let K of C) {
                        let H = "";
                        try {
                            if ("prompt" in K && typeof K.prompt === "function") H = await K.prompt({
                                getToolPermissionContext: hV,
                                tools: []
                            })
                        } catch {
                            H = K.name
                        }
                        X.push({
                            name: K.name,
                            serverName: V.name,
                            tokens: zJ(H)
                        })
                    }
            }, J).then(() => {
                D(X)
            }).catch(() => {
                D([])
            })
        }, []), F9.useEffect(() => {
            PE8(W)
        }, [W]), DA((J, X) => {
            if (X.return || X.escape || X.ctrl && J === "c") A()
        }), !B) return F9.default.createElement(v, {
        paddingX: 1,
        paddingTop: 1
    }, F9.default.createElement(T, {
        color: "secondaryText"
    }, "Checking installation status…"));
    return F9.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        paddingX: 1,
        paddingTop: 1
    }, F9.default.createElement(v, {
        flexDirection: "column"
    }, F9.default.createElement(T, {
        bold: !0
    }, "Diagnostics"), F9.default.createElement(T, null, "└ Currently running: ", B.installationType, " (", B.version, ")"), F9.default.createElement(T, null, "└ Path: ", B.installationPath), F9.default.createElement(T, null, "└ Invoked: ", B.invokedBinary), F9.default.createElement(T, null, "└ Config install method: ", B.configInstallMethod), F9.default.createElement(T, null, "└ Auto-updates enabled: ", B.configAutoUpdates), B.hasUpdatePermissions !== null && F9.default.createElement(T, null, "└ Update permissions:", " ", B.hasUpdatePermissions ? "Yes" : "No (requires sudo)"), B.recommendation && F9.default.createElement(F9.default.Fragment, null, F9.default.createElement(T, null), F9.default.createElement(T, {
        color: "warning"
    }, "Recommendation: ", B.recommendation.split(`
`)[0]), F9.default.createElement(T, {
        color: "secondaryText"
    }, B.recommendation.split(`
`)[1])), B.multipleInstallations.length > 1 && F9.default.createElement(F9.default.Fragment, null, F9.default.createElement(T, null), F9.default.createElement(T, {
        color: "warning"
    }, "Warning: Multiple installations found"), B.multipleInstallations.map((J, X) => F9.default.createElement(T, {
        key: X
    }, "└ ", J.type, " at ", J.path))), B.warnings.length > 0 && F9.default.createElement(F9.default.Fragment, null, F9.default.createElement(T, null), B.warnings.map((J, X) => F9.default.createElement(v, {
        key: X,
        flexDirection: "column"
    }, F9.default.createElement(T, {
        color: "warning"
    }, "Warning: ", J.issue), F9.default.createElement(T, null, "Fix: ", J.fix)))), W.length > 0 && F9.default.createElement(F9.default.Fragment, null, F9.default.createElement(T, null), F9.default.createElement(pbB, {
        errors: W
    }))), F9.default.createElement(Zh1, null), Y.length > 0 && F9.default.createElement(v, {
        flexDirection: "column"
    }, F9.default.createElement(T, null, F9.default.createElement(T, {
        bold: !0
    }, "Memory Files"), F9.default.createElement(T, {
        color: "secondaryText"
    }, " ", "·", " ", Math.round(Y.reduce((J, X) => J + X.tokens, 0) / 1000 * 10) / 10, "k tokens")), Y.map((J, X) => F9.default.createElement(T, {
        key: X
    }, "└ ", J.type, " (", J.path, "):", " ", Math.round(J.tokens / 1000 * 10) / 10, "k tokens"))), Z.length > 0 && F9.default.createElement(v, {
        flexDirection: "column"
    }, F9.default.createElement(T, null, F9.default.createElement(T, {
        bold: !0
    }, "MCP Tools"), F9.default.createElement(T, {
        color: "secondaryText"
    }, " ", "·", " ", Math.round(Z.reduce((J, X) => J + X.tokens, 0) / 1000 * 10) / 10, "k tokens")), Z.map((J, X) => F9.default.createElement(T, {
        key: X
    }, "└ ", J.name, " (", J.serverName, "):", " ", Math.round(J.tokens / 1000 * 10) / 10, "k tokens"))), G && F9.default.createElement(v, {
        flexDirection: "column"
    }, F9.default.createElement(T, {
        bold: !0
    }, "Agent Configurations"), F9.default.createElement(T, null, "└ Loaded custom agents:", " ", G.activeAgents.filter((J) => J.source !== "built-in").length), G.activeAgents.filter((J) => J.source !== "built-in").map((J, X) => F9.default.createElement(T, {
        key: X
    }, "  ", "└ ", J.agentType, " (", Zb(J.source), ")")), G.failedFiles && G.failedFiles.length > 0 && F9.default.createElement(F9.default.Fragment, null, F9.default.createElement(T, {
        color: "error"
    }, "└ Failed to parse ", G.failedFiles.length, " agent file(s):"), G.failedFiles.map((J, X) => F9.default.createElement(T, {
        key: X,
        color: "secondaryText"
    }, "  ", "└ ", J.path, ": ", J.error)))), F9.default.createElement(v, null, F9.default.createElement(Qb, null)))
}
var SE8 = {
        name: "doctor",
        description: "Diagnose and verify your Claude Code installation and settings",
        isEnabled: () => !process.env.DISABLE_DOCTOR_COMMAND,
        isHidden: !1,
        userFacingName() {
            return "doctor"
        },
        type: "local-jsx",
        call(A) {
            return new Promise((B) => B(nbB.default.createElement(Dh1, {
                onDone: A
            })))
        }
    },
    abB = SE8;
var gO0 = G1(z1(), 1);
var O2 = G1(z1(), 1),
    cF = G1(z1(), 1);
var Gh1 = G1(z1(), 1);
async function jE8() {
    try {
        if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX) return !0;
        return await J9.get("https://api.anthropic.com/api/hello", {
            timeout: 5000,
            headers: {
                "Cache-Control": "no-cache"
            }
        }), !0
    } catch (A) {
        if (!(A instanceof is0)) return !0;
        return A.code !== "EHOSTUNREACH"
    }
}
var kE8 = 30000;

function yR0() {
    let [A, B] = Gh1.useState(null);
    return Gh1.useEffect(() => {
        let Q = !0;
        if (process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return;
        let Z = async () => {
            if (!Q) return;
            let G = await jE8();
            if (Q) B(G)
        };
        Z();
        let D = setInterval(Z, kE8);
        return () => {
            Q = !1, clearInterval(D)
        }
    }, []), {
        isConnected: A
    }
}