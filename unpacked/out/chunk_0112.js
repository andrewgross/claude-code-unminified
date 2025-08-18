/* chunk:112 bytes:[2592172, 2610368) size:18196 source:unpacked-cli.js */
var ye1 = E((lQ5, yUQ) => {
    yUQ.exports = {
        name: "@aws-sdk/nested-clients",
        version: "3.797.0",
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
            "@aws-sdk/core": "3.796.0",
            "@aws-sdk/middleware-host-header": "3.775.0",
            "@aws-sdk/middleware-logger": "3.775.0",
            "@aws-sdk/middleware-recursion-detection": "3.775.0",
            "@aws-sdk/middleware-user-agent": "3.796.0",
            "@aws-sdk/region-config-resolver": "3.775.0",
            "@aws-sdk/types": "3.775.0",
            "@aws-sdk/util-endpoints": "3.787.0",
            "@aws-sdk/util-user-agent-browser": "3.775.0",
            "@aws-sdk/util-user-agent-node": "3.796.0",
            "@smithy/config-resolver": "^4.1.0",
            "@smithy/core": "^3.2.0",
            "@smithy/fetch-http-handler": "^5.0.2",
            "@smithy/hash-node": "^4.0.2",
            "@smithy/invalid-dependency": "^4.0.2",
            "@smithy/middleware-content-length": "^4.0.2",
            "@smithy/middleware-endpoint": "^4.1.0",
            "@smithy/middleware-retry": "^4.1.0",
            "@smithy/middleware-serde": "^4.0.3",
            "@smithy/middleware-stack": "^4.0.2",
            "@smithy/node-config-provider": "^4.0.2",
            "@smithy/node-http-handler": "^4.0.4",
            "@smithy/protocol-http": "^5.1.0",
            "@smithy/smithy-client": "^4.2.0",
            "@smithy/types": "^4.2.0",
            "@smithy/url-parser": "^4.0.2",
            "@smithy/util-base64": "^4.0.0",
            "@smithy/util-body-length-browser": "^4.0.0",
            "@smithy/util-body-length-node": "^4.0.0",
            "@smithy/util-defaults-mode-browser": "^4.0.8",
            "@smithy/util-defaults-mode-node": "^4.0.8",
            "@smithy/util-endpoints": "^3.0.2",
            "@smithy/util-middleware": "^4.0.2",
            "@smithy/util-retry": "^4.0.2",
            "@smithy/util-utf8": "^4.0.0",
            tslib: "^2.6.2"
        },
        devDependencies: {
            concurrently: "7.0.0",
            "downlevel-dts": "0.10.1",
            rimraf: "3.0.2",
            typescript: "~5.2.2"
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
var iwA = E((lwA) => {
    Object.defineProperty(lwA, "__esModule", {
        value: !0
    });
    lwA.fromBase64 = void 0;
    var _UQ = GZ(),
        xUQ = /^[A-Za-z0-9+/]*={0,2}$/,
        vUQ = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!xUQ.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = _UQ.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    lwA.fromBase64 = vUQ
});
var swA = E((nwA) => {
    Object.defineProperty(nwA, "__esModule", {
        value: !0
    });
    nwA.toBase64 = void 0;
    var bUQ = GZ(),
        fUQ = lB(),
        hUQ = (A) => {
            let B;
            if (typeof A === "string") B = fUQ.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return bUQ.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    nwA.toBase64 = hUQ
});
var ve1 = E((nQ5, RE1) => {
    var {
        defineProperty: rwA,
        getOwnPropertyDescriptor: gUQ,
        getOwnPropertyNames: uUQ
    } = Object, mUQ = Object.prototype.hasOwnProperty, _e1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of uUQ(B))
                if (!mUQ.call(A, D) && D !== Q) rwA(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = gUQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, owA = (A, B, Q) => (_e1(A, B, "default"), Q && _e1(Q, B, "default")), dUQ = (A) => _e1(rwA({}, "__esModule", {
        value: !0
    }), A), xe1 = {};
    RE1.exports = dUQ(xe1);
    owA(xe1, iwA(), RE1.exports);
    owA(xe1, swA(), RE1.exports)
});
var K$A = E((V$A) => {
    Object.defineProperty(V$A, "__esModule", {
        value: !0
    });
    V$A.ruleSet = void 0;
    var Y$A = "required",
        Ez = "fn",
        Uz = "argv",
        ei = "ref",
        twA = !0,
        ewA = "isSet",
        SQ1 = "booleanEquals",
        oi = "error",
        ti = "endpoint",
        pO = "tree",
        be1 = "PartitionResult",
        fe1 = "getAttr",
        A$A = {
            [Y$A]: !1,
            type: "String"
        },
        B$A = {
            [Y$A]: !0,
            default: !1,
            type: "Boolean"
        },
        Q$A = {
            [ei]: "Endpoint"
        },
        W$A = {
            [Ez]: SQ1,
            [Uz]: [{
                [ei]: "UseFIPS"
            }, !0]
        },
        J$A = {
            [Ez]: SQ1,
            [Uz]: [{
                [ei]: "UseDualStack"
            }, !0]
        },
        zz = {},
        Z$A = {
            [Ez]: fe1,
            [Uz]: [{
                [ei]: be1
            }, "supportsFIPS"]
        },
        X$A = {
            [ei]: be1
        },
        D$A = {
            [Ez]: SQ1,
            [Uz]: [!0, {
                [Ez]: fe1,
                [Uz]: [X$A, "supportsDualStack"]
            }]
        },
        G$A = [W$A],
        F$A = [J$A],
        I$A = [{
            [ei]: "Region"
        }],
        cUQ = {
            version: "1.0",
            parameters: {
                Region: A$A,
                UseDualStack: B$A,
                UseFIPS: B$A,
                Endpoint: A$A
            },
            rules: [{
                conditions: [{
                    [Ez]: ewA,
                    [Uz]: [Q$A]
                }],
                rules: [{
                    conditions: G$A,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: oi
                }, {
                    conditions: F$A,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: oi
                }, {
                    endpoint: {
                        url: Q$A,
                        properties: zz,
                        headers: zz
                    },
                    type: ti
                }],
                type: pO
            }, {
                conditions: [{
                    [Ez]: ewA,
                    [Uz]: I$A
                }],
                rules: [{
                    conditions: [{
                        [Ez]: "aws.partition",
                        [Uz]: I$A,
                        assign: be1
                    }],
                    rules: [{
                        conditions: [W$A, J$A],
                        rules: [{
                            conditions: [{
                                [Ez]: SQ1,
                                [Uz]: [twA, Z$A]
                            }, D$A],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: zz,
                                    headers: zz
                                },
                                type: ti
                            }],
                            type: pO
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: oi
                        }],
                        type: pO
                    }, {
                        conditions: G$A,
                        rules: [{
                            conditions: [{
                                [Ez]: SQ1,
                                [Uz]: [Z$A, twA]
                            }],
                            rules: [{
                                conditions: [{
                                    [Ez]: "stringEquals",
                                    [Uz]: [{
                                        [Ez]: fe1,
                                        [Uz]: [X$A, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://oidc.{Region}.amazonaws.com",
                                    properties: zz,
                                    headers: zz
                                },
                                type: ti
                            }, {
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: zz,
                                    headers: zz
                                },
                                type: ti
                            }],
                            type: pO
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: oi
                        }],
                        type: pO
                    }, {
                        conditions: F$A,
                        rules: [{
                            conditions: [D$A],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: zz,
                                    headers: zz
                                },
                                type: ti
                            }],
                            type: pO
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: oi
                        }],
                        type: pO
                    }, {
                        endpoint: {
                            url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}",
                            properties: zz,
                            headers: zz
                        },
                        type: ti
                    }],
                    type: pO
                }],
                type: pO
            }, {
                error: "Invalid Configuration: Missing Region",
                type: oi
            }]
        };
    V$A.ruleSet = cUQ
});
var E$A = E((H$A) => {
    Object.defineProperty(H$A, "__esModule", {
        value: !0
    });
    H$A.defaultEndpointResolver = void 0;
    var lUQ = ki(),
        he1 = R7(),
        pUQ = K$A(),
        iUQ = new he1.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        nUQ = (A, B = {}) => {
            return iUQ.get(A, () => he1.resolveEndpoint(pUQ.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    H$A.defaultEndpointResolver = nUQ;
    he1.customEndpointFunctions.aws = lUQ.awsEndpointFunctions
});
var N$A = E(($$A) => {
    Object.defineProperty($$A, "__esModule", {
        value: !0
    });
    $$A.getRuntimeConfig = void 0;
    var aUQ = WI(),
        sUQ = HB(),
        rUQ = XD(),
        oUQ = JD(),
        U$A = ve1(),
        w$A = lB(),
        tUQ = Se1(),
        eUQ = E$A(),
        AwQ = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? U$A.fromBase64,
                base64Encoder: A?.base64Encoder ?? U$A.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? eUQ.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? tUQ.defaultSSOOIDCHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new aUQ.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new sUQ.NoAuthSigner
                }],
                logger: A?.logger ?? new rUQ.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO OIDC",
                urlParser: A?.urlParser ?? oUQ.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? w$A.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? w$A.toUtf8
            }
        };
    $$A.getRuntimeConfig = AwQ
});
var P$A = E((O$A) => {
    Object.defineProperty(O$A, "__esModule", {
        value: !0
    });
    O$A.getRuntimeConfig = void 0;
    var BwQ = ke1(),
        QwQ = BwQ.__importDefault(ye1()),
        ZwQ = WI(),
        L$A = HQ1(),
        OE1 = z4(),
        DwQ = mG(),
        M$A = u4(),
        An = IZ(),
        R$A = x3(),
        GwQ = dG(),
        FwQ = aD(),
        IwQ = N$A(),
        YwQ = XD(),
        WwQ = cG(),
        JwQ = XD(),
        XwQ = (A) => {
            JwQ.emitWarningIfUnsupportedVersion(process.version);
            let B = WwQ.resolveDefaultsModeConfig(A),
                Q = () => B().then(YwQ.loadConfigsForDefaultMode),
                Z = IwQ.getRuntimeConfig(A);
            ZwQ.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                bodyLengthChecker: A?.bodyLengthChecker ?? GwQ.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? L$A.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: QwQ.default.version
                }),
                maxAttempts: A?.maxAttempts ?? An.loadConfig(M$A.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? An.loadConfig(OE1.NODE_REGION_CONFIG_OPTIONS, {
                    ...OE1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: R$A.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? An.loadConfig({
                    ...M$A.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || FwQ.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? DwQ.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? R$A.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? An.loadConfig(OE1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? An.loadConfig(OE1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? An.loadConfig(L$A.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    O$A.getRuntimeConfig = XwQ
});