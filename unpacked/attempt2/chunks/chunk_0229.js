/* chunk:229 bytes:[4948327, 4961592) size:13265 source:unpacked-cli.js */
var y60 = E((Nw5, HB2) => {
    var {
        defineProperty: ON1,
        getOwnPropertyDescriptor: SW4,
        getOwnPropertyNames: jW4
    } = Object, kW4 = Object.prototype.hasOwnProperty, DG = (A, B) => ON1(A, "name", {
        value: B,
        configurable: !0
    }), yW4 = (A, B) => {
        for (var Q in B) ON1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, _W4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of jW4(B))
                if (!kW4.call(A, D) && D !== Q) ON1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = SW4(B, D)) || Z.enumerable
                })
        }
        return A
    }, xW4 = (A) => _W4(ON1({}, "__esModule", {
        value: !0
    }), A), JB2 = {};
    yW4(JB2, {
        AWSSDKSigV4Signer: () => hW4,
        AwsSdkSigV4ASigner: () => uW4,
        AwsSdkSigV4Signer: () => k60,
        NODE_AUTH_SCHEME_PREFERENCE_OPTIONS: () => mW4,
        NODE_SIGV4A_CONFIG_OPTIONS: () => lW4,
        getBearerTokenEnvKey: () => XB2,
        resolveAWSSDKSigV4Config: () => iW4,
        resolveAwsSdkSigV4AConfig: () => cW4,
        resolveAwsSdkSigV4Config: () => VB2,
        validateSigningProperties: () => j60
    });
    HB2.exports = xW4(JB2);
    var vW4 = QX(),
        bW4 = QX(),
        ZB2 = DG((A) => bW4.HttpResponse.isInstance(A) ? A.headers?.date ?? A.headers?.Date : void 0, "getDateHeader"),
        S60 = DG((A) => new Date(Date.now() + A), "getSkewCorrectedDate"),
        fW4 = DG((A, B) => Math.abs(S60(B).getTime() - A) >= 300000, "isClockSkewed"),
        DB2 = DG((A, B) => {
            let Q = Date.parse(A);
            if (fW4(Q, B)) return Q - Date.now();
            return B
        }, "getUpdatedSystemClockOffset"),
        E81 = DG((A, B) => {
            if (!B) throw new Error(`Property \`${A}\` is not resolved for AWS SDK SigV4Auth`);
            return B
        }, "throwSigningPropertyError"),
        j60 = DG(async (A) => {
            let B = E81("context", A.context),
                Q = E81("config", A.config),
                Z = B.endpointV2?.properties?.authSchemes?.[0],
                G = await E81("signer", Q.signer)(Z),
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
        k60 = class {
            static {
                DG(this, "AwsSdkSigV4Signer")
            }
            async sign(A, B, Q) {
                if (!vW4.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let Z = await j60(Q),
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
                    signingDate: S60(D.systemClockOffset),
                    signingRegion: F,
                    signingService: I
                })
            }
            errorHandler(A) {
                return (B) => {
                    let Q = B.ServerTime ?? ZB2(B.$response);
                    if (Q) {
                        let Z = E81("config", A.config),
                            D = Z.systemClockOffset;
                        if (Z.systemClockOffset = DB2(Q, Z.systemClockOffset), Z.systemClockOffset !== D && B.$metadata) B.$metadata.clockSkewCorrected = !0
                    }
                    throw B
                }
            }
            successHandler(A, B) {
                let Q = ZB2(A);
                if (Q) {
                    let Z = E81("config", B.config);
                    Z.systemClockOffset = DB2(Q, Z.systemClockOffset)
                }
            }
        },
        hW4 = k60,
        gW4 = QX(),
        uW4 = class extends k60 {
            static {
                DG(this, "AwsSdkSigV4ASigner")
            }
            async sign(A, B, Q) {
                if (!gW4.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let {
                    config: Z,
                    signer: D,
                    signingRegion: G,
                    signingRegionSet: F,
                    signingName: I
                } = await j60(Q), W = (await Z.sigv4aSigningRegionSet?.() ?? F ?? [G]).join(",");
                return await D.sign(A, {
                    signingDate: S60(Z.systemClockOffset),
                    signingRegion: W,
                    signingService: I
                })
            }
        },
        GB2 = DG((A) => typeof A === "string" && A.length > 0 ? A.split(",").map((B) => B.trim()) : [], "getArrayForCommaSeparatedString"),
        XB2 = DG((A) => `AWS_BEARER_TOKEN_${A.replace(/[\s-]/g,"_").toUpperCase()}`, "getBearerTokenEnvKey"),
        FB2 = "AWS_AUTH_SCHEME_PREFERENCE",
        IB2 = "auth_scheme_preference",
        mW4 = {
            environmentVariableSelector: DG((A, B) => {
                if (B?.signingName) {
                    if (XB2(B.signingName) in A) return ["httpBearerAuth"]
                }
                if (!(FB2 in A)) return;
                return GB2(A[FB2])
            }, "environmentVariableSelector"),
            configFileSelector: DG((A) => {
                if (!(IB2 in A)) return;
                return GB2(A[IB2])
            }, "configFileSelector"),
            default: []
        },
        dW4 = HB(),
        YB2 = A9(),
        cW4 = DG((A) => {
            return A.sigv4aSigningRegionSet = dW4.normalizeProvider(A.sigv4aSigningRegionSet), A
        }, "resolveAwsSdkSigV4AConfig"),
        lW4 = {
            environmentVariableSelector(A) {
                if (A.AWS_SIGV4A_SIGNING_REGION_SET) return A.AWS_SIGV4A_SIGNING_REGION_SET.split(",").map((B) => B.trim());
                throw new YB2.ProviderError("AWS_SIGV4A_SIGNING_REGION_SET not set in env.", {
                    tryNextLink: !0
                })
            },
            configFileSelector(A) {
                if (A.sigv4a_signing_region_set) return (A.sigv4a_signing_region_set ?? "").split(",").map((B) => B.trim());
                throw new YB2.ProviderError("sigv4a_signing_region_set not set in profile.", {
                    tryNextLink: !0
                })
            },
            default: void 0
        },
        pW4 = mz(),
        ng = HB(),
        WB2 = QB2(),
        VB2 = DG((A) => {
            let B = A.credentials,
                Q = !!A.credentials,
                Z = void 0;
            Object.defineProperty(A, "credentials", {
                set(W) {
                    if (W && W !== B && W !== Z) Q = !0;
                    B = W;
                    let J = CB2(A, {
                            credentials: B,
                            credentialDefaultProvider: A.credentialDefaultProvider
                        }),
                        X = KB2(A, J);
                    if (Q && !X.attributed) Z = DG(async (V) => X(V).then((C) => pW4.setCredentialFeature(C, "CREDENTIALS_CODE", "e")), "resolvedCredentials"), Z.memoized = X.memoized, Z.configBound = X.configBound, Z.attributed = !0;
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
            if (A.signer) I = ng.normalizeProvider(A.signer);
            else if (A.regionInfoProvider) I = DG(() => ng.normalizeProvider(A.region)().then(async (W) => [await A.regionInfoProvider(W, {
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
                return new(A.signerConstructor || WB2.SignatureV4)(C)
            }), "signer");
            else I = DG(async (W) => {
                W = Object.assign({}, {
                    name: "sigv4",
                    signingName: A.signingName || A.defaultSigningName,
                    signingRegion: await ng.normalizeProvider(A.region)(),
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
                return new(A.signerConstructor || WB2.SignatureV4)(V)
            }, "signer");
            return Object.assign(A, {
                systemClockOffset: G,
                signingEscapePath: D,
                signer: I
            })
        }, "resolveAwsSdkSigV4Config"),
        iW4 = VB2;

    function CB2(A, {
        credentials: B,
        credentialDefaultProvider: Q
    }) {
        let Z;
        if (B)
            if (!B?.memoized) Z = ng.memoizeIdentityProvider(B, ng.isIdentityExpired, ng.doesIdentityRequireRefresh);
            else Z = B;
        else if (Q) Z = ng.normalizeProvider(Q(Object.assign({}, A, {
            parentClientConfig: A
        })));
        else Z = DG(async () => {
            throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.")
        }, "credentialsProvider");
        return Z.memoized = !0, Z
    }
    DG(CB2, "normalizeCredentialProvider");

    function KB2(A, B) {
        if (B.configBound) return B;
        let Q = DG(async (Z) => B({
            ...Z,
            callerClientConfig: A
        }), "fn");
        return Q.memoized = B.memoized, Q.configBound = !0, Q
    }
    DG(KB2, "bindCallerConfig")
});
var UB2 = E((zB2) => {
    Object.defineProperty(zB2, "__esModule", {
        value: !0
    });
    zB2.fromBase64 = void 0;
    var nW4 = GZ(),
        aW4 = /^[A-Za-z0-9+/]*={0,2}$/,
        sW4 = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!aW4.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = nW4.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    zB2.fromBase64 = sW4
});
var qB2 = E((wB2) => {
    Object.defineProperty(wB2, "__esModule", {
        value: !0
    });
    wB2.toBase64 = void 0;
    var rW4 = GZ(),
        oW4 = lB(),
        tW4 = (A) => {
            let B;
            if (typeof A === "string") B = oW4.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return rW4.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    wB2.toBase64 = tW4
});
var I_ = E((Tw5, TN1) => {
    var {
        defineProperty: NB2,
        getOwnPropertyDescriptor: eW4,
        getOwnPropertyNames: AJ4
    } = Object, BJ4 = Object.prototype.hasOwnProperty, _60 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of AJ4(B))
                if (!BJ4.call(A, D) && D !== Q) NB2(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = eW4(B, D)) || Z.enumerable
                })
        }
        return A
    }, LB2 = (A, B, Q) => (_60(A, B, "default"), Q && _60(Q, B, "default")), QJ4 = (A) => _60(NB2({}, "__esModule", {
        value: !0
    }), A), x60 = {};
    TN1.exports = QJ4(x60);
    LB2(x60, UB2(), TN1.exports);
    LB2(x60, qB2(), TN1.exports)
});