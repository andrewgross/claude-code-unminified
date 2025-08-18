/* chunk:232 bytes:[5034739, 5054731) size:19992 source:unpacked-cli.js */
var HI = E((q81) => {
    Object.defineProperty(q81, "__esModule", {
        value: !0
    });
    var o60 = ig();
    o60.__exportStar(mz(), q81);
    o60.__exportStar(y60(), q81);
    o60.__exportStar(nB2(), q81)
});
var Qr = E((tw5, G92) => {
    var {
        defineProperty: yN1,
        getOwnPropertyDescriptor: qX4,
        getOwnPropertyNames: NX4
    } = Object, LX4 = Object.prototype.hasOwnProperty, ST = (A, B) => yN1(A, "name", {
        value: B,
        configurable: !0
    }), MX4 = (A, B) => {
        for (var Q in B) yN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, RX4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of NX4(B))
                if (!LX4.call(A, D) && D !== Q) yN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = qX4(B, D)) || Z.enumerable
                })
        }
        return A
    }, OX4 = (A) => RX4(yN1({}, "__esModule", {
        value: !0
    }), A), oB2 = {};
    MX4(oB2, {
        DEFAULT_UA_APP_ID: () => tB2,
        getUserAgentMiddlewareOptions: () => D92,
        getUserAgentPlugin: () => xX4,
        resolveUserAgentConfig: () => A92,
        userAgentMiddleware: () => Z92
    });
    G92.exports = OX4(oB2);
    var TX4 = HB(),
        tB2 = void 0;

    function eB2(A) {
        if (A === void 0) return !0;
        return typeof A === "string" && A.length <= 50
    }
    ST(eB2, "isValidUserAgentAppId");

    function A92(A) {
        let B = TX4.normalizeProvider(A.userAgentAppId ?? tB2),
            {
                customUserAgent: Q
            } = A;
        return Object.assign(A, {
            customUserAgent: typeof Q === "string" ? [
                [Q]
            ] : Q,
            userAgentAppId: ST(async () => {
                let Z = await B();
                if (!eB2(Z)) {
                    let D = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console : A.logger;
                    if (typeof Z !== "string") D?.warn("userAgentAppId must be a string or undefined.");
                    else if (Z.length > 50) D?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.")
                }
                return Z
            }, "userAgentAppId")
        })
    }
    ST(A92, "resolveUserAgentConfig");
    var PX4 = rs(),
        SX4 = QX(),
        LL = HI(),
        jX4 = /\d{12}\.ddb/;
    async function B92(A, B, Q) {
        if (Q.request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") LL.setFeature(A, "PROTOCOL_RPC_V2_CBOR", "M");
        if (typeof B.retryStrategy === "function") {
            let G = await B.retryStrategy();
            if (typeof G.acquireInitialRetryToken === "function")
                if (G.constructor?.name?.includes("Adaptive")) LL.setFeature(A, "RETRY_MODE_ADAPTIVE", "F");
                else LL.setFeature(A, "RETRY_MODE_STANDARD", "E");
            else LL.setFeature(A, "RETRY_MODE_LEGACY", "D")
        }
        if (typeof B.accountIdEndpointMode === "function") {
            let G = A.endpointV2;
            if (String(G?.url?.hostname).match(jX4)) LL.setFeature(A, "ACCOUNT_ID_ENDPOINT", "O");
            switch (await B.accountIdEndpointMode?.()) {
                case "disabled":
                    LL.setFeature(A, "ACCOUNT_ID_MODE_DISABLED", "Q");
                    break;
                case "preferred":
                    LL.setFeature(A, "ACCOUNT_ID_MODE_PREFERRED", "P");
                    break;
                case "required":
                    LL.setFeature(A, "ACCOUNT_ID_MODE_REQUIRED", "R");
                    break
            }
        }
        let D = A.__smithy_context?.selectedHttpAuthScheme?.identity;
        if (D?.$source) {
            let G = D;
            if (G.accountId) LL.setFeature(A, "RESOLVED_ACCOUNT_ID", "T");
            for (let [F, I] of Object.entries(G.$source ?? {})) LL.setFeature(A, F, I)
        }
    }
    ST(B92, "checkFeatures");
    var aB2 = "user-agent",
        t60 = "x-amz-user-agent",
        sB2 = " ",
        e60 = "/",
        kX4 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g,
        yX4 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g,
        rB2 = "-",
        _X4 = 1024;

    function Q92(A) {
        let B = "";
        for (let Q in A) {
            let Z = A[Q];
            if (B.length + Z.length + 1 <= _X4) {
                if (B.length) B += "," + Z;
                else B += Z;
                continue
            }
            break
        }
        return B
    }
    ST(Q92, "encodeFeatures");
    var Z92 = ST((A) => (B, Q) => async (Z) => {
            let {
                request: D
            } = Z;
            if (!SX4.HttpRequest.isInstance(D)) return B(Z);
            let {
                headers: G
            } = D, F = Q?.userAgent?.map(kN1) || [], I = (await A.defaultUserAgentProvider()).map(kN1);
            await B92(Q, A, Z);
            let Y = Q;
            I.push(`m/${Q92(Object.assign({},Q.__smithy_context?.features,Y.__aws_sdk_context?.features))}`);
            let W = A?.customUserAgent?.map(kN1) || [],
                J = await A.userAgentAppId();
            if (J) I.push(kN1([`app/${J}`]));
            let X = PX4.getUserAgentPrefix(),
                V = (X ? [X] : []).concat([...I, ...F, ...W]).join(sB2),
                C = [...I.filter((K) => K.startsWith("aws-sdk-")), ...W].join(sB2);
            if (A.runtime !== "browser") {
                if (C) G[t60] = G[t60] ? `${G[aB2]} ${C}` : C;
                G[aB2] = V
            } else G[t60] = V;
            return B({
                ...Z,
                request: D
            })
        }, "userAgentMiddleware"),
        kN1 = ST((A) => {
            let B = A[0].split(e60).map((F) => F.replace(kX4, rB2)).join(e60),
                Q = A[1]?.replace(yX4, rB2),
                Z = B.indexOf(e60),
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
        D92 = {
            name: "getUserAgentMiddleware",
            step: "build",
            priority: "low",
            tags: ["SET_USER_AGENT", "USER_AGENT"],
            override: !0
        },
        xX4 = ST((A) => ({
            applyToStack: ST((B) => {
                B.add(Z92(A), D92)
            }, "applyToStack")
        }), "getUserAgentPlugin")
});
var B80 = E((I92) => {
    Object.defineProperty(I92, "__esModule", {
        value: !0
    });
    I92.resolveHttpAuthSchemeConfig = I92.resolveStsAuthConfig = I92.defaultSTSHttpAuthSchemeProvider = I92.defaultSTSHttpAuthSchemeParametersProvider = void 0;
    var vX4 = HI(),
        A80 = E5(),
        bX4 = N81(),
        fX4 = async (A, B, Q) => {
            return {
                operation: A80.getSmithyContext(B).operation,
                region: await A80.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    I92.defaultSTSHttpAuthSchemeParametersProvider = fX4;

    function hX4(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "sts",
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

    function F92(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var gX4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "AssumeRoleWithSAML": {
                B.push(F92(A));
                break
            }
            case "AssumeRoleWithWebIdentity": {
                B.push(F92(A));
                break
            }
            default:
                B.push(hX4(A))
        }
        return B
    };
    I92.defaultSTSHttpAuthSchemeProvider = gX4;
    var uX4 = (A) => Object.assign(A, {
        stsClientCtor: bX4.STSClient
    });
    I92.resolveStsAuthConfig = uX4;
    var mX4 = (A) => {
        let B = I92.resolveStsAuthConfig(A),
            Q = vX4.resolveAwsSdkSigV4Config(B);
        return Object.assign(Q, {
            authSchemePreference: A80.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    I92.resolveHttpAuthSchemeConfig = mX4
});
var dz = E((J92) => {
    Object.defineProperty(J92, "__esModule", {
        value: !0
    });
    J92.commonParams = J92.resolveClientEndpointParameters = void 0;
    var lX4 = (A) => {
        return Object.assign(A, {
            useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
            useFipsEndpoint: A.useFipsEndpoint ?? !1,
            useGlobalEndpoint: A.useGlobalEndpoint ?? !1,
            defaultSigningName: "sts"
        })
    };
    J92.resolveClientEndpointParameters = lX4;
    J92.commonParams = {
        UseGlobalEndpoint: {
            type: "builtInParams",
            name: "useGlobalEndpoint"
        },
        UseFIPS: {
            type: "builtInParams",
            name: "useFipsEndpoint"
        },
        Endpoint: {
            type: "builtInParams",
            name: "endpoint"
        },
        Region: {
            type: "builtInParams",
            name: "region"
        },
        UseDualStack: {
            type: "builtInParams",
            name: "useDualstackEndpoint"
        }
    }
});
var V92 = E((B$5, iX4) => {
    iX4.exports = {
        name: "@aws-sdk/client-sts",
        description: "AWS SDK for JavaScript Sts Client for Node.js, Browser and React Native",
        version: "3.840.0",
        scripts: {
            build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
            "build:cjs": "node ../../scripts/compilation/inline client-sts",
            "build:es": "tsc -p tsconfig.es.json",
            "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
            "build:types": "rimraf ./dist-types tsconfig.types.tsbuildinfo && tsc -p tsconfig.types.json",
            "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
            clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
            "extract:docs": "api-extractor run --local",
            "generate:client": "node ../../scripts/generate-clients/single-service --solo sts",
            test: "yarn g:vitest run",
            "test:watch": "yarn g:vitest watch"
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
            tslib: "^2.6.2"
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
        homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sts",
        repository: {
            type: "git",
            url: "https://github.com/aws/aws-sdk-js-v3.git",
            directory: "clients/client-sts"
        }
    }
});
var Q80 = E((Q$5, $92) => {
    var {
        defineProperty: _N1,
        getOwnPropertyDescriptor: nX4,
        getOwnPropertyNames: aX4
    } = Object, sX4 = Object.prototype.hasOwnProperty, rX4 = (A, B) => _N1(A, "name", {
        value: B,
        configurable: !0
    }), oX4 = (A, B) => {
        for (var Q in B) _N1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, tX4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of aX4(B))
                if (!sX4.call(A, D) && D !== Q) _N1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = nX4(B, D)) || Z.enumerable
                })
        }
        return A
    }, eX4 = (A) => tX4(_N1({}, "__esModule", {
        value: !0
    }), A), C92 = {};
    oX4(C92, {
        ENV_ACCOUNT_ID: () => w92,
        ENV_CREDENTIAL_SCOPE: () => U92,
        ENV_EXPIRATION: () => E92,
        ENV_KEY: () => K92,
        ENV_SECRET: () => H92,
        ENV_SESSION: () => z92,
        fromEnv: () => QV4
    });
    $92.exports = eX4(C92);
    var AV4 = mz(),
        BV4 = A9(),
        K92 = "AWS_ACCESS_KEY_ID",
        H92 = "AWS_SECRET_ACCESS_KEY",
        z92 = "AWS_SESSION_TOKEN",
        E92 = "AWS_CREDENTIAL_EXPIRATION",
        U92 = "AWS_CREDENTIAL_SCOPE",
        w92 = "AWS_ACCOUNT_ID",
        QV4 = rX4((A) => async () => {
            A?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
            let B = process.env[K92],
                Q = process.env[H92],
                Z = process.env[z92],
                D = process.env[E92],
                G = process.env[U92],
                F = process.env[w92];
            if (B && Q) {
                let I = {
                    accessKeyId: B,
                    secretAccessKey: Q,
                    ...Z && {
                        sessionToken: Z
                    },
                    ...D && {
                        expiration: new Date(D)
                    },
                    ...G && {
                        credentialScope: G
                    },
                    ...F && {
                        accountId: F
                    }
                };
                return AV4.setCredentialFeature(I, "CREDENTIALS_ENV_VARS", "g"), I
            }
            throw new BV4.CredentialsProviderError("Unable to find environment variable credentials.", {
                logger: A?.logger
            })
        }, "fromEnv")
});
var L92 = E((q92) => {
    Object.defineProperty(q92, "__esModule", {
        value: !0
    });
    q92.checkUrl = void 0;
    var ZV4 = A9(),
        DV4 = "169.254.170.2",
        GV4 = "169.254.170.23",
        FV4 = "[fd00:ec2::23]",
        IV4 = (A, B) => {
            if (A.protocol === "https:") return;
            if (A.hostname === DV4 || A.hostname === GV4 || A.hostname === FV4) return;
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
            throw new ZV4.CredentialsProviderError(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`, {
                logger: B
            })
        };
    q92.checkUrl = IV4
});
var R92 = E((M92) => {
    Object.defineProperty(M92, "__esModule", {
        value: !0
    });
    M92.createGetRequest = XV4;
    M92.getCredentials = VV4;
    var Z80 = A9(),
        YV4 = QX(),
        WV4 = d4(),
        JV4 = $k();

    function XV4(A) {
        return new YV4.HttpRequest({
            protocol: A.protocol,
            hostname: A.hostname,
            port: Number(A.port),
            path: A.pathname,
            query: Array.from(A.searchParams.entries()).reduce((B, [Q, Z]) => {
                return B[Q] = Z, B
            }, {}),
            fragment: A.hash
        })
    }
    async function VV4(A, B) {
        let Z = await JV4.sdkStreamMixin(A.body).transformToString();
        if (A.statusCode === 200) {
            let D = JSON.parse(Z);
            if (typeof D.AccessKeyId !== "string" || typeof D.SecretAccessKey !== "string" || typeof D.Token !== "string" || typeof D.Expiration !== "string") throw new Z80.CredentialsProviderError("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }", {
                logger: B
            });
            return {
                accessKeyId: D.AccessKeyId,
                secretAccessKey: D.SecretAccessKey,
                sessionToken: D.Token,
                expiration: WV4.parseRfc3339DateTime(D.Expiration)
            }
        }
        if (A.statusCode >= 400 && A.statusCode < 500) {
            let D = {};
            try {
                D = JSON.parse(Z)
            } catch (G) {}
            throw Object.assign(new Z80.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
                logger: B
            }), {
                Code: D.Code,
                Message: D.Message
            })
        }
        throw new Z80.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
            logger: B
        })
    }
});