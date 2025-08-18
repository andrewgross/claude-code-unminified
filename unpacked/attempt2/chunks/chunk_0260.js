/* chunk:260 bytes:[5571083, 5594913) size:23830 source:unpacked-cli.js */
var q70 = E((pN5, pY2) => {
    var {
        defineProperty: eL1,
        getOwnPropertyDescriptor: XP4,
        getOwnPropertyNames: VP4
    } = Object, CP4 = Object.prototype.hasOwnProperty, B6 = (A, B) => eL1(A, "name", {
        value: B,
        configurable: !0
    }), KP4 = (A, B) => {
        for (var Q in B) eL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, HP4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of VP4(B))
                if (!CP4.call(A, D) && D !== Q) eL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = XP4(B, D)) || Z.enumerable
                })
        }
        return A
    }, zP4 = (A) => HP4(eL1({}, "__esModule", {
        value: !0
    }), A), OY2 = {};
    KP4(OY2, {
        $Command: () => SY2.Command,
        AccessDeniedException: () => jY2,
        AuthorizationPendingException: () => kY2,
        CreateTokenCommand: () => cY2,
        CreateTokenRequestFilterSensitiveLog: () => yY2,
        CreateTokenResponseFilterSensitiveLog: () => _Y2,
        ExpiredTokenException: () => xY2,
        InternalServerException: () => vY2,
        InvalidClientException: () => bY2,
        InvalidGrantException: () => fY2,
        InvalidRequestException: () => hY2,
        InvalidScopeException: () => gY2,
        SSOOIDC: () => lY2,
        SSOOIDCClient: () => PY2,
        SSOOIDCServiceException: () => MK,
        SlowDownException: () => uY2,
        UnauthorizedClientException: () => mY2,
        UnsupportedGrantTypeException: () => dY2,
        __Client: () => TY2.Client
    });
    pY2.exports = zP4(OY2);
    var wY2 = f81(),
        EP4 = h81(),
        UP4 = g81(),
        $Y2 = hr(),
        wP4 = z4(),
        w70 = HB(),
        $P4 = hG(),
        qP4 = T6(),
        qY2 = u4(),
        TY2 = H6(),
        NY2 = K70(),
        NP4 = B6((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "sso-oauth"
            })
        }, "resolveClientEndpointParameters"),
        LP4 = {
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
        MP4 = UY2(),
        LY2 = n81(),
        MY2 = vV(),
        RY2 = H6(),
        RP4 = B6((A) => {
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
        OP4 = B6((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        TP4 = B6((A, B) => {
            let Q = Object.assign(LY2.getAwsRegionExtensionConfiguration(A), RY2.getDefaultExtensionConfiguration(A), MY2.getHttpHandlerExtensionConfiguration(A), RP4(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, LY2.resolveAwsRegionExtensionConfiguration(Q), RY2.resolveDefaultRuntimeConfig(Q), MY2.resolveHttpHandlerRuntimeConfig(Q), OP4(Q))
        }, "resolveRuntimeExtensions"),
        PY2 = class extends TY2.Client {
            static {
                B6(this, "SSOOIDCClient")
            }
            config;
            constructor(...[A]) {
                let B = MP4.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = NP4(B),
                    Z = $Y2.resolveUserAgentConfig(Q),
                    D = qY2.resolveRetryConfig(Z),
                    G = wP4.resolveRegionConfig(D),
                    F = wY2.resolveHostHeaderConfig(G),
                    I = qP4.resolveEndpointConfig(F),
                    Y = NY2.resolveHttpAuthSchemeConfig(I),
                    W = TP4(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use($Y2.getUserAgentPlugin(this.config)), this.middlewareStack.use(qY2.getRetryPlugin(this.config)), this.middlewareStack.use($P4.getContentLengthPlugin(this.config)), this.middlewareStack.use(wY2.getHostHeaderPlugin(this.config)), this.middlewareStack.use(EP4.getLoggerPlugin(this.config)), this.middlewareStack.use(UP4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(w70.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: NY2.defaultSSOOIDCHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: B6(async (J) => new w70.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(w70.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        PP4 = H6(),
        SP4 = T6(),
        jP4 = y3(),
        SY2 = H6(),
        ir = H6(),
        kP4 = H6(),
        MK = class A extends kP4.ServiceException {
            static {
                B6(this, "SSOOIDCServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        jY2 = class A extends MK {
            static {
                B6(this, "AccessDeniedException")
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
        kY2 = class A extends MK {
            static {
                B6(this, "AuthorizationPendingException")
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
        yY2 = B6((A) => ({
            ...A,
            ...A.clientSecret && {
                clientSecret: ir.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: ir.SENSITIVE_STRING
            },
            ...A.codeVerifier && {
                codeVerifier: ir.SENSITIVE_STRING
            }
        }), "CreateTokenRequestFilterSensitiveLog"),
        _Y2 = B6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: ir.SENSITIVE_STRING
            },
            ...A.refreshToken && {
                refreshToken: ir.SENSITIVE_STRING
            },
            ...A.idToken && {
                idToken: ir.SENSITIVE_STRING
            }
        }), "CreateTokenResponseFilterSensitiveLog"),
        xY2 = class A extends MK {
            static {
                B6(this, "ExpiredTokenException")
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
        vY2 = class A extends MK {
            static {
                B6(this, "InternalServerException")
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
        bY2 = class A extends MK {
            static {
                B6(this, "InvalidClientException")
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
        fY2 = class A extends MK {
            static {
                B6(this, "InvalidGrantException")
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
        hY2 = class A extends MK {
            static {
                B6(this, "InvalidRequestException")
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
        gY2 = class A extends MK {
            static {
                B6(this, "InvalidScopeException")
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
        uY2 = class A extends MK {
            static {
                B6(this, "SlowDownException")
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
        mY2 = class A extends MK {
            static {
                B6(this, "UnauthorizedClientException")
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
        dY2 = class A extends MK {
            static {
                B6(this, "UnsupportedGrantTypeException")
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
        $70 = UI(),
        yP4 = HB(),
        NB = H6(),
        _P4 = B6(async (A, B) => {
            let Q = yP4.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/token");
            let D;
            return D = JSON.stringify(NB.take(A, {
                clientId: [],
                clientSecret: [],
                code: [],
                codeVerifier: [],
                deviceCode: [],
                grantType: [],
                redirectUri: [],
                refreshToken: [],
                scope: B6((G) => NB._json(G), "scope")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateTokenCommand"),
        xP4 = B6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return vP4(A, B);
            let Q = NB.map({
                    $metadata: GE(A)
                }),
                Z = NB.expectNonNull(NB.expectObject(await $70.parseJsonBody(A.body, B)), "body"),
                D = NB.take(Z, {
                    accessToken: NB.expectString,
                    expiresIn: NB.expectInt32,
                    idToken: NB.expectString,
                    refreshToken: NB.expectString,
                    tokenType: NB.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateTokenCommand"),
        vP4 = B6(async (A, B) => {
            let Q = {
                    ...A,
                    body: await $70.parseJsonErrorBody(A.body, B)
                },
                Z = $70.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "AccessDeniedException":
                case "com.amazonaws.ssooidc#AccessDeniedException":
                    throw await fP4(Q, B);
                case "AuthorizationPendingException":
                case "com.amazonaws.ssooidc#AuthorizationPendingException":
                    throw await hP4(Q, B);
                case "ExpiredTokenException":
                case "com.amazonaws.ssooidc#ExpiredTokenException":
                    throw await gP4(Q, B);
                case "InternalServerException":
                case "com.amazonaws.ssooidc#InternalServerException":
                    throw await uP4(Q, B);
                case "InvalidClientException":
                case "com.amazonaws.ssooidc#InvalidClientException":
                    throw await mP4(Q, B);
                case "InvalidGrantException":
                case "com.amazonaws.ssooidc#InvalidGrantException":
                    throw await dP4(Q, B);
                case "InvalidRequestException":
                case "com.amazonaws.ssooidc#InvalidRequestException":
                    throw await cP4(Q, B);
                case "InvalidScopeException":
                case "com.amazonaws.ssooidc#InvalidScopeException":
                    throw await lP4(Q, B);
                case "SlowDownException":
                case "com.amazonaws.ssooidc#SlowDownException":
                    throw await pP4(Q, B);
                case "UnauthorizedClientException":
                case "com.amazonaws.ssooidc#UnauthorizedClientException":
                    throw await iP4(Q, B);
                case "UnsupportedGrantTypeException":
                case "com.amazonaws.ssooidc#UnsupportedGrantTypeException":
                    throw await nP4(Q, B);
                default:
                    let D = Q.body;
                    return bP4({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        bP4 = NB.withBaseException(MK),
        fP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new jY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_AccessDeniedExceptionRes"),
        hP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new kY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_AuthorizationPendingExceptionRes"),
        gP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new xY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_ExpiredTokenExceptionRes"),
        uP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new vY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_InternalServerExceptionRes"),
        mP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new bY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_InvalidClientExceptionRes"),
        dP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new fY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_InvalidGrantExceptionRes"),
        cP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new hY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        lP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new gY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_InvalidScopeExceptionRes"),
        pP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new uY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_SlowDownExceptionRes"),
        iP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new mY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_UnauthorizedClientExceptionRes"),
        nP4 = B6(async (A, B) => {
            let Q = NB.map({}),
                Z = A.body,
                D = NB.take(Z, {
                    error: NB.expectString,
                    error_description: NB.expectString
                });
            Object.assign(Q, D);
            let G = new dY2({
                $metadata: GE(A),
                ...Q
            });
            return NB.decorateServiceException(G, A.body)
        }, "de_UnsupportedGrantTypeExceptionRes"),
        GE = B6((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        cY2 = class extends SY2.Command.classBuilder().ep(LP4).m(function(A, B, Q, Z) {
            return [jP4.getSerdePlugin(Q, this.serialize, this.deserialize), SP4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").f(yY2, _Y2).ser(_P4).de(xP4).build() {
            static {
                B6(this, "CreateTokenCommand")
            }
        },
        aP4 = {
            CreateTokenCommand: cY2
        },
        lY2 = class extends PY2 {
            static {
                B6(this, "SSOOIDC")
            }
        };
    PP4.createAggregatedClient(aP4, lY2)
});