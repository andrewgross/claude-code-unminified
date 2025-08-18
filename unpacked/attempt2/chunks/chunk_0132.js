/* chunk:132 bytes:[3007734, 3034867) size:27133 source:unpacked-cli.js */
var fOA = E((Z65, bOA) => {
    var YQ = W1("node:assert"),
        lQ = e4(),
        {
            channels: OOA
        } = zn(),
        T00 = I00(),
        {
            RequestContentLengthMismatchError: ph,
            ResponseContentLengthMismatchError: gTQ,
            RequestAbortedError: yOA,
            HeadersTimeoutError: uTQ,
            HeadersOverflowError: mTQ,
            SocketError: VU1,
            InformationalError: jn,
            BodyTimeoutError: dTQ,
            HTTPParserError: cTQ,
            ResponseExceededMaxSizeError: lTQ
        } = $5(),
        {
            kUrl: _OA,
            kReset: LV,
            kClient: k00,
            kParser: CD,
            kBlocking: tQ1,
            kRunning: pW,
            kPending: pTQ,
            kSize: TOA,
            kWriting: ok,
            kQueue: Nw,
            kNoRef: rQ1,
            kKeepAliveDefaultTimeout: iTQ,
            kHostHeader: nTQ,
            kPendingIdx: aTQ,
            kRunningIdx: Nz,
            kError: Lz,
            kPipelining: JU1,
            kSocket: kn,
            kKeepAliveTimeoutValue: CU1,
            kMaxHeadersSize: P00,
            kKeepAliveMaxTimeout: sTQ,
            kKeepAliveTimeoutThreshold: rTQ,
            kHeadersTimeout: oTQ,
            kBodyTimeout: tTQ,
            kStrictContentLength: y00,
            kMaxRequests: POA,
            kCounter: eTQ,
            kMaxResponseSize: APQ,
            kOnError: BPQ,
            kResume: rk,
            kHTTPContext: xOA
        } = VZ(),
        pN = qRA(),
        QPQ = Buffer.alloc(0),
        IU1 = Buffer[Symbol.species],
        YU1 = lQ.addListener,
        ZPQ = lQ.removeAllListeners,
        S00;
    async function DPQ() {
        let A = process.env.JEST_WORKER_ID ? C00() : void 0,
            B;
        try {
            B = await WebAssembly.compile(MRA())
        } catch (Q) {
            B = await WebAssembly.compile(A || C00())
        }
        return await WebAssembly.instantiate(B, {
            env: {
                wasm_on_url: (Q, Z, D) => {
                    return 0
                },
                wasm_on_status: (Q, Z, D) => {
                    YQ(PF.ptr === Q);
                    let G = Z - nN + iN.byteOffset;
                    return PF.onStatus(new IU1(iN.buffer, G, D)) || 0
                },
                wasm_on_message_begin: (Q) => {
                    return YQ(PF.ptr === Q), PF.onMessageBegin() || 0
                },
                wasm_on_header_field: (Q, Z, D) => {
                    YQ(PF.ptr === Q);
                    let G = Z - nN + iN.byteOffset;
                    return PF.onHeaderField(new IU1(iN.buffer, G, D)) || 0
                },
                wasm_on_header_value: (Q, Z, D) => {
                    YQ(PF.ptr === Q);
                    let G = Z - nN + iN.byteOffset;
                    return PF.onHeaderValue(new IU1(iN.buffer, G, D)) || 0
                },
                wasm_on_headers_complete: (Q, Z, D, G) => {
                    return YQ(PF.ptr === Q), PF.onHeadersComplete(Z, Boolean(D), Boolean(G)) || 0
                },
                wasm_on_body: (Q, Z, D) => {
                    YQ(PF.ptr === Q);
                    let G = Z - nN + iN.byteOffset;
                    return PF.onBody(new IU1(iN.buffer, G, D)) || 0
                },
                wasm_on_message_complete: (Q) => {
                    return YQ(PF.ptr === Q), PF.onMessageComplete() || 0
                }
            }
        })
    }
    var j00 = null,
        _00 = DPQ();
    _00.catch();
    var PF = null,
        iN = null,
        WU1 = 0,
        nN = null,
        GPQ = 0,
        oQ1 = 1,
        yn = 2 | oQ1,
        XU1 = 4 | oQ1,
        x00 = 8 | GPQ;
    class vOA {
        constructor(A, B, {
            exports: Q
        }) {
            YQ(Number.isFinite(A[P00]) && A[P00] > 0), this.llhttp = Q, this.ptr = this.llhttp.llhttp_alloc(pN.TYPE.RESPONSE), this.client = A, this.socket = B, this.timeout = null, this.timeoutValue = null, this.timeoutType = null, this.statusCode = null, this.statusText = "", this.upgrade = !1, this.headers = [], this.headersSize = 0, this.headersMaxSize = A[P00], this.shouldKeepAlive = !1, this.paused = !1, this.resume = this.resume.bind(this), this.bytesRead = 0, this.keepAlive = "", this.contentLength = "", this.connection = "", this.maxResponseSize = A[APQ]
        }
        setTimeout(A, B) {
            if (A !== this.timeoutValue || B & oQ1 ^ this.timeoutType & oQ1) {
                if (this.timeout) T00.clearTimeout(this.timeout), this.timeout = null;
                if (A)
                    if (B & oQ1) this.timeout = T00.setFastTimeout(SOA, A, new WeakRef(this));
                    else this.timeout = setTimeout(SOA, A, new WeakRef(this)), this.timeout.unref();
                this.timeoutValue = A
            } else if (this.timeout) {
                if (this.timeout.refresh) this.timeout.refresh()
            }
            this.timeoutType = B
        }
        resume() {
            if (this.socket.destroyed || !this.paused) return;
            if (YQ(this.ptr != null), YQ(PF == null), this.llhttp.llhttp_resume(this.ptr), YQ(this.timeoutType === XU1), this.timeout) {
                if (this.timeout.refresh) this.timeout.refresh()
            }
            this.paused = !1, this.execute(this.socket.read() || QPQ), this.readMore()
        }
        readMore() {
            while (!this.paused && this.ptr) {
                let A = this.socket.read();
                if (A === null) break;
                this.execute(A)
            }
        }
        execute(A) {
            YQ(this.ptr != null), YQ(PF == null), YQ(!this.paused);
            let {
                socket: B,
                llhttp: Q
            } = this;
            if (A.length > WU1) {
                if (nN) Q.free(nN);
                WU1 = Math.ceil(A.length / 4096) * 4096, nN = Q.malloc(WU1)
            }
            new Uint8Array(Q.memory.buffer, nN, WU1).set(A);
            try {
                let Z;
                try {
                    iN = A, PF = this, Z = Q.llhttp_execute(this.ptr, nN, A.length)
                } catch (G) {
                    throw G
                } finally {
                    PF = null, iN = null
                }
                let D = Q.llhttp_get_error_pos(this.ptr) - nN;
                if (Z === pN.ERROR.PAUSED_UPGRADE) this.onUpgrade(A.slice(D));
                else if (Z === pN.ERROR.PAUSED) this.paused = !0, B.unshift(A.slice(D));
                else if (Z !== pN.ERROR.OK) {
                    let G = Q.llhttp_get_error_reason(this.ptr),
                        F = "";
                    if (G) {
                        let I = new Uint8Array(Q.memory.buffer, G).indexOf(0);
                        F = "Response does not match the HTTP/1.1 protocol (" + Buffer.from(Q.memory.buffer, G, I).toString() + ")"
                    }
                    throw new cTQ(F, pN.ERROR[Z], A.slice(D))
                }
            } catch (Z) {
                lQ.destroy(B, Z)
            }
        }
        destroy() {
            YQ(this.ptr != null), YQ(PF == null), this.llhttp.llhttp_free(this.ptr), this.ptr = null, this.timeout && T00.clearTimeout(this.timeout), this.timeout = null, this.timeoutValue = null, this.timeoutType = null, this.paused = !1
        }
        onStatus(A) {
            this.statusText = A.toString()
        }
        onMessageBegin() {
            let {
                socket: A,
                client: B
            } = this;
            if (A.destroyed) return -1;
            let Q = B[Nw][B[Nz]];
            if (!Q) return -1;
            Q.onResponseStarted()
        }
        onHeaderField(A) {
            let B = this.headers.length;
            if ((B & 1) === 0) this.headers.push(A);
            else this.headers[B - 1] = Buffer.concat([this.headers[B - 1], A]);
            this.trackHeader(A.length)
        }
        onHeaderValue(A) {
            let B = this.headers.length;
            if ((B & 1) === 1) this.headers.push(A), B += 1;
            else this.headers[B - 1] = Buffer.concat([this.headers[B - 1], A]);
            let Q = this.headers[B - 2];
            if (Q.length === 10) {
                let Z = lQ.bufferToLowerCasedHeaderName(Q);
                if (Z === "keep-alive") this.keepAlive += A.toString();
                else if (Z === "connection") this.connection += A.toString()
            } else if (Q.length === 14 && lQ.bufferToLowerCasedHeaderName(Q) === "content-length") this.contentLength += A.toString();
            this.trackHeader(A.length)
        }
        trackHeader(A) {
            if (this.headersSize += A, this.headersSize >= this.headersMaxSize) lQ.destroy(this.socket, new mTQ)
        }
        onUpgrade(A) {
            let {
                upgrade: B,
                client: Q,
                socket: Z,
                headers: D,
                statusCode: G
            } = this;
            YQ(B), YQ(Q[kn] === Z), YQ(!Z.destroyed), YQ(!this.paused), YQ((D.length & 1) === 0);
            let F = Q[Nw][Q[Nz]];
            YQ(F), YQ(F.upgrade || F.method === "CONNECT"), this.statusCode = null, this.statusText = "", this.shouldKeepAlive = null, this.headers = [], this.headersSize = 0, Z.unshift(A), Z[CD].destroy(), Z[CD] = null, Z[k00] = null, Z[Lz] = null, ZPQ(Z), Q[kn] = null, Q[xOA] = null, Q[Nw][Q[Nz]++] = null, Q.emit("disconnect", Q[_OA], [Q], new jn("upgrade"));
            try {
                F.onUpgrade(G, D, Z)
            } catch (I) {
                lQ.destroy(Z, I)
            }
            Q[rk]()
        }
        onHeadersComplete(A, B, Q) {
            let {
                client: Z,
                socket: D,
                headers: G,
                statusText: F
            } = this;
            if (D.destroyed) return -1;
            let I = Z[Nw][Z[Nz]];
            if (!I) return -1;
            if (YQ(!this.upgrade), YQ(this.statusCode < 200), A === 100) return lQ.destroy(D, new VU1("bad response", lQ.getSocketInfo(D))), -1;
            if (B && !I.upgrade) return lQ.destroy(D, new VU1("bad upgrade", lQ.getSocketInfo(D))), -1;
            if (YQ(this.timeoutType === yn), this.statusCode = A, this.shouldKeepAlive = Q || I.method === "HEAD" && !D[LV] && this.connection.toLowerCase() === "keep-alive", this.statusCode >= 200) {
                let W = I.bodyTimeout != null ? I.bodyTimeout : Z[tTQ];
                this.setTimeout(W, XU1)
            } else if (this.timeout) {
                if (this.timeout.refresh) this.timeout.refresh()
            }
            if (I.method === "CONNECT") return YQ(Z[pW] === 1), this.upgrade = !0, 2;
            if (B) return YQ(Z[pW] === 1), this.upgrade = !0, 2;
            if (YQ((this.headers.length & 1) === 0), this.headers = [], this.headersSize = 0, this.shouldKeepAlive && Z[JU1]) {
                let W = this.keepAlive ? lQ.parseKeepAliveTimeout(this.keepAlive) : null;
                if (W != null) {
                    let J = Math.min(W - Z[rTQ], Z[sTQ]);
                    if (J <= 0) D[LV] = !0;
                    else Z[CU1] = J
                } else Z[CU1] = Z[iTQ]
            } else D[LV] = !0;
            let Y = I.onHeaders(A, G, this.resume, F) === !1;
            if (I.aborted) return -1;
            if (I.method === "HEAD") return 1;
            if (A < 200) return 1;
            if (D[tQ1]) D[tQ1] = !1, Z[rk]();
            return Y ? pN.ERROR.PAUSED : 0
        }
        onBody(A) {
            let {
                client: B,
                socket: Q,
                statusCode: Z,
                maxResponseSize: D
            } = this;
            if (Q.destroyed) return -1;
            let G = B[Nw][B[Nz]];
            if (YQ(G), YQ(this.timeoutType === XU1), this.timeout) {
                if (this.timeout.refresh) this.timeout.refresh()
            }
            if (YQ(Z >= 200), D > -1 && this.bytesRead + A.length > D) return lQ.destroy(Q, new lTQ), -1;
            if (this.bytesRead += A.length, G.onData(A) === !1) return pN.ERROR.PAUSED
        }
        onMessageComplete() {
            let {
                client: A,
                socket: B,
                statusCode: Q,
                upgrade: Z,
                headers: D,
                contentLength: G,
                bytesRead: F,
                shouldKeepAlive: I
            } = this;
            if (B.destroyed && (!Q || I)) return -1;
            if (Z) return;
            YQ(Q >= 100), YQ((this.headers.length & 1) === 0);
            let Y = A[Nw][A[Nz]];
            if (YQ(Y), this.statusCode = null, this.statusText = "", this.bytesRead = 0, this.contentLength = "", this.keepAlive = "", this.connection = "", this.headers = [], this.headersSize = 0, Q < 200) return;
            if (Y.method !== "HEAD" && G && F !== parseInt(G, 10)) return lQ.destroy(B, new gTQ), -1;
            if (Y.onComplete(D), A[Nw][A[Nz]++] = null, B[ok]) return YQ(A[pW] === 0), lQ.destroy(B, new jn("reset")), pN.ERROR.PAUSED;
            else if (!I) return lQ.destroy(B, new jn("reset")), pN.ERROR.PAUSED;
            else if (B[LV] && A[pW] === 0) return lQ.destroy(B, new jn("reset")), pN.ERROR.PAUSED;
            else if (A[JU1] == null || A[JU1] === 1) setImmediate(() => A[rk]());
            else A[rk]()
        }
    }

    function SOA(A) {
        let {
            socket: B,
            timeoutType: Q,
            client: Z,
            paused: D
        } = A.deref();
        if (Q === yn) {
            if (!B[ok] || B.writableNeedDrain || Z[pW] > 1) YQ(!D, "cannot be paused while waiting for headers"), lQ.destroy(B, new uTQ)
        } else if (Q === XU1) {
            if (!D) lQ.destroy(B, new dTQ)
        } else if (Q === x00) YQ(Z[pW] === 0 && Z[CU1]), lQ.destroy(B, new jn("socket idle timeout"))
    }
    async function FPQ(A, B) {
        if (A[kn] = B, !j00) j00 = await _00, _00 = null;
        B[rQ1] = !1, B[ok] = !1, B[LV] = !1, B[tQ1] = !1, B[CD] = new vOA(A, B, j00), YU1(B, "error", function(Z) {
            YQ(Z.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
            let D = this[CD];
            if (Z.code === "ECONNRESET" && D.statusCode && !D.shouldKeepAlive) {
                D.onMessageComplete();
                return
            }
            this[Lz] = Z, this[k00][BPQ](Z)
        }), YU1(B, "readable", function() {
            let Z = this[CD];
            if (Z) Z.readMore()
        }), YU1(B, "end", function() {
            let Z = this[CD];
            if (Z.statusCode && !Z.shouldKeepAlive) {
                Z.onMessageComplete();
                return
            }
            lQ.destroy(this, new VU1("other side closed", lQ.getSocketInfo(this)))
        }), YU1(B, "close", function() {
            let Z = this[k00],
                D = this[CD];
            if (D) {
                if (!this[Lz] && D.statusCode && !D.shouldKeepAlive) D.onMessageComplete();
                this[CD].destroy(), this[CD] = null
            }
            let G = this[Lz] || new VU1("closed", lQ.getSocketInfo(this));
            if (Z[kn] = null, Z[xOA] = null, Z.destroyed) {
                YQ(Z[pTQ] === 0);
                let F = Z[Nw].splice(Z[Nz]);
                for (let I = 0; I < F.length; I++) {
                    let Y = F[I];
                    lQ.errorRequest(Z, Y, G)
                }
            } else if (Z[pW] > 0 && G.code !== "UND_ERR_INFO") {
                let F = Z[Nw][Z[Nz]];
                Z[Nw][Z[Nz]++] = null, lQ.errorRequest(Z, F, G)
            }
            Z[aTQ] = Z[Nz], YQ(Z[pW] === 0), Z.emit("disconnect", Z[_OA], [Z], G), Z[rk]()
        });
        let Q = !1;
        return B.on("close", () => {
            Q = !0
        }), {
            version: "h1",
            defaultPipelining: 1,
            write(...Z) {
                return WPQ(A, ...Z)
            },
            resume() {
                IPQ(A)
            },
            destroy(Z, D) {
                if (Q) queueMicrotask(D);
                else B.destroy(Z).on("close", D)
            },
            get destroyed() {
                return B.destroyed
            },
            busy(Z) {
                if (B[ok] || B[LV] || B[tQ1]) return !0;
                if (Z) {
                    if (A[pW] > 0 && !Z.idempotent) return !0;
                    if (A[pW] > 0 && (Z.upgrade || Z.method === "CONNECT")) return !0;
                    if (A[pW] > 0 && lQ.bodyLength(Z.body) !== 0 && (lQ.isStream(Z.body) || lQ.isAsyncIterable(Z.body) || lQ.isFormDataLike(Z.body))) return !0
                }
                return !1
            }
        }
    }

    function IPQ(A) {
        let B = A[kn];
        if (B && !B.destroyed) {
            if (A[TOA] === 0) {
                if (!B[rQ1] && B.unref) B.unref(), B[rQ1] = !0
            } else if (B[rQ1] && B.ref) B.ref(), B[rQ1] = !1;
            if (A[TOA] === 0) {
                if (B[CD].timeoutType !== x00) B[CD].setTimeout(A[CU1], x00)
            } else if (A[pW] > 0 && B[CD].statusCode < 200) {
                if (B[CD].timeoutType !== yn) {
                    let Q = A[Nw][A[Nz]],
                        Z = Q.headersTimeout != null ? Q.headersTimeout : A[oTQ];
                    B[CD].setTimeout(Z, yn)
                }
            }
        }
    }

    function YPQ(A) {
        return A !== "GET" && A !== "HEAD" && A !== "OPTIONS" && A !== "TRACE" && A !== "CONNECT"
    }

    function WPQ(A, B) {
        let {
            method: Q,
            path: Z,
            host: D,
            upgrade: G,
            blocking: F,
            reset: I
        } = B, {
            body: Y,
            headers: W,
            contentLength: J
        } = B, X = Q === "PUT" || Q === "POST" || Q === "PATCH" || Q === "QUERY" || Q === "PROPFIND" || Q === "PROPPATCH";
        if (lQ.isFormDataLike(Y)) {
            if (!S00) S00 = Sn().extractBody;
            let [z, $] = S00(Y);
            if (B.contentType == null) W.push("content-type", $);
            Y = z.stream, J = z.length
        } else if (lQ.isBlobLike(Y) && B.contentType == null && Y.type) W.push("content-type", Y.type);
        if (Y && typeof Y.read === "function") Y.read(0);
        let V = lQ.bodyLength(Y);
        if (J = V ?? J, J === null) J = B.contentLength;
        if (J === 0 && !X) J = null;
        if (YPQ(Q) && J > 0 && B.contentLength !== null && B.contentLength !== J) {
            if (A[y00]) return lQ.errorRequest(A, B, new ph), !1;
            process.emitWarning(new ph)
        }
        let C = A[kn],
            K = (z) => {
                if (B.aborted || B.completed) return;
                lQ.errorRequest(A, B, z || new yOA), lQ.destroy(Y), lQ.destroy(C, new jn("aborted"))
            };
        try {
            B.onConnect(K)
        } catch (z) {
            lQ.errorRequest(A, B, z)
        }
        if (B.aborted) return !1;
        if (Q === "HEAD") C[LV] = !0;
        if (G || Q === "CONNECT") C[LV] = !0;
        if (I != null) C[LV] = I;
        if (A[POA] && C[eTQ]++ >= A[POA]) C[LV] = !0;
        if (F) C[tQ1] = !0;
        let H = `${Q} ${Z} HTTP/1.1\r
`;
        if (typeof D === "string") H += `host: ${D}\r
`;
        else H += A[nTQ];
        if (G) H += `connection: upgrade\r
upgrade: ${G}\r
`;
        else if (A[JU1] && !C[LV]) H += `connection: keep-alive\r
`;
        else H += `connection: close\r
`;
        if (Array.isArray(W))
            for (let z = 0; z < W.length; z += 2) {
                let $ = W[z + 0],
                    L = W[z + 1];
                if (Array.isArray(L))
                    for (let N = 0; N < L.length; N++) H += `${$}: ${L[N]}\r
`;
                else H += `${$}: ${L}\r
`
            }
        if (OOA.sendHeaders.hasSubscribers) OOA.sendHeaders.publish({
            request: B,
            headers: H,
            socket: C
        });
        if (!Y || V === 0) jOA(K, null, A, B, C, J, H, X);
        else if (lQ.isBuffer(Y)) jOA(K, Y, A, B, C, J, H, X);
        else if (lQ.isBlobLike(Y))
            if (typeof Y.stream === "function") kOA(K, Y.stream(), A, B, C, J, H, X);
            else XPQ(K, Y, A, B, C, J, H, X);
        else if (lQ.isStream(Y)) JPQ(K, Y, A, B, C, J, H, X);
        else if (lQ.isIterable(Y)) kOA(K, Y, A, B, C, J, H, X);
        else YQ(!1);
        return !0
    }

    function JPQ(A, B, Q, Z, D, G, F, I) {
        YQ(G !== 0 || Q[pW] === 0, "stream body cannot be pipelined");
        let Y = !1,
            W = new v00({
                abort: A,
                socket: D,
                request: Z,
                contentLength: G,
                client: Q,
                expectsPayload: I,
                header: F
            }),
            J = function(K) {
                if (Y) return;
                try {
                    if (!W.write(K) && this.pause) this.pause()
                } catch (H) {
                    lQ.destroy(this, H)
                }
            },
            X = function() {
                if (Y) return;
                if (B.resume) B.resume()
            },
            V = function() {
                if (queueMicrotask(() => {
                        B.removeListener("error", C)
                    }), !Y) {
                    let K = new yOA;
                    queueMicrotask(() => C(K))
                }
            },
            C = function(K) {
                if (Y) return;
                if (Y = !0, YQ(D.destroyed || D[ok] && Q[pW] <= 1), D.off("drain", X).off("error", C), B.removeListener("data", J).removeListener("end", C).removeListener("close", V), !K) try {
                    W.end()
                } catch (H) {
                    K = H
                }
                if (W.destroy(K), K && (K.code !== "UND_ERR_INFO" || K.message !== "reset")) lQ.destroy(B, K);
                else lQ.destroy(B)
            };
        if (B.on("data", J).on("end", C).on("error", C).on("close", V), B.resume) B.resume();
        if (D.on("drain", X).on("error", C), B.errorEmitted ?? B.errored) setImmediate(() => C(B.errored));
        else if (B.endEmitted ?? B.readableEnded) setImmediate(() => C(null));
        if (B.closeEmitted ?? B.closed) setImmediate(V)
    }

    function jOA(A, B, Q, Z, D, G, F, I) {
        try {
            if (!B)
                if (G === 0) D.write(`${F}content-length: 0\r
\r
`, "latin1");
                else YQ(G === null, "no body must not have content length"), D.write(`${F}\r
`, "latin1");
            else if (lQ.isBuffer(B)) {
                if (YQ(G === B.byteLength, "buffer body must have content length"), D.cork(), D.write(`${F}content-length: ${G}\r
\r
`, "latin1"), D.write(B), D.uncork(), Z.onBodySent(B), !I && Z.reset !== !1) D[LV] = !0
            }
            Z.onRequestSent(), Q[rk]()
        } catch (Y) {
            A(Y)
        }
    }
    async function XPQ(A, B, Q, Z, D, G, F, I) {
        YQ(G === B.size, "blob body must have content length");
        try {
            if (G != null && G !== B.size) throw new ph;
            let Y = Buffer.from(await B.arrayBuffer());
            if (D.cork(), D.write(`${F}content-length: ${G}\r
\r
`, "latin1"), D.write(Y), D.uncork(), Z.onBodySent(Y), Z.onRequestSent(), !I && Z.reset !== !1) D[LV] = !0;
            Q[rk]()
        } catch (Y) {
            A(Y)
        }
    }
    async function kOA(A, B, Q, Z, D, G, F, I) {
        YQ(G !== 0 || Q[pW] === 0, "iterator body cannot be pipelined");
        let Y = null;

        function W() {
            if (Y) {
                let V = Y;
                Y = null, V()
            }
        }
        let J = () => new Promise((V, C) => {
            if (YQ(Y === null), D[Lz]) C(D[Lz]);
            else Y = V
        });
        D.on("close", W).on("drain", W);
        let X = new v00({
            abort: A,
            socket: D,
            request: Z,
            contentLength: G,
            client: Q,
            expectsPayload: I,
            header: F
        });
        try {
            for await (let V of B) {
                if (D[Lz]) throw D[Lz];
                if (!X.write(V)) await J()
            }
            X.end()
        } catch (V) {
            X.destroy(V)
        } finally {
            D.off("close", W).off("drain", W)
        }
    }
    class v00 {
        constructor({
            abort: A,
            socket: B,
            request: Q,
            contentLength: Z,
            client: D,
            expectsPayload: G,
            header: F
        }) {
            this.socket = B, this.request = Q, this.contentLength = Z, this.client = D, this.bytesWritten = 0, this.expectsPayload = G, this.header = F, this.abort = A, B[ok] = !0
        }
        write(A) {
            let {
                socket: B,
                request: Q,
                contentLength: Z,
                client: D,
                bytesWritten: G,
                expectsPayload: F,
                header: I
            } = this;
            if (B[Lz]) throw B[Lz];
            if (B.destroyed) return !1;
            let Y = Buffer.byteLength(A);
            if (!Y) return !0;
            if (Z !== null && G + Y > Z) {
                if (D[y00]) throw new ph;
                process.emitWarning(new ph)
            }
            if (B.cork(), G === 0) {
                if (!F && Q.reset !== !1) B[LV] = !0;
                if (Z === null) B.write(`${I}transfer-encoding: chunked\r
`, "latin1");
                else B.write(`${I}content-length: ${Z}\r
\r
`, "latin1")
            }
            if (Z === null) B.write(`\r
${Y.toString(16)}\r
`, "latin1");
            this.bytesWritten += Y;
            let W = B.write(A);
            if (B.uncork(), Q.onBodySent(A), !W) {
                if (B[CD].timeout && B[CD].timeoutType === yn) {
                    if (B[CD].timeout.refresh) B[CD].timeout.refresh()
                }
            }
            return W
        }
        end() {
            let {
                socket: A,
                contentLength: B,
                client: Q,
                bytesWritten: Z,
                expectsPayload: D,
                header: G,
                request: F
            } = this;
            if (F.onRequestSent(), A[ok] = !1, A[Lz]) throw A[Lz];
            if (A.destroyed) return;
            if (Z === 0)
                if (D) A.write(`${G}content-length: 0\r
\r
`, "latin1");
                else A.write(`${G}\r
`, "latin1");
            else if (B === null) A.write(`\r
0\r
\r
`, "latin1");
            if (B !== null && Z !== B)
                if (Q[y00]) throw new ph;
                else process.emitWarning(new ph);
            if (A[CD].timeout && A[CD].timeoutType === yn) {
                if (A[CD].timeout.refresh) A[CD].timeout.refresh()
            }
            Q[rk]()
        }
        destroy(A) {
            let {
                socket: B,
                client: Q,
                abort: Z
            } = this;
            if (B[ok] = !1, A) YQ(Q[pW] <= 1, "pipeline should only contain this request"), Z(A)
        }
    }
    bOA.exports = FPQ
});