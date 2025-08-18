/* chunk:427 bytes:[10184646, 10229458) size:44812 source:unpacked-cli.js */
var Ew0 = E((fwB, vx1) => {
    (function(A) {
        var B, Q = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
            Z = Math.ceil,
            D = Math.floor,
            G = "[BigNumber Error] ",
            F = G + "Number primitive has more than 15 significant digits: ",
            I = 100000000000000,
            Y = 14,
            W = 9007199254740991,
            J = [1, 10, 100, 1000, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 10000000000, 100000000000, 1000000000000, 10000000000000],
            X = 1e7,
            V = 1e9;

        function C(O) {
            var P, j, f, k = Q1.prototype = {
                    constructor: Q1,
                    toString: null,
                    valueOf: null
                },
                c = new Q1(1),
                u = 20,
                a = 4,
                l = -7,
                y = 21,
                t = -1e7,
                E1 = 1e7,
                C1 = !1,
                _1 = 1,
                F0 = 0,
                W0 = {
                    prefix: "",
                    groupSize: 3,
                    secondaryGroupSize: 0,
                    groupSeparator: ",",
                    decimalSeparator: ".",
                    fractionGroupSize: 0,
                    fractionGroupSeparator: " ",
                    suffix: ""
                },
                g1 = "0123456789abcdefghijklmnopqrstuvwxyz",
                w1 = !0;

            function Q1(e, Z1) {
                var I1, U1, O1, B1, x1, c1, a1, C0, K0 = this;
                if (!(K0 instanceof Q1)) return new Q1(e, Z1);
                if (Z1 == null) {
                    if (e && e._isBigNumber === !0) {
                        if (K0.s = e.s, !e.c || e.e > E1) K0.c = K0.e = null;
                        else if (e.e < t) K0.c = [K0.e = 0];
                        else K0.e = e.e, K0.c = e.c.slice();
                        return
                    }
                    if ((c1 = typeof e == "number") && e * 0 == 0) {
                        if (K0.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
                            for (B1 = 0, x1 = e; x1 >= 10; x1 /= 10, B1++);
                            if (B1 > E1) K0.c = K0.e = null;
                            else K0.e = B1, K0.c = [e];
                            return
                        }
                        C0 = String(e)
                    } else {
                        if (!Q.test(C0 = String(e))) return f(K0, C0, c1);
                        K0.s = C0.charCodeAt(0) == 45 ? (C0 = C0.slice(1), -1) : 1
                    }
                    if ((B1 = C0.indexOf(".")) > -1) C0 = C0.replace(".", "");
                    if ((x1 = C0.search(/e/i)) > 0) {
                        if (B1 < 0) B1 = x1;
                        B1 += +C0.slice(x1 + 1), C0 = C0.substring(0, x1)
                    } else if (B1 < 0) B1 = C0.length
                } else {
                    if ($(Z1, 2, g1.length, "Base"), Z1 == 10 && w1) return K0 = new Q1(e), V0(K0, u + K0.e + 1, a);
                    if (C0 = String(e), c1 = typeof e == "number") {
                        if (e * 0 != 0) return f(K0, C0, c1, Z1);
                        if (K0.s = 1 / e < 0 ? (C0 = C0.slice(1), -1) : 1, Q1.DEBUG && C0.replace(/^0\.0*|\./, "").length > 15) throw Error(F + e)
                    } else K0.s = C0.charCodeAt(0) === 45 ? (C0 = C0.slice(1), -1) : 1;
                    I1 = g1.slice(0, Z1), B1 = x1 = 0;
                    for (a1 = C0.length; x1 < a1; x1++)
                        if (I1.indexOf(U1 = C0.charAt(x1)) < 0) {
                            if (U1 == ".") {
                                if (x1 > B1) {
                                    B1 = a1;
                                    continue
                                }
                            } else if (!O1) {
                                if (C0 == C0.toUpperCase() && (C0 = C0.toLowerCase()) || C0 == C0.toLowerCase() && (C0 = C0.toUpperCase())) {
                                    O1 = !0, x1 = -1, B1 = 0;
                                    continue
                                }
                            }
                            return f(K0, String(e), c1, Z1)
                        } if (c1 = !1, C0 = j(C0, Z1, 10, K0.s), (B1 = C0.indexOf(".")) > -1) C0 = C0.replace(".", "");
                    else B1 = C0.length
                }
                for (x1 = 0; C0.charCodeAt(x1) === 48; x1++);
                for (a1 = C0.length; C0.charCodeAt(--a1) === 48;);
                if (C0 = C0.slice(x1, ++a1)) {
                    if (a1 -= x1, c1 && Q1.DEBUG && a1 > 15 && (e > W || e !== D(e))) throw Error(F + K0.s * e);
                    if ((B1 = B1 - x1 - 1) > E1) K0.c = K0.e = null;
                    else if (B1 < t) K0.c = [K0.e = 0];
                    else {
                        if (K0.e = B1, K0.c = [], x1 = (B1 + 1) % Y, B1 < 0) x1 += Y;
                        if (x1 < a1) {
                            if (x1) K0.c.push(+C0.slice(0, x1));
                            for (a1 -= Y; x1 < a1;) K0.c.push(+C0.slice(x1, x1 += Y));
                            x1 = Y - (C0 = C0.slice(x1)).length
                        } else x1 -= a1;
                        for (; x1--; C0 += "0");
                        K0.c.push(+C0)
                    }
                } else K0.c = [K0.e = 0]
            }
            Q1.clone = C, Q1.ROUND_UP = 0, Q1.ROUND_DOWN = 1, Q1.ROUND_CEIL = 2, Q1.ROUND_FLOOR = 3, Q1.ROUND_HALF_UP = 4, Q1.ROUND_HALF_DOWN = 5, Q1.ROUND_HALF_EVEN = 6, Q1.ROUND_HALF_CEIL = 7, Q1.ROUND_HALF_FLOOR = 8, Q1.EUCLID = 9, Q1.config = Q1.set = function(e) {
                var Z1, I1;
                if (e != null)
                    if (typeof e == "object") {
                        if (e.hasOwnProperty(Z1 = "DECIMAL_PLACES")) I1 = e[Z1], $(I1, 0, V, Z1), u = I1;
                        if (e.hasOwnProperty(Z1 = "ROUNDING_MODE")) I1 = e[Z1], $(I1, 0, 8, Z1), a = I1;
                        if (e.hasOwnProperty(Z1 = "EXPONENTIAL_AT"))
                            if (I1 = e[Z1], I1 && I1.pop) $(I1[0], -V, 0, Z1), $(I1[1], 0, V, Z1), l = I1[0], y = I1[1];
                            else $(I1, -V, V, Z1), l = -(y = I1 < 0 ? -I1 : I1);
                        if (e.hasOwnProperty(Z1 = "RANGE"))
                            if (I1 = e[Z1], I1 && I1.pop) $(I1[0], -V, -1, Z1), $(I1[1], 1, V, Z1), t = I1[0], E1 = I1[1];
                            else if ($(I1, -V, V, Z1), I1) t = -(E1 = I1 < 0 ? -I1 : I1);
                        else throw Error(G + Z1 + " cannot be zero: " + I1);
                        if (e.hasOwnProperty(Z1 = "CRYPTO"))
                            if (I1 = e[Z1], I1 === !!I1)
                                if (I1)
                                    if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) C1 = I1;
                                    else throw C1 = !I1, Error(G + "crypto unavailable");
                        else C1 = I1;
                        else throw Error(G + Z1 + " not true or false: " + I1);
                        if (e.hasOwnProperty(Z1 = "MODULO_MODE")) I1 = e[Z1], $(I1, 0, 9, Z1), _1 = I1;
                        if (e.hasOwnProperty(Z1 = "POW_PRECISION")) I1 = e[Z1], $(I1, 0, V, Z1), F0 = I1;
                        if (e.hasOwnProperty(Z1 = "FORMAT"))
                            if (I1 = e[Z1], typeof I1 == "object") W0 = I1;
                            else throw Error(G + Z1 + " not an object: " + I1);
                        if (e.hasOwnProperty(Z1 = "ALPHABET"))
                            if (I1 = e[Z1], typeof I1 == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(I1)) w1 = I1.slice(0, 10) == "0123456789", g1 = I1;
                            else throw Error(G + Z1 + " invalid: " + I1)
                    } else throw Error(G + "Object expected: " + e);
                return {
                    DECIMAL_PLACES: u,
                    ROUNDING_MODE: a,
                    EXPONENTIAL_AT: [l, y],
                    RANGE: [t, E1],
                    CRYPTO: C1,
                    MODULO_MODE: _1,
                    POW_PRECISION: F0,
                    FORMAT: W0,
                    ALPHABET: g1
                }
            }, Q1.isBigNumber = function(e) {
                if (!e || e._isBigNumber !== !0) return !1;
                if (!Q1.DEBUG) return !0;
                var Z1, I1, U1 = e.c,
                    O1 = e.e,
                    B1 = e.s;
                A: if ({}.toString.call(U1) == "[object Array]") {
                    if ((B1 === 1 || B1 === -1) && O1 >= -V && O1 <= V && O1 === D(O1)) {
                        if (U1[0] === 0) {
                            if (O1 === 0 && U1.length === 1) return !0;
                            break A
                        }
                        if (Z1 = (O1 + 1) % Y, Z1 < 1) Z1 += Y;
                        if (String(U1[0]).length == Z1) {
                            for (Z1 = 0; Z1 < U1.length; Z1++)
                                if (I1 = U1[Z1], I1 < 0 || I1 >= I || I1 !== D(I1)) break A;
                            if (I1 !== 0) return !0
                        }
                    }
                } else
                if (U1 === null && O1 === null && (B1 === null || B1 === 1 || B1 === -1)) return !0;
                throw Error(G + "Invalid BigNumber: " + e)
            }, Q1.maximum = Q1.max = function() {
                return H1(arguments, -1)
            }, Q1.minimum = Q1.min = function() {
                return H1(arguments, 1)
            }, Q1.random = function() {
                var e = 9007199254740992,
                    Z1 = Math.random() * e & 2097151 ? function() {
                        return D(Math.random() * e)
                    } : function() {
                        return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0)
                    };
                return function(I1) {
                    var U1, O1, B1, x1, c1, a1 = 0,
                        C0 = [],
                        K0 = new Q1(c);
                    if (I1 == null) I1 = u;
                    else $(I1, 0, V);
                    if (x1 = Z(I1 / Y), C1)
                        if (crypto.getRandomValues) {
                            U1 = crypto.getRandomValues(new Uint32Array(x1 *= 2));
                            for (; a1 < x1;)
                                if (c1 = U1[a1] * 131072 + (U1[a1 + 1] >>> 11), c1 >= 9000000000000000) O1 = crypto.getRandomValues(new Uint32Array(2)), U1[a1] = O1[0], U1[a1 + 1] = O1[1];
                                else C0.push(c1 % 100000000000000), a1 += 2;
                            a1 = x1 / 2
                        } else if (crypto.randomBytes) {
                        U1 = crypto.randomBytes(x1 *= 7);
                        for (; a1 < x1;)
                            if (c1 = (U1[a1] & 31) * 281474976710656 + U1[a1 + 1] * 1099511627776 + U1[a1 + 2] * 4294967296 + U1[a1 + 3] * 16777216 + (U1[a1 + 4] << 16) + (U1[a1 + 5] << 8) + U1[a1 + 6], c1 >= 9000000000000000) crypto.randomBytes(7).copy(U1, a1);
                            else C0.push(c1 % 100000000000000), a1 += 7;
                        a1 = x1 / 7
                    } else throw C1 = !1, Error(G + "crypto unavailable");
                    if (!C1) {
                        for (; a1 < x1;)
                            if (c1 = Z1(), c1 < 9000000000000000) C0[a1++] = c1 % 100000000000000
                    }
                    if (x1 = C0[--a1], I1 %= Y, x1 && I1) c1 = J[Y - I1], C0[a1] = D(x1 / c1) * c1;
                    for (; C0[a1] === 0; C0.pop(), a1--);
                    if (a1 < 0) C0 = [B1 = 0];
                    else {
                        for (B1 = -1; C0[0] === 0; C0.splice(0, 1), B1 -= Y);
                        for (a1 = 1, c1 = C0[0]; c1 >= 10; c1 /= 10, a1++);
                        if (a1 < Y) B1 -= Y - a1
                    }
                    return K0.e = B1, K0.c = C0, K0
                }
            }(), Q1.sum = function() {
                var e = 1,
                    Z1 = arguments,
                    I1 = new Q1(Z1[0]);
                for (; e < Z1.length;) I1 = I1.plus(Z1[e++]);
                return I1
            }, j = function() {
                var e = "0123456789";

                function Z1(I1, U1, O1, B1) {
                    var x1, c1 = [0],
                        a1, C0 = 0,
                        K0 = I1.length;
                    for (; C0 < K0;) {
                        for (a1 = c1.length; a1--; c1[a1] *= U1);
                        c1[0] += B1.indexOf(I1.charAt(C0++));
                        for (x1 = 0; x1 < c1.length; x1++)
                            if (c1[x1] > O1 - 1) {
                                if (c1[x1 + 1] == null) c1[x1 + 1] = 0;
                                c1[x1 + 1] += c1[x1] / O1 | 0, c1[x1] %= O1
                            }
                    }
                    return c1.reverse()
                }
                return function(I1, U1, O1, B1, x1) {
                    var c1, a1, C0, K0, R0, wA, u0, TA, dA = I1.indexOf("."),
                        J2 = u,
                        s2 = a;
                    if (dA >= 0) K0 = F0, F0 = 0, I1 = I1.replace(".", ""), TA = new Q1(U1), wA = TA.pow(I1.length - dA), F0 = K0, TA.c = Z1(R(H(wA.c), wA.e, "0"), 10, O1, e), TA.e = TA.c.length;
                    u0 = Z1(I1, U1, O1, x1 ? (c1 = g1, e) : (c1 = e, g1)), C0 = K0 = u0.length;
                    for (; u0[--K0] == 0; u0.pop());
                    if (!u0[0]) return c1.charAt(0);
                    if (dA < 0) --C0;
                    else wA.c = u0, wA.e = C0, wA.s = B1, wA = P(wA, TA, J2, s2, O1), u0 = wA.c, R0 = wA.r, C0 = wA.e;
                    if (a1 = C0 + J2 + 1, dA = u0[a1], K0 = O1 / 2, R0 = R0 || a1 < 0 || u0[a1 + 1] != null, R0 = s2 < 4 ? (dA != null || R0) && (s2 == 0 || s2 == (wA.s < 0 ? 3 : 2)) : dA > K0 || dA == K0 && (s2 == 4 || R0 || s2 == 6 && u0[a1 - 1] & 1 || s2 == (wA.s < 0 ? 8 : 7)), a1 < 1 || !u0[0]) I1 = R0 ? R(c1.charAt(1), -J2, c1.charAt(0)) : c1.charAt(0);
                    else {
                        if (u0.length = a1, R0) {
                            for (--O1; ++u0[--a1] > O1;)
                                if (u0[a1] = 0, !a1) ++C0, u0 = [1].concat(u0)
                        }
                        for (K0 = u0.length; !u0[--K0];);
                        for (dA = 0, I1 = ""; dA <= K0; I1 += c1.charAt(u0[dA++]));
                        I1 = R(I1, C0, c1.charAt(0))
                    }
                    return I1
                }
            }(), P = function() {
                function e(U1, O1, B1) {
                    var x1, c1, a1, C0, K0 = 0,
                        R0 = U1.length,
                        wA = O1 % X,
                        u0 = O1 / X | 0;
                    for (U1 = U1.slice(); R0--;) a1 = U1[R0] % X, C0 = U1[R0] / X | 0, x1 = u0 * a1 + C0 * wA, c1 = wA * a1 + x1 % X * X + K0, K0 = (c1 / B1 | 0) + (x1 / X | 0) + u0 * C0, U1[R0] = c1 % B1;
                    if (K0) U1 = [K0].concat(U1);
                    return U1
                }

                function Z1(U1, O1, B1, x1) {
                    var c1, a1;
                    if (B1 != x1) a1 = B1 > x1 ? 1 : -1;
                    else
                        for (c1 = a1 = 0; c1 < B1; c1++)
                            if (U1[c1] != O1[c1]) {
                                a1 = U1[c1] > O1[c1] ? 1 : -1;
                                break
                            } return a1
                }

                function I1(U1, O1, B1, x1) {
                    var c1 = 0;
                    for (; B1--;) U1[B1] -= c1, c1 = U1[B1] < O1[B1] ? 1 : 0, U1[B1] = c1 * x1 + U1[B1] - O1[B1];
                    for (; !U1[0] && U1.length > 1; U1.splice(0, 1));
                }
                return function(U1, O1, B1, x1, c1) {
                    var a1, C0, K0, R0, wA, u0, TA, dA, J2, s2, N2, U9, m6, kA, G2, T2, pA, bA = U1.s == O1.s ? 1 : -1,
                        r2 = U1.c,
                        xB = O1.c;
                    if (!r2 || !r2[0] || !xB || !xB[0]) return new Q1(!U1.s || !O1.s || (r2 ? xB && r2[0] == xB[0] : !xB) ? NaN : r2 && r2[0] == 0 || !xB ? bA * 0 : bA / 0);
                    if (dA = new Q1(bA), J2 = dA.c = [], C0 = U1.e - O1.e, bA = B1 + C0 + 1, !c1) c1 = I, C0 = K(U1.e / Y) - K(O1.e / Y), bA = bA / Y | 0;
                    for (K0 = 0; xB[K0] == (r2[K0] || 0); K0++);
                    if (xB[K0] > (r2[K0] || 0)) C0--;
                    if (bA < 0) J2.push(1), R0 = !0;
                    else {
                        if (kA = r2.length, T2 = xB.length, K0 = 0, bA += 2, wA = D(c1 / (xB[0] + 1)), wA > 1) xB = e(xB, wA, c1), r2 = e(r2, wA, c1), T2 = xB.length, kA = r2.length;
                        m6 = T2, s2 = r2.slice(0, T2), N2 = s2.length;
                        for (; N2 < T2; s2[N2++] = 0);
                        if (pA = xB.slice(), pA = [0].concat(pA), G2 = xB[0], xB[1] >= c1 / 2) G2++;
                        do {
                            if (wA = 0, a1 = Z1(xB, s2, T2, N2), a1 < 0) {
                                if (U9 = s2[0], T2 != N2) U9 = U9 * c1 + (s2[1] || 0);
                                if (wA = D(U9 / G2), wA > 1) {
                                    if (wA >= c1) wA = c1 - 1;
                                    u0 = e(xB, wA, c1), TA = u0.length, N2 = s2.length;
                                    while (Z1(u0, s2, TA, N2) == 1) wA--, I1(u0, T2 < TA ? pA : xB, TA, c1), TA = u0.length, a1 = 1
                                } else {
                                    if (wA == 0) a1 = wA = 1;
                                    u0 = xB.slice(), TA = u0.length
                                }
                                if (TA < N2) u0 = [0].concat(u0);
                                if (I1(s2, u0, N2, c1), N2 = s2.length, a1 == -1)
                                    while (Z1(xB, s2, T2, N2) < 1) wA++, I1(s2, T2 < N2 ? pA : xB, N2, c1), N2 = s2.length
                            } else if (a1 === 0) wA++, s2 = [0];
                            if (J2[K0++] = wA, s2[0]) s2[N2++] = r2[m6] || 0;
                            else s2 = [r2[m6]], N2 = 1
                        } while ((m6++ < kA || s2[0] != null) && bA--);
                        if (R0 = s2[0] != null, !J2[0]) J2.splice(0, 1)
                    }
                    if (c1 == I) {
                        for (K0 = 1, bA = J2[0]; bA >= 10; bA /= 10, K0++);
                        V0(dA, B1 + (dA.e = K0 + C0 * Y - 1) + 1, x1, R0)
                    } else dA.e = C0, dA.r = +R0;
                    return dA
                }
            }();

            function k1(e, Z1, I1, U1) {
                var O1, B1, x1, c1, a1;
                if (I1 == null) I1 = a;
                else $(I1, 0, 8);
                if (!e.c) return e.toString();
                if (O1 = e.c[0], x1 = e.e, Z1 == null) a1 = H(e.c), a1 = U1 == 1 || U1 == 2 && (x1 <= l || x1 >= y) ? N(a1, x1) : R(a1, x1, "0");
                else if (e = V0(new Q1(e), Z1, I1), B1 = e.e, a1 = H(e.c), c1 = a1.length, U1 == 1 || U1 == 2 && (Z1 <= B1 || B1 <= l)) {
                    for (; c1 < Z1; a1 += "0", c1++);
                    a1 = N(a1, B1)
                } else if (Z1 -= x1, a1 = R(a1, B1, "0"), B1 + 1 > c1) {
                    if (--Z1 > 0)
                        for (a1 += "."; Z1--; a1 += "0");
                } else if (Z1 += B1 - c1, Z1 > 0) {
                    if (B1 + 1 == c1) a1 += ".";
                    for (; Z1--; a1 += "0");
                }
                return e.s < 0 && O1 ? "-" + a1 : a1
            }

            function H1(e, Z1) {
                var I1, U1, O1 = 1,
                    B1 = new Q1(e[0]);
                for (; O1 < e.length; O1++)
                    if (U1 = new Q1(e[O1]), !U1.s || (I1 = z(B1, U1)) === Z1 || I1 === 0 && B1.s === Z1) B1 = U1;
                return B1
            }

            function A0(e, Z1, I1) {
                var U1 = 1,
                    O1 = Z1.length;
                for (; !Z1[--O1]; Z1.pop());
                for (O1 = Z1[0]; O1 >= 10; O1 /= 10, U1++);
                if ((I1 = U1 + I1 * Y - 1) > E1) e.c = e.e = null;
                else if (I1 < t) e.c = [e.e = 0];
                else e.e = I1, e.c = Z1;
                return e
            }
            f = function() {
                var e = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
                    Z1 = /^([^.]+)\.$/,
                    I1 = /^\.([^.]+)$/,
                    U1 = /^-?(Infinity|NaN)$/,
                    O1 = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
                return function(B1, x1, c1, a1) {
                    var C0, K0 = c1 ? x1 : x1.replace(O1, "");
                    if (U1.test(K0)) B1.s = isNaN(K0) ? null : K0 < 0 ? -1 : 1;
                    else {
                        if (!c1) {
                            if (K0 = K0.replace(e, function(R0, wA, u0) {
                                    return C0 = (u0 = u0.toLowerCase()) == "x" ? 16 : u0 == "b" ? 2 : 8, !a1 || a1 == C0 ? wA : R0
                                }), a1) C0 = a1, K0 = K0.replace(Z1, "$1").replace(I1, "0.$1");
                            if (x1 != K0) return new Q1(K0, C0)
                        }
                        if (Q1.DEBUG) throw Error(G + "Not a" + (a1 ? " base " + a1 : "") + " number: " + x1);
                        B1.s = null
                    }
                    B1.c = B1.e = null
                }
            }();

            function V0(e, Z1, I1, U1) {
                var O1, B1, x1, c1, a1, C0, K0, R0 = e.c,
                    wA = J;
                if (R0) {
                    A: {
                        for (O1 = 1, c1 = R0[0]; c1 >= 10; c1 /= 10, O1++);
                        if (B1 = Z1 - O1, B1 < 0) B1 += Y,
                        x1 = Z1,
                        a1 = R0[C0 = 0],
                        K0 = D(a1 / wA[O1 - x1 - 1] % 10);
                        else if (C0 = Z((B1 + 1) / Y), C0 >= R0.length)
                            if (U1) {
                                for (; R0.length <= C0; R0.push(0));
                                a1 = K0 = 0, O1 = 1, B1 %= Y, x1 = B1 - Y + 1
                            } else break A;
                        else {
                            a1 = c1 = R0[C0];
                            for (O1 = 1; c1 >= 10; c1 /= 10, O1++);
                            B1 %= Y, x1 = B1 - Y + O1, K0 = x1 < 0 ? 0 : D(a1 / wA[O1 - x1 - 1] % 10)
                        }
                        if (U1 = U1 || Z1 < 0 || R0[C0 + 1] != null || (x1 < 0 ? a1 : a1 % wA[O1 - x1 - 1]), U1 = I1 < 4 ? (K0 || U1) && (I1 == 0 || I1 == (e.s < 0 ? 3 : 2)) : K0 > 5 || K0 == 5 && (I1 == 4 || U1 || I1 == 6 && (B1 > 0 ? x1 > 0 ? a1 / wA[O1 - x1] : 0 : R0[C0 - 1]) % 10 & 1 || I1 == (e.s < 0 ? 8 : 7)), Z1 < 1 || !R0[0]) {
                            if (R0.length = 0, U1) Z1 -= e.e + 1, R0[0] = wA[(Y - Z1 % Y) % Y], e.e = -Z1 || 0;
                            else R0[0] = e.e = 0;
                            return e
                        }
                        if (B1 == 0) R0.length = C0,
                        c1 = 1,
                        C0--;
                        else R0.length = C0 + 1,
                        c1 = wA[Y - B1],
                        R0[C0] = x1 > 0 ? D(a1 / wA[O1 - x1] % wA[x1]) * c1 : 0;
                        if (U1)
                            for (;;)
                                if (C0 == 0) {
                                    for (B1 = 1, x1 = R0[0]; x1 >= 10; x1 /= 10, B1++);
                                    x1 = R0[0] += c1;
                                    for (c1 = 1; x1 >= 10; x1 /= 10, c1++);
                                    if (B1 != c1) {
                                        if (e.e++, R0[0] == I) R0[0] = 1
                                    }
                                    break
                                } else {
                                    if (R0[C0] += c1, R0[C0] != I) break;
                                    R0[C0--] = 0, c1 = 1
                                } for (B1 = R0.length; R0[--B1] === 0; R0.pop());
                    }
                    if (e.e > E1) e.c = e.e = null;
                    else if (e.e < t) e.c = [e.e = 0]
                }
                return e
            }

            function o1(e) {
                var Z1, I1 = e.e;
                if (I1 === null) return e.toString();
                return Z1 = H(e.c), Z1 = I1 <= l || I1 >= y ? N(Z1, I1) : R(Z1, I1, "0"), e.s < 0 ? "-" + Z1 : Z1
            }
            if (k.absoluteValue = k.abs = function() {
                    var e = new Q1(this);
                    if (e.s < 0) e.s = 1;
                    return e
                }, k.comparedTo = function(e, Z1) {
                    return z(this, new Q1(e, Z1))
                }, k.decimalPlaces = k.dp = function(e, Z1) {
                    var I1, U1, O1, B1 = this;
                    if (e != null) {
                        if ($(e, 0, V), Z1 == null) Z1 = a;
                        else $(Z1, 0, 8);
                        return V0(new Q1(B1), e + B1.e + 1, Z1)
                    }
                    if (!(I1 = B1.c)) return null;
                    if (U1 = ((O1 = I1.length - 1) - K(this.e / Y)) * Y, O1 = I1[O1])
                        for (; O1 % 10 == 0; O1 /= 10, U1--);
                    if (U1 < 0) U1 = 0;
                    return U1
                }, k.dividedBy = k.div = function(e, Z1) {
                    return P(this, new Q1(e, Z1), u, a)
                }, k.dividedToIntegerBy = k.idiv = function(e, Z1) {
                    return P(this, new Q1(e, Z1), 0, 1)
                }, k.exponentiatedBy = k.pow = function(e, Z1) {
                    var I1, U1, O1, B1, x1, c1, a1, C0, K0, R0 = this;
                    if (e = new Q1(e), e.c && !e.isInteger()) throw Error(G + "Exponent not an integer: " + o1(e));
                    if (Z1 != null) Z1 = new Q1(Z1);
                    if (c1 = e.e > 14, !R0.c || !R0.c[0] || R0.c[0] == 1 && !R0.e && R0.c.length == 1 || !e.c || !e.c[0]) return K0 = new Q1(Math.pow(+o1(R0), c1 ? e.s * (2 - L(e)) : +o1(e))), Z1 ? K0.mod(Z1) : K0;
                    if (a1 = e.s < 0, Z1) {
                        if (Z1.c ? !Z1.c[0] : !Z1.s) return new Q1(NaN);
                        if (U1 = !a1 && R0.isInteger() && Z1.isInteger(), U1) R0 = R0.mod(Z1)
                    } else if (e.e > 9 && (R0.e > 0 || R0.e < -1 || (R0.e == 0 ? R0.c[0] > 1 || c1 && R0.c[1] >= 240000000 : R0.c[0] < 80000000000000 || c1 && R0.c[0] <= 99999750000000))) {
                        if (B1 = R0.s < 0 && L(e) ? -0 : 0, R0.e > -1) B1 = 1 / B1;
                        return new Q1(a1 ? 1 / B1 : B1)
                    } else if (F0) B1 = Z(F0 / Y + 2);
                    if (c1) {
                        if (I1 = new Q1(0.5), a1) e.s = 1;
                        C0 = L(e)
                    } else O1 = Math.abs(+o1(e)), C0 = O1 % 2;
                    K0 = new Q1(c);
                    for (;;) {
                        if (C0) {
                            if (K0 = K0.times(R0), !K0.c) break;
                            if (B1) {
                                if (K0.c.length > B1) K0.c.length = B1
                            } else if (U1) K0 = K0.mod(Z1)
                        }
                        if (O1) {
                            if (O1 = D(O1 / 2), O1 === 0) break;
                            C0 = O1 % 2
                        } else if (e = e.times(I1), V0(e, e.e + 1, 1), e.e > 14) C0 = L(e);
                        else {
                            if (O1 = +o1(e), O1 === 0) break;
                            C0 = O1 % 2
                        }
                        if (R0 = R0.times(R0), B1) {
                            if (R0.c && R0.c.length > B1) R0.c.length = B1
                        } else if (U1) R0 = R0.mod(Z1)
                    }
                    if (U1) return K0;
                    if (a1) K0 = c.div(K0);
                    return Z1 ? K0.mod(Z1) : B1 ? V0(K0, F0, a, x1) : K0
                }, k.integerValue = function(e) {
                    var Z1 = new Q1(this);
                    if (e == null) e = a;
                    else $(e, 0, 8);
                    return V0(Z1, Z1.e + 1, e)
                }, k.isEqualTo = k.eq = function(e, Z1) {
                    return z(this, new Q1(e, Z1)) === 0
                }, k.isFinite = function() {
                    return !!this.c
                }, k.isGreaterThan = k.gt = function(e, Z1) {
                    return z(this, new Q1(e, Z1)) > 0
                }, k.isGreaterThanOrEqualTo = k.gte = function(e, Z1) {
                    return (Z1 = z(this, new Q1(e, Z1))) === 1 || Z1 === 0
                }, k.isInteger = function() {
                    return !!this.c && K(this.e / Y) > this.c.length - 2
                }, k.isLessThan = k.lt = function(e, Z1) {
                    return z(this, new Q1(e, Z1)) < 0
                }, k.isLessThanOrEqualTo = k.lte = function(e, Z1) {
                    return (Z1 = z(this, new Q1(e, Z1))) === -1 || Z1 === 0
                }, k.isNaN = function() {
                    return !this.s
                }, k.isNegative = function() {
                    return this.s < 0
                }, k.isPositive = function() {
                    return this.s > 0
                }, k.isZero = function() {
                    return !!this.c && this.c[0] == 0
                }, k.minus = function(e, Z1) {
                    var I1, U1, O1, B1, x1 = this,
                        c1 = x1.s;
                    if (e = new Q1(e, Z1), Z1 = e.s, !c1 || !Z1) return new Q1(NaN);
                    if (c1 != Z1) return e.s = -Z1, x1.plus(e);
                    var a1 = x1.e / Y,
                        C0 = e.e / Y,
                        K0 = x1.c,
                        R0 = e.c;
                    if (!a1 || !C0) {
                        if (!K0 || !R0) return K0 ? (e.s = -Z1, e) : new Q1(R0 ? x1 : NaN);
                        if (!K0[0] || !R0[0]) return R0[0] ? (e.s = -Z1, e) : new Q1(K0[0] ? x1 : a == 3 ? -0 : 0)
                    }
                    if (a1 = K(a1), C0 = K(C0), K0 = K0.slice(), c1 = a1 - C0) {
                        if (B1 = c1 < 0) c1 = -c1, O1 = K0;
                        else C0 = a1, O1 = R0;
                        O1.reverse();
                        for (Z1 = c1; Z1--; O1.push(0));
                        O1.reverse()
                    } else {
                        U1 = (B1 = (c1 = K0.length) < (Z1 = R0.length)) ? c1 : Z1;
                        for (c1 = Z1 = 0; Z1 < U1; Z1++)
                            if (K0[Z1] != R0[Z1]) {
                                B1 = K0[Z1] < R0[Z1];
                                break
                            }
                    }
                    if (B1) O1 = K0, K0 = R0, R0 = O1, e.s = -e.s;
                    if (Z1 = (U1 = R0.length) - (I1 = K0.length), Z1 > 0)
                        for (; Z1--; K0[I1++] = 0);
                    Z1 = I - 1;
                    for (; U1 > c1;) {
                        if (K0[--U1] < R0[U1]) {
                            for (I1 = U1; I1 && !K0[--I1]; K0[I1] = Z1);
                            --K0[I1], K0[U1] += I
                        }
                        K0[U1] -= R0[U1]
                    }
                    for (; K0[0] == 0; K0.splice(0, 1), --C0);
                    if (!K0[0]) return e.s = a == 3 ? -1 : 1, e.c = [e.e = 0], e;
                    return A0(e, K0, C0)
                }, k.modulo = k.mod = function(e, Z1) {
                    var I1, U1, O1 = this;
                    if (e = new Q1(e, Z1), !O1.c || !e.s || e.c && !e.c[0]) return new Q1(NaN);
                    else if (!e.c || O1.c && !O1.c[0]) return new Q1(O1);
                    if (_1 == 9) U1 = e.s, e.s = 1, I1 = P(O1, e, 0, 3), e.s = U1, I1.s *= U1;
                    else I1 = P(O1, e, 0, _1);
                    if (e = O1.minus(I1.times(e)), !e.c[0] && _1 == 1) e.s = O1.s;
                    return e
                }, k.multipliedBy = k.times = function(e, Z1) {
                    var I1, U1, O1, B1, x1, c1, a1, C0, K0, R0, wA, u0, TA, dA, J2, s2 = this,
                        N2 = s2.c,
                        U9 = (e = new Q1(e, Z1)).c;
                    if (!N2 || !U9 || !N2[0] || !U9[0]) {
                        if (!s2.s || !e.s || N2 && !N2[0] && !U9 || U9 && !U9[0] && !N2) e.c = e.e = e.s = null;
                        else if (e.s *= s2.s, !N2 || !U9) e.c = e.e = null;
                        else e.c = [0], e.e = 0;
                        return e
                    }
                    if (U1 = K(s2.e / Y) + K(e.e / Y), e.s *= s2.s, a1 = N2.length, R0 = U9.length, a1 < R0) TA = N2, N2 = U9, U9 = TA, O1 = a1, a1 = R0, R0 = O1;
                    for (O1 = a1 + R0, TA = []; O1--; TA.push(0));
                    dA = I, J2 = X;
                    for (O1 = R0; --O1 >= 0;) {
                        I1 = 0, wA = U9[O1] % J2, u0 = U9[O1] / J2 | 0;
                        for (x1 = a1, B1 = O1 + x1; B1 > O1;) C0 = N2[--x1] % J2, K0 = N2[x1] / J2 | 0, c1 = u0 * C0 + K0 * wA, C0 = wA * C0 + c1 % J2 * J2 + TA[B1] + I1, I1 = (C0 / dA | 0) + (c1 / J2 | 0) + u0 * K0, TA[B1--] = C0 % dA;
                        TA[B1] = I1
                    }
                    if (I1) ++U1;
                    else TA.splice(0, 1);
                    return A0(e, TA, U1)
                }, k.negated = function() {
                    var e = new Q1(this);
                    return e.s = -e.s || null, e
                }, k.plus = function(e, Z1) {
                    var I1, U1 = this,
                        O1 = U1.s;
                    if (e = new Q1(e, Z1), Z1 = e.s, !O1 || !Z1) return new Q1(NaN);
                    if (O1 != Z1) return e.s = -Z1, U1.minus(e);
                    var B1 = U1.e / Y,
                        x1 = e.e / Y,
                        c1 = U1.c,
                        a1 = e.c;
                    if (!B1 || !x1) {
                        if (!c1 || !a1) return new Q1(O1 / 0);
                        if (!c1[0] || !a1[0]) return a1[0] ? e : new Q1(c1[0] ? U1 : O1 * 0)
                    }
                    if (B1 = K(B1), x1 = K(x1), c1 = c1.slice(), O1 = B1 - x1) {
                        if (O1 > 0) x1 = B1, I1 = a1;
                        else O1 = -O1, I1 = c1;
                        I1.reverse();
                        for (; O1--; I1.push(0));
                        I1.reverse()
                    }
                    if (O1 = c1.length, Z1 = a1.length, O1 - Z1 < 0) I1 = a1, a1 = c1, c1 = I1, Z1 = O1;
                    for (O1 = 0; Z1;) O1 = (c1[--Z1] = c1[Z1] + a1[Z1] + O1) / I | 0, c1[Z1] = I === c1[Z1] ? 0 : c1[Z1] % I;
                    if (O1) c1 = [O1].concat(c1), ++x1;
                    return A0(e, c1, x1)
                }, k.precision = k.sd = function(e, Z1) {
                    var I1, U1, O1, B1 = this;
                    if (e != null && e !== !!e) {
                        if ($(e, 1, V), Z1 == null) Z1 = a;
                        else $(Z1, 0, 8);
                        return V0(new Q1(B1), e, Z1)
                    }
                    if (!(I1 = B1.c)) return null;
                    if (O1 = I1.length - 1, U1 = O1 * Y + 1, O1 = I1[O1]) {
                        for (; O1 % 10 == 0; O1 /= 10, U1--);
                        for (O1 = I1[0]; O1 >= 10; O1 /= 10, U1++);
                    }
                    if (e && B1.e + 1 > U1) U1 = B1.e + 1;
                    return U1
                }, k.shiftedBy = function(e) {
                    return $(e, -W, W), this.times("1e" + e)
                }, k.squareRoot = k.sqrt = function() {
                    var e, Z1, I1, U1, O1, B1 = this,
                        x1 = B1.c,
                        c1 = B1.s,
                        a1 = B1.e,
                        C0 = u + 4,
                        K0 = new Q1("0.5");
                    if (c1 !== 1 || !x1 || !x1[0]) return new Q1(!c1 || c1 < 0 && (!x1 || x1[0]) ? NaN : x1 ? B1 : 1 / 0);
                    if (c1 = Math.sqrt(+o1(B1)), c1 == 0 || c1 == 1 / 0) {
                        if (Z1 = H(x1), (Z1.length + a1) % 2 == 0) Z1 += "0";
                        if (c1 = Math.sqrt(+Z1), a1 = K((a1 + 1) / 2) - (a1 < 0 || a1 % 2), c1 == 1 / 0) Z1 = "5e" + a1;
                        else Z1 = c1.toExponential(), Z1 = Z1.slice(0, Z1.indexOf("e") + 1) + a1;
                        I1 = new Q1(Z1)
                    } else I1 = new Q1(c1 + "");
                    if (I1.c[0]) {
                        if (a1 = I1.e, c1 = a1 + C0, c1 < 3) c1 = 0;
                        for (;;)
                            if (O1 = I1, I1 = K0.times(O1.plus(P(B1, O1, C0, 1))), H(O1.c).slice(0, c1) === (Z1 = H(I1.c)).slice(0, c1)) {
                                if (I1.e < a1) --c1;
                                if (Z1 = Z1.slice(c1 - 3, c1 + 1), Z1 == "9999" || !U1 && Z1 == "4999") {
                                    if (!U1) {
                                        if (V0(O1, O1.e + u + 2, 0), O1.times(O1).eq(B1)) {
                                            I1 = O1;
                                            break
                                        }
                                    }
                                    C0 += 4, c1 += 4, U1 = 1
                                } else {
                                    if (!+Z1 || !+Z1.slice(1) && Z1.charAt(0) == "5") V0(I1, I1.e + u + 2, 1), e = !I1.times(I1).eq(B1);
                                    break
                                }
                            }
                    }
                    return V0(I1, I1.e + u + 1, a, e)
                }, k.toExponential = function(e, Z1) {
                    if (e != null) $(e, 0, V), e++;
                    return k1(this, e, Z1, 1)
                }, k.toFixed = function(e, Z1) {
                    if (e != null) $(e, 0, V), e = e + this.e + 1;
                    return k1(this, e, Z1)
                }, k.toFormat = function(e, Z1, I1) {
                    var U1, O1 = this;
                    if (I1 == null)
                        if (e != null && Z1 && typeof Z1 == "object") I1 = Z1, Z1 = null;
                        else if (e && typeof e == "object") I1 = e, e = Z1 = null;
                    else I1 = W0;
                    else if (typeof I1 != "object") throw Error(G + "Argument not an object: " + I1);
                    if (U1 = O1.toFixed(e, Z1), O1.c) {
                        var B1, x1 = U1.split("."),
                            c1 = +I1.groupSize,
                            a1 = +I1.secondaryGroupSize,
                            C0 = I1.groupSeparator || "",
                            K0 = x1[0],
                            R0 = x1[1],
                            wA = O1.s < 0,
                            u0 = wA ? K0.slice(1) : K0,
                            TA = u0.length;
                        if (a1) B1 = c1, c1 = a1, a1 = B1, TA -= B1;
                        if (c1 > 0 && TA > 0) {
                            B1 = TA % c1 || c1, K0 = u0.substr(0, B1);
                            for (; B1 < TA; B1 += c1) K0 += C0 + u0.substr(B1, c1);
                            if (a1 > 0) K0 += C0 + u0.slice(B1);
                            if (wA) K0 = "-" + K0
                        }
                        U1 = R0 ? K0 + (I1.decimalSeparator || "") + ((a1 = +I1.fractionGroupSize) ? R0.replace(new RegExp("\\d{" + a1 + "}\\B", "g"), "$&" + (I1.fractionGroupSeparator || "")) : R0) : K0
                    }
                    return (I1.prefix || "") + U1 + (I1.suffix || "")
                }, k.toFraction = function(e) {
                    var Z1, I1, U1, O1, B1, x1, c1, a1, C0, K0, R0, wA, u0 = this,
                        TA = u0.c;
                    if (e != null) {
                        if (c1 = new Q1(e), !c1.isInteger() && (c1.c || c1.s !== 1) || c1.lt(c)) throw Error(G + "Argument " + (c1.isInteger() ? "out of range: " : "not an integer: ") + o1(c1))
                    }
                    if (!TA) return new Q1(u0);
                    Z1 = new Q1(c), C0 = I1 = new Q1(c), U1 = a1 = new Q1(c), wA = H(TA), B1 = Z1.e = wA.length - u0.e - 1, Z1.c[0] = J[(x1 = B1 % Y) < 0 ? Y + x1 : x1], e = !e || c1.comparedTo(Z1) > 0 ? B1 > 0 ? Z1 : C0 : c1, x1 = E1, E1 = 1 / 0, c1 = new Q1(wA), a1.c[0] = 0;
                    for (;;) {
                        if (K0 = P(c1, Z1, 0, 1), O1 = I1.plus(K0.times(U1)), O1.comparedTo(e) == 1) break;
                        I1 = U1, U1 = O1, C0 = a1.plus(K0.times(O1 = C0)), a1 = O1, Z1 = c1.minus(K0.times(O1 = Z1)), c1 = O1
                    }
                    return O1 = P(e.minus(I1), U1, 0, 1), a1 = a1.plus(O1.times(C0)), I1 = I1.plus(O1.times(U1)), a1.s = C0.s = u0.s, B1 = B1 * 2, R0 = P(C0, U1, B1, a).minus(u0).abs().comparedTo(P(a1, I1, B1, a).minus(u0).abs()) < 1 ? [C0, U1] : [a1, I1], E1 = x1, R0
                }, k.toNumber = function() {
                    return +o1(this)
                }, k.toPrecision = function(e, Z1) {
                    if (e != null) $(e, 1, V);
                    return k1(this, e, Z1, 2)
                }, k.toString = function(e) {
                    var Z1, I1 = this,
                        U1 = I1.s,
                        O1 = I1.e;
                    if (O1 === null)
                        if (U1) {
                            if (Z1 = "Infinity", U1 < 0) Z1 = "-" + Z1
                        } else Z1 = "NaN";
                    else {
                        if (e == null) Z1 = O1 <= l || O1 >= y ? N(H(I1.c), O1) : R(H(I1.c), O1, "0");
                        else if (e === 10 && w1) I1 = V0(new Q1(I1), u + O1 + 1, a), Z1 = R(H(I1.c), I1.e, "0");
                        else $(e, 2, g1.length, "Base"), Z1 = j(R(H(I1.c), O1, "0"), 10, e, U1, !0);
                        if (U1 < 0 && I1.c[0]) Z1 = "-" + Z1
                    }
                    return Z1
                }, k.valueOf = k.toJSON = function() {
                    return o1(this)
                }, k._isBigNumber = !0, O != null) Q1.set(O);
            return Q1
        }

        function K(O) {
            var P = O | 0;
            return O > 0 || O === P ? P : P - 1
        }

        function H(O) {
            var P, j, f = 1,
                k = O.length,
                c = O[0] + "";
            for (; f < k;) {
                P = O[f++] + "", j = Y - P.length;
                for (; j--; P = "0" + P);
                c += P
            }
            for (k = c.length; c.charCodeAt(--k) === 48;);
            return c.slice(0, k + 1 || 1)
        }

        function z(O, P) {
            var j, f, k = O.c,
                c = P.c,
                u = O.s,
                a = P.s,
                l = O.e,
                y = P.e;
            if (!u || !a) return null;
            if (j = k && !k[0], f = c && !c[0], j || f) return j ? f ? 0 : -a : u;
            if (u != a) return u;
            if (j = u < 0, f = l == y, !k || !c) return f ? 0 : !k ^ j ? 1 : -1;
            if (!f) return l > y ^ j ? 1 : -1;
            a = (l = k.length) < (y = c.length) ? l : y;
            for (u = 0; u < a; u++)
                if (k[u] != c[u]) return k[u] > c[u] ^ j ? 1 : -1;
            return l == y ? 0 : l > y ^ j ? 1 : -1
        }

        function $(O, P, j, f) {
            if (O < P || O > j || O !== D(O)) throw Error(G + (f || "Argument") + (typeof O == "number" ? O < P || O > j ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(O))
        }

        function L(O) {
            var P = O.c.length - 1;
            return K(O.e / Y) == P && O.c[P] % 2 != 0
        }

        function N(O, P) {
            return (O.length > 1 ? O.charAt(0) + "." + O.slice(1) : O) + (P < 0 ? "e" : "e+") + P
        }

        function R(O, P, j) {
            var f, k;
            if (P < 0) {
                for (k = j + "."; ++P; k += j);
                O = k + O
            } else if (f = O.length, ++P > f) {
                for (k = j, P -= f; --P; k += j);
                O += k
            } else if (P < f) O = O.slice(0, P) + "." + O.slice(P);
            return O
        }
        if (B = C(), B.default = B.BigNumber = B, typeof define == "function" && define.amd) define(function() {
            return B
        });
        else if (typeof vx1 != "undefined" && vx1.exports) vx1.exports = B;
        else {
            if (!A) A = typeof self != "undefined" && self ? self : window;
            A.BigNumber = B
        }
    })(fwB)
});