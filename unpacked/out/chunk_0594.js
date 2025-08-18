/* chunk:594 bytes:[13706400, 13719461) size:13061 source:unpacked-cli.js */
function DX8({
    content: A,
    addMargin: B,
    dot: Q,
    color: Z,
    dimColor: D
}) {
    let {
        columns: G
    } = r9();
    return TX.createElement(v, {
        flexDirection: "row",
        marginTop: B ? 1 : 0,
        width: "100%"
    }, Q && TX.createElement(v, {
        minWidth: 2
    }, TX.createElement(T, {
        color: Z,
        dimColor: D
    }, FU)), TX.createElement(v, {
        flexDirection: "column",
        width: G - 10
    }, TX.createElement(T, {
        color: Z,
        dimColor: D,
        wrap: "wrap"
    }, A.trim())))
}

function PS({
    message: A,
    messages: B,
    addMargin: Q,
    tools: Z,
    verbose: D,
    erroredToolUseIDs: G,
    inProgressToolUseIDs: F,
    resolvedToolUseIDs: I,
    progressMessagesForMessage: Y,
    shouldAnimate: W,
    shouldShowDot: J,
    style: X,
    width: V
}) {
    switch (A.type) {
        case "attachment":
            return v7.createElement(nkB, {
                addMargin: Q,
                attachment: A.attachment,
                verbose: D
            });
        case "assistant":
            return v7.createElement(v, {
                flexDirection: "column",
                width: "100%"
            }, A.message.content.map((C, K) => v7.createElement(FX8, {
                key: K,
                param: C,
                addMargin: Q,
                tools: Z,
                verbose: D,
                erroredToolUseIDs: G,
                inProgressToolUseIDs: F,
                resolvedToolUseIDs: I,
                progressMessagesForMessage: Y,
                shouldAnimate: W,
                shouldShowDot: J,
                width: V
            })));
        case "user":
            return v7.createElement(v, {
                flexDirection: "column",
                width: "100%"
            }, A.message.content.map((C, K) => v7.createElement(GX8, {
                key: K,
                message: A,
                messages: B,
                addMargin: Q,
                tools: Z,
                progressMessagesForMessage: Y,
                param: C,
                style: X,
                verbose: D
            })));
        case "system":
            return v7.createElement(akB, {
                message: A,
                addMargin: Q,
                verbose: D
            })
    }
}

function GX8({
    message: A,
    messages: B,
    addMargin: Q,
    tools: Z,
    progressMessagesForMessage: D,
    param: G,
    style: F,
    verbose: I
}) {
    let {
        columns: Y
    } = r9();
    switch (G.type) {
        case "text":
            return v7.createElement(tb1, {
                addMargin: Q,
                param: G,
                verbose: I
            });
        case "tool_result":
            return v7.createElement(CkB, {
                param: G,
                message: A,
                messages: B,
                progressMessagesForMessage: D,
                style: F,
                tools: Z,
                verbose: I,
                width: Y - 5
            });
        default:
            return
    }
}

function FX8({
    param: A,
    addMargin: B,
    tools: Q,
    verbose: Z,
    erroredToolUseIDs: D,
    inProgressToolUseIDs: G,
    resolvedToolUseIDs: F,
    progressMessagesForMessage: I,
    shouldAnimate: Y,
    shouldShowDot: W,
    width: J
}) {
    switch (A.type) {
        case "tool_use":
            return v7.createElement(EkB, {
                param: A,
                addMargin: B,
                tools: Q,
                verbose: Z,
                erroredToolUseIDs: D,
                inProgressToolUseIDs: G,
                resolvedToolUseIDs: F,
                progressMessagesForMessage: I,
                shouldAnimate: Y,
                shouldShowDot: W
            });
        case "text":
            return v7.createElement(fkB, {
                param: A,
                addMargin: B,
                shouldShowDot: W,
                width: J
            });
        case "redacted_thinking":
            return v7.createElement(pkB, {
                addMargin: B
            });
        case "thinking":
            return v7.createElement(lkB, {
                addMargin: B,
                param: A
            });
        default:
            return R1(new Error(`Unable to render message type: ${A.type}`)), null
    }
}
import {
    randomUUID as IX8
} from "crypto";
var YX8 = [{
        value: "both",
        label: "Both",
        description: "Restore message history and code"
    }, {
        value: "message",
        label: "Messages only",
        description: "Restore only the message history"
    }, {
        value: "workspace",
        label: "Code only",
        description: "Restore only the code"
    }],
    eb1 = 7;

function skB({
    erroredToolUseIDs: A,
    messages: B,
    onPreRestore: Q,
    onRestoreMessage: Z,
    onRestoreWorkspace: D,
    onClose: G,
    tools: F,
    resolvedToolUseIDs: I
}) {
    let [Y] = tQ(), W = XU.useMemo(IX8, []), [J, X] = XU.useState(null), [V, C] = XU.useState(!1), [K, H] = XU.useState(null);
    XU.useEffect(() => {
        X1("tengu_message_selector_opened", {})
    }, []);
    async function z(u) {
        let a = B.indexOf(u),
            l = B.length - 1 - a;
        if (X1("tengu_message_selector_selected", {
                index_from_end: l,
                message_type: u.type,
                is_current_prompt: u.uuid === W
            }), !B.includes(u)) {
            G();
            return
        }
        let y = !1;
        if (Y.checkpointing.autocheckpointEnabled) {
            let t = NF1(B, a);
            if (t) {
                if (ML0(t, Y.checkpointing)?.commit) X(u), y = !0
            }
        }
        if (!y) {
            Q(), C(!0);
            try {
                await Z(u), C(!1), G()
            } catch (t) {
                R1(t), C(!1), H("Failed to restore message")
            }
        }
    }

    function $() {
        X1("tengu_message_selector_cancelled", {}), G()
    }
    async function L(u) {
        if (X1("tengu_message_selector_restore_option_selected", {
                option: u
            }), !J) {
            H("Message not found.");
            return
        }
        Q(), C(!0), H(null);
        let a = null,
            l = null;
        if (u === "workspace" || u === "both") try {
            await D(J)
        } catch (y) {
            a = y, R1(a)
        }
        if (u === "message" || u === "both") try {
            await Z(J)
        } catch (y) {
            l = y, R1(l)
        }
        if (C(!1), X(null), l && a) H("Failed to restore code and messages");
        else if (l) H("Failed to restore messages");
        else if (a) H("Failed to restore code");
        else G()
    }
    let N = XU.useMemo(() => [...B.filter(WX8), {
            ...D2({
                content: ""
            }),
            uuid: W
        }], [B, W]),
        [R, O] = XU.useState(N.length - 1),
        P = U2();
    DA((u, a) => {
        if (a.tab || a.escape) {
            $();
            return
        }
        if (V || K || J) return;
        if (a.return) {
            z(N[R]);
            return
        }
        if (a.upArrow)
            if (a.ctrl || a.shift || a.meta) O(0);
            else O((l) => Math.max(0, l - 1));
        if (a.downArrow)
            if (a.ctrl || a.shift || a.meta) O(N.length - 1);
            else O((l) => Math.min(N.length - 1, l + 1))
    });
    let j = Math.max(0, Math.min(R - Math.floor(eb1 / 2), N.length - eb1)),
        f = XU.useMemo(() => IF(B).filter(Ld), [B]),
        k = Y.checkpointing.autocheckpointEnabled && Y.checkpointing.status !== "initialized",
        c = XU.useMemo(() => {
            let u = new Set;
            if (!Y.checkpointing.autocheckpointEnabled || k) return u;
            return N.forEach((a, l) => {
                let y = B.indexOf(a);
                if (y >= 0) {
                    let t = NF1(B, y);
                    if (!t) u.add(l);
                    else if (!ML0(t, Y.checkpointing)?.commit) u.add(l)
                }
            }), u
        }, [N, k, B, Y.checkpointing]);
    return w2.createElement(w2.Fragment, null, K && w2.createElement(w2.Fragment, null, w2.createElement(v, {
        marginTop: 2,
        padding: 1,
        flexDirection: "column"
    }, w2.createElement(T, {
        color: "error"
    }, "Error: ", K), w2.createElement(v, {
        marginTop: 1
    }, w2.createElement(T, {
        dimColor: !0
    }, P.pending ? `Press ${P.keyName} again to exit` : !V ? "Press Enter or Esc to exit" : "")))), !K && w2.createElement(w2.Fragment, null, w2.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        height: J || K || V ? void 0 : 4 + Math.min(eb1, N.length) * 2 + (k ? 2 : 0),
        paddingX: 1,
        marginTop: 1
    }, J && w2.createElement(w2.Fragment, null, w2.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, w2.createElement(T, {
        bold: !0
    }, "What would you like to restore?")), w2.createElement(uA, {
        isDisabled: V,
        options: YX8,
        onChange: (u) => L(u),
        onCancel: () => X(null)
    })), !J && w2.createElement(w2.Fragment, null, w2.createElement(v, {
        flexDirection: "column",
        minHeight: 2,
        marginBottom: 1
    }, w2.createElement(T, {
        bold: !0
    }, "Jump to a previous message"), w2.createElement(T, {
        dimColor: !0
    }, "This will fork the conversation")), N.slice(j, j + eb1).map((u, a) => {
        let l = j + a,
            y = l === R,
            t = u.uuid === W;
        return w2.createElement(v, {
            key: u.uuid,
            flexDirection: "row",
            height: 2,
            minHeight: 2
        }, w2.createElement(v, {
            width: 7
        }, y ? w2.createElement(T, {
            color: "permission",
            bold: !0
        }, s0.pointer, " ", j + a + 1, " ") : w2.createElement(T, null, "  ", j + a + 1, " ")), w2.createElement(v, {
            height: 1,
            overflow: "hidden",
            width: "100%",
            flexDirection: "row"
        }, w2.createElement(v, {
            flexGrow: 1,
            flexShrink: 1,
            overflow: "hidden"
        }, t ? w2.createElement(T, {
            dimColor: !0,
            italic: !0
        }, "(current)") : Array.isArray(u.message.content) && u.message.content[0]?.type === "text" && db1(u.message.content[0].text) ? w2.createElement(T, {
            dimColor: !0,
            italic: !0
        }, "(empty message)") : w2.createElement(PS, {
            message: ZI(IF([u])),
            messages: f,
            addMargin: !1,
            tools: F,
            verbose: !1,
            erroredToolUseIDs: A,
            inProgressToolUseIDs: new Set,
            resolvedToolUseIDs: I,
            shouldAnimate: !1,
            shouldShowDot: !1,
            progressMessagesForMessage: []
        })), Y.checkpointing.autocheckpointEnabled && c.has(l) && !t && w2.createElement(v, {
            flexShrink: 0,
            paddingX: 2
        }, w2.createElement(T, {
            dimColor: !0
        }, "[ ", s0.cross, " Restore Code ]"))))
    }), Y.checkpointing.autocheckpointEnabled && k && w2.createElement(w2.Fragment, null, w2.createElement(T, {
        dimColor: !0
    }, s0.cross, " Code restoration is unavailable (see /checkpoint)")))), w2.createElement(v, {
        marginLeft: 3
    }, w2.createElement(T, {
        dimColor: !0
    }, P.pending ? w2.createElement(w2.Fragment, null, "Press ", P.keyName, " again to exit") : w2.createElement(w2.Fragment, null, "↑/↓ to select · Enter to confirm · Tab/Esc to cancel")))))
}

function WX8(A) {
    if (A.type !== "user") return !1;
    if (Array.isArray(A.message.content) && A.message.content[0]?.type === "tool_result") return !1;
    if (gb1(A)) return !1;
    if (A.isMeta) return !1;
    if (typeof A.message.content === "string") {
        let B = A.message.content;
        if (B.indexOf("<local-command-stdout>") !== -1 || B.indexOf("<local-command-stderr>") !== -1 || B.indexOf("<bash-stdout>") !== -1 || B.indexOf("<bash-stderr>") !== -1) return !1
    }
    return !0
}
var rkB = G1(z1(), 1);
var JX8 = h.object({
    method: h.literal("log_event"),
    params: h.object({
        eventName: h.string(),
        eventData: h.object({}).passthrough()
    })
});

function okB(A) {
    rkB.useEffect(() => {
        if (!A.length) return;
        let B = eV(A);
        if (B) B.client.setNotificationHandler(JX8, async (Q) => {
            let {
                eventName: Z,
                eventData: D
            } = Q.params;
            X1(`tengu_ide_${Z}`, D)
        })
    }, [A])
}
var HR0 = G1(z1(), 1);
var NQ = G1(z1(), 1);
import {
    EOL as XX8
} from "os";
import {
    dirname as VX8,
    extname as CX8,
    isAbsolute as KX8,
    relative as tkB,
    resolve as HX8,
    sep as zX8
} from "path";