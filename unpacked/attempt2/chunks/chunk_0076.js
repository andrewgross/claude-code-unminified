/* chunk:76 bytes:[1761932, 1779656) size:17724 source:unpacked-cli.js */
var _3A = E((y3A) => {
    Object.defineProperty(y3A, "__esModule", {
        value: !0
    });
    y3A.createGetRequest = KAQ;
    y3A.getCredentials = HAQ;
    var fs1 = A9(),
        XAQ = CV(),
        VAQ = V6(),
        CAQ = $k();

    function KAQ(A) {
        return new XAQ.HttpRequest({
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
    async function HAQ(A, B) {
        let Z = await CAQ.sdkStreamMixin(A.body).transformToString();
        if (A.statusCode === 200) {
            let D = JSON.parse(Z);
            if (typeof D.AccessKeyId !== "string" || typeof D.SecretAccessKey !== "string" || typeof D.Token !== "string" || typeof D.Expiration !== "string") throw new fs1.CredentialsProviderError("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }", {
                logger: B
            });
            return {
                accessKeyId: D.AccessKeyId,
                secretAccessKey: D.SecretAccessKey,
                sessionToken: D.Token,
                expiration: VAQ.parseRfc3339DateTime(D.Expiration)
            }
        }
        if (A.statusCode >= 400 && A.statusCode < 500) {
            let D = {};
            try {
                D = JSON.parse(Z)
            } catch (G) {}
            throw Object.assign(new fs1.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
                logger: B
            }), {
                Code: D.Code,
                Message: D.Message
            })
        }
        throw new fs1.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
            logger: B
        })
    }
});
var b3A = E((x3A) => {
    Object.defineProperty(x3A, "__esModule", {
        value: !0
    });
    x3A.retryWrapper = void 0;
    var UAQ = (A, B, Q) => {
        return async () => {
            for (let Z = 0; Z < B; ++Z) try {
                return await A()
            } catch (D) {
                await new Promise((G) => setTimeout(G, Q))
            }
            return await A()
        }
    };
    x3A.retryWrapper = UAQ
});
var m3A = E((g3A) => {
    Object.defineProperty(g3A, "__esModule", {
        value: !0
    });
    g3A.fromHttp = void 0;
    var wAQ = wh(),
        $AQ = Xw(),
        qAQ = x3(),
        f3A = A9(),
        NAQ = wAQ.__importDefault(W1("fs/promises")),
        LAQ = k3A(),
        h3A = _3A(),
        MAQ = b3A(),
        RAQ = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
        OAQ = "http://169.254.170.2",
        TAQ = "AWS_CONTAINER_CREDENTIALS_FULL_URI",
        PAQ = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",
        SAQ = "AWS_CONTAINER_AUTHORIZATION_TOKEN",
        jAQ = (A = {}) => {
            A.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");
            let B, Q = A.awsContainerCredentialsRelativeUri ?? process.env[RAQ],
                Z = A.awsContainerCredentialsFullUri ?? process.env[TAQ],
                D = A.awsContainerAuthorizationToken ?? process.env[SAQ],
                G = A.awsContainerAuthorizationTokenFile ?? process.env[PAQ],
                F = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console.warn : A.logger.warn;
            if (Q && Z) F("@aws-sdk/credential-provider-http: you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri."), F("awsContainerCredentialsFullUri will take precedence.");
            if (D && G) F("@aws-sdk/credential-provider-http: you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile."), F("awsContainerAuthorizationToken will take precedence.");
            if (Z) B = Z;
            else if (Q) B = `${OAQ}${Q}`;
            else throw new f3A.CredentialsProviderError(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`, {
                logger: A.logger
            });
            let I = new URL(B);
            LAQ.checkUrl(I, A.logger);
            let Y = new qAQ.NodeHttpHandler({
                requestTimeout: A.timeout ?? 1000,
                connectionTimeout: A.timeout ?? 1000
            });
            return MAQ.retryWrapper(async () => {
                let W = h3A.createGetRequest(I);
                if (D) W.headers.Authorization = D;
                else if (G) W.headers.Authorization = (await NAQ.default.readFile(G)).toString();
                try {
                    let J = await Y.handle(W);
                    return h3A.getCredentials(J.response).then((X) => $AQ.setCredentialFeature(X, "CREDENTIALS_HTTP", "z"))
                } catch (J) {
                    throw new f3A.CredentialsProviderError(String(J), {
                        logger: A.logger
                    })
                }
            }, A.maxRetries ?? 3, A.timeout ?? 1000)
        };
    g3A.fromHttp = jAQ
});
var gs1 = E((hs1) => {
    Object.defineProperty(hs1, "__esModule", {
        value: !0
    });
    hs1.fromHttp = void 0;
    var kAQ = m3A();
    Object.defineProperty(hs1, "fromHttp", {
        enumerable: !0,
        get: function() {
            return kAQ.fromHttp
        }
    })
});
var ms1 = E((d3A) => {
    Object.defineProperty(d3A, "__esModule", {
        value: !0
    });
    d3A.resolveHttpAuthSchemeConfig = d3A.defaultSSOHttpAuthSchemeProvider = d3A.defaultSSOHttpAuthSchemeParametersProvider = void 0;
    var _AQ = YI(),
        us1 = E5(),
        xAQ = async (A, B, Q) => {
            return {
                operation: us1.getSmithyContext(B).operation,
                region: await us1.normalizeProvider(A.region)() || (() => {
                    throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
                })()
            }
        };
    d3A.defaultSSOHttpAuthSchemeParametersProvider = xAQ;

    function vAQ(A) {
        return {
            schemeId: "aws.auth#sigv4",
            signingProperties: {
                name: "awsssoportal",
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

    function UH1(A) {
        return {
            schemeId: "smithy.api#noAuth"
        }
    }
    var bAQ = (A) => {
        let B = [];
        switch (A.operation) {
            case "GetRoleCredentials": {
                B.push(UH1(A));
                break
            }
            case "ListAccountRoles": {
                B.push(UH1(A));
                break
            }
            case "ListAccounts": {
                B.push(UH1(A));
                break
            }
            case "Logout": {
                B.push(UH1(A));
                break
            }
            default:
                B.push(vAQ(A))
        }
        return B
    };
    d3A.defaultSSOHttpAuthSchemeProvider = bAQ;
    var fAQ = (A) => {
        let B = _AQ.resolveAwsSdkSigV4Config(A);
        return Object.assign(B, {
            authSchemePreference: us1.normalizeProvider(A.authSchemePreference ?? [])
        })
    };
    d3A.resolveHttpAuthSchemeConfig = fAQ
});
var l3A = E((bA5, uAQ) => {
    uAQ.exports = {
        name: "@aws-sdk/client-sso",
        description: "AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native",
        version: "3.840.0",
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
        homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso",
        repository: {
            type: "git",
            url: "https://github.com/aws/aws-sdk-js-v3.git",
            directory: "clients/client-sso"
        }
    }
});
var h91 = E((fA5, o3A) => {
    var {
        defineProperty: $H1,
        getOwnPropertyDescriptor: mAQ,
        getOwnPropertyNames: dAQ
    } = Object, cAQ = Object.prototype.hasOwnProperty, wH1 = (A, B) => $H1(A, "name", {
        value: B,
        configurable: !0
    }), lAQ = (A, B) => {
        for (var Q in B) $H1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, pAQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of dAQ(B))
                if (!cAQ.call(A, D) && D !== Q) $H1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = mAQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, iAQ = (A) => pAQ($H1({}, "__esModule", {
        value: !0
    }), A), i3A = {};
    lAQ(i3A, {
        NODE_APP_ID_CONFIG_OPTIONS: () => oAQ,
        UA_APP_ID_ENV_NAME: () => s3A,
        UA_APP_ID_INI_NAME: () => r3A,
        createDefaultUserAgentProvider: () => a3A,
        crtAvailability: () => n3A,
        defaultUserAgent: () => aAQ
    });
    o3A.exports = iAQ(i3A);
    var p3A = W1("os"),
        ds1 = W1("process"),
        n3A = {
            isCrtAvailable: !1
        },
        nAQ = wH1(() => {
            if (n3A.isCrtAvailable) return ["md/crt-avail"];
            return null
        }, "isCrtAvailable"),
        a3A = wH1(({
            serviceId: A,
            clientVersion: B
        }) => {
            return async (Q) => {
                let Z = [
                        ["aws-sdk-js", B],
                        ["ua", "2.1"],
                        [`os/${p3A.platform()}`, p3A.release()],
                        ["lang/js"],
                        ["md/nodejs", `${ds1.versions.node}`]
                    ],
                    D = nAQ();
                if (D) Z.push(D);
                if (A) Z.push([`api/${A}`, B]);
                if (ds1.env.AWS_EXECUTION_ENV) Z.push([`exec-env/${ds1.env.AWS_EXECUTION_ENV}`]);
                let G = await Q?.userAgentAppId?.();
                return G ? [...Z, [`app/${G}`]] : [...Z]
            }
        }, "createDefaultUserAgentProvider"),
        aAQ = a3A,
        sAQ = Bi(),
        s3A = "AWS_SDK_UA_APP_ID",
        r3A = "sdk_ua_app_id",
        rAQ = "sdk-ua-app-id",
        oAQ = {
            environmentVariableSelector: wH1((A) => A[s3A], "environmentVariableSelector"),
            configFileSelector: wH1((A) => A[r3A] ?? A[rAQ], "configFileSelector"),
            default: sAQ.DEFAULT_UA_APP_ID
        }
});
var mG = E((hA5, B7A) => {
    var {
        defineProperty: qH1,
        getOwnPropertyDescriptor: tAQ,
        getOwnPropertyNames: eAQ
    } = Object, A2Q = Object.prototype.hasOwnProperty, e3A = (A, B) => qH1(A, "name", {
        value: B,
        configurable: !0
    }), B2Q = (A, B) => {
        for (var Q in B) qH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Q2Q = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of eAQ(B))
                if (!A2Q.call(A, D) && D !== Q) qH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = tAQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, Z2Q = (A) => Q2Q(qH1({}, "__esModule", {
        value: !0
    }), A), A7A = {};
    B2Q(A7A, {
        Hash: () => F2Q
    });
    B7A.exports = Z2Q(A7A);
    var cs1 = GZ(),
        D2Q = lB(),
        G2Q = W1("buffer"),
        t3A = W1("crypto"),
        F2Q = class {
            static {
                e3A(this, "Hash")
            }
            constructor(A, B) {
                this.algorithmIdentifier = A, this.secret = B, this.reset()
            }
            update(A, B) {
                this.hash.update(D2Q.toUint8Array(ls1(A, B)))
            }
            digest() {
                return Promise.resolve(this.hash.digest())
            }
            reset() {
                this.hash = this.secret ? t3A.createHmac(this.algorithmIdentifier, ls1(this.secret)) : t3A.createHash(this.algorithmIdentifier)
            }
        };

    function ls1(A, B) {
        if (G2Q.Buffer.isBuffer(A)) return A;
        if (typeof A === "string") return cs1.fromString(A, B);
        if (ArrayBuffer.isView(A)) return cs1.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength);
        return cs1.fromArrayBuffer(A)
    }
    e3A(ls1, "castSourceData")
});
var dG = E((uA5, D7A) => {
    var {
        defineProperty: NH1,
        getOwnPropertyDescriptor: I2Q,
        getOwnPropertyNames: Y2Q
    } = Object, W2Q = Object.prototype.hasOwnProperty, J2Q = (A, B) => NH1(A, "name", {
        value: B,
        configurable: !0
    }), X2Q = (A, B) => {
        for (var Q in B) NH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, V2Q = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Y2Q(B))
                if (!W2Q.call(A, D) && D !== Q) NH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = I2Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, C2Q = (A) => V2Q(NH1({}, "__esModule", {
        value: !0
    }), A), Z7A = {};
    X2Q(Z7A, {
        calculateBodyLength: () => K2Q
    });
    D7A.exports = C2Q(Z7A);
    var Q7A = W1("fs"),
        K2Q = J2Q((A) => {
            if (!A) return 0;
            if (typeof A === "string") return Buffer.byteLength(A);
            else if (typeof A.byteLength === "number") return A.byteLength;
            else if (typeof A.size === "number") return A.size;
            else if (typeof A.start === "number" && typeof A.end === "number") return A.end + 1 - A.start;
            else if (typeof A.path === "string" || Buffer.isBuffer(A.path)) return Q7A.lstatSync(A.path).size;
            else if (typeof A.fd === "number") return Q7A.fstatSync(A.fd).size;
            throw new Error(`Body Length computation failed for ${A}`)
        }, "calculateBodyLength")
});