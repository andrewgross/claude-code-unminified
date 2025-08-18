/* chunk:264 bytes:[5635089, 5663067) size:27978 source:unpacked-cli.js */
var JZ0 = E((IL5, WZ0) => {
    var {
        defineProperty: DM1,
        getOwnPropertyDescriptor: Kj4,
        getOwnPropertyNames: Hj4
    } = Object, zj4 = Object.prototype.hasOwnProperty, D9 = (A, B) => DM1(A, "name", {
        value: B,
        configurable: !0
    }), Ej4 = (A, B) => {
        for (var Q in B) DM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, QZ0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Hj4(B))
                if (!zj4.call(A, D) && D !== Q) DM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Kj4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Uj4 = (A, B, Q) => (QZ0(A, B, "default"), Q && QZ0(Q, B, "default")), wj4 = (A) => QZ0(DM1({}, "__esModule", {
        value: !0
    }), A), DZ0 = {};
    Ej4(DZ0, {
        AssumeRoleCommand: () => IZ0,
        AssumeRoleResponseFilterSensitiveLog: () => EJ2,
        AssumeRoleWithWebIdentityCommand: () => YZ0,
        AssumeRoleWithWebIdentityRequestFilterSensitiveLog: () => MJ2,
        AssumeRoleWithWebIdentityResponseFilterSensitiveLog: () => RJ2,
        ClientInputEndpointParameters: () => Xk4.ClientInputEndpointParameters,
        CredentialsFilterSensitiveLog: () => GZ0,
        ExpiredTokenException: () => UJ2,
        IDPCommunicationErrorException: () => OJ2,
        IDPRejectedClaimException: () => NJ2,
        InvalidIdentityTokenException: () => LJ2,
        MalformedPolicyDocumentException: () => wJ2,
        PackedPolicyTooLargeException: () => $J2,
        RegionDisabledException: () => qJ2,
        STS: () => fJ2,
        STSServiceException: () => BP,
        decorateDefaultCredentialProvider: () => Kk4,
        getDefaultRoleAssumer: () => cJ2,
        getDefaultRoleAssumerWithWebIdentity: () => lJ2
    });
    WZ0.exports = wj4(DZ0);
    Uj4(DZ0, A51(), WZ0.exports);
    var $j4 = H6(),
        qj4 = T6(),
        Nj4 = y3(),
        Lj4 = H6(),
        Mj4 = B51(),
        zJ2 = H6(),
        Rj4 = H6(),
        BP = class A extends Rj4.ServiceException {
            static {
                D9(this, "STSServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        GZ0 = D9((A) => ({
            ...A,
            ...A.SecretAccessKey && {
                SecretAccessKey: zJ2.SENSITIVE_STRING
            }
        }), "CredentialsFilterSensitiveLog"),
        EJ2 = D9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: GZ0(A.Credentials)
            }
        }), "AssumeRoleResponseFilterSensitiveLog"),
        UJ2 = class A extends BP {
            static {
                D9(this, "ExpiredTokenException")
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
        wJ2 = class A extends BP {
            static {
                D9(this, "MalformedPolicyDocumentException")
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
        $J2 = class A extends BP {
            static {
                D9(this, "PackedPolicyTooLargeException")
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
        qJ2 = class A extends BP {
            static {
                D9(this, "RegionDisabledException")
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
        NJ2 = class A extends BP {
            static {
                D9(this, "IDPRejectedClaimException")
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
        LJ2 = class A extends BP {
            static {
                D9(this, "InvalidIdentityTokenException")
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
        MJ2 = D9((A) => ({
            ...A,
            ...A.WebIdentityToken && {
                WebIdentityToken: zJ2.SENSITIVE_STRING
            }
        }), "AssumeRoleWithWebIdentityRequestFilterSensitiveLog"),
        RJ2 = D9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: GZ0(A.Credentials)
            }
        }), "AssumeRoleWithWebIdentityResponseFilterSensitiveLog"),
        OJ2 = class A extends BP {
            static {
                D9(this, "IDPCommunicationErrorException")
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
        FZ0 = UI(),
        Oj4 = vV(),
        L5 = H6(),
        Tj4 = D9(async (A, B) => {
            let Q = yJ2,
                Z;
            return Z = bJ2({
                ...hj4(A, B),
                [xJ2]: Qk4,
                [vJ2]: _J2
            }), kJ2(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleCommand"),
        Pj4 = D9(async (A, B) => {
            let Q = yJ2,
                Z;
            return Z = bJ2({
                ...gj4(A, B),
                [xJ2]: Zk4,
                [vJ2]: _J2
            }), kJ2(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleWithWebIdentityCommand"),
        Sj4 = D9(async (A, B) => {
            if (A.statusCode >= 300) return TJ2(A, B);
            let Q = await FZ0.parseXmlBody(A.body, B),
                Z = {};
            return Z = ij4(Q.AssumeRoleResult, B), {
                $metadata: QP(A),
                ...Z
            }
        }, "de_AssumeRoleCommand"),
        jj4 = D9(async (A, B) => {
            if (A.statusCode >= 300) return TJ2(A, B);
            let Q = await FZ0.parseXmlBody(A.body, B),
                Z = {};
            return Z = nj4(Q.AssumeRoleWithWebIdentityResult, B), {
                $metadata: QP(A),
                ...Z
            }
        }, "de_AssumeRoleWithWebIdentityCommand"),
        TJ2 = D9(async (A, B) => {
            let Q = {
                    ...A,
                    body: await FZ0.parseXmlErrorBody(A.body, B)
                },
                Z = Dk4(A, Q.body);
            switch (Z) {
                case "ExpiredTokenException":
                case "com.amazonaws.sts#ExpiredTokenException":
                    throw await kj4(Q, B);
                case "MalformedPolicyDocument":
                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                    throw await vj4(Q, B);
                case "PackedPolicyTooLarge":
                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                    throw await bj4(Q, B);
                case "RegionDisabledException":
                case "com.amazonaws.sts#RegionDisabledException":
                    throw await fj4(Q, B);
                case "IDPCommunicationError":
                case "com.amazonaws.sts#IDPCommunicationErrorException":
                    throw await yj4(Q, B);
                case "IDPRejectedClaim":
                case "com.amazonaws.sts#IDPRejectedClaimException":
                    throw await _j4(Q, B);
                case "InvalidIdentityToken":
                case "com.amazonaws.sts#InvalidIdentityTokenException":
                    throw await xj4(Q, B);
                default:
                    let D = Q.body;
                    return Bk4({
                        output: A,
                        parsedBody: D.Error,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        kj4 = D9(async (A, B) => {
            let Q = A.body,
                Z = aj4(Q.Error, B),
                D = new UJ2({
                    $metadata: QP(A),
                    ...Z
                });
            return L5.decorateServiceException(D, Q)
        }, "de_ExpiredTokenExceptionRes"),
        yj4 = D9(async (A, B) => {
            let Q = A.body,
                Z = sj4(Q.Error, B),
                D = new OJ2({
                    $metadata: QP(A),
                    ...Z
                });
            return L5.decorateServiceException(D, Q)
        }, "de_IDPCommunicationErrorExceptionRes"),
        _j4 = D9(async (A, B) => {
            let Q = A.body,
                Z = rj4(Q.Error, B),
                D = new NJ2({
                    $metadata: QP(A),
                    ...Z
                });
            return L5.decorateServiceException(D, Q)
        }, "de_IDPRejectedClaimExceptionRes"),
        xj4 = D9(async (A, B) => {
            let Q = A.body,
                Z = oj4(Q.Error, B),
                D = new LJ2({
                    $metadata: QP(A),
                    ...Z
                });
            return L5.decorateServiceException(D, Q)
        }, "de_InvalidIdentityTokenExceptionRes"),
        vj4 = D9(async (A, B) => {
            let Q = A.body,
                Z = tj4(Q.Error, B),
                D = new wJ2({
                    $metadata: QP(A),
                    ...Z
                });
            return L5.decorateServiceException(D, Q)
        }, "de_MalformedPolicyDocumentExceptionRes"),
        bj4 = D9(async (A, B) => {
            let Q = A.body,
                Z = ej4(Q.Error, B),
                D = new $J2({
                    $metadata: QP(A),
                    ...Z
                });
            return L5.decorateServiceException(D, Q)
        }, "de_PackedPolicyTooLargeExceptionRes"),
        fj4 = D9(async (A, B) => {
            let Q = A.body,
                Z = Ak4(Q.Error, B),
                D = new qJ2({
                    $metadata: QP(A),
                    ...Z
                });
            return L5.decorateServiceException(D, Q)
        }, "de_RegionDisabledExceptionRes"),
        hj4 = D9((A, B) => {
            let Q = {};
            if (A[Ao] != null) Q[Ao] = A[Ao];
            if (A[Bo] != null) Q[Bo] = A[Bo];
            if (A[tr] != null) {
                let Z = PJ2(A[tr], B);
                if (A[tr]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[or] != null) Q[or] = A[or];
            if (A[rr] != null) Q[rr] = A[rr];
            if (A[r70] != null) {
                let Z = pj4(A[r70], B);
                if (A[r70]?.length === 0) Q.Tags = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `Tags.${D}`;
                    Q[F] = G
                })
            }
            if (A[t70] != null) {
                let Z = lj4(A[t70], B);
                if (A[t70]?.length === 0) Q.TransitiveTagKeys = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `TransitiveTagKeys.${D}`;
                    Q[F] = G
                })
            }
            if (A[u70] != null) Q[u70] = A[u70];
            if (A[a70] != null) Q[a70] = A[a70];
            if (A[o70] != null) Q[o70] = A[o70];
            if (A[AP] != null) Q[AP] = A[AP];
            if (A[c70] != null) {
                let Z = dj4(A[c70], B);
                if (A[c70]?.length === 0) Q.ProvidedContexts = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `ProvidedContexts.${D}`;
                    Q[F] = G
                })
            }
            return Q
        }, "se_AssumeRoleRequest"),
        gj4 = D9((A, B) => {
            let Q = {};
            if (A[Ao] != null) Q[Ao] = A[Ao];
            if (A[Bo] != null) Q[Bo] = A[Bo];
            if (A[AZ0] != null) Q[AZ0] = A[AZ0];
            if (A[l70] != null) Q[l70] = A[l70];
            if (A[tr] != null) {
                let Z = PJ2(A[tr], B);
                if (A[tr]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[or] != null) Q[or] = A[or];
            if (A[rr] != null) Q[rr] = A[rr];
            return Q
        }, "se_AssumeRoleWithWebIdentityRequest"),
        PJ2 = D9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = uj4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_policyDescriptorListType"),
        uj4 = D9((A, B) => {
            let Q = {};
            if (A[BZ0] != null) Q[BZ0] = A[BZ0];
            return Q
        }, "se_PolicyDescriptorType"),
        mj4 = D9((A, B) => {
            let Q = {};
            if (A[d70] != null) Q[d70] = A[d70];
            if (A[h70] != null) Q[h70] = A[h70];
            return Q
        }, "se_ProvidedContext"),
        dj4 = D9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = mj4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_ProvidedContextsListType"),
        cj4 = D9((A, B) => {
            let Q = {};
            if (A[m70] != null) Q[m70] = A[m70];
            if (A[e70] != null) Q[e70] = A[e70];
            return Q
        }, "se_Tag"),
        lj4 = D9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                Q[`member.${Z}`] = D, Z++
            }
            return Q
        }, "se_tagKeyListType"),
        pj4 = D9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = cj4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_tagListType"),
        SJ2 = D9((A, B) => {
            let Q = {};
            if (A[v70] != null) Q[v70] = L5.expectString(A[v70]);
            if (A[b70] != null) Q[b70] = L5.expectString(A[b70]);
            return Q
        }, "de_AssumedRoleUser"),
        ij4 = D9((A, B) => {
            let Q = {};
            if (A[sr] != null) Q[sr] = jJ2(A[sr], B);
            if (A[ar] != null) Q[ar] = SJ2(A[ar], B);
            if (A[er] != null) Q[er] = L5.strictParseInt32(A[er]);
            if (A[AP] != null) Q[AP] = L5.expectString(A[AP]);
            return Q
        }, "de_AssumeRoleResponse"),
        nj4 = D9((A, B) => {
            let Q = {};
            if (A[sr] != null) Q[sr] = jJ2(A[sr], B);
            if (A[n70] != null) Q[n70] = L5.expectString(A[n70]);
            if (A[ar] != null) Q[ar] = SJ2(A[ar], B);
            if (A[er] != null) Q[er] = L5.strictParseInt32(A[er]);
            if (A[p70] != null) Q[p70] = L5.expectString(A[p70]);
            if (A[f70] != null) Q[f70] = L5.expectString(A[f70]);
            if (A[AP] != null) Q[AP] = L5.expectString(A[AP]);
            return Q
        }, "de_AssumeRoleWithWebIdentityResponse"),
        jJ2 = D9((A, B) => {
            let Q = {};
            if (A[x70] != null) Q[x70] = L5.expectString(A[x70]);
            if (A[i70] != null) Q[i70] = L5.expectString(A[i70]);
            if (A[s70] != null) Q[s70] = L5.expectString(A[s70]);
            if (A[g70] != null) Q[g70] = L5.expectNonNull(L5.parseRfc3339DateTimeWithOffset(A[g70]));
            return Q
        }, "de_Credentials"),
        aj4 = D9((A, B) => {
            let Q = {};
            if (A[IG] != null) Q[IG] = L5.expectString(A[IG]);
            return Q
        }, "de_ExpiredTokenException"),
        sj4 = D9((A, B) => {
            let Q = {};
            if (A[IG] != null) Q[IG] = L5.expectString(A[IG]);
            return Q
        }, "de_IDPCommunicationErrorException"),
        rj4 = D9((A, B) => {
            let Q = {};
            if (A[IG] != null) Q[IG] = L5.expectString(A[IG]);
            return Q
        }, "de_IDPRejectedClaimException"),
        oj4 = D9((A, B) => {
            let Q = {};
            if (A[IG] != null) Q[IG] = L5.expectString(A[IG]);
            return Q
        }, "de_InvalidIdentityTokenException"),
        tj4 = D9((A, B) => {
            let Q = {};
            if (A[IG] != null) Q[IG] = L5.expectString(A[IG]);
            return Q
        }, "de_MalformedPolicyDocumentException"),
        ej4 = D9((A, B) => {
            let Q = {};
            if (A[IG] != null) Q[IG] = L5.expectString(A[IG]);
            return Q
        }, "de_PackedPolicyTooLargeException"),
        Ak4 = D9((A, B) => {
            let Q = {};
            if (A[IG] != null) Q[IG] = L5.expectString(A[IG]);
            return Q
        }, "de_RegionDisabledException"),
        QP = D9((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        Bk4 = L5.withBaseException(BP),
        kJ2 = D9(async (A, B, Q, Z, D) => {
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
            return new Oj4.HttpRequest(W)
        }, "buildHttpRpcRequest"),
        yJ2 = {
            "content-type": "application/x-www-form-urlencoded"
        },
        _J2 = "2011-06-15",
        xJ2 = "Action",
        x70 = "AccessKeyId",
        Qk4 = "AssumeRole",
        v70 = "AssumedRoleId",
        ar = "AssumedRoleUser",
        Zk4 = "AssumeRoleWithWebIdentity",
        b70 = "Arn",
        f70 = "Audience",
        sr = "Credentials",
        h70 = "ContextAssertion",
        rr = "DurationSeconds",
        g70 = "Expiration",
        u70 = "ExternalId",
        m70 = "Key",
        or = "Policy",
        tr = "PolicyArns",
        d70 = "ProviderArn",
        c70 = "ProvidedContexts",
        l70 = "ProviderId",
        er = "PackedPolicySize",
        p70 = "Provider",
        Ao = "RoleArn",
        Bo = "RoleSessionName",
        i70 = "SecretAccessKey",
        n70 = "SubjectFromWebIdentityToken",
        AP = "SourceIdentity",
        a70 = "SerialNumber",
        s70 = "SessionToken",
        r70 = "Tags",
        o70 = "TokenCode",
        t70 = "TransitiveTagKeys",
        vJ2 = "Version",
        e70 = "Value",
        AZ0 = "WebIdentityToken",
        BZ0 = "arn",
        IG = "message",
        bJ2 = D9((A) => Object.entries(A).map(([B, Q]) => L5.extendedEncodeURIComponent(B) + "=" + L5.extendedEncodeURIComponent(Q)).join("&"), "buildFormUrlencodedString"),
        Dk4 = D9((A, B) => {
            if (B.Error?.Code !== void 0) return B.Error.Code;
            if (A.statusCode == 404) return "NotFound"
        }, "loadQueryErrorCode"),
        IZ0 = class extends Lj4.Command.classBuilder().ep(Mj4.commonParams).m(function(A, B, Q, Z) {
            return [Nj4.getSerdePlugin(Q, this.serialize, this.deserialize), qj4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(void 0, EJ2).ser(Tj4).de(Sj4).build() {
            static {
                D9(this, "AssumeRoleCommand")
            }
        },
        Gk4 = T6(),
        Fk4 = y3(),
        Ik4 = H6(),
        Yk4 = B51(),
        YZ0 = class extends Ik4.Command.classBuilder().ep(Yk4.commonParams).m(function(A, B, Q, Z) {
            return [Fk4.getSerdePlugin(Q, this.serialize, this.deserialize), Gk4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(MJ2, RJ2).ser(Pj4).de(jj4).build() {
            static {
                D9(this, "AssumeRoleWithWebIdentityCommand")
            }
        },
        Wk4 = A51(),
        Jk4 = {
            AssumeRoleCommand: IZ0,
            AssumeRoleWithWebIdentityCommand: YZ0
        },
        fJ2 = class extends Wk4.STSClient {
            static {
                D9(this, "STS")
            }
        };
    $j4.createAggregatedClient(Jk4, fJ2);
    var Xk4 = B51(),
        ZZ0 = ow(),
        HJ2 = "us-east-1",
        hJ2 = D9((A) => {
            if (typeof A?.Arn === "string") {
                let B = A.Arn.split(":");
                if (B.length > 4 && B[4] !== "") return B[4]
            }
            return
        }, "getAccountIdFromAssumedRoleUser"),
        gJ2 = D9(async (A, B, Q) => {
            let Z = typeof A === "function" ? await A() : A,
                D = typeof B === "function" ? await B() : B;
            return Q?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${Z} (provider)`, `${D} (parent client)`, `${HJ2} (STS default)`), Z ?? D ?? HJ2
        }, "resolveRegion"),
        Vk4 = D9((A, B) => {
            let Q, Z;
            return async (D, G) => {
                if (Z = D, !Q) {
                    let {
                        logger: J = A?.parentClientConfig?.logger,
                        region: X,
                        requestHandler: V = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: C
                    } = A, K = await gJ2(X, A?.parentClientConfig?.region, C), H = !uJ2(V);
                    Q = new B({
                        profile: A?.parentClientConfig?.profile,
                        credentialDefaultProvider: D9(() => async () => Z, "credentialDefaultProvider"),
                        region: K,
                        requestHandler: H ? V : void 0,
                        logger: J
                    })
                }
                let {
                    Credentials: F,
                    AssumedRoleUser: I
                } = await Q.send(new IZ0(G));
                if (!F || !F.AccessKeyId || !F.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${G.RoleArn}`);
                let Y = hJ2(I),
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
                return ZZ0.setCredentialFeature(W, "CREDENTIALS_STS_ASSUME_ROLE", "i"), W
            }
        }, "getDefaultRoleAssumer"),
        Ck4 = D9((A, B) => {
            let Q;
            return async (Z) => {
                if (!Q) {
                    let {
                        logger: Y = A?.parentClientConfig?.logger,
                        region: W,
                        requestHandler: J = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: X
                    } = A, V = await gJ2(W, A?.parentClientConfig?.region, X), C = !uJ2(J);
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
                } = await Q.send(new YZ0(Z));
                if (!D || !D.AccessKeyId || !D.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${Z.RoleArn}`);
                let F = hJ2(G),
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
                if (F) ZZ0.setCredentialFeature(I, "RESOLVED_ACCOUNT_ID", "T");
                return ZZ0.setCredentialFeature(I, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k"), I
            }
        }, "getDefaultRoleAssumerWithWebIdentity"),
        uJ2 = D9((A) => {
            return A?.metadata?.handlerProtocol === "h2"
        }, "isH2"),
        mJ2 = A51(),
        dJ2 = D9((A, B) => {
            if (!B) return A;
            else return class Q extends A {
                static {
                    D9(this, "CustomizableSTSClient")
                }
                constructor(Z) {
                    super(Z);
                    for (let D of B) this.middlewareStack.use(D)
                }
            }
        }, "getCustomizableStsClientCtor"),
        cJ2 = D9((A = {}, B) => Vk4(A, dJ2(mJ2.STSClient, B)), "getDefaultRoleAssumer"),
        lJ2 = D9((A = {}, B) => Ck4(A, dJ2(mJ2.STSClient, B)), "getDefaultRoleAssumerWithWebIdentity"),
        Kk4 = D9((A) => (B) => A({
            roleAssumer: cJ2(B),
            roleAssumerWithWebIdentity: lJ2(B),
            ...B
        }), "decorateDefaultCredentialProvider")
});