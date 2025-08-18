/* chunk:84 bytes:[1899296, 1927274) size:27978 source:unpacked-cli.js */
var sr1 = E((N25, ar1) => {
    var {
        defineProperty: hH1,
        getOwnPropertyDescriptor: T4Q,
        getOwnPropertyNames: P4Q
    } = Object, S4Q = Object.prototype.hasOwnProperty, B9 = (A, B) => hH1(A, "name", {
        value: B,
        configurable: !0
    }), j4Q = (A, B) => {
        for (var Q in B) hH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, mr1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of P4Q(B))
                if (!S4Q.call(A, D) && D !== Q) hH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = T4Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, k4Q = (A, B, Q) => (mr1(A, B, "default"), Q && mr1(Q, B, "default")), y4Q = (A) => mr1(hH1({}, "__esModule", {
        value: !0
    }), A), cr1 = {};
    j4Q(cr1, {
        AssumeRoleCommand: () => ir1,
        AssumeRoleResponseFilterSensitiveLog: () => AFA,
        AssumeRoleWithWebIdentityCommand: () => nr1,
        AssumeRoleWithWebIdentityRequestFilterSensitiveLog: () => IFA,
        AssumeRoleWithWebIdentityResponseFilterSensitiveLog: () => YFA,
        ClientInputEndpointParameters: () => M6Q.ClientInputEndpointParameters,
        CredentialsFilterSensitiveLog: () => lr1,
        ExpiredTokenException: () => BFA,
        IDPCommunicationErrorException: () => WFA,
        IDPRejectedClaimException: () => GFA,
        InvalidIdentityTokenException: () => FFA,
        MalformedPolicyDocumentException: () => QFA,
        PackedPolicyTooLargeException: () => ZFA,
        RegionDisabledException: () => DFA,
        STS: () => $FA,
        STSServiceException: () => uO,
        decorateDefaultCredentialProvider: () => T6Q,
        getDefaultRoleAssumer: () => OFA,
        getDefaultRoleAssumerWithWebIdentity: () => TFA
    });
    ar1.exports = y4Q(cr1);
    k4Q(cr1, a91(), ar1.exports);
    var _4Q = V6(),
        x4Q = T6(),
        v4Q = y3(),
        b4Q = V6(),
        f4Q = s91(),
        eGA = V6(),
        h4Q = V6(),
        uO = class A extends h4Q.ServiceException {
            static {
                B9(this, "STSServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        lr1 = B9((A) => ({
            ...A,
            ...A.SecretAccessKey && {
                SecretAccessKey: eGA.SENSITIVE_STRING
            }
        }), "CredentialsFilterSensitiveLog"),
        AFA = B9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: lr1(A.Credentials)
            }
        }), "AssumeRoleResponseFilterSensitiveLog"),
        BFA = class A extends uO {
            static {
                B9(this, "ExpiredTokenException")
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
        QFA = class A extends uO {
            static {
                B9(this, "MalformedPolicyDocumentException")
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
        ZFA = class A extends uO {
            static {
                B9(this, "PackedPolicyTooLargeException")
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
        DFA = class A extends uO {
            static {
                B9(this, "RegionDisabledException")
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
        GFA = class A extends uO {
            static {
                B9(this, "IDPRejectedClaimException")
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
        FFA = class A extends uO {
            static {
                B9(this, "InvalidIdentityTokenException")
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
        IFA = B9((A) => ({
            ...A,
            ...A.WebIdentityToken && {
                WebIdentityToken: eGA.SENSITIVE_STRING
            }
        }), "AssumeRoleWithWebIdentityRequestFilterSensitiveLog"),
        YFA = B9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: lr1(A.Credentials)
            }
        }), "AssumeRoleWithWebIdentityResponseFilterSensitiveLog"),
        WFA = class A extends uO {
            static {
                B9(this, "IDPCommunicationErrorException")
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
        pr1 = YI(),
        g4Q = CV(),
        U5 = V6(),
        u4Q = B9(async (A, B) => {
            let Q = HFA,
                Z;
            return Z = wFA({
                ...o4Q(A, B),
                [EFA]: H6Q,
                [UFA]: zFA
            }), KFA(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleCommand"),
        m4Q = B9(async (A, B) => {
            let Q = HFA,
                Z;
            return Z = wFA({
                ...t4Q(A, B),
                [EFA]: z6Q,
                [UFA]: zFA
            }), KFA(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleWithWebIdentityCommand"),
        d4Q = B9(async (A, B) => {
            if (A.statusCode >= 300) return JFA(A, B);
            let Q = await pr1.parseXmlBody(A.body, B),
                Z = {};
            return Z = G6Q(Q.AssumeRoleResult, B), {
                $metadata: mO(A),
                ...Z
            }
        }, "de_AssumeRoleCommand"),
        c4Q = B9(async (A, B) => {
            if (A.statusCode >= 300) return JFA(A, B);
            let Q = await pr1.parseXmlBody(A.body, B),
                Z = {};
            return Z = F6Q(Q.AssumeRoleWithWebIdentityResult, B), {
                $metadata: mO(A),
                ...Z
            }
        }, "de_AssumeRoleWithWebIdentityCommand"),
        JFA = B9(async (A, B) => {
            let Q = {
                    ...A,
                    body: await pr1.parseXmlErrorBody(A.body, B)
                },
                Z = E6Q(A, Q.body);
            switch (Z) {
                case "ExpiredTokenException":
                case "com.amazonaws.sts#ExpiredTokenException":
                    throw await l4Q(Q, B);
                case "MalformedPolicyDocument":
                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                    throw await a4Q(Q, B);
                case "PackedPolicyTooLarge":
                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                    throw await s4Q(Q, B);
                case "RegionDisabledException":
                case "com.amazonaws.sts#RegionDisabledException":
                    throw await r4Q(Q, B);
                case "IDPCommunicationError":
                case "com.amazonaws.sts#IDPCommunicationErrorException":
                    throw await p4Q(Q, B);
                case "IDPRejectedClaim":
                case "com.amazonaws.sts#IDPRejectedClaimException":
                    throw await i4Q(Q, B);
                case "InvalidIdentityToken":
                case "com.amazonaws.sts#InvalidIdentityTokenException":
                    throw await n4Q(Q, B);
                default:
                    let D = Q.body;
                    return K6Q({
                        output: A,
                        parsedBody: D.Error,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        l4Q = B9(async (A, B) => {
            let Q = A.body,
                Z = I6Q(Q.Error, B),
                D = new BFA({
                    $metadata: mO(A),
                    ...Z
                });
            return U5.decorateServiceException(D, Q)
        }, "de_ExpiredTokenExceptionRes"),
        p4Q = B9(async (A, B) => {
            let Q = A.body,
                Z = Y6Q(Q.Error, B),
                D = new WFA({
                    $metadata: mO(A),
                    ...Z
                });
            return U5.decorateServiceException(D, Q)
        }, "de_IDPCommunicationErrorExceptionRes"),
        i4Q = B9(async (A, B) => {
            let Q = A.body,
                Z = W6Q(Q.Error, B),
                D = new GFA({
                    $metadata: mO(A),
                    ...Z
                });
            return U5.decorateServiceException(D, Q)
        }, "de_IDPRejectedClaimExceptionRes"),
        n4Q = B9(async (A, B) => {
            let Q = A.body,
                Z = J6Q(Q.Error, B),
                D = new FFA({
                    $metadata: mO(A),
                    ...Z
                });
            return U5.decorateServiceException(D, Q)
        }, "de_InvalidIdentityTokenExceptionRes"),
        a4Q = B9(async (A, B) => {
            let Q = A.body,
                Z = X6Q(Q.Error, B),
                D = new QFA({
                    $metadata: mO(A),
                    ...Z
                });
            return U5.decorateServiceException(D, Q)
        }, "de_MalformedPolicyDocumentExceptionRes"),
        s4Q = B9(async (A, B) => {
            let Q = A.body,
                Z = V6Q(Q.Error, B),
                D = new ZFA({
                    $metadata: mO(A),
                    ...Z
                });
            return U5.decorateServiceException(D, Q)
        }, "de_PackedPolicyTooLargeExceptionRes"),
        r4Q = B9(async (A, B) => {
            let Q = A.body,
                Z = C6Q(Q.Error, B),
                D = new DFA({
                    $metadata: mO(A),
                    ...Z
                });
            return U5.decorateServiceException(D, Q)
        }, "de_RegionDisabledExceptionRes"),
        o4Q = B9((A, B) => {
            let Q = {};
            if (A[qi] != null) Q[qi] = A[qi];
            if (A[Ni] != null) Q[Ni] = A[Ni];
            if (A[wi] != null) {
                let Z = XFA(A[wi], B);
                if (A[wi]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[Ui] != null) Q[Ui] = A[Ui];
            if (A[Ei] != null) Q[Ei] = A[Ei];
            if (A[vr1] != null) {
                let Z = D6Q(A[vr1], B);
                if (A[vr1]?.length === 0) Q.Tags = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `Tags.${D}`;
                    Q[F] = G
                })
            }
            if (A[fr1] != null) {
                let Z = Z6Q(A[fr1], B);
                if (A[fr1]?.length === 0) Q.TransitiveTagKeys = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `TransitiveTagKeys.${D}`;
                    Q[F] = G
                })
            }
            if (A[Rr1] != null) Q[Rr1] = A[Rr1];
            if (A[_r1] != null) Q[_r1] = A[_r1];
            if (A[br1] != null) Q[br1] = A[br1];
            if (A[gO] != null) Q[gO] = A[gO];
            if (A[Pr1] != null) {
                let Z = B6Q(A[Pr1], B);
                if (A[Pr1]?.length === 0) Q.ProvidedContexts = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `ProvidedContexts.${D}`;
                    Q[F] = G
                })
            }
            return Q
        }, "se_AssumeRoleRequest"),
        t4Q = B9((A, B) => {
            let Q = {};
            if (A[qi] != null) Q[qi] = A[qi];
            if (A[Ni] != null) Q[Ni] = A[Ni];
            if (A[gr1] != null) Q[gr1] = A[gr1];
            if (A[Sr1] != null) Q[Sr1] = A[Sr1];
            if (A[wi] != null) {
                let Z = XFA(A[wi], B);
                if (A[wi]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[Ui] != null) Q[Ui] = A[Ui];
            if (A[Ei] != null) Q[Ei] = A[Ei];
            return Q
        }, "se_AssumeRoleWithWebIdentityRequest"),
        XFA = B9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = e4Q(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_policyDescriptorListType"),
        e4Q = B9((A, B) => {
            let Q = {};
            if (A[ur1] != null) Q[ur1] = A[ur1];
            return Q
        }, "se_PolicyDescriptorType"),
        A6Q = B9((A, B) => {
            let Q = {};
            if (A[Tr1] != null) Q[Tr1] = A[Tr1];
            if (A[Lr1] != null) Q[Lr1] = A[Lr1];
            return Q
        }, "se_ProvidedContext"),
        B6Q = B9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = A6Q(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_ProvidedContextsListType"),
        Q6Q = B9((A, B) => {
            let Q = {};
            if (A[Or1] != null) Q[Or1] = A[Or1];
            if (A[hr1] != null) Q[hr1] = A[hr1];
            return Q
        }, "se_Tag"),
        Z6Q = B9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                Q[`member.${Z}`] = D, Z++
            }
            return Q
        }, "se_tagKeyListType"),
        D6Q = B9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = Q6Q(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_tagListType"),
        VFA = B9((A, B) => {
            let Q = {};
            if (A[$r1] != null) Q[$r1] = U5.expectString(A[$r1]);
            if (A[qr1] != null) Q[qr1] = U5.expectString(A[qr1]);
            return Q
        }, "de_AssumedRoleUser"),
        G6Q = B9((A, B) => {
            let Q = {};
            if (A[zi] != null) Q[zi] = CFA(A[zi], B);
            if (A[Hi] != null) Q[Hi] = VFA(A[Hi], B);
            if (A[$i] != null) Q[$i] = U5.strictParseInt32(A[$i]);
            if (A[gO] != null) Q[gO] = U5.expectString(A[gO]);
            return Q
        }, "de_AssumeRoleResponse"),
        F6Q = B9((A, B) => {
            let Q = {};
            if (A[zi] != null) Q[zi] = CFA(A[zi], B);
            if (A[yr1] != null) Q[yr1] = U5.expectString(A[yr1]);
            if (A[Hi] != null) Q[Hi] = VFA(A[Hi], B);
            if (A[$i] != null) Q[$i] = U5.strictParseInt32(A[$i]);
            if (A[jr1] != null) Q[jr1] = U5.expectString(A[jr1]);
            if (A[Nr1] != null) Q[Nr1] = U5.expectString(A[Nr1]);
            if (A[gO] != null) Q[gO] = U5.expectString(A[gO]);
            return Q
        }, "de_AssumeRoleWithWebIdentityResponse"),
        CFA = B9((A, B) => {
            let Q = {};
            if (A[wr1] != null) Q[wr1] = U5.expectString(A[wr1]);
            if (A[kr1] != null) Q[kr1] = U5.expectString(A[kr1]);
            if (A[xr1] != null) Q[xr1] = U5.expectString(A[xr1]);
            if (A[Mr1] != null) Q[Mr1] = U5.expectNonNull(U5.parseRfc3339DateTimeWithOffset(A[Mr1]));
            return Q
        }, "de_Credentials"),
        I6Q = B9((A, B) => {
            let Q = {};
            if (A[sD] != null) Q[sD] = U5.expectString(A[sD]);
            return Q
        }, "de_ExpiredTokenException"),
        Y6Q = B9((A, B) => {
            let Q = {};
            if (A[sD] != null) Q[sD] = U5.expectString(A[sD]);
            return Q
        }, "de_IDPCommunicationErrorException"),
        W6Q = B9((A, B) => {
            let Q = {};
            if (A[sD] != null) Q[sD] = U5.expectString(A[sD]);
            return Q
        }, "de_IDPRejectedClaimException"),
        J6Q = B9((A, B) => {
            let Q = {};
            if (A[sD] != null) Q[sD] = U5.expectString(A[sD]);
            return Q
        }, "de_InvalidIdentityTokenException"),
        X6Q = B9((A, B) => {
            let Q = {};
            if (A[sD] != null) Q[sD] = U5.expectString(A[sD]);
            return Q
        }, "de_MalformedPolicyDocumentException"),
        V6Q = B9((A, B) => {
            let Q = {};
            if (A[sD] != null) Q[sD] = U5.expectString(A[sD]);
            return Q
        }, "de_PackedPolicyTooLargeException"),
        C6Q = B9((A, B) => {
            let Q = {};
            if (A[sD] != null) Q[sD] = U5.expectString(A[sD]);
            return Q
        }, "de_RegionDisabledException"),
        mO = B9((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        K6Q = U5.withBaseException(uO),
        KFA = B9(async (A, B, Q, Z, D) => {
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
            return new g4Q.HttpRequest(W)
        }, "buildHttpRpcRequest"),
        HFA = {
            "content-type": "application/x-www-form-urlencoded"
        },
        zFA = "2011-06-15",
        EFA = "Action",
        wr1 = "AccessKeyId",
        H6Q = "AssumeRole",
        $r1 = "AssumedRoleId",
        Hi = "AssumedRoleUser",
        z6Q = "AssumeRoleWithWebIdentity",
        qr1 = "Arn",
        Nr1 = "Audience",
        zi = "Credentials",
        Lr1 = "ContextAssertion",
        Ei = "DurationSeconds",
        Mr1 = "Expiration",
        Rr1 = "ExternalId",
        Or1 = "Key",
        Ui = "Policy",
        wi = "PolicyArns",
        Tr1 = "ProviderArn",
        Pr1 = "ProvidedContexts",
        Sr1 = "ProviderId",
        $i = "PackedPolicySize",
        jr1 = "Provider",
        qi = "RoleArn",
        Ni = "RoleSessionName",
        kr1 = "SecretAccessKey",
        yr1 = "SubjectFromWebIdentityToken",
        gO = "SourceIdentity",
        _r1 = "SerialNumber",
        xr1 = "SessionToken",
        vr1 = "Tags",
        br1 = "TokenCode",
        fr1 = "TransitiveTagKeys",
        UFA = "Version",
        hr1 = "Value",
        gr1 = "WebIdentityToken",
        ur1 = "arn",
        sD = "message",
        wFA = B9((A) => Object.entries(A).map(([B, Q]) => U5.extendedEncodeURIComponent(B) + "=" + U5.extendedEncodeURIComponent(Q)).join("&"), "buildFormUrlencodedString"),
        E6Q = B9((A, B) => {
            if (B.Error?.Code !== void 0) return B.Error.Code;
            if (A.statusCode == 404) return "NotFound"
        }, "loadQueryErrorCode"),
        ir1 = class extends b4Q.Command.classBuilder().ep(f4Q.commonParams).m(function(A, B, Q, Z) {
            return [v4Q.getSerdePlugin(Q, this.serialize, this.deserialize), x4Q.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(void 0, AFA).ser(u4Q).de(d4Q).build() {
            static {
                B9(this, "AssumeRoleCommand")
            }
        },
        U6Q = T6(),
        w6Q = y3(),
        $6Q = V6(),
        q6Q = s91(),
        nr1 = class extends $6Q.Command.classBuilder().ep(q6Q.commonParams).m(function(A, B, Q, Z) {
            return [w6Q.getSerdePlugin(Q, this.serialize, this.deserialize), U6Q.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(IFA, YFA).ser(m4Q).de(c4Q).build() {
            static {
                B9(this, "AssumeRoleWithWebIdentityCommand")
            }
        },
        N6Q = a91(),
        L6Q = {
            AssumeRoleCommand: ir1,
            AssumeRoleWithWebIdentityCommand: nr1
        },
        $FA = class extends N6Q.STSClient {
            static {
                B9(this, "STS")
            }
        };
    _4Q.createAggregatedClient(L6Q, $FA);
    var M6Q = s91(),
        dr1 = Xw(),
        tGA = "us-east-1",
        qFA = B9((A) => {
            if (typeof A?.Arn === "string") {
                let B = A.Arn.split(":");
                if (B.length > 4 && B[4] !== "") return B[4]
            }
            return
        }, "getAccountIdFromAssumedRoleUser"),
        NFA = B9(async (A, B, Q) => {
            let Z = typeof A === "function" ? await A() : A,
                D = typeof B === "function" ? await B() : B;
            return Q?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${Z} (provider)`, `${D} (parent client)`, `${tGA} (STS default)`), Z ?? D ?? tGA
        }, "resolveRegion"),
        R6Q = B9((A, B) => {
            let Q, Z;
            return async (D, G) => {
                if (Z = D, !Q) {
                    let {
                        logger: J = A?.parentClientConfig?.logger,
                        region: X,
                        requestHandler: V = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: C
                    } = A, K = await NFA(X, A?.parentClientConfig?.region, C), H = !LFA(V);
                    Q = new B({
                        profile: A?.parentClientConfig?.profile,
                        credentialDefaultProvider: B9(() => async () => Z, "credentialDefaultProvider"),
                        region: K,
                        requestHandler: H ? V : void 0,
                        logger: J
                    })
                }
                let {
                    Credentials: F,
                    AssumedRoleUser: I
                } = await Q.send(new ir1(G));
                if (!F || !F.AccessKeyId || !F.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${G.RoleArn}`);
                let Y = qFA(I),
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
                return dr1.setCredentialFeature(W, "CREDENTIALS_STS_ASSUME_ROLE", "i"), W
            }
        }, "getDefaultRoleAssumer"),
        O6Q = B9((A, B) => {
            let Q;
            return async (Z) => {
                if (!Q) {
                    let {
                        logger: Y = A?.parentClientConfig?.logger,
                        region: W,
                        requestHandler: J = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: X
                    } = A, V = await NFA(W, A?.parentClientConfig?.region, X), C = !LFA(J);
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
                } = await Q.send(new nr1(Z));
                if (!D || !D.AccessKeyId || !D.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${Z.RoleArn}`);
                let F = qFA(G),
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
                if (F) dr1.setCredentialFeature(I, "RESOLVED_ACCOUNT_ID", "T");
                return dr1.setCredentialFeature(I, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k"), I
            }
        }, "getDefaultRoleAssumerWithWebIdentity"),
        LFA = B9((A) => {
            return A?.metadata?.handlerProtocol === "h2"
        }, "isH2"),
        MFA = a91(),
        RFA = B9((A, B) => {
            if (!B) return A;
            else return class Q extends A {
                static {
                    B9(this, "CustomizableSTSClient")
                }
                constructor(Z) {
                    super(Z);
                    for (let D of B) this.middlewareStack.use(D)
                }
            }
        }, "getCustomizableStsClientCtor"),
        OFA = B9((A = {}, B) => R6Q(A, RFA(MFA.STSClient, B)), "getDefaultRoleAssumer"),
        TFA = B9((A = {}, B) => O6Q(A, RFA(MFA.STSClient, B)), "getDefaultRoleAssumerWithWebIdentity"),
        T6Q = B9((A) => (B) => A({
            roleAssumer: OFA(B),
            roleAssumerWithWebIdentity: TFA(B),
            ...B
        }), "decorateDefaultCredentialProvider")
});