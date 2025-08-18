/* chunk:118 bytes:[2678865, 2706844) size:27979 source:unpacked-cli.js */
var S10 = E((U45, P10) => {
    var {
        defineProperty: xE1,
        getOwnPropertyDescriptor: MqQ,
        getOwnPropertyNames: RqQ
    } = Object, OqQ = Object.prototype.hasOwnProperty, Q9 = (A, B) => xE1(A, "name", {
        value: B,
        configurable: !0
    }), TqQ = (A, B) => {
        for (var Q in B) xE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, q10 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of RqQ(B))
                if (!OqQ.call(A, D) && D !== Q) xE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = MqQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, PqQ = (A, B, Q) => (q10(A, B, "default"), Q && q10(Q, B, "default")), SqQ = (A) => q10(xE1({}, "__esModule", {
        value: !0
    }), A), L10 = {};
    TqQ(L10, {
        AssumeRoleCommand: () => O10,
        AssumeRoleResponseFilterSensitiveLog: () => _NA,
        AssumeRoleWithWebIdentityCommand: () => T10,
        AssumeRoleWithWebIdentityRequestFilterSensitiveLog: () => uNA,
        AssumeRoleWithWebIdentityResponseFilterSensitiveLog: () => mNA,
        ClientInputEndpointParameters: () => qNQ.ClientInputEndpointParameters,
        CredentialsFilterSensitiveLog: () => M10,
        ExpiredTokenException: () => xNA,
        IDPCommunicationErrorException: () => dNA,
        IDPRejectedClaimException: () => hNA,
        InvalidIdentityTokenException: () => gNA,
        MalformedPolicyDocumentException: () => vNA,
        PackedPolicyTooLargeException: () => bNA,
        RegionDisabledException: () => fNA,
        STS: () => eNA,
        STSServiceException: () => nO,
        decorateDefaultCredentialProvider: () => MNQ,
        getDefaultRoleAssumer: () => GLA,
        getDefaultRoleAssumerWithWebIdentity: () => FLA
    });
    P10.exports = SqQ(L10);
    PqQ(L10, _Q1(), P10.exports);
    var jqQ = XD(),
        kqQ = T6(),
        yqQ = y3(),
        _qQ = XD(),
        xqQ = xQ1(),
        yNA = XD(),
        vqQ = XD(),
        nO = class A extends vqQ.ServiceException {
            static {
                Q9(this, "STSServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        M10 = Q9((A) => ({
            ...A,
            ...A.SecretAccessKey && {
                SecretAccessKey: yNA.SENSITIVE_STRING
            }
        }), "CredentialsFilterSensitiveLog"),
        _NA = Q9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: M10(A.Credentials)
            }
        }), "AssumeRoleResponseFilterSensitiveLog"),
        xNA = class A extends nO {
            static {
                Q9(this, "ExpiredTokenException")
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
        vNA = class A extends nO {
            static {
                Q9(this, "MalformedPolicyDocumentException")
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
        bNA = class A extends nO {
            static {
                Q9(this, "PackedPolicyTooLargeException")
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
        fNA = class A extends nO {
            static {
                Q9(this, "RegionDisabledException")
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
        hNA = class A extends nO {
            static {
                Q9(this, "IDPRejectedClaimException")
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
        gNA = class A extends nO {
            static {
                Q9(this, "InvalidIdentityTokenException")
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
        uNA = Q9((A) => ({
            ...A,
            ...A.WebIdentityToken && {
                WebIdentityToken: yNA.SENSITIVE_STRING
            }
        }), "AssumeRoleWithWebIdentityRequestFilterSensitiveLog"),
        mNA = Q9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: M10(A.Credentials)
            }
        }), "AssumeRoleWithWebIdentityResponseFilterSensitiveLog"),
        dNA = class A extends nO {
            static {
                Q9(this, "IDPCommunicationErrorException")
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
        R10 = WI(),
        bqQ = PE1(),
        w5 = XD(),
        fqQ = Q9(async (A, B) => {
            let Q = aNA,
                Z;
            return Z = tNA({
                ...aqQ(A, B),
                [rNA]: VNQ,
                [oNA]: sNA
            }), nNA(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleCommand"),
        hqQ = Q9(async (A, B) => {
            let Q = aNA,
                Z;
            return Z = tNA({
                ...sqQ(A, B),
                [rNA]: CNQ,
                [oNA]: sNA
            }), nNA(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleWithWebIdentityCommand"),
        gqQ = Q9(async (A, B) => {
            if (A.statusCode >= 300) return cNA(A, B);
            let Q = await R10.parseXmlBody(A.body, B),
                Z = {};
            return Z = QNQ(Q.AssumeRoleResult, B), {
                $metadata: aO(A),
                ...Z
            }
        }, "de_AssumeRoleCommand"),
        uqQ = Q9(async (A, B) => {
            if (A.statusCode >= 300) return cNA(A, B);
            let Q = await R10.parseXmlBody(A.body, B),
                Z = {};
            return Z = ZNQ(Q.AssumeRoleWithWebIdentityResult, B), {
                $metadata: aO(A),
                ...Z
            }
        }, "de_AssumeRoleWithWebIdentityCommand"),
        cNA = Q9(async (A, B) => {
            let Q = {
                    ...A,
                    body: await R10.parseXmlErrorBody(A.body, B)
                },
                Z = KNQ(A, Q.body);
            switch (Z) {
                case "ExpiredTokenException":
                case "com.amazonaws.sts#ExpiredTokenException":
                    throw await mqQ(Q, B);
                case "MalformedPolicyDocument":
                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                    throw await pqQ(Q, B);
                case "PackedPolicyTooLarge":
                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                    throw await iqQ(Q, B);
                case "RegionDisabledException":
                case "com.amazonaws.sts#RegionDisabledException":
                    throw await nqQ(Q, B);
                case "IDPCommunicationError":
                case "com.amazonaws.sts#IDPCommunicationErrorException":
                    throw await dqQ(Q, B);
                case "IDPRejectedClaim":
                case "com.amazonaws.sts#IDPRejectedClaimException":
                    throw await cqQ(Q, B);
                case "InvalidIdentityToken":
                case "com.amazonaws.sts#InvalidIdentityTokenException":
                    throw await lqQ(Q, B);
                default:
                    let D = Q.body;
                    return XNQ({
                        output: A,
                        parsedBody: D.Error,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        mqQ = Q9(async (A, B) => {
            let Q = A.body,
                Z = DNQ(Q.Error, B),
                D = new xNA({
                    $metadata: aO(A),
                    ...Z
                });
            return w5.decorateServiceException(D, Q)
        }, "de_ExpiredTokenExceptionRes"),
        dqQ = Q9(async (A, B) => {
            let Q = A.body,
                Z = GNQ(Q.Error, B),
                D = new dNA({
                    $metadata: aO(A),
                    ...Z
                });
            return w5.decorateServiceException(D, Q)
        }, "de_IDPCommunicationErrorExceptionRes"),
        cqQ = Q9(async (A, B) => {
            let Q = A.body,
                Z = FNQ(Q.Error, B),
                D = new hNA({
                    $metadata: aO(A),
                    ...Z
                });
            return w5.decorateServiceException(D, Q)
        }, "de_IDPRejectedClaimExceptionRes"),
        lqQ = Q9(async (A, B) => {
            let Q = A.body,
                Z = INQ(Q.Error, B),
                D = new gNA({
                    $metadata: aO(A),
                    ...Z
                });
            return w5.decorateServiceException(D, Q)
        }, "de_InvalidIdentityTokenExceptionRes"),
        pqQ = Q9(async (A, B) => {
            let Q = A.body,
                Z = YNQ(Q.Error, B),
                D = new vNA({
                    $metadata: aO(A),
                    ...Z
                });
            return w5.decorateServiceException(D, Q)
        }, "de_MalformedPolicyDocumentExceptionRes"),
        iqQ = Q9(async (A, B) => {
            let Q = A.body,
                Z = WNQ(Q.Error, B),
                D = new bNA({
                    $metadata: aO(A),
                    ...Z
                });
            return w5.decorateServiceException(D, Q)
        }, "de_PackedPolicyTooLargeExceptionRes"),
        nqQ = Q9(async (A, B) => {
            let Q = A.body,
                Z = JNQ(Q.Error, B),
                D = new fNA({
                    $metadata: aO(A),
                    ...Z
                });
            return w5.decorateServiceException(D, Q)
        }, "de_RegionDisabledExceptionRes"),
        aqQ = Q9((A, B) => {
            let Q = {};
            if (A[Jn] != null) Q[Jn] = A[Jn];
            if (A[Xn] != null) Q[Xn] = A[Xn];
            if (A[Yn] != null) {
                let Z = lNA(A[Yn], B);
                if (A[Yn]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[In] != null) Q[In] = A[In];
            if (A[Fn] != null) Q[Fn] = A[Fn];
            if (A[H10] != null) {
                let Z = BNQ(A[H10], B);
                if (A[H10]?.length === 0) Q.Tags = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `Tags.${D}`;
                    Q[F] = G
                })
            }
            if (A[E10] != null) {
                let Z = ANQ(A[E10], B);
                if (A[E10]?.length === 0) Q.TransitiveTagKeys = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `TransitiveTagKeys.${D}`;
                    Q[F] = G
                })
            }
            if (A[G10] != null) Q[G10] = A[G10];
            if (A[C10] != null) Q[C10] = A[C10];
            if (A[z10] != null) Q[z10] = A[z10];
            if (A[iO] != null) Q[iO] = A[iO];
            if (A[Y10] != null) {
                let Z = tqQ(A[Y10], B);
                if (A[Y10]?.length === 0) Q.ProvidedContexts = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `ProvidedContexts.${D}`;
                    Q[F] = G
                })
            }
            return Q
        }, "se_AssumeRoleRequest"),
        sqQ = Q9((A, B) => {
            let Q = {};
            if (A[Jn] != null) Q[Jn] = A[Jn];
            if (A[Xn] != null) Q[Xn] = A[Xn];
            if (A[w10] != null) Q[w10] = A[w10];
            if (A[W10] != null) Q[W10] = A[W10];
            if (A[Yn] != null) {
                let Z = lNA(A[Yn], B);
                if (A[Yn]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[In] != null) Q[In] = A[In];
            if (A[Fn] != null) Q[Fn] = A[Fn];
            return Q
        }, "se_AssumeRoleWithWebIdentityRequest"),
        lNA = Q9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = rqQ(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_policyDescriptorListType"),
        rqQ = Q9((A, B) => {
            let Q = {};
            if (A[$10] != null) Q[$10] = A[$10];
            return Q
        }, "se_PolicyDescriptorType"),
        oqQ = Q9((A, B) => {
            let Q = {};
            if (A[I10] != null) Q[I10] = A[I10];
            if (A[Z10] != null) Q[Z10] = A[Z10];
            return Q
        }, "se_ProvidedContext"),
        tqQ = Q9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = oqQ(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_ProvidedContextsListType"),
        eqQ = Q9((A, B) => {
            let Q = {};
            if (A[F10] != null) Q[F10] = A[F10];
            if (A[U10] != null) Q[U10] = A[U10];
            return Q
        }, "se_Tag"),
        ANQ = Q9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                Q[`member.${Z}`] = D, Z++
            }
            return Q
        }, "se_tagKeyListType"),
        BNQ = Q9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = eqQ(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_tagListType"),
        pNA = Q9((A, B) => {
            let Q = {};
            if (A[A10] != null) Q[A10] = w5.expectString(A[A10]);
            if (A[B10] != null) Q[B10] = w5.expectString(A[B10]);
            return Q
        }, "de_AssumedRoleUser"),
        QNQ = Q9((A, B) => {
            let Q = {};
            if (A[Gn] != null) Q[Gn] = iNA(A[Gn], B);
            if (A[Dn] != null) Q[Dn] = pNA(A[Dn], B);
            if (A[Wn] != null) Q[Wn] = w5.strictParseInt32(A[Wn]);
            if (A[iO] != null) Q[iO] = w5.expectString(A[iO]);
            return Q
        }, "de_AssumeRoleResponse"),
        ZNQ = Q9((A, B) => {
            let Q = {};
            if (A[Gn] != null) Q[Gn] = iNA(A[Gn], B);
            if (A[V10] != null) Q[V10] = w5.expectString(A[V10]);
            if (A[Dn] != null) Q[Dn] = pNA(A[Dn], B);
            if (A[Wn] != null) Q[Wn] = w5.strictParseInt32(A[Wn]);
            if (A[J10] != null) Q[J10] = w5.expectString(A[J10]);
            if (A[Q10] != null) Q[Q10] = w5.expectString(A[Q10]);
            if (A[iO] != null) Q[iO] = w5.expectString(A[iO]);
            return Q
        }, "de_AssumeRoleWithWebIdentityResponse"),
        iNA = Q9((A, B) => {
            let Q = {};
            if (A[ee1] != null) Q[ee1] = w5.expectString(A[ee1]);
            if (A[X10] != null) Q[X10] = w5.expectString(A[X10]);
            if (A[K10] != null) Q[K10] = w5.expectString(A[K10]);
            if (A[D10] != null) Q[D10] = w5.expectNonNull(w5.parseRfc3339DateTimeWithOffset(A[D10]));
            return Q
        }, "de_Credentials"),
        DNQ = Q9((A, B) => {
            let Q = {};
            if (A[rD] != null) Q[rD] = w5.expectString(A[rD]);
            return Q
        }, "de_ExpiredTokenException"),
        GNQ = Q9((A, B) => {
            let Q = {};
            if (A[rD] != null) Q[rD] = w5.expectString(A[rD]);
            return Q
        }, "de_IDPCommunicationErrorException"),
        FNQ = Q9((A, B) => {
            let Q = {};
            if (A[rD] != null) Q[rD] = w5.expectString(A[rD]);
            return Q
        }, "de_IDPRejectedClaimException"),
        INQ = Q9((A, B) => {
            let Q = {};
            if (A[rD] != null) Q[rD] = w5.expectString(A[rD]);
            return Q
        }, "de_InvalidIdentityTokenException"),
        YNQ = Q9((A, B) => {
            let Q = {};
            if (A[rD] != null) Q[rD] = w5.expectString(A[rD]);
            return Q
        }, "de_MalformedPolicyDocumentException"),
        WNQ = Q9((A, B) => {
            let Q = {};
            if (A[rD] != null) Q[rD] = w5.expectString(A[rD]);
            return Q
        }, "de_PackedPolicyTooLargeException"),
        JNQ = Q9((A, B) => {
            let Q = {};
            if (A[rD] != null) Q[rD] = w5.expectString(A[rD]);
            return Q
        }, "de_RegionDisabledException"),
        aO = Q9((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        XNQ = w5.withBaseException(nO),
        nNA = Q9(async (A, B, Q, Z, D) => {
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
            return new bqQ.HttpRequest(W)
        }, "buildHttpRpcRequest"),
        aNA = {
            "content-type": "application/x-www-form-urlencoded"
        },
        sNA = "2011-06-15",
        rNA = "Action",
        ee1 = "AccessKeyId",
        VNQ = "AssumeRole",
        A10 = "AssumedRoleId",
        Dn = "AssumedRoleUser",
        CNQ = "AssumeRoleWithWebIdentity",
        B10 = "Arn",
        Q10 = "Audience",
        Gn = "Credentials",
        Z10 = "ContextAssertion",
        Fn = "DurationSeconds",
        D10 = "Expiration",
        G10 = "ExternalId",
        F10 = "Key",
        In = "Policy",
        Yn = "PolicyArns",
        I10 = "ProviderArn",
        Y10 = "ProvidedContexts",
        W10 = "ProviderId",
        Wn = "PackedPolicySize",
        J10 = "Provider",
        Jn = "RoleArn",
        Xn = "RoleSessionName",
        X10 = "SecretAccessKey",
        V10 = "SubjectFromWebIdentityToken",
        iO = "SourceIdentity",
        C10 = "SerialNumber",
        K10 = "SessionToken",
        H10 = "Tags",
        z10 = "TokenCode",
        E10 = "TransitiveTagKeys",
        oNA = "Version",
        U10 = "Value",
        w10 = "WebIdentityToken",
        $10 = "arn",
        rD = "message",
        tNA = Q9((A) => Object.entries(A).map(([B, Q]) => w5.extendedEncodeURIComponent(B) + "=" + w5.extendedEncodeURIComponent(Q)).join("&"), "buildFormUrlencodedString"),
        KNQ = Q9((A, B) => {
            if (B.Error?.Code !== void 0) return B.Error.Code;
            if (A.statusCode == 404) return "NotFound"
        }, "loadQueryErrorCode"),
        O10 = class extends _qQ.Command.classBuilder().ep(xqQ.commonParams).m(function(A, B, Q, Z) {
            return [yqQ.getSerdePlugin(Q, this.serialize, this.deserialize), kqQ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(void 0, _NA).ser(fqQ).de(gqQ).build() {
            static {
                Q9(this, "AssumeRoleCommand")
            }
        },
        HNQ = T6(),
        zNQ = y3(),
        ENQ = XD(),
        UNQ = xQ1(),
        T10 = class extends ENQ.Command.classBuilder().ep(UNQ.commonParams).m(function(A, B, Q, Z) {
            return [zNQ.getSerdePlugin(Q, this.serialize, this.deserialize), HNQ.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(uNA, mNA).ser(hqQ).de(uqQ).build() {
            static {
                Q9(this, "AssumeRoleWithWebIdentityCommand")
            }
        },
        wNQ = _Q1(),
        $NQ = {
            AssumeRoleCommand: O10,
            AssumeRoleWithWebIdentityCommand: T10
        },
        eNA = class extends wNQ.STSClient {
            static {
                Q9(this, "STS")
            }
        };
    jqQ.createAggregatedClient($NQ, eNA);
    var qNQ = xQ1(),
        N10 = jN(),
        kNA = "us-east-1",
        ALA = Q9((A) => {
            if (typeof A?.Arn === "string") {
                let B = A.Arn.split(":");
                if (B.length > 4 && B[4] !== "") return B[4]
            }
            return
        }, "getAccountIdFromAssumedRoleUser"),
        BLA = Q9(async (A, B, Q) => {
            let Z = typeof A === "function" ? await A() : A,
                D = typeof B === "function" ? await B() : B;
            return Q?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${Z} (provider)`, `${D} (parent client)`, `${kNA} (STS default)`), Z ?? D ?? kNA
        }, "resolveRegion"),
        NNQ = Q9((A, B) => {
            let Q, Z;
            return async (D, G) => {
                if (Z = D, !Q) {
                    let {
                        logger: J = A?.parentClientConfig?.logger,
                        region: X,
                        requestHandler: V = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: C
                    } = A, K = await BLA(X, A?.parentClientConfig?.region, C), H = !QLA(V);
                    Q = new B({
                        profile: A?.parentClientConfig?.profile,
                        credentialDefaultProvider: Q9(() => async () => Z, "credentialDefaultProvider"),
                        region: K,
                        requestHandler: H ? V : void 0,
                        logger: J
                    })
                }
                let {
                    Credentials: F,
                    AssumedRoleUser: I
                } = await Q.send(new O10(G));
                if (!F || !F.AccessKeyId || !F.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${G.RoleArn}`);
                let Y = ALA(I),
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
                return N10.setCredentialFeature(W, "CREDENTIALS_STS_ASSUME_ROLE", "i"), W
            }
        }, "getDefaultRoleAssumer"),
        LNQ = Q9((A, B) => {
            let Q;
            return async (Z) => {
                if (!Q) {
                    let {
                        logger: Y = A?.parentClientConfig?.logger,
                        region: W,
                        requestHandler: J = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: X
                    } = A, V = await BLA(W, A?.parentClientConfig?.region, X), C = !QLA(J);
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
                } = await Q.send(new T10(Z));
                if (!D || !D.AccessKeyId || !D.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${Z.RoleArn}`);
                let F = ALA(G),
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
                if (F) N10.setCredentialFeature(I, "RESOLVED_ACCOUNT_ID", "T");
                return N10.setCredentialFeature(I, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k"), I
            }
        }, "getDefaultRoleAssumerWithWebIdentity"),
        QLA = Q9((A) => {
            return A?.metadata?.handlerProtocol === "h2"
        }, "isH2"),
        ZLA = _Q1(),
        DLA = Q9((A, B) => {
            if (!B) return A;
            else return class Q extends A {
                static {
                    Q9(this, "CustomizableSTSClient")
                }
                constructor(Z) {
                    super(Z);
                    for (let D of B) this.middlewareStack.use(D)
                }
            }
        }, "getCustomizableStsClientCtor"),
        GLA = Q9((A = {}, B) => NNQ(A, DLA(ZLA.STSClient, B)), "getDefaultRoleAssumer"),
        FLA = Q9((A = {}, B) => LNQ(A, DLA(ZLA.STSClient, B)), "getDefaultRoleAssumerWithWebIdentity"),
        MNQ = Q9((A) => (B) => A({
            roleAssumer: GLA(B),
            roleAssumerWithWebIdentity: FLA(B),
            ...B
        }), "decorateDefaultCredentialProvider")
});