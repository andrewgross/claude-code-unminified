/* chunk:531 bytes:[12491507, 12538652) size:47145 source:unpacked-cli.js */
var yn4 = (() => {
    var A = typeof document != "undefined" && document.currentScript ? document.currentScript.src : void 0;
    return function(B = {}) {
        Y || (Y = B !== void 0 ? B : {}), Y.ready = new Promise(function(v1, u1) {
            W = v1, J = u1
        });
        var Q, Z, D = Object.assign({}, Y),
            G = "";
        typeof document != "undefined" && document.currentScript && (G = document.currentScript.src), A && (G = A), G = G.indexOf("blob:") !== 0 ? G.substr(0, G.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
        var F = console.log.bind(console),
            I = console.warn.bind(console);
        Object.assign(Y, D), D = null, typeof WebAssembly != "object" && l("no native wasm support detected");
        var Y, W, J, X, V = !1;

        function C(v1, u1, N0) {
            N0 = u1 + N0;
            for (var x0 = ""; !(u1 >= N0);) {
                var w0 = v1[u1++];
                if (!w0) break;
                if (128 & w0) {
                    var h0 = 63 & v1[u1++];
                    if ((224 & w0) == 192) x0 += String.fromCharCode((31 & w0) << 6 | h0);
                    else {
                        var VA = 63 & v1[u1++];
                        65536 > (w0 = (240 & w0) == 224 ? (15 & w0) << 12 | h0 << 6 | VA : (7 & w0) << 18 | h0 << 12 | VA << 6 | 63 & v1[u1++]) ? x0 += String.fromCharCode(w0) : (w0 -= 65536, x0 += String.fromCharCode(55296 | w0 >> 10, 56320 | 1023 & w0))
                    }
                } else x0 += String.fromCharCode(w0)
            }
            return x0
        }

        function K() {
            var v1 = X.buffer;
            Y.HEAP8 = H = new Int8Array(v1), Y.HEAP16 = $ = new Int16Array(v1), Y.HEAP32 = N = new Int32Array(v1), Y.HEAPU8 = z = new Uint8Array(v1), Y.HEAPU16 = L = new Uint16Array(v1), Y.HEAPU32 = R = new Uint32Array(v1), Y.HEAPF32 = O = new Float32Array(v1), Y.HEAPF64 = P = new Float64Array(v1)
        }
        var H, z, $, L, N, R, O, P, j, f = [],
            k = [],
            c = [],
            u = 0,
            a = null;

        function l(v1) {
            throw I(v1 = "Aborted(" + v1 + ")"), V = !0, J(v1 = new WebAssembly.RuntimeError(v1 + ". Build with -sASSERTIONS for more info.")), v1
        }

        function y() {
            return Q.startsWith("data:application/octet-stream;base64,")
        }

        function t() {
            try {
                throw "both async and sync fetching of the wasm failed"
            } catch (v1) {
                l(v1)
            }
        }

        function E1(v1) {
            for (; 0 < v1.length;) v1.shift()(Y)
        }

        function C1(v1) {
            if (v1 === void 0) return "_unknown";
            var u1 = (v1 = v1.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
            return 48 <= u1 && 57 >= u1 ? "_" + v1 : v1
        }

        function _1(v1, u1) {
            return v1 = C1(v1),
                function() {
                    return u1.apply(this, arguments)
                }
        }
        Q = "yoga.wasm", y() || (Q = G + Q);
        var F0 = [{}, {
                value: void 0
            }, {
                value: null
            }, {
                value: !0
            }, {
                value: !1
            }],
            W0 = [];

        function g1(v1) {
            var u1 = Error,
                N0 = _1(v1, function(x0) {
                    this.name = v1, this.message = x0, (x0 = Error(x0).stack) !== void 0 && (this.stack = this.toString() + `
` + x0.replace(/^Error(:[^\n]*)?\n/, ""))
                });
            return N0.prototype = Object.create(u1.prototype), N0.prototype.constructor = N0, N0.prototype.toString = function() {
                return this.message === void 0 ? this.name : this.name + ": " + this.message
            }, N0
        }
        var w1 = void 0;

        function Q1(v1) {
            throw new w1(v1)
        }
        var k1 = (v1) => (v1 || Q1("Cannot use deleted val. handle = " + v1), F0[v1].value),
            H1 = (v1) => {
                switch (v1) {
                    case void 0:
                        return 1;
                    case null:
                        return 2;
                    case !0:
                        return 3;
                    case !1:
                        return 4;
                    default:
                        var u1 = W0.length ? W0.pop() : F0.length;
                        return F0[u1] = {
                            fa: 1,
                            value: v1
                        }, u1
                }
            },
            A0 = void 0,
            V0 = void 0;

        function o1(v1) {
            for (var u1 = ""; z[v1];) u1 += V0[z[v1++]];
            return u1
        }
        var e = [];

        function Z1() {
            for (; e.length;) {
                var v1 = e.pop();
                v1.L.Z = !1, v1.delete()
            }
        }
        var I1 = void 0,
            U1 = {};

        function O1(v1, u1) {
            for (u1 === void 0 && Q1("ptr should not be undefined"); v1.P;) u1 = v1.aa(u1), v1 = v1.P;
            return u1
        }
        var B1 = {};

        function x1(v1) {
            var u1 = o1(v1 = R4(v1));
            return QB(v1), u1
        }

        function c1(v1, u1) {
            var N0 = B1[v1];
            return N0 === void 0 && Q1(u1 + " has unknown type " + x1(v1)), N0
        }

        function a1() {}
        var C0 = !1;

        function K0(v1) {
            --v1.count.value, v1.count.value === 0 && (v1.S ? v1.T.V(v1.S) : v1.O.M.V(v1.N))
        }
        var R0 = {},
            wA = void 0;

        function u0(v1) {
            throw new wA(v1)
        }

        function TA(v1, u1) {
            return u1.O && u1.N || u0("makeClassHandle requires ptr and ptrType"), !!u1.T != !!u1.S && u0("Both smartPtrType and smartPtr must be specified"), u1.count = {
                value: 1
            }, dA(Object.create(v1, {
                L: {
                    value: u1
                }
            }))
        }

        function dA(v1) {
            return typeof FinalizationRegistry == "undefined" ? (dA = (u1) => u1, v1) : (C0 = new FinalizationRegistry((u1) => {
                K0(u1.L)
            }), dA = (u1) => {
                var N0 = u1.L;
                return N0.S && C0.register(u1, {
                    L: N0
                }, u1), u1
            }, a1 = (u1) => {
                C0.unregister(u1)
            }, dA(v1))
        }
        var J2 = {};

        function s2(v1) {
            for (; v1.length;) {
                var u1 = v1.pop();
                v1.pop()(u1)
            }
        }

        function N2(v1) {
            return this.fromWireType(N[v1 >> 2])
        }
        var U9 = {},
            m6 = {};

        function kA(v1, u1, N0) {
            function x0(QA) {
                (QA = N0(QA)).length !== v1.length && u0("Mismatched type converter count");
                for (var JA = 0; JA < v1.length; ++JA) T2(v1[JA], QA[JA])
            }
            v1.forEach(function(QA) {
                m6[QA] = u1
            });
            var w0 = Array(u1.length),
                h0 = [],
                VA = 0;
            u1.forEach((QA, JA) => {
                B1.hasOwnProperty(QA) ? w0[JA] = B1[QA] : (h0.push(QA), U9.hasOwnProperty(QA) || (U9[QA] = []), U9[QA].push(() => {
                    w0[JA] = B1[QA], ++VA === h0.length && x0(w0)
                }))
            }), h0.length === 0 && x0(w0)
        }

        function G2(v1) {
            switch (v1) {
                case 1:
                    return 0;
                case 2:
                    return 1;
                case 4:
                    return 2;
                case 8:
                    return 3;
                default:
                    throw TypeError("Unknown type size: " + v1)
            }
        }

        function T2(v1, u1, N0 = {}) {
            if (!("argPackAdvance" in u1)) throw TypeError("registerType registeredInstance requires argPackAdvance");
            var x0 = u1.name;
            if (v1 || Q1('type "' + x0 + '" must have a positive integer typeid pointer'), B1.hasOwnProperty(v1)) {
                if (N0.ta) return;
                Q1("Cannot register type '" + x0 + "' twice")
            }
            B1[v1] = u1, delete m6[v1], U9.hasOwnProperty(v1) && (u1 = U9[v1], delete U9[v1], u1.forEach((w0) => w0()))
        }

        function pA(v1) {
            Q1(v1.L.O.M.name + " instance already deleted")
        }

        function bA() {}

        function r2(v1, u1, N0) {
            if (v1[u1].R === void 0) {
                var x0 = v1[u1];
                v1[u1] = function() {
                    return v1[u1].R.hasOwnProperty(arguments.length) || Q1("Function '" + N0 + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + v1[u1].R + ")!"), v1[u1].R[arguments.length].apply(this, arguments)
                }, v1[u1].R = [], v1[u1].R[x0.Y] = x0
            }
        }

        function xB(v1, u1, N0, x0, w0, h0, VA, QA) {
            this.name = v1, this.constructor = u1, this.W = N0, this.V = x0, this.P = w0, this.oa = h0, this.aa = VA, this.ma = QA, this.ia = []
        }

        function o6(v1, u1, N0) {
            for (; u1 !== N0;) u1.aa || Q1("Expected null or instance of " + N0.name + ", got an instance of " + u1.name), v1 = u1.aa(v1), u1 = u1.P;
            return v1
        }

        function D3(v1, u1) {
            return u1 === null ? (this.da && Q1("null is not a valid " + this.name), 0) : (u1.L || Q1('Cannot pass "' + n3(u1) + '" as a ' + this.name), u1.L.N || Q1("Cannot pass deleted object as a pointer of type " + this.name), o6(u1.L.N, u1.L.O.M, this.M))
        }

        function C4(v1, u1) {
            if (u1 === null) {
                if (this.da && Q1("null is not a valid " + this.name), this.ca) {
                    var N0 = this.ea();
                    return v1 !== null && v1.push(this.V, N0), N0
                }
                return 0
            }
            if (u1.L || Q1('Cannot pass "' + n3(u1) + '" as a ' + this.name), u1.L.N || Q1("Cannot pass deleted object as a pointer of type " + this.name), !this.ba && u1.L.O.ba && Q1("Cannot convert argument of type " + (u1.L.T ? u1.L.T.name : u1.L.O.name) + " to parameter type " + this.name), N0 = o6(u1.L.N, u1.L.O.M, this.M), this.ca) switch (u1.L.S === void 0 && Q1("Passing raw pointer to smart pointer is illegal"), this.Aa) {
                case 0:
                    u1.L.T === this ? N0 = u1.L.S : Q1("Cannot convert argument of type " + (u1.L.T ? u1.L.T.name : u1.L.O.name) + " to parameter type " + this.name);
                    break;
                case 1:
                    N0 = u1.L.S;
                    break;
                case 2:
                    if (u1.L.T === this) N0 = u1.L.S;
                    else {
                        var x0 = u1.clone();
                        N0 = this.wa(N0, H1(function() {
                            x0.delete()
                        })), v1 !== null && v1.push(this.V, N0)
                    }
                    break;
                default:
                    Q1("Unsupporting sharing policy")
            }
            return N0
        }

        function oB(v1, u1) {
            return u1 === null ? (this.da && Q1("null is not a valid " + this.name), 0) : (u1.L || Q1('Cannot pass "' + n3(u1) + '" as a ' + this.name), u1.L.N || Q1("Cannot pass deleted object as a pointer of type " + this.name), u1.L.O.ba && Q1("Cannot convert argument of type " + u1.L.O.name + " to parameter type " + this.name), o6(u1.L.N, u1.L.O.M, this.M))
        }

        function d6(v1, u1, N0, x0) {
            this.name = v1, this.M = u1, this.da = N0, this.ba = x0, this.ca = !1, this.V = this.wa = this.ea = this.ja = this.Aa = this.va = void 0, u1.P !== void 0 ? this.toWireType = C4 : (this.toWireType = x0 ? D3 : oB, this.U = null)
        }
        var m5 = [];

        function d5(v1) {
            var u1 = m5[v1];
            return u1 || (v1 >= m5.length && (m5.length = v1 + 1), m5[v1] = u1 = j.get(v1)), u1
        }

        function w8(v1, u1) {
            var N0, x0, w0 = (v1 = o1(v1)).includes("j") ? (N0 = v1, x0 = [], function() {
                if (x0.length = 0, Object.assign(x0, arguments), N0.includes("j")) {
                    var h0 = Y["dynCall_" + N0];
                    h0 = x0 && x0.length ? h0.apply(null, [u1].concat(x0)) : h0.call(null, u1)
                } else h0 = d5(u1).apply(null, x0);
                return h0
            }) : d5(u1);
            return typeof w0 != "function" && Q1("unknown function pointer with signature " + v1 + ": " + u1), w0
        }
        var N6 = void 0;

        function w7(v1, u1) {
            var N0 = [],
                x0 = {};
            throw u1.forEach(function w0(h0) {
                x0[h0] || B1[h0] || (m6[h0] ? m6[h0].forEach(w0) : (N0.push(h0), x0[h0] = !0))
            }), new N6(v1 + ": " + N0.map(x1).join([", "]))
        }

        function i3(v1, u1, N0, x0, w0) {
            var h0 = u1.length;
            2 > h0 && Q1("argTypes array size mismatch! Must at least get return value and 'this' types!");
            var VA = u1[1] !== null && N0 !== null,
                QA = !1;
            for (N0 = 1; N0 < u1.length; ++N0)
                if (u1[N0] !== null && u1[N0].U === void 0) {
                    QA = !0;
                    break
                } var JA = u1[0].name !== "void",
                e0 = h0 - 2,
                CA = Array(e0),
                vB = [],
                R2 = [];
            return function() {
                if (arguments.length !== e0 && Q1("function " + v1 + " called with " + arguments.length + " arguments, expected " + e0 + " args!"), R2.length = 0, vB.length = VA ? 2 : 1, vB[0] = w0, VA) {
                    var mB = u1[1].toWireType(R2, this);
                    vB[1] = mB
                }
                for (var $1 = 0; $1 < e0; ++$1) CA[$1] = u1[$1 + 2].toWireType(R2, arguments[$1]), vB.push(CA[$1]);
                if ($1 = x0.apply(null, vB), QA) s2(R2);
                else
                    for (var B0 = VA ? 1 : 2; B0 < u1.length; B0++) {
                        var m1 = B0 === 1 ? mB : CA[B0 - 2];
                        u1[B0].U !== null && u1[B0].U(m1)
                    }
                return JA ? u1[0].fromWireType($1) : void 0
            }
        }

        function d7(v1, u1) {
            for (var N0 = [], x0 = 0; x0 < v1; x0++) N0.push(R[u1 + 4 * x0 >> 2]);
            return N0
        }

        function y4(v1) {
            4 < v1 && --F0[v1].fa == 0 && (F0[v1] = void 0, W0.push(v1))
        }

        function n3(v1) {
            if (v1 === null) return "null";
            var u1 = typeof v1;
            return u1 === "object" || u1 === "array" || u1 === "function" ? v1.toString() : "" + v1
        }

        function AD(v1, u1) {
            for (var N0 = "", x0 = 0; !(x0 >= u1 / 2); ++x0) {
                var w0 = $[v1 + 2 * x0 >> 1];
                if (w0 == 0) break;
                N0 += String.fromCharCode(w0)
            }
            return N0
        }

        function H2(v1, u1, N0) {
            if (N0 === void 0 && (N0 = 2147483647), 2 > N0) return 0;
            N0 -= 2;
            var x0 = u1;
            N0 = N0 < 2 * v1.length ? N0 / 2 : v1.length;
            for (var w0 = 0; w0 < N0; ++w0) $[u1 >> 1] = v1.charCodeAt(w0), u1 += 2;
            return $[u1 >> 1] = 0, u1 - x0
        }

        function i1(v1) {
            return 2 * v1.length
        }

        function N1(v1, u1) {
            for (var N0 = 0, x0 = ""; !(N0 >= u1 / 4);) {
                var w0 = N[v1 + 4 * N0 >> 2];
                if (w0 == 0) break;
                ++N0, 65536 <= w0 ? (w0 -= 65536, x0 += String.fromCharCode(55296 | w0 >> 10, 56320 | 1023 & w0)) : x0 += String.fromCharCode(w0)
            }
            return x0
        }

        function Z0(v1, u1, N0) {
            if (N0 === void 0 && (N0 = 2147483647), 4 > N0) return 0;
            var x0 = u1;
            N0 = x0 + N0 - 4;
            for (var w0 = 0; w0 < v1.length; ++w0) {
                var h0 = v1.charCodeAt(w0);
                if (55296 <= h0 && 57343 >= h0 && (h0 = 65536 + ((1023 & h0) << 10) | 1023 & v1.charCodeAt(++w0)), N[u1 >> 2] = h0, (u1 += 4) + 4 > N0) break
            }
            return N[u1 >> 2] = 0, u1 - x0
        }

        function f0(v1) {
            for (var u1 = 0, N0 = 0; N0 < v1.length; ++N0) {
                var x0 = v1.charCodeAt(N0);
                55296 <= x0 && 57343 >= x0 && ++N0, u1 += 4
            }
            return u1
        }
        var p0 = {};

        function rA(v1) {
            var u1 = p0[v1];
            return u1 === void 0 ? o1(v1) : u1
        }
        var nB = [],
            f9 = [],
            a9 = [null, [],
                []
            ];
        w1 = Y.BindingError = g1("BindingError"), Y.count_emval_handles = function() {
            for (var v1 = 0, u1 = 5; u1 < F0.length; ++u1) F0[u1] !== void 0 && ++v1;
            return v1
        }, Y.get_first_emval = function() {
            for (var v1 = 5; v1 < F0.length; ++v1)
                if (F0[v1] !== void 0) return F0[v1];
            return null
        }, A0 = Y.PureVirtualError = g1("PureVirtualError");
        for (var _4 = Array(256), b9 = 0; 256 > b9; ++b9) _4[b9] = String.fromCharCode(b9);
        V0 = _4, Y.getInheritedInstanceCount = function() {
            return Object.keys(U1).length
        }, Y.getLiveInheritedInstances = function() {
            var v1, u1 = [];
            for (v1 in U1) U1.hasOwnProperty(v1) && u1.push(U1[v1]);
            return u1
        }, Y.flushPendingDeletes = Z1, Y.setDelayFunction = function(v1) {
            I1 = v1, e.length && I1 && I1(Z1)
        }, wA = Y.InternalError = g1("InternalError"), bA.prototype.isAliasOf = function(v1) {
            if (!(this instanceof bA && v1 instanceof bA)) return !1;
            var u1 = this.L.O.M,
                N0 = this.L.N,
                x0 = v1.L.O.M;
            for (v1 = v1.L.N; u1.P;) N0 = u1.aa(N0), u1 = u1.P;
            for (; x0.P;) v1 = x0.aa(v1), x0 = x0.P;
            return u1 === x0 && N0 === v1
        }, bA.prototype.clone = function() {
            if (this.L.N || pA(this), this.L.$) return this.L.count.value += 1, this;
            var v1 = dA,
                u1 = Object,
                N0 = u1.create,
                x0 = Object.getPrototypeOf(this),
                w0 = this.L;
            return v1 = v1(N0.call(u1, x0, {
                L: {
                    value: {
                        count: w0.count,
                        Z: w0.Z,
                        $: w0.$,
                        N: w0.N,
                        O: w0.O,
                        S: w0.S,
                        T: w0.T
                    }
                }
            })), v1.L.count.value += 1, v1.L.Z = !1, v1
        }, bA.prototype.delete = function() {
            this.L.N || pA(this), this.L.Z && !this.L.$ && Q1("Object already scheduled for deletion"), a1(this), K0(this.L), this.L.$ || (this.L.S = void 0, this.L.N = void 0)
        }, bA.prototype.isDeleted = function() {
            return !this.L.N
        }, bA.prototype.deleteLater = function() {
            return this.L.N || pA(this), this.L.Z && !this.L.$ && Q1("Object already scheduled for deletion"), e.push(this), e.length === 1 && I1 && I1(Z1), this.L.Z = !0, this
        }, d6.prototype.pa = function(v1) {
            return this.ja && (v1 = this.ja(v1)), v1
        }, d6.prototype.ga = function(v1) {
            this.V && this.V(v1)
        }, d6.prototype.argPackAdvance = 8, d6.prototype.readValueFromPointer = N2, d6.prototype.deleteObject = function(v1) {
            v1 !== null && v1.delete()
        }, d6.prototype.fromWireType = function(v1) {
            function u1() {
                return this.ca ? TA(this.M.W, {
                    O: this.va,
                    N: x0,
                    T: this,
                    S: v1
                }) : TA(this.M.W, {
                    O: this,
                    N: v1
                })
            }
            var N0, x0 = this.pa(v1);
            if (!x0) return this.ga(v1), null;
            var w0 = U1[O1(this.M, x0)];
            if (w0 !== void 0) return w0.L.count.value === 0 ? (w0.L.N = x0, w0.L.S = v1, w0.clone()) : (w0 = w0.clone(), this.ga(v1), w0);
            if (!(w0 = R0[w0 = this.M.oa(x0)])) return u1.call(this);
            w0 = this.ba ? w0.ka : w0.pointerType;
            var h0 = function VA(QA, JA, e0) {
                return JA === e0 ? QA : e0.P === void 0 ? null : (QA = VA(QA, JA, e0.P)) === null ? null : e0.ma(QA)
            }(x0, this.M, w0.M);
            return h0 === null ? u1.call(this) : this.ca ? TA(w0.M.W, {
                O: w0,
                N: h0,
                T: this,
                S: v1
            }) : TA(w0.M.W, {
                O: w0,
                N: h0
            })
        }, N6 = Y.UnboundTypeError = g1("UnboundTypeError");
        var K4 = {
            q: function(v1, u1, N0) {
                v1 = o1(v1), u1 = c1(u1, "wrapper"), N0 = k1(N0);
                var x0 = [].slice,
                    w0 = u1.M,
                    h0 = w0.W,
                    VA = w0.P.W,
                    QA = w0.P.constructor;
                for (var JA in v1 = _1(v1, function() {
                        w0.P.ia.forEach(function(e0) {
                            if (this[e0] === VA[e0]) throw new A0("Pure virtual function " + e0 + " must be implemented in JavaScript")
                        }.bind(this)), Object.defineProperty(this, "__parent", {
                            value: h0
                        }), this.__construct.apply(this, x0.call(arguments))
                    }), h0.__construct = function() {
                        this === h0 && Q1("Pass correct 'this' to __construct");
                        var e0 = QA.implement.apply(void 0, [this].concat(x0.call(arguments)));
                        a1(e0);
                        var CA = e0.L;
                        e0.notifyOnDestruction(), CA.$ = !0, Object.defineProperties(this, {
                            L: {
                                value: CA
                            }
                        }), dA(this), e0 = O1(w0, e0 = CA.N), U1.hasOwnProperty(e0) ? Q1("Tried to register registered instance: " + e0) : U1[e0] = this
                    }, h0.__destruct = function() {
                        this === h0 && Q1("Pass correct 'this' to __destruct"), a1(this);
                        var e0 = this.L.N;
                        e0 = O1(w0, e0), U1.hasOwnProperty(e0) ? delete U1[e0] : Q1("Tried to unregister unregistered instance: " + e0)
                    }, v1.prototype = Object.create(h0), N0) v1.prototype[JA] = N0[JA];
                return H1(v1)
            },
            l: function(v1) {
                var u1 = J2[v1];
                delete J2[v1];
                var {
                    ea: N0,
                    V: x0,
                    ha: w0
                } = u1;
                kA([v1], w0.map((h0) => h0.sa).concat(w0.map((h0) => h0.ya)), (h0) => {
                    var VA = {};
                    return w0.forEach((QA, JA) => {
                        var e0 = h0[JA],
                            CA = QA.qa,
                            vB = QA.ra,
                            R2 = h0[JA + w0.length],
                            mB = QA.xa,
                            $1 = QA.za;
                        VA[QA.na] = {
                            read: (B0) => e0.fromWireType(CA(vB, B0)),
                            write: (B0, m1) => {
                                var z0 = [];
                                mB($1, B0, R2.toWireType(z0, m1)), s2(z0)
                            }
                        }
                    }), [{
                        name: u1.name,
                        fromWireType: function(QA) {
                            var JA, e0 = {};
                            for (JA in VA) e0[JA] = VA[JA].read(QA);
                            return x0(QA), e0
                        },
                        toWireType: function(QA, JA) {
                            for (var e0 in VA)
                                if (!(e0 in JA)) throw TypeError('Missing field:  "' + e0 + '"');
                            var CA = N0();
                            for (e0 in VA) VA[e0].write(CA, JA[e0]);
                            return QA !== null && QA.push(x0, CA), CA
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: N2,
                        U: x0
                    }]
                })
            },
            v: function() {},
            B: function(v1, u1, N0, x0, w0) {
                var h0 = G2(N0);
                T2(v1, {
                    name: u1 = o1(u1),
                    fromWireType: function(VA) {
                        return !!VA
                    },
                    toWireType: function(VA, QA) {
                        return QA ? x0 : w0
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: function(VA) {
                        if (N0 === 1) var QA = H;
                        else if (N0 === 2) QA = $;
                        else if (N0 === 4) QA = N;
                        else throw TypeError("Unknown boolean type size: " + u1);
                        return this.fromWireType(QA[VA >> h0])
                    },
                    U: null
                })
            },
            h: function(v1, u1, N0, x0, w0, h0, VA, QA, JA, e0, CA, vB, R2) {
                CA = o1(CA), h0 = w8(w0, h0), QA && (QA = w8(VA, QA)), e0 && (e0 = w8(JA, e0)), R2 = w8(vB, R2);
                var mB, $1 = C1(CA);
                mB = function() {
                    w7("Cannot construct " + CA + " due to unbound types", [x0])
                }, Y.hasOwnProperty($1) ? (Q1("Cannot register public name '" + $1 + "' twice"), r2(Y, $1, $1), Y.hasOwnProperty(void 0) && Q1("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"), Y[$1].R[void 0] = mB) : Y[$1] = mB, kA([v1, u1, N0], x0 ? [x0] : [], function(B0) {
                    if (B0 = B0[0], x0) var m1, z0 = B0.M,
                        M0 = z0.W;
                    else M0 = bA.prototype;
                    B0 = _1($1, function() {
                        if (Object.getPrototypeOf(this) !== q0) throw new w1("Use 'new' to construct " + CA);
                        if (AA.X === void 0) throw new w1(CA + " has no accessible constructor");
                        var WA = AA.X[arguments.length];
                        if (WA === void 0) throw new w1("Tried to invoke ctor of " + CA + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(AA.X).toString() + ") parameters instead!");
                        return WA.apply(this, arguments)
                    });
                    var q0 = Object.create(M0, {
                        constructor: {
                            value: B0
                        }
                    });
                    B0.prototype = q0;
                    var AA = new xB(CA, B0, q0, R2, z0, h0, QA, e0);
                    z0 = new d6(CA, AA, !0, !1), M0 = new d6(CA + "*", AA, !1, !1);
                    var HA = new d6(CA + " const*", AA, !1, !0);
                    return R0[v1] = {
                        pointerType: M0,
                        ka: HA
                    }, m1 = B0, Y.hasOwnProperty($1) || u0("Replacing nonexistant public symbol"), Y[$1] = m1, Y[$1].Y = void 0, [z0, M0, HA]
                })
            },
            d: function(v1, u1, N0, x0, w0, h0, VA) {
                var QA = d7(N0, x0);
                u1 = o1(u1), h0 = w8(w0, h0), kA([], [v1], function(JA) {
                    function e0() {
                        w7("Cannot call " + CA + " due to unbound types", QA)
                    }
                    var CA = (JA = JA[0]).name + "." + u1;
                    u1.startsWith("@@") && (u1 = Symbol[u1.substring(2)]);
                    var vB = JA.M.constructor;
                    return vB[u1] === void 0 ? (e0.Y = N0 - 1, vB[u1] = e0) : (r2(vB, u1, CA), vB[u1].R[N0 - 1] = e0), kA([], QA, function(R2) {
                        return R2 = i3(CA, [R2[0], null].concat(R2.slice(1)), null, h0, VA), vB[u1].R === void 0 ? (R2.Y = N0 - 1, vB[u1] = R2) : vB[u1].R[N0 - 1] = R2, []
                    }), []
                })
            },
            p: function(v1, u1, N0, x0, w0, h0) {
                0 < u1 || l();
                var VA = d7(u1, N0);
                w0 = w8(x0, w0), kA([], [v1], function(QA) {
                    var JA = "constructor " + (QA = QA[0]).name;
                    if (QA.M.X === void 0 && (QA.M.X = []), QA.M.X[u1 - 1] !== void 0) throw new w1("Cannot register multiple constructors with identical number of parameters (" + (u1 - 1) + ") for class '" + QA.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
                    return QA.M.X[u1 - 1] = () => {
                        w7("Cannot construct " + QA.name + " due to unbound types", VA)
                    }, kA([], VA, function(e0) {
                        return e0.splice(1, 0, null), QA.M.X[u1 - 1] = i3(JA, e0, null, w0, h0), []
                    }), []
                })
            },
            a: function(v1, u1, N0, x0, w0, h0, VA, QA) {
                var JA = d7(N0, x0);
                u1 = o1(u1), h0 = w8(w0, h0), kA([], [v1], function(e0) {
                    function CA() {
                        w7("Cannot call " + vB + " due to unbound types", JA)
                    }
                    var vB = (e0 = e0[0]).name + "." + u1;
                    u1.startsWith("@@") && (u1 = Symbol[u1.substring(2)]), QA && e0.M.ia.push(u1);
                    var R2 = e0.M.W,
                        mB = R2[u1];
                    return mB === void 0 || mB.R === void 0 && mB.className !== e0.name && mB.Y === N0 - 2 ? (CA.Y = N0 - 2, CA.className = e0.name, R2[u1] = CA) : (r2(R2, u1, vB), R2[u1].R[N0 - 2] = CA), kA([], JA, function($1) {
                        return $1 = i3(vB, $1, e0, h0, VA), R2[u1].R === void 0 ? ($1.Y = N0 - 2, R2[u1] = $1) : R2[u1].R[N0 - 2] = $1, []
                    }), []
                })
            },
            A: function(v1, u1) {
                T2(v1, {
                    name: u1 = o1(u1),
                    fromWireType: function(N0) {
                        var x0 = k1(N0);
                        return y4(N0), x0
                    },
                    toWireType: function(N0, x0) {
                        return H1(x0)
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: N2,
                    U: null
                })
            },
            n: function(v1, u1, N0) {
                N0 = G2(N0), T2(v1, {
                    name: u1 = o1(u1),
                    fromWireType: function(x0) {
                        return x0
                    },
                    toWireType: function(x0, w0) {
                        return w0
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: function(x0, w0) {
                        switch (w0) {
                            case 2:
                                return function(h0) {
                                    return this.fromWireType(O[h0 >> 2])
                                };
                            case 3:
                                return function(h0) {
                                    return this.fromWireType(P[h0 >> 3])
                                };
                            default:
                                throw TypeError("Unknown float type: " + x0)
                        }
                    }(u1, N0),
                    U: null
                })
            },
            e: function(v1, u1, N0, x0, w0) {
                u1 = o1(u1), w0 === -1 && (w0 = 4294967295), w0 = G2(N0);
                var h0 = (QA) => QA;
                if (x0 === 0) {
                    var VA = 32 - 8 * N0;
                    h0 = (QA) => QA << VA >>> VA
                }
                N0 = u1.includes("unsigned") ? function(QA, JA) {
                    return JA >>> 0
                } : function(QA, JA) {
                    return JA
                }, T2(v1, {
                    name: u1,
                    fromWireType: h0,
                    toWireType: N0,
                    argPackAdvance: 8,
                    readValueFromPointer: function(QA, JA, e0) {
                        switch (JA) {
                            case 0:
                                return e0 ? function(CA) {
                                    return H[CA]
                                } : function(CA) {
                                    return z[CA]
                                };
                            case 1:
                                return e0 ? function(CA) {
                                    return $[CA >> 1]
                                } : function(CA) {
                                    return L[CA >> 1]
                                };
                            case 2:
                                return e0 ? function(CA) {
                                    return N[CA >> 2]
                                } : function(CA) {
                                    return R[CA >> 2]
                                };
                            default:
                                throw TypeError("Unknown integer type: " + QA)
                        }
                    }(u1, w0, x0 !== 0),
                    U: null
                })
            },
            b: function(v1, u1, N0) {
                function x0(h0) {
                    h0 >>= 2;
                    var VA = R;
                    return new w0(VA.buffer, VA[h0 + 1], VA[h0])
                }
                var w0 = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][u1];
                T2(v1, {
                    name: N0 = o1(N0),
                    fromWireType: x0,
                    argPackAdvance: 8,
                    readValueFromPointer: x0
                }, {
                    ta: !0
                })
            },
            o: function(v1, u1) {
                var N0 = (u1 = o1(u1)) === "std::string";
                T2(v1, {
                    name: u1,
                    fromWireType: function(x0) {
                        var w0 = R[x0 >> 2],
                            h0 = x0 + 4;
                        if (N0)
                            for (var VA = h0, QA = 0; QA <= w0; ++QA) {
                                var JA = h0 + QA;
                                if (QA == w0 || z[JA] == 0) {
                                    if (VA = VA ? C(z, VA, JA - VA) : "", e0 === void 0) var e0 = VA;
                                    else e0 += "\x00" + VA;
                                    VA = JA + 1
                                }
                            } else {
                                for (QA = 0, e0 = Array(w0); QA < w0; ++QA) e0[QA] = String.fromCharCode(z[h0 + QA]);
                                e0 = e0.join("")
                            }
                        return QB(x0), e0
                    },
                    toWireType: function(x0, w0) {
                        w0 instanceof ArrayBuffer && (w0 = new Uint8Array(w0));
                        var h0, VA = typeof w0 == "string";
                        if (VA || w0 instanceof Uint8Array || w0 instanceof Uint8ClampedArray || w0 instanceof Int8Array || Q1("Cannot pass non-string to std::string"), N0 && VA) {
                            var QA = 0;
                            for (h0 = 0; h0 < w0.length; ++h0) {
                                var JA = w0.charCodeAt(h0);
                                127 >= JA ? QA++ : 2047 >= JA ? QA += 2 : 55296 <= JA && 57343 >= JA ? (QA += 4, ++h0) : QA += 3
                            }
                            h0 = QA
                        } else h0 = w0.length;
                        if (JA = (QA = KQ(4 + h0 + 1)) + 4, R[QA >> 2] = h0, N0 && VA) {
                            if (VA = JA, JA = h0 + 1, h0 = z, 0 < JA) {
                                JA = VA + JA - 1;
                                for (var e0 = 0; e0 < w0.length; ++e0) {
                                    var CA = w0.charCodeAt(e0);
                                    if (55296 <= CA && 57343 >= CA && (CA = 65536 + ((1023 & CA) << 10) | 1023 & w0.charCodeAt(++e0)), 127 >= CA) {
                                        if (VA >= JA) break;
                                        h0[VA++] = CA
                                    } else {
                                        if (2047 >= CA) {
                                            if (VA + 1 >= JA) break;
                                            h0[VA++] = 192 | CA >> 6
                                        } else {
                                            if (65535 >= CA) {
                                                if (VA + 2 >= JA) break;
                                                h0[VA++] = 224 | CA >> 12
                                            } else {
                                                if (VA + 3 >= JA) break;
                                                h0[VA++] = 240 | CA >> 18, h0[VA++] = 128 | CA >> 12 & 63
                                            }
                                            h0[VA++] = 128 | CA >> 6 & 63
                                        }
                                        h0[VA++] = 128 | 63 & CA
                                    }
                                }
                                h0[VA] = 0
                            }
                        } else if (VA)
                            for (VA = 0; VA < h0; ++VA) 255 < (e0 = w0.charCodeAt(VA)) && (QB(JA), Q1("String has UTF-16 code units that do not fit in 8 bits")), z[JA + VA] = e0;
                        else
                            for (VA = 0; VA < h0; ++VA) z[JA + VA] = w0[VA];
                        return x0 !== null && x0.push(QB, QA), QA
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: N2,
                    U: function(x0) {
                        QB(x0)
                    }
                })
            },
            k: function(v1, u1, N0) {
                if (N0 = o1(N0), u1 === 2) var x0 = AD,
                    w0 = H2,
                    h0 = i1,
                    VA = () => L,
                    QA = 1;
                else u1 === 4 && (x0 = N1, w0 = Z0, h0 = f0, VA = () => R, QA = 2);
                T2(v1, {
                    name: N0,
                    fromWireType: function(JA) {
                        for (var e0, CA = R[JA >> 2], vB = VA(), R2 = JA + 4, mB = 0; mB <= CA; ++mB) {
                            var $1 = JA + 4 + mB * u1;
                            (mB == CA || vB[$1 >> QA] == 0) && (R2 = x0(R2, $1 - R2), e0 === void 0 ? e0 = R2 : e0 += "\x00" + R2, R2 = $1 + u1)
                        }
                        return QB(JA), e0
                    },
                    toWireType: function(JA, e0) {
                        typeof e0 != "string" && Q1("Cannot pass non-string to C++ string type " + N0);
                        var CA = h0(e0),
                            vB = KQ(4 + CA + u1);
                        return R[vB >> 2] = CA >> QA, w0(e0, vB + 4, CA + u1), JA !== null && JA.push(QB, vB), vB
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: N2,
                    U: function(JA) {
                        QB(JA)
                    }
                })
            },
            m: function(v1, u1, N0, x0, w0, h0) {
                J2[v1] = {
                    name: o1(u1),
                    ea: w8(N0, x0),
                    V: w8(w0, h0),
                    ha: []
                }
            },
            c: function(v1, u1, N0, x0, w0, h0, VA, QA, JA, e0) {
                J2[v1].ha.push({
                    na: o1(u1),
                    sa: N0,
                    qa: w8(x0, w0),
                    ra: h0,
                    ya: VA,
                    xa: w8(QA, JA),
                    za: e0
                })
            },
            C: function(v1, u1) {
                T2(v1, {
                    ua: !0,
                    name: u1 = o1(u1),
                    argPackAdvance: 0,
                    fromWireType: function() {},
                    toWireType: function() {}
                })
            },
            t: function(v1, u1, N0, x0, w0) {
                v1 = nB[v1], u1 = k1(u1), N0 = rA(N0);
                var h0 = [];
                return R[x0 >> 2] = H1(h0), v1(u1, N0, h0, w0)
            },
            j: function(v1, u1, N0, x0) {
                v1 = nB[v1], v1(u1 = k1(u1), N0 = rA(N0), null, x0)
            },
            f: y4,
            g: function(v1, u1) {
                var N0, x0, w0 = function(JA, e0) {
                        for (var CA = Array(JA), vB = 0; vB < JA; ++vB) CA[vB] = c1(R[e0 + 4 * vB >> 2], "parameter " + vB);
                        return CA
                    }(v1, u1),
                    h0 = w0[0],
                    VA = f9[u1 = h0.name + "_$" + w0.slice(1).map(function(JA) {
                        return JA.name
                    }).join("_") + "$"];
                if (VA !== void 0) return VA;
                var QA = Array(v1 - 1);
                return N0 = (JA, e0, CA, vB) => {
                    for (var R2 = 0, mB = 0; mB < v1 - 1; ++mB) QA[mB] = w0[mB + 1].readValueFromPointer(vB + R2), R2 += w0[mB + 1].argPackAdvance;
                    for (mB = 0, JA = JA[e0].apply(JA, QA); mB < v1 - 1; ++mB) w0[mB + 1].la && w0[mB + 1].la(QA[mB]);
                    if (!h0.ua) return h0.toWireType(CA, JA)
                }, x0 = nB.length, nB.push(N0), VA = x0, f9[u1] = VA
            },
            r: function(v1) {
                4 < v1 && (F0[v1].fa += 1)
            },
            s: function(v1) {
                s2(k1(v1)), y4(v1)
            },
            i: function() {
                l("")
            },
            x: function(v1, u1, N0) {
                z.copyWithin(v1, u1, u1 + N0)
            },
            w: function(v1) {
                var u1 = z.length;
                if (2147483648 < (v1 >>>= 0)) return !1;
                for (var N0 = 1; 4 >= N0; N0 *= 2) {
                    var x0 = u1 * (1 + 0.2 / N0);
                    x0 = Math.min(x0, v1 + 100663296);
                    var w0 = Math,
                        h0 = w0.min;
                    x0 = Math.max(v1, x0), x0 += (65536 - x0 % 65536) % 65536;
                    A: {
                        var VA = X.buffer;
                        try {
                            X.grow(h0.call(w0, 2147483648, x0) - VA.byteLength + 65535 >>> 16), K();
                            var QA = 1;
                            break A
                        } catch (JA) {}
                        QA = void 0
                    }
                    if (QA) return !0
                }
                return !1
            },
            z: function() {
                return 52
            },
            u: function() {
                return 70
            },
            y: function(v1, u1, N0, x0) {
                for (var w0 = 0, h0 = 0; h0 < N0; h0++) {
                    var VA = R[u1 >> 2],
                        QA = R[u1 + 4 >> 2];
                    u1 += 8;
                    for (var JA = 0; JA < QA; JA++) {
                        var e0 = z[VA + JA],
                            CA = a9[v1];
                        e0 === 0 || e0 === 10 ? ((v1 === 1 ? F : I)(C(CA, 0)), CA.length = 0) : CA.push(e0)
                    }
                    w0 += QA
                }
                return R[x0 >> 2] = w0, 0
            }
        };
        (function() {
            function v1(w0) {
                Y.asm = w0.exports, X = Y.asm.D, K(), j = Y.asm.I, k.unshift(Y.asm.E), --u == 0 && a && (w0 = a, a = null, w0())
            }

            function u1(w0) {
                v1(w0.instance)
            }

            function N0(w0) {
                return (typeof fetch == "function" ? fetch(Q, {
                    credentials: "same-origin"
                }).then(function(h0) {
                    if (!h0.ok) throw "failed to load wasm binary file at '" + Q + "'";
                    return h0.arrayBuffer()
                }).catch(function() {
                    return t()
                }) : Promise.resolve().then(function() {
                    return t()
                })).then(function(h0) {
                    return WebAssembly.instantiate(h0, x0)
                }).then(function(h0) {
                    return h0
                }).then(w0, function(h0) {
                    I("failed to asynchronously prepare wasm: " + h0), l(h0)
                })
            }
            var x0 = {
                a: K4
            };
            if (u++, Y.instantiateWasm) try {
                return Y.instantiateWasm(x0, v1)
            } catch (w0) {
                I("Module.instantiateWasm callback failed with error: " + w0), J(w0)
            }(typeof WebAssembly.instantiateStreaming != "function" || y() || typeof fetch != "function" ? N0(u1) : fetch(Q, {
                credentials: "same-origin"
            }).then(function(w0) {
                return WebAssembly.instantiateStreaming(w0, x0).then(u1, function(h0) {
                    return I("wasm streaming compile failed: " + h0), I("falling back to ArrayBuffer instantiation"), N0(u1)
                })
            })).catch(J)
        })();
        var R4 = Y.___getTypeName = function() {
            return (R4 = Y.___getTypeName = Y.asm.F).apply(null, arguments)
        };

        function KQ() {
            return (KQ = Y.asm.H).apply(null, arguments)
        }

        function QB() {
            return (QB = Y.asm.J).apply(null, arguments)
        }

        function HQ() {
            0 < u || (E1(f), 0 < u || Z || (Z = !0, Y.calledRun = !0, V || (E1(k), W(Y), E1(c))))
        }
        return Y.__embind_initialize_bindings = function() {
            return (Y.__embind_initialize_bindings = Y.asm.G).apply(null, arguments)
        }, Y.dynCall_jiji = function() {
            return (Y.dynCall_jiji = Y.asm.K).apply(null, arguments)
        }, a = function v1() {
            Z || HQ(), Z || (a = v1)
        }, HQ(), B.ready
    }
})();