/* chunk:11 bytes:[172634, 192391) size:19757 source:unpacked-cli.js */
var aJ1 = E((qf0) => {
    Object.defineProperty(qf0, "__esModule", {
        value: !0
    });
    var ul = UA(),
        iJ1 = vG(),
        sD9 = eq(),
        rD9 = t21(),
        AB1 = e21(),
        nJ1 = ZV(),
        Uf0 = Pf(),
        wf0 = pJ1(),
        oD9 = lJ1();
    class $f0 extends wf0.Span {
        constructor(A, B) {
            super(A);
            this._contexts = {}, this._hub = B || sD9.getCurrentHub(), this._name = A.name || "", this._metadata = {
                ...A.metadata
            }, this._trimEnd = A.trimEnd, this.transaction = this;
            let Q = this._metadata.dynamicSamplingContext;
            if (Q) this._frozenDynamicSamplingContext = {
                ...Q
            }
        }
        get name() {
            return this._name
        }
        set name(A) {
            this.setName(A)
        }
        get metadata() {
            return {
                source: "custom",
                spanMetadata: {},
                ...this._metadata,
                ...this._attributes[AB1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] && {
                    source: this._attributes[AB1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]
                },
                ...this._attributes[AB1.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE] && {
                    sampleRate: this._attributes[AB1.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]
                }
            }
        }
        set metadata(A) {
            this._metadata = A
        }
        setName(A, B = "custom") {
            this._name = A, this.setAttribute(AB1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, B)
        }
        updateName(A) {
            return this._name = A, this
        }
        initSpanRecorder(A = 1000) {
            if (!this.spanRecorder) this.spanRecorder = new wf0.SpanRecorder(A);
            this.spanRecorder.add(this)
        }
        setContext(A, B) {
            if (B === null) delete this._contexts[A];
            else this._contexts[A] = B
        }
        setMeasurement(A, B, Q = "") {
            this._measurements[A] = {
                value: B,
                unit: Q
            }
        }
        setMetadata(A) {
            this._metadata = {
                ...this._metadata,
                ...A
            }
        }
        end(A) {
            let B = nJ1.spanTimeInputToSeconds(A),
                Q = this._finishTransaction(B);
            if (!Q) return;
            return this._hub.captureEvent(Q)
        }
        toContext() {
            let A = super.toContext();
            return ul.dropUndefinedKeys({
                ...A,
                name: this._name,
                trimEnd: this._trimEnd
            })
        }
        updateWithContext(A) {
            return super.updateWithContext(A), this._name = A.name || "", this._trimEnd = A.trimEnd, this
        }
        getDynamicSamplingContext() {
            return Uf0.getDynamicSamplingContextFromSpan(this)
        }
        setHub(A) {
            this._hub = A
        }
        getProfileId() {
            if (this._contexts !== void 0 && this._contexts.profile !== void 0) return this._contexts.profile.profile_id;
            return
        }
        _finishTransaction(A) {
            if (this._endTime !== void 0) return;
            if (!this._name) iJ1.DEBUG_BUILD && ul.logger.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this._name = "<unlabeled transaction>";
            super.end(A);
            let B = this._hub.getClient();
            if (B && B.emit) B.emit("finishTransaction", this);
            if (this._sampled !== !0) {
                if (iJ1.DEBUG_BUILD && ul.logger.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."), B) B.recordDroppedEvent("sample_rate", "transaction");
                return
            }
            let Q = this.spanRecorder ? this.spanRecorder.spans.filter((W) => W !== this && nJ1.spanToJSON(W).timestamp) : [];
            if (this._trimEnd && Q.length > 0) {
                let W = Q.map((J) => nJ1.spanToJSON(J).timestamp).filter(Boolean);
                this._endTime = W.reduce((J, X) => {
                    return J > X ? J : X
                })
            }
            let {
                scope: Z,
                isolationScope: D
            } = oD9.getCapturedScopesOnSpan(this), {
                metadata: G
            } = this, {
                source: F
            } = G, I = {
                contexts: {
                    ...this._contexts,
                    trace: nJ1.spanToTraceContext(this)
                },
                spans: Q,
                start_timestamp: this._startTime,
                tags: this.tags,
                timestamp: this._endTime,
                transaction: this._name,
                type: "transaction",
                sdkProcessingMetadata: {
                    ...G,
                    capturedSpanScope: Z,
                    capturedSpanIsolationScope: D,
                    ...ul.dropUndefinedKeys({
                        dynamicSamplingContext: Uf0.getDynamicSamplingContextFromSpan(this)
                    })
                },
                _metrics_summary: rD9.getMetricSummaryJsonForSpan(this),
                ...F && {
                    transaction_info: {
                        source: F
                    }
                }
            };
            if (Object.keys(this._measurements).length > 0) iJ1.DEBUG_BUILD && ul.logger.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2)), I.measurements = this._measurements;
            return iJ1.DEBUG_BUILD && ul.logger.log(`[Tracing] Finishing ${this.op} transaction: ${this._name}.`), I
        }
    }
    qf0.Transaction = $f0
});
var _c1 = E((Lf0) => {
    Object.defineProperty(Lf0, "__esModule", {
        value: !0
    });
    var fW = UA(),
        DV = vG(),
        sJ1 = ZV(),
        eD9 = pJ1(),
        AG9 = aJ1(),
        rJ1 = {
            idleTimeout: 1000,
            finalTimeout: 30000,
            heartbeatInterval: 5000
        },
        BG9 = "finishReason",
        ml = ["heartbeatFailed", "idleTimeout", "documentHidden", "finalTimeout", "externalFinish", "cancelled"];
    class yc1 extends eD9.SpanRecorder {
        constructor(A, B, Q, Z) {
            super(Z);
            this._pushActivity = A, this._popActivity = B, this.transactionSpanId = Q
        }
        add(A) {
            if (A.spanContext().spanId !== this.transactionSpanId) {
                let B = A.end;
                if (A.end = (...Q) => {
                        return this._popActivity(A.spanContext().spanId), B.apply(A, Q)
                    }, sJ1.spanToJSON(A).timestamp === void 0) this._pushActivity(A.spanContext().spanId)
            }
            super.add(A)
        }
    }
    class Nf0 extends AG9.Transaction {
        constructor(A, B, Q = rJ1.idleTimeout, Z = rJ1.finalTimeout, D = rJ1.heartbeatInterval, G = !1, F = !1) {
            super(A, B);
            if (this._idleHub = B, this._idleTimeout = Q, this._finalTimeout = Z, this._heartbeatInterval = D, this._onScope = G, this.activities = {}, this._heartbeatCounter = 0, this._finished = !1, this._idleTimeoutCanceledPermanently = !1, this._beforeFinishCallbacks = [], this._finishReason = ml[4], this._autoFinishAllowed = !F, G) DV.DEBUG_BUILD && fW.logger.log(`Setting idle transaction on scope. Span ID: ${this.spanContext().spanId}`), B.getScope().setSpan(this);
            if (!F) this._restartIdleTimeout();
            setTimeout(() => {
                if (!this._finished) this.setStatus("deadline_exceeded"), this._finishReason = ml[3], this.end()
            }, this._finalTimeout)
        }
        end(A) {
            let B = sJ1.spanTimeInputToSeconds(A);
            if (this._finished = !0, this.activities = {}, this.op === "ui.action.click") this.setAttribute(BG9, this._finishReason);
            if (this.spanRecorder) {
                DV.DEBUG_BUILD && fW.logger.log("[Tracing] finishing IdleTransaction", new Date(B * 1000).toISOString(), this.op);
                for (let Q of this._beforeFinishCallbacks) Q(this, B);
                this.spanRecorder.spans = this.spanRecorder.spans.filter((Q) => {
                    if (Q.spanContext().spanId === this.spanContext().spanId) return !0;
                    if (!sJ1.spanToJSON(Q).timestamp) Q.setStatus("cancelled"), Q.end(B), DV.DEBUG_BUILD && fW.logger.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(Q, void 0, 2));
                    let {
                        start_timestamp: Z,
                        timestamp: D
                    } = sJ1.spanToJSON(Q), G = Z && Z < B, F = (this._finalTimeout + this._idleTimeout) / 1000, I = D && Z && D - Z < F;
                    if (DV.DEBUG_BUILD) {
                        let Y = JSON.stringify(Q, void 0, 2);
                        if (!G) fW.logger.log("[Tracing] discarding Span since it happened after Transaction was finished", Y);
                        else if (!I) fW.logger.log("[Tracing] discarding Span since it finished after Transaction final timeout", Y)
                    }
                    return G && I
                }), DV.DEBUG_BUILD && fW.logger.log("[Tracing] flushing IdleTransaction")
            } else DV.DEBUG_BUILD && fW.logger.log("[Tracing] No active IdleTransaction");
            if (this._onScope) {
                let Q = this._idleHub.getScope();
                if (Q.getTransaction() === this) Q.setSpan(void 0)
            }
            return super.end(A)
        }
        registerBeforeFinishCallback(A) {
            this._beforeFinishCallbacks.push(A)
        }
        initSpanRecorder(A) {
            if (!this.spanRecorder) {
                let B = (Z) => {
                        if (this._finished) return;
                        this._pushActivity(Z)
                    },
                    Q = (Z) => {
                        if (this._finished) return;
                        this._popActivity(Z)
                    };
                this.spanRecorder = new yc1(B, Q, this.spanContext().spanId, A), DV.DEBUG_BUILD && fW.logger.log("Starting heartbeat"), this._pingHeartbeat()
            }
            this.spanRecorder.add(this)
        }
        cancelIdleTimeout(A, {
            restartOnChildSpanChange: B
        } = {
            restartOnChildSpanChange: !0
        }) {
            if (this._idleTimeoutCanceledPermanently = B === !1, this._idleTimeoutID) {
                if (clearTimeout(this._idleTimeoutID), this._idleTimeoutID = void 0, Object.keys(this.activities).length === 0 && this._idleTimeoutCanceledPermanently) this._finishReason = ml[5], this.end(A)
            }
        }
        setFinishReason(A) {
            this._finishReason = A
        }
        sendAutoFinishSignal() {
            if (!this._autoFinishAllowed) DV.DEBUG_BUILD && fW.logger.log("[Tracing] Received finish signal for idle transaction."), this._restartIdleTimeout(), this._autoFinishAllowed = !0
        }
        _restartIdleTimeout(A) {
            this.cancelIdleTimeout(), this._idleTimeoutID = setTimeout(() => {
                if (!this._finished && Object.keys(this.activities).length === 0) this._finishReason = ml[1], this.end(A)
            }, this._idleTimeout)
        }
        _pushActivity(A) {
            this.cancelIdleTimeout(void 0, {
                restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently
            }), DV.DEBUG_BUILD && fW.logger.log(`[Tracing] pushActivity: ${A}`), this.activities[A] = !0, DV.DEBUG_BUILD && fW.logger.log("[Tracing] new activities count", Object.keys(this.activities).length)
        }
        _popActivity(A) {
            if (this.activities[A]) DV.DEBUG_BUILD && fW.logger.log(`[Tracing] popActivity ${A}`), delete this.activities[A], DV.DEBUG_BUILD && fW.logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
            if (Object.keys(this.activities).length === 0) {
                let B = fW.timestampInSeconds();
                if (this._idleTimeoutCanceledPermanently) {
                    if (this._autoFinishAllowed) this._finishReason = ml[5], this.end(B)
                } else this._restartIdleTimeout(B + this._idleTimeout / 1000)
            }
        }
        _beat() {
            if (this._finished) return;
            let A = Object.keys(this.activities).join("");
            if (A === this._prevHeartbeatString) this._heartbeatCounter++;
            else this._heartbeatCounter = 1;
            if (this._prevHeartbeatString = A, this._heartbeatCounter >= 3) {
                if (this._autoFinishAllowed) DV.DEBUG_BUILD && fW.logger.log("[Tracing] Transaction finished because of no change for 3 heart beats"), this.setStatus("deadline_exceeded"), this._finishReason = ml[0], this.end()
            } else this._pingHeartbeat()
        }
        _pingHeartbeat() {
            DV.DEBUG_BUILD && fW.logger.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`), setTimeout(() => {
                this._beat()
            }, this._heartbeatInterval)
        }
    }
    Lf0.IdleTransaction = Nf0;
    Lf0.IdleTransactionSpanRecorder = yc1;
    Lf0.TRACING_DEFAULTS = rJ1
});
var xc1 = E((Rf0) => {
    Object.defineProperty(Rf0, "__esModule", {
        value: !0
    });
    var kf = UA(),
        dl = vG(),
        oJ1 = e21(),
        GG9 = uJ1(),
        FG9 = ZV();

    function IG9(A, B, Q) {
        if (!GG9.hasTracingEnabled(B)) return A.sampled = !1, A;
        if (A.sampled !== void 0) return A.setAttribute(oJ1.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(A.sampled)), A;
        let Z;
        if (typeof B.tracesSampler === "function") Z = B.tracesSampler(Q), A.setAttribute(oJ1.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(Z));
        else if (Q.parentSampled !== void 0) Z = Q.parentSampled;
        else if (typeof B.tracesSampleRate !== "undefined") Z = B.tracesSampleRate, A.setAttribute(oJ1.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(Z));
        else Z = 1, A.setAttribute(oJ1.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Z);
        if (!Mf0(Z)) return dl.DEBUG_BUILD && kf.logger.warn("[Tracing] Discarding transaction because of invalid sample rate."), A.sampled = !1, A;
        if (!Z) return dl.DEBUG_BUILD && kf.logger.log(`[Tracing] Discarding transaction because ${typeof B.tracesSampler==="function"?"tracesSampler returned 0 or false":"a negative sampling decision was inherited or tracesSampleRate is set to 0"}`), A.sampled = !1, A;
        if (A.sampled = Math.random() < Z, !A.sampled) return dl.DEBUG_BUILD && kf.logger.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(Z)})`), A;
        return dl.DEBUG_BUILD && kf.logger.log(`[Tracing] starting ${A.op} transaction - ${FG9.spanToJSON(A).description}`), A
    }

    function Mf0(A) {
        if (kf.isNaN(A) || !(typeof A === "number" || typeof A === "boolean")) return dl.DEBUG_BUILD && kf.logger.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(A)} of type ${JSON.stringify(typeof A)}.`), !1;
        if (A < 0 || A > 1) return dl.DEBUG_BUILD && kf.logger.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${A}.`), !1;
        return !0
    }
    Rf0.isValidSampleRate = Mf0;
    Rf0.sampleTransaction = IG9
});
var vc1 = E((Tf0) => {
    Object.defineProperty(Tf0, "__esModule", {
        value: !0
    });
    var JG9 = UA(),
        XG9 = vG(),
        VG9 = eq(),
        CG9 = ZV(),
        KG9 = gJ1(),
        HG9 = _c1(),
        Of0 = xc1(),
        zG9 = aJ1();

    function EG9() {
        let B = this.getScope().getSpan();
        return B ? {
            "sentry-trace": CG9.spanToTraceHeader(B)
        } : {}
    }

    function UG9(A, B) {
        let Q = this.getClient(),
            Z = Q && Q.getOptions() || {},
            D = Z.instrumenter || "sentry",
            G = A.instrumenter || "sentry";
        if (D !== G) XG9.DEBUG_BUILD && JG9.logger.error(`A transaction was started with instrumenter=\`${G}\`, but the SDK is configured with the \`${D}\` instrumenter.
The transaction will not be sampled. Please use the ${D} instrumentation to start transactions.`), A.sampled = !1;
        let F = new zG9.Transaction(A, this);
        if (F = Of0.sampleTransaction(F, Z, {
                name: A.name,
                parentSampled: A.parentSampled,
                transactionContext: A,
                attributes: {
                    ...A.data,
                    ...A.attributes
                },
                ...B
            }), F.isRecording()) F.initSpanRecorder(Z._experiments && Z._experiments.maxSpans);
        if (Q && Q.emit) Q.emit("startTransaction", F);
        return F
    }

    function wG9(A, B, Q, Z, D, G, F, I = !1) {
        let Y = A.getClient(),
            W = Y && Y.getOptions() || {},
            J = new HG9.IdleTransaction(B, A, Q, Z, F, D, I);
        if (J = Of0.sampleTransaction(J, W, {
                name: B.name,
                parentSampled: B.parentSampled,
                transactionContext: B,
                attributes: {
                    ...B.data,
                    ...B.attributes
                },
                ...G
            }), J.isRecording()) J.initSpanRecorder(W._experiments && W._experiments.maxSpans);
        if (Y && Y.emit) Y.emit("startTransaction", J);
        return J
    }

    function $G9() {
        let A = VG9.getMainCarrier();
        if (!A.__SENTRY__) return;
        if (A.__SENTRY__.extensions = A.__SENTRY__.extensions || {}, !A.__SENTRY__.extensions.startTransaction) A.__SENTRY__.extensions.startTransaction = UG9;
        if (!A.__SENTRY__.extensions.traceHeaders) A.__SENTRY__.extensions.traceHeaders = EG9;
        KG9.registerErrorInstrumentation()
    }
    Tf0.addTracingExtensions = $G9;
    Tf0.startIdleTransaction = wG9
});
var Sf0 = E((Pf0) => {
    Object.defineProperty(Pf0, "__esModule", {
        value: !0
    });
    var LG9 = hJ1();

    function MG9(A, B, Q) {
        let Z = LG9.getActiveTransaction();
        if (Z) Z.setMeasurement(A, B, Q)
    }
    Pf0.setMeasurement = MG9
});
var bc1 = E((jf0) => {
    Object.defineProperty(jf0, "__esModule", {
        value: !0
    });
    var cl = UA();

    function OG9(A, B) {
        if (!B) return A;
        return A.sdk = A.sdk || {}, A.sdk.name = A.sdk.name || B.name, A.sdk.version = A.sdk.version || B.version, A.sdk.integrations = [...A.sdk.integrations || [], ...B.integrations || []], A.sdk.packages = [...A.sdk.packages || [], ...B.packages || []], A
    }

    function TG9(A, B, Q, Z) {
        let D = cl.getSdkMetadataForEnvelopeHeader(Q),
            G = {
                sent_at: new Date().toISOString(),
                ...D && {
                    sdk: D
                },
                ...!!Z && B && {
                    dsn: cl.dsnToString(B)
                }
            },
            F = "aggregates" in A ? [{
                type: "sessions"
            }, A] : [{
                type: "session"
            }, A.toJSON()];
        return cl.createEnvelope(G, [F])
    }

    function PG9(A, B, Q, Z) {
        let D = cl.getSdkMetadataForEnvelopeHeader(Q),
            G = A.type && A.type !== "replay_event" ? A.type : "event";
        OG9(A, Q && Q.sdk);
        let F = cl.createEventEnvelopeHeaders(A, D, Z, B);
        delete A.sdkProcessingMetadata;
        let I = [{
            type: G
        }, A];
        return cl.createEnvelope(F, [I])
    }
    jf0.createEventEnvelope = PG9;
    jf0.createSessionEnvelope = TG9
});