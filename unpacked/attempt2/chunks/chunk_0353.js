/* chunk:353 bytes:[8327150, 8346660) size:19510 source:unpacked-cli.js */
var j71 = E((V3) => {
    Object.defineProperty(V3, "__esModule", {
        value: !0
    });
    V3.experimental = V3.ServerInterceptingCall = V3.ResponderBuilder = V3.ServerListenerBuilder = V3.addAdminServicesToServer = V3.getChannelzHandlers = V3.getChannelzServiceDefinition = V3.InterceptorConfigurationError = V3.InterceptingCall = V3.RequesterBuilder = V3.ListenerBuilder = V3.StatusBuilder = V3.getClientChannel = V3.ServerCredentials = V3.Server = V3.setLogVerbosity = V3.setLogger = V3.load = V3.loadObject = V3.CallCredentials = V3.ChannelCredentials = V3.waitForClientReady = V3.closeClient = V3.Channel = V3.makeGenericClientConstructor = V3.makeClientConstructor = V3.loadPackageDefinition = V3.Client = V3.compressionAlgorithms = V3.propagate = V3.connectivityState = V3.status = V3.logVerbosity = V3.Metadata = V3.credentials = void 0;
    var RS1 = CP1();
    Object.defineProperty(V3, "CallCredentials", {
        enumerable: !0,
        get: function() {
            return RS1.CallCredentials
        }
    });
    var Wq6 = yJ0();
    Object.defineProperty(V3, "Channel", {
        enumerable: !0,
        get: function() {
            return Wq6.ChannelImplementation
        }
    });
    var Jq6 = dX0();
    Object.defineProperty(V3, "compressionAlgorithms", {
        enumerable: !0,
        get: function() {
            return Jq6.CompressionAlgorithms
        }
    });
    var Xq6 = RE();
    Object.defineProperty(V3, "connectivityState", {
        enumerable: !0,
        get: function() {
            return Xq6.ConnectivityState
        }
    });
    var OS1 = r31();
    Object.defineProperty(V3, "ChannelCredentials", {
        enumerable: !0,
        get: function() {
            return OS1.ChannelCredentials
        }
    });
    var p0B = kJ0();
    Object.defineProperty(V3, "Client", {
        enumerable: !0,
        get: function() {
            return p0B.Client
        }
    });
    var kV0 = b6();
    Object.defineProperty(V3, "logVerbosity", {
        enumerable: !0,
        get: function() {
            return kV0.LogVerbosity
        }
    });
    Object.defineProperty(V3, "status", {
        enumerable: !0,
        get: function() {
            return kV0.Status
        }
    });
    Object.defineProperty(V3, "propagate", {
        enumerable: !0,
        get: function() {
            return kV0.Propagate
        }
    });
    var i0B = I7(),
        yV0 = xJ0();
    Object.defineProperty(V3, "loadPackageDefinition", {
        enumerable: !0,
        get: function() {
            return yV0.loadPackageDefinition
        }
    });
    Object.defineProperty(V3, "makeClientConstructor", {
        enumerable: !0,
        get: function() {
            return yV0.makeClientConstructor
        }
    });
    Object.defineProperty(V3, "makeGenericClientConstructor", {
        enumerable: !0,
        get: function() {
            return yV0.makeClientConstructor
        }
    });
    var Vq6 = IJ();
    Object.defineProperty(V3, "Metadata", {
        enumerable: !0,
        get: function() {
            return Vq6.Metadata
        }
    });
    var Cq6 = o1B();
    Object.defineProperty(V3, "Server", {
        enumerable: !0,
        get: function() {
            return Cq6.Server
        }
    });
    var Kq6 = HS1();
    Object.defineProperty(V3, "ServerCredentials", {
        enumerable: !0,
        get: function() {
            return Kq6.ServerCredentials
        }
    });
    var Hq6 = B0B();
    Object.defineProperty(V3, "StatusBuilder", {
        enumerable: !0,
        get: function() {
            return Hq6.StatusBuilder
        }
    });
    V3.credentials = {
        combineChannelCredentials: (A, ...B) => {
            return B.reduce((Q, Z) => Q.compose(Z), A)
        },
        combineCallCredentials: (A, ...B) => {
            return B.reduce((Q, Z) => Q.compose(Z), A)
        },
        createInsecure: OS1.ChannelCredentials.createInsecure,
        createSsl: OS1.ChannelCredentials.createSsl,
        createFromSecureContext: OS1.ChannelCredentials.createFromSecureContext,
        createFromMetadataGenerator: RS1.CallCredentials.createFromMetadataGenerator,
        createFromGoogleCredential: RS1.CallCredentials.createFromGoogleCredential,
        createEmpty: RS1.CallCredentials.createEmpty
    };
    var zq6 = (A) => A.close();
    V3.closeClient = zq6;
    var Eq6 = (A, B, Q) => A.waitForReady(B, Q);
    V3.waitForClientReady = Eq6;
    var Uq6 = (A, B) => {
        throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead")
    };
    V3.loadObject = Uq6;
    var wq6 = (A, B, Q) => {
        throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead")
    };
    V3.load = wq6;
    var $q6 = (A) => {
        i0B.setLogger(A)
    };
    V3.setLogger = $q6;
    var qq6 = (A) => {
        i0B.setLoggerVerbosity(A)
    };
    V3.setLogVerbosity = qq6;
    var Nq6 = (A) => {
        return p0B.Client.prototype.getChannel.call(A)
    };
    V3.getClientChannel = Nq6;
    var TS1 = SJ0();
    Object.defineProperty(V3, "ListenerBuilder", {
        enumerable: !0,
        get: function() {
            return TS1.ListenerBuilder
        }
    });
    Object.defineProperty(V3, "RequesterBuilder", {
        enumerable: !0,
        get: function() {
            return TS1.RequesterBuilder
        }
    });
    Object.defineProperty(V3, "InterceptingCall", {
        enumerable: !0,
        get: function() {
            return TS1.InterceptingCall
        }
    });
    Object.defineProperty(V3, "InterceptorConfigurationError", {
        enumerable: !0,
        get: function() {
            return TS1.InterceptorConfigurationError
        }
    });
    var n0B = Hm();
    Object.defineProperty(V3, "getChannelzServiceDefinition", {
        enumerable: !0,
        get: function() {
            return n0B.getChannelzServiceDefinition
        }
    });
    Object.defineProperty(V3, "getChannelzHandlers", {
        enumerable: !0,
        get: function() {
            return n0B.getChannelzHandlers
        }
    });
    var Lq6 = MP1();
    Object.defineProperty(V3, "addAdminServicesToServer", {
        enumerable: !0,
        get: function() {
            return Lq6.addAdminServicesToServer
        }
    });
    var _V0 = WV0();
    Object.defineProperty(V3, "ServerListenerBuilder", {
        enumerable: !0,
        get: function() {
            return _V0.ServerListenerBuilder
        }
    });
    Object.defineProperty(V3, "ResponderBuilder", {
        enumerable: !0,
        get: function() {
            return _V0.ResponderBuilder
        }
    });
    Object.defineProperty(V3, "ServerInterceptingCall", {
        enumerable: !0,
        get: function() {
            return _V0.ServerInterceptingCall
        }
    });
    var Mq6 = EV0();
    V3.experimental = Mq6;
    var Rq6 = yX0(),
        Oq6 = L0B(),
        Tq6 = S0B(),
        Pq6 = wS1(),
        Sq6 = b0B(),
        jq6 = l0B(),
        kq6 = Hm();
    (() => {
        Rq6.setup(), Oq6.setup(), Tq6.setup(), Pq6.setup(), Sq6.setup(), jq6.setup(), kq6.setup()
    })()
});
var o0B = E((s0B) => {
    Object.defineProperty(s0B, "__esModule", {
        value: !0
    });
    s0B.createServiceClientConstructor = void 0;
    var uq6 = j71();

    function mq6(A, B) {
        let Q = {
            export: {
                path: A,
                requestStream: !1,
                responseStream: !1,
                requestSerialize: (Z) => {
                    return Z
                },
                requestDeserialize: (Z) => {
                    return Z
                },
                responseSerialize: (Z) => {
                    return Z
                },
                responseDeserialize: (Z) => {
                    return Z
                }
            }
        };
        return uq6.makeGenericClientConstructor(Q, B)
    }
    s0B.createServiceClientConstructor = mq6
});
var k71 = E((t0B) => {
    Object.defineProperty(t0B, "__esModule", {
        value: !0
    });
    t0B.createOtlpGrpcExporterTransport = t0B.GrpcExporterTransport = t0B.createEmptyMetadata = t0B.createSslCredentials = t0B.createInsecureCredentials = void 0;
    var dq6 = 0,
        cq6 = 2;

    function lq6(A) {
        return A === "gzip" ? cq6 : dq6
    }

    function pq6() {
        let {
            credentials: A
        } = j71();
        return A.createInsecure()
    }
    t0B.createInsecureCredentials = pq6;

    function iq6(A, B, Q) {
        let {
            credentials: Z
        } = j71();
        return Z.createSsl(A, B, Q)
    }
    t0B.createSslCredentials = iq6;

    function nq6() {
        let {
            Metadata: A
        } = j71();
        return new A
    }
    t0B.createEmptyMetadata = nq6;
    class xV0 {
        _parameters;
        _client;
        _metadata;
        constructor(A) {
            this._parameters = A
        }
        shutdown() {
            this._client?.close()
        }
        send(A, B) {
            let Q = Buffer.from(A);
            if (this._client == null) {
                let {
                    createServiceClientConstructor: Z
                } = o0B();
                try {
                    this._metadata = this._parameters.metadata()
                } catch (G) {
                    return Promise.resolve({
                        status: "failure",
                        error: G
                    })
                }
                let D = Z(this._parameters.grpcPath, this._parameters.grpcName);
                try {
                    this._client = new D(this._parameters.address, this._parameters.credentials(), {
                        "grpc.default_compression_algorithm": lq6(this._parameters.compression)
                    })
                } catch (G) {
                    return Promise.resolve({
                        status: "failure",
                        error: G
                    })
                }
            }
            return new Promise((Z) => {
                let D = Date.now() + B;
                if (this._metadata == null) return Z({
                    error: new Error("metadata was null"),
                    status: "failure"
                });
                this._client.export(Q, this._metadata, {
                    deadline: D
                }, (G, F) => {
                    if (G) Z({
                        status: "failure",
                        error: G
                    });
                    else Z({
                        data: F,
                        status: "success"
                    })
                })
            })
        }
    }
    t0B.GrpcExporterTransport = xV0;

    function aq6(A) {
        return new xV0(A)
    }
    t0B.createOtlpGrpcExporterTransport = aq6
});
var QAB = E((AAB) => {
    Object.defineProperty(AAB, "__esModule", {
        value: !0
    });
    AAB.VERSION = void 0;
    AAB.VERSION = "0.200.0"
});
var WAB = E((IAB) => {
    Object.defineProperty(IAB, "__esModule", {
        value: !0
    });
    IAB.getOtlpGrpcDefaultConfiguration = IAB.mergeOtlpGrpcConfigurationWithDefaults = IAB.validateAndNormalizeUrl = void 0;
    var GAB = Dm(),
        y71 = k71(),
        eq6 = QAB(),
        AN6 = W1("url"),
        ZAB = XQ();

    function FAB(A) {
        if (A = A.trim(), !A.match(/^([\w]{1,8}):\/\//)) A = `https://${A}`;
        let Q = new AN6.URL(A);
        if (Q.protocol === "unix:") return A;
        if (Q.pathname && Q.pathname !== "/") ZAB.diag.warn("URL path should not be set when using grpc, the path part of the URL will be ignored.");
        if (Q.protocol !== "" && !Q.protocol?.match(/^(http)s?:$/)) ZAB.diag.warn("URL protocol should be http(s)://. Using http://.");
        return Q.host
    }
    IAB.validateAndNormalizeUrl = FAB;

    function DAB(A, B) {
        for (let [Q, Z] of Object.entries(B.getMap()))
            if (A.get(Q).length < 1) A.set(Q, Z)
    }

    function BN6(A, B, Q) {
        let Z = A.url ?? B.url ?? Q.url;
        return {
            ...GAB.mergeOtlpSharedConfigurationWithDefaults(A, B, Q),
            metadata: () => {
                let D = Q.metadata();
                return DAB(D, A.metadata?.().clone() ?? y71.createEmptyMetadata()), DAB(D, B.metadata?.() ?? y71.createEmptyMetadata()), D
            },
            url: FAB(Z),
            credentials: A.credentials ?? B.credentials?.(Z) ?? Q.credentials(Z)
        }
    }
    IAB.mergeOtlpGrpcConfigurationWithDefaults = BN6;

    function QN6() {
        return {
            ...GAB.getSharedConfigurationDefaults(),
            metadata: () => {
                let A = y71.createEmptyMetadata();
                return A.set("User-Agent", `OTel-OTLP-Exporter-JavaScript/${eq6.VERSION}`), A
            },
            url: "http://localhost:4317",
            credentials: (A) => {
                if (A.startsWith("http://")) return () => y71.createInsecureCredentials();
                else return () => y71.createSslCredentials()
            }
        }
    }
    IAB.getOtlpGrpcDefaultConfiguration = QN6
});
var zAB = E((KAB) => {
    Object.defineProperty(KAB, "__esModule", {
        value: !0
    });
    KAB.getOtlpGrpcConfigurationFromEnv = void 0;
    var JAB = f3(),
        _71 = k71(),
        GN6 = Nt(),
        FN6 = W1("fs"),
        IN6 = W1("path"),
        VAB = XQ();

    function vV0(A, B) {
        if (A != null && A !== "") return A;
        if (B != null && B !== "") return B;
        return
    }

    function YN6(A) {
        let B = process.env[`OTEL_EXPORTER_OTLP_${A}_HEADERS`]?.trim(),
            Q = process.env.OTEL_EXPORTER_OTLP_HEADERS?.trim(),
            Z = JAB.parseKeyPairsIntoRecord(B),
            D = JAB.parseKeyPairsIntoRecord(Q);
        if (Object.keys(Z).length === 0 && Object.keys(D).length === 0) return;
        let G = Object.assign({}, D, Z),
            F = _71.createEmptyMetadata();
        for (let [I, Y] of Object.entries(G)) F.set(I, Y);
        return F
    }

    function WN6(A) {
        let B = YN6(A);
        if (B == null) return;
        return () => B
    }

    function JN6(A) {
        let B = process.env[`OTEL_EXPORTER_OTLP_${A}_ENDPOINT`]?.trim(),
            Q = process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();
        return vV0(B, Q)
    }

    function XN6(A) {
        let B = process.env[`OTEL_EXPORTER_OTLP_${A}_INSECURE`]?.toLowerCase().trim(),
            Q = process.env.OTEL_EXPORTER_OTLP_INSECURE?.toLowerCase().trim();
        return vV0(B, Q) === "true"
    }

    function bV0(A, B, Q) {
        let Z = process.env[A]?.trim(),
            D = process.env[B]?.trim(),
            G = vV0(Z, D);
        if (G != null) try {
            return FN6.readFileSync(IN6.resolve(process.cwd(), G))
        } catch {
            VAB.diag.warn(Q);
            return
        } else return
    }

    function VN6(A) {
        return bV0(`OTEL_EXPORTER_OTLP_${A}_CLIENT_CERTIFICATE`, "OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE", "Failed to read client certificate chain file")
    }

    function CN6(A) {
        return bV0(`OTEL_EXPORTER_OTLP_${A}_CLIENT_KEY`, "OTEL_EXPORTER_OTLP_CLIENT_KEY", "Failed to read client certificate private key file")
    }

    function XAB(A) {
        return bV0(`OTEL_EXPORTER_OTLP_${A}_CERTIFICATE`, "OTEL_EXPORTER_OTLP_CERTIFICATE", "Failed to read root certificate file")
    }

    function CAB(A) {
        let B = CN6(A),
            Q = VN6(A),
            Z = XAB(A),
            D = B != null && Q != null;
        if (Z != null && !D) return VAB.diag.warn("Client key and certificate must both be provided, but one was missing - attempting to create credentials from just the root certificate"), _71.createSslCredentials(XAB(A));
        return _71.createSslCredentials(Z, B, Q)
    }

    function KN6(A) {
        if (XN6(A)) return _71.createInsecureCredentials();
        return CAB(A)
    }

    function HN6(A) {
        return {
            ...GN6.getSharedConfigurationFromEnvironment(A),
            metadata: WN6(A),
            url: JN6(A),
            credentials: (B) => {
                if (B.startsWith("http://")) return () => {
                    return _71.createInsecureCredentials()
                };
                else if (B.startsWith("https://")) return () => {
                    return CAB(A)
                };
                return () => {
                    return KN6(A)
                }
            }
        }
    }
    KAB.getOtlpGrpcConfigurationFromEnv = HN6
});
var $AB = E((UAB) => {
    Object.defineProperty(UAB, "__esModule", {
        value: !0
    });
    UAB.convertLegacyOtlpGrpcOptions = void 0;
    var zN6 = XQ(),
        EAB = WAB(),
        EN6 = k71(),
        UN6 = zAB();

    function wN6(A, B) {
        if (A.headers) zN6.diag.warn("Headers cannot be set when using grpc");
        let Q = A.credentials;
        return EAB.mergeOtlpGrpcConfigurationWithDefaults({
            url: A.url,
            metadata: () => {
                return A.metadata ?? EN6.createEmptyMetadata()
            },
            compression: A.compression,
            timeoutMillis: A.timeoutMillis,
            concurrencyLimit: A.concurrencyLimit,
            credentials: Q != null ? () => Q : void 0
        }, UN6.getOtlpGrpcConfigurationFromEnv(B), EAB.getOtlpGrpcDefaultConfiguration())
    }
    UAB.convertLegacyOtlpGrpcOptions = wN6
});
var LAB = E((qAB) => {
    Object.defineProperty(qAB, "__esModule", {
        value: !0
    });
    qAB.createOtlpGrpcExportDelegate = void 0;
    var $N6 = Dm(),
        qN6 = k71();

    function NN6(A, B, Q, Z) {
        return $N6.createOtlpNetworkExportDelegate(A, B, qN6.createOtlpGrpcExporterTransport({
            address: A.url,
            compression: A.compression,
            credentials: A.credentials,
            metadata: A.metadata,
            grpcName: Q,
            grpcPath: Z
        }))
    }
    qAB.createOtlpGrpcExportDelegate = NN6
});
var fV0 = E((PS1) => {
    Object.defineProperty(PS1, "__esModule", {
        value: !0
    });
    PS1.createOtlpGrpcExportDelegate = PS1.convertLegacyOtlpGrpcOptions = void 0;
    var LN6 = $AB();
    Object.defineProperty(PS1, "convertLegacyOtlpGrpcOptions", {
        enumerable: !0,
        get: function() {
            return LN6.convertLegacyOtlpGrpcOptions
        }
    });
    var MN6 = LAB();
    Object.defineProperty(PS1, "createOtlpGrpcExportDelegate", {
        enumerable: !0,
        get: function() {
            return MN6.createOtlpGrpcExportDelegate
        }
    })
});
var PAB = E((OAB) => {
    Object.defineProperty(OAB, "__esModule", {
        value: !0
    });
    OAB.OTLPMetricExporter = void 0;
    var ON6 = YP1(),
        MAB = fV0(),
        TN6 = Im();
    class RAB extends ON6.OTLPMetricExporterBase {
        constructor(A) {
            super(MAB.createOtlpGrpcExportDelegate(MAB.convertLegacyOtlpGrpcOptions(A ?? {}, "METRICS"), TN6.ProtobufMetricsSerializer, "MetricsExportService", "/opentelemetry.proto.collector.metrics.v1.MetricsService/Export"), A)
        }
    }
    OAB.OTLPMetricExporter = RAB
});
var SAB = E((hV0) => {
    Object.defineProperty(hV0, "__esModule", {
        value: !0
    });
    hV0.OTLPMetricExporter = void 0;
    var PN6 = PAB();
    Object.defineProperty(hV0, "OTLPMetricExporter", {
        enumerable: !0,
        get: function() {
            return PN6.OTLPMetricExporter
        }
    })
});