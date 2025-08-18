/* chunk:115 bytes:[2639650, 2657731) size:18081 source:unpacked-cli.js */
var KqA = E((F45, CqA) => {
    var {
        create: Y$Q,
        defineProperty: kQ1,
        getOwnPropertyDescriptor: W$Q,
        getOwnPropertyNames: J$Q,
        getPrototypeOf: X$Q
    } = Object, V$Q = Object.prototype.hasOwnProperty, lk = (A, B) => kQ1(A, "name", {
        value: B,
        configurable: !0
    }), C$Q = (A, B) => {
        for (var Q in B) kQ1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, WqA = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of J$Q(B))
                if (!V$Q.call(A, D) && D !== Q) kQ1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = W$Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, JqA = (A, B, Q) => (Q = A != null ? Y$Q(X$Q(A)) : {}, WqA(B || !A || !A.__esModule ? kQ1(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), K$Q = (A) => WqA(kQ1({}, "__esModule", {
        value: !0
    }), A), XqA = {};
    C$Q(XqA, {
        fromSso: () => VqA,
        fromStatic: () => q$Q,
        nodeProvider: () => N$Q
    });
    CqA.exports = K$Q(XqA);
    var H$Q = 300000,
        de1 = "To refresh this SSO session run 'aws sso login' with the corresponding profile.",
        z$Q = lk(async (A, B = {}) => {
            let {
                SSOOIDCClient: Q
            } = await Promise.resolve().then(() => JqA(me1()));
            return new Q(Object.assign({}, B.clientConfig ?? {}, {
                region: A ?? B.clientConfig?.region,
                logger: B.clientConfig?.logger ?? B.parentClientConfig?.logger
            }))
        }, "getSsoOidcClient"),
        E$Q = lk(async (A, B, Q = {}) => {
            let {
                CreateTokenCommand: Z
            } = await Promise.resolve().then(() => JqA(me1()));
            return (await z$Q(B, Q)).send(new Z({
                clientId: A.clientId,
                clientSecret: A.clientSecret,
                refreshToken: A.refreshToken,
                grantType: "refresh_token"
            }))
        }, "getNewSsoOidcToken"),
        $w = A9(),
        IqA = lk((A) => {
            if (A.expiration && A.expiration.getTime() < Date.now()) throw new $w.TokenProviderError(`Token is expired. ${de1}`, !1)
        }, "validateTokenExpiry"),
        gh = lk((A, B, Q = !1) => {
            if (typeof B === "undefined") throw new $w.TokenProviderError(`Value not present for '${A}' in SSO Token${Q?". Cannot refresh":""}. ${de1}`, !1)
        }, "validateTokenKey"),
        jQ1 = I3(),
        U$Q = W1("fs"),
        {
            writeFile: w$Q
        } = U$Q.promises,
        $$Q = lk((A, B) => {
            let Q = jQ1.getSSOTokenFilepath(A),
                Z = JSON.stringify(B, null, 2);
            return w$Q(Q, Z)
        }, "writeSSOTokenToFile"),
        YqA = new Date(0),
        VqA = lk((A = {}) => async ({
            callerClientConfig: B
        } = {}) => {
            let Q = {
                ...A,
                parentClientConfig: {
                    ...B,
                    ...A.parentClientConfig
                }
            };
            Q.logger?.debug("@aws-sdk/token-providers - fromSso");
            let Z = await jQ1.parseKnownFiles(Q),
                D = jQ1.getProfileName({
                    profile: Q.profile ?? B?.profile
                }),
                G = Z[D];
            if (!G) throw new $w.TokenProviderError(`Profile '${D}' could not be found in shared credentials file.`, !1);
            else if (!G.sso_session) throw new $w.TokenProviderError(`Profile '${D}' is missing required property 'sso_session'.`);
            let F = G.sso_session,
                Y = (await jQ1.loadSsoSessionData(Q))[F];
            if (!Y) throw new $w.TokenProviderError(`Sso session '${F}' could not be found in shared credentials file.`, !1);
            for (let H of ["sso_start_url", "sso_region"])
                if (!Y[H]) throw new $w.TokenProviderError(`Sso session '${F}' is missing required property '${H}'.`, !1);
            let {
                sso_start_url: W,
                sso_region: J
            } = Y, X;
            try {
                X = await jQ1.getSSOTokenFromFile(F)
            } catch (H) {
                throw new $w.TokenProviderError(`The SSO session token associated with profile=${D} was not found or is invalid. ${de1}`, !1)
            }
            gh("accessToken", X.accessToken), gh("expiresAt", X.expiresAt);
            let {
                accessToken: V,
                expiresAt: C
            } = X, K = {
                token: V,
                expiration: new Date(C)
            };
            if (K.expiration.getTime() - Date.now() > H$Q) return K;
            if (Date.now() - YqA.getTime() < 30000) return IqA(K), K;
            gh("clientId", X.clientId, !0), gh("clientSecret", X.clientSecret, !0), gh("refreshToken", X.refreshToken, !0);
            try {
                YqA.setTime(Date.now());
                let H = await E$Q(X, J, Q);
                gh("accessToken", H.accessToken), gh("expiresIn", H.expiresIn);
                let z = new Date(Date.now() + H.expiresIn * 1000);
                try {
                    await $$Q(F, {
                        ...X,
                        accessToken: H.accessToken,
                        expiresAt: z.toISOString(),
                        refreshToken: H.refreshToken
                    })
                } catch ($) {}
                return {
                    token: H.accessToken,
                    expiration: z
                }
            } catch (H) {
                return IqA(K), K
            }
        }, "fromSso"),
        q$Q = lk(({
            token: A,
            logger: B
        }) => async () => {
            if (B?.debug("@aws-sdk/token-providers - fromStatic"), !A || !A.token) throw new $w.TokenProviderError("Please pass a valid token to fromStatic", !1);
            return A
        }, "fromStatic"),
        N$Q = lk((A = {}) => $w.memoize($w.chain(VqA(A), async () => {
            throw new $w.TokenProviderError("Could not load token from any providers", !1)
        }), (B) => B.expiration !== void 0 && B.expiration.getTime() - Date.now() < 300000, (B) => B.expiration !== void 0), "nodeProvider")
});
var le1 = E((I45, LqA) => {
    var {
        defineProperty: kE1,
        getOwnPropertyDescriptor: L$Q,
        getOwnPropertyNames: EqA
    } = Object, M$Q = Object.prototype.hasOwnProperty, yE1 = (A, B) => kE1(A, "name", {
        value: B,
        configurable: !0
    }), R$Q = (A, B) => function Q() {
        return A && (B = A[EqA(A)[0]](A = 0)), B
    }, UqA = (A, B) => {
        for (var Q in B) kE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, O$Q = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of EqA(B))
                if (!M$Q.call(A, D) && D !== Q) kE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = L$Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, T$Q = (A) => O$Q(kE1({}, "__esModule", {
        value: !0
    }), A), wqA = {};
    UqA(wqA, {
        GetRoleCredentialsCommand: () => ce1.GetRoleCredentialsCommand,
        SSOClient: () => ce1.SSOClient
    });
    var ce1, P$Q = R$Q({
            "src/loadSso.ts"() {
                ce1 = uUA()
            }
        }),
        $qA = {};
    UqA($qA, {
        fromSSO: () => j$Q,
        isSsoProfile: () => qqA,
        validateSsoProfile: () => NqA
    });
    LqA.exports = T$Q($qA);
    var qqA = yE1((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        HqA = jN(),
        S$Q = KqA(),
        qw = A9(),
        jE1 = I3(),
        yQ1 = !1,
        zqA = yE1(async ({
            ssoStartUrl: A,
            ssoSession: B,
            ssoAccountId: Q,
            ssoRegion: Z,
            ssoRoleName: D,
            ssoClient: G,
            clientConfig: F,
            parentClientConfig: I,
            profile: Y,
            logger: W
        }) => {
            let J, X = "To refresh this SSO session run aws sso login with the corresponding profile.";
            if (B) try {
                let f = await S$Q.fromSso({
                    profile: Y
                })();
                J = {
                    accessToken: f.token,
                    expiresAt: new Date(f.expiration).toISOString()
                }
            } catch (f) {
                throw new qw.CredentialsProviderError(f.message, {
                    tryNextLink: yQ1,
                    logger: W
                })
            } else try {
                J = await jE1.getSSOTokenFromFile(A)
            } catch (f) {
                throw new qw.CredentialsProviderError("The SSO session associated with this profile is invalid. To refresh this SSO session run aws sso login with the corresponding profile.", {
                    tryNextLink: yQ1,
                    logger: W
                })
            }
            if (new Date(J.expiresAt).getTime() - Date.now() <= 0) throw new qw.CredentialsProviderError("The SSO session associated with this profile has expired. To refresh this SSO session run aws sso login with the corresponding profile.", {
                tryNextLink: yQ1,
                logger: W
            });
            let {
                accessToken: V
            } = J, {
                SSOClient: C,
                GetRoleCredentialsCommand: K
            } = await Promise.resolve().then(() => (P$Q(), wqA)), H = G || new C(Object.assign({}, F ?? {}, {
                logger: F?.logger ?? I?.logger,
                region: F?.region ?? Z
            })), z;
            try {
                z = await H.send(new K({
                    accountId: Q,
                    roleName: D,
                    accessToken: V
                }))
            } catch (f) {
                throw new qw.CredentialsProviderError(f, {
                    tryNextLink: yQ1,
                    logger: W
                })
            }
            let {
                roleCredentials: {
                    accessKeyId: $,
                    secretAccessKey: L,
                    sessionToken: N,
                    expiration: R,
                    credentialScope: O,
                    accountId: P
                } = {}
            } = z;
            if (!$ || !L || !N || !R) throw new qw.CredentialsProviderError("SSO returns an invalid temporary credential.", {
                tryNextLink: yQ1,
                logger: W
            });
            let j = {
                accessKeyId: $,
                secretAccessKey: L,
                sessionToken: N,
                expiration: new Date(R),
                ...O && {
                    credentialScope: O
                },
                ...P && {
                    accountId: P
                }
            };
            if (B) HqA.setCredentialFeature(j, "CREDENTIALS_SSO", "s");
            else HqA.setCredentialFeature(j, "CREDENTIALS_SSO_LEGACY", "u");
            return j
        }, "resolveSSOCredentials"),
        NqA = yE1((A, B) => {
            let {
                sso_start_url: Q,
                sso_account_id: Z,
                sso_region: D,
                sso_role_name: G
            } = A;
            if (!Q || !Z || !D || !G) throw new qw.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(A).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, {
                tryNextLink: !1,
                logger: B
            });
            return A
        }, "validateSsoProfile"),
        j$Q = yE1((A = {}) => async ({
            callerClientConfig: B
        } = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-sso - fromSSO");
            let {
                ssoStartUrl: Q,
                ssoAccountId: Z,
                ssoRegion: D,
                ssoRoleName: G,
                ssoSession: F
            } = A, {
                ssoClient: I
            } = A, Y = jE1.getProfileName({
                profile: A.profile ?? B?.profile
            });
            if (!Q && !Z && !D && !G && !F) {
                let J = (await jE1.parseKnownFiles(A))[Y];
                if (!J) throw new qw.CredentialsProviderError(`Profile ${Y} was not found.`, {
                    logger: A.logger
                });
                if (!qqA(J)) throw new qw.CredentialsProviderError(`Profile ${Y} is not configured with SSO credentials.`, {
                    logger: A.logger
                });
                if (J?.sso_session) {
                    let $ = (await jE1.loadSsoSessionData(A))[J.sso_session],
                        L = ` configurations in profile ${Y} and sso-session ${J.sso_session}`;
                    if (D && D !== $.sso_region) throw new qw.CredentialsProviderError("Conflicting SSO region" + L, {
                        tryNextLink: !1,
                        logger: A.logger
                    });
                    if (Q && Q !== $.sso_start_url) throw new qw.CredentialsProviderError("Conflicting SSO start_url" + L, {
                        tryNextLink: !1,
                        logger: A.logger
                    });
                    J.sso_region = $.sso_region, J.sso_start_url = $.sso_start_url
                }
                let {
                    sso_start_url: X,
                    sso_account_id: V,
                    sso_region: C,
                    sso_role_name: K,
                    sso_session: H
                } = NqA(J, A.logger);
                return zqA({
                    ssoStartUrl: X,
                    ssoSession: H,
                    ssoAccountId: V,
                    ssoRegion: C,
                    ssoRoleName: K,
                    ssoClient: I,
                    clientConfig: A.clientConfig,
                    parentClientConfig: A.parentClientConfig,
                    profile: Y
                })
            } else if (!Q || !Z || !D || !G) throw new qw.CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"', {
                tryNextLink: !1,
                logger: A.logger
            });
            else return zqA({
                ssoStartUrl: Q,
                ssoSession: F,
                ssoAccountId: Z,
                ssoRegion: D,
                ssoRoleName: G,
                ssoClient: I,
                clientConfig: A.clientConfig,
                parentClientConfig: A.parentClientConfig,
                profile: Y
            })
        }, "fromSSO")
});
var ie1 = E((MqA) => {
    Object.defineProperty(MqA, "__esModule", {
        value: !0
    });
    MqA.resolveHttpAuthSchemeConfig = MqA.resolveStsAuthConfig = MqA.defaultSTSHttpAuthSchemeProvider = MqA.defaultSTSHttpAuthSchemeParametersProvider = void 0;
    var k$Q = WI(),
        pe1 = E5(),
        y$Q = _Q1(),
        _$Q = async (A, B, Q) => {
            return {
                operation: pe1.getSmithyContext(B).operation,
                region: await pe1.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    MqA.defaultSTSHttpAuthSchemeParametersProvider = _$Q;

    function x$Q(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "sts",
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

    function v$Q(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var b$Q = (A) => {
        let B = [];
        switch (A.operation) {
            case "AssumeRoleWithWebIdentity": {
                B.push(v$Q(A));
                break
            }
            default:
                B.push(x$Q(A))
        }
        return B
    };
    MqA.defaultSTSHttpAuthSchemeProvider = b$Q;
    var f$Q = (A) => Object.assign(A, {
        stsClientCtor: y$Q.STSClient
    });
    MqA.resolveStsAuthConfig = f$Q;
    var h$Q = (A) => {
        let B = MqA.resolveStsAuthConfig(A),
            Q = k$Q.resolveAwsSdkSigV4Config(B);
        return Object.assign(Q, {
            authSchemePreference: pe1.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    MqA.resolveHttpAuthSchemeConfig = h$Q
});
var xQ1 = E((TqA) => {
    Object.defineProperty(TqA, "__esModule", {
        value: !0
    });
    TqA.commonParams = TqA.resolveClientEndpointParameters = void 0;
    var m$Q = (A) => {
        return Object.assign(A, {
            useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
            useFipsEndpoint: A.useFipsEndpoint ?? !1,
            useGlobalEndpoint: A.useGlobalEndpoint ?? !1,
            defaultSigningName: "sts"
        })
    };
    TqA.resolveClientEndpointParameters = m$Q;
    TqA.commonParams = {
        UseGlobalEndpoint: {
            type: "builtInParams",
            name: "useGlobalEndpoint"
        },
        UseFIPS: {
            type: "builtInParams",
            name: "useFipsEndpoint"
        },
        Endpoint: {
            type: "builtInParams",
            name: "endpoint"
        },
        Region: {
            type: "builtInParams",
            name: "region"
        },
        UseDualStack: {
            type: "builtInParams",
            name: "useDualstackEndpoint"
        }
    }
});