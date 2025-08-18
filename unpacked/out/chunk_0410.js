/* chunk:410 bytes:[9503974, 9514580) size:10606 source:unpacked-cli.js */
var WKB = E((_43, YKB) => {
    var {
        defineProperty: b_1,
        getOwnPropertyDescriptor: pi6,
        getOwnPropertyNames: ii6
    } = Object, ni6 = Object.prototype.hasOwnProperty, F11 = (A, B) => b_1(A, "name", {
        value: B,
        configurable: !0
    }), ai6 = (A, B) => {
        for (var Q in B) b_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, si6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ii6(B))
                if (!ni6.call(A, D) && D !== Q) b_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = pi6(B, D)) || Z.enumerable
                })
        }
        return A
    }, ri6 = (A) => si6(b_1({}, "__esModule", {
        value: !0
    }), A), DKB = {};
    ai6(DKB, {
        EventStreamMarshaller: () => IKB,
        eventStreamSerdeProvider: () => oi6
    });
    YKB.exports = ri6(DKB);
    var TD1 = lE0();

    function GKB(A) {
        let B = 0,
            Q = 0,
            Z = null,
            D = null,
            G = F11((I) => {
                if (typeof I !== "number") throw new Error("Attempted to allocate an event message where size was not a number: " + I);
                B = I, Q = 4, Z = new Uint8Array(I), new DataView(Z.buffer).setUint32(0, I, !1)
            }, "allocateMessage"),
            F = F11(async function*() {
                let I = A[Symbol.asyncIterator]();
                while (!0) {
                    let {
                        value: Y,
                        done: W
                    } = await I.next();
                    if (W) {
                        if (!B) return;
                        else if (B === Q) yield Z;
                        else throw new Error("Truncated event message received.");
                        return
                    }
                    let J = Y.length,
                        X = 0;
                    while (X < J) {
                        if (!Z) {
                            let C = J - X;
                            if (!D) D = new Uint8Array(4);
                            let K = Math.min(4 - Q, C);
                            if (D.set(Y.slice(X, X + K), Q), Q += K, X += K, Q < 4) break;
                            G(new DataView(D.buffer).getUint32(0, !1)), D = null
                        }
                        let V = Math.min(B - Q, J - X);
                        if (Z.set(Y.slice(X, X + V), Q), Q += V, X += V, B && B === Q) yield Z, Z = null, B = 0, Q = 0
                    }
                }
            }, "iterator");
        return {
            [Symbol.asyncIterator]: F
        }
    }
    F11(GKB, "getChunkedStream");

    function FKB(A, B) {
        return async function(Q) {
            let {
                value: Z
            } = Q.headers[":message-type"];
            if (Z === "error") {
                let D = new Error(Q.headers[":error-message"].value || "UnknownError");
                throw D.name = Q.headers[":error-code"].value, D
            } else if (Z === "exception") {
                let D = Q.headers[":exception-type"].value,
                    G = {
                        [D]: Q
                    },
                    F = await A(G);
                if (F.$unknown) {
                    let I = new Error(B(Q.body));
                    throw I.name = D, I
                }
                throw F[D]
            } else if (Z === "event") {
                let D = {
                        [Q.headers[":event-type"].value]: Q
                    },
                    G = await A(D);
                if (G.$unknown) return;
                return G
            } else throw Error(`Unrecognizable event type: ${Q.headers[":event-type"].value}`)
        }
    }
    F11(FKB, "getMessageUnmarshaller");
    var IKB = class {
            static {
                F11(this, "EventStreamMarshaller")
            }
            constructor({
                utf8Encoder: A,
                utf8Decoder: B
            }) {
                this.eventStreamCodec = new TD1.EventStreamCodec(A, B), this.utfEncoder = A
            }
            deserialize(A, B) {
                let Q = GKB(A);
                return new TD1.SmithyMessageDecoderStream({
                    messageStream: new TD1.MessageDecoderStream({
                        inputStream: Q,
                        decoder: this.eventStreamCodec
                    }),
                    deserializer: FKB(B, this.utfEncoder)
                })
            }
            serialize(A, B) {
                return new TD1.MessageEncoderStream({
                    messageStream: new TD1.SmithyMessageEncoderStream({
                        inputStream: A,
                        serializer: B
                    }),
                    encoder: this.eventStreamCodec,
                    includeEndFrame: !0
                })
            }
        },
        oi6 = F11((A) => new IKB(A), "eventStreamSerdeProvider")
});
var KKB = E((v43, CKB) => {
    var {
        defineProperty: f_1,
        getOwnPropertyDescriptor: ti6,
        getOwnPropertyNames: ei6
    } = Object, An6 = Object.prototype.hasOwnProperty, pE0 = (A, B) => f_1(A, "name", {
        value: B,
        configurable: !0
    }), Bn6 = (A, B) => {
        for (var Q in B) f_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Qn6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ei6(B))
                if (!An6.call(A, D) && D !== Q) f_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ti6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Zn6 = (A) => Qn6(f_1({}, "__esModule", {
        value: !0
    }), A), JKB = {};
    Bn6(JKB, {
        EventStreamMarshaller: () => VKB,
        eventStreamSerdeProvider: () => Fn6
    });
    CKB.exports = Zn6(JKB);
    var Dn6 = WKB(),
        Gn6 = W1("stream");
    async function* XKB(A) {
        let B = !1,
            Q = !1,
            Z = new Array;
        A.on("error", (D) => {
            if (!B) B = !0;
            if (D) throw D
        }), A.on("data", (D) => {
            Z.push(D)
        }), A.on("end", () => {
            B = !0
        });
        while (!Q) {
            let D = await new Promise((G) => setTimeout(() => G(Z.shift()), 0));
            if (D) yield D;
            Q = B && Z.length === 0
        }
    }
    pE0(XKB, "readabletoIterable");
    var VKB = class {
            static {
                pE0(this, "EventStreamMarshaller")
            }
            constructor({
                utf8Encoder: A,
                utf8Decoder: B
            }) {
                this.universalMarshaller = new Dn6.EventStreamMarshaller({
                    utf8Decoder: B,
                    utf8Encoder: A
                })
            }
            deserialize(A, B) {
                let Q = typeof A[Symbol.asyncIterator] === "function" ? A : XKB(A);
                return this.universalMarshaller.deserialize(Q, B)
            }
            serialize(A, B) {
                return Gn6.Readable.from(this.universalMarshaller.serialize(A, B))
            }
        },
        Fn6 = pE0((A) => new VKB(A), "eventStreamSerdeProvider")
});
var iE0 = E((f43, LKB) => {
    var {
        defineProperty: h_1,
        getOwnPropertyDescriptor: In6,
        getOwnPropertyNames: Yn6
    } = Object, Wn6 = Object.prototype.hasOwnProperty, g_1 = (A, B) => h_1(A, "name", {
        value: B,
        configurable: !0
    }), Jn6 = (A, B) => {
        for (var Q in B) h_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Xn6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Yn6(B))
                if (!Wn6.call(A, D) && D !== Q) h_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = In6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Vn6 = (A) => Xn6(h_1({}, "__esModule", {
        value: !0
    }), A), HKB = {};
    Jn6(HKB, {
        AlgorithmId: () => wKB,
        EndpointURLScheme: () => UKB,
        FieldPosition: () => $KB,
        HttpApiKeyAuthLocation: () => EKB,
        HttpAuthLocation: () => zKB,
        IniSectionType: () => qKB,
        RequestHandlerProtocol: () => NKB,
        SMITHY_CONTEXT_KEY: () => En6,
        getDefaultClientConfiguration: () => Hn6,
        resolveDefaultRuntimeConfig: () => zn6
    });
    LKB.exports = Vn6(HKB);
    var zKB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(zKB || {}),
        EKB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(EKB || {}),
        UKB = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(UKB || {}),
        wKB = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(wKB || {}),
        Cn6 = g_1((A) => {
            let B = [];
            if (A.sha256 !== void 0) B.push({
                algorithmId: () => "sha256",
                checksumConstructor: () => A.sha256
            });
            if (A.md5 != null) B.push({
                algorithmId: () => "md5",
                checksumConstructor: () => A.md5
            });
            return {
                addChecksumAlgorithm(Q) {
                    B.push(Q)
                },
                checksumAlgorithms() {
                    return B
                }
            }
        }, "getChecksumConfiguration"),
        Kn6 = g_1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Hn6 = g_1((A) => {
            return Cn6(A)
        }, "getDefaultClientConfiguration"),
        zn6 = g_1((A) => {
            return Kn6(A)
        }, "resolveDefaultRuntimeConfig"),
        $KB = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })($KB || {}),
        En6 = "__smithy_context",
        qKB = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(qKB || {}),
        NKB = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(NKB || {})
});