/* chunk:242 bytes:[5210973, 5230928) size:19955 source:unpacked-cli.js */
var K50 = E((s$5, J52) => {
    var {
        defineProperty: eN1,
        getOwnPropertyDescriptor: dE4,
        getOwnPropertyNames: cE4
    } = Object, lE4 = Object.prototype.hasOwnProperty, C50 = (A, B) => eN1(A, "name", {
        value: B,
        configurable: !0
    }), pE4 = (A, B) => {
        for (var Q in B) eN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, iE4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of cE4(B))
                if (!lE4.call(A, D) && D !== Q) eN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = dE4(B, D)) || Z.enumerable
                })
        }
        return A
    }, nE4 = (A) => iE4(eN1({}, "__esModule", {
        value: !0
    }), A), W52 = {};
    pE4(W52, {
        fromProcess: () => eE4
    });
    J52.exports = nE4(W52);
    var Y52 = I3(),
        V50 = A9(),
        aE4 = W1("child_process"),
        sE4 = W1("util"),
        rE4 = mz(),
        oE4 = C50((A, B, Q) => {
            if (B.Version !== 1) throw Error(`Profile ${A} credential_process did not return Version 1.`);
            if (B.AccessKeyId === void 0 || B.SecretAccessKey === void 0) throw Error(`Profile ${A} credential_process returned invalid credentials.`);
            if (B.Expiration) {
                let G = new Date;
                if (new Date(B.Expiration) < G) throw Error(`Profile ${A} credential_process returned expired credentials.`)
            }
            let Z = B.AccountId;
            if (!Z && Q?.[A]?.aws_account_id) Z = Q[A].aws_account_id;
            let D = {
                accessKeyId: B.AccessKeyId,
                secretAccessKey: B.SecretAccessKey,
                ...B.SessionToken && {
                    sessionToken: B.SessionToken
                },
                ...B.Expiration && {
                    expiration: new Date(B.Expiration)
                },
                ...B.CredentialScope && {
                    credentialScope: B.CredentialScope
                },
                ...Z && {
                    accountId: Z
                }
            };
            return rE4.setCredentialFeature(D, "CREDENTIALS_PROCESS", "w"), D
        }, "getValidatedProcessCredentials"),
        tE4 = C50(async (A, B, Q) => {
            let Z = B[A];
            if (B[A]) {
                let D = Z.credential_process;
                if (D !== void 0) {
                    let G = sE4.promisify(aE4.exec);
                    try {
                        let {
                            stdout: F
                        } = await G(D), I;
                        try {
                            I = JSON.parse(F.trim())
                        } catch {
                            throw Error(`Profile ${A} credential_process returned invalid JSON.`)
                        }
                        return oE4(A, I, B)
                    } catch (F) {
                        throw new V50.CredentialsProviderError(F.message, {
                            logger: Q
                        })
                    }
                } else throw new V50.CredentialsProviderError(`Profile ${A} did not contain credential_process.`, {
                    logger: Q
                })
            } else throw new V50.CredentialsProviderError(`Profile ${A} could not be found in shared credentials file.`, {
                logger: Q
            })
        }, "resolveProcessCredentials"),
        eE4 = C50((A = {}) => async ({
            callerClientConfig: B
        } = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
            let Q = await Y52.parseKnownFiles(A);
            return tE4(Y52.getProfileName({
                profile: A.profile ?? B?.profile
            }), Q, A.logger)
        }, "fromProcess")
});
var H50 = E((OL) => {
    var AU4 = OL && OL.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        BU4 = OL && OL.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        QU4 = OL && OL.__importStar || function() {
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
                        if (Z[D] !== "default") AU4(Q, B, Z[D])
                }
                return BU4(Q, B), Q
            }
        }();
    Object.defineProperty(OL, "__esModule", {
        value: !0
    });
    OL.fromWebToken = void 0;
    var ZU4 = (A) => async (B) => {
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
            } = await Promise.resolve().then(() => QU4(X50()));
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
    OL.fromWebToken = ZU4
});
var K52 = E((V52) => {
    Object.defineProperty(V52, "__esModule", {
        value: !0
    });
    V52.fromTokenFile = void 0;
    var DU4 = mz(),
        GU4 = A9(),
        FU4 = W1("fs"),
        IU4 = H50(),
        X52 = "AWS_WEB_IDENTITY_TOKEN_FILE",
        YU4 = "AWS_ROLE_ARN",
        WU4 = "AWS_ROLE_SESSION_NAME",
        JU4 = (A = {}) => async () => {
            A.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
            let B = A?.webIdentityTokenFile ?? process.env[X52],
                Q = A?.roleArn ?? process.env[YU4],
                Z = A?.roleSessionName ?? process.env[WU4];
            if (!B || !Q) throw new GU4.CredentialsProviderError("Web identity configuration not specified", {
                logger: A.logger
            });
            let D = await IU4.fromWebToken({
                ...A,
                webIdentityToken: FU4.readFileSync(B, {
                    encoding: "ascii"
                }),
                roleArn: Q,
                roleSessionName: Z
            })();
            if (B === process.env[X52]) DU4.setCredentialFeature(D, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
            return D
        };
    V52.fromTokenFile = JU4
});
var U50 = E((t$5, AL1) => {
    var {
        defineProperty: H52,
        getOwnPropertyDescriptor: XU4,
        getOwnPropertyNames: VU4
    } = Object, CU4 = Object.prototype.hasOwnProperty, z50 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of VU4(B))
                if (!CU4.call(A, D) && D !== Q) H52(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = XU4(B, D)) || Z.enumerable
                })
        }
        return A
    }, z52 = (A, B, Q) => (z50(A, B, "default"), Q && z50(Q, B, "default")), KU4 = (A) => z50(H52({}, "__esModule", {
        value: !0
    }), A), E50 = {};
    AL1.exports = KU4(E50);
    z52(E50, K52(), AL1.exports);
    z52(E50, H50(), AL1.exports)
});
var M52 = E((e$5, L52) => {
    var {
        create: HU4,
        defineProperty: v81,
        getOwnPropertyDescriptor: zU4,
        getOwnPropertyNames: EU4,
        getPrototypeOf: UU4
    } = Object, wU4 = Object.prototype.hasOwnProperty, sG = (A, B) => v81(A, "name", {
        value: B,
        configurable: !0
    }), $U4 = (A, B) => {
        for (var Q in B) v81(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, $52 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of EU4(B))
                if (!wU4.call(A, D) && D !== Q) v81(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = zU4(B, D)) || Z.enumerable
                })
        }
        return A
    }, V_ = (A, B, Q) => (Q = A != null ? HU4(UU4(A)) : {}, $52(B || !A || !A.__esModule ? v81(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), qU4 = (A) => $52(v81({}, "__esModule", {
        value: !0
    }), A), q52 = {};
    $U4(q52, {
        fromIni: () => _U4
    });
    L52.exports = qU4(q52);
    var $50 = I3(),
        C_ = mz(),
        x81 = A9(),
        NU4 = sG((A, B, Q) => {
            let Z = {
                EcsContainer: sG(async (D) => {
                    let {
                        fromHttp: G
                    } = await Promise.resolve().then(() => V_(G80())), {
                        fromContainerMetadata: F
                    } = await Promise.resolve().then(() => V_(TF()));
                    return Q?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer"), async () => x81.chain(G(D ?? {}), F(D))().then(w50)
                }, "EcsContainer"),
                Ec2InstanceMetadata: sG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");
                    let {
                        fromInstanceMetadata: G
                    } = await Promise.resolve().then(() => V_(TF()));
                    return async () => G(D)().then(w50)
                }, "Ec2InstanceMetadata"),
                Environment: sG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");
                    let {
                        fromEnv: G
                    } = await Promise.resolve().then(() => V_(Q80()));
                    return async () => G(D)().then(w50)
                }, "Environment")
            };
            if (A in Z) return Z[A];
            else throw new x81.CredentialsProviderError(`Unsupported credential source in profile ${B}. Got ${A}, expected EcsContainer or Ec2InstanceMetadata or Environment.`, {
                logger: Q
            })
        }, "resolveCredentialSource"),
        w50 = sG((A) => C_.setCredentialFeature(A, "CREDENTIALS_PROFILE_NAMED_PROVIDER", "p"), "setNamedProvider"),
        LU4 = sG((A, {
            profile: B = "default",
            logger: Q
        } = {}) => {
            return Boolean(A) && typeof A === "object" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1 && ["undefined", "string"].indexOf(typeof A.external_id) > -1 && ["undefined", "string"].indexOf(typeof A.mfa_serial) > -1 && (MU4(A, {
                profile: B,
                logger: Q
            }) || RU4(A, {
                profile: B,
                logger: Q
            }))
        }, "isAssumeRoleProfile"),
        MU4 = sG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.source_profile === "string" && typeof A.credential_source === "undefined";
            if (Z) Q?.debug?.(`    ${B} isAssumeRoleWithSourceProfile source_profile=${A.source_profile}`);
            return Z
        }, "isAssumeRoleWithSourceProfile"),
        RU4 = sG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.credential_source === "string" && typeof A.source_profile === "undefined";
            if (Z) Q?.debug?.(`    ${B} isCredentialSourceProfile credential_source=${A.credential_source}`);
            return Z
        }, "isCredentialSourceProfile"),
        OU4 = sG(async (A, B, Q, Z = {}) => {
            Q.logger?.debug("@aws-sdk/credential-provider-ini - resolveAssumeRoleCredentials (STS)");
            let D = B[A],
                {
                    source_profile: G,
                    region: F
                } = D;
            if (!Q.roleAssumer) {
                let {
                    getDefaultRoleAssumer: Y
                } = await Promise.resolve().then(() => V_(X50()));
                Q.roleAssumer = Y({
                    ...Q.clientConfig,
                    credentialProviderLogger: Q.logger,
                    parentClientConfig: {
                        ...Q?.parentClientConfig,
                        region: F ?? Q?.parentClientConfig?.region
                    }
                }, Q.clientPlugins)
            }
            if (G && G in Z) throw new x81.CredentialsProviderError(`Detected a cycle attempting to resolve credentials for profile ${$50.getProfileName(Q)}. Profiles visited: ` + Object.keys(Z).join(", "), {
                logger: Q.logger
            });
            Q.logger?.debug(`@aws-sdk/credential-provider-ini - finding credential resolver using ${G?`source_profile=[${G}]`:`profile=[${A}]`}`);
            let I = G ? N52(G, B, Q, {
                ...Z,
                [G]: !0
            }, E52(B[G] ?? {})) : (await NU4(D.credential_source, A, Q.logger)(Q))();
            if (E52(D)) return I.then((Y) => C_.setCredentialFeature(Y, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
            else {
                let Y = {
                        RoleArn: D.role_arn,
                        RoleSessionName: D.role_session_name || `aws-sdk-js-${Date.now()}`,
                        ExternalId: D.external_id,
                        DurationSeconds: parseInt(D.duration_seconds || "3600", 10)
                    },
                    {
                        mfa_serial: W
                    } = D;
                if (W) {
                    if (!Q.mfaCodeProvider) throw new x81.CredentialsProviderError(`Profile ${A} requires multi-factor authentication, but no MFA code callback was provided.`, {
                        logger: Q.logger,
                        tryNextLink: !1
                    });
                    Y.SerialNumber = W, Y.TokenCode = await Q.mfaCodeProvider(W)
                }
                let J = await I;
                return Q.roleAssumer(J, Y).then((X) => C_.setCredentialFeature(X, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"))
            }
        }, "resolveAssumeRoleCredentials"),
        E52 = sG((A) => {
            return !A.role_arn && !!A.credential_source
        }, "isCredentialSourceWithoutRoleArn"),
        TU4 = sG((A) => Boolean(A) && typeof A === "object" && typeof A.credential_process === "string", "isProcessProfile"),
        PU4 = sG(async (A, B) => Promise.resolve().then(() => V_(K50())).then(({
            fromProcess: Q
        }) => Q({
            ...A,
            profile: B
        })().then((Z) => C_.setCredentialFeature(Z, "CREDENTIALS_PROFILE_PROCESS", "v"))), "resolveProcessCredentials"),
        SU4 = sG(async (A, B, Q = {}) => {
            let {
                fromSSO: Z
            } = await Promise.resolve().then(() => V_(R80()));
            return Z({
                profile: A,
                logger: Q.logger,
                parentClientConfig: Q.parentClientConfig,
                clientConfig: Q.clientConfig
            })().then((D) => {
                if (B.sso_session) return C_.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO", "r");
                else return C_.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO_LEGACY", "t")
            })
        }, "resolveSsoCredentials"),
        jU4 = sG((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        U52 = sG((A) => Boolean(A) && typeof A === "object" && typeof A.aws_access_key_id === "string" && typeof A.aws_secret_access_key === "string" && ["undefined", "string"].indexOf(typeof A.aws_session_token) > -1 && ["undefined", "string"].indexOf(typeof A.aws_account_id) > -1, "isStaticCredsProfile"),
        w52 = sG(async (A, B) => {
            B?.logger?.debug("@aws-sdk/credential-provider-ini - resolveStaticCredentials");
            let Q = {
                accessKeyId: A.aws_access_key_id,
                secretAccessKey: A.aws_secret_access_key,
                sessionToken: A.aws_session_token,
                ...A.aws_credential_scope && {
                    credentialScope: A.aws_credential_scope
                },
                ...A.aws_account_id && {
                    accountId: A.aws_account_id
                }
            };
            return C_.setCredentialFeature(Q, "CREDENTIALS_PROFILE", "n")
        }, "resolveStaticCredentials"),
        kU4 = sG((A) => Boolean(A) && typeof A === "object" && typeof A.web_identity_token_file === "string" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1, "isWebIdentityProfile"),
        yU4 = sG(async (A, B) => Promise.resolve().then(() => V_(U50())).then(({
            fromTokenFile: Q
        }) => Q({
            webIdentityTokenFile: A.web_identity_token_file,
            roleArn: A.role_arn,
            roleSessionName: A.role_session_name,
            roleAssumerWithWebIdentity: B.roleAssumerWithWebIdentity,
            logger: B.logger,
            parentClientConfig: B.parentClientConfig
        })().then((Z) => C_.setCredentialFeature(Z, "CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN", "q"))), "resolveWebIdentityCredentials"),
        N52 = sG(async (A, B, Q, Z = {}, D = !1) => {
            let G = B[A];
            if (Object.keys(Z).length > 0 && U52(G)) return w52(G, Q);
            if (D || LU4(G, {
                    profile: A,
                    logger: Q.logger
                })) return OU4(A, B, Q, Z);
            if (U52(G)) return w52(G, Q);
            if (kU4(G)) return yU4(G, Q);
            if (TU4(G)) return PU4(Q, A);
            if (jU4(G)) return await SU4(A, G, Q);
            throw new x81.CredentialsProviderError(`Could not resolve credentials using profile: [${A}] in configuration/credentials file(s).`, {
                logger: Q.logger
            })
        }, "resolveProfileData"),
        _U4 = sG((A = {}) => async ({
            callerClientConfig: B
        } = {}) => {
            let Q = {
                ...A,
                parentClientConfig: {
                    ...B,
                    ...A.parentClientConfig
                }
            };
            Q.logger?.debug("@aws-sdk/credential-provider-ini - fromIni");
            let Z = await $50.parseKnownFiles(Q);
            return N52($50.getProfileName({
                profile: A.profile ?? B?.profile
            }), Z, Q)
        }, "fromIni")
});