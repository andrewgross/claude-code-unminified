/* chunk:282 bytes:[6004155, 6023491) size:19336 source:unpacked-cli.js */
var Kw2 = E((LR5, Cw2) => {
    var {
        defineProperty: GR1,
        getOwnPropertyDescriptor: $d4,
        getOwnPropertyNames: qd4
    } = Object, Nd4 = Object.prototype.hasOwnProperty, v6 = (A, B) => GR1(A, "name", {
        value: B,
        configurable: !0
    }), Ld4 = (A, B) => {
        for (var Q in B) GR1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Md4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of qd4(B))
                if (!Nd4.call(A, D) && D !== Q) GR1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = $d4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Rd4 = (A) => Md4(GR1({}, "__esModule", {
        value: !0
    }), A), nU2 = {};
    Ld4(nU2, {
        GetRoleCredentialsCommand: () => Jw2,
        GetRoleCredentialsRequestFilterSensitiveLog: () => tU2,
        GetRoleCredentialsResponseFilterSensitiveLog: () => Aw2,
        InvalidRequestException: () => aU2,
        ListAccountRolesCommand: () => CG0,
        ListAccountRolesRequestFilterSensitiveLog: () => Bw2,
        ListAccountsCommand: () => KG0,
        ListAccountsRequestFilterSensitiveLog: () => Qw2,
        LogoutCommand: () => Xw2,
        LogoutRequestFilterSensitiveLog: () => Zw2,
        ResourceNotFoundException: () => sU2,
        RoleCredentialsFilterSensitiveLog: () => eU2,
        SSO: () => Vw2,
        SSOClient: () => IR1,
        SSOServiceException: () => No,
        TooManyRequestsException: () => rU2,
        UnauthorizedException: () => oU2,
        __Client: () => yB.Client,
        paginateListAccountRoles: () => od4,
        paginateListAccounts: () => td4
    });
    Cw2.exports = Rd4(nU2);
    var mU2 = RM1(),
        Od4 = TM1(),
        Td4 = jM1(),
        dU2 = K51(),
        Pd4 = z4(),
        WP = HB(),
        Sd4 = hG(),
        w51 = T6(),
        cU2 = u4(),
        lU2 = WG0(),
        jd4 = v6((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "awsssoportal"
            })
        }, "resolveClientEndpointParameters"),
        FR1 = {
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
        kd4 = uU2(),
        pU2 = tM1(),
        iU2 = SK(),
        yB = P8(),
        yd4 = v6((A) => {
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
        _d4 = v6((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        xd4 = v6((A, B) => {
            let Q = Object.assign(pU2.getAwsRegionExtensionConfiguration(A), yB.getDefaultExtensionConfiguration(A), iU2.getHttpHandlerExtensionConfiguration(A), yd4(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, pU2.resolveAwsRegionExtensionConfiguration(Q), yB.resolveDefaultRuntimeConfig(Q), iU2.resolveHttpHandlerRuntimeConfig(Q), _d4(Q))
        }, "resolveRuntimeExtensions"),
        IR1 = class extends yB.Client {
            static {
                v6(this, "SSOClient")
            }
            config;
            constructor(...[A]) {
                let B = kd4.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = jd4(B),
                    Z = dU2.resolveUserAgentConfig(Q),
                    D = cU2.resolveRetryConfig(Z),
                    G = Pd4.resolveRegionConfig(D),
                    F = mU2.resolveHostHeaderConfig(G),
                    I = w51.resolveEndpointConfig(F),
                    Y = lU2.resolveHttpAuthSchemeConfig(I),
                    W = xd4(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(dU2.getUserAgentPlugin(this.config)), this.middlewareStack.use(cU2.getRetryPlugin(this.config)), this.middlewareStack.use(Sd4.getContentLengthPlugin(this.config)), this.middlewareStack.use(mU2.getHostHeaderPlugin(this.config)), this.middlewareStack.use(Od4.getLoggerPlugin(this.config)), this.middlewareStack.use(Td4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(WP.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: lU2.defaultSSOHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: v6(async (J) => new WP.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(WP.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        YR1 = y3(),
        No = class A extends yB.ServiceException {
            static {
                v6(this, "SSOServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        aU2 = class A extends No {
            static {
                v6(this, "InvalidRequestException")
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
        sU2 = class A extends No {
            static {
                v6(this, "ResourceNotFoundException")
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
        rU2 = class A extends No {
            static {
                v6(this, "TooManyRequestsException")
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
        oU2 = class A extends No {
            static {
                v6(this, "UnauthorizedException")
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
        tU2 = v6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: yB.SENSITIVE_STRING
            }
        }), "GetRoleCredentialsRequestFilterSensitiveLog"),
        eU2 = v6((A) => ({
            ...A,
            ...A.secretAccessKey && {
                secretAccessKey: yB.SENSITIVE_STRING
            },
            ...A.sessionToken && {
                sessionToken: yB.SENSITIVE_STRING
            }
        }), "RoleCredentialsFilterSensitiveLog"),
        Aw2 = v6((A) => ({
            ...A,
            ...A.roleCredentials && {
                roleCredentials: eU2(A.roleCredentials)
            }
        }), "GetRoleCredentialsResponseFilterSensitiveLog"),
        Bw2 = v6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: yB.SENSITIVE_STRING
            }
        }), "ListAccountRolesRequestFilterSensitiveLog"),
        Qw2 = v6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: yB.SENSITIVE_STRING
            }
        }), "ListAccountsRequestFilterSensitiveLog"),
        Zw2 = v6((A) => ({
            ...A,
            ...A.accessToken && {
                accessToken: yB.SENSITIVE_STRING
            }
        }), "LogoutRequestFilterSensitiveLog"),
        U51 = bV(),
        vd4 = v6(async (A, B) => {
            let Q = WP.requestBuilder(A, B),
                Z = yB.map({}, yB.isSerializableHeaderValue, {
                    [XR1]: A[JR1]
                });
            Q.bp("/federation/credentials");
            let D = yB.map({
                    [sd4]: [, yB.expectNonNull(A[ad4], "roleName")],
                    [Gw2]: [, yB.expectNonNull(A[Dw2], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_GetRoleCredentialsCommand"),
        bd4 = v6(async (A, B) => {
            let Q = WP.requestBuilder(A, B),
                Z = yB.map({}, yB.isSerializableHeaderValue, {
                    [XR1]: A[JR1]
                });
            Q.bp("/assignment/roles");
            let D = yB.map({
                    [Ww2]: [, A[Yw2]],
                    [Iw2]: [() => A.maxResults !== void 0, () => A[Fw2].toString()],
                    [Gw2]: [, yB.expectNonNull(A[Dw2], "accountId")]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountRolesCommand"),
        fd4 = v6(async (A, B) => {
            let Q = WP.requestBuilder(A, B),
                Z = yB.map({}, yB.isSerializableHeaderValue, {
                    [XR1]: A[JR1]
                });
            Q.bp("/assignment/accounts");
            let D = yB.map({
                    [Ww2]: [, A[Yw2]],
                    [Iw2]: [() => A.maxResults !== void 0, () => A[Fw2].toString()]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAccountsCommand"),
        hd4 = v6(async (A, B) => {
            let Q = WP.requestBuilder(A, B),
                Z = yB.map({}, yB.isSerializableHeaderValue, {
                    [XR1]: A[JR1]
                });
            Q.bp("/logout");
            let D;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_LogoutCommand"),
        gd4 = v6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return WR1(A, B);
            let Q = yB.map({
                    $metadata: j_(A)
                }),
                Z = yB.expectNonNull(yB.expectObject(await U51.parseJsonBody(A.body, B)), "body"),
                D = yB.take(Z, {
                    roleCredentials: yB._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetRoleCredentialsCommand"),
        ud4 = v6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return WR1(A, B);
            let Q = yB.map({
                    $metadata: j_(A)
                }),
                Z = yB.expectNonNull(yB.expectObject(await U51.parseJsonBody(A.body, B)), "body"),
                D = yB.take(Z, {
                    nextToken: yB.expectString,
                    roleList: yB._json
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountRolesCommand"),
        md4 = v6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return WR1(A, B);
            let Q = yB.map({
                    $metadata: j_(A)
                }),
                Z = yB.expectNonNull(yB.expectObject(await U51.parseJsonBody(A.body, B)), "body"),
                D = yB.take(Z, {
                    accountList: yB._json,
                    nextToken: yB.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListAccountsCommand"),
        dd4 = v6(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return WR1(A, B);
            let Q = yB.map({
                $metadata: j_(A)
            });
            return await yB.collectBody(A.body, B), Q
        }, "de_LogoutCommand"),
        WR1 = v6(async (A, B) => {
            let Q = {
                    ...A,
                    body: await U51.parseJsonErrorBody(A.body, B)
                },
                Z = U51.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "InvalidRequestException":
                case "com.amazonaws.sso#InvalidRequestException":
                    throw await ld4(Q, B);
                case "ResourceNotFoundException":
                case "com.amazonaws.sso#ResourceNotFoundException":
                    throw await pd4(Q, B);
                case "TooManyRequestsException":
                case "com.amazonaws.sso#TooManyRequestsException":
                    throw await id4(Q, B);
                case "UnauthorizedException":
                case "com.amazonaws.sso#UnauthorizedException":
                    throw await nd4(Q, B);
                default:
                    let D = Q.body;
                    return cd4({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        cd4 = yB.withBaseException(No),
        ld4 = v6(async (A, B) => {
            let Q = yB.map({}),
                Z = A.body,
                D = yB.take(Z, {
                    message: yB.expectString
                });
            Object.assign(Q, D);
            let G = new aU2({
                $metadata: j_(A),
                ...Q
            });
            return yB.decorateServiceException(G, A.body)
        }, "de_InvalidRequestExceptionRes"),
        pd4 = v6(async (A, B) => {
            let Q = yB.map({}),
                Z = A.body,
                D = yB.take(Z, {
                    message: yB.expectString
                });
            Object.assign(Q, D);
            let G = new sU2({
                $metadata: j_(A),
                ...Q
            });
            return yB.decorateServiceException(G, A.body)
        }, "de_ResourceNotFoundExceptionRes"),
        id4 = v6(async (A, B) => {
            let Q = yB.map({}),
                Z = A.body,
                D = yB.take(Z, {
                    message: yB.expectString
                });
            Object.assign(Q, D);
            let G = new rU2({
                $metadata: j_(A),
                ...Q
            });
            return yB.decorateServiceException(G, A.body)
        }, "de_TooManyRequestsExceptionRes"),
        nd4 = v6(async (A, B) => {
            let Q = yB.map({}),
                Z = A.body,
                D = yB.take(Z, {
                    message: yB.expectString
                });
            Object.assign(Q, D);
            let G = new oU2({
                $metadata: j_(A),
                ...Q
            });
            return yB.decorateServiceException(G, A.body)
        }, "de_UnauthorizedExceptionRes"),
        j_ = v6((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        Dw2 = "accountId",
        JR1 = "accessToken",
        Gw2 = "account_id",
        Fw2 = "maxResults",
        Iw2 = "max_result",
        Yw2 = "nextToken",
        Ww2 = "next_token",
        ad4 = "roleName",
        sd4 = "role_name",
        XR1 = "x-amz-sso_bearer_token",
        Jw2 = class extends yB.Command.classBuilder().ep(FR1).m(function(A, B, Q, Z) {
            return [YR1.getSerdePlugin(Q, this.serialize, this.deserialize), w51.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").f(tU2, Aw2).ser(vd4).de(gd4).build() {
            static {
                v6(this, "GetRoleCredentialsCommand")
            }
        },
        CG0 = class extends yB.Command.classBuilder().ep(FR1).m(function(A, B, Q, Z) {
            return [YR1.getSerdePlugin(Q, this.serialize, this.deserialize), w51.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccountRoles", {}).n("SSOClient", "ListAccountRolesCommand").f(Bw2, void 0).ser(bd4).de(ud4).build() {
            static {
                v6(this, "ListAccountRolesCommand")
            }
        },
        KG0 = class extends yB.Command.classBuilder().ep(FR1).m(function(A, B, Q, Z) {
            return [YR1.getSerdePlugin(Q, this.serialize, this.deserialize), w51.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "ListAccounts", {}).n("SSOClient", "ListAccountsCommand").f(Qw2, void 0).ser(fd4).de(md4).build() {
            static {
                v6(this, "ListAccountsCommand")
            }
        },
        Xw2 = class extends yB.Command.classBuilder().ep(FR1).m(function(A, B, Q, Z) {
            return [YR1.getSerdePlugin(Q, this.serialize, this.deserialize), w51.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("SWBPortalService", "Logout", {}).n("SSOClient", "LogoutCommand").f(Zw2, void 0).ser(hd4).de(dd4).build() {
            static {
                v6(this, "LogoutCommand")
            }
        },
        rd4 = {
            GetRoleCredentialsCommand: Jw2,
            ListAccountRolesCommand: CG0,
            ListAccountsCommand: KG0,
            LogoutCommand: Xw2
        },
        Vw2 = class extends IR1 {
            static {
                v6(this, "SSO")
            }
        };
    yB.createAggregatedClient(rd4, Vw2);
    var od4 = WP.createPaginator(IR1, CG0, "nextToken", "nextToken", "maxResults"),
        td4 = WP.createPaginator(IR1, KG0, "nextToken", "nextToken", "maxResults")
});