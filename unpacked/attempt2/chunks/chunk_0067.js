/* chunk:67 bytes:[1563024, 1619003) size:55979 source:unpacked-cli.js */
var w4A = E((G05, U4A) => {
    var {
        defineProperty: gK1,
        getOwnPropertyDescriptor: Qa9,
        getOwnPropertyNames: Za9
    } = Object, Da9 = Object.prototype.hasOwnProperty, F8 = (A, B) => gK1(A, "name", {
        value: B,
        configurable: !0
    }), Ga9 = (A, B) => {
        for (var Q in B) gK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Fa9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Za9(B))
                if (!Da9.call(A, D) && D !== Q) gK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Qa9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Ia9 = (A) => Fa9(gK1({}, "__esModule", {
        value: !0
    }), A), Y4A = {};
    Ga9(Y4A, {
        AwsEc2QueryProtocol: () => ba9,
        AwsJson1_0Protocol: () => qa9,
        AwsJson1_1Protocol: () => Na9,
        AwsJsonRpcProtocol: () => la1,
        AwsQueryProtocol: () => C4A,
        AwsRestJsonProtocol: () => Ma9,
        AwsRestXmlProtocol: () => da9,
        JsonCodec: () => ca1,
        JsonShapeDeserializer: () => X4A,
        JsonShapeSerializer: () => V4A,
        XmlCodec: () => E4A,
        XmlShapeDeserializer: () => pa1,
        XmlShapeSerializer: () => z4A,
        _toBool: () => Wa9,
        _toNum: () => Ja9,
        _toStr: () => Ya9,
        awsExpectUnion: () => Oa9,
        loadRestJsonErrorCode: () => da1,
        loadRestXmlErrorCode: () => H4A,
        parseJsonBody: () => ma1,
        parseJsonErrorBody: () => za9,
        parseXmlBody: () => K4A,
        parseXmlErrorBody: () => ua9
    });
    U4A.exports = Ia9(Y4A);
    var Ya9 = F8((A) => {
            if (A == null) return A;
            if (typeof A === "number" || typeof A === "bigint") {
                let B = new Error(`Received number ${A} where a string was expected.`);
                return B.name = "Warning", console.warn(B), String(A)
            }
            if (typeof A === "boolean") {
                let B = new Error(`Received boolean ${A} where a string was expected.`);
                return B.name = "Warning", console.warn(B), String(A)
            }
            return A
        }, "_toStr"),
        Wa9 = F8((A) => {
            if (A == null) return A;
            if (typeof A === "string") {
                let B = A.toLowerCase();
                if (A !== "" && B !== "false" && B !== "true") {
                    let Q = new Error(`Received string "${A}" where a boolean was expected.`);
                    Q.name = "Warning", console.warn(Q)
                }
                return A !== "" && B !== "false"
            }
            return A
        }, "_toBool"),
        Ja9 = F8((A) => {
            if (A == null) return A;
            if (typeof A === "string") {
                let B = Number(A);
                if (B.toString() !== A) {
                    let Q = new Error(`Received string "${A}" where a number was expected.`);
                    return Q.name = "Warning", console.warn(Q), A
                }
                return B
            }
            return A
        }, "_toNum"),
        Xa9 = O6(),
        tp = gQ(),
        Va9 = KY(),
        Rh = class {
            static {
                F8(this, "SerdeContextConfig")
            }
            serdeContext;
            setSerdeContext(A) {
                this.serdeContext = A
            }
        },
        T91 = gQ(),
        ep = X6(),
        Ca9 = Nk(),
        Ka9 = X6();

    function W4A(A, B, Q) {
        if (Q?.source) {
            let Z = Q.source;
            if (typeof B === "number") {
                if (B > Number.MAX_SAFE_INTEGER || B < Number.MIN_SAFE_INTEGER || Z !== String(B))
                    if (Z.includes(".")) return new Ka9.NumericValue(Z, "bigDecimal");
                    else return BigInt(Z)
            }
        }
        return B
    }
    F8(W4A, "jsonReviver");
    var Ha9 = V6(),
        J4A = F8((A, B) => Ha9.collectBody(A, B).then((Q) => B.utf8Encoder(Q)), "collectBodyString"),
        ma1 = F8((A, B) => J4A(A, B).then((Q) => {
            if (Q.length) try {
                return JSON.parse(Q)
            } catch (Z) {
                if (Z?.name === "SyntaxError") Object.defineProperty(Z, "$responseBodyText", {
                    value: Q
                });
                throw Z
            }
            return {}
        }), "parseJsonBody"),
        za9 = F8(async (A, B) => {
            let Q = await ma1(A, B);
            return Q.message = Q.message ?? Q.Message, Q
        }, "parseJsonErrorBody"),
        da1 = F8((A, B) => {
            let Q = F8((G, F) => Object.keys(G).find((I) => I.toLowerCase() === F.toLowerCase()), "findKey"),
                Z = F8((G) => {
                    let F = G;
                    if (typeof F === "number") F = F.toString();
                    if (F.indexOf(",") >= 0) F = F.split(",")[0];
                    if (F.indexOf(":") >= 0) F = F.split(":")[0];
                    if (F.indexOf("#") >= 0) F = F.split("#")[1];
                    return F
                }, "sanitizeErrorCode"),
                D = Q(A.headers, "x-amzn-errortype");
            if (D !== void 0) return Z(A.headers[D]);
            if (B && typeof B === "object") {
                let G = Q(B, "code");
                if (G && B[G] !== void 0) return Z(B[G]);
                if (B.__type !== void 0) return Z(B.__type)
            }
        }, "loadRestJsonErrorCode"),
        X4A = class extends Rh {
            constructor(A) {
                super();
                this.settings = A
            }
            static {
                F8(this, "JsonShapeDeserializer")
            }
            async read(A, B) {
                return this._read(A, typeof B === "string" ? JSON.parse(B, W4A) : await ma1(B, this.serdeContext))
            }
            readObject(A, B) {
                return this._read(A, B)
            }
            _read(A, B) {
                let Q = B !== null && typeof B === "object",
                    Z = T91.NormalizedSchema.of(A);
                if (Z.isListSchema() && Array.isArray(B)) {
                    let G = Z.getValueSchema(),
                        F = [],
                        I = !!Z.getMergedTraits().sparse;
                    for (let Y of B)
                        if (I || Y != null) F.push(this._read(G, Y));
                    return F
                } else if (Z.isMapSchema() && Q) {
                    let G = Z.getValueSchema(),
                        F = {},
                        I = !!Z.getMergedTraits().sparse;
                    for (let [Y, W] of Object.entries(B))
                        if (I || W != null) F[Y] = this._read(G, W);
                    return F
                } else if (Z.isStructSchema() && Q) {
                    let G = {};
                    for (let [F, I] of Z.structIterator()) {
                        let Y = this.settings.jsonName ? I.getMergedTraits().jsonName ?? F : F,
                            W = this._read(I, B[Y]);
                        if (W != null) G[F] = W
                    }
                    return G
                }
                if (Z.isBlobSchema() && typeof B === "string") return Ca9.fromBase64(B);
                let D = Z.getMergedTraits().mediaType;
                if (Z.isStringSchema() && typeof B === "string" && D) {
                    if (D === "application/json" || D.endsWith("+json")) return ep.LazyJsonString.from(B)
                }
                if (Z.isTimestampSchema()) {
                    let G = this.settings.timestampFormat;
                    switch (G.useTrait ? Z.getSchema() === T91.SCHEMA.TIMESTAMP_DEFAULT ? G.default : Z.getSchema() ?? G.default : G.default) {
                        case T91.SCHEMA.TIMESTAMP_DATE_TIME:
                            return ep.parseRfc3339DateTimeWithOffset(B);
                        case T91.SCHEMA.TIMESTAMP_HTTP_DATE:
                            return ep.parseRfc7231DateTime(B);
                        case T91.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
                            return ep.parseEpochTimestamp(B);
                        default:
                            return console.warn("Missing timestamp format, parsing value with Date constructor:", B), new Date(B)
                    }
                }
                if (Z.isBigIntegerSchema() && (typeof B === "number" || typeof B === "string")) return BigInt(B);
                if (Z.isBigDecimalSchema() && B != null) {
                    if (B instanceof ep.NumericValue) return B;
                    return new ep.NumericValue(String(B), "bigDecimal")
                }
                if (Z.isNumericSchema() && typeof B === "string") switch (B) {
                    case "Infinity":
                        return 1 / 0;
                    case "-Infinity":
                        return -1 / 0;
                    case "NaN":
                        return NaN
                }
                return B
            }
        },
        Ai = gQ(),
        Ea9 = X6(),
        Ua9 = X6(),
        wa9 = X6(),
        D4A = String.fromCharCode(925),
        $a9 = class {
            static {
                F8(this, "JsonReplacer")
            }
            values = new Map;
            counter = 0;
            stage = 0;
            createReplacer() {
                if (this.stage === 1) throw new Error("@aws-sdk/core/protocols - JsonReplacer already created.");
                if (this.stage === 2) throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
                return this.stage = 1, (A, B) => {
                    if (B instanceof wa9.NumericValue) {
                        let Q = `${D4A+NaN+this.counter++}_` + B.string;
                        return this.values.set(`"${Q}"`, B.string), Q
                    }
                    if (typeof B === "bigint") {
                        let Q = B.toString(),
                            Z = `${D4A+"b"+this.counter++}_` + Q;
                        return this.values.set(`"${Z}"`, Q), Z
                    }
                    return B
                }
            }
            replaceInJson(A) {
                if (this.stage === 0) throw new Error("@aws-sdk/core/protocols - JsonReplacer not created yet.");
                if (this.stage === 2) throw new Error("@aws-sdk/core/protocols - JsonReplacer exhausted.");
                if (this.stage = 2, this.counter === 0) return A;
                for (let [B, Q] of this.values) A = A.replace(B, Q);
                return A
            }
        },
        V4A = class extends Rh {
            constructor(A) {
                super();
                this.settings = A
            }
            static {
                F8(this, "JsonShapeSerializer")
            }
            buffer;
            rootSchema;
            write(A, B) {
                this.rootSchema = Ai.NormalizedSchema.of(A), this.buffer = this._write(this.rootSchema, B)
            }
            flush() {
                if (this.rootSchema?.isStructSchema() || this.rootSchema?.isDocumentSchema()) {
                    let A = new $a9;
                    return A.replaceInJson(JSON.stringify(this.buffer, A.createReplacer(), 0))
                }
                return this.buffer
            }
            _write(A, B, Q) {
                let Z = B !== null && typeof B === "object",
                    D = Ai.NormalizedSchema.of(A);
                if (D.isListSchema() && Array.isArray(B)) {
                    let F = D.getValueSchema(),
                        I = [],
                        Y = !!D.getMergedTraits().sparse;
                    for (let W of B)
                        if (Y || W != null) I.push(this._write(F, W));
                    return I
                } else if (D.isMapSchema() && Z) {
                    let F = D.getValueSchema(),
                        I = {},
                        Y = !!D.getMergedTraits().sparse;
                    for (let [W, J] of Object.entries(B))
                        if (Y || J != null) I[W] = this._write(F, J);
                    return I
                } else if (D.isStructSchema() && Z) {
                    let F = {};
                    for (let [I, Y] of D.structIterator()) {
                        let W = this.settings.jsonName ? Y.getMergedTraits().jsonName ?? I : I,
                            J = this._write(Y, B[I], D);
                        if (J !== void 0) F[W] = J
                    }
                    return F
                }
                if (B === null && Q?.isStructSchema()) return;
                if (D.isBlobSchema() && (B instanceof Uint8Array || typeof B === "string")) {
                    if (D === this.rootSchema) return B;
                    if (!this.serdeContext?.base64Encoder) throw new Error("Missing base64Encoder in serdeContext");
                    return this.serdeContext?.base64Encoder(B)
                }
                if (D.isTimestampSchema() && B instanceof Date) {
                    let F = this.settings.timestampFormat;
                    switch (F.useTrait ? D.getSchema() === Ai.SCHEMA.TIMESTAMP_DEFAULT ? F.default : D.getSchema() ?? F.default : F.default) {
                        case Ai.SCHEMA.TIMESTAMP_DATE_TIME:
                            return B.toISOString().replace(".000Z", "Z");
                        case Ai.SCHEMA.TIMESTAMP_HTTP_DATE:
                            return Ea9.dateToUtcString(B);
                        case Ai.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
                            return B.getTime() / 1000;
                        default:
                            return console.warn("Missing timestamp format, using epoch seconds", B), B.getTime() / 1000
                    }
                }
                if (D.isNumericSchema() && typeof B === "number") {
                    if (Math.abs(B) === 1 / 0 || isNaN(B)) return String(B)
                }
                let G = D.getMergedTraits().mediaType;
                if (D.isStringSchema() && typeof B === "string" && G) {
                    if (G === "application/json" || G.endsWith("+json")) return Ua9.LazyJsonString.from(B)
                }
                return B
            }
        },
        ca1 = class extends Rh {
            constructor(A) {
                super();
                this.settings = A
            }
            static {
                F8(this, "JsonCodec")
            }
            createSerializer() {
                let A = new V4A(this.settings);
                return A.setSerdeContext(this.serdeContext), A
            }
            createDeserializer() {
                let A = new X4A(this.settings);
                return A.setSerdeContext(this.serdeContext), A
            }
        },
        la1 = class extends Xa9.RpcProtocol {
            static {
                F8(this, "AwsJsonRpcProtocol")
            }
            serializer;
            deserializer;
            codec;
            constructor({
                defaultNamespace: A
            }) {
                super({
                    defaultNamespace: A
                });
                this.codec = new ca1({
                    timestampFormat: {
                        useTrait: !0,
                        default: tp.SCHEMA.TIMESTAMP_EPOCH_SECONDS
                    },
                    jsonName: !1
                }), this.serializer = this.codec.createSerializer(), this.deserializer = this.codec.createDeserializer()
            }
            async serializeRequest(A, B, Q) {
                let Z = await super.serializeRequest(A, B, Q);
                if (!Z.path.endsWith("/")) Z.path += "/";
                if (Object.assign(Z.headers, {
                        "content-type": `application/x-amz-json-${this.getJsonRpcVersion()}`,
                        "x-amz-target": (this.getJsonRpcVersion() === "1.0" ? "JsonRpc10." : "JsonProtocol.") + tp.NormalizedSchema.of(A).getName()
                    }), tp.deref(A.input) === "unit" || !Z.body) Z.body = "{}";
                try {
                    Z.headers["content-length"] = String(Va9.calculateBodyLength(Z.body))
                } catch (D) {}
                return Z
            }
            getPayloadCodec() {
                return this.codec
            }
            async handleError(A, B, Q, Z, D) {
                let G = da1(Q, Z) ?? "Unknown",
                    F = this.options.defaultNamespace,
                    I = G;
                if (G.includes("#"))[F, I] = G.split("#");
                let Y = tp.TypeRegistry.for(F),
                    W;
                try {
                    W = Y.getSchema(G)
                } catch (K) {
                    let H = tp.TypeRegistry.for("smithy.ts.sdk.synthetic." + F).getBaseException();
                    if (H) {
                        let z = H.ctor;
                        throw Object.assign(new z(I), Z)
                    }
                    throw new Error(I)
                }
                let J = tp.NormalizedSchema.of(W),
                    X = Z.message ?? Z.Message ?? "Unknown",
                    V = new W.ctor(X);
                await this.deserializeHttpMessage(W, B, Q, Z);
                let C = {};
                for (let [K, H] of J.structIterator()) {
                    let z = H.getMergedTraits().jsonName ?? K;
                    C[K] = this.codec.createDeserializer().readObject(H, Z[z])
                }
                throw Object.assign(V, {
                    $metadata: D,
                    $response: Q,
                    $fault: J.getMergedTraits().error,
                    message: X,
                    ...C
                }), V
            }
        },
        qa9 = class extends la1 {
            static {
                F8(this, "AwsJson1_0Protocol")
            }
            constructor({
                defaultNamespace: A
            }) {
                super({
                    defaultNamespace: A
                })
            }
            getShapeId() {
                return "aws.protocols#awsJson1_0"
            }
            getJsonRpcVersion() {
                return "1.0"
            }
        },
        Na9 = class extends la1 {
            static {
                F8(this, "AwsJson1_1Protocol")
            }
            constructor({
                defaultNamespace: A
            }) {
                super({
                    defaultNamespace: A
                })
            }
            getShapeId() {
                return "aws.protocols#awsJson1_1"
            }
            getJsonRpcVersion() {
                return "1.1"
            }
        },
        fa1 = O6(),
        P91 = gQ(),
        La9 = KY(),
        Ma9 = class extends fa1.HttpBindingProtocol {
            static {
                F8(this, "AwsRestJsonProtocol")
            }
            serializer;
            deserializer;
            codec;
            constructor({
                defaultNamespace: A
            }) {
                super({
                    defaultNamespace: A
                });
                let B = {
                    timestampFormat: {
                        useTrait: !0,
                        default: P91.SCHEMA.TIMESTAMP_EPOCH_SECONDS
                    },
                    httpBindings: !0,
                    jsonName: !0
                };
                this.codec = new ca1(B), this.serializer = new fa1.HttpInterceptingShapeSerializer(this.codec.createSerializer(), B), this.deserializer = new fa1.HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), B)
            }
            getShapeId() {
                return "aws.protocols#restJson1"
            }
            getPayloadCodec() {
                return this.codec
            }
            setSerdeContext(A) {
                this.codec.setSerdeContext(A), super.setSerdeContext(A)
            }
            async serializeRequest(A, B, Q) {
                let Z = await super.serializeRequest(A, B, Q),
                    D = P91.NormalizedSchema.of(A.input),
                    G = D.getMemberSchemas();
                if (!Z.headers["content-type"]) {
                    let F = Object.values(G).find((I) => {
                        return !!I.getMergedTraits().httpPayload
                    });
                    if (F) {
                        let I = F.getMergedTraits().mediaType;
                        if (I) Z.headers["content-type"] = I;
                        else if (F.isStringSchema()) Z.headers["content-type"] = "text/plain";
                        else if (F.isBlobSchema()) Z.headers["content-type"] = "application/octet-stream";
                        else Z.headers["content-type"] = "application/json"
                    } else if (!D.isUnitSchema()) {
                        if (Object.values(G).find((Y) => {
                                let {
                                    httpQuery: W,
                                    httpQueryParams: J,
                                    httpHeader: X,
                                    httpLabel: V,
                                    httpPrefixHeaders: C
                                } = Y.getMergedTraits();
                                return !W && !J && !X && !V && C === void 0
                            })) Z.headers["content-type"] = "application/json"
                    }
                }
                if (Z.headers["content-type"] && !Z.body) Z.body = "{}";
                if (Z.body) try {
                    Z.headers["content-length"] = String(La9.calculateBodyLength(Z.body))
                } catch (F) {}
                return Z
            }
            async handleError(A, B, Q, Z, D) {
                let G = da1(Q, Z) ?? "Unknown",
                    F = this.options.defaultNamespace,
                    I = G;
                if (G.includes("#"))[F, I] = G.split("#");
                let Y = P91.TypeRegistry.for(F),
                    W;
                try {
                    W = Y.getSchema(G)
                } catch (K) {
                    let H = P91.TypeRegistry.for("smithy.ts.sdk.synthetic." + F).getBaseException();
                    if (H) {
                        let z = H.ctor;
                        throw Object.assign(new z(I), Z)
                    }
                    throw new Error(I)
                }
                let J = P91.NormalizedSchema.of(W),
                    X = Z.message ?? Z.Message ?? "Unknown",
                    V = new W.ctor(X);
                await this.deserializeHttpMessage(W, B, Q, Z);
                let C = {};
                for (let [K, H] of J.structIterator()) {
                    let z = H.getMergedTraits().jsonName ?? K;
                    C[K] = this.codec.createDeserializer().readObject(H, Z[z])
                }
                throw Object.assign(V, {
                    $metadata: D,
                    $response: Q,
                    $fault: J.getMergedTraits().error,
                    message: X,
                    ...C
                }), V
            }
        },
        Ra9 = V6(),
        Oa9 = F8((A) => {
            if (A == null) return;
            if (typeof A === "object" && "__type" in A) delete A.__type;
            return Ra9.expectUnion(A)
        }, "awsExpectUnion"),
        ha1 = O6(),
        Rk = gQ(),
        Ta9 = KY(),
        Pa9 = O6(),
        G4A = gQ(),
        Sa9 = V6(),
        ja9 = lB(),
        ka9 = $N(),
        pa1 = class extends Rh {
            constructor(A) {
                super();
                this.settings = A, this.stringDeserializer = new Pa9.FromStringShapeDeserializer(A)
            }
            static {
                F8(this, "XmlShapeDeserializer")
            }
            stringDeserializer;
            setSerdeContext(A) {
                this.serdeContext = A, this.stringDeserializer.setSerdeContext(A)
            }
            read(A, B, Q) {
                let Z = G4A.NormalizedSchema.of(A),
                    D = Z.getMemberSchemas();
                if (Z.isStructSchema() && Z.isMemberSchema() && !!Object.values(D).find((Y) => {
                        return !!Y.getMemberTraits().eventPayload
                    })) {
                    let Y = {},
                        W = Object.keys(D)[0];
                    if (D[W].isBlobSchema()) Y[W] = B;
                    else Y[W] = this.read(D[W], B);
                    return Y
                }
                let F = (this.serdeContext?.utf8Encoder ?? ja9.toUtf8)(B),
                    I = this.parseXml(F);
                return this.readSchema(A, Q ? I[Q] : I)
            }
            readSchema(A, B) {
                let Q = G4A.NormalizedSchema.of(A),
                    Z = Q.getMergedTraits(),
                    D = Q.getSchema();
                if (Q.isListSchema() && !Array.isArray(B)) return this.readSchema(D, [B]);
                if (B == null) return B;
                if (typeof B === "object") {
                    let G = !!Z.sparse,
                        F = !!Z.xmlFlattened;
                    if (Q.isListSchema()) {
                        let Y = Q.getValueSchema(),
                            W = [],
                            J = Y.getMergedTraits().xmlName ?? "member",
                            X = F ? B : (B[0] ?? B)[J],
                            V = Array.isArray(X) ? X : [X];
                        for (let C of V)
                            if (C != null || G) W.push(this.readSchema(Y, C));
                        return W
                    }
                    let I = {};
                    if (Q.isMapSchema()) {
                        let Y = Q.getKeySchema(),
                            W = Q.getValueSchema(),
                            J;
                        if (F) J = Array.isArray(B) ? B : [B];
                        else J = Array.isArray(B.entry) ? B.entry : [B.entry];
                        let X = Y.getMergedTraits().xmlName ?? "key",
                            V = W.getMergedTraits().xmlName ?? "value";
                        for (let C of J) {
                            let K = C[X],
                                H = C[V];
                            if (H != null || G) I[K] = this.readSchema(W, H)
                        }
                        return I
                    }
                    if (Q.isStructSchema()) {
                        for (let [Y, W] of Q.structIterator()) {
                            let J = W.getMergedTraits(),
                                X = !J.httpPayload ? W.getMemberTraits().xmlName ?? Y : J.xmlName ?? W.getName();
                            if (B[X] != null) I[Y] = this.readSchema(W, B[X])
                        }
                        return I
                    }
                    if (Q.isDocumentSchema()) return B;
                    throw new Error(`@aws-sdk/core/protocols - xml deserializer unhandled schema type for ${Q.getName(!0)}`)
                } else {
                    if (Q.isListSchema()) return [];
                    else if (Q.isMapSchema() || Q.isStructSchema()) return {};
                    return this.stringDeserializer.read(Q, B)
                }
            }
            parseXml(A) {
                if (A.length) {
                    let B = new ka9.XMLParser({
                        attributeNamePrefix: "",
                        htmlEntities: !0,
                        ignoreAttributes: !1,
                        ignoreDeclaration: !0,
                        parseTagValue: !1,
                        trimValues: !1,
                        tagValueProcessor: F8((F, I) => I.trim() === "" && I.includes(`
`) ? "" : void 0, "tagValueProcessor")
                    });
                    B.addEntity("#xD", "\r"), B.addEntity("#10", `
`);
                    let Q;
                    try {
                        Q = B.parse(A, !0)
                    } catch (F) {
                        if (F && typeof F === "object") Object.defineProperty(F, "$responseBodyText", {
                            value: A
                        });
                        throw F
                    }
                    let Z = "#text",
                        D = Object.keys(Q)[0],
                        G = Q[D];
                    if (G[Z]) G[D] = G[Z], delete G[Z];
                    return Sa9.getValueFromTextNode(G)
                }
                return {}
            }
        },
        ga1 = O6(),
        hK1 = gQ(),
        ya9 = X6(),
        _a9 = V6(),
        xa9 = Nk(),
        va9 = class extends Rh {
            constructor(A) {
                super();
                this.settings = A
            }
            static {
                F8(this, "QueryShapeSerializer")
            }
            buffer;
            write(A, B, Q = "") {
                if (this.buffer === void 0) this.buffer = "";
                let Z = hK1.NormalizedSchema.of(A);
                if (Q && !Q.endsWith(".")) Q += ".";
                if (Z.isBlobSchema()) {
                    if (typeof B === "string" || B instanceof Uint8Array) this.writeKey(Q), this.writeValue((this.serdeContext?.base64Encoder ?? xa9.toBase64)(B))
                } else if (Z.isBooleanSchema() || Z.isNumericSchema() || Z.isStringSchema()) {
                    if (B != null) this.writeKey(Q), this.writeValue(String(B))
                } else if (Z.isBigIntegerSchema()) {
                    if (B != null) this.writeKey(Q), this.writeValue(String(B))
                } else if (Z.isBigDecimalSchema()) {
                    if (B != null) this.writeKey(Q), this.writeValue(B instanceof ya9.NumericValue ? B.string : String(B))
                } else if (Z.isTimestampSchema()) {
                    if (B instanceof Date) switch (this.writeKey(Q), ga1.determineTimestampFormat(Z, this.settings)) {
                        case hK1.SCHEMA.TIMESTAMP_DATE_TIME:
                            this.writeValue(B.toISOString().replace(".000Z", "Z"));
                            break;
                        case hK1.SCHEMA.TIMESTAMP_HTTP_DATE:
                            this.writeValue(_a9.dateToUtcString(B));
                            break;
                        case hK1.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
                            this.writeValue(String(B.getTime() / 1000));
                            break
                    }
                } else if (Z.isDocumentSchema()) throw new Error(`@aws-sdk/core/protocols - QuerySerializer unsupported document type ${Z.getName(!0)}`);
                else if (Z.isListSchema()) {
                    if (Array.isArray(B))
                        if (B.length === 0) {
                            if (this.settings.serializeEmptyLists) this.writeKey(Q), this.writeValue("")
                        } else {
                            let D = Z.getValueSchema(),
                                G = this.settings.flattenLists || Z.getMergedTraits().xmlFlattened,
                                F = 1;
                            for (let I of B) {
                                if (I == null) continue;
                                let Y = this.getKey("member", D.getMergedTraits().xmlName),
                                    W = G ? `${Q}${F}` : `${Q}${Y}.${F}`;
                                this.write(D, I, W), ++F
                            }
                        }
                } else if (Z.isMapSchema()) {
                    if (B && typeof B === "object") {
                        let D = Z.getKeySchema(),
                            G = Z.getValueSchema(),
                            F = Z.getMergedTraits().xmlFlattened,
                            I = 1;
                        for (let [Y, W] of Object.entries(B)) {
                            if (W == null) continue;
                            let J = this.getKey("key", D.getMergedTraits().xmlName),
                                X = F ? `${Q}${I}.${J}` : `${Q}entry.${I}.${J}`,
                                V = this.getKey("value", G.getMergedTraits().xmlName),
                                C = F ? `${Q}${I}.${V}` : `${Q}entry.${I}.${V}`;
                            this.write(D, Y, X), this.write(G, W, C), ++I
                        }
                    }
                } else if (Z.isStructSchema()) {
                    if (B && typeof B === "object")
                        for (let [D, G] of Z.structIterator()) {
                            if (B[D] == null) continue;
                            let F = this.getKey(D, G.getMergedTraits().xmlName),
                                I = `${Q}${F}`;
                            this.write(G, B[D], I)
                        }
                } else if (Z.isUnitSchema());
                else throw new Error(`@aws-sdk/core/protocols - QuerySerializer unrecognized schema type ${Z.getName(!0)}`)
            }
            flush() {
                if (this.buffer === void 0) throw new Error("@aws-sdk/core/protocols - QuerySerializer cannot flush with nothing written to buffer.");
                let A = this.buffer;
                return delete this.buffer, A
            }
            getKey(A, B) {
                let Q = B ?? A;
                if (this.settings.capitalizeKeys) return Q[0].toUpperCase() + Q.slice(1);
                return Q
            }
            writeKey(A) {
                if (A.endsWith(".")) A = A.slice(0, A.length - 1);
                this.buffer += `&${ga1.extendedEncodeURIComponent(A)}=`
            }
            writeValue(A) {
                this.buffer += ga1.extendedEncodeURIComponent(A)
            }
        },
        C4A = class extends ha1.RpcProtocol {
            constructor(A) {
                super({
                    defaultNamespace: A.defaultNamespace
                });
                this.options = A;
                let B = {
                    timestampFormat: {
                        useTrait: !0,
                        default: Rk.SCHEMA.TIMESTAMP_DATE_TIME
                    },
                    httpBindings: !1,
                    xmlNamespace: A.xmlNamespace,
                    serviceNamespace: A.defaultNamespace,
                    serializeEmptyLists: !0
                };
                this.serializer = new va9(B), this.deserializer = new pa1(B)
            }
            static {
                F8(this, "AwsQueryProtocol")
            }
            serializer;
            deserializer;
            getShapeId() {
                return "aws.protocols#awsQuery"
            }
            setSerdeContext(A) {
                this.serializer.setSerdeContext(A), this.deserializer.setSerdeContext(A)
            }
            getPayloadCodec() {
                throw new Error("AWSQuery protocol has no payload codec.")
            }
            async serializeRequest(A, B, Q) {
                let Z = await super.serializeRequest(A, B, Q);
                if (!Z.path.endsWith("/")) Z.path += "/";
                if (Object.assign(Z.headers, {
                        "content-type": "application/x-www-form-urlencoded"
                    }), Rk.deref(A.input) === "unit" || !Z.body) Z.body = "";
                if (Z.body = `Action=${A.name.split("#")[1]}&Version=${this.options.version}` + Z.body, Z.body.endsWith("&")) Z.body = Z.body.slice(-1);
                try {
                    Z.headers["content-length"] = String(Ta9.calculateBodyLength(Z.body))
                } catch (D) {}
                return Z
            }
            async deserializeResponse(A, B, Q) {
                let Z = this.deserializer,
                    D = Rk.NormalizedSchema.of(A.output),
                    G = {};
                if (Q.statusCode >= 300) {
                    let W = await ha1.collectBody(Q.body, B);
                    if (W.byteLength > 0) Object.assign(G, await Z.read(Rk.SCHEMA.DOCUMENT, W));
                    await this.handleError(A, B, Q, G, this.deserializeMetadata(Q))
                }
                for (let W in Q.headers) {
                    let J = Q.headers[W];
                    delete Q.headers[W], Q.headers[W.toLowerCase()] = J
                }
                let F = D.isStructSchema() && this.useNestedResult() ? A.name.split("#")[1] + "Result" : void 0,
                    I = await ha1.collectBody(Q.body, B);
                if (I.byteLength > 0) Object.assign(G, await Z.read(D, I, F));
                return {
                    $metadata: this.deserializeMetadata(Q),
                    ...G
                }
            }
            useNestedResult() {
                return !0
            }
            async handleError(A, B, Q, Z, D) {
                let G = this.loadQueryErrorCode(Q, Z) ?? "Unknown",
                    F = this.options.defaultNamespace,
                    I = G;
                if (G.includes("#"))[F, I] = G.split("#");
                let Y = this.loadQueryError(Z),
                    W = Rk.TypeRegistry.for(F),
                    J;
                try {
                    if (J = W.find((H) => Rk.NormalizedSchema.of(H).getMergedTraits().awsQueryError?.[0] === I), !J) J = W.getSchema(G)
                } catch (H) {
                    let z = Rk.TypeRegistry.for("smithy.ts.sdk.synthetic." + F).getBaseException();
                    if (z) {
                        let $ = z.ctor;
                        throw Object.assign(new $(I), Y)
                    }
                    throw new Error(I)
                }
                let X = Rk.NormalizedSchema.of(J),
                    V = this.loadQueryErrorMessage(Z),
                    C = new J.ctor(V),
                    K = {};
                for (let [H, z] of X.structIterator()) {
                    let $ = z.getMergedTraits().xmlName ?? H,
                        L = Y[$] ?? Z[$];
                    K[H] = this.deserializer.readSchema(z, L)
                }
                throw Object.assign(C, {
                    $metadata: D,
                    $response: Q,
                    $fault: X.getMergedTraits().error,
                    message: V,
                    ...K
                }), C
            }
            loadQueryErrorCode(A, B) {
                let Q = (B.Errors?.[0]?.Error ?? B.Errors?.Error ?? B.Error)?.Code;
                if (Q !== void 0) return Q;
                if (A.statusCode == 404) return "NotFound"
            }
            loadQueryError(A) {
                return A.Errors?.[0]?.Error ?? A.Errors?.Error ?? A.Error
            }
            loadQueryErrorMessage(A) {
                let B = this.loadQueryError(A);
                return B?.message ?? B?.Message ?? A.message ?? A.Message ?? "Unknown"
            }
        },
        ba9 = class extends C4A {
            constructor(A) {
                super(A);
                this.options = A;
                let B = {
                    capitalizeKeys: !0,
                    flattenLists: !0,
                    serializeEmptyLists: !1
                };
                Object.assign(this.serializer.settings, B)
            }
            static {
                F8(this, "AwsEc2QueryProtocol")
            }
            useNestedResult() {
                return !1
            }
        },
        ua1 = O6(),
        S91 = gQ(),
        fa9 = KY(),
        ha9 = V6(),
        ga9 = $N(),
        K4A = F8((A, B) => J4A(A, B).then((Q) => {
            if (Q.length) {
                let Z = new ga9.XMLParser({
                    attributeNamePrefix: "",
                    htmlEntities: !0,
                    ignoreAttributes: !1,
                    ignoreDeclaration: !0,
                    parseTagValue: !1,
                    trimValues: !1,
                    tagValueProcessor: F8((Y, W) => W.trim() === "" && W.includes(`
`) ? "" : void 0, "tagValueProcessor")
                });
                Z.addEntity("#xD", "\r"), Z.addEntity("#10", `
`);
                let D;
                try {
                    D = Z.parse(Q, !0)
                } catch (Y) {
                    if (Y && typeof Y === "object") Object.defineProperty(Y, "$responseBodyText", {
                        value: Q
                    });
                    throw Y
                }
                let G = "#text",
                    F = Object.keys(D)[0],
                    I = D[F];
                if (I[G]) I[F] = I[G], delete I[G];
                return ha9.getValueFromTextNode(I)
            }
            return {}
        }), "parseXmlBody"),
        ua9 = F8(async (A, B) => {
            let Q = await K4A(A, B);
            if (Q.Error) Q.Error.message = Q.Error.message ?? Q.Error.Message;
            return Q
        }, "parseXmlErrorBody"),
        H4A = F8((A, B) => {
            if (B?.Error?.Code !== void 0) return B.Error.Code;
            if (B?.Code !== void 0) return B.Code;
            if (A.statusCode == 404) return "NotFound"
        }, "loadRestXmlErrorCode"),
        qN = O91(),
        Mh = gQ(),
        ma9 = X6(),
        F4A = V6(),
        I4A = Nk(),
        z4A = class extends Rh {
            constructor(A) {
                super();
                this.settings = A
            }
            static {
                F8(this, "XmlShapeSerializer")
            }
            stringBuffer;
            byteBuffer;
            buffer;
            write(A, B) {
                let Q = Mh.NormalizedSchema.of(A);
                if (Q.isStringSchema() && typeof B === "string") this.stringBuffer = B;
                else if (Q.isBlobSchema()) this.byteBuffer = "byteLength" in B ? B : (this.serdeContext?.base64Decoder ?? I4A.fromBase64)(B);
                else {
                    this.buffer = this.writeStruct(Q, B, void 0);
                    let Z = Q.getMergedTraits();
                    if (Z.httpPayload && !Z.xmlName) this.buffer.withName(Q.getName())
                }
            }
            flush() {
                if (this.byteBuffer !== void 0) {
                    let B = this.byteBuffer;
                    return delete this.byteBuffer, B
                }
                if (this.stringBuffer !== void 0) {
                    let B = this.stringBuffer;
                    return delete this.stringBuffer, B
                }
                let A = this.buffer;
                if (this.settings.xmlNamespace) {
                    if (!A?.attributes?.xmlns) A.addAttribute("xmlns", this.settings.xmlNamespace)
                }
                return delete this.buffer, A.toString()
            }
            writeStruct(A, B, Q) {
                let Z = A.getMergedTraits(),
                    D = A.isMemberSchema() && !Z.httpPayload ? A.getMemberTraits().xmlName ?? A.getMemberName() : Z.xmlName ?? A.getName();
                if (!D || !A.isStructSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write struct with empty name or non-struct, schema=${A.getName(!0)}.`);
                let G = qN.XmlNode.of(D),
                    [F, I] = this.getXmlnsAttribute(A, Q);
                if (I) G.addAttribute(F, I);
                for (let [Y, W] of A.structIterator()) {
                    let J = B[Y];
                    if (J != null) {
                        if (W.getMergedTraits().xmlAttribute) {
                            G.addAttribute(W.getMergedTraits().xmlName ?? Y, this.writeSimple(W, J));
                            continue
                        }
                        if (W.isListSchema()) this.writeList(W, J, G, I);
                        else if (W.isMapSchema()) this.writeMap(W, J, G, I);
                        else if (W.isStructSchema()) G.addChildNode(this.writeStruct(W, J, I));
                        else {
                            let X = qN.XmlNode.of(W.getMergedTraits().xmlName ?? W.getMemberName());
                            this.writeSimpleInto(W, J, X, I), G.addChildNode(X)
                        }
                    }
                }
                return G
            }
            writeList(A, B, Q, Z) {
                if (!A.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member list: ${A.getName(!0)}`);
                let D = A.getMergedTraits(),
                    G = A.getValueSchema(),
                    F = G.getMergedTraits(),
                    I = !!F.sparse,
                    Y = !!D.xmlFlattened,
                    [W, J] = this.getXmlnsAttribute(A, Z),
                    X = F8((V, C) => {
                        if (G.isListSchema()) this.writeList(G, Array.isArray(C) ? C : [C], V, J);
                        else if (G.isMapSchema()) this.writeMap(G, C, V, J);
                        else if (G.isStructSchema()) {
                            let K = this.writeStruct(G, C, J);
                            V.addChildNode(K.withName(Y ? D.xmlName ?? A.getMemberName() : F.xmlName ?? "member"))
                        } else {
                            let K = qN.XmlNode.of(Y ? D.xmlName ?? A.getMemberName() : F.xmlName ?? "member");
                            this.writeSimpleInto(G, C, K, J), V.addChildNode(K)
                        }
                    }, "writeItem");
                if (Y) {
                    for (let V of B)
                        if (I || V != null) X(Q, V)
                } else {
                    let V = qN.XmlNode.of(D.xmlName ?? A.getMemberName());
                    if (J) V.addAttribute(W, J);
                    for (let C of B)
                        if (I || C != null) X(V, C);
                    Q.addChildNode(V)
                }
            }
            writeMap(A, B, Q, Z, D = !1) {
                if (!A.isMemberSchema()) throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member map: ${A.getName(!0)}`);
                let G = A.getMergedTraits(),
                    F = A.getKeySchema(),
                    Y = F.getMergedTraits().xmlName ?? "key",
                    W = A.getValueSchema(),
                    J = W.getMergedTraits(),
                    X = J.xmlName ?? "value",
                    V = !!J.sparse,
                    C = !!G.xmlFlattened,
                    [K, H] = this.getXmlnsAttribute(A, Z),
                    z = F8(($, L, N) => {
                        let R = qN.XmlNode.of(Y, L),
                            [O, P] = this.getXmlnsAttribute(F, H);
                        if (P) R.addAttribute(O, P);
                        $.addChildNode(R);
                        let j = qN.XmlNode.of(X);
                        if (W.isListSchema()) this.writeList(W, N, j, H);
                        else if (W.isMapSchema()) this.writeMap(W, N, j, H, !0);
                        else if (W.isStructSchema()) j = this.writeStruct(W, N, H);
                        else this.writeSimpleInto(W, N, j, H);
                        $.addChildNode(j)
                    }, "addKeyValue");
                if (C) {
                    for (let [$, L] of Object.entries(B))
                        if (V || L != null) {
                            let N = qN.XmlNode.of(G.xmlName ?? A.getMemberName());
                            z(N, $, L), Q.addChildNode(N)
                        }
                } else {
                    let $;
                    if (!D) {
                        if ($ = qN.XmlNode.of(G.xmlName ?? A.getMemberName()), H) $.addAttribute(K, H);
                        Q.addChildNode($)
                    }
                    for (let [L, N] of Object.entries(B))
                        if (V || N != null) {
                            let R = qN.XmlNode.of("entry");
                            z(R, L, N), (D ? Q : $).addChildNode(R)
                        }
                }
            }
            writeSimple(A, B) {
                if (B === null) throw new Error("@aws-sdk/core/protocols - (XML serializer) cannot write null value.");
                let Q = Mh.NormalizedSchema.of(A),
                    Z = null;
                if (B && typeof B === "object")
                    if (Q.isBlobSchema()) Z = (this.serdeContext?.base64Encoder ?? I4A.toBase64)(B);
                    else if (Q.isTimestampSchema() && B instanceof Date) {
                    let D = this.settings.timestampFormat;
                    switch (D.useTrait ? Q.getSchema() === Mh.SCHEMA.TIMESTAMP_DEFAULT ? D.default : Q.getSchema() ?? D.default : D.default) {
                        case Mh.SCHEMA.TIMESTAMP_DATE_TIME:
                            Z = B.toISOString().replace(".000Z", "Z");
                            break;
                        case Mh.SCHEMA.TIMESTAMP_HTTP_DATE:
                            Z = F4A.dateToUtcString(B);
                            break;
                        case Mh.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
                            Z = String(B.getTime() / 1000);
                            break;
                        default:
                            console.warn("Missing timestamp format, using http date", B), Z = F4A.dateToUtcString(B);
                            break
                    }
                } else if (Q.isBigDecimalSchema() && B) {
                    if (B instanceof ma9.NumericValue) return B.string;
                    return String(B)
                } else if (Q.isMapSchema() || Q.isListSchema()) throw new Error("@aws-sdk/core/protocols - xml serializer, cannot call _write() on List/Map schema, call writeList or writeMap() instead.");
                else throw new Error(`@aws-sdk/core/protocols - xml serializer, unhandled schema type for object value and schema: ${Q.getName(!0)}`);
                if (Q.isStringSchema() || Q.isBooleanSchema() || Q.isNumericSchema() || Q.isBigIntegerSchema() || Q.isBigDecimalSchema()) Z = String(B);
                if (Z === null) throw new Error(`Unhandled schema-value pair ${Q.getName(!0)}=${B}`);
                return Z
            }
            writeSimpleInto(A, B, Q, Z) {
                let D = this.writeSimple(A, B),
                    G = Mh.NormalizedSchema.of(A),
                    F = new qN.XmlText(D),
                    [I, Y] = this.getXmlnsAttribute(G, Z);
                if (Y) Q.addAttribute(I, Y);
                Q.addChildNode(F)
            }
            getXmlnsAttribute(A, B) {
                let Q = A.getMergedTraits(),
                    [Z, D] = Q.xmlNamespace ?? [];
                if (D && D !== B) return [Z ? `xmlns:${Z}` : "xmlns", D];
                return [void 0, void 0]
            }
        },
        E4A = class extends Rh {
            constructor(A) {
                super();
                this.settings = A
            }
            static {
                F8(this, "XmlCodec")
            }
            createSerializer() {
                let A = new z4A(this.settings);
                return A.setSerdeContext(this.serdeContext), A
            }
            createDeserializer() {
                let A = new pa1(this.settings);
                return A.setSerdeContext(this.serdeContext), A
            }
        },
        da9 = class extends ua1.HttpBindingProtocol {
            static {
                F8(this, "AwsRestXmlProtocol")
            }
            codec;
            serializer;
            deserializer;
            constructor(A) {
                super(A);
                let B = {
                    timestampFormat: {
                        useTrait: !0,
                        default: S91.SCHEMA.TIMESTAMP_DATE_TIME
                    },
                    httpBindings: !0,
                    xmlNamespace: A.xmlNamespace,
                    serviceNamespace: A.defaultNamespace
                };
                this.codec = new E4A(B), this.serializer = new ua1.HttpInterceptingShapeSerializer(this.codec.createSerializer(), B), this.deserializer = new ua1.HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), B)
            }
            getPayloadCodec() {
                return this.codec
            }
            getShapeId() {
                return "aws.protocols#restXml"
            }
            async serializeRequest(A, B, Q) {
                let Z = await super.serializeRequest(A, B, Q),
                    D = S91.NormalizedSchema.of(A.input),
                    G = D.getMemberSchemas();
                if (Z.path = String(Z.path).split("/").filter((F) => {
                        return F !== "{Bucket}"
                    }).join("/") || "/", !Z.headers["content-type"]) {
                    let F = Object.values(G).find((I) => {
                        return !!I.getMergedTraits().httpPayload
                    });
                    if (F) {
                        let I = F.getMergedTraits().mediaType;
                        if (I) Z.headers["content-type"] = I;
                        else if (F.isStringSchema()) Z.headers["content-type"] = "text/plain";
                        else if (F.isBlobSchema()) Z.headers["content-type"] = "application/octet-stream";
                        else Z.headers["content-type"] = "application/xml"
                    } else if (!D.isUnitSchema()) {
                        if (Object.values(G).find((Y) => {
                                let {
                                    httpQuery: W,
                                    httpQueryParams: J,
                                    httpHeader: X,
                                    httpLabel: V,
                                    httpPrefixHeaders: C
                                } = Y.getMergedTraits();
                                return !W && !J && !X && !V && C === void 0
                            })) Z.headers["content-type"] = "application/xml"
                    }
                }
                if (Z.headers["content-type"] === "application/xml") {
                    if (typeof Z.body === "string") Z.body = '<?xml version="1.0" encoding="UTF-8"?>' + Z.body
                }
                if (Z.body) try {
                    Z.headers["content-length"] = String(fa9.calculateBodyLength(Z.body))
                } catch (F) {}
                return Z
            }
            async deserializeResponse(A, B, Q) {
                return super.deserializeResponse(A, B, Q)
            }
            async handleError(A, B, Q, Z, D) {
                let G = H4A(Q, Z) ?? "Unknown",
                    F = this.options.defaultNamespace,
                    I = G;
                if (G.includes("#"))[F, I] = G.split("#");
                let Y = S91.TypeRegistry.for(F),
                    W;
                try {
                    W = Y.getSchema(G)
                } catch (K) {
                    let H = S91.TypeRegistry.for("smithy.ts.sdk.synthetic." + F).getBaseException();
                    if (H) {
                        let z = H.ctor;
                        throw Object.assign(new z(I), Z)
                    }
                    throw new Error(I)
                }
                let J = S91.NormalizedSchema.of(W),
                    X = Z.Error?.message ?? Z.Error?.Message ?? Z.message ?? Z.Message ?? "Unknown",
                    V = new W.ctor(X);
                await this.deserializeHttpMessage(W, B, Q, Z);
                let C = {};
                for (let [K, H] of J.structIterator()) {
                    let z = H.getMergedTraits().xmlName ?? K,
                        $ = Z.Error?.[z] ?? Z[z];
                    C[K] = this.codec.createDeserializer().readSchema(H, $)
                }
                throw Object.assign(V, {
                    $metadata: D,
                    $response: Q,
                    $fault: J.getMergedTraits().error,
                    message: X,
                    ...C
                }), V
            }
        }
});