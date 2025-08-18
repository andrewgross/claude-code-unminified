/* chunk:225 bytes:[4882605, 4902480) size:19875 source:unpacked-cli.js */
var H81 = E((Xw5, PA2) => {
    var {
        defineProperty: YN1,
        getOwnPropertyDescriptor: XY4,
        getOwnPropertyNames: VY4
    } = Object, CY4 = Object.prototype.hasOwnProperty, H60 = (A, B) => YN1(A, "name", {
        value: B,
        configurable: !0
    }), KY4 = (A, B) => {
        for (var Q in B) YN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, HY4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of VY4(B))
                if (!CY4.call(A, D) && D !== Q) YN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = XY4(B, D)) || Z.enumerable
                })
        }
        return A
    }, zY4 = (A) => HY4(YN1({}, "__esModule", {
        value: !0
    }), A), RA2 = {};
    KY4(RA2, {
        getLoggerPlugin: () => EY4,
        loggerMiddleware: () => OA2,
        loggerMiddlewareOptions: () => TA2
    });
    PA2.exports = zY4(RA2);
    var OA2 = H60(() => (A, B) => async (Q) => {
            try {
                let Z = await A(Q),
                    {
                        clientName: D,
                        commandName: G,
                        logger: F,
                        dynamoDbDocumentClientOptions: I = {}
                    } = B,
                    {
                        overrideInputFilterSensitiveLog: Y,
                        overrideOutputFilterSensitiveLog: W
                    } = I,
                    J = Y ?? B.inputFilterSensitiveLog,
                    X = W ?? B.outputFilterSensitiveLog,
                    {
                        $metadata: V,
                        ...C
                    } = Z.output;
                return F?.info?.({
                    clientName: D,
                    commandName: G,
                    input: J(Q.input),
                    output: X(C),
                    metadata: V
                }), Z
            } catch (Z) {
                let {
                    clientName: D,
                    commandName: G,
                    logger: F,
                    dynamoDbDocumentClientOptions: I = {}
                } = B, {
                    overrideInputFilterSensitiveLog: Y
                } = I, W = Y ?? B.inputFilterSensitiveLog;
                throw F?.error?.({
                    clientName: D,
                    commandName: G,
                    input: W(Q.input),
                    error: Z,
                    metadata: Z.$metadata
                }), Z
            }
        }, "loggerMiddleware"),
        TA2 = {
            name: "loggerMiddleware",
            tags: ["LOGGER"],
            step: "initialize",
            override: !0
        },
        EY4 = H60((A) => ({
            applyToStack: H60((B) => {
                B.add(OA2(), TA2)
            }, "applyToStack")
        }), "getLoggerPlugin")
});
var z81 = E((Vw5, yA2) => {
    var {
        defineProperty: JN1,
        getOwnPropertyDescriptor: UY4,
        getOwnPropertyNames: wY4
    } = Object, $Y4 = Object.prototype.hasOwnProperty, WN1 = (A, B) => JN1(A, "name", {
        value: B,
        configurable: !0
    }), qY4 = (A, B) => {
        for (var Q in B) JN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, NY4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of wY4(B))
                if (!$Y4.call(A, D) && D !== Q) JN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = UY4(B, D)) || Z.enumerable
                })
        }
        return A
    }, LY4 = (A) => NY4(JN1({}, "__esModule", {
        value: !0
    }), A), SA2 = {};
    qY4(SA2, {
        addRecursionDetectionMiddlewareOptions: () => kA2,
        getRecursionDetectionPlugin: () => TY4,
        recursionDetectionMiddleware: () => jA2
    });
    yA2.exports = LY4(SA2);
    var MY4 = QX(),
        z60 = "X-Amzn-Trace-Id",
        RY4 = "AWS_LAMBDA_FUNCTION_NAME",
        OY4 = "_X_AMZN_TRACE_ID",
        jA2 = WN1((A) => (B) => async (Q) => {
            let {
                request: Z
            } = Q;
            if (!MY4.HttpRequest.isInstance(Z) || A.runtime !== "node") return B(Q);
            let D = Object.keys(Z.headers ?? {}).find((Y) => Y.toLowerCase() === z60.toLowerCase()) ?? z60;
            if (Z.headers.hasOwnProperty(D)) return B(Q);
            let G = process.env[RY4],
                F = process.env[OY4],
                I = WN1((Y) => typeof Y === "string" && Y.length > 0, "nonEmptyString");
            if (I(G) && I(F)) Z.headers[z60] = F;
            return B({
                ...Q,
                request: Z
            })
        }, "recursionDetectionMiddleware"),
        kA2 = {
            step: "build",
            tags: ["RECURSION_DETECTION"],
            name: "recursionDetectionMiddleware",
            override: !0,
            priority: "low"
        },
        TY4 = WN1((A) => ({
            applyToStack: WN1((B) => {
                B.add(jA2(A), kA2)
            }, "applyToStack")
        }), "getRecursionDetectionPlugin")
});
var rs = E((Cw5, dA2) => {
    var {
        defineProperty: XN1,
        getOwnPropertyDescriptor: PY4,
        getOwnPropertyNames: SY4
    } = Object, jY4 = Object.prototype.hasOwnProperty, ss = (A, B) => XN1(A, "name", {
        value: B,
        configurable: !0
    }), kY4 = (A, B) => {
        for (var Q in B) XN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, yY4 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of SY4(B))
                if (!jY4.call(A, D) && D !== Q) XN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = PY4(B, D)) || Z.enumerable
                })
        }
        return A
    }, _Y4 = (A) => yY4(XN1({}, "__esModule", {
        value: !0
    }), A), xA2 = {};
    kY4(xA2, {
        ConditionObject: () => Z7.ConditionObject,
        DeprecatedObject: () => Z7.DeprecatedObject,
        EndpointError: () => Z7.EndpointError,
        EndpointObject: () => Z7.EndpointObject,
        EndpointObjectHeaders: () => Z7.EndpointObjectHeaders,
        EndpointObjectProperties: () => Z7.EndpointObjectProperties,
        EndpointParams: () => Z7.EndpointParams,
        EndpointResolverOptions: () => Z7.EndpointResolverOptions,
        EndpointRuleObject: () => Z7.EndpointRuleObject,
        ErrorRuleObject: () => Z7.ErrorRuleObject,
        EvaluateOptions: () => Z7.EvaluateOptions,
        Expression: () => Z7.Expression,
        FunctionArgv: () => Z7.FunctionArgv,
        FunctionObject: () => Z7.FunctionObject,
        FunctionReturn: () => Z7.FunctionReturn,
        ParameterObject: () => Z7.ParameterObject,
        ReferenceObject: () => Z7.ReferenceObject,
        ReferenceRecord: () => Z7.ReferenceRecord,
        RuleSetObject: () => Z7.RuleSetObject,
        RuleSetRules: () => Z7.RuleSetRules,
        TreeRuleObject: () => Z7.TreeRuleObject,
        awsEndpointFunctions: () => mA2,
        getUserAgentPrefix: () => fY4,
        isIpAddress: () => Z7.isIpAddress,
        partition: () => gA2,
        resolveEndpoint: () => Z7.resolveEndpoint,
        setPartitionInfo: () => uA2,
        useDefaultPartitionInfo: () => bY4
    });
    dA2.exports = _Y4(xA2);
    var Z7 = R7(),
        vA2 = ss((A, B = !1) => {
            if (B) {
                for (let Q of A.split("."))
                    if (!vA2(Q)) return !1;
                return !0
            }
            if (!Z7.isValidHostLabel(A)) return !1;
            if (A.length < 3 || A.length > 63) return !1;
            if (A !== A.toLowerCase()) return !1;
            if (Z7.isIpAddress(A)) return !1;
            return !0
        }, "isVirtualHostableS3Bucket"),
        _A2 = ":",
        xY4 = "/",
        vY4 = ss((A) => {
            let B = A.split(_A2);
            if (B.length < 6) return null;
            let [Q, Z, D, G, F, ...I] = B;
            if (Q !== "arn" || Z === "" || D === "" || I.join(_A2) === "") return null;
            let Y = I.map((W) => W.split(xY4)).flat();
            return {
                partition: Z,
                service: D,
                region: G,
                accountId: F,
                resourceId: Y
            }
        }, "parseArn"),
        bA2 = {
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
        fA2 = bA2,
        hA2 = "",
        gA2 = ss((A) => {
            let {
                partitions: B
            } = fA2;
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
        uA2 = ss((A, B = "") => {
            fA2 = A, hA2 = B
        }, "setPartitionInfo"),
        bY4 = ss(() => {
            uA2(bA2, "")
        }, "useDefaultPartitionInfo"),
        fY4 = ss(() => hA2, "getUserAgentPrefix"),
        mA2 = {
            isVirtualHostableS3Bucket: vA2,
            parseArn: vY4,
            partition: gA2
        };
    Z7.customEndpointFunctions.aws = mA2
});