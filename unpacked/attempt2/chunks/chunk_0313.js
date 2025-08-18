/* chunk:313 bytes:[7263355, 7282903) size:19548 source:unpacked-cli.js */
var Bx = E((gV) => {
    Object.defineProperty(gV, "__esModule", {
        value: !0
    });
    gV.TimeoutError = gV.createDenyListAttributesProcessor = gV.createAllowListAttributesProcessor = gV.AggregationType = gV.MeterProvider = gV.ConsoleMetricExporter = gV.InMemoryMetricExporter = gV.PeriodicExportingMetricReader = gV.MetricReader = gV.InstrumentType = gV.DataPointType = gV.AggregationTemporality = void 0;
    var jI6 = UT1();
    Object.defineProperty(gV, "AggregationTemporality", {
        enumerable: !0,
        get: function() {
            return jI6.AggregationTemporality
        }
    });
    var Xp2 = o_();
    Object.defineProperty(gV, "DataPointType", {
        enumerable: !0,
        get: function() {
            return Xp2.DataPointType
        }
    });
    Object.defineProperty(gV, "InstrumentType", {
        enumerable: !0,
        get: function() {
            return Xp2.InstrumentType
        }
    });
    var kI6 = iY0();
    Object.defineProperty(gV, "MetricReader", {
        enumerable: !0,
        get: function() {
            return kI6.MetricReader
        }
    });
    var yI6 = pm2();
    Object.defineProperty(gV, "PeriodicExportingMetricReader", {
        enumerable: !0,
        get: function() {
            return yI6.PeriodicExportingMetricReader
        }
    });
    var _I6 = rm2();
    Object.defineProperty(gV, "InMemoryMetricExporter", {
        enumerable: !0,
        get: function() {
            return _I6.InMemoryMetricExporter
        }
    });
    var xI6 = Ad2();
    Object.defineProperty(gV, "ConsoleMetricExporter", {
        enumerable: !0,
        get: function() {
            return xI6.ConsoleMetricExporter
        }
    });
    var vI6 = Jp2();
    Object.defineProperty(gV, "MeterProvider", {
        enumerable: !0,
        get: function() {
            return vI6.MeterProvider
        }
    });
    var bI6 = _31();
    Object.defineProperty(gV, "AggregationType", {
        enumerable: !0,
        get: function() {
            return bI6.AggregationType
        }
    });
    var Vp2 = pT1();
    Object.defineProperty(gV, "createAllowListAttributesProcessor", {
        enumerable: !0,
        get: function() {
            return Vp2.createAllowListAttributesProcessor
        }
    });
    Object.defineProperty(gV, "createDenyListAttributesProcessor", {
        enumerable: !0,
        get: function() {
            return Vp2.createDenyListAttributesProcessor
        }
    });
    var fI6 = Z$();
    Object.defineProperty(gV, "TimeoutError", {
        enumerable: !0,
        get: function() {
            return fI6.TimeoutError
        }
    })
});
var EW0 = E((Cp2) => {
    Object.defineProperty(Cp2, "__esModule", {
        value: !0
    });
    Cp2.AggregationTemporalityPreference = void 0;
    var gI6;
    (function(A) {
        A[A.DELTA = 0] = "DELTA", A[A.CUMULATIVE = 1] = "CUMULATIVE", A[A.LOWMEMORY = 2] = "LOWMEMORY"
    })(gI6 = Cp2.AggregationTemporalityPreference || (Cp2.AggregationTemporalityPreference = {}))
});
var Ep2 = E((Hp2) => {
    Object.defineProperty(Hp2, "__esModule", {
        value: !0
    });
    Hp2.OTLPExporterBase = void 0;
    class Kp2 {
        _delegate;
        constructor(A) {
            this._delegate = A
        }
        export (A, B) {
            this._delegate.export(A, B)
        }
        forceFlush() {
            return this._delegate.forceFlush()
        }
        shutdown() {
            return this._delegate.shutdown()
        }
    }
    Hp2.OTLPExporterBase = Kp2
});
var aT1 = E((wp2) => {
    Object.defineProperty(wp2, "__esModule", {
        value: !0
    });
    wp2.OTLPExporterError = void 0;
    class Up2 extends Error {
        code;
        name = "OTLPExporterError";
        data;
        constructor(A, B, Q) {
            super(A);
            this.data = Q, this.code = B
        }
    }
    wp2.OTLPExporterError = Up2
});
var m31 = E((Np2) => {
    Object.defineProperty(Np2, "__esModule", {
        value: !0
    });
    Np2.getSharedConfigurationDefaults = Np2.mergeOtlpSharedConfigurationWithDefaults = Np2.wrapStaticHeadersInFunction = Np2.validateTimeoutMillis = void 0;

    function qp2(A) {
        if (Number.isFinite(A) && A > 0) return A;
        throw new Error(`Configuration: timeoutMillis is invalid, expected number greater than 0 (actual: '${A}')`)
    }
    Np2.validateTimeoutMillis = qp2;

    function uI6(A) {
        if (A == null) return;
        return () => A
    }
    Np2.wrapStaticHeadersInFunction = uI6;

    function mI6(A, B, Q) {
        return {
            timeoutMillis: qp2(A.timeoutMillis ?? B.timeoutMillis ?? Q.timeoutMillis),
            concurrencyLimit: A.concurrencyLimit ?? B.concurrencyLimit ?? Q.concurrencyLimit,
            compression: A.compression ?? B.compression ?? Q.compression
        }
    }
    Np2.mergeOtlpSharedConfigurationWithDefaults = mI6;

    function dI6() {
        return {
            timeoutMillis: 1e4,
            concurrencyLimit: 30,
            compression: "none"
        }
    }
    Np2.getSharedConfigurationDefaults = dI6
});
var Rp2 = E((Mp2) => {
    Object.defineProperty(Mp2, "__esModule", {
        value: !0
    });
    Mp2.CompressionAlgorithm = void 0;
    var iI6;
    (function(A) {
        A.NONE = "none", A.GZIP = "gzip"
    })(iI6 = Mp2.CompressionAlgorithm || (Mp2.CompressionAlgorithm = {}))
});
var wW0 = E((Tp2) => {
    Object.defineProperty(Tp2, "__esModule", {
        value: !0
    });
    Tp2.createBoundedQueueExportPromiseHandler = void 0;
    class Op2 {
        _concurrencyLimit;
        _sendingPromises = [];
        constructor(A) {
            this._concurrencyLimit = A
        }
        pushPromise(A) {
            if (this.hasReachedLimit()) throw new Error("Concurrency Limit reached");
            this._sendingPromises.push(A);
            let B = () => {
                let Q = this._sendingPromises.indexOf(A);
                this._sendingPromises.splice(Q, 1)
            };
            A.then(B, B)
        }
        hasReachedLimit() {
            return this._sendingPromises.length >= this._concurrencyLimit
        }
        async awaitAll() {
            await Promise.all(this._sendingPromises)
        }
    }

    function nI6(A) {
        return new Op2(A.concurrencyLimit)
    }
    Tp2.createBoundedQueueExportPromiseHandler = nI6
});
var kp2 = E((Sp2) => {
    Object.defineProperty(Sp2, "__esModule", {
        value: !0
    });
    Sp2.createLoggingPartialSuccessResponseHandler = void 0;
    var aI6 = XQ();

    function sI6(A) {
        return Object.prototype.hasOwnProperty.call(A, "partialSuccess")
    }

    function rI6() {
        return {
            handleResponse(A) {
                if (A == null || !sI6(A) || A.partialSuccess == null || Object.keys(A.partialSuccess).length === 0) return;
                aI6.diag.warn("Received Partial Success response:", JSON.stringify(A.partialSuccess))
            }
        }
    }
    Sp2.createLoggingPartialSuccessResponseHandler = rI6
});
var $W0 = E((xp2) => {
    Object.defineProperty(xp2, "__esModule", {
        value: !0
    });
    xp2.createOtlpExportDelegate = void 0;
    var Zm = f3(),
        yp2 = aT1(),
        oI6 = kp2(),
        tI6 = XQ();
    class _p2 {
        _transport;
        _serializer;
        _responseHandler;
        _promiseQueue;
        _timeout;
        _diagLogger;
        constructor(A, B, Q, Z, D) {
            this._transport = A, this._serializer = B, this._responseHandler = Q, this._promiseQueue = Z, this._timeout = D, this._diagLogger = tI6.diag.createComponentLogger({
                namespace: "OTLPExportDelegate"
            })
        }
        export (A, B) {
            if (this._diagLogger.debug("items to be sent", A), this._promiseQueue.hasReachedLimit()) {
                B({
                    code: Zm.ExportResultCode.FAILED,
                    error: new Error("Concurrent export limit reached")
                });
                return
            }
            let Q = this._serializer.serializeRequest(A);
            if (Q == null) {
                B({
                    code: Zm.ExportResultCode.FAILED,
                    error: new Error("Nothing to send")
                });
                return
            }
            this._promiseQueue.pushPromise(this._transport.send(Q, this._timeout).then((Z) => {
                if (Z.status === "success") {
                    if (Z.data != null) try {
                        this._responseHandler.handleResponse(this._serializer.deserializeResponse(Z.data))
                    } catch (D) {
                        this._diagLogger.warn("Export succeeded but could not deserialize response - is the response specification compliant?", D, Z.data)
                    }
                    B({
                        code: Zm.ExportResultCode.SUCCESS
                    });
                    return
                } else if (Z.status === "failure" && Z.error) {
                    B({
                        code: Zm.ExportResultCode.FAILED,
                        error: Z.error
                    });
                    return
                } else if (Z.status === "retryable") B({
                    code: Zm.ExportResultCode.FAILED,
                    error: new yp2.OTLPExporterError("Export failed with retryable status")
                });
                else B({
                    code: Zm.ExportResultCode.FAILED,
                    error: new yp2.OTLPExporterError("Export failed with unknown error")
                })
            }, (Z) => B({
                code: Zm.ExportResultCode.FAILED,
                error: Z
            })))
        }
        forceFlush() {
            return this._promiseQueue.awaitAll()
        }
        async shutdown() {
            this._diagLogger.debug("shutdown started"), await this.forceFlush(), this._transport.shutdown()
        }
    }

    function eI6(A, B) {
        return new _p2(A.transport, A.serializer, oI6.createLoggingPartialSuccessResponseHandler(), A.promiseHandler, B.timeout)
    }
    xp2.createOtlpExportDelegate = eI6
});
var hp2 = E((bp2) => {
    Object.defineProperty(bp2, "__esModule", {
        value: !0
    });
    bp2.createOtlpNetworkExportDelegate = void 0;
    var AY6 = wW0(),
        BY6 = $W0();

    function QY6(A, B, Q) {
        return BY6.createOtlpExportDelegate({
            transport: Q,
            serializer: B,
            promiseHandler: AY6.createBoundedQueueExportPromiseHandler(A)
        }, {
            timeout: A.timeoutMillis
        })
    }
    bp2.createOtlpNetworkExportDelegate = QY6
});
var Dm = E((Qx) => {
    Object.defineProperty(Qx, "__esModule", {
        value: !0
    });
    Qx.createOtlpNetworkExportDelegate = Qx.CompressionAlgorithm = Qx.getSharedConfigurationDefaults = Qx.mergeOtlpSharedConfigurationWithDefaults = Qx.OTLPExporterError = Qx.OTLPExporterBase = void 0;
    var ZY6 = Ep2();
    Object.defineProperty(Qx, "OTLPExporterBase", {
        enumerable: !0,
        get: function() {
            return ZY6.OTLPExporterBase
        }
    });
    var DY6 = aT1();
    Object.defineProperty(Qx, "OTLPExporterError", {
        enumerable: !0,
        get: function() {
            return DY6.OTLPExporterError
        }
    });
    var gp2 = m31();
    Object.defineProperty(Qx, "mergeOtlpSharedConfigurationWithDefaults", {
        enumerable: !0,
        get: function() {
            return gp2.mergeOtlpSharedConfigurationWithDefaults
        }
    });
    Object.defineProperty(Qx, "getSharedConfigurationDefaults", {
        enumerable: !0,
        get: function() {
            return gp2.getSharedConfigurationDefaults
        }
    });
    var GY6 = Rp2();
    Object.defineProperty(Qx, "CompressionAlgorithm", {
        enumerable: !0,
        get: function() {
            return GY6.CompressionAlgorithm
        }
    });
    var FY6 = hp2();
    Object.defineProperty(Qx, "createOtlpNetworkExportDelegate", {
        enumerable: !0,
        get: function() {
            return FY6.createOtlpNetworkExportDelegate
        }
    })
});
var LW0 = E((dp2) => {
    Object.defineProperty(dp2, "__esModule", {
        value: !0
    });
    dp2.OTLPMetricExporterBase = dp2.LowMemoryTemporalitySelector = dp2.DeltaTemporalitySelector = dp2.CumulativeTemporalitySelector = void 0;
    var YY6 = f3(),
        BF = Bx(),
        up2 = EW0(),
        WY6 = Dm(),
        JY6 = XQ(),
        XY6 = () => BF.AggregationTemporality.CUMULATIVE;
    dp2.CumulativeTemporalitySelector = XY6;
    var VY6 = (A) => {
        switch (A) {
            case BF.InstrumentType.COUNTER:
            case BF.InstrumentType.OBSERVABLE_COUNTER:
            case BF.InstrumentType.GAUGE:
            case BF.InstrumentType.HISTOGRAM:
            case BF.InstrumentType.OBSERVABLE_GAUGE:
                return BF.AggregationTemporality.DELTA;
            case BF.InstrumentType.UP_DOWN_COUNTER:
            case BF.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
                return BF.AggregationTemporality.CUMULATIVE
        }
    };
    dp2.DeltaTemporalitySelector = VY6;
    var CY6 = (A) => {
        switch (A) {
            case BF.InstrumentType.COUNTER:
            case BF.InstrumentType.HISTOGRAM:
                return BF.AggregationTemporality.DELTA;
            case BF.InstrumentType.GAUGE:
            case BF.InstrumentType.UP_DOWN_COUNTER:
            case BF.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
            case BF.InstrumentType.OBSERVABLE_COUNTER:
            case BF.InstrumentType.OBSERVABLE_GAUGE:
                return BF.AggregationTemporality.CUMULATIVE
        }
    };
    dp2.LowMemoryTemporalitySelector = CY6;

    function KY6() {
        let A = (YY6.getStringFromEnv("OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE") ?? "cumulative").toLowerCase();
        if (A === "cumulative") return dp2.CumulativeTemporalitySelector;
        if (A === "delta") return dp2.DeltaTemporalitySelector;
        if (A === "lowmemory") return dp2.LowMemoryTemporalitySelector;
        return JY6.diag.warn(`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE is set to '${A}', but only 'cumulative' and 'delta' are allowed. Using default ('cumulative') instead.`), dp2.CumulativeTemporalitySelector
    }

    function HY6(A) {
        if (A != null) {
            if (A === up2.AggregationTemporalityPreference.DELTA) return dp2.DeltaTemporalitySelector;
            else if (A === up2.AggregationTemporalityPreference.LOWMEMORY) return dp2.LowMemoryTemporalitySelector;
            return dp2.CumulativeTemporalitySelector
        }
        return KY6()
    }
    var zY6 = Object.freeze({
        type: BF.AggregationType.DEFAULT
    });

    function EY6(A) {
        return A?.aggregationPreference ?? (() => zY6)
    }
    class mp2 extends WY6.OTLPExporterBase {
        _aggregationTemporalitySelector;
        _aggregationSelector;
        constructor(A, B) {
            super(A);
            this._aggregationSelector = EY6(B), this._aggregationTemporalitySelector = HY6(B?.temporalityPreference)
        }
        selectAggregation(A) {
            return this._aggregationSelector(A)
        }
        selectAggregationTemporality(A) {
            return this._aggregationTemporalitySelector(A)
        }
    }
    dp2.OTLPMetricExporterBase = mp2
});
var MW0 = E((Hc5, lp2) => {
    lp2.exports = UY6;

    function UY6(A, B) {
        var Q = new Array(arguments.length - 1),
            Z = 0,
            D = 2,
            G = !0;
        while (D < arguments.length) Q[Z++] = arguments[D++];
        return new Promise(function F(I, Y) {
            Q[Z] = function W(J) {
                if (G)
                    if (G = !1, J) Y(J);
                    else {
                        var X = new Array(arguments.length - 1),
                            V = 0;
                        while (V < X.length) X[V++] = arguments[V];
                        I.apply(null, X)
                    }
            };
            try {
                A.apply(B || null, Q)
            } catch (W) {
                if (G) G = !1, Y(W)
            }
        })
    }
});
var ap2 = E((np2) => {
    var rT1 = np2;
    rT1.length = function A(B) {
        var Q = B.length;
        if (!Q) return 0;
        var Z = 0;
        while (--Q % 4 > 1 && B.charAt(Q) === "=") ++Z;
        return Math.ceil(B.length * 3) / 4 - Z
    };
    var $t = new Array(64),
        ip2 = new Array(123);
    for (LE = 0; LE < 64;) ip2[$t[LE] = LE < 26 ? LE + 65 : LE < 52 ? LE + 71 : LE < 62 ? LE - 4 : LE - 59 | 43] = LE++;
    var LE;
    rT1.encode = function A(B, Q, Z) {
        var D = null,
            G = [],
            F = 0,
            I = 0,
            Y;
        while (Q < Z) {
            var W = B[Q++];
            switch (I) {
                case 0:
                    G[F++] = $t[W >> 2], Y = (W & 3) << 4, I = 1;
                    break;
                case 1:
                    G[F++] = $t[Y | W >> 4], Y = (W & 15) << 2, I = 2;
                    break;
                case 2:
                    G[F++] = $t[Y | W >> 6], G[F++] = $t[W & 63], I = 0;
                    break
            }
            if (F > 8191)(D || (D = [])).push(String.fromCharCode.apply(String, G)), F = 0
        }
        if (I) {
            if (G[F++] = $t[Y], G[F++] = 61, I === 1) G[F++] = 61
        }
        if (D) {
            if (F) D.push(String.fromCharCode.apply(String, G.slice(0, F)));
            return D.join("")
        }
        return String.fromCharCode.apply(String, G.slice(0, F))
    };
    var pp2 = "invalid encoding";
    rT1.decode = function A(B, Q, Z) {
        var D = Z,
            G = 0,
            F;
        for (var I = 0; I < B.length;) {
            var Y = B.charCodeAt(I++);
            if (Y === 61 && G > 1) break;
            if ((Y = ip2[Y]) === void 0) throw Error(pp2);
            switch (G) {
                case 0:
                    F = Y, G = 1;
                    break;
                case 1:
                    Q[Z++] = F << 2 | (Y & 48) >> 4, F = Y, G = 2;
                    break;
                case 2:
                    Q[Z++] = (F & 15) << 4 | (Y & 60) >> 2, F = Y, G = 3;
                    break;
                case 3:
                    Q[Z++] = (F & 3) << 6 | Y, G = 0;
                    break
            }
        }
        if (G === 1) throw Error(pp2);
        return Z - D
    };
    rT1.test = function A(B) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(B)
    }
});
var rp2 = E((Ec5, sp2) => {
    sp2.exports = oT1;

    function oT1() {
        this._listeners = {}
    }
    oT1.prototype.on = function A(B, Q, Z) {
        return (this._listeners[B] || (this._listeners[B] = [])).push({
            fn: Q,
            ctx: Z || this
        }), this
    };
    oT1.prototype.off = function A(B, Q) {
        if (B === void 0) this._listeners = {};
        else if (Q === void 0) this._listeners[B] = [];
        else {
            var Z = this._listeners[B];
            for (var D = 0; D < Z.length;)
                if (Z[D].fn === Q) Z.splice(D, 1);
                else ++D
        }
        return this
    };
    oT1.prototype.emit = function A(B) {
        var Q = this._listeners[B];
        if (Q) {
            var Z = [],
                D = 1;
            for (; D < arguments.length;) Z.push(arguments[D++]);
            for (D = 0; D < Q.length;) Q[D].fn.apply(Q[D++].ctx, Z)
        }
        return this
    }
});