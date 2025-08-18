/* chunk:278 bytes:[5947437, 5954636) size:7199 source:unpacked-cli.js */
var tM1 = E((IR5, WE2) => {
    var {
        defineProperty: oM1,
        getOwnPropertyDescriptor: Yu4,
        getOwnPropertyNames: Wu4
    } = Object, Ju4 = Object.prototype.hasOwnProperty, gL = (A, B) => oM1(A, "name", {
        value: B,
        configurable: !0
    }), Xu4 = (A, B) => {
        for (var Q in B) oM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Vu4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Wu4(B))
                if (!Ju4.call(A, D) && D !== Q) oM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Yu4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Cu4 = (A) => Vu4(oM1({}, "__esModule", {
        value: !0
    }), A), GE2 = {};
    Xu4(GE2, {
        NODE_REGION_CONFIG_FILE_OPTIONS: () => Eu4,
        NODE_REGION_CONFIG_OPTIONS: () => zu4,
        REGION_ENV_NAME: () => FE2,
        REGION_INI_NAME: () => IE2,
        getAwsRegionExtensionConfiguration: () => Ku4,
        resolveAwsRegionExtensionConfiguration: () => Hu4,
        resolveRegionConfig: () => Uu4
    });
    WE2.exports = Cu4(GE2);
    var Ku4 = gL((A) => {
            return {
                setRegion(B) {
                    A.region = B
                },
                region() {
                    return A.region
                }
            }
        }, "getAwsRegionExtensionConfiguration"),
        Hu4 = gL((A) => {
            return {
                region: A.region()
            }
        }, "resolveAwsRegionExtensionConfiguration"),
        FE2 = "AWS_REGION",
        IE2 = "region",
        zu4 = {
            environmentVariableSelector: gL((A) => A[FE2], "environmentVariableSelector"),
            configFileSelector: gL((A) => A[IE2], "configFileSelector"),
            default: gL(() => {
                throw new Error("Region is missing")
            }, "default")
        },
        Eu4 = {
            preferredFile: "credentials"
        },
        YE2 = gL((A) => typeof A === "string" && (A.startsWith("fips-") || A.endsWith("-fips")), "isFipsRegion"),
        DE2 = gL((A) => YE2(A) ? ["fips-aws-global", "aws-fips"].includes(A) ? "us-east-1" : A.replace(/fips-(dkr-|prod-)?|-fips/, "") : A, "getRealRegion"),
        Uu4 = gL((A) => {
            let {
                region: B,
                useFipsEndpoint: Q
            } = A;
            if (!B) throw new Error("Region is missing");
            return Object.assign(A, {
                region: gL(async () => {
                    if (typeof B === "string") return DE2(B);
                    let Z = await B();
                    return DE2(Z)
                }, "region"),
                useFipsEndpoint: gL(async () => {
                    let Z = typeof B === "string" ? B : await B();
                    if (YE2(Z)) return !0;
                    return typeof Q !== "function" ? Promise.resolve(!!Q) : Q()
                }, "useFipsEndpoint")
            })
        }, "resolveRegionConfig")
});
var VE2 = E((JE2) => {
    Object.defineProperty(JE2, "__esModule", {
        value: !0
    });
    JE2.resolveHttpAuthRuntimeConfig = JE2.getHttpAuthExtensionConfiguration = void 0;
    var wu4 = (A) => {
        let {
            httpAuthSchemes: B,
            httpAuthSchemeProvider: Q,
            credentials: Z
        } = A;
        return {
            setHttpAuthScheme(D) {
                let G = B.findIndex((F) => F.schemeId === D.schemeId);
                if (G === -1) B.push(D);
                else B.splice(G, 1, D)
            },
            httpAuthSchemes() {
                return B
            },
            setHttpAuthSchemeProvider(D) {
                Q = D
            },
            httpAuthSchemeProvider() {
                return Q
            },
            setCredentials(D) {
                Z = D
            },
            credentials() {
                return Z
            }
        }
    };
    JE2.getHttpAuthExtensionConfiguration = wu4;
    var $u4 = (A) => {
        return {
            httpAuthSchemes: A.httpAuthSchemes(),
            httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
            credentials: A.credentials()
        }
    };
    JE2.resolveHttpAuthRuntimeConfig = $u4
});
var wE2 = E((EE2) => {
    Object.defineProperty(EE2, "__esModule", {
        value: !0
    });
    EE2.resolveRuntimeExtensions = void 0;
    var CE2 = tM1(),
        KE2 = SK(),
        HE2 = P8(),
        zE2 = VE2(),
        Nu4 = (A, B) => {
            let Q = Object.assign(CE2.getAwsRegionExtensionConfiguration(A), HE2.getDefaultExtensionConfiguration(A), KE2.getHttpHandlerExtensionConfiguration(A), zE2.getHttpAuthExtensionConfiguration(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, CE2.resolveAwsRegionExtensionConfiguration(Q), HE2.resolveDefaultRuntimeConfig(Q), KE2.resolveHttpHandlerRuntimeConfig(Q), zE2.resolveHttpAuthRuntimeConfig(Q))
        };
    EE2.resolveRuntimeExtensions = Nu4
});
var H51 = E((SD0) => {
    Object.defineProperty(SD0, "__esModule", {
        value: !0
    });
    SD0.STSClient = SD0.__Client = void 0;
    var $E2 = RM1(),
        Lu4 = TM1(),
        Mu4 = jM1(),
        qE2 = K51(),
        Ru4 = z4(),
        PD0 = HB(),
        Ou4 = hG(),
        Tu4 = T6(),
        NE2 = u4(),
        ME2 = P8();
    Object.defineProperty(SD0, "__Client", {
        enumerable: !0,
        get: function() {
            return ME2.Client
        }
    });
    var LE2 = $D0(),
        Pu4 = z51(),
        Su4 = ZE2(),
        ju4 = wE2();
    class RE2 extends ME2.Client {
        config;
        constructor(...[A]) {
            let B = Su4.getRuntimeConfig(A || {});
            super(B);
            this.initConfig = B;
            let Q = Pu4.resolveClientEndpointParameters(B),
                Z = qE2.resolveUserAgentConfig(Q),
                D = NE2.resolveRetryConfig(Z),
                G = Ru4.resolveRegionConfig(D),
                F = $E2.resolveHostHeaderConfig(G),
                I = Tu4.resolveEndpointConfig(F),
                Y = LE2.resolveHttpAuthSchemeConfig(I),
                W = ju4.resolveRuntimeExtensions(Y, A?.extensions || []);
            this.config = W, this.middlewareStack.use(qE2.getUserAgentPlugin(this.config)), this.middlewareStack.use(NE2.getRetryPlugin(this.config)), this.middlewareStack.use(Ou4.getContentLengthPlugin(this.config)), this.middlewareStack.use($E2.getHostHeaderPlugin(this.config)), this.middlewareStack.use(Lu4.getLoggerPlugin(this.config)), this.middlewareStack.use(Mu4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(PD0.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                httpAuthSchemeParametersProvider: LE2.defaultSTSHttpAuthSchemeParametersProvider,
                identityProviderConfigProvider: async (J) => new PD0.DefaultIdentityProviderConfig({
                    "aws.auth#sigv4": J.credentials
                })
            })), this.middlewareStack.use(PD0.getHttpSigningPlugin(this.config))
        }
        destroy() {
            super.destroy()
        }
    }
    SD0.STSClient = RE2
});