/* chunk:255 bytes:[5487646, 5507266) size:19620 source:unpacked-cli.js */
var UI = E((l81) => {
    Object.defineProperty(l81, "__esModule", {
        value: !0
    });
    var r30 = Du();
    r30.__exportStar(ow(), l81);
    r30.__exportStar(k30(), l81);
    r30.__exportStar(xG2(), l81)
});
var hr = E((HN5, iG2) => {
    var {
        defineProperty: fL1,
        getOwnPropertyDescriptor: tM4,
        getOwnPropertyNames: eM4
    } = Object, AR4 = Object.prototype.hasOwnProperty, sT = (A, B) => fL1(A, "name", {
        value: B,
        configurable: !0
    }), BR4 = (A, B) => {
        for (var Q in B) fL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, QR4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of eM4(B))
                if (!AR4.call(A, D) && D !== Q) fL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = tM4(B, D)) || Z.enumerable
                })
        }
        return A
    }, ZR4 = (A) => QR4(fL1({}, "__esModule", {
        value: !0
    }), A), hG2 = {};
    BR4(hG2, {
        DEFAULT_UA_APP_ID: () => gG2,
        getUserAgentMiddlewareOptions: () => pG2,
        getUserAgentPlugin: () => XR4,
        resolveUserAgentConfig: () => mG2,
        userAgentMiddleware: () => lG2
    });
    iG2.exports = ZR4(hG2);
    var DR4 = HB(),
        gG2 = void 0;

    function uG2(A) {
        if (A === void 0) return !0;
        return typeof A === "string" && A.length <= 50
    }
    sT(uG2, "isValidUserAgentAppId");

    function mG2(A) {
        let B = DR4.normalizeProvider(A.userAgentAppId ?? gG2),
            {
                customUserAgent: Q
            } = A;
        return Object.assign(A, {
            customUserAgent: typeof Q === "string" ? [
                [Q]
            ] : Q,
            userAgentAppId: sT(async () => {
                let Z = await B();
                if (!uG2(Z)) {
                    let D = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console : A.logger;
                    if (typeof Z !== "string") D?.warn("userAgentAppId must be a string or undefined.");
                    else if (Z.length > 50) D?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.")
                }
                return Z
            }, "userAgentAppId")
        })
    }
    sT(mG2, "resolveUserAgentConfig");
    var GR4 = yr(),
        FR4 = vV(),
        kL = UI(),
        IR4 = /\d{12}\.ddb/;
    async function dG2(A, B, Q) {
        if (Q.request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") kL.setFeature(A, "PROTOCOL_RPC_V2_CBOR", "M");
        if (typeof B.retryStrategy === "function") {
            let G = await B.retryStrategy();
            if (typeof G.acquireInitialRetryToken === "function")
                if (G.constructor?.name?.includes("Adaptive")) kL.setFeature(A, "RETRY_MODE_ADAPTIVE", "F");
                else kL.setFeature(A, "RETRY_MODE_STANDARD", "E");
            else kL.setFeature(A, "RETRY_MODE_LEGACY", "D")
        }
        if (typeof B.accountIdEndpointMode === "function") {
            let G = A.endpointV2;
            if (String(G?.url?.hostname).match(IR4)) kL.setFeature(A, "ACCOUNT_ID_ENDPOINT", "O");
            switch (await B.accountIdEndpointMode?.()) {
                case "disabled":
                    kL.setFeature(A, "ACCOUNT_ID_MODE_DISABLED", "Q");
                    break;
                case "preferred":
                    kL.setFeature(A, "ACCOUNT_ID_MODE_PREFERRED", "P");
                    break;
                case "required":
                    kL.setFeature(A, "ACCOUNT_ID_MODE_REQUIRED", "R");
                    break
            }
        }
        let D = A.__smithy_context?.selectedHttpAuthScheme?.identity;
        if (D?.$source) {
            let G = D;
            if (G.accountId) kL.setFeature(A, "RESOLVED_ACCOUNT_ID", "T");
            for (let [F, I] of Object.entries(G.$source ?? {})) kL.setFeature(A, F, I)
        }
    }
    sT(dG2, "checkFeatures");
    var vG2 = "user-agent",
        o30 = "x-amz-user-agent",
        bG2 = " ",
        t30 = "/",
        YR4 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g,
        WR4 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g,
        fG2 = "-",
        JR4 = 1024;

    function cG2(A) {
        let B = "";
        for (let Q in A) {
            let Z = A[Q];
            if (B.length + Z.length + 1 <= JR4) {
                if (B.length) B += "," + Z;
                else B += Z;
                continue
            }
            break
        }
        return B
    }
    sT(cG2, "encodeFeatures");
    var lG2 = sT((A) => (B, Q) => async (Z) => {
            let {
                request: D
            } = Z;
            if (!FR4.HttpRequest.isInstance(D)) return B(Z);
            let {
                headers: G
            } = D, F = Q?.userAgent?.map(bL1) || [], I = (await A.defaultUserAgentProvider()).map(bL1);
            await dG2(Q, A, Z);
            let Y = Q;
            I.push(`m/${cG2(Object.assign({},Q.__smithy_context?.features,Y.__aws_sdk_context?.features))}`);
            let W = A?.customUserAgent?.map(bL1) || [],
                J = await A.userAgentAppId();
            if (J) I.push(bL1([`app/${J}`]));
            let X = GR4.getUserAgentPrefix(),
                V = (X ? [X] : []).concat([...I, ...F, ...W]).join(bG2),
                C = [...I.filter((K) => K.startsWith("aws-sdk-")), ...W].join(bG2);
            if (A.runtime !== "browser") {
                if (C) G[o30] = G[o30] ? `${G[vG2]} ${C}` : C;
                G[vG2] = V
            } else G[o30] = V;
            return B({
                ...Z,
                request: D
            })
        }, "userAgentMiddleware"),
        bL1 = sT((A) => {
            let B = A[0].split(t30).map((F) => F.replace(YR4, fG2)).join(t30),
                Q = A[1]?.replace(WR4, fG2),
                Z = B.indexOf(t30),
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
        pG2 = {
            name: "getUserAgentMiddleware",
            step: "build",
            priority: "low",
            tags: ["SET_USER_AGENT", "USER_AGENT"],
            override: !0
        },
        XR4 = sT((A) => ({
            applyToStack: sT((B) => {
                B.add(lG2(A), pG2)
            }, "applyToStack")
        }), "getUserAgentPlugin")
});
var A70 = E((nG2) => {
    Object.defineProperty(nG2, "__esModule", {
        value: !0
    });
    nG2.resolveHttpAuthSchemeConfig = nG2.defaultCognitoIdentityHttpAuthSchemeProvider = nG2.defaultCognitoIdentityHttpAuthSchemeParametersProvider = void 0;
    var VR4 = UI(),
        e30 = E5(),
        CR4 = async (A, B, Q) => {
            return {
                operation: e30.getSmithyContext(B).operation,
                region: await e30.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    nG2.defaultCognitoIdentityHttpAuthSchemeParametersProvider = CR4;

    function KR4(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "cognito-identity",
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

    function hL1(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var HR4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "GetCredentialsForIdentity": {
                B.push(hL1(A));
                break
            }
            case "GetId": {
                B.push(hL1(A));
                break
            }
            case "GetOpenIdToken": {
                B.push(hL1(A));
                break
            }
            case "UnlinkIdentity": {
                B.push(hL1(A));
                break
            }
            default:
                B.push(KR4(A))
        }
        return B
    };
    nG2.defaultCognitoIdentityHttpAuthSchemeProvider = HR4;
    var zR4 = (A) => {
        let B = VR4.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: e30.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    nG2.resolveHttpAuthSchemeConfig = zR4
});
var sG2 = E((EN5, wR4) => {
    wR4.exports = {
        name: "@aws-sdk/client-cognito-identity",
        description: "AWS SDK for JavaScript Cognito Identity Client for Node.js, Browser and React Native",
        version: "3.840.0",
        scripts: {
            build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
            "build:cjs": "node ../../scripts/compilation/inline client-cognito-identity",
            "build:es": "tsc -p tsconfig.es.json",
            "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
            "build:types": "tsc -p tsconfig.types.json",
            "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
            clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
            "extract:docs": "api-extractor run --local",
            "generate:client": "node ../../scripts/generate-clients/single-service --solo cognito-identity",
            "test:e2e": "yarn g:vitest run -c vitest.config.e2e.ts --mode development",
            "test:e2e:watch": "yarn g:vitest watch -c vitest.config.e2e.ts"
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
            "@aws-sdk/client-iam": "3.840.0",
            "@tsconfig/node18": "18.2.4",
            "@types/chai": "^4.2.11",
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
        homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-cognito-identity",
        repository: {
            type: "git",
            url: "https://github.com/aws/aws-sdk-js-v3.git",
            directory: "clients/client-cognito-identity"
        }
    }
});
var B70 = E((UN5, ZF2) => {
    var {
        defineProperty: gL1,
        getOwnPropertyDescriptor: $R4,
        getOwnPropertyNames: qR4
    } = Object, NR4 = Object.prototype.hasOwnProperty, LR4 = (A, B) => gL1(A, "name", {
        value: B,
        configurable: !0
    }), MR4 = (A, B) => {
        for (var Q in B) gL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, RR4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of qR4(B))
                if (!NR4.call(A, D) && D !== Q) gL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = $R4(B, D)) || Z.enumerable
                })
        }
        return A
    }, OR4 = (A) => RR4(gL1({}, "__esModule", {
        value: !0
    }), A), rG2 = {};
    MR4(rG2, {
        ENV_ACCOUNT_ID: () => QF2,
        ENV_CREDENTIAL_SCOPE: () => BF2,
        ENV_EXPIRATION: () => AF2,
        ENV_KEY: () => oG2,
        ENV_SECRET: () => tG2,
        ENV_SESSION: () => eG2,
        fromEnv: () => SR4
    });
    ZF2.exports = OR4(rG2);
    var TR4 = ow(),
        PR4 = A9(),
        oG2 = "AWS_ACCESS_KEY_ID",
        tG2 = "AWS_SECRET_ACCESS_KEY",
        eG2 = "AWS_SESSION_TOKEN",
        AF2 = "AWS_CREDENTIAL_EXPIRATION",
        BF2 = "AWS_CREDENTIAL_SCOPE",
        QF2 = "AWS_ACCOUNT_ID",
        SR4 = LR4((A) => async () => {
            A?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
            let B = process.env[oG2],
                Q = process.env[tG2],
                Z = process.env[eG2],
                D = process.env[AF2],
                G = process.env[BF2],
                F = process.env[QF2];
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
                return TR4.setCredentialFeature(I, "CREDENTIALS_ENV_VARS", "g"), I
            }
            throw new PR4.CredentialsProviderError("Unable to find environment variable credentials.", {
                logger: A?.logger
            })
        }, "fromEnv")
});
var FF2 = E((DF2) => {
    Object.defineProperty(DF2, "__esModule", {
        value: !0
    });
    DF2.checkUrl = void 0;
    var jR4 = A9(),
        kR4 = "169.254.170.2",
        yR4 = "169.254.170.23",
        _R4 = "[fd00:ec2::23]",
        xR4 = (A, B) => {
            if (A.protocol === "https:") return;
            if (A.hostname === kR4 || A.hostname === yR4 || A.hostname === _R4) return;
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
            throw new jR4.CredentialsProviderError(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`, {
                logger: B
            })
        };
    DF2.checkUrl = xR4
});
var YF2 = E((IF2) => {
    Object.defineProperty(IF2, "__esModule", {
        value: !0
    });
    IF2.createGetRequest = hR4;
    IF2.getCredentials = gR4;
    var Q70 = A9(),
        vR4 = vV(),
        bR4 = H6(),
        fR4 = $k();

    function hR4(A) {
        return new vR4.HttpRequest({
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
    async function gR4(A, B) {
        let Z = await fR4.sdkStreamMixin(A.body).transformToString();
        if (A.statusCode === 200) {
            let D = JSON.parse(Z);
            if (typeof D.AccessKeyId !== "string" || typeof D.SecretAccessKey !== "string" || typeof D.Token !== "string" || typeof D.Expiration !== "string") throw new Q70.CredentialsProviderError("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }", {
                logger: B
            });
            return {
                accessKeyId: D.AccessKeyId,
                secretAccessKey: D.SecretAccessKey,
                sessionToken: D.Token,
                expiration: bR4.parseRfc3339DateTime(D.Expiration)
            }
        }
        if (A.statusCode >= 400 && A.statusCode < 500) {
            let D = {};
            try {
                D = JSON.parse(Z)
            } catch (G) {}
            throw Object.assign(new Q70.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
                logger: B
            }), {
                Code: D.Code,
                Message: D.Message
            })
        }
        throw new Q70.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
            logger: B
        })
    }
});
var XF2 = E((WF2) => {
    Object.defineProperty(WF2, "__esModule", {
        value: !0
    });
    WF2.retryWrapper = void 0;
    var dR4 = (A, B, Q) => {
        return async () => {
            for (let Z = 0; Z < B; ++Z) try {
                return await A()
            } catch (D) {
                await new Promise((G) => setTimeout(G, Q))
            }
            return await A()
        }
    };
    WF2.retryWrapper = dR4
});