/* chunk:243 bytes:[5230929, 5250501) size:19572 source:unpacked-cli.js */
var y52 = E((Aq5, k52) => {
    var {
        create: xU4,
        defineProperty: b81,
        getOwnPropertyDescriptor: vU4,
        getOwnPropertyNames: bU4,
        getPrototypeOf: fU4
    } = Object, hU4 = Object.prototype.hasOwnProperty, BL1 = (A, B) => b81(A, "name", {
        value: B,
        configurable: !0
    }), gU4 = (A, B) => {
        for (var Q in B) b81(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, T52 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of bU4(B))
                if (!hU4.call(A, D) && D !== Q) b81(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = vU4(B, D)) || Z.enumerable
                })
        }
        return A
    }, $r = (A, B, Q) => (Q = A != null ? xU4(fU4(A)) : {}, T52(B || !A || !A.__esModule ? b81(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), uU4 = (A) => T52(b81({}, "__esModule", {
        value: !0
    }), A), P52 = {};
    gU4(P52, {
        credentialsTreatedAsExpired: () => j52,
        credentialsWillNeedRefresh: () => S52,
        defaultProvider: () => cU4
    });
    k52.exports = uU4(P52);
    var q50 = Q80(),
        mU4 = I3(),
        Au = A9(),
        R52 = "AWS_EC2_METADATA_DISABLED",
        dU4 = BL1(async (A) => {
            let {
                ENV_CMDS_FULL_URI: B,
                ENV_CMDS_RELATIVE_URI: Q,
                fromContainerMetadata: Z,
                fromInstanceMetadata: D
            } = await Promise.resolve().then(() => $r(TF()));
            if (process.env[Q] || process.env[B]) {
                A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
                let {
                    fromHttp: G
                } = await Promise.resolve().then(() => $r(G80()));
                return Au.chain(G(A), Z(A))
            }
            if (process.env[R52] && process.env[R52] !== "false") return async () => {
                throw new Au.CredentialsProviderError("EC2 Instance Metadata Service access disabled", {
                    logger: A.logger
                })
            };
            return A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata"), D(A)
        }, "remoteProvider"),
        O52 = !1,
        cU4 = BL1((A = {}) => Au.memoize(Au.chain(async () => {
            if (A.profile ?? process.env[mU4.ENV_PROFILE]) {
                if (process.env[q50.ENV_KEY] && process.env[q50.ENV_SECRET]) {
                    if (!O52)(A.logger?.warn && A.logger?.constructor?.name !== "NoOpLogger" ? A.logger.warn : console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`), O52 = !0
                }
                throw new Au.CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.", {
                    logger: A.logger,
                    tryNextLink: !0
                })
            }
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv"), q50.fromEnv(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
            let {
                ssoStartUrl: B,
                ssoAccountId: Q,
                ssoRegion: Z,
                ssoRoleName: D,
                ssoSession: G
            } = A;
            if (!B && !Q && !Z && !D && !G) throw new Au.CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).", {
                logger: A.logger
            });
            let {
                fromSSO: F
            } = await Promise.resolve().then(() => $r(R80()));
            return F(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
            let {
                fromIni: B
            } = await Promise.resolve().then(() => $r(M52()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
            let {
                fromProcess: B
            } = await Promise.resolve().then(() => $r(K50()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
            let {
                fromTokenFile: B
            } = await Promise.resolve().then(() => $r(U50()));
            return B(A)()
        }, async () => {
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider"), (await dU4(A))()
        }, async () => {
            throw new Au.CredentialsProviderError("Could not load credentials from any providers", {
                tryNextLink: !1,
                logger: A.logger
            })
        }), j52, S52), "defaultProvider"),
        S52 = BL1((A) => A?.expiration !== void 0, "credentialsWillNeedRefresh"),
        j52 = BL1((A) => A?.expiration !== void 0 && A.expiration.getTime() - Date.now() < 300000, "credentialsTreatedAsExpired")
});
var Q32 = E((A32) => {
    Object.defineProperty(A32, "__esModule", {
        value: !0
    });
    A32.ruleSet = void 0;
    var l52 = "required",
        q4 = "type",
        e8 = "fn",
        A5 = "argv",
        H_ = "ref",
        _52 = !1,
        N50 = !0,
        K_ = "booleanEquals",
        uY = "stringEquals",
        p52 = "sigv4",
        i52 = "sts",
        n52 = "us-east-1",
        wZ = "endpoint",
        x52 = "https://sts.{Region}.{PartitionResult#dnsSuffix}",
        TL = "tree",
        qr = "error",
        M50 = "getAttr",
        v52 = {
            [l52]: !1,
            [q4]: "String"
        },
        L50 = {
            [l52]: !0,
            default: !1,
            [q4]: "Boolean"
        },
        a52 = {
            [H_]: "Endpoint"
        },
        b52 = {
            [e8]: "isSet",
            [A5]: [{
                [H_]: "Region"
            }]
        },
        mY = {
            [H_]: "Region"
        },
        f52 = {
            [e8]: "aws.partition",
            [A5]: [mY],
            assign: "PartitionResult"
        },
        s52 = {
            [H_]: "UseFIPS"
        },
        r52 = {
            [H_]: "UseDualStack"
        },
        eW = {
            url: "https://sts.amazonaws.com",
            properties: {
                authSchemes: [{
                    name: p52,
                    signingName: i52,
                    signingRegion: n52
                }]
            },
            headers: {}
        },
        LK = {},
        h52 = {
            conditions: [{
                [e8]: uY,
                [A5]: [mY, "aws-global"]
            }],
            [wZ]: eW,
            [q4]: wZ
        },
        o52 = {
            [e8]: K_,
            [A5]: [s52, !0]
        },
        t52 = {
            [e8]: K_,
            [A5]: [r52, !0]
        },
        g52 = {
            [e8]: M50,
            [A5]: [{
                [H_]: "PartitionResult"
            }, "supportsFIPS"]
        },
        e52 = {
            [H_]: "PartitionResult"
        },
        u52 = {
            [e8]: K_,
            [A5]: [!0, {
                [e8]: M50,
                [A5]: [e52, "supportsDualStack"]
            }]
        },
        m52 = [{
            [e8]: "isSet",
            [A5]: [a52]
        }],
        d52 = [o52],
        c52 = [t52],
        lU4 = {
            version: "1.0",
            parameters: {
                Region: v52,
                UseDualStack: L50,
                UseFIPS: L50,
                Endpoint: v52,
                UseGlobalEndpoint: L50
            },
            rules: [{
                conditions: [{
                    [e8]: K_,
                    [A5]: [{
                        [H_]: "UseGlobalEndpoint"
                    }, N50]
                }, {
                    [e8]: "not",
                    [A5]: m52
                }, b52, f52, {
                    [e8]: K_,
                    [A5]: [s52, _52]
                }, {
                    [e8]: K_,
                    [A5]: [r52, _52]
                }],
                rules: [{
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "ap-northeast-1"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "ap-south-1"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "ap-southeast-1"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "ap-southeast-2"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, h52, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "ca-central-1"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "eu-central-1"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "eu-north-1"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "eu-west-1"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "eu-west-2"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "eu-west-3"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "sa-east-1"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, n52]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "us-east-2"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "us-west-1"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    conditions: [{
                        [e8]: uY,
                        [A5]: [mY, "us-west-2"]
                    }],
                    endpoint: eW,
                    [q4]: wZ
                }, {
                    endpoint: {
                        url: x52,
                        properties: {
                            authSchemes: [{
                                name: p52,
                                signingName: i52,
                                signingRegion: "{Region}"
                            }]
                        },
                        headers: LK
                    },
                    [q4]: wZ
                }],
                [q4]: TL
            }, {
                conditions: m52,
                rules: [{
                    conditions: d52,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    [q4]: qr
                }, {
                    conditions: c52,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    [q4]: qr
                }, {
                    endpoint: {
                        url: a52,
                        properties: LK,
                        headers: LK
                    },
                    [q4]: wZ
                }],
                [q4]: TL
            }, {
                conditions: [b52],
                rules: [{
                    conditions: [f52],
                    rules: [{
                        conditions: [o52, t52],
                        rules: [{
                            conditions: [{
                                [e8]: K_,
                                [A5]: [N50, g52]
                            }, u52],
                            rules: [{
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: LK,
                                    headers: LK
                                },
                                [q4]: wZ
                            }],
                            [q4]: TL
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            [q4]: qr
                        }],
                        [q4]: TL
                    }, {
                        conditions: d52,
                        rules: [{
                            conditions: [{
                                [e8]: K_,
                                [A5]: [g52, N50]
                            }],
                            rules: [{
                                conditions: [{
                                    [e8]: uY,
                                    [A5]: [{
                                        [e8]: M50,
                                        [A5]: [e52, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://sts.{Region}.amazonaws.com",
                                    properties: LK,
                                    headers: LK
                                },
                                [q4]: wZ
                            }, {
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: LK,
                                    headers: LK
                                },
                                [q4]: wZ
                            }],
                            [q4]: TL
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            [q4]: qr
                        }],
                        [q4]: TL
                    }, {
                        conditions: c52,
                        rules: [{
                            conditions: [u52],
                            rules: [{
                                endpoint: {
                                    url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: LK,
                                    headers: LK
                                },
                                [q4]: wZ
                            }],
                            [q4]: TL
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            [q4]: qr
                        }],
                        [q4]: TL
                    }, h52, {
                        endpoint: {
                            url: x52,
                            properties: LK,
                            headers: LK
                        },
                        [q4]: wZ
                    }],
                    [q4]: TL
                }],
                [q4]: TL
            }, {
                error: "Invalid Configuration: Missing Region",
                [q4]: qr
            }]
        };
    A32.ruleSet = lU4
});
var G32 = E((Z32) => {
    Object.defineProperty(Z32, "__esModule", {
        value: !0
    });
    Z32.defaultEndpointResolver = void 0;
    var pU4 = rs(),
        R50 = R7(),
        iU4 = Q32(),
        nU4 = new R50.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
        }),
        aU4 = (A, B = {}) => {
            return nU4.get(A, () => R50.resolveEndpoint(iU4.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    Z32.defaultEndpointResolver = aU4;
    R50.customEndpointFunctions.aws = pU4.awsEndpointFunctions
});
var J32 = E((Y32) => {
    Object.defineProperty(Y32, "__esModule", {
        value: !0
    });
    Y32.getRuntimeConfig = void 0;
    var sU4 = HI(),
        rU4 = HB(),
        oU4 = d4(),
        tU4 = JD(),
        F32 = I_(),
        I32 = lB(),
        eU4 = B80(),
        Aw4 = G32(),
        Bw4 = (A) => {
            return {
                apiVersion: "2011-06-15",
                base64Decoder: A?.base64Decoder ?? F32.fromBase64,
                base64Encoder: A?.base64Encoder ?? F32.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? Aw4.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? eU4.defaultSTSHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new sU4.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new rU4.NoAuthSigner
                }],
                logger: A?.logger ?? new oU4.NoOpLogger,
                serviceId: A?.serviceId ?? "STS",
                urlParser: A?.urlParser ?? tU4.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? I32.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? I32.toUtf8
            }
        };
    Y32.getRuntimeConfig = Bw4
});