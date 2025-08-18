/* chunk:621 bytes:[14200478, 14220104) size:19626 source:unpacked-cli.js */
function VmB({
    toolNames: A,
    onExit: B
}) {
    let [Q, Z] = lI.useState([]), [D, G] = lI.useState({
        mode: "select-event"
    }), [F, I] = lI.useState(0), [Y, W] = lI.useState(""), [J, X] = lI.useState(""), V = D.mode, C = "event" in D ? D.event : "PreToolUse", K = "matcher" in D ? D.matcher : null, [{
        mcp: H
    }] = tQ(), z = lI.useMemo(() => [...A, ...H.tools.map((l) => l.name)], [A, H.tools]), $ = lI.useMemo(() => YmB(z), [z, F]), L = lI.useMemo(() => WmB($, C), [$, C]), N = lI.useMemo(() => JmB($, C, K), [$, C, K]), R = U2();
    DA((l, y) => {
        if (V === "save-hook") return;
        if (y.escape) {
            switch (V) {
                case "select-event":
                    if (Q.length > 0) B(Q.join(`
`));
                    else B();
                    break;
                case "select-matcher":
                    G({
                        mode: "select-event"
                    });
                    break;
                case "add-matcher":
                    if ("event" in D) G({
                        mode: "select-matcher",
                        event: D.event,
                        matcherMetadata: D.matcherMetadata
                    });
                    X("");
                    break;
                case "delete-matcher":
                    if ("event" in D) G({
                        mode: "select-matcher",
                        event: D.event,
                        matcherMetadata: D.matcherMetadata
                    });
                    break;
                case "select-hook":
                    if ("event" in D) {
                        let t = lS(D.event, z);
                        if (t !== void 0) G({
                            mode: "select-matcher",
                            event: D.event,
                            matcherMetadata: t
                        });
                        else G({
                            mode: "select-event"
                        })
                    }
                    break;
                case "add-hook":
                    if ("event" in D && "matcher" in D) G({
                        mode: "select-hook",
                        event: D.event,
                        matcher: D.matcher
                    });
                    W("");
                    break;
                case "delete-hook":
                    if ("event" in D && D.mode === "delete-hook") {
                        let {
                            hook: t
                        } = D;
                        G({
                            mode: "select-hook",
                            event: D.event,
                            matcher: t.matcher || ""
                        })
                    }
                    break
            }
            return
        }
        switch (V) {
            case "select-event":
                if (y.return) {
                    let t = C,
                        E1 = lS(t, z);
                    if (E1 !== void 0) G({
                        mode: "select-matcher",
                        event: t,
                        matcherMetadata: E1
                    });
                    else G({
                        mode: "select-hook",
                        event: t,
                        matcher: ""
                    })
                }
                break;
            case "add-matcher":
                if (y.return && J.trim() && "event" in D) G({
                    mode: "select-hook",
                    event: D.event,
                    matcher: J.trim()
                });
                break;
            case "add-hook":
                if (y.return && Y.trim() && "event" in D && "matcher" in D) {
                    let t = {
                        event: D.event,
                        config: {
                            type: "command",
                            command: Y.trim()
                        },
                        matcher: lS(D.event, z) !== void 0 ? D.matcher : ""
                    };
                    G({
                        mode: "save-hook",
                        event: D.event,
                        hookToSave: t
                    })
                }
                break;
            case "delete-matcher":
            case "delete-hook":
            case "select-matcher":
            case "select-hook":
                break
        }
    });
    let O = lI.useCallback(() => {
            if (D.mode === "save-hook") {
                let {
                    hookToSave: l
                } = D;
                Z((y) => [...y, `Added ${l.event} hook: ${e1.bold(l.config.command)}`]), G({
                    mode: "select-hook",
                    event: l.event,
                    matcher: l.matcher
                })
            }
            W(""), I((l) => l + 1)
        }, [D]),
        P = lI.useCallback(() => {
            if (D.mode === "save-hook") {
                let {
                    hookToSave: l
                } = D;
                G({
                    mode: "select-hook",
                    event: l.event,
                    matcher: l.matcher
                })
            }
            W("")
        }, [D]),
        j = lI.useCallback(async () => {
            if (D.mode !== "delete-hook") return;
            let {
                hook: l,
                event: y
            } = D;
            await suB(l), Z((C1) => [...C1, `Deleted ${l.event} hook: ${e1.bold(l.config.command)}`]), I((C1) => C1 + 1);
            let t = l.matcher || "",
                E1 = $[y]?.[t]?.filter((C1) => C1.config.command !== l.config.command);
            if (!E1 || E1.length === 0) {
                let C1 = lS(y, z);
                if (C1 !== void 0) G({
                    mode: "select-matcher",
                    event: y,
                    matcherMetadata: C1
                });
                else G({
                    mode: "select-event"
                })
            } else G({
                mode: "select-hook",
                event: y,
                matcher: t
            })
        }, [D, $, z]),
        f = lI.useCallback(() => {
            if (D.mode === "delete-matcher") {
                let {
                    matcher: l,
                    event: y
                } = D;
                Z((t) => [...t, `Deleted matcher: ${e1.bold(l)}`]), G({
                    mode: "select-matcher",
                    event: y,
                    matcherMetadata: D.matcherMetadata
                })
            }
        }, [D]),
        k = PI1(z),
        c = jjB();
    if (lI.useEffect(() => {
            JF1()
        }, []), GB()?.disableAllHooks === !0) {
        let l = Object.values($).reduce((y, t) => {
            return y + Object.values(t).reduce((E1, C1) => E1 + C1.length, 0)
        }, 0);
        return c9.createElement(c9.Fragment, null, c9.createElement(v, {
            flexDirection: "column",
            borderStyle: "round",
            paddingLeft: 1,
            paddingRight: 1,
            borderColor: "warning"
        }, c9.createElement(v, {
            flexDirection: "column",
            marginBottom: 1
        }, c9.createElement(v, null, c9.createElement(T, {
            bold: !0,
            color: "warning"
        }, "Hook Configuration - Disabled")), c9.createElement(v, {
            flexDirection: "column",
            marginTop: 0.5
        }, c9.createElement(T, null, "All hooks are currently ", e1.red("disabled"), ". You have", " ", e1.bold(l), " configured hook", l !== 1 ? "s" : "", " that", " ", l !== 1 ? "are" : "is", " not running."), c9.createElement(v, {
            marginTop: 0.5
        }, c9.createElement(T, null, "When hooks are disabled:")), c9.createElement(T, null, "• No hook commands will execute"), c9.createElement(T, null, "• StatusLine will not be displayed"), c9.createElement(T, null, "• Tool operations will proceed without hook validation"))), c9.createElement(v, {
            flexDirection: "column"
        }, c9.createElement(T, {
            bold: !0
        }, "Options:"), c9.createElement(uA, {
            options: [{
                label: "Re-enable all hooks",
                value: "enable"
            }, {
                label: "Exit",
                value: "exit"
            }],
            onChange: (y) => {
                if (y === "enable") y6("localSettings", {
                    disableAllHooks: !1
                }), B("Re-enabled all hooks");
                else B(Q.length > 0 ? Q.join(`
`) : void 0)
            },
            onCancel: () => B(Q.length > 0 ? Q.join(`
`) : void 0)
        }))), c9.createElement(v, {
            marginLeft: 3
        }, c9.createElement(T, {
            dimColor: !0
        }, "Enter to select · Esc to exit")))
    }
    switch (D.mode) {
        case "save-hook":
            return c9.createElement(AmB, {
                event: D.hookToSave.event,
                eventSummary: k[D.hookToSave.event].summary,
                config: D.hookToSave.config,
                matcher: D.hookToSave.matcher,
                onSuccess: O,
                onCancel: P
            });
        case "select-event":
            return c9.createElement(BmB, {
                hookEventMetadata: k,
                exitStatePending: R.pending,
                exitStateKeyName: R.keyName || void 0,
                configDifference: c,
                onSelectEvent: (l) => {
                    if (l === "disable-all") y6("localSettings", {
                        disableAllHooks: !0
                    }), B("All hooks have been disabled");
                    else {
                        let y = lS(l, z);
                        if (y !== void 0) G({
                            mode: "select-matcher",
                            event: l,
                            matcherMetadata: y
                        });
                        else G({
                            mode: "select-hook",
                            event: l,
                            matcher: ""
                        })
                    }
                }
            });
        case "select-matcher":
            return c9.createElement(QmB, {
                selectedEvent: D.event,
                matchersForSelectedEvent: L,
                hooksByEventAndMatcher: $,
                eventDescription: k[D.event].description,
                onSelect: (l) => {
                    if (l === null) G({
                        mode: "add-matcher",
                        event: D.event,
                        matcherMetadata: D.matcherMetadata
                    });
                    else if (($[D.event]?.[l] || []).length === 0) G({
                        mode: "delete-matcher",
                        event: D.event,
                        matcher: l,
                        matcherMetadata: D.matcherMetadata
                    });
                    else G({
                        mode: "select-hook",
                        event: D.event,
                        matcher: l
                    })
                },
                onCancel: () => {
                    G({
                        mode: "select-event"
                    })
                }
            });
        case "add-matcher":
            return c9.createElement(ZmB, {
                selectedEvent: D.event,
                newMatcher: J,
                onChangeNewMatcher: X,
                eventDescription: k[D.event].description,
                matcherMetadata: D.matcherMetadata
            });
        case "delete-matcher":
            return c9.createElement(GmB, {
                selectedMatcher: D.matcher,
                selectedEvent: D.event,
                onDelete: f,
                onCancel: () => G({
                    mode: "select-matcher",
                    event: D.event,
                    matcherMetadata: D.matcherMetadata
                })
            });
        case "select-hook":
            return c9.createElement(FmB, {
                selectedEvent: D.event,
                selectedMatcher: D.matcher,
                hooksForSelectedMatcher: N,
                hookEventMetadata: k[D.event],
                onSelect: (l) => {
                    if (l === null) G({
                        mode: "add-hook",
                        event: D.event,
                        matcher: D.matcher
                    });
                    else G({
                        mode: "delete-hook",
                        event: D.event,
                        hook: l
                    })
                },
                onCancel: () => {
                    let l = lS(D.event, z);
                    if (l !== void 0) G({
                        mode: "select-matcher",
                        event: D.event,
                        matcherMetadata: l
                    });
                    else G({
                        mode: "select-event"
                    })
                }
            });
        case "add-hook":
            return c9.createElement(DmB, {
                selectedEvent: D.event,
                selectedMatcher: D.matcher,
                eventDescription: XmB(D.event, z),
                fullDescription: k[D.event].description,
                supportsMatcher: lS(D.event, z) !== void 0,
                command: Y,
                onChangeCommand: W
            });
        case "delete-hook":
            return c9.createElement(ImB, {
                selectedHook: D.hook,
                eventSupportsMatcher: lS(D.event, z) !== void 0,
                onDelete: j,
                onCancel: () => {
                    let {
                        event: l,
                        hook: y
                    } = D;
                    G({
                        mode: "select-hook",
                        event: l,
                        matcher: y.matcher || ""
                    })
                }
            })
    }
}
var dQ = G1(z1(), 1);
import {
    randomUUID as IL8
} from "crypto";

function CmB(A) {
    let B = M21() !== void 0 && M21() !== null;
    if (!($l() && !B)) return null;
    let Z = Ey();
    if (Z === A) return null;
    return Z
}
var YL8 = 10;

function* Yg1(A, B) {
    for (let Q of A) {
        let Z = Q.message.content.filter((D) => D.type === "tool_use");
        for (let D of Z) yield D2({
            content: [{
                type: "tool_result",
                content: B,
                is_error: !0,
                tool_use_id: D.id
            }],
            toolUseResult: B
        })
    }
}

function Wg1(A, B) {
    return LjB({
        toolUse: A,
        hardcodedMessage: void 0
    })
}
async function* wR({
    messages: A,
    systemPrompt: B,
    userContext: Q,
    systemContext: Z,
    canUseTool: D,
    toolUseContext: G,
    autoCompactTracking: F,
    fallbackModel: I,
    stopHookActive: Y,
    promptCategory: W
}) {
    yield {
        type: "stream_request_start"
    };
    let J = A,
        X = F,
        V = await tf1(J);
    if (J = V.messages, V.compactionInfo?.systemMessage) yield V.compactionInfo.systemMessage;
    let {
        messages: C,
        wasCompacted: K
    } = await vbB(J, G);
    if (K) {
        if (X1("tengu_auto_compact_succeeded", {
                originalMessageCount: A.length,
                compactedMessageCount: C.length
            }), !X?.compacted) X = {
            compacted: !0,
            turnId: IL8(),
            turnCounter: 0
        };
        J = C
    }
    let H = [],
        z = jw1({
            permissionMode: G.getToolPermissionContext().mode,
            mainLoopModel: G.options.mainLoopModel
        }),
        $ = !0;
    try {
        while ($) {
            $ = !1;
            try {
                let c = !1;
                for await (let u of V01(iG1(J, Q), bN0(B, Z), G.options.maxThinkingTokens, G.options.tools, G.abortController.signal, {
                    getToolPermissionContext: G.getToolPermissionContext,
                    model: z,
                    prependCLISysprompt: !0,
                    toolChoice: void 0,
                    isNonInteractiveSession: G.options.isNonInteractiveSession,
                    fallbackModel: I,
                    onStreamingFallback: () => {
                        c = !0
                    },
                    promptCategory: W
                })) {
                    if (c) yield* Yg1(H, "Streaming fallback triggered"), H.length = 0;
                    if (yield u, u.type === "assistant") H.push(u)
                }
            } catch (c) {
                if (c instanceof Mb1 && I) {
                    z = I, $ = !0, yield* Yg1(H, "Model fallback triggered"), H.length = 0, G.options.mainLoopModel = I, X1("tengu_model_fallback_triggered", {
                        original_model: c.originalModel,
                        fallback_model: I,
                        entrypoint: "cli"
                    }), yield q3(`Model fallback triggered: switching from ${c.originalModel} to ${c.fallbackModel}`, "info");
                    continue
                }
                throw c
            }
        }
    } catch (c) {
        R1(c instanceof Error ? c : new Error(String(c)));
        let u = c instanceof Error ? c.message : String(c);
        X1("tengu_query_error", {
            assistantMessages: H.length,
            toolUses: H.flatMap((a) => a.message.content.filter((l) => l.type === "tool_use")).length
        }), yield* Yg1(H, u), yield Wg1(!1, G), Fi0("Query failed, swallowing error");
        return
    }
    if (G.abortController.signal.aborted) {
        yield* Yg1(H, "Interrupted by user"), yield Wg1(!1, G);
        return
    }
    if (!H.length) {
        yield* KmB(J, H, B, Q, Z, D, G, X, I, Y, W), yield* WL8(J, H, B, Q, Z, D, G, X, I, W);
        return
    }
    let L = H.flatMap((c) => c.message.content.filter((u) => u.type === "tool_use"));
    if (!L.length) {
        yield* KmB(J, H, B, Q, Z, D, G, X, I, Y, W);
        return
    }
    let N = [],
        R = !1;
    for await (let c of JL8(L, H, D, G)) {
        if (yield c, c && c.type === "system" && c.preventContinuation) R = !0;
        N.push(...AW([c]).filter((u) => u.type === "user"))
    }
    if (G.abortController.signal.aborted) {
        yield Wg1(!0, G);
        return
    }
    if (R) return;
    if (X?.compacted) X.turnCounter++, X1("tengu_post_autocompact_turn", {
        turnId: X.turnId,
        turnCounter: X.turnCounter
    });
    let O = [...G.getQueuedCommands()],
        P = [];
    for await (let c of LF1(null, G, null, O, void 0, A)) if (yield c, N.push(c), kkB(c)) P.push(c);
    G.removeQueuedCommands(O);
    let j = CmB(G.options.mainLoopModel),
        f = G;
    if (j) f = {
        ...G,
        options: {
            ...G.options,
            mainLoopModel: j
        }
    }, X1("tengu_fallback_system_msg", {
        mainLoopModel: G.options.mainLoopModel,
        fallbackModel: j
    }), yield q3(`Claude Opus limit reached, now using ${JT(j)}`, "warning");
    let k = {
        ...f,
        pendingSteeringAttachments: void 0
    };
    yield* wR({
        messages: [...J, ...H, ...N],
        systemPrompt: B,
        userContext: Q,
        systemContext: Z,
        canUseTool: D,
        toolUseContext: k,
        autoCompactTracking: X,
        fallbackModel: I,
        stopHookActive: Y,
        promptCategory: W
    })
}
async function* WL8(A, B, Q, Z, D, G, F, I, Y, W) {
    return
}