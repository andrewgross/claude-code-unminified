/* chunk:233 bytes:[5054732, 5074187) size:19455 source:unpacked-cli.js */
var P92 = E((O92) => {
    Object.defineProperty(O92, "__esModule", {
        value: !0
    });
    O92.retryWrapper = void 0;
    var HV4 = (A, B, Q) => {
        return async () => {
            for (let Z = 0; Z < B; ++Z) try {
                return await A()
            } catch (D) {
                await new Promise((G) => setTimeout(G, Q))
            }
            return await A()
        }
    };
    O92.retryWrapper = HV4
});
var _92 = E((k92) => {
    Object.defineProperty(k92, "__esModule", {
        value: !0
    });
    k92.fromHttp = void 0;
    var zV4 = ig(),
        EV4 = mz(),
        UV4 = x3(),
        S92 = A9(),
        wV4 = zV4.__importDefault(W1("fs/promises")),
        $V4 = L92(),
        j92 = R92(),
        qV4 = P92(),
        NV4 = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
        LV4 = "http://169.254.170.2",
        MV4 = "AWS_CONTAINER_CREDENTIALS_FULL_URI",
        RV4 = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",
        OV4 = "AWS_CONTAINER_AUTHORIZATION_TOKEN",
        TV4 = (A = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");
            let B, Q = A.awsContainerCredentialsRelativeUri ?? process.env[NV4],
                Z = A.awsContainerCredentialsFullUri ?? process.env[MV4],
                D = A.awsContainerAuthorizationToken ?? process.env[OV4],
                G = A.awsContainerAuthorizationTokenFile ?? process.env[RV4],
                F = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console.warn : A.logger.warn;
            if (Q && Z) F("@aws-sdk/credential-provider-http: you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri."), F("awsContainerCredentialsFullUri will take precedence.");
            if (D && G) F("@aws-sdk/credential-provider-http: you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile."), F("awsContainerAuthorizationToken will take precedence.");
            if (Z) B = Z;
            else if (Q) B = `${LV4}${Q}`;
            else throw new S92.CredentialsProviderError(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`, {
                logger: A.logger
            });
            let I = new URL(B);
            $V4.checkUrl(I, A.logger);
            let Y = new UV4.NodeHttpHandler({
                requestTimeout: A.timeout ?? 1000,
                connectionTimeout: A.timeout ?? 1000
            });
            return qV4.retryWrapper(async () => {
                let W = j92.createGetRequest(I);
                if (D) W.headers.Authorization = D;
                else if (G) W.headers.Authorization = (await wV4.default.readFile(G)).toString();
                try {
                    let J = await Y.handle(W);
                    return j92.getCredentials(J.response).then((X) => EV4.setCredentialFeature(X, "CREDENTIALS_HTTP", "z"))
                } catch (J) {
                    throw new S92.CredentialsProviderError(String(J), {
                        logger: A.logger
                    })
                }
            }, A.maxRetries ?? 3, A.timeout ?? 1000)
        };
    k92.fromHttp = TV4
});
var G80 = E((D80) => {
    Object.defineProperty(D80, "__esModule", {
        value: !0
    });
    D80.fromHttp = void 0;
    var PV4 = _92();
    Object.defineProperty(D80, "fromHttp", {
        enumerable: !0,
        get: function() {
            return PV4.fromHttp
        }
    })
});
var I80 = E((x92) => {
    Object.defineProperty(x92, "__esModule", {
        value: !0
    });
    x92.resolveHttpAuthSchemeConfig = x92.defaultSSOHttpAuthSchemeProvider = x92.defaultSSOHttpAuthSchemeParametersProvider = void 0;
    var jV4 = HI(),
        F80 = E5(),
        kV4 = async (A, B, Q) => {
            return {
                operation: F80.getSmithyContext(B).operation,
                region: await F80.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    x92.defaultSSOHttpAuthSchemeParametersProvider = kV4;

    function yV4(A) {
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

    function xN1(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var _V4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "GetRoleCredentials": {
                B.push(xN1(A));
                break
            }
            case "ListAccountRoles": {
                B.push(xN1(A));
                break
            }
            case "ListAccounts": {
                B.push(xN1(A));
                break
            }
            case "Logout": {
                B.push(xN1(A));
                break
            }
            default:
                B.push(yV4(A))
        }
        return B
    };
    x92.defaultSSOHttpAuthSchemeProvider = _V4;
    var xV4 = (A) => {
        let B = jV4.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: F80.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    x92.resolveHttpAuthSchemeConfig = xV4
});
var b92 = E((W$5, fV4) => {
    fV4.exports = {
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
var L81 = E((J$5, c92) => {
    var {
        defineProperty: bN1,
        getOwnPropertyDescriptor: hV4,
        getOwnPropertyNames: gV4
    } = Object, uV4 = Object.prototype.hasOwnProperty, vN1 = (A, B) => bN1(A, "name", {
        value: B,
        configurable: !0
    }), mV4 = (A, B) => {
        for (var Q in B) bN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, dV4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of gV4(B))
                if (!uV4.call(A, D) && D !== Q) bN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = hV4(B, D)) || Z.enumerable
                })
        }
        return A
    }, cV4 = (A) => dV4(bN1({}, "__esModule", {
        value: !0
    }), A), h92 = {};
    mV4(h92, {
        NODE_APP_ID_CONFIG_OPTIONS: () => aV4,
        UA_APP_ID_ENV_NAME: () => m92,
        UA_APP_ID_INI_NAME: () => d92,
        createDefaultUserAgentProvider: () => u92,
        crtAvailability: () => g92,
        defaultUserAgent: () => pV4
    });
    c92.exports = cV4(h92);
    var f92 = W1("os"),
        Y80 = W1("process"),
        g92 = {
            isCrtAvailable: !1
        },
        lV4 = vN1(() => {
            if (g92.isCrtAvailable) return ["md/crt-avail"];
            return null
        }, "isCrtAvailable"),
        u92 = vN1(({
            serviceId: A,
            clientVersion: B
        }) => {
            return async (Q) => {
                let Z = [
                        ["aws-sdk-js", B],
                        ["ua", "2.1"],
                        [`os/${f92.platform()}`, f92.release()],
                        ["lang/js"],
                        ["md/nodejs", `${Y80.versions.node}`]
                    ],
                    D = lV4();
                if (D) Z.push(D);
                if (A) Z.push([`api/${A}`, B]);
                if (Y80.env.AWS_EXECUTION_ENV) Z.push([`exec-env/${Y80.env.AWS_EXECUTION_ENV}`]);
                let G = await Q?.userAgentAppId?.();
                return G ? [...Z, [`app/${G}`]] : [...Z]
            }
        }, "createDefaultUserAgentProvider"),
        pV4 = u92,
        iV4 = Qr(),
        m92 = "AWS_SDK_UA_APP_ID",
        d92 = "sdk_ua_app_id",
        nV4 = "sdk-ua-app-id",
        aV4 = {
            environmentVariableSelector: vN1((A) => A[m92], "environmentVariableSelector"),
            configFileSelector: vN1((A) => A[d92] ?? A[nV4], "configFileSelector"),
            default: iV4.DEFAULT_UA_APP_ID
        }
});
var FQ2 = E((DQ2) => {
    Object.defineProperty(DQ2, "__esModule", {
        value: !0
    });
    DQ2.ruleSet = void 0;
    var AQ2 = "required",
        lz = "fn",
        pz = "argv",
        Gr = "ref",
        l92 = !0,
        p92 = "isSet",
        M81 = "booleanEquals",
        Zr = "error",
        Dr = "endpoint",
        jT = "tree",
        W80 = "PartitionResult",
        J80 = "getAttr",
        i92 = {
            [AQ2]: !1,
            type: "String"
        },
        n92 = {
            [AQ2]: !0,
            default: !1,
            type: "Boolean"
        },
        a92 = {
            [Gr]: "Endpoint"
        },
        BQ2 = {
            [lz]: M81,
            [pz]: [{
                [Gr]: "UseFIPS"
            }, !0]
        },
        QQ2 = {
            [lz]: M81,
            [pz]: [{
                [Gr]: "UseDualStack"
            }, !0]
        },
        cz = {},
        s92 = {
            [lz]: J80,
            [pz]: [{
                [Gr]: W80
            }, "supportsFIPS"]
        },
        ZQ2 = {
            [Gr]: W80
        },
        r92 = {
            [lz]: M81,
            [pz]: [!0, {
                [lz]: J80,
                [pz]: [ZQ2, "supportsDualStack"]
            }]
        },
        o92 = [BQ2],
        t92 = [QQ2],
        e92 = [{
            [Gr]: "Region"
        }],
        sV4 = {
            version: "1.0",
            parameters: {
                Region: i92,
                UseDualStack: n92,
                UseFIPS: n92,
                Endpoint: i92
            },
            rules: [{
                conditions: [{
                    [lz]: p92,
                    [pz]: [a92]
                }],
                rules: [{
                    conditions: o92,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: Zr
                }, {
                    conditions: t92,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: Zr
                }, {
                    endpoint: {
                        url: a92,
                        properties: cz,
                        headers: cz
                    },
                    type: Dr
                }],
                type: jT
            }, {
                conditions: [{
                    [lz]: p92,
                    [pz]: e92
                }],
                rules: [{
                    conditions: [{
                        [lz]: "aws.partition",
                        [pz]: e92,
                        assign: W80
                    }],
                    rules: [{
                        conditions: [BQ2, QQ2],
                        rules: [{
                            conditions: [{
                                [lz]: M81,
                                [pz]: [l92, s92]
                            }, r92],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: cz,
                                    headers: cz
                                },
                                type: Dr
                            }],
                            type: jT
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: Zr
                        }],
                        type: jT
                    }, {
                        conditions: o92,
                        rules: [{
                            conditions: [{
                                [lz]: M81,
                                [pz]: [s92, l92]
                            }],
                            rules: [{
                                conditions: [{
                                    [lz]: "stringEquals",
                                    [pz]: [{
                                        [lz]: J80,
                                        [pz]: [ZQ2, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://portal.sso.{Region}.amazonaws.com",
                                    properties: cz,
                                    headers: cz
                                },
                                type: Dr
                            }, {
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: cz,
                                    headers: cz
                                },
                                type: Dr
                            }],
                            type: jT
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: Zr
                        }],
                        type: jT
                    }, {
                        conditions: t92,
                        rules: [{
                            conditions: [r92],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: cz,
                                    headers: cz
                                },
                                type: Dr
                            }],
                            type: jT
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: Zr
                        }],
                        type: jT
                    }, {
                        endpoint: {
                            url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}",
                            properties: cz,
                            headers: cz
                        },
                        type: Dr
                    }],
                    type: jT
                }],
                type: jT
            }, {
                error: "Invalid Configuration: Missing Region",
                type: Zr
            }]
        };
    DQ2.ruleSet = sV4
});
var WQ2 = E((IQ2) => {
    Object.defineProperty(IQ2, "__esModule", {
        value: !0
    });
    IQ2.defaultEndpointResolver = void 0;
    var rV4 = rs(),
        X80 = R7(),
        oV4 = FQ2(),
        tV4 = new X80.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        eV4 = (A, B = {}) => {
            return tV4.get(A, () => X80.resolveEndpoint(oV4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    IQ2.defaultEndpointResolver = eV4;
    X80.customEndpointFunctions.aws = rV4.awsEndpointFunctions
});