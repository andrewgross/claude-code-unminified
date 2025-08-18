/* chunk:277 bytes:[5930272, 5947436) size:17164 source:unpacked-cli.js */
var cz2 = E((mz2) => {
    Object.defineProperty(mz2, "__esModule", {
        value: !0
    });
    mz2.ruleSet = void 0;
    var kz2 = "required",
        L4 = "type",
        Z5 = "fn",
        D5 = "argv",
        S_ = "ref",
        $z2 = !1,
        LD0 = !0,
        P_ = "booleanEquals",
        nY = "stringEquals",
        yz2 = "sigv4",
        _z2 = "sts",
        xz2 = "us-east-1",
        MZ = "endpoint",
        qz2 = "https://sts.{Region}.{PartitionResult#dnsSuffix}",
        hL = "tree",
        Jo = "error",
        RD0 = "getAttr",
        Nz2 = {
            [kz2]: !1,
            [L4]: "String"
        },
        MD0 = {
            [kz2]: !0,
            default: !1,
            [L4]: "Boolean"
        },
        vz2 = {
            [S_]: "Endpoint"
        },
        Lz2 = {
            [Z5]: "isSet",
            [D5]: [{
                [S_]: "Region"
            }]
        },
        aY = {
            [S_]: "Region"
        },
        Mz2 = {
            [Z5]: "aws.partition",
            [D5]: [aY],
            assign: "PartitionResult"
        },
        bz2 = {
            [S_]: "UseFIPS"
        },
        fz2 = {
            [S_]: "UseDualStack"
        },
        ZJ = {
            url: "https://sts.amazonaws.com",
            properties: {
                authSchemes: [{
                    name: yz2,
                    signingName: _z2,
                    signingRegion: xz2
                }]
            },
            headers: {}
        },
        jK = {},
        Rz2 = {
            conditions: [{
                [Z5]: nY,
                [D5]: [aY, "aws-global"]
            }],
            [MZ]: ZJ,
            [L4]: MZ
        },
        hz2 = {
            [Z5]: P_,
            [D5]: [bz2, !0]
        },
        gz2 = {
            [Z5]: P_,
            [D5]: [fz2, !0]
        },
        Oz2 = {
            [Z5]: RD0,
            [D5]: [{
                [S_]: "PartitionResult"
            }, "supportsFIPS"]
        },
        uz2 = {
            [S_]: "PartitionResult"
        },
        Tz2 = {
            [Z5]: P_,
            [D5]: [!0, {
                [Z5]: RD0,
                [D5]: [uz2, "supportsDualStack"]
            }]
        },
        Pz2 = [{
            [Z5]: "isSet",
            [D5]: [vz2]
        }],
        Sz2 = [hz2],
        jz2 = [gz2],
        gg4 = {
            version: "1.0",
            parameters: {
                Region: Nz2,
                UseDualStack: MD0,
                UseFIPS: MD0,
                Endpoint: Nz2,
                UseGlobalEndpoint: MD0
            },
            rules: [{
                conditions: [{
                    [Z5]: P_,
                    [D5]: [{
                        [S_]: "UseGlobalEndpoint"
                    }, LD0]
                }, {
                    [Z5]: "not",
                    [D5]: Pz2
                }, Lz2, Mz2, {
                    [Z5]: P_,
                    [D5]: [bz2, $z2]
                }, {
                    [Z5]: P_,
                    [D5]: [fz2, $z2]
                }],
                rules: [{
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "ap-northeast-1"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "ap-south-1"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "ap-southeast-1"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "ap-southeast-2"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, Rz2, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "ca-central-1"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "eu-central-1"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "eu-north-1"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "eu-west-1"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "eu-west-2"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "eu-west-3"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "sa-east-1"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, xz2]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "us-east-2"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "us-west-1"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    conditions: [{
                        [Z5]: nY,
                        [D5]: [aY, "us-west-2"]
                    }],
                    endpoint: ZJ,
                    [L4]: MZ
                }, {
                    endpoint: {
                        url: qz2,
                        properties: {
                            authSchemes: [{
                                name: yz2,
                                signingName: _z2,
                                signingRegion: "{Region}"
                            }]
                        },
                        headers: jK
                    },
                    [L4]: MZ
                }],
                [L4]: hL
            }, {
                conditions: Pz2,
                rules: [{
                    conditions: Sz2,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    [L4]: Jo
                }, {
                    conditions: jz2,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    [L4]: Jo
                }, {
                    endpoint: {
                        url: vz2,
                        properties: jK,
                        headers: jK
                    },
                    [L4]: MZ
                }],
                [L4]: hL
            }, {
                conditions: [Lz2],
                rules: [{
                    conditions: [Mz2],
                    rules: [{
                        conditions: [hz2, gz2],
                        rules: [{
                            conditions: [{
                                [Z5]: P_,
                                [D5]: [LD0, Oz2]
                            }, Tz2],
                            rules: [{
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: jK,
                                    headers: jK
                                },
                                [L4]: MZ
                            }],
                            [L4]: hL
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            [L4]: Jo
                        }],
                        [L4]: hL
                    }, {
                        conditions: Sz2,
                        rules: [{
                            conditions: [{
                                [Z5]: P_,
                                [D5]: [Oz2, LD0]
                            }],
                            rules: [{
                                conditions: [{
                                    [Z5]: nY,
                                    [D5]: [{
                                        [Z5]: RD0,
                                        [D5]: [uz2, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://sts.{Region}.amazonaws.com",
                                    properties: jK,
                                    headers: jK
                                },
                                [L4]: MZ
                            }, {
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: jK,
                                    headers: jK
                                },
                                [L4]: MZ
                            }],
                            [L4]: hL
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            [L4]: Jo
                        }],
                        [L4]: hL
                    }, {
                        conditions: jz2,
                        rules: [{
                            conditions: [Tz2],
                            rules: [{
                                endpoint: {
                                    url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: jK,
                                    headers: jK
                                },
                                [L4]: MZ
                            }],
                            [L4]: hL
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            [L4]: Jo
                        }],
                        [L4]: hL
                    }, Rz2, {
                        endpoint: {
                            url: qz2,
                            properties: jK,
                            headers: jK
                        },
                        [L4]: MZ
                    }],
                    [L4]: hL
                }],
                [L4]: hL
            }, {
                error: "Invalid Configuration: Missing Region",
                [L4]: Jo
            }]
        };
    mz2.ruleSet = gg4
});
var iz2 = E((lz2) => {
    Object.defineProperty(lz2, "__esModule", {
        value: !0
    });
    lz2.defaultEndpointResolver = void 0;
    var ug4 = Y51(),
        OD0 = R7(),
        mg4 = cz2(),
        dg4 = new OD0.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
        }),
        cg4 = (A, B = {}) => {
            return dg4.get(A, () => OD0.resolveEndpoint(mg4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    lz2.defaultEndpointResolver = cg4;
    OD0.customEndpointFunctions.aws = ug4.awsEndpointFunctions
});
var oz2 = E((sz2) => {
    Object.defineProperty(sz2, "__esModule", {
        value: !0
    });
    sz2.getRuntimeConfig = void 0;
    var lg4 = bV(),
        pg4 = HB(),
        ig4 = P8(),
        ng4 = JD(),
        nz2 = Hu(),
        az2 = lB(),
        ag4 = $D0(),
        sg4 = iz2(),
        rg4 = (A) => {
            return {
                apiVersion: "2011-06-15",
                base64Decoder: A?.base64Decoder ?? nz2.fromBase64,
                base64Encoder: A?.base64Encoder ?? nz2.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? sg4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? ag4.defaultSTSHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new lg4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new pg4.NoAuthSigner
                }],
                logger: A?.logger ?? new ig4.NoOpLogger,
                serviceId: A?.serviceId ?? "STS",
                urlParser: A?.urlParser ?? ng4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? az2.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? az2.toUtf8
            }
        };
    sz2.getRuntimeConfig = rg4
});
var ZE2 = E((BE2) => {
    Object.defineProperty(BE2, "__esModule", {
        value: !0
    });
    BE2.getRuntimeConfig = void 0;
    var og4 = Zu(),
        tg4 = og4.__importDefault(qD0()),
        TD0 = bV(),
        tz2 = sM1(),
        rM1 = z4(),
        eg4 = HB(),
        Au4 = mG(),
        ez2 = u4(),
        Uu = IZ(),
        AE2 = x3(),
        Bu4 = dG(),
        Qu4 = aD(),
        Zu4 = oz2(),
        Du4 = P8(),
        Gu4 = cG(),
        Fu4 = P8(),
        Iu4 = (A) => {
            Fu4.emitWarningIfUnsupportedVersion(process.version);
            let B = Gu4.resolveDefaultsModeConfig(A),
                Q = () => B().then(Du4.loadConfigsForDefaultMode),
                Z = Zu4.getRuntimeConfig(A);
            TD0.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? Uu.loadConfig(TD0.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? Bu4.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? tz2.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: tg4.default.version
                }),
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (G) => G.getIdentityProvider("aws.auth#sigv4") || (async (F) => await A.credentialDefaultProvider(F?.__config || {})()),
                    signer: new TD0.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (G) => G.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new eg4.NoAuthSigner
                }],
                maxAttempts: A?.maxAttempts ?? Uu.loadConfig(ez2.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? Uu.loadConfig(rM1.NODE_REGION_CONFIG_OPTIONS, {
                    ...rM1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: AE2.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? Uu.loadConfig({
                    ...ez2.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || Qu4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? Au4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? AE2.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? Uu.loadConfig(rM1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? Uu.loadConfig(rM1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? Uu.loadConfig(tz2.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    BE2.getRuntimeConfig = Iu4
});