/* chunk:114 bytes:[2615818, 2639649) size:23831 source:unpacked-cli.js */
var me1 = E((Q45, FqA) => {
    var {
        defineProperty: SE1,
        getOwnPropertyDescriptor: MwQ,
        getOwnPropertyNames: RwQ
    } = Object, OwQ = Object.prototype.hasOwnProperty, t4 = (A, B) => SE1(A, "name", {
        value: B,
        configurable: !0
    }), TwQ = (A, B) => {
        for (var Q in B) SE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, PwQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of RwQ(B))
                if (!OwQ.call(A, D) && D !== Q) SE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = MwQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, SwQ = (A) => PwQ(SE1({}, "__esModule", {
        value: !0
    }), A), m$A = {};
    TwQ(m$A, {
        $Command: () => l$A.Command,
        AccessDeniedException: () => p$A,
        AuthorizationPendingException: () => i$A,
        CreateTokenCommand: () => DqA,
        CreateTokenRequestFilterSensitiveLog: () => n$A,
        CreateTokenResponseFilterSensitiveLog: () => a$A,
        ExpiredTokenException: () => s$A,
        InternalServerException: () => r$A,
        InvalidClientException: () => o$A,
        InvalidGrantException: () => t$A,
        InvalidRequestException: () => e$A,
        InvalidScopeException: () => AqA,
        SSOOIDC: () => GqA,
        SSOOIDCClient: () => c$A,
        SSOOIDCServiceException: () => oC,
        SlowDownException: () => BqA,
        UnauthorizedClientException: () => QqA,
        UnsupportedGrantTypeException: () => ZqA,
        __Client: () => d$A.Client
    });
    FqA.exports = SwQ(m$A);
    var x$A = GQ1(),
        jwQ = FQ1(),
        kwQ = IQ1(),
        v$A = fi(),
        ywQ = z4(),
        ge1 = HB(),
        _wQ = hG(),
        xwQ = T6(),
        b$A = u4(),
        d$A = XD(),
        f$A = Se1(),
        vwQ = t4((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "sso-oauth"
            })
        }, "resolveClientEndpointParameters"),
        bwQ = {
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
        fwQ = P$A(),
        h$A = NQ1(),
        g$A = PE1(),
        u$A = XD(),
        hwQ = t4((A) => {
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
        gwQ = t4((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        uwQ = t4((A, B) => {
            let Q = Object.assign(h$A.getAwsRegionExtensionConfiguration(A), u$A.getDefaultExtensionConfiguration(A), g$A.getHttpHandlerExtensionConfiguration(A), hwQ(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, h$A.resolveAwsRegionExtensionConfiguration(Q), u$A.resolveDefaultRuntimeConfig(Q), g$A.resolveHttpHandlerRuntimeConfig(Q), gwQ(Q))
        }, "resolveRuntimeExtensions"),
        c$A = class extends d$A.Client {
            static {
                t4(this, "SSOOIDCClient")
            }
            config;
            constructor(...[A]) {
                let B = fwQ.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = vwQ(B),
                    Z = v$A.resolveUserAgentConfig(Q),
                    D = b$A.resolveRetryConfig(Z),
                    G = ywQ.resolveRegionConfig(D),
                    F = x$A.resolveHostHeaderConfig(G),
                    I = xwQ.resolveEndpointConfig(F),
                    Y = f$A.resolveHttpAuthSchemeConfig(I),
                    W = uwQ(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(v$A.getUserAgentPlugin(this.config)), this.middlewareStack.use(b$A.getRetryPlugin(this.config)), this.middlewareStack.use(_wQ.getContentLengthPlugin(this.config)), this.middlewareStack.use(x$A.getHostHeaderPlugin(this.config)), this.middlewareStack.use(jwQ.getLoggerPlugin(this.config)), this.middlewareStack.use(kwQ.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(ge1.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: f$A.defaultSSOOIDCHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: t4(async (J) => new ge1.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(ge1.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        mwQ = XD(),
        dwQ = T6(),
        cwQ = y3(),
        l$A = XD(),
        Bn = XD(),
        lwQ = XD(),
        oC = class A extends lwQ.ServiceException {
            static {
                t4(this, "SSOOIDCServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        p$A = class A extends oC {
            static {
                t4(this, "AccessDeniedException")
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
        i$A = class A extends oC {
            static {
                t4(this, "AuthorizationPendingException")
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
        n$A = t4((A) => ({
            ...A,
            ...A.clientSecret && {
                clientSecret: Bn.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: Bn.SENSITIVE_STRING
            },
            ...A.codeVerifier && {
                codeVerifier: Bn.SENSITIVE_STRING
            }
        }), "CreateTokenRequestFilterSensitiveLog"),
        a$A = t4((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: Bn.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: Bn.SENSITIVE_STRING
            },
            ...A.idToken && {
                idToken: Bn.SENSITIVE_STRING
            }
        }), "CreateTokenResponseFilterSensitiveLog"),
        s$A = class A extends oC {
            static {
                t4(this, "ExpiredTokenException")
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
        r$A = class A extends oC {
            static {
                t4(this, "InternalServerException")
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
        o$A = class A extends oC {
            static {
                t4(this, "InvalidClientException")
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
        t$A = class A extends oC {
            static {
                t4(this, "InvalidGrantException")
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
        e$A = class A extends oC {
            static {
                t4(this, "InvalidRequestException")
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
        AqA = class A extends oC {
            static {
                t4(this, "InvalidScopeException")
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
        BqA = class A extends oC {
            static {
                t4(this, "SlowDownException")
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
        QqA = class A extends oC {
            static {
                t4(this, "UnauthorizedClientException")
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
        ZqA = class A extends oC {
            static {
                t4(this, "UnsupportedGrantTypeException")
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
        ue1 = WI(),
        pwQ = HB(),
        $B = XD(),
        iwQ = t4(async (A, B) => {
            let Q = pwQ.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/token");
            let D;
            return D = JSON.stringify($B.take(A, {
                clientId: [],
                clientSecret: [],
                code: [],
                codeVerifier: [],
                deviceCode: [],
                grantType: [],
                redirectUri: [],
                refreshToken: [],
                scope: t4((G) => $B._json(G), "scope")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateTokenCommand"),
        nwQ = t4(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return awQ(A, B);
            let Q = $B.map({
                    $metadata: wz(A)
                }),
                Z = $B.expectNonNull($B.expectObject(await ue1.parseJsonBody(A.body, B)), "body"),
                D = $B.take(Z, {
                    accessToken: $B.expectString,
                    expiresIn: $B.expectInt32,
                    idToken: $B.expectString,
                    refreshToken: $B.expectString,
                    tokenType: $B.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateTokenCommand"),
        awQ = t4(async (A, B) => {
            let Q = {
                    ...A,
                    body: await ue1.parseJsonErrorBody(A.body, B)
                },
                Z = ue1.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "AccessDeniedException":
                case "com.amazonaws.ssooidc#AccessDeniedException":
                    throw await rwQ(Q, B);
                case "AuthorizationPendingException":
                case "com.amazonaws.ssooidc#AuthorizationPendingException":
                    throw await owQ(Q, B);
                case "ExpiredTokenException":
                case "com.amazonaws.ssooidc#ExpiredTokenException":
                    throw await twQ(Q, B);
                case "InternalServerException":
                case "com.amazonaws.ssooidc#InternalServerException":
                    throw await ewQ(Q, B);
                case "InvalidClientException":
                case "com.amazonaws.ssooidc#InvalidClientException":
                    throw await A$Q(Q, B);
                case "InvalidGrantException":
                case "com.amazonaws.ssooidc#InvalidGrantException":
                    throw await B$Q(Q, B);
                case "InvalidRequestException":
                case "com.amazonaws.ssooidc#InvalidRequestException":
                    throw await Q$Q(Q, B);
                case "InvalidScopeException":
                case "com.amazonaws.ssooidc#InvalidScopeException":
                    throw await Z$Q(Q, B);
                case "SlowDownException":
                case "com.amazonaws.ssooidc#SlowDownException":
                    throw await D$Q(Q, B);
                case "UnauthorizedClientException":
                case "com.amazonaws.ssooidc#UnauthorizedClientException":
                    throw await G$Q(Q, B);
                case "UnsupportedGrantTypeException":
                case "com.amazonaws.ssooidc#UnsupportedGrantTypeException":
                    throw await F$Q(Q, B);
                default:
                    let D = Q.body;
                    return swQ({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        swQ = $B.withBaseException(oC),
        rwQ = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new p$A({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_AccessDeniedExceptionRes"),
        owQ = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new i$A({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_AuthorizationPendingExceptionRes"),
        twQ = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new s$A({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_ExpiredTokenExceptionRes"),
        ewQ = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new r$A({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_InternalServerExceptionRes"),
        A$Q = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new o$A({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_InvalidClientExceptionRes"),
        B$Q = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new t$A({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_InvalidGrantExceptionRes"),
        Q$Q = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new e$A({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        Z$Q = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new AqA({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_InvalidScopeExceptionRes"),
        D$Q = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new BqA({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_SlowDownExceptionRes"),
        G$Q = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new QqA({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_UnauthorizedClientExceptionRes"),
        F$Q = t4(async (A, B) => {
            let Q = $B.map({}),
                Z = A.body,
                D = $B.take(Z, {
                    error: $B.expectString,
                    error_description: $B.expectString
                });
            Object.assign(Q, D);
            let G = new ZqA({
                $metadata: wz(A),
                ...Q
            });
            return $B.decorateServiceException(G, A.body)
        }, "de_UnsupportedGrantTypeExceptionRes"),
        wz = t4((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        DqA = class extends l$A.Command.classBuilder().ep(bwQ).m(function(A, B, Q, Z) {
            return [cwQ.getSerdePlugin(Q, this.serialize, this.deserialize), dwQ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").f(n$A, a$A).ser(iwQ).de(nwQ).build() {
            static {
                t4(this, "CreateTokenCommand")
            }
        },
        I$Q = {
            CreateTokenCommand: DqA
        },
        GqA = class extends c$A {
            static {
                t4(this, "SSOOIDC")
            }
        };
    mwQ.createAggregatedClient(I$Q, GqA)
});