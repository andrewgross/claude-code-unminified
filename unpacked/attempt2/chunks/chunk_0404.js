/* chunk:404 bytes:[9411747, 9426058) size:14311 source:unpacked-cli.js */
var nXB = E((eQ3, iXB) => {
    var {
        defineProperty: z_1,
        getOwnPropertyDescriptor: Pl6,
        getOwnPropertyNames: Sl6
    } = Object, jl6 = Object.prototype.hasOwnProperty, E_1 = (A, B) => z_1(A, "name", {
        value: B,
        configurable: !0
    }), kl6 = (A, B) => {
        for (var Q in B) z_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, yl6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Sl6(B))
                if (!jl6.call(A, D) && D !== Q) z_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Pl6(B, D)) || Z.enumerable
                })
        }
        return A
    }, _l6 = (A) => yl6(z_1({}, "__esModule", {
        value: !0
    }), A), hXB = {};
    kl6(hXB, {
        AlgorithmId: () => dXB,
        EndpointURLScheme: () => mXB,
        FieldPosition: () => cXB,
        HttpApiKeyAuthLocation: () => uXB,
        HttpAuthLocation: () => gXB,
        IniSectionType: () => lXB,
        RequestHandlerProtocol: () => pXB,
        SMITHY_CONTEXT_KEY: () => hl6,
        getDefaultClientConfiguration: () => bl6,
        resolveDefaultRuntimeConfig: () => fl6
    });
    iXB.exports = _l6(hXB);
    var gXB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(gXB || {}),
        uXB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(uXB || {}),
        mXB = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(mXB || {}),
        dXB = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(dXB || {}),
        xl6 = E_1((A) => {
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
        vl6 = E_1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        bl6 = E_1((A) => {
            return xl6(A)
        }, "getDefaultClientConfiguration"),
        fl6 = E_1((A) => {
            return vl6(A)
        }, "resolveDefaultRuntimeConfig"),
        cXB = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(cXB || {}),
        hl6 = "__smithy_context",
        lXB = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(lXB || {}),
        pXB = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(pXB || {})
});
var eXB = E((A43, tXB) => {
    var {
        defineProperty: U_1,
        getOwnPropertyDescriptor: gl6,
        getOwnPropertyNames: ul6
    } = Object, ml6 = Object.prototype.hasOwnProperty, Av = (A, B) => U_1(A, "name", {
        value: B,
        configurable: !0
    }), dl6 = (A, B) => {
        for (var Q in B) U_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, cl6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ul6(B))
                if (!ml6.call(A, D) && D !== Q) U_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = gl6(B, D)) || Z.enumerable
                })
        }
        return A
    }, ll6 = (A) => cl6(U_1({}, "__esModule", {
        value: !0
    }), A), aXB = {};
    dl6(aXB, {
        Field: () => nl6,
        Fields: () => al6,
        HttpRequest: () => sl6,
        HttpResponse: () => rl6,
        IHttpRequest: () => sXB.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => pl6,
        isValidHostname: () => oXB,
        resolveHttpHandlerRuntimeConfig: () => il6
    });
    tXB.exports = ll6(aXB);
    var pl6 = Av((A) => {
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
        il6 = Av((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        sXB = nXB(),
        nl6 = class {
            static {
                Av(this, "Field")
            }
            constructor({
                name: A,
                kind: B = sXB.FieldPosition.HEADER,
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
        al6 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                Av(this, "Fields")
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
        sl6 = class A {
            static {
                Av(this, "HttpRequest")
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
                if (Q.query) Q.query = rXB(Q.query);
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

    function rXB(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    Av(rXB, "cloneQuery");
    var rl6 = class {
        static {
            Av(this, "HttpResponse")
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

    function oXB(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    Av(oXB, "isValidHostname")
});
var YVB = E((D43, IVB) => {
    var {
        defineProperty: w_1,
        getOwnPropertyDescriptor: ol6,
        getOwnPropertyNames: tl6
    } = Object, el6 = Object.prototype.hasOwnProperty, OD1 = (A, B) => w_1(A, "name", {
        value: B,
        configurable: !0
    }), Ap6 = (A, B) => {
        for (var Q in B) w_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Bp6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of tl6(B))
                if (!el6.call(A, D) && D !== Q) w_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ol6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Qp6 = (A) => Bp6(w_1({}, "__esModule", {
        value: !0
    }), A), AVB = {};
    Ap6(AVB, {
        eventStreamHandlingMiddleware: () => ZVB,
        eventStreamHandlingMiddlewareOptions: () => DVB,
        eventStreamHeaderMiddleware: () => GVB,
        eventStreamHeaderMiddlewareOptions: () => FVB,
        getEventStreamPlugin: () => Zp6,
        resolveEventStreamConfig: () => BVB
    });
    IVB.exports = Qp6(AVB);

    function BVB(A) {
        let {
            signer: B,
            signer: Q
        } = A, Z = Object.assign(A, {
            eventSigner: B,
            messageSigner: Q
        }), D = Z.eventStreamPayloadHandlerProvider(Z);
        return Object.assign(Z, {
            eventStreamPayloadHandler: D
        })
    }
    OD1(BVB, "resolveEventStreamConfig");
    var QVB = eXB(),
        ZVB = OD1((A) => (B, Q) => async (Z) => {
            let {
                request: D
            } = Z;
            if (!QVB.HttpRequest.isInstance(D)) return B(Z);
            return A.eventStreamPayloadHandler.handle(B, Z, Q)
        }, "eventStreamHandlingMiddleware"),
        DVB = {
            tags: ["EVENT_STREAM", "SIGNATURE", "HANDLE"],
            name: "eventStreamHandlingMiddleware",
            relation: "after",
            toMiddleware: "awsAuthMiddleware",
            override: !0
        },
        GVB = OD1((A) => async (B) => {
            let {
                request: Q
            } = B;
            if (!QVB.HttpRequest.isInstance(Q)) return A(B);
            return Q.headers = {
                ...Q.headers,
                "content-type": "application/vnd.amazon.eventstream",
                "x-amz-content-sha256": "STREAMING-AWS4-HMAC-SHA256-EVENTS"
            }, A({
                ...B,
                request: Q
            })
        }, "eventStreamHeaderMiddleware"),
        FVB = {
            step: "build",
            tags: ["EVENT_STREAM", "HEADER", "CONTENT_TYPE", "CONTENT_SHA256"],
            name: "eventStreamHeaderMiddleware",
            override: !0
        },
        Zp6 = OD1((A) => ({
            applyToStack: OD1((B) => {
                B.addRelativeTo(ZVB(A), DVB), B.add(GVB, FVB)
            }, "applyToStack")
        }), "getEventStreamPlugin")
});
var XVB = E((G43, JVB) => {
    var {
        defineProperty: $_1,
        getOwnPropertyDescriptor: Dp6,
        getOwnPropertyNames: Gp6
    } = Object, Fp6 = Object.prototype.hasOwnProperty, Ip6 = (A, B) => $_1(A, "name", {
        value: B,
        configurable: !0
    }), Yp6 = (A, B) => {
        for (var Q in B) $_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Wp6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Gp6(B))
                if (!Fp6.call(A, D) && D !== Q) $_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Dp6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Jp6 = (A) => Wp6($_1({}, "__esModule", {
        value: !0
    }), A), WVB = {};
    Yp6(WVB, {
        resolveEventStreamSerdeConfig: () => Xp6
    });
    JVB.exports = Jp6(WVB);
    var Xp6 = Ip6((A) => Object.assign(A, {
        eventStreamMarshaller: A.eventStreamSerdeProvider(A)
    }), "resolveEventStreamSerdeConfig")
});
var xE0 = E((VVB) => {
    Object.defineProperty(VVB, "__esModule", {
        value: !0
    });
    VVB.resolveHttpAuthSchemeConfig = VVB.defaultBedrockRuntimeHttpAuthSchemeProvider = VVB.defaultBedrockRuntimeHttpAuthSchemeParametersProvider = void 0;
    var Vp6 = WI(),
        _E0 = E5(),
        Cp6 = async (A, B, Q) => {
            return {
                operation: _E0.getSmithyContext(B).operation,
                region: await _E0.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    VVB.defaultBedrockRuntimeHttpAuthSchemeParametersProvider = Cp6;

    function Kp6(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "bedrock",
                region: A.region
            },
            propertiesExtractor: (B, Q) => ({
                signingProperties: {
                    config: B,
                    context: Q
                }
            })
        }
    }
    var Hp6 = (A) => {
        let B = [];
        switch (A.operation) {
            default:
                B.push(Kp6(A))
        }
        return B
    };
    VVB.defaultBedrockRuntimeHttpAuthSchemeProvider = Hp6;
    var zp6 = (A) => {
        let B = Vp6.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: _E0.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    VVB.resolveHttpAuthSchemeConfig = zp6
});