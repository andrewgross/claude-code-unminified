/* chunk:245 bytes:[5257934, 5302398) size:44464 source:unpacked-cli.js */
var z72 = E((Wq5, J30) => {
    var {
        defineProperty: ZL1,
        getOwnPropertyDescriptor: Rw4,
        getOwnPropertyNames: Ow4
    } = Object, Tw4 = Object.prototype.hasOwnProperty, jA = (A, B) => ZL1(A, "name", {
        value: B,
        configurable: !0
    }), Pw4 = (A, B) => {
        for (var Q in B) ZL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, D30 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ow4(B))
                if (!Tw4.call(A, D) && D !== Q) ZL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Rw4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Sw4 = (A, B, Q) => (D30(A, B, "default"), Q && D30(Q, B, "default")), jw4 = (A) => D30(ZL1({}, "__esModule", {
        value: !0
    }), A), F30 = {};
    Pw4(F30, {
        AssumeRoleCommand: () => Y30,
        AssumeRoleResponseFilterSensitiveLog: () => p32,
        AssumeRoleWithSAMLCommand: () => B72,
        AssumeRoleWithSAMLRequestFilterSensitiveLog: () => i32,
        AssumeRoleWithSAMLResponseFilterSensitiveLog: () => n32,
        AssumeRoleWithWebIdentityCommand: () => W30,
        AssumeRoleWithWebIdentityRequestFilterSensitiveLog: () => a32,
        AssumeRoleWithWebIdentityResponseFilterSensitiveLog: () => s32,
        AssumeRootCommand: () => Q72,
        AssumeRootResponseFilterSensitiveLog: () => r32,
        ClientInputEndpointParameters: () => Zq4.ClientInputEndpointParameters,
        CredentialsFilterSensitiveLog: () => Qu,
        DecodeAuthorizationMessageCommand: () => Z72,
        ExpiredTokenException: () => f32,
        GetAccessKeyInfoCommand: () => D72,
        GetCallerIdentityCommand: () => G72,
        GetFederationTokenCommand: () => F72,
        GetFederationTokenResponseFilterSensitiveLog: () => o32,
        GetSessionTokenCommand: () => I72,
        GetSessionTokenResponseFilterSensitiveLog: () => t32,
        IDPCommunicationErrorException: () => c32,
        IDPRejectedClaimException: () => m32,
        InvalidAuthorizationMessageException: () => l32,
        InvalidIdentityTokenException: () => d32,
        MalformedPolicyDocumentException: () => h32,
        PackedPolicyTooLargeException: () => g32,
        RegionDisabledException: () => u32,
        STS: () => Y72,
        STSServiceException: () => PL,
        decorateDefaultCredentialProvider: () => Fq4,
        getDefaultRoleAssumer: () => K72,
        getDefaultRoleAssumerWithWebIdentity: () => H72
    });
    J30.exports = jw4(F30);
    Sw4(F30, N81(), J30.exports);
    var uT = T6(),
        mT = y3(),
        kw4 = dz(),
        sB = d4(),
        PL = class A extends sB.ServiceException {
            static {
                jA(this, "STSServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        f32 = class A extends PL {
            static {
                jA(this, "ExpiredTokenException")
            }
            name = "ExpiredTokenException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ExpiredTokenException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        h32 = class A extends PL {
            static {
                jA(this, "MalformedPolicyDocumentException")
            }
            name = "MalformedPolicyDocumentException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "MalformedPolicyDocumentException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        g32 = class A extends PL {
            static {
                jA(this, "PackedPolicyTooLargeException")
            }
            name = "PackedPolicyTooLargeException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "PackedPolicyTooLargeException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        u32 = class A extends PL {
            static {
                jA(this, "RegionDisabledException")
            }
            name = "RegionDisabledException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "RegionDisabledException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        m32 = class A extends PL {
            static {
                jA(this, "IDPRejectedClaimException")
            }
            name = "IDPRejectedClaimException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "IDPRejectedClaimException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        d32 = class A extends PL {
            static {
                jA(this, "InvalidIdentityTokenException")
            }
            name = "InvalidIdentityTokenException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "InvalidIdentityTokenException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        c32 = class A extends PL {
            static {
                jA(this, "IDPCommunicationErrorException")
            }
            name = "IDPCommunicationErrorException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "IDPCommunicationErrorException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        l32 = class A extends PL {
            static {
                jA(this, "InvalidAuthorizationMessageException")
            }
            name = "InvalidAuthorizationMessageException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "InvalidAuthorizationMessageException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        Qu = jA((A) => ({
            ...A,
            ...A.SecretAccessKey && {
                SecretAccessKey: sB.SENSITIVE_STRING
            }
        }), "CredentialsFilterSensitiveLog"),
        p32 = jA((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: Qu(A.Credentials)
            }
        }), "AssumeRoleResponseFilterSensitiveLog"),
        i32 = jA((A) => ({
            ...A,
            ...A.SAMLAssertion && {
                SAMLAssertion: sB.SENSITIVE_STRING
            }
        }), "AssumeRoleWithSAMLRequestFilterSensitiveLog"),
        n32 = jA((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: Qu(A.Credentials)
            }
        }), "AssumeRoleWithSAMLResponseFilterSensitiveLog"),
        a32 = jA((A) => ({
            ...A,
            ...A.WebIdentityToken && {
                WebIdentityToken: sB.SENSITIVE_STRING
            }
        }), "AssumeRoleWithWebIdentityRequestFilterSensitiveLog"),
        s32 = jA((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: Qu(A.Credentials)
            }
        }), "AssumeRoleWithWebIdentityResponseFilterSensitiveLog"),
        r32 = jA((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: Qu(A.Credentials)
            }
        }), "AssumeRootResponseFilterSensitiveLog"),
        o32 = jA((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: Qu(A.Credentials)
            }
        }), "GetFederationTokenResponseFilterSensitiveLog"),
        t32 = jA((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: Qu(A.Credentials)
            }
        }), "GetSessionTokenResponseFilterSensitiveLog"),
        SL = HI(),
        yw4 = QX(),
        _w4 = jA(async (A, B) => {
            let Q = lT,
                Z;
            return Z = aT({
                ...G$4(A, B),
                [iT]: f$4,
                [nT]: pT
            }), cT(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleCommand"),
        xw4 = jA(async (A, B) => {
            let Q = lT,
                Z;
            return Z = aT({
                ...F$4(A, B),
                [iT]: h$4,
                [nT]: pT
            }), cT(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleWithSAMLCommand"),
        vw4 = jA(async (A, B) => {
            let Q = lT,
                Z;
            return Z = aT({
                ...I$4(A, B),
                [iT]: g$4,
                [nT]: pT
            }), cT(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleWithWebIdentityCommand"),
        bw4 = jA(async (A, B) => {
            let Q = lT,
                Z;
            return Z = aT({
                ...Y$4(A, B),
                [iT]: u$4,
                [nT]: pT
            }), cT(B, Q, "/", void 0, Z)
        }, "se_AssumeRootCommand"),
        fw4 = jA(async (A, B) => {
            let Q = lT,
                Z;
            return Z = aT({
                ...W$4(A, B),
                [iT]: m$4,
                [nT]: pT
            }), cT(B, Q, "/", void 0, Z)
        }, "se_DecodeAuthorizationMessageCommand"),
        hw4 = jA(async (A, B) => {
            let Q = lT,
                Z;
            return Z = aT({
                ...J$4(A, B),
                [iT]: d$4,
                [nT]: pT
            }), cT(B, Q, "/", void 0, Z)
        }, "se_GetAccessKeyInfoCommand"),
        gw4 = jA(async (A, B) => {
            let Q = lT,
                Z;
            return Z = aT({
                ...X$4(A, B),
                [iT]: c$4,
                [nT]: pT
            }), cT(B, Q, "/", void 0, Z)
        }, "se_GetCallerIdentityCommand"),
        uw4 = jA(async (A, B) => {
            let Q = lT,
                Z;
            return Z = aT({
                ...V$4(A, B),
                [iT]: l$4,
                [nT]: pT
            }), cT(B, Q, "/", void 0, Z)
        }, "se_GetFederationTokenCommand"),
        mw4 = jA(async (A, B) => {
            let Q = lT,
                Z;
            return Z = aT({
                ...C$4(A, B),
                [iT]: p$4,
                [nT]: pT
            }), cT(B, Q, "/", void 0, Z)
        }, "se_GetSessionTokenCommand"),
        dw4 = jA(async (A, B) => {
            if (A.statusCode >= 300) return dT(A, B);
            let Q = await SL.parseXmlBody(A.body, B),
                Z = {};
            return Z = U$4(Q.AssumeRoleResult, B), {
                $metadata: dY(A),
                ...Z
            }
        }, "de_AssumeRoleCommand"),
        cw4 = jA(async (A, B) => {
            if (A.statusCode >= 300) return dT(A, B);
            let Q = await SL.parseXmlBody(A.body, B),
                Z = {};
            return Z = w$4(Q.AssumeRoleWithSAMLResult, B), {
                $metadata: dY(A),
                ...Z
            }
        }, "de_AssumeRoleWithSAMLCommand"),
        lw4 = jA(async (A, B) => {
            if (A.statusCode >= 300) return dT(A, B);
            let Q = await SL.parseXmlBody(A.body, B),
                Z = {};
            return Z = $$4(Q.AssumeRoleWithWebIdentityResult, B), {
                $metadata: dY(A),
                ...Z
            }
        }, "de_AssumeRoleWithWebIdentityCommand"),
        pw4 = jA(async (A, B) => {
            if (A.statusCode >= 300) return dT(A, B);
            let Q = await SL.parseXmlBody(A.body, B),
                Z = {};
            return Z = q$4(Q.AssumeRootResult, B), {
                $metadata: dY(A),
                ...Z
            }
        }, "de_AssumeRootCommand"),
        iw4 = jA(async (A, B) => {
            if (A.statusCode >= 300) return dT(A, B);
            let Q = await SL.parseXmlBody(A.body, B),
                Z = {};
            return Z = N$4(Q.DecodeAuthorizationMessageResult, B), {
                $metadata: dY(A),
                ...Z
            }
        }, "de_DecodeAuthorizationMessageCommand"),
        nw4 = jA(async (A, B) => {
            if (A.statusCode >= 300) return dT(A, B);
            let Q = await SL.parseXmlBody(A.body, B),
                Z = {};
            return Z = R$4(Q.GetAccessKeyInfoResult, B), {
                $metadata: dY(A),
                ...Z
            }
        }, "de_GetAccessKeyInfoCommand"),
        aw4 = jA(async (A, B) => {
            if (A.statusCode >= 300) return dT(A, B);
            let Q = await SL.parseXmlBody(A.body, B),
                Z = {};
            return Z = O$4(Q.GetCallerIdentityResult, B), {
                $metadata: dY(A),
                ...Z
            }
        }, "de_GetCallerIdentityCommand"),
        sw4 = jA(async (A, B) => {
            if (A.statusCode >= 300) return dT(A, B);
            let Q = await SL.parseXmlBody(A.body, B),
                Z = {};
            return Z = T$4(Q.GetFederationTokenResult, B), {
                $metadata: dY(A),
                ...Z
            }
        }, "de_GetFederationTokenCommand"),
        rw4 = jA(async (A, B) => {
            if (A.statusCode >= 300) return dT(A, B);
            let Q = await SL.parseXmlBody(A.body, B),
                Z = {};
            return Z = P$4(Q.GetSessionTokenResult, B), {
                $metadata: dY(A),
                ...Z
            }
        }, "de_GetSessionTokenCommand"),
        dT = jA(async (A, B) => {
            let Q = {
                    ...A,
                    body: await SL.parseXmlErrorBody(A.body, B)
                },
                Z = i$4(A, Q.body);
            switch (Z) {
                case "ExpiredTokenException":
                case "com.amazonaws.sts#ExpiredTokenException":
                    throw await ow4(Q, B);
                case "MalformedPolicyDocument":
                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                    throw await Q$4(Q, B);
                case "PackedPolicyTooLarge":
                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                    throw await Z$4(Q, B);
                case "RegionDisabledException":
                case "com.amazonaws.sts#RegionDisabledException":
                    throw await D$4(Q, B);
                case "IDPRejectedClaim":
                case "com.amazonaws.sts#IDPRejectedClaimException":
                    throw await ew4(Q, B);
                case "InvalidIdentityToken":
                case "com.amazonaws.sts#InvalidIdentityTokenException":
                    throw await B$4(Q, B);
                case "IDPCommunicationError":
                case "com.amazonaws.sts#IDPCommunicationErrorException":
                    throw await tw4(Q, B);
                case "InvalidAuthorizationMessageException":
                case "com.amazonaws.sts#InvalidAuthorizationMessageException":
                    throw await A$4(Q, B);
                default:
                    let D = Q.body;
                    return b$4({
                        output: A,
                        parsedBody: D.Error,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        ow4 = jA(async (A, B) => {
            let Q = A.body,
                Z = L$4(Q.Error, B),
                D = new f32({
                    $metadata: dY(A),
                    ...Z
                });
            return sB.decorateServiceException(D, Q)
        }, "de_ExpiredTokenExceptionRes"),
        tw4 = jA(async (A, B) => {
            let Q = A.body,
                Z = S$4(Q.Error, B),
                D = new c32({
                    $metadata: dY(A),
                    ...Z
                });
            return sB.decorateServiceException(D, Q)
        }, "de_IDPCommunicationErrorExceptionRes"),
        ew4 = jA(async (A, B) => {
            let Q = A.body,
                Z = j$4(Q.Error, B),
                D = new m32({
                    $metadata: dY(A),
                    ...Z
                });
            return sB.decorateServiceException(D, Q)
        }, "de_IDPRejectedClaimExceptionRes"),
        A$4 = jA(async (A, B) => {
            let Q = A.body,
                Z = k$4(Q.Error, B),
                D = new l32({
                    $metadata: dY(A),
                    ...Z
                });
            return sB.decorateServiceException(D, Q)
        }, "de_InvalidAuthorizationMessageExceptionRes"),
        B$4 = jA(async (A, B) => {
            let Q = A.body,
                Z = y$4(Q.Error, B),
                D = new d32({
                    $metadata: dY(A),
                    ...Z
                });
            return sB.decorateServiceException(D, Q)
        }, "de_InvalidIdentityTokenExceptionRes"),
        Q$4 = jA(async (A, B) => {
            let Q = A.body,
                Z = _$4(Q.Error, B),
                D = new h32({
                    $metadata: dY(A),
                    ...Z
                });
            return sB.decorateServiceException(D, Q)
        }, "de_MalformedPolicyDocumentExceptionRes"),
        Z$4 = jA(async (A, B) => {
            let Q = A.body,
                Z = x$4(Q.Error, B),
                D = new g32({
                    $metadata: dY(A),
                    ...Z
                });
            return sB.decorateServiceException(D, Q)
        }, "de_PackedPolicyTooLargeExceptionRes"),
        D$4 = jA(async (A, B) => {
            let Q = A.body,
                Z = v$4(Q.Error, B),
                D = new u32({
                    $metadata: dY(A),
                    ...Z
                });
            return sB.decorateServiceException(D, Q)
        }, "de_RegionDisabledExceptionRes"),
        G$4 = jA((A, B) => {
            let Q = {};
            if (A[gT] != null) Q[gT] = A[gT];
            if (A[Rr] != null) Q[Rr] = A[Rr];
            if (A[oz] != null) {
                let Z = DL1(A[oz], B);
                if (A[oz]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[rz] != null) Q[rz] = A[rz];
            if (A[EI] != null) Q[EI] = A[EI];
            if (A[Tr] != null) {
                let Z = A72(A[Tr], B);
                if (A[Tr]?.length === 0) Q.Tags = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `Tags.${D}`;
                    Q[F] = G
                })
            }
            if (A[e50] != null) {
                let Z = E$4(A[e50], B);
                if (A[e50]?.length === 0) Q.TransitiveTagKeys = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `TransitiveTagKeys.${D}`;
                    Q[F] = G
                })
            }
            if (A[_50] != null) Q[_50] = A[_50];
            if (A[Or] != null) Q[Or] = A[Or];
            if (A[Pr] != null) Q[Pr] = A[Pr];
            if (A[ZX] != null) Q[ZX] = A[ZX];
            if (A[c50] != null) {
                let Z = H$4(A[c50], B);
                if (A[c50]?.length === 0) Q.ProvidedContexts = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `ProvidedContexts.${D}`;
                    Q[F] = G
                })
            }
            return Q
        }, "se_AssumeRoleRequest"),
        F$4 = jA((A, B) => {
            let Q = {};
            if (A[gT] != null) Q[gT] = A[gT];
            if (A[m50] != null) Q[m50] = A[m50];
            if (A[a50] != null) Q[a50] = A[a50];
            if (A[oz] != null) {
                let Z = DL1(A[oz], B);
                if (A[oz]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[rz] != null) Q[rz] = A[rz];
            if (A[EI] != null) Q[EI] = A[EI];
            return Q
        }, "se_AssumeRoleWithSAMLRequest"),
        I$4 = jA((A, B) => {
            let Q = {};
            if (A[gT] != null) Q[gT] = A[gT];
            if (A[Rr] != null) Q[Rr] = A[Rr];
            if (A[Q30] != null) Q[Q30] = A[Q30];
            if (A[l50] != null) Q[l50] = A[l50];
            if (A[oz] != null) {
                let Z = DL1(A[oz], B);
                if (A[oz]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[rz] != null) Q[rz] = A[rz];
            if (A[EI] != null) Q[EI] = A[EI];
            return Q
        }, "se_AssumeRoleWithWebIdentityRequest"),
        Y$4 = jA((A, B) => {
            let Q = {};
            if (A[t50] != null) Q[t50] = A[t50];
            if (A[v32] != null) {
                let Z = e32(A[v32], B);
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `TaskPolicyArn.${D}`;
                    Q[F] = G
                })
            }
            if (A[EI] != null) Q[EI] = A[EI];
            return Q
        }, "se_AssumeRootRequest"),
        W$4 = jA((A, B) => {
            let Q = {};
            if (A[x50] != null) Q[x50] = A[x50];
            return Q
        }, "se_DecodeAuthorizationMessageRequest"),
        J$4 = jA((A, B) => {
            let Q = {};
            if (A[Nr] != null) Q[Nr] = A[Nr];
            return Q
        }, "se_GetAccessKeyInfoRequest"),
        X$4 = jA((A, B) => {
            return {}
        }, "se_GetCallerIdentityRequest"),
        V$4 = jA((A, B) => {
            let Q = {};
            if (A[g50] != null) Q[g50] = A[g50];
            if (A[rz] != null) Q[rz] = A[rz];
            if (A[oz] != null) {
                let Z = DL1(A[oz], B);
                if (A[oz]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[EI] != null) Q[EI] = A[EI];
            if (A[Tr] != null) {
                let Z = A72(A[Tr], B);
                if (A[Tr]?.length === 0) Q.Tags = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `Tags.${D}`;
                    Q[F] = G
                })
            }
            return Q
        }, "se_GetFederationTokenRequest"),
        C$4 = jA((A, B) => {
            let Q = {};
            if (A[EI] != null) Q[EI] = A[EI];
            if (A[Or] != null) Q[Or] = A[Or];
            if (A[Pr] != null) Q[Pr] = A[Pr];
            return Q
        }, "se_GetSessionTokenRequest"),
        DL1 = jA((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = e32(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_policyDescriptorListType"),
        e32 = jA((A, B) => {
            let Q = {};
            if (A[Z30] != null) Q[Z30] = A[Z30];
            return Q
        }, "se_PolicyDescriptorType"),
        K$4 = jA((A, B) => {
            let Q = {};
            if (A[d50] != null) Q[d50] = A[d50];
            if (A[j50] != null) Q[j50] = A[j50];
            return Q
        }, "se_ProvidedContext"),
        H$4 = jA((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = K$4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_ProvidedContextsListType"),
        z$4 = jA((A, B) => {
            let Q = {};
            if (A[h50] != null) Q[h50] = A[h50];
            if (A[B30] != null) Q[B30] = A[B30];
            return Q
        }, "se_Tag"),
        E$4 = jA((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                Q[`member.${Z}`] = D, Z++
            }
            return Q
        }, "se_tagKeyListType"),
        A72 = jA((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = z$4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_tagListType"),
        I30 = jA((A, B) => {
            let Q = {};
            if (A[S50] != null) Q[S50] = sB.expectString(A[S50]);
            if (A[hT] != null) Q[hT] = sB.expectString(A[hT]);
            return Q
        }, "de_AssumedRoleUser"),
        U$4 = jA((A, B) => {
            let Q = {};
            if (A[zI] != null) Q[zI] = Sr(A[zI], B);
            if (A[fT] != null) Q[fT] = I30(A[fT], B);
            if (A[tz] != null) Q[tz] = sB.strictParseInt32(A[tz]);
            if (A[ZX] != null) Q[ZX] = sB.expectString(A[ZX]);
            return Q
        }, "de_AssumeRoleResponse"),
        w$4 = jA((A, B) => {
            let Q = {};
            if (A[zI] != null) Q[zI] = Sr(A[zI], B);
            if (A[fT] != null) Q[fT] = I30(A[fT], B);
            if (A[tz] != null) Q[tz] = sB.strictParseInt32(A[tz]);
            if (A[i50] != null) Q[i50] = sB.expectString(A[i50]);
            if (A[r50] != null) Q[r50] = sB.expectString(A[r50]);
            if (A[f50] != null) Q[f50] = sB.expectString(A[f50]);
            if (A[Mr] != null) Q[Mr] = sB.expectString(A[Mr]);
            if (A[u50] != null) Q[u50] = sB.expectString(A[u50]);
            if (A[ZX] != null) Q[ZX] = sB.expectString(A[ZX]);
            return Q
        }, "de_AssumeRoleWithSAMLResponse"),
        $$4 = jA((A, B) => {
            let Q = {};
            if (A[zI] != null) Q[zI] = Sr(A[zI], B);
            if (A[s50] != null) Q[s50] = sB.expectString(A[s50]);
            if (A[fT] != null) Q[fT] = I30(A[fT], B);
            if (A[tz] != null) Q[tz] = sB.strictParseInt32(A[tz]);
            if (A[p50] != null) Q[p50] = sB.expectString(A[p50]);
            if (A[Mr] != null) Q[Mr] = sB.expectString(A[Mr]);
            if (A[ZX] != null) Q[ZX] = sB.expectString(A[ZX]);
            return Q
        }, "de_AssumeRoleWithWebIdentityResponse"),
        q$4 = jA((A, B) => {
            let Q = {};
            if (A[zI] != null) Q[zI] = Sr(A[zI], B);
            if (A[ZX] != null) Q[ZX] = sB.expectString(A[ZX]);
            return Q
        }, "de_AssumeRootResponse"),
        Sr = jA((A, B) => {
            let Q = {};
            if (A[Nr] != null) Q[Nr] = sB.expectString(A[Nr]);
            if (A[n50] != null) Q[n50] = sB.expectString(A[n50]);
            if (A[o50] != null) Q[o50] = sB.expectString(A[o50]);
            if (A[y50] != null) Q[y50] = sB.expectNonNull(sB.parseRfc3339DateTimeWithOffset(A[y50]));
            return Q
        }, "de_Credentials"),
        N$4 = jA((A, B) => {
            let Q = {};
            if (A[k50] != null) Q[k50] = sB.expectString(A[k50]);
            return Q
        }, "de_DecodeAuthorizationMessageResponse"),
        L$4 = jA((A, B) => {
            let Q = {};
            if (A[$Z] != null) Q[$Z] = sB.expectString(A[$Z]);
            return Q
        }, "de_ExpiredTokenException"),
        M$4 = jA((A, B) => {
            let Q = {};
            if (A[b50] != null) Q[b50] = sB.expectString(A[b50]);
            if (A[hT] != null) Q[hT] = sB.expectString(A[hT]);
            return Q
        }, "de_FederatedUser"),
        R$4 = jA((A, B) => {
            let Q = {};
            if (A[Lr] != null) Q[Lr] = sB.expectString(A[Lr]);
            return Q
        }, "de_GetAccessKeyInfoResponse"),
        O$4 = jA((A, B) => {
            let Q = {};
            if (A[A30] != null) Q[A30] = sB.expectString(A[A30]);
            if (A[Lr] != null) Q[Lr] = sB.expectString(A[Lr]);
            if (A[hT] != null) Q[hT] = sB.expectString(A[hT]);
            return Q
        }, "de_GetCallerIdentityResponse"),
        T$4 = jA((A, B) => {
            let Q = {};
            if (A[zI] != null) Q[zI] = Sr(A[zI], B);
            if (A[v50] != null) Q[v50] = M$4(A[v50], B);
            if (A[tz] != null) Q[tz] = sB.strictParseInt32(A[tz]);
            return Q
        }, "de_GetFederationTokenResponse"),
        P$4 = jA((A, B) => {
            let Q = {};
            if (A[zI] != null) Q[zI] = Sr(A[zI], B);
            return Q
        }, "de_GetSessionTokenResponse"),
        S$4 = jA((A, B) => {
            let Q = {};
            if (A[$Z] != null) Q[$Z] = sB.expectString(A[$Z]);
            return Q
        }, "de_IDPCommunicationErrorException"),
        j$4 = jA((A, B) => {
            let Q = {};
            if (A[$Z] != null) Q[$Z] = sB.expectString(A[$Z]);
            return Q
        }, "de_IDPRejectedClaimException"),
        k$4 = jA((A, B) => {
            let Q = {};
            if (A[$Z] != null) Q[$Z] = sB.expectString(A[$Z]);
            return Q
        }, "de_InvalidAuthorizationMessageException"),
        y$4 = jA((A, B) => {
            let Q = {};
            if (A[$Z] != null) Q[$Z] = sB.expectString(A[$Z]);
            return Q
        }, "de_InvalidIdentityTokenException"),
        _$4 = jA((A, B) => {
            let Q = {};
            if (A[$Z] != null) Q[$Z] = sB.expectString(A[$Z]);
            return Q
        }, "de_MalformedPolicyDocumentException"),
        x$4 = jA((A, B) => {
            let Q = {};
            if (A[$Z] != null) Q[$Z] = sB.expectString(A[$Z]);
            return Q
        }, "de_PackedPolicyTooLargeException"),
        v$4 = jA((A, B) => {
            let Q = {};
            if (A[$Z] != null) Q[$Z] = sB.expectString(A[$Z]);
            return Q
        }, "de_RegionDisabledException"),
        dY = jA((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        b$4 = sB.withBaseException(PL),
        cT = jA(async (A, B, Q, Z, D) => {
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
            return new yw4.HttpRequest(W)
        }, "buildHttpRpcRequest"),
        lT = {
            "content-type": "application/x-www-form-urlencoded"
        },
        pT = "2011-06-15",
        iT = "Action",
        Nr = "AccessKeyId",
        f$4 = "AssumeRole",
        S50 = "AssumedRoleId",
        fT = "AssumedRoleUser",
        h$4 = "AssumeRoleWithSAML",
        g$4 = "AssumeRoleWithWebIdentity",
        u$4 = "AssumeRoot",
        Lr = "Account",
        hT = "Arn",
        Mr = "Audience",
        zI = "Credentials",
        j50 = "ContextAssertion",
        m$4 = "DecodeAuthorizationMessage",
        k50 = "DecodedMessage",
        EI = "DurationSeconds",
        y50 = "Expiration",
        _50 = "ExternalId",
        x50 = "EncodedMessage",
        v50 = "FederatedUser",
        b50 = "FederatedUserId",
        d$4 = "GetAccessKeyInfo",
        c$4 = "GetCallerIdentity",
        l$4 = "GetFederationToken",
        p$4 = "GetSessionToken",
        f50 = "Issuer",
        h50 = "Key",
        g50 = "Name",
        u50 = "NameQualifier",
        rz = "Policy",
        oz = "PolicyArns",
        m50 = "PrincipalArn",
        d50 = "ProviderArn",
        c50 = "ProvidedContexts",
        l50 = "ProviderId",
        tz = "PackedPolicySize",
        p50 = "Provider",
        gT = "RoleArn",
        Rr = "RoleSessionName",
        i50 = "Subject",
        n50 = "SecretAccessKey",
        a50 = "SAMLAssertion",
        s50 = "SubjectFromWebIdentityToken",
        ZX = "SourceIdentity",
        Or = "SerialNumber",
        r50 = "SubjectType",
        o50 = "SessionToken",
        Tr = "Tags",
        Pr = "TokenCode",
        t50 = "TargetPrincipal",
        v32 = "TaskPolicyArn",
        e50 = "TransitiveTagKeys",
        A30 = "UserId",
        nT = "Version",
        B30 = "Value",
        Q30 = "WebIdentityToken",
        Z30 = "arn",
        $Z = "message",
        aT = jA((A) => Object.entries(A).map(([B, Q]) => sB.extendedEncodeURIComponent(B) + "=" + sB.extendedEncodeURIComponent(Q)).join("&"), "buildFormUrlencodedString"),
        i$4 = jA((A, B) => {
            if (B.Error?.Code !== void 0) return B.Error.Code;
            if (A.statusCode == 404) return "NotFound"
        }, "loadQueryErrorCode"),
        Y30 = class extends sB.Command.classBuilder().ep(kw4.commonParams).m(function(A, B, Q, Z) {
            return [mT.getSerdePlugin(Q, this.serialize, this.deserialize), uT.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(void 0, p32).ser(_w4).de(dw4).build() {
            static {
                jA(this, "AssumeRoleCommand")
            }
        },
        n$4 = dz(),
        B72 = class extends sB.Command.classBuilder().ep(n$4.commonParams).m(function(A, B, Q, Z) {
            return [mT.getSerdePlugin(Q, this.serialize, this.deserialize), uT.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithSAML", {}).n("STSClient", "AssumeRoleWithSAMLCommand").f(i32, n32).ser(xw4).de(cw4).build() {
            static {
                jA(this, "AssumeRoleWithSAMLCommand")
            }
        },
        a$4 = dz(),
        W30 = class extends sB.Command.classBuilder().ep(a$4.commonParams).m(function(A, B, Q, Z) {
            return [mT.getSerdePlugin(Q, this.serialize, this.deserialize), uT.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(a32, s32).ser(vw4).de(lw4).build() {
            static {
                jA(this, "AssumeRoleWithWebIdentityCommand")
            }
        },
        s$4 = dz(),
        Q72 = class extends sB.Command.classBuilder().ep(s$4.commonParams).m(function(A, B, Q, Z) {
            return [mT.getSerdePlugin(Q, this.serialize, this.deserialize), uT.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRoot", {}).n("STSClient", "AssumeRootCommand").f(void 0, r32).ser(bw4).de(pw4).build() {
            static {
                jA(this, "AssumeRootCommand")
            }
        },
        r$4 = dz(),
        Z72 = class extends sB.Command.classBuilder().ep(r$4.commonParams).m(function(A, B, Q, Z) {
            return [mT.getSerdePlugin(Q, this.serialize, this.deserialize), uT.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "DecodeAuthorizationMessage", {}).n("STSClient", "DecodeAuthorizationMessageCommand").f(void 0, void 0).ser(fw4).de(iw4).build() {
            static {
                jA(this, "DecodeAuthorizationMessageCommand")
            }
        },
        o$4 = dz(),
        D72 = class extends sB.Command.classBuilder().ep(o$4.commonParams).m(function(A, B, Q, Z) {
            return [mT.getSerdePlugin(Q, this.serialize, this.deserialize), uT.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "GetAccessKeyInfo", {}).n("STSClient", "GetAccessKeyInfoCommand").f(void 0, void 0).ser(hw4).de(nw4).build() {
            static {
                jA(this, "GetAccessKeyInfoCommand")
            }
        },
        t$4 = dz(),
        G72 = class extends sB.Command.classBuilder().ep(t$4.commonParams).m(function(A, B, Q, Z) {
            return [mT.getSerdePlugin(Q, this.serialize, this.deserialize), uT.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "GetCallerIdentity", {}).n("STSClient", "GetCallerIdentityCommand").f(void 0, void 0).ser(gw4).de(aw4).build() {
            static {
                jA(this, "GetCallerIdentityCommand")
            }
        },
        e$4 = dz(),
        F72 = class extends sB.Command.classBuilder().ep(e$4.commonParams).m(function(A, B, Q, Z) {
            return [mT.getSerdePlugin(Q, this.serialize, this.deserialize), uT.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "GetFederationToken", {}).n("STSClient", "GetFederationTokenCommand").f(void 0, o32).ser(uw4).de(sw4).build() {
            static {
                jA(this, "GetFederationTokenCommand")
            }
        },
        Aq4 = dz(),
        I72 = class extends sB.Command.classBuilder().ep(Aq4.commonParams).m(function(A, B, Q, Z) {
            return [mT.getSerdePlugin(Q, this.serialize, this.deserialize), uT.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "GetSessionToken", {}).n("STSClient", "GetSessionTokenCommand").f(void 0, t32).ser(mw4).de(rw4).build() {
            static {
                jA(this, "GetSessionTokenCommand")
            }
        },
        Bq4 = N81(),
        Qq4 = {
            AssumeRoleCommand: Y30,
            AssumeRoleWithSAMLCommand: B72,
            AssumeRoleWithWebIdentityCommand: W30,
            AssumeRootCommand: Q72,
            DecodeAuthorizationMessageCommand: Z72,
            GetAccessKeyInfoCommand: D72,
            GetCallerIdentityCommand: G72,
            GetFederationTokenCommand: F72,
            GetSessionTokenCommand: I72
        },
        Y72 = class extends Bq4.STSClient {
            static {
                jA(this, "STS")
            }
        };
    sB.createAggregatedClient(Qq4, Y72);
    var Zq4 = dz(),
        G30 = mz(),
        b32 = "us-east-1",
        W72 = jA((A) => {
            if (typeof A?.Arn === "string") {
                let B = A.Arn.split(":");
                if (B.length > 4 && B[4] !== "") return B[4]
            }
            return
        }, "getAccountIdFromAssumedRoleUser"),
        J72 = jA(async (A, B, Q) => {
            let Z = typeof A === "function" ? await A() : A,
                D = typeof B === "function" ? await B() : B;
            return Q?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${Z} (provider)`, `${D} (parent client)`, `${b32} (STS default)`), Z ?? D ?? b32
        }, "resolveRegion"),
        Dq4 = jA((A, B) => {
            let Q, Z;
            return async (D, G) => {
                if (Z = D, !Q) {
                    let {
                        logger: J = A?.parentClientConfig?.logger,
                        region: X,
                        requestHandler: V = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: C
                    } = A, K = await J72(X, A?.parentClientConfig?.region, C), H = !X72(V);
                    Q = new B({
                        profile: A?.parentClientConfig?.profile,
                        credentialDefaultProvider: jA(() => async () => Z, "credentialDefaultProvider"),
                        region: K,
                        requestHandler: H ? V : void 0,
                        logger: J
                    })
                }
                let {
                    Credentials: F,
                    AssumedRoleUser: I
                } = await Q.send(new Y30(G));
                if (!F || !F.AccessKeyId || !F.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${G.RoleArn}`);
                let Y = W72(I),
                    W = {
                        accessKeyId: F.AccessKeyId,
                        secretAccessKey: F.SecretAccessKey,
                        sessionToken: F.SessionToken,
                        expiration: F.Expiration,
                        ...F.CredentialScope && {
                            credentialScope: F.CredentialScope
                        },
                        ...Y && {
                            accountId: Y
                        }
                    };
                return G30.setCredentialFeature(W, "CREDENTIALS_STS_ASSUME_ROLE", "i"), W
            }
        }, "getDefaultRoleAssumer"),
        Gq4 = jA((A, B) => {
            let Q;
            return async (Z) => {
                if (!Q) {
                    let {
                        logger: Y = A?.parentClientConfig?.logger,
                        region: W,
                        requestHandler: J = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: X
                    } = A, V = await J72(W, A?.parentClientConfig?.region, X), C = !X72(J);
                    Q = new B({
                        profile: A?.parentClientConfig?.profile,
                        region: V,
                        requestHandler: C ? J : void 0,
                        logger: Y
                    })
                }
                let {
                    Credentials: D,
                    AssumedRoleUser: G
                } = await Q.send(new W30(Z));
                if (!D || !D.AccessKeyId || !D.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${Z.RoleArn}`);
                let F = W72(G),
                    I = {
                        accessKeyId: D.AccessKeyId,
                        secretAccessKey: D.SecretAccessKey,
                        sessionToken: D.SessionToken,
                        expiration: D.Expiration,
                        ...D.CredentialScope && {
                            credentialScope: D.CredentialScope
                        },
                        ...F && {
                            accountId: F
                        }
                    };
                if (F) G30.setCredentialFeature(I, "RESOLVED_ACCOUNT_ID", "T");
                return G30.setCredentialFeature(I, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k"), I
            }
        }, "getDefaultRoleAssumerWithWebIdentity"),
        X72 = jA((A) => {
            return A?.metadata?.handlerProtocol === "h2"
        }, "isH2"),
        V72 = N81(),
        C72 = jA((A, B) => {
            if (!B) return A;
            else return class Q extends A {
                static {
                    jA(this, "CustomizableSTSClient")
                }
                constructor(Z) {
                    super(Z);
                    for (let D of B) this.middlewareStack.use(D)
                }
            }
        }, "getCustomizableStsClientCtor"),
        K72 = jA((A = {}, B) => Dq4(A, C72(V72.STSClient, B)), "getDefaultRoleAssumer"),
        H72 = jA((A = {}, B) => Gq4(A, C72(V72.STSClient, B)), "getDefaultRoleAssumerWithWebIdentity"),
        Fq4 = jA((A) => (B) => A({
            roleAssumer: K72(B),
            roleAssumerWithWebIdentity: H72(B),
            ...B
        }), "decorateDefaultCredentialProvider")
});