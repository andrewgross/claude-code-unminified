/* chunk:469 bytes:[11263100, 11298410) size:35310 source:unpacked-cli.js */
var b8 = E((pk3, IfB) => {
    var DfB = j4(),
        GfB = ZfB(),
        T0 = IfB.exports = DfB.util = DfB.util || {};
    (function() {
        if (typeof process !== "undefined" && process.nextTick) {
            if (T0.nextTick = process.nextTick, typeof setImmediate === "function") T0.setImmediate = setImmediate;
            else T0.setImmediate = T0.nextTick;
            return
        }
        if (typeof setImmediate === "function") {
            T0.setImmediate = function() {
                return setImmediate.apply(void 0, arguments)
            }, T0.nextTick = function(I) {
                return setImmediate(I)
            };
            return
        }
        if (T0.setImmediate = function(I) {
                setTimeout(I, 0)
            }, typeof window !== "undefined" && typeof window.postMessage === "function") {
            let I = function(Y) {
                if (Y.source === window && Y.data === A) {
                    Y.stopPropagation();
                    var W = B.slice();
                    B.length = 0, W.forEach(function(J) {
                        J()
                    })
                }
            };
            var F = I,
                A = "forge.setImmediate",
                B = [];
            T0.setImmediate = function(Y) {
                if (B.push(Y), B.length === 1) window.postMessage(A, "*")
            }, window.addEventListener("message", I, !0)
        }
        if (typeof MutationObserver !== "undefined") {
            var Q = Date.now(),
                Z = !0,
                D = document.createElement("div"),
                B = [];
            new MutationObserver(function() {
                var Y = B.slice();
                B.length = 0, Y.forEach(function(W) {
                    W()
                })
            }).observe(D, {
                attributes: !0
            });
            var G = T0.setImmediate;
            T0.setImmediate = function(Y) {
                if (Date.now() - Q > 15) Q = Date.now(), G(Y);
                else if (B.push(Y), B.length === 1) D.setAttribute("a", Z = !Z)
            }
        }
        T0.nextTick = T0.setImmediate
    })();
    T0.isNodejs = typeof process !== "undefined" && process.versions && process.versions.node;
    T0.globalScope = function() {
        if (T0.isNodejs) return global;
        return typeof self === "undefined" ? window : self
    }();
    T0.isArray = Array.isArray || function(A) {
        return Object.prototype.toString.call(A) === "[object Array]"
    };
    T0.isArrayBuffer = function(A) {
        return typeof ArrayBuffer !== "undefined" && A instanceof ArrayBuffer
    };
    T0.isArrayBufferView = function(A) {
        return A && T0.isArrayBuffer(A.buffer) && A.byteLength !== void 0
    };

    function DI1(A) {
        if (!(A === 8 || A === 16 || A === 24 || A === 32)) throw new Error("Only 8, 16, 24, or 32 bits supported: " + A)
    }
    T0.ByteBuffer = vR0;

    function vR0(A) {
        if (this.data = "", this.read = 0, typeof A === "string") this.data = A;
        else if (T0.isArrayBuffer(A) || T0.isArrayBufferView(A))
            if (typeof Buffer !== "undefined" && A instanceof Buffer) this.data = A.toString("binary");
            else {
                var B = new Uint8Array(A);
                try {
                    this.data = String.fromCharCode.apply(null, B)
                } catch (Z) {
                    for (var Q = 0; Q < B.length; ++Q) this.putByte(B[Q])
                }
            }
        else if (A instanceof vR0 || typeof A === "object" && typeof A.data === "string" && typeof A.read === "number") this.data = A.data, this.read = A.read;
        this._constructedStringLength = 0
    }
    T0.ByteStringBuffer = vR0;
    var aE8 = 4096;
    T0.ByteStringBuffer.prototype._optimizeConstructedString = function(A) {
        if (this._constructedStringLength += A, this._constructedStringLength > aE8) this.data.substr(0, 1), this._constructedStringLength = 0
    };
    T0.ByteStringBuffer.prototype.length = function() {
        return this.data.length - this.read
    };
    T0.ByteStringBuffer.prototype.isEmpty = function() {
        return this.length() <= 0
    };
    T0.ByteStringBuffer.prototype.putByte = function(A) {
        return this.putBytes(String.fromCharCode(A))
    };
    T0.ByteStringBuffer.prototype.fillWithByte = function(A, B) {
        A = String.fromCharCode(A);
        var Q = this.data;
        while (B > 0) {
            if (B & 1) Q += A;
            if (B >>>= 1, B > 0) A += A
        }
        return this.data = Q, this._optimizeConstructedString(B), this
    };
    T0.ByteStringBuffer.prototype.putBytes = function(A) {
        return this.data += A, this._optimizeConstructedString(A.length), this
    };
    T0.ByteStringBuffer.prototype.putString = function(A) {
        return this.putBytes(T0.encodeUtf8(A))
    };
    T0.ByteStringBuffer.prototype.putInt16 = function(A) {
        return this.putBytes(String.fromCharCode(A >> 8 & 255) + String.fromCharCode(A & 255))
    };
    T0.ByteStringBuffer.prototype.putInt24 = function(A) {
        return this.putBytes(String.fromCharCode(A >> 16 & 255) + String.fromCharCode(A >> 8 & 255) + String.fromCharCode(A & 255))
    };
    T0.ByteStringBuffer.prototype.putInt32 = function(A) {
        return this.putBytes(String.fromCharCode(A >> 24 & 255) + String.fromCharCode(A >> 16 & 255) + String.fromCharCode(A >> 8 & 255) + String.fromCharCode(A & 255))
    };
    T0.ByteStringBuffer.prototype.putInt16Le = function(A) {
        return this.putBytes(String.fromCharCode(A & 255) + String.fromCharCode(A >> 8 & 255))
    };
    T0.ByteStringBuffer.prototype.putInt24Le = function(A) {
        return this.putBytes(String.fromCharCode(A & 255) + String.fromCharCode(A >> 8 & 255) + String.fromCharCode(A >> 16 & 255))
    };
    T0.ByteStringBuffer.prototype.putInt32Le = function(A) {
        return this.putBytes(String.fromCharCode(A & 255) + String.fromCharCode(A >> 8 & 255) + String.fromCharCode(A >> 16 & 255) + String.fromCharCode(A >> 24 & 255))
    };
    T0.ByteStringBuffer.prototype.putInt = function(A, B) {
        DI1(B);
        var Q = "";
        do B -= 8, Q += String.fromCharCode(A >> B & 255); while (B > 0);
        return this.putBytes(Q)
    };
    T0.ByteStringBuffer.prototype.putSignedInt = function(A, B) {
        if (A < 0) A += 2 << B - 1;
        return this.putInt(A, B)
    };
    T0.ByteStringBuffer.prototype.putBuffer = function(A) {
        return this.putBytes(A.getBytes())
    };
    T0.ByteStringBuffer.prototype.getByte = function() {
        return this.data.charCodeAt(this.read++)
    };
    T0.ByteStringBuffer.prototype.getInt16 = function() {
        var A = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
        return this.read += 2, A
    };
    T0.ByteStringBuffer.prototype.getInt24 = function() {
        var A = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
        return this.read += 3, A
    };
    T0.ByteStringBuffer.prototype.getInt32 = function() {
        var A = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
        return this.read += 4, A
    };
    T0.ByteStringBuffer.prototype.getInt16Le = function() {
        var A = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
        return this.read += 2, A
    };
    T0.ByteStringBuffer.prototype.getInt24Le = function() {
        var A = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
        return this.read += 3, A
    };
    T0.ByteStringBuffer.prototype.getInt32Le = function() {
        var A = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
        return this.read += 4, A
    };
    T0.ByteStringBuffer.prototype.getInt = function(A) {
        DI1(A);
        var B = 0;
        do B = (B << 8) + this.data.charCodeAt(this.read++), A -= 8; while (A > 0);
        return B
    };
    T0.ByteStringBuffer.prototype.getSignedInt = function(A) {
        var B = this.getInt(A),
            Q = 2 << A - 2;
        if (B >= Q) B -= Q << 1;
        return B
    };
    T0.ByteStringBuffer.prototype.getBytes = function(A) {
        var B;
        if (A) A = Math.min(this.length(), A), B = this.data.slice(this.read, this.read + A), this.read += A;
        else if (A === 0) B = "";
        else B = this.read === 0 ? this.data : this.data.slice(this.read), this.clear();
        return B
    };
    T0.ByteStringBuffer.prototype.bytes = function(A) {
        return typeof A === "undefined" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + A)
    };
    T0.ByteStringBuffer.prototype.at = function(A) {
        return this.data.charCodeAt(this.read + A)
    };
    T0.ByteStringBuffer.prototype.setAt = function(A, B) {
        return this.data = this.data.substr(0, this.read + A) + String.fromCharCode(B) + this.data.substr(this.read + A + 1), this
    };
    T0.ByteStringBuffer.prototype.last = function() {
        return this.data.charCodeAt(this.data.length - 1)
    };
    T0.ByteStringBuffer.prototype.copy = function() {
        var A = T0.createBuffer(this.data);
        return A.read = this.read, A
    };
    T0.ByteStringBuffer.prototype.compact = function() {
        if (this.read > 0) this.data = this.data.slice(this.read), this.read = 0;
        return this
    };
    T0.ByteStringBuffer.prototype.clear = function() {
        return this.data = "", this.read = 0, this
    };
    T0.ByteStringBuffer.prototype.truncate = function(A) {
        var B = Math.max(0, this.length() - A);
        return this.data = this.data.substr(this.read, B), this.read = 0, this
    };
    T0.ByteStringBuffer.prototype.toHex = function() {
        var A = "";
        for (var B = this.read; B < this.data.length; ++B) {
            var Q = this.data.charCodeAt(B);
            if (Q < 16) A += "0";
            A += Q.toString(16)
        }
        return A
    };
    T0.ByteStringBuffer.prototype.toString = function() {
        return T0.decodeUtf8(this.bytes())
    };

    function sE8(A, B) {
        B = B || {}, this.read = B.readOffset || 0, this.growSize = B.growSize || 1024;
        var Q = T0.isArrayBuffer(A),
            Z = T0.isArrayBufferView(A);
        if (Q || Z) {
            if (Q) this.data = new DataView(A);
            else this.data = new DataView(A.buffer, A.byteOffset, A.byteLength);
            this.write = "writeOffset" in B ? B.writeOffset : this.data.byteLength;
            return
        }
        if (this.data = new DataView(new ArrayBuffer(0)), this.write = 0, A !== null && A !== void 0) this.putBytes(A);
        if ("writeOffset" in B) this.write = B.writeOffset
    }
    T0.DataBuffer = sE8;
    T0.DataBuffer.prototype.length = function() {
        return this.write - this.read
    };
    T0.DataBuffer.prototype.isEmpty = function() {
        return this.length() <= 0
    };
    T0.DataBuffer.prototype.accommodate = function(A, B) {
        if (this.length() >= A) return this;
        B = Math.max(B || this.growSize, A);
        var Q = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.byteLength),
            Z = new Uint8Array(this.length() + B);
        return Z.set(Q), this.data = new DataView(Z.buffer), this
    };
    T0.DataBuffer.prototype.putByte = function(A) {
        return this.accommodate(1), this.data.setUint8(this.write++, A), this
    };
    T0.DataBuffer.prototype.fillWithByte = function(A, B) {
        this.accommodate(B);
        for (var Q = 0; Q < B; ++Q) this.data.setUint8(A);
        return this
    };
    T0.DataBuffer.prototype.putBytes = function(A, B) {
        if (T0.isArrayBufferView(A)) {
            var Q = new Uint8Array(A.buffer, A.byteOffset, A.byteLength),
                Z = Q.byteLength - Q.byteOffset;
            this.accommodate(Z);
            var D = new Uint8Array(this.data.buffer, this.write);
            return D.set(Q), this.write += Z, this
        }
        if (T0.isArrayBuffer(A)) {
            var Q = new Uint8Array(A);
            this.accommodate(Q.byteLength);
            var D = new Uint8Array(this.data.buffer);
            return D.set(Q, this.write), this.write += Q.byteLength, this
        }
        if (A instanceof T0.DataBuffer || typeof A === "object" && typeof A.read === "number" && typeof A.write === "number" && T0.isArrayBufferView(A.data)) {
            var Q = new Uint8Array(A.data.byteLength, A.read, A.length());
            this.accommodate(Q.byteLength);
            var D = new Uint8Array(A.data.byteLength, this.write);
            return D.set(Q), this.write += Q.byteLength, this
        }
        if (A instanceof T0.ByteStringBuffer) A = A.data, B = "binary";
        if (B = B || "binary", typeof A === "string") {
            var G;
            if (B === "hex") return this.accommodate(Math.ceil(A.length / 2)), G = new Uint8Array(this.data.buffer, this.write), this.write += T0.binary.hex.decode(A, G, this.write), this;
            if (B === "base64") return this.accommodate(Math.ceil(A.length / 4) * 3), G = new Uint8Array(this.data.buffer, this.write), this.write += T0.binary.base64.decode(A, G, this.write), this;
            if (B === "utf8") A = T0.encodeUtf8(A), B = "binary";
            if (B === "binary" || B === "raw") return this.accommodate(A.length), G = new Uint8Array(this.data.buffer, this.write), this.write += T0.binary.raw.decode(G), this;
            if (B === "utf16") return this.accommodate(A.length * 2), G = new Uint16Array(this.data.buffer, this.write), this.write += T0.text.utf16.encode(G), this;
            throw new Error("Invalid encoding: " + B)
        }
        throw Error("Invalid parameter: " + A)
    };
    T0.DataBuffer.prototype.putBuffer = function(A) {
        return this.putBytes(A), A.clear(), this
    };
    T0.DataBuffer.prototype.putString = function(A) {
        return this.putBytes(A, "utf16")
    };
    T0.DataBuffer.prototype.putInt16 = function(A) {
        return this.accommodate(2), this.data.setInt16(this.write, A), this.write += 2, this
    };
    T0.DataBuffer.prototype.putInt24 = function(A) {
        return this.accommodate(3), this.data.setInt16(this.write, A >> 8 & 65535), this.data.setInt8(this.write, A >> 16 & 255), this.write += 3, this
    };
    T0.DataBuffer.prototype.putInt32 = function(A) {
        return this.accommodate(4), this.data.setInt32(this.write, A), this.write += 4, this
    };
    T0.DataBuffer.prototype.putInt16Le = function(A) {
        return this.accommodate(2), this.data.setInt16(this.write, A, !0), this.write += 2, this
    };
    T0.DataBuffer.prototype.putInt24Le = function(A) {
        return this.accommodate(3), this.data.setInt8(this.write, A >> 16 & 255), this.data.setInt16(this.write, A >> 8 & 65535, !0), this.write += 3, this
    };
    T0.DataBuffer.prototype.putInt32Le = function(A) {
        return this.accommodate(4), this.data.setInt32(this.write, A, !0), this.write += 4, this
    };
    T0.DataBuffer.prototype.putInt = function(A, B) {
        DI1(B), this.accommodate(B / 8);
        do B -= 8, this.data.setInt8(this.write++, A >> B & 255); while (B > 0);
        return this
    };
    T0.DataBuffer.prototype.putSignedInt = function(A, B) {
        if (DI1(B), this.accommodate(B / 8), A < 0) A += 2 << B - 1;
        return this.putInt(A, B)
    };
    T0.DataBuffer.prototype.getByte = function() {
        return this.data.getInt8(this.read++)
    };
    T0.DataBuffer.prototype.getInt16 = function() {
        var A = this.data.getInt16(this.read);
        return this.read += 2, A
    };
    T0.DataBuffer.prototype.getInt24 = function() {
        var A = this.data.getInt16(this.read) << 8 ^ this.data.getInt8(this.read + 2);
        return this.read += 3, A
    };
    T0.DataBuffer.prototype.getInt32 = function() {
        var A = this.data.getInt32(this.read);
        return this.read += 4, A
    };
    T0.DataBuffer.prototype.getInt16Le = function() {
        var A = this.data.getInt16(this.read, !0);
        return this.read += 2, A
    };
    T0.DataBuffer.prototype.getInt24Le = function() {
        var A = this.data.getInt8(this.read) ^ this.data.getInt16(this.read + 1, !0) << 8;
        return this.read += 3, A
    };
    T0.DataBuffer.prototype.getInt32Le = function() {
        var A = this.data.getInt32(this.read, !0);
        return this.read += 4, A
    };
    T0.DataBuffer.prototype.getInt = function(A) {
        DI1(A);
        var B = 0;
        do B = (B << 8) + this.data.getInt8(this.read++), A -= 8; while (A > 0);
        return B
    };
    T0.DataBuffer.prototype.getSignedInt = function(A) {
        var B = this.getInt(A),
            Q = 2 << A - 2;
        if (B >= Q) B -= Q << 1;
        return B
    };
    T0.DataBuffer.prototype.getBytes = function(A) {
        var B;
        if (A) A = Math.min(this.length(), A), B = this.data.slice(this.read, this.read + A), this.read += A;
        else if (A === 0) B = "";
        else B = this.read === 0 ? this.data : this.data.slice(this.read), this.clear();
        return B
    };
    T0.DataBuffer.prototype.bytes = function(A) {
        return typeof A === "undefined" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + A)
    };
    T0.DataBuffer.prototype.at = function(A) {
        return this.data.getUint8(this.read + A)
    };
    T0.DataBuffer.prototype.setAt = function(A, B) {
        return this.data.setUint8(A, B), this
    };
    T0.DataBuffer.prototype.last = function() {
        return this.data.getUint8(this.write - 1)
    };
    T0.DataBuffer.prototype.copy = function() {
        return new T0.DataBuffer(this)
    };
    T0.DataBuffer.prototype.compact = function() {
        if (this.read > 0) {
            var A = new Uint8Array(this.data.buffer, this.read),
                B = new Uint8Array(A.byteLength);
            B.set(A), this.data = new DataView(B), this.write -= this.read, this.read = 0
        }
        return this
    };
    T0.DataBuffer.prototype.clear = function() {
        return this.data = new DataView(new ArrayBuffer(0)), this.read = this.write = 0, this
    };
    T0.DataBuffer.prototype.truncate = function(A) {
        return this.write = Math.max(0, this.length() - A), this.read = Math.min(this.read, this.write), this
    };
    T0.DataBuffer.prototype.toHex = function() {
        var A = "";
        for (var B = this.read; B < this.data.byteLength; ++B) {
            var Q = this.data.getUint8(B);
            if (Q < 16) A += "0";
            A += Q.toString(16)
        }
        return A
    };
    T0.DataBuffer.prototype.toString = function(A) {
        var B = new Uint8Array(this.data, this.read, this.length());
        if (A = A || "utf8", A === "binary" || A === "raw") return T0.binary.raw.encode(B);
        if (A === "hex") return T0.binary.hex.encode(B);
        if (A === "base64") return T0.binary.base64.encode(B);
        if (A === "utf8") return T0.text.utf8.decode(B);
        if (A === "utf16") return T0.text.utf16.decode(B);
        throw new Error("Invalid encoding: " + A)
    };
    T0.createBuffer = function(A, B) {
        if (B = B || "raw", A !== void 0 && B === "utf8") A = T0.encodeUtf8(A);
        return new T0.ByteBuffer(A)
    };
    T0.fillString = function(A, B) {
        var Q = "";
        while (B > 0) {
            if (B & 1) Q += A;
            if (B >>>= 1, B > 0) A += A
        }
        return Q
    };
    T0.xorBytes = function(A, B, Q) {
        var Z = "",
            D = "",
            G = "",
            F = 0,
            I = 0;
        for (; Q > 0; --Q, ++F) {
            if (D = A.charCodeAt(F) ^ B.charCodeAt(F), I >= 10) Z += G, G = "", I = 0;
            G += String.fromCharCode(D), ++I
        }
        return Z += G, Z
    };
    T0.hexToBytes = function(A) {
        var B = "",
            Q = 0;
        if (A.length & !0) Q = 1, B += String.fromCharCode(parseInt(A[0], 16));
        for (; Q < A.length; Q += 2) B += String.fromCharCode(parseInt(A.substr(Q, 2), 16));
        return B
    };
    T0.bytesToHex = function(A) {
        return T0.createBuffer(A).toHex()
    };
    T0.int32ToBytes = function(A) {
        return String.fromCharCode(A >> 24 & 255) + String.fromCharCode(A >> 16 & 255) + String.fromCharCode(A >> 8 & 255) + String.fromCharCode(A & 255)
    };
    var Db = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        Gb = [62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 64, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
        FfB = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    T0.encode64 = function(A, B) {
        var Q = "",
            Z = "",
            D, G, F, I = 0;
        while (I < A.length) {
            if (D = A.charCodeAt(I++), G = A.charCodeAt(I++), F = A.charCodeAt(I++), Q += Db.charAt(D >> 2), Q += Db.charAt((D & 3) << 4 | G >> 4), isNaN(G)) Q += "==";
            else Q += Db.charAt((G & 15) << 2 | F >> 6), Q += isNaN(F) ? "=" : Db.charAt(F & 63);
            if (B && Q.length > B) Z += Q.substr(0, B) + `\r
`, Q = Q.substr(B)
        }
        return Z += Q, Z
    };
    T0.decode64 = function(A) {
        A = A.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        var B = "",
            Q, Z, D, G, F = 0;
        while (F < A.length)
            if (Q = Gb[A.charCodeAt(F++) - 43], Z = Gb[A.charCodeAt(F++) - 43], D = Gb[A.charCodeAt(F++) - 43], G = Gb[A.charCodeAt(F++) - 43], B += String.fromCharCode(Q << 2 | Z >> 4), D !== 64) {
                if (B += String.fromCharCode((Z & 15) << 4 | D >> 2), G !== 64) B += String.fromCharCode((D & 3) << 6 | G)
            } return B
    };
    T0.encodeUtf8 = function(A) {
        return unescape(encodeURIComponent(A))
    };
    T0.decodeUtf8 = function(A) {
        return decodeURIComponent(escape(A))
    };
    T0.binary = {
        raw: {},
        hex: {},
        base64: {},
        base58: {},
        baseN: {
            encode: GfB.encode,
            decode: GfB.decode
        }
    };
    T0.binary.raw.encode = function(A) {
        return String.fromCharCode.apply(null, A)
    };
    T0.binary.raw.decode = function(A, B, Q) {
        var Z = B;
        if (!Z) Z = new Uint8Array(A.length);
        Q = Q || 0;
        var D = Q;
        for (var G = 0; G < A.length; ++G) Z[D++] = A.charCodeAt(G);
        return B ? D - Q : Z
    };
    T0.binary.hex.encode = T0.bytesToHex;
    T0.binary.hex.decode = function(A, B, Q) {
        var Z = B;
        if (!Z) Z = new Uint8Array(Math.ceil(A.length / 2));
        Q = Q || 0;
        var D = 0,
            G = Q;
        if (A.length & 1) D = 1, Z[G++] = parseInt(A[0], 16);
        for (; D < A.length; D += 2) Z[G++] = parseInt(A.substr(D, 2), 16);
        return B ? G - Q : Z
    };
    T0.binary.base64.encode = function(A, B) {
        var Q = "",
            Z = "",
            D, G, F, I = 0;
        while (I < A.byteLength) {
            if (D = A[I++], G = A[I++], F = A[I++], Q += Db.charAt(D >> 2), Q += Db.charAt((D & 3) << 4 | G >> 4), isNaN(G)) Q += "==";
            else Q += Db.charAt((G & 15) << 2 | F >> 6), Q += isNaN(F) ? "=" : Db.charAt(F & 63);
            if (B && Q.length > B) Z += Q.substr(0, B) + `\r
`, Q = Q.substr(B)
        }
        return Z += Q, Z
    };
    T0.binary.base64.decode = function(A, B, Q) {
        var Z = B;
        if (!Z) Z = new Uint8Array(Math.ceil(A.length / 4) * 3);
        A = A.replace(/[^A-Za-z0-9\+\/\=]/g, ""), Q = Q || 0;
        var D, G, F, I, Y = 0,
            W = Q;
        while (Y < A.length)
            if (D = Gb[A.charCodeAt(Y++) - 43], G = Gb[A.charCodeAt(Y++) - 43], F = Gb[A.charCodeAt(Y++) - 43], I = Gb[A.charCodeAt(Y++) - 43], Z[W++] = D << 2 | G >> 4, F !== 64) {
                if (Z[W++] = (G & 15) << 4 | F >> 2, I !== 64) Z[W++] = (F & 3) << 6 | I
            } return B ? W - Q : Z.subarray(0, W)
    };
    T0.binary.base58.encode = function(A, B) {
        return T0.binary.baseN.encode(A, FfB, B)
    };
    T0.binary.base58.decode = function(A, B) {
        return T0.binary.baseN.decode(A, FfB, B)
    };
    T0.text = {
        utf8: {},
        utf16: {}
    };
    T0.text.utf8.encode = function(A, B, Q) {
        A = T0.encodeUtf8(A);
        var Z = B;
        if (!Z) Z = new Uint8Array(A.length);
        Q = Q || 0;
        var D = Q;
        for (var G = 0; G < A.length; ++G) Z[D++] = A.charCodeAt(G);
        return B ? D - Q : Z
    };
    T0.text.utf8.decode = function(A) {
        return T0.decodeUtf8(String.fromCharCode.apply(null, A))
    };
    T0.text.utf16.encode = function(A, B, Q) {
        var Z = B;
        if (!Z) Z = new Uint8Array(A.length * 2);
        var D = new Uint16Array(Z.buffer);
        Q = Q || 0;
        var G = Q,
            F = Q;
        for (var I = 0; I < A.length; ++I) D[F++] = A.charCodeAt(I), G += 2;
        return B ? G - Q : Z
    };
    T0.text.utf16.decode = function(A) {
        return String.fromCharCode.apply(null, new Uint16Array(A.buffer))
    };
    T0.deflate = function(A, B, Q) {
        if (B = T0.decode64(A.deflate(T0.encode64(B)).rval), Q) {
            var Z = 2,
                D = B.charCodeAt(1);
            if (D & 32) Z = 6;
            B = B.substring(Z, B.length - 4)
        }
        return B
    };
    T0.inflate = function(A, B, Q) {
        var Z = A.inflate(T0.encode64(B)).rval;
        return Z === null ? null : T0.decode64(Z)
    };
    var bR0 = function(A, B, Q) {
            if (!A) throw new Error("WebStorage not available.");
            var Z;
            if (Q === null) Z = A.removeItem(B);
            else Q = T0.encode64(JSON.stringify(Q)), Z = A.setItem(B, Q);
            if (typeof Z !== "undefined" && Z.rval !== !0) {
                var D = new Error(Z.error.message);
                throw D.id = Z.error.id, D.name = Z.error.name, D
            }
        },
        fR0 = function(A, B) {
            if (!A) throw new Error("WebStorage not available.");
            var Q = A.getItem(B);
            if (A.init)
                if (Q.rval === null) {
                    if (Q.error) {
                        var Z = new Error(Q.error.message);
                        throw Z.id = Q.error.id, Z.name = Q.error.name, Z
                    }
                    Q = null
                } else Q = Q.rval;
            if (Q !== null) Q = JSON.parse(T0.decode64(Q));
            return Q
        },
        rE8 = function(A, B, Q, Z) {
            var D = fR0(A, B);
            if (D === null) D = {};
            D[Q] = Z, bR0(A, B, D)
        },
        oE8 = function(A, B, Q) {
            var Z = fR0(A, B);
            if (Z !== null) Z = Q in Z ? Z[Q] : null;
            return Z
        },
        tE8 = function(A, B, Q) {
            var Z = fR0(A, B);
            if (Z !== null && Q in Z) {
                delete Z[Q];
                var D = !0;
                for (var G in Z) {
                    D = !1;
                    break
                }
                if (D) Z = null;
                bR0(A, B, Z)
            }
        },
        eE8 = function(A, B) {
            bR0(A, B, null)
        },
        Ih1 = function(A, B, Q) {
            var Z = null;
            if (typeof Q === "undefined") Q = ["web", "flash"];
            var D, G = !1,
                F = null;
            for (var I in Q) {
                D = Q[I];
                try {
                    if (D === "flash" || D === "both") {
                        if (B[0] === null) throw new Error("Flash local storage not available.");
                        Z = A.apply(this, B), G = D === "flash"
                    }
                    if (D === "web" || D === "both") B[0] = localStorage, Z = A.apply(this, B), G = !0
                } catch (Y) {
                    F = Y
                }
                if (G) break
            }
            if (!G) throw F;
            return Z
        };
    T0.setItem = function(A, B, Q, Z, D) {
        Ih1(rE8, arguments, D)
    };
    T0.getItem = function(A, B, Q, Z) {
        return Ih1(oE8, arguments, Z)
    };
    T0.removeItem = function(A, B, Q, Z) {
        Ih1(tE8, arguments, Z)
    };
    T0.clearItems = function(A, B, Q) {
        Ih1(eE8, arguments, Q)
    };
    T0.isEmpty = function(A) {
        for (var B in A)
            if (A.hasOwnProperty(B)) return !1;
        return !0
    };
    T0.format = function(A) {
        var B = /%./g,
            Q, Z, D = 0,
            G = [],
            F = 0;
        while (Q = B.exec(A)) {
            if (Z = A.substring(F, B.lastIndex - 2), Z.length > 0) G.push(Z);
            F = B.lastIndex;
            var I = Q[0][1];
            switch (I) {
                case "s":
                case "o":
                    if (D < arguments.length) G.push(arguments[D++ + 1]);
                    else G.push("<?>");
                    break;
                case "%":
                    G.push("%");
                    break;
                default:
                    G.push("<%" + I + "?>")
            }
        }
        return G.push(A.substring(F)), G.join("")
    };
    T0.formatNumber = function(A, B, Q, Z) {
        var D = A,
            G = isNaN(B = Math.abs(B)) ? 2 : B,
            F = Q === void 0 ? "," : Q,
            I = Z === void 0 ? "." : Z,
            Y = D < 0 ? "-" : "",
            W = parseInt(D = Math.abs(+D || 0).toFixed(G), 10) + "",
            J = W.length > 3 ? W.length % 3 : 0;
        return Y + (J ? W.substr(0, J) + I : "") + W.substr(J).replace(/(\d{3})(?=\d)/g, "$1" + I) + (G ? F + Math.abs(D - W).toFixed(G).slice(2) : "")
    };
    T0.formatSize = function(A) {
        if (A >= 1073741824) A = T0.formatNumber(A / 1073741824, 2, ".", "") + " GiB";
        else if (A >= 1048576) A = T0.formatNumber(A / 1048576, 2, ".", "") + " MiB";
        else if (A >= 1024) A = T0.formatNumber(A / 1024, 0) + " KiB";
        else A = T0.formatNumber(A, 0) + " bytes";
        return A
    };
    T0.bytesFromIP = function(A) {
        if (A.indexOf(".") !== -1) return T0.bytesFromIPv4(A);
        if (A.indexOf(":") !== -1) return T0.bytesFromIPv6(A);
        return null
    };
    T0.bytesFromIPv4 = function(A) {
        if (A = A.split("."), A.length !== 4) return null;
        var B = T0.createBuffer();
        for (var Q = 0; Q < A.length; ++Q) {
            var Z = parseInt(A[Q], 10);
            if (isNaN(Z)) return null;
            B.putByte(Z)
        }
        return B.getBytes()
    };
    T0.bytesFromIPv6 = function(A) {
        var B = 0;
        A = A.split(":").filter(function(F) {
            if (F.length === 0) ++B;
            return !0
        });
        var Q = (8 - A.length + B) * 2,
            Z = T0.createBuffer();
        for (var D = 0; D < 8; ++D) {
            if (!A[D] || A[D].length === 0) {
                Z.fillWithByte(0, Q), Q = 0;
                continue
            }
            var G = T0.hexToBytes(A[D]);
            if (G.length < 2) Z.putByte(0);
            Z.putBytes(G)
        }
        return Z.getBytes()
    };
    T0.bytesToIP = function(A) {
        if (A.length === 4) return T0.bytesToIPv4(A);
        if (A.length === 16) return T0.bytesToIPv6(A);
        return null
    };
    T0.bytesToIPv4 = function(A) {
        if (A.length !== 4) return null;
        var B = [];
        for (var Q = 0; Q < A.length; ++Q) B.push(A.charCodeAt(Q));
        return B.join(".")
    };
    T0.bytesToIPv6 = function(A) {
        if (A.length !== 16) return null;
        var B = [],
            Q = [],
            Z = 0;
        for (var D = 0; D < A.length; D += 2) {
            var G = T0.bytesToHex(A[D] + A[D + 1]);
            while (G[0] === "0" && G !== "0") G = G.substr(1);
            if (G === "0") {
                var F = Q[Q.length - 1],
                    I = B.length;
                if (!F || I !== F.end + 1) Q.push({
                    start: I,
                    end: I
                });
                else if (F.end = I, F.end - F.start > Q[Z].end - Q[Z].start) Z = Q.length - 1
            }
            B.push(G)
        }
        if (Q.length > 0) {
            var Y = Q[Z];
            if (Y.end - Y.start > 0) {
                if (B.splice(Y.start, Y.end - Y.start + 1, ""), Y.start === 0) B.unshift("");
                if (Y.end === 7) B.push("")
            }
        }
        return B.join(":")
    };
    T0.estimateCores = function(A, B) {
        if (typeof A === "function") B = A, A = {};
        if (A = A || {}, "cores" in T0 && !A.update) return B(null, T0.cores);
        if (typeof navigator !== "undefined" && "hardwareConcurrency" in navigator && navigator.hardwareConcurrency > 0) return T0.cores = navigator.hardwareConcurrency, B(null, T0.cores);
        if (typeof Worker === "undefined") return T0.cores = 1, B(null, T0.cores);
        if (typeof Blob === "undefined") return T0.cores = 2, B(null, T0.cores);
        var Q = URL.createObjectURL(new Blob(["(", function() {
            self.addEventListener("message", function(F) {
                var I = Date.now(),
                    Y = I + 4;
                while (Date.now() < Y);
                self.postMessage({
                    st: I,
                    et: Y
                })
            })
        }.toString(), ")()"], {
            type: "application/javascript"
        }));
        Z([], 5, 16);

        function Z(F, I, Y) {
            if (I === 0) {
                var W = Math.floor(F.reduce(function(J, X) {
                    return J + X
                }, 0) / F.length);
                return T0.cores = Math.max(1, W), URL.revokeObjectURL(Q), B(null, T0.cores)
            }
            D(Y, function(J, X) {
                F.push(G(Y, X)), Z(F, I - 1, Y)
            })
        }

        function D(F, I) {
            var Y = [],
                W = [];
            for (var J = 0; J < F; ++J) {
                var X = new Worker(Q);
                X.addEventListener("message", function(V) {
                    if (W.push(V.data), W.length === F) {
                        for (var C = 0; C < F; ++C) Y[C].terminate();
                        I(null, W)
                    }
                }), Y.push(X)
            }
            for (var J = 0; J < F; ++J) Y[J].postMessage(J)
        }

        function G(F, I) {
            var Y = [];
            for (var W = 0; W < F; ++W) {
                var J = I[W],
                    X = Y[W] = [];
                for (var V = 0; V < F; ++V) {
                    if (W === V) continue;
                    var C = I[V];
                    if (J.st > C.st && J.st < C.et || C.st > J.st && C.st < J.et) X.push(V)
                }
            }
            return Y.reduce(function(K, H) {
                return Math.max(K, H.length)
            }, 0)
        }
    }
});