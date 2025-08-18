/* chunk:4 bytes:[56235, 71159) size:14924 source:unpacked-cli.js */
var md1 = E((cx0) => {
    Object.defineProperty(cx0, "__esModule", {
        value: !0
    });

    function qB9() {
        return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__
    }

    function NB9() {
        return "npm"
    }
    cx0.getSDKSource = NB9;
    cx0.isBrowserBundle = qB9
});
var dd1 = E((lx0, qJ1) => {
    Object.defineProperty(lx0, "__esModule", {
        value: !0
    });
    var RB9 = md1();

    function OB9() {
        return !RB9.isBrowserBundle() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]"
    }

    function $J1(A, B) {
        return A.require(B)
    }

    function TB9(A) {
        let B;
        try {
            B = $J1(qJ1, A)
        } catch (Q) {}
        try {
            let {
                cwd: Q
            } = $J1(qJ1, "process");
            B = $J1(qJ1, `${Q()}/node_modules/${A}`)
        } catch (Q) {}
        return B
    }
    lx0.dynamicRequire = $J1;
    lx0.isNodeEnv = OB9;
    lx0.loadModule = TB9
});
var nx0 = E((ix0) => {
    Object.defineProperty(ix0, "__esModule", {
        value: !0
    });
    var kB9 = dd1(),
        px0 = vW();

    function yB9() {
        return typeof window !== "undefined" && (!kB9.isNodeEnv() || _B9())
    }

    function _B9() {
        return px0.GLOBAL_OBJ.process !== void 0 && px0.GLOBAL_OBJ.process.type === "renderer"
    }
    ix0.isBrowser = yB9
});
var cd1 = E((ax0) => {
    Object.defineProperty(ax0, "__esModule", {
        value: !0
    });

    function vB9() {
        let A = typeof WeakSet === "function",
            B = A ? new WeakSet : [];

        function Q(D) {
            if (A) {
                if (B.has(D)) return !0;
                return B.add(D), !1
            }
            for (let G = 0; G < B.length; G++)
                if (B[G] === D) return !0;
            return B.push(D), !1
        }

        function Z(D) {
            if (A) B.delete(D);
            else
                for (let G = 0; G < B.length; G++)
                    if (B[G] === D) {
                        B.splice(G, 1);
                        break
                    }
        }
        return [Q, Z]
    }
    ax0.memoBuilder = vB9
});
var f21 = E((ox0) => {
    Object.defineProperty(ox0, "__esModule", {
        value: !0
    });
    var ld1 = iH(),
        fB9 = cd1(),
        hB9 = nH(),
        gB9 = YJ1();

    function sx0(A, B = 100, Q = 1 / 0) {
        try {
            return NJ1("", A, B, Q)
        } catch (Z) {
            return {
                ERROR: `**non-serializable** (${Z})`
            }
        }
    }

    function rx0(A, B = 3, Q = 102400) {
        let Z = sx0(A, B);
        if (cB9(Z) > Q) return rx0(A, B - 1, Q);
        return Z
    }

    function NJ1(A, B, Q = 1 / 0, Z = 1 / 0, D = fB9.memoBuilder()) {
        let [G, F] = D;
        if (B == null || ["number", "boolean", "string"].includes(typeof B) && !ld1.isNaN(B)) return B;
        let I = uB9(A, B);
        if (!I.startsWith("[object ")) return I;
        if (B.__sentry_skip_normalization__) return B;
        let Y = typeof B.__sentry_override_normalization_depth__ === "number" ? B.__sentry_override_normalization_depth__ : Q;
        if (Y === 0) return I.replace("object ", "");
        if (G(B)) return "[Circular ~]";
        let W = B;
        if (W && typeof W.toJSON === "function") try {
            let C = W.toJSON();
            return NJ1("", C, Y - 1, Z, D)
        } catch (C) {}
        let J = Array.isArray(B) ? [] : {},
            X = 0,
            V = hB9.convertToPlainObject(B);
        for (let C in V) {
            if (!Object.prototype.hasOwnProperty.call(V, C)) continue;
            if (X >= Z) {
                J[C] = "[MaxProperties ~]";
                break
            }
            let K = V[C];
            J[C] = NJ1(C, K, Y - 1, Z, D), X++
        }
        return F(B), J
    }

    function uB9(A, B) {
        try {
            if (A === "domain" && B && typeof B === "object" && B._events) return "[Domain]";
            if (A === "domainEmitter") return "[DomainEmitter]";
            if (typeof global !== "undefined" && B === global) return "[Global]";
            if (typeof window !== "undefined" && B === window) return "[Window]";
            if (typeof document !== "undefined" && B === document) return "[Document]";
            if (ld1.isVueViewModel(B)) return "[VueViewModel]";
            if (ld1.isSyntheticEvent(B)) return "[SyntheticEvent]";
            if (typeof B === "number" && B !== B) return "[NaN]";
            if (typeof B === "function") return `[Function: ${gB9.getFunctionName(B)}]`;
            if (typeof B === "symbol") return `[${String(B)}]`;
            if (typeof B === "bigint") return `[BigInt: ${String(B)}]`;
            let Q = mB9(B);
            if (/^HTML(\w*)Element$/.test(Q)) return `[HTMLElement: ${Q}]`;
            return `[object ${Q}]`
        } catch (Q) {
            return `**non-serializable** (${Q})`
        }
    }

    function mB9(A) {
        let B = Object.getPrototypeOf(A);
        return B ? B.constructor.name : "null prototype"
    }

    function dB9(A) {
        return ~-encodeURI(A).split(/%..|./).length
    }

    function cB9(A) {
        return dB9(JSON.stringify(A))
    }

    function lB9(A, B) {
        let Q = B.replace(/\\/g, "/").replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"),
            Z = A;
        try {
            Z = decodeURI(A)
        } catch (D) {}
        return Z.replace(/\\/g, "/").replace(/webpack:\/?/g, "").replace(new RegExp(`(file://)?/*${Q}/*`, "ig"), "app:///")
    }
    ox0.normalize = sx0;
    ox0.normalizeToSize = rx0;
    ox0.normalizeUrlToBase = lB9;
    ox0.walk = NJ1
});
var Dv0 = E((Zv0) => {
    Object.defineProperty(Zv0, "__esModule", {
        value: !0
    });

    function ex0(A, B) {
        let Q = 0;
        for (let Z = A.length - 1; Z >= 0; Z--) {
            let D = A[Z];
            if (D === ".") A.splice(Z, 1);
            else if (D === "..") A.splice(Z, 1), Q++;
            else if (Q) A.splice(Z, 1), Q--
        }
        if (B)
            for (; Q--; Q) A.unshift("..");
        return A
    }
    var sB9 = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;

    function Av0(A) {
        let B = A.length > 1024 ? `<truncated>${A.slice(-1024)}` : A,
            Q = sB9.exec(B);
        return Q ? Q.slice(1) : []
    }

    function pd1(...A) {
        let B = "",
            Q = !1;
        for (let Z = A.length - 1; Z >= -1 && !Q; Z--) {
            let D = Z >= 0 ? A[Z] : "/";
            if (!D) continue;
            B = `${D}/${B}`, Q = D.charAt(0) === "/"
        }
        return B = ex0(B.split("/").filter((Z) => !!Z), !Q).join("/"), (Q ? "/" : "") + B || "."
    }

    function tx0(A) {
        let B = 0;
        for (; B < A.length; B++)
            if (A[B] !== "") break;
        let Q = A.length - 1;
        for (; Q >= 0; Q--)
            if (A[Q] !== "") break;
        if (B > Q) return [];
        return A.slice(B, Q - B + 1)
    }

    function rB9(A, B) {
        A = pd1(A).slice(1), B = pd1(B).slice(1);
        let Q = tx0(A.split("/")),
            Z = tx0(B.split("/")),
            D = Math.min(Q.length, Z.length),
            G = D;
        for (let I = 0; I < D; I++)
            if (Q[I] !== Z[I]) {
                G = I;
                break
            } let F = [];
        for (let I = G; I < Q.length; I++) F.push("..");
        return F = F.concat(Z.slice(G)), F.join("/")
    }

    function Bv0(A) {
        let B = Qv0(A),
            Q = A.slice(-1) === "/",
            Z = ex0(A.split("/").filter((D) => !!D), !B).join("/");
        if (!Z && !B) Z = ".";
        if (Z && Q) Z += "/";
        return (B ? "/" : "") + Z
    }

    function Qv0(A) {
        return A.charAt(0) === "/"
    }

    function oB9(...A) {
        return Bv0(A.join("/"))
    }

    function tB9(A) {
        let B = Av0(A),
            Q = B[0],
            Z = B[1];
        if (!Q && !Z) return ".";
        if (Z) Z = Z.slice(0, Z.length - 1);
        return Q + Z
    }

    function eB9(A, B) {
        let Q = Av0(A)[2];
        if (B && Q.slice(B.length * -1) === B) Q = Q.slice(0, Q.length - B.length);
        return Q
    }
    Zv0.basename = eB9;
    Zv0.dirname = tB9;
    Zv0.isAbsolute = Qv0;
    Zv0.join = oB9;
    Zv0.normalizePath = Bv0;
    Zv0.relative = rB9;
    Zv0.resolve = pd1
});
var id1 = E((Gv0) => {
    Object.defineProperty(Gv0, "__esModule", {
        value: !0
    });
    var I99 = iH(),
        VO;
    (function(A) {
        A[A.PENDING = 0] = "PENDING";
        let Q = 1;
        A[A.RESOLVED = Q] = "RESOLVED";
        let Z = 2;
        A[A.REJECTED = Z] = "REJECTED"
    })(VO || (VO = {}));

    function Y99(A) {
        return new oq((B) => {
            B(A)
        })
    }

    function W99(A) {
        return new oq((B, Q) => {
            Q(A)
        })
    }
    class oq {
        constructor(A) {
            oq.prototype.__init.call(this), oq.prototype.__init2.call(this), oq.prototype.__init3.call(this), oq.prototype.__init4.call(this), this._state = VO.PENDING, this._handlers = [];
            try {
                A(this._resolve, this._reject)
            } catch (B) {
                this._reject(B)
            }
        }
        then(A, B) {
            return new oq((Q, Z) => {
                this._handlers.push([!1, (D) => {
                    if (!A) Q(D);
                    else try {
                        Q(A(D))
                    } catch (G) {
                        Z(G)
                    }
                }, (D) => {
                    if (!B) Z(D);
                    else try {
                        Q(B(D))
                    } catch (G) {
                        Z(G)
                    }
                }]), this._executeHandlers()
            })
        } catch (A) {
            return this.then((B) => B, A)
        } finally(A) {
            return new oq((B, Q) => {
                let Z, D;
                return this.then((G) => {
                    if (D = !1, Z = G, A) A()
                }, (G) => {
                    if (D = !0, Z = G, A) A()
                }).then(() => {
                    if (D) {
                        Q(Z);
                        return
                    }
                    B(Z)
                })
            })
        }
        __init() {
            this._resolve = (A) => {
                this._setResult(VO.RESOLVED, A)
            }
        }
        __init2() {
            this._reject = (A) => {
                this._setResult(VO.REJECTED, A)
            }
        }
        __init3() {
            this._setResult = (A, B) => {
                if (this._state !== VO.PENDING) return;
                if (I99.isThenable(B)) {
                    B.then(this._resolve, this._reject);
                    return
                }
                this._state = A, this._value = B, this._executeHandlers()
            }
        }
        __init4() {
            this._executeHandlers = () => {
                if (this._state === VO.PENDING) return;
                let A = this._handlers.slice();
                this._handlers = [], A.forEach((B) => {
                    if (B[0]) return;
                    if (this._state === VO.RESOLVED) B[1](this._value);
                    if (this._state === VO.REJECTED) B[2](this._value);
                    B[0] = !0
                })
            }
        }
    }
    Gv0.SyncPromise = oq;
    Gv0.rejectedSyncPromise = W99;
    Gv0.resolvedSyncPromise = Y99
});
var Iv0 = E((Fv0) => {
    Object.defineProperty(Fv0, "__esModule", {
        value: !0
    });
    var C99 = Hd1(),
        nd1 = id1();

    function K99(A) {
        let B = [];

        function Q() {
            return A === void 0 || B.length < A
        }

        function Z(F) {
            return B.splice(B.indexOf(F), 1)[0]
        }

        function D(F) {
            if (!Q()) return nd1.rejectedSyncPromise(new C99.SentryError("Not adding Promise because buffer limit was reached."));
            let I = F();
            if (B.indexOf(I) === -1) B.push(I);
            return I.then(() => Z(I)).then(null, () => Z(I).then(null, () => {})), I
        }

        function G(F) {
            return new nd1.SyncPromise((I, Y) => {
                let W = B.length;
                if (!W) return I(!0);
                let J = setTimeout(() => {
                    if (F && F > 0) I(!1)
                }, F);
                B.forEach((X) => {
                    nd1.resolvedSyncPromise(X).then(() => {
                        if (!--W) clearTimeout(J), I(!0)
                    }, Y)
                })
            })
        }
        return {
            $: B,
            add: D,
            drain: G
        }
    }
    Fv0.makePromiseBuffer = K99
});
var Wv0 = E((Yv0) => {
    Object.defineProperty(Yv0, "__esModule", {
        value: !0
    });

    function z99(A) {
        let B = {},
            Q = 0;
        while (Q < A.length) {
            let Z = A.indexOf("=", Q);
            if (Z === -1) break;
            let D = A.indexOf(";", Q);
            if (D === -1) D = A.length;
            else if (D < Z) {
                Q = A.lastIndexOf(";", Z - 1) + 1;
                continue
            }
            let G = A.slice(Q, Z).trim();
            if (B[G] === void 0) {
                let F = A.slice(Z + 1, D).trim();
                if (F.charCodeAt(0) === 34) F = F.slice(1, -1);
                try {
                    B[G] = F.indexOf("%") !== -1 ? decodeURIComponent(F) : F
                } catch (I) {
                    B[G] = F
                }
            }
            Q = D + 1
        }
        return B
    }
    Yv0.parseCookie = z99
});
var ad1 = E((Jv0) => {
    Object.defineProperty(Jv0, "__esModule", {
        value: !0
    });

    function U99(A) {
        if (!A) return {};
        let B = A.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!B) return {};
        let Q = B[6] || "",
            Z = B[8] || "";
        return {
            host: B[4],
            path: B[5],
            protocol: B[2],
            search: Q,
            hash: Z,
            relative: B[5] + Q + Z
        }
    }

    function w99(A) {
        return A.split(/[\?#]/, 1)[0]
    }

    function $99(A) {
        return A.split(/\\?\//).filter((B) => B.length > 0 && B !== ",").length
    }

    function q99(A) {
        let {
            protocol: B,
            host: Q,
            path: Z
        } = A, D = Q && Q.replace(/^.*@/, "[filtered]:[filtered]@").replace(/(:80)$/, "").replace(/(:443)$/, "") || "";
        return `${B?`${B}://`:""}${D}${Z}`
    }
    Jv0.getNumberOfUrlSegments = $99;
    Jv0.getSanitizedUrlString = q99;
    Jv0.parseUrl = U99;
    Jv0.stripUrlQueryAndFragment = w99
});