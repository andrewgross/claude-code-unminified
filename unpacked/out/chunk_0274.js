/* chunk:274 bytes:[5843781, 5857046) size:13265 source:unpacked-cli.js */
var DD0 = E((PM5, RH2) => {
    var {
        defineProperty: mM1,
        getOwnPropertyDescriptor: uf4,
        getOwnPropertyNames: mf4
    } = Object, df4 = Object.prototype.hasOwnProperty, WG = (A, B) => mM1(A, "name", {
        value: B,
        configurable: !0
    }), cf4 = (A, B) => {
        for (var Q in B) mM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, lf4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of mf4(B))
                if (!df4.call(A, D) && D !== Q) mM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = uf4(B, D)) || Z.enumerable
                })
        }
        return A
    }, pf4 = (A) => lf4(mM1({}, "__esModule", {
        value: !0
    }), A), $H2 = {};
    cf4($H2, {
        AWSSDKSigV4Signer: () => sf4,
        AwsSdkSigV4ASigner: () => of4,
        AwsSdkSigV4Signer: () => ZD0,
        NODE_AUTH_SCHEME_PREFERENCE_OPTIONS: () => tf4,
        NODE_SIGV4A_CONFIG_OPTIONS: () => Bh4,
        getBearerTokenEnvKey: () => qH2,
        resolveAWSSDKSigV4Config: () => Zh4,
        resolveAwsSdkSigV4AConfig: () => Ah4,
        resolveAwsSdkSigV4Config: () => NH2,
        validateSigningProperties: () => QD0
    });
    RH2.exports = pf4($H2);
    var if4 = SK(),
        nf4 = SK(),
        CH2 = WG((A) => nf4.HttpResponse.isInstance(A) ? A.headers?.date ?? A.headers?.Date : void 0, "getDateHeader"),
        BD0 = WG((A) => new Date(Date.now() + A), "getSkewCorrectedDate"),
        af4 = WG((A, B) => Math.abs(BD0(B).getTime() - A) >= 300000, "isClockSkewed"),
        KH2 = WG((A, B) => {
            let Q = Date.parse(A);
            if (af4(Q, B)) return Q - Date.now();
            return B
        }, "getUpdatedSystemClockOffset"),
        W51 = WG((A, B) => {
            if (!B) throw new Error(`Property \`${A}\` is not resolved for AWS SDK SigV4Auth`);
            return B
        }, "throwSigningPropertyError"),
        QD0 = WG(async (A) => {
            let B = W51("context", A.context),
                Q = W51("config", A.config),
                Z = B.endpointV2?.properties?.authSchemes?.[0],
                G = await W51("signer", Q.signer)(Z),
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
        ZD0 = class {
            static {
                WG(this, "AwsSdkSigV4Signer")
            }
            async sign(A, B, Q) {
                if (!if4.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let Z = await QD0(Q),
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
                    signingDate: BD0(D.systemClockOffset),
                    signingRegion: F,
                    signingService: I
                })
            }
            errorHandler(A) {
                return (B) => {
                    let Q = B.ServerTime ?? CH2(B.$response);
                    if (Q) {
                        let Z = W51("config", A.config),
                            D = Z.systemClockOffset;
                        if (Z.systemClockOffset = KH2(Q, Z.systemClockOffset), Z.systemClockOffset !== D && B.$metadata) B.$metadata.clockSkewCorrected = !0
                    }
                    throw B
                }
            }
            successHandler(A, B) {
                let Q = CH2(A);
                if (Q) {
                    let Z = W51("config", B.config);
                    Z.systemClockOffset = KH2(Q, Z.systemClockOffset)
                }
            }
        },
        sf4 = ZD0,
        rf4 = SK(),
        of4 = class extends ZD0 {
            static {
                WG(this, "AwsSdkSigV4ASigner")
            }
            async sign(A, B, Q) {
                if (!rf4.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let {
                    config: Z,
                    signer: D,
                    signingRegion: G,
                    signingRegionSet: F,
                    signingName: I
                } = await QD0(Q), W = (await Z.sigv4aSigningRegionSet?.() ?? F ?? [G]).join(",");
                return await D.sign(A, {
                    signingDate: BD0(Z.systemClockOffset),
                    signingRegion: W,
                    signingService: I
                })
            }
        },
        HH2 = WG((A) => typeof A === "string" && A.length > 0 ? A.split(",").map((B) => B.trim()) : [], "getArrayForCommaSeparatedString"),
        qH2 = WG((A) => `AWS_BEARER_TOKEN_${A.replace(/[\s-]/g,"_").toUpperCase()}`, "getBearerTokenEnvKey"),
        zH2 = "AWS_AUTH_SCHEME_PREFERENCE",
        EH2 = "auth_scheme_preference",
        tf4 = {
            environmentVariableSelector: WG((A, B) => {
                if (B?.signingName) {
                    if (qH2(B.signingName) in A) return ["httpBearerAuth"]
                }
                if (!(zH2 in A)) return;
                return HH2(A[zH2])
            }, "environmentVariableSelector"),
            configFileSelector: WG((A) => {
                if (!(EH2 in A)) return;
                return HH2(A[EH2])
            }, "configFileSelector"),
            default: []
        },
        ef4 = HB(),
        UH2 = A9(),
        Ah4 = WG((A) => {
            return A.sigv4aSigningRegionSet = ef4.normalizeProvider(A.sigv4aSigningRegionSet), A
        }, "resolveAwsSdkSigV4AConfig"),
        Bh4 = {
            environmentVariableSelector(A) {
                if (A.AWS_SIGV4A_SIGNING_REGION_SET) return A.AWS_SIGV4A_SIGNING_REGION_SET.split(",").map((B) => B.trim());
                throw new UH2.ProviderError("AWS_SIGV4A_SIGNING_REGION_SET not set in env.", {
                    tryNextLink: !0
                })
            },
            configFileSelector(A) {
                if (A.sigv4a_signing_region_set) return (A.sigv4a_signing_region_set ?? "").split(",").map((B) => B.trim());
                throw new UH2.ProviderError("sigv4a_signing_region_set not set in profile.", {
                    tryNextLink: !0
                })
            },
            default: void 0
        },
        Qh4 = FE(),
        Ku = HB(),
        wH2 = VH2(),
        NH2 = WG((A) => {
            let B = A.credentials,
                Q = !!A.credentials,
                Z = void 0;
            Object.defineProperty(A, "credentials", {
                set(W) {
                    if (W && W !== B && W !== Z) Q = !0;
                    B = W;
                    let J = LH2(A, {
                            credentials: B,
                            credentialDefaultProvider: A.credentialDefaultProvider
                        }),
                        X = MH2(A, J);
                    if (Q && !X.attributed) Z = WG(async (V) => X(V).then((C) => Qh4.setCredentialFeature(C, "CREDENTIALS_CODE", "e")), "resolvedCredentials"), Z.memoized = X.memoized, Z.configBound = X.configBound, Z.attributed = !0;
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
            if (A.signer) I = Ku.normalizeProvider(A.signer);
            else if (A.regionInfoProvider) I = WG(() => Ku.normalizeProvider(A.region)().then(async (W) => [await A.regionInfoProvider(W, {
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
                return new(A.signerConstructor || wH2.SignatureV4)(C)
            }), "signer");
            else I = WG(async (W) => {
                W = Object.assign({}, {
                    name: "sigv4",
                    signingName: A.signingName || A.defaultSigningName,
                    signingRegion: await Ku.normalizeProvider(A.region)(),
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
                return new(A.signerConstructor || wH2.SignatureV4)(V)
            }, "signer");
            return Object.assign(A, {
                systemClockOffset: G,
                signingEscapePath: D,
                signer: I
            })
        }, "resolveAwsSdkSigV4Config"),
        Zh4 = NH2;

    function LH2(A, {
        credentials: B,
        credentialDefaultProvider: Q
    }) {
        let Z;
        if (B)
            if (!B?.memoized) Z = Ku.memoizeIdentityProvider(B, Ku.isIdentityExpired, Ku.doesIdentityRequireRefresh);
            else Z = B;
        else if (Q) Z = Ku.normalizeProvider(Q(Object.assign({}, A, {
            parentClientConfig: A
        })));
        else Z = WG(async () => {
            throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.")
        }, "credentialsProvider");
        return Z.memoized = !0, Z
    }
    WG(LH2, "normalizeCredentialProvider");

    function MH2(A, B) {
        if (B.configBound) return B;
        let Q = WG(async (Z) => B({
            ...Z,
            callerClientConfig: A
        }), "fn");
        return Q.memoized = B.memoized, Q.configBound = !0, Q
    }
    WG(MH2, "bindCallerConfig")
});
var PH2 = E((OH2) => {
    Object.defineProperty(OH2, "__esModule", {
        value: !0
    });
    OH2.fromBase64 = void 0;
    var Dh4 = GZ(),
        Gh4 = /^[A-Za-z0-9+/]*={0,2}$/,
        Fh4 = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!Gh4.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = Dh4.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    OH2.fromBase64 = Fh4
});
var kH2 = E((SH2) => {
    Object.defineProperty(SH2, "__esModule", {
        value: !0
    });
    SH2.toBase64 = void 0;
    var Ih4 = GZ(),
        Yh4 = lB(),
        Wh4 = (A) => {
            let B;
            if (typeof A === "string") B = Yh4.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return Ih4.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    SH2.toBase64 = Wh4
});
var Hu = E((_M5, dM1) => {
    var {
        defineProperty: yH2,
        getOwnPropertyDescriptor: Jh4,
        getOwnPropertyNames: Xh4
    } = Object, Vh4 = Object.prototype.hasOwnProperty, GD0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Xh4(B))
                if (!Vh4.call(A, D) && D !== Q) yH2(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Jh4(B, D)) || Z.enumerable
                })
        }
        return A
    }, _H2 = (A, B, Q) => (GD0(A, B, "default"), Q && GD0(Q, B, "default")), Ch4 = (A) => GD0(yH2({}, "__esModule", {
        value: !0
    }), A), FD0 = {};
    dM1.exports = Ch4(FD0);
    _H2(FD0, PH2(), dM1.exports);
    _H2(FD0, kH2(), dM1.exports)
});