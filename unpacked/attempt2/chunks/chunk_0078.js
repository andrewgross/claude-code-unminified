/* chunk:78 bytes:[1797831, 1817166) size:19335 source:unpacked-cli.js */
var NZA = E((nA5, qZA) => {
    var {
        defineProperty: RH1,
        getOwnPropertyDescriptor: KBQ,
        getOwnPropertyNames: HBQ
    } = Object, zBQ = Object.prototype.hasOwnProperty, P6 = (A, B) => RH1(A, "name", {
        value: B,
        configurable: !0
    }), EBQ = (A, B) => {
        for (var Q in B) RH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, UBQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of HBQ(B))
                if (!zBQ.call(A, D) && D !== Q) RH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = KBQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, wBQ = (A) => UBQ(RH1({}, "__esModule", {
        value: !0
    }), A), BZA = {};
    EBQ(BZA, {
        GetRoleCredentialsCommand: () => UZA,
        GetRoleCredentialsRequestFilterSensitiveLog: () => FZA,
        GetRoleCredentialsResponseFilterSensitiveLog: () => YZA,
        InvalidRequestException: () => QZA,
        ListAccountRolesCommand: () => ss1,
        ListAccountRolesRequestFilterSensitiveLog: () => WZA,
        ListAccountsCommand: () => rs1,
        ListAccountsRequestFilterSensitiveLog: () => JZA,
        LogoutCommand: () => wZA,
        LogoutRequestFilterSensitiveLog: () => XZA,
        ResourceNotFoundException: () => ZZA,
        RoleCredentialsFilterSensitiveLog: () => IZA,
        SSO: () => $ZA,
        SSOClient: () => TH1,
        SSOServiceException: () => Wi,
        TooManyRequestsException: () => DZA,
        UnauthorizedException: () => GZA,
        __Client: () => RB.Client,
        paginateListAccountRoles: () => pBQ,
        paginateListAccounts: () => iBQ
    });
    qZA.exports = wBQ(BZA);
    var s7A = W91(),
        $BQ = J91(),
        qBQ = X91(),
        r7A = Bi(),
        NBQ = z4(),
        bO = HB(),
        LBQ = hG(),
        c91 = T6(),
        o7A = u4(),
        t7A = ms1(),
        MBQ = P6((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "awsssoportal"
            })
        }, "resolveClientEndpointParameters"),
        OH1 = {
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
        RBQ = d7A(),
        e7A = m91(),
        AZA = CV(),
        RB = V6(),
        OBQ = P6((A) => {
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
        TBQ = P6((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        PBQ = P6((A, B) => {
            let Q = Object.assign(e7A.getAwsRegionExtensionConfiguration(A), RB.getDefaultExtensionConfiguration(A), AZA.getHttpHandlerExtensionConfiguration(A), OBQ(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, e7A.resolveAwsRegionExtensionConfiguration(Q), RB.resolveDefaultRuntimeConfig(Q), AZA.resolveHttpHandlerRuntimeConfig(Q), TBQ(Q))
        }, "resolveRuntimeExtensions"),
        TH1 = class extends RB.Client {
            static {
                P6(this, "SSOClient")
            }
            config;
            constructor(...[A]) {
                let B = RBQ.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = MBQ(B),
                    Z = r7A.resolveUserAgentConfig(Q),
                    D = o7A.resolveRetryConfig(Z),
                    G = NBQ.resolveRegionConfig(D),
                    F = s7A.resolveHostHeaderConfig(G),
                    I = c91.resolveEndpointConfig(F),
                    Y = t7A.resolveHttpAuthSchemeConfig(I),
                    W = PBQ(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(r7A.getUserAgentPlugin(this.config)), this.middlewareStack.use(o7A.getRetryPlugin(this.config)), this.middlewareStack.use(LBQ.getContentLengthPlugin(this.config)), this.middlewareStack.use(s7A.getHostHeaderPlugin(this.config)), this.middlewareStack.use($BQ.getLoggerPlugin(this.config)), this.middlewareStack.use(qBQ.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(bO.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: t7A.defaultSSOHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: P6(async (J) => new bO.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(bO.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        PH1 = y3(),
        Wi = class A extends RB.ServiceException {
            static {
                P6(this, "SSOServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        QZA = class A extends Wi {
            static {
                P6(this, "InvalidRequestException")
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
        ZZA = class A extends Wi {
            static {
                P6(this, "ResourceNotFoundException")
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
        DZA = class A extends Wi {
            static {
                P6(this, "TooManyRequestsException")
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
        GZA = class A extends Wi {
            static {
                P6(this, "UnauthorizedException")
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
        FZA = P6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: RB.SENSITIVE_STRING
            }
        }), "GetRoleCredentialsRequestFilterSensitiveLog"),
        IZA = P6((A) => ({
            ...A,
            ...A.secretAccessKey && {
                secretAccessKey: RB.SENSITIVE_STRING
            },
            ...A.sessionToken && {
                sessionToken: RB.SENSITIVE_STRING
            }
        }), "RoleCredentialsFilterSensitiveLog"),
        YZA = P6((A) => ({
            ...A,
            ...A.roleCredentials && {
                roleCredentials: IZA(A.roleCredentials)
            }
        }), "GetRoleCredentialsResponseFilterSensitiveLog"),
        WZA = P6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: RB.SENSITIVE_STRING
            }
        }), "ListAccountRolesRequestFilterSensitiveLog"),
        JZA = P6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: RB.SENSITIVE_STRING
            }
        }), "ListAccountsRequestFilterSensitiveLog"),
        XZA = P6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: RB.SENSITIVE_STRING
            }
        }), "LogoutRequestFilterSensitiveLog"),
        d91 = YI(),
        SBQ = P6(async (A, B) => {
            let Q = bO.requestBuilder(A, B),
                Z = RB.map({}, RB.isSerializableHeaderValue, {
                    [kH1]: A[jH1]
                });
            Q.bp("/federation/credentials");
            let D = RB.map({
                    [cBQ]: [, RB.expectNonNull(A[dBQ], "roleName")],
                    [CZA]: [, RB.expectNonNull(A[VZA], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_GetRoleCredentialsCommand"),
        jBQ = P6(async (A, B) => {
            let Q = bO.requestBuilder(A, B),
                Z = RB.map({}, RB.isSerializableHeaderValue, {
                    [kH1]: A[jH1]
                });
            Q.bp("/assignment/roles");
            let D = RB.map({
                    [EZA]: [, A[zZA]],
                    [HZA]: [() => A.maxResults !== void 0, () => A[KZA].toString()],
                    [CZA]: [, RB.expectNonNull(A[VZA], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountRolesCommand"),
        kBQ = P6(async (A, B) => {
            let Q = bO.requestBuilder(A, B),
                Z = RB.map({}, RB.isSerializableHeaderValue, {
                    [kH1]: A[jH1]
                });
            Q.bp("/assignment/accounts");
            let D = RB.map({
                    [EZA]: [, A[zZA]],
                    [HZA]: [() => A.maxResults !== void 0, () => A[KZA].toString()]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountsCommand"),
        yBQ = P6(async (A, B) => {
            let Q = bO.requestBuilder(A, B),
                Z = RB.map({}, RB.isSerializableHeaderValue, {
                    [kH1]: A[jH1]
                });
            Q.bp("/logout");
            let D;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_LogoutCommand"),
        _BQ = P6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return SH1(A, B);
            let Q = RB.map({
                    $metadata: jk(A)
                }),
                Z = RB.expectNonNull(RB.expectObject(await d91.parseJsonBody(A.body, B)), "body"),
                D = RB.take(Z, {
                    roleCredentials: RB._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetRoleCredentialsCommand"),
        xBQ = P6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return SH1(A, B);
            let Q = RB.map({
                    $metadata: jk(A)
                }),
                Z = RB.expectNonNull(RB.expectObject(await d91.parseJsonBody(A.body, B)), "body"),
                D = RB.take(Z, {
                    nextToken: RB.expectString,
                    roleList: RB._json
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountRolesCommand"),
        vBQ = P6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return SH1(A, B);
            let Q = RB.map({
                    $metadata: jk(A)
                }),
                Z = RB.expectNonNull(RB.expectObject(await d91.parseJsonBody(A.body, B)), "body"),
                D = RB.take(Z, {
                    accountList: RB._json,
                    nextToken: RB.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountsCommand"),
        bBQ = P6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return SH1(A, B);
            let Q = RB.map({
                $metadata: jk(A)
            });
            return await RB.collectBody(A.body, B), Q
        }, "de_LogoutCommand"),
        SH1 = P6(async (A, B) => {
            let Q = {
                    ...A,
                    body: await d91.parseJsonErrorBody(A.body, B)
                },
                Z = d91.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "InvalidRequestException":
                case "com.amazonaws.sso#InvalidRequestException":
                    throw await hBQ(Q, B);
                case "ResourceNotFoundException":
                case "com.amazonaws.sso#ResourceNotFoundException":
                    throw await gBQ(Q, B);
                case "TooManyRequestsException":
                case "com.amazonaws.sso#TooManyRequestsException":
                    throw await uBQ(Q, B);
                case "UnauthorizedException":
                case "com.amazonaws.sso#UnauthorizedException":
                    throw await mBQ(Q, B);
                default:
                    let D = Q.body;
                    return fBQ({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        fBQ = RB.withBaseException(Wi),
        hBQ = P6(async (A, B) => {
            let Q = RB.map({}),
                Z = A.body,
                D = RB.take(Z, {
                    message: RB.expectString
                });
            Object.assign(Q, D);
            let G = new QZA({
                $metadata: jk(A),
                ...Q
            });
            return RB.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        gBQ = P6(async (A, B) => {
            let Q = RB.map({}),
                Z = A.body,
                D = RB.take(Z, {
                    message: RB.expectString
                });
            Object.assign(Q, D);
            let G = new ZZA({
                $metadata: jk(A),
                ...Q
            });
            return RB.decorateServiceException(G, A.body)
        }, "de_ResourceNotFoundExceptionRes"),
        uBQ = P6(async (A, B) => {
            let Q = RB.map({}),
                Z = A.body,
                D = RB.take(Z, {
                    message: RB.expectString
                });
            Object.assign(Q, D);
            let G = new DZA({
                $metadata: jk(A),
                ...Q
            });
            return RB.decorateServiceException(G, A.body)
        }, "de_TooManyRequestsExceptionRes"),
        mBQ = P6(async (A, B) => {
            let Q = RB.map({}),
                Z = A.body,
                D = RB.take(Z, {
                    message: RB.expectString
                });
            Object.assign(Q, D);
            let G = new GZA({
                $metadata: jk(A),
                ...Q
            });
            return RB.decorateServiceException(G, A.body)
        }, "de_UnauthorizedExceptionRes"),
        jk = P6((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        VZA = "accountId",
        jH1 = "accessToken",
        CZA = "account_id",
        KZA = "maxResults",
        HZA = "max_result",
        zZA = "nextToken",
        EZA = "next_token",
        dBQ = "roleName",
        cBQ = "role_name",
        kH1 = "x-amz-sso_bearer_token",
        UZA = class extends RB.Command.classBuilder().ep(OH1).m(function(A, B, Q, Z) {
            return [PH1.getSerdePlugin(Q, this.serialize, this.deserialize), c91.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").f(FZA, YZA).ser(SBQ).de(_BQ).build() {
            static {
                P6(this, "GetRoleCredentialsCommand")
            }
        },
        ss1 = class extends RB.Command.classBuilder().ep(OH1).m(function(A, B, Q, Z) {
            return [PH1.getSerdePlugin(Q, this.serialize, this.deserialize), c91.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccountRoles", {}).n("SSOClient", "ListAccountRolesCommand").f(WZA, void 0).ser(jBQ).de(xBQ).build() {
            static {
                P6(this, "ListAccountRolesCommand")
            }
        },
        rs1 = class extends RB.Command.classBuilder().ep(OH1).m(function(A, B, Q, Z) {
            return [PH1.getSerdePlugin(Q, this.serialize, this.deserialize), c91.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccounts", {}).n("SSOClient", "ListAccountsCommand").f(JZA, void 0).ser(kBQ).de(vBQ).build() {
            static {
                P6(this, "ListAccountsCommand")
            }
        },
        wZA = class extends RB.Command.classBuilder().ep(OH1).m(function(A, B, Q, Z) {
            return [PH1.getSerdePlugin(Q, this.serialize, this.deserialize), c91.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "Logout", {}).n("SSOClient", "LogoutCommand").f(XZA, void 0).ser(yBQ).de(bBQ).build() {
            static {
                P6(this, "LogoutCommand")
            }
        },
        lBQ = {
            GetRoleCredentialsCommand: UZA,
            ListAccountRolesCommand: ss1,
            ListAccountsCommand: rs1,
            LogoutCommand: wZA
        },
        $ZA = class extends TH1 {
            static {
                P6(this, "SSO")
            }
        };
    RB.createAggregatedClient(lBQ, $ZA);
    var pBQ = bO.createPaginator(TH1, ss1, "nextToken", "nextToken", "maxResults"),
        iBQ = bO.createPaginator(TH1, rs1, "nextToken", "nextToken", "maxResults")
});