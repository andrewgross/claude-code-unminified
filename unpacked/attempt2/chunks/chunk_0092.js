/* chunk:92 bytes:[2261127, 2280467) size:19340 source:unpacked-cli.js */
var HVA = E((CVA) => {
    Object.defineProperty(CVA, "__esModule", {
        value: !0
    });
    CVA.getCredentials = CVA.createGetRequest = void 0;
    var Jt1 = A9(),
        DYQ = nXA(),
        GYQ = VVA(),
        FYQ = $k();

    function IYQ(A) {
        return new DYQ.HttpRequest({
            protocol: A.protocol,
            hostname: A.hostname,
            port: Number(A.port),
            path: A.pathname,
            query: Array.from(A.searchParams.entries()).reduce((B, [Q, Z]) => {
                return B[Q] = Z, B
            }, {}),
            fragment: A.hash
        })
    }
    CVA.createGetRequest = IYQ;
    async function YYQ(A, B) {
        let Z = await FYQ.sdkStreamMixin(A.body).transformToString();
        if (A.statusCode === 200) {
            let D = JSON.parse(Z);
            if (typeof D.AccessKeyId !== "string" || typeof D.SecretAccessKey !== "string" || typeof D.Token !== "string" || typeof D.Expiration !== "string") throw new Jt1.CredentialsProviderError("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }", {
                logger: B
            });
            return {
                accessKeyId: D.AccessKeyId,
                secretAccessKey: D.SecretAccessKey,
                sessionToken: D.Token,
                expiration: GYQ.parseRfc3339DateTime(D.Expiration)
            }
        }
        if (A.statusCode >= 400 && A.statusCode < 500) {
            let D = {};
            try {
                D = JSON.parse(Z)
            } catch (G) {}
            throw Object.assign(new Jt1.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
                logger: B
            }), {
                Code: D.Code,
                Message: D.Message
            })
        }
        throw new Jt1.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
            logger: B
        })
    }
    CVA.getCredentials = YYQ
});
var UVA = E((zVA) => {
    Object.defineProperty(zVA, "__esModule", {
        value: !0
    });
    zVA.retryWrapper = void 0;
    var JYQ = (A, B, Q) => {
        return async () => {
            for (let Z = 0; Z < B; ++Z) try {
                return await A()
            } catch (D) {
                await new Promise((G) => setTimeout(G, Q))
            }
            return await A()
        }
    };
    zVA.retryWrapper = JYQ
});
var LVA = E((qVA) => {
    Object.defineProperty(qVA, "__esModule", {
        value: !0
    });
    qVA.fromHttp = void 0;
    var XYQ = SXA(),
        VYQ = jN(),
        CYQ = x3(),
        wVA = A9(),
        KYQ = XYQ.__importDefault(W1("fs/promises")),
        HYQ = yXA(),
        $VA = HVA(),
        zYQ = UVA(),
        EYQ = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
        UYQ = "http://169.254.170.2",
        wYQ = "AWS_CONTAINER_CREDENTIALS_FULL_URI",
        $YQ = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",
        qYQ = "AWS_CONTAINER_AUTHORIZATION_TOKEN",
        NYQ = (A = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");
            let B, Q = A.awsContainerCredentialsRelativeUri ?? process.env[EYQ],
                Z = A.awsContainerCredentialsFullUri ?? process.env[wYQ],
                D = A.awsContainerAuthorizationToken ?? process.env[qYQ],
                G = A.awsContainerAuthorizationTokenFile ?? process.env[$YQ],
                F = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console.warn : A.logger.warn;
            if (Q && Z) F("@aws-sdk/credential-provider-http: you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri."), F("awsContainerCredentialsFullUri will take precedence.");
            if (D && G) F("@aws-sdk/credential-provider-http: you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile."), F("awsContainerAuthorizationToken will take precedence.");
            if (Z) B = Z;
            else if (Q) B = `${UYQ}${Q}`;
            else throw new wVA.CredentialsProviderError(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`, {
                logger: A.logger
            });
            let I = new URL(B);
            HYQ.checkUrl(I, A.logger);
            let Y = new CYQ.NodeHttpHandler({
                requestTimeout: A.timeout ?? 1000,
                connectionTimeout: A.timeout ?? 1000
            });
            return zYQ.retryWrapper(async () => {
                let W = $VA.createGetRequest(I);
                if (D) W.headers.Authorization = D;
                else if (G) W.headers.Authorization = (await KYQ.default.readFile(G)).toString();
                try {
                    let J = await Y.handle(W);
                    return $VA.getCredentials(J.response).then((X) => VYQ.setCredentialFeature(X, "CREDENTIALS_HTTP", "z"))
                } catch (J) {
                    throw new wVA.CredentialsProviderError(String(J), {
                        logger: A.logger
                    })
                }
            }, A.maxRetries ?? 3, A.timeout ?? 1000)
        };
    qVA.fromHttp = NYQ
});
var Vt1 = E((Xt1) => {
    Object.defineProperty(Xt1, "__esModule", {
        value: !0
    });
    Xt1.fromHttp = void 0;
    var LYQ = LVA();
    Object.defineProperty(Xt1, "fromHttp", {
        enumerable: !0,
        get: function() {
            return LYQ.fromHttp
        }
    })
});
var _VA = E((z95, yVA) => {
    var {
        defineProperty: Xz1,
        getOwnPropertyDescriptor: RYQ,
        getOwnPropertyNames: OYQ
    } = Object, TYQ = Object.prototype.hasOwnProperty, Vz1 = (A, B) => Xz1(A, "name", {
        value: B,
        configurable: !0
    }), PYQ = (A, B) => {
        for (var Q in B) Xz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, SYQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of OYQ(B))
                if (!TYQ.call(A, D) && D !== Q) Xz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = RYQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, jYQ = (A) => SYQ(Xz1({}, "__esModule", {
        value: !0
    }), A), MVA = {};
    PYQ(MVA, {
        AlgorithmId: () => PVA,
        EndpointURLScheme: () => TVA,
        FieldPosition: () => SVA,
        HttpApiKeyAuthLocation: () => OVA,
        HttpAuthLocation: () => RVA,
        IniSectionType: () => jVA,
        RequestHandlerProtocol: () => kVA,
        SMITHY_CONTEXT_KEY: () => vYQ,
        getDefaultClientConfiguration: () => _YQ,
        resolveDefaultRuntimeConfig: () => xYQ
    });
    yVA.exports = jYQ(MVA);
    var RVA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(RVA || {}),
        OVA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(OVA || {}),
        TVA = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(TVA || {}),
        PVA = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(PVA || {}),
        kYQ = Vz1((A) => {
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
        yYQ = Vz1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        _YQ = Vz1((A) => {
            return kYQ(A)
        }, "getDefaultClientConfiguration"),
        xYQ = Vz1((A) => {
            return yYQ(A)
        }, "resolveDefaultRuntimeConfig"),
        SVA = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(SVA || {}),
        vYQ = "__smithy_context",
        jVA = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(jVA || {}),
        kVA = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(kVA || {})
});
var gVA = E((E95, hVA) => {
    var {
        defineProperty: Cz1,
        getOwnPropertyDescriptor: bYQ,
        getOwnPropertyNames: fYQ
    } = Object, hYQ = Object.prototype.hasOwnProperty, bk = (A, B) => Cz1(A, "name", {
        value: B,
        configurable: !0
    }), gYQ = (A, B) => {
        for (var Q in B) Cz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, uYQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of fYQ(B))
                if (!hYQ.call(A, D) && D !== Q) Cz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = bYQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, mYQ = (A) => uYQ(Cz1({}, "__esModule", {
        value: !0
    }), A), xVA = {};
    gYQ(xVA, {
        Field: () => lYQ,
        Fields: () => pYQ,
        HttpRequest: () => iYQ,
        HttpResponse: () => nYQ,
        IHttpRequest: () => vVA.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => dYQ,
        isValidHostname: () => fVA,
        resolveHttpHandlerRuntimeConfig: () => cYQ
    });
    hVA.exports = mYQ(xVA);
    var dYQ = bk((A) => {
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
        cYQ = bk((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        vVA = _VA(),
        lYQ = class {
            static {
                bk(this, "Field")
            }
            constructor({
                name: A,
                kind: B = vVA.FieldPosition.HEADER,
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
        pYQ = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                bk(this, "Fields")
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
        iYQ = class A {
            static {
                bk(this, "HttpRequest")
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
                if (Q.query) Q.query = bVA(Q.query);
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

    function bVA(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    bk(bVA, "cloneQuery");
    var nYQ = class {
        static {
            bk(this, "HttpResponse")
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

    function fVA(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    bk(fVA, "isValidHostname")
});
var GQ1 = E((q95, lVA) => {
    var {
        defineProperty: Hz1,
        getOwnPropertyDescriptor: aYQ,
        getOwnPropertyNames: sYQ
    } = Object, rYQ = Object.prototype.hasOwnProperty, Kz1 = (A, B) => Hz1(A, "name", {
        value: B,
        configurable: !0
    }), oYQ = (A, B) => {
        for (var Q in B) Hz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, tYQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of sYQ(B))
                if (!rYQ.call(A, D) && D !== Q) Hz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = aYQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, eYQ = (A) => tYQ(Hz1({}, "__esModule", {
        value: !0
    }), A), uVA = {};
    oYQ(uVA, {
        getHostHeaderPlugin: () => BWQ,
        hostHeaderMiddleware: () => dVA,
        hostHeaderMiddlewareOptions: () => cVA,
        resolveHostHeaderConfig: () => mVA
    });
    lVA.exports = eYQ(uVA);
    var AWQ = gVA();

    function mVA(A) {
        return A
    }
    Kz1(mVA, "resolveHostHeaderConfig");
    var dVA = Kz1((A) => (B) => async (Q) => {
            if (!AWQ.HttpRequest.isInstance(Q.request)) return B(Q);
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
        cVA = {
            name: "hostHeaderMiddleware",
            step: "build",
            priority: "low",
            tags: ["HOST"],
            override: !0
        },
        BWQ = Kz1((A) => ({
            applyToStack: Kz1((B) => {
                B.add(dVA(A), cVA)
            }, "applyToStack")
        }), "getHostHeaderPlugin")
});
var FQ1 = E((N95, aVA) => {
    var {
        defineProperty: zz1,
        getOwnPropertyDescriptor: QWQ,
        getOwnPropertyNames: ZWQ
    } = Object, DWQ = Object.prototype.hasOwnProperty, Ct1 = (A, B) => zz1(A, "name", {
        value: B,
        configurable: !0
    }), GWQ = (A, B) => {
        for (var Q in B) zz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, FWQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ZWQ(B))
                if (!DWQ.call(A, D) && D !== Q) zz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = QWQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, IWQ = (A) => FWQ(zz1({}, "__esModule", {
        value: !0
    }), A), pVA = {};
    GWQ(pVA, {
        getLoggerPlugin: () => YWQ,
        loggerMiddleware: () => iVA,
        loggerMiddlewareOptions: () => nVA
    });
    aVA.exports = IWQ(pVA);
    var iVA = Ct1(() => (A, B) => async (Q) => {
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
        nVA = {
            name: "loggerMiddleware",
            tags: ["LOGGER"],
            step: "initialize",
            override: !0
        },
        YWQ = Ct1((A) => ({
            applyToStack: Ct1((B) => {
                B.add(iVA(), nVA)
            }, "applyToStack")
        }), "getLoggerPlugin")
});