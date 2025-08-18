/* chunk:241 bytes:[5182994, 5210972) size:27978 source:unpacked-cli.js */
var X50 = E((p$5, J50) => {
    var {
        defineProperty: tN1,
        getOwnPropertyDescriptor: mz4,
        getOwnPropertyNames: dz4
    } = Object, cz4 = Object.prototype.hasOwnProperty, Z9 = (A, B) => tN1(A, "name", {
        value: B,
        configurable: !0
    }), lz4 = (A, B) => {
        for (var Q in B) tN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Z50 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of dz4(B))
                if (!cz4.call(A, D) && D !== Q) tN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = mz4(B, D)) || Z.enumerable
                })
        }
        return A
    }, pz4 = (A, B, Q) => (Z50(A, B, "default"), Q && Z50(Q, B, "default")), iz4 = (A) => Z50(tN1({}, "__esModule", {
        value: !0
    }), A), G50 = {};
    lz4(G50, {
        AssumeRoleCommand: () => Y50,
        AssumeRoleResponseFilterSensitiveLog: () => x82,
        AssumeRoleWithWebIdentityCommand: () => W50,
        AssumeRoleWithWebIdentityRequestFilterSensitiveLog: () => m82,
        AssumeRoleWithWebIdentityResponseFilterSensitiveLog: () => d82,
        ClientInputEndpointParameters: () => hE4.ClientInputEndpointParameters,
        CredentialsFilterSensitiveLog: () => F50,
        ExpiredTokenException: () => v82,
        IDPCommunicationErrorException: () => c82,
        IDPRejectedClaimException: () => g82,
        InvalidIdentityTokenException: () => u82,
        MalformedPolicyDocumentException: () => b82,
        PackedPolicyTooLargeException: () => f82,
        RegionDisabledException: () => h82,
        STS: () => A52,
        STSServiceException: () => vT,
        decorateDefaultCredentialProvider: () => mE4,
        getDefaultRoleAssumer: () => F52,
        getDefaultRoleAssumerWithWebIdentity: () => I52
    });
    J50.exports = iz4(G50);
    pz4(G50, y81(), J50.exports);
    var nz4 = d4(),
        az4 = T6(),
        sz4 = y3(),
        rz4 = d4(),
        oz4 = _81(),
        _82 = d4(),
        tz4 = d4(),
        vT = class A extends tz4.ServiceException {
            static {
                Z9(this, "STSServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        F50 = Z9((A) => ({
            ...A,
            ...A.SecretAccessKey && {
                SecretAccessKey: _82.SENSITIVE_STRING
            }
        }), "CredentialsFilterSensitiveLog"),
        x82 = Z9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: F50(A.Credentials)
            }
        }), "AssumeRoleResponseFilterSensitiveLog"),
        v82 = class A extends vT {
            static {
                Z9(this, "ExpiredTokenException")
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
        b82 = class A extends vT {
            static {
                Z9(this, "MalformedPolicyDocumentException")
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
        f82 = class A extends vT {
            static {
                Z9(this, "PackedPolicyTooLargeException")
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
        h82 = class A extends vT {
            static {
                Z9(this, "RegionDisabledException")
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
        g82 = class A extends vT {
            static {
                Z9(this, "IDPRejectedClaimException")
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
        u82 = class A extends vT {
            static {
                Z9(this, "InvalidIdentityTokenException")
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
        m82 = Z9((A) => ({
            ...A,
            ...A.WebIdentityToken && {
                WebIdentityToken: _82.SENSITIVE_STRING
            }
        }), "AssumeRoleWithWebIdentityRequestFilterSensitiveLog"),
        d82 = Z9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: F50(A.Credentials)
            }
        }), "AssumeRoleWithWebIdentityResponseFilterSensitiveLog"),
        c82 = class A extends vT {
            static {
                Z9(this, "IDPCommunicationErrorException")
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
        I50 = HI(),
        ez4 = QX(),
        N5 = d4(),
        AE4 = Z9(async (A, B) => {
            let Q = s82,
                Z;
            return Z = e82({
                ...XE4(A, B),
                [o82]: SE4,
                [t82]: r82
            }), a82(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleCommand"),
        BE4 = Z9(async (A, B) => {
            let Q = s82,
                Z;
            return Z = e82({
                ...VE4(A, B),
                [o82]: jE4,
                [t82]: r82
            }), a82(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleWithWebIdentityCommand"),
        QE4 = Z9(async (A, B) => {
            if (A.statusCode >= 300) return l82(A, B);
            let Q = await I50.parseXmlBody(A.body, B),
                Z = {};
            return Z = wE4(Q.AssumeRoleResult, B), {
                $metadata: bT(A),
                ...Z
            }
        }, "de_AssumeRoleCommand"),
        ZE4 = Z9(async (A, B) => {
            if (A.statusCode >= 300) return l82(A, B);
            let Q = await I50.parseXmlBody(A.body, B),
                Z = {};
            return Z = $E4(Q.AssumeRoleWithWebIdentityResult, B), {
                $metadata: bT(A),
                ...Z
            }
        }, "de_AssumeRoleWithWebIdentityCommand"),
        l82 = Z9(async (A, B) => {
            let Q = {
                    ...A,
                    body: await I50.parseXmlErrorBody(A.body, B)
                },
                Z = kE4(A, Q.body);
            switch (Z) {
                case "ExpiredTokenException":
                case "com.amazonaws.sts#ExpiredTokenException":
                    throw await DE4(Q, B);
                case "MalformedPolicyDocument":
                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                    throw await YE4(Q, B);
                case "PackedPolicyTooLarge":
                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                    throw await WE4(Q, B);
                case "RegionDisabledException":
                case "com.amazonaws.sts#RegionDisabledException":
                    throw await JE4(Q, B);
                case "IDPCommunicationError":
                case "com.amazonaws.sts#IDPCommunicationErrorException":
                    throw await GE4(Q, B);
                case "IDPRejectedClaim":
                case "com.amazonaws.sts#IDPRejectedClaimException":
                    throw await FE4(Q, B);
                case "InvalidIdentityToken":
                case "com.amazonaws.sts#InvalidIdentityTokenException":
                    throw await IE4(Q, B);
                default:
                    let D = Q.body;
                    return PE4({
                        output: A,
                        parsedBody: D.Error,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        DE4 = Z9(async (A, B) => {
            let Q = A.body,
                Z = qE4(Q.Error, B),
                D = new v82({
                    $metadata: bT(A),
                    ...Z
                });
            return N5.decorateServiceException(D, Q)
        }, "de_ExpiredTokenExceptionRes"),
        GE4 = Z9(async (A, B) => {
            let Q = A.body,
                Z = NE4(Q.Error, B),
                D = new c82({
                    $metadata: bT(A),
                    ...Z
                });
            return N5.decorateServiceException(D, Q)
        }, "de_IDPCommunicationErrorExceptionRes"),
        FE4 = Z9(async (A, B) => {
            let Q = A.body,
                Z = LE4(Q.Error, B),
                D = new g82({
                    $metadata: bT(A),
                    ...Z
                });
            return N5.decorateServiceException(D, Q)
        }, "de_IDPRejectedClaimExceptionRes"),
        IE4 = Z9(async (A, B) => {
            let Q = A.body,
                Z = ME4(Q.Error, B),
                D = new u82({
                    $metadata: bT(A),
                    ...Z
                });
            return N5.decorateServiceException(D, Q)
        }, "de_InvalidIdentityTokenExceptionRes"),
        YE4 = Z9(async (A, B) => {
            let Q = A.body,
                Z = RE4(Q.Error, B),
                D = new b82({
                    $metadata: bT(A),
                    ...Z
                });
            return N5.decorateServiceException(D, Q)
        }, "de_MalformedPolicyDocumentExceptionRes"),
        WE4 = Z9(async (A, B) => {
            let Q = A.body,
                Z = OE4(Q.Error, B),
                D = new f82({
                    $metadata: bT(A),
                    ...Z
                });
            return N5.decorateServiceException(D, Q)
        }, "de_PackedPolicyTooLargeExceptionRes"),
        JE4 = Z9(async (A, B) => {
            let Q = A.body,
                Z = TE4(Q.Error, B),
                D = new h82({
                    $metadata: bT(A),
                    ...Z
                });
            return N5.decorateServiceException(D, Q)
        }, "de_RegionDisabledExceptionRes"),
        XE4 = Z9((A, B) => {
            let Q = {};
            if (A[Ur] != null) Q[Ur] = A[Ur];
            if (A[wr] != null) Q[wr] = A[wr];
            if (A[zr] != null) {
                let Z = p82(A[zr], B);
                if (A[zr]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[Hr] != null) Q[Hr] = A[Hr];
            if (A[Kr] != null) Q[Kr] = A[Kr];
            if (A[o80] != null) {
                let Z = UE4(A[o80], B);
                if (A[o80]?.length === 0) Q.Tags = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `Tags.${D}`;
                    Q[F] = G
                })
            }
            if (A[e80] != null) {
                let Z = EE4(A[e80], B);
                if (A[e80]?.length === 0) Q.TransitiveTagKeys = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `TransitiveTagKeys.${D}`;
                    Q[F] = G
                })
            }
            if (A[m80] != null) Q[m80] = A[m80];
            if (A[s80] != null) Q[s80] = A[s80];
            if (A[t80] != null) Q[t80] = A[t80];
            if (A[xT] != null) Q[xT] = A[xT];
            if (A[l80] != null) {
                let Z = HE4(A[l80], B);
                if (A[l80]?.length === 0) Q.ProvidedContexts = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `ProvidedContexts.${D}`;
                    Q[F] = G
                })
            }
            return Q
        }, "se_AssumeRoleRequest"),
        VE4 = Z9((A, B) => {
            let Q = {};
            if (A[Ur] != null) Q[Ur] = A[Ur];
            if (A[wr] != null) Q[wr] = A[wr];
            if (A[B50] != null) Q[B50] = A[B50];
            if (A[p80] != null) Q[p80] = A[p80];
            if (A[zr] != null) {
                let Z = p82(A[zr], B);
                if (A[zr]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[Hr] != null) Q[Hr] = A[Hr];
            if (A[Kr] != null) Q[Kr] = A[Kr];
            return Q
        }, "se_AssumeRoleWithWebIdentityRequest"),
        p82 = Z9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = CE4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_policyDescriptorListType"),
        CE4 = Z9((A, B) => {
            let Q = {};
            if (A[Q50] != null) Q[Q50] = A[Q50];
            return Q
        }, "se_PolicyDescriptorType"),
        KE4 = Z9((A, B) => {
            let Q = {};
            if (A[c80] != null) Q[c80] = A[c80];
            if (A[g80] != null) Q[g80] = A[g80];
            return Q
        }, "se_ProvidedContext"),
        HE4 = Z9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = KE4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_ProvidedContextsListType"),
        zE4 = Z9((A, B) => {
            let Q = {};
            if (A[d80] != null) Q[d80] = A[d80];
            if (A[A50] != null) Q[A50] = A[A50];
            return Q
        }, "se_Tag"),
        EE4 = Z9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                Q[`member.${Z}`] = D, Z++
            }
            return Q
        }, "se_tagKeyListType"),
        UE4 = Z9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = zE4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_tagListType"),
        i82 = Z9((A, B) => {
            let Q = {};
            if (A[b80] != null) Q[b80] = N5.expectString(A[b80]);
            if (A[f80] != null) Q[f80] = N5.expectString(A[f80]);
            return Q
        }, "de_AssumedRoleUser"),
        wE4 = Z9((A, B) => {
            let Q = {};
            if (A[Cr] != null) Q[Cr] = n82(A[Cr], B);
            if (A[Vr] != null) Q[Vr] = i82(A[Vr], B);
            if (A[Er] != null) Q[Er] = N5.strictParseInt32(A[Er]);
            if (A[xT] != null) Q[xT] = N5.expectString(A[xT]);
            return Q
        }, "de_AssumeRoleResponse"),
        $E4 = Z9((A, B) => {
            let Q = {};
            if (A[Cr] != null) Q[Cr] = n82(A[Cr], B);
            if (A[a80] != null) Q[a80] = N5.expectString(A[a80]);
            if (A[Vr] != null) Q[Vr] = i82(A[Vr], B);
            if (A[Er] != null) Q[Er] = N5.strictParseInt32(A[Er]);
            if (A[i80] != null) Q[i80] = N5.expectString(A[i80]);
            if (A[h80] != null) Q[h80] = N5.expectString(A[h80]);
            if (A[xT] != null) Q[xT] = N5.expectString(A[xT]);
            return Q
        }, "de_AssumeRoleWithWebIdentityResponse"),
        n82 = Z9((A, B) => {
            let Q = {};
            if (A[v80] != null) Q[v80] = N5.expectString(A[v80]);
            if (A[n80] != null) Q[n80] = N5.expectString(A[n80]);
            if (A[r80] != null) Q[r80] = N5.expectString(A[r80]);
            if (A[u80] != null) Q[u80] = N5.expectNonNull(N5.parseRfc3339DateTimeWithOffset(A[u80]));
            return Q
        }, "de_Credentials"),
        qE4 = Z9((A, B) => {
            let Q = {};
            if (A[GG] != null) Q[GG] = N5.expectString(A[GG]);
            return Q
        }, "de_ExpiredTokenException"),
        NE4 = Z9((A, B) => {
            let Q = {};
            if (A[GG] != null) Q[GG] = N5.expectString(A[GG]);
            return Q
        }, "de_IDPCommunicationErrorException"),
        LE4 = Z9((A, B) => {
            let Q = {};
            if (A[GG] != null) Q[GG] = N5.expectString(A[GG]);
            return Q
        }, "de_IDPRejectedClaimException"),
        ME4 = Z9((A, B) => {
            let Q = {};
            if (A[GG] != null) Q[GG] = N5.expectString(A[GG]);
            return Q
        }, "de_InvalidIdentityTokenException"),
        RE4 = Z9((A, B) => {
            let Q = {};
            if (A[GG] != null) Q[GG] = N5.expectString(A[GG]);
            return Q
        }, "de_MalformedPolicyDocumentException"),
        OE4 = Z9((A, B) => {
            let Q = {};
            if (A[GG] != null) Q[GG] = N5.expectString(A[GG]);
            return Q
        }, "de_PackedPolicyTooLargeException"),
        TE4 = Z9((A, B) => {
            let Q = {};
            if (A[GG] != null) Q[GG] = N5.expectString(A[GG]);
            return Q
        }, "de_RegionDisabledException"),
        bT = Z9((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        PE4 = N5.withBaseException(vT),
        a82 = Z9(async (A, B, Q, Z, D) => {
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
            return new ez4.HttpRequest(W)
        }, "buildHttpRpcRequest"),
        s82 = {
            "content-type": "application/x-www-form-urlencoded"
        },
        r82 = "2011-06-15",
        o82 = "Action",
        v80 = "AccessKeyId",
        SE4 = "AssumeRole",
        b80 = "AssumedRoleId",
        Vr = "AssumedRoleUser",
        jE4 = "AssumeRoleWithWebIdentity",
        f80 = "Arn",
        h80 = "Audience",
        Cr = "Credentials",
        g80 = "ContextAssertion",
        Kr = "DurationSeconds",
        u80 = "Expiration",
        m80 = "ExternalId",
        d80 = "Key",
        Hr = "Policy",
        zr = "PolicyArns",
        c80 = "ProviderArn",
        l80 = "ProvidedContexts",
        p80 = "ProviderId",
        Er = "PackedPolicySize",
        i80 = "Provider",
        Ur = "RoleArn",
        wr = "RoleSessionName",
        n80 = "SecretAccessKey",
        a80 = "SubjectFromWebIdentityToken",
        xT = "SourceIdentity",
        s80 = "SerialNumber",
        r80 = "SessionToken",
        o80 = "Tags",
        t80 = "TokenCode",
        e80 = "TransitiveTagKeys",
        t82 = "Version",
        A50 = "Value",
        B50 = "WebIdentityToken",
        Q50 = "arn",
        GG = "message",
        e82 = Z9((A) => Object.entries(A).map(([B, Q]) => N5.extendedEncodeURIComponent(B) + "=" + N5.extendedEncodeURIComponent(Q)).join("&"), "buildFormUrlencodedString"),
        kE4 = Z9((A, B) => {
            if (B.Error?.Code !== void 0) return B.Error.Code;
            if (A.statusCode == 404) return "NotFound"
        }, "loadQueryErrorCode"),
        Y50 = class extends rz4.Command.classBuilder().ep(oz4.commonParams).m(function(A, B, Q, Z) {
            return [sz4.getSerdePlugin(Q, this.serialize, this.deserialize), az4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(void 0, x82).ser(AE4).de(QE4).build() {
            static {
                Z9(this, "AssumeRoleCommand")
            }
        },
        yE4 = T6(),
        _E4 = y3(),
        xE4 = d4(),
        vE4 = _81(),
        W50 = class extends xE4.Command.classBuilder().ep(vE4.commonParams).m(function(A, B, Q, Z) {
            return [_E4.getSerdePlugin(Q, this.serialize, this.deserialize), yE4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(m82, d82).ser(BE4).de(ZE4).build() {
            static {
                Z9(this, "AssumeRoleWithWebIdentityCommand")
            }
        },
        bE4 = y81(),
        fE4 = {
            AssumeRoleCommand: Y50,
            AssumeRoleWithWebIdentityCommand: W50
        },
        A52 = class extends bE4.STSClient {
            static {
                Z9(this, "STS")
            }
        };
    nz4.createAggregatedClient(fE4, A52);
    var hE4 = _81(),
        D50 = mz(),
        y82 = "us-east-1",
        B52 = Z9((A) => {
            if (typeof A?.Arn === "string") {
                let B = A.Arn.split(":");
                if (B.length > 4 && B[4] !== "") return B[4]
            }
            return
        }, "getAccountIdFromAssumedRoleUser"),
        Q52 = Z9(async (A, B, Q) => {
            let Z = typeof A === "function" ? await A() : A,
                D = typeof B === "function" ? await B() : B;
            return Q?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${Z} (provider)`, `${D} (parent client)`, `${y82} (STS default)`), Z ?? D ?? y82
        }, "resolveRegion"),
        gE4 = Z9((A, B) => {
            let Q, Z;
            return async (D, G) => {
                if (Z = D, !Q) {
                    let {
                        logger: J = A?.parentClientConfig?.logger,
                        region: X,
                        requestHandler: V = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: C
                    } = A, K = await Q52(X, A?.parentClientConfig?.region, C), H = !Z52(V);
                    Q = new B({
                        profile: A?.parentClientConfig?.profile,
                        credentialDefaultProvider: Z9(() => async () => Z, "credentialDefaultProvider"),
                        region: K,
                        requestHandler: H ? V : void 0,
                        logger: J
                    })
                }
                let {
                    Credentials: F,
                    AssumedRoleUser: I
                } = await Q.send(new Y50(G));
                if (!F || !F.AccessKeyId || !F.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${G.RoleArn}`);
                let Y = B52(I),
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
                return D50.setCredentialFeature(W, "CREDENTIALS_STS_ASSUME_ROLE", "i"), W
            }
        }, "getDefaultRoleAssumer"),
        uE4 = Z9((A, B) => {
            let Q;
            return async (Z) => {
                if (!Q) {
                    let {
                        logger: Y = A?.parentClientConfig?.logger,
                        region: W,
                        requestHandler: J = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: X
                    } = A, V = await Q52(W, A?.parentClientConfig?.region, X), C = !Z52(J);
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
                } = await Q.send(new W50(Z));
                if (!D || !D.AccessKeyId || !D.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${Z.RoleArn}`);
                let F = B52(G),
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
                if (F) D50.setCredentialFeature(I, "RESOLVED_ACCOUNT_ID", "T");
                return D50.setCredentialFeature(I, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k"), I
            }
        }, "getDefaultRoleAssumerWithWebIdentity"),
        Z52 = Z9((A) => {
            return A?.metadata?.handlerProtocol === "h2"
        }, "isH2"),
        D52 = y81(),
        G52 = Z9((A, B) => {
            if (!B) return A;
            else return class Q extends A {
                static {
                    Z9(this, "CustomizableSTSClient")
                }
                constructor(Z) {
                    super(Z);
                    for (let D of B) this.middlewareStack.use(D)
                }
            }
        }, "getCustomizableStsClientCtor"),
        F52 = Z9((A = {}, B) => gE4(A, G52(D52.STSClient, B)), "getDefaultRoleAssumer"),
        I52 = Z9((A = {}, B) => uE4(A, G52(D52.STSClient, B)), "getDefaultRoleAssumerWithWebIdentity"),
        mE4 = Z9((A) => (B) => A({
            roleAssumer: F52(B),
            roleAssumerWithWebIdentity: I52(B),
            ...B
        }), "decorateDefaultCredentialProvider")
});