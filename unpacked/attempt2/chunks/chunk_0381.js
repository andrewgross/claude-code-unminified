/* chunk:381 bytes:[8976133, 9014023) size:37890 source:unpacked-cli.js */
var _3B = E((xk1, y3B) => {
    (function(A, B) {
        typeof xk1 === "object" && typeof y3B !== "undefined" ? B(xk1) : typeof define === "function" && define.amd ? define(["exports"], B) : B(A.URI = A.URI || {})
    })(xk1, function(A) {
        function B() {
            for (var i1 = arguments.length, N1 = Array(i1), Z0 = 0; Z0 < i1; Z0++) N1[Z0] = arguments[Z0];
            if (N1.length > 1) {
                N1[0] = N1[0].slice(0, -1);
                var f0 = N1.length - 1;
                for (var p0 = 1; p0 < f0; ++p0) N1[p0] = N1[p0].slice(1, -1);
                return N1[f0] = N1[f0].slice(1), N1.join("")
            } else return N1[0]
        }

        function Q(i1) {
            return "(?:" + i1 + ")"
        }

        function Z(i1) {
            return i1 === void 0 ? "undefined" : i1 === null ? "null" : Object.prototype.toString.call(i1).split(" ").pop().split("]").shift().toLowerCase()
        }

        function D(i1) {
            return i1.toUpperCase()
        }

        function G(i1) {
            return i1 !== void 0 && i1 !== null ? i1 instanceof Array ? i1 : typeof i1.length !== "number" || i1.split || i1.setInterval || i1.call ? [i1] : Array.prototype.slice.call(i1) : []
        }

        function F(i1, N1) {
            var Z0 = i1;
            if (N1)
                for (var f0 in N1) Z0[f0] = N1[f0];
            return Z0
        }

        function I(i1) {
            var N1 = "[A-Za-z]",
                Z0 = "[\\x0D]",
                f0 = "[0-9]",
                p0 = "[\\x22]",
                rA = B(f0, "[A-Fa-f]"),
                nB = "[\\x0A]",
                f9 = "[\\x20]",
                a9 = Q(Q("%[EFef]" + rA + "%" + rA + rA + "%" + rA + rA) + "|" + Q("%[89A-Fa-f]" + rA + "%" + rA + rA) + "|" + Q("%" + rA + rA)),
                _4 = "[\\:\\/\\?\\#\\[\\]\\@]",
                b9 = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
                K4 = B(_4, b9),
                R4 = i1 ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
                KQ = i1 ? "[\\uE000-\\uF8FF]" : "[]",
                QB = B(N1, f0, "[\\-\\.\\_\\~]", R4),
                HQ = Q(N1 + B(N1, f0, "[\\+\\-\\.]") + "*"),
                v1 = Q(Q(a9 + "|" + B(QB, b9, "[\\:]")) + "*"),
                u1 = Q(Q("25[0-5]") + "|" + Q("2[0-4]" + f0) + "|" + Q("1" + f0 + f0) + "|" + Q("[1-9]" + f0) + "|" + f0),
                N0 = Q(Q("25[0-5]") + "|" + Q("2[0-4]" + f0) + "|" + Q("1" + f0 + f0) + "|" + Q("0?[1-9]" + f0) + "|0?0?" + f0),
                x0 = Q(N0 + "\\." + N0 + "\\." + N0 + "\\." + N0),
                w0 = Q(rA + "{1,4}"),
                h0 = Q(Q(w0 + "\\:" + w0) + "|" + x0),
                VA = Q(Q(w0 + "\\:") + "{6}" + h0),
                QA = Q("\\:\\:" + Q(w0 + "\\:") + "{5}" + h0),
                JA = Q(Q(w0) + "?\\:\\:" + Q(w0 + "\\:") + "{4}" + h0),
                e0 = Q(Q(Q(w0 + "\\:") + "{0,1}" + w0) + "?\\:\\:" + Q(w0 + "\\:") + "{3}" + h0),
                CA = Q(Q(Q(w0 + "\\:") + "{0,2}" + w0) + "?\\:\\:" + Q(w0 + "\\:") + "{2}" + h0),
                vB = Q(Q(Q(w0 + "\\:") + "{0,3}" + w0) + "?\\:\\:" + w0 + "\\:" + h0),
                R2 = Q(Q(Q(w0 + "\\:") + "{0,4}" + w0) + "?\\:\\:" + h0),
                mB = Q(Q(Q(w0 + "\\:") + "{0,5}" + w0) + "?\\:\\:" + w0),
                $1 = Q(Q(Q(w0 + "\\:") + "{0,6}" + w0) + "?\\:\\:"),
                B0 = Q([VA, QA, JA, e0, CA, vB, R2, mB, $1].join("|")),
                m1 = Q(Q(QB + "|" + a9) + "+"),
                z0 = Q(B0 + "\\%25" + m1),
                M0 = Q(B0 + Q("\\%25|\\%(?!" + rA + "{2})") + m1),
                q0 = Q("[vV]" + rA + "+\\." + B(QB, b9, "[\\:]") + "+"),
                AA = Q("\\[" + Q(M0 + "|" + B0 + "|" + q0) + "\\]"),
                HA = Q(Q(a9 + "|" + B(QB, b9)) + "*"),
                WA = Q(AA + "|" + x0 + "(?!" + HA + ")|" + HA),
                PA = Q(f0 + "*"),
                cA = Q(Q(v1 + "@") + "?" + WA + Q("\\:" + PA) + "?"),
                X2 = Q(a9 + "|" + B(QB, b9, "[\\:\\@]")),
                w9 = Q(X2 + "*"),
                h9 = Q(X2 + "+"),
                SQ = Q(Q(a9 + "|" + B(QB, b9, "[\\@]")) + "+"),
                yA = Q(Q("\\/" + w9) + "*"),
                YB = Q("\\/" + Q(h9 + yA) + "?"),
                RQ = Q(SQ + yA),
                S9 = Q(h9 + yA),
                O4 = "(?!" + X2 + ")",
                c6 = Q(yA + "|" + YB + "|" + RQ + "|" + S9 + "|" + O4),
                iQ = Q(Q(X2 + "|" + B("[\\/\\?]", KQ)) + "*"),
                t6 = Q(Q(X2 + "|[\\/\\?]") + "*"),
                c7 = Q(Q("\\/\\/" + cA + yA) + "|" + YB + "|" + S9 + "|" + O4),
                QQ = Q(HQ + "\\:" + c7 + Q("\\?" + iQ) + "?" + Q("\\#" + t6) + "?"),
                $7 = Q(Q("\\/\\/" + cA + yA) + "|" + YB + "|" + RQ + "|" + O4),
                SD = Q($7 + Q("\\?" + iQ) + "?" + Q("\\#" + t6) + "?"),
                $W = Q(QQ + "|" + SD),
                MG = Q(HQ + "\\:" + c7 + Q("\\?" + iQ) + "?"),
                x4 = "^(" + HQ + ")\\:" + Q(Q("\\/\\/(" + Q("(" + v1 + ")@") + "?(" + WA + ")" + Q("\\:(" + PA + ")") + "?)") + "?(" + yA + "|" + YB + "|" + S9 + "|" + O4 + ")") + Q("\\?(" + iQ + ")") + "?" + Q("\\#(" + t6 + ")") + "?$",
                i4 = "^(){0}" + Q(Q("\\/\\/(" + Q("(" + v1 + ")@") + "?(" + WA + ")" + Q("\\:(" + PA + ")") + "?)") + "?(" + yA + "|" + YB + "|" + RQ + "|" + O4 + ")") + Q("\\?(" + iQ + ")") + "?" + Q("\\#(" + t6 + ")") + "?$",
                qW = "^(" + HQ + ")\\:" + Q(Q("\\/\\/(" + Q("(" + v1 + ")@") + "?(" + WA + ")" + Q("\\:(" + PA + ")") + "?)") + "?(" + yA + "|" + YB + "|" + S9 + "|" + O4 + ")") + Q("\\?(" + iQ + ")") + "?$",
                HH = "^" + Q("\\#(" + t6 + ")") + "?$",
                zH = "^" + Q("(" + v1 + ")@") + "?(" + WA + ")" + Q("\\:(" + PA + ")") + "?$";
            return {
                NOT_SCHEME: new RegExp(B("[^]", N1, f0, "[\\+\\-\\.]"), "g"),
                NOT_USERINFO: new RegExp(B("[^\\%\\:]", QB, b9), "g"),
                NOT_HOST: new RegExp(B("[^\\%\\[\\]\\:]", QB, b9), "g"),
                NOT_PATH: new RegExp(B("[^\\%\\/\\:\\@]", QB, b9), "g"),
                NOT_PATH_NOSCHEME: new RegExp(B("[^\\%\\/\\@]", QB, b9), "g"),
                NOT_QUERY: new RegExp(B("[^\\%]", QB, b9, "[\\:\\@\\/\\?]", KQ), "g"),
                NOT_FRAGMENT: new RegExp(B("[^\\%]", QB, b9, "[\\:\\@\\/\\?]"), "g"),
                ESCAPE: new RegExp(B("[^]", QB, b9), "g"),
                UNRESERVED: new RegExp(QB, "g"),
                OTHER_CHARS: new RegExp(B("[^\\%]", QB, K4), "g"),
                PCT_ENCODED: new RegExp(a9, "g"),
                IPV4ADDRESS: new RegExp("^(" + x0 + ")$"),
                IPV6ADDRESS: new RegExp("^\\[?(" + B0 + ")" + Q(Q("\\%25|\\%(?!" + rA + "{2})") + "(" + m1 + ")") + "?\\]?$")
            }
        }
        var Y = I(!1),
            W = I(!0),
            J = function() {
                function i1(N1, Z0) {
                    var f0 = [],
                        p0 = !0,
                        rA = !1,
                        nB = void 0;
                    try {
                        for (var f9 = N1[Symbol.iterator](), a9; !(p0 = (a9 = f9.next()).done); p0 = !0)
                            if (f0.push(a9.value), Z0 && f0.length === Z0) break
                    } catch (_4) {
                        rA = !0, nB = _4
                    } finally {
                        try {
                            if (!p0 && f9.return) f9.return()
                        } finally {
                            if (rA) throw nB
                        }
                    }
                    return f0
                }
                return function(N1, Z0) {
                    if (Array.isArray(N1)) return N1;
                    else if (Symbol.iterator in Object(N1)) return i1(N1, Z0);
                    else throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            X = function(i1) {
                if (Array.isArray(i1)) {
                    for (var N1 = 0, Z0 = Array(i1.length); N1 < i1.length; N1++) Z0[N1] = i1[N1];
                    return Z0
                } else return Array.from(i1)
            },
            V = 2147483647,
            C = 36,
            K = 1,
            H = 26,
            z = 38,
            $ = 700,
            L = 72,
            N = 128,
            R = "-",
            O = /^xn--/,
            P = /[^\0-\x7E]/,
            j = /[\x2E\u3002\uFF0E\uFF61]/g,
            f = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            },
            k = C - K,
            c = Math.floor,
            u = String.fromCharCode;

        function a(i1) {
            throw new RangeError(f[i1])
        }

        function l(i1, N1) {
            var Z0 = [],
                f0 = i1.length;
            while (f0--) Z0[f0] = N1(i1[f0]);
            return Z0
        }

        function y(i1, N1) {
            var Z0 = i1.split("@"),
                f0 = "";
            if (Z0.length > 1) f0 = Z0[0] + "@", i1 = Z0[1];
            i1 = i1.replace(j, ".");
            var p0 = i1.split("."),
                rA = l(p0, N1).join(".");
            return f0 + rA
        }

        function t(i1) {
            var N1 = [],
                Z0 = 0,
                f0 = i1.length;
            while (Z0 < f0) {
                var p0 = i1.charCodeAt(Z0++);
                if (p0 >= 55296 && p0 <= 56319 && Z0 < f0) {
                    var rA = i1.charCodeAt(Z0++);
                    if ((rA & 64512) == 56320) N1.push(((p0 & 1023) << 10) + (rA & 1023) + 65536);
                    else N1.push(p0), Z0--
                } else N1.push(p0)
            }
            return N1
        }
        var E1 = function i1(N1) {
                return String.fromCodePoint.apply(String, X(N1))
            },
            C1 = function i1(N1) {
                if (N1 - 48 < 10) return N1 - 22;
                if (N1 - 65 < 26) return N1 - 65;
                if (N1 - 97 < 26) return N1 - 97;
                return C
            },
            _1 = function i1(N1, Z0) {
                return N1 + 22 + 75 * (N1 < 26) - ((Z0 != 0) << 5)
            },
            F0 = function i1(N1, Z0, f0) {
                var p0 = 0;
                N1 = f0 ? c(N1 / $) : N1 >> 1, N1 += c(N1 / Z0);
                for (; N1 > k * H >> 1; p0 += C) N1 = c(N1 / k);
                return c(p0 + (k + 1) * N1 / (N1 + z))
            },
            W0 = function i1(N1) {
                var Z0 = [],
                    f0 = N1.length,
                    p0 = 0,
                    rA = N,
                    nB = L,
                    f9 = N1.lastIndexOf(R);
                if (f9 < 0) f9 = 0;
                for (var a9 = 0; a9 < f9; ++a9) {
                    if (N1.charCodeAt(a9) >= 128) a("not-basic");
                    Z0.push(N1.charCodeAt(a9))
                }
                for (var _4 = f9 > 0 ? f9 + 1 : 0; _4 < f0;) {
                    var b9 = p0;
                    for (var K4 = 1, R4 = C;; R4 += C) {
                        if (_4 >= f0) a("invalid-input");
                        var KQ = C1(N1.charCodeAt(_4++));
                        if (KQ >= C || KQ > c((V - p0) / K4)) a("overflow");
                        p0 += KQ * K4;
                        var QB = R4 <= nB ? K : R4 >= nB + H ? H : R4 - nB;
                        if (KQ < QB) break;
                        var HQ = C - QB;
                        if (K4 > c(V / HQ)) a("overflow");
                        K4 *= HQ
                    }
                    var v1 = Z0.length + 1;
                    if (nB = F0(p0 - b9, v1, b9 == 0), c(p0 / v1) > V - rA) a("overflow");
                    rA += c(p0 / v1), p0 %= v1, Z0.splice(p0++, 0, rA)
                }
                return String.fromCodePoint.apply(String, Z0)
            },
            g1 = function i1(N1) {
                var Z0 = [];
                N1 = t(N1);
                var f0 = N1.length,
                    p0 = N,
                    rA = 0,
                    nB = L,
                    f9 = !0,
                    a9 = !1,
                    _4 = void 0;
                try {
                    for (var b9 = N1[Symbol.iterator](), K4; !(f9 = (K4 = b9.next()).done); f9 = !0) {
                        var R4 = K4.value;
                        if (R4 < 128) Z0.push(u(R4))
                    }
                } catch (M0) {
                    a9 = !0, _4 = M0
                } finally {
                    try {
                        if (!f9 && b9.return) b9.return()
                    } finally {
                        if (a9) throw _4
                    }
                }
                var KQ = Z0.length,
                    QB = KQ;
                if (KQ) Z0.push(R);
                while (QB < f0) {
                    var HQ = V,
                        v1 = !0,
                        u1 = !1,
                        N0 = void 0;
                    try {
                        for (var x0 = N1[Symbol.iterator](), w0; !(v1 = (w0 = x0.next()).done); v1 = !0) {
                            var h0 = w0.value;
                            if (h0 >= p0 && h0 < HQ) HQ = h0
                        }
                    } catch (M0) {
                        u1 = !0, N0 = M0
                    } finally {
                        try {
                            if (!v1 && x0.return) x0.return()
                        } finally {
                            if (u1) throw N0
                        }
                    }
                    var VA = QB + 1;
                    if (HQ - p0 > c((V - rA) / VA)) a("overflow");
                    rA += (HQ - p0) * VA, p0 = HQ;
                    var QA = !0,
                        JA = !1,
                        e0 = void 0;
                    try {
                        for (var CA = N1[Symbol.iterator](), vB; !(QA = (vB = CA.next()).done); QA = !0) {
                            var R2 = vB.value;
                            if (R2 < p0 && ++rA > V) a("overflow");
                            if (R2 == p0) {
                                var mB = rA;
                                for (var $1 = C;; $1 += C) {
                                    var B0 = $1 <= nB ? K : $1 >= nB + H ? H : $1 - nB;
                                    if (mB < B0) break;
                                    var m1 = mB - B0,
                                        z0 = C - B0;
                                    Z0.push(u(_1(B0 + m1 % z0, 0))), mB = c(m1 / z0)
                                }
                                Z0.push(u(_1(mB, 0))), nB = F0(rA, VA, QB == KQ), rA = 0, ++QB
                            }
                        }
                    } catch (M0) {
                        JA = !0, e0 = M0
                    } finally {
                        try {
                            if (!QA && CA.return) CA.return()
                        } finally {
                            if (JA) throw e0
                        }
                    }++rA, ++p0
                }
                return Z0.join("")
            },
            w1 = function i1(N1) {
                return y(N1, function(Z0) {
                    return O.test(Z0) ? W0(Z0.slice(4).toLowerCase()) : Z0
                })
            },
            Q1 = function i1(N1) {
                return y(N1, function(Z0) {
                    return P.test(Z0) ? "xn--" + g1(Z0) : Z0
                })
            },
            k1 = {
                version: "2.1.0",
                ucs2: {
                    decode: t,
                    encode: E1
                },
                decode: W0,
                encode: g1,
                toASCII: Q1,
                toUnicode: w1
            },
            H1 = {};

        function A0(i1) {
            var N1 = i1.charCodeAt(0),
                Z0 = void 0;
            if (N1 < 16) Z0 = "%0" + N1.toString(16).toUpperCase();
            else if (N1 < 128) Z0 = "%" + N1.toString(16).toUpperCase();
            else if (N1 < 2048) Z0 = "%" + (N1 >> 6 | 192).toString(16).toUpperCase() + "%" + (N1 & 63 | 128).toString(16).toUpperCase();
            else Z0 = "%" + (N1 >> 12 | 224).toString(16).toUpperCase() + "%" + (N1 >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (N1 & 63 | 128).toString(16).toUpperCase();
            return Z0
        }

        function V0(i1) {
            var N1 = "",
                Z0 = 0,
                f0 = i1.length;
            while (Z0 < f0) {
                var p0 = parseInt(i1.substr(Z0 + 1, 2), 16);
                if (p0 < 128) N1 += String.fromCharCode(p0), Z0 += 3;
                else if (p0 >= 194 && p0 < 224) {
                    if (f0 - Z0 >= 6) {
                        var rA = parseInt(i1.substr(Z0 + 4, 2), 16);
                        N1 += String.fromCharCode((p0 & 31) << 6 | rA & 63)
                    } else N1 += i1.substr(Z0, 6);
                    Z0 += 6
                } else if (p0 >= 224) {
                    if (f0 - Z0 >= 9) {
                        var nB = parseInt(i1.substr(Z0 + 4, 2), 16),
                            f9 = parseInt(i1.substr(Z0 + 7, 2), 16);
                        N1 += String.fromCharCode((p0 & 15) << 12 | (nB & 63) << 6 | f9 & 63)
                    } else N1 += i1.substr(Z0, 9);
                    Z0 += 9
                } else N1 += i1.substr(Z0, 3), Z0 += 3
            }
            return N1
        }

        function o1(i1, N1) {
            function Z0(f0) {
                var p0 = V0(f0);
                return !p0.match(N1.UNRESERVED) ? f0 : p0
            }
            if (i1.scheme) i1.scheme = String(i1.scheme).replace(N1.PCT_ENCODED, Z0).toLowerCase().replace(N1.NOT_SCHEME, "");
            if (i1.userinfo !== void 0) i1.userinfo = String(i1.userinfo).replace(N1.PCT_ENCODED, Z0).replace(N1.NOT_USERINFO, A0).replace(N1.PCT_ENCODED, D);
            if (i1.host !== void 0) i1.host = String(i1.host).replace(N1.PCT_ENCODED, Z0).toLowerCase().replace(N1.NOT_HOST, A0).replace(N1.PCT_ENCODED, D);
            if (i1.path !== void 0) i1.path = String(i1.path).replace(N1.PCT_ENCODED, Z0).replace(i1.scheme ? N1.NOT_PATH : N1.NOT_PATH_NOSCHEME, A0).replace(N1.PCT_ENCODED, D);
            if (i1.query !== void 0) i1.query = String(i1.query).replace(N1.PCT_ENCODED, Z0).replace(N1.NOT_QUERY, A0).replace(N1.PCT_ENCODED, D);
            if (i1.fragment !== void 0) i1.fragment = String(i1.fragment).replace(N1.PCT_ENCODED, Z0).replace(N1.NOT_FRAGMENT, A0).replace(N1.PCT_ENCODED, D);
            return i1
        }

        function e(i1) {
            return i1.replace(/^0*(.*)/, "$1") || "0"
        }

        function Z1(i1, N1) {
            var Z0 = i1.match(N1.IPV4ADDRESS) || [],
                f0 = J(Z0, 2),
                p0 = f0[1];
            if (p0) return p0.split(".").map(e).join(".");
            else return i1
        }

        function I1(i1, N1) {
            var Z0 = i1.match(N1.IPV6ADDRESS) || [],
                f0 = J(Z0, 3),
                p0 = f0[1],
                rA = f0[2];
            if (p0) {
                var nB = p0.toLowerCase().split("::").reverse(),
                    f9 = J(nB, 2),
                    a9 = f9[0],
                    _4 = f9[1],
                    b9 = _4 ? _4.split(":").map(e) : [],
                    K4 = a9.split(":").map(e),
                    R4 = N1.IPV4ADDRESS.test(K4[K4.length - 1]),
                    KQ = R4 ? 7 : 8,
                    QB = K4.length - KQ,
                    HQ = Array(KQ);
                for (var v1 = 0; v1 < KQ; ++v1) HQ[v1] = b9[v1] || K4[QB + v1] || "";
                if (R4) HQ[KQ - 1] = Z1(HQ[KQ - 1], N1);
                var u1 = HQ.reduce(function(VA, QA, JA) {
                        if (!QA || QA === "0") {
                            var e0 = VA[VA.length - 1];
                            if (e0 && e0.index + e0.length === JA) e0.length++;
                            else VA.push({
                                index: JA,
                                length: 1
                            })
                        }
                        return VA
                    }, []),
                    N0 = u1.sort(function(VA, QA) {
                        return QA.length - VA.length
                    })[0],
                    x0 = void 0;
                if (N0 && N0.length > 1) {
                    var w0 = HQ.slice(0, N0.index),
                        h0 = HQ.slice(N0.index + N0.length);
                    x0 = w0.join(":") + "::" + h0.join(":")
                } else x0 = HQ.join(":");
                if (rA) x0 += "%" + rA;
                return x0
            } else return i1
        }
        var U1 = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i,
            O1 = "".match(/(){0}/)[1] === void 0;

        function B1(i1) {
            var N1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
                Z0 = {},
                f0 = N1.iri !== !1 ? W : Y;
            if (N1.reference === "suffix") i1 = (N1.scheme ? N1.scheme + ":" : "") + "//" + i1;
            var p0 = i1.match(U1);
            if (p0) {
                if (O1) {
                    if (Z0.scheme = p0[1], Z0.userinfo = p0[3], Z0.host = p0[4], Z0.port = parseInt(p0[5], 10), Z0.path = p0[6] || "", Z0.query = p0[7], Z0.fragment = p0[8], isNaN(Z0.port)) Z0.port = p0[5]
                } else if (Z0.scheme = p0[1] || void 0, Z0.userinfo = i1.indexOf("@") !== -1 ? p0[3] : void 0, Z0.host = i1.indexOf("//") !== -1 ? p0[4] : void 0, Z0.port = parseInt(p0[5], 10), Z0.path = p0[6] || "", Z0.query = i1.indexOf("?") !== -1 ? p0[7] : void 0, Z0.fragment = i1.indexOf("#") !== -1 ? p0[8] : void 0, isNaN(Z0.port)) Z0.port = i1.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? p0[4] : void 0;
                if (Z0.host) Z0.host = I1(Z1(Z0.host, f0), f0);
                if (Z0.scheme === void 0 && Z0.userinfo === void 0 && Z0.host === void 0 && Z0.port === void 0 && !Z0.path && Z0.query === void 0) Z0.reference = "same-document";
                else if (Z0.scheme === void 0) Z0.reference = "relative";
                else if (Z0.fragment === void 0) Z0.reference = "absolute";
                else Z0.reference = "uri";
                if (N1.reference && N1.reference !== "suffix" && N1.reference !== Z0.reference) Z0.error = Z0.error || "URI is not a " + N1.reference + " reference.";
                var rA = H1[(N1.scheme || Z0.scheme || "").toLowerCase()];
                if (!N1.unicodeSupport && (!rA || !rA.unicodeSupport)) {
                    if (Z0.host && (N1.domainHost || rA && rA.domainHost)) try {
                        Z0.host = k1.toASCII(Z0.host.replace(f0.PCT_ENCODED, V0).toLowerCase())
                    } catch (nB) {
                        Z0.error = Z0.error || "Host's domain name can not be converted to ASCII via punycode: " + nB
                    }
                    o1(Z0, Y)
                } else o1(Z0, f0);
                if (rA && rA.parse) rA.parse(Z0, N1)
            } else Z0.error = Z0.error || "URI can not be parsed.";
            return Z0
        }

        function x1(i1, N1) {
            var Z0 = N1.iri !== !1 ? W : Y,
                f0 = [];
            if (i1.userinfo !== void 0) f0.push(i1.userinfo), f0.push("@");
            if (i1.host !== void 0) f0.push(I1(Z1(String(i1.host), Z0), Z0).replace(Z0.IPV6ADDRESS, function(p0, rA, nB) {
                return "[" + rA + (nB ? "%25" + nB : "") + "]"
            }));
            if (typeof i1.port === "number" || typeof i1.port === "string") f0.push(":"), f0.push(String(i1.port));
            return f0.length ? f0.join("") : void 0
        }
        var c1 = /^\.\.?\//,
            a1 = /^\/\.(\/|$)/,
            C0 = /^\/\.\.(\/|$)/,
            K0 = /^\/?(?:.|\n)*?(?=\/|$)/;

        function R0(i1) {
            var N1 = [];
            while (i1.length)
                if (i1.match(c1)) i1 = i1.replace(c1, "");
                else if (i1.match(a1)) i1 = i1.replace(a1, "/");
            else if (i1.match(C0)) i1 = i1.replace(C0, "/"), N1.pop();
            else if (i1 === "." || i1 === "..") i1 = "";
            else {
                var Z0 = i1.match(K0);
                if (Z0) {
                    var f0 = Z0[0];
                    i1 = i1.slice(f0.length), N1.push(f0)
                } else throw new Error("Unexpected dot segment condition")
            }
            return N1.join("")
        }

        function wA(i1) {
            var N1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
                Z0 = N1.iri ? W : Y,
                f0 = [],
                p0 = H1[(N1.scheme || i1.scheme || "").toLowerCase()];
            if (p0 && p0.serialize) p0.serialize(i1, N1);
            if (i1.host) {
                if (Z0.IPV6ADDRESS.test(i1.host));
                else if (N1.domainHost || p0 && p0.domainHost) try {
                    i1.host = !N1.iri ? k1.toASCII(i1.host.replace(Z0.PCT_ENCODED, V0).toLowerCase()) : k1.toUnicode(i1.host)
                } catch (f9) {
                    i1.error = i1.error || "Host's domain name can not be converted to " + (!N1.iri ? "ASCII" : "Unicode") + " via punycode: " + f9
                }
            }
            if (o1(i1, Z0), N1.reference !== "suffix" && i1.scheme) f0.push(i1.scheme), f0.push(":");
            var rA = x1(i1, N1);
            if (rA !== void 0) {
                if (N1.reference !== "suffix") f0.push("//");
                if (f0.push(rA), i1.path && i1.path.charAt(0) !== "/") f0.push("/")
            }
            if (i1.path !== void 0) {
                var nB = i1.path;
                if (!N1.absolutePath && (!p0 || !p0.absolutePath)) nB = R0(nB);
                if (rA === void 0) nB = nB.replace(/^\/\//, "/%2F");
                f0.push(nB)
            }
            if (i1.query !== void 0) f0.push("?"), f0.push(i1.query);
            if (i1.fragment !== void 0) f0.push("#"), f0.push(i1.fragment);
            return f0.join("")
        }

        function u0(i1, N1) {
            var Z0 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
                f0 = arguments[3],
                p0 = {};
            if (!f0) i1 = B1(wA(i1, Z0), Z0), N1 = B1(wA(N1, Z0), Z0);
            if (Z0 = Z0 || {}, !Z0.tolerant && N1.scheme) p0.scheme = N1.scheme, p0.userinfo = N1.userinfo, p0.host = N1.host, p0.port = N1.port, p0.path = R0(N1.path || ""), p0.query = N1.query;
            else {
                if (N1.userinfo !== void 0 || N1.host !== void 0 || N1.port !== void 0) p0.userinfo = N1.userinfo, p0.host = N1.host, p0.port = N1.port, p0.path = R0(N1.path || ""), p0.query = N1.query;
                else {
                    if (!N1.path)
                        if (p0.path = i1.path, N1.query !== void 0) p0.query = N1.query;
                        else p0.query = i1.query;
                    else {
                        if (N1.path.charAt(0) === "/") p0.path = R0(N1.path);
                        else {
                            if ((i1.userinfo !== void 0 || i1.host !== void 0 || i1.port !== void 0) && !i1.path) p0.path = "/" + N1.path;
                            else if (!i1.path) p0.path = N1.path;
                            else p0.path = i1.path.slice(0, i1.path.lastIndexOf("/") + 1) + N1.path;
                            p0.path = R0(p0.path)
                        }
                        p0.query = N1.query
                    }
                    p0.userinfo = i1.userinfo, p0.host = i1.host, p0.port = i1.port
                }
                p0.scheme = i1.scheme
            }
            return p0.fragment = N1.fragment, p0
        }

        function TA(i1, N1, Z0) {
            var f0 = F({
                scheme: "null"
            }, Z0);
            return wA(u0(B1(i1, f0), B1(N1, f0), f0, !0), f0)
        }

        function dA(i1, N1) {
            if (typeof i1 === "string") i1 = wA(B1(i1, N1), N1);
            else if (Z(i1) === "object") i1 = B1(wA(i1, N1), N1);
            return i1
        }

        function J2(i1, N1, Z0) {
            if (typeof i1 === "string") i1 = wA(B1(i1, Z0), Z0);
            else if (Z(i1) === "object") i1 = wA(i1, Z0);
            if (typeof N1 === "string") N1 = wA(B1(N1, Z0), Z0);
            else if (Z(N1) === "object") N1 = wA(N1, Z0);
            return i1 === N1
        }

        function s2(i1, N1) {
            return i1 && i1.toString().replace(!N1 || !N1.iri ? Y.ESCAPE : W.ESCAPE, A0)
        }

        function N2(i1, N1) {
            return i1 && i1.toString().replace(!N1 || !N1.iri ? Y.PCT_ENCODED : W.PCT_ENCODED, V0)
        }
        var U9 = {
                scheme: "http",
                domainHost: !0,
                parse: function i1(N1, Z0) {
                    if (!N1.host) N1.error = N1.error || "HTTP URIs must have a host.";
                    return N1
                },
                serialize: function i1(N1, Z0) {
                    var f0 = String(N1.scheme).toLowerCase() === "https";
                    if (N1.port === (f0 ? 443 : 80) || N1.port === "") N1.port = void 0;
                    if (!N1.path) N1.path = "/";
                    return N1
                }
            },
            m6 = {
                scheme: "https",
                domainHost: U9.domainHost,
                parse: U9.parse,
                serialize: U9.serialize
            };

        function kA(i1) {
            return typeof i1.secure === "boolean" ? i1.secure : String(i1.scheme).toLowerCase() === "wss"
        }
        var G2 = {
                scheme: "ws",
                domainHost: !0,
                parse: function i1(N1, Z0) {
                    var f0 = N1;
                    return f0.secure = kA(f0), f0.resourceName = (f0.path || "/") + (f0.query ? "?" + f0.query : ""), f0.path = void 0, f0.query = void 0, f0
                },
                serialize: function i1(N1, Z0) {
                    if (N1.port === (kA(N1) ? 443 : 80) || N1.port === "") N1.port = void 0;
                    if (typeof N1.secure === "boolean") N1.scheme = N1.secure ? "wss" : "ws", N1.secure = void 0;
                    if (N1.resourceName) {
                        var f0 = N1.resourceName.split("?"),
                            p0 = J(f0, 2),
                            rA = p0[0],
                            nB = p0[1];
                        N1.path = rA && rA !== "/" ? rA : void 0, N1.query = nB, N1.resourceName = void 0
                    }
                    return N1.fragment = void 0, N1
                }
            },
            T2 = {
                scheme: "wss",
                domainHost: G2.domainHost,
                parse: G2.parse,
                serialize: G2.serialize
            },
            pA = {},
            bA = !0,
            r2 = "[A-Za-z0-9\\-\\.\\_\\~" + (bA ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]",
            xB = "[0-9A-Fa-f]",
            o6 = Q(Q("%[EFef]" + xB + "%" + xB + xB + "%" + xB + xB) + "|" + Q("%[89A-Fa-f]" + xB + "%" + xB + xB) + "|" + Q("%" + xB + xB)),
            D3 = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]",
            C4 = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",
            oB = B(C4, "[\\\"\\\\]"),
            d6 = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]",
            m5 = new RegExp(r2, "g"),
            d5 = new RegExp(o6, "g"),
            w8 = new RegExp(B("[^]", D3, "[\\.]", "[\\\"]", oB), "g"),
            N6 = new RegExp(B("[^]", r2, d6), "g"),
            w7 = N6;

        function i3(i1) {
            var N1 = V0(i1);
            return !N1.match(m5) ? i1 : N1
        }
        var d7 = {
                scheme: "mailto",
                parse: function i1(N1, Z0) {
                    var f0 = N1,
                        p0 = f0.to = f0.path ? f0.path.split(",") : [];
                    if (f0.path = void 0, f0.query) {
                        var rA = !1,
                            nB = {},
                            f9 = f0.query.split("&");
                        for (var a9 = 0, _4 = f9.length; a9 < _4; ++a9) {
                            var b9 = f9[a9].split("=");
                            switch (b9[0]) {
                                case "to":
                                    var K4 = b9[1].split(",");
                                    for (var R4 = 0, KQ = K4.length; R4 < KQ; ++R4) p0.push(K4[R4]);
                                    break;
                                case "subject":
                                    f0.subject = N2(b9[1], Z0);
                                    break;
                                case "body":
                                    f0.body = N2(b9[1], Z0);
                                    break;
                                default:
                                    rA = !0, nB[N2(b9[0], Z0)] = N2(b9[1], Z0);
                                    break
                            }
                        }
                        if (rA) f0.headers = nB
                    }
                    f0.query = void 0;
                    for (var QB = 0, HQ = p0.length; QB < HQ; ++QB) {
                        var v1 = p0[QB].split("@");
                        if (v1[0] = N2(v1[0]), !Z0.unicodeSupport) try {
                            v1[1] = k1.toASCII(N2(v1[1], Z0).toLowerCase())
                        } catch (u1) {
                            f0.error = f0.error || "Email address's domain name can not be converted to ASCII via punycode: " + u1
                        } else v1[1] = N2(v1[1], Z0).toLowerCase();
                        p0[QB] = v1.join("@")
                    }
                    return f0
                },
                serialize: function i1(N1, Z0) {
                    var f0 = N1,
                        p0 = G(N1.to);
                    if (p0) {
                        for (var rA = 0, nB = p0.length; rA < nB; ++rA) {
                            var f9 = String(p0[rA]),
                                a9 = f9.lastIndexOf("@"),
                                _4 = f9.slice(0, a9).replace(d5, i3).replace(d5, D).replace(w8, A0),
                                b9 = f9.slice(a9 + 1);
                            try {
                                b9 = !Z0.iri ? k1.toASCII(N2(b9, Z0).toLowerCase()) : k1.toUnicode(b9)
                            } catch (QB) {
                                f0.error = f0.error || "Email address's domain name can not be converted to " + (!Z0.iri ? "ASCII" : "Unicode") + " via punycode: " + QB
                            }
                            p0[rA] = _4 + "@" + b9
                        }
                        f0.path = p0.join(",")
                    }
                    var K4 = N1.headers = N1.headers || {};
                    if (N1.subject) K4.subject = N1.subject;
                    if (N1.body) K4.body = N1.body;
                    var R4 = [];
                    for (var KQ in K4)
                        if (K4[KQ] !== pA[KQ]) R4.push(KQ.replace(d5, i3).replace(d5, D).replace(N6, A0) + "=" + K4[KQ].replace(d5, i3).replace(d5, D).replace(w7, A0));
                    if (R4.length) f0.query = R4.join("&");
                    return f0
                }
            },
            y4 = /^([^\:]+)\:(.*)/,
            n3 = {
                scheme: "urn",
                parse: function i1(N1, Z0) {
                    var f0 = N1.path && N1.path.match(y4),
                        p0 = N1;
                    if (f0) {
                        var rA = Z0.scheme || p0.scheme || "urn",
                            nB = f0[1].toLowerCase(),
                            f9 = f0[2],
                            a9 = rA + ":" + (Z0.nid || nB),
                            _4 = H1[a9];
                        if (p0.nid = nB, p0.nss = f9, p0.path = void 0, _4) p0 = _4.parse(p0, Z0)
                    } else p0.error = p0.error || "URN can not be parsed.";
                    return p0
                },
                serialize: function i1(N1, Z0) {
                    var f0 = Z0.scheme || N1.scheme || "urn",
                        p0 = N1.nid,
                        rA = f0 + ":" + (Z0.nid || p0),
                        nB = H1[rA];
                    if (nB) N1 = nB.serialize(N1, Z0);
                    var f9 = N1,
                        a9 = N1.nss;
                    return f9.path = (p0 || Z0.nid) + ":" + a9, f9
                }
            },
            AD = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/,
            H2 = {
                scheme: "urn:uuid",
                parse: function i1(N1, Z0) {
                    var f0 = N1;
                    if (f0.uuid = f0.nss, f0.nss = void 0, !Z0.tolerant && (!f0.uuid || !f0.uuid.match(AD))) f0.error = f0.error || "UUID is not valid.";
                    return f0
                },
                serialize: function i1(N1, Z0) {
                    var f0 = N1;
                    return f0.nss = (N1.uuid || "").toLowerCase(), f0
                }
            };
        H1[U9.scheme] = U9, H1[m6.scheme] = m6, H1[G2.scheme] = G2, H1[T2.scheme] = T2, H1[d7.scheme] = d7, H1[n3.scheme] = n3, H1[H2.scheme] = H2, A.SCHEMES = H1, A.pctEncChar = A0, A.pctDecChars = V0, A.parse = B1, A.removeDotSegments = R0, A.serialize = wA, A.resolveComponents = u0, A.resolve = TA, A.normalize = dA, A.equal = J2, A.escapeComponent = s2, A.unescapeComponent = N2, Object.defineProperty(A, "__esModule", {
            value: !0
        })
    })
});