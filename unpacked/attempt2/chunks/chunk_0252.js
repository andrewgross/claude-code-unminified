/* chunk:252 bytes:[5401234, 5414499) size:13265 source:unpacked-cli.js */
var k30 = E((gq5, QG2) => {
    var {
        defineProperty: kL1,
        getOwnPropertyDescriptor: FL4,
        getOwnPropertyNames: IL4
    } = Object, YL4 = Object.prototype.hasOwnProperty, FG = (A, B) => kL1(A, "name", {
        value: B,
        configurable: !0
    }), WL4 = (A, B) => {
        for (var Q in B) kL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, JL4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of IL4(B))
                if (!YL4.call(A, D) && D !== Q) kL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = FL4(B, D)) || Z.enumerable
                })
        }
        return A
    }, XL4 = (A) => JL4(kL1({}, "__esModule", {
        value: !0
    }), A), oD2 = {};
    WL4(oD2, {
        AWSSDKSigV4Signer: () => HL4,
        AwsSdkSigV4ASigner: () => EL4,
        AwsSdkSigV4Signer: () => j30,
        NODE_AUTH_SCHEME_PREFERENCE_OPTIONS: () => UL4,
        NODE_SIGV4A_CONFIG_OPTIONS: () => qL4,
        getBearerTokenEnvKey: () => tD2,
        resolveAWSSDKSigV4Config: () => LL4,
        resolveAwsSdkSigV4AConfig: () => $L4,
        resolveAwsSdkSigV4Config: () => eD2,
        validateSigningProperties: () => S30
    });
    QG2.exports = XL4(oD2);
    var VL4 = vV(),
        CL4 = vV(),
        lD2 = FG((A) => CL4.HttpResponse.isInstance(A) ? A.headers?.date ?? A.headers?.Date : void 0, "getDateHeader"),
        P30 = FG((A) => new Date(Date.now() + A), "getSkewCorrectedDate"),
        KL4 = FG((A, B) => Math.abs(P30(B).getTime() - A) >= 300000, "isClockSkewed"),
        pD2 = FG((A, B) => {
            let Q = Date.parse(A);
            if (KL4(Q, B)) return Q - Date.now();
            return B
        }, "getUpdatedSystemClockOffset"),
        u81 = FG((A, B) => {
            if (!B) throw new Error(`Property \`${A}\` is not resolved for AWS SDK SigV4Auth`);
            return B
        }, "throwSigningPropertyError"),
        S30 = FG(async (A) => {
            let B = u81("context", A.context),
                Q = u81("config", A.config),
                Z = B.endpointV2?.properties?.authSchemes?.[0],
                G = await u81("signer", Q.signer)(Z),
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
        j30 = class {
            static {
                FG(this, "AwsSdkSigV4Signer")
            }
            async sign(A, B, Q) {
                if (!VL4.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let Z = await S30(Q),
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
                    signingDate: P30(D.systemClockOffset),
                    signingRegion: F,
                    signingService: I
                })
            }
            errorHandler(A) {
                return (B) => {
                    let Q = B.ServerTime ?? lD2(B.$response);
                    if (Q) {
                        let Z = u81("config", A.config),
                            D = Z.systemClockOffset;
                        if (Z.systemClockOffset = pD2(Q, Z.systemClockOffset), Z.systemClockOffset !== D && B.$metadata) B.$metadata.clockSkewCorrected = !0
                    }
                    throw B
                }
            }
            successHandler(A, B) {
                let Q = lD2(A);
                if (Q) {
                    let Z = u81("config", B.config);
                    Z.systemClockOffset = pD2(Q, Z.systemClockOffset)
                }
            }
        },
        HL4 = j30,
        zL4 = vV(),
        EL4 = class extends j30 {
            static {
                FG(this, "AwsSdkSigV4ASigner")
            }
            async sign(A, B, Q) {
                if (!zL4.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let {
                    config: Z,
                    signer: D,
                    signingRegion: G,
                    signingRegionSet: F,
                    signingName: I
                } = await S30(Q), W = (await Z.sigv4aSigningRegionSet?.() ?? F ?? [G]).join(",");
                return await D.sign(A, {
                    signingDate: P30(Z.systemClockOffset),
                    signingRegion: W,
                    signingService: I
                })
            }
        },
        iD2 = FG((A) => typeof A === "string" && A.length > 0 ? A.split(",").map((B) => B.trim()) : [], "getArrayForCommaSeparatedString"),
        tD2 = FG((A) => `AWS_BEARER_TOKEN_${A.replace(/[\s-]/g,"_").toUpperCase()}`, "getBearerTokenEnvKey"),
        nD2 = "AWS_AUTH_SCHEME_PREFERENCE",
        aD2 = "auth_scheme_preference",
        UL4 = {
            environmentVariableSelector: FG((A, B) => {
                if (B?.signingName) {
                    if (tD2(B.signingName) in A) return ["httpBearerAuth"]
                }
                if (!(nD2 in A)) return;
                return iD2(A[nD2])
            }, "environmentVariableSelector"),
            configFileSelector: FG((A) => {
                if (!(aD2 in A)) return;
                return iD2(A[aD2])
            }, "configFileSelector"),
            default: []
        },
        wL4 = HB(),
        sD2 = A9(),
        $L4 = FG((A) => {
            return A.sigv4aSigningRegionSet = wL4.normalizeProvider(A.sigv4aSigningRegionSet), A
        }, "resolveAwsSdkSigV4AConfig"),
        qL4 = {
            environmentVariableSelector(A) {
                if (A.AWS_SIGV4A_SIGNING_REGION_SET) return A.AWS_SIGV4A_SIGNING_REGION_SET.split(",").map((B) => B.trim());
                throw new sD2.ProviderError("AWS_SIGV4A_SIGNING_REGION_SET not set in env.", {
                    tryNextLink: !0
                })
            },
            configFileSelector(A) {
                if (A.sigv4a_signing_region_set) return (A.sigv4a_signing_region_set ?? "").split(",").map((B) => B.trim());
                throw new sD2.ProviderError("sigv4a_signing_region_set not set in profile.", {
                    tryNextLink: !0
                })
            },
            default: void 0
        },
        NL4 = ow(),
        Gu = HB(),
        rD2 = cD2(),
        eD2 = FG((A) => {
            let B = A.credentials,
                Q = !!A.credentials,
                Z = void 0;
            Object.defineProperty(A, "credentials", {
                set(W) {
                    if (W && W !== B && W !== Z) Q = !0;
                    B = W;
                    let J = AG2(A, {
                            credentials: B,
                            credentialDefaultProvider: A.credentialDefaultProvider
                        }),
                        X = BG2(A, J);
                    if (Q && !X.attributed) Z = FG(async (V) => X(V).then((C) => NL4.setCredentialFeature(C, "CREDENTIALS_CODE", "e")), "resolvedCredentials"), Z.memoized = X.memoized, Z.configBound = X.configBound, Z.attributed = !0;
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
            if (A.signer) I = Gu.normalizeProvider(A.signer);
            else if (A.regionInfoProvider) I = FG(() => Gu.normalizeProvider(A.region)().then(async (W) => [await A.regionInfoProvider(W, {
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
                return new(A.signerConstructor || rD2.SignatureV4)(C)
            }), "signer");
            else I = FG(async (W) => {
                W = Object.assign({}, {
                    name: "sigv4",
                    signingName: A.signingName || A.defaultSigningName,
                    signingRegion: await Gu.normalizeProvider(A.region)(),
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
                return new(A.signerConstructor || rD2.SignatureV4)(V)
            }, "signer");
            return Object.assign(A, {
                systemClockOffset: G,
                signingEscapePath: D,
                signer: I
            })
        }, "resolveAwsSdkSigV4Config"),
        LL4 = eD2;

    function AG2(A, {
        credentials: B,
        credentialDefaultProvider: Q
    }) {
        let Z;
        if (B)
            if (!B?.memoized) Z = Gu.memoizeIdentityProvider(B, Gu.isIdentityExpired, Gu.doesIdentityRequireRefresh);
            else Z = B;
        else if (Q) Z = Gu.normalizeProvider(Q(Object.assign({}, A, {
            parentClientConfig: A
        })));
        else Z = FG(async () => {
            throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.")
        }, "credentialsProvider");
        return Z.memoized = !0, Z
    }
    FG(AG2, "normalizeCredentialProvider");

    function BG2(A, B) {
        if (B.configBound) return B;
        let Q = FG(async (Z) => B({
            ...Z,
            callerClientConfig: A
        }), "fn");
        return Q.memoized = B.memoized, Q.configBound = !0, Q
    }
    FG(BG2, "bindCallerConfig")
});
var GG2 = E((ZG2) => {
    Object.defineProperty(ZG2, "__esModule", {
        value: !0
    });
    ZG2.fromBase64 = void 0;
    var ML4 = GZ(),
        RL4 = /^[A-Za-z0-9+/]*={0,2}$/,
        OL4 = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!RL4.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = ML4.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    ZG2.fromBase64 = OL4
});
var YG2 = E((FG2) => {
    Object.defineProperty(FG2, "__esModule", {
        value: !0
    });
    FG2.toBase64 = void 0;
    var TL4 = GZ(),
        PL4 = lB(),
        SL4 = (A) => {
            let B;
            if (typeof A === "string") B = PL4.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return TL4.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    FG2.toBase64 = SL4
});
var U_ = E((lq5, yL1) => {
    var {
        defineProperty: WG2,
        getOwnPropertyDescriptor: jL4,
        getOwnPropertyNames: kL4
    } = Object, yL4 = Object.prototype.hasOwnProperty, y30 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of kL4(B))
                if (!yL4.call(A, D) && D !== Q) WG2(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = jL4(B, D)) || Z.enumerable
                })
        }
        return A
    }, JG2 = (A, B, Q) => (y30(A, B, "default"), Q && y30(Q, B, "default")), _L4 = (A) => y30(WG2({}, "__esModule", {
        value: !0
    }), A), _30 = {};
    yL1.exports = _L4(_30);
    JG2(_30, GG2(), yL1.exports);
    JG2(_30, YG2(), yL1.exports)
});