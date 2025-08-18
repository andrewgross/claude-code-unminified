/* chunk:149 bytes:[3304034, 3314949) size:10915 source:unpacked-cli.js */
var NyA = E((X85, qyA) => {
    var {
        Writable: BbQ
    } = W1("node:stream"), QbQ = W1("node:assert"), {
        parserStates: TV,
        opcodes: Da,
        states: ZbQ,
        emptyBuffer: XyA,
        sentCloseFrameState: VyA
    } = Fg(), {
        kReadyState: DbQ,
        kSentClose: CyA,
        kResponse: KyA,
        kReceivedClose: HyA
    } = j41(), {
        channels: Hw1
    } = zn(), {
        isValidStatusCode: GbQ,
        isValidOpcode: FbQ,
        failWebsocketConnection: Tz,
        websocketMessageReceived: zyA,
        utf8Decode: IbQ,
        isControlFrame: EyA,
        isTextBinaryFrame: Y20,
        isContinuationFrame: YbQ
    } = _41(), {
        WebsocketFrameSend: UyA
    } = Jw1(), {
        closeWebSocketConnection: wyA
    } = I20(), {
        PerMessageDeflate: WbQ
    } = JyA();
    class $yA extends BbQ {
        #A = [];
        #B = 0;
        #Q = !1;
        #Z = TV.INFO;
        #D = {};
        #Y = [];
        #G;
        constructor(A, B) {
            super();
            if (this.ws = A, this.#G = B == null ? new Map : B, this.#G.has("permessage-deflate")) this.#G.set("permessage-deflate", new WbQ(B))
        }
        _write(A, B, Q) {
            this.#A.push(A), this.#B += A.length, this.#Q = !0, this.run(Q)
        }
        run(A) {
            while (this.#Q)
                if (this.#Z === TV.INFO) {
                    if (this.#B < 2) return A();
                    let B = this.consume(2),
                        Q = (B[0] & 128) !== 0,
                        Z = B[0] & 15,
                        D = (B[1] & 128) === 128,
                        G = !Q && Z !== Da.CONTINUATION,
                        F = B[1] & 127,
                        I = B[0] & 64,
                        Y = B[0] & 32,
                        W = B[0] & 16;
                    if (!FbQ(Z)) return Tz(this.ws, "Invalid opcode received"), A();
                    if (D) return Tz(this.ws, "Frame cannot be masked"), A();
                    if (I !== 0 && !this.#G.has("permessage-deflate")) {
                        Tz(this.ws, "Expected RSV1 to be clear.");
                        return
                    }
                    if (Y !== 0 || W !== 0) {
                        Tz(this.ws, "RSV1, RSV2, RSV3 must be clear");
                        return
                    }
                    if (G && !Y20(Z)) {
                        Tz(this.ws, "Invalid frame type was fragmented.");
                        return
                    }
                    if (Y20(Z) && this.#Y.length > 0) {
                        Tz(this.ws, "Expected continuation frame");
                        return
                    }
                    if (this.#D.fragmented && G) {
                        Tz(this.ws, "Fragmented frame exceeded 125 bytes.");
                        return
                    }
                    if ((F > 125 || G) && EyA(Z)) {
                        Tz(this.ws, "Control frame either too large or fragmented");
                        return
                    }
                    if (YbQ(Z) && this.#Y.length === 0 && !this.#D.compressed) {
                        Tz(this.ws, "Unexpected continuation frame");
                        return
                    }
                    if (F <= 125) this.#D.payloadLength = F, this.#Z = TV.READ_DATA;
                    else if (F === 126) this.#Z = TV.PAYLOADLENGTH_16;
                    else if (F === 127) this.#Z = TV.PAYLOADLENGTH_64;
                    if (Y20(Z)) this.#D.binaryType = Z, this.#D.compressed = I !== 0;
                    this.#D.opcode = Z, this.#D.masked = D, this.#D.fin = Q, this.#D.fragmented = G
                } else if (this.#Z === TV.PAYLOADLENGTH_16) {
                if (this.#B < 2) return A();
                let B = this.consume(2);
                this.#D.payloadLength = B.readUInt16BE(0), this.#Z = TV.READ_DATA
            } else if (this.#Z === TV.PAYLOADLENGTH_64) {
                if (this.#B < 8) return A();
                let B = this.consume(8),
                    Q = B.readUInt32BE(0);
                if (Q > 2147483647) {
                    Tz(this.ws, "Received payload length > 2^31 bytes.");
                    return
                }
                let Z = B.readUInt32BE(4);
                this.#D.payloadLength = (Q << 8) + Z, this.#Z = TV.READ_DATA
            } else if (this.#Z === TV.READ_DATA) {
                if (this.#B < this.#D.payloadLength) return A();
                let B = this.consume(this.#D.payloadLength);
                if (EyA(this.#D.opcode)) this.#Q = this.parseControlFrame(B), this.#Z = TV.INFO;
                else if (!this.#D.compressed) {
                    if (this.#Y.push(B), !this.#D.fragmented && this.#D.fin) {
                        let Q = Buffer.concat(this.#Y);
                        zyA(this.ws, this.#D.binaryType, Q), this.#Y.length = 0
                    }
                    this.#Z = TV.INFO
                } else {
                    this.#G.get("permessage-deflate").decompress(B, this.#D.fin, (Q, Z) => {
                        if (Q) {
                            wyA(this.ws, 1007, Q.message, Q.message.length);
                            return
                        }
                        if (this.#Y.push(Z), !this.#D.fin) {
                            this.#Z = TV.INFO, this.#Q = !0, this.run(A);
                            return
                        }
                        zyA(this.ws, this.#D.binaryType, Buffer.concat(this.#Y)), this.#Q = !0, this.#Z = TV.INFO, this.#Y.length = 0, this.run(A)
                    }), this.#Q = !1;
                    break
                }
            }
        }
        consume(A) {
            if (A > this.#B) throw new Error("Called consume() before buffers satiated.");
            else if (A === 0) return XyA;
            if (this.#A[0].length === A) return this.#B -= this.#A[0].length, this.#A.shift();
            let B = Buffer.allocUnsafe(A),
                Q = 0;
            while (Q !== A) {
                let Z = this.#A[0],
                    {
                        length: D
                    } = Z;
                if (D + Q === A) {
                    B.set(this.#A.shift(), Q);
                    break
                } else if (D + Q > A) {
                    B.set(Z.subarray(0, A - Q), Q), this.#A[0] = Z.subarray(A - Q);
                    break
                } else B.set(this.#A.shift(), Q), Q += Z.length
            }
            return this.#B -= A, B
        }
        parseCloseBody(A) {
            QbQ(A.length !== 1);
            let B;
            if (A.length >= 2) B = A.readUInt16BE(0);
            if (B !== void 0 && !GbQ(B)) return {
                code: 1002,
                reason: "Invalid status code",
                error: !0
            };
            let Q = A.subarray(2);
            if (Q[0] === 239 && Q[1] === 187 && Q[2] === 191) Q = Q.subarray(3);
            try {
                Q = IbQ(Q)
            } catch {
                return {
                    code: 1007,
                    reason: "Invalid UTF-8",
                    error: !0
                }
            }
            return {
                code: B,
                reason: Q,
                error: !1
            }
        }
        parseControlFrame(A) {
            let {
                opcode: B,
                payloadLength: Q
            } = this.#D;
            if (B === Da.CLOSE) {
                if (Q === 1) return Tz(this.ws, "Received close frame with a 1-byte body."), !1;
                if (this.#D.closeInfo = this.parseCloseBody(A), this.#D.closeInfo.error) {
                    let {
                        code: Z,
                        reason: D
                    } = this.#D.closeInfo;
                    return wyA(this.ws, Z, D, D.length), Tz(this.ws, D), !1
                }
                if (this.ws[CyA] !== VyA.SENT) {
                    let Z = XyA;
                    if (this.#D.closeInfo.code) Z = Buffer.allocUnsafe(2), Z.writeUInt16BE(this.#D.closeInfo.code, 0);
                    let D = new UyA(Z);
                    this.ws[KyA].socket.write(D.createFrame(Da.CLOSE), (G) => {
                        if (!G) this.ws[CyA] = VyA.SENT
                    })
                }
                return this.ws[DbQ] = ZbQ.CLOSING, this.ws[HyA] = !0, !1
            } else if (B === Da.PING) {
                if (!this.ws[HyA]) {
                    let Z = new UyA(A);
                    if (this.ws[KyA].socket.write(Z.createFrame(Da.PONG)), Hw1.ping.hasSubscribers) Hw1.ping.publish({
                        payload: A
                    })
                }
            } else if (B === Da.PONG) {
                if (Hw1.pong.hasSubscribers) Hw1.pong.publish({
                    payload: A
                })
            }
            return !0
        }
        get closingInfo() {
            return this.#D.closeInfo
        }
    }
    qyA.exports = {
        ByteParser: $yA
    }
});
var PyA = E((V85, TyA) => {
    var {
        WebsocketFrameSend: JbQ
    } = Jw1(), {
        opcodes: LyA,
        sendHints: Ga
    } = Fg(), XbQ = i00(), MyA = Buffer[Symbol.species];
    class OyA {
        #A = new XbQ;
        #B = !1;
        #Q;
        constructor(A) {
            this.#Q = A
        }
        add(A, B, Q) {
            if (Q !== Ga.blob) {
                let D = RyA(A, Q);
                if (!this.#B) this.#Q.write(D, B);
                else {
                    let G = {
                        promise: null,
                        callback: B,
                        frame: D
                    };
                    this.#A.push(G)
                }
                return
            }
            let Z = {
                promise: A.arrayBuffer().then((D) => {
                    Z.promise = null, Z.frame = RyA(D, Q)
                }),
                callback: B,
                frame: null
            };
            if (this.#A.push(Z), !this.#B) this.#Z()
        }
        async #Z() {
            this.#B = !0;
            let A = this.#A;
            while (!A.isEmpty()) {
                let B = A.shift();
                if (B.promise !== null) await B.promise;
                this.#Q.write(B.frame, B.callback), B.callback = B.frame = null
            }
            this.#B = !1
        }
    }

    function RyA(A, B) {
        return new JbQ(VbQ(A, B)).createFrame(B === Ga.string ? LyA.TEXT : LyA.BINARY)
    }

    function VbQ(A, B) {
        switch (B) {
            case Ga.string:
                return Buffer.from(A);
            case Ga.arrayBuffer:
            case Ga.blob:
                return new MyA(A);
            case Ga.typedArray:
                return new MyA(A.buffer, A.byteOffset, A.byteLength)
        }
    }
    TyA.exports = {
        SendQueue: OyA
    }
});