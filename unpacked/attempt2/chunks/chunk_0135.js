/* chunk:135 bytes:[3071136, 3088907) size:17771 source:unpacked-cli.js */
var bn = E((X65, PTA) => {
    var {
        PoolBase: _SQ,
        kClients: LTA,
        kNeedDrain: xSQ,
        kAddClient: vSQ,
        kGetDispatcher: bSQ
    } = o00(), fSQ = I41(), {
        InvalidArgumentError: t00
    } = $5(), MTA = e4(), {
        kUrl: RTA,
        kInterceptors: hSQ
    } = VZ(), gSQ = dQ1(), e00 = Symbol("options"), AA0 = Symbol("connections"), OTA = Symbol("factory");

    function uSQ(A, B) {
        return new fSQ(A, B)
    }
    class TTA extends _SQ {
        constructor(A, {
            connections: B,
            factory: Q = uSQ,
            connect: Z,
            connectTimeout: D,
            tls: G,
            maxCachedSessions: F,
            socketPath: I,
            autoSelectFamily: Y,
            autoSelectFamilyAttemptTimeout: W,
            allowH2: J,
            ...X
        } = {}) {
            super();
            if (B != null && (!Number.isFinite(B) || B < 0)) throw new t00("invalid connections");
            if (typeof Q !== "function") throw new t00("factory must be a function.");
            if (Z != null && typeof Z !== "function" && typeof Z !== "object") throw new t00("connect must be a function or an object");
            if (typeof Z !== "function") Z = gSQ({
                ...G,
                maxCachedSessions: F,
                allowH2: J,
                socketPath: I,
                timeout: D,
                ...Y ? {
                    autoSelectFamily: Y,
                    autoSelectFamilyAttemptTimeout: W
                } : void 0,
                ...Z
            });
            this[hSQ] = X.interceptors?.Pool && Array.isArray(X.interceptors.Pool) ? X.interceptors.Pool : [], this[AA0] = B || null, this[RTA] = MTA.parseOrigin(A), this[e00] = {
                ...MTA.deepClone(X),
                connect: Z,
                allowH2: J
            }, this[e00].interceptors = X.interceptors ? {
                ...X.interceptors
            } : void 0, this[OTA] = Q
        } [bSQ]() {
            for (let A of this[LTA])
                if (!A[xSQ]) return A;
            if (!this[AA0] || this[LTA].length < this[AA0]) {
                let A = this[OTA](this[RTA], this[e00]);
                return this[vSQ](A), A
            }
        }
    }
    PTA.exports = TTA
});
var xTA = E((V65, _TA) => {
    var {
        BalancedPoolMissingUpstreamError: mSQ,
        InvalidArgumentError: dSQ
    } = $5(), {
        PoolBase: cSQ,
        kClients: iW,
        kNeedDrain: J41,
        kAddClient: lSQ,
        kRemoveClient: pSQ,
        kGetDispatcher: iSQ
    } = o00(), nSQ = bn(), {
        kUrl: BA0,
        kInterceptors: aSQ
    } = VZ(), {
        parseOrigin: STA
    } = e4(), jTA = Symbol("factory"), qU1 = Symbol("options"), kTA = Symbol("kGreatestCommonDivisor"), sh = Symbol("kCurrentWeight"), rh = Symbol("kIndex"), Rz = Symbol("kWeight"), NU1 = Symbol("kMaxWeightPerServer"), LU1 = Symbol("kErrorPenalty");

    function sSQ(A, B) {
        if (A === 0) return B;
        while (B !== 0) {
            let Q = B;
            B = A % B, A = Q
        }
        return A
    }

    function rSQ(A, B) {
        return new nSQ(A, B)
    }
    class yTA extends cSQ {
        constructor(A = [], {
            factory: B = rSQ,
            ...Q
        } = {}) {
            super();
            if (this[qU1] = Q, this[rh] = -1, this[sh] = 0, this[NU1] = this[qU1].maxWeightPerServer || 100, this[LU1] = this[qU1].errorPenalty || 15, !Array.isArray(A)) A = [A];
            if (typeof B !== "function") throw new dSQ("factory must be a function.");
            this[aSQ] = Q.interceptors?.BalancedPool && Array.isArray(Q.interceptors.BalancedPool) ? Q.interceptors.BalancedPool : [], this[jTA] = B;
            for (let Z of A) this.addUpstream(Z);
            this._updateBalancedPoolStats()
        }
        addUpstream(A) {
            let B = STA(A).origin;
            if (this[iW].find((Z) => Z[BA0].origin === B && Z.closed !== !0 && Z.destroyed !== !0)) return this;
            let Q = this[jTA](B, Object.assign({}, this[qU1]));
            this[lSQ](Q), Q.on("connect", () => {
                Q[Rz] = Math.min(this[NU1], Q[Rz] + this[LU1])
            }), Q.on("connectionError", () => {
                Q[Rz] = Math.max(1, Q[Rz] - this[LU1]), this._updateBalancedPoolStats()
            }), Q.on("disconnect", (...Z) => {
                let D = Z[2];
                if (D && D.code === "UND_ERR_SOCKET") Q[Rz] = Math.max(1, Q[Rz] - this[LU1]), this._updateBalancedPoolStats()
            });
            for (let Z of this[iW]) Z[Rz] = this[NU1];
            return this._updateBalancedPoolStats(), this
        }
        _updateBalancedPoolStats() {
            let A = 0;
            for (let B = 0; B < this[iW].length; B++) A = sSQ(this[iW][B][Rz], A);
            this[kTA] = A
        }
        removeUpstream(A) {
            let B = STA(A).origin,
                Q = this[iW].find((Z) => Z[BA0].origin === B && Z.closed !== !0 && Z.destroyed !== !0);
            if (Q) this[pSQ](Q);
            return this
        }
        get upstreams() {
            return this[iW].filter((A) => A.closed !== !0 && A.destroyed !== !0).map((A) => A[BA0].origin)
        } [iSQ]() {
            if (this[iW].length === 0) throw new mSQ;
            if (!this[iW].find((D) => !D[J41] && D.closed !== !0 && D.destroyed !== !0)) return;
            if (this[iW].map((D) => D[J41]).reduce((D, G) => D && G, !0)) return;
            let Q = 0,
                Z = this[iW].findIndex((D) => !D[J41]);
            while (Q++ < this[iW].length) {
                this[rh] = (this[rh] + 1) % this[iW].length;
                let D = this[iW][this[rh]];
                if (D[Rz] > this[iW][Z][Rz] && !D[J41]) Z = this[rh];
                if (this[rh] === 0) {
                    if (this[sh] = this[sh] - this[kTA], this[sh] <= 0) this[sh] = this[NU1]
                }
                if (D[Rz] >= this[sh] && !D[J41]) return D
            }
            return this[sh] = this[iW][Z][Rz], this[rh] = Z, this[iW][Z]
        }
    }
    _TA.exports = yTA
});
var fn = E((C65, dTA) => {
    var {
        InvalidArgumentError: MU1
    } = $5(), {
        kClients: Zy,
        kRunning: vTA,
        kClose: oSQ,
        kDestroy: tSQ,
        kDispatch: eSQ,
        kInterceptors: AjQ
    } = VZ(), BjQ = $n(), QjQ = bn(), ZjQ = I41(), DjQ = e4(), GjQ = wU1(), bTA = Symbol("onConnect"), fTA = Symbol("onDisconnect"), hTA = Symbol("onConnectionError"), FjQ = Symbol("maxRedirections"), gTA = Symbol("onDrain"), uTA = Symbol("factory"), QA0 = Symbol("options");

    function IjQ(A, B) {
        return B && B.connections === 1 ? new ZjQ(A, B) : new QjQ(A, B)
    }
    class mTA extends BjQ {
        constructor({
            factory: A = IjQ,
            maxRedirections: B = 0,
            connect: Q,
            ...Z
        } = {}) {
            super();
            if (typeof A !== "function") throw new MU1("factory must be a function.");
            if (Q != null && typeof Q !== "function" && typeof Q !== "object") throw new MU1("connect must be a function or an object");
            if (!Number.isInteger(B) || B < 0) throw new MU1("maxRedirections must be a positive number");
            if (Q && typeof Q !== "function") Q = {
                ...Q
            };
            this[AjQ] = Z.interceptors?.Agent && Array.isArray(Z.interceptors.Agent) ? Z.interceptors.Agent : [GjQ({
                maxRedirections: B
            })], this[QA0] = {
                ...DjQ.deepClone(Z),
                connect: Q
            }, this[QA0].interceptors = Z.interceptors ? {
                ...Z.interceptors
            } : void 0, this[FjQ] = B, this[uTA] = A, this[Zy] = new Map, this[gTA] = (D, G) => {
                this.emit("drain", D, [this, ...G])
            }, this[bTA] = (D, G) => {
                this.emit("connect", D, [this, ...G])
            }, this[fTA] = (D, G, F) => {
                this.emit("disconnect", D, [this, ...G], F)
            }, this[hTA] = (D, G, F) => {
                this.emit("connectionError", D, [this, ...G], F)
            }
        }
        get[vTA]() {
            let A = 0;
            for (let B of this[Zy].values()) A += B[vTA];
            return A
        } [eSQ](A, B) {
            let Q;
            if (A.origin && (typeof A.origin === "string" || A.origin instanceof URL)) Q = String(A.origin);
            else throw new MU1("opts.origin must be a non-empty string or URL.");
            let Z = this[Zy].get(Q);
            if (!Z) Z = this[uTA](A.origin, this[QA0]).on("drain", this[gTA]).on("connect", this[bTA]).on("disconnect", this[fTA]).on("connectionError", this[hTA]), this[Zy].set(Q, Z);
            return Z.dispatch(A, B)
        }
        async [oSQ]() {
            let A = [];
            for (let B of this[Zy].values()) A.push(B.close());
            this[Zy].clear(), await Promise.all(A)
        }
        async [tSQ](A) {
            let B = [];
            for (let Q of this[Zy].values()) B.push(Q.destroy(A));
            this[Zy].clear(), await Promise.all(B)
        }
    }
    dTA.exports = mTA
});
var DA0 = E((K65, nTA) => {
    var {
        kProxy: YjQ,
        kClose: WjQ,
        kDestroy: JjQ,
        kInterceptors: XjQ
    } = VZ(), {
        URL: X41
    } = W1("node:url"), VjQ = fn(), CjQ = bn(), KjQ = $n(), {
        InvalidArgumentError: TU1,
        RequestAbortedError: HjQ,
        SecureProxyConnectionError: zjQ
    } = $5(), cTA = dQ1(), RU1 = Symbol("proxy agent"), OU1 = Symbol("proxy client"), V41 = Symbol("proxy headers"), ZA0 = Symbol("request tls settings"), lTA = Symbol("proxy tls settings"), pTA = Symbol("connect endpoint function");

    function EjQ(A) {
        return A === "https:" ? 443 : 80
    }

    function UjQ(A, B) {
        return new CjQ(A, B)
    }
    var wjQ = () => {};
    class iTA extends KjQ {
        constructor(A) {
            super();
            if (!A || typeof A === "object" && !(A instanceof X41) && !A.uri) throw new TU1("Proxy uri is mandatory");
            let {
                clientFactory: B = UjQ
            } = A;
            if (typeof B !== "function") throw new TU1("Proxy opts.clientFactory must be a function.");
            let Q = this.#A(A),
                {
                    href: Z,
                    origin: D,
                    port: G,
                    protocol: F,
                    username: I,
                    password: Y,
                    hostname: W
                } = Q;
            if (this[YjQ] = {
                    uri: Z,
                    protocol: F
                }, this[XjQ] = A.interceptors?.ProxyAgent && Array.isArray(A.interceptors.ProxyAgent) ? A.interceptors.ProxyAgent : [], this[ZA0] = A.requestTls, this[lTA] = A.proxyTls, this[V41] = A.headers || {}, A.auth && A.token) throw new TU1("opts.auth cannot be used in combination with opts.token");
            else if (A.auth) this[V41]["proxy-authorization"] = `Basic ${A.auth}`;
            else if (A.token) this[V41]["proxy-authorization"] = A.token;
            else if (I && Y) this[V41]["proxy-authorization"] = `Basic ${Buffer.from(`${decodeURIComponent(I)}:${decodeURIComponent(Y)}`).toString("base64")}`;
            let J = cTA({
                ...A.proxyTls
            });
            this[pTA] = cTA({
                ...A.requestTls
            }), this[OU1] = B(Q, {
                connect: J
            }), this[RU1] = new VjQ({
                ...A,
                connect: async (X, V) => {
                    let C = X.host;
                    if (!X.port) C += `:${EjQ(X.protocol)}`;
                    try {
                        let {
                            socket: K,
                            statusCode: H
                        } = await this[OU1].connect({
                            origin: D,
                            port: G,
                            path: C,
                            signal: X.signal,
                            headers: {
                                ...this[V41],
                                host: X.host
                            },
                            servername: this[lTA]?.servername || W
                        });
                        if (H !== 200) K.on("error", wjQ).destroy(), V(new HjQ(`Proxy response (${H}) !== 200 when HTTP Tunneling`));
                        if (X.protocol !== "https:") {
                            V(null, K);
                            return
                        }
                        let z;
                        if (this[ZA0]) z = this[ZA0].servername;
                        else z = X.servername;
                        this[pTA]({
                            ...X,
                            servername: z,
                            httpSocket: K
                        }, V)
                    } catch (K) {
                        if (K.code === "ERR_TLS_CERT_ALTNAME_INVALID") V(new zjQ(K));
                        else V(K)
                    }
                }
            })
        }
        dispatch(A, B) {
            let Q = $jQ(A.headers);
            if (qjQ(Q), Q && !("host" in Q) && !("Host" in Q)) {
                let {
                    host: Z
                } = new X41(A.origin);
                Q.host = Z
            }
            return this[RU1].dispatch({
                ...A,
                headers: Q
            }, B)
        }
        #A(A) {
            if (typeof A === "string") return new X41(A);
            else if (A instanceof X41) return A;
            else return new X41(A.uri)
        }
        async [WjQ]() {
            await this[RU1].close(), await this[OU1].close()
        }
        async [JjQ]() {
            await this[RU1].destroy(), await this[OU1].destroy()
        }
    }

    function $jQ(A) {
        if (Array.isArray(A)) {
            let B = {};
            for (let Q = 0; Q < A.length; Q += 2) B[A[Q]] = A[Q + 1];
            return B
        }
        return A
    }

    function qjQ(A) {
        if (A && Object.keys(A).find((Q) => Q.toLowerCase() === "proxy-authorization")) throw new TU1("Proxy-Authorization should be sent in ProxyAgent constructor")
    }
    nTA.exports = iTA
});
var APA = E((H65, eTA) => {
    var NjQ = $n(),
        {
            kClose: LjQ,
            kDestroy: MjQ,
            kClosed: aTA,
            kDestroyed: sTA,
            kDispatch: RjQ,
            kNoProxyAgent: C41,
            kHttpProxyAgent: Dy,
            kHttpsProxyAgent: oh
        } = VZ(),
        rTA = DA0(),
        OjQ = fn(),
        TjQ = {
            "http:": 80,
            "https:": 443
        },
        oTA = !1;
    class tTA extends NjQ {
        #A = null;
        #B = null;
        #Q = null;
        constructor(A = {}) {
            super();
            if (this.#Q = A, !oTA) oTA = !0, process.emitWarning("EnvHttpProxyAgent is experimental, expect them to change at any time.", {
                code: "UNDICI-EHPA"
            });
            let {
                httpProxy: B,
                httpsProxy: Q,
                noProxy: Z,
                ...D
            } = A;
            this[C41] = new OjQ(D);
            let G = B ?? process.env.http_proxy ?? process.env.HTTP_PROXY;
            if (G) this[Dy] = new rTA({
                ...D,
                uri: G
            });
            else this[Dy] = this[C41];
            let F = Q ?? process.env.https_proxy ?? process.env.HTTPS_PROXY;
            if (F) this[oh] = new rTA({
                ...D,
                uri: F
            });
            else this[oh] = this[Dy];
            this.#Y()
        } [RjQ](A, B) {
            let Q = new URL(A.origin);
            return this.#Z(Q).dispatch(A, B)
        }
        async [LjQ]() {
            if (await this[C41].close(), !this[Dy][aTA]) await this[Dy].close();
            if (!this[oh][aTA]) await this[oh].close()
        }
        async [MjQ](A) {
            if (await this[C41].destroy(A), !this[Dy][sTA]) await this[Dy].destroy(A);
            if (!this[oh][sTA]) await this[oh].destroy(A)
        }
        #Z(A) {
            let {
                protocol: B,
                host: Q,
                port: Z
            } = A;
            if (Q = Q.replace(/:\d*$/, "").toLowerCase(), Z = Number.parseInt(Z, 10) || TjQ[B] || 0, !this.#D(Q, Z)) return this[C41];
            if (B === "https:") return this[oh];
            return this[Dy]
        }
        #D(A, B) {
            if (this.#G) this.#Y();
            if (this.#B.length === 0) return !0;
            if (this.#A === "*") return !1;
            for (let Q = 0; Q < this.#B.length; Q++) {
                let Z = this.#B[Q];
                if (Z.port && Z.port !== B) continue;
                if (!/^[.*]/.test(Z.hostname)) {
                    if (A === Z.hostname) return !1
                } else if (A.endsWith(Z.hostname.replace(/^\*/, ""))) return !1
            }
            return !0
        }
        #Y() {
            let A = this.#Q.noProxy ?? this.#J,
                B = A.split(/[,\s]/),
                Q = [];
            for (let Z = 0; Z < B.length; Z++) {
                let D = B[Z];
                if (!D) continue;
                let G = D.match(/^(.+):(\d+)$/);
                Q.push({
                    hostname: (G ? G[1] : D).toLowerCase(),
                    port: G ? Number.parseInt(G[2], 10) : 0
                })
            }
            this.#A = A, this.#B = Q
        }
        get #G() {
            if (this.#Q.noProxy !== void 0) return !1;
            return this.#A !== this.#J
        }
        get #J() {
            return process.env.no_proxy ?? process.env.NO_PROXY ?? ""
        }
    }
    eTA.exports = tTA
});