/* chunk:31 bytes:[746132, 756758) size:10626 source:unpacked-cli.js */
var bp0 = E((vp0) => {
    Object.defineProperty(vp0, "__esModule", {
        value: !0
    });
    var yp0 = xQ(),
        _p0 = QV1(),
        xp0 = "Automatic instrumentation of CronJob only supports crontab string";

    function zL9(A, B) {
        let Q = !1;
        return new Proxy(A, {
            construct(Z, D) {
                let [G, F, I, Y, W, ...J] = D;
                if (typeof G !== "string") throw new Error(xp0);
                if (Q) throw new Error(`A job named '${B}' has already been scheduled`);
                Q = !0;
                let X = _p0.replaceCronNames(G);

                function V(C, K) {
                    return yp0.withMonitor(B, () => {
                        return F(C, K)
                    }, {
                        schedule: {
                            type: "crontab",
                            value: X
                        },
                        timezone: W || void 0
                    })
                }
                return new Z(G, V, I, Y, W, ...J)
            },
            get(Z, D) {
                if (D === "from") return (G) => {
                    let {
                        cronTime: F,
                        onTick: I,
                        timeZone: Y
                    } = G;
                    if (typeof F !== "string") throw new Error(xp0);
                    if (Q) throw new Error(`A job named '${B}' has already been scheduled`);
                    Q = !0;
                    let W = _p0.replaceCronNames(F);
                    return G.onTick = (J, X) => {
                        return yp0.withMonitor(B, () => {
                            return I(J, X)
                        }, {
                            schedule: {
                                type: "crontab",
                                value: W
                            },
                            timezone: Y || void 0
                        })
                    }, Z.from(G)
                };
                else return Z[D]
            }
        })
    }
    vp0.instrumentCron = zL9
});
var gp0 = E((hp0) => {
    var {
        _optionalChain: fp0
    } = UA();
    Object.defineProperty(hp0, "__esModule", {
        value: !0
    });
    var UL9 = xQ(),
        wL9 = QV1();

    function $L9(A) {
        return new Proxy(A, {
            get(B, Q) {
                if (Q === "schedule" && B.schedule) return new Proxy(B.schedule, {
                    apply(Z, D, G) {
                        let [F, , I] = G;
                        if (!fp0([I, "optionalAccess", (Y) => Y.name])) throw new Error('Missing "name" for scheduled job. A name is required for Sentry check-in monitoring.');
                        return UL9.withMonitor(I.name, () => {
                            return Z.apply(D, G)
                        }, {
                            schedule: {
                                type: "crontab",
                                value: wL9.replaceCronNames(F)
                            },
                            timezone: fp0([I, "optionalAccess", (Y) => Y.timezone])
                        })
                    }
                });
                else return B[Q]
            }
        })
    }
    hp0.instrumentNodeCron = $L9
});
var mp0 = E((up0) => {
    Object.defineProperty(up0, "__esModule", {
        value: !0
    });
    var NL9 = xQ(),
        LL9 = QV1();

    function ML9(A) {
        return new Proxy(A, {
            get(B, Q) {
                if (Q === "scheduleJob") return new Proxy(B.scheduleJob, {
                    apply(Z, D, G) {
                        let [F, I] = G;
                        if (typeof F !== "string" || typeof I !== "string") throw new Error("Automatic instrumentation of 'node-schedule' requires the first parameter of 'scheduleJob' to be a job name string and the second parameter to be a crontab string");
                        let Y = F,
                            W = I;
                        return NL9.withMonitor(Y, () => {
                            return Z.apply(D, G)
                        }, {
                            schedule: {
                                type: "crontab",
                                value: LL9.replaceCronNames(W)
                            }
                        })
                    }
                });
                return B[Q]
            }
        })
    }
    up0.instrumentNodeSchedule = ML9
});
var Bp1 = E((ip0) => {
    Object.defineProperty(ip0, "__esModule", {
        value: !0
    });
    var cB = xQ(),
        OL9 = nm0(),
        TL9 = Sl1(),
        PL9 = yl1(),
        RB1 = pl1(),
        Ap1 = UA(),
        SL9 = bc0(),
        dp0 = ll1(),
        jL9 = lc0(),
        kL9 = ec0(),
        yL9 = Yl0(),
        _L9 = Jl0(),
        Dk = jp0(),
        xL9 = _X1(),
        vL9 = lX1(),
        bL9 = iX1(),
        fL9 = mX1(),
        hL9 = bX1(),
        gL9 = xX1(),
        uL9 = uX1(),
        mL9 = nX1(),
        dL9 = tX1(),
        cp0 = rl1(),
        lp0 = sX1(),
        pp0 = fX1(),
        cL9 = sl1(),
        lL9 = bp0(),
        pL9 = gp0(),
        iL9 = mp0(),
        nL9 = dp0.createGetModuleFromFilename(),
        aL9 = {
            ...cB.Integrations,
            ...yL9,
            ..._L9
        },
        sL9 = {
            instrumentCron: lL9.instrumentCron,
            instrumentNodeCron: pL9.instrumentNodeCron,
            instrumentNodeSchedule: iL9.instrumentNodeSchedule
        };
    ip0.Hub = cB.Hub;
    ip0.SDK_VERSION = cB.SDK_VERSION;
    ip0.SEMANTIC_ATTRIBUTE_SENTRY_OP = cB.SEMANTIC_ATTRIBUTE_SENTRY_OP;
    ip0.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = cB.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN;
    ip0.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = cB.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE;
    ip0.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = cB.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE;
    ip0.Scope = cB.Scope;
    ip0.addBreadcrumb = cB.addBreadcrumb;
    ip0.addEventProcessor = cB.addEventProcessor;
    ip0.addGlobalEventProcessor = cB.addGlobalEventProcessor;
    ip0.addIntegration = cB.addIntegration;
    ip0.captureCheckIn = cB.captureCheckIn;
    ip0.captureEvent = cB.captureEvent;
    ip0.captureException = cB.captureException;
    ip0.captureMessage = cB.captureMessage;
    ip0.captureSession = cB.captureSession;
    ip0.close = cB.close;
    ip0.configureScope = cB.configureScope;
    ip0.continueTrace = cB.continueTrace;
    ip0.createTransport = cB.createTransport;
    ip0.endSession = cB.endSession;
    ip0.extractTraceparentData = cB.extractTraceparentData;
    ip0.flush = cB.flush;
    ip0.functionToStringIntegration = cB.functionToStringIntegration;
    ip0.getActiveSpan = cB.getActiveSpan;
    ip0.getActiveTransaction = cB.getActiveTransaction;
    ip0.getClient = cB.getClient;
    ip0.getCurrentHub = cB.getCurrentHub;
    ip0.getCurrentScope = cB.getCurrentScope;
    ip0.getGlobalScope = cB.getGlobalScope;
    ip0.getHubFromCarrier = cB.getHubFromCarrier;
    ip0.getIsolationScope = cB.getIsolationScope;
    ip0.getSpanStatusFromHttpCode = cB.getSpanStatusFromHttpCode;
    ip0.inboundFiltersIntegration = cB.inboundFiltersIntegration;
    ip0.isInitialized = cB.isInitialized;
    ip0.lastEventId = cB.lastEventId;
    ip0.linkedErrorsIntegration = cB.linkedErrorsIntegration;
    ip0.makeMain = cB.makeMain;
    ip0.metrics = cB.metrics;
    ip0.parameterize = cB.parameterize;
    ip0.requestDataIntegration = cB.requestDataIntegration;
    ip0.runWithAsyncContext = cB.runWithAsyncContext;
    ip0.setContext = cB.setContext;
    ip0.setCurrentClient = cB.setCurrentClient;
    ip0.setExtra = cB.setExtra;
    ip0.setExtras = cB.setExtras;
    ip0.setHttpStatus = cB.setHttpStatus;
    ip0.setMeasurement = cB.setMeasurement;
    ip0.setTag = cB.setTag;
    ip0.setTags = cB.setTags;
    ip0.setUser = cB.setUser;
    ip0.spanStatusfromHttpCode = cB.spanStatusfromHttpCode;
    ip0.startActiveSpan = cB.startActiveSpan;
    ip0.startInactiveSpan = cB.startInactiveSpan;
    ip0.startSession = cB.startSession;
    ip0.startSpan = cB.startSpan;
    ip0.startSpanManual = cB.startSpanManual;
    ip0.startTransaction = cB.startTransaction;
    ip0.trace = cB.trace;
    ip0.withActiveSpan = cB.withActiveSpan;
    ip0.withIsolationScope = cB.withIsolationScope;
    ip0.withMonitor = cB.withMonitor;
    ip0.withScope = cB.withScope;
    ip0.autoDiscoverNodePerformanceMonitoringIntegrations = OL9.autoDiscoverNodePerformanceMonitoringIntegrations;
    ip0.NodeClient = TL9.NodeClient;
    ip0.makeNodeTransport = PL9.makeNodeTransport;
    ip0.defaultIntegrations = RB1.defaultIntegrations;
    ip0.defaultStackParser = RB1.defaultStackParser;
    ip0.getDefaultIntegrations = RB1.getDefaultIntegrations;
    ip0.getSentryRelease = RB1.getSentryRelease;
    ip0.init = RB1.init;
    ip0.DEFAULT_USER_INCLUDES = Ap1.DEFAULT_USER_INCLUDES;
    ip0.addRequestDataToEvent = Ap1.addRequestDataToEvent;
    ip0.extractRequestData = Ap1.extractRequestData;
    ip0.deepReadDirSync = SL9.deepReadDirSync;
    ip0.createGetModuleFromFilename = dp0.createGetModuleFromFilename;
    ip0.enableAnrDetection = jL9.enableAnrDetection;
    ip0.Handlers = kL9;
    ip0.captureConsoleIntegration = Dk.captureConsoleIntegration;
    ip0.debugIntegration = Dk.debugIntegration;
    ip0.dedupeIntegration = Dk.dedupeIntegration;
    ip0.extraErrorDataIntegration = Dk.extraErrorDataIntegration;
    ip0.httpClientIntegration = Dk.httpClientIntegration;
    ip0.reportingObserverIntegration = Dk.reportingObserverIntegration;
    ip0.rewriteFramesIntegration = Dk.rewriteFramesIntegration;
    ip0.sessionTimingIntegration = Dk.sessionTimingIntegration;
    ip0.consoleIntegration = xL9.consoleIntegration;
    ip0.onUncaughtExceptionIntegration = vL9.onUncaughtExceptionIntegration;
    ip0.onUnhandledRejectionIntegration = bL9.onUnhandledRejectionIntegration;
    ip0.modulesIntegration = fL9.modulesIntegration;
    ip0.contextLinesIntegration = hL9.contextLinesIntegration;
    ip0.nodeContextIntegration = gL9.nodeContextIntegration;
    ip0.localVariablesIntegration = uL9.localVariablesIntegration;
    ip0.spotlightIntegration = mL9.spotlightIntegration;
    ip0.anrIntegration = dL9.anrIntegration;
    ip0.hapiErrorPlugin = cp0.hapiErrorPlugin;
    ip0.hapiIntegration = cp0.hapiIntegration;
    ip0.Undici = lp0.Undici;
    ip0.nativeNodeFetchintegration = lp0.nativeNodeFetchintegration;
    ip0.Http = pp0.Http;
    ip0.httpIntegration = pp0.httpIntegration;
    ip0.trpcMiddleware = cL9.trpcMiddleware;
    ip0.Integrations = aL9;
    ip0.cron = sL9;
    ip0.getModuleFromFilename = nL9
});