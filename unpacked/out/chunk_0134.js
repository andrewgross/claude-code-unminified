/* chunk:134 bytes:[3051712, 3071135) size:19423 source:unpacked-cli.js */
var I41 = E((I65, ITA) => {
    var BT = W1("node:assert"),
        QTA = W1("node:net"),
        dPQ = W1("node:http"),
        ih = e4(),
        {
            channels: xn
        } = zn(),
        cPQ = dMA(),
        lPQ = $n(),
        {
            InvalidArgumentError: oD,
            InformationalError: pPQ,
            ClientDestroyedError: iPQ
        } = $5(),
        nPQ = dQ1(),
        {
            kUrl: sN,
            kServerName: Ay,
            kClient: aPQ,
            kBusy: d00,
            kConnect: sPQ,
            kResuming: nh,
            kRunning: G41,
            kPending: F41,
            kSize: D41,
            kQueue: Ow,
            kConnected: rPQ,
            kConnecting: vn,
            kNeedDrain: Qy,
            kKeepAliveDefaultTimeout: oOA,
            kHostHeader: oPQ,
            kPendingIdx: Tw,
            kRunningIdx: QT,
            kError: tPQ,
            kPipelining: $U1,
            kKeepAliveTimeoutValue: ePQ,
            kMaxHeadersSize: ASQ,
            kKeepAliveMaxTimeout: BSQ,
            kKeepAliveTimeoutThreshold: QSQ,
            kHeadersTimeout: ZSQ,
            kBodyTimeout: DSQ,
            kStrictContentLength: GSQ,
            kConnector: B41,
            kMaxRedirections: FSQ,
            kMaxRequests: c00,
            kCounter: ISQ,
            kClose: YSQ,
            kDestroy: WSQ,
            kDispatch: JSQ,
            kInterceptors: tOA,
            kLocalAddress: Q41,
            kMaxResponseSize: XSQ,
            kOnError: VSQ,
            kHTTPContext: tD,
            kMaxConcurrentStreams: CSQ,
            kResume: Z41
        } = VZ(),
        KSQ = fOA(),
        HSQ = pOA(),
        eOA = !1,
        By = Symbol("kClosedResolve"),
        ATA = () => {};

    function ZTA(A) {
        return A[$U1] ?? A[tD]?.defaultPipelining ?? 1
    }
    class DTA extends lPQ {
        constructor(A, {
            interceptors: B,
            maxHeaderSize: Q,
            headersTimeout: Z,
            socketTimeout: D,
            requestTimeout: G,
            connectTimeout: F,
            bodyTimeout: I,
            idleTimeout: Y,
            keepAlive: W,
            keepAliveTimeout: J,
            maxKeepAliveTimeout: X,
            keepAliveMaxTimeout: V,
            keepAliveTimeoutThreshold: C,
            socketPath: K,
            pipelining: H,
            tls: z,
            strictContentLength: $,
            maxCachedSessions: L,
            maxRedirections: N,
            connect: R,
            maxRequestsPerClient: O,
            localAddress: P,
            maxResponseSize: j,
            autoSelectFamily: f,
            autoSelectFamilyAttemptTimeout: k,
            maxConcurrentStreams: c,
            allowH2: u
        } = {}) {
            super();
            if (W !== void 0) throw new oD("unsupported keepAlive, use pipelining=0 instead");
            if (D !== void 0) throw new oD("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
            if (G !== void 0) throw new oD("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
            if (Y !== void 0) throw new oD("unsupported idleTimeout, use keepAliveTimeout instead");
            if (X !== void 0) throw new oD("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
            if (Q != null && !Number.isFinite(Q)) throw new oD("invalid maxHeaderSize");
            if (K != null && typeof K !== "string") throw new oD("invalid socketPath");
            if (F != null && (!Number.isFinite(F) || F < 0)) throw new oD("invalid connectTimeout");
            if (J != null && (!Number.isFinite(J) || J <= 0)) throw new oD("invalid keepAliveTimeout");
            if (V != null && (!Number.isFinite(V) || V <= 0)) throw new oD("invalid keepAliveMaxTimeout");
            if (C != null && !Number.isFinite(C)) throw new oD("invalid keepAliveTimeoutThreshold");
            if (Z != null && (!Number.isInteger(Z) || Z < 0)) throw new oD("headersTimeout must be a positive integer or zero");
            if (I != null && (!Number.isInteger(I) || I < 0)) throw new oD("bodyTimeout must be a positive integer or zero");
            if (R != null && typeof R !== "function" && typeof R !== "object") throw new oD("connect must be a function or an object");
            if (N != null && (!Number.isInteger(N) || N < 0)) throw new oD("maxRedirections must be a positive number");
            if (O != null && (!Number.isInteger(O) || O < 0)) throw new oD("maxRequestsPerClient must be a positive number");
            if (P != null && (typeof P !== "string" || QTA.isIP(P) === 0)) throw new oD("localAddress must be valid string IP address");
            if (j != null && (!Number.isInteger(j) || j < -1)) throw new oD("maxResponseSize must be a positive number");
            if (k != null && (!Number.isInteger(k) || k < -1)) throw new oD("autoSelectFamilyAttemptTimeout must be a positive number");
            if (u != null && typeof u !== "boolean") throw new oD("allowH2 must be a valid boolean value");
            if (c != null && (typeof c !== "number" || c < 1)) throw new oD("maxConcurrentStreams must be a positive integer, greater than 0");
            if (typeof R !== "function") R = nPQ({
                ...z,
                maxCachedSessions: L,
                allowH2: u,
                socketPath: K,
                timeout: F,
                ...f ? {
                    autoSelectFamily: f,
                    autoSelectFamilyAttemptTimeout: k
                } : void 0,
                ...R
            });
            if (B?.Client && Array.isArray(B.Client)) {
                if (this[tOA] = B.Client, !eOA) eOA = !0, process.emitWarning("Client.Options#interceptor is deprecated. Use Dispatcher#compose instead.", {
                    code: "UNDICI-CLIENT-INTERCEPTOR-DEPRECATED"
                })
            } else this[tOA] = [zSQ({
                maxRedirections: N
            })];
            this[sN] = ih.parseOrigin(A), this[B41] = R, this[$U1] = H != null ? H : 1, this[ASQ] = Q || dPQ.maxHeaderSize, this[oOA] = J == null ? 4000 : J, this[BSQ] = V == null ? 600000 : V, this[QSQ] = C == null ? 2000 : C, this[ePQ] = this[oOA], this[Ay] = null, this[Q41] = P != null ? P : null, this[nh] = 0, this[Qy] = 0, this[oPQ] = `host: ${this[sN].hostname}${this[sN].port?`:${this[sN].port}`:""}\r
`, this[DSQ] = I != null ? I : 300000, this[ZSQ] = Z != null ? Z : 300000, this[GSQ] = $ == null ? !0 : $, this[FSQ] = N, this[c00] = O, this[By] = null, this[XSQ] = j > -1 ? j : -1, this[CSQ] = c != null ? c : 100, this[tD] = null, this[Ow] = [], this[QT] = 0, this[Tw] = 0, this[Z41] = (a) => l00(this, a), this[VSQ] = (a) => GTA(this, a)
        }
        get pipelining() {
            return this[$U1]
        }
        set pipelining(A) {
            this[$U1] = A, this[Z41](!0)
        }
        get[F41]() {
            return this[Ow].length - this[Tw]
        }
        get[G41]() {
            return this[Tw] - this[QT]
        }
        get[D41]() {
            return this[Ow].length - this[QT]
        }
        get[rPQ]() {
            return !!this[tD] && !this[vn] && !this[tD].destroyed
        }
        get[d00]() {
            return Boolean(this[tD]?.busy(null) || this[D41] >= (ZTA(this) || 1) || this[F41] > 0)
        } [sPQ](A) {
            FTA(this), this.once("connect", A)
        } [JSQ](A, B) {
            let Q = A.origin || this[sN].origin,
                Z = new cPQ(Q, A, B);
            if (this[Ow].push(Z), this[nh]);
            else if (ih.bodyLength(Z.body) == null && ih.isIterable(Z.body)) this[nh] = 1, queueMicrotask(() => l00(this));
            else this[Z41](!0);
            if (this[nh] && this[Qy] !== 2 && this[d00]) this[Qy] = 2;
            return this[Qy] < 2
        }
        async [YSQ]() {
            return new Promise((A) => {
                if (this[D41]) this[By] = A;
                else A(null)
            })
        }
        async [WSQ](A) {
            return new Promise((B) => {
                let Q = this[Ow].splice(this[Tw]);
                for (let D = 0; D < Q.length; D++) {
                    let G = Q[D];
                    ih.errorRequest(this, G, A)
                }
                let Z = () => {
                    if (this[By]) this[By](), this[By] = null;
                    B(null)
                };
                if (this[tD]) this[tD].destroy(A, Z), this[tD] = null;
                else queueMicrotask(Z);
                this[Z41]()
            })
        }
    }
    var zSQ = wU1();

    function GTA(A, B) {
        if (A[G41] === 0 && B.code !== "UND_ERR_INFO" && B.code !== "UND_ERR_SOCKET") {
            BT(A[Tw] === A[QT]);
            let Q = A[Ow].splice(A[QT]);
            for (let Z = 0; Z < Q.length; Z++) {
                let D = Q[Z];
                ih.errorRequest(A, D, B)
            }
            BT(A[D41] === 0)
        }
    }
    async function FTA(A) {
        BT(!A[vn]), BT(!A[tD]);
        let {
            host: B,
            hostname: Q,
            protocol: Z,
            port: D
        } = A[sN];
        if (Q[0] === "[") {
            let G = Q.indexOf("]");
            BT(G !== -1);
            let F = Q.substring(1, G);
            BT(QTA.isIP(F)), Q = F
        }
        if (A[vn] = !0, xn.beforeConnect.hasSubscribers) xn.beforeConnect.publish({
            connectParams: {
                host: B,
                hostname: Q,
                protocol: Z,
                port: D,
                version: A[tD]?.version,
                servername: A[Ay],
                localAddress: A[Q41]
            },
            connector: A[B41]
        });
        try {
            let G = await new Promise((F, I) => {
                A[B41]({
                    host: B,
                    hostname: Q,
                    protocol: Z,
                    port: D,
                    servername: A[Ay],
                    localAddress: A[Q41]
                }, (Y, W) => {
                    if (Y) I(Y);
                    else F(W)
                })
            });
            if (A.destroyed) {
                ih.destroy(G.on("error", ATA), new iPQ);
                return
            }
            BT(G);
            try {
                A[tD] = G.alpnProtocol === "h2" ? await HSQ(A, G) : await KSQ(A, G)
            } catch (F) {
                throw G.destroy().on("error", ATA), F
            }
            if (A[vn] = !1, G[ISQ] = 0, G[c00] = A[c00], G[aPQ] = A, G[tPQ] = null, xn.connected.hasSubscribers) xn.connected.publish({
                connectParams: {
                    host: B,
                    hostname: Q,
                    protocol: Z,
                    port: D,
                    version: A[tD]?.version,
                    servername: A[Ay],
                    localAddress: A[Q41]
                },
                connector: A[B41],
                socket: G
            });
            A.emit("connect", A[sN], [A])
        } catch (G) {
            if (A.destroyed) return;
            if (A[vn] = !1, xn.connectError.hasSubscribers) xn.connectError.publish({
                connectParams: {
                    host: B,
                    hostname: Q,
                    protocol: Z,
                    port: D,
                    version: A[tD]?.version,
                    servername: A[Ay],
                    localAddress: A[Q41]
                },
                connector: A[B41],
                error: G
            });
            if (G.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
                BT(A[G41] === 0);
                while (A[F41] > 0 && A[Ow][A[Tw]].servername === A[Ay]) {
                    let F = A[Ow][A[Tw]++];
                    ih.errorRequest(A, F, G)
                }
            } else GTA(A, G);
            A.emit("connectionError", A[sN], [A], G)
        }
        A[Z41]()
    }

    function BTA(A) {
        A[Qy] = 0, A.emit("drain", A[sN], [A])
    }

    function l00(A, B) {
        if (A[nh] === 2) return;
        if (A[nh] = 2, ESQ(A, B), A[nh] = 0, A[QT] > 256) A[Ow].splice(0, A[QT]), A[Tw] -= A[QT], A[QT] = 0
    }

    function ESQ(A, B) {
        while (!0) {
            if (A.destroyed) {
                BT(A[F41] === 0);
                return
            }
            if (A[By] && !A[D41]) {
                A[By](), A[By] = null;
                return
            }
            if (A[tD]) A[tD].resume();
            if (A[d00]) A[Qy] = 2;
            else if (A[Qy] === 2) {
                if (B) A[Qy] = 1, queueMicrotask(() => BTA(A));
                else BTA(A);
                continue
            }
            if (A[F41] === 0) return;
            if (A[G41] >= (ZTA(A) || 1)) return;
            let Q = A[Ow][A[Tw]];
            if (A[sN].protocol === "https:" && A[Ay] !== Q.servername) {
                if (A[G41] > 0) return;
                A[Ay] = Q.servername, A[tD]?.destroy(new pPQ("servername changed"), () => {
                    A[tD] = null, l00(A)
                })
            }
            if (A[vn]) return;
            if (!A[tD]) {
                FTA(A);
                return
            }
            if (A[tD].destroyed) return;
            if (A[tD].busy(Q)) return;
            if (!Q.aborted && A[tD].write(Q)) A[Tw]++;
            else A[Ow].splice(A[Tw], 1)
        }
    }
    ITA.exports = DTA
});
var i00 = E((Y65, YTA) => {
    class p00 {
        constructor() {
            this.bottom = 0, this.top = 0, this.list = new Array(2048), this.next = null
        }
        isEmpty() {
            return this.top === this.bottom
        }
        isFull() {
            return (this.top + 1 & 2047) === this.bottom
        }
        push(A) {
            this.list[this.top] = A, this.top = this.top + 1 & 2047
        }
        shift() {
            let A = this.list[this.bottom];
            if (A === void 0) return null;
            return this.list[this.bottom] = void 0, this.bottom = this.bottom + 1 & 2047, A
        }
    }
    YTA.exports = class A {
        constructor() {
            this.head = this.tail = new p00
        }
        isEmpty() {
            return this.head.isEmpty()
        }
        push(B) {
            if (this.head.isFull()) this.head = this.head.next = new p00;
            this.head.push(B)
        }
        shift() {
            let B = this.tail,
                Q = B.shift();
            if (B.isEmpty() && B.next !== null) this.tail = B.next;
            return Q
        }
    }
});
var XTA = E((W65, JTA) => {
    var {
        kFree: USQ,
        kConnected: wSQ,
        kPending: $SQ,
        kQueued: qSQ,
        kRunning: NSQ,
        kSize: LSQ
    } = VZ(), ah = Symbol("pool");
    class WTA {
        constructor(A) {
            this[ah] = A
        }
        get connected() {
            return this[ah][wSQ]
        }
        get free() {
            return this[ah][USQ]
        }
        get pending() {
            return this[ah][$SQ]
        }
        get queued() {
            return this[ah][qSQ]
        }
        get running() {
            return this[ah][NSQ]
        }
        get size() {
            return this[ah][LSQ]
        }
    }
    JTA.exports = WTA
});
var o00 = E((J65, NTA) => {
    var MSQ = $n(),
        RSQ = i00(),
        {
            kConnected: n00,
            kSize: VTA,
            kRunning: CTA,
            kPending: KTA,
            kQueued: Y41,
            kBusy: OSQ,
            kFree: TSQ,
            kUrl: PSQ,
            kClose: SSQ,
            kDestroy: jSQ,
            kDispatch: kSQ
        } = VZ(),
        ySQ = XTA(),
        MV = Symbol("clients"),
        nJ = Symbol("needDrain"),
        W41 = Symbol("queue"),
        a00 = Symbol("closed resolve"),
        s00 = Symbol("onDrain"),
        HTA = Symbol("onConnect"),
        zTA = Symbol("onDisconnect"),
        ETA = Symbol("onConnectionError"),
        r00 = Symbol("get dispatcher"),
        wTA = Symbol("add client"),
        $TA = Symbol("remove client"),
        UTA = Symbol("stats");
    class qTA extends MSQ {
        constructor() {
            super();
            this[W41] = new RSQ, this[MV] = [], this[Y41] = 0;
            let A = this;
            this[s00] = function B(Q, Z) {
                let D = A[W41],
                    G = !1;
                while (!G) {
                    let F = D.shift();
                    if (!F) break;
                    A[Y41]--, G = !this.dispatch(F.opts, F.handler)
                }
                if (this[nJ] = G, !this[nJ] && A[nJ]) A[nJ] = !1, A.emit("drain", Q, [A, ...Z]);
                if (A[a00] && D.isEmpty()) Promise.all(A[MV].map((F) => F.close())).then(A[a00])
            }, this[HTA] = (B, Q) => {
                A.emit("connect", B, [A, ...Q])
            }, this[zTA] = (B, Q, Z) => {
                A.emit("disconnect", B, [A, ...Q], Z)
            }, this[ETA] = (B, Q, Z) => {
                A.emit("connectionError", B, [A, ...Q], Z)
            }, this[UTA] = new ySQ(this)
        }
        get[OSQ]() {
            return this[nJ]
        }
        get[n00]() {
            return this[MV].filter((A) => A[n00]).length
        }
        get[TSQ]() {
            return this[MV].filter((A) => A[n00] && !A[nJ]).length
        }
        get[KTA]() {
            let A = this[Y41];
            for (let {
                    [KTA]: B
                }
                of this[MV]) A += B;
            return A
        }
        get[CTA]() {
            let A = 0;
            for (let {
                    [CTA]: B
                }
                of this[MV]) A += B;
            return A
        }
        get[VTA]() {
            let A = this[Y41];
            for (let {
                    [VTA]: B
                }
                of this[MV]) A += B;
            return A
        }
        get stats() {
            return this[UTA]
        }
        async [SSQ]() {
            if (this[W41].isEmpty()) await Promise.all(this[MV].map((A) => A.close()));
            else await new Promise((A) => {
                this[a00] = A
            })
        }
        async [jSQ](A) {
            while (!0) {
                let B = this[W41].shift();
                if (!B) break;
                B.handler.onError(A)
            }
            await Promise.all(this[MV].map((B) => B.destroy(A)))
        } [kSQ](A, B) {
            let Q = this[r00]();
            if (!Q) this[nJ] = !0, this[W41].push({
                opts: A,
                handler: B
            }), this[Y41]++;
            else if (!Q.dispatch(A, B)) Q[nJ] = !0, this[nJ] = !this[r00]();
            return !this[nJ]
        } [wTA](A) {
            if (A.on("drain", this[s00]).on("connect", this[HTA]).on("disconnect", this[zTA]).on("connectionError", this[ETA]), this[MV].push(A), this[nJ]) queueMicrotask(() => {
                if (this[nJ]) this[s00](A[PSQ], [this, A])
            });
            return this
        } [$TA](A) {
            A.close(() => {
                let B = this[MV].indexOf(A);
                if (B !== -1) this[MV].splice(B, 1)
            }), this[nJ] = this[MV].some((B) => !B[nJ] && B.closed !== !0 && B.destroyed !== !0)
        }
    }
    NTA.exports = {
        PoolBase: qTA,
        kClients: MV,
        kNeedDrain: nJ,
        kAddClient: wTA,
        kRemoveClient: $TA,
        kGetDispatcher: r00
    }
});