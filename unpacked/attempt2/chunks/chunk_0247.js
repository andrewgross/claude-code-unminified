/* chunk:247 bytes:[5323412, 5340667) size:17255 source:unpacked-cli.js */
var i72 = E((p72) => {
    Object.defineProperty(p72, "__esModule", {
        value: !0
    });
    p72.propertyProviderChain = p72.createCredentialChain = void 0;
    var Iq4 = A9(),
        Yq4 = (...A) => {
            let B = -1,
                Z = Object.assign(async (D) => {
                    let G = await p72.propertyProviderChain(...A)(D);
                    if (!G.expiration && B !== -1) G.expiration = new Date(Date.now() + B);
                    return G
                }, {
                    expireAfter(D) {
                        if (D < 300000) throw new Error("@aws-sdk/credential-providers - createCredentialChain(...).expireAfter(ms) may not be called with a duration lower than five minutes.");
                        return B = D, Z
                    }
                });
            return Z
        };
    p72.createCredentialChain = Yq4;
    var Wq4 = (...A) => async (B) => {
        if (A.length === 0) throw new Iq4.ProviderError("No providers in chain");
        let Q;
        for (let Z of A) try {
            return await Z(B)
        } catch (D) {
            if (Q = D, D?.tryNextLink) continue;
            throw D
        }
        throw Q
    };
    p72.propertyProviderChain = Wq4
});
var C30 = E((Nq5, BZ2) => {
    var {
        defineProperty: YL1,
        getOwnPropertyDescriptor: Xq4,
        getOwnPropertyNames: Vq4
    } = Object, Cq4 = Object.prototype.hasOwnProperty, WL1 = (A, B) => YL1(A, "name", {
        value: B,
        configurable: !0
    }), Kq4 = (A, B) => {
        for (var Q in B) YL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Hq4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Vq4(B))
                if (!Cq4.call(A, D) && D !== Q) YL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Xq4(B, D)) || Z.enumerable
                })
        }
        return A
    }, zq4 = (A) => Hq4(YL1({}, "__esModule", {
        value: !0
    }), A), n72 = {};
    Kq4(n72, {
        AlgorithmId: () => o72,
        EndpointURLScheme: () => r72,
        FieldPosition: () => t72,
        HttpApiKeyAuthLocation: () => s72,
        HttpAuthLocation: () => a72,
        IniSectionType: () => e72,
        RequestHandlerProtocol: () => AZ2,
        SMITHY_CONTEXT_KEY: () => qq4,
        getDefaultClientConfiguration: () => wq4,
        resolveDefaultRuntimeConfig: () => $q4
    });
    BZ2.exports = zq4(n72);
    var a72 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(a72 || {}),
        s72 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(s72 || {}),
        r72 = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(r72 || {}),
        o72 = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(o72 || {}),
        Eq4 = WL1((A) => {
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
        Uq4 = WL1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        wq4 = WL1((A) => {
            return Eq4(A)
        }, "getDefaultClientConfiguration"),
        $q4 = WL1((A) => {
            return Uq4(A)
        }, "resolveDefaultRuntimeConfig"),
        t72 = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(t72 || {}),
        qq4 = "__smithy_context",
        e72 = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(e72 || {}),
        AZ2 = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(AZ2 || {})
});
var vV = E((Lq5, FZ2) => {
    var {
        defineProperty: JL1,
        getOwnPropertyDescriptor: Nq4,
        getOwnPropertyNames: Lq4
    } = Object, Mq4 = Object.prototype.hasOwnProperty, z_ = (A, B) => JL1(A, "name", {
        value: B,
        configurable: !0
    }), Rq4 = (A, B) => {
        for (var Q in B) JL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Oq4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Lq4(B))
                if (!Mq4.call(A, D) && D !== Q) JL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Nq4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Tq4 = (A) => Oq4(JL1({}, "__esModule", {
        value: !0
    }), A), QZ2 = {};
    Rq4(QZ2, {
        Field: () => jq4,
        Fields: () => kq4,
        HttpRequest: () => yq4,
        HttpResponse: () => _q4,
        IHttpRequest: () => ZZ2.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => Pq4,
        isValidHostname: () => GZ2,
        resolveHttpHandlerRuntimeConfig: () => Sq4
    });
    FZ2.exports = Tq4(QZ2);
    var Pq4 = z_((A) => {
            return {
                setHttpHandler(B) {
                    A.httpHandler = B
                },
                httpHandler() {
                    return A.httpHandler
                },
                updateHttpClientConfig(B, Q) {
                    A.httpHandler?.updateHttpClientConfig(B, Q)
                },
                httpHandlerConfigs() {
                    return A.httpHandler.httpHandlerConfigs()
                }
            }
        }, "getHttpHandlerExtensionConfiguration"),
        Sq4 = z_((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        ZZ2 = C30(),
        jq4 = class {
            static {
                z_(this, "Field")
            }
            constructor({
                name: A,
                kind: B = ZZ2.FieldPosition.HEADER,
                values: Q = []
            }) {
                this.name = A, this.kind = B, this.values = Q
            }
            add(A) {
                this.values.push(A)
            }
            set(A) {
                this.values = A
            }
            remove(A) {
                this.values = this.values.filter((B) => B !== A)
            }
            toString() {
                return this.values.map((A) => A.includes(",") || A.includes(" ") ? `"${A}"` : A).join(", ")
            }
            get() {
                return this.values
            }
        },
        kq4 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                z_(this, "Fields")
            }
            setField(A) {
                this.entries[A.name.toLowerCase()] = A
            }
            getField(A) {
                return this.entries[A.toLowerCase()]
            }
            removeField(A) {
                delete this.entries[A.toLowerCase()]
            }
            getByType(A) {
                return Object.values(this.entries).filter((B) => B.kind === A)
            }
        },
        yq4 = class A {
            static {
                z_(this, "HttpRequest")
            }
            constructor(B) {
                this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
            }
            static clone(B) {
                let Q = new A({
                    ...B,
                    headers: {
                        ...B.headers
                    }
                });
                if (Q.query) Q.query = DZ2(Q.query);
                return Q
            }
            static isInstance(B) {
                if (!B) return !1;
                let Q = B;
                return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
            }
            clone() {
                return A.clone(this)
            }
        };

    function DZ2(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    z_(DZ2, "cloneQuery");
    var _q4 = class {
        static {
            z_(this, "HttpResponse")
        }
        constructor(A) {
            this.statusCode = A.statusCode, this.reason = A.reason, this.headers = A.headers || {}, this.body = A.body
        }
        static isInstance(A) {
            if (!A) return !1;
            let B = A;
            return typeof B.statusCode === "number" && typeof B.headers === "object"
        }
    };

    function GZ2(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    z_(GZ2, "isValidHostname")
});
var f81 = E((Tq5, XZ2) => {
    var {
        defineProperty: VL1,
        getOwnPropertyDescriptor: xq4,
        getOwnPropertyNames: vq4
    } = Object, bq4 = Object.prototype.hasOwnProperty, XL1 = (A, B) => VL1(A, "name", {
        value: B,
        configurable: !0
    }), fq4 = (A, B) => {
        for (var Q in B) VL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, hq4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of vq4(B))
                if (!bq4.call(A, D) && D !== Q) VL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = xq4(B, D)) || Z.enumerable
                })
        }
        return A
    }, gq4 = (A) => hq4(VL1({}, "__esModule", {
        value: !0
    }), A), IZ2 = {};
    fq4(IZ2, {
        getHostHeaderPlugin: () => mq4,
        hostHeaderMiddleware: () => WZ2,
        hostHeaderMiddlewareOptions: () => JZ2,
        resolveHostHeaderConfig: () => YZ2
    });
    XZ2.exports = gq4(IZ2);
    var uq4 = vV();

    function YZ2(A) {
        return A
    }
    XL1(YZ2, "resolveHostHeaderConfig");
    var WZ2 = XL1((A) => (B) => async (Q) => {
            if (!uq4.HttpRequest.isInstance(Q.request)) return B(Q);
            let {
                request: Z
            } = Q, {
                handlerProtocol: D = ""
            } = A.requestHandler.metadata || {};
            if (D.indexOf("h2") >= 0 && !Z.headers[":authority"]) delete Z.headers.host, Z.headers[":authority"] = Z.hostname + (Z.port ? ":" + Z.port : "");
            else if (!Z.headers.host) {
                let G = Z.hostname;
                if (Z.port != null) G += `:${Z.port}`;
                Z.headers.host = G
            }
            return B(Q)
        }, "hostHeaderMiddleware"),
        JZ2 = {
            name: "hostHeaderMiddleware",
            step: "build",
            priority: "low",
            tags: ["HOST"],
            override: !0
        },
        mq4 = XL1((A) => ({
            applyToStack: XL1((B) => {
                B.add(WZ2(A), JZ2)
            }, "applyToStack")
        }), "getHostHeaderPlugin")
});
var h81 = E((Pq5, HZ2) => {
    var {
        defineProperty: CL1,
        getOwnPropertyDescriptor: dq4,
        getOwnPropertyNames: cq4
    } = Object, lq4 = Object.prototype.hasOwnProperty, K30 = (A, B) => CL1(A, "name", {
        value: B,
        configurable: !0
    }), pq4 = (A, B) => {
        for (var Q in B) CL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, iq4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of cq4(B))
                if (!lq4.call(A, D) && D !== Q) CL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = dq4(B, D)) || Z.enumerable
                })
        }
        return A
    }, nq4 = (A) => iq4(CL1({}, "__esModule", {
        value: !0
    }), A), VZ2 = {};
    pq4(VZ2, {
        getLoggerPlugin: () => aq4,
        loggerMiddleware: () => CZ2,
        loggerMiddlewareOptions: () => KZ2
    });
    HZ2.exports = nq4(VZ2);
    var CZ2 = K30(() => (A, B) => async (Q) => {
            try {
                let Z = await A(Q),
                    {
                        clientName: D,
                        commandName: G,
                        logger: F,
                        dynamoDbDocumentClientOptions: I = {}
                    } = B,
                    {
                        overrideInputFilterSensitiveLog: Y,
                        overrideOutputFilterSensitiveLog: W
                    } = I,
                    J = Y ?? B.inputFilterSensitiveLog,
                    X = W ?? B.outputFilterSensitiveLog,
                    {
                        $metadata: V,
                        ...C
                    } = Z.output;
                return F?.info?.({
                    clientName: D,
                    commandName: G,
                    input: J(Q.input),
                    output: X(C),
                    metadata: V
                }), Z
            } catch (Z) {
                let {
                    clientName: D,
                    commandName: G,
                    logger: F,
                    dynamoDbDocumentClientOptions: I = {}
                } = B, {
                    overrideInputFilterSensitiveLog: Y
                } = I, W = Y ?? B.inputFilterSensitiveLog;
                throw F?.error?.({
                    clientName: D,
                    commandName: G,
                    input: W(Q.input),
                    error: Z,
                    metadata: Z.$metadata
                }), Z
            }
        }, "loggerMiddleware"),
        KZ2 = {
            name: "loggerMiddleware",
            tags: ["LOGGER"],
            step: "initialize",
            override: !0
        },
        aq4 = K30((A) => ({
            applyToStack: K30((B) => {
                B.add(CZ2(), KZ2)
            }, "applyToStack")
        }), "getLoggerPlugin")
});
var g81 = E((Sq5, wZ2) => {
    var {
        defineProperty: HL1,
        getOwnPropertyDescriptor: sq4,
        getOwnPropertyNames: rq4
    } = Object, oq4 = Object.prototype.hasOwnProperty, KL1 = (A, B) => HL1(A, "name", {
        value: B,
        configurable: !0
    }), tq4 = (A, B) => {
        for (var Q in B) HL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, eq4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of rq4(B))
                if (!oq4.call(A, D) && D !== Q) HL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = sq4(B, D)) || Z.enumerable
                })
        }
        return A
    }, AN4 = (A) => eq4(HL1({}, "__esModule", {
        value: !0
    }), A), zZ2 = {};
    tq4(zZ2, {
        addRecursionDetectionMiddlewareOptions: () => UZ2,
        getRecursionDetectionPlugin: () => DN4,
        recursionDetectionMiddleware: () => EZ2
    });
    wZ2.exports = AN4(zZ2);
    var BN4 = vV(),
        H30 = "X-Amzn-Trace-Id",
        QN4 = "AWS_LAMBDA_FUNCTION_NAME",
        ZN4 = "_X_AMZN_TRACE_ID",
        EZ2 = KL1((A) => (B) => async (Q) => {
            let {
                request: Z
            } = Q;
            if (!BN4.HttpRequest.isInstance(Z) || A.runtime !== "node") return B(Q);
            let D = Object.keys(Z.headers ?? {}).find((Y) => Y.toLowerCase() === H30.toLowerCase()) ?? H30;
            if (Z.headers.hasOwnProperty(D)) return B(Q);
            let G = process.env[QN4],
                F = process.env[ZN4],
                I = KL1((Y) => typeof Y === "string" && Y.length > 0, "nonEmptyString");
            if (I(G) && I(F)) Z.headers[H30] = F;
            return B({
                ...Q,
                request: Z
            })
        }, "recursionDetectionMiddleware"),
        UZ2 = {
            step: "build",
            tags: ["RECURSION_DETECTION"],
            name: "recursionDetectionMiddleware",
            override: !0,
            priority: "low"
        },
        DN4 = KL1((A) => ({
            applyToStack: KL1((B) => {
                B.add(EZ2(A), UZ2)
            }, "applyToStack")
        }), "getRecursionDetectionPlugin")
});