/* chunk:222 bytes:[4833438, 4844332) size:10894 source:unpacked-cli.js */
var b02 = E((sU5, v02) => {
    var Q_ = W1("constants"),
        nF4 = process.cwd,
        pq1 = null,
        aF4 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
        if (!pq1) pq1 = nF4.call(process);
        return pq1
    };
    try {
        process.cwd()
    } catch (A) {}
    if (typeof process.chdir === "function") {
        if (iq1 = process.chdir, process.chdir = function(A) {
                pq1 = null, iq1.call(process, A)
            }, Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, iq1)
    }
    var iq1;
    v02.exports = sF4;

    function sF4(A) {
        if (Q_.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) B(A);
        if (!A.lutimes) Q(A);
        if (A.chown = G(A.chown), A.fchown = G(A.fchown), A.lchown = G(A.lchown), A.chmod = Z(A.chmod), A.fchmod = Z(A.fchmod), A.lchmod = Z(A.lchmod), A.chownSync = F(A.chownSync), A.fchownSync = F(A.fchownSync), A.lchownSync = F(A.lchownSync), A.chmodSync = D(A.chmodSync), A.fchmodSync = D(A.fchmodSync), A.lchmodSync = D(A.lchmodSync), A.stat = I(A.stat), A.fstat = I(A.fstat), A.lstat = I(A.lstat), A.statSync = Y(A.statSync), A.fstatSync = Y(A.fstatSync), A.lstatSync = Y(A.lstatSync), A.chmod && !A.lchmod) A.lchmod = function(J, X, V) {
            if (V) process.nextTick(V)
        }, A.lchmodSync = function() {};
        if (A.chown && !A.lchown) A.lchown = function(J, X, V, C) {
            if (C) process.nextTick(C)
        }, A.lchownSync = function() {};
        if (aF4 === "win32") A.rename = typeof A.rename !== "function" ? A.rename : function(J) {
            function X(V, C, K) {
                var H = Date.now(),
                    z = 0;
                J(V, C, function $(L) {
                    if (L && (L.code === "EACCES" || L.code === "EPERM" || L.code === "EBUSY") && Date.now() - H < 60000) {
                        if (setTimeout(function() {
                                A.stat(C, function(N, R) {
                                    if (N && N.code === "ENOENT") J(V, C, $);
                                    else K(L)
                                })
                            }, z), z < 100) z += 10;
                        return
                    }
                    if (K) K(L)
                })
            }
            if (Object.setPrototypeOf) Object.setPrototypeOf(X, J);
            return X
        }(A.rename);
        A.read = typeof A.read !== "function" ? A.read : function(J) {
            function X(V, C, K, H, z, $) {
                var L;
                if ($ && typeof $ === "function") {
                    var N = 0;
                    L = function(R, O, P) {
                        if (R && R.code === "EAGAIN" && N < 10) return N++, J.call(A, V, C, K, H, z, L);
                        $.apply(this, arguments)
                    }
                }
                return J.call(A, V, C, K, H, z, L)
            }
            if (Object.setPrototypeOf) Object.setPrototypeOf(X, J);
            return X
        }(A.read), A.readSync = typeof A.readSync !== "function" ? A.readSync : function(J) {
            return function(X, V, C, K, H) {
                var z = 0;
                while (!0) try {
                    return J.call(A, X, V, C, K, H)
                } catch ($) {
                    if ($.code === "EAGAIN" && z < 10) {
                        z++;
                        continue
                    }
                    throw $
                }
            }
        }(A.readSync);

        function B(J) {
            J.lchmod = function(X, V, C) {
                J.open(X, Q_.O_WRONLY | Q_.O_SYMLINK, V, function(K, H) {
                    if (K) {
                        if (C) C(K);
                        return
                    }
                    J.fchmod(H, V, function(z) {
                        J.close(H, function($) {
                            if (C) C(z || $)
                        })
                    })
                })
            }, J.lchmodSync = function(X, V) {
                var C = J.openSync(X, Q_.O_WRONLY | Q_.O_SYMLINK, V),
                    K = !0,
                    H;
                try {
                    H = J.fchmodSync(C, V), K = !1
                } finally {
                    if (K) try {
                        J.closeSync(C)
                    } catch (z) {} else J.closeSync(C)
                }
                return H
            }
        }

        function Q(J) {
            if (Q_.hasOwnProperty("O_SYMLINK") && J.futimes) J.lutimes = function(X, V, C, K) {
                J.open(X, Q_.O_SYMLINK, function(H, z) {
                    if (H) {
                        if (K) K(H);
                        return
                    }
                    J.futimes(z, V, C, function($) {
                        J.close(z, function(L) {
                            if (K) K($ || L)
                        })
                    })
                })
            }, J.lutimesSync = function(X, V, C) {
                var K = J.openSync(X, Q_.O_SYMLINK),
                    H, z = !0;
                try {
                    H = J.futimesSync(K, V, C), z = !1
                } finally {
                    if (z) try {
                        J.closeSync(K)
                    } catch ($) {} else J.closeSync(K)
                }
                return H
            };
            else if (J.futimes) J.lutimes = function(X, V, C, K) {
                if (K) process.nextTick(K)
            }, J.lutimesSync = function() {}
        }

        function Z(J) {
            if (!J) return J;
            return function(X, V, C) {
                return J.call(A, X, V, function(K) {
                    if (W(K)) K = null;
                    if (C) C.apply(this, arguments)
                })
            }
        }

        function D(J) {
            if (!J) return J;
            return function(X, V) {
                try {
                    return J.call(A, X, V)
                } catch (C) {
                    if (!W(C)) throw C
                }
            }
        }

        function G(J) {
            if (!J) return J;
            return function(X, V, C, K) {
                return J.call(A, X, V, C, function(H) {
                    if (W(H)) H = null;
                    if (K) K.apply(this, arguments)
                })
            }
        }

        function F(J) {
            if (!J) return J;
            return function(X, V, C) {
                try {
                    return J.call(A, X, V, C)
                } catch (K) {
                    if (!W(K)) throw K
                }
            }
        }

        function I(J) {
            if (!J) return J;
            return function(X, V, C) {
                if (typeof V === "function") C = V, V = null;

                function K(H, z) {
                    if (z) {
                        if (z.uid < 0) z.uid += 4294967296;
                        if (z.gid < 0) z.gid += 4294967296
                    }
                    if (C) C.apply(this, arguments)
                }
                return V ? J.call(A, X, V, K) : J.call(A, X, K)
            }
        }

        function Y(J) {
            if (!J) return J;
            return function(X, V) {
                var C = V ? J.call(A, X, V) : J.call(A, X);
                if (C) {
                    if (C.uid < 0) C.uid += 4294967296;
                    if (C.gid < 0) C.gid += 4294967296
                }
                return C
            }
        }

        function W(J) {
            if (!J) return !0;
            if (J.code === "ENOSYS") return !0;
            var X = !process.getuid || process.getuid() !== 0;
            if (X) {
                if (J.code === "EINVAL" || J.code === "EPERM") return !0
            }
            return !1
        }
    }
});
var g02 = E((rU5, h02) => {
    var f02 = W1("stream").Stream;
    h02.exports = rF4;

    function rF4(A) {
        return {
            ReadStream: B,
            WriteStream: Q
        };

        function B(Z, D) {
            if (!(this instanceof B)) return new B(Z, D);
            f02.call(this);
            var G = this;
            this.path = Z, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 65536, D = D || {};
            var F = Object.keys(D);
            for (var I = 0, Y = F.length; I < Y; I++) {
                var W = F[I];
                this[W] = D[W]
            }
            if (this.encoding) this.setEncoding(this.encoding);
            if (this.start !== void 0) {
                if (typeof this.start !== "number") throw TypeError("start must be a Number");
                if (this.end === void 0) this.end = 1 / 0;
                else if (typeof this.end !== "number") throw TypeError("end must be a Number");
                if (this.start > this.end) throw new Error("start must be <= end");
                this.pos = this.start
            }
            if (this.fd !== null) {
                process.nextTick(function() {
                    G._read()
                });
                return
            }
            A.open(this.path, this.flags, this.mode, function(J, X) {
                if (J) {
                    G.emit("error", J), G.readable = !1;
                    return
                }
                G.fd = X, G.emit("open", X), G._read()
            })
        }

        function Q(Z, D) {
            if (!(this instanceof Q)) return new Q(Z, D);
            f02.call(this), this.path = Z, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, D = D || {};
            var G = Object.keys(D);
            for (var F = 0, I = G.length; F < I; F++) {
                var Y = G[F];
                this[Y] = D[Y]
            }
            if (this.start !== void 0) {
                if (typeof this.start !== "number") throw TypeError("start must be a Number");
                if (this.start < 0) throw new Error("start must be >= zero");
                this.pos = this.start
            }
            if (this.busy = !1, this._queue = [], this.fd === null) this._open = A.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush()
        }
    }
});
var m02 = E((oU5, u02) => {
    u02.exports = tF4;
    var oF4 = Object.getPrototypeOf || function(A) {
        return A.__proto__
    };

    function tF4(A) {
        if (A === null || typeof A !== "object") return A;
        if (A instanceof Object) var B = {
            __proto__: oF4(A)
        };
        else var B = Object.create(null);
        return Object.getOwnPropertyNames(A).forEach(function(Q) {
            Object.defineProperty(B, Q, Object.getOwnPropertyDescriptor(A, Q))
        }), B
    }
});