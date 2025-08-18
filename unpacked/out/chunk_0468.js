/* chunk:468 bytes:[11260622, 11263099) size:2477 source:unpacked-cli.js */
var ZfB = E((lk3, QfB) => {
    var xR0 = {};
    QfB.exports = xR0;
    var BfB = {};
    xR0.encode = function(A, B, Q) {
        if (typeof B !== "string") throw new TypeError('"alphabet" must be a string.');
        if (Q !== void 0 && typeof Q !== "number") throw new TypeError('"maxline" must be a number.');
        var Z = "";
        if (!(A instanceof Uint8Array)) Z = nE8(A, B);
        else {
            var D = 0,
                G = B.length,
                F = B.charAt(0),
                I = [0];
            for (D = 0; D < A.length; ++D) {
                for (var Y = 0, W = A[D]; Y < I.length; ++Y) W += I[Y] << 8, I[Y] = W % G, W = W / G | 0;
                while (W > 0) I.push(W % G), W = W / G | 0
            }
            for (D = 0; A[D] === 0 && D < A.length - 1; ++D) Z += F;
            for (D = I.length - 1; D >= 0; --D) Z += B[I[D]]
        }
        if (Q) {
            var J = new RegExp(".{1," + Q + "}", "g");
            Z = Z.match(J).join(`\r
`)
        }
        return Z
    };
    xR0.decode = function(A, B) {
        if (typeof A !== "string") throw new TypeError('"input" must be a string.');
        if (typeof B !== "string") throw new TypeError('"alphabet" must be a string.');
        var Q = BfB[B];
        if (!Q) {
            Q = BfB[B] = [];
            for (var Z = 0; Z < B.length; ++Z) Q[B.charCodeAt(Z)] = Z
        }
        A = A.replace(/\s/g, "");
        var D = B.length,
            G = B.charAt(0),
            F = [0];
        for (var Z = 0; Z < A.length; Z++) {
            var I = Q[A.charCodeAt(Z)];
            if (I === void 0) return;
            for (var Y = 0, W = I; Y < F.length; ++Y) W += F[Y] * D, F[Y] = W & 255, W >>= 8;
            while (W > 0) F.push(W & 255), W >>= 8
        }
        for (var J = 0; A[J] === G && J < A.length - 1; ++J) F.push(0);
        if (typeof Buffer !== "undefined") return Buffer.from(F.reverse());
        return new Uint8Array(F.reverse())
    };

    function nE8(A, B) {
        var Q = 0,
            Z = B.length,
            D = B.charAt(0),
            G = [0];
        for (Q = 0; Q < A.length(); ++Q) {
            for (var F = 0, I = A.at(Q); F < G.length; ++F) I += G[F] << 8, G[F] = I % Z, I = I / Z | 0;
            while (I > 0) G.push(I % Z), I = I / Z | 0
        }
        var Y = "";
        for (Q = 0; A.at(Q) === 0 && Q < A.length() - 1; ++Q) Y += D;
        for (Q = G.length - 1; Q >= 0; --Q) Y += B[G[Q]];
        return Y
    }
});