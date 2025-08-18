/* chunk:393 bytes:[9213495, 9228543) size:15048 source:unpacked-cli.js */
var Oz0 = E((mGB) => {
    Object.defineProperty(mGB, "__esModule", {
        value: !0
    });
    mGB.MAX_HASHABLE_LENGTH = mGB.INIT = mGB.KEY = mGB.DIGEST_LENGTH = mGB.BLOCK_SIZE = void 0;
    mGB.BLOCK_SIZE = 64;
    mGB.DIGEST_LENGTH = 32;
    mGB.KEY = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
    mGB.INIT = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    mGB.MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1
});
var pGB = E((cGB) => {
    Object.defineProperty(cGB, "__esModule", {
        value: !0
    });
    cGB.RawSha256 = void 0;
    var dE = Oz0(),
        Ub6 = function() {
            function A() {
                this.state = Int32Array.from(dE.INIT), this.temp = new Int32Array(64), this.buffer = new Uint8Array(64), this.bufferLength = 0, this.bytesHashed = 0, this.finished = !1
            }
            return A.prototype.update = function(B) {
                if (this.finished) throw new Error("Attempted to update an already finished hash.");
                var Q = 0,
                    Z = B.byteLength;
                if (this.bytesHashed += Z, this.bytesHashed * 8 > dE.MAX_HASHABLE_LENGTH) throw new Error("Cannot hash more than 2^53 - 1 bits");
                while (Z > 0)
                    if (this.buffer[this.bufferLength++] = B[Q++], Z--, this.bufferLength === dE.BLOCK_SIZE) this.hashBuffer(), this.bufferLength = 0
            }, A.prototype.digest = function() {
                if (!this.finished) {
                    var B = this.bytesHashed * 8,
                        Q = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength),
                        Z = this.bufferLength;
                    if (Q.setUint8(this.bufferLength++, 128), Z % dE.BLOCK_SIZE >= dE.BLOCK_SIZE - 8) {
                        for (var D = this.bufferLength; D < dE.BLOCK_SIZE; D++) Q.setUint8(D, 0);
                        this.hashBuffer(), this.bufferLength = 0
                    }
                    for (var D = this.bufferLength; D < dE.BLOCK_SIZE - 8; D++) Q.setUint8(D, 0);
                    Q.setUint32(dE.BLOCK_SIZE - 8, Math.floor(B / 4294967296), !0), Q.setUint32(dE.BLOCK_SIZE - 4, B), this.hashBuffer(), this.finished = !0
                }
                var G = new Uint8Array(dE.DIGEST_LENGTH);
                for (var D = 0; D < 8; D++) G[D * 4] = this.state[D] >>> 24 & 255, G[D * 4 + 1] = this.state[D] >>> 16 & 255, G[D * 4 + 2] = this.state[D] >>> 8 & 255, G[D * 4 + 3] = this.state[D] >>> 0 & 255;
                return G
            }, A.prototype.hashBuffer = function() {
                var B = this,
                    Q = B.buffer,
                    Z = B.state,
                    D = Z[0],
                    G = Z[1],
                    F = Z[2],
                    I = Z[3],
                    Y = Z[4],
                    W = Z[5],
                    J = Z[6],
                    X = Z[7];
                for (var V = 0; V < dE.BLOCK_SIZE; V++) {
                    if (V < 16) this.temp[V] = (Q[V * 4] & 255) << 24 | (Q[V * 4 + 1] & 255) << 16 | (Q[V * 4 + 2] & 255) << 8 | Q[V * 4 + 3] & 255;
                    else {
                        var C = this.temp[V - 2],
                            K = (C >>> 17 | C << 15) ^ (C >>> 19 | C << 13) ^ C >>> 10;
                        C = this.temp[V - 15];
                        var H = (C >>> 7 | C << 25) ^ (C >>> 18 | C << 14) ^ C >>> 3;
                        this.temp[V] = (K + this.temp[V - 7] | 0) + (H + this.temp[V - 16] | 0)
                    }
                    var z = (((Y >>> 6 | Y << 26) ^ (Y >>> 11 | Y << 21) ^ (Y >>> 25 | Y << 7)) + (Y & W ^ ~Y & J) | 0) + (X + (dE.KEY[V] + this.temp[V] | 0) | 0) | 0,
                        $ = ((D >>> 2 | D << 30) ^ (D >>> 13 | D << 19) ^ (D >>> 22 | D << 10)) + (D & G ^ D & F ^ G & F) | 0;
                    X = J, J = W, W = Y, Y = I + z | 0, I = F, F = G, G = D, D = z + $ | 0
                }
                Z[0] += D, Z[1] += G, Z[2] += F, Z[3] += I, Z[4] += Y, Z[5] += W, Z[6] += J, Z[7] += X
            }, A
        }();
    cGB.RawSha256 = Ub6
});
var aGB = E((iGB) => {
    Object.defineProperty(iGB, "__esModule", {
        value: !0
    });
    iGB.toUtf8 = iGB.fromUtf8 = void 0;
    var wb6 = (A) => {
        let B = [];
        for (let Q = 0, Z = A.length; Q < Z; Q++) {
            let D = A.charCodeAt(Q);
            if (D < 128) B.push(D);
            else if (D < 2048) B.push(D >> 6 | 192, D & 63 | 128);
            else if (Q + 1 < A.length && (D & 64512) === 55296 && (A.charCodeAt(Q + 1) & 64512) === 56320) {
                let G = 65536 + ((D & 1023) << 10) + (A.charCodeAt(++Q) & 1023);
                B.push(G >> 18 | 240, G >> 12 & 63 | 128, G >> 6 & 63 | 128, G & 63 | 128)
            } else B.push(D >> 12 | 224, D >> 6 & 63 | 128, D & 63 | 128)
        }
        return Uint8Array.from(B)
    };
    iGB.fromUtf8 = wb6;
    var $b6 = (A) => {
        let B = "";
        for (let Q = 0, Z = A.length; Q < Z; Q++) {
            let D = A[Q];
            if (D < 128) B += String.fromCharCode(D);
            else if (192 <= D && D < 224) {
                let G = A[++Q];
                B += String.fromCharCode((D & 31) << 6 | G & 63)
            } else if (240 <= D && D < 365) {
                let F = "%" + [D, A[++Q], A[++Q], A[++Q]].map((I) => I.toString(16)).join("%");
                B += decodeURIComponent(F)
            } else B += String.fromCharCode((D & 15) << 12 | (A[++Q] & 63) << 6 | A[++Q] & 63)
        }
        return B
    };
    iGB.toUtf8 = $b6
});
var oGB = E((sGB) => {
    Object.defineProperty(sGB, "__esModule", {
        value: !0
    });
    sGB.toUtf8 = sGB.fromUtf8 = void 0;

    function Nb6(A) {
        return new TextEncoder().encode(A)
    }
    sGB.fromUtf8 = Nb6;

    function Lb6(A) {
        return new TextDecoder("utf-8").decode(A)
    }
    sGB.toUtf8 = Lb6
});
var Tz0 = E((AFB) => {
    Object.defineProperty(AFB, "__esModule", {
        value: !0
    });
    AFB.toUtf8 = AFB.fromUtf8 = void 0;
    var tGB = aGB(),
        eGB = oGB(),
        Rb6 = (A) => typeof TextEncoder === "function" ? eGB.fromUtf8(A) : tGB.fromUtf8(A);
    AFB.fromUtf8 = Rb6;
    var Ob6 = (A) => typeof TextDecoder === "function" ? eGB.toUtf8(A) : tGB.toUtf8(A);
    AFB.toUtf8 = Ob6
});
var DFB = E((QFB) => {
    Object.defineProperty(QFB, "__esModule", {
        value: !0
    });
    QFB.convertToBuffer = void 0;
    var Pb6 = Tz0(),
        Sb6 = typeof Buffer !== "undefined" && Buffer.from ? function(A) {
            return Buffer.from(A, "utf8")
        } : Pb6.fromUtf8;

    function jb6(A) {
        if (A instanceof Uint8Array) return A;
        if (typeof A === "string") return Sb6(A);
        if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
        return new Uint8Array(A)
    }
    QFB.convertToBuffer = jb6
});
var IFB = E((GFB) => {
    Object.defineProperty(GFB, "__esModule", {
        value: !0
    });
    GFB.isEmptyData = void 0;

    function kb6(A) {
        if (typeof A === "string") return A.length === 0;
        return A.byteLength === 0
    }
    GFB.isEmptyData = kb6
});
var JFB = E((YFB) => {
    Object.defineProperty(YFB, "__esModule", {
        value: !0
    });
    YFB.numToUint8 = void 0;

    function yb6(A) {
        return new Uint8Array([(A & 4278190080) >> 24, (A & 16711680) >> 16, (A & 65280) >> 8, A & 255])
    }
    YFB.numToUint8 = yb6
});
var CFB = E((XFB) => {
    Object.defineProperty(XFB, "__esModule", {
        value: !0
    });
    XFB.uint32ArrayFrom = void 0;

    function _b6(A) {
        if (!Uint32Array.from) {
            var B = new Uint32Array(A.length),
                Q = 0;
            while (Q < A.length) B[Q] = A[Q], Q += 1;
            return B
        }
        return Uint32Array.from(A)
    }
    XFB.uint32ArrayFrom = _b6
});
var KFB = E((se) => {
    Object.defineProperty(se, "__esModule", {
        value: !0
    });
    se.uint32ArrayFrom = se.numToUint8 = se.isEmptyData = se.convertToBuffer = void 0;
    var xb6 = DFB();
    Object.defineProperty(se, "convertToBuffer", {
        enumerable: !0,
        get: function() {
            return xb6.convertToBuffer
        }
    });
    var vb6 = IFB();
    Object.defineProperty(se, "isEmptyData", {
        enumerable: !0,
        get: function() {
            return vb6.isEmptyData
        }
    });
    var bb6 = JFB();
    Object.defineProperty(se, "numToUint8", {
        enumerable: !0,
        get: function() {
            return bb6.numToUint8
        }
    });
    var fb6 = CFB();
    Object.defineProperty(se, "uint32ArrayFrom", {
        enumerable: !0,
        get: function() {
            return fb6.uint32ArrayFrom
        }
    })
});
var UFB = E((zFB) => {
    Object.defineProperty(zFB, "__esModule", {
        value: !0
    });
    zFB.Sha256 = void 0;
    var HFB = Rz0(),
        wy1 = Oz0(),
        Uy1 = pGB(),
        Pz0 = KFB(),
        gb6 = function() {
            function A(B) {
                this.secret = B, this.hash = new Uy1.RawSha256, this.reset()
            }
            return A.prototype.update = function(B) {
                if (Pz0.isEmptyData(B) || this.error) return;
                try {
                    this.hash.update(Pz0.convertToBuffer(B))
                } catch (Q) {
                    this.error = Q
                }
            }, A.prototype.digestSync = function() {
                if (this.error) throw this.error;
                if (this.outer) {
                    if (!this.outer.finished) this.outer.update(this.hash.digest());
                    return this.outer.digest()
                }
                return this.hash.digest()
            }, A.prototype.digest = function() {
                return HFB.__awaiter(this, void 0, void 0, function() {
                    return HFB.__generator(this, function(B) {
                        return [2, this.digestSync()]
                    })
                })
            }, A.prototype.reset = function() {
                if (this.hash = new Uy1.RawSha256, this.secret) {
                    this.outer = new Uy1.RawSha256;
                    var B = ub6(this.secret),
                        Q = new Uint8Array(wy1.BLOCK_SIZE);
                    Q.set(B);
                    for (var Z = 0; Z < wy1.BLOCK_SIZE; Z++) B[Z] ^= 54, Q[Z] ^= 92;
                    this.hash.update(B), this.outer.update(Q);
                    for (var Z = 0; Z < B.byteLength; Z++) B[Z] = 0
                }
            }, A
        }();
    zFB.Sha256 = gb6;

    function ub6(A) {
        var B = Pz0.convertToBuffer(A);
        if (B.byteLength > wy1.BLOCK_SIZE) {
            var Q = new Uy1.RawSha256;
            Q.update(B), B = Q.digest()
        }
        var Z = new Uint8Array(wy1.BLOCK_SIZE);
        return Z.set(B), Z
    }
});
var wFB = E((Sz0) => {
    Object.defineProperty(Sz0, "__esModule", {
        value: !0
    });
    var mb6 = Rz0();
    mb6.__exportStar(UFB(), Sz0)
});
var SFB = E((o93, PFB) => {
    var {
        defineProperty: $y1,
        getOwnPropertyDescriptor: db6,
        getOwnPropertyNames: cb6
    } = Object, lb6 = Object.prototype.hasOwnProperty, qy1 = (A, B) => $y1(A, "name", {
        value: B,
        configurable: !0
    }), pb6 = (A, B) => {
        for (var Q in B) $y1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, ib6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of cb6(B))
                if (!lb6.call(A, D) && D !== Q) $y1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = db6(B, D)) || Z.enumerable
                })
        }
        return A
    }, nb6 = (A) => ib6($y1({}, "__esModule", {
        value: !0
    }), A), $FB = {};
    pb6($FB, {
        AlgorithmId: () => MFB,
        EndpointURLScheme: () => LFB,
        FieldPosition: () => RFB,
        HttpApiKeyAuthLocation: () => NFB,
        HttpAuthLocation: () => qFB,
        IniSectionType: () => OFB,
        RequestHandlerProtocol: () => TFB,
        SMITHY_CONTEXT_KEY: () => tb6,
        getDefaultClientConfiguration: () => rb6,
        resolveDefaultRuntimeConfig: () => ob6
    });
    PFB.exports = nb6($FB);
    var qFB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(qFB || {}),
        NFB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(NFB || {}),
        LFB = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(LFB || {}),
        MFB = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(MFB || {}),
        ab6 = qy1((A) => {
            let B = [];
            if (A.sha256 !== void 0) B.push({
                algorithmId: () => "sha256",
                checksumConstructor: () => A.sha256
            });
            if (A.md5 != null) B.push({
                algorithmId: () => "md5",
                checksumConstructor: () => A.md5
            });
            return {
                addChecksumAlgorithm(Q) {
                    B.push(Q)
                },
                checksumAlgorithms() {
                    return B
                }
            }
        }, "getChecksumConfiguration"),
        sb6 = qy1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        rb6 = qy1((A) => {
            return ab6(A)
        }, "getDefaultClientConfiguration"),
        ob6 = qy1((A) => {
            return sb6(A)
        }, "resolveDefaultRuntimeConfig"),
        RFB = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(RFB || {}),
        tb6 = "__smithy_context",
        OFB = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(OFB || {}),
        TFB = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(TFB || {})
});