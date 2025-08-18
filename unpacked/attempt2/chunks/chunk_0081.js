/* chunk:81 bytes:[1859121, 1878007) size:18886 source:unpacked-cli.js */
var Ir1 = E((J25, bDA) => {
    var {
        create: YQQ,
        defineProperty: i91,
        getOwnPropertyDescriptor: WQQ,
        getOwnPropertyNames: JQQ,
        getPrototypeOf: XQQ
    } = Object, VQQ = Object.prototype.hasOwnProperty, hO = (A, B) => i91(A, "name", {
        value: B,
        configurable: !0
    }), CQQ = (A, B) => {
        for (var Q in B) i91(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, yDA = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of JQQ(B))
                if (!VQQ.call(A, D) && D !== Q) i91(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = WQQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, _DA = (A, B, Q) => (Q = A != null ? YQQ(XQQ(A)) : {}, yDA(B || !A || !A.__esModule ? i91(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), KQQ = (A) => yDA(i91({}, "__esModule", {
        value: !0
    }), A), xDA = {};
    CQQ(xDA, {
        fromEnvSigningName: () => EQQ,
        fromSso: () => vDA,
        fromStatic: () => MQQ,
        nodeProvider: () => RQQ
    });
    bDA.exports = KQQ(xDA);
    var HQQ = Xw(),
        zQQ = Na1(),
        sC = A9(),
        EQQ = hO(({
            logger: A,
            signingName: B
        } = {}) => async () => {
            if (A?.debug?.("@aws-sdk/token-providers - fromEnvSigningName"), !B) throw new sC.TokenProviderError("Please pass 'signingName' to compute environment variable key", {
                logger: A
            });
            let Q = zQQ.getBearerTokenEnvKey(B);
            if (!(Q in process.env)) throw new sC.TokenProviderError(`Token not present in '${Q}' environment variable`, {
                logger: A
            });
            let Z = {
                token: process.env[Q]
            };
            return HQQ.setTokenFeature(Z, "BEARER_SERVICE_ENV_VARS", "3"), Z
        }, "fromEnvSigningName"),
        UQQ = 300000,
        Fr1 = "To refresh this SSO session run 'aws sso login' with the corresponding profile.",
        wQQ = hO(async (A, B = {}) => {
            let {
                SSOOIDCClient: Q
            } = await Promise.resolve().then(() => _DA(Gr1()));
            return new Q(Object.assign({}, B.clientConfig ?? {}, {
                region: A ?? B.clientConfig?.region,
                logger: B.clientConfig?.logger ?? B.parentClientConfig?.logger
            }))
        }, "getSsoOidcClient"),
        $QQ = hO(async (A, B, Q = {}) => {
            let {
                CreateTokenCommand: Z
            } = await Promise.resolve().then(() => _DA(Gr1()));
            return (await wQQ(B, Q)).send(new Z({
                clientId: A.clientId,
                clientSecret: A.clientSecret,
                refreshToken: A.refreshToken,
                grantType: "refresh_token"
            }))
        }, "getNewSsoOidcToken"),
        jDA = hO((A) => {
            if (A.expiration && A.expiration.getTime() < Date.now()) throw new sC.TokenProviderError(`Token is expired. ${Fr1}`, !1)
        }, "validateTokenExpiry"),
        jh = hO((A, B, Q = !1) => {
            if (typeof B === "undefined") throw new sC.TokenProviderError(`Value not present for '${A}' in SSO Token${Q?". Cannot refresh":""}. ${Fr1}`, !1)
        }, "validateTokenKey"),
        p91 = I3(),
        qQQ = W1("fs"),
        {
            writeFile: NQQ
        } = qQQ.promises,
        LQQ = hO((A, B) => {
            let Q = p91.getSSOTokenFilepath(A),
                Z = JSON.stringify(B, null, 2);
            return NQQ(Q, Z)
        }, "writeSSOTokenToFile"),
        kDA = new Date(0),
        vDA = hO((A = {}) => async ({
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
            let Z = await p91.parseKnownFiles(Q),
                D = p91.getProfileName({
                    profile: Q.profile ?? B?.profile
                }),
                G = Z[D];
            if (!G) throw new sC.TokenProviderError(`Profile '${D}' could not be found in shared credentials file.`, !1);
            else if (!G.sso_session) throw new sC.TokenProviderError(`Profile '${D}' is missing required property 'sso_session'.`);
            let F = G.sso_session,
                Y = (await p91.loadSsoSessionData(Q))[F];
            if (!Y) throw new sC.TokenProviderError(`Sso session '${F}' could not be found in shared credentials file.`, !1);
            for (let H of ["sso_start_url", "sso_region"])
                if (!Y[H]) throw new sC.TokenProviderError(`Sso session '${F}' is missing required property '${H}'.`, !1);
            let {
                sso_start_url: W,
                sso_region: J
            } = Y, X;
            try {
                X = await p91.getSSOTokenFromFile(F)
            } catch (H) {
                throw new sC.TokenProviderError(`The SSO session token associated with profile=${D} was not found or is invalid. ${Fr1}`, !1)
            }
            jh("accessToken", X.accessToken), jh("expiresAt", X.expiresAt);
            let {
                accessToken: V,
                expiresAt: C
            } = X, K = {
                token: V,
                expiration: new Date(C)
            };
            if (K.expiration.getTime() - Date.now() > UQQ) return K;
            if (Date.now() - kDA.getTime() < 30000) return jDA(K), K;
            jh("clientId", X.clientId, !0), jh("clientSecret", X.clientSecret, !0), jh("refreshToken", X.refreshToken, !0);
            try {
                kDA.setTime(Date.now());
                let H = await $QQ(X, J, Q);
                jh("accessToken", H.accessToken), jh("expiresIn", H.expiresIn);
                let z = new Date(Date.now() + H.expiresIn * 1000);
                try {
                    await LQQ(F, {
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
                return jDA(K), K
            }
        }, "fromSso"),
        MQQ = hO(({
            token: A,
            logger: B
        }) => async () => {
            if (B?.debug("@aws-sdk/token-providers - fromStatic"), !A || !A.token) throw new sC.TokenProviderError("Please pass a valid token to fromStatic", !1);
            return A
        }, "fromStatic"),
        RQQ = hO((A = {}) => sC.memoize(sC.chain(vDA(A), async () => {
            throw new sC.TokenProviderError("Could not load token from any providers", !1)
        }), (B) => B.expiration !== void 0 && B.expiration.getTime() - Date.now() < 300000, (B) => B.expiration !== void 0), "nodeProvider")
});
var Wr1 = E((X25, pDA) => {
    var {
        defineProperty: vH1,
        getOwnPropertyDescriptor: OQQ,
        getOwnPropertyNames: gDA
    } = Object, TQQ = Object.prototype.hasOwnProperty, bH1 = (A, B) => vH1(A, "name", {
        value: B,
        configurable: !0
    }), PQQ = (A, B) => function Q() {
        return A && (B = A[gDA(A)[0]](A = 0)), B
    }, uDA = (A, B) => {
        for (var Q in B) vH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, SQQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of gDA(B))
                if (!TQQ.call(A, D) && D !== Q) vH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = OQQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, jQQ = (A) => SQQ(vH1({}, "__esModule", {
        value: !0
    }), A), mDA = {};
    uDA(mDA, {
        GetRoleCredentialsCommand: () => Yr1.GetRoleCredentialsCommand,
        SSOClient: () => Yr1.SSOClient
    });
    var Yr1, kQQ = PQQ({
            "src/loadSso.ts"() {
                Yr1 = NZA()
            }
        }),
        dDA = {};
    uDA(dDA, {
        fromSSO: () => _QQ,
        isSsoProfile: () => cDA,
        validateSsoProfile: () => lDA
    });
    pDA.exports = jQQ(dDA);
    var cDA = bH1((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        fDA = Xw(),
        yQQ = Ir1(),
        zw = A9(),
        xH1 = I3(),
        n91 = !1,
        hDA = bH1(async ({
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
                let f = await yQQ.fromSso({
                    profile: Y
                })();
                J = {
                    accessToken: f.token,
                    expiresAt: new Date(f.expiration).toISOString()
                }
            } catch (f) {
                throw new zw.CredentialsProviderError(f.message, {
                    tryNextLink: n91,
                    logger: W
                })
            } else try {
                J = await xH1.getSSOTokenFromFile(A)
            } catch (f) {
                throw new zw.CredentialsProviderError("The SSO session associated with this profile is invalid. To refresh this SSO session run aws sso login with the corresponding profile.", {
                    tryNextLink: n91,
                    logger: W
                })
            }
            if (new Date(J.expiresAt).getTime() - Date.now() <= 0) throw new zw.CredentialsProviderError("The SSO session associated with this profile has expired. To refresh this SSO session run aws sso login with the corresponding profile.", {
                tryNextLink: n91,
                logger: W
            });
            let {
                accessToken: V
            } = J, {
                SSOClient: C,
                GetRoleCredentialsCommand: K
            } = await Promise.resolve().then(() => (kQQ(), mDA)), H = G || new C(Object.assign({}, F ?? {}, {
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
                throw new zw.CredentialsProviderError(f, {
                    tryNextLink: n91,
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
            if (!$ || !L || !N || !R) throw new zw.CredentialsProviderError("SSO returns an invalid temporary credential.", {
                tryNextLink: n91,
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
            if (B) fDA.setCredentialFeature(j, "CREDENTIALS_SSO", "s");
            else fDA.setCredentialFeature(j, "CREDENTIALS_SSO_LEGACY", "u");
            return j
        }, "resolveSSOCredentials"),
        lDA = bH1((A, B) => {
            let {
                sso_start_url: Q,
                sso_account_id: Z,
                sso_region: D,
                sso_role_name: G
            } = A;
            if (!Q || !Z || !D || !G) throw new zw.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(A).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, {
                tryNextLink: !1,
                logger: B
            });
            return A
        }, "validateSsoProfile"),
        _QQ = bH1((A = {}) => async ({
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
            } = A, Y = xH1.getProfileName({
                profile: A.profile ?? B?.profile
            });
            if (!Q && !Z && !D && !G && !F) {
                let J = (await xH1.parseKnownFiles(A))[Y];
                if (!J) throw new zw.CredentialsProviderError(`Profile ${Y} was not found.`, {
                    logger: A.logger
                });
                if (!cDA(J)) throw new zw.CredentialsProviderError(`Profile ${Y} is not configured with SSO credentials.`, {
                    logger: A.logger
                });
                if (J?.sso_session) {
                    let $ = (await xH1.loadSsoSessionData(A))[J.sso_session],
                        L = ` configurations in profile ${Y} and sso-session ${J.sso_session}`;
                    if (D && D !== $.sso_region) throw new zw.CredentialsProviderError("Conflicting SSO region" + L, {
                        tryNextLink: !1,
                        logger: A.logger
                    });
                    if (Q && Q !== $.sso_start_url) throw new zw.CredentialsProviderError("Conflicting SSO start_url" + L, {
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
                } = lDA(J, A.logger);
                return hDA({
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
            } else if (!Q || !Z || !D || !G) throw new zw.CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"', {
                tryNextLink: !1,
                logger: A.logger
            });
            else return hDA({
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
var Xr1 = E((iDA) => {
    Object.defineProperty(iDA, "__esModule", {
        value: !0
    });
    iDA.resolveHttpAuthSchemeConfig = iDA.resolveStsAuthConfig = iDA.defaultSTSHttpAuthSchemeProvider = iDA.defaultSTSHttpAuthSchemeParametersProvider = void 0;
    var xQQ = YI(),
        Jr1 = E5(),
        vQQ = a91(),
        bQQ = async (A, B, Q) => {
            return {
                operation: Jr1.getSmithyContext(B).operation,
                region: await Jr1.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    iDA.defaultSTSHttpAuthSchemeParametersProvider = bQQ;

    function fQQ(A) {
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

    function hQQ(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var gQQ = (A) => {
        let B = [];
        switch (A.operation) {
            case "AssumeRoleWithWebIdentity": {
                B.push(hQQ(A));
                break
            }
            default:
                B.push(fQQ(A))
        }
        return B
    };
    iDA.defaultSTSHttpAuthSchemeProvider = gQQ;
    var uQQ = (A) => Object.assign(A, {
        stsClientCtor: vQQ.STSClient
    });
    iDA.resolveStsAuthConfig = uQQ;
    var mQQ = (A) => {
        let B = iDA.resolveStsAuthConfig(A),
            Q = xQQ.resolveAwsSdkSigV4Config(B);
        return Object.assign(Q, {
            authSchemePreference: Jr1.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    iDA.resolveHttpAuthSchemeConfig = mQQ
});
var s91 = E((sDA) => {
    Object.defineProperty(sDA, "__esModule", {
        value: !0
    });
    sDA.commonParams = sDA.resolveClientEndpointParameters = void 0;
    var lQQ = (A) => {
        return Object.assign(A, {
            useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
            useFipsEndpoint: A.useFipsEndpoint ?? !1,
            useGlobalEndpoint: A.useGlobalEndpoint ?? !1,
            defaultSigningName: "sts"
        })
    };
    sDA.resolveClientEndpointParameters = lQQ;
    sDA.commonParams = {
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