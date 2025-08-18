/* chunk:62 bytes:[1483694, 1494061) size:10367 source:unpacked-cli.js */
var Vw = E((h15, VQA) => {
    var {
        defineProperty: _K1,
        getOwnPropertyDescriptor: pp9,
        getOwnPropertyNames: ip9
    } = Object, np9 = Object.prototype.hasOwnProperty, Bz = (A, B) => _K1(A, "name", {
        value: B,
        configurable: !0
    }), ap9 = (A, B) => {
        for (var Q in B) _K1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, sp9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ip9(B))
                if (!np9.call(A, D) && D !== Q) _K1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = pp9(B, D)) || Z.enumerable
                })
        }
        return A
    }, rp9 = (A) => sp9(_K1({}, "__esModule", {
        value: !0
    }), A), XQA = {};
    ap9(XQA, {
        constructStack: () => Ra1
    });
    VQA.exports = rp9(XQA);
    var Nh = Bz((A, B) => {
            let Q = [];
            if (A) Q.push(A);
            if (B)
                for (let Z of B) Q.push(Z);
            return Q
        }, "getAllAliases"),
        Lk = Bz((A, B) => {
            return `${A||"anonymous"}${B&&B.length>0?` (a.k.a. ${B.join(",")})`:""}`
        }, "getMiddlewareNameWithAliases"),
        Ra1 = Bz(() => {
            let A = [],
                B = [],
                Q = !1,
                Z = new Set,
                D = Bz((X) => X.sort((V, C) => WQA[C.step] - WQA[V.step] || JQA[C.priority || "normal"] - JQA[V.priority || "normal"]), "sort"),
                G = Bz((X) => {
                    let V = !1,
                        C = Bz((K) => {
                            let H = Nh(K.name, K.aliases);
                            if (H.includes(X)) {
                                V = !0;
                                for (let z of H) Z.delete(z);
                                return !1
                            }
                            return !0
                        }, "filterCb");
                    return A = A.filter(C), B = B.filter(C), V
                }, "removeByName"),
                F = Bz((X) => {
                    let V = !1,
                        C = Bz((K) => {
                            if (K.middleware === X) {
                                V = !0;
                                for (let H of Nh(K.name, K.aliases)) Z.delete(H);
                                return !1
                            }
                            return !0
                        }, "filterCb");
                    return A = A.filter(C), B = B.filter(C), V
                }, "removeByReference"),
                I = Bz((X) => {
                    return A.forEach((V) => {
                        X.add(V.middleware, {
                            ...V
                        })
                    }), B.forEach((V) => {
                        X.addRelativeTo(V.middleware, {
                            ...V
                        })
                    }), X.identifyOnResolve?.(J.identifyOnResolve()), X
                }, "cloneTo"),
                Y = Bz((X) => {
                    let V = [];
                    return X.before.forEach((C) => {
                        if (C.before.length === 0 && C.after.length === 0) V.push(C);
                        else V.push(...Y(C))
                    }), V.push(X), X.after.reverse().forEach((C) => {
                        if (C.before.length === 0 && C.after.length === 0) V.push(C);
                        else V.push(...Y(C))
                    }), V
                }, "expandRelativeMiddlewareList"),
                W = Bz((X = !1) => {
                    let V = [],
                        C = [],
                        K = {};
                    return A.forEach((z) => {
                        let $ = {
                            ...z,
                            before: [],
                            after: []
                        };
                        for (let L of Nh($.name, $.aliases)) K[L] = $;
                        V.push($)
                    }), B.forEach((z) => {
                        let $ = {
                            ...z,
                            before: [],
                            after: []
                        };
                        for (let L of Nh($.name, $.aliases)) K[L] = $;
                        C.push($)
                    }), C.forEach((z) => {
                        if (z.toMiddleware) {
                            let $ = K[z.toMiddleware];
                            if ($ === void 0) {
                                if (X) return;
                                throw new Error(`${z.toMiddleware} is not found when adding ${Lk(z.name,z.aliases)} middleware ${z.relation} ${z.toMiddleware}`)
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
                        }, $ = Nh(C, H);
                        if ($.length > 0) {
                            if ($.some((L) => Z.has(L))) {
                                if (!K) throw new Error(`Duplicate middleware name '${Lk(C,H)}'`);
                                for (let L of $) {
                                    let N = A.findIndex((O) => O.name === L || O.aliases?.some((P) => P === L));
                                    if (N === -1) continue;
                                    let R = A[N];
                                    if (R.step !== z.step || z.priority !== R.priority) throw new Error(`"${Lk(R.name,R.aliases)}" middleware with ${R.priority} priority in ${R.step} step cannot be overridden by "${Lk(C,H)}" middleware with ${z.priority} priority in ${z.step} step.`);
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
                        }, $ = Nh(C, H);
                        if ($.length > 0) {
                            if ($.some((L) => Z.has(L))) {
                                if (!K) throw new Error(`Duplicate middleware name '${Lk(C,H)}'`);
                                for (let L of $) {
                                    let N = B.findIndex((O) => O.name === L || O.aliases?.some((P) => P === L));
                                    if (N === -1) continue;
                                    let R = B[N];
                                    if (R.toMiddleware !== z.toMiddleware || R.relation !== z.relation) throw new Error(`"${Lk(R.name,R.aliases)}" middleware ${R.relation} "${R.toMiddleware}" middleware cannot be overridden by "${Lk(C,H)}" middleware ${z.relation} "${z.toMiddleware}" middleware.`);
                                    B.splice(N, 1)
                                }
                            }
                            for (let L of $) Z.add(L)
                        }
                        B.push(z)
                    },
                    clone: () => I(Ra1()),
                    use: (X) => {
                        X.applyToStack(J)
                    },
                    remove: (X) => {
                        if (typeof X === "string") return G(X);
                        else return F(X)
                    },
                    removeByTag: (X) => {
                        let V = !1,
                            C = Bz((K) => {
                                let {
                                    tags: H,
                                    name: z,
                                    aliases: $
                                } = K;
                                if (H && H.includes(X)) {
                                    let L = Nh(z, $);
                                    for (let N of L) Z.delete(N);
                                    return V = !0, !1
                                }
                                return !0
                            }, "filterCb");
                        return A = A.filter(C), B = B.filter(C), V
                    },
                    concat: (X) => {
                        let V = I(Ra1());
                        return V.use(X), V.identifyOnResolve(Q || V.identifyOnResolve() || (X.identifyOnResolve?.() ?? !1)), V
                    },
                    applyToStack: I,
                    identify: () => {
                        return W(!0).map((X) => {
                            let V = X.step ?? X.relation + " " + X.toMiddleware;
                            return Lk(X.name, X.aliases) + " - " + V
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
        WQA = {
            initialize: 5,
            serialize: 4,
            build: 3,
            finalizeRequest: 2,
            deserialize: 1
        },
        JQA = {
            high: 3,
            normal: 2,
            low: 1
        }
});