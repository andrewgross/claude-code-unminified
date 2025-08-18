/* chunk:107 bytes:[2512905, 2532242) size:19337 source:unpacked-cli.js */
var uUA = E((PQ5, gUA) => {
    var {
        defineProperty: JE1,
        getOwnPropertyDescriptor: LzQ,
        getOwnPropertyNames: MzQ
    } = Object, RzQ = Object.prototype.hasOwnProperty, S6 = (A, B) => JE1(A, "name", {
        value: B,
        configurable: !0
    }), OzQ = (A, B) => {
        for (var Q in B) JE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, TzQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of MzQ(B))
                if (!RzQ.call(A, D) && D !== Q) JE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = LzQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, PzQ = (A) => TzQ(JE1({}, "__esModule", {
        value: !0
    }), A), wUA = {};
    OzQ(wUA, {
        GetRoleCredentialsCommand: () => bUA,
        GetRoleCredentialsRequestFilterSensitiveLog: () => MUA,
        GetRoleCredentialsResponseFilterSensitiveLog: () => OUA,
        InvalidRequestException: () => $UA,
        ListAccountRolesCommand: () => Ce1,
        ListAccountRolesRequestFilterSensitiveLog: () => TUA,
        ListAccountsCommand: () => Ke1,
        ListAccountsRequestFilterSensitiveLog: () => PUA,
        LogoutCommand: () => fUA,
        LogoutRequestFilterSensitiveLog: () => SUA,
        ResourceNotFoundException: () => qUA,
        RoleCredentialsFilterSensitiveLog: () => RUA,
        SSO: () => hUA,
        SSOClient: () => VE1,
        SSOServiceException: () => ii,
        TooManyRequestsException: () => NUA,
        UnauthorizedException: () => LUA,
        __Client: () => SB.Client,
        paginateListAccountRoles: () => AEQ,
        paginateListAccounts: () => BEQ
    });
    gUA.exports = PzQ(wUA);
    var CUA = GQ1(),
        SzQ = FQ1(),
        jzQ = IQ1(),
        KUA = fi(),
        kzQ = z4(),
        lO = HB(),
        yzQ = hG(),
        MQ1 = T6(),
        HUA = u4(),
        zUA = it1(),
        _zQ = S6((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "awsssoportal"
            })
        }, "resolveClientEndpointParameters"),
        XE1 = {
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
        xzQ = AUA(),
        EUA = NQ1(),
        UUA = VUA(),
        SB = $Q1(),
        vzQ = S6((A) => {
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
        bzQ = S6((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        fzQ = S6((A, B) => {
            let Q = Object.assign(EUA.getAwsRegionExtensionConfiguration(A), SB.getDefaultExtensionConfiguration(A), UUA.getHttpHandlerExtensionConfiguration(A), vzQ(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, EUA.resolveAwsRegionExtensionConfiguration(Q), SB.resolveDefaultRuntimeConfig(Q), UUA.resolveHttpHandlerRuntimeConfig(Q), bzQ(Q))
        }, "resolveRuntimeExtensions"),
        VE1 = class extends SB.Client {
            static {
                S6(this, "SSOClient")
            }
            config;
            constructor(...[A]) {
                let B = xzQ.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = _zQ(B),
                    Z = KUA.resolveUserAgentConfig(Q),
                    D = HUA.resolveRetryConfig(Z),
                    G = kzQ.resolveRegionConfig(D),
                    F = CUA.resolveHostHeaderConfig(G),
                    I = MQ1.resolveEndpointConfig(F),
                    Y = zUA.resolveHttpAuthSchemeConfig(I),
                    W = fzQ(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(KUA.getUserAgentPlugin(this.config)), this.middlewareStack.use(HUA.getRetryPlugin(this.config)), this.middlewareStack.use(yzQ.getContentLengthPlugin(this.config)), this.middlewareStack.use(CUA.getHostHeaderPlugin(this.config)), this.middlewareStack.use(SzQ.getLoggerPlugin(this.config)), this.middlewareStack.use(jzQ.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(lO.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: zUA.defaultSSOHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: S6(async (J) => new lO.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(lO.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        CE1 = y3(),
        ii = class A extends SB.ServiceException {
            static {
                S6(this, "SSOServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        $UA = class A extends ii {
            static {
                S6(this, "InvalidRequestException")
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
        qUA = class A extends ii {
            static {
                S6(this, "ResourceNotFoundException")
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
        NUA = class A extends ii {
            static {
                S6(this, "TooManyRequestsException")
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
        LUA = class A extends ii {
            static {
                S6(this, "UnauthorizedException")
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
        MUA = S6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: SB.SENSITIVE_STRING
            }
        }), "GetRoleCredentialsRequestFilterSensitiveLog"),
        RUA = S6((A) => ({
            ...A,
            ...A.secretAccessKey && {
                secretAccessKey: SB.SENSITIVE_STRING
            },
            ...A.sessionToken && {
                sessionToken: SB.SENSITIVE_STRING
            }
        }), "RoleCredentialsFilterSensitiveLog"),
        OUA = S6((A) => ({
            ...A,
            ...A.roleCredentials && {
                roleCredentials: RUA(A.roleCredentials)
            }
        }), "GetRoleCredentialsResponseFilterSensitiveLog"),
        TUA = S6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: SB.SENSITIVE_STRING
            }
        }), "ListAccountRolesRequestFilterSensitiveLog"),
        PUA = S6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: SB.SENSITIVE_STRING
            }
        }), "ListAccountsRequestFilterSensitiveLog"),
        SUA = S6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: SB.SENSITIVE_STRING
            }
        }), "LogoutRequestFilterSensitiveLog"),
        LQ1 = WI(),
        hzQ = S6(async (A, B) => {
            let Q = lO.requestBuilder(A, B),
                Z = SB.map({}, SB.isSerializableHeaderValue, {
                    [zE1]: A[HE1]
                });
            Q.bp("/federation/credentials");
            let D = SB.map({
                    [tzQ]: [, SB.expectNonNull(A[ozQ], "roleName")],
                    [kUA]: [, SB.expectNonNull(A[jUA], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_GetRoleCredentialsCommand"),
        gzQ = S6(async (A, B) => {
            let Q = lO.requestBuilder(A, B),
                Z = SB.map({}, SB.isSerializableHeaderValue, {
                    [zE1]: A[HE1]
                });
            Q.bp("/assignment/roles");
            let D = SB.map({
                    [vUA]: [, A[xUA]],
                    [_UA]: [() => A.maxResults !== void 0, () => A[yUA].toString()],
                    [kUA]: [, SB.expectNonNull(A[jUA], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountRolesCommand"),
        uzQ = S6(async (A, B) => {
            let Q = lO.requestBuilder(A, B),
                Z = SB.map({}, SB.isSerializableHeaderValue, {
                    [zE1]: A[HE1]
                });
            Q.bp("/assignment/accounts");
            let D = SB.map({
                    [vUA]: [, A[xUA]],
                    [_UA]: [() => A.maxResults !== void 0, () => A[yUA].toString()]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountsCommand"),
        mzQ = S6(async (A, B) => {
            let Q = lO.requestBuilder(A, B),
                Z = SB.map({}, SB.isSerializableHeaderValue, {
                    [zE1]: A[HE1]
                });
            Q.bp("/logout");
            let D;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_LogoutCommand"),
        dzQ = S6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return KE1(A, B);
            let Q = SB.map({
                    $metadata: dk(A)
                }),
                Z = SB.expectNonNull(SB.expectObject(await LQ1.parseJsonBody(A.body, B)), "body"),
                D = SB.take(Z, {
                    roleCredentials: SB._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetRoleCredentialsCommand"),
        czQ = S6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return KE1(A, B);
            let Q = SB.map({
                    $metadata: dk(A)
                }),
                Z = SB.expectNonNull(SB.expectObject(await LQ1.parseJsonBody(A.body, B)), "body"),
                D = SB.take(Z, {
                    nextToken: SB.expectString,
                    roleList: SB._json
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountRolesCommand"),
        lzQ = S6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return KE1(A, B);
            let Q = SB.map({
                    $metadata: dk(A)
                }),
                Z = SB.expectNonNull(SB.expectObject(await LQ1.parseJsonBody(A.body, B)), "body"),
                D = SB.take(Z, {
                    accountList: SB._json,
                    nextToken: SB.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountsCommand"),
        pzQ = S6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return KE1(A, B);
            let Q = SB.map({
                $metadata: dk(A)
            });
            return await SB.collectBody(A.body, B), Q
        }, "de_LogoutCommand"),
        KE1 = S6(async (A, B) => {
            let Q = {
                    ...A,
                    body: await LQ1.parseJsonErrorBody(A.body, B)
                },
                Z = LQ1.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "InvalidRequestException":
                case "com.amazonaws.sso#InvalidRequestException":
                    throw await nzQ(Q, B);
                case "ResourceNotFoundException":
                case "com.amazonaws.sso#ResourceNotFoundException":
                    throw await azQ(Q, B);
                case "TooManyRequestsException":
                case "com.amazonaws.sso#TooManyRequestsException":
                    throw await szQ(Q, B);
                case "UnauthorizedException":
                case "com.amazonaws.sso#UnauthorizedException":
                    throw await rzQ(Q, B);
                default:
                    let D = Q.body;
                    return izQ({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        izQ = SB.withBaseException(ii),
        nzQ = S6(async (A, B) => {
            let Q = SB.map({}),
                Z = A.body,
                D = SB.take(Z, {
                    message: SB.expectString
                });
            Object.assign(Q, D);
            let G = new $UA({
                $metadata: dk(A),
                ...Q
            });
            return SB.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        azQ = S6(async (A, B) => {
            let Q = SB.map({}),
                Z = A.body,
                D = SB.take(Z, {
                    message: SB.expectString
                });
            Object.assign(Q, D);
            let G = new qUA({
                $metadata: dk(A),
                ...Q
            });
            return SB.decorateServiceException(G, A.body)
        }, "de_ResourceNotFoundExceptionRes"),
        szQ = S6(async (A, B) => {
            let Q = SB.map({}),
                Z = A.body,
                D = SB.take(Z, {
                    message: SB.expectString
                });
            Object.assign(Q, D);
            let G = new NUA({
                $metadata: dk(A),
                ...Q
            });
            return SB.decorateServiceException(G, A.body)
        }, "de_TooManyRequestsExceptionRes"),
        rzQ = S6(async (A, B) => {
            let Q = SB.map({}),
                Z = A.body,
                D = SB.take(Z, {
                    message: SB.expectString
                });
            Object.assign(Q, D);
            let G = new LUA({
                $metadata: dk(A),
                ...Q
            });
            return SB.decorateServiceException(G, A.body)
        }, "de_UnauthorizedExceptionRes"),
        dk = S6((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        jUA = "accountId",
        HE1 = "accessToken",
        kUA = "account_id",
        yUA = "maxResults",
        _UA = "max_result",
        xUA = "nextToken",
        vUA = "next_token",
        ozQ = "roleName",
        tzQ = "role_name",
        zE1 = "x-amz-sso_bearer_token",
        bUA = class extends SB.Command.classBuilder().ep(XE1).m(function(A, B, Q, Z) {
            return [CE1.getSerdePlugin(Q, this.serialize, this.deserialize), MQ1.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").f(MUA, OUA).ser(hzQ).de(dzQ).build() {
            static {
                S6(this, "GetRoleCredentialsCommand")
            }
        },
        Ce1 = class extends SB.Command.classBuilder().ep(XE1).m(function(A, B, Q, Z) {
            return [CE1.getSerdePlugin(Q, this.serialize, this.deserialize), MQ1.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccountRoles", {}).n("SSOClient", "ListAccountRolesCommand").f(TUA, void 0).ser(gzQ).de(czQ).build() {
            static {
                S6(this, "ListAccountRolesCommand")
            }
        },
        Ke1 = class extends SB.Command.classBuilder().ep(XE1).m(function(A, B, Q, Z) {
            return [CE1.getSerdePlugin(Q, this.serialize, this.deserialize), MQ1.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccounts", {}).n("SSOClient", "ListAccountsCommand").f(PUA, void 0).ser(uzQ).de(lzQ).build() {
            static {
                S6(this, "ListAccountsCommand")
            }
        },
        fUA = class extends SB.Command.classBuilder().ep(XE1).m(function(A, B, Q, Z) {
            return [CE1.getSerdePlugin(Q, this.serialize, this.deserialize), MQ1.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "Logout", {}).n("SSOClient", "LogoutCommand").f(SUA, void 0).ser(mzQ).de(pzQ).build() {
            static {
                S6(this, "LogoutCommand")
            }
        },
        ezQ = {
            GetRoleCredentialsCommand: bUA,
            ListAccountRolesCommand: Ce1,
            ListAccountsCommand: Ke1,
            LogoutCommand: fUA
        },
        hUA = class extends VE1 {
            static {
                S6(this, "SSO")
            }
        };
    SB.createAggregatedClient(ezQ, hUA);
    var AEQ = lO.createPaginator(VE1, Ce1, "nextToken", "nextToken", "maxResults"),
        BEQ = lO.createPaginator(VE1, Ke1, "nextToken", "nextToken", "maxResults")
});