/* chunk:163 bytes:[3560914, 3577454) size:16540 source:unpacked-cli.js */
var t90 = E((PcA) => {
    Object.defineProperty(PcA, "__esModule", {
        value: !0
    });
    PcA.TimeInterval = PcA.timeInterval = void 0;
    var yeQ = SV(),
        _eQ = FB(),
        xeQ = H9();

    function veQ(A) {
        if (A === void 0) A = yeQ.asyncScheduler;
        return _eQ.operate(function(B, Q) {
            var Z = A.now();
            B.subscribe(xeQ.createOperatorSubscriber(Q, function(D) {
                var G = A.now(),
                    F = G - Z;
                Z = G, Q.next(new TcA(D, F))
            }))
        })
    }
    PcA.timeInterval = veQ;
    var TcA = function() {
        function A(B, Q) {
            this.value = B, this.interval = Q
        }
        return A
    }();
    PcA.TimeInterval = TcA
});
var e90 = E((jcA) => {
    Object.defineProperty(jcA, "__esModule", {
        value: !0
    });
    jcA.timeoutWith = void 0;
    var feQ = SV(),
        heQ = C$1(),
        geQ = X61();

    function ueQ(A, B, Q) {
        var Z, D, G;
        if (Q = Q !== null && Q !== void 0 ? Q : feQ.async, heQ.isValidDate(A)) Z = A;
        else if (typeof A === "number") D = A;
        if (B) G = function() {
            return B
        };
        else throw new TypeError("No observable provided to switch to");
        if (Z == null && D == null) throw new TypeError("No timeout provided.");
        return geQ.timeout({
            first: Z,
            each: D,
            scheduler: Q,
            with: G
        })
    }
    jcA.timeoutWith = ueQ
});
var AQ0 = E((ycA) => {
    Object.defineProperty(ycA, "__esModule", {
        value: !0
    });
    ycA.timestamp = void 0;
    var meQ = G$1(),
        deQ = zT();

    function ceQ(A) {
        if (A === void 0) A = meQ.dateTimestampProvider;
        return deQ.map(function(B) {
            return {
                value: B,
                timestamp: A.now()
            }
        })
    }
    ycA.timestamp = ceQ
});
var BQ0 = E((bcA) => {
    Object.defineProperty(bcA, "__esModule", {
        value: !0
    });
    bcA.window = void 0;
    var xcA = SY(),
        leQ = FB(),
        vcA = H9(),
        peQ = TY(),
        ieQ = Y4();

    function neQ(A) {
        return leQ.operate(function(B, Q) {
            var Z = new xcA.Subject;
            Q.next(Z.asObservable());
            var D = function(G) {
                Z.error(G), Q.error(G)
            };
            return B.subscribe(vcA.createOperatorSubscriber(Q, function(G) {
                    return Z === null || Z === void 0 ? void 0 : Z.next(G)
                }, function() {
                    Z.complete(), Q.complete()
                }, D)), ieQ.innerFrom(A).subscribe(vcA.createOperatorSubscriber(Q, function() {
                    Z.complete(), Q.next(Z = new xcA.Subject)
                }, peQ.noop, D)),
                function() {
                    Z === null || Z === void 0 || Z.unsubscribe(), Z = null
                }
        })
    }
    bcA.window = neQ
});
var QQ0 = E((ea) => {
    var aeQ = ea && ea.__values || function(A) {
        var B = typeof Symbol === "function" && Symbol.iterator,
            Q = B && A[B],
            Z = 0;
        if (Q) return Q.call(A);
        if (A && typeof A.length === "number") return {
            next: function() {
                if (A && Z >= A.length) A = void 0;
                return {
                    value: A && A[Z++],
                    done: !A
                }
            }
        };
        throw new TypeError(B ? "Object is not iterable." : "Symbol.iterator is not defined.")
    };
    Object.defineProperty(ea, "__esModule", {
        value: !0
    });
    ea.windowCount = void 0;
    var hcA = SY(),
        seQ = FB(),
        reQ = H9();

    function oeQ(A, B) {
        if (B === void 0) B = 0;
        var Q = B > 0 ? B : A;
        return seQ.operate(function(Z, D) {
            var G = [new hcA.Subject],
                F = [],
                I = 0;
            D.next(G[0].asObservable()), Z.subscribe(reQ.createOperatorSubscriber(D, function(Y) {
                var W, J;
                try {
                    for (var X = aeQ(G), V = X.next(); !V.done; V = X.next()) {
                        var C = V.value;
                        C.next(Y)
                    }
                } catch (z) {
                    W = {
                        error: z
                    }
                } finally {
                    try {
                        if (V && !V.done && (J = X.return)) J.call(X)
                    } finally {
                        if (W) throw W.error
                    }
                }
                var K = I - A + 1;
                if (K >= 0 && K % Q === 0) G.shift().complete();
                if (++I % Q === 0) {
                    var H = new hcA.Subject;
                    G.push(H), D.next(H.asObservable())
                }
            }, function() {
                while (G.length > 0) G.shift().complete();
                D.complete()
            }, function(Y) {
                while (G.length > 0) G.shift().error(Y);
                D.error(Y)
            }, function() {
                F = null, G = null
            }))
        })
    }
    ea.windowCount = oeQ
});
var ZQ0 = E((ucA) => {
    Object.defineProperty(ucA, "__esModule", {
        value: !0
    });
    ucA.windowTime = void 0;
    var teQ = SY(),
        eeQ = SV(),
        A14 = WK(),
        B14 = FB(),
        Q14 = H9(),
        Z14 = CT(),
        D14 = jV(),
        gcA = KT();

    function G14(A) {
        var B, Q, Z = [];
        for (var D = 1; D < arguments.length; D++) Z[D - 1] = arguments[D];
        var G = (B = D14.popScheduler(Z)) !== null && B !== void 0 ? B : eeQ.asyncScheduler,
            F = (Q = Z[0]) !== null && Q !== void 0 ? Q : null,
            I = Z[1] || 1 / 0;
        return B14.operate(function(Y, W) {
            var J = [],
                X = !1,
                V = function(z) {
                    var {
                        window: $,
                        subs: L
                    } = z;
                    $.complete(), L.unsubscribe(), Z14.arrRemove(J, z), X && C()
                },
                C = function() {
                    if (J) {
                        var z = new A14.Subscription;
                        W.add(z);
                        var $ = new teQ.Subject,
                            L = {
                                window: $,
                                subs: z,
                                seen: 0
                            };
                        J.push(L), W.next($.asObservable()), gcA.executeSchedule(z, G, function() {
                            return V(L)
                        }, A)
                    }
                };
            if (F !== null && F >= 0) gcA.executeSchedule(W, G, C, F, !0);
            else X = !0;
            C();
            var K = function(z) {
                    return J.slice().forEach(z)
                },
                H = function(z) {
                    K(function($) {
                        var L = $.window;
                        return z(L)
                    }), z(W), W.unsubscribe()
                };
            return Y.subscribe(Q14.createOperatorSubscriber(W, function(z) {
                    K(function($) {
                        $.window.next(z), I <= ++$.seen && V($)
                    })
                }, function() {
                    return H(function(z) {
                        return z.complete()
                    })
                }, function(z) {
                    return H(function($) {
                        return $.error(z)
                    })
                })),
                function() {
                    J = null
                }
        })
    }
    ucA.windowTime = G14
});
var GQ0 = E((As) => {
    var F14 = As && As.__values || function(A) {
        var B = typeof Symbol === "function" && Symbol.iterator,
            Q = B && A[B],
            Z = 0;
        if (Q) return Q.call(A);
        if (A && typeof A.length === "number") return {
            next: function() {
                if (A && Z >= A.length) A = void 0;
                return {
                    value: A && A[Z++],
                    done: !A
                }
            }
        };
        throw new TypeError(B ? "Object is not iterable." : "Symbol.iterator is not defined.")
    };
    Object.defineProperty(As, "__esModule", {
        value: !0
    });
    As.windowToggle = void 0;
    var I14 = SY(),
        Y14 = WK(),
        W14 = FB(),
        dcA = Y4(),
        DQ0 = H9(),
        ccA = TY(),
        J14 = CT();

    function X14(A, B) {
        return W14.operate(function(Q, Z) {
            var D = [],
                G = function(F) {
                    while (0 < D.length) D.shift().error(F);
                    Z.error(F)
                };
            dcA.innerFrom(A).subscribe(DQ0.createOperatorSubscriber(Z, function(F) {
                var I = new I14.Subject;
                D.push(I);
                var Y = new Y14.Subscription,
                    W = function() {
                        J14.arrRemove(D, I), I.complete(), Y.unsubscribe()
                    },
                    J;
                try {
                    J = dcA.innerFrom(B(F))
                } catch (X) {
                    G(X);
                    return
                }
                Z.next(I.asObservable()), Y.add(J.subscribe(DQ0.createOperatorSubscriber(Z, W, ccA.noop, G)))
            }, ccA.noop)), Q.subscribe(DQ0.createOperatorSubscriber(Z, function(F) {
                var I, Y, W = D.slice();
                try {
                    for (var J = F14(W), X = J.next(); !X.done; X = J.next()) {
                        var V = X.value;
                        V.next(F)
                    }
                } catch (C) {
                    I = {
                        error: C
                    }
                } finally {
                    try {
                        if (X && !X.done && (Y = J.return)) Y.call(J)
                    } finally {
                        if (I) throw I.error
                    }
                }
            }, function() {
                while (0 < D.length) D.shift().complete();
                Z.complete()
            }, G, function() {
                while (0 < D.length) D.shift().unsubscribe()
            }))
        })
    }
    As.windowToggle = X14
});
var FQ0 = E((pcA) => {
    Object.defineProperty(pcA, "__esModule", {
        value: !0
    });
    pcA.windowWhen = void 0;
    var V14 = SY(),
        C14 = FB(),
        lcA = H9(),
        K14 = Y4();

    function H14(A) {
        return C14.operate(function(B, Q) {
            var Z, D, G = function(I) {
                    Z.error(I), Q.error(I)
                },
                F = function() {
                    D === null || D === void 0 || D.unsubscribe(), Z === null || Z === void 0 || Z.complete(), Z = new V14.Subject, Q.next(Z.asObservable());
                    var I;
                    try {
                        I = K14.innerFrom(A())
                    } catch (Y) {
                        G(Y);
                        return
                    }
                    I.subscribe(D = lcA.createOperatorSubscriber(Q, F, F, G))
                };
            F(), B.subscribe(lcA.createOperatorSubscriber(Q, function(I) {
                return Z.next(I)
            }, function() {
                Z.complete(), Q.complete()
            }, G, function() {
                D === null || D === void 0 || D.unsubscribe(), Z = null
            }))
        })
    }
    pcA.windowWhen = H14
});
var IQ0 = E((hy) => {
    var ncA = hy && hy.__read || function(A, B) {
            var Q = typeof Symbol === "function" && A[Symbol.iterator];
            if (!Q) return A;
            var Z = Q.call(A),
                D, G = [],
                F;
            try {
                while ((B === void 0 || B-- > 0) && !(D = Z.next()).done) G.push(D.value)
            } catch (I) {
                F = {
                    error: I
                }
            } finally {
                try {
                    if (D && !D.done && (Q = Z.return)) Q.call(Z)
                } finally {
                    if (F) throw F.error
                }
            }
            return G
        },
        acA = hy && hy.__spreadArray || function(A, B) {
            for (var Q = 0, Z = B.length, D = A.length; Q < Z; Q++, D++) A[D] = B[Q];
            return A
        };
    Object.defineProperty(hy, "__esModule", {
        value: !0
    });
    hy.withLatestFrom = void 0;
    var z14 = FB(),
        scA = H9(),
        E14 = Y4(),
        U14 = PY(),
        w14 = TY(),
        $14 = jV();

    function q14() {
        var A = [];
        for (var B = 0; B < arguments.length; B++) A[B] = arguments[B];
        var Q = $14.popResultSelector(A);
        return z14.operate(function(Z, D) {
            var G = A.length,
                F = new Array(G),
                I = A.map(function() {
                    return !1
                }),
                Y = !1,
                W = function(X) {
                    E14.innerFrom(A[X]).subscribe(scA.createOperatorSubscriber(D, function(V) {
                        if (F[X] = V, !Y && !I[X]) I[X] = !0, (Y = I.every(U14.identity)) && (I = null)
                    }, w14.noop))
                };
            for (var J = 0; J < G; J++) W(J);
            Z.subscribe(scA.createOperatorSubscriber(D, function(X) {
                if (Y) {
                    var V = acA([X], ncA(F));
                    D.next(Q ? Q.apply(void 0, acA([], ncA(V))) : V)
                }
            }))
        })
    }
    hy.withLatestFrom = q14
});
var YQ0 = E((rcA) => {
    Object.defineProperty(rcA, "__esModule", {
        value: !0
    });
    rcA.zipAll = void 0;
    var N14 = z$1(),
        L14 = cB0();

    function M14(A) {
        return L14.joinAllInternals(N14.zip, A)
    }
    rcA.zipAll = M14
});
var WQ0 = E((gy) => {
    var R14 = gy && gy.__read || function(A, B) {
            var Q = typeof Symbol === "function" && A[Symbol.iterator];
            if (!Q) return A;
            var Z = Q.call(A),
                D, G = [],
                F;
            try {
                while ((B === void 0 || B-- > 0) && !(D = Z.next()).done) G.push(D.value)
            } catch (I) {
                F = {
                    error: I
                }
            } finally {
                try {
                    if (D && !D.done && (Q = Z.return)) Q.call(Z)
                } finally {
                    if (F) throw F.error
                }
            }
            return G
        },
        O14 = gy && gy.__spreadArray || function(A, B) {
            for (var Q = 0, Z = B.length, D = A.length; Q < Z; Q++, D++) A[D] = B[Q];
            return A
        };
    Object.defineProperty(gy, "__esModule", {
        value: !0
    });
    gy.zip = void 0;
    var T14 = z$1(),
        P14 = FB();

    function S14() {
        var A = [];
        for (var B = 0; B < arguments.length; B++) A[B] = arguments[B];
        return P14.operate(function(Q, Z) {
            T14.zip.apply(void 0, O14([Q], R14(A))).subscribe(Z)
        })
    }
    gy.zip = S14
});
var JQ0 = E((uy) => {
    var j14 = uy && uy.__read || function(A, B) {
            var Q = typeof Symbol === "function" && A[Symbol.iterator];
            if (!Q) return A;
            var Z = Q.call(A),
                D, G = [],
                F;
            try {
                while ((B === void 0 || B-- > 0) && !(D = Z.next()).done) G.push(D.value)
            } catch (I) {
                F = {
                    error: I
                }
            } finally {
                try {
                    if (D && !D.done && (Q = Z.return)) Q.call(Z)
                } finally {
                    if (F) throw F.error
                }
            }
            return G
        },
        k14 = uy && uy.__spreadArray || function(A, B) {
            for (var Q = 0, Z = B.length, D = A.length; Q < Z; Q++, D++) A[D] = B[Q];
            return A
        };
    Object.defineProperty(uy, "__esModule", {
        value: !0
    });
    uy.zipWith = void 0;
    var y14 = WQ0();

    function _14() {
        var A = [];
        for (var B = 0; B < arguments.length; B++) A[B] = arguments[B];
        return y14.zip.apply(void 0, k14([], j14(A)))
    }
    uy.zipWith = _14
});