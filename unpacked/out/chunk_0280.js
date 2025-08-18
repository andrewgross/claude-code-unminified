/* chunk:280 bytes:[5982616, 6001545) size:18929 source:unpacked-cli.js */
var QR1 = E((zR5, GU2) => {
    var {
        defineProperty: BR1,
        getOwnPropertyDescriptor: ym4,
        getOwnPropertyNames: _m4
    } = Object, xm4 = Object.prototype.hasOwnProperty, IG0 = (A, B) => BR1(A, "name", {
        value: B,
        configurable: !0
    }), vm4 = (A, B) => {
        for (var Q in B) BR1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, bm4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of _m4(B))
                if (!xm4.call(A, D) && D !== Q) BR1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ym4(B, D)) || Z.enumerable
                })
        }
        return A
    }, fm4 = (A) => bm4(BR1({}, "__esModule", {
        value: !0
    }), A), DU2 = {};
    vm4(DU2, {
        fromProcess: () => cm4
    });
    GU2.exports = fm4(DU2);
    var ZU2 = I3(),
        FG0 = A9(),
        hm4 = W1("child_process"),
        gm4 = W1("util"),
        um4 = FE(),
        mm4 = IG0((A, B, Q) => {
            if (B.Version !== 1) throw Error(`Profile ${A} credential_process did not return Version 1.`);
            if (B.AccessKeyId === void 0 || B.SecretAccessKey === void 0) throw Error(`Profile ${A} credential_process returned invalid credentials.`);
            if (B.Expiration) {
                let G = new Date;
                if (new Date(B.Expiration) < G) throw Error(`Profile ${A} credential_process returned expired credentials.`)
            }
            let Z = B.AccountId;
            if (!Z && Q?.[A]?.aws_account_id) Z = Q[A].aws_account_id;
            let D = {
                accessKeyId: B.AccessKeyId,
                secretAccessKey: B.SecretAccessKey,
                ...B.SessionToken && {
                    sessionToken: B.SessionToken
                },
                ...B.Expiration && {
                    expiration: new Date(B.Expiration)
                },
                ...B.CredentialScope && {
                    credentialScope: B.CredentialScope
                },
                ...Z && {
                    accountId: Z
                }
            };
            return um4.setCredentialFeature(D, "CREDENTIALS_PROCESS", "w"), D
        }, "getValidatedProcessCredentials"),
        dm4 = IG0(async (A, B, Q) => {
            let Z = B[A];
            if (B[A]) {
                let D = Z.credential_process;
                if (D !== void 0) {
                    let G = gm4.promisify(hm4.exec);
                    try {
                        let {
                            stdout: F
                        } = await G(D), I;
                        try {
                            I = JSON.parse(F.trim())
                        } catch {
                            throw Error(`Profile ${A} credential_process returned invalid JSON.`)
                        }
                        return mm4(A, I, B)
                    } catch (F) {
                        throw new FG0.CredentialsProviderError(F.message, {
                            logger: Q
                        })
                    }
                } else throw new FG0.CredentialsProviderError(`Profile ${A} did not contain credential_process.`, {
                    logger: Q
                })
            } else throw new FG0.CredentialsProviderError(`Profile ${A} could not be found in shared credentials file.`, {
                logger: Q
            })
        }, "resolveProcessCredentials"),
        cm4 = IG0((A = {}) => async ({
            callerClientConfig: B
        } = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
            let Q = await ZU2.parseKnownFiles(A);
            return dm4(ZU2.getProfileName({
                profile: A.profile ?? B?.profile
            }), Q, A.logger)
        }, "fromProcess")
});
var WG0 = E((FU2) => {
    Object.defineProperty(FU2, "__esModule", {
        value: !0
    });
    FU2.resolveHttpAuthSchemeConfig = FU2.defaultSSOHttpAuthSchemeProvider = FU2.defaultSSOHttpAuthSchemeParametersProvider = void 0;
    var lm4 = bV(),
        YG0 = E5(),
        pm4 = async (A, B, Q) => {
            return {
                operation: YG0.getSmithyContext(B).operation,
                region: await YG0.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    FU2.defaultSSOHttpAuthSchemeParametersProvider = pm4;

    function im4(A) {
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

    function ZR1(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var nm4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "GetRoleCredentials": {
                B.push(ZR1(A));
                break
            }
            case "ListAccountRoles": {
                B.push(ZR1(A));
                break
            }
            case "ListAccounts": {
                B.push(ZR1(A));
                break
            }
            case "Logout": {
                B.push(ZR1(A));
                break
            }
            default:
                B.push(im4(A))
        }
        return B
    };
    FU2.defaultSSOHttpAuthSchemeProvider = nm4;
    var am4 = (A) => {
        let B = lm4.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: YG0.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    FU2.resolveHttpAuthSchemeConfig = am4
});
var YU2 = E((UR5, om4) => {
    om4.exports = {
        name: "@aws-sdk/client-sso",
        description: "AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native",
        version: "3.840.0",
        scripts: {
            build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
            "build:cjs": "node ../../scripts/compilation/inline client-sso",
            "build:es": "tsc -p tsconfig.es.json",
            "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
            "build:types": "tsc -p tsconfig.types.json",
            "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
            clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
            "extract:docs": "api-extractor run --local",
            "generate:client": "node ../../scripts/generate-clients/single-service --solo sso"
        },
        main: "./dist-cjs/index.js",
        types: "./dist-types/index.d.ts",
        module: "./dist-es/index.js",
        sideEffects: !1,
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
            "@tsconfig/node18": "18.2.4",
            "@types/node": "^18.19.69",
            concurrently: "7.0.0",
            "downlevel-dts": "0.10.1",
            rimraf: "3.0.2",
            typescript: "~5.8.3"
        },
        engines: {
            node: ">=18.0.0"
        },
        typesVersions: {
            "<4.0": {
                "dist-types/*": ["dist-types/ts3.4/*"]
            }
        },
        files: ["dist-*/**"],
        author: {
            name: "AWS SDK for JavaScript Team",
            url: "https://aws.amazon.com/javascript/"
        },
        license: "Apache-2.0",
        browser: {
            "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
        },
        "react-native": {
            "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
        },
        homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso",
        repository: {
            type: "git",
            url: "https://github.com/aws/aws-sdk-js-v3.git",
            directory: "clients/client-sso"
        }
    }
});
var RU2 = E((LU2) => {
    Object.defineProperty(LU2, "__esModule", {
        value: !0
    });
    LU2.ruleSet = void 0;
    var wU2 = "required",
        YE = "fn",
        WE = "argv",
        qo = "ref",
        WU2 = !0,
        JU2 = "isSet",
        E51 = "booleanEquals",
        wo = "error",
        $o = "endpoint",
        YP = "tree",
        JG0 = "PartitionResult",
        XG0 = "getAttr",
        XU2 = {
            [wU2]: !1,
            type: "String"
        },
        VU2 = {
            [wU2]: !0,
            default: !1,
            type: "Boolean"
        },
        CU2 = {
            [qo]: "Endpoint"
        },
        $U2 = {
            [YE]: E51,
            [WE]: [{
                [qo]: "UseFIPS"
            }, !0]
        },
        qU2 = {
            [YE]: E51,
            [WE]: [{
                [qo]: "UseDualStack"
            }, !0]
        },
        IE = {},
        KU2 = {
            [YE]: XG0,
            [WE]: [{
                [qo]: JG0
            }, "supportsFIPS"]
        },
        NU2 = {
            [qo]: JG0
        },
        HU2 = {
            [YE]: E51,
            [WE]: [!0, {
                [YE]: XG0,
                [WE]: [NU2, "supportsDualStack"]
            }]
        },
        zU2 = [$U2],
        EU2 = [qU2],
        UU2 = [{
            [qo]: "Region"
        }],
        tm4 = {
            version: "1.0",
            parameters: {
                Region: XU2,
                UseDualStack: VU2,
                UseFIPS: VU2,
                Endpoint: XU2
            },
            rules: [{
                conditions: [{
                    [YE]: JU2,
                    [WE]: [CU2]
                }],
                rules: [{
                    conditions: zU2,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: wo
                }, {
                    conditions: EU2,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: wo
                }, {
                    endpoint: {
                        url: CU2,
                        properties: IE,
                        headers: IE
                    },
                    type: $o
                }],
                type: YP
            }, {
                conditions: [{
                    [YE]: JU2,
                    [WE]: UU2
                }],
                rules: [{
                    conditions: [{
                        [YE]: "aws.partition",
                        [WE]: UU2,
                        assign: JG0
                    }],
                    rules: [{
                        conditions: [$U2, qU2],
                        rules: [{
                            conditions: [{
                                [YE]: E51,
                                [WE]: [WU2, KU2]
                            }, HU2],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: IE,
                                    headers: IE
                                },
                                type: $o
                            }],
                            type: YP
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: wo
                        }],
                        type: YP
                    }, {
                        conditions: zU2,
                        rules: [{
                            conditions: [{
                                [YE]: E51,
                                [WE]: [KU2, WU2]
                            }],
                            rules: [{
                                conditions: [{
                                    [YE]: "stringEquals",
                                    [WE]: [{
                                        [YE]: XG0,
                                        [WE]: [NU2, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://portal.sso.{Region}.amazonaws.com",
                                    properties: IE,
                                    headers: IE
                                },
                                type: $o
                            }, {
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: IE,
                                    headers: IE
                                },
                                type: $o
                            }],
                            type: YP
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: wo
                        }],
                        type: YP
                    }, {
                        conditions: EU2,
                        rules: [{
                            conditions: [HU2],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: IE,
                                    headers: IE
                                },
                                type: $o
                            }],
                            type: YP
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: wo
                        }],
                        type: YP
                    }, {
                        endpoint: {
                            url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}",
                            properties: IE,
                            headers: IE
                        },
                        type: $o
                    }],
                    type: YP
                }],
                type: YP
            }, {
                error: "Invalid Configuration: Missing Region",
                type: wo
            }]
        };
    LU2.ruleSet = tm4
});
var PU2 = E((OU2) => {
    Object.defineProperty(OU2, "__esModule", {
        value: !0
    });
    OU2.defaultEndpointResolver = void 0;
    var em4 = Y51(),
        VG0 = R7(),
        Ad4 = RU2(),
        Bd4 = new VG0.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        Qd4 = (A, B = {}) => {
            return Bd4.get(A, () => VG0.resolveEndpoint(Ad4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    OU2.defaultEndpointResolver = Qd4;
    VG0.customEndpointFunctions.aws = em4.awsEndpointFunctions
});
var _U2 = E((kU2) => {
    Object.defineProperty(kU2, "__esModule", {
        value: !0
    });
    kU2.getRuntimeConfig = void 0;
    var Zd4 = bV(),
        Dd4 = HB(),
        Gd4 = P8(),
        Fd4 = JD(),
        SU2 = Hu(),
        jU2 = lB(),
        Id4 = WG0(),
        Yd4 = PU2(),
        Wd4 = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? SU2.fromBase64,
                base64Encoder: A?.base64Encoder ?? SU2.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? Yd4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? Id4.defaultSSOHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new Zd4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new Dd4.NoAuthSigner
                }],
                logger: A?.logger ?? new Gd4.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO",
                urlParser: A?.urlParser ?? Fd4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? jU2.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? jU2.toUtf8
            }
        };
    kU2.getRuntimeConfig = Wd4
});