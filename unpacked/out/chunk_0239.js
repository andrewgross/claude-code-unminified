/* chunk:239 bytes:[5161706, 5180849) size:19143 source:unpacked-cli.js */
var A82 = E((t62) => {
    Object.defineProperty(t62, "__esModule", {
        value: !0
    });
    t62.ruleSet = void 0;
    var d62 = "required",
        $4 = "type",
        o8 = "fn",
        t8 = "argv",
        X_ = "ref",
        k62 = !1,
        P80 = !0,
        J_ = "booleanEquals",
        hY = "stringEquals",
        c62 = "sigv4",
        l62 = "sts",
        p62 = "us-east-1",
        UZ = "endpoint",
        y62 = "https://sts.{Region}.{PartitionResult#dnsSuffix}",
        RL = "tree",
        Xr = "error",
        j80 = "getAttr",
        _62 = {
            [d62]: !1,
            [$4]: "String"
        },
        S80 = {
            [d62]: !0,
            default: !1,
            [$4]: "Boolean"
        },
        i62 = {
            [X_]: "Endpoint"
        },
        x62 = {
            [o8]: "isSet",
            [t8]: [{
                [X_]: "Region"
            }]
        },
        gY = {
            [X_]: "Region"
        },
        v62 = {
            [o8]: "aws.partition",
            [t8]: [gY],
            assign: "PartitionResult"
        },
        n62 = {
            [X_]: "UseFIPS"
        },
        a62 = {
            [X_]: "UseDualStack"
        },
        tW = {
            url: "https://sts.amazonaws.com",
            properties: {
                authSchemes: [{
                    name: c62,
                    signingName: l62,
                    signingRegion: p62
                }]
            },
            headers: {}
        },
        NK = {},
        b62 = {
            conditions: [{
                [o8]: hY,
                [t8]: [gY, "aws-global"]
            }],
            [UZ]: tW,
            [$4]: UZ
        },
        s62 = {
            [o8]: J_,
            [t8]: [n62, !0]
        },
        r62 = {
            [o8]: J_,
            [t8]: [a62, !0]
        },
        f62 = {
            [o8]: j80,
            [t8]: [{
                [X_]: "PartitionResult"
            }, "supportsFIPS"]
        },
        o62 = {
            [X_]: "PartitionResult"
        },
        h62 = {
            [o8]: J_,
            [t8]: [!0, {
                [o8]: j80,
                [t8]: [o62, "supportsDualStack"]
            }]
        },
        g62 = [{
            [o8]: "isSet",
            [t8]: [i62]
        }],
        u62 = [s62],
        m62 = [r62],
        Fz4 = {
            version: "1.0",
            parameters: {
                Region: _62,
                UseDualStack: S80,
                UseFIPS: S80,
                Endpoint: _62,
                UseGlobalEndpoint: S80
            },
            rules: [{
                conditions: [{
                    [o8]: J_,
                    [t8]: [{
                        [X_]: "UseGlobalEndpoint"
                    }, P80]
                }, {
                    [o8]: "not",
                    [t8]: g62
                }, x62, v62, {
                    [o8]: J_,
                    [t8]: [n62, k62]
                }, {
                    [o8]: J_,
                    [t8]: [a62, k62]
                }],
                rules: [{
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "ap-northeast-1"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "ap-south-1"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "ap-southeast-1"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "ap-southeast-2"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, b62, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "ca-central-1"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "eu-central-1"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "eu-north-1"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "eu-west-1"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "eu-west-2"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "eu-west-3"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "sa-east-1"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, p62]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "us-east-2"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "us-west-1"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    conditions: [{
                        [o8]: hY,
                        [t8]: [gY, "us-west-2"]
                    }],
                    endpoint: tW,
                    [$4]: UZ
                }, {
                    endpoint: {
                        url: y62,
                        properties: {
                            authSchemes: [{
                                name: c62,
                                signingName: l62,
                                signingRegion: "{Region}"
                            }]
                        },
                        headers: NK
                    },
                    [$4]: UZ
                }],
                [$4]: RL
            }, {
                conditions: g62,
                rules: [{
                    conditions: u62,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    [$4]: Xr
                }, {
                    conditions: m62,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    [$4]: Xr
                }, {
                    endpoint: {
                        url: i62,
                        properties: NK,
                        headers: NK
                    },
                    [$4]: UZ
                }],
                [$4]: RL
            }, {
                conditions: [x62],
                rules: [{
                    conditions: [v62],
                    rules: [{
                        conditions: [s62, r62],
                        rules: [{
                            conditions: [{
                                [o8]: J_,
                                [t8]: [P80, f62]
                            }, h62],
                            rules: [{
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: NK,
                                    headers: NK
                                },
                                [$4]: UZ
                            }],
                            [$4]: RL
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            [$4]: Xr
                        }],
                        [$4]: RL
                    }, {
                        conditions: u62,
                        rules: [{
                            conditions: [{
                                [o8]: J_,
                                [t8]: [f62, P80]
                            }],
                            rules: [{
                                conditions: [{
                                    [o8]: hY,
                                    [t8]: [{
                                        [o8]: j80,
                                        [t8]: [o62, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://sts.{Region}.amazonaws.com",
                                    properties: NK,
                                    headers: NK
                                },
                                [$4]: UZ
                            }, {
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: NK,
                                    headers: NK
                                },
                                [$4]: UZ
                            }],
                            [$4]: RL
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            [$4]: Xr
                        }],
                        [$4]: RL
                    }, {
                        conditions: m62,
                        rules: [{
                            conditions: [h62],
                            rules: [{
                                endpoint: {
                                    url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: NK,
                                    headers: NK
                                },
                                [$4]: UZ
                            }],
                            [$4]: RL
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            [$4]: Xr
                        }],
                        [$4]: RL
                    }, b62, {
                        endpoint: {
                            url: y62,
                            properties: NK,
                            headers: NK
                        },
                        [$4]: UZ
                    }],
                    [$4]: RL
                }],
                [$4]: RL
            }, {
                error: "Invalid Configuration: Missing Region",
                [$4]: Xr
            }]
        };
    t62.ruleSet = Fz4
});
var Z82 = E((B82) => {
    Object.defineProperty(B82, "__esModule", {
        value: !0
    });
    B82.defaultEndpointResolver = void 0;
    var Iz4 = rs(),
        k80 = R7(),
        Yz4 = A82(),
        Wz4 = new k80.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
        }),
        Jz4 = (A, B = {}) => {
            return Wz4.get(A, () => k80.resolveEndpoint(Yz4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    B82.defaultEndpointResolver = Jz4;
    k80.customEndpointFunctions.aws = Iz4.awsEndpointFunctions
});
var Y82 = E((F82) => {
    Object.defineProperty(F82, "__esModule", {
        value: !0
    });
    F82.getRuntimeConfig = void 0;
    var Xz4 = HI(),
        Vz4 = HB(),
        Cz4 = d4(),
        Kz4 = JD(),
        D82 = I_(),
        G82 = lB(),
        Hz4 = T80(),
        zz4 = Z82(),
        Ez4 = (A) => {
            return {
                apiVersion: "2011-06-15",
                base64Decoder: A?.base64Decoder ?? D82.fromBase64,
                base64Encoder: A?.base64Encoder ?? D82.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? zz4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? Hz4.defaultSTSHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new Xz4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new Vz4.NoAuthSigner
                }],
                logger: A?.logger ?? new Cz4.NoOpLogger,
                serviceId: A?.serviceId ?? "STS",
                urlParser: A?.urlParser ?? Kz4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? G82.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? G82.toUtf8
            }
        };
    F82.getRuntimeConfig = Ez4
});
var K82 = E((V82) => {
    Object.defineProperty(V82, "__esModule", {
        value: !0
    });
    V82.getRuntimeConfig = void 0;
    var Uz4 = ig(),
        wz4 = Uz4.__importDefault(z80()),
        y80 = HI(),
        W82 = L81(),
        oN1 = z4(),
        $z4 = HB(),
        qz4 = mG(),
        J82 = u4(),
        eg = IZ(),
        X82 = x3(),
        Nz4 = dG(),
        Lz4 = aD(),
        Mz4 = Y82(),
        Rz4 = d4(),
        Oz4 = cG(),
        Tz4 = d4(),
        Pz4 = (A) => {
            Tz4.emitWarningIfUnsupportedVersion(process.version);
            let B = Oz4.resolveDefaultsModeConfig(A),
                Q = () => B().then(Rz4.loadConfigsForDefaultMode),
                Z = Mz4.getRuntimeConfig(A);
            y80.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? eg.loadConfig(y80.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? Nz4.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? W82.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: wz4.default.version
                }),
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (G) => G.getIdentityProvider("aws.auth#sigv4") || (async (F) => await A.credentialDefaultProvider(F?.__config || {})()),
                    signer: new y80.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (G) => G.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new $z4.NoAuthSigner
                }],
                maxAttempts: A?.maxAttempts ?? eg.loadConfig(J82.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? eg.loadConfig(oN1.NODE_REGION_CONFIG_OPTIONS, {
                    ...oN1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: X82.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? eg.loadConfig({
                    ...J82.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || Lz4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? qz4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? X82.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? eg.loadConfig(oN1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? eg.loadConfig(oN1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? eg.loadConfig(W82.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    V82.getRuntimeConfig = Pz4
});
var E82 = E((H82) => {
    Object.defineProperty(H82, "__esModule", {
        value: !0
    });
    H82.resolveHttpAuthRuntimeConfig = H82.getHttpAuthExtensionConfiguration = void 0;
    var Sz4 = (A) => {
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
    H82.getHttpAuthExtensionConfiguration = Sz4;
    var jz4 = (A) => {
        return {
            httpAuthSchemes: A.httpAuthSchemes(),
            httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
            credentials: A.credentials()
        }
    };
    H82.resolveHttpAuthRuntimeConfig = jz4
});
var M82 = E((N82) => {
    Object.defineProperty(N82, "__esModule", {
        value: !0
    });
    N82.resolveRuntimeExtensions = void 0;
    var U82 = R81(),
        w82 = QX(),
        $82 = d4(),
        q82 = E82(),
        yz4 = (A, B) => {
            let Q = Object.assign(U82.getAwsRegionExtensionConfiguration(A), $82.getDefaultExtensionConfiguration(A), w82.getHttpHandlerExtensionConfiguration(A), q82.getHttpAuthExtensionConfiguration(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, U82.resolveAwsRegionExtensionConfiguration(Q), $82.resolveDefaultRuntimeConfig(Q), w82.resolveHttpHandlerRuntimeConfig(Q), q82.resolveHttpAuthRuntimeConfig(Q))
        };
    N82.resolveRuntimeExtensions = yz4
});