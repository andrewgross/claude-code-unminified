/* chunk:74 bytes:[1724580, 1743872) size:19292 source:unpacked-cli.js */
var u4 = E((LA5, D3A) => {
    var {
        defineProperty: CH1,
        getOwnPropertyDescriptor: m1Q,
        getOwnPropertyNames: d1Q
    } = Object, c1Q = Object.prototype.hasOwnProperty, gG = (A, B) => CH1(A, "name", {
        value: B,
        configurable: !0
    }), l1Q = (A, B) => {
        for (var Q in B) CH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, p1Q = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of d1Q(B))
                if (!c1Q.call(A, D) && D !== Q) CH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = m1Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, i1Q = (A) => p1Q(CH1({}, "__esModule", {
        value: !0
    }), A), p5A = {};
    l1Q(p5A, {
        AdaptiveRetryStrategy: () => s1Q,
        CONFIG_MAX_ATTEMPTS: () => Ts1,
        CONFIG_RETRY_MODE: () => t5A,
        ENV_MAX_ATTEMPTS: () => Os1,
        ENV_RETRY_MODE: () => o5A,
        NODE_MAX_ATTEMPT_CONFIG_OPTIONS: () => r1Q,
        NODE_RETRY_MODE_CONFIG_OPTIONS: () => t1Q,
        StandardRetryStrategy: () => r5A,
        defaultDelayDecider: () => n5A,
        defaultRetryDecider: () => a5A,
        getOmitRetryHeadersPlugin: () => e1Q,
        getRetryAfterHint: () => Z3A,
        getRetryPlugin: () => G0Q,
        omitRetryHeadersMiddleware: () => e5A,
        omitRetryHeadersMiddlewareOptions: () => A3A,
        resolveRetryConfig: () => o1Q,
        retryMiddleware: () => B3A,
        retryMiddlewareOptions: () => Q3A
    });
    D3A.exports = i1Q(p5A);
    var Di = R8A(),
        i5A = b91(),
        mZ = aD(),
        n1Q = gG((A, B) => {
            let Q = A,
                Z = B?.noRetryIncrement ?? mZ.NO_RETRY_INCREMENT,
                D = B?.retryCost ?? mZ.RETRY_COST,
                G = B?.timeoutRetryCost ?? mZ.TIMEOUT_RETRY_COST,
                F = A,
                I = gG((X) => X.name === "TimeoutError" ? G : D, "getCapacityAmount"),
                Y = gG((X) => I(X) <= F, "hasRetryTokens");
            return Object.freeze({
                hasRetryTokens: Y,
                retrieveRetryTokens: gG((X) => {
                    if (!Y(X)) throw new Error("No retry token available");
                    let V = I(X);
                    return F -= V, V
                }, "retrieveRetryTokens"),
                releaseRetryTokens: gG((X) => {
                    F += X ?? Z, F = Math.min(F, Q)
                }, "releaseRetryTokens")
            })
        }, "getDefaultRetryQuota"),
        n5A = gG((A, B) => Math.floor(Math.min(mZ.MAXIMUM_RETRY_DELAY, Math.random() * 2 ** B * A)), "defaultDelayDecider"),
        Sk = Ks1(),
        a5A = gG((A) => {
            if (!A) return !1;
            return Sk.isRetryableByTrait(A) || Sk.isClockSkewError(A) || Sk.isThrottlingError(A) || Sk.isTransientError(A)
        }, "defaultRetryDecider"),
        s5A = gG((A) => {
            if (A instanceof Error) return A;
            if (A instanceof Object) return Object.assign(new Error, A);
            if (typeof A === "string") return new Error(A);
            return new Error(`AWS SDK error wrapper for ${A}`)
        }, "asSdkError"),
        r5A = class {
            constructor(A, B) {
                this.maxAttemptsProvider = A, this.mode = mZ.RETRY_MODES.STANDARD, this.retryDecider = B?.retryDecider ?? a5A, this.delayDecider = B?.delayDecider ?? n5A, this.retryQuota = B?.retryQuota ?? n1Q(mZ.INITIAL_RETRY_TOKENS)
            }
            static {
                gG(this, "StandardRetryStrategy")
            }
            shouldRetry(A, B, Q) {
                return B < Q && this.retryDecider(A) && this.retryQuota.hasRetryTokens(A)
            }
            async getMaxAttempts() {
                let A;
                try {
                    A = await this.maxAttemptsProvider()
                } catch (B) {
                    A = mZ.DEFAULT_MAX_ATTEMPTS
                }
                return A
            }
            async retry(A, B, Q) {
                let Z, D = 0,
                    G = 0,
                    F = await this.getMaxAttempts(),
                    {
                        request: I
                    } = B;
                if (Di.HttpRequest.isInstance(I)) I.headers[mZ.INVOCATION_ID_HEADER] = i5A.v4();
                while (!0) try {
                    if (Di.HttpRequest.isInstance(I)) I.headers[mZ.REQUEST_HEADER] = `attempt=${D+1}; max=${F}`;
                    if (Q?.beforeRequest) await Q.beforeRequest();
                    let {
                        response: Y,
                        output: W
                    } = await A(B);
                    if (Q?.afterRequest) Q.afterRequest(Y);
                    return this.retryQuota.releaseRetryTokens(Z), W.$metadata.attempts = D + 1, W.$metadata.totalRetryDelay = G, {
                        response: Y,
                        output: W
                    }
                } catch (Y) {
                    let W = s5A(Y);
                    if (D++, this.shouldRetry(W, D, F)) {
                        Z = this.retryQuota.retrieveRetryTokens(W);
                        let J = this.delayDecider(Sk.isThrottlingError(W) ? mZ.THROTTLING_RETRY_DELAY_BASE : mZ.DEFAULT_RETRY_DELAY_BASE, D),
                            X = a1Q(W.$response),
                            V = Math.max(X || 0, J);
                        G += V, await new Promise((C) => setTimeout(C, V));
                        continue
                    }
                    if (!W.$metadata) W.$metadata = {};
                    throw W.$metadata.attempts = D, W.$metadata.totalRetryDelay = G, W
                }
            }
        },
        a1Q = gG((A) => {
            if (!Di.HttpResponse.isInstance(A)) return;
            let B = Object.keys(A.headers).find((G) => G.toLowerCase() === "retry-after");
            if (!B) return;
            let Q = A.headers[B],
                Z = Number(Q);
            if (!Number.isNaN(Z)) return Z * 1000;
            return new Date(Q).getTime() - Date.now()
        }, "getDelayFromRetryAfterHeader"),
        s1Q = class extends r5A {
            static {
                gG(this, "AdaptiveRetryStrategy")
            }
            constructor(A, B) {
                let {
                    rateLimiter: Q,
                    ...Z
                } = B ?? {};
                super(A, Z);
                this.rateLimiter = Q ?? new mZ.DefaultRateLimiter, this.mode = mZ.RETRY_MODES.ADAPTIVE
            }
            async retry(A, B) {
                return super.retry(A, B, {
                    beforeRequest: async () => {
                        return this.rateLimiter.getSendToken()
                    },
                    afterRequest: (Q) => {
                        this.rateLimiter.updateClientSendingRate(Q)
                    }
                })
            }
        },
        l5A = E5(),
        Os1 = "AWS_MAX_ATTEMPTS",
        Ts1 = "max_attempts",
        r1Q = {
            environmentVariableSelector: (A) => {
                let B = A[Os1];
                if (!B) return;
                let Q = parseInt(B);
                if (Number.isNaN(Q)) throw new Error(`Environment variable ${Os1} mast be a number, got "${B}"`);
                return Q
            },
            configFileSelector: (A) => {
                let B = A[Ts1];
                if (!B) return;
                let Q = parseInt(B);
                if (Number.isNaN(Q)) throw new Error(`Shared config file entry ${Ts1} mast be a number, got "${B}"`);
                return Q
            },
            default: mZ.DEFAULT_MAX_ATTEMPTS
        },
        o1Q = gG((A) => {
            let {
                retryStrategy: B,
                retryMode: Q,
                maxAttempts: Z
            } = A, D = l5A.normalizeProvider(Z ?? mZ.DEFAULT_MAX_ATTEMPTS);
            return Object.assign(A, {
                maxAttempts: D,
                retryStrategy: async () => {
                    if (B) return B;
                    if (await l5A.normalizeProvider(Q)() === mZ.RETRY_MODES.ADAPTIVE) return new mZ.AdaptiveRetryStrategy(D);
                    return new mZ.StandardRetryStrategy(D)
                }
            })
        }, "resolveRetryConfig"),
        o5A = "AWS_RETRY_MODE",
        t5A = "retry_mode",
        t1Q = {
            environmentVariableSelector: (A) => A[o5A],
            configFileSelector: (A) => A[t5A],
            default: mZ.DEFAULT_RETRY_MODE
        },
        e5A = gG(() => (A) => async (B) => {
            let {
                request: Q
            } = B;
            if (Di.HttpRequest.isInstance(Q)) delete Q.headers[mZ.INVOCATION_ID_HEADER], delete Q.headers[mZ.REQUEST_HEADER];
            return A(B)
        }, "omitRetryHeadersMiddleware"),
        A3A = {
            name: "omitRetryHeadersMiddleware",
            tags: ["RETRY", "HEADERS", "OMIT_RETRY_HEADERS"],
            relation: "before",
            toMiddleware: "awsAuthMiddleware",
            override: !0
        },
        e1Q = gG((A) => ({
            applyToStack: (B) => {
                B.addRelativeTo(e5A(), A3A)
            }
        }), "getOmitRetryHeadersPlugin"),
        A0Q = u5A(),
        B0Q = c5A(),
        B3A = gG((A) => (B, Q) => async (Z) => {
            let D = await A.retryStrategy(),
                G = await A.maxAttempts();
            if (Q0Q(D)) {
                D = D;
                let F = await D.acquireInitialRetryToken(Q.partition_id),
                    I = new Error,
                    Y = 0,
                    W = 0,
                    {
                        request: J
                    } = Z,
                    X = Di.HttpRequest.isInstance(J);
                if (X) J.headers[mZ.INVOCATION_ID_HEADER] = i5A.v4();
                while (!0) try {
                    if (X) J.headers[mZ.REQUEST_HEADER] = `attempt=${Y+1}; max=${G}`;
                    let {
                        response: V,
                        output: C
                    } = await B(Z);
                    return D.recordSuccess(F), C.$metadata.attempts = Y + 1, C.$metadata.totalRetryDelay = W, {
                        response: V,
                        output: C
                    }
                } catch (V) {
                    let C = Z0Q(V);
                    if (I = s5A(V), X && B0Q.isStreamingPayload(J)) throw (Q.logger instanceof A0Q.NoOpLogger ? console : Q.logger)?.warn("An error was encountered in a non-retryable streaming request."), I;
                    try {
                        F = await D.refreshRetryTokenForRetry(F, C)
                    } catch (H) {
                        if (!I.$metadata) I.$metadata = {};
                        throw I.$metadata.attempts = Y + 1, I.$metadata.totalRetryDelay = W, I
                    }
                    Y = F.getRetryCount();
                    let K = F.getRetryDelay();
                    W += K, await new Promise((H) => setTimeout(H, K))
                }
            } else {
                if (D = D, D?.mode) Q.userAgent = [...Q.userAgent || [],
                    ["cfg/retry-mode", D.mode]
                ];
                return D.retry(B, Z)
            }
        }, "retryMiddleware"),
        Q0Q = gG((A) => typeof A.acquireInitialRetryToken !== "undefined" && typeof A.refreshRetryTokenForRetry !== "undefined" && typeof A.recordSuccess !== "undefined", "isRetryStrategyV2"),
        Z0Q = gG((A) => {
            let B = {
                    error: A,
                    errorType: D0Q(A)
                },
                Q = Z3A(A.$response);
            if (Q) B.retryAfterHint = Q;
            return B
        }, "getRetryErrorInfo"),
        D0Q = gG((A) => {
            if (Sk.isThrottlingError(A)) return "THROTTLING";
            if (Sk.isTransientError(A)) return "TRANSIENT";
            if (Sk.isServerError(A)) return "SERVER_ERROR";
            return "CLIENT_ERROR"
        }, "getRetryErrorType"),
        Q3A = {
            name: "retryMiddleware",
            tags: ["RETRY"],
            step: "finalizeRequest",
            priority: "high",
            override: !0
        },
        G0Q = gG((A) => ({
            applyToStack: (B) => {
                B.add(B3A(A), Q3A)
            }
        }), "getRetryPlugin"),
        Z3A = gG((A) => {
            if (!Di.HttpResponse.isInstance(A)) return;
            let B = Object.keys(A.headers).find((G) => G.toLowerCase() === "retry-after");
            if (!B) return;
            let Q = A.headers[B],
                Z = Number(Q);
            if (!Number.isNaN(Z)) return new Date(Z * 1000);
            return new Date(Q)
        }, "getRetryAfterHint")
});
var js1 = E((G3A) => {
    Object.defineProperty(G3A, "__esModule", {
        value: !0
    });
    G3A.resolveHttpAuthSchemeConfig = G3A.defaultBedrockHttpAuthSchemeProvider = G3A.defaultBedrockHttpAuthSchemeParametersProvider = void 0;
    var F0Q = YI(),
        Ps1 = HB(),
        Ss1 = E5(),
        I0Q = async (A, B, Q) => {
            return {
                operation: Ss1.getSmithyContext(B).operation,
                region: await Ss1.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    G3A.defaultBedrockHttpAuthSchemeParametersProvider = I0Q;

    function Y0Q(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "bedrock",
                region: A.region
            },
            propertiesExtractor: (B, Q) => ({
                signingProperties: {
                    config: B,
                    context: Q
                }
            })
        }
    }

    function W0Q(A) {
        return {
            schemeId: "smithy.api#httpBearerAuth",
            propertiesExtractor: ({
                profile: B,
                filepath: Q,
                configFilepath: Z,
                ignoreCache: D
            }, G) => ({
                identityProperties: {
                    profile: B,
                    filepath: Q,
                    configFilepath: Z,
                    ignoreCache: D
                }
            })
        }
    }
    var J0Q = (A) => {
        let B = [];
        switch (A.operation) {
            default:
                B.push(Y0Q(A)), B.push(W0Q(A))
        }
        return B
    };
    G3A.defaultBedrockHttpAuthSchemeProvider = J0Q;
    var X0Q = (A) => {
        let B = Ps1.memoizeIdentityProvider(A.token, Ps1.isIdentityExpired, Ps1.doesIdentityRequireRefresh),
            Q = F0Q.resolveAwsSdkSigV4Config(A);
        return Object.assign(Q, {
            authSchemePreference: Ss1.normalizeProvider(A.authSchemePreference ?? []),
            token: B
        })
    };
    G3A.resolveHttpAuthSchemeConfig = X0Q
});
var I3A = E((TA5, K0Q) => {
    K0Q.exports = {
        name: "@aws-sdk/client-bedrock",
        description: "AWS SDK for JavaScript Bedrock Client for Node.js, Browser and React Native",
        version: "3.840.0",
        scripts: {
            build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
            "build:cjs": "node ../../scripts/compilation/inline client-bedrock",
            "build:es": "tsc -p tsconfig.es.json",
            "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
            "build:types": "tsc -p tsconfig.types.json",
            "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
            clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
            "extract:docs": "api-extractor run --local",
            "generate:client": "node ../../scripts/generate-clients/single-service --solo bedrock"
        },
        main: "./dist-cjs/index.js",
        types: "./dist-types/index.d.ts",
        module: "./dist-es/index.js",
        sideEffects: !1,
        dependencies: {
            "@aws-crypto/sha256-browser": "5.2.0",
            "@aws-crypto/sha256-js": "5.2.0",
            "@aws-sdk/core": "3.840.0",
            "@aws-sdk/credential-provider-node": "3.840.0",
            "@aws-sdk/middleware-host-header": "3.840.0",
            "@aws-sdk/middleware-logger": "3.840.0",
            "@aws-sdk/middleware-recursion-detection": "3.840.0",
            "@aws-sdk/middleware-user-agent": "3.840.0",
            "@aws-sdk/region-config-resolver": "3.840.0",
            "@aws-sdk/token-providers": "3.840.0",
            "@aws-sdk/types": "3.840.0",
            "@aws-sdk/util-endpoints": "3.840.0",
            "@aws-sdk/util-user-agent-browser": "3.840.0",
            "@aws-sdk/util-user-agent-node": "3.840.0",
            "@smithy/config-resolver": "^4.1.4",
            "@smithy/core": "^3.6.0",
            "@smithy/fetch-http-handler": "^5.0.4",
            "@smithy/hash-node": "^4.0.4",
            "@smithy/invalid-dependency": "^4.0.4",
            "@smithy/middleware-content-length": "^4.0.4",
            "@smithy/middleware-endpoint": "^4.1.13",
            "@smithy/middleware-retry": "^4.1.14",
            "@smithy/middleware-serde": "^4.0.8",
            "@smithy/middleware-stack": "^4.0.4",
            "@smithy/node-config-provider": "^4.1.3",
            "@smithy/node-http-handler": "^4.0.6",
            "@smithy/protocol-http": "^5.1.2",
            "@smithy/smithy-client": "^4.4.5",
            "@smithy/types": "^4.3.1",
            "@smithy/url-parser": "^4.0.4",
            "@smithy/util-base64": "^4.0.0",
            "@smithy/util-body-length-browser": "^4.0.0",
            "@smithy/util-body-length-node": "^4.0.0",
            "@smithy/util-defaults-mode-browser": "^4.0.21",
            "@smithy/util-defaults-mode-node": "^4.0.21",
            "@smithy/util-endpoints": "^3.0.6",
            "@smithy/util-middleware": "^4.0.4",
            "@smithy/util-retry": "^4.0.6",
            "@smithy/util-utf8": "^4.0.0",
            "@types/uuid": "^9.0.1",
            tslib: "^2.6.2",
            uuid: "^9.0.1"
        },
        devDependencies: {
            "@tsconfig/node18": "18.2.4",
            "@types/node": "^18.19.69",
            concurrently: "7.0.0",
            "downlevel-dts": "0.10.1",
            rimraf: "3.0.2",
            typescript: "~5.8.3"
        },
        engines: {
            node: ">=18.0.0"
        },
        typesVersions: {
            "<4.0": {
                "dist-types/*": ["dist-types/ts3.4/*"]
            }
        },
        files: ["dist-*/**"],
        author: {
            name: "AWS SDK for JavaScript Team",
            url: "https://aws.amazon.com/javascript/"
        },
        license: "Apache-2.0",
        browser: {
            "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
        },
        "react-native": {
            "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
        },
        homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-bedrock",
        repository: {
            type: "git",
            url: "https://github.com/aws/aws-sdk-js-v3.git",
            directory: "clients/client-bedrock"
        }
    }
});