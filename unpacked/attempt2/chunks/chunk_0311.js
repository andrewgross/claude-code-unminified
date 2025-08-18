/* chunk:311 bytes:[7223825, 7243452) size:19627 source:unpacked-cli.js */
var cT1 = E((Tc2) => {
    Object.defineProperty(Tc2, "__esModule", {
        value: !0
    });
    Tc2.isObservableInstrument = Tc2.ObservableUpDownCounterInstrument = Tc2.ObservableGaugeInstrument = Tc2.ObservableCounterInstrument = Tc2.ObservableInstrument = Tc2.HistogramInstrument = Tc2.GaugeInstrument = Tc2.CounterInstrument = Tc2.UpDownCounterInstrument = Tc2.SyncInstrument = void 0;
    var zt = XQ(),
        HF6 = f3();
    class Et {
        _writableMetricStorage;
        _descriptor;
        constructor(A, B) {
            this._writableMetricStorage = A, this._descriptor = B
        }
        _record(A, B = {}, Q = zt.context.active()) {
            if (typeof A !== "number") {
                zt.diag.warn(`non-number value provided to metric ${this._descriptor.name}: ${A}`);
                return
            }
            if (this._descriptor.valueType === zt.ValueType.INT && !Number.isInteger(A)) {
                if (zt.diag.warn(`INT value type cannot accept a floating-point value for ${this._descriptor.name}, ignoring the fractional digits.`), A = Math.trunc(A), !Number.isInteger(A)) return
            }
            this._writableMetricStorage.record(A, B, Q, HF6.millisToHrTime(Date.now()))
        }
    }
    Tc2.SyncInstrument = Et;
    class $c2 extends Et {
        add(A, B, Q) {
            this._record(A, B, Q)
        }
    }
    Tc2.UpDownCounterInstrument = $c2;
    class qc2 extends Et {
        add(A, B, Q) {
            if (A < 0) {
                zt.diag.warn(`negative value provided to counter ${this._descriptor.name}: ${A}`);
                return
            }
            this._record(A, B, Q)
        }
    }
    Tc2.CounterInstrument = qc2;
    class Nc2 extends Et {
        record(A, B, Q) {
            this._record(A, B, Q)
        }
    }
    Tc2.GaugeInstrument = Nc2;
    class Lc2 extends Et {
        record(A, B, Q) {
            if (A < 0) {
                zt.diag.warn(`negative value provided to histogram ${this._descriptor.name}: ${A}`);
                return
            }
            this._record(A, B, Q)
        }
    }
    Tc2.HistogramInstrument = Lc2;
    class Ut {
        _observableRegistry;
        _metricStorages;
        _descriptor;
        constructor(A, B, Q) {
            this._observableRegistry = Q, this._descriptor = A, this._metricStorages = B
        }
        addCallback(A) {
            this._observableRegistry.addCallback(A, this)
        }
        removeCallback(A) {
            this._observableRegistry.removeCallback(A, this)
        }
    }
    Tc2.ObservableInstrument = Ut;
    class Mc2 extends Ut {}
    Tc2.ObservableCounterInstrument = Mc2;
    class Rc2 extends Ut {}
    Tc2.ObservableGaugeInstrument = Rc2;
    class Oc2 extends Ut {}
    Tc2.ObservableUpDownCounterInstrument = Oc2;

    function zF6(A) {
        return A instanceof Ut
    }
    Tc2.isObservableInstrument = zF6
});
var yc2 = E((jc2) => {
    Object.defineProperty(jc2, "__esModule", {
        value: !0
    });
    jc2.Meter = void 0;
    var Am = f31(),
        Bm = cT1(),
        Qm = o_();
    class Sc2 {
        _meterSharedState;
        constructor(A) {
            this._meterSharedState = A
        }
        createGauge(A, B) {
            let Q = Am.createInstrumentDescriptor(A, Qm.InstrumentType.GAUGE, B),
                Z = this._meterSharedState.registerMetricStorage(Q);
            return new Bm.GaugeInstrument(Z, Q)
        }
        createHistogram(A, B) {
            let Q = Am.createInstrumentDescriptor(A, Qm.InstrumentType.HISTOGRAM, B),
                Z = this._meterSharedState.registerMetricStorage(Q);
            return new Bm.HistogramInstrument(Z, Q)
        }
        createCounter(A, B) {
            let Q = Am.createInstrumentDescriptor(A, Qm.InstrumentType.COUNTER, B),
                Z = this._meterSharedState.registerMetricStorage(Q);
            return new Bm.CounterInstrument(Z, Q)
        }
        createUpDownCounter(A, B) {
            let Q = Am.createInstrumentDescriptor(A, Qm.InstrumentType.UP_DOWN_COUNTER, B),
                Z = this._meterSharedState.registerMetricStorage(Q);
            return new Bm.UpDownCounterInstrument(Z, Q)
        }
        createObservableGauge(A, B) {
            let Q = Am.createInstrumentDescriptor(A, Qm.InstrumentType.OBSERVABLE_GAUGE, B),
                Z = this._meterSharedState.registerAsyncMetricStorage(Q);
            return new Bm.ObservableGaugeInstrument(Q, Z, this._meterSharedState.observableRegistry)
        }
        createObservableCounter(A, B) {
            let Q = Am.createInstrumentDescriptor(A, Qm.InstrumentType.OBSERVABLE_COUNTER, B),
                Z = this._meterSharedState.registerAsyncMetricStorage(Q);
            return new Bm.ObservableCounterInstrument(Q, Z, this._meterSharedState.observableRegistry)
        }
        createObservableUpDownCounter(A, B) {
            let Q = Am.createInstrumentDescriptor(A, Qm.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER, B),
                Z = this._meterSharedState.registerAsyncMetricStorage(Q);
            return new Bm.ObservableUpDownCounterInstrument(Q, Z, this._meterSharedState.observableRegistry)
        }
        addBatchObservableCallback(A, B) {
            this._meterSharedState.observableRegistry.addBatchCallback(A, B)
        }
        removeBatchObservableCallback(A, B) {
            this._meterSharedState.observableRegistry.removeBatchCallback(A, B)
        }
    }
    jc2.Meter = Sc2
});
var YW0 = E((xc2) => {
    Object.defineProperty(xc2, "__esModule", {
        value: !0
    });
    xc2.MetricStorage = void 0;
    var OF6 = f31();
    class _c2 {
        _instrumentDescriptor;
        constructor(A) {
            this._instrumentDescriptor = A
        }
        getInstrumentDescriptor() {
            return this._instrumentDescriptor
        }
        updateDescription(A) {
            this._instrumentDescriptor = OF6.createInstrumentDescriptor(this._instrumentDescriptor.name, this._instrumentDescriptor.type, {
                description: A,
                valueType: this._instrumentDescriptor.valueType,
                unit: this._instrumentDescriptor.unit,
                advice: this._instrumentDescriptor.advice
            })
        }
    }
    xc2.MetricStorage = _c2
});
var h31 = E((fc2) => {
    Object.defineProperty(fc2, "__esModule", {
        value: !0
    });
    fc2.AttributeHashMap = fc2.HashMap = void 0;
    var TF6 = Z$();
    class WW0 {
        _hash;
        _valueMap = new Map;
        _keyMap = new Map;
        constructor(A) {
            this._hash = A
        }
        get(A, B) {
            return B ??= this._hash(A), this._valueMap.get(B)
        }
        getOrDefault(A, B) {
            let Q = this._hash(A);
            if (this._valueMap.has(Q)) return this._valueMap.get(Q);
            let Z = B();
            if (!this._keyMap.has(Q)) this._keyMap.set(Q, A);
            return this._valueMap.set(Q, Z), Z
        }
        set(A, B, Q) {
            if (Q ??= this._hash(A), !this._keyMap.has(Q)) this._keyMap.set(Q, A);
            this._valueMap.set(Q, B)
        }
        has(A, B) {
            return B ??= this._hash(A), this._valueMap.has(B)
        }* keys() {
            let A = this._keyMap.entries(),
                B = A.next();
            while (B.done !== !0) yield [B.value[1], B.value[0]], B = A.next()
        }* entries() {
            let A = this._valueMap.entries(),
                B = A.next();
            while (B.done !== !0) yield [this._keyMap.get(B.value[0]), B.value[1], B.value[0]], B = A.next()
        }
        get size() {
            return this._valueMap.size
        }
    }
    fc2.HashMap = WW0;
    class bc2 extends WW0 {
        constructor() {
            super(TF6.hashAttributes)
        }
    }
    fc2.AttributeHashMap = bc2
});
var XW0 = E((uc2) => {
    Object.defineProperty(uc2, "__esModule", {
        value: !0
    });
    uc2.DeltaMetricProcessor = void 0;
    var SF6 = Z$(),
        JW0 = h31();
    class gc2 {
        _aggregator;
        _activeCollectionStorage = new JW0.AttributeHashMap;
        _cumulativeMemoStorage = new JW0.AttributeHashMap;
        _cardinalityLimit;
        _overflowAttributes = {
            "otel.metric.overflow": !0
        };
        _overflowHashCode;
        constructor(A, B) {
            this._aggregator = A, this._cardinalityLimit = (B ?? 2000) - 1, this._overflowHashCode = SF6.hashAttributes(this._overflowAttributes)
        }
        record(A, B, Q, Z) {
            let D = this._activeCollectionStorage.get(B);
            if (!D) {
                if (this._activeCollectionStorage.size >= this._cardinalityLimit) {
                    this._activeCollectionStorage.getOrDefault(this._overflowAttributes, () => this._aggregator.createAccumulation(Z))?.record(A);
                    return
                }
                D = this._aggregator.createAccumulation(Z), this._activeCollectionStorage.set(B, D)
            }
            D?.record(A)
        }
        batchCumulate(A, B) {
            Array.from(A.entries()).forEach(([Q, Z, D]) => {
                let G = this._aggregator.createAccumulation(B);
                G?.record(Z);
                let F = G;
                if (this._cumulativeMemoStorage.has(Q, D)) {
                    let I = this._cumulativeMemoStorage.get(Q, D);
                    F = this._aggregator.diff(I, G)
                } else if (this._cumulativeMemoStorage.size >= this._cardinalityLimit) {
                    if (Q = this._overflowAttributes, D = this._overflowHashCode, this._cumulativeMemoStorage.has(Q, D)) {
                        let I = this._cumulativeMemoStorage.get(Q, D);
                        F = this._aggregator.diff(I, G)
                    }
                }
                if (this._activeCollectionStorage.has(Q, D)) {
                    let I = this._activeCollectionStorage.get(Q, D);
                    F = this._aggregator.merge(I, F)
                }
                this._cumulativeMemoStorage.set(Q, G, D), this._activeCollectionStorage.set(Q, F, D)
            })
        }
        collect() {
            let A = this._activeCollectionStorage;
            return this._activeCollectionStorage = new JW0.AttributeHashMap, A
        }
    }
    uc2.DeltaMetricProcessor = gc2
});
var VW0 = E((dc2) => {
    Object.defineProperty(dc2, "__esModule", {
        value: !0
    });
    dc2.TemporalMetricProcessor = void 0;
    var jF6 = UT1(),
        kF6 = h31();
    class g31 {
        _aggregator;
        _unreportedAccumulations = new Map;
        _reportHistory = new Map;
        constructor(A, B) {
            this._aggregator = A, B.forEach((Q) => {
                this._unreportedAccumulations.set(Q, [])
            })
        }
        buildMetrics(A, B, Q, Z) {
            this._stashAccumulations(Q);
            let D = this._getMergedUnreportedAccumulations(A),
                G = D,
                F;
            if (this._reportHistory.has(A)) {
                let Y = this._reportHistory.get(A),
                    W = Y.collectionTime;
                if (F = Y.aggregationTemporality, F === jF6.AggregationTemporality.CUMULATIVE) G = g31.merge(Y.accumulations, D, this._aggregator);
                else G = g31.calibrateStartTime(Y.accumulations, D, W)
            } else F = A.selectAggregationTemporality(B.type);
            this._reportHistory.set(A, {
                accumulations: G,
                collectionTime: Z,
                aggregationTemporality: F
            });
            let I = yF6(G);
            if (I.length === 0) return;
            return this._aggregator.toMetricData(B, F, I, Z)
        }
        _stashAccumulations(A) {
            let B = this._unreportedAccumulations.keys();
            for (let Q of B) {
                let Z = this._unreportedAccumulations.get(Q);
                if (Z === void 0) Z = [], this._unreportedAccumulations.set(Q, Z);
                Z.push(A)
            }
        }
        _getMergedUnreportedAccumulations(A) {
            let B = new kF6.AttributeHashMap,
                Q = this._unreportedAccumulations.get(A);
            if (this._unreportedAccumulations.set(A, []), Q === void 0) return B;
            for (let Z of Q) B = g31.merge(B, Z, this._aggregator);
            return B
        }
        static merge(A, B, Q) {
            let Z = A,
                D = B.entries(),
                G = D.next();
            while (G.done !== !0) {
                let [F, I, Y] = G.value;
                if (A.has(F, Y)) {
                    let W = A.get(F, Y),
                        J = Q.merge(W, I);
                    Z.set(F, J, Y)
                } else Z.set(F, I, Y);
                G = D.next()
            }
            return Z
        }
        static calibrateStartTime(A, B, Q) {
            for (let [Z, D] of A.keys()) B.get(Z, D)?.setStartTime(Q);
            return B
        }
    }
    dc2.TemporalMetricProcessor = g31;

    function yF6(A) {
        return Array.from(A.entries())
    }
});
var nc2 = E((pc2) => {
    Object.defineProperty(pc2, "__esModule", {
        value: !0
    });
    pc2.AsyncMetricStorage = void 0;
    var _F6 = YW0(),
        xF6 = XW0(),
        vF6 = VW0(),
        bF6 = h31();
    class lc2 extends _F6.MetricStorage {
        _attributesProcessor;
        _aggregationCardinalityLimit;
        _deltaMetricStorage;
        _temporalMetricStorage;
        constructor(A, B, Q, Z, D) {
            super(A);
            this._attributesProcessor = Q, this._aggregationCardinalityLimit = D, this._deltaMetricStorage = new xF6.DeltaMetricProcessor(B, this._aggregationCardinalityLimit), this._temporalMetricStorage = new vF6.TemporalMetricProcessor(B, Z)
        }
        record(A, B) {
            let Q = new bF6.AttributeHashMap;
            Array.from(A.entries()).forEach(([Z, D]) => {
                Q.set(this._attributesProcessor.process(Z), D)
            }), this._deltaMetricStorage.batchCumulate(Q, B)
        }
        collect(A, B) {
            let Q = this._deltaMetricStorage.collect();
            return this._temporalMetricStorage.buildMetrics(A, this._instrumentDescriptor, Q, B)
        }
    }
    pc2.AsyncMetricStorage = lc2
});
var Al2 = E((tc2) => {
    Object.defineProperty(tc2, "__esModule", {
        value: !0
    });
    tc2.getConflictResolutionRecipe = tc2.getDescriptionResolutionRecipe = tc2.getTypeConflictResolutionRecipe = tc2.getUnitConflictResolutionRecipe = tc2.getValueTypeConflictResolutionRecipe = tc2.getIncompatibilityDetails = void 0;

    function fF6(A, B) {
        let Q = "";
        if (A.unit !== B.unit) Q += `	- Unit '${A.unit}' does not match '${B.unit}'
`;
        if (A.type !== B.type) Q += `	- Type '${A.type}' does not match '${B.type}'
`;
        if (A.valueType !== B.valueType) Q += `	- Value Type '${A.valueType}' does not match '${B.valueType}'
`;
        if (A.description !== B.description) Q += `	- Description '${A.description}' does not match '${B.description}'
`;
        return Q
    }
    tc2.getIncompatibilityDetails = fF6;

    function ac2(A, B) {
        return `	- use valueType '${A.valueType}' on instrument creation or use an instrument name other than '${B.name}'`
    }
    tc2.getValueTypeConflictResolutionRecipe = ac2;

    function sc2(A, B) {
        return `	- use unit '${A.unit}' on instrument creation or use an instrument name other than '${B.name}'`
    }
    tc2.getUnitConflictResolutionRecipe = sc2;

    function rc2(A, B) {
        let Q = {
                name: B.name,
                type: B.type,
                unit: B.unit
            },
            Z = JSON.stringify(Q);
        return `	- create a new view with a name other than '${A.name}' and InstrumentSelector '${Z}'`
    }
    tc2.getTypeConflictResolutionRecipe = rc2;

    function oc2(A, B) {
        let Q = {
                name: B.name,
                type: B.type,
                unit: B.unit
            },
            Z = JSON.stringify(Q);
        return `	- create a new view with a name other than '${A.name}' and InstrumentSelector '${Z}'
    	- OR - create a new view with the name ${A.name} and description '${A.description}' and InstrumentSelector ${Z}
    	- OR - create a new view with the name ${B.name} and description '${A.description}' and InstrumentSelector ${Z}`
    }
    tc2.getDescriptionResolutionRecipe = oc2;

    function hF6(A, B) {
        if (A.valueType !== B.valueType) return ac2(A, B);
        if (A.unit !== B.unit) return sc2(A, B);
        if (A.type !== B.type) return rc2(A, B);
        if (A.description !== B.description) return oc2(A, B);
        return ""
    }
    tc2.getConflictResolutionRecipe = hF6
});
var Dl2 = E((Ql2) => {
    Object.defineProperty(Ql2, "__esModule", {
        value: !0
    });
    Ql2.MetricStorageRegistry = void 0;
    var lF6 = f31(),
        Bl2 = XQ(),
        lT1 = Al2();
    class CW0 {
        _sharedRegistry = new Map;
        _perCollectorRegistry = new Map;
        static create() {
            return new CW0
        }
        getStorages(A) {
            let B = [];
            for (let Z of this._sharedRegistry.values()) B = B.concat(Z);
            let Q = this._perCollectorRegistry.get(A);
            if (Q != null)
                for (let Z of Q.values()) B = B.concat(Z);
            return B
        }
        register(A) {
            this._registerStorage(A, this._sharedRegistry)
        }
        registerForCollector(A, B) {
            let Q = this._perCollectorRegistry.get(A);
            if (Q == null) Q = new Map, this._perCollectorRegistry.set(A, Q);
            this._registerStorage(B, Q)
        }
        findOrUpdateCompatibleStorage(A) {
            let B = this._sharedRegistry.get(A.name);
            if (B === void 0) return null;
            return this._findOrUpdateCompatibleStorage(A, B)
        }
        findOrUpdateCompatibleCollectorStorage(A, B) {
            let Q = this._perCollectorRegistry.get(A);
            if (Q === void 0) return null;
            let Z = Q.get(B.name);
            if (Z === void 0) return null;
            return this._findOrUpdateCompatibleStorage(B, Z)
        }
        _registerStorage(A, B) {
            let Q = A.getInstrumentDescriptor(),
                Z = B.get(Q.name);
            if (Z === void 0) {
                B.set(Q.name, [A]);
                return
            }
            Z.push(A)
        }
        _findOrUpdateCompatibleStorage(A, B) {
            let Q = null;
            for (let Z of B) {
                let D = Z.getInstrumentDescriptor();
                if (lF6.isDescriptorCompatibleWith(D, A)) {
                    if (D.description !== A.description) {
                        if (A.description.length > D.description.length) Z.updateDescription(A.description);
                        Bl2.diag.warn("A view or instrument with the name ", A.name, ` has already been registered, but has a different description and is incompatible with another registered view.
`, `Details:
`, lT1.getIncompatibilityDetails(D, A), `The longer description will be used.
To resolve the conflict:`, lT1.getConflictResolutionRecipe(D, A))
                    }
                    Q = Z
                } else Bl2.diag.warn("A view or instrument with the name ", A.name, ` has already been registered and is incompatible with another registered view.
`, `Details:
`, lT1.getIncompatibilityDetails(D, A), `To resolve the conflict:
`, lT1.getConflictResolutionRecipe(D, A))
            }
            return Q
        }
    }
    Ql2.MetricStorageRegistry = CW0
});