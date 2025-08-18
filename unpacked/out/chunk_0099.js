/* chunk:99 bytes:[2367029, 2377381) size:10352 source:unpacked-cli.js */
var $HA = E((n95, wHA) => {
    var {
        defineProperty: mz1,
        getOwnPropertyDescriptor: PXQ,
        getOwnPropertyNames: SXQ
    } = Object, jXQ = Object.prototype.hasOwnProperty, wY = (A, B) => mz1(A, "name", {
        value: B,
        configurable: !0
    }), kXQ = (A, B) => {
        for (var Q in B) mz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, yXQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of SXQ(B))
                if (!jXQ.call(A, D) && D !== Q) mz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = PXQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, _XQ = (A) => yXQ(mz1({}, "__esModule", {
        value: !0
    }), A), HHA = {};
    kXQ(HHA, {
        AWSSDKSigV4Signer: () => fXQ,
        AwsSdkSigV4ASigner: () => gXQ,
        AwsSdkSigV4Signer: () => St1,
        NODE_SIGV4A_CONFIG_OPTIONS: () => dXQ,
        resolveAWSSDKSigV4Config: () => lXQ,
        resolveAwsSdkSigV4AConfig: () => mXQ,
        resolveAwsSdkSigV4Config: () => zHA,
        validateSigningProperties: () => Pt1
    });
    wHA.exports = _XQ(HHA);
    var xXQ = YQ1(),
        vXQ = YQ1(),
        XHA = wY((A) => vXQ.HttpResponse.isInstance(A) ? A.headers?.date ?? A.headers?.Date : void 0, "getDateHeader"),
        Tt1 = wY((A) => new Date(Date.now() + A), "getSkewCorrectedDate"),
        bXQ = wY((A, B) => Math.abs(Tt1(B).getTime() - A) >= 300000, "isClockSkewed"),
        VHA = wY((A, B) => {
            let Q = Date.parse(A);
            if (bXQ(Q, B)) return Q - Date.now();
            return B
        }, "getUpdatedSystemClockOffset"),
        WQ1 = wY((A, B) => {
            if (!B) throw new Error(`Property \`${A}\` is not resolved for AWS SDK SigV4Auth`);
            return B
        }, "throwSigningPropertyError"),
        Pt1 = wY(async (A) => {
            let B = WQ1("context", A.context),
                Q = WQ1("config", A.config),
                Z = B.endpointV2?.properties?.authSchemes?.[0],
                G = await WQ1("signer", Q.signer)(Z),
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
        St1 = class {
            static {
                wY(this, "AwsSdkSigV4Signer")
            }
            async sign(A, B, Q) {
                if (!xXQ.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let Z = await Pt1(Q),
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
                    signingDate: Tt1(D.systemClockOffset),
                    signingRegion: F,
                    signingService: I
                })
            }
            errorHandler(A) {
                return (B) => {
                    let Q = B.ServerTime ?? XHA(B.$response);
                    if (Q) {
                        let Z = WQ1("config", A.config),
                            D = Z.systemClockOffset;
                        if (Z.systemClockOffset = VHA(Q, Z.systemClockOffset), Z.systemClockOffset !== D && B.$metadata) B.$metadata.clockSkewCorrected = !0
                    }
                    throw B
                }
            }
            successHandler(A, B) {
                let Q = XHA(A);
                if (Q) {
                    let Z = WQ1("config", B.config);
                    Z.systemClockOffset = VHA(Q, Z.systemClockOffset)
                }
            }
        },
        fXQ = St1,
        hXQ = YQ1(),
        gXQ = class extends St1 {
            static {
                wY(this, "AwsSdkSigV4ASigner")
            }
            async sign(A, B, Q) {
                if (!hXQ.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
                let {
                    config: Z,
                    signer: D,
                    signingRegion: G,
                    signingRegionSet: F,
                    signingName: I
                } = await Pt1(Q), W = (await Z.sigv4aSigningRegionSet?.() ?? F ?? [G]).join(",");
                return await D.sign(A, {
                    signingDate: Tt1(Z.systemClockOffset),
                    signingRegion: W,
                    signingService: I
                })
            }
        },
        uXQ = HB(),
        CHA = A9(),
        mXQ = wY((A) => {
            return A.sigv4aSigningRegionSet = uXQ.normalizeProvider(A.sigv4aSigningRegionSet), A
        }, "resolveAwsSdkSigV4AConfig"),
        dXQ = {
            environmentVariableSelector(A) {
                if (A.AWS_SIGV4A_SIGNING_REGION_SET) return A.AWS_SIGV4A_SIGNING_REGION_SET.split(",").map((B) => B.trim());
                throw new CHA.ProviderError("AWS_SIGV4A_SIGNING_REGION_SET not set in env.", {
                    tryNextLink: !0
                })
            },
            configFileSelector(A) {
                if (A.sigv4a_signing_region_set) return (A.sigv4a_signing_region_set ?? "").split(",").map((B) => B.trim());
                throw new CHA.ProviderError("sigv4a_signing_region_set not set in profile.", {
                    tryNextLink: !0
                })
            },
            default: void 0
        },
        cXQ = jN(),
        vh = HB(),
        KHA = JHA(),
        zHA = wY((A) => {
            let B = A.credentials,
                Q = !!A.credentials,
                Z = void 0;
            Object.defineProperty(A, "credentials", {
                set(W) {
                    if (W && W !== B && W !== Z) Q = !0;
                    B = W;
                    let J = EHA(A, {
                            credentials: B,
                            credentialDefaultProvider: A.credentialDefaultProvider
                        }),
                        X = UHA(A, J);
                    if (Q && !X.attributed) Z = wY(async (V) => X(V).then((C) => cXQ.setCredentialFeature(C, "CREDENTIALS_CODE", "e")), "resolvedCredentials"), Z.memoized = X.memoized, Z.configBound = X.configBound, Z.attributed = !0;
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
            if (A.signer) I = vh.normalizeProvider(A.signer);
            else if (A.regionInfoProvider) I = wY(() => vh.normalizeProvider(A.region)().then(async (W) => [await A.regionInfoProvider(W, {
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
                return new(A.signerConstructor || KHA.SignatureV4)(C)
            }), "signer");
            else I = wY(async (W) => {
                W = Object.assign({}, {
                    name: "sigv4",
                    signingName: A.signingName || A.defaultSigningName,
                    signingRegion: await vh.normalizeProvider(A.region)(),
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
                return new(A.signerConstructor || KHA.SignatureV4)(V)
            }, "signer");
            return Object.assign(A, {
                systemClockOffset: G,
                signingEscapePath: D,
                signer: I
            })
        }, "resolveAwsSdkSigV4Config"),
        lXQ = zHA;

    function EHA(A, {
        credentials: B,
        credentialDefaultProvider: Q
    }) {
        let Z;
        if (B)
            if (!B?.memoized) Z = vh.memoizeIdentityProvider(B, vh.isIdentityExpired, vh.doesIdentityRequireRefresh);
            else Z = B;
        else if (Q) Z = vh.normalizeProvider(Q(Object.assign({}, A, {
            parentClientConfig: A
        })));
        else Z = wY(async () => {
            throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.")
        }, "credentialsProvider");
        return Z.memoized = !0, Z
    }
    wY(EHA, "normalizeCredentialProvider");

    function UHA(A, B) {
        if (B.configBound) return B;
        let Q = wY(async (Z) => B({
            ...Z,
            callerClientConfig: A
        }), "fn");
        return Q.memoized = B.memoized, Q.configBound = !0, Q
    }
    wY(UHA, "bindCallerConfig")
});