/* chunk:248 bytes:[5340668, 5355387) size:14719 source:unpacked-cli.js */
var yr = E((jq5, SZ2) => {
    var {
        defineProperty: zL1,
        getOwnPropertyDescriptor: GN4,
        getOwnPropertyNames: FN4
    } = Object, IN4 = Object.prototype.hasOwnProperty, kr = (A, B) => zL1(A, "name", {
        value: B,
        configurable: !0
    }), YN4 = (A, B) => {
        for (var Q in B) zL1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, WN4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of FN4(B))
                if (!IN4.call(A, D) && D !== Q) zL1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = GN4(B, D)) || Z.enumerable
                })
        }
        return A
    }, JN4 = (A) => WN4(zL1({}, "__esModule", {
        value: !0
    }), A), qZ2 = {};
    YN4(qZ2, {
        ConditionObject: () => D7.ConditionObject,
        DeprecatedObject: () => D7.DeprecatedObject,
        EndpointError: () => D7.EndpointError,
        EndpointObject: () => D7.EndpointObject,
        EndpointObjectHeaders: () => D7.EndpointObjectHeaders,
        EndpointObjectProperties: () => D7.EndpointObjectProperties,
        EndpointParams: () => D7.EndpointParams,
        EndpointResolverOptions: () => D7.EndpointResolverOptions,
        EndpointRuleObject: () => D7.EndpointRuleObject,
        ErrorRuleObject: () => D7.ErrorRuleObject,
        EvaluateOptions: () => D7.EvaluateOptions,
        Expression: () => D7.Expression,
        FunctionArgv: () => D7.FunctionArgv,
        FunctionObject: () => D7.FunctionObject,
        FunctionReturn: () => D7.FunctionReturn,
        ParameterObject: () => D7.ParameterObject,
        ReferenceObject: () => D7.ReferenceObject,
        ReferenceRecord: () => D7.ReferenceRecord,
        RuleSetObject: () => D7.RuleSetObject,
        RuleSetRules: () => D7.RuleSetRules,
        TreeRuleObject: () => D7.TreeRuleObject,
        awsEndpointFunctions: () => PZ2,
        getUserAgentPrefix: () => KN4,
        isIpAddress: () => D7.isIpAddress,
        partition: () => OZ2,
        resolveEndpoint: () => D7.resolveEndpoint,
        setPartitionInfo: () => TZ2,
        useDefaultPartitionInfo: () => CN4
    });
    SZ2.exports = JN4(qZ2);
    var D7 = R7(),
        NZ2 = kr((A, B = !1) => {
            if (B) {
                for (let Q of A.split("."))
                    if (!NZ2(Q)) return !1;
                return !0
            }
            if (!D7.isValidHostLabel(A)) return !1;
            if (A.length < 3 || A.length > 63) return !1;
            if (A !== A.toLowerCase()) return !1;
            if (D7.isIpAddress(A)) return !1;
            return !0
        }, "isVirtualHostableS3Bucket"),
        $Z2 = ":",
        XN4 = "/",
        VN4 = kr((A) => {
            let B = A.split($Z2);
            if (B.length < 6) return null;
            let [Q, Z, D, G, F, ...I] = B;
            if (Q !== "arn" || Z === "" || D === "" || I.join($Z2) === "") return null;
            let Y = I.map((W) => W.split(XN4)).flat();
            return {
                partition: Z,
                service: D,
                region: G,
                accountId: F,
                resourceId: Y
            }
        }, "parseArn"),
        LZ2 = {
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
                    "ap-east-2": {
                        description: "Asia Pacific (Taipei)"
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
        MZ2 = LZ2,
        RZ2 = "",
        OZ2 = kr((A) => {
            let {
                partitions: B
            } = MZ2;
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
        TZ2 = kr((A, B = "") => {
            MZ2 = A, RZ2 = B
        }, "setPartitionInfo"),
        CN4 = kr(() => {
            TZ2(LZ2, "")
        }, "useDefaultPartitionInfo"),
        KN4 = kr(() => RZ2, "getUserAgentPrefix"),
        PZ2 = {
            isVirtualHostableS3Bucket: NZ2,
            parseArn: VN4,
            partition: OZ2
        };
    D7.customEndpointFunctions.aws = PZ2
});