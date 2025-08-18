/* chunk:3 bytes:[36535, 56234) size:19699 source:unpacked-cli.js */
var _21 = E((Ux0) => {
    Object.defineProperty(Ux0, "__esModule", {
        value: !0
    });
    var pA9 = nH(),
        qd1 = k21(),
        iA9 = vW();

    function nA9() {
        let A = iA9.GLOBAL_OBJ,
            B = A.crypto || A.msCrypto,
            Q = () => Math.random() * 16;
        try {
            if (B && B.randomUUID) return B.randomUUID().replace(/-/g, "");
            if (B && B.getRandomValues) Q = () => {
                let Z = new Uint8Array(1);
                return B.getRandomValues(Z), Z[0]
            }
        } catch (Z) {}
        return ([1e7] + 1000 + 4000 + 8000 + 100000000000).replace(/[018]/g, (Z) => (Z ^ (Q() & 15) >> Z / 4).toString(16))
    }

    function Ex0(A) {
        return A.exception && A.exception.values ? A.exception.values[0] : void 0
    }

    function aA9(A) {
        let {
            message: B,
            event_id: Q
        } = A;
        if (B) return B;
        let Z = Ex0(A);
        if (Z) {
            if (Z.type && Z.value) return `${Z.type}: ${Z.value}`;
            return Z.type || Z.value || Q || "<unknown>"
        }
        return Q || "<unknown>"
    }

    function sA9(A, B, Q) {
        let Z = A.exception = A.exception || {},
            D = Z.values = Z.values || [],
            G = D[0] = D[0] || {};
        if (!G.value) G.value = B || "";
        if (!G.type) G.type = Q || "Error"
    }

    function rA9(A, B) {
        let Q = Ex0(A);
        if (!Q) return;
        let Z = {
                type: "generic",
                handled: !0
            },
            D = Q.mechanism;
        if (Q.mechanism = {
                ...Z,
                ...D,
                ...B
            }, B && "data" in B) {
            let G = {
                ...D && D.data,
                ...B.data
            };
            Q.mechanism.data = G
        }
    }
    var oA9 = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

    function tA9(A) {
        let B = A.match(oA9) || [],
            Q = parseInt(B[1], 10),
            Z = parseInt(B[2], 10),
            D = parseInt(B[3], 10);
        return {
            buildmetadata: B[5],
            major: isNaN(Q) ? void 0 : Q,
            minor: isNaN(Z) ? void 0 : Z,
            patch: isNaN(D) ? void 0 : D,
            prerelease: B[4]
        }
    }

    function eA9(A, B, Q = 5) {
        if (B.lineno === void 0) return;
        let Z = A.length,
            D = Math.max(Math.min(Z - 1, B.lineno - 1), 0);
        B.pre_context = A.slice(Math.max(0, D - Q), D).map((G) => qd1.snipLine(G, 0)), B.context_line = qd1.snipLine(A[Math.min(Z - 1, D)], B.colno || 0), B.post_context = A.slice(Math.min(D + 1, Z), D + 1 + Q).map((G) => qd1.snipLine(G, 0))
    }

    function A29(A) {
        if (A && A.__sentry_captured__) return !0;
        try {
            pA9.addNonEnumerableProperty(A, "__sentry_captured__", !0)
        } catch (B) {}
        return !1
    }

    function B29(A) {
        return Array.isArray(A) ? A : [A]
    }
    Ux0.addContextToFrame = eA9;
    Ux0.addExceptionMechanism = rA9;
    Ux0.addExceptionTypeValue = sA9;
    Ux0.arrayify = B29;
    Ux0.checkOrSetAlreadyCaught = A29;
    Ux0.getEventDescription = aA9;
    Ux0.parseSemver = tA9;
    Ux0.uuid4 = nA9
});
var Rd1 = E((Nx0) => {
    Object.defineProperty(Nx0, "__esModule", {
        value: !0
    });
    var J29 = _21(),
        JJ1 = nH(),
        X29 = vW(),
        Nd1 = XO(),
        jl = X29.GLOBAL_OBJ,
        V29 = 1000,
        wx0, Ld1, Md1;

    function C29(A) {
        Nd1.addHandler("dom", A), Nd1.maybeInstrument("dom", qx0)
    }

    function qx0() {
        if (!jl.document) return;
        let A = Nd1.triggerHandlers.bind(null, "dom"),
            B = $x0(A, !0);
        jl.document.addEventListener("click", B, !1), jl.document.addEventListener("keypress", B, !1), ["EventTarget", "Node"].forEach((Q) => {
            let Z = jl[Q] && jl[Q].prototype;
            if (!Z || !Z.hasOwnProperty || !Z.hasOwnProperty("addEventListener")) return;
            JJ1.fill(Z, "addEventListener", function(D) {
                return function(G, F, I) {
                    if (G === "click" || G == "keypress") try {
                        let Y = this,
                            W = Y.__sentry_instrumentation_handlers__ = Y.__sentry_instrumentation_handlers__ || {},
                            J = W[G] = W[G] || {
                                refCount: 0
                            };
                        if (!J.handler) {
                            let X = $x0(A);
                            J.handler = X, D.call(this, G, X, I)
                        }
                        J.refCount++
                    } catch (Y) {}
                    return D.call(this, G, F, I)
                }
            }), JJ1.fill(Z, "removeEventListener", function(D) {
                return function(G, F, I) {
                    if (G === "click" || G == "keypress") try {
                        let Y = this,
                            W = Y.__sentry_instrumentation_handlers__ || {},
                            J = W[G];
                        if (J) {
                            if (J.refCount--, J.refCount <= 0) D.call(this, G, J.handler, I), J.handler = void 0, delete W[G];
                            if (Object.keys(W).length === 0) delete Y.__sentry_instrumentation_handlers__
                        }
                    } catch (Y) {}
                    return D.call(this, G, F, I)
                }
            })
        })
    }

    function K29(A) {
        if (A.type !== Ld1) return !1;
        try {
            if (!A.target || A.target._sentryId !== Md1) return !1
        } catch (B) {}
        return !0
    }

    function H29(A, B) {
        if (A !== "keypress") return !1;
        if (!B || !B.tagName) return !0;
        if (B.tagName === "INPUT" || B.tagName === "TEXTAREA" || B.isContentEditable) return !1;
        return !0
    }

    function $x0(A, B = !1) {
        return (Q) => {
            if (!Q || Q._sentryCaptured) return;
            let Z = z29(Q);
            if (H29(Q.type, Z)) return;
            if (JJ1.addNonEnumerableProperty(Q, "_sentryCaptured", !0), Z && !Z._sentryId) JJ1.addNonEnumerableProperty(Z, "_sentryId", J29.uuid4());
            let D = Q.type === "keypress" ? "input" : Q.type;
            if (!K29(Q)) A({
                event: Q,
                name: D,
                global: B
            }), Ld1 = Q.type, Md1 = Z ? Z._sentryId : void 0;
            clearTimeout(wx0), wx0 = jl.setTimeout(() => {
                Md1 = void 0, Ld1 = void 0
            }, V29)
        }
    }

    function z29(A) {
        try {
            return A.target
        } catch (B) {
            return null
        }
    }
    Nx0.addClickKeypressInstrumentationHandler = C29;
    Nx0.instrumentDOM = qx0
});
var Pd1 = E((Lx0) => {
    Object.defineProperty(Lx0, "__esModule", {
        value: !0
    });
    var w29 = rq(),
        $29 = Bw(),
        q29 = vW(),
        XJ1 = q29.getGlobalObject();

    function N29() {
        try {
            return new ErrorEvent(""), !0
        } catch (A) {
            return !1
        }
    }

    function L29() {
        try {
            return new DOMError(""), !0
        } catch (A) {
            return !1
        }
    }

    function M29() {
        try {
            return new DOMException(""), !0
        } catch (A) {
            return !1
        }
    }

    function Td1() {
        if (!("fetch" in XJ1)) return !1;
        try {
            return new Request("http://www.example.com"), !0
        } catch (A) {
            return !1
        }
    }

    function Od1(A) {
        return A && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(A.toString())
    }

    function R29() {
        if (typeof EdgeRuntime === "string") return !0;
        if (!Td1()) return !1;
        if (Od1(XJ1.fetch)) return !0;
        let A = !1,
            B = XJ1.document;
        if (B && typeof B.createElement === "function") try {
            let Q = B.createElement("iframe");
            if (Q.hidden = !0, B.head.appendChild(Q), Q.contentWindow && Q.contentWindow.fetch) A = Od1(Q.contentWindow.fetch);
            B.head.removeChild(Q)
        } catch (Q) {
            w29.DEBUG_BUILD && $29.logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", Q)
        }
        return A
    }

    function O29() {
        return "ReportingObserver" in XJ1
    }

    function T29() {
        if (!Td1()) return !1;
        try {
            return new Request("_", {
                referrerPolicy: "origin"
            }), !0
        } catch (A) {
            return !1
        }
    }
    Lx0.isNativeFetch = Od1;
    Lx0.supportsDOMError = L29;
    Lx0.supportsDOMException = M29;
    Lx0.supportsErrorEvent = N29;
    Lx0.supportsFetch = Td1;
    Lx0.supportsNativeFetch = R29;
    Lx0.supportsReferrerPolicy = T29;
    Lx0.supportsReportingObserver = O29
});
var jd1 = E((Tx0) => {
    Object.defineProperty(Tx0, "__esModule", {
        value: !0
    });
    var b29 = nH(),
        f29 = Pd1(),
        Mx0 = vW(),
        x21 = XO();

    function h29(A) {
        x21.addHandler("fetch", A), x21.maybeInstrument("fetch", g29)
    }

    function g29() {
        if (!f29.supportsNativeFetch()) return;
        b29.fill(Mx0.GLOBAL_OBJ, "fetch", function(A) {
            return function(...B) {
                let {
                    method: Q,
                    url: Z
                } = Ox0(B), D = {
                    args: B,
                    fetchData: {
                        method: Q,
                        url: Z
                    },
                    startTimestamp: Date.now()
                };
                return x21.triggerHandlers("fetch", {
                    ...D
                }), A.apply(Mx0.GLOBAL_OBJ, B).then((G) => {
                    let F = {
                        ...D,
                        endTimestamp: Date.now(),
                        response: G
                    };
                    return x21.triggerHandlers("fetch", F), G
                }, (G) => {
                    let F = {
                        ...D,
                        endTimestamp: Date.now(),
                        error: G
                    };
                    throw x21.triggerHandlers("fetch", F), G
                })
            }
        })
    }

    function Sd1(A, B) {
        return !!A && typeof A === "object" && !!A[B]
    }

    function Rx0(A) {
        if (typeof A === "string") return A;
        if (!A) return "";
        if (Sd1(A, "url")) return A.url;
        if (A.toString) return A.toString();
        return ""
    }

    function Ox0(A) {
        if (A.length === 0) return {
            method: "GET",
            url: ""
        };
        if (A.length === 2) {
            let [Q, Z] = A;
            return {
                url: Rx0(Q),
                method: Sd1(Z, "method") ? String(Z.method).toUpperCase() : "GET"
            }
        }
        let B = A[0];
        return {
            url: Rx0(B),
            method: Sd1(B, "method") ? String(B.method).toUpperCase() : "GET"
        }
    }
    Tx0.addFetchInstrumentationHandler = h29;
    Tx0.parseFetchArgs = Ox0
});
var _d1 = E((Px0) => {
    Object.defineProperty(Px0, "__esModule", {
        value: !0
    });
    var kd1 = vW(),
        yd1 = XO(),
        VJ1 = null;

    function d29(A) {
        yd1.addHandler("error", A), yd1.maybeInstrument("error", c29)
    }

    function c29() {
        VJ1 = kd1.GLOBAL_OBJ.onerror, kd1.GLOBAL_OBJ.onerror = function(A, B, Q, Z, D) {
            let G = {
                column: Z,
                error: D,
                line: Q,
                msg: A,
                url: B
            };
            if (yd1.triggerHandlers("error", G), VJ1 && !VJ1.__SENTRY_LOADER__) return VJ1.apply(this, arguments);
            return !1
        }, kd1.GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = !0
    }
    Px0.addGlobalErrorInstrumentationHandler = d29
});
var bd1 = E((Sx0) => {
    Object.defineProperty(Sx0, "__esModule", {
        value: !0
    });
    var xd1 = vW(),
        vd1 = XO(),
        CJ1 = null;

    function p29(A) {
        vd1.addHandler("unhandledrejection", A), vd1.maybeInstrument("unhandledrejection", i29)
    }

    function i29() {
        CJ1 = xd1.GLOBAL_OBJ.onunhandledrejection, xd1.GLOBAL_OBJ.onunhandledrejection = function(A) {
            let B = A;
            if (vd1.triggerHandlers("unhandledrejection", B), CJ1 && !CJ1.__SENTRY_LOADER__) return CJ1.apply(this, arguments);
            return !0
        }, xd1.GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0
    }
    Sx0.addGlobalUnhandledRejectionInstrumentationHandler = p29
});
var fd1 = E((jx0) => {
    Object.defineProperty(jx0, "__esModule", {
        value: !0
    });
    var a29 = vW(),
        KJ1 = a29.getGlobalObject();

    function s29() {
        let A = KJ1.chrome,
            B = A && A.app && A.app.runtime,
            Q = "history" in KJ1 && !!KJ1.history.pushState && !!KJ1.history.replaceState;
        return !B && Q
    }
    jx0.supportsHistory = s29
});
var hd1 = E((yx0) => {
    Object.defineProperty(yx0, "__esModule", {
        value: !0
    });
    var kx0 = nH();
    rq();
    Bw();
    var o29 = vW(),
        t29 = fd1(),
        zJ1 = XO(),
        v21 = o29.GLOBAL_OBJ,
        HJ1;

    function e29(A) {
        zJ1.addHandler("history", A), zJ1.maybeInstrument("history", AB9)
    }

    function AB9() {
        if (!t29.supportsHistory()) return;
        let A = v21.onpopstate;
        v21.onpopstate = function(...Q) {
            let Z = v21.location.href,
                D = HJ1;
            HJ1 = Z;
            let G = {
                from: D,
                to: Z
            };
            if (zJ1.triggerHandlers("history", G), A) try {
                return A.apply(this, Q)
            } catch (F) {}
        };

        function B(Q) {
            return function(...Z) {
                let D = Z.length > 2 ? Z[2] : void 0;
                if (D) {
                    let G = HJ1,
                        F = String(D);
                    HJ1 = F;
                    let I = {
                        from: G,
                        to: F
                    };
                    zJ1.triggerHandlers("history", I)
                }
                return Q.apply(this, Z)
            }
        }
        kx0.fill(v21.history, "pushState", B), kx0.fill(v21.history, "replaceState", B)
    }
    yx0.addHistoryInstrumentationHandler = e29
});
var gd1 = E((xx0) => {
    Object.defineProperty(xx0, "__esModule", {
        value: !0
    });
    var UJ1 = iH(),
        EJ1 = nH(),
        QB9 = vW(),
        wJ1 = XO(),
        ZB9 = QB9.GLOBAL_OBJ,
        b21 = "__sentry_xhr_v3__";

    function DB9(A) {
        wJ1.addHandler("xhr", A), wJ1.maybeInstrument("xhr", _x0)
    }

    function _x0() {
        if (!ZB9.XMLHttpRequest) return;
        let A = XMLHttpRequest.prototype;
        EJ1.fill(A, "open", function(B) {
            return function(...Q) {
                let Z = Date.now(),
                    D = UJ1.isString(Q[0]) ? Q[0].toUpperCase() : void 0,
                    G = GB9(Q[1]);
                if (!D || !G) return B.apply(this, Q);
                if (this[b21] = {
                        method: D,
                        url: G,
                        request_headers: {}
                    }, D === "POST" && G.match(/sentry_key/)) this.__sentry_own_request__ = !0;
                let F = () => {
                    let I = this[b21];
                    if (!I) return;
                    if (this.readyState === 4) {
                        try {
                            I.status_code = this.status
                        } catch (W) {}
                        let Y = {
                            args: [D, G],
                            endTimestamp: Date.now(),
                            startTimestamp: Z,
                            xhr: this
                        };
                        wJ1.triggerHandlers("xhr", Y)
                    }
                };
                if ("onreadystatechange" in this && typeof this.onreadystatechange === "function") EJ1.fill(this, "onreadystatechange", function(I) {
                    return function(...Y) {
                        return F(), I.apply(this, Y)
                    }
                });
                else this.addEventListener("readystatechange", F);
                return EJ1.fill(this, "setRequestHeader", function(I) {
                    return function(...Y) {
                        let [W, J] = Y, X = this[b21];
                        if (X && UJ1.isString(W) && UJ1.isString(J)) X.request_headers[W.toLowerCase()] = J;
                        return I.apply(this, Y)
                    }
                }), B.apply(this, Q)
            }
        }), EJ1.fill(A, "send", function(B) {
            return function(...Q) {
                let Z = this[b21];
                if (!Z) return B.apply(this, Q);
                if (Q[0] !== void 0) Z.body = Q[0];
                let D = {
                    args: [Z.method, Z.url],
                    startTimestamp: Date.now(),
                    xhr: this
                };
                return wJ1.triggerHandlers("xhr", D), B.apply(this, Q)
            }
        })
    }

    function GB9(A) {
        if (UJ1.isString(A)) return A;
        try {
            return A.toString()
        } catch (B) {}
        return
    }
    xx0.SENTRY_XHR_DATA_KEY = b21;
    xx0.addXhrInstrumentationHandler = DB9;
    xx0.instrumentXHR = _x0
});
var dx0 = E((mx0) => {
    Object.defineProperty(mx0, "__esModule", {
        value: !0
    });
    var WB9 = rq(),
        JB9 = Bw(),
        vx0 = $d1(),
        bx0 = Rd1(),
        fx0 = jd1(),
        hx0 = _d1(),
        gx0 = bd1(),
        ux0 = hd1(),
        ud1 = gd1();

    function XB9(A, B) {
        switch (A) {
            case "console":
                return vx0.addConsoleInstrumentationHandler(B);
            case "dom":
                return bx0.addClickKeypressInstrumentationHandler(B);
            case "xhr":
                return ud1.addXhrInstrumentationHandler(B);
            case "fetch":
                return fx0.addFetchInstrumentationHandler(B);
            case "history":
                return ux0.addHistoryInstrumentationHandler(B);
            case "error":
                return hx0.addGlobalErrorInstrumentationHandler(B);
            case "unhandledrejection":
                return gx0.addGlobalUnhandledRejectionInstrumentationHandler(B);
            default:
                WB9.DEBUG_BUILD && JB9.logger.warn("unknown instrumentation type:", A)
        }
    }
    mx0.addConsoleInstrumentationHandler = vx0.addConsoleInstrumentationHandler;
    mx0.addClickKeypressInstrumentationHandler = bx0.addClickKeypressInstrumentationHandler;
    mx0.addFetchInstrumentationHandler = fx0.addFetchInstrumentationHandler;
    mx0.addGlobalErrorInstrumentationHandler = hx0.addGlobalErrorInstrumentationHandler;
    mx0.addGlobalUnhandledRejectionInstrumentationHandler = gx0.addGlobalUnhandledRejectionInstrumentationHandler;
    mx0.addHistoryInstrumentationHandler = ux0.addHistoryInstrumentationHandler;
    mx0.SENTRY_XHR_DATA_KEY = ud1.SENTRY_XHR_DATA_KEY;
    mx0.addXhrInstrumentationHandler = ud1.addXhrInstrumentationHandler;
    mx0.addInstrumentationHandler = XB9
});