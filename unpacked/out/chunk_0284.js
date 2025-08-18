/* chunk:284 bytes:[6036725, 6060556) size:23831 source:unpacked-cli.js */
var NG0 = E((vR5, q$2) => {
    var {
        defineProperty: CR1,
        getOwnPropertyDescriptor: Sc4,
        getOwnPropertyNames: jc4
    } = Object, kc4 = Object.prototype.hasOwnProperty, Q6 = (A, B) => CR1(A, "name", {
        value: B,
        configurable: !0
    }), yc4 = (A, B) => {
        for (var Q in B) CR1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, _c4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of jc4(B))
                if (!kc4.call(A, D) && D !== Q) CR1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Sc4(B, D)) || Z.enumerable
                })
        }
        return A
    }, xc4 = (A) => _c4(CR1({}, "__esModule", {
        value: !0
    }), A), Q$2 = {};
    yc4(Q$2, {
        $Command: () => G$2.Command,
        AccessDeniedException: () => F$2,
        AuthorizationPendingException: () => I$2,
        CreateTokenCommand: () => w$2,
        CreateTokenRequestFilterSensitiveLog: () => Y$2,
        CreateTokenResponseFilterSensitiveLog: () => W$2,
        ExpiredTokenException: () => J$2,
        InternalServerException: () => X$2,
        InvalidClientException: () => V$2,
        InvalidGrantException: () => C$2,
        InvalidRequestException: () => K$2,
        InvalidScopeException: () => H$2,
        SSOOIDC: () => $$2,
        SSOOIDCClient: () => D$2,
        SSOOIDCServiceException: () => kK,
        SlowDownException: () => z$2,
        UnauthorizedClientException: () => E$2,
        UnsupportedGrantTypeException: () => U$2,
        __Client: () => Z$2.Client
    });
    q$2.exports = xc4(Q$2);
    var sw2 = RM1(),
        vc4 = TM1(),
        bc4 = jM1(),
        rw2 = K51(),
        fc4 = z4(),
        $G0 = HB(),
        hc4 = hG(),
        gc4 = T6(),
        ow2 = u4(),
        Z$2 = P8(),
        tw2 = zG0(),
        uc4 = Q6((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "sso-oauth"
            })
        }, "resolveClientEndpointParameters"),
        mc4 = {
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
        dc4 = aw2(),
        ew2 = tM1(),
        A$2 = SK(),
        B$2 = P8(),
        cc4 = Q6((A) => {
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
        lc4 = Q6((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        pc4 = Q6((A, B) => {
            let Q = Object.assign(ew2.getAwsRegionExtensionConfiguration(A), B$2.getDefaultExtensionConfiguration(A), A$2.getHttpHandlerExtensionConfiguration(A), cc4(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, ew2.resolveAwsRegionExtensionConfiguration(Q), B$2.resolveDefaultRuntimeConfig(Q), A$2.resolveHttpHandlerRuntimeConfig(Q), lc4(Q))
        }, "resolveRuntimeExtensions"),
        D$2 = class extends Z$2.Client {
            static {
                Q6(this, "SSOOIDCClient")
            }
            config;
            constructor(...[A]) {
                let B = dc4.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = uc4(B),
                    Z = rw2.resolveUserAgentConfig(Q),
                    D = ow2.resolveRetryConfig(Z),
                    G = fc4.resolveRegionConfig(D),
                    F = sw2.resolveHostHeaderConfig(G),
                    I = gc4.resolveEndpointConfig(F),
                    Y = tw2.resolveHttpAuthSchemeConfig(I),
                    W = pc4(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(rw2.getUserAgentPlugin(this.config)), this.middlewareStack.use(ow2.getRetryPlugin(this.config)), this.middlewareStack.use(hc4.getContentLengthPlugin(this.config)), this.middlewareStack.use(sw2.getHostHeaderPlugin(this.config)), this.middlewareStack.use(vc4.getLoggerPlugin(this.config)), this.middlewareStack.use(bc4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use($G0.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: tw2.defaultSSOOIDCHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: Q6(async (J) => new $G0.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use($G0.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        ic4 = P8(),
        nc4 = T6(),
        ac4 = y3(),
        G$2 = P8(),
        Oo = P8(),
        sc4 = P8(),
        kK = class A extends sc4.ServiceException {
            static {
                Q6(this, "SSOOIDCServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        F$2 = class A extends kK {
            static {
                Q6(this, "AccessDeniedException")
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
        I$2 = class A extends kK {
            static {
                Q6(this, "AuthorizationPendingException")
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
        Y$2 = Q6((A) => ({
            ...A,
            ...A.clientSecret && {
                clientSecret: Oo.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: Oo.SENSITIVE_STRING
            },
            ...A.codeVerifier && {
                codeVerifier: Oo.SENSITIVE_STRING
            }
        }), "CreateTokenRequestFilterSensitiveLog"),
        W$2 = Q6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: Oo.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: Oo.SENSITIVE_STRING
            },
            ...A.idToken && {
                idToken: Oo.SENSITIVE_STRING
            }
        }), "CreateTokenResponseFilterSensitiveLog"),
        J$2 = class A extends kK {
            static {
                Q6(this, "ExpiredTokenException")
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
        X$2 = class A extends kK {
            static {
                Q6(this, "InternalServerException")
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
        V$2 = class A extends kK {
            static {
                Q6(this, "InvalidClientException")
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
        C$2 = class A extends kK {
            static {
                Q6(this, "InvalidGrantException")
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
        K$2 = class A extends kK {
            static {
                Q6(this, "InvalidRequestException")
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
        H$2 = class A extends kK {
            static {
                Q6(this, "InvalidScopeException")
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
        z$2 = class A extends kK {
            static {
                Q6(this, "SlowDownException")
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
        E$2 = class A extends kK {
            static {
                Q6(this, "UnauthorizedClientException")
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
        U$2 = class A extends kK {
            static {
                Q6(this, "UnsupportedGrantTypeException")
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
        qG0 = bV(),
        rc4 = HB(),
        LB = P8(),
        oc4 = Q6(async (A, B) => {
            let Q = rc4.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/token");
            let D;
            return D = JSON.stringify(LB.take(A, {
                clientId: [],
                clientSecret: [],
                code: [],
                codeVerifier: [],
                deviceCode: [],
                grantType: [],
                redirectUri: [],
                refreshToken: [],
                scope: Q6((G) => LB._json(G), "scope")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateTokenCommand"),
        tc4 = Q6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ec4(A, B);
            let Q = LB.map({
                    $metadata: CE(A)
                }),
                Z = LB.expectNonNull(LB.expectObject(await qG0.parseJsonBody(A.body, B)), "body"),
                D = LB.take(Z, {
                    accessToken: LB.expectString,
                    expiresIn: LB.expectInt32,
                    idToken: LB.expectString,
                    refreshToken: LB.expectString,
                    tokenType: LB.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateTokenCommand"),
        ec4 = Q6(async (A, B) => {
            let Q = {
                    ...A,
                    body: await qG0.parseJsonErrorBody(A.body, B)
                },
                Z = qG0.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "AccessDeniedException":
                case "com.amazonaws.ssooidc#AccessDeniedException":
                    throw await Bl4(Q, B);
                case "AuthorizationPendingException":
                case "com.amazonaws.ssooidc#AuthorizationPendingException":
                    throw await Ql4(Q, B);
                case "ExpiredTokenException":
                case "com.amazonaws.ssooidc#ExpiredTokenException":
                    throw await Zl4(Q, B);
                case "InternalServerException":
                case "com.amazonaws.ssooidc#InternalServerException":
                    throw await Dl4(Q, B);
                case "InvalidClientException":
                case "com.amazonaws.ssooidc#InvalidClientException":
                    throw await Gl4(Q, B);
                case "InvalidGrantException":
                case "com.amazonaws.ssooidc#InvalidGrantException":
                    throw await Fl4(Q, B);
                case "InvalidRequestException":
                case "com.amazonaws.ssooidc#InvalidRequestException":
                    throw await Il4(Q, B);
                case "InvalidScopeException":
                case "com.amazonaws.ssooidc#InvalidScopeException":
                    throw await Yl4(Q, B);
                case "SlowDownException":
                case "com.amazonaws.ssooidc#SlowDownException":
                    throw await Wl4(Q, B);
                case "UnauthorizedClientException":
                case "com.amazonaws.ssooidc#UnauthorizedClientException":
                    throw await Jl4(Q, B);
                case "UnsupportedGrantTypeException":
                case "com.amazonaws.ssooidc#UnsupportedGrantTypeException":
                    throw await Xl4(Q, B);
                default:
                    let D = Q.body;
                    return Al4({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        Al4 = LB.withBaseException(kK),
        Bl4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new F$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_AccessDeniedExceptionRes"),
        Ql4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new I$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_AuthorizationPendingExceptionRes"),
        Zl4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new J$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_ExpiredTokenExceptionRes"),
        Dl4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new X$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_InternalServerExceptionRes"),
        Gl4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new V$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_InvalidClientExceptionRes"),
        Fl4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new C$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_InvalidGrantExceptionRes"),
        Il4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new K$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        Yl4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new H$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_InvalidScopeExceptionRes"),
        Wl4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new z$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_SlowDownExceptionRes"),
        Jl4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new E$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_UnauthorizedClientExceptionRes"),
        Xl4 = Q6(async (A, B) => {
            let Q = LB.map({}),
                Z = A.body,
                D = LB.take(Z, {
                    error: LB.expectString,
                    error_description: LB.expectString
                });
            Object.assign(Q, D);
            let G = new U$2({
                $metadata: CE(A),
                ...Q
            });
            return LB.decorateServiceException(G, A.body)
        }, "de_UnsupportedGrantTypeExceptionRes"),
        CE = Q6((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        w$2 = class extends G$2.Command.classBuilder().ep(mc4).m(function(A, B, Q, Z) {
            return [ac4.getSerdePlugin(Q, this.serialize, this.deserialize), nc4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").f(Y$2, W$2).ser(oc4).de(tc4).build() {
            static {
                Q6(this, "CreateTokenCommand")
            }
        },
        Vl4 = {
            CreateTokenCommand: w$2
        },
        $$2 = class extends D$2 {
            static {
                Q6(this, "SSOOIDC")
            }
        };
    ic4.createAggregatedClient(Vl4, $$2)
});