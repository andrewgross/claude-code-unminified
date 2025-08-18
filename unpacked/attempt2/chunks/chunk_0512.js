/* chunk:512 bytes:[12150194, 12169501) size:19307 source:unpacked-cli.js */
(function(A) {
    A.DEFAULT = {
        allowTrailingComma: !1
    }
})(S61 || (S61 = {}));

function otA(A, B = [], Q = S61.DEFAULT) {
    let Z = null,
        D = [],
        G = [];

    function F(Y) {
        if (Array.isArray(D)) D.push(Y);
        else if (Z !== null) D[Z] = Y
    }
    return oQ0(A, {
        onObjectBegin: () => {
            let Y = {};
            F(Y), G.push(D), D = Y, Z = null
        },
        onObjectProperty: (Y) => {
            Z = Y
        },
        onObjectEnd: () => {
            D = G.pop()
        },
        onArrayBegin: () => {
            let Y = [];
            F(Y), G.push(D), D = Y, Z = null
        },
        onArrayEnd: () => {
            D = G.pop()
        },
        onLiteralValue: F,
        onError: (Y, W, J) => {
            B.push({
                error: Y,
                offset: W,
                length: J
            })
        }
    }, Q), D[0]
}

function rQ0(A, B = [], Q = S61.DEFAULT) {
    let Z = {
        type: "array",
        offset: -1,
        length: -1,
        children: [],
        parent: void 0
    };

    function D(Y) {
        if (Z.type === "property") Z.length = Y - Z.offset, Z = Z.parent
    }

    function G(Y) {
        return Z.children.push(Y), Y
    }
    oQ0(A, {
        onObjectBegin: (Y) => {
            Z = G({
                type: "object",
                offset: Y,
                length: -1,
                parent: Z,
                children: []
            })
        },
        onObjectProperty: (Y, W, J) => {
            Z = G({
                type: "property",
                offset: W,
                length: -1,
                parent: Z,
                children: []
            }), Z.children.push({
                type: "string",
                value: Y,
                offset: W,
                length: J,
                parent: Z
            })
        },
        onObjectEnd: (Y, W) => {
            D(Y + W), Z.length = Y + W - Z.offset, Z = Z.parent, D(Y + W)
        },
        onArrayBegin: (Y, W) => {
            Z = G({
                type: "array",
                offset: Y,
                length: -1,
                parent: Z,
                children: []
            })
        },
        onArrayEnd: (Y, W) => {
            Z.length = Y + W - Z.offset, Z = Z.parent, D(Y + W)
        },
        onLiteralValue: (Y, W, J) => {
            G({
                type: RZ4(Y),
                offset: W,
                length: J,
                parent: Z,
                value: Y
            }), D(W + J)
        },
        onSeparator: (Y, W, J) => {
            if (Z.type === "property") {
                if (Y === ":") Z.colonOffset = W;
                else if (Y === ",") D(W)
            }
        },
        onError: (Y, W, J) => {
            B.push({
                error: Y,
                offset: W,
                length: J
            })
        }
    }, Q);
    let I = Z.children[0];
    if (I) delete I.parent;
    return I
}

function Aq1(A, B) {
    if (!A) return;
    let Q = A;
    for (let Z of B)
        if (typeof Z === "string") {
            if (Q.type !== "object" || !Array.isArray(Q.children)) return;
            let D = !1;
            for (let G of Q.children)
                if (Array.isArray(G.children) && G.children[0].value === Z && G.children.length === 2) {
                    Q = G.children[1], D = !0;
                    break
                } if (!D) return
        } else {
            let D = Z;
            if (Q.type !== "array" || D < 0 || !Array.isArray(Q.children) || D >= Q.children.length) return;
            Q = Q.children[D]
        } return Q
}

function oQ0(A, B, Q = S61.DEFAULT) {
    let Z = T61(A, !1),
        D = [];

    function G(a) {
        return a ? () => a(Z.getTokenOffset(), Z.getTokenLength(), Z.getTokenStartLine(), Z.getTokenStartCharacter()) : () => !0
    }

    function F(a) {
        return a ? () => a(Z.getTokenOffset(), Z.getTokenLength(), Z.getTokenStartLine(), Z.getTokenStartCharacter(), () => D.slice()) : () => !0
    }

    function I(a) {
        return a ? (l) => a(l, Z.getTokenOffset(), Z.getTokenLength(), Z.getTokenStartLine(), Z.getTokenStartCharacter()) : () => !0
    }

    function Y(a) {
        return a ? (l) => a(l, Z.getTokenOffset(), Z.getTokenLength(), Z.getTokenStartLine(), Z.getTokenStartCharacter(), () => D.slice()) : () => !0
    }
    let W = F(B.onObjectBegin),
        J = Y(B.onObjectProperty),
        X = G(B.onObjectEnd),
        V = F(B.onArrayBegin),
        C = G(B.onArrayEnd),
        K = Y(B.onLiteralValue),
        H = I(B.onSeparator),
        z = G(B.onComment),
        $ = I(B.onError),
        L = Q && Q.disallowComments,
        N = Q && Q.allowTrailingComma;

    function R() {
        while (!0) {
            let a = Z.scan();
            switch (Z.getTokenError()) {
                case 4:
                    O(14);
                    break;
                case 5:
                    O(15);
                    break;
                case 3:
                    O(13);
                    break;
                case 1:
                    if (!L) O(11);
                    break;
                case 2:
                    O(12);
                    break;
                case 6:
                    O(16);
                    break
            }
            switch (a) {
                case 12:
                case 13:
                    if (L) O(10);
                    else z();
                    break;
                case 16:
                    O(1);
                    break;
                case 15:
                case 14:
                    break;
                default:
                    return a
            }
        }
    }

    function O(a, l = [], y = []) {
        if ($(a), l.length + y.length > 0) {
            let t = Z.getToken();
            while (t !== 17) {
                if (l.indexOf(t) !== -1) {
                    R();
                    break
                } else if (y.indexOf(t) !== -1) break;
                t = R()
            }
        }
    }

    function P(a) {
        let l = Z.getTokenValue();
        if (a) K(l);
        else J(l), D.push(l);
        return R(), !0
    }

    function j() {
        switch (Z.getToken()) {
            case 11:
                let a = Z.getTokenValue(),
                    l = Number(a);
                if (isNaN(l)) O(2), l = 0;
                K(l);
                break;
            case 7:
                K(null);
                break;
            case 8:
                K(!0);
                break;
            case 9:
                K(!1);
                break;
            default:
                return !1
        }
        return R(), !0
    }

    function f() {
        if (Z.getToken() !== 10) return O(3, [], [2, 5]), !1;
        if (P(!1), Z.getToken() === 6) {
            if (H(":"), R(), !u()) O(4, [], [2, 5])
        } else O(5, [], [2, 5]);
        return D.pop(), !0
    }

    function k() {
        W(), R();
        let a = !1;
        while (Z.getToken() !== 2 && Z.getToken() !== 17) {
            if (Z.getToken() === 5) {
                if (!a) O(4, [], []);
                if (H(","), R(), Z.getToken() === 2 && N) break
            } else if (a) O(6, [], []);
            if (!f()) O(4, [], [2, 5]);
            a = !0
        }
        if (X(), Z.getToken() !== 2) O(7, [2], []);
        else R();
        return !0
    }

    function c() {
        V(), R();
        let a = !0,
            l = !1;
        while (Z.getToken() !== 4 && Z.getToken() !== 17) {
            if (Z.getToken() === 5) {
                if (!l) O(4, [], []);
                if (H(","), R(), Z.getToken() === 4 && N) break
            } else if (l) O(6, [], []);
            if (a) D.push(0), a = !1;
            else D[D.length - 1]++;
            if (!u()) O(4, [], [4, 5]);
            l = !0
        }
        if (C(), !a) D.pop();
        if (Z.getToken() !== 4) O(8, [4], []);
        else R();
        return !0
    }

    function u() {
        switch (Z.getToken()) {
            case 3:
                return c();
            case 1:
                return k();
            case 10:
                return P(!0);
            default:
                return j()
        }
    }
    if (R(), Z.getToken() === 17) {
        if (Q.allowEmptyContent) return !0;
        return O(4, [], []), !1
    }
    if (!u()) return O(4, [], []), !1;
    if (Z.getToken() !== 17) O(9, [], []);
    return !0
}

function RZ4(A) {
    switch (typeof A) {
        case "boolean":
            return "boolean";
        case "number":
            return "number";
        case "string":
            return "string";
        case "object": {
            if (!A) return "null";
            else if (Array.isArray(A)) return "array";
            return "object"
        }
        default:
            return "null"
    }
}

function ttA(A, B, Q, Z) {
    let D = B.slice(),
        F = rQ0(A, []),
        I = void 0,
        Y = void 0;
    while (D.length > 0)
        if (Y = D.pop(), I = Aq1(F, D), I === void 0 && Q !== void 0)
            if (typeof Y === "string") Q = {
                [Y]: Q
            };
            else Q = [Q];
    else break;
    if (!I) {
        if (Q === void 0) throw new Error("Can not delete in empty document");
        return Mg(A, {
            offset: F ? F.offset : 0,
            length: F ? F.length : 0,
            content: JSON.stringify(Q)
        }, Z)
    } else if (I.type === "object" && typeof Y === "string" && Array.isArray(I.children)) {
        let W = Aq1(I, [Y]);
        if (W !== void 0)
            if (Q === void 0) {
                if (!W.parent) throw new Error("Malformed AST");
                let J = I.children.indexOf(W.parent),
                    X, V = W.parent.offset + W.parent.length;
                if (J > 0) {
                    let C = I.children[J - 1];
                    X = C.offset + C.length
                } else if (X = I.offset + 1, I.children.length > 1) V = I.children[1].offset;
                return Mg(A, {
                    offset: X,
                    length: V - X,
                    content: ""
                }, Z)
            } else return Mg(A, {
                offset: W.offset,
                length: W.length,
                content: JSON.stringify(Q)
            }, Z);
        else {
            if (Q === void 0) return [];
            let J = `${JSON.stringify(Y)}: ${JSON.stringify(Q)}`,
                X = Z.getInsertionIndex ? Z.getInsertionIndex(I.children.map((C) => C.children[0].value)) : I.children.length,
                V;
            if (X > 0) {
                let C = I.children[X - 1];
                V = {
                    offset: C.offset + C.length,
                    length: 0,
                    content: "," + J
                }
            } else if (I.children.length === 0) V = {
                offset: I.offset + 1,
                length: 0,
                content: J
            };
            else V = {
                offset: I.offset + 1,
                length: 0,
                content: J + ","
            };
            return Mg(A, V, Z)
        }
    } else if (I.type === "array" && typeof Y === "number" && Array.isArray(I.children)) {
        let W = Y;
        if (W === -1) {
            let J = `${JSON.stringify(Q)}`,
                X;
            if (I.children.length === 0) X = {
                offset: I.offset + 1,
                length: 0,
                content: J
            };
            else {
                let V = I.children[I.children.length - 1];
                X = {
                    offset: V.offset + V.length,
                    length: 0,
                    content: "," + J
                }
            }
            return Mg(A, X, Z)
        } else if (Q === void 0 && I.children.length >= 0) {
            let J = Y,
                X = I.children[J],
                V;
            if (I.children.length === 1) V = {
                offset: I.offset + 1,
                length: I.length - 2,
                content: ""
            };
            else if (I.children.length - 1 === J) {
                let C = I.children[J - 1],
                    K = C.offset + C.length,
                    H = I.offset + I.length;
                V = {
                    offset: K,
                    length: H - 2 - K,
                    content: ""
                }
            } else V = {
                offset: X.offset,
                length: I.children[J + 1].offset - X.offset,
                content: ""
            };
            return Mg(A, V, Z)
        } else if (Q !== void 0) {
            let J, X = `${JSON.stringify(Q)}`;
            if (!Z.isArrayInsertion && I.children.length > Y) {
                let V = I.children[Y];
                J = {
                    offset: V.offset,
                    length: V.length,
                    content: X
                }
            } else if (I.children.length === 0 || Y === 0) J = {
                offset: I.offset + 1,
                length: 0,
                content: I.children.length === 0 ? X : X + ","
            };
            else {
                let V = Y > I.children.length ? I.children.length : Y,
                    C = I.children[V - 1];
                J = {
                    offset: C.offset + C.length,
                    length: 0,
                    content: "," + X
                }
            }
            return Mg(A, J, Z)
        } else throw new Error(`Can not ${Q===void 0?"remove":Z.isArrayInsertion?"insert":"modify"} Array index ${W} as length is not sufficient`)
    } else throw new Error(`Can not add ${typeof Y!=="number"?"index":"property"} to parent of type ${I.type}`)
}

function Mg(A, B, Q) {
    if (!Q.formattingOptions) return [B];
    let Z = Bq1(A, B),
        D = B.offset,
        G = B.offset + B.content.length;
    if (B.length === 0 || B.content.length === 0) {
        while (D > 0 && !P61(Z, D - 1)) D--;
        while (G < Z.length && !P61(Z, G)) G++
    }
    let F = sQ0(Z, {
        offset: D,
        length: G - D
    }, {
        ...Q.formattingOptions,
        keepLines: !1
    });
    for (let Y = F.length - 1; Y >= 0; Y--) {
        let W = F[Y];
        Z = Bq1(Z, W), D = Math.min(D, W.offset), G = Math.max(G, W.offset + W.length), G += W.content.length - W.length
    }
    let I = A.length - (Z.length - G) - D;
    return [{
        offset: D,
        length: I,
        content: Z.substring(D, G)
    }]
}

function Bq1(A, B) {
    return A.substring(0, B.offset) + B.content + A.substring(B.offset + B.length)
}
var etA;
(function(A) {
    A[A.None = 0] = "None", A[A.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", A[A.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", A[A.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", A[A.InvalidUnicode = 4] = "InvalidUnicode", A[A.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter", A[A.InvalidCharacter = 6] = "InvalidCharacter"
})(etA || (etA = {}));
var AeA;
(function(A) {
    A[A.OpenBraceToken = 1] = "OpenBraceToken", A[A.CloseBraceToken = 2] = "CloseBraceToken", A[A.OpenBracketToken = 3] = "OpenBracketToken", A[A.CloseBracketToken = 4] = "CloseBracketToken", A[A.CommaToken = 5] = "CommaToken", A[A.ColonToken = 6] = "ColonToken", A[A.NullKeyword = 7] = "NullKeyword", A[A.TrueKeyword = 8] = "TrueKeyword", A[A.FalseKeyword = 9] = "FalseKeyword", A[A.StringLiteral = 10] = "StringLiteral", A[A.NumericLiteral = 11] = "NumericLiteral", A[A.LineCommentTrivia = 12] = "LineCommentTrivia", A[A.BlockCommentTrivia = 13] = "BlockCommentTrivia", A[A.LineBreakTrivia = 14] = "LineBreakTrivia", A[A.Trivia = 15] = "Trivia", A[A.Unknown = 16] = "Unknown", A[A.EOF = 17] = "EOF"
})(AeA || (AeA = {}));
var tQ0 = otA;
var BeA;
(function(A) {
    A[A.InvalidSymbol = 1] = "InvalidSymbol", A[A.InvalidNumberFormat = 2] = "InvalidNumberFormat", A[A.PropertyNameExpected = 3] = "PropertyNameExpected", A[A.ValueExpected = 4] = "ValueExpected", A[A.ColonExpected = 5] = "ColonExpected", A[A.CommaExpected = 6] = "CommaExpected", A[A.CloseBraceExpected = 7] = "CloseBraceExpected", A[A.CloseBracketExpected = 8] = "CloseBracketExpected", A[A.EndOfFileExpected = 9] = "EndOfFileExpected", A[A.InvalidCommentToken = 10] = "InvalidCommentToken", A[A.UnexpectedEndOfComment = 11] = "UnexpectedEndOfComment", A[A.UnexpectedEndOfString = 12] = "UnexpectedEndOfString", A[A.UnexpectedEndOfNumber = 13] = "UnexpectedEndOfNumber", A[A.InvalidUnicode = 14] = "InvalidUnicode", A[A.InvalidEscapeCharacter = 15] = "InvalidEscapeCharacter", A[A.InvalidCharacter = 16] = "InvalidCharacter"
})(BeA || (BeA = {}));

function QeA(A, B, Q, Z) {
    return ttA(A, B, Q, Z)
}

function ZeA(A, B) {
    let Q = B.slice(0).sort((D, G) => {
            let F = D.offset - G.offset;
            if (F === 0) return D.length - G.length;
            return F
        }),
        Z = A.length;
    for (let D = Q.length - 1; D >= 0; D--) {
        let G = Q[D];
        if (G.offset + G.length <= Z) A = Bq1(A, G);
        else throw new Error("Overlapping edit");
        Z = G.offset
    }
    return A
}
var T7 = EA((A, B = !0) => {
    if (!A) return null;
    try {
        return JSON.parse(A)
    } catch (Q) {
        if (B) R1(Q);
        return null
    }
});

function DeA(A) {
    if (!A) return null;
    try {
        return tQ0(A)
    } catch (B) {
        return R1(B), null
    }
}
async function eQ0(A) {
    try {
        let B = await PZ4(A, "utf8");
        if (!B.trim()) return [];
        return B.split(`
`).filter((Q) => Q.trim()).map((Q) => {
            try {
                return JSON.parse(Q)
            } catch (Z) {
                return R1(new Error(`Error parsing line in ${A}: ${Z}`)), null
            }
        }).filter((Q) => Q !== null)
    } catch (B) {
        return R1(new Error(`Error opening file ${A}: ${B}`)), []
    }
}

function GeA(A, B) {
    try {
        if (!A || A.trim() === "") return JSON.stringify([B], null, 4);
        let Q = tQ0(A);
        if (Array.isArray(Q)) {
            let Z = Q.length,
                F = QeA(A, Z === 0 ? [0] : [Z], B, {
                    formattingOptions: {
                        insertSpaces: !0,
                        tabSize: 4
                    },
                    isArrayInsertion: !0
                });
            if (!F || F.length === 0) {
                let I = [...Q, B];
                return JSON.stringify(I, null, 4)
            }
            return ZeA(A, F)
        } else return JSON.stringify([B], null, 4)
    } catch (Q) {
        return R1(Q), JSON.stringify([B], null, 4)
    }
}
var SZ4 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function VK(A) {
    if (typeof A !== "string") return null;
    return SZ4.test(A) ? A : null
}
var XL = EA(async () => {
        let {
            code: A
        } = await F2("git", ["rev-parse", "--is-inside-work-tree"]);
        return A === 0
    }),
    FeA = async (A) => {
        let {
            code: B
        } = await s5("git", ["rev-parse", "--is-inside-work-tree"], {
            preserveOutputOnError: !1,
            cwd: A
        });
        return B === 0
    };