/* chunk:223 bytes:[4844333, 4863187) size:18854 source:unpacked-cli.js */
var Z60 = E((tU5, Q60) => {
    var pZ = W1("fs"),
        eF4 = b02(),
        AI4 = g02(),
        BI4 = m02(),
        nq1 = W1("util"),
        bY, sq1;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") bY = Symbol.for("graceful-fs.queue"), sq1 = Symbol.for("graceful-fs.previous");
    else bY = "___graceful-fs.queue", sq1 = "___graceful-fs.previous";

    function QI4() {}

    function c02(A, B) {
        Object.defineProperty(A, bY, {
            get: function() {
                return B
            }
        })
    }
    var dg = QI4;
    if (nq1.debuglog) dg = nq1.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) dg = function() {
        var A = nq1.format.apply(nq1, arguments);
        A = "GFS4: " + A.split(/\n/).join(`
GFS4: `), console.error(A)
    };
    if (!pZ[bY]) {
        if (e40 = global[bY] || [], c02(pZ, e40), pZ.close = function(A) {
                function B(Q, Z) {
                    return A.call(pZ, Q, function(D) {
                        if (!D) d02();
                        if (typeof Z === "function") Z.apply(this, arguments)
                    })
                }
                return Object.defineProperty(B, sq1, {
                    value: A
                }), B
            }(pZ.close), pZ.closeSync = function(A) {
                function B(Q) {
                    A.apply(pZ, arguments), d02()
                }
                return Object.defineProperty(B, sq1, {
                    value: A
                }), B
            }(pZ.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) process.on("exit", function() {
            dg(pZ[bY]), W1("assert").equal(pZ[bY].length, 0)
        })
    }
    var e40;
    if (!global[bY]) c02(global, pZ[bY]);
    Q60.exports = A60(BI4(pZ));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !pZ.__patched) Q60.exports = A60(pZ), pZ.__patched = !0;

    function A60(A) {
        eF4(A), A.gracefulify = A60, A.createReadStream = O, A.createWriteStream = P;
        var B = A.readFile;
        A.readFile = Q;

        function Q(k, c, u) {
            if (typeof c === "function") u = c, c = null;
            return a(k, c, u);

            function a(l, y, t, E1) {
                return B(l, y, function(C1) {
                    if (C1 && (C1.code === "EMFILE" || C1.code === "ENFILE")) ps([a, [l, y, t], C1, E1 || Date.now(), Date.now()]);
                    else if (typeof t === "function") t.apply(this, arguments)
                })
            }
        }
        var Z = A.writeFile;
        A.writeFile = D;

        function D(k, c, u, a) {
            if (typeof u === "function") a = u, u = null;
            return l(k, c, u, a);

            function l(y, t, E1, C1, _1) {
                return Z(y, t, E1, function(F0) {
                    if (F0 && (F0.code === "EMFILE" || F0.code === "ENFILE")) ps([l, [y, t, E1, C1], F0, _1 || Date.now(), Date.now()]);
                    else if (typeof C1 === "function") C1.apply(this, arguments)
                })
            }
        }
        var G = A.appendFile;
        if (G) A.appendFile = F;

        function F(k, c, u, a) {
            if (typeof u === "function") a = u, u = null;
            return l(k, c, u, a);

            function l(y, t, E1, C1, _1) {
                return G(y, t, E1, function(F0) {
                    if (F0 && (F0.code === "EMFILE" || F0.code === "ENFILE")) ps([l, [y, t, E1, C1], F0, _1 || Date.now(), Date.now()]);
                    else if (typeof C1 === "function") C1.apply(this, arguments)
                })
            }
        }
        var I = A.copyFile;
        if (I) A.copyFile = Y;

        function Y(k, c, u, a) {
            if (typeof u === "function") a = u, u = 0;
            return l(k, c, u, a);

            function l(y, t, E1, C1, _1) {
                return I(y, t, E1, function(F0) {
                    if (F0 && (F0.code === "EMFILE" || F0.code === "ENFILE")) ps([l, [y, t, E1, C1], F0, _1 || Date.now(), Date.now()]);
                    else if (typeof C1 === "function") C1.apply(this, arguments)
                })
            }
        }
        var W = A.readdir;
        A.readdir = X;
        var J = /^v[0-5]\./;

        function X(k, c, u) {
            if (typeof c === "function") u = c, c = null;
            var a = J.test(process.version) ? function y(t, E1, C1, _1) {
                return W(t, l(t, E1, C1, _1))
            } : function y(t, E1, C1, _1) {
                return W(t, E1, l(t, E1, C1, _1))
            };
            return a(k, c, u);

            function l(y, t, E1, C1) {
                return function(_1, F0) {
                    if (_1 && (_1.code === "EMFILE" || _1.code === "ENFILE")) ps([a, [y, t, E1], _1, C1 || Date.now(), Date.now()]);
                    else {
                        if (F0 && F0.sort) F0.sort();
                        if (typeof E1 === "function") E1.call(this, _1, F0)
                    }
                }
            }
        }
        if (process.version.substr(0, 4) === "v0.8") {
            var V = AI4(A);
            $ = V.ReadStream, N = V.WriteStream
        }
        var C = A.ReadStream;
        if (C) $.prototype = Object.create(C.prototype), $.prototype.open = L;
        var K = A.WriteStream;
        if (K) N.prototype = Object.create(K.prototype), N.prototype.open = R;
        Object.defineProperty(A, "ReadStream", {
            get: function() {
                return $
            },
            set: function(k) {
                $ = k
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(A, "WriteStream", {
            get: function() {
                return N
            },
            set: function(k) {
                N = k
            },
            enumerable: !0,
            configurable: !0
        });
        var H = $;
        Object.defineProperty(A, "FileReadStream", {
            get: function() {
                return H
            },
            set: function(k) {
                H = k
            },
            enumerable: !0,
            configurable: !0
        });
        var z = N;
        Object.defineProperty(A, "FileWriteStream", {
            get: function() {
                return z
            },
            set: function(k) {
                z = k
            },
            enumerable: !0,
            configurable: !0
        });

        function $(k, c) {
            if (this instanceof $) return C.apply(this, arguments), this;
            else return $.apply(Object.create($.prototype), arguments)
        }

        function L() {
            var k = this;
            f(k.path, k.flags, k.mode, function(c, u) {
                if (c) {
                    if (k.autoClose) k.destroy();
                    k.emit("error", c)
                } else k.fd = u, k.emit("open", u), k.read()
            })
        }

        function N(k, c) {
            if (this instanceof N) return K.apply(this, arguments), this;
            else return N.apply(Object.create(N.prototype), arguments)
        }

        function R() {
            var k = this;
            f(k.path, k.flags, k.mode, function(c, u) {
                if (c) k.destroy(), k.emit("error", c);
                else k.fd = u, k.emit("open", u)
            })
        }

        function O(k, c) {
            return new A.ReadStream(k, c)
        }

        function P(k, c) {
            return new A.WriteStream(k, c)
        }
        var j = A.open;
        A.open = f;

        function f(k, c, u, a) {
            if (typeof u === "function") a = u, u = null;
            return l(k, c, u, a);

            function l(y, t, E1, C1, _1) {
                return j(y, t, E1, function(F0, W0) {
                    if (F0 && (F0.code === "EMFILE" || F0.code === "ENFILE")) ps([l, [y, t, E1, C1], F0, _1 || Date.now(), Date.now()]);
                    else if (typeof C1 === "function") C1.apply(this, arguments)
                })
            }
        }
        return A
    }

    function ps(A) {
        dg("ENQUEUE", A[0].name, A[1]), pZ[bY].push(A), B60()
    }
    var aq1;

    function d02() {
        var A = Date.now();
        for (var B = 0; B < pZ[bY].length; ++B)
            if (pZ[bY][B].length > 2) pZ[bY][B][3] = A, pZ[bY][B][4] = A;
        B60()
    }

    function B60() {
        if (clearTimeout(aq1), aq1 = void 0, pZ[bY].length === 0) return;
        var A = pZ[bY].shift(),
            B = A[0],
            Q = A[1],
            Z = A[2],
            D = A[3],
            G = A[4];
        if (D === void 0) dg("RETRY", B.name, Q), B.apply(null, Q);
        else if (Date.now() - D >= 60000) {
            dg("TIMEOUT", B.name, Q);
            var F = Q.pop();
            if (typeof F === "function") F.call(null, Z)
        } else {
            var I = Date.now() - G,
                Y = Math.max(G - D, 1),
                W = Math.min(Y * 1.2, 100);
            if (I >= W) dg("RETRY", B.name, Q), B.apply(null, Q.concat([D]));
            else pZ[bY].push(A)
        }
        if (aq1 === void 0) aq1 = setTimeout(B60, 0)
    }
});
var p02 = E((eU5, l02) => {
    function uz(A, B) {
        if (typeof B === "boolean") B = {
            forever: B
        };
        if (this._originalTimeouts = JSON.parse(JSON.stringify(A)), this._timeouts = A, this._options = B || {}, this._maxRetryTime = B && B.maxRetryTime || 1 / 0, this._fn = null, this._errors = [], this._attempts = 1, this._operationTimeout = null, this._operationTimeoutCb = null, this._timeout = null, this._operationStart = null, this._options.forever) this._cachedTimeouts = this._timeouts.slice(0)
    }
    l02.exports = uz;
    uz.prototype.reset = function() {
        this._attempts = 1, this._timeouts = this._originalTimeouts
    };
    uz.prototype.stop = function() {
        if (this._timeout) clearTimeout(this._timeout);
        this._timeouts = [], this._cachedTimeouts = null
    };
    uz.prototype.retry = function(A) {
        if (this._timeout) clearTimeout(this._timeout);
        if (!A) return !1;
        var B = new Date().getTime();
        if (A && B - this._operationStart >= this._maxRetryTime) return this._errors.unshift(new Error("RetryOperation timeout occurred")), !1;
        this._errors.push(A);
        var Q = this._timeouts.shift();
        if (Q === void 0)
            if (this._cachedTimeouts) this._errors.splice(this._errors.length - 1, this._errors.length), this._timeouts = this._cachedTimeouts.slice(0), Q = this._timeouts.shift();
            else return !1;
        var Z = this,
            D = setTimeout(function() {
                if (Z._attempts++, Z._operationTimeoutCb) {
                    if (Z._timeout = setTimeout(function() {
                            Z._operationTimeoutCb(Z._attempts)
                        }, Z._operationTimeout), Z._options.unref) Z._timeout.unref()
                }
                Z._fn(Z._attempts)
            }, Q);
        if (this._options.unref) D.unref();
        return !0
    };
    uz.prototype.attempt = function(A, B) {
        if (this._fn = A, B) {
            if (B.timeout) this._operationTimeout = B.timeout;
            if (B.cb) this._operationTimeoutCb = B.cb
        }
        var Q = this;
        if (this._operationTimeoutCb) this._timeout = setTimeout(function() {
            Q._operationTimeoutCb()
        }, Q._operationTimeout);
        this._operationStart = new Date().getTime(), this._fn(this._attempts)
    };
    uz.prototype.try = function(A) {
        console.log("Using RetryOperation.try() is deprecated"), this.attempt(A)
    };
    uz.prototype.start = function(A) {
        console.log("Using RetryOperation.start() is deprecated"), this.attempt(A)
    };
    uz.prototype.start = uz.prototype.try;
    uz.prototype.errors = function() {
        return this._errors
    };
    uz.prototype.attempts = function() {
        return this._attempts
    };
    uz.prototype.mainError = function() {
        if (this._errors.length === 0) return null;
        var A = {},
            B = null,
            Q = 0;
        for (var Z = 0; Z < this._errors.length; Z++) {
            var D = this._errors[Z],
                G = D.message,
                F = (A[G] || 0) + 1;
            if (A[G] = F, F >= Q) B = D, Q = F
        }
        return B
    }
});
var n02 = E((DI4) => {
    var ZI4 = p02();
    DI4.operation = function(A) {
        var B = DI4.timeouts(A);
        return new ZI4(B, {
            forever: A && A.forever,
            unref: A && A.unref,
            maxRetryTime: A && A.maxRetryTime
        })
    };
    DI4.timeouts = function(A) {
        if (A instanceof Array) return [].concat(A);
        var B = {
            retries: 10,
            factor: 2,
            minTimeout: 1000,
            maxTimeout: 1 / 0,
            randomize: !1
        };
        for (var Q in A) B[Q] = A[Q];
        if (B.minTimeout > B.maxTimeout) throw new Error("minTimeout is greater than maxTimeout");
        var Z = [];
        for (var D = 0; D < B.retries; D++) Z.push(this.createTimeout(D, B));
        if (A && A.forever && !Z.length) Z.push(this.createTimeout(D, B));
        return Z.sort(function(G, F) {
            return G - F
        }), Z
    };
    DI4.createTimeout = function(A, B) {
        var Q = B.randomize ? Math.random() + 1 : 1,
            Z = Math.round(Q * B.minTimeout * Math.pow(B.factor, A));
        return Z = Math.min(Z, B.maxTimeout), Z
    };
    DI4.wrap = function(A, B, Q) {
        if (B instanceof Array) Q = B, B = null;
        if (!Q) {
            Q = [];
            for (var Z in A)
                if (typeof A[Z] === "function") Q.push(Z)
        }
        for (var D = 0; D < Q.length; D++) {
            var G = Q[D],
                F = A[G];
            A[G] = function I(Y) {
                var W = DI4.operation(B),
                    J = Array.prototype.slice.call(arguments, 1),
                    X = J.pop();
                J.push(function(V) {
                    if (W.retry(V)) return;
                    if (V) arguments[0] = W.mainError();
                    X.apply(this, arguments)
                }), W.attempt(function() {
                    Y.apply(A, J)
                })
            }.bind(A, F), A[G].options = B
        }
    }
});
var a02 = E((Bw5, rq1) => {
    rq1.exports = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
    if (process.platform !== "win32") rq1.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
    if (process.platform === "linux") rq1.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED")
});
var s02 = E((Qw5, ns) => {
    var EZ = global.process,
        cg = function(A) {
            return A && typeof A === "object" && typeof A.removeListener === "function" && typeof A.emit === "function" && typeof A.reallyExit === "function" && typeof A.listeners === "function" && typeof A.kill === "function" && typeof A.pid === "number" && typeof A.on === "function"
        };
    if (!cg(EZ)) ns.exports = function() {
        return function() {}
    };
    else {
        if (D60 = W1("assert"), lg = a02(), G60 = /^win/i.test(EZ.platform), is = W1("events"), typeof is !== "function") is = is.EventEmitter;
        if (EZ.__signal_exit_emitter__) SF = EZ.__signal_exit_emitter__;
        else SF = EZ.__signal_exit_emitter__ = new is, SF.count = 0, SF.emitted = {};
        if (!SF.infinite) SF.setMaxListeners(1 / 0), SF.infinite = !0;
        ns.exports = function(A, B) {
            if (!cg(global.process)) return function() {};
            if (D60.equal(typeof A, "function", "a callback must be provided for exit handler"), pg === !1) oq1();
            var Q = "exit";
            if (B && B.alwaysLast) Q = "afterexit";
            var Z = function() {
                if (SF.removeListener(Q, A), SF.listeners("exit").length === 0 && SF.listeners("afterexit").length === 0) W81()
            };
            return SF.on(Q, A), Z
        }, W81 = function A() {
            if (!pg || !cg(global.process)) return;
            pg = !1, lg.forEach(function(B) {
                try {
                    EZ.removeListener(B, J81[B])
                } catch (Q) {}
            }), EZ.emit = X81, EZ.reallyExit = tq1, SF.count -= 1
        }, ns.exports.unload = W81, Z_ = function A(B, Q, Z) {
            if (SF.emitted[B]) return;
            SF.emitted[B] = !0, SF.emit(B, Q, Z)
        }, J81 = {}, lg.forEach(function(A) {
            J81[A] = function B() {
                if (!cg(global.process)) return;
                var Q = EZ.listeners(A);
                if (Q.length === SF.count) {
                    if (W81(), Z_("exit", null, A), Z_("afterexit", null, A), G60 && A === "SIGHUP") A = "SIGINT";
                    EZ.kill(EZ.pid, A)
                }
            }
        }), ns.exports.signals = function() {
            return lg
        }, pg = !1, oq1 = function A() {
            if (pg || !cg(global.process)) return;
            pg = !0, SF.count += 1, lg = lg.filter(function(B) {
                try {
                    return EZ.on(B, J81[B]), !0
                } catch (Q) {
                    return !1
                }
            }), EZ.emit = I60, EZ.reallyExit = F60
        }, ns.exports.load = oq1, tq1 = EZ.reallyExit, F60 = function A(B) {
            if (!cg(global.process)) return;
            EZ.exitCode = B || 0, Z_("exit", EZ.exitCode, null), Z_("afterexit", EZ.exitCode, null), tq1.call(EZ, EZ.exitCode)
        }, X81 = EZ.emit, I60 = function A(B, Q) {
            if (B === "exit" && cg(global.process)) {
                if (Q !== void 0) EZ.exitCode = Q;
                var Z = X81.apply(this, arguments);
                return Z_("exit", EZ.exitCode, null), Z_("afterexit", EZ.exitCode, null), Z
            } else return X81.apply(this, arguments)
        }
    }
    var D60, lg, G60, is, SF, W81, Z_, J81, pg, oq1, tq1, F60, X81, I60
});
var o02 = E((JI4, Y60) => {
    var r02 = Symbol();

    function YI4(A, B, Q) {
        let Z = B[r02];
        if (Z) return B.stat(A, (G, F) => {
            if (G) return Q(G);
            Q(null, F.mtime, Z)
        });
        let D = new Date(Math.ceil(Date.now() / 1000) * 1000 + 5);
        B.utimes(A, D, D, (G) => {
            if (G) return Q(G);
            B.stat(A, (F, I) => {
                if (F) return Q(F);
                let Y = I.mtime.getTime() % 1000 === 0 ? "s" : "ms";
                Object.defineProperty(B, r02, {
                    value: Y
                }), Q(null, I.mtime, Y)
            })
        })
    }

    function WI4(A) {
        let B = Date.now();
        if (A === "s") B = Math.ceil(B / 1000) * 1000;
        return new Date(B)
    }
    JI4.probe = YI4;
    JI4.getMtime = WI4
});