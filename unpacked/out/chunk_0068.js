/* chunk:68 bytes:[1619004, 1638704) size:19700 source:unpacked-cli.js */
var YI = E((j91) => {
    Object.defineProperty(j91, "__esModule", {
        value: !0
    });
    var ia1 = wh();
    ia1.__exportStar(Xw(), j91);
    ia1.__exportStar(Na1(), j91);
    ia1.__exportStar(w4A(), j91)
});
var Bi = E((L05, k4A) => {
    var {
        defineProperty: mK1,
        getOwnPropertyDescriptor: ca9,
        getOwnPropertyNames: la9
    } = Object, pa9 = Object.prototype.hasOwnProperty, _O = (A, B) => mK1(A, "name", {
        value: B,
        configurable: !0
    }), ia9 = (A, B) => {
        for (var Q in B) mK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, na9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of la9(B))
                if (!pa9.call(A, D) && D !== Q) mK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ca9(B, D)) || Z.enumerable
                })
        }
        return A
    }, aa9 = (A) => na9(mK1({}, "__esModule", {
        value: !0
    }), A), L4A = {};
    ia9(L4A, {
        DEFAULT_UA_APP_ID: () => M4A,
        getUserAgentMiddlewareOptions: () => j4A,
        getUserAgentPlugin: () => Qs9,
        resolveUserAgentConfig: () => O4A,
        userAgentMiddleware: () => S4A
    });
    k4A.exports = aa9(L4A);
    var sa9 = HB(),
        M4A = void 0;

    function R4A(A) {
        if (A === void 0) return !0;
        return typeof A === "string" && A.length <= 50
    }
    _O(R4A, "isValidUserAgentAppId");

    function O4A(A) {
        let B = sa9.normalizeProvider(A.userAgentAppId ?? M4A),
            {
                customUserAgent: Q
            } = A;
        return Object.assign(A, {
            customUserAgent: typeof Q === "string" ? [
                [Q]
            ] : Q,
            userAgentAppId: _O(async () => {
                let Z = await B();
                if (!R4A(Z)) {
                    let D = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console : A.logger;
                    if (typeof Z !== "string") D?.warn("userAgentAppId must be a string or undefined.");
                    else if (Z.length > 50) D?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.")
                }
                return Z
            }, "userAgentAppId")
        })
    }
    _O(O4A, "resolveUserAgentConfig");
    var ra9 = sp(),
        oa9 = CV(),
        NN = YI(),
        ta9 = /\d{12}\.ddb/;
    async function T4A(A, B, Q) {
        if (Q.request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") NN.setFeature(A, "PROTOCOL_RPC_V2_CBOR", "M");
        if (typeof B.retryStrategy === "function") {
            let G = await B.retryStrategy();
            if (typeof G.acquireInitialRetryToken === "function")
                if (G.constructor?.name?.includes("Adaptive")) NN.setFeature(A, "RETRY_MODE_ADAPTIVE", "F");
                else NN.setFeature(A, "RETRY_MODE_STANDARD", "E");
            else NN.setFeature(A, "RETRY_MODE_LEGACY", "D")
        }
        if (typeof B.accountIdEndpointMode === "function") {
            let G = A.endpointV2;
            if (String(G?.url?.hostname).match(ta9)) NN.setFeature(A, "ACCOUNT_ID_ENDPOINT", "O");
            switch (await B.accountIdEndpointMode?.()) {
                case "disabled":
                    NN.setFeature(A, "ACCOUNT_ID_MODE_DISABLED", "Q");
                    break;
                case "preferred":
                    NN.setFeature(A, "ACCOUNT_ID_MODE_PREFERRED", "P");
                    break;
                case "required":
                    NN.setFeature(A, "ACCOUNT_ID_MODE_REQUIRED", "R");
                    break
            }
        }
        let D = A.__smithy_context?.selectedHttpAuthScheme?.identity;
        if (D?.$source) {
            let G = D;
            if (G.accountId) NN.setFeature(A, "RESOLVED_ACCOUNT_ID", "T");
            for (let [F, I] of Object.entries(G.$source ?? {})) NN.setFeature(A, F, I)
        }
    }
    _O(T4A, "checkFeatures");
    var $4A = "user-agent",
        na1 = "x-amz-user-agent",
        q4A = " ",
        aa1 = "/",
        ea9 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g,
        As9 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g,
        N4A = "-",
        Bs9 = 1024;

    function P4A(A) {
        let B = "";
        for (let Q in A) {
            let Z = A[Q];
            if (B.length + Z.length + 1 <= Bs9) {
                if (B.length) B += "," + Z;
                else B += Z;
                continue
            }
            break
        }
        return B
    }
    _O(P4A, "encodeFeatures");
    var S4A = _O((A) => (B, Q) => async (Z) => {
            let {
                request: D
            } = Z;
            if (!oa9.HttpRequest.isInstance(D)) return B(Z);
            let {
                headers: G
            } = D, F = Q?.userAgent?.map(uK1) || [], I = (await A.defaultUserAgentProvider()).map(uK1);
            await T4A(Q, A, Z);
            let Y = Q;
            I.push(`m/${P4A(Object.assign({},Q.__smithy_context?.features,Y.__aws_sdk_context?.features))}`);
            let W = A?.customUserAgent?.map(uK1) || [],
                J = await A.userAgentAppId();
            if (J) I.push(uK1([`app/${J}`]));
            let X = ra9.getUserAgentPrefix(),
                V = (X ? [X] : []).concat([...I, ...F, ...W]).join(q4A),
                C = [...I.filter((K) => K.startsWith("aws-sdk-")), ...W].join(q4A);
            if (A.runtime !== "browser") {
                if (C) G[na1] = G[na1] ? `${G[$4A]} ${C}` : C;
                G[$4A] = V
            } else G[na1] = V;
            return B({
                ...Z,
                request: D
            })
        }, "userAgentMiddleware"),
        uK1 = _O((A) => {
            let B = A[0].split(aa1).map((F) => F.replace(ea9, N4A)).join(aa1),
                Q = A[1]?.replace(As9, N4A),
                Z = B.indexOf(aa1),
                D = B.substring(0, Z),
                G = B.substring(Z + 1);
            if (D === "api") G = G.toLowerCase();
            return [D, G, Q].filter((F) => F && F.length > 0).reduce((F, I, Y) => {
                switch (Y) {
                    case 0:
                        return I;
                    case 1:
                        return `${F}/${I}`;
                    default:
                        return `${F}#${I}`
                }
            }, "")
        }, "escapeUserAgent"),
        j4A = {
            name: "getUserAgentMiddleware",
            step: "build",
            priority: "low",
            tags: ["SET_USER_AGENT", "USER_AGENT"],
            override: !0
        },
        Qs9 = _O((A) => ({
            applyToStack: _O((B) => {
                B.add(S4A(A), j4A)
            }, "applyToStack")
        }), "getUserAgentPlugin")
});
var b4A = E((M05, v4A) => {
    var {
        defineProperty: dK1,
        getOwnPropertyDescriptor: Zs9,
        getOwnPropertyNames: Ds9
    } = Object, Gs9 = Object.prototype.hasOwnProperty, y4A = (A, B) => dK1(A, "name", {
        value: B,
        configurable: !0
    }), Fs9 = (A, B) => {
        for (var Q in B) dK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Is9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ds9(B))
                if (!Gs9.call(A, D) && D !== Q) dK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Zs9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Ys9 = (A) => Is9(dK1({}, "__esModule", {
        value: !0
    }), A), _4A = {};
    Fs9(_4A, {
        SelectorType: () => x4A,
        booleanSelector: () => Ws9,
        numberSelector: () => Js9
    });
    v4A.exports = Ys9(_4A);
    var Ws9 = y4A((A, B, Q) => {
            if (!(B in A)) return;
            if (A[B] === "true") return !0;
            if (A[B] === "false") return !1;
            throw new Error(`Cannot load ${Q} "${B}". Expected "true" or "false", got ${A[B]}.`)
        }, "booleanSelector"),
        Js9 = y4A((A, B, Q) => {
            if (!(B in A)) return;
            let Z = parseInt(A[B], 10);
            if (Number.isNaN(Z)) throw new TypeError(`Cannot load ${Q} '${B}'. Expected number, got '${A[B]}'.`);
            return Z
        }, "numberSelector"),
        x4A = ((A) => {
            return A.ENV = "env", A.CONFIG = "shared config entry", A
        })(x4A || {})
});
var z4 = E((R05, n4A) => {
    var {
        defineProperty: lK1,
        getOwnPropertyDescriptor: Xs9,
        getOwnPropertyNames: Vs9
    } = Object, Cs9 = Object.prototype.hasOwnProperty, Cw = (A, B) => lK1(A, "name", {
        value: B,
        configurable: !0
    }), Ks9 = (A, B) => {
        for (var Q in B) lK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Hs9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Vs9(B))
                if (!Cs9.call(A, D) && D !== Q) lK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Xs9(B, D)) || Z.enumerable
                })
        }
        return A
    }, zs9 = (A) => Hs9(lK1({}, "__esModule", {
        value: !0
    }), A), g4A = {};
    Ks9(g4A, {
        CONFIG_USE_DUALSTACK_ENDPOINT: () => m4A,
        CONFIG_USE_FIPS_ENDPOINT: () => c4A,
        DEFAULT_USE_DUALSTACK_ENDPOINT: () => Es9,
        DEFAULT_USE_FIPS_ENDPOINT: () => ws9,
        ENV_USE_DUALSTACK_ENDPOINT: () => u4A,
        ENV_USE_FIPS_ENDPOINT: () => d4A,
        NODE_REGION_CONFIG_FILE_OPTIONS: () => Rs9,
        NODE_REGION_CONFIG_OPTIONS: () => Ms9,
        NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS: () => Us9,
        NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS: () => $s9,
        REGION_ENV_NAME: () => l4A,
        REGION_INI_NAME: () => p4A,
        getRegionInfo: () => js9,
        resolveCustomEndpointsConfig: () => qs9,
        resolveEndpointsConfig: () => Ls9,
        resolveRegionConfig: () => Os9
    });
    n4A.exports = zs9(g4A);
    var Ok = b4A(),
        u4A = "AWS_USE_DUALSTACK_ENDPOINT",
        m4A = "use_dualstack_endpoint",
        Es9 = !1,
        Us9 = {
            environmentVariableSelector: (A) => Ok.booleanSelector(A, u4A, Ok.SelectorType.ENV),
            configFileSelector: (A) => Ok.booleanSelector(A, m4A, Ok.SelectorType.CONFIG),
            default: !1
        },
        d4A = "AWS_USE_FIPS_ENDPOINT",
        c4A = "use_fips_endpoint",
        ws9 = !1,
        $s9 = {
            environmentVariableSelector: (A) => Ok.booleanSelector(A, d4A, Ok.SelectorType.ENV),
            configFileSelector: (A) => Ok.booleanSelector(A, c4A, Ok.SelectorType.CONFIG),
            default: !1
        },
        cK1 = E5(),
        qs9 = Cw((A) => {
            let {
                tls: B,
                endpoint: Q,
                urlParser: Z,
                useDualstackEndpoint: D
            } = A;
            return Object.assign(A, {
                tls: B ?? !0,
                endpoint: cK1.normalizeProvider(typeof Q === "string" ? Z(Q) : Q),
                isCustomEndpoint: !0,
                useDualstackEndpoint: cK1.normalizeProvider(D ?? !1)
            })
        }, "resolveCustomEndpointsConfig"),
        Ns9 = Cw(async (A) => {
            let {
                tls: B = !0
            } = A, Q = await A.region();
            if (!new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/).test(Q)) throw new Error("Invalid region in client config");
            let D = await A.useDualstackEndpoint(),
                G = await A.useFipsEndpoint(),
                {
                    hostname: F
                } = await A.regionInfoProvider(Q, {
                    useDualstackEndpoint: D,
                    useFipsEndpoint: G
                }) ?? {};
            if (!F) throw new Error("Cannot resolve hostname from client config");
            return A.urlParser(`${B?"https:":"http:"}//${F}`)
        }, "getEndpointFromRegion"),
        Ls9 = Cw((A) => {
            let B = cK1.normalizeProvider(A.useDualstackEndpoint ?? !1),
                {
                    endpoint: Q,
                    useFipsEndpoint: Z,
                    urlParser: D,
                    tls: G
                } = A;
            return Object.assign(A, {
                tls: G ?? !0,
                endpoint: Q ? cK1.normalizeProvider(typeof Q === "string" ? D(Q) : Q) : () => Ns9({
                    ...A,
                    useDualstackEndpoint: B,
                    useFipsEndpoint: Z
                }),
                isCustomEndpoint: !!Q,
                useDualstackEndpoint: B
            })
        }, "resolveEndpointsConfig"),
        l4A = "AWS_REGION",
        p4A = "region",
        Ms9 = {
            environmentVariableSelector: (A) => A[l4A],
            configFileSelector: (A) => A[p4A],
            default: () => {
                throw new Error("Region is missing")
            }
        },
        Rs9 = {
            preferredFile: "credentials"
        },
        i4A = Cw((A) => typeof A === "string" && (A.startsWith("fips-") || A.endsWith("-fips")), "isFipsRegion"),
        f4A = Cw((A) => i4A(A) ? ["fips-aws-global", "aws-fips"].includes(A) ? "us-east-1" : A.replace(/fips-(dkr-|prod-)?|-fips/, "") : A, "getRealRegion"),
        Os9 = Cw((A) => {
            let {
                region: B,
                useFipsEndpoint: Q
            } = A;
            if (!B) throw new Error("Region is missing");
            return Object.assign(A, {
                region: async () => {
                    if (typeof B === "string") return f4A(B);
                    let Z = await B();
                    return f4A(Z)
                },
                useFipsEndpoint: async () => {
                    let Z = typeof B === "string" ? B : await B();
                    if (i4A(Z)) return !0;
                    return typeof Q !== "function" ? Promise.resolve(!!Q) : Q()
                }
            })
        }, "resolveRegionConfig"),
        h4A = Cw((A = [], {
            useFipsEndpoint: B,
            useDualstackEndpoint: Q
        }) => A.find(({
            tags: Z
        }) => B === Z.includes("fips") && Q === Z.includes("dualstack"))?.hostname, "getHostnameFromVariants"),
        Ts9 = Cw((A, {
            regionHostname: B,
            partitionHostname: Q
        }) => B ? B : Q ? Q.replace("{region}", A) : void 0, "getResolvedHostname"),
        Ps9 = Cw((A, {
            partitionHash: B
        }) => Object.keys(B || {}).find((Q) => B[Q].regions.includes(A)) ?? "aws", "getResolvedPartition"),
        Ss9 = Cw((A, {
            signingRegion: B,
            regionRegex: Q,
            useFipsEndpoint: Z
        }) => {
            if (B) return B;
            else if (Z) {
                let D = Q.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\."),
                    G = A.match(D);
                if (G) return G[0].slice(1, -1)
            }
        }, "getResolvedSigningRegion"),
        js9 = Cw((A, {
            useFipsEndpoint: B = !1,
            useDualstackEndpoint: Q = !1,
            signingService: Z,
            regionHash: D,
            partitionHash: G
        }) => {
            let F = Ps9(A, {
                    partitionHash: G
                }),
                I = A in D ? A : G[F]?.endpoint ?? A,
                Y = {
                    useFipsEndpoint: B,
                    useDualstackEndpoint: Q
                },
                W = h4A(D[I]?.variants, Y),
                J = h4A(G[F]?.variants, Y),
                X = Ts9(I, {
                    regionHostname: W,
                    partitionHostname: J
                });
            if (X === void 0) throw new Error(`Endpoint resolution failed for: ${{resolvedRegion:I,useFipsEndpoint:B,useDualstackEndpoint:Q}}`);
            let V = Ss9(X, {
                signingRegion: D[I]?.signingRegion,
                regionRegex: G[F].regionRegex,
                useFipsEndpoint: B
            });
            return {
                partition: F,
                signingService: Z,
                hostname: X,
                ...V && {
                    signingRegion: V
                },
                ...D[I]?.signingService && {
                    signingService: D[I].signingService
                }
            }
        }, "getRegionInfo")
});
var Z6A = E((O05, Q6A) => {
    var {
        defineProperty: pK1,
        getOwnPropertyDescriptor: ks9,
        getOwnPropertyNames: ys9
    } = Object, _s9 = Object.prototype.hasOwnProperty, iK1 = (A, B) => pK1(A, "name", {
        value: B,
        configurable: !0
    }), xs9 = (A, B) => {
        for (var Q in B) pK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, vs9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ys9(B))
                if (!_s9.call(A, D) && D !== Q) pK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ks9(B, D)) || Z.enumerable
                })
        }
        return A
    }, bs9 = (A) => vs9(pK1({}, "__esModule", {
        value: !0
    }), A), a4A = {};
    xs9(a4A, {
        AlgorithmId: () => t4A,
        EndpointURLScheme: () => o4A,
        FieldPosition: () => e4A,
        HttpApiKeyAuthLocation: () => r4A,
        HttpAuthLocation: () => s4A,
        IniSectionType: () => A6A,
        RequestHandlerProtocol: () => B6A,
        SMITHY_CONTEXT_KEY: () => ms9,
        getDefaultClientConfiguration: () => gs9,
        resolveDefaultRuntimeConfig: () => us9
    });
    Q6A.exports = bs9(a4A);
    var s4A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(s4A || {}),
        r4A = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(r4A || {}),
        o4A = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(o4A || {}),
        t4A = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(t4A || {}),
        fs9 = iK1((A) => {
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
        hs9 = iK1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        gs9 = iK1((A) => {
            return fs9(A)
        }, "getDefaultClientConfiguration"),
        us9 = iK1((A) => {
            return hs9(A)
        }, "resolveDefaultRuntimeConfig"),
        e4A = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(e4A || {}),
        ms9 = "__smithy_context",
        A6A = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(A6A || {}),
        B6A = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(B6A || {})
});