/* chunk:271 bytes:[5793317, 5806433) size:13116 source:unpacked-cli.js */
var oC2 = E((sC2) => {
    Object.defineProperty(sC2, "__esModule", {
        value: !0
    });
    sC2.fromHttp = void 0;
    var sv4 = Zu(),
        rv4 = FE(),
        ov4 = x3(),
        nC2 = A9(),
        tv4 = sv4.__importDefault(W1("fs/promises")),
        ev4 = wC2(),
        aC2 = cC2(),
        Ab4 = iC2(),
        Bb4 = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
        Qb4 = "http://169.254.170.2",
        Zb4 = "AWS_CONTAINER_CREDENTIALS_FULL_URI",
        Db4 = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",
        Gb4 = "AWS_CONTAINER_AUTHORIZATION_TOKEN",
        Fb4 = (A = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");
            let B, Q = A.awsContainerCredentialsRelativeUri ?? process.env[Bb4],
                Z = A.awsContainerCredentialsFullUri ?? process.env[Zb4],
                D = A.awsContainerAuthorizationToken ?? process.env[Gb4],
                G = A.awsContainerAuthorizationTokenFile ?? process.env[Db4],
                F = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console.warn : A.logger.warn;
            if (Q && Z) F("@aws-sdk/credential-provider-http: you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri."), F("awsContainerCredentialsFullUri will take precedence.");
            if (D && G) F("@aws-sdk/credential-provider-http: you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile."), F("awsContainerAuthorizationToken will take precedence.");
            if (Z) B = Z;
            else if (Q) B = `${Qb4}${Q}`;
            else throw new nC2.CredentialsProviderError(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`, {
                logger: A.logger
            });
            let I = new URL(B);
            ev4.checkUrl(I, A.logger);
            let Y = new ov4.NodeHttpHandler({
                requestTimeout: A.timeout ?? 1000,
                connectionTimeout: A.timeout ?? 1000
            });
            return Ab4.retryWrapper(async () => {
                let W = aC2.createGetRequest(I);
                if (D) W.headers.Authorization = D;
                else if (G) W.headers.Authorization = (await tv4.default.readFile(G)).toString();
                try {
                    let J = await Y.handle(W);
                    return aC2.getCredentials(J.response).then((X) => rv4.setCredentialFeature(X, "CREDENTIALS_HTTP", "z"))
                } catch (J) {
                    throw new nC2.CredentialsProviderError(String(J), {
                        logger: A.logger
                    })
                }
            }, A.maxRetries ?? 3, A.timeout ?? 1000)
        };
    sC2.fromHttp = Fb4
});
var $M1 = E((dZ0) => {
    Object.defineProperty(dZ0, "__esModule", {
        value: !0
    });
    dZ0.fromHttp = void 0;
    var Ib4 = oC2();
    Object.defineProperty(dZ0, "fromHttp", {
        enumerable: !0,
        get: function() {
            return Ib4.fromHttp
        }
    })
});
var NM1 = E((zM5, GK2) => {
    var {
        defineProperty: qM1,
        getOwnPropertyDescriptor: Wb4,
        getOwnPropertyNames: Jb4
    } = Object, Xb4 = Object.prototype.hasOwnProperty, Vb4 = (A, B) => qM1(A, "name", {
        value: B,
        configurable: !0
    }), Cb4 = (A, B) => {
        for (var Q in B) qM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Kb4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Jb4(B))
                if (!Xb4.call(A, D) && D !== Q) qM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Wb4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Hb4 = (A) => Kb4(qM1({}, "__esModule", {
        value: !0
    }), A), tC2 = {};
    Cb4(tC2, {
        ENV_ACCOUNT_ID: () => DK2,
        ENV_CREDENTIAL_SCOPE: () => ZK2,
        ENV_EXPIRATION: () => QK2,
        ENV_KEY: () => eC2,
        ENV_SECRET: () => AK2,
        ENV_SESSION: () => BK2,
        fromEnv: () => Ub4
    });
    GK2.exports = Hb4(tC2);
    var zb4 = FE(),
        Eb4 = A9(),
        eC2 = "AWS_ACCESS_KEY_ID",
        AK2 = "AWS_SECRET_ACCESS_KEY",
        BK2 = "AWS_SESSION_TOKEN",
        QK2 = "AWS_CREDENTIAL_EXPIRATION",
        ZK2 = "AWS_CREDENTIAL_SCOPE",
        DK2 = "AWS_ACCOUNT_ID",
        Ub4 = Vb4((A) => async () => {
            A?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
            let B = process.env[eC2],
                Q = process.env[AK2],
                Z = process.env[BK2],
                D = process.env[QK2],
                G = process.env[ZK2],
                F = process.env[DK2];
            if (B && Q) {
                let I = {
                    accessKeyId: B,
                    secretAccessKey: Q,
                    ...Z && {
                        sessionToken: Z
                    },
                    ...D && {
                        expiration: new Date(D)
                    },
                    ...G && {
                        credentialScope: G
                    },
                    ...F && {
                        accountId: F
                    }
                };
                return zb4.setCredentialFeature(I, "CREDENTIALS_ENV_VARS", "g"), I
            }
            throw new Eb4.CredentialsProviderError("Unable to find environment variable credentials.", {
                logger: A?.logger
            })
        }, "fromEnv")
});
var YK2 = E((FK2) => {
    Object.defineProperty(FK2, "__esModule", {
        value: !0
    });
    FK2.fromEnv = void 0;
    var wb4 = NM1(),
        $b4 = (A) => wb4.fromEnv(A);
    FK2.fromEnv = $b4
});
var RM1 = E((UM5, CK2) => {
    var {
        defineProperty: MM1,
        getOwnPropertyDescriptor: qb4,
        getOwnPropertyNames: Nb4
    } = Object, Lb4 = Object.prototype.hasOwnProperty, LM1 = (A, B) => MM1(A, "name", {
        value: B,
        configurable: !0
    }), Mb4 = (A, B) => {
        for (var Q in B) MM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Rb4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Nb4(B))
                if (!Lb4.call(A, D) && D !== Q) MM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = qb4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Ob4 = (A) => Rb4(MM1({}, "__esModule", {
        value: !0
    }), A), WK2 = {};
    Mb4(WK2, {
        getHostHeaderPlugin: () => Pb4,
        hostHeaderMiddleware: () => XK2,
        hostHeaderMiddlewareOptions: () => VK2,
        resolveHostHeaderConfig: () => JK2
    });
    CK2.exports = Ob4(WK2);
    var Tb4 = SK();

    function JK2(A) {
        return A
    }
    LM1(JK2, "resolveHostHeaderConfig");
    var XK2 = LM1((A) => (B) => async (Q) => {
            if (!Tb4.HttpRequest.isInstance(Q.request)) return B(Q);
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
        VK2 = {
            name: "hostHeaderMiddleware",
            step: "build",
            priority: "low",
            tags: ["HOST"],
            override: !0
        },
        Pb4 = LM1((A) => ({
            applyToStack: LM1((B) => {
                B.add(XK2(A), VK2)
            }, "applyToStack")
        }), "getHostHeaderPlugin")
});
var TM1 = E((wM5, EK2) => {
    var {
        defineProperty: OM1,
        getOwnPropertyDescriptor: Sb4,
        getOwnPropertyNames: jb4
    } = Object, kb4 = Object.prototype.hasOwnProperty, cZ0 = (A, B) => OM1(A, "name", {
        value: B,
        configurable: !0
    }), yb4 = (A, B) => {
        for (var Q in B) OM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, _b4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of jb4(B))
                if (!kb4.call(A, D) && D !== Q) OM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Sb4(B, D)) || Z.enumerable
                })
        }
        return A
    }, xb4 = (A) => _b4(OM1({}, "__esModule", {
        value: !0
    }), A), KK2 = {};
    yb4(KK2, {
        getLoggerPlugin: () => vb4,
        loggerMiddleware: () => HK2,
        loggerMiddlewareOptions: () => zK2
    });
    EK2.exports = xb4(KK2);
    var HK2 = cZ0(() => (A, B) => async (Q) => {
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
        zK2 = {
            name: "loggerMiddleware",
            tags: ["LOGGER"],
            step: "initialize",
            override: !0
        },
        vb4 = cZ0((A) => ({
            applyToStack: cZ0((B) => {
                B.add(HK2(), zK2)
            }, "applyToStack")
        }), "getLoggerPlugin")
});
var jM1 = E(($M5, qK2) => {
    var {
        defineProperty: SM1,
        getOwnPropertyDescriptor: bb4,
        getOwnPropertyNames: fb4
    } = Object, hb4 = Object.prototype.hasOwnProperty, PM1 = (A, B) => SM1(A, "name", {
        value: B,
        configurable: !0
    }), gb4 = (A, B) => {
        for (var Q in B) SM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, ub4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of fb4(B))
                if (!hb4.call(A, D) && D !== Q) SM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = bb4(B, D)) || Z.enumerable
                })
        }
        return A
    }, mb4 = (A) => ub4(SM1({}, "__esModule", {
        value: !0
    }), A), UK2 = {};
    gb4(UK2, {
        addRecursionDetectionMiddlewareOptions: () => $K2,
        getRecursionDetectionPlugin: () => pb4,
        recursionDetectionMiddleware: () => wK2
    });
    qK2.exports = mb4(UK2);
    var db4 = SK(),
        lZ0 = "X-Amzn-Trace-Id",
        cb4 = "AWS_LAMBDA_FUNCTION_NAME",
        lb4 = "_X_AMZN_TRACE_ID",
        wK2 = PM1((A) => (B) => async (Q) => {
            let {
                request: Z
            } = Q;
            if (!db4.HttpRequest.isInstance(Z) || A.runtime !== "node") return B(Q);
            let D = Object.keys(Z.headers ?? {}).find((Y) => Y.toLowerCase() === lZ0.toLowerCase()) ?? lZ0;
            if (Z.headers.hasOwnProperty(D)) return B(Q);
            let G = process.env[cb4],
                F = process.env[lb4],
                I = PM1((Y) => typeof Y === "string" && Y.length > 0, "nonEmptyString");
            if (I(G) && I(F)) Z.headers[lZ0] = F;
            return B({
                ...Q,
                request: Z
            })
        }, "recursionDetectionMiddleware"),
        $K2 = {
            step: "build",
            tags: ["RECURSION_DETECTION"],
            name: "recursionDetectionMiddleware",
            override: !0,
            priority: "low"
        },
        pb4 = PM1((A) => ({
            applyToStack: PM1((B) => {
                B.add(wK2(A), $K2)
            }, "applyToStack")
        }), "getRecursionDetectionPlugin")
});