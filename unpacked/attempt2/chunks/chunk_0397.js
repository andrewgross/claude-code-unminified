/* chunk:397 bytes:[9285265, 9302541) size:17276 source:unpacked-cli.js */
var rz0 = E(($Q3, py1) => {
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    var kYB, yYB, _YB, xYB, vYB, bYB, fYB, hYB, gYB, ly1, sz0, uYB, mYB, oe, dYB, cYB, lYB, pYB, iYB, nYB, aYB, sYB, rYB;
    (function(A) {
        var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
        if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(Z) {
            A(Q(B, Q(Z)))
        });
        else if (typeof py1 === "object" && typeof $Q3 === "object") A(Q(B, Q($Q3)));
        else A(Q(B));

        function Q(Z, D) {
            if (Z !== B)
                if (typeof Object.create === "function") Object.defineProperty(Z, "__esModule", {
                    value: !0
                });
                else Z.__esModule = !0;
            return function(G, F) {
                return Z[G] = D ? D(G, F) : F
            }
        }
    })(function(A) {
        var B = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(Q, Z) {
            Q.__proto__ = Z
        } || function(Q, Z) {
            for (var D in Z)
                if (Z.hasOwnProperty(D)) Q[D] = Z[D]
        };
        kYB = function(Q, Z) {
            B(Q, Z);

            function D() {
                this.constructor = Q
            }
            Q.prototype = Z === null ? Object.create(Z) : (D.prototype = Z.prototype, new D)
        }, yYB = Object.assign || function(Q) {
            for (var Z, D = 1, G = arguments.length; D < G; D++) {
                Z = arguments[D];
                for (var F in Z)
                    if (Object.prototype.hasOwnProperty.call(Z, F)) Q[F] = Z[F]
            }
            return Q
        }, _YB = function(Q, Z) {
            var D = {};
            for (var G in Q)
                if (Object.prototype.hasOwnProperty.call(Q, G) && Z.indexOf(G) < 0) D[G] = Q[G];
            if (Q != null && typeof Object.getOwnPropertySymbols === "function") {
                for (var F = 0, G = Object.getOwnPropertySymbols(Q); F < G.length; F++)
                    if (Z.indexOf(G[F]) < 0 && Object.prototype.propertyIsEnumerable.call(Q, G[F])) D[G[F]] = Q[G[F]]
            }
            return D
        }, xYB = function(Q, Z, D, G) {
            var F = arguments.length,
                I = F < 3 ? Z : G === null ? G = Object.getOwnPropertyDescriptor(Z, D) : G,
                Y;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") I = Reflect.decorate(Q, Z, D, G);
            else
                for (var W = Q.length - 1; W >= 0; W--)
                    if (Y = Q[W]) I = (F < 3 ? Y(I) : F > 3 ? Y(Z, D, I) : Y(Z, D)) || I;
            return F > 3 && I && Object.defineProperty(Z, D, I), I
        }, vYB = function(Q, Z) {
            return function(D, G) {
                Z(D, G, Q)
            }
        }, bYB = function(Q, Z) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Q, Z)
        }, fYB = function(Q, Z, D, G) {
            function F(I) {
                return I instanceof D ? I : new D(function(Y) {
                    Y(I)
                })
            }
            return new(D || (D = Promise))(function(I, Y) {
                function W(V) {
                    try {
                        X(G.next(V))
                    } catch (C) {
                        Y(C)
                    }
                }

                function J(V) {
                    try {
                        X(G.throw(V))
                    } catch (C) {
                        Y(C)
                    }
                }

                function X(V) {
                    V.done ? I(V.value) : F(V.value).then(W, J)
                }
                X((G = G.apply(Q, Z || [])).next())
            })
        }, hYB = function(Q, Z) {
            var D = {
                    label: 0,
                    sent: function() {
                        if (I[0] & 1) throw I[1];
                        return I[1]
                    },
                    trys: [],
                    ops: []
                },
                G, F, I, Y;
            return Y = {
                next: W(0),
                throw: W(1),
                return: W(2)
            }, typeof Symbol === "function" && (Y[Symbol.iterator] = function() {
                return this
            }), Y;

            function W(X) {
                return function(V) {
                    return J([X, V])
                }
            }

            function J(X) {
                if (G) throw new TypeError("Generator is already executing.");
                while (D) try {
                    if (G = 1, F && (I = X[0] & 2 ? F.return : X[0] ? F.throw || ((I = F.return) && I.call(F), 0) : F.next) && !(I = I.call(F, X[1])).done) return I;
                    if (F = 0, I) X = [X[0] & 2, I.value];
                    switch (X[0]) {
                        case 0:
                        case 1:
                            I = X;
                            break;
                        case 4:
                            return D.label++, {
                                value: X[1],
                                done: !1
                            };
                        case 5:
                            D.label++, F = X[1], X = [0];
                            continue;
                        case 7:
                            X = D.ops.pop(), D.trys.pop();
                            continue;
                        default:
                            if ((I = D.trys, !(I = I.length > 0 && I[I.length - 1])) && (X[0] === 6 || X[0] === 2)) {
                                D = 0;
                                continue
                            }
                            if (X[0] === 3 && (!I || X[1] > I[0] && X[1] < I[3])) {
                                D.label = X[1];
                                break
                            }
                            if (X[0] === 6 && D.label < I[1]) {
                                D.label = I[1], I = X;
                                break
                            }
                            if (I && D.label < I[2]) {
                                D.label = I[2], D.ops.push(X);
                                break
                            }
                            if (I[2]) D.ops.pop();
                            D.trys.pop();
                            continue
                    }
                    X = Z.call(Q, D)
                } catch (V) {
                    X = [6, V], F = 0
                } finally {
                    G = I = 0
                }
                if (X[0] & 5) throw X[1];
                return {
                    value: X[0] ? X[1] : void 0,
                    done: !0
                }
            }
        }, rYB = function(Q, Z, D, G) {
            if (G === void 0) G = D;
            Q[G] = Z[D]
        }, gYB = function(Q, Z) {
            for (var D in Q)
                if (D !== "default" && !Z.hasOwnProperty(D)) Z[D] = Q[D]
        }, ly1 = function(Q) {
            var Z = typeof Symbol === "function" && Symbol.iterator,
                D = Z && Q[Z],
                G = 0;
            if (D) return D.call(Q);
            if (Q && typeof Q.length === "number") return {
                next: function() {
                    if (Q && G >= Q.length) Q = void 0;
                    return {
                        value: Q && Q[G++],
                        done: !Q
                    }
                }
            };
            throw new TypeError(Z ? "Object is not iterable." : "Symbol.iterator is not defined.")
        }, sz0 = function(Q, Z) {
            var D = typeof Symbol === "function" && Q[Symbol.iterator];
            if (!D) return Q;
            var G = D.call(Q),
                F, I = [],
                Y;
            try {
                while ((Z === void 0 || Z-- > 0) && !(F = G.next()).done) I.push(F.value)
            } catch (W) {
                Y = {
                    error: W
                }
            } finally {
                try {
                    if (F && !F.done && (D = G.return)) D.call(G)
                } finally {
                    if (Y) throw Y.error
                }
            }
            return I
        }, uYB = function() {
            for (var Q = [], Z = 0; Z < arguments.length; Z++) Q = Q.concat(sz0(arguments[Z]));
            return Q
        }, mYB = function() {
            for (var Q = 0, Z = 0, D = arguments.length; Z < D; Z++) Q += arguments[Z].length;
            for (var G = Array(Q), F = 0, Z = 0; Z < D; Z++)
                for (var I = arguments[Z], Y = 0, W = I.length; Y < W; Y++, F++) G[F] = I[Y];
            return G
        }, oe = function(Q) {
            return this instanceof oe ? (this.v = Q, this) : new oe(Q)
        }, dYB = function(Q, Z, D) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var G = D.apply(Q, Z || []),
                F, I = [];
            return F = {}, Y("next"), Y("throw"), Y("return"), F[Symbol.asyncIterator] = function() {
                return this
            }, F;

            function Y(K) {
                if (G[K]) F[K] = function(H) {
                    return new Promise(function(z, $) {
                        I.push([K, H, z, $]) > 1 || W(K, H)
                    })
                }
            }

            function W(K, H) {
                try {
                    J(G[K](H))
                } catch (z) {
                    C(I[0][3], z)
                }
            }

            function J(K) {
                K.value instanceof oe ? Promise.resolve(K.value.v).then(X, V) : C(I[0][2], K)
            }

            function X(K) {
                W("next", K)
            }

            function V(K) {
                W("throw", K)
            }

            function C(K, H) {
                if (K(H), I.shift(), I.length) W(I[0][0], I[0][1])
            }
        }, cYB = function(Q) {
            var Z, D;
            return Z = {}, G("next"), G("throw", function(F) {
                throw F
            }), G("return"), Z[Symbol.iterator] = function() {
                return this
            }, Z;

            function G(F, I) {
                Z[F] = Q[F] ? function(Y) {
                    return (D = !D) ? {
                        value: oe(Q[F](Y)),
                        done: F === "return"
                    } : I ? I(Y) : Y
                } : I
            }
        }, lYB = function(Q) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var Z = Q[Symbol.asyncIterator],
                D;
            return Z ? Z.call(Q) : (Q = typeof ly1 === "function" ? ly1(Q) : Q[Symbol.iterator](), D = {}, G("next"), G("throw"), G("return"), D[Symbol.asyncIterator] = function() {
                return this
            }, D);

            function G(I) {
                D[I] = Q[I] && function(Y) {
                    return new Promise(function(W, J) {
                        Y = Q[I](Y), F(W, J, Y.done, Y.value)
                    })
                }
            }

            function F(I, Y, W, J) {
                Promise.resolve(J).then(function(X) {
                    I({
                        value: X,
                        done: W
                    })
                }, Y)
            }
        }, pYB = function(Q, Z) {
            if (Object.defineProperty) Object.defineProperty(Q, "raw", {
                value: Z
            });
            else Q.raw = Z;
            return Q
        }, iYB = function(Q) {
            if (Q && Q.__esModule) return Q;
            var Z = {};
            if (Q != null) {
                for (var D in Q)
                    if (Object.hasOwnProperty.call(Q, D)) Z[D] = Q[D]
            }
            return Z.default = Q, Z
        }, nYB = function(Q) {
            return Q && Q.__esModule ? Q : {
                default: Q
            }
        }, aYB = function(Q, Z) {
            if (!Z.has(Q)) throw new TypeError("attempted to get private field on non-instance");
            return Z.get(Q)
        }, sYB = function(Q, Z, D) {
            if (!Z.has(Q)) throw new TypeError("attempted to set private field on non-instance");
            return Z.set(Q, D), D
        }, A("__extends", kYB), A("__assign", yYB), A("__rest", _YB), A("__decorate", xYB), A("__param", vYB), A("__metadata", bYB), A("__awaiter", fYB), A("__generator", hYB), A("__exportStar", gYB), A("__createBinding", rYB), A("__values", ly1), A("__read", sz0), A("__spread", uYB), A("__spreadArrays", mYB), A("__await", oe), A("__asyncGenerator", dYB), A("__asyncDelegator", cYB), A("__asyncValues", lYB), A("__makeTemplateObject", pYB), A("__importStar", iYB), A("__importDefault", nYB), A("__classPrivateFieldGet", aYB), A("__classPrivateFieldSet", sYB)
    })
});
var eYB = E((oYB) => {
    Object.defineProperty(oYB, "__esModule", {
        value: !0
    });
    oYB.convertToBuffer = void 0;
    var Bu6 = Tz0(),
        Qu6 = typeof Buffer !== "undefined" && Buffer.from ? function(A) {
            return Buffer.from(A, "utf8")
        } : Bu6.fromUtf8;

    function Zu6(A) {
        if (A instanceof Uint8Array) return A;
        if (typeof A === "string") return Qu6(A);
        if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
        return new Uint8Array(A)
    }
    oYB.convertToBuffer = Zu6
});
var QWB = E((AWB) => {
    Object.defineProperty(AWB, "__esModule", {
        value: !0
    });
    AWB.isEmptyData = void 0;

    function Du6(A) {
        if (typeof A === "string") return A.length === 0;
        return A.byteLength === 0
    }
    AWB.isEmptyData = Du6
});
var GWB = E((ZWB) => {
    Object.defineProperty(ZWB, "__esModule", {
        value: !0
    });
    ZWB.numToUint8 = void 0;

    function Gu6(A) {
        return new Uint8Array([(A & 4278190080) >> 24, (A & 16711680) >> 16, (A & 65280) >> 8, A & 255])
    }
    ZWB.numToUint8 = Gu6
});
var YWB = E((FWB) => {
    Object.defineProperty(FWB, "__esModule", {
        value: !0
    });
    FWB.uint32ArrayFrom = void 0;

    function Fu6(A) {
        if (!Uint32Array.from) {
            var B = new Uint32Array(A.length),
                Q = 0;
            while (Q < A.length) B[Q] = A[Q], Q += 1;
            return B
        }
        return Uint32Array.from(A)
    }
    FWB.uint32ArrayFrom = Fu6
});
var oz0 = E((te) => {
    Object.defineProperty(te, "__esModule", {
        value: !0
    });
    te.uint32ArrayFrom = te.numToUint8 = te.isEmptyData = te.convertToBuffer = void 0;
    var Iu6 = eYB();
    Object.defineProperty(te, "convertToBuffer", {
        enumerable: !0,
        get: function() {
            return Iu6.convertToBuffer
        }
    });
    var Yu6 = QWB();
    Object.defineProperty(te, "isEmptyData", {
        enumerable: !0,
        get: function() {
            return Yu6.isEmptyData
        }
    });
    var Wu6 = GWB();
    Object.defineProperty(te, "numToUint8", {
        enumerable: !0,
        get: function() {
            return Wu6.numToUint8
        }
    });
    var Ju6 = YWB();
    Object.defineProperty(te, "uint32ArrayFrom", {
        enumerable: !0,
        get: function() {
            return Ju6.uint32ArrayFrom
        }
    })
});
var CWB = E((XWB) => {
    Object.defineProperty(XWB, "__esModule", {
        value: !0
    });
    XWB.AwsCrc32 = void 0;
    var WWB = rz0(),
        tz0 = oz0(),
        JWB = iy1(),
        Vu6 = function() {
            function A() {
                this.crc32 = new JWB.Crc32
            }
            return A.prototype.update = function(B) {
                if (tz0.isEmptyData(B)) return;
                this.crc32.update(tz0.convertToBuffer(B))
            }, A.prototype.digest = function() {
                return WWB.__awaiter(this, void 0, void 0, function() {
                    return WWB.__generator(this, function(B) {
                        return [2, tz0.numToUint8(this.crc32.digest())]
                    })
                })
            }, A.prototype.reset = function() {
                this.crc32 = new JWB.Crc32
            }, A
        }();
    XWB.AwsCrc32 = Vu6
});