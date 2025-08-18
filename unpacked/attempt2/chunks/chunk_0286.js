/* chunk:286 bytes:[6080530, 6100077) size:19547 source:unpacked-cli.js */
var M51 = E((cR5, UR1) => {
    var {
        defineProperty: c$2,
        getOwnPropertyDescriptor: rl4,
        getOwnPropertyNames: ol4
    } = Object, tl4 = Object.prototype.hasOwnProperty, OG0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ol4(B))
                if (!tl4.call(A, D) && D !== Q) c$2(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = rl4(B, D)) || Z.enumerable
                })
        }
        return A
    }, l$2 = (A, B, Q) => (OG0(A, B, "default"), Q && OG0(Q, B, "default")), el4 = (A) => OG0(c$2({}, "__esModule", {
        value: !0
    }), A), TG0 = {};
    UR1.exports = el4(TG0);
    l$2(TG0, d$2(), UR1.exports);
    l$2(TG0, RG0(), UR1.exports)
});
var jG0 = E((lR5, o$2) => {
    var {
        create: Ap4,
        defineProperty: O51,
        getOwnPropertyDescriptor: Bp4,
        getOwnPropertyNames: Qp4,
        getPrototypeOf: Zp4
    } = Object, Dp4 = Object.prototype.hasOwnProperty, tG = (A, B) => O51(A, "name", {
        value: B,
        configurable: !0
    }), Gp4 = (A, B) => {
        for (var Q in B) O51(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, a$2 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Qp4(B))
                if (!Dp4.call(A, D) && D !== Q) O51(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Bp4(B, D)) || Z.enumerable
                })
        }
        return A
    }, k_ = (A, B, Q) => (Q = A != null ? Ap4(Zp4(A)) : {}, a$2(B || !A || !A.__esModule ? O51(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), Fp4 = (A) => a$2(O51({}, "__esModule", {
        value: !0
    }), A), s$2 = {};
    Gp4(s$2, {
        fromIni: () => Up4
    });
    o$2.exports = Fp4(s$2);
    var SG0 = I3(),
        y_ = FE(),
        R51 = A9(),
        Ip4 = tG((A, B, Q) => {
            let Z = {
                EcsContainer: tG(async (D) => {
                    let {
                        fromHttp: G
                    } = await Promise.resolve().then(() => k_($M1())), {
                        fromContainerMetadata: F
                    } = await Promise.resolve().then(() => k_(TF()));
                    return Q?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer"), async () => R51.chain(G(D ?? {}), F(D))().then(PG0)
                }, "EcsContainer"),
                Ec2InstanceMetadata: tG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");
                    let {
                        fromInstanceMetadata: G
                    } = await Promise.resolve().then(() => k_(TF()));
                    return async () => G(D)().then(PG0)
                }, "Ec2InstanceMetadata"),
                Environment: tG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");
                    let {
                        fromEnv: G
                    } = await Promise.resolve().then(() => k_(NM1()));
                    return async () => G(D)().then(PG0)
                }, "Environment")
            };
            if (A in Z) return Z[A];
            else throw new R51.CredentialsProviderError(`Unsupported credential source in profile ${B}. Got ${A}, expected EcsContainer or Ec2InstanceMetadata or Environment.`, {
                logger: Q
            })
        }, "resolveCredentialSource"),
        PG0 = tG((A) => y_.setCredentialFeature(A, "CREDENTIALS_PROFILE_NAMED_PROVIDER", "p"), "setNamedProvider"),
        Yp4 = tG((A, {
            profile: B = "default",
            logger: Q
        } = {}) => {
            return Boolean(A) && typeof A === "object" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1 && ["undefined", "string"].indexOf(typeof A.external_id) > -1 && ["undefined", "string"].indexOf(typeof A.mfa_serial) > -1 && (Wp4(A, {
                profile: B,
                logger: Q
            }) || Jp4(A, {
                profile: B,
                logger: Q
            }))
        }, "isAssumeRoleProfile"),
        Wp4 = tG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.source_profile === "string" && typeof A.credential_source === "undefined";
            if (Z) Q?.debug?.(`    ${B} isAssumeRoleWithSourceProfile source_profile=${A.source_profile}`);
            return Z
        }, "isAssumeRoleWithSourceProfile"),
        Jp4 = tG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.credential_source === "string" && typeof A.source_profile === "undefined";
            if (Z) Q?.debug?.(`    ${B} isCredentialSourceProfile credential_source=${A.credential_source}`);
            return Z
        }, "isCredentialSourceProfile"),
        Xp4 = tG(async (A, B, Q, Z = {}) => {
            Q.logger?.debug("@aws-sdk/credential-provider-ini - resolveAssumeRoleCredentials (STS)");
            let D = B[A],
                {
                    source_profile: G,
                    region: F
                } = D;
            if (!Q.roleAssumer) {
                let {
                    getDefaultRoleAssumer: Y
                } = await Promise.resolve().then(() => k_(AR1()));
                Q.roleAssumer = Y({
                    ...Q.clientConfig,
                    credentialProviderLogger: Q.logger,
                    parentClientConfig: {
                        ...Q?.parentClientConfig,
                        region: F ?? Q?.parentClientConfig?.region
                    }
                }, Q.clientPlugins)
            }
            if (G && G in Z) throw new R51.CredentialsProviderError(`Detected a cycle attempting to resolve credentials for profile ${SG0.getProfileName(Q)}. Profiles visited: ` + Object.keys(Z).join(", "), {
                logger: Q.logger
            });
            Q.logger?.debug(`@aws-sdk/credential-provider-ini - finding credential resolver using ${G?`source_profile=[${G}]`:`profile=[${A}]`}`);
            let I = G ? r$2(G, B, Q, {
                ...Z,
                [G]: !0
            }, p$2(B[G] ?? {})) : (await Ip4(D.credential_source, A, Q.logger)(Q))();
            if (p$2(D)) return I.then((Y) => y_.setCredentialFeature(Y, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
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
                    if (!Q.mfaCodeProvider) throw new R51.CredentialsProviderError(`Profile ${A} requires multi-factor authentication, but no MFA code callback was provided.`, {
                        logger: Q.logger,
                        tryNextLink: !1
                    });
                    Y.SerialNumber = W, Y.TokenCode = await Q.mfaCodeProvider(W)
                }
                let J = await I;
                return Q.roleAssumer(J, Y).then((X) => y_.setCredentialFeature(X, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"))
            }
        }, "resolveAssumeRoleCredentials"),
        p$2 = tG((A) => {
            return !A.role_arn && !!A.credential_source
        }, "isCredentialSourceWithoutRoleArn"),
        Vp4 = tG((A) => Boolean(A) && typeof A === "object" && typeof A.credential_process === "string", "isProcessProfile"),
        Cp4 = tG(async (A, B) => Promise.resolve().then(() => k_(QR1())).then(({
            fromProcess: Q
        }) => Q({
            ...A,
            profile: B
        })().then((Z) => y_.setCredentialFeature(Z, "CREDENTIALS_PROFILE_PROCESS", "v"))), "resolveProcessCredentials"),
        Kp4 = tG(async (A, B, Q = {}) => {
            let {
                fromSSO: Z
            } = await Promise.resolve().then(() => k_(ER1()));
            return Z({
                profile: A,
                logger: Q.logger,
                parentClientConfig: Q.parentClientConfig,
                clientConfig: Q.clientConfig
            })().then((D) => {
                if (B.sso_session) return y_.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO", "r");
                else return y_.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO_LEGACY", "t")
            })
        }, "resolveSsoCredentials"),
        Hp4 = tG((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        i$2 = tG((A) => Boolean(A) && typeof A === "object" && typeof A.aws_access_key_id === "string" && typeof A.aws_secret_access_key === "string" && ["undefined", "string"].indexOf(typeof A.aws_session_token) > -1 && ["undefined", "string"].indexOf(typeof A.aws_account_id) > -1, "isStaticCredsProfile"),
        n$2 = tG(async (A, B) => {
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
            return y_.setCredentialFeature(Q, "CREDENTIALS_PROFILE", "n")
        }, "resolveStaticCredentials"),
        zp4 = tG((A) => Boolean(A) && typeof A === "object" && typeof A.web_identity_token_file === "string" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1, "isWebIdentityProfile"),
        Ep4 = tG(async (A, B) => Promise.resolve().then(() => k_(M51())).then(({
            fromTokenFile: Q
        }) => Q({
            webIdentityTokenFile: A.web_identity_token_file,
            roleArn: A.role_arn,
            roleSessionName: A.role_session_name,
            roleAssumerWithWebIdentity: B.roleAssumerWithWebIdentity,
            logger: B.logger,
            parentClientConfig: B.parentClientConfig
        })().then((Z) => y_.setCredentialFeature(Z, "CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN", "q"))), "resolveWebIdentityCredentials"),
        r$2 = tG(async (A, B, Q, Z = {}, D = !1) => {
            let G = B[A];
            if (Object.keys(Z).length > 0 && i$2(G)) return n$2(G, Q);
            if (D || Yp4(G, {
                    profile: A,
                    logger: Q.logger
                })) return Xp4(A, B, Q, Z);
            if (i$2(G)) return n$2(G, Q);
            if (zp4(G)) return Ep4(G, Q);
            if (Vp4(G)) return Cp4(Q, A);
            if (Hp4(G)) return await Kp4(A, G, Q);
            throw new R51.CredentialsProviderError(`Could not resolve credentials using profile: [${A}] in configuration/credentials file(s).`, {
                logger: Q.logger
            })
        }, "resolveProfileData"),
        Up4 = tG((A = {}) => async ({
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
            let Z = await SG0.parseKnownFiles(Q);
            return r$2(SG0.getProfileName({
                profile: A.profile ?? B?.profile
            }), Z, Q)
        }, "fromIni")
});
var Aq2 = E((t$2) => {
    Object.defineProperty(t$2, "__esModule", {
        value: !0
    });
    t$2.fromIni = void 0;
    var wp4 = jG0(),
        $p4 = (A = {}) => wp4.fromIni({
            ...A
        });
    t$2.fromIni = $p4
});
var Zq2 = E((Bq2) => {
    Object.defineProperty(Bq2, "__esModule", {
        value: !0
    });
    Bq2.fromInstanceMetadata = void 0;
    var qp4 = FE(),
        Np4 = TF(),
        Lp4 = (A) => {
            return A?.logger?.debug("@smithy/credential-provider-imds", "fromInstanceMetadata"), async () => Np4.fromInstanceMetadata(A)().then((B) => qp4.setCredentialFeature(B, "CREDENTIALS_IMDS", "0"))
        };
    Bq2.fromInstanceMetadata = Lp4
});
var Xq2 = E((nR5, Jq2) => {
    var {
        create: Mp4,
        defineProperty: T51,
        getOwnPropertyDescriptor: Rp4,
        getOwnPropertyNames: Op4,
        getPrototypeOf: Tp4
    } = Object, Pp4 = Object.prototype.hasOwnProperty, wR1 = (A, B) => T51(A, "name", {
        value: B,
        configurable: !0
    }), Sp4 = (A, B) => {
        for (var Q in B) T51(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Fq2 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Op4(B))
                if (!Pp4.call(A, D) && D !== Q) T51(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Rp4(B, D)) || Z.enumerable
                })
        }
        return A
    }, To = (A, B, Q) => (Q = A != null ? Mp4(Tp4(A)) : {}, Fq2(B || !A || !A.__esModule ? T51(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), jp4 = (A) => Fq2(T51({}, "__esModule", {
        value: !0
    }), A), Iq2 = {};
    Sp4(Iq2, {
        credentialsTreatedAsExpired: () => Wq2,
        credentialsWillNeedRefresh: () => Yq2,
        defaultProvider: () => _p4
    });
    Jq2.exports = jp4(Iq2);
    var kG0 = NM1(),
        kp4 = I3(),
        Nu = A9(),
        Dq2 = "AWS_EC2_METADATA_DISABLED",
        yp4 = wR1(async (A) => {
            let {
                ENV_CMDS_FULL_URI: B,
                ENV_CMDS_RELATIVE_URI: Q,
                fromContainerMetadata: Z,
                fromInstanceMetadata: D
            } = await Promise.resolve().then(() => To(TF()));
            if (process.env[Q] || process.env[B]) {
                A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
                let {
                    fromHttp: G
                } = await Promise.resolve().then(() => To($M1()));
                return Nu.chain(G(A), Z(A))
            }
            if (process.env[Dq2] && process.env[Dq2] !== "false") return async () => {
                throw new Nu.CredentialsProviderError("EC2 Instance Metadata Service access disabled", {
                    logger: A.logger
                })
            };
            return A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata"), D(A)
        }, "remoteProvider"),
        Gq2 = !1,
        _p4 = wR1((A = {}) => Nu.memoize(Nu.chain(async () => {
            if (A.profile ?? process.env[kp4.ENV_PROFILE]) {
                if (process.env[kG0.ENV_KEY] && process.env[kG0.ENV_SECRET]) {
                    if (!Gq2)(A.logger?.warn && A.logger?.constructor?.name !== "NoOpLogger" ? A.logger.warn : console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`), Gq2 = !0
                }
                throw new Nu.CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.", {
                    logger: A.logger,
                    tryNextLink: !0
                })
            }
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv"), kG0.fromEnv(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
            let {
                ssoStartUrl: B,
                ssoAccountId: Q,
                ssoRegion: Z,
                ssoRoleName: D,
                ssoSession: G
            } = A;
            if (!B && !Q && !Z && !D && !G) throw new Nu.CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).", {
                logger: A.logger
            });
            let {
                fromSSO: F
            } = await Promise.resolve().then(() => To(ER1()));
            return F(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
            let {
                fromIni: B
            } = await Promise.resolve().then(() => To(jG0()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
            let {
                fromProcess: B
            } = await Promise.resolve().then(() => To(QR1()));
            return B(A)()
        }, async () => {
            A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
            let {
                fromTokenFile: B
            } = await Promise.resolve().then(() => To(M51()));
            return B(A)()
        }, async () => {
            return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider"), (await yp4(A))()
        }, async () => {
            throw new Nu.CredentialsProviderError("Could not load credentials from any providers", {
                tryNextLink: !1,
                logger: A.logger
            })
        }), Wq2, Yq2), "defaultProvider"),
        Yq2 = wR1((A) => A?.expiration !== void 0, "credentialsWillNeedRefresh"),
        Wq2 = wR1((A) => A?.expiration !== void 0 && A.expiration.getTime() - Date.now() < 300000, "credentialsTreatedAsExpired")
});
var yG0 = E((Vq2) => {
    Object.defineProperty(Vq2, "__esModule", {
        value: !0
    });
    Vq2.fromNodeProviderChain = void 0;
    var xp4 = Xq2(),
        vp4 = (A = {}) => xp4.defaultProvider({
            ...A
        });
    Vq2.fromNodeProviderChain = vp4
});
var zq2 = E((Kq2) => {
    Object.defineProperty(Kq2, "__esModule", {
        value: !0
    });
    Kq2.fromProcess = void 0;
    var bp4 = QR1(),
        fp4 = (A) => bp4.fromProcess(A);
    Kq2.fromProcess = fp4
});
var wq2 = E((Eq2) => {
    Object.defineProperty(Eq2, "__esModule", {
        value: !0
    });
    Eq2.fromSSO = void 0;
    var hp4 = ER1(),
        gp4 = (A = {}) => {
            return hp4.fromSSO({
                ...A
            })
        };
    Eq2.fromSSO = gp4
});
var qq2 = E(($R1) => {
    Object.defineProperty($R1, "__esModule", {
        value: !0
    });
    $R1.STSClient = $R1.AssumeRoleCommand = void 0;
    var $q2 = AR1();
    Object.defineProperty($R1, "AssumeRoleCommand", {
        enumerable: !0,
        get: function() {
            return $q2.AssumeRoleCommand
        }
    });
    Object.defineProperty($R1, "STSClient", {
        enumerable: !0,
        get: function() {
            return $q2.STSClient
        }
    })
});