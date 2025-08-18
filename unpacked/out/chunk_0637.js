/* chunk:637 bytes:[14476882, 14493407) size:16525 source:unpacked-cli.js */
function SR8({
    debug: A,
    ideSelection: B,
    toolPermissionContext: Q,
    setToolPermissionContext: Z,
    apiKeyStatus: D,
    commands: G,
    isLoading: F,
    onQuery: I,
    verbose: Y,
    messages: W,
    setToolJSX: J,
    onAutoUpdaterResult: X,
    autoUpdaterResult: V,
    input: C,
    onInputChange: K,
    mode: H,
    onModeChange: z,
    queuedCommands: $,
    setQueuedCommands: L,
    submitCount: N,
    onSubmitCountChange: R,
    setIsLoading: O,
    setUserInputOnProcessing: P,
    setAbortController: j,
    onShowMessageSelector: f,
    notification: k,
    addNotification: c,
    mcpClients: u,
    pastedContents: a,
    setPastedContents: l,
    vimMode: y,
    setVimMode: t,
    ideInstallationStatus: E1,
    showBashesDialog: C1,
    setShowBashesDialog: _1,
    onExit: F0,
    getToolUseContext: W0
}) {
    let g1 = zR(),
        [w1, Q1] = eZ.useState(!1),
        [k1, H1] = eZ.useState({
            show: !1
        }),
        [A0, V0] = eZ.useState(""),
        [o1, e] = eZ.useState(C.length),
        [Z1, I1] = tQ(),
        [U1, O1] = eZ.useState(!1);
    eZ.useEffect(() => {
        if (!U1 && C.length > 1e4) {
            let H2 = PR8(C, a);
            if (H2) {
                let {
                    newInput: i1,
                    newPastedContents: N1
                } = H2;
                K(i1), l(N1), e(i1.length)
            }
            O1(!0)
        }
    }, [C, U1, a, K, l]), eZ.useEffect(() => {
        if (C === "") O1(!1)
    }, [C]);
    let B1 = eZ.useMemo(() => {
            let H2 = Object.keys(a).map(Number);
            if (H2.length === 0) return 1;
            return Math.max(...H2) + 1
        }, [a]),
        [x1, c1] = eZ.useState(!1),
        [a1, C0] = eZ.useState(!1),
        [K0, R0] = eZ.useState(!1),
        {
            pushToBuffer: wA,
            undo: u0,
            canUndo: TA,
            clearBuffer: dA
        } = BcB({
            maxBufferSize: 50,
            debounceMs: 1000
        }),
        J2 = !C && N === 0;
    eZ.useEffect(() => {
        if (N > 0 || A0) return;
        lf1(!1).then((H2) => {
            V0(`Try "${qf(H2)}"`)
        })
    }, [H, A0, N]);
    let s2 = eZ.useCallback((H2) => {
            if (H2 === "?") {
                X1("tengu_help_toggled", {}), c1((f0) => !f0);
                return
            }
            c1(!1);
            let i1 = H2.length === C.length + 1,
                N1 = o1 === 0;
            if (i1 && N1 && H2.startsWith("!")) {
                z("bash");
                return
            }
            if (i1 && N1 && H2.startsWith("#")) {
                z("memory");
                return
            }
            let Z0 = H2.replaceAll("\t", "    ");
            if (C !== Z0) wA(C, o1, a);
            K(Z0)
        }, [K, z, C, o1, wA, a]),
        {
            resetHistory: N2,
            onHistoryUp: U9,
            onHistoryDown: m6
        } = FbB((H2, i1, N1) => {
            s2(H2), z(i1), l(N1)
        }, C, a, e),
        {
            shells: kA
        } = $A1(),
        G2 = kA.filter((H2) => H2.status === "running").length,
        T2 = 3,
        pA = () => {
            if (D3.length <= 1) {
                if ($.length > 0) {
                    N6();
                    return
                }
                if (a1) C0(!1);
                else U9()
            }
        },
        bA = () => {
            if (D3.length <= 1) {
                let H2 = m6();
                if (H2 && G2 > 0) {
                    C0(!0);
                    let i1 = H0();
                    if (!i1.hasSeenTasksHint) gA({
                        ...i1,
                        hasSeenTasksHint: !0
                    })
                } else C0(!1);
                return H2
            }
            return !1
        },
        [r2, xB] = eZ.useState({
            suggestions: [],
            selectedSuggestion: -1,
            commandArgumentHint: void 0
        }),
        o6 = eZ.useCallback(async (H2, i1 = !1, N1) => {
            if (H2.trim() === "") return;
            let Z0 = r2.suggestions.length > 0 && r2.suggestions.every((QB) => QB.description === "directory");
            if (r2.suggestions.length > 0 && !i1 && !Z0) return;
            if (["exit", "quit", ":q", ":q!", ":wq", ":wq!"].includes(H2.trim())) {
                if (G.find((HQ) => HQ.name === "exit")) o6("/exit", !0);
                else jR8();
                return
            }
            let f0 = H2,
                p0 = G5B(H2),
                rA = 0;
            for (let QB of p0) {
                let HQ = a[QB.id];
                if (HQ && HQ.type === "text") f0 = f0.replace(QB.match, HQ.content), rA++
            }
            if (X1("tengu_paste_text", {
                    pastedTextCount: rA
                }), F) {
                if (H !== "prompt") return;
                L((QB) => [...QB, {
                    value: f0,
                    mode: "prompt"
                }]), K(""), e(0), l({}), N2(), dA();
                return
            }
            if (H === "memory") {
                z("memorySelect");
                return
            }
            K(""), e(0), z("prompt"), l({}), R((QB) => QB + 1), dA();
            let nB = await lb1(f0, H, Z1.checkpointing, (QB) => {
                    I1((HQ) => ({
                        ...HQ,
                        checkpointing: QB
                    }))
                }),
                f9 = h4();
            j(f9);
            let {
                messages: a9,
                shouldQuery: _4,
                allowedTools: b9,
                skipHistory: K4,
                maxThinkingTokens: R4,
                model: KQ
            } = await RA1({
                input: f0,
                mode: H,
                setIsLoading: O,
                setToolJSX: J,
                context: W0(W, [], f9, [], void 0, g1),
                pastedContents: a,
                ideSelection: B,
                memoryType: N1,
                autocheckpoint: nB,
                messages: W,
                setUserInputOnProcessing: P
            });
            if (J(null), a9.length) I(a9, f9, _4, b9 ?? [], KQ ?? g1, R4);
            else {
                if (!K4) fx({
                    display: H2,
                    pastedContents: a
                });
                N2(), j(null);
                return
            }
            for (let QB of a9)
                if (QB.type === "user") {
                    let HQ = H === "bash" ? `!${H2}` : H === "memorySelect" ? `#${H2}` : H2;
                    fx({
                        display: HQ,
                        pastedContents: a
                    }), N2()
                }
        }, [r2.suggestions, Z1.checkpointing, F, H, K, z, l, R, O, dA, j, J, W0, W, g1, a, B, G, L, P, I1, N2, I]),
        {
            suggestions: D3,
            selectedSuggestion: C4,
            commandArgumentHint: oB
        } = OdB({
            commands: G,
            onInputChange: K,
            onSubmit: o6,
            setCursorOffset: e,
            input: C,
            cursorOffset: o1,
            mode: H,
            setSuggestionsState: xB,
            suggestionsState: r2
        });

    function d6(H2, i1) {
        X1("tengu_paste_image", {}), z("prompt");
        let N1 = {
            id: B1,
            type: "image",
            content: H2,
            mediaType: i1 || "image/png"
        };
        l((Z0) => ({
            ...Z0,
            [B1]: N1
        })), d5(D5B(N1.id))
    }

    function m5(H2) {
        let i1 = eG(H2).replace(/\r/g, `
`).replaceAll("\t", "    "),
            N1 = cj1(i1),
            Z0 = Math.min(d7 - 10, 2);
        if (i1.length > bj1 || N1 > Z0) {
            let f0 = {
                id: B1,
                type: "text",
                content: i1
            };
            l((p0) => ({
                ...p0,
                [B1]: f0
            })), d5($K0(f0.id, N1))
        } else d5(i1)
    }

    function d5(H2) {
        wA(C, o1, a);
        let i1 = C.slice(0, o1) + H2 + C.slice(o1);
        K(i1), e(o1 + H2.length)
    }
    let w8 = UP(() => {}, () => f()),
        N6 = eZ.useCallback(() => {
            if ($.length === 0) return;
            let H2 = [...$.map((i1) => i1.value), C].filter(Boolean).join(`
`);
            K(H2), z("prompt"), L(() => []), e($.map((i1) => i1.value).join(`
`).length + 1 + o1)
        }, [$, K, z, L, C, o1]);
    eZ.useEffect(() => {
        if (!F && $[0]) {
            let H2 = $.map((i1) => i1.value).join(`
`);
            L((i1) => i1.filter((N1) => !$.includes(N1))), o6(H2, !1)
        }
    }, [F, $, o6, L]), AcB(u, function(H2) {
        X1("tengu_ext_at_mentioned", {});
        let i1, N1 = DcB.relative(t0(), H2.filePath);
        if (H2.lineStart && H2.lineEnd) i1 = H2.lineStart === H2.lineEnd ? `@${N1}#L${H2.lineStart} ` : `@${N1}#L${H2.lineStart}-${H2.lineEnd} `;
        else i1 = `@${N1} `;
        let Z0 = C[o1 - 1] ?? " ";
        if (!/\s/.test(Z0)) i1 = ` ${i1}`;
        d5(i1)
    }), DA((H2, i1) => {
        if (i1.ctrl && H2 === "_") {
            if (TA) {
                let N1 = u0();
                if (N1) K(N1.text), e(N1.cursorOffset), l(N1.pastedContents)
            }
            return
        }
        if (i1.ctrl && H2.toLowerCase(), i1.return && a1) {
            _1(!0), C0(!1);
            return
        }
        if (o1 === 0 && (i1.escape || i1.backspace || i1.delete)) z("prompt"), c1(!1);
        if (x1 && C === "" && (i1.backspace || i1.delete)) c1(!1);
        if (ZH.check(H2, i1)) {
            let N1 = SdB(Q);
            if (X1("tengu_mode_cycle", {
                    to: N1
                }), Z({
                    ...Q,
                    mode: N1
                }), x1) c1(!1);
            return
        }
        if (i1.escape) {
            if (a1) {
                C0(!1);
                return
            }
            if ($.length > 0) {
                N6();
                return
            }
            if (W.length > 0 && !C && !F) w8()
        }
        if (i1.return && x1) c1(!1)
    });
    let {
        columns: i3,
        rows: d7
    } = r9(), y4 = i3 - 6, n3 = eZ.useMemo(() => UJ(W), [W]), AD = eZ.useMemo(() => {
        let H2 = C.split(`
`);
        for (let i1 of H2)
            if (i1.length > y4) return !0;
        return H2.length > 1
    }, [C, y4]);
    if (C1) return j5.createElement(Gg1, {
        onDone: () => {
            _1(!1)
        }
    });
    return j5.createElement(v, {
        flexDirection: "column"
    }, $.length > 0 && j5.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, j5.createElement(v, {
        paddingLeft: 2,
        flexDirection: "column",
        width: i3 - 4
    }, j5.createElement(T, {
        color: "secondaryText",
        wrap: "wrap"
    }, $.map((H2) => H2.value).join(`
`)))), j5.createElement(v, {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderColor: H === "bash" ? "bashBorder" : H === "memory" || H === "memorySelect" ? "remember" : "secondaryBorder",
        borderDimColor: H !== "memory",
        borderStyle: "round",
        marginTop: $.length > 0 ? 0 : 1,
        width: "100%"
    }, j5.createElement(v, {
        alignItems: "flex-start",
        alignSelf: "flex-start",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        width: 3
    }, H === "bash" ? j5.createElement(T, {
        color: "bashBorder",
        dimColor: F
    }, " ! ") : H === "memory" || H === "memorySelect" ? j5.createElement(T, {
        color: "remember",
        dimColor: F
    }, " # ") : j5.createElement(T, {
        color: F ? "secondaryText" : void 0
    }, " > ")), j5.createElement(v, {
        paddingRight: 1
    }, (() => {
        let H2 = {
            multiline: !0,
            onSubmit: o6,
            onChange: s2,
            value: C,
            onHistoryUp: pA,
            onHistoryDown: bA,
            onHistoryReset: () => N2(),
            placeholder: H === "memory" ? 'Add to memory. Try "Always use descriptive variable names"' : $.length > 0 && (H0().queuedCommandUpHintCount || 0) < T2 ? "Press up to edit queued messages" : J2 ? A0 : void 0,
            onExit: F0,
            onExitMessage: (i1, N1) => H1({
                show: i1,
                key: N1
            }),
            onMessage: (i1, N1) => {
                if (i1 && N1) c({
                    text: N1
                }, {
                    timeoutMs: 3600000
                });
                else c({
                    text: ""
                }, {
                    timeoutMs: 0
                })
            },
            onImagePaste: d6,
            columns: y4,
            disableCursorMovementForUpDownKeys: D3.length > 0,
            cursorOffset: o1,
            onChangeCursorOffset: e,
            onPaste: m5,
            onIsPastingChange: R0,
            focus: H !== "memorySelect",
            showCursor: H !== "memorySelect",
            argumentHint: oB,
            onUndo: TA ? () => {
                let i1 = u0();
                if (i1) K(i1.text), e(i1.cursorOffset), l(i1.pastedContents)
            } : void 0
        };
        return SA1() ? j5.createElement(fT0, {
            ...H2,
            initialMode: y,
            onModeChange: t,
            isLoading: F
        }) : j5.createElement(y8, {
            ...H2
        })
    })())), H === "memorySelect" && j5.createElement(ch1, {
        onSelect: (H2) => {
            o6(C, !1, H2)
        },
        onCancel: () => {
            z("memory")
        }
    }), j5.createElement(edB, {
        apiKeyStatus: D,
        debug: A,
        exitMessage: k1,
        vimMode: y,
        mode: H,
        autoUpdaterResult: V,
        isAutoUpdating: w1,
        verbose: Y,
        tokenUsage: n3,
        onAutoUpdaterResult: X,
        onChangeIsUpdating: Q1,
        suggestions: D3,
        selectedSuggestion: C4,
        notification: k,
        toolPermissionContext: Q,
        helpOpen: x1,
        suppressHint: C.length > 0,
        shellsSelected: a1,
        ideSelection: B,
        mcpClients: u,
        ideInstallationStatus: E1,
        isPasting: K0,
        isInputWrapped: AD,
        messages: W
    }))
}
var GcB = SR8;

function jR8() {
    BL0(""), O5(0)
}
var FcB = G1(z1(), 1);

function IcB() {
    FcB.useEffect(() => {
        let A = Math.round(process.uptime() * 1000);
        X1("tengu_timer", {
            event: "startup",
            durationMs: A
        })
    }, [])
}
var gI1 = G1(z1(), 1);

function YcB() {
    let [A, B] = gI1.useState(() => {
        let G = LY(!1);
        if (!KE() || KB()) return "valid";
        if (G) return "loading";
        return "missing"
    }), [Q, Z] = gI1.useState(null), D = gI1.useCallback(async () => {
        if (!KE() || KB()) return;
        let G = LY(!1);
        if (!G) {
            B("missing");
            return
        }
        try {
            let I = await CSB(G, !1) ? "valid" : "invalid";
            B(I);
            return
        } catch (F) {
            Z(F), B("error");
            return
        }
    }, []);
    return {
        status: A,
        reverify: D,
        error: Q
    }
}

function WcB(A, B, Q, Z, D, G, F, I) {
    DA((Y, W) => {
        if (!W.escape) return;
        if (D === "transcript") return;
        if (G?.aborted) return;
        if (!G) return;
        if (Q) return;
        if (SA1() && I === "INSERT") return;
        if (Z.length > 0) {
            if (F) F()
        }
        X1("tengu_cancel", {}), A(() => []), B()
    })
}
var JcB = G1(z1(), 1);
var kR8 = ["Edit", "MultiEdit", "Write", "NotebookEdit"];

function uI1(A) {
    return kR8.includes(A)
}

function mI1(A, B, Q, Z) {
    if (!A.toolDecisions) A.toolDecisions = new Map;
    A.toolDecisions.set(B, {
        source: Z,
        decision: Q,
        timestamp: Date.now()
    })
}

function dI1(A, B, Q, Z) {
    let D;
    if (A.getPath && B) {
        let G = A.inputSchema.safeParse(B);
        if (G.success) {
            let F = A.getPath(G.data);
            if (F) D = B_(F)
        }
    }
    return {
        decision: Q,
        source: Z,
        tool_name: A.name,
        ...D && {
            language: D
        }
    }
}
async function cI1(A, B, Q) {
    await d$("tool_decision", {
        decision: B,
        source: Q,
        tool_name: A
    })
}