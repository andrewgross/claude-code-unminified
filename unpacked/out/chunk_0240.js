/* chunk:240 bytes:[5180850, 5182993) size:2143 source:unpacked-cli.js */
var y81 = E((x80) => {
    Object.defineProperty(x80, "__esModule", {
        value: !0
    });
    x80.STSClient = x80.__Client = void 0;
    var R82 = K81(),
        _z4 = H81(),
        xz4 = z81(),
        O82 = Qr(),
        vz4 = z4(),
        _80 = HB(),
        bz4 = hG(),
        fz4 = T6(),
        T82 = u4(),
        S82 = d4();
    Object.defineProperty(x80, "__Client", {
        enumerable: !0,
        get: function() {
            return S82.Client
        }
    });
    var P82 = T80(),
        hz4 = _81(),
        gz4 = K82(),
        uz4 = M82();
    class j82 extends S82.Client {
        config;
        constructor(...[A]) {
            let B = gz4.getRuntimeConfig(A || {});
            super(B);
            this.initConfig = B;
            let Q = hz4.resolveClientEndpointParameters(B),
                Z = O82.resolveUserAgentConfig(Q),
                D = T82.resolveRetryConfig(Z),
                G = vz4.resolveRegionConfig(D),
                F = R82.resolveHostHeaderConfig(G),
                I = fz4.resolveEndpointConfig(F),
                Y = P82.resolveHttpAuthSchemeConfig(I),
                W = uz4.resolveRuntimeExtensions(Y, A?.extensions || []);
            this.config = W, this.middlewareStack.use(O82.getUserAgentPlugin(this.config)), this.middlewareStack.use(T82.getRetryPlugin(this.config)), this.middlewareStack.use(bz4.getContentLengthPlugin(this.config)), this.middlewareStack.use(R82.getHostHeaderPlugin(this.config)), this.middlewareStack.use(_z4.getLoggerPlugin(this.config)), this.middlewareStack.use(xz4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(_80.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                httpAuthSchemeParametersProvider: P82.defaultSTSHttpAuthSchemeParametersProvider,
                identityProviderConfigProvider: async (J) => new _80.DefaultIdentityProviderConfig({
                    "aws.auth#sigv4": J.credentials
                })
            })), this.middlewareStack.use(_80.getHttpSigningPlugin(this.config))
        }
        destroy() {
            super.destroy()
        }
    }
    x80.STSClient = j82
});