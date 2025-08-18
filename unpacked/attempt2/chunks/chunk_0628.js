/* chunk:628 bytes:[14317974, 14336225) size:18251 source:unpacked-cli.js */
function qg1({
    tools: A,
    initialTools: B,
    onComplete: Q
}) {
    let Z = XF.useMemo(() => RmB(A), [A]),
        D = B.includes("*") ? Z.map((f) => f.name) : B,
        [G, F] = XF.useState(D),
        [I, Y] = XF.useState(0),
        [W, J] = XF.useState(!1),
        X = XF.useMemo(() => {
            let f = new Set(Z.map((k) => k.name));
            return G.filter((k) => f.has(k))
        }, [G, Z]),
        V = new Set(X),
        C = X.length === Z.length && Z.length > 0,
        K = (f) => {
            if (!f) return;
            F((k) => k.includes(f) ? k.filter((c) => c !== f) : [...k, f])
        },
        H = (f, k) => {
            F((c) => {
                if (k) {
                    let u = f.filter((a) => !c.includes(a));
                    return [...c, ...u]
                } else return c.filter((u) => !f.includes(u))
            })
        },
        z = () => {
            let f = Z.map((u) => u.name),
                c = X.length === f.length && f.every((u) => X.includes(u)) ? ["*"] : X;
            Q(c)
        },
        $ = XF.useMemo(() => {
            let f = fmB(),
                k = {
                    readOnly: [],
                    edit: [],
                    execution: [],
                    mcp: [],
                    other: []
                };
            return Z.forEach((c) => {
                if (V40(c)) k.mcp.push(c);
                else if (f.READ_ONLY.toolNames.has(c.name)) k.readOnly.push(c);
                else if (f.EDIT.toolNames.has(c.name)) k.edit.push(c);
                else if (f.EXECUTION.toolNames.has(c.name)) k.execution.push(c);
                else if (c.name !== k7) k.other.push(c)
            }), k
        }, [Z]),
        L = (f) => {
            let c = f.filter((u) => V.has(u.name)).length < f.length;
            return () => {
                let u = f.map((a) => a.name);
                H(u, c)
            }
        },
        N = [];
    N.push({
        id: "continue",
        label: "Continue",
        action: z,
        isContinue: !0
    }), N.push({
        id: "bucket-all",
        label: `${C?s0.checkboxOn:s0.checkboxOff} All tools`,
        action: () => {
            let f = Z.map((k) => k.name);
            H(f, !C)
        }
    });
    let R = fmB();
    [{
        id: "bucket-readonly",
        name: R.READ_ONLY.name,
        tools: $.readOnly
    }, {
        id: "bucket-edit",
        name: R.EDIT.name,
        tools: $.edit
    }, {
        id: "bucket-execution",
        name: R.EXECUTION.name,
        tools: $.execution
    }, {
        id: "bucket-mcp",
        name: R.MCP.name,
        tools: $.mcp
    }, {
        id: "bucket-other",
        name: R.OTHER.name,
        tools: $.other
    }].forEach(({
        id: f,
        name: k,
        tools: c
    }) => {
        if (c.length === 0) return;
        let a = c.filter((l) => V.has(l.name)).length === c.length;
        N.push({
            id: f,
            label: `${a?s0.checkboxOn:s0.checkboxOff} ${k}`,
            action: L(c)
        })
    });
    let P = N.length;
    N.push({
        id: "toggle-individual",
        label: W ? "Hide advanced options" : "Show advanced options",
        action: () => {
            if (J(!W), W && I > P) Y(P)
        },
        isToggle: !0
    });
    let j = XF.useMemo(() => nL8(Z), [Z]);
    if (W) {
        if (j.length > 0) N.push({
            id: "mcp-servers-header",
            label: "MCP Servers:",
            action: () => {},
            isHeader: !0
        }), j.forEach(({
            serverName: f,
            tools: k
        }) => {
            let u = k.filter((a) => V.has(a.name)).length === k.length;
            N.push({
                id: `mcp-server-${f}`,
                label: `${u?s0.checkboxOn:s0.checkboxOff} ${f} (${k.length} tool${k.length===1?"":"s"})`,
                action: () => {
                    let a = k.map((l) => l.name);
                    H(a, !u)
                }
            })
        }), N.push({
            id: "tools-header",
            label: "Individual Tools:",
            action: () => {},
            isHeader: !0
        });
        Z.forEach((f) => {
            let k = f.name;
            if (f.name.startsWith("mcp__")) {
                let c = oy(f.name);
                k = c ? `${c.toolName} (${c.serverName})` : f.name
            }
            N.push({
                id: `tool-${f.name}`,
                label: `${V.has(f.name)?s0.checkboxOn:s0.checkboxOff} ${k}`,
                action: () => K(f.name)
            })
        })
    }
    return DA((f, k) => {
        if (k.return) {
            let c = N[I];
            if (c && !c.isHeader) c.action()
        } else if (k.escape) Q(B);
        else if (k.upArrow) {
            let c = I - 1;
            while (c > 0 && N[c]?.isHeader) c--;
            Y(Math.max(0, c))
        } else if (k.downArrow) {
            let c = I + 1;
            while (c < N.length - 1 && N[c]?.isHeader) c++;
            Y(Math.min(N.length - 1, c))
        }
    }), XF.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, XF.default.createElement(T, {
        color: I === 0 ? "suggestion" : void 0,
        bold: I === 0
    }, I === 0 ? `${s0.pointer} ` : "  ", "[ Continue ]"), XF.default.createElement(T, {
        dimColor: !0
    }, "─".repeat(40)), N.slice(1).map((f, k) => {
        let c = k + 1 === I,
            u = f.isToggle,
            a = f.isHeader;
        return XF.default.createElement(XF.default.Fragment, {
            key: f.id
        }, u && XF.default.createElement(T, {
            dimColor: !0
        }, "─".repeat(40)), a && k > 0 && XF.default.createElement(v, {
            marginTop: 1
        }), XF.default.createElement(T, {
            color: a ? void 0 : c ? "suggestion" : void 0,
            dimColor: a,
            bold: u && c
        }, a ? "" : c ? `${s0.pointer} ` : "  ", u ? `[ ${f.label} ]` : f.label))
    }), XF.default.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, XF.default.createElement(T, {
        dimColor: !0
    }, C ? "All tools selected" : `${V.size} of ${Z.length} tools selected`)))
}
var TJ = G1(z1(), 1);
var TA1 = ["automatic", ...iv];

function Ng1({
    agentName: A,
    currentColor: B = "automatic",
    onConfirm: Q
}) {
    let [Z, D] = TJ.useState(Math.max(0, TA1.findIndex((F) => F === B)));
    DA((F, I) => {
        if (I.upArrow) D((Y) => Y > 0 ? Y - 1 : TA1.length - 1);
        else if (I.downArrow) D((Y) => Y < TA1.length - 1 ? Y + 1 : 0);
        else if (I.return) {
            let Y = TA1[Z];
            Q(Y === "automatic" ? void 0 : Y)
        }
    });
    let G = TA1[Z];
    return TJ.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, TJ.default.createElement(T, {
        color: "secondaryText"
    }, "Choose background color"), TJ.default.createElement(v, {
        flexDirection: "column"
    }, TA1.map((F, I) => {
        let Y = I === Z;
        return TJ.default.createElement(v, {
            key: F,
            flexDirection: "row",
            gap: 1
        }, TJ.default.createElement(T, {
            color: Y ? "suggestion" : void 0
        }, Y ? s0.pointer : " "), F === "automatic" ? TJ.default.createElement(T, {
            bold: Y
        }, "Automatic color") : TJ.default.createElement(v, {
            gap: 1
        }, TJ.default.createElement(T, {
            backgroundColor: UF1[F],
            color: "inverseText"
        }, " "), TJ.default.createElement(T, {
            bold: Y
        }, F.charAt(0).toUpperCase() + F.slice(1))))
    })), TJ.default.createElement(v, {
        marginTop: 1
    }, TJ.default.createElement(T, null, "Preview: "), G === void 0 || G === "automatic" ? TJ.default.createElement(T, {
        inverse: !0,
        bold: !0
    }, " ", A, " ") : TJ.default.createElement(T, {
        backgroundColor: UF1[G],
        color: "inverseText",
        bold: !0
    }, " ", A, " ")))
}
var RU = G1(z1(), 1);

function Lg1({
    initialModel: A,
    onComplete: B
}) {
    let Q = RU.useMemo(() => P_A(), []),
        Z = RU.useMemo(() => {
            if (A && Q.some((D) => D.value === A)) return A;
            return "sonnet"
        }, [A, Q]);
    return RU.createElement(v, {
        flexDirection: "column"
    }, RU.createElement(v, {
        marginBottom: 1
    }, RU.createElement(T, {
        dimColor: !0
    }, "Model determines the agent's reasoning capabilities and speed.")), RU.createElement(uA, {
        options: Q,
        defaultValue: Z,
        onChange: (D) => {
            B(D)
        },
        onCancel: () => B(A)
    }))
}

function MT0(A) {
    if (!A) return "Agent type is required";
    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(A)) return "Agent type must start and end with alphanumeric characters and contain only letters, numbers, and hyphens";
    if (A.length < 3) return "Agent type must be at least 3 characters long";
    if (A.length > 50) return "Agent type must be less than 50 characters";
    return null
}

function hmB(A, B, Q) {
    let Z = [],
        D = [];
    if (!A.agentType) Z.push("Agent type is required");
    else {
        let G = MT0(A.agentType);
        if (G) Z.push(G);
        let F = Q.find((I) => I.agentType === A.agentType && I.source !== A.source);
        if (F) Z.push(`Agent type "${A.agentType}" already exists in ${Zb(F.source)}`)
    }
    if (!A.whenToUse) Z.push("Description (description) is required");
    else if (A.whenToUse.length < 10) D.push("Description should be more descriptive (at least 10 characters)");
    else if (A.whenToUse.length > 5000) D.push("Description is very long (over 5000 characters)");
    if (!A.tools || !Array.isArray(A.tools)) Z.push("Tools must be an array");
    else {
        if (A.tools.length === 0) D.push("No tools selected - agent will have very limited capabilities");
        let G = MA1(A.tools, B, A.source || "userSettings");
        if (G.invalidTools.length > 0) Z.push(`Invalid tools: ${G.invalidTools.join(", ")}`);
        if (A.tools.includes("*")) D.push("Agent has access to all tools")
    }
    if (!A.systemPrompt) Z.push("System prompt is required");
    else if (A.systemPrompt.length < 20) Z.push("System prompt is too short (minimum 20 characters)");
    else if (A.systemPrompt.length > 1e4) D.push("System prompt is very long (over 10,000 characters)");
    return {
        isValid: Z.length === 0,
        errors: Z,
        warnings: D
    }
}
var gmB = {
    agentType: "",
    whenToUse: "",
    generationPrompt: "",
    systemPrompt: "",
    selectedTools: [],
    error: null,
    isGenerating: !1,
    wasGenerated: !1,
    agentTypeCursorOffset: 0,
    whenToUseCursorOffset: 0,
    generationPromptCursorOffset: 0,
    systemPromptCursorOffset: 0
};

function aL8(A, B) {
    switch (B.type) {
        case "SET_AGENT_TYPE":
            return {
                ...A, agentType: B.value
            };
        case "SET_WHEN_TO_USE":
            return {
                ...A, whenToUse: B.value
            };
        case "SET_GENERATION_PROMPT":
            return {
                ...A, generationPrompt: B.value
            };
        case "SET_SYSTEM_PROMPT":
            return {
                ...A, systemPrompt: B.value
            };
        case "SET_SELECTED_TOOLS":
            return {
                ...A, selectedTools: B.value
            };
        case "SET_SELECTED_MODEL":
            return {
                ...A, selectedModel: B.value
            };
        case "SET_SELECTED_COLOR":
            return {
                ...A, selectedColor: B.value
            };
        case "SET_ERROR":
            return {
                ...A, error: B.value
            };
        case "SET_IS_GENERATING":
            return {
                ...A, isGenerating: B.value
            };
        case "SET_WAS_GENERATED":
            return {
                ...A, wasGenerated: B.value
            };
        case "SET_AGENT_TYPE_CURSOR":
            return {
                ...A, agentTypeCursorOffset: B.value
            };
        case "SET_WHEN_TO_USE_CURSOR":
            return {
                ...A, whenToUseCursorOffset: B.value
            };
        case "SET_GENERATION_PROMPT_CURSOR":
            return {
                ...A, generationPromptCursorOffset: B.value
            };
        case "SET_SYSTEM_PROMPT_CURSOR":
            return {
                ...A, systemPromptCursorOffset: B.value
            };
        case "RESET_GENERATION_STATE":
            return {
                ...A, generationPrompt: "", systemPrompt: "", whenToUse: "", agentType: "", error: null, wasGenerated: !1
            };
        case "RESET_MANUAL_STATE":
            return {
                ...A, systemPrompt: "", whenToUse: "", agentType: "", error: null, wasGenerated: !1
            };
        default:
            return A
    }
}

function sL8(A) {
    return g0.createElement(JF, {
        title: "Create new agent",
        subtitle: "Step 1: Choose location"
    }, g0.createElement(v, {
        marginTop: 1
    }, g0.createElement(uA, {
        key: "location-select",
        options: [{
            label: "Project (.claude/agents/)",
            value: "projectSettings"
        }, {
            label: "Personal (~/.claude/agents/)",
            value: "userSettings"
        }],
        onChange: (B) => {
            A({
                mode: "create-method",
                source: B
            })
        },
        onCancel: () => A({
            mode: "main-menu"
        })
    })))
}

function rL8(A, B, Q) {
    return g0.createElement(JF, {
        title: "Create new agent",
        subtitle: "Step 2: Creation method"
    }, g0.createElement(v, {
        marginTop: 1
    }, g0.createElement(uA, {
        key: "method-select",
        options: [{
            label: "Generate with Claude (recommended)",
            value: "generate"
        }, {
            label: "Manual configuration",
            value: "manual"
        }],
        onChange: (Z) => {
            if (Z === "generate") B({
                mode: "create-generate",
                source: A.source
            });
            else Q(!1), B({
                mode: "create-type",
                source: A.source
            })
        },
        onCancel: () => B({
            mode: "create-location"
        })
    })))
}

function oL8(A, B, Q, Z, D, G, F, I) {
    return g0.createElement(JF, {
        title: "Create new agent",
        subtitle: "Step 3: Describe what this agent should do and when it should be used (be comprehensive for best results)"
    }, g0.createElement(v, {
        marginTop: 1
    }, G ? g0.createElement(T, {
        dimColor: !0
    }, B) : g0.createElement(y8, {
        value: B,
        onChange: Q,
        placeholder: "Expert software engineer that helps review my code based on best practices…",
        onSubmit: () => {
            if (B.trim()) F()
        },
        focus: !0,
        showCursor: !0,
        columns: 80,
        cursorOffset: Z,
        onChangeCursorOffset: D
    })), G && g0.createElement(v, {
        marginTop: 1
    }, g0.createElement(g6, null), g0.createElement(T, {
        color: "suggestion"
    }, "Generating agent configuration…")), I && g0.createElement(v, {
        marginTop: 1
    }, g0.createElement(T, {
        color: "error"
    }, I)))
}

function tL8(A, B, Q, Z, D, G, F, I) {
    return g0.createElement(JF, {
        title: "Create new agent",
        subtitle: "Step 4: Review generated specification"
    }, g0.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, g0.createElement(T, {
        bold: !0
    }, "Description (when to use):"), g0.createElement(v, {
        marginLeft: 2,
        marginTop: 1
    }, g0.createElement(T, null, A.whenToUse.length > 80 ? A.whenToUse.slice(0, 80) + "…" : A.whenToUse))), g0.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, g0.createElement(T, {
        bold: !0
    }, "System Prompt:"), g0.createElement(v, {
        marginLeft: 2,
        marginTop: 1
    }, g0.createElement(T, null, A.systemPrompt.length > 80 ? A.systemPrompt.slice(0, 80) + "…" : A.systemPrompt))), g0.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, g0.createElement(T, {
        bold: !0
    }, "Agent identifier:"), g0.createElement(v, {
        marginTop: 1
    }, g0.createElement(y8, {
        value: B,
        onChange: (Y) => {
            Q(Y);
            let W = Y.trim() ? G(Y) : null;
            I(W)
        },
        placeholder: "e.g. code-reviewer, tech-lead",
        focus: !0,
        showCursor: !0,
        columns: 80,
        cursorOffset: Z,
        onChangeCursorOffset: D
    })), F && g0.createElement(v, {
        marginTop: 1
    }, g0.createElement(T, {
        color: "error"
    }, F)), g0.createElement(v, {
        marginTop: 1
    }, g0.createElement(T, {
        dimColor: !0
    }, "Claude suggested this identifier based on your description. You can edit it if needed."))), g0.createElement(v, {
        marginTop: 2
    }, g0.createElement(T, null, "Press ", g0.createElement(T, {
        bold: !0
    }, "Enter"), " to continue to tool selection,", " ", g0.createElement(T, {
        bold: !0
    }, "Escape"), " to regenerate")))
}

function eL8({
    step: A,
    label: B,
    value: Q,
    onChange: Z,
    placeholder: D,
    onSubmit: G,
    cursorOffset: F,
    onChangeCursorOffset: I,
    error: Y
}) {
    let W = `Step ${A}: ${B}`;
    return g0.createElement(JF, {
        title: "Create new agent",
        subtitle: W
    }, g0.createElement(v, {
        marginTop: 1
    }, g0.createElement(y8, {
        value: Q,
        onChange: Z,
        placeholder: D,
        onSubmit: G,
        focus: !0,
        showCursor: !0,
        columns: 80,
        cursorOffset: F,
        onChangeCursorOffset: I
    })), Y && g0.createElement(v, {
        marginTop: 1
    }, g0.createElement(T, {
        color: "error"
    }, Y)))
}
var AM8 = (A) => {
    if (A.includes("*")) return "All tools";
    return A.length === 0 ? "None" : A.join(", ")
};