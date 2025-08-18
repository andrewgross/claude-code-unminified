/* chunk:236 bytes:[5100865, 5118987) size:18122 source:unpacked-cli.js */
var H80 = E((Q42) => {
    Object.defineProperty(Q42, "__esModule", {
        value: !0
    });
    Q42.resolveHttpAuthSchemeConfig = Q42.defaultSSOOIDCHttpAuthSchemeProvider = Q42.defaultSSOOIDCHttpAuthSchemeParametersProvider = void 0;
    var IK4 = HI(),
        K80 = E5(),
        YK4 = async (A, B, Q) => {
            return {
                operation: K80.getSmithyContext(B).operation,
                region: await K80.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    Q42.defaultSSOOIDCHttpAuthSchemeParametersProvider = YK4;

    function WK4(A) {
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

    function JK4(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var XK4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "CreateToken": {
                B.push(JK4(A));
                break
            }
            default:
                B.push(WK4(A))
        }
        return B
    };
    Q42.defaultSSOOIDCHttpAuthSchemeProvider = XK4;
    var VK4 = (A) => {
        let B = IK4.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: K80.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    Q42.resolveHttpAuthSchemeConfig = VK4
});
var z80 = E((M$5, HK4) => {
    HK4.exports = {
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
var $42 = E((U42) => {
    Object.defineProperty(U42, "__esModule", {
        value: !0
    });
    U42.ruleSet = void 0;
    var K42 = "required",
        nz = "fn",
        az = "argv",
        Wr = "ref",
        D42 = !0,
        G42 = "isSet",
        P81 = "booleanEquals",
        Ir = "error",
        Yr = "endpoint",
        yT = "tree",
        E80 = "PartitionResult",
        U80 = "getAttr",
        F42 = {
            [K42]: !1,
            type: "String"
        },
        I42 = {
            [K42]: !0,
            default: !1,
            type: "Boolean"
        },
        Y42 = {
            [Wr]: "Endpoint"
        },
        H42 = {
            [nz]: P81,
            [az]: [{
                [Wr]: "UseFIPS"
            }, !0]
        },
        z42 = {
            [nz]: P81,
            [az]: [{
                [Wr]: "UseDualStack"
            }, !0]
        },
        iz = {},
        W42 = {
            [nz]: U80,
            [az]: [{
                [Wr]: E80
            }, "supportsFIPS"]
        },
        E42 = {
            [Wr]: E80
        },
        J42 = {
            [nz]: P81,
            [az]: [!0, {
                [nz]: U80,
                [az]: [E42, "supportsDualStack"]
            }]
        },
        X42 = [H42],
        V42 = [z42],
        C42 = [{
            [Wr]: "Region"
        }],
        zK4 = {
            version: "1.0",
            parameters: {
                Region: F42,
                UseDualStack: I42,
                UseFIPS: I42,
                Endpoint: F42
            },
            rules: [{
                conditions: [{
                    [nz]: G42,
                    [az]: [Y42]
                }],
                rules: [{
                    conditions: X42,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: Ir
                }, {
                    conditions: V42,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: Ir
                }, {
                    endpoint: {
                        url: Y42,
                        properties: iz,
                        headers: iz
                    },
                    type: Yr
                }],
                type: yT
            }, {
                conditions: [{
                    [nz]: G42,
                    [az]: C42
                }],
                rules: [{
                    conditions: [{
                        [nz]: "aws.partition",
                        [az]: C42,
                        assign: E80
                    }],
                    rules: [{
                        conditions: [H42, z42],
                        rules: [{
                            conditions: [{
                                [nz]: P81,
                                [az]: [D42, W42]
                            }, J42],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: iz,
                                    headers: iz
                                },
                                type: Yr
                            }],
                            type: yT
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: Ir
                        }],
                        type: yT
                    }, {
                        conditions: X42,
                        rules: [{
                            conditions: [{
                                [nz]: P81,
                                [az]: [W42, D42]
                            }],
                            rules: [{
                                conditions: [{
                                    [nz]: "stringEquals",
                                    [az]: [{
                                        [nz]: U80,
                                        [az]: [E42, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://oidc.{Region}.amazonaws.com",
                                    properties: iz,
                                    headers: iz
                                },
                                type: Yr
                            }, {
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: iz,
                                    headers: iz
                                },
                                type: Yr
                            }],
                            type: yT
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: Ir
                        }],
                        type: yT
                    }, {
                        conditions: V42,
                        rules: [{
                            conditions: [J42],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: iz,
                                    headers: iz
                                },
                                type: Yr
                            }],
                            type: yT
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: Ir
                        }],
                        type: yT
                    }, {
                        endpoint: {
                            url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}",
                            properties: iz,
                            headers: iz
                        },
                        type: Yr
                    }],
                    type: yT
                }],
                type: yT
            }, {
                error: "Invalid Configuration: Missing Region",
                type: Ir
            }]
        };
    U42.ruleSet = zK4
});
var L42 = E((q42) => {
    Object.defineProperty(q42, "__esModule", {
        value: !0
    });
    q42.defaultEndpointResolver = void 0;
    var EK4 = rs(),
        w80 = R7(),
        UK4 = $42(),
        wK4 = new w80.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        $K4 = (A, B = {}) => {
            return wK4.get(A, () => w80.resolveEndpoint(UK4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    q42.defaultEndpointResolver = $K4;
    w80.customEndpointFunctions.aws = EK4.awsEndpointFunctions
});
var P42 = E((O42) => {
    Object.defineProperty(O42, "__esModule", {
        value: !0
    });
    O42.getRuntimeConfig = void 0;
    var qK4 = HI(),
        NK4 = HB(),
        LK4 = d4(),
        MK4 = JD(),
        M42 = I_(),
        R42 = lB(),
        RK4 = H80(),
        OK4 = L42(),
        TK4 = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? M42.fromBase64,
                base64Encoder: A?.base64Encoder ?? M42.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? OK4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? RK4.defaultSSOOIDCHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new qK4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new NK4.NoAuthSigner
                }],
                logger: A?.logger ?? new LK4.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO OIDC",
                urlParser: A?.urlParser ?? MK4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? R42.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? R42.toUtf8
            }
        };
    O42.getRuntimeConfig = TK4
});
var v42 = E((_42) => {
    Object.defineProperty(_42, "__esModule", {
        value: !0
    });
    _42.getRuntimeConfig = void 0;
    var PK4 = ig(),
        SK4 = PK4.__importDefault(z80()),
        S42 = HI(),
        j42 = L81(),
        iN1 = z4(),
        jK4 = mG(),
        k42 = u4(),
        og = IZ(),
        y42 = x3(),
        kK4 = dG(),
        yK4 = aD(),
        _K4 = P42(),
        xK4 = d4(),
        vK4 = cG(),
        bK4 = d4(),
        fK4 = (A) => {
            bK4.emitWarningIfUnsupportedVersion(process.version);
            let B = vK4.resolveDefaultsModeConfig(A),
                Q = () => B().then(xK4.loadConfigsForDefaultMode),
                Z = _K4.getRuntimeConfig(A);
            S42.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? og.loadConfig(S42.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? kK4.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? j42.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: SK4.default.version
                }),
                maxAttempts: A?.maxAttempts ?? og.loadConfig(k42.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? og.loadConfig(iN1.NODE_REGION_CONFIG_OPTIONS, {
                    ...iN1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: y42.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? og.loadConfig({
                    ...k42.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || yK4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? jK4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? y42.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? og.loadConfig(iN1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? og.loadConfig(iN1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? og.loadConfig(j42.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    _42.getRuntimeConfig = fK4
});