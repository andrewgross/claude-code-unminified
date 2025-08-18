/* chunk:14 bytes:[221619, 239021) size:17402 source:unpacked-cli.js */
var Dh0 = E((Zh0) => {
    Object.defineProperty(Zh0, "__esModule", {
        value: !0
    });
    var EO = UA(),
        XI9 = mc1(),
        VI9 = cc1(),
        ZX1 = vG(),
        CI9 = sH(),
        KI9 = Ah0(),
        HI9 = fc1(),
        zI9 = vc1(),
        EI9 = ZV(),
        UI9 = xl();
    fl();
    var Bh0 = Pf();
    class Qh0 extends XI9.BaseClient {
        constructor(A) {
            zI9.addTracingExtensions();
            super(A);
            if (A._experiments && A._experiments.metricsAggregator) this.metricsAggregator = new KI9.MetricsAggregator(this)
        }
        eventFromException(A, B) {
            return EO.resolvedSyncPromise(EO.eventFromUnknownInput(CI9.getClient(), this._options.stackParser, A, B))
        }
        eventFromMessage(A, B = "info", Q) {
            return EO.resolvedSyncPromise(EO.eventFromMessage(this._options.stackParser, A, B, Q, this._options.attachStacktrace))
        }
        captureException(A, B, Q) {
            if (this._options.autoSessionTracking && this._sessionFlusher && Q) {
                let Z = Q.getRequestSession();
                if (Z && Z.status === "ok") Z.status = "errored"
            }
            return super.captureException(A, B, Q)
        }
        captureEvent(A, B, Q) {
            if (this._options.autoSessionTracking && this._sessionFlusher && Q) {
                if ((A.type || "exception") === "exception" && A.exception && A.exception.values && A.exception.values.length > 0) {
                    let G = Q.getRequestSession();
                    if (G && G.status === "ok") G.status = "errored"
                }
            }
            return super.captureEvent(A, B, Q)
        }
        close(A) {
            if (this._sessionFlusher) this._sessionFlusher.close();
            return super.close(A)
        }
        initSessionFlusher() {
            let {
                release: A,
                environment: B
            } = this._options;
            if (!A) ZX1.DEBUG_BUILD && EO.logger.warn("Cannot initialise an instance of SessionFlusher if no release is provided!");
            else this._sessionFlusher = new HI9.SessionFlusher(this, {
                release: A,
                environment: B
            })
        }
        captureCheckIn(A, B, Q) {
            let Z = "checkInId" in A && A.checkInId ? A.checkInId : EO.uuid4();
            if (!this._isEnabled()) return ZX1.DEBUG_BUILD && EO.logger.warn("SDK not enabled, will not capture checkin."), Z;
            let D = this.getOptions(),
                {
                    release: G,
                    environment: F,
                    tunnel: I
                } = D,
                Y = {
                    check_in_id: Z,
                    monitor_slug: A.monitorSlug,
                    status: A.status,
                    release: G,
                    environment: F
                };
            if ("duration" in A) Y.duration = A.duration;
            if (B) Y.monitor_config = {
                schedule: B.schedule,
                checkin_margin: B.checkinMargin,
                max_runtime: B.maxRuntime,
                timezone: B.timezone
            };
            let [W, J] = this._getTraceInfoFromScope(Q);
            if (J) Y.contexts = {
                trace: J
            };
            let X = VI9.createCheckInEnvelope(Y, W, this.getSdkMetadata(), I, this.getDsn());
            return ZX1.DEBUG_BUILD && EO.logger.info("Sending checkin:", A.monitorSlug, A.status), this._sendEnvelope(X), Z
        }
        _captureRequestSession() {
            if (!this._sessionFlusher) ZX1.DEBUG_BUILD && EO.logger.warn("Discarded request mode session because autoSessionTracking option was disabled");
            else this._sessionFlusher.incrementSessionStatusCount()
        }
        _prepareEvent(A, B, Q, Z) {
            if (this._options.platform) A.platform = A.platform || this._options.platform;
            if (this._options.runtime) A.contexts = {
                ...A.contexts,
                runtime: (A.contexts || {}).runtime || this._options.runtime
            };
            if (this._options.serverName) A.server_name = A.server_name || this._options.serverName;
            return super._prepareEvent(A, B, Q, Z)
        }
        _getTraceInfoFromScope(A) {
            if (!A) return [void 0, void 0];
            let B = A.getSpan();
            if (B) return [UI9.getRootSpan(B) ? Bh0.getDynamicSamplingContextFromSpan(B) : void 0, EI9.spanToTraceContext(B)];
            let {
                traceId: Q,
                spanId: Z,
                parentSpanId: D,
                dsc: G
            } = A.getPropagationContext(), F = {
                trace_id: Q,
                span_id: Z,
                parent_span_id: D
            };
            if (G) return [G, F];
            return [Bh0.getDynamicSamplingContextFromClient(Q, this, A), F]
        }
    }
    Zh0.ServerRuntimeClient = Qh0
});
var Yh0 = E((Ih0) => {
    Object.defineProperty(Ih0, "__esModule", {
        value: !0
    });
    var Gh0 = UA(),
        $I9 = vG(),
        qI9 = sH(),
        NI9 = eq();

    function LI9(A, B) {
        if (B.debug === !0)
            if ($I9.DEBUG_BUILD) Gh0.logger.enable();
            else Gh0.consoleSandbox(() => {
                console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")
            });
        qI9.getCurrentScope().update(B.initialScope);
        let Z = new A(B);
        Fh0(Z), MI9(Z)
    }

    function Fh0(A) {
        let Q = NI9.getCurrentHub().getStackTop();
        Q.client = A, Q.scope.setClient(A)
    }

    function MI9(A) {
        if (A.init) A.init();
        else if (A.setupIntegrations) A.setupIntegrations()
    }
    Ih0.initAndBind = LI9;
    Ih0.setCurrentClient = Fh0
});
var Ch0 = E((Vh0) => {
    Object.defineProperty(Vh0, "__esModule", {
        value: !0
    });
    var GV = UA(),
        Wh0 = vG(),
        Xh0 = 30;

    function TI9(A, B, Q = GV.makePromiseBuffer(A.bufferSize || Xh0)) {
        let Z = {},
            D = (F) => Q.drain(F);

        function G(F) {
            let I = [];
            if (GV.forEachEnvelopeItem(F, (X, V) => {
                    let C = GV.envelopeItemTypeToDataCategory(V);
                    if (GV.isRateLimited(Z, C)) {
                        let K = Jh0(X, V);
                        A.recordDroppedEvent("ratelimit_backoff", C, K)
                    } else I.push(X)
                }), I.length === 0) return GV.resolvedSyncPromise();
            let Y = GV.createEnvelope(F[0], I),
                W = (X) => {
                    GV.forEachEnvelopeItem(Y, (V, C) => {
                        let K = Jh0(V, C);
                        A.recordDroppedEvent(X, GV.envelopeItemTypeToDataCategory(C), K)
                    })
                },
                J = () => B({
                    body: GV.serializeEnvelope(Y, A.textEncoder)
                }).then((X) => {
                    if (X.statusCode !== void 0 && (X.statusCode < 200 || X.statusCode >= 300)) Wh0.DEBUG_BUILD && GV.logger.warn(`Sentry responded with status code ${X.statusCode} to sent event.`);
                    return Z = GV.updateRateLimits(Z, X), X
                }, (X) => {
                    throw W("network_error"), X
                });
            return Q.add(J).then((X) => X, (X) => {
                if (X instanceof GV.SentryError) return Wh0.DEBUG_BUILD && GV.logger.error("Skipped sending event because buffer is full."), W("queue_overflow"), GV.resolvedSyncPromise();
                else throw X
            })
        }
        return G.__sentry__baseTransport__ = !0, {
            send: G,
            flush: D
        }
    }

    function Jh0(A, B) {
        if (B !== "event" && B !== "transaction") return;
        return Array.isArray(A) ? A[1] : void 0
    }
    Vh0.DEFAULT_TRANSPORT_BUFFER_SIZE = Xh0;
    Vh0.createTransport = TI9
});
var zh0 = E((Hh0) => {
    Object.defineProperty(Hh0, "__esModule", {
        value: !0
    });
    var rc1 = UA(),
        jI9 = vG(),
        Kh0 = 100,
        oc1 = 5000,
        kI9 = 3600000;

    function sc1(A, B) {
        jI9.DEBUG_BUILD && rc1.logger.info(`[Offline]: ${A}`, B)
    }

    function yI9(A) {
        return (B) => {
            let Q = A(B),
                Z = B.createStore ? B.createStore(B) : void 0,
                D = oc1,
                G;

            function F(J, X, V) {
                if (rc1.envelopeContainsItemType(J, ["replay_event", "replay_recording", "client_report"])) return !1;
                if (B.shouldStore) return B.shouldStore(J, X, V);
                return !0
            }

            function I(J) {
                if (!Z) return;
                if (G) clearTimeout(G);
                if (G = setTimeout(async () => {
                        G = void 0;
                        let X = await Z.pop();
                        if (X) sc1("Attempting to send previously queued event"), W(X).catch((V) => {
                            sc1("Failed to retry sending", V)
                        })
                    }, J), typeof G !== "number" && G.unref) G.unref()
            }

            function Y() {
                if (G) return;
                I(D), D = Math.min(D * 2, kI9)
            }
            async function W(J) {
                try {
                    let X = await Q.send(J),
                        V = Kh0;
                    if (X) {
                        if (X.headers && X.headers["retry-after"]) V = rc1.parseRetryAfterHeader(X.headers["retry-after"]);
                        else if ((X.statusCode || 0) >= 400) return X
                    }
                    return I(V), D = oc1, X
                } catch (X) {
                    if (Z && await F(J, X, D)) return await Z.insert(J), Y(), sc1("Error sending. Event queued", X), {};
                    else throw X
                }
            }
            if (B.flushAtStartup) Y();
            return {
                send: W,
                flush: (J) => Q.flush(J)
            }
        }
    }
    Hh0.MIN_DELAY = Kh0;
    Hh0.START_DELAY = oc1;
    Hh0.makeOfflineTransport = yI9
});
var Uh0 = E((Eh0) => {
    Object.defineProperty(Eh0, "__esModule", {
        value: !0
    });
    var tc1 = UA(),
        bI9 = tJ1();

    function ec1(A, B) {
        let Q;
        return tc1.forEachEnvelopeItem(A, (Z, D) => {
            if (B.includes(D)) Q = Array.isArray(Z) ? Z[1] : void 0;
            return !!Q
        }), Q
    }

    function fI9(A, B) {
        return (Q) => {
            let Z = A(Q);
            return {
                ...Z,
                send: async (D) => {
                    let G = ec1(D, ["event", "transaction", "profile", "replay_event"]);
                    if (G) G.release = B;
                    return Z.send(D)
                }
            }
        }
    }

    function hI9(A, B) {
        return tc1.createEnvelope(B ? {
            ...A[0],
            dsn: B
        } : A[0], A[1])
    }

    function gI9(A, B) {
        return (Q) => {
            let Z = A(Q),
                D = new Map;

            function G(Y, W) {
                let J = W ? `${Y}:${W}` : Y,
                    X = D.get(J);
                if (!X) {
                    let V = tc1.dsnFromString(Y);
                    if (!V) return;
                    let C = bI9.getEnvelopeEndpointWithUrlEncodedAuth(V, Q.tunnel);
                    X = W ? fI9(A, W)({
                        ...Q,
                        url: C
                    }) : A({
                        ...Q,
                        url: C
                    }), D.set(J, X)
                }
                return [Y, X]
            }
            async function F(Y) {
                function W(V) {
                    let C = V && V.length ? V : ["event"];
                    return ec1(Y, C)
                }
                let J = B({
                    envelope: Y,
                    getEvent: W
                }).map((V) => {
                    if (typeof V === "string") return G(V, void 0);
                    else return G(V.dsn, V.release)
                }).filter((V) => !!V);
                if (J.length === 0) J.push(["", Z]);
                return (await Promise.all(J.map(([V, C]) => C.send(hI9(Y, V)))))[0]
            }
            async function I(Y) {
                let W = [await Z.flush(Y)];
                for (let [, J] of D) W.push(await J.flush(Y));
                return W.every((J) => J)
            }
            return {
                send: F,
                flush: I
            }
        }
    }
    Eh0.eventFromEnvelope = ec1;
    Eh0.makeMultiplexedTransport = gI9
});
var qh0 = E(($h0) => {
    Object.defineProperty($h0, "__esModule", {
        value: !0
    });
    var wh0 = UA();

    function dI9(A, B) {
        let Q = {
            sent_at: new Date().toISOString()
        };
        if (B) Q.dsn = wh0.dsnToString(B);
        let Z = A.map(cI9);
        return wh0.createEnvelope(Q, Z)
    }

    function cI9(A) {
        return [{
            type: "span"
        }, A]
    }
    $h0.createSpanEnvelope = dI9
});
var Mh0 = E((Lh0) => {
    Object.defineProperty(Lh0, "__esModule", {
        value: !0
    });

    function pI9(A, B) {
        let Q = B && aI9(B) ? B.getClient() : B,
            Z = Q && Q.getDsn(),
            D = Q && Q.getOptions().tunnel;
        return nI9(A, Z) || iI9(A, D)
    }

    function iI9(A, B) {
        if (!B) return !1;
        return Nh0(A) === Nh0(B)
    }

    function nI9(A, B) {
        return B ? A.includes(B.host) : !1
    }

    function Nh0(A) {
        return A[A.length - 1] === "/" ? A.slice(0, -1) : A
    }

    function aI9(A) {
        return A.getClient !== void 0
    }
    Lh0.isSentryRequestUrl = pI9
});
var Oh0 = E((Rh0) => {
    Object.defineProperty(Rh0, "__esModule", {
        value: !0
    });

    function rI9(A, ...B) {
        let Q = new String(String.raw(A, ...B));
        return Q.__sentry_template_string__ = A.join("\x00").replace(/%/g, "%%").replace(/\0/g, "%s"), Q.__sentry_template_values__ = B, Q
    }
    Rh0.parameterize = rI9
});
var Sh0 = E((Ph0) => {
    Object.defineProperty(Ph0, "__esModule", {
        value: !0
    });
    var Th0 = vJ1();

    function tI9(A, B, Q = [B], Z = "npm") {
        let D = A._metadata || {};
        if (!D.sdk) D.sdk = {
            name: `sentry.javascript.${B}`,
            packages: Q.map((G) => ({
                name: `${Z}:@sentry/${G}`,
                version: Th0.SDK_VERSION
            })),
            version: Th0.SDK_VERSION
        };
        A._metadata = D
    }
    Ph0.applySdkMetadata = tI9
});
var xh0 = E((_h0) => {
    Object.defineProperty(_h0, "__esModule", {
        value: !0
    });
    var Al1 = UA(),
        kh0 = new Map,
        jh0 = new Set;

    function AY9(A) {
        if (!Al1.GLOBAL_OBJ._sentryModuleMetadata) return;
        for (let B of Object.keys(Al1.GLOBAL_OBJ._sentryModuleMetadata)) {
            let Q = Al1.GLOBAL_OBJ._sentryModuleMetadata[B];
            if (jh0.has(B)) continue;
            jh0.add(B);
            let Z = A(B);
            for (let D of Z.reverse())
                if (D.filename) {
                    kh0.set(D.filename, Q);
                    break
                }
        }
    }

    function yh0(A, B) {
        return AY9(A), kh0.get(B)
    }

    function BY9(A, B) {
        try {
            B.exception.values.forEach((Q) => {
                if (!Q.stacktrace) return;
                for (let Z of Q.stacktrace.frames || []) {
                    if (!Z.filename) continue;
                    let D = yh0(A, Z.filename);
                    if (D) Z.module_metadata = D
                }
            })
        } catch (Q) {}
    }

    function QY9(A) {
        try {
            A.exception.values.forEach((B) => {
                if (!B.stacktrace) return;
                for (let Q of B.stacktrace.frames || []) delete Q.module_metadata
            })
        } catch (B) {}
    }
    _h0.addMetadataToStackFrames = BY9;
    _h0.getMetadataForUrl = yh0;
    _h0.stripMetadataFromStackFrames = QY9
});
var uh0 = E((gh0) => {
    Object.defineProperty(gh0, "__esModule", {
        value: !0
    });
    var FY9 = UA(),
        bh0 = zO(),
        vh0 = xh0(),
        fh0 = "ModuleMetadata",
        IY9 = () => {
            return {
                name: fh0,
                setupOnce() {},
                setup(A) {
                    if (typeof A.on !== "function") return;
                    A.on("beforeEnvelope", (B) => {
                        FY9.forEachEnvelopeItem(B, (Q, Z) => {
                            if (Z === "event") {
                                let D = Array.isArray(Q) ? Q[1] : void 0;
                                if (D) vh0.stripMetadataFromStackFrames(D), Q[1] = D
                            }
                        })
                    })
                },
                processEvent(A, B, Q) {
                    let Z = Q.getOptions().stackParser;
                    return vh0.addMetadataToStackFrames(Z, A), A
                }
            }
        },
        hh0 = bh0.defineIntegration(IY9),
        YY9 = bh0.convertIntegrationFnToClass(fh0, hh0);
    gh0.ModuleMetadata = YY9;
    gh0.moduleMetadataIntegration = hh0
});