/* chunk:413 bytes:[9567958, 9672009) size:104051 source:unpacked-cli.js */
var WEB = E((B63, YEB) => {
    var {
        defineProperty: Fx1,
        getOwnPropertyDescriptor: Ns6,
        getOwnPropertyNames: Ls6
    } = Object, Ms6 = Object.prototype.hasOwnProperty, h1 = (A, B) => Fx1(A, "name", {
        value: B,
        configurable: !0
    }), Rs6 = (A, B) => {
        for (var Q in B) Fx1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Os6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ls6(B))
                if (!Ms6.call(A, D) && D !== Q) Fx1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Ns6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Ts6 = (A) => Os6(Fx1({}, "__esModule", {
        value: !0
    }), A), iHB = {};
    Rs6(iHB, {
        AccessDeniedException: () => aHB,
        ApplyGuardrailCommand: () => ezB,
        ApplyGuardrailRequestFilterSensitiveLog: () => XzB,
        AsyncInvokeOutputDataConfig: () => WU0,
        AsyncInvokeStatus: () => hs6,
        AsyncInvokeSummaryFilterSensitiveLog: () => IzB,
        BedrockRuntime: () => IEB,
        BedrockRuntimeClient: () => $U0,
        BedrockRuntimeServiceException: () => AC,
        BidirectionalInputPayloadPartFilterSensitiveLog: () => Rr6,
        BidirectionalOutputPayloadPartFilterSensitiveLog: () => Tr6,
        CachePointType: () => Gr6,
        ConflictException: () => tHB,
        ContentBlock: () => Bx1,
        ContentBlockDelta: () => KU0,
        ContentBlockDeltaEventFilterSensitiveLog: () => UzB,
        ContentBlockDeltaFilterSensitiveLog: () => EzB,
        ContentBlockFilterSensitiveLog: () => VzB,
        ContentBlockStart: () => HU0,
        ConversationRole: () => Vr6,
        ConverseCommand: () => AEB,
        ConverseOutput: () => VU0,
        ConverseOutputFilterSensitiveLog: () => KzB,
        ConverseRequestFilterSensitiveLog: () => CzB,
        ConverseResponseFilterSensitiveLog: () => HzB,
        ConverseStreamCommand: () => BEB,
        ConverseStreamOutput: () => zU0,
        ConverseStreamOutputFilterSensitiveLog: () => Mr6,
        ConverseStreamRequestFilterSensitiveLog: () => zzB,
        ConverseStreamResponseFilterSensitiveLog: () => wzB,
        DocumentFormat: () => Fr6,
        DocumentSource: () => a_1,
        GetAsyncInvokeCommand: () => QEB,
        GetAsyncInvokeResponseFilterSensitiveLog: () => FzB,
        GuardrailAction: () => ps6,
        GuardrailContentBlock: () => n_1,
        GuardrailContentBlockFilterSensitiveLog: () => JzB,
        GuardrailContentFilterConfidence: () => ns6,
        GuardrailContentFilterStrength: () => as6,
        GuardrailContentFilterType: () => ss6,
        GuardrailContentPolicyAction: () => is6,
        GuardrailContentQualifier: () => ds6,
        GuardrailContentSource: () => ls6,
        GuardrailContextualGroundingFilterType: () => os6,
        GuardrailContextualGroundingPolicyAction: () => rs6,
        GuardrailConverseContentBlock: () => r_1,
        GuardrailConverseContentBlockFilterSensitiveLog: () => qU0,
        GuardrailConverseContentQualifier: () => Yr6,
        GuardrailConverseImageBlockFilterSensitiveLog: () => $r6,
        GuardrailConverseImageFormat: () => Ir6,
        GuardrailConverseImageSource: () => s_1,
        GuardrailConverseImageSourceFilterSensitiveLog: () => wr6,
        GuardrailImageBlockFilterSensitiveLog: () => Ur6,
        GuardrailImageFormat: () => ms6,
        GuardrailImageSource: () => i_1,
        GuardrailImageSourceFilterSensitiveLog: () => Er6,
        GuardrailManagedWordType: () => Zr6,
        GuardrailOutputScope: () => cs6,
        GuardrailPiiEntityType: () => es6,
        GuardrailSensitiveInformationPolicyAction: () => ts6,
        GuardrailStreamProcessingMode: () => Hr6,
        GuardrailTopicPolicyAction: () => Ar6,
        GuardrailTopicType: () => Br6,
        GuardrailTrace: () => Dr6,
        GuardrailWordPolicyAction: () => Qr6,
        ImageFormat: () => Wr6,
        ImageSource: () => o_1,
        InternalServerException: () => sHB,
        InvokeModelCommand: () => ZEB,
        InvokeModelRequestFilterSensitiveLog: () => $zB,
        InvokeModelResponseFilterSensitiveLog: () => qzB,
        InvokeModelWithBidirectionalStreamCommand: () => DEB,
        InvokeModelWithBidirectionalStreamInput: () => Gx1,
        InvokeModelWithBidirectionalStreamInputFilterSensitiveLog: () => Or6,
        InvokeModelWithBidirectionalStreamOutput: () => EU0,
        InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog: () => Pr6,
        InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog: () => NzB,
        InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog: () => LzB,
        InvokeModelWithResponseStreamCommand: () => GEB,
        InvokeModelWithResponseStreamRequestFilterSensitiveLog: () => MzB,
        InvokeModelWithResponseStreamResponseFilterSensitiveLog: () => RzB,
        ListAsyncInvokesCommand: () => SU0,
        ListAsyncInvokesResponseFilterSensitiveLog: () => YzB,
        MessageFilterSensitiveLog: () => Ix1,
        ModelErrorException: () => QzB,
        ModelNotReadyException: () => ZzB,
        ModelStreamErrorException: () => GzB,
        ModelTimeoutException: () => DzB,
        PayloadPartFilterSensitiveLog: () => Sr6,
        PerformanceConfigLatency: () => Cr6,
        PromptVariableValues: () => JU0,
        ReasoningContentBlock: () => t_1,
        ReasoningContentBlockDelta: () => CU0,
        ReasoningContentBlockDeltaFilterSensitiveLog: () => Lr6,
        ReasoningContentBlockFilterSensitiveLog: () => Nr6,
        ReasoningTextBlockFilterSensitiveLog: () => qr6,
        ResourceNotFoundException: () => eHB,
        ResponseStream: () => UU0,
        ResponseStreamFilterSensitiveLog: () => jr6,
        ServiceQuotaExceededException: () => AzB,
        ServiceUnavailableException: () => BzB,
        SortAsyncInvocationBy: () => gs6,
        SortOrder: () => us6,
        StartAsyncInvokeCommand: () => FEB,
        StartAsyncInvokeRequestFilterSensitiveLog: () => WzB,
        StopReason: () => Kr6,
        SystemContentBlock: () => Qx1,
        SystemContentBlockFilterSensitiveLog: () => NU0,
        ThrottlingException: () => rHB,
        Tool: () => Dx1,
        ToolChoice: () => XU0,
        ToolInputSchema: () => Zx1,
        ToolResultContentBlock: () => Ax1,
        ToolResultStatus: () => Xr6,
        Trace: () => zr6,
        ValidationException: () => oHB,
        VideoFormat: () => Jr6,
        VideoSource: () => e_1,
        __Client: () => r1.Client,
        paginateListAsyncInvokes: () => $t6
    });
    YEB.exports = Ts6(iHB);
    var nHB = YVB(),
        _HB = GQ1(),
        Ps6 = FQ1(),
        Ss6 = IQ1(),
        xHB = fi(),
        js6 = z4(),
        aK = HB(),
        ks6 = XVB(),
        ys6 = hG(),
        hM = T6(),
        vHB = u4(),
        bHB = xE0(),
        _s6 = h1((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "bedrock"
            })
        }, "resolveClientEndpointParameters"),
        BS = {
            UseFIPS: {
                type: "builtInParams",
                name: "useFipsEndpoint"
            },
            Endpoint: {
                type: "builtInParams",
                name: "endpoint"
            },
            Region: {
                type: "builtInParams",
                name: "region"
            },
            UseDualStack: {
                type: "builtInParams",
                name: "useDualstackEndpoint"
            }
        },
        xs6 = OHB(),
        fHB = NQ1(),
        hHB = yHB(),
        r1 = yD1(),
        vs6 = h1((A) => {
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
        }, "getHttpAuthExtensionConfiguration"),
        bs6 = h1((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        fs6 = h1((A, B) => {
            let Q = Object.assign(fHB.getAwsRegionExtensionConfiguration(A), r1.getDefaultExtensionConfiguration(A), hHB.getHttpHandlerExtensionConfiguration(A), vs6(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, fHB.resolveAwsRegionExtensionConfiguration(Q), r1.resolveDefaultRuntimeConfig(Q), hHB.resolveHttpHandlerRuntimeConfig(Q), bs6(Q))
        }, "resolveRuntimeExtensions"),
        $U0 = class extends r1.Client {
            static {
                h1(this, "BedrockRuntimeClient")
            }
            config;
            constructor(...[A]) {
                let B = xs6.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = _s6(B),
                    Z = xHB.resolveUserAgentConfig(Q),
                    D = vHB.resolveRetryConfig(Z),
                    G = js6.resolveRegionConfig(D),
                    F = _HB.resolveHostHeaderConfig(G),
                    I = hM.resolveEndpointConfig(F),
                    Y = ks6.resolveEventStreamSerdeConfig(I),
                    W = bHB.resolveHttpAuthSchemeConfig(Y),
                    J = nHB.resolveEventStreamConfig(W),
                    X = fs6(J, A?.extensions || []);
                this.config = X, this.middlewareStack.use(xHB.getUserAgentPlugin(this.config)), this.middlewareStack.use(vHB.getRetryPlugin(this.config)), this.middlewareStack.use(ys6.getContentLengthPlugin(this.config)), this.middlewareStack.use(_HB.getHostHeaderPlugin(this.config)), this.middlewareStack.use(Ps6.getLoggerPlugin(this.config)), this.middlewareStack.use(Ss6.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(aK.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: bHB.defaultBedrockRuntimeHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: h1(async (V) => new aK.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": V.credentials
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(aK.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        QS = y3(),
        AC = class A extends r1.ServiceException {
            static {
                h1(this, "BedrockRuntimeServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        aHB = class A extends AC {
            static {
                h1(this, "AccessDeniedException")
            }
            name = "AccessDeniedException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "AccessDeniedException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        WU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.s3OutputDataConfig !== void 0) return Q.s3OutputDataConfig(B.s3OutputDataConfig);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(WU0 || (WU0 = {}));
    var hs6 = {
            COMPLETED: "Completed",
            FAILED: "Failed",
            IN_PROGRESS: "InProgress"
        },
        sHB = class A extends AC {
            static {
                h1(this, "InternalServerException")
            }
            name = "InternalServerException";
            $fault = "server";
            constructor(B) {
                super({
                    name: "InternalServerException",
                    $fault: "server",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        rHB = class A extends AC {
            static {
                h1(this, "ThrottlingException")
            }
            name = "ThrottlingException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ThrottlingException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        oHB = class A extends AC {
            static {
                h1(this, "ValidationException")
            }
            name = "ValidationException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ValidationException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        gs6 = {
            SUBMISSION_TIME: "SubmissionTime"
        },
        us6 = {
            ASCENDING: "Ascending",
            DESCENDING: "Descending"
        },
        tHB = class A extends AC {
            static {
                h1(this, "ConflictException")
            }
            name = "ConflictException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ConflictException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        eHB = class A extends AC {
            static {
                h1(this, "ResourceNotFoundException")
            }
            name = "ResourceNotFoundException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ResourceNotFoundException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        AzB = class A extends AC {
            static {
                h1(this, "ServiceQuotaExceededException")
            }
            name = "ServiceQuotaExceededException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ServiceQuotaExceededException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        BzB = class A extends AC {
            static {
                h1(this, "ServiceUnavailableException")
            }
            name = "ServiceUnavailableException";
            $fault = "server";
            constructor(B) {
                super({
                    name: "ServiceUnavailableException",
                    $fault: "server",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        ms6 = {
            JPEG: "jpeg",
            PNG: "png"
        },
        i_1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.bytes !== void 0) return Q.bytes(B.bytes);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(i_1 || (i_1 = {}));
    var ds6 = {
            GROUNDING_SOURCE: "grounding_source",
            GUARD_CONTENT: "guard_content",
            QUERY: "query"
        },
        n_1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.text !== void 0) return Q.text(B.text);
            if (B.image !== void 0) return Q.image(B.image);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(n_1 || (n_1 = {}));
    var cs6 = {
            FULL: "FULL",
            INTERVENTIONS: "INTERVENTIONS"
        },
        ls6 = {
            INPUT: "INPUT",
            OUTPUT: "OUTPUT"
        },
        ps6 = {
            GUARDRAIL_INTERVENED: "GUARDRAIL_INTERVENED",
            NONE: "NONE"
        },
        is6 = {
            BLOCKED: "BLOCKED",
            NONE: "NONE"
        },
        ns6 = {
            HIGH: "HIGH",
            LOW: "LOW",
            MEDIUM: "MEDIUM",
            NONE: "NONE"
        },
        as6 = {
            HIGH: "HIGH",
            LOW: "LOW",
            MEDIUM: "MEDIUM",
            NONE: "NONE"
        },
        ss6 = {
            HATE: "HATE",
            INSULTS: "INSULTS",
            MISCONDUCT: "MISCONDUCT",
            PROMPT_ATTACK: "PROMPT_ATTACK",
            SEXUAL: "SEXUAL",
            VIOLENCE: "VIOLENCE"
        },
        rs6 = {
            BLOCKED: "BLOCKED",
            NONE: "NONE"
        },
        os6 = {
            GROUNDING: "GROUNDING",
            RELEVANCE: "RELEVANCE"
        },
        ts6 = {
            ANONYMIZED: "ANONYMIZED",
            BLOCKED: "BLOCKED",
            NONE: "NONE"
        },
        es6 = {
            ADDRESS: "ADDRESS",
            AGE: "AGE",
            AWS_ACCESS_KEY: "AWS_ACCESS_KEY",
            AWS_SECRET_KEY: "AWS_SECRET_KEY",
            CA_HEALTH_NUMBER: "CA_HEALTH_NUMBER",
            CA_SOCIAL_INSURANCE_NUMBER: "CA_SOCIAL_INSURANCE_NUMBER",
            CREDIT_DEBIT_CARD_CVV: "CREDIT_DEBIT_CARD_CVV",
            CREDIT_DEBIT_CARD_EXPIRY: "CREDIT_DEBIT_CARD_EXPIRY",
            CREDIT_DEBIT_CARD_NUMBER: "CREDIT_DEBIT_CARD_NUMBER",
            DRIVER_ID: "DRIVER_ID",
            EMAIL: "EMAIL",
            INTERNATIONAL_BANK_ACCOUNT_NUMBER: "INTERNATIONAL_BANK_ACCOUNT_NUMBER",
            IP_ADDRESS: "IP_ADDRESS",
            LICENSE_PLATE: "LICENSE_PLATE",
            MAC_ADDRESS: "MAC_ADDRESS",
            NAME: "NAME",
            PASSWORD: "PASSWORD",
            PHONE: "PHONE",
            PIN: "PIN",
            SWIFT_CODE: "SWIFT_CODE",
            UK_NATIONAL_HEALTH_SERVICE_NUMBER: "UK_NATIONAL_HEALTH_SERVICE_NUMBER",
            UK_NATIONAL_INSURANCE_NUMBER: "UK_NATIONAL_INSURANCE_NUMBER",
            UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER: "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER",
            URL: "URL",
            USERNAME: "USERNAME",
            US_BANK_ACCOUNT_NUMBER: "US_BANK_ACCOUNT_NUMBER",
            US_BANK_ROUTING_NUMBER: "US_BANK_ROUTING_NUMBER",
            US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER: "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER",
            US_PASSPORT_NUMBER: "US_PASSPORT_NUMBER",
            US_SOCIAL_SECURITY_NUMBER: "US_SOCIAL_SECURITY_NUMBER",
            VEHICLE_IDENTIFICATION_NUMBER: "VEHICLE_IDENTIFICATION_NUMBER"
        },
        Ar6 = {
            BLOCKED: "BLOCKED",
            NONE: "NONE"
        },
        Br6 = {
            DENY: "DENY"
        },
        Qr6 = {
            BLOCKED: "BLOCKED",
            NONE: "NONE"
        },
        Zr6 = {
            PROFANITY: "PROFANITY"
        },
        Dr6 = {
            DISABLED: "disabled",
            ENABLED: "enabled",
            ENABLED_FULL: "enabled_full"
        },
        Gr6 = {
            DEFAULT: "default"
        },
        Fr6 = {
            CSV: "csv",
            DOC: "doc",
            DOCX: "docx",
            HTML: "html",
            MD: "md",
            PDF: "pdf",
            TXT: "txt",
            XLS: "xls",
            XLSX: "xlsx"
        },
        a_1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.bytes !== void 0) return Q.bytes(B.bytes);
            if (B.s3Location !== void 0) return Q.s3Location(B.s3Location);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(a_1 || (a_1 = {}));
    var Ir6 = {
            JPEG: "jpeg",
            PNG: "png"
        },
        s_1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.bytes !== void 0) return Q.bytes(B.bytes);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(s_1 || (s_1 = {}));
    var Yr6 = {
            GROUNDING_SOURCE: "grounding_source",
            GUARD_CONTENT: "guard_content",
            QUERY: "query"
        },
        r_1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.text !== void 0) return Q.text(B.text);
            if (B.image !== void 0) return Q.image(B.image);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(r_1 || (r_1 = {}));
    var Wr6 = {
            GIF: "gif",
            JPEG: "jpeg",
            PNG: "png",
            WEBP: "webp"
        },
        o_1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.bytes !== void 0) return Q.bytes(B.bytes);
            if (B.s3Location !== void 0) return Q.s3Location(B.s3Location);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(o_1 || (o_1 = {}));
    var t_1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.reasoningText !== void 0) return Q.reasoningText(B.reasoningText);
            if (B.redactedContent !== void 0) return Q.redactedContent(B.redactedContent);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(t_1 || (t_1 = {}));
    var Jr6 = {
            FLV: "flv",
            MKV: "mkv",
            MOV: "mov",
            MP4: "mp4",
            MPEG: "mpeg",
            MPG: "mpg",
            THREE_GP: "three_gp",
            WEBM: "webm",
            WMV: "wmv"
        },
        e_1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.bytes !== void 0) return Q.bytes(B.bytes);
            if (B.s3Location !== void 0) return Q.s3Location(B.s3Location);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(e_1 || (e_1 = {}));
    var Ax1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.json !== void 0) return Q.json(B.json);
            if (B.text !== void 0) return Q.text(B.text);
            if (B.image !== void 0) return Q.image(B.image);
            if (B.document !== void 0) return Q.document(B.document);
            if (B.video !== void 0) return Q.video(B.video);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Ax1 || (Ax1 = {}));
    var Xr6 = {
            ERROR: "error",
            SUCCESS: "success"
        },
        Bx1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.text !== void 0) return Q.text(B.text);
            if (B.image !== void 0) return Q.image(B.image);
            if (B.document !== void 0) return Q.document(B.document);
            if (B.video !== void 0) return Q.video(B.video);
            if (B.toolUse !== void 0) return Q.toolUse(B.toolUse);
            if (B.toolResult !== void 0) return Q.toolResult(B.toolResult);
            if (B.guardContent !== void 0) return Q.guardContent(B.guardContent);
            if (B.cachePoint !== void 0) return Q.cachePoint(B.cachePoint);
            if (B.reasoningContent !== void 0) return Q.reasoningContent(B.reasoningContent);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Bx1 || (Bx1 = {}));
    var Vr6 = {
            ASSISTANT: "assistant",
            USER: "user"
        },
        Cr6 = {
            OPTIMIZED: "optimized",
            STANDARD: "standard"
        },
        JU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.text !== void 0) return Q.text(B.text);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(JU0 || (JU0 = {}));
    var Qx1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.text !== void 0) return Q.text(B.text);
            if (B.guardContent !== void 0) return Q.guardContent(B.guardContent);
            if (B.cachePoint !== void 0) return Q.cachePoint(B.cachePoint);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Qx1 || (Qx1 = {}));
    var XU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.auto !== void 0) return Q.auto(B.auto);
            if (B.any !== void 0) return Q.any(B.any);
            if (B.tool !== void 0) return Q.tool(B.tool);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(XU0 || (XU0 = {}));
    var Zx1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.json !== void 0) return Q.json(B.json);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Zx1 || (Zx1 = {}));
    var Dx1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.toolSpec !== void 0) return Q.toolSpec(B.toolSpec);
            if (B.cachePoint !== void 0) return Q.cachePoint(B.cachePoint);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Dx1 || (Dx1 = {}));
    var VU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.message !== void 0) return Q.message(B.message);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(VU0 || (VU0 = {}));
    var Kr6 = {
            CONTENT_FILTERED: "content_filtered",
            END_TURN: "end_turn",
            GUARDRAIL_INTERVENED: "guardrail_intervened",
            MAX_TOKENS: "max_tokens",
            STOP_SEQUENCE: "stop_sequence",
            TOOL_USE: "tool_use"
        },
        QzB = class A extends AC {
            static {
                h1(this, "ModelErrorException")
            }
            name = "ModelErrorException";
            $fault = "client";
            originalStatusCode;
            resourceName;
            constructor(B) {
                super({
                    name: "ModelErrorException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.originalStatusCode = B.originalStatusCode, this.resourceName = B.resourceName
            }
        },
        ZzB = class A extends AC {
            static {
                h1(this, "ModelNotReadyException")
            }
            name = "ModelNotReadyException";
            $fault = "client";
            $retryable = {};
            constructor(B) {
                super({
                    name: "ModelNotReadyException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        DzB = class A extends AC {
            static {
                h1(this, "ModelTimeoutException")
            }
            name = "ModelTimeoutException";
            $fault = "client";
            constructor(B) {
                super({
                    name: "ModelTimeoutException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        Hr6 = {
            ASYNC: "async",
            SYNC: "sync"
        },
        CU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.text !== void 0) return Q.text(B.text);
            if (B.redactedContent !== void 0) return Q.redactedContent(B.redactedContent);
            if (B.signature !== void 0) return Q.signature(B.signature);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(CU0 || (CU0 = {}));
    var KU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.text !== void 0) return Q.text(B.text);
            if (B.toolUse !== void 0) return Q.toolUse(B.toolUse);
            if (B.reasoningContent !== void 0) return Q.reasoningContent(B.reasoningContent);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(KU0 || (KU0 = {}));
    var HU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.toolUse !== void 0) return Q.toolUse(B.toolUse);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(HU0 || (HU0 = {}));
    var GzB = class A extends AC {
            static {
                h1(this, "ModelStreamErrorException")
            }
            name = "ModelStreamErrorException";
            $fault = "client";
            originalStatusCode;
            originalMessage;
            constructor(B) {
                super({
                    name: "ModelStreamErrorException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.originalStatusCode = B.originalStatusCode, this.originalMessage = B.originalMessage
            }
        },
        zU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.messageStart !== void 0) return Q.messageStart(B.messageStart);
            if (B.contentBlockStart !== void 0) return Q.contentBlockStart(B.contentBlockStart);
            if (B.contentBlockDelta !== void 0) return Q.contentBlockDelta(B.contentBlockDelta);
            if (B.contentBlockStop !== void 0) return Q.contentBlockStop(B.contentBlockStop);
            if (B.messageStop !== void 0) return Q.messageStop(B.messageStop);
            if (B.metadata !== void 0) return Q.metadata(B.metadata);
            if (B.internalServerException !== void 0) return Q.internalServerException(B.internalServerException);
            if (B.modelStreamErrorException !== void 0) return Q.modelStreamErrorException(B.modelStreamErrorException);
            if (B.validationException !== void 0) return Q.validationException(B.validationException);
            if (B.throttlingException !== void 0) return Q.throttlingException(B.throttlingException);
            if (B.serviceUnavailableException !== void 0) return Q.serviceUnavailableException(B.serviceUnavailableException);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(zU0 || (zU0 = {}));
    var zr6 = {
            DISABLED: "DISABLED",
            ENABLED: "ENABLED",
            ENABLED_FULL: "ENABLED_FULL"
        },
        Gx1;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.chunk !== void 0) return Q.chunk(B.chunk);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Gx1 || (Gx1 = {}));
    var EU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.chunk !== void 0) return Q.chunk(B.chunk);
            if (B.internalServerException !== void 0) return Q.internalServerException(B.internalServerException);
            if (B.modelStreamErrorException !== void 0) return Q.modelStreamErrorException(B.modelStreamErrorException);
            if (B.validationException !== void 0) return Q.validationException(B.validationException);
            if (B.throttlingException !== void 0) return Q.throttlingException(B.throttlingException);
            if (B.modelTimeoutException !== void 0) return Q.modelTimeoutException(B.modelTimeoutException);
            if (B.serviceUnavailableException !== void 0) return Q.serviceUnavailableException(B.serviceUnavailableException);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(EU0 || (EU0 = {}));
    var UU0;
    ((A) => {
        A.visit = h1((B, Q) => {
            if (B.chunk !== void 0) return Q.chunk(B.chunk);
            if (B.internalServerException !== void 0) return Q.internalServerException(B.internalServerException);
            if (B.modelStreamErrorException !== void 0) return Q.modelStreamErrorException(B.modelStreamErrorException);
            if (B.validationException !== void 0) return Q.validationException(B.validationException);
            if (B.throttlingException !== void 0) return Q.throttlingException(B.throttlingException);
            if (B.modelTimeoutException !== void 0) return Q.modelTimeoutException(B.modelTimeoutException);
            if (B.serviceUnavailableException !== void 0) return Q.serviceUnavailableException(B.serviceUnavailableException);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(UU0 || (UU0 = {}));
    var FzB = h1((A) => ({
            ...A,
            ...A.failureMessage && {
                failureMessage: r1.SENSITIVE_STRING
            },
            ...A.outputDataConfig && {
                outputDataConfig: A.outputDataConfig
            }
        }), "GetAsyncInvokeResponseFilterSensitiveLog"),
        IzB = h1((A) => ({
            ...A,
            ...A.failureMessage && {
                failureMessage: r1.SENSITIVE_STRING
            },
            ...A.outputDataConfig && {
                outputDataConfig: A.outputDataConfig
            }
        }), "AsyncInvokeSummaryFilterSensitiveLog"),
        YzB = h1((A) => ({
            ...A,
            ...A.asyncInvokeSummaries && {
                asyncInvokeSummaries: A.asyncInvokeSummaries.map((B) => IzB(B))
            }
        }), "ListAsyncInvokesResponseFilterSensitiveLog"),
        WzB = h1((A) => ({
            ...A,
            ...A.modelInput && {
                modelInput: r1.SENSITIVE_STRING
            },
            ...A.outputDataConfig && {
                outputDataConfig: A.outputDataConfig
            }
        }), "StartAsyncInvokeRequestFilterSensitiveLog"),
        Er6 = h1((A) => {
            if (A.bytes !== void 0) return {
                bytes: A.bytes
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "GuardrailImageSourceFilterSensitiveLog"),
        Ur6 = h1((A) => ({
            ...A,
            ...A.source && {
                source: r1.SENSITIVE_STRING
            }
        }), "GuardrailImageBlockFilterSensitiveLog"),
        JzB = h1((A) => {
            if (A.text !== void 0) return {
                text: A.text
            };
            if (A.image !== void 0) return {
                image: r1.SENSITIVE_STRING
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "GuardrailContentBlockFilterSensitiveLog"),
        XzB = h1((A) => ({
            ...A,
            ...A.content && {
                content: A.content.map((B) => JzB(B))
            }
        }), "ApplyGuardrailRequestFilterSensitiveLog"),
        wr6 = h1((A) => {
            if (A.bytes !== void 0) return {
                bytes: A.bytes
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "GuardrailConverseImageSourceFilterSensitiveLog"),
        $r6 = h1((A) => ({
            ...A,
            ...A.source && {
                source: r1.SENSITIVE_STRING
            }
        }), "GuardrailConverseImageBlockFilterSensitiveLog"),
        qU0 = h1((A) => {
            if (A.text !== void 0) return {
                text: A.text
            };
            if (A.image !== void 0) return {
                image: r1.SENSITIVE_STRING
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "GuardrailConverseContentBlockFilterSensitiveLog"),
        qr6 = h1((A) => ({
            ...A
        }), "ReasoningTextBlockFilterSensitiveLog"),
        Nr6 = h1((A) => {
            if (A.reasoningText !== void 0) return {
                reasoningText: r1.SENSITIVE_STRING
            };
            if (A.redactedContent !== void 0) return {
                redactedContent: A.redactedContent
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "ReasoningContentBlockFilterSensitiveLog"),
        VzB = h1((A) => {
            if (A.text !== void 0) return {
                text: A.text
            };
            if (A.image !== void 0) return {
                image: A.image
            };
            if (A.document !== void 0) return {
                document: A.document
            };
            if (A.video !== void 0) return {
                video: A.video
            };
            if (A.toolUse !== void 0) return {
                toolUse: A.toolUse
            };
            if (A.toolResult !== void 0) return {
                toolResult: A.toolResult
            };
            if (A.guardContent !== void 0) return {
                guardContent: qU0(A.guardContent)
            };
            if (A.cachePoint !== void 0) return {
                cachePoint: A.cachePoint
            };
            if (A.reasoningContent !== void 0) return {
                reasoningContent: r1.SENSITIVE_STRING
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "ContentBlockFilterSensitiveLog"),
        Ix1 = h1((A) => ({
            ...A,
            ...A.content && {
                content: A.content.map((B) => VzB(B))
            }
        }), "MessageFilterSensitiveLog"),
        NU0 = h1((A) => {
            if (A.text !== void 0) return {
                text: A.text
            };
            if (A.guardContent !== void 0) return {
                guardContent: qU0(A.guardContent)
            };
            if (A.cachePoint !== void 0) return {
                cachePoint: A.cachePoint
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "SystemContentBlockFilterSensitiveLog"),
        CzB = h1((A) => ({
            ...A,
            ...A.messages && {
                messages: A.messages.map((B) => Ix1(B))
            },
            ...A.system && {
                system: A.system.map((B) => NU0(B))
            },
            ...A.toolConfig && {
                toolConfig: A.toolConfig
            },
            ...A.promptVariables && {
                promptVariables: r1.SENSITIVE_STRING
            },
            ...A.requestMetadata && {
                requestMetadata: r1.SENSITIVE_STRING
            }
        }), "ConverseRequestFilterSensitiveLog"),
        KzB = h1((A) => {
            if (A.message !== void 0) return {
                message: Ix1(A.message)
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "ConverseOutputFilterSensitiveLog"),
        HzB = h1((A) => ({
            ...A,
            ...A.output && {
                output: KzB(A.output)
            }
        }), "ConverseResponseFilterSensitiveLog"),
        zzB = h1((A) => ({
            ...A,
            ...A.messages && {
                messages: A.messages.map((B) => Ix1(B))
            },
            ...A.system && {
                system: A.system.map((B) => NU0(B))
            },
            ...A.toolConfig && {
                toolConfig: A.toolConfig
            },
            ...A.promptVariables && {
                promptVariables: r1.SENSITIVE_STRING
            },
            ...A.requestMetadata && {
                requestMetadata: r1.SENSITIVE_STRING
            }
        }), "ConverseStreamRequestFilterSensitiveLog"),
        Lr6 = h1((A) => {
            if (A.text !== void 0) return {
                text: A.text
            };
            if (A.redactedContent !== void 0) return {
                redactedContent: A.redactedContent
            };
            if (A.signature !== void 0) return {
                signature: A.signature
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "ReasoningContentBlockDeltaFilterSensitiveLog"),
        EzB = h1((A) => {
            if (A.text !== void 0) return {
                text: A.text
            };
            if (A.toolUse !== void 0) return {
                toolUse: A.toolUse
            };
            if (A.reasoningContent !== void 0) return {
                reasoningContent: r1.SENSITIVE_STRING
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "ContentBlockDeltaFilterSensitiveLog"),
        UzB = h1((A) => ({
            ...A,
            ...A.delta && {
                delta: EzB(A.delta)
            }
        }), "ContentBlockDeltaEventFilterSensitiveLog"),
        Mr6 = h1((A) => {
            if (A.messageStart !== void 0) return {
                messageStart: A.messageStart
            };
            if (A.contentBlockStart !== void 0) return {
                contentBlockStart: A.contentBlockStart
            };
            if (A.contentBlockDelta !== void 0) return {
                contentBlockDelta: UzB(A.contentBlockDelta)
            };
            if (A.contentBlockStop !== void 0) return {
                contentBlockStop: A.contentBlockStop
            };
            if (A.messageStop !== void 0) return {
                messageStop: A.messageStop
            };
            if (A.metadata !== void 0) return {
                metadata: A.metadata
            };
            if (A.internalServerException !== void 0) return {
                internalServerException: A.internalServerException
            };
            if (A.modelStreamErrorException !== void 0) return {
                modelStreamErrorException: A.modelStreamErrorException
            };
            if (A.validationException !== void 0) return {
                validationException: A.validationException
            };
            if (A.throttlingException !== void 0) return {
                throttlingException: A.throttlingException
            };
            if (A.serviceUnavailableException !== void 0) return {
                serviceUnavailableException: A.serviceUnavailableException
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "ConverseStreamOutputFilterSensitiveLog"),
        wzB = h1((A) => ({
            ...A,
            ...A.stream && {
                stream: "STREAMING_CONTENT"
            }
        }), "ConverseStreamResponseFilterSensitiveLog"),
        $zB = h1((A) => ({
            ...A,
            ...A.body && {
                body: r1.SENSITIVE_STRING
            }
        }), "InvokeModelRequestFilterSensitiveLog"),
        qzB = h1((A) => ({
            ...A,
            ...A.body && {
                body: r1.SENSITIVE_STRING
            }
        }), "InvokeModelResponseFilterSensitiveLog"),
        Rr6 = h1((A) => ({
            ...A,
            ...A.bytes && {
                bytes: r1.SENSITIVE_STRING
            }
        }), "BidirectionalInputPayloadPartFilterSensitiveLog"),
        Or6 = h1((A) => {
            if (A.chunk !== void 0) return {
                chunk: r1.SENSITIVE_STRING
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "InvokeModelWithBidirectionalStreamInputFilterSensitiveLog"),
        NzB = h1((A) => ({
            ...A,
            ...A.body && {
                body: "STREAMING_CONTENT"
            }
        }), "InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog"),
        Tr6 = h1((A) => ({
            ...A,
            ...A.bytes && {
                bytes: r1.SENSITIVE_STRING
            }
        }), "BidirectionalOutputPayloadPartFilterSensitiveLog"),
        Pr6 = h1((A) => {
            if (A.chunk !== void 0) return {
                chunk: r1.SENSITIVE_STRING
            };
            if (A.internalServerException !== void 0) return {
                internalServerException: A.internalServerException
            };
            if (A.modelStreamErrorException !== void 0) return {
                modelStreamErrorException: A.modelStreamErrorException
            };
            if (A.validationException !== void 0) return {
                validationException: A.validationException
            };
            if (A.throttlingException !== void 0) return {
                throttlingException: A.throttlingException
            };
            if (A.modelTimeoutException !== void 0) return {
                modelTimeoutException: A.modelTimeoutException
            };
            if (A.serviceUnavailableException !== void 0) return {
                serviceUnavailableException: A.serviceUnavailableException
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog"),
        LzB = h1((A) => ({
            ...A,
            ...A.body && {
                body: "STREAMING_CONTENT"
            }
        }), "InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog"),
        MzB = h1((A) => ({
            ...A,
            ...A.body && {
                body: r1.SENSITIVE_STRING
            }
        }), "InvokeModelWithResponseStreamRequestFilterSensitiveLog"),
        Sr6 = h1((A) => ({
            ...A,
            ...A.bytes && {
                bytes: r1.SENSITIVE_STRING
            }
        }), "PayloadPartFilterSensitiveLog"),
        jr6 = h1((A) => {
            if (A.chunk !== void 0) return {
                chunk: r1.SENSITIVE_STRING
            };
            if (A.internalServerException !== void 0) return {
                internalServerException: A.internalServerException
            };
            if (A.modelStreamErrorException !== void 0) return {
                modelStreamErrorException: A.modelStreamErrorException
            };
            if (A.validationException !== void 0) return {
                validationException: A.validationException
            };
            if (A.throttlingException !== void 0) return {
                throttlingException: A.throttlingException
            };
            if (A.modelTimeoutException !== void 0) return {
                modelTimeoutException: A.modelTimeoutException
            };
            if (A.serviceUnavailableException !== void 0) return {
                serviceUnavailableException: A.serviceUnavailableException
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "ResponseStreamFilterSensitiveLog"),
        RzB = h1((A) => ({
            ...A,
            ...A.body && {
                body: "STREAMING_CONTENT"
            }
        }), "InvokeModelWithResponseStreamResponseFilterSensitiveLog"),
        K8 = WI(),
        kr6 = b91(),
        yr6 = h1(async (A, B) => {
            let Q = aK.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/guardrail/{guardrailIdentifier}/version/{guardrailVersion}/apply"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1), Q.p("guardrailVersion", () => A.guardrailVersion, "{guardrailVersion}", !1);
            let D;
            return D = JSON.stringify(r1.take(A, {
                content: h1((G) => qo6(G, B), "content"),
                outputScope: [],
                source: []
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_ApplyGuardrailCommand"),
        _r6 = h1(async (A, B) => {
            let Q = aK.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/model/{modelId}/converse"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
            let D;
            return D = JSON.stringify(r1.take(A, {
                additionalModelRequestFields: h1((G) => vD1(G, B), "additionalModelRequestFields"),
                additionalModelResponseFieldPaths: h1((G) => r1._json(G), "additionalModelResponseFieldPaths"),
                guardrailConfig: h1((G) => r1._json(G), "guardrailConfig"),
                inferenceConfig: h1((G) => bzB(G, B), "inferenceConfig"),
                messages: h1((G) => fzB(G, B), "messages"),
                performanceConfig: h1((G) => r1._json(G), "performanceConfig"),
                promptVariables: h1((G) => r1._json(G), "promptVariables"),
                requestMetadata: h1((G) => r1._json(G), "requestMetadata"),
                system: h1((G) => hzB(G, B), "system"),
                toolConfig: h1((G) => gzB(G, B), "toolConfig")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_ConverseCommand"),
        xr6 = h1(async (A, B) => {
            let Q = aK.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/model/{modelId}/converse-stream"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
            let D;
            return D = JSON.stringify(r1.take(A, {
                additionalModelRequestFields: h1((G) => vD1(G, B), "additionalModelRequestFields"),
                additionalModelResponseFieldPaths: h1((G) => r1._json(G), "additionalModelResponseFieldPaths"),
                guardrailConfig: h1((G) => r1._json(G), "guardrailConfig"),
                inferenceConfig: h1((G) => bzB(G, B), "inferenceConfig"),
                messages: h1((G) => fzB(G, B), "messages"),
                performanceConfig: h1((G) => r1._json(G), "performanceConfig"),
                promptVariables: h1((G) => r1._json(G), "promptVariables"),
                requestMetadata: h1((G) => r1._json(G), "requestMetadata"),
                system: h1((G) => hzB(G, B), "system"),
                toolConfig: h1((G) => gzB(G, B), "toolConfig")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_ConverseStreamCommand"),
        vr6 = h1(async (A, B) => {
            let Q = aK.requestBuilder(A, B),
                Z = {};
            Q.bp("/async-invoke/{invocationArn}"), Q.p("invocationArn", () => A.invocationArn, "{invocationArn}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetAsyncInvokeCommand"),
        br6 = h1(async (A, B) => {
            let Q = aK.requestBuilder(A, B),
                Z = r1.map({}, r1.isSerializableHeaderValue, {
                    [PU0]: A[Wx1] || "application/octet-stream",
                    [wU0]: A[wU0],
                    [tzB]: A[szB],
                    [rzB]: A[nzB],
                    [ozB]: A[azB],
                    [Xx1]: A[Jx1]
                });
            Q.bp("/model/{modelId}/invoke"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
            let D;
            if (A.body !== void 0) D = A.body;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_InvokeModelCommand"),
        fr6 = h1(async (A, B) => {
            let Q = aK.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/model/{modelId}/invoke-with-bidirectional-stream"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
            let D;
            if (A.body !== void 0) D = Zo6(A.body, B);
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_InvokeModelWithBidirectionalStreamCommand"),
        hr6 = h1(async (A, B) => {
            let Q = aK.requestBuilder(A, B),
                Z = r1.map({}, r1.isSerializableHeaderValue, {
                    [PU0]: A[Wx1] || "application/octet-stream",
                    [Et6]: A[wU0],
                    [tzB]: A[szB],
                    [rzB]: A[nzB],
                    [ozB]: A[azB],
                    [Xx1]: A[Jx1]
                });
            Q.bp("/model/{modelId}/invoke-with-response-stream"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
            let D;
            if (A.body !== void 0) D = A.body;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_InvokeModelWithResponseStreamCommand"),
        gr6 = h1(async (A, B) => {
            let Q = aK.requestBuilder(A, B),
                Z = {};
            Q.bp("/async-invoke");
            let D = r1.map({
                    [lHB]: [() => A.submitTimeAfter !== void 0, () => r1.serializeDateTime(A[lHB]).toString()],
                    [pHB]: [() => A.submitTimeBefore !== void 0, () => r1.serializeDateTime(A[pHB]).toString()],
                    [dHB]: [, A[dHB]],
                    [gHB]: [() => A.maxResults !== void 0, () => A[gHB].toString()],
                    [uHB]: [, A[uHB]],
                    [mHB]: [, A[mHB]],
                    [cHB]: [, A[cHB]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListAsyncInvokesCommand"),
        ur6 = h1(async (A, B) => {
            let Q = aK.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/async-invoke");
            let D;
            return D = JSON.stringify(r1.take(A, {
                clientRequestToken: [!0, (G) => G ?? kr6.v4()],
                modelId: [],
                modelInput: h1((G) => Po6(G, B), "modelInput"),
                outputDataConfig: h1((G) => r1._json(G), "outputDataConfig"),
                tags: h1((G) => r1._json(G), "tags")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_StartAsyncInvokeCommand"),
        mr6 = h1(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ZS(A, B);
            let Q = r1.map({
                    $metadata: EG(A)
                }),
                Z = r1.expectNonNull(r1.expectObject(await K8.parseJsonBody(A.body, B)), "body"),
                D = r1.take(Z, {
                    action: r1.expectString,
                    actionReason: r1.expectString,
                    assessments: h1((G) => czB(G, B), "assessments"),
                    guardrailCoverage: r1._json,
                    outputs: r1._json,
                    usage: r1._json
                });
            return Object.assign(Q, D), Q
        }, "de_ApplyGuardrailCommand"),
        dr6 = h1(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ZS(A, B);
            let Q = r1.map({
                    $metadata: EG(A)
                }),
                Z = r1.expectNonNull(r1.expectObject(await K8.parseJsonBody(A.body, B)), "body"),
                D = r1.take(Z, {
                    additionalModelResponseFields: h1((G) => Yx1(G, B), "additionalModelResponseFields"),
                    metrics: r1._json,
                    output: h1((G) => no6(K8.awsExpectUnion(G), B), "output"),
                    performanceConfig: r1._json,
                    stopReason: r1.expectString,
                    trace: h1((G) => ro6(G, B), "trace"),
                    usage: r1._json
                });
            return Object.assign(Q, D), Q
        }, "de_ConverseCommand"),
        cr6 = h1(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ZS(A, B);
            let Q = r1.map({
                    $metadata: EG(A)
                }),
                Z = A.body;
            return Q.stream = Go6(Z, B), Q
        }, "de_ConverseStreamCommand"),
        lr6 = h1(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ZS(A, B);
            let Q = r1.map({
                    $metadata: EG(A)
                }),
                Z = r1.expectNonNull(r1.expectObject(await K8.parseJsonBody(A.body, B)), "body"),
                D = r1.take(Z, {
                    clientRequestToken: r1.expectString,
                    endTime: h1((G) => r1.expectNonNull(r1.parseRfc3339DateTimeWithOffset(G)), "endTime"),
                    failureMessage: r1.expectString,
                    invocationArn: r1.expectString,
                    lastModifiedTime: h1((G) => r1.expectNonNull(r1.parseRfc3339DateTimeWithOffset(G)), "lastModifiedTime"),
                    modelArn: r1.expectString,
                    outputDataConfig: h1((G) => r1._json(K8.awsExpectUnion(G)), "outputDataConfig"),
                    status: r1.expectString,
                    submitTime: h1((G) => r1.expectNonNull(r1.parseRfc3339DateTimeWithOffset(G)), "submitTime")
                });
            return Object.assign(Q, D), Q
        }, "de_GetAsyncInvokeCommand"),
        pr6 = h1(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ZS(A, B);
            let Q = r1.map({
                    $metadata: EG(A),
                    [Wx1]: [, A.headers[PU0]],
                    [Jx1]: [, A.headers[Xx1]]
                }),
                Z = await r1.collectBody(A.body, B);
            return Q.body = Z, Q
        }, "de_InvokeModelCommand"),
        ir6 = h1(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ZS(A, B);
            let Q = r1.map({
                    $metadata: EG(A)
                }),
                Z = A.body;
            return Q.body = Fo6(Z, B), Q
        }, "de_InvokeModelWithBidirectionalStreamCommand"),
        nr6 = h1(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ZS(A, B);
            let Q = r1.map({
                    $metadata: EG(A),
                    [Wx1]: [, A.headers[Ut6]],
                    [Jx1]: [, A.headers[Xx1]]
                }),
                Z = A.body;
            return Q.body = Io6(Z, B), Q
        }, "de_InvokeModelWithResponseStreamCommand"),
        ar6 = h1(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ZS(A, B);
            let Q = r1.map({
                    $metadata: EG(A)
                }),
                Z = r1.expectNonNull(r1.expectObject(await K8.parseJsonBody(A.body, B)), "body"),
                D = r1.take(Z, {
                    asyncInvokeSummaries: h1((G) => uo6(G, B), "asyncInvokeSummaries"),
                    nextToken: r1.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListAsyncInvokesCommand"),
        sr6 = h1(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return ZS(A, B);
            let Q = r1.map({
                    $metadata: EG(A)
                }),
                Z = r1.expectNonNull(r1.expectObject(await K8.parseJsonBody(A.body, B)), "body"),
                D = r1.take(Z, {
                    invocationArn: r1.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_StartAsyncInvokeCommand"),
        ZS = h1(async (A, B) => {
            let Q = {
                    ...A,
                    body: await K8.parseJsonErrorBody(A.body, B)
                },
                Z = K8.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "AccessDeniedException":
                case "com.amazonaws.bedrockruntime#AccessDeniedException":
                    throw await or6(Q, B);
                case "InternalServerException":
                case "com.amazonaws.bedrockruntime#InternalServerException":
                    throw await OzB(Q, B);
                case "ResourceNotFoundException":
                case "com.amazonaws.bedrockruntime#ResourceNotFoundException":
                    throw await Bo6(Q, B);
                case "ServiceQuotaExceededException":
                case "com.amazonaws.bedrockruntime#ServiceQuotaExceededException":
                    throw await Qo6(Q, B);
                case "ThrottlingException":
                case "com.amazonaws.bedrockruntime#ThrottlingException":
                    throw await jzB(Q, B);
                case "ValidationException":
                case "com.amazonaws.bedrockruntime#ValidationException":
                    throw await kzB(Q, B);
                case "ModelErrorException":
                case "com.amazonaws.bedrockruntime#ModelErrorException":
                    throw await er6(Q, B);
                case "ModelNotReadyException":
                case "com.amazonaws.bedrockruntime#ModelNotReadyException":
                    throw await Ao6(Q, B);
                case "ModelTimeoutException":
                case "com.amazonaws.bedrockruntime#ModelTimeoutException":
                    throw await PzB(Q, B);
                case "ServiceUnavailableException":
                case "com.amazonaws.bedrockruntime#ServiceUnavailableException":
                    throw await SzB(Q, B);
                case "ModelStreamErrorException":
                case "com.amazonaws.bedrockruntime#ModelStreamErrorException":
                    throw await TzB(Q, B);
                case "ConflictException":
                case "com.amazonaws.bedrockruntime#ConflictException":
                    throw await tr6(Q, B);
                default:
                    let D = Q.body;
                    return rr6({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        rr6 = r1.withBaseException(AC),
        or6 = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new aHB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_AccessDeniedExceptionRes"),
        tr6 = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new tHB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ConflictExceptionRes"),
        OzB = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new sHB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_InternalServerExceptionRes"),
        er6 = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString,
                    originalStatusCode: r1.expectInt32,
                    resourceName: r1.expectString
                });
            Object.assign(Q, D);
            let G = new QzB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ModelErrorExceptionRes"),
        Ao6 = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new ZzB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ModelNotReadyExceptionRes"),
        TzB = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString,
                    originalMessage: r1.expectString,
                    originalStatusCode: r1.expectInt32
                });
            Object.assign(Q, D);
            let G = new GzB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ModelStreamErrorExceptionRes"),
        PzB = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new DzB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ModelTimeoutExceptionRes"),
        Bo6 = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new eHB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ResourceNotFoundExceptionRes"),
        Qo6 = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new AzB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ServiceQuotaExceededExceptionRes"),
        SzB = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new BzB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ServiceUnavailableExceptionRes"),
        jzB = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new rHB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ThrottlingExceptionRes"),
        kzB = h1(async (A, B) => {
            let Q = r1.map({}),
                Z = A.body,
                D = r1.take(Z, {
                    message: r1.expectString
                });
            Object.assign(Q, D);
            let G = new oHB({
                $metadata: EG(A),
                ...Q
            });
            return r1.decorateServiceException(G, A.body)
        }, "de_ValidationExceptionRes"),
        Zo6 = h1((A, B) => {
            let Q = h1((Z) => Gx1.visit(Z, {
                chunk: h1((D) => Do6(D, B), "chunk"),
                _: h1((D) => D, "_")
            }), "eventMarshallingVisitor");
            return B.eventStreamMarshaller.serialize(A, Q)
        }, "se_InvokeModelWithBidirectionalStreamInput"),
        Do6 = h1((A, B) => {
            let Q = {
                    ":event-type": {
                        type: "string",
                        value: "chunk"
                    },
                    ":message-type": {
                        type: "string",
                        value: "event"
                    },
                    ":content-type": {
                        type: "string",
                        value: "application/json"
                    }
                },
                Z = new Uint8Array;
            return Z = zo6(A, B), Z = B.utf8Decoder(JSON.stringify(Z)), {
                headers: Q,
                body: Z
            }
        }, "se_BidirectionalInputPayloadPart_event"),
        Go6 = h1((A, B) => {
            return B.eventStreamMarshaller.deserialize(A, async (Q) => {
                if (Q.messageStart != null) return {
                    messageStart: await Co6(Q.messageStart, B)
                };
                if (Q.contentBlockStart != null) return {
                    contentBlockStart: await Jo6(Q.contentBlockStart, B)
                };
                if (Q.contentBlockDelta != null) return {
                    contentBlockDelta: await Wo6(Q.contentBlockDelta, B)
                };
                if (Q.contentBlockStop != null) return {
                    contentBlockStop: await Xo6(Q.contentBlockStop, B)
                };
                if (Q.messageStop != null) return {
                    messageStop: await Ko6(Q.messageStop, B)
                };
                if (Q.metadata != null) return {
                    metadata: await Vo6(Q.metadata, B)
                };
                if (Q.internalServerException != null) return {
                    internalServerException: await LU0(Q.internalServerException, B)
                };
                if (Q.modelStreamErrorException != null) return {
                    modelStreamErrorException: await MU0(Q.modelStreamErrorException, B)
                };
                if (Q.validationException != null) return {
                    validationException: await TU0(Q.validationException, B)
                };
                if (Q.throttlingException != null) return {
                    throttlingException: await OU0(Q.throttlingException, B)
                };
                if (Q.serviceUnavailableException != null) return {
                    serviceUnavailableException: await RU0(Q.serviceUnavailableException, B)
                };
                return {
                    $unknown: A
                }
            })
        }, "de_ConverseStreamOutput"),
        Fo6 = h1((A, B) => {
            return B.eventStreamMarshaller.deserialize(A, async (Q) => {
                if (Q.chunk != null) return {
                    chunk: await Yo6(Q.chunk, B)
                };
                if (Q.internalServerException != null) return {
                    internalServerException: await LU0(Q.internalServerException, B)
                };
                if (Q.modelStreamErrorException != null) return {
                    modelStreamErrorException: await MU0(Q.modelStreamErrorException, B)
                };
                if (Q.validationException != null) return {
                    validationException: await TU0(Q.validationException, B)
                };
                if (Q.throttlingException != null) return {
                    throttlingException: await OU0(Q.throttlingException, B)
                };
                if (Q.modelTimeoutException != null) return {
                    modelTimeoutException: await yzB(Q.modelTimeoutException, B)
                };
                if (Q.serviceUnavailableException != null) return {
                    serviceUnavailableException: await RU0(Q.serviceUnavailableException, B)
                };
                return {
                    $unknown: A
                }
            })
        }, "de_InvokeModelWithBidirectionalStreamOutput"),
        Io6 = h1((A, B) => {
            return B.eventStreamMarshaller.deserialize(A, async (Q) => {
                if (Q.chunk != null) return {
                    chunk: await Ho6(Q.chunk, B)
                };
                if (Q.internalServerException != null) return {
                    internalServerException: await LU0(Q.internalServerException, B)
                };
                if (Q.modelStreamErrorException != null) return {
                    modelStreamErrorException: await MU0(Q.modelStreamErrorException, B)
                };
                if (Q.validationException != null) return {
                    validationException: await TU0(Q.validationException, B)
                };
                if (Q.throttlingException != null) return {
                    throttlingException: await OU0(Q.throttlingException, B)
                };
                if (Q.modelTimeoutException != null) return {
                    modelTimeoutException: await yzB(Q.modelTimeoutException, B)
                };
                if (Q.serviceUnavailableException != null) return {
                    serviceUnavailableException: await RU0(Q.serviceUnavailableException, B)
                };
                return {
                    $unknown: A
                }
            })
        }, "de_ResponseStream"),
        Yo6 = h1(async (A, B) => {
            let Q = {},
                Z = await K8.parseJsonBody(A.body, B);
            return Object.assign(Q, do6(Z, B)), Q
        }, "de_BidirectionalOutputPayloadPart_event"),
        Wo6 = h1(async (A, B) => {
            let Q = {},
                Z = await K8.parseJsonBody(A.body, B);
            return Object.assign(Q, po6(Z, B)), Q
        }, "de_ContentBlockDeltaEvent_event"),
        Jo6 = h1(async (A, B) => {
            let Q = {},
                Z = await K8.parseJsonBody(A.body, B);
            return Object.assign(Q, r1._json(Z)), Q
        }, "de_ContentBlockStartEvent_event"),
        Xo6 = h1(async (A, B) => {
            let Q = {},
                Z = await K8.parseJsonBody(A.body, B);
            return Object.assign(Q, r1._json(Z)), Q
        }, "de_ContentBlockStopEvent_event"),
        Vo6 = h1(async (A, B) => {
            let Q = {},
                Z = await K8.parseJsonBody(A.body, B);
            return Object.assign(Q, ao6(Z, B)), Q
        }, "de_ConverseStreamMetadataEvent_event"),
        LU0 = h1(async (A, B) => {
            let Q = {
                ...A,
                body: await K8.parseJsonBody(A.body, B)
            };
            return OzB(Q, B)
        }, "de_InternalServerException_event"),
        Co6 = h1(async (A, B) => {
            let Q = {},
                Z = await K8.parseJsonBody(A.body, B);
            return Object.assign(Q, r1._json(Z)), Q
        }, "de_MessageStartEvent_event"),
        Ko6 = h1(async (A, B) => {
            let Q = {},
                Z = await K8.parseJsonBody(A.body, B);
            return Object.assign(Q, Yt6(Z, B)), Q
        }, "de_MessageStopEvent_event"),
        MU0 = h1(async (A, B) => {
            let Q = {
                ...A,
                body: await K8.parseJsonBody(A.body, B)
            };
            return TzB(Q, B)
        }, "de_ModelStreamErrorException_event"),
        yzB = h1(async (A, B) => {
            let Q = {
                ...A,
                body: await K8.parseJsonBody(A.body, B)
            };
            return PzB(Q, B)
        }, "de_ModelTimeoutException_event"),
        Ho6 = h1(async (A, B) => {
            let Q = {},
                Z = await K8.parseJsonBody(A.body, B);
            return Object.assign(Q, Wt6(Z, B)), Q
        }, "de_PayloadPart_event"),
        RU0 = h1(async (A, B) => {
            let Q = {
                ...A,
                body: await K8.parseJsonBody(A.body, B)
            };
            return SzB(Q, B)
        }, "de_ServiceUnavailableException_event"),
        OU0 = h1(async (A, B) => {
            let Q = {
                ...A,
                body: await K8.parseJsonBody(A.body, B)
            };
            return jzB(Q, B)
        }, "de_ThrottlingException_event"),
        TU0 = h1(async (A, B) => {
            let Q = {
                ...A,
                body: await K8.parseJsonBody(A.body, B)
            };
            return kzB(Q, B)
        }, "de_ValidationException_event"),
        zo6 = h1((A, B) => {
            return r1.take(A, {
                bytes: B.base64Encoder
            })
        }, "se_BidirectionalInputPayloadPart"),
        Eo6 = h1((A, B) => {
            return Bx1.visit(A, {
                cachePoint: h1((Q) => ({
                    cachePoint: r1._json(Q)
                }), "cachePoint"),
                document: h1((Q) => ({
                    document: _zB(Q, B)
                }), "document"),
                guardContent: h1((Q) => ({
                    guardContent: xzB(Q, B)
                }), "guardContent"),
                image: h1((Q) => ({
                    image: vzB(Q, B)
                }), "image"),
                reasoningContent: h1((Q) => ({
                    reasoningContent: So6(Q, B)
                }), "reasoningContent"),
                text: h1((Q) => ({
                    text: Q
                }), "text"),
                toolResult: h1((Q) => ({
                    toolResult: _o6(Q, B)
                }), "toolResult"),
                toolUse: h1((Q) => ({
                    toolUse: ho6(Q, B)
                }), "toolUse"),
                video: h1((Q) => ({
                    video: uzB(Q, B)
                }), "video"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_ContentBlock"),
        Uo6 = h1((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return Eo6(Q, B)
            })
        }, "se_ContentBlocks"),
        _zB = h1((A, B) => {
            return r1.take(A, {
                format: [],
                name: [],
                source: h1((Q) => wo6(Q, B), "source")
            })
        }, "se_DocumentBlock"),
        wo6 = h1((A, B) => {
            return a_1.visit(A, {
                bytes: h1((Q) => ({
                    bytes: B.base64Encoder(Q)
                }), "bytes"),
                s3Location: h1((Q) => ({
                    s3Location: r1._json(Q)
                }), "s3Location"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_DocumentSource"),
        $o6 = h1((A, B) => {
            return n_1.visit(A, {
                image: h1((Q) => ({
                    image: Mo6(Q, B)
                }), "image"),
                text: h1((Q) => ({
                    text: r1._json(Q)
                }), "text"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_GuardrailContentBlock"),
        qo6 = h1((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return $o6(Q, B)
            })
        }, "se_GuardrailContentBlockList"),
        xzB = h1((A, B) => {
            return r_1.visit(A, {
                image: h1((Q) => ({
                    image: No6(Q, B)
                }), "image"),
                text: h1((Q) => ({
                    text: r1._json(Q)
                }), "text"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_GuardrailConverseContentBlock"),
        No6 = h1((A, B) => {
            return r1.take(A, {
                format: [],
                source: h1((Q) => Lo6(Q, B), "source")
            })
        }, "se_GuardrailConverseImageBlock"),
        Lo6 = h1((A, B) => {
            return s_1.visit(A, {
                bytes: h1((Q) => ({
                    bytes: B.base64Encoder(Q)
                }), "bytes"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_GuardrailConverseImageSource"),
        Mo6 = h1((A, B) => {
            return r1.take(A, {
                format: [],
                source: h1((Q) => Ro6(Q, B), "source")
            })
        }, "se_GuardrailImageBlock"),
        Ro6 = h1((A, B) => {
            return i_1.visit(A, {
                bytes: h1((Q) => ({
                    bytes: B.base64Encoder(Q)
                }), "bytes"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_GuardrailImageSource"),
        vzB = h1((A, B) => {
            return r1.take(A, {
                format: [],
                source: h1((Q) => Oo6(Q, B), "source")
            })
        }, "se_ImageBlock"),
        Oo6 = h1((A, B) => {
            return o_1.visit(A, {
                bytes: h1((Q) => ({
                    bytes: B.base64Encoder(Q)
                }), "bytes"),
                s3Location: h1((Q) => ({
                    s3Location: r1._json(Q)
                }), "s3Location"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_ImageSource"),
        bzB = h1((A, B) => {
            return r1.take(A, {
                maxTokens: [],
                stopSequences: r1._json,
                temperature: r1.serializeFloat,
                topP: r1.serializeFloat
            })
        }, "se_InferenceConfiguration"),
        To6 = h1((A, B) => {
            return r1.take(A, {
                content: h1((Q) => Uo6(Q, B), "content"),
                role: []
            })
        }, "se_Message"),
        fzB = h1((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return To6(Q, B)
            })
        }, "se_Messages"),
        Po6 = h1((A, B) => {
            return A
        }, "se_ModelInputPayload"),
        So6 = h1((A, B) => {
            return t_1.visit(A, {
                reasoningText: h1((Q) => ({
                    reasoningText: r1._json(Q)
                }), "reasoningText"),
                redactedContent: h1((Q) => ({
                    redactedContent: B.base64Encoder(Q)
                }), "redactedContent"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_ReasoningContentBlock"),
        jo6 = h1((A, B) => {
            return Qx1.visit(A, {
                cachePoint: h1((Q) => ({
                    cachePoint: r1._json(Q)
                }), "cachePoint"),
                guardContent: h1((Q) => ({
                    guardContent: xzB(Q, B)
                }), "guardContent"),
                text: h1((Q) => ({
                    text: Q
                }), "text"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_SystemContentBlock"),
        hzB = h1((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return jo6(Q, B)
            })
        }, "se_SystemContentBlocks"),
        ko6 = h1((A, B) => {
            return Dx1.visit(A, {
                cachePoint: h1((Q) => ({
                    cachePoint: r1._json(Q)
                }), "cachePoint"),
                toolSpec: h1((Q) => ({
                    toolSpec: fo6(Q, B)
                }), "toolSpec"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_Tool"),
        gzB = h1((A, B) => {
            return r1.take(A, {
                toolChoice: r1._json,
                tools: h1((Q) => bo6(Q, B), "tools")
            })
        }, "se_ToolConfiguration"),
        yo6 = h1((A, B) => {
            return Zx1.visit(A, {
                json: h1((Q) => ({
                    json: vD1(Q, B)
                }), "json"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_ToolInputSchema"),
        _o6 = h1((A, B) => {
            return r1.take(A, {
                content: h1((Q) => vo6(Q, B), "content"),
                status: [],
                toolUseId: []
            })
        }, "se_ToolResultBlock"),
        xo6 = h1((A, B) => {
            return Ax1.visit(A, {
                document: h1((Q) => ({
                    document: _zB(Q, B)
                }), "document"),
                image: h1((Q) => ({
                    image: vzB(Q, B)
                }), "image"),
                json: h1((Q) => ({
                    json: vD1(Q, B)
                }), "json"),
                text: h1((Q) => ({
                    text: Q
                }), "text"),
                video: h1((Q) => ({
                    video: uzB(Q, B)
                }), "video"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_ToolResultContentBlock"),
        vo6 = h1((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return xo6(Q, B)
            })
        }, "se_ToolResultContentBlocks"),
        bo6 = h1((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return ko6(Q, B)
            })
        }, "se_Tools"),
        fo6 = h1((A, B) => {
            return r1.take(A, {
                description: [],
                inputSchema: h1((Q) => yo6(Q, B), "inputSchema"),
                name: []
            })
        }, "se_ToolSpecification"),
        ho6 = h1((A, B) => {
            return r1.take(A, {
                input: h1((Q) => vD1(Q, B), "input"),
                name: [],
                toolUseId: []
            })
        }, "se_ToolUseBlock"),
        uzB = h1((A, B) => {
            return r1.take(A, {
                format: [],
                source: h1((Q) => go6(Q, B), "source")
            })
        }, "se_VideoBlock"),
        go6 = h1((A, B) => {
            return e_1.visit(A, {
                bytes: h1((Q) => ({
                    bytes: B.base64Encoder(Q)
                }), "bytes"),
                s3Location: h1((Q) => ({
                    s3Location: r1._json(Q)
                }), "s3Location"),
                _: h1((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_VideoSource"),
        vD1 = h1((A, B) => {
            return A
        }, "se_Document"),
        uo6 = h1((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return mo6(Z, B)
            })
        }, "de_AsyncInvokeSummaries"),
        mo6 = h1((A, B) => {
            return r1.take(A, {
                clientRequestToken: r1.expectString,
                endTime: h1((Q) => r1.expectNonNull(r1.parseRfc3339DateTimeWithOffset(Q)), "endTime"),
                failureMessage: r1.expectString,
                invocationArn: r1.expectString,
                lastModifiedTime: h1((Q) => r1.expectNonNull(r1.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
                modelArn: r1.expectString,
                outputDataConfig: h1((Q) => r1._json(K8.awsExpectUnion(Q)), "outputDataConfig"),
                status: r1.expectString,
                submitTime: h1((Q) => r1.expectNonNull(r1.parseRfc3339DateTimeWithOffset(Q)), "submitTime")
            })
        }, "de_AsyncInvokeSummary"),
        do6 = h1((A, B) => {
            return r1.take(A, {
                bytes: B.base64Decoder
            })
        }, "de_BidirectionalOutputPayloadPart"),
        co6 = h1((A, B) => {
            if (A.cachePoint != null) return {
                cachePoint: r1._json(A.cachePoint)
            };
            if (A.document != null) return {
                document: mzB(A.document, B)
            };
            if (A.guardContent != null) return {
                guardContent: Zt6(K8.awsExpectUnion(A.guardContent), B)
            };
            if (A.image != null) return {
                image: pzB(A.image, B)
            };
            if (A.reasoningContent != null) return {
                reasoningContent: Jt6(K8.awsExpectUnion(A.reasoningContent), B)
            };
            if (r1.expectString(A.text) !== void 0) return {
                text: r1.expectString(A.text)
            };
            if (A.toolResult != null) return {
                toolResult: Vt6(A.toolResult, B)
            };
            if (A.toolUse != null) return {
                toolUse: Ht6(A.toolUse, B)
            };
            if (A.video != null) return {
                video: izB(A.video, B)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_ContentBlock"),
        lo6 = h1((A, B) => {
            if (A.reasoningContent != null) return {
                reasoningContent: Xt6(K8.awsExpectUnion(A.reasoningContent), B)
            };
            if (r1.expectString(A.text) !== void 0) return {
                text: r1.expectString(A.text)
            };
            if (A.toolUse != null) return {
                toolUse: r1._json(A.toolUse)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_ContentBlockDelta"),
        po6 = h1((A, B) => {
            return r1.take(A, {
                contentBlockIndex: r1.expectInt32,
                delta: h1((Q) => lo6(K8.awsExpectUnion(Q), B), "delta")
            })
        }, "de_ContentBlockDeltaEvent"),
        io6 = h1((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return co6(K8.awsExpectUnion(Z), B)
            })
        }, "de_ContentBlocks"),
        no6 = h1((A, B) => {
            if (A.message != null) return {
                message: It6(A.message, B)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_ConverseOutput"),
        ao6 = h1((A, B) => {
            return r1.take(A, {
                metrics: r1._json,
                performanceConfig: r1._json,
                trace: h1((Q) => so6(Q, B), "trace"),
                usage: r1._json
            })
        }, "de_ConverseStreamMetadataEvent"),
        so6 = h1((A, B) => {
            return r1.take(A, {
                guardrail: h1((Q) => lzB(Q, B), "guardrail"),
                promptRouter: r1._json
            })
        }, "de_ConverseStreamTrace"),
        ro6 = h1((A, B) => {
            return r1.take(A, {
                guardrail: h1((Q) => lzB(Q, B), "guardrail"),
                promptRouter: r1._json
            })
        }, "de_ConverseTrace"),
        mzB = h1((A, B) => {
            return r1.take(A, {
                format: r1.expectString,
                name: r1.expectString,
                source: h1((Q) => oo6(K8.awsExpectUnion(Q), B), "source")
            })
        }, "de_DocumentBlock"),
        oo6 = h1((A, B) => {
            if (A.bytes != null) return {
                bytes: B.base64Decoder(A.bytes)
            };
            if (A.s3Location != null) return {
                s3Location: r1._json(A.s3Location)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_DocumentSource"),
        dzB = h1((A, B) => {
            return r1.take(A, {
                contentPolicy: r1._json,
                contextualGroundingPolicy: h1((Q) => Qt6(Q, B), "contextualGroundingPolicy"),
                invocationMetrics: r1._json,
                sensitiveInformationPolicy: r1._json,
                topicPolicy: r1._json,
                wordPolicy: r1._json
            })
        }, "de_GuardrailAssessment"),
        czB = h1((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return dzB(Z, B)
            })
        }, "de_GuardrailAssessmentList"),
        to6 = h1((A, B) => {
            return Object.entries(A).reduce((Q, [Z, D]) => {
                if (D === null) return Q;
                return Q[Z] = czB(D, B), Q
            }, {})
        }, "de_GuardrailAssessmentListMap"),
        eo6 = h1((A, B) => {
            return Object.entries(A).reduce((Q, [Z, D]) => {
                if (D === null) return Q;
                return Q[Z] = dzB(D, B), Q
            }, {})
        }, "de_GuardrailAssessmentMap"),
        At6 = h1((A, B) => {
            return r1.take(A, {
                action: r1.expectString,
                detected: r1.expectBoolean,
                score: r1.limitedParseDouble,
                threshold: r1.limitedParseDouble,
                type: r1.expectString
            })
        }, "de_GuardrailContextualGroundingFilter"),
        Bt6 = h1((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return At6(Z, B)
            })
        }, "de_GuardrailContextualGroundingFilters"),
        Qt6 = h1((A, B) => {
            return r1.take(A, {
                filters: h1((Q) => Bt6(Q, B), "filters")
            })
        }, "de_GuardrailContextualGroundingPolicyAssessment"),
        Zt6 = h1((A, B) => {
            if (A.image != null) return {
                image: Dt6(A.image, B)
            };
            if (A.text != null) return {
                text: r1._json(A.text)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_GuardrailConverseContentBlock"),
        Dt6 = h1((A, B) => {
            return r1.take(A, {
                format: r1.expectString,
                source: h1((Q) => Gt6(K8.awsExpectUnion(Q), B), "source")
            })
        }, "de_GuardrailConverseImageBlock"),
        Gt6 = h1((A, B) => {
            if (A.bytes != null) return {
                bytes: B.base64Decoder(A.bytes)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_GuardrailConverseImageSource"),
        lzB = h1((A, B) => {
            return r1.take(A, {
                actionReason: r1.expectString,
                inputAssessment: h1((Q) => eo6(Q, B), "inputAssessment"),
                modelOutput: r1._json,
                outputAssessments: h1((Q) => to6(Q, B), "outputAssessments")
            })
        }, "de_GuardrailTraceAssessment"),
        pzB = h1((A, B) => {
            return r1.take(A, {
                format: r1.expectString,
                source: h1((Q) => Ft6(K8.awsExpectUnion(Q), B), "source")
            })
        }, "de_ImageBlock"),
        Ft6 = h1((A, B) => {
            if (A.bytes != null) return {
                bytes: B.base64Decoder(A.bytes)
            };
            if (A.s3Location != null) return {
                s3Location: r1._json(A.s3Location)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_ImageSource"),
        It6 = h1((A, B) => {
            return r1.take(A, {
                content: h1((Q) => io6(Q, B), "content"),
                role: r1.expectString
            })
        }, "de_Message"),
        Yt6 = h1((A, B) => {
            return r1.take(A, {
                additionalModelResponseFields: h1((Q) => Yx1(Q, B), "additionalModelResponseFields"),
                stopReason: r1.expectString
            })
        }, "de_MessageStopEvent"),
        Wt6 = h1((A, B) => {
            return r1.take(A, {
                bytes: B.base64Decoder
            })
        }, "de_PayloadPart"),
        Jt6 = h1((A, B) => {
            if (A.reasoningText != null) return {
                reasoningText: r1._json(A.reasoningText)
            };
            if (A.redactedContent != null) return {
                redactedContent: B.base64Decoder(A.redactedContent)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_ReasoningContentBlock"),
        Xt6 = h1((A, B) => {
            if (A.redactedContent != null) return {
                redactedContent: B.base64Decoder(A.redactedContent)
            };
            if (r1.expectString(A.signature) !== void 0) return {
                signature: r1.expectString(A.signature)
            };
            if (r1.expectString(A.text) !== void 0) return {
                text: r1.expectString(A.text)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_ReasoningContentBlockDelta"),
        Vt6 = h1((A, B) => {
            return r1.take(A, {
                content: h1((Q) => Kt6(Q, B), "content"),
                status: r1.expectString,
                toolUseId: r1.expectString
            })
        }, "de_ToolResultBlock"),
        Ct6 = h1((A, B) => {
            if (A.document != null) return {
                document: mzB(A.document, B)
            };
            if (A.image != null) return {
                image: pzB(A.image, B)
            };
            if (A.json != null) return {
                json: Yx1(A.json, B)
            };
            if (r1.expectString(A.text) !== void 0) return {
                text: r1.expectString(A.text)
            };
            if (A.video != null) return {
                video: izB(A.video, B)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_ToolResultContentBlock"),
        Kt6 = h1((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return Ct6(K8.awsExpectUnion(Z), B)
            })
        }, "de_ToolResultContentBlocks"),
        Ht6 = h1((A, B) => {
            return r1.take(A, {
                input: h1((Q) => Yx1(Q, B), "input"),
                name: r1.expectString,
                toolUseId: r1.expectString
            })
        }, "de_ToolUseBlock"),
        izB = h1((A, B) => {
            return r1.take(A, {
                format: r1.expectString,
                source: h1((Q) => zt6(K8.awsExpectUnion(Q), B), "source")
            })
        }, "de_VideoBlock"),
        zt6 = h1((A, B) => {
            if (A.bytes != null) return {
                bytes: B.base64Decoder(A.bytes)
            };
            if (A.s3Location != null) return {
                s3Location: r1._json(A.s3Location)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_VideoSource"),
        Yx1 = h1((A, B) => {
            return A
        }, "de_Document"),
        EG = h1((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        wU0 = "accept",
        Wx1 = "contentType",
        PU0 = "content-type",
        nzB = "guardrailIdentifier",
        azB = "guardrailVersion",
        gHB = "maxResults",
        uHB = "nextToken",
        Jx1 = "performanceConfigLatency",
        mHB = "sortBy",
        dHB = "statusEquals",
        cHB = "sortOrder",
        lHB = "submitTimeAfter",
        pHB = "submitTimeBefore",
        szB = "trace",
        Et6 = "x-amzn-bedrock-accept",
        Ut6 = "x-amzn-bedrock-content-type",
        rzB = "x-amzn-bedrock-guardrailidentifier",
        ozB = "x-amzn-bedrock-guardrailversion",
        Xx1 = "x-amzn-bedrock-performanceconfig-latency",
        tzB = "x-amzn-bedrock-trace",
        ezB = class extends r1.Command.classBuilder().ep(BS).m(function(A, B, Q, Z) {
            return [QS.getSerdePlugin(Q, this.serialize, this.deserialize), hM.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockFrontendService", "ApplyGuardrail", {}).n("BedrockRuntimeClient", "ApplyGuardrailCommand").f(XzB, void 0).ser(yr6).de(mr6).build() {
            static {
                h1(this, "ApplyGuardrailCommand")
            }
        },
        AEB = class extends r1.Command.classBuilder().ep(BS).m(function(A, B, Q, Z) {
            return [QS.getSerdePlugin(Q, this.serialize, this.deserialize), hM.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockFrontendService", "Converse", {}).n("BedrockRuntimeClient", "ConverseCommand").f(CzB, HzB).ser(_r6).de(dr6).build() {
            static {
                h1(this, "ConverseCommand")
            }
        },
        BEB = class extends r1.Command.classBuilder().ep(BS).m(function(A, B, Q, Z) {
            return [QS.getSerdePlugin(Q, this.serialize, this.deserialize), hM.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockFrontendService", "ConverseStream", {
            eventStream: {
                output: !0
            }
        }).n("BedrockRuntimeClient", "ConverseStreamCommand").f(zzB, wzB).ser(xr6).de(cr6).build() {
            static {
                h1(this, "ConverseStreamCommand")
            }
        },
        QEB = class extends r1.Command.classBuilder().ep(BS).m(function(A, B, Q, Z) {
            return [QS.getSerdePlugin(Q, this.serialize, this.deserialize), hM.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockFrontendService", "GetAsyncInvoke", {}).n("BedrockRuntimeClient", "GetAsyncInvokeCommand").f(void 0, FzB).ser(vr6).de(lr6).build() {
            static {
                h1(this, "GetAsyncInvokeCommand")
            }
        },
        ZEB = class extends r1.Command.classBuilder().ep(BS).m(function(A, B, Q, Z) {
            return [QS.getSerdePlugin(Q, this.serialize, this.deserialize), hM.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockFrontendService", "InvokeModel", {}).n("BedrockRuntimeClient", "InvokeModelCommand").f($zB, qzB).ser(br6).de(pr6).build() {
            static {
                h1(this, "InvokeModelCommand")
            }
        },
        DEB = class extends r1.Command.classBuilder().ep(BS).m(function(A, B, Q, Z) {
            return [QS.getSerdePlugin(Q, this.serialize, this.deserialize), hM.getEndpointPlugin(Q, A.getEndpointParameterInstructions()), nHB.getEventStreamPlugin(Q)]
        }).s("AmazonBedrockFrontendService", "InvokeModelWithBidirectionalStream", {
            eventStream: {
                input: !0,
                output: !0
            }
        }).n("BedrockRuntimeClient", "InvokeModelWithBidirectionalStreamCommand").f(NzB, LzB).ser(fr6).de(ir6).build() {
            static {
                h1(this, "InvokeModelWithBidirectionalStreamCommand")
            }
        },
        GEB = class extends r1.Command.classBuilder().ep(BS).m(function(A, B, Q, Z) {
            return [QS.getSerdePlugin(Q, this.serialize, this.deserialize), hM.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockFrontendService", "InvokeModelWithResponseStream", {
            eventStream: {
                output: !0
            }
        }).n("BedrockRuntimeClient", "InvokeModelWithResponseStreamCommand").f(MzB, RzB).ser(hr6).de(nr6).build() {
            static {
                h1(this, "InvokeModelWithResponseStreamCommand")
            }
        },
        SU0 = class extends r1.Command.classBuilder().ep(BS).m(function(A, B, Q, Z) {
            return [QS.getSerdePlugin(Q, this.serialize, this.deserialize), hM.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockFrontendService", "ListAsyncInvokes", {}).n("BedrockRuntimeClient", "ListAsyncInvokesCommand").f(void 0, YzB).ser(gr6).de(ar6).build() {
            static {
                h1(this, "ListAsyncInvokesCommand")
            }
        },
        FEB = class extends r1.Command.classBuilder().ep(BS).m(function(A, B, Q, Z) {
            return [QS.getSerdePlugin(Q, this.serialize, this.deserialize), hM.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockFrontendService", "StartAsyncInvoke", {}).n("BedrockRuntimeClient", "StartAsyncInvokeCommand").f(WzB, void 0).ser(ur6).de(sr6).build() {
            static {
                h1(this, "StartAsyncInvokeCommand")
            }
        },
        wt6 = {
            ApplyGuardrailCommand: ezB,
            ConverseCommand: AEB,
            ConverseStreamCommand: BEB,
            GetAsyncInvokeCommand: QEB,
            InvokeModelCommand: ZEB,
            InvokeModelWithBidirectionalStreamCommand: DEB,
            InvokeModelWithResponseStreamCommand: GEB,
            ListAsyncInvokesCommand: SU0,
            StartAsyncInvokeCommand: FEB
        },
        IEB = class extends $U0 {
            static {
                h1(this, "BedrockRuntime")
            }
        };
    r1.createAggregatedClient(wt6, IEB);
    var $t6 = aK.createPaginator($U0, SU0, "nextToken", "nextToken", "maxResults")
});