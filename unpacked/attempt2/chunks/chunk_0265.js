/* chunk:265 bytes:[5663068, 5683023) size:19955 source:unpacked-cli.js */
var CZ0 = E((XL5, nJ2) => {
    var {
        defineProperty: GM1,
        getOwnPropertyDescriptor: Hk4,
        getOwnPropertyNames: zk4
    } = Object, Ek4 = Object.prototype.hasOwnProperty, VZ0 = (A, B) => GM1(A, "name", {
        value: B,
        configurable: !0
    }), Uk4 = (A, B) => {
        for (var Q in B) GM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, wk4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of zk4(B))
                if (!Ek4.call(A, D) && D !== Q) GM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Hk4(B, D)) || Z.enumerable
                })
        }
        return A
    }, $k4 = (A) => wk4(GM1({}, "__esModule", {
        value: !0
    }), A), iJ2 = {};
    Uk4(iJ2, {
        fromProcess: () => Ok4
    });
    nJ2.exports = $k4(iJ2);
    var pJ2 = I3(),
        XZ0 = A9(),
        qk4 = W1("child_process"),
        Nk4 = W1("util"),
        Lk4 = ow(),
        Mk4 = VZ0((A, B, Q) => {
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
            return Lk4.setCredentialFeature(D, "CREDENTIALS_PROCESS", "w"), D
        }, "getValidatedProcessCredentials"),
        Rk4 = VZ0(async (A, B, Q) => {
            let Z = B[A];
            if (B[A]) {
                let D = Z.credential_process;
                if (D !== void 0) {
                    let G = Nk4.promisify(qk4.exec);
                    try {
                        let {
                            stdout: F
                        } = await G(D), I;
                        try {
                            I = JSON.parse(F.trim())
                        } catch {
                            throw Error(`Profile ${A} credential_process returned invalid JSON.`)
                        }
                        return Mk4(A, I, B)
                    } catch (F) {
                        throw new XZ0.CredentialsProviderError(F.message, {
                            logger: Q
                        })
                    }
                } else throw new XZ0.CredentialsProviderError(`Profile ${A} did not contain credential_process.`, {
                    logger: Q
                })
            } else throw new XZ0.CredentialsProviderError(`Profile ${A} could not be found in shared credentials file.`, {
                logger: Q
            })
        }, "resolveProcessCredentials"),
        Ok4 = VZ0((A = {}) => async ({
            callerClientConfig: B
        } = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
            let Q = await pJ2.parseKnownFiles(A);
            return Rk4(pJ2.getProfileName({
                profile: A.profile ?? B?.profile
            }), Q, A.logger)
        }, "fromProcess")
});
var KZ0 = E((xL) => {
    var Tk4 = xL && xL.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        Pk4 = xL && xL.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        Sk4 = xL && xL.__importStar || function() {
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
                        if (Z[D] !== "default") Tk4(Q, B, Z[D])
                }
                return Pk4(Q, B), Q
            }
        }();
    Object.defineProperty(xL, "__esModule", {
        value: !0
    });
    xL.fromWebToken = void 0;
    var jk4 = (A) => async (B) => {
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
            } = await Promise.resolve().then(() => Sk4(JZ0()));
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
    xL.fromWebToken = jk4
});
var oJ2 = E((sJ2) => {
    Object.defineProperty(sJ2, "__esModule", {
        value: !0
    });
    sJ2.fromTokenFile = void 0;
    var kk4 = ow(),
        yk4 = A9(),
        _k4 = W1("fs"),
        xk4 = KZ0(),
        aJ2 = "AWS_WEB_IDENTITY_TOKEN_FILE",
        vk4 = "AWS_ROLE_ARN",
        bk4 = "AWS_ROLE_SESSION_NAME",
        fk4 = (A = {}) => async () => {
            A.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
            let B = A?.webIdentityTokenFile ?? process.env[aJ2],
                Q = A?.roleArn ?? process.env[vk4],
                Z = A?.roleSessionName ?? process.env[bk4];
            if (!B || !Q) throw new yk4.CredentialsProviderError("Web identity configuration not specified", {
                logger: A.logger
            });
            let D = await xk4.fromWebToken({
                ...A,
                webIdentityToken: _k4.readFileSync(B, {
                    encoding: "ascii"
                }),
                roleArn: Q,
                roleSessionName: Z
            })();
            if (B === process.env[aJ2]) kk4.setCredentialFeature(D, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
            return D
        };
    sJ2.fromTokenFile = fk4
});
var EZ0 = E((KL5, FM1) => {
    var {
        defineProperty: tJ2,
        getOwnPropertyDescriptor: hk4,
        getOwnPropertyNames: gk4
    } = Object, uk4 = Object.prototype.hasOwnProperty, HZ0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of gk4(B))
                if (!uk4.call(A, D) && D !== Q) tJ2(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = hk4(B, D)) || Z.enumerable
                })
        }
        return A
    }, eJ2 = (A, B, Q) => (HZ0(A, B, "default"), Q && HZ0(Q, B, "default")), mk4 = (A) => HZ0(tJ2({}, "__esModule", {
        value: !0
    }), A), zZ0 = {};
    FM1.exports = mk4(zZ0);
    eJ2(zZ0, oJ2(), FM1.exports);
    eJ2(zZ0, KZ0(), FM1.exports)
});
var IX2 = E((HL5, FX2) => {
    var {
        create: dk4,
        defineProperty: Z51,
        getOwnPropertyDescriptor: ck4,
        getOwnPropertyNames: lk4,
        getPrototypeOf: pk4
    } = Object, ik4 = Object.prototype.hasOwnProperty, rG = (A, B) => Z51(A, "name", {
        value: B,
        configurable: !0
    }), nk4 = (A, B) => {
        for (var Q in B) Z51(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, ZX2 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of lk4(B))
                if (!ik4.call(A, D) && D !== Q) Z51(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ck4(B, D)) || Z.enumerable
                })
        }
        return A
    }, L_ = (A, B, Q) => (Q = A != null ? dk4(pk4(A)) : {}, ZX2(B || !A || !A.__esModule ? Z51(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), ak4 = (A) => ZX2(Z51({}, "__esModule", {
        value: !0
    }), A), DX2 = {};
    nk4(DX2, {
        fromIni: () => Fy4
    });
    FX2.exports = ak4(DX2);
    var wZ0 = I3(),
        M_ = ow(),
        Q51 = A9(),
        sk4 = rG((A, B, Q) => {
            let Z = {
                EcsContainer: rG(async (D) => {
                    let {
                        fromHttp: G
                    } = await Promise.resolve().then(() => L_(D70())), {
                        fromContainerMetadata: F
                    } = await Promise.resolve().then(() => L_(TF()));
                    return Q?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer"), async () => Q51.chain(G(D ?? {}), F(D))().then(UZ0)
                }, "EcsContainer"),
                Ec2InstanceMetadata: rG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");
                    let {
                        fromInstanceMetadata: G
                    } = await Promise.resolve().then(() => L_(TF()));
                    return async () => G(D)().then(UZ0)
                }, "Ec2InstanceMetadata"),
                Environment: rG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");
                    let {
                        fromEnv: G
                    } = await Promise.resolve().then(() => L_(B70()));
                    return async () => G(D)().then(UZ0)
                }, "Environment")
            };
            if (A in Z) return Z[A];
            else throw new Q51.CredentialsProviderError(`Unsupported credential source in profile ${B}. Got ${A}, expected EcsContainer or Ec2InstanceMetadata or Environment.`, {
                logger: Q
            })
        }, "resolveCredentialSource"),
        UZ0 = rG((A) => M_.setCredentialFeature(A, "CREDENTIALS_PROFILE_NAMED_PROVIDER", "p"), "setNamedProvider"),
        rk4 = rG((A, {
            profile: B = "default",
            logger: Q
        } = {}) => {
            return Boolean(A) && typeof A === "object" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1 && ["undefined", "string"].indexOf(typeof A.external_id) > -1 && ["undefined", "string"].indexOf(typeof A.mfa_serial) > -1 && (ok4(A, {
                profile: B,
                logger: Q
            }) || tk4(A, {
                profile: B,
                logger: Q
            }))
        }, "isAssumeRoleProfile"),
        ok4 = rG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.source_profile === "string" && typeof A.credential_source === "undefined";
            if (Z) Q?.debug?.(`    ${B} isAssumeRoleWithSourceProfile source_profile=${A.source_profile}`);
            return Z
        }, "isAssumeRoleWithSourceProfile"),
        tk4 = rG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.credential_source === "string" && typeof A.source_profile === "undefined";
            if (Z) Q?.debug?.(`    ${B} isCredentialSourceProfile credential_source=${A.credential_source}`);
            return Z
        }, "isCredentialSourceProfile"),
        ek4 = rG(async (A, B, Q, Z = {}) => {
            Q.logger?.debug("@aws-sdk/credential-provider-ini - resolveAssumeRoleCredentials (STS)");
            let D = B[A],
                {
                    source_profile: G,
                    region: F
                } = D;
            if (!Q.roleAssumer) {
                let {
                    getDefaultRoleAssumer: Y
                } = await Promise.resolve().then(() => L_(JZ0()));
                Q.roleAssumer = Y({
                    ...Q.clientConfig,
                    credentialProviderLogger: Q.logger,
                    parentClientConfig: {
                        ...Q?.parentClientConfig,
                        region: F ?? Q?.parentClientConfig?.region
                    }
                }, Q.clientPlugins)
            }
            if (G && G in Z) throw new Q51.CredentialsProviderError(`Detected a cycle attempting to resolve credentials for profile ${wZ0.getProfileName(Q)}. Profiles visited: ` + Object.keys(Z).join(", "), {
                logger: Q.logger
            });
            Q.logger?.debug(`@aws-sdk/credential-provider-ini - finding credential resolver using ${G?`source_profile=[${G}]`:`profile=[${A}]`}`);
            let I = G ? GX2(G, B, Q, {
                ...Z,
                [G]: !0
            }, AX2(B[G] ?? {})) : (await sk4(D.credential_source, A, Q.logger)(Q))();
            if (AX2(D)) return I.then((Y) => M_.setCredentialFeature(Y, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
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
                    if (!Q.mfaCodeProvider) throw new Q51.CredentialsProviderError(`Profile ${A} requires multi-factor authentication, but no MFA code callback was provided.`, {
                        logger: Q.logger,
                        tryNextLink: !1
                    });
                    Y.SerialNumber = W, Y.TokenCode = await Q.mfaCodeProvider(W)
                }
                let J = await I;
                return Q.roleAssumer(J, Y).then((X) => M_.setCredentialFeature(X, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"))
            }
        }, "resolveAssumeRoleCredentials"),
        AX2 = rG((A) => {
            return !A.role_arn && !!A.credential_source
        }, "isCredentialSourceWithoutRoleArn"),
        Ay4 = rG((A) => Boolean(A) && typeof A === "object" && typeof A.credential_process === "string", "isProcessProfile"),
        By4 = rG(async (A, B) => Promise.resolve().then(() => L_(CZ0())).then(({
            fromProcess: Q
        }) => Q({
            ...A,
            profile: B
        })().then((Z) => M_.setCredentialFeature(Z, "CREDENTIALS_PROFILE_PROCESS", "v"))), "resolveProcessCredentials"),
        Qy4 = rG(async (A, B, Q = {}) => {
            let {
                fromSSO: Z
            } = await Promise.resolve().then(() => L_(M70()));
            return Z({
                profile: A,
                logger: Q.logger,
                parentClientConfig: Q.parentClientConfig,
                clientConfig: Q.clientConfig
            })().then((D) => {
                if (B.sso_session) return M_.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO", "r");
                else return M_.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO_LEGACY", "t")
            })
        }, "resolveSsoCredentials"),
        Zy4 = rG((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        BX2 = rG((A) => Boolean(A) && typeof A === "object" && typeof A.aws_access_key_id === "string" && typeof A.aws_secret_access_key === "string" && ["undefined", "string"].indexOf(typeof A.aws_session_token) > -1 && ["undefined", "string"].indexOf(typeof A.aws_account_id) > -1, "isStaticCredsProfile"),
        QX2 = rG(async (A, B) => {
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
            return M_.setCredentialFeature(Q, "CREDENTIALS_PROFILE", "n")
        }, "resolveStaticCredentials"),
        Dy4 = rG((A) => Boolean(A) && typeof A === "object" && typeof A.web_identity_token_file === "string" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1, "isWebIdentityProfile"),
        Gy4 = rG(async (A, B) => Promise.resolve().then(() => L_(EZ0())).then(({
            fromTokenFile: Q
        }) => Q({
            webIdentityTokenFile: A.web_identity_token_file,
            roleArn: A.role_arn,
            roleSessionName: A.role_session_name,
            roleAssumerWithWebIdentity: B.roleAssumerWithWebIdentity,
            logger: B.logger,
            parentClientConfig: B.parentClientConfig
        })().then((Z) => M_.setCredentialFeature(Z, "CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN", "q"))), "resolveWebIdentityCredentials"),
        GX2 = rG(async (A, B, Q, Z = {}, D = !1) => {
            let G = B[A];
            if (Object.keys(Z).length > 0 && BX2(G)) return QX2(G, Q);
            if (D || rk4(G, {
                    profile: A,
                    logger: Q.logger
                })) return ek4(A, B, Q, Z);
            if (BX2(G)) return QX2(G, Q);
            if (Dy4(G)) return Gy4(G, Q);
            if (Ay4(G)) return By4(Q, A);
            if (Zy4(G)) return await Qy4(A, G, Q);
            throw new Q51.CredentialsProviderError(`Could not resolve credentials using profile: [${A}] in configuration/credentials file(s).`, {
                logger: Q.logger
            })
        }, "resolveProfileData"),
        Fy4 = rG((A = {}) => async ({
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
            let Z = await wZ0.parseKnownFiles(Q);
            return GX2(wZ0.getProfileName({
                profile: A.profile ?? B?.profile
            }), Z, Q)
        }, "fromIni")
});