/* chunk:256 bytes:[5507267, 5526282) size:19015 source:unpacked-cli.js */
var zF2 = E((KF2) => {
    Object.defineProperty(KF2, "__esModule", {
        value: !0
    });
    KF2.fromHttp = void 0;
    var cR4 = Du(),
        lR4 = ow(),
        pR4 = x3(),
        VF2 = A9(),
        iR4 = cR4.__importDefault(W1("fs/promises")),
        nR4 = FF2(),
        CF2 = YF2(),
        aR4 = XF2(),
        sR4 = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
        rR4 = "http://169.254.170.2",
        oR4 = "AWS_CONTAINER_CREDENTIALS_FULL_URI",
        tR4 = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",
        eR4 = "AWS_CONTAINER_AUTHORIZATION_TOKEN",
        AO4 = (A = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");
            let B, Q = A.awsContainerCredentialsRelativeUri ?? process.env[sR4],
                Z = A.awsContainerCredentialsFullUri ?? process.env[oR4],
                D = A.awsContainerAuthorizationToken ?? process.env[eR4],
                G = A.awsContainerAuthorizationTokenFile ?? process.env[tR4],
                F = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console.warn : A.logger.warn;
            if (Q && Z) F("@aws-sdk/credential-provider-http: you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri."), F("awsContainerCredentialsFullUri will take precedence.");
            if (D && G) F("@aws-sdk/credential-provider-http: you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile."), F("awsContainerAuthorizationToken will take precedence.");
            if (Z) B = Z;
            else if (Q) B = `${rR4}${Q}`;
            else throw new VF2.CredentialsProviderError(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`, {
                logger: A.logger
            });
            let I = new URL(B);
            nR4.checkUrl(I, A.logger);
            let Y = new pR4.NodeHttpHandler({
                requestTimeout: A.timeout ?? 1000,
                connectionTimeout: A.timeout ?? 1000
            });
            return aR4.retryWrapper(async () => {
                let W = CF2.createGetRequest(I);
                if (D) W.headers.Authorization = D;
                else if (G) W.headers.Authorization = (await iR4.default.readFile(G)).toString();
                try {
                    let J = await Y.handle(W);
                    return CF2.getCredentials(J.response).then((X) => lR4.setCredentialFeature(X, "CREDENTIALS_HTTP", "z"))
                } catch (J) {
                    throw new VF2.CredentialsProviderError(String(J), {
                        logger: A.logger
                    })
                }
            }, A.maxRetries ?? 3, A.timeout ?? 1000)
        };
    KF2.fromHttp = AO4
});
var D70 = E((Z70) => {
    Object.defineProperty(Z70, "__esModule", {
        value: !0
    });
    Z70.fromHttp = void 0;
    var BO4 = zF2();
    Object.defineProperty(Z70, "fromHttp", {
        enumerable: !0,
        get: function() {
            return BO4.fromHttp
        }
    })
});
var F70 = E((EF2) => {
    Object.defineProperty(EF2, "__esModule", {
        value: !0
    });
    EF2.resolveHttpAuthSchemeConfig = EF2.defaultSSOHttpAuthSchemeProvider = EF2.defaultSSOHttpAuthSchemeParametersProvider = void 0;
    var ZO4 = UI(),
        G70 = E5(),
        DO4 = async (A, B, Q) => {
            return {
                operation: G70.getSmithyContext(B).operation,
                region: await G70.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    EF2.defaultSSOHttpAuthSchemeParametersProvider = DO4;

    function GO4(A) {
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

    function uL1(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var FO4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "GetRoleCredentials": {
                B.push(uL1(A));
                break
            }
            case "ListAccountRoles": {
                B.push(uL1(A));
                break
            }
            case "ListAccounts": {
                B.push(uL1(A));
                break
            }
            case "Logout": {
                B.push(uL1(A));
                break
            }
            default:
                B.push(GO4(A))
        }
        return B
    };
    EF2.defaultSSOHttpAuthSchemeProvider = FO4;
    var IO4 = (A) => {
        let B = ZO4.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: G70.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    EF2.resolveHttpAuthSchemeConfig = IO4
});
var wF2 = E((RN5, JO4) => {
    JO4.exports = {
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
var p81 = E((ON5, OF2) => {
    var {
        defineProperty: dL1,
        getOwnPropertyDescriptor: XO4,
        getOwnPropertyNames: VO4
    } = Object, CO4 = Object.prototype.hasOwnProperty, mL1 = (A, B) => dL1(A, "name", {
        value: B,
        configurable: !0
    }), KO4 = (A, B) => {
        for (var Q in B) dL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, HO4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of VO4(B))
                if (!CO4.call(A, D) && D !== Q) dL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = XO4(B, D)) || Z.enumerable
                })
        }
        return A
    }, zO4 = (A) => HO4(dL1({}, "__esModule", {
        value: !0
    }), A), qF2 = {};
    KO4(qF2, {
        NODE_APP_ID_CONFIG_OPTIONS: () => qO4,
        UA_APP_ID_ENV_NAME: () => MF2,
        UA_APP_ID_INI_NAME: () => RF2,
        createDefaultUserAgentProvider: () => LF2,
        crtAvailability: () => NF2,
        defaultUserAgent: () => UO4
    });
    OF2.exports = zO4(qF2);
    var $F2 = W1("os"),
        I70 = W1("process"),
        NF2 = {
            isCrtAvailable: !1
        },
        EO4 = mL1(() => {
            if (NF2.isCrtAvailable) return ["md/crt-avail"];
            return null
        }, "isCrtAvailable"),
        LF2 = mL1(({
            serviceId: A,
            clientVersion: B
        }) => {
            return async (Q) => {
                let Z = [
                        ["aws-sdk-js", B],
                        ["ua", "2.1"],
                        [`os/${$F2.platform()}`, $F2.release()],
                        ["lang/js"],
                        ["md/nodejs", `${I70.versions.node}`]
                    ],
                    D = EO4();
                if (D) Z.push(D);
                if (A) Z.push([`api/${A}`, B]);
                if (I70.env.AWS_EXECUTION_ENV) Z.push([`exec-env/${I70.env.AWS_EXECUTION_ENV}`]);
                let G = await Q?.userAgentAppId?.();
                return G ? [...Z, [`app/${G}`]] : [...Z]
            }
        }, "createDefaultUserAgentProvider"),
        UO4 = LF2,
        wO4 = hr(),
        MF2 = "AWS_SDK_UA_APP_ID",
        RF2 = "sdk_ua_app_id",
        $O4 = "sdk-ua-app-id",
        qO4 = {
            environmentVariableSelector: mL1((A) => A[MF2], "environmentVariableSelector"),
            configFileSelector: mL1((A) => A[RF2] ?? A[$O4], "configFileSelector"),
            default: wO4.DEFAULT_UA_APP_ID
        }
});
var cF2 = E((mF2) => {
    Object.defineProperty(mF2, "__esModule", {
        value: !0
    });
    mF2.ruleSet = void 0;
    var fF2 = "required",
        AE = "fn",
        BE = "argv",
        mr = "ref",
        TF2 = !0,
        PF2 = "isSet",
        i81 = "booleanEquals",
        gr = "error",
        ur = "endpoint",
        rT = "tree",
        Y70 = "PartitionResult",
        W70 = "getAttr",
        SF2 = {
            [fF2]: !1,
            type: "String"
        },
        jF2 = {
            [fF2]: !0,
            default: !1,
            type: "Boolean"
        },
        kF2 = {
            [mr]: "Endpoint"
        },
        hF2 = {
            [AE]: i81,
            [BE]: [{
                [mr]: "UseFIPS"
            }, !0]
        },
        gF2 = {
            [AE]: i81,
            [BE]: [{
                [mr]: "UseDualStack"
            }, !0]
        },
        ez = {},
        yF2 = {
            [AE]: W70,
            [BE]: [{
                [mr]: Y70
            }, "supportsFIPS"]
        },
        uF2 = {
            [mr]: Y70
        },
        _F2 = {
            [AE]: i81,
            [BE]: [!0, {
                [AE]: W70,
                [BE]: [uF2, "supportsDualStack"]
            }]
        },
        xF2 = [hF2],
        vF2 = [gF2],
        bF2 = [{
            [mr]: "Region"
        }],
        NO4 = {
            version: "1.0",
            parameters: {
                Region: SF2,
                UseDualStack: jF2,
                UseFIPS: jF2,
                Endpoint: SF2
            },
            rules: [{
                conditions: [{
                    [AE]: PF2,
                    [BE]: [kF2]
                }],
                rules: [{
                    conditions: xF2,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: gr
                }, {
                    conditions: vF2,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: gr
                }, {
                    endpoint: {
                        url: kF2,
                        properties: ez,
                        headers: ez
                    },
                    type: ur
                }],
                type: rT
            }, {
                conditions: [{
                    [AE]: PF2,
                    [BE]: bF2
                }],
                rules: [{
                    conditions: [{
                        [AE]: "aws.partition",
                        [BE]: bF2,
                        assign: Y70
                    }],
                    rules: [{
                        conditions: [hF2, gF2],
                        rules: [{
                            conditions: [{
                                [AE]: i81,
                                [BE]: [TF2, yF2]
                            }, _F2],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: ez,
                                    headers: ez
                                },
                                type: ur
                            }],
                            type: rT
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: gr
                        }],
                        type: rT
                    }, {
                        conditions: xF2,
                        rules: [{
                            conditions: [{
                                [AE]: i81,
                                [BE]: [yF2, TF2]
                            }],
                            rules: [{
                                conditions: [{
                                    [AE]: "stringEquals",
                                    [BE]: [{
                                        [AE]: W70,
                                        [BE]: [uF2, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://portal.sso.{Region}.amazonaws.com",
                                    properties: ez,
                                    headers: ez
                                },
                                type: ur
                            }, {
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: ez,
                                    headers: ez
                                },
                                type: ur
                            }],
                            type: rT
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: gr
                        }],
                        type: rT
                    }, {
                        conditions: vF2,
                        rules: [{
                            conditions: [_F2],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: ez,
                                    headers: ez
                                },
                                type: ur
                            }],
                            type: rT
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: gr
                        }],
                        type: rT
                    }, {
                        endpoint: {
                            url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}",
                            properties: ez,
                            headers: ez
                        },
                        type: ur
                    }],
                    type: rT
                }],
                type: rT
            }, {
                error: "Invalid Configuration: Missing Region",
                type: gr
            }]
        };
    mF2.ruleSet = NO4
});
var iF2 = E((lF2) => {
    Object.defineProperty(lF2, "__esModule", {
        value: !0
    });
    lF2.defaultEndpointResolver = void 0;
    var LO4 = yr(),
        J70 = R7(),
        MO4 = cF2(),
        RO4 = new J70.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        OO4 = (A, B = {}) => {
            return RO4.get(A, () => J70.resolveEndpoint(MO4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    lF2.defaultEndpointResolver = OO4;
    J70.customEndpointFunctions.aws = LO4.awsEndpointFunctions
});