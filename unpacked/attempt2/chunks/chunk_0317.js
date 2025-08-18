/* chunk:317 bytes:[7693056, 7712366) size:19310 source:unpacked-cli.js */
var ui2 = E((hi2) => {
    Object.defineProperty(hi2, "__esModule", {
        value: !0
    });
    hi2.hexToBinary = void 0;

    function fi2(A) {
        if (A >= 48 && A <= 57) return A - 48;
        if (A >= 97 && A <= 102) return A - 87;
        return A - 55
    }

    function PY6(A) {
        let B = new Uint8Array(A.length / 2),
            Q = 0;
        for (let Z = 0; Z < A.length; Z += 2) {
            let D = fi2(A.charCodeAt(Z)),
                G = fi2(A.charCodeAt(Z + 1));
            B[Q++] = D << 4 | G
        }
        return B
    }
    hi2.hexToBinary = PY6
});
var ZP1 = E((pi2) => {
    Object.defineProperty(pi2, "__esModule", {
        value: !0
    });
    pi2.getOtlpEncoder = pi2.encodeAsString = pi2.encodeAsLongBits = pi2.toLongBits = pi2.hrTimeToNanos = void 0;
    var SY6 = f3(),
        mW0 = ui2();

    function dW0(A) {
        let B = BigInt(1e9);
        return BigInt(A[0]) * B + BigInt(A[1])
    }
    pi2.hrTimeToNanos = dW0;

    function di2(A) {
        let B = Number(BigInt.asUintN(32, A)),
            Q = Number(BigInt.asUintN(32, A >> BigInt(32)));
        return {
            low: B,
            high: Q
        }
    }
    pi2.toLongBits = di2;

    function cW0(A) {
        let B = dW0(A);
        return di2(B)
    }
    pi2.encodeAsLongBits = cW0;

    function ci2(A) {
        return dW0(A).toString()
    }
    pi2.encodeAsString = ci2;
    var jY6 = typeof BigInt !== "undefined" ? ci2 : SY6.hrTimeToNanoseconds;

    function mi2(A) {
        return A
    }

    function li2(A) {
        if (A === void 0) return;
        return mW0.hexToBinary(A)
    }
    var kY6 = {
        encodeHrTime: cW0,
        encodeSpanContext: mW0.hexToBinary,
        encodeOptionalSpanContext: li2
    };

    function yY6(A) {
        if (A === void 0) return kY6;
        let B = A.useLongBits ?? !0,
            Q = A.useHex ?? !1;
        return {
            encodeHrTime: B ? cW0 : jY6,
            encodeSpanContext: Q ? mi2 : mW0.hexToBinary,
            encodeOptionalSpanContext: Q ? mi2 : li2
        }
    }
    pi2.getOtlpEncoder = yY6
});
var DP1 = E((ai2) => {
    Object.defineProperty(ai2, "__esModule", {
        value: !0
    });
    ai2.toAnyValue = ai2.toKeyValue = ai2.toAttributes = ai2.createInstrumentationScope = ai2.createResource = void 0;

    function fY6(A) {
        return {
            attributes: ni2(A.attributes),
            droppedAttributesCount: 0
        }
    }
    ai2.createResource = fY6;

    function hY6(A) {
        return {
            name: A.name,
            version: A.version
        }
    }
    ai2.createInstrumentationScope = hY6;

    function ni2(A) {
        return Object.keys(A).map((B) => lW0(B, A[B]))
    }
    ai2.toAttributes = ni2;

    function lW0(A, B) {
        return {
            key: A,
            value: pW0(B)
        }
    }
    ai2.toKeyValue = lW0;

    function pW0(A) {
        let B = typeof A;
        if (B === "string") return {
            stringValue: A
        };
        if (B === "number") {
            if (!Number.isInteger(A)) return {
                doubleValue: A
            };
            return {
                intValue: A
            }
        }
        if (B === "boolean") return {
            boolValue: A
        };
        if (A instanceof Uint8Array) return {
            bytesValue: A
        };
        if (Array.isArray(A)) return {
            arrayValue: {
                values: A.map(pW0)
            }
        };
        if (B === "object" && A != null) return {
            kvlistValue: {
                values: Object.entries(A).map(([Q, Z]) => lW0(Q, Z))
            }
        };
        return {}
    }
    ai2.toAnyValue = pW0
});
var iW0 = E((oi2) => {
    Object.defineProperty(oi2, "__esModule", {
        value: !0
    });
    oi2.toLogAttributes = oi2.createExportLogsServiceRequest = void 0;
    var cY6 = ZP1(),
        GP1 = DP1();

    function lY6(A, B) {
        let Q = cY6.getOtlpEncoder(B);
        return {
            resourceLogs: iY6(A, Q)
        }
    }
    oi2.createExportLogsServiceRequest = lY6;

    function pY6(A) {
        let B = new Map;
        for (let Q of A) {
            let {
                resource: Z,
                instrumentationScope: {
                    name: D,
                    version: G = "",
                    schemaUrl: F = ""
                }
            } = Q, I = B.get(Z);
            if (!I) I = new Map, B.set(Z, I);
            let Y = `${D}@${G}:${F}`,
                W = I.get(Y);
            if (!W) W = [], I.set(Y, W);
            W.push(Q)
        }
        return B
    }

    function iY6(A, B) {
        let Q = pY6(A);
        return Array.from(Q, ([Z, D]) => ({
            resource: GP1.createResource(Z),
            scopeLogs: Array.from(D, ([, G]) => {
                return {
                    scope: GP1.createInstrumentationScope(G[0].instrumentationScope),
                    logRecords: G.map((F) => nY6(F, B)),
                    schemaUrl: G[0].instrumentationScope.schemaUrl
                }
            }),
            schemaUrl: void 0
        }))
    }

    function nY6(A, B) {
        return {
            timeUnixNano: B.encodeHrTime(A.hrTime),
            observedTimeUnixNano: B.encodeHrTime(A.hrTimeObserved),
            severityNumber: aY6(A.severityNumber),
            severityText: A.severityText,
            body: GP1.toAnyValue(A.body),
            attributes: ri2(A.attributes),
            droppedAttributesCount: A.droppedAttributesCount,
            flags: A.spanContext?.traceFlags,
            traceId: B.encodeOptionalSpanContext(A.spanContext?.traceId),
            spanId: B.encodeOptionalSpanContext(A.spanContext?.spanId)
        }
    }

    function aY6(A) {
        return A
    }

    function ri2(A) {
        return Object.keys(A).map((B) => GP1.toKeyValue(B, A[B]))
    }
    oi2.toLogAttributes = ri2
});
var Qn2 = E((An2) => {
    Object.defineProperty(An2, "__esModule", {
        value: !0
    });
    An2.ProtobufLogsSerializer = void 0;
    var ei2 = QP1(),
        rY6 = iW0(),
        oY6 = ei2.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse,
        tY6 = ei2.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
    An2.ProtobufLogsSerializer = {
        serializeRequest: (A) => {
            let B = rY6.createExportLogsServiceRequest(A);
            return tY6.encode(B).finish()
        },
        deserializeResponse: (A) => {
            return oY6.decode(A)
        }
    }
});
var Zn2 = E((nW0) => {
    Object.defineProperty(nW0, "__esModule", {
        value: !0
    });
    nW0.ProtobufLogsSerializer = void 0;
    var eY6 = Qn2();
    Object.defineProperty(nW0, "ProtobufLogsSerializer", {
        enumerable: !0,
        get: function() {
            return eY6.ProtobufLogsSerializer
        }
    })
});
var aW0 = E((Wn2) => {
    Object.defineProperty(Wn2, "__esModule", {
        value: !0
    });
    Wn2.createExportMetricsServiceRequest = Wn2.toMetric = Wn2.toScopeMetrics = Wn2.toResourceMetrics = void 0;
    var Dn2 = XQ(),
        qt = Bx(),
        BW6 = ZP1(),
        p31 = DP1();

    function Fn2(A, B) {
        let Q = BW6.getOtlpEncoder(B);
        return {
            resource: p31.createResource(A.resource),
            schemaUrl: void 0,
            scopeMetrics: In2(A.scopeMetrics, Q)
        }
    }
    Wn2.toResourceMetrics = Fn2;

    function In2(A, B) {
        return Array.from(A.map((Q) => ({
            scope: p31.createInstrumentationScope(Q.scope),
            metrics: Q.metrics.map((Z) => Yn2(Z, B)),
            schemaUrl: Q.scope.schemaUrl
        })))
    }
    Wn2.toScopeMetrics = In2;

    function Yn2(A, B) {
        let Q = {
                name: A.descriptor.name,
                description: A.descriptor.description,
                unit: A.descriptor.unit
            },
            Z = GW6(A.aggregationTemporality);
        switch (A.dataPointType) {
            case qt.DataPointType.SUM:
                Q.sum = {
                    aggregationTemporality: Z,
                    isMonotonic: A.isMonotonic,
                    dataPoints: Gn2(A, B)
                };
                break;
            case qt.DataPointType.GAUGE:
                Q.gauge = {
                    dataPoints: Gn2(A, B)
                };
                break;
            case qt.DataPointType.HISTOGRAM:
                Q.histogram = {
                    aggregationTemporality: Z,
                    dataPoints: ZW6(A, B)
                };
                break;
            case qt.DataPointType.EXPONENTIAL_HISTOGRAM:
                Q.exponentialHistogram = {
                    aggregationTemporality: Z,
                    dataPoints: DW6(A, B)
                };
                break
        }
        return Q
    }
    Wn2.toMetric = Yn2;

    function QW6(A, B, Q) {
        let Z = {
            attributes: p31.toAttributes(A.attributes),
            startTimeUnixNano: Q.encodeHrTime(A.startTime),
            timeUnixNano: Q.encodeHrTime(A.endTime)
        };
        switch (B) {
            case Dn2.ValueType.INT:
                Z.asInt = A.value;
                break;
            case Dn2.ValueType.DOUBLE:
                Z.asDouble = A.value;
                break
        }
        return Z
    }

    function Gn2(A, B) {
        return A.dataPoints.map((Q) => {
            return QW6(Q, A.descriptor.valueType, B)
        })
    }

    function ZW6(A, B) {
        return A.dataPoints.map((Q) => {
            let Z = Q.value;
            return {
                attributes: p31.toAttributes(Q.attributes),
                bucketCounts: Z.buckets.counts,
                explicitBounds: Z.buckets.boundaries,
                count: Z.count,
                sum: Z.sum,
                min: Z.min,
                max: Z.max,
                startTimeUnixNano: B.encodeHrTime(Q.startTime),
                timeUnixNano: B.encodeHrTime(Q.endTime)
            }
        })
    }

    function DW6(A, B) {
        return A.dataPoints.map((Q) => {
            let Z = Q.value;
            return {
                attributes: p31.toAttributes(Q.attributes),
                count: Z.count,
                min: Z.min,
                max: Z.max,
                sum: Z.sum,
                positive: {
                    offset: Z.positive.offset,
                    bucketCounts: Z.positive.bucketCounts
                },
                negative: {
                    offset: Z.negative.offset,
                    bucketCounts: Z.negative.bucketCounts
                },
                scale: Z.scale,
                zeroCount: Z.zeroCount,
                startTimeUnixNano: B.encodeHrTime(Q.startTime),
                timeUnixNano: B.encodeHrTime(Q.endTime)
            }
        })
    }

    function GW6(A) {
        switch (A) {
            case qt.AggregationTemporality.DELTA:
                return 1;
            case qt.AggregationTemporality.CUMULATIVE:
                return 2
        }
    }

    function FW6(A, B) {
        return {
            resourceMetrics: A.map((Q) => Fn2(Q, B))
        }
    }
    Wn2.createExportMetricsServiceRequest = FW6
});
var Kn2 = E((Vn2) => {
    Object.defineProperty(Vn2, "__esModule", {
        value: !0
    });
    Vn2.ProtobufMetricsSerializer = void 0;
    var Xn2 = QP1(),
        JW6 = aW0(),
        XW6 = Xn2.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse,
        VW6 = Xn2.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
    Vn2.ProtobufMetricsSerializer = {
        serializeRequest: (A) => {
            let B = JW6.createExportMetricsServiceRequest([A]);
            return VW6.encode(B).finish()
        },
        deserializeResponse: (A) => {
            return XW6.decode(A)
        }
    }
});
var Hn2 = E((sW0) => {
    Object.defineProperty(sW0, "__esModule", {
        value: !0
    });
    sW0.ProtobufMetricsSerializer = void 0;
    var CW6 = Kn2();
    Object.defineProperty(sW0, "ProtobufMetricsSerializer", {
        enumerable: !0,
        get: function() {
            return CW6.ProtobufMetricsSerializer
        }
    })
});
var rW0 = E((wn2) => {
    Object.defineProperty(wn2, "__esModule", {
        value: !0
    });
    wn2.createExportTraceServiceRequest = wn2.toOtlpSpanEvent = wn2.toOtlpLink = wn2.sdkSpanToOtlpSpan = void 0;
    var i31 = DP1(),
        HW6 = ZP1();

    function zn2(A, B) {
        let Q = A.spanContext(),
            Z = A.status,
            D = A.parentSpanContext?.spanId ? B.encodeSpanContext(A.parentSpanContext?.spanId) : void 0;
        return {
            traceId: B.encodeSpanContext(Q.traceId),
            spanId: B.encodeSpanContext(Q.spanId),
            parentSpanId: D,
            traceState: Q.traceState?.serialize(),
            name: A.name,
            kind: A.kind == null ? 0 : A.kind + 1,
            startTimeUnixNano: B.encodeHrTime(A.startTime),
            endTimeUnixNano: B.encodeHrTime(A.endTime),
            attributes: i31.toAttributes(A.attributes),
            droppedAttributesCount: A.droppedAttributesCount,
            events: A.events.map((G) => Un2(G, B)),
            droppedEventsCount: A.droppedEventsCount,
            status: {
                code: Z.code,
                message: Z.message
            },
            links: A.links.map((G) => En2(G, B)),
            droppedLinksCount: A.droppedLinksCount
        }
    }
    wn2.sdkSpanToOtlpSpan = zn2;

    function En2(A, B) {
        return {
            attributes: A.attributes ? i31.toAttributes(A.attributes) : [],
            spanId: B.encodeSpanContext(A.context.spanId),
            traceId: B.encodeSpanContext(A.context.traceId),
            traceState: A.context.traceState?.serialize(),
            droppedAttributesCount: A.droppedAttributesCount || 0
        }
    }
    wn2.toOtlpLink = En2;

    function Un2(A, B) {
        return {
            attributes: A.attributes ? i31.toAttributes(A.attributes) : [],
            name: A.name,
            timeUnixNano: B.encodeHrTime(A.time),
            droppedAttributesCount: A.droppedAttributesCount || 0
        }
    }
    wn2.toOtlpSpanEvent = Un2;

    function zW6(A, B) {
        let Q = HW6.getOtlpEncoder(B);
        return {
            resourceSpans: UW6(A, Q)
        }
    }
    wn2.createExportTraceServiceRequest = zW6;

    function EW6(A) {
        let B = new Map;
        for (let Q of A) {
            let Z = B.get(Q.resource);
            if (!Z) Z = new Map, B.set(Q.resource, Z);
            let D = `${Q.instrumentationScope.name}@${Q.instrumentationScope.version||""}:${Q.instrumentationScope.schemaUrl||""}`,
                G = Z.get(D);
            if (!G) G = [], Z.set(D, G);
            G.push(Q)
        }
        return B
    }

    function UW6(A, B) {
        let Q = EW6(A),
            Z = [],
            D = Q.entries(),
            G = D.next();
        while (!G.done) {
            let [F, I] = G.value, Y = [], W = I.values(), J = W.next();
            while (!J.done) {
                let V = J.value;
                if (V.length > 0) {
                    let C = V.map((K) => zn2(K, B));
                    Y.push({
                        scope: i31.createInstrumentationScope(V[0].instrumentationScope),
                        spans: C,
                        schemaUrl: V[0].instrumentationScope.schemaUrl
                    })
                }
                J = W.next()
            }
            let X = {
                resource: i31.createResource(F),
                scopeSpans: Y,
                schemaUrl: void 0
            };
            Z.push(X), G = D.next()
        }
        return Z
    }
});
var Mn2 = E((Nn2) => {
    Object.defineProperty(Nn2, "__esModule", {
        value: !0
    });
    Nn2.ProtobufTraceSerializer = void 0;
    var qn2 = QP1(),
        NW6 = rW0(),
        LW6 = qn2.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse,
        MW6 = qn2.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
    Nn2.ProtobufTraceSerializer = {
        serializeRequest: (A) => {
            let B = NW6.createExportTraceServiceRequest(A);
            return MW6.encode(B).finish()
        },
        deserializeResponse: (A) => {
            return LW6.decode(A)
        }
    }
});
var Rn2 = E((oW0) => {
    Object.defineProperty(oW0, "__esModule", {
        value: !0
    });
    oW0.ProtobufTraceSerializer = void 0;
    var RW6 = Mn2();
    Object.defineProperty(oW0, "ProtobufTraceSerializer", {
        enumerable: !0,
        get: function() {
            return RW6.ProtobufTraceSerializer
        }
    })
});
var Pn2 = E((On2) => {
    Object.defineProperty(On2, "__esModule", {
        value: !0
    });
    On2.JsonLogsSerializer = void 0;
    var TW6 = iW0();
    On2.JsonLogsSerializer = {
        serializeRequest: (A) => {
            let B = TW6.createExportLogsServiceRequest(A, {
                useHex: !0,
                useLongBits: !1
            });
            return new TextEncoder().encode(JSON.stringify(B))
        },
        deserializeResponse: (A) => {
            return JSON.parse(new TextDecoder().decode(A))
        }
    }
});
var Sn2 = E((tW0) => {
    Object.defineProperty(tW0, "__esModule", {
        value: !0
    });
    tW0.JsonLogsSerializer = void 0;
    var PW6 = Pn2();
    Object.defineProperty(tW0, "JsonLogsSerializer", {
        enumerable: !0,
        get: function() {
            return PW6.JsonLogsSerializer
        }
    })
});
var yn2 = E((jn2) => {
    Object.defineProperty(jn2, "__esModule", {
        value: !0
    });
    jn2.JsonMetricsSerializer = void 0;
    var jW6 = aW0();
    jn2.JsonMetricsSerializer = {
        serializeRequest: (A) => {
            let B = jW6.createExportMetricsServiceRequest([A], {
                useLongBits: !1
            });
            return new TextEncoder().encode(JSON.stringify(B))
        },
        deserializeResponse: (A) => {
            return JSON.parse(new TextDecoder().decode(A))
        }
    }
});
var _n2 = E((eW0) => {
    Object.defineProperty(eW0, "__esModule", {
        value: !0
    });
    eW0.JsonMetricsSerializer = void 0;
    var kW6 = yn2();
    Object.defineProperty(eW0, "JsonMetricsSerializer", {
        enumerable: !0,
        get: function() {
            return kW6.JsonMetricsSerializer
        }
    })
});
var bn2 = E((xn2) => {
    Object.defineProperty(xn2, "__esModule", {
        value: !0
    });
    xn2.JsonTraceSerializer = void 0;
    var _W6 = rW0();
    xn2.JsonTraceSerializer = {
        serializeRequest: (A) => {
            let B = _W6.createExportTraceServiceRequest(A, {
                useHex: !0,
                useLongBits: !1
            });
            return new TextEncoder().encode(JSON.stringify(B))
        },
        deserializeResponse: (A) => {
            return JSON.parse(new TextDecoder().decode(A))
        }
    }
});
var fn2 = E((AJ0) => {
    Object.defineProperty(AJ0, "__esModule", {
        value: !0
    });
    AJ0.JsonTraceSerializer = void 0;
    var xW6 = bn2();
    Object.defineProperty(AJ0, "JsonTraceSerializer", {
        enumerable: !0,
        get: function() {
            return xW6.JsonTraceSerializer
        }
    })
});