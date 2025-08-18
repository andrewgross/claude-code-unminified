/* chunk:314 bytes:[7282904, 7300100) size:17196 source:unpacked-cli.js */
var Zi2 = E((Uc5, Qi2) => {
    Qi2.exports = op2(op2);

    function op2(A) {
        if (typeof Float32Array !== "undefined")(function() {
            var B = new Float32Array([-0]),
                Q = new Uint8Array(B.buffer),
                Z = Q[3] === 128;

            function D(Y, W, J) {
                B[0] = Y, W[J] = Q[0], W[J + 1] = Q[1], W[J + 2] = Q[2], W[J + 3] = Q[3]
            }

            function G(Y, W, J) {
                B[0] = Y, W[J] = Q[3], W[J + 1] = Q[2], W[J + 2] = Q[1], W[J + 3] = Q[0]
            }
            A.writeFloatLE = Z ? D : G, A.writeFloatBE = Z ? G : D;

            function F(Y, W) {
                return Q[0] = Y[W], Q[1] = Y[W + 1], Q[2] = Y[W + 2], Q[3] = Y[W + 3], B[0]
            }

            function I(Y, W) {
                return Q[3] = Y[W], Q[2] = Y[W + 1], Q[1] = Y[W + 2], Q[0] = Y[W + 3], B[0]
            }
            A.readFloatLE = Z ? F : I, A.readFloatBE = Z ? I : F
        })();
        else(function() {
            function B(Z, D, G, F) {
                var I = D < 0 ? 1 : 0;
                if (I) D = -D;
                if (D === 0) Z(1 / D > 0 ? 0 : 2147483648, G, F);
                else if (isNaN(D)) Z(2143289344, G, F);
                else if (D > 340282346638528860000000000000000000000) Z((I << 31 | 2139095040) >>> 0, G, F);
                else if (D < 0.000000000000000000000000000000000000011754943508222875) Z((I << 31 | Math.round(D / 0.000000000000000000000000000000000000000000001401298464324817)) >>> 0, G, F);
                else {
                    var Y = Math.floor(Math.log(D) / Math.LN2),
                        W = Math.round(D * Math.pow(2, -Y) * 8388608) & 8388607;
                    Z((I << 31 | Y + 127 << 23 | W) >>> 0, G, F)
                }
            }
            A.writeFloatLE = B.bind(null, tp2), A.writeFloatBE = B.bind(null, ep2);

            function Q(Z, D, G) {
                var F = Z(D, G),
                    I = (F >> 31) * 2 + 1,
                    Y = F >>> 23 & 255,
                    W = F & 8388607;
                return Y === 255 ? W ? NaN : I * (1 / 0) : Y === 0 ? I * 0.000000000000000000000000000000000000000000001401298464324817 * W : I * Math.pow(2, Y - 150) * (W + 8388608)
            }
            A.readFloatLE = Q.bind(null, Ai2), A.readFloatBE = Q.bind(null, Bi2)
        })();
        if (typeof Float64Array !== "undefined")(function() {
            var B = new Float64Array([-0]),
                Q = new Uint8Array(B.buffer),
                Z = Q[7] === 128;

            function D(Y, W, J) {
                B[0] = Y, W[J] = Q[0], W[J + 1] = Q[1], W[J + 2] = Q[2], W[J + 3] = Q[3], W[J + 4] = Q[4], W[J + 5] = Q[5], W[J + 6] = Q[6], W[J + 7] = Q[7]
            }

            function G(Y, W, J) {
                B[0] = Y, W[J] = Q[7], W[J + 1] = Q[6], W[J + 2] = Q[5], W[J + 3] = Q[4], W[J + 4] = Q[3], W[J + 5] = Q[2], W[J + 6] = Q[1], W[J + 7] = Q[0]
            }
            A.writeDoubleLE = Z ? D : G, A.writeDoubleBE = Z ? G : D;

            function F(Y, W) {
                return Q[0] = Y[W], Q[1] = Y[W + 1], Q[2] = Y[W + 2], Q[3] = Y[W + 3], Q[4] = Y[W + 4], Q[5] = Y[W + 5], Q[6] = Y[W + 6], Q[7] = Y[W + 7], B[0]
            }

            function I(Y, W) {
                return Q[7] = Y[W], Q[6] = Y[W + 1], Q[5] = Y[W + 2], Q[4] = Y[W + 3], Q[3] = Y[W + 4], Q[2] = Y[W + 5], Q[1] = Y[W + 6], Q[0] = Y[W + 7], B[0]
            }
            A.readDoubleLE = Z ? F : I, A.readDoubleBE = Z ? I : F
        })();
        else(function() {
            function B(Z, D, G, F, I, Y) {
                var W = F < 0 ? 1 : 0;
                if (W) F = -F;
                if (F === 0) Z(0, I, Y + D), Z(1 / F > 0 ? 0 : 2147483648, I, Y + G);
                else if (isNaN(F)) Z(0, I, Y + D), Z(2146959360, I, Y + G);
                else if (F > 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) Z(0, I, Y + D), Z((W << 31 | 2146435072) >>> 0, I, Y + G);
                else {
                    var J;
                    if (F < 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000022250738585072014) J = F / 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005, Z(J >>> 0, I, Y + D), Z((W << 31 | J / 4294967296) >>> 0, I, Y + G);
                    else {
                        var X = Math.floor(Math.log(F) / Math.LN2);
                        if (X === 1024) X = 1023;
                        J = F * Math.pow(2, -X), Z(J * 4503599627370496 >>> 0, I, Y + D), Z((W << 31 | X + 1023 << 20 | J * 1048576 & 1048575) >>> 0, I, Y + G)
                    }
                }
            }
            A.writeDoubleLE = B.bind(null, tp2, 0, 4), A.writeDoubleBE = B.bind(null, ep2, 4, 0);

            function Q(Z, D, G, F, I) {
                var Y = Z(F, I + D),
                    W = Z(F, I + G),
                    J = (W >> 31) * 2 + 1,
                    X = W >>> 20 & 2047,
                    V = 4294967296 * (W & 1048575) + Y;
                return X === 2047 ? V ? NaN : J * (1 / 0) : X === 0 ? J * 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005 * V : J * Math.pow(2, X - 1075) * (V + 4503599627370496)
            }
            A.readDoubleLE = Q.bind(null, Ai2, 0, 4), A.readDoubleBE = Q.bind(null, Bi2, 4, 0)
        })();
        return A
    }

    function tp2(A, B, Q) {
        B[Q] = A & 255, B[Q + 1] = A >>> 8 & 255, B[Q + 2] = A >>> 16 & 255, B[Q + 3] = A >>> 24
    }

    function ep2(A, B, Q) {
        B[Q] = A >>> 24, B[Q + 1] = A >>> 16 & 255, B[Q + 2] = A >>> 8 & 255, B[Q + 3] = A & 255
    }

    function Ai2(A, B) {
        return (A[B] | A[B + 1] << 8 | A[B + 2] << 16 | A[B + 3] << 24) >>> 0
    }

    function Bi2(A, B) {
        return (A[B] << 24 | A[B + 1] << 16 | A[B + 2] << 8 | A[B + 3]) >>> 0
    }
});
var OW0 = E((Di2, RW0) => {
    RW0.exports = wY6;

    function wY6(moduleName) {
        try {
            var mod = eval("quire".replace(/^/, "re"))(moduleName);
            if (mod && (mod.length || Object.keys(mod).length)) return mod
        } catch (A) {}
        return null
    }
});
var Fi2 = E((Gi2) => {
    var TW0 = Gi2;
    TW0.length = function A(B) {
        var Q = 0,
            Z = 0;
        for (var D = 0; D < B.length; ++D)
            if (Z = B.charCodeAt(D), Z < 128) Q += 1;
            else if (Z < 2048) Q += 2;
        else if ((Z & 64512) === 55296 && (B.charCodeAt(D + 1) & 64512) === 56320) ++D, Q += 4;
        else Q += 3;
        return Q
    };
    TW0.read = function A(B, Q, Z) {
        var D = Z - Q;
        if (D < 1) return "";
        var G = null,
            F = [],
            I = 0,
            Y;
        while (Q < Z) {
            if (Y = B[Q++], Y < 128) F[I++] = Y;
            else if (Y > 191 && Y < 224) F[I++] = (Y & 31) << 6 | B[Q++] & 63;
            else if (Y > 239 && Y < 365) Y = ((Y & 7) << 18 | (B[Q++] & 63) << 12 | (B[Q++] & 63) << 6 | B[Q++] & 63) - 65536, F[I++] = 55296 + (Y >> 10), F[I++] = 56320 + (Y & 1023);
            else F[I++] = (Y & 15) << 12 | (B[Q++] & 63) << 6 | B[Q++] & 63;
            if (I > 8191)(G || (G = [])).push(String.fromCharCode.apply(String, F)), I = 0
        }
        if (G) {
            if (I) G.push(String.fromCharCode.apply(String, F.slice(0, I)));
            return G.join("")
        }
        return String.fromCharCode.apply(String, F.slice(0, I))
    };
    TW0.write = function A(B, Q, Z) {
        var D = Z,
            G, F;
        for (var I = 0; I < B.length; ++I)
            if (G = B.charCodeAt(I), G < 128) Q[Z++] = G;
            else if (G < 2048) Q[Z++] = G >> 6 | 192, Q[Z++] = G & 63 | 128;
        else if ((G & 64512) === 55296 && ((F = B.charCodeAt(I + 1)) & 64512) === 56320) G = 65536 + ((G & 1023) << 10) + (F & 1023), ++I, Q[Z++] = G >> 18 | 240, Q[Z++] = G >> 12 & 63 | 128, Q[Z++] = G >> 6 & 63 | 128, Q[Z++] = G & 63 | 128;
        else Q[Z++] = G >> 12 | 224, Q[Z++] = G >> 6 & 63 | 128, Q[Z++] = G & 63 | 128;
        return Z - D
    }
});
var Yi2 = E(($c5, Ii2) => {
    Ii2.exports = $Y6;

    function $Y6(A, B, Q) {
        var Z = Q || 8192,
            D = Z >>> 1,
            G = null,
            F = Z;
        return function I(Y) {
            if (Y < 1 || Y > D) return A(Y);
            if (F + Y > Z) G = A(Z), F = 0;
            var W = B.call(G, F, F += Y);
            if (F & 7) F = (F | 7) + 1;
            return W
        }
    }
});
var Ji2 = E((qc5, Wi2) => {
    Wi2.exports = $I;
    var d31 = QM();

    function $I(A, B) {
        this.lo = A >>> 0, this.hi = B >>> 0
    }
    var Gm = $I.zero = new $I(0, 0);
    Gm.toNumber = function() {
        return 0
    };
    Gm.zzEncode = Gm.zzDecode = function() {
        return this
    };
    Gm.length = function() {
        return 1
    };
    var qY6 = $I.zeroHash = "\x00\x00\x00\x00\x00\x00\x00\x00";
    $I.fromNumber = function A(B) {
        if (B === 0) return Gm;
        var Q = B < 0;
        if (Q) B = -B;
        var Z = B >>> 0,
            D = (B - Z) / 4294967296 >>> 0;
        if (Q) {
            if (D = ~D >>> 0, Z = ~Z >>> 0, ++Z > 4294967295) {
                if (Z = 0, ++D > 4294967295) D = 0
            }
        }
        return new $I(Z, D)
    };
    $I.from = function A(B) {
        if (typeof B === "number") return $I.fromNumber(B);
        if (d31.isString(B))
            if (d31.Long) B = d31.Long.fromString(B);
            else return $I.fromNumber(parseInt(B, 10));
        return B.low || B.high ? new $I(B.low >>> 0, B.high >>> 0) : Gm
    };
    $I.prototype.toNumber = function A(B) {
        if (!B && this.hi >>> 31) {
            var Q = ~this.lo + 1 >>> 0,
                Z = ~this.hi >>> 0;
            if (!Q) Z = Z + 1 >>> 0;
            return -(Q + Z * 4294967296)
        }
        return this.lo + this.hi * 4294967296
    };
    $I.prototype.toLong = function A(B) {
        return d31.Long ? new d31.Long(this.lo | 0, this.hi | 0, Boolean(B)) : {
            low: this.lo | 0,
            high: this.hi | 0,
            unsigned: Boolean(B)
        }
    };
    var Zx = String.prototype.charCodeAt;
    $I.fromHash = function A(B) {
        if (B === qY6) return Gm;
        return new $I((Zx.call(B, 0) | Zx.call(B, 1) << 8 | Zx.call(B, 2) << 16 | Zx.call(B, 3) << 24) >>> 0, (Zx.call(B, 4) | Zx.call(B, 5) << 8 | Zx.call(B, 6) << 16 | Zx.call(B, 7) << 24) >>> 0)
    };
    $I.prototype.toHash = function A() {
        return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24)
    };
    $I.prototype.zzEncode = function A() {
        var B = this.hi >> 31;
        return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ B) >>> 0, this.lo = (this.lo << 1 ^ B) >>> 0, this
    };
    $I.prototype.zzDecode = function A() {
        var B = -(this.lo & 1);
        return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ B) >>> 0, this.hi = (this.hi >>> 1 ^ B) >>> 0, this
    };
    $I.prototype.length = function A() {
        var B = this.lo,
            Q = (this.lo >>> 28 | this.hi << 4) >>> 0,
            Z = this.hi >>> 24;
        return Z === 0 ? Q === 0 ? B < 16384 ? B < 128 ? 1 : 2 : B < 2097152 ? 3 : 4 : Q < 16384 ? Q < 128 ? 5 : 6 : Q < 2097152 ? 7 : 8 : Z < 128 ? 9 : 10
    }
});
var QM = E((PW0) => {
    var T9 = PW0;
    T9.asPromise = MW0();
    T9.base64 = ap2();
    T9.EventEmitter = rp2();
    T9.float = Zi2();
    T9.inquire = OW0();
    T9.utf8 = Fi2();
    T9.pool = Yi2();
    T9.LongBits = Ji2();
    T9.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    T9.global = T9.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || PW0;
    T9.emptyArray = Object.freeze ? Object.freeze([]) : [];
    T9.emptyObject = Object.freeze ? Object.freeze({}) : {};
    T9.isInteger = Number.isInteger || function A(B) {
        return typeof B === "number" && isFinite(B) && Math.floor(B) === B
    };
    T9.isString = function A(B) {
        return typeof B === "string" || B instanceof String
    };
    T9.isObject = function A(B) {
        return B && typeof B === "object"
    };
    T9.isset = T9.isSet = function A(B, Q) {
        var Z = B[Q];
        if (Z != null && B.hasOwnProperty(Q)) return typeof Z !== "object" || (Array.isArray(Z) ? Z.length : Object.keys(Z).length) > 0;
        return !1
    };
    T9.Buffer = function() {
        try {
            var A = T9.inquire("buffer").Buffer;
            return A.prototype.utf8Write ? A : null
        } catch (B) {
            return null
        }
    }();
    T9._Buffer_from = null;
    T9._Buffer_allocUnsafe = null;
    T9.newBuffer = function A(B) {
        return typeof B === "number" ? T9.Buffer ? T9._Buffer_allocUnsafe(B) : new T9.Array(B) : T9.Buffer ? T9._Buffer_from(B) : typeof Uint8Array === "undefined" ? B : new Uint8Array(B)
    };
    T9.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    T9.Long = T9.global.dcodeIO && T9.global.dcodeIO.Long || T9.global.Long || T9.inquire("long");
    T9.key2Re = /^true|false|0|1$/;
    T9.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    T9.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    T9.longToHash = function A(B) {
        return B ? T9.LongBits.from(B).toHash() : T9.LongBits.zeroHash
    };
    T9.longFromHash = function A(B, Q) {
        var Z = T9.LongBits.fromHash(B);
        if (T9.Long) return T9.Long.fromBits(Z.lo, Z.hi, Q);
        return Z.toNumber(Boolean(Q))
    };

    function Xi2(A, B, Q) {
        for (var Z = Object.keys(B), D = 0; D < Z.length; ++D)
            if (A[Z[D]] === void 0 || !Q) A[Z[D]] = B[Z[D]];
        return A
    }
    T9.merge = Xi2;
    T9.lcFirst = function A(B) {
        return B.charAt(0).toLowerCase() + B.substring(1)
    };

    function Vi2(A) {
        function B(Q, Z) {
            if (!(this instanceof B)) return new B(Q, Z);
            if (Object.defineProperty(this, "message", {
                    get: function() {
                        return Q
                    }
                }), Error.captureStackTrace) Error.captureStackTrace(this, B);
            else Object.defineProperty(this, "stack", {
                value: new Error().stack || ""
            });
            if (Z) Xi2(this, Z)
        }
        return B.prototype = Object.create(Error.prototype, {
            constructor: {
                value: B,
                writable: !0,
                enumerable: !1,
                configurable: !0
            },
            name: {
                get: function Q() {
                    return A
                },
                set: void 0,
                enumerable: !1,
                configurable: !0
            },
            toString: {
                value: function Q() {
                    return this.name + ": " + this.message
                },
                writable: !0,
                enumerable: !1,
                configurable: !0
            }
        }), B
    }
    T9.newError = Vi2;
    T9.ProtocolError = Vi2("ProtocolError");
    T9.oneOfGetter = function A(B) {
        var Q = {};
        for (var Z = 0; Z < B.length; ++Z) Q[B[Z]] = 1;
        return function() {
            for (var D = Object.keys(this), G = D.length - 1; G > -1; --G)
                if (Q[D[G]] === 1 && this[D[G]] !== void 0 && this[D[G]] !== null) return D[G]
        }
    };
    T9.oneOfSetter = function A(B) {
        return function(Q) {
            for (var Z = 0; Z < B.length; ++Z)
                if (B[Z] !== Q) delete this[B[Z]]
        }
    };
    T9.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: !0
    };
    T9._configure = function() {
        var A = T9.Buffer;
        if (!A) {
            T9._Buffer_from = T9._Buffer_allocUnsafe = null;
            return
        }
        T9._Buffer_from = A.from !== Uint8Array.from && A.from || function B(Q, Z) {
            return new A(Q, Z)
        }, T9._Buffer_allocUnsafe = A.allocUnsafe || function B(Q) {
            return new A(Q)
        }
    }
});