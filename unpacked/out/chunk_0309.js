/* chunk:309 bytes:[7186448, 7205531) size:19083 source:unpacked-cli.js */
var jm2 = E((Mm2) => {
    Object.defineProperty(Mm2, "__esModule", {
        value: !0
    });
    Mm2.DEFAULT_AGGREGATION = Mm2.EXPONENTIAL_HISTOGRAM_AGGREGATION = Mm2.HISTOGRAM_AGGREGATION = Mm2.LAST_VALUE_AGGREGATION = Mm2.SUM_AGGREGATION = Mm2.DROP_AGGREGATION = Mm2.DefaultAggregation = Mm2.ExponentialHistogramAggregation = Mm2.ExplicitBucketHistogramAggregation = Mm2.HistogramAggregation = Mm2.LastValueAggregation = Mm2.SumAggregation = Mm2.DropAggregation = void 0;
    var gD6 = XQ(),
        su = Lm2(),
        BM = o_();
    class xT1 {
        static DEFAULT_INSTANCE = new su.DropAggregator;
        createAggregator(A) {
            return xT1.DEFAULT_INSTANCE
        }
    }
    Mm2.DropAggregation = xT1;
    class y31 {
        static MONOTONIC_INSTANCE = new su.SumAggregator(!0);
        static NON_MONOTONIC_INSTANCE = new su.SumAggregator(!1);
        createAggregator(A) {
            switch (A.type) {
                case BM.InstrumentType.COUNTER:
                case BM.InstrumentType.OBSERVABLE_COUNTER:
                case BM.InstrumentType.HISTOGRAM:
                    return y31.MONOTONIC_INSTANCE;
                default:
                    return y31.NON_MONOTONIC_INSTANCE
            }
        }
    }
    Mm2.SumAggregation = y31;
    class vT1 {
        static DEFAULT_INSTANCE = new su.LastValueAggregator;
        createAggregator(A) {
            return vT1.DEFAULT_INSTANCE
        }
    }
    Mm2.LastValueAggregation = vT1;
    class bT1 {
        static DEFAULT_INSTANCE = new su.HistogramAggregator([0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000, 7500, 1e4], !0);
        createAggregator(A) {
            return bT1.DEFAULT_INSTANCE
        }
    }
    Mm2.HistogramAggregation = bT1;
    class dY0 {
        _recordMinMax;
        _boundaries;
        constructor(A, B = !0) {
            if (this._recordMinMax = B, A == null) throw new Error("ExplicitBucketHistogramAggregation should be created with explicit boundaries, if a single bucket histogram is required, please pass an empty array");
            A = A.concat(), A = A.sort((D, G) => D - G);
            let Q = A.lastIndexOf(-1 / 0),
                Z = A.indexOf(1 / 0);
            if (Z === -1) Z = void 0;
            this._boundaries = A.slice(Q + 1, Z)
        }
        createAggregator(A) {
            return new su.HistogramAggregator(this._boundaries, this._recordMinMax)
        }
    }
    Mm2.ExplicitBucketHistogramAggregation = dY0;
    class cY0 {
        _maxSize;
        _recordMinMax;
        constructor(A = 160, B = !0) {
            this._maxSize = A, this._recordMinMax = B
        }
        createAggregator(A) {
            return new su.ExponentialHistogramAggregator(this._maxSize, this._recordMinMax)
        }
    }
    Mm2.ExponentialHistogramAggregation = cY0;
    class lY0 {
        _resolve(A) {
            switch (A.type) {
                case BM.InstrumentType.COUNTER:
                case BM.InstrumentType.UP_DOWN_COUNTER:
                case BM.InstrumentType.OBSERVABLE_COUNTER:
                case BM.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
                    return Mm2.SUM_AGGREGATION;
                case BM.InstrumentType.GAUGE:
                case BM.InstrumentType.OBSERVABLE_GAUGE:
                    return Mm2.LAST_VALUE_AGGREGATION;
                case BM.InstrumentType.HISTOGRAM: {
                    if (A.advice.explicitBucketBoundaries) return new dY0(A.advice.explicitBucketBoundaries);
                    return Mm2.HISTOGRAM_AGGREGATION
                }
            }
            return gD6.diag.warn(`Unable to recognize instrument type: ${A.type}`), Mm2.DROP_AGGREGATION
        }
        createAggregator(A) {
            return this._resolve(A).createAggregator(A)
        }
    }
    Mm2.DefaultAggregation = lY0;
    Mm2.DROP_AGGREGATION = new xT1;
    Mm2.SUM_AGGREGATION = new y31;
    Mm2.LAST_VALUE_AGGREGATION = new vT1;
    Mm2.HISTOGRAM_AGGREGATION = new bT1;
    Mm2.EXPONENTIAL_HISTOGRAM_AGGREGATION = new cY0;
    Mm2.DEFAULT_AGGREGATION = new lY0
});
var _31 = E((ym2) => {
    Object.defineProperty(ym2, "__esModule", {
        value: !0
    });
    ym2.toAggregation = ym2.AggregationType = void 0;
    var ru = jm2(),
        ou;
    (function(A) {
        A[A.DEFAULT = 0] = "DEFAULT", A[A.DROP = 1] = "DROP", A[A.SUM = 2] = "SUM", A[A.LAST_VALUE = 3] = "LAST_VALUE", A[A.EXPLICIT_BUCKET_HISTOGRAM = 4] = "EXPLICIT_BUCKET_HISTOGRAM", A[A.EXPONENTIAL_HISTOGRAM = 5] = "EXPONENTIAL_HISTOGRAM"
    })(ou = ym2.AggregationType || (ym2.AggregationType = {}));

    function aD6(A) {
        switch (A.type) {
            case ou.DEFAULT:
                return ru.DEFAULT_AGGREGATION;
            case ou.DROP:
                return ru.DROP_AGGREGATION;
            case ou.SUM:
                return ru.SUM_AGGREGATION;
            case ou.LAST_VALUE:
                return ru.LAST_VALUE_AGGREGATION;
            case ou.EXPONENTIAL_HISTOGRAM: {
                let B = A;
                return new ru.ExponentialHistogramAggregation(B.options?.maxSize, B.options?.recordMinMax)
            }
            case ou.EXPLICIT_BUCKET_HISTOGRAM: {
                let B = A;
                if (B.options == null) return ru.HISTOGRAM_AGGREGATION;
                else return new ru.ExplicitBucketHistogramAggregation(B.options?.boundaries, B.options?.recordMinMax)
            }
            default:
                throw new Error("Unsupported Aggregation")
        }
    }
    ym2.toAggregation = aD6
});
var pY0 = E((xm2) => {
    Object.defineProperty(xm2, "__esModule", {
        value: !0
    });
    xm2.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = xm2.DEFAULT_AGGREGATION_SELECTOR = void 0;
    var sD6 = UT1(),
        rD6 = _31(),
        oD6 = (A) => {
            return {
                type: rD6.AggregationType.DEFAULT
            }
        };
    xm2.DEFAULT_AGGREGATION_SELECTOR = oD6;
    var tD6 = (A) => sD6.AggregationTemporality.CUMULATIVE;
    xm2.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = tD6
});
var iY0 = E((gm2) => {
    Object.defineProperty(gm2, "__esModule", {
        value: !0
    });
    gm2.MetricReader = void 0;
    var bm2 = XQ(),
        fT1 = Z$(),
        fm2 = pY0();
    class hm2 {
        _shutdown = !1;
        _metricProducers;
        _sdkMetricProducer;
        _aggregationTemporalitySelector;
        _aggregationSelector;
        _cardinalitySelector;
        constructor(A) {
            this._aggregationSelector = A?.aggregationSelector ?? fm2.DEFAULT_AGGREGATION_SELECTOR, this._aggregationTemporalitySelector = A?.aggregationTemporalitySelector ?? fm2.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR, this._metricProducers = A?.metricProducers ?? [], this._cardinalitySelector = A?.cardinalitySelector
        }
        setMetricProducer(A) {
            if (this._sdkMetricProducer) throw new Error("MetricReader can not be bound to a MeterProvider again.");
            this._sdkMetricProducer = A, this.onInitialized()
        }
        selectAggregation(A) {
            return this._aggregationSelector(A)
        }
        selectAggregationTemporality(A) {
            return this._aggregationTemporalitySelector(A)
        }
        selectCardinalityLimit(A) {
            return this._cardinalitySelector ? this._cardinalitySelector(A) : 2000
        }
        onInitialized() {}
        async collect(A) {
            if (this._sdkMetricProducer === void 0) throw new Error("MetricReader is not bound to a MetricProducer");
            if (this._shutdown) throw new Error("MetricReader is shutdown");
            let [B, ...Q] = await Promise.all([this._sdkMetricProducer.collect({
                timeoutMillis: A?.timeoutMillis
            }), ...this._metricProducers.map((F) => F.collect({
                timeoutMillis: A?.timeoutMillis
            }))]), Z = B.errors.concat(fT1.FlatMap(Q, (F) => F.errors)), D = B.resourceMetrics.resource, G = B.resourceMetrics.scopeMetrics.concat(fT1.FlatMap(Q, (F) => F.resourceMetrics.scopeMetrics));
            return {
                resourceMetrics: {
                    resource: D,
                    scopeMetrics: G
                },
                errors: Z
            }
        }
        async shutdown(A) {
            if (this._shutdown) {
                bm2.diag.error("Cannot call shutdown twice.");
                return
            }
            if (A?.timeoutMillis == null) await this.onShutdown();
            else await fT1.callWithTimeout(this.onShutdown(), A.timeoutMillis);
            this._shutdown = !0
        }
        async forceFlush(A) {
            if (this._shutdown) {
                bm2.diag.warn("Cannot forceFlush on already shutdown MetricReader.");
                return
            }
            if (A?.timeoutMillis == null) {
                await this.onForceFlush();
                return
            }
            await fT1.callWithTimeout(this.onForceFlush(), A.timeoutMillis)
        }
    }
    gm2.MetricReader = hm2
});
var pm2 = E((cm2) => {
    Object.defineProperty(cm2, "__esModule", {
        value: !0
    });
    cm2.PeriodicExportingMetricReader = void 0;
    var nY0 = XQ(),
        x31 = f3(),
        AG6 = iY0(),
        mm2 = Z$();
    class dm2 extends AG6.MetricReader {
        _interval;
        _exporter;
        _exportInterval;
        _exportTimeout;
        constructor(A) {
            super({
                aggregationSelector: A.exporter.selectAggregation?.bind(A.exporter),
                aggregationTemporalitySelector: A.exporter.selectAggregationTemporality?.bind(A.exporter),
                metricProducers: A.metricProducers
            });
            if (A.exportIntervalMillis !== void 0 && A.exportIntervalMillis <= 0) throw Error("exportIntervalMillis must be greater than 0");
            if (A.exportTimeoutMillis !== void 0 && A.exportTimeoutMillis <= 0) throw Error("exportTimeoutMillis must be greater than 0");
            if (A.exportTimeoutMillis !== void 0 && A.exportIntervalMillis !== void 0 && A.exportIntervalMillis < A.exportTimeoutMillis) throw Error("exportIntervalMillis must be greater than or equal to exportTimeoutMillis");
            this._exportInterval = A.exportIntervalMillis ?? 60000, this._exportTimeout = A.exportTimeoutMillis ?? 30000, this._exporter = A.exporter
        }
        async _runOnce() {
            try {
                await mm2.callWithTimeout(this._doRun(), this._exportTimeout)
            } catch (A) {
                if (A instanceof mm2.TimeoutError) {
                    nY0.diag.error("Export took longer than %s milliseconds and timed out.", this._exportTimeout);
                    return
                }
                x31.globalErrorHandler(A)
            }
        }
        async _doRun() {
            let {
                resourceMetrics: A,
                errors: B
            } = await this.collect({
                timeoutMillis: this._exportTimeout
            });
            if (B.length > 0) nY0.diag.error("PeriodicExportingMetricReader: metrics collection errors", ...B);
            if (A.resource.asyncAttributesPending) try {
                await A.resource.waitForAsyncAttributes?.()
            } catch (Z) {
                nY0.diag.debug("Error while resolving async portion of resource: ", Z), x31.globalErrorHandler(Z)
            }
            if (A.scopeMetrics.length === 0) return;
            let Q = await x31.internal._export(this._exporter, A);
            if (Q.code !== x31.ExportResultCode.SUCCESS) throw new Error(`PeriodicExportingMetricReader: metrics export failed (error ${Q.error})`)
        }
        onInitialized() {
            this._interval = setInterval(() => {
                this._runOnce()
            }, this._exportInterval), x31.unrefTimer(this._interval)
        }
        async onForceFlush() {
            await this._runOnce(), await this._exporter.forceFlush()
        }
        async onShutdown() {
            if (this._interval) clearInterval(this._interval);
            await this.onForceFlush(), await this._exporter.shutdown()
        }
    }
    cm2.PeriodicExportingMetricReader = dm2
});
var rm2 = E((am2) => {
    Object.defineProperty(am2, "__esModule", {
        value: !0
    });
    am2.InMemoryMetricExporter = void 0;
    var im2 = f3();
    class nm2 {
        _shutdown = !1;
        _aggregationTemporality;
        _metrics = [];
        constructor(A) {
            this._aggregationTemporality = A
        }
        export (A, B) {
            if (this._shutdown) {
                setTimeout(() => B({
                    code: im2.ExportResultCode.FAILED
                }), 0);
                return
            }
            this._metrics.push(A), setTimeout(() => B({
                code: im2.ExportResultCode.SUCCESS
            }), 0)
        }
        getMetrics() {
            return this._metrics
        }
        forceFlush() {
            return Promise.resolve()
        }
        reset() {
            this._metrics = []
        }
        selectAggregationTemporality(A) {
            return this._aggregationTemporality
        }
        shutdown() {
            return this._shutdown = !0, Promise.resolve()
        }
    }
    am2.InMemoryMetricExporter = nm2
});
var Ad2 = E((tm2) => {
    Object.defineProperty(tm2, "__esModule", {
        value: !0
    });
    tm2.ConsoleMetricExporter = void 0;
    var om2 = f3(),
        BG6 = pY0();
    class aY0 {
        _shutdown = !1;
        _temporalitySelector;
        constructor(A) {
            this._temporalitySelector = A?.temporalitySelector ?? BG6.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR
        }
        export (A, B) {
            if (this._shutdown) {
                setImmediate(B, {
                    code: om2.ExportResultCode.FAILED
                });
                return
            }
            return aY0._sendMetrics(A, B)
        }
        forceFlush() {
            return Promise.resolve()
        }
        selectAggregationTemporality(A) {
            return this._temporalitySelector(A)
        }
        shutdown() {
            return this._shutdown = !0, Promise.resolve()
        }
        static _sendMetrics(A, B) {
            for (let Q of A.scopeMetrics)
                for (let Z of Q.metrics) console.dir({
                    descriptor: Z.descriptor,
                    dataPointType: Z.dataPointType,
                    dataPoints: Z.dataPoints
                }, {
                    depth: null
                });
            B({
                code: om2.ExportResultCode.SUCCESS
            })
        }
    }
    tm2.ConsoleMetricExporter = aY0
});
var Zd2 = E((Bd2) => {
    Object.defineProperty(Bd2, "__esModule", {
        value: !0
    });
    Bd2.defaultServiceName = void 0;

    function QG6() {
        return `unknown_service:${process.argv0}`
    }
    Bd2.defaultServiceName = QG6
});
var Dd2 = E((sY0) => {
    Object.defineProperty(sY0, "__esModule", {
        value: !0
    });
    sY0.defaultServiceName = void 0;
    var ZG6 = Zd2();
    Object.defineProperty(sY0, "defaultServiceName", {
        enumerable: !0,
        get: function() {
            return ZG6.defaultServiceName
        }
    })
});
var oY0 = E((rY0) => {
    Object.defineProperty(rY0, "__esModule", {
        value: !0
    });
    rY0.defaultServiceName = void 0;
    var GG6 = Dd2();
    Object.defineProperty(rY0, "defaultServiceName", {
        enumerable: !0,
        get: function() {
            return GG6.defaultServiceName
        }
    })
});
var Id2 = E((Gd2) => {
    Object.defineProperty(Gd2, "__esModule", {
        value: !0
    });
    Gd2.identity = Gd2.isPromiseLike = void 0;
    var IG6 = (A) => {
        return A !== null && typeof A === "object" && typeof A.then === "function"
    };
    Gd2.isPromiseLike = IG6;

    function YG6(A) {
        return A
    }
    Gd2.identity = YG6
});
var BW0 = E((Yd2) => {
    Object.defineProperty(Yd2, "__esModule", {
        value: !0
    });
    Yd2.defaultResource = Yd2.emptyResource = Yd2.resourceFromDetectedResource = Yd2.resourceFromAttributes = void 0;
    var tY0 = XQ(),
        eY0 = f3(),
        tu = qP(),
        JG6 = oY0(),
        hT1 = Id2();
    class v31 {
        _rawAttributes;
        _asyncAttributesPending = !1;
        _memoizedAttributes;
        static FromAttributeList(A) {
            let B = new v31({});
            return B._rawAttributes = A, B._asyncAttributesPending = A.filter(([Q, Z]) => hT1.isPromiseLike(Z)).length > 0, B
        }
        constructor(A) {
            let B = A.attributes ?? {};
            this._rawAttributes = Object.entries(B).map(([Q, Z]) => {
                if (hT1.isPromiseLike(Z)) this._asyncAttributesPending = !0;
                return [Q, Z]
            })
        }
        get asyncAttributesPending() {
            return this._asyncAttributesPending
        }
        async waitForAsyncAttributes() {
            if (!this.asyncAttributesPending) return;
            for (let A = 0; A < this._rawAttributes.length; A++) {
                let [B, Q] = this._rawAttributes[A];
                try {
                    this._rawAttributes[A] = [B, hT1.isPromiseLike(Q) ? await Q : Q]
                } catch (Z) {
                    tY0.diag.debug("a resource's async attributes promise rejected: %s", Z), this._rawAttributes[A] = [B, void 0]
                }
            }
            this._asyncAttributesPending = !1
        }
        get attributes() {
            if (this.asyncAttributesPending) tY0.diag.error("Accessing resource attributes before async attributes settled");
            if (this._memoizedAttributes) return this._memoizedAttributes;
            let A = {};
            for (let [B, Q] of this._rawAttributes) {
                if (hT1.isPromiseLike(Q)) {
                    tY0.diag.debug(`Unsettled resource attribute ${B} skipped`);
                    continue
                }
                if (Q != null) A[B] ??= Q
            }
            if (!this._asyncAttributesPending) this._memoizedAttributes = A;
            return A
        }
        getRawAttributes() {
            return this._rawAttributes
        }
        merge(A) {
            if (A == null) return this;
            return v31.FromAttributeList([...A.getRawAttributes(), ...this.getRawAttributes()])
        }
    }

    function AW0(A) {
        return v31.FromAttributeList(Object.entries(A))
    }
    Yd2.resourceFromAttributes = AW0;

    function XG6(A) {
        return new v31(A)
    }
    Yd2.resourceFromDetectedResource = XG6;

    function VG6() {
        return AW0({})
    }
    Yd2.emptyResource = VG6;

    function CG6() {
        return AW0({
            [tu.ATTR_SERVICE_NAME]: JG6.defaultServiceName(),
            [tu.ATTR_TELEMETRY_SDK_LANGUAGE]: eY0.SDK_INFO[tu.ATTR_TELEMETRY_SDK_LANGUAGE],
            [tu.ATTR_TELEMETRY_SDK_NAME]: eY0.SDK_INFO[tu.ATTR_TELEMETRY_SDK_NAME],
            [tu.ATTR_TELEMETRY_SDK_VERSION]: eY0.SDK_INFO[tu.ATTR_TELEMETRY_SDK_VERSION]
        })
    }
    Yd2.defaultResource = CG6
});