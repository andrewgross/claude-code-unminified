/* chunk:308 bytes:[7170032, 7186447) size:16415 source:unpacked-cli.js */
var Bm2 = E((eu2) => {
    Object.defineProperty(eu2, "__esModule", {
        value: !0
    });
    eu2.diagLogLevelFromString = void 0;
    var NP = XQ(),
        tu2 = {
            ALL: NP.DiagLogLevel.ALL,
            VERBOSE: NP.DiagLogLevel.VERBOSE,
            DEBUG: NP.DiagLogLevel.DEBUG,
            INFO: NP.DiagLogLevel.INFO,
            WARN: NP.DiagLogLevel.WARN,
            ERROR: NP.DiagLogLevel.ERROR,
            NONE: NP.DiagLogLevel.NONE
        };

    function ED6(A) {
        if (A == null) return;
        let B = tu2[A.toUpperCase()];
        if (B == null) return NP.diag.warn(`Unknown log level "${A}", expected one of ${Object.keys(tu2)}, using default`), NP.DiagLogLevel.INFO;
        return B
    }
    eu2.diagLogLevelFromString = ED6
});
var Gm2 = E((Zm2) => {
    Object.defineProperty(Zm2, "__esModule", {
        value: !0
    });
    Zm2._export = void 0;
    var Qm2 = XQ(),
        UD6 = O31();

    function wD6(A, B) {
        return new Promise((Q) => {
            Qm2.context.with(UD6.suppressTracing(Qm2.context.active()), () => {
                A.export(B, (Z) => {
                    Q(Z)
                })
            })
        })
    }
    Zm2._export = wD6
});
var f3 = E((BQ) => {
    Object.defineProperty(BQ, "__esModule", {
        value: !0
    });
    BQ.internal = BQ.diagLogLevelFromString = BQ.BindOnceFuture = BQ.urlMatches = BQ.isUrlIgnored = BQ.callWithTimeout = BQ.TimeoutError = BQ.merge = BQ.TraceState = BQ.unsuppressTracing = BQ.suppressTracing = BQ.isTracingSuppressed = BQ.setRPCMetadata = BQ.getRPCMetadata = BQ.deleteRPCMetadata = BQ.RPCType = BQ.parseTraceParent = BQ.W3CTraceContextPropagator = BQ.TRACE_STATE_HEADER = BQ.TRACE_PARENT_HEADER = BQ.CompositePropagator = BQ.unrefTimer = BQ.otperformance = BQ.getStringListFromEnv = BQ.getNumberFromEnv = BQ.getBooleanFromEnv = BQ.getStringFromEnv = BQ._globalThis = BQ.SDK_INFO = BQ.parseKeyPairsIntoRecord = BQ.ExportResultCode = BQ.timeInputToHrTime = BQ.millisToHrTime = BQ.isTimeInputHrTime = BQ.isTimeInput = BQ.hrTimeToTimeStamp = BQ.hrTimeToNanoseconds = BQ.hrTimeToMilliseconds = BQ.hrTimeToMicroseconds = BQ.hrTimeDuration = BQ.hrTime = BQ.getTimeOrigin = BQ.addHrTimes = BQ.loggingErrorHandler = BQ.setGlobalErrorHandler = BQ.globalErrorHandler = BQ.sanitizeAttributes = BQ.isAttributeValue = BQ.AnchoredClock = BQ.W3CBaggagePropagator = void 0;
    var $D6 = Nk2();
    Object.defineProperty(BQ, "W3CBaggagePropagator", {
        enumerable: !0,
        get: function() {
            return $D6.W3CBaggagePropagator
        }
    });
    var qD6 = Ok2();
    Object.defineProperty(BQ, "AnchoredClock", {
        enumerable: !0,
        get: function() {
            return qD6.AnchoredClock
        }
    });
    var Fm2 = _k2();
    Object.defineProperty(BQ, "isAttributeValue", {
        enumerable: !0,
        get: function() {
            return Fm2.isAttributeValue
        }
    });
    Object.defineProperty(BQ, "sanitizeAttributes", {
        enumerable: !0,
        get: function() {
            return Fm2.sanitizeAttributes
        }
    });
    var Im2 = gk2();
    Object.defineProperty(BQ, "globalErrorHandler", {
        enumerable: !0,
        get: function() {
            return Im2.globalErrorHandler
        }
    });
    Object.defineProperty(BQ, "setGlobalErrorHandler", {
        enumerable: !0,
        get: function() {
            return Im2.setGlobalErrorHandler
        }
    });
    var ND6 = SY0();
    Object.defineProperty(BQ, "loggingErrorHandler", {
        enumerable: !0,
        get: function() {
            return ND6.loggingErrorHandler
        }
    });
    var qE = og2();
    Object.defineProperty(BQ, "addHrTimes", {
        enumerable: !0,
        get: function() {
            return qE.addHrTimes
        }
    });
    Object.defineProperty(BQ, "getTimeOrigin", {
        enumerable: !0,
        get: function() {
            return qE.getTimeOrigin
        }
    });
    Object.defineProperty(BQ, "hrTime", {
        enumerable: !0,
        get: function() {
            return qE.hrTime
        }
    });
    Object.defineProperty(BQ, "hrTimeDuration", {
        enumerable: !0,
        get: function() {
            return qE.hrTimeDuration
        }
    });
    Object.defineProperty(BQ, "hrTimeToMicroseconds", {
        enumerable: !0,
        get: function() {
            return qE.hrTimeToMicroseconds
        }
    });
    Object.defineProperty(BQ, "hrTimeToMilliseconds", {
        enumerable: !0,
        get: function() {
            return qE.hrTimeToMilliseconds
        }
    });
    Object.defineProperty(BQ, "hrTimeToNanoseconds", {
        enumerable: !0,
        get: function() {
            return qE.hrTimeToNanoseconds
        }
    });
    Object.defineProperty(BQ, "hrTimeToTimeStamp", {
        enumerable: !0,
        get: function() {
            return qE.hrTimeToTimeStamp
        }
    });
    Object.defineProperty(BQ, "isTimeInput", {
        enumerable: !0,
        get: function() {
            return qE.isTimeInput
        }
    });
    Object.defineProperty(BQ, "isTimeInputHrTime", {
        enumerable: !0,
        get: function() {
            return qE.isTimeInputHrTime
        }
    });
    Object.defineProperty(BQ, "millisToHrTime", {
        enumerable: !0,
        get: function() {
            return qE.millisToHrTime
        }
    });
    Object.defineProperty(BQ, "timeInputToHrTime", {
        enumerable: !0,
        get: function() {
            return qE.timeInputToHrTime
        }
    });
    var LD6 = eg2();
    Object.defineProperty(BQ, "ExportResultCode", {
        enumerable: !0,
        get: function() {
            return LD6.ExportResultCode
        }
    });
    var MD6 = OY0();
    Object.defineProperty(BQ, "parseKeyPairsIntoRecord", {
        enumerable: !0,
        get: function() {
            return MD6.parseKeyPairsIntoRecord
        }
    });
    var e_ = kY0();
    Object.defineProperty(BQ, "SDK_INFO", {
        enumerable: !0,
        get: function() {
            return e_.SDK_INFO
        }
    });
    Object.defineProperty(BQ, "_globalThis", {
        enumerable: !0,
        get: function() {
            return e_._globalThis
        }
    });
    Object.defineProperty(BQ, "getStringFromEnv", {
        enumerable: !0,
        get: function() {
            return e_.getStringFromEnv
        }
    });
    Object.defineProperty(BQ, "getBooleanFromEnv", {
        enumerable: !0,
        get: function() {
            return e_.getBooleanFromEnv
        }
    });
    Object.defineProperty(BQ, "getNumberFromEnv", {
        enumerable: !0,
        get: function() {
            return e_.getNumberFromEnv
        }
    });
    Object.defineProperty(BQ, "getStringListFromEnv", {
        enumerable: !0,
        get: function() {
            return e_.getStringListFromEnv
        }
    });
    Object.defineProperty(BQ, "otperformance", {
        enumerable: !0,
        get: function() {
            return e_.otperformance
        }
    });
    Object.defineProperty(BQ, "unrefTimer", {
        enumerable: !0,
        get: function() {
            return e_.unrefTimer
        }
    });
    var RD6 = Du2();
    Object.defineProperty(BQ, "CompositePropagator", {
        enumerable: !0,
        get: function() {
            return RD6.CompositePropagator
        }
    });
    var yT1 = Uu2();
    Object.defineProperty(BQ, "TRACE_PARENT_HEADER", {
        enumerable: !0,
        get: function() {
            return yT1.TRACE_PARENT_HEADER
        }
    });
    Object.defineProperty(BQ, "TRACE_STATE_HEADER", {
        enumerable: !0,
        get: function() {
            return yT1.TRACE_STATE_HEADER
        }
    });
    Object.defineProperty(BQ, "W3CTraceContextPropagator", {
        enumerable: !0,
        get: function() {
            return yT1.W3CTraceContextPropagator
        }
    });
    Object.defineProperty(BQ, "parseTraceParent", {
        enumerable: !0,
        get: function() {
            return yT1.parseTraceParent
        }
    });
    var _T1 = Nu2();
    Object.defineProperty(BQ, "RPCType", {
        enumerable: !0,
        get: function() {
            return _T1.RPCType
        }
    });
    Object.defineProperty(BQ, "deleteRPCMetadata", {
        enumerable: !0,
        get: function() {
            return _T1.deleteRPCMetadata
        }
    });
    Object.defineProperty(BQ, "getRPCMetadata", {
        enumerable: !0,
        get: function() {
            return _T1.getRPCMetadata
        }
    });
    Object.defineProperty(BQ, "setRPCMetadata", {
        enumerable: !0,
        get: function() {
            return _T1.setRPCMetadata
        }
    });
    var mY0 = O31();
    Object.defineProperty(BQ, "isTracingSuppressed", {
        enumerable: !0,
        get: function() {
            return mY0.isTracingSuppressed
        }
    });
    Object.defineProperty(BQ, "suppressTracing", {
        enumerable: !0,
        get: function() {
            return mY0.suppressTracing
        }
    });
    Object.defineProperty(BQ, "unsuppressTracing", {
        enumerable: !0,
        get: function() {
            return mY0.unsuppressTracing
        }
    });
    var OD6 = hY0();
    Object.defineProperty(BQ, "TraceState", {
        enumerable: !0,
        get: function() {
            return OD6.TraceState
        }
    });
    var TD6 = bu2();
    Object.defineProperty(BQ, "merge", {
        enumerable: !0,
        get: function() {
            return TD6.merge
        }
    });
    var Ym2 = gu2();
    Object.defineProperty(BQ, "TimeoutError", {
        enumerable: !0,
        get: function() {
            return Ym2.TimeoutError
        }
    });
    Object.defineProperty(BQ, "callWithTimeout", {
        enumerable: !0,
        get: function() {
            return Ym2.callWithTimeout
        }
    });
    var Wm2 = cu2();
    Object.defineProperty(BQ, "isUrlIgnored", {
        enumerable: !0,
        get: function() {
            return Wm2.isUrlIgnored
        }
    });
    Object.defineProperty(BQ, "urlMatches", {
        enumerable: !0,
        get: function() {
            return Wm2.urlMatches
        }
    });
    var PD6 = ou2();
    Object.defineProperty(BQ, "BindOnceFuture", {
        enumerable: !0,
        get: function() {
            return PD6.BindOnceFuture
        }
    });
    var SD6 = Bm2();
    Object.defineProperty(BQ, "diagLogLevelFromString", {
        enumerable: !0,
        get: function() {
            return SD6.diagLogLevelFromString
        }
    });
    var jD6 = Gm2();
    BQ.internal = {
        _export: jD6._export
    }
});
var Km2 = E((Vm2) => {
    Object.defineProperty(Vm2, "__esModule", {
        value: !0
    });
    Vm2.LastValueAggregator = Vm2.LastValueAccumulation = void 0;
    var kD6 = Wt(),
        j31 = f3(),
        yD6 = o_();
    class k31 {
        startTime;
        _current;
        sampleTime;
        constructor(A, B = 0, Q = [0, 0]) {
            this.startTime = A, this._current = B, this.sampleTime = Q
        }
        record(A) {
            this._current = A, this.sampleTime = j31.millisToHrTime(Date.now())
        }
        setStartTime(A) {
            this.startTime = A
        }
        toPointValue() {
            return this._current
        }
    }
    Vm2.LastValueAccumulation = k31;
    class Xm2 {
        kind = kD6.AggregatorKind.LAST_VALUE;
        createAccumulation(A) {
            return new k31(A)
        }
        merge(A, B) {
            let Q = j31.hrTimeToMicroseconds(B.sampleTime) >= j31.hrTimeToMicroseconds(A.sampleTime) ? B : A;
            return new k31(A.startTime, Q.toPointValue(), Q.sampleTime)
        }
        diff(A, B) {
            let Q = j31.hrTimeToMicroseconds(B.sampleTime) >= j31.hrTimeToMicroseconds(A.sampleTime) ? B : A;
            return new k31(B.startTime, Q.toPointValue(), Q.sampleTime)
        }
        toMetricData(A, B, Q, Z) {
            return {
                descriptor: A,
                aggregationTemporality: B,
                dataPointType: yD6.DataPointType.GAUGE,
                dataPoints: Q.map(([D, G]) => {
                    return {
                        attributes: D,
                        startTime: G.startTime,
                        endTime: Z,
                        value: G.toPointValue()
                    }
                })
            }
        }
    }
    Vm2.LastValueAggregator = Xm2
});
var Um2 = E((zm2) => {
    Object.defineProperty(zm2, "__esModule", {
        value: !0
    });
    zm2.SumAggregator = zm2.SumAccumulation = void 0;
    var xD6 = Wt(),
        vD6 = o_();
    class au {
        startTime;
        monotonic;
        _current;
        reset;
        constructor(A, B, Q = 0, Z = !1) {
            this.startTime = A, this.monotonic = B, this._current = Q, this.reset = Z
        }
        record(A) {
            if (this.monotonic && A < 0) return;
            this._current += A
        }
        setStartTime(A) {
            this.startTime = A
        }
        toPointValue() {
            return this._current
        }
    }
    zm2.SumAccumulation = au;
    class Hm2 {
        monotonic;
        kind = xD6.AggregatorKind.SUM;
        constructor(A) {
            this.monotonic = A
        }
        createAccumulation(A) {
            return new au(A, this.monotonic)
        }
        merge(A, B) {
            let Q = A.toPointValue(),
                Z = B.toPointValue();
            if (B.reset) return new au(B.startTime, this.monotonic, Z, B.reset);
            return new au(A.startTime, this.monotonic, Q + Z)
        }
        diff(A, B) {
            let Q = A.toPointValue(),
                Z = B.toPointValue();
            if (this.monotonic && Q > Z) return new au(B.startTime, this.monotonic, Z, !0);
            return new au(B.startTime, this.monotonic, Z - Q)
        }
        toMetricData(A, B, Q, Z) {
            return {
                descriptor: A,
                aggregationTemporality: B,
                dataPointType: vD6.DataPointType.SUM,
                dataPoints: Q.map(([D, G]) => {
                    return {
                        attributes: D,
                        startTime: G.startTime,
                        endTime: Z,
                        value: G.toPointValue()
                    }
                }),
                isMonotonic: this.monotonic
            }
        }
    }
    zm2.SumAggregator = Hm2
});
var Lm2 = E((D$) => {
    Object.defineProperty(D$, "__esModule", {
        value: !0
    });
    D$.SumAggregator = D$.SumAccumulation = D$.LastValueAggregator = D$.LastValueAccumulation = D$.ExponentialHistogramAggregator = D$.ExponentialHistogramAccumulation = D$.HistogramAggregator = D$.HistogramAccumulation = D$.DropAggregator = void 0;
    var fD6 = Sj2();
    Object.defineProperty(D$, "DropAggregator", {
        enumerable: !0,
        get: function() {
            return fD6.DropAggregator
        }
    });
    var wm2 = _j2();
    Object.defineProperty(D$, "HistogramAccumulation", {
        enumerable: !0,
        get: function() {
            return wm2.HistogramAccumulation
        }
    });
    Object.defineProperty(D$, "HistogramAggregator", {
        enumerable: !0,
        get: function() {
            return wm2.HistogramAggregator
        }
    });
    var $m2 = Xk2();
    Object.defineProperty(D$, "ExponentialHistogramAccumulation", {
        enumerable: !0,
        get: function() {
            return $m2.ExponentialHistogramAccumulation
        }
    });
    Object.defineProperty(D$, "ExponentialHistogramAggregator", {
        enumerable: !0,
        get: function() {
            return $m2.ExponentialHistogramAggregator
        }
    });
    var qm2 = Km2();
    Object.defineProperty(D$, "LastValueAccumulation", {
        enumerable: !0,
        get: function() {
            return qm2.LastValueAccumulation
        }
    });
    Object.defineProperty(D$, "LastValueAggregator", {
        enumerable: !0,
        get: function() {
            return qm2.LastValueAggregator
        }
    });
    var Nm2 = Um2();
    Object.defineProperty(D$, "SumAccumulation", {
        enumerable: !0,
        get: function() {
            return Nm2.SumAccumulation
        }
    });
    Object.defineProperty(D$, "SumAggregator", {
        enumerable: !0,
        get: function() {
            return Nm2.SumAggregator
        }
    })
});