/* chunk:238 bytes:[5142819, 5161705) size:18886 source:unpacked-cli.js */
var z62 = E((_$5, H62) => {
    var {
        create: NH4,
        defineProperty: j81,
        getOwnPropertyDescriptor: LH4,
        getOwnPropertyNames: MH4,
        getPrototypeOf: RH4
    } = Object, OH4 = Object.prototype.hasOwnProperty, _T = (A, B) => j81(A, "name", {
        value: B,
        configurable: !0
    }), TH4 = (A, B) => {
        for (var Q in B) j81(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, X62 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of MH4(B))
                if (!OH4.call(A, D) && D !== Q) j81(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = LH4(B, D)) || Z.enumerable
                })
        }
        return A
    }, V62 = (A, B, Q) => (Q = A != null ? NH4(RH4(A)) : {}, X62(B || !A || !A.__esModule ? j81(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), PH4 = (A) => X62(j81({}, "__esModule", {
        value: !0
    }), A), C62 = {};
    TH4(C62, {
        fromEnvSigningName: () => kH4,
        fromSso: () => K62,
        fromStatic: () => hH4,
        nodeProvider: () => gH4
    });
    H62.exports = PH4(C62);
    var SH4 = mz(),
        jH4 = y60(),
        qK = A9(),
        kH4 = _T(({
            logger: A,
            signingName: B
        } = {}) => async () => {
            if (A?.debug?.("@aws-sdk/token-providers - fromEnvSigningName"), !B) throw new qK.TokenProviderError("Please pass 'signingName' to compute environment variable key", {
                logger: A
            });
            let Q = jH4.getBearerTokenEnvKey(B);
            if (!(Q in process.env)) throw new qK.TokenProviderError(`Token not present in '${Q}' environment variable`, {
                logger: A
            });
            let Z = {
                token: process.env[Q]
            };
            return SH4.setTokenFeature(Z, "BEARER_SERVICE_ENV_VARS", "3"), Z
        }, "fromEnvSigningName"),
        yH4 = 300000,
        L80 = "To refresh this SSO session run 'aws sso login' with the corresponding profile.",
        _H4 = _T(async (A, B = {}) => {
            let {
                SSOOIDCClient: Q
            } = await Promise.resolve().then(() => V62(N80()));
            return new Q(Object.assign({}, B.clientConfig ?? {}, {
                region: A ?? B.clientConfig?.region,
                logger: B.clientConfig?.logger ?? B.parentClientConfig?.logger
            }))
        }, "getSsoOidcClient"),
        xH4 = _T(async (A, B, Q = {}) => {
            let {
                CreateTokenCommand: Z
            } = await Promise.resolve().then(() => V62(N80()));
            return (await _H4(B, Q)).send(new Z({
                clientId: A.clientId,
                clientSecret: A.clientSecret,
                refreshToken: A.refreshToken,
                grantType: "refresh_token"
            }))
        }, "getNewSsoOidcToken"),
        W62 = _T((A) => {
            if (A.expiration && A.expiration.getTime() < Date.now()) throw new qK.TokenProviderError(`Token is expired. ${L80}`, !1)
        }, "validateTokenExpiry"),
        tg = _T((A, B, Q = !1) => {
            if (typeof B === "undefined") throw new qK.TokenProviderError(`Value not present for '${A}' in SSO Token${Q?". Cannot refresh":""}. ${L80}`, !1)
        }, "validateTokenKey"),
        S81 = I3(),
        vH4 = W1("fs"),
        {
            writeFile: bH4
        } = vH4.promises,
        fH4 = _T((A, B) => {
            let Q = S81.getSSOTokenFilepath(A),
                Z = JSON.stringify(B, null, 2);
            return bH4(Q, Z)
        }, "writeSSOTokenToFile"),
        J62 = new Date(0),
        K62 = _T((A = {}) => async ({
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
            let Z = await S81.parseKnownFiles(Q),
                D = S81.getProfileName({
                    profile: Q.profile ?? B?.profile
                }),
                G = Z[D];
            if (!G) throw new qK.TokenProviderError(`Profile '${D}' could not be found in shared credentials file.`, !1);
            else if (!G.sso_session) throw new qK.TokenProviderError(`Profile '${D}' is missing required property 'sso_session'.`);
            let F = G.sso_session,
                Y = (await S81.loadSsoSessionData(Q))[F];
            if (!Y) throw new qK.TokenProviderError(`Sso session '${F}' could not be found in shared credentials file.`, !1);
            for (let H of ["sso_start_url", "sso_region"])
                if (!Y[H]) throw new qK.TokenProviderError(`Sso session '${F}' is missing required property '${H}'.`, !1);
            let {
                sso_start_url: W,
                sso_region: J
            } = Y, X;
            try {
                X = await S81.getSSOTokenFromFile(F)
            } catch (H) {
                throw new qK.TokenProviderError(`The SSO session token associated with profile=${D} was not found or is invalid. ${L80}`, !1)
            }
            tg("accessToken", X.accessToken), tg("expiresAt", X.expiresAt);
            let {
                accessToken: V,
                expiresAt: C
            } = X, K = {
                token: V,
                expiration: new Date(C)
            };
            if (K.expiration.getTime() - Date.now() > yH4) return K;
            if (Date.now() - J62.getTime() < 30000) return W62(K), K;
            tg("clientId", X.clientId, !0), tg("clientSecret", X.clientSecret, !0), tg("refreshToken", X.refreshToken, !0);
            try {
                J62.setTime(Date.now());
                let H = await xH4(X, J, Q);
                tg("accessToken", H.accessToken), tg("expiresIn", H.expiresIn);
                let z = new Date(Date.now() + H.expiresIn * 1000);
                try {
                    await fH4(F, {
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
                return W62(K), K
            }
        }, "fromSso"),
        hH4 = _T(({
            token: A,
            logger: B
        }) => async () => {
            if (B?.debug("@aws-sdk/token-providers - fromStatic"), !A || !A.token) throw new qK.TokenProviderError("Please pass a valid token to fromStatic", !1);
            return A
        }, "fromStatic"),
        gH4 = _T((A = {}) => qK.memoize(qK.chain(K62(A), async () => {
            throw new qK.TokenProviderError("Could not load token from any providers", !1)
        }), (B) => B.expiration !== void 0 && B.expiration.getTime() - Date.now() < 300000, (B) => B.expiration !== void 0), "nodeProvider")
});
var R80 = E((x$5, R62) => {
    var {
        defineProperty: sN1,
        getOwnPropertyDescriptor: uH4,
        getOwnPropertyNames: w62
    } = Object, mH4 = Object.prototype.hasOwnProperty, rN1 = (A, B) => sN1(A, "name", {
        value: B,
        configurable: !0
    }), dH4 = (A, B) => function Q() {
        return A && (B = A[w62(A)[0]](A = 0)), B
    }, $62 = (A, B) => {
        for (var Q in B) sN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, cH4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of w62(B))
                if (!mH4.call(A, D) && D !== Q) sN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = uH4(B, D)) || Z.enumerable
                })
        }
        return A
    }, lH4 = (A) => cH4(sN1({}, "__esModule", {
        value: !0
    }), A), q62 = {};
    $62(q62, {
        GetRoleCredentialsCommand: () => M80.GetRoleCredentialsCommand,
        SSOClient: () => M80.SSOClient
    });
    var M80, pH4 = dH4({
            "src/loadSso.ts"() {
                M80 = B42()
            }
        }),
        N62 = {};
    $62(N62, {
        fromSSO: () => nH4,
        isSsoProfile: () => L62,
        validateSsoProfile: () => M62
    });
    R62.exports = lH4(N62);
    var L62 = rN1((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        E62 = mz(),
        iH4 = z62(),
        rw = A9(),
        aN1 = I3(),
        k81 = !1,
        U62 = rN1(async ({
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
                let f = await iH4.fromSso({
                    profile: Y
                })();
                J = {
                    accessToken: f.token,
                    expiresAt: new Date(f.expiration).toISOString()
                }
            } catch (f) {
                throw new rw.CredentialsProviderError(f.message, {
                    tryNextLink: k81,
                    logger: W
                })
            } else try {
                J = await aN1.getSSOTokenFromFile(A)
            } catch (f) {
                throw new rw.CredentialsProviderError("The SSO session associated with this profile is invalid. To refresh this SSO session run aws sso login with the corresponding profile.", {
                    tryNextLink: k81,
                    logger: W
                })
            }
            if (new Date(J.expiresAt).getTime() - Date.now() <= 0) throw new rw.CredentialsProviderError("The SSO session associated with this profile has expired. To refresh this SSO session run aws sso login with the corresponding profile.", {
                tryNextLink: k81,
                logger: W
            });
            let {
                accessToken: V
            } = J, {
                SSOClient: C,
                GetRoleCredentialsCommand: K
            } = await Promise.resolve().then(() => (pH4(), q62)), H = G || new C(Object.assign({}, F ?? {}, {
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
                throw new rw.CredentialsProviderError(f, {
                    tryNextLink: k81,
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
            if (!$ || !L || !N || !R) throw new rw.CredentialsProviderError("SSO returns an invalid temporary credential.", {
                tryNextLink: k81,
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
            if (B) E62.setCredentialFeature(j, "CREDENTIALS_SSO", "s");
            else E62.setCredentialFeature(j, "CREDENTIALS_SSO_LEGACY", "u");
            return j
        }, "resolveSSOCredentials"),
        M62 = rN1((A, B) => {
            let {
                sso_start_url: Q,
                sso_account_id: Z,
                sso_region: D,
                sso_role_name: G
            } = A;
            if (!Q || !Z || !D || !G) throw new rw.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(A).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, {
                tryNextLink: !1,
                logger: B
            });
            return A
        }, "validateSsoProfile"),
        nH4 = rN1((A = {}) => async ({
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
            } = A, Y = aN1.getProfileName({
                profile: A.profile ?? B?.profile
            });
            if (!Q && !Z && !D && !G && !F) {
                let J = (await aN1.parseKnownFiles(A))[Y];
                if (!J) throw new rw.CredentialsProviderError(`Profile ${Y} was not found.`, {
                    logger: A.logger
                });
                if (!L62(J)) throw new rw.CredentialsProviderError(`Profile ${Y} is not configured with SSO credentials.`, {
                    logger: A.logger
                });
                if (J?.sso_session) {
                    let $ = (await aN1.loadSsoSessionData(A))[J.sso_session],
                        L = ` configurations in profile ${Y} and sso-session ${J.sso_session}`;
                    if (D && D !== $.sso_region) throw new rw.CredentialsProviderError("Conflicting SSO region" + L, {
                        tryNextLink: !1,
                        logger: A.logger
                    });
                    if (Q && Q !== $.sso_start_url) throw new rw.CredentialsProviderError("Conflicting SSO start_url" + L, {
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
                } = M62(J, A.logger);
                return U62({
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
            } else if (!Q || !Z || !D || !G) throw new rw.CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"', {
                tryNextLink: !1,
                logger: A.logger
            });
            else return U62({
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
var T80 = E((O62) => {
    Object.defineProperty(O62, "__esModule", {
        value: !0
    });
    O62.resolveHttpAuthSchemeConfig = O62.resolveStsAuthConfig = O62.defaultSTSHttpAuthSchemeProvider = O62.defaultSTSHttpAuthSchemeParametersProvider = void 0;
    var aH4 = HI(),
        O80 = E5(),
        sH4 = y81(),
        rH4 = async (A, B, Q) => {
            return {
                operation: O80.getSmithyContext(B).operation,
                region: await O80.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    O62.defaultSTSHttpAuthSchemeParametersProvider = rH4;

    function oH4(A) {
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

    function tH4(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var eH4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "AssumeRoleWithWebIdentity": {
                B.push(tH4(A));
                break
            }
            default:
                B.push(oH4(A))
        }
        return B
    };
    O62.defaultSTSHttpAuthSchemeProvider = eH4;
    var Az4 = (A) => Object.assign(A, {
        stsClientCtor: sH4.STSClient
    });
    O62.resolveStsAuthConfig = Az4;
    var Bz4 = (A) => {
        let B = O62.resolveStsAuthConfig(A),
            Q = aH4.resolveAwsSdkSigV4Config(B);
        return Object.assign(Q, {
            authSchemePreference: O80.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    O62.resolveHttpAuthSchemeConfig = Bz4
});
var _81 = E((S62) => {
    Object.defineProperty(S62, "__esModule", {
        value: !0
    });
    S62.commonParams = S62.resolveClientEndpointParameters = void 0;
    var Dz4 = (A) => {
        return Object.assign(A, {
            useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
            useFipsEndpoint: A.useFipsEndpoint ?? !1,
            useGlobalEndpoint: A.useGlobalEndpoint ?? !1,
            defaultSigningName: "sts"
        })
    };
    S62.resolveClientEndpointParameters = Dz4;
    S62.commonParams = {
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