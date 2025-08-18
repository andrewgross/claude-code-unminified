/* chunk:266 bytes:[5683024, 5702523) size:19499 source:unpacked-cli.js */
var HX2 = E((zL5, KX2) => {
    var {
        create: Iy4,
        defineProperty: D51,
        getOwnPropertyDescriptor: Yy4,
        getOwnPropertyNames: Wy4,
        getPrototypeOf: Jy4
    } = Object, Xy4 = Object.prototype.hasOwnProperty, IM1 = (A, B) => D51(A, "name", {
        value: B,
        configurable: !0
    }), Vy4 = (A, B) => {
        for (var Q in B) D51(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, JX2 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Wy4(B))
                if (!Xy4.call(A, D) && D !== Q) D51(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Yy4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Qo = (A, B, Q) => (Q = A != null ? Iy4(Jy4(A)) : {}, JX2(B || !A || !A.__esModule ? D51(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), Cy4 = (A) => JX2(D51({}, "__esModule", {
        value: !0
    }), A), XX2 = {};
    Vy4(XX2, {
        credentialsTreatedAsExpired: () => CX2,
        credentialsWillNeedRefresh: () => VX2,
        defaultProvider: () => zy4
    });
    KX2.exports = Cy4(XX2);
    var $Z0 = B70(),
        Ky4 = I3(),
        Vu = A9(),
        YX2 = "AWS_EC2_METADATA_DISABLED",
        Hy4 = IM1(async (A) => {
            let {
                ENV_CMDS_FULL_URI: B,
                ENV_CMDS_RELATIVE_URI: Q,
                fromContainerMetadata: Z,
                fromInstanceMetadata: D
            } = await Promise.resolve().then(() => Qo(TF()));
            if (process.env[Q] || process.env[B]) {
                A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
                let {
                    fromHttp: G
                } = await Promise.resolve().then(() => Qo(D70()));
                return Vu.chain(G(A), Z(A))
            }
            if (process.env[YX2] && process.env[YX2] !== "false") return async () => {
                throw new Vu.CredentialsProviderError("EC2 Instance Metadata Service access disabled", {
                    logger: A.logger
                })
            };
            return A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata"), D(A)
        }, "remoteProvider"),
        WX2 = !1,
        zy4 = IM1((A = {}) => Vu.memoize(Vu.chain(async () => {
            if (A.profile ?? process.env[Ky4.ENV_PROFILE]) {
                if (process.env[$Z0.ENV_KEY] && process.env[$Z0.ENV_SECRET]) {
                    if (!WX2)(A.logger?.warn && A.logger?.constructor?.name !== "NoOpLogger" ? A.logger.warn : console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`), WX2 = !0
                }
                throw new Vu.CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.", {
                    logger: A.logger,
                    tryNextLink: !0
                })
            }
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv"), $Z0.fromEnv(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
            let {
                ssoStartUrl: B,
                ssoAccountId: Q,
                ssoRegion: Z,
                ssoRoleName: D,
                ssoSession: G
            } = A;
            if (!B && !Q && !Z && !D && !G) throw new Vu.CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).", {
                logger: A.logger
            });
            let {
                fromSSO: F
            } = await Promise.resolve().then(() => Qo(M70()));
            return F(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
            let {
                fromIni: B
            } = await Promise.resolve().then(() => Qo(IX2()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
            let {
                fromProcess: B
            } = await Promise.resolve().then(() => Qo(CZ0()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
            let {
                fromTokenFile: B
            } = await Promise.resolve().then(() => Qo(EZ0()));
            return B(A)()
        }, async () => {
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider"), (await Hy4(A))()
        }, async () => {
            throw new Vu.CredentialsProviderError("Could not load credentials from any providers", {
                tryNextLink: !1,
                logger: A.logger
            })
        }), CX2, VX2), "defaultProvider"),
        VX2 = IM1((A) => A?.expiration !== void 0, "credentialsWillNeedRefresh"),
        CX2 = IM1((A) => A?.expiration !== void 0 && A.expiration.getTime() - Date.now() < 300000, "credentialsTreatedAsExpired")
});
var yX2 = E((jX2) => {
    Object.defineProperty(jX2, "__esModule", {
        value: !0
    });
    jX2.ruleSet = void 0;
    var OX2 = "required",
        BJ = "fn",
        QJ = "argv",
        Do = "ref",
        zX2 = !0,
        EX2 = "isSet",
        I51 = "booleanEquals",
        Zo = "error",
        vL = "endpoint",
        ZP = "tree",
        qZ0 = "PartitionResult",
        NZ0 = "getAttr",
        G51 = "stringEquals",
        UX2 = {
            [OX2]: !1,
            type: "String"
        },
        wX2 = {
            [OX2]: !0,
            default: !1,
            type: "Boolean"
        },
        $X2 = {
            [Do]: "Endpoint"
        },
        TX2 = {
            [BJ]: I51,
            [QJ]: [{
                [Do]: "UseFIPS"
            }, !0]
        },
        PX2 = {
            [BJ]: I51,
            [QJ]: [{
                [Do]: "UseDualStack"
            }, !0]
        },
        oG = {},
        F51 = {
            [Do]: "Region"
        },
        qX2 = {
            [BJ]: NZ0,
            [QJ]: [{
                [Do]: qZ0
            }, "supportsFIPS"]
        },
        SX2 = {
            [Do]: qZ0
        },
        NX2 = {
            [BJ]: I51,
            [QJ]: [!0, {
                [BJ]: NZ0,
                [QJ]: [SX2, "supportsDualStack"]
            }]
        },
        LX2 = [TX2],
        MX2 = [PX2],
        RX2 = [F51],
        Ey4 = {
            version: "1.0",
            parameters: {
                Region: UX2,
                UseDualStack: wX2,
                UseFIPS: wX2,
                Endpoint: UX2
            },
            rules: [{
                conditions: [{
                    [BJ]: EX2,
                    [QJ]: [$X2]
                }],
                rules: [{
                    conditions: LX2,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: Zo
                }, {
                    conditions: MX2,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: Zo
                }, {
                    endpoint: {
                        url: $X2,
                        properties: oG,
                        headers: oG
                    },
                    type: vL
                }],
                type: ZP
            }, {
                conditions: [{
                    [BJ]: EX2,
                    [QJ]: RX2
                }],
                rules: [{
                    conditions: [{
                        [BJ]: "aws.partition",
                        [QJ]: RX2,
                        assign: qZ0
                    }],
                    rules: [{
                        conditions: [TX2, PX2],
                        rules: [{
                            conditions: [{
                                [BJ]: I51,
                                [QJ]: [zX2, qX2]
                            }, NX2],
                            rules: [{
                                conditions: [{
                                    [BJ]: G51,
                                    [QJ]: [F51, "us-east-1"]
                                }],
                                endpoint: {
                                    url: "https://cognito-identity-fips.us-east-1.amazonaws.com",
                                    properties: oG,
                                    headers: oG
                                },
                                type: vL
                            }, {
                                conditions: [{
                                    [BJ]: G51,
                                    [QJ]: [F51, "us-east-2"]
                                }],
                                endpoint: {
                                    url: "https://cognito-identity-fips.us-east-2.amazonaws.com",
                                    properties: oG,
                                    headers: oG
                                },
                                type: vL
                            }, {
                                conditions: [{
                                    [BJ]: G51,
                                    [QJ]: [F51, "us-west-1"]
                                }],
                                endpoint: {
                                    url: "https://cognito-identity-fips.us-west-1.amazonaws.com",
                                    properties: oG,
                                    headers: oG
                                },
                                type: vL
                            }, {
                                conditions: [{
                                    [BJ]: G51,
                                    [QJ]: [F51, "us-west-2"]
                                }],
                                endpoint: {
                                    url: "https://cognito-identity-fips.us-west-2.amazonaws.com",
                                    properties: oG,
                                    headers: oG
                                },
                                type: vL
                            }, {
                                endpoint: {
                                    url: "https://cognito-identity-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: oG,
                                    headers: oG
                                },
                                type: vL
                            }],
                            type: ZP
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: Zo
                        }],
                        type: ZP
                    }, {
                        conditions: LX2,
                        rules: [{
                            conditions: [{
                                [BJ]: I51,
                                [QJ]: [qX2, zX2]
                            }],
                            rules: [{
                                endpoint: {
                                    url: "https://cognito-identity-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: oG,
                                    headers: oG
                                },
                                type: vL
                            }],
                            type: ZP
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: Zo
                        }],
                        type: ZP
                    }, {
                        conditions: MX2,
                        rules: [{
                            conditions: [NX2],
                            rules: [{
                                conditions: [{
                                    [BJ]: G51,
                                    [QJ]: ["aws", {
                                        [BJ]: NZ0,
                                        [QJ]: [SX2, "name"]
                                    }]
                                }],
                                endpoint: {
                                    url: "https://cognito-identity.{Region}.amazonaws.com",
                                    properties: oG,
                                    headers: oG
                                },
                                type: vL
                            }, {
                                endpoint: {
                                    url: "https://cognito-identity.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: oG,
                                    headers: oG
                                },
                                type: vL
                            }],
                            type: ZP
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: Zo
                        }],
                        type: ZP
                    }, {
                        endpoint: {
                            url: "https://cognito-identity.{Region}.{PartitionResult#dnsSuffix}",
                            properties: oG,
                            headers: oG
                        },
                        type: vL
                    }],
                    type: ZP
                }],
                type: ZP
            }, {
                error: "Invalid Configuration: Missing Region",
                type: Zo
            }]
        };
    jX2.ruleSet = Ey4
});
var vX2 = E((_X2) => {
    Object.defineProperty(_X2, "__esModule", {
        value: !0
    });
    _X2.defaultEndpointResolver = void 0;
    var Uy4 = yr(),
        LZ0 = R7(),
        wy4 = yX2(),
        $y4 = new LZ0.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        qy4 = (A, B = {}) => {
            return $y4.get(A, () => LZ0.resolveEndpoint(wy4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    _X2.defaultEndpointResolver = qy4;
    LZ0.customEndpointFunctions.aws = Uy4.awsEndpointFunctions
});
var uX2 = E((hX2) => {
    Object.defineProperty(hX2, "__esModule", {
        value: !0
    });
    hX2.getRuntimeConfig = void 0;
    var Ny4 = UI(),
        Ly4 = HB(),
        My4 = H6(),
        Ry4 = JD(),
        bX2 = U_(),
        fX2 = lB(),
        Oy4 = A70(),
        Ty4 = vX2(),
        Py4 = (A) => {
            return {
                apiVersion: "2014-06-30",
                base64Decoder: A?.base64Decoder ?? bX2.fromBase64,
                base64Encoder: A?.base64Encoder ?? bX2.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? Ty4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? Oy4.defaultCognitoIdentityHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new Ny4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new Ly4.NoAuthSigner
                }],
                logger: A?.logger ?? new My4.NoOpLogger,
                serviceId: A?.serviceId ?? "Cognito Identity",
                urlParser: A?.urlParser ?? Ry4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? fX2.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? fX2.toUtf8
            }
        };
    hX2.getRuntimeConfig = Py4
});
var nX2 = E((pX2) => {
    Object.defineProperty(pX2, "__esModule", {
        value: !0
    });
    pX2.getRuntimeConfig = void 0;
    var Sy4 = Du(),
        jy4 = Sy4.__importDefault(sG2()),
        mX2 = UI(),
        ky4 = HX2(),
        dX2 = p81(),
        YM1 = z4(),
        yy4 = mG(),
        cX2 = u4(),
        Cu = IZ(),
        lX2 = x3(),
        _y4 = dG(),
        xy4 = aD(),
        vy4 = uX2(),
        by4 = H6(),
        fy4 = cG(),
        hy4 = H6(),
        gy4 = (A) => {
            hy4.emitWarningIfUnsupportedVersion(process.version);
            let B = fy4.resolveDefaultsModeConfig(A),
                Q = () => B().then(by4.loadConfigsForDefaultMode),
                Z = vy4.getRuntimeConfig(A);
            mX2.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? Cu.loadConfig(mX2.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? _y4.calculateBodyLength,
                credentialDefaultProvider: A?.credentialDefaultProvider ?? ky4.defaultProvider,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? dX2.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: jy4.default.version
                }),
                maxAttempts: A?.maxAttempts ?? Cu.loadConfig(cX2.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? Cu.loadConfig(YM1.NODE_REGION_CONFIG_OPTIONS, {
                    ...YM1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: lX2.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? Cu.loadConfig({
                    ...cX2.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || xy4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? yy4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? lX2.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? Cu.loadConfig(YM1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? Cu.loadConfig(YM1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? Cu.loadConfig(dX2.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    pX2.getRuntimeConfig = gy4
});