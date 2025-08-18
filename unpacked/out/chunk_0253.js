/* chunk:253 bytes:[5414500, 5431665) size:17165 source:unpacked-cli.js */
var H6 = E((pq5, u30) => {
    var {
        defineProperty: _L1,
        getOwnPropertyDescriptor: xL4,
        getOwnPropertyNames: vL4
    } = Object, bL4 = Object.prototype.hasOwnProperty, O8 = (A, B) => _L1(A, "name", {
        value: B,
        configurable: !0
    }), fL4 = (A, B) => {
        for (var Q in B) _L1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, v30 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of vL4(B))
                if (!bL4.call(A, D) && D !== Q) _L1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = xL4(B, D)) || Z.enumerable
                })
        }
        return A
    }, hL4 = (A, B, Q) => (v30(A, B, "default"), Q && v30(Q, B, "default")), gL4 = (A) => v30(_L1({}, "__esModule", {
        value: !0
    }), A), h30 = {};
    fL4(h30, {
        Client: () => uL4,
        Command: () => CG2,
        NoOpLogger: () => ZM4,
        SENSITIVE_STRING: () => dL4,
        ServiceException: () => lL4,
        _json: () => f30,
        collectBody: () => x30.collectBody,
        convertMap: () => DM4,
        createAggregatedClient: () => cL4,
        decorateServiceException: () => KG2,
        emitWarningIfUnsupportedVersion: () => aL4,
        extendedEncodeURIComponent: () => x30.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => BM4,
        getDefaultClientConfiguration: () => eL4,
        getDefaultExtensionConfiguration: () => zG2,
        getValueFromTextNode: () => EG2,
        isSerializableHeaderValue: () => QM4,
        loadConfigsForDefaultMode: () => nL4,
        map: () => g30,
        resolveDefaultRuntimeConfig: () => AM4,
        resolvedPath: () => x30.resolvedPath,
        serializeDateTime: () => JM4,
        serializeFloat: () => WM4,
        take: () => GM4,
        throwDefaultError: () => HG2,
        withBaseException: () => pL4
    });
    u30.exports = gL4(h30);
    var VG2 = Vw(),
        uL4 = class {
            constructor(A) {
                this.config = A, this.middlewareStack = VG2.constructStack()
            }
            static {
                O8(this, "Client")
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
        x30 = O6(),
        b30 = C30(),
        CG2 = class {
            constructor() {
                this.middlewareStack = VG2.constructStack()
            }
            static {
                O8(this, "Command")
            }
            static classBuilder() {
                return new mL4
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
                        [b30.SMITHY_CONTEXT_KEY]: {
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
        mL4 = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                O8(this, "ClassBuilder")
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
                return B = class extends CG2 {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this), this.schema = A._operationSchema
                    }
                    static {
                        O8(this, "CommandRef")
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
        dL4 = "***SensitiveInformation***",
        cL4 = O8((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = O8(async function(F, I, Y) {
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
        lL4 = class A extends Error {
            static {
                O8(this, "ServiceException")
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
        KG2 = O8((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        HG2 = O8(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = iL4(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw KG2(F, B)
        }, "throwDefaultError"),
        pL4 = O8((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                HG2({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        iL4 = O8((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        nL4 = O8((A) => {
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
        XG2 = !1,
        aL4 = O8((A) => {
            if (A && !XG2 && parseInt(A.substring(1, A.indexOf("."))) < 16) XG2 = !0
        }, "emitWarningIfUnsupportedVersion"),
        sL4 = O8((A) => {
            let B = [];
            for (let Q in b30.AlgorithmId) {
                let Z = b30.AlgorithmId[Q];
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
        rL4 = O8((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        oL4 = O8((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        tL4 = O8((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        zG2 = O8((A) => {
            return Object.assign(sL4(A), oL4(A))
        }, "getDefaultExtensionConfiguration"),
        eL4 = zG2,
        AM4 = O8((A) => {
            return Object.assign(rL4(A), tL4(A))
        }, "resolveDefaultRuntimeConfig"),
        BM4 = O8((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        EG2 = O8((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = EG2(A[Q]);
            return A
        }, "getValueFromTextNode"),
        QM4 = O8((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        ZM4 = class {
            static {
                O8(this, "NoOpLogger")
            }
            trace() {}
            debug() {}
            info() {}
            warn() {}
            error() {}
        };

    function g30(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, FM4(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            UG2(Z, null, G, F)
        }
        return Z
    }
    O8(g30, "map");
    var DM4 = O8((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        GM4 = O8((A, B) => {
            let Q = {};
            for (let Z in B) UG2(Q, A, B, Z);
            return Q
        }, "take"),
        FM4 = O8((A, B, Q) => {
            return g30(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        UG2 = O8((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = IM4, Y = YM4, W = Z] = F;
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
        IM4 = O8((A) => A != null, "nonNullish"),
        YM4 = O8((A) => A, "pass"),
        WM4 = O8((A) => {
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
        JM4 = O8((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        f30 = O8((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(f30);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = f30(A[Q])
                }
                return B
            }
            return A
        }, "_json");
    hL4(h30, X6(), u30.exports)
});