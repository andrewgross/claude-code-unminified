/* chunk:55 bytes:[1374373, 1389394) size:15021 source:unpacked-cli.js */
var HB = E((V15, n2A) => {
    var {
        defineProperty: YK1,
        getOwnPropertyDescriptor: ld9,
        getOwnPropertyNames: pd9
    } = Object, id9 = Object.prototype.hasOwnProperty, FZ = (A, B) => YK1(A, "name", {
        value: B,
        configurable: !0
    }), nd9 = (A, B) => {
        for (var Q in B) YK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, ad9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of pd9(B))
                if (!id9.call(A, D) && D !== Q) YK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ld9(B, D)) || Z.enumerable
                })
        }
        return A
    }, sd9 = (A) => ad9(YK1({}, "__esModule", {
        value: !0
    }), A), v2A = {};
    nd9(v2A, {
        DefaultIdentityProviderConfig: () => Yc9,
        EXPIRATION_MS: () => p2A,
        HttpApiKeyAuthSigner: () => Wc9,
        HttpBearerAuthSigner: () => Jc9,
        NoAuthSigner: () => Xc9,
        createIsIdentityExpiredFunction: () => l2A,
        createPaginator: () => d2A,
        doesIdentityRequireRefresh: () => i2A,
        getHttpAuthSchemeEndpointRuleSetPlugin: () => td9,
        getHttpAuthSchemePlugin: () => Ac9,
        getHttpSigningPlugin: () => Zc9,
        getSmithyContext: () => rd9,
        httpAuthSchemeEndpointRuleSetMiddlewareOptions: () => h2A,
        httpAuthSchemeMiddleware: () => Aa1,
        httpAuthSchemeMiddlewareOptions: () => g2A,
        httpSigningMiddleware: () => u2A,
        httpSigningMiddlewareOptions: () => m2A,
        isIdentityExpired: () => Vc9,
        memoizeIdentityProvider: () => Cc9,
        normalizeProvider: () => Dc9,
        requestBuilder: () => Ic9.requestBuilder,
        setFeature: () => c2A
    });
    n2A.exports = sd9(v2A);
    var IK1 = Xn1(),
        rd9 = FZ((A) => A[IK1.SMITHY_CONTEXT_KEY] || (A[IK1.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext"),
        b2A = E5(),
        od9 = FZ((A, B) => {
            if (!B || B.length === 0) return A;
            let Q = [];
            for (let Z of B)
                for (let D of A)
                    if (D.schemeId.split("#")[1] === Z) Q.push(D);
            for (let Z of A)
                if (!Q.find(({
                        schemeId: D
                    }) => D === Z.schemeId)) Q.push(Z);
            return Q
        }, "resolveAuthOptions");

    function f2A(A) {
        let B = new Map;
        for (let Q of A) B.set(Q.schemeId, Q);
        return B
    }
    FZ(f2A, "convertHttpAuthSchemesToMap");
    var Aa1 = FZ((A, B) => (Q, Z) => async (D) => {
            let G = A.httpAuthSchemeProvider(await B.httpAuthSchemeParametersProvider(A, Z, D.input)),
                F = A.authSchemePreference ? await A.authSchemePreference() : [],
                I = od9(G, F),
                Y = f2A(A.httpAuthSchemes),
                W = b2A.getSmithyContext(Z),
                J = [];
            for (let X of I) {
                let V = Y.get(X.schemeId);
                if (!V) {
                    J.push(`HttpAuthScheme \`${X.schemeId}\` was not enabled for this service.`);
                    continue
                }
                let C = V.identityProvider(await B.identityProviderConfigProvider(A));
                if (!C) {
                    J.push(`HttpAuthScheme \`${X.schemeId}\` did not have an IdentityProvider configured.`);
                    continue
                }
                let {
                    identityProperties: K = {},
                    signingProperties: H = {}
                } = X.propertiesExtractor?.(A, Z) || {};
                X.identityProperties = Object.assign(X.identityProperties || {}, K), X.signingProperties = Object.assign(X.signingProperties || {}, H), W.selectedHttpAuthScheme = {
                    httpAuthOption: X,
                    identity: await C(X.identityProperties),
                    signer: V.signer
                };
                break
            }
            if (!W.selectedHttpAuthScheme) throw new Error(J.join(`
`));
            return Q(D)
        }, "httpAuthSchemeMiddleware"),
        h2A = {
            step: "serialize",
            tags: ["HTTP_AUTH_SCHEME"],
            name: "httpAuthSchemeMiddleware",
            override: !0,
            relation: "before",
            toMiddleware: "endpointV2Middleware"
        },
        td9 = FZ((A, {
            httpAuthSchemeParametersProvider: B,
            identityProviderConfigProvider: Q
        }) => ({
            applyToStack: (Z) => {
                Z.addRelativeTo(Aa1(A, {
                    httpAuthSchemeParametersProvider: B,
                    identityProviderConfigProvider: Q
                }), h2A)
            }
        }), "getHttpAuthSchemeEndpointRuleSetPlugin"),
        ed9 = y3(),
        g2A = {
            step: "serialize",
            tags: ["HTTP_AUTH_SCHEME"],
            name: "httpAuthSchemeMiddleware",
            override: !0,
            relation: "before",
            toMiddleware: ed9.serializerMiddlewareOption.name
        },
        Ac9 = FZ((A, {
            httpAuthSchemeParametersProvider: B,
            identityProviderConfigProvider: Q
        }) => ({
            applyToStack: (Z) => {
                Z.addRelativeTo(Aa1(A, {
                    httpAuthSchemeParametersProvider: B,
                    identityProviderConfigProvider: Q
                }), g2A)
            }
        }), "getHttpAuthSchemePlugin"),
        Ba1 = zh(),
        Bc9 = FZ((A) => (B) => {
            throw B
        }, "defaultErrorHandler"),
        Qc9 = FZ((A, B) => {}, "defaultSuccessHandler"),
        u2A = FZ((A) => (B, Q) => async (Z) => {
            if (!Ba1.HttpRequest.isInstance(Z.request)) return B(Z);
            let G = b2A.getSmithyContext(Q).selectedHttpAuthScheme;
            if (!G) throw new Error("No HttpAuthScheme was selected: unable to sign request");
            let {
                httpAuthOption: {
                    signingProperties: F = {}
                },
                identity: I,
                signer: Y
            } = G, W = await B({
                ...Z,
                request: await Y.sign(Z.request, I, F)
            }).catch((Y.errorHandler || Bc9)(F));
            return (Y.successHandler || Qc9)(W.response, F), W
        }, "httpSigningMiddleware"),
        m2A = {
            step: "finalizeRequest",
            tags: ["HTTP_SIGNING"],
            name: "httpSigningMiddleware",
            aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
            override: !0,
            relation: "after",
            toMiddleware: "retryMiddleware"
        },
        Zc9 = FZ((A) => ({
            applyToStack: (B) => {
                B.addRelativeTo(u2A(A), m2A)
            }
        }), "getHttpSigningPlugin"),
        Dc9 = FZ((A) => {
            if (typeof A === "function") return A;
            let B = Promise.resolve(A);
            return () => B
        }, "normalizeProvider"),
        Gc9 = FZ(async (A, B, Q, Z = (G) => G, ...D) => {
            let G = new A(Q);
            return G = Z(G) ?? G, await B.send(G, ...D)
        }, "makePagedClientRequest");

    function d2A(A, B, Q, Z, D) {
        return FZ(async function* G(F, I, ...Y) {
            let W = I,
                J = F.startingToken ?? W[Q],
                X = !0,
                V;
            while (X) {
                if (W[Q] = J, D) W[D] = W[D] ?? F.pageSize;
                if (F.client instanceof A) V = await Gc9(B, F.client, I, F.withCommand, ...Y);
                else throw new Error(`Invalid client, expected instance of ${A.name}`);
                yield V;
                let C = J;
                J = Fc9(V, Z), X = !!(J && (!F.stopOnSameToken || J !== C))
            }
            return
        }, "paginateOperation")
    }
    FZ(d2A, "createPaginator");
    var Fc9 = FZ((A, B) => {
            let Q = A,
                Z = B.split(".");
            for (let D of Z) {
                if (!Q || typeof Q !== "object") return;
                Q = Q[D]
            }
            return Q
        }, "get"),
        Ic9 = O6();

    function c2A(A, B, Q) {
        if (!A.__smithy_context) A.__smithy_context = {
            features: {}
        };
        else if (!A.__smithy_context.features) A.__smithy_context.features = {};
        A.__smithy_context.features[B] = Q
    }
    FZ(c2A, "setFeature");
    var Yc9 = class {
            constructor(A) {
                this.authSchemes = new Map;
                for (let [B, Q] of Object.entries(A))
                    if (Q !== void 0) this.authSchemes.set(B, Q)
            }
            static {
                FZ(this, "DefaultIdentityProviderConfig")
            }
            getIdentityProvider(A) {
                return this.authSchemes.get(A)
            }
        },
        Wc9 = class {
            static {
                FZ(this, "HttpApiKeyAuthSigner")
            }
            async sign(A, B, Q) {
                if (!Q) throw new Error("request could not be signed with `apiKey` since the `name` and `in` signer properties are missing");
                if (!Q.name) throw new Error("request could not be signed with `apiKey` since the `name` signer property is missing");
                if (!Q.in) throw new Error("request could not be signed with `apiKey` since the `in` signer property is missing");
                if (!B.apiKey) throw new Error("request could not be signed with `apiKey` since the `apiKey` is not defined");
                let Z = Ba1.HttpRequest.clone(A);
                if (Q.in === IK1.HttpApiKeyAuthLocation.QUERY) Z.query[Q.name] = B.apiKey;
                else if (Q.in === IK1.HttpApiKeyAuthLocation.HEADER) Z.headers[Q.name] = Q.scheme ? `${Q.scheme} ${B.apiKey}` : B.apiKey;
                else throw new Error("request can only be signed with `apiKey` locations `query` or `header`, but found: `" + Q.in + "`");
                return Z
            }
        },
        Jc9 = class {
            static {
                FZ(this, "HttpBearerAuthSigner")
            }
            async sign(A, B, Q) {
                let Z = Ba1.HttpRequest.clone(A);
                if (!B.token) throw new Error("request could not be signed with `token` since the `token` is not defined");
                return Z.headers.Authorization = `Bearer ${B.token}`, Z
            }
        },
        Xc9 = class {
            static {
                FZ(this, "NoAuthSigner")
            }
            async sign(A, B, Q) {
                return A
            }
        },
        l2A = FZ((A) => (B) => i2A(B) && B.expiration.getTime() - Date.now() < A, "createIsIdentityExpiredFunction"),
        p2A = 300000,
        Vc9 = l2A(p2A),
        i2A = FZ((A) => A.expiration !== void 0, "doesIdentityRequireRefresh"),
        Cc9 = FZ((A, B, Q) => {
            if (A === void 0) return;
            let Z = typeof A !== "function" ? async () => Promise.resolve(A): A, D, G, F, I = !1, Y = FZ(async (W) => {
                if (!G) G = Z(W);
                try {
                    D = await G, F = !0, I = !1
                } finally {
                    G = void 0
                }
                return D
            }, "coalesceProvider");
            if (B === void 0) return async (W) => {
                if (!F || W?.forceRefresh) D = await Y(W);
                return D
            };
            return async (W) => {
                if (!F || W?.forceRefresh) D = await Y(W);
                if (I) return D;
                if (!Q(D)) return I = !0, D;
                if (B(D)) return await Y(W), D;
                return D
            }
        }, "memoizeIdentityProvider")
});
var ZBA = E((E15, QBA) => {
    var {
        defineProperty: WK1,
        getOwnPropertyDescriptor: Kc9,
        getOwnPropertyNames: Hc9
    } = Object, zc9 = Object.prototype.hasOwnProperty, JK1 = (A, B) => WK1(A, "name", {
        value: B,
        configurable: !0
    }), Ec9 = (A, B) => {
        for (var Q in B) WK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Uc9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Hc9(B))
                if (!zc9.call(A, D) && D !== Q) WK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Kc9(B, D)) || Z.enumerable
                })
        }
        return A
    }, wc9 = (A) => Uc9(WK1({}, "__esModule", {
        value: !0
    }), A), a2A = {};
    Ec9(a2A, {
        AlgorithmId: () => t2A,
        EndpointURLScheme: () => o2A,
        FieldPosition: () => e2A,
        HttpApiKeyAuthLocation: () => r2A,
        HttpAuthLocation: () => s2A,
        IniSectionType: () => ABA,
        RequestHandlerProtocol: () => BBA,
        SMITHY_CONTEXT_KEY: () => Mc9,
        getDefaultClientConfiguration: () => Nc9,
        resolveDefaultRuntimeConfig: () => Lc9
    });
    QBA.exports = wc9(a2A);
    var s2A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(s2A || {}),
        r2A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(r2A || {}),
        o2A = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(o2A || {}),
        t2A = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(t2A || {}),
        $c9 = JK1((A) => {
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
        qc9 = JK1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Nc9 = JK1((A) => {
            return $c9(A)
        }, "getDefaultClientConfiguration"),
        Lc9 = JK1((A) => {
            return qc9(A)
        }, "resolveDefaultRuntimeConfig"),
        e2A = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(e2A || {}),
        Mc9 = "__smithy_context",
        ABA = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(ABA || {}),
        BBA = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(BBA || {})
});