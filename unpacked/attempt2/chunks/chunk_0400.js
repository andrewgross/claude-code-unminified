/* chunk:400 bytes:[9335380, 9354328) size:18948 source:unpacked-cli.js */
var UJB = E((mQ3, EJB) => {
    var {
        defineProperty: Z_1,
        getOwnPropertyDescriptor: am6,
        getOwnPropertyNames: sm6
    } = Object, rm6 = Object.prototype.hasOwnProperty, cE = (A, B) => Z_1(A, "name", {
        value: B,
        configurable: !0
    }), om6 = (A, B) => {
        for (var Q in B) Z_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, tm6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of sm6(B))
                if (!rm6.call(A, D) && D !== Q) Z_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = am6(B, D)) || Z.enumerable
                })
        }
        return A
    }, em6 = (A) => tm6(Z_1({}, "__esModule", {
        value: !0
    }), A), zJB = {};
    om6(zJB, {
        constructStack: () => YE0
    });
    EJB.exports = em6(zJB);
    var um = cE((A, B) => {
            let Q = [];
            if (A) Q.push(A);
            if (B)
                for (let Z of B) Q.push(Z);
            return Q
        }, "getAllAliases"),
        ex = cE((A, B) => {
            return `${A||"anonymous"}${B&&B.length>0?` (a.k.a. ${B.join(",")})`:""}`
        }, "getMiddlewareNameWithAliases"),
        YE0 = cE(() => {
            let A = [],
                B = [],
                Q = !1,
                Z = new Set,
                D = cE((X) => X.sort((V, C) => KJB[C.step] - KJB[V.step] || HJB[C.priority || "normal"] - HJB[V.priority || "normal"]), "sort"),
                G = cE((X) => {
                    let V = !1,
                        C = cE((K) => {
                            let H = um(K.name, K.aliases);
                            if (H.includes(X)) {
                                V = !0;
                                for (let z of H) Z.delete(z);
                                return !1
                            }
                            return !0
                        }, "filterCb");
                    return A = A.filter(C), B = B.filter(C), V
                }, "removeByName"),
                F = cE((X) => {
                    let V = !1,
                        C = cE((K) => {
                            if (K.middleware === X) {
                                V = !0;
                                for (let H of um(K.name, K.aliases)) Z.delete(H);
                                return !1
                            }
                            return !0
                        }, "filterCb");
                    return A = A.filter(C), B = B.filter(C), V
                }, "removeByReference"),
                I = cE((X) => {
                    var V;
                    return A.forEach((C) => {
                        X.add(C.middleware, {
                            ...C
                        })
                    }), B.forEach((C) => {
                        X.addRelativeTo(C.middleware, {
                            ...C
                        })
                    }), (V = X.identifyOnResolve) == null || V.call(X, J.identifyOnResolve()), X
                }, "cloneTo"),
                Y = cE((X) => {
                    let V = [];
                    return X.before.forEach((C) => {
                        if (C.before.length === 0 && C.after.length === 0) V.push(C);
                        else V.push(...Y(C))
                    }), V.push(X), X.after.reverse().forEach((C) => {
                        if (C.before.length === 0 && C.after.length === 0) V.push(C);
                        else V.push(...Y(C))
                    }), V
                }, "expandRelativeMiddlewareList"),
                W = cE((X = !1) => {
                    let V = [],
                        C = [],
                        K = {};
                    return A.forEach((z) => {
                        let $ = {
                            ...z,
                            before: [],
                            after: []
                        };
                        for (let L of um($.name, $.aliases)) K[L] = $;
                        V.push($)
                    }), B.forEach((z) => {
                        let $ = {
                            ...z,
                            before: [],
                            after: []
                        };
                        for (let L of um($.name, $.aliases)) K[L] = $;
                        C.push($)
                    }), C.forEach((z) => {
                        if (z.toMiddleware) {
                            let $ = K[z.toMiddleware];
                            if ($ === void 0) {
                                if (X) return;
                                throw new Error(`${z.toMiddleware} is not found when adding ${ex(z.name,z.aliases)} middleware ${z.relation} ${z.toMiddleware}`)
                            }
                            if (z.relation === "after") $.after.push(z);
                            if (z.relation === "before") $.before.push(z)
                        }
                    }), D(V).map(Y).reduce((z, $) => {
                        return z.push(...$), z
                    }, [])
                }, "getMiddlewareList"),
                J = {
                    add: (X, V = {}) => {
                        let {
                            name: C,
                            override: K,
                            aliases: H
                        } = V, z = {
                            step: "initialize",
                            priority: "normal",
                            middleware: X,
                            ...V
                        }, $ = um(C, H);
                        if ($.length > 0) {
                            if ($.some((L) => Z.has(L))) {
                                if (!K) throw new Error(`Duplicate middleware name '${ex(C,H)}'`);
                                for (let L of $) {
                                    let N = A.findIndex((O) => {
                                        var P;
                                        return O.name === L || ((P = O.aliases) == null ? void 0 : P.some((j) => j === L))
                                    });
                                    if (N === -1) continue;
                                    let R = A[N];
                                    if (R.step !== z.step || z.priority !== R.priority) throw new Error(`"${ex(R.name,R.aliases)}" middleware with ${R.priority} priority in ${R.step} step cannot be overridden by "${ex(C,H)}" middleware with ${z.priority} priority in ${z.step} step.`);
                                    A.splice(N, 1)
                                }
                            }
                            for (let L of $) Z.add(L)
                        }
                        A.push(z)
                    },
                    addRelativeTo: (X, V) => {
                        let {
                            name: C,
                            override: K,
                            aliases: H
                        } = V, z = {
                            middleware: X,
                            ...V
                        }, $ = um(C, H);
                        if ($.length > 0) {
                            if ($.some((L) => Z.has(L))) {
                                if (!K) throw new Error(`Duplicate middleware name '${ex(C,H)}'`);
                                for (let L of $) {
                                    let N = B.findIndex((O) => {
                                        var P;
                                        return O.name === L || ((P = O.aliases) == null ? void 0 : P.some((j) => j === L))
                                    });
                                    if (N === -1) continue;
                                    let R = B[N];
                                    if (R.toMiddleware !== z.toMiddleware || R.relation !== z.relation) throw new Error(`"${ex(R.name,R.aliases)}" middleware ${R.relation} "${R.toMiddleware}" middleware cannot be overridden by "${ex(C,H)}" middleware ${z.relation} "${z.toMiddleware}" middleware.`);
                                    B.splice(N, 1)
                                }
                            }
                            for (let L of $) Z.add(L)
                        }
                        B.push(z)
                    },
                    clone: () => I(YE0()),
                    use: (X) => {
                        X.applyToStack(J)
                    },
                    remove: (X) => {
                        if (typeof X === "string") return G(X);
                        else return F(X)
                    },
                    removeByTag: (X) => {
                        let V = !1,
                            C = cE((K) => {
                                let {
                                    tags: H,
                                    name: z,
                                    aliases: $
                                } = K;
                                if (H && H.includes(X)) {
                                    let L = um(z, $);
                                    for (let N of L) Z.delete(N);
                                    return V = !0, !1
                                }
                                return !0
                            }, "filterCb");
                        return A = A.filter(C), B = B.filter(C), V
                    },
                    concat: (X) => {
                        var V;
                        let C = I(YE0());
                        return C.use(X), C.identifyOnResolve(Q || C.identifyOnResolve() || (((V = X.identifyOnResolve) == null ? void 0 : V.call(X)) ?? !1)), C
                    },
                    applyToStack: I,
                    identify: () => {
                        return W(!0).map((X) => {
                            let V = X.step ?? X.relation + " " + X.toMiddleware;
                            return ex(X.name, X.aliases) + " - " + V
                        })
                    },
                    identifyOnResolve(X) {
                        if (typeof X === "boolean") Q = X;
                        return Q
                    },
                    resolve: (X, V) => {
                        for (let C of W().map((K) => K.middleware).reverse()) X = C(X, V);
                        if (Q) console.log(J.identify());
                        return X
                    }
                };
            return J
        }, "constructStack"),
        KJB = {
            initialize: 5,
            serialize: 4,
            build: 3,
            finalizeRequest: 2,
            deserialize: 1
        },
        HJB = {
            high: 3,
            normal: 2,
            low: 1
        }
});
var qJB = E((dQ3, $JB) => {
    var {
        defineProperty: D_1,
        getOwnPropertyDescriptor: Ad6,
        getOwnPropertyNames: Bd6
    } = Object, Qd6 = Object.prototype.hasOwnProperty, Zd6 = (A, B) => D_1(A, "name", {
        value: B,
        configurable: !0
    }), Dd6 = (A, B) => {
        for (var Q in B) D_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Gd6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Bd6(B))
                if (!Qd6.call(A, D) && D !== Q) D_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Ad6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Fd6 = (A) => Gd6(D_1({}, "__esModule", {
        value: !0
    }), A), wJB = {};
    Dd6(wJB, {
        isArrayBuffer: () => Id6
    });
    $JB.exports = Fd6(wJB);
    var Id6 = Zd6((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var JE0 = E((cQ3, MJB) => {
    var {
        defineProperty: G_1,
        getOwnPropertyDescriptor: Yd6,
        getOwnPropertyNames: Wd6
    } = Object, Jd6 = Object.prototype.hasOwnProperty, NJB = (A, B) => G_1(A, "name", {
        value: B,
        configurable: !0
    }), Xd6 = (A, B) => {
        for (var Q in B) G_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Vd6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Wd6(B))
                if (!Jd6.call(A, D) && D !== Q) G_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Yd6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Cd6 = (A) => Vd6(G_1({}, "__esModule", {
        value: !0
    }), A), LJB = {};
    Xd6(LJB, {
        fromArrayBuffer: () => Hd6,
        fromString: () => zd6
    });
    MJB.exports = Cd6(LJB);
    var Kd6 = qJB(),
        WE0 = W1("buffer"),
        Hd6 = NJB((A, B = 0, Q = A.byteLength - B) => {
            if (!Kd6.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
            return WE0.Buffer.from(A, B, Q)
        }, "fromArrayBuffer"),
        zd6 = NJB((A, B) => {
            if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
            return B ? WE0.Buffer.from(A, B) : WE0.Buffer.from(A)
        }, "fromString")
});
var SJB = E((lQ3, PJB) => {
    var {
        defineProperty: F_1,
        getOwnPropertyDescriptor: Ed6,
        getOwnPropertyNames: Ud6
    } = Object, wd6 = Object.prototype.hasOwnProperty, XE0 = (A, B) => F_1(A, "name", {
        value: B,
        configurable: !0
    }), $d6 = (A, B) => {
        for (var Q in B) F_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, qd6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ud6(B))
                if (!wd6.call(A, D) && D !== Q) F_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Ed6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Nd6 = (A) => qd6(F_1({}, "__esModule", {
        value: !0
    }), A), RJB = {};
    $d6(RJB, {
        fromUtf8: () => TJB,
        toUint8Array: () => Ld6,
        toUtf8: () => Md6
    });
    PJB.exports = Nd6(RJB);
    var OJB = JE0(),
        TJB = XE0((A) => {
            let B = OJB.fromString(A, "utf8");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
        }, "fromUtf8"),
        Ld6 = XE0((A) => {
            if (typeof A === "string") return TJB(A);
            if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
            return new Uint8Array(A)
        }, "toUint8Array"),
        Md6 = XE0((A) => {
            if (typeof A === "string") return A;
            if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
            return OJB.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
        }, "toUtf8")
});
var yJB = E((jJB) => {
    Object.defineProperty(jJB, "__esModule", {
        value: !0
    });
    jJB.getAwsChunkedEncodingStream = void 0;
    var Rd6 = W1("stream"),
        Od6 = (A, B) => {
            let {
                base64Encoder: Q,
                bodyLengthChecker: Z,
                checksumAlgorithmFn: D,
                checksumLocationName: G,
                streamHasher: F
            } = B, I = Q !== void 0 && D !== void 0 && G !== void 0 && F !== void 0, Y = I ? F(D, A) : void 0, W = new Rd6.Readable({
                read: () => {}
            });
            return A.on("data", (J) => {
                let X = Z(J) || 0;
                W.push(`${X.toString(16)}\r
`), W.push(J), W.push(`\r
`)
            }), A.on("end", async () => {
                if (W.push(`0\r
`), I) {
                    let J = Q(await Y);
                    W.push(`${G}:${J}\r
`), W.push(`\r
`)
                }
                W.push(null)
            }), W
        };
    jJB.getAwsChunkedEncodingStream = Od6
});
var bJB = E((iQ3, vJB) => {
    var {
        defineProperty: I_1,
        getOwnPropertyDescriptor: Td6,
        getOwnPropertyNames: Pd6
    } = Object, Sd6 = Object.prototype.hasOwnProperty, VE0 = (A, B) => I_1(A, "name", {
        value: B,
        configurable: !0
    }), jd6 = (A, B) => {
        for (var Q in B) I_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, kd6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Pd6(B))
                if (!Sd6.call(A, D) && D !== Q) I_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Td6(B, D)) || Z.enumerable
                })
        }
        return A
    }, yd6 = (A) => kd6(I_1({}, "__esModule", {
        value: !0
    }), A), _JB = {};
    jd6(_JB, {
        escapeUri: () => xJB,
        escapeUriPath: () => xd6
    });
    vJB.exports = yd6(_JB);
    var xJB = VE0((A) => encodeURIComponent(A).replace(/[!'()*]/g, _d6), "escapeUri"),
        _d6 = VE0((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        xd6 = VE0((A) => A.split("/").map(xJB).join("/"), "escapeUriPath")
});
var uJB = E((nQ3, gJB) => {
    var {
        defineProperty: Y_1,
        getOwnPropertyDescriptor: vd6,
        getOwnPropertyNames: bd6
    } = Object, fd6 = Object.prototype.hasOwnProperty, hd6 = (A, B) => Y_1(A, "name", {
        value: B,
        configurable: !0
    }), gd6 = (A, B) => {
        for (var Q in B) Y_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, ud6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of bd6(B))
                if (!fd6.call(A, D) && D !== Q) Y_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = vd6(B, D)) || Z.enumerable
                })
        }
        return A
    }, md6 = (A) => ud6(Y_1({}, "__esModule", {
        value: !0
    }), A), fJB = {};
    gd6(fJB, {
        buildQueryString: () => hJB
    });
    gJB.exports = md6(fJB);
    var CE0 = bJB();

    function hJB(A) {
        let B = [];
        for (let Q of Object.keys(A).sort()) {
            let Z = A[Q];
            if (Q = CE0.escapeUri(Q), Array.isArray(Z))
                for (let D = 0, G = Z.length; D < G; D++) B.push(`${Q}=${CE0.escapeUri(Z[D])}`);
            else {
                let D = Q;
                if (Z || typeof Z === "string") D += `=${CE0.escapeUri(Z)}`;
                B.push(D)
            }
        }
        return B.join("&")
    }
    hd6(hJB, "buildQueryString")
});