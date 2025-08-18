/* chunk:21 bytes:[346224, 365526) size:19302 source:unpacked-cli.js */
var fm0 = E((bm0) => {
    Object.defineProperty(bm0, "__esModule", {
        value: !0
    });
    var cD = xQ(),
        rH = UA(),
        Bk = FV(),
        UH9 = Kl1(),
        jm0 = ol(),
        zB1 = Nl1(),
        ym0 = PX1(),
        lC = dC(),
        _m0 = "BrowserTracing",
        wH9 = {
            ...cD.TRACING_DEFAULTS,
            instrumentNavigation: !0,
            instrumentPageLoad: !0,
            markBackgroundSpan: !0,
            enableLongTask: !0,
            enableInp: !1,
            interactionsSampleRate: 1,
            _experiments: {},
            ...ym0.defaultRequestInstrumentationOptions
        },
        $H9 = (A = {}) => {
            let B = Bk.DEBUG_BUILD ? !!(A.tracePropagationTargets || A.tracingOrigins) : !1;
            if (cD.addTracingExtensions(), !A.tracePropagationTargets && A.tracingOrigins) A.tracePropagationTargets = A.tracingOrigins;
            let Q = {
                    ...wH9,
                    ...A
                },
                Z = zB1.startTrackingWebVitals(),
                D = {};
            if (Q.enableInp) zB1.startTrackingINP(D, Q.interactionsSampleRate);
            if (Q.enableLongTask) zB1.startTrackingLongTasks();
            if (Q._experiments.enableInteractions) zB1.startTrackingInteractions();
            let G = {
                name: void 0,
                context: void 0
            };

            function F(I) {
                let Y = cD.getCurrentHub(),
                    {
                        beforeStartSpan: W,
                        idleTimeout: J,
                        finalTimeout: X,
                        heartbeatInterval: V
                    } = Q,
                    C = I.op === "pageload",
                    K;
                if (C) {
                    let L = C ? Ol1("sentry-trace") : "",
                        N = C ? Ol1("baggage") : void 0,
                        {
                            traceId: R,
                            dsc: O,
                            parentSpanId: P,
                            sampled: j
                        } = rH.propagationContextFromHeaders(L, N);
                    K = {
                        traceId: R,
                        parentSpanId: P,
                        parentSampled: j,
                        ...I,
                        metadata: {
                            ...I.metadata,
                            dynamicSamplingContext: O
                        },
                        trimEnd: !0
                    }
                } else K = {
                    trimEnd: !0,
                    ...I
                };
                let H = W ? W(K) : K;
                if (H.metadata = H.name !== K.name ? {
                        ...H.metadata,
                        source: "custom"
                    } : H.metadata, G.name = H.name, G.context = H, H.sampled === !1) Bk.DEBUG_BUILD && rH.logger.log(`[Tracing] Will not send ${H.op} transaction because of beforeNavigate.`);
                Bk.DEBUG_BUILD && rH.logger.log(`[Tracing] Starting ${H.op} transaction on scope`);
                let {
                    location: z
                } = lC.WINDOW, $ = cD.startIdleTransaction(Y, H, J, X, !0, {
                    location: z
                }, V, C);
                if (C && lC.WINDOW.document) {
                    if (lC.WINDOW.document.addEventListener("readystatechange", () => {
                            if (["interactive", "complete"].includes(lC.WINDOW.document.readyState)) $.sendAutoFinishSignal()
                        }), ["interactive", "complete"].includes(lC.WINDOW.document.readyState)) $.sendAutoFinishSignal()
                }
                return $.registerBeforeFinishCallback((L) => {
                    Z(), zB1.addPerformanceEntries(L)
                }), $
            }
            return {
                name: _m0,
                setupOnce: () => {},
                afterAllSetup(I) {
                    let Y = I.getOptions(),
                        {
                            markBackgroundSpan: W,
                            traceFetch: J,
                            traceXHR: X,
                            shouldCreateSpanForRequest: V,
                            enableHTTPTimings: C,
                            _experiments: K
                        } = Q,
                        H = Y && Y.tracePropagationTargets,
                        z = H || Q.tracePropagationTargets;
                    if (Bk.DEBUG_BUILD && B && H) rH.logger.warn("[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used.");
                    let $, L = lC.WINDOW.location && lC.WINDOW.location.href;
                    if (I.on) I.on("startNavigationSpan", (N) => {
                        if ($) Bk.DEBUG_BUILD && rH.logger.log(`[Tracing] Finishing current transaction with op: ${cD.spanToJSON($).op}`), $.end();
                        $ = F({
                            op: "navigation",
                            ...N
                        })
                    }), I.on("startPageLoadSpan", (N) => {
                        if ($) Bk.DEBUG_BUILD && rH.logger.log(`[Tracing] Finishing current transaction with op: ${cD.spanToJSON($).op}`), $.end();
                        $ = F({
                            op: "pageload",
                            ...N
                        })
                    });
                    if (Q.instrumentPageLoad && I.emit && lC.WINDOW.location) {
                        let N = {
                            name: lC.WINDOW.location.pathname,
                            startTimestamp: rH.browserPerformanceTimeOrigin ? rH.browserPerformanceTimeOrigin / 1000 : void 0,
                            origin: "auto.pageload.browser",
                            attributes: {
                                [cD.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
                            }
                        };
                        xm0(I, N)
                    }
                    if (Q.instrumentNavigation && I.emit && lC.WINDOW.location) rH.addHistoryInstrumentationHandler(({
                        to: N,
                        from: R
                    }) => {
                        if (R === void 0 && L && L.indexOf(N) !== -1) {
                            L = void 0;
                            return
                        }
                        if (R !== N) {
                            L = void 0;
                            let O = {
                                name: lC.WINDOW.location.pathname,
                                origin: "auto.navigation.browser",
                                attributes: {
                                    [cD.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
                                }
                            };
                            vm0(I, O)
                        }
                    });
                    if (W) UH9.registerBackgroundTabDetection();
                    if (K.enableInteractions) qH9(Q, G);
                    if (Q.enableInp) LH9(D, G);
                    ym0.instrumentOutgoingRequests({
                        traceFetch: J,
                        traceXHR: X,
                        tracePropagationTargets: z,
                        shouldCreateSpanForRequest: V,
                        enableHTTPTimings: C
                    })
                },
                options: Q
            }
        };

    function xm0(A, B) {
        if (!A.emit) return;
        A.emit("startPageLoadSpan", B);
        let Q = cD.getActiveSpan();
        return (Q && cD.spanToJSON(Q).op) === "pageload" ? Q : void 0
    }

    function vm0(A, B) {
        if (!A.emit) return;
        A.emit("startNavigationSpan", B);
        let Q = cD.getActiveSpan();
        return (Q && cD.spanToJSON(Q).op) === "navigation" ? Q : void 0
    }

    function Ol1(A) {
        let B = rH.getDomElement(`meta[name=${A}]`);
        return B ? B.getAttribute("content") : void 0
    }

    function qH9(A, B) {
        let Q, Z = () => {
            let {
                idleTimeout: D,
                finalTimeout: G,
                heartbeatInterval: F
            } = A, I = "ui.action.click", Y = cD.getActiveTransaction();
            if (Y && Y.op && ["navigation", "pageload"].includes(Y.op)) {
                Bk.DEBUG_BUILD && rH.logger.warn("[Tracing] Did not create ui.action.click transaction because a pageload or navigation transaction is in progress.");
                return
            }
            if (Q) Q.setFinishReason("interactionInterrupted"), Q.end(), Q = void 0;
            if (!B.name) {
                Bk.DEBUG_BUILD && rH.logger.warn("[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing.");
                return
            }
            let {
                location: W
            } = lC.WINDOW, J = {
                name: B.name,
                op: "ui.action.click",
                trimEnd: !0,
                data: {
                    [cD.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: B.context ? MH9(B.context) : "url"
                }
            };
            Q = cD.startIdleTransaction(cD.getCurrentHub(), J, D, G, !0, {
                location: W
            }, F)
        };
        ["click"].forEach((D) => {
            if (lC.WINDOW.document) addEventListener(D, Z, {
                once: !1,
                capture: !0
            })
        })
    }

    function NH9(A) {
        return "duration" in A
    }
    var km0 = 10;

    function LH9(A, B) {
        let Q = ({
            entries: Z
        }) => {
            let D = cD.getClient(),
                G = D !== void 0 && D.getIntegrationByName !== void 0 ? D.getIntegrationByName("Replay") : void 0,
                F = G !== void 0 ? G.getReplayId() : void 0,
                I = cD.getActiveTransaction(),
                Y = cD.getCurrentScope(),
                W = Y !== void 0 ? Y.getUser() : void 0;
            Z.forEach((J) => {
                if (NH9(J)) {
                    let X = J.interactionId;
                    if (X === void 0) return;
                    let V = A[X],
                        C = J.duration,
                        K = J.startTime,
                        H = Object.keys(A),
                        z = H.length > 0 ? H.reduce(($, L) => {
                            return A[$].duration < A[L].duration ? $ : L
                        }) : void 0;
                    if (J.entryType === "first-input") {
                        if (H.map((L) => A[L]).some((L) => {
                                return L.duration === C && L.startTime === K
                            })) return
                    }
                    if (!X) return;
                    if (V) V.duration = Math.max(V.duration, C);
                    else if (H.length < km0 || z === void 0 || C > A[z].duration) {
                        let {
                            name: $,
                            context: L
                        } = B;
                        if ($ && L) {
                            if (z && Object.keys(A).length >= km0) delete A[z];
                            A[X] = {
                                routeName: $,
                                duration: C,
                                parentContext: L,
                                user: W,
                                activeTransaction: I,
                                replayId: F,
                                startTime: K
                            }
                        }
                    }
                }
            })
        };
        jm0.addPerformanceInstrumentationHandler("event", Q), jm0.addPerformanceInstrumentationHandler("first-input", Q)
    }

    function MH9(A) {
        let B = A.attributes && A.attributes[cD.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
            Q = A.data && A.data[cD.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
            Z = A.metadata && A.metadata.source;
        return B || Q || Z
    }
    bm0.BROWSER_TRACING_INTEGRATION_ID = _m0;
    bm0.browserTracingIntegration = $H9;
    bm0.getMetaContent = Ol1;
    bm0.startBrowserTracingNavigationSpan = vm0;
    bm0.startBrowserTracingPageLoadSpan = xm0
});
var um0 = E((gm0, EB1) => {
    Object.defineProperty(gm0, "__esModule", {
        value: !0
    });
    var hm0 = xQ(),
        tl = UA();

    function jH9() {
        let A = hm0.getMainCarrier();
        if (!A.__SENTRY__) return;
        let B = {
                mongodb() {
                    return new(tl.dynamicRequire(EB1, "./node/integrations/mongo")).Mongo
                },
                mongoose() {
                    return new(tl.dynamicRequire(EB1, "./node/integrations/mongo")).Mongo
                },
                mysql() {
                    return new(tl.dynamicRequire(EB1, "./node/integrations/mysql")).Mysql
                },
                pg() {
                    return new(tl.dynamicRequire(EB1, "./node/integrations/postgres")).Postgres
                }
            },
            Q = Object.keys(B).filter((Z) => !!tl.loadModule(Z)).map((Z) => {
                try {
                    return B[Z]()
                } catch (D) {
                    return
                }
            }).filter((Z) => Z);
        if (Q.length > 0) A.__SENTRY__.integrations = [...A.__SENTRY__.integrations || [], ...Q]
    }

    function kH9() {
        if (hm0.addTracingExtensions(), tl.isNodeEnv()) jH9()
    }
    gm0.addExtensionMethods = kH9
});
var Pl1 = E((pm0) => {
    Object.defineProperty(pm0, "__esModule", {
        value: !0
    });
    var LO = xQ(),
        mm0 = UA(),
        _H9 = og0(),
        xH9 = eg0(),
        vH9 = Bu0(),
        bH9 = Du0(),
        fH9 = Iu0(),
        hH9 = Ju0(),
        gH9 = Cu0(),
        uH9 = Hu0(),
        dm0 = Sm0(),
        Tl1 = fm0(),
        cm0 = PX1(),
        SX1 = ol(),
        lm0 = Ll1(),
        mH9 = um0();
    pm0.IdleTransaction = LO.IdleTransaction;
    pm0.Span = LO.Span;
    pm0.SpanStatus = LO.SpanStatus;
    pm0.Transaction = LO.Transaction;
    pm0.extractTraceparentData = LO.extractTraceparentData;
    pm0.getActiveTransaction = LO.getActiveTransaction;
    pm0.hasTracingEnabled = LO.hasTracingEnabled;
    pm0.spanStatusfromHttpCode = LO.spanStatusfromHttpCode;
    pm0.startIdleTransaction = LO.startIdleTransaction;
    pm0.TRACEPARENT_REGEXP = mm0.TRACEPARENT_REGEXP;
    pm0.stripUrlQueryAndFragment = mm0.stripUrlQueryAndFragment;
    pm0.Express = _H9.Express;
    pm0.Postgres = xH9.Postgres;
    pm0.Mysql = vH9.Mysql;
    pm0.Mongo = bH9.Mongo;
    pm0.Prisma = fH9.Prisma;
    pm0.GraphQL = hH9.GraphQL;
    pm0.Apollo = gH9.Apollo;
    pm0.lazyLoadedNodePerformanceMonitoringIntegrations = uH9.lazyLoadedNodePerformanceMonitoringIntegrations;
    pm0.BROWSER_TRACING_INTEGRATION_ID = dm0.BROWSER_TRACING_INTEGRATION_ID;
    pm0.BrowserTracing = dm0.BrowserTracing;
    pm0.browserTracingIntegration = Tl1.browserTracingIntegration;
    pm0.startBrowserTracingNavigationSpan = Tl1.startBrowserTracingNavigationSpan;
    pm0.startBrowserTracingPageLoadSpan = Tl1.startBrowserTracingPageLoadSpan;
    pm0.defaultRequestInstrumentationOptions = cm0.defaultRequestInstrumentationOptions;
    pm0.instrumentOutgoingRequests = cm0.instrumentOutgoingRequests;
    pm0.addClsInstrumentationHandler = SX1.addClsInstrumentationHandler;
    pm0.addFidInstrumentationHandler = SX1.addFidInstrumentationHandler;
    pm0.addLcpInstrumentationHandler = SX1.addLcpInstrumentationHandler;
    pm0.addPerformanceInstrumentationHandler = SX1.addPerformanceInstrumentationHandler;
    pm0.addTracingHeadersToFetchRequest = lm0.addTracingHeadersToFetchRequest;
    pm0.instrumentFetchRequest = lm0.instrumentFetchRequest;
    pm0.addExtensionMethods = mH9.addExtensionMethods
});
var nm0 = E((im0) => {
    Object.defineProperty(im0, "__esModule", {
        value: !0
    });
    var qz9 = Pl1(),
        Nz9 = UA();

    function Lz9() {
        let A = qz9.lazyLoadedNodePerformanceMonitoringIntegrations.map((B) => {
            try {
                return B()
            } catch (Q) {
                return
            }
        }).filter((B) => !!B);
        if (A.length === 0) Nz9.logger.warn("Performance monitoring integrations could not be automatically loaded.");
        return A.filter((B) => !!B.loadDependency())
    }
    im0.autoDiscoverNodePerformanceMonitoringIntegrations = Lz9
});
var Sl1 = E((rm0) => {
    Object.defineProperty(rm0, "__esModule", {
        value: !0
    });
    var Rz9 = W1("os"),
        Oz9 = W1("util"),
        am0 = xQ();
    class sm0 extends am0.ServerRuntimeClient {
        constructor(A) {
            am0.applySdkMetadata(A, "node"), A.transportOptions = {
                textEncoder: new Oz9.TextEncoder,
                ...A.transportOptions
            };
            let B = {
                ...A,
                platform: "node",
                runtime: {
                    name: "node",
                    version: global.process.version
                },
                serverName: A.serverName || global.process.env.SENTRY_NAME || Rz9.hostname()
            };
            super(B)
        }
    }
    rm0.NodeClient = sm0
});
var Bd0 = E((Ad0) => {
    var {
        _nullishCoalesce: om0
    } = UA();
    Object.defineProperty(Ad0, "__esModule", {
        value: !0
    });
    var tm0 = W1("http");
    W1("https");
    var FN = Symbol("AgentBaseInternalState");
    class em0 extends tm0.Agent {
        constructor(A) {
            super(A);
            this[FN] = {}
        }
        isSecureEndpoint(A) {
            if (A) {
                if (typeof A.secureEndpoint === "boolean") return A.secureEndpoint;
                if (typeof A.protocol === "string") return A.protocol === "https:"
            }
            let {
                stack: B
            } = new Error;
            if (typeof B !== "string") return !1;
            return B.split(`
`).some((Q) => Q.indexOf("(https.js:") !== -1 || Q.indexOf("node:https:") !== -1)
        }
        createSocket(A, B, Q) {
            let Z = {
                ...B,
                secureEndpoint: this.isSecureEndpoint(B)
            };
            Promise.resolve().then(() => this.connect(A, Z)).then((D) => {
                if (D instanceof tm0.Agent) return D.addRequest(A, Z);
                this[FN].currentSocket = D, super.createSocket(A, B, Q)
            }, Q)
        }
        createConnection() {
            let A = this[FN].currentSocket;
            if (this[FN].currentSocket = void 0, !A) throw new Error("No socket was returned in the `connect()` function");
            return A
        }
        get defaultPort() {
            return om0(this[FN].defaultPort, () => this.protocol === "https:" ? 443 : 80)
        }
        set defaultPort(A) {
            if (this[FN]) this[FN].defaultPort = A
        }
        get protocol() {
            return om0(this[FN].protocol, () => this.isSecureEndpoint() ? "https:" : "http:")
        }
        set protocol(A) {
            if (this[FN]) this[FN].protocol = A
        }
    }
    Ad0.Agent = em0
});