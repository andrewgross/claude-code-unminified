/* chunk:279 bytes:[5954637, 5982615) size:27978 source:unpacked-cli.js */
var AR1 = E((VR5, GG0) => {
    var {
        defineProperty: eM1,
        getOwnPropertyDescriptor: ku4,
        getOwnPropertyNames: yu4
    } = Object, _u4 = Object.prototype.hasOwnProperty, G9 = (A, B) => eM1(A, "name", {
        value: B,
        configurable: !0
    }), xu4 = (A, B) => {
        for (var Q in B) eM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, tD0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of yu4(B))
                if (!_u4.call(A, D) && D !== Q) eM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ku4(B, D)) || Z.enumerable
                })
        }
        return A
    }, vu4 = (A, B, Q) => (tD0(A, B, "default"), Q && tD0(Q, B, "default")), bu4 = (A) => tD0(eM1({}, "__esModule", {
        value: !0
    }), A), AG0 = {};
    xu4(AG0, {
        AssumeRoleCommand: () => ZG0,
        AssumeRoleResponseFilterSensitiveLog: () => SE2,
        AssumeRoleWithWebIdentityCommand: () => DG0,
        AssumeRoleWithWebIdentityRequestFilterSensitiveLog: () => bE2,
        AssumeRoleWithWebIdentityResponseFilterSensitiveLog: () => fE2,
        ClientInputEndpointParameters: () => Pm4.ClientInputEndpointParameters,
        CredentialsFilterSensitiveLog: () => BG0,
        ExpiredTokenException: () => jE2,
        IDPCommunicationErrorException: () => hE2,
        IDPRejectedClaimException: () => xE2,
        InvalidIdentityTokenException: () => vE2,
        MalformedPolicyDocumentException: () => kE2,
        PackedPolicyTooLargeException: () => yE2,
        RegionDisabledException: () => _E2,
        STS: () => sE2,
        STSServiceException: () => FP,
        decorateDefaultCredentialProvider: () => km4,
        getDefaultRoleAssumer: () => BU2,
        getDefaultRoleAssumerWithWebIdentity: () => QU2
    });
    GG0.exports = bu4(AG0);
    vu4(AG0, H51(), GG0.exports);
    var fu4 = P8(),
        hu4 = T6(),
        gu4 = y3(),
        uu4 = P8(),
        mu4 = z51(),
        PE2 = P8(),
        du4 = P8(),
        FP = class A extends du4.ServiceException {
            static {
                G9(this, "STSServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        BG0 = G9((A) => ({
            ...A,
            ...A.SecretAccessKey && {
                SecretAccessKey: PE2.SENSITIVE_STRING
            }
        }), "CredentialsFilterSensitiveLog"),
        SE2 = G9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: BG0(A.Credentials)
            }
        }), "AssumeRoleResponseFilterSensitiveLog"),
        jE2 = class A extends FP {
            static {
                G9(this, "ExpiredTokenException")
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
        kE2 = class A extends FP {
            static {
                G9(this, "MalformedPolicyDocumentException")
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
        yE2 = class A extends FP {
            static {
                G9(this, "PackedPolicyTooLargeException")
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
        _E2 = class A extends FP {
            static {
                G9(this, "RegionDisabledException")
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
        xE2 = class A extends FP {
            static {
                G9(this, "IDPRejectedClaimException")
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
        vE2 = class A extends FP {
            static {
                G9(this, "InvalidIdentityTokenException")
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
        bE2 = G9((A) => ({
            ...A,
            ...A.WebIdentityToken && {
                WebIdentityToken: PE2.SENSITIVE_STRING
            }
        }), "AssumeRoleWithWebIdentityRequestFilterSensitiveLog"),
        fE2 = G9((A) => ({
            ...A,
            ...A.Credentials && {
                Credentials: BG0(A.Credentials)
            }
        }), "AssumeRoleWithWebIdentityResponseFilterSensitiveLog"),
        hE2 = class A extends FP {
            static {
                G9(this, "IDPCommunicationErrorException")
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
        QG0 = bV(),
        cu4 = SK(),
        M5 = P8(),
        lu4 = G9(async (A, B) => {
            let Q = lE2,
                Z;
            return Z = aE2({
                ...Bm4(A, B),
                [iE2]: wm4,
                [nE2]: pE2
            }), cE2(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleCommand"),
        pu4 = G9(async (A, B) => {
            let Q = lE2,
                Z;
            return Z = aE2({
                ...Qm4(A, B),
                [iE2]: $m4,
                [nE2]: pE2
            }), cE2(B, Q, "/", void 0, Z)
        }, "se_AssumeRoleWithWebIdentityCommand"),
        iu4 = G9(async (A, B) => {
            if (A.statusCode >= 300) return gE2(A, B);
            let Q = await QG0.parseXmlBody(A.body, B),
                Z = {};
            return Z = Wm4(Q.AssumeRoleResult, B), {
                $metadata: IP(A),
                ...Z
            }
        }, "de_AssumeRoleCommand"),
        nu4 = G9(async (A, B) => {
            if (A.statusCode >= 300) return gE2(A, B);
            let Q = await QG0.parseXmlBody(A.body, B),
                Z = {};
            return Z = Jm4(Q.AssumeRoleWithWebIdentityResult, B), {
                $metadata: IP(A),
                ...Z
            }
        }, "de_AssumeRoleWithWebIdentityCommand"),
        gE2 = G9(async (A, B) => {
            let Q = {
                    ...A,
                    body: await QG0.parseXmlErrorBody(A.body, B)
                },
                Z = qm4(A, Q.body);
            switch (Z) {
                case "ExpiredTokenException":
                case "com.amazonaws.sts#ExpiredTokenException":
                    throw await au4(Q, B);
                case "MalformedPolicyDocument":
                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                    throw await tu4(Q, B);
                case "PackedPolicyTooLarge":
                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                    throw await eu4(Q, B);
                case "RegionDisabledException":
                case "com.amazonaws.sts#RegionDisabledException":
                    throw await Am4(Q, B);
                case "IDPCommunicationError":
                case "com.amazonaws.sts#IDPCommunicationErrorException":
                    throw await su4(Q, B);
                case "IDPRejectedClaim":
                case "com.amazonaws.sts#IDPRejectedClaimException":
                    throw await ru4(Q, B);
                case "InvalidIdentityToken":
                case "com.amazonaws.sts#InvalidIdentityTokenException":
                    throw await ou4(Q, B);
                default:
                    let D = Q.body;
                    return Um4({
                        output: A,
                        parsedBody: D.Error,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        au4 = G9(async (A, B) => {
            let Q = A.body,
                Z = Xm4(Q.Error, B),
                D = new jE2({
                    $metadata: IP(A),
                    ...Z
                });
            return M5.decorateServiceException(D, Q)
        }, "de_ExpiredTokenExceptionRes"),
        su4 = G9(async (A, B) => {
            let Q = A.body,
                Z = Vm4(Q.Error, B),
                D = new hE2({
                    $metadata: IP(A),
                    ...Z
                });
            return M5.decorateServiceException(D, Q)
        }, "de_IDPCommunicationErrorExceptionRes"),
        ru4 = G9(async (A, B) => {
            let Q = A.body,
                Z = Cm4(Q.Error, B),
                D = new xE2({
                    $metadata: IP(A),
                    ...Z
                });
            return M5.decorateServiceException(D, Q)
        }, "de_IDPRejectedClaimExceptionRes"),
        ou4 = G9(async (A, B) => {
            let Q = A.body,
                Z = Km4(Q.Error, B),
                D = new vE2({
                    $metadata: IP(A),
                    ...Z
                });
            return M5.decorateServiceException(D, Q)
        }, "de_InvalidIdentityTokenExceptionRes"),
        tu4 = G9(async (A, B) => {
            let Q = A.body,
                Z = Hm4(Q.Error, B),
                D = new kE2({
                    $metadata: IP(A),
                    ...Z
                });
            return M5.decorateServiceException(D, Q)
        }, "de_MalformedPolicyDocumentExceptionRes"),
        eu4 = G9(async (A, B) => {
            let Q = A.body,
                Z = zm4(Q.Error, B),
                D = new yE2({
                    $metadata: IP(A),
                    ...Z
                });
            return M5.decorateServiceException(D, Q)
        }, "de_PackedPolicyTooLargeExceptionRes"),
        Am4 = G9(async (A, B) => {
            let Q = A.body,
                Z = Em4(Q.Error, B),
                D = new _E2({
                    $metadata: IP(A),
                    ...Z
                });
            return M5.decorateServiceException(D, Q)
        }, "de_RegionDisabledExceptionRes"),
        Bm4 = G9((A, B) => {
            let Q = {};
            if (A[Eo] != null) Q[Eo] = A[Eo];
            if (A[Uo] != null) Q[Uo] = A[Uo];
            if (A[Ho] != null) {
                let Z = uE2(A[Ho], B);
                if (A[Ho]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[Ko] != null) Q[Ko] = A[Ko];
            if (A[Co] != null) Q[Co] = A[Co];
            if (A[iD0] != null) {
                let Z = Ym4(A[iD0], B);
                if (A[iD0]?.length === 0) Q.Tags = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `Tags.${D}`;
                    Q[F] = G
                })
            }
            if (A[aD0] != null) {
                let Z = Im4(A[aD0], B);
                if (A[aD0]?.length === 0) Q.TransitiveTagKeys = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `TransitiveTagKeys.${D}`;
                    Q[F] = G
                })
            }
            if (A[bD0] != null) Q[bD0] = A[bD0];
            if (A[lD0] != null) Q[lD0] = A[lD0];
            if (A[nD0] != null) Q[nD0] = A[nD0];
            if (A[GP] != null) Q[GP] = A[GP];
            if (A[gD0] != null) {
                let Z = Gm4(A[gD0], B);
                if (A[gD0]?.length === 0) Q.ProvidedContexts = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `ProvidedContexts.${D}`;
                    Q[F] = G
                })
            }
            return Q
        }, "se_AssumeRoleRequest"),
        Qm4 = G9((A, B) => {
            let Q = {};
            if (A[Eo] != null) Q[Eo] = A[Eo];
            if (A[Uo] != null) Q[Uo] = A[Uo];
            if (A[rD0] != null) Q[rD0] = A[rD0];
            if (A[uD0] != null) Q[uD0] = A[uD0];
            if (A[Ho] != null) {
                let Z = uE2(A[Ho], B);
                if (A[Ho]?.length === 0) Q.PolicyArns = [];
                Object.entries(Z).forEach(([D, G]) => {
                    let F = `PolicyArns.${D}`;
                    Q[F] = G
                })
            }
            if (A[Ko] != null) Q[Ko] = A[Ko];
            if (A[Co] != null) Q[Co] = A[Co];
            return Q
        }, "se_AssumeRoleWithWebIdentityRequest"),
        uE2 = G9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = Zm4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_policyDescriptorListType"),
        Zm4 = G9((A, B) => {
            let Q = {};
            if (A[oD0] != null) Q[oD0] = A[oD0];
            return Q
        }, "se_PolicyDescriptorType"),
        Dm4 = G9((A, B) => {
            let Q = {};
            if (A[hD0] != null) Q[hD0] = A[hD0];
            if (A[xD0] != null) Q[xD0] = A[xD0];
            return Q
        }, "se_ProvidedContext"),
        Gm4 = G9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = Dm4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_ProvidedContextsListType"),
        Fm4 = G9((A, B) => {
            let Q = {};
            if (A[fD0] != null) Q[fD0] = A[fD0];
            if (A[sD0] != null) Q[sD0] = A[sD0];
            return Q
        }, "se_Tag"),
        Im4 = G9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                Q[`member.${Z}`] = D, Z++
            }
            return Q
        }, "se_tagKeyListType"),
        Ym4 = G9((A, B) => {
            let Q = {},
                Z = 1;
            for (let D of A) {
                if (D === null) continue;
                let G = Fm4(D, B);
                Object.entries(G).forEach(([F, I]) => {
                    Q[`member.${Z}.${F}`] = I
                }), Z++
            }
            return Q
        }, "se_tagListType"),
        mE2 = G9((A, B) => {
            let Q = {};
            if (A[kD0] != null) Q[kD0] = M5.expectString(A[kD0]);
            if (A[yD0] != null) Q[yD0] = M5.expectString(A[yD0]);
            return Q
        }, "de_AssumedRoleUser"),
        Wm4 = G9((A, B) => {
            let Q = {};
            if (A[Vo] != null) Q[Vo] = dE2(A[Vo], B);
            if (A[Xo] != null) Q[Xo] = mE2(A[Xo], B);
            if (A[zo] != null) Q[zo] = M5.strictParseInt32(A[zo]);
            if (A[GP] != null) Q[GP] = M5.expectString(A[GP]);
            return Q
        }, "de_AssumeRoleResponse"),
        Jm4 = G9((A, B) => {
            let Q = {};
            if (A[Vo] != null) Q[Vo] = dE2(A[Vo], B);
            if (A[cD0] != null) Q[cD0] = M5.expectString(A[cD0]);
            if (A[Xo] != null) Q[Xo] = mE2(A[Xo], B);
            if (A[zo] != null) Q[zo] = M5.strictParseInt32(A[zo]);
            if (A[mD0] != null) Q[mD0] = M5.expectString(A[mD0]);
            if (A[_D0] != null) Q[_D0] = M5.expectString(A[_D0]);
            if (A[GP] != null) Q[GP] = M5.expectString(A[GP]);
            return Q
        }, "de_AssumeRoleWithWebIdentityResponse"),
        dE2 = G9((A, B) => {
            let Q = {};
            if (A[jD0] != null) Q[jD0] = M5.expectString(A[jD0]);
            if (A[dD0] != null) Q[dD0] = M5.expectString(A[dD0]);
            if (A[pD0] != null) Q[pD0] = M5.expectString(A[pD0]);
            if (A[vD0] != null) Q[vD0] = M5.expectNonNull(M5.parseRfc3339DateTimeWithOffset(A[vD0]));
            return Q
        }, "de_Credentials"),
        Xm4 = G9((A, B) => {
            let Q = {};
            if (A[JG] != null) Q[JG] = M5.expectString(A[JG]);
            return Q
        }, "de_ExpiredTokenException"),
        Vm4 = G9((A, B) => {
            let Q = {};
            if (A[JG] != null) Q[JG] = M5.expectString(A[JG]);
            return Q
        }, "de_IDPCommunicationErrorException"),
        Cm4 = G9((A, B) => {
            let Q = {};
            if (A[JG] != null) Q[JG] = M5.expectString(A[JG]);
            return Q
        }, "de_IDPRejectedClaimException"),
        Km4 = G9((A, B) => {
            let Q = {};
            if (A[JG] != null) Q[JG] = M5.expectString(A[JG]);
            return Q
        }, "de_InvalidIdentityTokenException"),
        Hm4 = G9((A, B) => {
            let Q = {};
            if (A[JG] != null) Q[JG] = M5.expectString(A[JG]);
            return Q
        }, "de_MalformedPolicyDocumentException"),
        zm4 = G9((A, B) => {
            let Q = {};
            if (A[JG] != null) Q[JG] = M5.expectString(A[JG]);
            return Q
        }, "de_PackedPolicyTooLargeException"),
        Em4 = G9((A, B) => {
            let Q = {};
            if (A[JG] != null) Q[JG] = M5.expectString(A[JG]);
            return Q
        }, "de_RegionDisabledException"),
        IP = G9((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        Um4 = M5.withBaseException(FP),
        cE2 = G9(async (A, B, Q, Z, D) => {
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
            return new cu4.HttpRequest(W)
        }, "buildHttpRpcRequest"),
        lE2 = {
            "content-type": "application/x-www-form-urlencoded"
        },
        pE2 = "2011-06-15",
        iE2 = "Action",
        jD0 = "AccessKeyId",
        wm4 = "AssumeRole",
        kD0 = "AssumedRoleId",
        Xo = "AssumedRoleUser",
        $m4 = "AssumeRoleWithWebIdentity",
        yD0 = "Arn",
        _D0 = "Audience",
        Vo = "Credentials",
        xD0 = "ContextAssertion",
        Co = "DurationSeconds",
        vD0 = "Expiration",
        bD0 = "ExternalId",
        fD0 = "Key",
        Ko = "Policy",
        Ho = "PolicyArns",
        hD0 = "ProviderArn",
        gD0 = "ProvidedContexts",
        uD0 = "ProviderId",
        zo = "PackedPolicySize",
        mD0 = "Provider",
        Eo = "RoleArn",
        Uo = "RoleSessionName",
        dD0 = "SecretAccessKey",
        cD0 = "SubjectFromWebIdentityToken",
        GP = "SourceIdentity",
        lD0 = "SerialNumber",
        pD0 = "SessionToken",
        iD0 = "Tags",
        nD0 = "TokenCode",
        aD0 = "TransitiveTagKeys",
        nE2 = "Version",
        sD0 = "Value",
        rD0 = "WebIdentityToken",
        oD0 = "arn",
        JG = "message",
        aE2 = G9((A) => Object.entries(A).map(([B, Q]) => M5.extendedEncodeURIComponent(B) + "=" + M5.extendedEncodeURIComponent(Q)).join("&"), "buildFormUrlencodedString"),
        qm4 = G9((A, B) => {
            if (B.Error?.Code !== void 0) return B.Error.Code;
            if (A.statusCode == 404) return "NotFound"
        }, "loadQueryErrorCode"),
        ZG0 = class extends uu4.Command.classBuilder().ep(mu4.commonParams).m(function(A, B, Q, Z) {
            return [gu4.getSerdePlugin(Q, this.serialize, this.deserialize), hu4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(void 0, SE2).ser(lu4).de(iu4).build() {
            static {
                G9(this, "AssumeRoleCommand")
            }
        },
        Nm4 = T6(),
        Lm4 = y3(),
        Mm4 = P8(),
        Rm4 = z51(),
        DG0 = class extends Mm4.Command.classBuilder().ep(Rm4.commonParams).m(function(A, B, Q, Z) {
            return [Lm4.getSerdePlugin(Q, this.serialize, this.deserialize), Nm4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(bE2, fE2).ser(pu4).de(nu4).build() {
            static {
                G9(this, "AssumeRoleWithWebIdentityCommand")
            }
        },
        Om4 = H51(),
        Tm4 = {
            AssumeRoleCommand: ZG0,
            AssumeRoleWithWebIdentityCommand: DG0
        },
        sE2 = class extends Om4.STSClient {
            static {
                G9(this, "STS")
            }
        };
    fu4.createAggregatedClient(Tm4, sE2);
    var Pm4 = z51(),
        eD0 = FE(),
        TE2 = "us-east-1",
        rE2 = G9((A) => {
            if (typeof A?.Arn === "string") {
                let B = A.Arn.split(":");
                if (B.length > 4 && B[4] !== "") return B[4]
            }
            return
        }, "getAccountIdFromAssumedRoleUser"),
        oE2 = G9(async (A, B, Q) => {
            let Z = typeof A === "function" ? await A() : A,
                D = typeof B === "function" ? await B() : B;
            return Q?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${Z} (provider)`, `${D} (parent client)`, `${TE2} (STS default)`), Z ?? D ?? TE2
        }, "resolveRegion"),
        Sm4 = G9((A, B) => {
            let Q, Z;
            return async (D, G) => {
                if (Z = D, !Q) {
                    let {
                        logger: J = A?.parentClientConfig?.logger,
                        region: X,
                        requestHandler: V = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: C
                    } = A, K = await oE2(X, A?.parentClientConfig?.region, C), H = !tE2(V);
                    Q = new B({
                        profile: A?.parentClientConfig?.profile,
                        credentialDefaultProvider: G9(() => async () => Z, "credentialDefaultProvider"),
                        region: K,
                        requestHandler: H ? V : void 0,
                        logger: J
                    })
                }
                let {
                    Credentials: F,
                    AssumedRoleUser: I
                } = await Q.send(new ZG0(G));
                if (!F || !F.AccessKeyId || !F.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${G.RoleArn}`);
                let Y = rE2(I),
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
                return eD0.setCredentialFeature(W, "CREDENTIALS_STS_ASSUME_ROLE", "i"), W
            }
        }, "getDefaultRoleAssumer"),
        jm4 = G9((A, B) => {
            let Q;
            return async (Z) => {
                if (!Q) {
                    let {
                        logger: Y = A?.parentClientConfig?.logger,
                        region: W,
                        requestHandler: J = A?.parentClientConfig?.requestHandler,
                        credentialProviderLogger: X
                    } = A, V = await oE2(W, A?.parentClientConfig?.region, X), C = !tE2(J);
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
                } = await Q.send(new DG0(Z));
                if (!D || !D.AccessKeyId || !D.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${Z.RoleArn}`);
                let F = rE2(G),
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
                if (F) eD0.setCredentialFeature(I, "RESOLVED_ACCOUNT_ID", "T");
                return eD0.setCredentialFeature(I, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k"), I
            }
        }, "getDefaultRoleAssumerWithWebIdentity"),
        tE2 = G9((A) => {
            return A?.metadata?.handlerProtocol === "h2"
        }, "isH2"),
        eE2 = H51(),
        AU2 = G9((A, B) => {
            if (!B) return A;
            else return class Q extends A {
                static {
                    G9(this, "CustomizableSTSClient")
                }
                constructor(Z) {
                    super(Z);
                    for (let D of B) this.middlewareStack.use(D)
                }
            }
        }, "getCustomizableStsClientCtor"),
        BU2 = G9((A = {}, B) => Sm4(A, AU2(eE2.STSClient, B)), "getDefaultRoleAssumer"),
        QU2 = G9((A = {}, B) => jm4(A, AU2(eE2.STSClient, B)), "getDefaultRoleAssumerWithWebIdentity"),
        km4 = G9((A) => (B) => A({
            roleAssumer: BU2(B),
            roleAssumerWithWebIdentity: QU2(B),
            ...B
        }), "decorateDefaultCredentialProvider")
});