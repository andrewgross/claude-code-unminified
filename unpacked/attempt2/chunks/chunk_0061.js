/* chunk:61 bytes:[1468726, 1483693) size:14967 source:unpacked-cli.js */
var Na1 = E((k15, o9A) => {
    var {
        defineProperty: jK1,
        getOwnPropertyDescriptor: Wp9,
        getOwnPropertyNames: Jp9
    } = Object, Xp9 = Object.prototype.hasOwnProperty, iD = (A, B) => jK1(A, "name", {
        value: B,
        configurable: !0
    }), Vp9 = (A, B) => {
        for (var Q in B) jK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Cp9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Jp9(B))
                if (!Xp9.call(A, D) && D !== Q) jK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Wp9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Kp9 = (A) => Cp9(jK1({}, "__esModule", {
        value: !0
    }), A), i9A = {};
    Vp9(i9A, {
        AWSSDKSigV4Signer: () => Up9,
        AwsSdkSigV4ASigner: () => $p9,
        AwsSdkSigV4Signer: () => qa1,
        NODE_AUTH_SCHEME_PREFERENCE_OPTIONS: () => qp9,
        NODE_SIGV4A_CONFIG_OPTIONS: () => Mp9,
        getBearerTokenEnvKey: () => n9A,
        resolveAWSSDKSigV4Config: () => Op9,
        resolveAwsSdkSigV4AConfig: () => Lp9,
        resolveAwsSdkSigV4Config: () => a9A,
        validateSigningProperties: () => $a1
    });
    o9A.exports = Kp9(i9A);
    var Hp9 = CV(),
        zp9 = CV(),
        g9A = iD((A) => zp9.HttpResponse.isInstance(A) ? A.headers?.date ?? A.headers?.Date : void 0, "getDateHeader"),
        wa1 = iD((A) => new Date(Date.now() + A), "getSkewCorrectedDate"),
        Ep9 = iD((A, B) => Math.abs(wa1(B).getTime() - A) >= 300000, "isClockSkewed"),
        u9A = iD((A, B) => {
            let Q = Date.parse(A);
            if (Ep9(Q, B)) return Q - Date.now();
            return B
        }, "getUpdatedSystemClockOffset"),
        L91 = iD((A, B) => {
            if (!B) throw new Error(`Property \`${A}\` is not resolved for AWS SDK SigV4Auth`);
            return B
        }, "throwSigningPropertyError"),
        $a1 = iD(async (A) => {
            let B = L91("context", A.context),
                Q = L91("config", A.config),
                Z = B.endpointV2?.properties?.authSchemes?.[0],
                G = await L91("signer", Q.signer)(Z),
                F = A?.signingRegion,
                I = A?.signingRegionSet,
                Y = A?.signingName;
            return {
                config: Q,
                signer: G,
                signingRegion: F,
                signingRegionSet: I,
                signingName: Y
            }
        }, "validateSigningProperties"),
        qa1 = class {
            static {
                iD(this, "AwsSdkSigV4Signer")
            }
            async sign(A, B, Q) {
                if (!Hp9.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let Z = await $a1(Q),
                    {
                        config: D,
                        signer: G
                    } = Z,
                    {
                        signingRegion: F,
                        signingName: I
                    } = Z,
                    Y = Q.context;
                if (Y?.authSchemes?.length ?? 0 > 1) {
                    let [J, X] = Y.authSchemes;
                    if (J?.name === "sigv4a" && X?.name === "sigv4") F = X?.signingRegion ?? F, I = X?.signingName ?? I
                }
                return await G.sign(A, {
                    signingDate: wa1(D.systemClockOffset),
                    signingRegion: F,
                    signingService: I
                })
            }
            errorHandler(A) {
                return (B) => {
                    let Q = B.ServerTime ?? g9A(B.$response);
                    if (Q) {
                        let Z = L91("config", A.config),
                            D = Z.systemClockOffset;
                        if (Z.systemClockOffset = u9A(Q, Z.systemClockOffset), Z.systemClockOffset !== D && B.$metadata) B.$metadata.clockSkewCorrected = !0
                    }
                    throw B
                }
            }
            successHandler(A, B) {
                let Q = g9A(A);
                if (Q) {
                    let Z = L91("config", B.config);
                    Z.systemClockOffset = u9A(Q, Z.systemClockOffset)
                }
            }
        },
        Up9 = qa1,
        wp9 = CV(),
        $p9 = class extends qa1 {
            static {
                iD(this, "AwsSdkSigV4ASigner")
            }
            async sign(A, B, Q) {
                if (!wp9.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let {
                    config: Z,
                    signer: D,
                    signingRegion: G,
                    signingRegionSet: F,
                    signingName: I
                } = await $a1(Q), W = (await Z.sigv4aSigningRegionSet?.() ?? F ?? [G]).join(",");
                return await D.sign(A, {
                    signingDate: wa1(Z.systemClockOffset),
                    signingRegion: W,
                    signingService: I
                })
            }
        },
        m9A = iD((A) => typeof A === "string" && A.length > 0 ? A.split(",").map((B) => B.trim()) : [], "getArrayForCommaSeparatedString"),
        n9A = iD((A) => `AWS_BEARER_TOKEN_${A.replace(/[\s-]/g,"_").toUpperCase()}`, "getBearerTokenEnvKey"),
        d9A = "AWS_AUTH_SCHEME_PREFERENCE",
        c9A = "auth_scheme_preference",
        qp9 = {
            environmentVariableSelector: iD((A, B) => {
                if (B?.signingName) {
                    if (n9A(B.signingName) in A) return ["httpBearerAuth"]
                }
                if (!(d9A in A)) return;
                return m9A(A[d9A])
            }, "environmentVariableSelector"),
            configFileSelector: iD((A) => {
                if (!(c9A in A)) return;
                return m9A(A[c9A])
            }, "configFileSelector"),
            default: []
        },
        Np9 = HB(),
        l9A = A9(),
        Lp9 = iD((A) => {
            return A.sigv4aSigningRegionSet = Np9.normalizeProvider(A.sigv4aSigningRegionSet), A
        }, "resolveAwsSdkSigV4AConfig"),
        Mp9 = {
            environmentVariableSelector(A) {
                if (A.AWS_SIGV4A_SIGNING_REGION_SET) return A.AWS_SIGV4A_SIGNING_REGION_SET.split(",").map((B) => B.trim());
                throw new l9A.ProviderError("AWS_SIGV4A_SIGNING_REGION_SET not set in env.", {
                    tryNextLink: !0
                })
            },
            configFileSelector(A) {
                if (A.sigv4a_signing_region_set) return (A.sigv4a_signing_region_set ?? "").split(",").map((B) => B.trim());
                throw new l9A.ProviderError("sigv4a_signing_region_set not set in profile.", {
                    tryNextLink: !0
                })
            },
            default: void 0
        },
        Rp9 = Xw(),
        qh = HB(),
        p9A = h9A(),
        a9A = iD((A) => {
            let B = A.credentials,
                Q = !!A.credentials,
                Z = void 0;
            Object.defineProperty(A, "credentials", {
                set(W) {
                    if (W && W !== B && W !== Z) Q = !0;
                    B = W;
                    let J = s9A(A, {
                            credentials: B,
                            credentialDefaultProvider: A.credentialDefaultProvider
                        }),
                        X = r9A(A, J);
                    if (Q && !X.attributed) Z = iD(async (V) => X(V).then((C) => Rp9.setCredentialFeature(C, "CREDENTIALS_CODE", "e")), "resolvedCredentials"), Z.memoized = X.memoized, Z.configBound = X.configBound, Z.attributed = !0;
                    else Z = X
                },
                get() {
                    return Z
                },
                enumerable: !0,
                configurable: !0
            }), A.credentials = B;
            let {
                signingEscapePath: D = !0,
                systemClockOffset: G = A.systemClockOffset || 0,
                sha256: F
            } = A, I;
            if (A.signer) I = qh.normalizeProvider(A.signer);
            else if (A.regionInfoProvider) I = iD(() => qh.normalizeProvider(A.region)().then(async (W) => [await A.regionInfoProvider(W, {
                useFipsEndpoint: await A.useFipsEndpoint(),
                useDualstackEndpoint: await A.useDualstackEndpoint()
            }) || {}, W]).then(([W, J]) => {
                let {
                    signingRegion: X,
                    signingService: V
                } = W;
                A.signingRegion = A.signingRegion || X || J, A.signingName = A.signingName || V || A.serviceId;
                let C = {
                    ...A,
                    credentials: A.credentials,
                    region: A.signingRegion,
                    service: A.signingName,
                    sha256: F,
                    uriEscapePath: D
                };
                return new(A.signerConstructor || p9A.SignatureV4)(C)
            }), "signer");
            else I = iD(async (W) => {
                W = Object.assign({}, {
                    name: "sigv4",
                    signingName: A.signingName || A.defaultSigningName,
                    signingRegion: await qh.normalizeProvider(A.region)(),
                    properties: {}
                }, W);
                let {
                    signingRegion: J,
                    signingName: X
                } = W;
                A.signingRegion = A.signingRegion || J, A.signingName = A.signingName || X || A.serviceId;
                let V = {
                    ...A,
                    credentials: A.credentials,
                    region: A.signingRegion,
                    service: A.signingName,
                    sha256: F,
                    uriEscapePath: D
                };
                return new(A.signerConstructor || p9A.SignatureV4)(V)
            }, "signer");
            return Object.assign(A, {
                systemClockOffset: G,
                signingEscapePath: D,
                signer: I
            })
        }, "resolveAwsSdkSigV4Config"),
        Op9 = a9A;

    function s9A(A, {
        credentials: B,
        credentialDefaultProvider: Q
    }) {
        let Z;
        if (B)
            if (!B?.memoized) Z = qh.memoizeIdentityProvider(B, qh.isIdentityExpired, qh.doesIdentityRequireRefresh);
            else Z = B;
        else if (Q) Z = qh.normalizeProvider(Q(Object.assign({}, A, {
            parentClientConfig: A
        })));
        else Z = iD(async () => {
            throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.")
        }, "credentialsProvider");
        return Z.memoized = !0, Z
    }
    iD(s9A, "normalizeCredentialProvider");

    function r9A(A, B) {
        if (B.configBound) return B;
        let Q = iD(async (Z) => B({
            ...Z,
            callerClientConfig: A
        }), "fn");
        return Q.memoized = B.memoized, Q.configBound = !0, Q
    }
    iD(r9A, "bindCallerConfig")
});
var KY = E((x15, AQA) => {
    var {
        defineProperty: kK1,
        getOwnPropertyDescriptor: Tp9,
        getOwnPropertyNames: Pp9
    } = Object, Sp9 = Object.prototype.hasOwnProperty, jp9 = (A, B) => kK1(A, "name", {
        value: B,
        configurable: !0
    }), kp9 = (A, B) => {
        for (var Q in B) kK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, yp9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Pp9(B))
                if (!Sp9.call(A, D) && D !== Q) kK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Tp9(B, D)) || Z.enumerable
                })
        }
        return A
    }, _p9 = (A) => yp9(kK1({}, "__esModule", {
        value: !0
    }), A), e9A = {};
    kp9(e9A, {
        calculateBodyLength: () => xp9
    });
    AQA.exports = _p9(e9A);
    var t9A = typeof TextEncoder == "function" ? new TextEncoder : null,
        xp9 = jp9((A) => {
            if (typeof A === "string") {
                if (t9A) return t9A.encode(A).byteLength;
                let B = A.length;
                for (let Q = B - 1; Q >= 0; Q--) {
                    let Z = A.charCodeAt(Q);
                    if (Z > 127 && Z <= 2047) B++;
                    else if (Z > 2047 && Z <= 65535) B += 2;
                    if (Z >= 56320 && Z <= 57343) Q--
                }
                return B
            } else if (typeof A.byteLength === "number") return A.byteLength;
            else if (typeof A.size === "number") return A.size;
            throw new Error(`Body Length computation failed for ${A}`)
        }, "calculateBodyLength")
});
var ZQA = E((BQA) => {
    Object.defineProperty(BQA, "__esModule", {
        value: !0
    });
    BQA.fromBase64 = void 0;
    var vp9 = GZ(),
        bp9 = /^[A-Za-z0-9+/]*={0,2}$/,
        fp9 = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!bp9.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = vp9.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    BQA.fromBase64 = fp9
});
var FQA = E((DQA) => {
    Object.defineProperty(DQA, "__esModule", {
        value: !0
    });
    DQA.toBase64 = void 0;
    var hp9 = GZ(),
        gp9 = lB(),
        up9 = (A) => {
            let B;
            if (typeof A === "string") B = gp9.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return hp9.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    DQA.toBase64 = up9
});
var Nk = E((f15, yK1) => {
    var {
        defineProperty: IQA,
        getOwnPropertyDescriptor: mp9,
        getOwnPropertyNames: dp9
    } = Object, cp9 = Object.prototype.hasOwnProperty, La1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of dp9(B))
                if (!cp9.call(A, D) && D !== Q) IQA(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = mp9(B, D)) || Z.enumerable
                })
        }
        return A
    }, YQA = (A, B, Q) => (La1(A, B, "default"), Q && La1(Q, B, "default")), lp9 = (A) => La1(IQA({}, "__esModule", {
        value: !0
    }), A), Ma1 = {};
    yK1.exports = lp9(Ma1);
    YQA(Ma1, ZQA(), yK1.exports);
    YQA(Ma1, FQA(), yK1.exports)
});