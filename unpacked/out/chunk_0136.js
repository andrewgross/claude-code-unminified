/* chunk:136 bytes:[3088908, 3106590) size:17682 source:unpacked-cli.js */
var PU1 = E((z65, DPA) => {
    var hn = W1("node:assert"),
        {
            kRetryHandlerDefaultRetry: BPA
        } = VZ(),
        {
            RequestRetryError: K41
        } = $5(),
        {
            isDisturbed: QPA,
            parseHeaders: PjQ,
            parseRangeHeader: ZPA,
            wrapRequestBody: SjQ
        } = e4();

    function jjQ(A) {
        let B = Date.now();
        return new Date(A).getTime() - B
    }
    class GA0 {
        constructor(A, B) {
            let {
                retryOptions: Q,
                ...Z
            } = A, {
                retry: D,
                maxRetries: G,
                maxTimeout: F,
                minTimeout: I,
                timeoutFactor: Y,
                methods: W,
                errorCodes: J,
                retryAfter: X,
                statusCodes: V
            } = Q ?? {};
            this.dispatch = B.dispatch, this.handler = B.handler, this.opts = {
                ...Z,
                body: SjQ(A.body)
            }, this.abort = null, this.aborted = !1, this.retryOpts = {
                retry: D ?? GA0[BPA],
                retryAfter: X ?? !0,
                maxTimeout: F ?? 30000,
                minTimeout: I ?? 500,
                timeoutFactor: Y ?? 2,
                maxRetries: G ?? 5,
                methods: W ?? ["GET", "HEAD", "OPTIONS", "PUT", "DELETE", "TRACE"],
                statusCodes: V ?? [500, 502, 503, 504, 429],
                errorCodes: J ?? ["ECONNRESET", "ECONNREFUSED", "ENOTFOUND", "ENETDOWN", "ENETUNREACH", "EHOSTDOWN", "EHOSTUNREACH", "EPIPE", "UND_ERR_SOCKET"]
            }, this.retryCount = 0, this.retryCountCheckpoint = 0, this.start = 0, this.end = null, this.etag = null, this.resume = null, this.handler.onConnect((C) => {
                if (this.aborted = !0, this.abort) this.abort(C);
                else this.reason = C
            })
        }
        onRequestSent() {
            if (this.handler.onRequestSent) this.handler.onRequestSent()
        }
        onUpgrade(A, B, Q) {
            if (this.handler.onUpgrade) this.handler.onUpgrade(A, B, Q)
        }
        onConnect(A) {
            if (this.aborted) A(this.reason);
            else this.abort = A
        }
        onBodySent(A) {
            if (this.handler.onBodySent) return this.handler.onBodySent(A)
        }
        static[BPA](A, {
            state: B,
            opts: Q
        }, Z) {
            let {
                statusCode: D,
                code: G,
                headers: F
            } = A, {
                method: I,
                retryOptions: Y
            } = Q, {
                maxRetries: W,
                minTimeout: J,
                maxTimeout: X,
                timeoutFactor: V,
                statusCodes: C,
                errorCodes: K,
                methods: H
            } = Y, {
                counter: z
            } = B;
            if (G && G !== "UND_ERR_REQ_RETRY" && !K.includes(G)) {
                Z(A);
                return
            }
            if (Array.isArray(H) && !H.includes(I)) {
                Z(A);
                return
            }
            if (D != null && Array.isArray(C) && !C.includes(D)) {
                Z(A);
                return
            }
            if (z > W) {
                Z(A);
                return
            }
            let $ = F?.["retry-after"];
            if ($) $ = Number($), $ = Number.isNaN($) ? jjQ($) : $ * 1000;
            let L = $ > 0 ? Math.min($, X) : Math.min(J * V ** (z - 1), X);
            setTimeout(() => Z(null), L)
        }
        onHeaders(A, B, Q, Z) {
            let D = PjQ(B);
            if (this.retryCount += 1, A >= 300)
                if (this.retryOpts.statusCodes.includes(A) === !1) return this.handler.onHeaders(A, B, Q, Z);
                else return this.abort(new K41("Request failed", A, {
                    headers: D,
                    data: {
                        count: this.retryCount
                    }
                })), !1;
            if (this.resume != null) {
                if (this.resume = null, A !== 206 && (this.start > 0 || A !== 200)) return this.abort(new K41("server does not support the range header and the payload was partially consumed", A, {
                    headers: D,
                    data: {
                        count: this.retryCount
                    }
                })), !1;
                let F = ZPA(D["content-range"]);
                if (!F) return this.abort(new K41("Content-Range mismatch", A, {
                    headers: D,
                    data: {
                        count: this.retryCount
                    }
                })), !1;
                if (this.etag != null && this.etag !== D.etag) return this.abort(new K41("ETag mismatch", A, {
                    headers: D,
                    data: {
                        count: this.retryCount
                    }
                })), !1;
                let {
                    start: I,
                    size: Y,
                    end: W = Y - 1
                } = F;
                return hn(this.start === I, "content-range mismatch"), hn(this.end == null || this.end === W, "content-range mismatch"), this.resume = Q, !0
            }
            if (this.end == null) {
                if (A === 206) {
                    let F = ZPA(D["content-range"]);
                    if (F == null) return this.handler.onHeaders(A, B, Q, Z);
                    let {
                        start: I,
                        size: Y,
                        end: W = Y - 1
                    } = F;
                    hn(I != null && Number.isFinite(I), "content-range mismatch"), hn(W != null && Number.isFinite(W), "invalid content-length"), this.start = I, this.end = W
                }
                if (this.end == null) {
                    let F = D["content-length"];
                    this.end = F != null ? Number(F) - 1 : null
                }
                if (hn(Number.isFinite(this.start)), hn(this.end == null || Number.isFinite(this.end), "invalid content-length"), this.resume = Q, this.etag = D.etag != null ? D.etag : null, this.etag != null && this.etag.startsWith("W/")) this.etag = null;
                return this.handler.onHeaders(A, B, Q, Z)
            }
            let G = new K41("Request failed", A, {
                headers: D,
                data: {
                    count: this.retryCount
                }
            });
            return this.abort(G), !1
        }
        onData(A) {
            return this.start += A.length, this.handler.onData(A)
        }
        onComplete(A) {
            return this.retryCount = 0, this.handler.onComplete(A)
        }
        onError(A) {
            if (this.aborted || QPA(this.opts.body)) return this.handler.onError(A);
            if (this.retryCount - this.retryCountCheckpoint > 0) this.retryCount = this.retryCountCheckpoint + (this.retryCount - this.retryCountCheckpoint);
            else this.retryCount += 1;
            this.retryOpts.retry(A, {
                state: {
                    counter: this.retryCount
                },
                opts: {
                    retryOptions: this.retryOpts,
                    ...this.opts
                }
            }, B.bind(this));

            function B(Q) {
                if (Q != null || this.aborted || QPA(this.opts.body)) return this.handler.onError(Q);
                if (this.start !== 0) {
                    let Z = {
                        range: `bytes=${this.start}-${this.end??""}`
                    };
                    if (this.etag != null) Z["if-match"] = this.etag;
                    this.opts = {
                        ...this.opts,
                        headers: {
                            ...this.opts.headers,
                            ...Z
                        }
                    }
                }
                try {
                    this.retryCountCheckpoint = this.retryCount, this.dispatch(this.opts, this)
                } catch (Z) {
                    this.handler.onError(Z)
                }
            }
        }
    }
    DPA.exports = GA0
});
var IPA = E((E65, FPA) => {
    var kjQ = uQ1(),
        yjQ = PU1();
    class GPA extends kjQ {
        #A = null;
        #B = null;
        constructor(A, B = {}) {
            super(B);
            this.#A = A, this.#B = B
        }
        dispatch(A, B) {
            let Q = new yjQ({
                ...A,
                retryOptions: this.#B
            }, {
                dispatch: this.#A.dispatch.bind(this.#A),
                handler: B
            });
            return this.#A.dispatch(A, Q)
        }
        close() {
            return this.#A.close()
        }
        destroy() {
            return this.#A.destroy()
        }
    }
    FPA.exports = GPA
});
var JA0 = E((U65, EPA) => {
    var VPA = W1("node:assert"),
        {
            Readable: _jQ
        } = W1("node:stream"),
        {
            RequestAbortedError: CPA,
            NotSupportedError: xjQ,
            InvalidArgumentError: vjQ,
            AbortError: FA0
        } = $5(),
        KPA = e4(),
        {
            ReadableStreamFrom: bjQ
        } = e4(),
        BK = Symbol("kConsume"),
        H41 = Symbol("kReading"),
        Gy = Symbol("kBody"),
        YPA = Symbol("kAbort"),
        HPA = Symbol("kContentType"),
        WPA = Symbol("kContentLength"),
        fjQ = () => {};
    class zPA extends _jQ {
        constructor({
            resume: A,
            abort: B,
            contentType: Q = "",
            contentLength: Z,
            highWaterMark: D = 65536
        }) {
            super({
                autoDestroy: !0,
                read: A,
                highWaterMark: D
            });
            this._readableState.dataEmitted = !1, this[YPA] = B, this[BK] = null, this[Gy] = null, this[HPA] = Q, this[WPA] = Z, this[H41] = !1
        }
        destroy(A) {
            if (!A && !this._readableState.endEmitted) A = new CPA;
            if (A) this[YPA]();
            return super.destroy(A)
        }
        _destroy(A, B) {
            if (!this[H41]) setImmediate(() => {
                B(A)
            });
            else B(A)
        }
        on(A, ...B) {
            if (A === "data" || A === "readable") this[H41] = !0;
            return super.on(A, ...B)
        }
        addListener(A, ...B) {
            return this.on(A, ...B)
        }
        off(A, ...B) {
            let Q = super.off(A, ...B);
            if (A === "data" || A === "readable") this[H41] = this.listenerCount("data") > 0 || this.listenerCount("readable") > 0;
            return Q
        }
        removeListener(A, ...B) {
            return this.off(A, ...B)
        }
        push(A) {
            if (this[BK] && A !== null) return YA0(this[BK], A), this[H41] ? super.push(A) : !0;
            return super.push(A)
        }
        async text() {
            return z41(this, "text")
        }
        async json() {
            return z41(this, "json")
        }
        async blob() {
            return z41(this, "blob")
        }
        async bytes() {
            return z41(this, "bytes")
        }
        async arrayBuffer() {
            return z41(this, "arrayBuffer")
        }
        async formData() {
            throw new xjQ
        }
        get bodyUsed() {
            return KPA.isDisturbed(this)
        }
        get body() {
            if (!this[Gy]) {
                if (this[Gy] = bjQ(this), this[BK]) this[Gy].getReader(), VPA(this[Gy].locked)
            }
            return this[Gy]
        }
        async dump(A) {
            let B = Number.isFinite(A?.limit) ? A.limit : 131072,
                Q = A?.signal;
            if (Q != null && (typeof Q !== "object" || !("aborted" in Q))) throw new vjQ("signal must be an AbortSignal");
            if (Q?.throwIfAborted(), this._readableState.closeEmitted) return null;
            return await new Promise((Z, D) => {
                if (this[WPA] > B) this.destroy(new FA0);
                let G = () => {
                    this.destroy(Q.reason ?? new FA0)
                };
                Q?.addEventListener("abort", G), this.on("close", function() {
                    if (Q?.removeEventListener("abort", G), Q?.aborted) D(Q.reason ?? new FA0);
                    else Z(null)
                }).on("error", fjQ).on("data", function(F) {
                    if (B -= F.length, B <= 0) this.destroy()
                }).resume()
            })
        }
    }

    function hjQ(A) {
        return A[Gy] && A[Gy].locked === !0 || A[BK]
    }

    function gjQ(A) {
        return KPA.isDisturbed(A) || hjQ(A)
    }
    async function z41(A, B) {
        return VPA(!A[BK]), new Promise((Q, Z) => {
            if (gjQ(A)) {
                let D = A._readableState;
                if (D.destroyed && D.closeEmitted === !1) A.on("error", (G) => {
                    Z(G)
                }).on("close", () => {
                    Z(new TypeError("unusable"))
                });
                else Z(D.errored ?? new TypeError("unusable"))
            } else queueMicrotask(() => {
                A[BK] = {
                    type: B,
                    stream: A,
                    resolve: Q,
                    reject: Z,
                    length: 0,
                    body: []
                }, A.on("error", function(D) {
                    WA0(this[BK], D)
                }).on("close", function() {
                    if (this[BK].body !== null) WA0(this[BK], new CPA)
                }), ujQ(A[BK])
            })
        })
    }

    function ujQ(A) {
        if (A.body === null) return;
        let {
            _readableState: B
        } = A.stream;
        if (B.bufferIndex) {
            let Q = B.bufferIndex,
                Z = B.buffer.length;
            for (let D = Q; D < Z; D++) YA0(A, B.buffer[D])
        } else
            for (let Q of B.buffer) YA0(A, Q);
        if (B.endEmitted) XPA(this[BK]);
        else A.stream.on("end", function() {
            XPA(this[BK])
        });
        A.stream.resume();
        while (A.stream.read() != null);
    }

    function IA0(A, B) {
        if (A.length === 0 || B === 0) return "";
        let Q = A.length === 1 ? A[0] : Buffer.concat(A, B),
            Z = Q.length,
            D = Z > 2 && Q[0] === 239 && Q[1] === 187 && Q[2] === 191 ? 3 : 0;
        return Q.utf8Slice(D, Z)
    }

    function JPA(A, B) {
        if (A.length === 0 || B === 0) return new Uint8Array(0);
        if (A.length === 1) return new Uint8Array(A[0]);
        let Q = new Uint8Array(Buffer.allocUnsafeSlow(B).buffer),
            Z = 0;
        for (let D = 0; D < A.length; ++D) {
            let G = A[D];
            Q.set(G, Z), Z += G.length
        }
        return Q
    }

    function XPA(A) {
        let {
            type: B,
            body: Q,
            resolve: Z,
            stream: D,
            length: G
        } = A;
        try {
            if (B === "text") Z(IA0(Q, G));
            else if (B === "json") Z(JSON.parse(IA0(Q, G)));
            else if (B === "arrayBuffer") Z(JPA(Q, G).buffer);
            else if (B === "blob") Z(new Blob(Q, {
                type: D[HPA]
            }));
            else if (B === "bytes") Z(JPA(Q, G));
            WA0(A)
        } catch (F) {
            D.destroy(F)
        }
    }

    function YA0(A, B) {
        A.length += B.length, A.body.push(B)
    }

    function WA0(A, B) {
        if (A.body === null) return;
        if (B) A.reject(B);
        else A.resolve();
        A.type = null, A.stream = null, A.resolve = null, A.reject = null, A.length = 0, A.body = null
    }
    EPA.exports = {
        Readable: zPA,
        chunksDecode: IA0
    }
});
var XA0 = E((w65, NPA) => {
    var mjQ = W1("node:assert"),
        {
            ResponseStatusCodeError: UPA
        } = $5(),
        {
            chunksDecode: wPA
        } = JA0();
    async function djQ({
        callback: A,
        body: B,
        contentType: Q,
        statusCode: Z,
        statusMessage: D,
        headers: G
    }) {
        mjQ(B);
        let F = [],
            I = 0;
        try {
            for await (let X of B) if (F.push(X), I += X.length, I > 131072) {
                F = [], I = 0;
                break
            }
        } catch {
            F = [], I = 0
        }
        let Y = `Response status code ${Z}${D?`: ${D}`:""}`;
        if (Z === 204 || !Q || !I) {
            queueMicrotask(() => A(new UPA(Y, Z, G)));
            return
        }
        let W = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        let J;
        try {
            if ($PA(Q)) J = JSON.parse(wPA(F, I));
            else if (qPA(Q)) J = wPA(F, I)
        } catch {} finally {
            Error.stackTraceLimit = W
        }
        queueMicrotask(() => A(new UPA(Y, Z, G, J)))
    }
    var $PA = (A) => {
            return A.length > 15 && A[11] === "/" && A[0] === "a" && A[1] === "p" && A[2] === "p" && A[3] === "l" && A[4] === "i" && A[5] === "c" && A[6] === "a" && A[7] === "t" && A[8] === "i" && A[9] === "o" && A[10] === "n" && A[12] === "j" && A[13] === "s" && A[14] === "o" && A[15] === "n"
        },
        qPA = (A) => {
            return A.length > 4 && A[4] === "/" && A[0] === "t" && A[1] === "e" && A[2] === "x" && A[3] === "t"
        };
    NPA.exports = {
        getResolveErrorBodyCallback: djQ,
        isContentTypeApplicationJson: $PA,
        isContentTypeText: qPA
    }
});