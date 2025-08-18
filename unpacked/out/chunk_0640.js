/* chunk:640 bytes:[14519208, 14538932) size:19724 source:unpacked-cli.js */
function _A1({
    commands: A,
    debug: B,
    initialPrompt: Q,
    initialTools: Z,
    initialMessages: D,
    initialTodos: G,
    initialCheckpoints: F,
    mcpClients: I,
    dynamicMcpConfig: Y,
    autoConnectIdeFlag: W,
    strictMcpConfig: J = !1,
    appendSystemPrompt: X
}) {
    let [V, C] = tQ(), {
        todoFeatureEnabled: K,
        toolPermissionContext: H,
        verbose: z,
        mainLoopModel: $,
        maxRateLimitFallbackActive: L,
        mcp: N,
        plugins: R,
        rateLimitResetsAt: O
    } = V, P = zR(), j = X01(), f = iB.useMemo(() => Qq(H, K), [H, K]), [k, c] = iB.useState(Y), u = iB.useCallback((yA) => {
        c(yA)
    }, [c]), [a, l] = iB.useState("prompt"), [y, t] = iB.useState(1), [E1, C1] = iB.useState(!1), {
        notification: _1,
        addNotification: F0
    } = mBB(), W0 = wcB();
    iB.useEffect(() => {
        if (W0.length > 0) F0({
            text: "Found invalid settings files. They will be ignored. Run /doctor for details."
        })
    }, [W0, F0]);
    let g1 = CcB(I, N.clients),
        w1 = iB.useMemo(() => {
            return [...f, ...Z]
        }, [f, Z]);
    HcB();
    let Q1 = Mg1(w1, N.tools),
        k1 = dT0(A, R.commands),
        H1 = dT0(k1, N.commands),
        [A0, V0] = iB.useState(void 0);
    okB(N.clients), EcB(N.clients, V0);
    let [o1, e] = iB.useState("responding"), [Z1, I1] = iB.useState([]), [U1, O1] = iB.useState(null), [B1, x1] = iB.useState(!1), [c1, a1] = iB.useState(void 0), [C0, K0] = iB.useState(null), [R0, wA] = iB.useState(null), [u0, TA] = iB.useState([]), [dA, J2] = iB.useState(D ?? []), [s2, N2] = iB.useState([]), [U9, m6] = iB.useState(!1), [kA, G2] = iB.useState(""), [T2, pA] = iB.useState("prompt"), {
        queuedCommands: bA,
        queuedCommandsRef: r2,
        setQueuedCommands: xB
    } = NcB(), [o6, D3] = iB.useState({}), [C4, oB] = iB.useState(0), [d6, m5] = iB.useState(0), [d5, w8] = iB.useState(null), [N6, w7] = iB.useState(!1), [i3, d7] = iB.useState(!1), [y4, n3] = iB.useState(cg1()), [AD, H2] = iB.useState(H0().hasAcknowledgedCostThreshold), [i1, N1] = iB.useState(new Set), [Z0, f0] = iB.useState("INSERT"), [p0, rA] = iB.useState(!1), [nB, f9] = iB.useState(null), [a9, _4] = iB.useState(null), [b9, K4] = iB.useState(!1), R4 = iB.useRef(!1), KQ = iB.useCallback(() => {
        x1(!1), a1(void 0), m5(0), I1([]), w8(null)
    }, []), QB = tbB(), HQ = (!R0 || R0.showSpinner === !0) && u0.length === 0 && B1, v1 = McB(dA, B1);
    qcB({
        autoConnectIdeFlag: W,
        ideToInstallExtension: nB,
        setDynamicMcpConfig: c,
        setShowIdeOnboarding: K4,
        setIDEInstallationState: _4
    }), GkB(F, V.checkpointing, (yA) => C((YB) => ({
        ...YB,
        checkpointing: yA
    }))), iB.useEffect(() => {
        if (O !== j.resetsAt) C((yA) => ({
            ...yA,
            rateLimitResetsAt: j.resetsAt
        }));
        if (oPB(L, O, j, (yA) => C((YB) => ({
                ...YB,
                maxRateLimitFallbackActive: yA
            }))), L && $ === null) F0({
            text: `Claude Opus limit reached, now using ${JT(Ey())}`
        })
    }, [F0, L, $, O, j, C]);
    let u1 = iB.useCallback((yA) => {
            N2(yA), V7(), n3(cg1())
        }, []),
        N0 = iB.useCallback(async (yA, YB) => {
            let RQ = cT0(YB.messages, Q1),
                S9 = await WU("resume");
            RQ.push(...S9), zv1(YB), KQ(), O1(null), await V7(), n3(yA), J2(() => RQ), wA(null), G2(""), N2([])
        }, [Q1, KQ]),
        x0 = iB.useMemo(() => $v(CB()), []),
        w0 = iB.useRef((() => {
            let yA = Y01(iR8);
            return yA.set(x0, {
                content: JSON.stringify(G || []),
                timestamp: 0
            }), yA
        })()),
        {
            status: h0,
            reverify: VA
        } = YcB();

    function QA() {
        if (KQ(), u0[0]) u0[0].onAbort(), TA([]);
        else U1?.abort()
    }
    let JA = iB.useCallback(() => {
        if (bA.length === 0) return;
        G2([...bA.map((yA) => yA.value), kA].filter(Boolean).join(`
`)), pA("prompt"), xB(() => [])
    }, [bA, G2, pA, xB, kA]);
    WcB(TA, QA, N6 || p0, bA, a, U1?.signal, JA, Z0), iB.useEffect(() => {
        if (aq() >= 5 && !i3 && !AD) {
            if (X1("tengu_cost_threshold_reached", {}), SR1()) d7(!0)
        }
    }, [dA, i3, AD]);
    let e0 = XcB(TA),
        CA = iB.useCallback((yA) => {
            C((YB) => ({
                ...YB,
                toolPermissionContext: yA
            }))
        }, [C]),
        [vB] = fB(),
        R2 = iB.useCallback((yA, YB, RQ, S9, O4, c6) => {
            return {
                abortController: RQ,
                options: {
                    commands: H1,
                    tools: Q1,
                    debug: B,
                    verbose: z,
                    mainLoopModel: c6,
                    maxThinkingTokens: $b(YB, O4),
                    mcpClients: g1,
                    mcpResources: N.resources,
                    ideInstallationStatus: a9,
                    isNonInteractiveSession: !1,
                    dynamicMcpConfig: k,
                    theme: vB
                },
                getToolPermissionContext() {
                    if (!S9.length) return kA1;
                    return {
                        ...kA1,
                        alwaysAllowRules: {
                            ...kA1.alwaysAllowRules,
                            command: S9
                        }
                    }
                },
                getQueuedCommands() {
                    return r2.current
                },
                removeQueuedCommands(iQ) {
                    xB((t6) => t6.filter((c7) => !iQ.includes(c7)))
                },
                messages: yA,
                setMessages: J2,
                setMessageHistory: u1,
                onChangeAPIKey: VA,
                readFileState: w0.current,
                setToolJSX: wA,
                addNotification: F0,
                setToolPermissionContext: CA,
                onChangeDynamicMcpConfig: u,
                onInstallIDEExtension: f9,
                nestedMemoryAttachmentTriggers: new Set,
                setResponseLength: m5,
                setStreamMode: e,
                setSpinnerMessage: w8,
                setInProgressToolUseIDs: N1,
                agentId: CB(),
                resume: N0
            }
        }, [H1, Q1, B, z, g1, N.resources, a9, k, vB, u1, VA, F0, CA, u, N0, r2, xB]);
    async function mB() {
        VA();
        let yA = DW();
        for (let iQ of yA) w0.current.set(iQ.path, {
            content: iQ.content,
            timestamp: Date.now()
        });
        if (!Q) return;
        x1(!0), m5(0), I1([]);
        let YB = await lb1(Q, "prompt", V.checkpointing, (iQ) => {
                C((t6) => ({
                    ...t6,
                    checkpointing: iQ
                }))
            }),
            RQ = Ii0();
        O1(RQ);
        let {
            messages: S9,
            shouldQuery: O4,
            allowedTools: c6
        } = await RA1({
            input: Q,
            mode: "prompt",
            setIsLoading: x1,
            setToolJSX: wA,
            context: R2(dA, dA, RQ, [], void 0, P),
            ideSelection: A0,
            autocheckpoint: YB,
            messages: dA,
            setUserInputOnProcessing: a1
        });
        if (S9.length) {
            for (let MG of S9)
                if (MG.type === "user") fx(Q);
            if (J2((MG) => [...MG, ...S9]), !O4) {
                KQ(), O1(null);
                return
            }
            let [iQ, t6, c7] = await Promise.all([NA1(Q1, P, Array.from(H.additionalWorkingDirectories.keys()), g1, H), PX(), bS()]), QQ = [...iQ, ...X ? [X] : []], $7 = R2([...dA, ...S9], S9, RQ, [], void 0, P), SD = c6 ? {
                ...$7,
                getToolPermissionContext() {
                    let MG = kA1;
                    return {
                        ...MG,
                        alwaysAllowRules: {
                            ...MG.alwaysAllowRules,
                            command: c6
                        }
                    }
                }
            } : $7, $W = jI1();
            for await (let MG of wR({
                messages: [...dA, ...S9],
                systemPrompt: QQ,
                userContext: t6,
                systemContext: c7,
                canUseTool: e0,
                toolUseContext: SD,
                promptCategory: $W
            })) WF1(MG, (x4) => {
                J2((i4) => [...i4, x4])
            }, (x4) => m5((i4) => i4 + x4.length), e, I1)
        } else fx(Q);
        H2(H0().hasAcknowledgedCostThreshold || !1), KQ()
    }
    async function $1(yA, YB, RQ, S9, O4, c6) {
        let iQ = !dA.find((x4) => x4.type === "user");
        J2((x4) => [...x4, ...yA]), m5(0), I1([]);
        let t6 = yA.filter((x4) => x4.type === "user" || x4.type === "assistant").pop();
        if (RQ) {
            u$.handleQueryStart(g1);
            let x4 = eV(g1);
            if (x4) UGB(x4)
        }
        if (Ne(), t6?.type === "user" && typeof t6.message.content === "string") USB(t6.message.content);
        if (!iQ) C((x4) => ({
            ...x4,
            spinnerTip: void 0
        })), ScB(kcB).then((x4) => {
            if (C((i4) => ({
                    ...i4,
                    spinnerTip: x4?.content
                })), x4) jcB(x4)
        });
        if (!RQ) {
            KQ(), O1(null);
            return
        }
        let c7 = R2([...dA, ...yA], yA, YB, S9, c6, O4),
            [QQ, $7, SD] = await Promise.all([NA1(Q1, O4, Array.from(H.additionalWorkingDirectories.keys()), g1, H), PX(), bS()]),
            $W = [...QQ, ...X ? [X] : []],
            MG = jI1();
        for await (let x4 of wR({
            messages: [...dA, ...yA],
            systemPrompt: $W,
            userContext: $7,
            systemContext: SD,
            canUseTool: e0,
            toolUseContext: c7,
            promptCategory: MG
        })) WF1(x4, (i4) => {
            J2((qW) => [...qW, i4])
        }, (i4) => m5((qW) => qW + i4.length), e, I1);
        if (!U9) J2((x4) => {
            let i4 = UJ(x4);
            if (P01(O4) === 1e6) return x4;
            let {
                percentLeft: HH
            } = fS(i4);
            if (HH > 10) return x4;
            let {
                hasAccess: zH
            } = Xa();
            if (!zH) return x4;
            let MR = L_A.value,
                hQ = `${HH}% context left` + (fd() ? " until auto-compact" : "") + ` · try \`/model ${MR}\``,
                qC = q3(hQ, "suggestion");
            return m6(!0), [...x4, qC]
        });
        KQ()
    }
    async function B0(yA, YB, RQ, S9, O4, c6) {
        if (R4.current) {
            X1("tengu_concurrent_onquery_detected", {}), X1("tengu_concurrent_onquery_blocked", {});
            let iQ = {
                type: "system",
                content: "Previous query still processing. Please try again.",
                timestamp: new Date().toISOString(),
                uuid: cg1(),
                level: "warning"
            };
            J2((t6) => [...t6, iQ]), x1(!1);
            return
        }
        R4.current = !0;
        try {
            await $1(yA, YB, RQ, S9, O4, c6)
        } finally {
            R4.current = !1
        }
    }
    jPB(), rjB(dA, dA.length === D?.length), IcB(), iB.useEffect(() => {
        if (bA.length < 1) return;
        let yA = H0();
        gA({
            ...yA,
            promptQueueUseCount: (yA.promptQueueUseCount ?? 0) + 1
        })
    }, [bA.length]);
    let m1 = !B1 && i3;
    iB.useEffect(() => {
        ZI1.recordUserActivity(), L21()
    }, [kA, C4]), iB.useEffect(() => {
        if (B1) return;
        if (C4 === 0) return;
        let yA = setTimeout(() => {
            let YB = Date.now() - mW1();
            if (!B1 && u0.length === 0 && !R0 && !m1 && !N6 && YB >= H0().messageIdleNotifThresholdMs) w01({
                message: "Claude is waiting for your input"
            })
        }, EyB());
        return () => clearTimeout(yA)
    }, [B1, u0.length, R0, m1, N6, dA, C4]), iB.useEffect(() => {
        return mB(), () => {
            u$.shutdown()
        }
    }, []);
    let {
        internal_eventEmitter: z0,
        internal_resetLineCount: M0
    } = a_(), [q0, AA] = iB.useState(0);
    iB.useEffect(() => {
        let yA = () => {
                process.stdout.write(`
Claude Code has been suspended. Run \`fg\` to bring Claude Code back.
Note: ctrl + z now suspends Claude Code, ctrl + _ undoes input.
`)
            },
            YB = () => {
                M0(), AA((RQ) => RQ + 1)
            };
        return z0?.on("suspend", yA), z0?.on("resume", YB), () => {
            z0?.off("suspend", yA), z0?.off("resume", YB)
        }
    }, [z0, M0]);
    let HA = iB.useMemo(() => IF(dA).filter(Ld), [dA]),
        WA = iB.useMemo(() => IF(s2).filter(Ld), [s2]),
        PA = iB.useMemo(() => new Set(Object.keys(U01(HA))), [HA]),
        cA = iB.useMemo(() => mb1(HA), [HA]);
    zcB(a, l, t, C1, V7);
    let [X2, w9] = iB.useState(null), [h9, SQ] = iB.useState(!1);
    if (a === "transcript") return k4.createElement(k4.Fragment, null, k4.createElement(_I1, {
        messages: dA,
        normalizedMessageHistory: WA,
        tools: Q1,
        verbose: !0,
        toolJSX: null,
        toolUseConfirmQueue: [],
        inProgressToolUseIDs: i1,
        isMessageSelectorVisible: !1,
        conversationId: y4,
        screen: a,
        screenToggleId: y,
        streamingToolUses: Z1,
        showAllInTranscript: E1
    }), k4.createElement(v, {
        alignItems: "center",
        alignSelf: "center",
        borderTopColor: "secondaryBorder",
        borderBottom: !1,
        borderLeft: !1,
        borderRight: !1,
        borderStyle: "single",
        marginTop: 1,
        paddingLeft: 2,
        width: "100%"
    }, k4.createElement(T, {
        dimColor: !0
    }, "Showing detailed transcript · Ctrl+R to toggle")));
    return k4.createElement(XuB, {
        key: q0,
        dynamicMcpConfig: k,
        isStrictMcpConfig: J
    }, k4.createElement(_I1, {
        messages: dA,
        normalizedMessageHistory: WA,
        tools: Q1,
        verbose: z,
        toolJSX: R0,
        toolUseConfirmQueue: u0,
        inProgressToolUseIDs: i1,
        isMessageSelectorVisible: N6,
        conversationId: y4,
        screen: a,
        screenToggleId: y,
        streamingToolUses: Z1,
        showAllInTranscript: E1
    }), c1 && k4.createElement(v, {
        paddingX: 2,
        paddingTop: 1
    }, k4.createElement(T, {
        dimColor: !0
    }, c1)), k4.createElement(v, {
        flexDirection: "column",
        width: "100%"
    }, R0 ? R0.jsx : null, HQ && k4.createElement(obB, {
        mode: o1,
        spinnerVerbs: QB,
        spinnerTip: V.spinnerTip,
        currentResponseLength: d6,
        overrideMessage: d5,
        verbose: z
    }), !R0 && u0[0] !== void 0 && !N6 && k4.createElement(DbB, {
        onDone: () => TA(([yA, ...YB]) => YB),
        onReject: JA,
        setToolPermissionContext: CA,
        toolUseConfirm: u0[0],
        toolUseContext: R2(dA, dA, U1 ?? h4(), [], void 0, P),
        verbose: z
    }), !R0 && u0.length === 0 && !N6 && m1 && k4.createElement(uBB, {
        onDone: () => {
            d7(!1), H2(!0);
            let yA = H0();
            gA({
                ...yA,
                hasAcknowledgedCostThreshold: !0
            }), X1("tengu_cost_threshold_acknowledged", {})
        }
    }), !R0 && u0.length === 0 && !N6 && !m1 && !X2 && !h9 && b9 && k4.createElement(GGB, {
        onDone: () => K4(!1),
        installationStatus: a9
    }), X2, u0.length === 0 && !R0?.shouldHidePromptInput && !N6 && !m1 && !X2 && !b9 && !h9 && k4.createElement(k4.Fragment, null, k4.createElement(OcB, {
        state: v1.state,
        handleSelect: v1.handleSelect,
        inputValue: kA,
        setInputValue: G2
    }), k4.createElement(GcB, {
        debug: B,
        ideSelection: A0,
        getToolUseContext: R2,
        toolPermissionContext: H,
        setToolPermissionContext: CA,
        apiKeyStatus: h0,
        commands: H1,
        isLoading: B1,
        onExit: async () => {
            SQ(!0);
            let yA = await Rg1.call(() => P4(0));
            w9(yA)
        },
        onQuery: B0,
        verbose: z,
        messages: dA,
        setToolJSX: wA,
        onAutoUpdaterResult: K0,
        autoUpdaterResult: C0,
        input: kA,
        onInputChange: G2,
        mode: T2,
        onModeChange: pA,
        queuedCommands: bA,
        setQueuedCommands: xB,
        submitCount: C4,
        onSubmitCountChange: (yA) => {
            return V0(void 0), oB(yA)
        },
        setIsLoading: x1,
        setUserInputOnProcessing: a1,
        setAbortController: O1,
        onShowMessageSelector: () => w7((yA) => !yA),
        notification: _1,
        addNotification: F0,
        mcpClients: g1,
        pastedContents: o6,
        setPastedContents: D3,
        vimMode: Z0,
        setVimMode: f0,
        ideInstallationStatus: a9,
        showBashesDialog: p0,
        setShowBashesDialog: rA
    }))), N6 && k4.createElement(skB, {
        erroredToolUseIDs: cA,
        resolvedToolUseIDs: PA,
        messages: dA,
        onPreRestore: QA,
        onRestoreWorkspace: async (yA) => {
            let YB = dA.indexOf(yA),
                RQ = NF1(dA, YB);
            if (!RQ) throw new Error("Checkpoint not found");
            try {
                return await ZkB(RQ, V.checkpointing, (O4) => {
                    C((c6) => ({
                        ...c6,
                        checkpointing: O4
                    }))
                })
            } catch (S9) {
                throw R1(S9), S9
            }
        },
        onRestoreMessage: async (yA) => {
            let YB = dA.indexOf(yA),
                RQ = dA.slice(0, YB);
            setImmediate(async () => {
                if (await V7(), J2([...RQ]), n3(cg1()), typeof yA.message.content === "string") {
                    let S9 = yA.message.content,
                        O4 = l4(S9, "bash-input"),
                        c6 = l4(S9, "command-name");
                    if (O4) G2(O4), pA("bash");
                    else if (c6) {
                        let iQ = l4(S9, "command-args") || "";
                        G2(`${c6} ${iQ}`), pA("prompt")
                    } else G2(S9), pA("prompt")
                } else if (Array.isArray(yA.message.content) && yA.message.content.length >= 2 && yA.message.content.some((S9) => S9.type === "image") && yA.message.content.some((S9) => S9.type === "text")) {
                    let S9 = yA.message.content.find((c6) => c6.type === "text");
                    if (S9 && S9.type === "text") G2(S9.text), pA("prompt");
                    let O4 = yA.message.content.filter((c6) => c6.type === "image");
                    if (O4.length > 0) {
                        let c6 = {};
                        O4.forEach((iQ, t6) => {
                            if (iQ.source.type === "base64") c6[t6 + 1] = {
                                id: t6 + 1,
                                type: "image",
                                content: iQ.source.data,
                                mediaType: iQ.source.media_type
                            }
                        }), D3(c6)
                    }
                }
            })
        },
        onClose: () => w7(!1),
        tools: Q1
    }))
}