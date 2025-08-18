/* chunk:25 bytes:[413987, 433942) size:19955 source:unpacked-cli.js */
var lX1 = E((Hc0) => {
    Object.defineProperty(Hc0, "__esModule", {
        value: !0
    });
    var cX1 = xQ(),
        aU9 = UA(),
        sU9 = $B1(),
        Xc0 = cl1(),
        Vc0 = "OnUncaughtException",
        rU9 = (A = {}) => {
            let B = {
                exitEvenIfOtherHandlersAreRegistered: !0,
                ...A
            };
            return {
                name: Vc0,
                setupOnce() {},
                setup(Q) {
                    global.process.on("uncaughtException", Kc0(Q, B))
                }
            }
        },
        Cc0 = cX1.defineIntegration(rU9),
        oU9 = cX1.convertIntegrationFnToClass(Vc0, Cc0);

    function Kc0(A, B) {
        let Z = !1,
            D = !1,
            G = !1,
            F, I = A.getOptions();
        return Object.assign((Y) => {
            let W = Xc0.logAndExitProcess;
            if (B.onFatalError) W = B.onFatalError;
            else if (I.onFatalError) W = I.onFatalError;
            let X = global.process.listeners("uncaughtException").reduce((C, K) => {
                    if (K.name === "domainUncaughtExceptionClear" || K.tag && K.tag === "sentry_tracingErrorCallback" || K._errorHandler) return C;
                    else return C + 1
                }, 0) === 0,
                V = B.exitEvenIfOtherHandlersAreRegistered || X;
            if (!Z) {
                if (F = Y, Z = !0, cX1.getClient() === A) cX1.captureException(Y, {
                    originalException: Y,
                    captureContext: {
                        level: "fatal"
                    },
                    mechanism: {
                        handled: !1,
                        type: "onuncaughtexception"
                    }
                });
                if (!G && V) G = !0, W(Y)
            } else if (V) {
                if (G) sU9.DEBUG_BUILD && aU9.logger.warn("uncaught exception after calling fatal error shutdown callback - this is bad! forcing shutdown"), Xc0.logAndExitProcess(Y);
                else if (!D) D = !0, setTimeout(() => {
                    if (!G) G = !0, W(F, Y)
                }, 2000)
            }
        }, {
            _errorHandler: !0
        })
    }
    Hc0.OnUncaughtException = oU9;
    Hc0.makeErrorHandler = Kc0;
    Hc0.onUncaughtExceptionIntegration = Cc0
});
var iX1 = E(($c0) => {
    Object.defineProperty($c0, "__esModule", {
        value: !0
    });
    var pX1 = xQ(),
        zc0 = UA(),
        Bw9 = cl1(),
        Ec0 = "OnUnhandledRejection",
        Qw9 = (A = {}) => {
            let B = A.mode || "warn";
            return {
                name: Ec0,
                setupOnce() {},
                setup(Q) {
                    global.process.on("unhandledRejection", wc0(Q, {
                        mode: B
                    }))
                }
            }
        },
        Uc0 = pX1.defineIntegration(Qw9),
        Zw9 = pX1.convertIntegrationFnToClass(Ec0, Uc0);

    function wc0(A, B) {
        return function Q(Z, D) {
            if (pX1.getClient() !== A) return;
            pX1.captureException(Z, {
                originalException: D,
                captureContext: {
                    extra: {
                        unhandledPromiseRejection: !0
                    }
                },
                mechanism: {
                    handled: !1,
                    type: "onunhandledrejection"
                }
            }), Dw9(Z, B)
        }
    }

    function Dw9(A, B) {
        let Q = "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason:";
        if (B.mode === "warn") zc0.consoleSandbox(() => {
            console.warn(Q), console.error(A && A.stack ? A.stack : A)
        });
        else if (B.mode === "strict") zc0.consoleSandbox(() => {
            console.warn(Q)
        }), Bw9.logAndExitProcess(A)
    }
    $c0.OnUnhandledRejection = Zw9;
    $c0.makeUnhandledPromiseHandler = wc0;
    $c0.onUnhandledRejectionIntegration = Uc0
});
var nX1 = E((Rc0) => {
    Object.defineProperty(Rc0, "__esModule", {
        value: !0
    });
    var Yw9 = W1("http"),
        Ww9 = W1("url"),
        qc0 = xQ(),
        Ap = UA(),
        Nc0 = "Spotlight",
        Jw9 = (A = {}) => {
            let B = {
                sidecarUrl: A.sidecarUrl || "http://localhost:8969/stream"
            };
            return {
                name: Nc0,
                setupOnce() {},
                setup(Q) {
                    if (typeof process === "object" && process.env) Ap.logger.warn("[Spotlight] It seems you're not in dev mode. Do you really want to have Spotlight enabled?");
                    Vw9(Q, B)
                }
            }
        },
        Lc0 = qc0.defineIntegration(Jw9),
        Xw9 = qc0.convertIntegrationFnToClass(Nc0, Lc0);

    function Vw9(A, B) {
        let Q = Cw9(B.sidecarUrl);
        if (!Q) return;
        let Z = 0;
        if (typeof A.on !== "function") {
            Ap.logger.warn("[Spotlight] Cannot connect to spotlight due to missing method on SDK client (`client.on`)");
            return
        }
        A.on("beforeEnvelope", (D) => {
            if (Z > 3) {
                Ap.logger.warn("[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests");
                return
            }
            let G = Ap.serializeEnvelope(D),
                I = Mc0()({
                    method: "POST",
                    path: Q.pathname,
                    hostname: Q.hostname,
                    port: Q.port,
                    headers: {
                        "Content-Type": "application/x-sentry-envelope"
                    }
                }, (Y) => {
                    Y.on("data", () => {}), Y.on("end", () => {}), Y.setEncoding("utf8")
                });
            I.on("error", () => {
                Z++, Ap.logger.warn("[Spotlight] Failed to send envelope to Spotlight Sidecar")
            }), I.write(G), I.end()
        })
    }

    function Cw9(A) {
        try {
            return new Ww9.URL(`${A}`)
        } catch (B) {
            Ap.logger.warn(`[Spotlight] Invalid sidecar URL: ${A}`);
            return
        }
    }

    function Mc0() {
        let {
            request: A
        } = Yw9;
        if (Kw9(A)) return A.__sentry_original__;
        return A
    }

    function Kw9(A) {
        return "__sentry_original__" in A
    }
    Rc0.Spotlight = Xw9;
    Rc0.getNativeHttpRequest = Mc0;
    Rc0.spotlightIntegration = Lc0
});
var sX1 = E((Oc0) => {
    var {
        _optionalChain: aX1
    } = UA();
    Object.defineProperty(Oc0, "__esModule", {
        value: !0
    });
    var bG = xQ(),
        cf = UA(),
        Uw9 = gf();
    Oc0.ChannelName = void 0;
    (function(A) {
        A.RequestCreate = "undici:request:create";
        let Q = "undici:request:headers";
        A.RequestEnd = Q;
        let Z = "undici:request:error";
        A.RequestError = Z
    })(Oc0.ChannelName || (Oc0.ChannelName = {}));
    var ww9 = (A) => {
            return new YV(A)
        },
        $w9 = bG.defineIntegration(ww9);
    class YV {
        static __initStatic() {
            this.id = "Undici"
        }
        __init() {
            this.name = YV.id
        }
        __init2() {
            this._createSpanUrlMap = new cf.LRUMap(100)
        }
        __init3() {
            this._headersUrlMap = new cf.LRUMap(100)
        }
        constructor(A = {}) {
            YV.prototype.__init.call(this), YV.prototype.__init2.call(this), YV.prototype.__init3.call(this), YV.prototype.__init4.call(this), YV.prototype.__init5.call(this), YV.prototype.__init6.call(this), this._options = {
                breadcrumbs: A.breadcrumbs === void 0 ? !0 : A.breadcrumbs,
                tracing: A.tracing,
                shouldCreateSpanForRequest: A.shouldCreateSpanForRequest
            }
        }
        setupOnce(A) {
            if (Uw9.NODE_VERSION.major < 16) return;
            let B;
            try {
                B = W1("diagnostics_channel")
            } catch (Q) {}
            if (!B || !B.subscribe) return;
            B.subscribe(Oc0.ChannelName.RequestCreate, this._onRequestCreate), B.subscribe(Oc0.ChannelName.RequestEnd, this._onRequestEnd), B.subscribe(Oc0.ChannelName.RequestError, this._onRequestError)
        }
        _shouldCreateSpan(A) {
            if (this._options.tracing === !1 || this._options.tracing === void 0 && !bG.hasTracingEnabled()) return !1;
            if (this._options.shouldCreateSpanForRequest === void 0) return !0;
            let B = this._createSpanUrlMap.get(A);
            if (B !== void 0) return B;
            let Q = this._options.shouldCreateSpanForRequest(A);
            return this._createSpanUrlMap.set(A, Q), Q
        }
        __init4() {
            this._onRequestCreate = (A) => {
                if (!aX1([bG.getClient, "call", (J) => J(), "optionalAccess", (J) => J.getIntegration, "call", (J) => J(YV)])) return;
                let {
                    request: B
                } = A, Q = B.origin ? B.origin.toString() + B.path : B.path, Z = bG.getClient();
                if (!Z) return;
                if (bG.isSentryRequestUrl(Q, Z) || B.__sentry_span__ !== void 0) return;
                let D = Z.getOptions(),
                    G = bG.getCurrentScope(),
                    F = bG.getIsolationScope(),
                    I = bG.getActiveSpan(),
                    Y = this._shouldCreateSpan(Q) ? Nw9(I, B, Q) : void 0;
                if (Y) B.__sentry_span__ = Y;
                if (((J) => {
                        if (D.tracePropagationTargets === void 0) return !0;
                        let X = this._headersUrlMap.get(J);
                        if (X !== void 0) return X;
                        let V = cf.stringMatchesSomePattern(J, D.tracePropagationTargets);
                        return this._headersUrlMap.set(J, V), V
                    })(Q)) {
                    let {
                        traceId: J,
                        spanId: X,
                        sampled: V,
                        dsc: C
                    } = {
                        ...F.getPropagationContext(),
                        ...G.getPropagationContext()
                    }, K = Y ? bG.spanToTraceHeader(Y) : cf.generateSentryTraceHeader(J, X, V), H = cf.dynamicSamplingContextToSentryBaggageHeader(C || (Y ? bG.getDynamicSamplingContextFromSpan(Y) : bG.getDynamicSamplingContextFromClient(J, Z, G)));
                    qw9(B, K, H)
                }
            }
        }
        __init5() {
            this._onRequestEnd = (A) => {
                if (!aX1([bG.getClient, "call", (G) => G(), "optionalAccess", (G) => G.getIntegration, "call", (G) => G(YV)])) return;
                let {
                    request: B,
                    response: Q
                } = A, Z = B.origin ? B.origin.toString() + B.path : B.path;
                if (bG.isSentryRequestUrl(Z, bG.getClient())) return;
                let D = B.__sentry_span__;
                if (D) bG.setHttpStatus(D, Q.statusCode), D.end();
                if (this._options.breadcrumbs) bG.addBreadcrumb({
                    category: "http",
                    data: {
                        method: B.method,
                        status_code: Q.statusCode,
                        url: Z
                    },
                    type: "http"
                }, {
                    event: "response",
                    request: B,
                    response: Q
                })
            }
        }
        __init6() {
            this._onRequestError = (A) => {
                if (!aX1([bG.getClient, "call", (D) => D(), "optionalAccess", (D) => D.getIntegration, "call", (D) => D(YV)])) return;
                let {
                    request: B
                } = A, Q = B.origin ? B.origin.toString() + B.path : B.path;
                if (bG.isSentryRequestUrl(Q, bG.getClient())) return;
                let Z = B.__sentry_span__;
                if (Z) Z.setStatus("internal_error"), Z.end();
                if (this._options.breadcrumbs) bG.addBreadcrumb({
                    category: "http",
                    data: {
                        method: B.method,
                        url: Q
                    },
                    level: "error",
                    type: "http"
                }, {
                    event: "error",
                    request: B
                })
            }
        }
    }
    YV.__initStatic();

    function qw9(A, B, Q) {
        let Z;
        if (Array.isArray(A.headers)) Z = A.headers.some((D) => D === "sentry-trace");
        else Z = A.headers.split(`\r
`).some((G) => G.startsWith("sentry-trace:"));
        if (Z) return;
        if (A.addHeader("sentry-trace", B), Q) A.addHeader("baggage", Q)
    }

    function Nw9(A, B, Q) {
        let Z = cf.parseUrl(Q),
            D = B.method || "GET",
            G = {
                "http.method": D
            };
        if (Z.search) G["http.query"] = Z.search;
        if (Z.hash) G["http.fragment"] = Z.hash;
        return aX1([A, "optionalAccess", (F) => F.startChild, "call", (F) => F({
            op: "http.client",
            origin: "auto.http.node.undici",
            description: `${D} ${cf.getSanitizedUrlString(Z)}`,
            data: G
        })])
    }
    Oc0.Undici = YV;
    Oc0.nativeNodeFetchintegration = $w9
});
var ll1 = E((Sc0) => {
    Object.defineProperty(Sc0, "__esModule", {
        value: !0
    });
    var Tc0 = W1("path"),
        Rw9 = UA();

    function Pc0(A) {
        return A.replace(/^[A-Z]:/, "").replace(/\\/g, "/")
    }

    function Ow9(A = process.argv[1] ? Rw9.dirname(process.argv[1]) : process.cwd(), B = Tc0.sep === "\\") {
        let Q = B ? Pc0(A) : A;
        return (Z) => {
            if (!Z) return;
            let D = B ? Pc0(Z) : Z,
                {
                    dir: G,
                    base: F,
                    ext: I
                } = Tc0.posix.parse(D);
            if (I === ".js" || I === ".mjs" || I === ".cjs") F = F.slice(0, I.length * -1);
            if (!G) G = ".";
            let Y = G.lastIndexOf("/node_modules");
            if (Y > -1) return `${G.slice(Y+14).replace(/\//g,".")}:${F}`;
            if (G.startsWith(Q)) {
                let W = G.slice(Q.length + 1).replace(/\//g, ".");
                if (W) W += ":";
                return W += F, W
            }
            return F
        }
    }
    Sc0.createGetModuleFromFilename = Ow9
});
var pl1 = E((xc0) => {
    var {
        _optionalChain: Pw9
    } = UA();
    Object.defineProperty(xc0, "__esModule", {
        value: !0
    });
    var tH = xQ(),
        lf = UA(),
        Sw9 = wd0(),
        jw9 = Sl1(),
        kw9 = _X1(),
        yw9 = xX1(),
        _w9 = bX1(),
        xw9 = fX1(),
        vw9 = uX1(),
        bw9 = mX1(),
        fw9 = lX1(),
        hw9 = iX1(),
        gw9 = nX1(),
        uw9 = sX1(),
        mw9 = ll1(),
        dw9 = yl1(),
        jc0 = [tH.inboundFiltersIntegration(), tH.functionToStringIntegration(), tH.linkedErrorsIntegration(), tH.requestDataIntegration(), kw9.consoleIntegration(), xw9.httpIntegration(), uw9.nativeNodeFetchintegration(), fw9.onUncaughtExceptionIntegration(), hw9.onUnhandledRejectionIntegration(), _w9.contextLinesIntegration(), vw9.localVariablesIntegration(), yw9.nodeContextIntegration(), bw9.modulesIntegration()];

    function kc0(A) {
        let B = tH.getMainCarrier(),
            Q = Pw9([B, "access", (Z) => Z.__SENTRY__, "optionalAccess", (Z) => Z.integrations]) || [];
        return [...jc0, ...Q]
    }

    function cw9(A = {}) {
        if (Sw9.setNodeAsyncContextStrategy(), A.defaultIntegrations === void 0) A.defaultIntegrations = kc0();
        if (A.dsn === void 0 && process.env.SENTRY_DSN) A.dsn = process.env.SENTRY_DSN;
        let B = process.env.SENTRY_TRACES_SAMPLE_RATE;
        if (A.tracesSampleRate === void 0 && B) {
            let Z = parseFloat(B);
            if (isFinite(Z)) A.tracesSampleRate = Z
        }
        if (A.release === void 0) {
            let Z = yc0();
            if (Z !== void 0) A.release = Z;
            else A.autoSessionTracking = !1
        }
        if (A.environment === void 0 && process.env.SENTRY_ENVIRONMENT) A.environment = process.env.SENTRY_ENVIRONMENT;
        if (A.autoSessionTracking === void 0 && A.dsn !== void 0) A.autoSessionTracking = !0;
        if (A.instrumenter === void 0) A.instrumenter = "sentry";
        let Q = {
            ...A,
            stackParser: lf.stackParserFromStackParserOptions(A.stackParser || _c0),
            integrations: tH.getIntegrationsToSetup(A),
            transport: A.transport || dw9.makeNodeTransport
        };
        if (tH.initAndBind(A.clientClass || jw9.NodeClient, Q), A.autoSessionTracking) pw9();
        if (iw9(), A.spotlight) {
            let Z = tH.getClient();
            if (Z && Z.addIntegration) {
                let D = Z.getOptions().integrations;
                for (let G of D) Z.addIntegration(G);
                Z.addIntegration(gw9.spotlightIntegration({
                    sidecarUrl: typeof A.spotlight === "string" ? A.spotlight : void 0
                }))
            }
        }
    }

    function lw9(A) {
        if (A === void 0) return !1;
        let B = A && A.getOptions();
        if (B && B.autoSessionTracking !== void 0) return B.autoSessionTracking;
        return !1
    }

    function yc0(A) {
        if (process.env.SENTRY_RELEASE) return process.env.SENTRY_RELEASE;
        if (lf.GLOBAL_OBJ.SENTRY_RELEASE && lf.GLOBAL_OBJ.SENTRY_RELEASE.id) return lf.GLOBAL_OBJ.SENTRY_RELEASE.id;
        return process.env.GITHUB_SHA || process.env.COMMIT_REF || process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GITHUB_COMMIT_SHA || process.env.VERCEL_GITLAB_COMMIT_SHA || process.env.VERCEL_BITBUCKET_COMMIT_SHA || process.env.ZEIT_GITHUB_COMMIT_SHA || process.env.ZEIT_GITLAB_COMMIT_SHA || process.env.ZEIT_BITBUCKET_COMMIT_SHA || process.env.CF_PAGES_COMMIT_SHA || A
    }
    var _c0 = lf.createStackParser(lf.nodeStackLineParser(mw9.createGetModuleFromFilename()));

    function pw9() {
        tH.startSession(), process.on("beforeExit", () => {
            let A = tH.getIsolationScope().getSession();
            if (A && !["exited", "crashed"].includes(A.status)) tH.endSession()
        })
    }

    function iw9() {
        let A = (process.env.SENTRY_USE_ENVIRONMENT || "").toLowerCase();
        if (!["false", "n", "no", "off", "0"].includes(A)) {
            let B = process.env.SENTRY_TRACE,
                Q = process.env.SENTRY_BAGGAGE,
                Z = lf.propagationContextFromHeaders(B, Q);
            tH.getCurrentScope().setPropagationContext(Z)
        }
    }
    xc0.defaultIntegrations = jc0;
    xc0.defaultStackParser = _c0;
    xc0.getDefaultIntegrations = kc0;
    xc0.getSentryRelease = yc0;
    xc0.init = cw9;
    xc0.isAutoSessionTrackingEnabled = lw9
});
var bc0 = E((vc0) => {
    Object.defineProperty(vc0, "__esModule", {
        value: !0
    });
    var rX1 = W1("fs"),
        il1 = W1("path");

    function ew9(A) {
        let B = il1.resolve(A);
        if (!rX1.existsSync(B)) throw new Error(`Cannot read contents of ${B}. Directory does not exist.`);
        if (!rX1.statSync(B).isDirectory()) throw new Error(`Cannot read contents of ${B}, because it is not a directory.`);
        let Q = (Z) => {
            return rX1.readdirSync(Z).reduce((D, G) => {
                let F = il1.join(Z, G);
                if (rX1.statSync(F).isDirectory()) return D.concat(Q(F));
                return D.push(F), D
            }, [])
        };
        return Q(B).map((Z) => il1.relative(B, Z))
    }
    vc0.deepReadDirSync = ew9
});