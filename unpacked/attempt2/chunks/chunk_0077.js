/* chunk:77 bytes:[1779657, 1797830) size:18173 source:unpacked-cli.js */
var q7A = E((w7A) => {
    Object.defineProperty(w7A, "__esModule", {
        value: !0
    });
    w7A.ruleSet = void 0;
    var H7A = "required",
        Gz = "fn",
        Fz = "argv",
        Yi = "ref",
        G7A = !0,
        F7A = "isSet",
        g91 = "booleanEquals",
        Fi = "error",
        Ii = "endpoint",
        vO = "tree",
        ps1 = "PartitionResult",
        is1 = "getAttr",
        I7A = {
            [H7A]: !1,
            type: "String"
        },
        Y7A = {
            [H7A]: !0,
            default: !1,
            type: "Boolean"
        },
        W7A = {
            [Yi]: "Endpoint"
        },
        z7A = {
            [Gz]: g91,
            [Fz]: [{
                [Yi]: "UseFIPS"
            }, !0]
        },
        E7A = {
            [Gz]: g91,
            [Fz]: [{
                [Yi]: "UseDualStack"
            }, !0]
        },
        Dz = {},
        J7A = {
            [Gz]: is1,
            [Fz]: [{
                [Yi]: ps1
            }, "supportsFIPS"]
        },
        U7A = {
            [Yi]: ps1
        },
        X7A = {
            [Gz]: g91,
            [Fz]: [!0, {
                [Gz]: is1,
                [Fz]: [U7A, "supportsDualStack"]
            }]
        },
        V7A = [z7A],
        C7A = [E7A],
        K7A = [{
            [Yi]: "Region"
        }],
        H2Q = {
            version: "1.0",
            parameters: {
                Region: I7A,
                UseDualStack: Y7A,
                UseFIPS: Y7A,
                Endpoint: I7A
            },
            rules: [{
                conditions: [{
                    [Gz]: F7A,
                    [Fz]: [W7A]
                }],
                rules: [{
                    conditions: V7A,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: Fi
                }, {
                    conditions: C7A,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: Fi
                }, {
                    endpoint: {
                        url: W7A,
                        properties: Dz,
                        headers: Dz
                    },
                    type: Ii
                }],
                type: vO
            }, {
                conditions: [{
                    [Gz]: F7A,
                    [Fz]: K7A
                }],
                rules: [{
                    conditions: [{
                        [Gz]: "aws.partition",
                        [Fz]: K7A,
                        assign: ps1
                    }],
                    rules: [{
                        conditions: [z7A, E7A],
                        rules: [{
                            conditions: [{
                                [Gz]: g91,
                                [Fz]: [G7A, J7A]
                            }, X7A],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: Dz,
                                    headers: Dz
                                },
                                type: Ii
                            }],
                            type: vO
                        }, {
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: Fi
                        }],
                        type: vO
                    }, {
                        conditions: V7A,
                        rules: [{
                            conditions: [{
                                [Gz]: g91,
                                [Fz]: [J7A, G7A]
                            }],
                            rules: [{
                                conditions: [{
                                    [Gz]: "stringEquals",
                                    [Fz]: [{
                                        [Gz]: is1,
                                        [Fz]: [U7A, "name"]
                                    }, "aws-us-gov"]
                                }],
                                endpoint: {
                                    url: "https://portal.sso.{Region}.amazonaws.com",
                                    properties: Dz,
                                    headers: Dz
                                },
                                type: Ii
                            }, {
                                endpoint: {
                                    url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: Dz,
                                    headers: Dz
                                },
                                type: Ii
                            }],
                            type: vO
                        }, {
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: Fi
                        }],
                        type: vO
                    }, {
                        conditions: C7A,
                        rules: [{
                            conditions: [X7A],
                            rules: [{
                                endpoint: {
                                    url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: Dz,
                                    headers: Dz
                                },
                                type: Ii
                            }],
                            type: vO
                        }, {
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: Fi
                        }],
                        type: vO
                    }, {
                        endpoint: {
                            url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}",
                            properties: Dz,
                            headers: Dz
                        },
                        type: Ii
                    }],
                    type: vO
                }],
                type: vO
            }, {
                error: "Invalid Configuration: Missing Region",
                type: Fi
            }]
        };
    w7A.ruleSet = H2Q
});
var M7A = E((N7A) => {
    Object.defineProperty(N7A, "__esModule", {
        value: !0
    });
    N7A.defaultEndpointResolver = void 0;
    var z2Q = sp(),
        ns1 = R7(),
        E2Q = q7A(),
        U2Q = new ns1.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        w2Q = (A, B = {}) => {
            return U2Q.get(A, () => ns1.resolveEndpoint(E2Q.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    N7A.defaultEndpointResolver = w2Q;
    ns1.customEndpointFunctions.aws = z2Q.awsEndpointFunctions
});
var S7A = E((T7A) => {
    Object.defineProperty(T7A, "__esModule", {
        value: !0
    });
    T7A.getRuntimeConfig = void 0;
    var $2Q = YI(),
        q2Q = HB(),
        N2Q = V6(),
        L2Q = JD(),
        R7A = Nk(),
        O7A = lB(),
        M2Q = ms1(),
        R2Q = M7A(),
        O2Q = (A) => {
            return {
                apiVersion: "2019-06-10",
                base64Decoder: A?.base64Decoder ?? R7A.fromBase64,
                base64Encoder: A?.base64Encoder ?? R7A.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? R2Q.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? M2Q.defaultSSOHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new $2Q.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new q2Q.NoAuthSigner
                }],
                logger: A?.logger ?? new N2Q.NoOpLogger,
                serviceId: A?.serviceId ?? "SSO",
                urlParser: A?.urlParser ?? L2Q.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? O7A.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? O7A.toUtf8
            }
        };
    T7A.getRuntimeConfig = O2Q
});
var cG = E((lA5, v7A) => {
    var {
        create: T2Q,
        defineProperty: u91,
        getOwnPropertyDescriptor: P2Q,
        getOwnPropertyNames: S2Q,
        getPrototypeOf: j2Q
    } = Object, k2Q = Object.prototype.hasOwnProperty, as1 = (A, B) => u91(A, "name", {
        value: B,
        configurable: !0
    }), y2Q = (A, B) => {
        for (var Q in B) u91(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, _7A = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of S2Q(B))
                if (!k2Q.call(A, D) && D !== Q) u91(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = P2Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, _2Q = (A, B, Q) => (Q = A != null ? T2Q(j2Q(A)) : {}, _7A(B || !A || !A.__esModule ? u91(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), x2Q = (A) => _7A(u91({}, "__esModule", {
        value: !0
    }), A), x7A = {};
    y2Q(x7A, {
        resolveDefaultsModeConfig: () => l2Q
    });
    v7A.exports = x2Q(x7A);
    var v2Q = z4(),
        j7A = IZ(),
        b2Q = A9(),
        f2Q = "AWS_EXECUTION_ENV",
        k7A = "AWS_REGION",
        y7A = "AWS_DEFAULT_REGION",
        h2Q = "AWS_EC2_METADATA_DISABLED",
        g2Q = ["in-region", "cross-region", "mobile", "standard", "legacy"],
        u2Q = "/latest/meta-data/placement/region",
        m2Q = "AWS_DEFAULTS_MODE",
        d2Q = "defaults_mode",
        c2Q = {
            environmentVariableSelector: (A) => {
                return A[m2Q]
            },
            configFileSelector: (A) => {
                return A[d2Q]
            },
            default: "legacy"
        },
        l2Q = as1(({
            region: A = j7A.loadConfig(v2Q.NODE_REGION_CONFIG_OPTIONS),
            defaultsMode: B = j7A.loadConfig(c2Q)
        } = {}) => b2Q.memoize(async () => {
            let Q = typeof B === "function" ? await B() : B;
            switch (Q?.toLowerCase()) {
                case "auto":
                    return p2Q(A);
                case "in-region":
                case "cross-region":
                case "mobile":
                case "standard":
                case "legacy":
                    return Promise.resolve(Q?.toLocaleLowerCase());
                case void 0:
                    return Promise.resolve("legacy");
                default:
                    throw new Error(`Invalid parameter for "defaultsMode", expect ${g2Q.join(", ")}, got ${Q}`)
            }
        }), "resolveDefaultsModeConfig"),
        p2Q = as1(async (A) => {
            if (A) {
                let B = typeof A === "function" ? await A() : A,
                    Q = await i2Q();
                if (!Q) return "standard";
                if (B === Q) return "in-region";
                else return "cross-region"
            }
            return "standard"
        }, "resolveNodeDefaultsModeAuto"),
        i2Q = as1(async () => {
            if (process.env[f2Q] && (process.env[k7A] || process.env[y7A])) return process.env[k7A] ?? process.env[y7A];
            if (!process.env[h2Q]) try {
                let {
                    getInstanceMetadataEndpoint: A,
                    httpRequest: B
                } = await Promise.resolve().then(() => _2Q(TF())), Q = await A();
                return (await B({
                    ...Q,
                    path: u2Q
                })).toString()
            } catch (A) {}
        }, "inferPhysicalRegion")
});
var d7A = E((u7A) => {
    Object.defineProperty(u7A, "__esModule", {
        value: !0
    });
    u7A.getRuntimeConfig = void 0;
    var n2Q = wh(),
        a2Q = n2Q.__importDefault(l3A()),
        b7A = YI(),
        f7A = h91(),
        LH1 = z4(),
        s2Q = mG(),
        h7A = u4(),
        Ph = IZ(),
        g7A = x3(),
        r2Q = dG(),
        o2Q = aD(),
        t2Q = S7A(),
        e2Q = V6(),
        ABQ = cG(),
        BBQ = V6(),
        QBQ = (A) => {
            BBQ.emitWarningIfUnsupportedVersion(process.version);
            let B = ABQ.resolveDefaultsModeConfig(A),
                Q = () => B().then(e2Q.loadConfigsForDefaultMode),
                Z = t2Q.getRuntimeConfig(A);
            b7A.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? Ph.loadConfig(b7A.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? r2Q.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? f7A.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: a2Q.default.version
                }),
                maxAttempts: A?.maxAttempts ?? Ph.loadConfig(h7A.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? Ph.loadConfig(LH1.NODE_REGION_CONFIG_OPTIONS, {
                    ...LH1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: g7A.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? Ph.loadConfig({
                    ...h7A.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || o2Q.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? s2Q.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? g7A.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? Ph.loadConfig(LH1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? Ph.loadConfig(LH1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? Ph.loadConfig(f7A.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    u7A.getRuntimeConfig = QBQ
});
var m91 = E((iA5, a7A) => {
    var {
        defineProperty: MH1,
        getOwnPropertyDescriptor: ZBQ,
        getOwnPropertyNames: DBQ
    } = Object, GBQ = Object.prototype.hasOwnProperty, MN = (A, B) => MH1(A, "name", {
        value: B,
        configurable: !0
    }), FBQ = (A, B) => {
        for (var Q in B) MH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, IBQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of DBQ(B))
                if (!GBQ.call(A, D) && D !== Q) MH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ZBQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, YBQ = (A) => IBQ(MH1({}, "__esModule", {
        value: !0
    }), A), l7A = {};
    FBQ(l7A, {
        NODE_REGION_CONFIG_FILE_OPTIONS: () => VBQ,
        NODE_REGION_CONFIG_OPTIONS: () => XBQ,
        REGION_ENV_NAME: () => p7A,
        REGION_INI_NAME: () => i7A,
        getAwsRegionExtensionConfiguration: () => WBQ,
        resolveAwsRegionExtensionConfiguration: () => JBQ,
        resolveRegionConfig: () => CBQ
    });
    a7A.exports = YBQ(l7A);
    var WBQ = MN((A) => {
            return {
                setRegion(B) {
                    A.region = B
                },
                region() {
                    return A.region
                }
            }
        }, "getAwsRegionExtensionConfiguration"),
        JBQ = MN((A) => {
            return {
                region: A.region()
            }
        }, "resolveAwsRegionExtensionConfiguration"),
        p7A = "AWS_REGION",
        i7A = "region",
        XBQ = {
            environmentVariableSelector: MN((A) => A[p7A], "environmentVariableSelector"),
            configFileSelector: MN((A) => A[i7A], "configFileSelector"),
            default: MN(() => {
                throw new Error("Region is missing")
            }, "default")
        },
        VBQ = {
            preferredFile: "credentials"
        },
        n7A = MN((A) => typeof A === "string" && (A.startsWith("fips-") || A.endsWith("-fips")), "isFipsRegion"),
        c7A = MN((A) => n7A(A) ? ["fips-aws-global", "aws-fips"].includes(A) ? "us-east-1" : A.replace(/fips-(dkr-|prod-)?|-fips/, "") : A, "getRealRegion"),
        CBQ = MN((A) => {
            let {
                region: B,
                useFipsEndpoint: Q
            } = A;
            if (!B) throw new Error("Region is missing");
            return Object.assign(A, {
                region: MN(async () => {
                    if (typeof B === "string") return c7A(B);
                    let Z = await B();
                    return c7A(Z)
                }, "region"),
                useFipsEndpoint: MN(async () => {
                    let Z = typeof B === "string" ? B : await B();
                    if (n7A(Z)) return !0;
                    return typeof Q !== "function" ? Promise.resolve(!!Q) : Q()
                }, "useFipsEndpoint")
            })
        }, "resolveRegionConfig")
});