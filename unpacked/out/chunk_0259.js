/* chunk:259 bytes:[5552960, 5571082) size:18122 source:unpacked-cli.js */
var K70 = E((gI2) => {
    Object.defineProperty(gI2, "__esModule", {
        value: !0
    });
    gI2.resolveHttpAuthSchemeConfig = gI2.defaultSSOOIDCHttpAuthSchemeProvider = gI2.defaultSSOOIDCHttpAuthSchemeParametersProvider = void 0;
    var xT4 = UI(),
        C70 = E5(),
        vT4 = async (A, B, Q) => {
            return {
                operation: C70.getSmithyContext(B).operation,
                region: await C70.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    gI2.defaultSSOOIDCHttpAuthSchemeParametersProvider = vT4;

    function bT4(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "sso-oauth",
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

    function fT4(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var hT4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "CreateToken": {
                B.push(fT4(A));
                break
            }
            default:
                B.push(bT4(A))
        }
        return B
    };
    gI2.defaultSSOOIDCHttpAuthSchemeProvider = hT4;
    var gT4 = (A) => {
        let B = xT4.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: C70.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    gI2.resolveHttpAuthSchemeConfig = gT4
});
var H70 = E((uN5, dT4) => {
    dT4.exports = {
        name: "@aws-sdk/nested-clients",
        version: "3.840.0",
        description: "Nested clients for AWS SDK packages.",
        main: "./dist-cjs/index.js",
        module: "./dist-es/index.js",
        types: "./dist-types/index.d.ts",
        scripts: {
            build: "yarn lint && concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
            "build:cjs": "node ../../scripts/compilation/inline nested-clients",
            "build:es": "tsc -p tsconfig.es.json",
            "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
            "build:types": "tsc -p tsconfig.types.json",
            "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
            clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
            lint: "node ../../scripts/validation/submodules-linter.js --pkg nested-clients",
            test: "yarn g:vitest run",
            "test:watch": "yarn g:vitest watch"
        },
        engines: {
            node: ">=18.0.0"
        },
        author: {
            name: "AWS SDK for JavaScript Team",
            url: "https://aws.amazon.com/javascript/"
        },
        license: "Apache-2.0",
        dependencies: {
            "@aws-crypto/sha256-browser": "5.2.0",
            "@aws-crypto/sha256-js": "5.2.0",
            "@aws-sdk/core": "3.840.0",
            "@aws-sdk/middleware-host-header": "3.840.0",
            "@aws-sdk/middleware-logger": "3.840.0",
            "@aws-sdk/middleware-recursion-detection": "3.840.0",
            "@aws-sdk/middleware-user-agent": "3.840.0",
            "@aws-sdk/region-config-resolver": "3.840.0",
            "@aws-sdk/types": "3.840.0",
            "@aws-sdk/util-endpoints": "3.840.0",
            "@aws-sdk/util-user-agent-browser": "3.840.0",
            "@aws-sdk/util-user-agent-node": "3.840.0",
            "@smithy/config-resolver": "^4.1.4",
            "@smithy/core": "^3.6.0",
            "@smithy/fetch-http-handler": "^5.0.4",
            "@smithy/hash-node": "^4.0.4",
            "@smithy/invalid-dependency": "^4.0.4",
            "@smithy/middleware-content-length": "^4.0.4",
            "@smithy/middleware-endpoint": "^4.1.13",
            "@smithy/middleware-retry": "^4.1.14",
            "@smithy/middleware-serde": "^4.0.8",
            "@smithy/middleware-stack": "^4.0.4",
            "@smithy/node-config-provider": "^4.1.3",
            "@smithy/node-http-handler": "^4.0.6",
            "@smithy/protocol-http": "^5.1.2",
            "@smithy/smithy-client": "^4.4.5",
            "@smithy/types": "^4.3.1",
            "@smithy/url-parser": "^4.0.4",
            "@smithy/util-base64": "^4.0.0",
            "@smithy/util-body-length-browser": "^4.0.0",
            "@smithy/util-body-length-node": "^4.0.0",
            "@smithy/util-defaults-mode-browser": "^4.0.21",
            "@smithy/util-defaults-mode-node": "^4.0.21",
            "@smithy/util-endpoints": "^3.0.6",
            "@smithy/util-middleware": "^4.0.4",
            "@smithy/util-retry": "^4.0.6",
            "@smithy/util-utf8": "^4.0.0",
            tslib: "^2.6.2"
        },
        devDependencies: {
            concurrently: "7.0.0",
            "downlevel-dts": "0.10.1",
            rimraf: "3.0.2",
            typescript: "~5.8.3"
        },
        typesVersions: {
            "<4.0": {
                "dist-types/*": ["dist-types/ts3.4/*"]
            }
        },
        files: ["./sso-oidc.d.ts", "./sso-oidc.js", "./sts.d.ts", "./sts.js", "dist-*/**"],
        browser: {
            "./dist-es/submodules/sso-oidc/runtimeConfig": "./dist-es/submodules/sso-oidc/runtimeConfig.browser",
            "./dist-es/submodules/sts/runtimeConfig": "./dist-es/submodules/sts/runtimeConfig.browser"
        },
        "react-native": {},
        homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients",
        repository: {
            type: "git",
            url: "https://github.com/aws/aws-sdk-js-v3.git",
            directory: "packages/nested-clients"
        },
        exports: {
            "./sso-oidc": {
                types: "./dist-types/submodules/sso-oidc/index.d.ts",
                module: "./dist-es/submodules/sso-oidc/index.js",
                node: "./dist-cjs/submodules/sso-oidc/index.js",
                import: "./dist-es/submodules/sso-oidc/index.js",
                require: "./dist-cjs/submodules/sso-oidc/index.js"
            },
            "./sts": {
                types: "./dist-types/submodules/sts/index.d.ts",
                module: "./dist-es/submodules/sts/index.js",
                node: "./dist-cjs/submodules/sts/index.js",
                import: "./dist-es/submodules/sts/index.js",
                require: "./dist-cjs/submodules/sts/index.js"
            }
        }
    }
});
var ZY2 = E((BY2) => {
    Object.defineProperty(BY2, "__esModule", {
        value: !0
    });
    BY2.ruleSet = void 0;
    var oI2 = "required",
        ZE = "fn",
        DE = "argv",
        pr = "ref",
        mI2 = !0,
        dI2 = "isSet",
        r81 = "booleanEquals",
        cr = "error",
        lr = "endpoint",
        tT = "tree",
        z70 = "PartitionResult",
        E70 = "getAttr",
        cI2 = {
            [oI2]: !1,
            type: "String"
        },
        lI2 = {
            [oI2]: !0,
            default: !1,
            type: "Boolean"
        },
        pI2 = {
            [pr]: "Endpoint"
        },
        tI2 = {
            [ZE]: r81,
            [DE]: [{
                [pr]: "UseFIPS"
            }, !0]
        },
        eI2 = {
            [ZE]: r81,
            [DE]: [{
                [pr]: "UseDualStack"
            }, !0]
        },
        QE = {},
        iI2 = {
            [ZE]: E70,
            [DE]: [{
                [pr]: z70
            }, "supportsFIPS"]
        },
        AY2 = {
            [pr]: z70
        },
        nI2 = {
            [ZE]: r81,
            [DE]: [!0, {
                [ZE]: E70,
                [DE]: [AY2, "supportsDualStack"]
            }]
        },
        aI2 = [tI2],
        sI2 = [eI2],
        rI2 = [{
            [pr]: "Region"
        }],
        cT4 = {
            version: "1.0",
            parameters: {
                Region: cI2,
                UseDualStack: lI2,
                UseFIPS: lI2,
                Endpoint: cI2
            },
            rules: [{
                conditions: [{
                    [ZE]: dI2,
                    [DE]: [pI2]
                }],
                rules: [{
                    conditions: aI2,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: cr
                }, {
                    conditions: sI2,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: cr
                }, {
                    endpoint: {
                        url: pI2,
                        properties: QE,
                        headers: QE
                    },
                    type: lr
                }],
                type: tT
            }, {
                conditions: [{
                    [ZE]: dI2,
                    [DE]: rI2
                }],
                rules: [{
                    conditions: [{
                        [ZE]: "aws.partition",
                        [DE]: rI2,
                        assign: z70
                    }],
                    rules: [{
                        conditions: [tI2, eI2],
                        rules: [{
                            conditions: [{
                                [ZE]: r81,
                                [DE]: [mI2, iI2]
                            }, nI2],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: QE,
                                    headers: QE
                                },
                                type: lr
                            }],
                            type: tT
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: cr
                        }],
                        type: tT
                    }, {
                        conditions: aI2,
                        rules: [{
                            conditions: [{
                                [ZE]: r81,
                                [DE]: [iI2, mI2]
                            }],
                            rules: [{
                                conditions: [{
                                    [ZE]: "stringEquals",
                                    [DE]: [{
                                        [ZE]: E70,
                                        [DE]: [AY2, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://oidc.{Region}.amazonaws.com",
                                    properties: QE,
                                    headers: QE
                                },
                                type: lr
                            }, {
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: QE,
                                    headers: QE
                                },
                                type: lr
                            }],
                            type: tT
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: cr
                        }],
                        type: tT
                    }, {
                        conditions: sI2,
                        rules: [{
                            conditions: [nI2],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: QE,
                                    headers: QE
                                },
                                type: lr
                            }],
                            type: tT
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: cr
                        }],
                        type: tT
                    }, {
                        endpoint: {
                            url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}",
                            properties: QE,
                            headers: QE
                        },
                        type: lr
                    }],
                    type: tT
                }],
                type: tT
            }, {
                error: "Invalid Configuration: Missing Region",
                type: cr
            }]
        };
    BY2.ruleSet = cT4
});
var FY2 = E((DY2) => {
    Object.defineProperty(DY2, "__esModule", {
        value: !0
    });
    DY2.defaultEndpointResolver = void 0;
    var lT4 = yr(),
        U70 = R7(),
        pT4 = ZY2(),
        iT4 = new U70.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        nT4 = (A, B = {}) => {
            return iT4.get(A, () => U70.resolveEndpoint(pT4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    DY2.defaultEndpointResolver = nT4;
    U70.customEndpointFunctions.aws = lT4.awsEndpointFunctions
});
var XY2 = E((WY2) => {
    Object.defineProperty(WY2, "__esModule", {
        value: !0
    });
    WY2.getRuntimeConfig = void 0;
    var aT4 = UI(),
        sT4 = HB(),
        rT4 = H6(),
        oT4 = JD(),
        IY2 = U_(),
        YY2 = lB(),
        tT4 = K70(),
        eT4 = FY2(),
        AP4 = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? IY2.fromBase64,
                base64Encoder: A?.base64Encoder ?? IY2.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? eT4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? tT4.defaultSSOOIDCHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new aT4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new sT4.NoAuthSigner
                }],
                logger: A?.logger ?? new rT4.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO OIDC",
                urlParser: A?.urlParser ?? oT4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? YY2.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? YY2.toUtf8
            }
        };
    WY2.getRuntimeConfig = AP4
});
var UY2 = E((zY2) => {
    Object.defineProperty(zY2, "__esModule", {
        value: !0
    });
    zY2.getRuntimeConfig = void 0;
    var BP4 = Du(),
        QP4 = BP4.__importDefault(H70()),
        VY2 = UI(),
        CY2 = p81(),
        tL1 = z4(),
        ZP4 = mG(),
        KY2 = u4(),
        Wu = IZ(),
        HY2 = x3(),
        DP4 = dG(),
        GP4 = aD(),
        FP4 = XY2(),
        IP4 = H6(),
        YP4 = cG(),
        WP4 = H6(),
        JP4 = (A) => {
            WP4.emitWarningIfUnsupportedVersion(process.version);
            let B = YP4.resolveDefaultsModeConfig(A),
                Q = () => B().then(IP4.loadConfigsForDefaultMode),
                Z = FP4.getRuntimeConfig(A);
            VY2.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? Wu.loadConfig(VY2.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? DP4.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? CY2.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: QP4.default.version
                }),
                maxAttempts: A?.maxAttempts ?? Wu.loadConfig(KY2.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? Wu.loadConfig(tL1.NODE_REGION_CONFIG_OPTIONS, {
                    ...tL1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: HY2.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? Wu.loadConfig({
                    ...KY2.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || GP4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? ZP4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? HY2.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? Wu.loadConfig(tL1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? Wu.loadConfig(tL1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? Wu.loadConfig(CY2.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    zY2.getRuntimeConfig = JP4
});