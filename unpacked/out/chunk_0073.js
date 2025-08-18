/* chunk:73 bytes:[1707005, 1724579) size:17574 source:unpacked-cli.js */
var u5A = E((zA5, Rs1) => {
    var {
        defineProperty: VH1,
        getOwnPropertyDescriptor: Y1Q,
        getOwnPropertyNames: W1Q
    } = Object, J1Q = Object.prototype.hasOwnProperty, M8 = (A, B) => VH1(A, "name", {
        value: B,
        configurable: !0
    }), X1Q = (A, B) => {
        for (var Q in B) VH1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, $s1 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of W1Q(B))
                if (!J1Q.call(A, D) && D !== Q) VH1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Y1Q(B, D)) || Z.enumerable
                })
        }
        return A
    }, V1Q = (A, B, Q) => ($s1(A, B, "default"), Q && $s1(Q, B, "default")), C1Q = (A) => $s1(VH1({}, "__esModule", {
        value: !0
    }), A), Ls1 = {};
    X1Q(Ls1, {
        Client: () => K1Q,
        Command: () => x5A,
        NoOpLogger: () => k1Q,
        SENSITIVE_STRING: () => z1Q,
        ServiceException: () => U1Q,
        _json: () => Ns1,
        collectBody: () => ws1.collectBody,
        convertMap: () => y1Q,
        createAggregatedClient: () => E1Q,
        decorateServiceException: () => v5A,
        emitWarningIfUnsupportedVersion: () => N1Q,
        extendedEncodeURIComponent: () => ws1.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => S1Q,
        getDefaultClientConfiguration: () => T1Q,
        getDefaultExtensionConfiguration: () => f5A,
        getValueFromTextNode: () => h5A,
        isSerializableHeaderValue: () => j1Q,
        loadConfigsForDefaultMode: () => q1Q,
        map: () => Ms1,
        resolveDefaultRuntimeConfig: () => P1Q,
        resolvedPath: () => ws1.resolvedPath,
        serializeDateTime: () => h1Q,
        serializeFloat: () => f1Q,
        take: () => _1Q,
        throwDefaultError: () => b5A,
        withBaseException: () => w1Q
    });
    Rs1.exports = C1Q(Ls1);
    var _5A = Vw(),
        K1Q = class {
            constructor(A) {
                this.config = A, this.middlewareStack = _5A.constructStack()
            }
            static {
                M8(this, "Client")
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
        ws1 = O6(),
        qs1 = Fs1(),
        x5A = class {
            constructor() {
                this.middlewareStack = _5A.constructStack()
            }
            static {
                M8(this, "Command")
            }
            static classBuilder() {
                return new H1Q
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
                        [qs1.SMITHY_CONTEXT_KEY]: {
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
        H1Q = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                M8(this, "ClassBuilder")
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
                return B = class extends x5A {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this), this.schema = A._operationSchema
                    }
                    static {
                        M8(this, "CommandRef")
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
        z1Q = "***SensitiveInformation***",
        E1Q = M8((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = M8(async function(F, I, Y) {
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
        U1Q = class A extends Error {
            static {
                M8(this, "ServiceException")
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
        v5A = M8((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        b5A = M8(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = $1Q(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw v5A(F, B)
        }, "throwDefaultError"),
        w1Q = M8((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                b5A({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        $1Q = M8((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        q1Q = M8((A) => {
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
        y5A = !1,
        N1Q = M8((A) => {
            if (A && !y5A && parseInt(A.substring(1, A.indexOf("."))) < 16) y5A = !0
        }, "emitWarningIfUnsupportedVersion"),
        L1Q = M8((A) => {
            let B = [];
            for (let Q in qs1.AlgorithmId) {
                let Z = qs1.AlgorithmId[Q];
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
        M1Q = M8((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        R1Q = M8((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        O1Q = M8((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        f5A = M8((A) => {
            return Object.assign(L1Q(A), R1Q(A))
        }, "getDefaultExtensionConfiguration"),
        T1Q = f5A,
        P1Q = M8((A) => {
            return Object.assign(M1Q(A), O1Q(A))
        }, "resolveDefaultRuntimeConfig"),
        S1Q = M8((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        h5A = M8((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = h5A(A[Q]);
            return A
        }, "getValueFromTextNode"),
        j1Q = M8((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        k1Q = class {
            static {
                M8(this, "NoOpLogger")
            }
            trace() {}
            debug() {}
            info() {}
            warn() {}
            error() {}
        };

    function Ms1(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, x1Q(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            g5A(Z, null, G, F)
        }
        return Z
    }
    M8(Ms1, "map");
    var y1Q = M8((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        _1Q = M8((A, B) => {
            let Q = {};
            for (let Z in B) g5A(Q, A, B, Z);
            return Q
        }, "take"),
        x1Q = M8((A, B, Q) => {
            return Ms1(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        g5A = M8((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = v1Q, Y = b1Q, W = Z] = F;
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
        v1Q = M8((A) => A != null, "nonNullish"),
        b1Q = M8((A) => A, "pass"),
        f1Q = M8((A) => {
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
        h1Q = M8((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        Ns1 = M8((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(Ns1);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = Ns1(A[Q])
                }
                return B
            }
            return A
        }, "_json");
    V1Q(Ls1, X6(), Rs1.exports)
});
var c5A = E((m5A) => {
    Object.defineProperty(m5A, "__esModule", {
        value: !0
    });
    m5A.isStreamingPayload = void 0;
    var g1Q = W1("stream"),
        u1Q = (A) => (A === null || A === void 0 ? void 0 : A.body) instanceof g1Q.Readable || typeof ReadableStream !== "undefined" && (A === null || A === void 0 ? void 0 : A.body) instanceof ReadableStream;
    m5A.isStreamingPayload = u1Q
});