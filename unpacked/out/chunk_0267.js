/* chunk:267 bytes:[5702524, 5751633) size:49109 source:unpacked-cli.js */
var pV2 = E((qL5, lV2) => {
    var {
        defineProperty: JM1,
        getOwnPropertyDescriptor: uy4,
        getOwnPropertyNames: my4
    } = Object, dy4 = Object.prototype.hasOwnProperty, zA = (A, B) => JM1(A, "name", {
        value: B,
        configurable: !0
    }), cy4 = (A, B) => {
        for (var Q in B) JM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, ly4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of my4(B))
                if (!dy4.call(A, D) && D !== Q) JM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = uy4(B, D)) || Z.enumerable
                })
        }
        return A
    }, py4 = (A) => ly4(JM1({}, "__esModule", {
        value: !0
    }), A), eX2 = {};
    cy4(eX2, {
        AmbiguousRoleResolutionType: () => B_4,
        CognitoIdentity: () => cV2,
        CognitoIdentityClient: () => RZ0,
        CognitoIdentityServiceException: () => TK,
        ConcurrentModificationException: () => JV2,
        CreateIdentityPoolCommand: () => qV2,
        CredentialsFilterSensitiveLog: () => VV2,
        DeleteIdentitiesCommand: () => NV2,
        DeleteIdentityPoolCommand: () => LV2,
        DescribeIdentityCommand: () => MV2,
        DescribeIdentityPoolCommand: () => RV2,
        DeveloperUserAlreadyRegisteredException: () => WV2,
        ErrorCode: () => Q_4,
        ExternalServiceException: () => IV2,
        GetCredentialsForIdentityCommand: () => OV2,
        GetCredentialsForIdentityInputFilterSensitiveLog: () => XV2,
        GetCredentialsForIdentityResponseFilterSensitiveLog: () => CV2,
        GetIdCommand: () => TV2,
        GetIdInputFilterSensitiveLog: () => KV2,
        GetIdentityPoolRolesCommand: () => PV2,
        GetOpenIdTokenCommand: () => SV2,
        GetOpenIdTokenForDeveloperIdentityCommand: () => jV2,
        GetOpenIdTokenForDeveloperIdentityInputFilterSensitiveLog: () => EV2,
        GetOpenIdTokenForDeveloperIdentityResponseFilterSensitiveLog: () => UV2,
        GetOpenIdTokenInputFilterSensitiveLog: () => HV2,
        GetOpenIdTokenResponseFilterSensitiveLog: () => zV2,
        GetPrincipalTagAttributeMapCommand: () => kV2,
        InternalErrorException: () => AV2,
        InvalidIdentityPoolConfigurationException: () => YV2,
        InvalidParameterException: () => BV2,
        LimitExceededException: () => QV2,
        ListIdentitiesCommand: () => yV2,
        ListIdentityPoolsCommand: () => OZ0,
        ListTagsForResourceCommand: () => _V2,
        LookupDeveloperIdentityCommand: () => xV2,
        MappingRuleMatchType: () => Z_4,
        MergeDeveloperIdentitiesCommand: () => vV2,
        NotAuthorizedException: () => ZV2,
        ResourceConflictException: () => DV2,
        ResourceNotFoundException: () => FV2,
        RoleMappingType: () => D_4,
        SetIdentityPoolRolesCommand: () => bV2,
        SetPrincipalTagAttributeMapCommand: () => fV2,
        TagResourceCommand: () => hV2,
        TooManyRequestsException: () => GV2,
        UnlinkDeveloperIdentityCommand: () => gV2,
        UnlinkIdentityCommand: () => uV2,
        UnlinkIdentityInputFilterSensitiveLog: () => wV2,
        UntagResourceCommand: () => mV2,
        UpdateIdentityPoolCommand: () => dV2,
        __Client: () => KA.Client,
        paginateListIdentityPools: () => Kx4
    });
    lV2.exports = py4(eX2);
    var aX2 = f81(),
        iy4 = h81(),
        ny4 = g81(),
        sX2 = hr(),
        ay4 = z4(),
        WM1 = HB(),
        sy4 = hG(),
        NZ = T6(),
        rX2 = u4(),
        oX2 = A70(),
        ry4 = zA((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "cognito-identity"
            })
        }, "resolveClientEndpointParameters"),
        iZ = {
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
        oy4 = nX2(),
        tX2 = n81(),
        MZ0 = vV(),
        KA = H6(),
        ty4 = zA((A) => {
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
        ey4 = zA((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        A_4 = zA((A, B) => {
            let Q = Object.assign(tX2.getAwsRegionExtensionConfiguration(A), KA.getDefaultExtensionConfiguration(A), MZ0.getHttpHandlerExtensionConfiguration(A), ty4(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, tX2.resolveAwsRegionExtensionConfiguration(Q), KA.resolveDefaultRuntimeConfig(Q), MZ0.resolveHttpHandlerRuntimeConfig(Q), ey4(Q))
        }, "resolveRuntimeExtensions"),
        RZ0 = class extends KA.Client {
            static {
                zA(this, "CognitoIdentityClient")
            }
            config;
            constructor(...[A]) {
                let B = oy4.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = ry4(B),
                    Z = sX2.resolveUserAgentConfig(Q),
                    D = rX2.resolveRetryConfig(Z),
                    G = ay4.resolveRegionConfig(D),
                    F = aX2.resolveHostHeaderConfig(G),
                    I = NZ.resolveEndpointConfig(F),
                    Y = oX2.resolveHttpAuthSchemeConfig(I),
                    W = A_4(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(sX2.getUserAgentPlugin(this.config)), this.middlewareStack.use(rX2.getRetryPlugin(this.config)), this.middlewareStack.use(sy4.getContentLengthPlugin(this.config)), this.middlewareStack.use(aX2.getHostHeaderPlugin(this.config)), this.middlewareStack.use(iy4.getLoggerPlugin(this.config)), this.middlewareStack.use(ny4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(WM1.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: oX2.defaultCognitoIdentityHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: zA(async (J) => new WM1.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(WM1.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        nZ = y3(),
        YG = UI(),
        TK = class A extends KA.ServiceException {
            static {
                zA(this, "CognitoIdentityServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        B_4 = {
            AUTHENTICATED_ROLE: "AuthenticatedRole",
            DENY: "Deny"
        },
        AV2 = class A extends TK {
            static {
                zA(this, "InternalErrorException")
            }
            name = "InternalErrorException";
            $fault = "server";
            constructor(B) {
                super({
                    name: "InternalErrorException",
                    $fault: "server",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        BV2 = class A extends TK {
            static {
                zA(this, "InvalidParameterException")
            }
            name = "InvalidParameterException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "InvalidParameterException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        QV2 = class A extends TK {
            static {
                zA(this, "LimitExceededException")
            }
            name = "LimitExceededException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "LimitExceededException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        ZV2 = class A extends TK {
            static {
                zA(this, "NotAuthorizedException")
            }
            name = "NotAuthorizedException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "NotAuthorizedException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        DV2 = class A extends TK {
            static {
                zA(this, "ResourceConflictException")
            }
            name = "ResourceConflictException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ResourceConflictException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        GV2 = class A extends TK {
            static {
                zA(this, "TooManyRequestsException")
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
        Q_4 = {
            ACCESS_DENIED: "AccessDenied",
            INTERNAL_SERVER_ERROR: "InternalServerError"
        },
        FV2 = class A extends TK {
            static {
                zA(this, "ResourceNotFoundException")
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
        IV2 = class A extends TK {
            static {
                zA(this, "ExternalServiceException")
            }
            name = "ExternalServiceException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ExternalServiceException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        YV2 = class A extends TK {
            static {
                zA(this, "InvalidIdentityPoolConfigurationException")
            }
            name = "InvalidIdentityPoolConfigurationException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "InvalidIdentityPoolConfigurationException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        Z_4 = {
            CONTAINS: "Contains",
            EQUALS: "Equals",
            NOT_EQUAL: "NotEqual",
            STARTS_WITH: "StartsWith"
        },
        D_4 = {
            RULES: "Rules",
            TOKEN: "Token"
        },
        WV2 = class A extends TK {
            static {
                zA(this, "DeveloperUserAlreadyRegisteredException")
            }
            name = "DeveloperUserAlreadyRegisteredException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "DeveloperUserAlreadyRegisteredException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        JV2 = class A extends TK {
            static {
                zA(this, "ConcurrentModificationException")
            }
            name = "ConcurrentModificationException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ConcurrentModificationException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        XV2 = zA((A) => ({
            ...A,
            ...A.Logins && {
                Logins: KA.SENSITIVE_STRING
            }
        }), "GetCredentialsForIdentityInputFilterSensitiveLog"),
        VV2 = zA((A) => ({
            ...A,
            ...A.SecretKey && {
                SecretKey: KA.SENSITIVE_STRING
            }
        }), "CredentialsFilterSensitiveLog"),
        CV2 = zA((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: VV2(A.Credentials)
            }
        }), "GetCredentialsForIdentityResponseFilterSensitiveLog"),
        KV2 = zA((A) => ({
            ...A,
            ...A.Logins && {
                Logins: KA.SENSITIVE_STRING
            }
        }), "GetIdInputFilterSensitiveLog"),
        HV2 = zA((A) => ({
            ...A,
            ...A.Logins && {
                Logins: KA.SENSITIVE_STRING
            }
        }), "GetOpenIdTokenInputFilterSensitiveLog"),
        zV2 = zA((A) => ({
            ...A,
            ...A.Token && {
                Token: KA.SENSITIVE_STRING
            }
        }), "GetOpenIdTokenResponseFilterSensitiveLog"),
        EV2 = zA((A) => ({
            ...A,
            ...A.Logins && {
                Logins: KA.SENSITIVE_STRING
            }
        }), "GetOpenIdTokenForDeveloperIdentityInputFilterSensitiveLog"),
        UV2 = zA((A) => ({
            ...A,
            ...A.Token && {
                Token: KA.SENSITIVE_STRING
            }
        }), "GetOpenIdTokenForDeveloperIdentityResponseFilterSensitiveLog"),
        wV2 = zA((A) => ({
            ...A,
            ...A.Logins && {
                Logins: KA.SENSITIVE_STRING
            }
        }), "UnlinkIdentityInputFilterSensitiveLog"),
        G_4 = zA(async (A, B) => {
            let Q = LZ("CreateIdentityPool"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_CreateIdentityPoolCommand"),
        F_4 = zA(async (A, B) => {
            let Q = LZ("DeleteIdentities"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_DeleteIdentitiesCommand"),
        I_4 = zA(async (A, B) => {
            let Q = LZ("DeleteIdentityPool"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_DeleteIdentityPoolCommand"),
        Y_4 = zA(async (A, B) => {
            let Q = LZ("DescribeIdentity"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_DescribeIdentityCommand"),
        W_4 = zA(async (A, B) => {
            let Q = LZ("DescribeIdentityPool"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_DescribeIdentityPoolCommand"),
        J_4 = zA(async (A, B) => {
            let Q = LZ("GetCredentialsForIdentity"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_GetCredentialsForIdentityCommand"),
        X_4 = zA(async (A, B) => {
            let Q = LZ("GetId"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_GetIdCommand"),
        V_4 = zA(async (A, B) => {
            let Q = LZ("GetIdentityPoolRoles"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_GetIdentityPoolRolesCommand"),
        C_4 = zA(async (A, B) => {
            let Q = LZ("GetOpenIdToken"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_GetOpenIdTokenCommand"),
        K_4 = zA(async (A, B) => {
            let Q = LZ("GetOpenIdTokenForDeveloperIdentity"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_GetOpenIdTokenForDeveloperIdentityCommand"),
        H_4 = zA(async (A, B) => {
            let Q = LZ("GetPrincipalTagAttributeMap"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_GetPrincipalTagAttributeMapCommand"),
        z_4 = zA(async (A, B) => {
            let Q = LZ("ListIdentities"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_ListIdentitiesCommand"),
        E_4 = zA(async (A, B) => {
            let Q = LZ("ListIdentityPools"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_ListIdentityPoolsCommand"),
        U_4 = zA(async (A, B) => {
            let Q = LZ("ListTagsForResource"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_ListTagsForResourceCommand"),
        w_4 = zA(async (A, B) => {
            let Q = LZ("LookupDeveloperIdentity"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_LookupDeveloperIdentityCommand"),
        $_4 = zA(async (A, B) => {
            let Q = LZ("MergeDeveloperIdentities"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_MergeDeveloperIdentitiesCommand"),
        q_4 = zA(async (A, B) => {
            let Q = LZ("SetIdentityPoolRoles"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_SetIdentityPoolRolesCommand"),
        N_4 = zA(async (A, B) => {
            let Q = LZ("SetPrincipalTagAttributeMap"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_SetPrincipalTagAttributeMapCommand"),
        L_4 = zA(async (A, B) => {
            let Q = LZ("TagResource"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_TagResourceCommand"),
        M_4 = zA(async (A, B) => {
            let Q = LZ("UnlinkDeveloperIdentity"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_UnlinkDeveloperIdentityCommand"),
        R_4 = zA(async (A, B) => {
            let Q = LZ("UnlinkIdentity"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_UnlinkIdentityCommand"),
        O_4 = zA(async (A, B) => {
            let Q = LZ("UntagResource"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_UntagResourceCommand"),
        T_4 = zA(async (A, B) => {
            let Q = LZ("UpdateIdentityPool"),
                Z;
            return Z = JSON.stringify(KA._json(A)), sZ(B, Q, "/", void 0, Z)
        }, "se_UpdateIdentityPoolCommand"),
        P_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_CreateIdentityPoolCommand"),
        S_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_DeleteIdentitiesCommand"),
        j_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            return await KA.collectBody(A.body, B), {
                $metadata: J8(A)
            }
        }, "de_DeleteIdentityPoolCommand"),
        k_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = $V2(Q, B), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_DescribeIdentityCommand"),
        y_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_DescribeIdentityPoolCommand"),
        __4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = Wx4(Q, B), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_GetCredentialsForIdentityCommand"),
        x_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_GetIdCommand"),
        v_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_GetIdentityPoolRolesCommand"),
        b_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_GetOpenIdTokenCommand"),
        f_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_GetOpenIdTokenForDeveloperIdentityCommand"),
        h_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_GetPrincipalTagAttributeMapCommand"),
        g_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = Xx4(Q, B), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_ListIdentitiesCommand"),
        u_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_ListIdentityPoolsCommand"),
        m_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_ListTagsForResourceCommand"),
        d_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_LookupDeveloperIdentityCommand"),
        c_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_MergeDeveloperIdentitiesCommand"),
        l_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            return await KA.collectBody(A.body, B), {
                $metadata: J8(A)
            }
        }, "de_SetIdentityPoolRolesCommand"),
        p_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_SetPrincipalTagAttributeMapCommand"),
        i_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_TagResourceCommand"),
        n_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            return await KA.collectBody(A.body, B), {
                $metadata: J8(A)
            }
        }, "de_UnlinkDeveloperIdentityCommand"),
        a_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            return await KA.collectBody(A.body, B), {
                $metadata: J8(A)
            }
        }, "de_UnlinkIdentityCommand"),
        s_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_UntagResourceCommand"),
        r_4 = zA(async (A, B) => {
            if (A.statusCode >= 300) return aZ(A, B);
            let Q = await YG.parseJsonBody(A.body, B),
                Z = {};
            return Z = KA._json(Q), {
                $metadata: J8(A),
                ...Z
            }
        }, "de_UpdateIdentityPoolCommand"),
        aZ = zA(async (A, B) => {
            let Q = {
                    ...A,
                    body: await YG.parseJsonErrorBody(A.body, B)
                },
                Z = YG.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "InternalErrorException":
                case "com.amazonaws.cognitoidentity#InternalErrorException":
                    throw await Ax4(Q, B);
                case "InvalidParameterException":
                case "com.amazonaws.cognitoidentity#InvalidParameterException":
                    throw await Qx4(Q, B);
                case "LimitExceededException":
                case "com.amazonaws.cognitoidentity#LimitExceededException":
                    throw await Zx4(Q, B);
                case "NotAuthorizedException":
                case "com.amazonaws.cognitoidentity#NotAuthorizedException":
                    throw await Dx4(Q, B);
                case "ResourceConflictException":
                case "com.amazonaws.cognitoidentity#ResourceConflictException":
                    throw await Gx4(Q, B);
                case "TooManyRequestsException":
                case "com.amazonaws.cognitoidentity#TooManyRequestsException":
                    throw await Ix4(Q, B);
                case "ResourceNotFoundException":
                case "com.amazonaws.cognitoidentity#ResourceNotFoundException":
                    throw await Fx4(Q, B);
                case "ExternalServiceException":
                case "com.amazonaws.cognitoidentity#ExternalServiceException":
                    throw await e_4(Q, B);
                case "InvalidIdentityPoolConfigurationException":
                case "com.amazonaws.cognitoidentity#InvalidIdentityPoolConfigurationException":
                    throw await Bx4(Q, B);
                case "DeveloperUserAlreadyRegisteredException":
                case "com.amazonaws.cognitoidentity#DeveloperUserAlreadyRegisteredException":
                    throw await t_4(Q, B);
                case "ConcurrentModificationException":
                case "com.amazonaws.cognitoidentity#ConcurrentModificationException":
                    throw await o_4(Q, B);
                default:
                    let D = Q.body;
                    return Vx4({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        o_4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new JV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_ConcurrentModificationExceptionRes"),
        t_4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new WV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_DeveloperUserAlreadyRegisteredExceptionRes"),
        e_4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new IV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_ExternalServiceExceptionRes"),
        Ax4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new AV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_InternalErrorExceptionRes"),
        Bx4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new YV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_InvalidIdentityPoolConfigurationExceptionRes"),
        Qx4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new BV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_InvalidParameterExceptionRes"),
        Zx4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new QV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_LimitExceededExceptionRes"),
        Dx4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new ZV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_NotAuthorizedExceptionRes"),
        Gx4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new DV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_ResourceConflictExceptionRes"),
        Fx4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new FV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_ResourceNotFoundExceptionRes"),
        Ix4 = zA(async (A, B) => {
            let Q = A.body,
                Z = KA._json(Q),
                D = new GV2({
                    $metadata: J8(A),
                    ...Z
                });
            return KA.decorateServiceException(D, Q)
        }, "de_TooManyRequestsExceptionRes"),
        Yx4 = zA((A, B) => {
            return KA.take(A, {
                AccessKeyId: KA.expectString,
                Expiration: zA((Q) => KA.expectNonNull(KA.parseEpochTimestamp(KA.expectNumber(Q))), "Expiration"),
                SecretKey: KA.expectString,
                SessionToken: KA.expectString
            })
        }, "de_Credentials"),
        Wx4 = zA((A, B) => {
            return KA.take(A, {
                Credentials: zA((Q) => Yx4(Q, B), "Credentials"),
                IdentityId: KA.expectString
            })
        }, "de_GetCredentialsForIdentityResponse"),
        Jx4 = zA((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return $V2(Z, B)
            })
        }, "de_IdentitiesList"),
        $V2 = zA((A, B) => {
            return KA.take(A, {
                CreationDate: zA((Q) => KA.expectNonNull(KA.parseEpochTimestamp(KA.expectNumber(Q))), "CreationDate"),
                IdentityId: KA.expectString,
                LastModifiedDate: zA((Q) => KA.expectNonNull(KA.parseEpochTimestamp(KA.expectNumber(Q))), "LastModifiedDate"),
                Logins: KA._json
            })
        }, "de_IdentityDescription"),
        Xx4 = zA((A, B) => {
            return KA.take(A, {
                Identities: zA((Q) => Jx4(Q, B), "Identities"),
                IdentityPoolId: KA.expectString,
                NextToken: KA.expectString
            })
        }, "de_ListIdentitiesResponse"),
        J8 = zA((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        Vx4 = KA.withBaseException(TK),
        sZ = zA(async (A, B, Q, Z, D) => {
            let {
                hostname: G,
                protocol: F = "https",
                port: I,
                path: Y
            } = await A.endpoint(), W = {
                protocol: F,
                hostname: G,
                port: I,
                method: "POST",
                path: Y.endsWith("/") ? Y.slice(0, -1) + Q : Y + Q,
                headers: B
            };
            if (Z !== void 0) W.hostname = Z;
            if (D !== void 0) W.body = D;
            return new MZ0.HttpRequest(W)
        }, "buildHttpRpcRequest");

    function LZ(A) {
        return {
            "content-type": "application/x-amz-json-1.1",
            "x-amz-target": `AWSCognitoIdentityService.${A}`
        }
    }
    zA(LZ, "sharedHeaders");
    var qV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "CreateIdentityPool", {}).n("CognitoIdentityClient", "CreateIdentityPoolCommand").f(void 0, void 0).ser(G_4).de(P_4).build() {
            static {
                zA(this, "CreateIdentityPoolCommand")
            }
        },
        NV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "DeleteIdentities", {}).n("CognitoIdentityClient", "DeleteIdentitiesCommand").f(void 0, void 0).ser(F_4).de(S_4).build() {
            static {
                zA(this, "DeleteIdentitiesCommand")
            }
        },
        LV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "DeleteIdentityPool", {}).n("CognitoIdentityClient", "DeleteIdentityPoolCommand").f(void 0, void 0).ser(I_4).de(j_4).build() {
            static {
                zA(this, "DeleteIdentityPoolCommand")
            }
        },
        MV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "DescribeIdentity", {}).n("CognitoIdentityClient", "DescribeIdentityCommand").f(void 0, void 0).ser(Y_4).de(k_4).build() {
            static {
                zA(this, "DescribeIdentityCommand")
            }
        },
        RV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "DescribeIdentityPool", {}).n("CognitoIdentityClient", "DescribeIdentityPoolCommand").f(void 0, void 0).ser(W_4).de(y_4).build() {
            static {
                zA(this, "DescribeIdentityPoolCommand")
            }
        },
        OV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "GetCredentialsForIdentity", {}).n("CognitoIdentityClient", "GetCredentialsForIdentityCommand").f(XV2, CV2).ser(J_4).de(__4).build() {
            static {
                zA(this, "GetCredentialsForIdentityCommand")
            }
        },
        TV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "GetId", {}).n("CognitoIdentityClient", "GetIdCommand").f(KV2, void 0).ser(X_4).de(x_4).build() {
            static {
                zA(this, "GetIdCommand")
            }
        },
        PV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "GetIdentityPoolRoles", {}).n("CognitoIdentityClient", "GetIdentityPoolRolesCommand").f(void 0, void 0).ser(V_4).de(v_4).build() {
            static {
                zA(this, "GetIdentityPoolRolesCommand")
            }
        },
        SV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "GetOpenIdToken", {}).n("CognitoIdentityClient", "GetOpenIdTokenCommand").f(HV2, zV2).ser(C_4).de(b_4).build() {
            static {
                zA(this, "GetOpenIdTokenCommand")
            }
        },
        jV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "GetOpenIdTokenForDeveloperIdentity", {}).n("CognitoIdentityClient", "GetOpenIdTokenForDeveloperIdentityCommand").f(EV2, UV2).ser(K_4).de(f_4).build() {
            static {
                zA(this, "GetOpenIdTokenForDeveloperIdentityCommand")
            }
        },
        kV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "GetPrincipalTagAttributeMap", {}).n("CognitoIdentityClient", "GetPrincipalTagAttributeMapCommand").f(void 0, void 0).ser(H_4).de(h_4).build() {
            static {
                zA(this, "GetPrincipalTagAttributeMapCommand")
            }
        },
        yV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "ListIdentities", {}).n("CognitoIdentityClient", "ListIdentitiesCommand").f(void 0, void 0).ser(z_4).de(g_4).build() {
            static {
                zA(this, "ListIdentitiesCommand")
            }
        },
        OZ0 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "ListIdentityPools", {}).n("CognitoIdentityClient", "ListIdentityPoolsCommand").f(void 0, void 0).ser(E_4).de(u_4).build() {
            static {
                zA(this, "ListIdentityPoolsCommand")
            }
        },
        _V2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "ListTagsForResource", {}).n("CognitoIdentityClient", "ListTagsForResourceCommand").f(void 0, void 0).ser(U_4).de(m_4).build() {
            static {
                zA(this, "ListTagsForResourceCommand")
            }
        },
        xV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "LookupDeveloperIdentity", {}).n("CognitoIdentityClient", "LookupDeveloperIdentityCommand").f(void 0, void 0).ser(w_4).de(d_4).build() {
            static {
                zA(this, "LookupDeveloperIdentityCommand")
            }
        },
        vV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "MergeDeveloperIdentities", {}).n("CognitoIdentityClient", "MergeDeveloperIdentitiesCommand").f(void 0, void 0).ser($_4).de(c_4).build() {
            static {
                zA(this, "MergeDeveloperIdentitiesCommand")
            }
        },
        bV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "SetIdentityPoolRoles", {}).n("CognitoIdentityClient", "SetIdentityPoolRolesCommand").f(void 0, void 0).ser(q_4).de(l_4).build() {
            static {
                zA(this, "SetIdentityPoolRolesCommand")
            }
        },
        fV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "SetPrincipalTagAttributeMap", {}).n("CognitoIdentityClient", "SetPrincipalTagAttributeMapCommand").f(void 0, void 0).ser(N_4).de(p_4).build() {
            static {
                zA(this, "SetPrincipalTagAttributeMapCommand")
            }
        },
        hV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "TagResource", {}).n("CognitoIdentityClient", "TagResourceCommand").f(void 0, void 0).ser(L_4).de(i_4).build() {
            static {
                zA(this, "TagResourceCommand")
            }
        },
        gV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "UnlinkDeveloperIdentity", {}).n("CognitoIdentityClient", "UnlinkDeveloperIdentityCommand").f(void 0, void 0).ser(M_4).de(n_4).build() {
            static {
                zA(this, "UnlinkDeveloperIdentityCommand")
            }
        },
        uV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "UnlinkIdentity", {}).n("CognitoIdentityClient", "UnlinkIdentityCommand").f(wV2, void 0).ser(R_4).de(a_4).build() {
            static {
                zA(this, "UnlinkIdentityCommand")
            }
        },
        mV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "UntagResource", {}).n("CognitoIdentityClient", "UntagResourceCommand").f(void 0, void 0).ser(O_4).de(s_4).build() {
            static {
                zA(this, "UntagResourceCommand")
            }
        },
        dV2 = class extends KA.Command.classBuilder().ep(iZ).m(function(A, B, Q, Z) {
            return [nZ.getSerdePlugin(Q, this.serialize, this.deserialize), NZ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSCognitoIdentityService", "UpdateIdentityPool", {}).n("CognitoIdentityClient", "UpdateIdentityPoolCommand").f(void 0, void 0).ser(T_4).de(r_4).build() {
            static {
                zA(this, "UpdateIdentityPoolCommand")
            }
        },
        Cx4 = {
            CreateIdentityPoolCommand: qV2,
            DeleteIdentitiesCommand: NV2,
            DeleteIdentityPoolCommand: LV2,
            DescribeIdentityCommand: MV2,
            DescribeIdentityPoolCommand: RV2,
            GetCredentialsForIdentityCommand: OV2,
            GetIdCommand: TV2,
            GetIdentityPoolRolesCommand: PV2,
            GetOpenIdTokenCommand: SV2,
            GetOpenIdTokenForDeveloperIdentityCommand: jV2,
            GetPrincipalTagAttributeMapCommand: kV2,
            ListIdentitiesCommand: yV2,
            ListIdentityPoolsCommand: OZ0,
            ListTagsForResourceCommand: _V2,
            LookupDeveloperIdentityCommand: xV2,
            MergeDeveloperIdentitiesCommand: vV2,
            SetIdentityPoolRolesCommand: bV2,
            SetPrincipalTagAttributeMapCommand: fV2,
            TagResourceCommand: hV2,
            UnlinkDeveloperIdentityCommand: gV2,
            UnlinkIdentityCommand: uV2,
            UntagResourceCommand: mV2,
            UpdateIdentityPoolCommand: dV2
        },
        cV2 = class extends RZ0 {
            static {
                zA(this, "CognitoIdentity")
            }
        };
    KA.createAggregatedClient(Cx4, cV2);
    var Kx4 = WM1.createPaginator(RZ0, OZ0, "NextToken", "NextToken", "MaxResults")
});