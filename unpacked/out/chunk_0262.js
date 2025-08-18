/* chunk:262 bytes:[5613801, 5632944) size:19143 source:unpacked-cli.js */
var fW2 = E((vW2) => {
    Object.defineProperty(vW2, "__esModule", {
        value: !0
    });
    vW2.ruleSet = void 0;
    var RW2 = "required",
        N4 = "type",
        B5 = "fn",
        Q5 = "argv",
        N_ = "ref",
        KW2 = !1,
        T70 = !0,
        q_ = "booleanEquals",
        lY = "stringEquals",
        OW2 = "sigv4",
        TW2 = "sts",
        PW2 = "us-east-1",
        qZ = "endpoint",
        HW2 = "https://sts.{Region}.{PartitionResult#dnsSuffix}",
        _L = "tree",
        nr = "error",
        S70 = "getAttr",
        zW2 = {
            [RW2]: !1,
            [N4]: "String"
        },
        P70 = {
            [RW2]: !0,
            default: !1,
            [N4]: "Boolean"
        },
        SW2 = {
            [N_]: "Endpoint"
        },
        EW2 = {
            [B5]: "isSet",
            [Q5]: [{
                [N_]: "Region"
            }]
        },
        pY = {
            [N_]: "Region"
        },
        UW2 = {
            [B5]: "aws.partition",
            [Q5]: [pY],
            assign: "PartitionResult"
        },
        jW2 = {
            [N_]: "UseFIPS"
        },
        kW2 = {
            [N_]: "UseDualStack"
        },
        AJ = {
            url: "https://sts.amazonaws.com",
            properties: {
                authSchemes: [{
                    name: OW2,
                    signingName: TW2,
                    signingRegion: PW2
                }]
            },
            headers: {}
        },
        OK = {},
        wW2 = {
            conditions: [{
                [B5]: lY,
                [Q5]: [pY, "aws-global"]
            }],
            [qZ]: AJ,
            [N4]: qZ
        },
        yW2 = {
            [B5]: q_,
            [Q5]: [jW2, !0]
        },
        _W2 = {
            [B5]: q_,
            [Q5]: [kW2, !0]
        },
        $W2 = {
            [B5]: S70,
            [Q5]: [{
                [N_]: "PartitionResult"
            }, "supportsFIPS"]
        },
        xW2 = {
            [N_]: "PartitionResult"
        },
        qW2 = {
            [B5]: q_,
            [Q5]: [!0, {
                [B5]: S70,
                [Q5]: [xW2, "supportsDualStack"]
            }]
        },
        NW2 = [{
            [B5]: "isSet",
            [Q5]: [SW2]
        }],
        LW2 = [yW2],
        MW2 = [_W2],
        _S4 = {
            version: "1.0",
            parameters: {
                Region: zW2,
                UseDualStack: P70,
                UseFIPS: P70,
                Endpoint: zW2,
                UseGlobalEndpoint: P70
            },
            rules: [{
                conditions: [{
                    [B5]: q_,
                    [Q5]: [{
                        [N_]: "UseGlobalEndpoint"
                    }, T70]
                }, {
                    [B5]: "not",
                    [Q5]: NW2
                }, EW2, UW2, {
                    [B5]: q_,
                    [Q5]: [jW2, KW2]
                }, {
                    [B5]: q_,
                    [Q5]: [kW2, KW2]
                }],
                rules: [{
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "ap-northeast-1"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "ap-south-1"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "ap-southeast-1"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "ap-southeast-2"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, wW2, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "ca-central-1"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "eu-central-1"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "eu-north-1"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "eu-west-1"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "eu-west-2"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "eu-west-3"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "sa-east-1"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, PW2]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "us-east-2"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "us-west-1"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    conditions: [{
                        [B5]: lY,
                        [Q5]: [pY, "us-west-2"]
                    }],
                    endpoint: AJ,
                    [N4]: qZ
                }, {
                    endpoint: {
                        url: HW2,
                        properties: {
                            authSchemes: [{
                                name: OW2,
                                signingName: TW2,
                                signingRegion: "{Region}"
                            }]
                        },
                        headers: OK
                    },
                    [N4]: qZ
                }],
                [N4]: _L
            }, {
                conditions: NW2,
                rules: [{
                    conditions: LW2,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    [N4]: nr
                }, {
                    conditions: MW2,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    [N4]: nr
                }, {
                    endpoint: {
                        url: SW2,
                        properties: OK,
                        headers: OK
                    },
                    [N4]: qZ
                }],
                [N4]: _L
            }, {
                conditions: [EW2],
                rules: [{
                    conditions: [UW2],
                    rules: [{
                        conditions: [yW2, _W2],
                        rules: [{
                            conditions: [{
                                [B5]: q_,
                                [Q5]: [T70, $W2]
                            }, qW2],
                            rules: [{
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: OK,
                                    headers: OK
                                },
                                [N4]: qZ
                            }],
                            [N4]: _L
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            [N4]: nr
                        }],
                        [N4]: _L
                    }, {
                        conditions: LW2,
                        rules: [{
                            conditions: [{
                                [B5]: q_,
                                [Q5]: [$W2, T70]
                            }],
                            rules: [{
                                conditions: [{
                                    [B5]: lY,
                                    [Q5]: [{
                                        [B5]: S70,
                                        [Q5]: [xW2, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://sts.{Region}.amazonaws.com",
                                    properties: OK,
                                    headers: OK
                                },
                                [N4]: qZ
                            }, {
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: OK,
                                    headers: OK
                                },
                                [N4]: qZ
                            }],
                            [N4]: _L
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            [N4]: nr
                        }],
                        [N4]: _L
                    }, {
                        conditions: MW2,
                        rules: [{
                            conditions: [qW2],
                            rules: [{
                                endpoint: {
                                    url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: OK,
                                    headers: OK
                                },
                                [N4]: qZ
                            }],
                            [N4]: _L
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            [N4]: nr
                        }],
                        [N4]: _L
                    }, wW2, {
                        endpoint: {
                            url: HW2,
                            properties: OK,
                            headers: OK
                        },
                        [N4]: qZ
                    }],
                    [N4]: _L
                }],
                [N4]: _L
            }, {
                error: "Invalid Configuration: Missing Region",
                [N4]: nr
            }]
        };
    vW2.ruleSet = _S4
});
var uW2 = E((hW2) => {
    Object.defineProperty(hW2, "__esModule", {
        value: !0
    });
    hW2.defaultEndpointResolver = void 0;
    var xS4 = yr(),
        j70 = R7(),
        vS4 = fW2(),
        bS4 = new j70.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
        }),
        fS4 = (A, B = {}) => {
            return bS4.get(A, () => j70.resolveEndpoint(vS4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    hW2.defaultEndpointResolver = fS4;
    j70.customEndpointFunctions.aws = xS4.awsEndpointFunctions
});
var pW2 = E((cW2) => {
    Object.defineProperty(cW2, "__esModule", {
        value: !0
    });
    cW2.getRuntimeConfig = void 0;
    var hS4 = UI(),
        gS4 = HB(),
        uS4 = H6(),
        mS4 = JD(),
        mW2 = U_(),
        dW2 = lB(),
        dS4 = O70(),
        cS4 = uW2(),
        lS4 = (A) => {
            return {
                apiVersion: "2011-06-15",
                base64Decoder: A?.base64Decoder ?? mW2.fromBase64,
                base64Encoder: A?.base64Encoder ?? mW2.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? cS4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? dS4.defaultSTSHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new hS4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new gS4.NoAuthSigner
                }],
                logger: A?.logger ?? new uS4.NoOpLogger,
                serviceId: A?.serviceId ?? "STS",
                urlParser: A?.urlParser ?? mS4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? dW2.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? dW2.toUtf8
            }
        };
    cW2.getRuntimeConfig = lS4
});
var oW2 = E((sW2) => {
    Object.defineProperty(sW2, "__esModule", {
        value: !0
    });
    sW2.getRuntimeConfig = void 0;
    var pS4 = Du(),
        iS4 = pS4.__importDefault(H70()),
        k70 = UI(),
        iW2 = p81(),
        ZM1 = z4(),
        nS4 = HB(),
        aS4 = mG(),
        nW2 = u4(),
        Xu = IZ(),
        aW2 = x3(),
        sS4 = dG(),
        rS4 = aD(),
        oS4 = pW2(),
        tS4 = H6(),
        eS4 = cG(),
        Aj4 = H6(),
        Bj4 = (A) => {
            Aj4.emitWarningIfUnsupportedVersion(process.version);
            let B = eS4.resolveDefaultsModeConfig(A),
                Q = () => B().then(tS4.loadConfigsForDefaultMode),
                Z = oS4.getRuntimeConfig(A);
            k70.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? Xu.loadConfig(k70.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? sS4.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? iW2.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: iS4.default.version
                }),
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (G) => G.getIdentityProvider("aws.auth#sigv4") || (async (F) => await A.credentialDefaultProvider(F?.__config || {})()),
                    signer: new k70.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (G) => G.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new nS4.NoAuthSigner
                }],
                maxAttempts: A?.maxAttempts ?? Xu.loadConfig(nW2.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? Xu.loadConfig(ZM1.NODE_REGION_CONFIG_OPTIONS, {
                    ...ZM1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: aW2.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? Xu.loadConfig({
                    ...nW2.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || rS4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? aS4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? aW2.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? Xu.loadConfig(ZM1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? Xu.loadConfig(ZM1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? Xu.loadConfig(iW2.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    sW2.getRuntimeConfig = Bj4
});
var AJ2 = E((tW2) => {
    Object.defineProperty(tW2, "__esModule", {
        value: !0
    });
    tW2.resolveHttpAuthRuntimeConfig = tW2.getHttpAuthExtensionConfiguration = void 0;
    var Qj4 = (A) => {
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
    tW2.getHttpAuthExtensionConfiguration = Qj4;
    var Zj4 = (A) => {
        return {
            httpAuthSchemes: A.httpAuthSchemes(),
            httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
            credentials: A.credentials()
        }
    };
    tW2.resolveHttpAuthRuntimeConfig = Zj4
});
var IJ2 = E((GJ2) => {
    Object.defineProperty(GJ2, "__esModule", {
        value: !0
    });
    GJ2.resolveRuntimeExtensions = void 0;
    var BJ2 = n81(),
        QJ2 = vV(),
        ZJ2 = H6(),
        DJ2 = AJ2(),
        Gj4 = (A, B) => {
            let Q = Object.assign(BJ2.getAwsRegionExtensionConfiguration(A), ZJ2.getDefaultExtensionConfiguration(A), QJ2.getHttpHandlerExtensionConfiguration(A), DJ2.getHttpAuthExtensionConfiguration(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, BJ2.resolveAwsRegionExtensionConfiguration(Q), ZJ2.resolveDefaultRuntimeConfig(Q), QJ2.resolveHttpHandlerRuntimeConfig(Q), DJ2.resolveHttpAuthRuntimeConfig(Q))
        };
    GJ2.resolveRuntimeExtensions = Gj4
});