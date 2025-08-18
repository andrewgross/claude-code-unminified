/* chunk:354 bytes:[8346661, 8364424) size:17763 source:unpacked-cli.js */
var mV0 = E((_AB) => {
    Object.defineProperty(_AB, "__esModule", {
        value: !0
    });
    _AB.PrometheusSerializer = void 0;
    var jN6 = XQ(),
        qm = Bx(),
        jAB = f3();

    function jS1(A) {
        return A.replace(/\\/g, "\\\\").replace(/\n/g, "\\n")
    }

    function kAB(A = "") {
        if (typeof A !== "string") A = JSON.stringify(A);
        return jS1(A).replace(/"/g, "\\\"")
    }
    var kN6 = /[^a-z0-9_]/gi,
        yN6 = /_{2,}/g;

    function uV0(A) {
        return A.replace(kN6, "_").replace(yN6, "_")
    }

    function gV0(A, B) {
        if (!A.endsWith("_total") && B.dataPointType === qm.DataPointType.SUM && B.isMonotonic) A = A + "_total";
        return A
    }

    function _N6(A) {
        if (A === 1 / 0) return "+Inf";
        else if (A === -1 / 0) return "-Inf";
        else return `${A}`
    }

    function xN6(A) {
        switch (A.dataPointType) {
            case qm.DataPointType.SUM:
                if (A.isMonotonic) return "counter";
                return "gauge";
            case qm.DataPointType.GAUGE:
                return "gauge";
            case qm.DataPointType.HISTOGRAM:
                return "histogram";
            default:
                return "untyped"
        }
    }

    function SS1(A, B, Q, Z, D) {
        let G = !1,
            F = "";
        for (let [I, Y] of Object.entries(B)) {
            let W = uV0(I);
            G = !0, F += `${F.length>0?",":""}${W}="${kAB(Y)}"`
        }
        if (D)
            for (let [I, Y] of Object.entries(D)) {
                let W = uV0(I);
                G = !0, F += `${F.length>0?",":""}${W}="${kAB(Y)}"`
            }
        if (G) A += `{${F}}`;
        return `${A} ${_N6(Q)}${Z!==void 0?" "+String(Z):""}
`
    }
    var vN6 = "# no registered metrics";
    class yAB {
        _prefix;
        _appendTimestamp;
        _additionalAttributes;
        _withResourceConstantLabels;
        constructor(A, B = !1, Q) {
            if (A) this._prefix = A + "_";
            this._appendTimestamp = B, this._withResourceConstantLabels = Q
        }
        serialize(A) {
            let B = "";
            this._additionalAttributes = this._filterResourceConstantLabels(A.resource.attributes, this._withResourceConstantLabels);
            for (let Q of A.scopeMetrics) B += this._serializeScopeMetrics(Q);
            if (B === "") B += vN6;
            return this._serializeResource(A.resource) + B
        }
        _filterResourceConstantLabels(A, B) {
            if (B) {
                let Q = {};
                for (let [Z, D] of Object.entries(A))
                    if (Z.match(B)) Q[Z] = D;
                return Q
            }
            return
        }
        _serializeScopeMetrics(A) {
            let B = "";
            for (let Q of A.metrics) B += this._serializeMetricData(Q) + `
`;
            return B
        }
        _serializeMetricData(A) {
            let B = uV0(jS1(A.descriptor.name));
            if (this._prefix) B = `${this._prefix}${B}`;
            let Q = A.dataPointType;
            B = gV0(B, A);
            let Z = `# HELP ${B} ${jS1(A.descriptor.description||"description missing")}`,
                D = A.descriptor.unit ? `
# UNIT ${B} ${jS1(A.descriptor.unit)}` : "",
                G = `# TYPE ${B} ${xN6(A)}`,
                F = "";
            switch (Q) {
                case qm.DataPointType.SUM:
                case qm.DataPointType.GAUGE: {
                    F = A.dataPoints.map((I) => this._serializeSingularDataPoint(B, A, I)).join("");
                    break
                }
                case qm.DataPointType.HISTOGRAM: {
                    F = A.dataPoints.map((I) => this._serializeHistogramDataPoint(B, A, I)).join("");
                    break
                }
                default:
                    jN6.diag.error(`Unrecognizable DataPointType: ${Q} for metric "${B}"`)
            }
            return `${Z}${D}
${G}
${F}`.trim()
        }
        _serializeSingularDataPoint(A, B, Q) {
            let Z = "";
            A = gV0(A, B);
            let {
                value: D,
                attributes: G
            } = Q, F = jAB.hrTimeToMilliseconds(Q.endTime);
            return Z += SS1(A, G, D, this._appendTimestamp ? F : void 0, this._additionalAttributes), Z
        }
        _serializeHistogramDataPoint(A, B, Q) {
            let Z = "";
            A = gV0(A, B);
            let {
                attributes: D,
                value: G
            } = Q, F = jAB.hrTimeToMilliseconds(Q.endTime);
            for (let J of ["count", "sum"]) {
                let X = G[J];
                if (X != null) Z += SS1(A + "_" + J, D, X, this._appendTimestamp ? F : void 0, this._additionalAttributes)
            }
            let I = 0,
                Y = G.buckets.counts.entries(),
                W = !1;
            for (let [J, X] of Y) {
                I += X;
                let V = G.buckets.boundaries[J];
                if (V === void 0 && W) break;
                if (V === 1 / 0) W = !0;
                Z += SS1(A + "_bucket", D, I, this._appendTimestamp ? F : void 0, Object.assign({}, this._additionalAttributes ?? {}, {
                    le: V === void 0 || V === 1 / 0 ? "+Inf" : String(V)
                }))
            }
            return Z
        }
        _serializeResource(A) {
            return `# HELP target_info Target metadata
# TYPE target_info gauge
${SS1("target_info",A.attributes,1).trim()}
`
        }
    }
    _AB.PrometheusSerializer = yAB
});
var fAB = E((vAB) => {
    Object.defineProperty(vAB, "__esModule", {
        value: !0
    });
    vAB.PrometheusExporter = void 0;
    var x71 = XQ(),
        bN6 = f3(),
        dV0 = Bx(),
        fN6 = W1("http"),
        hN6 = mV0(),
        gN6 = W1("url");
    class qx extends dV0.MetricReader {
        static DEFAULT_OPTIONS = {
            host: void 0,
            port: 9464,
            endpoint: "/metrics",
            prefix: "",
            appendTimestamp: !1,
            withResourceConstantLabels: void 0
        };
        _host;
        _port;
        _baseUrl;
        _endpoint;
        _server;
        _prefix;
        _appendTimestamp;
        _serializer;
        _startServerPromise;
        constructor(A = {}, B = () => {}) {
            super({
                aggregationSelector: (Z) => {
                    return {
                        type: dV0.AggregationType.DEFAULT
                    }
                },
                aggregationTemporalitySelector: (Z) => dV0.AggregationTemporality.CUMULATIVE,
                metricProducers: A.metricProducers
            });
            this._host = A.host || process.env.OTEL_EXPORTER_PROMETHEUS_HOST || qx.DEFAULT_OPTIONS.host, this._port = A.port || Number(process.env.OTEL_EXPORTER_PROMETHEUS_PORT) || qx.DEFAULT_OPTIONS.port, this._prefix = A.prefix || qx.DEFAULT_OPTIONS.prefix, this._appendTimestamp = typeof A.appendTimestamp === "boolean" ? A.appendTimestamp : qx.DEFAULT_OPTIONS.appendTimestamp;
            let Q = A.withResourceConstantLabels || qx.DEFAULT_OPTIONS.withResourceConstantLabels;
            if (this._server = fN6.createServer(this._requestHandler).unref(), this._serializer = new hN6.PrometheusSerializer(this._prefix, this._appendTimestamp, Q), this._baseUrl = `http://${this._host}:${this._port}/`, this._endpoint = (A.endpoint || qx.DEFAULT_OPTIONS.endpoint).replace(/^([^/])/, "/$1"), A.preventServerStart !== !0) this.startServer().then(B, (Z) => {
                x71.diag.error(Z), B(Z)
            });
            else if (B) queueMicrotask(B)
        }
        async onForceFlush() {}
        onShutdown() {
            return this.stopServer()
        }
        stopServer() {
            if (!this._server) return x71.diag.debug("Prometheus stopServer() was called but server was never started."), Promise.resolve();
            else return new Promise((A) => {
                this._server.close((B) => {
                    if (!B) x71.diag.debug("Prometheus exporter was stopped");
                    else if (B.code !== "ERR_SERVER_NOT_RUNNING") bN6.globalErrorHandler(B);
                    A()
                })
            })
        }
        startServer() {
            return this._startServerPromise ??= new Promise((A, B) => {
                this._server.once("error", B), this._server.listen({
                    port: this._port,
                    host: this._host
                }, () => {
                    x71.diag.debug(`Prometheus exporter server started: ${this._host}:${this._port}/${this._endpoint}`), A()
                })
            }), this._startServerPromise
        }
        getMetricsRequestHandler(A, B) {
            this._exportMetrics(B)
        }
        _requestHandler = (A, B) => {
            if (A.url != null && new gN6.URL(A.url, this._baseUrl).pathname === this._endpoint) this._exportMetrics(B);
            else this._notFound(B)
        };
        _exportMetrics = (A) => {
            A.statusCode = 200, A.setHeader("content-type", "text/plain"), this.collect().then((B) => {
                let {
                    resourceMetrics: Q,
                    errors: Z
                } = B;
                if (Z.length) x71.diag.error("PrometheusExporter: metrics collection errors", ...Z);
                A.end(this._serializer.serialize(Q))
            }, (B) => {
                A.end(`# failed to export metrics: ${B}`)
            })
        };
        _notFound = (A) => {
            A.statusCode = 404, A.end()
        }
    }
    vAB.PrometheusExporter = qx
});
var hAB = E((kS1) => {
    Object.defineProperty(kS1, "__esModule", {
        value: !0
    });
    kS1.PrometheusSerializer = kS1.PrometheusExporter = void 0;
    var uN6 = fAB();
    Object.defineProperty(kS1, "PrometheusExporter", {
        enumerable: !0,
        get: function() {
            return uN6.PrometheusExporter
        }
    });
    var mN6 = mV0();
    Object.defineProperty(kS1, "PrometheusSerializer", {
        enumerable: !0,
        get: function() {
            return mN6.PrometheusSerializer
        }
    })
});
var cV0 = E((uAB) => {
    Object.defineProperty(uAB, "__esModule", {
        value: !0
    });
    uAB.LogRecord = void 0;
    var cN6 = XQ(),
        tt = XQ(),
        yS1 = f3();
    class gAB {
        hrTime;
        hrTimeObserved;
        spanContext;
        resource;
        instrumentationScope;
        attributes = {};
        _severityText;
        _severityNumber;
        _body;
        totalAttributesCount = 0;
        _isReadonly = !1;
        _logRecordLimits;
        set severityText(A) {
            if (this._isLogRecordReadonly()) return;
            this._severityText = A
        }
        get severityText() {
            return this._severityText
        }
        set severityNumber(A) {
            if (this._isLogRecordReadonly()) return;
            this._severityNumber = A
        }
        get severityNumber() {
            return this._severityNumber
        }
        set body(A) {
            if (this._isLogRecordReadonly()) return;
            this._body = A
        }
        get body() {
            return this._body
        }
        get droppedAttributesCount() {
            return this.totalAttributesCount - Object.keys(this.attributes).length
        }
        constructor(A, B, Q) {
            let {
                timestamp: Z,
                observedTimestamp: D,
                severityNumber: G,
                severityText: F,
                body: I,
                attributes: Y = {},
                context: W
            } = Q, J = Date.now();
            if (this.hrTime = yS1.timeInputToHrTime(Z ?? J), this.hrTimeObserved = yS1.timeInputToHrTime(D ?? J), W) {
                let X = tt.trace.getSpanContext(W);
                if (X && tt.isSpanContextValid(X)) this.spanContext = X
            }
            this.severityNumber = G, this.severityText = F, this.body = I, this.resource = A.resource, this.instrumentationScope = B, this._logRecordLimits = A.logRecordLimits, this.setAttributes(Y)
        }
        setAttribute(A, B) {
            if (this._isLogRecordReadonly()) return this;
            if (B === null) return this;
            if (A.length === 0) return tt.diag.warn(`Invalid attribute key: ${A}`), this;
            if (!yS1.isAttributeValue(B) && !(typeof B === "object" && !Array.isArray(B) && Object.keys(B).length > 0)) return tt.diag.warn(`Invalid attribute value set for key: ${A}`), this;
            if (this.totalAttributesCount += 1, Object.keys(this.attributes).length >= this._logRecordLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, A)) {
                if (this.droppedAttributesCount === 1) tt.diag.warn("Dropping extra attributes.");
                return this
            }
            if (yS1.isAttributeValue(B)) this.attributes[A] = this._truncateToSize(B);
            else this.attributes[A] = B;
            return this
        }
        setAttributes(A) {
            for (let [B, Q] of Object.entries(A)) this.setAttribute(B, Q);
            return this
        }
        setBody(A) {
            return this.body = A, this
        }
        setSeverityNumber(A) {
            return this.severityNumber = A, this
        }
        setSeverityText(A) {
            return this.severityText = A, this
        }
        _makeReadonly() {
            this._isReadonly = !0
        }
        _truncateToSize(A) {
            let B = this._logRecordLimits.attributeValueLengthLimit;
            if (B <= 0) return tt.diag.warn(`Attribute value limit must be positive, got ${B}`), A;
            if (typeof A === "string") return this._truncateToLimitUtil(A, B);
            if (Array.isArray(A)) return A.map((Q) => typeof Q === "string" ? this._truncateToLimitUtil(Q, B) : Q);
            return A
        }
        _truncateToLimitUtil(A, B) {
            if (A.length <= B) return A;
            return A.substring(0, B)
        }
        _isLogRecordReadonly() {
            if (this._isReadonly) cN6.diag.warn("Can not execute the operation on emitted log record");
            return this._isReadonly
        }
    }
    uAB.LogRecord = gAB
});
var pAB = E((cAB) => {
    Object.defineProperty(cAB, "__esModule", {
        value: !0
    });
    cAB.Logger = void 0;
    var lN6 = XQ(),
        pN6 = cV0();
    class dAB {
        instrumentationScope;
        _sharedState;
        constructor(A, B) {
            this.instrumentationScope = A, this._sharedState = B
        }
        emit(A) {
            let B = A.context || lN6.context.active(),
                Q = new pN6.LogRecord(this._sharedState, this.instrumentationScope, {
                    context: B,
                    ...A
                });
            this._sharedState.activeProcessor.onEmit(Q, B), Q._makeReadonly()
        }
    }
    cAB.Logger = dAB
});
var aAB = E((iAB) => {
    Object.defineProperty(iAB, "__esModule", {
        value: !0
    });
    iAB.reconfigureLimits = iAB.loadDefaultConfig = void 0;
    var et = f3();

    function iN6() {
        return {
            forceFlushTimeoutMillis: 30000,
            logRecordLimits: {
                attributeValueLengthLimit: et.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? 1 / 0,
                attributeCountLimit: et.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT") ?? 128
            },
            includeTraceContext: !0
        }
    }
    iAB.loadDefaultConfig = iN6;

    function nN6(A) {
        return {
            attributeCountLimit: A.attributeCountLimit ?? et.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT") ?? et.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? 128,
            attributeValueLengthLimit: A.attributeValueLengthLimit ?? et.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? et.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? 1 / 0
        }
    }
    iAB.reconfigureLimits = nN6
});
var tAB = E((rAB) => {
    Object.defineProperty(rAB, "__esModule", {
        value: !0
    });
    rAB.MultiLogRecordProcessor = void 0;
    var sN6 = f3();
    class sAB {
        processors;
        forceFlushTimeoutMillis;
        constructor(A, B) {
            this.processors = A, this.forceFlushTimeoutMillis = B
        }
        async forceFlush() {
            let A = this.forceFlushTimeoutMillis;
            await Promise.all(this.processors.map((B) => sN6.callWithTimeout(B.forceFlush(), A)))
        }
        onEmit(A, B) {
            this.processors.forEach((Q) => Q.onEmit(A, B))
        }
        async shutdown() {
            await Promise.all(this.processors.map((A) => A.shutdown()))
        }
    }
    rAB.MultiLogRecordProcessor = sAB
});
var lV0 = E((A2B) => {
    Object.defineProperty(A2B, "__esModule", {
        value: !0
    });
    A2B.NoopLogRecordProcessor = void 0;
    class eAB {
        forceFlush() {
            return Promise.resolve()
        }
        onEmit(A, B) {}
        shutdown() {
            return Promise.resolve()
        }
    }
    A2B.NoopLogRecordProcessor = eAB
});
var G2B = E((Z2B) => {
    Object.defineProperty(Z2B, "__esModule", {
        value: !0
    });
    Z2B.LoggerProviderSharedState = void 0;
    var rN6 = lV0();
    class Q2B {
        resource;
        forceFlushTimeoutMillis;
        logRecordLimits;
        loggers = new Map;
        activeProcessor;
        registeredLogRecordProcessors = [];
        constructor(A, B, Q) {
            this.resource = A, this.forceFlushTimeoutMillis = B, this.logRecordLimits = Q, this.activeProcessor = new rN6.NoopLogRecordProcessor
        }
    }
    Z2B.LoggerProviderSharedState = Q2B
});