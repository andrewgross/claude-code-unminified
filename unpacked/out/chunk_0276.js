/* chunk:276 bytes:[5913027, 5930271) size:17244 source:unpacked-cli.js */
var bV = E((C51) => {
    Object.defineProperty(C51, "__esModule", {
        value: !0
    });
    var zD0 = Zu();
    zD0.__exportStar(FE(), C51);
    zD0.__exportStar(DD0(), C51);
    zD0.__exportStar(sH2(), C51)
});
var K51 = E((tM5, Iz2) => {
    var {
        defineProperty: iM1,
        getOwnPropertyDescriptor: Bg4,
        getOwnPropertyNames: Qg4
    } = Object, Zg4 = Object.prototype.hasOwnProperty, DP = (A, B) => iM1(A, "name", {
        value: B,
        configurable: !0
    }), Dg4 = (A, B) => {
        for (var Q in B) iM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Gg4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Qg4(B))
                if (!Zg4.call(A, D) && D !== Q) iM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Bg4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Fg4 = (A) => Gg4(iM1({}, "__esModule", {
        value: !0
    }), A), eH2 = {};
    Dg4(eH2, {
        DEFAULT_UA_APP_ID: () => Az2,
        getUserAgentMiddlewareOptions: () => Fz2,
        getUserAgentPlugin: () => Kg4,
        resolveUserAgentConfig: () => Qz2,
        userAgentMiddleware: () => Gz2
    });
    Iz2.exports = Fg4(eH2);
    var Ig4 = HB(),
        Az2 = void 0;

    function Bz2(A) {
        if (A === void 0) return !0;
        return typeof A === "string" && A.length <= 50
    }
    DP(Bz2, "isValidUserAgentAppId");

    function Qz2(A) {
        let B = Ig4.normalizeProvider(A.userAgentAppId ?? Az2),
            {
                customUserAgent: Q
            } = A;
        return Object.assign(A, {
            customUserAgent: typeof Q === "string" ? [
                [Q]
            ] : Q,
            userAgentAppId: DP(async () => {
                let Z = await B();
                if (!Bz2(Z)) {
                    let D = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console : A.logger;
                    if (typeof Z !== "string") D?.warn("userAgentAppId must be a string or undefined.");
                    else if (Z.length > 50) D?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.")
                }
                return Z
            }, "userAgentAppId")
        })
    }
    DP(Qz2, "resolveUserAgentConfig");
    var Yg4 = Y51(),
        Wg4 = SK(),
        fL = bV(),
        Jg4 = /\d{12}\.ddb/;
    async function Zz2(A, B, Q) {
        if (Q.request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") fL.setFeature(A, "PROTOCOL_RPC_V2_CBOR", "M");
        if (typeof B.retryStrategy === "function") {
            let G = await B.retryStrategy();
            if (typeof G.acquireInitialRetryToken === "function")
                if (G.constructor?.name?.includes("Adaptive")) fL.setFeature(A, "RETRY_MODE_ADAPTIVE", "F");
                else fL.setFeature(A, "RETRY_MODE_STANDARD", "E");
            else fL.setFeature(A, "RETRY_MODE_LEGACY", "D")
        }
        if (typeof B.accountIdEndpointMode === "function") {
            let G = A.endpointV2;
            if (String(G?.url?.hostname).match(Jg4)) fL.setFeature(A, "ACCOUNT_ID_ENDPOINT", "O");
            switch (await B.accountIdEndpointMode?.()) {
                case "disabled":
                    fL.setFeature(A, "ACCOUNT_ID_MODE_DISABLED", "Q");
                    break;
                case "preferred":
                    fL.setFeature(A, "ACCOUNT_ID_MODE_PREFERRED", "P");
                    break;
                case "required":
                    fL.setFeature(A, "ACCOUNT_ID_MODE_REQUIRED", "R");
                    break
            }
        }
        let D = A.__smithy_context?.selectedHttpAuthScheme?.identity;
        if (D?.$source) {
            let G = D;
            if (G.accountId) fL.setFeature(A, "RESOLVED_ACCOUNT_ID", "T");
            for (let [F, I] of Object.entries(G.$source ?? {})) fL.setFeature(A, F, I)
        }
    }
    DP(Zz2, "checkFeatures");
    var rH2 = "user-agent",
        ED0 = "x-amz-user-agent",
        oH2 = " ",
        UD0 = "/",
        Xg4 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g,
        Vg4 = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g,
        tH2 = "-",
        Cg4 = 1024;

    function Dz2(A) {
        let B = "";
        for (let Q in A) {
            let Z = A[Q];
            if (B.length + Z.length + 1 <= Cg4) {
                if (B.length) B += "," + Z;
                else B += Z;
                continue
            }
            break
        }
        return B
    }
    DP(Dz2, "encodeFeatures");
    var Gz2 = DP((A) => (B, Q) => async (Z) => {
            let {
                request: D
            } = Z;
            if (!Wg4.HttpRequest.isInstance(D)) return B(Z);
            let {
                headers: G
            } = D, F = Q?.userAgent?.map(pM1) || [], I = (await A.defaultUserAgentProvider()).map(pM1);
            await Zz2(Q, A, Z);
            let Y = Q;
            I.push(`m/${Dz2(Object.assign({},Q.__smithy_context?.features,Y.__aws_sdk_context?.features))}`);
            let W = A?.customUserAgent?.map(pM1) || [],
                J = await A.userAgentAppId();
            if (J) I.push(pM1([`app/${J}`]));
            let X = Yg4.getUserAgentPrefix(),
                V = (X ? [X] : []).concat([...I, ...F, ...W]).join(oH2),
                C = [...I.filter((K) => K.startsWith("aws-sdk-")), ...W].join(oH2);
            if (A.runtime !== "browser") {
                if (C) G[ED0] = G[ED0] ? `${G[rH2]} ${C}` : C;
                G[rH2] = V
            } else G[ED0] = V;
            return B({
                ...Z,
                request: D
            })
        }, "userAgentMiddleware"),
        pM1 = DP((A) => {
            let B = A[0].split(UD0).map((F) => F.replace(Xg4, tH2)).join(UD0),
                Q = A[1]?.replace(Vg4, tH2),
                Z = B.indexOf(UD0),
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
        Fz2 = {
            name: "getUserAgentMiddleware",
            step: "build",
            priority: "low",
            tags: ["SET_USER_AGENT", "USER_AGENT"],
            override: !0
        },
        Kg4 = DP((A) => ({
            applyToStack: DP((B) => {
                B.add(Gz2(A), Fz2)
            }, "applyToStack")
        }), "getUserAgentPlugin")
});
var $D0 = E((Yz2) => {
    Object.defineProperty(Yz2, "__esModule", {
        value: !0
    });
    Yz2.resolveHttpAuthSchemeConfig = Yz2.resolveStsAuthConfig = Yz2.defaultSTSHttpAuthSchemeProvider = Yz2.defaultSTSHttpAuthSchemeParametersProvider = void 0;
    var Hg4 = bV(),
        wD0 = E5(),
        zg4 = H51(),
        Eg4 = async (A, B, Q) => {
            return {
                operation: wD0.getSmithyContext(B).operation,
                region: await wD0.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    Yz2.defaultSTSHttpAuthSchemeParametersProvider = Eg4;

    function Ug4(A) {
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

    function wg4(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var $g4 = (A) => {
        let B = [];
        switch (A.operation) {
            case "AssumeRoleWithWebIdentity": {
                B.push(wg4(A));
                break
            }
            default:
                B.push(Ug4(A))
        }
        return B
    };
    Yz2.defaultSTSHttpAuthSchemeProvider = $g4;
    var qg4 = (A) => Object.assign(A, {
        stsClientCtor: zg4.STSClient
    });
    Yz2.resolveStsAuthConfig = qg4;
    var Ng4 = (A) => {
        let B = Yz2.resolveStsAuthConfig(A),
            Q = Hg4.resolveAwsSdkSigV4Config(B);
        return Object.assign(Q, {
            authSchemePreference: wD0.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    Yz2.resolveHttpAuthSchemeConfig = Ng4
});
var z51 = E((Xz2) => {
    Object.defineProperty(Xz2, "__esModule", {
        value: !0
    });
    Xz2.commonParams = Xz2.resolveClientEndpointParameters = void 0;
    var Rg4 = (A) => {
        return Object.assign(A, {
            useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
            useFipsEndpoint: A.useFipsEndpoint ?? !1,
            useGlobalEndpoint: A.useGlobalEndpoint ?? !1,
            defaultSigningName: "sts"
        })
    };
    Xz2.resolveClientEndpointParameters = Rg4;
    Xz2.commonParams = {
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
var qD0 = E((BR5, Tg4) => {
    Tg4.exports = {
        name: "@aws-sdk/nested-clients",
        version: "3.840.0",
        description: "Nested clients for AWS SDK packages.",
        main: "./dist-cjs/index.js",
        module: "./dist-es/index.js",
        types: "./dist-types/index.d.ts",
        scripts: {
            build: "yarn lint && concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
            "build:cjs": "node ../../scripts/compilation/inline nested-clients",
            "build:es": "tsc -p tsconfig.es.json",
            "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
            "build:types": "tsc -p tsconfig.types.json",
            "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
            clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
            lint: "node ../../scripts/validation/submodules-linter.js --pkg nested-clients",
            test: "yarn g:vitest run",
            "test:watch": "yarn g:vitest watch"
        },
        engines: {
            node: ">=18.0.0"
        },
        author: {
            name: "AWS SDK for JavaScript Team",
            url: "https://aws.amazon.com/javascript/"
        },
        license: "Apache-2.0",
        dependencies: {
            "@aws-crypto/sha256-browser": "5.2.0",
            "@aws-crypto/sha256-js": "5.2.0",
            "@aws-sdk/core": "3.840.0",
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
            concurrently: "7.0.0",
            "downlevel-dts": "0.10.1",
            rimraf: "3.0.2",
            typescript: "~5.8.3"
        },
        typesVersions: {
            "<4.0": {
                "dist-types/*": ["dist-types/ts3.4/*"]
            }
        },
        files: ["./sso-oidc.d.ts", "./sso-oidc.js", "./sts.d.ts", "./sts.js", "dist-*/**"],
        browser: {
            "./dist-es/submodules/sso-oidc/runtimeConfig": "./dist-es/submodules/sso-oidc/runtimeConfig.browser",
            "./dist-es/submodules/sts/runtimeConfig": "./dist-es/submodules/sts/runtimeConfig.browser"
        },
        "react-native": {},
        homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients",
        repository: {
            type: "git",
            url: "https://github.com/aws/aws-sdk-js-v3.git",
            directory: "packages/nested-clients"
        },
        exports: {
            "./sso-oidc": {
                types: "./dist-types/submodules/sso-oidc/index.d.ts",
                module: "./dist-es/submodules/sso-oidc/index.js",
                node: "./dist-cjs/submodules/sso-oidc/index.js",
                import: "./dist-es/submodules/sso-oidc/index.js",
                require: "./dist-cjs/submodules/sso-oidc/index.js"
            },
            "./sts": {
                types: "./dist-types/submodules/sts/index.d.ts",
                module: "./dist-es/submodules/sts/index.js",
                node: "./dist-cjs/submodules/sts/index.js",
                import: "./dist-es/submodules/sts/index.js",
                require: "./dist-cjs/submodules/sts/index.js"
            }
        }
    }
});
var sM1 = E((QR5, wz2) => {
    var {
        defineProperty: aM1,
        getOwnPropertyDescriptor: Pg4,
        getOwnPropertyNames: Sg4
    } = Object, jg4 = Object.prototype.hasOwnProperty, nM1 = (A, B) => aM1(A, "name", {
        value: B,
        configurable: !0
    }), kg4 = (A, B) => {
        for (var Q in B) aM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, yg4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Sg4(B))
                if (!jg4.call(A, D) && D !== Q) aM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Pg4(B, D)) || Z.enumerable
                })
        }
        return A
    }, _g4 = (A) => yg4(aM1({}, "__esModule", {
        value: !0
    }), A), Kz2 = {};
    kg4(Kz2, {
        NODE_APP_ID_CONFIG_OPTIONS: () => hg4,
        UA_APP_ID_ENV_NAME: () => Ez2,
        UA_APP_ID_INI_NAME: () => Uz2,
        createDefaultUserAgentProvider: () => zz2,
        crtAvailability: () => Hz2,
        defaultUserAgent: () => vg4
    });
    wz2.exports = _g4(Kz2);
    var Cz2 = W1("os"),
        ND0 = W1("process"),
        Hz2 = {
            isCrtAvailable: !1
        },
        xg4 = nM1(() => {
            if (Hz2.isCrtAvailable) return ["md/crt-avail"];
            return null
        }, "isCrtAvailable"),
        zz2 = nM1(({
            serviceId: A,
            clientVersion: B
        }) => {
            return async (Q) => {
                let Z = [
                        ["aws-sdk-js", B],
                        ["ua", "2.1"],
                        [`os/${Cz2.platform()}`, Cz2.release()],
                        ["lang/js"],
                        ["md/nodejs", `${ND0.versions.node}`]
                    ],
                    D = xg4();
                if (D) Z.push(D);
                if (A) Z.push([`api/${A}`, B]);
                if (ND0.env.AWS_EXECUTION_ENV) Z.push([`exec-env/${ND0.env.AWS_EXECUTION_ENV}`]);
                let G = await Q?.userAgentAppId?.();
                return G ? [...Z, [`app/${G}`]] : [...Z]
            }
        }, "createDefaultUserAgentProvider"),
        vg4 = zz2,
        bg4 = K51(),
        Ez2 = "AWS_SDK_UA_APP_ID",
        Uz2 = "sdk_ua_app_id",
        fg4 = "sdk-ua-app-id",
        hg4 = {
            environmentVariableSelector: nM1((A) => A[Ez2], "environmentVariableSelector"),
            configFileSelector: nM1((A) => A[Uz2] ?? A[fg4], "configFileSelector"),
            default: bg4.DEFAULT_UA_APP_ID
        }
});