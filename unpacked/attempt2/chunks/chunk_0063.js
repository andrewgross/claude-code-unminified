/* chunk:63 bytes:[1494062, 1512863) size:18801 source:unpacked-cli.js */
var V6 = E((g15, ya1) => {
    var {
        defineProperty: xK1,
        getOwnPropertyDescriptor: op9,
        getOwnPropertyNames: tp9
    } = Object, ep9 = Object.prototype.hasOwnProperty, L8 = (A, B) => xK1(A, "name", {
        value: B,
        configurable: !0
    }), Ai9 = (A, B) => {
        for (var Q in B) xK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Ta1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of tp9(B))
                if (!ep9.call(A, D) && D !== Q) xK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = op9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Bi9 = (A, B, Q) => (Ta1(A, B, "default"), Q && Ta1(Q, B, "default")), Qi9 = (A) => Ta1(xK1({}, "__esModule", {
        value: !0
    }), A), ja1 = {};
    Ai9(ja1, {
        Client: () => Zi9,
        Command: () => HQA,
        NoOpLogger: () => $i9,
        SENSITIVE_STRING: () => Gi9,
        ServiceException: () => Ii9,
        _json: () => Sa1,
        collectBody: () => Oa1.collectBody,
        convertMap: () => qi9,
        createAggregatedClient: () => Fi9,
        decorateServiceException: () => zQA,
        emitWarningIfUnsupportedVersion: () => Xi9,
        extendedEncodeURIComponent: () => Oa1.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => Ui9,
        getDefaultClientConfiguration: () => zi9,
        getDefaultExtensionConfiguration: () => UQA,
        getValueFromTextNode: () => wQA,
        isSerializableHeaderValue: () => wi9,
        loadConfigsForDefaultMode: () => Ji9,
        map: () => ka1,
        resolveDefaultRuntimeConfig: () => Ei9,
        resolvedPath: () => Oa1.resolvedPath,
        serializeDateTime: () => Ti9,
        serializeFloat: () => Oi9,
        take: () => Ni9,
        throwDefaultError: () => EQA,
        withBaseException: () => Yi9
    });
    ya1.exports = Qi9(ja1);
    var KQA = Vw(),
        Zi9 = class {
            constructor(A) {
                this.config = A, this.middlewareStack = KQA.constructStack()
            }
            static {
                L8(this, "Client")
            }
            send(A, B, Q) {
                let Z = typeof B !== "function" ? B : void 0,
                    D = typeof B === "function" ? B : Q,
                    G = Z === void 0 && this.config.cacheMiddleware === !0,
                    F;
                if (G) {
                    if (!this.handlers) this.handlers = new WeakMap;
                    let I = this.handlers;
                    if (I.has(A.constructor)) F = I.get(A.constructor);
                    else F = A.resolveMiddleware(this.middlewareStack, this.config, Z), I.set(A.constructor, F)
                } else delete this.handlers, F = A.resolveMiddleware(this.middlewareStack, this.config, Z);
                if (D) F(A).then((I) => D(null, I.output), (I) => D(I)).catch(() => {});
                else return F(A).then((I) => I.output)
            }
            destroy() {
                this.config?.requestHandler?.destroy?.(), delete this.handlers
            }
        },
        Oa1 = O6(),
        Pa1 = Yn1(),
        HQA = class {
            constructor() {
                this.middlewareStack = KQA.constructStack()
            }
            static {
                L8(this, "Command")
            }
            static classBuilder() {
                return new Di9
            }
            resolveMiddlewareWithContext(A, B, Q, {
                middlewareFn: Z,
                clientName: D,
                commandName: G,
                inputFilterSensitiveLog: F,
                outputFilterSensitiveLog: I,
                smithyContext: Y,
                additionalContext: W,
                CommandCtor: J
            }) {
                for (let H of Z.bind(this)(J, A, B, Q)) this.middlewareStack.use(H);
                let X = A.concat(this.middlewareStack),
                    {
                        logger: V
                    } = B,
                    C = {
                        logger: V,
                        clientName: D,
                        commandName: G,
                        inputFilterSensitiveLog: F,
                        outputFilterSensitiveLog: I,
                        [Pa1.SMITHY_CONTEXT_KEY]: {
                            commandInstance: this,
                            ...Y
                        },
                        ...W
                    },
                    {
                        requestHandler: K
                    } = B;
                return X.resolve((H) => K.handle(H.request, Q || {}), C)
            }
        },
        Di9 = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                L8(this, "ClassBuilder")
            }
            init(A) {
                this._init = A
            }
            ep(A) {
                return this._ep = A, this
            }
            m(A) {
                return this._middlewareFn = A, this
            }
            s(A, B, Q = {}) {
                return this._smithyContext = {
                    service: A,
                    operation: B,
                    ...Q
                }, this
            }
            c(A = {}) {
                return this._additionalContext = A, this
            }
            n(A, B) {
                return this._clientName = A, this._commandName = B, this
            }
            f(A = (Q) => Q, B = (Q) => Q) {
                return this._inputFilterSensitiveLog = A, this._outputFilterSensitiveLog = B, this
            }
            ser(A) {
                return this._serializer = A, this
            }
            de(A) {
                return this._deserializer = A, this
            }
            sc(A) {
                return this._operationSchema = A, this._smithyContext.operationSchema = A, this
            }
            build() {
                let A = this,
                    B;
                return B = class extends HQA {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this), this.schema = A._operationSchema
                    }
                    static {
                        L8(this, "CommandRef")
                    }
                    static getEndpointParameterInstructions() {
                        return A._ep
                    }
                    resolveMiddleware(Q, Z, D) {
                        return this.resolveMiddlewareWithContext(Q, Z, D, {
                            CommandCtor: B,
                            middlewareFn: A._middlewareFn,
                            clientName: A._clientName,
                            commandName: A._commandName,
                            inputFilterSensitiveLog: A._inputFilterSensitiveLog,
                            outputFilterSensitiveLog: A._outputFilterSensitiveLog,
                            smithyContext: A._smithyContext,
                            additionalContext: A._additionalContext
                        })
                    }
                }
            }
        },
        Gi9 = "***SensitiveInformation***",
        Fi9 = L8((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = L8(async function(F, I, Y) {
                        let W = new Z(F);
                        if (typeof I === "function") this.send(W, I);
                        else if (typeof Y === "function") {
                            if (typeof I !== "object") throw new Error(`Expected http options but got ${typeof I}`);
                            this.send(W, I || {}, Y)
                        } else return this.send(W, I)
                    }, "methodImpl"),
                    G = (Q[0].toLowerCase() + Q.slice(1)).replace(/Command$/, "");
                B.prototype[G] = D
            }
        }, "createAggregatedClient"),
        Ii9 = class A extends Error {
            static {
                L8(this, "ServiceException")
            }
            constructor(B) {
                super(B.message);
                Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = B.name, this.$fault = B.$fault, this.$metadata = B.$metadata
            }
            static isInstance(B) {
                if (!B) return !1;
                let Q = B;
                return A.prototype.isPrototypeOf(Q) || Boolean(Q.$fault) && Boolean(Q.$metadata) && (Q.$fault === "client" || Q.$fault === "server")
            }
            static[Symbol.hasInstance](B) {
                if (!B) return !1;
                let Q = B;
                if (this === A) return A.isInstance(B);
                if (A.isInstance(B)) {
                    if (Q.name && this.name) return this.prototype.isPrototypeOf(B) || Q.name === this.name;
                    return this.prototype.isPrototypeOf(B)
                }
                return !1
            }
        },
        zQA = L8((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        EQA = L8(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = Wi9(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw zQA(F, B)
        }, "throwDefaultError"),
        Yi9 = L8((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                EQA({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        Wi9 = L8((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        Ji9 = L8((A) => {
            switch (A) {
                case "standard":
                    return {
                        retryMode: "standard", connectionTimeout: 3100
                    };
                case "in-region":
                    return {
                        retryMode: "standard", connectionTimeout: 1100
                    };
                case "cross-region":
                    return {
                        retryMode: "standard", connectionTimeout: 3100
                    };
                case "mobile":
                    return {
                        retryMode: "standard", connectionTimeout: 30000
                    };
                default:
                    return {}
            }
        }, "loadConfigsForDefaultMode"),
        CQA = !1,
        Xi9 = L8((A) => {
            if (A && !CQA && parseInt(A.substring(1, A.indexOf("."))) < 16) CQA = !0
        }, "emitWarningIfUnsupportedVersion"),
        Vi9 = L8((A) => {
            let B = [];
            for (let Q in Pa1.AlgorithmId) {
                let Z = Pa1.AlgorithmId[Q];
                if (A[Z] === void 0) continue;
                B.push({
                    algorithmId: () => Z,
                    checksumConstructor: () => A[Z]
                })
            }
            return {
                addChecksumAlgorithm(Q) {
                    B.push(Q)
                },
                checksumAlgorithms() {
                    return B
                }
            }
        }, "getChecksumConfiguration"),
        Ci9 = L8((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Ki9 = L8((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        Hi9 = L8((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        UQA = L8((A) => {
            return Object.assign(Vi9(A), Ki9(A))
        }, "getDefaultExtensionConfiguration"),
        zi9 = UQA,
        Ei9 = L8((A) => {
            return Object.assign(Ci9(A), Hi9(A))
        }, "resolveDefaultRuntimeConfig"),
        Ui9 = L8((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        wQA = L8((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = wQA(A[Q]);
            return A
        }, "getValueFromTextNode"),
        wi9 = L8((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        $i9 = class {
            static {
                L8(this, "NoOpLogger")
            }
            trace() {}
            debug() {}
            info() {}
            warn() {}
            error() {}
        };

    function ka1(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, Li9(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            $QA(Z, null, G, F)
        }
        return Z
    }
    L8(ka1, "map");
    var qi9 = L8((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        Ni9 = L8((A, B) => {
            let Q = {};
            for (let Z in B) $QA(Q, A, B, Z);
            return Q
        }, "take"),
        Li9 = L8((A, B, Q) => {
            return ka1(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        $QA = L8((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = Mi9, Y = Ri9, W = Z] = F;
                if (typeof I === "function" && I(B[W]) || typeof I !== "function" && !!I) A[Z] = Y(B[W]);
                return
            }
            let [D, G] = Q[Z];
            if (typeof G === "function") {
                let F, I = D === void 0 && (F = G()) != null,
                    Y = typeof D === "function" && !!D(void 0) || typeof D !== "function" && !!D;
                if (I) A[Z] = F;
                else if (Y) A[Z] = G()
            } else {
                let F = D === void 0 && G != null,
                    I = typeof D === "function" && !!D(G) || typeof D !== "function" && !!D;
                if (F || I) A[Z] = G
            }
        }, "applyInstruction"),
        Mi9 = L8((A) => A != null, "nonNullish"),
        Ri9 = L8((A) => A, "pass"),
        Oi9 = L8((A) => {
            if (A !== A) return "NaN";
            switch (A) {
                case 1 / 0:
                    return "Infinity";
                case -1 / 0:
                    return "-Infinity";
                default:
                    return A
            }
        }, "serializeFloat"),
        Ti9 = L8((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        Sa1 = L8((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(Sa1);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = Sa1(A[Q])
                }
                return B
            }
            return A
        }, "_json");
    Bi9(ja1, X6(), ya1.exports)
});
var vK1 = E((yi9) => {
    var Pi9 = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
        qQA = "[:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][" + Pi9 + "]*",
        Si9 = new RegExp("^" + qQA + "$"),
        ji9 = function(A, B) {
            let Q = [],
                Z = B.exec(A);
            while (Z) {
                let D = [];
                D.startIndex = B.lastIndex - Z[0].length;
                let G = Z.length;
                for (let F = 0; F < G; F++) D.push(Z[F]);
                Q.push(D), Z = B.exec(A)
            }
            return Q
        },
        ki9 = function(A) {
            let B = Si9.exec(A);
            return !(B === null || typeof B === "undefined")
        };
    yi9.isExist = function(A) {
        return typeof A !== "undefined"
    };
    yi9.isEmptyObject = function(A) {
        return Object.keys(A).length === 0
    };
    yi9.merge = function(A, B, Q) {
        if (B) {
            let Z = Object.keys(B),
                D = Z.length;
            for (let G = 0; G < D; G++)
                if (Q === "strict") A[Z[G]] = [B[Z[G]]];
                else A[Z[G]] = B[Z[G]]
        }
    };
    yi9.getValue = function(A) {
        if (yi9.isExist(A)) return A;
        else return ""
    };
    yi9.isName = ki9;
    yi9.getAllMatches = ji9;
    yi9.nameRegexp = qQA
});