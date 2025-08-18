/* chunk:116 bytes:[2657732, 2676720) size:18988 source:unpacked-cli.js */
var tqA = E((rqA) => {
    Object.defineProperty(rqA, "__esModule", {
        value: !0
    });
    rqA.ruleSet = void 0;
    var uqA = "required",
        U4 = "type",
        a8 = "fn",
        s8 = "argv",
        ik = "ref",
        SqA = !1,
        ne1 = !0,
        pk = "booleanEquals",
        $Y = "stringEquals",
        mqA = "sigv4",
        dqA = "sts",
        cqA = "us-east-1",
        XZ = "endpoint",
        jqA = "https://sts.{Region}.{PartitionResult#dnsSuffix}",
        fN = "tree",
        Qn = "error",
        se1 = "getAttr",
        kqA = {
            [uqA]: !1,
            [U4]: "String"
        },
        ae1 = {
            [uqA]: !0,
            default: !1,
            [U4]: "Boolean"
        },
        lqA = {
            [ik]: "Endpoint"
        },
        yqA = {
            [a8]: "isSet",
            [s8]: [{
                [ik]: "Region"
            }]
        },
        qY = {
            [ik]: "Region"
        },
        _qA = {
            [a8]: "aws.partition",
            [s8]: [qY],
            assign: "PartitionResult"
        },
        pqA = {
            [ik]: "UseFIPS"
        },
        iqA = {
            [ik]: "UseDualStack"
        },
        lW = {
            url: "https://sts.amazonaws.com",
            properties: {
                authSchemes: [{
                    name: mqA,
                    signingName: dqA,
                    signingRegion: cqA
                }]
            },
            headers: {}
        },
        tC = {},
        xqA = {
            conditions: [{
                [a8]: $Y,
                [s8]: [qY, "aws-global"]
            }],
            [XZ]: lW,
            [U4]: XZ
        },
        nqA = {
            [a8]: pk,
            [s8]: [pqA, !0]
        },
        aqA = {
            [a8]: pk,
            [s8]: [iqA, !0]
        },
        vqA = {
            [a8]: se1,
            [s8]: [{
                [ik]: "PartitionResult"
            }, "supportsFIPS"]
        },
        sqA = {
            [ik]: "PartitionResult"
        },
        bqA = {
            [a8]: pk,
            [s8]: [!0, {
                [a8]: se1,
                [s8]: [sqA, "supportsDualStack"]
            }]
        },
        fqA = [{
            [a8]: "isSet",
            [s8]: [lqA]
        }],
        hqA = [nqA],
        gqA = [aqA],
        c$Q = {
            version: "1.0",
            parameters: {
                Region: kqA,
                UseDualStack: ae1,
                UseFIPS: ae1,
                Endpoint: kqA,
                UseGlobalEndpoint: ae1
            },
            rules: [{
                conditions: [{
                    [a8]: pk,
                    [s8]: [{
                        [ik]: "UseGlobalEndpoint"
                    }, ne1]
                }, {
                    [a8]: "not",
                    [s8]: fqA
                }, yqA, _qA, {
                    [a8]: pk,
                    [s8]: [pqA, SqA]
                }, {
                    [a8]: pk,
                    [s8]: [iqA, SqA]
                }],
                rules: [{
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "ap-northeast-1"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "ap-south-1"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "ap-southeast-1"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "ap-southeast-2"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, xqA, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "ca-central-1"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "eu-central-1"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "eu-north-1"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "eu-west-1"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "eu-west-2"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "eu-west-3"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "sa-east-1"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, cqA]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "us-east-2"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "us-west-1"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    conditions: [{
                        [a8]: $Y,
                        [s8]: [qY, "us-west-2"]
                    }],
                    endpoint: lW,
                    [U4]: XZ
                }, {
                    endpoint: {
                        url: jqA,
                        properties: {
                            authSchemes: [{
                                name: mqA,
                                signingName: dqA,
                                signingRegion: "{Region}"
                            }]
                        },
                        headers: tC
                    },
                    [U4]: XZ
                }],
                [U4]: fN
            }, {
                conditions: fqA,
                rules: [{
                    conditions: hqA,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    [U4]: Qn
                }, {
                    conditions: gqA,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    [U4]: Qn
                }, {
                    endpoint: {
                        url: lqA,
                        properties: tC,
                        headers: tC
                    },
                    [U4]: XZ
                }],
                [U4]: fN
            }, {
                conditions: [yqA],
                rules: [{
                    conditions: [_qA],
                    rules: [{
                        conditions: [nqA, aqA],
                        rules: [{
                            conditions: [{
                                [a8]: pk,
                                [s8]: [ne1, vqA]
                            }, bqA],
                            rules: [{
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: tC,
                                    headers: tC
                                },
                                [U4]: XZ
                            }],
                            [U4]: fN
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            [U4]: Qn
                        }],
                        [U4]: fN
                    }, {
                        conditions: hqA,
                        rules: [{
                            conditions: [{
                                [a8]: pk,
                                [s8]: [vqA, ne1]
                            }],
                            rules: [{
                                conditions: [{
                                    [a8]: $Y,
                                    [s8]: [{
                                        [a8]: se1,
                                        [s8]: [sqA, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://sts.{Region}.amazonaws.com",
                                    properties: tC,
                                    headers: tC
                                },
                                [U4]: XZ
                            }, {
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: tC,
                                    headers: tC
                                },
                                [U4]: XZ
                            }],
                            [U4]: fN
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            [U4]: Qn
                        }],
                        [U4]: fN
                    }, {
                        conditions: gqA,
                        rules: [{
                            conditions: [bqA],
                            rules: [{
                                endpoint: {
                                    url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: tC,
                                    headers: tC
                                },
                                [U4]: XZ
                            }],
                            [U4]: fN
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            [U4]: Qn
                        }],
                        [U4]: fN
                    }, xqA, {
                        endpoint: {
                            url: jqA,
                            properties: tC,
                            headers: tC
                        },
                        [U4]: XZ
                    }],
                    [U4]: fN
                }],
                [U4]: fN
            }, {
                error: "Invalid Configuration: Missing Region",
                [U4]: Qn
            }]
        };
    rqA.ruleSet = c$Q
});
var BNA = E((eqA) => {
    Object.defineProperty(eqA, "__esModule", {
        value: !0
    });
    eqA.defaultEndpointResolver = void 0;
    var l$Q = ki(),
        re1 = R7(),
        p$Q = tqA(),
        i$Q = new re1.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
        }),
        n$Q = (A, B = {}) => {
            return i$Q.get(A, () => re1.resolveEndpoint(p$Q.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    eqA.defaultEndpointResolver = n$Q;
    re1.customEndpointFunctions.aws = l$Q.awsEndpointFunctions
});
var FNA = E((DNA) => {
    Object.defineProperty(DNA, "__esModule", {
        value: !0
    });
    DNA.getRuntimeConfig = void 0;
    var a$Q = WI(),
        s$Q = HB(),
        r$Q = XD(),
        o$Q = JD(),
        QNA = ve1(),
        ZNA = lB(),
        t$Q = ie1(),
        e$Q = BNA(),
        AqQ = (A) => {
            return {
                apiVersion: "2011-06-15",
                base64Decoder: A?.base64Decoder ?? QNA.fromBase64,
                base64Encoder: A?.base64Encoder ?? QNA.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? e$Q.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? t$Q.defaultSTSHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new a$Q.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new s$Q.NoAuthSigner
                }],
                logger: A?.logger ?? new r$Q.NoOpLogger,
                serviceId: A?.serviceId ?? "STS",
                urlParser: A?.urlParser ?? o$Q.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? ZNA.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? ZNA.toUtf8
            }
        };
    DNA.getRuntimeConfig = AqQ
});
var CNA = E((XNA) => {
    Object.defineProperty(XNA, "__esModule", {
        value: !0
    });
    XNA.getRuntimeConfig = void 0;
    var BqQ = ke1(),
        QqQ = BqQ.__importDefault(ye1()),
        INA = WI(),
        YNA = HQ1(),
        _E1 = z4(),
        ZqQ = HB(),
        DqQ = mG(),
        WNA = u4(),
        Zn = IZ(),
        JNA = x3(),
        GqQ = dG(),
        FqQ = aD(),
        IqQ = FNA(),
        YqQ = XD(),
        WqQ = cG(),
        JqQ = XD(),
        XqQ = (A) => {
            JqQ.emitWarningIfUnsupportedVersion(process.version);
            let B = WqQ.resolveDefaultsModeConfig(A),
                Q = () => B().then(YqQ.loadConfigsForDefaultMode),
                Z = IqQ.getRuntimeConfig(A);
            INA.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                bodyLengthChecker: A?.bodyLengthChecker ?? GqQ.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? YNA.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: QqQ.default.version
                }),
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (G) => G.getIdentityProvider("aws.auth#sigv4") || (async (F) => await A.credentialDefaultProvider(F?.__config || {})()),
                    signer: new INA.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (G) => G.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new ZqQ.NoAuthSigner
                }],
                maxAttempts: A?.maxAttempts ?? Zn.loadConfig(WNA.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? Zn.loadConfig(_E1.NODE_REGION_CONFIG_OPTIONS, {
                    ..._E1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: JNA.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? Zn.loadConfig({
                    ...WNA.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || FqQ.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? DqQ.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? JNA.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? Zn.loadConfig(_E1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? Zn.loadConfig(_E1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? Zn.loadConfig(YNA.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    XNA.getRuntimeConfig = XqQ
});
var zNA = E((KNA) => {
    Object.defineProperty(KNA, "__esModule", {
        value: !0
    });
    KNA.resolveHttpAuthRuntimeConfig = KNA.getHttpAuthExtensionConfiguration = void 0;
    var VqQ = (A) => {
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
    KNA.getHttpAuthExtensionConfiguration = VqQ;
    var CqQ = (A) => {
        return {
            httpAuthSchemes: A.httpAuthSchemes(),
            httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
            credentials: A.credentials()
        }
    };
    KNA.resolveHttpAuthRuntimeConfig = CqQ
});
var LNA = E((qNA) => {
    Object.defineProperty(qNA, "__esModule", {
        value: !0
    });
    qNA.resolveRuntimeExtensions = void 0;
    var ENA = NQ1(),
        UNA = PE1(),
        wNA = XD(),
        $NA = zNA(),
        HqQ = (A, B) => {
            let Q = Object.assign(ENA.getAwsRegionExtensionConfiguration(A), wNA.getDefaultExtensionConfiguration(A), UNA.getHttpHandlerExtensionConfiguration(A), $NA.getHttpAuthExtensionConfiguration(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, ENA.resolveAwsRegionExtensionConfiguration(Q), wNA.resolveDefaultRuntimeConfig(Q), UNA.resolveHttpHandlerRuntimeConfig(Q), $NA.resolveHttpAuthRuntimeConfig(Q))
        };
    qNA.resolveRuntimeExtensions = HqQ
});