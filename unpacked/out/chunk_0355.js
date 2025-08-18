/* chunk:355 bytes:[8364425, 8382537) size:18112 source:unpacked-cli.js */
var V2B = E((W2B) => {
    Object.defineProperty(W2B, "__esModule", {
        value: !0
    });
    W2B.LoggerProvider = W2B.DEFAULT_LOGGER_NAME = void 0;
    var v71 = XQ(),
        oN6 = HY0(),
        tN6 = dT1(),
        F2B = f3(),
        eN6 = pAB(),
        I2B = aAB(),
        AL6 = tAB(),
        BL6 = G2B();
    W2B.DEFAULT_LOGGER_NAME = "unknown";
    class Y2B {
        _shutdownOnce;
        _sharedState;
        constructor(A = {}) {
            let B = F2B.merge({}, I2B.loadDefaultConfig(), A),
                Q = A.resource ?? tN6.defaultResource();
            this._sharedState = new BL6.LoggerProviderSharedState(Q, B.forceFlushTimeoutMillis, I2B.reconfigureLimits(B.logRecordLimits)), this._shutdownOnce = new F2B.BindOnceFuture(this._shutdown, this)
        }
        getLogger(A, B, Q) {
            if (this._shutdownOnce.isCalled) return v71.diag.warn("A shutdown LoggerProvider cannot provide a Logger"), oN6.NOOP_LOGGER;
            if (!A) v71.diag.warn("Logger requested without instrumentation scope name.");
            let Z = A || W2B.DEFAULT_LOGGER_NAME,
                D = `${Z}@${B||""}:${Q?.schemaUrl||""}`;
            if (!this._sharedState.loggers.has(D)) this._sharedState.loggers.set(D, new eN6.Logger({
                name: Z,
                version: B,
                schemaUrl: Q?.schemaUrl
            }, this._sharedState));
            return this._sharedState.loggers.get(D)
        }
        addLogRecordProcessor(A) {
            if (this._sharedState.registeredLogRecordProcessors.length === 0) this._sharedState.activeProcessor.shutdown().catch((B) => v71.diag.error("Error while trying to shutdown current log record processor", B));
            this._sharedState.registeredLogRecordProcessors.push(A), this._sharedState.activeProcessor = new AL6.MultiLogRecordProcessor(this._sharedState.registeredLogRecordProcessors, this._sharedState.forceFlushTimeoutMillis)
        }
        forceFlush() {
            if (this._shutdownOnce.isCalled) return v71.diag.warn("invalid attempt to force flush after LoggerProvider shutdown"), this._shutdownOnce.promise;
            return this._sharedState.activeProcessor.forceFlush()
        }
        shutdown() {
            if (this._shutdownOnce.isCalled) return v71.diag.warn("shutdown may only be called once per LoggerProvider"), this._shutdownOnce.promise;
            return this._shutdownOnce.call()
        }
        _shutdown() {
            return this._sharedState.activeProcessor.shutdown()
        }
    }
    W2B.LoggerProvider = Y2B
});
var z2B = E((K2B) => {
    Object.defineProperty(K2B, "__esModule", {
        value: !0
    });
    K2B.ConsoleLogRecordExporter = void 0;
    var QL6 = f3(),
        ZL6 = f3();
    class C2B {
        export (A, B) {
            this._sendLogRecords(A, B)
        }
        shutdown() {
            return Promise.resolve()
        }
        _exportInfo(A) {
            return {
                resource: {
                    attributes: A.resource.attributes
                },
                instrumentationScope: A.instrumentationScope,
                timestamp: QL6.hrTimeToMicroseconds(A.hrTime),
                traceId: A.spanContext?.traceId,
                spanId: A.spanContext?.spanId,
                traceFlags: A.spanContext?.traceFlags,
                severityText: A.severityText,
                severityNumber: A.severityNumber,
                body: A.body,
                attributes: A.attributes
            }
        }
        _sendLogRecords(A, B) {
            for (let Q of A) console.dir(this._exportInfo(Q), {
                depth: 3
            });
            B?.({
                code: ZL6.ExportResultCode.SUCCESS
            })
        }
    }
    K2B.ConsoleLogRecordExporter = C2B
});
var $2B = E((U2B) => {
    Object.defineProperty(U2B, "__esModule", {
        value: !0
    });
    U2B.SimpleLogRecordProcessor = void 0;
    var Ae = f3();
    class E2B {
        _exporter;
        _shutdownOnce;
        _unresolvedExports;
        constructor(A) {
            this._exporter = A, this._shutdownOnce = new Ae.BindOnceFuture(this._shutdown, this), this._unresolvedExports = new Set
        }
        onEmit(A) {
            if (this._shutdownOnce.isCalled) return;
            let B = () => Ae.internal._export(this._exporter, [A]).then((Q) => {
                if (Q.code !== Ae.ExportResultCode.SUCCESS) Ae.globalErrorHandler(Q.error ?? new Error(`SimpleLogRecordProcessor: log record export failed (status ${Q})`))
            }).catch(Ae.globalErrorHandler);
            if (A.resource.asyncAttributesPending) {
                let Q = A.resource.waitForAsyncAttributes?.().then(() => {
                    return this._unresolvedExports.delete(Q), B()
                }, Ae.globalErrorHandler);
                if (Q != null) this._unresolvedExports.add(Q)
            } else B()
        }
        async forceFlush() {
            await Promise.all(Array.from(this._unresolvedExports))
        }
        shutdown() {
            return this._shutdownOnce.call()
        }
        _shutdown() {
            return this._exporter.shutdown()
        }
    }
    U2B.SimpleLogRecordProcessor = E2B
});
var R2B = E((L2B) => {
    Object.defineProperty(L2B, "__esModule", {
        value: !0
    });
    L2B.InMemoryLogRecordExporter = void 0;
    var q2B = f3();
    class N2B {
        _finishedLogRecords = [];
        _stopped = !1;
        export (A, B) {
            if (this._stopped) return B({
                code: q2B.ExportResultCode.FAILED,
                error: new Error("Exporter has been stopped")
            });
            this._finishedLogRecords.push(...A), B({
                code: q2B.ExportResultCode.SUCCESS
            })
        }
        shutdown() {
            return this._stopped = !0, this.reset(), Promise.resolve()
        }
        getFinishedLogRecords() {
            return this._finishedLogRecords
        }
        reset() {
            this._finishedLogRecords = []
        }
    }
    L2B.InMemoryLogRecordExporter = N2B
});
var S2B = E((T2B) => {
    Object.defineProperty(T2B, "__esModule", {
        value: !0
    });
    T2B.BatchLogRecordProcessorBase = void 0;
    var _S1 = f3(),
        DL6 = XQ(),
        yP = f3();
    class O2B {
        _exporter;
        _maxExportBatchSize;
        _maxQueueSize;
        _scheduledDelayMillis;
        _exportTimeoutMillis;
        _finishedLogRecords = [];
        _timer;
        _shutdownOnce;
        constructor(A, B) {
            if (this._exporter = A, this._maxExportBatchSize = B?.maxExportBatchSize ?? _S1.getNumberFromEnv("OTEL_BLRP_MAX_EXPORT_BATCH_SIZE") ?? 512, this._maxQueueSize = B?.maxQueueSize ?? _S1.getNumberFromEnv("OTEL_BLRP_MAX_QUEUE_SIZE") ?? 2048, this._scheduledDelayMillis = B?.scheduledDelayMillis ?? _S1.getNumberFromEnv("OTEL_BLRP_SCHEDULE_DELAY") ?? 5000, this._exportTimeoutMillis = B?.exportTimeoutMillis ?? _S1.getNumberFromEnv("OTEL_BLRP_EXPORT_TIMEOUT") ?? 30000, this._shutdownOnce = new yP.BindOnceFuture(this._shutdown, this), this._maxExportBatchSize > this._maxQueueSize) DL6.diag.warn("BatchLogRecordProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize"), this._maxExportBatchSize = this._maxQueueSize
        }
        onEmit(A) {
            if (this._shutdownOnce.isCalled) return;
            this._addToBuffer(A)
        }
        forceFlush() {
            if (this._shutdownOnce.isCalled) return this._shutdownOnce.promise;
            return this._flushAll()
        }
        shutdown() {
            return this._shutdownOnce.call()
        }
        async _shutdown() {
            this.onShutdown(), await this._flushAll(), await this._exporter.shutdown()
        }
        _addToBuffer(A) {
            if (this._finishedLogRecords.length >= this._maxQueueSize) return;
            this._finishedLogRecords.push(A), this._maybeStartTimer()
        }
        _flushAll() {
            return new Promise((A, B) => {
                let Q = [],
                    Z = Math.ceil(this._finishedLogRecords.length / this._maxExportBatchSize);
                for (let D = 0; D < Z; D++) Q.push(this._flushOneBatch());
                Promise.all(Q).then(() => {
                    A()
                }).catch(B)
            })
        }
        _flushOneBatch() {
            if (this._clearTimer(), this._finishedLogRecords.length === 0) return Promise.resolve();
            return new Promise((A, B) => {
                yP.callWithTimeout(this._export(this._finishedLogRecords.splice(0, this._maxExportBatchSize)), this._exportTimeoutMillis).then(() => A()).catch(B)
            })
        }
        _maybeStartTimer() {
            if (this._timer !== void 0) return;
            this._timer = setTimeout(() => {
                this._flushOneBatch().then(() => {
                    if (this._finishedLogRecords.length > 0) this._clearTimer(), this._maybeStartTimer()
                }).catch((A) => {
                    yP.globalErrorHandler(A)
                })
            }, this._scheduledDelayMillis), yP.unrefTimer(this._timer)
        }
        _clearTimer() {
            if (this._timer !== void 0) clearTimeout(this._timer), this._timer = void 0
        }
        _export(A) {
            let B = () => yP.internal._export(this._exporter, A).then((Z) => {
                    if (Z.code !== yP.ExportResultCode.SUCCESS) yP.globalErrorHandler(Z.error ?? new Error(`BatchLogRecordProcessor: log record export failed (status ${Z})`))
                }).catch(yP.globalErrorHandler),
                Q = A.map((Z) => Z.resource).filter((Z) => Z.asyncAttributesPending);
            if (Q.length === 0) return B();
            else return Promise.all(Q.map((Z) => Z.waitForAsyncAttributes?.())).then(B, yP.globalErrorHandler)
        }
    }
    T2B.BatchLogRecordProcessorBase = O2B
});
var _2B = E((k2B) => {
    Object.defineProperty(k2B, "__esModule", {
        value: !0
    });
    k2B.BatchLogRecordProcessor = void 0;
    var GL6 = S2B();
    class j2B extends GL6.BatchLogRecordProcessorBase {
        onShutdown() {}
    }
    k2B.BatchLogRecordProcessor = j2B
});
var x2B = E((pV0) => {
    Object.defineProperty(pV0, "__esModule", {
        value: !0
    });
    pV0.BatchLogRecordProcessor = void 0;
    var FL6 = _2B();
    Object.defineProperty(pV0, "BatchLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return FL6.BatchLogRecordProcessor
        }
    })
});
var v2B = E((iV0) => {
    Object.defineProperty(iV0, "__esModule", {
        value: !0
    });
    iV0.BatchLogRecordProcessor = void 0;
    var YL6 = x2B();
    Object.defineProperty(iV0, "BatchLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return YL6.BatchLogRecordProcessor
        }
    })
});
var b2B = E((_P) => {
    Object.defineProperty(_P, "__esModule", {
        value: !0
    });
    _P.BatchLogRecordProcessor = _P.InMemoryLogRecordExporter = _P.SimpleLogRecordProcessor = _P.ConsoleLogRecordExporter = _P.NoopLogRecordProcessor = _P.LogRecord = _P.LoggerProvider = void 0;
    var JL6 = V2B();
    Object.defineProperty(_P, "LoggerProvider", {
        enumerable: !0,
        get: function() {
            return JL6.LoggerProvider
        }
    });
    var XL6 = cV0();
    Object.defineProperty(_P, "LogRecord", {
        enumerable: !0,
        get: function() {
            return XL6.LogRecord
        }
    });
    var VL6 = lV0();
    Object.defineProperty(_P, "NoopLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return VL6.NoopLogRecordProcessor
        }
    });
    var CL6 = z2B();
    Object.defineProperty(_P, "ConsoleLogRecordExporter", {
        enumerable: !0,
        get: function() {
            return CL6.ConsoleLogRecordExporter
        }
    });
    var KL6 = $2B();
    Object.defineProperty(_P, "SimpleLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return KL6.SimpleLogRecordProcessor
        }
    });
    var HL6 = R2B();
    Object.defineProperty(_P, "InMemoryLogRecordExporter", {
        enumerable: !0,
        get: function() {
            return HL6.InMemoryLogRecordExporter
        }
    });
    var zL6 = v2B();
    Object.defineProperty(_P, "BatchLogRecordProcessor", {
        enumerable: !0,
        get: function() {
            return zL6.BatchLogRecordProcessor
        }
    })
});
var g2B = E((f2B) => {
    Object.defineProperty(f2B, "__esModule", {
        value: !0
    });
    f2B.VERSION = void 0;
    f2B.VERSION = "0.200.0"
});
var l2B = E((d2B) => {
    Object.defineProperty(d2B, "__esModule", {
        value: !0
    });
    d2B.OTLPLogExporter = void 0;
    var UL6 = Dm(),
        wL6 = Im(),
        u2B = Nt(),
        $L6 = g2B();
    class m2B extends UL6.OTLPExporterBase {
        constructor(A = {}) {
            super(u2B.createOtlpHttpExportDelegate(u2B.convertLegacyHttpOptions(A, "LOGS", "v1/logs", {
                "User-Agent": `OTel-OTLP-Exporter-JavaScript/${$L6.VERSION}`,
                "Content-Type": "application/x-protobuf"
            }), wL6.ProtobufLogsSerializer))
        }
    }
    d2B.OTLPLogExporter = m2B
});
var p2B = E((nV0) => {
    Object.defineProperty(nV0, "__esModule", {
        value: !0
    });
    nV0.OTLPLogExporter = void 0;
    var qL6 = l2B();
    Object.defineProperty(nV0, "OTLPLogExporter", {
        enumerable: !0,
        get: function() {
            return qL6.OTLPLogExporter
        }
    })
});
var i2B = E((aV0) => {
    Object.defineProperty(aV0, "__esModule", {
        value: !0
    });
    aV0.OTLPLogExporter = void 0;
    var LL6 = p2B();
    Object.defineProperty(aV0, "OTLPLogExporter", {
        enumerable: !0,
        get: function() {
            return LL6.OTLPLogExporter
        }
    })
});
var n2B = E((sV0) => {
    Object.defineProperty(sV0, "__esModule", {
        value: !0
    });
    sV0.OTLPLogExporter = void 0;
    var RL6 = i2B();
    Object.defineProperty(sV0, "OTLPLogExporter", {
        enumerable: !0,
        get: function() {
            return RL6.OTLPLogExporter
        }
    })
});
var t2B = E((r2B) => {
    Object.defineProperty(r2B, "__esModule", {
        value: !0
    });
    r2B.OTLPLogExporter = void 0;
    var a2B = fV0(),
        TL6 = Im(),
        PL6 = Dm();
    class s2B extends PL6.OTLPExporterBase {
        constructor(A = {}) {
            super(a2B.createOtlpGrpcExportDelegate(a2B.convertLegacyOtlpGrpcOptions(A, "LOGS"), TL6.ProtobufLogsSerializer, "LogsExportService", "/opentelemetry.proto.collector.logs.v1.LogsService/Export"))
        }
    }
    r2B.OTLPLogExporter = s2B
});
var e2B = E((rV0) => {
    Object.defineProperty(rV0, "__esModule", {
        value: !0
    });
    rV0.OTLPLogExporter = void 0;
    var SL6 = t2B();
    Object.defineProperty(rV0, "OTLPLogExporter", {
        enumerable: !0,
        get: function() {
            return SL6.OTLPLogExporter
        }
    })
});
var QBB = E((ABB) => {
    Object.defineProperty(ABB, "__esModule", {
        value: !0
    });
    ABB.VERSION = void 0;
    ABB.VERSION = "0.200.0"
});
var IBB = E((GBB) => {
    Object.defineProperty(GBB, "__esModule", {
        value: !0
    });
    GBB.OTLPLogExporter = void 0;
    var kL6 = Dm(),
        yL6 = Im(),
        _L6 = QBB(),
        ZBB = Nt();
    class DBB extends kL6.OTLPExporterBase {
        constructor(A = {}) {
            super(ZBB.createOtlpHttpExportDelegate(ZBB.convertLegacyHttpOptions(A, "LOGS", "v1/logs", {
                "User-Agent": `OTel-OTLP-Exporter-JavaScript/${_L6.VERSION}`,
                "Content-Type": "application/json"
            }), yL6.JsonLogsSerializer))
        }
    }
    GBB.OTLPLogExporter = DBB
});
var YBB = E((oV0) => {
    Object.defineProperty(oV0, "__esModule", {
        value: !0
    });
    oV0.OTLPLogExporter = void 0;
    var xL6 = IBB();
    Object.defineProperty(oV0, "OTLPLogExporter", {
        enumerable: !0,
        get: function() {
            return xL6.OTLPLogExporter
        }
    })
});
var WBB = E((tV0) => {
    Object.defineProperty(tV0, "__esModule", {
        value: !0
    });
    tV0.OTLPLogExporter = void 0;
    var bL6 = YBB();
    Object.defineProperty(tV0, "OTLPLogExporter", {
        enumerable: !0,
        get: function() {
            return bL6.OTLPLogExporter
        }
    })
});
var JBB = E((eV0) => {
    Object.defineProperty(eV0, "__esModule", {
        value: !0
    });
    eV0.OTLPLogExporter = void 0;
    var hL6 = WBB();
    Object.defineProperty(eV0, "OTLPLogExporter", {
        enumerable: !0,
        get: function() {
            return hL6.OTLPLogExporter
        }
    })
});
var MBB = E((Js5, LBB) => {
    var ZM6 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    LBB.exports = ZM6
});
var PBB = E((Xs5, TBB) => {
    var DM6 = MBB();

    function RBB() {}

    function OBB() {}
    OBB.resetWarningCache = RBB;
    TBB.exports = function() {
        function A(Z, D, G, F, I, Y) {
            if (Y === DM6) return;
            var W = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
            throw W.name = "Invariant Violation", W
        }
        A.isRequired = A;

        function B() {
            return A
        }
        var Q = {
            array: A,
            bigint: A,
            bool: A,
            func: A,
            number: A,
            object: A,
            string: A,
            symbol: A,
            any: A,
            arrayOf: B,
            element: A,
            elementType: A,
            instanceOf: B,
            node: A,
            objectOf: B,
            oneOf: B,
            oneOfType: B,
            shape: B,
            exact: B,
            checkPropTypes: OBB,
            resetWarningCache: RBB
        };
        return Q.PropTypes = Q, Q
    }
});
var jBB = E((Vs5, SBB) => {
    SBB.exports = PBB()();
    var GM6, FM6
});