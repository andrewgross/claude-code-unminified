/* chunk:299 bytes:[7000017, 7019229) size:19212 source:unpacked-cli.js */
var uu = E((JT2) => {
    Object.defineProperty(JT2, "__esModule", {
        value: !0
    });
    JT2.unregisterGlobal = JT2.getGlobal = JT2.registerGlobal = void 0;
    var Dt4 = QT2(),
        Gt = KI0(),
        Gt4 = WT2(),
        Ft4 = Gt.VERSION.split(".")[0],
        E31 = Symbol.for(`opentelemetry.js.api.${Ft4}`),
        U31 = Dt4._globalThis;

    function It4(A, B, Q, Z = !1) {
        var D;
        let G = U31[E31] = (D = U31[E31]) !== null && D !== void 0 ? D : {
            version: Gt.VERSION
        };
        if (!Z && G[A]) {
            let F = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${A}`);
            return Q.error(F.stack || F.message), !1
        }
        if (G.version !== Gt.VERSION) {
            let F = new Error(`@opentelemetry/api: Registration of version v${G.version} for ${A} does not match previously registered API v${Gt.VERSION}`);
            return Q.error(F.stack || F.message), !1
        }
        return G[A] = B, Q.debug(`@opentelemetry/api: Registered a global for ${A} v${Gt.VERSION}.`), !0
    }
    JT2.registerGlobal = It4;

    function Yt4(A) {
        var B, Q;
        let Z = (B = U31[E31]) === null || B === void 0 ? void 0 : B.version;
        if (!Z || !Gt4.isCompatible(Z)) return;
        return (Q = U31[E31]) === null || Q === void 0 ? void 0 : Q[A]
    }
    JT2.getGlobal = Yt4;

    function Wt4(A, B) {
        B.debug(`@opentelemetry/api: Unregistering a global for ${A} v${Gt.VERSION}.`);
        let Q = U31[E31];
        if (Q) delete Q[A]
    }
    JT2.unregisterGlobal = Wt4
});
var HT2 = E((CT2) => {
    Object.defineProperty(CT2, "__esModule", {
        value: !0
    });
    CT2.DiagComponentLogger = void 0;
    var Vt4 = uu();
    class VT2 {
        constructor(A) {
            this._namespace = A.namespace || "DiagComponentLogger"
        }
        debug(...A) {
            return w31("debug", this._namespace, A)
        }
        error(...A) {
            return w31("error", this._namespace, A)
        }
        info(...A) {
            return w31("info", this._namespace, A)
        }
        warn(...A) {
            return w31("warn", this._namespace, A)
        }
        verbose(...A) {
            return w31("verbose", this._namespace, A)
        }
    }
    CT2.DiagComponentLogger = VT2;

    function w31(A, B, Q) {
        let Z = Vt4.getGlobal("diag");
        if (!Z) return;
        return Q.unshift(B), Z[A](...Q)
    }
});
var WT1 = E((zT2) => {
    Object.defineProperty(zT2, "__esModule", {
        value: !0
    });
    zT2.DiagLogLevel = void 0;
    var Ct4;
    (function(A) {
        A[A.NONE = 0] = "NONE", A[A.ERROR = 30] = "ERROR", A[A.WARN = 50] = "WARN", A[A.INFO = 60] = "INFO", A[A.DEBUG = 70] = "DEBUG", A[A.VERBOSE = 80] = "VERBOSE", A[A.ALL = 9999] = "ALL"
    })(Ct4 = zT2.DiagLogLevel || (zT2.DiagLogLevel = {}))
});
var wT2 = E((ET2) => {
    Object.defineProperty(ET2, "__esModule", {
        value: !0
    });
    ET2.createLogLevelDiagLogger = void 0;
    var wP = WT1();

    function Kt4(A, B) {
        if (A < wP.DiagLogLevel.NONE) A = wP.DiagLogLevel.NONE;
        else if (A > wP.DiagLogLevel.ALL) A = wP.DiagLogLevel.ALL;
        B = B || {};

        function Q(Z, D) {
            let G = B[Z];
            if (typeof G === "function" && A >= D) return G.bind(B);
            return function() {}
        }
        return {
            error: Q("error", wP.DiagLogLevel.ERROR),
            warn: Q("warn", wP.DiagLogLevel.WARN),
            info: Q("info", wP.DiagLogLevel.INFO),
            debug: Q("debug", wP.DiagLogLevel.DEBUG),
            verbose: Q("verbose", wP.DiagLogLevel.VERBOSE)
        }
    }
    ET2.createLogLevelDiagLogger = Kt4
});
var mu = E((qT2) => {
    Object.defineProperty(qT2, "__esModule", {
        value: !0
    });
    qT2.DiagAPI = void 0;
    var Ht4 = HT2(),
        zt4 = wT2(),
        $T2 = WT1(),
        JT1 = uu(),
        Et4 = "diag";
    class zI0 {
        constructor() {
            function A(Z) {
                return function(...D) {
                    let G = JT1.getGlobal("diag");
                    if (!G) return;
                    return G[Z](...D)
                }
            }
            let B = this,
                Q = (Z, D = {
                    logLevel: $T2.DiagLogLevel.INFO
                }) => {
                    var G, F, I;
                    if (Z === B) {
                        let J = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                        return B.error((G = J.stack) !== null && G !== void 0 ? G : J.message), !1
                    }
                    if (typeof D === "number") D = {
                        logLevel: D
                    };
                    let Y = JT1.getGlobal("diag"),
                        W = zt4.createLogLevelDiagLogger((F = D.logLevel) !== null && F !== void 0 ? F : $T2.DiagLogLevel.INFO, Z);
                    if (Y && !D.suppressOverrideMessage) {
                        let J = (I = new Error().stack) !== null && I !== void 0 ? I : "<failed to generate stacktrace>";
                        Y.warn(`Current logger will be overwritten from ${J}`), W.warn(`Current logger will overwrite one already registered from ${J}`)
                    }
                    return JT1.registerGlobal("diag", W, B, !0)
                };
            B.setLogger = Q, B.disable = () => {
                JT1.unregisterGlobal(Et4, B)
            }, B.createComponentLogger = (Z) => {
                return new Ht4.DiagComponentLogger(Z)
            }, B.verbose = A("verbose"), B.debug = A("debug"), B.info = A("info"), B.warn = A("warn"), B.error = A("error")
        }
        static instance() {
            if (!this._instance) this._instance = new zI0;
            return this._instance
        }
    }
    qT2.DiagAPI = zI0
});
var RT2 = E((LT2) => {
    Object.defineProperty(LT2, "__esModule", {
        value: !0
    });
    LT2.BaggageImpl = void 0;
    class Ft {
        constructor(A) {
            this._entries = A ? new Map(A) : new Map
        }
        getEntry(A) {
            let B = this._entries.get(A);
            if (!B) return;
            return Object.assign({}, B)
        }
        getAllEntries() {
            return Array.from(this._entries.entries()).map(([A, B]) => [A, B])
        }
        setEntry(A, B) {
            let Q = new Ft(this._entries);
            return Q._entries.set(A, B), Q
        }
        removeEntry(A) {
            let B = new Ft(this._entries);
            return B._entries.delete(A), B
        }
        removeEntries(...A) {
            let B = new Ft(this._entries);
            for (let Q of A) B._entries.delete(Q);
            return B
        }
        clear() {
            return new Ft
        }
    }
    LT2.BaggageImpl = Ft
});
var PT2 = E((OT2) => {
    Object.defineProperty(OT2, "__esModule", {
        value: !0
    });
    OT2.baggageEntryMetadataSymbol = void 0;
    OT2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata")
});
var EI0 = E((ST2) => {
    Object.defineProperty(ST2, "__esModule", {
        value: !0
    });
    ST2.baggageEntryMetadataFromString = ST2.createBaggage = void 0;
    var Ut4 = mu(),
        wt4 = RT2(),
        $t4 = PT2(),
        qt4 = Ut4.DiagAPI.instance();

    function Nt4(A = {}) {
        return new wt4.BaggageImpl(new Map(Object.entries(A)))
    }
    ST2.createBaggage = Nt4;

    function Lt4(A) {
        if (typeof A !== "string") qt4.error(`Cannot create baggage metadata from unknown type: ${typeof A}`), A = "";
        return {
            __TYPE__: $t4.baggageEntryMetadataSymbol,
            toString() {
                return A
            }
        }
    }
    ST2.baggageEntryMetadataFromString = Lt4
});
var $31 = E((kT2) => {
    Object.defineProperty(kT2, "__esModule", {
        value: !0
    });
    kT2.ROOT_CONTEXT = kT2.createContextKey = void 0;

    function Rt4(A) {
        return Symbol.for(A)
    }
    kT2.createContextKey = Rt4;
    class XT1 {
        constructor(A) {
            let B = this;
            B._currentContext = A ? new Map(A) : new Map, B.getValue = (Q) => B._currentContext.get(Q), B.setValue = (Q, Z) => {
                let D = new XT1(B._currentContext);
                return D._currentContext.set(Q, Z), D
            }, B.deleteValue = (Q) => {
                let Z = new XT1(B._currentContext);
                return Z._currentContext.delete(Q), Z
            }
        }
    }
    kT2.ROOT_CONTEXT = new XT1
});
var bT2 = E((xT2) => {
    Object.defineProperty(xT2, "__esModule", {
        value: !0
    });
    xT2.DiagConsoleLogger = void 0;
    var UI0 = [{
        n: "error",
        c: "error"
    }, {
        n: "warn",
        c: "warn"
    }, {
        n: "info",
        c: "info"
    }, {
        n: "debug",
        c: "debug"
    }, {
        n: "verbose",
        c: "trace"
    }];
    class _T2 {
        constructor() {
            function A(B) {
                return function(...Q) {
                    if (console) {
                        let Z = console[B];
                        if (typeof Z !== "function") Z = console.log;
                        if (typeof Z === "function") return Z.apply(console, Q)
                    }
                }
            }
            for (let B = 0; B < UI0.length; B++) this[UI0[B].n] = A(UI0[B].c)
        }
    }
    xT2.DiagConsoleLogger = _T2
});
var TI0 = E((fT2) => {
    Object.defineProperty(fT2, "__esModule", {
        value: !0
    });
    fT2.createNoopMeter = fT2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = fT2.NOOP_OBSERVABLE_GAUGE_METRIC = fT2.NOOP_OBSERVABLE_COUNTER_METRIC = fT2.NOOP_UP_DOWN_COUNTER_METRIC = fT2.NOOP_HISTOGRAM_METRIC = fT2.NOOP_GAUGE_METRIC = fT2.NOOP_COUNTER_METRIC = fT2.NOOP_METER = fT2.NoopObservableUpDownCounterMetric = fT2.NoopObservableGaugeMetric = fT2.NoopObservableCounterMetric = fT2.NoopObservableMetric = fT2.NoopHistogramMetric = fT2.NoopGaugeMetric = fT2.NoopUpDownCounterMetric = fT2.NoopCounterMetric = fT2.NoopMetric = fT2.NoopMeter = void 0;
    class wI0 {
        constructor() {}
        createGauge(A, B) {
            return fT2.NOOP_GAUGE_METRIC
        }
        createHistogram(A, B) {
            return fT2.NOOP_HISTOGRAM_METRIC
        }
        createCounter(A, B) {
            return fT2.NOOP_COUNTER_METRIC
        }
        createUpDownCounter(A, B) {
            return fT2.NOOP_UP_DOWN_COUNTER_METRIC
        }
        createObservableGauge(A, B) {
            return fT2.NOOP_OBSERVABLE_GAUGE_METRIC
        }
        createObservableCounter(A, B) {
            return fT2.NOOP_OBSERVABLE_COUNTER_METRIC
        }
        createObservableUpDownCounter(A, B) {
            return fT2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC
        }
        addBatchObservableCallback(A, B) {}
        removeBatchObservableCallback(A) {}
    }
    fT2.NoopMeter = wI0;
    class It {}
    fT2.NoopMetric = It;
    class $I0 extends It {
        add(A, B) {}
    }
    fT2.NoopCounterMetric = $I0;
    class qI0 extends It {
        add(A, B) {}
    }
    fT2.NoopUpDownCounterMetric = qI0;
    class NI0 extends It {
        record(A, B) {}
    }
    fT2.NoopGaugeMetric = NI0;
    class LI0 extends It {
        record(A, B) {}
    }
    fT2.NoopHistogramMetric = LI0;
    class q31 {
        addCallback(A) {}
        removeCallback(A) {}
    }
    fT2.NoopObservableMetric = q31;
    class MI0 extends q31 {}
    fT2.NoopObservableCounterMetric = MI0;
    class RI0 extends q31 {}
    fT2.NoopObservableGaugeMetric = RI0;
    class OI0 extends q31 {}
    fT2.NoopObservableUpDownCounterMetric = OI0;
    fT2.NOOP_METER = new wI0;
    fT2.NOOP_COUNTER_METRIC = new $I0;
    fT2.NOOP_GAUGE_METRIC = new NI0;
    fT2.NOOP_HISTOGRAM_METRIC = new LI0;
    fT2.NOOP_UP_DOWN_COUNTER_METRIC = new qI0;
    fT2.NOOP_OBSERVABLE_COUNTER_METRIC = new MI0;
    fT2.NOOP_OBSERVABLE_GAUGE_METRIC = new RI0;
    fT2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new OI0;

    function Tt4() {
        return fT2.NOOP_METER
    }
    fT2.createNoopMeter = Tt4
});
var aT2 = E((nT2) => {
    Object.defineProperty(nT2, "__esModule", {
        value: !0
    });
    nT2.ValueType = void 0;
    var ht4;
    (function(A) {
        A[A.INT = 0] = "INT", A[A.DOUBLE = 1] = "DOUBLE"
    })(ht4 = nT2.ValueType || (nT2.ValueType = {}))
});
var SI0 = E((sT2) => {
    Object.defineProperty(sT2, "__esModule", {
        value: !0
    });
    sT2.defaultTextMapSetter = sT2.defaultTextMapGetter = void 0;
    sT2.defaultTextMapGetter = {
        get(A, B) {
            if (A == null) return;
            return A[B]
        },
        keys(A) {
            if (A == null) return [];
            return Object.keys(A)
        }
    };
    sT2.defaultTextMapSetter = {
        set(A, B, Q) {
            if (A == null) return;
            A[B] = Q
        }
    }
});
var AP2 = E((tT2) => {
    Object.defineProperty(tT2, "__esModule", {
        value: !0
    });
    tT2.NoopContextManager = void 0;
    var ut4 = $31();
    class oT2 {
        active() {
            return ut4.ROOT_CONTEXT
        }
        with(A, B, Q, ...Z) {
            return B.call(Q, ...Z)
        }
        bind(A, B) {
            return B
        }
        enable() {
            return this
        }
        disable() {
            return this
        }
    }
    tT2.NoopContextManager = oT2
});
var N31 = E((QP2) => {
    Object.defineProperty(QP2, "__esModule", {
        value: !0
    });
    QP2.ContextAPI = void 0;
    var mt4 = AP2(),
        jI0 = uu(),
        BP2 = mu(),
        kI0 = "context",
        dt4 = new mt4.NoopContextManager;
    class yI0 {
        constructor() {}
        static getInstance() {
            if (!this._instance) this._instance = new yI0;
            return this._instance
        }
        setGlobalContextManager(A) {
            return jI0.registerGlobal(kI0, A, BP2.DiagAPI.instance())
        }
        active() {
            return this._getContextManager().active()
        }
        with(A, B, Q, ...Z) {
            return this._getContextManager().with(A, B, Q, ...Z)
        }
        bind(A, B) {
            return this._getContextManager().bind(A, B)
        }
        _getContextManager() {
            return jI0.getGlobal(kI0) || dt4
        }
        disable() {
            this._getContextManager().disable(), jI0.unregisterGlobal(kI0, BP2.DiagAPI.instance())
        }
    }
    QP2.ContextAPI = yI0
});
var xI0 = E((DP2) => {
    Object.defineProperty(DP2, "__esModule", {
        value: !0
    });
    DP2.TraceFlags = void 0;
    var ct4;
    (function(A) {
        A[A.NONE = 0] = "NONE", A[A.SAMPLED = 1] = "SAMPLED"
    })(ct4 = DP2.TraceFlags || (DP2.TraceFlags = {}))
});
var VT1 = E((GP2) => {
    Object.defineProperty(GP2, "__esModule", {
        value: !0
    });
    GP2.INVALID_SPAN_CONTEXT = GP2.INVALID_TRACEID = GP2.INVALID_SPANID = void 0;
    var lt4 = xI0();
    GP2.INVALID_SPANID = "0000000000000000";
    GP2.INVALID_TRACEID = "00000000000000000000000000000000";
    GP2.INVALID_SPAN_CONTEXT = {
        traceId: GP2.INVALID_TRACEID,
        spanId: GP2.INVALID_SPANID,
        traceFlags: lt4.TraceFlags.NONE
    }
});
var CT1 = E((JP2) => {
    Object.defineProperty(JP2, "__esModule", {
        value: !0
    });
    JP2.NonRecordingSpan = void 0;
    var pt4 = VT1();
    class WP2 {
        constructor(A = pt4.INVALID_SPAN_CONTEXT) {
            this._spanContext = A
        }
        spanContext() {
            return this._spanContext
        }
        setAttribute(A, B) {
            return this
        }
        setAttributes(A) {
            return this
        }
        addEvent(A, B) {
            return this
        }
        addLink(A) {
            return this
        }
        addLinks(A) {
            return this
        }
        setStatus(A) {
            return this
        }
        updateName(A) {
            return this
        }
        end(A) {}
        isRecording() {
            return !1
        }
        recordException(A, B) {}
    }
    JP2.NonRecordingSpan = WP2
});
var fI0 = E((CP2) => {
    Object.defineProperty(CP2, "__esModule", {
        value: !0
    });
    CP2.getSpanContext = CP2.setSpanContext = CP2.deleteSpan = CP2.setSpan = CP2.getActiveSpan = CP2.getSpan = void 0;
    var it4 = $31(),
        nt4 = CT1(),
        at4 = N31(),
        vI0 = it4.createContextKey("OpenTelemetry Context Key SPAN");

    function bI0(A) {
        return A.getValue(vI0) || void 0
    }
    CP2.getSpan = bI0;

    function st4() {
        return bI0(at4.ContextAPI.getInstance().active())
    }
    CP2.getActiveSpan = st4;

    function VP2(A, B) {
        return A.setValue(vI0, B)
    }
    CP2.setSpan = VP2;

    function rt4(A) {
        return A.deleteValue(vI0)
    }
    CP2.deleteSpan = rt4;

    function ot4(A, B) {
        return VP2(A, new nt4.NonRecordingSpan(B))
    }
    CP2.setSpanContext = ot4;

    function tt4(A) {
        var B;
        return (B = bI0(A)) === null || B === void 0 ? void 0 : B.spanContext()
    }
    CP2.getSpanContext = tt4
});
var KT1 = E((UP2) => {
    Object.defineProperty(UP2, "__esModule", {
        value: !0
    });
    UP2.wrapSpanContext = UP2.isSpanContextValid = UP2.isValidSpanId = UP2.isValidTraceId = void 0;
    var HP2 = VT1(),
        De4 = CT1(),
        Ge4 = /^([0-9a-f]{32})$/i,
        Fe4 = /^[0-9a-f]{16}$/i;

    function zP2(A) {
        return Ge4.test(A) && A !== HP2.INVALID_TRACEID
    }
    UP2.isValidTraceId = zP2;

    function EP2(A) {
        return Fe4.test(A) && A !== HP2.INVALID_SPANID
    }
    UP2.isValidSpanId = EP2;

    function Ie4(A) {
        return zP2(A.traceId) && EP2(A.spanId)
    }
    UP2.isSpanContextValid = Ie4;

    function Ye4(A) {
        return new De4.NonRecordingSpan(A)
    }
    UP2.wrapSpanContext = Ye4
});
var uI0 = E((NP2) => {
    Object.defineProperty(NP2, "__esModule", {
        value: !0
    });
    NP2.NoopTracer = void 0;
    var Ve4 = N31(),
        $P2 = fI0(),
        hI0 = CT1(),
        Ce4 = KT1(),
        gI0 = Ve4.ContextAPI.getInstance();
    class qP2 {
        startSpan(A, B, Q = gI0.active()) {
            if (Boolean(B === null || B === void 0 ? void 0 : B.root)) return new hI0.NonRecordingSpan;
            let D = Q && $P2.getSpanContext(Q);
            if (Ke4(D) && Ce4.isSpanContextValid(D)) return new hI0.NonRecordingSpan(D);
            else return new hI0.NonRecordingSpan
        }
        startActiveSpan(A, B, Q, Z) {
            let D, G, F;
            if (arguments.length < 2) return;
            else if (arguments.length === 2) F = B;
            else if (arguments.length === 3) D = B, F = Q;
            else D = B, G = Q, F = Z;
            let I = G !== null && G !== void 0 ? G : gI0.active(),
                Y = this.startSpan(A, D, I),
                W = $P2.setSpan(I, Y);
            return gI0.with(W, F, void 0, Y)
        }
    }
    NP2.NoopTracer = qP2;

    function Ke4(A) {
        return typeof A === "object" && typeof A.spanId === "string" && typeof A.traceId === "string" && typeof A.traceFlags === "number"
    }
});