/* chunk:137 bytes:[3106591, 3124940) size:18349 source:unpacked-cli.js */
var RPA = E(($65, CA0) => {
    var cjQ = W1("node:assert"),
        {
            Readable: ljQ
        } = JA0(),
        {
            InvalidArgumentError: gn,
            RequestAbortedError: LPA
        } = $5(),
        QK = e4(),
        {
            getResolveErrorBodyCallback: pjQ
        } = XA0(),
        {
            AsyncResource: ijQ
        } = W1("node:async_hooks");
    class VA0 extends ijQ {
        constructor(A, B) {
            if (!A || typeof A !== "object") throw new gn("invalid opts");
            let {
                signal: Q,
                method: Z,
                opaque: D,
                body: G,
                onInfo: F,
                responseHeaders: I,
                throwOnError: Y,
                highWaterMark: W
            } = A;
            try {
                if (typeof B !== "function") throw new gn("invalid callback");
                if (W && (typeof W !== "number" || W < 0)) throw new gn("invalid highWaterMark");
                if (Q && typeof Q.on !== "function" && typeof Q.addEventListener !== "function") throw new gn("signal must be an EventEmitter or EventTarget");
                if (Z === "CONNECT") throw new gn("invalid method");
                if (F && typeof F !== "function") throw new gn("invalid onInfo callback");
                super("UNDICI_REQUEST")
            } catch (J) {
                if (QK.isStream(G)) QK.destroy(G.on("error", QK.nop), J);
                throw J
            }
            if (this.method = Z, this.responseHeaders = I || null, this.opaque = D || null, this.callback = B, this.res = null, this.abort = null, this.body = G, this.trailers = {}, this.context = null, this.onInfo = F || null, this.throwOnError = Y, this.highWaterMark = W, this.signal = Q, this.reason = null, this.removeAbortListener = null, QK.isStream(G)) G.on("error", (J) => {
                this.onError(J)
            });
            if (this.signal)
                if (this.signal.aborted) this.reason = this.signal.reason ?? new LPA;
                else this.removeAbortListener = QK.addAbortListener(this.signal, () => {
                    if (this.reason = this.signal.reason ?? new LPA, this.res) QK.destroy(this.res.on("error", QK.nop), this.reason);
                    else if (this.abort) this.abort(this.reason);
                    if (this.removeAbortListener) this.res?.off("close", this.removeAbortListener), this.removeAbortListener(), this.removeAbortListener = null
                })
        }
        onConnect(A, B) {
            if (this.reason) {
                A(this.reason);
                return
            }
            cjQ(this.callback), this.abort = A, this.context = B
        }
        onHeaders(A, B, Q, Z) {
            let {
                callback: D,
                opaque: G,
                abort: F,
                context: I,
                responseHeaders: Y,
                highWaterMark: W
            } = this, J = Y === "raw" ? QK.parseRawHeaders(B) : QK.parseHeaders(B);
            if (A < 200) {
                if (this.onInfo) this.onInfo({
                    statusCode: A,
                    headers: J
                });
                return
            }
            let X = Y === "raw" ? QK.parseHeaders(B) : J,
                V = X["content-type"],
                C = X["content-length"],
                K = new ljQ({
                    resume: Q,
                    abort: F,
                    contentType: V,
                    contentLength: this.method !== "HEAD" && C ? Number(C) : null,
                    highWaterMark: W
                });
            if (this.removeAbortListener) K.on("close", this.removeAbortListener);
            if (this.callback = null, this.res = K, D !== null)
                if (this.throwOnError && A >= 400) this.runInAsyncScope(pjQ, null, {
                    callback: D,
                    body: K,
                    contentType: V,
                    statusCode: A,
                    statusMessage: Z,
                    headers: J
                });
                else this.runInAsyncScope(D, null, null, {
                    statusCode: A,
                    headers: J,
                    trailers: this.trailers,
                    opaque: G,
                    body: K,
                    context: I
                })
        }
        onData(A) {
            return this.res.push(A)
        }
        onComplete(A) {
            QK.parseHeaders(A, this.trailers), this.res.push(null)
        }
        onError(A) {
            let {
                res: B,
                callback: Q,
                body: Z,
                opaque: D
            } = this;
            if (Q) this.callback = null, queueMicrotask(() => {
                this.runInAsyncScope(Q, null, A, {
                    opaque: D
                })
            });
            if (B) this.res = null, queueMicrotask(() => {
                QK.destroy(B, A)
            });
            if (Z) this.body = null, QK.destroy(Z, A);
            if (this.removeAbortListener) B?.off("close", this.removeAbortListener), this.removeAbortListener(), this.removeAbortListener = null
        }
    }

    function MPA(A, B) {
        if (B === void 0) return new Promise((Q, Z) => {
            MPA.call(this, A, (D, G) => {
                return D ? Z(D) : Q(G)
            })
        });
        try {
            this.dispatch(A, new VA0(A, B))
        } catch (Q) {
            if (typeof B !== "function") throw Q;
            let Z = A?.opaque;
            queueMicrotask(() => B(Q, {
                opaque: Z
            }))
        }
    }
    CA0.exports = MPA;
    CA0.exports.RequestHandler = VA0
});
var E41 = E((q65, PPA) => {
    var {
        addAbortListener: njQ
    } = e4(), {
        RequestAbortedError: ajQ
    } = $5(), un = Symbol("kListener"), rN = Symbol("kSignal");

    function OPA(A) {
        if (A.abort) A.abort(A[rN]?.reason);
        else A.reason = A[rN]?.reason ?? new ajQ;
        TPA(A)
    }

    function sjQ(A, B) {
        if (A.reason = null, A[rN] = null, A[un] = null, !B) return;
        if (B.aborted) {
            OPA(A);
            return
        }
        A[rN] = B, A[un] = () => {
            OPA(A)
        }, njQ(A[rN], A[un])
    }

    function TPA(A) {
        if (!A[rN]) return;
        if ("removeEventListener" in A[rN]) A[rN].removeEventListener("abort", A[un]);
        else A[rN].removeListener("abort", A[un]);
        A[rN] = null, A[un] = null
    }
    PPA.exports = {
        addSignal: sjQ,
        removeSignal: TPA
    }
});
var _PA = E((N65, yPA) => {
    var rjQ = W1("node:assert"),
        {
            finished: ojQ,
            PassThrough: tjQ
        } = W1("node:stream"),
        {
            InvalidArgumentError: mn,
            InvalidReturnValueError: ejQ
        } = $5(),
        Pw = e4(),
        {
            getResolveErrorBodyCallback: AkQ
        } = XA0(),
        {
            AsyncResource: BkQ
        } = W1("node:async_hooks"),
        {
            addSignal: QkQ,
            removeSignal: SPA
        } = E41();
    class jPA extends BkQ {
        constructor(A, B, Q) {
            if (!A || typeof A !== "object") throw new mn("invalid opts");
            let {
                signal: Z,
                method: D,
                opaque: G,
                body: F,
                onInfo: I,
                responseHeaders: Y,
                throwOnError: W
            } = A;
            try {
                if (typeof Q !== "function") throw new mn("invalid callback");
                if (typeof B !== "function") throw new mn("invalid factory");
                if (Z && typeof Z.on !== "function" && typeof Z.addEventListener !== "function") throw new mn("signal must be an EventEmitter or EventTarget");
                if (D === "CONNECT") throw new mn("invalid method");
                if (I && typeof I !== "function") throw new mn("invalid onInfo callback");
                super("UNDICI_STREAM")
            } catch (J) {
                if (Pw.isStream(F)) Pw.destroy(F.on("error", Pw.nop), J);
                throw J
            }
            if (this.responseHeaders = Y || null, this.opaque = G || null, this.factory = B, this.callback = Q, this.res = null, this.abort = null, this.context = null, this.trailers = null, this.body = F, this.onInfo = I || null, this.throwOnError = W || !1, Pw.isStream(F)) F.on("error", (J) => {
                this.onError(J)
            });
            QkQ(this, Z)
        }
        onConnect(A, B) {
            if (this.reason) {
                A(this.reason);
                return
            }
            rjQ(this.callback), this.abort = A, this.context = B
        }
        onHeaders(A, B, Q, Z) {
            let {
                factory: D,
                opaque: G,
                context: F,
                callback: I,
                responseHeaders: Y
            } = this, W = Y === "raw" ? Pw.parseRawHeaders(B) : Pw.parseHeaders(B);
            if (A < 200) {
                if (this.onInfo) this.onInfo({
                    statusCode: A,
                    headers: W
                });
                return
            }
            this.factory = null;
            let J;
            if (this.throwOnError && A >= 400) {
                let C = (Y === "raw" ? Pw.parseHeaders(B) : W)["content-type"];
                J = new tjQ, this.callback = null, this.runInAsyncScope(AkQ, null, {
                    callback: I,
                    body: J,
                    contentType: C,
                    statusCode: A,
                    statusMessage: Z,
                    headers: W
                })
            } else {
                if (D === null) return;
                if (J = this.runInAsyncScope(D, null, {
                        statusCode: A,
                        headers: W,
                        opaque: G,
                        context: F
                    }), !J || typeof J.write !== "function" || typeof J.end !== "function" || typeof J.on !== "function") throw new ejQ("expected Writable");
                ojQ(J, {
                    readable: !1
                }, (V) => {
                    let {
                        callback: C,
                        res: K,
                        opaque: H,
                        trailers: z,
                        abort: $
                    } = this;
                    if (this.res = null, V || !K.readable) Pw.destroy(K, V);
                    if (this.callback = null, this.runInAsyncScope(C, null, V || null, {
                            opaque: H,
                            trailers: z
                        }), V) $()
                })
            }
            return J.on("drain", Q), this.res = J, (J.writableNeedDrain !== void 0 ? J.writableNeedDrain : J._writableState?.needDrain) !== !0
        }
        onData(A) {
            let {
                res: B
            } = this;
            return B ? B.write(A) : !0
        }
        onComplete(A) {
            let {
                res: B
            } = this;
            if (SPA(this), !B) return;
            this.trailers = Pw.parseHeaders(A), B.end()
        }
        onError(A) {
            let {
                res: B,
                callback: Q,
                opaque: Z,
                body: D
            } = this;
            if (SPA(this), this.factory = null, B) this.res = null, Pw.destroy(B, A);
            else if (Q) this.callback = null, queueMicrotask(() => {
                this.runInAsyncScope(Q, null, A, {
                    opaque: Z
                })
            });
            if (D) this.body = null, Pw.destroy(D, A)
        }
    }

    function kPA(A, B, Q) {
        if (Q === void 0) return new Promise((Z, D) => {
            kPA.call(this, A, B, (G, F) => {
                return G ? D(G) : Z(F)
            })
        });
        try {
            this.dispatch(A, new jPA(A, B, Q))
        } catch (Z) {
            if (typeof Q !== "function") throw Z;
            let D = A?.opaque;
            queueMicrotask(() => Q(Z, {
                opaque: D
            }))
        }
    }
    yPA.exports = kPA
});
var uPA = E((L65, gPA) => {
    var {
        Readable: vPA,
        Duplex: ZkQ,
        PassThrough: DkQ
    } = W1("node:stream"), {
        InvalidArgumentError: U41,
        InvalidReturnValueError: GkQ,
        RequestAbortedError: KA0
    } = $5(), Oz = e4(), {
        AsyncResource: FkQ
    } = W1("node:async_hooks"), {
        addSignal: IkQ,
        removeSignal: YkQ
    } = E41(), xPA = W1("node:assert"), dn = Symbol("resume");
    class bPA extends vPA {
        constructor() {
            super({
                autoDestroy: !0
            });
            this[dn] = null
        }
        _read() {
            let {
                [dn]: A
            } = this;
            if (A) this[dn] = null, A()
        }
        _destroy(A, B) {
            this._read(), B(A)
        }
    }
    class fPA extends vPA {
        constructor(A) {
            super({
                autoDestroy: !0
            });
            this[dn] = A
        }
        _read() {
            this[dn]()
        }
        _destroy(A, B) {
            if (!A && !this._readableState.endEmitted) A = new KA0;
            B(A)
        }
    }
    class hPA extends FkQ {
        constructor(A, B) {
            if (!A || typeof A !== "object") throw new U41("invalid opts");
            if (typeof B !== "function") throw new U41("invalid handler");
            let {
                signal: Q,
                method: Z,
                opaque: D,
                onInfo: G,
                responseHeaders: F
            } = A;
            if (Q && typeof Q.on !== "function" && typeof Q.addEventListener !== "function") throw new U41("signal must be an EventEmitter or EventTarget");
            if (Z === "CONNECT") throw new U41("invalid method");
            if (G && typeof G !== "function") throw new U41("invalid onInfo callback");
            super("UNDICI_PIPELINE");
            this.opaque = D || null, this.responseHeaders = F || null, this.handler = B, this.abort = null, this.context = null, this.onInfo = G || null, this.req = new bPA().on("error", Oz.nop), this.ret = new ZkQ({
                readableObjectMode: A.objectMode,
                autoDestroy: !0,
                read: () => {
                    let {
                        body: I
                    } = this;
                    if (I?.resume) I.resume()
                },
                write: (I, Y, W) => {
                    let {
                        req: J
                    } = this;
                    if (J.push(I, Y) || J._readableState.destroyed) W();
                    else J[dn] = W
                },
                destroy: (I, Y) => {
                    let {
                        body: W,
                        req: J,
                        res: X,
                        ret: V,
                        abort: C
                    } = this;
                    if (!I && !V._readableState.endEmitted) I = new KA0;
                    if (C && I) C();
                    Oz.destroy(W, I), Oz.destroy(J, I), Oz.destroy(X, I), YkQ(this), Y(I)
                }
            }).on("prefinish", () => {
                let {
                    req: I
                } = this;
                I.push(null)
            }), this.res = null, IkQ(this, Q)
        }
        onConnect(A, B) {
            let {
                ret: Q,
                res: Z
            } = this;
            if (this.reason) {
                A(this.reason);
                return
            }
            xPA(!Z, "pipeline cannot be retried"), xPA(!Q.destroyed), this.abort = A, this.context = B
        }
        onHeaders(A, B, Q) {
            let {
                opaque: Z,
                handler: D,
                context: G
            } = this;
            if (A < 200) {
                if (this.onInfo) {
                    let I = this.responseHeaders === "raw" ? Oz.parseRawHeaders(B) : Oz.parseHeaders(B);
                    this.onInfo({
                        statusCode: A,
                        headers: I
                    })
                }
                return
            }
            this.res = new fPA(Q);
            let F;
            try {
                this.handler = null;
                let I = this.responseHeaders === "raw" ? Oz.parseRawHeaders(B) : Oz.parseHeaders(B);
                F = this.runInAsyncScope(D, null, {
                    statusCode: A,
                    headers: I,
                    opaque: Z,
                    body: this.res,
                    context: G
                })
            } catch (I) {
                throw this.res.on("error", Oz.nop), I
            }
            if (!F || typeof F.on !== "function") throw new GkQ("expected Readable");
            F.on("data", (I) => {
                let {
                    ret: Y,
                    body: W
                } = this;
                if (!Y.push(I) && W.pause) W.pause()
            }).on("error", (I) => {
                let {
                    ret: Y
                } = this;
                Oz.destroy(Y, I)
            }).on("end", () => {
                let {
                    ret: I
                } = this;
                I.push(null)
            }).on("close", () => {
                let {
                    ret: I
                } = this;
                if (!I._readableState.ended) Oz.destroy(I, new KA0)
            }), this.body = F
        }
        onData(A) {
            let {
                res: B
            } = this;
            return B.push(A)
        }
        onComplete(A) {
            let {
                res: B
            } = this;
            B.push(null)
        }
        onError(A) {
            let {
                ret: B
            } = this;
            this.handler = null, Oz.destroy(B, A)
        }
    }

    function WkQ(A, B) {
        try {
            let Q = new hPA(A, B);
            return this.dispatch({
                ...A,
                body: Q.req
            }, Q), Q.ret
        } catch (Q) {
            return new DkQ().destroy(Q)
        }
    }
    gPA.exports = WkQ
});