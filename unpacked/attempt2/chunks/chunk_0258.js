/* chunk:258 bytes:[5533624, 5552959) size:19335 source:unpacked-cli.js */
var hI2 = E((yN5, fI2) => {
    var {
        defineProperty: pL1,
        getOwnPropertyDescriptor: BT4,
        getOwnPropertyNames: QT4
    } = Object, ZT4 = Object.prototype.hasOwnProperty, x6 = (A, B) => pL1(A, "name", {
        value: B,
        configurable: !0
    }), DT4 = (A, B) => {
        for (var Q in B) pL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, GT4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of QT4(B))
                if (!ZT4.call(A, D) && D !== Q) pL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = BT4(B, D)) || Z.enumerable
                })
        }
        return A
    }, FT4 = (A) => GT4(pL1({}, "__esModule", {
        value: !0
    }), A), EI2 = {};
    DT4(EI2, {
        GetRoleCredentialsCommand: () => xI2,
        GetRoleCredentialsRequestFilterSensitiveLog: () => NI2,
        GetRoleCredentialsResponseFilterSensitiveLog: () => MI2,
        InvalidRequestException: () => UI2,
        ListAccountRolesCommand: () => X70,
        ListAccountRolesRequestFilterSensitiveLog: () => RI2,
        ListAccountsCommand: () => V70,
        ListAccountsRequestFilterSensitiveLog: () => OI2,
        LogoutCommand: () => vI2,
        LogoutRequestFilterSensitiveLog: () => TI2,
        ResourceNotFoundException: () => wI2,
        RoleCredentialsFilterSensitiveLog: () => LI2,
        SSO: () => bI2,
        SSOClient: () => nL1,
        SSOServiceException: () => dr,
        TooManyRequestsException: () => $I2,
        UnauthorizedException: () => qI2,
        __Client: () => kB.Client,
        paginateListAccountRoles: () => yT4,
        paginateListAccounts: () => _T4
    });
    fI2.exports = FT4(EI2);
    var XI2 = f81(),
        IT4 = h81(),
        YT4 = g81(),
        VI2 = hr(),
        WT4 = z4(),
        oT = HB(),
        JT4 = hG(),
        s81 = T6(),
        CI2 = u4(),
        KI2 = F70(),
        XT4 = x6((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "awsssoportal"
            })
        }, "resolveClientEndpointParameters"),
        iL1 = {
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
        VT4 = DI2(),
        HI2 = n81(),
        zI2 = vV(),
        kB = H6(),
        CT4 = x6((A) => {
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
        KT4 = x6((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        HT4 = x6((A, B) => {
            let Q = Object.assign(HI2.getAwsRegionExtensionConfiguration(A), kB.getDefaultExtensionConfiguration(A), zI2.getHttpHandlerExtensionConfiguration(A), CT4(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, HI2.resolveAwsRegionExtensionConfiguration(Q), kB.resolveDefaultRuntimeConfig(Q), zI2.resolveHttpHandlerRuntimeConfig(Q), KT4(Q))
        }, "resolveRuntimeExtensions"),
        nL1 = class extends kB.Client {
            static {
                x6(this, "SSOClient")
            }
            config;
            constructor(...[A]) {
                let B = VT4.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = XT4(B),
                    Z = VI2.resolveUserAgentConfig(Q),
                    D = CI2.resolveRetryConfig(Z),
                    G = WT4.resolveRegionConfig(D),
                    F = XI2.resolveHostHeaderConfig(G),
                    I = s81.resolveEndpointConfig(F),
                    Y = KI2.resolveHttpAuthSchemeConfig(I),
                    W = HT4(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(VI2.getUserAgentPlugin(this.config)), this.middlewareStack.use(CI2.getRetryPlugin(this.config)), this.middlewareStack.use(JT4.getContentLengthPlugin(this.config)), this.middlewareStack.use(XI2.getHostHeaderPlugin(this.config)), this.middlewareStack.use(IT4.getLoggerPlugin(this.config)), this.middlewareStack.use(YT4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(oT.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: KI2.defaultSSOHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: x6(async (J) => new oT.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(oT.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        aL1 = y3(),
        dr = class A extends kB.ServiceException {
            static {
                x6(this, "SSOServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        UI2 = class A extends dr {
            static {
                x6(this, "InvalidRequestException")
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
        wI2 = class A extends dr {
            static {
                x6(this, "ResourceNotFoundException")
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
        $I2 = class A extends dr {
            static {
                x6(this, "TooManyRequestsException")
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
        qI2 = class A extends dr {
            static {
                x6(this, "UnauthorizedException")
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
        NI2 = x6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: kB.SENSITIVE_STRING
            }
        }), "GetRoleCredentialsRequestFilterSensitiveLog"),
        LI2 = x6((A) => ({
            ...A,
            ...A.secretAccessKey && {
                secretAccessKey: kB.SENSITIVE_STRING
            },
            ...A.sessionToken && {
                sessionToken: kB.SENSITIVE_STRING
            }
        }), "RoleCredentialsFilterSensitiveLog"),
        MI2 = x6((A) => ({
            ...A,
            ...A.roleCredentials && {
                roleCredentials: LI2(A.roleCredentials)
            }
        }), "GetRoleCredentialsResponseFilterSensitiveLog"),
        RI2 = x6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: kB.SENSITIVE_STRING
            }
        }), "ListAccountRolesRequestFilterSensitiveLog"),
        OI2 = x6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: kB.SENSITIVE_STRING
            }
        }), "ListAccountsRequestFilterSensitiveLog"),
        TI2 = x6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: kB.SENSITIVE_STRING
            }
        }), "LogoutRequestFilterSensitiveLog"),
        a81 = UI(),
        zT4 = x6(async (A, B) => {
            let Q = oT.requestBuilder(A, B),
                Z = kB.map({}, kB.isSerializableHeaderValue, {
                    [oL1]: A[rL1]
                });
            Q.bp("/federation/credentials");
            let D = kB.map({
                    [jT4]: [, kB.expectNonNull(A[ST4], "roleName")],
                    [SI2]: [, kB.expectNonNull(A[PI2], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_GetRoleCredentialsCommand"),
        ET4 = x6(async (A, B) => {
            let Q = oT.requestBuilder(A, B),
                Z = kB.map({}, kB.isSerializableHeaderValue, {
                    [oL1]: A[rL1]
                });
            Q.bp("/assignment/roles");
            let D = kB.map({
                    [_I2]: [, A[yI2]],
                    [kI2]: [() => A.maxResults !== void 0, () => A[jI2].toString()],
                    [SI2]: [, kB.expectNonNull(A[PI2], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountRolesCommand"),
        UT4 = x6(async (A, B) => {
            let Q = oT.requestBuilder(A, B),
                Z = kB.map({}, kB.isSerializableHeaderValue, {
                    [oL1]: A[rL1]
                });
            Q.bp("/assignment/accounts");
            let D = kB.map({
                    [_I2]: [, A[yI2]],
                    [kI2]: [() => A.maxResults !== void 0, () => A[jI2].toString()]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountsCommand"),
        wT4 = x6(async (A, B) => {
            let Q = oT.requestBuilder(A, B),
                Z = kB.map({}, kB.isSerializableHeaderValue, {
                    [oL1]: A[rL1]
                });
            Q.bp("/logout");
            let D;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_LogoutCommand"),
        $T4 = x6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return sL1(A, B);
            let Q = kB.map({
                    $metadata: $_(A)
                }),
                Z = kB.expectNonNull(kB.expectObject(await a81.parseJsonBody(A.body, B)), "body"),
                D = kB.take(Z, {
                    roleCredentials: kB._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetRoleCredentialsCommand"),
        qT4 = x6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return sL1(A, B);
            let Q = kB.map({
                    $metadata: $_(A)
                }),
                Z = kB.expectNonNull(kB.expectObject(await a81.parseJsonBody(A.body, B)), "body"),
                D = kB.take(Z, {
                    nextToken: kB.expectString,
                    roleList: kB._json
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountRolesCommand"),
        NT4 = x6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return sL1(A, B);
            let Q = kB.map({
                    $metadata: $_(A)
                }),
                Z = kB.expectNonNull(kB.expectObject(await a81.parseJsonBody(A.body, B)), "body"),
                D = kB.take(Z, {
                    accountList: kB._json,
                    nextToken: kB.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountsCommand"),
        LT4 = x6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return sL1(A, B);
            let Q = kB.map({
                $metadata: $_(A)
            });
            return await kB.collectBody(A.body, B), Q
        }, "de_LogoutCommand"),
        sL1 = x6(async (A, B) => {
            let Q = {
                    ...A,
                    body: await a81.parseJsonErrorBody(A.body, B)
                },
                Z = a81.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "InvalidRequestException":
                case "com.amazonaws.sso#InvalidRequestException":
                    throw await RT4(Q, B);
                case "ResourceNotFoundException":
                case "com.amazonaws.sso#ResourceNotFoundException":
                    throw await OT4(Q, B);
                case "TooManyRequestsException":
                case "com.amazonaws.sso#TooManyRequestsException":
                    throw await TT4(Q, B);
                case "UnauthorizedException":
                case "com.amazonaws.sso#UnauthorizedException":
                    throw await PT4(Q, B);
                default:
                    let D = Q.body;
                    return MT4({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        MT4 = kB.withBaseException(dr),
        RT4 = x6(async (A, B) => {
            let Q = kB.map({}),
                Z = A.body,
                D = kB.take(Z, {
                    message: kB.expectString
                });
            Object.assign(Q, D);
            let G = new UI2({
                $metadata: $_(A),
                ...Q
            });
            return kB.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        OT4 = x6(async (A, B) => {
            let Q = kB.map({}),
                Z = A.body,
                D = kB.take(Z, {
                    message: kB.expectString
                });
            Object.assign(Q, D);
            let G = new wI2({
                $metadata: $_(A),
                ...Q
            });
            return kB.decorateServiceException(G, A.body)
        }, "de_ResourceNotFoundExceptionRes"),
        TT4 = x6(async (A, B) => {
            let Q = kB.map({}),
                Z = A.body,
                D = kB.take(Z, {
                    message: kB.expectString
                });
            Object.assign(Q, D);
            let G = new $I2({
                $metadata: $_(A),
                ...Q
            });
            return kB.decorateServiceException(G, A.body)
        }, "de_TooManyRequestsExceptionRes"),
        PT4 = x6(async (A, B) => {
            let Q = kB.map({}),
                Z = A.body,
                D = kB.take(Z, {
                    message: kB.expectString
                });
            Object.assign(Q, D);
            let G = new qI2({
                $metadata: $_(A),
                ...Q
            });
            return kB.decorateServiceException(G, A.body)
        }, "de_UnauthorizedExceptionRes"),
        $_ = x6((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        PI2 = "accountId",
        rL1 = "accessToken",
        SI2 = "account_id",
        jI2 = "maxResults",
        kI2 = "max_result",
        yI2 = "nextToken",
        _I2 = "next_token",
        ST4 = "roleName",
        jT4 = "role_name",
        oL1 = "x-amz-sso_bearer_token",
        xI2 = class extends kB.Command.classBuilder().ep(iL1).m(function(A, B, Q, Z) {
            return [aL1.getSerdePlugin(Q, this.serialize, this.deserialize), s81.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").f(NI2, MI2).ser(zT4).de($T4).build() {
            static {
                x6(this, "GetRoleCredentialsCommand")
            }
        },
        X70 = class extends kB.Command.classBuilder().ep(iL1).m(function(A, B, Q, Z) {
            return [aL1.getSerdePlugin(Q, this.serialize, this.deserialize), s81.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccountRoles", {}).n("SSOClient", "ListAccountRolesCommand").f(RI2, void 0).ser(ET4).de(qT4).build() {
            static {
                x6(this, "ListAccountRolesCommand")
            }
        },
        V70 = class extends kB.Command.classBuilder().ep(iL1).m(function(A, B, Q, Z) {
            return [aL1.getSerdePlugin(Q, this.serialize, this.deserialize), s81.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccounts", {}).n("SSOClient", "ListAccountsCommand").f(OI2, void 0).ser(UT4).de(NT4).build() {
            static {
                x6(this, "ListAccountsCommand")
            }
        },
        vI2 = class extends kB.Command.classBuilder().ep(iL1).m(function(A, B, Q, Z) {
            return [aL1.getSerdePlugin(Q, this.serialize, this.deserialize), s81.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "Logout", {}).n("SSOClient", "LogoutCommand").f(TI2, void 0).ser(wT4).de(LT4).build() {
            static {
                x6(this, "LogoutCommand")
            }
        },
        kT4 = {
            GetRoleCredentialsCommand: xI2,
            ListAccountRolesCommand: X70,
            ListAccountsCommand: V70,
            LogoutCommand: vI2
        },
        bI2 = class extends nL1 {
            static {
                x6(this, "SSO")
            }
        };
    kB.createAggregatedClient(kT4, bI2);
    var yT4 = oT.createPaginator(nL1, X70, "nextToken", "nextToken", "maxResults"),
        _T4 = oT.createPaginator(nL1, V70, "nextToken", "nextToken", "maxResults")
});