/* chunk:470 bytes:[11298411, 11301222) size:2811 source:unpacked-cli.js */
var Yh1 = E((ik3, YfB) => {
    var bI = j4();
    b8();
    YfB.exports = bI.cipher = bI.cipher || {};
    bI.cipher.algorithms = bI.cipher.algorithms || {};
    bI.cipher.createCipher = function(A, B) {
        var Q = A;
        if (typeof Q === "string") {
            if (Q = bI.cipher.getAlgorithm(Q), Q) Q = Q()
        }
        if (!Q) throw new Error("Unsupported algorithm: " + A);
        return new bI.cipher.BlockCipher({
            algorithm: Q,
            key: B,
            decrypt: !1
        })
    };
    bI.cipher.createDecipher = function(A, B) {
        var Q = A;
        if (typeof Q === "string") {
            if (Q = bI.cipher.getAlgorithm(Q), Q) Q = Q()
        }
        if (!Q) throw new Error("Unsupported algorithm: " + A);
        return new bI.cipher.BlockCipher({
            algorithm: Q,
            key: B,
            decrypt: !0
        })
    };
    bI.cipher.registerAlgorithm = function(A, B) {
        A = A.toUpperCase(), bI.cipher.algorithms[A] = B
    };
    bI.cipher.getAlgorithm = function(A) {
        if (A = A.toUpperCase(), A in bI.cipher.algorithms) return bI.cipher.algorithms[A];
        return null
    };
    var hR0 = bI.cipher.BlockCipher = function(A) {
        this.algorithm = A.algorithm, this.mode = this.algorithm.mode, this.blockSize = this.mode.blockSize, this._finish = !1, this._input = null, this.output = null, this._op = A.decrypt ? this.mode.decrypt : this.mode.encrypt, this._decrypt = A.decrypt, this.algorithm.initialize(A)
    };
    hR0.prototype.start = function(A) {
        A = A || {};
        var B = {};
        for (var Q in A) B[Q] = A[Q];
        B.decrypt = this._decrypt, this._finish = !1, this._input = bI.util.createBuffer(), this.output = A.output || bI.util.createBuffer(), this.mode.start(B)
    };
    hR0.prototype.update = function(A) {
        if (A) this._input.putBuffer(A);
        while (!this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish);
        this._input.compact()
    };
    hR0.prototype.finish = function(A) {
        if (A && (this.mode.name === "ECB" || this.mode.name === "CBC")) this.mode.pad = function(Q) {
            return A(this.blockSize, Q, !1)
        }, this.mode.unpad = function(Q) {
            return A(this.blockSize, Q, !0)
        };
        var B = {};
        if (B.decrypt = this._decrypt, B.overflow = this._input.length() % this.blockSize, !this._decrypt && this.mode.pad) {
            if (!this.mode.pad(this._input, B)) return !1
        }
        if (this._finish = !0, this.update(), this._decrypt && this.mode.unpad) {
            if (!this.mode.unpad(this.output, B)) return !1
        }
        if (this.mode.afterFinish) {
            if (!this.mode.afterFinish(this.output, B)) return !1
        }
        return !0
    }
});