/* chunk:630 bytes:[14355605, 14374954) size:19349 source:unpacked-cli.js */
function dmB({
    agent: A,
    tools: B,
    onBack: Q
}) {
    let [Z] = fB(), D = MA1(A.tools, B, A.source), G = kmB(A), F = M01(A.agentType);
    DA((Y, W) => {
        if (W.escape || W.return) Q()
    });

    function I() {
        if (D.hasWildcard) return v9.createElement(T, null, "All tools");
        if (A.tools.length === 0) return v9.createElement(T, null, "None");
        return v9.createElement(v9.Fragment, null, D.validTools.length > 0 && v9.createElement(T, null, D.validTools.join(", ")), D.invalidTools.length > 0 && v9.createElement(T, {
            color: "warning"
        }, s0.warning, " Unrecognized:", " ", D.invalidTools.join(", ")))
    }
    return v9.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, v9.createElement(T, {
        color: "secondaryText"
    }, G), v9.createElement(v, {
        flexDirection: "column"
    }, v9.createElement(T, null, v9.createElement(T, {
        bold: !0
    }, "Description"), " (tells Claude when to use this agent):"), v9.createElement(v, {
        marginLeft: 2
    }, v9.createElement(T, null, A.whenToUse))), v9.createElement(v, null, v9.createElement(T, null, v9.createElement(T, {
        bold: !0
    }, "Tools"), ":", " "), I()), v9.createElement(T, null, v9.createElement(T, {
        bold: !0
    }, "Model"), ": ", xw1(A.model)), F && v9.createElement(v, null, v9.createElement(T, null, v9.createElement(T, {
        bold: !0
    }, "Color"), ":", " ", v9.createElement(T, {
        backgroundColor: F,
        color: "inverseText"
    }, " ", A.agentType, " "))), v9.createElement(v, null, v9.createElement(T, null, v9.createElement(T, {
        bold: !0
    }, "System prompt"), ":")), v9.createElement(v, {
        marginLeft: 2,
        marginRight: 2
    }, v9.createElement(T, null, ZW(A.systemPrompt, Z))))
}
var kI1 = G1(z1(), 1);

function Qc({
    instructions: A = "Press ↑↓ to navigate · Enter to select · Esc to go back"
}) {
    let B = U2();
    return kI1.createElement(v, {
        marginLeft: 3
    }, kI1.createElement(T, {
        dimColor: !0
    }, B.pending ? `Press ${B.keyName} again to exit` : A))
}
var cmB = G1(z1(), 1);

function Mg1(A, B) {
    return cmB.useMemo(() => {
        return Lf([...A, ...B], "name")
    }, [A, B])
}

function lmB({
    tools: A,
    onExit: B,
    initialAgents: Q,
    initialAllAgents: Z
}) {
    let [D, G] = XH.useState({
        mode: "list-agents",
        source: "all"
    }), [F, I] = XH.useState(Q), [Y, W] = XH.useState(Z), [J, X] = XH.useState([]), [V, C] = XH.useState(0), K = Q.length > 0 || Z.length > 0, [H] = tQ(), z = Mg1(A, H.mcp.tools);
    U2(), XH.useEffect(() => {
        if (K && V === 0) return;
        async function R() {
            try {
                let O = await av();
                I(O.activeAgents), W(O.allAgents)
            } catch (O) {
                R1(O instanceof Error ? O : new Error("Failed to load agents"))
            }
        }
        R()
    }, [V, K]);
    let $ = XH.useMemo(() => ({
        "built-in": Y.filter((R) => R.source === "built-in"),
        userSettings: Y.filter((R) => R.source === "userSettings"),
        projectSettings: Y.filter((R) => R.source === "projectSettings"),
        policySettings: Y.filter((R) => R.source === "policySettings"),
        localSettings: Y.filter((R) => R.source === "localSettings"),
        flagSettings: Y.filter((R) => R.source === "flagSettings"),
        plugin: Y.filter((R) => R.source === "plugin"),
        all: Y
    }), [Y]);
    DA((R, O) => {
        if (!O.escape) return;
        let P = J.length > 0 ? `Agent changes:
${J.join(`
`)}` : void 0;
        switch (D.mode) {
            case "list-agents":
                B(P);
                break;
            case "create-location":
                G({
                    mode: "list-agents",
                    source: "all"
                });
                break;
            case "view-agent":
                return;
            default:
                if ("previousMode" in D) G(D.previousMode)
        }
    });
    let L = XH.useCallback((R) => {
            X((O) => [...O, R]), C((O) => O + 1), G({
                mode: "list-agents",
                source: "all"
            })
        }, []),
        N = XH.useCallback(async (R) => {
            try {
                await xmB(R), T01(), X((O) => [...O, `Deleted agent: ${e1.bold(R.agentType)}`]), C((O) => O + 1), G({
                    mode: "list-agents",
                    source: "all"
                })
            } catch (O) {
                R1(O instanceof Error ? O : new Error("Failed to delete agent"))
            }
        }, []);
    switch (D.mode) {
        case "list-agents": {
            let R = D.source === "all" ? [...$["built-in"], ...$.userSettings, ...$.projectSettings, ...$.policySettings, ...$.plugin] : $[D.source],
                O = new Map;
            F.forEach((j) => O.set(j.agentType, j));
            let P = R.map((j) => {
                let f = O.get(j.agentType),
                    k = f && f.source !== j.source ? f.source : void 0;
                return {
                    ...j,
                    overriddenBy: k
                }
            });
            return a2.createElement(a2.Fragment, null, a2.createElement(vmB, {
                source: D.source,
                agents: P,
                onBack: () => {
                    let j = J.length > 0 ? `Agent changes:
${J.join(`
`)}` : void 0;
                    B(j)
                },
                onSelect: (j) => G({
                    mode: "agent-menu",
                    agent: j,
                    previousMode: D
                }),
                onCreateNew: () => G({
                    mode: "create-location"
                }),
                changes: J
            }), a2.createElement(Qc, null))
        }
        case "create-location":
        case "create-type":
        case "create-method":
        case "create-generate":
        case "create-description":
        case "create-tools":
        case "create-model":
        case "create-color":
        case "create-prompt":
        case "create-confirm":
            return a2.createElement(a2.Fragment, null, a2.createElement(umB, {
                modeState: D,
                setModeState: G,
                tools: z,
                existingAgents: F,
                onAgentCreated: L
            }), a2.createElement(Qc, {
                instructions: D.mode === "create-tools" ? "Press Enter to toggle selection, ↑↓ to navigate, Esc to go back" : D.mode === "create-confirm" ? "Press s/Enter to save, e to edit in your editor, Esc to cancel" : D.mode === "create-generate" ? "Press Enter to submit, Esc to go back" : void 0
            }));
        case "agent-menu": {
            let O = Y.find((k) => k.agentType === D.agent.agentType && k.source === D.agent.source) || D.agent,
                P = O.source === "built-in",
                j = [{
                    label: "View agent",
                    value: "view"
                }, ...!P ? [{
                    label: "Edit agent",
                    value: "edit"
                }, {
                    label: "Delete agent",
                    value: "delete"
                }] : [], {
                    label: "Back",
                    value: "back"
                }],
                f = (k) => {
                    switch (k) {
                        case "view":
                            G({
                                mode: "view-agent",
                                agent: O,
                                previousMode: D.previousMode
                            });
                            break;
                        case "edit":
                            G({
                                mode: "edit-agent",
                                agent: O,
                                previousMode: D
                            });
                            break;
                        case "delete":
                            G({
                                mode: "delete-confirm",
                                agent: O,
                                previousMode: D
                            });
                            break;
                        case "back":
                            G(D.previousMode);
                            break
                    }
                };
            return a2.createElement(a2.Fragment, null, a2.createElement(JF, {
                title: D.agent.agentType
            }, a2.createElement(v, {
                flexDirection: "column",
                marginTop: 1
            }, a2.createElement(uA, {
                options: j,
                onChange: f,
                onCancel: () => G(D.previousMode)
            }), J.length > 0 && a2.createElement(v, {
                marginTop: 1
            }, a2.createElement(T, {
                dimColor: !0
            }, J[J.length - 1])))), a2.createElement(Qc, null))
        }
        case "view-agent": {
            let O = Y.find((P) => P.agentType === D.agent.agentType && P.source === D.agent.source) || D.agent;
            return a2.createElement(a2.Fragment, null, a2.createElement(JF, {
                title: O.agentType
            }, a2.createElement(dmB, {
                agent: O,
                tools: z,
                allAgents: Y,
                onBack: () => G({
                    mode: "agent-menu",
                    agent: O,
                    previousMode: D.previousMode
                })
            })), a2.createElement(Qc, {
                instructions: "Press Enter or Esc to go back"
            }))
        }
        case "delete-confirm": {
            let R = [{
                label: "Yes, delete",
                value: "yes"
            }, {
                label: "No, cancel",
                value: "no"
            }];
            return a2.createElement(a2.Fragment, null, a2.createElement(JF, {
                title: "Delete agent",
                titleColor: "error",
                borderColor: "error"
            }, a2.createElement(T, null, "Are you sure you want to delete the agent", " ", a2.createElement(T, {
                bold: !0
            }, D.agent.agentType), "?"), a2.createElement(v, {
                marginTop: 1
            }, a2.createElement(T, {
                dimColor: !0
            }, "Source: ", D.agent.source)), a2.createElement(v, {
                marginTop: 1
            }, a2.createElement(uA, {
                options: R,
                onChange: (O) => {
                    if (O === "yes") N(D.agent);
                    else if ("previousMode" in D) G(D.previousMode)
                },
                onCancel: () => {
                    if ("previousMode" in D) G(D.previousMode)
                }
            }))), a2.createElement(Qc, {
                instructions: "Press ↑↓ to navigate, Enter to select, Esc to cancel"
            }))
        }
        case "edit-agent": {
            let O = Y.find((P) => P.agentType === D.agent.agentType && P.source === D.agent.source) || D.agent;
            return a2.createElement(a2.Fragment, null, a2.createElement(JF, {
                title: `Edit agent: ${O.agentType}`
            }, a2.createElement(mmB, {
                agent: O,
                tools: z,
                onSaved: (P) => {
                    L(P), G(D.previousMode)
                },
                onBack: () => G(D.previousMode)
            })), a2.createElement(Qc, null))
        }
        default:
            return null
    }
}
var BM8 = {
        type: "local-jsx",
        name: "agents",
        description: "Manage agent configurations",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A, B) {
            let Q = B.getToolPermissionContext(),
                Z = Qq(Q, !0),
                D = await av();
            return RT0.createElement(lmB, {
                tools: Z,
                onExit: A,
                initialAgents: D.activeAgents,
                initialAllAgents: D.allAgents
            })
        },
        userFacingName() {
            return "agents"
        }
    },
    pmB = BM8;
var JM8 = G1(z1(), 1);
var WM8 = G1(z1(), 1),
    TT0 = G1(z1(), 1);
import {
    join as QM8,
    basename as ZM8
} from "path";
var DM8 = "plugin";
async function GM8(A, B, Q) {
    let Z = [],
        D = j1();

    function G(F, I = []) {
        try {
            let Y = D.readdirSync(F);
            for (let W of Y) {
                let J = QM8(F, W.name);
                if (W.isDirectory()) G(J, [...I, W.name]);
                else if (W.isFile() && W.name.endsWith(".md")) {
                    let X = FM8(J, B, I, Q);
                    if (X) Z.push(X)
                }
            }
        } catch (Y) {
            SA(`Failed to scan commands directory ${F}: ${Y}`)
        }
    }
    return G(A), Z
}

function FM8(A, B, Q, Z) {
    let D = j1();
    try {
        let G = D.readFileSync(A, {
                encoding: "utf-8"
            }),
            {
                frontmatter: F,
                content: I
            } = Sx(G),
            Y = ZM8(A).replace(/\.md$/, ""),
            J = [B, ...Q, Y].join(":"),
            X = F.description ?? Te(I, "Plugin command"),
            V = Pe(F["allowed-tools"]),
            C = F["argument-hint"],
            K = F.model,
            H = `${X} (${DM8}:${Z})`;
        return {
            type: "prompt",
            name: J,
            description: H,
            allowedTools: V,
            argumentHint: C,
            model: K,
            source: "plugin",
            isEnabled: () => !0,
            isHidden: !1,
            progressMessage: "running",
            userFacingName() {
                return J
            },
            async getPromptForCommand(z, $) {
                let L = I;
                if (z)
                    if (L.includes("$ARGUMENTS")) L = L.replace("$ARGUMENTS", z);
                    else L = L + `

ARGUMENTS: ${z}`;
                let N = $.getToolPermissionContext();
                return L = await qA1(L, {
                    ...$,
                    getToolPermissionContext() {
                        return {
                            ...N,
                            alwaysAllowRules: {
                                ...N.alwaysAllowRules,
                                command: V
                            }
                        }
                    }
                }, `/${J}`), [{
                    type: "text",
                    text: L
                }]
            }
        }
    } catch (G) {
        return SA(`Failed to load command from ${A}: ${G}`), null
    }
}
var OT0 = EA(async () => {
    let {
        enabled: A,
        errors: B
    } = await Md(), Q = [];
    if (B.length > 0) n1(`Plugin loading errors: ${B.map((Z)=>Z.error).join(", ")}`);
    for (let Z of A) {
        if (!Z.commandsPath) continue;
        try {
            let D = await GM8(Z.commandsPath, Z.name, Z.repository);
            if (Q.push(...D), D.length > 0) n1(`Loaded ${D.length} commands from plugin ${Z.name}`)
        } catch (D) {
            SA(`Failed to load commands from plugin ${Z.name}: ${D}`)
        }
    }
    return n1(`Total plugin commands loaded: ${Q.length}`), Q
});
var imB = G1(z1(), 1);
var IM8 = G1(z1(), 1);
var amB = G1(z1(), 1);
var YM8 = G1(z1(), 1);
var smB = G1(z1(), 1);
var PT0 = G1(z1(), 1);
import {
    dirname as XM8,
    basename as VM8
} from "path";
var rmB = EA(async () => {
    try {
        return (await Se("commands")).map(({
            baseDir: Q,
            filePath: Z,
            frontmatter: D,
            content: G,
            source: F
        }) => {
            try {
                let I = D.description ?? Te(G, "Custom command"),
                    Y = Pe(D["allowed-tools"]),
                    W = D["argument-hint"],
                    J = D.model,
                    V = VM8(Z).replace(/\.md$/, ""),
                    C = XM8(Z),
                    K = Q.endsWith("/") ? Q.slice(0, -1) : Q,
                    H = V;
                if (C !== K) {
                    let $ = C.slice(K.length + 1);
                    if ($) H = `${$.split("/").join(":")}:${V}`
                }
                let z = `${I} (${Fq1(F)})`;
                return {
                    type: "prompt",
                    name: H,
                    description: z,
                    allowedTools: Y,
                    argumentHint: W,
                    model: J,
                    isEnabled: () => !0,
                    isHidden: !1,
                    progressMessage: "running",
                    userFacingName() {
                        return H
                    },
                    source: F,
                    async getPromptForCommand($, L) {
                        let N = G;
                        if ($)
                            if (N.includes("$ARGUMENTS")) N = N.replace("$ARGUMENTS", $);
                            else N = N + `

ARGUMENTS: ${$}`;
                        let R = L.getToolPermissionContext();
                        return N = await qA1(N, {
                            ...L,
                            getToolPermissionContext() {
                                return {
                                    ...R,
                                    alwaysAllowRules: {
                                        ...R.alwaysAllowRules,
                                        command: Y
                                    }
                                }
                            }
                        }, `/${H}`), [{
                            type: "text",
                            text: N
                        }]
                    }
                }
            } catch (I) {
                return R1(I instanceof Error ? I : new Error(String(I))), null
            }
        }).filter((Q) => Q !== null)
    } catch (A) {
        return R1(A instanceof Error ? A : new Error(String(A))), []
    }
});
var CM8 = G1(z1(), 1);
var De3 = G1(z1(), 1);
var ST0 = G1(z1(), 1);
var KM8 = {
        type: "local-jsx",
        name: "exit",
        aliases: ["quit"],
        description: "Exit the REPL",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A) {
            return A(), await P4(0), null
        },
        userFacingName() {
            return "exit"
        }
    },
    Rg1 = KM8;
var E9 = G1(z1(), 1),
    Nb = G1(z1(), 1);
var nF = G1(z1(), 1);

function omB({
    message: A,
    screen: B
}) {
    let Q = B === "transcript",
        Z = TjB(A) || "";
    return nF.createElement(v, {
        flexDirection: "column"
    }, nF.createElement(v, {
        flexDirection: "row"
    }, nF.createElement(v, {
        minWidth: 2
    }, nF.createElement(T, {
        color: "text"
    }, FU)), nF.createElement(v, {
        flexDirection: "column"
    }, nF.createElement(T, {
        bold: !0
    }, "Compact summary", !Q && nF.createElement(T, {
        dimColor: !0
    }, " (ctrl+r to expand)")))), Q && nF.createElement(OA, null, nF.createElement(T, null, Z)))
}
var NR = G1(z1(), 1);
var I9 = G1(z1(), 1);
import {
    relative as HM8
} from "path";