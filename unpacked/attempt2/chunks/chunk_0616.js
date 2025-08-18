/* chunk:616 bytes:[14115145, 14129066) size:13921 source:unpacked-cli.js */
function uN8() {
    let A = DZ(),
        B = [];
    if (A !== "firstParty") {
        let D = {
            bedrock: "AWS Bedrock",
            vertex: "Google Vertex AI"
        } [A];
        B.push({
            label: `API Provider: ${D}`,
            type: "info"
        })
    }
    if (A === "firstParty") {
        let D = process.env.ANTHROPIC_BASE_URL;
        if (D) B.push({
            label: `Anthropic Base URL: ${D}`,
            type: "info"
        })
    } else if (A === "bedrock") {
        let D = process.env.BEDROCK_BASE_URL;
        if (D) B.push({
            label: `Bedrock Base URL: ${D}`,
            type: "info"
        });
        if (B.push({
                label: `AWS Region: ${fp()}`,
                type: "info"
            }), process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH) B.push({
            label: "AWS auth skipped",
            type: "info"
        })
    } else if (A === "vertex") {
        let D = process.env.VERTEX_BASE_URL;
        if (D) B.push({
            label: `Vertex Base URL: ${D}`,
            type: "info"
        });
        let G = process.env.ANTHROPIC_VERTEX_PROJECT_ID;
        if (G) B.push({
            label: `GCP Project: ${G}`,
            type: "info"
        });
        if (B.push({
                label: `Default region: ${SO()}`,
                type: "info"
            }), process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH) B.push({
            label: "GCP auth skipped",
            type: "info"
        })
    }
    let Q = m41();
    if (Q) B.push({
        label: `Proxy: ${Q}`,
        type: "info"
    });
    let Z = YT();
    if (process.env.NODE_EXTRA_CA_CERTS) B.push({
        label: `Additional CA cert(s): ${process.env.NODE_EXTRA_CA_CERTS}`,
        type: "info"
    });
    if (Z) {
        if (Z.cert && process.env.CLAUDE_CODE_CLIENT_CERT) B.push({
            label: `mTLS client cert: ${process.env.CLAUDE_CODE_CLIENT_CERT}`,
            type: "info"
        });
        if (Z.key && process.env.CLAUDE_CODE_CLIENT_KEY) B.push({
            label: `mTLS client key: ${process.env.CLAUDE_CODE_CLIENT_KEY}`,
            type: "info"
        })
    }
    if (B.length === 0) return null;
    return {
        title: "API Configuration",
        command: "",
        items: B
    }
}

function mN8({
    onClose: A,
    ideInstallationStatus: B,
    context: Q
}) {
    let [Z] = tQ(), [D, G] = Bq.useState([]), F = {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.83"
    }.VERSION;
    return Bq.useEffect(() => {
        async function I() {
            let Y = await rd(),
                W = [],
                J = bN8();
            if (J) W.push(J);
            if (Y) {
                let $ = await fN8();
                if ($) W.push($)
            }
            let X = await hN8();
            if (X) W.push(X);
            let V = _N8(Z.mcp.clients, B);
            if (V) W.push(V);
            let C = xN8(Z.mcp.clients);
            if (C) W.push(C);
            let K = gN8(),
                H = uN8();
            if (K) W.push(K);
            if (H) W.push(H);
            let z = vN8(Q);
            if (z) W.push(z);
            G(W)
        }
        I()
    }, [Z.mcp.clients, B, Q]), Bq.createElement(wuB, {
        sections: D,
        version: F,
        onClose: A
    })
}
var dN8 = {
        type: "local-jsx",
        name: "status",
        description: "Show Claude Code status including version, model, account, API connectivity, and tool statuses",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A, B) {
            return Bq.createElement(mN8, {
                onClose: A,
                ideInstallationStatus: B.options.ideInstallationStatus,
                context: B
            })
        },
        userFacingName() {
            return "status"
        }
    },
    PuB = dN8;
var WT0 = G1(z1(), 1);
var EW = G1(z1(), 1),
    TI1 = G1(z1(), 1);
var wA1 = G1(z1(), 1);

function $A1() {
    let [A, B] = wA1.useState([]), Q = wA1.useCallback(() => {
        B(oTB())
    }, []);
    return wA1.useEffect(() => {
        Q();
        let Z = aTB(() => {
            Q()
        });
        return () => {
            Z()
        }
    }, [Q]), {
        shells: A,
        killShell: (Z) => Yb1(Z)
    }
}
var h8 = G1(z1(), 1),
    OI1 = G1(z1(), 1);

function SuB({
    shell: A,
    onDone: B,
    onKillShell: Q
}) {
    let [Z, D] = OI1.useState(0), [G, F] = OI1.useState({
        stdout: "",
        stderr: "",
        stdoutLines: 0,
        stderrLines: 0
    });
    DA((J, X) => {
        if (X.escape || X.return || J === " ") B();
        else if (J === "k" && A.status === "running" && Q) Q()
    });
    let I = U2(),
        Y = (J) => {
            let X = Math.floor((Date.now() - J) / 1000),
                V = Math.floor(X / 3600),
                C = Math.floor((X - V * 3600) / 60),
                K = X - V * 3600 - C * 60;
            return `${V>0?`${V}h `:""}${C>0||V>0?`${C}m `:""}${K}s`
        };
    OI1.useEffect(() => {
        let J = Ib1(A.id),
            X = (L, N, R = 10) => {
                if (!N) return L;
                let O = L.split(`
`),
                    P = N.split(`
`);
                return [...O, ...P].slice(-R).join(`
`)
            },
            V = X(G.stdout, J.stdout),
            C = X(G.stderr, J.stderr),
            {
                totalLines: K,
                truncatedContent: H
            } = iM(V),
            {
                totalLines: z,
                truncatedContent: $
            } = iM(C);
        if (F({
                stdout: H,
                stderr: $,
                stdoutLines: K,
                stderrLines: z
            }), A.status === "running") {
            let L = setTimeout(() => {
                D((N) => N + 1)
            }, 1000);
            return () => clearTimeout(L)
        }
    }, [A.id, A.status, Z, G.stdout, G.stderr]);
    let W = A.command.length > 70 ? A.command.substring(0, 67) + "..." : A.command;
    return h8.default.createElement(v, {
        width: "100%",
        flexDirection: "column"
    }, h8.default.createElement(v, {
        width: "100%"
    }, h8.default.createElement(v, {
        borderStyle: "round",
        borderColor: "permission",
        flexDirection: "column",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        width: "100%"
    }, h8.default.createElement(v, null, h8.default.createElement(T, {
        color: "permission",
        bold: !0
    }, "Bash Details")), h8.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, h8.default.createElement(T, null, h8.default.createElement(T, {
        bold: !0
    }, "Status:"), " ", A.status === "running" ? h8.default.createElement(T, {
        color: "permission"
    }, A.status, A.result?.code !== void 0 && ` (exit code: ${A.result.code})`) : A.status === "completed" ? h8.default.createElement(T, {
        color: "success"
    }, A.status, A.result?.code !== void 0 && ` (exit code: ${A.result.code})`) : h8.default.createElement(T, {
        color: "error"
    }, A.status, A.result?.code !== void 0 && ` (exit code: ${A.result.code})`)), h8.default.createElement(T, null, h8.default.createElement(T, {
        bold: !0
    }, "Runtime:"), " ", Y(A.startTime)), h8.default.createElement(T, {
        wrap: "truncate-end"
    }, h8.default.createElement(T, {
        bold: !0
    }, "Command:"), " ", W)), h8.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, h8.default.createElement(T, {
        bold: !0
    }, "STDOUT:"), G.stdout ? h8.default.createElement(h8.default.Fragment, null, h8.default.createElement(v, {
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1,
        flexDirection: "column",
        height: 12
    }, G.stdout.split(`
`).slice(-10).map((J, X) => h8.default.createElement(T, {
        key: X,
        wrap: "truncate-end"
    }, J))), h8.default.createElement(T, {
        dimColor: !0,
        italic: !0
    }, G.stdoutLines > 10 ? `Showing last 10 lines of ${G.stdoutLines} total lines` : `Showing ${G.stdoutLines} lines`)) : h8.default.createElement(T, {
        dimColor: !0
    }, "No stdout output available")), G.stderr && h8.default.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, h8.default.createElement(T, {
        bold: !0,
        color: "error"
    }, "STDERR:"), h8.default.createElement(v, {
        borderStyle: "round",
        borderColor: "error",
        paddingX: 1,
        flexDirection: "column",
        height: 3
    }, G.stderr.split(`
`).slice(-1).map((J, X) => h8.default.createElement(T, {
        key: X,
        color: "error",
        wrap: "truncate-end"
    }, J))), h8.default.createElement(T, {
        dimColor: !0,
        italic: !0,
        color: "error"
    }, G.stderrLines > 1 ? `Showing last line of ${G.stderrLines} total lines` : `Showing ${G.stderrLines} line`)))), h8.default.createElement(v, {
        marginLeft: 2
    }, I.pending ? h8.default.createElement(T, {
        dimColor: !0
    }, "Press ", I.keyName, " again to exit") : h8.default.createElement(T, {
        dimColor: !0
    }, "Press Esc/Enter/Space to close", A.status === "running" && Q ? h8.default.createElement(T, null, " · k to kill shell") : null)))
}

function Gg1({
    onDone: A
}) {
    let {
        shells: B,
        killShell: Q
    } = $A1(), [Z, D] = TI1.useState(null), [G, F] = TI1.useState(null);
    TI1.useEffect(() => {
        if (Z && !B.some((V) => V.id === Z)) D(null)
    }, [Z, B]);
    let I = (V) => {
            D(V)
        },
        Y = (V) => {
            Q(V)
        };
    DA((V, C) => {
        if (!Z && C.escape) A();
        if (!Z && V === "k" && G) Y(G)
    });
    let W = U2();
    if (Z) {
        let V = B.find((C) => C.id === Z);
        if (!V) return null;
        return EW.default.createElement(SuB, {
            shell: V,
            onDone: A,
            onKillShell: () => Y(V.id),
            key: `shell-${V.id}`
        })
    }
    let X = B.sort((V, C) => {
        if (V.status === "running" && C.status !== "running") return -1;
        if (V.status !== "running" && C.status === "running") return 1;
        return 0
    }).map((V) => ({
        label: `${V.command.length>40?V.command.substring(0,37)+"...":V.command} (${V.status})`,
        value: V.id
    }));
    return EW.default.createElement(v, {
        width: "100%",
        flexDirection: "column"
    }, EW.default.createElement(v, {
        borderStyle: "round",
        borderColor: "permission",
        flexDirection: "column",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        width: "100%"
    }, EW.default.createElement(v, null, EW.default.createElement(T, {
        color: "permission",
        bold: !0
    }, "Background Bash Shells")), B.length === 0 ? EW.default.createElement(v, {
        marginY: 1
    }, EW.default.createElement(T, null, "No background shells currently running")) : EW.default.createElement(EW.default.Fragment, null, EW.default.createElement(v, null, EW.default.createElement(T, {
        dimColor: !0
    }, "Select a shell to view details")), EW.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1,
        marginBottom: 1
    }, EW.default.createElement(uA, {
        options: X,
        onChange: I,
        onFocus: F,
        onCancel: A
    })))), EW.default.createElement(v, {
        marginLeft: 2
    }, W.pending ? EW.default.createElement(T, {
        dimColor: !0
    }, "Press ", W.keyName, " again to exit") : EW.default.createElement(T, {
        dimColor: !0
    }, "↑/↓ to select · Enter to view · k to kill · Esc to close")))
}
var cN8 = {
        type: "local-jsx",
        name: "bashes",
        description: "List and manage background bash shells",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A) {
            return WT0.createElement(Gg1, {
                onDone: A
            })
        },
        userFacingName() {
            return "bashes"
        }
    },
    juB = cN8;
var lN8 = /```!\s*\n?([\s\S]*?)\n?```/g,
    pN8 = /(?<!\w)!`([^`]+)`/g;
async function qA1(A, B, Q) {
    let Z = A;
    return await Promise.all([...A.matchAll(lN8), ...A.matchAll(pN8)].map(async (D) => {
        let G = D[1]?.trim();
        if (G) try {
            let F = await iw(VQ, {
                command: G
            }, B, YU({
                content: []
            }), "");
            if (F.behavior !== "allow") throw SA(`Bash command permission check failed for command in ${Q}: ${G}. Error: ${F.message}`), new $T(`Bash command permission check failed for pattern "${D[0]}": ${F.message||"Permission denied"}`);
            let {
                data: I
            } = await iTB(VQ.call({
                command: G
            }, B)), Y = kuB(I.stdout, I.stderr);
            Z = Z.replace(D[0], Y)
        } catch (F) {
            if (F instanceof $T) throw F;
            iN8(F, D[0])
        }
    })), Z
}

function kuB(A, B, Q = !1) {
    let Z = [];
    if (A.trim()) Z.push(A.trim());
    if (B.trim())
        if (Q) Z.push(`[stderr: ${B.trim()}]`);
        else Z.push(`[stderr]
${B.trim()}`);
    return Z.join(Q ? " " : `
`)
}

function iN8(A, B, Q = !1) {
    if (A instanceof KL) {
        if (A.interrupted) throw new $T(`Bash command interrupted for pattern "${B}": [Command interrupted]`);
        let G = kuB(A.stdout, A.stderr, Q);
        throw new $T(`Bash command failed for pattern "${B}": ${G}`)
    }
    let Z = A instanceof Error ? A.message : String(A),
        D = Q ? `[Error: ${Z}]` : `[Error]
${Z}`;
    throw new $T(D)
}