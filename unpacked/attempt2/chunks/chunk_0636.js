/* chunk:636 bytes:[14464892, 14476880) size:11988 source:unpacked-cli.js */
function sdB({
    apiKeyStatus: A,
    autoUpdaterResult: B,
    debug: Q,
    isAutoUpdating: Z,
    verbose: D,
    tokenUsage: G,
    onAutoUpdaterResult: F,
    onChangeIsUpdating: I,
    ideSelection: Y,
    ideInstallationStatus: W,
    mcpClients: J,
    isInputWrapped: X = !1
}) {
    let V = udB(G),
        C = bg1(J),
        [{
            mainLoopModel: K
        }] = tQ(),
        {
            status: H,
            resetsAt: z,
            unifiedRateLimitFallbackAvailable: $
        } = X01(),
        N = !(C === "connected" && (Y?.filePath || Y?.text && Y.lineCount > 0)) || Z || B?.status !== "success",
        R = c11(z),
        O = X && !V && !1;
    return adB.useEffect(() => {
        if (O) X1("tengu_external_editor_hint_shown", {})
    }, [O]), Z4.createElement(hT0, null, Z4.createElement(v, {
        flexDirection: "column",
        alignItems: "flex-end"
    }, Z4.createElement(ndB, {
        mcpClients: J
    }), Z4.createElement(cdB, {
        ideSelection: Y,
        mcpClients: J,
        ideInstallationStatus: W
    }), $ && K === "opus" && H !== "allowed_warning" && Z4.createElement(v, null, Z4.createElement(T, {
        color: "warning"
    }, "Approaching Opus usage limit · /model to use best available model")), H === "allowed_warning" && Z4.createElement(v, null, Z4.createElement(T, {
        color: "warning"
    }, "Approaching usage limit", R && ` · resets at ${R}`)), A === "invalid" && Z4.createElement(v, null, Z4.createElement(T, {
        color: "error"
    }, "Invalid API key · Run /login")), A === "missing" && Z4.createElement(v, null, Z4.createElement(T, {
        color: "error"
    }, "Missing API key · Run /login")), Q && Z4.createElement(v, null, Z4.createElement(T, {
        color: "warning"
    }, "Debug mode")), A !== "invalid" && A !== "missing" && D && Z4.createElement(v, null, Z4.createElement(T, {
        dimColor: !0
    }, G, " tokens")), Z4.createElement(gdB, {
        tokenUsage: G
    }), N && Z4.createElement(fdB, {
        verbose: D,
        onAutoUpdaterResult: F,
        autoUpdaterResult: B,
        isUpdating: Z,
        onChangeIsUpdating: I,
        showSuccessMessage: !V
    }), O && Z4.createElement(v, null, Z4.createElement(T, {
        dimColor: !0
    }, "ctrl-g to edit prompt in", " ", (() => {
        let j = process.env.EDITOR.trim().split(" ")[0];
        return j ? wR8(j) : "editor"
    })())), Z4.createElement(idB, null)))
}
var hI1 = G1(z1(), 1);
var Dc = G1(z1(), 1);

function gT0() {
    let B = GB()?.statusLine,
        Q = B !== void 0;
    if (Q && B) n1(`StatusLine is enabled with command: ${B.command}`);
    return Q
}

function $R8(A) {
    let B = jw1({
            permissionMode: A,
            mainLoopModel: AG()
        }),
        Z = GB()?.outputStyle || sV;
    return {
        ...NS(),
        model: {
            id: B,
            display_name: JT(B)
        },
        workspace: {
            current_dir: t0(),
            project_dir: _9()
        },
        version: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.83"
        }.VERSION,
        output_style: {
            name: Z
        }
    }
}

function rdB({
    messages: A
}) {
    let B = Dc.useRef(),
        [{
            toolPermissionContext: Q,
            statusLineText: Z
        }, D] = tQ(),
        G = Dc.useCallback(async () => {
            B.current?.abort();
            let W = new AbortController;
            B.current = W;
            try {
                let J = $R8(Q.mode),
                    X = await ijB(J, W.signal);
                if (!W.signal.aborted) D((V) => ({
                    ...V,
                    statusLineText: X
                }))
            } catch {}
        }, [D, Q.mode]),
        F = Re(G, 300);
    if (Dc.useEffect(() => {
            F()
        }, [A, F]), Dc.useEffect(() => {
            let J = GB()?.statusLine;
            if (J) X1("tengu_status_line_mount", {
                command_length: J.command.length,
                padding: J.padding
            });
            return G(), () => {
                B.current?.abort()
            }
        }, [G]), !Z) return null;
    let Y = GB()?.statusLine?.padding ?? 0;
    return hI1.createElement(v, {
        paddingX: Y
    }, hI1.createElement(T, {
        dimColor: !0
    }, Z))
}
var fX = G1(z1(), 1),
    odB = G1(z1(), 1);

function qR8({
    item: A,
    maxColumnWidth: B,
    isSelected: Q
}) {
    let Z = r9().columns,
        D = Z < 80,
        G = B ?? A.displayText.length + 5,
        F = A.color || (Q ? "suggestion" : void 0),
        I = !Q;
    return fX.createElement(v, {
        key: A.id,
        flexDirection: D ? "column" : "row"
    }, fX.createElement(v, {
        width: D ? void 0 : G
    }, fX.createElement(T, {
        color: F,
        dimColor: I
    }, A.displayText)), A.description && fX.createElement(v, {
        width: Z - (D ? 4 : G + 4),
        paddingLeft: D ? 4 : 0
    }, fX.createElement(T, {
        color: Q ? "suggestion" : void 0,
        dimColor: !Q,
        wrap: "wrap"
    }, A.description)))
}

function uT0({
    suggestions: A,
    selectedSuggestion: B
}) {
    let {
        rows: Q
    } = r9(), Z = Math.min(10, Math.max(1, Q - 3)), D = (W) => {
        return Math.max(...W.map((J) => J.displayText.length)) + 5
    };
    if (A.length === 0) return null;
    let G = Math.max(0, Math.min(B - Math.floor(Z / 2), A.length - Z)),
        F = Math.min(G + Z, A.length),
        I = A.slice(G, F),
        Y = D(I);
    return fX.createElement(v, {
        flexDirection: "column"
    }, I.map((W) => fX.createElement(qR8, {
        key: W.id,
        item: W,
        maxColumnWidth: Y,
        isSelected: W.id === A[B]?.id
    })))
}
var tB7 = odB.memo(uT0);

function NR8({
    apiKeyStatus: A,
    debug: B,
    exitMessage: Q,
    vimMode: Z,
    mode: D,
    autoUpdaterResult: G,
    isAutoUpdating: F,
    verbose: I,
    tokenUsage: Y,
    onAutoUpdaterResult: W,
    onChangeIsUpdating: J,
    suggestions: X,
    selectedSuggestion: V,
    notification: C,
    toolPermissionContext: K,
    helpOpen: H,
    suppressHint: z,
    shellsSelected: $ = !1,
    ideSelection: L,
    mcpClients: N,
    ideInstallationStatus: R,
    isPasting: O = !1,
    isInputWrapped: P = !1,
    messages: j
}) {
    let f = z || gT0();
    if (X.length) return uB.createElement(v, {
        paddingX: 2,
        paddingY: 0
    }, uB.createElement(uT0, {
        suggestions: X,
        selectedSuggestion: V
    }));
    if (H) return uB.createElement(v, {
        paddingX: 2,
        paddingY: 0,
        flexDirection: "row"
    }, uB.createElement(v, {
        flexDirection: "column",
        width: 22
    }, uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, "! for bash mode")), uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, "/ for commands")), uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, "@ for file paths")), uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, "# to memorize"))), uB.createElement(v, {
        flexDirection: "column",
        width: 35
    }, uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, "double tap esc to clear input")), uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, ZH.displayText.replace("+", " + "), " to auto-accept edits")), uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, "ctrl + r for verbose output")), uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, PdB()))), uB.createElement(v, {
        flexDirection: "column"
    }, uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, "ctrl + _ to undo")), gt0 && uB.createElement(v, null, uB.createElement(T, {
        dimColor: !0
    }, "ctrl + z to suspend"))));
    return uB.createElement(v, {
        flexDirection: "column"
    }, uB.createElement(v, {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingX: 2,
        paddingY: 0
    }, uB.createElement(v, {
        flexDirection: "column"
    }, gT0() && D === "prompt" && !Q.show && !O && !(C.show && C.content) && uB.createElement(rdB, {
        messages: j
    }), uB.createElement(kdB, {
        exitMessage: Q,
        vimMode: Z,
        mode: D,
        notification: C,
        toolPermissionContext: K,
        suppressHint: f,
        shellsSelected: $,
        isPasting: O
    })), uB.createElement(sdB, {
        apiKeyStatus: A,
        autoUpdaterResult: G,
        debug: B,
        isAutoUpdating: F,
        verbose: I,
        tokenUsage: Y,
        onAutoUpdaterResult: W,
        onChangeIsUpdating: J,
        ideSelection: L,
        mcpClients: N,
        ideInstallationStatus: R,
        isInputWrapped: P
    })))
}
var edB = tdB.memo(NR8);
var hg1 = G1(z1(), 1);
var LR8 = "at_mentioned",
    MR8 = h.object({
        method: h.literal(LR8),
        params: h.object({
            filePath: h.string(),
            lineStart: h.number().optional(),
            lineEnd: h.number().optional()
        })
    });

function AcB(A, B) {
    let Q = hg1.useRef();
    hg1.useEffect(() => {
        let Z = eV(A);
        if (Q.current !== Z) Q.current = Z;
        if (Z) Z.client.setNotificationHandler(MR8, (D) => {
            if (Q.current !== Z) return;
            try {
                let G = D.params,
                    F = G.lineStart !== void 0 ? G.lineStart + 1 : void 0,
                    I = G.lineEnd !== void 0 ? G.lineEnd + 1 : void 0;
                B({
                    filePath: G.filePath,
                    lineStart: F,
                    lineEnd: I
                })
            } catch (G) {
                R1(G)
            }
        })
    }, [A, B])
}
import * as DcB from "path";
var LR = G1(z1(), 1);

function BcB({
    maxBufferSize: A,
    debounceMs: B
}) {
    let [Q, Z] = LR.useState([]), [D, G] = LR.useState(-1), F = LR.useRef(0), I = LR.useRef(null), Y = LR.useCallback((V, C, K = {}) => {
        let H = Date.now();
        if (I.current) clearTimeout(I.current), I.current = null;
        if (H - F.current < B) {
            I.current = setTimeout(() => {
                Y(V, C, K)
            }, B);
            return
        }
        F.current = H, Z((z) => {
            let $ = D >= 0 ? z.slice(0, D + 1) : z,
                L = $[$.length - 1];
            if (L && L.text === V) return $;
            let N = [...$, {
                text: V,
                cursorOffset: C,
                pastedContents: K,
                timestamp: H
            }];
            if (N.length > A) return N.slice(-A);
            return N
        }), G((z) => {
            let $ = z >= 0 ? z + 1 : Q.length;
            return Math.min($, A - 1)
        })
    }, [B, A, D, Q.length]), W = LR.useCallback(() => {
        if (D < 0 || Q.length === 0) return;
        let V = Math.max(0, D - 1),
            C = Q[V];
        if (C) return G(V), C;
        return
    }, [Q, D]), J = LR.useCallback(() => {
        if (Z([]), G(-1), F.current = 0, I.current) clearTimeout(I.current), I.current = null
    }, [F, I]), X = D > 0 && Q.length > 1;
    return {
        pushToBuffer: Y,
        undo: W,
        canUndo: X,
        clearBuffer: J
    }
}
mT0();

function PR8(A, B) {
    let Q = Object.keys(B).map(Number),
        Z = Q.length > 0 ? Math.max(...Q) + 1 : 1,
        {
            truncatedText: D,
            placeholderContent: G
        } = F5B(A, Z);
    if (!G) return;
    let F = {
        ...B,
        [Z]: {
            id: Z,
            type: "text",
            content: G
        }
    };
    return {
        newInput: D,
        newPastedContents: F
    }
}