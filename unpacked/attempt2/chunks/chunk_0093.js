/* chunk:93 bytes:[2280468, 2291406) size:10938 source:unpacked-cli.js */
var DCA = E((L95, ZCA) => {
    var {
        defineProperty: Ez1,
        getOwnPropertyDescriptor: WWQ,
        getOwnPropertyNames: JWQ
    } = Object, XWQ = Object.prototype.hasOwnProperty, Uz1 = (A, B) => Ez1(A, "name", {
        value: B,
        configurable: !0
    }), VWQ = (A, B) => {
        for (var Q in B) Ez1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, CWQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of JWQ(B))
                if (!XWQ.call(A, D) && D !== Q) Ez1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = WWQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, KWQ = (A) => CWQ(Ez1({}, "__esModule", {
        value: !0
    }), A), sVA = {};
    VWQ(sVA, {
        AlgorithmId: () => eVA,
        EndpointURLScheme: () => tVA,
        FieldPosition: () => ACA,
        HttpApiKeyAuthLocation: () => oVA,
        HttpAuthLocation: () => rVA,
        IniSectionType: () => BCA,
        RequestHandlerProtocol: () => QCA,
        SMITHY_CONTEXT_KEY: () => wWQ,
        getDefaultClientConfiguration: () => EWQ,
        resolveDefaultRuntimeConfig: () => UWQ
    });
    ZCA.exports = KWQ(sVA);
    var rVA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(rVA || {}),
        oVA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(oVA || {}),
        tVA = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(tVA || {}),
        eVA = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(eVA || {}),
        HWQ = Uz1((A) => {
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
        zWQ = Uz1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        EWQ = Uz1((A) => {
            return HWQ(A)
        }, "getDefaultClientConfiguration"),
        UWQ = Uz1((A) => {
            return zWQ(A)
        }, "resolveDefaultRuntimeConfig"),
        ACA = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(ACA || {}),
        wWQ = "__smithy_context",
        BCA = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(BCA || {}),
        QCA = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(QCA || {})
});
var JCA = E((M95, WCA) => {
    var {
        defineProperty: wz1,
        getOwnPropertyDescriptor: $WQ,
        getOwnPropertyNames: qWQ
    } = Object, NWQ = Object.prototype.hasOwnProperty, fk = (A, B) => wz1(A, "name", {
        value: B,
        configurable: !0
    }), LWQ = (A, B) => {
        for (var Q in B) wz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, MWQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of qWQ(B))
                if (!NWQ.call(A, D) && D !== Q) wz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = $WQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, RWQ = (A) => MWQ(wz1({}, "__esModule", {
        value: !0
    }), A), GCA = {};
    LWQ(GCA, {
        Field: () => PWQ,
        Fields: () => SWQ,
        HttpRequest: () => jWQ,
        HttpResponse: () => kWQ,
        IHttpRequest: () => FCA.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => OWQ,
        isValidHostname: () => YCA,
        resolveHttpHandlerRuntimeConfig: () => TWQ
    });
    WCA.exports = RWQ(GCA);
    var OWQ = fk((A) => {
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
        TWQ = fk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        FCA = DCA(),
        PWQ = class {
            static {
                fk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = FCA.FieldPosition.HEADER,
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
        SWQ = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                fk(this, "Fields")
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
        jWQ = class A {
            static {
                fk(this, "HttpRequest")
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
                if (Q.query) Q.query = ICA(Q.query);
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

    function ICA(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    fk(ICA, "cloneQuery");
    var kWQ = class {
        static {
            fk(this, "HttpResponse")
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

    function YCA(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    fk(YCA, "isValidHostname")
});
var IQ1 = E((P95, KCA) => {
    var {
        defineProperty: qz1,
        getOwnPropertyDescriptor: yWQ,
        getOwnPropertyNames: _WQ
    } = Object, xWQ = Object.prototype.hasOwnProperty, $z1 = (A, B) => qz1(A, "name", {
        value: B,
        configurable: !0
    }), vWQ = (A, B) => {
        for (var Q in B) qz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, bWQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of _WQ(B))
                if (!xWQ.call(A, D) && D !== Q) qz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = yWQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, fWQ = (A) => bWQ(qz1({}, "__esModule", {
        value: !0
    }), A), XCA = {};
    vWQ(XCA, {
        addRecursionDetectionMiddlewareOptions: () => CCA,
        getRecursionDetectionPlugin: () => mWQ,
        recursionDetectionMiddleware: () => VCA
    });
    KCA.exports = fWQ(XCA);
    var hWQ = JCA(),
        Kt1 = "X-Amzn-Trace-Id",
        gWQ = "AWS_LAMBDA_FUNCTION_NAME",
        uWQ = "_X_AMZN_TRACE_ID",
        VCA = $z1((A) => (B) => async (Q) => {
            let {
                request: Z
            } = Q;
            if (!hWQ.HttpRequest.isInstance(Z) || A.runtime !== "node") return B(Q);
            let D = Object.keys(Z.headers ?? {}).find((Y) => Y.toLowerCase() === Kt1.toLowerCase()) ?? Kt1;
            if (Z.headers.hasOwnProperty(D)) return B(Q);
            let G = process.env[gWQ],
                F = process.env[uWQ],
                I = $z1((Y) => typeof Y === "string" && Y.length > 0, "nonEmptyString");
            if (I(G) && I(F)) Z.headers[Kt1] = F;
            return B({
                ...Q,
                request: Z
            })
        }, "recursionDetectionMiddleware"),
        CCA = {
            step: "build",
            tags: ["RECURSION_DETECTION"],
            name: "recursionDetectionMiddleware",
            override: !0,
            priority: "low"
        },
        mWQ = $z1((A) => ({
            applyToStack: $z1((B) => {
                B.add(VCA(A), CCA)
            }, "applyToStack")
        }), "getRecursionDetectionPlugin")
});