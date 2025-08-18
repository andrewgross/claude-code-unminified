/* chunk:75 bytes:[1743873, 1761931) size:18058 source:unpacked-cli.js */
var ks1 = E((PA5, H3A) => {
    var {
        defineProperty: KH1,
        getOwnPropertyDescriptor: H0Q,
        getOwnPropertyNames: z0Q
    } = Object, E0Q = Object.prototype.hasOwnProperty, U0Q = (A, B) => KH1(A, "name", {
        value: B,
        configurable: !0
    }), w0Q = (A, B) => {
        for (var Q in B) KH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, $0Q = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of z0Q(B))
                if (!E0Q.call(A, D) && D !== Q) KH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = H0Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, q0Q = (A) => $0Q(KH1({}, "__esModule", {
        value: !0
    }), A), Y3A = {};
    w0Q(Y3A, {
        ENV_ACCOUNT_ID: () => K3A,
        ENV_CREDENTIAL_SCOPE: () => C3A,
        ENV_EXPIRATION: () => V3A,
        ENV_KEY: () => W3A,
        ENV_SECRET: () => J3A,
        ENV_SESSION: () => X3A,
        fromEnv: () => M0Q
    });
    H3A.exports = q0Q(Y3A);
    var N0Q = Xw(),
        L0Q = A9(),
        W3A = "AWS_ACCESS_KEY_ID",
        J3A = "AWS_SECRET_ACCESS_KEY",
        X3A = "AWS_SESSION_TOKEN",
        V3A = "AWS_CREDENTIAL_EXPIRATION",
        C3A = "AWS_CREDENTIAL_SCOPE",
        K3A = "AWS_ACCOUNT_ID",
        M0Q = U0Q((A) => async () => {
            A?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
            let B = process.env[W3A],
                Q = process.env[J3A],
                Z = process.env[X3A],
                D = process.env[V3A],
                G = process.env[C3A],
                F = process.env[K3A];
            if (B && Q) {
                let I = {
                    accessKeyId: B,
                    secretAccessKey: Q,
                    ...Z && {
                        sessionToken: Z
                    },
                    ...D && {
                        expiration: new Date(D)
                    },
                    ...G && {
                        credentialScope: G
                    },
                    ...F && {
                        accountId: F
                    }
                };
                return N0Q.setCredentialFeature(I, "CREDENTIALS_ENV_VARS", "g"), I
            }
            throw new L0Q.CredentialsProviderError("Unable to find environment variable credentials.", {
                logger: A?.logger
            })
        }, "fromEnv")
});
var TF = E((SA5, P3A) => {
    var {
        defineProperty: EH1,
        getOwnPropertyDescriptor: R0Q,
        getOwnPropertyNames: O0Q
    } = Object, T0Q = Object.prototype.hasOwnProperty, uG = (A, B) => EH1(A, "name", {
        value: B,
        configurable: !0
    }), P0Q = (A, B) => {
        for (var Q in B) EH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, S0Q = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of O0Q(B))
                if (!T0Q.call(A, D) && D !== Q) EH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = R0Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, j0Q = (A) => S0Q(EH1({}, "__esModule", {
        value: !0
    }), A), w3A = {};
    P0Q(w3A, {
        DEFAULT_MAX_RETRIES: () => L3A,
        DEFAULT_TIMEOUT: () => N3A,
        ENV_CMDS_AUTH_TOKEN: () => xs1,
        ENV_CMDS_FULL_URI: () => HH1,
        ENV_CMDS_RELATIVE_URI: () => zH1,
        Endpoint: () => M3A,
        fromContainerMetadata: () => x0Q,
        fromInstanceMetadata: () => BAQ,
        getInstanceMetadataEndpoint: () => O3A,
        httpRequest: () => Gi,
        providerConfigFromInit: () => vs1
    });
    P3A.exports = j0Q(w3A);
    var k0Q = W1("url"),
        LN = A9(),
        y0Q = W1("buffer"),
        _0Q = W1("http");

    function Gi(A) {
        return new Promise((B, Q) => {
            let Z = _0Q.request({
                method: "GET",
                ...A,
                hostname: A.hostname?.replace(/^\[(.+)\]$/, "$1")
            });
            Z.on("error", (D) => {
                Q(Object.assign(new LN.ProviderError("Unable to connect to instance metadata service"), D)), Z.destroy()
            }), Z.on("timeout", () => {
                Q(new LN.ProviderError("TimeoutError from instance metadata service")), Z.destroy()
            }), Z.on("response", (D) => {
                let {
                    statusCode: G = 400
                } = D;
                if (G < 200 || 300 <= G) Q(Object.assign(new LN.ProviderError("Error response received from instance metadata service"), {
                    statusCode: G
                })), Z.destroy();
                let F = [];
                D.on("data", (I) => {
                    F.push(I)
                }), D.on("end", () => {
                    B(y0Q.Buffer.concat(F)), Z.destroy()
                })
            }), Z.end()
        })
    }
    uG(Gi, "httpRequest");
    var $3A = uG((A) => Boolean(A) && typeof A === "object" && typeof A.AccessKeyId === "string" && typeof A.SecretAccessKey === "string" && typeof A.Token === "string" && typeof A.Expiration === "string", "isImdsCredentials"),
        q3A = uG((A) => ({
            accessKeyId: A.AccessKeyId,
            secretAccessKey: A.SecretAccessKey,
            sessionToken: A.Token,
            expiration: new Date(A.Expiration),
            ...A.AccountId && {
                accountId: A.AccountId
            }
        }), "fromImdsCredentials"),
        N3A = 1000,
        L3A = 0,
        vs1 = uG(({
            maxRetries: A = L3A,
            timeout: B = N3A
        }) => ({
            maxRetries: A,
            timeout: B
        }), "providerConfigFromInit"),
        _s1 = uG((A, B) => {
            let Q = A();
            for (let Z = 0; Z < B; Z++) Q = Q.catch(A);
            return Q
        }, "retry"),
        HH1 = "AWS_CONTAINER_CREDENTIALS_FULL_URI",
        zH1 = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
        xs1 = "AWS_CONTAINER_AUTHORIZATION_TOKEN",
        x0Q = uG((A = {}) => {
            let {
                timeout: B,
                maxRetries: Q
            } = vs1(A);
            return () => _s1(async () => {
                let Z = await g0Q({
                        logger: A.logger
                    }),
                    D = JSON.parse(await v0Q(B, Z));
                if (!$3A(D)) throw new LN.CredentialsProviderError("Invalid response received from instance metadata service.", {
                    logger: A.logger
                });
                return q3A(D)
            }, Q)
        }, "fromContainerMetadata"),
        v0Q = uG(async (A, B) => {
            if (process.env[xs1]) B.headers = {
                ...B.headers,
                Authorization: process.env[xs1]
            };
            return (await Gi({
                ...B,
                timeout: A
            })).toString()
        }, "requestFromEcsImds"),
        b0Q = "169.254.170.2",
        f0Q = {
            localhost: !0,
            "127.0.0.1": !0
        },
        h0Q = {
            "http:": !0,
            "https:": !0
        },
        g0Q = uG(async ({
            logger: A
        }) => {
            if (process.env[zH1]) return {
                hostname: b0Q,
                path: process.env[zH1]
            };
            if (process.env[HH1]) {
                let B = k0Q.parse(process.env[HH1]);
                if (!B.hostname || !(B.hostname in f0Q)) throw new LN.CredentialsProviderError(`${B.hostname} is not a valid container metadata service hostname`, {
                    tryNextLink: !1,
                    logger: A
                });
                if (!B.protocol || !(B.protocol in h0Q)) throw new LN.CredentialsProviderError(`${B.protocol} is not a valid container metadata service protocol`, {
                    tryNextLink: !1,
                    logger: A
                });
                return {
                    ...B,
                    port: B.port ? parseInt(B.port, 10) : void 0
                }
            }
            throw new LN.CredentialsProviderError(`The container metadata credential provider cannot be used unless the ${zH1} or ${HH1} environment variable is set`, {
                tryNextLink: !1,
                logger: A
            })
        }, "getCmdsUri"),
        u0Q = class A extends LN.CredentialsProviderError {
            constructor(B, Q = !0) {
                super(B, Q);
                this.tryNextLink = Q, this.name = "InstanceMetadataV1FallbackError", Object.setPrototypeOf(this, A.prototype)
            }
            static {
                uG(this, "InstanceMetadataV1FallbackError")
            }
        },
        bs1 = IZ(),
        m0Q = JD(),
        M3A = ((A) => {
            return A.IPv4 = "http://169.254.169.254", A.IPv6 = "http://[fd00:ec2::254]", A
        })(M3A || {}),
        d0Q = "AWS_EC2_METADATA_SERVICE_ENDPOINT",
        c0Q = "ec2_metadata_service_endpoint",
        l0Q = {
            environmentVariableSelector: (A) => A[d0Q],
            configFileSelector: (A) => A[c0Q],
            default: void 0
        },
        R3A = ((A) => {
            return A.IPv4 = "IPv4", A.IPv6 = "IPv6", A
        })(R3A || {}),
        p0Q = "AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE",
        i0Q = "ec2_metadata_service_endpoint_mode",
        n0Q = {
            environmentVariableSelector: (A) => A[p0Q],
            configFileSelector: (A) => A[i0Q],
            default: "IPv4"
        },
        O3A = uG(async () => m0Q.parseUrl(await a0Q() || await s0Q()), "getInstanceMetadataEndpoint"),
        a0Q = uG(async () => bs1.loadConfig(l0Q)(), "getFromEndpointConfig"),
        s0Q = uG(async () => {
            let A = await bs1.loadConfig(n0Q)();
            switch (A) {
                case "IPv4":
                    return "http://169.254.169.254";
                case "IPv6":
                    return "http://[fd00:ec2::254]";
                default:
                    throw new Error(`Unsupported endpoint mode: ${A}. Select from ${Object.values(R3A)}`)
            }
        }, "getFromEndpointModeConfig"),
        r0Q = 300,
        o0Q = 300,
        t0Q = "https://docs.aws.amazon.com/sdkref/latest/guide/feature-static-credentials.html",
        z3A = uG((A, B) => {
            let Q = r0Q + Math.floor(Math.random() * o0Q),
                Z = new Date(Date.now() + Q * 1000);
            B.warn(`Attempting credential expiration extension due to a credential service availability issue. A refresh of these credentials will be attempted after ${new Date(Z)}.
For more information, please visit: ` + t0Q);
            let D = A.originalExpiration ?? A.expiration;
            return {
                ...A,
                ...D ? {
                    originalExpiration: D
                } : {},
                expiration: Z
            }
        }, "getExtendedInstanceMetadataCredentials"),
        e0Q = uG((A, B = {}) => {
            let Q = B?.logger || console,
                Z;
            return async () => {
                let D;
                try {
                    if (D = await A(), D.expiration && D.expiration.getTime() < Date.now()) D = z3A(D, Q)
                } catch (G) {
                    if (Z) Q.warn("Credential renew failed: ", G), D = z3A(Z, Q);
                    else throw G
                }
                return Z = D, D
            }
        }, "staticStabilityProvider"),
        T3A = "/latest/meta-data/iam/security-credentials/",
        AAQ = "/latest/api/token",
        ys1 = "AWS_EC2_METADATA_V1_DISABLED",
        E3A = "ec2_metadata_v1_disabled",
        U3A = "x-aws-ec2-metadata-token",
        BAQ = uG((A = {}) => e0Q(QAQ(A), {
            logger: A.logger
        }), "fromInstanceMetadata"),
        QAQ = uG((A = {}) => {
            let B = !1,
                {
                    logger: Q,
                    profile: Z
                } = A,
                {
                    timeout: D,
                    maxRetries: G
                } = vs1(A),
                F = uG(async (I, Y) => {
                    if (B || Y.headers?.[U3A] == null) {
                        let X = !1,
                            V = !1,
                            C = await bs1.loadConfig({
                                environmentVariableSelector: (K) => {
                                    let H = K[ys1];
                                    if (V = !!H && H !== "false", H === void 0) throw new LN.CredentialsProviderError(`${ys1} not set in env, checking config file next.`, {
                                        logger: A.logger
                                    });
                                    return V
                                },
                                configFileSelector: (K) => {
                                    let H = K[E3A];
                                    return X = !!H && H !== "false", X
                                },
                                default: !1
                            }, {
                                profile: Z
                            })();
                        if (A.ec2MetadataV1Disabled || C) {
                            let K = [];
                            if (A.ec2MetadataV1Disabled) K.push("credential provider initialization (runtime option ec2MetadataV1Disabled)");
                            if (X) K.push(`config file profile (${E3A})`);
                            if (V) K.push(`process environment variable (${ys1})`);
                            throw new u0Q(`AWS EC2 Metadata v1 fallback has been blocked by AWS SDK configuration in the following: [${K.join(", ")}].`)
                        }
                    }
                    let J = (await _s1(async () => {
                        let X;
                        try {
                            X = await DAQ(Y)
                        } catch (V) {
                            if (V.statusCode === 401) B = !1;
                            throw V
                        }
                        return X
                    }, I)).trim();
                    return _s1(async () => {
                        let X;
                        try {
                            X = await GAQ(J, Y, A)
                        } catch (V) {
                            if (V.statusCode === 401) B = !1;
                            throw V
                        }
                        return X
                    }, I)
                }, "getCredentials");
            return async () => {
                let I = await O3A();
                if (B) return Q?.debug("AWS SDK Instance Metadata", "using v1 fallback (no token fetch)"), F(G, {
                    ...I,
                    timeout: D
                });
                else {
                    let Y;
                    try {
                        Y = (await ZAQ({
                            ...I,
                            timeout: D
                        })).toString()
                    } catch (W) {
                        if (W?.statusCode === 400) throw Object.assign(W, {
                            message: "EC2 Metadata token request returned error"
                        });
                        else if (W.message === "TimeoutError" || [403, 404, 405].includes(W.statusCode)) B = !0;
                        return Q?.debug("AWS SDK Instance Metadata", "using v1 fallback (initial)"), F(G, {
                            ...I,
                            timeout: D
                        })
                    }
                    return F(G, {
                        ...I,
                        headers: {
                            [U3A]: Y
                        },
                        timeout: D
                    })
                }
            }
        }, "getInstanceMetadataProvider"),
        ZAQ = uG(async (A) => Gi({
            ...A,
            path: AAQ,
            method: "PUT",
            headers: {
                "x-aws-ec2-metadata-token-ttl-seconds": "21600"
            }
        }), "getMetadataToken"),
        DAQ = uG(async (A) => (await Gi({
            ...A,
            path: T3A
        })).toString(), "getProfile"),
        GAQ = uG(async (A, B, Q) => {
            let Z = JSON.parse((await Gi({
                ...B,
                path: T3A + A
            })).toString());
            if (!$3A(Z)) throw new LN.CredentialsProviderError("Invalid response received from instance metadata service.", {
                logger: Q.logger
            });
            return q3A(Z)
        }, "getCredentialsFromProfile")
});
var k3A = E((S3A) => {
    Object.defineProperty(S3A, "__esModule", {
        value: !0
    });
    S3A.checkUrl = void 0;
    var FAQ = A9(),
        IAQ = "169.254.170.2",
        YAQ = "169.254.170.23",
        WAQ = "[fd00:ec2::23]",
        JAQ = (A, B) => {
            if (A.protocol === "https:") return;
            if (A.hostname === IAQ || A.hostname === YAQ || A.hostname === WAQ) return;
            if (A.hostname.includes("[")) {
                if (A.hostname === "[::1]" || A.hostname === "[0000:0000:0000:0000:0000:0000:0000:0001]") return
            } else {
                if (A.hostname === "localhost") return;
                let Q = A.hostname.split("."),
                    Z = (D) => {
                        let G = parseInt(D, 10);
                        return 0 <= G && G <= 255
                    };
                if (Q[0] === "127" && Z(Q[1]) && Z(Q[2]) && Z(Q[3]) && Q.length === 4) return
            }
            throw new FAQ.CredentialsProviderError(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`, {
                logger: B
            })
        };
    S3A.checkUrl = JAQ
});