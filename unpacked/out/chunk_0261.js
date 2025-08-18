/* chunk:261 bytes:[5594914, 5613800) size:18886 source:unpacked-cli.js */
var eY2 = E((sN5, tY2) => {
    var {
        create: sP4,
        defineProperty: t81,
        getOwnPropertyDescriptor: rP4,
        getOwnPropertyNames: oP4,
        getPrototypeOf: tP4
    } = Object, eP4 = Object.prototype.hasOwnProperty, eT = (A, B) => t81(A, "name", {
        value: B,
        configurable: !0
    }), AS4 = (A, B) => {
        for (var Q in B) t81(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, aY2 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of oP4(B))
                if (!eP4.call(A, D) && D !== Q) t81(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = rP4(B, D)) || Z.enumerable
                })
        }
        return A
    }, sY2 = (A, B, Q) => (Q = A != null ? sP4(tP4(A)) : {}, aY2(B || !A || !A.__esModule ? t81(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), BS4 = (A) => aY2(t81({}, "__esModule", {
        value: !0
    }), A), rY2 = {};
    AS4(rY2, {
        fromEnvSigningName: () => DS4,
        fromSso: () => oY2,
        fromStatic: () => XS4,
        nodeProvider: () => VS4
    });
    tY2.exports = BS4(rY2);
    var QS4 = ow(),
        ZS4 = k30(),
        RK = A9(),
        DS4 = eT(({
            logger: A,
            signingName: B
        } = {}) => async () => {
            if (A?.debug?.("@aws-sdk/token-providers - fromEnvSigningName"), !B) throw new RK.TokenProviderError("Please pass 'signingName' to compute environment variable key", {
                logger: A
            });
            let Q = ZS4.getBearerTokenEnvKey(B);
            if (!(Q in process.env)) throw new RK.TokenProviderError(`Token not present in '${Q}' environment variable`, {
                logger: A
            });
            let Z = {
                token: process.env[Q]
            };
            return QS4.setTokenFeature(Z, "BEARER_SERVICE_ENV_VARS", "3"), Z
        }, "fromEnvSigningName"),
        GS4 = 300000,
        N70 = "To refresh this SSO session run 'aws sso login' with the corresponding profile.",
        FS4 = eT(async (A, B = {}) => {
            let {
                SSOOIDCClient: Q
            } = await Promise.resolve().then(() => sY2(q70()));
            return new Q(Object.assign({}, B.clientConfig ?? {}, {
                region: A ?? B.clientConfig?.region,
                logger: B.clientConfig?.logger ?? B.parentClientConfig?.logger
            }))
        }, "getSsoOidcClient"),
        IS4 = eT(async (A, B, Q = {}) => {
            let {
                CreateTokenCommand: Z
            } = await Promise.resolve().then(() => sY2(q70()));
            return (await FS4(B, Q)).send(new Z({
                clientId: A.clientId,
                clientSecret: A.clientSecret,
                refreshToken: A.refreshToken,
                grantType: "refresh_token"
            }))
        }, "getNewSsoOidcToken"),
        iY2 = eT((A) => {
            if (A.expiration && A.expiration.getTime() < Date.now()) throw new RK.TokenProviderError(`Token is expired. ${N70}`, !1)
        }, "validateTokenExpiry"),
        Ju = eT((A, B, Q = !1) => {
            if (typeof B === "undefined") throw new RK.TokenProviderError(`Value not present for '${A}' in SSO Token${Q?". Cannot refresh":""}. ${N70}`, !1)
        }, "validateTokenKey"),
        o81 = I3(),
        YS4 = W1("fs"),
        {
            writeFile: WS4
        } = YS4.promises,
        JS4 = eT((A, B) => {
            let Q = o81.getSSOTokenFilepath(A),
                Z = JSON.stringify(B, null, 2);
            return WS4(Q, Z)
        }, "writeSSOTokenToFile"),
        nY2 = new Date(0),
        oY2 = eT((A = {}) => async ({
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
            let Z = await o81.parseKnownFiles(Q),
                D = o81.getProfileName({
                    profile: Q.profile ?? B?.profile
                }),
                G = Z[D];
            if (!G) throw new RK.TokenProviderError(`Profile '${D}' could not be found in shared credentials file.`, !1);
            else if (!G.sso_session) throw new RK.TokenProviderError(`Profile '${D}' is missing required property 'sso_session'.`);
            let F = G.sso_session,
                Y = (await o81.loadSsoSessionData(Q))[F];
            if (!Y) throw new RK.TokenProviderError(`Sso session '${F}' could not be found in shared credentials file.`, !1);
            for (let H of ["sso_start_url", "sso_region"])
                if (!Y[H]) throw new RK.TokenProviderError(`Sso session '${F}' is missing required property '${H}'.`, !1);
            let {
                sso_start_url: W,
                sso_region: J
            } = Y, X;
            try {
                X = await o81.getSSOTokenFromFile(F)
            } catch (H) {
                throw new RK.TokenProviderError(`The SSO session token associated with profile=${D} was not found or is invalid. ${N70}`, !1)
            }
            Ju("accessToken", X.accessToken), Ju("expiresAt", X.expiresAt);
            let {
                accessToken: V,
                expiresAt: C
            } = X, K = {
                token: V,
                expiration: new Date(C)
            };
            if (K.expiration.getTime() - Date.now() > GS4) return K;
            if (Date.now() - nY2.getTime() < 30000) return iY2(K), K;
            Ju("clientId", X.clientId, !0), Ju("clientSecret", X.clientSecret, !0), Ju("refreshToken", X.refreshToken, !0);
            try {
                nY2.setTime(Date.now());
                let H = await IS4(X, J, Q);
                Ju("accessToken", H.accessToken), Ju("expiresIn", H.expiresIn);
                let z = new Date(Date.now() + H.expiresIn * 1000);
                try {
                    await JS4(F, {
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
                return iY2(K), K
            }
        }, "fromSso"),
        XS4 = eT(({
            token: A,
            logger: B
        }) => async () => {
            if (B?.debug("@aws-sdk/token-providers - fromStatic"), !A || !A.token) throw new RK.TokenProviderError("Please pass a valid token to fromStatic", !1);
            return A
        }, "fromStatic"),
        VS4 = eT((A = {}) => RK.memoize(RK.chain(oY2(A), async () => {
            throw new RK.TokenProviderError("Could not load token from any providers", !1)
        }), (B) => B.expiration !== void 0 && B.expiration.getTime() - Date.now() < 300000, (B) => B.expiration !== void 0), "nodeProvider")
});
var M70 = E((rN5, YW2) => {
    var {
        defineProperty: BM1,
        getOwnPropertyDescriptor: CS4,
        getOwnPropertyNames: QW2
    } = Object, KS4 = Object.prototype.hasOwnProperty, QM1 = (A, B) => BM1(A, "name", {
        value: B,
        configurable: !0
    }), HS4 = (A, B) => function Q() {
        return A && (B = A[QW2(A)[0]](A = 0)), B
    }, ZW2 = (A, B) => {
        for (var Q in B) BM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, zS4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of QW2(B))
                if (!KS4.call(A, D) && D !== Q) BM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = CS4(B, D)) || Z.enumerable
                })
        }
        return A
    }, ES4 = (A) => zS4(BM1({}, "__esModule", {
        value: !0
    }), A), DW2 = {};
    ZW2(DW2, {
        GetRoleCredentialsCommand: () => L70.GetRoleCredentialsCommand,
        SSOClient: () => L70.SSOClient
    });
    var L70, US4 = HS4({
            "src/loadSso.ts"() {
                L70 = hI2()
            }
        }),
        GW2 = {};
    ZW2(GW2, {
        fromSSO: () => $S4,
        isSsoProfile: () => FW2,
        validateSsoProfile: () => IW2
    });
    YW2.exports = ES4(GW2);
    var FW2 = QM1((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        AW2 = ow(),
        wS4 = eY2(),
        tw = A9(),
        AM1 = I3(),
        e81 = !1,
        BW2 = QM1(async ({
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
                let f = await wS4.fromSso({
                    profile: Y
                })();
                J = {
                    accessToken: f.token,
                    expiresAt: new Date(f.expiration).toISOString()
                }
            } catch (f) {
                throw new tw.CredentialsProviderError(f.message, {
                    tryNextLink: e81,
                    logger: W
                })
            } else try {
                J = await AM1.getSSOTokenFromFile(A)
            } catch (f) {
                throw new tw.CredentialsProviderError("The SSO session associated with this profile is invalid. To refresh this SSO session run aws sso login with the corresponding profile.", {
                    tryNextLink: e81,
                    logger: W
                })
            }
            if (new Date(J.expiresAt).getTime() - Date.now() <= 0) throw new tw.CredentialsProviderError("The SSO session associated with this profile has expired. To refresh this SSO session run aws sso login with the corresponding profile.", {
                tryNextLink: e81,
                logger: W
            });
            let {
                accessToken: V
            } = J, {
                SSOClient: C,
                GetRoleCredentialsCommand: K
            } = await Promise.resolve().then(() => (US4(), DW2)), H = G || new C(Object.assign({}, F ?? {}, {
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
                throw new tw.CredentialsProviderError(f, {
                    tryNextLink: e81,
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
            if (!$ || !L || !N || !R) throw new tw.CredentialsProviderError("SSO returns an invalid temporary credential.", {
                tryNextLink: e81,
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
            if (B) AW2.setCredentialFeature(j, "CREDENTIALS_SSO", "s");
            else AW2.setCredentialFeature(j, "CREDENTIALS_SSO_LEGACY", "u");
            return j
        }, "resolveSSOCredentials"),
        IW2 = QM1((A, B) => {
            let {
                sso_start_url: Q,
                sso_account_id: Z,
                sso_region: D,
                sso_role_name: G
            } = A;
            if (!Q || !Z || !D || !G) throw new tw.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(A).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, {
                tryNextLink: !1,
                logger: B
            });
            return A
        }, "validateSsoProfile"),
        $S4 = QM1((A = {}) => async ({
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
            } = A, Y = AM1.getProfileName({
                profile: A.profile ?? B?.profile
            });
            if (!Q && !Z && !D && !G && !F) {
                let J = (await AM1.parseKnownFiles(A))[Y];
                if (!J) throw new tw.CredentialsProviderError(`Profile ${Y} was not found.`, {
                    logger: A.logger
                });
                if (!FW2(J)) throw new tw.CredentialsProviderError(`Profile ${Y} is not configured with SSO credentials.`, {
                    logger: A.logger
                });
                if (J?.sso_session) {
                    let $ = (await AM1.loadSsoSessionData(A))[J.sso_session],
                        L = ` configurations in profile ${Y} and sso-session ${J.sso_session}`;
                    if (D && D !== $.sso_region) throw new tw.CredentialsProviderError("Conflicting SSO region" + L, {
                        tryNextLink: !1,
                        logger: A.logger
                    });
                    if (Q && Q !== $.sso_start_url) throw new tw.CredentialsProviderError("Conflicting SSO start_url" + L, {
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
                } = IW2(J, A.logger);
                return BW2({
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
            } else if (!Q || !Z || !D || !G) throw new tw.CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"', {
                tryNextLink: !1,
                logger: A.logger
            });
            else return BW2({
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
var O70 = E((WW2) => {
    Object.defineProperty(WW2, "__esModule", {
        value: !0
    });
    WW2.resolveHttpAuthSchemeConfig = WW2.resolveStsAuthConfig = WW2.defaultSTSHttpAuthSchemeProvider = WW2.defaultSTSHttpAuthSchemeParametersProvider = void 0;
    var qS4 = UI(),
        R70 = E5(),
        NS4 = A51(),
        LS4 = async (A, B, Q) => {
            return {
                operation: R70.getSmithyContext(B).operation,
                region: await R70.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    WW2.defaultSTSHttpAuthSchemeParametersProvider = LS4;

    function MS4(A) {
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

    function RS4(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var OS4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "AssumeRoleWithWebIdentity": {
                B.push(RS4(A));
                break
            }
            default:
                B.push(MS4(A))
        }
        return B
    };
    WW2.defaultSTSHttpAuthSchemeProvider = OS4;
    var TS4 = (A) => Object.assign(A, {
        stsClientCtor: NS4.STSClient
    });
    WW2.resolveStsAuthConfig = TS4;
    var PS4 = (A) => {
        let B = WW2.resolveStsAuthConfig(A),
            Q = qS4.resolveAwsSdkSigV4Config(B);
        return Object.assign(Q, {
            authSchemePreference: R70.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    WW2.resolveHttpAuthSchemeConfig = PS4
});
var B51 = E((VW2) => {
    Object.defineProperty(VW2, "__esModule", {
        value: !0
    });
    VW2.commonParams = VW2.resolveClientEndpointParameters = void 0;
    var kS4 = (A) => {
        return Object.assign(A, {
            useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
            useFipsEndpoint: A.useFipsEndpoint ?? !1,
            useGlobalEndpoint: A.useGlobalEndpoint ?? !1,
            defaultSigningName: "sts"
        })
    };
    VW2.resolveClientEndpointParameters = kS4;
    VW2.commonParams = {
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