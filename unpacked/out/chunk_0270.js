/* chunk:270 bytes:[5773710, 5793316) size:19606 source:unpacked-cli.js */
var P8 = E((FM5, uZ0) => {
    var {
        defineProperty: wM1,
        getOwnPropertyDescriptor: Jv4,
        getOwnPropertyNames: Xv4
    } = Object, Vv4 = Object.prototype.hasOwnProperty, T8 = (A, B) => wM1(A, "name", {
        value: B,
        configurable: !0
    }), Cv4 = (A, B) => {
        for (var Q in B) wM1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, vZ0 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Xv4(B))
                if (!Vv4.call(A, D) && D !== Q) wM1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Jv4(B, D)) || Z.enumerable
                })
        }
        return A
    }, Kv4 = (A, B, Q) => (vZ0(A, B, "default"), Q && vZ0(Q, B, "default")), Hv4 = (A) => vZ0(wM1({}, "__esModule", {
        value: !0
    }), A), hZ0 = {};
    Cv4(hZ0, {
        Client: () => zv4,
        Command: () => bC2,
        NoOpLogger: () => _v4,
        SENSITIVE_STRING: () => Uv4,
        ServiceException: () => $v4,
        _json: () => fZ0,
        collectBody: () => xZ0.collectBody,
        convertMap: () => xv4,
        createAggregatedClient: () => wv4,
        decorateServiceException: () => fC2,
        emitWarningIfUnsupportedVersion: () => Mv4,
        extendedEncodeURIComponent: () => xZ0.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => kv4,
        getDefaultClientConfiguration: () => Sv4,
        getDefaultExtensionConfiguration: () => gC2,
        getValueFromTextNode: () => uC2,
        isSerializableHeaderValue: () => yv4,
        loadConfigsForDefaultMode: () => Lv4,
        map: () => gZ0,
        resolveDefaultRuntimeConfig: () => jv4,
        resolvedPath: () => xZ0.resolvedPath,
        serializeDateTime: () => uv4,
        serializeFloat: () => gv4,
        take: () => vv4,
        throwDefaultError: () => hC2,
        withBaseException: () => qv4
    });
    uZ0.exports = Hv4(hZ0);
    var vC2 = Vw(),
        zv4 = class {
            constructor(A) {
                this.config = A, this.middlewareStack = vC2.constructStack()
            }
            static {
                T8(this, "Client")
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
        xZ0 = O6(),
        bZ0 = _Z0(),
        bC2 = class {
            constructor() {
                this.middlewareStack = vC2.constructStack()
            }
            static {
                T8(this, "Command")
            }
            static classBuilder() {
                return new Ev4
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
                        [bZ0.SMITHY_CONTEXT_KEY]: {
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
        Ev4 = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                T8(this, "ClassBuilder")
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
                return B = class extends bC2 {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this), this.schema = A._operationSchema
                    }
                    static {
                        T8(this, "CommandRef")
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
        Uv4 = "***SensitiveInformation***",
        wv4 = T8((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = T8(async function(F, I, Y) {
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
        $v4 = class A extends Error {
            static {
                T8(this, "ServiceException")
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
        fC2 = T8((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        hC2 = T8(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = Nv4(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw fC2(F, B)
        }, "throwDefaultError"),
        qv4 = T8((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                hC2({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        Nv4 = T8((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        Lv4 = T8((A) => {
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
        xC2 = !1,
        Mv4 = T8((A) => {
            if (A && !xC2 && parseInt(A.substring(1, A.indexOf("."))) < 16) xC2 = !0
        }, "emitWarningIfUnsupportedVersion"),
        Rv4 = T8((A) => {
            let B = [];
            for (let Q in bZ0.AlgorithmId) {
                let Z = bZ0.AlgorithmId[Q];
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
        Ov4 = T8((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Tv4 = T8((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        Pv4 = T8((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        gC2 = T8((A) => {
            return Object.assign(Rv4(A), Tv4(A))
        }, "getDefaultExtensionConfiguration"),
        Sv4 = gC2,
        jv4 = T8((A) => {
            return Object.assign(Ov4(A), Pv4(A))
        }, "resolveDefaultRuntimeConfig"),
        kv4 = T8((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        uC2 = T8((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = uC2(A[Q]);
            return A
        }, "getValueFromTextNode"),
        yv4 = T8((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        _v4 = class {
            static {
                T8(this, "NoOpLogger")
            }
            trace() {}
            debug() {}
            info() {}
            warn() {}
            error() {}
        };

    function gZ0(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, bv4(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            mC2(Z, null, G, F)
        }
        return Z
    }
    T8(gZ0, "map");
    var xv4 = T8((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        vv4 = T8((A, B) => {
            let Q = {};
            for (let Z in B) mC2(Q, A, B, Z);
            return Q
        }, "take"),
        bv4 = T8((A, B, Q) => {
            return gZ0(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        mC2 = T8((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = fv4, Y = hv4, W = Z] = F;
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
        fv4 = T8((A) => A != null, "nonNullish"),
        hv4 = T8((A) => A, "pass"),
        gv4 = T8((A) => {
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
        uv4 = T8((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        fZ0 = T8((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(fZ0);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = fZ0(A[Q])
                }
                return B
            }
            return A
        }, "_json");
    Kv4(hZ0, X6(), uZ0.exports)
});
var cC2 = E((dC2) => {
    Object.defineProperty(dC2, "__esModule", {
        value: !0
    });
    dC2.createGetRequest = lv4;
    dC2.getCredentials = pv4;
    var mZ0 = A9(),
        mv4 = SK(),
        dv4 = P8(),
        cv4 = $k();

    function lv4(A) {
        return new mv4.HttpRequest({
            protocol: A.protocol,
            hostname: A.hostname,
            port: Number(A.port),
            path: A.pathname,
            query: Array.from(A.searchParams.entries()).reduce((B, [Q, Z]) => {
                return B[Q] = Z, B
            }, {}),
            fragment: A.hash
        })
    }
    async function pv4(A, B) {
        let Z = await cv4.sdkStreamMixin(A.body).transformToString();
        if (A.statusCode === 200) {
            let D = JSON.parse(Z);
            if (typeof D.AccessKeyId !== "string" || typeof D.SecretAccessKey !== "string" || typeof D.Token !== "string" || typeof D.Expiration !== "string") throw new mZ0.CredentialsProviderError("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }", {
                logger: B
            });
            return {
                accessKeyId: D.AccessKeyId,
                secretAccessKey: D.SecretAccessKey,
                sessionToken: D.Token,
                expiration: dv4.parseRfc3339DateTime(D.Expiration)
            }
        }
        if (A.statusCode >= 400 && A.statusCode < 500) {
            let D = {};
            try {
                D = JSON.parse(Z)
            } catch (G) {}
            throw Object.assign(new mZ0.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
                logger: B
            }), {
                Code: D.Code,
                Message: D.Message
            })
        }
        throw new mZ0.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
            logger: B
        })
    }
});
var iC2 = E((lC2) => {
    Object.defineProperty(lC2, "__esModule", {
        value: !0
    });
    lC2.retryWrapper = void 0;
    var av4 = (A, B, Q) => {
        return async () => {
            for (let Z = 0; Z < B; ++Z) try {
                return await A()
            } catch (D) {
                await new Promise((G) => setTimeout(G, Q))
            }
            return await A()
        }
    };
    lC2.retryWrapper = av4
});