/* chunk:29 bytes:[648348, 726951) size:78603 source:unpacked-cli.js */
var fl0 = E((bl0, ol1) => {
    /*!
        localForage -- Offline Storage, Improved
        Version 1.10.0
        https://localforage.github.io/localForage
        (c) 2013-2017 Mozilla, Apache License 2.0
    */
    (function(A) {
        if (typeof bl0 === "object" && typeof ol1 !== "undefined") ol1.exports = A();
        else if (typeof define === "function" && define.amd) define([], A);
        else {
            var B;
            if (typeof window !== "undefined") B = window;
            else if (typeof global !== "undefined") B = global;
            else if (typeof self !== "undefined") B = self;
            else B = this;
            B.localforage = A()
        }
    })(function() {
        var A, B, Q;
        return function Z(D, G, F) {
            function I(J, X) {
                if (!G[J]) {
                    if (!D[J]) {
                        var V = W1;
                        if (!X && V) return V(J, !0);
                        if (Y) return Y(J, !0);
                        var C = new Error("Cannot find module '" + J + "'");
                        throw C.code = "MODULE_NOT_FOUND", C
                    }
                    var K = G[J] = {
                        exports: {}
                    };
                    D[J][0].call(K.exports, function(H) {
                        var z = D[J][1][H];
                        return I(z ? z : H)
                    }, K, K.exports, Z, D, G, F)
                }
                return G[J].exports
            }
            var Y = W1;
            for (var W = 0; W < F.length; W++) I(F[W]);
            return I
        }({
            1: [function(Z, D, G) {
                (function(F) {
                    var I = F.MutationObserver || F.WebKitMutationObserver,
                        Y;
                    if (I) {
                        var W = 0,
                            J = new I(H),
                            X = F.document.createTextNode("");
                        J.observe(X, {
                            characterData: !0
                        }), Y = function() {
                            X.data = W = ++W % 2
                        }
                    } else if (!F.setImmediate && typeof F.MessageChannel !== "undefined") {
                        var V = new F.MessageChannel;
                        V.port1.onmessage = H, Y = function() {
                            V.port2.postMessage(0)
                        }
                    } else if ("document" in F && "onreadystatechange" in F.document.createElement("script")) Y = function() {
                        var $ = F.document.createElement("script");
                        $.onreadystatechange = function() {
                            H(), $.onreadystatechange = null, $.parentNode.removeChild($), $ = null
                        }, F.document.documentElement.appendChild($)
                    };
                    else Y = function() {
                        setTimeout(H, 0)
                    };
                    var C, K = [];

                    function H() {
                        C = !0;
                        var $, L, N = K.length;
                        while (N) {
                            L = K, K = [], $ = -1;
                            while (++$ < N) L[$]();
                            N = K.length
                        }
                        C = !1
                    }
                    D.exports = z;

                    function z($) {
                        if (K.push($) === 1 && !C) Y()
                    }
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {}],
            2: [function(Z, D, G) {
                var F = Z(1);

                function I() {}
                var Y = {},
                    W = ["REJECTED"],
                    J = ["FULFILLED"],
                    X = ["PENDING"];
                D.exports = V;

                function V(P) {
                    if (typeof P !== "function") throw new TypeError("resolver must be a function");
                    if (this.state = X, this.queue = [], this.outcome = void 0, P !== I) z(this, P)
                }
                V.prototype.catch = function(P) {
                    return this.then(null, P)
                }, V.prototype.then = function(P, j) {
                    if (typeof P !== "function" && this.state === J || typeof j !== "function" && this.state === W) return this;
                    var f = new this.constructor(I);
                    if (this.state !== X) {
                        var k = this.state === J ? P : j;
                        K(f, k, this.outcome)
                    } else this.queue.push(new C(f, P, j));
                    return f
                };

                function C(P, j, f) {
                    if (this.promise = P, typeof j === "function") this.onFulfilled = j, this.callFulfilled = this.otherCallFulfilled;
                    if (typeof f === "function") this.onRejected = f, this.callRejected = this.otherCallRejected
                }
                C.prototype.callFulfilled = function(P) {
                    Y.resolve(this.promise, P)
                }, C.prototype.otherCallFulfilled = function(P) {
                    K(this.promise, this.onFulfilled, P)
                }, C.prototype.callRejected = function(P) {
                    Y.reject(this.promise, P)
                }, C.prototype.otherCallRejected = function(P) {
                    K(this.promise, this.onRejected, P)
                };

                function K(P, j, f) {
                    F(function() {
                        var k;
                        try {
                            k = j(f)
                        } catch (c) {
                            return Y.reject(P, c)
                        }
                        if (k === P) Y.reject(P, new TypeError("Cannot resolve promise with itself"));
                        else Y.resolve(P, k)
                    })
                }
                Y.resolve = function(P, j) {
                    var f = $(H, j);
                    if (f.status === "error") return Y.reject(P, f.value);
                    var k = f.value;
                    if (k) z(P, k);
                    else {
                        P.state = J, P.outcome = j;
                        var c = -1,
                            u = P.queue.length;
                        while (++c < u) P.queue[c].callFulfilled(j)
                    }
                    return P
                }, Y.reject = function(P, j) {
                    P.state = W, P.outcome = j;
                    var f = -1,
                        k = P.queue.length;
                    while (++f < k) P.queue[f].callRejected(j);
                    return P
                };

                function H(P) {
                    var j = P && P.then;
                    if (P && (typeof P === "object" || typeof P === "function") && typeof j === "function") return function f() {
                        j.apply(P, arguments)
                    }
                }

                function z(P, j) {
                    var f = !1;

                    function k(l) {
                        if (f) return;
                        f = !0, Y.reject(P, l)
                    }

                    function c(l) {
                        if (f) return;
                        f = !0, Y.resolve(P, l)
                    }

                    function u() {
                        j(c, k)
                    }
                    var a = $(u);
                    if (a.status === "error") k(a.value)
                }

                function $(P, j) {
                    var f = {};
                    try {
                        f.value = P(j), f.status = "success"
                    } catch (k) {
                        f.status = "error", f.value = k
                    }
                    return f
                }
                V.resolve = L;

                function L(P) {
                    if (P instanceof this) return P;
                    return Y.resolve(new this(I), P)
                }
                V.reject = N;

                function N(P) {
                    var j = new this(I);
                    return Y.reject(j, P)
                }
                V.all = R;

                function R(P) {
                    var j = this;
                    if (Object.prototype.toString.call(P) !== "[object Array]") return this.reject(new TypeError("must be an array"));
                    var f = P.length,
                        k = !1;
                    if (!f) return this.resolve([]);
                    var c = new Array(f),
                        u = 0,
                        a = -1,
                        l = new this(I);
                    while (++a < f) y(P[a], a);
                    return l;

                    function y(t, E1) {
                        j.resolve(t).then(C1, function(_1) {
                            if (!k) k = !0, Y.reject(l, _1)
                        });

                        function C1(_1) {
                            if (c[E1] = _1, ++u === f && !k) k = !0, Y.resolve(l, c)
                        }
                    }
                }
                V.race = O;

                function O(P) {
                    var j = this;
                    if (Object.prototype.toString.call(P) !== "[object Array]") return this.reject(new TypeError("must be an array"));
                    var f = P.length,
                        k = !1;
                    if (!f) return this.resolve([]);
                    var c = -1,
                        u = new this(I);
                    while (++c < f) a(P[c]);
                    return u;

                    function a(l) {
                        j.resolve(l).then(function(y) {
                            if (!k) k = !0, Y.resolve(u, y)
                        }, function(y) {
                            if (!k) k = !0, Y.reject(u, y)
                        })
                    }
                }
            }, {
                "1": 1
            }],
            3: [function(Z, D, G) {
                (function(F) {
                    if (typeof F.Promise !== "function") F.Promise = Z(2)
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                "2": 2
            }],
            4: [function(Z, D, G) {
                var F = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function($1) {
                    return typeof $1
                } : function($1) {
                    return $1 && typeof Symbol === "function" && $1.constructor === Symbol && $1 !== Symbol.prototype ? "symbol" : typeof $1
                };

                function I($1, B0) {
                    if (!($1 instanceof B0)) throw new TypeError("Cannot call a class as a function")
                }

                function Y() {
                    try {
                        if (typeof indexedDB !== "undefined") return indexedDB;
                        if (typeof webkitIndexedDB !== "undefined") return webkitIndexedDB;
                        if (typeof mozIndexedDB !== "undefined") return mozIndexedDB;
                        if (typeof OIndexedDB !== "undefined") return OIndexedDB;
                        if (typeof msIndexedDB !== "undefined") return msIndexedDB
                    } catch ($1) {
                        return
                    }
                }
                var W = Y();

                function J() {
                    try {
                        if (!W || !W.open) return !1;
                        var $1 = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
                            B0 = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
                        return (!$1 || B0) && typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined"
                    } catch (m1) {
                        return !1
                    }
                }

                function X($1, B0) {
                    $1 = $1 || [], B0 = B0 || {};
                    try {
                        return new Blob($1, B0)
                    } catch (q0) {
                        if (q0.name !== "TypeError") throw q0;
                        var m1 = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder,
                            z0 = new m1;
                        for (var M0 = 0; M0 < $1.length; M0 += 1) z0.append($1[M0]);
                        return z0.getBlob(B0.type)
                    }
                }
                if (typeof Promise === "undefined") Z(3);
                var V = Promise;

                function C($1, B0) {
                    if (B0) $1.then(function(m1) {
                        B0(null, m1)
                    }, function(m1) {
                        B0(m1)
                    })
                }

                function K($1, B0, m1) {
                    if (typeof B0 === "function") $1.then(B0);
                    if (typeof m1 === "function") $1.catch(m1)
                }

                function H($1) {
                    if (typeof $1 !== "string") console.warn($1 + " used as a key, but it is not a string."), $1 = String($1);
                    return $1
                }

                function z() {
                    if (arguments.length && typeof arguments[arguments.length - 1] === "function") return arguments[arguments.length - 1]
                }
                var $ = "local-forage-detect-blob-support",
                    L = void 0,
                    N = {},
                    R = Object.prototype.toString,
                    O = "readonly",
                    P = "readwrite";

                function j($1) {
                    var B0 = $1.length,
                        m1 = new ArrayBuffer(B0),
                        z0 = new Uint8Array(m1);
                    for (var M0 = 0; M0 < B0; M0++) z0[M0] = $1.charCodeAt(M0);
                    return m1
                }

                function f($1) {
                    return new V(function(B0) {
                        var m1 = $1.transaction($, P),
                            z0 = X([""]);
                        m1.objectStore($).put(z0, "key"), m1.onabort = function(M0) {
                            M0.preventDefault(), M0.stopPropagation(), B0(!1)
                        }, m1.oncomplete = function() {
                            var M0 = navigator.userAgent.match(/Chrome\/(\d+)/),
                                q0 = navigator.userAgent.match(/Edge\//);
                            B0(q0 || !M0 || parseInt(M0[1], 10) >= 43)
                        }
                    }).catch(function() {
                        return !1
                    })
                }

                function k($1) {
                    if (typeof L === "boolean") return V.resolve(L);
                    return f($1).then(function(B0) {
                        return L = B0, L
                    })
                }

                function c($1) {
                    var B0 = N[$1.name],
                        m1 = {};
                    if (m1.promise = new V(function(z0, M0) {
                            m1.resolve = z0, m1.reject = M0
                        }), B0.deferredOperations.push(m1), !B0.dbReady) B0.dbReady = m1.promise;
                    else B0.dbReady = B0.dbReady.then(function() {
                        return m1.promise
                    })
                }

                function u($1) {
                    var B0 = N[$1.name],
                        m1 = B0.deferredOperations.pop();
                    if (m1) return m1.resolve(), m1.promise
                }

                function a($1, B0) {
                    var m1 = N[$1.name],
                        z0 = m1.deferredOperations.pop();
                    if (z0) return z0.reject(B0), z0.promise
                }

                function l($1, B0) {
                    return new V(function(m1, z0) {
                        if (N[$1.name] = N[$1.name] || Q1(), $1.db)
                            if (B0) c($1), $1.db.close();
                            else return m1($1.db);
                        var M0 = [$1.name];
                        if (B0) M0.push($1.version);
                        var q0 = W.open.apply(W, M0);
                        if (B0) q0.onupgradeneeded = function(AA) {
                            var HA = q0.result;
                            try {
                                if (HA.createObjectStore($1.storeName), AA.oldVersion <= 1) HA.createObjectStore($)
                            } catch (WA) {
                                if (WA.name === "ConstraintError") console.warn('The database "' + $1.name + '" has been upgraded from version ' + AA.oldVersion + " to version " + AA.newVersion + ', but the storage "' + $1.storeName + '" already exists.');
                                else throw WA
                            }
                        };
                        q0.onerror = function(AA) {
                            AA.preventDefault(), z0(q0.error)
                        }, q0.onsuccess = function() {
                            var AA = q0.result;
                            AA.onversionchange = function(HA) {
                                HA.target.close()
                            }, m1(AA), u($1)
                        }
                    })
                }

                function y($1) {
                    return l($1, !1)
                }

                function t($1) {
                    return l($1, !0)
                }

                function E1($1, B0) {
                    if (!$1.db) return !0;
                    var m1 = !$1.db.objectStoreNames.contains($1.storeName),
                        z0 = $1.version < $1.db.version,
                        M0 = $1.version > $1.db.version;
                    if (z0) {
                        if ($1.version !== B0) console.warn('The database "' + $1.name + `" can't be downgraded from version ` + $1.db.version + " to version " + $1.version + ".");
                        $1.version = $1.db.version
                    }
                    if (M0 || m1) {
                        if (m1) {
                            var q0 = $1.db.version + 1;
                            if (q0 > $1.version) $1.version = q0
                        }
                        return !0
                    }
                    return !1
                }

                function C1($1) {
                    return new V(function(B0, m1) {
                        var z0 = new FileReader;
                        z0.onerror = m1, z0.onloadend = function(M0) {
                            var q0 = btoa(M0.target.result || "");
                            B0({
                                __local_forage_encoded_blob: !0,
                                data: q0,
                                type: $1.type
                            })
                        }, z0.readAsBinaryString($1)
                    })
                }

                function _1($1) {
                    var B0 = j(atob($1.data));
                    return X([B0], {
                        type: $1.type
                    })
                }

                function F0($1) {
                    return $1 && $1.__local_forage_encoded_blob
                }

                function W0($1) {
                    var B0 = this,
                        m1 = B0._initReady().then(function() {
                            var z0 = N[B0._dbInfo.name];
                            if (z0 && z0.dbReady) return z0.dbReady
                        });
                    return K(m1, $1, $1), m1
                }

                function g1($1) {
                    c($1);
                    var B0 = N[$1.name],
                        m1 = B0.forages;
                    for (var z0 = 0; z0 < m1.length; z0++) {
                        var M0 = m1[z0];
                        if (M0._dbInfo.db) M0._dbInfo.db.close(), M0._dbInfo.db = null
                    }
                    return $1.db = null, y($1).then(function(q0) {
                        if ($1.db = q0, E1($1)) return t($1);
                        return q0
                    }).then(function(q0) {
                        $1.db = B0.db = q0;
                        for (var AA = 0; AA < m1.length; AA++) m1[AA]._dbInfo.db = q0
                    }).catch(function(q0) {
                        throw a($1, q0), q0
                    })
                }

                function w1($1, B0, m1, z0) {
                    if (z0 === void 0) z0 = 1;
                    try {
                        var M0 = $1.db.transaction($1.storeName, B0);
                        m1(null, M0)
                    } catch (q0) {
                        if (z0 > 0 && (!$1.db || q0.name === "InvalidStateError" || q0.name === "NotFoundError")) return V.resolve().then(function() {
                            if (!$1.db || q0.name === "NotFoundError" && !$1.db.objectStoreNames.contains($1.storeName) && $1.version <= $1.db.version) {
                                if ($1.db) $1.version = $1.db.version + 1;
                                return t($1)
                            }
                        }).then(function() {
                            return g1($1).then(function() {
                                w1($1, B0, m1, z0 - 1)
                            })
                        }).catch(m1);
                        m1(q0)
                    }
                }

                function Q1() {
                    return {
                        forages: [],
                        db: null,
                        dbReady: null,
                        deferredOperations: []
                    }
                }

                function k1($1) {
                    var B0 = this,
                        m1 = {
                            db: null
                        };
                    if ($1)
                        for (var z0 in $1) m1[z0] = $1[z0];
                    var M0 = N[m1.name];
                    if (!M0) M0 = Q1(), N[m1.name] = M0;
                    if (M0.forages.push(B0), !B0._initReady) B0._initReady = B0.ready, B0.ready = W0;
                    var q0 = [];

                    function AA() {
                        return V.resolve()
                    }
                    for (var HA = 0; HA < M0.forages.length; HA++) {
                        var WA = M0.forages[HA];
                        if (WA !== B0) q0.push(WA._initReady().catch(AA))
                    }
                    var PA = M0.forages.slice(0);
                    return V.all(q0).then(function() {
                        return m1.db = M0.db, y(m1)
                    }).then(function(cA) {
                        if (m1.db = cA, E1(m1, B0._defaultConfig.version)) return t(m1);
                        return cA
                    }).then(function(cA) {
                        m1.db = M0.db = cA, B0._dbInfo = m1;
                        for (var X2 = 0; X2 < PA.length; X2++) {
                            var w9 = PA[X2];
                            if (w9 !== B0) w9._dbInfo.db = m1.db, w9._dbInfo.version = m1.version
                        }
                    })
                }

                function H1($1, B0) {
                    var m1 = this;
                    $1 = H($1);
                    var z0 = new V(function(M0, q0) {
                        m1.ready().then(function() {
                            w1(m1._dbInfo, O, function(AA, HA) {
                                if (AA) return q0(AA);
                                try {
                                    var WA = HA.objectStore(m1._dbInfo.storeName),
                                        PA = WA.get($1);
                                    PA.onsuccess = function() {
                                        var cA = PA.result;
                                        if (cA === void 0) cA = null;
                                        if (F0(cA)) cA = _1(cA);
                                        M0(cA)
                                    }, PA.onerror = function() {
                                        q0(PA.error)
                                    }
                                } catch (cA) {
                                    q0(cA)
                                }
                            })
                        }).catch(q0)
                    });
                    return C(z0, B0), z0
                }

                function A0($1, B0) {
                    var m1 = this,
                        z0 = new V(function(M0, q0) {
                            m1.ready().then(function() {
                                w1(m1._dbInfo, O, function(AA, HA) {
                                    if (AA) return q0(AA);
                                    try {
                                        var WA = HA.objectStore(m1._dbInfo.storeName),
                                            PA = WA.openCursor(),
                                            cA = 1;
                                        PA.onsuccess = function() {
                                            var X2 = PA.result;
                                            if (X2) {
                                                var w9 = X2.value;
                                                if (F0(w9)) w9 = _1(w9);
                                                var h9 = $1(w9, X2.key, cA++);
                                                if (h9 !== void 0) M0(h9);
                                                else X2.continue()
                                            } else M0()
                                        }, PA.onerror = function() {
                                            q0(PA.error)
                                        }
                                    } catch (X2) {
                                        q0(X2)
                                    }
                                })
                            }).catch(q0)
                        });
                    return C(z0, B0), z0
                }

                function V0($1, B0, m1) {
                    var z0 = this;
                    $1 = H($1);
                    var M0 = new V(function(q0, AA) {
                        var HA;
                        z0.ready().then(function() {
                            if (HA = z0._dbInfo, R.call(B0) === "[object Blob]") return k(HA.db).then(function(WA) {
                                if (WA) return B0;
                                return C1(B0)
                            });
                            return B0
                        }).then(function(WA) {
                            w1(z0._dbInfo, P, function(PA, cA) {
                                if (PA) return AA(PA);
                                try {
                                    var X2 = cA.objectStore(z0._dbInfo.storeName);
                                    if (WA === null) WA = void 0;
                                    var w9 = X2.put(WA, $1);
                                    cA.oncomplete = function() {
                                        if (WA === void 0) WA = null;
                                        q0(WA)
                                    }, cA.onabort = cA.onerror = function() {
                                        var h9 = w9.error ? w9.error : w9.transaction.error;
                                        AA(h9)
                                    }
                                } catch (h9) {
                                    AA(h9)
                                }
                            })
                        }).catch(AA)
                    });
                    return C(M0, m1), M0
                }

                function o1($1, B0) {
                    var m1 = this;
                    $1 = H($1);
                    var z0 = new V(function(M0, q0) {
                        m1.ready().then(function() {
                            w1(m1._dbInfo, P, function(AA, HA) {
                                if (AA) return q0(AA);
                                try {
                                    var WA = HA.objectStore(m1._dbInfo.storeName),
                                        PA = WA.delete($1);
                                    HA.oncomplete = function() {
                                        M0()
                                    }, HA.onerror = function() {
                                        q0(PA.error)
                                    }, HA.onabort = function() {
                                        var cA = PA.error ? PA.error : PA.transaction.error;
                                        q0(cA)
                                    }
                                } catch (cA) {
                                    q0(cA)
                                }
                            })
                        }).catch(q0)
                    });
                    return C(z0, B0), z0
                }

                function e($1) {
                    var B0 = this,
                        m1 = new V(function(z0, M0) {
                            B0.ready().then(function() {
                                w1(B0._dbInfo, P, function(q0, AA) {
                                    if (q0) return M0(q0);
                                    try {
                                        var HA = AA.objectStore(B0._dbInfo.storeName),
                                            WA = HA.clear();
                                        AA.oncomplete = function() {
                                            z0()
                                        }, AA.onabort = AA.onerror = function() {
                                            var PA = WA.error ? WA.error : WA.transaction.error;
                                            M0(PA)
                                        }
                                    } catch (PA) {
                                        M0(PA)
                                    }
                                })
                            }).catch(M0)
                        });
                    return C(m1, $1), m1
                }

                function Z1($1) {
                    var B0 = this,
                        m1 = new V(function(z0, M0) {
                            B0.ready().then(function() {
                                w1(B0._dbInfo, O, function(q0, AA) {
                                    if (q0) return M0(q0);
                                    try {
                                        var HA = AA.objectStore(B0._dbInfo.storeName),
                                            WA = HA.count();
                                        WA.onsuccess = function() {
                                            z0(WA.result)
                                        }, WA.onerror = function() {
                                            M0(WA.error)
                                        }
                                    } catch (PA) {
                                        M0(PA)
                                    }
                                })
                            }).catch(M0)
                        });
                    return C(m1, $1), m1
                }

                function I1($1, B0) {
                    var m1 = this,
                        z0 = new V(function(M0, q0) {
                            if ($1 < 0) {
                                M0(null);
                                return
                            }
                            m1.ready().then(function() {
                                w1(m1._dbInfo, O, function(AA, HA) {
                                    if (AA) return q0(AA);
                                    try {
                                        var WA = HA.objectStore(m1._dbInfo.storeName),
                                            PA = !1,
                                            cA = WA.openKeyCursor();
                                        cA.onsuccess = function() {
                                            var X2 = cA.result;
                                            if (!X2) {
                                                M0(null);
                                                return
                                            }
                                            if ($1 === 0) M0(X2.key);
                                            else if (!PA) PA = !0, X2.advance($1);
                                            else M0(X2.key)
                                        }, cA.onerror = function() {
                                            q0(cA.error)
                                        }
                                    } catch (X2) {
                                        q0(X2)
                                    }
                                })
                            }).catch(q0)
                        });
                    return C(z0, B0), z0
                }

                function U1($1) {
                    var B0 = this,
                        m1 = new V(function(z0, M0) {
                            B0.ready().then(function() {
                                w1(B0._dbInfo, O, function(q0, AA) {
                                    if (q0) return M0(q0);
                                    try {
                                        var HA = AA.objectStore(B0._dbInfo.storeName),
                                            WA = HA.openKeyCursor(),
                                            PA = [];
                                        WA.onsuccess = function() {
                                            var cA = WA.result;
                                            if (!cA) {
                                                z0(PA);
                                                return
                                            }
                                            PA.push(cA.key), cA.continue()
                                        }, WA.onerror = function() {
                                            M0(WA.error)
                                        }
                                    } catch (cA) {
                                        M0(cA)
                                    }
                                })
                            }).catch(M0)
                        });
                    return C(m1, $1), m1
                }

                function O1($1, B0) {
                    B0 = z.apply(this, arguments);
                    var m1 = this.config();
                    if ($1 = typeof $1 !== "function" && $1 || {}, !$1.name) $1.name = $1.name || m1.name, $1.storeName = $1.storeName || m1.storeName;
                    var z0 = this,
                        M0;
                    if (!$1.name) M0 = V.reject("Invalid arguments");
                    else {
                        var q0 = $1.name === m1.name && z0._dbInfo.db,
                            AA = q0 ? V.resolve(z0._dbInfo.db) : y($1).then(function(HA) {
                                var WA = N[$1.name],
                                    PA = WA.forages;
                                WA.db = HA;
                                for (var cA = 0; cA < PA.length; cA++) PA[cA]._dbInfo.db = HA;
                                return HA
                            });
                        if (!$1.storeName) M0 = AA.then(function(HA) {
                            c($1);
                            var WA = N[$1.name],
                                PA = WA.forages;
                            HA.close();
                            for (var cA = 0; cA < PA.length; cA++) {
                                var X2 = PA[cA];
                                X2._dbInfo.db = null
                            }
                            var w9 = new V(function(h9, SQ) {
                                var yA = W.deleteDatabase($1.name);
                                yA.onerror = function() {
                                    var YB = yA.result;
                                    if (YB) YB.close();
                                    SQ(yA.error)
                                }, yA.onblocked = function() {
                                    console.warn('dropInstance blocked for database "' + $1.name + '" until all open connections are closed')
                                }, yA.onsuccess = function() {
                                    var YB = yA.result;
                                    if (YB) YB.close();
                                    h9(YB)
                                }
                            });
                            return w9.then(function(h9) {
                                WA.db = h9;
                                for (var SQ = 0; SQ < PA.length; SQ++) {
                                    var yA = PA[SQ];
                                    u(yA._dbInfo)
                                }
                            }).catch(function(h9) {
                                throw (a($1, h9) || V.resolve()).catch(function() {}), h9
                            })
                        });
                        else M0 = AA.then(function(HA) {
                            if (!HA.objectStoreNames.contains($1.storeName)) return;
                            var WA = HA.version + 1;
                            c($1);
                            var PA = N[$1.name],
                                cA = PA.forages;
                            HA.close();
                            for (var X2 = 0; X2 < cA.length; X2++) {
                                var w9 = cA[X2];
                                w9._dbInfo.db = null, w9._dbInfo.version = WA
                            }
                            var h9 = new V(function(SQ, yA) {
                                var YB = W.open($1.name, WA);
                                YB.onerror = function(RQ) {
                                    var S9 = YB.result;
                                    S9.close(), yA(RQ)
                                }, YB.onupgradeneeded = function() {
                                    var RQ = YB.result;
                                    RQ.deleteObjectStore($1.storeName)
                                }, YB.onsuccess = function() {
                                    var RQ = YB.result;
                                    RQ.close(), SQ(RQ)
                                }
                            });
                            return h9.then(function(SQ) {
                                PA.db = SQ;
                                for (var yA = 0; yA < cA.length; yA++) {
                                    var YB = cA[yA];
                                    YB._dbInfo.db = SQ, u(YB._dbInfo)
                                }
                            }).catch(function(SQ) {
                                throw (a($1, SQ) || V.resolve()).catch(function() {}), SQ
                            })
                        })
                    }
                    return C(M0, B0), M0
                }
                var B1 = {
                    _driver: "asyncStorage",
                    _initStorage: k1,
                    _support: J(),
                    iterate: A0,
                    getItem: H1,
                    setItem: V0,
                    removeItem: o1,
                    clear: e,
                    length: Z1,
                    key: I1,
                    keys: U1,
                    dropInstance: O1
                };

                function x1() {
                    return typeof openDatabase === "function"
                }
                var c1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    a1 = "~~local_forage_type~",
                    C0 = /^~~local_forage_type~([^~]+)~/,
                    K0 = "__lfsc__:",
                    R0 = K0.length,
                    wA = "arbf",
                    u0 = "blob",
                    TA = "si08",
                    dA = "ui08",
                    J2 = "uic8",
                    s2 = "si16",
                    N2 = "si32",
                    U9 = "ur16",
                    m6 = "ui32",
                    kA = "fl32",
                    G2 = "fl64",
                    T2 = R0 + wA.length,
                    pA = Object.prototype.toString;

                function bA($1) {
                    var B0 = $1.length * 0.75,
                        m1 = $1.length,
                        z0, M0 = 0,
                        q0, AA, HA, WA;
                    if ($1[$1.length - 1] === "=") {
                        if (B0--, $1[$1.length - 2] === "=") B0--
                    }
                    var PA = new ArrayBuffer(B0),
                        cA = new Uint8Array(PA);
                    for (z0 = 0; z0 < m1; z0 += 4) q0 = c1.indexOf($1[z0]), AA = c1.indexOf($1[z0 + 1]), HA = c1.indexOf($1[z0 + 2]), WA = c1.indexOf($1[z0 + 3]), cA[M0++] = q0 << 2 | AA >> 4, cA[M0++] = (AA & 15) << 4 | HA >> 2, cA[M0++] = (HA & 3) << 6 | WA & 63;
                    return PA
                }

                function r2($1) {
                    var B0 = new Uint8Array($1),
                        m1 = "",
                        z0;
                    for (z0 = 0; z0 < B0.length; z0 += 3) m1 += c1[B0[z0] >> 2], m1 += c1[(B0[z0] & 3) << 4 | B0[z0 + 1] >> 4], m1 += c1[(B0[z0 + 1] & 15) << 2 | B0[z0 + 2] >> 6], m1 += c1[B0[z0 + 2] & 63];
                    if (B0.length % 3 === 2) m1 = m1.substring(0, m1.length - 1) + "=";
                    else if (B0.length % 3 === 1) m1 = m1.substring(0, m1.length - 2) + "==";
                    return m1
                }

                function xB($1, B0) {
                    var m1 = "";
                    if ($1) m1 = pA.call($1);
                    if ($1 && (m1 === "[object ArrayBuffer]" || $1.buffer && pA.call($1.buffer) === "[object ArrayBuffer]")) {
                        var z0, M0 = K0;
                        if ($1 instanceof ArrayBuffer) z0 = $1, M0 += wA;
                        else if (z0 = $1.buffer, m1 === "[object Int8Array]") M0 += TA;
                        else if (m1 === "[object Uint8Array]") M0 += dA;
                        else if (m1 === "[object Uint8ClampedArray]") M0 += J2;
                        else if (m1 === "[object Int16Array]") M0 += s2;
                        else if (m1 === "[object Uint16Array]") M0 += U9;
                        else if (m1 === "[object Int32Array]") M0 += N2;
                        else if (m1 === "[object Uint32Array]") M0 += m6;
                        else if (m1 === "[object Float32Array]") M0 += kA;
                        else if (m1 === "[object Float64Array]") M0 += G2;
                        else B0(new Error("Failed to get type for BinaryArray"));
                        B0(M0 + r2(z0))
                    } else if (m1 === "[object Blob]") {
                        var q0 = new FileReader;
                        q0.onload = function() {
                            var AA = a1 + $1.type + "~" + r2(this.result);
                            B0(K0 + u0 + AA)
                        }, q0.readAsArrayBuffer($1)
                    } else try {
                        B0(JSON.stringify($1))
                    } catch (AA) {
                        console.error("Couldn't convert value into a JSON string: ", $1), B0(null, AA)
                    }
                }

                function o6($1) {
                    if ($1.substring(0, R0) !== K0) return JSON.parse($1);
                    var B0 = $1.substring(T2),
                        m1 = $1.substring(R0, T2),
                        z0;
                    if (m1 === u0 && C0.test(B0)) {
                        var M0 = B0.match(C0);
                        z0 = M0[1], B0 = B0.substring(M0[0].length)
                    }
                    var q0 = bA(B0);
                    switch (m1) {
                        case wA:
                            return q0;
                        case u0:
                            return X([q0], {
                                type: z0
                            });
                        case TA:
                            return new Int8Array(q0);
                        case dA:
                            return new Uint8Array(q0);
                        case J2:
                            return new Uint8ClampedArray(q0);
                        case s2:
                            return new Int16Array(q0);
                        case U9:
                            return new Uint16Array(q0);
                        case N2:
                            return new Int32Array(q0);
                        case m6:
                            return new Uint32Array(q0);
                        case kA:
                            return new Float32Array(q0);
                        case G2:
                            return new Float64Array(q0);
                        default:
                            throw new Error("Unkown type: " + m1)
                    }
                }
                var D3 = {
                    serialize: xB,
                    deserialize: o6,
                    stringToBuffer: bA,
                    bufferToString: r2
                };

                function C4($1, B0, m1, z0) {
                    $1.executeSql("CREATE TABLE IF NOT EXISTS " + B0.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], m1, z0)
                }

                function oB($1) {
                    var B0 = this,
                        m1 = {
                            db: null
                        };
                    if ($1)
                        for (var z0 in $1) m1[z0] = typeof $1[z0] !== "string" ? $1[z0].toString() : $1[z0];
                    var M0 = new V(function(q0, AA) {
                        try {
                            m1.db = openDatabase(m1.name, String(m1.version), m1.description, m1.size)
                        } catch (HA) {
                            return AA(HA)
                        }
                        m1.db.transaction(function(HA) {
                            C4(HA, m1, function() {
                                B0._dbInfo = m1, q0()
                            }, function(WA, PA) {
                                AA(PA)
                            })
                        }, AA)
                    });
                    return m1.serializer = D3, M0
                }

                function d6($1, B0, m1, z0, M0, q0) {
                    $1.executeSql(m1, z0, M0, function(AA, HA) {
                        if (HA.code === HA.SYNTAX_ERR) AA.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [B0.storeName], function(WA, PA) {
                            if (!PA.rows.length) C4(WA, B0, function() {
                                WA.executeSql(m1, z0, M0, q0)
                            }, q0);
                            else q0(WA, HA)
                        }, q0);
                        else q0(AA, HA)
                    }, q0)
                }

                function m5($1, B0) {
                    var m1 = this;
                    $1 = H($1);
                    var z0 = new V(function(M0, q0) {
                        m1.ready().then(function() {
                            var AA = m1._dbInfo;
                            AA.db.transaction(function(HA) {
                                d6(HA, AA, "SELECT * FROM " + AA.storeName + " WHERE key = ? LIMIT 1", [$1], function(WA, PA) {
                                    var cA = PA.rows.length ? PA.rows.item(0).value : null;
                                    if (cA) cA = AA.serializer.deserialize(cA);
                                    M0(cA)
                                }, function(WA, PA) {
                                    q0(PA)
                                })
                            })
                        }).catch(q0)
                    });
                    return C(z0, B0), z0
                }

                function d5($1, B0) {
                    var m1 = this,
                        z0 = new V(function(M0, q0) {
                            m1.ready().then(function() {
                                var AA = m1._dbInfo;
                                AA.db.transaction(function(HA) {
                                    d6(HA, AA, "SELECT * FROM " + AA.storeName, [], function(WA, PA) {
                                        var cA = PA.rows,
                                            X2 = cA.length;
                                        for (var w9 = 0; w9 < X2; w9++) {
                                            var h9 = cA.item(w9),
                                                SQ = h9.value;
                                            if (SQ) SQ = AA.serializer.deserialize(SQ);
                                            if (SQ = $1(SQ, h9.key, w9 + 1), SQ !== void 0) {
                                                M0(SQ);
                                                return
                                            }
                                        }
                                        M0()
                                    }, function(WA, PA) {
                                        q0(PA)
                                    })
                                })
                            }).catch(q0)
                        });
                    return C(z0, B0), z0
                }

                function w8($1, B0, m1, z0) {
                    var M0 = this;
                    $1 = H($1);
                    var q0 = new V(function(AA, HA) {
                        M0.ready().then(function() {
                            if (B0 === void 0) B0 = null;
                            var WA = B0,
                                PA = M0._dbInfo;
                            PA.serializer.serialize(B0, function(cA, X2) {
                                if (X2) HA(X2);
                                else PA.db.transaction(function(w9) {
                                    d6(w9, PA, "INSERT OR REPLACE INTO " + PA.storeName + " (key, value) VALUES (?, ?)", [$1, cA], function() {
                                        AA(WA)
                                    }, function(h9, SQ) {
                                        HA(SQ)
                                    })
                                }, function(w9) {
                                    if (w9.code === w9.QUOTA_ERR) {
                                        if (z0 > 0) {
                                            AA(w8.apply(M0, [$1, WA, m1, z0 - 1]));
                                            return
                                        }
                                        HA(w9)
                                    }
                                })
                            })
                        }).catch(HA)
                    });
                    return C(q0, m1), q0
                }

                function N6($1, B0, m1) {
                    return w8.apply(this, [$1, B0, m1, 1])
                }

                function w7($1, B0) {
                    var m1 = this;
                    $1 = H($1);
                    var z0 = new V(function(M0, q0) {
                        m1.ready().then(function() {
                            var AA = m1._dbInfo;
                            AA.db.transaction(function(HA) {
                                d6(HA, AA, "DELETE FROM " + AA.storeName + " WHERE key = ?", [$1], function() {
                                    M0()
                                }, function(WA, PA) {
                                    q0(PA)
                                })
                            })
                        }).catch(q0)
                    });
                    return C(z0, B0), z0
                }

                function i3($1) {
                    var B0 = this,
                        m1 = new V(function(z0, M0) {
                            B0.ready().then(function() {
                                var q0 = B0._dbInfo;
                                q0.db.transaction(function(AA) {
                                    d6(AA, q0, "DELETE FROM " + q0.storeName, [], function() {
                                        z0()
                                    }, function(HA, WA) {
                                        M0(WA)
                                    })
                                })
                            }).catch(M0)
                        });
                    return C(m1, $1), m1
                }

                function d7($1) {
                    var B0 = this,
                        m1 = new V(function(z0, M0) {
                            B0.ready().then(function() {
                                var q0 = B0._dbInfo;
                                q0.db.transaction(function(AA) {
                                    d6(AA, q0, "SELECT COUNT(key) as c FROM " + q0.storeName, [], function(HA, WA) {
                                        var PA = WA.rows.item(0).c;
                                        z0(PA)
                                    }, function(HA, WA) {
                                        M0(WA)
                                    })
                                })
                            }).catch(M0)
                        });
                    return C(m1, $1), m1
                }

                function y4($1, B0) {
                    var m1 = this,
                        z0 = new V(function(M0, q0) {
                            m1.ready().then(function() {
                                var AA = m1._dbInfo;
                                AA.db.transaction(function(HA) {
                                    d6(HA, AA, "SELECT key FROM " + AA.storeName + " WHERE id = ? LIMIT 1", [$1 + 1], function(WA, PA) {
                                        var cA = PA.rows.length ? PA.rows.item(0).key : null;
                                        M0(cA)
                                    }, function(WA, PA) {
                                        q0(PA)
                                    })
                                })
                            }).catch(q0)
                        });
                    return C(z0, B0), z0
                }

                function n3($1) {
                    var B0 = this,
                        m1 = new V(function(z0, M0) {
                            B0.ready().then(function() {
                                var q0 = B0._dbInfo;
                                q0.db.transaction(function(AA) {
                                    d6(AA, q0, "SELECT key FROM " + q0.storeName, [], function(HA, WA) {
                                        var PA = [];
                                        for (var cA = 0; cA < WA.rows.length; cA++) PA.push(WA.rows.item(cA).key);
                                        z0(PA)
                                    }, function(HA, WA) {
                                        M0(WA)
                                    })
                                })
                            }).catch(M0)
                        });
                    return C(m1, $1), m1
                }

                function AD($1) {
                    return new V(function(B0, m1) {
                        $1.transaction(function(z0) {
                            z0.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(M0, q0) {
                                var AA = [];
                                for (var HA = 0; HA < q0.rows.length; HA++) AA.push(q0.rows.item(HA).name);
                                B0({
                                    db: $1,
                                    storeNames: AA
                                })
                            }, function(M0, q0) {
                                m1(q0)
                            })
                        }, function(z0) {
                            m1(z0)
                        })
                    })
                }

                function H2($1, B0) {
                    B0 = z.apply(this, arguments);
                    var m1 = this.config();
                    if ($1 = typeof $1 !== "function" && $1 || {}, !$1.name) $1.name = $1.name || m1.name, $1.storeName = $1.storeName || m1.storeName;
                    var z0 = this,
                        M0;
                    if (!$1.name) M0 = V.reject("Invalid arguments");
                    else M0 = new V(function(q0) {
                        var AA;
                        if ($1.name === m1.name) AA = z0._dbInfo.db;
                        else AA = openDatabase($1.name, "", "", 0);
                        if (!$1.storeName) q0(AD(AA));
                        else q0({
                            db: AA,
                            storeNames: [$1.storeName]
                        })
                    }).then(function(q0) {
                        return new V(function(AA, HA) {
                            q0.db.transaction(function(WA) {
                                function PA(h9) {
                                    return new V(function(SQ, yA) {
                                        WA.executeSql("DROP TABLE IF EXISTS " + h9, [], function() {
                                            SQ()
                                        }, function(YB, RQ) {
                                            yA(RQ)
                                        })
                                    })
                                }
                                var cA = [];
                                for (var X2 = 0, w9 = q0.storeNames.length; X2 < w9; X2++) cA.push(PA(q0.storeNames[X2]));
                                V.all(cA).then(function() {
                                    AA()
                                }).catch(function(h9) {
                                    HA(h9)
                                })
                            }, function(WA) {
                                HA(WA)
                            })
                        })
                    });
                    return C(M0, B0), M0
                }
                var i1 = {
                    _driver: "webSQLStorage",
                    _initStorage: oB,
                    _support: x1(),
                    iterate: d5,
                    getItem: m5,
                    setItem: N6,
                    removeItem: w7,
                    clear: i3,
                    length: d7,
                    key: y4,
                    keys: n3,
                    dropInstance: H2
                };

                function N1() {
                    try {
                        return typeof localStorage !== "undefined" && "setItem" in localStorage && !!localStorage.setItem
                    } catch ($1) {
                        return !1
                    }
                }

                function Z0($1, B0) {
                    var m1 = $1.name + "/";
                    if ($1.storeName !== B0.storeName) m1 += $1.storeName + "/";
                    return m1
                }

                function f0() {
                    var $1 = "_localforage_support_test";
                    try {
                        return localStorage.setItem($1, !0), localStorage.removeItem($1), !1
                    } catch (B0) {
                        return !0
                    }
                }

                function p0() {
                    return !f0() || localStorage.length > 0
                }

                function rA($1) {
                    var B0 = this,
                        m1 = {};
                    if ($1)
                        for (var z0 in $1) m1[z0] = $1[z0];
                    if (m1.keyPrefix = Z0($1, B0._defaultConfig), !p0()) return V.reject();
                    return B0._dbInfo = m1, m1.serializer = D3, V.resolve()
                }

                function nB($1) {
                    var B0 = this,
                        m1 = B0.ready().then(function() {
                            var z0 = B0._dbInfo.keyPrefix;
                            for (var M0 = localStorage.length - 1; M0 >= 0; M0--) {
                                var q0 = localStorage.key(M0);
                                if (q0.indexOf(z0) === 0) localStorage.removeItem(q0)
                            }
                        });
                    return C(m1, $1), m1
                }

                function f9($1, B0) {
                    var m1 = this;
                    $1 = H($1);
                    var z0 = m1.ready().then(function() {
                        var M0 = m1._dbInfo,
                            q0 = localStorage.getItem(M0.keyPrefix + $1);
                        if (q0) q0 = M0.serializer.deserialize(q0);
                        return q0
                    });
                    return C(z0, B0), z0
                }

                function a9($1, B0) {
                    var m1 = this,
                        z0 = m1.ready().then(function() {
                            var M0 = m1._dbInfo,
                                q0 = M0.keyPrefix,
                                AA = q0.length,
                                HA = localStorage.length,
                                WA = 1;
                            for (var PA = 0; PA < HA; PA++) {
                                var cA = localStorage.key(PA);
                                if (cA.indexOf(q0) !== 0) continue;
                                var X2 = localStorage.getItem(cA);
                                if (X2) X2 = M0.serializer.deserialize(X2);
                                if (X2 = $1(X2, cA.substring(AA), WA++), X2 !== void 0) return X2
                            }
                        });
                    return C(z0, B0), z0
                }

                function _4($1, B0) {
                    var m1 = this,
                        z0 = m1.ready().then(function() {
                            var M0 = m1._dbInfo,
                                q0;
                            try {
                                q0 = localStorage.key($1)
                            } catch (AA) {
                                q0 = null
                            }
                            if (q0) q0 = q0.substring(M0.keyPrefix.length);
                            return q0
                        });
                    return C(z0, B0), z0
                }

                function b9($1) {
                    var B0 = this,
                        m1 = B0.ready().then(function() {
                            var z0 = B0._dbInfo,
                                M0 = localStorage.length,
                                q0 = [];
                            for (var AA = 0; AA < M0; AA++) {
                                var HA = localStorage.key(AA);
                                if (HA.indexOf(z0.keyPrefix) === 0) q0.push(HA.substring(z0.keyPrefix.length))
                            }
                            return q0
                        });
                    return C(m1, $1), m1
                }

                function K4($1) {
                    var B0 = this,
                        m1 = B0.keys().then(function(z0) {
                            return z0.length
                        });
                    return C(m1, $1), m1
                }

                function R4($1, B0) {
                    var m1 = this;
                    $1 = H($1);
                    var z0 = m1.ready().then(function() {
                        var M0 = m1._dbInfo;
                        localStorage.removeItem(M0.keyPrefix + $1)
                    });
                    return C(z0, B0), z0
                }

                function KQ($1, B0, m1) {
                    var z0 = this;
                    $1 = H($1);
                    var M0 = z0.ready().then(function() {
                        if (B0 === void 0) B0 = null;
                        var q0 = B0;
                        return new V(function(AA, HA) {
                            var WA = z0._dbInfo;
                            WA.serializer.serialize(B0, function(PA, cA) {
                                if (cA) HA(cA);
                                else try {
                                    localStorage.setItem(WA.keyPrefix + $1, PA), AA(q0)
                                } catch (X2) {
                                    if (X2.name === "QuotaExceededError" || X2.name === "NS_ERROR_DOM_QUOTA_REACHED") HA(X2);
                                    HA(X2)
                                }
                            })
                        })
                    });
                    return C(M0, m1), M0
                }

                function QB($1, B0) {
                    if (B0 = z.apply(this, arguments), $1 = typeof $1 !== "function" && $1 || {}, !$1.name) {
                        var m1 = this.config();
                        $1.name = $1.name || m1.name, $1.storeName = $1.storeName || m1.storeName
                    }
                    var z0 = this,
                        M0;
                    if (!$1.name) M0 = V.reject("Invalid arguments");
                    else M0 = new V(function(q0) {
                        if (!$1.storeName) q0($1.name + "/");
                        else q0(Z0($1, z0._defaultConfig))
                    }).then(function(q0) {
                        for (var AA = localStorage.length - 1; AA >= 0; AA--) {
                            var HA = localStorage.key(AA);
                            if (HA.indexOf(q0) === 0) localStorage.removeItem(HA)
                        }
                    });
                    return C(M0, B0), M0
                }
                var HQ = {
                        _driver: "localStorageWrapper",
                        _initStorage: rA,
                        _support: N1(),
                        iterate: a9,
                        getItem: f9,
                        setItem: KQ,
                        removeItem: R4,
                        clear: nB,
                        length: K4,
                        key: _4,
                        keys: b9,
                        dropInstance: QB
                    },
                    v1 = function $1(B0, m1) {
                        return B0 === m1 || typeof B0 === "number" && typeof m1 === "number" && isNaN(B0) && isNaN(m1)
                    },
                    u1 = function $1(B0, m1) {
                        var z0 = B0.length,
                            M0 = 0;
                        while (M0 < z0) {
                            if (v1(B0[M0], m1)) return !0;
                            M0++
                        }
                        return !1
                    },
                    N0 = Array.isArray || function($1) {
                        return Object.prototype.toString.call($1) === "[object Array]"
                    },
                    x0 = {},
                    w0 = {},
                    h0 = {
                        INDEXEDDB: B1,
                        WEBSQL: i1,
                        LOCALSTORAGE: HQ
                    },
                    VA = [h0.INDEXEDDB._driver, h0.WEBSQL._driver, h0.LOCALSTORAGE._driver],
                    QA = ["dropInstance"],
                    JA = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(QA),
                    e0 = {
                        description: "",
                        driver: VA.slice(),
                        name: "localforage",
                        size: 4980736,
                        storeName: "keyvaluepairs",
                        version: 1
                    };

                function CA($1, B0) {
                    $1[B0] = function() {
                        var m1 = arguments;
                        return $1.ready().then(function() {
                            return $1[B0].apply($1, m1)
                        })
                    }
                }

                function vB() {
                    for (var $1 = 1; $1 < arguments.length; $1++) {
                        var B0 = arguments[$1];
                        if (B0) {
                            for (var m1 in B0)
                                if (B0.hasOwnProperty(m1))
                                    if (N0(B0[m1])) arguments[0][m1] = B0[m1].slice();
                                    else arguments[0][m1] = B0[m1]
                        }
                    }
                    return arguments[0]
                }
                var R2 = function() {
                        function $1(B0) {
                            I(this, $1);
                            for (var m1 in h0)
                                if (h0.hasOwnProperty(m1)) {
                                    var z0 = h0[m1],
                                        M0 = z0._driver;
                                    if (this[m1] = M0, !x0[M0]) this.defineDriver(z0)
                                } this._defaultConfig = vB({}, e0), this._config = vB({}, this._defaultConfig, B0), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {})
                        }
                        return $1.prototype.config = function B0(m1) {
                            if ((typeof m1 === "undefined" ? "undefined" : F(m1)) === "object") {
                                if (this._ready) return new Error("Can't call config() after localforage has been used.");
                                for (var z0 in m1) {
                                    if (z0 === "storeName") m1[z0] = m1[z0].replace(/\W/g, "_");
                                    if (z0 === "version" && typeof m1[z0] !== "number") return new Error("Database version must be a number.");
                                    this._config[z0] = m1[z0]
                                }
                                if ("driver" in m1 && m1.driver) return this.setDriver(this._config.driver);
                                return !0
                            } else if (typeof m1 === "string") return this._config[m1];
                            else return this._config
                        }, $1.prototype.defineDriver = function B0(m1, z0, M0) {
                            var q0 = new V(function(AA, HA) {
                                try {
                                    var WA = m1._driver,
                                        PA = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                                    if (!m1._driver) {
                                        HA(PA);
                                        return
                                    }
                                    var cA = JA.concat("_initStorage");
                                    for (var X2 = 0, w9 = cA.length; X2 < w9; X2++) {
                                        var h9 = cA[X2],
                                            SQ = !u1(QA, h9);
                                        if ((SQ || m1[h9]) && typeof m1[h9] !== "function") {
                                            HA(PA);
                                            return
                                        }
                                    }
                                    var yA = function RQ() {
                                        var S9 = function t6(c7) {
                                            return function() {
                                                var QQ = new Error("Method " + c7 + " is not implemented by the current driver"),
                                                    $7 = V.reject(QQ);
                                                return C($7, arguments[arguments.length - 1]), $7
                                            }
                                        };
                                        for (var O4 = 0, c6 = QA.length; O4 < c6; O4++) {
                                            var iQ = QA[O4];
                                            if (!m1[iQ]) m1[iQ] = S9(iQ)
                                        }
                                    };
                                    yA();
                                    var YB = function RQ(S9) {
                                        if (x0[WA]) console.info("Redefining LocalForage driver: " + WA);
                                        x0[WA] = m1, w0[WA] = S9, AA()
                                    };
                                    if ("_support" in m1)
                                        if (m1._support && typeof m1._support === "function") m1._support().then(YB, HA);
                                        else YB(!!m1._support);
                                    else YB(!0)
                                } catch (RQ) {
                                    HA(RQ)
                                }
                            });
                            return K(q0, z0, M0), q0
                        }, $1.prototype.driver = function B0() {
                            return this._driver || null
                        }, $1.prototype.getDriver = function B0(m1, z0, M0) {
                            var q0 = x0[m1] ? V.resolve(x0[m1]) : V.reject(new Error("Driver not found."));
                            return K(q0, z0, M0), q0
                        }, $1.prototype.getSerializer = function B0(m1) {
                            var z0 = V.resolve(D3);
                            return K(z0, m1), z0
                        }, $1.prototype.ready = function B0(m1) {
                            var z0 = this,
                                M0 = z0._driverSet.then(function() {
                                    if (z0._ready === null) z0._ready = z0._initDriver();
                                    return z0._ready
                                });
                            return K(M0, m1, m1), M0
                        }, $1.prototype.setDriver = function B0(m1, z0, M0) {
                            var q0 = this;
                            if (!N0(m1)) m1 = [m1];
                            var AA = this._getSupportedDrivers(m1);

                            function HA() {
                                q0._config.driver = q0.driver()
                            }

                            function WA(X2) {
                                return q0._extend(X2), HA(), q0._ready = q0._initStorage(q0._config), q0._ready
                            }

                            function PA(X2) {
                                return function() {
                                    var w9 = 0;

                                    function h9() {
                                        while (w9 < X2.length) {
                                            var SQ = X2[w9];
                                            return w9++, q0._dbInfo = null, q0._ready = null, q0.getDriver(SQ).then(WA).catch(h9)
                                        }
                                        HA();
                                        var yA = new Error("No available storage method found.");
                                        return q0._driverSet = V.reject(yA), q0._driverSet
                                    }
                                    return h9()
                                }
                            }
                            var cA = this._driverSet !== null ? this._driverSet.catch(function() {
                                return V.resolve()
                            }) : V.resolve();
                            return this._driverSet = cA.then(function() {
                                var X2 = AA[0];
                                return q0._dbInfo = null, q0._ready = null, q0.getDriver(X2).then(function(w9) {
                                    q0._driver = w9._driver, HA(), q0._wrapLibraryMethodsWithReady(), q0._initDriver = PA(AA)
                                })
                            }).catch(function() {
                                HA();
                                var X2 = new Error("No available storage method found.");
                                return q0._driverSet = V.reject(X2), q0._driverSet
                            }), K(this._driverSet, z0, M0), this._driverSet
                        }, $1.prototype.supports = function B0(m1) {
                            return !!w0[m1]
                        }, $1.prototype._extend = function B0(m1) {
                            vB(this, m1)
                        }, $1.prototype._getSupportedDrivers = function B0(m1) {
                            var z0 = [];
                            for (var M0 = 0, q0 = m1.length; M0 < q0; M0++) {
                                var AA = m1[M0];
                                if (this.supports(AA)) z0.push(AA)
                            }
                            return z0
                        }, $1.prototype._wrapLibraryMethodsWithReady = function B0() {
                            for (var m1 = 0, z0 = JA.length; m1 < z0; m1++) CA(this, JA[m1])
                        }, $1.prototype.createInstance = function B0(m1) {
                            return new $1(m1)
                        }, $1
                    }(),
                    mB = new R2;
                D.exports = mB
            }, {
                "3": 3
            }]
        }, {}, [4])(4)
    })
});