/* chunk:285 bytes:[6060557, 6080529) size:19972 source:unpacked-cli.js */
var S$2 = E((gR5, P$2) => {
    var {
        create: Cl4,
        defineProperty: N51,
        getOwnPropertyDescriptor: Kl4,
        getOwnPropertyNames: Hl4,
        getPrototypeOf: zl4
    } = Object, El4 = Object.prototype.hasOwnProperty, XP = (A, B) => N51(A, "name", {
        value: B,
        configurable: !0
    }), Ul4 = (A, B) => {
        for (var Q in B) N51(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, M$2 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Hl4(B))
                if (!El4.call(A, D) && D !== Q) N51(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Kl4(B, D)) || Z.enumerable
                })
        }
        return A
    }, R$2 = (A, B, Q) => (Q = A != null ? Cl4(zl4(A)) : {}, M$2(B || !A || !A.__esModule ? N51(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), wl4 = (A) => M$2(N51({}, "__esModule", {
        value: !0
    }), A), O$2 = {};
    Ul4(O$2, {
        fromEnvSigningName: () => Nl4,
        fromSso: () => T$2,
        fromStatic: () => Sl4,
        nodeProvider: () => jl4
    });
    P$2.exports = wl4(O$2);
    var $l4 = FE(),
        ql4 = DD0(),
        yK = A9(),
        Nl4 = XP(({
            logger: A,
            signingName: B
        } = {}) => async () => {
            if (A?.debug?.("@aws-sdk/token-providers - fromEnvSigningName"), !B) throw new yK.TokenProviderError("Please pass 'signingName' to compute environment variable key", {
                logger: A
            });
            let Q = ql4.getBearerTokenEnvKey(B);
            if (!(Q in process.env)) throw new yK.TokenProviderError(`Token not present in '${Q}' environment variable`, {
                logger: A
            });
            let Z = {
                token: process.env[Q]
            };
            return $l4.setTokenFeature(Z, "BEARER_SERVICE_ENV_VARS", "3"), Z
        }, "fromEnvSigningName"),
        Ll4 = 300000,
        LG0 = "To refresh this SSO session run 'aws sso login' with the corresponding profile.",
        Ml4 = XP(async (A, B = {}) => {
            let {
                SSOOIDCClient: Q
            } = await Promise.resolve().then(() => R$2(NG0()));
            return new Q(Object.assign({}, B.clientConfig ?? {}, {
                region: A ?? B.clientConfig?.region,
                logger: B.clientConfig?.logger ?? B.parentClientConfig?.logger
            }))
        }, "getSsoOidcClient"),
        Rl4 = XP(async (A, B, Q = {}) => {
            let {
                CreateTokenCommand: Z
            } = await Promise.resolve().then(() => R$2(NG0()));
            return (await Ml4(B, Q)).send(new Z({
                clientId: A.clientId,
                clientSecret: A.clientSecret,
                refreshToken: A.refreshToken,
                grantType: "refresh_token"
            }))
        }, "getNewSsoOidcToken"),
        N$2 = XP((A) => {
            if (A.expiration && A.expiration.getTime() < Date.now()) throw new yK.TokenProviderError(`Token is expired. ${LG0}`, !1)
        }, "validateTokenExpiry"),
        qu = XP((A, B, Q = !1) => {
            if (typeof B === "undefined") throw new yK.TokenProviderError(`Value not present for '${A}' in SSO Token${Q?". Cannot refresh":""}. ${LG0}`, !1)
        }, "validateTokenKey"),
        q51 = I3(),
        Ol4 = W1("fs"),
        {
            writeFile: Tl4
        } = Ol4.promises,
        Pl4 = XP((A, B) => {
            let Q = q51.getSSOTokenFilepath(A),
                Z = JSON.stringify(B, null, 2);
            return Tl4(Q, Z)
        }, "writeSSOTokenToFile"),
        L$2 = new Date(0),
        T$2 = XP((A = {}) => async ({
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
            let Z = await q51.parseKnownFiles(Q),
                D = q51.getProfileName({
                    profile: Q.profile ?? B?.profile
                }),
                G = Z[D];
            if (!G) throw new yK.TokenProviderError(`Profile '${D}' could not be found in shared credentials file.`, !1);
            else if (!G.sso_session) throw new yK.TokenProviderError(`Profile '${D}' is missing required property 'sso_session'.`);
            let F = G.sso_session,
                Y = (await q51.loadSsoSessionData(Q))[F];
            if (!Y) throw new yK.TokenProviderError(`Sso session '${F}' could not be found in shared credentials file.`, !1);
            for (let H of ["sso_start_url", "sso_region"])
                if (!Y[H]) throw new yK.TokenProviderError(`Sso session '${F}' is missing required property '${H}'.`, !1);
            let {
                sso_start_url: W,
                sso_region: J
            } = Y, X;
            try {
                X = await q51.getSSOTokenFromFile(F)
            } catch (H) {
                throw new yK.TokenProviderError(`The SSO session token associated with profile=${D} was not found or is invalid. ${LG0}`, !1)
            }
            qu("accessToken", X.accessToken), qu("expiresAt", X.expiresAt);
            let {
                accessToken: V,
                expiresAt: C
            } = X, K = {
                token: V,
                expiration: new Date(C)
            };
            if (K.expiration.getTime() - Date.now() > Ll4) return K;
            if (Date.now() - L$2.getTime() < 30000) return N$2(K), K;
            qu("clientId", X.clientId, !0), qu("clientSecret", X.clientSecret, !0), qu("refreshToken", X.refreshToken, !0);
            try {
                L$2.setTime(Date.now());
                let H = await Rl4(X, J, Q);
                qu("accessToken", H.accessToken), qu("expiresIn", H.expiresIn);
                let z = new Date(Date.now() + H.expiresIn * 1000);
                try {
                    await Pl4(F, {
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
                return N$2(K), K
            }
        }, "fromSso"),
        Sl4 = XP(({
            token: A,
            logger: B
        }) => async () => {
            if (B?.debug("@aws-sdk/token-providers - fromStatic"), !A || !A.token) throw new yK.TokenProviderError("Please pass a valid token to fromStatic", !1);
            return A
        }, "fromStatic"),
        jl4 = XP((A = {}) => yK.memoize(yK.chain(T$2(A), async () => {
            throw new yK.TokenProviderError("Could not load token from any providers", !1)
        }), (B) => B.expiration !== void 0 && B.expiration.getTime() - Date.now() < 300000, (B) => B.expiration !== void 0), "nodeProvider")
});
var ER1 = E((uR5, h$2) => {
    var {
        defineProperty: HR1,
        getOwnPropertyDescriptor: kl4,
        getOwnPropertyNames: y$2
    } = Object, yl4 = Object.prototype.hasOwnProperty, zR1 = (A, B) => HR1(A, "name", {
        value: B,
        configurable: !0
    }), _l4 = (A, B) => function Q() {
        return A && (B = A[y$2(A)[0]](A = 0)), B
    }, _$2 = (A, B) => {
        for (var Q in B) HR1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, xl4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of y$2(B))
                if (!yl4.call(A, D) && D !== Q) HR1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = kl4(B, D)) || Z.enumerable
                })
        }
        return A
    }, vl4 = (A) => xl4(HR1({}, "__esModule", {
        value: !0
    }), A), x$2 = {};
    _$2(x$2, {
        GetRoleCredentialsCommand: () => MG0.GetRoleCredentialsCommand,
        SSOClient: () => MG0.SSOClient
    });
    var MG0, bl4 = _l4({
            "src/loadSso.ts"() {
                MG0 = Kw2()
            }
        }),
        v$2 = {};
    _$2(v$2, {
        fromSSO: () => hl4,
        isSsoProfile: () => b$2,
        validateSsoProfile: () => f$2
    });
    h$2.exports = vl4(v$2);
    var b$2 = zR1((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        j$2 = FE(),
        fl4 = S$2(),
        ew = A9(),
        KR1 = I3(),
        L51 = !1,
        k$2 = zR1(async ({
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
                let f = await fl4.fromSso({
                    profile: Y
                })();
                J = {
                    accessToken: f.token,
                    expiresAt: new Date(f.expiration).toISOString()
                }
            } catch (f) {
                throw new ew.CredentialsProviderError(f.message, {
                    tryNextLink: L51,
                    logger: W
                })
            } else try {
                J = await KR1.getSSOTokenFromFile(A)
            } catch (f) {
                throw new ew.CredentialsProviderError("The SSO session associated with this profile is invalid. To refresh this SSO session run aws sso login with the corresponding profile.", {
                    tryNextLink: L51,
                    logger: W
                })
            }
            if (new Date(J.expiresAt).getTime() - Date.now() <= 0) throw new ew.CredentialsProviderError("The SSO session associated with this profile has expired. To refresh this SSO session run aws sso login with the corresponding profile.", {
                tryNextLink: L51,
                logger: W
            });
            let {
                accessToken: V
            } = J, {
                SSOClient: C,
                GetRoleCredentialsCommand: K
            } = await Promise.resolve().then(() => (bl4(), x$2)), H = G || new C(Object.assign({}, F ?? {}, {
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
                throw new ew.CredentialsProviderError(f, {
                    tryNextLink: L51,
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
            if (!$ || !L || !N || !R) throw new ew.CredentialsProviderError("SSO returns an invalid temporary credential.", {
                tryNextLink: L51,
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
            if (B) j$2.setCredentialFeature(j, "CREDENTIALS_SSO", "s");
            else j$2.setCredentialFeature(j, "CREDENTIALS_SSO_LEGACY", "u");
            return j
        }, "resolveSSOCredentials"),
        f$2 = zR1((A, B) => {
            let {
                sso_start_url: Q,
                sso_account_id: Z,
                sso_region: D,
                sso_role_name: G
            } = A;
            if (!Q || !Z || !D || !G) throw new ew.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(A).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, {
                tryNextLink: !1,
                logger: B
            });
            return A
        }, "validateSsoProfile"),
        hl4 = zR1((A = {}) => async ({
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
            } = A, Y = KR1.getProfileName({
                profile: A.profile ?? B?.profile
            });
            if (!Q && !Z && !D && !G && !F) {
                let J = (await KR1.parseKnownFiles(A))[Y];
                if (!J) throw new ew.CredentialsProviderError(`Profile ${Y} was not found.`, {
                    logger: A.logger
                });
                if (!b$2(J)) throw new ew.CredentialsProviderError(`Profile ${Y} is not configured with SSO credentials.`, {
                    logger: A.logger
                });
                if (J?.sso_session) {
                    let $ = (await KR1.loadSsoSessionData(A))[J.sso_session],
                        L = ` configurations in profile ${Y} and sso-session ${J.sso_session}`;
                    if (D && D !== $.sso_region) throw new ew.CredentialsProviderError("Conflicting SSO region" + L, {
                        tryNextLink: !1,
                        logger: A.logger
                    });
                    if (Q && Q !== $.sso_start_url) throw new ew.CredentialsProviderError("Conflicting SSO start_url" + L, {
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
                } = f$2(J, A.logger);
                return k$2({
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
            } else if (!Q || !Z || !D || !G) throw new ew.CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"', {
                tryNextLink: !1,
                logger: A.logger
            });
            else return k$2({
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
var RG0 = E((uL) => {
    var gl4 = uL && uL.__createBinding || (Object.create ? function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            var D = Object.getOwnPropertyDescriptor(B, Q);
            if (!D || ("get" in D ? !B.__esModule : D.writable || D.configurable)) D = {
                enumerable: !0,
                get: function() {
                    return B[Q]
                }
            };
            Object.defineProperty(A, Z, D)
        } : function(A, B, Q, Z) {
            if (Z === void 0) Z = Q;
            A[Z] = B[Q]
        }),
        ul4 = uL && uL.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        ml4 = uL && uL.__importStar || function() {
            var A = function(B) {
                return A = Object.getOwnPropertyNames || function(Q) {
                    var Z = [];
                    for (var D in Q)
                        if (Object.prototype.hasOwnProperty.call(Q, D)) Z[Z.length] = D;
                    return Z
                }, A(B)
            };
            return function(B) {
                if (B && B.__esModule) return B;
                var Q = {};
                if (B != null) {
                    for (var Z = A(B), D = 0; D < Z.length; D++)
                        if (Z[D] !== "default") gl4(Q, B, Z[D])
                }
                return ul4(Q, B), Q
            }
        }();
    Object.defineProperty(uL, "__esModule", {
        value: !0
    });
    uL.fromWebToken = void 0;
    var dl4 = (A) => async (B) => {
        A.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");
        let {
            roleArn: Q,
            roleSessionName: Z,
            webIdentityToken: D,
            providerId: G,
            policyArns: F,
            policy: I,
            durationSeconds: Y
        } = A, {
            roleAssumerWithWebIdentity: W
        } = A;
        if (!W) {
            let {
                getDefaultRoleAssumerWithWebIdentity: J
            } = await Promise.resolve().then(() => ml4(AR1()));
            W = J({
                ...A.clientConfig,
                credentialProviderLogger: A.logger,
                parentClientConfig: {
                    ...B?.callerClientConfig,
                    ...A.parentClientConfig
                }
            }, A.clientPlugins)
        }
        return W({
            RoleArn: Q,
            RoleSessionName: Z ?? `aws-sdk-js-session-${Date.now()}`,
            WebIdentityToken: D,
            ProviderId: G,
            PolicyArns: F,
            Policy: I,
            DurationSeconds: Y
        })
    };
    uL.fromWebToken = dl4
});
var d$2 = E((u$2) => {
    Object.defineProperty(u$2, "__esModule", {
        value: !0
    });
    u$2.fromTokenFile = void 0;
    var cl4 = FE(),
        ll4 = A9(),
        pl4 = W1("fs"),
        il4 = RG0(),
        g$2 = "AWS_WEB_IDENTITY_TOKEN_FILE",
        nl4 = "AWS_ROLE_ARN",
        al4 = "AWS_ROLE_SESSION_NAME",
        sl4 = (A = {}) => async () => {
            A.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
            let B = A?.webIdentityTokenFile ?? process.env[g$2],
                Q = A?.roleArn ?? process.env[nl4],
                Z = A?.roleSessionName ?? process.env[al4];
            if (!B || !Q) throw new ll4.CredentialsProviderError("Web identity configuration not specified", {
                logger: A.logger
            });
            let D = await il4.fromWebToken({
                ...A,
                webIdentityToken: pl4.readFileSync(B, {
                    encoding: "ascii"
                }),
                roleArn: Q,
                roleSessionName: Z
            })();
            if (B === process.env[g$2]) cl4.setCredentialFeature(D, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
            return D
        };
    u$2.fromTokenFile = sl4
});