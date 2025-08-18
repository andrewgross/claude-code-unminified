/* chunk:48 bytes:[1257619, 1281534) size:23915 source:unpacked-cli.js */
var x3 = E((Oe8, r0A) => {
    var {
        create: $g9,
        defineProperty: V91,
        getOwnPropertyDescriptor: qg9,
        getOwnPropertyNames: Ng9,
        getPrototypeOf: Lg9
    } = Object, Mg9 = Object.prototype.hasOwnProperty, _3 = (A, B) => V91(A, "name", {
        value: B,
        configurable: !0
    }), Rg9 = (A, B) => {
        for (var Q in B) V91(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, m0A = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ng9(B))
                if (!Mg9.call(A, D) && D !== Q) V91(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = qg9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Og9 = (A, B, Q) => (Q = A != null ? $g9(Lg9(A)) : {}, m0A(B || !A || !A.__esModule ? V91(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), Tg9 = (A) => m0A(V91({}, "__esModule", {
        value: !0
    }), A), d0A = {};
    Rg9(d0A, {
        DEFAULT_REQUEST_TIMEOUT: () => a0A,
        NodeHttp2Handler: () => fg9,
        NodeHttpHandler: () => _g9,
        streamCollector: () => gg9
    });
    r0A.exports = Tg9(d0A);
    var c0A = P0A(),
        l0A = b0A(),
        qn1 = W1("http"),
        Nn1 = W1("https"),
        Pg9 = ["ECONNRESET", "EPIPE", "ETIMEDOUT"],
        p0A = _3((A) => {
            let B = {};
            for (let Q of Object.keys(A)) {
                let Z = A[Q];
                B[Q] = Array.isArray(Z) ? Z.join(",") : Z
            }
            return B
        }, "getTransformedHeaders"),
        KV = {
            setTimeout: (A, B) => setTimeout(A, B),
            clearTimeout: (A) => clearTimeout(A)
        },
        f0A = 1000,
        Sg9 = _3((A, B, Q = 0) => {
            if (!Q) return -1;
            let Z = _3((D) => {
                let G = KV.setTimeout(() => {
                        A.destroy(), B(Object.assign(new Error(`Socket timed out without establishing a connection within ${Q} ms`), {
                            name: "TimeoutError"
                        }))
                    }, Q - D),
                    F = _3((I) => {
                        if (I?.connecting) I.on("connect", () => {
                            KV.clearTimeout(G)
                        });
                        else KV.clearTimeout(G)
                    }, "doWithSocket");
                if (A.socket) F(A.socket);
                else A.on("socket", F)
            }, "registerTimeout");
            if (Q < 2000) return Z(0), 0;
            return KV.setTimeout(Z.bind(null, f0A), f0A)
        }, "setConnectionTimeout"),
        jg9 = 3000,
        kg9 = _3((A, {
            keepAlive: B,
            keepAliveMsecs: Q
        }, Z = jg9) => {
            if (B !== !0) return -1;
            let D = _3(() => {
                if (A.socket) A.socket.setKeepAlive(B, Q || 0);
                else A.on("socket", (G) => {
                    G.setKeepAlive(B, Q || 0)
                })
            }, "registerListener");
            if (Z === 0) return D(), 0;
            return KV.setTimeout(D, Z)
        }, "setSocketKeepAlive"),
        h0A = 3000,
        yg9 = _3((A, B, Q = a0A) => {
            let Z = _3((D) => {
                let G = Q - D,
                    F = _3(() => {
                        A.destroy(), B(Object.assign(new Error(`Connection timed out after ${Q} ms`), {
                            name: "TimeoutError"
                        }))
                    }, "onTimeout");
                if (A.socket) A.socket.setTimeout(G, F), A.on("close", () => A.socket?.removeListener("timeout", F));
                else A.setTimeout(G, F)
            }, "registerTimeout");
            if (0 < Q && Q < 6000) return Z(0), 0;
            return KV.setTimeout(Z.bind(null, Q === 0 ? 0 : h0A), h0A)
        }, "setSocketTimeout"),
        i0A = W1("stream"),
        g0A = 6000;
    async function Ln1(A, B, Q = g0A) {
        let Z = B.headers ?? {},
            D = Z.Expect || Z.expect,
            G = -1,
            F = !0;
        if (D === "100-continue") F = await Promise.race([new Promise((I) => {
            G = Number(KV.setTimeout(() => I(!0), Math.max(g0A, Q)))
        }), new Promise((I) => {
            A.on("continue", () => {
                KV.clearTimeout(G), I(!0)
            }), A.on("response", () => {
                KV.clearTimeout(G), I(!1)
            }), A.on("error", () => {
                KV.clearTimeout(G), I(!1)
            })
        })]);
        if (F) n0A(A, B.body)
    }
    _3(Ln1, "writeRequestBody");

    function n0A(A, B) {
        if (B instanceof i0A.Readable) {
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
    _3(n0A, "writeBody");
    var a0A = 0,
        _g9 = class A {
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
            static {
                _3(this, "NodeHttpHandler")
            }
            static create(B) {
                if (typeof B?.handle === "function") return B;
                return new A(B)
            }
            static checkSocketUsage(B, Q, Z = console) {
                let {
                    sockets: D,
                    requests: G,
                    maxSockets: F
                } = B;
                if (typeof F !== "number" || F === 1 / 0) return Q;
                let I = 15000;
                if (Date.now() - I < Q) return Q;
                if (D && G)
                    for (let Y in D) {
                        let W = D[Y]?.length ?? 0,
                            J = G[Y]?.length ?? 0;
                        if (W >= F && J >= 2 * F) return Z?.warn?.(`@smithy/node-http-handler:WARN - socket usage at capacity=${W} and ${J} additional requests are enqueued.
See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html
or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config.`), Date.now()
                    }
                return Q
            }
            resolveDefaultConfig(B) {
                let {
                    requestTimeout: Q,
                    connectionTimeout: Z,
                    socketTimeout: D,
                    socketAcquisitionWarningTimeout: G,
                    httpAgent: F,
                    httpsAgent: I
                } = B || {}, Y = !0, W = 50;
                return {
                    connectionTimeout: Z,
                    requestTimeout: Q ?? D,
                    socketAcquisitionWarningTimeout: G,
                    httpAgent: (() => {
                        if (F instanceof qn1.Agent || typeof F?.destroy === "function") return F;
                        return new qn1.Agent({
                            keepAlive: !0,
                            maxSockets: 50,
                            ...F
                        })
                    })(),
                    httpsAgent: (() => {
                        if (I instanceof Nn1.Agent || typeof I?.destroy === "function") return I;
                        return new Nn1.Agent({
                            keepAlive: !0,
                            maxSockets: 50,
                            ...I
                        })
                    })(),
                    logger: console
                }
            }
            destroy() {
                this.config?.httpAgent?.destroy(), this.config?.httpsAgent?.destroy()
            }
            async handle(B, {
                abortSignal: Q
            } = {}) {
                if (!this.config) this.config = await this.configProvider;
                return new Promise((Z, D) => {
                    let G = void 0,
                        F = [],
                        I = _3(async (N) => {
                            await G, F.forEach(KV.clearTimeout), Z(N)
                        }, "resolve"),
                        Y = _3(async (N) => {
                            await G, F.forEach(KV.clearTimeout), D(N)
                        }, "reject");
                    if (!this.config) throw new Error("Node HTTP request handler config is not resolved");
                    if (Q?.aborted) {
                        let N = new Error("Request aborted");
                        N.name = "AbortError", Y(N);
                        return
                    }
                    let W = B.protocol === "https:",
                        J = W ? this.config.httpsAgent : this.config.httpAgent;
                    F.push(KV.setTimeout(() => {
                        this.socketWarningTimestamp = A.checkSocketUsage(J, this.socketWarningTimestamp, this.config.logger)
                    }, this.config.socketAcquisitionWarningTimeout ?? (this.config.requestTimeout ?? 2000) + (this.config.connectionTimeout ?? 1000)));
                    let X = l0A.buildQueryString(B.query || {}),
                        V = void 0;
                    if (B.username != null || B.password != null) {
                        let N = B.username ?? "",
                            R = B.password ?? "";
                        V = `${N}:${R}`
                    }
                    let C = B.path;
                    if (X) C += `?${X}`;
                    if (B.fragment) C += `#${B.fragment}`;
                    let K = B.hostname ?? "";
                    if (K[0] === "[" && K.endsWith("]")) K = B.hostname.slice(1, -1);
                    else K = B.hostname;
                    let H = {
                            headers: B.headers,
                            host: K,
                            method: B.method,
                            path: C,
                            port: B.port,
                            agent: J,
                            auth: V
                        },
                        $ = (W ? Nn1.request : qn1.request)(H, (N) => {
                            let R = new c0A.HttpResponse({
                                statusCode: N.statusCode || -1,
                                reason: N.statusMessage,
                                headers: p0A(N.headers),
                                body: N
                            });
                            I({
                                response: R
                            })
                        });
                    if ($.on("error", (N) => {
                            if (Pg9.includes(N.code)) Y(Object.assign(N, {
                                name: "TimeoutError"
                            }));
                            else Y(N)
                        }), Q) {
                        let N = _3(() => {
                            $.destroy();
                            let R = new Error("Request aborted");
                            R.name = "AbortError", Y(R)
                        }, "onAbort");
                        if (typeof Q.addEventListener === "function") {
                            let R = Q;
                            R.addEventListener("abort", N, {
                                once: !0
                            }), $.once("close", () => R.removeEventListener("abort", N))
                        } else Q.onabort = N
                    }
                    F.push(Sg9($, Y, this.config.connectionTimeout)), F.push(yg9($, Y, this.config.requestTimeout));
                    let L = H.agent;
                    if (typeof L === "object" && "keepAlive" in L) F.push(kg9($, {
                        keepAlive: L.keepAlive,
                        keepAliveMsecs: L.keepAliveMsecs
                    }));
                    G = Ln1($, B, this.config.requestTimeout).catch((N) => {
                        return F.forEach(KV.clearTimeout), D(N)
                    })
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
        },
        u0A = W1("http2"),
        xg9 = Og9(W1("http2")),
        vg9 = class {
            constructor(A) {
                this.sessions = [], this.sessions = A ?? []
            }
            static {
                _3(this, "NodeHttp2ConnectionPool")
            }
            poll() {
                if (this.sessions.length > 0) return this.sessions.shift()
            }
            offerLast(A) {
                this.sessions.push(A)
            }
            contains(A) {
                return this.sessions.includes(A)
            }
            remove(A) {
                this.sessions = this.sessions.filter((B) => B !== A)
            } [Symbol.iterator]() {
                return this.sessions[Symbol.iterator]()
            }
            destroy(A) {
                for (let B of this.sessions)
                    if (B === A) {
                        if (!B.destroyed) B.destroy()
                    }
            }
        },
        bg9 = class {
            constructor(A) {
                if (this.sessionCache = new Map, this.config = A, this.config.maxConcurrency && this.config.maxConcurrency <= 0) throw new RangeError("maxConcurrency must be greater than zero.")
            }
            static {
                _3(this, "NodeHttp2ConnectionManager")
            }
            lease(A, B) {
                let Q = this.getUrlString(A),
                    Z = this.sessionCache.get(Q);
                if (Z) {
                    let I = Z.poll();
                    if (I && !this.config.disableConcurrency) return I
                }
                let D = xg9.default.connect(Q);
                if (this.config.maxConcurrency) D.settings({
                    maxConcurrentStreams: this.config.maxConcurrency
                }, (I) => {
                    if (I) throw new Error("Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + A.destination.toString())
                });
                D.unref();
                let G = _3(() => {
                    D.destroy(), this.deleteSession(Q, D)
                }, "destroySessionCb");
                if (D.on("goaway", G), D.on("error", G), D.on("frameError", G), D.on("close", () => this.deleteSession(Q, D)), B.requestTimeout) D.setTimeout(B.requestTimeout, G);
                let F = this.sessionCache.get(Q) || new vg9;
                return F.offerLast(D), this.sessionCache.set(Q, F), D
            }
            deleteSession(A, B) {
                let Q = this.sessionCache.get(A);
                if (!Q) return;
                if (!Q.contains(B)) return;
                Q.remove(B), this.sessionCache.set(A, Q)
            }
            release(A, B) {
                let Q = this.getUrlString(A);
                this.sessionCache.get(Q)?.offerLast(B)
            }
            destroy() {
                for (let [A, B] of this.sessionCache) {
                    for (let Q of B) {
                        if (!Q.destroyed) Q.destroy();
                        B.remove(Q)
                    }
                    this.sessionCache.delete(A)
                }
            }
            setMaxConcurrentStreams(A) {
                if (A && A <= 0) throw new RangeError("maxConcurrentStreams must be greater than zero.");
                this.config.maxConcurrency = A
            }
            setDisableConcurrentStreams(A) {
                this.config.disableConcurrency = A
            }
            getUrlString(A) {
                return A.destination.toString()
            }
        },
        fg9 = class A {
            constructor(B) {
                this.metadata = {
                    handlerProtocol: "h2"
                }, this.connectionManager = new bg9({}), this.configProvider = new Promise((Q, Z) => {
                    if (typeof B === "function") B().then((D) => {
                        Q(D || {})
                    }).catch(Z);
                    else Q(B || {})
                })
            }
            static {
                _3(this, "NodeHttp2Handler")
            }
            static create(B) {
                if (typeof B?.handle === "function") return B;
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
                    let I = !1,
                        Y = void 0,
                        W = _3(async (f) => {
                            await Y, G(f)
                        }, "resolve"),
                        J = _3(async (f) => {
                            await Y, F(f)
                        }, "reject");
                    if (Q?.aborted) {
                        I = !0;
                        let f = new Error("Request aborted");
                        f.name = "AbortError", J(f);
                        return
                    }
                    let {
                        hostname: X,
                        method: V,
                        port: C,
                        protocol: K,
                        query: H
                    } = B, z = "";
                    if (B.username != null || B.password != null) {
                        let f = B.username ?? "",
                            k = B.password ?? "";
                        z = `${f}:${k}@`
                    }
                    let $ = `${K}//${z}${X}${C?`:${C}`:""}`,
                        L = {
                            destination: new URL($)
                        },
                        N = this.connectionManager.lease(L, {
                            requestTimeout: this.config?.sessionTimeout,
                            disableConcurrentStreams: D || !1
                        }),
                        R = _3((f) => {
                            if (D) this.destroySession(N);
                            I = !0, J(f)
                        }, "rejectWithDestroy"),
                        O = l0A.buildQueryString(H || {}),
                        P = B.path;
                    if (O) P += `?${O}`;
                    if (B.fragment) P += `#${B.fragment}`;
                    let j = N.request({
                        ...B.headers,
                        [u0A.constants.HTTP2_HEADER_PATH]: P,
                        [u0A.constants.HTTP2_HEADER_METHOD]: V
                    });
                    if (N.ref(), j.on("response", (f) => {
                            let k = new c0A.HttpResponse({
                                statusCode: f[":status"] || -1,
                                headers: p0A(f),
                                body: j
                            });
                            if (I = !0, W({
                                    response: k
                                }), D) N.close(), this.connectionManager.deleteSession($, N)
                        }), Z) j.setTimeout(Z, () => {
                        j.close();
                        let f = new Error(`Stream timed out because of no activity for ${Z} ms`);
                        f.name = "TimeoutError", R(f)
                    });
                    if (Q) {
                        let f = _3(() => {
                            j.close();
                            let k = new Error("Request aborted");
                            k.name = "AbortError", R(k)
                        }, "onAbort");
                        if (typeof Q.addEventListener === "function") {
                            let k = Q;
                            k.addEventListener("abort", f, {
                                once: !0
                            }), j.once("close", () => k.removeEventListener("abort", f))
                        } else Q.onabort = f
                    }
                    j.on("frameError", (f, k, c) => {
                        R(new Error(`Frame type id ${f} in stream id ${c} has failed with code ${k}.`))
                    }), j.on("error", R), j.on("aborted", () => {
                        R(new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${j.rstCode}.`))
                    }), j.on("close", () => {
                        if (N.unref(), D) N.destroy();
                        if (!I) R(new Error("Unexpected error: http2 request did not get a response"))
                    }), Y = Ln1(j, B, Z)
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
        },
        hg9 = class extends i0A.Writable {
            constructor() {
                super(...arguments);
                this.bufferedBytes = []
            }
            static {
                _3(this, "Collector")
            }
            _write(A, B, Q) {
                this.bufferedBytes.push(A), Q()
            }
        },
        gg9 = _3((A) => {
            if (ug9(A)) return s0A(A);
            return new Promise((B, Q) => {
                let Z = new hg9;
                A.pipe(Z), A.on("error", (D) => {
                    Z.end(), Q(D)
                }), Z.on("error", Q), Z.on("finish", function() {
                    let D = new Uint8Array(Buffer.concat(this.bufferedBytes));
                    B(D)
                })
            })
        }, "streamCollector"),
        ug9 = _3((A) => typeof ReadableStream === "function" && A instanceof ReadableStream, "isReadableStreamInstance");
    async function s0A(A) {
        let B = [],
            Q = A.getReader(),
            Z = !1,
            D = 0;
        while (!Z) {
            let {
                done: I,
                value: Y
            } = await Q.read();
            if (Y) B.push(Y), D += Y.length;
            Z = I
        }
        let G = new Uint8Array(D),
            F = 0;
        for (let I of B) G.set(I, F), F += I.length;
        return G
    }
    _3(s0A, "collectReadableStream")
});