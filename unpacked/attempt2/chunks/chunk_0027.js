/* chunk:27 bytes:[623121, 642161) size:19040 source:unpacked-cli.js */
var tX1 = E((mc0, dc0) => {
    var {
        _optionalChain: Z$9,
        _optionalChainDelete: hc0
    } = UA();
    Object.defineProperty(mc0, "__esModule", {
        value: !0
    });
    var D$9 = W1("url"),
        MO = xQ(),
        oX1 = UA(),
        nl1 = gf(),
        G$9 = fc0(),
        F$9 = 50,
        I$9 = 5000;

    function al1(A, ...B) {
        oX1.logger.log(`[ANR] ${A}`, ...B)
    }

    function Y$9() {
        return oX1.GLOBAL_OBJ
    }

    function W$9() {
        let A = MO.getGlobalScope().getScopeData();
        return MO.mergeScopeData(A, MO.getIsolationScope().getScopeData()), MO.mergeScopeData(A, MO.getCurrentScope().getScopeData()), A.attachments = [], A.eventProcessors = [], A
    }

    function J$9() {
        return oX1.dynamicRequire(dc0, "worker_threads")
    }
    async function X$9(A) {
        let B = {
                message: "ANR"
            },
            Q = {};
        for (let Z of A.getEventProcessors()) {
            if (B === null) break;
            B = await Z(B, Q)
        }
        return Z$9([B, "optionalAccess", (Z) => Z.contexts]) || {}
    }
    var gc0 = "Anr",
        V$9 = (A = {}) => {
            if (nl1.NODE_VERSION.major < 16 || nl1.NODE_VERSION.major === 16 && nl1.NODE_VERSION.minor < 17) throw new Error("ANR detection requires Node 16.17.0 or later");
            let B, Q, Z = Y$9();
            return Z.__SENTRY_GET_SCOPES__ = W$9, {
                name: gc0,
                setupOnce() {},
                startWorker: () => {
                    if (B) return;
                    if (Q) B = K$9(Q, A)
                },
                stopWorker: () => {
                    if (B) B.then((D) => {
                        D(), B = void 0
                    })
                },
                setup(D) {
                    Q = D, setImmediate(() => this.startWorker())
                }
            }
        },
        uc0 = MO.defineIntegration(V$9),
        C$9 = MO.convertIntegrationFnToClass(gc0, uc0);
    async function K$9(A, B) {
        let Q = A.getDsn();
        if (!Q) return () => {};
        let Z = await X$9(A);
        hc0([Z, "access", (J) => J.app, "optionalAccess", (J) => delete J.app_memory]), hc0([Z, "access", (J) => J.device, "optionalAccess", (J) => delete J.free_memory]);
        let D = A.getOptions(),
            G = A.getSdkMetadata() || {};
        if (G.sdk) G.sdk.integrations = D.integrations.map((J) => J.name);
        let F = {
            debug: oX1.logger.isEnabled(),
            dsn: Q,
            environment: D.environment || "production",
            release: D.release,
            dist: D.dist,
            sdkMetadata: G,
            appRootPath: B.appRootPath,
            pollInterval: B.pollInterval || F$9,
            anrThreshold: B.anrThreshold || I$9,
            captureStackTrace: !!B.captureStackTrace,
            staticTags: B.staticTags || {},
            contexts: Z
        };
        if (F.captureStackTrace) {
            let J = W1("inspector");
            if (!J.url()) J.open(0)
        }
        let {
            Worker: I
        } = J$9(), Y = new I(new D$9.URL(`data:application/javascript;base64,${G$9.base64WorkerScript}`), {
            workerData: F
        });
        process.on("exit", () => {
            Y.terminate()
        });
        let W = setInterval(() => {
            try {
                let J = MO.getCurrentScope().getSession(),
                    X = J ? {
                        ...J,
                        toJSON: void 0
                    } : void 0;
                Y.postMessage({
                    session: X
                })
            } catch (J) {}
        }, F.pollInterval);
        return W.unref(), Y.on("message", (J) => {
            if (J === "session-ended") al1("ANR event sent from ANR worker. Clearing session in this thread."), MO.getCurrentScope().setSession(void 0)
        }), Y.once("error", (J) => {
            clearInterval(W), al1("ANR worker error", J)
        }), Y.once("exit", (J) => {
            clearInterval(W), al1("ANR worker exit", J)
        }), Y.unref(), () => {
            Y.terminate(), clearInterval(W)
        }
    }
    mc0.Anr = C$9;
    mc0.anrIntegration = uc0
});
var lc0 = E((cc0) => {
    Object.defineProperty(cc0, "__esModule", {
        value: !0
    });
    var E$9 = xQ(),
        U$9 = tX1();

    function w$9(A) {
        let B = E$9.getClient();
        return new U$9.Anr(A).setup(B), Promise.resolve()
    }
    cc0.enableAnrDetection = w$9
});
var sl1 = E((nc0) => {
    var {
        _optionalChain: pc0
    } = UA();
    Object.defineProperty(nc0, "__esModule", {
        value: !0
    });
    var Qp = xQ(),
        ic0 = UA();

    function q$9(A = {}) {
        return function({
            path: B,
            type: Q,
            next: Z,
            rawInput: D
        }) {
            let G = pc0([Qp.getClient, "call", (W) => W(), "optionalAccess", (W) => W.getOptions, "call", (W) => W()]),
                F = Qp.getCurrentScope().getTransaction();
            if (F) {
                F.updateName(`trpc/${B}`), F.setAttribute(Qp.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "route"), F.op = "rpc.server";
                let W = {
                    procedure_type: Q
                };
                if (A.attachRpcInput !== void 0 ? A.attachRpcInput : pc0([G, "optionalAccess", (J) => J.sendDefaultPii])) W.input = ic0.normalize(D);
                F.setContext("trpc", W)
            }

            function I(W) {
                if (!W.ok) Qp.captureException(W.error, {
                    mechanism: {
                        handled: !1,
                        data: {
                            function: "trpcMiddleware"
                        }
                    }
                })
            }
            let Y;
            try {
                Y = Z()
            } catch (W) {
                throw Qp.captureException(W, {
                    mechanism: {
                        handled: !1,
                        data: {
                            function: "trpcMiddleware"
                        }
                    }
                }), W
            }
            if (ic0.isThenable(Y)) Promise.resolve(Y).then((W) => {
                I(W)
            }, (W) => {
                Qp.captureException(W, {
                    mechanism: {
                        handled: !1,
                        data: {
                            function: "trpcMiddleware"
                        }
                    }
                })
            });
            else I(Y);
            return Y
        }
    }
    nc0.trpcMiddleware = q$9
});
var rc0 = E((sc0) => {
    Object.defineProperty(sc0, "__esModule", {
        value: !0
    });
    var ac0 = UA();

    function L$9(A, B) {
        return ac0.extractRequestData(A, {
            include: B
        })
    }

    function M$9(A, B, Q = {}) {
        return ac0.addRequestDataToEvent(A, B, {
            include: Q
        })
    }
    sc0.extractRequestData = L$9;
    sc0.parseRequest = M$9
});
var ec0 = E((tc0) => {
    var {
        _optionalChain: eX1
    } = UA();
    Object.defineProperty(tc0, "__esModule", {
        value: !0
    });
    var GI = xQ(),
        Zp = UA(),
        T$9 = $B1(),
        AV1 = pl1(),
        P$9 = sl1(),
        oc0 = rc0();

    function S$9() {
        return function A(B, Q, Z) {
            let D = eX1([GI.getClient, "call", (J) => J(), "optionalAccess", (J) => J.getOptions, "call", (J) => J()]);
            if (!D || D.instrumenter !== "sentry" || eX1([B, "access", (J) => J.method, "optionalAccess", (J) => J.toUpperCase, "call", (J) => J()]) === "OPTIONS" || eX1([B, "access", (J) => J.method, "optionalAccess", (J) => J.toUpperCase, "call", (J) => J()]) === "HEAD") return Z();
            let G = B.headers && Zp.isString(B.headers["sentry-trace"]) ? B.headers["sentry-trace"] : void 0,
                F = eX1([B, "access", (J) => J.headers, "optionalAccess", (J) => J.baggage]);
            if (!GI.hasTracingEnabled(D)) return Z();
            let [I, Y] = Zp.extractPathForTransaction(B, {
                path: !0,
                method: !0
            }), W = GI.continueTrace({
                sentryTrace: G,
                baggage: F
            }, (J) => GI.startTransaction({
                name: I,
                op: "http.server",
                origin: "auto.http.node.tracingHandler",
                ...J,
                data: {
                    [GI.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: Y
                },
                metadata: {
                    ...J.metadata,
                    request: B
                }
            }, {
                request: Zp.extractRequestData(B)
            }));
            GI.getCurrentScope().setSpan(W), Q.__sentry_transaction = W, Q.once("finish", () => {
                setImmediate(() => {
                    Zp.addRequestDataToTransaction(W, B), GI.setHttpStatus(W, Q.statusCode), W.end()
                })
            }), Z()
        }
    }

    function j$9(A = {}) {
        let B;
        if ("include" in A) B = {
            include: A.include
        };
        else {
            let {
                ip: Q,
                request: Z,
                transaction: D,
                user: G
            } = A;
            if (Q || Z || D || G) B = {
                include: Zp.dropUndefinedKeys({
                    ip: Q,
                    request: Z,
                    transaction: D,
                    user: G
                })
            }
        }
        return B
    }

    function k$9(A) {
        let B = j$9(A),
            Q = GI.getClient();
        if (Q && AV1.isAutoSessionTrackingEnabled(Q)) {
            Q.initSessionFlusher();
            let Z = GI.getCurrentScope();
            if (Z.getSession()) Z.setSession()
        }
        return function Z(D, G, F) {
            if (A && A.flushTimeout && A.flushTimeout > 0) {
                let I = G.end;
                G.end = function(Y, W, J) {
                    GI.flush(A.flushTimeout).then(() => {
                        I.call(this, Y, W, J)
                    }).then(null, (X) => {
                        T$9.DEBUG_BUILD && Zp.logger.error(X), I.call(this, Y, W, J)
                    })
                }
            }
            GI.runWithAsyncContext(() => {
                let I = GI.getCurrentScope();
                I.setSDKProcessingMetadata({
                    request: D,
                    requestDataOptionsFromExpressHandler: B
                });
                let Y = GI.getClient();
                if (AV1.isAutoSessionTrackingEnabled(Y)) I.setRequestSession({
                    status: "ok"
                });
                G.once("finish", () => {
                    let W = GI.getClient();
                    if (AV1.isAutoSessionTrackingEnabled(W)) setImmediate(() => {
                        if (W && W._captureRequestSession) W._captureRequestSession()
                    })
                }), F()
            })
        }
    }

    function y$9(A) {
        let B = A.status || A.statusCode || A.status_code || A.output && A.output.statusCode;
        return B ? parseInt(B, 10) : 500
    }

    function _$9(A) {
        return y$9(A) >= 500
    }

    function x$9(A) {
        return function B(Q, Z, D, G) {
            if ((A && A.shouldHandleError || _$9)(Q)) {
                GI.withScope((I) => {
                    I.setSDKProcessingMetadata({
                        request: Z
                    });
                    let Y = D.__sentry_transaction;
                    if (Y && !GI.getActiveSpan()) I.setSpan(Y);
                    let W = GI.getClient();
                    if (W && AV1.isAutoSessionTrackingEnabled(W)) {
                        if (W._sessionFlusher !== void 0) {
                            let V = I.getRequestSession();
                            if (V && V.status !== void 0) V.status = "crashed"
                        }
                    }
                    let J = GI.captureException(Q, {
                        mechanism: {
                            type: "middleware",
                            handled: !1
                        }
                    });
                    D.sentry = J, G(Q)
                });
                return
            }
            G(Q)
        }
    }
    var v$9 = P$9.trpcMiddleware;
    tc0.extractRequestData = oc0.extractRequestData;
    tc0.parseRequest = oc0.parseRequest;
    tc0.errorHandler = x$9;
    tc0.requestHandler = k$9;
    tc0.tracingHandler = S$9;
    tc0.trpcMiddleware = v$9
});
var rl1 = E((Fl0) => {
    Object.defineProperty(Fl0, "__esModule", {
        value: !0
    });
    var WV = xQ(),
        Bl0 = UA();

    function Al0(A) {
        return A && A.statusCode !== void 0
    }

    function d$9(A) {
        return A && A.error !== void 0
    }

    function c$9(A) {
        WV.captureException(A, {
            mechanism: {
                type: "hapi",
                handled: !1,
                data: {
                    function: "hapiErrorPlugin"
                }
            }
        })
    }
    var Ql0 = {
            name: "SentryHapiErrorPlugin",
            version: WV.SDK_VERSION,
            register: async function(A) {
                A.events.on("request", (Q, Z) => {
                    let D = WV.getActiveTransaction();
                    if (d$9(Z)) c$9(Z.error);
                    if (D) D.setStatus("internal_error"), D.end()
                })
            }
        },
        Zl0 = {
            name: "SentryHapiTracingPlugin",
            version: WV.SDK_VERSION,
            register: async function(A) {
                let B = A;
                B.ext("onPreHandler", (Q, Z) => {
                    let D = WV.continueTrace({
                        sentryTrace: Q.headers["sentry-trace"] || void 0,
                        baggage: Q.headers.baggage || void 0
                    }, (G) => {
                        return WV.startTransaction({
                            ...G,
                            op: "hapi.request",
                            name: Q.route.path,
                            description: `${Q.route.method} ${Q.path}`
                        })
                    });
                    return WV.getCurrentScope().setSpan(D), Z.continue
                }), B.ext("onPreResponse", (Q, Z) => {
                    let D = WV.getActiveTransaction();
                    if (Q.response && Al0(Q.response) && D) {
                        let G = Q.response;
                        G.header("sentry-trace", WV.spanToTraceHeader(D));
                        let F = Bl0.dynamicSamplingContextToSentryBaggageHeader(WV.getDynamicSamplingContextFromSpan(D));
                        if (F) G.header("baggage", F)
                    }
                    return Z.continue
                }), B.ext("onPostHandler", (Q, Z) => {
                    let D = WV.getActiveTransaction();
                    if (D) {
                        if (Q.response && Al0(Q.response)) WV.setHttpStatus(D, Q.response.statusCode);
                        D.end()
                    }
                    return Z.continue
                })
            }
        },
        Dl0 = "Hapi",
        l$9 = (A = {}) => {
            let B = A.server;
            return {
                name: Dl0,
                setupOnce() {
                    if (!B) return;
                    Bl0.fill(B, "start", (Q) => {
                        return async function() {
                            return await this.register(Zl0), await this.register(Ql0), Q.apply(this)
                        }
                    })
                }
            }
        },
        Gl0 = WV.defineIntegration(l$9),
        p$9 = WV.convertIntegrationFnToClass(Dl0, Gl0);
    Fl0.Hapi = p$9;
    Fl0.hapiErrorPlugin = Ql0;
    Fl0.hapiIntegration = Gl0;
    Fl0.hapiTracingPlugin = Zl0
});
var Yl0 = E((Il0) => {
    Object.defineProperty(Il0, "__esModule", {
        value: !0
    });
    var r$9 = _X1(),
        o$9 = fX1(),
        t$9 = lX1(),
        e$9 = iX1(),
        Aq9 = mX1(),
        Bq9 = bX1(),
        Qq9 = xX1(),
        Zq9 = xQ(),
        Dq9 = uX1(),
        Gq9 = sX1(),
        Fq9 = nX1(),
        Iq9 = tX1(),
        Yq9 = rl1();
    Il0.Console = r$9.Console;
    Il0.Http = o$9.Http;
    Il0.OnUncaughtException = t$9.OnUncaughtException;
    Il0.OnUnhandledRejection = e$9.OnUnhandledRejection;
    Il0.Modules = Aq9.Modules;
    Il0.ContextLines = Bq9.ContextLines;
    Il0.Context = Qq9.Context;
    Il0.RequestData = Zq9.RequestData;
    Il0.LocalVariables = Dq9.LocalVariables;
    Il0.Undici = Gq9.Undici;
    Il0.Spotlight = Fq9.Spotlight;
    Il0.Anr = Iq9.Anr;
    Il0.Hapi = Yq9.Hapi
});
var Jl0 = E((Wl0) => {
    Object.defineProperty(Wl0, "__esModule", {
        value: !0
    });
    var pf = Pl1();
    Wl0.Apollo = pf.Apollo;
    Wl0.Express = pf.Express;
    Wl0.GraphQL = pf.GraphQL;
    Wl0.Mongo = pf.Mongo;
    Wl0.Mysql = pf.Mysql;
    Wl0.Postgres = pf.Postgres;
    Wl0.Prisma = pf.Prisma
});
var Kl0 = E((Cl0) => {
    Object.defineProperty(Cl0, "__esModule", {
        value: !0
    });
    var nf = xQ(),
        af = UA(),
        Xl0 = "CaptureConsole",
        Sq9 = (A = {}) => {
            let B = A.levels || af.CONSOLE_LEVELS;
            return {
                name: Xl0,
                setupOnce() {},
                setup(Q) {
                    if (!("console" in af.GLOBAL_OBJ)) return;
                    af.addConsoleInstrumentationHandler(({
                        args: Z,
                        level: D
                    }) => {
                        if (nf.getClient() !== Q || !B.includes(D)) return;
                        kq9(Z, D)
                    })
                }
            }
        },
        Vl0 = nf.defineIntegration(Sq9),
        jq9 = nf.convertIntegrationFnToClass(Xl0, Vl0);

    function kq9(A, B) {
        let Q = {
            level: af.severityLevelFromString(B),
            extra: {
                arguments: A
            }
        };
        nf.withScope((Z) => {
            if (Z.addEventProcessor((F) => {
                    return F.logger = "console", af.addExceptionMechanism(F, {
                        handled: !1,
                        type: "console"
                    }), F
                }), B === "assert" && A[0] === !1) {
                let F = `Assertion failed: ${af.safeJoin(A.slice(1)," ")||"console.assert"}`;
                Z.setExtra("arguments", A.slice(1)), nf.captureMessage(F, Q);
                return
            }
            let D = A.find((F) => F instanceof Error);
            if (B === "error" && D) {
                nf.captureException(D, Q);
                return
            }
            let G = af.safeJoin(A, " ");
            nf.captureMessage(G, Q)
        })
    }
    Cl0.CaptureConsole = jq9;
    Cl0.captureConsoleIntegration = Vl0
});