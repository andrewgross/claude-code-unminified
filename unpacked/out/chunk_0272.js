/* chunk:272 bytes:[5806434, 5823428) size:16994 source:unpacked-cli.js */
var Y51 = E((qM5, kK2) => {
    var {
        defineProperty: kM1,
        getOwnPropertyDescriptor: ib4,
        getOwnPropertyNames: nb4
    } = Object, ab4 = Object.prototype.hasOwnProperty, Go = (A, B) => kM1(A, "name", {
        value: B,
        configurable: !0
    }), sb4 = (A, B) => {
        for (var Q in B) kM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, rb4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of nb4(B))
                if (!ab4.call(A, D) && D !== Q) kM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ib4(B, D)) || Z.enumerable
                })
        }
        return A
    }, ob4 = (A) => rb4(kM1({}, "__esModule", {
        value: !0
    }), A), LK2 = {};
    sb4(LK2, {
        ConditionObject: () => G7.ConditionObject,
        DeprecatedObject: () => G7.DeprecatedObject,
        EndpointError: () => G7.EndpointError,
        EndpointObject: () => G7.EndpointObject,
        EndpointObjectHeaders: () => G7.EndpointObjectHeaders,
        EndpointObjectProperties: () => G7.EndpointObjectProperties,
        EndpointParams: () => G7.EndpointParams,
        EndpointResolverOptions: () => G7.EndpointResolverOptions,
        EndpointRuleObject: () => G7.EndpointRuleObject,
        ErrorRuleObject: () => G7.ErrorRuleObject,
        EvaluateOptions: () => G7.EvaluateOptions,
        Expression: () => G7.Expression,
        FunctionArgv: () => G7.FunctionArgv,
        FunctionObject: () => G7.FunctionObject,
        FunctionReturn: () => G7.FunctionReturn,
        ParameterObject: () => G7.ParameterObject,
        ReferenceObject: () => G7.ReferenceObject,
        ReferenceRecord: () => G7.ReferenceRecord,
        RuleSetObject: () => G7.RuleSetObject,
        RuleSetRules: () => G7.RuleSetRules,
        TreeRuleObject: () => G7.TreeRuleObject,
        awsEndpointFunctions: () => jK2,
        getUserAgentPrefix: () => Bf4,
        isIpAddress: () => G7.isIpAddress,
        partition: () => PK2,
        resolveEndpoint: () => G7.resolveEndpoint,
        setPartitionInfo: () => SK2,
        useDefaultPartitionInfo: () => Af4
    });
    kK2.exports = ob4(LK2);
    var G7 = R7(),
        MK2 = Go((A, B = !1) => {
            if (B) {
                for (let Q of A.split("."))
                    if (!MK2(Q)) return !1;
                return !0
            }
            if (!G7.isValidHostLabel(A)) return !1;
            if (A.length < 3 || A.length > 63) return !1;
            if (A !== A.toLowerCase()) return !1;
            if (G7.isIpAddress(A)) return !1;
            return !0
        }, "isVirtualHostableS3Bucket"),
        NK2 = ":",
        tb4 = "/",
        eb4 = Go((A) => {
            let B = A.split(NK2);
            if (B.length < 6) return null;
            let [Q, Z, D, G, F, ...I] = B;
            if (Q !== "arn" || Z === "" || D === "" || I.join(NK2) === "") return null;
            let Y = I.map((W) => W.split(tb4)).flat();
            return {
                partition: Z,
                service: D,
                region: G,
                accountId: F,
                resourceId: Y
            }
        }, "parseArn"),
        RK2 = {
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
        OK2 = RK2,
        TK2 = "",
        PK2 = Go((A) => {
            let {
                partitions: B
            } = OK2;
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
        SK2 = Go((A, B = "") => {
            OK2 = A, TK2 = B
        }, "setPartitionInfo"),
        Af4 = Go(() => {
            SK2(RK2, "")
        }, "useDefaultPartitionInfo"),
        Bf4 = Go(() => TK2, "getUserAgentPrefix"),
        jK2 = {
            isVirtualHostableS3Bucket: MK2,
            parseArn: eb4,
            partition: PK2
        };
    G7.customEndpointFunctions.aws = jK2
});
var xK2 = E((NM5, _K2) => {
    var {
        defineProperty: yM1,
        getOwnPropertyDescriptor: Qf4,
        getOwnPropertyNames: Zf4
    } = Object, Df4 = Object.prototype.hasOwnProperty, Gf4 = (A, B) => yM1(A, "name", {
        value: B,
        configurable: !0
    }), Ff4 = (A, B) => {
        for (var Q in B) yM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, If4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Zf4(B))
                if (!Df4.call(A, D) && D !== Q) yM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Qf4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Yf4 = (A) => If4(yM1({}, "__esModule", {
        value: !0
    }), A), yK2 = {};
    Ff4(yK2, {
        isArrayBuffer: () => Wf4
    });
    _K2.exports = Yf4(yK2);
    var Wf4 = Gf4((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var hK2 = E((LM5, fK2) => {
    var {
        defineProperty: _M1,
        getOwnPropertyDescriptor: Jf4,
        getOwnPropertyNames: Xf4
    } = Object, Vf4 = Object.prototype.hasOwnProperty, pZ0 = (A, B) => _M1(A, "name", {
        value: B,
        configurable: !0
    }), Cf4 = (A, B) => {
        for (var Q in B) _M1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Kf4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Xf4(B))
                if (!Vf4.call(A, D) && D !== Q) _M1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Jf4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Hf4 = (A) => Kf4(_M1({}, "__esModule", {
        value: !0
    }), A), vK2 = {};
    Cf4(vK2, {
        escapeUri: () => bK2,
        escapeUriPath: () => Ef4
    });
    fK2.exports = Hf4(vK2);
    var bK2 = pZ0((A) => encodeURIComponent(A).replace(/[!'()*]/g, zf4), "escapeUri"),
        zf4 = pZ0((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        Ef4 = pZ0((A) => A.split("/").map(bK2).join("/"), "escapeUriPath")
});