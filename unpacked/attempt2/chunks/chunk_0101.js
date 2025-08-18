/* chunk:101 bytes:[2411324, 2426195) size:14871 source:unpacked-cli.js */
var lHA = E((QQ5, cHA) => {
    var {
        defineProperty: iz1,
        getOwnPropertyDescriptor: QCQ,
        getOwnPropertyNames: ZCQ
    } = Object, DCQ = Object.prototype.hasOwnProperty, $V = (A, B) => iz1(A, "name", {
        value: B,
        configurable: !0
    }), GCQ = (A, B) => {
        for (var Q in B) iz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, FCQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ZCQ(B))
                if (!DCQ.call(A, D) && D !== Q) iz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = QCQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, ICQ = (A) => FCQ(iz1({}, "__esModule", {
        value: !0
    }), A), gHA = {};
    GCQ(gHA, {
        _toBool: () => WCQ,
        _toNum: () => JCQ,
        _toStr: () => YCQ,
        awsExpectUnion: () => VCQ,
        loadRestJsonErrorCode: () => HCQ,
        loadRestXmlErrorCode: () => wCQ,
        parseJsonBody: () => mHA,
        parseJsonErrorBody: () => KCQ,
        parseXmlBody: () => dHA,
        parseXmlErrorBody: () => UCQ
    });
    cHA.exports = ICQ(gHA);
    var YCQ = $V((A) => {
            if (A == null) return A;
            if (typeof A === "number" || typeof A === "bigint") {
                let B = new Error(`Received number ${A} where a string was expected.`);
                return B.name = "Warning", console.warn(B), String(A)
            }
            if (typeof A === "boolean") {
                let B = new Error(`Received boolean ${A} where a string was expected.`);
                return B.name = "Warning", console.warn(B), String(A)
            }
            return A
        }, "_toStr"),
        WCQ = $V((A) => {
            if (A == null) return A;
            if (typeof A === "string") {
                let B = A.toLowerCase();
                if (A !== "" && B !== "false" && B !== "true") {
                    let Q = new Error(`Received string "${A}" where a boolean was expected.`);
                    Q.name = "Warning", console.warn(Q)
                }
                return A !== "" && B !== "false"
            }
            return A
        }, "_toBool"),
        JCQ = $V((A) => {
            if (A == null) return A;
            if (typeof A === "string") {
                let B = Number(A);
                if (B.toString() !== A) {
                    let Q = new Error(`Received string "${A}" where a number was expected.`);
                    return Q.name = "Warning", console.warn(Q), A
                }
                return B
            }
            return A
        }, "_toNum"),
        XCQ = pz1(),
        VCQ = $V((A) => {
            if (A == null) return;
            if (typeof A === "object" && "__type" in A) delete A.__type;
            return XCQ.expectUnion(A)
        }, "awsExpectUnion"),
        CCQ = pz1(),
        uHA = $V((A, B) => CCQ.collectBody(A, B).then((Q) => B.utf8Encoder(Q)), "collectBodyString"),
        mHA = $V((A, B) => uHA(A, B).then((Q) => {
            if (Q.length) try {
                return JSON.parse(Q)
            } catch (Z) {
                if (Z?.name === "SyntaxError") Object.defineProperty(Z, "$responseBodyText", {
                    value: Q
                });
                throw Z
            }
            return {}
        }), "parseJsonBody"),
        KCQ = $V(async (A, B) => {
            let Q = await mHA(A, B);
            return Q.message = Q.message ?? Q.Message, Q
        }, "parseJsonErrorBody"),
        HCQ = $V((A, B) => {
            let Q = $V((G, F) => Object.keys(G).find((I) => I.toLowerCase() === F.toLowerCase()), "findKey"),
                Z = $V((G) => {
                    let F = G;
                    if (typeof F === "number") F = F.toString();
                    if (F.indexOf(",") >= 0) F = F.split(",")[0];
                    if (F.indexOf(":") >= 0) F = F.split(":")[0];
                    if (F.indexOf("#") >= 0) F = F.split("#")[1];
                    return F
                }, "sanitizeErrorCode"),
                D = Q(A.headers, "x-amzn-errortype");
            if (D !== void 0) return Z(A.headers[D]);
            if (B.code !== void 0) return Z(B.code);
            if (B.__type !== void 0) return Z(B.__type)
        }, "loadRestJsonErrorCode"),
        zCQ = pz1(),
        ECQ = $N(),
        dHA = $V((A, B) => uHA(A, B).then((Q) => {
            if (Q.length) {
                let Z = new ECQ.XMLParser({
                    attributeNamePrefix: "",
                    htmlEntities: !0,
                    ignoreAttributes: !1,
                    ignoreDeclaration: !0,
                    parseTagValue: !1,
                    trimValues: !1,
                    tagValueProcessor: $V((Y, W) => W.trim() === "" && W.includes(`
`) ? "" : void 0, "tagValueProcessor")
                });
                Z.addEntity("#xD", "\r"), Z.addEntity("#10", `
`);
                let D;
                try {
                    D = Z.parse(Q, !0)
                } catch (Y) {
                    if (Y && typeof Y === "object") Object.defineProperty(Y, "$responseBodyText", {
                        value: Q
                    });
                    throw Y
                }
                let G = "#text",
                    F = Object.keys(D)[0],
                    I = D[F];
                if (I[G]) I[F] = I[G], delete I[G];
                return zCQ.getValueFromTextNode(I)
            }
            return {}
        }), "parseXmlBody"),
        UCQ = $V(async (A, B) => {
            let Q = await dHA(A, B);
            if (Q.Error) Q.Error.message = Q.Error.message ?? Q.Error.Message;
            return Q
        }, "parseXmlErrorBody"),
        wCQ = $V((A, B) => {
            if (B?.Error?.Code !== void 0) return B.Error.Code;
            if (B?.Code !== void 0) return B.Code;
            if (A.statusCode == 404) return "NotFound"
        }, "loadRestXmlErrorCode")
});
var WI = E((KQ1) => {
    Object.defineProperty(KQ1, "__esModule", {
        value: !0
    });
    var dt1 = HKA();
    dt1.__exportStar(jN(), KQ1);
    dt1.__exportStar($HA(), KQ1);
    dt1.__exportStar(lHA(), KQ1)
});
var fi = E((DQ5, QzA) => {
    var {
        defineProperty: az1,
        getOwnPropertyDescriptor: $CQ,
        getOwnPropertyNames: qCQ
    } = Object, NCQ = Object.prototype.hasOwnProperty, dO = (A, B) => az1(A, "name", {
        value: B,
        configurable: !0
    }), LCQ = (A, B) => {
        for (var Q in B) az1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, MCQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of qCQ(B))
                if (!NCQ.call(A, D) && D !== Q) az1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = $CQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, RCQ = (A) => MCQ(az1({}, "__esModule", {
        value: !0
    }), A), aHA = {};
    LCQ(aHA, {
        DEFAULT_UA_APP_ID: () => sHA,
        getUserAgentMiddlewareOptions: () => BzA,
        getUserAgentPlugin: () => _CQ,
        resolveUserAgentConfig: () => oHA,
        userAgentMiddleware: () => AzA
    });
    QzA.exports = RCQ(aHA);
    var OCQ = HB(),
        sHA = void 0;

    function rHA(A) {
        if (A === void 0) return !0;
        return typeof A === "string" && A.length <= 50
    }
    dO(rHA, "isValidUserAgentAppId");

    function oHA(A) {
        let B = OCQ.normalizeProvider(A.userAgentAppId ?? sHA),
            {
                customUserAgent: Q
            } = A;
        return Object.assign(A, {
            customUserAgent: typeof Q === "string" ? [
                [Q]
            ] : Q,
            userAgentAppId: dO(async () => {
                let Z = await B();
                if (!rHA(Z)) {
                    let D = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console : A.logger;
                    if (typeof Z !== "string") D?.warn("userAgentAppId must be a string or undefined.");
                    else if (Z.length > 50) D?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.")
                }
                return Z
            }, "userAgentAppId")
        })
    }
    dO(oHA, "resolveUserAgentConfig");
    var TCQ = ki(),
        PCQ = uCA(),
        _N = WI(),
        SCQ = /\d{12}\.ddb/;
    async function tHA(A, B, Q) {
        if (Q.request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") _N.setFeature(A, "PROTOCOL_RPC_V2_CBOR", "M");
        if (typeof B.retryStrategy === "function") {
            let G = await B.retryStrategy();
            if (typeof G.acquireInitialRetryToken === "function")
                if (G.constructor?.name?.includes("Adaptive")) _N.setFeature(A, "RETRY_MODE_ADAPTIVE", "F");
                else _N.setFeature(A, "RETRY_MODE_STANDARD", "E");
            else _N.setFeature(A, "RETRY_MODE_LEGACY", "D")
        }
        if (typeof B.accountIdEndpointMode === "function") {
            let G = A.endpointV2;
            if (String(G?.url?.hostname).match(SCQ)) _N.setFeature(A, "ACCOUNT_ID_ENDPOINT", "O");
            switch (await B.accountIdEndpointMode?.()) {
                case "disabled":
                    _N.setFeature(A, "ACCOUNT_ID_MODE_DISABLED", "Q");
                    break;
                case "preferred":
                    _N.setFeature(A, "ACCOUNT_ID_MODE_PREFERRED", "P");
                    break;
                case "required":
                    _N.setFeature(A, "ACCOUNT_ID_MODE_REQUIRED", "R");
                    break
            }
        }
        let D = A.__smithy_context?.selectedHttpAuthScheme?.identity;
        if (D?.$source) {
            let G = D;
            if (G.accountId) _N.setFeature(A, "RESOLVED_ACCOUNT_ID", "T");
            for (let [F, I] of Object.entries(G.$source ?? {})) _N.setFeature(A, F, I)
        }
    }
    dO(tHA, "checkFeatures");
    var pHA = "user-agent",
        ct1 = "x-amz-user-agent",
        iHA = " ",
        lt1 = "/",
        jCQ = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g,
        kCQ = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g,
        nHA = "-",
        yCQ = 1024;

    function eHA(A) {
        let B = "";
        for (let Q in A) {
            let Z = A[Q];
            if (B.length + Z.length + 1 <= yCQ) {
                if (B.length) B += "," + Z;
                else B += Z;
                continue
            }
            break
        }
        return B
    }
    dO(eHA, "encodeFeatures");
    var AzA = dO((A) => (B, Q) => async (Z) => {
            let {
                request: D
            } = Z;
            if (!PCQ.HttpRequest.isInstance(D)) return B(Z);
            let {
                headers: G
            } = D, F = Q?.userAgent?.map(nz1) || [], I = (await A.defaultUserAgentProvider()).map(nz1);
            await tHA(Q, A, Z);
            let Y = Q;
            I.push(`m/${eHA(Object.assign({},Q.__smithy_context?.features,Y.__aws_sdk_context?.features))}`);
            let W = A?.customUserAgent?.map(nz1) || [],
                J = await A.userAgentAppId();
            if (J) I.push(nz1([`app/${J}`]));
            let X = TCQ.getUserAgentPrefix(),
                V = (X ? [X] : []).concat([...I, ...F, ...W]).join(iHA),
                C = [...I.filter((K) => K.startsWith("aws-sdk-")), ...W].join(iHA);
            if (A.runtime !== "browser") {
                if (C) G[ct1] = G[ct1] ? `${G[pHA]} ${C}` : C;
                G[pHA] = V
            } else G[ct1] = V;
            return B({
                ...Z,
                request: D
            })
        }, "userAgentMiddleware"),
        nz1 = dO((A) => {
            let B = A[0].split(lt1).map((F) => F.replace(jCQ, nHA)).join(lt1),
                Q = A[1]?.replace(kCQ, nHA),
                Z = B.indexOf(lt1),
                D = B.substring(0, Z),
                G = B.substring(Z + 1);
            if (D === "api") G = G.toLowerCase();
            return [D, G, Q].filter((F) => F && F.length > 0).reduce((F, I, Y) => {
                switch (Y) {
                    case 0:
                        return I;
                    case 1:
                        return `${F}/${I}`;
                    default:
                        return `${F}#${I}`
                }
            }, "")
        }, "escapeUserAgent"),
        BzA = {
            name: "getUserAgentMiddleware",
            step: "build",
            priority: "low",
            tags: ["SET_USER_AGENT", "USER_AGENT"],
            override: !0
        },
        _CQ = dO((A) => ({
            applyToStack: dO((B) => {
                B.add(AzA(A), BzA)
            }, "applyToStack")
        }), "getUserAgentPlugin")
});
var it1 = E((ZzA) => {
    Object.defineProperty(ZzA, "__esModule", {
        value: !0
    });
    ZzA.resolveHttpAuthSchemeConfig = ZzA.defaultSSOHttpAuthSchemeProvider = ZzA.defaultSSOHttpAuthSchemeParametersProvider = void 0;
    var xCQ = WI(),
        pt1 = E5(),
        vCQ = async (A, B, Q) => {
            return {
                operation: pt1.getSmithyContext(B).operation,
                region: await pt1.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    ZzA.defaultSSOHttpAuthSchemeParametersProvider = vCQ;

    function bCQ(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "awsssoportal",
                region: A.region
            },
            propertiesExtractor: (B, Q) => ({
                signingProperties: {
                    config: B,
                    context: Q
                }
            })
        }
    }

    function sz1(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var fCQ = (A) => {
        let B = [];
        switch (A.operation) {
            case "GetRoleCredentials": {
                B.push(sz1(A));
                break
            }
            case "ListAccountRoles": {
                B.push(sz1(A));
                break
            }
            case "ListAccounts": {
                B.push(sz1(A));
                break
            }
            case "Logout": {
                B.push(sz1(A));
                break
            }
            default:
                B.push(bCQ(A))
        }
        return B
    };
    ZzA.defaultSSOHttpAuthSchemeProvider = fCQ;
    var hCQ = (A) => {
        let B = xCQ.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: pt1.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    ZzA.resolveHttpAuthSchemeConfig = hCQ
});