/* chunk:412 bytes:[9548544, 9567957) size:19413 source:unpacked-cli.js */
var lKB = E((dKB) => {
    Object.defineProperty(dKB, "__esModule", {
        value: !0
    });
    dKB.fromBase64 = void 0;
    var Sa6 = GZ(),
        ja6 = /^[A-Za-z0-9+/]*={0,2}$/,
        ka6 = (A) => {
            if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
            if (!ja6.exec(A)) throw new TypeError("Invalid base64 string.");
            let B = Sa6.fromString(A, "base64");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
        };
    dKB.fromBase64 = ka6
});
var nKB = E((pKB) => {
    Object.defineProperty(pKB, "__esModule", {
        value: !0
    });
    pKB.toBase64 = void 0;
    var ya6 = GZ(),
        _a6 = lB(),
        xa6 = (A) => {
            let B;
            if (typeof A === "string") B = _a6.fromUtf8(A);
            else B = A;
            if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
            return ya6.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
        };
    pKB.toBase64 = xa6
});
var rKB = E((i43, c_1) => {
    var {
        defineProperty: aKB,
        getOwnPropertyDescriptor: va6,
        getOwnPropertyNames: ba6
    } = Object, fa6 = Object.prototype.hasOwnProperty, GU0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of ba6(B))
                if (!fa6.call(A, D) && D !== Q) aKB(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = va6(B, D)) || Z.enumerable
                })
        }
        return A
    }, sKB = (A, B, Q) => (GU0(A, B, "default"), Q && GU0(Q, B, "default")), ha6 = (A) => GU0(aKB({}, "__esModule", {
        value: !0
    }), A), FU0 = {};
    c_1.exports = ha6(FU0);
    sKB(FU0, lKB(), c_1.exports);
    sKB(FU0, nKB(), c_1.exports)
});
var VHB = E((JHB) => {
    Object.defineProperty(JHB, "__esModule", {
        value: !0
    });
    JHB.ruleSet = void 0;
    var IHB = "required",
        bM = "fn",
        fM = "argv",
        X11 = "ref",
        oKB = !0,
        tKB = "isSet",
        xD1 = "booleanEquals",
        J11 = "error",
        _D1 = "endpoint",
        HX = "tree",
        IU0 = "PartitionResult",
        eKB = {
            [IHB]: !1,
            type: "String"
        },
        AHB = {
            [IHB]: !0,
            default: !1,
            type: "Boolean"
        },
        BHB = {
            [X11]: "Endpoint"
        },
        YHB = {
            [bM]: xD1,
            [fM]: [{
                [X11]: "UseFIPS"
            }, !0]
        },
        WHB = {
            [bM]: xD1,
            [fM]: [{
                [X11]: "UseDualStack"
            }, !0]
        },
        vM = {},
        QHB = {
            [bM]: "getAttr",
            [fM]: [{
                [X11]: IU0
            }, "supportsFIPS"]
        },
        ZHB = {
            [bM]: xD1,
            [fM]: [!0, {
                [bM]: "getAttr",
                [fM]: [{
                    [X11]: IU0
                }, "supportsDualStack"]
            }]
        },
        DHB = [YHB],
        GHB = [WHB],
        FHB = [{
            [X11]: "Region"
        }],
        ga6 = {
            version: "1.0",
            parameters: {
                Region: eKB,
                UseDualStack: AHB,
                UseFIPS: AHB,
                Endpoint: eKB
            },
            rules: [{
                conditions: [{
                    [bM]: tKB,
                    [fM]: [BHB]
                }],
                rules: [{
                    conditions: DHB,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: J11
                }, {
                    rules: [{
                        conditions: GHB,
                        error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                        type: J11
                    }, {
                        endpoint: {
                            url: BHB,
                            properties: vM,
                            headers: vM
                        },
                        type: _D1
                    }],
                    type: HX
                }],
                type: HX
            }, {
                rules: [{
                    conditions: [{
                        [bM]: tKB,
                        [fM]: FHB
                    }],
                    rules: [{
                        conditions: [{
                            [bM]: "aws.partition",
                            [fM]: FHB,
                            assign: IU0
                        }],
                        rules: [{
                            conditions: [YHB, WHB],
                            rules: [{
                                conditions: [{
                                    [bM]: xD1,
                                    [fM]: [oKB, QHB]
                                }, ZHB],
                                rules: [{
                                    rules: [{
                                        endpoint: {
                                            url: "https://bedrock-runtime-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                            properties: vM,
                                            headers: vM
                                        },
                                        type: _D1
                                    }],
                                    type: HX
                                }],
                                type: HX
                            }, {
                                error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                                type: J11
                            }],
                            type: HX
                        }, {
                            conditions: DHB,
                            rules: [{
                                conditions: [{
                                    [bM]: xD1,
                                    [fM]: [QHB, oKB]
                                }],
                                rules: [{
                                    rules: [{
                                        endpoint: {
                                            url: "https://bedrock-runtime-fips.{Region}.{PartitionResult#dnsSuffix}",
                                            properties: vM,
                                            headers: vM
                                        },
                                        type: _D1
                                    }],
                                    type: HX
                                }],
                                type: HX
                            }, {
                                error: "FIPS is enabled but this partition does not support FIPS",
                                type: J11
                            }],
                            type: HX
                        }, {
                            conditions: GHB,
                            rules: [{
                                conditions: [ZHB],
                                rules: [{
                                    rules: [{
                                        endpoint: {
                                            url: "https://bedrock-runtime.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                            properties: vM,
                                            headers: vM
                                        },
                                        type: _D1
                                    }],
                                    type: HX
                                }],
                                type: HX
                            }, {
                                error: "DualStack is enabled but this partition does not support DualStack",
                                type: J11
                            }],
                            type: HX
                        }, {
                            rules: [{
                                endpoint: {
                                    url: "https://bedrock-runtime.{Region}.{PartitionResult#dnsSuffix}",
                                    properties: vM,
                                    headers: vM
                                },
                                type: _D1
                            }],
                            type: HX
                        }],
                        type: HX
                    }],
                    type: HX
                }, {
                    error: "Invalid Configuration: Missing Region",
                    type: J11
                }],
                type: HX
            }]
        };
    JHB.ruleSet = ga6
});
var HHB = E((CHB) => {
    Object.defineProperty(CHB, "__esModule", {
        value: !0
    });
    CHB.defaultEndpointResolver = void 0;
    var ua6 = ki(),
        YU0 = R7(),
        ma6 = VHB(),
        da6 = new YU0.EndpointCache({
            size: 50,
            params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
        }),
        ca6 = (A, B = {}) => {
            return da6.get(A, () => YU0.resolveEndpoint(ma6.ruleSet, {
                endpointParams: A,
                logger: B.logger
            }))
        };
    CHB.defaultEndpointResolver = ca6;
    YU0.customEndpointFunctions.aws = ua6.awsEndpointFunctions
});
var $HB = E((UHB) => {
    Object.defineProperty(UHB, "__esModule", {
        value: !0
    });
    UHB.getRuntimeConfig = void 0;
    var la6 = WI(),
        pa6 = yD1(),
        ia6 = JD(),
        zHB = rKB(),
        EHB = lB(),
        na6 = xE0(),
        aa6 = HHB(),
        sa6 = (A) => {
            return {
                apiVersion: "2023-09-30",
                base64Decoder: A?.base64Decoder ?? zHB.fromBase64,
                base64Encoder: A?.base64Encoder ?? zHB.toBase64,
                disableHostPrefix: A?.disableHostPrefix ?? !1,
                endpointProvider: A?.endpointProvider ?? aa6.defaultEndpointResolver,
                extensions: A?.extensions ?? [],
                httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? na6.defaultBedrockRuntimeHttpAuthSchemeProvider,
                httpAuthSchemes: A?.httpAuthSchemes ?? [{
                    schemeId: "aws.auth#sigv4",
                    identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
                    signer: new la6.AwsSdkSigV4Signer
                }],
                logger: A?.logger ?? new pa6.NoOpLogger,
                serviceId: A?.serviceId ?? "Bedrock Runtime",
                urlParser: A?.urlParser ?? ia6.parseUrl,
                utf8Decoder: A?.utf8Decoder ?? EHB.fromUtf8,
                utf8Encoder: A?.utf8Encoder ?? EHB.toUtf8
            }
        };
    UHB.getRuntimeConfig = sa6
});
var OHB = E((MHB) => {
    Object.defineProperty(MHB, "__esModule", {
        value: !0
    });
    MHB.getRuntimeConfig = void 0;
    var ra6 = dVB(),
        oa6 = ra6.__importDefault(cVB()),
        ta6 = WI(),
        ea6 = u10(),
        As6 = ZKB(),
        qHB = HQ1(),
        l_1 = z4(),
        Bs6 = KKB(),
        Qs6 = mG(),
        NHB = u4(),
        V11 = IZ(),
        LHB = x3(),
        Zs6 = dG(),
        Ds6 = aD(),
        Gs6 = $HB(),
        Fs6 = yD1(),
        Is6 = cG(),
        Ys6 = yD1(),
        Ws6 = (A) => {
            Ys6.emitWarningIfUnsupportedVersion(process.version);
            let B = Is6.resolveDefaultsModeConfig(A),
                Q = () => B().then(Fs6.loadConfigsForDefaultMode),
                Z = Gs6.getRuntimeConfig(A);
            ta6.emitWarningIfUnsupportedVersion(process.version);
            let D = {
                profile: A?.profile
            };
            return {
                ...Z,
                ...A,
                runtime: "node",
                defaultsMode: B,
                bodyLengthChecker: A?.bodyLengthChecker ?? Zs6.calculateBodyLength,
                credentialDefaultProvider: A?.credentialDefaultProvider ?? ea6.defaultProvider,
                defaultUserAgentProvider: A?.defaultUserAgentProvider ?? qHB.createDefaultUserAgentProvider({
                    serviceId: Z.serviceId,
                    clientVersion: oa6.default.version
                }),
                eventStreamPayloadHandlerProvider: A?.eventStreamPayloadHandlerProvider ?? As6.eventStreamPayloadHandlerProvider,
                eventStreamSerdeProvider: A?.eventStreamSerdeProvider ?? Bs6.eventStreamSerdeProvider,
                maxAttempts: A?.maxAttempts ?? V11.loadConfig(NHB.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
                region: A?.region ?? V11.loadConfig(l_1.NODE_REGION_CONFIG_OPTIONS, {
                    ...l_1.NODE_REGION_CONFIG_FILE_OPTIONS,
                    ...D
                }),
                requestHandler: LHB.NodeHttpHandler.create(A?.requestHandler ?? Q),
                retryMode: A?.retryMode ?? V11.loadConfig({
                    ...NHB.NODE_RETRY_MODE_CONFIG_OPTIONS,
                    default: async () => (await Q()).retryMode || Ds6.DEFAULT_RETRY_MODE
                }, A),
                sha256: A?.sha256 ?? Qs6.Hash.bind(null, "sha256"),
                streamCollector: A?.streamCollector ?? LHB.streamCollector,
                useDualstackEndpoint: A?.useDualstackEndpoint ?? V11.loadConfig(l_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, D),
                useFipsEndpoint: A?.useFipsEndpoint ?? V11.loadConfig(l_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, D),
                userAgentAppId: A?.userAgentAppId ?? V11.loadConfig(qHB.NODE_APP_ID_CONFIG_OPTIONS, D)
            }
        };
    MHB.getRuntimeConfig = Ws6
});
var yHB = E((o43, kHB) => {
    var {
        defineProperty: p_1,
        getOwnPropertyDescriptor: Js6,
        getOwnPropertyNames: Xs6
    } = Object, Vs6 = Object.prototype.hasOwnProperty, Qv = (A, B) => p_1(A, "name", {
        value: B,
        configurable: !0
    }), Cs6 = (A, B) => {
        for (var Q in B) p_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Ks6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Xs6(B))
                if (!Vs6.call(A, D) && D !== Q) p_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Js6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Hs6 = (A) => Ks6(p_1({}, "__esModule", {
        value: !0
    }), A), THB = {};
    Cs6(THB, {
        Field: () => Us6,
        Fields: () => ws6,
        HttpRequest: () => $s6,
        HttpResponse: () => qs6,
        IHttpRequest: () => PHB.HttpRequest,
        getHttpHandlerExtensionConfiguration: () => zs6,
        isValidHostname: () => jHB,
        resolveHttpHandlerRuntimeConfig: () => Es6
    });
    kHB.exports = Hs6(THB);
    var zs6 = Qv((A) => {
            return {
                setHttpHandler(B) {
                    A.httpHandler = B
                },
                httpHandler() {
                    return A.httpHandler
                },
                updateHttpClientConfig(B, Q) {
                    A.httpHandler?.updateHttpClientConfig(B, Q)
                },
                httpHandlerConfigs() {
                    return A.httpHandler.httpHandlerConfigs()
                }
            }
        }, "getHttpHandlerExtensionConfiguration"),
        Es6 = Qv((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        PHB = iE0(),
        Us6 = class {
            static {
                Qv(this, "Field")
            }
            constructor({
                name: A,
                kind: B = PHB.FieldPosition.HEADER,
                values: Q = []
            }) {
                this.name = A, this.kind = B, this.values = Q
            }
            add(A) {
                this.values.push(A)
            }
            set(A) {
                this.values = A
            }
            remove(A) {
                this.values = this.values.filter((B) => B !== A)
            }
            toString() {
                return this.values.map((A) => A.includes(",") || A.includes(" ") ? `"${A}"` : A).join(", ")
            }
            get() {
                return this.values
            }
        },
        ws6 = class {
            constructor({
                fields: A = [],
                encoding: B = "utf-8"
            }) {
                this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
            }
            static {
                Qv(this, "Fields")
            }
            setField(A) {
                this.entries[A.name.toLowerCase()] = A
            }
            getField(A) {
                return this.entries[A.toLowerCase()]
            }
            removeField(A) {
                delete this.entries[A.toLowerCase()]
            }
            getByType(A) {
                return Object.values(this.entries).filter((B) => B.kind === A)
            }
        },
        $s6 = class A {
            static {
                Qv(this, "HttpRequest")
            }
            constructor(B) {
                this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
            }
            static clone(B) {
                let Q = new A({
                    ...B,
                    headers: {
                        ...B.headers
                    }
                });
                if (Q.query) Q.query = SHB(Q.query);
                return Q
            }
            static isInstance(B) {
                if (!B) return !1;
                let Q = B;
                return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
            }
            clone() {
                return A.clone(this)
            }
        };

    function SHB(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    Qv(SHB, "cloneQuery");
    var qs6 = class {
        static {
            Qv(this, "HttpResponse")
        }
        constructor(A) {
            this.statusCode = A.statusCode, this.reason = A.reason, this.headers = A.headers || {}, this.body = A.body
        }
        static isInstance(A) {
            if (!A) return !1;
            let B = A;
            return typeof B.statusCode === "number" && typeof B.headers === "object"
        }
    };

    function jHB(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    Qv(jHB, "isValidHostname")
});