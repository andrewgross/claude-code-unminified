/* chunk:16 bytes:[253211, 272227) size:19016 source:unpacked-cli.js */
var xQ = E((Il1) => {
    Object.defineProperty(Il1, "__esModule", {
        value: !0
    });
    var Sg0 = vc1(),
        jg0 = _c1(),
        CW9 = pJ1(),
        KW9 = aJ1(),
        kg0 = hJ1(),
        YX1 = fl(),
        _f = lJ1(),
        yg0 = Pf(),
        HW9 = Sf0(),
        zW9 = xc1(),
        DB1 = e21(),
        _g0 = bc1(),
        e3 = sH(),
        QN = eq(),
        Gl1 = _l(),
        EW9 = fc1(),
        Fl1 = yJ1(),
        xg0 = l21(),
        vg0 = tJ1(),
        bg0 = mc1(),
        UW9 = Dh0(),
        fg0 = Yh0(),
        wW9 = Ch0(),
        $W9 = zh0(),
        qW9 = Uh0(),
        NW9 = vJ1(),
        WX1 = zO(),
        hg0 = kJ1(),
        LW9 = jJ1(),
        MW9 = cc1(),
        RW9 = qh0(),
        OW9 = uJ1(),
        TW9 = Mh0(),
        PW9 = Sc1(),
        SW9 = Oh0(),
        JX1 = ZV(),
        jW9 = xl(),
        kW9 = Sh0(),
        yW9 = yl(),
        gg0 = uh0(),
        ug0 = ih0(),
        mg0 = Ql1(),
        dg0 = Zl1(),
        cg0 = Dl1(),
        _W9 = Wg0(),
        xW9 = Pg0(),
        vW9 = _W9;
    Il1.addTracingExtensions = Sg0.addTracingExtensions;
    Il1.startIdleTransaction = Sg0.startIdleTransaction;
    Il1.IdleTransaction = jg0.IdleTransaction;
    Il1.TRACING_DEFAULTS = jg0.TRACING_DEFAULTS;
    Il1.Span = CW9.Span;
    Il1.Transaction = KW9.Transaction;
    Il1.extractTraceparentData = kg0.extractTraceparentData;
    Il1.getActiveTransaction = kg0.getActiveTransaction;
    Object.defineProperty(Il1, "SpanStatus", {
        enumerable: !0,
        get: () => YX1.SpanStatus
    });
    Il1.getSpanStatusFromHttpCode = YX1.getSpanStatusFromHttpCode;
    Il1.setHttpStatus = YX1.setHttpStatus;
    Il1.spanStatusfromHttpCode = YX1.spanStatusfromHttpCode;
    Il1.continueTrace = _f.continueTrace;
    Il1.getActiveSpan = _f.getActiveSpan;
    Il1.startActiveSpan = _f.startActiveSpan;
    Il1.startInactiveSpan = _f.startInactiveSpan;
    Il1.startSpan = _f.startSpan;
    Il1.startSpanManual = _f.startSpanManual;
    Il1.trace = _f.trace;
    Il1.getDynamicSamplingContextFromClient = yg0.getDynamicSamplingContextFromClient;
    Il1.getDynamicSamplingContextFromSpan = yg0.getDynamicSamplingContextFromSpan;
    Il1.setMeasurement = HW9.setMeasurement;
    Il1.isValidSampleRate = zW9.isValidSampleRate;
    Il1.SEMANTIC_ATTRIBUTE_PROFILE_ID = DB1.SEMANTIC_ATTRIBUTE_PROFILE_ID;
    Il1.SEMANTIC_ATTRIBUTE_SENTRY_OP = DB1.SEMANTIC_ATTRIBUTE_SENTRY_OP;
    Il1.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = DB1.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN;
    Il1.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = DB1.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE;
    Il1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = DB1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE;
    Il1.createEventEnvelope = _g0.createEventEnvelope;
    Il1.createSessionEnvelope = _g0.createSessionEnvelope;
    Il1.addBreadcrumb = e3.addBreadcrumb;
    Il1.captureCheckIn = e3.captureCheckIn;
    Il1.captureEvent = e3.captureEvent;
    Il1.captureException = e3.captureException;
    Il1.captureMessage = e3.captureMessage;
    Il1.captureSession = e3.captureSession;
    Il1.close = e3.close;
    Il1.configureScope = e3.configureScope;
    Il1.endSession = e3.endSession;
    Il1.flush = e3.flush;
    Il1.getClient = e3.getClient;
    Il1.getCurrentScope = e3.getCurrentScope;
    Il1.isInitialized = e3.isInitialized;
    Il1.lastEventId = e3.lastEventId;
    Il1.setContext = e3.setContext;
    Il1.setExtra = e3.setExtra;
    Il1.setExtras = e3.setExtras;
    Il1.setTag = e3.setTag;
    Il1.setTags = e3.setTags;
    Il1.setUser = e3.setUser;
    Il1.startSession = e3.startSession;
    Il1.startTransaction = e3.startTransaction;
    Il1.withActiveSpan = e3.withActiveSpan;
    Il1.withIsolationScope = e3.withIsolationScope;
    Il1.withMonitor = e3.withMonitor;
    Il1.withScope = e3.withScope;
    Il1.Hub = QN.Hub;
    Il1.ensureHubOnCarrier = QN.ensureHubOnCarrier;
    Il1.getCurrentHub = QN.getCurrentHub;
    Il1.getHubFromCarrier = QN.getHubFromCarrier;
    Il1.getIsolationScope = QN.getIsolationScope;
    Il1.getMainCarrier = QN.getMainCarrier;
    Il1.makeMain = QN.makeMain;
    Il1.runWithAsyncContext = QN.runWithAsyncContext;
    Il1.setAsyncContextStrategy = QN.setAsyncContextStrategy;
    Il1.setHubOnCarrier = QN.setHubOnCarrier;
    Il1.closeSession = Gl1.closeSession;
    Il1.makeSession = Gl1.makeSession;
    Il1.updateSession = Gl1.updateSession;
    Il1.SessionFlusher = EW9.SessionFlusher;
    Il1.Scope = Fl1.Scope;
    Il1.getGlobalScope = Fl1.getGlobalScope;
    Il1.setGlobalScope = Fl1.setGlobalScope;
    Il1.addGlobalEventProcessor = xg0.addGlobalEventProcessor;
    Il1.notifyEventProcessors = xg0.notifyEventProcessors;
    Il1.getEnvelopeEndpointWithUrlEncodedAuth = vg0.getEnvelopeEndpointWithUrlEncodedAuth;
    Il1.getReportDialogEndpoint = vg0.getReportDialogEndpoint;
    Il1.BaseClient = bg0.BaseClient;
    Il1.addEventProcessor = bg0.addEventProcessor;
    Il1.ServerRuntimeClient = UW9.ServerRuntimeClient;
    Il1.initAndBind = fg0.initAndBind;
    Il1.setCurrentClient = fg0.setCurrentClient;
    Il1.createTransport = wW9.createTransport;
    Il1.makeOfflineTransport = $W9.makeOfflineTransport;
    Il1.makeMultiplexedTransport = qW9.makeMultiplexedTransport;
    Il1.SDK_VERSION = NW9.SDK_VERSION;
    Il1.addIntegration = WX1.addIntegration;
    Il1.convertIntegrationFnToClass = WX1.convertIntegrationFnToClass;
    Il1.defineIntegration = WX1.defineIntegration;
    Il1.getIntegrationsToSetup = WX1.getIntegrationsToSetup;
    Il1.applyScopeDataToEvent = hg0.applyScopeDataToEvent;
    Il1.mergeScopeData = hg0.mergeScopeData;
    Il1.prepareEvent = LW9.prepareEvent;
    Il1.createCheckInEnvelope = MW9.createCheckInEnvelope;
    Il1.createSpanEnvelope = RW9.createSpanEnvelope;
    Il1.hasTracingEnabled = OW9.hasTracingEnabled;
    Il1.isSentryRequestUrl = TW9.isSentryRequestUrl;
    Il1.handleCallbackErrors = PW9.handleCallbackErrors;
    Il1.parameterize = SW9.parameterize;
    Il1.spanIsSampled = JX1.spanIsSampled;
    Il1.spanToJSON = JX1.spanToJSON;
    Il1.spanToTraceContext = JX1.spanToTraceContext;
    Il1.spanToTraceHeader = JX1.spanToTraceHeader;
    Il1.getRootSpan = jW9.getRootSpan;
    Il1.applySdkMetadata = kW9.applySdkMetadata;
    Il1.DEFAULT_ENVIRONMENT = yW9.DEFAULT_ENVIRONMENT;
    Il1.ModuleMetadata = gg0.ModuleMetadata;
    Il1.moduleMetadataIntegration = gg0.moduleMetadataIntegration;
    Il1.RequestData = ug0.RequestData;
    Il1.requestDataIntegration = ug0.requestDataIntegration;
    Il1.InboundFilters = mg0.InboundFilters;
    Il1.inboundFiltersIntegration = mg0.inboundFiltersIntegration;
    Il1.FunctionToString = dg0.FunctionToString;
    Il1.functionToStringIntegration = dg0.functionToStringIntegration;
    Il1.LinkedErrors = cg0.LinkedErrors;
    Il1.linkedErrorsIntegration = cg0.linkedErrorsIntegration;
    Il1.metrics = xW9.metrics;
    Il1.Integrations = vW9
});
var FV = E((lg0) => {
    Object.defineProperty(lg0, "__esModule", {
        value: !0
    });
    var pX9 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
    lg0.DEBUG_BUILD = pX9
});
var oj = E((ig0) => {
    var {
        _optionalChain: pg0
    } = UA();
    Object.defineProperty(ig0, "__esModule", {
        value: !0
    });

    function nX9(A) {
        let B = pg0([A, "call", (Z) => Z(), "access", (Z) => Z.getClient, "call", (Z) => Z(), "optionalAccess", (Z) => Z.getOptions, "call", (Z) => Z()]);
        return (pg0([B, "optionalAccess", (Z) => Z.instrumenter]) || "sentry") !== "sentry"
    }
    ig0.shouldDisableAutoInstrumentation = nX9
});
var og0 = E((rg0) => {
    var {
        _optionalChain: Qw
    } = UA();
    Object.defineProperty(rg0, "__esModule", {
        value: !0
    });
    var Yl1 = xQ(),
        IV = UA(),
        XX1 = FV(),
        sX9 = oj();
    class VX1 {
        static __initStatic() {
            this.id = "Express"
        }
        constructor(A = {}) {
            this.name = VX1.id, this._router = A.router || A.app, this._methods = (Array.isArray(A.methods) ? A.methods : []).concat("use")
        }
        setupOnce(A, B) {
            if (!this._router) {
                XX1.DEBUG_BUILD && IV.logger.error("ExpressIntegration is missing an Express instance");
                return
            }
            if (sX9.shouldDisableAutoInstrumentation(B)) {
                XX1.DEBUG_BUILD && IV.logger.log("Express Integration is skipped because of instrumenter configuration.");
                return
            }
            tX9(this._router, this._methods), eX9(this._router)
        }
    }
    VX1.__initStatic();

    function ng0(A, B) {
        let Q = A.length;
        switch (Q) {
            case 2:
                return function(Z, D) {
                    let G = D.__sentry_transaction;
                    if (G) {
                        let F = G.startChild({
                            description: A.name,
                            op: `middleware.express.${B}`,
                            origin: "auto.middleware.express"
                        });
                        D.once("finish", () => {
                            F.end()
                        })
                    }
                    return A.call(this, Z, D)
                };
            case 3:
                return function(Z, D, G) {
                    let F = D.__sentry_transaction,
                        I = Qw([F, "optionalAccess", (Y) => Y.startChild, "call", (Y) => Y({
                            description: A.name,
                            op: `middleware.express.${B}`,
                            origin: "auto.middleware.express"
                        })]);
                    A.call(this, Z, D, function(...Y) {
                        Qw([I, "optionalAccess", (W) => W.end, "call", (W) => W()]), G.call(this, ...Y)
                    })
                };
            case 4:
                return function(Z, D, G, F) {
                    let I = G.__sentry_transaction,
                        Y = Qw([I, "optionalAccess", (W) => W.startChild, "call", (W) => W({
                            description: A.name,
                            op: `middleware.express.${B}`,
                            origin: "auto.middleware.express"
                        })]);
                    A.call(this, Z, D, G, function(...W) {
                        Qw([Y, "optionalAccess", (J) => J.end, "call", (J) => J()]), F.call(this, ...W)
                    })
                };
            default:
                throw new Error(`Express middleware takes 2-4 arguments. Got: ${Q}`)
        }
    }

    function rX9(A, B) {
        return A.map((Q) => {
            if (typeof Q === "function") return ng0(Q, B);
            if (Array.isArray(Q)) return Q.map((Z) => {
                if (typeof Z === "function") return ng0(Z, B);
                return Z
            });
            return Q
        })
    }

    function oX9(A, B) {
        let Q = A[B];
        return A[B] = function(...Z) {
            return Q.call(this, ...rX9(Z, B))
        }, A
    }

    function tX9(A, B = []) {
        B.forEach((Q) => oX9(A, Q))
    }

    function eX9(A) {
        let B = "settings" in A;
        if (B && A._router === void 0 && A.lazyrouter) A.lazyrouter();
        let Q = B ? A._router : A;
        if (!Q) {
            XX1.DEBUG_BUILD && IV.logger.debug("Cannot instrument router for URL Parameterization (did not find a valid router)."), XX1.DEBUG_BUILD && IV.logger.debug("Routing instrumentation is currently only supported in Express 4.");
            return
        }
        let Z = Object.getPrototypeOf(Q),
            D = Z.process_params;
        Z.process_params = function G(F, I, Y, W, J) {
            if (!Y._reconstructedRoute) Y._reconstructedRoute = "";
            let {
                layerRoutePath: X,
                isRegex: V,
                isArray: C,
                numExtraSegments: K
            } = AV9(F);
            if (X || V || C) Y._hasParameters = !0;
            let H;
            if (X) H = X;
            else H = sg0(Y.originalUrl, Y._reconstructedRoute, F.path) || "";
            let z = H.split("/").filter((N) => N.length > 0 && (V || C || !N.includes("*"))).join("/");
            if (z && z.length > 0) Y._reconstructedRoute += `/${z}${V?"/":""}`;
            let $ = IV.getNumberOfUrlSegments(IV.stripUrlQueryAndFragment(Y.originalUrl || "")) + K,
                L = IV.getNumberOfUrlSegments(Y._reconstructedRoute);
            if ($ === L) {
                if (!Y._hasParameters) {
                    if (Y._reconstructedRoute !== Y.originalUrl) Y._reconstructedRoute = Y.originalUrl ? IV.stripUrlQueryAndFragment(Y.originalUrl) : Y.originalUrl
                }
                let N = W.__sentry_transaction,
                    R = N && Yl1.spanToJSON(N).data || {};
                if (N && R[Yl1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] !== "custom") {
                    let O = Y._reconstructedRoute || "/",
                        [P, j] = IV.extractPathForTransaction(Y, {
                            path: !0,
                            method: !0,
                            customRoute: O
                        });
                    N.updateName(P), N.setAttribute(Yl1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, j)
                }
            }
            return D.call(this, F, I, Y, W, J)
        }
    }
    var ag0 = (A, B, Q) => {
        if (!A || !B || !Q || Object.keys(Q).length === 0 || Qw([Q, "access", (W) => W[0], "optionalAccess", (W) => W.offset]) === void 0 || Qw([Q, "access", (W) => W[0], "optionalAccess", (W) => W.offset]) === null) return;
        let Z = Q.sort((W, J) => W.offset - J.offset),
            G = new RegExp(B, `${B.flags}d`).exec(A);
        if (!G || !G.indices) return;
        let [, ...F] = G.indices;
        if (F.length !== Z.length) return;
        let I = A,
            Y = 0;
        return F.forEach((W, J) => {
            if (W) {
                let [X, V] = W, C = I.substring(0, X - Y), K = `:${Z[J].name}`, H = I.substring(V - Y);
                I = C + K + H, Y = Y + (V - X - K.length)
            }
        }), I
    };

    function AV9(A) {
        let B = Qw([A, "access", (F) => F.route, "optionalAccess", (F) => F.path]),
            Q = IV.isRegExp(B),
            Z = Array.isArray(B);
        if (!B) {
            let [F] = IV.GLOBAL_OBJ.process.versions.node.split(".").map(Number);
            if (F >= 16) B = ag0(A.path, A.regexp, A.keys)
        }
        if (!B) return {
            isRegex: Q,
            isArray: Z,
            numExtraSegments: 0
        };
        let D = Z ? Math.max(BV9(B) - IV.getNumberOfUrlSegments(A.path || ""), 0) : 0;
        return {
            layerRoutePath: QV9(Z, B),
            isRegex: Q,
            isArray: Z,
            numExtraSegments: D
        }
    }

    function BV9(A) {
        return A.reduce((B, Q) => {
            return B + IV.getNumberOfUrlSegments(Q.toString())
        }, 0)
    }

    function QV9(A, B) {
        if (A) return B.map((Q) => Q.toString()).join(",");
        return B && B.toString()
    }

    function sg0(A, B, Q) {
        let Z = IV.stripUrlQueryAndFragment(A || ""),
            D = Qw([Z, "optionalAccess", (Y) => Y.split, "call", (Y) => Y("/"), "access", (Y) => Y.filter, "call", (Y) => Y((W) => !!W)]),
            G = 0,
            F = Qw([B, "optionalAccess", (Y) => Y.split, "call", (Y) => Y("/"), "access", (Y) => Y.filter, "call", (Y) => Y((W) => !!W), "access", (Y) => Y.length]) || 0;
        return Qw([Q, "optionalAccess", (Y) => Y.split, "call", (Y) => Y("/"), "access", (Y) => Y.filter, "call", (Y) => Y((W) => {
            if (Qw([D, "optionalAccess", (J) => J[F + G]]) === W) return G += 1, !0;
            return !1
        }), "access", (Y) => Y.join, "call", (Y) => Y("/")])
    }
    rg0.Express = VX1;
    rg0.extractOriginalRoute = ag0;
    rg0.preventDuplicateSegments = sg0
});
var eg0 = E((tg0) => {
    var {
        _optionalChain: ll
    } = UA();
    Object.defineProperty(tg0, "__esModule", {
        value: !0
    });
    var pl = UA(),
        Wl1 = FV(),
        FV9 = oj();
    class CX1 {
        static __initStatic() {
            this.id = "Postgres"
        }
        constructor(A = {}) {
            this.name = CX1.id, this._usePgNative = !!A.usePgNative, this._module = A.module
        }
        loadDependency() {
            return this._module = this._module || pl.loadModule("pg")
        }
        setupOnce(A, B) {
            if (FV9.shouldDisableAutoInstrumentation(B)) {
                Wl1.DEBUG_BUILD && pl.logger.log("Postgres Integration is skipped because of instrumenter configuration.");
                return
            }
            let Q = this.loadDependency();
            if (!Q) {
                Wl1.DEBUG_BUILD && pl.logger.error("Postgres Integration was unable to require `pg` package.");
                return
            }
            let Z = this._usePgNative ? ll([Q, "access", (D) => D.native, "optionalAccess", (D) => D.Client]) : Q.Client;
            if (!Z) {
                Wl1.DEBUG_BUILD && pl.logger.error("Postgres Integration was unable to access 'pg-native' bindings.");
                return
            }
            pl.fill(Z.prototype, "query", function(D) {
                return function(G, F, I) {
                    let W = B().getScope().getSpan(),
                        J = {
                            "db.system": "postgresql"
                        };
                    try {
                        if (this.database) J["db.name"] = this.database;
                        if (this.host) J["server.address"] = this.host;
                        if (this.port) J["server.port"] = this.port;
                        if (this.user) J["db.user"] = this.user
                    } catch (C) {}
                    let X = ll([W, "optionalAccess", (C) => C.startChild, "call", (C) => C({
                        description: typeof G === "string" ? G : G.text,
                        op: "db",
                        origin: "auto.db.postgres",
                        data: J
                    })]);
                    if (typeof I === "function") return D.call(this, G, F, function(C, K) {
                        ll([X, "optionalAccess", (H) => H.end, "call", (H) => H()]), I(C, K)
                    });
                    if (typeof F === "function") return D.call(this, G, function(C, K) {
                        ll([X, "optionalAccess", (H) => H.end, "call", (H) => H()]), F(C, K)
                    });
                    let V = typeof F !== "undefined" ? D.call(this, G, F) : D.call(this, G);
                    if (pl.isThenable(V)) return V.then((C) => {
                        return ll([X, "optionalAccess", (K) => K.end, "call", (K) => K()]), C
                    });
                    return ll([X, "optionalAccess", (C) => C.end, "call", (C) => C()]), V
                }
            })
        }
    }
    CX1.__initStatic();
    tg0.Postgres = CX1
});