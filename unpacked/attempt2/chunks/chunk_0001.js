/* chunk:1 bytes:[0, 19252) size:19252 source:unpacked-cli.js */
import {
    createRequire as tlB
} from "node:module";
var alB = Object.create;
var {
    getPrototypeOf: slB,
    defineProperty: Dm1,
    getOwnPropertyNames: rlB
} = Object;
var olB = Object.prototype.hasOwnProperty;
var G1 = (A, B, Q) => {
    Q = A != null ? alB(slB(A)) : {};
    let Z = B || !A || !A.__esModule ? Dm1(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q;
    for (let D of rlB(A))
        if (!olB.call(Z, D)) Dm1(Z, D, {
            get: () => A[D],
            enumerable: !0
        });
    return Z
};
var E = (A, B) => () => (B || A((B = {
    exports: {}
}).exports, B), B.exports);
var bj = (A, B) => {
    for (var Q in B) Dm1(A, Q, {
        get: B[Q],
        enumerable: !0,
        configurable: !0,
        set: (Z) => B[Q] = () => Z
    })
};
var K21 = (A, B) => () => (A && (B = A(A = 0)), B);
var W1 = tlB(import.meta.url);
var Gy0 = E((sg8, Dy0) => {
    Dy0.exports = Zy0;
    Zy0.sync = xtB;
    var By0 = W1("fs");

    function _tB(A, B) {
        var Q = B.pathExt !== void 0 ? B.pathExt : process.env.PATHEXT;
        if (!Q) return !0;
        if (Q = Q.split(";"), Q.indexOf("") !== -1) return !0;
        for (var Z = 0; Z < Q.length; Z++) {
            var D = Q[Z].toLowerCase();
            if (D && A.substr(-D.length).toLowerCase() === D) return !0
        }
        return !1
    }

    function Qy0(A, B, Q) {
        if (!A.isSymbolicLink() && !A.isFile()) return !1;
        return _tB(B, Q)
    }

    function Zy0(A, B, Q) {
        By0.stat(A, function(Z, D) {
            Q(Z, Z ? !1 : Qy0(D, A, B))
        })
    }

    function xtB(A, B) {
        return Qy0(By0.statSync(A), A, B)
    }
});
var Jy0 = E((rg8, Wy0) => {
    Wy0.exports = Iy0;
    Iy0.sync = vtB;
    var Fy0 = W1("fs");

    function Iy0(A, B, Q) {
        Fy0.stat(A, function(Z, D) {
            Q(Z, Z ? !1 : Yy0(D, B))
        })
    }

    function vtB(A, B) {
        return Yy0(Fy0.statSync(A), B)
    }

    function Yy0(A, B) {
        return A.isFile() && btB(A, B)
    }

    function btB(A, B) {
        var {
            mode: Q,
            uid: Z,
            gid: D
        } = A, G = B.uid !== void 0 ? B.uid : process.getuid && process.getuid(), F = B.gid !== void 0 ? B.gid : process.getgid && process.getgid(), I = parseInt("100", 8), Y = parseInt("010", 8), W = parseInt("001", 8), J = I | Y, X = Q & W || Q & Y && D === F || Q & I && Z === G || Q & J && G === 0;
        return X
    }
});
var Vy0 = E((tg8, Xy0) => {
    var og8 = W1("fs"),
        lW1;
    if (process.platform === "win32" || global.TESTING_WINDOWS) lW1 = Gy0();
    else lW1 = Jy0();
    Xy0.exports = Mm1;
    Mm1.sync = ftB;

    function Mm1(A, B, Q) {
        if (typeof B === "function") Q = B, B = {};
        if (!Q) {
            if (typeof Promise !== "function") throw new TypeError("callback not provided");
            return new Promise(function(Z, D) {
                Mm1(A, B || {}, function(G, F) {
                    if (G) D(G);
                    else Z(F)
                })
            })
        }
        lW1(A, B || {}, function(Z, D) {
            if (Z) {
                if (Z.code === "EACCES" || B && B.ignoreErrors) Z = null, D = !1
            }
            Q(Z, D)
        })
    }

    function ftB(A, B) {
        try {
            return lW1.sync(A, B || {})
        } catch (Q) {
            if (B && B.ignoreErrors || Q.code === "EACCES") return !1;
            else throw Q
        }
    }
});
var wy0 = E((eg8, Uy0) => {
    var Ml = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys",
        Cy0 = W1("path"),
        htB = Ml ? ";" : ":",
        Ky0 = Vy0(),
        Hy0 = (A) => Object.assign(new Error(`not found: ${A}`), {
            code: "ENOENT"
        }),
        zy0 = (A, B) => {
            let Q = B.colon || htB,
                Z = A.match(/\//) || Ml && A.match(/\\/) ? [""] : [...Ml ? [process.cwd()] : [], ...(B.path || process.env.PATH || "").split(Q)],
                D = Ml ? B.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "",
                G = Ml ? D.split(Q) : [""];
            if (Ml) {
                if (A.indexOf(".") !== -1 && G[0] !== "") G.unshift("")
            }
            return {
                pathEnv: Z,
                pathExt: G,
                pathExtExe: D
            }
        },
        Ey0 = (A, B, Q) => {
            if (typeof B === "function") Q = B, B = {};
            if (!B) B = {};
            let {
                pathEnv: Z,
                pathExt: D,
                pathExtExe: G
            } = zy0(A, B), F = [], I = (W) => new Promise((J, X) => {
                if (W === Z.length) return B.all && F.length ? J(F) : X(Hy0(A));
                let V = Z[W],
                    C = /^".*"$/.test(V) ? V.slice(1, -1) : V,
                    K = Cy0.join(C, A),
                    H = !C && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + K : K;
                J(Y(H, W, 0))
            }), Y = (W, J, X) => new Promise((V, C) => {
                if (X === D.length) return V(I(J + 1));
                let K = D[X];
                Ky0(W + K, {
                    pathExt: G
                }, (H, z) => {
                    if (!H && z)
                        if (B.all) F.push(W + K);
                        else return V(W + K);
                    return V(Y(W, J, X + 1))
                })
            });
            return Q ? I(0).then((W) => Q(null, W), Q) : I(0)
        },
        gtB = (A, B) => {
            B = B || {};
            let {
                pathEnv: Q,
                pathExt: Z,
                pathExtExe: D
            } = zy0(A, B), G = [];
            for (let F = 0; F < Q.length; F++) {
                let I = Q[F],
                    Y = /^".*"$/.test(I) ? I.slice(1, -1) : I,
                    W = Cy0.join(Y, A),
                    J = !Y && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + W : W;
                for (let X = 0; X < Z.length; X++) {
                    let V = J + Z[X];
                    try {
                        if (Ky0.sync(V, {
                                pathExt: D
                            }))
                            if (B.all) G.push(V);
                            else return V
                    } catch (C) {}
                }
            }
            if (B.all && G.length) return G;
            if (B.nothrow) return null;
            throw Hy0(A)
        };
    Uy0.exports = Ey0;
    Ey0.sync = gtB
});
var qy0 = E((Au8, Rm1) => {
    var $y0 = (A = {}) => {
        let B = A.env || process.env;
        if ((A.platform || process.platform) !== "win32") return "PATH";
        return Object.keys(B).reverse().find((Z) => Z.toUpperCase() === "PATH") || "Path"
    };
    Rm1.exports = $y0;
    Rm1.exports.default = $y0
});
var Ry0 = E((Bu8, My0) => {
    var Ny0 = W1("path"),
        utB = wy0(),
        mtB = qy0();

    function Ly0(A, B) {
        let Q = A.options.env || process.env,
            Z = process.cwd(),
            D = A.options.cwd != null,
            G = D && process.chdir !== void 0 && !process.chdir.disabled;
        if (G) try {
            process.chdir(A.options.cwd)
        } catch (I) {}
        let F;
        try {
            F = utB.sync(A.command, {
                path: Q[mtB({
                    env: Q
                })],
                pathExt: B ? Ny0.delimiter : void 0
            })
        } catch (I) {} finally {
            if (G) process.chdir(Z)
        }
        if (F) F = Ny0.resolve(D ? A.options.cwd : "", F);
        return F
    }

    function dtB(A) {
        return Ly0(A) || Ly0(A, !0)
    }
    My0.exports = dtB
});
var Oy0 = E((ptB, Tm1) => {
    var Om1 = /([()\][%!^"`<>&|;, *?])/g;

    function ctB(A) {
        return A = A.replace(Om1, "^$1"), A
    }

    function ltB(A, B) {
        if (A = `${A}`, A = A.replace(/(?=(\\+?)?)\1"/g, "$1$1\\\""), A = A.replace(/(?=(\\+?)?)\1$/, "$1$1"), A = `"${A}"`, A = A.replace(Om1, "^$1"), B) A = A.replace(Om1, "^$1");
        return A
    }
    ptB.command = ctB;
    ptB.argument = ltB
});
var Py0 = E((Qu8, Ty0) => {
    Ty0.exports = /^#!(.*)/
});
var jy0 = E((Zu8, Sy0) => {
    var atB = Py0();
    Sy0.exports = (A = "") => {
        let B = A.match(atB);
        if (!B) return null;
        let [Q, Z] = B[0].replace(/#! ?/, "").split(" "), D = Q.split("/").pop();
        if (D === "env") return Z;
        return Z ? `${D} ${Z}` : D
    }
});
var yy0 = E((Du8, ky0) => {
    var Pm1 = W1("fs"),
        stB = jy0();

    function rtB(A) {
        let Q = Buffer.alloc(150),
            Z;
        try {
            Z = Pm1.openSync(A, "r"), Pm1.readSync(Z, Q, 0, 150, 0), Pm1.closeSync(Z)
        } catch (D) {}
        return stB(Q.toString())
    }
    ky0.exports = rtB
});
var by0 = E((Gu8, vy0) => {
    var otB = W1("path"),
        _y0 = Ry0(),
        xy0 = Oy0(),
        ttB = yy0(),
        etB = process.platform === "win32",
        AeB = /\.(?:com|exe)$/i,
        BeB = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

    function QeB(A) {
        A.file = _y0(A);
        let B = A.file && ttB(A.file);
        if (B) return A.args.unshift(A.file), A.command = B, _y0(A);
        return A.file
    }

    function ZeB(A) {
        if (!etB) return A;
        let B = QeB(A),
            Q = !AeB.test(B);
        if (A.options.forceShell || Q) {
            let Z = BeB.test(B);
            A.command = otB.normalize(A.command), A.command = xy0.command(A.command), A.args = A.args.map((G) => xy0.argument(G, Z));
            let D = [A.command].concat(A.args).join(" ");
            A.args = ["/d", "/s", "/c", `"${D}"`], A.command = process.env.comspec || "cmd.exe", A.options.windowsVerbatimArguments = !0
        }
        return A
    }

    function DeB(A, B, Q) {
        if (B && !Array.isArray(B)) Q = B, B = null;
        B = B ? B.slice(0) : [], Q = Object.assign({}, Q);
        let Z = {
            command: A,
            args: B,
            options: Q,
            file: void 0,
            original: {
                command: A,
                args: B
            }
        };
        return Q.shell ? Z : ZeB(Z)
    }
    vy0.exports = DeB
});
var gy0 = E((Fu8, hy0) => {
    var Sm1 = process.platform === "win32";

    function jm1(A, B) {
        return Object.assign(new Error(`${B} ${A.command} ENOENT`), {
            code: "ENOENT",
            errno: "ENOENT",
            syscall: `${B} ${A.command}`,
            path: A.command,
            spawnargs: A.args
        })
    }

    function GeB(A, B) {
        if (!Sm1) return;
        let Q = A.emit;
        A.emit = function(Z, D) {
            if (Z === "exit") {
                let G = fy0(D, B);
                if (G) return Q.call(A, "error", G)
            }
            return Q.apply(A, arguments)
        }
    }

    function fy0(A, B) {
        if (Sm1 && A === 1 && !B.file) return jm1(B.original, "spawn");
        return null
    }

    function FeB(A, B) {
        if (Sm1 && A === 1 && !B.file) return jm1(B.original, "spawnSync");
        return null
    }
    hy0.exports = {
        hookChildProcess: GeB,
        verifyENOENT: fy0,
        verifyENOENTSync: FeB,
        notFoundError: jm1
    }
});
var _m1 = E((Iu8, Rl) => {
    var uy0 = W1("child_process"),
        km1 = by0(),
        ym1 = gy0();

    function my0(A, B, Q) {
        let Z = km1(A, B, Q),
            D = uy0.spawn(Z.command, Z.args, Z.options);
        return ym1.hookChildProcess(D, Z), D
    }

    function IeB(A, B, Q) {
        let Z = km1(A, B, Q),
            D = uy0.spawnSync(Z.command, Z.args, Z.options);
        return D.error = D.error || ym1.verifyENOENTSync(D.status, Z), D
    }
    Rl.exports = my0;
    Rl.exports.spawn = my0;
    Rl.exports.sync = IeB;
    Rl.exports._parse = km1;
    Rl.exports._enoent = ym1
});
var z_0 = E((Vm8, H_0) => {
    var {
        PassThrough: G19
    } = W1("stream");
    H_0.exports = function() {
        var A = [],
            B = new G19({
                objectMode: !0
            });
        return B.setMaxListeners(0), B.add = Q, B.isEmpty = Z, B.on("unpipe", D), Array.prototype.slice.call(arguments).forEach(Q), B;

        function Q(G) {
            if (Array.isArray(G)) return G.forEach(Q), this;
            return A.push(G), G.once("end", D.bind(null, G)), G.once("error", B.emit.bind(B, "error")), G.pipe(B, {
                end: !1
            }), this
        }

        function Z() {
            return A.length == 0
        }

        function D(G) {
            if (A = A.filter(function(F) {
                    return F !== G
                }), !A.length && B.readable) B.end()
        }
    }
});
var iH = E((v_0) => {
    Object.defineProperty(v_0, "__esModule", {
        value: !0
    });
    var y_0 = Object.prototype.toString;

    function P19(A) {
        switch (y_0.call(A)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
                return !0;
            default:
                return DJ1(A, Error)
        }
    }

    function Ol(A, B) {
        return y_0.call(A) === `[object ${B}]`
    }

    function S19(A) {
        return Ol(A, "ErrorEvent")
    }

    function j19(A) {
        return Ol(A, "DOMError")
    }

    function k19(A) {
        return Ol(A, "DOMException")
    }

    function y19(A) {
        return Ol(A, "String")
    }

    function __0(A) {
        return typeof A === "object" && A !== null && "__sentry_template_string__" in A && "__sentry_template_values__" in A
    }

    function _19(A) {
        return A === null || __0(A) || typeof A !== "object" && typeof A !== "function"
    }

    function x_0(A) {
        return Ol(A, "Object")
    }

    function x19(A) {
        return typeof Event !== "undefined" && DJ1(A, Event)
    }

    function v19(A) {
        return typeof Element !== "undefined" && DJ1(A, Element)
    }

    function b19(A) {
        return Ol(A, "RegExp")
    }

    function f19(A) {
        return Boolean(A && A.then && typeof A.then === "function")
    }

    function h19(A) {
        return x_0(A) && "nativeEvent" in A && "preventDefault" in A && "stopPropagation" in A
    }

    function g19(A) {
        return typeof A === "number" && A !== A
    }

    function DJ1(A, B) {
        try {
            return A instanceof B
        } catch (Q) {
            return !1
        }
    }

    function u19(A) {
        return !!(typeof A === "object" && A !== null && (A.__isVue || A._isVue))
    }
    v_0.isDOMError = j19;
    v_0.isDOMException = k19;
    v_0.isElement = v19;
    v_0.isError = P19;
    v_0.isErrorEvent = S19;
    v_0.isEvent = x19;
    v_0.isInstanceOf = DJ1;
    v_0.isNaN = g19;
    v_0.isParameterizedString = __0;
    v_0.isPlainObject = x_0;
    v_0.isPrimitive = _19;
    v_0.isRegExp = b19;
    v_0.isString = y19;
    v_0.isSyntheticEvent = h19;
    v_0.isThenable = f19;
    v_0.isVueViewModel = u19
});
var k21 = E((f_0) => {
    Object.defineProperty(f_0, "__esModule", {
        value: !0
    });
    var GJ1 = iH();

    function Z09(A, B = 0) {
        if (typeof A !== "string" || B === 0) return A;
        return A.length <= B ? A : `${A.slice(0,B)}...`
    }

    function D09(A, B) {
        let Q = A,
            Z = Q.length;
        if (Z <= 150) return Q;
        if (B > Z) B = Z;
        let D = Math.max(B - 60, 0);
        if (D < 5) D = 0;
        let G = Math.min(D + 140, Z);
        if (G > Z - 5) G = Z;
        if (G === Z) D = Math.max(G - 140, 0);
        if (Q = Q.slice(D, G), D > 0) Q = `'{snip} ${Q}`;
        if (G < Z) Q += " {snip}";
        return Q
    }

    function G09(A, B) {
        if (!Array.isArray(A)) return "";
        let Q = [];
        for (let Z = 0; Z < A.length; Z++) {
            let D = A[Z];
            try {
                if (GJ1.isVueViewModel(D)) Q.push("[VueViewModel]");
                else Q.push(String(D))
            } catch (G) {
                Q.push("[value cannot be serialized]")
            }
        }
        return Q.join(B)
    }

    function b_0(A, B, Q = !1) {
        if (!GJ1.isString(A)) return !1;
        if (GJ1.isRegExp(B)) return B.test(A);
        if (GJ1.isString(B)) return Q ? A === B : A.includes(B);
        return !1
    }

    function F09(A, B = [], Q = !1) {
        return B.some((Z) => b_0(A, Z, Q))
    }
    f_0.isMatchingPattern = b_0;
    f_0.safeJoin = G09;
    f_0.snipLine = D09;
    f_0.stringMatchesSomePattern = F09;
    f_0.truncate = Z09
});
var m_0 = E((u_0) => {
    Object.defineProperty(u_0, "__esModule", {
        value: !0
    });
    var Id1 = iH(),
        V09 = k21();

    function C09(A, B, Q = 250, Z, D, G, F) {
        if (!G.exception || !G.exception.values || !F || !Id1.isInstanceOf(F.originalException, Error)) return;
        let I = G.exception.values.length > 0 ? G.exception.values[G.exception.values.length - 1] : void 0;
        if (I) G.exception.values = K09(Yd1(A, B, D, F.originalException, Z, G.exception.values, I, 0), Q)
    }

    function Yd1(A, B, Q, Z, D, G, F, I) {
        if (G.length >= Q + 1) return G;
        let Y = [...G];
        if (Id1.isInstanceOf(Z[D], Error)) {
            h_0(F, I);
            let W = A(B, Z[D]),
                J = Y.length;
            g_0(W, D, J, I), Y = Yd1(A, B, Q, Z[D], D, [W, ...Y], W, J)
        }
        if (Array.isArray(Z.errors)) Z.errors.forEach((W, J) => {
            if (Id1.isInstanceOf(W, Error)) {
                h_0(F, I);
                let X = A(B, W),
                    V = Y.length;
                g_0(X, `errors[${J}]`, V, I), Y = Yd1(A, B, Q, W, D, [X, ...Y], X, V)
            }
        });
        return Y
    }

    function h_0(A, B) {
        A.mechanism = A.mechanism || {
            type: "generic",
            handled: !0
        }, A.mechanism = {
            ...A.mechanism,
            ...A.type === "AggregateError" && {
                is_exception_group: !0
            },
            exception_id: B
        }
    }

    function g_0(A, B, Q, Z) {
        A.mechanism = A.mechanism || {
            type: "generic",
            handled: !0
        }, A.mechanism = {
            ...A.mechanism,
            type: "chained",
            source: B,
            exception_id: Q,
            parent_id: Z
        }
    }

    function K09(A, B) {
        return A.map((Q) => {
            if (Q.value) Q.value = V09.truncate(Q.value, B);
            return Q
        })
    }
    u_0.applyAggregateErrorsToEvent = C09
});
var vW = E((d_0) => {
    Object.defineProperty(d_0, "__esModule", {
        value: !0
    });

    function FJ1(A) {
        return A && A.Math == Math ? A : void 0
    }
    var Wd1 = typeof globalThis == "object" && FJ1(globalThis) || typeof window == "object" && FJ1(window) || typeof self == "object" && FJ1(self) || typeof global == "object" && FJ1(global) || function() {
        return this
    }() || {};

    function z09() {
        return Wd1
    }

    function E09(A, B, Q) {
        let Z = Q || Wd1,
            D = Z.__SENTRY__ = Z.__SENTRY__ || {};
        return D[A] || (D[A] = B())
    }
    d_0.GLOBAL_OBJ = Wd1;
    d_0.getGlobalObject = z09;
    d_0.getGlobalSingleton = E09
});