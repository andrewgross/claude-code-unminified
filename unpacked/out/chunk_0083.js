/* chunk:83 bytes:[1897152, 1899295) size:2143 source:unpacked-cli.js */
var a91 = E((Ur1) => {
    Object.defineProperty(Ur1, "__esModule", {
        value: !0
    });
    Ur1.STSClient = Ur1.__Client = void 0;
    var pGA = W91(),
        w4Q = J91(),
        $4Q = X91(),
        iGA = Bi(),
        q4Q = z4(),
        Er1 = HB(),
        N4Q = hG(),
        L4Q = T6(),
        nGA = u4(),
        sGA = V6();
    Object.defineProperty(Ur1, "__Client", {
        enumerable: !0,
        get: function() {
            return sGA.Client
        }
    });
    var aGA = Xr1(),
        M4Q = s91(),
        R4Q = xGA(),
        O4Q = lGA();
    class rGA extends sGA.Client {
        config;
        constructor(...[A]) {
            let B = R4Q.getRuntimeConfig(A || {});
            super(B);
            this.initConfig = B;
            let Q = M4Q.resolveClientEndpointParameters(B),
                Z = iGA.resolveUserAgentConfig(Q),
                D = nGA.resolveRetryConfig(Z),
                G = q4Q.resolveRegionConfig(D),
                F = pGA.resolveHostHeaderConfig(G),
                I = L4Q.resolveEndpointConfig(F),
                Y = aGA.resolveHttpAuthSchemeConfig(I),
                W = O4Q.resolveRuntimeExtensions(Y, A?.extensions || []);
            this.config = W, this.middlewareStack.use(iGA.getUserAgentPlugin(this.config)), this.middlewareStack.use(nGA.getRetryPlugin(this.config)), this.middlewareStack.use(N4Q.getContentLengthPlugin(this.config)), this.middlewareStack.use(pGA.getHostHeaderPlugin(this.config)), this.middlewareStack.use(w4Q.getLoggerPlugin(this.config)), this.middlewareStack.use($4Q.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(Er1.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                httpAuthSchemeParametersProvider: aGA.defaultSTSHttpAuthSchemeParametersProvider,
                identityProviderConfigProvider: async (J) => new Er1.DefaultIdentityProviderConfig({
                    "aws.auth#sigv4": J.credentials
                })
            })), this.middlewareStack.use(Er1.getHttpSigningPlugin(this.config))
        }
        destroy() {
            super.destroy()
        }
    }
    Ur1.STSClient = rGA
});