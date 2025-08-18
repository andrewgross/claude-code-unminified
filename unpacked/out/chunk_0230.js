/* chunk:230 bytes:[4961593, 4978758) size:17165 source:unpacked-cli.js */
var d4 = E((Pw5, m60) => {
    var {
        defineProperty: PN1,
        getOwnPropertyDescriptor: ZJ4,
        getOwnPropertyNames: DJ4
    } = Object, GJ4 = Object.prototype.hasOwnProperty, R8 = (A, B) => PN1(A, "name", {
        value: B,
        configurable: !0
    }), FJ4 = (A, B) => {
        for (var Q in B) PN1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, b60 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of DJ4(B))
                if (!GJ4.call(A, D) && D !== Q) PN1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ZJ4(B, D)) || Z.enumerable
                })
        }
        return A
    }, IJ4 = (A, B, Q) => (b60(A, B, "default"), Q && b60(Q, B, "default")), YJ4 = (A) => b60(PN1({}, "__esModule", {
        value: !0
    }), A), g60 = {};
    FJ4(g60, {
        Client: () => WJ4,
        Command: () => OB2,
        NoOpLogger: () => OJ4,
        SENSITIVE_STRING: () => XJ4,
        ServiceException: () => CJ4,
        _json: () => h60,
        collectBody: () => v60.collectBody,
        convertMap: () => TJ4,
        createAggregatedClient: () => VJ4,
        decorateServiceException: () => TB2,
        emitWarningIfUnsupportedVersion: () => EJ4,
        extendedEncodeURIComponent: () => v60.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => MJ4,
        getDefaultClientConfiguration: () => NJ4,
        getDefaultExtensionConfiguration: () => SB2,
        getValueFromTextNode: () => jB2,
        isSerializableHeaderValue: () => RJ4,
        loadConfigsForDefaultMode: () => zJ4,
        map: () => u60,
        resolveDefaultRuntimeConfig: () => LJ4,
        resolvedPath: () => v60.resolvedPath,
        serializeDateTime: () => _J4,
        serializeFloat: () => yJ4,
        take: () => PJ4,
        throwDefaultError: () => PB2,
        withBaseException: () => KJ4
    });
    m60.exports = YJ4(g60);
    var RB2 = Vw(),
        WJ4 = class {
            constructor(A) {
                this.config = A, this.middlewareStack = RB2.constructStack()
            }
            static {
                R8(this, "Client")
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
        v60 = O6(),
        f60 = K60(),
        OB2 = class {
            constructor() {
                this.middlewareStack = RB2.constructStack()
            }
            static {
                R8(this, "Command")
            }
            static classBuilder() {
                return new JJ4
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
                        [f60.SMITHY_CONTEXT_KEY]: {
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
        JJ4 = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                R8(this, "ClassBuilder")
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
                return B = class extends OB2 {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this), this.schema = A._operationSchema
                    }
                    static {
                        R8(this, "CommandRef")
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
        XJ4 = "***SensitiveInformation***",
        VJ4 = R8((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = R8(async function(F, I, Y) {
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
        CJ4 = class A extends Error {
            static {
                R8(this, "ServiceException")
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
        TB2 = R8((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        PB2 = R8(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = HJ4(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw TB2(F, B)
        }, "throwDefaultError"),
        KJ4 = R8((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                PB2({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        HJ4 = R8((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        zJ4 = R8((A) => {
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
        MB2 = !1,
        EJ4 = R8((A) => {
            if (A && !MB2 && parseInt(A.substring(1, A.indexOf("."))) < 16) MB2 = !0
        }, "emitWarningIfUnsupportedVersion"),
        UJ4 = R8((A) => {
            let B = [];
            for (let Q in f60.AlgorithmId) {
                let Z = f60.AlgorithmId[Q];
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
        wJ4 = R8((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        $J4 = R8((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        qJ4 = R8((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        SB2 = R8((A) => {
            return Object.assign(UJ4(A), $J4(A))
        }, "getDefaultExtensionConfiguration"),
        NJ4 = SB2,
        LJ4 = R8((A) => {
            return Object.assign(wJ4(A), qJ4(A))
        }, "resolveDefaultRuntimeConfig"),
        MJ4 = R8((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        jB2 = R8((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = jB2(A[Q]);
            return A
        }, "getValueFromTextNode"),
        RJ4 = R8((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        OJ4 = class {
            static {
                R8(this, "NoOpLogger")
            }
            trace() {}
            debug() {}
            info() {}
            warn() {}
            error() {}
        };

    function u60(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, SJ4(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            kB2(Z, null, G, F)
        }
        return Z
    }
    R8(u60, "map");
    var TJ4 = R8((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        PJ4 = R8((A, B) => {
            let Q = {};
            for (let Z in B) kB2(Q, A, B, Z);
            return Q
        }, "take"),
        SJ4 = R8((A, B, Q) => {
            return u60(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        kB2 = R8((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = jJ4, Y = kJ4, W = Z] = F;
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
        jJ4 = R8((A) => A != null, "nonNullish"),
        kJ4 = R8((A) => A, "pass"),
        yJ4 = R8((A) => {
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
        _J4 = R8((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        h60 = R8((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(h60);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = h60(A[Q])
                }
                return B
            }
            return A
        }, "_json");
    IJ4(g60, X6(), m60.exports)
});