/* chunk:295 bytes:[6392789, 6414161) size:21372 source:unpacked-cli.js */
var TO1 = E((RS5, kM2) => {
    var ca4 = W1("events"),
        la4 = W1("https"),
        pa4 = W1("http"),
        NM2 = W1("net"),
        ia4 = W1("tls"),
        {
            randomBytes: na4,
            createHash: aa4
        } = W1("crypto"),
        {
            Duplex: LS5,
            Readable: MS5
        } = W1("stream"),
        {
            URL: TF0
        } = W1("url"),
        l_ = A31(),
        sa4 = NF0(),
        ra4 = MF0(),
        {
            isBlob: oa4
        } = lo(),
        {
            BINARY_TYPES: $M2,
            EMPTY_BUFFER: MO1,
            GUID: ta4,
            kForOnEventAttribute: PF0,
            kListener: ea4,
            kStatusCode: As4,
            kWebSocket: wI,
            NOOP: LM2
        } = KP(),
        {
            EventTarget: {
                addEventListener: Bs4,
                removeEventListener: Qs4
            }
        } = UM2(),
        {
            format: Zs4,
            parse: Ds4
        } = OF0(),
        {
            toBuffer: Gs4
        } = t51(),
        MM2 = Symbol("kAborted"),
        SF0 = [8, 13],
        zP = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"],
        Fs4 = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    class sQ extends ca4 {
        constructor(A, B, Q) {
            super();
            if (this._binaryType = $M2[0], this._closeCode = 1006, this._closeFrameReceived = !1, this._closeFrameSent = !1, this._closeMessage = MO1, this._closeTimer = null, this._errorEmitted = !1, this._extensions = {}, this._paused = !1, this._protocol = "", this._readyState = sQ.CONNECTING, this._receiver = null, this._sender = null, this._socket = null, A !== null) {
                if (this._bufferedAmount = 0, this._isServer = !1, this._redirects = 0, B === void 0) B = [];
                else if (!Array.isArray(B))
                    if (typeof B === "object" && B !== null) Q = B, B = [];
                    else B = [B];
                RM2(this, A, B, Q)
            } else this._autoPong = Q.autoPong, this._isServer = !0
        }
        get binaryType() {
            return this._binaryType
        }
        set binaryType(A) {
            if (!$M2.includes(A)) return;
            if (this._binaryType = A, this._receiver) this._receiver._binaryType = A
        }
        get bufferedAmount() {
            if (!this._socket) return this._bufferedAmount;
            return this._socket._writableState.length + this._sender._bufferedBytes
        }
        get extensions() {
            return Object.keys(this._extensions).join()
        }
        get isPaused() {
            return this._paused
        }
        get onclose() {
            return null
        }
        get onerror() {
            return null
        }
        get onopen() {
            return null
        }
        get onmessage() {
            return null
        }
        get protocol() {
            return this._protocol
        }
        get readyState() {
            return this._readyState
        }
        get url() {
            return this._url
        }
        setSocket(A, B, Q) {
            let Z = new sa4({
                    allowSynchronousEvents: Q.allowSynchronousEvents,
                    binaryType: this.binaryType,
                    extensions: this._extensions,
                    isServer: this._isServer,
                    maxPayload: Q.maxPayload,
                    skipUTF8Validation: Q.skipUTF8Validation
                }),
                D = new ra4(A, this._extensions, Q.generateMask);
            if (this._receiver = Z, this._sender = D, this._socket = A, Z[wI] = this, D[wI] = this, A[wI] = this, Z.on("conclude", Ws4), Z.on("drain", Js4), Z.on("error", Xs4), Z.on("message", Vs4), Z.on("ping", Cs4), Z.on("pong", Ks4), D.onerror = Hs4, A.setTimeout) A.setTimeout(0);
            if (A.setNoDelay) A.setNoDelay();
            if (B.length > 0) A.unshift(B);
            A.on("close", PM2), A.on("data", OO1), A.on("end", SM2), A.on("error", jM2), this._readyState = sQ.OPEN, this.emit("open")
        }
        emitClose() {
            if (!this._socket) {
                this._readyState = sQ.CLOSED, this.emit("close", this._closeCode, this._closeMessage);
                return
            }
            if (this._extensions[l_.extensionName]) this._extensions[l_.extensionName].cleanup();
            this._receiver.removeAllListeners(), this._readyState = sQ.CLOSED, this.emit("close", this._closeCode, this._closeMessage)
        }
        close(A, B) {
            if (this.readyState === sQ.CLOSED) return;
            if (this.readyState === sQ.CONNECTING) {
                vK(this, this._req, "WebSocket was closed before the connection was established");
                return
            }
            if (this.readyState === sQ.CLOSING) {
                if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) this._socket.end();
                return
            }
            this._readyState = sQ.CLOSING, this._sender.close(A, B, !this._isServer, (Q) => {
                if (Q) return;
                if (this._closeFrameSent = !0, this._closeFrameReceived || this._receiver._writableState.errorEmitted) this._socket.end()
            }), TM2(this)
        }
        pause() {
            if (this.readyState === sQ.CONNECTING || this.readyState === sQ.CLOSED) return;
            this._paused = !0, this._socket.pause()
        }
        ping(A, B, Q) {
            if (this.readyState === sQ.CONNECTING) throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
            if (typeof A === "function") Q = A, A = B = void 0;
            else if (typeof B === "function") Q = B, B = void 0;
            if (typeof A === "number") A = A.toString();
            if (this.readyState !== sQ.OPEN) {
                jF0(this, A, Q);
                return
            }
            if (B === void 0) B = !this._isServer;
            this._sender.ping(A || MO1, B, Q)
        }
        pong(A, B, Q) {
            if (this.readyState === sQ.CONNECTING) throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
            if (typeof A === "function") Q = A, A = B = void 0;
            else if (typeof B === "function") Q = B, B = void 0;
            if (typeof A === "number") A = A.toString();
            if (this.readyState !== sQ.OPEN) {
                jF0(this, A, Q);
                return
            }
            if (B === void 0) B = !this._isServer;
            this._sender.pong(A || MO1, B, Q)
        }
        resume() {
            if (this.readyState === sQ.CONNECTING || this.readyState === sQ.CLOSED) return;
            if (this._paused = !1, !this._receiver._writableState.needDrain) this._socket.resume()
        }
        send(A, B, Q) {
            if (this.readyState === sQ.CONNECTING) throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
            if (typeof B === "function") Q = B, B = {};
            if (typeof A === "number") A = A.toString();
            if (this.readyState !== sQ.OPEN) {
                jF0(this, A, Q);
                return
            }
            let Z = {
                binary: typeof A !== "string",
                mask: !this._isServer,
                compress: !0,
                fin: !0,
                ...B
            };
            if (!this._extensions[l_.extensionName]) Z.compress = !1;
            this._sender.send(A || MO1, Z, Q)
        }
        terminate() {
            if (this.readyState === sQ.CLOSED) return;
            if (this.readyState === sQ.CONNECTING) {
                vK(this, this._req, "WebSocket was closed before the connection was established");
                return
            }
            if (this._socket) this._readyState = sQ.CLOSING, this._socket.destroy()
        }
    }
    Object.defineProperty(sQ, "CONNECTING", {
        enumerable: !0,
        value: zP.indexOf("CONNECTING")
    });
    Object.defineProperty(sQ.prototype, "CONNECTING", {
        enumerable: !0,
        value: zP.indexOf("CONNECTING")
    });
    Object.defineProperty(sQ, "OPEN", {
        enumerable: !0,
        value: zP.indexOf("OPEN")
    });
    Object.defineProperty(sQ.prototype, "OPEN", {
        enumerable: !0,
        value: zP.indexOf("OPEN")
    });
    Object.defineProperty(sQ, "CLOSING", {
        enumerable: !0,
        value: zP.indexOf("CLOSING")
    });
    Object.defineProperty(sQ.prototype, "CLOSING", {
        enumerable: !0,
        value: zP.indexOf("CLOSING")
    });
    Object.defineProperty(sQ, "CLOSED", {
        enumerable: !0,
        value: zP.indexOf("CLOSED")
    });
    Object.defineProperty(sQ.prototype, "CLOSED", {
        enumerable: !0,
        value: zP.indexOf("CLOSED")
    });
    ["binaryType", "bufferedAmount", "extensions", "isPaused", "protocol", "readyState", "url"].forEach((A) => {
        Object.defineProperty(sQ.prototype, A, {
            enumerable: !0
        })
    });
    ["open", "error", "close", "message"].forEach((A) => {
        Object.defineProperty(sQ.prototype, `on${A}`, {
            enumerable: !0,
            get() {
                for (let B of this.listeners(A))
                    if (B[PF0]) return B[ea4];
                return null
            },
            set(B) {
                for (let Q of this.listeners(A))
                    if (Q[PF0]) {
                        this.removeListener(A, Q);
                        break
                    } if (typeof B !== "function") return;
                this.addEventListener(A, B, {
                    [PF0]: !0
                })
            }
        })
    });
    sQ.prototype.addEventListener = Bs4;
    sQ.prototype.removeEventListener = Qs4;
    kM2.exports = sQ;

    function RM2(A, B, Q, Z) {
        let D = {
            allowSynchronousEvents: !0,
            autoPong: !0,
            protocolVersion: SF0[1],
            maxPayload: 104857600,
            skipUTF8Validation: !1,
            perMessageDeflate: !0,
            followRedirects: !1,
            maxRedirects: 10,
            ...Z,
            socketPath: void 0,
            hostname: void 0,
            protocol: void 0,
            timeout: void 0,
            method: "GET",
            host: void 0,
            path: void 0,
            port: void 0
        };
        if (A._autoPong = D.autoPong, !SF0.includes(D.protocolVersion)) throw new RangeError(`Unsupported protocol version: ${D.protocolVersion} (supported versions: ${SF0.join(", ")})`);
        let G;
        if (B instanceof TF0) G = B;
        else try {
            G = new TF0(B)
        } catch (H) {
            throw new SyntaxError(`Invalid URL: ${B}`)
        }
        if (G.protocol === "http:") G.protocol = "ws:";
        else if (G.protocol === "https:") G.protocol = "wss:";
        A._url = G.href;
        let F = G.protocol === "wss:",
            I = G.protocol === "ws+unix:",
            Y;
        if (G.protocol !== "ws:" && !F && !I) Y = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`;
        else if (I && !G.pathname) Y = "The URL's pathname is empty";
        else if (G.hash) Y = "The URL contains a fragment identifier";
        if (Y) {
            let H = new SyntaxError(Y);
            if (A._redirects === 0) throw H;
            else {
                RO1(A, H);
                return
            }
        }
        let W = F ? 443 : 80,
            J = na4(16).toString("base64"),
            X = F ? la4.request : pa4.request,
            V = new Set,
            C;
        if (D.createConnection = D.createConnection || (F ? Ys4 : Is4), D.defaultPort = D.defaultPort || W, D.port = G.port || W, D.host = G.hostname.startsWith("[") ? G.hostname.slice(1, -1) : G.hostname, D.headers = {
                ...D.headers,
                "Sec-WebSocket-Version": D.protocolVersion,
                "Sec-WebSocket-Key": J,
                Connection: "Upgrade",
                Upgrade: "websocket"
            }, D.path = G.pathname + G.search, D.timeout = D.handshakeTimeout, D.perMessageDeflate) C = new l_(D.perMessageDeflate !== !0 ? D.perMessageDeflate : {}, !1, D.maxPayload), D.headers["Sec-WebSocket-Extensions"] = Zs4({
            [l_.extensionName]: C.offer()
        });
        if (Q.length) {
            for (let H of Q) {
                if (typeof H !== "string" || !Fs4.test(H) || V.has(H)) throw new SyntaxError("An invalid or duplicated subprotocol was specified");
                V.add(H)
            }
            D.headers["Sec-WebSocket-Protocol"] = Q.join(",")
        }
        if (D.origin)
            if (D.protocolVersion < 13) D.headers["Sec-WebSocket-Origin"] = D.origin;
            else D.headers.Origin = D.origin;
        if (G.username || G.password) D.auth = `${G.username}:${G.password}`;
        if (I) {
            let H = D.path.split(":");
            D.socketPath = H[0], D.path = H[1]
        }
        let K;
        if (D.followRedirects) {
            if (A._redirects === 0) {
                A._originalIpc = I, A._originalSecure = F, A._originalHostOrSocketPath = I ? D.socketPath : G.host;
                let H = Z && Z.headers;
                if (Z = {
                        ...Z,
                        headers: {}
                    }, H)
                    for (let [z, $] of Object.entries(H)) Z.headers[z.toLowerCase()] = $
            } else if (A.listenerCount("redirect") === 0) {
                let H = I ? A._originalIpc ? D.socketPath === A._originalHostOrSocketPath : !1 : A._originalIpc ? !1 : G.host === A._originalHostOrSocketPath;
                if (!H || A._originalSecure && !F) {
                    if (delete D.headers.authorization, delete D.headers.cookie, !H) delete D.headers.host;
                    D.auth = void 0
                }
            }
            if (D.auth && !Z.headers.authorization) Z.headers.authorization = "Basic " + Buffer.from(D.auth).toString("base64");
            if (K = A._req = X(D), A._redirects) A.emit("redirect", A.url, K)
        } else K = A._req = X(D);
        if (D.timeout) K.on("timeout", () => {
            vK(A, K, "Opening handshake has timed out")
        });
        if (K.on("error", (H) => {
                if (K === null || K[MM2]) return;
                K = A._req = null, RO1(A, H)
            }), K.on("response", (H) => {
                let z = H.headers.location,
                    $ = H.statusCode;
                if (z && D.followRedirects && $ >= 300 && $ < 400) {
                    if (++A._redirects > D.maxRedirects) {
                        vK(A, K, "Maximum redirects exceeded");
                        return
                    }
                    K.abort();
                    let L;
                    try {
                        L = new TF0(z, B)
                    } catch (N) {
                        let R = new SyntaxError(`Invalid URL: ${z}`);
                        RO1(A, R);
                        return
                    }
                    RM2(A, L, Q, Z)
                } else if (!A.emit("unexpected-response", K, H)) vK(A, K, `Unexpected server response: ${H.statusCode}`)
            }), K.on("upgrade", (H, z, $) => {
                if (A.emit("upgrade", H), A.readyState !== sQ.CONNECTING) return;
                K = A._req = null;
                let L = H.headers.upgrade;
                if (L === void 0 || L.toLowerCase() !== "websocket") {
                    vK(A, z, "Invalid Upgrade header");
                    return
                }
                let N = aa4("sha1").update(J + ta4).digest("base64");
                if (H.headers["sec-websocket-accept"] !== N) {
                    vK(A, z, "Invalid Sec-WebSocket-Accept header");
                    return
                }
                let R = H.headers["sec-websocket-protocol"],
                    O;
                if (R !== void 0) {
                    if (!V.size) O = "Server sent a subprotocol but none was requested";
                    else if (!V.has(R)) O = "Server sent an invalid subprotocol"
                } else if (V.size) O = "Server sent no subprotocol";
                if (O) {
                    vK(A, z, O);
                    return
                }
                if (R) A._protocol = R;
                let P = H.headers["sec-websocket-extensions"];
                if (P !== void 0) {
                    if (!C) {
                        vK(A, z, "Server sent a Sec-WebSocket-Extensions header but no extension was requested");
                        return
                    }
                    let j;
                    try {
                        j = Ds4(P)
                    } catch (k) {
                        vK(A, z, "Invalid Sec-WebSocket-Extensions header");
                        return
                    }
                    let f = Object.keys(j);
                    if (f.length !== 1 || f[0] !== l_.extensionName) {
                        vK(A, z, "Server indicated an extension that was not requested");
                        return
                    }
                    try {
                        C.accept(j[l_.extensionName])
                    } catch (k) {
                        vK(A, z, "Invalid Sec-WebSocket-Extensions header");
                        return
                    }
                    A._extensions[l_.extensionName] = C
                }
                A.setSocket(z, $, {
                    allowSynchronousEvents: D.allowSynchronousEvents,
                    generateMask: D.generateMask,
                    maxPayload: D.maxPayload,
                    skipUTF8Validation: D.skipUTF8Validation
                })
            }), D.finishRequest) D.finishRequest(K, A);
        else K.end()
    }

    function RO1(A, B) {
        A._readyState = sQ.CLOSING, A._errorEmitted = !0, A.emit("error", B), A.emitClose()
    }

    function Is4(A) {
        return A.path = A.socketPath, NM2.connect(A)
    }

    function Ys4(A) {
        if (A.path = void 0, !A.servername && A.servername !== "") A.servername = NM2.isIP(A.host) ? "" : A.host;
        return ia4.connect(A)
    }

    function vK(A, B, Q) {
        A._readyState = sQ.CLOSING;
        let Z = new Error(Q);
        if (Error.captureStackTrace(Z, vK), B.setHeader) {
            if (B[MM2] = !0, B.abort(), B.socket && !B.socket.destroyed) B.socket.destroy();
            process.nextTick(RO1, A, Z)
        } else B.destroy(Z), B.once("error", A.emit.bind(A, "error")), B.once("close", A.emitClose.bind(A))
    }

    function jF0(A, B, Q) {
        if (B) {
            let Z = oa4(B) ? B.size : Gs4(B).length;
            if (A._socket) A._sender._bufferedBytes += Z;
            else A._bufferedAmount += Z
        }
        if (Q) {
            let Z = new Error(`WebSocket is not open: readyState ${A.readyState} (${zP[A.readyState]})`);
            process.nextTick(Q, Z)
        }
    }

    function Ws4(A, B) {
        let Q = this[wI];
        if (Q._closeFrameReceived = !0, Q._closeMessage = B, Q._closeCode = A, Q._socket[wI] === void 0) return;
        if (Q._socket.removeListener("data", OO1), process.nextTick(OM2, Q._socket), A === 1005) Q.close();
        else Q.close(A, B)
    }

    function Js4() {
        let A = this[wI];
        if (!A.isPaused) A._socket.resume()
    }

    function Xs4(A) {
        let B = this[wI];
        if (B._socket[wI] !== void 0) B._socket.removeListener("data", OO1), process.nextTick(OM2, B._socket), B.close(A[As4]);
        if (!B._errorEmitted) B._errorEmitted = !0, B.emit("error", A)
    }

    function qM2() {
        this[wI].emitClose()
    }

    function Vs4(A, B) {
        this[wI].emit("message", A, B)
    }

    function Cs4(A) {
        let B = this[wI];
        if (B._autoPong) B.pong(A, !this._isServer, LM2);
        B.emit("ping", A)
    }

    function Ks4(A) {
        this[wI].emit("pong", A)
    }

    function OM2(A) {
        A.resume()
    }

    function Hs4(A) {
        let B = this[wI];
        if (B.readyState === sQ.CLOSED) return;
        if (B.readyState === sQ.OPEN) B._readyState = sQ.CLOSING, TM2(B);
        if (this._socket.end(), !B._errorEmitted) B._errorEmitted = !0, B.emit("error", A)
    }

    function TM2(A) {
        A._closeTimer = setTimeout(A._socket.destroy.bind(A._socket), 30000)
    }

    function PM2() {
        let A = this[wI];
        this.removeListener("close", PM2), this.removeListener("data", OO1), this.removeListener("end", SM2), A._readyState = sQ.CLOSING;
        let B;
        if (!this._readableState.endEmitted && !A._closeFrameReceived && !A._receiver._writableState.errorEmitted && (B = A._socket.read()) !== null) A._receiver.write(B);
        if (A._receiver.end(), this[wI] = void 0, clearTimeout(A._closeTimer), A._receiver._writableState.finished || A._receiver._writableState.errorEmitted) A.emitClose();
        else A._receiver.on("error", qM2), A._receiver.on("finish", qM2)
    }

    function OO1(A) {
        if (!this[wI]._receiver.write(A)) this.pause()
    }

    function SM2() {
        let A = this[wI];
        A._readyState = sQ.CLOSING, A._receiver.end(), this.end()
    }

    function jM2() {
        let A = this[wI];
        if (this.removeListener("error", jM2), this.on("error", LM2), A) A._readyState = sQ.CLOSING, this.destroy()
    }
});