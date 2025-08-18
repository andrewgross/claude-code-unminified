/* chunk:10 bytes:[156201, 172633) size:16432 source:unpacked-cli.js */
var lJ1 = E((Jf0) => {
    Object.defineProperty(Jf0, "__esModule", {
        value: !0
    });
    var r21 = UA(),
        VD9 = vG(),
        rj = eq(),
        mJ1 = ZV();
    gJ1();
    fl();
    var CD9 = Pf(),
        hl = sH(),
        jc1 = Sc1(),
        Gf0 = uJ1();

    function KD9(A, B, Q = () => {}, Z = () => {}) {
        let D = rj.getCurrentHub(),
            G = hl.getCurrentScope(),
            F = G.getSpan(),
            I = cJ1(A),
            Y = dJ1(D, {
                parentSpan: F,
                spanContext: I,
                forceTransaction: !1,
                scope: G
            });
        return G.setSpan(Y), jc1.handleCallbackErrors(() => B(Y), (W) => {
            Y && Y.setStatus("internal_error"), Q(W, Y)
        }, () => {
            Y && Y.end(), G.setSpan(F), Z()
        })
    }

    function Ff0(A, B) {
        let Q = cJ1(A);
        return rj.runWithAsyncContext(() => {
            return hl.withScope(A.scope, (Z) => {
                let D = rj.getCurrentHub(),
                    G = Z.getSpan(),
                    I = A.onlyIfParent && !G ? void 0 : dJ1(D, {
                        parentSpan: G,
                        spanContext: Q,
                        forceTransaction: A.forceTransaction,
                        scope: Z
                    });
                return jc1.handleCallbackErrors(() => B(I), () => {
                    if (I) {
                        let {
                            status: Y
                        } = mJ1.spanToJSON(I);
                        if (!Y || Y === "ok") I.setStatus("internal_error")
                    }
                }, () => I && I.end())
            })
        })
    }
    var HD9 = Ff0;

    function zD9(A, B) {
        let Q = cJ1(A);
        return rj.runWithAsyncContext(() => {
            return hl.withScope(A.scope, (Z) => {
                let D = rj.getCurrentHub(),
                    G = Z.getSpan(),
                    I = A.onlyIfParent && !G ? void 0 : dJ1(D, {
                        parentSpan: G,
                        spanContext: Q,
                        forceTransaction: A.forceTransaction,
                        scope: Z
                    });

                function Y() {
                    I && I.end()
                }
                return jc1.handleCallbackErrors(() => B(I, Y), () => {
                    if (I && I.isRecording()) {
                        let {
                            status: W
                        } = mJ1.spanToJSON(I);
                        if (!W || W === "ok") I.setStatus("internal_error")
                    }
                })
            })
        })
    }

    function ED9(A) {
        if (!Gf0.hasTracingEnabled()) return;
        let B = cJ1(A),
            Q = rj.getCurrentHub(),
            Z = A.scope ? A.scope.getSpan() : If0();
        if (A.onlyIfParent && !Z) return;
        let F = (A.scope || hl.getCurrentScope()).clone();
        return dJ1(Q, {
            parentSpan: Z,
            spanContext: B,
            forceTransaction: A.forceTransaction,
            scope: F
        })
    }

    function If0() {
        return hl.getCurrentScope().getSpan()
    }
    var UD9 = ({
        sentryTrace: A,
        baggage: B
    }, Q) => {
        let Z = hl.getCurrentScope(),
            {
                traceparentData: D,
                dynamicSamplingContext: G,
                propagationContext: F
            } = r21.tracingContextFromHeaders(A, B);
        if (Z.setPropagationContext(F), VD9.DEBUG_BUILD && D) r21.logger.log(`[Tracing] Continuing trace ${D.traceId}.`);
        let I = {
            ...D,
            metadata: r21.dropUndefinedKeys({
                dynamicSamplingContext: G
            })
        };
        if (!Q) return I;
        return rj.runWithAsyncContext(() => {
            return Q(I)
        })
    };

    function dJ1(A, {
        parentSpan: B,
        spanContext: Q,
        forceTransaction: Z,
        scope: D
    }) {
        if (!Gf0.hasTracingEnabled()) return;
        let G = rj.getIsolationScope(),
            F;
        if (B && !Z) F = B.startChild(Q);
        else if (B) {
            let I = CD9.getDynamicSamplingContextFromSpan(B),
                {
                    traceId: Y,
                    spanId: W
                } = B.spanContext(),
                J = mJ1.spanIsSampled(B);
            F = A.startTransaction({
                traceId: Y,
                parentSpanId: W,
                parentSampled: J,
                ...Q,
                metadata: {
                    dynamicSamplingContext: I,
                    ...Q.metadata
                }
            })
        } else {
            let {
                traceId: I,
                dsc: Y,
                parentSpanId: W,
                sampled: J
            } = {
                ...G.getPropagationContext(),
                ...D.getPropagationContext()
            };
            F = A.startTransaction({
                traceId: I,
                parentSpanId: W,
                parentSampled: J,
                ...Q,
                metadata: {
                    dynamicSamplingContext: Y,
                    ...Q.metadata
                }
            })
        }
        return D.setSpan(F), wD9(F, D, G), F
    }

    function cJ1(A) {
        if (A.startTime) {
            let B = {
                ...A
            };
            return B.startTimestamp = mJ1.spanTimeInputToSeconds(A.startTime), delete B.startTime, B
        }
        return A
    }
    var Yf0 = "_sentryScope",
        Wf0 = "_sentryIsolationScope";

    function wD9(A, B, Q) {
        if (A) r21.addNonEnumerableProperty(A, Wf0, Q), r21.addNonEnumerableProperty(A, Yf0, B)
    }

    function $D9(A) {
        return {
            scope: A[Yf0],
            isolationScope: A[Wf0]
        }
    }
    Jf0.continueTrace = UD9;
    Jf0.getActiveSpan = If0;
    Jf0.getCapturedScopesOnSpan = $D9;
    Jf0.startActiveSpan = HD9;
    Jf0.startInactiveSpan = ED9;
    Jf0.startSpan = Ff0;
    Jf0.startSpanManual = zD9;
    Jf0.trace = KD9
});
var t21 = E((Vf0) => {
    Object.defineProperty(Vf0, "__esModule", {
        value: !0
    });
    var SD9 = UA();
    vG();
    gJ1();
    fl();
    var jD9 = lJ1(),
        o21;

    function Xf0(A) {
        return o21 ? o21.get(A) : void 0
    }

    function kD9(A) {
        let B = Xf0(A);
        if (!B) return;
        let Q = {};
        for (let [, [Z, D]] of B) {
            if (!Q[Z]) Q[Z] = [];
            Q[Z].push(SD9.dropUndefinedKeys(D))
        }
        return Q
    }

    function yD9(A, B, Q, Z, D, G) {
        let F = jD9.getActiveSpan();
        if (F) {
            let I = Xf0(F) || new Map,
                Y = `${A}:${B}@${Z}`,
                W = I.get(G);
            if (W) {
                let [, J] = W;
                I.set(G, [Y, {
                    min: Math.min(J.min, Q),
                    max: Math.max(J.max, Q),
                    count: J.count += 1,
                    sum: J.sum += Q,
                    tags: J.tags
                }])
            } else I.set(G, [Y, {
                min: Q,
                max: Q,
                count: 1,
                sum: Q,
                tags: D
            }]);
            if (!o21) o21 = new WeakMap;
            o21.set(F, I)
        }
    }
    Vf0.getMetricSummaryJsonForSpan = kD9;
    Vf0.updateMetricSummaryOnActiveSpan = yD9
});
var e21 = E((Cf0) => {
    Object.defineProperty(Cf0, "__esModule", {
        value: !0
    });
    var vD9 = "sentry.source",
        bD9 = "sentry.sample_rate",
        fD9 = "sentry.op",
        hD9 = "sentry.origin",
        gD9 = "profile_id";
    Cf0.SEMANTIC_ATTRIBUTE_PROFILE_ID = gD9;
    Cf0.SEMANTIC_ATTRIBUTE_SENTRY_OP = fD9;
    Cf0.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = hD9;
    Cf0.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = bD9;
    Cf0.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = vD9
});
var pJ1 = E((Ef0) => {
    Object.defineProperty(Ef0, "__esModule", {
        value: !0
    });
    var jf = UA(),
        Kf0 = vG(),
        pD9 = t21(),
        HO = e21(),
        Hf0 = xl(),
        gl = ZV(),
        iD9 = fl();
    class zf0 {
        constructor(A = 1000) {
            this._maxlen = A, this.spans = []
        }
        add(A) {
            if (this.spans.length > this._maxlen) A.spanRecorder = void 0;
            else this.spans.push(A)
        }
    }
    class kc1 {
        constructor(A = {}) {
            if (this._traceId = A.traceId || jf.uuid4(), this._spanId = A.spanId || jf.uuid4().substring(16), this._startTime = A.startTimestamp || jf.timestampInSeconds(), this.tags = A.tags ? {
                    ...A.tags
                } : {}, this.data = A.data ? {
                    ...A.data
                } : {}, this.instrumenter = A.instrumenter || "sentry", this._attributes = {}, this.setAttributes({
                    [HO.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: A.origin || "manual",
                    [HO.SEMANTIC_ATTRIBUTE_SENTRY_OP]: A.op,
                    ...A.attributes
                }), this._name = A.name || A.description, A.parentSpanId) this._parentSpanId = A.parentSpanId;
            if ("sampled" in A) this._sampled = A.sampled;
            if (A.status) this._status = A.status;
            if (A.endTimestamp) this._endTime = A.endTimestamp;
            if (A.exclusiveTime !== void 0) this._exclusiveTime = A.exclusiveTime;
            this._measurements = A.measurements ? {
                ...A.measurements
            } : {}
        }
        get name() {
            return this._name || ""
        }
        set name(A) {
            this.updateName(A)
        }
        get description() {
            return this._name
        }
        set description(A) {
            this._name = A
        }
        get traceId() {
            return this._traceId
        }
        set traceId(A) {
            this._traceId = A
        }
        get spanId() {
            return this._spanId
        }
        set spanId(A) {
            this._spanId = A
        }
        set parentSpanId(A) {
            this._parentSpanId = A
        }
        get parentSpanId() {
            return this._parentSpanId
        }
        get sampled() {
            return this._sampled
        }
        set sampled(A) {
            this._sampled = A
        }
        get attributes() {
            return this._attributes
        }
        set attributes(A) {
            this._attributes = A
        }
        get startTimestamp() {
            return this._startTime
        }
        set startTimestamp(A) {
            this._startTime = A
        }
        get endTimestamp() {
            return this._endTime
        }
        set endTimestamp(A) {
            this._endTime = A
        }
        get status() {
            return this._status
        }
        set status(A) {
            this._status = A
        }
        get op() {
            return this._attributes[HO.SEMANTIC_ATTRIBUTE_SENTRY_OP]
        }
        set op(A) {
            this.setAttribute(HO.SEMANTIC_ATTRIBUTE_SENTRY_OP, A)
        }
        get origin() {
            return this._attributes[HO.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]
        }
        set origin(A) {
            this.setAttribute(HO.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, A)
        }
        spanContext() {
            let {
                _spanId: A,
                _traceId: B,
                _sampled: Q
            } = this;
            return {
                spanId: A,
                traceId: B,
                traceFlags: Q ? gl.TRACE_FLAG_SAMPLED : gl.TRACE_FLAG_NONE
            }
        }
        startChild(A) {
            let B = new kc1({
                ...A,
                parentSpanId: this._spanId,
                sampled: this._sampled,
                traceId: this._traceId
            });
            if (B.spanRecorder = this.spanRecorder, B.spanRecorder) B.spanRecorder.add(B);
            let Q = Hf0.getRootSpan(this);
            if (B.transaction = Q, Kf0.DEBUG_BUILD && Q) {
                let Z = A && A.op || "< unknown op >",
                    D = gl.spanToJSON(B).description || "< unknown name >",
                    G = Q.spanContext().spanId,
                    F = `[Tracing] Starting '${Z}' span on transaction '${D}' (${G}).`;
                jf.logger.log(F), this._logMessage = F
            }
            return B
        }
        setTag(A, B) {
            return this.tags = {
                ...this.tags,
                [A]: B
            }, this
        }
        setData(A, B) {
            return this.data = {
                ...this.data,
                [A]: B
            }, this
        }
        setAttribute(A, B) {
            if (B === void 0) delete this._attributes[A];
            else this._attributes[A] = B
        }
        setAttributes(A) {
            Object.keys(A).forEach((B) => this.setAttribute(B, A[B]))
        }
        setStatus(A) {
            return this._status = A, this
        }
        setHttpStatus(A) {
            return iD9.setHttpStatus(this, A), this
        }
        setName(A) {
            this.updateName(A)
        }
        updateName(A) {
            return this._name = A, this
        }
        isSuccess() {
            return this._status === "ok"
        }
        finish(A) {
            return this.end(A)
        }
        end(A) {
            if (this._endTime) return;
            let B = Hf0.getRootSpan(this);
            if (Kf0.DEBUG_BUILD && B && B.spanContext().spanId !== this._spanId) {
                let Q = this._logMessage;
                if (Q) jf.logger.log(Q.replace("Starting", "Finishing"))
            }
            this._endTime = gl.spanTimeInputToSeconds(A)
        }
        toTraceparent() {
            return gl.spanToTraceHeader(this)
        }
        toContext() {
            return jf.dropUndefinedKeys({
                data: this._getData(),
                description: this._name,
                endTimestamp: this._endTime,
                op: this.op,
                parentSpanId: this._parentSpanId,
                sampled: this._sampled,
                spanId: this._spanId,
                startTimestamp: this._startTime,
                status: this._status,
                tags: this.tags,
                traceId: this._traceId
            })
        }
        updateWithContext(A) {
            return this.data = A.data || {}, this._name = A.name || A.description, this._endTime = A.endTimestamp, this.op = A.op, this._parentSpanId = A.parentSpanId, this._sampled = A.sampled, this._spanId = A.spanId || this._spanId, this._startTime = A.startTimestamp || this._startTime, this._status = A.status, this.tags = A.tags || {}, this._traceId = A.traceId || this._traceId, this
        }
        getTraceContext() {
            return gl.spanToTraceContext(this)
        }
        getSpanJSON() {
            return jf.dropUndefinedKeys({
                data: this._getData(),
                description: this._name,
                op: this._attributes[HO.SEMANTIC_ATTRIBUTE_SENTRY_OP],
                parent_span_id: this._parentSpanId,
                span_id: this._spanId,
                start_timestamp: this._startTime,
                status: this._status,
                tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
                timestamp: this._endTime,
                trace_id: this._traceId,
                origin: this._attributes[HO.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
                _metrics_summary: pD9.getMetricSummaryJsonForSpan(this),
                profile_id: this._attributes[HO.SEMANTIC_ATTRIBUTE_PROFILE_ID],
                exclusive_time: this._exclusiveTime,
                measurements: Object.keys(this._measurements).length > 0 ? this._measurements : void 0
            })
        }
        isRecording() {
            return !this._endTime && !!this._sampled
        }
        toJSON() {
            return this.getSpanJSON()
        }
        _getData() {
            let {
                data: A,
                _attributes: B
            } = this, Q = Object.keys(A).length > 0, Z = Object.keys(B).length > 0;
            if (!Q && !Z) return;
            if (Q && Z) return {
                ...A,
                ...B
            };
            return Q ? A : B
        }
    }
    Ef0.Span = kc1;
    Ef0.SpanRecorder = zf0
});