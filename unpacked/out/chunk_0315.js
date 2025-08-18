/* chunk:315 bytes:[7300101, 7315378) size:15277 source:unpacked-cli.js */
var eT1 = E((Lc5, zi2) => {
    zi2.exports = j8;
    var ME = QM(),
        SW0, tT1 = ME.LongBits,
        Ci2 = ME.base64,
        Ki2 = ME.utf8;

    function c31(A, B, Q) {
        this.fn = A, this.len = B, this.next = void 0, this.val = Q
    }

    function kW0() {}

    function NY6(A) {
        this.head = A.head, this.tail = A.tail, this.len = A.len, this.next = A.states
    }

    function j8() {
        this.len = 0, this.head = new c31(kW0, 0, 0), this.tail = this.head, this.states = null
    }
    var Hi2 = function A() {
        return ME.Buffer ? function B() {
            return (j8.create = function Q() {
                return new SW0
            })()
        } : function B() {
            return new j8
        }
    };
    j8.create = Hi2();
    j8.alloc = function A(B) {
        return new ME.Array(B)
    };
    if (ME.Array !== Array) j8.alloc = ME.pool(j8.alloc, ME.Array.prototype.subarray);
    j8.prototype._push = function A(B, Q, Z) {
        return this.tail = this.tail.next = new c31(B, Q, Z), this.len += Q, this
    };

    function yW0(A, B, Q) {
        B[Q] = A & 255
    }

    function LY6(A, B, Q) {
        while (A > 127) B[Q++] = A & 127 | 128, A >>>= 7;
        B[Q] = A
    }

    function _W0(A, B) {
        this.len = A, this.next = void 0, this.val = B
    }
    _W0.prototype = Object.create(c31.prototype);
    _W0.prototype.fn = LY6;
    j8.prototype.uint32 = function A(B) {
        return this.len += (this.tail = this.tail.next = new _W0((B = B >>> 0) < 128 ? 1 : B < 16384 ? 2 : B < 2097152 ? 3 : B < 268435456 ? 4 : 5, B)).len, this
    };
    j8.prototype.int32 = function A(B) {
        return B < 0 ? this._push(xW0, 10, tT1.fromNumber(B)) : this.uint32(B)
    };
    j8.prototype.sint32 = function A(B) {
        return this.uint32((B << 1 ^ B >> 31) >>> 0)
    };

    function xW0(A, B, Q) {
        while (A.hi) B[Q++] = A.lo & 127 | 128, A.lo = (A.lo >>> 7 | A.hi << 25) >>> 0, A.hi >>>= 7;
        while (A.lo > 127) B[Q++] = A.lo & 127 | 128, A.lo = A.lo >>> 7;
        B[Q++] = A.lo
    }
    j8.prototype.uint64 = function A(B) {
        var Q = tT1.from(B);
        return this._push(xW0, Q.length(), Q)
    };
    j8.prototype.int64 = j8.prototype.uint64;
    j8.prototype.sint64 = function A(B) {
        var Q = tT1.from(B).zzEncode();
        return this._push(xW0, Q.length(), Q)
    };
    j8.prototype.bool = function A(B) {
        return this._push(yW0, 1, B ? 1 : 0)
    };

    function jW0(A, B, Q) {
        B[Q] = A & 255, B[Q + 1] = A >>> 8 & 255, B[Q + 2] = A >>> 16 & 255, B[Q + 3] = A >>> 24
    }
    j8.prototype.fixed32 = function A(B) {
        return this._push(jW0, 4, B >>> 0)
    };
    j8.prototype.sfixed32 = j8.prototype.fixed32;
    j8.prototype.fixed64 = function A(B) {
        var Q = tT1.from(B);
        return this._push(jW0, 4, Q.lo)._push(jW0, 4, Q.hi)
    };
    j8.prototype.sfixed64 = j8.prototype.fixed64;
    j8.prototype.float = function A(B) {
        return this._push(ME.float.writeFloatLE, 4, B)
    };
    j8.prototype.double = function A(B) {
        return this._push(ME.float.writeDoubleLE, 8, B)
    };
    var MY6 = ME.Array.prototype.set ? function A(B, Q, Z) {
        Q.set(B, Z)
    } : function A(B, Q, Z) {
        for (var D = 0; D < B.length; ++D) Q[Z + D] = B[D]
    };
    j8.prototype.bytes = function A(B) {
        var Q = B.length >>> 0;
        if (!Q) return this._push(yW0, 1, 0);
        if (ME.isString(B)) {
            var Z = j8.alloc(Q = Ci2.length(B));
            Ci2.decode(B, Z, 0), B = Z
        }
        return this.uint32(Q)._push(MY6, Q, B)
    };
    j8.prototype.string = function A(B) {
        var Q = Ki2.length(B);
        return Q ? this.uint32(Q)._push(Ki2.write, Q, B) : this._push(yW0, 1, 0)
    };
    j8.prototype.fork = function A() {
        return this.states = new NY6(this), this.head = this.tail = new c31(kW0, 0, 0), this.len = 0, this
    };
    j8.prototype.reset = function A() {
        if (this.states) this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next;
        else this.head = this.tail = new c31(kW0, 0, 0), this.len = 0;
        return this
    };
    j8.prototype.ldelim = function A() {
        var B = this.head,
            Q = this.tail,
            Z = this.len;
        if (this.reset().uint32(Z), Z) this.tail.next = B.next, this.tail = Q, this.len += Z;
        return this
    };
    j8.prototype.finish = function A() {
        var B = this.head.next,
            Q = this.constructor.alloc(this.len),
            Z = 0;
        while (B) B.fn(B.val, Q, Z), Z += B.len, B = B.next;
        return Q
    };
    j8._configure = function(A) {
        SW0 = A, j8.create = Hi2(), SW0._configure()
    }
});
var wi2 = E((Mc5, Ui2) => {
    Ui2.exports = ZM;
    var Ei2 = eT1();
    (ZM.prototype = Object.create(Ei2.prototype)).constructor = ZM;
    var Dx = QM();

    function ZM() {
        Ei2.call(this)
    }
    ZM._configure = function() {
        ZM.alloc = Dx._Buffer_allocUnsafe, ZM.writeBytesBuffer = Dx.Buffer && Dx.Buffer.prototype instanceof Uint8Array && Dx.Buffer.prototype.set.name === "set" ? function A(B, Q, Z) {
            Q.set(B, Z)
        } : function A(B, Q, Z) {
            if (B.copy) B.copy(Q, Z, 0, B.length);
            else
                for (var D = 0; D < B.length;) Q[Z++] = B[D++]
        }
    };
    ZM.prototype.bytes = function A(B) {
        if (Dx.isString(B)) B = Dx._Buffer_from(B, "base64");
        var Q = B.length >>> 0;
        if (this.uint32(Q), Q) this._push(ZM.writeBytesBuffer, Q, B);
        return this
    };

    function RY6(A, B, Q) {
        if (A.length < 40) Dx.utf8.write(A, B, Q);
        else if (B.utf8Write) B.utf8Write(A, Q);
        else B.write(A, Q)
    }
    ZM.prototype.string = function A(B) {
        var Q = Dx.Buffer.byteLength(B);
        if (this.uint32(Q), Q) this._push(RY6, Q, B);
        return this
    };
    ZM._configure()
});
var BP1 = E((Rc5, Mi2) => {
    Mi2.exports = VG;
    var G$ = QM(),
        bW0, Ni2 = G$.LongBits,
        OY6 = G$.utf8;

    function F$(A, B) {
        return RangeError("index out of range: " + A.pos + " + " + (B || 1) + " > " + A.len)
    }

    function VG(A) {
        this.buf = A, this.pos = 0, this.len = A.length
    }
    var $i2 = typeof Uint8Array !== "undefined" ? function A(B) {
            if (B instanceof Uint8Array || Array.isArray(B)) return new VG(B);
            throw Error("illegal buffer")
        } : function A(B) {
            if (Array.isArray(B)) return new VG(B);
            throw Error("illegal buffer")
        },
        Li2 = function A() {
            return G$.Buffer ? function B(Q) {
                return (VG.create = function Z(D) {
                    return G$.Buffer.isBuffer(D) ? new bW0(D) : $i2(D)
                })(Q)
            } : $i2
        };
    VG.create = Li2();
    VG.prototype._slice = G$.Array.prototype.subarray || G$.Array.prototype.slice;
    VG.prototype.uint32 = function A() {
        var B = 4294967295;
        return function Q() {
            if (B = (this.buf[this.pos] & 127) >>> 0, this.buf[this.pos++] < 128) return B;
            if (B = (B | (this.buf[this.pos] & 127) << 7) >>> 0, this.buf[this.pos++] < 128) return B;
            if (B = (B | (this.buf[this.pos] & 127) << 14) >>> 0, this.buf[this.pos++] < 128) return B;
            if (B = (B | (this.buf[this.pos] & 127) << 21) >>> 0, this.buf[this.pos++] < 128) return B;
            if (B = (B | (this.buf[this.pos] & 15) << 28) >>> 0, this.buf[this.pos++] < 128) return B;
            if ((this.pos += 5) > this.len) throw this.pos = this.len, F$(this, 10);
            return B
        }
    }();
    VG.prototype.int32 = function A() {
        return this.uint32() | 0
    };
    VG.prototype.sint32 = function A() {
        var B = this.uint32();
        return B >>> 1 ^ -(B & 1) | 0
    };

    function vW0() {
        var A = new Ni2(0, 0),
            B = 0;
        if (this.len - this.pos > 4) {
            for (; B < 4; ++B)
                if (A.lo = (A.lo | (this.buf[this.pos] & 127) << B * 7) >>> 0, this.buf[this.pos++] < 128) return A;
            if (A.lo = (A.lo | (this.buf[this.pos] & 127) << 28) >>> 0, A.hi = (A.hi | (this.buf[this.pos] & 127) >> 4) >>> 0, this.buf[this.pos++] < 128) return A;
            B = 0
        } else {
            for (; B < 3; ++B) {
                if (this.pos >= this.len) throw F$(this);
                if (A.lo = (A.lo | (this.buf[this.pos] & 127) << B * 7) >>> 0, this.buf[this.pos++] < 128) return A
            }
            return A.lo = (A.lo | (this.buf[this.pos++] & 127) << B * 7) >>> 0, A
        }
        if (this.len - this.pos > 4) {
            for (; B < 5; ++B)
                if (A.hi = (A.hi | (this.buf[this.pos] & 127) << B * 7 + 3) >>> 0, this.buf[this.pos++] < 128) return A
        } else
            for (; B < 5; ++B) {
                if (this.pos >= this.len) throw F$(this);
                if (A.hi = (A.hi | (this.buf[this.pos] & 127) << B * 7 + 3) >>> 0, this.buf[this.pos++] < 128) return A
            }
        throw Error("invalid varint encoding")
    }
    VG.prototype.bool = function A() {
        return this.uint32() !== 0
    };

    function AP1(A, B) {
        return (A[B - 4] | A[B - 3] << 8 | A[B - 2] << 16 | A[B - 1] << 24) >>> 0
    }
    VG.prototype.fixed32 = function A() {
        if (this.pos + 4 > this.len) throw F$(this, 4);
        return AP1(this.buf, this.pos += 4)
    };
    VG.prototype.sfixed32 = function A() {
        if (this.pos + 4 > this.len) throw F$(this, 4);
        return AP1(this.buf, this.pos += 4) | 0
    };

    function qi2() {
        if (this.pos + 8 > this.len) throw F$(this, 8);
        return new Ni2(AP1(this.buf, this.pos += 4), AP1(this.buf, this.pos += 4))
    }
    VG.prototype.float = function A() {
        if (this.pos + 4 > this.len) throw F$(this, 4);
        var B = G$.float.readFloatLE(this.buf, this.pos);
        return this.pos += 4, B
    };
    VG.prototype.double = function A() {
        if (this.pos + 8 > this.len) throw F$(this, 4);
        var B = G$.float.readDoubleLE(this.buf, this.pos);
        return this.pos += 8, B
    };
    VG.prototype.bytes = function A() {
        var B = this.uint32(),
            Q = this.pos,
            Z = this.pos + B;
        if (Z > this.len) throw F$(this, B);
        if (this.pos += B, Array.isArray(this.buf)) return this.buf.slice(Q, Z);
        if (Q === Z) {
            var D = G$.Buffer;
            return D ? D.alloc(0) : new this.buf.constructor(0)
        }
        return this._slice.call(this.buf, Q, Z)
    };
    VG.prototype.string = function A() {
        var B = this.bytes();
        return OY6.read(B, 0, B.length)
    };
    VG.prototype.skip = function A(B) {
        if (typeof B === "number") {
            if (this.pos + B > this.len) throw F$(this, B);
            this.pos += B
        } else
            do
                if (this.pos >= this.len) throw F$(this); while (this.buf[this.pos++] & 128);
        return this
    };
    VG.prototype.skipType = function(A) {
        switch (A) {
            case 0:
                this.skip();
                break;
            case 1:
                this.skip(8);
                break;
            case 2:
                this.skip(this.uint32());
                break;
            case 3:
                while ((A = this.uint32() & 7) !== 4) this.skipType(A);
                break;
            case 5:
                this.skip(4);
                break;
            default:
                throw Error("invalid wire type " + A + " at offset " + this.pos)
        }
        return this
    };
    VG._configure = function(A) {
        bW0 = A, VG.create = Li2(), bW0._configure();
        var B = G$.Long ? "toLong" : "toNumber";
        G$.merge(VG.prototype, {
            int64: function Q() {
                return vW0.call(this)[B](!1)
            },
            uint64: function Q() {
                return vW0.call(this)[B](!0)
            },
            sint64: function Q() {
                return vW0.call(this).zzDecode()[B](!1)
            },
            fixed64: function Q() {
                return qi2.call(this)[B](!0)
            },
            sfixed64: function Q() {
                return qi2.call(this)[B](!1)
            }
        })
    }
});
var Pi2 = E((Oc5, Ti2) => {
    Ti2.exports = Fm;
    var Oi2 = BP1();
    (Fm.prototype = Object.create(Oi2.prototype)).constructor = Fm;
    var Ri2 = QM();

    function Fm(A) {
        Oi2.call(this, A)
    }
    Fm._configure = function() {
        if (Ri2.Buffer) Fm.prototype._slice = Ri2.Buffer.prototype.slice
    };
    Fm.prototype.string = function A() {
        var B = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + B, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + B, this.len))
    };
    Fm._configure()
});
var ji2 = E((Tc5, Si2) => {
    Si2.exports = l31;
    var fW0 = QM();
    (l31.prototype = Object.create(fW0.EventEmitter.prototype)).constructor = l31;

    function l31(A, B, Q) {
        if (typeof A !== "function") throw TypeError("rpcImpl must be a function");
        fW0.EventEmitter.call(this), this.rpcImpl = A, this.requestDelimited = Boolean(B), this.responseDelimited = Boolean(Q)
    }
    l31.prototype.rpcCall = function A(B, Q, Z, D, G) {
        if (!D) throw TypeError("request must be specified");
        var F = this;
        if (!G) return fW0.asPromise(A, F, B, Q, Z, D);
        if (!F.rpcImpl) {
            setTimeout(function() {
                G(Error("already ended"))
            }, 0);
            return
        }
        try {
            return F.rpcImpl(B, Q[F.requestDelimited ? "encodeDelimited" : "encode"](D).finish(), function I(Y, W) {
                if (Y) return F.emit("error", Y, B), G(Y);
                if (W === null) {
                    F.end(!0);
                    return
                }
                if (!(W instanceof Z)) try {
                    W = Z[F.responseDelimited ? "decodeDelimited" : "decode"](W)
                } catch (J) {
                    return F.emit("error", J, B), G(J)
                }
                return F.emit("data", W, B), G(null, W)
            })
        } catch (I) {
            F.emit("error", I, B), setTimeout(function() {
                G(I)
            }, 0);
            return
        }
    };
    l31.prototype.end = function A(B) {
        if (this.rpcImpl) {
            if (!B) this.rpcImpl(null, null, null);
            this.rpcImpl = null, this.emit("end").off()
        }
        return this
    }
});
var hW0 = E((ki2) => {
    var TY6 = ki2;
    TY6.Service = ji2()
});
var gW0 = E((Sc5, yi2) => {
    yi2.exports = {}
});
var uW0 = E((xi2) => {
    var uV = xi2;
    uV.build = "minimal";
    uV.Writer = eT1();
    uV.BufferWriter = wi2();
    uV.Reader = BP1();
    uV.BufferReader = Pi2();
    uV.util = QM();
    uV.rpc = hW0();
    uV.roots = gW0();
    uV.configure = _i2;

    function _i2() {
        uV.util._configure(), uV.Writer._configure(uV.BufferWriter), uV.Reader._configure(uV.BufferReader)
    }
    _i2()
});