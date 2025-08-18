/* chunk:15 bytes:[239022, 253210) size:14188 source:unpacked-cli.js */
var ih0 = E((ph0) => {
    Object.defineProperty(ph0, "__esModule", {
        value: !0
    });
    var mh0 = UA(),
        dh0 = zO(),
        XY9 = ZV(),
        Bl1 = {
            include: {
                cookies: !0,
                data: !0,
                headers: !0,
                ip: !1,
                query_string: !0,
                url: !0,
                user: {
                    id: !0,
                    username: !0,
                    email: !0
                }
            },
            transactionNamingScheme: "methodPath"
        },
        ch0 = "RequestData",
        VY9 = (A = {}) => {
            let B = mh0.addRequestDataToEvent,
                Q = {
                    ...Bl1,
                    ...A,
                    include: {
                        method: !0,
                        ...Bl1.include,
                        ...A.include,
                        user: A.include && typeof A.include.user === "boolean" ? A.include.user : {
                            ...Bl1.include.user,
                            ...(A.include || {}).user
                        }
                    }
                };
            return {
                name: ch0,
                setupOnce() {},
                processEvent(Z, D, G) {
                    let {
                        transactionNamingScheme: F
                    } = Q, {
                        sdkProcessingMetadata: I = {}
                    } = Z, Y = I.request;
                    if (!Y) return Z;
                    let W = I.requestDataOptionsFromExpressHandler || I.requestDataOptionsFromGCPWrapper || KY9(Q),
                        J = B(Z, Y, W);
                    if (Z.type === "transaction" || F === "handler") return J;
                    let V = Y._sentryTransaction;
                    if (V) {
                        let C = XY9.spanToJSON(V).description || "",
                            K = HY9(G) === "sentry.javascript.nextjs" ? C.startsWith("/api") : F !== "path",
                            [H] = mh0.extractPathForTransaction(Y, {
                                path: !0,
                                method: K,
                                customRoute: C
                            });
                        J.transaction = H
                    }
                    return J
                }
            }
        },
        lh0 = dh0.defineIntegration(VY9),
        CY9 = dh0.convertIntegrationFnToClass(ch0, lh0);

    function KY9(A) {
        let {
            transactionNamingScheme: B,
            include: {
                ip: Q,
                user: Z,
                ...D
            }
        } = A, G = [];
        for (let [I, Y] of Object.entries(D))
            if (Y) G.push(I);
        let F;
        if (Z === void 0) F = !0;
        else if (typeof Z === "boolean") F = Z;
        else {
            let I = [];
            for (let [Y, W] of Object.entries(Z))
                if (W) I.push(Y);
            F = I
        }
        return {
            include: {
                ip: Q,
                user: F,
                request: G.length !== 0 ? G : void 0,
                transaction: B
            }
        }
    }

    function HY9(A) {
        try {
            return A.getOptions()._metadata.sdk.name
        } catch (B) {
            return
        }
    }
    ph0.RequestData = CY9;
    ph0.requestDataIntegration = lh0
});
var Ql1 = E((rh0) => {
    Object.defineProperty(rh0, "__esModule", {
        value: !0
    });
    var DI = UA(),
        yf = vG(),
        nh0 = zO(),
        UY9 = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/, /^ResizeObserver loop completed with undelivered notifications.$/, /^Cannot redefine property: googletag$/],
        wY9 = [/^.*\/healthcheck$/, /^.*\/healthy$/, /^.*\/live$/, /^.*\/ready$/, /^.*\/heartbeat$/, /^.*\/health$/, /^.*\/healthz$/],
        ah0 = "InboundFilters",
        $Y9 = (A = {}) => {
            return {
                name: ah0,
                setupOnce() {},
                processEvent(B, Q, Z) {
                    let D = Z.getOptions(),
                        G = NY9(A, D);
                    return LY9(B, G) ? null : B
                }
            }
        },
        sh0 = nh0.defineIntegration($Y9),
        qY9 = nh0.convertIntegrationFnToClass(ah0, sh0);

    function NY9(A = {}, B = {}) {
        return {
            allowUrls: [...A.allowUrls || [], ...B.allowUrls || []],
            denyUrls: [...A.denyUrls || [], ...B.denyUrls || []],
            ignoreErrors: [...A.ignoreErrors || [], ...B.ignoreErrors || [], ...A.disableErrorDefaults ? [] : UY9],
            ignoreTransactions: [...A.ignoreTransactions || [], ...B.ignoreTransactions || [], ...A.disableTransactionDefaults ? [] : wY9],
            ignoreInternal: A.ignoreInternal !== void 0 ? A.ignoreInternal : !0
        }
    }

    function LY9(A, B) {
        if (B.ignoreInternal && SY9(A)) return yf.DEBUG_BUILD && DI.logger.warn(`Event dropped due to being internal Sentry Error.
Event: ${DI.getEventDescription(A)}`), !0;
        if (MY9(A, B.ignoreErrors)) return yf.DEBUG_BUILD && DI.logger.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${DI.getEventDescription(A)}`), !0;
        if (RY9(A, B.ignoreTransactions)) return yf.DEBUG_BUILD && DI.logger.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${DI.getEventDescription(A)}`), !0;
        if (OY9(A, B.denyUrls)) return yf.DEBUG_BUILD && DI.logger.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${DI.getEventDescription(A)}.
Url: ${DX1(A)}`), !0;
        if (!TY9(A, B.allowUrls)) return yf.DEBUG_BUILD && DI.logger.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${DI.getEventDescription(A)}.
Url: ${DX1(A)}`), !0;
        return !1
    }

    function MY9(A, B) {
        if (A.type || !B || !B.length) return !1;
        return PY9(A).some((Q) => DI.stringMatchesSomePattern(Q, B))
    }

    function RY9(A, B) {
        if (A.type !== "transaction" || !B || !B.length) return !1;
        let Q = A.transaction;
        return Q ? DI.stringMatchesSomePattern(Q, B) : !1
    }

    function OY9(A, B) {
        if (!B || !B.length) return !1;
        let Q = DX1(A);
        return !Q ? !1 : DI.stringMatchesSomePattern(Q, B)
    }

    function TY9(A, B) {
        if (!B || !B.length) return !0;
        let Q = DX1(A);
        return !Q ? !0 : DI.stringMatchesSomePattern(Q, B)
    }

    function PY9(A) {
        let B = [];
        if (A.message) B.push(A.message);
        let Q;
        try {
            Q = A.exception.values[A.exception.values.length - 1]
        } catch (Z) {}
        if (Q) {
            if (Q.value) {
                if (B.push(Q.value), Q.type) B.push(`${Q.type}: ${Q.value}`)
            }
        }
        if (yf.DEBUG_BUILD && B.length === 0) DI.logger.error(`Could not extract message for event ${DI.getEventDescription(A)}`);
        return B
    }

    function SY9(A) {
        try {
            return A.exception.values[0].type === "SentryError"
        } catch (B) {}
        return !1
    }

    function jY9(A = []) {
        for (let B = A.length - 1; B >= 0; B--) {
            let Q = A[B];
            if (Q && Q.filename !== "<anonymous>" && Q.filename !== "[native code]") return Q.filename || null
        }
        return null
    }

    function DX1(A) {
        try {
            let B;
            try {
                B = A.exception.values[0].stacktrace.frames
            } catch (Q) {}
            return B ? jY9(B) : null
        } catch (B) {
            return yf.DEBUG_BUILD && DI.logger.error(`Cannot extract url for event ${DI.getEventDescription(A)}`), null
        }
    }
    rh0.InboundFilters = qY9;
    rh0.inboundFiltersIntegration = sh0
});
var Zl1 = E((Qg0) => {
    Object.defineProperty(Qg0, "__esModule", {
        value: !0
    });
    var _Y9 = UA(),
        xY9 = sH(),
        eh0 = zO(),
        oh0, Ag0 = "FunctionToString",
        th0 = new WeakMap,
        vY9 = () => {
            return {
                name: Ag0,
                setupOnce() {
                    oh0 = Function.prototype.toString;
                    try {
                        Function.prototype.toString = function(...A) {
                            let B = _Y9.getOriginalFunction(this),
                                Q = th0.has(xY9.getClient()) && B !== void 0 ? B : this;
                            return oh0.apply(Q, A)
                        }
                    } catch (A) {}
                },
                setup(A) {
                    th0.set(A, !0)
                }
            }
        },
        Bg0 = eh0.defineIntegration(vY9),
        bY9 = eh0.convertIntegrationFnToClass(Ag0, Bg0);
    Qg0.FunctionToString = bY9;
    Qg0.functionToStringIntegration = Bg0
});
var Dl1 = E((Ig0) => {
    Object.defineProperty(Ig0, "__esModule", {
        value: !0
    });
    var Zg0 = UA(),
        Dg0 = zO(),
        gY9 = "cause",
        uY9 = 5,
        Gg0 = "LinkedErrors",
        mY9 = (A = {}) => {
            let B = A.limit || uY9,
                Q = A.key || gY9;
            return {
                name: Gg0,
                setupOnce() {},
                preprocessEvent(Z, D, G) {
                    let F = G.getOptions();
                    Zg0.applyAggregateErrorsToEvent(Zg0.exceptionFromError, F.stackParser, F.maxValueLength, Q, B, Z, D)
                }
            }
        },
        Fg0 = Dg0.defineIntegration(mY9),
        dY9 = Dg0.convertIntegrationFnToClass(Gg0, Fg0);
    Ig0.LinkedErrors = dY9;
    Ig0.linkedErrorsIntegration = Fg0
});
var Wg0 = E((Yg0) => {
    Object.defineProperty(Yg0, "__esModule", {
        value: !0
    });
    var pY9 = Zl1(),
        iY9 = Ql1(),
        nY9 = Dl1();
    Yg0.FunctionToString = pY9.FunctionToString;
    Yg0.InboundFilters = iY9.InboundFilters;
    Yg0.LinkedErrors = nY9.LinkedErrors
});
var Cg0 = E((Vg0) => {
    Object.defineProperty(Vg0, "__esModule", {
        value: !0
    });
    var oY9 = UA(),
        Jg0 = QB1(),
        tY9 = ac1(),
        eY9 = t21(),
        GX1 = BB1();
    class Xg0 {
        constructor(A) {
            this._client = A, this._buckets = new Map, this._interval = setInterval(() => this.flush(), Jg0.DEFAULT_BROWSER_FLUSH_INTERVAL)
        }
        add(A, B, Q, Z = "none", D = {}, G = oY9.timestampInSeconds()) {
            let F = Math.floor(G),
                I = GX1.sanitizeMetricKey(B),
                Y = GX1.sanitizeTags(D),
                W = GX1.sanitizeUnit(Z),
                J = GX1.getBucketKey(A, I, W, Y),
                X = this._buckets.get(J),
                V = X && A === Jg0.SET_METRIC_TYPE ? X.metric.weight : 0;
            if (X) {
                if (X.metric.add(Q), X.timestamp < F) X.timestamp = F
            } else X = {
                metric: new tY9.METRIC_MAP[A](Q),
                timestamp: F,
                metricType: A,
                name: I,
                unit: W,
                tags: Y
            }, this._buckets.set(J, X);
            let C = typeof Q === "string" ? X.metric.weight - V : Q;
            eY9.updateMetricSummaryOnActiveSpan(A, I, C, W, D, J)
        }
        flush() {
            if (this._buckets.size === 0) return;
            if (this._client.captureAggregateMetrics) {
                let A = Array.from(this._buckets).map(([, B]) => B);
                this._client.captureAggregateMetrics(A)
            }
            this._buckets.clear()
        }
        close() {
            clearInterval(this._interval), this.flush()
        }
    }
    Vg0.BrowserMetricsAggregator = Xg0
});
var Ug0 = E((Eg0) => {
    Object.defineProperty(Eg0, "__esModule", {
        value: !0
    });
    var Kg0 = zO(),
        BW9 = Cg0(),
        Hg0 = "MetricsAggregator",
        QW9 = () => {
            return {
                name: Hg0,
                setupOnce() {},
                setup(A) {
                    A.metricsAggregator = new BW9.BrowserMetricsAggregator(A)
                }
            }
        },
        zg0 = Kg0.defineIntegration(QW9),
        ZW9 = Kg0.convertIntegrationFnToClass(Hg0, zg0);
    Eg0.MetricsAggregator = ZW9;
    Eg0.metricsAggregatorIntegration = zg0
});
var Pg0 = E((Tg0) => {
    Object.defineProperty(Tg0, "__esModule", {
        value: !0
    });
    var wg0 = UA(),
        $g0 = vG(),
        qg0 = sH(),
        FW9 = ZV(),
        FX1 = QB1(),
        Ng0 = Ug0();

    function IX1(A, B, Q, Z = {}) {
        let D = qg0.getClient(),
            G = qg0.getCurrentScope();
        if (D) {
            if (!D.metricsAggregator) {
                $g0.DEBUG_BUILD && wg0.logger.warn("No metrics aggregator enabled. Please add the MetricsAggregator integration to use metrics APIs");
                return
            }
            let {
                unit: F,
                tags: I,
                timestamp: Y
            } = Z, {
                release: W,
                environment: J
            } = D.getOptions(), X = G.getTransaction(), V = {};
            if (W) V.release = W;
            if (J) V.environment = J;
            if (X) V.transaction = FW9.spanToJSON(X).description || "";
            $g0.DEBUG_BUILD && wg0.logger.log(`Adding value of ${Q} to ${A} metric ${B}`), D.metricsAggregator.add(A, B, Q, F, {
                ...V,
                ...I
            }, Y)
        }
    }

    function Lg0(A, B = 1, Q) {
        IX1(FX1.COUNTER_METRIC_TYPE, A, B, Q)
    }

    function Mg0(A, B, Q) {
        IX1(FX1.DISTRIBUTION_METRIC_TYPE, A, B, Q)
    }

    function Rg0(A, B, Q) {
        IX1(FX1.SET_METRIC_TYPE, A, B, Q)
    }

    function Og0(A, B, Q) {
        IX1(FX1.GAUGE_METRIC_TYPE, A, B, Q)
    }
    var IW9 = {
        increment: Lg0,
        distribution: Mg0,
        set: Rg0,
        gauge: Og0,
        MetricsAggregator: Ng0.MetricsAggregator,
        metricsAggregatorIntegration: Ng0.metricsAggregatorIntegration
    };
    Tg0.distribution = Mg0;
    Tg0.gauge = Og0;
    Tg0.increment = Lg0;
    Tg0.metrics = IW9;
    Tg0.set = Rg0
});