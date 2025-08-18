/* chunk:638 bytes:[14493409, 14512323) size:18914 source:unpacked-cli.js */
function yR8(A) {
    return JcB.useCallback(async (B, Q, Z, D, G, F) => {
        return new Promise((I) => {
            function Y() {
                X1("tengu_tool_use_cancelled", {
                    messageID: D.message.id,
                    toolName: B.name
                })
            }

            function W() {
                I({
                    behavior: "ask",
                    message: DF1
                }), Z.abortController.abort()
            }
            if (Z.abortController.signal.aborted) {
                Y(), W();
                return
            }
            return (F !== void 0 ? Promise.resolve(F) : iw(B, Q, Z, D, G)).then(async (X) => {
                if (X.behavior === "allow") {
                    if (X1("tengu_tool_use_granted_in_config", {
                            messageID: D.message.id,
                            toolName: B.name
                        }), uI1(B.name)) {
                        let C = dI1(B, Q, "accept", "config");
                        ql()?.add(1, C)
                    }
                    mI1(Z, G, "accept", "config"), cI1(B.name, "accept", "config"), I({
                        ...X,
                        updatedInput: Q,
                        userModified: !1
                    });
                    return
                }
                let V = await B.description(Q, {
                    isNonInteractiveSession: Z.options.isNonInteractiveSession,
                    getToolPermissionContext: Z.getToolPermissionContext,
                    tools: Z.options.tools
                });
                if (Z.abortController.signal.aborted) {
                    Y(), W();
                    return
                }
                switch (X.behavior) {
                    case "deny": {
                        if (X1("tengu_tool_use_denied_in_config", {
                                messageID: D.message.id,
                                toolName: B.name
                            }), uI1(B.name)) {
                            let C = dI1(B, Q, "reject", "config");
                            ql()?.add(1, C)
                        }
                        mI1(Z, G, "reject", "config"), cI1(B.name, "reject", "config"), I(X);
                        return
                    }
                    case "ask": {
                        A((C) => [...C, {
                            assistantMessage: D,
                            tool: B,
                            description: V,
                            input: Q,
                            toolUseContext: Z,
                            permissionResult: X,
                            onAbort() {
                                if (Y(), X1("tengu_tool_use_rejected_in_prompt", {
                                        messageID: D.message.id,
                                        toolName: B.name
                                    }), uI1(B.name)) {
                                    let K = dI1(B, Q, "reject", "user_abort");
                                    ql()?.add(1, K)
                                }
                                mI1(Z, G, "reject", "user_abort"), cI1(B.name, "reject", "user_abort"), W()
                            },
                            onAllow(K, H) {
                                if (K === "permanent") X1("tengu_tool_use_granted_in_prompt_permanent", {
                                    messageID: D.message.id,
                                    toolName: B.name
                                });
                                else X1("tengu_tool_use_granted_in_prompt_temporary", {
                                    messageID: D.message.id,
                                    toolName: B.name
                                });
                                if (uI1(B.name)) {
                                    let N = dI1(B, H, "accept", K === "permanent" ? "user_permanent" : "user_temporary");
                                    ql()?.add(1, N)
                                }
                                let z = K === "permanent" ? "user_permanent" : "user_temporary";
                                mI1(Z, G, "accept", z), cI1(B.name, "accept", z);
                                let $ = B.inputsEquivalent ? !B.inputsEquivalent(Q, H) : !1;
                                I({
                                    behavior: "allow",
                                    updatedInput: H,
                                    userModified: $
                                })
                            },
                            onReject() {
                                if (X1("tengu_tool_use_rejected_in_prompt", {
                                        messageID: D.message.id,
                                        toolName: B.name
                                    }), uI1(B.name)) {
                                    let K = dI1(B, Q, "reject", "user_reject");
                                    ql()?.add(1, K)
                                }
                                mI1(Z, G, "reject", "user_reject"), cI1(B.name, "reject", "user_reject"), W()
                            }
                        }]);
                        return
                    }
                }
            }).catch((X) => {
                if (X instanceof tJ) Y(), W();
                else R1(X)
            })
        })
    }, [A])
}
var XcB = yR8;
var VcB = G1(z1(), 1);

function CcB(A, B) {
    return VcB.useMemo(() => {
        if (A && B && B.length > 0) return Lf([...A, ...B], "name");
        return A || []
    }, [A, B])
}
var KcB = G1(z1(), 1);

function dT0(A, B) {
    return KcB.useMemo(() => {
        if (B.length > 0) return Lf([...A, ...B], "name");
        return A
    }, [A, B])
}
var gg1 = G1(z1(), 1);

function HcB() {
    let [, A] = tQ(), B = gg1.useCallback(async () => {
        try {
            let {
                enabled: Q,
                disabled: Z
            } = await Md(), [D, G] = await Promise.all([OT0(), O01()]);
            A((F) => ({
                ...F,
                plugins: {
                    enabled: Q,
                    disabled: Z,
                    commands: D,
                    agents: G
                }
            })), n1(`Loaded plugins - Enabled: ${Q.length}, Disabled: ${Z.length}, Commands: ${D.length}, Agents: ${G.length}`)
        } catch (Q) {
            n1(`Error loading plugins: ${Q}`), A((Z) => ({
                ...Z,
                plugins: {
                    enabled: [],
                    disabled: [],
                    commands: [],
                    agents: []
                }
            }))
        }
    }, [A]);
    return gg1.useEffect(() => {
        if (process.env.ENABLE_PLUGINS) B();
        else A((Q) => ({
            ...Q,
            plugins: {
                enabled: [],
                disabled: [],
                commands: [],
                agents: []
            }
        }))
    }, [B, A]), {
        refreshPlugins: B
    }
}
import {
    randomUUID as cg1
} from "crypto";

function zcB(A, B, Q, Z, D) {
    DA(async (G, F) => {
        if (F.ctrl && G === "r") B((I) => I === "transcript" ? "prompt" : "transcript"), Q((I) => I + 1), Z(!1), await D();
        if (F.ctrl && G === "e" && A === "transcript") Z((I) => !I), Q((I) => I + 1), await D();
        if (F.ctrl && G === "c" && A === "transcript" || F.escape && A === "transcript") B("prompt"), Q((I) => I + 1), Z(!1), await D()
    })
}
var lI1 = G1(z1(), 1);
var _R8 = h.object({
    method: h.literal("selection_changed"),
    params: h.object({
        selection: h.object({
            start: h.object({
                line: h.number(),
                character: h.number()
            }),
            end: h.object({
                line: h.number(),
                character: h.number()
            })
        }).nullable().optional(),
        text: h.string().optional(),
        filePath: h.string().optional()
    })
});

function EcB(A, B) {
    let Q = lI1.useRef(!1),
        Z = lI1.useRef(null);
    lI1.useEffect(() => {
        let D = eV(A);
        if (Z.current !== D) Q.current = !1, Z.current = D || null, B({
            lineCount: 0,
            lineStart: void 0,
            text: void 0,
            filePath: void 0
        });
        if (Q.current || !D) return;
        let G = (F) => {
            if (F.selection?.start && F.selection?.end) {
                let {
                    start: I,
                    end: Y
                } = F.selection, W = Y.line - I.line + 1;
                if (Y.character === 0) W--;
                let J = {
                    lineCount: W,
                    lineStart: I.line,
                    text: F.text,
                    filePath: F.filePath
                };
                B(J)
            }
        };
        D.client.setNotificationHandler(_R8, (F) => {
            if (Z.current !== D) return;
            try {
                let I = F.params;
                if (I.selection && I.selection.start && I.selection.end) G(I);
                else if (I.text !== void 0) G({
                    selection: null,
                    text: I.text,
                    filePath: I.filePath
                })
            } catch (I) {
                R1(I)
            }
        }), Q.current = !0
    }, [A, B])
}
var kA1 = hV();

function ug1(A) {
    kA1 = A
}

function xR8(A, B, Q) {
    if (Q.type !== "assistant") return;
    if (!Array.isArray(Q.message.content)) return;
    for (let Z of Q.message.content) {
        if (Z.type !== "tool_use") continue;
        let D = A.find((G) => G.name === Z.name);
        if (D) B.set(Z.id, D)
    }
}

function cT0(A, B) {
    try {
        let Q = OjB(A);
        if (Q[Q.length - 1]?.type === "user") Q.push(YU({
            content: FF1
        }));
        let D = new Map;
        for (let G of Q) xR8(B, D, G);
        return Q
    } catch (Q) {
        throw R1(Q), Q
    }
}
async function UcB(A, B) {
    try {
        let Q = await J9.get(A, {
            headers: B,
            timeout: 30000
        });
        if (!Q.data || !Array.isArray(Q.data.log)) throw new Error("Invalid response format: missing or invalid log array");
        return Q.data
    } catch (Q) {
        if (J9.isAxiosError(Q)) {
            let Z = Q.response ? `HTTP ${Q.response.status}: ${Q.response.statusText}` : Q.message;
            throw new Error(`Failed to fetch conversation from remote: ${Z}`)
        }
        throw Q
    }
}
async function Rb(A, B) {
    try {
        let Q;
        if (A === void 0) Q = await oq2(0);
        else if (typeof A === "string") Q = await rq2(A);
        else Q = A;
        if (!Q) return null;
        zv1(Q), DkB(Q);
        let Z = cT0(Q.messages, B),
            D = await WU("resume");
        return Z.push(...D), {
            messages: Z,
            log: Q
        }
    } catch (Q) {
        throw R1(Q), Q
    }
}
var mg1 = G1(z1(), 1);

function wcB() {
    let [A, B] = mg1.useState(() => {
        let {
            errors: Z
        } = qL();
        return Z
    }), Q = mg1.useCallback(() => {
        let {
            errors: Z
        } = qL();
        B(Z)
    }, []);
    return YT1(Q), A
}
var $cB = G1(z1(), 1);

function qcB({
    autoConnectIdeFlag: A,
    ideToInstallExtension: B,
    setDynamicMcpConfig: Q,
    setShowIdeOnboarding: Z,
    setIDEInstallationState: D
}) {
    $cB.useEffect(() => {
        function G(F) {
            if (!F) return;
            if (!((H0().autoConnectIde || A || fF() || B || IQ(process.env.CLAUDE_CODE_AUTO_CONNECT_IDE)) && !Pt0(process.env.CLAUDE_CODE_AUTO_CONNECT_IDE))) return;
            Q((W) => {
                if (W?.ide) return W;
                return {
                    ...W,
                    ide: {
                        type: F.url.startsWith("ws:") ? "ws-ide" : "sse-ide",
                        url: F.url,
                        ideName: F.name,
                        authToken: F.authToken,
                        ideRunningInWindows: F.ideRunningInWindows,
                        scope: "dynamic"
                    }
                }
            })
        }
        wGB(G, B, () => Z(!0), (F) => D(F))
    }, [A, B, Q, Z, D])
}
var yA1 = G1(z1(), 1);

function NcB() {
    let [A, B] = yA1.useState([]), Q = yA1.useRef([]), Z = yA1.useCallback((D) => {
        Q.current = D(Q.current), B(Q.current)
    }, [B]);
    return {
        queuedCommands: A,
        queuedCommandsRef: Q,
        setQueuedCommands: Z
    }
}
var sF = G1(z1(), 1);
import {
    randomUUID as LcB
} from "crypto";
var vR8 = {
    minTimeBeforeFeedbackMs: 600000,
    minTimeBetweenFeedbackMs: 1800000,
    minTimeBetweenGlobalFeedbackMs: 3600000,
    minUserTurnsBeforeFeedback: 5,
    minUserTurnsBetweenFeedback: 15,
    hideThanksAfterMs: 3000,
    onForModels: [],
    probability: 1
};

function McB(A, B) {
    let Q = A.filter((O) => O.type === "user"),
        [Z, D] = sF.useState("closed"),
        [G, F] = sF.useState(null),
        I = fw1("tengu_feedback_survey_config", vR8),
        Y = sF.useRef(LcB()),
        W = sF.useRef(Date.now()),
        J = sF.useRef(Q.length),
        X = sF.useRef(null),
        V = sF.useMemo(() => {
            return H0()?.feedbackSurveyState
        }, []),
        C = sF.useMemo(() => {
            return A.filter((P) => P.type === "assistant").slice(-1)[0]?.message?.id || "unknown"
        }, [A]),
        K = sF.useCallback((O) => {
            F(O);
            let P = H0();
            gA({
                ...P,
                feedbackSurveyState: {
                    lastShownTime: O
                }
            })
        }, []),
        H = sF.useCallback(() => {
            if (Z !== "closed") return;
            D("open"), K(Date.now()), X.current = Q.length, Y.current = LcB(), X1("tengu_feedback_survey_event", {
                event_type: "appeared",
                appearance_id: Y.current,
                last_assistant_message_id: C
            })
        }, [Z, C, Q.length, K]),
        z = sF.useCallback(() => {
            D("thanks"), setTimeout(() => D("closed"), I.hideThanksAfterMs)
        }, [I.hideThanksAfterMs]),
        $ = AG(),
        L = sF.useMemo(() => {
            if (!I.onForModels || I.onForModels.length === 0) return !1;
            if (I.onForModels.includes("*")) return !0;
            return I.onForModels.includes($)
        }, [I.onForModels, $]),
        N = Z === "closed" && !B && L && (process.env.CLAUDE_FORCE_DISPLAY_SURVEY || (() => {
            if (V?.lastShownTime) {
                if (Date.now() - V.lastShownTime < I.minTimeBetweenGlobalFeedbackMs) return !1
            }
            if (G) {
                if (Date.now() - G < I.minTimeBetweenFeedbackMs) return !1;
                if (X.current && Q.length < X.current + I.minUserTurnsBetweenFeedback) return !1
            } else {
                if (Date.now() - W.current < I.minTimeBeforeFeedbackMs) return !1;
                if (Q.length < J.current + I.minUserTurnsBeforeFeedback) return !1
            }
            let O = I.probability ?? 1;
            if (Math.random() > O) return !1;
            return !0
        })());
    sF.useEffect(() => {
        if (N) H()
    }, [N, H]);
    let R = sF.useCallback((O) => {
        K(Date.now()), z(), X1("tengu_feedback_survey_event", {
            event_type: "responded",
            appearance_id: Y.current,
            response: O,
            last_assistant_message_id: C
        })
    }, [C, z, K]);
    return {
        state: Z,
        handleSelect: R
    }
}
var dg1 = G1(z1(), 1);
var iI = G1(z1(), 1),
    bR8 = ["0", "1", "2", "3"],
    fR8 = {
        "0": "dismissed",
        "1": "bad",
        "2": "fine",
        "3": "good"
    },
    lT0 = (A) => bR8.includes(A);

function RcB({
    onSelect: A,
    inputValue: B,
    setInputValue: Q
}) {
    let Z = iI.useRef(B);
    return iI.useEffect(() => {
        if (B !== Z.current) {
            let D = B.slice(-1);
            if (lT0(D)) Q(B.slice(0, -1)), A(fR8[D])
        }
    }, [B, A, Q]), iI.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, iI.default.createElement(v, null, iI.default.createElement(T, null, e1.red("● ")), iI.default.createElement(T, {
        bold: !0
    }, "How is Claude doing this session? (optional)")), iI.default.createElement(v, {
        marginLeft: 2
    }, iI.default.createElement(v, {
        width: 10
    }, iI.default.createElement(T, null, e1.cyan("1"), ": Bad")), iI.default.createElement(v, {
        width: 10
    }, iI.default.createElement(T, null, e1.cyan("2"), ": Fine")), iI.default.createElement(v, {
        width: 10
    }, iI.default.createElement(T, null, e1.cyan("3"), ": Good")), iI.default.createElement(v, null, iI.default.createElement(T, null, e1.cyan("0"), ": Dismiss"))))
}

function OcB({
    state: A,
    handleSelect: B,
    inputValue: Q,
    setInputValue: Z
}) {
    if (A === "closed") return null;
    if (A === "thanks") return dg1.default.createElement(v, {
        marginTop: 1
    }, dg1.default.createElement(T, {
        color: "success"
    }, "✓ Thanks for helping make Claude better!"));
    if (Q && !lT0(Q)) return null;
    return dg1.default.createElement(RcB, {
        onSelect: B,
        inputValue: Q,
        setInputValue: Z
    })
}

function TcB() {
    return H0().tipsHistory || {}
}

function hR8(A) {
    let B = H0();
    gA({
        ...B,
        tipsHistory: A
    })
}

function PcB(A) {
    let B = TcB(),
        Q = H0().numStartups;
    B[A] = Q, hR8(B)
}

function gR8(A) {
    return TcB()[A] || 0
}

function pT0(A) {
    let B = gR8(A);
    if (B === 0) return 1 / 0;
    return H0().numStartups - B
}
async function mR8(A) {
    return (await Promise.all(A.map(async (Q) => {
        let Z = await Q.isRelevant();
        return {
            tip: Q,
            isRelevant: Z
        }
    }))).filter((Q) => Q.isRelevant).map((Q) => Q.tip)
}

function dR8(A) {
    return A.filter((B) => {
        return pT0(B.id) >= B.cooldownSessions
    })
}

function cR8(A) {
    if (A.length === 0) return;
    if (A.length === 1) return A[0];
    let B = A.map((Q) => ({
        tip: Q,
        sessions: pT0(Q.id)
    }));
    return B.sort((Q, Z) => Z.sessions - Q.sessions), B[0]?.tip
}
async function ScB(A) {
    if (H0().numStartups < 10) {
        if (Ka("cc_simple_onboarding", "show_simplified_onboarding", !1)) {
            let G = A.find((F) => F.id === "new-user-warmup");
            if (G && await G.isRelevant()) return G
        }
    }
    let Q = await mR8(A),
        Z = dR8(Q);
    if (Z.length === 0) return;
    return cR8(Z)
}

function jcB(A) {
    PcB(A.id), X1("tengu_tip_shown", {
        tipIdLength: A.id,
        cooldownSessions: A.cooldownSessions
    })
}