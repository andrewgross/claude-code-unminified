/* chunk:401 bytes:[9354329, 9375193) size:20864 source:unpacked-cli.js */
var QXB = E((aQ3, BXB) => {
    var {
        create: dd6,
        defineProperty: $D1,
        getOwnPropertyDescriptor: cd6,
        getOwnPropertyNames: ld6,
        getPrototypeOf: pd6
    } = Object, id6 = Object.prototype.hasOwnProperty, OI = (A, B) => $D1(A, "name", {
        value: B,
        configurable: !0
    }), nd6 = (A, B) => {
        for (var Q in B) $D1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, cJB = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ld6(B))
                if (!id6.call(A, D) && D !== Q) $D1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = cd6(B, D)) || Z.enumerable
                })
        }
        return A
    }, ad6 = (A, B, Q) => (Q = A != null ? dd6(pd6(A)) : {}, cJB(B || !A || !A.__esModule ? $D1(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), sd6 = (A) => cJB($D1({}, "__esModule", {
        value: !0
    }), A), lJB = {};
    nd6(lJB, {
        DEFAULT_REQUEST_TIMEOUT: () => Ac6,
        NodeHttp2Handler: () => Gc6,
        NodeHttpHandler: () => Bc6,
        streamCollector: () => Ic6
    });
    BXB.exports = sd6(lJB);
    var pJB = fz0(),
        iJB = uJB(),
        KE0 = W1("http"),
        HE0 = W1("https"),
        rd6 = ["ECONNRESET", "EPIPE", "ETIMEDOUT"],
        nJB = OI((A) => {
            let B = {};
            for (let Q of Object.keys(A)) {
                let Z = A[Q];
                B[Q] = Array.isArray(Z) ? Z.join(",") : Z
            }
            return B
        }, "getTransformedHeaders"),
        od6 = OI((A, B, Q = 0) => {
            if (!Q) return;
            let Z = setTimeout(() => {
                A.destroy(), B(Object.assign(new Error(`Socket timed out without establishing a connection within ${Q} ms`), {
                    name: "TimeoutError"
                }))
            }, Q);
            A.on("socket", (D) => {
                if (D.connecting) D.on("connect", () => {
                    clearTimeout(Z)
                });
                else clearTimeout(Z)
            })
        }, "setConnectionTimeout"),
        td6 = OI((A, {
            keepAlive: B,
            keepAliveMsecs: Q
        }) => {
            if (B !== !0) return;
            A.on("socket", (Z) => {
                Z.setKeepAlive(B, Q || 0)
            })
        }, "setSocketKeepAlive"),
        ed6 = OI((A, B, Q = 0) => {
            A.setTimeout(Q, () => {
                A.destroy(), B(Object.assign(new Error(`Connection timed out after ${Q} ms`), {
                    name: "TimeoutError"
                }))
            })
        }, "setSocketTimeout"),
        aJB = W1("stream"),
        mJB = 1000;
    async function zE0(A, B, Q = mJB) {
        let Z = B.headers ?? {},
            D = Z.Expect || Z.expect,
            G = -1,
            F = !1;
        if (D === "100-continue") await Promise.race([new Promise((I) => {
            G = Number(setTimeout(I, Math.max(mJB, Q)))
        }), new Promise((I) => {
            A.on("continue", () => {
                clearTimeout(G), I()
            }), A.on("error", () => {
                F = !0, clearTimeout(G), I()
            })
        })]);
        if (!F) sJB(A, B.body)
    }
    OI(zE0, "writeRequestBody");

    function sJB(A, B) {
        if (B instanceof aJB.Readable) {
            B.pipe(A);
            return
        }
        if (B) {
            if (Buffer.isBuffer(B) || typeof B === "string") {
                A.end(B);
                return
            }
            let Q = B;
            if (typeof Q === "object" && Q.buffer && typeof Q.byteOffset === "number" && typeof Q.byteLength === "number") {
                A.end(Buffer.from(Q.buffer, Q.byteOffset, Q.byteLength));
                return
            }
            A.end(Buffer.from(B));
            return
        }
        A.end()
    }
    OI(sJB, "writeBody");
    var Ac6 = 0,
        rJB = class A {
            constructor(B) {
                this.socketWarningTimestamp = 0, this.metadata = {
                    handlerProtocol: "http/1.1"
                }, this.configProvider = new Promise((Q, Z) => {
                    if (typeof B === "function") B().then((D) => {
                        Q(this.resolveDefaultConfig(D))
                    }).catch(Z);
                    else Q(this.resolveDefaultConfig(B))
                })
            }
            static create(B) {
                if (typeof(B == null ? void 0 : B.handle) === "function") return B;
                return new A(B)
            }
            static checkSocketUsage(B, Q) {
                var Z, D;
                let {
                    sockets: G,
                    requests: F,
                    maxSockets: I
                } = B;
                if (typeof I !== "number" || I === 1 / 0) return Q;
                let Y = 15000;
                if (Date.now() - Y < Q) return Q;
                if (G && F)
                    for (let W in G) {
                        let J = ((Z = G[W]) == null ? void 0 : Z.length) ?? 0,
                            X = ((D = F[W]) == null ? void 0 : D.length) ?? 0;
                        if (J >= I && X >= 2 * I) return console.warn("@smithy/node-http-handler:WARN", `socket usage at capacity=${J} and ${X} additional requests are enqueued.`, "See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html", "or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config."), Date.now()
                    }
                return Q
            }
            resolveDefaultConfig(B) {
                let {
                    requestTimeout: Q,
                    connectionTimeout: Z,
                    socketTimeout: D,
                    httpAgent: G,
                    httpsAgent: F
                } = B || {}, I = !0, Y = 50;
                return {
                    connectionTimeout: Z,
                    requestTimeout: Q ?? D,
                    httpAgent: (() => {
                        if (G instanceof KE0.Agent || typeof(G == null ? void 0 : G.destroy) === "function") return G;
                        return new KE0.Agent({
                            keepAlive: !0,
                            maxSockets: 50,
                            ...G
                        })
                    })(),
                    httpsAgent: (() => {
                        if (F instanceof HE0.Agent || typeof(F == null ? void 0 : F.destroy) === "function") return F;
                        return new HE0.Agent({
                            keepAlive: !0,
                            maxSockets: 50,
                            ...F
                        })
                    })()
                }
            }
            destroy() {
                var B, Q, Z, D;
                (Q = (B = this.config) == null ? void 0 : B.httpAgent) == null || Q.destroy(), (D = (Z = this.config) == null ? void 0 : Z.httpsAgent) == null || D.destroy()
            }
            async handle(B, {
                abortSignal: Q
            } = {}) {
                if (!this.config) this.config = await this.configProvider;
                let Z;
                return new Promise((D, G) => {
                    let F = void 0,
                        I = OI(async (L) => {
                            await F, clearTimeout(Z), D(L)
                        }, "resolve"),
                        Y = OI(async (L) => {
                            await F, G(L)
                        }, "reject");
                    if (!this.config) throw new Error("Node HTTP request handler config is not resolved");
                    if (Q == null ? void 0 : Q.aborted) {
                        let L = new Error("Request aborted");
                        L.name = "AbortError", Y(L);
                        return
                    }
                    let W = B.protocol === "https:",
                        J = W ? this.config.httpsAgent : this.config.httpAgent;
                    Z = setTimeout(() => {
                        this.socketWarningTimestamp = A.checkSocketUsage(J, this.socketWarningTimestamp)
                    }, this.config.socketAcquisitionWarningTimeout ?? (this.config.requestTimeout ?? 2000) + (this.config.connectionTimeout ?? 1000));
                    let X = iJB.buildQueryString(B.query || {}),
                        V = void 0;
                    if (B.username != null || B.password != null) {
                        let L = B.username ?? "",
                            N = B.password ?? "";
                        V = `${L}:${N}`
                    }
                    let C = B.path;
                    if (X) C += `?${X}`;
                    if (B.fragment) C += `#${B.fragment}`;
                    let K = {
                            headers: B.headers,
                            host: B.hostname,
                            method: B.method,
                            path: C,
                            port: B.port,
                            agent: J,
                            auth: V
                        },
                        z = (W ? HE0.request : KE0.request)(K, (L) => {
                            let N = new pJB.HttpResponse({
                                statusCode: L.statusCode || -1,
                                reason: L.statusMessage,
                                headers: nJB(L.headers),
                                body: L
                            });
                            I({
                                response: N
                            })
                        });
                    if (z.on("error", (L) => {
                            if (rd6.includes(L.code)) Y(Object.assign(L, {
                                name: "TimeoutError"
                            }));
                            else Y(L)
                        }), od6(z, Y, this.config.connectionTimeout), ed6(z, Y, this.config.requestTimeout), Q) Q.onabort = () => {
                        z.abort();
                        let L = new Error("Request aborted");
                        L.name = "AbortError", Y(L)
                    };
                    let $ = K.agent;
                    if (typeof $ === "object" && "keepAlive" in $) td6(z, {
                        keepAlive: $.keepAlive,
                        keepAliveMsecs: $.keepAliveMsecs
                    });
                    F = zE0(z, B, this.config.requestTimeout).catch(G)
                })
            }
            updateHttpClientConfig(B, Q) {
                this.config = void 0, this.configProvider = this.configProvider.then((Z) => {
                    return {
                        ...Z,
                        [B]: Q
                    }
                })
            }
            httpHandlerConfigs() {
                return this.config ?? {}
            }
        };
    OI(rJB, "NodeHttpHandler");
    var Bc6 = rJB,
        dJB = W1("http2"),
        Qc6 = ad6(W1("http2")),
        oJB = class A {
            constructor(B) {
                this.sessions = [], this.sessions = B ?? []
            }
            poll() {
                if (this.sessions.length > 0) return this.sessions.shift()
            }
            offerLast(B) {
                this.sessions.push(B)
            }
            contains(B) {
                return this.sessions.includes(B)
            }
            remove(B) {
                this.sessions = this.sessions.filter((Q) => Q !== B)
            } [Symbol.iterator]() {
                return this.sessions[Symbol.iterator]()
            }
            destroy(B) {
                for (let Q of this.sessions)
                    if (Q === B) {
                        if (!Q.destroyed) Q.destroy()
                    }
            }
        };
    OI(oJB, "NodeHttp2ConnectionPool");
    var Zc6 = oJB,
        tJB = class A {
            constructor(B) {
                if (this.sessionCache = new Map, this.config = B, this.config.maxConcurrency && this.config.maxConcurrency <= 0) throw new RangeError("maxConcurrency must be greater than zero.")
            }
            lease(B, Q) {
                let Z = this.getUrlString(B),
                    D = this.sessionCache.get(Z);
                if (D) {
                    let Y = D.poll();
                    if (Y && !this.config.disableConcurrency) return Y
                }
                let G = Qc6.default.connect(Z);
                if (this.config.maxConcurrency) G.settings({
                    maxConcurrentStreams: this.config.maxConcurrency
                }, (Y) => {
                    if (Y) throw new Error("Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + B.destination.toString())
                });
                G.unref();
                let F = OI(() => {
                    G.destroy(), this.deleteSession(Z, G)
                }, "destroySessionCb");
                if (G.on("goaway", F), G.on("error", F), G.on("frameError", F), G.on("close", () => this.deleteSession(Z, G)), Q.requestTimeout) G.setTimeout(Q.requestTimeout, F);
                let I = this.sessionCache.get(Z) || new Zc6;
                return I.offerLast(G), this.sessionCache.set(Z, I), G
            }
            deleteSession(B, Q) {
                let Z = this.sessionCache.get(B);
                if (!Z) return;
                if (!Z.contains(Q)) return;
                Z.remove(Q), this.sessionCache.set(B, Z)
            }
            release(B, Q) {
                var Z;
                let D = this.getUrlString(B);
                (Z = this.sessionCache.get(D)) == null || Z.offerLast(Q)
            }
            destroy() {
                for (let [B, Q] of this.sessionCache) {
                    for (let Z of Q) {
                        if (!Z.destroyed) Z.destroy();
                        Q.remove(Z)
                    }
                    this.sessionCache.delete(B)
                }
            }
            setMaxConcurrentStreams(B) {
                if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) throw new RangeError("maxConcurrentStreams must be greater than zero.");
                this.config.maxConcurrency = B
            }
            setDisableConcurrentStreams(B) {
                this.config.disableConcurrency = B
            }
            getUrlString(B) {
                return B.destination.toString()
            }
        };
    OI(tJB, "NodeHttp2ConnectionManager");
    var Dc6 = tJB,
        eJB = class A {
            constructor(B) {
                this.metadata = {
                    handlerProtocol: "h2"
                }, this.connectionManager = new Dc6({}), this.configProvider = new Promise((Q, Z) => {
                    if (typeof B === "function") B().then((D) => {
                        Q(D || {})
                    }).catch(Z);
                    else Q(B || {})
                })
            }
            static create(B) {
                if (typeof(B == null ? void 0 : B.handle) === "function") return B;
                return new A(B)
            }
            destroy() {
                this.connectionManager.destroy()
            }
            async handle(B, {
                abortSignal: Q
            } = {}) {
                if (!this.config) {
                    if (this.config = await this.configProvider, this.connectionManager.setDisableConcurrentStreams(this.config.disableConcurrentStreams || !1), this.config.maxConcurrentStreams) this.connectionManager.setMaxConcurrentStreams(this.config.maxConcurrentStreams)
                }
                let {
                    requestTimeout: Z,
                    disableConcurrentStreams: D
                } = this.config;
                return new Promise((G, F) => {
                    var I;
                    let Y = !1,
                        W = void 0,
                        J = OI(async (k) => {
                            await W, G(k)
                        }, "resolve"),
                        X = OI(async (k) => {
                            await W, F(k)
                        }, "reject");
                    if (Q == null ? void 0 : Q.aborted) {
                        Y = !0;
                        let k = new Error("Request aborted");
                        k.name = "AbortError", X(k);
                        return
                    }
                    let {
                        hostname: V,
                        method: C,
                        port: K,
                        protocol: H,
                        query: z
                    } = B, $ = "";
                    if (B.username != null || B.password != null) {
                        let k = B.username ?? "",
                            c = B.password ?? "";
                        $ = `${k}:${c}@`
                    }
                    let L = `${H}//${$}${V}${K?`:${K}`:""}`,
                        N = {
                            destination: new URL(L)
                        },
                        R = this.connectionManager.lease(N, {
                            requestTimeout: (I = this.config) == null ? void 0 : I.sessionTimeout,
                            disableConcurrentStreams: D || !1
                        }),
                        O = OI((k) => {
                            if (D) this.destroySession(R);
                            Y = !0, X(k)
                        }, "rejectWithDestroy"),
                        P = iJB.buildQueryString(z || {}),
                        j = B.path;
                    if (P) j += `?${P}`;
                    if (B.fragment) j += `#${B.fragment}`;
                    let f = R.request({
                        ...B.headers,
                        [dJB.constants.HTTP2_HEADER_PATH]: j,
                        [dJB.constants.HTTP2_HEADER_METHOD]: C
                    });
                    if (R.ref(), f.on("response", (k) => {
                            let c = new pJB.HttpResponse({
                                statusCode: k[":status"] || -1,
                                headers: nJB(k),
                                body: f
                            });
                            if (Y = !0, J({
                                    response: c
                                }), D) R.close(), this.connectionManager.deleteSession(L, R)
                        }), Z) f.setTimeout(Z, () => {
                        f.close();
                        let k = new Error(`Stream timed out because of no activity for ${Z} ms`);
                        k.name = "TimeoutError", O(k)
                    });
                    if (Q) Q.onabort = () => {
                        f.close();
                        let k = new Error("Request aborted");
                        k.name = "AbortError", O(k)
                    };
                    f.on("frameError", (k, c, u) => {
                        O(new Error(`Frame type id ${k} in stream id ${u} has failed with code ${c}.`))
                    }), f.on("error", O), f.on("aborted", () => {
                        O(new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${f.rstCode}.`))
                    }), f.on("close", () => {
                        if (R.unref(), D) R.destroy();
                        if (!Y) O(new Error("Unexpected error: http2 request did not get a response"))
                    }), W = zE0(f, B, Z)
                })
            }
            updateHttpClientConfig(B, Q) {
                this.config = void 0, this.configProvider = this.configProvider.then((Z) => {
                    return {
                        ...Z,
                        [B]: Q
                    }
                })
            }
            httpHandlerConfigs() {
                return this.config ?? {}
            }
            destroySession(B) {
                if (!B.destroyed) B.destroy()
            }
        };
    OI(eJB, "NodeHttp2Handler");
    var Gc6 = eJB,
        AXB = class A extends aJB.Writable {
            constructor() {
                super(...arguments);
                this.bufferedBytes = []
            }
            _write(B, Q, Z) {
                this.bufferedBytes.push(B), Z()
            }
        };
    OI(AXB, "Collector");
    var Fc6 = AXB,
        Ic6 = OI((A) => new Promise((B, Q) => {
            let Z = new Fc6;
            A.pipe(Z), A.on("error", (D) => {
                Z.end(), Q(D)
            }), Z.on("error", Q), Z.on("finish", function() {
                let D = new Uint8Array(Buffer.concat(this.bufferedBytes));
                B(D)
            })
        }), "streamCollector")
});