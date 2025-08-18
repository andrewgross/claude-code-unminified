/* chunk:312 bytes:[7243453, 7263354) size:19901 source:unpacked-cli.js */
var Yl2 = E((Fl2) => {
    Object.defineProperty(Fl2, "__esModule", {
        value: !0
    });
    Fl2.MultiMetricStorage = void 0;
    class Gl2 {
        _backingStorages;
        constructor(A) {
            this._backingStorages = A
        }
        record(A, B, Q, Z) {
            this._backingStorages.forEach((D) => {
                D.record(A, B, Q, Z)
            })
        }
    }
    Fl2.MultiMetricStorage = Gl2
});
var Kl2 = E((Vl2) => {
    Object.defineProperty(Vl2, "__esModule", {
        value: !0
    });
    Vl2.BatchObservableResultImpl = Vl2.ObservableResultImpl = void 0;
    var wt = XQ(),
        Wl2 = h31(),
        pF6 = cT1();
    class Jl2 {
        _instrumentName;
        _valueType;
        _buffer = new Wl2.AttributeHashMap;
        constructor(A, B) {
            this._instrumentName = A, this._valueType = B
        }
        observe(A, B = {}) {
            if (typeof A !== "number") {
                wt.diag.warn(`non-number value provided to metric ${this._instrumentName}: ${A}`);
                return
            }
            if (this._valueType === wt.ValueType.INT && !Number.isInteger(A)) {
                if (wt.diag.warn(`INT value type cannot accept a floating-point value for ${this._instrumentName}, ignoring the fractional digits.`), A = Math.trunc(A), !Number.isInteger(A)) return
            }
            this._buffer.set(B, A)
        }
    }
    Vl2.ObservableResultImpl = Jl2;
    class Xl2 {
        _buffer = new Map;
        observe(A, B, Q = {}) {
            if (!pF6.isObservableInstrument(A)) return;
            let Z = this._buffer.get(A);
            if (Z == null) Z = new Wl2.AttributeHashMap, this._buffer.set(A, Z);
            if (typeof B !== "number") {
                wt.diag.warn(`non-number value provided to metric ${A._descriptor.name}: ${B}`);
                return
            }
            if (A._descriptor.valueType === wt.ValueType.INT && !Number.isInteger(B)) {
                if (wt.diag.warn(`INT value type cannot accept a floating-point value for ${A._descriptor.name}, ignoring the fractional digits.`), B = Math.trunc(B), !Number.isInteger(B)) return
            }
            Z.set(Q, B)
        }
    }
    Vl2.BatchObservableResultImpl = Xl2
});
var $l2 = E((Ul2) => {
    Object.defineProperty(Ul2, "__esModule", {
        value: !0
    });
    Ul2.ObservableRegistry = void 0;
    var nF6 = XQ(),
        Hl2 = cT1(),
        zl2 = Kl2(),
        u31 = Z$();
    class El2 {
        _callbacks = [];
        _batchCallbacks = [];
        addCallback(A, B) {
            if (this._findCallback(A, B) >= 0) return;
            this._callbacks.push({
                callback: A,
                instrument: B
            })
        }
        removeCallback(A, B) {
            let Q = this._findCallback(A, B);
            if (Q < 0) return;
            this._callbacks.splice(Q, 1)
        }
        addBatchCallback(A, B) {
            let Q = new Set(B.filter(Hl2.isObservableInstrument));
            if (Q.size === 0) {
                nF6.diag.error("BatchObservableCallback is not associated with valid instruments", B);
                return
            }
            if (this._findBatchCallback(A, Q) >= 0) return;
            this._batchCallbacks.push({
                callback: A,
                instruments: Q
            })
        }
        removeBatchCallback(A, B) {
            let Q = new Set(B.filter(Hl2.isObservableInstrument)),
                Z = this._findBatchCallback(A, Q);
            if (Z < 0) return;
            this._batchCallbacks.splice(Z, 1)
        }
        async observe(A, B) {
            let Q = this._observeCallbacks(A, B),
                Z = this._observeBatchCallbacks(A, B);
            return (await u31.PromiseAllSettled([...Q, ...Z])).filter(u31.isPromiseAllSettledRejectionResult).map((F) => F.reason)
        }
        _observeCallbacks(A, B) {
            return this._callbacks.map(async ({
                callback: Q,
                instrument: Z
            }) => {
                let D = new zl2.ObservableResultImpl(Z._descriptor.name, Z._descriptor.valueType),
                    G = Promise.resolve(Q(D));
                if (B != null) G = u31.callWithTimeout(G, B);
                await G, Z._metricStorages.forEach((F) => {
                    F.record(D._buffer, A)
                })
            })
        }
        _observeBatchCallbacks(A, B) {
            return this._batchCallbacks.map(async ({
                callback: Q,
                instruments: Z
            }) => {
                let D = new zl2.BatchObservableResultImpl,
                    G = Promise.resolve(Q(D));
                if (B != null) G = u31.callWithTimeout(G, B);
                await G, Z.forEach((F) => {
                    let I = D._buffer.get(F);
                    if (I == null) return;
                    F._metricStorages.forEach((Y) => {
                        Y.record(I, A)
                    })
                })
            })
        }
        _findCallback(A, B) {
            return this._callbacks.findIndex((Q) => {
                return Q.callback === A && Q.instrument === B
            })
        }
        _findBatchCallback(A, B) {
            return this._batchCallbacks.findIndex((Q) => {
                return Q.callback === A && u31.setEquals(Q.instruments, B)
            })
        }
    }
    Ul2.ObservableRegistry = El2
});
var Ml2 = E((Nl2) => {
    Object.defineProperty(Nl2, "__esModule", {
        value: !0
    });
    Nl2.SyncMetricStorage = void 0;
    var aF6 = YW0(),
        sF6 = XW0(),
        rF6 = VW0();
    class ql2 extends aF6.MetricStorage {
        _attributesProcessor;
        _aggregationCardinalityLimit;
        _deltaMetricStorage;
        _temporalMetricStorage;
        constructor(A, B, Q, Z, D) {
            super(A);
            this._attributesProcessor = Q, this._aggregationCardinalityLimit = D, this._deltaMetricStorage = new sF6.DeltaMetricProcessor(B, this._aggregationCardinalityLimit), this._temporalMetricStorage = new rF6.TemporalMetricProcessor(B, Z)
        }
        record(A, B, Q, Z) {
            B = this._attributesProcessor.process(B, Q), this._deltaMetricStorage.record(A, B, Q, Z)
        }
        collect(A, B) {
            let Q = this._deltaMetricStorage.collect();
            return this._temporalMetricStorage.buildMetrics(A, this._instrumentDescriptor, Q, B)
        }
    }
    Nl2.SyncMetricStorage = ql2
});
var pT1 = E((Sl2) => {
    Object.defineProperty(Sl2, "__esModule", {
        value: !0
    });
    Sl2.createDenyListAttributesProcessor = Sl2.createAllowListAttributesProcessor = Sl2.createMultiAttributesProcessor = Sl2.createNoopAttributesProcessor = void 0;
    class Rl2 {
        process(A, B) {
            return A
        }
    }
    class Ol2 {
        _processors;
        constructor(A) {
            this._processors = A
        }
        process(A, B) {
            let Q = A;
            for (let Z of this._processors) Q = Z.process(Q, B);
            return Q
        }
    }
    class Tl2 {
        _allowedAttributeNames;
        constructor(A) {
            this._allowedAttributeNames = A
        }
        process(A, B) {
            let Q = {};
            return Object.keys(A).filter((Z) => this._allowedAttributeNames.includes(Z)).forEach((Z) => Q[Z] = A[Z]), Q
        }
    }
    class Pl2 {
        _deniedAttributeNames;
        constructor(A) {
            this._deniedAttributeNames = A
        }
        process(A, B) {
            let Q = {};
            return Object.keys(A).filter((Z) => !this._deniedAttributeNames.includes(Z)).forEach((Z) => Q[Z] = A[Z]), Q
        }
    }

    function oF6() {
        return BI6
    }
    Sl2.createNoopAttributesProcessor = oF6;

    function tF6(A) {
        return new Ol2(A)
    }
    Sl2.createMultiAttributesProcessor = tF6;

    function eF6(A) {
        return new Tl2(A)
    }
    Sl2.createAllowListAttributesProcessor = eF6;

    function AI6(A) {
        return new Pl2(A)
    }
    Sl2.createDenyListAttributesProcessor = AI6;
    var BI6 = new Rl2
});
var xl2 = E((yl2) => {
    Object.defineProperty(yl2, "__esModule", {
        value: !0
    });
    yl2.MeterSharedState = void 0;
    var GI6 = f31(),
        FI6 = yc2(),
        II6 = Z$(),
        YI6 = nc2(),
        WI6 = Dl2(),
        JI6 = Yl2(),
        XI6 = $l2(),
        VI6 = Ml2(),
        CI6 = pT1();
    class kl2 {
        _meterProviderSharedState;
        _instrumentationScope;
        metricStorageRegistry = new WI6.MetricStorageRegistry;
        observableRegistry = new XI6.ObservableRegistry;
        meter;
        constructor(A, B) {
            this._meterProviderSharedState = A, this._instrumentationScope = B, this.meter = new FI6.Meter(this)
        }
        registerMetricStorage(A) {
            let B = this._registerMetricStorage(A, VI6.SyncMetricStorage);
            if (B.length === 1) return B[0];
            return new JI6.MultiMetricStorage(B)
        }
        registerAsyncMetricStorage(A) {
            return this._registerMetricStorage(A, YI6.AsyncMetricStorage)
        }
        async collect(A, B, Q) {
            let Z = await this.observableRegistry.observe(B, Q?.timeoutMillis),
                D = this.metricStorageRegistry.getStorages(A);
            if (D.length === 0) return null;
            let G = D.map((F) => {
                return F.collect(A, B)
            }).filter(II6.isNotNullish);
            if (G.length === 0) return {
                errors: Z
            };
            return {
                scopeMetrics: {
                    scope: this._instrumentationScope,
                    metrics: G
                },
                errors: Z
            }
        }
        _registerMetricStorage(A, B) {
            let Z = this._meterProviderSharedState.viewRegistry.findViews(A, this._instrumentationScope).map((D) => {
                let G = GI6.createInstrumentDescriptorWithView(D, A),
                    F = this.metricStorageRegistry.findOrUpdateCompatibleStorage(G);
                if (F != null) return F;
                let I = D.aggregation.createAggregator(G),
                    Y = new B(G, I, D.attributesProcessor, this._meterProviderSharedState.metricCollectors, D.aggregationCardinalityLimit);
                return this.metricStorageRegistry.register(Y), Y
            });
            if (Z.length === 0) {
                let G = this._meterProviderSharedState.selectAggregations(A.type).map(([F, I]) => {
                    let Y = this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(F, A);
                    if (Y != null) return Y;
                    let W = I.createAggregator(A),
                        J = F.selectCardinalityLimit(A.type),
                        X = new B(A, W, CI6.createNoopAttributesProcessor(), [F], J);
                    return this.metricStorageRegistry.registerForCollector(F, X), X
                });
                Z = Z.concat(G)
            }
            return Z
        }
    }
    yl2.MeterSharedState = kl2
});
var hl2 = E((bl2) => {
    Object.defineProperty(bl2, "__esModule", {
        value: !0
    });
    bl2.MeterProviderSharedState = void 0;
    var KI6 = Z$(),
        HI6 = Hc2(),
        zI6 = xl2(),
        EI6 = _31();
    class vl2 {
        resource;
        viewRegistry = new HI6.ViewRegistry;
        metricCollectors = [];
        meterSharedStates = new Map;
        constructor(A) {
            this.resource = A
        }
        getMeterSharedState(A) {
            let B = KI6.instrumentationScopeId(A),
                Q = this.meterSharedStates.get(B);
            if (Q == null) Q = new zI6.MeterSharedState(this, A), this.meterSharedStates.set(B, Q);
            return Q
        }
        selectAggregations(A) {
            let B = [];
            for (let Q of this.metricCollectors) B.push([Q, EI6.toAggregation(Q.selectAggregation(A))]);
            return B
        }
    }
    bl2.MeterProviderSharedState = vl2
});
var dl2 = E((ul2) => {
    Object.defineProperty(ul2, "__esModule", {
        value: !0
    });
    ul2.MetricCollector = void 0;
    var UI6 = f3();
    class gl2 {
        _sharedState;
        _metricReader;
        constructor(A, B) {
            this._sharedState = A, this._metricReader = B
        }
        async collect(A) {
            let B = UI6.millisToHrTime(Date.now()),
                Q = [],
                Z = [],
                D = Array.from(this._sharedState.meterSharedStates.values()).map(async (G) => {
                    let F = await G.collect(this, B, A);
                    if (F?.scopeMetrics != null) Q.push(F.scopeMetrics);
                    if (F?.errors != null) Z.push(...F.errors)
                });
            return await Promise.all(D), {
                resourceMetrics: {
                    resource: this._sharedState.resource,
                    scopeMetrics: Q
                },
                errors: Z
            }
        }
        async forceFlush(A) {
            await this._metricReader.forceFlush(A)
        }
        async shutdown(A) {
            await this._metricReader.shutdown(A)
        }
        selectAggregationTemporality(A) {
            return this._metricReader.selectAggregationTemporality(A)
        }
        selectAggregation(A) {
            return this._metricReader.selectAggregation(A)
        }
        selectCardinalityLimit(A) {
            return this._metricReader.selectCardinalityLimit?.(A) ?? 2000
        }
    }
    ul2.MetricCollector = gl2
});
var iT1 = E((ll2) => {
    Object.defineProperty(ll2, "__esModule", {
        value: !0
    });
    ll2.ExactPredicate = ll2.PatternPredicate = void 0;
    var wI6 = /[\^$\\.+?()[\]{}|]/g;
    class KW0 {
        _matchAll;
        _regexp;
        constructor(A) {
            if (A === "*") this._matchAll = !0, this._regexp = /.*/;
            else this._matchAll = !1, this._regexp = new RegExp(KW0.escapePattern(A))
        }
        match(A) {
            if (this._matchAll) return !0;
            return this._regexp.test(A)
        }
        static escapePattern(A) {
            return `^${A.replace(wI6,"\\$&").replace("*",".*")}$`
        }
        static hasWildcard(A) {
            return A.includes("*")
        }
    }
    ll2.PatternPredicate = KW0;
    class cl2 {
        _matchAll;
        _pattern;
        constructor(A) {
            this._matchAll = A === void 0, this._pattern = A
        }
        match(A) {
            if (this._matchAll) return !0;
            if (A === this._pattern) return !0;
            return !1
        }
    }
    ll2.ExactPredicate = cl2
});
var rl2 = E((al2) => {
    Object.defineProperty(al2, "__esModule", {
        value: !0
    });
    al2.InstrumentSelector = void 0;
    var il2 = iT1();
    class nl2 {
        _nameFilter;
        _type;
        _unitFilter;
        constructor(A) {
            this._nameFilter = new il2.PatternPredicate(A?.name ?? "*"), this._type = A?.type, this._unitFilter = new il2.ExactPredicate(A?.unit)
        }
        getType() {
            return this._type
        }
        getNameFilter() {
            return this._nameFilter
        }
        getUnitFilter() {
            return this._unitFilter
        }
    }
    al2.InstrumentSelector = nl2
});
var Ap2 = E((tl2) => {
    Object.defineProperty(tl2, "__esModule", {
        value: !0
    });
    tl2.MeterSelector = void 0;
    var HW0 = iT1();
    class ol2 {
        _nameFilter;
        _versionFilter;
        _schemaUrlFilter;
        constructor(A) {
            this._nameFilter = new HW0.ExactPredicate(A?.name), this._versionFilter = new HW0.ExactPredicate(A?.version), this._schemaUrlFilter = new HW0.ExactPredicate(A?.schemaUrl)
        }
        getNameFilter() {
            return this._nameFilter
        }
        getVersionFilter() {
            return this._versionFilter
        }
        getSchemaUrlFilter() {
            return this._schemaUrlFilter
        }
    }
    tl2.MeterSelector = ol2
});
var Fp2 = E((Dp2) => {
    Object.defineProperty(Dp2, "__esModule", {
        value: !0
    });
    Dp2.View = void 0;
    var qI6 = iT1(),
        Bp2 = pT1(),
        NI6 = rl2(),
        LI6 = Ap2(),
        Qp2 = _31();

    function MI6(A) {
        return A.instrumentName == null && A.instrumentType == null && A.instrumentUnit == null && A.meterName == null && A.meterVersion == null && A.meterSchemaUrl == null
    }

    function RI6(A) {
        if (MI6(A)) throw new Error("Cannot create view with no selector arguments supplied");
        if (A.name != null && (A?.instrumentName == null || qI6.PatternPredicate.hasWildcard(A.instrumentName))) throw new Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.")
    }
    class Zp2 {
        name;
        description;
        aggregation;
        attributesProcessor;
        instrumentSelector;
        meterSelector;
        aggregationCardinalityLimit;
        constructor(A) {
            if (RI6(A), A.attributesProcessors != null) this.attributesProcessor = Bp2.createMultiAttributesProcessor(A.attributesProcessors);
            else this.attributesProcessor = Bp2.createNoopAttributesProcessor();
            this.name = A.name, this.description = A.description, this.aggregation = Qp2.toAggregation(A.aggregation ?? {
                type: Qp2.AggregationType.DEFAULT
            }), this.instrumentSelector = new NI6.InstrumentSelector({
                name: A.instrumentName,
                type: A.instrumentType,
                unit: A.instrumentUnit
            }), this.meterSelector = new LI6.MeterSelector({
                name: A.meterName,
                version: A.meterVersion,
                schemaUrl: A.meterSchemaUrl
            }), this.aggregationCardinalityLimit = A.aggregationCardinalityLimit
        }
    }
    Dp2.View = Zp2
});
var Jp2 = E((Yp2) => {
    Object.defineProperty(Yp2, "__esModule", {
        value: !0
    });
    Yp2.MeterProvider = void 0;
    var nT1 = XQ(),
        OI6 = dT1(),
        TI6 = hl2(),
        PI6 = dl2(),
        SI6 = Fp2();
    class Ip2 {
        _sharedState;
        _shutdown = !1;
        constructor(A) {
            if (this._sharedState = new TI6.MeterProviderSharedState(A?.resource ?? OI6.defaultResource()), A?.views != null && A.views.length > 0)
                for (let B of A.views) this._sharedState.viewRegistry.addView(new SI6.View(B));
            if (A?.readers != null && A.readers.length > 0)
                for (let B of A.readers) {
                    let Q = new PI6.MetricCollector(this._sharedState, B);
                    B.setMetricProducer(Q), this._sharedState.metricCollectors.push(Q)
                }
        }
        getMeter(A, B = "", Q = {}) {
            if (this._shutdown) return nT1.diag.warn("A shutdown MeterProvider cannot provide a Meter"), nT1.createNoopMeter();
            return this._sharedState.getMeterSharedState({
                name: A,
                version: B,
                schemaUrl: Q.schemaUrl
            }).meter
        }
        async shutdown(A) {
            if (this._shutdown) {
                nT1.diag.warn("shutdown may only be called once per MeterProvider");
                return
            }
            this._shutdown = !0, await Promise.all(this._sharedState.metricCollectors.map((B) => {
                return B.shutdown(A)
            }))
        }
        async forceFlush(A) {
            if (this._shutdown) {
                nT1.diag.warn("invalid attempt to force flush after MeterProvider shutdown");
                return
            }
            await Promise.all(this._sharedState.metricCollectors.map((B) => {
                return B.forceFlush(A)
            }))
        }
    }
    Yp2.MeterProvider = Ip2
});