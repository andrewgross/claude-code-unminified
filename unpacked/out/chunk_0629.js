/* chunk:629 bytes:[14336227, 14355603) size:19376 source:unpacked-cli.js */
function umB({
    modeState: A,
    setModeState: B,
    tools: Q,
    existingAgents: Z,
    onAgentCreated: D
}) {
    let [G, F] = pF.useReducer(aL8, gmB, () => ({
        ...gmB,
        selectedTools: Q.map((g1) => g1.name)
    })), {
        agentType: I,
        whenToUse: Y,
        generationPrompt: W,
        systemPrompt: J,
        selectedTools: X,
        selectedModel: V,
        error: C,
        isGenerating: K,
        wasGenerated: H,
        agentTypeCursorOffset: z,
        whenToUseCursorOffset: $,
        generationPromptCursorOffset: L,
        systemPromptCursorOffset: N
    } = G, R = zR(), O = pF.useCallback((g1) => {
        F({
            type: "SET_AGENT_TYPE",
            value: g1
        }), F({
            type: "SET_AGENT_TYPE_CURSOR",
            value: g1.length
        })
    }, []), P = pF.useCallback((g1) => {
        F({
            type: "SET_WHEN_TO_USE",
            value: g1
        }), F({
            type: "SET_WHEN_TO_USE_CURSOR",
            value: g1.length
        })
    }, []), j = pF.useCallback((g1) => {
        F({
            type: "SET_GENERATION_PROMPT",
            value: g1
        }), F({
            type: "SET_GENERATION_PROMPT_CURSOR",
            value: g1.length
        })
    }, []), f = pF.useCallback((g1) => {
        F({
            type: "SET_SYSTEM_PROMPT",
            value: g1
        }), F({
            type: "SET_SYSTEM_PROMPT_CURSOR",
            value: g1.length
        })
    }, []), k = pF.useCallback((g1) => F({
        type: "SET_SELECTED_TOOLS",
        value: g1
    }), []), c = pF.useCallback((g1) => F({
        type: "SET_ERROR",
        value: g1
    }), []), u = pF.useCallback((g1) => F({
        type: "SET_IS_GENERATING",
        value: g1
    }), []), a = pF.useCallback((g1) => F({
        type: "SET_WAS_GENERATED",
        value: g1
    }), []), l = pF.useCallback((g1) => F({
        type: "SET_AGENT_TYPE_CURSOR",
        value: g1
    }), []), y = pF.useCallback((g1) => F({
        type: "SET_WHEN_TO_USE_CURSOR",
        value: g1
    }), []), t = pF.useCallback((g1) => F({
        type: "SET_GENERATION_PROMPT_CURSOR",
        value: g1
    }), []), E1 = pF.useCallback((g1) => F({
        type: "SET_SYSTEM_PROMPT_CURSOR",
        value: g1
    }), []), C1 = pF.useCallback((g1) => {
        let w1 = g1.trim();
        if (!w1) return "Agent identifier cannot be empty";
        let Q1 = MT0(w1);
        if (Q1) return Q1;
        if (Z.some((k1) => k1.agentType === w1)) return `Agent type "${w1}" already exists`;
        if (w1.length > 50) return "Agent identifier must be 50 characters or less";
        return null
    }, [Z]), _1 = pF.useCallback(() => {
        switch (A.mode) {
            case "create-location":
                B({
                    mode: "main-menu"
                });
                break;
            case "create-type":
                B({
                    mode: "create-location"
                }), F({
                    type: "RESET_MANUAL_STATE"
                });
                break;
            case "create-method":
                B({
                    mode: "create-location"
                }), F({
                    type: "RESET_GENERATION_STATE"
                });
                break;
            case "create-generate":
                B({
                    mode: "create-method",
                    source: A.source
                }), j(""), c(null);
                break;
            case "create-prompt":
                B({
                    mode: "create-type",
                    source: A.source
                }), f("");
                break;
            case "create-description":
                B({
                    mode: "create-prompt",
                    source: A.source,
                    agentType: A.agentType,
                    isGenerated: !1
                }), P("");
                break;
            case "create-tools":
                if (H) B({
                    mode: "create-generate",
                    source: A.source
                });
                else B({
                    mode: "create-description",
                    source: A.source,
                    agentType: A.agentType,
                    systemPrompt: A.systemPrompt,
                    isGenerated: !1
                });
                k([]);
                break;
            case "create-color":
                B({
                    mode: "create-tools",
                    source: A.source,
                    agentType: A.agentType,
                    systemPrompt: A.systemPrompt,
                    whenToUse: A.whenToUse
                });
                break;
            case "create-confirm":
                B({
                    mode: "create-tools",
                    source: A.source,
                    agentType: A.agent.agentType,
                    systemPrompt: A.agent.systemPrompt,
                    whenToUse: A.agent.whenToUse
                });
                break;
            default:
                break
        }
    }, [A, B, H, j, c, f, P, k]);
    DA((g1, w1) => {
        if (w1.escape) _1();
        if (A.mode === "create-confirm") {
            if (g1 === "s" || w1.return) W0(!1);
            else if (g1 === "e") W0(!0)
        }
    });
    let F0 = pF.useCallback(async () => {
            if (A.mode !== "create-generate") return;
            u(!0), c(null);
            try {
                let g1 = Z.map((Q1) => Q1.agentType),
                    w1 = await bmB(W, R, g1);
                P(w1.whenToUse), f(w1.systemPrompt), a(!0), u(!1), O(w1.identifier), B({
                    mode: "create-tools",
                    source: A.source,
                    agentType: w1.identifier,
                    systemPrompt: w1.systemPrompt,
                    whenToUse: w1.whenToUse
                })
            } catch (g1) {
                c(g1 instanceof Error ? g1.message : "Failed to generate agent"), u(!1)
            }
        }, [A, W, R, B, Z, u, c, P, f, a, O]),
        W0 = pF.useCallback(async (g1) => {
            if (A.mode !== "create-confirm") return;
            try {
                if (await ymB(A.source, A.agent.agentType, A.agent.whenToUse, A.agent.tools, A.agent.systemPrompt, !0, A.agent.color, A.agent.model), T01(), X1("tengu_agent_created", {
                        source: A.source,
                        was_generated: H,
                        tools_count: A.agent.tools.length,
                        has_wildcard_tools: A.agent.tools.includes("*"),
                        opened_in_editor: g1,
                        model: A.agent.model
                    }), g1) {
                    let w1 = LT0({
                        source: A.source,
                        agentType: A.agent.agentType
                    });
                    await XA1(w1), D(`Created agent: ${e1.bold(A.agent.agentType)} and opened in editor. If you made edits, restart to load the latest version.`)
                } else D(`Created agent: ${e1.bold(A.agent.agentType)}`)
            } catch (w1) {
                c(w1 instanceof Error ? w1.message : "Failed to save agent")
            }
        }, [A, D, H, c]);
    switch (A.mode) {
        case "create-location":
            return sL8(B);
        case "create-type":
            return g0.createElement(eL8, {
                step: 3,
                label: "Agent type (identifier)",
                value: I,
                onChange: O,
                placeholder: "e.g. code-reviewer, tech-lead, etc ",
                onSubmit: (g1) => {
                    let w1 = C1(g1);
                    if (w1) {
                        c(w1);
                        return
                    }
                    c(null), B({
                        mode: "create-prompt",
                        source: A.source,
                        agentType: g1.trim(),
                        isGenerated: !1
                    })
                },
                cursorOffset: z,
                onChangeCursorOffset: l,
                error: C
            });
        case "create-method":
            return rL8(A, B, a);
        case "create-generate":
            return oL8(A, W, j, L, t, K, F0, C);
        case "create-review-generated":
            return tL8(A, I, O, z, l, C1, C, c);
        case "create-description":
            return g0.createElement(JF, {
                title: "Create new agent",
                subtitle: "Step 5: Description (tell Claude when to use this agent)"
            }, g0.createElement(v, {
                marginTop: 1
            }, g0.createElement(y8, {
                value: Y,
                onChange: P,
                placeholder: "eg. use this agent after you're done writing code...",
                onSubmit: (w1) => {
                    if (w1.trim()) B({
                        mode: "create-tools",
                        source: A.source,
                        agentType: A.agentType,
                        systemPrompt: A.systemPrompt,
                        whenToUse: w1.trim()
                    })
                },
                focus: !0,
                showCursor: !0,
                columns: 80,
                cursorOffset: $,
                onChangeCursorOffset: y
            })));
        case "create-tools":
            return g0.createElement(JF, {
                title: "Create new agent",
                subtitle: `Step ${H?"4":"6"}: Select tools`
            }, g0.createElement(qg1, {
                tools: Q,
                initialTools: X,
                onComplete: (w1) => {
                    k(w1), B({
                        mode: "create-model",
                        source: A.source,
                        agentType: A.agentType,
                        systemPrompt: A.systemPrompt,
                        whenToUse: A.whenToUse,
                        selectedTools: w1
                    })
                }
            }));
        case "create-model":
            return g0.createElement(JF, {
                title: "Create new agent",
                subtitle: `Step ${H?"5":"7"}: Select model`
            }, g0.createElement(Lg1, {
                initialModel: V,
                onComplete: (w1) => {
                    F({
                        type: "SET_SELECTED_MODEL",
                        value: w1
                    }), B({
                        mode: "create-color",
                        source: A.source,
                        agentType: A.agentType,
                        systemPrompt: A.systemPrompt,
                        whenToUse: A.whenToUse,
                        selectedTools: A.selectedTools,
                        selectedModel: w1
                    })
                }
            }));
        case "create-color":
            return g0.createElement(JF, {
                title: "Create new agent",
                subtitle: `Step ${H?"6":"8"}: Choose background color`
            }, g0.createElement(v, {
                marginTop: 1
            }, g0.createElement(Ng1, {
                agentName: A.agentType,
                currentColor: "automatic",
                onConfirm: (w1) => {
                    F({
                        type: "SET_SELECTED_COLOR",
                        value: w1
                    }), B({
                        mode: "create-confirm",
                        agent: {
                            agentType: A.agentType,
                            whenToUse: A.whenToUse,
                            tools: A.selectedTools,
                            systemPrompt: A.systemPrompt,
                            ...A.selectedModel ? {
                                model: A.selectedModel
                            } : {},
                            ...w1 ? {
                                color: w1
                            } : {},
                            source: A.source
                        },
                        source: A.source
                    })
                }
            })));
        case "create-prompt":
            return g0.createElement(JF, {
                title: "Create new agent",
                subtitle: "Step 4: System prompt"
            }, g0.createElement(v, {
                marginTop: 1
            }, g0.createElement(y8, {
                value: J,
                onChange: f,
                placeholder: "Enter system prompt. Be comprehensive for best results",
                onSubmit: () => {
                    if (J) B({
                        mode: "create-description",
                        source: A.source,
                        agentType: A.agentType,
                        systemPrompt: J.trim(),
                        isGenerated: A.isGenerated
                    })
                },
                focus: !0,
                showCursor: !0,
                columns: 80,
                cursorOffset: N,
                onChangeCursorOffset: E1
            })));
        case "create-confirm": {
            let g1 = hmB(A.agent, Q, Z);
            return g0.createElement(JF, {
                title: "Create new agent",
                subtitle: "Final step: Confirm and save"
            }, g0.createElement(v, {
                flexDirection: "column",
                marginTop: 1
            }, g0.createElement(T, null, g0.createElement(T, null, g0.createElement(T, {
                bold: !0
            }, "Name"), ":"), " ", A.agent.agentType), g0.createElement(T, null, g0.createElement(T, null, g0.createElement(T, {
                bold: !0
            }, "Location"), ":"), " ", jmB({
                source: A.source,
                agentType: A.agent.agentType
            })), g0.createElement(T, null, g0.createElement(T, null, g0.createElement(T, {
                bold: !0
            }, "Tools"), ":"), " ", AM8(A.agent.tools)), g0.createElement(T, null, g0.createElement(T, {
                bold: !0
            }, "Model"), ":", " ", xw1(A.agent.model)), g0.createElement(v, {
                marginTop: 1
            }, g0.createElement(T, null, g0.createElement(T, {
                bold: !0
            }, "Description"), " (tells Claude when to use this agent):")), g0.createElement(v, {
                marginLeft: 2,
                marginTop: 1
            }, g0.createElement(T, null, A.agent.whenToUse.length > 240 ? A.agent.whenToUse.slice(0, 240) + "…" : A.agent.whenToUse)), g0.createElement(v, {
                marginTop: 1
            }, g0.createElement(T, null, g0.createElement(T, {
                bold: !0
            }, "System prompt"), ":")), g0.createElement(v, {
                marginLeft: 2,
                marginTop: 1
            }, g0.createElement(T, null, A.agent.systemPrompt.length > 240 ? A.agent.systemPrompt.slice(0, 240) + "…" : A.agent.systemPrompt))), g1.warnings.length > 0 && g0.createElement(v, {
                marginTop: 1,
                flexDirection: "column"
            }, g0.createElement(T, {
                color: "warning"
            }, "Warnings:"), g1.warnings.map((w1, Q1) => g0.createElement(T, {
                key: Q1,
                dimColor: !0
            }, " ", "• ", w1))), g1.errors.length > 0 && g0.createElement(v, {
                marginTop: 1,
                flexDirection: "column"
            }, g0.createElement(T, {
                color: "error"
            }, "Errors:"), g1.errors.map((w1, Q1) => g0.createElement(T, {
                key: Q1,
                color: "error"
            }, " ", "• ", w1))), C && g0.createElement(v, {
                marginTop: 1
            }, g0.createElement(T, {
                color: "error"
            }, C)))
        }
        default:
            return null
    }
}
var iF = G1(z1(), 1),
    OU = G1(z1(), 1);

function mmB({
    agent: A,
    tools: B,
    onSaved: Q,
    onBack: Z
}) {
    let [D, G] = OU.useState("menu"), [F, I] = OU.useState(0), [Y, W] = OU.useState(null), [J, X] = OU.useState(A.color), V = OU.useCallback(async () => {
        try {
            let L = $g1(A);
            await XA1(L), Q(`Opened ${A.agentType} in editor. If you made edits, restart to load the latest version.`)
        } catch (L) {
            W(L instanceof Error ? L.message : "Failed to open editor")
        }
    }, [A, Q]), C = OU.useCallback(async (L = {}) => {
        let {
            tools: N,
            color: R,
            model: O
        } = L, P = R ?? J, j = N !== void 0, f = O !== void 0, k = P !== A.color;
        if (!j && !f && !k) return !1;
        try {
            if (await _mB(A, A.whenToUse, N ?? A.tools, A.systemPrompt, P, O ?? A.model), k && P) R01(A.agentType, P);
            return T01(), Q(`Updated agent: ${e1.bold(A.agentType)}`), !0
        } catch (c) {
            return W(c instanceof Error ? c.message : "Failed to save agent"), !1
        }
    }, [A, J, Q]), K = OU.useMemo(() => [{
        label: "Open in editor",
        action: V
    }, {
        label: "Edit tools",
        action: () => G("edit-tools")
    }, {
        label: "Edit model",
        action: () => G("edit-model")
    }, {
        label: "Edit color",
        action: () => G("edit-color")
    }], [V]), H = OU.useCallback(() => {
        if (W(null), D === "menu") Z();
        else G("menu")
    }, [D, Z]), z = OU.useCallback((L) => {
        if (L.upArrow) I((N) => Math.max(0, N - 1));
        else if (L.downArrow) I((N) => Math.min(K.length - 1, N + 1));
        else if (L.return) {
            let N = K[F];
            if (N) N.action()
        }
    }, [K, F]);
    DA((L, N) => {
        if (N.escape) {
            H();
            return
        }
        if (D === "menu") z(N)
    });
    let $ = () => iF.createElement(v, {
        flexDirection: "column"
    }, iF.createElement(T, {
        dimColor: !0
    }, "Source: ", Zb(A.source)), iF.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, K.map((L, N) => iF.createElement(T, {
        key: L.label,
        color: N === F ? "suggestion" : void 0
    }, N === F ? `${s0.pointer} ` : "  ", L.label))), Y && iF.createElement(v, {
        marginTop: 1
    }, iF.createElement(T, {
        color: "error"
    }, Y)));
    switch (D) {
        case "menu":
            return $();
        case "edit-tools":
            return iF.createElement(qg1, {
                tools: B,
                initialTools: A.tools,
                onComplete: async (L) => {
                    G("menu"), await C({
                        tools: L
                    })
                }
            });
        case "edit-color":
            return iF.createElement(Ng1, {
                agentName: A.agentType,
                currentColor: J || A.color || "automatic",
                onConfirm: async (L) => {
                    X(L), G("menu"), await C({
                        color: L
                    })
                }
            });
        case "edit-model":
            return iF.createElement(Lg1, {
                initialModel: A.model,
                onComplete: async (L) => {
                    G("menu"), await C({
                        model: L
                    })
                }
            });
        default:
            return null
    }
}
var v9 = G1(z1(), 1);