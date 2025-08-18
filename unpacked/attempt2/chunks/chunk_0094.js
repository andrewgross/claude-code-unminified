/* chunk:94 bytes:[2291407, 2309248) size:17841 source:unpacked-cli.js */
var ki = E((S95, MCA) => {
    var {
        defineProperty: Nz1,
        getOwnPropertyDescriptor: dWQ,
        getOwnPropertyNames: cWQ
    } = Object, lWQ = Object.prototype.hasOwnProperty, ji = (A, B) => Nz1(A, "name", {
        value: B,
        configurable: !0
    }), pWQ = (A, B) => {
        for (var Q in B) Nz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, iWQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of cWQ(B))
                if (!lWQ.call(A, D) && D !== Q) Nz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = dWQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, nWQ = (A) => iWQ(Nz1({}, "__esModule", {
        value: !0
    }), A), zCA = {};
    pWQ(zCA, {
        ConditionObject: () => B7.ConditionObject,
        DeprecatedObject: () => B7.DeprecatedObject,
        EndpointError: () => B7.EndpointError,
        EndpointObject: () => B7.EndpointObject,
        EndpointObjectHeaders: () => B7.EndpointObjectHeaders,
        EndpointObjectProperties: () => B7.EndpointObjectProperties,
        EndpointParams: () => B7.EndpointParams,
        EndpointResolverOptions: () => B7.EndpointResolverOptions,
        EndpointRuleObject: () => B7.EndpointRuleObject,
        ErrorRuleObject: () => B7.ErrorRuleObject,
        EvaluateOptions: () => B7.EvaluateOptions,
        Expression: () => B7.Expression,
        FunctionArgv: () => B7.FunctionArgv,
        FunctionObject: () => B7.FunctionObject,
        FunctionReturn: () => B7.FunctionReturn,
        ParameterObject: () => B7.ParameterObject,
        ReferenceObject: () => B7.ReferenceObject,
        ReferenceRecord: () => B7.ReferenceRecord,
        RuleSetObject: () => B7.RuleSetObject,
        RuleSetRules: () => B7.RuleSetRules,
        TreeRuleObject: () => B7.TreeRuleObject,
        awsEndpointFunctions: () => LCA,
        getUserAgentPrefix: () => oWQ,
        isIpAddress: () => B7.isIpAddress,
        partition: () => qCA,
        resolveEndpoint: () => B7.resolveEndpoint,
        setPartitionInfo: () => NCA,
        useDefaultPartitionInfo: () => rWQ
    });
    MCA.exports = nWQ(zCA);
    var B7 = R7(),
        ECA = ji((A, B = !1) => {
            if (B) {
                for (let Q of A.split("."))
                    if (!ECA(Q)) return !1;
                return !0
            }
            if (!B7.isValidHostLabel(A)) return !1;
            if (A.length < 3 || A.length > 63) return !1;
            if (A !== A.toLowerCase()) return !1;
            if (B7.isIpAddress(A)) return !1;
            return !0
        }, "isVirtualHostableS3Bucket"),
        HCA = ":",
        aWQ = "/",
        sWQ = ji((A) => {
            let B = A.split(HCA);
            if (B.length < 6) return null;
            let [Q, Z, D, G, F, ...I] = B;
            if (Q !== "arn" || Z === "" || D === "" || I.join(HCA) === "") return null;
            let Y = I.map((W) => W.split(aWQ)).flat();
            return {
                partition: Z,
                service: D,
                region: G,
                accountId: F,
                resourceId: Y
            }
        }, "parseArn"),
        UCA = {
            partitions: [{
                id: "aws",
                outputs: {
                    dnsSuffix: "amazonaws.com",
                    dualStackDnsSuffix: "api.aws",
                    implicitGlobalRegion: "us-east-1",
                    name: "aws",
                    supportsDualStack: !0,
                    supportsFIPS: !0
                },
                regionRegex: "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$",
                regions: {
                    "af-south-1": {
                        description: "Africa (Cape Town)"
                    },
                    "ap-east-1": {
                        description: "Asia Pacific (Hong Kong)"
                    },
                    "ap-northeast-1": {
                        description: "Asia Pacific (Tokyo)"
                    },
                    "ap-northeast-2": {
                        description: "Asia Pacific (Seoul)"
                    },
                    "ap-northeast-3": {
                        description: "Asia Pacific (Osaka)"
                    },
                    "ap-south-1": {
                        description: "Asia Pacific (Mumbai)"
                    },
                    "ap-south-2": {
                        description: "Asia Pacific (Hyderabad)"
                    },
                    "ap-southeast-1": {
                        description: "Asia Pacific (Singapore)"
                    },
                    "ap-southeast-2": {
                        description: "Asia Pacific (Sydney)"
                    },
                    "ap-southeast-3": {
                        description: "Asia Pacific (Jakarta)"
                    },
                    "ap-southeast-4": {
                        description: "Asia Pacific (Melbourne)"
                    },
                    "ap-southeast-5": {
                        description: "Asia Pacific (Malaysia)"
                    },
                    "ap-southeast-7": {
                        description: "Asia Pacific (Thailand)"
                    },
                    "aws-global": {
                        description: "AWS Standard global region"
                    },
                    "ca-central-1": {
                        description: "Canada (Central)"
                    },
                    "ca-west-1": {
                        description: "Canada West (Calgary)"
                    },
                    "eu-central-1": {
                        description: "Europe (Frankfurt)"
                    },
                    "eu-central-2": {
                        description: "Europe (Zurich)"
                    },
                    "eu-north-1": {
                        description: "Europe (Stockholm)"
                    },
                    "eu-south-1": {
                        description: "Europe (Milan)"
                    },
                    "eu-south-2": {
                        description: "Europe (Spain)"
                    },
                    "eu-west-1": {
                        description: "Europe (Ireland)"
                    },
                    "eu-west-2": {
                        description: "Europe (London)"
                    },
                    "eu-west-3": {
                        description: "Europe (Paris)"
                    },
                    "il-central-1": {
                        description: "Israel (Tel Aviv)"
                    },
                    "me-central-1": {
                        description: "Middle East (UAE)"
                    },
                    "me-south-1": {
                        description: "Middle East (Bahrain)"
                    },
                    "mx-central-1": {
                        description: "Mexico (Central)"
                    },
                    "sa-east-1": {
                        description: "South America (Sao Paulo)"
                    },
                    "us-east-1": {
                        description: "US East (N. Virginia)"
                    },
                    "us-east-2": {
                        description: "US East (Ohio)"
                    },
                    "us-west-1": {
                        description: "US West (N. California)"
                    },
                    "us-west-2": {
                        description: "US West (Oregon)"
                    }
                }
            }, {
                id: "aws-cn",
                outputs: {
                    dnsSuffix: "amazonaws.com.cn",
                    dualStackDnsSuffix: "api.amazonwebservices.com.cn",
                    implicitGlobalRegion: "cn-northwest-1",
                    name: "aws-cn",
                    supportsDualStack: !0,
                    supportsFIPS: !0
                },
                regionRegex: "^cn\\-\\w+\\-\\d+$",
                regions: {
                    "aws-cn-global": {
                        description: "AWS China global region"
                    },
                    "cn-north-1": {
                        description: "China (Beijing)"
                    },
                    "cn-northwest-1": {
                        description: "China (Ningxia)"
                    }
                }
            }, {
                id: "aws-us-gov",
                outputs: {
                    dnsSuffix: "amazonaws.com",
                    dualStackDnsSuffix: "api.aws",
                    implicitGlobalRegion: "us-gov-west-1",
                    name: "aws-us-gov",
                    supportsDualStack: !0,
                    supportsFIPS: !0
                },
                regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
                regions: {
                    "aws-us-gov-global": {
                        description: "AWS GovCloud (US) global region"
                    },
                    "us-gov-east-1": {
                        description: "AWS GovCloud (US-East)"
                    },
                    "us-gov-west-1": {
                        description: "AWS GovCloud (US-West)"
                    }
                }
            }, {
                id: "aws-iso",
                outputs: {
                    dnsSuffix: "c2s.ic.gov",
                    dualStackDnsSuffix: "c2s.ic.gov",
                    implicitGlobalRegion: "us-iso-east-1",
                    name: "aws-iso",
                    supportsDualStack: !1,
                    supportsFIPS: !0
                },
                regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
                regions: {
                    "aws-iso-global": {
                        description: "AWS ISO (US) global region"
                    },
                    "us-iso-east-1": {
                        description: "US ISO East"
                    },
                    "us-iso-west-1": {
                        description: "US ISO WEST"
                    }
                }
            }, {
                id: "aws-iso-b",
                outputs: {
                    dnsSuffix: "sc2s.sgov.gov",
                    dualStackDnsSuffix: "sc2s.sgov.gov",
                    implicitGlobalRegion: "us-isob-east-1",
                    name: "aws-iso-b",
                    supportsDualStack: !1,
                    supportsFIPS: !0
                },
                regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
                regions: {
                    "aws-iso-b-global": {
                        description: "AWS ISOB (US) global region"
                    },
                    "us-isob-east-1": {
                        description: "US ISOB East (Ohio)"
                    }
                }
            }, {
                id: "aws-iso-e",
                outputs: {
                    dnsSuffix: "cloud.adc-e.uk",
                    dualStackDnsSuffix: "cloud.adc-e.uk",
                    implicitGlobalRegion: "eu-isoe-west-1",
                    name: "aws-iso-e",
                    supportsDualStack: !1,
                    supportsFIPS: !0
                },
                regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$",
                regions: {
                    "aws-iso-e-global": {
                        description: "AWS ISOE (Europe) global region"
                    },
                    "eu-isoe-west-1": {
                        description: "EU ISOE West"
                    }
                }
            }, {
                id: "aws-iso-f",
                outputs: {
                    dnsSuffix: "csp.hci.ic.gov",
                    dualStackDnsSuffix: "csp.hci.ic.gov",
                    implicitGlobalRegion: "us-isof-south-1",
                    name: "aws-iso-f",
                    supportsDualStack: !1,
                    supportsFIPS: !0
                },
                regionRegex: "^us\\-isof\\-\\w+\\-\\d+$",
                regions: {
                    "aws-iso-f-global": {
                        description: "AWS ISOF global region"
                    },
                    "us-isof-east-1": {
                        description: "US ISOF EAST"
                    },
                    "us-isof-south-1": {
                        description: "US ISOF SOUTH"
                    }
                }
            }, {
                id: "aws-eusc",
                outputs: {
                    dnsSuffix: "amazonaws.eu",
                    dualStackDnsSuffix: "amazonaws.eu",
                    implicitGlobalRegion: "eusc-de-east-1",
                    name: "aws-eusc",
                    supportsDualStack: !1,
                    supportsFIPS: !0
                },
                regionRegex: "^eusc\\-(de)\\-\\w+\\-\\d+$",
                regions: {
                    "eusc-de-east-1": {
                        description: "EU (Germany)"
                    }
                }
            }],
            version: "1.1"
        },
        wCA = UCA,
        $CA = "",
        qCA = ji((A) => {
            let {
                partitions: B
            } = wCA;
            for (let Z of B) {
                let {
                    regions: D,
                    outputs: G
                } = Z;
                for (let [F, I] of Object.entries(D))
                    if (F === A) return {
                        ...G,
                        ...I
                    }
            }
            for (let Z of B) {
                let {
                    regionRegex: D,
                    outputs: G
                } = Z;
                if (new RegExp(D).test(A)) return {
                    ...G
                }
            }
            let Q = B.find((Z) => Z.id === "aws");
            if (!Q) throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
            return {
                ...Q.outputs
            }
        }, "partition"),
        NCA = ji((A, B = "") => {
            wCA = A, $CA = B
        }, "setPartitionInfo"),
        rWQ = ji(() => {
            NCA(UCA, "")
        }, "useDefaultPartitionInfo"),
        oWQ = ji(() => $CA, "getUserAgentPrefix"),
        LCA = {
            isVirtualHostableS3Bucket: ECA,
            parseArn: sWQ,
            partition: qCA
        };
    B7.customEndpointFunctions.aws = LCA
});
var xCA = E((j95, _CA) => {
    var {
        defineProperty: Lz1,
        getOwnPropertyDescriptor: tWQ,
        getOwnPropertyNames: eWQ
    } = Object, AJQ = Object.prototype.hasOwnProperty, Mz1 = (A, B) => Lz1(A, "name", {
        value: B,
        configurable: !0
    }), BJQ = (A, B) => {
        for (var Q in B) Lz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, QJQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of eWQ(B))
                if (!AJQ.call(A, D) && D !== Q) Lz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = tWQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, ZJQ = (A) => QJQ(Lz1({}, "__esModule", {
        value: !0
    }), A), RCA = {};
    BJQ(RCA, {
        AlgorithmId: () => SCA,
        EndpointURLScheme: () => PCA,
        FieldPosition: () => jCA,
        HttpApiKeyAuthLocation: () => TCA,
        HttpAuthLocation: () => OCA,
        IniSectionType: () => kCA,
        RequestHandlerProtocol: () => yCA,
        SMITHY_CONTEXT_KEY: () => YJQ,
        getDefaultClientConfiguration: () => FJQ,
        resolveDefaultRuntimeConfig: () => IJQ
    });
    _CA.exports = ZJQ(RCA);
    var OCA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(OCA || {}),
        TCA = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(TCA || {}),
        PCA = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(PCA || {}),
        SCA = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(SCA || {}),
        DJQ = Mz1((A) => {
            let B = [];
            if (A.sha256 !== void 0) B.push({
                algorithmId: () => "sha256",
                checksumConstructor: () => A.sha256
            });
            if (A.md5 != null) B.push({
                algorithmId: () => "md5",
                checksumConstructor: () => A.md5
            });
            return {
                addChecksumAlgorithm(Q) {
                    B.push(Q)
                },
                checksumAlgorithms() {
                    return B
                }
            }
        }, "getChecksumConfiguration"),
        GJQ = Mz1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        FJQ = Mz1((A) => {
            return DJQ(A)
        }, "getDefaultClientConfiguration"),
        IJQ = Mz1((A) => {
            return GJQ(A)
        }, "resolveDefaultRuntimeConfig"),
        jCA = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(jCA || {}),
        YJQ = "__smithy_context",
        kCA = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(kCA || {}),
        yCA = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(yCA || {})
});