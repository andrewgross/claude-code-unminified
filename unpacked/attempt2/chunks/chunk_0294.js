/* chunk:294 bytes:[6376209, 6392788) size:16579 source:unpacked-cli.js */
var MF0 = E(($S5, WM2) => {
    var {
        Duplex: wS5
    } = W1("stream"), {
        randomFillSync: ka4
    } = W1("crypto"), IM2 = A31(), {
        EMPTY_BUFFER: ya4,
        kWebSocket: _a4,
        NOOP: xa4
    } = KP(), {
        isBlob: po,
        isValidStatusCode: va4
    } = lo(), {
        mask: YM2,
        toBuffer: Tu
    } = t51(), EE = Symbol("kByteLength"), ba4 = Buffer.alloc(4), Pu, io = 8192, B$ = 0, fa4 = 1, ha4 = 2;
    class d_ {
        constructor(A, B, Q) {
            if (this._extensions = B || {}, Q) this._generateMask = Q, this._maskBuffer = Buffer.alloc(4);
            this._socket = A, this._firstFragment = !0, this._compress = !1, this._bufferedBytes = 0, this._queue = [], this._state = B$, this.onerror = xa4, this[_a4] = void 0
        }
        static frame(A, B) {
            let Q, Z = !1,
                D = 2,
                G = !1;
            if (B.mask) {
                if (Q = B.maskBuffer || ba4, B.generateMask) B.generateMask(Q);
                else {
                    if (io === 8192) {
                        if (Pu === void 0) Pu = Buffer.alloc(8192);
                        ka4(Pu, 0, 8192), io = 0
                    }
                    Q[0] = Pu[io++], Q[1] = Pu[io++], Q[2] = Pu[io++], Q[3] = Pu[io++]
                }
                G = (Q[0] | Q[1] | Q[2] | Q[3]) === 0, D = 6
            }
            let F;
            if (typeof A === "string")
                if ((!B.mask || G) && B[EE] !== void 0) F = B[EE];
                else A = Buffer.from(A), F = A.length;
            else F = A.length, Z = B.mask && B.readOnly && !G;
            let I = F;
            if (F >= 65536) D += 8, I = 127;
            else if (F > 125) D += 2, I = 126;
            let Y = Buffer.allocUnsafe(Z ? F + D : D);
            if (Y[0] = B.fin ? B.opcode | 128 : B.opcode, B.rsv1) Y[0] |= 64;
            if (Y[1] = I, I === 126) Y.writeUInt16BE(F, 2);
            else if (I === 127) Y[2] = Y[3] = 0, Y.writeUIntBE(F, 4, 6);
            if (!B.mask) return [Y, A];
            if (Y[1] |= 128, Y[D - 4] = Q[0], Y[D - 3] = Q[1], Y[D - 2] = Q[2], Y[D - 1] = Q[3], G) return [Y, A];
            if (Z) return YM2(A, Q, Y, D, F), [Y];
            return YM2(A, Q, A, 0, F), [Y, A]
        }
        close(A, B, Q, Z) {
            let D;
            if (A === void 0) D = ya4;
            else if (typeof A !== "number" || !va4(A)) throw new TypeError("First argument must be a valid error code number");
            else if (B === void 0 || !B.length) D = Buffer.allocUnsafe(2), D.writeUInt16BE(A, 0);
            else {
                let F = Buffer.byteLength(B);
                if (F > 123) throw new RangeError("The message must not be greater than 123 bytes");
                if (D = Buffer.allocUnsafe(2 + F), D.writeUInt16BE(A, 0), typeof B === "string") D.write(B, 2);
                else D.set(B, 2)
            }
            let G = {
                [EE]: D.length,
                fin: !0,
                generateMask: this._generateMask,
                mask: Q,
                maskBuffer: this._maskBuffer,
                opcode: 8,
                readOnly: !1,
                rsv1: !1
            };
            if (this._state !== B$) this.enqueue([this.dispatch, D, !1, G, Z]);
            else this.sendFrame(d_.frame(D, G), Z)
        }
        ping(A, B, Q) {
            let Z, D;
            if (typeof A === "string") Z = Buffer.byteLength(A), D = !1;
            else if (po(A)) Z = A.size, D = !1;
            else A = Tu(A), Z = A.length, D = Tu.readOnly;
            if (Z > 125) throw new RangeError("The data size must not be greater than 125 bytes");
            let G = {
                [EE]: Z,
                fin: !0,
                generateMask: this._generateMask,
                mask: B,
                maskBuffer: this._maskBuffer,
                opcode: 9,
                readOnly: D,
                rsv1: !1
            };
            if (po(A))
                if (this._state !== B$) this.enqueue([this.getBlobData, A, !1, G, Q]);
                else this.getBlobData(A, !1, G, Q);
            else if (this._state !== B$) this.enqueue([this.dispatch, A, !1, G, Q]);
            else this.sendFrame(d_.frame(A, G), Q)
        }
        pong(A, B, Q) {
            let Z, D;
            if (typeof A === "string") Z = Buffer.byteLength(A), D = !1;
            else if (po(A)) Z = A.size, D = !1;
            else A = Tu(A), Z = A.length, D = Tu.readOnly;
            if (Z > 125) throw new RangeError("The data size must not be greater than 125 bytes");
            let G = {
                [EE]: Z,
                fin: !0,
                generateMask: this._generateMask,
                mask: B,
                maskBuffer: this._maskBuffer,
                opcode: 10,
                readOnly: D,
                rsv1: !1
            };
            if (po(A))
                if (this._state !== B$) this.enqueue([this.getBlobData, A, !1, G, Q]);
                else this.getBlobData(A, !1, G, Q);
            else if (this._state !== B$) this.enqueue([this.dispatch, A, !1, G, Q]);
            else this.sendFrame(d_.frame(A, G), Q)
        }
        send(A, B, Q) {
            let Z = this._extensions[IM2.extensionName],
                D = B.binary ? 2 : 1,
                G = B.compress,
                F, I;
            if (typeof A === "string") F = Buffer.byteLength(A), I = !1;
            else if (po(A)) F = A.size, I = !1;
            else A = Tu(A), F = A.length, I = Tu.readOnly;
            if (this._firstFragment) {
                if (this._firstFragment = !1, G && Z && Z.params[Z._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) G = F >= Z._threshold;
                this._compress = G
            } else G = !1, D = 0;
            if (B.fin) this._firstFragment = !0;
            let Y = {
                [EE]: F,
                fin: B.fin,
                generateMask: this._generateMask,
                mask: B.mask,
                maskBuffer: this._maskBuffer,
                opcode: D,
                readOnly: I,
                rsv1: G
            };
            if (po(A))
                if (this._state !== B$) this.enqueue([this.getBlobData, A, this._compress, Y, Q]);
                else this.getBlobData(A, this._compress, Y, Q);
            else if (this._state !== B$) this.enqueue([this.dispatch, A, this._compress, Y, Q]);
            else this.dispatch(A, this._compress, Y, Q)
        }
        getBlobData(A, B, Q, Z) {
            this._bufferedBytes += Q[EE], this._state = ha4, A.arrayBuffer().then((D) => {
                if (this._socket.destroyed) {
                    let F = new Error("The socket was closed while the blob was being read");
                    process.nextTick(LF0, this, F, Z);
                    return
                }
                this._bufferedBytes -= Q[EE];
                let G = Tu(D);
                if (!B) this._state = B$, this.sendFrame(d_.frame(G, Q), Z), this.dequeue();
                else this.dispatch(G, B, Q, Z)
            }).catch((D) => {
                process.nextTick(ga4, this, D, Z)
            })
        }
        dispatch(A, B, Q, Z) {
            if (!B) {
                this.sendFrame(d_.frame(A, Q), Z);
                return
            }
            let D = this._extensions[IM2.extensionName];
            this._bufferedBytes += Q[EE], this._state = fa4, D.compress(A, Q.fin, (G, F) => {
                if (this._socket.destroyed) {
                    let I = new Error("The socket was closed while data was being compressed");
                    LF0(this, I, Z);
                    return
                }
                this._bufferedBytes -= Q[EE], this._state = B$, Q.readOnly = !1, this.sendFrame(d_.frame(F, Q), Z), this.dequeue()
            })
        }
        dequeue() {
            while (this._state === B$ && this._queue.length) {
                let A = this._queue.shift();
                this._bufferedBytes -= A[3][EE], Reflect.apply(A[0], this, A.slice(1))
            }
        }
        enqueue(A) {
            this._bufferedBytes += A[3][EE], this._queue.push(A)
        }
        sendFrame(A, B) {
            if (A.length === 2) this._socket.cork(), this._socket.write(A[0]), this._socket.write(A[1], B), this._socket.uncork();
            else this._socket.write(A[0], B)
        }
    }
    WM2.exports = d_;

    function LF0(A, B, Q) {
        if (typeof Q === "function") Q(B);
        for (let Z = 0; Z < A._queue.length; Z++) {
            let D = A._queue[Z],
                G = D[D.length - 1];
            if (typeof G === "function") G(B)
        }
    }

    function ga4(A, B, Q) {
        LF0(A, B, Q), A.onerror(B)
    }
});
var UM2 = E((qS5, EM2) => {
    var {
        kForOnEventAttribute: B31,
        kListener: RF0
    } = KP(), JM2 = Symbol("kCode"), XM2 = Symbol("kData"), VM2 = Symbol("kError"), CM2 = Symbol("kMessage"), KM2 = Symbol("kReason"), no = Symbol("kTarget"), HM2 = Symbol("kType"), zM2 = Symbol("kWasClean");
    class c_ {
        constructor(A) {
            this[no] = null, this[HM2] = A
        }
        get target() {
            return this[no]
        }
        get type() {
            return this[HM2]
        }
    }
    Object.defineProperty(c_.prototype, "target", {
        enumerable: !0
    });
    Object.defineProperty(c_.prototype, "type", {
        enumerable: !0
    });
    class ao extends c_ {
        constructor(A, B = {}) {
            super(A);
            this[JM2] = B.code === void 0 ? 0 : B.code, this[KM2] = B.reason === void 0 ? "" : B.reason, this[zM2] = B.wasClean === void 0 ? !1 : B.wasClean
        }
        get code() {
            return this[JM2]
        }
        get reason() {
            return this[KM2]
        }
        get wasClean() {
            return this[zM2]
        }
    }
    Object.defineProperty(ao.prototype, "code", {
        enumerable: !0
    });
    Object.defineProperty(ao.prototype, "reason", {
        enumerable: !0
    });
    Object.defineProperty(ao.prototype, "wasClean", {
        enumerable: !0
    });
    class Q31 extends c_ {
        constructor(A, B = {}) {
            super(A);
            this[VM2] = B.error === void 0 ? null : B.error, this[CM2] = B.message === void 0 ? "" : B.message
        }
        get error() {
            return this[VM2]
        }
        get message() {
            return this[CM2]
        }
    }
    Object.defineProperty(Q31.prototype, "error", {
        enumerable: !0
    });
    Object.defineProperty(Q31.prototype, "message", {
        enumerable: !0
    });
    class LO1 extends c_ {
        constructor(A, B = {}) {
            super(A);
            this[XM2] = B.data === void 0 ? null : B.data
        }
        get data() {
            return this[XM2]
        }
    }
    Object.defineProperty(LO1.prototype, "data", {
        enumerable: !0
    });
    var ua4 = {
        addEventListener(A, B, Q = {}) {
            for (let D of this.listeners(A))
                if (!Q[B31] && D[RF0] === B && !D[B31]) return;
            let Z;
            if (A === "message") Z = function D(G, F) {
                let I = new LO1("message", {
                    data: F ? G : G.toString()
                });
                I[no] = this, NO1(B, this, I)
            };
            else if (A === "close") Z = function D(G, F) {
                let I = new ao("close", {
                    code: G,
                    reason: F.toString(),
                    wasClean: this._closeFrameReceived && this._closeFrameSent
                });
                I[no] = this, NO1(B, this, I)
            };
            else if (A === "error") Z = function D(G) {
                let F = new Q31("error", {
                    error: G,
                    message: G.message
                });
                F[no] = this, NO1(B, this, F)
            };
            else if (A === "open") Z = function D() {
                let G = new c_("open");
                G[no] = this, NO1(B, this, G)
            };
            else return;
            if (Z[B31] = !!Q[B31], Z[RF0] = B, Q.once) this.once(A, Z);
            else this.on(A, Z)
        },
        removeEventListener(A, B) {
            for (let Q of this.listeners(A))
                if (Q[RF0] === B && !Q[B31]) {
                    this.removeListener(A, Q);
                    break
                }
        }
    };
    EM2.exports = {
        CloseEvent: ao,
        ErrorEvent: Q31,
        Event: c_,
        EventTarget: ua4,
        MessageEvent: LO1
    };

    function NO1(A, B, Q) {
        if (typeof A === "object" && A.handleEvent) A.handleEvent.call(A, Q);
        else A.call(B, Q)
    }
});
var OF0 = E((NS5, wM2) => {
    var {
        tokenChars: Z31
    } = lo();

    function nL(A, B, Q) {
        if (A[B] === void 0) A[B] = [Q];
        else A[B].push(Q)
    }

    function ma4(A) {
        let B = Object.create(null),
            Q = Object.create(null),
            Z = !1,
            D = !1,
            G = !1,
            F, I, Y = -1,
            W = -1,
            J = -1,
            X = 0;
        for (; X < A.length; X++)
            if (W = A.charCodeAt(X), F === void 0)
                if (J === -1 && Z31[W] === 1) {
                    if (Y === -1) Y = X
                } else if (X !== 0 && (W === 32 || W === 9)) {
            if (J === -1 && Y !== -1) J = X
        } else if (W === 59 || W === 44) {
            if (Y === -1) throw new SyntaxError(`Unexpected character at index ${X}`);
            if (J === -1) J = X;
            let C = A.slice(Y, J);
            if (W === 44) nL(B, C, Q), Q = Object.create(null);
            else F = C;
            Y = J = -1
        } else throw new SyntaxError(`Unexpected character at index ${X}`);
        else if (I === void 0)
            if (J === -1 && Z31[W] === 1) {
                if (Y === -1) Y = X
            } else if (W === 32 || W === 9) {
            if (J === -1 && Y !== -1) J = X
        } else if (W === 59 || W === 44) {
            if (Y === -1) throw new SyntaxError(`Unexpected character at index ${X}`);
            if (J === -1) J = X;
            if (nL(Q, A.slice(Y, J), !0), W === 44) nL(B, F, Q), Q = Object.create(null), F = void 0;
            Y = J = -1
        } else if (W === 61 && Y !== -1 && J === -1) I = A.slice(Y, X), Y = J = -1;
        else throw new SyntaxError(`Unexpected character at index ${X}`);
        else if (D) {
            if (Z31[W] !== 1) throw new SyntaxError(`Unexpected character at index ${X}`);
            if (Y === -1) Y = X;
            else if (!Z) Z = !0;
            D = !1
        } else if (G)
            if (Z31[W] === 1) {
                if (Y === -1) Y = X
            } else if (W === 34 && Y !== -1) G = !1, J = X;
        else if (W === 92) D = !0;
        else throw new SyntaxError(`Unexpected character at index ${X}`);
        else if (W === 34 && A.charCodeAt(X - 1) === 61) G = !0;
        else if (J === -1 && Z31[W] === 1) {
            if (Y === -1) Y = X
        } else if (Y !== -1 && (W === 32 || W === 9)) {
            if (J === -1) J = X
        } else if (W === 59 || W === 44) {
            if (Y === -1) throw new SyntaxError(`Unexpected character at index ${X}`);
            if (J === -1) J = X;
            let C = A.slice(Y, J);
            if (Z) C = C.replace(/\\/g, ""), Z = !1;
            if (nL(Q, I, C), W === 44) nL(B, F, Q), Q = Object.create(null), F = void 0;
            I = void 0, Y = J = -1
        } else throw new SyntaxError(`Unexpected character at index ${X}`);
        if (Y === -1 || G || W === 32 || W === 9) throw new SyntaxError("Unexpected end of input");
        if (J === -1) J = X;
        let V = A.slice(Y, J);
        if (F === void 0) nL(B, V, Q);
        else {
            if (I === void 0) nL(Q, V, !0);
            else if (Z) nL(Q, I, V.replace(/\\/g, ""));
            else nL(Q, I, V);
            nL(B, F, Q)
        }
        return B
    }

    function da4(A) {
        return Object.keys(A).map((B) => {
            let Q = A[B];
            if (!Array.isArray(Q)) Q = [Q];
            return Q.map((Z) => {
                return [B].concat(Object.keys(Z).map((D) => {
                    let G = Z[D];
                    if (!Array.isArray(G)) G = [G];
                    return G.map((F) => F === !0 ? D : `${D}=${F}`).join("; ")
                })).join("; ")
            }).join(", ")
        }).join(", ")
    }
    wM2.exports = {
        format: da4,
        parse: ma4
    }
});