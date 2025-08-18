/* chunk:257 bytes:[5526283, 5533623) size:7340 source:unpacked-cli.js */
var oF2 = E((sF2) => {
    Object.defineProperty(sF2, "__esModule", {
        value: !0
    });
    sF2.getRuntimeConfig = void 0;
    var TO4 = UI(),
        PO4 = HB(),
        SO4 = H6(),
        jO4 = JD(),
        nF2 = U_(),
        aF2 = lB(),
        kO4 = F70(),
        yO4 = iF2(),
        _O4 = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? nF2.fromBase64,
                base64Encoder: A?.base64Encoder ?? nF2.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? yO4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? kO4.defaultSSOHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new TO4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new PO4.NoAuthSigner
                }],
                logger: A?.logger ?? new SO4.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO",
                urlParser: A?.urlParser ?? jO4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? aF2.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? aF2.toUtf8
            }
        };
    sF2.getRuntimeConfig = _O4
});
var DI2 = E((QI2) => {
    Object.defineProperty(QI2, "__esModule", {
        value: !0
    });
    QI2.getRuntimeConfig = void 0;
    var xO4 = Du(),
        vO4 = xO4.__importDefault(wF2()),
        tF2 = UI(),
        eF2 = p81(),
        cL1 = z4(),
        bO4 = mG(),
        AI2 = u4(),
        Yu = IZ(),
        BI2 = x3(),
        fO4 = dG(),
        hO4 = aD(),
        gO4 = oF2(),
        uO4 = H6(),
        mO4 = cG(),
        dO4 = H6(),
        cO4 = (A) => {
            dO4.emitWarningIfUnsupportedVersion(process.version);
            let B = mO4.resolveDefaultsModeConfig(A),
                Q = () => B().then(uO4.loadConfigsForDefaultMode),
                Z = gO4.getRuntimeConfig(A);
            tF2.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? Yu.loadConfig(tF2.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? fO4.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? eF2.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: vO4.default.version
                }),
                maxAttempts: A?.maxAttempts ?? Yu.loadConfig(AI2.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? Yu.loadConfig(cL1.NODE_REGION_CONFIG_OPTIONS, {
                    ...cL1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: BI2.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? Yu.loadConfig({
                    ...AI2.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || hO4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? bO4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? BI2.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? Yu.loadConfig(cL1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? Yu.loadConfig(cL1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? Yu.loadConfig(eF2.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    QI2.getRuntimeConfig = cO4
});
var n81 = E((kN5, JI2) => {
    var {
        defineProperty: lL1,
        getOwnPropertyDescriptor: lO4,
        getOwnPropertyNames: pO4
    } = Object, iO4 = Object.prototype.hasOwnProperty, yL = (A, B) => lL1(A, "name", {
        value: B,
        configurable: !0
    }), nO4 = (A, B) => {
        for (var Q in B) lL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, aO4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of pO4(B))
                if (!iO4.call(A, D) && D !== Q) lL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = lO4(B, D)) || Z.enumerable
                })
        }
        return A
    }, sO4 = (A) => aO4(lL1({}, "__esModule", {
        value: !0
    }), A), FI2 = {};
    nO4(FI2, {
        NODE_REGION_CONFIG_FILE_OPTIONS: () => eO4,
        NODE_REGION_CONFIG_OPTIONS: () => tO4,
        REGION_ENV_NAME: () => II2,
        REGION_INI_NAME: () => YI2,
        getAwsRegionExtensionConfiguration: () => rO4,
        resolveAwsRegionExtensionConfiguration: () => oO4,
        resolveRegionConfig: () => AT4
    });
    JI2.exports = sO4(FI2);
    var rO4 = yL((A) => {
            return {
                setRegion(B) {
                    A.region = B
                },
                region() {
                    return A.region
                }
            }
        }, "getAwsRegionExtensionConfiguration"),
        oO4 = yL((A) => {
            return {
                region: A.region()
            }
        }, "resolveAwsRegionExtensionConfiguration"),
        II2 = "AWS_REGION",
        YI2 = "region",
        tO4 = {
            environmentVariableSelector: yL((A) => A[II2], "environmentVariableSelector"),
            configFileSelector: yL((A) => A[YI2], "configFileSelector"),
            default: yL(() => {
                throw new Error("Region is missing")
            }, "default")
        },
        eO4 = {
            preferredFile: "credentials"
        },
        WI2 = yL((A) => typeof A === "string" && (A.startsWith("fips-") || A.endsWith("-fips")), "isFipsRegion"),
        GI2 = yL((A) => WI2(A) ? ["fips-aws-global", "aws-fips"].includes(A) ? "us-east-1" : A.replace(/fips-(dkr-|prod-)?|-fips/, "") : A, "getRealRegion"),
        AT4 = yL((A) => {
            let {
                region: B,
                useFipsEndpoint: Q
            } = A;
            if (!B) throw new Error("Region is missing");
            return Object.assign(A, {
                region: yL(async () => {
                    if (typeof B === "string") return GI2(B);
                    let Z = await B();
                    return GI2(Z)
                }, "region"),
                useFipsEndpoint: yL(async () => {
                    let Z = typeof B === "string" ? B : await B();
                    if (WI2(Z)) return !0;
                    return typeof Q !== "function" ? Promise.resolve(!!Q) : Q()
                }, "useFipsEndpoint")
            })
        }, "resolveRegionConfig")
});