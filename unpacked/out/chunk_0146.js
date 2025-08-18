/* chunk:146 bytes:[3256852, 3273807) size:16955 source:unpacked-cli.js */
var RkA = E((t65, MkA) => {
    var {
        kConstruct: _xQ
    } = Dw1(), {
        urlEquals: xxQ,
        getFieldValues: A20
    } = NkA(), {
        kEnumerableProperty: Gg,
        isDisturbed: vxQ
    } = e4(), {
        webidl: g9
    } = NY(), {
        Response: bxQ,
        cloneResponse: fxQ,
        fromInnerResponse: hxQ
    } = L41(), {
        Request: GT,
        fromInnerRequest: gxQ
    } = sn(), {
        kState: Sw
    } = sk(), {
        fetching: uxQ
    } = R41(), {
        urlIsHttpHttpsScheme: Gw1,
        createDeferredPromise: tn,
        readAllBytes: mxQ
    } = AK(), B20 = W1("node:assert");
    class eN {
        #A;
        constructor() {
            if (arguments[0] !== _xQ) g9.illegalConstructor();
            g9.util.markAsUncloneable(this), this.#A = arguments[1]
        }
        async match(A, B = {}) {
            g9.brandCheck(this, eN);
            let Q = "Cache.match";
            g9.argumentLengthCheck(arguments, 1, Q), A = g9.converters.RequestInfo(A, Q, "request"), B = g9.converters.CacheQueryOptions(B, Q, "options");
            let Z = this.#D(A, B, 1);
            if (Z.length === 0) return;
            return Z[0]
        }
        async matchAll(A = void 0, B = {}) {
            g9.brandCheck(this, eN);
            let Q = "Cache.matchAll";
            if (A !== void 0) A = g9.converters.RequestInfo(A, Q, "request");
            return B = g9.converters.CacheQueryOptions(B, Q, "options"), this.#D(A, B)
        }
        async add(A) {
            g9.brandCheck(this, eN);
            let B = "Cache.add";
            g9.argumentLengthCheck(arguments, 1, B), A = g9.converters.RequestInfo(A, B, "request");
            let Q = [A];
            return await this.addAll(Q)
        }
        async addAll(A) {
            g9.brandCheck(this, eN);
            let B = "Cache.addAll";
            g9.argumentLengthCheck(arguments, 1, B);
            let Q = [],
                Z = [];
            for (let X of A) {
                if (X === void 0) throw g9.errors.conversionFailed({
                    prefix: B,
                    argument: "Argument 1",
                    types: ["undefined is not allowed"]
                });
                if (X = g9.converters.RequestInfo(X), typeof X === "string") continue;
                let V = X[Sw];
                if (!Gw1(V.url) || V.method !== "GET") throw g9.errors.exception({
                    header: B,
                    message: "Expected http/s scheme when method is not GET."
                })
            }
            let D = [];
            for (let X of A) {
                let V = new GT(X)[Sw];
                if (!Gw1(V.url)) throw g9.errors.exception({
                    header: B,
                    message: "Expected http/s scheme."
                });
                V.initiator = "fetch", V.destination = "subresource", Z.push(V);
                let C = tn();
                D.push(uxQ({
                    request: V,
                    processResponse(K) {
                        if (K.type === "error" || K.status === 206 || K.status < 200 || K.status > 299) C.reject(g9.errors.exception({
                            header: "Cache.addAll",
                            message: "Received an invalid status code or the request failed."
                        }));
                        else if (K.headersList.contains("vary")) {
                            let H = A20(K.headersList.get("vary"));
                            for (let z of H)
                                if (z === "*") {
                                    C.reject(g9.errors.exception({
                                        header: "Cache.addAll",
                                        message: "invalid vary field value"
                                    }));
                                    for (let $ of D) $.abort();
                                    return
                                }
                        }
                    },
                    processResponseEndOfBody(K) {
                        if (K.aborted) {
                            C.reject(new DOMException("aborted", "AbortError"));
                            return
                        }
                        C.resolve(K)
                    }
                })), Q.push(C.promise)
            }
            let F = await Promise.all(Q),
                I = [],
                Y = 0;
            for (let X of F) {
                let V = {
                    type: "put",
                    request: Z[Y],
                    response: X
                };
                I.push(V), Y++
            }
            let W = tn(),
                J = null;
            try {
                this.#B(I)
            } catch (X) {
                J = X
            }
            return queueMicrotask(() => {
                if (J === null) W.resolve(void 0);
                else W.reject(J)
            }), W.promise
        }
        async put(A, B) {
            g9.brandCheck(this, eN);
            let Q = "Cache.put";
            g9.argumentLengthCheck(arguments, 2, Q), A = g9.converters.RequestInfo(A, Q, "request"), B = g9.converters.Response(B, Q, "response");
            let Z = null;
            if (A instanceof GT) Z = A[Sw];
            else Z = new GT(A)[Sw];
            if (!Gw1(Z.url) || Z.method !== "GET") throw g9.errors.exception({
                header: Q,
                message: "Expected an http/s scheme when method is not GET"
            });
            let D = B[Sw];
            if (D.status === 206) throw g9.errors.exception({
                header: Q,
                message: "Got 206 status"
            });
            if (D.headersList.contains("vary")) {
                let V = A20(D.headersList.get("vary"));
                for (let C of V)
                    if (C === "*") throw g9.errors.exception({
                        header: Q,
                        message: "Got * vary field value"
                    })
            }
            if (D.body && (vxQ(D.body.stream) || D.body.stream.locked)) throw g9.errors.exception({
                header: Q,
                message: "Response body is locked or disturbed"
            });
            let G = fxQ(D),
                F = tn();
            if (D.body != null) {
                let C = D.body.stream.getReader();
                mxQ(C).then(F.resolve, F.reject)
            } else F.resolve(void 0);
            let I = [],
                Y = {
                    type: "put",
                    request: Z,
                    response: G
                };
            I.push(Y);
            let W = await F.promise;
            if (G.body != null) G.body.source = W;
            let J = tn(),
                X = null;
            try {
                this.#B(I)
            } catch (V) {
                X = V
            }
            return queueMicrotask(() => {
                if (X === null) J.resolve();
                else J.reject(X)
            }), J.promise
        }
        async delete(A, B = {}) {
            g9.brandCheck(this, eN);
            let Q = "Cache.delete";
            g9.argumentLengthCheck(arguments, 1, Q), A = g9.converters.RequestInfo(A, Q, "request"), B = g9.converters.CacheQueryOptions(B, Q, "options");
            let Z = null;
            if (A instanceof GT) {
                if (Z = A[Sw], Z.method !== "GET" && !B.ignoreMethod) return !1
            } else B20(typeof A === "string"), Z = new GT(A)[Sw];
            let D = [],
                G = {
                    type: "delete",
                    request: Z,
                    options: B
                };
            D.push(G);
            let F = tn(),
                I = null,
                Y;
            try {
                Y = this.#B(D)
            } catch (W) {
                I = W
            }
            return queueMicrotask(() => {
                if (I === null) F.resolve(!!Y?.length);
                else F.reject(I)
            }), F.promise
        }
        async keys(A = void 0, B = {}) {
            g9.brandCheck(this, eN);
            let Q = "Cache.keys";
            if (A !== void 0) A = g9.converters.RequestInfo(A, Q, "request");
            B = g9.converters.CacheQueryOptions(B, Q, "options");
            let Z = null;
            if (A !== void 0) {
                if (A instanceof GT) {
                    if (Z = A[Sw], Z.method !== "GET" && !B.ignoreMethod) return []
                } else if (typeof A === "string") Z = new GT(A)[Sw]
            }
            let D = tn(),
                G = [];
            if (A === void 0)
                for (let F of this.#A) G.push(F[0]);
            else {
                let F = this.#Q(Z, B);
                for (let I of F) G.push(I[0])
            }
            return queueMicrotask(() => {
                let F = [];
                for (let I of G) {
                    let Y = gxQ(I, new AbortController().signal, "immutable");
                    F.push(Y)
                }
                D.resolve(Object.freeze(F))
            }), D.promise
        }
        #B(A) {
            let B = this.#A,
                Q = [...B],
                Z = [],
                D = [];
            try {
                for (let G of A) {
                    if (G.type !== "delete" && G.type !== "put") throw g9.errors.exception({
                        header: "Cache.#batchCacheOperations",
                        message: 'operation type does not match "delete" or "put"'
                    });
                    if (G.type === "delete" && G.response != null) throw g9.errors.exception({
                        header: "Cache.#batchCacheOperations",
                        message: "delete operation should not have an associated response"
                    });
                    if (this.#Q(G.request, G.options, Z).length) throw new DOMException("???", "InvalidStateError");
                    let F;
                    if (G.type === "delete") {
                        if (F = this.#Q(G.request, G.options), F.length === 0) return [];
                        for (let I of F) {
                            let Y = B.indexOf(I);
                            B20(Y !== -1), B.splice(Y, 1)
                        }
                    } else if (G.type === "put") {
                        if (G.response == null) throw g9.errors.exception({
                            header: "Cache.#batchCacheOperations",
                            message: "put operation should have an associated response"
                        });
                        let I = G.request;
                        if (!Gw1(I.url)) throw g9.errors.exception({
                            header: "Cache.#batchCacheOperations",
                            message: "expected http or https scheme"
                        });
                        if (I.method !== "GET") throw g9.errors.exception({
                            header: "Cache.#batchCacheOperations",
                            message: "not get method"
                        });
                        if (G.options != null) throw g9.errors.exception({
                            header: "Cache.#batchCacheOperations",
                            message: "options must not be defined"
                        });
                        F = this.#Q(G.request);
                        for (let Y of F) {
                            let W = B.indexOf(Y);
                            B20(W !== -1), B.splice(W, 1)
                        }
                        B.push([G.request, G.response]), Z.push([G.request, G.response])
                    }
                    D.push([G.request, G.response])
                }
                return D
            } catch (G) {
                throw this.#A.length = 0, this.#A = Q, G
            }
        }
        #Q(A, B, Q) {
            let Z = [],
                D = Q ?? this.#A;
            for (let G of D) {
                let [F, I] = G;
                if (this.#Z(A, F, I, B)) Z.push(G)
            }
            return Z
        }
        #Z(A, B, Q = null, Z) {
            let D = new URL(A.url),
                G = new URL(B.url);
            if (Z?.ignoreSearch) G.search = "", D.search = "";
            if (!xxQ(D, G, !0)) return !1;
            if (Q == null || Z?.ignoreVary || !Q.headersList.contains("vary")) return !0;
            let F = A20(Q.headersList.get("vary"));
            for (let I of F) {
                if (I === "*") return !1;
                let Y = B.headersList.get(I),
                    W = A.headersList.get(I);
                if (Y !== W) return !1
            }
            return !0
        }
        #D(A, B, Q = 1 / 0) {
            let Z = null;
            if (A !== void 0) {
                if (A instanceof GT) {
                    if (Z = A[Sw], Z.method !== "GET" && !B.ignoreMethod) return []
                } else if (typeof A === "string") Z = new GT(A)[Sw]
            }
            let D = [];
            if (A === void 0)
                for (let F of this.#A) D.push(F[1]);
            else {
                let F = this.#Q(Z, B);
                for (let I of F) D.push(I[1])
            }
            let G = [];
            for (let F of D) {
                let I = hxQ(F, "immutable");
                if (G.push(I.clone()), G.length >= Q) break
            }
            return Object.freeze(G)
        }
    }
    Object.defineProperties(eN.prototype, {
        [Symbol.toStringTag]: {
            value: "Cache",
            configurable: !0
        },
        match: Gg,
        matchAll: Gg,
        add: Gg,
        addAll: Gg,
        put: Gg,
        delete: Gg,
        keys: Gg
    });
    var LkA = [{
        key: "ignoreSearch",
        converter: g9.converters.boolean,
        defaultValue: () => !1
    }, {
        key: "ignoreMethod",
        converter: g9.converters.boolean,
        defaultValue: () => !1
    }, {
        key: "ignoreVary",
        converter: g9.converters.boolean,
        defaultValue: () => !1
    }];
    g9.converters.CacheQueryOptions = g9.dictionaryConverter(LkA);
    g9.converters.MultiCacheQueryOptions = g9.dictionaryConverter([...LkA, {
        key: "cacheName",
        converter: g9.converters.DOMString
    }]);
    g9.converters.Response = g9.interfaceConverter(bxQ);
    g9.converters["sequence<RequestInfo>"] = g9.sequenceConverter(g9.converters.RequestInfo);
    MkA.exports = {
        Cache: eN
    }
});
var TkA = E((e65, OkA) => {
    var {
        kConstruct: P41
    } = Dw1(), {
        Cache: Fw1
    } = RkA(), {
        webidl: sW
    } = NY(), {
        kEnumerableProperty: S41
    } = e4();
    class Yy {
        #A = new Map;
        constructor() {
            if (arguments[0] !== P41) sW.illegalConstructor();
            sW.util.markAsUncloneable(this)
        }
        async match(A, B = {}) {
            if (sW.brandCheck(this, Yy), sW.argumentLengthCheck(arguments, 1, "CacheStorage.match"), A = sW.converters.RequestInfo(A), B = sW.converters.MultiCacheQueryOptions(B), B.cacheName != null) {
                if (this.#A.has(B.cacheName)) {
                    let Q = this.#A.get(B.cacheName);
                    return await new Fw1(P41, Q).match(A, B)
                }
            } else
                for (let Q of this.#A.values()) {
                    let D = await new Fw1(P41, Q).match(A, B);
                    if (D !== void 0) return D
                }
        }
        async has(A) {
            sW.brandCheck(this, Yy);
            let B = "CacheStorage.has";
            return sW.argumentLengthCheck(arguments, 1, B), A = sW.converters.DOMString(A, B, "cacheName"), this.#A.has(A)
        }
        async open(A) {
            sW.brandCheck(this, Yy);
            let B = "CacheStorage.open";
            if (sW.argumentLengthCheck(arguments, 1, B), A = sW.converters.DOMString(A, B, "cacheName"), this.#A.has(A)) {
                let Z = this.#A.get(A);
                return new Fw1(P41, Z)
            }
            let Q = [];
            return this.#A.set(A, Q), new Fw1(P41, Q)
        }
        async delete(A) {
            sW.brandCheck(this, Yy);
            let B = "CacheStorage.delete";
            return sW.argumentLengthCheck(arguments, 1, B), A = sW.converters.DOMString(A, B, "cacheName"), this.#A.delete(A)
        }
        async keys() {
            return sW.brandCheck(this, Yy), [...this.#A.keys()]
        }
    }
    Object.defineProperties(Yy.prototype, {
        [Symbol.toStringTag]: {
            value: "CacheStorage",
            configurable: !0
        },
        match: S41,
        has: S41,
        open: S41,
        delete: S41,
        keys: S41
    });
    OkA.exports = {
        CacheStorage: Yy
    }
});
var SkA = E((A85, PkA) => {
    PkA.exports = {
        maxAttributeValueSize: 1024,
        maxNameValuePairSize: 4096
    }
});