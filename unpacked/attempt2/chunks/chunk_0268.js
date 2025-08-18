/* chunk:268 bytes:[5751634, 5768261) size:16627 source:unpacked-cli.js */
var kZ0 = E((nL5, QC2) => {
    var {
        defineProperty: VM1,
        getOwnPropertyDescriptor: Hx4,
        getOwnPropertyNames: iV2
    } = Object, zx4 = Object.prototype.hasOwnProperty, PK = (A, B) => VM1(A, "name", {
        value: B,
        configurable: !0
    }), Ex4 = (A, B) => function Q() {
        return A && (B = A[iV2(A)[0]](A = 0)), B
    }, nV2 = (A, B) => {
        for (var Q in B) VM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Ux4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of iV2(B))
                if (!zx4.call(A, D) && D !== Q) VM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Hx4(B, D)) || Z.enumerable
                })
        }
        return A
    }, wx4 = (A) => Ux4(VM1({}, "__esModule", {
        value: !0
    }), A), PZ0 = {};
    nV2(PZ0, {
        CognitoIdentityClient: () => XM1.CognitoIdentityClient,
        GetCredentialsForIdentityCommand: () => XM1.GetCredentialsForIdentityCommand,
        GetIdCommand: () => XM1.GetIdCommand
    });
    var XM1, aV2 = Ex4({
            "src/loadCognitoIdentity.ts"() {
                XM1 = pV2()
            }
        }),
        sV2 = {};
    nV2(sV2, {
        fromCognitoIdentity: () => jZ0,
        fromCognitoIdentityPool: () => AC2
    });
    QC2.exports = wx4(sV2);
    var CM1 = A9();

    function SZ0(A) {
        return Promise.all(Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            if (typeof Z === "string") B.push([Q, Z]);
            else B.push(Z().then((D) => [Q, D]));
            return B
        }, [])).then((B) => B.reduce((Q, [Z, D]) => {
            return Q[Z] = D, Q
        }, {}))
    }
    PK(SZ0, "resolveLogins");

    function jZ0(A) {
        return async (B) => {
            A.logger?.debug("@aws-sdk/credential-provider-cognito-identity - fromCognitoIdentity");
            let {
                GetCredentialsForIdentityCommand: Q,
                CognitoIdentityClient: Z
            } = await Promise.resolve().then(() => (aV2(), PZ0)), D = PK((W) => A.clientConfig?.[W] ?? A.parentClientConfig?.[W] ?? B?.callerClientConfig?.[W], "fromConfigs"), {
                Credentials: {
                    AccessKeyId: G = rV2(A.logger),
                    Expiration: F,
                    SecretKey: I = tV2(A.logger),
                    SessionToken: Y
                } = oV2(A.logger)
            } = await (A.client ?? new Z(Object.assign({}, A.clientConfig ?? {}, {
                region: D("region"),
                profile: D("profile")
            }))).send(new Q({
                CustomRoleArn: A.customRoleArn,
                IdentityId: A.identityId,
                Logins: A.logins ? await SZ0(A.logins) : void 0
            }));
            return {
                identityId: A.identityId,
                accessKeyId: G,
                secretAccessKey: I,
                sessionToken: Y,
                expiration: F
            }
        }
    }
    PK(jZ0, "fromCognitoIdentity");

    function rV2(A) {
        throw new CM1.CredentialsProviderError("Response from Amazon Cognito contained no access key ID", {
            logger: A
        })
    }
    PK(rV2, "throwOnMissingAccessKeyId");

    function oV2(A) {
        throw new CM1.CredentialsProviderError("Response from Amazon Cognito contained no credentials", {
            logger: A
        })
    }
    PK(oV2, "throwOnMissingCredentials");

    function tV2(A) {
        throw new CM1.CredentialsProviderError("Response from Amazon Cognito contained no secret key", {
            logger: A
        })
    }
    PK(tV2, "throwOnMissingSecretKey");
    var TZ0 = "IdentityIds",
        $x4 = class {
            constructor(A = "aws:cognito-identity-ids") {
                this.dbName = A
            }
            static {
                PK(this, "IndexedDbStorage")
            }
            getItem(A) {
                return this.withObjectStore("readonly", (B) => {
                    let Q = B.get(A);
                    return new Promise((Z) => {
                        Q.onerror = () => Z(null), Q.onsuccess = () => Z(Q.result ? Q.result.value : null)
                    })
                }).catch(() => null)
            }
            removeItem(A) {
                return this.withObjectStore("readwrite", (B) => {
                    let Q = B.delete(A);
                    return new Promise((Z, D) => {
                        Q.onerror = () => D(Q.error), Q.onsuccess = () => Z()
                    })
                })
            }
            setItem(A, B) {
                return this.withObjectStore("readwrite", (Q) => {
                    let Z = Q.put({
                        id: A,
                        value: B
                    });
                    return new Promise((D, G) => {
                        Z.onerror = () => G(Z.error), Z.onsuccess = () => D()
                    })
                })
            }
            getDb() {
                let A = self.indexedDB.open(this.dbName, 1);
                return new Promise((B, Q) => {
                    A.onsuccess = () => {
                        B(A.result)
                    }, A.onerror = () => {
                        Q(A.error)
                    }, A.onblocked = () => {
                        Q(new Error("Unable to access DB"))
                    }, A.onupgradeneeded = () => {
                        let Z = A.result;
                        Z.onerror = () => {
                            Q(new Error("Failed to create object store"))
                        }, Z.createObjectStore(TZ0, {
                            keyPath: "id"
                        })
                    }
                })
            }
            withObjectStore(A, B) {
                return this.getDb().then((Q) => {
                    let Z = Q.transaction(TZ0, A);
                    return Z.oncomplete = () => Q.close(), new Promise((D, G) => {
                        Z.onerror = () => G(Z.error), D(B(Z.objectStore(TZ0)))
                    }).catch((D) => {
                        throw Q.close(), D
                    })
                })
            }
        },
        qx4 = class {
            constructor(A = {}) {
                this.store = A
            }
            static {
                PK(this, "InMemoryStorage")
            }
            getItem(A) {
                if (A in this.store) return this.store[A];
                return null
            }
            removeItem(A) {
                delete this.store[A]
            }
            setItem(A, B) {
                this.store[A] = B
            }
        },
        Nx4 = new qx4;

    function eV2() {
        if (typeof self === "object" && self.indexedDB) return new $x4;
        if (typeof window === "object" && window.localStorage) return window.localStorage;
        return Nx4
    }
    PK(eV2, "localStorage");

    function AC2({
        accountId: A,
        cache: B = eV2(),
        client: Q,
        clientConfig: Z,
        customRoleArn: D,
        identityPoolId: G,
        logins: F,
        userIdentifier: I = !F || Object.keys(F).length === 0 ? "ANONYMOUS" : void 0,
        logger: Y,
        parentClientConfig: W
    }) {
        Y?.debug("@aws-sdk/credential-provider-cognito-identity - fromCognitoIdentity");
        let J = I ? `aws:cognito-identity-credentials:${G}:${I}` : void 0,
            X = PK(async (V) => {
                let {
                    GetIdCommand: C,
                    CognitoIdentityClient: K
                } = await Promise.resolve().then(() => (aV2(), PZ0)), H = PK((L) => Z?.[L] ?? W?.[L] ?? V?.callerClientConfig?.[L], "fromConfigs"), z = Q ?? new K(Object.assign({}, Z ?? {}, {
                    region: H("region"),
                    profile: H("profile")
                })), $ = J && await B.getItem(J);
                if (!$) {
                    let {
                        IdentityId: L = BC2(Y)
                    } = await z.send(new C({
                        AccountId: A,
                        IdentityPoolId: G,
                        Logins: F ? await SZ0(F) : void 0
                    }));
                    if ($ = L, J) Promise.resolve(B.setItem(J, $)).catch(() => {})
                }
                return X = jZ0({
                    client: z,
                    customRoleArn: D,
                    logins: F,
                    identityId: $
                }), X(V)
            }, "provider");
        return (V) => X(V).catch(async (C) => {
            if (J) Promise.resolve(B.removeItem(J)).catch(() => {});
            throw C
        })
    }
    PK(AC2, "fromCognitoIdentityPool");

    function BC2(A) {
        throw new CM1.CredentialsProviderError("Response from Amazon Cognito contained no identity ID", {
            logger: A
        })
    }
    PK(BC2, "throwOnMissingId")
});
var GC2 = E((ZC2) => {
    Object.defineProperty(ZC2, "__esModule", {
        value: !0
    });
    ZC2.fromCognitoIdentity = void 0;
    var Lx4 = kZ0(),
        Mx4 = (A) => Lx4.fromCognitoIdentity({
            ...A
        });
    ZC2.fromCognitoIdentity = Mx4
});
var YC2 = E((FC2) => {
    Object.defineProperty(FC2, "__esModule", {
        value: !0
    });
    FC2.fromCognitoIdentityPool = void 0;
    var Rx4 = kZ0(),
        Ox4 = (A) => Rx4.fromCognitoIdentityPool({
            ...A
        });
    FC2.fromCognitoIdentityPool = Ox4
});
var XC2 = E((WC2) => {
    Object.defineProperty(WC2, "__esModule", {
        value: !0
    });
    WC2.fromContainerMetadata = void 0;
    var Tx4 = TF(),
        Px4 = (A) => {
            return A?.logger?.debug("@smithy/credential-provider-imds", "fromContainerMetadata"), Tx4.fromContainerMetadata(A)
        };
    WC2.fromContainerMetadata = Px4
});
var FE = E((eL5, zC2) => {
    var {
        defineProperty: KM1,
        getOwnPropertyDescriptor: Sx4,
        getOwnPropertyNames: jx4
    } = Object, kx4 = Object.prototype.hasOwnProperty, HM1 = (A, B) => KM1(A, "name", {
        value: B,
        configurable: !0
    }), yx4 = (A, B) => {
        for (var Q in B) KM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, _x4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of jx4(B))
                if (!kx4.call(A, D) && D !== Q) KM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Sx4(B, D)) || Z.enumerable
                })
        }
        return A
    }, xx4 = (A) => _x4(KM1({}, "__esModule", {
        value: !0
    }), A), VC2 = {};
    yx4(VC2, {
        emitWarningIfUnsupportedVersion: () => vx4,
        setCredentialFeature: () => CC2,
        setFeature: () => KC2,
        setTokenFeature: () => HC2,
        state: () => yZ0
    });
    zC2.exports = xx4(VC2);
    var yZ0 = {
            warningEmitted: !1
        },
        vx4 = HM1((A) => {
            if (A && !yZ0.warningEmitted && parseInt(A.substring(1, A.indexOf("."))) < 18) yZ0.warningEmitted = !0, process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`)
        }, "emitWarningIfUnsupportedVersion");

    function CC2(A, B, Q) {
        if (!A.$source) A.$source = {};
        return A.$source[B] = Q, A
    }
    HM1(CC2, "setCredentialFeature");

    function KC2(A, B, Q) {
        if (!A.__aws_sdk_context) A.__aws_sdk_context = {
            features: {}
        };
        else if (!A.__aws_sdk_context.features) A.__aws_sdk_context.features = {};
        A.__aws_sdk_context.features[B] = Q
    }
    HM1(KC2, "setFeature");

    function HC2(A, B, Q) {
        if (!A.$source) A.$source = {};
        return A.$source[B] = Q, A
    }
    HM1(HC2, "setTokenFeature")
});
var wC2 = E((EC2) => {
    Object.defineProperty(EC2, "__esModule", {
        value: !0
    });
    EC2.checkUrl = void 0;
    var bx4 = A9(),
        fx4 = "169.254.170.2",
        hx4 = "169.254.170.23",
        gx4 = "[fd00:ec2::23]",
        ux4 = (A, B) => {
            if (A.protocol === "https:") return;
            if (A.hostname === fx4 || A.hostname === hx4 || A.hostname === gx4) return;
            if (A.hostname.includes("[")) {
                if (A.hostname === "[::1]" || A.hostname === "[0000:0000:0000:0000:0000:0000:0000:0001]") return
            } else {
                if (A.hostname === "localhost") return;
                let Q = A.hostname.split("."),
                    Z = (D) => {
                        let G = parseInt(D, 10);
                        return 0 <= G && G <= 255
                    };
                if (Q[0] === "127" && Z(Q[1]) && Z(Q[2]) && Z(Q[3]) && Q.length === 4) return
            }
            throw new bx4.CredentialsProviderError(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`, {
                logger: B
            })
        };
    EC2.checkUrl = ux4
});
var _Z0 = E((BM5, PC2) => {
    var {
        defineProperty: zM1,
        getOwnPropertyDescriptor: mx4,
        getOwnPropertyNames: dx4
    } = Object, cx4 = Object.prototype.hasOwnProperty, EM1 = (A, B) => zM1(A, "name", {
        value: B,
        configurable: !0
    }), lx4 = (A, B) => {
        for (var Q in B) zM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, px4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of dx4(B))
                if (!cx4.call(A, D) && D !== Q) zM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = mx4(B, D)) || Z.enumerable
                })
        }
        return A
    }, ix4 = (A) => px4(zM1({}, "__esModule", {
        value: !0
    }), A), $C2 = {};
    lx4($C2, {
        AlgorithmId: () => MC2,
        EndpointURLScheme: () => LC2,
        FieldPosition: () => RC2,
        HttpApiKeyAuthLocation: () => NC2,
        HttpAuthLocation: () => qC2,
        IniSectionType: () => OC2,
        RequestHandlerProtocol: () => TC2,
        SMITHY_CONTEXT_KEY: () => ox4,
        getDefaultClientConfiguration: () => sx4,
        resolveDefaultRuntimeConfig: () => rx4
    });
    PC2.exports = ix4($C2);
    var qC2 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(qC2 || {}),
        NC2 = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(NC2 || {}),
        LC2 = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(LC2 || {}),
        MC2 = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(MC2 || {}),
        nx4 = EM1((A) => {
            let B = [];
            if (A.sha256 !== void 0) B.push({
                algorithmId: () => "sha256",
                checksumConstructor: () => A.sha256
            });
            if (A.md5 != null) B.push({
                algorithmId: () => "md5",
                checksumConstructor: () => A.md5
            });
            return {
                addChecksumAlgorithm(Q) {
                    B.push(Q)
                },
                checksumAlgorithms() {
                    return B
                }
            }
        }, "getChecksumConfiguration"),
        ax4 = EM1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        sx4 = EM1((A) => {
            return nx4(A)
        }, "getDefaultClientConfiguration"),
        rx4 = EM1((A) => {
            return ax4(A)
        }, "resolveDefaultRuntimeConfig"),
        RC2 = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(RC2 || {}),
        ox4 = "__smithy_context",
        OC2 = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(OC2 || {}),
        TC2 = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(TC2 || {})
});