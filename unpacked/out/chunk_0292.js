/* chunk:292 bytes:[6353028, 6363814) size:10786 source:unpacked-cli.js */
var A31 = E((zS5, AM2) => {
    var e51 = W1("zlib"),
        rL2 = t51(),
        Ha4 = sL2(),
        {
            kStatusCode: oL2
        } = KP(),
        za4 = Buffer[Symbol.species],
        Ea4 = Buffer.from([0, 0, 255, 255]),
        wO1 = Symbol("permessage-deflate"),
        HP = Symbol("total-length"),
        mo = Symbol("callback"),
        m_ = Symbol("buffers"),
        co = Symbol("error"),
        UO1;
    class tL2 {
        constructor(A, B, Q) {
            if (this._maxPayload = Q | 0, this._options = A || {}, this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024, this._isServer = !!B, this._deflate = null, this._inflate = null, this.params = null, !UO1) {
                let Z = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
                UO1 = new Ha4(Z)
            }
        }
        static get extensionName() {
            return "permessage-deflate"
        }
        offer() {
            let A = {};
            if (this._options.serverNoContextTakeover) A.server_no_context_takeover = !0;
            if (this._options.clientNoContextTakeover) A.client_no_context_takeover = !0;
            if (this._options.serverMaxWindowBits) A.server_max_window_bits = this._options.serverMaxWindowBits;
            if (this._options.clientMaxWindowBits) A.client_max_window_bits = this._options.clientMaxWindowBits;
            else if (this._options.clientMaxWindowBits == null) A.client_max_window_bits = !0;
            return A
        }
        accept(A) {
            return A = this.normalizeParams(A), this.params = this._isServer ? this.acceptAsServer(A) : this.acceptAsClient(A), this.params
        }
        cleanup() {
            if (this._inflate) this._inflate.close(), this._inflate = null;
            if (this._deflate) {
                let A = this._deflate[mo];
                if (this._deflate.close(), this._deflate = null, A) A(new Error("The deflate stream was closed while data was being processed"))
            }
        }
        acceptAsServer(A) {
            let B = this._options,
                Q = A.find((Z) => {
                    if (B.serverNoContextTakeover === !1 && Z.server_no_context_takeover || Z.server_max_window_bits && (B.serverMaxWindowBits === !1 || typeof B.serverMaxWindowBits === "number" && B.serverMaxWindowBits > Z.server_max_window_bits) || typeof B.clientMaxWindowBits === "number" && !Z.client_max_window_bits) return !1;
                    return !0
                });
            if (!Q) throw new Error("None of the extension offers can be accepted");
            if (B.serverNoContextTakeover) Q.server_no_context_takeover = !0;
            if (B.clientNoContextTakeover) Q.client_no_context_takeover = !0;
            if (typeof B.serverMaxWindowBits === "number") Q.server_max_window_bits = B.serverMaxWindowBits;
            if (typeof B.clientMaxWindowBits === "number") Q.client_max_window_bits = B.clientMaxWindowBits;
            else if (Q.client_max_window_bits === !0 || B.clientMaxWindowBits === !1) delete Q.client_max_window_bits;
            return Q
        }
        acceptAsClient(A) {
            let B = A[0];
            if (this._options.clientNoContextTakeover === !1 && B.client_no_context_takeover) throw new Error('Unexpected parameter "client_no_context_takeover"');
            if (!B.client_max_window_bits) {
                if (typeof this._options.clientMaxWindowBits === "number") B.client_max_window_bits = this._options.clientMaxWindowBits
            } else if (this._options.clientMaxWindowBits === !1 || typeof this._options.clientMaxWindowBits === "number" && B.client_max_window_bits > this._options.clientMaxWindowBits) throw new Error('Unexpected or invalid parameter "client_max_window_bits"');
            return B
        }
        normalizeParams(A) {
            return A.forEach((B) => {
                Object.keys(B).forEach((Q) => {
                    let Z = B[Q];
                    if (Z.length > 1) throw new Error(`Parameter "${Q}" must have only a single value`);
                    if (Z = Z[0], Q === "client_max_window_bits") {
                        if (Z !== !0) {
                            let D = +Z;
                            if (!Number.isInteger(D) || D < 8 || D > 15) throw new TypeError(`Invalid value for parameter "${Q}": ${Z}`);
                            Z = D
                        } else if (!this._isServer) throw new TypeError(`Invalid value for parameter "${Q}": ${Z}`)
                    } else if (Q === "server_max_window_bits") {
                        let D = +Z;
                        if (!Number.isInteger(D) || D < 8 || D > 15) throw new TypeError(`Invalid value for parameter "${Q}": ${Z}`);
                        Z = D
                    } else if (Q === "client_no_context_takeover" || Q === "server_no_context_takeover") {
                        if (Z !== !0) throw new TypeError(`Invalid value for parameter "${Q}": ${Z}`)
                    } else throw new Error(`Unknown parameter "${Q}"`);
                    B[Q] = Z
                })
            }), A
        }
        decompress(A, B, Q) {
            UO1.add((Z) => {
                this._decompress(A, B, (D, G) => {
                    Z(), Q(D, G)
                })
            })
        }
        compress(A, B, Q) {
            UO1.add((Z) => {
                this._compress(A, B, (D, G) => {
                    Z(), Q(D, G)
                })
            })
        }
        _decompress(A, B, Q) {
            let Z = this._isServer ? "client" : "server";
            if (!this._inflate) {
                let D = `${Z}_max_window_bits`,
                    G = typeof this.params[D] !== "number" ? e51.Z_DEFAULT_WINDOWBITS : this.params[D];
                this._inflate = e51.createInflateRaw({
                    ...this._options.zlibInflateOptions,
                    windowBits: G
                }), this._inflate[wO1] = this, this._inflate[HP] = 0, this._inflate[m_] = [], this._inflate.on("error", wa4), this._inflate.on("data", eL2)
            }
            if (this._inflate[mo] = Q, this._inflate.write(A), B) this._inflate.write(Ea4);
            this._inflate.flush(() => {
                let D = this._inflate[co];
                if (D) {
                    this._inflate.close(), this._inflate = null, Q(D);
                    return
                }
                let G = rL2.concat(this._inflate[m_], this._inflate[HP]);
                if (this._inflate._readableState.endEmitted) this._inflate.close(), this._inflate = null;
                else if (this._inflate[HP] = 0, this._inflate[m_] = [], B && this.params[`${Z}_no_context_takeover`]) this._inflate.reset();
                Q(null, G)
            })
        }
        _compress(A, B, Q) {
            let Z = this._isServer ? "server" : "client";
            if (!this._deflate) {
                let D = `${Z}_max_window_bits`,
                    G = typeof this.params[D] !== "number" ? e51.Z_DEFAULT_WINDOWBITS : this.params[D];
                this._deflate = e51.createDeflateRaw({
                    ...this._options.zlibDeflateOptions,
                    windowBits: G
                }), this._deflate[HP] = 0, this._deflate[m_] = [], this._deflate.on("data", Ua4)
            }
            this._deflate[mo] = Q, this._deflate.write(A), this._deflate.flush(e51.Z_SYNC_FLUSH, () => {
                if (!this._deflate) return;
                let D = rL2.concat(this._deflate[m_], this._deflate[HP]);
                if (B) D = new za4(D.buffer, D.byteOffset, D.length - 4);
                if (this._deflate[mo] = null, this._deflate[HP] = 0, this._deflate[m_] = [], B && this.params[`${Z}_no_context_takeover`]) this._deflate.reset();
                Q(null, D)
            })
        }
    }
    AM2.exports = tL2;

    function Ua4(A) {
        this[m_].push(A), this[HP] += A.length
    }

    function eL2(A) {
        if (this[HP] += A.length, this[wO1]._maxPayload < 1 || this[HP] <= this[wO1]._maxPayload) {
            this[m_].push(A);
            return
        }
        this[co] = new RangeError("Max payload size exceeded"), this[co].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH", this[co][oL2] = 1009, this.removeListener("data", eL2), this.reset()
    }

    function wa4(A) {
        if (this[wO1]._inflate = null, this[co]) {
            this[mo](this[co]);
            return
        }
        A[oL2] = 1007, this[mo](A)
    }
});
var lo = E((ES5, $O1) => {
    var {
        isUtf8: BM2
    } = W1("buffer"), {
        hasBlob: $a4
    } = KP(), qa4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0];

    function Na4(A) {
        return A >= 1000 && A <= 1014 && A !== 1004 && A !== 1005 && A !== 1006 || A >= 3000 && A <= 4999
    }

    function $F0(A) {
        let B = A.length,
            Q = 0;
        while (Q < B)
            if ((A[Q] & 128) === 0) Q++;
            else if ((A[Q] & 224) === 192) {
            if (Q + 1 === B || (A[Q + 1] & 192) !== 128 || (A[Q] & 254) === 192) return !1;
            Q += 2
        } else if ((A[Q] & 240) === 224) {
            if (Q + 2 >= B || (A[Q + 1] & 192) !== 128 || (A[Q + 2] & 192) !== 128 || A[Q] === 224 && (A[Q + 1] & 224) === 128 || A[Q] === 237 && (A[Q + 1] & 224) === 160) return !1;
            Q += 3
        } else if ((A[Q] & 248) === 240) {
            if (Q + 3 >= B || (A[Q + 1] & 192) !== 128 || (A[Q + 2] & 192) !== 128 || (A[Q + 3] & 192) !== 128 || A[Q] === 240 && (A[Q + 1] & 240) === 128 || A[Q] === 244 && A[Q + 1] > 143 || A[Q] > 244) return !1;
            Q += 4
        } else return !1;
        return !0
    }

    function La4(A) {
        return $a4 && typeof A === "object" && typeof A.arrayBuffer === "function" && typeof A.type === "string" && typeof A.stream === "function" && (A[Symbol.toStringTag] === "Blob" || A[Symbol.toStringTag] === "File")
    }
    $O1.exports = {
        isBlob: La4,
        isValidStatusCode: Na4,
        isValidUTF8: $F0,
        tokenChars: qa4
    };
    if (BM2) $O1.exports.isValidUTF8 = function(A) {
        return A.length < 24 ? $F0(A) : BM2(A)
    };
    else if (!process.env.WS_NO_UTF_8_VALIDATE) try {
        let A = (() => {
            throw new Error("Cannot require module " + "utf-8-validate");
        })();
        $O1.exports.isValidUTF8 = function(B) {
            return B.length < 32 ? $F0(B) : A(B)
        }
    } catch (A) {}
});