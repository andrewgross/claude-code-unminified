/* chunk:415 bytes:[9687791, 9692895) size:5104 source:unpacked-cli.js */
var nEB = E((p63, iEB) => {
    var ue6 = /^xn--/,
        me6 = /[^\0-\x7F]/,
        de6 = /[\x2E\u3002\uFF0E\uFF61]/g,
        ce6 = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
        },
        gM = Math.floor,
        gU0 = String.fromCharCode;

    function Dv(A) {
        throw new RangeError(ce6[A])
    }

    function le6(A, B) {
        let Q = [],
            Z = A.length;
        while (Z--) Q[Z] = B(A[Z]);
        return Q
    }

    function mEB(A, B) {
        let Q = A.split("@"),
            Z = "";
        if (Q.length > 1) Z = Q[0] + "@", A = Q[1];
        A = A.replace(de6, ".");
        let D = A.split("."),
            G = le6(D, B).join(".");
        return Z + G
    }

    function dEB(A) {
        let B = [],
            Q = 0,
            Z = A.length;
        while (Q < Z) {
            let D = A.charCodeAt(Q++);
            if (D >= 55296 && D <= 56319 && Q < Z) {
                let G = A.charCodeAt(Q++);
                if ((G & 64512) == 56320) B.push(((D & 1023) << 10) + (G & 1023) + 65536);
                else B.push(D), Q--
            } else B.push(D)
        }
        return B
    }
    var pe6 = (A) => String.fromCodePoint(...A),
        ie6 = function(A) {
            if (A >= 48 && A < 58) return 26 + (A - 48);
            if (A >= 65 && A < 91) return A - 65;
            if (A >= 97 && A < 123) return A - 97;
            return 36
        },
        uEB = function(A, B) {
            return A + 22 + 75 * (A < 26) - ((B != 0) << 5)
        },
        cEB = function(A, B, Q) {
            let Z = 0;
            A = Q ? gM(A / 700) : A >> 1, A += gM(A / B);
            for (; A > 455; Z += 36) A = gM(A / 35);
            return gM(Z + 36 * A / (A + 38))
        },
        lEB = function(A) {
            let B = [],
                Q = A.length,
                Z = 0,
                D = 128,
                G = 72,
                F = A.lastIndexOf("-");
            if (F < 0) F = 0;
            for (let I = 0; I < F; ++I) {
                if (A.charCodeAt(I) >= 128) Dv("not-basic");
                B.push(A.charCodeAt(I))
            }
            for (let I = F > 0 ? F + 1 : 0; I < Q;) {
                let Y = Z;
                for (let J = 1, X = 36;; X += 36) {
                    if (I >= Q) Dv("invalid-input");
                    let V = ie6(A.charCodeAt(I++));
                    if (V >= 36) Dv("invalid-input");
                    if (V > gM((2147483647 - Z) / J)) Dv("overflow");
                    Z += V * J;
                    let C = X <= G ? 1 : X >= G + 26 ? 26 : X - G;
                    if (V < C) break;
                    let K = 36 - C;
                    if (J > gM(2147483647 / K)) Dv("overflow");
                    J *= K
                }
                let W = B.length + 1;
                if (G = cEB(Z - Y, W, Y == 0), gM(Z / W) > 2147483647 - D) Dv("overflow");
                D += gM(Z / W), Z %= W, B.splice(Z++, 0, D)
            }
            return String.fromCodePoint(...B)
        },
        pEB = function(A) {
            let B = [];
            A = dEB(A);
            let Q = A.length,
                Z = 128,
                D = 0,
                G = 72;
            for (let Y of A)
                if (Y < 128) B.push(gU0(Y));
            let F = B.length,
                I = F;
            if (F) B.push("-");
            while (I < Q) {
                let Y = 2147483647;
                for (let J of A)
                    if (J >= Z && J < Y) Y = J;
                let W = I + 1;
                if (Y - Z > gM((2147483647 - D) / W)) Dv("overflow");
                D += (Y - Z) * W, Z = Y;
                for (let J of A) {
                    if (J < Z && ++D > 2147483647) Dv("overflow");
                    if (J === Z) {
                        let X = D;
                        for (let V = 36;; V += 36) {
                            let C = V <= G ? 1 : V >= G + 26 ? 26 : V - G;
                            if (X < C) break;
                            let K = X - C,
                                H = 36 - C;
                            B.push(gU0(uEB(C + K % H, 0))), X = gM(K / H)
                        }
                        B.push(gU0(uEB(X, 0))), G = cEB(D, W, I === F), D = 0, ++I
                    }
                }++D, ++Z
            }
            return B.join("")
        },
        ne6 = function(A) {
            return mEB(A, function(B) {
                return ue6.test(B) ? lEB(B.slice(4).toLowerCase()) : B
            })
        },
        ae6 = function(A) {
            return mEB(A, function(B) {
                return me6.test(B) ? "xn--" + pEB(B) : B
            })
        },
        se6 = {
            version: "2.3.1",
            ucs2: {
                decode: dEB,
                encode: pe6
            },
            decode: lEB,
            encode: pEB,
            toASCII: ae6,
            toUnicode: ne6
        };
    iEB.exports = se6
});