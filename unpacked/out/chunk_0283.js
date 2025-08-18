/* chunk:283 bytes:[6023492, 6036724) size:13232 source:unpacked-cli.js */
var zG0 = E((Hw2) => {
    Object.defineProperty(Hw2, "__esModule", {
        value: !0
    });
    Hw2.resolveHttpAuthSchemeConfig = Hw2.defaultSSOOIDCHttpAuthSchemeProvider = Hw2.defaultSSOOIDCHttpAuthSchemeParametersProvider = void 0;
    var ed4 = bV(),
        HG0 = E5(),
        Ac4 = async (A, B, Q) => {
            return {
                operation: HG0.getSmithyContext(B).operation,
                region: await HG0.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    Hw2.defaultSSOOIDCHttpAuthSchemeParametersProvider = Ac4;

    function Bc4(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "sso-oauth",
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

    function Qc4(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var Zc4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "CreateToken": {
                B.push(Qc4(A));
                break
            }
            default:
                B.push(Bc4(A))
        }
        return B
    };
    Hw2.defaultSSOOIDCHttpAuthSchemeProvider = Zc4;
    var Dc4 = (A) => {
        let B = ed4.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: HG0.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    Hw2.resolveHttpAuthSchemeConfig = Dc4
});
var _w2 = E((kw2) => {
    Object.defineProperty(kw2, "__esModule", {
        value: !0
    });
    kw2.ruleSet = void 0;
    var Tw2 = "required",
        XE = "fn",
        VE = "argv",
        Ro = "ref",
        Ew2 = !0,
        Uw2 = "isSet",
        $51 = "booleanEquals",
        Lo = "error",
        Mo = "endpoint",
        JP = "tree",
        EG0 = "PartitionResult",
        UG0 = "getAttr",
        ww2 = {
            [Tw2]: !1,
            type: "String"
        },
        $w2 = {
            [Tw2]: !0,
            default: !1,
            type: "Boolean"
        },
        qw2 = {
            [Ro]: "Endpoint"
        },
        Pw2 = {
            [XE]: $51,
            [VE]: [{
                [Ro]: "UseFIPS"
            }, !0]
        },
        Sw2 = {
            [XE]: $51,
            [VE]: [{
                [Ro]: "UseDualStack"
            }, !0]
        },
        JE = {},
        Nw2 = {
            [XE]: UG0,
            [VE]: [{
                [Ro]: EG0
            }, "supportsFIPS"]
        },
        jw2 = {
            [Ro]: EG0
        },
        Lw2 = {
            [XE]: $51,
            [VE]: [!0, {
                [XE]: UG0,
                [VE]: [jw2, "supportsDualStack"]
            }]
        },
        Mw2 = [Pw2],
        Rw2 = [Sw2],
        Ow2 = [{
            [Ro]: "Region"
        }],
        Ic4 = {
            version: "1.0",
            parameters: {
                Region: ww2,
                UseDualStack: $w2,
                UseFIPS: $w2,
                Endpoint: ww2
            },
            rules: [{
                conditions: [{
                    [XE]: Uw2,
                    [VE]: [qw2]
                }],
                rules: [{
                    conditions: Mw2,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: Lo
                }, {
                    conditions: Rw2,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: Lo
                }, {
                    endpoint: {
                        url: qw2,
                        properties: JE,
                        headers: JE
                    },
                    type: Mo
                }],
                type: JP
            }, {
                conditions: [{
                    [XE]: Uw2,
                    [VE]: Ow2
                }],
                rules: [{
                    conditions: [{
                        [XE]: "aws.partition",
                        [VE]: Ow2,
                        assign: EG0
                    }],
                    rules: [{
                        conditions: [Pw2, Sw2],
                        rules: [{
                            conditions: [{
                                [XE]: $51,
                                [VE]: [Ew2, Nw2]
                            }, Lw2],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: JE,
                                    headers: JE
                                },
                                type: Mo
                            }],
                            type: JP
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: Lo
                        }],
                        type: JP
                    }, {
                        conditions: Mw2,
                        rules: [{
                            conditions: [{
                                [XE]: $51,
                                [VE]: [Nw2, Ew2]
                            }],
                            rules: [{
                                conditions: [{
                                    [XE]: "stringEquals",
                                    [VE]: [{
                                        [XE]: UG0,
                                        [VE]: [jw2, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://oidc.{Region}.amazonaws.com",
                                    properties: JE,
                                    headers: JE
                                },
                                type: Mo
                            }, {
                                endpoint: {
                                    url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: JE,
                                    headers: JE
                                },
                                type: Mo
                            }],
                            type: JP
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: Lo
                        }],
                        type: JP
                    }, {
                        conditions: Rw2,
                        rules: [{
                            conditions: [Lw2],
                            rules: [{
                                endpoint: {
                                    url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: JE,
                                    headers: JE
                                },
                                type: Mo
                            }],
                            type: JP
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: Lo
                        }],
                        type: JP
                    }, {
                        endpoint: {
                            url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}",
                            properties: JE,
                            headers: JE
                        },
                        type: Mo
                    }],
                    type: JP
                }],
                type: JP
            }, {
                error: "Invalid Configuration: Missing Region",
                type: Lo
            }]
        };
    kw2.ruleSet = Ic4
});
var bw2 = E((xw2) => {
    Object.defineProperty(xw2, "__esModule", {
        value: !0
    });
    xw2.defaultEndpointResolver = void 0;
    var Yc4 = Y51(),
        wG0 = R7(),
        Wc4 = _w2(),
        Jc4 = new wG0.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        Xc4 = (A, B = {}) => {
            return Jc4.get(A, () => wG0.resolveEndpoint(Wc4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    xw2.defaultEndpointResolver = Xc4;
    wG0.customEndpointFunctions.aws = Yc4.awsEndpointFunctions
});
var mw2 = E((gw2) => {
    Object.defineProperty(gw2, "__esModule", {
        value: !0
    });
    gw2.getRuntimeConfig = void 0;
    var Vc4 = bV(),
        Cc4 = HB(),
        Kc4 = P8(),
        Hc4 = JD(),
        fw2 = Hu(),
        hw2 = lB(),
        zc4 = zG0(),
        Ec4 = bw2(),
        Uc4 = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? fw2.fromBase64,
                base64Encoder: A?.base64Encoder ?? fw2.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? Ec4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? zc4.defaultSSOOIDCHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new Vc4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new Cc4.NoAuthSigner
                }],
                logger: A?.logger ?? new Kc4.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO OIDC",
                urlParser: A?.urlParser ?? Hc4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? hw2.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? hw2.toUtf8
            }
        };
    gw2.getRuntimeConfig = Uc4
});
var aw2 = E((iw2) => {
    Object.defineProperty(iw2, "__esModule", {
        value: !0
    });
    iw2.getRuntimeConfig = void 0;
    var wc4 = Zu(),
        $c4 = wc4.__importDefault(qD0()),
        dw2 = bV(),
        cw2 = sM1(),
        VR1 = z4(),
        qc4 = mG(),
        lw2 = u4(),
        $u = IZ(),
        pw2 = x3(),
        Nc4 = dG(),
        Lc4 = aD(),
        Mc4 = mw2(),
        Rc4 = P8(),
        Oc4 = cG(),
        Tc4 = P8(),
        Pc4 = (A) => {
            Tc4.emitWarningIfUnsupportedVersion(process.version);
            let B = Oc4.resolveDefaultsModeConfig(A),
                Q = () => B().then(Rc4.loadConfigsForDefaultMode),
                Z = Mc4.getRuntimeConfig(A);
            dw2.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? $u.loadConfig(dw2.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? Nc4.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? cw2.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: $c4.default.version
                }),
                maxAttempts: A?.maxAttempts ?? $u.loadConfig(lw2.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? $u.loadConfig(VR1.NODE_REGION_CONFIG_OPTIONS, {
                    ...VR1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: pw2.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? $u.loadConfig({
                    ...lw2.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || Lc4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? qc4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? pw2.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? $u.loadConfig(VR1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? $u.loadConfig(VR1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? $u.loadConfig(cw2.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    iw2.getRuntimeConfig = Pc4
});