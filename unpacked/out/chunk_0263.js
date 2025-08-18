/* chunk:263 bytes:[5632945, 5635088) size:2143 source:unpacked-cli.js */
var A51 = E((_70) => {
    Object.defineProperty(_70, "__esModule", {
        value: !0
    });
    _70.STSClient = _70.__Client = void 0;
    var YJ2 = f81(),
        Fj4 = h81(),
        Ij4 = g81(),
        WJ2 = hr(),
        Yj4 = z4(),
        y70 = HB(),
        Wj4 = hG(),
        Jj4 = T6(),
        JJ2 = u4(),
        VJ2 = H6();
    Object.defineProperty(_70, "__Client", {
        enumerable: !0,
        get: function() {
            return VJ2.Client
        }
    });
    var XJ2 = O70(),
        Xj4 = B51(),
        Vj4 = oW2(),
        Cj4 = IJ2();
    class CJ2 extends VJ2.Client {
        config;
        constructor(...[A]) {
            let B = Vj4.getRuntimeConfig(A || {});
            super(B);
            this.initConfig = B;
            let Q = Xj4.resolveClientEndpointParameters(B),
                Z = WJ2.resolveUserAgentConfig(Q),
                D = JJ2.resolveRetryConfig(Z),
                G = Yj4.resolveRegionConfig(D),
                F = YJ2.resolveHostHeaderConfig(G),
                I = Jj4.resolveEndpointConfig(F),
                Y = XJ2.resolveHttpAuthSchemeConfig(I),
                W = Cj4.resolveRuntimeExtensions(Y, A?.extensions || []);
            this.config = W, this.middlewareStack.use(WJ2.getUserAgentPlugin(this.config)), this.middlewareStack.use(JJ2.getRetryPlugin(this.config)), this.middlewareStack.use(Wj4.getContentLengthPlugin(this.config)), this.middlewareStack.use(YJ2.getHostHeaderPlugin(this.config)), this.middlewareStack.use(Fj4.getLoggerPlugin(this.config)), this.middlewareStack.use(Ij4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(y70.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                httpAuthSchemeParametersProvider: XJ2.defaultSTSHttpAuthSchemeParametersProvider,
                identityProviderConfigProvider: async (J) => new y70.DefaultIdentityProviderConfig({
                    "aws.auth#sigv4": J.credentials
                })
            })), this.middlewareStack.use(y70.getHttpSigningPlugin(this.config))
        }
        destroy() {
            super.destroy()
        }
    }
    _70.STSClient = CJ2
});