/* chunk:535 bytes:[12596258, 12612571) size:16313 source:unpacked-cli.js */
class Y31 {
    width;
    height;
    operations = [];
    charCache = {};
    styledCharsToStringCache = {};
    constructor(A) {
        let {
            width: B,
            height: Q
        } = A;
        this.width = B, this.height = Q
    }
    write(A, B, Q, Z) {
        let {
            transformers: D
        } = Z;
        if (!Q) return;
        this.operations.push({
            type: "write",
            x: A,
            y: B,
            text: Q,
            transformers: D
        })
    }
    clip(A) {
        this.operations.push({
            type: "clip",
            clip: A
        })
    }
    unclip() {
        this.operations.push({
            type: "unclip"
        })
    }
    get() {
        let A = [];
        for (let Z = 0; Z < this.height; Z++) {
            let D = [];
            for (let G = 0; G < this.width; G++) D.push({
                type: "char",
                value: " ",
                fullWidth: !1,
                styles: []
            });
            A.push(D)
        }
        let B = [];
        for (let Z of this.operations) {
            if (Z.type === "clip") B.push(Z.clip);
            if (Z.type === "unclip") B.pop();
            if (Z.type === "write") {
                let {
                    text: D,
                    transformers: G
                } = Z, {
                    x: F,
                    y: I
                } = Z, Y = D.split(`
`), W = B.at(-1);
                if (W) {
                    let X = typeof W?.x1 === "number" && typeof W?.x2 === "number",
                        V = typeof W?.y1 === "number" && typeof W?.y2 === "number";
                    if (X) {
                        let C = ho(D);
                        if (F + C < W.x1 || F > W.x2) continue
                    }
                    if (V) {
                        let C = Y.length;
                        if (I + C < W.y1 || I > W.y2) continue
                    }
                    if (X) {
                        if (Y = Y.map((C) => {
                                let K = F < W.x1 ? W.x1 - F : 0,
                                    H = n51(C),
                                    z = F + H > W.x2 ? W.x2 - F : H;
                                return hF0(C, K, z)
                            }), F < W.x1) F = W.x1
                    }
                    if (V) {
                        let C = I < W.y1 ? W.y1 - I : 0,
                            K = Y.length,
                            H = I + K > W.y2 ? W.y2 - I : K;
                        if (Y = Y.slice(C, H), I < W.y1) I = W.y1
                    }
                }
                let J = 0;
                for (let [X, V] of Y.entries()) {
                    let C = A[I + J];
                    if (!C) continue;
                    for (let z of G) V = z(V, X);
                    if (!this.charCache.hasOwnProperty(V)) this.charCache[V] = YR2(JR2(V));
                    let K = this.charCache[V],
                        H = F;
                    for (let z of K) {
                        C[H] = z;
                        let $ = z.fullWidth || z.value.length > 1;
                        if ($) C[H + 1] = {
                            type: "char",
                            value: "",
                            fullWidth: !1,
                            styles: z.styles
                        };
                        H += $ ? 2 : 1
                    }
                    J++
                }
            }
        }
        return {
            output: A.map((Z) => {
                let D = Z.filter((F) => F !== void 0),
                    G = JSON.stringify(D);
                if (!this.styledCharsToStringCache.hasOwnProperty(G)) {
                    let F = WR2(D).trimEnd();
                    this.styledCharsToStringCache[G] = F
                }
                return this.styledCharsToStringCache[G]
            }).join(`
`),
            height: A.length
        }
    }
}
var Gr4 = (A, B) => {
        if (A.yogaNode) {
            let Q = new Y31({
                width: A.yogaNode.getComputedWidth(),
                height: A.yogaNode.getComputedHeight()
            });
            xF0(A, Q, {
                skipStaticElements: !0,
                theme: B
            });
            let Z;
            if (A.staticNode?.yogaNode) Z = new Y31({
                width: A.staticNode.yogaNode.getComputedWidth(),
                height: A.staticNode.yogaNode.getComputedHeight()
            }), xF0(A.staticNode, Z, {
                skipStaticElements: !1,
                theme: B
            });
            let {
                output: D,
                height: G
            } = Q.get();
            return {
                output: D,
                outputHeight: G,
                staticOutput: Z ? `${Z.get().output}
` : ""
            }
        }
        return {
            output: "",
            outputHeight: 0,
            staticOutput: ""
        }
    },
    XR2 = Gr4;
import qR2 from "node:process";
var UR2 = G1(HR2(), 1),
    wR2 = G1(ER2(), 1);
import Ir4 from "node:process";
var Yr4 = UR2.default(() => {
        wR2.default(() => {
            Ir4.stderr.write("\x1B[?25h")
        }, {
            alwaysLast: !0
        })
    }),
    $R2 = Yr4;
var mO1 = !1,
    oo = {};
oo.show = (A = qR2.stderr) => {
    if (!A.isTTY) return;
    mO1 = !1, A.write("\x1B[?25h")
};
oo.hide = (A = qR2.stderr) => {
    if (!A.isTTY) return;
    $R2(), mO1 = !0, A.write("\x1B[?25l")
};
oo.toggle = (A, B) => {
    if (A !== void 0) mO1 = A;
    if (mO1) oo.show(B);
    else oo.hide(B)
};
var i_ = oo;
var Wr4 = (A, {
        showCursor: B = !1
    } = {}) => {
        let Q = 0,
            Z = "",
            D = !1,
            G = (F) => {
                if (!B && !D) i_.hide(), D = !0;
                let I = F + `
`;
                if (I === Z) return;
                Z = I, A.write(v_.eraseLines(Q) + I), Q = I.split(`
`).length
            };
        return G.clear = () => {
            A.write(v_.eraseLines(Q)), Z = "", Q = 0
        }, G.updateLineCount = (F) => {
            Q = F.split(`
`).length
        }, G.resetLineCount = () => {
            Q = 0
        }, G.done = () => {
            if (Z = "", Q = 0, !B) i_.show(), D = !1
        }, G
    },
    Jr4 = {
        create: Wr4
    },
    NR2 = Jr4;
var Xr4 = new Map,
    vu = Xr4;
var sL = G1(z1(), 1);
import {
    EventEmitter as yr4
} from "node:events";
var LR2 = G1(z1(), 1),
    MR2 = LR2.createContext({
        exit() {}
    });
MR2.displayName = "InternalAppContext";
var aF0 = MR2;
var RR2 = G1(z1(), 1);
import {
    EventEmitter as Vr4
} from "node:events";
var OR2 = RR2.createContext({
    stdin: process.stdin,
    internal_eventEmitter: new Vr4,
    setRawMode() {},
    isRawModeSupported: !1,
    internal_exitOnCtrlC: !0,
    internal_resetLineCount() {}
});
OR2.displayName = "InternalStdinContext";
var dO1 = OR2;
var TR2 = G1(z1(), 1),
    PR2 = TR2.createContext({
        stdout: process.stdout,
        write() {}
    });
PR2.displayName = "InternalStdoutContext";
var sF0 = PR2;
var SR2 = G1(z1(), 1),
    jR2 = SR2.createContext({
        stderr: process.stderr,
        write() {}
    });
jR2.displayName = "InternalStderrContext";
var rF0 = jR2;
var kR2 = G1(z1(), 1),
    yR2 = kR2.createContext({
        activeId: void 0,
        add() {},
        remove() {},
        activate() {},
        deactivate() {},
        enableFocus() {},
        disableFocus() {},
        focusNext() {},
        focusPrevious() {},
        focus() {}
    });
yR2.displayName = "InternalFocusContext";
var cO1 = yR2;
var AF = G1(z1(), 1),
    ZI0 = G1(hR2(), 1);
import * as iO1 from "node:fs";
import {
    cwd as lR2
} from "node:process";
var wr4 = (A, B = 2) => {
        return A.replace(/^\t+/gm, (Q) => " ".repeat(Q.length * B))
    },
    gR2 = wr4;
var $r4 = (A, B) => {
        let Q = [],
            Z = A - B,
            D = A + B;
        for (let G = Z; G <= D; G++) Q.push(G);
        return Q
    },
    qr4 = (A, B, Q = {}) => {
        var Z;
        if (typeof A !== "string") throw new TypeError("Source code is missing.");
        if (!B || B < 1) throw new TypeError("Line number must start from `1`.");
        let D = gR2(A).split(/\r?\n/);
        if (B > D.length) return;
        return $r4(B, (Z = Q.around) !== null && Z !== void 0 ? Z : 3).filter((G) => D[G - 1] !== void 0).map((G) => ({
            line: G,
            value: D[G - 1]
        }))
    },
    uR2 = qr4;
var lO1 = G1(z1(), 1),
    tF0 = lO1.forwardRef(({
        children: A,
        ...B
    }, Q) => {
        return lO1.default.createElement("ink-box", {
            ref: Q,
            style: {
                ...B,
                overflowX: B.overflowX ?? B.overflow ?? "visible",
                overflowY: B.overflowY ?? B.overflow ?? "visible"
            }
        }, A)
    });
tF0.displayName = "Box";
tF0.defaultProps = {
    flexWrap: "nowrap",
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 1
};
var v = tF0;
var mR2 = G1(z1(), 1);
var pO1 = G1(z1(), 1),
    n_ = G1(z1(), 1);
var AI0 = n_.createContext({
    theme: null,
    setTheme: (A) => A,
    setPreviewTheme: (A) => A,
    savePreview: () => {},
    currentTheme: null
});

function BI0({
    children: A,
    initialState: B
}) {
    let [Q, Z] = n_.useState(B), [D, G] = n_.useState(null), F = pO1.useMemo(() => ({
        theme: Q,
        setTheme: (I) => {
            gA({
                ...H0(),
                theme: I
            }), Z(I), eF0(I), G(null)
        },
        setPreviewTheme: (I) => {
            G(I), eF0(I)
        },
        savePreview: () => {
            if (D !== null) gA({
                ...H0(),
                theme: D
            }), Z(D), G(null)
        },
        currentTheme: D ?? Q
    }), [Q, D]);
    return pO1.default.createElement(AI0.Provider, {
        value: F
    }, A)
}

function fB() {
    let {
        currentTheme: A,
        setTheme: B
    } = n_.useContext(AI0);
    return [A, B]
}

function QI0() {
    let {
        setPreviewTheme: A,
        savePreview: B
    } = n_.useContext(AI0);
    return {
        setPreviewTheme: A,
        savePreview: B
    }
}

function T({
    color: A,
    backgroundColor: B,
    dimColor: Q = !1,
    bold: Z = !1,
    italic: D = !1,
    underline: G = !1,
    strikethrough: F = !1,
    inverse: I = !1,
    wrap: Y = "wrap",
    children: W
}) {
    let [J] = fB();
    if (W === void 0 || W === null) return null;
    return mR2.default.createElement("ink-text", {
        style: {
            flexGrow: 0,
            flexShrink: 1,
            flexDirection: "row",
            textWrap: Y
        },
        internal_transform: (V) => {
            if (Q) V = e1.dim(V);
            if (A) V = pB(A, J)(V);
            if (B) V = pB(B, J, "background")(V);
            if (Z) V = e1.bold(V);
            if (D) V = e1.italic(V);
            if (G) V = e1.underline(V);
            if (F) V = e1.strikethrough(V);
            if (I) V = e1.inverse(V);
            return V
        }
    }, W)
}
var dR2 = (A) => {
        return A?.replace(`file://${lR2()}/`, "")
    },
    cR2 = new ZI0.default({
        cwd: lR2(),
        internals: ZI0.default.nodeInternals()
    });

function DI0({
    error: A
}) {
    let B = A.stack ? A.stack.split(`
`).slice(1) : void 0,
        Q = B ? cR2.parseLine(B[0]) : void 0,
        Z = dR2(Q?.file),
        D, G = 0;
    if (Z && Q?.line && iO1.existsSync(Z)) {
        let F = iO1.readFileSync(Z, "utf8");
        if (D = uR2(F, Q.line), D)
            for (let {
                    line: I
                }
                of D) G = Math.max(G, String(I).length)
    }
    return AF.default.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, AF.default.createElement(v, null, AF.default.createElement(T, {
        backgroundColor: "error",
        color: "text"
    }, " ", "ERROR", " "), AF.default.createElement(T, null, " ", A.message)), Q && Z && AF.default.createElement(v, {
        marginTop: 1
    }, AF.default.createElement(T, {
        dimColor: !0
    }, Z, ":", Q.line, ":", Q.column)), Q && D && AF.default.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, D.map(({
        line: F,
        value: I
    }) => AF.default.createElement(v, {
        key: F
    }, AF.default.createElement(v, {
        width: G + 1
    }, AF.default.createElement(T, {
        dimColor: F !== Q.line,
        backgroundColor: F === Q.line ? "error" : void 0,
        color: F === Q.line ? "text" : void 0
    }, String(F).padStart(G, " "), ":")), AF.default.createElement(T, {
        key: F,
        backgroundColor: F === Q.line ? "error" : void 0,
        color: F === Q.line ? "text" : void 0
    }, " " + I)))), A.stack && AF.default.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, A.stack.split(`
`).slice(1).map((F) => {
        let I = cR2.parseLine(F);
        if (!I) return AF.default.createElement(v, {
            key: F
        }, AF.default.createElement(T, {
            dimColor: !0
        }, "- "), AF.default.createElement(T, {
            dimColor: !0,
            bold: !0
        }, F));
        return AF.default.createElement(v, {
            key: F
        }, AF.default.createElement(T, {
            dimColor: !0
        }, "- "), AF.default.createElement(T, {
            dimColor: !0,
            bold: !0
        }, I.function), AF.default.createElement(T, {
            dimColor: !0,
            color: "secondaryText"
        }, " ", "(", dR2(I.file) ?? "", ":", I.line, ":", I.column, ")"))
    })))
}
import {
    Buffer as Nr4
} from "node:buffer";
var Lr4 = /^(?:\x1b)([a-zA-Z0-9])$/,
    Mr4 = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/,
    Rr4 = "\x1B[200~",
    nO1 = "\x1B[201~";

function Or4(A) {
    return {
        name: "",
        fn: !1,
        ctrl: !1,
        meta: !1,
        shift: !1,
        option: !1,
        sequence: A,
        raw: A,
        isPasted: !0
    }
}
var Tr4 = new RegExp("^(.*?)(" + ["\\x1b\\][0-9]*(?:;[^\\x07\\x1b]*)*(?:\\x07|\\x1b\\\\)", "\\x1bP[^\\x1b]*\\x1b\\\\", "\\x1b\\[[0-9]*(?:;[0-9]*)*[A-Za-z~]", "\\x1bO[A-Za-z]", "\\x1b[\\x00-\\x7F]", "\\x1b\\x1b", "$"].map((A) => `(?:${A})`).join("|") + ")", "s"),
    Pr4 = new RegExp("(.*?)(" + ["\\x1b\\][0-9]*(?:;[^\\x07\\x1b]*)*$", "\\x1bP[^\\x1b]*$", "\\x1b\\[[0-9]*(?:;[0-9]*)*$", "\\x1bO$", "\\x1b$", "$"].map((A) => `(?:${A})`).join("|") + ")", "s"),
    iR2 = {
        mode: "NORMAL",
        incomplete: ""
    };

function Sr4(A) {
    if (Nr4.isBuffer(A))
        if (A[0] > 127 && A[1] === void 0) return A[0] -= 128, "\x1B" + String(A);
        else return String(A);
    else if (A !== void 0 && typeof A !== "string") return String(A);
    else if (!A) return "";
    else return A
}

function nR2(A, B = "") {
    let Q = B === null,
        Z = Q ? "" : Sr4(B);
    if (A.mode === "IN_PASTE") {
        if ((A.incomplete.slice(-nO1.length + 1) + Z).indexOf(nO1) === -1) return [
            [], {
                ...A,
                incomplete: A.incomplete + Z
            }
        ]
    }
    let D = A.incomplete + Z,
        G = {
            ...A,
            incomplete: ""
        },
        F = [],
        I = {
            NORMAL: () => {
                let Y = Tr4.exec(D);
                D = D.substring(Y[0].length);
                let W = Y[1];
                if (!Y[2] && !Q) {
                    let J = Pr4.exec(W);
                    G.incomplete = J[2], W = J[1]
                }
                if (W) F.push(pR2(W));
                if (Y[2] === Rr4) G.mode = "IN_PASTE";
                else if (Y[2]) F.push(pR2(Y[2]))
            },
            IN_PASTE: () => {
                let Y = D.indexOf(nO1);
                if (Y === -1) {
                    if (!Q) {
                        G.incomplete = D, D = "";
                        return
                    }
                    Y = D.length
                }
                let W = D.substring(0, Y);
                if (W) F.push(Or4(W));
                D = D.substring(Y + nO1.length), G.mode = "NORMAL"
            }
        };
    while (D) I[G.mode]();
    return [F, G]
}