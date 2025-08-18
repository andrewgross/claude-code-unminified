/* chunk:85 bytes:[1927275, 1947230) size:19955 source:unpacked-cli.js */
var tr1 = E((O25, jFA) => {
    var {
        defineProperty: gH1,
        getOwnPropertyDescriptor: P6Q,
        getOwnPropertyNames: S6Q
    } = Object, j6Q = Object.prototype.hasOwnProperty, or1 = (A, B) => gH1(A, "name", {
        value: B,
        configurable: !0
    }), k6Q = (A, B) => {
        for (var Q in B) gH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, y6Q = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of S6Q(B))
                if (!j6Q.call(A, D) && D !== Q) gH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = P6Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, _6Q = (A) => y6Q(gH1({}, "__esModule", {
        value: !0
    }), A), SFA = {};
    k6Q(SFA, {
        fromProcess: () => g6Q
    });
    jFA.exports = _6Q(SFA);
    var PFA = I3(),
        rr1 = A9(),
        x6Q = W1("child_process"),
        v6Q = W1("util"),
        b6Q = Xw(),
        f6Q = or1((A, B, Q) => {
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
            return b6Q.setCredentialFeature(D, "CREDENTIALS_PROCESS", "w"), D
        }, "getValidatedProcessCredentials"),
        h6Q = or1(async (A, B, Q) => {
            let Z = B[A];
            if (B[A]) {
                let D = Z.credential_process;
                if (D !== void 0) {
                    let G = v6Q.promisify(x6Q.exec);
                    try {
                        let {
                            stdout: F
                        } = await G(D), I;
                        try {
                            I = JSON.parse(F.trim())
                        } catch {
                            throw Error(`Profile ${A} credential_process returned invalid JSON.`)
                        }
                        return f6Q(A, I, B)
                    } catch (F) {
                        throw new rr1.CredentialsProviderError(F.message, {
                            logger: Q
                        })
                    }
                } else throw new rr1.CredentialsProviderError(`Profile ${A} did not contain credential_process.`, {
                    logger: Q
                })
            } else throw new rr1.CredentialsProviderError(`Profile ${A} could not be found in shared credentials file.`, {
                logger: Q
            })
        }, "resolveProcessCredentials"),
        g6Q = or1((A = {}) => async ({
            callerClientConfig: B
        } = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
            let Q = await PFA.parseKnownFiles(A);
            return h6Q(PFA.getProfileName({
                profile: A.profile ?? B?.profile
            }), Q, A.logger)
        }, "fromProcess")
});
var er1 = E((ON) => {
    var u6Q = ON && ON.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        m6Q = ON && ON.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        d6Q = ON && ON.__importStar || function() {
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
                        if (Z[D] !== "default") u6Q(Q, B, Z[D])
                }
                return m6Q(Q, B), Q
            }
        }();
    Object.defineProperty(ON, "__esModule", {
        value: !0
    });
    ON.fromWebToken = void 0;
    var c6Q = (A) => async (B) => {
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
            } = await Promise.resolve().then(() => d6Q(sr1()));
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
    ON.fromWebToken = c6Q
});
var xFA = E((yFA) => {
    Object.defineProperty(yFA, "__esModule", {
        value: !0
    });
    yFA.fromTokenFile = void 0;
    var l6Q = Xw(),
        p6Q = A9(),
        i6Q = W1("fs"),
        n6Q = er1(),
        kFA = "AWS_WEB_IDENTITY_TOKEN_FILE",
        a6Q = "AWS_ROLE_ARN",
        s6Q = "AWS_ROLE_SESSION_NAME",
        r6Q = (A = {}) => async () => {
            A.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
            let B = A?.webIdentityTokenFile ?? process.env[kFA],
                Q = A?.roleArn ?? process.env[a6Q],
                Z = A?.roleSessionName ?? process.env[s6Q];
            if (!B || !Q) throw new p6Q.CredentialsProviderError("Web identity configuration not specified", {
                logger: A.logger
            });
            let D = await n6Q.fromWebToken({
                ...A,
                webIdentityToken: i6Q.readFileSync(B, {
                    encoding: "ascii"
                }),
                roleArn: Q,
                roleSessionName: Z
            })();
            if (B === process.env[kFA]) l6Q.setCredentialFeature(D, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
            return D
        };
    yFA.fromTokenFile = r6Q
});
var Qo1 = E((S25, uH1) => {
    var {
        defineProperty: vFA,
        getOwnPropertyDescriptor: o6Q,
        getOwnPropertyNames: t6Q
    } = Object, e6Q = Object.prototype.hasOwnProperty, Ao1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of t6Q(B))
                if (!e6Q.call(A, D) && D !== Q) vFA(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = o6Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, bFA = (A, B, Q) => (Ao1(A, B, "default"), Q && Ao1(Q, B, "default")), A8Q = (A) => Ao1(vFA({}, "__esModule", {
        value: !0
    }), A), Bo1 = {};
    uH1.exports = A8Q(Bo1);
    bFA(Bo1, xFA(), uH1.exports);
    bFA(Bo1, er1(), uH1.exports)
});
var lFA = E((j25, cFA) => {
    var {
        create: B8Q,
        defineProperty: o91,
        getOwnPropertyDescriptor: Q8Q,
        getOwnPropertyNames: Z8Q,
        getPrototypeOf: D8Q
    } = Object, G8Q = Object.prototype.hasOwnProperty, lG = (A, B) => o91(A, "name", {
        value: B,
        configurable: !0
    }), F8Q = (A, B) => {
        for (var Q in B) o91(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, uFA = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Z8Q(B))
                if (!G8Q.call(A, D) && D !== Q) o91(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Q8Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, _k = (A, B, Q) => (Q = A != null ? B8Q(D8Q(A)) : {}, uFA(B || !A || !A.__esModule ? o91(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), I8Q = (A) => uFA(o91({}, "__esModule", {
        value: !0
    }), A), mFA = {};
    F8Q(mFA, {
        fromIni: () => w8Q
    });
    cFA.exports = I8Q(mFA);
    var Do1 = I3(),
        xk = Xw(),
        r91 = A9(),
        Y8Q = lG((A, B, Q) => {
            let Z = {
                EcsContainer: lG(async (D) => {
                    let {
                        fromHttp: G
                    } = await Promise.resolve().then(() => _k(gs1())), {
                        fromContainerMetadata: F
                    } = await Promise.resolve().then(() => _k(TF()));
                    return Q?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer"), async () => r91.chain(G(D ?? {}), F(D))().then(Zo1)
                }, "EcsContainer"),
                Ec2InstanceMetadata: lG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");
                    let {
                        fromInstanceMetadata: G
                    } = await Promise.resolve().then(() => _k(TF()));
                    return async () => G(D)().then(Zo1)
                }, "Ec2InstanceMetadata"),
                Environment: lG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");
                    let {
                        fromEnv: G
                    } = await Promise.resolve().then(() => _k(ks1()));
                    return async () => G(D)().then(Zo1)
                }, "Environment")
            };
            if (A in Z) return Z[A];
            else throw new r91.CredentialsProviderError(`Unsupported credential source in profile ${B}. Got ${A}, expected EcsContainer or Ec2InstanceMetadata or Environment.`, {
                logger: Q
            })
        }, "resolveCredentialSource"),
        Zo1 = lG((A) => xk.setCredentialFeature(A, "CREDENTIALS_PROFILE_NAMED_PROVIDER", "p"), "setNamedProvider"),
        W8Q = lG((A, {
            profile: B = "default",
            logger: Q
        } = {}) => {
            return Boolean(A) && typeof A === "object" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1 && ["undefined", "string"].indexOf(typeof A.external_id) > -1 && ["undefined", "string"].indexOf(typeof A.mfa_serial) > -1 && (J8Q(A, {
                profile: B,
                logger: Q
            }) || X8Q(A, {
                profile: B,
                logger: Q
            }))
        }, "isAssumeRoleProfile"),
        J8Q = lG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.source_profile === "string" && typeof A.credential_source === "undefined";
            if (Z) Q?.debug?.(`    ${B} isAssumeRoleWithSourceProfile source_profile=${A.source_profile}`);
            return Z
        }, "isAssumeRoleWithSourceProfile"),
        X8Q = lG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.credential_source === "string" && typeof A.source_profile === "undefined";
            if (Z) Q?.debug?.(`    ${B} isCredentialSourceProfile credential_source=${A.credential_source}`);
            return Z
        }, "isCredentialSourceProfile"),
        V8Q = lG(async (A, B, Q, Z = {}) => {
            Q.logger?.debug("@aws-sdk/credential-provider-ini - resolveAssumeRoleCredentials (STS)");
            let D = B[A],
                {
                    source_profile: G,
                    region: F
                } = D;
            if (!Q.roleAssumer) {
                let {
                    getDefaultRoleAssumer: Y
                } = await Promise.resolve().then(() => _k(sr1()));
                Q.roleAssumer = Y({
                    ...Q.clientConfig,
                    credentialProviderLogger: Q.logger,
                    parentClientConfig: {
                        ...Q?.parentClientConfig,
                        region: F ?? Q?.parentClientConfig?.region
                    }
                }, Q.clientPlugins)
            }
            if (G && G in Z) throw new r91.CredentialsProviderError(`Detected a cycle attempting to resolve credentials for profile ${Do1.getProfileName(Q)}. Profiles visited: ` + Object.keys(Z).join(", "), {
                logger: Q.logger
            });
            Q.logger?.debug(`@aws-sdk/credential-provider-ini - finding credential resolver using ${G?`source_profile=[${G}]`:`profile=[${A}]`}`);
            let I = G ? dFA(G, B, Q, {
                ...Z,
                [G]: !0
            }, fFA(B[G] ?? {})) : (await Y8Q(D.credential_source, A, Q.logger)(Q))();
            if (fFA(D)) return I.then((Y) => xk.setCredentialFeature(Y, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
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
                    if (!Q.mfaCodeProvider) throw new r91.CredentialsProviderError(`Profile ${A} requires multi-factor authentication, but no MFA code callback was provided.`, {
                        logger: Q.logger,
                        tryNextLink: !1
                    });
                    Y.SerialNumber = W, Y.TokenCode = await Q.mfaCodeProvider(W)
                }
                let J = await I;
                return Q.roleAssumer(J, Y).then((X) => xk.setCredentialFeature(X, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"))
            }
        }, "resolveAssumeRoleCredentials"),
        fFA = lG((A) => {
            return !A.role_arn && !!A.credential_source
        }, "isCredentialSourceWithoutRoleArn"),
        C8Q = lG((A) => Boolean(A) && typeof A === "object" && typeof A.credential_process === "string", "isProcessProfile"),
        K8Q = lG(async (A, B) => Promise.resolve().then(() => _k(tr1())).then(({
            fromProcess: Q
        }) => Q({
            ...A,
            profile: B
        })().then((Z) => xk.setCredentialFeature(Z, "CREDENTIALS_PROFILE_PROCESS", "v"))), "resolveProcessCredentials"),
        H8Q = lG(async (A, B, Q = {}) => {
            let {
                fromSSO: Z
            } = await Promise.resolve().then(() => _k(Wr1()));
            return Z({
                profile: A,
                logger: Q.logger,
                parentClientConfig: Q.parentClientConfig,
                clientConfig: Q.clientConfig
            })().then((D) => {
                if (B.sso_session) return xk.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO", "r");
                else return xk.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO_LEGACY", "t")
            })
        }, "resolveSsoCredentials"),
        z8Q = lG((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        hFA = lG((A) => Boolean(A) && typeof A === "object" && typeof A.aws_access_key_id === "string" && typeof A.aws_secret_access_key === "string" && ["undefined", "string"].indexOf(typeof A.aws_session_token) > -1 && ["undefined", "string"].indexOf(typeof A.aws_account_id) > -1, "isStaticCredsProfile"),
        gFA = lG(async (A, B) => {
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
            return xk.setCredentialFeature(Q, "CREDENTIALS_PROFILE", "n")
        }, "resolveStaticCredentials"),
        E8Q = lG((A) => Boolean(A) && typeof A === "object" && typeof A.web_identity_token_file === "string" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1, "isWebIdentityProfile"),
        U8Q = lG(async (A, B) => Promise.resolve().then(() => _k(Qo1())).then(({
            fromTokenFile: Q
        }) => Q({
            webIdentityTokenFile: A.web_identity_token_file,
            roleArn: A.role_arn,
            roleSessionName: A.role_session_name,
            roleAssumerWithWebIdentity: B.roleAssumerWithWebIdentity,
            logger: B.logger,
            parentClientConfig: B.parentClientConfig
        })().then((Z) => xk.setCredentialFeature(Z, "CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN", "q"))), "resolveWebIdentityCredentials"),
        dFA = lG(async (A, B, Q, Z = {}, D = !1) => {
            let G = B[A];
            if (Object.keys(Z).length > 0 && hFA(G)) return gFA(G, Q);
            if (D || W8Q(G, {
                    profile: A,
                    logger: Q.logger
                })) return V8Q(A, B, Q, Z);
            if (hFA(G)) return gFA(G, Q);
            if (E8Q(G)) return U8Q(G, Q);
            if (C8Q(G)) return K8Q(Q, A);
            if (z8Q(G)) return await H8Q(A, G, Q);
            throw new r91.CredentialsProviderError(`Could not resolve credentials using profile: [${A}] in configuration/credentials file(s).`, {
                logger: Q.logger
            })
        }, "resolveProfileData"),
        w8Q = lG((A = {}) => async ({
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
            let Z = await Do1.parseKnownFiles(Q);
            return dFA(Do1.getProfileName({
                profile: A.profile ?? B?.profile
            }), Z, Q)
        }, "fromIni")
});