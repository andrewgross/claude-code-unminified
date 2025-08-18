/* chunk:139 bytes:[3144580, 3164374) size:19794 source:unpacked-cli.js */
var SA0 = E((S65, NSA) => {
    var {
        promisify: dkQ
    } = W1("node:util"), ckQ = I41(), {
        buildMockDispatch: lkQ
    } = w41(), {
        kDispatches: HSA,
        kMockAgent: zSA,
        kClose: ESA,
        kOriginalClose: USA,
        kOrigin: wSA,
        kOriginalDispatch: pkQ,
        kConnected: PA0
    } = ln(), {
        MockInterceptor: ikQ
    } = TA0(), $SA = VZ(), {
        InvalidArgumentError: nkQ
    } = $5();
    class qSA extends ckQ {
        constructor(A, B) {
            super(A, B);
            if (!B || !B.agent || typeof B.agent.dispatch !== "function") throw new nkQ("Argument opts.agent must implement Agent");
            this[zSA] = B.agent, this[wSA] = A, this[HSA] = [], this[PA0] = 1, this[pkQ] = this.dispatch, this[USA] = this.close.bind(this), this.dispatch = lkQ.call(this), this.close = this[ESA]
        }
        get[$SA.kConnected]() {
            return this[PA0]
        }
        intercept(A) {
            return new ikQ(A, this[HSA])
        }
        async [ESA]() {
            await dkQ(this[USA])(), this[PA0] = 0, this[zSA][$SA.kClients].delete(this[wSA])
        }
    }
    NSA.exports = qSA
});
var kA0 = E((j65, jSA) => {
    var {
        promisify: akQ
    } = W1("node:util"), skQ = bn(), {
        buildMockDispatch: rkQ
    } = w41(), {
        kDispatches: LSA,
        kMockAgent: MSA,
        kClose: RSA,
        kOriginalClose: OSA,
        kOrigin: TSA,
        kOriginalDispatch: okQ,
        kConnected: jA0
    } = ln(), {
        MockInterceptor: tkQ
    } = TA0(), PSA = VZ(), {
        InvalidArgumentError: ekQ
    } = $5();
    class SSA extends skQ {
        constructor(A, B) {
            super(A, B);
            if (!B || !B.agent || typeof B.agent.dispatch !== "function") throw new ekQ("Argument opts.agent must implement Agent");
            this[MSA] = B.agent, this[TSA] = A, this[LSA] = [], this[jA0] = 1, this[okQ] = this.dispatch, this[OSA] = this.close.bind(this), this.dispatch = rkQ.call(this), this.close = this[RSA]
        }
        get[PSA.kConnected]() {
            return this[jA0]
        }
        intercept(A) {
            return new tkQ(A, this[LSA])
        }
        async [RSA]() {
            await akQ(this[OSA])(), this[jA0] = 0, this[MSA][PSA.kClients].delete(this[TSA])
        }
    }
    jSA.exports = SSA
});
var ySA = E((k65, kSA) => {
    var AyQ = {
            pronoun: "it",
            is: "is",
            was: "was",
            this: "this"
        },
        ByQ = {
            pronoun: "they",
            is: "are",
            was: "were",
            this: "these"
        };
    kSA.exports = class A {
        constructor(B, Q) {
            this.singular = B, this.plural = Q
        }
        pluralize(B) {
            let Q = B === 1,
                Z = Q ? AyQ : ByQ,
                D = Q ? this.singular : this.plural;
            return {
                ...Z,
                count: B,
                noun: D
            }
        }
    }
});
var xSA = E((y65, _SA) => {
    var {
        Transform: QyQ
    } = W1("node:stream"), {
        Console: ZyQ
    } = W1("node:console"), DyQ = process.versions.icu ? "✅" : "Y ", GyQ = process.versions.icu ? "❌" : "N ";
    _SA.exports = class A {
        constructor({
            disableColors: B
        } = {}) {
            this.transform = new QyQ({
                transform(Q, Z, D) {
                    D(null, Q)
                }
            }), this.logger = new ZyQ({
                stdout: this.transform,
                inspectOptions: {
                    colors: !B && !0
                }
            })
        }
        format(B) {
            let Q = B.map(({
                method: Z,
                path: D,
                data: {
                    statusCode: G
                },
                persist: F,
                times: I,
                timesInvoked: Y,
                origin: W
            }) => ({
                Method: Z,
                Origin: W,
                Path: D,
                "Status code": G,
                Persistent: F ? DyQ : GyQ,
                Invocations: Y,
                Remaining: F ? 1 / 0 : I - Y
            }));
            return this.logger.table(Q), this.transform.read().toString()
        }
    }
});
var gSA = E((_65, hSA) => {
    var {
        kClients: eh
    } = VZ(), FyQ = fn(), {
        kAgent: yA0,
        kMockAgentSet: _U1,
        kMockAgentGet: vSA,
        kDispatches: _A0,
        kIsMockActive: xU1,
        kNetConnect: Ag,
        kGetNetConnect: IyQ,
        kOptions: vU1,
        kFactory: bU1
    } = ln(), YyQ = SA0(), WyQ = kA0(), {
        matchValue: JyQ,
        buildMockOptions: XyQ
    } = w41(), {
        InvalidArgumentError: bSA,
        UndiciError: VyQ
    } = $5(), CyQ = uQ1(), KyQ = ySA(), HyQ = xSA();
    class fSA extends CyQ {
        constructor(A) {
            super(A);
            if (this[Ag] = !0, this[xU1] = !0, A?.agent && typeof A.agent.dispatch !== "function") throw new bSA("Argument opts.agent must implement Agent");
            let B = A?.agent ? A.agent : new FyQ(A);
            this[yA0] = B, this[eh] = B[eh], this[vU1] = XyQ(A)
        }
        get(A) {
            let B = this[vSA](A);
            if (!B) B = this[bU1](A), this[_U1](A, B);
            return B
        }
        dispatch(A, B) {
            return this.get(A.origin), this[yA0].dispatch(A, B)
        }
        async close() {
            await this[yA0].close(), this[eh].clear()
        }
        deactivate() {
            this[xU1] = !1
        }
        activate() {
            this[xU1] = !0
        }
        enableNetConnect(A) {
            if (typeof A === "string" || typeof A === "function" || A instanceof RegExp)
                if (Array.isArray(this[Ag])) this[Ag].push(A);
                else this[Ag] = [A];
            else if (typeof A === "undefined") this[Ag] = !0;
            else throw new bSA("Unsupported matcher. Must be one of String|Function|RegExp.")
        }
        disableNetConnect() {
            this[Ag] = !1
        }
        get isMockActive() {
            return this[xU1]
        } [_U1](A, B) {
            this[eh].set(A, B)
        } [bU1](A) {
            let B = Object.assign({
                agent: this
            }, this[vU1]);
            return this[vU1] && this[vU1].connections === 1 ? new YyQ(A, B) : new WyQ(A, B)
        } [vSA](A) {
            let B = this[eh].get(A);
            if (B) return B;
            if (typeof A !== "string") {
                let Q = this[bU1]("http://localhost:9999");
                return this[_U1](A, Q), Q
            }
            for (let [Q, Z] of Array.from(this[eh]))
                if (Z && typeof Q !== "string" && JyQ(Q, A)) {
                    let D = this[bU1](A);
                    return this[_U1](A, D), D[_A0] = Z[_A0], D
                }
        } [IyQ]() {
            return this[Ag]
        }
        pendingInterceptors() {
            let A = this[eh];
            return Array.from(A.entries()).flatMap(([B, Q]) => Q[_A0].map((Z) => ({
                ...Z,
                origin: B
            }))).filter(({
                pending: B
            }) => B)
        }
        assertNoPendingInterceptors({
            pendingInterceptorsFormatter: A = new HyQ
        } = {}) {
            let B = this.pendingInterceptors();
            if (B.length === 0) return;
            let Q = new KyQ("interceptor", "interceptors").pluralize(B.length);
            throw new VyQ(`
${Q.count} ${Q.noun} ${Q.is} pending:

${A.format(B)}
`.trim())
        }
    }
    hSA.exports = fSA
});
var fU1 = E((x65, cSA) => {
    var uSA = Symbol.for("undici.globalDispatcher.1"),
        {
            InvalidArgumentError: zyQ
        } = $5(),
        EyQ = fn();
    if (dSA() === void 0) mSA(new EyQ);

    function mSA(A) {
        if (!A || typeof A.dispatch !== "function") throw new zyQ("Argument agent must implement Agent");
        Object.defineProperty(globalThis, uSA, {
            value: A,
            writable: !0,
            enumerable: !1,
            configurable: !1
        })
    }

    function dSA() {
        return globalThis[uSA]
    }
    cSA.exports = {
        setGlobalDispatcher: mSA,
        getGlobalDispatcher: dSA
    }
});
var hU1 = E((v65, lSA) => {
    lSA.exports = class A {
        #A;
        constructor(B) {
            if (typeof B !== "object" || B === null) throw new TypeError("handler must be an object");
            this.#A = B
        }
        onConnect(...B) {
            return this.#A.onConnect?.(...B)
        }
        onError(...B) {
            return this.#A.onError?.(...B)
        }
        onUpgrade(...B) {
            return this.#A.onUpgrade?.(...B)
        }
        onResponseStarted(...B) {
            return this.#A.onResponseStarted?.(...B)
        }
        onHeaders(...B) {
            return this.#A.onHeaders?.(...B)
        }
        onData(...B) {
            return this.#A.onData?.(...B)
        }
        onComplete(...B) {
            return this.#A.onComplete?.(...B)
        }
        onBodySent(...B) {
            return this.#A.onBodySent?.(...B)
        }
    }
});
var iSA = E((b65, pSA) => {
    var UyQ = UU1();
    pSA.exports = (A) => {
        let B = A?.maxRedirections;
        return (Q) => {
            return function Z(D, G) {
                let {
                    maxRedirections: F = B,
                    ...I
                } = D;
                if (!F) return Q(D, G);
                let Y = new UyQ(Q, F, D, G);
                return Q(I, Y)
            }
        }
    }
});
var aSA = E((f65, nSA) => {
    var wyQ = PU1();
    nSA.exports = (A) => {
        return (B) => {
            return function Q(Z, D) {
                return B(Z, new wyQ({
                    ...Z,
                    retryOptions: {
                        ...A,
                        ...Z.retryOptions
                    }
                }, {
                    handler: D,
                    dispatch: B
                }))
            }
        }
    }
});
var oSA = E((h65, rSA) => {
    var $yQ = e4(),
        {
            InvalidArgumentError: qyQ,
            RequestAbortedError: NyQ
        } = $5(),
        LyQ = hU1();
    class sSA extends LyQ {
        #A = 1048576;
        #B = null;
        #Q = !1;
        #Z = !1;
        #D = 0;
        #Y = null;
        #G = null;
        constructor({
            maxSize: A
        }, B) {
            super(B);
            if (A != null && (!Number.isFinite(A) || A < 1)) throw new qyQ("maxSize must be a number greater than 0");
            this.#A = A ?? this.#A, this.#G = B
        }
        onConnect(A) {
            this.#B = A, this.#G.onConnect(this.#J.bind(this))
        }
        #J(A) {
            this.#Z = !0, this.#Y = A
        }
        onHeaders(A, B, Q, Z) {
            let G = $yQ.parseHeaders(B)["content-length"];
            if (G != null && G > this.#A) throw new NyQ(`Response size (${G}) larger than maxSize (${this.#A})`);
            if (this.#Z) return !0;
            return this.#G.onHeaders(A, B, Q, Z)
        }
        onError(A) {
            if (this.#Q) return;
            A = this.#Y ?? A, this.#G.onError(A)
        }
        onData(A) {
            if (this.#D = this.#D + A.length, this.#D >= this.#A)
                if (this.#Q = !0, this.#Z) this.#G.onError(this.#Y);
                else this.#G.onComplete([]);
            return !0
        }
        onComplete(A) {
            if (this.#Q) return;
            if (this.#Z) {
                this.#G.onError(this.reason);
                return
            }
            this.#G.onComplete(A)
        }
    }

    function MyQ({
        maxSize: A
    } = {
        maxSize: 1048576
    }) {
        return (B) => {
            return function Q(Z, D) {
                let {
                    dumpMaxSize: G = A
                } = Z, F = new sSA({
                    maxSize: G
                }, D);
                return B(Z, F)
            }
        }
    }
    rSA.exports = MyQ
});
var QjA = E((g65, BjA) => {
    var {
        isIP: RyQ
    } = W1("node:net"), {
        lookup: OyQ
    } = W1("node:dns"), TyQ = hU1(), {
        InvalidArgumentError: pn,
        InformationalError: PyQ
    } = $5(), tSA = Math.pow(2, 31) - 1;
    class eSA {
        #A = 0;
        #B = 0;
        #Q = new Map;
        dualStack = !0;
        affinity = null;
        lookup = null;
        pick = null;
        constructor(A) {
            this.#A = A.maxTTL, this.#B = A.maxItems, this.dualStack = A.dualStack, this.affinity = A.affinity, this.lookup = A.lookup ?? this.#Z, this.pick = A.pick ?? this.#D
        }
        get full() {
            return this.#Q.size === this.#B
        }
        runLookup(A, B, Q) {
            let Z = this.#Q.get(A.hostname);
            if (Z == null && this.full) {
                Q(null, A.origin);
                return
            }
            let D = {
                affinity: this.affinity,
                dualStack: this.dualStack,
                lookup: this.lookup,
                pick: this.pick,
                ...B.dns,
                maxTTL: this.#A,
                maxItems: this.#B
            };
            if (Z == null) this.lookup(A, D, (G, F) => {
                if (G || F == null || F.length === 0) {
                    Q(G ?? new PyQ("No DNS entries found"));
                    return
                }
                this.setRecords(A, F);
                let I = this.#Q.get(A.hostname),
                    Y = this.pick(A, I, D.affinity),
                    W;
                if (typeof Y.port === "number") W = `:${Y.port}`;
                else if (A.port !== "") W = `:${A.port}`;
                else W = "";
                Q(null, `${A.protocol}//${Y.family===6?`[${Y.address}]`:Y.address}${W}`)
            });
            else {
                let G = this.pick(A, Z, D.affinity);
                if (G == null) {
                    this.#Q.delete(A.hostname), this.runLookup(A, B, Q);
                    return
                }
                let F;
                if (typeof G.port === "number") F = `:${G.port}`;
                else if (A.port !== "") F = `:${A.port}`;
                else F = "";
                Q(null, `${A.protocol}//${G.family===6?`[${G.address}]`:G.address}${F}`)
            }
        }
        #Z(A, B, Q) {
            OyQ(A.hostname, {
                all: !0,
                family: this.dualStack === !1 ? this.affinity : 0,
                order: "ipv4first"
            }, (Z, D) => {
                if (Z) return Q(Z);
                let G = new Map;
                for (let F of D) G.set(`${F.address}:${F.family}`, F);
                Q(null, G.values())
            })
        }
        #D(A, B, Q) {
            let Z = null,
                {
                    records: D,
                    offset: G
                } = B,
                F;
            if (this.dualStack) {
                if (Q == null)
                    if (G == null || G === tSA) B.offset = 0, Q = 4;
                    else B.offset++, Q = (B.offset & 1) === 1 ? 6 : 4;
                if (D[Q] != null && D[Q].ips.length > 0) F = D[Q];
                else F = D[Q === 4 ? 6 : 4]
            } else F = D[Q];
            if (F == null || F.ips.length === 0) return Z;
            if (F.offset == null || F.offset === tSA) F.offset = 0;
            else F.offset++;
            let I = F.offset % F.ips.length;
            if (Z = F.ips[I] ?? null, Z == null) return Z;
            if (Date.now() - Z.timestamp > Z.ttl) return F.ips.splice(I, 1), this.pick(A, B, Q);
            return Z
        }
        setRecords(A, B) {
            let Q = Date.now(),
                Z = {
                    records: {
                        4: null,
                        6: null
                    }
                };
            for (let D of B) {
                if (D.timestamp = Q, typeof D.ttl === "number") D.ttl = Math.min(D.ttl, this.#A);
                else D.ttl = this.#A;
                let G = Z.records[D.family] ?? {
                    ips: []
                };
                G.ips.push(D), Z.records[D.family] = G
            }
            this.#Q.set(A.hostname, Z)
        }
        getHandler(A, B) {
            return new AjA(this, A, B)
        }
    }
    class AjA extends TyQ {
        #A = null;
        #B = null;
        #Q = null;
        #Z = null;
        #D = null;
        constructor(A, {
            origin: B,
            handler: Q,
            dispatch: Z
        }, D) {
            super(Q);
            this.#D = B, this.#Z = Q, this.#B = {
                ...D
            }, this.#A = A, this.#Q = Z
        }
        onError(A) {
            switch (A.code) {
                case "ETIMEDOUT":
                case "ECONNREFUSED": {
                    if (this.#A.dualStack) {
                        this.#A.runLookup(this.#D, this.#B, (B, Q) => {
                            if (B) return this.#Z.onError(B);
                            let Z = {
                                ...this.#B,
                                origin: Q
                            };
                            this.#Q(Z, this)
                        });
                        return
                    }
                    this.#Z.onError(A);
                    return
                }
                case "ENOTFOUND":
                    this.#A.deleteRecord(this.#D);
                default:
                    this.#Z.onError(A);
                    break
            }
        }
    }
    BjA.exports = (A) => {
        if (A?.maxTTL != null && (typeof A?.maxTTL !== "number" || A?.maxTTL < 0)) throw new pn("Invalid maxTTL. Must be a positive number");
        if (A?.maxItems != null && (typeof A?.maxItems !== "number" || A?.maxItems < 1)) throw new pn("Invalid maxItems. Must be a positive number and greater than zero");
        if (A?.affinity != null && A?.affinity !== 4 && A?.affinity !== 6) throw new pn("Invalid affinity. Must be either 4 or 6");
        if (A?.dualStack != null && typeof A?.dualStack !== "boolean") throw new pn("Invalid dualStack. Must be a boolean");
        if (A?.lookup != null && typeof A?.lookup !== "function") throw new pn("Invalid lookup. Must be a function");
        if (A?.pick != null && typeof A?.pick !== "function") throw new pn("Invalid pick. Must be a function");
        let B = A?.dualStack ?? !0,
            Q;
        if (B) Q = A?.affinity ?? null;
        else Q = A?.affinity ?? 4;
        let Z = {
                maxTTL: A?.maxTTL ?? 1e4,
                lookup: A?.lookup ?? null,
                pick: A?.pick ?? null,
                dualStack: B,
                affinity: Q,
                maxItems: A?.maxItems ?? 1 / 0
            },
            D = new eSA(Z);
        return (G) => {
            return function F(I, Y) {
                let W = I.origin.constructor === URL ? I.origin : new URL(I.origin);
                if (RyQ(W.hostname) !== 0) return G(I, Y);
                return D.runLookup(W, I, (J, X) => {
                    if (J) return Y.onError(J);
                    let V = null;
                    V = {
                        ...I,
                        servername: W.hostname,
                        origin: X,
                        headers: {
                            host: W.hostname,
                            ...I.headers
                        }
                    }, G(V, D.getHandler({
                        origin: W,
                        dispatch: G,
                        handler: Y
                    }, I))
                }), !0
            }
        }
    }
});