/* chunk:133 bytes:[3034868, 3051711) size:16843 source:unpacked-cli.js */
var pOA = E((D65, lOA) => {
    var Mz = W1("node:assert"),
        {
            pipeline: VPQ
        } = W1("node:stream"),
        j6 = e4(),
        {
            RequestContentLengthMismatchError: b00,
            RequestAbortedError: hOA,
            SocketError: eQ1,
            InformationalError: f00
        } = $5(),
        {
            kUrl: KU1,
            kReset: zU1,
            kClient: _n,
            kRunning: EU1,
            kPending: CPQ,
            kQueue: tk,
            kPendingIdx: h00,
            kRunningIdx: Lw,
            kError: Rw,
            kSocket: XI,
            kStrictContentLength: KPQ,
            kOnError: g00,
            kMaxConcurrentStreams: cOA,
            kHTTP2Session: Mw,
            kResume: ek,
            kSize: HPQ,
            kHTTPContext: zPQ
        } = VZ(),
        AT = Symbol("open streams"),
        gOA, uOA = !1,
        HU1;
    try {
        HU1 = W1("node:http2")
    } catch {
        HU1 = {
            constants: {}
        }
    }
    var {
        constants: {
            HTTP2_HEADER_AUTHORITY: EPQ,
            HTTP2_HEADER_METHOD: UPQ,
            HTTP2_HEADER_PATH: wPQ,
            HTTP2_HEADER_SCHEME: $PQ,
            HTTP2_HEADER_CONTENT_LENGTH: qPQ,
            HTTP2_HEADER_EXPECT: NPQ,
            HTTP2_HEADER_STATUS: LPQ
        }
    } = HU1;

    function MPQ(A) {
        let B = [];
        for (let [Q, Z] of Object.entries(A))
            if (Array.isArray(Z))
                for (let D of Z) B.push(Buffer.from(Q), Buffer.from(D));
            else B.push(Buffer.from(Q), Buffer.from(Z));
        return B
    }
    async function RPQ(A, B) {
        if (A[XI] = B, !uOA) uOA = !0, process.emitWarning("H2 support is experimental, expect them to change at any time.", {
            code: "UNDICI-H2"
        });
        let Q = HU1.connect(A[KU1], {
            createConnection: () => B,
            peerMaxConcurrentStreams: A[cOA]
        });
        Q[AT] = 0, Q[_n] = A, Q[XI] = B, j6.addListener(Q, "error", TPQ), j6.addListener(Q, "frameError", PPQ), j6.addListener(Q, "end", SPQ), j6.addListener(Q, "goaway", jPQ), j6.addListener(Q, "close", function() {
            let {
                [_n]: D
            } = this, {
                [XI]: G
            } = D, F = this[XI][Rw] || this[Rw] || new eQ1("closed", j6.getSocketInfo(G));
            if (D[Mw] = null, D.destroyed) {
                Mz(D[CPQ] === 0);
                let I = D[tk].splice(D[Lw]);
                for (let Y = 0; Y < I.length; Y++) {
                    let W = I[Y];
                    j6.errorRequest(D, W, F)
                }
            }
        }), Q.unref(), A[Mw] = Q, B[Mw] = Q, j6.addListener(B, "error", function(D) {
            Mz(D.code !== "ERR_TLS_CERT_ALTNAME_INVALID"), this[Rw] = D, this[_n][g00](D)
        }), j6.addListener(B, "end", function() {
            j6.destroy(this, new eQ1("other side closed", j6.getSocketInfo(this)))
        }), j6.addListener(B, "close", function() {
            let D = this[Rw] || new eQ1("closed", j6.getSocketInfo(this));
            if (A[XI] = null, this[Mw] != null) this[Mw].destroy(D);
            A[h00] = A[Lw], Mz(A[EU1] === 0), A.emit("disconnect", A[KU1], [A], D), A[ek]()
        });
        let Z = !1;
        return B.on("close", () => {
            Z = !0
        }), {
            version: "h2",
            defaultPipelining: 1 / 0,
            write(...D) {
                return yPQ(A, ...D)
            },
            resume() {
                OPQ(A)
            },
            destroy(D, G) {
                if (Z) queueMicrotask(G);
                else B.destroy(D).on("close", G)
            },
            get destroyed() {
                return B.destroyed
            },
            busy() {
                return !1
            }
        }
    }

    function OPQ(A) {
        let B = A[XI];
        if (B?.destroyed === !1)
            if (A[HPQ] === 0 && A[cOA] === 0) B.unref(), A[Mw].unref();
            else B.ref(), A[Mw].ref()
    }

    function TPQ(A) {
        Mz(A.code !== "ERR_TLS_CERT_ALTNAME_INVALID"), this[XI][Rw] = A, this[_n][g00](A)
    }

    function PPQ(A, B, Q) {
        if (Q === 0) {
            let Z = new f00(`HTTP/2: "frameError" received - type ${A}, code ${B}`);
            this[XI][Rw] = Z, this[_n][g00](Z)
        }
    }

    function SPQ() {
        let A = new eQ1("other side closed", j6.getSocketInfo(this[XI]));
        this.destroy(A), j6.destroy(this[XI], A)
    }

    function jPQ(A) {
        let B = this[Rw] || new eQ1(`HTTP/2: "GOAWAY" frame received with code ${A}`, j6.getSocketInfo(this)),
            Q = this[_n];
        if (Q[XI] = null, Q[zPQ] = null, this[Mw] != null) this[Mw].destroy(B), this[Mw] = null;
        if (j6.destroy(this[XI], B), Q[Lw] < Q[tk].length) {
            let Z = Q[tk][Q[Lw]];
            Q[tk][Q[Lw]++] = null, j6.errorRequest(Q, Z, B), Q[h00] = Q[Lw]
        }
        Mz(Q[EU1] === 0), Q.emit("disconnect", Q[KU1], [Q], B), Q[ek]()
    }

    function kPQ(A) {
        return A !== "GET" && A !== "HEAD" && A !== "OPTIONS" && A !== "TRACE" && A !== "CONNECT"
    }

    function yPQ(A, B) {
        let Q = A[Mw],
            {
                method: Z,
                path: D,
                host: G,
                upgrade: F,
                expectContinue: I,
                signal: Y,
                headers: W
            } = B,
            {
                body: J
            } = B;
        if (F) return j6.errorRequest(A, B, new Error("Upgrade not supported for H2")), !1;
        let X = {};
        for (let R = 0; R < W.length; R += 2) {
            let O = W[R + 0],
                P = W[R + 1];
            if (Array.isArray(P))
                for (let j = 0; j < P.length; j++)
                    if (X[O]) X[O] += `,${P[j]}`;
                    else X[O] = P[j];
            else X[O] = P
        }
        let V, {
            hostname: C,
            port: K
        } = A[KU1];
        X[EPQ] = G || `${C}${K?`:${K}`:""}`, X[UPQ] = Z;
        let H = (R) => {
            if (B.aborted || B.completed) return;
            if (R = R || new hOA, j6.errorRequest(A, B, R), V != null) j6.destroy(V, R);
            j6.destroy(J, R), A[tk][A[Lw]++] = null, A[ek]()
        };
        try {
            B.onConnect(H)
        } catch (R) {
            j6.errorRequest(A, B, R)
        }
        if (B.aborted) return !1;
        if (Z === "CONNECT") {
            if (Q.ref(), V = Q.request(X, {
                    endStream: !1,
                    signal: Y
                }), V.id && !V.pending) B.onUpgrade(null, null, V), ++Q[AT], A[tk][A[Lw]++] = null;
            else V.once("ready", () => {
                B.onUpgrade(null, null, V), ++Q[AT], A[tk][A[Lw]++] = null
            });
            return V.once("close", () => {
                if (Q[AT] -= 1, Q[AT] === 0) Q.unref()
            }), !0
        }
        X[wPQ] = D, X[$PQ] = "https";
        let z = Z === "PUT" || Z === "POST" || Z === "PATCH";
        if (J && typeof J.read === "function") J.read(0);
        let $ = j6.bodyLength(J);
        if (j6.isFormDataLike(J)) {
            gOA ??= Sn().extractBody;
            let [R, O] = gOA(J);
            X["content-type"] = O, J = R.stream, $ = R.length
        }
        if ($ == null) $ = B.contentLength;
        if ($ === 0 || !z) $ = null;
        if (kPQ(Z) && $ > 0 && B.contentLength != null && B.contentLength !== $) {
            if (A[KPQ]) return j6.errorRequest(A, B, new b00), !1;
            process.emitWarning(new b00)
        }
        if ($ != null) Mz(J, "no body must not have content length"), X[qPQ] = `${$}`;
        Q.ref();
        let L = Z === "GET" || Z === "HEAD" || J === null;
        if (I) X[NPQ] = "100-continue", V = Q.request(X, {
            endStream: L,
            signal: Y
        }), V.once("continue", N);
        else V = Q.request(X, {
            endStream: L,
            signal: Y
        }), N();
        return ++Q[AT], V.once("response", (R) => {
            let {
                [LPQ]: O, ...P
            } = R;
            if (B.onResponseStarted(), B.aborted) {
                let j = new hOA;
                j6.errorRequest(A, B, j), j6.destroy(V, j);
                return
            }
            if (B.onHeaders(Number(O), MPQ(P), V.resume.bind(V), "") === !1) V.pause();
            V.on("data", (j) => {
                if (B.onData(j) === !1) V.pause()
            })
        }), V.once("end", () => {
            if (V.state?.state == null || V.state.state < 6) B.onComplete([]);
            if (Q[AT] === 0) Q.unref();
            H(new f00("HTTP/2: stream half-closed (remote)")), A[tk][A[Lw]++] = null, A[h00] = A[Lw], A[ek]()
        }), V.once("close", () => {
            if (Q[AT] -= 1, Q[AT] === 0) Q.unref()
        }), V.once("error", function(R) {
            H(R)
        }), V.once("frameError", (R, O) => {
            H(new f00(`HTTP/2: "frameError" received - type ${R}, code ${O}`))
        }), !0;

        function N() {
            if (!J || $ === 0) mOA(H, V, null, A, B, A[XI], $, z);
            else if (j6.isBuffer(J)) mOA(H, V, J, A, B, A[XI], $, z);
            else if (j6.isBlobLike(J))
                if (typeof J.stream === "function") dOA(H, V, J.stream(), A, B, A[XI], $, z);
                else xPQ(H, V, J, A, B, A[XI], $, z);
            else if (j6.isStream(J)) _PQ(H, A[XI], z, V, J, A, B, $);
            else if (j6.isIterable(J)) dOA(H, V, J, A, B, A[XI], $, z);
            else Mz(!1)
        }
    }

    function mOA(A, B, Q, Z, D, G, F, I) {
        try {
            if (Q != null && j6.isBuffer(Q)) Mz(F === Q.byteLength, "buffer body must have content length"), B.cork(), B.write(Q), B.uncork(), B.end(), D.onBodySent(Q);
            if (!I) G[zU1] = !0;
            D.onRequestSent(), Z[ek]()
        } catch (Y) {
            A(Y)
        }
    }

    function _PQ(A, B, Q, Z, D, G, F, I) {
        Mz(I !== 0 || G[EU1] === 0, "stream body cannot be pipelined");
        let Y = VPQ(D, Z, (J) => {
            if (J) j6.destroy(Y, J), A(J);
            else {
                if (j6.removeAllListeners(Y), F.onRequestSent(), !Q) B[zU1] = !0;
                G[ek]()
            }
        });
        j6.addListener(Y, "data", W);

        function W(J) {
            F.onBodySent(J)
        }
    }
    async function xPQ(A, B, Q, Z, D, G, F, I) {
        Mz(F === Q.size, "blob body must have content length");
        try {
            if (F != null && F !== Q.size) throw new b00;
            let Y = Buffer.from(await Q.arrayBuffer());
            if (B.cork(), B.write(Y), B.uncork(), B.end(), D.onBodySent(Y), D.onRequestSent(), !I) G[zU1] = !0;
            Z[ek]()
        } catch (Y) {
            A(Y)
        }
    }
    async function dOA(A, B, Q, Z, D, G, F, I) {
        Mz(F !== 0 || Z[EU1] === 0, "iterator body cannot be pipelined");
        let Y = null;

        function W() {
            if (Y) {
                let X = Y;
                Y = null, X()
            }
        }
        let J = () => new Promise((X, V) => {
            if (Mz(Y === null), G[Rw]) V(G[Rw]);
            else Y = X
        });
        B.on("close", W).on("drain", W);
        try {
            for await (let X of Q) {
                if (G[Rw]) throw G[Rw];
                let V = B.write(X);
                if (D.onBodySent(X), !V) await J()
            }
            if (B.end(), D.onRequestSent(), !I) G[zU1] = !0;
            Z[ek]()
        } catch (X) {
            A(X)
        } finally {
            B.off("close", W).off("drain", W)
        }
    }
    lOA.exports = RPQ
});
var UU1 = E((G65, sOA) => {
    var aN = e4(),
        {
            kBodyUsed: A41
        } = VZ(),
        m00 = W1("node:assert"),
        {
            InvalidArgumentError: vPQ
        } = $5(),
        bPQ = W1("node:events"),
        fPQ = [300, 301, 302, 303, 307, 308],
        iOA = Symbol("body");
    class u00 {
        constructor(A) {
            this[iOA] = A, this[A41] = !1
        }
        async * [Symbol.asyncIterator]() {
            m00(!this[A41], "disturbed"), this[A41] = !0, yield* this[iOA]
        }
    }
    class aOA {
        constructor(A, B, Q, Z) {
            if (B != null && (!Number.isInteger(B) || B < 0)) throw new vPQ("maxRedirections must be a positive number");
            if (aN.validateHandler(Z, Q.method, Q.upgrade), this.dispatch = A, this.location = null, this.abort = null, this.opts = {
                    ...Q,
                    maxRedirections: 0
                }, this.maxRedirections = B, this.handler = Z, this.history = [], this.redirectionLimitReached = !1, aN.isStream(this.opts.body)) {
                if (aN.bodyLength(this.opts.body) === 0) this.opts.body.on("data", function() {
                    m00(!1)
                });
                if (typeof this.opts.body.readableDidRead !== "boolean") this.opts.body[A41] = !1, bPQ.prototype.on.call(this.opts.body, "data", function() {
                    this[A41] = !0
                })
            } else if (this.opts.body && typeof this.opts.body.pipeTo === "function") this.opts.body = new u00(this.opts.body);
            else if (this.opts.body && typeof this.opts.body !== "string" && !ArrayBuffer.isView(this.opts.body) && aN.isIterable(this.opts.body)) this.opts.body = new u00(this.opts.body)
        }
        onConnect(A) {
            this.abort = A, this.handler.onConnect(A, {
                history: this.history
            })
        }
        onUpgrade(A, B, Q) {
            this.handler.onUpgrade(A, B, Q)
        }
        onError(A) {
            this.handler.onError(A)
        }
        onHeaders(A, B, Q, Z) {
            if (this.location = this.history.length >= this.maxRedirections || aN.isDisturbed(this.opts.body) ? null : hPQ(A, B), this.opts.throwOnMaxRedirect && this.history.length >= this.maxRedirections) {
                if (this.request) this.request.abort(new Error("max redirects"));
                this.redirectionLimitReached = !0, this.abort(new Error("max redirects"));
                return
            }
            if (this.opts.origin) this.history.push(new URL(this.opts.path, this.opts.origin));
            if (!this.location) return this.handler.onHeaders(A, B, Q, Z);
            let {
                origin: D,
                pathname: G,
                search: F
            } = aN.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin))), I = F ? `${G}${F}` : G;
            if (this.opts.headers = gPQ(this.opts.headers, A === 303, this.opts.origin !== D), this.opts.path = I, this.opts.origin = D, this.opts.maxRedirections = 0, this.opts.query = null, A === 303 && this.opts.method !== "HEAD") this.opts.method = "GET", this.opts.body = null
        }
        onData(A) {
            if (this.location);
            else return this.handler.onData(A)
        }
        onComplete(A) {
            if (this.location) this.location = null, this.abort = null, this.dispatch(this.opts, this);
            else this.handler.onComplete(A)
        }
        onBodySent(A) {
            if (this.handler.onBodySent) this.handler.onBodySent(A)
        }
    }

    function hPQ(A, B) {
        if (fPQ.indexOf(A) === -1) return null;
        for (let Q = 0; Q < B.length; Q += 2)
            if (B[Q].length === 8 && aN.headerNameToString(B[Q]) === "location") return B[Q + 1]
    }

    function nOA(A, B, Q) {
        if (A.length === 4) return aN.headerNameToString(A) === "host";
        if (B && aN.headerNameToString(A).startsWith("content-")) return !0;
        if (Q && (A.length === 13 || A.length === 6 || A.length === 19)) {
            let Z = aN.headerNameToString(A);
            return Z === "authorization" || Z === "cookie" || Z === "proxy-authorization"
        }
        return !1
    }

    function gPQ(A, B, Q) {
        let Z = [];
        if (Array.isArray(A)) {
            for (let D = 0; D < A.length; D += 2)
                if (!nOA(A[D], B, Q)) Z.push(A[D], A[D + 1])
        } else if (A && typeof A === "object") {
            for (let D of Object.keys(A))
                if (!nOA(D, B, Q)) Z.push(D, A[D])
        } else m00(A == null, "headers must be an object or an array");
        return Z
    }
    sOA.exports = aOA
});
var wU1 = E((F65, rOA) => {
    var uPQ = UU1();

    function mPQ({
        maxRedirections: A
    }) {
        return (B) => {
            return function Q(Z, D) {
                let {
                    maxRedirections: G = A
                } = Z;
                if (!G) return B(Z, D);
                let F = new uPQ(B, G, Z, D);
                return Z = {
                    ...Z,
                    maxRedirections: 0
                }, B(Z, F)
            }
        }
    }
    rOA.exports = mPQ
});