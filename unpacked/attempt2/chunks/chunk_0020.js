/* chunk:20 bytes:[326861, 346223) size:19362 source:unpacked-cli.js */
var PX1 = E((wm0) => {
    Object.defineProperty(wm0, "__esModule", {
        value: !0
    });
    var Zw = xQ(),
        Dw = UA(),
        sK9 = Ll1(),
        rK9 = ol(),
        oK9 = dC(),
        TX1 = ["localhost", /^\/(?!\/)/],
        Ml1 = {
            traceFetch: !0,
            traceXHR: !0,
            enableHTTPTimings: !0,
            tracingOrigins: TX1,
            tracePropagationTargets: TX1
        };

    function tK9(A) {
        let {
            traceFetch: B,
            traceXHR: Q,
            tracePropagationTargets: Z,
            tracingOrigins: D,
            shouldCreateSpanForRequest: G,
            enableHTTPTimings: F
        } = {
            traceFetch: Ml1.traceFetch,
            traceXHR: Ml1.traceXHR,
            ...A
        }, I = typeof G === "function" ? G : (J) => !0, Y = (J) => zm0(J, Z || D), W = {};
        if (B) Dw.addFetchInstrumentationHandler((J) => {
            let X = sK9.instrumentFetchRequest(J, I, Y, W);
            if (X) {
                let V = Um0(J.fetchData.url),
                    C = V ? Dw.parseUrl(V).host : void 0;
                X.setAttributes({
                    "http.url": V,
                    "server.address": C
                })
            }
            if (F && X) Km0(X)
        });
        if (Q) Dw.addXhrInstrumentationHandler((J) => {
            let X = Em0(J, I, Y, W);
            if (F && X) Km0(X)
        })
    }

    function eK9(A) {
        return A.entryType === "resource" && "initiatorType" in A && typeof A.nextHopProtocol === "string" && (A.initiatorType === "fetch" || A.initiatorType === "xmlhttprequest")
    }

    function Km0(A) {
        let {
            url: B
        } = Zw.spanToJSON(A).data || {};
        if (!B || typeof B !== "string") return;
        let Q = rK9.addPerformanceInstrumentationHandler("resource", ({
            entries: Z
        }) => {
            Z.forEach((D) => {
                if (eK9(D) && D.name.endsWith(B)) AH9(D).forEach((F) => A.setAttribute(...F)), setTimeout(Q)
            })
        })
    }

    function Hm0(A) {
        let B = "unknown",
            Q = "unknown",
            Z = "";
        for (let D of A) {
            if (D === "/") {
                [B, Q] = A.split("/");
                break
            }
            if (!isNaN(Number(D))) {
                B = Z === "h" ? "http" : Z, Q = A.split(Z)[1];
                break
            }
            Z += D
        }
        if (Z === A) B = Z;
        return {
            name: B,
            version: Q
        }
    }

    function GN(A = 0) {
        return ((Dw.browserPerformanceTimeOrigin || performance.timeOrigin) + A) / 1000
    }

    function AH9(A) {
        let {
            name: B,
            version: Q
        } = Hm0(A.nextHopProtocol), Z = [];
        if (Z.push(["network.protocol.version", Q], ["network.protocol.name", B]), !Dw.browserPerformanceTimeOrigin) return Z;
        return [...Z, ["http.request.redirect_start", GN(A.redirectStart)],
            ["http.request.fetch_start", GN(A.fetchStart)],
            ["http.request.domain_lookup_start", GN(A.domainLookupStart)],
            ["http.request.domain_lookup_end", GN(A.domainLookupEnd)],
            ["http.request.connect_start", GN(A.connectStart)],
            ["http.request.secure_connection_start", GN(A.secureConnectionStart)],
            ["http.request.connection_end", GN(A.connectEnd)],
            ["http.request.request_start", GN(A.requestStart)],
            ["http.request.response_start", GN(A.responseStart)],
            ["http.request.response_end", GN(A.responseEnd)]
        ]
    }

    function zm0(A, B) {
        return Dw.stringMatchesSomePattern(A, B || TX1)
    }

    function Em0(A, B, Q, Z) {
        let D = A.xhr,
            G = D && D[Dw.SENTRY_XHR_DATA_KEY];
        if (!Zw.hasTracingEnabled() || !D || D.__sentry_own_request__ || !G) return;
        let F = B(G.url);
        if (A.endTimestamp && F) {
            let C = D.__sentry_xhr_span_id__;
            if (!C) return;
            let K = Z[C];
            if (K && G.status_code !== void 0) Zw.setHttpStatus(K, G.status_code), K.end(), delete Z[C];
            return
        }
        let I = Zw.getCurrentScope(),
            Y = Zw.getIsolationScope(),
            W = Um0(G.url),
            J = W ? Dw.parseUrl(W).host : void 0,
            X = F ? Zw.startInactiveSpan({
                name: `${G.method} ${G.url}`,
                onlyIfParent: !0,
                attributes: {
                    type: "xhr",
                    "http.method": G.method,
                    "http.url": W,
                    url: G.url,
                    "server.address": J,
                    [Zw.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser"
                },
                op: "http.client"
            }) : void 0;
        if (X) D.__sentry_xhr_span_id__ = X.spanContext().spanId, Z[D.__sentry_xhr_span_id__] = X;
        let V = Zw.getClient();
        if (D.setRequestHeader && Q(G.url) && V) {
            let {
                traceId: C,
                spanId: K,
                sampled: H,
                dsc: z
            } = {
                ...Y.getPropagationContext(),
                ...I.getPropagationContext()
            }, $ = X ? Zw.spanToTraceHeader(X) : Dw.generateSentryTraceHeader(C, K, H), L = Dw.dynamicSamplingContextToSentryBaggageHeader(z || (X ? Zw.getDynamicSamplingContextFromSpan(X) : Zw.getDynamicSamplingContextFromClient(C, V, I)));
            BH9(D, $, L)
        }
        return X
    }

    function BH9(A, B, Q) {
        try {
            if (A.setRequestHeader("sentry-trace", B), Q) A.setRequestHeader(Dw.BAGGAGE_HEADER_NAME, Q)
        } catch (Z) {}
    }

    function Um0(A) {
        try {
            return new URL(A, oK9.WINDOW.location.origin).href
        } catch (B) {
            return
        }
    }
    wm0.DEFAULT_TRACE_PROPAGATION_TARGETS = TX1;
    wm0.defaultRequestInstrumentationOptions = Ml1;
    wm0.extractNetworkProtocol = Hm0;
    wm0.instrumentOutgoingRequests = tK9;
    wm0.shouldAttachHeaders = zm0;
    wm0.xhrCallback = Em0
});
var Nm0 = E((qm0) => {
    Object.defineProperty(qm0, "__esModule", {
        value: !0
    });
    var CB1 = UA(),
        $m0 = FV(),
        KB1 = dC();

    function YH9(A, B = !0, Q = !0) {
        if (!KB1.WINDOW || !KB1.WINDOW.location) {
            $m0.DEBUG_BUILD && CB1.logger.warn("Could not initialize routing instrumentation due to invalid location");
            return
        }
        let Z = KB1.WINDOW.location.href,
            D;
        if (B) D = A({
            name: KB1.WINDOW.location.pathname,
            startTimestamp: CB1.browserPerformanceTimeOrigin ? CB1.browserPerformanceTimeOrigin / 1000 : void 0,
            op: "pageload",
            origin: "auto.pageload.browser",
            metadata: {
                source: "url"
            }
        });
        if (Q) CB1.addHistoryInstrumentationHandler(({
            to: G,
            from: F
        }) => {
            if (F === void 0 && Z && Z.indexOf(G) !== -1) {
                Z = void 0;
                return
            }
            if (F !== G) {
                if (Z = void 0, D) $m0.DEBUG_BUILD && CB1.logger.log(`[Tracing] Finishing current transaction with op: ${D.op}`), D.end();
                D = A({
                    name: KB1.WINDOW.location.pathname,
                    op: "navigation",
                    origin: "auto.navigation.browser",
                    metadata: {
                        source: "url"
                    }
                })
            }
        })
    }
    qm0.instrumentRoutingWithDefaults = YH9
});
var Sm0 = E((Pm0) => {
    Object.defineProperty(Pm0, "__esModule", {
        value: !0
    });
    var Gw = xQ(),
        NO = UA(),
        Ak = FV(),
        JH9 = Kl1(),
        Lm0 = ol(),
        HB1 = Nl1(),
        Rm0 = PX1(),
        XH9 = Nm0(),
        hf = dC(),
        Om0 = "BrowserTracing",
        VH9 = {
            ...Gw.TRACING_DEFAULTS,
            markBackgroundTransactions: !0,
            routingInstrumentation: XH9.instrumentRoutingWithDefaults,
            startTransactionOnLocationChange: !0,
            startTransactionOnPageLoad: !0,
            enableLongTask: !0,
            enableInp: !1,
            interactionsSampleRate: 1,
            _experiments: {},
            ...Rm0.defaultRequestInstrumentationOptions
        },
        Mm0 = 10;
    class Tm0 {
        constructor(A) {
            if (this.name = Om0, this._hasSetTracePropagationTargets = !1, Gw.addTracingExtensions(), Ak.DEBUG_BUILD) this._hasSetTracePropagationTargets = !!(A && (A.tracePropagationTargets || A.tracingOrigins));
            if (this.options = {
                    ...VH9,
                    ...A
                }, this.options._experiments.enableLongTask !== void 0) this.options.enableLongTask = this.options._experiments.enableLongTask;
            if (A && !A.tracePropagationTargets && A.tracingOrigins) this.options.tracePropagationTargets = A.tracingOrigins;
            if (this._collectWebVitals = HB1.startTrackingWebVitals(), this._interactionIdToRouteNameMapping = {}, this.options.enableInp) HB1.startTrackingINP(this._interactionIdToRouteNameMapping, this.options.interactionsSampleRate);
            if (this.options.enableLongTask) HB1.startTrackingLongTasks();
            if (this.options._experiments.enableInteractions) HB1.startTrackingInteractions();
            this._latestRoute = {
                name: void 0,
                context: void 0
            }
        }
        setupOnce(A, B) {
            this._getCurrentHub = B;
            let Z = B().getClient(),
                D = Z && Z.getOptions(),
                {
                    routingInstrumentation: G,
                    startTransactionOnLocationChange: F,
                    startTransactionOnPageLoad: I,
                    markBackgroundTransactions: Y,
                    traceFetch: W,
                    traceXHR: J,
                    shouldCreateSpanForRequest: X,
                    enableHTTPTimings: V,
                    _experiments: C
                } = this.options,
                K = D && D.tracePropagationTargets,
                H = K || this.options.tracePropagationTargets;
            if (Ak.DEBUG_BUILD && this._hasSetTracePropagationTargets && K) NO.logger.warn("[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used.");
            if (G((z) => {
                    let $ = this._createRouteTransaction(z);
                    return this.options._experiments.onStartRouteTransaction && this.options._experiments.onStartRouteTransaction($, z, B), $
                }, I, F), Y) JH9.registerBackgroundTabDetection();
            if (C.enableInteractions) this._registerInteractionListener();
            if (this.options.enableInp) this._registerInpInteractionListener();
            Rm0.instrumentOutgoingRequests({
                traceFetch: W,
                traceXHR: J,
                tracePropagationTargets: H,
                shouldCreateSpanForRequest: X,
                enableHTTPTimings: V
            })
        }
        _createRouteTransaction(A) {
            if (!this._getCurrentHub) {
                Ak.DEBUG_BUILD && NO.logger.warn(`[Tracing] Did not create ${A.op} transaction because _getCurrentHub is invalid.`);
                return
            }
            let B = this._getCurrentHub(),
                {
                    beforeNavigate: Q,
                    idleTimeout: Z,
                    finalTimeout: D,
                    heartbeatInterval: G
                } = this.options,
                F = A.op === "pageload",
                I;
            if (F) {
                let V = F ? Rl1("sentry-trace") : "",
                    C = F ? Rl1("baggage") : void 0,
                    {
                        traceId: K,
                        dsc: H,
                        parentSpanId: z,
                        sampled: $
                    } = NO.propagationContextFromHeaders(V, C);
                I = {
                    traceId: K,
                    parentSpanId: z,
                    parentSampled: $,
                    ...A,
                    metadata: {
                        ...A.metadata,
                        dynamicSamplingContext: H
                    },
                    trimEnd: !0
                }
            } else I = {
                trimEnd: !0,
                ...A
            };
            let Y = typeof Q === "function" ? Q(I) : I,
                W = Y === void 0 ? {
                    ...I,
                    sampled: !1
                } : Y;
            if (W.metadata = W.name !== I.name ? {
                    ...W.metadata,
                    source: "custom"
                } : W.metadata, this._latestRoute.name = W.name, this._latestRoute.context = W, W.sampled === !1) Ak.DEBUG_BUILD && NO.logger.log(`[Tracing] Will not send ${W.op} transaction because of beforeNavigate.`);
            Ak.DEBUG_BUILD && NO.logger.log(`[Tracing] Starting ${W.op} transaction on scope`);
            let {
                location: J
            } = hf.WINDOW, X = Gw.startIdleTransaction(B, W, Z, D, !0, {
                location: J
            }, G, F);
            if (F) {
                if (hf.WINDOW.document) {
                    if (hf.WINDOW.document.addEventListener("readystatechange", () => {
                            if (["interactive", "complete"].includes(hf.WINDOW.document.readyState)) X.sendAutoFinishSignal()
                        }), ["interactive", "complete"].includes(hf.WINDOW.document.readyState)) X.sendAutoFinishSignal()
                }
            }
            return X.registerBeforeFinishCallback((V) => {
                this._collectWebVitals(), HB1.addPerformanceEntries(V)
            }), X
        }
        _registerInteractionListener() {
            let A, B = () => {
                let {
                    idleTimeout: Q,
                    finalTimeout: Z,
                    heartbeatInterval: D
                } = this.options, G = "ui.action.click", F = Gw.getActiveTransaction();
                if (F && F.op && ["navigation", "pageload"].includes(F.op)) {
                    Ak.DEBUG_BUILD && NO.logger.warn("[Tracing] Did not create ui.action.click transaction because a pageload or navigation transaction is in progress.");
                    return
                }
                if (A) A.setFinishReason("interactionInterrupted"), A.end(), A = void 0;
                if (!this._getCurrentHub) {
                    Ak.DEBUG_BUILD && NO.logger.warn("[Tracing] Did not create ui.action.click transaction because _getCurrentHub is invalid.");
                    return
                }
                if (!this._latestRoute.name) {
                    Ak.DEBUG_BUILD && NO.logger.warn("[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing.");
                    return
                }
                let I = this._getCurrentHub(),
                    {
                        location: Y
                    } = hf.WINDOW,
                    W = {
                        name: this._latestRoute.name,
                        op: "ui.action.click",
                        trimEnd: !0,
                        data: {
                            [Gw.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: this._latestRoute.context ? CH9(this._latestRoute.context) : "url"
                        }
                    };
                A = Gw.startIdleTransaction(I, W, Q, Z, !0, {
                    location: Y
                }, D)
            };
            ["click"].forEach((Q) => {
                if (hf.WINDOW.document) addEventListener(Q, B, {
                    once: !1,
                    capture: !0
                })
            })
        }
        _registerInpInteractionListener() {
            let A = ({
                entries: B
            }) => {
                let Q = Gw.getClient(),
                    Z = Q !== void 0 && Q.getIntegrationByName !== void 0 ? Q.getIntegrationByName("Replay") : void 0,
                    D = Z !== void 0 ? Z.getReplayId() : void 0,
                    G = Gw.getActiveTransaction(),
                    F = Gw.getCurrentScope(),
                    I = F !== void 0 ? F.getUser() : void 0;
                B.forEach((Y) => {
                    if (KH9(Y)) {
                        let W = Y.interactionId;
                        if (W === void 0) return;
                        let J = this._interactionIdToRouteNameMapping[W],
                            X = Y.duration,
                            V = Y.startTime,
                            C = Object.keys(this._interactionIdToRouteNameMapping),
                            K = C.length > 0 ? C.reduce((H, z) => {
                                return this._interactionIdToRouteNameMapping[H].duration < this._interactionIdToRouteNameMapping[z].duration ? H : z
                            }) : void 0;
                        if (Y.entryType === "first-input") {
                            if (C.map((z) => this._interactionIdToRouteNameMapping[z]).some((z) => {
                                    return z.duration === X && z.startTime === V
                                })) return
                        }
                        if (!W) return;
                        if (J) J.duration = Math.max(J.duration, X);
                        else if (C.length < Mm0 || K === void 0 || X > this._interactionIdToRouteNameMapping[K].duration) {
                            let H = this._latestRoute.name,
                                z = this._latestRoute.context;
                            if (H && z) {
                                if (K && Object.keys(this._interactionIdToRouteNameMapping).length >= Mm0) delete this._interactionIdToRouteNameMapping[K];
                                this._interactionIdToRouteNameMapping[W] = {
                                    routeName: H,
                                    duration: X,
                                    parentContext: z,
                                    user: I,
                                    activeTransaction: G,
                                    replayId: D,
                                    startTime: V
                                }
                            }
                        }
                    }
                })
            };
            Lm0.addPerformanceInstrumentationHandler("event", A), Lm0.addPerformanceInstrumentationHandler("first-input", A)
        }
    }

    function Rl1(A) {
        let B = NO.getDomElement(`meta[name=${A}]`);
        return B ? B.getAttribute("content") : void 0
    }

    function CH9(A) {
        let B = A.attributes && A.attributes[Gw.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
            Q = A.data && A.data[Gw.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
            Z = A.metadata && A.metadata.source;
        return B || Q || Z
    }

    function KH9(A) {
        return "duration" in A
    }
    Pm0.BROWSER_TRACING_INTEGRATION_ID = Om0;
    Pm0.BrowserTracing = Tm0;
    Pm0.getMetaContent = Rl1
});