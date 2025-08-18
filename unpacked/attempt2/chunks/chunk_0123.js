/* chunk:123 bytes:[2774879, 2791372) size:16493 source:unpacked-cli.js */
var zn = E((f45, bMA) => {
    var v5 = W1("node:diagnostics_channel"),
        r10 = W1("node:util"),
        pE1 = r10.debuglog("undici"),
        s10 = r10.debuglog("fetch"),
        mh = r10.debuglog("websocket"),
        vMA = !1,
        bMQ = {
            beforeConnect: v5.channel("undici:client:beforeConnect"),
            connected: v5.channel("undici:client:connected"),
            connectError: v5.channel("undici:client:connectError"),
            sendHeaders: v5.channel("undici:client:sendHeaders"),
            create: v5.channel("undici:request:create"),
            bodySent: v5.channel("undici:request:bodySent"),
            headers: v5.channel("undici:request:headers"),
            trailers: v5.channel("undici:request:trailers"),
            error: v5.channel("undici:request:error"),
            open: v5.channel("undici:websocket:open"),
            close: v5.channel("undici:websocket:close"),
            socketError: v5.channel("undici:websocket:socket_error"),
            ping: v5.channel("undici:websocket:ping"),
            pong: v5.channel("undici:websocket:pong")
        };
    if (pE1.enabled || s10.enabled) {
        let A = s10.enabled ? s10 : pE1;
        v5.channel("undici:client:beforeConnect").subscribe((B) => {
            let {
                connectParams: {
                    version: Q,
                    protocol: Z,
                    port: D,
                    host: G
                }
            } = B;
            A("connecting to %s using %s%s", `${G}${D?`:${D}`:""}`, Z, Q)
        }), v5.channel("undici:client:connected").subscribe((B) => {
            let {
                connectParams: {
                    version: Q,
                    protocol: Z,
                    port: D,
                    host: G
                }
            } = B;
            A("connected to %s using %s%s", `${G}${D?`:${D}`:""}`, Z, Q)
        }), v5.channel("undici:client:connectError").subscribe((B) => {
            let {
                connectParams: {
                    version: Q,
                    protocol: Z,
                    port: D,
                    host: G
                },
                error: F
            } = B;
            A("connection to %s using %s%s errored - %s", `${G}${D?`:${D}`:""}`, Z, Q, F.message)
        }), v5.channel("undici:client:sendHeaders").subscribe((B) => {
            let {
                request: {
                    method: Q,
                    path: Z,
                    origin: D
                }
            } = B;
            A("sending request to %s %s/%s", Q, D, Z)
        }), v5.channel("undici:request:headers").subscribe((B) => {
            let {
                request: {
                    method: Q,
                    path: Z,
                    origin: D
                },
                response: {
                    statusCode: G
                }
            } = B;
            A("received response to %s %s/%s - HTTP %d", Q, D, Z, G)
        }), v5.channel("undici:request:trailers").subscribe((B) => {
            let {
                request: {
                    method: Q,
                    path: Z,
                    origin: D
                }
            } = B;
            A("trailers received from %s %s/%s", Q, D, Z)
        }), v5.channel("undici:request:error").subscribe((B) => {
            let {
                request: {
                    method: Q,
                    path: Z,
                    origin: D
                },
                error: G
            } = B;
            A("request to %s %s/%s errored - %s", Q, D, Z, G.message)
        }), vMA = !0
    }
    if (mh.enabled) {
        if (!vMA) {
            let A = pE1.enabled ? pE1 : mh;
            v5.channel("undici:client:beforeConnect").subscribe((B) => {
                let {
                    connectParams: {
                        version: Q,
                        protocol: Z,
                        port: D,
                        host: G
                    }
                } = B;
                A("connecting to %s%s using %s%s", G, D ? `:${D}` : "", Z, Q)
            }), v5.channel("undici:client:connected").subscribe((B) => {
                let {
                    connectParams: {
                        version: Q,
                        protocol: Z,
                        port: D,
                        host: G
                    }
                } = B;
                A("connected to %s%s using %s%s", G, D ? `:${D}` : "", Z, Q)
            }), v5.channel("undici:client:connectError").subscribe((B) => {
                let {
                    connectParams: {
                        version: Q,
                        protocol: Z,
                        port: D,
                        host: G
                    },
                    error: F
                } = B;
                A("connection to %s%s using %s%s errored - %s", G, D ? `:${D}` : "", Z, Q, F.message)
            }), v5.channel("undici:client:sendHeaders").subscribe((B) => {
                let {
                    request: {
                        method: Q,
                        path: Z,
                        origin: D
                    }
                } = B;
                A("sending request to %s %s/%s", Q, D, Z)
            })
        }
        v5.channel("undici:websocket:open").subscribe((A) => {
            let {
                address: {
                    address: B,
                    port: Q
                }
            } = A;
            mh("connection opened %s%s", B, Q ? `:${Q}` : "")
        }), v5.channel("undici:websocket:close").subscribe((A) => {
            let {
                websocket: B,
                code: Q,
                reason: Z
            } = A;
            mh("closed connection to %s - %s %s", B.url, Q, Z)
        }), v5.channel("undici:websocket:socket_error").subscribe((A) => {
            mh("connection errored - %s", A.message)
        }), v5.channel("undici:websocket:ping").subscribe((A) => {
            mh("ping received")
        }), v5.channel("undici:websocket:pong").subscribe((A) => {
            mh("pong received")
        })
    }
    bMA.exports = {
        channels: bMQ
    }
});
var dMA = E((h45, mMA) => {
    var {
        InvalidArgumentError: dZ,
        NotSupportedError: fMQ
    } = $5(), sO = W1("node:assert"), {
        isValidHTTPToken: gMA,
        isValidHeaderValue: fMA,
        isStream: hMQ,
        destroy: gMQ,
        isBuffer: uMQ,
        isFormDataLike: mMQ,
        isIterable: dMQ,
        isBlobLike: cMQ,
        buildURL: lMQ,
        validateHandler: pMQ,
        getServerName: iMQ,
        normalizedMethodRecords: nMQ
    } = e4(), {
        channels: uN
    } = zn(), {
        headerNameLowerCasedRecord: hMA
    } = mE1(), aMQ = /[^\u0021-\u00ff]/, qz = Symbol("handler");
    class uMA {
        constructor(A, {
            path: B,
            method: Q,
            body: Z,
            headers: D,
            query: G,
            idempotent: F,
            blocking: I,
            upgrade: Y,
            headersTimeout: W,
            bodyTimeout: J,
            reset: X,
            throwOnError: V,
            expectContinue: C,
            servername: K
        }, H) {
            if (typeof B !== "string") throw new dZ("path must be a string");
            else if (B[0] !== "/" && !(B.startsWith("http://") || B.startsWith("https://")) && Q !== "CONNECT") throw new dZ("path must be an absolute URL or start with a slash");
            else if (aMQ.test(B)) throw new dZ("invalid request path");
            if (typeof Q !== "string") throw new dZ("method must be a string");
            else if (nMQ[Q] === void 0 && !gMA(Q)) throw new dZ("invalid request method");
            if (Y && typeof Y !== "string") throw new dZ("upgrade must be a string");
            if (W != null && (!Number.isFinite(W) || W < 0)) throw new dZ("invalid headersTimeout");
            if (J != null && (!Number.isFinite(J) || J < 0)) throw new dZ("invalid bodyTimeout");
            if (X != null && typeof X !== "boolean") throw new dZ("invalid reset");
            if (C != null && typeof C !== "boolean") throw new dZ("invalid expectContinue");
            if (this.headersTimeout = W, this.bodyTimeout = J, this.throwOnError = V === !0, this.method = Q, this.abort = null, Z == null) this.body = null;
            else if (hMQ(Z)) {
                this.body = Z;
                let z = this.body._readableState;
                if (!z || !z.autoDestroy) this.endHandler = function $() {
                    gMQ(this)
                }, this.body.on("end", this.endHandler);
                this.errorHandler = ($) => {
                    if (this.abort) this.abort($);
                    else this.error = $
                }, this.body.on("error", this.errorHandler)
            } else if (uMQ(Z)) this.body = Z.byteLength ? Z : null;
            else if (ArrayBuffer.isView(Z)) this.body = Z.buffer.byteLength ? Buffer.from(Z.buffer, Z.byteOffset, Z.byteLength) : null;
            else if (Z instanceof ArrayBuffer) this.body = Z.byteLength ? Buffer.from(Z) : null;
            else if (typeof Z === "string") this.body = Z.length ? Buffer.from(Z) : null;
            else if (mMQ(Z) || dMQ(Z) || cMQ(Z)) this.body = Z;
            else throw new dZ("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");
            if (this.completed = !1, this.aborted = !1, this.upgrade = Y || null, this.path = G ? lMQ(B, G) : B, this.origin = A, this.idempotent = F == null ? Q === "HEAD" || Q === "GET" : F, this.blocking = I == null ? !1 : I, this.reset = X == null ? null : X, this.host = null, this.contentLength = null, this.contentType = null, this.headers = [], this.expectContinue = C != null ? C : !1, Array.isArray(D)) {
                if (D.length % 2 !== 0) throw new dZ("headers array must be even");
                for (let z = 0; z < D.length; z += 2) iE1(this, D[z], D[z + 1])
            } else if (D && typeof D === "object")
                if (D[Symbol.iterator])
                    for (let z of D) {
                        if (!Array.isArray(z) || z.length !== 2) throw new dZ("headers must be in key-value pair format");
                        iE1(this, z[0], z[1])
                    } else {
                        let z = Object.keys(D);
                        for (let $ = 0; $ < z.length; ++$) iE1(this, z[$], D[z[$]])
                    } else if (D != null) throw new dZ("headers must be an object or an array");
            if (pMQ(H, Q, Y), this.servername = K || iMQ(this.host), this[qz] = H, uN.create.hasSubscribers) uN.create.publish({
                request: this
            })
        }
        onBodySent(A) {
            if (this[qz].onBodySent) try {
                return this[qz].onBodySent(A)
            } catch (B) {
                this.abort(B)
            }
        }
        onRequestSent() {
            if (uN.bodySent.hasSubscribers) uN.bodySent.publish({
                request: this
            });
            if (this[qz].onRequestSent) try {
                return this[qz].onRequestSent()
            } catch (A) {
                this.abort(A)
            }
        }
        onConnect(A) {
            if (sO(!this.aborted), sO(!this.completed), this.error) A(this.error);
            else return this.abort = A, this[qz].onConnect(A)
        }
        onResponseStarted() {
            return this[qz].onResponseStarted?.()
        }
        onHeaders(A, B, Q, Z) {
            if (sO(!this.aborted), sO(!this.completed), uN.headers.hasSubscribers) uN.headers.publish({
                request: this,
                response: {
                    statusCode: A,
                    headers: B,
                    statusText: Z
                }
            });
            try {
                return this[qz].onHeaders(A, B, Q, Z)
            } catch (D) {
                this.abort(D)
            }
        }
        onData(A) {
            sO(!this.aborted), sO(!this.completed);
            try {
                return this[qz].onData(A)
            } catch (B) {
                return this.abort(B), !1
            }
        }
        onUpgrade(A, B, Q) {
            return sO(!this.aborted), sO(!this.completed), this[qz].onUpgrade(A, B, Q)
        }
        onComplete(A) {
            if (this.onFinally(), sO(!this.aborted), this.completed = !0, uN.trailers.hasSubscribers) uN.trailers.publish({
                request: this,
                trailers: A
            });
            try {
                return this[qz].onComplete(A)
            } catch (B) {
                this.onError(B)
            }
        }
        onError(A) {
            if (this.onFinally(), uN.error.hasSubscribers) uN.error.publish({
                request: this,
                error: A
            });
            if (this.aborted) return;
            return this.aborted = !0, this[qz].onError(A)
        }
        onFinally() {
            if (this.errorHandler) this.body.off("error", this.errorHandler), this.errorHandler = null;
            if (this.endHandler) this.body.off("end", this.endHandler), this.endHandler = null
        }
        addHeader(A, B) {
            return iE1(this, A, B), this
        }
    }

    function iE1(A, B, Q) {
        if (Q && (typeof Q === "object" && !Array.isArray(Q))) throw new dZ(`invalid ${B} header`);
        else if (Q === void 0) return;
        let Z = hMA[B];
        if (Z === void 0) {
            if (Z = B.toLowerCase(), hMA[Z] === void 0 && !gMA(Z)) throw new dZ("invalid header key")
        }
        if (Array.isArray(Q)) {
            let D = [];
            for (let G = 0; G < Q.length; G++)
                if (typeof Q[G] === "string") {
                    if (!fMA(Q[G])) throw new dZ(`invalid ${B} header`);
                    D.push(Q[G])
                } else if (Q[G] === null) D.push("");
            else if (typeof Q[G] === "object") throw new dZ(`invalid ${B} header`);
            else D.push(`${Q[G]}`);
            Q = D
        } else if (typeof Q === "string") {
            if (!fMA(Q)) throw new dZ(`invalid ${B} header`)
        } else if (Q === null) Q = "";
        else Q = `${Q}`;
        if (A.host === null && Z === "host") {
            if (typeof Q !== "string") throw new dZ("invalid host header");
            A.host = Q
        } else if (A.contentLength === null && Z === "content-length") {
            if (A.contentLength = parseInt(Q, 10), !Number.isFinite(A.contentLength)) throw new dZ("invalid content-length header")
        } else if (A.contentType === null && Z === "content-type") A.contentType = Q, A.headers.push(B, Q);
        else if (Z === "transfer-encoding" || Z === "keep-alive" || Z === "upgrade") throw new dZ(`invalid ${Z} header`);
        else if (Z === "connection") {
            let D = typeof Q === "string" ? Q.toLowerCase() : null;
            if (D !== "close" && D !== "keep-alive") throw new dZ("invalid connection header");
            if (D === "close") A.reset = !0
        } else if (Z === "expect") throw new fMQ("expect header not supported");
        else A.headers.push(B, Q)
    }
    mMA.exports = uMA
});
var uQ1 = E((g45, lMA) => {
    var sMQ = W1("node:events");
    class o10 extends sMQ {
        dispatch() {
            throw new Error("not implemented")
        }
        close() {
            throw new Error("not implemented")
        }
        destroy() {
            throw new Error("not implemented")
        }
        compose(...A) {
            let B = Array.isArray(A[0]) ? A[0] : A,
                Q = this.dispatch.bind(this);
            for (let Z of B) {
                if (Z == null) continue;
                if (typeof Z !== "function") throw new TypeError(`invalid interceptor, expected function received ${typeof Z}`);
                if (Q = Z(Q), Q == null || typeof Q !== "function" || Q.length !== 2) throw new TypeError("invalid interceptor")
            }
            return new cMA(this, Q)
        }
    }
    class cMA extends o10 {
        #A = null;
        #B = null;
        constructor(A, B) {
            super();
            this.#A = A, this.#B = B
        }
        dispatch(...A) {
            this.#B(...A)
        }
        close(...A) {
            return this.#A.close(...A)
        }
        destroy(...A) {
            return this.#A.destroy(...A)
        }
    }
    lMA.exports = o10
});