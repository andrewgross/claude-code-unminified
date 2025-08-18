/* chunk:296 bytes:[6414162, 6427923) size:13761 source:unpacked-cli.js */
var vM2 = E((TS5, xM2) => {
    var OS5 = TO1(),
        {
            Duplex: zs4
        } = W1("stream");

    function yM2(A) {
        A.emit("close")
    }

    function Es4() {
        if (!this.destroyed && this._writableState.finished) this.destroy()
    }

    function _M2(A) {
        if (this.removeListener("error", _M2), this.destroy(), this.listenerCount("error") === 0) this.emit("error", A)
    }

    function Us4(A, B) {
        let Q = !0,
            Z = new zs4({
                ...B,
                autoDestroy: !1,
                emitClose: !1,
                objectMode: !1,
                writableObjectMode: !1
            });
        return A.on("message", function D(G, F) {
            let I = !F && Z._readableState.objectMode ? G.toString() : G;
            if (!Z.push(I)) A.pause()
        }), A.once("error", function D(G) {
            if (Z.destroyed) return;
            Q = !1, Z.destroy(G)
        }), A.once("close", function D() {
            if (Z.destroyed) return;
            Z.push(null)
        }), Z._destroy = function(D, G) {
            if (A.readyState === A.CLOSED) {
                G(D), process.nextTick(yM2, Z);
                return
            }
            let F = !1;
            if (A.once("error", function I(Y) {
                    F = !0, G(Y)
                }), A.once("close", function I() {
                    if (!F) G(D);
                    process.nextTick(yM2, Z)
                }), Q) A.terminate()
        }, Z._final = function(D) {
            if (A.readyState === A.CONNECTING) {
                A.once("open", function G() {
                    Z._final(D)
                });
                return
            }
            if (A._socket === null) return;
            if (A._socket._writableState.finished) {
                if (D(), Z._readableState.endEmitted) Z.destroy()
            } else A._socket.once("finish", function G() {
                D()
            }), A.close()
        }, Z._read = function() {
            if (A.isPaused) A.resume()
        }, Z._write = function(D, G, F) {
            if (A.readyState === A.CONNECTING) {
                A.once("open", function I() {
                    Z._write(D, G, F)
                });
                return
            }
            A.send(D, F)
        }, Z.on("end", Es4), Z.on("error", _M2), Z
    }
    xM2.exports = Us4
});
var fM2 = E((PS5, bM2) => {
    var {
        tokenChars: ws4
    } = lo();

    function $s4(A) {
        let B = new Set,
            Q = -1,
            Z = -1,
            D = 0;
        for (D; D < A.length; D++) {
            let F = A.charCodeAt(D);
            if (Z === -1 && ws4[F] === 1) {
                if (Q === -1) Q = D
            } else if (D !== 0 && (F === 32 || F === 9)) {
                if (Z === -1 && Q !== -1) Z = D
            } else if (F === 44) {
                if (Q === -1) throw new SyntaxError(`Unexpected character at index ${D}`);
                if (Z === -1) Z = D;
                let I = A.slice(Q, Z);
                if (B.has(I)) throw new SyntaxError(`The "${I}" subprotocol is duplicated`);
                B.add(I), Q = Z = -1
            } else throw new SyntaxError(`Unexpected character at index ${D}`)
        }
        if (Q === -1 || Z !== -1) throw new SyntaxError("Unexpected end of input");
        let G = A.slice(Q, D);
        if (B.has(G)) throw new SyntaxError(`The "${G}" subprotocol is duplicated`);
        return B.add(G), B
    }
    bM2.exports = {
        parse: $s4
    }
});
var dM2 = E((jS5, mM2) => {
    var qs4 = W1("events"),
        PO1 = W1("http"),
        {
            Duplex: SS5
        } = W1("stream"),
        {
            createHash: Ns4
        } = W1("crypto"),
        hM2 = OF0(),
        Su = A31(),
        Ls4 = fM2(),
        Ms4 = TO1(),
        {
            GUID: Rs4,
            kWebSocket: Os4
        } = KP(),
        Ts4 = /^[+/0-9A-Za-z]{22}==$/;
    class uM2 extends qs4 {
        constructor(A, B) {
            super();
            if (A = {
                    allowSynchronousEvents: !0,
                    autoPong: !0,
                    maxPayload: 104857600,
                    skipUTF8Validation: !1,
                    perMessageDeflate: !1,
                    handleProtocols: null,
                    clientTracking: !0,
                    verifyClient: null,
                    noServer: !1,
                    backlog: null,
                    server: null,
                    host: null,
                    path: null,
                    port: null,
                    WebSocket: Ms4,
                    ...A
                }, A.port == null && !A.server && !A.noServer || A.port != null && (A.server || A.noServer) || A.server && A.noServer) throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');
            if (A.port != null) this._server = PO1.createServer((Q, Z) => {
                let D = PO1.STATUS_CODES[426];
                Z.writeHead(426, {
                    "Content-Length": D.length,
                    "Content-Type": "text/plain"
                }), Z.end(D)
            }), this._server.listen(A.port, A.host, A.backlog, B);
            else if (A.server) this._server = A.server;
            if (this._server) {
                let Q = this.emit.bind(this, "connection");
                this._removeListeners = Ps4(this._server, {
                    listening: this.emit.bind(this, "listening"),
                    error: this.emit.bind(this, "error"),
                    upgrade: (Z, D, G) => {
                        this.handleUpgrade(Z, D, G, Q)
                    }
                })
            }
            if (A.perMessageDeflate === !0) A.perMessageDeflate = {};
            if (A.clientTracking) this.clients = new Set, this._shouldEmitClose = !1;
            this.options = A, this._state = 0
        }
        address() {
            if (this.options.noServer) throw new Error('The server is operating in "noServer" mode');
            if (!this._server) return null;
            return this._server.address()
        }
        close(A) {
            if (this._state === 2) {
                if (A) this.once("close", () => {
                    A(new Error("The server is not running"))
                });
                process.nextTick(D31, this);
                return
            }
            if (A) this.once("close", A);
            if (this._state === 1) return;
            if (this._state = 1, this.options.noServer || this.options.server) {
                if (this._server) this._removeListeners(), this._removeListeners = this._server = null;
                if (this.clients)
                    if (!this.clients.size) process.nextTick(D31, this);
                    else this._shouldEmitClose = !0;
                else process.nextTick(D31, this)
            } else {
                let B = this._server;
                this._removeListeners(), this._removeListeners = this._server = null, B.close(() => {
                    D31(this)
                })
            }
        }
        shouldHandle(A) {
            if (this.options.path) {
                let B = A.url.indexOf("?");
                if ((B !== -1 ? A.url.slice(0, B) : A.url) !== this.options.path) return !1
            }
            return !0
        }
        handleUpgrade(A, B, Q, Z) {
            B.on("error", gM2);
            let D = A.headers["sec-websocket-key"],
                G = A.headers.upgrade,
                F = +A.headers["sec-websocket-version"];
            if (A.method !== "GET") {
                ju(this, A, B, 405, "Invalid HTTP method");
                return
            }
            if (G === void 0 || G.toLowerCase() !== "websocket") {
                ju(this, A, B, 400, "Invalid Upgrade header");
                return
            }
            if (D === void 0 || !Ts4.test(D)) {
                ju(this, A, B, 400, "Missing or invalid Sec-WebSocket-Key header");
                return
            }
            if (F !== 13 && F !== 8) {
                ju(this, A, B, 400, "Missing or invalid Sec-WebSocket-Version header", {
                    "Sec-WebSocket-Version": "13, 8"
                });
                return
            }
            if (!this.shouldHandle(A)) {
                G31(B, 400);
                return
            }
            let I = A.headers["sec-websocket-protocol"],
                Y = new Set;
            if (I !== void 0) try {
                Y = Ls4.parse(I)
            } catch (X) {
                ju(this, A, B, 400, "Invalid Sec-WebSocket-Protocol header");
                return
            }
            let W = A.headers["sec-websocket-extensions"],
                J = {};
            if (this.options.perMessageDeflate && W !== void 0) {
                let X = new Su(this.options.perMessageDeflate, !0, this.options.maxPayload);
                try {
                    let V = hM2.parse(W);
                    if (V[Su.extensionName]) X.accept(V[Su.extensionName]), J[Su.extensionName] = X
                } catch (V) {
                    ju(this, A, B, 400, "Invalid or unacceptable Sec-WebSocket-Extensions header");
                    return
                }
            }
            if (this.options.verifyClient) {
                let X = {
                    origin: A.headers[`${F===8?"sec-websocket-origin":"origin"}`],
                    secure: !!(A.socket.authorized || A.socket.encrypted),
                    req: A
                };
                if (this.options.verifyClient.length === 2) {
                    this.options.verifyClient(X, (V, C, K, H) => {
                        if (!V) return G31(B, C || 401, K, H);
                        this.completeUpgrade(J, D, Y, A, B, Q, Z)
                    });
                    return
                }
                if (!this.options.verifyClient(X)) return G31(B, 401)
            }
            this.completeUpgrade(J, D, Y, A, B, Q, Z)
        }
        completeUpgrade(A, B, Q, Z, D, G, F) {
            if (!D.readable || !D.writable) return D.destroy();
            if (D[Os4]) throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");
            if (this._state > 0) return G31(D, 503);
            let Y = ["HTTP/1.1 101 Switching Protocols", "Upgrade: websocket", "Connection: Upgrade", `Sec-WebSocket-Accept: ${Ns4("sha1").update(B+Rs4).digest("base64")}`],
                W = new this.options.WebSocket(null, void 0, this.options);
            if (Q.size) {
                let J = this.options.handleProtocols ? this.options.handleProtocols(Q, Z) : Q.values().next().value;
                if (J) Y.push(`Sec-WebSocket-Protocol: ${J}`), W._protocol = J
            }
            if (A[Su.extensionName]) {
                let J = A[Su.extensionName].params,
                    X = hM2.format({
                        [Su.extensionName]: [J]
                    });
                Y.push(`Sec-WebSocket-Extensions: ${X}`), W._extensions = A
            }
            if (this.emit("headers", Y, Z), D.write(Y.concat(`\r
`).join(`\r
`)), D.removeListener("error", gM2), W.setSocket(D, G, {
                    allowSynchronousEvents: this.options.allowSynchronousEvents,
                    maxPayload: this.options.maxPayload,
                    skipUTF8Validation: this.options.skipUTF8Validation
                }), this.clients) this.clients.add(W), W.on("close", () => {
                if (this.clients.delete(W), this._shouldEmitClose && !this.clients.size) process.nextTick(D31, this)
            });
            F(W, Z)
        }
    }
    mM2.exports = uM2;

    function Ps4(A, B) {
        for (let Q of Object.keys(B)) A.on(Q, B[Q]);
        return function Q() {
            for (let Z of Object.keys(B)) A.removeListener(Z, B[Z])
        }
    }

    function D31(A) {
        A._state = 2, A.emit("close")
    }

    function gM2() {
        this.destroy()
    }

    function G31(A, B, Q, Z) {
        Q = Q || PO1.STATUS_CODES[B], Z = {
            Connection: "close",
            "Content-Type": "text/html",
            "Content-Length": Buffer.byteLength(Q),
            ...Z
        }, A.once("finish", A.destroy), A.end(`HTTP/1.1 ${B} ${PO1.STATUS_CODES[B]}\r
` + Object.keys(Z).map((D) => `${D}: ${Z[D]}`).join(`\r
`) + `\r
\r
` + Q)
    }

    function ju(A, B, Q, Z, D, G) {
        if (A.listenerCount("wsClientError")) {
            let F = new Error(D);
            Error.captureStackTrace(F, ju), A.emit("wsClientError", F, Q, B)
        } else G31(Q, Z, D, G)
    }
});
var Ss4, js4, ks4, SO1, ys4, aL;
var F31 = K21(() => {
    Ss4 = G1(vM2(), 1), js4 = G1(NF0(), 1), ks4 = G1(MF0(), 1), SO1 = G1(TO1(), 1), ys4 = G1(dM2(), 1), aL = SO1.default
});
var jO1;
var cM2 = K21(() => {
    F31();
    jO1 = global;
    jO1.WebSocket ||= aL;
    jO1.window ||= global;
    jO1.self ||= global;
    jO1.window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ = [{
        type: 1,
        value: 7,
        isEnabled: !0
    }, {
        type: 2,
        value: "InternalApp",
        isEnabled: !0,
        isValid: !0
    }, {
        type: 2,
        value: "InternalAppContext",
        isEnabled: !0,
        isValid: !0
    }, {
        type: 2,
        value: "InternalStdoutContext",
        isEnabled: !0,
        isValid: !0
    }, {
        type: 2,
        value: "InternalStderrContext",
        isEnabled: !0,
        isValid: !0
    }, {
        type: 2,
        value: "InternalStdinContext",
        isEnabled: !0,
        isValid: !0
    }, {
        type: 2,
        value: "InternalFocusContext",
        isEnabled: !0,
        isValid: !0
    }]
});