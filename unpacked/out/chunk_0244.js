/* chunk:244 bytes:[5250502, 5257933) size:7431 source:unpacked-cli.js */
var E32 = E((H32) => {
    Object.defineProperty(H32, "__esModule", {
        value: !0
    });
    H32.getRuntimeConfig = void 0;
    var Qw4 = ig(),
        Zw4 = Qw4.__importDefault(V92()),
        O50 = HI(),
        X32 = y52(),
        V32 = L81(),
        QL1 = z4(),
        Dw4 = HB(),
        Gw4 = mG(),
        C32 = u4(),
        Bu = IZ(),
        K32 = x3(),
        Fw4 = dG(),
        Iw4 = aD(),
        Yw4 = J32(),
        Ww4 = d4(),
        Jw4 = cG(),
        Xw4 = d4(),
        Vw4 = (A) => {
            Xw4.emitWarningIfUnsupportedVersion(process.version);
            let B = Jw4.resolveDefaultsModeConfig(A),
                Q = () => B().then(Ww4.loadConfigsForDefaultMode),
                Z = Yw4.getRuntimeConfig(A);
            O50.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? Bu.loadConfig(O50.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? Fw4.calculateBodyLength,
                credentialDefaultProvider: A?.credentialDefaultProvider ?? X32.defaultProvider,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? V32.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: Zw4.default.version
                }),
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (G) => G.getIdentityProvider("aws.auth#sigv4") || (async (F) => await X32.defaultProvider(F?.__config || {})()),
                    signer: new O50.AwsSdkSigV4Signer
                }, {
                    schemeId: "smithy.api#noAuth",
                    identityProvider: (G) => G.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                    signer: new Dw4.NoAuthSigner
                }],
                maxAttempts: A?.maxAttempts ?? Bu.loadConfig(C32.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? Bu.loadConfig(QL1.NODE_REGION_CONFIG_OPTIONS, {
                    ...QL1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: K32.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? Bu.loadConfig({
                    ...C32.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || Iw4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? Gw4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? K32.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? Bu.loadConfig(QL1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? Bu.loadConfig(QL1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? Bu.loadConfig(V32.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    H32.getRuntimeConfig = Vw4
});
var $32 = E((U32) => {
    Object.defineProperty(U32, "__esModule", {
        value: !0
    });
    U32.resolveHttpAuthRuntimeConfig = U32.getHttpAuthExtensionConfiguration = void 0;
    var Cw4 = (A) => {
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
    U32.getHttpAuthExtensionConfiguration = Cw4;
    var Kw4 = (A) => {
        return {
            httpAuthSchemes: A.httpAuthSchemes(),
            httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
            credentials: A.credentials()
        }
    };
    U32.resolveHttpAuthRuntimeConfig = Kw4
});
var T32 = E((R32) => {
    Object.defineProperty(R32, "__esModule", {
        value: !0
    });
    R32.resolveRuntimeExtensions = void 0;
    var q32 = R81(),
        N32 = QX(),
        L32 = d4(),
        M32 = $32(),
        zw4 = (A, B) => {
            let Q = Object.assign(q32.getAwsRegionExtensionConfiguration(A), L32.getDefaultExtensionConfiguration(A), N32.getHttpHandlerExtensionConfiguration(A), M32.getHttpAuthExtensionConfiguration(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, q32.resolveAwsRegionExtensionConfiguration(Q), L32.resolveDefaultRuntimeConfig(Q), N32.resolveHttpHandlerRuntimeConfig(Q), M32.resolveHttpAuthRuntimeConfig(Q))
        };
    R32.resolveRuntimeExtensions = zw4
});
var N81 = E((P50) => {
    Object.defineProperty(P50, "__esModule", {
        value: !0
    });
    P50.STSClient = P50.__Client = void 0;
    var P32 = K81(),
        Ew4 = H81(),
        Uw4 = z81(),
        S32 = Qr(),
        ww4 = z4(),
        T50 = HB(),
        $w4 = hG(),
        qw4 = T6(),
        j32 = u4(),
        y32 = d4();
    Object.defineProperty(P50, "__Client", {
        enumerable: !0,
        get: function() {
            return y32.Client
        }
    });
    var k32 = B80(),
        Nw4 = dz(),
        Lw4 = E32(),
        Mw4 = T32();
    class _32 extends y32.Client {
        config;
        constructor(...[A]) {
            let B = Lw4.getRuntimeConfig(A || {});
            super(B);
            this.initConfig = B;
            let Q = Nw4.resolveClientEndpointParameters(B),
                Z = S32.resolveUserAgentConfig(Q),
                D = j32.resolveRetryConfig(Z),
                G = ww4.resolveRegionConfig(D),
                F = P32.resolveHostHeaderConfig(G),
                I = qw4.resolveEndpointConfig(F),
                Y = k32.resolveHttpAuthSchemeConfig(I),
                W = Mw4.resolveRuntimeExtensions(Y, A?.extensions || []);
            this.config = W, this.middlewareStack.use(S32.getUserAgentPlugin(this.config)), this.middlewareStack.use(j32.getRetryPlugin(this.config)), this.middlewareStack.use($w4.getContentLengthPlugin(this.config)), this.middlewareStack.use(P32.getHostHeaderPlugin(this.config)), this.middlewareStack.use(Ew4.getLoggerPlugin(this.config)), this.middlewareStack.use(Uw4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(T50.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                httpAuthSchemeParametersProvider: k32.defaultSTSHttpAuthSchemeParametersProvider,
                identityProviderConfigProvider: async (J) => new T50.DefaultIdentityProviderConfig({
                    "aws.auth#sigv4": J.credentials
                })
            })), this.middlewareStack.use(T50.getHttpSigningPlugin(this.config))
        }
        destroy() {
            super.destroy()
        }
    }
    P50.STSClient = _32
});