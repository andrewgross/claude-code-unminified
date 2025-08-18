/* chunk:119 bytes:[2706845, 2726405) size:19560 source:unpacked-cli.js */
var y10 = E((N45, WLA) => {
    var {
        defineProperty: vE1,
        getOwnPropertyDescriptor: RNQ,
        getOwnPropertyNames: ONQ
    } = Object, TNQ = Object.prototype.hasOwnProperty, k10 = (A, B) => vE1(A, "name", {
        value: B,
        configurable: !0
    }), PNQ = (A, B) => {
        for (var Q in B) vE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, SNQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ONQ(B))
                if (!TNQ.call(A, D) && D !== Q) vE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = RNQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, jNQ = (A) => SNQ(vE1({}, "__esModule", {
        value: !0
    }), A), YLA = {};
    PNQ(YLA, {
        fromProcess: () => bNQ
    });
    WLA.exports = jNQ(YLA);
    var ILA = I3(),
        j10 = A9(),
        kNQ = W1("child_process"),
        yNQ = W1("util"),
        _NQ = jN(),
        xNQ = k10((A, B, Q) => {
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
            return _NQ.setCredentialFeature(D, "CREDENTIALS_PROCESS", "w"), D
        }, "getValidatedProcessCredentials"),
        vNQ = k10(async (A, B, Q) => {
            let Z = B[A];
            if (B[A]) {
                let D = Z.credential_process;
                if (D !== void 0) {
                    let G = yNQ.promisify(kNQ.exec);
                    try {
                        let {
                            stdout: F
                        } = await G(D), I;
                        try {
                            I = JSON.parse(F.trim())
                        } catch {
                            throw Error(`Profile ${A} credential_process returned invalid JSON.`)
                        }
                        return xNQ(A, I, B)
                    } catch (F) {
                        throw new j10.CredentialsProviderError(F.message, {
                            logger: Q
                        })
                    }
                } else throw new j10.CredentialsProviderError(`Profile ${A} did not contain credential_process.`, {
                    logger: Q
                })
            } else throw new j10.CredentialsProviderError(`Profile ${A} could not be found in shared credentials file.`, {
                logger: Q
            })
        }, "resolveProcessCredentials"),
        bNQ = k10((A = {}) => async ({
            callerClientConfig: B
        } = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
            let Q = await ILA.parseKnownFiles(A);
            return vNQ(ILA.getProfileName({
                profile: A.profile ?? B?.profile
            }), Q, A.logger)
        }, "fromProcess")
});
var _10 = E((hN) => {
    var fNQ = hN && hN.__createBinding || (Object.create ? function(A, B, Q, Z) {
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
        hNQ = hN && hN.__setModuleDefault || (Object.create ? function(A, B) {
            Object.defineProperty(A, "default", {
                enumerable: !0,
                value: B
            })
        } : function(A, B) {
            A.default = B
        }),
        gNQ = hN && hN.__importStar || function(A) {
            if (A && A.__esModule) return A;
            var B = {};
            if (A != null) {
                for (var Q in A)
                    if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) fNQ(B, A, Q)
            }
            return hNQ(B, A), B
        };
    Object.defineProperty(hN, "__esModule", {
        value: !0
    });
    hN.fromWebToken = void 0;
    var uNQ = (A) => async (B) => {
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
            } = await Promise.resolve().then(() => gNQ(S10()));
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
    hN.fromWebToken = uNQ
});
var CLA = E((XLA) => {
    Object.defineProperty(XLA, "__esModule", {
        value: !0
    });
    XLA.fromTokenFile = void 0;
    var mNQ = jN(),
        dNQ = A9(),
        cNQ = W1("fs"),
        lNQ = _10(),
        JLA = "AWS_WEB_IDENTITY_TOKEN_FILE",
        pNQ = "AWS_ROLE_ARN",
        iNQ = "AWS_ROLE_SESSION_NAME",
        nNQ = (A = {}) => async () => {
            A.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
            let B = A?.webIdentityTokenFile ?? process.env[JLA],
                Q = A?.roleArn ?? process.env[pNQ],
                Z = A?.roleSessionName ?? process.env[iNQ];
            if (!B || !Q) throw new dNQ.CredentialsProviderError("Web identity configuration not specified", {
                logger: A.logger
            });
            let D = await lNQ.fromWebToken({
                ...A,
                webIdentityToken: cNQ.readFileSync(B, {
                    encoding: "ascii"
                }),
                roleArn: Q,
                roleSessionName: Z
            })();
            if (B === process.env[JLA]) mNQ.setCredentialFeature(D, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
            return D
        };
    XLA.fromTokenFile = nNQ
});
var b10 = E((R45, bE1) => {
    var {
        defineProperty: KLA,
        getOwnPropertyDescriptor: aNQ,
        getOwnPropertyNames: sNQ
    } = Object, rNQ = Object.prototype.hasOwnProperty, x10 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of sNQ(B))
                if (!rNQ.call(A, D) && D !== Q) KLA(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = aNQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, HLA = (A, B, Q) => (x10(A, B, "default"), Q && x10(Q, B, "default")), oNQ = (A) => x10(KLA({}, "__esModule", {
        value: !0
    }), A), v10 = {};
    bE1.exports = oNQ(v10);
    HLA(v10, CLA(), bE1.exports);
    HLA(v10, _10(), bE1.exports)
});
var LLA = E((O45, NLA) => {
    var {
        create: tNQ,
        defineProperty: bQ1,
        getOwnPropertyDescriptor: eNQ,
        getOwnPropertyNames: ALQ,
        getPrototypeOf: BLQ
    } = Object, QLQ = Object.prototype.hasOwnProperty, pG = (A, B) => bQ1(A, "name", {
        value: B,
        configurable: !0
    }), ZLQ = (A, B) => {
        for (var Q in B) bQ1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, wLA = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ALQ(B))
                if (!QLQ.call(A, D) && D !== Q) bQ1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = eNQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, nk = (A, B, Q) => (Q = A != null ? tNQ(BLQ(A)) : {}, wLA(B || !A || !A.__esModule ? bQ1(Q, "default", {
        value: A,
        enumerable: !0
    }) : Q, A)), DLQ = (A) => wLA(bQ1({}, "__esModule", {
        value: !0
    }), A), $LA = {};
    ZLQ($LA, {
        fromIni: () => zLQ
    });
    NLA.exports = DLQ($LA);
    var h10 = I3(),
        ak = jN(),
        vQ1 = A9(),
        GLQ = pG((A, B, Q) => {
            let Z = {
                EcsContainer: pG(async (D) => {
                    let {
                        fromHttp: G
                    } = await Promise.resolve().then(() => nk(Vt1())), {
                        fromContainerMetadata: F
                    } = await Promise.resolve().then(() => nk(TF()));
                    return Q?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer"), async () => vQ1.chain(G(D ?? {}), F(D))().then(f10)
                }, "EcsContainer"),
                Ec2InstanceMetadata: pG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");
                    let {
                        fromInstanceMetadata: G
                    } = await Promise.resolve().then(() => nk(TF()));
                    return async () => G(D)().then(f10)
                }, "Ec2InstanceMetadata"),
                Environment: pG(async (D) => {
                    Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");
                    let {
                        fromEnv: G
                    } = await Promise.resolve().then(() => nk(so1()));
                    return async () => G(D)().then(f10)
                }, "Environment")
            };
            if (A in Z) return Z[A];
            else throw new vQ1.CredentialsProviderError(`Unsupported credential source in profile ${B}. Got ${A}, expected EcsContainer or Ec2InstanceMetadata or Environment.`, {
                logger: Q
            })
        }, "resolveCredentialSource"),
        f10 = pG((A) => ak.setCredentialFeature(A, "CREDENTIALS_PROFILE_NAMED_PROVIDER", "p"), "setNamedProvider"),
        FLQ = pG((A, {
            profile: B = "default",
            logger: Q
        } = {}) => {
            return Boolean(A) && typeof A === "object" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1 && ["undefined", "string"].indexOf(typeof A.external_id) > -1 && ["undefined", "string"].indexOf(typeof A.mfa_serial) > -1 && (ILQ(A, {
                profile: B,
                logger: Q
            }) || YLQ(A, {
                profile: B,
                logger: Q
            }))
        }, "isAssumeRoleProfile"),
        ILQ = pG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.source_profile === "string" && typeof A.credential_source === "undefined";
            if (Z) Q?.debug?.(`    ${B} isAssumeRoleWithSourceProfile source_profile=${A.source_profile}`);
            return Z
        }, "isAssumeRoleWithSourceProfile"),
        YLQ = pG((A, {
            profile: B,
            logger: Q
        }) => {
            let Z = typeof A.credential_source === "string" && typeof A.source_profile === "undefined";
            if (Z) Q?.debug?.(`    ${B} isCredentialSourceProfile credential_source=${A.credential_source}`);
            return Z
        }, "isCredentialSourceProfile"),
        WLQ = pG(async (A, B, Q, Z = {}) => {
            Q.logger?.debug("@aws-sdk/credential-provider-ini - resolveAssumeRoleCredentials (STS)");
            let D = B[A],
                {
                    source_profile: G,
                    region: F
                } = D;
            if (!Q.roleAssumer) {
                let {
                    getDefaultRoleAssumer: Y
                } = await Promise.resolve().then(() => nk(S10()));
                Q.roleAssumer = Y({
                    ...Q.clientConfig,
                    credentialProviderLogger: Q.logger,
                    parentClientConfig: {
                        ...Q?.parentClientConfig,
                        region: F ?? Q?.parentClientConfig?.region
                    }
                }, Q.clientPlugins)
            }
            if (G && G in Z) throw new vQ1.CredentialsProviderError(`Detected a cycle attempting to resolve credentials for profile ${h10.getProfileName(Q)}. Profiles visited: ` + Object.keys(Z).join(", "), {
                logger: Q.logger
            });
            Q.logger?.debug(`@aws-sdk/credential-provider-ini - finding credential resolver using ${G?`source_profile=[${G}]`:`profile=[${A}]`}`);
            let I = G ? qLA(G, B, Q, {
                ...Z,
                [G]: !0
            }, zLA(B[G] ?? {})) : (await GLQ(D.credential_source, A, Q.logger)(Q))();
            if (zLA(D)) return I.then((Y) => ak.setCredentialFeature(Y, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
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
                    if (!Q.mfaCodeProvider) throw new vQ1.CredentialsProviderError(`Profile ${A} requires multi-factor authentication, but no MFA code callback was provided.`, {
                        logger: Q.logger,
                        tryNextLink: !1
                    });
                    Y.SerialNumber = W, Y.TokenCode = await Q.mfaCodeProvider(W)
                }
                let J = await I;
                return Q.roleAssumer(J, Y).then((X) => ak.setCredentialFeature(X, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"))
            }
        }, "resolveAssumeRoleCredentials"),
        zLA = pG((A) => {
            return !A.role_arn && !!A.credential_source
        }, "isCredentialSourceWithoutRoleArn"),
        JLQ = pG((A) => Boolean(A) && typeof A === "object" && typeof A.credential_process === "string", "isProcessProfile"),
        XLQ = pG(async (A, B) => Promise.resolve().then(() => nk(y10())).then(({
            fromProcess: Q
        }) => Q({
            ...A,
            profile: B
        })().then((Z) => ak.setCredentialFeature(Z, "CREDENTIALS_PROFILE_PROCESS", "v"))), "resolveProcessCredentials"),
        VLQ = pG(async (A, B, Q = {}) => {
            let {
                fromSSO: Z
            } = await Promise.resolve().then(() => nk(le1()));
            return Z({
                profile: A,
                logger: Q.logger,
                parentClientConfig: Q.parentClientConfig,
                clientConfig: Q.clientConfig
            })().then((D) => {
                if (B.sso_session) return ak.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO", "r");
                else return ak.setCredentialFeature(D, "CREDENTIALS_PROFILE_SSO_LEGACY", "t")
            })
        }, "resolveSsoCredentials"),
        CLQ = pG((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
        ELA = pG((A) => Boolean(A) && typeof A === "object" && typeof A.aws_access_key_id === "string" && typeof A.aws_secret_access_key === "string" && ["undefined", "string"].indexOf(typeof A.aws_session_token) > -1 && ["undefined", "string"].indexOf(typeof A.aws_account_id) > -1, "isStaticCredsProfile"),
        ULA = pG(async (A, B) => {
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
            return ak.setCredentialFeature(Q, "CREDENTIALS_PROFILE", "n")
        }, "resolveStaticCredentials"),
        KLQ = pG((A) => Boolean(A) && typeof A === "object" && typeof A.web_identity_token_file === "string" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1, "isWebIdentityProfile"),
        HLQ = pG(async (A, B) => Promise.resolve().then(() => nk(b10())).then(({
            fromTokenFile: Q
        }) => Q({
            webIdentityTokenFile: A.web_identity_token_file,
            roleArn: A.role_arn,
            roleSessionName: A.role_session_name,
            roleAssumerWithWebIdentity: B.roleAssumerWithWebIdentity,
            logger: B.logger,
            parentClientConfig: B.parentClientConfig
        })().then((Z) => ak.setCredentialFeature(Z, "CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN", "q"))), "resolveWebIdentityCredentials"),
        qLA = pG(async (A, B, Q, Z = {}, D = !1) => {
            let G = B[A];
            if (Object.keys(Z).length > 0 && ELA(G)) return ULA(G, Q);
            if (D || FLQ(G, {
                    profile: A,
                    logger: Q.logger
                })) return WLQ(A, B, Q, Z);
            if (ELA(G)) return ULA(G, Q);
            if (KLQ(G)) return HLQ(G, Q);
            if (JLQ(G)) return XLQ(Q, A);
            if (CLQ(G)) return await VLQ(A, G, Q);
            throw new vQ1.CredentialsProviderError(`Could not resolve credentials using profile: [${A}] in configuration/credentials file(s).`, {
                logger: Q.logger
            })
        }, "resolveProfileData"),
        zLQ = pG((A = {}) => async ({
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
            let Z = await h10.parseKnownFiles(Q);
            return qLA(h10.getProfileName({
                profile: A.profile ?? B?.profile
            }), Z, Q)
        }, "fromIni")
});