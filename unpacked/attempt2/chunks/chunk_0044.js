/* chunk:44 bytes:[1187659, 1206917) size:19258 source:unpacked-cli.js */
var CV = E((bt8, Ze0) => {
    var {
        defineProperty: UC1,
        getOwnPropertyDescriptor: qv9,
        getOwnPropertyNames: Nv9
    } = Object, Lv9 = Object.prototype.hasOwnProperty, Vk = (A, B) => UC1(A, "name", {
        value: B,
        configurable: !0
    }), Mv9 = (A, B) => {
        for (var Q in B) UC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Rv9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Nv9(B))
                if (!Lv9.call(A, D) && D !== Q) UC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = qv9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Ov9 = (A) => Rv9(UC1({}, "__esModule", {
        value: !0
    }), A), et0 = {};
    Mv9(et0, {
        Field: () => Sv9,
        Fields: () => jv9,
        HttpRequest: () => kv9,
        HttpResponse: () => yv9,
        IHttpRequest: () => Ae0.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => Tv9,
        isValidHostname: () => Qe0,
        resolveHttpHandlerRuntimeConfig: () => Pv9
    });
    Ze0.exports = Ov9(et0);
    var Tv9 = Vk((A) => {
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
        Pv9 = Vk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        Ae0 = Yn1(),
        Sv9 = class {
            static {
                Vk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = Ae0.FieldPosition.HEADER,
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
        jv9 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                Vk(this, "Fields")
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
        kv9 = class A {
            static {
                Vk(this, "HttpRequest")
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
                if (Q.query) Q.query = Be0(Q.query);
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

    function Be0(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    Vk(Be0, "cloneQuery");
    var yv9 = class {
        static {
            Vk(this, "HttpResponse")
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

    function Qe0(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    Vk(Qe0, "isValidHostname")
});
var W91 = E((ut8, Ye0) => {
    var {
        defineProperty: $C1,
        getOwnPropertyDescriptor: _v9,
        getOwnPropertyNames: xv9
    } = Object, vv9 = Object.prototype.hasOwnProperty, wC1 = (A, B) => $C1(A, "name", {
        value: B,
        configurable: !0
    }), bv9 = (A, B) => {
        for (var Q in B) $C1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, fv9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of xv9(B))
                if (!vv9.call(A, D) && D !== Q) $C1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = _v9(B, D)) || Z.enumerable
                })
        }
        return A
    }, hv9 = (A) => fv9($C1({}, "__esModule", {
        value: !0
    }), A), De0 = {};
    bv9(De0, {
        getHostHeaderPlugin: () => uv9,
        hostHeaderMiddleware: () => Fe0,
        hostHeaderMiddlewareOptions: () => Ie0,
        resolveHostHeaderConfig: () => Ge0
    });
    Ye0.exports = hv9(De0);
    var gv9 = CV();

    function Ge0(A) {
        return A
    }
    wC1(Ge0, "resolveHostHeaderConfig");
    var Fe0 = wC1((A) => (B) => async (Q) => {
            if (!gv9.HttpRequest.isInstance(Q.request)) return B(Q);
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
        Ie0 = {
            name: "hostHeaderMiddleware",
            step: "build",
            priority: "low",
            tags: ["HOST"],
            override: !0
        },
        uv9 = wC1((A) => ({
            applyToStack: wC1((B) => {
                B.add(Fe0(A), Ie0)
            }, "applyToStack")
        }), "getHostHeaderPlugin")
});
var J91 = E((mt8, Ve0) => {
    var {
        defineProperty: qC1,
        getOwnPropertyDescriptor: mv9,
        getOwnPropertyNames: dv9
    } = Object, cv9 = Object.prototype.hasOwnProperty, Wn1 = (A, B) => qC1(A, "name", {
        value: B,
        configurable: !0
    }), lv9 = (A, B) => {
        for (var Q in B) qC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, pv9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of dv9(B))
                if (!cv9.call(A, D) && D !== Q) qC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = mv9(B, D)) || Z.enumerable
                })
        }
        return A
    }, iv9 = (A) => pv9(qC1({}, "__esModule", {
        value: !0
    }), A), We0 = {};
    lv9(We0, {
        getLoggerPlugin: () => nv9,
        loggerMiddleware: () => Je0,
        loggerMiddlewareOptions: () => Xe0
    });
    Ve0.exports = iv9(We0);
    var Je0 = Wn1(() => (A, B) => async (Q) => {
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
        Xe0 = {
            name: "loggerMiddleware",
            tags: ["LOGGER"],
            step: "initialize",
            override: !0
        },
        nv9 = Wn1((A) => ({
            applyToStack: Wn1((B) => {
                B.add(Je0(), Xe0)
            }, "applyToStack")
        }), "getLoggerPlugin")
});
var X91 = E((dt8, ze0) => {
    var {
        defineProperty: LC1,
        getOwnPropertyDescriptor: av9,
        getOwnPropertyNames: sv9
    } = Object, rv9 = Object.prototype.hasOwnProperty, NC1 = (A, B) => LC1(A, "name", {
        value: B,
        configurable: !0
    }), ov9 = (A, B) => {
        for (var Q in B) LC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, tv9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of sv9(B))
                if (!rv9.call(A, D) && D !== Q) LC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = av9(B, D)) || Z.enumerable
                })
        }
        return A
    }, ev9 = (A) => tv9(LC1({}, "__esModule", {
        value: !0
    }), A), Ce0 = {};
    ov9(Ce0, {
        addRecursionDetectionMiddlewareOptions: () => He0,
        getRecursionDetectionPlugin: () => Zb9,
        recursionDetectionMiddleware: () => Ke0
    });
    ze0.exports = ev9(Ce0);
    var Ab9 = CV(),
        Jn1 = "X-Amzn-Trace-Id",
        Bb9 = "AWS_LAMBDA_FUNCTION_NAME",
        Qb9 = "_X_AMZN_TRACE_ID",
        Ke0 = NC1((A) => (B) => async (Q) => {
            let {
                request: Z
            } = Q;
            if (!Ab9.HttpRequest.isInstance(Z) || A.runtime !== "node") return B(Q);
            let D = Object.keys(Z.headers ?? {}).find((Y) => Y.toLowerCase() === Jn1.toLowerCase()) ?? Jn1;
            if (Z.headers.hasOwnProperty(D)) return B(Q);
            let G = process.env[Bb9],
                F = process.env[Qb9],
                I = NC1((Y) => typeof Y === "string" && Y.length > 0, "nonEmptyString");
            if (I(G) && I(F)) Z.headers[Jn1] = F;
            return B({
                ...Q,
                request: Z
            })
        }, "recursionDetectionMiddleware"),
        He0 = {
            step: "build",
            tags: ["RECURSION_DETECTION"],
            name: "recursionDetectionMiddleware",
            override: !0,
            priority: "low"
        },
        Zb9 = NC1((A) => ({
            applyToStack: NC1((B) => {
                B.add(Ke0(A), He0)
            }, "applyToStack")
        }), "getRecursionDetectionPlugin")
});
var Xn1 = E((ct8, Re0) => {
    var {
        defineProperty: MC1,
        getOwnPropertyDescriptor: Db9,
        getOwnPropertyNames: Gb9
    } = Object, Fb9 = Object.prototype.hasOwnProperty, RC1 = (A, B) => MC1(A, "name", {
        value: B,
        configurable: !0
    }), Ib9 = (A, B) => {
        for (var Q in B) MC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Yb9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Gb9(B))
                if (!Fb9.call(A, D) && D !== Q) MC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Db9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Wb9 = (A) => Yb9(MC1({}, "__esModule", {
        value: !0
    }), A), Ee0 = {};
    Ib9(Ee0, {
        AlgorithmId: () => qe0,
        EndpointURLScheme: () => $e0,
        FieldPosition: () => Ne0,
        HttpApiKeyAuthLocation: () => we0,
        HttpAuthLocation: () => Ue0,
        IniSectionType: () => Le0,
        RequestHandlerProtocol: () => Me0,
        SMITHY_CONTEXT_KEY: () => Kb9,
        getDefaultClientConfiguration: () => Vb9,
        resolveDefaultRuntimeConfig: () => Cb9
    });
    Re0.exports = Wb9(Ee0);
    var Ue0 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(Ue0 || {}),
        we0 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(we0 || {}),
        $e0 = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })($e0 || {}),
        qe0 = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(qe0 || {}),
        Jb9 = RC1((A) => {
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
        Xb9 = RC1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Vb9 = RC1((A) => {
            return Jb9(A)
        }, "getDefaultClientConfiguration"),
        Cb9 = RC1((A) => {
            return Xb9(A)
        }, "resolveDefaultRuntimeConfig"),
        Ne0 = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(Ne0 || {}),
        Kb9 = "__smithy_context",
        Le0 = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(Le0 || {}),
        Me0 = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(Me0 || {})
});
var ve0 = E((lt8, xe0) => {
    var {
        defineProperty: OC1,
        getOwnPropertyDescriptor: Hb9,
        getOwnPropertyNames: zb9
    } = Object, Eb9 = Object.prototype.hasOwnProperty, TC1 = (A, B) => OC1(A, "name", {
        value: B,
        configurable: !0
    }), Ub9 = (A, B) => {
        for (var Q in B) OC1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, wb9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of zb9(B))
                if (!Eb9.call(A, D) && D !== Q) OC1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Hb9(B, D)) || Z.enumerable
                })
        }
        return A
    }, $b9 = (A) => wb9(OC1({}, "__esModule", {
        value: !0
    }), A), Oe0 = {};
    Ub9(Oe0, {
        AlgorithmId: () => je0,
        EndpointURLScheme: () => Se0,
        FieldPosition: () => ke0,
        HttpApiKeyAuthLocation: () => Pe0,
        HttpAuthLocation: () => Te0,
        IniSectionType: () => ye0,
        RequestHandlerProtocol: () => _e0,
        SMITHY_CONTEXT_KEY: () => Rb9,
        getDefaultClientConfiguration: () => Lb9,
        resolveDefaultRuntimeConfig: () => Mb9
    });
    xe0.exports = $b9(Oe0);
    var Te0 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(Te0 || {}),
        Pe0 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(Pe0 || {}),
        Se0 = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(Se0 || {}),
        je0 = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(je0 || {}),
        qb9 = TC1((A) => {
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
        Nb9 = TC1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Lb9 = TC1((A) => {
            return qb9(A)
        }, "getDefaultClientConfiguration"),
        Mb9 = TC1((A) => {
            return Nb9(A)
        }, "resolveDefaultRuntimeConfig"),
        ke0 = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(ke0 || {}),
        Rb9 = "__smithy_context",
        ye0 = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(ye0 || {}),
        _e0 = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(_e0 || {})
});