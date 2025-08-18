/* chunk:138 bytes:[3124941, 3144579) size:19638 source:unpacked-cli.js */
var nPA = E((M65, iPA) => {
    var {
        InvalidArgumentError: HA0,
        SocketError: JkQ
    } = $5(), {
        AsyncResource: XkQ
    } = W1("node:async_hooks"), mPA = e4(), {
        addSignal: VkQ,
        removeSignal: dPA
    } = E41(), cPA = W1("node:assert");
    class lPA extends XkQ {
        constructor(A, B) {
            if (!A || typeof A !== "object") throw new HA0("invalid opts");
            if (typeof B !== "function") throw new HA0("invalid callback");
            let {
                signal: Q,
                opaque: Z,
                responseHeaders: D
            } = A;
            if (Q && typeof Q.on !== "function" && typeof Q.addEventListener !== "function") throw new HA0("signal must be an EventEmitter or EventTarget");
            super("UNDICI_UPGRADE");
            this.responseHeaders = D || null, this.opaque = Z || null, this.callback = B, this.abort = null, this.context = null, VkQ(this, Q)
        }
        onConnect(A, B) {
            if (this.reason) {
                A(this.reason);
                return
            }
            cPA(this.callback), this.abort = A, this.context = null
        }
        onHeaders() {
            throw new JkQ("bad upgrade", null)
        }
        onUpgrade(A, B, Q) {
            cPA(A === 101);
            let {
                callback: Z,
                opaque: D,
                context: G
            } = this;
            dPA(this), this.callback = null;
            let F = this.responseHeaders === "raw" ? mPA.parseRawHeaders(B) : mPA.parseHeaders(B);
            this.runInAsyncScope(Z, null, null, {
                headers: F,
                socket: Q,
                opaque: D,
                context: G
            })
        }
        onError(A) {
            let {
                callback: B,
                opaque: Q
            } = this;
            if (dPA(this), B) this.callback = null, queueMicrotask(() => {
                this.runInAsyncScope(B, null, A, {
                    opaque: Q
                })
            })
        }
    }

    function pPA(A, B) {
        if (B === void 0) return new Promise((Q, Z) => {
            pPA.call(this, A, (D, G) => {
                return D ? Z(D) : Q(G)
            })
        });
        try {
            let Q = new lPA(A, B);
            this.dispatch({
                ...A,
                method: A.method || "GET",
                upgrade: A.protocol || "Websocket"
            }, Q)
        } catch (Q) {
            if (typeof B !== "function") throw Q;
            let Z = A?.opaque;
            queueMicrotask(() => B(Q, {
                opaque: Z
            }))
        }
    }
    iPA.exports = pPA
});
var ePA = E((R65, tPA) => {
    var CkQ = W1("node:assert"),
        {
            AsyncResource: KkQ
        } = W1("node:async_hooks"),
        {
            InvalidArgumentError: zA0,
            SocketError: HkQ
        } = $5(),
        aPA = e4(),
        {
            addSignal: zkQ,
            removeSignal: sPA
        } = E41();
    class rPA extends KkQ {
        constructor(A, B) {
            if (!A || typeof A !== "object") throw new zA0("invalid opts");
            if (typeof B !== "function") throw new zA0("invalid callback");
            let {
                signal: Q,
                opaque: Z,
                responseHeaders: D
            } = A;
            if (Q && typeof Q.on !== "function" && typeof Q.addEventListener !== "function") throw new zA0("signal must be an EventEmitter or EventTarget");
            super("UNDICI_CONNECT");
            this.opaque = Z || null, this.responseHeaders = D || null, this.callback = B, this.abort = null, zkQ(this, Q)
        }
        onConnect(A, B) {
            if (this.reason) {
                A(this.reason);
                return
            }
            CkQ(this.callback), this.abort = A, this.context = B
        }
        onHeaders() {
            throw new HkQ("bad connect", null)
        }
        onUpgrade(A, B, Q) {
            let {
                callback: Z,
                opaque: D,
                context: G
            } = this;
            sPA(this), this.callback = null;
            let F = B;
            if (F != null) F = this.responseHeaders === "raw" ? aPA.parseRawHeaders(B) : aPA.parseHeaders(B);
            this.runInAsyncScope(Z, null, null, {
                statusCode: A,
                headers: F,
                socket: Q,
                opaque: D,
                context: G
            })
        }
        onError(A) {
            let {
                callback: B,
                opaque: Q
            } = this;
            if (sPA(this), B) this.callback = null, queueMicrotask(() => {
                this.runInAsyncScope(B, null, A, {
                    opaque: Q
                })
            })
        }
    }

    function oPA(A, B) {
        if (B === void 0) return new Promise((Q, Z) => {
            oPA.call(this, A, (D, G) => {
                return D ? Z(D) : Q(G)
            })
        });
        try {
            let Q = new rPA(A, B);
            this.dispatch({
                ...A,
                method: "CONNECT"
            }, Q)
        } catch (Q) {
            if (typeof B !== "function") throw Q;
            let Z = A?.opaque;
            queueMicrotask(() => B(Q, {
                opaque: Z
            }))
        }
    }
    tPA.exports = oPA
});
var ASA = E((EkQ, cn) => {
    EkQ.request = RPA();
    EkQ.stream = _PA();
    EkQ.pipeline = uPA();
    EkQ.upgrade = nPA();
    EkQ.connect = ePA()
});
var UA0 = E((O65, BSA) => {
    var {
        UndiciError: LkQ
    } = $5();
    class EA0 extends LkQ {
        constructor(A) {
            super(A);
            Error.captureStackTrace(this, EA0), this.name = "MockNotMatchedError", this.message = A || "The request does not match any registered mock dispatches", this.code = "UND_MOCK_ERR_MOCK_NOT_MATCHED"
        }
    }
    BSA.exports = {
        MockNotMatchedError: EA0
    }
});
var ln = E((T65, QSA) => {
    QSA.exports = {
        kAgent: Symbol("agent"),
        kOptions: Symbol("options"),
        kFactory: Symbol("factory"),
        kDispatches: Symbol("dispatches"),
        kDispatchKey: Symbol("dispatch key"),
        kDefaultHeaders: Symbol("default headers"),
        kDefaultTrailers: Symbol("default trailers"),
        kContentLength: Symbol("content length"),
        kMockAgent: Symbol("mock agent"),
        kMockAgentSet: Symbol("mock agent set"),
        kMockAgentGet: Symbol("mock agent get"),
        kMockDispatch: Symbol("mock dispatch"),
        kClose: Symbol("close"),
        kOriginalClose: Symbol("original agent close"),
        kOrigin: Symbol("origin"),
        kIsMockActive: Symbol("is mock active"),
        kNetConnect: Symbol("net connect"),
        kGetNetConnect: Symbol("get net connect"),
        kConnected: Symbol("connected")
    }
});
var w41 = E((P65, CSA) => {
    var {
        MockNotMatchedError: th
    } = UA0(), {
        kDispatches: SU1,
        kMockAgent: MkQ,
        kOriginalDispatch: RkQ,
        kOrigin: OkQ,
        kGetNetConnect: TkQ
    } = ln(), {
        buildURL: PkQ
    } = e4(), {
        STATUS_CODES: SkQ
    } = W1("node:http"), {
        types: {
            isPromise: jkQ
        }
    } = W1("node:util");

    function ZT(A, B) {
        if (typeof A === "string") return A === B;
        if (A instanceof RegExp) return A.test(B);
        if (typeof A === "function") return A(B) === !0;
        return !1
    }

    function DSA(A) {
        return Object.fromEntries(Object.entries(A).map(([B, Q]) => {
            return [B.toLocaleLowerCase(), Q]
        }))
    }

    function GSA(A, B) {
        if (Array.isArray(A)) {
            for (let Q = 0; Q < A.length; Q += 2)
                if (A[Q].toLocaleLowerCase() === B.toLocaleLowerCase()) return A[Q + 1];
            return
        } else if (typeof A.get === "function") return A.get(B);
        else return DSA(A)[B.toLocaleLowerCase()]
    }

    function qA0(A) {
        let B = A.slice(),
            Q = [];
        for (let Z = 0; Z < B.length; Z += 2) Q.push([B[Z], B[Z + 1]]);
        return Object.fromEntries(Q)
    }

    function FSA(A, B) {
        if (typeof A.headers === "function") {
            if (Array.isArray(B)) B = qA0(B);
            return A.headers(B ? DSA(B) : {})
        }
        if (typeof A.headers === "undefined") return !0;
        if (typeof B !== "object" || typeof A.headers !== "object") return !1;
        for (let [Q, Z] of Object.entries(A.headers)) {
            let D = GSA(B, Q);
            if (!ZT(Z, D)) return !1
        }
        return !0
    }

    function ZSA(A) {
        if (typeof A !== "string") return A;
        let B = A.split("?");
        if (B.length !== 2) return A;
        let Q = new URLSearchParams(B.pop());
        return Q.sort(), [...B, Q.toString()].join("?")
    }

    function kkQ(A, {
        path: B,
        method: Q,
        body: Z,
        headers: D
    }) {
        let G = ZT(A.path, B),
            F = ZT(A.method, Q),
            I = typeof A.body !== "undefined" ? ZT(A.body, Z) : !0,
            Y = FSA(A, D);
        return G && F && I && Y
    }

    function ISA(A) {
        if (Buffer.isBuffer(A)) return A;
        else if (A instanceof Uint8Array) return A;
        else if (A instanceof ArrayBuffer) return A;
        else if (typeof A === "object") return JSON.stringify(A);
        else return A.toString()
    }

    function YSA(A, B) {
        let Q = B.query ? PkQ(B.path, B.query) : B.path,
            Z = typeof Q === "string" ? ZSA(Q) : Q,
            D = A.filter(({
                consumed: G
            }) => !G).filter(({
                path: G
            }) => ZT(ZSA(G), Z));
        if (D.length === 0) throw new th(`Mock dispatch not matched for path '${Z}'`);
        if (D = D.filter(({
                method: G
            }) => ZT(G, B.method)), D.length === 0) throw new th(`Mock dispatch not matched for method '${B.method}' on path '${Z}'`);
        if (D = D.filter(({
                body: G
            }) => typeof G !== "undefined" ? ZT(G, B.body) : !0), D.length === 0) throw new th(`Mock dispatch not matched for body '${B.body}' on path '${Z}'`);
        if (D = D.filter((G) => FSA(G, B.headers)), D.length === 0) {
            let G = typeof B.headers === "object" ? JSON.stringify(B.headers) : B.headers;
            throw new th(`Mock dispatch not matched for headers '${G}' on path '${Z}'`)
        }
        return D[0]
    }

    function ykQ(A, B, Q) {
        let Z = {
                timesInvoked: 0,
                times: 1,
                persist: !1,
                consumed: !1
            },
            D = typeof Q === "function" ? {
                callback: Q
            } : {
                ...Q
            },
            G = {
                ...Z,
                ...B,
                pending: !0,
                data: {
                    error: null,
                    ...D
                }
            };
        return A.push(G), G
    }

    function wA0(A, B) {
        let Q = A.findIndex((Z) => {
            if (!Z.consumed) return !1;
            return kkQ(Z, B)
        });
        if (Q !== -1) A.splice(Q, 1)
    }

    function WSA(A) {
        let {
            path: B,
            method: Q,
            body: Z,
            headers: D,
            query: G
        } = A;
        return {
            path: B,
            method: Q,
            body: Z,
            headers: D,
            query: G
        }
    }

    function $A0(A) {
        let B = Object.keys(A),
            Q = [];
        for (let Z = 0; Z < B.length; ++Z) {
            let D = B[Z],
                G = A[D],
                F = Buffer.from(`${D}`);
            if (Array.isArray(G))
                for (let I = 0; I < G.length; ++I) Q.push(F, Buffer.from(`${G[I]}`));
            else Q.push(F, Buffer.from(`${G}`))
        }
        return Q
    }

    function JSA(A) {
        return SkQ[A] || "unknown"
    }
    async function _kQ(A) {
        let B = [];
        for await (let Q of A) B.push(Q);
        return Buffer.concat(B).toString("utf8")
    }

    function XSA(A, B) {
        let Q = WSA(A),
            Z = YSA(this[SU1], Q);
        if (Z.timesInvoked++, Z.data.callback) Z.data = {
            ...Z.data,
            ...Z.data.callback(A)
        };
        let {
            data: {
                statusCode: D,
                data: G,
                headers: F,
                trailers: I,
                error: Y
            },
            delay: W,
            persist: J
        } = Z, {
            timesInvoked: X,
            times: V
        } = Z;
        if (Z.consumed = !J && X >= V, Z.pending = X < V, Y !== null) return wA0(this[SU1], Q), B.onError(Y), !0;
        if (typeof W === "number" && W > 0) setTimeout(() => {
            C(this[SU1])
        }, W);
        else C(this[SU1]);

        function C(H, z = G) {
            let $ = Array.isArray(A.headers) ? qA0(A.headers) : A.headers,
                L = typeof z === "function" ? z({
                    ...A,
                    headers: $
                }) : z;
            if (jkQ(L)) {
                L.then((P) => C(H, P));
                return
            }
            let N = ISA(L),
                R = $A0(F),
                O = $A0(I);
            B.onConnect?.((P) => B.onError(P), null), B.onHeaders?.(D, R, K, JSA(D)), B.onData?.(Buffer.from(N)), B.onComplete?.(O), wA0(H, Q)
        }

        function K() {}
        return !0
    }

    function xkQ() {
        let A = this[MkQ],
            B = this[OkQ],
            Q = this[RkQ];
        return function Z(D, G) {
            if (A.isMockActive) try {
                XSA.call(this, D, G)
            } catch (F) {
                if (F instanceof th) {
                    let I = A[TkQ]();
                    if (I === !1) throw new th(`${F.message}: subsequent request to origin ${B} was not allowed (net.connect disabled)`);
                    if (VSA(I, B)) Q.call(this, D, G);
                    else throw new th(`${F.message}: subsequent request to origin ${B} was not allowed (net.connect is not enabled for this origin)`)
                } else throw F
            } else Q.call(this, D, G)
        }
    }

    function VSA(A, B) {
        let Q = new URL(B);
        if (A === !0) return !0;
        else if (Array.isArray(A) && A.some((Z) => ZT(Z, Q.host))) return !0;
        return !1
    }

    function vkQ(A) {
        if (A) {
            let {
                agent: B,
                ...Q
            } = A;
            return Q
        }
    }
    CSA.exports = {
        getResponseData: ISA,
        getMockDispatch: YSA,
        addMockDispatch: ykQ,
        deleteMockDispatch: wA0,
        buildKey: WSA,
        generateKeyValues: $A0,
        matchValue: ZT,
        getResponse: _kQ,
        getStatusText: JSA,
        mockDispatch: XSA,
        buildMockDispatch: xkQ,
        checkNetConnect: VSA,
        buildMockOptions: vkQ,
        getHeaderByName: GSA,
        buildHeadersFromArray: qA0
    }
});
var TA0 = E((gkQ, OA0) => {
    var {
        getResponseData: bkQ,
        buildKey: fkQ,
        addMockDispatch: NA0
    } = w41(), {
        kDispatches: jU1,
        kDispatchKey: kU1,
        kDefaultHeaders: LA0,
        kDefaultTrailers: MA0,
        kContentLength: RA0,
        kMockDispatch: yU1
    } = ln(), {
        InvalidArgumentError: oN
    } = $5(), {
        buildURL: hkQ
    } = e4();
    class $41 {
        constructor(A) {
            this[yU1] = A
        }
        delay(A) {
            if (typeof A !== "number" || !Number.isInteger(A) || A <= 0) throw new oN("waitInMs must be a valid integer > 0");
            return this[yU1].delay = A, this
        }
        persist() {
            return this[yU1].persist = !0, this
        }
        times(A) {
            if (typeof A !== "number" || !Number.isInteger(A) || A <= 0) throw new oN("repeatTimes must be a valid integer > 0");
            return this[yU1].times = A, this
        }
    }
    class KSA {
        constructor(A, B) {
            if (typeof A !== "object") throw new oN("opts must be an object");
            if (typeof A.path === "undefined") throw new oN("opts.path must be defined");
            if (typeof A.method === "undefined") A.method = "GET";
            if (typeof A.path === "string")
                if (A.query) A.path = hkQ(A.path, A.query);
                else {
                    let Q = new URL(A.path, "data://");
                    A.path = Q.pathname + Q.search
                } if (typeof A.method === "string") A.method = A.method.toUpperCase();
            this[kU1] = fkQ(A), this[jU1] = B, this[LA0] = {}, this[MA0] = {}, this[RA0] = !1
        }
        createMockScopeDispatchData({
            statusCode: A,
            data: B,
            responseOptions: Q
        }) {
            let Z = bkQ(B),
                D = this[RA0] ? {
                    "content-length": Z.length
                } : {},
                G = {
                    ...this[LA0],
                    ...D,
                    ...Q.headers
                },
                F = {
                    ...this[MA0],
                    ...Q.trailers
                };
            return {
                statusCode: A,
                data: B,
                headers: G,
                trailers: F
            }
        }
        validateReplyParameters(A) {
            if (typeof A.statusCode === "undefined") throw new oN("statusCode must be defined");
            if (typeof A.responseOptions !== "object" || A.responseOptions === null) throw new oN("responseOptions must be an object")
        }
        reply(A) {
            if (typeof A === "function") {
                let D = (F) => {
                        let I = A(F);
                        if (typeof I !== "object" || I === null) throw new oN("reply options callback must return an object");
                        let Y = {
                            data: "",
                            responseOptions: {},
                            ...I
                        };
                        return this.validateReplyParameters(Y), {
                            ...this.createMockScopeDispatchData(Y)
                        }
                    },
                    G = NA0(this[jU1], this[kU1], D);
                return new $41(G)
            }
            let B = {
                statusCode: A,
                data: arguments[1] === void 0 ? "" : arguments[1],
                responseOptions: arguments[2] === void 0 ? {} : arguments[2]
            };
            this.validateReplyParameters(B);
            let Q = this.createMockScopeDispatchData(B),
                Z = NA0(this[jU1], this[kU1], Q);
            return new $41(Z)
        }
        replyWithError(A) {
            if (typeof A === "undefined") throw new oN("error must be defined");
            let B = NA0(this[jU1], this[kU1], {
                error: A
            });
            return new $41(B)
        }
        defaultReplyHeaders(A) {
            if (typeof A === "undefined") throw new oN("headers must be defined");
            return this[LA0] = A, this
        }
        defaultReplyTrailers(A) {
            if (typeof A === "undefined") throw new oN("trailers must be defined");
            return this[MA0] = A, this
        }
        replyContentLength() {
            return this[RA0] = !0, this
        }
    }
    gkQ.MockInterceptor = KSA;
    gkQ.MockScope = $41
});