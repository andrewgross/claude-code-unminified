/* chunk:281 bytes:[6001546, 6004154) size:2608 source:unpacked-cli.js */
var uU2 = E((hU2) => {
    Object.defineProperty(hU2, "__esModule", {
        value: !0
    });
    hU2.getRuntimeConfig = void 0;
    var Jd4 = Zu(),
        Xd4 = Jd4.__importDefault(YU2()),
        xU2 = bV(),
        vU2 = sM1(),
        DR1 = z4(),
        Vd4 = mG(),
        bU2 = u4(),
        wu = IZ(),
        fU2 = x3(),
        Cd4 = dG(),
        Kd4 = aD(),
        Hd4 = _U2(),
        zd4 = P8(),
        Ed4 = cG(),
        Ud4 = P8(),
        wd4 = (A) => {
            Ud4.emitWarningIfUnsupportedVersion(process.version);
            let B = Ed4.resolveDefaultsModeConfig(A),
                Q = () => B().then(zd4.loadConfigsForDefaultMode),
                Z = Hd4.getRuntimeConfig(A);
            xU2.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile,
                logger: Z.logger
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                authSchemePreference: A?.authSchemePreference ?? wu.loadConfig(xU2.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, D),
                bodyLengthChecker: A?.bodyLengthChecker ?? Cd4.calculateBodyLength,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? vU2.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: Xd4.default.version
                }),
                maxAttempts: A?.maxAttempts ?? wu.loadConfig(bU2.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? wu.loadConfig(DR1.NODE_REGION_CONFIG_OPTIONS, {
                    ...DR1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: fU2.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? wu.loadConfig({
                    ...bU2.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || Kd4.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? Vd4.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? fU2.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? wu.loadConfig(DR1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? wu.loadConfig(DR1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? wu.loadConfig(vU2.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    hU2.getRuntimeConfig = wd4
});