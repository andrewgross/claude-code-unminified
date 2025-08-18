/* chunk:380 bytes:[8972977, 8976132) size:3155 source:unpacked-cli.js */
var V5B = E((Rt5, X5B) => {
    var $j6 = "Expected a function",
        W5B = NaN,
        qj6 = "[object Symbol]",
        Nj6 = /^\s+|\s+$/g,
        Lj6 = /^[-+]0x[0-9a-f]+$/i,
        Mj6 = /^0b[01]+$/i,
        Rj6 = /^0o[0-7]+$/i,
        Oj6 = parseInt,
        Tj6 = typeof global == "object" && global && global.Object === Object && global,
        Pj6 = typeof self == "object" && self && self.Object === Object && self,
        Sj6 = Tj6 || Pj6 || Function("return this")(),
        jj6 = Object.prototype,
        kj6 = jj6.toString,
        yj6 = Math.max,
        _j6 = Math.min,
        qK0 = function() {
            return Sj6.Date.now()
        };

    function xj6(A, B, Q) {
        var Z, D, G, F, I, Y, W = 0,
            J = !1,
            X = !1,
            V = !0;
        if (typeof A != "function") throw new TypeError($j6);
        if (B = J5B(B) || 0, NK0(Q)) J = !!Q.leading, X = "maxWait" in Q, G = X ? yj6(J5B(Q.maxWait) || 0, B) : G, V = "trailing" in Q ? !!Q.trailing : V;

        function C(P) {
            var j = Z,
                f = D;
            return Z = D = void 0, W = P, F = A.apply(f, j), F
        }

        function K(P) {
            return W = P, I = setTimeout($, B), J ? C(P) : F
        }

        function H(P) {
            var j = P - Y,
                f = P - W,
                k = B - j;
            return X ? _j6(k, G - f) : k
        }

        function z(P) {
            var j = P - Y,
                f = P - W;
            return Y === void 0 || j >= B || j < 0 || X && f >= G
        }

        function $() {
            var P = qK0();
            if (z(P)) return L(P);
            I = setTimeout($, H(P))
        }

        function L(P) {
            if (I = void 0, V && Z) return C(P);
            return Z = D = void 0, F
        }

        function N() {
            if (I !== void 0) clearTimeout(I);
            W = 0, Z = Y = D = I = void 0
        }

        function R() {
            return I === void 0 ? F : L(qK0())
        }

        function O() {
            var P = qK0(),
                j = z(P);
            if (Z = arguments, D = this, Y = P, j) {
                if (I === void 0) return K(Y);
                if (X) return I = setTimeout($, B), C(Y)
            }
            if (I === void 0) I = setTimeout($, B);
            return F
        }
        return O.cancel = N, O.flush = R, O
    }

    function NK0(A) {
        var B = typeof A;
        return !!A && (B == "object" || B == "function")
    }

    function vj6(A) {
        return !!A && typeof A == "object"
    }

    function bj6(A) {
        return typeof A == "symbol" || vj6(A) && kj6.call(A) == qj6
    }

    function J5B(A) {
        if (typeof A == "number") return A;
        if (bj6(A)) return W5B;
        if (NK0(A)) {
            var B = typeof A.valueOf == "function" ? A.valueOf() : A;
            A = NK0(B) ? B + "" : B
        }
        if (typeof A != "string") return A === 0 ? A : +A;
        A = A.replace(Nj6, "");
        var Q = Mj6.test(A);
        return Q || Rj6.test(A) ? Oj6(A.slice(2), Q ? 2 : 8) : Lj6.test(A) ? W5B : +A
    }
    X5B.exports = xj6
});