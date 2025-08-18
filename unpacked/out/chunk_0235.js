/* chunk:235 bytes:[5081529, 5100864) size:19335 source:unpacked-cli.js */
var B42 = E((z$5, A42) => {
    var {
        defineProperty: gN1,
        getOwnPropertyDescriptor: PC4,
        getOwnPropertyNames: SC4
    } = Object, jC4 = Object.prototype.hasOwnProperty, _6 = (A, B) => gN1(A, "name", {
        value: B,
        configurable: !0
    }), kC4 = (A, B) => {
        for (var Q in B) gN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, yC4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of SC4(B))
                if (!jC4.call(A, D) && D !== Q) gN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = PC4(B, D)) || Z.enumerable
                })
        }
        return A
    }, _C4 = (A) => yC4(gN1({}, "__esModule", {
        value: !0
    }), A), xQ2 = {};
    kC4(xQ2, {
        GetRoleCredentialsCommand: () => oQ2,
        GetRoleCredentialsRequestFilterSensitiveLog: () => gQ2,
        GetRoleCredentialsResponseFilterSensitiveLog: () => mQ2,
        InvalidRequestException: () => vQ2,
        ListAccountRolesCommand: () => V80,
        ListAccountRolesRequestFilterSensitiveLog: () => dQ2,
        ListAccountsCommand: () => C80,
        ListAccountsRequestFilterSensitiveLog: () => cQ2,
        LogoutCommand: () => tQ2,
        LogoutRequestFilterSensitiveLog: () => lQ2,
        ResourceNotFoundException: () => bQ2,
        RoleCredentialsFilterSensitiveLog: () => uQ2,
        SSO: () => eQ2,
        SSOClient: () => mN1,
        SSOServiceException: () => Fr,
        TooManyRequestsException: () => fQ2,
        UnauthorizedException: () => hQ2,
        __Client: () => jB.Client,
        paginateListAccountRoles: () => GK4,
        paginateListAccounts: () => FK4
    });
    A42.exports = _C4(xQ2);
    var PQ2 = K81(),
        xC4 = H81(),
        vC4 = z81(),
        SQ2 = Qr(),
        bC4 = z4(),
        kT = HB(),
        fC4 = hG(),
        T81 = T6(),
        jQ2 = u4(),
        kQ2 = I80(),
        hC4 = _6((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "awsssoportal"
            })
        }, "resolveClientEndpointParameters"),
        uN1 = {
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
        gC4 = qQ2(),
        yQ2 = R81(),
        _Q2 = QX(),
        jB = d4(),
        uC4 = _6((A) => {
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
        mC4 = _6((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        dC4 = _6((A, B) => {
            let Q = Object.assign(yQ2.getAwsRegionExtensionConfiguration(A), jB.getDefaultExtensionConfiguration(A), _Q2.getHttpHandlerExtensionConfiguration(A), uC4(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, yQ2.resolveAwsRegionExtensionConfiguration(Q), jB.resolveDefaultRuntimeConfig(Q), _Q2.resolveHttpHandlerRuntimeConfig(Q), mC4(Q))
        }, "resolveRuntimeExtensions"),
        mN1 = class extends jB.Client {
            static {
                _6(this, "SSOClient")
            }
            config;
            constructor(...[A]) {
                let B = gC4.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = hC4(B),
                    Z = SQ2.resolveUserAgentConfig(Q),
                    D = jQ2.resolveRetryConfig(Z),
                    G = bC4.resolveRegionConfig(D),
                    F = PQ2.resolveHostHeaderConfig(G),
                    I = T81.resolveEndpointConfig(F),
                    Y = kQ2.resolveHttpAuthSchemeConfig(I),
                    W = dC4(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(SQ2.getUserAgentPlugin(this.config)), this.middlewareStack.use(jQ2.getRetryPlugin(this.config)), this.middlewareStack.use(fC4.getContentLengthPlugin(this.config)), this.middlewareStack.use(PQ2.getHostHeaderPlugin(this.config)), this.middlewareStack.use(xC4.getLoggerPlugin(this.config)), this.middlewareStack.use(vC4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(kT.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: kQ2.defaultSSOHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: _6(async (J) => new kT.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(kT.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        dN1 = y3(),
        Fr = class A extends jB.ServiceException {
            static {
                _6(this, "SSOServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        vQ2 = class A extends Fr {
            static {
                _6(this, "InvalidRequestException")
            }
            name = "InvalidRequestException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "InvalidRequestException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        bQ2 = class A extends Fr {
            static {
                _6(this, "ResourceNotFoundException")
            }
            name = "ResourceNotFoundException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ResourceNotFoundException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        fQ2 = class A extends Fr {
            static {
                _6(this, "TooManyRequestsException")
            }
            name = "TooManyRequestsException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "TooManyRequestsException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        hQ2 = class A extends Fr {
            static {
                _6(this, "UnauthorizedException")
            }
            name = "UnauthorizedException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "UnauthorizedException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        gQ2 = _6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: jB.SENSITIVE_STRING
            }
        }), "GetRoleCredentialsRequestFilterSensitiveLog"),
        uQ2 = _6((A) => ({
            ...A,
            ...A.secretAccessKey && {
                secretAccessKey: jB.SENSITIVE_STRING
            },
            ...A.sessionToken && {
                sessionToken: jB.SENSITIVE_STRING
            }
        }), "RoleCredentialsFilterSensitiveLog"),
        mQ2 = _6((A) => ({
            ...A,
            ...A.roleCredentials && {
                roleCredentials: uQ2(A.roleCredentials)
            }
        }), "GetRoleCredentialsResponseFilterSensitiveLog"),
        dQ2 = _6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: jB.SENSITIVE_STRING
            }
        }), "ListAccountRolesRequestFilterSensitiveLog"),
        cQ2 = _6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: jB.SENSITIVE_STRING
            }
        }), "ListAccountsRequestFilterSensitiveLog"),
        lQ2 = _6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: jB.SENSITIVE_STRING
            }
        }), "LogoutRequestFilterSensitiveLog"),
        O81 = HI(),
        cC4 = _6(async (A, B) => {
            let Q = kT.requestBuilder(A, B),
                Z = jB.map({}, jB.isSerializableHeaderValue, {
                    [pN1]: A[lN1]
                });
            Q.bp("/federation/credentials");
            let D = jB.map({
                    [ZK4]: [, jB.expectNonNull(A[QK4], "roleName")],
                    [iQ2]: [, jB.expectNonNull(A[pQ2], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_GetRoleCredentialsCommand"),
        lC4 = _6(async (A, B) => {
            let Q = kT.requestBuilder(A, B),
                Z = jB.map({}, jB.isSerializableHeaderValue, {
                    [pN1]: A[lN1]
                });
            Q.bp("/assignment/roles");
            let D = jB.map({
                    [rQ2]: [, A[sQ2]],
                    [aQ2]: [() => A.maxResults !== void 0, () => A[nQ2].toString()],
                    [iQ2]: [, jB.expectNonNull(A[pQ2], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountRolesCommand"),
        pC4 = _6(async (A, B) => {
            let Q = kT.requestBuilder(A, B),
                Z = jB.map({}, jB.isSerializableHeaderValue, {
                    [pN1]: A[lN1]
                });
            Q.bp("/assignment/accounts");
            let D = jB.map({
                    [rQ2]: [, A[sQ2]],
                    [aQ2]: [() => A.maxResults !== void 0, () => A[nQ2].toString()]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountsCommand"),
        iC4 = _6(async (A, B) => {
            let Q = kT.requestBuilder(A, B),
                Z = jB.map({}, jB.isSerializableHeaderValue, {
                    [pN1]: A[lN1]
                });
            Q.bp("/logout");
            let D;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_LogoutCommand"),
        nC4 = _6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return cN1(A, B);
            let Q = jB.map({
                    $metadata: W_(A)
                }),
                Z = jB.expectNonNull(jB.expectObject(await O81.parseJsonBody(A.body, B)), "body"),
                D = jB.take(Z, {
                    roleCredentials: jB._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetRoleCredentialsCommand"),
        aC4 = _6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return cN1(A, B);
            let Q = jB.map({
                    $metadata: W_(A)
                }),
                Z = jB.expectNonNull(jB.expectObject(await O81.parseJsonBody(A.body, B)), "body"),
                D = jB.take(Z, {
                    nextToken: jB.expectString,
                    roleList: jB._json
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountRolesCommand"),
        sC4 = _6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return cN1(A, B);
            let Q = jB.map({
                    $metadata: W_(A)
                }),
                Z = jB.expectNonNull(jB.expectObject(await O81.parseJsonBody(A.body, B)), "body"),
                D = jB.take(Z, {
                    accountList: jB._json,
                    nextToken: jB.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountsCommand"),
        rC4 = _6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return cN1(A, B);
            let Q = jB.map({
                $metadata: W_(A)
            });
            return await jB.collectBody(A.body, B), Q
        }, "de_LogoutCommand"),
        cN1 = _6(async (A, B) => {
            let Q = {
                    ...A,
                    body: await O81.parseJsonErrorBody(A.body, B)
                },
                Z = O81.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "InvalidRequestException":
                case "com.amazonaws.sso#InvalidRequestException":
                    throw await tC4(Q, B);
                case "ResourceNotFoundException":
                case "com.amazonaws.sso#ResourceNotFoundException":
                    throw await eC4(Q, B);
                case "TooManyRequestsException":
                case "com.amazonaws.sso#TooManyRequestsException":
                    throw await AK4(Q, B);
                case "UnauthorizedException":
                case "com.amazonaws.sso#UnauthorizedException":
                    throw await BK4(Q, B);
                default:
                    let D = Q.body;
                    return oC4({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        oC4 = jB.withBaseException(Fr),
        tC4 = _6(async (A, B) => {
            let Q = jB.map({}),
                Z = A.body,
                D = jB.take(Z, {
                    message: jB.expectString
                });
            Object.assign(Q, D);
            let G = new vQ2({
                $metadata: W_(A),
                ...Q
            });
            return jB.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        eC4 = _6(async (A, B) => {
            let Q = jB.map({}),
                Z = A.body,
                D = jB.take(Z, {
                    message: jB.expectString
                });
            Object.assign(Q, D);
            let G = new bQ2({
                $metadata: W_(A),
                ...Q
            });
            return jB.decorateServiceException(G, A.body)
        }, "de_ResourceNotFoundExceptionRes"),
        AK4 = _6(async (A, B) => {
            let Q = jB.map({}),
                Z = A.body,
                D = jB.take(Z, {
                    message: jB.expectString
                });
            Object.assign(Q, D);
            let G = new fQ2({
                $metadata: W_(A),
                ...Q
            });
            return jB.decorateServiceException(G, A.body)
        }, "de_TooManyRequestsExceptionRes"),
        BK4 = _6(async (A, B) => {
            let Q = jB.map({}),
                Z = A.body,
                D = jB.take(Z, {
                    message: jB.expectString
                });
            Object.assign(Q, D);
            let G = new hQ2({
                $metadata: W_(A),
                ...Q
            });
            return jB.decorateServiceException(G, A.body)
        }, "de_UnauthorizedExceptionRes"),
        W_ = _6((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        pQ2 = "accountId",
        lN1 = "accessToken",
        iQ2 = "account_id",
        nQ2 = "maxResults",
        aQ2 = "max_result",
        sQ2 = "nextToken",
        rQ2 = "next_token",
        QK4 = "roleName",
        ZK4 = "role_name",
        pN1 = "x-amz-sso_bearer_token",
        oQ2 = class extends jB.Command.classBuilder().ep(uN1).m(function(A, B, Q, Z) {
            return [dN1.getSerdePlugin(Q, this.serialize, this.deserialize), T81.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").f(gQ2, mQ2).ser(cC4).de(nC4).build() {
            static {
                _6(this, "GetRoleCredentialsCommand")
            }
        },
        V80 = class extends jB.Command.classBuilder().ep(uN1).m(function(A, B, Q, Z) {
            return [dN1.getSerdePlugin(Q, this.serialize, this.deserialize), T81.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccountRoles", {}).n("SSOClient", "ListAccountRolesCommand").f(dQ2, void 0).ser(lC4).de(aC4).build() {
            static {
                _6(this, "ListAccountRolesCommand")
            }
        },
        C80 = class extends jB.Command.classBuilder().ep(uN1).m(function(A, B, Q, Z) {
            return [dN1.getSerdePlugin(Q, this.serialize, this.deserialize), T81.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccounts", {}).n("SSOClient", "ListAccountsCommand").f(cQ2, void 0).ser(pC4).de(sC4).build() {
            static {
                _6(this, "ListAccountsCommand")
            }
        },
        tQ2 = class extends jB.Command.classBuilder().ep(uN1).m(function(A, B, Q, Z) {
            return [dN1.getSerdePlugin(Q, this.serialize, this.deserialize), T81.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "Logout", {}).n("SSOClient", "LogoutCommand").f(lQ2, void 0).ser(iC4).de(rC4).build() {
            static {
                _6(this, "LogoutCommand")
            }
        },
        DK4 = {
            GetRoleCredentialsCommand: oQ2,
            ListAccountRolesCommand: V80,
            ListAccountsCommand: C80,
            LogoutCommand: tQ2
        },
        eQ2 = class extends mN1 {
            static {
                _6(this, "SSO")
            }
        };
    jB.createAggregatedClient(DK4, eQ2);
    var GK4 = kT.createPaginator(mN1, V80, "nextToken", "nextToken", "maxResults"),
        FK4 = kT.createPaginator(mN1, C80, "nextToken", "nextToken", "maxResults")
});