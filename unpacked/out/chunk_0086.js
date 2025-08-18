/* chunk:86 bytes:[1947231, 1965836) size:18605 source:unpacked-cli.js */
var tFA = E((k25, oFA) => {
    var {
        create: $8Q,
        defineProperty: t91,
        getOwnPropertyDescriptor: q8Q,
        getOwnPropertyNames: N8Q,
        getPrototypeOf: L8Q
    } = Object, M8Q = Object.prototype.hasOwnProperty, mH1 = (A, B) => t91(A, "name", {
        value: B,
        configurable: !0
    }), R8Q = (A, B) => {
        for (var Q in B) t91(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, nFA = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of N8Q(B))
                if (!M8Q.call(A, D) && D !== Q) t91(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = q8Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, Li = (A, B, Q) => (Q = A != null ? $8Q(L8Q(A)) : {}, nFA(B || !A || !A.__esModule ? t91(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), O8Q = (A) => nFA(t91({}, "__esModule", {
        value: !0
    }), A), aFA = {};
    R8Q(aFA, {
        credentialsTreatedAsExpired: () => rFA,
        credentialsWillNeedRefresh: () => sFA,
        defaultProvider: () => S8Q
    });
    oFA.exports = O8Q(aFA);
    var Go1 = ks1(),
        T8Q = I3(),
        yh = A9(),
        pFA = "AWS_EC2_METADATA_DISABLED",
        P8Q = mH1(async (A) => {
            let {
                ENV_CMDS_FULL_URI: B,
                ENV_CMDS_RELATIVE_URI: Q,
                fromContainerMetadata: Z,
                fromInstanceMetadata: D
            } = await Promise.resolve().then(() => Li(TF()));
            if (process.env[Q] || process.env[B]) {
                A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
                let {
                    fromHttp: G
                } = await Promise.resolve().then(() => Li(gs1()));
                return yh.chain(G(A), Z(A))
            }
            if (process.env[pFA] && process.env[pFA] !== "false") return async () => {
                throw new yh.CredentialsProviderError("EC2 Instance Metadata Service access disabled", {
                    logger: A.logger
                })
            };
            return A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata"), D(A)
        }, "remoteProvider"),
        iFA = !1,
        S8Q = mH1((A = {}) => yh.memoize(yh.chain(async () => {
            if (A.profile ?? process.env[T8Q.ENV_PROFILE]) {
                if (process.env[Go1.ENV_KEY] && process.env[Go1.ENV_SECRET]) {
                    if (!iFA)(A.logger?.warn && A.logger?.constructor?.name !== "NoOpLogger" ? A.logger.warn : console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`), iFA = !0
                }
                throw new yh.CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.", {
                    logger: A.logger,
                    tryNextLink: !0
                })
            }
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv"), Go1.fromEnv(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
            let {
                ssoStartUrl: B,
                ssoAccountId: Q,
                ssoRegion: Z,
                ssoRoleName: D,
                ssoSession: G
            } = A;
            if (!B && !Q && !Z && !D && !G) throw new yh.CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).", {
                logger: A.logger
            });
            let {
                fromSSO: F
            } = await Promise.resolve().then(() => Li(Wr1()));
            return F(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
            let {
                fromIni: B
            } = await Promise.resolve().then(() => Li(lFA()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
            let {
                fromProcess: B
            } = await Promise.resolve().then(() => Li(tr1()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
            let {
                fromTokenFile: B
            } = await Promise.resolve().then(() => Li(Qo1()));
            return B(A)()
        }, async () => {
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider"), (await P8Q(A))()
        }, async () => {
            throw new yh.CredentialsProviderError("Could not load credentials from any providers", {
                tryNextLink: !1,
                logger: A.logger
            })
        }), rFA, sFA), "defaultProvider"),
        sFA = mH1((A) => A?.expiration !== void 0, "credentialsWillNeedRefresh"),
        rFA = mH1((A) => A?.expiration !== void 0 && A.expiration.getTime() - Date.now() < 300000, "credentialsTreatedAsExpired")
});
var KIA = E((VIA) => {
    Object.defineProperty(VIA, "__esModule", {
        value: !0
    });
    VIA.ruleSet = void 0;
    var WIA = "required",
        PN = "fn",
        SN = "argv",
        Ri = "ref",
        eFA = !0,
        AIA = "isSet",
        AQ1 = "booleanEquals",
        Mi = "error",
        e91 = "endpoint",
        pJ = "tree",
        Fo1 = "PartitionResult",
        BIA = {
            [WIA]: !1,
            type: "String"
        },
        QIA = {
            [WIA]: !0,
            default: !1,
            type: "Boolean"
        },
        ZIA = {
            [Ri]: "Endpoint"
        },
        JIA = {
            [PN]: AQ1,
            [SN]: [{
                [Ri]: "UseFIPS"
            }, !0]
        },
        XIA = {
            [PN]: AQ1,
            [SN]: [{
                [Ri]: "UseDualStack"
            }, !0]
        },
        TN = {},
        DIA = {
            [PN]: "getAttr",
            [SN]: [{
                [Ri]: Fo1
            }, "supportsFIPS"]
        },
        GIA = {
            [PN]: AQ1,
            [SN]: [!0, {
                [PN]: "getAttr",
                [SN]: [{
                    [Ri]: Fo1
                }, "supportsDualStack"]
            }]
        },
        FIA = [JIA],
        IIA = [XIA],
        YIA = [{
            [Ri]: "Region"
        }],
        j8Q = {
            version: "1.0",
            parameters: {
                Region: BIA,
                UseDualStack: QIA,
                UseFIPS: QIA,
                Endpoint: BIA
            },
            rules: [{
                conditions: [{
                    [PN]: AIA,
                    [SN]: [ZIA]
                }],
                rules: [{
                    conditions: FIA,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: Mi
                }, {
                    rules: [{
                        conditions: IIA,
                        error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                        type: Mi
                    }, {
                        endpoint: {
                            url: ZIA,
                            properties: TN,
                            headers: TN
                        },
                        type: e91
                    }],
                    type: pJ
                }],
                type: pJ
            }, {
                rules: [{
                    conditions: [{
                        [PN]: AIA,
                        [SN]: YIA
                    }],
                    rules: [{
                        conditions: [{
                            [PN]: "aws.partition",
                            [SN]: YIA,
                            assign: Fo1
                        }],
                        rules: [{
                            conditions: [JIA, XIA],
                            rules: [{
                                conditions: [{
                                    [PN]: AQ1,
                                    [SN]: [eFA, DIA]
                                }, GIA],
                                rules: [{
                                    rules: [{
                                        endpoint: {
                                            url: "https://bedrock-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                            properties: TN,
                                            headers: TN
                                        },
                                        type: e91
                                    }],
                                    type: pJ
                                }],
                                type: pJ
                            }, {
                                error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                                type: Mi
                            }],
                            type: pJ
                        }, {
                            conditions: FIA,
                            rules: [{
                                conditions: [{
                                    [PN]: AQ1,
                                    [SN]: [DIA, eFA]
                                }],
                                rules: [{
                                    rules: [{
                                        endpoint: {
                                            url: "https://bedrock-fips.{Region}.{PartitionResult#dnsSuffix}",
                                            properties: TN,
                                            headers: TN
                                        },
                                        type: e91
                                    }],
                                    type: pJ
                                }],
                                type: pJ
                            }, {
                                error: "FIPS is enabled but this partition does not support FIPS",
                                type: Mi
                            }],
                            type: pJ
                        }, {
                            conditions: IIA,
                            rules: [{
                                conditions: [GIA],
                                rules: [{
                                    rules: [{
                                        endpoint: {
                                            url: "https://bedrock.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                            properties: TN,
                                            headers: TN
                                        },
                                        type: e91
                                    }],
                                    type: pJ
                                }],
                                type: pJ
                            }, {
                                error: "DualStack is enabled but this partition does not support DualStack",
                                type: Mi
                            }],
                            type: pJ
                        }, {
                            rules: [{
                                endpoint: {
                                    url: "https://bedrock.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: TN,
                                    headers: TN
                                },
                                type: e91
                            }],
                            type: pJ
                        }],
                        type: pJ
                    }],
                    type: pJ
                }, {
                    error: "Invalid Configuration: Missing Region",
                    type: Mi
                }],
                type: pJ
            }]
        };
    VIA.ruleSet = j8Q
});
var EIA = E((HIA) => {
    Object.defineProperty(HIA, "__esModule", {
        value: !0
    });
    HIA.defaultEndpointResolver = void 0;
    var k8Q = sp(),
        Io1 = R7(),
        y8Q = KIA(),
        _8Q = new Io1.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        x8Q = (A, B = {}) => {
            return _8Q.get(A, () => Io1.resolveEndpoint(y8Q.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    HIA.defaultEndpointResolver = x8Q;
    Io1.customEndpointFunctions.aws = k8Q.awsEndpointFunctions
});
var NIA = E(($IA) => {
    Object.defineProperty($IA, "__esModule", {
        value: !0
    });
    $IA.getRuntimeConfig = void 0;
    var v8Q = YI(),
        b8Q = HB(),
        f8Q = V6(),
        h8Q = JD(),
        UIA = Nk(),
        wIA = lB(),
        g8Q = js1(),
        u8Q = EIA(),
        m8Q = (A) => {
            return {
                apiVersion: "2023-04-20",
                base64Decoder: A?.base64Decoder ?? UIA.fromBase64,
                base64Encoder: A?.base64Encoder ?? UIA.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? u8Q.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? g8Q.defaultBedrockHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new v8Q.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#httpBearerAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#httpBearerAuth"),
                    signer: new b8Q.HttpBearerAuthSigner
                }],
                logger: A?.logger ?? new f8Q.NoOpLogger,
                serviceId: A?.serviceId ?? "Bedrock",
                urlParser: A?.urlParser ?? h8Q.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? wIA.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? wIA.toUtf8
            }
        };
    $IA.getRuntimeConfig = m8Q
});
var SIA = E((TIA) => {
    Object.defineProperty(TIA, "__esModule", {
        value: !0
    });
    TIA.getRuntimeConfig = void 0;
    var d8Q = wh(),
        c8Q = d8Q.__importDefault(I3A()),
        Yo1 = YI(),
        l8Q = tFA(),
        LIA = Ir1(),
        MIA = h91(),
        dH1 = z4(),
        p8Q = HB(),
        i8Q = mG(),
        RIA = u4(),
        _h = IZ(),
        OIA = x3(),
        n8Q = dG(),
        a8Q = aD(),
        s8Q = NIA(),
        r8Q = V6(),
        o8Q = cG(),
        t8Q = V6(),
        e8Q = (A) => {
            t8Q.emitWarningIfUnsupportedVersion(process.version);
            let B = o8Q.resolveDefaultsModeConfig(A),
                Q = () => B().then(r8Q.loadConfigsForDefaultMode),
                Z = s8Q.getRuntimeConfig(A);
            Yo1.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger,
                signingName: "bedrock"
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? _h.loadConfig(Yo1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? n8Q.calculateBodyLength,
                credentialDefaultProvider: A?.credentialDefaultProvider ?? l8Q.defaultProvider,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? MIA.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: c8Q.default.version
                }),
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (G) => G.getIdentityProvider("aws.auth#sigv4"),
                    signer: new Yo1.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#httpBearerAuth",
                    identityProvider: (G) => G.getIdentityProvider("smithy.api#httpBearerAuth") || (async (F) => {
                        try {
                            return await LIA.fromEnvSigningName({
                                signingName: "bedrock"
                            })()
                        } catch (I) {
                            return await LIA.nodeProvider(F)(F)
                        }
                    }),
                    signer: new p8Q.HttpBearerAuthSigner
                }],
                maxAttempts: A?.maxAttempts ?? _h.loadConfig(RIA.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? _h.loadConfig(dH1.NODE_REGION_CONFIG_OPTIONS, {
                    ...dH1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: OIA.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? _h.loadConfig({
                    ...RIA.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || a8Q.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? i8Q.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? OIA.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? _h.loadConfig(dH1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? _h.loadConfig(dH1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? _h.loadConfig(MIA.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    TIA.getRuntimeConfig = e8Q
});