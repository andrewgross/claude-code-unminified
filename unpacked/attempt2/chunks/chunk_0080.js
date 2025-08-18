/* chunk:80 bytes:[1835290, 1859120) size:23830 source:unpacked-cli.js */
var Gr1 = E((F25, SDA) => {
    var {
        defineProperty: _H1,
        getOwnPropertyDescriptor: M9Q,
        getOwnPropertyNames: R9Q
    } = Object, O9Q = Object.prototype.hasOwnProperty, o4 = (A, B) => _H1(A, "name", {
        value: B,
        configurable: !0
    }), T9Q = (A, B) => {
        for (var Q in B) _H1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, P9Q = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of R9Q(B))
                if (!O9Q.call(A, D) && D !== Q) _H1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = M9Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, S9Q = (A) => P9Q(_H1({}, "__esModule", {
        value: !0
    }), A), JDA = {};
    T9Q(JDA, {
        $Command: () => CDA.Command,
        AccessDeniedException: () => KDA,
        AuthorizationPendingException: () => HDA,
        CreateTokenCommand: () => TDA,
        CreateTokenRequestFilterSensitiveLog: () => zDA,
        CreateTokenResponseFilterSensitiveLog: () => EDA,
        ExpiredTokenException: () => UDA,
        InternalServerException: () => wDA,
        InvalidClientException: () => $DA,
        InvalidGrantException: () => qDA,
        InvalidRequestException: () => NDA,
        InvalidScopeException: () => LDA,
        SSOOIDC: () => PDA,
        SSOOIDCClient: () => VDA,
        SSOOIDCServiceException: () => aC,
        SlowDownException: () => MDA,
        UnauthorizedClientException: () => RDA,
        UnsupportedGrantTypeException: () => ODA,
        __Client: () => XDA.Client
    });
    SDA.exports = S9Q(JDA);
    var ZDA = W91(),
        j9Q = J91(),
        k9Q = X91(),
        DDA = Bi(),
        y9Q = z4(),
        Zr1 = HB(),
        _9Q = hG(),
        x9Q = T6(),
        GDA = u4(),
        XDA = V6(),
        FDA = ts1(),
        v9Q = o4((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "sso-oauth"
            })
        }, "resolveClientEndpointParameters"),
        b9Q = {
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
        f9Q = QDA(),
        IDA = m91(),
        YDA = CV(),
        WDA = V6(),
        h9Q = o4((A) => {
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
        g9Q = o4((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        u9Q = o4((A, B) => {
            let Q = Object.assign(IDA.getAwsRegionExtensionConfiguration(A), WDA.getDefaultExtensionConfiguration(A), YDA.getHttpHandlerExtensionConfiguration(A), h9Q(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, IDA.resolveAwsRegionExtensionConfiguration(Q), WDA.resolveDefaultRuntimeConfig(Q), YDA.resolveHttpHandlerRuntimeConfig(Q), g9Q(Q))
        }, "resolveRuntimeExtensions"),
        VDA = class extends XDA.Client {
            static {
                o4(this, "SSOOIDCClient")
            }
            config;
            constructor(...[A]) {
                let B = f9Q.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = v9Q(B),
                    Z = DDA.resolveUserAgentConfig(Q),
                    D = GDA.resolveRetryConfig(Z),
                    G = y9Q.resolveRegionConfig(D),
                    F = ZDA.resolveHostHeaderConfig(G),
                    I = x9Q.resolveEndpointConfig(F),
                    Y = FDA.resolveHttpAuthSchemeConfig(I),
                    W = u9Q(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(DDA.getUserAgentPlugin(this.config)), this.middlewareStack.use(GDA.getRetryPlugin(this.config)), this.middlewareStack.use(_9Q.getContentLengthPlugin(this.config)), this.middlewareStack.use(ZDA.getHostHeaderPlugin(this.config)), this.middlewareStack.use(j9Q.getLoggerPlugin(this.config)), this.middlewareStack.use(k9Q.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(Zr1.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: FDA.defaultSSOOIDCHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: o4(async (J) => new Zr1.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(Zr1.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        m9Q = V6(),
        d9Q = T6(),
        c9Q = y3(),
        CDA = V6(),
        Ci = V6(),
        l9Q = V6(),
        aC = class A extends l9Q.ServiceException {
            static {
                o4(this, "SSOOIDCServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        KDA = class A extends aC {
            static {
                o4(this, "AccessDeniedException")
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
        HDA = class A extends aC {
            static {
                o4(this, "AuthorizationPendingException")
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
        zDA = o4((A) => ({
            ...A,
            ...A.clientSecret && {
                clientSecret: Ci.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: Ci.SENSITIVE_STRING
            },
            ...A.codeVerifier && {
                codeVerifier: Ci.SENSITIVE_STRING
            }
        }), "CreateTokenRequestFilterSensitiveLog"),
        EDA = o4((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: Ci.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: Ci.SENSITIVE_STRING
            },
            ...A.idToken && {
                idToken: Ci.SENSITIVE_STRING
            }
        }), "CreateTokenResponseFilterSensitiveLog"),
        UDA = class A extends aC {
            static {
                o4(this, "ExpiredTokenException")
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
        wDA = class A extends aC {
            static {
                o4(this, "InternalServerException")
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
        $DA = class A extends aC {
            static {
                o4(this, "InvalidClientException")
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
        qDA = class A extends aC {
            static {
                o4(this, "InvalidGrantException")
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
        NDA = class A extends aC {
            static {
                o4(this, "InvalidRequestException")
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
        LDA = class A extends aC {
            static {
                o4(this, "InvalidScopeException")
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
        MDA = class A extends aC {
            static {
                o4(this, "SlowDownException")
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
        RDA = class A extends aC {
            static {
                o4(this, "UnauthorizedClientException")
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
        ODA = class A extends aC {
            static {
                o4(this, "UnsupportedGrantTypeException")
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
        Dr1 = YI(),
        p9Q = HB(),
        UB = V6(),
        i9Q = o4(async (A, B) => {
            let Q = p9Q.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/token");
            let D;
            return D = JSON.stringify(UB.take(A, {
                clientId: [],
                clientSecret: [],
                code: [],
                codeVerifier: [],
                deviceCode: [],
                grantType: [],
                redirectUri: [],
                refreshToken: [],
                scope: o4((G) => UB._json(G), "scope")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateTokenCommand"),
        n9Q = o4(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return a9Q(A, B);
            let Q = UB.map({
                    $metadata: Jz(A)
                }),
                Z = UB.expectNonNull(UB.expectObject(await Dr1.parseJsonBody(A.body, B)), "body"),
                D = UB.take(Z, {
                    accessToken: UB.expectString,
                    expiresIn: UB.expectInt32,
                    idToken: UB.expectString,
                    refreshToken: UB.expectString,
                    tokenType: UB.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateTokenCommand"),
        a9Q = o4(async (A, B) => {
            let Q = {
                    ...A,
                    body: await Dr1.parseJsonErrorBody(A.body, B)
                },
                Z = Dr1.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "AccessDeniedException":
                case "com.amazonaws.ssooidc#AccessDeniedException":
                    throw await r9Q(Q, B);
                case "AuthorizationPendingException":
                case "com.amazonaws.ssooidc#AuthorizationPendingException":
                    throw await o9Q(Q, B);
                case "ExpiredTokenException":
                case "com.amazonaws.ssooidc#ExpiredTokenException":
                    throw await t9Q(Q, B);
                case "InternalServerException":
                case "com.amazonaws.ssooidc#InternalServerException":
                    throw await e9Q(Q, B);
                case "InvalidClientException":
                case "com.amazonaws.ssooidc#InvalidClientException":
                    throw await AQQ(Q, B);
                case "InvalidGrantException":
                case "com.amazonaws.ssooidc#InvalidGrantException":
                    throw await BQQ(Q, B);
                case "InvalidRequestException":
                case "com.amazonaws.ssooidc#InvalidRequestException":
                    throw await QQQ(Q, B);
                case "InvalidScopeException":
                case "com.amazonaws.ssooidc#InvalidScopeException":
                    throw await ZQQ(Q, B);
                case "SlowDownException":
                case "com.amazonaws.ssooidc#SlowDownException":
                    throw await DQQ(Q, B);
                case "UnauthorizedClientException":
                case "com.amazonaws.ssooidc#UnauthorizedClientException":
                    throw await GQQ(Q, B);
                case "UnsupportedGrantTypeException":
                case "com.amazonaws.ssooidc#UnsupportedGrantTypeException":
                    throw await FQQ(Q, B);
                default:
                    let D = Q.body;
                    return s9Q({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        s9Q = UB.withBaseException(aC),
        r9Q = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new KDA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_AccessDeniedExceptionRes"),
        o9Q = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new HDA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_AuthorizationPendingExceptionRes"),
        t9Q = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new UDA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_ExpiredTokenExceptionRes"),
        e9Q = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new wDA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_InternalServerExceptionRes"),
        AQQ = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new $DA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_InvalidClientExceptionRes"),
        BQQ = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new qDA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_InvalidGrantExceptionRes"),
        QQQ = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new NDA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        ZQQ = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new LDA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_InvalidScopeExceptionRes"),
        DQQ = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new MDA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_SlowDownExceptionRes"),
        GQQ = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new RDA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_UnauthorizedClientExceptionRes"),
        FQQ = o4(async (A, B) => {
            let Q = UB.map({}),
                Z = A.body,
                D = UB.take(Z, {
                    error: UB.expectString,
                    error_description: UB.expectString
                });
            Object.assign(Q, D);
            let G = new ODA({
                $metadata: Jz(A),
                ...Q
            });
            return UB.decorateServiceException(G, A.body)
        }, "de_UnsupportedGrantTypeExceptionRes"),
        Jz = o4((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        TDA = class extends CDA.Command.classBuilder().ep(b9Q).m(function(A, B, Q, Z) {
            return [c9Q.getSerdePlugin(Q, this.serialize, this.deserialize), d9Q.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").f(zDA, EDA).ser(i9Q).de(n9Q).build() {
            static {
                o4(this, "CreateTokenCommand")
            }
        },
        IQQ = {
            CreateTokenCommand: TDA
        },
        PDA = class extends VDA {
            static {
                o4(this, "SSOOIDC")
            }
        };
    m9Q.createAggregatedClient(IQQ, PDA)
});