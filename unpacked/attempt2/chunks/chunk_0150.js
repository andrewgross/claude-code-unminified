/* chunk:150 bytes:[3314950, 3330537) size:15587 source:unpacked-cli.js */
var fyA = E((C85, byA) => {
    var {
        webidl: vQ
    } = NY(), {
        URLSerializer: CbQ
    } = NV(), {
        environmentSettingsObject: SyA
    } = AK(), {
        staticPropertyDescriptors: Vy,
        states: f41,
        sentCloseFrameState: KbQ,
        sendHints: zw1
    } = Fg(), {
        kWebSocketURL: jyA,
        kReadyState: W20,
        kController: HbQ,
        kBinaryType: Ew1,
        kResponse: kyA,
        kSentClose: zbQ,
        kByteParser: EbQ
    } = j41(), {
        isConnecting: UbQ,
        isEstablished: wbQ,
        isClosing: $bQ,
        isValidSubprotocol: qbQ,
        fireEvent: yyA
    } = _41(), {
        establishWebSocketConnection: NbQ,
        closeWebSocketConnection: _yA
    } = I20(), {
        ByteParser: LbQ
    } = NyA(), {
        kEnumerableProperty: Pz,
        isBlobLike: xyA
    } = e4(), {
        getGlobalDispatcher: MbQ
    } = fU1(), {
        types: vyA
    } = W1("node:util"), {
        ErrorEvent: RbQ,
        CloseEvent: ObQ
    } = Ba(), {
        SendQueue: TbQ
    } = PyA();
    class b5 extends EventTarget {
        #A = {
            open: null,
            error: null,
            close: null,
            message: null
        };
        #B = 0;
        #Q = "";
        #Z = "";
        #D;
        constructor(A, B = []) {
            super();
            vQ.util.markAsUncloneable(this);
            let Q = "WebSocket constructor";
            vQ.argumentLengthCheck(arguments, 1, Q);
            let Z = vQ.converters["DOMString or sequence<DOMString> or WebSocketInit"](B, Q, "options");
            A = vQ.converters.USVString(A, Q, "url"), B = Z.protocols;
            let D = SyA.settingsObject.baseUrl,
                G;
            try {
                G = new URL(A, D)
            } catch (I) {
                throw new DOMException(I, "SyntaxError")
            }
            if (G.protocol === "http:") G.protocol = "ws:";
            else if (G.protocol === "https:") G.protocol = "wss:";
            if (G.protocol !== "ws:" && G.protocol !== "wss:") throw new DOMException(`Expected a ws: or wss: protocol, got ${G.protocol}`, "SyntaxError");
            if (G.hash || G.href.endsWith("#")) throw new DOMException("Got fragment", "SyntaxError");
            if (typeof B === "string") B = [B];
            if (B.length !== new Set(B.map((I) => I.toLowerCase())).size) throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
            if (B.length > 0 && !B.every((I) => qbQ(I))) throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
            this[jyA] = new URL(G.href);
            let F = SyA.settingsObject;
            this[HbQ] = NbQ(G, B, F, this, (I, Y) => this.#Y(I, Y), Z), this[W20] = b5.CONNECTING, this[zbQ] = KbQ.NOT_SENT, this[Ew1] = "blob"
        }
        close(A = void 0, B = void 0) {
            vQ.brandCheck(this, b5);
            let Q = "WebSocket.close";
            if (A !== void 0) A = vQ.converters["unsigned short"](A, Q, "code", {
                clamp: !0
            });
            if (B !== void 0) B = vQ.converters.USVString(B, Q, "reason");
            if (A !== void 0) {
                if (A !== 1000 && (A < 3000 || A > 4999)) throw new DOMException("invalid code", "InvalidAccessError")
            }
            let Z = 0;
            if (B !== void 0) {
                if (Z = Buffer.byteLength(B), Z > 123) throw new DOMException(`Reason must be less than 123 bytes; received ${Z}`, "SyntaxError")
            }
            _yA(this, A, B, Z)
        }
        send(A) {
            vQ.brandCheck(this, b5);
            let B = "WebSocket.send";
            if (vQ.argumentLengthCheck(arguments, 1, B), A = vQ.converters.WebSocketSendData(A, B, "data"), UbQ(this)) throw new DOMException("Sent before connected.", "InvalidStateError");
            if (!wbQ(this) || $bQ(this)) return;
            if (typeof A === "string") {
                let Q = Buffer.byteLength(A);
                this.#B += Q, this.#D.add(A, () => {
                    this.#B -= Q
                }, zw1.string)
            } else if (vyA.isArrayBuffer(A)) this.#B += A.byteLength, this.#D.add(A, () => {
                this.#B -= A.byteLength
            }, zw1.arrayBuffer);
            else if (ArrayBuffer.isView(A)) this.#B += A.byteLength, this.#D.add(A, () => {
                this.#B -= A.byteLength
            }, zw1.typedArray);
            else if (xyA(A)) this.#B += A.size, this.#D.add(A, () => {
                this.#B -= A.size
            }, zw1.blob)
        }
        get readyState() {
            return vQ.brandCheck(this, b5), this[W20]
        }
        get bufferedAmount() {
            return vQ.brandCheck(this, b5), this.#B
        }
        get url() {
            return vQ.brandCheck(this, b5), CbQ(this[jyA])
        }
        get extensions() {
            return vQ.brandCheck(this, b5), this.#Z
        }
        get protocol() {
            return vQ.brandCheck(this, b5), this.#Q
        }
        get onopen() {
            return vQ.brandCheck(this, b5), this.#A.open
        }
        set onopen(A) {
            if (vQ.brandCheck(this, b5), this.#A.open) this.removeEventListener("open", this.#A.open);
            if (typeof A === "function") this.#A.open = A, this.addEventListener("open", A);
            else this.#A.open = null
        }
        get onerror() {
            return vQ.brandCheck(this, b5), this.#A.error
        }
        set onerror(A) {
            if (vQ.brandCheck(this, b5), this.#A.error) this.removeEventListener("error", this.#A.error);
            if (typeof A === "function") this.#A.error = A, this.addEventListener("error", A);
            else this.#A.error = null
        }
        get onclose() {
            return vQ.brandCheck(this, b5), this.#A.close
        }
        set onclose(A) {
            if (vQ.brandCheck(this, b5), this.#A.close) this.removeEventListener("close", this.#A.close);
            if (typeof A === "function") this.#A.close = A, this.addEventListener("close", A);
            else this.#A.close = null
        }
        get onmessage() {
            return vQ.brandCheck(this, b5), this.#A.message
        }
        set onmessage(A) {
            if (vQ.brandCheck(this, b5), this.#A.message) this.removeEventListener("message", this.#A.message);
            if (typeof A === "function") this.#A.message = A, this.addEventListener("message", A);
            else this.#A.message = null
        }
        get binaryType() {
            return vQ.brandCheck(this, b5), this[Ew1]
        }
        set binaryType(A) {
            if (vQ.brandCheck(this, b5), A !== "blob" && A !== "arraybuffer") this[Ew1] = "blob";
            else this[Ew1] = A
        }
        #Y(A, B) {
            this[kyA] = A;
            let Q = new LbQ(this, B);
            Q.on("drain", PbQ), Q.on("error", SbQ.bind(this)), A.socket.ws = this, this[EbQ] = Q, this.#D = new TbQ(A.socket), this[W20] = f41.OPEN;
            let Z = A.headersList.get("sec-websocket-extensions");
            if (Z !== null) this.#Z = Z;
            let D = A.headersList.get("sec-websocket-protocol");
            if (D !== null) this.#Q = D;
            yyA("open", this)
        }
    }
    b5.CONNECTING = b5.prototype.CONNECTING = f41.CONNECTING;
    b5.OPEN = b5.prototype.OPEN = f41.OPEN;
    b5.CLOSING = b5.prototype.CLOSING = f41.CLOSING;
    b5.CLOSED = b5.prototype.CLOSED = f41.CLOSED;
    Object.defineProperties(b5.prototype, {
        CONNECTING: Vy,
        OPEN: Vy,
        CLOSING: Vy,
        CLOSED: Vy,
        url: Pz,
        readyState: Pz,
        bufferedAmount: Pz,
        onopen: Pz,
        onerror: Pz,
        onclose: Pz,
        close: Pz,
        onmessage: Pz,
        binaryType: Pz,
        send: Pz,
        extensions: Pz,
        protocol: Pz,
        [Symbol.toStringTag]: {
            value: "WebSocket",
            writable: !1,
            enumerable: !1,
            configurable: !0
        }
    });
    Object.defineProperties(b5, {
        CONNECTING: Vy,
        OPEN: Vy,
        CLOSING: Vy,
        CLOSED: Vy
    });
    vQ.converters["sequence<DOMString>"] = vQ.sequenceConverter(vQ.converters.DOMString);
    vQ.converters["DOMString or sequence<DOMString>"] = function(A, B, Q) {
        if (vQ.util.Type(A) === "Object" && Symbol.iterator in A) return vQ.converters["sequence<DOMString>"](A);
        return vQ.converters.DOMString(A, B, Q)
    };
    vQ.converters.WebSocketInit = vQ.dictionaryConverter([{
        key: "protocols",
        converter: vQ.converters["DOMString or sequence<DOMString>"],
        defaultValue: () => new Array(0)
    }, {
        key: "dispatcher",
        converter: vQ.converters.any,
        defaultValue: () => MbQ()
    }, {
        key: "headers",
        converter: vQ.nullableConverter(vQ.converters.HeadersInit)
    }]);
    vQ.converters["DOMString or sequence<DOMString> or WebSocketInit"] = function(A) {
        if (vQ.util.Type(A) === "Object" && !(Symbol.iterator in A)) return vQ.converters.WebSocketInit(A);
        return {
            protocols: vQ.converters["DOMString or sequence<DOMString>"](A)
        }
    };
    vQ.converters.WebSocketSendData = function(A) {
        if (vQ.util.Type(A) === "Object") {
            if (xyA(A)) return vQ.converters.Blob(A, {
                strict: !1
            });
            if (ArrayBuffer.isView(A) || vyA.isArrayBuffer(A)) return vQ.converters.BufferSource(A)
        }
        return vQ.converters.USVString(A)
    };

    function PbQ() {
        this.ws[kyA].socket.resume()
    }

    function SbQ(A) {
        let B, Q;
        if (A instanceof ObQ) B = A.reason, Q = A.code;
        else B = A.message;
        yyA("error", this, () => new RbQ("error", {
            error: A,
            message: B
        })), _yA(this, Q)
    }
    byA.exports = {
        WebSocket: b5
    }
});
var J20 = E((K85, hyA) => {
    function jbQ(A) {
        return A.indexOf("\x00") === -1
    }

    function kbQ(A) {
        if (A.length === 0) return !1;
        for (let B = 0; B < A.length; B++)
            if (A.charCodeAt(B) < 48 || A.charCodeAt(B) > 57) return !1;
        return !0
    }

    function ybQ(A) {
        return new Promise((B) => {
            setTimeout(B, A).unref()
        })
    }
    hyA.exports = {
        isValidLastEventId: jbQ,
        isASCIINumber: kbQ,
        delay: ybQ
    }
});
var cyA = E((H85, dyA) => {
    var {
        Transform: _bQ
    } = W1("node:stream"), {
        isASCIINumber: gyA,
        isValidLastEventId: uyA
    } = J20(), FT = [239, 187, 191];
    class myA extends _bQ {
        state = null;
        checkBOM = !0;
        crlfCheck = !1;
        eventEndCheck = !1;
        buffer = null;
        pos = 0;
        event = {
            data: void 0,
            event: void 0,
            id: void 0,
            retry: void 0
        };
        constructor(A = {}) {
            A.readableObjectMode = !0;
            super(A);
            if (this.state = A.eventSourceSettings || {}, A.push) this.push = A.push
        }
        _transform(A, B, Q) {
            if (A.length === 0) {
                Q();
                return
            }
            if (this.buffer) this.buffer = Buffer.concat([this.buffer, A]);
            else this.buffer = A;
            if (this.checkBOM) switch (this.buffer.length) {
                case 1:
                    if (this.buffer[0] === FT[0]) {
                        Q();
                        return
                    }
                    this.checkBOM = !1, Q();
                    return;
                case 2:
                    if (this.buffer[0] === FT[0] && this.buffer[1] === FT[1]) {
                        Q();
                        return
                    }
                    this.checkBOM = !1;
                    break;
                case 3:
                    if (this.buffer[0] === FT[0] && this.buffer[1] === FT[1] && this.buffer[2] === FT[2]) {
                        this.buffer = Buffer.alloc(0), this.checkBOM = !1, Q();
                        return
                    }
                    this.checkBOM = !1;
                    break;
                default:
                    if (this.buffer[0] === FT[0] && this.buffer[1] === FT[1] && this.buffer[2] === FT[2]) this.buffer = this.buffer.subarray(3);
                    this.checkBOM = !1;
                    break
            }
            while (this.pos < this.buffer.length) {
                if (this.eventEndCheck) {
                    if (this.crlfCheck) {
                        if (this.buffer[this.pos] === 10) {
                            this.buffer = this.buffer.subarray(this.pos + 1), this.pos = 0, this.crlfCheck = !1;
                            continue
                        }
                        this.crlfCheck = !1
                    }
                    if (this.buffer[this.pos] === 10 || this.buffer[this.pos] === 13) {
                        if (this.buffer[this.pos] === 13) this.crlfCheck = !0;
                        if (this.buffer = this.buffer.subarray(this.pos + 1), this.pos = 0, this.event.data !== void 0 || this.event.event || this.event.id || this.event.retry) this.processEvent(this.event);
                        this.clearEvent();
                        continue
                    }
                    this.eventEndCheck = !1;
                    continue
                }
                if (this.buffer[this.pos] === 10 || this.buffer[this.pos] === 13) {
                    if (this.buffer[this.pos] === 13) this.crlfCheck = !0;
                    this.parseLine(this.buffer.subarray(0, this.pos), this.event), this.buffer = this.buffer.subarray(this.pos + 1), this.pos = 0, this.eventEndCheck = !0;
                    continue
                }
                this.pos++
            }
            Q()
        }
        parseLine(A, B) {
            if (A.length === 0) return;
            let Q = A.indexOf(58);
            if (Q === 0) return;
            let Z = "",
                D = "";
            if (Q !== -1) {
                Z = A.subarray(0, Q).toString("utf8");
                let G = Q + 1;
                if (A[G] === 32) ++G;
                D = A.subarray(G).toString("utf8")
            } else Z = A.toString("utf8"), D = "";
            switch (Z) {
                case "data":
                    if (B[Z] === void 0) B[Z] = D;
                    else B[Z] += `
${D}`;
                    break;
                case "retry":
                    if (gyA(D)) B[Z] = D;
                    break;
                case "id":
                    if (uyA(D)) B[Z] = D;
                    break;
                case "event":
                    if (D.length > 0) B[Z] = D;
                    break
            }
        }
        processEvent(A) {
            if (A.retry && gyA(A.retry)) this.state.reconnectionTime = parseInt(A.retry, 10);
            if (A.id && uyA(A.id)) this.state.lastEventId = A.id;
            if (A.data !== void 0) this.push({
                type: A.event || "message",
                options: {
                    data: A.data,
                    lastEventId: this.state.lastEventId,
                    origin: this.state.origin
                }
            })
        }
        clearEvent() {
            this.event = {
                data: void 0,
                event: void 0,
                id: void 0,
                retry: void 0
            }
        }
    }
    dyA.exports = {
        EventSourceStream: myA
    }
});