/* chunk:318 bytes:[7712367, 7731687) size:19320 source:unpacked-cli.js */
var Im = E((Gx) => {
    Object.defineProperty(Gx, "__esModule", {
        value: !0
    });
    Gx.JsonTraceSerializer = Gx.JsonMetricsSerializer = Gx.JsonLogsSerializer = Gx.ProtobufTraceSerializer = Gx.ProtobufMetricsSerializer = Gx.ProtobufLogsSerializer = void 0;
    var bW6 = Zn2();
    Object.defineProperty(Gx, "ProtobufLogsSerializer", {
        enumerable: !0,
        get: function() {
            return bW6.ProtobufLogsSerializer
        }
    });
    var fW6 = Hn2();
    Object.defineProperty(Gx, "ProtobufMetricsSerializer", {
        enumerable: !0,
        get: function() {
            return fW6.ProtobufMetricsSerializer
        }
    });
    var hW6 = Rn2();
    Object.defineProperty(Gx, "ProtobufTraceSerializer", {
        enumerable: !0,
        get: function() {
            return hW6.ProtobufTraceSerializer
        }
    });
    var gW6 = Sn2();
    Object.defineProperty(Gx, "JsonLogsSerializer", {
        enumerable: !0,
        get: function() {
            return gW6.JsonLogsSerializer
        }
    });
    var uW6 = _n2();
    Object.defineProperty(Gx, "JsonMetricsSerializer", {
        enumerable: !0,
        get: function() {
            return uW6.JsonMetricsSerializer
        }
    });
    var mW6 = fn2();
    Object.defineProperty(Gx, "JsonTraceSerializer", {
        enumerable: !0,
        get: function() {
            return mW6.JsonTraceSerializer
        }
    })
});
var un2 = E((hn2) => {
    Object.defineProperty(hn2, "__esModule", {
        value: !0
    });
    hn2.VERSION = void 0;
    hn2.VERSION = "0.200.0"
});
var cn2 = E((mn2) => {
    Object.defineProperty(mn2, "__esModule", {
        value: !0
    });
    mn2.parseRetryAfterToMills = mn2.isExportRetryable = void 0;

    function cW6(A) {
        return [429, 502, 503, 504].includes(A)
    }
    mn2.isExportRetryable = cW6;

    function lW6(A) {
        if (A == null) return;
        let B = Number.parseInt(A, 10);
        if (Number.isInteger(B)) return B > 0 ? B * 1000 : -1;
        let Q = new Date(A).getTime() - Date.now();
        if (Q >= 0) return Q;
        return 0
    }
    mn2.parseRetryAfterToMills = lW6
});
var rn2 = E((an2) => {
    Object.defineProperty(an2, "__esModule", {
        value: !0
    });
    an2.createHttpAgent = an2.compressAndSend = an2.sendWithHttp = void 0;
    var pn2 = W1("http"),
        in2 = W1("https"),
        iW6 = W1("zlib"),
        nW6 = W1("stream"),
        ln2 = cn2(),
        aW6 = aT1();

    function sW6(A, B, Q, Z, D) {
        let G = new URL(A.url),
            F = Number(process.versions.node.split(".")[0]),
            I = {
                hostname: G.hostname,
                port: G.port,
                path: G.pathname,
                method: "POST",
                headers: {
                    ...A.headers()
                },
                agent: B
            },
            W = (G.protocol === "http:" ? pn2.request : in2.request)(I, (X) => {
                let V = [];
                X.on("data", (C) => V.push(C)), X.on("end", () => {
                    if (X.statusCode && X.statusCode < 299) Z({
                        status: "success",
                        data: Buffer.concat(V)
                    });
                    else if (X.statusCode && ln2.isExportRetryable(X.statusCode)) Z({
                        status: "retryable",
                        retryInMillis: ln2.parseRetryAfterToMills(X.headers["retry-after"])
                    });
                    else {
                        let C = new aW6.OTLPExporterError(X.statusMessage, X.statusCode, Buffer.concat(V).toString());
                        Z({
                            status: "failure",
                            error: C
                        })
                    }
                })
            });
        W.setTimeout(D, () => {
            W.destroy(), Z({
                status: "failure",
                error: new Error("Request Timeout")
            })
        }), W.on("error", (X) => {
            Z({
                status: "failure",
                error: X
            })
        });
        let J = F >= 14 ? "close" : "abort";
        W.on(J, () => {
            Z({
                status: "failure",
                error: new Error("Request timed out")
            })
        }), nn2(W, A.compression, Q, (X) => {
            Z({
                status: "failure",
                error: X
            })
        })
    }
    an2.sendWithHttp = sW6;

    function nn2(A, B, Q, Z) {
        let D = rW6(Q);
        if (B === "gzip") A.setHeader("Content-Encoding", "gzip"), D = D.on("error", Z).pipe(iW6.createGzip()).on("error", Z);
        D.pipe(A).on("error", Z)
    }
    an2.compressAndSend = nn2;

    function rW6(A) {
        let B = new nW6.Readable;
        return B.push(A), B.push(null), B
    }

    function oW6(A, B) {
        return new(new URL(A).protocol === "http:" ? pn2.Agent : in2.Agent)(B)
    }
    an2.createHttpAgent = oW6
});
var Aa2 = E((tn2) => {
    Object.defineProperty(tn2, "__esModule", {
        value: !0
    });
    tn2.createHttpExporterTransport = void 0;
    class on2 {
        _parameters;
        _utils = null;
        constructor(A) {
            this._parameters = A
        }
        async send(A, B) {
            let {
                agent: Q,
                send: Z
            } = this._loadUtils();
            return new Promise((D) => {
                Z(this._parameters, Q, A, (G) => {
                    D(G)
                }, B)
            })
        }
        shutdown() {}
        _loadUtils() {
            let A = this._utils;
            if (A === null) {
                let {
                    sendWithHttp: B,
                    createHttpAgent: Q
                } = rn2();
                A = this._utils = {
                    agent: Q(this._parameters.url, this._parameters.agentOptions),
                    send: B
                }
            }
            return A
        }
    }

    function AJ6(A) {
        return new on2(A)
    }
    tn2.createHttpExporterTransport = AJ6
});
var Ga2 = E((Za2) => {
    Object.defineProperty(Za2, "__esModule", {
        value: !0
    });
    Za2.createRetryingTransport = void 0;
    var BJ6 = 5,
        QJ6 = 1000,
        ZJ6 = 5000,
        DJ6 = 1.5,
        Ba2 = 0.2;

    function GJ6() {
        return Math.random() * (2 * Ba2) - Ba2
    }
    class Qa2 {
        _transport;
        constructor(A) {
            this._transport = A
        }
        retry(A, B, Q) {
            return new Promise((Z, D) => {
                setTimeout(() => {
                    this._transport.send(A, B).then(Z, D)
                }, Q)
            })
        }
        async send(A, B) {
            let Q = Date.now() + B,
                Z = await this._transport.send(A, B),
                D = BJ6,
                G = QJ6;
            while (Z.status === "retryable" && D > 0) {
                D--;
                let F = Math.max(Math.min(G, ZJ6) + GJ6(), 0);
                G = G * DJ6;
                let I = Z.retryInMillis ?? F,
                    Y = Q - Date.now();
                if (I > Y) return Z;
                Z = await this.retry(A, Y, I)
            }
            return Z
        }
        shutdown() {
            return this._transport.shutdown()
        }
    }

    function FJ6(A) {
        return new Qa2(A.transport)
    }
    Za2.createRetryingTransport = FJ6
});
var Ya2 = E((Fa2) => {
    Object.defineProperty(Fa2, "__esModule", {
        value: !0
    });
    Fa2.createOtlpHttpExportDelegate = void 0;
    var IJ6 = $W0(),
        YJ6 = Aa2(),
        WJ6 = wW0(),
        JJ6 = Ga2();

    function XJ6(A, B) {
        return IJ6.createOtlpExportDelegate({
            transport: JJ6.createRetryingTransport({
                transport: YJ6.createHttpExporterTransport(A)
            }),
            serializer: B,
            promiseHandler: WJ6.createBoundedQueueExportPromiseHandler(A)
        }, {
            timeout: A.timeoutMillis
        })
    }
    Fa2.createOtlpHttpExportDelegate = XJ6
});
var BJ0 = E((Va2) => {
    Object.defineProperty(Va2, "__esModule", {
        value: !0
    });
    Va2.getSharedConfigurationFromEnvironment = void 0;
    var Xa2 = XQ();

    function Wa2(A) {
        let B = process.env[A]?.trim();
        if (B != null && B !== "") {
            let Q = Number(B);
            if (Number.isFinite(Q) && Q > 0) return Q;
            Xa2.diag.warn(`Configuration: ${A} is invalid, expected number greater than 0 (actual: ${B})`)
        }
        return
    }

    function VJ6(A) {
        let B = Wa2(`OTEL_EXPORTER_OTLP_${A}_TIMEOUT`),
            Q = Wa2("OTEL_EXPORTER_OTLP_TIMEOUT");
        return B ?? Q
    }

    function Ja2(A) {
        let B = process.env[A]?.trim();
        if (B === "") return;
        if (B == null || B === "none" || B === "gzip") return B;
        Xa2.diag.warn(`Configuration: ${A} is invalid, expected 'none' or 'gzip' (actual: '${B}')`);
        return
    }

    function CJ6(A) {
        let B = Ja2(`OTEL_EXPORTER_OTLP_${A}_COMPRESSION`),
            Q = Ja2("OTEL_EXPORTER_OTLP_COMPRESSION");
        return B ?? Q
    }

    function KJ6(A) {
        return {
            timeoutMillis: VJ6(A),
            compression: CJ6(A)
        }
    }
    Va2.getSharedConfigurationFromEnvironment = KJ6
});
var za2 = E((Ka2) => {
    Object.defineProperty(Ka2, "__esModule", {
        value: !0
    });
    Ka2.validateAndNormalizeHeaders = void 0;
    var HJ6 = XQ();

    function zJ6(A) {
        return () => {
            let B = {};
            return Object.entries(A?.() ?? {}).forEach(([Q, Z]) => {
                if (typeof Z !== "undefined") B[Q] = String(Z);
                else HJ6.diag.warn(`Header "${Q}" has invalid value (${Z}) and will be ignored`)
            }), B
        }
    }
    Ka2.validateAndNormalizeHeaders = zJ6
});
var $a2 = E((Ua2) => {
    Object.defineProperty(Ua2, "__esModule", {
        value: !0
    });
    Ua2.getHttpConfigurationDefaults = Ua2.mergeOtlpHttpConfigurationWithDefaults = void 0;
    var Ea2 = m31(),
        EJ6 = za2();

    function UJ6(A, B, Q) {
        let Z = {
                ...Q()
            },
            D = {};
        return () => {
            if (B != null) Object.assign(D, B());
            if (A != null) Object.assign(D, A());
            return Object.assign(D, Z)
        }
    }

    function wJ6(A) {
        if (A == null) return;
        try {
            return new URL(A), A
        } catch (B) {
            throw new Error(`Configuration: Could not parse user-provided export URL: '${A}'`)
        }
    }

    function $J6(A, B, Q) {
        return {
            ...Ea2.mergeOtlpSharedConfigurationWithDefaults(A, B, Q),
            headers: UJ6(EJ6.validateAndNormalizeHeaders(A.headers), B.headers, Q.headers),
            url: wJ6(A.url) ?? B.url ?? Q.url,
            agentOptions: A.agentOptions ?? B.agentOptions ?? Q.agentOptions
        }
    }
    Ua2.mergeOtlpHttpConfigurationWithDefaults = $J6;

    function qJ6(A, B) {
        return {
            ...Ea2.getSharedConfigurationDefaults(),
            headers: () => A,
            url: "http://localhost:4318/" + B,
            agentOptions: {
                keepAlive: !0
            }
        }
    }
    Ua2.getHttpConfigurationDefaults = qJ6
});
var La2 = E((qa2) => {
    Object.defineProperty(qa2, "__esModule", {
        value: !0
    });
    qa2.getHttpConfigurationFromEnvironment = void 0;
    var FP1 = f3(),
        QJ0 = XQ(),
        LJ6 = BJ0(),
        MJ6 = m31();

    function RJ6(A) {
        let B = process.env[`OTEL_EXPORTER_OTLP_${A}_HEADERS`]?.trim(),
            Q = process.env.OTEL_EXPORTER_OTLP_HEADERS?.trim(),
            Z = FP1.parseKeyPairsIntoRecord(B),
            D = FP1.parseKeyPairsIntoRecord(Q);
        if (Object.keys(Z).length === 0 && Object.keys(D).length === 0) return;
        return Object.assign({}, FP1.parseKeyPairsIntoRecord(Q), FP1.parseKeyPairsIntoRecord(B))
    }

    function OJ6(A) {
        try {
            return new URL(A).toString()
        } catch {
            QJ0.diag.warn(`Configuration: Could not parse environment-provided export URL: '${A}', falling back to undefined`);
            return
        }
    }

    function TJ6(A, B) {
        try {
            new URL(A)
        } catch {
            QJ0.diag.warn(`Configuration: Could not parse environment-provided export URL: '${A}', falling back to undefined`);
            return
        }
        if (!A.endsWith("/")) A = A + "/";
        A += B;
        try {
            new URL(A)
        } catch {
            QJ0.diag.warn(`Configuration: Provided URL appended with '${B}' is not a valid URL, using 'undefined' instead of '${A}'`);
            return
        }
        return A
    }

    function PJ6(A) {
        let B = process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();
        if (B == null || B === "") return;
        return TJ6(B, A)
    }

    function SJ6(A) {
        let B = process.env[`OTEL_EXPORTER_OTLP_${A}_ENDPOINT`]?.trim();
        if (B == null || B === "") return;
        return OJ6(B)
    }

    function jJ6(A, B) {
        return {
            ...LJ6.getSharedConfigurationFromEnvironment(A),
            url: SJ6(A) ?? PJ6(B),
            headers: MJ6.wrapStaticHeadersInFunction(RJ6(A))
        }
    }
    qa2.getHttpConfigurationFromEnvironment = jJ6
});
var Ta2 = E((Ra2) => {
    Object.defineProperty(Ra2, "__esModule", {
        value: !0
    });
    Ra2.convertLegacyHttpOptions = void 0;
    var Ma2 = $a2(),
        kJ6 = La2(),
        yJ6 = XQ(),
        _J6 = m31();

    function xJ6(A) {
        if (A?.keepAlive != null)
            if (A.httpAgentOptions != null) {
                if (A.httpAgentOptions.keepAlive == null) A.httpAgentOptions.keepAlive = A.keepAlive
            } else A.httpAgentOptions = {
                keepAlive: A.keepAlive
            };
        return A.httpAgentOptions
    }

    function vJ6(A, B, Q, Z) {
        if (A.metadata) yJ6.diag.warn("Metadata cannot be set when using http");
        return Ma2.mergeOtlpHttpConfigurationWithDefaults({
            url: A.url,
            headers: _J6.wrapStaticHeadersInFunction(A.headers),
            concurrencyLimit: A.concurrencyLimit,
            timeoutMillis: A.timeoutMillis,
            compression: A.compression,
            agentOptions: xJ6(A)
        }, kJ6.getHttpConfigurationFromEnvironment(B, Q), Ma2.getHttpConfigurationDefaults(Z, Q))
    }
    Ra2.convertLegacyHttpOptions = vJ6
});
var Nt = E((n31) => {
    Object.defineProperty(n31, "__esModule", {
        value: !0
    });
    n31.convertLegacyHttpOptions = n31.getSharedConfigurationFromEnvironment = n31.createOtlpHttpExportDelegate = void 0;
    var bJ6 = Ya2();
    Object.defineProperty(n31, "createOtlpHttpExportDelegate", {
        enumerable: !0,
        get: function() {
            return bJ6.createOtlpHttpExportDelegate
        }
    });
    var fJ6 = BJ0();
    Object.defineProperty(n31, "getSharedConfigurationFromEnvironment", {
        enumerable: !0,
        get: function() {
            return fJ6.getSharedConfigurationFromEnvironment
        }
    });
    var hJ6 = Ta2();
    Object.defineProperty(n31, "convertLegacyHttpOptions", {
        enumerable: !0,
        get: function() {
            return hJ6.convertLegacyHttpOptions
        }
    })
});
var ya2 = E((ja2) => {
    Object.defineProperty(ja2, "__esModule", {
        value: !0
    });
    ja2.OTLPMetricExporter = void 0;
    var uJ6 = LW0(),
        mJ6 = Im(),
        dJ6 = un2(),
        Pa2 = Nt(),
        cJ6 = {
            "User-Agent": `OTel-OTLP-Exporter-JavaScript/${dJ6.VERSION}`
        };
    class Sa2 extends uJ6.OTLPMetricExporterBase {
        constructor(A) {
            super(Pa2.createOtlpHttpExportDelegate(Pa2.convertLegacyHttpOptions(A ?? {}, "METRICS", "v1/metrics", {
                ...cJ6,
                "Content-Type": "application/json"
            }), mJ6.JsonMetricsSerializer), A)
        }
    }
    ja2.OTLPMetricExporter = Sa2
});
var _a2 = E((ZJ0) => {
    Object.defineProperty(ZJ0, "__esModule", {
        value: !0
    });
    ZJ0.OTLPMetricExporter = void 0;
    var lJ6 = ya2();
    Object.defineProperty(ZJ0, "OTLPMetricExporter", {
        enumerable: !0,
        get: function() {
            return lJ6.OTLPMetricExporter
        }
    })
});
var xa2 = E((DJ0) => {
    Object.defineProperty(DJ0, "__esModule", {
        value: !0
    });
    DJ0.OTLPMetricExporter = void 0;
    var iJ6 = _a2();
    Object.defineProperty(DJ0, "OTLPMetricExporter", {
        enumerable: !0,
        get: function() {
            return iJ6.OTLPMetricExporter
        }
    })
});
var YP1 = E((Fx) => {
    Object.defineProperty(Fx, "__esModule", {
        value: !0
    });
    Fx.OTLPMetricExporterBase = Fx.LowMemoryTemporalitySelector = Fx.DeltaTemporalitySelector = Fx.CumulativeTemporalitySelector = Fx.AggregationTemporalityPreference = Fx.OTLPMetricExporter = void 0;
    var aJ6 = xa2();
    Object.defineProperty(Fx, "OTLPMetricExporter", {
        enumerable: !0,
        get: function() {
            return aJ6.OTLPMetricExporter
        }
    });
    var sJ6 = EW0();
    Object.defineProperty(Fx, "AggregationTemporalityPreference", {
        enumerable: !0,
        get: function() {
            return sJ6.AggregationTemporalityPreference
        }
    });
    var IP1 = LW0();
    Object.defineProperty(Fx, "CumulativeTemporalitySelector", {
        enumerable: !0,
        get: function() {
            return IP1.CumulativeTemporalitySelector
        }
    });
    Object.defineProperty(Fx, "DeltaTemporalitySelector", {
        enumerable: !0,
        get: function() {
            return IP1.DeltaTemporalitySelector
        }
    });
    Object.defineProperty(Fx, "LowMemoryTemporalitySelector", {
        enumerable: !0,
        get: function() {
            return IP1.LowMemoryTemporalitySelector
        }
    });
    Object.defineProperty(Fx, "OTLPMetricExporterBase", {
        enumerable: !0,
        get: function() {
            return IP1.OTLPMetricExporterBase
        }
    })
});
var fa2 = E((va2) => {
    Object.defineProperty(va2, "__esModule", {
        value: !0
    });
    va2.VERSION = void 0;
    va2.VERSION = "0.200.0"
});
var da2 = E((ua2) => {
    Object.defineProperty(ua2, "__esModule", {
        value: !0
    });
    ua2.OTLPMetricExporter = void 0;
    var oJ6 = YP1(),
        tJ6 = Im(),
        eJ6 = fa2(),
        ha2 = Nt();
    class ga2 extends oJ6.OTLPMetricExporterBase {
        constructor(A) {
            super(ha2.createOtlpHttpExportDelegate(ha2.convertLegacyHttpOptions(A ?? {}, "METRICS", "v1/metrics", {
                "User-Agent": `OTel-OTLP-Exporter-JavaScript/${eJ6.VERSION}`,
                "Content-Type": "application/x-protobuf"
            }), tJ6.ProtobufMetricsSerializer), A)
        }
    }
    ua2.OTLPMetricExporter = ga2
});
var ca2 = E((GJ0) => {
    Object.defineProperty(GJ0, "__esModule", {
        value: !0
    });
    GJ0.OTLPMetricExporter = void 0;
    var AX6 = da2();
    Object.defineProperty(GJ0, "OTLPMetricExporter", {
        enumerable: !0,
        get: function() {
            return AX6.OTLPMetricExporter
        }
    })
});