/* chunk:70 bytes:[1657091, 1676660) size:19569 source:unpacked-cli.js */
var IZ = E((h05, d6A) => {
    var {
        defineProperty: AH1,
        getOwnPropertyDescriptor: Bo9,
        getOwnPropertyNames: Qo9
    } = Object, Zo9 = Object.prototype.hasOwnProperty, Zi = (A, B) => AH1(A, "name", {
        value: B,
        configurable: !0
    }), Do9 = (A, B) => {
        for (var Q in B) AH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Go9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Qo9(B))
                if (!Zo9.call(A, D) && D !== Q) AH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Bo9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Fo9 = (A) => Go9(AH1({}, "__esModule", {
        value: !0
    }), A), m6A = {};
    Do9(m6A, {
        loadConfig: () => Xo9
    });
    d6A.exports = Fo9(m6A);
    var _91 = A9();

    function Zs1(A) {
        try {
            let B = new Set(Array.from(A.match(/([A-Z_]){3,}/g) ?? []));
            return B.delete("CONFIG"), B.delete("CONFIG_PREFIX_SEPARATOR"), B.delete("ENV"), [...B].join(", ")
        } catch (B) {
            return A
        }
    }
    Zi(Zs1, "getSelectorName");
    var Io9 = Zi((A, B) => async () => {
            try {
                let Q = A(process.env, B);
                if (Q === void 0) throw new Error;
                return Q
            } catch (Q) {
                throw new _91.CredentialsProviderError(Q.message || `Not found in ENV: ${Zs1(A.toString())}`, {
                    logger: B?.logger
                })
            }
        }, "fromEnv"),
        u6A = I3(),
        Yo9 = Zi((A, {
            preferredFile: B = "config",
            ...Q
        } = {}) => async () => {
            let Z = u6A.getProfileName(Q),
                {
                    configFile: D,
                    credentialsFile: G
                } = await u6A.loadSharedConfigFiles(Q),
                F = G[Z] || {},
                I = D[Z] || {},
                Y = B === "config" ? {
                    ...F,
                    ...I
                } : {
                    ...I,
                    ...F
                };
            try {
                let J = A(Y, B === "config" ? D : G);
                if (J === void 0) throw new Error;
                return J
            } catch (W) {
                throw new _91.CredentialsProviderError(W.message || `Not found in config files w/ profile [${Z}]: ${Zs1(A.toString())}`, {
                    logger: Q.logger
                })
            }
        }, "fromSharedConfigFiles"),
        Wo9 = Zi((A) => typeof A === "function", "isFunction"),
        Jo9 = Zi((A) => Wo9(A) ? async () => await A(): _91.fromStatic(A), "fromStatic"),
        Xo9 = Zi(({
            environmentVariableSelector: A,
            configFileSelector: B,
            default: Q
        }, Z = {}) => {
            let {
                signingName: D,
                logger: G
            } = Z, F = {
                signingName: D,
                logger: G
            };
            return _91.memoize(_91.chain(Io9(A, F), Yo9(B, Z), Jo9(Q)))
        }, "loadConfig")
});
var a6A = E((i6A) => {
    Object.defineProperty(i6A, "__esModule", {
        value: !0
    });
    i6A.getEndpointUrlConfig = void 0;
    var c6A = I3(),
        l6A = "AWS_ENDPOINT_URL",
        p6A = "endpoint_url",
        Vo9 = (A) => ({
            environmentVariableSelector: (B) => {
                let Q = A.split(" ").map((G) => G.toUpperCase()),
                    Z = B[[l6A, ...Q].join("_")];
                if (Z) return Z;
                let D = B[l6A];
                if (D) return D;
                return
            },
            configFileSelector: (B, Q) => {
                if (Q && B.services) {
                    let D = Q[["services", B.services].join(c6A.CONFIG_PREFIX_SEPARATOR)];
                    if (D) {
                        let G = A.split(" ").map((I) => I.toLowerCase()),
                            F = D[[G.join("_"), p6A].join(c6A.CONFIG_PREFIX_SEPARATOR)];
                        if (F) return F
                    }
                }
                let Z = B[p6A];
                if (Z) return Z;
                return
            },
            default: void 0
        });
    i6A.getEndpointUrlConfig = Vo9
});
var Ds1 = E((s6A) => {
    Object.defineProperty(s6A, "__esModule", {
        value: !0
    });
    s6A.getEndpointFromConfig = void 0;
    var Co9 = IZ(),
        Ko9 = a6A(),
        Ho9 = async (A) => Co9.loadConfig(Ko9.getEndpointUrlConfig(A !== null && A !== void 0 ? A : ""))();
    s6A.getEndpointFromConfig = Ho9
});
var A8A = E((m05, e6A) => {
    var {
        defineProperty: BH1,
        getOwnPropertyDescriptor: zo9,
        getOwnPropertyNames: Eo9
    } = Object, Uo9 = Object.prototype.hasOwnProperty, wo9 = (A, B) => BH1(A, "name", {
        value: B,
        configurable: !0
    }), $o9 = (A, B) => {
        for (var Q in B) BH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, qo9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Eo9(B))
                if (!Uo9.call(A, D) && D !== Q) BH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = zo9(B, D)) || Z.enumerable
                })
        }
        return A
    }, No9 = (A) => qo9(BH1({}, "__esModule", {
        value: !0
    }), A), o6A = {};
    $o9(o6A, {
        parseQueryString: () => t6A
    });
    e6A.exports = No9(o6A);

    function t6A(A) {
        let B = {};
        if (A = A.replace(/^\?/, ""), A)
            for (let Q of A.split("&")) {
                let [Z, D = null] = Q.split("=");
                if (Z = decodeURIComponent(Z), D) D = decodeURIComponent(D);
                if (!(Z in B)) B[Z] = D;
                else if (Array.isArray(B[Z])) B[Z].push(D);
                else B[Z] = [B[Z], D]
            }
        return B
    }
    wo9(t6A, "parseQueryString")
});
var JD = E((d05, Z8A) => {
    var {
        defineProperty: QH1,
        getOwnPropertyDescriptor: Lo9,
        getOwnPropertyNames: Mo9
    } = Object, Ro9 = Object.prototype.hasOwnProperty, Oo9 = (A, B) => QH1(A, "name", {
        value: B,
        configurable: !0
    }), To9 = (A, B) => {
        for (var Q in B) QH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Po9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Mo9(B))
                if (!Ro9.call(A, D) && D !== Q) QH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Lo9(B, D)) || Z.enumerable
                })
        }
        return A
    }, So9 = (A) => Po9(QH1({}, "__esModule", {
        value: !0
    }), A), B8A = {};
    To9(B8A, {
        parseUrl: () => Q8A
    });
    Z8A.exports = So9(B8A);
    var jo9 = A8A(),
        Q8A = Oo9((A) => {
            if (typeof A === "string") return Q8A(new URL(A));
            let {
                hostname: B,
                pathname: Q,
                port: Z,
                protocol: D,
                search: G
            } = A, F;
            if (G) F = jo9.parseQueryString(G);
            return {
                hostname: B,
                port: Z ? parseInt(Z) : void 0,
                protocol: D,
                path: Q,
                query: F
            }
        }, "parseUrl")
});
var T6 = E((c05, J8A) => {
    var {
        defineProperty: DH1,
        getOwnPropertyDescriptor: ko9,
        getOwnPropertyNames: yo9
    } = Object, _o9 = Object.prototype.hasOwnProperty, Zz = (A, B) => DH1(A, "name", {
        value: B,
        configurable: !0
    }), xo9 = (A, B) => {
        for (var Q in B) DH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, vo9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of yo9(B))
                if (!_o9.call(A, D) && D !== Q) DH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ko9(B, D)) || Z.enumerable
                })
        }
        return A
    }, bo9 = (A) => vo9(DH1({}, "__esModule", {
        value: !0
    }), A), G8A = {};
    xo9(G8A, {
        endpointMiddleware: () => Y8A,
        endpointMiddlewareOptions: () => W8A,
        getEndpointFromInstructions: () => F8A,
        getEndpointPlugin: () => no9,
        resolveEndpointConfig: () => so9,
        resolveEndpointRequiredConfig: () => ro9,
        resolveParams: () => I8A,
        toEndpointV1: () => Gs1
    });
    J8A.exports = bo9(G8A);
    var fo9 = Zz(async (A) => {
            let B = A?.Bucket || "";
            if (typeof A.Bucket === "string") A.Bucket = B.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
            if (do9(B)) {
                if (A.ForcePathStyle === !0) throw new Error("Path-style addressing cannot be used with ARN buckets")
            } else if (!mo9(B) || B.indexOf(".") !== -1 && !String(A.Endpoint).startsWith("http:") || B.toLowerCase() !== B || B.length < 3) A.ForcePathStyle = !0;
            if (A.DisableMultiRegionAccessPoints) A.disableMultiRegionAccessPoints = !0, A.DisableMRAP = !0;
            return A
        }, "resolveParamsForS3"),
        ho9 = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/,
        go9 = /(\d+\.){3}\d+/,
        uo9 = /\.\./,
        mo9 = Zz((A) => ho9.test(A) && !go9.test(A) && !uo9.test(A), "isDnsCompatibleBucketName"),
        do9 = Zz((A) => {
            let [B, Q, Z, , , D] = A.split(":"), G = B === "arn" && A.split(":").length >= 6, F = Boolean(G && Q && Z && D);
            if (G && !F) throw new Error(`Invalid ARN: ${A} was an invalid ARN.`);
            return F
        }, "isArnBucketName"),
        co9 = Zz((A, B, Q) => {
            let Z = Zz(async () => {
                let D = Q[A] ?? Q[B];
                if (typeof D === "function") return D();
                return D
            }, "configProvider");
            if (A === "credentialScope" || B === "CredentialScope") return async () => {
                let D = typeof Q.credentials === "function" ? await Q.credentials() : Q.credentials;
                return D?.credentialScope ?? D?.CredentialScope
            };
            if (A === "accountId" || B === "AccountId") return async () => {
                let D = typeof Q.credentials === "function" ? await Q.credentials() : Q.credentials;
                return D?.accountId ?? D?.AccountId
            };
            if (A === "endpoint" || B === "endpoint") return async () => {
                let D = await Z();
                if (D && typeof D === "object") {
                    if ("url" in D) return D.url.href;
                    if ("hostname" in D) {
                        let {
                            protocol: G,
                            hostname: F,
                            port: I,
                            path: Y
                        } = D;
                        return `${G}//${F}${I?":"+I:""}${Y}`
                    }
                }
                return D
            };
            return Z
        }, "createConfigValueProvider"),
        lo9 = Ds1(),
        D8A = JD(),
        Gs1 = Zz((A) => {
            if (typeof A === "object") {
                if ("url" in A) return D8A.parseUrl(A.url);
                return A
            }
            return D8A.parseUrl(A)
        }, "toEndpointV1"),
        F8A = Zz(async (A, B, Q, Z) => {
            if (!Q.endpoint) {
                let F;
                if (Q.serviceConfiguredEndpoint) F = await Q.serviceConfiguredEndpoint();
                else F = await lo9.getEndpointFromConfig(Q.serviceId);
                if (F) Q.endpoint = () => Promise.resolve(Gs1(F))
            }
            let D = await I8A(A, B, Q);
            if (typeof Q.endpointProvider !== "function") throw new Error("config.endpointProvider is not set.");
            return Q.endpointProvider(D, Z)
        }, "getEndpointFromInstructions"),
        I8A = Zz(async (A, B, Q) => {
            let Z = {},
                D = B?.getEndpointParameterInstructions?.() || {};
            for (let [G, F] of Object.entries(D)) switch (F.type) {
                case "staticContextParams":
                    Z[G] = F.value;
                    break;
                case "contextParams":
                    Z[G] = A[F.name];
                    break;
                case "clientContextParams":
                case "builtInParams":
                    Z[G] = await co9(F.name, G, Q)();
                    break;
                case "operationContextParams":
                    Z[G] = F.get(A);
                    break;
                default:
                    throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(F))
            }
            if (Object.keys(D).length === 0) Object.assign(Z, Q);
            if (String(Q.serviceId).toLowerCase() === "s3") await fo9(Z);
            return Z
        }, "resolveParams"),
        po9 = HB(),
        ZH1 = E5(),
        Y8A = Zz(({
            config: A,
            instructions: B
        }) => {
            return (Q, Z) => async (D) => {
                if (A.endpoint) po9.setFeature(Z, "ENDPOINT_OVERRIDE", "N");
                let G = await F8A(D.input, {
                    getEndpointParameterInstructions() {
                        return B
                    }
                }, {
                    ...A
                }, Z);
                Z.endpointV2 = G, Z.authSchemes = G.properties?.authSchemes;
                let F = Z.authSchemes?.[0];
                if (F) {
                    Z.signing_region = F.signingRegion, Z.signing_service = F.signingName;
                    let Y = ZH1.getSmithyContext(Z)?.selectedHttpAuthScheme?.httpAuthOption;
                    if (Y) Y.signingProperties = Object.assign(Y.signingProperties || {}, {
                        signing_region: F.signingRegion,
                        signingRegion: F.signingRegion,
                        signing_service: F.signingName,
                        signingName: F.signingName,
                        signingRegionSet: F.signingRegionSet
                    }, F.properties)
                }
                return Q({
                    ...D
                })
            }
        }, "endpointMiddleware"),
        io9 = y3(),
        W8A = {
            step: "serialize",
            tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
            name: "endpointV2Middleware",
            override: !0,
            relation: "before",
            toMiddleware: io9.serializerMiddlewareOption.name
        },
        no9 = Zz((A, B) => ({
            applyToStack: (Q) => {
                Q.addRelativeTo(Y8A({
                    config: A,
                    instructions: B
                }), W8A)
            }
        }), "getEndpointPlugin"),
        ao9 = Ds1(),
        so9 = Zz((A) => {
            let B = A.tls ?? !0,
                {
                    endpoint: Q,
                    useDualstackEndpoint: Z,
                    useFipsEndpoint: D
                } = A,
                G = Q != null ? async () => Gs1(await ZH1.normalizeProvider(Q)()): void 0, I = Object.assign(A, {
                    endpoint: G,
                    tls: B,
                    isCustomEndpoint: !!Q,
                    useDualstackEndpoint: ZH1.normalizeProvider(Z ?? !1),
                    useFipsEndpoint: ZH1.normalizeProvider(D ?? !1)
                }), Y = void 0;
            return I.serviceConfiguredEndpoint = async () => {
                if (A.serviceId && !Y) Y = ao9.getEndpointFromConfig(A.serviceId);
                return Y
            }, I
        }, "resolveEndpointConfig"),
        ro9 = Zz((A) => {
            let {
                endpoint: B
            } = A;
            if (B === void 0) A.endpoint = async () => {
                throw new Error("@smithy/middleware-endpoint: (default endpointRuleSet) endpoint is not set - you must configure an endpoint.")
            };
            return A
        }, "resolveEndpointRequiredConfig")
});
var Fs1 = E((l05, w8A) => {
    var {
        defineProperty: GH1,
        getOwnPropertyDescriptor: oo9,
        getOwnPropertyNames: to9
    } = Object, eo9 = Object.prototype.hasOwnProperty, FH1 = (A, B) => GH1(A, "name", {
        value: B,
        configurable: !0
    }), At9 = (A, B) => {
        for (var Q in B) GH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Bt9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of to9(B))
                if (!eo9.call(A, D) && D !== Q) GH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = oo9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Qt9 = (A) => Bt9(GH1({}, "__esModule", {
        value: !0
    }), A), X8A = {};
    At9(X8A, {
        AlgorithmId: () => H8A,
        EndpointURLScheme: () => K8A,
        FieldPosition: () => z8A,
        HttpApiKeyAuthLocation: () => C8A,
        HttpAuthLocation: () => V8A,
        IniSectionType: () => E8A,
        RequestHandlerProtocol: () => U8A,
        SMITHY_CONTEXT_KEY: () => It9,
        getDefaultClientConfiguration: () => Gt9,
        resolveDefaultRuntimeConfig: () => Ft9
    });
    w8A.exports = Qt9(X8A);
    var V8A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(V8A || {}),
        C8A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(C8A || {}),
        K8A = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(K8A || {}),
        H8A = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(H8A || {}),
        Zt9 = FH1((A) => {
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
        Dt9 = FH1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Gt9 = FH1((A) => {
            return Zt9(A)
        }, "getDefaultClientConfiguration"),
        Ft9 = FH1((A) => {
            return Dt9(A)
        }, "resolveDefaultRuntimeConfig"),
        z8A = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(z8A || {}),
        It9 = "__smithy_context",
        E8A = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(E8A || {}),
        U8A = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(U8A || {})
});