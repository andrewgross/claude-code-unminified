/* chunk:418 bytes:[10048026, 10058371) size:10345 source:unpacked-cli.js */
var tEB = E((W18, oEB) => {
    W18.STATUS_MAPPING = {
        mapped: 1,
        valid: 2,
        disallowed: 3,
        deviation: 6,
        ignored: 7
    }
});
var ZUB = E((a63, QUB) => {
    var mU0 = nEB(),
        lE = sEB(),
        eEB = rEB(),
        {
            STATUS_MAPPING: Gv
        } = tEB();

    function uU0(A) {
        return /[^\x00-\x7F]/u.test(A)
    }

    function AUB(A) {
        let B = 0,
            Q = eEB.length - 1;
        while (B <= Q) {
            let Z = Math.floor((B + Q) / 2),
                D = eEB[Z],
                G = Array.isArray(D[0]) ? D[0][0] : D[0],
                F = Array.isArray(D[0]) ? D[0][1] : D[0];
            if (G <= A && F >= A) return D.slice(1);
            else if (G > A) Q = Z - 1;
            else B = Z + 1
        }
        return null
    }

    function X18(A, {
        transitionalProcessing: B
    }) {
        let Q = "";
        for (let Z of A) {
            let [D, G] = AUB(Z.codePointAt(0));
            switch (D) {
                case Gv.disallowed:
                    Q += Z;
                    break;
                case Gv.ignored:
                    break;
                case Gv.mapped:
                    if (B && Z === "ẞ") Q += "ss";
                    else Q += G;
                    break;
                case Gv.deviation:
                    if (B) Q += G;
                    else Q += Z;
                    break;
                case Gv.valid:
                    Q += Z;
                    break
            }
        }
        return Q
    }

    function V18(A, {
        checkHyphens: B,
        checkBidi: Q,
        checkJoiners: Z,
        transitionalProcessing: D,
        useSTD3ASCIIRules: G,
        isBidi: F
    }) {
        if (A.length === 0) return !0;
        if (A.normalize("NFC") !== A) return !1;
        let I = Array.from(A);
        if (B) {
            if (I[2] === "-" && I[3] === "-" || (A.startsWith("-") || A.endsWith("-"))) return !1
        }
        if (!B) {
            if (A.startsWith("xn--")) return !1
        }
        if (A.includes(".")) return !1;
        if (lE.combiningMarks.test(I[0])) return !1;
        for (let Y of I) {
            let W = Y.codePointAt(0),
                [J] = AUB(W);
            if (D) {
                if (J !== Gv.valid) return !1
            } else if (J !== Gv.valid && J !== Gv.deviation) return !1;
            if (G && W <= 127) {
                if (!/^(?:[a-z]|[0-9]|-)$/u.test(Y)) return !1
            }
        }
        if (Z) {
            let Y = 0;
            for (let [W, J] of I.entries())
                if (J === "‌" || J === "‍") {
                    if (W > 0) {
                        if (lE.combiningClassVirama.test(I[W - 1])) continue;
                        if (J === "‌") {
                            let X = I.indexOf("‌", W + 1),
                                V = X < 0 ? I.slice(Y) : I.slice(Y, X);
                            if (lE.validZWNJ.test(V.join(""))) {
                                Y = W + 1;
                                continue
                            }
                        }
                    }
                    return !1
                }
        }
        if (Q && F) {
            let Y;
            if (lE.bidiS1LTR.test(I[0])) Y = !1;
            else if (lE.bidiS1RTL.test(I[0])) Y = !0;
            else return !1;
            if (Y) {
                if (!lE.bidiS2.test(A) || !lE.bidiS3.test(A) || lE.bidiS4EN.test(A) && lE.bidiS4AN.test(A)) return !1
            } else if (!lE.bidiS5.test(A) || !lE.bidiS6.test(A)) return !1
        }
        return !0
    }

    function C18(A) {
        let B = A.map((Q) => {
            if (Q.startsWith("xn--")) try {
                return mU0.decode(Q.substring(4))
            } catch {
                return ""
            }
            return Q
        }).join(".");
        return lE.bidiDomain.test(B)
    }

    function BUB(A, B) {
        let Q = X18(A, B);
        Q = Q.normalize("NFC");
        let Z = Q.split("."),
            D = C18(Z),
            G = !1;
        for (let [F, I] of Z.entries()) {
            let Y = I,
                W = B.transitionalProcessing;
            if (Y.startsWith("xn--")) {
                if (uU0(Y)) {
                    G = !0;
                    continue
                }
                try {
                    Y = mU0.decode(Y.substring(4))
                } catch {
                    if (!B.ignoreInvalidPunycode) {
                        G = !0;
                        continue
                    }
                }
                if (Z[F] = Y, Y === "" || !uU0(Y)) G = !0;
                W = !1
            }
            if (G) continue;
            if (!V18(Y, {
                    ...B,
                    transitionalProcessing: W,
                    isBidi: D
                })) G = !0
        }
        return {
            string: Z.join("."),
            error: G
        }
    }

    function K18(A, {
        checkHyphens: B = !1,
        checkBidi: Q = !1,
        checkJoiners: Z = !1,
        useSTD3ASCIIRules: D = !1,
        verifyDNSLength: G = !1,
        transitionalProcessing: F = !1,
        ignoreInvalidPunycode: I = !1
    } = {}) {
        let Y = BUB(A, {
                checkHyphens: B,
                checkBidi: Q,
                checkJoiners: Z,
                useSTD3ASCIIRules: D,
                transitionalProcessing: F,
                ignoreInvalidPunycode: I
            }),
            W = Y.string.split(".");
        if (W = W.map((J) => {
                if (uU0(J)) try {
                    return `xn--${mU0.encode(J)}`
                } catch {
                    Y.error = !0
                }
                return J
            }), G) {
            let J = W.join(".").length;
            if (J > 253 || J === 0) Y.error = !0;
            for (let X = 0; X < W.length; ++X)
                if (W[X].length > 63 || W[X].length === 0) {
                    Y.error = !0;
                    break
                }
        }
        if (Y.error) return null;
        return W.join(".")
    }

    function H18(A, {
        checkHyphens: B = !1,
        checkBidi: Q = !1,
        checkJoiners: Z = !1,
        useSTD3ASCIIRules: D = !1,
        transitionalProcessing: G = !1,
        ignoreInvalidPunycode: F = !1
    } = {}) {
        let I = BUB(A, {
            checkHyphens: B,
            checkBidi: Q,
            checkJoiners: Z,
            useSTD3ASCIIRules: D,
            transitionalProcessing: G,
            ignoreInvalidPunycode: F
        });
        return {
            domain: I.string,
            error: I.error
        }
    }
    QUB.exports = {
        toASCII: K18,
        toUnicode: H18
    }
});
var cU0 = E((s63, GUB) => {
    function dU0(A) {
        return A >= 48 && A <= 57
    }

    function DUB(A) {
        return A >= 65 && A <= 90 || A >= 97 && A <= 122
    }

    function z18(A) {
        return DUB(A) || dU0(A)
    }

    function E18(A) {
        return dU0(A) || A >= 65 && A <= 70 || A >= 97 && A <= 102
    }
    GUB.exports = {
        isASCIIDigit: dU0,
        isASCIIAlpha: DUB,
        isASCIIAlphanumeric: z18,
        isASCIIHex: E18
    }
});
var Nx1 = E((r63, FUB) => {
    var U18 = new TextEncoder,
        w18 = new TextDecoder("utf-8", {
            ignoreBOM: !0
        });

    function $18(A) {
        return U18.encode(A)
    }

    function q18(A) {
        return w18.decode(A)
    }
    FUB.exports = {
        utf8Encode: $18,
        utf8DecodeWithoutBOM: q18
    }
});
var Lx1 = E((o63, CUB) => {
    var {
        isASCIIHex: IUB
    } = cU0(), {
        utf8Encode: YUB
    } = Nx1();

    function s6(A) {
        return A.codePointAt(0)
    }

    function N18(A) {
        let B = A.toString(16).toUpperCase();
        if (B.length === 1) B = `0${B}`;
        return `%${B}`
    }

    function WUB(A) {
        let B = new Uint8Array(A.byteLength),
            Q = 0;
        for (let Z = 0; Z < A.byteLength; ++Z) {
            let D = A[Z];
            if (D !== 37) B[Q++] = D;
            else if (D === 37 && (!IUB(A[Z + 1]) || !IUB(A[Z + 2]))) B[Q++] = D;
            else {
                let G = parseInt(String.fromCodePoint(A[Z + 1], A[Z + 2]), 16);
                B[Q++] = G, Z += 2
            }
        }
        return B.slice(0, Q)
    }

    function L18(A) {
        let B = YUB(A);
        return WUB(B)
    }

    function lU0(A) {
        return A <= 31 || A > 126
    }
    var M18 = new Set([s6(" "), s6('"'), s6("<"), s6(">"), s6("`")]);

    function R18(A) {
        return lU0(A) || M18.has(A)
    }
    var O18 = new Set([s6(" "), s6('"'), s6("#"), s6("<"), s6(">")]);

    function pU0(A) {
        return lU0(A) || O18.has(A)
    }

    function T18(A) {
        return pU0(A) || A === s6("'")
    }
    var P18 = new Set([s6("?"), s6("`"), s6("{"), s6("}"), s6("^")]);

    function JUB(A) {
        return pU0(A) || P18.has(A)
    }
    var S18 = new Set([s6("/"), s6(":"), s6(";"), s6("="), s6("@"), s6("["), s6("\\"), s6("]"), s6("|")]);

    function XUB(A) {
        return JUB(A) || S18.has(A)
    }
    var j18 = new Set([s6("$"), s6("%"), s6("&"), s6("+"), s6(",")]);

    function k18(A) {
        return XUB(A) || j18.has(A)
    }
    var y18 = new Set([s6("!"), s6("'"), s6("("), s6(")"), s6("~")]);

    function _18(A) {
        return k18(A) || y18.has(A)
    }

    function VUB(A, B) {
        let Q = YUB(A),
            Z = "";
        for (let D of Q)
            if (!B(D)) Z += String.fromCharCode(D);
            else Z += N18(D);
        return Z
    }

    function x18(A, B) {
        return VUB(String.fromCodePoint(A), B)
    }

    function v18(A, B, Q = !1) {
        let Z = "";
        for (let D of A)
            if (Q && D === " ") Z += "+";
            else Z += VUB(D, B);
        return Z
    }
    CUB.exports = {
        isC0ControlPercentEncode: lU0,
        isFragmentPercentEncode: R18,
        isQueryPercentEncode: pU0,
        isSpecialQueryPercentEncode: T18,
        isPathPercentEncode: JUB,
        isUserinfoPercentEncode: XUB,
        isURLEncodedPercentEncode: _18,
        percentDecodeString: L18,
        percentDecodeBytes: WUB,
        utf8PercentEncodeString: v18,
        utf8PercentEncodeCodePoint: x18
    }
});