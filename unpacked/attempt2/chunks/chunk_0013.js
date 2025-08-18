/* chunk:13 bytes:[201684, 221618) size:19934 source:unpacked-cli.js */
var mc1 = E((nf0) => {
    Object.defineProperty(nf0, "__esModule", {
        value: !0
    });
    var c8 = UA(),
        TF9 = tJ1(),
        BN = vG(),
        mf0 = bc1(),
        PF9 = sH(),
        SF9 = eq(),
        AX1 = zO(),
        jF9 = uf0(),
        df0 = _l(),
        kF9 = Pf(),
        yF9 = jJ1(),
        cf0 = "Not capturing exception because it's already been captured.";
    class lf0 {
        constructor(A) {
            if (this._options = A, this._integrations = {}, this._integrationsInitialized = !1, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], A.dsn) this._dsn = c8.makeDsn(A.dsn);
            else BN.DEBUG_BUILD && c8.logger.warn("No DSN provided, client will not send events.");
            if (this._dsn) {
                let B = TF9.getEnvelopeEndpointWithUrlEncodedAuth(this._dsn, A);
                this._transport = A.transport({
                    tunnel: this._options.tunnel,
                    recordDroppedEvent: this.recordDroppedEvent.bind(this),
                    ...A.transportOptions,
                    url: B
                })
            }
        }
        captureException(A, B, Q) {
            if (c8.checkOrSetAlreadyCaught(A)) {
                BN.DEBUG_BUILD && c8.logger.log(cf0);
                return
            }
            let Z = B && B.event_id;
            return this._process(this.eventFromException(A, B).then((D) => this._captureEvent(D, B, Q)).then((D) => {
                Z = D
            })), Z
        }
        captureMessage(A, B, Q, Z) {
            let D = Q && Q.event_id,
                G = c8.isParameterizedString(A) ? A : String(A),
                F = c8.isPrimitive(A) ? this.eventFromMessage(G, B, Q) : this.eventFromException(A, Q);
            return this._process(F.then((I) => this._captureEvent(I, Q, Z)).then((I) => {
                D = I
            })), D
        }
        captureEvent(A, B, Q) {
            if (B && B.originalException && c8.checkOrSetAlreadyCaught(B.originalException)) {
                BN.DEBUG_BUILD && c8.logger.log(cf0);
                return
            }
            let Z = B && B.event_id,
                G = (A.sdkProcessingMetadata || {}).capturedSpanScope;
            return this._process(this._captureEvent(A, B, G || Q).then((F) => {
                Z = F
            })), Z
        }
        captureSession(A) {
            if (typeof A.release !== "string") BN.DEBUG_BUILD && c8.logger.warn("Discarded session because of missing or non-string release");
            else this.sendSession(A), df0.updateSession(A, {
                init: !1
            })
        }
        getDsn() {
            return this._dsn
        }
        getOptions() {
            return this._options
        }
        getSdkMetadata() {
            return this._options._metadata
        }
        getTransport() {
            return this._transport
        }
        flush(A) {
            let B = this._transport;
            if (B) {
                if (this.metricsAggregator) this.metricsAggregator.flush();
                return this._isClientDoneProcessing(A).then((Q) => {
                    return B.flush(A).then((Z) => Q && Z)
                })
            } else return c8.resolvedSyncPromise(!0)
        }
        close(A) {
            return this.flush(A).then((B) => {
                if (this.getOptions().enabled = !1, this.metricsAggregator) this.metricsAggregator.close();
                return B
            })
        }
        getEventProcessors() {
            return this._eventProcessors
        }
        addEventProcessor(A) {
            this._eventProcessors.push(A)
        }
        setupIntegrations(A) {
            if (A && !this._integrationsInitialized || this._isEnabled() && !this._integrationsInitialized) this._setupIntegrations()
        }
        init() {
            if (this._isEnabled()) this._setupIntegrations()
        }
        getIntegrationById(A) {
            return this.getIntegrationByName(A)
        }
        getIntegrationByName(A) {
            return this._integrations[A]
        }
        getIntegration(A) {
            try {
                return this._integrations[A.id] || null
            } catch (B) {
                return BN.DEBUG_BUILD && c8.logger.warn(`Cannot retrieve integration ${A.id} from the current Client`), null
            }
        }
        addIntegration(A) {
            let B = this._integrations[A.name];
            if (AX1.setupIntegration(this, A, this._integrations), !B) AX1.afterSetupIntegrations(this, [A])
        }
        sendEvent(A, B = {}) {
            this.emit("beforeSendEvent", A, B);
            let Q = mf0.createEventEnvelope(A, this._dsn, this._options._metadata, this._options.tunnel);
            for (let D of B.attachments || []) Q = c8.addItemToEnvelope(Q, c8.createAttachmentEnvelopeItem(D, this._options.transportOptions && this._options.transportOptions.textEncoder));
            let Z = this._sendEnvelope(Q);
            if (Z) Z.then((D) => this.emit("afterSendEvent", A, D), null)
        }
        sendSession(A) {
            let B = mf0.createSessionEnvelope(A, this._dsn, this._options._metadata, this._options.tunnel);
            this._sendEnvelope(B)
        }
        recordDroppedEvent(A, B, Q) {
            if (this._options.sendClientReports) {
                let Z = typeof Q === "number" ? Q : 1,
                    D = `${A}:${B}`;
                BN.DEBUG_BUILD && c8.logger.log(`Recording outcome: "${D}"${Z>1?` (${Z} times)`:""}`), this._outcomes[D] = (this._outcomes[D] || 0) + Z
            }
        }
        captureAggregateMetrics(A) {
            BN.DEBUG_BUILD && c8.logger.log(`Flushing aggregated metrics, number of metrics: ${A.length}`);
            let B = jF9.createMetricEnvelope(A, this._dsn, this._options._metadata, this._options.tunnel);
            this._sendEnvelope(B)
        }
        on(A, B) {
            if (!this._hooks[A]) this._hooks[A] = [];
            this._hooks[A].push(B)
        }
        emit(A, ...B) {
            if (this._hooks[A]) this._hooks[A].forEach((Q) => Q(...B))
        }
        _setupIntegrations() {
            let {
                integrations: A
            } = this._options;
            this._integrations = AX1.setupIntegrations(this, A), AX1.afterSetupIntegrations(this, A), this._integrationsInitialized = !0
        }
        _updateSessionFromEvent(A, B) {
            let Q = !1,
                Z = !1,
                D = B.exception && B.exception.values;
            if (D) {
                Z = !0;
                for (let I of D) {
                    let Y = I.mechanism;
                    if (Y && Y.handled === !1) {
                        Q = !0;
                        break
                    }
                }
            }
            let G = A.status === "ok";
            if (G && A.errors === 0 || G && Q) df0.updateSession(A, {
                ...Q && {
                    status: "crashed"
                },
                errors: A.errors || Number(Z || Q)
            }), this.captureSession(A)
        }
        _isClientDoneProcessing(A) {
            return new c8.SyncPromise((B) => {
                let Q = 0,
                    Z = 1,
                    D = setInterval(() => {
                        if (this._numProcessing == 0) clearInterval(D), B(!0);
                        else if (Q += Z, A && Q >= A) clearInterval(D), B(!1)
                    }, Z)
            })
        }
        _isEnabled() {
            return this.getOptions().enabled !== !1 && this._transport !== void 0
        }
        _prepareEvent(A, B, Q, Z = SF9.getIsolationScope()) {
            let D = this.getOptions(),
                G = Object.keys(this._integrations);
            if (!B.integrations && G.length > 0) B.integrations = G;
            return this.emit("preprocessEvent", A, B), yF9.prepareEvent(D, A, B, Q, this, Z).then((F) => {
                if (F === null) return F;
                let I = {
                    ...Z.getPropagationContext(),
                    ...Q ? Q.getPropagationContext() : void 0
                };
                if (!(F.contexts && F.contexts.trace) && I) {
                    let {
                        traceId: W,
                        spanId: J,
                        parentSpanId: X,
                        dsc: V
                    } = I;
                    F.contexts = {
                        trace: {
                            trace_id: W,
                            span_id: J,
                            parent_span_id: X
                        },
                        ...F.contexts
                    };
                    let C = V ? V : kF9.getDynamicSamplingContextFromClient(W, this, Q);
                    F.sdkProcessingMetadata = {
                        dynamicSamplingContext: C,
                        ...F.sdkProcessingMetadata
                    }
                }
                return F
            })
        }
        _captureEvent(A, B = {}, Q) {
            return this._processEvent(A, B, Q).then((Z) => {
                return Z.event_id
            }, (Z) => {
                if (BN.DEBUG_BUILD) {
                    let D = Z;
                    if (D.logLevel === "log") c8.logger.log(D.message);
                    else c8.logger.warn(D)
                }
                return
            })
        }
        _processEvent(A, B, Q) {
            let Z = this.getOptions(),
                {
                    sampleRate: D
                } = Z,
                G = if0(A),
                F = pf0(A),
                I = A.type || "error",
                Y = `before send for type \`${I}\``;
            if (F && typeof D === "number" && Math.random() > D) return this.recordDroppedEvent("sample_rate", "error", A), c8.rejectedSyncPromise(new c8.SentryError(`Discarding event because it's not included in the random sample (sampling rate = ${D})`, "log"));
            let W = I === "replay_event" ? "replay" : I,
                X = (A.sdkProcessingMetadata || {}).capturedSpanIsolationScope;
            return this._prepareEvent(A, B, Q, X).then((V) => {
                if (V === null) throw this.recordDroppedEvent("event_processor", W, A), new c8.SentryError("An event processor returned `null`, will not send event.", "log");
                if (B.data && B.data.__sentry__ === !0) return V;
                let K = xF9(Z, V, B);
                return _F9(K, Y)
            }).then((V) => {
                if (V === null) {
                    if (this.recordDroppedEvent("before_send", W, A), G) {
                        let z = 1 + (A.spans || []).length;
                        this.recordDroppedEvent("before_send", "span", z)
                    }
                    throw new c8.SentryError(`${Y} returned \`null\`, will not send event.`, "log")
                }
                let C = Q && Q.getSession();
                if (!G && C) this._updateSessionFromEvent(C, V);
                if (G) {
                    let H = V.sdkProcessingMetadata && V.sdkProcessingMetadata.spanCountBeforeProcessing || 0,
                        z = V.spans ? V.spans.length : 0,
                        $ = H - z;
                    if ($ > 0) this.recordDroppedEvent("before_send", "span", $)
                }
                let K = V.transaction_info;
                if (G && K && V.transaction !== A.transaction) V.transaction_info = {
                    ...K,
                    source: "custom"
                };
                return this.sendEvent(V, B), V
            }).then(null, (V) => {
                if (V instanceof c8.SentryError) throw V;
                throw this.captureException(V, {
                    data: {
                        __sentry__: !0
                    },
                    originalException: V
                }), new c8.SentryError(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${V}`)
            })
        }
        _process(A) {
            this._numProcessing++, A.then((B) => {
                return this._numProcessing--, B
            }, (B) => {
                return this._numProcessing--, B
            })
        }
        _sendEnvelope(A) {
            if (this.emit("beforeEnvelope", A), this._isEnabled() && this._transport) return this._transport.send(A).then(null, (B) => {
                BN.DEBUG_BUILD && c8.logger.error("Error while sending event:", B)
            });
            else BN.DEBUG_BUILD && c8.logger.error("Transport disabled")
        }
        _clearOutcomes() {
            let A = this._outcomes;
            return this._outcomes = {}, Object.keys(A).map((B) => {
                let [Q, Z] = B.split(":");
                return {
                    reason: Q,
                    category: Z,
                    quantity: A[B]
                }
            })
        }
    }

    function _F9(A, B) {
        let Q = `${B} must return \`null\` or a valid event.`;
        if (c8.isThenable(A)) return A.then((Z) => {
            if (!c8.isPlainObject(Z) && Z !== null) throw new c8.SentryError(Q);
            return Z
        }, (Z) => {
            throw new c8.SentryError(`${B} rejected with ${Z}`)
        });
        else if (!c8.isPlainObject(A) && A !== null) throw new c8.SentryError(Q);
        return A
    }

    function xF9(A, B, Q) {
        let {
            beforeSend: Z,
            beforeSendTransaction: D
        } = A;
        if (pf0(B) && Z) return Z(B, Q);
        if (if0(B) && D) {
            if (B.spans) {
                let G = B.spans.length;
                B.sdkProcessingMetadata = {
                    ...B.sdkProcessingMetadata,
                    spanCountBeforeProcessing: G
                }
            }
            return D(B, Q)
        }
        return B
    }

    function pf0(A) {
        return A.type === void 0
    }

    function if0(A) {
        return A.type === "transaction"
    }

    function vF9(A) {
        let B = PF9.getClient();
        if (!B || !B.addEventProcessor) return;
        B.addEventProcessor(A)
    }
    nf0.BaseClient = lf0;
    nf0.addEventProcessor = vF9
});
var cc1 = E((af0) => {
    Object.defineProperty(af0, "__esModule", {
        value: !0
    });
    var dc1 = UA();

    function hF9(A, B, Q, Z, D) {
        let G = {
            sent_at: new Date().toISOString()
        };
        if (Q && Q.sdk) G.sdk = {
            name: Q.sdk.name,
            version: Q.sdk.version
        };
        if (!!Z && !!D) G.dsn = dc1.dsnToString(D);
        if (B) G.trace = dc1.dropUndefinedKeys(B);
        let F = gF9(A);
        return dc1.createEnvelope(G, [F])
    }

    function gF9(A) {
        return [{
            type: "check_in"
        }, A]
    }
    af0.createCheckInEnvelope = hF9
});
var QB1 = E((sf0) => {
    Object.defineProperty(sf0, "__esModule", {
        value: !0
    });
    var mF9 = "c",
        dF9 = "g",
        cF9 = "s",
        lF9 = "d",
        pF9 = 5000,
        iF9 = 1e4,
        nF9 = 1e4;
    sf0.COUNTER_METRIC_TYPE = mF9;
    sf0.DEFAULT_BROWSER_FLUSH_INTERVAL = pF9;
    sf0.DEFAULT_FLUSH_INTERVAL = iF9;
    sf0.DISTRIBUTION_METRIC_TYPE = lF9;
    sf0.GAUGE_METRIC_TYPE = dF9;
    sf0.MAX_WEIGHT = nF9;
    sf0.SET_METRIC_TYPE = cF9
});
var ac1 = E((rf0) => {
    Object.defineProperty(rf0, "__esModule", {
        value: !0
    });
    var BX1 = QB1(),
        BI9 = BB1();
    class lc1 {
        constructor(A) {
            this._value = A
        }
        get weight() {
            return 1
        }
        add(A) {
            this._value += A
        }
        toString() {
            return `${this._value}`
        }
    }
    class pc1 {
        constructor(A) {
            this._last = A, this._min = A, this._max = A, this._sum = A, this._count = 1
        }
        get weight() {
            return 5
        }
        add(A) {
            if (this._last = A, A < this._min) this._min = A;
            if (A > this._max) this._max = A;
            this._sum += A, this._count++
        }
        toString() {
            return `${this._last}:${this._min}:${this._max}:${this._sum}:${this._count}`
        }
    }
    class ic1 {
        constructor(A) {
            this._value = [A]
        }
        get weight() {
            return this._value.length
        }
        add(A) {
            this._value.push(A)
        }
        toString() {
            return this._value.join(":")
        }
    }
    class nc1 {
        constructor(A) {
            this.first = A, this._value = new Set([A])
        }
        get weight() {
            return this._value.size
        }
        add(A) {
            this._value.add(A)
        }
        toString() {
            return Array.from(this._value).map((A) => typeof A === "string" ? BI9.simpleHash(A) : A).join(":")
        }
    }
    var QI9 = {
        [BX1.COUNTER_METRIC_TYPE]: lc1,
        [BX1.GAUGE_METRIC_TYPE]: pc1,
        [BX1.DISTRIBUTION_METRIC_TYPE]: ic1,
        [BX1.SET_METRIC_TYPE]: nc1
    };
    rf0.CounterMetric = lc1;
    rf0.DistributionMetric = ic1;
    rf0.GaugeMetric = pc1;
    rf0.METRIC_MAP = QI9;
    rf0.SetMetric = nc1
});
var Ah0 = E((ef0) => {
    Object.defineProperty(ef0, "__esModule", {
        value: !0
    });
    var of0 = UA(),
        ZB1 = QB1(),
        YI9 = ac1(),
        WI9 = t21(),
        QX1 = BB1();
    class tf0 {
        constructor(A) {
            if (this._client = A, this._buckets = new Map, this._bucketsTotalWeight = 0, this._interval = setInterval(() => this._flush(), ZB1.DEFAULT_FLUSH_INTERVAL), this._interval.unref) this._interval.unref();
            this._flushShift = Math.floor(Math.random() * ZB1.DEFAULT_FLUSH_INTERVAL / 1000), this._forceFlush = !1
        }
        add(A, B, Q, Z = "none", D = {}, G = of0.timestampInSeconds()) {
            let F = Math.floor(G),
                I = QX1.sanitizeMetricKey(B),
                Y = QX1.sanitizeTags(D),
                W = QX1.sanitizeUnit(Z),
                J = QX1.getBucketKey(A, I, W, Y),
                X = this._buckets.get(J),
                V = X && A === ZB1.SET_METRIC_TYPE ? X.metric.weight : 0;
            if (X) {
                if (X.metric.add(Q), X.timestamp < F) X.timestamp = F
            } else X = {
                metric: new YI9.METRIC_MAP[A](Q),
                timestamp: F,
                metricType: A,
                name: I,
                unit: W,
                tags: Y
            }, this._buckets.set(J, X);
            let C = typeof Q === "string" ? X.metric.weight - V : Q;
            if (WI9.updateMetricSummaryOnActiveSpan(A, I, C, W, D, J), this._bucketsTotalWeight += X.metric.weight, this._bucketsTotalWeight >= ZB1.MAX_WEIGHT) this.flush()
        }
        flush() {
            this._forceFlush = !0, this._flush()
        }
        close() {
            this._forceFlush = !0, clearInterval(this._interval), this._flush()
        }
        _flush() {
            if (this._forceFlush) {
                this._forceFlush = !1, this._bucketsTotalWeight = 0, this._captureMetrics(this._buckets), this._buckets.clear();
                return
            }
            let A = Math.floor(of0.timestampInSeconds()) - ZB1.DEFAULT_FLUSH_INTERVAL / 1000 - this._flushShift,
                B = new Map;
            for (let [Q, Z] of this._buckets)
                if (Z.timestamp <= A) B.set(Q, Z), this._bucketsTotalWeight -= Z.metric.weight;
            for (let [Q] of B) this._buckets.delete(Q);
            this._captureMetrics(B)
        }
        _captureMetrics(A) {
            if (A.size > 0 && this._client.captureAggregateMetrics) {
                let B = Array.from(A).map(([, Q]) => Q);
                this._client.captureAggregateMetrics(B)
            }
        }
    }
    ef0.MetricsAggregator = tf0
});