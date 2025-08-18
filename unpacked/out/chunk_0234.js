/* chunk:234 bytes:[5074188, 5081528) size:7340 source:unpacked-cli.js */
var KQ2 = E((VQ2) => {
    Object.defineProperty(VQ2, "__esModule", {
        value: !0
    });
    VQ2.getRuntimeConfig = void 0;
    var AC4 = HI(),
        BC4 = HB(),
        QC4 = d4(),
        ZC4 = JD(),
        JQ2 = I_(),
        XQ2 = lB(),
        DC4 = I80(),
        GC4 = WQ2(),
        FC4 = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? JQ2.fromBase64,
                base64Encoder: A?.base64Encoder ?? JQ2.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? GC4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? DC4.defaultSSOHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new AC4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new BC4.NoAuthSigner
                }],
                logger: A?.logger ?? new QC4.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO",
                urlParser: A?.urlParser ?? ZC4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? XQ2.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? XQ2.toUtf8
            }
        };
    VQ2.getRuntimeConfig = FC4
});
var qQ2 = E((wQ2) => {
    Object.defineProperty(wQ2, "__esModule", {
        value: !0
    });
    wQ2.getRuntimeConfig = void 0;
    var IC4 = ig(),
        YC4 = IC4.__importDefault(b92()),
        HQ2 = HI(),
        zQ2 = L81(),
        fN1 = z4(),
        WC4 = mG(),
        EQ2 = u4(),
        rg = IZ(),
        UQ2 = x3(),
        JC4 = dG(),
        XC4 = aD(),
        VC4 = KQ2(),
        CC4 = d4(),
        KC4 = cG(),
        HC4 = d4(),
        zC4 = (A) => {
            HC4.emitWarningIfUnsupportedVersion(process.version);
            let B = KC4.resolveDefaultsModeConfig(A),
                Q = () => B().then(CC4.loadConfigsForDefaultMode),
                Z = VC4.getRuntimeConfig(A);
            HQ2.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? rg.loadConfig(HQ2.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? JC4.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? zQ2.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: YC4.default.version
                }),
                maxAttempts: A?.maxAttempts ?? rg.loadConfig(EQ2.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? rg.loadConfig(fN1.NODE_REGION_CONFIG_OPTIONS, {
                    ...fN1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: UQ2.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? rg.loadConfig({
                    ...EQ2.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || XC4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? WC4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? UQ2.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? rg.loadConfig(fN1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? rg.loadConfig(fN1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? rg.loadConfig(zQ2.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    wQ2.getRuntimeConfig = zC4
});
var R81 = E((H$5, TQ2) => {
    var {
        defineProperty: hN1,
        getOwnPropertyDescriptor: EC4,
        getOwnPropertyNames: UC4
    } = Object, wC4 = Object.prototype.hasOwnProperty, ML = (A, B) => hN1(A, "name", {
        value: B,
        configurable: !0
    }), $C4 = (A, B) => {
        for (var Q in B) hN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, qC4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of UC4(B))
                if (!wC4.call(A, D) && D !== Q) hN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = EC4(B, D)) || Z.enumerable
                })
        }
        return A
    }, NC4 = (A) => qC4(hN1({}, "__esModule", {
        value: !0
    }), A), LQ2 = {};
    $C4(LQ2, {
        NODE_REGION_CONFIG_FILE_OPTIONS: () => OC4,
        NODE_REGION_CONFIG_OPTIONS: () => RC4,
        REGION_ENV_NAME: () => MQ2,
        REGION_INI_NAME: () => RQ2,
        getAwsRegionExtensionConfiguration: () => LC4,
        resolveAwsRegionExtensionConfiguration: () => MC4,
        resolveRegionConfig: () => TC4
    });
    TQ2.exports = NC4(LQ2);
    var LC4 = ML((A) => {
            return {
                setRegion(B) {
                    A.region = B
                },
                region() {
                    return A.region
                }
            }
        }, "getAwsRegionExtensionConfiguration"),
        MC4 = ML((A) => {
            return {
                region: A.region()
            }
        }, "resolveAwsRegionExtensionConfiguration"),
        MQ2 = "AWS_REGION",
        RQ2 = "region",
        RC4 = {
            environmentVariableSelector: ML((A) => A[MQ2], "environmentVariableSelector"),
            configFileSelector: ML((A) => A[RQ2], "configFileSelector"),
            default: ML(() => {
                throw new Error("Region is missing")
            }, "default")
        },
        OC4 = {
            preferredFile: "credentials"
        },
        OQ2 = ML((A) => typeof A === "string" && (A.startsWith("fips-") || A.endsWith("-fips")), "isFipsRegion"),
        NQ2 = ML((A) => OQ2(A) ? ["fips-aws-global", "aws-fips"].includes(A) ? "us-east-1" : A.replace(/fips-(dkr-|prod-)?|-fips/, "") : A, "getRealRegion"),
        TC4 = ML((A) => {
            let {
                region: B,
                useFipsEndpoint: Q
            } = A;
            if (!B) throw new Error("Region is missing");
            return Object.assign(A, {
                region: ML(async () => {
                    if (typeof B === "string") return NQ2(B);
                    let Z = await B();
                    return NQ2(Z)
                }, "region"),
                useFipsEndpoint: ML(async () => {
                    let Z = typeof B === "string" ? B : await B();
                    if (OQ2(Z)) return !0;
                    return typeof Q !== "function" ? Promise.resolve(!!Q) : Q()
                }, "useFipsEndpoint")
            })
        }, "resolveRegionConfig")
});