/* chunk:576 bytes:[13385751, 13405367) size:19616 source:unpacked-cli.js */
g$.prototype = {
    diff: function A(B, Q) {
        var Z, D = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
            G = D.callback;
        if (typeof D === "function") G = D, D = {};
        var F = this;

        function I(R) {
            if (R = F.postProcess(R, D), G) return setTimeout(function() {
                G(R)
            }, 0), !0;
            else return R
        }
        B = this.castInput(B, D), Q = this.castInput(Q, D), B = this.removeEmpty(this.tokenize(B, D)), Q = this.removeEmpty(this.tokenize(Q, D));
        var Y = Q.length,
            W = B.length,
            J = 1,
            X = Y + W;
        if (D.maxEditLength != null) X = Math.min(X, D.maxEditLength);
        var V = (Z = D.timeout) !== null && Z !== void 0 ? Z : 1 / 0,
            C = Date.now() + V,
            K = [{
                oldPos: -1,
                lastComponent: void 0
            }],
            H = this.extractCommon(K[0], Q, B, 0, D);
        if (K[0].oldPos + 1 >= W && H + 1 >= Y) return I(zPB(F, K[0].lastComponent, Q, B, F.useLongestToken));
        var z = -1 / 0,
            $ = 1 / 0;

        function L() {
            for (var R = Math.max(z, -J); R <= Math.min($, J); R += 2) {
                var O = void 0,
                    P = K[R - 1],
                    j = K[R + 1];
                if (P) K[R - 1] = void 0;
                var f = !1;
                if (j) {
                    var k = j.oldPos - R;
                    f = j && 0 <= k && k < Y
                }
                var c = P && P.oldPos + 1 < W;
                if (!f && !c) {
                    K[R] = void 0;
                    continue
                }
                if (!c || f && P.oldPos < j.oldPos) O = F.addToPath(j, !0, !1, 0, D);
                else O = F.addToPath(P, !1, !0, 1, D);
                if (H = F.extractCommon(O, Q, B, R, D), O.oldPos + 1 >= W && H + 1 >= Y) return I(zPB(F, O.lastComponent, Q, B, F.useLongestToken));
                else {
                    if (K[R] = O, O.oldPos + 1 >= W) $ = Math.min($, R - 1);
                    if (H + 1 >= Y) z = Math.max(z, R + 1)
                }
            }
            J++
        }
        if (G)(function R() {
            setTimeout(function() {
                if (J > X || Date.now() > C) return G();
                if (!L()) R()
            }, 0)
        })();
        else
            while (J <= X && Date.now() <= C) {
                var N = L();
                if (N) return N
            }
    },
    addToPath: function A(B, Q, Z, D, G) {
        var F = B.lastComponent;
        if (F && !G.oneChangePerToken && F.added === Q && F.removed === Z) return {
            oldPos: B.oldPos + D,
            lastComponent: {
                count: F.count + 1,
                added: Q,
                removed: Z,
                previousComponent: F.previousComponent
            }
        };
        else return {
            oldPos: B.oldPos + D,
            lastComponent: {
                count: 1,
                added: Q,
                removed: Z,
                previousComponent: F
            }
        }
    },
    extractCommon: function A(B, Q, Z, D, G) {
        var F = Q.length,
            I = Z.length,
            Y = B.oldPos,
            W = Y - D,
            J = 0;
        while (W + 1 < F && Y + 1 < I && this.equals(Z[Y + 1], Q[W + 1], G))
            if (W++, Y++, J++, G.oneChangePerToken) B.lastComponent = {
                count: 1,
                previousComponent: B.lastComponent,
                added: !1,
                removed: !1
            };
        if (J && !G.oneChangePerToken) B.lastComponent = {
            count: J,
            previousComponent: B.lastComponent,
            added: !1,
            removed: !1
        };
        return B.oldPos = Y, W
    },
    equals: function A(B, Q, Z) {
        if (Z.comparator) return Z.comparator(B, Q);
        else return B === Q || Z.ignoreCase && B.toLowerCase() === Q.toLowerCase()
    },
    removeEmpty: function A(B) {
        var Q = [];
        for (var Z = 0; Z < B.length; Z++)
            if (B[Z]) Q.push(B[Z]);
        return Q
    },
    castInput: function A(B) {
        return B
    },
    tokenize: function A(B) {
        return Array.from(B)
    },
    join: function A(B) {
        return B.join("")
    },
    postProcess: function A(B) {
        return B
    }
};

function zPB(A, B, Q, Z, D) {
    var G = [],
        F;
    while (B) G.push(B), F = B.previousComponent, delete B.previousComponent, B = F;
    G.reverse();
    var I = 0,
        Y = G.length,
        W = 0,
        J = 0;
    for (; I < Y; I++) {
        var X = G[I];
        if (!X.removed) {
            if (!X.added && D) {
                var V = Q.slice(W, W + X.count);
                V = V.map(function(C, K) {
                    var H = Z[J + K];
                    return H.length > C.length ? H : C
                }), X.value = A.join(V)
            } else X.value = A.join(Q.slice(W, W + X.count));
            if (W += X.count, !X.added) J += X.count
        } else X.value = A.join(Z.slice(J, J + X.count)), J += X.count
    }
    return G
}
var AW3 = new g$;

function EPB(A, B) {
    var Q;
    for (Q = 0; Q < A.length && Q < B.length; Q++)
        if (A[Q] != B[Q]) return A.slice(0, Q);
    return A.slice(0, Q)
}

function UPB(A, B) {
    var Q;
    if (!A || !B || A[A.length - 1] != B[B.length - 1]) return "";
    for (Q = 0; Q < A.length && Q < B.length; Q++)
        if (A[A.length - (Q + 1)] != B[B.length - (Q + 1)]) return A.slice(-Q);
    return A.slice(-Q)
}

function RN0(A, B, Q) {
    if (A.slice(0, B.length) != B) throw Error("string ".concat(JSON.stringify(A), " doesn't start with prefix ").concat(JSON.stringify(B), "; this is a bug"));
    return Q + A.slice(B.length)
}

function ON0(A, B, Q) {
    if (!B) return A + Q;
    if (A.slice(-B.length) != B) throw Error("string ".concat(JSON.stringify(A), " doesn't end with suffix ").concat(JSON.stringify(B), "; this is a bug"));
    return A.slice(0, -B.length) + Q
}

function uG1(A, B) {
    return RN0(A, B, "")
}

function Jb1(A, B) {
    return ON0(A, B, "")
}

function wPB(A, B) {
    return B.slice(0, IF8(A, B))
}

function IF8(A, B) {
    var Q = 0;
    if (A.length > B.length) Q = A.length - B.length;
    var Z = B.length;
    if (A.length < B.length) Z = A.length;
    var D = Array(Z),
        G = 0;
    D[0] = 0;
    for (var F = 1; F < Z; F++) {
        if (B[F] == B[G]) D[F] = D[G];
        else D[F] = G;
        while (G > 0 && B[F] != B[G]) G = D[G];
        if (B[F] == B[G]) G++
    }
    G = 0;
    for (var I = Q; I < A.length; I++) {
        while (G > 0 && A[I] != B[G]) G = D[G];
        if (A[I] == B[G]) G++
    }
    return G
}
var Xb1 = "a-zA-Z0-9_\\u{C0}-\\u{FF}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}",
    YF8 = new RegExp("[".concat(Xb1, "]+|\\s+|[^").concat(Xb1, "]"), "ug"),
    Vb1 = new g$;
Vb1.equals = function(A, B, Q) {
    if (Q.ignoreCase) A = A.toLowerCase(), B = B.toLowerCase();
    return A.trim() === B.trim()
};
Vb1.tokenize = function(A) {
    var B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        Q;
    if (B.intlSegmenter) {
        if (B.intlSegmenter.resolvedOptions().granularity != "word") throw new Error('The segmenter passed must have a granularity of "word"');
        Q = Array.from(B.intlSegmenter.segment(A), function(G) {
            return G.segment
        })
    } else Q = A.match(YF8) || [];
    var Z = [],
        D = null;
    return Q.forEach(function(G) {
        if (/\s/.test(G))
            if (D == null) Z.push(G);
            else Z.push(Z.pop() + G);
        else if (/\s/.test(D))
            if (Z[Z.length - 1] == D) Z.push(Z.pop() + G);
            else Z.push(D + G);
        else Z.push(G);
        D = G
    }), Z
};
Vb1.join = function(A) {
    return A.map(function(B, Q) {
        if (Q == 0) return B;
        else return B.replace(/^\s+/, "")
    }).join("")
};
Vb1.postProcess = function(A, B) {
    if (!A || B.oneChangePerToken) return A;
    var Q = null,
        Z = null,
        D = null;
    if (A.forEach(function(G) {
            if (G.added) Z = G;
            else if (G.removed) D = G;
            else {
                if (Z || D) $PB(Q, D, Z, G);
                Q = G, Z = null, D = null
            }
        }), Z || D) $PB(Q, D, Z, null);
    return A
};

function $PB(A, B, Q, Z) {
    if (B && Q) {
        var D = B.value.match(/^\s*/)[0],
            G = B.value.match(/\s*$/)[0],
            F = Q.value.match(/^\s*/)[0],
            I = Q.value.match(/\s*$/)[0];
        if (A) {
            var Y = EPB(D, F);
            A.value = ON0(A.value, F, Y), B.value = uG1(B.value, Y), Q.value = uG1(Q.value, Y)
        }
        if (Z) {
            var W = UPB(G, I);
            Z.value = RN0(Z.value, I, W), B.value = Jb1(B.value, W), Q.value = Jb1(Q.value, W)
        }
    } else if (Q) {
        if (A) Q.value = Q.value.replace(/^\s*/, "");
        if (Z) Z.value = Z.value.replace(/^\s*/, "")
    } else if (A && Z) {
        var J = Z.value.match(/^\s*/)[0],
            X = B.value.match(/^\s*/)[0],
            V = B.value.match(/\s*$/)[0],
            C = EPB(J, X);
        B.value = uG1(B.value, C);
        var K = UPB(uG1(J, C), V);
        B.value = Jb1(B.value, K), Z.value = RN0(Z.value, J, K), A.value = ON0(A.value, J, J.slice(0, J.length - K.length))
    } else if (Z) {
        var H = Z.value.match(/^\s*/)[0],
            z = B.value.match(/\s*$/)[0],
            $ = wPB(z, H);
        B.value = Jb1(B.value, $)
    } else if (A) {
        var L = A.value.match(/\s*$/)[0],
            N = B.value.match(/^\s*/)[0],
            R = wPB(L, N);
        B.value = uG1(B.value, R)
    }
}
var MPB = new g$;
MPB.tokenize = function(A) {
    var B = new RegExp("(\\r?\\n)|[".concat(Xb1, "]+|[^\\S\\n\\r]+|[^").concat(Xb1, "]"), "ug");
    return A.match(B) || []
};

function RPB(A, B, Q) {
    return MPB.diff(A, B, Q)
}
var Cb1 = new g$;
Cb1.tokenize = function(A, B) {
    if (B.stripTrailingCr) A = A.replace(/\r\n/g, `
`);
    var Q = [],
        Z = A.split(/(\n|\r\n)/);
    if (!Z[Z.length - 1]) Z.pop();
    for (var D = 0; D < Z.length; D++) {
        var G = Z[D];
        if (D % 2 && !B.newlineIsToken) Q[Q.length - 1] += G;
        else Q.push(G)
    }
    return Q
};
Cb1.equals = function(A, B, Q) {
    if (Q.ignoreWhitespace) {
        if (!Q.newlineIsToken || !A.includes(`
`)) A = A.trim();
        if (!Q.newlineIsToken || !B.includes(`
`)) B = B.trim()
    } else if (Q.ignoreNewlineAtEof && !Q.newlineIsToken) {
        if (A.endsWith(`
`)) A = A.slice(0, -1);
        if (B.endsWith(`
`)) B = B.slice(0, -1)
    }
    return g$.prototype.equals.call(this, A, B, Q)
};

function qPB(A, B, Q) {
    return Cb1.diff(A, B, Q)
}
var WF8 = new g$;
WF8.tokenize = function(A) {
    return A.split(/(\S.+?[.!?])(?=\s+|$)/)
};
var JF8 = new g$;
JF8.tokenize = function(A) {
    return A.split(/([{}:;,]|\s+)/)
};

function NPB(A, B) {
    var Q = Object.keys(A);
    if (Object.getOwnPropertySymbols) {
        var Z = Object.getOwnPropertySymbols(A);
        B && (Z = Z.filter(function(D) {
            return Object.getOwnPropertyDescriptor(A, D).enumerable
        })), Q.push.apply(Q, Z)
    }
    return Q
}

function LPB(A) {
    for (var B = 1; B < arguments.length; B++) {
        var Q = arguments[B] != null ? arguments[B] : {};
        B % 2 ? NPB(Object(Q), !0).forEach(function(Z) {
            CF8(A, Z, Q[Z])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(Q)) : NPB(Object(Q)).forEach(function(Z) {
            Object.defineProperty(A, Z, Object.getOwnPropertyDescriptor(Q, Z))
        })
    }
    return A
}

function XF8(A, B) {
    if (typeof A != "object" || !A) return A;
    var Q = A[Symbol.toPrimitive];
    if (Q !== void 0) {
        var Z = Q.call(A, B || "default");
        if (typeof Z != "object") return Z;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (B === "string" ? String : Number)(A)
}

function VF8(A) {
    var B = XF8(A, "string");
    return typeof B == "symbol" ? B : B + ""
}

function TN0(A) {
    return TN0 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(B) {
        return typeof B
    } : function(B) {
        return B && typeof Symbol == "function" && B.constructor === Symbol && B !== Symbol.prototype ? "symbol" : typeof B
    }, TN0(A)
}

function CF8(A, B, Q) {
    if (B = VF8(B), B in A) Object.defineProperty(A, B, {
        value: Q,
        enumerable: !0,
        configurable: !0,
        writable: !0
    });
    else A[B] = Q;
    return A
}

function MN0(A) {
    return KF8(A) || HF8(A) || zF8(A) || EF8()
}

function KF8(A) {
    if (Array.isArray(A)) return PN0(A)
}

function HF8(A) {
    if (typeof Symbol !== "undefined" && A[Symbol.iterator] != null || A["@@iterator"] != null) return Array.from(A)
}

function zF8(A, B) {
    if (!A) return;
    if (typeof A === "string") return PN0(A, B);
    var Q = Object.prototype.toString.call(A).slice(8, -1);
    if (Q === "Object" && A.constructor) Q = A.constructor.name;
    if (Q === "Map" || Q === "Set") return Array.from(A);
    if (Q === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(Q)) return PN0(A, B)
}

function PN0(A, B) {
    if (B == null || B > A.length) B = A.length;
    for (var Q = 0, Z = new Array(B); Q < B; Q++) Z[Q] = A[Q];
    return Z
}

function EF8() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
var mG1 = new g$;
mG1.useLongestToken = !0;
mG1.tokenize = Cb1.tokenize;
mG1.castInput = function(A, B) {
    var {
        undefinedReplacement: Q,
        stringifyReplacer: Z
    } = B, D = Z === void 0 ? function(G, F) {
        return typeof F === "undefined" ? Q : F
    } : Z;
    return typeof A === "string" ? A : JSON.stringify(SN0(A, null, null, D), D, "  ")
};
mG1.equals = function(A, B, Q) {
    return g$.prototype.equals.call(mG1, A.replace(/,([\r\n])/g, "$1"), B.replace(/,([\r\n])/g, "$1"), Q)
};

function SN0(A, B, Q, Z, D) {
    if (B = B || [], Q = Q || [], Z) A = Z(D, A);
    var G;
    for (G = 0; G < B.length; G += 1)
        if (B[G] === A) return Q[G];
    var F;
    if (Object.prototype.toString.call(A) === "[object Array]") {
        B.push(A), F = new Array(A.length), Q.push(F);
        for (G = 0; G < A.length; G += 1) F[G] = SN0(A[G], B, Q, Z, D);
        return B.pop(), Q.pop(), F
    }
    if (A && A.toJSON) A = A.toJSON();
    if (TN0(A) === "object" && A !== null) {
        B.push(A), F = {}, Q.push(F);
        var I = [],
            Y;
        for (Y in A)
            if (Object.prototype.hasOwnProperty.call(A, Y)) I.push(Y);
        I.sort();
        for (G = 0; G < I.length; G += 1) Y = I[G], F[Y] = SN0(A[Y], B, Q, Z, Y);
        B.pop(), Q.pop()
    } else F = A;
    return F
}
var jN0 = new g$;
jN0.tokenize = function(A) {
    return A.slice()
};
jN0.join = jN0.removeEmpty = function(A) {
    return A
};

function dG1(A, B, Q, Z, D, G, F) {
    if (!F) F = {};
    if (typeof F === "function") F = {
        callback: F
    };
    if (typeof F.context === "undefined") F.context = 4;
    if (F.newlineIsToken) throw new Error("newlineIsToken may not be used with patch-generation functions, only with diffing functions");
    if (!F.callback) return W(qPB(Q, Z, F));
    else {
        var I = F,
            Y = I.callback;
        qPB(Q, Z, LPB(LPB({}, F), {}, {
            callback: function J(X) {
                var V = W(X);
                Y(V)
            }
        }))
    }

    function W(J) {
        if (!J) return;
        J.push({
            value: "",
            lines: []
        });

        function X(f) {
            return f.map(function(k) {
                return " " + k
            })
        }
        var V = [],
            C = 0,
            K = 0,
            H = [],
            z = 1,
            $ = 1,
            L = function f() {
                var k = J[N],
                    c = k.lines || UF8(k.value);
                if (k.lines = c, k.added || k.removed) {
                    var u;
                    if (!C) {
                        var a = J[N - 1];
                        if (C = z, K = $, a) H = F.context > 0 ? X(a.lines.slice(-F.context)) : [], C -= H.length, K -= H.length
                    }
                    if ((u = H).push.apply(u, MN0(c.map(function(C1) {
                            return (k.added ? "+" : "-") + C1
                        }))), k.added) $ += c.length;
                    else z += c.length
                } else {
                    if (C)
                        if (c.length <= F.context * 2 && N < J.length - 2) {
                            var l;
                            (l = H).push.apply(l, MN0(X(c)))
                        } else {
                            var y, t = Math.min(c.length, F.context);
                            (y = H).push.apply(y, MN0(X(c.slice(0, t))));
                            var E1 = {
                                oldStart: C,
                                oldLines: z - C + t,
                                newStart: K,
                                newLines: $ - K + t,
                                lines: H
                            };
                            V.push(E1), C = 0, K = 0, H = []
                        } z += c.length, $ += c.length
                }
            };
        for (var N = 0; N < J.length; N++) L();
        for (var R = 0, O = V; R < O.length; R++) {
            var P = O[R];
            for (var j = 0; j < P.lines.length; j++)
                if (P.lines[j].endsWith(`
`)) P.lines[j] = P.lines[j].slice(0, -1);
                else P.lines.splice(j + 1, 0, "\\ No newline at end of file"), j++
        }
        return {
            oldFileName: A,
            newFileName: B,
            oldHeader: D,
            newHeader: G,
            hunks: V
        }
    }
}

function UF8(A) {
    var B = A.endsWith(`
`),
        Q = A.split(`
`).map(function(Z) {
            return Z + `
`
        });
    if (B) Q.pop();
    else Q.push(Q.pop().slice(0, -1));
    return Q
}
var gv = G1(z1(), 1);
var wF8 = 0.4,
    $F8 = 80;

function JC({
    patch: A,
    dim: B,
    skipUnchanged: Q,
    hideLineNumbers: Z,
    width: D
}) {
    let G = gv.useRef(null),
        [F, I] = gv.useState(D || $F8);
    gv.useEffect(() => {
        if (!D && G.current) {
            let {
                width: J
            } = eO1(G.current);
            if (J > 0) I(J - 2)
        }
    }, [D]);
    let [Y] = fB(), W = gv.useMemo(() => RF8(A.lines, A.oldStart, F, B, Q, Z, Y), [A.lines, A.oldStart, F, B, Q, Z, Y]);
    return rB.createElement(v, {
        flexDirection: "column",
        flexGrow: 1,
        ref: G
    }, W.map((J, X) => rB.createElement(v, {
        key: X
    }, J)))
}

function qF8(A) {
    return A.map((B) => {
        if (B.startsWith("+")) return {
            code: " " + B.slice(1),
            i: 0,
            type: "add",
            originalCode: B.slice(1)
        };
        if (B.startsWith("-")) return {
            code: " " + B.slice(1),
            i: 0,
            type: "remove",
            originalCode: B.slice(1)
        };
        return {
            code: B,
            i: 0,
            type: "nochange",
            originalCode: B
        }
    })
}