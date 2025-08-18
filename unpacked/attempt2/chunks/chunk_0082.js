/* chunk:82 bytes:[1878008, 1897151) size:19143 source:unpacked-cli.js */
var $GA = E((UGA) => {
    Object.defineProperty(UGA, "__esModule", {
        value: !0
    });
    UGA.ruleSet = void 0;
    var YGA = "required",
        E4 = "type",
        i8 = "fn",
        n8 = "argv",
        yk = "ref",
        oDA = !1,
        Vr1 = !0,
        kk = "booleanEquals",
        zY = "stringEquals",
        WGA = "sigv4",
        JGA = "sts",
        XGA = "us-east-1",
        YZ = "endpoint",
        tDA = "https://sts.{Region}.{PartitionResult#dnsSuffix}",
        RN = "tree",
        Ki = "error",
        Kr1 = "getAttr",
        eDA = {
            [YGA]: !1,
            [E4]: "String"
        },
        Cr1 = {
            [YGA]: !0,
            default: !1,
            [E4]: "Boolean"
        },
        VGA = {
            [yk]: "Endpoint"
        },
        AGA = {
            [i8]: "isSet",
            [n8]: [{
                [yk]: "Region"
            }]
        },
        EY = {
            [yk]: "Region"
        },
        BGA = {
            [i8]: "aws.partition",
            [n8]: [EY],
            assign: "PartitionResult"
        },
        CGA = {
            [yk]: "UseFIPS"
        },
        KGA = {
            [yk]: "UseDualStack"
        },
        mW = {
            url: "https://sts.amazonaws.com",
            properties: {
                authSchemes: [{
                    name: WGA,
                    signingName: JGA,
                    signingRegion: XGA
                }]
            },
            headers: {}
        },
        rC = {},
        QGA = {
            conditions: [{
                [i8]: zY,
                [n8]: [EY, "aws-global"]
            }],
            [YZ]: mW,
            [E4]: YZ
        },
        HGA = {
            [i8]: kk,
            [n8]: [CGA, !0]
        },
        zGA = {
            [i8]: kk,
            [n8]: [KGA, !0]
        },
        ZGA = {
            [i8]: Kr1,
            [n8]: [{
                [yk]: "PartitionResult"
            }, "supportsFIPS"]
        },
        EGA = {
            [yk]: "PartitionResult"
        },
        DGA = {
            [i8]: kk,
            [n8]: [!0, {
                [i8]: Kr1,
                [n8]: [EGA, "supportsDualStack"]
            }]
        },
        GGA = [{
            [i8]: "isSet",
            [n8]: [VGA]
        }],
        FGA = [HGA],
        IGA = [zGA],
        iQQ = {
            version: "1.0",
            parameters: {
                Region: eDA,
                UseDualStack: Cr1,
                UseFIPS: Cr1,
                Endpoint: eDA,
                UseGlobalEndpoint: Cr1
            },
            rules: [{
                conditions: [{
                    [i8]: kk,
                    [n8]: [{
                        [yk]: "UseGlobalEndpoint"
                    }, Vr1]
                }, {
                    [i8]: "not",
                    [n8]: GGA
                }, AGA, BGA, {
                    [i8]: kk,
                    [n8]: [CGA, oDA]
                }, {
                    [i8]: kk,
                    [n8]: [KGA, oDA]
                }],
                rules: [{
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "ap-northeast-1"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "ap-south-1"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "ap-southeast-1"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "ap-southeast-2"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, QGA, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "ca-central-1"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "eu-central-1"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "eu-north-1"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "eu-west-1"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "eu-west-2"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "eu-west-3"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "sa-east-1"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, XGA]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "us-east-2"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "us-west-1"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    conditions: [{
                        [i8]: zY,
                        [n8]: [EY, "us-west-2"]
                    }],
                    endpoint: mW,
                    [E4]: YZ
                }, {
                    endpoint: {
                        url: tDA,
                        properties: {
                            authSchemes: [{
                                name: WGA,
                                signingName: JGA,
                                signingRegion: "{Region}"
                            }]
                        },
                        headers: rC
                    },
                    [E4]: YZ
                }],
                [E4]: RN
            }, {
                conditions: GGA,
                rules: [{
                    conditions: FGA,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    [E4]: Ki
                }, {
                    conditions: IGA,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    [E4]: Ki
                }, {
                    endpoint: {
                        url: VGA,
                        properties: rC,
                        headers: rC
                    },
                    [E4]: YZ
                }],
                [E4]: RN
            }, {
                conditions: [AGA],
                rules: [{
                    conditions: [BGA],
                    rules: [{
                        conditions: [HGA, zGA],
                        rules: [{
                            conditions: [{
                                [i8]: kk,
                                [n8]: [Vr1, ZGA]
                            }, DGA],
                            rules: [{
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: rC,
                                    headers: rC
                                },
                                [E4]: YZ
                            }],
                            [E4]: RN
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            [E4]: Ki
                        }],
                        [E4]: RN
                    }, {
                        conditions: FGA,
                        rules: [{
                            conditions: [{
                                [i8]: kk,
                                [n8]: [ZGA, Vr1]
                            }],
                            rules: [{
                                conditions: [{
                                    [i8]: zY,
                                    [n8]: [{
                                        [i8]: Kr1,
                                        [n8]: [EGA, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://sts.{Region}.amazonaws.com",
                                    properties: rC,
                                    headers: rC
                                },
                                [E4]: YZ
                            }, {
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: rC,
                                    headers: rC
                                },
                                [E4]: YZ
                            }],
                            [E4]: RN
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            [E4]: Ki
                        }],
                        [E4]: RN
                    }, {
                        conditions: IGA,
                        rules: [{
                            conditions: [DGA],
                            rules: [{
                                endpoint: {
                                    url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: rC,
                                    headers: rC
                                },
                                [E4]: YZ
                            }],
                            [E4]: RN
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            [E4]: Ki
                        }],
                        [E4]: RN
                    }, QGA, {
                        endpoint: {
                            url: tDA,
                            properties: rC,
                            headers: rC
                        },
                        [E4]: YZ
                    }],
                    [E4]: RN
                }],
                [E4]: RN
            }, {
                error: "Invalid Configuration: Missing Region",
                [E4]: Ki
            }]
        };
    UGA.ruleSet = iQQ
});
var LGA = E((qGA) => {
    Object.defineProperty(qGA, "__esModule", {
        value: !0
    });
    qGA.defaultEndpointResolver = void 0;
    var nQQ = sp(),
        Hr1 = R7(),
        aQQ = $GA(),
        sQQ = new Hr1.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
        }),
        rQQ = (A, B = {}) => {
            return sQQ.get(A, () => Hr1.resolveEndpoint(aQQ.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    qGA.defaultEndpointResolver = rQQ;
    Hr1.customEndpointFunctions.aws = nQQ.awsEndpointFunctions
});
var PGA = E((OGA) => {
    Object.defineProperty(OGA, "__esModule", {
        value: !0
    });
    OGA.getRuntimeConfig = void 0;
    var oQQ = YI(),
        tQQ = HB(),
        eQQ = V6(),
        A4Q = JD(),
        MGA = Nk(),
        RGA = lB(),
        B4Q = Xr1(),
        Q4Q = LGA(),
        Z4Q = (A) => {
            return {
                apiVersion: "2011-06-15",
                base64Decoder: A?.base64Decoder ?? MGA.fromBase64,
                base64Encoder: A?.base64Encoder ?? MGA.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? Q4Q.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? B4Q.defaultSTSHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new oQQ.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new tQQ.NoAuthSigner
                }],
                logger: A?.logger ?? new eQQ.NoOpLogger,
                serviceId: A?.serviceId ?? "STS",
                urlParser: A?.urlParser ?? A4Q.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? RGA.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? RGA.toUtf8
            }
        };
    OGA.getRuntimeConfig = Z4Q
});
var xGA = E((yGA) => {
    Object.defineProperty(yGA, "__esModule", {
        value: !0
    });
    yGA.getRuntimeConfig = void 0;
    var D4Q = wh(),
        G4Q = D4Q.__importDefault(es1()),
        zr1 = YI(),
        SGA = h91(),
        fH1 = z4(),
        F4Q = HB(),
        I4Q = mG(),
        jGA = u4(),
        kh = IZ(),
        kGA = x3(),
        Y4Q = dG(),
        W4Q = aD(),
        J4Q = PGA(),
        X4Q = V6(),
        V4Q = cG(),
        C4Q = V6(),
        K4Q = (A) => {
            C4Q.emitWarningIfUnsupportedVersion(process.version);
            let B = V4Q.resolveDefaultsModeConfig(A),
                Q = () => B().then(X4Q.loadConfigsForDefaultMode),
                Z = J4Q.getRuntimeConfig(A);
            zr1.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? kh.loadConfig(zr1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? Y4Q.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? SGA.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: G4Q.default.version
                }),
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (G) => G.getIdentityProvider("aws.auth#sigv4") || (async (F) => await A.credentialDefaultProvider(F?.__config || {})()),
                    signer: new zr1.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (G) => G.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new F4Q.NoAuthSigner
                }],
                maxAttempts: A?.maxAttempts ?? kh.loadConfig(jGA.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? kh.loadConfig(fH1.NODE_REGION_CONFIG_OPTIONS, {
                    ...fH1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: kGA.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? kh.loadConfig({
                    ...jGA.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || W4Q.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? I4Q.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? kGA.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? kh.loadConfig(fH1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? kh.loadConfig(fH1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? kh.loadConfig(SGA.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    yGA.getRuntimeConfig = K4Q
});
var fGA = E((vGA) => {
    Object.defineProperty(vGA, "__esModule", {
        value: !0
    });
    vGA.resolveHttpAuthRuntimeConfig = vGA.getHttpAuthExtensionConfiguration = void 0;
    var H4Q = (A) => {
        let {
            httpAuthSchemes: B,
            httpAuthSchemeProvider: Q,
            credentials: Z
        } = A;
        return {
            setHttpAuthScheme(D) {
                let G = B.findIndex((F) => F.schemeId === D.schemeId);
                if (G === -1) B.push(D);
                else B.splice(G, 1, D)
            },
            httpAuthSchemes() {
                return B
            },
            setHttpAuthSchemeProvider(D) {
                Q = D
            },
            httpAuthSchemeProvider() {
                return Q
            },
            setCredentials(D) {
                Z = D
            },
            credentials() {
                return Z
            }
        }
    };
    vGA.getHttpAuthExtensionConfiguration = H4Q;
    var z4Q = (A) => {
        return {
            httpAuthSchemes: A.httpAuthSchemes(),
            httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
            credentials: A.credentials()
        }
    };
    vGA.resolveHttpAuthRuntimeConfig = z4Q
});
var lGA = E((dGA) => {
    Object.defineProperty(dGA, "__esModule", {
        value: !0
    });
    dGA.resolveRuntimeExtensions = void 0;
    var hGA = m91(),
        gGA = CV(),
        uGA = V6(),
        mGA = fGA(),
        U4Q = (A, B) => {
            let Q = Object.assign(hGA.getAwsRegionExtensionConfiguration(A), uGA.getDefaultExtensionConfiguration(A), gGA.getHttpHandlerExtensionConfiguration(A), mGA.getHttpAuthExtensionConfiguration(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, hGA.resolveAwsRegionExtensionConfiguration(Q), uGA.resolveDefaultRuntimeConfig(Q), gGA.resolveHttpHandlerRuntimeConfig(Q), mGA.resolveHttpAuthRuntimeConfig(Q))
        };
    dGA.resolveRuntimeExtensions = U4Q
});