/* chunk:87 bytes:[1965837, 2191651) size:225814 source:unpacked-cli.js */
var dJA = E((b25, mJA) => {
    var {
        defineProperty: oH1,
        getOwnPropertyDescriptor: A5Q,
        getOwnPropertyNames: B5Q
    } = Object, Q5Q = Object.prototype.hasOwnProperty, n = (A, B) => oH1(A, "name", {
        value: B,
        configurable: !0
    }), Z5Q = (A, B) => {
        for (var Q in B) oH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, D5Q = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of B5Q(B))
                if (!Q5Q.call(A, D) && D !== Q) oH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = A5Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, G5Q = (A) => D5Q(oH1({}, "__esModule", {
        value: !0
    }), A), AYA = {};
    Z5Q(AYA, {
        AccessDeniedException: () => BYA,
        AgreementStatus: () => H5Q,
        ApplicationType: () => N5Q,
        AttributeType: () => T5Q,
        AuthorizationStatus: () => J3Q,
        AutomatedEvaluationConfigFilterSensitiveLog: () => $YA,
        AutomatedEvaluationCustomMetricConfigFilterSensitiveLog: () => UYA,
        AutomatedEvaluationCustomMetricSource: () => lH1,
        AutomatedEvaluationCustomMetricSourceFilterSensitiveLog: () => EYA,
        BatchDeleteEvaluationJobCommand: () => uWA,
        BatchDeleteEvaluationJobErrorFilterSensitiveLog: () => KYA,
        BatchDeleteEvaluationJobItemFilterSensitiveLog: () => HYA,
        BatchDeleteEvaluationJobRequestFilterSensitiveLog: () => CYA,
        BatchDeleteEvaluationJobResponseFilterSensitiveLog: () => zYA,
        Bedrock: () => uJA,
        BedrockClient: () => wV,
        BedrockServiceException: () => ww,
        ByteContentDocFilterSensitiveLog: () => TYA,
        CommitmentDuration: () => I3Q,
        ConflictException: () => FYA,
        CreateCustomModelCommand: () => mWA,
        CreateEvaluationJobCommand: () => dWA,
        CreateEvaluationJobRequestFilterSensitiveLog: () => TWA,
        CreateFoundationModelAgreementCommand: () => cWA,
        CreateGuardrailCommand: () => lWA,
        CreateGuardrailRequestFilterSensitiveLog: () => pYA,
        CreateGuardrailVersionCommand: () => pWA,
        CreateGuardrailVersionRequestFilterSensitiveLog: () => iYA,
        CreateInferenceProfileCommand: () => iWA,
        CreateInferenceProfileRequestFilterSensitiveLog: () => YWA,
        CreateMarketplaceModelEndpointCommand: () => nWA,
        CreateModelCopyJobCommand: () => aWA,
        CreateModelCustomizationJobCommand: () => sWA,
        CreateModelCustomizationJobRequestFilterSensitiveLog: () => wWA,
        CreateModelImportJobCommand: () => rWA,
        CreateModelInvocationJobCommand: () => oWA,
        CreatePromptRouterCommand: () => tWA,
        CreatePromptRouterRequestFilterSensitiveLog: () => HWA,
        CreateProvisionedModelThroughputCommand: () => eWA,
        CustomMetricDefinitionFilterSensitiveLog: () => X3Q,
        CustomizationConfig: () => Xo1,
        CustomizationType: () => E5Q,
        DeleteCustomModelCommand: () => AJA,
        DeleteFoundationModelAgreementCommand: () => BJA,
        DeleteGuardrailCommand: () => QJA,
        DeleteImportedModelCommand: () => ZJA,
        DeleteInferenceProfileCommand: () => DJA,
        DeleteMarketplaceModelEndpointCommand: () => GJA,
        DeleteModelInvocationLoggingConfigurationCommand: () => FJA,
        DeletePromptRouterCommand: () => IJA,
        DeleteProvisionedModelThroughputCommand: () => YJA,
        DeregisterMarketplaceModelEndpointCommand: () => WJA,
        EndpointConfig: () => Wo1,
        EntitlementAvailability: () => C3Q,
        EvaluationBedrockModelFilterSensitiveLog: () => MYA,
        EvaluationConfig: () => pH1,
        EvaluationConfigFilterSensitiveLog: () => Ro1,
        EvaluationDatasetFilterSensitiveLog: () => wYA,
        EvaluationDatasetLocation: () => Ko1,
        EvaluationDatasetMetricConfigFilterSensitiveLog: () => Mo1,
        EvaluationInferenceConfig: () => sH1,
        EvaluationInferenceConfigFilterSensitiveLog: () => yo1,
        EvaluationJobStatus: () => q5Q,
        EvaluationJobType: () => y5Q,
        EvaluationModelConfig: () => zo1,
        EvaluationModelConfigFilterSensitiveLog: () => RYA,
        EvaluationPrecomputedRagSourceConfig: () => Uo1,
        EvaluationTaskType: () => L5Q,
        EvaluatorModelConfig: () => Ho1,
        ExternalSourceFilterSensitiveLog: () => PYA,
        ExternalSourceType: () => R5Q,
        ExternalSourcesGenerationConfigurationFilterSensitiveLog: () => OYA,
        ExternalSourcesRetrieveAndGenerateConfigurationFilterSensitiveLog: () => SYA,
        FineTuningJobStatus: () => U3Q,
        FoundationModelLifecycleStatus: () => D3Q,
        GenerationConfigurationFilterSensitiveLog: () => jYA,
        GetCustomModelCommand: () => JJA,
        GetCustomModelResponseFilterSensitiveLog: () => VYA,
        GetEvaluationJobCommand: () => XJA,
        GetEvaluationJobRequestFilterSensitiveLog: () => bYA,
        GetEvaluationJobResponseFilterSensitiveLog: () => PWA,
        GetFoundationModelAvailabilityCommand: () => VJA,
        GetFoundationModelCommand: () => CJA,
        GetGuardrailCommand: () => KJA,
        GetGuardrailResponseFilterSensitiveLog: () => DWA,
        GetImportedModelCommand: () => HJA,
        GetInferenceProfileCommand: () => zJA,
        GetInferenceProfileResponseFilterSensitiveLog: () => WWA,
        GetMarketplaceModelEndpointCommand: () => EJA,
        GetModelCopyJobCommand: () => UJA,
        GetModelCustomizationJobCommand: () => wJA,
        GetModelCustomizationJobResponseFilterSensitiveLog: () => $WA,
        GetModelImportJobCommand: () => $JA,
        GetModelInvocationJobCommand: () => qJA,
        GetModelInvocationJobResponseFilterSensitiveLog: () => VWA,
        GetModelInvocationLoggingConfigurationCommand: () => NJA,
        GetPromptRouterCommand: () => LJA,
        GetPromptRouterResponseFilterSensitiveLog: () => zWA,
        GetProvisionedModelThroughputCommand: () => MJA,
        GetUseCaseForModelAccessCommand: () => RJA,
        GuardrailContentFilterAction: () => x5Q,
        GuardrailContentFilterConfigFilterSensitiveLog: () => hYA,
        GuardrailContentFilterFilterSensitiveLog: () => nYA,
        GuardrailContentFilterType: () => f5Q,
        GuardrailContentFiltersTierConfigFilterSensitiveLog: () => gYA,
        GuardrailContentFiltersTierFilterSensitiveLog: () => aYA,
        GuardrailContentFiltersTierName: () => h5Q,
        GuardrailContentPolicyConfigFilterSensitiveLog: () => To1,
        GuardrailContentPolicyFilterSensitiveLog: () => sYA,
        GuardrailContextualGroundingAction: () => g5Q,
        GuardrailContextualGroundingFilterConfigFilterSensitiveLog: () => uYA,
        GuardrailContextualGroundingFilterFilterSensitiveLog: () => rYA,
        GuardrailContextualGroundingFilterType: () => u5Q,
        GuardrailContextualGroundingPolicyConfigFilterSensitiveLog: () => Po1,
        GuardrailContextualGroundingPolicyFilterSensitiveLog: () => oYA,
        GuardrailFilterStrength: () => b5Q,
        GuardrailManagedWordsConfigFilterSensitiveLog: () => cYA,
        GuardrailManagedWordsFilterSensitiveLog: () => BWA,
        GuardrailManagedWordsType: () => n5Q,
        GuardrailModality: () => v5Q,
        GuardrailPiiEntityType: () => d5Q,
        GuardrailSensitiveInformationAction: () => m5Q,
        GuardrailStatus: () => a5Q,
        GuardrailSummaryFilterSensitiveLog: () => GWA,
        GuardrailTopicAction: () => l5Q,
        GuardrailTopicConfigFilterSensitiveLog: () => dYA,
        GuardrailTopicFilterSensitiveLog: () => eYA,
        GuardrailTopicPolicyConfigFilterSensitiveLog: () => So1,
        GuardrailTopicPolicyFilterSensitiveLog: () => AWA,
        GuardrailTopicType: () => p5Q,
        GuardrailTopicsTierConfigFilterSensitiveLog: () => mYA,
        GuardrailTopicsTierFilterSensitiveLog: () => tYA,
        GuardrailTopicsTierName: () => c5Q,
        GuardrailWordAction: () => i5Q,
        GuardrailWordConfigFilterSensitiveLog: () => lYA,
        GuardrailWordFilterSensitiveLog: () => QWA,
        GuardrailWordPolicyConfigFilterSensitiveLog: () => jo1,
        GuardrailWordPolicyFilterSensitiveLog: () => ZWA,
        HumanEvaluationConfigFilterSensitiveLog: () => LYA,
        HumanEvaluationCustomMetricFilterSensitiveLog: () => qYA,
        HumanWorkflowConfigFilterSensitiveLog: () => NYA,
        ImplicitFilterConfigurationFilterSensitiveLog: () => kYA,
        InferenceProfileModelSource: () => wo1,
        InferenceProfileStatus: () => s5Q,
        InferenceProfileSummaryFilterSensitiveLog: () => JWA,
        InferenceProfileType: () => r5Q,
        InferenceType: () => Q3Q,
        InternalServerException: () => QYA,
        InvocationLogSource: () => Vo1,
        InvocationLogsConfigFilterSensitiveLog: () => XYA,
        JobStatusDetails: () => E3Q,
        KnowledgeBaseConfig: () => nH1,
        KnowledgeBaseConfigFilterSensitiveLog: () => RWA,
        KnowledgeBaseRetrievalConfigurationFilterSensitiveLog: () => ko1,
        KnowledgeBaseRetrieveAndGenerateConfigurationFilterSensitiveLog: () => NWA,
        KnowledgeBaseVectorSearchConfigurationFilterSensitiveLog: () => qWA,
        ListCustomModelsCommand: () => vo1,
        ListEvaluationJobsCommand: () => bo1,
        ListFoundationModelAgreementOffersCommand: () => OJA,
        ListFoundationModelsCommand: () => TJA,
        ListGuardrailsCommand: () => fo1,
        ListGuardrailsResponseFilterSensitiveLog: () => FWA,
        ListImportedModelsCommand: () => ho1,
        ListInferenceProfilesCommand: () => go1,
        ListInferenceProfilesResponseFilterSensitiveLog: () => XWA,
        ListMarketplaceModelEndpointsCommand: () => uo1,
        ListModelCopyJobsCommand: () => mo1,
        ListModelCustomizationJobsCommand: () => do1,
        ListModelImportJobsCommand: () => co1,
        ListModelInvocationJobsCommand: () => lo1,
        ListModelInvocationJobsResponseFilterSensitiveLog: () => KWA,
        ListPromptRoutersCommand: () => po1,
        ListPromptRoutersResponseFilterSensitiveLog: () => UWA,
        ListProvisionedModelThroughputsCommand: () => io1,
        ListTagsForResourceCommand: () => PJA,
        MetadataAttributeSchemaFilterSensitiveLog: () => V3Q,
        MetadataConfigurationForRerankingFilterSensitiveLog: () => _YA,
        ModelCopyJobStatus: () => o5Q,
        ModelCustomization: () => B3Q,
        ModelCustomizationJobStatus: () => z3Q,
        ModelDataSource: () => Jo1,
        ModelImportJobStatus: () => t5Q,
        ModelInvocationJobInputDataConfig: () => $o1,
        ModelInvocationJobOutputDataConfig: () => qo1,
        ModelInvocationJobStatus: () => A3Q,
        ModelInvocationJobSummaryFilterSensitiveLog: () => CWA,
        ModelModality: () => Z3Q,
        ModelStatus: () => U5Q,
        OfferType: () => H3Q,
        PerformanceConfigLatency: () => M5Q,
        PromptRouterStatus: () => G3Q,
        PromptRouterSummaryFilterSensitiveLog: () => EWA,
        PromptRouterType: () => F3Q,
        PromptTemplateFilterSensitiveLog: () => Oo1,
        ProvisionedModelStatus: () => Y3Q,
        PutModelInvocationLoggingConfigurationCommand: () => SJA,
        PutUseCaseForModelAccessCommand: () => jJA,
        QueryTransformationType: () => O5Q,
        RAGConfig: () => aH1,
        RAGConfigFilterSensitiveLog: () => OWA,
        RatingScaleItemValue: () => cH1,
        RegionAvailability: () => K3Q,
        RegisterMarketplaceModelEndpointCommand: () => kJA,
        RequestMetadataBaseFiltersFilterSensitiveLog: () => No1,
        RequestMetadataFilters: () => Co1,
        RequestMetadataFiltersFilterSensitiveLog: () => JYA,
        RerankingMetadataSelectionMode: () => S5Q,
        RerankingMetadataSelectiveModeConfiguration: () => Eo1,
        RerankingMetadataSelectiveModeConfigurationFilterSensitiveLog: () => yYA,
        ResourceNotFoundException: () => ZYA,
        RetrievalFilter: () => iH1,
        RetrievalFilterFilterSensitiveLog: () => w3Q,
        RetrieveAndGenerateConfigurationFilterSensitiveLog: () => MWA,
        RetrieveAndGenerateType: () => k5Q,
        RetrieveConfigFilterSensitiveLog: () => LWA,
        S3InputFormat: () => e5Q,
        SearchType: () => P5Q,
        ServiceQuotaExceededException: () => IYA,
        ServiceUnavailableException: () => YYA,
        SortByProvisionedModels: () => W3Q,
        SortJobsBy: () => _5Q,
        SortModelsBy: () => w5Q,
        SortOrder: () => $5Q,
        Status: () => z5Q,
        StopEvaluationJobCommand: () => yJA,
        StopEvaluationJobRequestFilterSensitiveLog: () => fYA,
        StopModelCustomizationJobCommand: () => _JA,
        StopModelInvocationJobCommand: () => xJA,
        TagResourceCommand: () => vJA,
        ThrottlingException: () => DYA,
        TooManyTagsException: () => WYA,
        TrainingDataConfigFilterSensitiveLog: () => tH1,
        UntagResourceCommand: () => bJA,
        UpdateGuardrailCommand: () => fJA,
        UpdateGuardrailRequestFilterSensitiveLog: () => IWA,
        UpdateMarketplaceModelEndpointCommand: () => hJA,
        UpdateProvisionedModelThroughputCommand: () => gJA,
        ValidationException: () => GYA,
        VectorSearchBedrockRerankingConfigurationFilterSensitiveLog: () => xYA,
        VectorSearchRerankingConfigurationFilterSensitiveLog: () => vYA,
        VectorSearchRerankingConfigurationType: () => j5Q,
        __Client: () => x.Client,
        paginateListCustomModels: () => lGQ,
        paginateListEvaluationJobs: () => pGQ,
        paginateListGuardrails: () => iGQ,
        paginateListImportedModels: () => nGQ,
        paginateListInferenceProfiles: () => aGQ,
        paginateListMarketplaceModelEndpoints: () => sGQ,
        paginateListModelCopyJobs: () => rGQ,
        paginateListModelCustomizationJobs: () => oGQ,
        paginateListModelImportJobs: () => tGQ,
        paginateListModelInvocationJobs: () => eGQ,
        paginateListPromptRouters: () => AFQ,
        paginateListProvisionedModelThroughputs: () => BFQ
    });
    mJA.exports = G5Q(AYA);
    var jIA = W91(),
        F5Q = J91(),
        I5Q = X91(),
        kIA = Bi(),
        Y5Q = z4(),
        L2 = HB(),
        W5Q = hG(),
        wB = T6(),
        yIA = u4(),
        _IA = js1(),
        J5Q = n((A) => {
            return Object.assign(A, {
                useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
                useFipsEndpoint: A.useFipsEndpoint ?? !1,
                defaultSigningName: "bedrock"
            })
        }, "resolveClientEndpointParameters"),
        OB = {
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
        X5Q = SIA(),
        xIA = m91(),
        vIA = CV(),
        x = V6(),
        V5Q = n((A) => {
            let {
                httpAuthSchemes: B,
                httpAuthSchemeProvider: Q,
                credentials: Z,
                token: D
            } = A;
            return {
                setHttpAuthScheme(G) {
                    let F = B.findIndex((I) => I.schemeId === G.schemeId);
                    if (F === -1) B.push(G);
                    else B.splice(F, 1, G)
                },
                httpAuthSchemes() {
                    return B
                },
                setHttpAuthSchemeProvider(G) {
                    Q = G
                },
                httpAuthSchemeProvider() {
                    return Q
                },
                setCredentials(G) {
                    Z = G
                },
                credentials() {
                    return Z
                },
                setToken(G) {
                    D = G
                },
                token() {
                    return D
                }
            }
        }, "getHttpAuthExtensionConfiguration"),
        C5Q = n((A) => {
            return {
                httpAuthSchemes: A.httpAuthSchemes(),
                httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
                credentials: A.credentials(),
                token: A.token()
            }
        }, "resolveHttpAuthRuntimeConfig"),
        K5Q = n((A, B) => {
            let Q = Object.assign(xIA.getAwsRegionExtensionConfiguration(A), x.getDefaultExtensionConfiguration(A), vIA.getHttpHandlerExtensionConfiguration(A), V5Q(A));
            return B.forEach((Z) => Z.configure(Q)), Object.assign(A, xIA.resolveAwsRegionExtensionConfiguration(Q), x.resolveDefaultRuntimeConfig(Q), vIA.resolveHttpHandlerRuntimeConfig(Q), C5Q(Q))
        }, "resolveRuntimeExtensions"),
        wV = class extends x.Client {
            static {
                n(this, "BedrockClient")
            }
            config;
            constructor(...[A]) {
                let B = X5Q.getRuntimeConfig(A || {});
                super(B);
                this.initConfig = B;
                let Q = J5Q(B),
                    Z = kIA.resolveUserAgentConfig(Q),
                    D = yIA.resolveRetryConfig(Z),
                    G = Y5Q.resolveRegionConfig(D),
                    F = jIA.resolveHostHeaderConfig(G),
                    I = wB.resolveEndpointConfig(F),
                    Y = _IA.resolveHttpAuthSchemeConfig(I),
                    W = K5Q(Y, A?.extensions || []);
                this.config = W, this.middlewareStack.use(kIA.getUserAgentPlugin(this.config)), this.middlewareStack.use(yIA.getRetryPlugin(this.config)), this.middlewareStack.use(W5Q.getContentLengthPlugin(this.config)), this.middlewareStack.use(jIA.getHostHeaderPlugin(this.config)), this.middlewareStack.use(F5Q.getLoggerPlugin(this.config)), this.middlewareStack.use(I5Q.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(L2.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
                    httpAuthSchemeParametersProvider: _IA.defaultBedrockHttpAuthSchemeParametersProvider,
                    identityProviderConfigProvider: n(async (J) => new L2.DefaultIdentityProviderConfig({
                        "aws.auth#sigv4": J.credentials,
                        "smithy.api#httpBearerAuth": J.token
                    }), "identityProviderConfigProvider")
                })), this.middlewareStack.use(L2.getHttpSigningPlugin(this.config))
            }
            destroy() {
                super.destroy()
            }
        },
        TB = y3(),
        ww = class A extends x.ServiceException {
            static {
                n(this, "BedrockServiceException")
            }
            constructor(B) {
                super(B);
                Object.setPrototypeOf(this, A.prototype)
            }
        },
        BYA = class A extends ww {
            static {
                n(this, "AccessDeniedException")
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
        H5Q = {
            AVAILABLE: "AVAILABLE",
            ERROR: "ERROR",
            NOT_AVAILABLE: "NOT_AVAILABLE",
            PENDING: "PENDING"
        },
        QYA = class A extends ww {
            static {
                n(this, "InternalServerException")
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
        ZYA = class A extends ww {
            static {
                n(this, "ResourceNotFoundException")
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
        DYA = class A extends ww {
            static {
                n(this, "ThrottlingException")
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
        GYA = class A extends ww {
            static {
                n(this, "ValidationException")
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
        FYA = class A extends ww {
            static {
                n(this, "ConflictException")
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
        Wo1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.sageMaker !== void 0) return Q.sageMaker(B.sageMaker);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Wo1 || (Wo1 = {}));
    var z5Q = {
            INCOMPATIBLE_ENDPOINT: "INCOMPATIBLE_ENDPOINT",
            REGISTERED: "REGISTERED"
        },
        IYA = class A extends ww {
            static {
                n(this, "ServiceQuotaExceededException")
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
        YYA = class A extends ww {
            static {
                n(this, "ServiceUnavailableException")
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
        Jo1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.s3DataSource !== void 0) return Q.s3DataSource(B.s3DataSource);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Jo1 || (Jo1 = {}));
    var WYA = class A extends ww {
            static {
                n(this, "TooManyTagsException")
            }
            name = "TooManyTagsException";
            $fault = "client";
            resourceName;
            constructor(B) {
                super({
                    name: "TooManyTagsException",
                    $fault: "client",
                    ...B
                });
                Object.setPrototypeOf(this, A.prototype), this.resourceName = B.resourceName
            }
        },
        Xo1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.distillationConfig !== void 0) return Q.distillationConfig(B.distillationConfig);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Xo1 || (Xo1 = {}));
    var E5Q = {
            CONTINUED_PRE_TRAINING: "CONTINUED_PRE_TRAINING",
            DISTILLATION: "DISTILLATION",
            FINE_TUNING: "FINE_TUNING",
            IMPORTED: "IMPORTED"
        },
        U5Q = {
            ACTIVE: "Active",
            CREATING: "Creating",
            FAILED: "Failed"
        },
        Vo1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.s3Uri !== void 0) return Q.s3Uri(B.s3Uri);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Vo1 || (Vo1 = {}));
    var Co1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.equals !== void 0) return Q.equals(B.equals);
            if (B.notEquals !== void 0) return Q.notEquals(B.notEquals);
            if (B.andAll !== void 0) return Q.andAll(B.andAll);
            if (B.orAll !== void 0) return Q.orAll(B.orAll);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Co1 || (Co1 = {}));
    var w5Q = {
            CREATION_TIME: "CreationTime"
        },
        $5Q = {
            ASCENDING: "Ascending",
            DESCENDING: "Descending"
        },
        q5Q = {
            COMPLETED: "Completed",
            DELETING: "Deleting",
            FAILED: "Failed",
            IN_PROGRESS: "InProgress",
            STOPPED: "Stopped",
            STOPPING: "Stopping"
        },
        N5Q = {
            MODEL_EVALUATION: "ModelEvaluation",
            RAG_EVALUATION: "RagEvaluation"
        },
        cH1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.stringValue !== void 0) return Q.stringValue(B.stringValue);
            if (B.floatValue !== void 0) return Q.floatValue(B.floatValue);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(cH1 || (cH1 = {}));
    var lH1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.customMetricDefinition !== void 0) return Q.customMetricDefinition(B.customMetricDefinition);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(lH1 || (lH1 = {}));
    var Ko1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.s3Uri !== void 0) return Q.s3Uri(B.s3Uri);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Ko1 || (Ko1 = {}));
    var L5Q = {
            CLASSIFICATION: "Classification",
            CUSTOM: "Custom",
            GENERATION: "Generation",
            QUESTION_AND_ANSWER: "QuestionAndAnswer",
            SUMMARIZATION: "Summarization"
        },
        Ho1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.bedrockEvaluatorModels !== void 0) return Q.bedrockEvaluatorModels(B.bedrockEvaluatorModels);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Ho1 || (Ho1 = {}));
    var pH1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.automated !== void 0) return Q.automated(B.automated);
            if (B.human !== void 0) return Q.human(B.human);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(pH1 || (pH1 = {}));
    var M5Q = {
            OPTIMIZED: "optimized",
            STANDARD: "standard"
        },
        zo1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.bedrockModel !== void 0) return Q.bedrockModel(B.bedrockModel);
            if (B.precomputedInferenceSource !== void 0) return Q.precomputedInferenceSource(B.precomputedInferenceSource);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(zo1 || (zo1 = {}));
    var R5Q = {
            BYTE_CONTENT: "BYTE_CONTENT",
            S3: "S3"
        },
        O5Q = {
            QUERY_DECOMPOSITION: "QUERY_DECOMPOSITION"
        },
        T5Q = {
            BOOLEAN: "BOOLEAN",
            NUMBER: "NUMBER",
            STRING: "STRING",
            STRING_LIST: "STRING_LIST"
        },
        P5Q = {
            HYBRID: "HYBRID",
            SEMANTIC: "SEMANTIC"
        },
        S5Q = {
            ALL: "ALL",
            SELECTIVE: "SELECTIVE"
        },
        Eo1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.fieldsToInclude !== void 0) return Q.fieldsToInclude(B.fieldsToInclude);
            if (B.fieldsToExclude !== void 0) return Q.fieldsToExclude(B.fieldsToExclude);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Eo1 || (Eo1 = {}));
    var j5Q = {
            BEDROCK_RERANKING_MODEL: "BEDROCK_RERANKING_MODEL"
        },
        k5Q = {
            EXTERNAL_SOURCES: "EXTERNAL_SOURCES",
            KNOWLEDGE_BASE: "KNOWLEDGE_BASE"
        },
        Uo1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.retrieveSourceConfig !== void 0) return Q.retrieveSourceConfig(B.retrieveSourceConfig);
            if (B.retrieveAndGenerateSourceConfig !== void 0) return Q.retrieveAndGenerateSourceConfig(B.retrieveAndGenerateSourceConfig);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(Uo1 || (Uo1 = {}));
    var y5Q = {
            AUTOMATED: "Automated",
            HUMAN: "Human"
        },
        _5Q = {
            CREATION_TIME: "CreationTime"
        },
        x5Q = {
            BLOCK: "BLOCK",
            NONE: "NONE"
        },
        v5Q = {
            IMAGE: "IMAGE",
            TEXT: "TEXT"
        },
        b5Q = {
            HIGH: "HIGH",
            LOW: "LOW",
            MEDIUM: "MEDIUM",
            NONE: "NONE"
        },
        f5Q = {
            HATE: "HATE",
            INSULTS: "INSULTS",
            MISCONDUCT: "MISCONDUCT",
            PROMPT_ATTACK: "PROMPT_ATTACK",
            SEXUAL: "SEXUAL",
            VIOLENCE: "VIOLENCE"
        },
        h5Q = {
            CLASSIC: "CLASSIC",
            STANDARD: "STANDARD"
        },
        g5Q = {
            BLOCK: "BLOCK",
            NONE: "NONE"
        },
        u5Q = {
            GROUNDING: "GROUNDING",
            RELEVANCE: "RELEVANCE"
        },
        m5Q = {
            ANONYMIZE: "ANONYMIZE",
            BLOCK: "BLOCK",
            NONE: "NONE"
        },
        d5Q = {
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
        c5Q = {
            CLASSIC: "CLASSIC",
            STANDARD: "STANDARD"
        },
        l5Q = {
            BLOCK: "BLOCK",
            NONE: "NONE"
        },
        p5Q = {
            DENY: "DENY"
        },
        i5Q = {
            BLOCK: "BLOCK",
            NONE: "NONE"
        },
        n5Q = {
            PROFANITY: "PROFANITY"
        },
        a5Q = {
            CREATING: "CREATING",
            DELETING: "DELETING",
            FAILED: "FAILED",
            READY: "READY",
            UPDATING: "UPDATING",
            VERSIONING: "VERSIONING"
        },
        wo1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.copyFrom !== void 0) return Q.copyFrom(B.copyFrom);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(wo1 || (wo1 = {}));
    var s5Q = {
            ACTIVE: "ACTIVE"
        },
        r5Q = {
            APPLICATION: "APPLICATION",
            SYSTEM_DEFINED: "SYSTEM_DEFINED"
        },
        o5Q = {
            COMPLETED: "Completed",
            FAILED: "Failed",
            IN_PROGRESS: "InProgress"
        },
        t5Q = {
            COMPLETED: "Completed",
            FAILED: "Failed",
            IN_PROGRESS: "InProgress"
        },
        e5Q = {
            JSONL: "JSONL"
        },
        $o1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.s3InputDataConfig !== void 0) return Q.s3InputDataConfig(B.s3InputDataConfig);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })($o1 || ($o1 = {}));
    var qo1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.s3OutputDataConfig !== void 0) return Q.s3OutputDataConfig(B.s3OutputDataConfig);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(qo1 || (qo1 = {}));
    var A3Q = {
            COMPLETED: "Completed",
            EXPIRED: "Expired",
            FAILED: "Failed",
            IN_PROGRESS: "InProgress",
            PARTIALLY_COMPLETED: "PartiallyCompleted",
            SCHEDULED: "Scheduled",
            STOPPED: "Stopped",
            STOPPING: "Stopping",
            SUBMITTED: "Submitted",
            VALIDATING: "Validating"
        },
        B3Q = {
            CONTINUED_PRE_TRAINING: "CONTINUED_PRE_TRAINING",
            DISTILLATION: "DISTILLATION",
            FINE_TUNING: "FINE_TUNING"
        },
        Q3Q = {
            ON_DEMAND: "ON_DEMAND",
            PROVISIONED: "PROVISIONED"
        },
        Z3Q = {
            EMBEDDING: "EMBEDDING",
            IMAGE: "IMAGE",
            TEXT: "TEXT"
        },
        D3Q = {
            ACTIVE: "ACTIVE",
            LEGACY: "LEGACY"
        },
        G3Q = {
            AVAILABLE: "AVAILABLE"
        },
        F3Q = {
            CUSTOM: "custom",
            DEFAULT: "default"
        },
        I3Q = {
            ONE_MONTH: "OneMonth",
            SIX_MONTHS: "SixMonths"
        },
        Y3Q = {
            CREATING: "Creating",
            FAILED: "Failed",
            IN_SERVICE: "InService",
            UPDATING: "Updating"
        },
        W3Q = {
            CREATION_TIME: "CreationTime"
        },
        J3Q = {
            AUTHORIZED: "AUTHORIZED",
            NOT_AUTHORIZED: "NOT_AUTHORIZED"
        },
        No1 = n((A) => ({
            ...A,
            ...A.equals && {
                equals: x.SENSITIVE_STRING
            },
            ...A.notEquals && {
                notEquals: x.SENSITIVE_STRING
            }
        }), "RequestMetadataBaseFiltersFilterSensitiveLog"),
        JYA = n((A) => {
            if (A.equals !== void 0) return {
                equals: x.SENSITIVE_STRING
            };
            if (A.notEquals !== void 0) return {
                notEquals: x.SENSITIVE_STRING
            };
            if (A.andAll !== void 0) return {
                andAll: A.andAll.map((B) => No1(B))
            };
            if (A.orAll !== void 0) return {
                orAll: A.orAll.map((B) => No1(B))
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "RequestMetadataFiltersFilterSensitiveLog"),
        XYA = n((A) => ({
            ...A,
            ...A.invocationLogSource && {
                invocationLogSource: A.invocationLogSource
            },
            ...A.requestMetadataFilters && {
                requestMetadataFilters: JYA(A.requestMetadataFilters)
            }
        }), "InvocationLogsConfigFilterSensitiveLog"),
        tH1 = n((A) => ({
            ...A,
            ...A.invocationLogsConfig && {
                invocationLogsConfig: XYA(A.invocationLogsConfig)
            }
        }), "TrainingDataConfigFilterSensitiveLog"),
        VYA = n((A) => ({
            ...A,
            ...A.trainingDataConfig && {
                trainingDataConfig: tH1(A.trainingDataConfig)
            },
            ...A.customizationConfig && {
                customizationConfig: A.customizationConfig
            }
        }), "GetCustomModelResponseFilterSensitiveLog"),
        CYA = n((A) => ({
            ...A,
            ...A.jobIdentifiers && {
                jobIdentifiers: x.SENSITIVE_STRING
            }
        }), "BatchDeleteEvaluationJobRequestFilterSensitiveLog"),
        KYA = n((A) => ({
            ...A,
            ...A.jobIdentifier && {
                jobIdentifier: x.SENSITIVE_STRING
            }
        }), "BatchDeleteEvaluationJobErrorFilterSensitiveLog"),
        HYA = n((A) => ({
            ...A,
            ...A.jobIdentifier && {
                jobIdentifier: x.SENSITIVE_STRING
            }
        }), "BatchDeleteEvaluationJobItemFilterSensitiveLog"),
        zYA = n((A) => ({
            ...A,
            ...A.errors && {
                errors: A.errors.map((B) => KYA(B))
            },
            ...A.evaluationJobs && {
                evaluationJobs: A.evaluationJobs.map((B) => HYA(B))
            }
        }), "BatchDeleteEvaluationJobResponseFilterSensitiveLog"),
        X3Q = n((A) => ({
            ...A,
            ...A.name && {
                name: x.SENSITIVE_STRING
            },
            ...A.ratingScale && {
                ratingScale: A.ratingScale.map((B) => B)
            }
        }), "CustomMetricDefinitionFilterSensitiveLog"),
        EYA = n((A) => {
            if (A.customMetricDefinition !== void 0) return {
                customMetricDefinition: x.SENSITIVE_STRING
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "AutomatedEvaluationCustomMetricSourceFilterSensitiveLog"),
        UYA = n((A) => ({
            ...A,
            ...A.customMetrics && {
                customMetrics: A.customMetrics.map((B) => EYA(B))
            }
        }), "AutomatedEvaluationCustomMetricConfigFilterSensitiveLog"),
        wYA = n((A) => ({
            ...A,
            ...A.name && {
                name: x.SENSITIVE_STRING
            },
            ...A.datasetLocation && {
                datasetLocation: A.datasetLocation
            }
        }), "EvaluationDatasetFilterSensitiveLog"),
        Mo1 = n((A) => ({
            ...A,
            ...A.dataset && {
                dataset: wYA(A.dataset)
            },
            ...A.metricNames && {
                metricNames: x.SENSITIVE_STRING
            }
        }), "EvaluationDatasetMetricConfigFilterSensitiveLog"),
        $YA = n((A) => ({
            ...A,
            ...A.datasetMetricConfigs && {
                datasetMetricConfigs: A.datasetMetricConfigs.map((B) => Mo1(B))
            },
            ...A.evaluatorModelConfig && {
                evaluatorModelConfig: A.evaluatorModelConfig
            },
            ...A.customMetricConfig && {
                customMetricConfig: UYA(A.customMetricConfig)
            }
        }), "AutomatedEvaluationConfigFilterSensitiveLog"),
        qYA = n((A) => ({
            ...A,
            ...A.name && {
                name: x.SENSITIVE_STRING
            },
            ...A.description && {
                description: x.SENSITIVE_STRING
            }
        }), "HumanEvaluationCustomMetricFilterSensitiveLog"),
        NYA = n((A) => ({
            ...A,
            ...A.instructions && {
                instructions: x.SENSITIVE_STRING
            }
        }), "HumanWorkflowConfigFilterSensitiveLog"),
        LYA = n((A) => ({
            ...A,
            ...A.humanWorkflowConfig && {
                humanWorkflowConfig: NYA(A.humanWorkflowConfig)
            },
            ...A.customMetrics && {
                customMetrics: A.customMetrics.map((B) => qYA(B))
            },
            ...A.datasetMetricConfigs && {
                datasetMetricConfigs: A.datasetMetricConfigs.map((B) => Mo1(B))
            }
        }), "HumanEvaluationConfigFilterSensitiveLog"),
        Ro1 = n((A) => {
            if (A.automated !== void 0) return {
                automated: $YA(A.automated)
            };
            if (A.human !== void 0) return {
                human: LYA(A.human)
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "EvaluationConfigFilterSensitiveLog"),
        MYA = n((A) => ({
            ...A,
            ...A.inferenceParams && {
                inferenceParams: x.SENSITIVE_STRING
            }
        }), "EvaluationBedrockModelFilterSensitiveLog"),
        RYA = n((A) => {
            if (A.bedrockModel !== void 0) return {
                bedrockModel: MYA(A.bedrockModel)
            };
            if (A.precomputedInferenceSource !== void 0) return {
                precomputedInferenceSource: A.precomputedInferenceSource
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "EvaluationModelConfigFilterSensitiveLog"),
        Oo1 = n((A) => ({
            ...A,
            ...A.textPromptTemplate && {
                textPromptTemplate: x.SENSITIVE_STRING
            }
        }), "PromptTemplateFilterSensitiveLog"),
        OYA = n((A) => ({
            ...A,
            ...A.promptTemplate && {
                promptTemplate: Oo1(A.promptTemplate)
            }
        }), "ExternalSourcesGenerationConfigurationFilterSensitiveLog"),
        TYA = n((A) => ({
            ...A,
            ...A.identifier && {
                identifier: x.SENSITIVE_STRING
            },
            ...A.data && {
                data: x.SENSITIVE_STRING
            }
        }), "ByteContentDocFilterSensitiveLog"),
        PYA = n((A) => ({
            ...A,
            ...A.byteContent && {
                byteContent: TYA(A.byteContent)
            }
        }), "ExternalSourceFilterSensitiveLog"),
        SYA = n((A) => ({
            ...A,
            ...A.sources && {
                sources: A.sources.map((B) => PYA(B))
            },
            ...A.generationConfiguration && {
                generationConfiguration: OYA(A.generationConfiguration)
            }
        }), "ExternalSourcesRetrieveAndGenerateConfigurationFilterSensitiveLog"),
        jYA = n((A) => ({
            ...A,
            ...A.promptTemplate && {
                promptTemplate: Oo1(A.promptTemplate)
            }
        }), "GenerationConfigurationFilterSensitiveLog"),
        V3Q = n((A) => ({
            ...A
        }), "MetadataAttributeSchemaFilterSensitiveLog"),
        kYA = n((A) => ({
            ...A,
            ...A.metadataAttributes && {
                metadataAttributes: x.SENSITIVE_STRING
            }
        }), "ImplicitFilterConfigurationFilterSensitiveLog"),
        yYA = n((A) => {
            if (A.fieldsToInclude !== void 0) return {
                fieldsToInclude: x.SENSITIVE_STRING
            };
            if (A.fieldsToExclude !== void 0) return {
                fieldsToExclude: x.SENSITIVE_STRING
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "RerankingMetadataSelectiveModeConfigurationFilterSensitiveLog"),
        _YA = n((A) => ({
            ...A,
            ...A.selectiveModeConfiguration && {
                selectiveModeConfiguration: yYA(A.selectiveModeConfiguration)
            }
        }), "MetadataConfigurationForRerankingFilterSensitiveLog"),
        xYA = n((A) => ({
            ...A,
            ...A.metadataConfiguration && {
                metadataConfiguration: _YA(A.metadataConfiguration)
            }
        }), "VectorSearchBedrockRerankingConfigurationFilterSensitiveLog"),
        vYA = n((A) => ({
            ...A,
            ...A.bedrockRerankingConfiguration && {
                bedrockRerankingConfiguration: xYA(A.bedrockRerankingConfiguration)
            }
        }), "VectorSearchRerankingConfigurationFilterSensitiveLog"),
        bYA = n((A) => ({
            ...A,
            ...A.jobIdentifier && {
                jobIdentifier: x.SENSITIVE_STRING
            }
        }), "GetEvaluationJobRequestFilterSensitiveLog"),
        fYA = n((A) => ({
            ...A,
            ...A.jobIdentifier && {
                jobIdentifier: x.SENSITIVE_STRING
            }
        }), "StopEvaluationJobRequestFilterSensitiveLog"),
        hYA = n((A) => ({
            ...A,
            ...A.inputModalities && {
                inputModalities: x.SENSITIVE_STRING
            },
            ...A.outputModalities && {
                outputModalities: x.SENSITIVE_STRING
            },
            ...A.inputAction && {
                inputAction: x.SENSITIVE_STRING
            },
            ...A.outputAction && {
                outputAction: x.SENSITIVE_STRING
            }
        }), "GuardrailContentFilterConfigFilterSensitiveLog"),
        gYA = n((A) => ({
            ...A,
            ...A.tierName && {
                tierName: x.SENSITIVE_STRING
            }
        }), "GuardrailContentFiltersTierConfigFilterSensitiveLog"),
        To1 = n((A) => ({
            ...A,
            ...A.filtersConfig && {
                filtersConfig: A.filtersConfig.map((B) => hYA(B))
            },
            ...A.tierConfig && {
                tierConfig: gYA(A.tierConfig)
            }
        }), "GuardrailContentPolicyConfigFilterSensitiveLog"),
        uYA = n((A) => ({
            ...A,
            ...A.action && {
                action: x.SENSITIVE_STRING
            }
        }), "GuardrailContextualGroundingFilterConfigFilterSensitiveLog"),
        Po1 = n((A) => ({
            ...A,
            ...A.filtersConfig && {
                filtersConfig: A.filtersConfig.map((B) => uYA(B))
            }
        }), "GuardrailContextualGroundingPolicyConfigFilterSensitiveLog"),
        mYA = n((A) => ({
            ...A,
            ...A.tierName && {
                tierName: x.SENSITIVE_STRING
            }
        }), "GuardrailTopicsTierConfigFilterSensitiveLog"),
        dYA = n((A) => ({
            ...A,
            ...A.name && {
                name: x.SENSITIVE_STRING
            },
            ...A.definition && {
                definition: x.SENSITIVE_STRING
            },
            ...A.examples && {
                examples: x.SENSITIVE_STRING
            },
            ...A.inputAction && {
                inputAction: x.SENSITIVE_STRING
            },
            ...A.outputAction && {
                outputAction: x.SENSITIVE_STRING
            }
        }), "GuardrailTopicConfigFilterSensitiveLog"),
        So1 = n((A) => ({
            ...A,
            ...A.topicsConfig && {
                topicsConfig: A.topicsConfig.map((B) => dYA(B))
            },
            ...A.tierConfig && {
                tierConfig: mYA(A.tierConfig)
            }
        }), "GuardrailTopicPolicyConfigFilterSensitiveLog"),
        cYA = n((A) => ({
            ...A,
            ...A.inputAction && {
                inputAction: x.SENSITIVE_STRING
            },
            ...A.outputAction && {
                outputAction: x.SENSITIVE_STRING
            }
        }), "GuardrailManagedWordsConfigFilterSensitiveLog"),
        lYA = n((A) => ({
            ...A,
            ...A.inputAction && {
                inputAction: x.SENSITIVE_STRING
            },
            ...A.outputAction && {
                outputAction: x.SENSITIVE_STRING
            }
        }), "GuardrailWordConfigFilterSensitiveLog"),
        jo1 = n((A) => ({
            ...A,
            ...A.wordsConfig && {
                wordsConfig: A.wordsConfig.map((B) => lYA(B))
            },
            ...A.managedWordListsConfig && {
                managedWordListsConfig: A.managedWordListsConfig.map((B) => cYA(B))
            }
        }), "GuardrailWordPolicyConfigFilterSensitiveLog"),
        pYA = n((A) => ({
            ...A,
            ...A.name && {
                name: x.SENSITIVE_STRING
            },
            ...A.description && {
                description: x.SENSITIVE_STRING
            },
            ...A.topicPolicyConfig && {
                topicPolicyConfig: So1(A.topicPolicyConfig)
            },
            ...A.contentPolicyConfig && {
                contentPolicyConfig: To1(A.contentPolicyConfig)
            },
            ...A.wordPolicyConfig && {
                wordPolicyConfig: jo1(A.wordPolicyConfig)
            },
            ...A.contextualGroundingPolicyConfig && {
                contextualGroundingPolicyConfig: Po1(A.contextualGroundingPolicyConfig)
            },
            ...A.blockedInputMessaging && {
                blockedInputMessaging: x.SENSITIVE_STRING
            },
            ...A.blockedOutputsMessaging && {
                blockedOutputsMessaging: x.SENSITIVE_STRING
            }
        }), "CreateGuardrailRequestFilterSensitiveLog"),
        iYA = n((A) => ({
            ...A,
            ...A.description && {
                description: x.SENSITIVE_STRING
            }
        }), "CreateGuardrailVersionRequestFilterSensitiveLog"),
        nYA = n((A) => ({
            ...A,
            ...A.inputModalities && {
                inputModalities: x.SENSITIVE_STRING
            },
            ...A.outputModalities && {
                outputModalities: x.SENSITIVE_STRING
            },
            ...A.inputAction && {
                inputAction: x.SENSITIVE_STRING
            },
            ...A.outputAction && {
                outputAction: x.SENSITIVE_STRING
            }
        }), "GuardrailContentFilterFilterSensitiveLog"),
        aYA = n((A) => ({
            ...A,
            ...A.tierName && {
                tierName: x.SENSITIVE_STRING
            }
        }), "GuardrailContentFiltersTierFilterSensitiveLog"),
        sYA = n((A) => ({
            ...A,
            ...A.filters && {
                filters: A.filters.map((B) => nYA(B))
            },
            ...A.tier && {
                tier: aYA(A.tier)
            }
        }), "GuardrailContentPolicyFilterSensitiveLog"),
        rYA = n((A) => ({
            ...A,
            ...A.action && {
                action: x.SENSITIVE_STRING
            }
        }), "GuardrailContextualGroundingFilterFilterSensitiveLog"),
        oYA = n((A) => ({
            ...A,
            ...A.filters && {
                filters: A.filters.map((B) => rYA(B))
            }
        }), "GuardrailContextualGroundingPolicyFilterSensitiveLog"),
        tYA = n((A) => ({
            ...A,
            ...A.tierName && {
                tierName: x.SENSITIVE_STRING
            }
        }), "GuardrailTopicsTierFilterSensitiveLog"),
        eYA = n((A) => ({
            ...A,
            ...A.name && {
                name: x.SENSITIVE_STRING
            },
            ...A.definition && {
                definition: x.SENSITIVE_STRING
            },
            ...A.examples && {
                examples: x.SENSITIVE_STRING
            },
            ...A.inputAction && {
                inputAction: x.SENSITIVE_STRING
            },
            ...A.outputAction && {
                outputAction: x.SENSITIVE_STRING
            }
        }), "GuardrailTopicFilterSensitiveLog"),
        AWA = n((A) => ({
            ...A,
            ...A.topics && {
                topics: A.topics.map((B) => eYA(B))
            },
            ...A.tier && {
                tier: tYA(A.tier)
            }
        }), "GuardrailTopicPolicyFilterSensitiveLog"),
        BWA = n((A) => ({
            ...A,
            ...A.inputAction && {
                inputAction: x.SENSITIVE_STRING
            },
            ...A.outputAction && {
                outputAction: x.SENSITIVE_STRING
            }
        }), "GuardrailManagedWordsFilterSensitiveLog"),
        QWA = n((A) => ({
            ...A,
            ...A.inputAction && {
                inputAction: x.SENSITIVE_STRING
            },
            ...A.outputAction && {
                outputAction: x.SENSITIVE_STRING
            }
        }), "GuardrailWordFilterSensitiveLog"),
        ZWA = n((A) => ({
            ...A,
            ...A.words && {
                words: A.words.map((B) => QWA(B))
            },
            ...A.managedWordLists && {
                managedWordLists: A.managedWordLists.map((B) => BWA(B))
            }
        }), "GuardrailWordPolicyFilterSensitiveLog"),
        DWA = n((A) => ({
            ...A,
            ...A.name && {
                name: x.SENSITIVE_STRING
            },
            ...A.description && {
                description: x.SENSITIVE_STRING
            },
            ...A.topicPolicy && {
                topicPolicy: AWA(A.topicPolicy)
            },
            ...A.contentPolicy && {
                contentPolicy: sYA(A.contentPolicy)
            },
            ...A.wordPolicy && {
                wordPolicy: ZWA(A.wordPolicy)
            },
            ...A.contextualGroundingPolicy && {
                contextualGroundingPolicy: oYA(A.contextualGroundingPolicy)
            },
            ...A.statusReasons && {
                statusReasons: x.SENSITIVE_STRING
            },
            ...A.failureRecommendations && {
                failureRecommendations: x.SENSITIVE_STRING
            },
            ...A.blockedInputMessaging && {
                blockedInputMessaging: x.SENSITIVE_STRING
            },
            ...A.blockedOutputsMessaging && {
                blockedOutputsMessaging: x.SENSITIVE_STRING
            }
        }), "GetGuardrailResponseFilterSensitiveLog"),
        GWA = n((A) => ({
            ...A,
            ...A.name && {
                name: x.SENSITIVE_STRING
            },
            ...A.description && {
                description: x.SENSITIVE_STRING
            }
        }), "GuardrailSummaryFilterSensitiveLog"),
        FWA = n((A) => ({
            ...A,
            ...A.guardrails && {
                guardrails: A.guardrails.map((B) => GWA(B))
            }
        }), "ListGuardrailsResponseFilterSensitiveLog"),
        IWA = n((A) => ({
            ...A,
            ...A.name && {
                name: x.SENSITIVE_STRING
            },
            ...A.description && {
                description: x.SENSITIVE_STRING
            },
            ...A.topicPolicyConfig && {
                topicPolicyConfig: So1(A.topicPolicyConfig)
            },
            ...A.contentPolicyConfig && {
                contentPolicyConfig: To1(A.contentPolicyConfig)
            },
            ...A.wordPolicyConfig && {
                wordPolicyConfig: jo1(A.wordPolicyConfig)
            },
            ...A.contextualGroundingPolicyConfig && {
                contextualGroundingPolicyConfig: Po1(A.contextualGroundingPolicyConfig)
            },
            ...A.blockedInputMessaging && {
                blockedInputMessaging: x.SENSITIVE_STRING
            },
            ...A.blockedOutputsMessaging && {
                blockedOutputsMessaging: x.SENSITIVE_STRING
            }
        }), "UpdateGuardrailRequestFilterSensitiveLog"),
        YWA = n((A) => ({
            ...A,
            ...A.description && {
                description: x.SENSITIVE_STRING
            },
            ...A.modelSource && {
                modelSource: A.modelSource
            }
        }), "CreateInferenceProfileRequestFilterSensitiveLog"),
        WWA = n((A) => ({
            ...A,
            ...A.description && {
                description: x.SENSITIVE_STRING
            }
        }), "GetInferenceProfileResponseFilterSensitiveLog"),
        JWA = n((A) => ({
            ...A,
            ...A.description && {
                description: x.SENSITIVE_STRING
            }
        }), "InferenceProfileSummaryFilterSensitiveLog"),
        XWA = n((A) => ({
            ...A,
            ...A.inferenceProfileSummaries && {
                inferenceProfileSummaries: A.inferenceProfileSummaries.map((B) => JWA(B))
            }
        }), "ListInferenceProfilesResponseFilterSensitiveLog"),
        VWA = n((A) => ({
            ...A,
            ...A.message && {
                message: x.SENSITIVE_STRING
            },
            ...A.inputDataConfig && {
                inputDataConfig: A.inputDataConfig
            },
            ...A.outputDataConfig && {
                outputDataConfig: A.outputDataConfig
            }
        }), "GetModelInvocationJobResponseFilterSensitiveLog"),
        CWA = n((A) => ({
            ...A,
            ...A.message && {
                message: x.SENSITIVE_STRING
            },
            ...A.inputDataConfig && {
                inputDataConfig: A.inputDataConfig
            },
            ...A.outputDataConfig && {
                outputDataConfig: A.outputDataConfig
            }
        }), "ModelInvocationJobSummaryFilterSensitiveLog"),
        KWA = n((A) => ({
            ...A,
            ...A.invocationJobSummaries && {
                invocationJobSummaries: A.invocationJobSummaries.map((B) => CWA(B))
            }
        }), "ListModelInvocationJobsResponseFilterSensitiveLog"),
        HWA = n((A) => ({
            ...A,
            ...A.description && {
                description: x.SENSITIVE_STRING
            }
        }), "CreatePromptRouterRequestFilterSensitiveLog"),
        zWA = n((A) => ({
            ...A,
            ...A.description && {
                description: x.SENSITIVE_STRING
            }
        }), "GetPromptRouterResponseFilterSensitiveLog"),
        EWA = n((A) => ({
            ...A,
            ...A.description && {
                description: x.SENSITIVE_STRING
            }
        }), "PromptRouterSummaryFilterSensitiveLog"),
        UWA = n((A) => ({
            ...A,
            ...A.promptRouterSummaries && {
                promptRouterSummaries: A.promptRouterSummaries.map((B) => EWA(B))
            }
        }), "ListPromptRoutersResponseFilterSensitiveLog"),
        VB = YI(),
        Vz = b91(),
        C3Q = {
            AVAILABLE: "AVAILABLE",
            NOT_AVAILABLE: "NOT_AVAILABLE"
        },
        K3Q = {
            AVAILABLE: "AVAILABLE",
            NOT_AVAILABLE: "NOT_AVAILABLE"
        },
        H3Q = {
            ALL: "ALL",
            PUBLIC: "PUBLIC"
        },
        z3Q = {
            COMPLETED: "Completed",
            FAILED: "Failed",
            IN_PROGRESS: "InProgress",
            STOPPED: "Stopped",
            STOPPING: "Stopping"
        },
        E3Q = {
            COMPLETED: "Completed",
            FAILED: "Failed",
            IN_PROGRESS: "InProgress",
            NOT_STARTED: "NotStarted",
            STOPPED: "Stopped",
            STOPPING: "Stopping"
        },
        U3Q = {
            COMPLETED: "Completed",
            FAILED: "Failed",
            IN_PROGRESS: "InProgress",
            STOPPED: "Stopped",
            STOPPING: "Stopping"
        },
        iH1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.equals !== void 0) return Q.equals(B.equals);
            if (B.notEquals !== void 0) return Q.notEquals(B.notEquals);
            if (B.greaterThan !== void 0) return Q.greaterThan(B.greaterThan);
            if (B.greaterThanOrEquals !== void 0) return Q.greaterThanOrEquals(B.greaterThanOrEquals);
            if (B.lessThan !== void 0) return Q.lessThan(B.lessThan);
            if (B.lessThanOrEquals !== void 0) return Q.lessThanOrEquals(B.lessThanOrEquals);
            if (B.in !== void 0) return Q.in(B.in);
            if (B.notIn !== void 0) return Q.notIn(B.notIn);
            if (B.startsWith !== void 0) return Q.startsWith(B.startsWith);
            if (B.listContains !== void 0) return Q.listContains(B.listContains);
            if (B.stringContains !== void 0) return Q.stringContains(B.stringContains);
            if (B.andAll !== void 0) return Q.andAll(B.andAll);
            if (B.orAll !== void 0) return Q.orAll(B.orAll);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(iH1 || (iH1 = {}));
    var nH1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.retrieveConfig !== void 0) return Q.retrieveConfig(B.retrieveConfig);
            if (B.retrieveAndGenerateConfig !== void 0) return Q.retrieveAndGenerateConfig(B.retrieveAndGenerateConfig);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(nH1 || (nH1 = {}));
    var aH1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.knowledgeBaseConfig !== void 0) return Q.knowledgeBaseConfig(B.knowledgeBaseConfig);
            if (B.precomputedRagSourceConfig !== void 0) return Q.precomputedRagSourceConfig(B.precomputedRagSourceConfig);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(aH1 || (aH1 = {}));
    var sH1;
    ((A) => {
        A.visit = n((B, Q) => {
            if (B.models !== void 0) return Q.models(B.models);
            if (B.ragConfigs !== void 0) return Q.ragConfigs(B.ragConfigs);
            return Q._(B.$unknown[0], B.$unknown[1])
        }, "visit")
    })(sH1 || (sH1 = {}));
    var wWA = n((A) => ({
            ...A,
            ...A.trainingDataConfig && {
                trainingDataConfig: tH1(A.trainingDataConfig)
            },
            ...A.customizationConfig && {
                customizationConfig: A.customizationConfig
            }
        }), "CreateModelCustomizationJobRequestFilterSensitiveLog"),
        $WA = n((A) => ({
            ...A,
            ...A.trainingDataConfig && {
                trainingDataConfig: tH1(A.trainingDataConfig)
            },
            ...A.customizationConfig && {
                customizationConfig: A.customizationConfig
            }
        }), "GetModelCustomizationJobResponseFilterSensitiveLog"),
        w3Q = n((A) => {
            if (A.equals !== void 0) return {
                equals: A.equals
            };
            if (A.notEquals !== void 0) return {
                notEquals: A.notEquals
            };
            if (A.greaterThan !== void 0) return {
                greaterThan: A.greaterThan
            };
            if (A.greaterThanOrEquals !== void 0) return {
                greaterThanOrEquals: A.greaterThanOrEquals
            };
            if (A.lessThan !== void 0) return {
                lessThan: A.lessThan
            };
            if (A.lessThanOrEquals !== void 0) return {
                lessThanOrEquals: A.lessThanOrEquals
            };
            if (A.in !== void 0) return {
                in: A.in
            };
            if (A.notIn !== void 0) return {
                notIn: A.notIn
            };
            if (A.startsWith !== void 0) return {
                startsWith: A.startsWith
            };
            if (A.listContains !== void 0) return {
                listContains: A.listContains
            };
            if (A.stringContains !== void 0) return {
                stringContains: A.stringContains
            };
            if (A.andAll !== void 0) return {
                andAll: x.SENSITIVE_STRING
            };
            if (A.orAll !== void 0) return {
                orAll: x.SENSITIVE_STRING
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "RetrievalFilterFilterSensitiveLog"),
        qWA = n((A) => ({
            ...A,
            ...A.filter && {
                filter: x.SENSITIVE_STRING
            },
            ...A.implicitFilterConfiguration && {
                implicitFilterConfiguration: kYA(A.implicitFilterConfiguration)
            },
            ...A.rerankingConfiguration && {
                rerankingConfiguration: vYA(A.rerankingConfiguration)
            }
        }), "KnowledgeBaseVectorSearchConfigurationFilterSensitiveLog"),
        ko1 = n((A) => ({
            ...A,
            ...A.vectorSearchConfiguration && {
                vectorSearchConfiguration: qWA(A.vectorSearchConfiguration)
            }
        }), "KnowledgeBaseRetrievalConfigurationFilterSensitiveLog"),
        NWA = n((A) => ({
            ...A,
            ...A.retrievalConfiguration && {
                retrievalConfiguration: ko1(A.retrievalConfiguration)
            },
            ...A.generationConfiguration && {
                generationConfiguration: jYA(A.generationConfiguration)
            }
        }), "KnowledgeBaseRetrieveAndGenerateConfigurationFilterSensitiveLog"),
        LWA = n((A) => ({
            ...A,
            ...A.knowledgeBaseRetrievalConfiguration && {
                knowledgeBaseRetrievalConfiguration: ko1(A.knowledgeBaseRetrievalConfiguration)
            }
        }), "RetrieveConfigFilterSensitiveLog"),
        MWA = n((A) => ({
            ...A,
            ...A.knowledgeBaseConfiguration && {
                knowledgeBaseConfiguration: NWA(A.knowledgeBaseConfiguration)
            },
            ...A.externalSourcesConfiguration && {
                externalSourcesConfiguration: SYA(A.externalSourcesConfiguration)
            }
        }), "RetrieveAndGenerateConfigurationFilterSensitiveLog"),
        RWA = n((A) => {
            if (A.retrieveConfig !== void 0) return {
                retrieveConfig: LWA(A.retrieveConfig)
            };
            if (A.retrieveAndGenerateConfig !== void 0) return {
                retrieveAndGenerateConfig: MWA(A.retrieveAndGenerateConfig)
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "KnowledgeBaseConfigFilterSensitiveLog"),
        OWA = n((A) => {
            if (A.knowledgeBaseConfig !== void 0) return {
                knowledgeBaseConfig: RWA(A.knowledgeBaseConfig)
            };
            if (A.precomputedRagSourceConfig !== void 0) return {
                precomputedRagSourceConfig: A.precomputedRagSourceConfig
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "RAGConfigFilterSensitiveLog"),
        yo1 = n((A) => {
            if (A.models !== void 0) return {
                models: A.models.map((B) => RYA(B))
            };
            if (A.ragConfigs !== void 0) return {
                ragConfigs: A.ragConfigs.map((B) => OWA(B))
            };
            if (A.$unknown !== void 0) return {
                [A.$unknown[0]]: "UNKNOWN"
            }
        }, "EvaluationInferenceConfigFilterSensitiveLog"),
        TWA = n((A) => ({
            ...A,
            ...A.jobDescription && {
                jobDescription: x.SENSITIVE_STRING
            },
            ...A.evaluationConfig && {
                evaluationConfig: Ro1(A.evaluationConfig)
            },
            ...A.inferenceConfig && {
                inferenceConfig: yo1(A.inferenceConfig)
            }
        }), "CreateEvaluationJobRequestFilterSensitiveLog"),
        PWA = n((A) => ({
            ...A,
            ...A.jobDescription && {
                jobDescription: x.SENSITIVE_STRING
            },
            ...A.evaluationConfig && {
                evaluationConfig: Ro1(A.evaluationConfig)
            },
            ...A.inferenceConfig && {
                inferenceConfig: yo1(A.inferenceConfig)
            }
        }), "GetEvaluationJobResponseFilterSensitiveLog"),
        $3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/evaluation-jobs/batch-delete");
            let D;
            return D = JSON.stringify(x.take(A, {
                jobIdentifiers: n((G) => x._json(G), "jobIdentifiers")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_BatchDeleteEvaluationJobCommand"),
        q3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/custom-models/create-custom-model");
            let D;
            return D = JSON.stringify(x.take(A, {
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                modelKmsKeyArn: [],
                modelName: [],
                modelSourceConfig: n((G) => x._json(G), "modelSourceConfig"),
                modelTags: n((G) => x._json(G), "modelTags"),
                roleArn: []
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateCustomModelCommand"),
        N3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/evaluation-jobs");
            let D;
            return D = JSON.stringify(x.take(A, {
                applicationType: [],
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                customerEncryptionKeyId: [],
                evaluationConfig: n((G) => IDQ(G, B), "evaluationConfig"),
                inferenceConfig: n((G) => YDQ(G, B), "inferenceConfig"),
                jobDescription: [],
                jobName: [],
                jobTags: n((G) => x._json(G), "jobTags"),
                outputDataConfig: n((G) => x._json(G), "outputDataConfig"),
                roleArn: []
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateEvaluationJobCommand"),
        L3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/create-foundation-model-agreement");
            let D;
            return D = JSON.stringify(x.take(A, {
                modelId: [],
                offerToken: []
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateFoundationModelAgreementCommand"),
        M3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/guardrails");
            let D;
            return D = JSON.stringify(x.take(A, {
                blockedInputMessaging: [],
                blockedOutputsMessaging: [],
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                contentPolicyConfig: n((G) => x._json(G), "contentPolicyConfig"),
                contextualGroundingPolicyConfig: n((G) => SWA(G, B), "contextualGroundingPolicyConfig"),
                crossRegionConfig: n((G) => x._json(G), "crossRegionConfig"),
                description: [],
                kmsKeyId: [],
                name: [],
                sensitiveInformationPolicyConfig: n((G) => x._json(G), "sensitiveInformationPolicyConfig"),
                tags: n((G) => x._json(G), "tags"),
                topicPolicyConfig: n((G) => x._json(G), "topicPolicyConfig"),
                wordPolicyConfig: n((G) => x._json(G), "wordPolicyConfig")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateGuardrailCommand"),
        R3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/guardrails/{guardrailIdentifier}"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1);
            let D;
            return D = JSON.stringify(x.take(A, {
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                description: []
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateGuardrailVersionCommand"),
        O3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/inference-profiles");
            let D;
            return D = JSON.stringify(x.take(A, {
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                description: [],
                inferenceProfileName: [],
                modelSource: n((G) => x._json(G), "modelSource"),
                tags: n((G) => x._json(G), "tags")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateInferenceProfileCommand"),
        T3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/marketplace-model/endpoints");
            let D;
            return D = JSON.stringify(x.take(A, {
                acceptEula: [],
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                endpointConfig: n((G) => x._json(G), "endpointConfig"),
                endpointName: [],
                modelSourceIdentifier: [],
                tags: n((G) => x._json(G), "tags")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateMarketplaceModelEndpointCommand"),
        P3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/model-copy-jobs");
            let D;
            return D = JSON.stringify(x.take(A, {
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                modelKmsKeyId: [],
                sourceModelArn: [],
                targetModelName: [],
                targetModelTags: n((G) => x._json(G), "targetModelTags")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateModelCopyJobCommand"),
        S3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/model-customization-jobs");
            let D;
            return D = JSON.stringify(x.take(A, {
                baseModelIdentifier: [],
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                customModelKmsKeyId: [],
                customModelName: [],
                customModelTags: n((G) => x._json(G), "customModelTags"),
                customizationConfig: n((G) => x._json(G), "customizationConfig"),
                customizationType: [],
                hyperParameters: n((G) => x._json(G), "hyperParameters"),
                jobName: [],
                jobTags: n((G) => x._json(G), "jobTags"),
                outputDataConfig: n((G) => x._json(G), "outputDataConfig"),
                roleArn: [],
                trainingDataConfig: n((G) => x._json(G), "trainingDataConfig"),
                validationDataConfig: n((G) => x._json(G), "validationDataConfig"),
                vpcConfig: n((G) => x._json(G), "vpcConfig")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateModelCustomizationJobCommand"),
        j3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/model-import-jobs");
            let D;
            return D = JSON.stringify(x.take(A, {
                clientRequestToken: [],
                importedModelKmsKeyId: [],
                importedModelName: [],
                importedModelTags: n((G) => x._json(G), "importedModelTags"),
                jobName: [],
                jobTags: n((G) => x._json(G), "jobTags"),
                modelDataSource: n((G) => x._json(G), "modelDataSource"),
                roleArn: [],
                vpcConfig: n((G) => x._json(G), "vpcConfig")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateModelImportJobCommand"),
        k3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/model-invocation-job");
            let D;
            return D = JSON.stringify(x.take(A, {
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                inputDataConfig: n((G) => x._json(G), "inputDataConfig"),
                jobName: [],
                modelId: [],
                outputDataConfig: n((G) => x._json(G), "outputDataConfig"),
                roleArn: [],
                tags: n((G) => x._json(G), "tags"),
                timeoutDurationInHours: [],
                vpcConfig: n((G) => x._json(G), "vpcConfig")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateModelInvocationJobCommand"),
        y3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/prompt-routers");
            let D;
            return D = JSON.stringify(x.take(A, {
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                description: [],
                fallbackModel: n((G) => x._json(G), "fallbackModel"),
                models: n((G) => x._json(G), "models"),
                promptRouterName: [],
                routingCriteria: n((G) => TDQ(G, B), "routingCriteria"),
                tags: n((G) => x._json(G), "tags")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreatePromptRouterCommand"),
        _3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/provisioned-model-throughput");
            let D;
            return D = JSON.stringify(x.take(A, {
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                commitmentDuration: [],
                modelId: [],
                modelUnits: [],
                provisionedModelName: [],
                tags: n((G) => x._json(G), "tags")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_CreateProvisionedModelThroughputCommand"),
        x3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/custom-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
            let D;
            return Q.m("DELETE").h(Z).b(D), Q.build()
        }, "se_DeleteCustomModelCommand"),
        v3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/delete-foundation-model-agreement");
            let D;
            return D = JSON.stringify(x.take(A, {
                modelId: []
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_DeleteFoundationModelAgreementCommand"),
        b3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/guardrails/{guardrailIdentifier}"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1);
            let D = x.map({
                    [rH1]: [, A[rH1]]
                }),
                G;
            return Q.m("DELETE").h(Z).q(D).b(G), Q.build()
        }, "se_DeleteGuardrailCommand"),
        f3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/imported-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
            let D;
            return Q.m("DELETE").h(Z).b(D), Q.build()
        }, "se_DeleteImportedModelCommand"),
        h3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/inference-profiles/{inferenceProfileIdentifier}"), Q.p("inferenceProfileIdentifier", () => A.inferenceProfileIdentifier, "{inferenceProfileIdentifier}", !1);
            let D;
            return Q.m("DELETE").h(Z).b(D), Q.build()
        }, "se_DeleteInferenceProfileCommand"),
        g3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/marketplace-model/endpoints/{endpointArn}"), Q.p("endpointArn", () => A.endpointArn, "{endpointArn}", !1);
            let D;
            return Q.m("DELETE").h(Z).b(D), Q.build()
        }, "se_DeleteMarketplaceModelEndpointCommand"),
        u3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/logging/modelinvocations");
            let D;
            return Q.m("DELETE").h(Z).b(D), Q.build()
        }, "se_DeleteModelInvocationLoggingConfigurationCommand"),
        m3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/prompt-routers/{promptRouterArn}"), Q.p("promptRouterArn", () => A.promptRouterArn, "{promptRouterArn}", !1);
            let D;
            return Q.m("DELETE").h(Z).b(D), Q.build()
        }, "se_DeletePromptRouterCommand"),
        d3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/provisioned-model-throughput/{provisionedModelId}"), Q.p("provisionedModelId", () => A.provisionedModelId, "{provisionedModelId}", !1);
            let D;
            return Q.m("DELETE").h(Z).b(D), Q.build()
        }, "se_DeleteProvisionedModelThroughputCommand"),
        c3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/marketplace-model/endpoints/{endpointArn}/registration"), Q.p("endpointArn", () => A.endpointArn, "{endpointArn}", !1);
            let D;
            return Q.m("DELETE").h(Z).b(D), Q.build()
        }, "se_DeregisterMarketplaceModelEndpointCommand"),
        l3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/custom-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetCustomModelCommand"),
        p3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/evaluation-jobs/{jobIdentifier}"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetEvaluationJobCommand"),
        i3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/foundation-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetFoundationModelCommand"),
        n3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/foundation-model-availability/{modelId}"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetFoundationModelAvailabilityCommand"),
        a3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/guardrails/{guardrailIdentifier}"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1);
            let D = x.map({
                    [rH1]: [, A[rH1]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_GetGuardrailCommand"),
        s3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/imported-models/{modelIdentifier}"), Q.p("modelIdentifier", () => A.modelIdentifier, "{modelIdentifier}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetImportedModelCommand"),
        r3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/inference-profiles/{inferenceProfileIdentifier}"), Q.p("inferenceProfileIdentifier", () => A.inferenceProfileIdentifier, "{inferenceProfileIdentifier}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetInferenceProfileCommand"),
        o3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/marketplace-model/endpoints/{endpointArn}"), Q.p("endpointArn", () => A.endpointArn, "{endpointArn}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetMarketplaceModelEndpointCommand"),
        t3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-copy-jobs/{jobArn}"), Q.p("jobArn", () => A.jobArn, "{jobArn}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetModelCopyJobCommand"),
        e3Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-customization-jobs/{jobIdentifier}"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetModelCustomizationJobCommand"),
        A7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-import-jobs/{jobIdentifier}"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetModelImportJobCommand"),
        B7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-invocation-job/{jobIdentifier}"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetModelInvocationJobCommand"),
        Q7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/logging/modelinvocations");
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetModelInvocationLoggingConfigurationCommand"),
        Z7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/prompt-routers/{promptRouterArn}"), Q.p("promptRouterArn", () => A.promptRouterArn, "{promptRouterArn}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetPromptRouterCommand"),
        D7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/provisioned-model-throughput/{provisionedModelId}"), Q.p("provisionedModelId", () => A.provisionedModelId, "{provisionedModelId}", !1);
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetProvisionedModelThroughputCommand"),
        G7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/use-case-for-model-access");
            let D;
            return Q.m("GET").h(Z).b(D), Q.build()
        }, "se_GetUseCaseForModelAccessCommand"),
        F7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/custom-models");
            let D = x.map({
                    [EV]: [() => A.creationTimeBefore !== void 0, () => x.serializeDateTime(A[EV]).toString()],
                    [zV]: [() => A.creationTimeAfter !== void 0, () => x.serializeDateTime(A[zV]).toString()],
                    [UV]: [, A[UV]],
                    [mIA]: [, A[mIA]],
                    [lIA]: [, A[lIA]],
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [dW]: [, A[dW]],
                    [cW]: [, A[cW]],
                    [iIA]: [() => A.isOwned !== void 0, () => A[iIA].toString()],
                    [aIA]: [, A[aIA]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListCustomModelsCommand"),
        I7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/evaluation-jobs");
            let D = x.map({
                    [zV]: [() => A.creationTimeAfter !== void 0, () => x.serializeDateTime(A[zV]).toString()],
                    [EV]: [() => A.creationTimeBefore !== void 0, () => x.serializeDateTime(A[EV]).toString()],
                    [Xz]: [, A[Xz]],
                    [hIA]: [, A[hIA]],
                    [UV]: [, A[UV]],
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [dW]: [, A[dW]],
                    [cW]: [, A[cW]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListEvaluationJobsCommand"),
        Y7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/list-foundation-model-agreement-offers/{modelId}"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
            let D = x.map({
                    [sIA]: [, A[sIA]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListFoundationModelAgreementOffersCommand"),
        W7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/foundation-models");
            let D = x.map({
                    [cIA]: [, A[cIA]],
                    [gIA]: [, A[gIA]],
                    [dIA]: [, A[dIA]],
                    [uIA]: [, A[uIA]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListFoundationModelsCommand"),
        J7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/guardrails");
            let D = x.map({
                    [pIA]: [, A[pIA]],
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListGuardrailsCommand"),
        X7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/imported-models");
            let D = x.map({
                    [EV]: [() => A.creationTimeBefore !== void 0, () => x.serializeDateTime(A[EV]).toString()],
                    [zV]: [() => A.creationTimeAfter !== void 0, () => x.serializeDateTime(A[zV]).toString()],
                    [UV]: [, A[UV]],
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [dW]: [, A[dW]],
                    [cW]: [, A[cW]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListImportedModelsCommand"),
        V7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/inference-profiles");
            let D = x.map({
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [Lo1]: [, A[mGQ]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListInferenceProfilesCommand"),
        C7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/marketplace-model/endpoints");
            let D = x.map({
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [gGQ]: [, A[hGQ]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListMarketplaceModelEndpointsCommand"),
        K7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-copy-jobs");
            let D = x.map({
                    [zV]: [() => A.creationTimeAfter !== void 0, () => x.serializeDateTime(A[zV]).toString()],
                    [EV]: [() => A.creationTimeBefore !== void 0, () => x.serializeDateTime(A[EV]).toString()],
                    [Xz]: [, A[Xz]],
                    [rIA]: [, A[rIA]],
                    [oIA]: [, A[oIA]],
                    [uGQ]: [, A[dGQ]],
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [dW]: [, A[dW]],
                    [cW]: [, A[cW]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListModelCopyJobsCommand"),
        H7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-customization-jobs");
            let D = x.map({
                    [zV]: [() => A.creationTimeAfter !== void 0, () => x.serializeDateTime(A[zV]).toString()],
                    [EV]: [() => A.creationTimeBefore !== void 0, () => x.serializeDateTime(A[EV]).toString()],
                    [Xz]: [, A[Xz]],
                    [UV]: [, A[UV]],
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [dW]: [, A[dW]],
                    [cW]: [, A[cW]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListModelCustomizationJobsCommand"),
        z7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-import-jobs");
            let D = x.map({
                    [zV]: [() => A.creationTimeAfter !== void 0, () => x.serializeDateTime(A[zV]).toString()],
                    [EV]: [() => A.creationTimeBefore !== void 0, () => x.serializeDateTime(A[EV]).toString()],
                    [Xz]: [, A[Xz]],
                    [UV]: [, A[UV]],
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [dW]: [, A[dW]],
                    [cW]: [, A[cW]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListModelImportJobsCommand"),
        E7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-invocation-jobs");
            let D = x.map({
                    [tIA]: [() => A.submitTimeAfter !== void 0, () => x.serializeDateTime(A[tIA]).toString()],
                    [eIA]: [() => A.submitTimeBefore !== void 0, () => x.serializeDateTime(A[eIA]).toString()],
                    [Xz]: [, A[Xz]],
                    [UV]: [, A[UV]],
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [dW]: [, A[dW]],
                    [cW]: [, A[cW]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListModelInvocationJobsCommand"),
        U7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/prompt-routers");
            let D = x.map({
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [Lo1]: [, A[Lo1]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListPromptRoutersCommand"),
        w7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/provisioned-model-throughputs");
            let D = x.map({
                    [zV]: [() => A.creationTimeAfter !== void 0, () => x.serializeDateTime(A[zV]).toString()],
                    [EV]: [() => A.creationTimeBefore !== void 0, () => x.serializeDateTime(A[EV]).toString()],
                    [Xz]: [, A[Xz]],
                    [nIA]: [, A[nIA]],
                    [UV]: [, A[UV]],
                    [WZ]: [() => A.maxResults !== void 0, () => A[WZ].toString()],
                    [JZ]: [, A[JZ]],
                    [dW]: [, A[dW]],
                    [cW]: [, A[cW]]
                }),
                G;
            return Q.m("GET").h(Z).q(D).b(G), Q.build()
        }, "se_ListProvisionedModelThroughputsCommand"),
        $7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/listTagsForResource");
            let D;
            return D = JSON.stringify(x.take(A, {
                resourceARN: []
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_ListTagsForResourceCommand"),
        q7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/logging/modelinvocations");
            let D;
            return D = JSON.stringify(x.take(A, {
                loggingConfig: n((G) => x._json(G), "loggingConfig")
            })), Q.m("PUT").h(Z).b(D), Q.build()
        }, "se_PutModelInvocationLoggingConfigurationCommand"),
        N7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/use-case-for-model-access");
            let D;
            return D = JSON.stringify(x.take(A, {
                formData: n((G) => B.base64Encoder(G), "formData")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_PutUseCaseForModelAccessCommand"),
        L7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/marketplace-model/endpoints/{endpointIdentifier}/registration"), Q.p("endpointIdentifier", () => A.endpointIdentifier, "{endpointIdentifier}", !1);
            let D;
            return D = JSON.stringify(x.take(A, {
                modelSourceIdentifier: []
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_RegisterMarketplaceModelEndpointCommand"),
        M7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/evaluation-job/{jobIdentifier}/stop"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
            let D;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_StopEvaluationJobCommand"),
        R7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-customization-jobs/{jobIdentifier}/stop"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
            let D;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_StopModelCustomizationJobCommand"),
        O7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {};
            Q.bp("/model-invocation-job/{jobIdentifier}/stop"), Q.p("jobIdentifier", () => A.jobIdentifier, "{jobIdentifier}", !1);
            let D;
            return Q.m("POST").h(Z).b(D), Q.build()
        }, "se_StopModelInvocationJobCommand"),
        T7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/tagResource");
            let D;
            return D = JSON.stringify(x.take(A, {
                resourceARN: [],
                tags: n((G) => x._json(G), "tags")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_TagResourceCommand"),
        P7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/untagResource");
            let D;
            return D = JSON.stringify(x.take(A, {
                resourceARN: [],
                tagKeys: n((G) => x._json(G), "tagKeys")
            })), Q.m("POST").h(Z).b(D), Q.build()
        }, "se_UntagResourceCommand"),
        S7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/guardrails/{guardrailIdentifier}"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1);
            let D;
            return D = JSON.stringify(x.take(A, {
                blockedInputMessaging: [],
                blockedOutputsMessaging: [],
                contentPolicyConfig: n((G) => x._json(G), "contentPolicyConfig"),
                contextualGroundingPolicyConfig: n((G) => SWA(G, B), "contextualGroundingPolicyConfig"),
                crossRegionConfig: n((G) => x._json(G), "crossRegionConfig"),
                description: [],
                kmsKeyId: [],
                name: [],
                sensitiveInformationPolicyConfig: n((G) => x._json(G), "sensitiveInformationPolicyConfig"),
                topicPolicyConfig: n((G) => x._json(G), "topicPolicyConfig"),
                wordPolicyConfig: n((G) => x._json(G), "wordPolicyConfig")
            })), Q.m("PUT").h(Z).b(D), Q.build()
        }, "se_UpdateGuardrailCommand"),
        j7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/marketplace-model/endpoints/{endpointArn}"), Q.p("endpointArn", () => A.endpointArn, "{endpointArn}", !1);
            let D;
            return D = JSON.stringify(x.take(A, {
                clientRequestToken: [!0, (G) => G ?? Vz.v4()],
                endpointConfig: n((G) => x._json(G), "endpointConfig")
            })), Q.m("PATCH").h(Z).b(D), Q.build()
        }, "se_UpdateMarketplaceModelEndpointCommand"),
        k7Q = n(async (A, B) => {
            let Q = L2.requestBuilder(A, B),
                Z = {
                    "content-type": "application/json"
                };
            Q.bp("/provisioned-model-throughput/{provisionedModelId}"), Q.p("provisionedModelId", () => A.provisionedModelId, "{provisionedModelId}", !1);
            let D;
            return D = JSON.stringify(x.take(A, {
                desiredModelId: [],
                desiredProvisionedModelName: []
            })), Q.m("PATCH").h(Z).b(D), Q.build()
        }, "se_UpdateProvisionedModelThroughputCommand"),
        y7Q = n(async (A, B) => {
            if (A.statusCode !== 202 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    errors: x._json,
                    evaluationJobs: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_BatchDeleteEvaluationJobCommand"),
        _7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelArn: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateCustomModelCommand"),
        x7Q = n(async (A, B) => {
            if (A.statusCode !== 202 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    jobArn: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateEvaluationJobCommand"),
        v7Q = n(async (A, B) => {
            if (A.statusCode !== 202 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelId: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateFoundationModelAgreementCommand"),
        b7Q = n(async (A, B) => {
            if (A.statusCode !== 202 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    createdAt: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "createdAt"),
                    guardrailArn: x.expectString,
                    guardrailId: x.expectString,
                    version: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateGuardrailCommand"),
        f7Q = n(async (A, B) => {
            if (A.statusCode !== 202 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    guardrailId: x.expectString,
                    version: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateGuardrailVersionCommand"),
        h7Q = n(async (A, B) => {
            if (A.statusCode !== 201 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    inferenceProfileArn: x.expectString,
                    status: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateInferenceProfileCommand"),
        g7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    marketplaceModelEndpoint: n((G) => eH1(G, B), "marketplaceModelEndpoint")
                });
            return Object.assign(Q, D), Q
        }, "de_CreateMarketplaceModelEndpointCommand"),
        u7Q = n(async (A, B) => {
            if (A.statusCode !== 201 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    jobArn: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateModelCopyJobCommand"),
        m7Q = n(async (A, B) => {
            if (A.statusCode !== 201 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    jobArn: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateModelCustomizationJobCommand"),
        d7Q = n(async (A, B) => {
            if (A.statusCode !== 201 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    jobArn: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateModelImportJobCommand"),
        c7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    jobArn: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateModelInvocationJobCommand"),
        l7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    promptRouterArn: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreatePromptRouterCommand"),
        p7Q = n(async (A, B) => {
            if (A.statusCode !== 201 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    provisionedModelArn: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_CreateProvisionedModelThroughputCommand"),
        i7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeleteCustomModelCommand"),
        n7Q = n(async (A, B) => {
            if (A.statusCode !== 202 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeleteFoundationModelAgreementCommand"),
        a7Q = n(async (A, B) => {
            if (A.statusCode !== 202 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeleteGuardrailCommand"),
        s7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeleteImportedModelCommand"),
        r7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeleteInferenceProfileCommand"),
        o7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeleteMarketplaceModelEndpointCommand"),
        t7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeleteModelInvocationLoggingConfigurationCommand"),
        e7Q = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeletePromptRouterCommand"),
        AZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeleteProvisionedModelThroughputCommand"),
        BZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_DeregisterMarketplaceModelEndpointCommand"),
        QZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    baseModelArn: x.expectString,
                    creationTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "creationTime"),
                    customizationConfig: n((G) => x._json(VB.awsExpectUnion(G)), "customizationConfig"),
                    customizationType: x.expectString,
                    failureMessage: x.expectString,
                    hyperParameters: x._json,
                    jobArn: x.expectString,
                    jobName: x.expectString,
                    modelArn: x.expectString,
                    modelKmsKeyArn: x.expectString,
                    modelName: x.expectString,
                    modelStatus: x.expectString,
                    outputDataConfig: x._json,
                    trainingDataConfig: x._json,
                    trainingMetrics: n((G) => hWA(G, B), "trainingMetrics"),
                    validationDataConfig: x._json,
                    validationMetrics: n((G) => gWA(G, B), "validationMetrics")
                });
            return Object.assign(Q, D), Q
        }, "de_GetCustomModelCommand"),
        ZZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    applicationType: x.expectString,
                    creationTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "creationTime"),
                    customerEncryptionKeyId: x.expectString,
                    evaluationConfig: n((G) => dDQ(VB.awsExpectUnion(G), B), "evaluationConfig"),
                    failureMessages: x._json,
                    inferenceConfig: n((G) => cDQ(VB.awsExpectUnion(G), B), "inferenceConfig"),
                    jobArn: x.expectString,
                    jobDescription: x.expectString,
                    jobName: x.expectString,
                    jobType: x.expectString,
                    lastModifiedTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "lastModifiedTime"),
                    outputDataConfig: x._json,
                    roleArn: x.expectString,
                    status: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_GetEvaluationJobCommand"),
        DZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelDetails: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetFoundationModelCommand"),
        GZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    agreementAvailability: x._json,
                    authorizationStatus: x.expectString,
                    entitlementAvailability: x.expectString,
                    modelId: x.expectString,
                    regionAvailability: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_GetFoundationModelAvailabilityCommand"),
        FZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    blockedInputMessaging: x.expectString,
                    blockedOutputsMessaging: x.expectString,
                    contentPolicy: x._json,
                    contextualGroundingPolicy: n((G) => AGQ(G, B), "contextualGroundingPolicy"),
                    createdAt: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "createdAt"),
                    crossRegionDetails: x._json,
                    description: x.expectString,
                    failureRecommendations: x._json,
                    guardrailArn: x.expectString,
                    guardrailId: x.expectString,
                    kmsKeyArn: x.expectString,
                    name: x.expectString,
                    sensitiveInformationPolicy: x._json,
                    status: x.expectString,
                    statusReasons: x._json,
                    topicPolicy: x._json,
                    updatedAt: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "updatedAt"),
                    version: x.expectString,
                    wordPolicy: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetGuardrailCommand"),
        IZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    creationTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "creationTime"),
                    customModelUnits: x._json,
                    instructSupported: x.expectBoolean,
                    jobArn: x.expectString,
                    jobName: x.expectString,
                    modelArchitecture: x.expectString,
                    modelArn: x.expectString,
                    modelDataSource: n((G) => x._json(VB.awsExpectUnion(G)), "modelDataSource"),
                    modelKmsKeyArn: x.expectString,
                    modelName: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_GetImportedModelCommand"),
        YZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    createdAt: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "createdAt"),
                    description: x.expectString,
                    inferenceProfileArn: x.expectString,
                    inferenceProfileId: x.expectString,
                    inferenceProfileName: x.expectString,
                    models: x._json,
                    status: x.expectString,
                    type: x.expectString,
                    updatedAt: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "updatedAt")
                });
            return Object.assign(Q, D), Q
        }, "de_GetInferenceProfileCommand"),
        WZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    marketplaceModelEndpoint: n((G) => eH1(G, B), "marketplaceModelEndpoint")
                });
            return Object.assign(Q, D), Q
        }, "de_GetMarketplaceModelEndpointCommand"),
        JZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    creationTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "creationTime"),
                    failureMessage: x.expectString,
                    jobArn: x.expectString,
                    sourceAccountId: x.expectString,
                    sourceModelArn: x.expectString,
                    sourceModelName: x.expectString,
                    status: x.expectString,
                    targetModelArn: x.expectString,
                    targetModelKmsKeyArn: x.expectString,
                    targetModelName: x.expectString,
                    targetModelTags: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetModelCopyJobCommand"),
        XZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    baseModelArn: x.expectString,
                    clientRequestToken: x.expectString,
                    creationTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "creationTime"),
                    customizationConfig: n((G) => x._json(VB.awsExpectUnion(G)), "customizationConfig"),
                    customizationType: x.expectString,
                    endTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "endTime"),
                    failureMessage: x.expectString,
                    hyperParameters: x._json,
                    jobArn: x.expectString,
                    jobName: x.expectString,
                    lastModifiedTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "lastModifiedTime"),
                    outputDataConfig: x._json,
                    outputModelArn: x.expectString,
                    outputModelKmsKeyArn: x.expectString,
                    outputModelName: x.expectString,
                    roleArn: x.expectString,
                    status: x.expectString,
                    statusDetails: n((G) => fWA(G, B), "statusDetails"),
                    trainingDataConfig: x._json,
                    trainingMetrics: n((G) => hWA(G, B), "trainingMetrics"),
                    validationDataConfig: x._json,
                    validationMetrics: n((G) => gWA(G, B), "validationMetrics"),
                    vpcConfig: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetModelCustomizationJobCommand"),
        VZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    creationTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "creationTime"),
                    endTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "endTime"),
                    failureMessage: x.expectString,
                    importedModelArn: x.expectString,
                    importedModelKmsKeyArn: x.expectString,
                    importedModelName: x.expectString,
                    jobArn: x.expectString,
                    jobName: x.expectString,
                    lastModifiedTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "lastModifiedTime"),
                    modelDataSource: n((G) => x._json(VB.awsExpectUnion(G)), "modelDataSource"),
                    roleArn: x.expectString,
                    status: x.expectString,
                    vpcConfig: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetModelImportJobCommand"),
        CZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    clientRequestToken: x.expectString,
                    endTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "endTime"),
                    inputDataConfig: n((G) => x._json(VB.awsExpectUnion(G)), "inputDataConfig"),
                    jobArn: x.expectString,
                    jobExpirationTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "jobExpirationTime"),
                    jobName: x.expectString,
                    lastModifiedTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "lastModifiedTime"),
                    message: x.expectString,
                    modelId: x.expectString,
                    outputDataConfig: n((G) => x._json(VB.awsExpectUnion(G)), "outputDataConfig"),
                    roleArn: x.expectString,
                    status: x.expectString,
                    submitTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "submitTime"),
                    timeoutDurationInHours: x.expectInt32,
                    vpcConfig: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetModelInvocationJobCommand"),
        KZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    loggingConfig: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_GetModelInvocationLoggingConfigurationCommand"),
        HZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    createdAt: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "createdAt"),
                    description: x.expectString,
                    fallbackModel: x._json,
                    models: x._json,
                    promptRouterArn: x.expectString,
                    promptRouterName: x.expectString,
                    routingCriteria: n((G) => bWA(G, B), "routingCriteria"),
                    status: x.expectString,
                    type: x.expectString,
                    updatedAt: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "updatedAt")
                });
            return Object.assign(Q, D), Q
        }, "de_GetPromptRouterCommand"),
        zZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    commitmentDuration: x.expectString,
                    commitmentExpirationTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "commitmentExpirationTime"),
                    creationTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "creationTime"),
                    desiredModelArn: x.expectString,
                    desiredModelUnits: x.expectInt32,
                    failureMessage: x.expectString,
                    foundationModelArn: x.expectString,
                    lastModifiedTime: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "lastModifiedTime"),
                    modelArn: x.expectString,
                    modelUnits: x.expectInt32,
                    provisionedModelArn: x.expectString,
                    provisionedModelName: x.expectString,
                    status: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_GetProvisionedModelThroughputCommand"),
        EZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    formData: B.base64Decoder
                });
            return Object.assign(Q, D), Q
        }, "de_GetUseCaseForModelAccessCommand"),
        UZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelSummaries: n((G) => uDQ(G, B), "modelSummaries"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListCustomModelsCommand"),
        wZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    jobSummaries: n((G) => lDQ(G, B), "jobSummaries"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListEvaluationJobsCommand"),
        $ZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelId: x.expectString,
                    offers: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_ListFoundationModelAgreementOffersCommand"),
        qZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelSummaries: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_ListFoundationModelsCommand"),
        NZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    guardrails: n((G) => BGQ(G, B), "guardrails"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListGuardrailsCommand"),
        LZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelSummaries: n((G) => DGQ(G, B), "modelSummaries"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListImportedModelsCommand"),
        MZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    inferenceProfileSummaries: n((G) => GGQ(G, B), "inferenceProfileSummaries"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListInferenceProfilesCommand"),
        RZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    marketplaceModelEndpoints: n((G) => JGQ(G, B), "marketplaceModelEndpoints"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListMarketplaceModelEndpointsCommand"),
        OZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelCopyJobSummaries: n((G) => VGQ(G, B), "modelCopyJobSummaries"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListModelCopyJobsCommand"),
        TZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelCustomizationJobSummaries: n((G) => KGQ(G, B), "modelCustomizationJobSummaries"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListModelCustomizationJobsCommand"),
        PZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    modelImportJobSummaries: n((G) => zGQ(G, B), "modelImportJobSummaries"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListModelImportJobsCommand"),
        SZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    invocationJobSummaries: n((G) => UGQ(G, B), "invocationJobSummaries"),
                    nextToken: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_ListModelInvocationJobsCommand"),
        jZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    nextToken: x.expectString,
                    promptRouterSummaries: n((G) => $GQ(G, B), "promptRouterSummaries")
                });
            return Object.assign(Q, D), Q
        }, "de_ListPromptRoutersCommand"),
        kZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    nextToken: x.expectString,
                    provisionedModelSummaries: n((G) => NGQ(G, B), "provisionedModelSummaries")
                });
            return Object.assign(Q, D), Q
        }, "de_ListProvisionedModelThroughputsCommand"),
        yZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    tags: x._json
                });
            return Object.assign(Q, D), Q
        }, "de_ListTagsForResourceCommand"),
        _ZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_PutModelInvocationLoggingConfigurationCommand"),
        xZQ = n(async (A, B) => {
            if (A.statusCode !== 201 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_PutUseCaseForModelAccessCommand"),
        vZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    marketplaceModelEndpoint: n((G) => eH1(G, B), "marketplaceModelEndpoint")
                });
            return Object.assign(Q, D), Q
        }, "de_RegisterMarketplaceModelEndpointCommand"),
        bZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_StopEvaluationJobCommand"),
        fZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_StopModelCustomizationJobCommand"),
        hZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_StopModelInvocationJobCommand"),
        gZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_TagResourceCommand"),
        uZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_UntagResourceCommand"),
        mZQ = n(async (A, B) => {
            if (A.statusCode !== 202 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    guardrailArn: x.expectString,
                    guardrailId: x.expectString,
                    updatedAt: n((G) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(G)), "updatedAt"),
                    version: x.expectString
                });
            return Object.assign(Q, D), Q
        }, "de_UpdateGuardrailCommand"),
        dZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                    $metadata: l2(A)
                }),
                Z = x.expectNonNull(x.expectObject(await VB.parseJsonBody(A.body, B)), "body"),
                D = x.take(Z, {
                    marketplaceModelEndpoint: n((G) => eH1(G, B), "marketplaceModelEndpoint")
                });
            return Object.assign(Q, D), Q
        }, "de_UpdateMarketplaceModelEndpointCommand"),
        cZQ = n(async (A, B) => {
            if (A.statusCode !== 200 && A.statusCode >= 300) return PB(A, B);
            let Q = x.map({
                $metadata: l2(A)
            });
            return await x.collectBody(A.body, B), Q
        }, "de_UpdateProvisionedModelThroughputCommand"),
        PB = n(async (A, B) => {
            let Q = {
                    ...A,
                    body: await VB.parseJsonErrorBody(A.body, B)
                },
                Z = VB.loadRestJsonErrorCode(A, Q.body);
            switch (Z) {
                case "AccessDeniedException":
                case "com.amazonaws.bedrock#AccessDeniedException":
                    throw await pZQ(Q, B);
                case "ConflictException":
                case "com.amazonaws.bedrock#ConflictException":
                    throw await iZQ(Q, B);
                case "InternalServerException":
                case "com.amazonaws.bedrock#InternalServerException":
                    throw await nZQ(Q, B);
                case "ResourceNotFoundException":
                case "com.amazonaws.bedrock#ResourceNotFoundException":
                    throw await aZQ(Q, B);
                case "ThrottlingException":
                case "com.amazonaws.bedrock#ThrottlingException":
                    throw await oZQ(Q, B);
                case "ValidationException":
                case "com.amazonaws.bedrock#ValidationException":
                    throw await eZQ(Q, B);
                case "ServiceQuotaExceededException":
                case "com.amazonaws.bedrock#ServiceQuotaExceededException":
                    throw await sZQ(Q, B);
                case "TooManyTagsException":
                case "com.amazonaws.bedrock#TooManyTagsException":
                    throw await tZQ(Q, B);
                case "ServiceUnavailableException":
                case "com.amazonaws.bedrock#ServiceUnavailableException":
                    throw await rZQ(Q, B);
                default:
                    let D = Q.body;
                    return lZQ({
                        output: A,
                        parsedBody: D,
                        errorCode: Z
                    })
            }
        }, "de_CommandError"),
        lZQ = x.withBaseException(ww),
        pZQ = n(async (A, B) => {
            let Q = x.map({}),
                Z = A.body,
                D = x.take(Z, {
                    message: x.expectString
                });
            Object.assign(Q, D);
            let G = new BYA({
                $metadata: l2(A),
                ...Q
            });
            return x.decorateServiceException(G, A.body)
        }, "de_AccessDeniedExceptionRes"),
        iZQ = n(async (A, B) => {
            let Q = x.map({}),
                Z = A.body,
                D = x.take(Z, {
                    message: x.expectString
                });
            Object.assign(Q, D);
            let G = new FYA({
                $metadata: l2(A),
                ...Q
            });
            return x.decorateServiceException(G, A.body)
        }, "de_ConflictExceptionRes"),
        nZQ = n(async (A, B) => {
            let Q = x.map({}),
                Z = A.body,
                D = x.take(Z, {
                    message: x.expectString
                });
            Object.assign(Q, D);
            let G = new QYA({
                $metadata: l2(A),
                ...Q
            });
            return x.decorateServiceException(G, A.body)
        }, "de_InternalServerExceptionRes"),
        aZQ = n(async (A, B) => {
            let Q = x.map({}),
                Z = A.body,
                D = x.take(Z, {
                    message: x.expectString
                });
            Object.assign(Q, D);
            let G = new ZYA({
                $metadata: l2(A),
                ...Q
            });
            return x.decorateServiceException(G, A.body)
        }, "de_ResourceNotFoundExceptionRes"),
        sZQ = n(async (A, B) => {
            let Q = x.map({}),
                Z = A.body,
                D = x.take(Z, {
                    message: x.expectString
                });
            Object.assign(Q, D);
            let G = new IYA({
                $metadata: l2(A),
                ...Q
            });
            return x.decorateServiceException(G, A.body)
        }, "de_ServiceQuotaExceededExceptionRes"),
        rZQ = n(async (A, B) => {
            let Q = x.map({}),
                Z = A.body,
                D = x.take(Z, {
                    message: x.expectString
                });
            Object.assign(Q, D);
            let G = new YYA({
                $metadata: l2(A),
                ...Q
            });
            return x.decorateServiceException(G, A.body)
        }, "de_ServiceUnavailableExceptionRes"),
        oZQ = n(async (A, B) => {
            let Q = x.map({}),
                Z = A.body,
                D = x.take(Z, {
                    message: x.expectString
                });
            Object.assign(Q, D);
            let G = new DYA({
                $metadata: l2(A),
                ...Q
            });
            return x.decorateServiceException(G, A.body)
        }, "de_ThrottlingExceptionRes"),
        tZQ = n(async (A, B) => {
            let Q = x.map({}),
                Z = A.body,
                D = x.take(Z, {
                    message: x.expectString,
                    resourceName: x.expectString
                });
            Object.assign(Q, D);
            let G = new WYA({
                $metadata: l2(A),
                ...Q
            });
            return x.decorateServiceException(G, A.body)
        }, "de_TooManyTagsExceptionRes"),
        eZQ = n(async (A, B) => {
            let Q = x.map({}),
                Z = A.body,
                D = x.take(Z, {
                    message: x.expectString
                });
            Object.assign(Q, D);
            let G = new GYA({
                $metadata: l2(A),
                ...Q
            });
            return x.decorateServiceException(G, A.body)
        }, "de_ValidationExceptionRes"),
        _o1 = n((A, B) => {
            return Object.entries(A).reduce((Q, [Z, D]) => {
                if (D === null) return Q;
                return Q[Z] = ADQ(D, B), Q
            }, {})
        }, "se_AdditionalModelRequestFields"),
        ADQ = n((A, B) => {
            return A
        }, "se_AdditionalModelRequestFieldsValue"),
        BDQ = n((A, B) => {
            return x.take(A, {
                customMetricConfig: n((Q) => QDQ(Q, B), "customMetricConfig"),
                datasetMetricConfigs: x._json,
                evaluatorModelConfig: x._json
            })
        }, "se_AutomatedEvaluationConfig"),
        QDQ = n((A, B) => {
            return x.take(A, {
                customMetrics: n((Q) => ZDQ(Q, B), "customMetrics"),
                evaluatorModelConfig: x._json
            })
        }, "se_AutomatedEvaluationCustomMetricConfig"),
        ZDQ = n((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return DDQ(Q, B)
            })
        }, "se_AutomatedEvaluationCustomMetrics"),
        DDQ = n((A, B) => {
            return lH1.visit(A, {
                customMetricDefinition: n((Q) => ({
                    customMetricDefinition: FDQ(Q, B)
                }), "customMetricDefinition"),
                _: n((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_AutomatedEvaluationCustomMetricSource"),
        GDQ = n((A, B) => {
            return x.take(A, {
                contentType: [],
                data: B.base64Encoder,
                identifier: []
            })
        }, "se_ByteContentDoc"),
        FDQ = n((A, B) => {
            return x.take(A, {
                instructions: [],
                name: [],
                ratingScale: n((Q) => NDQ(Q, B), "ratingScale")
            })
        }, "se_CustomMetricDefinition"),
        IDQ = n((A, B) => {
            return pH1.visit(A, {
                automated: n((Q) => ({
                    automated: BDQ(Q, B)
                }), "automated"),
                human: n((Q) => ({
                    human: x._json(Q)
                }), "human"),
                _: n((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_EvaluationConfig"),
        YDQ = n((A, B) => {
            return sH1.visit(A, {
                models: n((Q) => ({
                    models: x._json(Q)
                }), "models"),
                ragConfigs: n((Q) => ({
                    ragConfigs: qDQ(Q, B)
                }), "ragConfigs"),
                _: n((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_EvaluationInferenceConfig"),
        WDQ = n((A, B) => {
            return x.take(A, {
                byteContent: n((Q) => GDQ(Q, B), "byteContent"),
                s3Location: x._json,
                sourceType: []
            })
        }, "se_ExternalSource"),
        JDQ = n((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return WDQ(Q, B)
            })
        }, "se_ExternalSources"),
        XDQ = n((A, B) => {
            return x.take(A, {
                additionalModelRequestFields: n((Q) => _o1(Q, B), "additionalModelRequestFields"),
                guardrailConfiguration: x._json,
                kbInferenceConfig: n((Q) => jWA(Q, B), "kbInferenceConfig"),
                promptTemplate: x._json
            })
        }, "se_ExternalSourcesGenerationConfiguration"),
        VDQ = n((A, B) => {
            return x.take(A, {
                generationConfiguration: n((Q) => XDQ(Q, B), "generationConfiguration"),
                modelArn: [],
                sources: n((Q) => JDQ(Q, B), "sources")
            })
        }, "se_ExternalSourcesRetrieveAndGenerateConfiguration"),
        Ew = n((A, B) => {
            return x.take(A, {
                key: [],
                value: n((Q) => CDQ(Q, B), "value")
            })
        }, "se_FilterAttribute"),
        CDQ = n((A, B) => {
            return A
        }, "se_FilterValue"),
        KDQ = n((A, B) => {
            return x.take(A, {
                additionalModelRequestFields: n((Q) => _o1(Q, B), "additionalModelRequestFields"),
                guardrailConfiguration: x._json,
                kbInferenceConfig: n((Q) => jWA(Q, B), "kbInferenceConfig"),
                promptTemplate: x._json
            })
        }, "se_GenerationConfiguration"),
        HDQ = n((A, B) => {
            return x.take(A, {
                action: [],
                enabled: [],
                threshold: x.serializeFloat,
                type: []
            })
        }, "se_GuardrailContextualGroundingFilterConfig"),
        zDQ = n((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return HDQ(Q, B)
            })
        }, "se_GuardrailContextualGroundingFiltersConfig"),
        SWA = n((A, B) => {
            return x.take(A, {
                filtersConfig: n((Q) => zDQ(Q, B), "filtersConfig")
            })
        }, "se_GuardrailContextualGroundingPolicyConfig"),
        jWA = n((A, B) => {
            return x.take(A, {
                textInferenceConfig: n((Q) => PDQ(Q, B), "textInferenceConfig")
            })
        }, "se_KbInferenceConfig"),
        EDQ = n((A, B) => {
            return nH1.visit(A, {
                retrieveAndGenerateConfig: n((Q) => ({
                    retrieveAndGenerateConfig: RDQ(Q, B)
                }), "retrieveAndGenerateConfig"),
                retrieveConfig: n((Q) => ({
                    retrieveConfig: ODQ(Q, B)
                }), "retrieveConfig"),
                _: n((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_KnowledgeBaseConfig"),
        kWA = n((A, B) => {
            return x.take(A, {
                vectorSearchConfiguration: n((Q) => wDQ(Q, B), "vectorSearchConfiguration")
            })
        }, "se_KnowledgeBaseRetrievalConfiguration"),
        UDQ = n((A, B) => {
            return x.take(A, {
                generationConfiguration: n((Q) => KDQ(Q, B), "generationConfiguration"),
                knowledgeBaseId: [],
                modelArn: [],
                orchestrationConfiguration: x._json,
                retrievalConfiguration: n((Q) => kWA(Q, B), "retrievalConfiguration")
            })
        }, "se_KnowledgeBaseRetrieveAndGenerateConfiguration"),
        wDQ = n((A, B) => {
            return x.take(A, {
                filter: n((Q) => yWA(Q, B), "filter"),
                implicitFilterConfiguration: x._json,
                numberOfResults: [],
                overrideSearchType: [],
                rerankingConfiguration: n((Q) => kDQ(Q, B), "rerankingConfiguration")
            })
        }, "se_KnowledgeBaseVectorSearchConfiguration"),
        $DQ = n((A, B) => {
            return aH1.visit(A, {
                knowledgeBaseConfig: n((Q) => ({
                    knowledgeBaseConfig: EDQ(Q, B)
                }), "knowledgeBaseConfig"),
                precomputedRagSourceConfig: n((Q) => ({
                    precomputedRagSourceConfig: x._json(Q)
                }), "precomputedRagSourceConfig"),
                _: n((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_RAGConfig"),
        qDQ = n((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return $DQ(Q, B)
            })
        }, "se_RagConfigs"),
        NDQ = n((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return LDQ(Q, B)
            })
        }, "se_RatingScale"),
        LDQ = n((A, B) => {
            return x.take(A, {
                definition: [],
                value: n((Q) => MDQ(Q, B), "value")
            })
        }, "se_RatingScaleItem"),
        MDQ = n((A, B) => {
            return cH1.visit(A, {
                floatValue: n((Q) => ({
                    floatValue: x.serializeFloat(Q)
                }), "floatValue"),
                stringValue: n((Q) => ({
                    stringValue: Q
                }), "stringValue"),
                _: n((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_RatingScaleItemValue"),
        yWA = n((A, B) => {
            return iH1.visit(A, {
                andAll: n((Q) => ({
                    andAll: bIA(Q, B)
                }), "andAll"),
                equals: n((Q) => ({
                    equals: Ew(Q, B)
                }), "equals"),
                greaterThan: n((Q) => ({
                    greaterThan: Ew(Q, B)
                }), "greaterThan"),
                greaterThanOrEquals: n((Q) => ({
                    greaterThanOrEquals: Ew(Q, B)
                }), "greaterThanOrEquals"),
                in: n((Q) => ({
                    in: Ew(Q, B)
                }), "in"),
                lessThan: n((Q) => ({
                    lessThan: Ew(Q, B)
                }), "lessThan"),
                lessThanOrEquals: n((Q) => ({
                    lessThanOrEquals: Ew(Q, B)
                }), "lessThanOrEquals"),
                listContains: n((Q) => ({
                    listContains: Ew(Q, B)
                }), "listContains"),
                notEquals: n((Q) => ({
                    notEquals: Ew(Q, B)
                }), "notEquals"),
                notIn: n((Q) => ({
                    notIn: Ew(Q, B)
                }), "notIn"),
                orAll: n((Q) => ({
                    orAll: bIA(Q, B)
                }), "orAll"),
                startsWith: n((Q) => ({
                    startsWith: Ew(Q, B)
                }), "startsWith"),
                stringContains: n((Q) => ({
                    stringContains: Ew(Q, B)
                }), "stringContains"),
                _: n((Q, Z) => ({
                    [Q]: Z
                }), "_")
            })
        }, "se_RetrievalFilter"),
        bIA = n((A, B) => {
            return A.filter((Q) => Q != null).map((Q) => {
                return yWA(Q, B)
            })
        }, "se_RetrievalFilterList"),
        RDQ = n((A, B) => {
            return x.take(A, {
                externalSourcesConfiguration: n((Q) => VDQ(Q, B), "externalSourcesConfiguration"),
                knowledgeBaseConfiguration: n((Q) => UDQ(Q, B), "knowledgeBaseConfiguration"),
                type: []
            })
        }, "se_RetrieveAndGenerateConfiguration"),
        ODQ = n((A, B) => {
            return x.take(A, {
                knowledgeBaseId: [],
                knowledgeBaseRetrievalConfiguration: n((Q) => kWA(Q, B), "knowledgeBaseRetrievalConfiguration")
            })
        }, "se_RetrieveConfig"),
        TDQ = n((A, B) => {
            return x.take(A, {
                responseQualityDifference: x.serializeFloat
            })
        }, "se_RoutingCriteria"),
        PDQ = n((A, B) => {
            return x.take(A, {
                maxTokens: [],
                stopSequences: x._json,
                temperature: x.serializeFloat,
                topP: x.serializeFloat
            })
        }, "se_TextInferenceConfig"),
        SDQ = n((A, B) => {
            return x.take(A, {
                metadataConfiguration: x._json,
                modelConfiguration: n((Q) => jDQ(Q, B), "modelConfiguration"),
                numberOfRerankedResults: []
            })
        }, "se_VectorSearchBedrockRerankingConfiguration"),
        jDQ = n((A, B) => {
            return x.take(A, {
                additionalModelRequestFields: n((Q) => _o1(Q, B), "additionalModelRequestFields"),
                modelArn: []
            })
        }, "se_VectorSearchBedrockRerankingModelConfiguration"),
        kDQ = n((A, B) => {
            return x.take(A, {
                bedrockRerankingConfiguration: n((Q) => SDQ(Q, B), "bedrockRerankingConfiguration"),
                type: []
            })
        }, "se_VectorSearchRerankingConfiguration"),
        xo1 = n((A, B) => {
            return Object.entries(A).reduce((Q, [Z, D]) => {
                if (D === null) return Q;
                return Q[Z] = yDQ(D, B), Q
            }, {})
        }, "de_AdditionalModelRequestFields"),
        yDQ = n((A, B) => {
            return A
        }, "de_AdditionalModelRequestFieldsValue"),
        _DQ = n((A, B) => {
            return x.take(A, {
                customMetricConfig: n((Q) => xDQ(Q, B), "customMetricConfig"),
                datasetMetricConfigs: x._json,
                evaluatorModelConfig: n((Q) => x._json(VB.awsExpectUnion(Q)), "evaluatorModelConfig")
            })
        }, "de_AutomatedEvaluationConfig"),
        xDQ = n((A, B) => {
            return x.take(A, {
                customMetrics: n((Q) => vDQ(Q, B), "customMetrics"),
                evaluatorModelConfig: x._json
            })
        }, "de_AutomatedEvaluationCustomMetricConfig"),
        vDQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return bDQ(VB.awsExpectUnion(Z), B)
            })
        }, "de_AutomatedEvaluationCustomMetrics"),
        bDQ = n((A, B) => {
            if (A.customMetricDefinition != null) return {
                customMetricDefinition: hDQ(A.customMetricDefinition, B)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_AutomatedEvaluationCustomMetricSource"),
        fDQ = n((A, B) => {
            return x.take(A, {
                contentType: x.expectString,
                data: B.base64Decoder,
                identifier: x.expectString
            })
        }, "de_ByteContentDoc"),
        hDQ = n((A, B) => {
            return x.take(A, {
                instructions: x.expectString,
                name: x.expectString,
                ratingScale: n((Q) => OGQ(Q, B), "ratingScale")
            })
        }, "de_CustomMetricDefinition"),
        gDQ = n((A, B) => {
            return x.take(A, {
                baseModelArn: x.expectString,
                baseModelName: x.expectString,
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                customizationType: x.expectString,
                modelArn: x.expectString,
                modelName: x.expectString,
                modelStatus: x.expectString,
                ownerAccountId: x.expectString
            })
        }, "de_CustomModelSummary"),
        uDQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return gDQ(Z, B)
            })
        }, "de_CustomModelSummaryList"),
        mDQ = n((A, B) => {
            return x.take(A, {
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                lastModifiedTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
                status: x.expectString
            })
        }, "de_DataProcessingDetails"),
        dDQ = n((A, B) => {
            if (A.automated != null) return {
                automated: _DQ(A.automated, B)
            };
            if (A.human != null) return {
                human: x._json(A.human)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_EvaluationConfig"),
        cDQ = n((A, B) => {
            if (A.models != null) return {
                models: x._json(A.models)
            };
            if (A.ragConfigs != null) return {
                ragConfigs: RGQ(A.ragConfigs, B)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_EvaluationInferenceConfig"),
        lDQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return pDQ(Z, B)
            })
        }, "de_EvaluationSummaries"),
        pDQ = n((A, B) => {
            return x.take(A, {
                applicationType: x.expectString,
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                customMetricsEvaluatorModelIdentifiers: x._json,
                evaluationTaskTypes: x._json,
                evaluatorModelIdentifiers: x._json,
                inferenceConfigSummary: x._json,
                jobArn: x.expectString,
                jobName: x.expectString,
                jobType: x.expectString,
                modelIdentifiers: x._json,
                ragIdentifiers: x._json,
                status: x.expectString
            })
        }, "de_EvaluationSummary"),
        iDQ = n((A, B) => {
            return x.take(A, {
                byteContent: n((Q) => fDQ(Q, B), "byteContent"),
                s3Location: x._json,
                sourceType: x.expectString
            })
        }, "de_ExternalSource"),
        nDQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return iDQ(Z, B)
            })
        }, "de_ExternalSources"),
        aDQ = n((A, B) => {
            return x.take(A, {
                additionalModelRequestFields: n((Q) => xo1(Q, B), "additionalModelRequestFields"),
                guardrailConfiguration: x._json,
                kbInferenceConfig: n((Q) => _WA(Q, B), "kbInferenceConfig"),
                promptTemplate: x._json
            })
        }, "de_ExternalSourcesGenerationConfiguration"),
        sDQ = n((A, B) => {
            return x.take(A, {
                generationConfiguration: n((Q) => aDQ(Q, B), "generationConfiguration"),
                modelArn: x.expectString,
                sources: n((Q) => nDQ(Q, B), "sources")
            })
        }, "de_ExternalSourcesRetrieveAndGenerateConfiguration"),
        Uw = n((A, B) => {
            return x.take(A, {
                key: x.expectString,
                value: n((Q) => rDQ(Q, B), "value")
            })
        }, "de_FilterAttribute"),
        rDQ = n((A, B) => {
            return A
        }, "de_FilterValue"),
        oDQ = n((A, B) => {
            return x.take(A, {
                additionalModelRequestFields: n((Q) => xo1(Q, B), "additionalModelRequestFields"),
                guardrailConfiguration: x._json,
                kbInferenceConfig: n((Q) => _WA(Q, B), "kbInferenceConfig"),
                promptTemplate: x._json
            })
        }, "de_GenerationConfiguration"),
        tDQ = n((A, B) => {
            return x.take(A, {
                action: x.expectString,
                enabled: x.expectBoolean,
                threshold: x.limitedParseDouble,
                type: x.expectString
            })
        }, "de_GuardrailContextualGroundingFilter"),
        eDQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return tDQ(Z, B)
            })
        }, "de_GuardrailContextualGroundingFilters"),
        AGQ = n((A, B) => {
            return x.take(A, {
                filters: n((Q) => eDQ(Q, B), "filters")
            })
        }, "de_GuardrailContextualGroundingPolicy"),
        BGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return QGQ(Z, B)
            })
        }, "de_GuardrailSummaries"),
        QGQ = n((A, B) => {
            return x.take(A, {
                arn: x.expectString,
                createdAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
                crossRegionDetails: x._json,
                description: x.expectString,
                id: x.expectString,
                name: x.expectString,
                status: x.expectString,
                updatedAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "updatedAt"),
                version: x.expectString
            })
        }, "de_GuardrailSummary"),
        ZGQ = n((A, B) => {
            return x.take(A, {
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                instructSupported: x.expectBoolean,
                modelArchitecture: x.expectString,
                modelArn: x.expectString,
                modelName: x.expectString
            })
        }, "de_ImportedModelSummary"),
        DGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return ZGQ(Z, B)
            })
        }, "de_ImportedModelSummaryList"),
        GGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return FGQ(Z, B)
            })
        }, "de_InferenceProfileSummaries"),
        FGQ = n((A, B) => {
            return x.take(A, {
                createdAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
                description: x.expectString,
                inferenceProfileArn: x.expectString,
                inferenceProfileId: x.expectString,
                inferenceProfileName: x.expectString,
                models: x._json,
                status: x.expectString,
                type: x.expectString,
                updatedAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "updatedAt")
            })
        }, "de_InferenceProfileSummary"),
        _WA = n((A, B) => {
            return x.take(A, {
                textInferenceConfig: n((Q) => kGQ(Q, B), "textInferenceConfig")
            })
        }, "de_KbInferenceConfig"),
        IGQ = n((A, B) => {
            if (A.retrieveAndGenerateConfig != null) return {
                retrieveAndGenerateConfig: SGQ(A.retrieveAndGenerateConfig, B)
            };
            if (A.retrieveConfig != null) return {
                retrieveConfig: jGQ(A.retrieveConfig, B)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_KnowledgeBaseConfig"),
        xWA = n((A, B) => {
            return x.take(A, {
                vectorSearchConfiguration: n((Q) => WGQ(Q, B), "vectorSearchConfiguration")
            })
        }, "de_KnowledgeBaseRetrievalConfiguration"),
        YGQ = n((A, B) => {
            return x.take(A, {
                generationConfiguration: n((Q) => oDQ(Q, B), "generationConfiguration"),
                knowledgeBaseId: x.expectString,
                modelArn: x.expectString,
                orchestrationConfiguration: x._json,
                retrievalConfiguration: n((Q) => xWA(Q, B), "retrievalConfiguration")
            })
        }, "de_KnowledgeBaseRetrieveAndGenerateConfiguration"),
        WGQ = n((A, B) => {
            return x.take(A, {
                filter: n((Q) => vWA(VB.awsExpectUnion(Q), B), "filter"),
                implicitFilterConfiguration: x._json,
                numberOfResults: x.expectInt32,
                overrideSearchType: x.expectString,
                rerankingConfiguration: n((Q) => fGQ(Q, B), "rerankingConfiguration")
            })
        }, "de_KnowledgeBaseVectorSearchConfiguration"),
        eH1 = n((A, B) => {
            return x.take(A, {
                createdAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
                endpointArn: x.expectString,
                endpointConfig: n((Q) => x._json(VB.awsExpectUnion(Q)), "endpointConfig"),
                endpointStatus: x.expectString,
                endpointStatusMessage: x.expectString,
                modelSourceIdentifier: x.expectString,
                status: x.expectString,
                statusMessage: x.expectString,
                updatedAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "updatedAt")
            })
        }, "de_MarketplaceModelEndpoint"),
        JGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return XGQ(Z, B)
            })
        }, "de_MarketplaceModelEndpointSummaries"),
        XGQ = n((A, B) => {
            return x.take(A, {
                createdAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
                endpointArn: x.expectString,
                modelSourceIdentifier: x.expectString,
                status: x.expectString,
                statusMessage: x.expectString,
                updatedAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "updatedAt")
            })
        }, "de_MarketplaceModelEndpointSummary"),
        VGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return CGQ(Z, B)
            })
        }, "de_ModelCopyJobSummaries"),
        CGQ = n((A, B) => {
            return x.take(A, {
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                failureMessage: x.expectString,
                jobArn: x.expectString,
                sourceAccountId: x.expectString,
                sourceModelArn: x.expectString,
                sourceModelName: x.expectString,
                status: x.expectString,
                targetModelArn: x.expectString,
                targetModelKmsKeyArn: x.expectString,
                targetModelName: x.expectString,
                targetModelTags: x._json
            })
        }, "de_ModelCopyJobSummary"),
        KGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return HGQ(Z, B)
            })
        }, "de_ModelCustomizationJobSummaries"),
        HGQ = n((A, B) => {
            return x.take(A, {
                baseModelArn: x.expectString,
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                customModelArn: x.expectString,
                customModelName: x.expectString,
                customizationType: x.expectString,
                endTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "endTime"),
                jobArn: x.expectString,
                jobName: x.expectString,
                lastModifiedTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
                status: x.expectString,
                statusDetails: n((Q) => fWA(Q, B), "statusDetails")
            })
        }, "de_ModelCustomizationJobSummary"),
        zGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return EGQ(Z, B)
            })
        }, "de_ModelImportJobSummaries"),
        EGQ = n((A, B) => {
            return x.take(A, {
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                endTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "endTime"),
                importedModelArn: x.expectString,
                importedModelName: x.expectString,
                jobArn: x.expectString,
                jobName: x.expectString,
                lastModifiedTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
                status: x.expectString
            })
        }, "de_ModelImportJobSummary"),
        UGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return wGQ(Z, B)
            })
        }, "de_ModelInvocationJobSummaries"),
        wGQ = n((A, B) => {
            return x.take(A, {
                clientRequestToken: x.expectString,
                endTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "endTime"),
                inputDataConfig: n((Q) => x._json(VB.awsExpectUnion(Q)), "inputDataConfig"),
                jobArn: x.expectString,
                jobExpirationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "jobExpirationTime"),
                jobName: x.expectString,
                lastModifiedTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
                message: x.expectString,
                modelId: x.expectString,
                outputDataConfig: n((Q) => x._json(VB.awsExpectUnion(Q)), "outputDataConfig"),
                roleArn: x.expectString,
                status: x.expectString,
                submitTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "submitTime"),
                timeoutDurationInHours: x.expectInt32,
                vpcConfig: x._json
            })
        }, "de_ModelInvocationJobSummary"),
        $GQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return qGQ(Z, B)
            })
        }, "de_PromptRouterSummaries"),
        qGQ = n((A, B) => {
            return x.take(A, {
                createdAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "createdAt"),
                description: x.expectString,
                fallbackModel: x._json,
                models: x._json,
                promptRouterArn: x.expectString,
                promptRouterName: x.expectString,
                routingCriteria: n((Q) => bWA(Q, B), "routingCriteria"),
                status: x.expectString,
                type: x.expectString,
                updatedAt: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "updatedAt")
            })
        }, "de_PromptRouterSummary"),
        NGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return LGQ(Z, B)
            })
        }, "de_ProvisionedModelSummaries"),
        LGQ = n((A, B) => {
            return x.take(A, {
                commitmentDuration: x.expectString,
                commitmentExpirationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "commitmentExpirationTime"),
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                desiredModelArn: x.expectString,
                desiredModelUnits: x.expectInt32,
                foundationModelArn: x.expectString,
                lastModifiedTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
                modelArn: x.expectString,
                modelUnits: x.expectInt32,
                provisionedModelArn: x.expectString,
                provisionedModelName: x.expectString,
                status: x.expectString
            })
        }, "de_ProvisionedModelSummary"),
        MGQ = n((A, B) => {
            if (A.knowledgeBaseConfig != null) return {
                knowledgeBaseConfig: IGQ(VB.awsExpectUnion(A.knowledgeBaseConfig), B)
            };
            if (A.precomputedRagSourceConfig != null) return {
                precomputedRagSourceConfig: x._json(VB.awsExpectUnion(A.precomputedRagSourceConfig))
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_RAGConfig"),
        RGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return MGQ(VB.awsExpectUnion(Z), B)
            })
        }, "de_RagConfigs"),
        OGQ = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return TGQ(Z, B)
            })
        }, "de_RatingScale"),
        TGQ = n((A, B) => {
            return x.take(A, {
                definition: x.expectString,
                value: n((Q) => PGQ(VB.awsExpectUnion(Q), B), "value")
            })
        }, "de_RatingScaleItem"),
        PGQ = n((A, B) => {
            if (x.limitedParseFloat32(A.floatValue) !== void 0) return {
                floatValue: x.limitedParseFloat32(A.floatValue)
            };
            if (x.expectString(A.stringValue) !== void 0) return {
                stringValue: x.expectString(A.stringValue)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_RatingScaleItemValue"),
        vWA = n((A, B) => {
            if (A.andAll != null) return {
                andAll: fIA(A.andAll, B)
            };
            if (A.equals != null) return {
                equals: Uw(A.equals, B)
            };
            if (A.greaterThan != null) return {
                greaterThan: Uw(A.greaterThan, B)
            };
            if (A.greaterThanOrEquals != null) return {
                greaterThanOrEquals: Uw(A.greaterThanOrEquals, B)
            };
            if (A.in != null) return {
                in: Uw(A.in, B)
            };
            if (A.lessThan != null) return {
                lessThan: Uw(A.lessThan, B)
            };
            if (A.lessThanOrEquals != null) return {
                lessThanOrEquals: Uw(A.lessThanOrEquals, B)
            };
            if (A.listContains != null) return {
                listContains: Uw(A.listContains, B)
            };
            if (A.notEquals != null) return {
                notEquals: Uw(A.notEquals, B)
            };
            if (A.notIn != null) return {
                notIn: Uw(A.notIn, B)
            };
            if (A.orAll != null) return {
                orAll: fIA(A.orAll, B)
            };
            if (A.startsWith != null) return {
                startsWith: Uw(A.startsWith, B)
            };
            if (A.stringContains != null) return {
                stringContains: Uw(A.stringContains, B)
            };
            return {
                $unknown: Object.entries(A)[0]
            }
        }, "de_RetrievalFilter"),
        fIA = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return vWA(VB.awsExpectUnion(Z), B)
            })
        }, "de_RetrievalFilterList"),
        SGQ = n((A, B) => {
            return x.take(A, {
                externalSourcesConfiguration: n((Q) => sDQ(Q, B), "externalSourcesConfiguration"),
                knowledgeBaseConfiguration: n((Q) => YGQ(Q, B), "knowledgeBaseConfiguration"),
                type: x.expectString
            })
        }, "de_RetrieveAndGenerateConfiguration"),
        jGQ = n((A, B) => {
            return x.take(A, {
                knowledgeBaseId: x.expectString,
                knowledgeBaseRetrievalConfiguration: n((Q) => xWA(Q, B), "knowledgeBaseRetrievalConfiguration")
            })
        }, "de_RetrieveConfig"),
        bWA = n((A, B) => {
            return x.take(A, {
                responseQualityDifference: x.limitedParseDouble
            })
        }, "de_RoutingCriteria"),
        fWA = n((A, B) => {
            return x.take(A, {
                dataProcessingDetails: n((Q) => mDQ(Q, B), "dataProcessingDetails"),
                trainingDetails: n((Q) => yGQ(Q, B), "trainingDetails"),
                validationDetails: n((Q) => _GQ(Q, B), "validationDetails")
            })
        }, "de_StatusDetails"),
        kGQ = n((A, B) => {
            return x.take(A, {
                maxTokens: x.expectInt32,
                stopSequences: x._json,
                temperature: x.limitedParseFloat32,
                topP: x.limitedParseFloat32
            })
        }, "de_TextInferenceConfig"),
        yGQ = n((A, B) => {
            return x.take(A, {
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                lastModifiedTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
                status: x.expectString
            })
        }, "de_TrainingDetails"),
        hWA = n((A, B) => {
            return x.take(A, {
                trainingLoss: x.limitedParseFloat32
            })
        }, "de_TrainingMetrics"),
        _GQ = n((A, B) => {
            return x.take(A, {
                creationTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "creationTime"),
                lastModifiedTime: n((Q) => x.expectNonNull(x.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
                status: x.expectString
            })
        }, "de_ValidationDetails"),
        gWA = n((A, B) => {
            return (A || []).filter((Z) => Z != null).map((Z) => {
                return xGQ(Z, B)
            })
        }, "de_ValidationMetrics"),
        xGQ = n((A, B) => {
            return x.take(A, {
                validationLoss: x.limitedParseFloat32
            })
        }, "de_ValidatorMetric"),
        vGQ = n((A, B) => {
            return x.take(A, {
                metadataConfiguration: x._json,
                modelConfiguration: n((Q) => bGQ(Q, B), "modelConfiguration"),
                numberOfRerankedResults: x.expectInt32
            })
        }, "de_VectorSearchBedrockRerankingConfiguration"),
        bGQ = n((A, B) => {
            return x.take(A, {
                additionalModelRequestFields: n((Q) => xo1(Q, B), "additionalModelRequestFields"),
                modelArn: x.expectString
            })
        }, "de_VectorSearchBedrockRerankingModelConfiguration"),
        fGQ = n((A, B) => {
            return x.take(A, {
                bedrockRerankingConfiguration: n((Q) => vGQ(Q, B), "bedrockRerankingConfiguration"),
                type: x.expectString
            })
        }, "de_VectorSearchRerankingConfiguration"),
        l2 = n((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        hIA = "applicationTypeEquals",
        gIA = "byCustomizationType",
        uIA = "byInferenceType",
        mIA = "baseModelArnEquals",
        dIA = "byOutputModality",
        cIA = "byProvider",
        zV = "creationTimeAfter",
        EV = "creationTimeBefore",
        lIA = "foundationModelArnEquals",
        pIA = "guardrailIdentifier",
        rH1 = "guardrailVersion",
        iIA = "isOwned",
        nIA = "modelArnEquals",
        WZ = "maxResults",
        aIA = "modelStatus",
        hGQ = "modelSourceEquals",
        gGQ = "modelSourceIdentifier",
        UV = "nameContains",
        JZ = "nextToken",
        uGQ = "outputModelNameContains",
        sIA = "offerType",
        rIA = "sourceAccountEquals",
        dW = "sortBy",
        Xz = "statusEquals",
        oIA = "sourceModelArnEquals",
        cW = "sortOrder",
        tIA = "submitTimeAfter",
        eIA = "submitTimeBefore",
        Lo1 = "type",
        mGQ = "typeEquals",
        dGQ = "targetModelNameContains",
        uWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "BatchDeleteEvaluationJob", {}).n("BedrockClient", "BatchDeleteEvaluationJobCommand").f(CYA, zYA).ser($3Q).de(y7Q).build() {
            static {
                n(this, "BatchDeleteEvaluationJobCommand")
            }
        },
        mWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateCustomModel", {}).n("BedrockClient", "CreateCustomModelCommand").f(void 0, void 0).ser(q3Q).de(_7Q).build() {
            static {
                n(this, "CreateCustomModelCommand")
            }
        },
        dWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateEvaluationJob", {}).n("BedrockClient", "CreateEvaluationJobCommand").f(TWA, void 0).ser(N3Q).de(x7Q).build() {
            static {
                n(this, "CreateEvaluationJobCommand")
            }
        },
        cWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateFoundationModelAgreement", {}).n("BedrockClient", "CreateFoundationModelAgreementCommand").f(void 0, void 0).ser(L3Q).de(v7Q).build() {
            static {
                n(this, "CreateFoundationModelAgreementCommand")
            }
        },
        lWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateGuardrail", {}).n("BedrockClient", "CreateGuardrailCommand").f(pYA, void 0).ser(M3Q).de(b7Q).build() {
            static {
                n(this, "CreateGuardrailCommand")
            }
        },
        pWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateGuardrailVersion", {}).n("BedrockClient", "CreateGuardrailVersionCommand").f(iYA, void 0).ser(R3Q).de(f7Q).build() {
            static {
                n(this, "CreateGuardrailVersionCommand")
            }
        },
        iWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateInferenceProfile", {}).n("BedrockClient", "CreateInferenceProfileCommand").f(YWA, void 0).ser(O3Q).de(h7Q).build() {
            static {
                n(this, "CreateInferenceProfileCommand")
            }
        },
        nWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateMarketplaceModelEndpoint", {}).n("BedrockClient", "CreateMarketplaceModelEndpointCommand").f(void 0, void 0).ser(T3Q).de(g7Q).build() {
            static {
                n(this, "CreateMarketplaceModelEndpointCommand")
            }
        },
        aWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateModelCopyJob", {}).n("BedrockClient", "CreateModelCopyJobCommand").f(void 0, void 0).ser(P3Q).de(u7Q).build() {
            static {
                n(this, "CreateModelCopyJobCommand")
            }
        },
        sWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateModelCustomizationJob", {}).n("BedrockClient", "CreateModelCustomizationJobCommand").f(wWA, void 0).ser(S3Q).de(m7Q).build() {
            static {
                n(this, "CreateModelCustomizationJobCommand")
            }
        },
        rWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateModelImportJob", {}).n("BedrockClient", "CreateModelImportJobCommand").f(void 0, void 0).ser(j3Q).de(d7Q).build() {
            static {
                n(this, "CreateModelImportJobCommand")
            }
        },
        oWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateModelInvocationJob", {}).n("BedrockClient", "CreateModelInvocationJobCommand").f(void 0, void 0).ser(k3Q).de(c7Q).build() {
            static {
                n(this, "CreateModelInvocationJobCommand")
            }
        },
        tWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreatePromptRouter", {}).n("BedrockClient", "CreatePromptRouterCommand").f(HWA, void 0).ser(y3Q).de(l7Q).build() {
            static {
                n(this, "CreatePromptRouterCommand")
            }
        },
        eWA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "CreateProvisionedModelThroughput", {}).n("BedrockClient", "CreateProvisionedModelThroughputCommand").f(void 0, void 0).ser(_3Q).de(p7Q).build() {
            static {
                n(this, "CreateProvisionedModelThroughputCommand")
            }
        },
        AJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeleteCustomModel", {}).n("BedrockClient", "DeleteCustomModelCommand").f(void 0, void 0).ser(x3Q).de(i7Q).build() {
            static {
                n(this, "DeleteCustomModelCommand")
            }
        },
        BJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeleteFoundationModelAgreement", {}).n("BedrockClient", "DeleteFoundationModelAgreementCommand").f(void 0, void 0).ser(v3Q).de(n7Q).build() {
            static {
                n(this, "DeleteFoundationModelAgreementCommand")
            }
        },
        QJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeleteGuardrail", {}).n("BedrockClient", "DeleteGuardrailCommand").f(void 0, void 0).ser(b3Q).de(a7Q).build() {
            static {
                n(this, "DeleteGuardrailCommand")
            }
        },
        ZJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeleteImportedModel", {}).n("BedrockClient", "DeleteImportedModelCommand").f(void 0, void 0).ser(f3Q).de(s7Q).build() {
            static {
                n(this, "DeleteImportedModelCommand")
            }
        },
        DJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeleteInferenceProfile", {}).n("BedrockClient", "DeleteInferenceProfileCommand").f(void 0, void 0).ser(h3Q).de(r7Q).build() {
            static {
                n(this, "DeleteInferenceProfileCommand")
            }
        },
        GJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeleteMarketplaceModelEndpoint", {}).n("BedrockClient", "DeleteMarketplaceModelEndpointCommand").f(void 0, void 0).ser(g3Q).de(o7Q).build() {
            static {
                n(this, "DeleteMarketplaceModelEndpointCommand")
            }
        },
        FJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeleteModelInvocationLoggingConfiguration", {}).n("BedrockClient", "DeleteModelInvocationLoggingConfigurationCommand").f(void 0, void 0).ser(u3Q).de(t7Q).build() {
            static {
                n(this, "DeleteModelInvocationLoggingConfigurationCommand")
            }
        },
        IJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeletePromptRouter", {}).n("BedrockClient", "DeletePromptRouterCommand").f(void 0, void 0).ser(m3Q).de(e7Q).build() {
            static {
                n(this, "DeletePromptRouterCommand")
            }
        },
        YJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeleteProvisionedModelThroughput", {}).n("BedrockClient", "DeleteProvisionedModelThroughputCommand").f(void 0, void 0).ser(d3Q).de(AZQ).build() {
            static {
                n(this, "DeleteProvisionedModelThroughputCommand")
            }
        },
        WJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "DeregisterMarketplaceModelEndpoint", {}).n("BedrockClient", "DeregisterMarketplaceModelEndpointCommand").f(void 0, void 0).ser(c3Q).de(BZQ).build() {
            static {
                n(this, "DeregisterMarketplaceModelEndpointCommand")
            }
        },
        JJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetCustomModel", {}).n("BedrockClient", "GetCustomModelCommand").f(void 0, VYA).ser(l3Q).de(QZQ).build() {
            static {
                n(this, "GetCustomModelCommand")
            }
        },
        XJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetEvaluationJob", {}).n("BedrockClient", "GetEvaluationJobCommand").f(bYA, PWA).ser(p3Q).de(ZZQ).build() {
            static {
                n(this, "GetEvaluationJobCommand")
            }
        },
        VJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetFoundationModelAvailability", {}).n("BedrockClient", "GetFoundationModelAvailabilityCommand").f(void 0, void 0).ser(n3Q).de(GZQ).build() {
            static {
                n(this, "GetFoundationModelAvailabilityCommand")
            }
        },
        CJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetFoundationModel", {}).n("BedrockClient", "GetFoundationModelCommand").f(void 0, void 0).ser(i3Q).de(DZQ).build() {
            static {
                n(this, "GetFoundationModelCommand")
            }
        },
        KJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetGuardrail", {}).n("BedrockClient", "GetGuardrailCommand").f(void 0, DWA).ser(a3Q).de(FZQ).build() {
            static {
                n(this, "GetGuardrailCommand")
            }
        },
        HJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetImportedModel", {}).n("BedrockClient", "GetImportedModelCommand").f(void 0, void 0).ser(s3Q).de(IZQ).build() {
            static {
                n(this, "GetImportedModelCommand")
            }
        },
        zJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetInferenceProfile", {}).n("BedrockClient", "GetInferenceProfileCommand").f(void 0, WWA).ser(r3Q).de(YZQ).build() {
            static {
                n(this, "GetInferenceProfileCommand")
            }
        },
        EJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetMarketplaceModelEndpoint", {}).n("BedrockClient", "GetMarketplaceModelEndpointCommand").f(void 0, void 0).ser(o3Q).de(WZQ).build() {
            static {
                n(this, "GetMarketplaceModelEndpointCommand")
            }
        },
        UJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetModelCopyJob", {}).n("BedrockClient", "GetModelCopyJobCommand").f(void 0, void 0).ser(t3Q).de(JZQ).build() {
            static {
                n(this, "GetModelCopyJobCommand")
            }
        },
        wJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetModelCustomizationJob", {}).n("BedrockClient", "GetModelCustomizationJobCommand").f(void 0, $WA).ser(e3Q).de(XZQ).build() {
            static {
                n(this, "GetModelCustomizationJobCommand")
            }
        },
        $JA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetModelImportJob", {}).n("BedrockClient", "GetModelImportJobCommand").f(void 0, void 0).ser(A7Q).de(VZQ).build() {
            static {
                n(this, "GetModelImportJobCommand")
            }
        },
        qJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetModelInvocationJob", {}).n("BedrockClient", "GetModelInvocationJobCommand").f(void 0, VWA).ser(B7Q).de(CZQ).build() {
            static {
                n(this, "GetModelInvocationJobCommand")
            }
        },
        NJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetModelInvocationLoggingConfiguration", {}).n("BedrockClient", "GetModelInvocationLoggingConfigurationCommand").f(void 0, void 0).ser(Q7Q).de(KZQ).build() {
            static {
                n(this, "GetModelInvocationLoggingConfigurationCommand")
            }
        },
        LJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetPromptRouter", {}).n("BedrockClient", "GetPromptRouterCommand").f(void 0, zWA).ser(Z7Q).de(HZQ).build() {
            static {
                n(this, "GetPromptRouterCommand")
            }
        },
        MJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetProvisionedModelThroughput", {}).n("BedrockClient", "GetProvisionedModelThroughputCommand").f(void 0, void 0).ser(D7Q).de(zZQ).build() {
            static {
                n(this, "GetProvisionedModelThroughputCommand")
            }
        },
        RJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "GetUseCaseForModelAccess", {}).n("BedrockClient", "GetUseCaseForModelAccessCommand").f(void 0, void 0).ser(G7Q).de(EZQ).build() {
            static {
                n(this, "GetUseCaseForModelAccessCommand")
            }
        },
        vo1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListCustomModels", {}).n("BedrockClient", "ListCustomModelsCommand").f(void 0, void 0).ser(F7Q).de(UZQ).build() {
            static {
                n(this, "ListCustomModelsCommand")
            }
        },
        bo1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListEvaluationJobs", {}).n("BedrockClient", "ListEvaluationJobsCommand").f(void 0, void 0).ser(I7Q).de(wZQ).build() {
            static {
                n(this, "ListEvaluationJobsCommand")
            }
        },
        OJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListFoundationModelAgreementOffers", {}).n("BedrockClient", "ListFoundationModelAgreementOffersCommand").f(void 0, void 0).ser(Y7Q).de($ZQ).build() {
            static {
                n(this, "ListFoundationModelAgreementOffersCommand")
            }
        },
        TJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListFoundationModels", {}).n("BedrockClient", "ListFoundationModelsCommand").f(void 0, void 0).ser(W7Q).de(qZQ).build() {
            static {
                n(this, "ListFoundationModelsCommand")
            }
        },
        fo1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListGuardrails", {}).n("BedrockClient", "ListGuardrailsCommand").f(void 0, FWA).ser(J7Q).de(NZQ).build() {
            static {
                n(this, "ListGuardrailsCommand")
            }
        },
        ho1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListImportedModels", {}).n("BedrockClient", "ListImportedModelsCommand").f(void 0, void 0).ser(X7Q).de(LZQ).build() {
            static {
                n(this, "ListImportedModelsCommand")
            }
        },
        go1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListInferenceProfiles", {}).n("BedrockClient", "ListInferenceProfilesCommand").f(void 0, XWA).ser(V7Q).de(MZQ).build() {
            static {
                n(this, "ListInferenceProfilesCommand")
            }
        },
        uo1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListMarketplaceModelEndpoints", {}).n("BedrockClient", "ListMarketplaceModelEndpointsCommand").f(void 0, void 0).ser(C7Q).de(RZQ).build() {
            static {
                n(this, "ListMarketplaceModelEndpointsCommand")
            }
        },
        mo1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListModelCopyJobs", {}).n("BedrockClient", "ListModelCopyJobsCommand").f(void 0, void 0).ser(K7Q).de(OZQ).build() {
            static {
                n(this, "ListModelCopyJobsCommand")
            }
        },
        do1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListModelCustomizationJobs", {}).n("BedrockClient", "ListModelCustomizationJobsCommand").f(void 0, void 0).ser(H7Q).de(TZQ).build() {
            static {
                n(this, "ListModelCustomizationJobsCommand")
            }
        },
        co1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListModelImportJobs", {}).n("BedrockClient", "ListModelImportJobsCommand").f(void 0, void 0).ser(z7Q).de(PZQ).build() {
            static {
                n(this, "ListModelImportJobsCommand")
            }
        },
        lo1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListModelInvocationJobs", {}).n("BedrockClient", "ListModelInvocationJobsCommand").f(void 0, KWA).ser(E7Q).de(SZQ).build() {
            static {
                n(this, "ListModelInvocationJobsCommand")
            }
        },
        po1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListPromptRouters", {}).n("BedrockClient", "ListPromptRoutersCommand").f(void 0, UWA).ser(U7Q).de(jZQ).build() {
            static {
                n(this, "ListPromptRoutersCommand")
            }
        },
        io1 = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListProvisionedModelThroughputs", {}).n("BedrockClient", "ListProvisionedModelThroughputsCommand").f(void 0, void 0).ser(w7Q).de(kZQ).build() {
            static {
                n(this, "ListProvisionedModelThroughputsCommand")
            }
        },
        PJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "ListTagsForResource", {}).n("BedrockClient", "ListTagsForResourceCommand").f(void 0, void 0).ser($7Q).de(yZQ).build() {
            static {
                n(this, "ListTagsForResourceCommand")
            }
        },
        SJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "PutModelInvocationLoggingConfiguration", {}).n("BedrockClient", "PutModelInvocationLoggingConfigurationCommand").f(void 0, void 0).ser(q7Q).de(_ZQ).build() {
            static {
                n(this, "PutModelInvocationLoggingConfigurationCommand")
            }
        },
        jJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "PutUseCaseForModelAccess", {}).n("BedrockClient", "PutUseCaseForModelAccessCommand").f(void 0, void 0).ser(N7Q).de(xZQ).build() {
            static {
                n(this, "PutUseCaseForModelAccessCommand")
            }
        },
        kJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "RegisterMarketplaceModelEndpoint", {}).n("BedrockClient", "RegisterMarketplaceModelEndpointCommand").f(void 0, void 0).ser(L7Q).de(vZQ).build() {
            static {
                n(this, "RegisterMarketplaceModelEndpointCommand")
            }
        },
        yJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "StopEvaluationJob", {}).n("BedrockClient", "StopEvaluationJobCommand").f(fYA, void 0).ser(M7Q).de(bZQ).build() {
            static {
                n(this, "StopEvaluationJobCommand")
            }
        },
        _JA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "StopModelCustomizationJob", {}).n("BedrockClient", "StopModelCustomizationJobCommand").f(void 0, void 0).ser(R7Q).de(fZQ).build() {
            static {
                n(this, "StopModelCustomizationJobCommand")
            }
        },
        xJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "StopModelInvocationJob", {}).n("BedrockClient", "StopModelInvocationJobCommand").f(void 0, void 0).ser(O7Q).de(hZQ).build() {
            static {
                n(this, "StopModelInvocationJobCommand")
            }
        },
        vJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "TagResource", {}).n("BedrockClient", "TagResourceCommand").f(void 0, void 0).ser(T7Q).de(gZQ).build() {
            static {
                n(this, "TagResourceCommand")
            }
        },
        bJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "UntagResource", {}).n("BedrockClient", "UntagResourceCommand").f(void 0, void 0).ser(P7Q).de(uZQ).build() {
            static {
                n(this, "UntagResourceCommand")
            }
        },
        fJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "UpdateGuardrail", {}).n("BedrockClient", "UpdateGuardrailCommand").f(IWA, void 0).ser(S7Q).de(mZQ).build() {
            static {
                n(this, "UpdateGuardrailCommand")
            }
        },
        hJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "UpdateMarketplaceModelEndpoint", {}).n("BedrockClient", "UpdateMarketplaceModelEndpointCommand").f(void 0, void 0).ser(j7Q).de(dZQ).build() {
            static {
                n(this, "UpdateMarketplaceModelEndpointCommand")
            }
        },
        gJA = class extends x.Command.classBuilder().ep(OB).m(function(A, B, Q, Z) {
            return [TB.getSerdePlugin(Q, this.serialize, this.deserialize), wB.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
        }).s("AmazonBedrockControlPlaneService", "UpdateProvisionedModelThroughput", {}).n("BedrockClient", "UpdateProvisionedModelThroughputCommand").f(void 0, void 0).ser(k7Q).de(cZQ).build() {
            static {
                n(this, "UpdateProvisionedModelThroughputCommand")
            }
        },
        cGQ = {
            BatchDeleteEvaluationJobCommand: uWA,
            CreateCustomModelCommand: mWA,
            CreateEvaluationJobCommand: dWA,
            CreateFoundationModelAgreementCommand: cWA,
            CreateGuardrailCommand: lWA,
            CreateGuardrailVersionCommand: pWA,
            CreateInferenceProfileCommand: iWA,
            CreateMarketplaceModelEndpointCommand: nWA,
            CreateModelCopyJobCommand: aWA,
            CreateModelCustomizationJobCommand: sWA,
            CreateModelImportJobCommand: rWA,
            CreateModelInvocationJobCommand: oWA,
            CreatePromptRouterCommand: tWA,
            CreateProvisionedModelThroughputCommand: eWA,
            DeleteCustomModelCommand: AJA,
            DeleteFoundationModelAgreementCommand: BJA,
            DeleteGuardrailCommand: QJA,
            DeleteImportedModelCommand: ZJA,
            DeleteInferenceProfileCommand: DJA,
            DeleteMarketplaceModelEndpointCommand: GJA,
            DeleteModelInvocationLoggingConfigurationCommand: FJA,
            DeletePromptRouterCommand: IJA,
            DeleteProvisionedModelThroughputCommand: YJA,
            DeregisterMarketplaceModelEndpointCommand: WJA,
            GetCustomModelCommand: JJA,
            GetEvaluationJobCommand: XJA,
            GetFoundationModelCommand: CJA,
            GetFoundationModelAvailabilityCommand: VJA,
            GetGuardrailCommand: KJA,
            GetImportedModelCommand: HJA,
            GetInferenceProfileCommand: zJA,
            GetMarketplaceModelEndpointCommand: EJA,
            GetModelCopyJobCommand: UJA,
            GetModelCustomizationJobCommand: wJA,
            GetModelImportJobCommand: $JA,
            GetModelInvocationJobCommand: qJA,
            GetModelInvocationLoggingConfigurationCommand: NJA,
            GetPromptRouterCommand: LJA,
            GetProvisionedModelThroughputCommand: MJA,
            GetUseCaseForModelAccessCommand: RJA,
            ListCustomModelsCommand: vo1,
            ListEvaluationJobsCommand: bo1,
            ListFoundationModelAgreementOffersCommand: OJA,
            ListFoundationModelsCommand: TJA,
            ListGuardrailsCommand: fo1,
            ListImportedModelsCommand: ho1,
            ListInferenceProfilesCommand: go1,
            ListMarketplaceModelEndpointsCommand: uo1,
            ListModelCopyJobsCommand: mo1,
            ListModelCustomizationJobsCommand: do1,
            ListModelImportJobsCommand: co1,
            ListModelInvocationJobsCommand: lo1,
            ListPromptRoutersCommand: po1,
            ListProvisionedModelThroughputsCommand: io1,
            ListTagsForResourceCommand: PJA,
            PutModelInvocationLoggingConfigurationCommand: SJA,
            PutUseCaseForModelAccessCommand: jJA,
            RegisterMarketplaceModelEndpointCommand: kJA,
            StopEvaluationJobCommand: yJA,
            StopModelCustomizationJobCommand: _JA,
            StopModelInvocationJobCommand: xJA,
            TagResourceCommand: vJA,
            UntagResourceCommand: bJA,
            UpdateGuardrailCommand: fJA,
            UpdateMarketplaceModelEndpointCommand: hJA,
            UpdateProvisionedModelThroughputCommand: gJA
        },
        uJA = class extends wV {
            static {
                n(this, "Bedrock")
            }
        };
    x.createAggregatedClient(cGQ, uJA);
    var lGQ = L2.createPaginator(wV, vo1, "nextToken", "nextToken", "maxResults"),
        pGQ = L2.createPaginator(wV, bo1, "nextToken", "nextToken", "maxResults"),
        iGQ = L2.createPaginator(wV, fo1, "nextToken", "nextToken", "maxResults"),
        nGQ = L2.createPaginator(wV, ho1, "nextToken", "nextToken", "maxResults"),
        aGQ = L2.createPaginator(wV, go1, "nextToken", "nextToken", "maxResults"),
        sGQ = L2.createPaginator(wV, uo1, "nextToken", "nextToken", "maxResults"),
        rGQ = L2.createPaginator(wV, mo1, "nextToken", "nextToken", "maxResults"),
        oGQ = L2.createPaginator(wV, do1, "nextToken", "nextToken", "maxResults"),
        tGQ = L2.createPaginator(wV, co1, "nextToken", "nextToken", "maxResults"),
        eGQ = L2.createPaginator(wV, lo1, "nextToken", "nextToken", "maxResults"),
        AFQ = L2.createPaginator(wV, po1, "nextToken", "nextToken", "maxResults"),
        BFQ = L2.createPaginator(wV, io1, "nextToken", "nextToken", "maxResults")
});