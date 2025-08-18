/* chunk:117 bytes:[2676721, 2678864) size:2143 source:unpacked-cli.js */
var _Q1 = E((te1) => {
    Object.defineProperty(te1, "__esModule", {
        value: !0
    });
    te1.STSClient = te1.__Client = void 0;
    var MNA = GQ1(),
        zqQ = FQ1(),
        EqQ = IQ1(),
        RNA = fi(),
        UqQ = z4(),
        oe1 = HB(),
        wqQ = hG(),
        $qQ = T6(),
        ONA = u4(),
        PNA = XD();
    Object.defineProperty(te1, "__Client", {
        enumerable: !0,
        get: function() {
            return PNA.Client
        }
    });
    var TNA = ie1(),
        qqQ = xQ1(),
        NqQ = CNA(),
        LqQ = LNA();
    class SNA extends PNA.Client {
        config;
        constructor(...[A]) {
            let B = NqQ.getRuntimeConfig(A || {});
            super(B);
            this.initConfig = B;
            let Q = qqQ.resolveClientEndpointParameters(B),
                Z = RNA.resolveUserAgentConfig(Q),
                D = ONA.resolveRetryConfig(Z),
                G = UqQ.resolveRegionConfig(D),
                F = MNA.resolveHostHeaderConfig(G),
                I = $qQ.resolveEndpointConfig(F),
                Y = TNA.resolveHttpAuthSchemeConfig(I),
                W = LqQ.resolveRuntimeExtensions(Y, A?.extensions || []);
            this.config = W, this.middlewareStack.use(RNA.getUserAgentPlugin(this.config)), this.middlewareStack.use(ONA.getRetryPlugin(this.config)), this.middlewareStack.use(wqQ.getContentLengthPlugin(this.config)), this.middlewareStack.use(MNA.getHostHeaderPlugin(this.config)), this.middlewareStack.use(zqQ.getLoggerPlugin(this.config)), this.middlewareStack.use(EqQ.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(oe1.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                httpAuthSchemeParametersProvider: TNA.defaultSTSHttpAuthSchemeParametersProvider,
                identityProviderConfigProvider: async (J) => new oe1.DefaultIdentityProviderConfig({
                    "aws.auth#sigv4": J.credentials
                })
            })), this.middlewareStack.use(oe1.getHttpSigningPlugin(this.config))
        }
        destroy() {
            super.destroy()
        }
    }
    te1.STSClient = SNA
});