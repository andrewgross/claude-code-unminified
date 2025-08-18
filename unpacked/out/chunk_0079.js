/* chunk:79 bytes:[1817167, 1835289) size:18122 source:unpacked-cli.js */
var ts1 = E((LZA) => {
    Object.defineProperty(LZA, "__esModule", {
        value: !0
    });
    LZA.resolveHttpAuthSchemeConfig = LZA.defaultSSOOIDCHttpAuthSchemeProvider = LZA.defaultSSOOIDCHttpAuthSchemeParametersProvider = void 0;
    var nBQ = YI(),
        os1 = E5(),
        aBQ = async (A, B, Q) => {
            return {
                operation: os1.getSmithyContext(B).operation,
                region: await os1.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    LZA.defaultSSOOIDCHttpAuthSchemeParametersProvider = aBQ;

    function sBQ(A) {
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

    function rBQ(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var oBQ = (A) => {
        let B = [];
        switch (A.operation) {
            case "CreateToken": {
                B.push(rBQ(A));
                break
            }
            default:
                B.push(sBQ(A))
        }
        return B
    };
    LZA.defaultSSOOIDCHttpAuthSchemeProvider = oBQ;
    var tBQ = (A) => {
        let B = nBQ.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: os1.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    LZA.resolveHttpAuthSchemeConfig = tBQ
});
var es1 = E((B25, B9Q) => {
    B9Q.exports = {
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
var mZA = E((gZA) => {
    Object.defineProperty(gZA, "__esModule", {
        value: !0
    });
    gZA.ruleSet = void 0;
    var vZA = "required",
        Yz = "fn",
        Wz = "argv",
        Vi = "ref",
        RZA = !0,
        OZA = "isSet",
        l91 = "booleanEquals",
        Ji = "error",
        Xi = "endpoint",
        fO = "tree",
        Ar1 = "PartitionResult",
        Br1 = "getAttr",
        TZA = {
            [vZA]: !1,
            type: "String"
        },
        PZA = {
            [vZA]: !0,
            default: !1,
            type: "Boolean"
        },
        SZA = {
            [Vi]: "Endpoint"
        },
        bZA = {
            [Yz]: l91,
            [Wz]: [{
                [Vi]: "UseFIPS"
            }, !0]
        },
        fZA = {
            [Yz]: l91,
            [Wz]: [{
                [Vi]: "UseDualStack"
            }, !0]
        },
        Iz = {},
        jZA = {
            [Yz]: Br1,
            [Wz]: [{
                [Vi]: Ar1
            }, "supportsFIPS"]
        },
        hZA = {
            [Vi]: Ar1
        },
        kZA = {
            [Yz]: l91,
            [Wz]: [!0, {
                [Yz]: Br1,
                [Wz]: [hZA, "supportsDualStack"]
            }]
        },
        yZA = [bZA],
        _ZA = [fZA],
        xZA = [{
            [Vi]: "Region"
        }],
        Q9Q = {
            version: "1.0",
            parameters: {
                Region: TZA,
                UseDualStack: PZA,
                UseFIPS: PZA,
                Endpoint: TZA
            },
            rules: [{
                conditions: [{
                    [Yz]: OZA,
                    [Wz]: [SZA]
                }],
                rules: [{
                    conditions: yZA,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: Ji
                }, {
                    conditions: _ZA,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: Ji
                }, {
                    endpoint: {
                        url: SZA,
                        properties: Iz,
                        headers: Iz
                    },
                    type: Xi
                }],
                type: fO
            }, {
                conditions: [{
                    [Yz]: OZA,
                    [Wz]: xZA
                }],
                rules: [{
                    conditions: [{
                        [Yz]: "aws.partition",
                        [Wz]: xZA,
                        assign: Ar1
                    }],
                    rules: [{
                        conditions: [bZA, fZA],
                        rules: [{
                            conditions: [{
                                [Yz]: l91,
                                [Wz]: [RZA, jZA]
                            }, kZA],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: Iz,
                                    headers: Iz
                                },
                                type: Xi
                            }],
                            type: fO
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: Ji
                        }],
                        type: fO
                    }, {
                        conditions: yZA,
                        rules: [{
                            conditions: [{
                                [Yz]: l91,
                                [Wz]: [jZA, RZA]
                            }],
                            rules: [{
                                conditions: [{
                                    [Yz]: "stringEquals",
                                    [Wz]: [{
                                        [Yz]: Br1,
                                        [Wz]: [hZA, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://oidc.{Region}.amazonaws.com",
                                    properties: Iz,
                                    headers: Iz
                                },
                                type: Xi
                            }, {
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: Iz,
                                    headers: Iz
                                },
                                type: Xi
                            }],
                            type: fO
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: Ji
                        }],
                        type: fO
                    }, {
                        conditions: _ZA,
                        rules: [{
                            conditions: [kZA],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: Iz,
                                    headers: Iz
                                },
                                type: Xi
                            }],
                            type: fO
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: Ji
                        }],
                        type: fO
                    }, {
                        endpoint: {
                            url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}",
                            properties: Iz,
                            headers: Iz
                        },
                        type: Xi
                    }],
                    type: fO
                }],
                type: fO
            }, {
                error: "Invalid Configuration: Missing Region",
                type: Ji
            }]
        };
    gZA.ruleSet = Q9Q
});
var lZA = E((dZA) => {
    Object.defineProperty(dZA, "__esModule", {
        value: !0
    });
    dZA.defaultEndpointResolver = void 0;
    var Z9Q = sp(),
        Qr1 = R7(),
        D9Q = mZA(),
        G9Q = new Qr1.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        F9Q = (A, B = {}) => {
            return G9Q.get(A, () => Qr1.resolveEndpoint(D9Q.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    dZA.defaultEndpointResolver = F9Q;
    Qr1.customEndpointFunctions.aws = Z9Q.awsEndpointFunctions
});
var sZA = E((nZA) => {
    Object.defineProperty(nZA, "__esModule", {
        value: !0
    });
    nZA.getRuntimeConfig = void 0;
    var I9Q = YI(),
        Y9Q = HB(),
        W9Q = V6(),
        J9Q = JD(),
        pZA = Nk(),
        iZA = lB(),
        X9Q = ts1(),
        V9Q = lZA(),
        C9Q = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? pZA.fromBase64,
                base64Encoder: A?.base64Encoder ?? pZA.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? V9Q.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? X9Q.defaultSSOOIDCHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new I9Q.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new Y9Q.NoAuthSigner
                }],
                logger: A?.logger ?? new W9Q.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO OIDC",
                urlParser: A?.urlParser ?? J9Q.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? iZA.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? iZA.toUtf8
            }
        };
    nZA.getRuntimeConfig = C9Q
});
var QDA = E((ADA) => {
    Object.defineProperty(ADA, "__esModule", {
        value: !0
    });
    ADA.getRuntimeConfig = void 0;
    var K9Q = wh(),
        H9Q = K9Q.__importDefault(es1()),
        rZA = YI(),
        oZA = h91(),
        yH1 = z4(),
        z9Q = mG(),
        tZA = u4(),
        Sh = IZ(),
        eZA = x3(),
        E9Q = dG(),
        U9Q = aD(),
        w9Q = sZA(),
        $9Q = V6(),
        q9Q = cG(),
        N9Q = V6(),
        L9Q = (A) => {
            N9Q.emitWarningIfUnsupportedVersion(process.version);
            let B = q9Q.resolveDefaultsModeConfig(A),
                Q = () => B().then($9Q.loadConfigsForDefaultMode),
                Z = w9Q.getRuntimeConfig(A);
            rZA.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? Sh.loadConfig(rZA.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? E9Q.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? oZA.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: H9Q.default.version
                }),
                maxAttempts: A?.maxAttempts ?? Sh.loadConfig(tZA.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? Sh.loadConfig(yH1.NODE_REGION_CONFIG_OPTIONS, {
                    ...yH1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: eZA.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? Sh.loadConfig({
                    ...tZA.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || U9Q.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? z9Q.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? eZA.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? Sh.loadConfig(yH1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? Sh.loadConfig(yH1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? Sh.loadConfig(oZA.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    ADA.getRuntimeConfig = L9Q
});