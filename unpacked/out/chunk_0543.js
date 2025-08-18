/* chunk:543 bytes:[12745760, 12765480) size:19720 source:unpacked-cli.js */
function Uj6(A, B) {
    if (wK0(A) && wK0(B)) return A.display === B.display && Ej6(A.pastedContents, B.pastedContents);
    return A === B
}
var wj6 = 1e4,
    Z5B = 1000;

function F5B(A, B) {
    if (A.length <= wj6) return {
        truncatedText: A,
        placeholderContent: ""
    };
    let Q = Math.floor(Z5B / 2),
        Z = Math.floor(Z5B / 2),
        D = A.slice(0, Q),
        G = A.slice(-Z),
        F = A.slice(Q, -Z),
        I = cj1(F),
        W = Hj6(B, I);
    return {
        truncatedText: D + W + G,
        placeholderContent: F
    }
}

function fx(A) {
    let B = UQ(),
        Q = lj1(),
        Z = typeof A === "string" ? {
            display: A,
            pastedContents: {}
        } : A;
    if (Q[0] && Uj6(Q[0], Z)) return;
    Q.unshift(Z), r5({
        ...B,
        history: Q.slice(0, Kj6)
    })
}

function I5B(A) {
    return function(B) {
        return (new Map(A).get(B) ?? (() => {}))(B)
    }
}

function pj1({
    value: A,
    onChange: B,
    onSubmit: Q,
    onExit: Z,
    onExitMessage: D,
    onMessage: G,
    onHistoryUp: F,
    onHistoryDown: I,
    onHistoryReset: Y,
    mask: W = "",
    multiline: J = !1,
    cursorChar: X,
    invert: V,
    columns: C,
    onImagePaste: K,
    disableCursorMovementForUpDownKeys: H = !1,
    externalOffset: z,
    onOffsetChange: $,
    inputFilter: L
}) {
    let N = z,
        R = $,
        O = k8.fromText(A, C, N),
        [P, j] = Y5B.useState(null);

    function f() {
        if (!P) return;
        clearTimeout(P), j(null), G?.(!1)
    }
    let k = UP((w1) => {
            f(), D?.(w1, "Ctrl-C")
        }, () => Z?.(), () => {
            if (A) B(""), Y?.()
        }),
        c = UP((w1) => {
            f(), G?.(!!A && w1, "Press Escape again to clear")
        }, () => {
            if (A) B("")
        });

    function u() {
        if (A.trim() !== "") fx(A), Y?.();
        return k8.fromText("", C, 0)
    }
    let a = UP((w1) => {
        if (A !== "") return;
        D?.(w1, "Ctrl-D")
    }, () => {
        if (A !== "") return;
        Z?.()
    });

    function l() {
        if (f(), O.text === "") return a(), O;
        return O.del()
    }

    function y(w1) {
        if (w1 === null) {
            if (process.platform !== "darwin") return O;
            return G?.(!0, f8B), f(), j(setTimeout(() => {
                G?.(!1)
            }, 4000)), O
        }
        return K?.(w1.base64, w1.mediaType), O
    }
    let t = I5B([
            ["a", () => O.startOfLine()],
            ["b", () => O.left()],
            ["c", k],
            ["d", l],
            ["e", () => O.endOfLine()],
            ["f", () => O.right()],
            ["h", () => O.backspace()],
            ["k", () => O.deleteToLineEnd()],
            ["l", () => u()],
            ["n", () => F0()],
            ["p", () => _1()],
            ["u", () => O.deleteToLineStart()],
            ["v", () => {
                return fj1().then((w1) => {
                    y(w1)
                }), O
            }],
            ["w", () => O.deleteWordBefore()]
        ]),
        E1 = I5B([
            ["b", () => O.prevWord()],
            ["f", () => O.nextWord()],
            ["d", () => O.deleteWordAfter()]
        ]);

    function C1(w1) {
        if (J && O.offset > 0 && O.text[O.offset - 1] === "\\") return Q5B(), O.backspace().insert(`
`);
        if (w1.meta) return O.insert(`
`);
        Q?.(A)
    }

    function _1() {
        if (H) return F?.(), O;
        let w1 = O.up();
        if (!w1.equals(O)) return w1;
        if (J) {
            let Q1 = O.upLogicalLine();
            if (!Q1.equals(O)) return Q1
        }
        return F?.(), O
    }

    function F0() {
        if (H) return I?.(), O;
        let w1 = O.down();
        if (!w1.equals(O)) return w1;
        if (J) {
            let Q1 = O.downLogicalLine();
            if (!Q1.equals(O)) return Q1
        }
        return I?.(), O
    }

    function W0(w1) {
        switch (!0) {
            case w1.escape:
                return c;
            case (w1.leftArrow && (w1.ctrl || w1.meta || w1.fn)):
                return () => O.prevWord();
            case (w1.rightArrow && (w1.ctrl || w1.meta || w1.fn)):
                return () => O.nextWord();
            case w1.backspace:
                return w1.meta ? () => O.deleteWordBefore() : () => O.backspace();
            case w1.delete:
                return w1.meta ? () => O.deleteToLineEnd() : () => O.del();
            case w1.ctrl:
                return t;
            case w1.home:
                return () => O.startOfLine();
            case w1.end:
                return () => O.endOfLine();
            case w1.pageDown:
                return () => O.endOfLine();
            case w1.pageUp:
                return () => O.startOfLine();
            case w1.meta:
                return E1;
            case w1.return:
                return () => C1(w1);
            case w1.tab:
                return () => O;
            case w1.upArrow:
                return _1;
            case w1.downArrow:
                return F0;
            case w1.leftArrow:
                return () => O.left();
            case w1.rightArrow:
                return () => O.right();
            default:
                return function(Q1) {
                    switch (!0) {
                        case (Q1 === "\x1B[H" || Q1 === "\x1B[1~"):
                            return O.startOfLine();
                        case (Q1 === "\x1B[F" || Q1 === "\x1B[4~"):
                            return O.endOfLine();
                        default:
                            if (O.isAtStart() && (Q1 === "!" || Q1 === "#")) return O.insert(eG(Q1).replace(/\r/g, `
`)).left();
                            return O.insert(eG(Q1).replace(/\r/g, `
`))
                    }
                }
        }
    }

    function g1(w1, Q1) {
        let k1 = L ? L(w1, Q1) : w1;
        if (k1 === "" && w1 !== "") return;
        let H1 = W0(Q1)(k1);
        if (H1) {
            if (!O.equals(H1)) {
                if (R(H1.offset), O.text !== H1.text) B(H1.text)
            }
        }
    }
    return {
        onInput: g1,
        renderedValue: O.render(X, W, V),
        offset: N,
        setOffset: R
    }
}
var KZ1 = G1(z1(), 1);
var z$ = G1(z1(), 1);
var JX = G1(z1(), 1),
    LK0 = G1(V5B(), 1);
var fj6 = typeof window !== "undefined" ? JX.useLayoutEffect : JX.useEffect;

function cK(A, B) {
    let Q = JX.useRef(A);
    fj6(() => {
        Q.current = A
    }, [A]), JX.useEffect(() => {
        if (B === null) return;
        let Z = setInterval(() => {
            Q.current()
        }, B);
        return () => {
            clearInterval(Z)
        }
    }, [B])
}

function hj6(A) {
    let B = JX.useRef(A);
    B.current = A, JX.useEffect(() => () => {
        B.current()
    }, [])
}

function Re(A, B = 500, Q) {
    let Z = JX.useRef();
    hj6(() => {
        if (Z.current) Z.current.cancel()
    });
    let D = JX.useMemo(() => {
        let G = LK0.default(A, B, Q),
            F = (...I) => {
                return G(...I)
            };
        return F.cancel = () => {
            G.cancel()
        }, F.isPending = () => {
            return !!Z.current
        }, F.flush = () => {
            return G.flush()
        }, F
    }, [A, B, Q]);
    return JX.useEffect(() => {
        Z.current = LK0.default(A, B, Q)
    }, [A, B, Q]), D
}
var gj6 = 50,
    uj6 = 100;

function C5B({
    onPaste: A,
    onInput: B,
    onImagePaste: Q
}) {
    let [Z, D] = z$.default.useState({
        chunks: [],
        timeoutId: null
    }), [G, F] = z$.default.useState(!1), I = z$.default.useRef(!1), Y = z$.default.useRef(!1), W = z$.default.useRef(!0), J = z$.default.useMemo(() => L9() === "macos", []);
    z$.default.useEffect(() => {
        return () => {
            W.current = !1
        }
    }, []);
    let X = z$.default.useCallback(() => {
            if (!Q || !W.current) return;
            fj1().then((z) => {
                if (z && W.current) Q(z.base64, z.mediaType)
            }).catch((z) => {
                if (W.current) SA(`Failed to check clipboard for image: ${z}`)
            }).finally(() => {
                if (W.current) F(!1)
            })
        }, [Q]),
        V = Re(X, gj6),
        C = z$.default.useCallback((z) => {
            if (z) clearTimeout(z);
            return setTimeout(() => {
                D(({
                    chunks: $
                }) => {
                    let L = $.join("");
                    if (Q && CK0(L)) {
                        let N = /\/TemporaryItems\/.*screencaptureui.*\/Screenshot/i.test(L);
                        return c8B(L).then((R) => {
                            if (R) Q(R.base64, R.mediaType);
                            else if (N && J) V();
                            else {
                                if (A) A(L);
                                F(!1)
                            }
                        }), {
                            chunks: [],
                            timeoutId: null
                        }
                    }
                    if (J && Q && L.length === 0) return V(), {
                        chunks: [],
                        timeoutId: null
                    };
                    if (A) A(L);
                    return F(!1), {
                        chunks: [],
                        timeoutId: null
                    }
                })
            }, uj6)
        }, [V, J, Q, A]),
        {
            stdin: K
        } = a_();
    return z$.default.useEffect(() => {
        if (!K) return;
        let z = ($) => {
            let L = $.toString();
            if (L.includes("\x1B[200~")) F(!0), I.current = !0, Y.current = !1;
            if (L.includes("\x1B[201~")) {
                if (F(!1), J && I.current && !Y.current && Q) V();
                I.current = !1, Y.current = !1, D({
                    chunks: [],
                    timeoutId: null
                })
            }
        };
        return K.on("data", z), () => {
            K.off("data", z), F(!1)
        }
    }, [K, Q, V, J]), {
        wrappedOnInput: (z, $) => {
            if (G) Y.current = !0;
            let L = CK0(z);
            if (A && (z.length > bj1 || Z.timeoutId || L || G)) {
                D(({
                    chunks: R,
                    timeoutId: O
                }) => {
                    return {
                        chunks: [...R, z],
                        timeoutId: C(O)
                    }
                });
                return
            }
            if (B(z, $), z.length > 10) F(!1)
        },
        pasteState: Z,
        isPasting: G
    }
}

function K5B({
    placeholder: A,
    value: B,
    showCursor: Q,
    focus: Z,
    terminalFocus: D = !0
}) {
    let G = void 0;
    if (A) {
        if (G = e1.dim(A), Q && Z && D) G = A.length > 0 ? e1.inverse(A[0]) + e1.dim(A.slice(1)) : e1.inverse(" ")
    }
    let F = B.length === 0 && Boolean(A);
    return {
        renderedPlaceholder: G,
        showPlaceholder: F
    }
}

function ij1({
    inputState: A,
    children: B,
    terminalFocus: Q,
    ...Z
}) {
    let {
        onInput: D,
        renderedValue: G
    } = A, {
        wrappedOnInput: F,
        isPasting: I
    } = C5B({
        onPaste: Z.onPaste,
        onInput: (C, K) => {
            if (I && K.return) return;
            D(C, K)
        },
        onImagePaste: Z.onImagePaste
    }), {
        onIsPastingChange: Y
    } = Z;
    KZ1.default.useEffect(() => {
        if (Y) Y(I)
    }, [I, Y]);
    let {
        showPlaceholder: W,
        renderedPlaceholder: J
    } = K5B({
        placeholder: Z.placeholder,
        value: Z.value,
        showCursor: Z.showCursor,
        focus: Z.focus,
        terminalFocus: Q
    });
    DA(F, {
        isActive: Z.focus
    });
    let X = Z.value && Z.value.trim().indexOf(" ") === -1 || Z.value && Z.value.endsWith(" "),
        V = Boolean(Z.argumentHint && Z.value && X && Z.value.startsWith("/"));
    return KZ1.default.createElement(v, null, KZ1.default.createElement(T, {
        wrap: "truncate-end"
    }, W ? J : G, V && KZ1.default.createElement(T, {
        color: "secondaryText"
    }, Z.value?.endsWith(" ") ? "" : " ", Z.argumentHint), B))
}
var uP = G1(z1(), 1);
var MK0 = !0,
    jm = new Set;

function RK0(A) {
    let B = A.toString();
    if (B.includes("\x1B[I")) MK0 = !0, jm.forEach((Q) => Q(!0));
    if (B.includes("\x1B[O")) MK0 = !1, jm.forEach((Q) => Q(!1))
}

function H5B() {
    let A = () => {
        if (jm.size === 0) return;
        process.stdin.off("data", RK0), process.stdout.write("\x1B[?1004l")
    };
    process.on("exit", A)
}

function z5B() {
    let [A, B] = uP.useState(MK0), [Q, Z] = uP.useState(!1), D = uP.useCallback((F) => {
        B(F), Z(!1)
    }, []);
    uP.useEffect(() => {
        if (!process.stdout.isTTY) return;
        if (jm.add(D), jm.size === 1) process.stdout.write("\x1B[?1004h"), process.stdin.on("data", RK0);
        return () => {
            if (jm.delete(D), jm.size === 0) process.stdin.off("data", RK0), process.stdout.write("\x1B[?1004l")
        }
    }, [D]), uP.useEffect(() => {
        if (!A && Q) X1("tengu_typing_without_terminal_focus", {})
    }, [A, Q]);
    let G = uP.useCallback((F, I) => {
        if (F === "\x1B[I" || F === "\x1B[O" || F === "[I" || F === "[O") return "";
        if ((F || I) && !A) Z(!0);
        return F
    }, [A]);
    return {
        isFocused: A || Q,
        filterFocusSequences: G
    }
}

function y8(A) {
    let [B] = fB(), {
        isFocused: Q,
        filterFocusSequences: Z
    } = z5B(), D = pj1({
        value: A.value,
        onChange: A.onChange,
        onSubmit: A.onSubmit,
        onExit: A.onExit,
        onExitMessage: A.onExitMessage,
        onMessage: A.onMessage,
        onHistoryReset: A.onHistoryReset,
        onHistoryUp: A.onHistoryUp,
        onHistoryDown: A.onHistoryDown,
        focus: A.focus,
        mask: A.mask,
        multiline: A.multiline,
        cursorChar: A.showCursor ? " " : "",
        highlightPastedText: A.highlightPastedText,
        invert: Q ? e1.inverse : (G) => G,
        themeText: pB("text", B),
        columns: A.columns,
        onImagePaste: A.onImagePaste,
        disableCursorMovementForUpDownKeys: A.disableCursorMovementForUpDownKeys,
        externalOffset: A.cursorOffset,
        onOffsetChange: A.onChangeCursorOffset,
        inputFilter: Z
    });
    return E5B.default.createElement(ij1, {
        inputState: D,
        terminalFocus: Q,
        ...A
    })
}
var mj6 = [{
    value: "yes-session",
    label: "Yes, for this session"
}, {
    value: "yes-remember",
    label: "Yes, and remember this directory"
}, {
    value: "no",
    label: "No"
}];

function U5B() {
    return uQ.createElement(T, {
        color: "secondaryText"
    }, "Claude Code will be able to read files in this directory and make edits when auto-accept edits is on.")
}

function dj6({
    path: A
}) {
    return uQ.createElement(v, {
        flexDirection: "column",
        paddingX: 2,
        gap: 1
    }, uQ.createElement(T, {
        color: "permission"
    }, A), uQ.createElement(U5B, null))
}

function cj6({
    value: A,
    onChange: B,
    onSubmit: Q,
    error: Z
}) {
    return uQ.createElement(v, {
        flexDirection: "column"
    }, uQ.createElement(T, null, "Enter the path to the directory:"), uQ.createElement(v, {
        borderColor: "secondaryBorder",
        borderDimColor: !0,
        borderStyle: "round",
        marginY: 1,
        paddingLeft: 1
    }, uQ.createElement(y8, {
        showCursor: !0,
        placeholder: `Directory path${s0.ellipsis}`,
        value: A,
        onChange: B,
        onSubmit: Q,
        columns: 80,
        cursorOffset: A.length,
        onChangeCursorOffset: () => {}
    })), Z && uQ.createElement(T, {
        color: "error"
    }, Z))
}

function nj1({
    onAddDirectory: A,
    onCancel: B,
    permissionContext: Q,
    setPermissionContext: Z,
    directoryPath: D
}) {
    let [G, F] = mP.useState(""), [I, Y] = mP.useState(null), W = U2(), J = mP.useMemo(() => mj6, []);
    DA(mP.useCallback((C, K) => {
        if (K.escape || K.ctrl && C === "c") B()
    }, [B]));
    let X = mP.useCallback((C) => {
            let K = HZ1(C, Q);
            if (K.resultType === "success") Z(K.updatedPermissionContext), A(C, !1);
            else Y(zZ1(K))
        }, [Q, Z, A]),
        V = mP.useCallback((C) => {
            if (!D) return;
            switch (C) {
                case "yes-session":
                    A(D, !1);
                    break;
                case "yes-remember":
                    A(D, !0);
                    break;
                case "no":
                    B();
                    break
            }
        }, [D, A, B]);
    return uQ.createElement(uQ.Fragment, null, uQ.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        gap: 1,
        borderColor: "permission"
    }, uQ.createElement(T, {
        bold: !0,
        color: "permission"
    }, "Add directory to workspace"), D ? uQ.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, uQ.createElement(dj6, {
        path: D
    }), uQ.createElement(uA, {
        options: J,
        onChange: V,
        onCancel: () => V("no")
    })) : uQ.createElement(v, {
        flexDirection: "column",
        gap: 1,
        marginX: 2
    }, uQ.createElement(U5B, null), uQ.createElement(cj6, {
        value: G,
        onChange: F,
        onSubmit: X,
        error: I
    }))), !D && uQ.createElement(v, {
        marginLeft: 3
    }, W.pending ? uQ.createElement(T, {
        dimColor: !0
    }, "Press ", W.keyName, " again to exit") : uQ.createElement(T, {
        dimColor: !0
    }, "Enter to add · Esc to cancel")))
}
var E$ = G1(z1(), 1),
    w5B = G1(z1(), 1);

function OA({
    children: A,
    height: B
}) {
    if (w5B.useContext($5B)) return A;
    return E$.createElement(lj6, null, E$.createElement(v, {
        flexDirection: "row",
        height: B,
        overflowY: "hidden"
    }, E$.createElement(T, null, "  ", "⎿  "), A))
}
var $5B = E$.createContext(!1);

function lj6({
    children: A
}) {
    return E$.createElement($5B.Provider, {
        value: !0
    }, A)
}

function PM(A) {
    X1("tengu_unary_event", {
        event: A.event,
        completion_type: A.completion_type,
        language_name: A.metadata.language_name,
        message_id: A.metadata.message_id,
        platform: A.metadata.platform
    })
}

function dP(A, {
    assistantMessage: {
        message: {
            id: B
        }
    }
}, Q) {
    PM({
        completion_type: A,
        event: Q,
        metadata: {
            language_name: "none",
            message_id: B,
            platform: sA.platform
        }
    })
}

function OK0(A, B = "localSettings") {
    let Z = _Y(B)?.permissions?.additionalDirectories || [];
    if (!Z.includes(A)) {
        let D = [...Z, A];
        y6(B, {
            permissions: {
                additionalDirectories: D
            }
        })
    }
}

function EZ1(A, B, Q = "localSettings") {
    let Z = {
            path: B,
            source: Q
        },
        D = new Map(A.additionalWorkingDirectories);
    return D.set(B, Z), {
        ...A,
        additionalWorkingDirectories: D
    }
}

function q5B(A, B, Q, Z = !0) {
    let D = jx(A);
    if (Z) OK0(D, "localSettings");
    let F = EZ1(B, D, Z ? "localSettings" : "session");
    Q(F)
}