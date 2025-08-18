/* chunk:103 bytes:[2447210, 2457104) size:9894 source:unpacked-cli.js */
var xzA = E((IQ5, mCQ) => {
    mCQ.exports = {
        name: "@aws-sdk/client-sso",
        description: "AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native",
        version: "3.797.0",
        scripts: {
            build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
            "build:cjs": "node ../../scripts/compilation/inline client-sso",
            "build:es": "tsc -p tsconfig.es.json",
            "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
            "build:types": "tsc -p tsconfig.types.json",
            "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
            clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
            "extract:docs": "api-extractor run --local",
            "generate:client": "node ../../scripts/generate-clients/single-service --solo sso"
        },
        main: "./dist-cjs/index.js",
        types: "./dist-types/index.d.ts",
        module: "./dist-es/index.js",
        sideEffects: !1,
        dependencies: {
            "@aws-crypto/sha256-browser": "5.2.0",
            "@aws-crypto/sha256-js": "5.2.0",
            "@aws-sdk/core": "3.796.0",
            "@aws-sdk/middleware-host-header": "3.775.0",
            "@aws-sdk/middleware-logger": "3.775.0",
            "@aws-sdk/middleware-recursion-detection": "3.775.0",
            "@aws-sdk/middleware-user-agent": "3.796.0",
            "@aws-sdk/region-config-resolver": "3.775.0",
            "@aws-sdk/types": "3.775.0",
            "@aws-sdk/util-endpoints": "3.787.0",
            "@aws-sdk/util-user-agent-browser": "3.775.0",
            "@aws-sdk/util-user-agent-node": "3.796.0",
            "@smithy/config-resolver": "^4.1.0",
            "@smithy/core": "^3.2.0",
            "@smithy/fetch-http-handler": "^5.0.2",
            "@smithy/hash-node": "^4.0.2",
            "@smithy/invalid-dependency": "^4.0.2",
            "@smithy/middleware-content-length": "^4.0.2",
            "@smithy/middleware-endpoint": "^4.1.0",
            "@smithy/middleware-retry": "^4.1.0",
            "@smithy/middleware-serde": "^4.0.3",
            "@smithy/middleware-stack": "^4.0.2",
            "@smithy/node-config-provider": "^4.0.2",
            "@smithy/node-http-handler": "^4.0.4",
            "@smithy/protocol-http": "^5.1.0",
            "@smithy/smithy-client": "^4.2.0",
            "@smithy/types": "^4.2.0",
            "@smithy/url-parser": "^4.0.2",
            "@smithy/util-base64": "^4.0.0",
            "@smithy/util-body-length-browser": "^4.0.0",
            "@smithy/util-body-length-node": "^4.0.0",
            "@smithy/util-defaults-mode-browser": "^4.0.8",
            "@smithy/util-defaults-mode-node": "^4.0.8",
            "@smithy/util-endpoints": "^3.0.2",
            "@smithy/util-middleware": "^4.0.2",
            "@smithy/util-retry": "^4.0.2",
            "@smithy/util-utf8": "^4.0.0",
            tslib: "^2.6.2"
        },
        devDependencies: {
            "@tsconfig/node18": "18.2.4",
            "@types/node": "^18.19.69",
            concurrently: "7.0.0",
            "downlevel-dts": "0.10.1",
            rimraf: "3.0.2",
            typescript: "~5.2.2"
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
        homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso",
        repository: {
            type: "git",
            url: "https://github.com/aws/aws-sdk-js-v3.git",
            directory: "clients/client-sso"
        }
    }
});
var HQ1 = E((YQ5, mzA) => {
    var {
        defineProperty: AE1,
        getOwnPropertyDescriptor: dCQ,
        getOwnPropertyNames: cCQ
    } = Object, lCQ = Object.prototype.hasOwnProperty, ez1 = (A, B) => AE1(A, "name", {
        value: B,
        configurable: !0
    }), pCQ = (A, B) => {
        for (var Q in B) AE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, iCQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of cCQ(B))
                if (!lCQ.call(A, D) && D !== Q) AE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = dCQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, nCQ = (A) => iCQ(AE1({}, "__esModule", {
        value: !0
    }), A), bzA = {};
    pCQ(bzA, {
        NODE_APP_ID_CONFIG_OPTIONS: () => tCQ,
        UA_APP_ID_ENV_NAME: () => gzA,
        UA_APP_ID_INI_NAME: () => uzA,
        createDefaultUserAgentProvider: () => hzA,
        crtAvailability: () => fzA,
        defaultUserAgent: () => sCQ
    });
    mzA.exports = nCQ(bzA);
    var vzA = W1("os"),
        at1 = W1("process"),
        fzA = {
            isCrtAvailable: !1
        },
        aCQ = ez1(() => {
            if (fzA.isCrtAvailable) return ["md/crt-avail"];
            return null
        }, "isCrtAvailable"),
        hzA = ez1(({
            serviceId: A,
            clientVersion: B
        }) => {
            return async (Q) => {
                let Z = [
                        ["aws-sdk-js", B],
                        ["ua", "2.1"],
                        [`os/${vzA.platform()}`, vzA.release()],
                        ["lang/js"],
                        ["md/nodejs", `${at1.versions.node}`]
                    ],
                    D = aCQ();
                if (D) Z.push(D);
                if (A) Z.push([`api/${A}`, B]);
                if (at1.env.AWS_EXECUTION_ENV) Z.push([`exec-env/${at1.env.AWS_EXECUTION_ENV}`]);
                let G = await Q?.userAgentAppId?.();
                return G ? [...Z, [`app/${G}`]] : [...Z]
            }
        }, "createDefaultUserAgentProvider"),
        sCQ = hzA,
        rCQ = fi(),
        gzA = "AWS_SDK_UA_APP_ID",
        uzA = "sdk_ua_app_id",
        oCQ = "sdk-ua-app-id",
        tCQ = {
            environmentVariableSelector: ez1((A) => A[gzA], "environmentVariableSelector"),
            configFileSelector: ez1((A) => A[uzA] ?? A[oCQ], "configFileSelector"),
            default: rCQ.DEFAULT_UA_APP_ID
        }
});
var st1 = E((WQ5, rzA) => {
    var {
        defineProperty: BE1,
        getOwnPropertyDescriptor: eCQ,
        getOwnPropertyNames: AKQ
    } = Object, BKQ = Object.prototype.hasOwnProperty, QE1 = (A, B) => BE1(A, "name", {
        value: B,
        configurable: !0
    }), QKQ = (A, B) => {
        for (var Q in B) BE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, ZKQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of AKQ(B))
                if (!BKQ.call(A, D) && D !== Q) BE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = eCQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, DKQ = (A) => ZKQ(BE1({}, "__esModule", {
        value: !0
    }), A), dzA = {};
    QKQ(dzA, {
        AlgorithmId: () => izA,
        EndpointURLScheme: () => pzA,
        FieldPosition: () => nzA,
        HttpApiKeyAuthLocation: () => lzA,
        HttpAuthLocation: () => czA,
        IniSectionType: () => azA,
        RequestHandlerProtocol: () => szA,
        SMITHY_CONTEXT_KEY: () => WKQ,
        getDefaultClientConfiguration: () => IKQ,
        resolveDefaultRuntimeConfig: () => YKQ
    });
    rzA.exports = DKQ(dzA);
    var czA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(czA || {}),
        lzA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(lzA || {}),
        pzA = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(pzA || {}),
        izA = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(izA || {}),
        GKQ = QE1((A) => {
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
        FKQ = QE1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        IKQ = QE1((A) => {
            return GKQ(A)
        }, "getDefaultClientConfiguration"),
        YKQ = QE1((A) => {
            return FKQ(A)
        }, "resolveDefaultRuntimeConfig"),
        nzA = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(nzA || {}),
        WKQ = "__smithy_context",
        azA = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(azA || {}),
        szA = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(szA || {})
});