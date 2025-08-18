/* chunk:148 bytes:[3291108, 3304033) size:12925 source:unpacked-cli.js */
var _41 = E((I85, tkA) => {
    var {
        kReadyState: k41,
        kController: CvQ,
        kResponse: KvQ,
        kBinaryType: HvQ,
        kWebSocketURL: zvQ
    } = j41(), {
        states: y41,
        opcodes: Jy
    } = Fg(), {
        ErrorEvent: EvQ,
        createFastMessageEvent: UvQ
    } = Ba(), {
        isUtf8: wvQ
    } = W1("node:buffer"), {
        collectASequenceOfCodePointsFast: $vQ,
        removeHTTPWhitespace: lkA
    } = NV();

    function qvQ(A) {
        return A[k41] === y41.CONNECTING
    }

    function NvQ(A) {
        return A[k41] === y41.OPEN
    }

    function LvQ(A) {
        return A[k41] === y41.CLOSING
    }

    function MvQ(A) {
        return A[k41] === y41.CLOSED
    }

    function D20(A, B, Q = (D, G) => new Event(D, G), Z = {}) {
        let D = Q(A, Z);
        B.dispatchEvent(D)
    }

    function RvQ(A, B, Q) {
        if (A[k41] !== y41.OPEN) return;
        let Z;
        if (B === Jy.TEXT) try {
            Z = okA(Q)
        } catch {
            ikA(A, "Received invalid UTF-8 in text frame.");
            return
        } else if (B === Jy.BINARY)
            if (A[HvQ] === "blob") Z = new Blob([Q]);
            else Z = OvQ(Q);
        D20("message", A, UvQ, {
            origin: A[zvQ].origin,
            data: Z
        })
    }

    function OvQ(A) {
        if (A.byteLength === A.buffer.byteLength) return A.buffer;
        return A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength)
    }

    function TvQ(A) {
        if (A.length === 0) return !1;
        for (let B = 0; B < A.length; ++B) {
            let Q = A.charCodeAt(B);
            if (Q < 33 || Q > 126 || Q === 34 || Q === 40 || Q === 41 || Q === 44 || Q === 47 || Q === 58 || Q === 59 || Q === 60 || Q === 61 || Q === 62 || Q === 63 || Q === 64 || Q === 91 || Q === 92 || Q === 93 || Q === 123 || Q === 125) return !1
        }
        return !0
    }

    function PvQ(A) {
        if (A >= 1000 && A < 1015) return A !== 1004 && A !== 1005 && A !== 1006;
        return A >= 3000 && A <= 4999
    }

    function ikA(A, B) {
        let {
            [CvQ]: Q, [KvQ]: Z
        } = A;
        if (Q.abort(), Z?.socket && !Z.socket.destroyed) Z.socket.destroy();
        if (B) D20("error", A, (D, G) => new EvQ(D, G), {
            error: new Error(B),
            message: B
        })
    }

    function nkA(A) {
        return A === Jy.CLOSE || A === Jy.PING || A === Jy.PONG
    }

    function akA(A) {
        return A === Jy.CONTINUATION
    }

    function skA(A) {
        return A === Jy.TEXT || A === Jy.BINARY
    }

    function SvQ(A) {
        return skA(A) || akA(A) || nkA(A)
    }

    function jvQ(A) {
        let B = {
                position: 0
            },
            Q = new Map;
        while (B.position < A.length) {
            let Z = $vQ(";", A, B),
                [D, G = ""] = Z.split("=");
            Q.set(lkA(D, !0, !1), lkA(G, !1, !0)), B.position++
        }
        return Q
    }

    function kvQ(A) {
        for (let B = 0; B < A.length; B++) {
            let Q = A.charCodeAt(B);
            if (Q < 48 || Q > 57) return !1
        }
        return !0
    }
    var rkA = typeof process.versions.icu === "string",
        pkA = rkA ? new TextDecoder("utf-8", {
            fatal: !0
        }) : void 0,
        okA = rkA ? pkA.decode.bind(pkA) : function(A) {
            if (wvQ(A)) return A.toString("utf-8");
            throw new TypeError("Invalid utf-8 received.")
        };
    tkA.exports = {
        isConnecting: qvQ,
        isEstablished: NvQ,
        isClosing: LvQ,
        isClosed: MvQ,
        fireEvent: D20,
        isValidSubprotocol: TvQ,
        isValidStatusCode: PvQ,
        failWebsocketConnection: ikA,
        websocketMessageReceived: RvQ,
        utf8Decode: okA,
        isControlFrame: nkA,
        isContinuationFrame: akA,
        isTextBinaryFrame: skA,
        isValidOpcode: SvQ,
        parseExtensions: jvQ,
        isValidClientWindowBits: kvQ
    }
});
var Jw1 = E((Y85, AyA) => {
    var {
        maxUnsigned16Bit: yvQ
    } = Fg(), G20, x41 = null, Qa = 16386;
    try {
        G20 = W1("node:crypto")
    } catch {
        G20 = {
            randomFillSync: function A(B, Q, Z) {
                for (let D = 0; D < B.length; ++D) B[D] = Math.random() * 255 | 0;
                return B
            }
        }
    }

    function _vQ() {
        if (Qa === 16386) Qa = 0, G20.randomFillSync(x41 ??= Buffer.allocUnsafe(16386), 0, 16386);
        return [x41[Qa++], x41[Qa++], x41[Qa++], x41[Qa++]]
    }
    class ekA {
        constructor(A) {
            this.frameData = A
        }
        createFrame(A) {
            let B = this.frameData,
                Q = _vQ(),
                Z = B?.byteLength ?? 0,
                D = Z,
                G = 6;
            if (Z > yvQ) G += 8, D = 127;
            else if (Z > 125) G += 2, D = 126;
            let F = Buffer.allocUnsafe(Z + G);
            F[0] = F[1] = 0, F[0] |= 128, F[0] = (F[0] & 240) + A; /*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> */
            if (F[G - 4] = Q[0], F[G - 3] = Q[1], F[G - 2] = Q[2], F[G - 1] = Q[3], F[1] = D, D === 126) F.writeUInt16BE(Z, 2);
            else if (D === 127) F[2] = F[3] = 0, F.writeUIntBE(Z, 4, 6);
            F[1] |= 128;
            for (let I = 0; I < Z; ++I) F[G + I] = B[I] ^ Q[I & 3];
            return F
        }
    }
    AyA.exports = {
        WebsocketFrameSend: ekA
    }
});
var I20 = E((W85, IyA) => {
    var {
        uid: xvQ,
        states: v41,
        sentCloseFrameState: Xw1,
        emptyBuffer: vvQ,
        opcodes: bvQ
    } = Fg(), {
        kReadyState: b41,
        kSentClose: Vw1,
        kByteParser: QyA,
        kReceivedClose: ByA,
        kResponse: ZyA
    } = j41(), {
        fireEvent: fvQ,
        failWebsocketConnection: Xy,
        isClosing: hvQ,
        isClosed: gvQ,
        isEstablished: uvQ,
        parseExtensions: mvQ
    } = _41(), {
        channels: Za
    } = zn(), {
        CloseEvent: dvQ
    } = Ba(), {
        makeRequest: cvQ
    } = sn(), {
        fetching: lvQ
    } = R41(), {
        Headers: pvQ,
        getHeadersList: ivQ
    } = Bg(), {
        getDecodeSplit: nvQ
    } = AK(), {
        WebsocketFrameSend: avQ
    } = Jw1(), F20;
    try {
        F20 = W1("node:crypto")
    } catch {}

    function svQ(A, B, Q, Z, D, G) {
        let F = A;
        F.protocol = A.protocol === "ws:" ? "http:" : "https:";
        let I = cvQ({
            urlList: [F],
            client: Q,
            serviceWorkers: "none",
            referrer: "no-referrer",
            mode: "websocket",
            credentials: "include",
            cache: "no-store",
            redirect: "error"
        });
        if (G.headers) {
            let X = ivQ(new pvQ(G.headers));
            I.headersList = X
        }
        let Y = F20.randomBytes(16).toString("base64");
        I.headersList.append("sec-websocket-key", Y), I.headersList.append("sec-websocket-version", "13");
        for (let X of B) I.headersList.append("sec-websocket-protocol", X);
        let W = "permessage-deflate; client_max_window_bits";
        return I.headersList.append("sec-websocket-extensions", W), lvQ({
            request: I,
            useParallelQueue: !0,
            dispatcher: G.dispatcher,
            processResponse(X) {
                if (X.type === "error" || X.status !== 101) {
                    Xy(Z, "Received network error or non-101 status code.");
                    return
                }
                if (B.length !== 0 && !X.headersList.get("Sec-WebSocket-Protocol")) {
                    Xy(Z, "Server did not respond with sent protocols.");
                    return
                }
                if (X.headersList.get("Upgrade")?.toLowerCase() !== "websocket") {
                    Xy(Z, 'Server did not set Upgrade header to "websocket".');
                    return
                }
                if (X.headersList.get("Connection")?.toLowerCase() !== "upgrade") {
                    Xy(Z, 'Server did not set Connection header to "upgrade".');
                    return
                }
                let V = X.headersList.get("Sec-WebSocket-Accept"),
                    C = F20.createHash("sha1").update(Y + xvQ).digest("base64");
                if (V !== C) {
                    Xy(Z, "Incorrect hash received in Sec-WebSocket-Accept header.");
                    return
                }
                let K = X.headersList.get("Sec-WebSocket-Extensions"),
                    H;
                if (K !== null) {
                    if (H = mvQ(K), !H.has("permessage-deflate")) {
                        Xy(Z, "Sec-WebSocket-Extensions header does not match.");
                        return
                    }
                }
                let z = X.headersList.get("Sec-WebSocket-Protocol");
                if (z !== null) {
                    if (!nvQ("sec-websocket-protocol", I.headersList).includes(z)) {
                        Xy(Z, "Protocol was not set in the opening handshake.");
                        return
                    }
                }
                if (X.socket.on("data", DyA), X.socket.on("close", GyA), X.socket.on("error", FyA), Za.open.hasSubscribers) Za.open.publish({
                    address: X.socket.address(),
                    protocol: z,
                    extensions: K
                });
                D(X, H)
            }
        })
    }

    function rvQ(A, B, Q, Z) {
        if (hvQ(A) || gvQ(A));
        else if (!uvQ(A)) Xy(A, "Connection was closed before it was established."), A[b41] = v41.CLOSING;
        else if (A[Vw1] === Xw1.NOT_SENT) {
            A[Vw1] = Xw1.PROCESSING;
            let D = new avQ;
            if (B !== void 0 && Q === void 0) D.frameData = Buffer.allocUnsafe(2), D.frameData.writeUInt16BE(B, 0);
            else if (B !== void 0 && Q !== void 0) D.frameData = Buffer.allocUnsafe(2 + Z), D.frameData.writeUInt16BE(B, 0), D.frameData.write(Q, 2, "utf-8");
            else D.frameData = vvQ;
            A[ZyA].socket.write(D.createFrame(bvQ.CLOSE)), A[Vw1] = Xw1.SENT, A[b41] = v41.CLOSING
        } else A[b41] = v41.CLOSING
    }

    function DyA(A) {
        if (!this.ws[QyA].write(A)) this.pause()
    }

    function GyA() {
        let {
            ws: A
        } = this, {
            [ZyA]: B
        } = A;
        B.socket.off("data", DyA), B.socket.off("close", GyA), B.socket.off("error", FyA);
        let Q = A[Vw1] === Xw1.SENT && A[ByA],
            Z = 1005,
            D = "",
            G = A[QyA].closingInfo;
        if (G && !G.error) Z = G.code ?? 1005, D = G.reason;
        else if (!A[ByA]) Z = 1006;
        if (A[b41] = v41.CLOSED, fvQ("close", A, (F, I) => new dvQ(F, I), {
                wasClean: Q,
                code: Z,
                reason: D
            }), Za.close.hasSubscribers) Za.close.publish({
            websocket: A,
            code: Z,
            reason: D
        })
    }

    function FyA(A) {
        let {
            ws: B
        } = this;
        if (B[b41] = v41.CLOSING, Za.socketError.hasSubscribers) Za.socketError.publish(A);
        this.destroy()
    }
    IyA.exports = {
        establishWebSocketConnection: svQ,
        closeWebSocketConnection: rvQ
    }
});
var JyA = E((J85, WyA) => {
    var {
        createInflateRaw: ovQ,
        Z_DEFAULT_WINDOWBITS: tvQ
    } = W1("node:zlib"), {
        isValidClientWindowBits: evQ
    } = _41(), AbQ = Buffer.from([0, 0, 255, 255]), Cw1 = Symbol("kBuffer"), Kw1 = Symbol("kLength");
    class YyA {
        #A;
        #B = {};
        constructor(A) {
            this.#B.serverNoContextTakeover = A.has("server_no_context_takeover"), this.#B.serverMaxWindowBits = A.get("server_max_window_bits")
        }
        decompress(A, B, Q) {
            if (!this.#A) {
                let Z = tvQ;
                if (this.#B.serverMaxWindowBits) {
                    if (!evQ(this.#B.serverMaxWindowBits)) {
                        Q(new Error("Invalid server_max_window_bits"));
                        return
                    }
                    Z = Number.parseInt(this.#B.serverMaxWindowBits)
                }
                this.#A = ovQ({
                    windowBits: Z
                }), this.#A[Cw1] = [], this.#A[Kw1] = 0, this.#A.on("data", (D) => {
                    this.#A[Cw1].push(D), this.#A[Kw1] += D.length
                }), this.#A.on("error", (D) => {
                    this.#A = null, Q(D)
                })
            }
            if (this.#A.write(A), B) this.#A.write(AbQ);
            this.#A.flush(() => {
                let Z = Buffer.concat(this.#A[Cw1], this.#A[Kw1]);
                this.#A[Cw1].length = 0, this.#A[Kw1] = 0, Q(null, Z)
            })
        }
    }
    WyA.exports = {
        PerMessageDeflate: YyA
    }
});