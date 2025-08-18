/* chunk:471 bytes:[11301223, 11318562) size:17339 source:unpacked-cli.js */
var uR0 = E((nk3, WfB) => {
    var fI = j4();
    b8();
    fI.cipher = fI.cipher || {};
    var w6 = WfB.exports = fI.cipher.modes = fI.cipher.modes || {};
    w6.ecb = function(A) {
        A = A || {}, this.name = "ECB", this.cipher = A.cipher, this.blockSize = A.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints)
    };
    w6.ecb.prototype.start = function(A) {};
    w6.ecb.prototype.encrypt = function(A, B, Q) {
        if (A.length() < this.blockSize && !(Q && A.length() > 0)) return !0;
        for (var Z = 0; Z < this._ints; ++Z) this._inBlock[Z] = A.getInt32();
        this.cipher.encrypt(this._inBlock, this._outBlock);
        for (var Z = 0; Z < this._ints; ++Z) B.putInt32(this._outBlock[Z])
    };
    w6.ecb.prototype.decrypt = function(A, B, Q) {
        if (A.length() < this.blockSize && !(Q && A.length() > 0)) return !0;
        for (var Z = 0; Z < this._ints; ++Z) this._inBlock[Z] = A.getInt32();
        this.cipher.decrypt(this._inBlock, this._outBlock);
        for (var Z = 0; Z < this._ints; ++Z) B.putInt32(this._outBlock[Z])
    };
    w6.ecb.prototype.pad = function(A, B) {
        var Q = A.length() === this.blockSize ? this.blockSize : this.blockSize - A.length();
        return A.fillWithByte(Q, Q), !0
    };
    w6.ecb.prototype.unpad = function(A, B) {
        if (B.overflow > 0) return !1;
        var Q = A.length(),
            Z = A.at(Q - 1);
        if (Z > this.blockSize << 2) return !1;
        return A.truncate(Z), !0
    };
    w6.cbc = function(A) {
        A = A || {}, this.name = "CBC", this.cipher = A.cipher, this.blockSize = A.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints)
    };
    w6.cbc.prototype.start = function(A) {
        if (A.iv === null) {
            if (!this._prev) throw new Error("Invalid IV parameter.");
            this._iv = this._prev.slice(0)
        } else if (!("iv" in A)) throw new Error("Invalid IV parameter.");
        else this._iv = Wh1(A.iv, this.blockSize), this._prev = this._iv.slice(0)
    };
    w6.cbc.prototype.encrypt = function(A, B, Q) {
        if (A.length() < this.blockSize && !(Q && A.length() > 0)) return !0;
        for (var Z = 0; Z < this._ints; ++Z) this._inBlock[Z] = this._prev[Z] ^ A.getInt32();
        this.cipher.encrypt(this._inBlock, this._outBlock);
        for (var Z = 0; Z < this._ints; ++Z) B.putInt32(this._outBlock[Z]);
        this._prev = this._outBlock
    };
    w6.cbc.prototype.decrypt = function(A, B, Q) {
        if (A.length() < this.blockSize && !(Q && A.length() > 0)) return !0;
        for (var Z = 0; Z < this._ints; ++Z) this._inBlock[Z] = A.getInt32();
        this.cipher.decrypt(this._inBlock, this._outBlock);
        for (var Z = 0; Z < this._ints; ++Z) B.putInt32(this._prev[Z] ^ this._outBlock[Z]);
        this._prev = this._inBlock.slice(0)
    };
    w6.cbc.prototype.pad = function(A, B) {
        var Q = A.length() === this.blockSize ? this.blockSize : this.blockSize - A.length();
        return A.fillWithByte(Q, Q), !0
    };
    w6.cbc.prototype.unpad = function(A, B) {
        if (B.overflow > 0) return !1;
        var Q = A.length(),
            Z = A.at(Q - 1);
        if (Z > this.blockSize << 2) return !1;
        return A.truncate(Z), !0
    };
    w6.cfb = function(A) {
        A = A || {}, this.name = "CFB", this.cipher = A.cipher, this.blockSize = A.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialBlock = new Array(this._ints), this._partialOutput = fI.util.createBuffer(), this._partialBytes = 0
    };
    w6.cfb.prototype.start = function(A) {
        if (!("iv" in A)) throw new Error("Invalid IV parameter.");
        this._iv = Wh1(A.iv, this.blockSize), this._inBlock = this._iv.slice(0), this._partialBytes = 0
    };
    w6.cfb.prototype.encrypt = function(A, B, Q) {
        var Z = A.length();
        if (Z === 0) return !0;
        if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && Z >= this.blockSize) {
            for (var D = 0; D < this._ints; ++D) this._inBlock[D] = A.getInt32() ^ this._outBlock[D], B.putInt32(this._inBlock[D]);
            return
        }
        var G = (this.blockSize - Z) % this.blockSize;
        if (G > 0) G = this.blockSize - G;
        this._partialOutput.clear();
        for (var D = 0; D < this._ints; ++D) this._partialBlock[D] = A.getInt32() ^ this._outBlock[D], this._partialOutput.putInt32(this._partialBlock[D]);
        if (G > 0) A.read -= this.blockSize;
        else
            for (var D = 0; D < this._ints; ++D) this._inBlock[D] = this._partialBlock[D];
        if (this._partialBytes > 0) this._partialOutput.getBytes(this._partialBytes);
        if (G > 0 && !Q) return B.putBytes(this._partialOutput.getBytes(G - this._partialBytes)), this._partialBytes = G, !0;
        B.putBytes(this._partialOutput.getBytes(Z - this._partialBytes)), this._partialBytes = 0
    };
    w6.cfb.prototype.decrypt = function(A, B, Q) {
        var Z = A.length();
        if (Z === 0) return !0;
        if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && Z >= this.blockSize) {
            for (var D = 0; D < this._ints; ++D) this._inBlock[D] = A.getInt32(), B.putInt32(this._inBlock[D] ^ this._outBlock[D]);
            return
        }
        var G = (this.blockSize - Z) % this.blockSize;
        if (G > 0) G = this.blockSize - G;
        this._partialOutput.clear();
        for (var D = 0; D < this._ints; ++D) this._partialBlock[D] = A.getInt32(), this._partialOutput.putInt32(this._partialBlock[D] ^ this._outBlock[D]);
        if (G > 0) A.read -= this.blockSize;
        else
            for (var D = 0; D < this._ints; ++D) this._inBlock[D] = this._partialBlock[D];
        if (this._partialBytes > 0) this._partialOutput.getBytes(this._partialBytes);
        if (G > 0 && !Q) return B.putBytes(this._partialOutput.getBytes(G - this._partialBytes)), this._partialBytes = G, !0;
        B.putBytes(this._partialOutput.getBytes(Z - this._partialBytes)), this._partialBytes = 0
    };
    w6.ofb = function(A) {
        A = A || {}, this.name = "OFB", this.cipher = A.cipher, this.blockSize = A.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialOutput = fI.util.createBuffer(), this._partialBytes = 0
    };
    w6.ofb.prototype.start = function(A) {
        if (!("iv" in A)) throw new Error("Invalid IV parameter.");
        this._iv = Wh1(A.iv, this.blockSize), this._inBlock = this._iv.slice(0), this._partialBytes = 0
    };
    w6.ofb.prototype.encrypt = function(A, B, Q) {
        var Z = A.length();
        if (A.length() === 0) return !0;
        if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && Z >= this.blockSize) {
            for (var D = 0; D < this._ints; ++D) B.putInt32(A.getInt32() ^ this._outBlock[D]), this._inBlock[D] = this._outBlock[D];
            return
        }
        var G = (this.blockSize - Z) % this.blockSize;
        if (G > 0) G = this.blockSize - G;
        this._partialOutput.clear();
        for (var D = 0; D < this._ints; ++D) this._partialOutput.putInt32(A.getInt32() ^ this._outBlock[D]);
        if (G > 0) A.read -= this.blockSize;
        else
            for (var D = 0; D < this._ints; ++D) this._inBlock[D] = this._outBlock[D];
        if (this._partialBytes > 0) this._partialOutput.getBytes(this._partialBytes);
        if (G > 0 && !Q) return B.putBytes(this._partialOutput.getBytes(G - this._partialBytes)), this._partialBytes = G, !0;
        B.putBytes(this._partialOutput.getBytes(Z - this._partialBytes)), this._partialBytes = 0
    };
    w6.ofb.prototype.decrypt = w6.ofb.prototype.encrypt;
    w6.ctr = function(A) {
        A = A || {}, this.name = "CTR", this.cipher = A.cipher, this.blockSize = A.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialOutput = fI.util.createBuffer(), this._partialBytes = 0
    };
    w6.ctr.prototype.start = function(A) {
        if (!("iv" in A)) throw new Error("Invalid IV parameter.");
        this._iv = Wh1(A.iv, this.blockSize), this._inBlock = this._iv.slice(0), this._partialBytes = 0
    };
    w6.ctr.prototype.encrypt = function(A, B, Q) {
        var Z = A.length();
        if (Z === 0) return !0;
        if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && Z >= this.blockSize)
            for (var D = 0; D < this._ints; ++D) B.putInt32(A.getInt32() ^ this._outBlock[D]);
        else {
            var G = (this.blockSize - Z) % this.blockSize;
            if (G > 0) G = this.blockSize - G;
            this._partialOutput.clear();
            for (var D = 0; D < this._ints; ++D) this._partialOutput.putInt32(A.getInt32() ^ this._outBlock[D]);
            if (G > 0) A.read -= this.blockSize;
            if (this._partialBytes > 0) this._partialOutput.getBytes(this._partialBytes);
            if (G > 0 && !Q) return B.putBytes(this._partialOutput.getBytes(G - this._partialBytes)), this._partialBytes = G, !0;
            B.putBytes(this._partialOutput.getBytes(Z - this._partialBytes)), this._partialBytes = 0
        }
        Jh1(this._inBlock)
    };
    w6.ctr.prototype.decrypt = w6.ctr.prototype.encrypt;
    w6.gcm = function(A) {
        A = A || {}, this.name = "GCM", this.cipher = A.cipher, this.blockSize = A.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints), this._partialOutput = fI.util.createBuffer(), this._partialBytes = 0, this._R = 3774873600
    };
    w6.gcm.prototype.start = function(A) {
        if (!("iv" in A)) throw new Error("Invalid IV parameter.");
        var B = fI.util.createBuffer(A.iv);
        this._cipherLength = 0;
        var Q;
        if ("additionalData" in A) Q = fI.util.createBuffer(A.additionalData);
        else Q = fI.util.createBuffer();
        if ("tagLength" in A) this._tagLength = A.tagLength;
        else this._tagLength = 128;
        if (this._tag = null, A.decrypt) {
            if (this._tag = fI.util.createBuffer(A.tag).getBytes(), this._tag.length !== this._tagLength / 8) throw new Error("Authentication tag does not match tag length.")
        }
        this._hashBlock = new Array(this._ints), this.tag = null, this._hashSubkey = new Array(this._ints), this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey), this.componentBits = 4, this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
        var Z = B.length();
        if (Z === 12) this._j0 = [B.getInt32(), B.getInt32(), B.getInt32(), 1];
        else {
            this._j0 = [0, 0, 0, 0];
            while (B.length() > 0) this._j0 = this.ghash(this._hashSubkey, this._j0, [B.getInt32(), B.getInt32(), B.getInt32(), B.getInt32()]);
            this._j0 = this.ghash(this._hashSubkey, this._j0, [0, 0].concat(gR0(Z * 8)))
        }
        this._inBlock = this._j0.slice(0), Jh1(this._inBlock), this._partialBytes = 0, Q = fI.util.createBuffer(Q), this._aDataLength = gR0(Q.length() * 8);
        var D = Q.length() % this.blockSize;
        if (D) Q.fillWithByte(0, this.blockSize - D);
        this._s = [0, 0, 0, 0];
        while (Q.length() > 0) this._s = this.ghash(this._hashSubkey, this._s, [Q.getInt32(), Q.getInt32(), Q.getInt32(), Q.getInt32()])
    };
    w6.gcm.prototype.encrypt = function(A, B, Q) {
        var Z = A.length();
        if (Z === 0) return !0;
        if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && Z >= this.blockSize) {
            for (var D = 0; D < this._ints; ++D) B.putInt32(this._outBlock[D] ^= A.getInt32());
            this._cipherLength += this.blockSize
        } else {
            var G = (this.blockSize - Z) % this.blockSize;
            if (G > 0) G = this.blockSize - G;
            this._partialOutput.clear();
            for (var D = 0; D < this._ints; ++D) this._partialOutput.putInt32(A.getInt32() ^ this._outBlock[D]);
            if (G <= 0 || Q) {
                if (Q) {
                    var F = Z % this.blockSize;
                    this._cipherLength += F, this._partialOutput.truncate(this.blockSize - F)
                } else this._cipherLength += this.blockSize;
                for (var D = 0; D < this._ints; ++D) this._outBlock[D] = this._partialOutput.getInt32();
                this._partialOutput.read -= this.blockSize
            }
            if (this._partialBytes > 0) this._partialOutput.getBytes(this._partialBytes);
            if (G > 0 && !Q) return A.read -= this.blockSize, B.putBytes(this._partialOutput.getBytes(G - this._partialBytes)), this._partialBytes = G, !0;
            B.putBytes(this._partialOutput.getBytes(Z - this._partialBytes)), this._partialBytes = 0
        }
        this._s = this.ghash(this._hashSubkey, this._s, this._outBlock), Jh1(this._inBlock)
    };
    w6.gcm.prototype.decrypt = function(A, B, Q) {
        var Z = A.length();
        if (Z < this.blockSize && !(Q && Z > 0)) return !0;
        this.cipher.encrypt(this._inBlock, this._outBlock), Jh1(this._inBlock), this._hashBlock[0] = A.getInt32(), this._hashBlock[1] = A.getInt32(), this._hashBlock[2] = A.getInt32(), this._hashBlock[3] = A.getInt32(), this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
        for (var D = 0; D < this._ints; ++D) B.putInt32(this._outBlock[D] ^ this._hashBlock[D]);
        if (Z < this.blockSize) this._cipherLength += Z % this.blockSize;
        else this._cipherLength += this.blockSize
    };
    w6.gcm.prototype.afterFinish = function(A, B) {
        var Q = !0;
        if (B.decrypt && B.overflow) A.truncate(this.blockSize - B.overflow);
        this.tag = fI.util.createBuffer();
        var Z = this._aDataLength.concat(gR0(this._cipherLength * 8));
        this._s = this.ghash(this._hashSubkey, this._s, Z);
        var D = [];
        this.cipher.encrypt(this._j0, D);
        for (var G = 0; G < this._ints; ++G) this.tag.putInt32(this._s[G] ^ D[G]);
        if (this.tag.truncate(this.tag.length() % (this._tagLength / 8)), B.decrypt && this.tag.bytes() !== this._tag) Q = !1;
        return Q
    };
    w6.gcm.prototype.multiply = function(A, B) {
        var Q = [0, 0, 0, 0],
            Z = B.slice(0);
        for (var D = 0; D < 128; ++D) {
            var G = A[D / 32 | 0] & 1 << 31 - D % 32;
            if (G) Q[0] ^= Z[0], Q[1] ^= Z[1], Q[2] ^= Z[2], Q[3] ^= Z[3];
            this.pow(Z, Z)
        }
        return Q
    };
    w6.gcm.prototype.pow = function(A, B) {
        var Q = A[3] & 1;
        for (var Z = 3; Z > 0; --Z) B[Z] = A[Z] >>> 1 | (A[Z - 1] & 1) << 31;
        if (B[0] = A[0] >>> 1, Q) B[0] ^= this._R
    };
    w6.gcm.prototype.tableMultiply = function(A) {
        var B = [0, 0, 0, 0];
        for (var Q = 0; Q < 32; ++Q) {
            var Z = Q / 8 | 0,
                D = A[Z] >>> (7 - Q % 8) * 4 & 15,
                G = this._m[Q][D];
            B[0] ^= G[0], B[1] ^= G[1], B[2] ^= G[2], B[3] ^= G[3]
        }
        return B
    };
    w6.gcm.prototype.ghash = function(A, B, Q) {
        return B[0] ^= Q[0], B[1] ^= Q[1], B[2] ^= Q[2], B[3] ^= Q[3], this.tableMultiply(B)
    };
    w6.gcm.prototype.generateHashTable = function(A, B) {
        var Q = 8 / B,
            Z = 4 * Q,
            D = 16 * Q,
            G = new Array(D);
        for (var F = 0; F < D; ++F) {
            var I = [0, 0, 0, 0],
                Y = F / Z | 0,
                W = (Z - 1 - F % Z) * B;
            I[Y] = 1 << B - 1 << W, G[F] = this.generateSubHashTable(this.multiply(I, A), B)
        }
        return G
    };
    w6.gcm.prototype.generateSubHashTable = function(A, B) {
        var Q = 1 << B,
            Z = Q >>> 1,
            D = new Array(Q);
        D[Z] = A.slice(0);
        var G = Z >>> 1;
        while (G > 0) this.pow(D[2 * G], D[G] = []), G >>= 1;
        G = 2;
        while (G < Z) {
            for (var F = 1; F < G; ++F) {
                var I = D[G],
                    Y = D[F];
                D[G + F] = [I[0] ^ Y[0], I[1] ^ Y[1], I[2] ^ Y[2], I[3] ^ Y[3]]
            }
            G *= 2
        }
        D[0] = [0, 0, 0, 0];
        for (G = Z + 1; G < Q; ++G) {
            var W = D[G ^ Z];
            D[G] = [A[0] ^ W[0], A[1] ^ W[1], A[2] ^ W[2], A[3] ^ W[3]]
        }
        return D
    };

    function Wh1(A, B) {
        if (typeof A === "string") A = fI.util.createBuffer(A);
        if (fI.util.isArray(A) && A.length > 4) {
            var Q = A;
            A = fI.util.createBuffer();
            for (var Z = 0; Z < Q.length; ++Z) A.putByte(Q[Z])
        }
        if (A.length() < B) throw new Error("Invalid IV length; got " + A.length() + " bytes and expected " + B + " bytes.");
        if (!fI.util.isArray(A)) {
            var D = [],
                G = B / 4;
            for (var Z = 0; Z < G; ++Z) D.push(A.getInt32());
            A = D
        }
        return A
    }

    function Jh1(A) {
        A[A.length - 1] = A[A.length - 1] + 1 & 4294967295
    }

    function gR0(A) {
        return [A / 4294967296 | 0, A & 4294967295]
    }
});