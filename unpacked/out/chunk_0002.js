/* chunk:2 bytes:[19253, 36534) size:17281 source:unpacked-cli.js */
var Jd1 = E((c_0) => {
    Object.defineProperty(c_0, "__esModule", {
        value: !0
    });
    var q09 = iH(),
        N09 = vW(),
        Tl = N09.getGlobalObject(),
        L09 = 80;

    function M09(A, B = {}) {
        if (!A) return "<unknown>";
        try {
            let Q = A,
                Z = 5,
                D = [],
                G = 0,
                F = 0,
                I = " > ",
                Y = I.length,
                W, J = Array.isArray(B) ? B : B.keyAttrs,
                X = !Array.isArray(B) && B.maxStringLength || L09;
            while (Q && G++ < Z) {
                if (W = R09(Q, J), W === "html" || G > 1 && F + D.length * Y + W.length >= X) break;
                D.push(W), F += W.length, Q = Q.parentNode
            }
            return D.reverse().join(I)
        } catch (Q) {
            return "<unknown>"
        }
    }

    function R09(A, B) {
        let Q = A,
            Z = [],
            D, G, F, I, Y;
        if (!Q || !Q.tagName) return "";
        if (Tl.HTMLElement) {
            if (Q instanceof HTMLElement && Q.dataset && Q.dataset.sentryComponent) return Q.dataset.sentryComponent
        }
        Z.push(Q.tagName.toLowerCase());
        let W = B && B.length ? B.filter((X) => Q.getAttribute(X)).map((X) => [X, Q.getAttribute(X)]) : null;
        if (W && W.length) W.forEach((X) => {
            Z.push(`[${X[0]}="${X[1]}"]`)
        });
        else {
            if (Q.id) Z.push(`#${Q.id}`);
            if (D = Q.className, D && q09.isString(D)) {
                G = D.split(/\s+/);
                for (Y = 0; Y < G.length; Y++) Z.push(`.${G[Y]}`)
            }
        }
        let J = ["aria-label", "type", "name", "title", "alt"];
        for (Y = 0; Y < J.length; Y++)
            if (F = J[Y], I = Q.getAttribute(F), I) Z.push(`[${F}="${I}"]`);
        return Z.join("")
    }

    function O09() {
        try {
            return Tl.document.location.href
        } catch (A) {
            return ""
        }
    }

    function T09(A) {
        if (Tl.document && Tl.document.querySelector) return Tl.document.querySelector(A);
        return null
    }

    function P09(A) {
        if (!Tl.HTMLElement) return null;
        let B = A,
            Q = 5;
        for (let Z = 0; Z < Q; Z++) {
            if (!B) return null;
            if (B instanceof HTMLElement && B.dataset.sentryComponent) return B.dataset.sentryComponent;
            B = B.parentNode
        }
        return null
    }
    c_0.getComponentName = P09;
    c_0.getDomElement = T09;
    c_0.getLocationHref = O09;
    c_0.htmlTreeAsString = M09
});
var rq = E((l_0) => {
    Object.defineProperty(l_0, "__esModule", {
        value: !0
    });
    var _09 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
    l_0.DEBUG_BUILD = _09
});
var Bw = E((i_0) => {
    Object.defineProperty(i_0, "__esModule", {
        value: !0
    });
    var v09 = rq(),
        Xd1 = vW(),
        b09 = "Sentry Logger ",
        Vd1 = ["debug", "info", "warn", "error", "log", "assert", "trace"],
        Cd1 = {};

    function p_0(A) {
        if (!("console" in Xd1.GLOBAL_OBJ)) return A();
        let B = Xd1.GLOBAL_OBJ.console,
            Q = {},
            Z = Object.keys(Cd1);
        Z.forEach((D) => {
            let G = Cd1[D];
            Q[D] = B[D], B[D] = G
        });
        try {
            return A()
        } finally {
            Z.forEach((D) => {
                B[D] = Q[D]
            })
        }
    }

    function f09() {
        let A = !1,
            B = {
                enable: () => {
                    A = !0
                },
                disable: () => {
                    A = !1
                },
                isEnabled: () => A
            };
        if (v09.DEBUG_BUILD) Vd1.forEach((Q) => {
            B[Q] = (...Z) => {
                if (A) p_0(() => {
                    Xd1.GLOBAL_OBJ.console[Q](`${b09}[${Q}]:`, ...Z)
                })
            }
        });
        else Vd1.forEach((Q) => {
            B[Q] = () => {
                return
            }
        });
        return B
    }
    var h09 = f09();
    i_0.CONSOLE_LEVELS = Vd1;
    i_0.consoleSandbox = p_0;
    i_0.logger = h09;
    i_0.originalConsoleMethods = Cd1
});
var Kd1 = E((s_0) => {
    Object.defineProperty(s_0, "__esModule", {
        value: !0
    });
    var c09 = rq(),
        y21 = Bw(),
        l09 = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;

    function p09(A) {
        return A === "http" || A === "https"
    }

    function i09(A, B = !1) {
        let {
            host: Q,
            path: Z,
            pass: D,
            port: G,
            projectId: F,
            protocol: I,
            publicKey: Y
        } = A;
        return `${I}://${Y}${B&&D?`:${D}`:""}@${Q}${G?`:${G}`:""}/${Z?`${Z}/`:Z}${F}`
    }

    function n_0(A) {
        let B = l09.exec(A);
        if (!B) {
            y21.consoleSandbox(() => {
                console.error(`Invalid Sentry Dsn: ${A}`)
            });
            return
        }
        let [Q, Z, D = "", G, F = "", I] = B.slice(1), Y = "", W = I, J = W.split("/");
        if (J.length > 1) Y = J.slice(0, -1).join("/"), W = J.pop();
        if (W) {
            let X = W.match(/^\d+/);
            if (X) W = X[0]
        }
        return a_0({
            host: G,
            pass: D,
            path: Y,
            projectId: W,
            port: F,
            protocol: Q,
            publicKey: Z
        })
    }

    function a_0(A) {
        return {
            protocol: A.protocol,
            publicKey: A.publicKey || "",
            pass: A.pass || "",
            host: A.host,
            port: A.port || "",
            path: A.path || "",
            projectId: A.projectId
        }
    }

    function n09(A) {
        if (!c09.DEBUG_BUILD) return !0;
        let {
            port: B,
            projectId: Q,
            protocol: Z
        } = A;
        if (["protocol", "publicKey", "host", "projectId"].find((F) => {
                if (!A[F]) return y21.logger.error(`Invalid Sentry Dsn: ${F} missing`), !0;
                return !1
            })) return !1;
        if (!Q.match(/^\d+$/)) return y21.logger.error(`Invalid Sentry Dsn: Invalid projectId ${Q}`), !1;
        if (!p09(Z)) return y21.logger.error(`Invalid Sentry Dsn: Invalid protocol ${Z}`), !1;
        if (B && isNaN(parseInt(B, 10))) return y21.logger.error(`Invalid Sentry Dsn: Invalid port ${B}`), !1;
        return !0
    }

    function a09(A) {
        let B = typeof A === "string" ? n_0(A) : a_0(A);
        if (!B || !n09(B)) return;
        return B
    }
    s_0.dsnFromString = n_0;
    s_0.dsnToString = i09;
    s_0.makeDsn = a09
});
var Hd1 = E((o_0) => {
    Object.defineProperty(o_0, "__esModule", {
        value: !0
    });
    class r_0 extends Error {
        constructor(A, B = "warn") {
            super(A);
            this.message = A, this.name = new.target.prototype.constructor.name, Object.setPrototypeOf(this, new.target.prototype), this.logLevel = B
        }
    }
    o_0.SentryError = r_0
});
var nH = E((Dx0) => {
    Object.defineProperty(Dx0, "__esModule", {
        value: !0
    });
    var e09 = Jd1(),
        AA9 = rq(),
        Pl = iH(),
        BA9 = Bw(),
        t_0 = k21();

    function QA9(A, B, Q) {
        if (!(B in A)) return;
        let Z = A[B],
            D = Q(Z);
        if (typeof D === "function") Qx0(D, Z);
        A[B] = D
    }

    function Bx0(A, B, Q) {
        try {
            Object.defineProperty(A, B, {
                value: Q,
                writable: !0,
                configurable: !0
            })
        } catch (Z) {
            AA9.DEBUG_BUILD && BA9.logger.log(`Failed to add non-enumerable property "${B}" to object`, A)
        }
    }

    function Qx0(A, B) {
        try {
            let Q = B.prototype || {};
            A.prototype = B.prototype = Q, Bx0(A, "__sentry_original__", B)
        } catch (Q) {}
    }

    function ZA9(A) {
        return A.__sentry_original__
    }

    function DA9(A) {
        return Object.keys(A).map((B) => `${encodeURIComponent(B)}=${encodeURIComponent(A[B])}`).join("&")
    }

    function Zx0(A) {
        if (Pl.isError(A)) return {
            message: A.message,
            name: A.name,
            stack: A.stack,
            ...Ax0(A)
        };
        else if (Pl.isEvent(A)) {
            let B = {
                type: A.type,
                target: e_0(A.target),
                currentTarget: e_0(A.currentTarget),
                ...Ax0(A)
            };
            if (typeof CustomEvent !== "undefined" && Pl.isInstanceOf(A, CustomEvent)) B.detail = A.detail;
            return B
        } else return A
    }

    function e_0(A) {
        try {
            return Pl.isElement(A) ? e09.htmlTreeAsString(A) : Object.prototype.toString.call(A)
        } catch (B) {
            return "<unknown>"
        }
    }

    function Ax0(A) {
        if (typeof A === "object" && A !== null) {
            let B = {};
            for (let Q in A)
                if (Object.prototype.hasOwnProperty.call(A, Q)) B[Q] = A[Q];
            return B
        } else return {}
    }

    function GA9(A, B = 40) {
        let Q = Object.keys(Zx0(A));
        if (Q.sort(), !Q.length) return "[object has no keys]";
        if (Q[0].length >= B) return t_0.truncate(Q[0], B);
        for (let Z = Q.length; Z > 0; Z--) {
            let D = Q.slice(0, Z).join(", ");
            if (D.length > B) continue;
            if (Z === Q.length) return D;
            return t_0.truncate(D, B)
        }
        return ""
    }

    function FA9(A) {
        return zd1(A, new Map)
    }

    function zd1(A, B) {
        if (IA9(A)) {
            let Q = B.get(A);
            if (Q !== void 0) return Q;
            let Z = {};
            B.set(A, Z);
            for (let D of Object.keys(A))
                if (typeof A[D] !== "undefined") Z[D] = zd1(A[D], B);
            return Z
        }
        if (Array.isArray(A)) {
            let Q = B.get(A);
            if (Q !== void 0) return Q;
            let Z = [];
            return B.set(A, Z), A.forEach((D) => {
                Z.push(zd1(D, B))
            }), Z
        }
        return A
    }

    function IA9(A) {
        if (!Pl.isPlainObject(A)) return !1;
        try {
            let B = Object.getPrototypeOf(A).constructor.name;
            return !B || B === "Object"
        } catch (B) {
            return !0
        }
    }

    function YA9(A) {
        let B;
        switch (!0) {
            case (A === void 0 || A === null):
                B = new String(A);
                break;
            case (typeof A === "symbol" || typeof A === "bigint"):
                B = Object(A);
                break;
            case Pl.isPrimitive(A):
                B = new A.constructor(A);
                break;
            default:
                B = A;
                break
        }
        return B
    }
    Dx0.addNonEnumerableProperty = Bx0;
    Dx0.convertToPlainObject = Zx0;
    Dx0.dropUndefinedKeys = FA9;
    Dx0.extractExceptionKeysForMessage = GA9;
    Dx0.fill = QA9;
    Dx0.getOriginalFunction = ZA9;
    Dx0.markFunctionWrapped = Qx0;
    Dx0.objectify = YA9;
    Dx0.urlEncode = DA9
});
var IJ1 = E((Fx0) => {
    Object.defineProperty(Fx0, "__esModule", {
        value: !0
    });

    function Gx0(A, B = !1) {
        return !(B || A && !A.startsWith("/") && !A.match(/^[A-Z]:/) && !A.startsWith(".") && !A.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//)) && A !== void 0 && !A.includes("node_modules/")
    }

    function UA9(A) {
        let B = /^\s*[-]{4,}$/,
            Q = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
        return (Z) => {
            let D = Z.match(Q);
            if (D) {
                let G, F, I, Y, W;
                if (D[1]) {
                    I = D[1];
                    let V = I.lastIndexOf(".");
                    if (I[V - 1] === ".") V--;
                    if (V > 0) {
                        G = I.slice(0, V), F = I.slice(V + 1);
                        let C = G.indexOf(".Module");
                        if (C > 0) I = I.slice(C + 1), G = G.slice(0, C)
                    }
                    Y = void 0
                }
                if (F) Y = G, W = F;
                if (F === "<anonymous>") W = void 0, I = void 0;
                if (I === void 0) W = W || "<anonymous>", I = Y ? `${Y}.${W}` : W;
                let J = D[2] && D[2].startsWith("file://") ? D[2].slice(7) : D[2],
                    X = D[5] === "native";
                if (J && J.match(/\/[A-Z]:/)) J = J.slice(1);
                if (!J && D[5] && !X) J = D[5];
                return {
                    filename: J,
                    module: A ? A(J) : void 0,
                    function: I,
                    lineno: parseInt(D[3], 10) || void 0,
                    colno: parseInt(D[4], 10) || void 0,
                    in_app: Gx0(J, X)
                }
            }
            if (Z.match(B)) return {
                filename: Z
            };
            return
        }
    }
    Fx0.filenameIsInApp = Gx0;
    Fx0.node = UA9
});
var YJ1 = E((Cx0) => {
    Object.defineProperty(Cx0, "__esModule", {
        value: !0
    });
    var Wx0 = IJ1(),
        Jx0 = 50,
        Ix0 = /\(error: (.*)\)/,
        Yx0 = /captureMessage|captureException/;

    function Xx0(...A) {
        let B = A.sort((Q, Z) => Q[0] - Z[0]).map((Q) => Q[1]);
        return (Q, Z = 0) => {
            let D = [],
                G = Q.split(`
`);
            for (let F = Z; F < G.length; F++) {
                let I = G[F];
                if (I.length > 1024) continue;
                let Y = Ix0.test(I) ? I.replace(Ix0, "$1") : I;
                if (Y.match(/\S*Error: /)) continue;
                for (let W of B) {
                    let J = W(Y);
                    if (J) {
                        D.push(J);
                        break
                    }
                }
                if (D.length >= Jx0) break
            }
            return Vx0(D)
        }
    }

    function qA9(A) {
        if (Array.isArray(A)) return Xx0(...A);
        return A
    }

    function Vx0(A) {
        if (!A.length) return [];
        let B = Array.from(A);
        if (/sentryWrapped/.test(B[B.length - 1].function || "")) B.pop();
        if (B.reverse(), Yx0.test(B[B.length - 1].function || "")) {
            if (B.pop(), Yx0.test(B[B.length - 1].function || "")) B.pop()
        }
        return B.slice(0, Jx0).map((Q) => ({
            ...Q,
            filename: Q.filename || B[B.length - 1].filename,
            function: Q.function || "?"
        }))
    }
    var Ed1 = "<anonymous>";

    function NA9(A) {
        try {
            if (!A || typeof A !== "function") return Ed1;
            return A.name || Ed1
        } catch (B) {
            return Ed1
        }
    }

    function LA9(A) {
        return [90, Wx0.node(A)]
    }
    Cx0.filenameIsInApp = Wx0.filenameIsInApp;
    Cx0.createStackParser = Xx0;
    Cx0.getFunctionName = NA9;
    Cx0.nodeStackLineParser = LA9;
    Cx0.stackParserFromStackParserOptions = qA9;
    Cx0.stripSentryFramesAndReverse = Vx0
});
var XO = E((Hx0) => {
    Object.defineProperty(Hx0, "__esModule", {
        value: !0
    });
    var jA9 = rq(),
        kA9 = Bw(),
        yA9 = YJ1(),
        Sl = {},
        Kx0 = {};

    function _A9(A, B) {
        Sl[A] = Sl[A] || [], Sl[A].push(B)
    }

    function xA9() {
        Object.keys(Sl).forEach((A) => {
            Sl[A] = void 0
        })
    }

    function vA9(A, B) {
        if (!Kx0[A]) B(), Kx0[A] = !0
    }

    function bA9(A, B) {
        let Q = A && Sl[A];
        if (!Q) return;
        for (let Z of Q) try {
            Z(B)
        } catch (D) {
            jA9.DEBUG_BUILD && kA9.logger.error(`Error while triggering instrumentation handler.
Type: ${A}
Name: ${yA9.getFunctionName(Z)}
Error:`, D)
        }
    }
    Hx0.addHandler = _A9;
    Hx0.maybeInstrument = vA9;
    Hx0.resetInstrumentationHandlers = xA9;
    Hx0.triggerHandlers = bA9
});
var $d1 = E((zx0) => {
    Object.defineProperty(zx0, "__esModule", {
        value: !0
    });
    var Ud1 = Bw(),
        mA9 = nH(),
        WJ1 = vW(),
        wd1 = XO();

    function dA9(A) {
        wd1.addHandler("console", A), wd1.maybeInstrument("console", cA9)
    }

    function cA9() {
        if (!("console" in WJ1.GLOBAL_OBJ)) return;
        Ud1.CONSOLE_LEVELS.forEach(function(A) {
            if (!(A in WJ1.GLOBAL_OBJ.console)) return;
            mA9.fill(WJ1.GLOBAL_OBJ.console, A, function(B) {
                return Ud1.originalConsoleMethods[A] = B,
                    function(...Q) {
                        let Z = {
                            args: Q,
                            level: A
                        };
                        wd1.triggerHandlers("console", Z);
                        let D = Ud1.originalConsoleMethods[A];
                        D && D.apply(WJ1.GLOBAL_OBJ.console, Q)
                    }
            })
        })
    }
    zx0.addConsoleInstrumentationHandler = dA9
});