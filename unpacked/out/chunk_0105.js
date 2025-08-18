/* chunk:105 bytes:[2491047, 2507455) size:16408 source:unpacked-cli.js */
var EEA = E((HEA) => {
    Object.defineProperty(HEA, "__esModule", {
        value: !0
    });
    HEA.fromBase64 = void 0;
    var qHQ = GZ(),
        NHQ = /^[A-Za-z0-9+/]*={0,2}$/,
        LHQ = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!NHQ.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = qHQ.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    HEA.fromBase64 = LHQ
});
var $EA = E((UEA) => {
    Object.defineProperty(UEA, "__esModule", {
        value: !0
    });
    UEA.toBase64 = void 0;
    var MHQ = GZ(),
        RHQ = lB(),
        OHQ = (A) => {
            let B;
            if (typeof A === "string") B = RHQ.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return MHQ.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    UEA.toBase64 = OHQ
});
var LEA = E((UQ5, FE1) => {
    var {
        defineProperty: qEA,
        getOwnPropertyDescriptor: THQ,
        getOwnPropertyNames: PHQ
    } = Object, SHQ = Object.prototype.hasOwnProperty, Ye1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of PHQ(B))
                if (!SHQ.call(A, D) && D !== Q) qEA(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = THQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, NEA = (A, B, Q) => (Ye1(A, B, "default"), Q && Ye1(Q, B, "default")), jHQ = (A) => Ye1(qEA({}, "__esModule", {
        value: !0
    }), A), We1 = {};
    FE1.exports = jHQ(We1);
    NEA(We1, EEA(), FE1.exports);
    NEA(We1, $EA(), FE1.exports)
});
var uEA = E((hEA) => {
    Object.defineProperty(hEA, "__esModule", {
        value: !0
    });
    hEA.ruleSet = void 0;
    var xEA = "required",
        Kz = "fn",
        Hz = "argv",
        li = "ref",
        MEA = !0,
        REA = "isSet",
        qQ1 = "booleanEquals",
        di = "error",
        ci = "endpoint",
        cO = "tree",
        Je1 = "PartitionResult",
        Xe1 = "getAttr",
        OEA = {
            [xEA]: !1,
            type: "String"
        },
        TEA = {
            [xEA]: !0,
            default: !1,
            type: "Boolean"
        },
        PEA = {
            [li]: "Endpoint"
        },
        vEA = {
            [Kz]: qQ1,
            [Hz]: [{
                [li]: "UseFIPS"
            }, !0]
        },
        bEA = {
            [Kz]: qQ1,
            [Hz]: [{
                [li]: "UseDualStack"
            }, !0]
        },
        Cz = {},
        SEA = {
            [Kz]: Xe1,
            [Hz]: [{
                [li]: Je1
            }, "supportsFIPS"]
        },
        fEA = {
            [li]: Je1
        },
        jEA = {
            [Kz]: qQ1,
            [Hz]: [!0, {
                [Kz]: Xe1,
                [Hz]: [fEA, "supportsDualStack"]
            }]
        },
        kEA = [vEA],
        yEA = [bEA],
        _EA = [{
            [li]: "Region"
        }],
        kHQ = {
            version: "1.0",
            parameters: {
                Region: OEA,
                UseDualStack: TEA,
                UseFIPS: TEA,
                Endpoint: OEA
            },
            rules: [{
                conditions: [{
                    [Kz]: REA,
                    [Hz]: [PEA]
                }],
                rules: [{
                    conditions: kEA,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: di
                }, {
                    conditions: yEA,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: di
                }, {
                    endpoint: {
                        url: PEA,
                        properties: Cz,
                        headers: Cz
                    },
                    type: ci
                }],
                type: cO
            }, {
                conditions: [{
                    [Kz]: REA,
                    [Hz]: _EA
                }],
                rules: [{
                    conditions: [{
                        [Kz]: "aws.partition",
                        [Hz]: _EA,
                        assign: Je1
                    }],
                    rules: [{
                        conditions: [vEA, bEA],
                        rules: [{
                            conditions: [{
                                [Kz]: qQ1,
                                [Hz]: [MEA, SEA]
                            }, jEA],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: Cz,
                                    headers: Cz
                                },
                                type: ci
                            }],
                            type: cO
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: di
                        }],
                        type: cO
                    }, {
                        conditions: kEA,
                        rules: [{
                            conditions: [{
                                [Kz]: qQ1,
                                [Hz]: [SEA, MEA]
                            }],
                            rules: [{
                                conditions: [{
                                    [Kz]: "stringEquals",
                                    [Hz]: [{
                                        [Kz]: Xe1,
                                        [Hz]: [fEA, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://portal.sso.{Region}.amazonaws.com",
                                    properties: Cz,
                                    headers: Cz
                                },
                                type: ci
                            }, {
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: Cz,
                                    headers: Cz
                                },
                                type: ci
                            }],
                            type: cO
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: di
                        }],
                        type: cO
                    }, {
                        conditions: yEA,
                        rules: [{
                            conditions: [jEA],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: Cz,
                                    headers: Cz
                                },
                                type: ci
                            }],
                            type: cO
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: di
                        }],
                        type: cO
                    }, {
                        endpoint: {
                            url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}",
                            properties: Cz,
                            headers: Cz
                        },
                        type: ci
                    }],
                    type: cO
                }],
                type: cO
            }, {
                error: "Invalid Configuration: Missing Region",
                type: di
            }]
        };
    hEA.ruleSet = kHQ
});
var cEA = E((mEA) => {
    Object.defineProperty(mEA, "__esModule", {
        value: !0
    });
    mEA.defaultEndpointResolver = void 0;
    var yHQ = ki(),
        Ve1 = R7(),
        _HQ = uEA(),
        xHQ = new Ve1.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        vHQ = (A, B = {}) => {
            return xHQ.get(A, () => Ve1.resolveEndpoint(_HQ.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    mEA.defaultEndpointResolver = vHQ;
    Ve1.customEndpointFunctions.aws = yHQ.awsEndpointFunctions
});
var aEA = E((iEA) => {
    Object.defineProperty(iEA, "__esModule", {
        value: !0
    });
    iEA.getRuntimeConfig = void 0;
    var bHQ = WI(),
        fHQ = HB(),
        hHQ = $Q1(),
        gHQ = JD(),
        lEA = LEA(),
        pEA = lB(),
        uHQ = it1(),
        mHQ = cEA(),
        dHQ = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? lEA.fromBase64,
                base64Encoder: A?.base64Encoder ?? lEA.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? mHQ.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? uHQ.defaultSSOHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new bHQ.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new fHQ.NoAuthSigner
                }],
                logger: A?.logger ?? new hHQ.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO",
                urlParser: A?.urlParser ?? gHQ.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? pEA.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? pEA.toUtf8
            }
        };
    iEA.getRuntimeConfig = dHQ
});
var AUA = E((tEA) => {
    Object.defineProperty(tEA, "__esModule", {
        value: !0
    });
    tEA.getRuntimeConfig = void 0;
    var cHQ = _zA(),
        lHQ = cHQ.__importDefault(xzA()),
        pHQ = WI(),
        sEA = HQ1(),
        IE1 = z4(),
        iHQ = mG(),
        rEA = u4(),
        pi = IZ(),
        oEA = x3(),
        nHQ = dG(),
        aHQ = aD(),
        sHQ = aEA(),
        rHQ = $Q1(),
        oHQ = cG(),
        tHQ = $Q1(),
        eHQ = (A) => {
            tHQ.emitWarningIfUnsupportedVersion(process.version);
            let B = oHQ.resolveDefaultsModeConfig(A),
                Q = () => B().then(rHQ.loadConfigsForDefaultMode),
                Z = sHQ.getRuntimeConfig(A);
            pHQ.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                bodyLengthChecker: A?.bodyLengthChecker ?? nHQ.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? sEA.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: lHQ.default.version
                }),
                maxAttempts: A?.maxAttempts ?? pi.loadConfig(rEA.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? pi.loadConfig(IE1.NODE_REGION_CONFIG_OPTIONS, {
                    ...IE1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: oEA.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? pi.loadConfig({
                    ...rEA.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || aHQ.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? iHQ.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? oEA.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? pi.loadConfig(IE1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? pi.loadConfig(IE1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? pi.loadConfig(sEA.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    tEA.getRuntimeConfig = eHQ
});
var NQ1 = E((LQ5, FUA) => {
    var {
        defineProperty: YE1,
        getOwnPropertyDescriptor: AzQ,
        getOwnPropertyNames: BzQ
    } = Object, QzQ = Object.prototype.hasOwnProperty, vN = (A, B) => YE1(A, "name", {
        value: B,
        configurable: !0
    }), ZzQ = (A, B) => {
        for (var Q in B) YE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, DzQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of BzQ(B))
                if (!QzQ.call(A, D) && D !== Q) YE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = AzQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, GzQ = (A) => DzQ(YE1({}, "__esModule", {
        value: !0
    }), A), QUA = {};
    ZzQ(QUA, {
        NODE_REGION_CONFIG_FILE_OPTIONS: () => WzQ,
        NODE_REGION_CONFIG_OPTIONS: () => YzQ,
        REGION_ENV_NAME: () => ZUA,
        REGION_INI_NAME: () => DUA,
        getAwsRegionExtensionConfiguration: () => FzQ,
        resolveAwsRegionExtensionConfiguration: () => IzQ,
        resolveRegionConfig: () => JzQ
    });
    FUA.exports = GzQ(QUA);
    var FzQ = vN((A) => {
            return {
                setRegion(B) {
                    A.region = B
                },
                region() {
                    return A.region
                }
            }
        }, "getAwsRegionExtensionConfiguration"),
        IzQ = vN((A) => {
            return {
                region: A.region()
            }
        }, "resolveAwsRegionExtensionConfiguration"),
        ZUA = "AWS_REGION",
        DUA = "region",
        YzQ = {
            environmentVariableSelector: vN((A) => A[ZUA], "environmentVariableSelector"),
            configFileSelector: vN((A) => A[DUA], "configFileSelector"),
            default: vN(() => {
                throw new Error("Region is missing")
            }, "default")
        },
        WzQ = {
            preferredFile: "credentials"
        },
        GUA = vN((A) => typeof A === "string" && (A.startsWith("fips-") || A.endsWith("-fips")), "isFipsRegion"),
        BUA = vN((A) => GUA(A) ? ["fips-aws-global", "aws-fips"].includes(A) ? "us-east-1" : A.replace(/fips-(dkr-|prod-)?|-fips/, "") : A, "getRealRegion"),
        JzQ = vN((A) => {
            let {
                region: B,
                useFipsEndpoint: Q
            } = A;
            if (!B) throw new Error("Region is missing");
            return Object.assign(A, {
                region: vN(async () => {
                    if (typeof B === "string") return BUA(B);
                    let Z = await B();
                    return BUA(Z)
                }, "region"),
                useFipsEndpoint: vN(async () => {
                    let Z = typeof B === "string" ? B : await B();
                    if (GUA(Z)) return !0;
                    return typeof Q !== "function" ? Promise.resolve(!!Q) : Q()
                }, "useFipsEndpoint")
            })
        }, "resolveRegionConfig")
});