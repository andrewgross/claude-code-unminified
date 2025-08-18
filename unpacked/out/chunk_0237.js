/* chunk:237 bytes:[5118988, 5142818) size:23830 source:unpacked-cli.js */
var N80 = E((S$5, Y62) => {
    var {
        defineProperty: nN1,
        getOwnPropertyDescriptor: hK4,
        getOwnPropertyNames: gK4
    } = Object, uK4 = Object.prototype.hasOwnProperty, A6 = (A, B) => nN1(A, "name", {
        value: B,
        configurable: !0
    }), mK4 = (A, B) => {
        for (var Q in B) nN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, dK4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of gK4(B))
                if (!uK4.call(A, D) && D !== Q) nN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = hK4(B, D)) || Z.enumerable
                })
        }
        return A
    }, cK4 = (A) => dK4(nN1({}, "__esModule", {
        value: !0
    }), A), c42 = {};
    mK4(c42, {
        $Command: () => i42.Command,
        AccessDeniedException: () => n42,
        AuthorizationPendingException: () => a42,
        CreateTokenCommand: () => F62,
        CreateTokenRequestFilterSensitiveLog: () => s42,
        CreateTokenResponseFilterSensitiveLog: () => r42,
        ExpiredTokenException: () => o42,
        InternalServerException: () => t42,
        InvalidClientException: () => e42,
        InvalidGrantException: () => A62,
        InvalidRequestException: () => B62,
        InvalidScopeException: () => Q62,
        SSOOIDC: () => I62,
        SSOOIDCClient: () => p42,
        SSOOIDCServiceException: () => $K,
        SlowDownException: () => Z62,
        UnauthorizedClientException: () => D62,
        UnsupportedGrantTypeException: () => G62,
        __Client: () => l42.Client
    });
    Y62.exports = cK4(c42);
    var b42 = K81(),
        lK4 = H81(),
        pK4 = z81(),
        f42 = Qr(),
        iK4 = z4(),
        $80 = HB(),
        nK4 = hG(),
        aK4 = T6(),
        h42 = u4(),
        l42 = d4(),
        g42 = H80(),
        sK4 = A6((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "sso-oauth"
            })
        }, "resolveClientEndpointParameters"),
        rK4 = {
            UseFIPS: {
                type: "builtInParams",
                name: "useFipsEndpoint"
            },
            Endpoint: {
                type: "builtInParams",
                name: "endpoint"
            },
            Region: {
                type: "builtInParams",
                name: "region"
            },
            UseDualStack: {
                type: "builtInParams",
                name: "useDualstackEndpoint"
            }
        },
        oK4 = v42(),
        u42 = R81(),
        m42 = QX(),
        d42 = d4(),
        tK4 = A6((A) => {
            let {
                httpAuthSchemes: B,
                httpAuthSchemeProvider: Q,
                credentials: Z
            } = A;
            return {
                setHttpAuthScheme(D) {
                    let G = B.findIndex((F) => F.schemeId === D.schemeId);
                    if (G === -1) B.push(D);
                    else B.splice(G, 1, D)
                },
                httpAuthSchemes() {
                    return B
                },
                setHttpAuthSchemeProvider(D) {
                    Q = D
                },
                httpAuthSchemeProvider() {
                    return Q
                },
                setCredentials(D) {
                    Z = D
                },
                credentials() {
                    return Z
                }
            }
        }, "getHttpAuthExtensionConfiguration"),
        eK4 = A6((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        AH4 = A6((A, B) => {
            let Q = Object.assign(u42.getAwsRegionExtensionConfiguration(A), d42.getDefaultExtensionConfiguration(A), m42.getHttpHandlerExtensionConfiguration(A), tK4(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, u42.resolveAwsRegionExtensionConfiguration(Q), d42.resolveDefaultRuntimeConfig(Q), m42.resolveHttpHandlerRuntimeConfig(Q), eK4(Q))
        }, "resolveRuntimeExtensions"),
        p42 = class extends l42.Client {
            static {
                A6(this, "SSOOIDCClient")
            }
            config;
            constructor(...[A]) {
                let B = oK4.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = sK4(B),
                    Z = f42.resolveUserAgentConfig(Q),
                    D = h42.resolveRetryConfig(Z),
                    G = iK4.resolveRegionConfig(D),
                    F = b42.resolveHostHeaderConfig(G),
                    I = aK4.resolveEndpointConfig(F),
                    Y = g42.resolveHttpAuthSchemeConfig(I),
                    W = AH4(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(f42.getUserAgentPlugin(this.config)), this.middlewareStack.use(h42.getRetryPlugin(this.config)), this.middlewareStack.use(nK4.getContentLengthPlugin(this.config)), this.middlewareStack.use(b42.getHostHeaderPlugin(this.config)), this.middlewareStack.use(lK4.getLoggerPlugin(this.config)), this.middlewareStack.use(pK4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use($80.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: g42.defaultSSOOIDCHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: A6(async (J) => new $80.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use($80.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        BH4 = d4(),
        QH4 = T6(),
        ZH4 = y3(),
        i42 = d4(),
        Jr = d4(),
        DH4 = d4(),
        $K = class A extends DH4.ServiceException {
            static {
                A6(this, "SSOOIDCServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        n42 = class A extends $K {
            static {
                A6(this, "AccessDeniedException")
            }
            name = "AccessDeniedException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "AccessDeniedException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        a42 = class A extends $K {
            static {
                A6(this, "AuthorizationPendingException")
            }
            name = "AuthorizationPendingException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "AuthorizationPendingException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        s42 = A6((A) => ({
            ...A,
            ...A.clientSecret && {
                clientSecret: Jr.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: Jr.SENSITIVE_STRING
            },
            ...A.codeVerifier && {
                codeVerifier: Jr.SENSITIVE_STRING
            }
        }), "CreateTokenRequestFilterSensitiveLog"),
        r42 = A6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: Jr.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: Jr.SENSITIVE_STRING
            },
            ...A.idToken && {
                idToken: Jr.SENSITIVE_STRING
            }
        }), "CreateTokenResponseFilterSensitiveLog"),
        o42 = class A extends $K {
            static {
                A6(this, "ExpiredTokenException")
            }
            name = "ExpiredTokenException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "ExpiredTokenException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        t42 = class A extends $K {
            static {
                A6(this, "InternalServerException")
            }
            name = "InternalServerException";
            $fault = "server";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "InternalServerException",
                    $fault: "server",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        e42 = class A extends $K {
            static {
                A6(this, "InvalidClientException")
            }
            name = "InvalidClientException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "InvalidClientException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        A62 = class A extends $K {
            static {
                A6(this, "InvalidGrantException")
            }
            name = "InvalidGrantException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "InvalidGrantException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        B62 = class A extends $K {
            static {
                A6(this, "InvalidRequestException")
            }
            name = "InvalidRequestException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "InvalidRequestException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        Q62 = class A extends $K {
            static {
                A6(this, "InvalidScopeException")
            }
            name = "InvalidScopeException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "InvalidScopeException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        Z62 = class A extends $K {
            static {
                A6(this, "SlowDownException")
            }
            name = "SlowDownException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "SlowDownException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        D62 = class A extends $K {
            static {
                A6(this, "UnauthorizedClientException")
            }
            name = "UnauthorizedClientException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "UnauthorizedClientException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        G62 = class A extends $K {
            static {
                A6(this, "UnsupportedGrantTypeException")
            }
            name = "UnsupportedGrantTypeException";
            $fault = "client";
            error;
            error_description;
            constructor(B) {
                super({
                    name: "UnsupportedGrantTypeException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
            }
        },
        q80 = HI(),
        GH4 = HB(),
        qB = d4(),
        FH4 = A6(async (A, B) => {
            let Q = GH4.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/token");
            let D;
            return D = JSON.stringify(qB.take(A, {
                clientId: [],
                clientSecret: [],
                code: [],
                codeVerifier: [],
                deviceCode: [],
                grantType: [],
                redirectUri: [],
                refreshToken: [],
                scope: A6((G) => qB._json(G), "scope")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateTokenCommand"),
        IH4 = A6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return YH4(A, B);
            let Q = qB.map({
                    $metadata: sz(A)
                }),
                Z = qB.expectNonNull(qB.expectObject(await q80.parseJsonBody(A.body, B)), "body"),
                D = qB.take(Z, {
                    accessToken: qB.expectString,
                    expiresIn: qB.expectInt32,
                    idToken: qB.expectString,
                    refreshToken: qB.expectString,
                    tokenType: qB.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateTokenCommand"),
        YH4 = A6(async (A, B) => {
            let Q = {
                    ...A,
                    body: await q80.parseJsonErrorBody(A.body, B)
                },
                Z = q80.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "AccessDeniedException":
                case "com.amazonaws.ssooidc#AccessDeniedException":
                    throw await JH4(Q, B);
                case "AuthorizationPendingException":
                case "com.amazonaws.ssooidc#AuthorizationPendingException":
                    throw await XH4(Q, B);
                case "ExpiredTokenException":
                case "com.amazonaws.ssooidc#ExpiredTokenException":
                    throw await VH4(Q, B);
                case "InternalServerException":
                case "com.amazonaws.ssooidc#InternalServerException":
                    throw await CH4(Q, B);
                case "InvalidClientException":
                case "com.amazonaws.ssooidc#InvalidClientException":
                    throw await KH4(Q, B);
                case "InvalidGrantException":
                case "com.amazonaws.ssooidc#InvalidGrantException":
                    throw await HH4(Q, B);
                case "InvalidRequestException":
                case "com.amazonaws.ssooidc#InvalidRequestException":
                    throw await zH4(Q, B);
                case "InvalidScopeException":
                case "com.amazonaws.ssooidc#InvalidScopeException":
                    throw await EH4(Q, B);
                case "SlowDownException":
                case "com.amazonaws.ssooidc#SlowDownException":
                    throw await UH4(Q, B);
                case "UnauthorizedClientException":
                case "com.amazonaws.ssooidc#UnauthorizedClientException":
                    throw await wH4(Q, B);
                case "UnsupportedGrantTypeException":
                case "com.amazonaws.ssooidc#UnsupportedGrantTypeException":
                    throw await $H4(Q, B);
                default:
                    let D = Q.body;
                    return WH4({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        WH4 = qB.withBaseException($K),
        JH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new n42({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_AccessDeniedExceptionRes"),
        XH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new a42({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_AuthorizationPendingExceptionRes"),
        VH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new o42({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_ExpiredTokenExceptionRes"),
        CH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new t42({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_InternalServerExceptionRes"),
        KH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new e42({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_InvalidClientExceptionRes"),
        HH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new A62({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_InvalidGrantExceptionRes"),
        zH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new B62({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        EH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new Q62({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_InvalidScopeExceptionRes"),
        UH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new Z62({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_SlowDownExceptionRes"),
        wH4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new D62({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_UnauthorizedClientExceptionRes"),
        $H4 = A6(async (A, B) => {
            let Q = qB.map({}),
                Z = A.body,
                D = qB.take(Z, {
                    error: qB.expectString,
                    error_description: qB.expectString
                });
            Object.assign(Q, D);
            let G = new G62({
                $metadata: sz(A),
                ...Q
            });
            return qB.decorateServiceException(G, A.body)
        }, "de_UnsupportedGrantTypeExceptionRes"),
        sz = A6((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        F62 = class extends i42.Command.classBuilder().ep(rK4).m(function(A, B, Q, Z) {
            return [ZH4.getSerdePlugin(Q, this.serialize, this.deserialize), QH4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").f(s42, r42).ser(FH4).de(IH4).build() {
            static {
                A6(this, "CreateTokenCommand")
            }
        },
        qH4 = {
            CreateTokenCommand: F62
        },
        I62 = class extends p42 {
            static {
                A6(this, "SSOOIDC")
            }
        };
    BH4.createAggregatedClient(qH4, I62)
});