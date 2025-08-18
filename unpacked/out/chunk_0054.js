/* chunk:54 bytes:[1348260, 1374372) size:26112 source:unpacked-cli.js */
var O6 = E((Z15, x2A) => {
    var {
        defineProperty: tn1,
        getOwnPropertyDescriptor: Od9,
        getOwnPropertyNames: Td9
    } = Object, Pd9 = Object.prototype.hasOwnProperty, Sd9 = (A, B) => {
        for (var Q in B) tn1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, jd9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Td9(B))
                if (!Pd9.call(A, D) && D !== Q) tn1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Od9(B, D)) || Z.enumerable
                })
        }
        return A
    }, kd9 = (A) => jd9(tn1({}, "__esModule", {
        value: !0
    }), A), P2A = {};
    Sd9(P2A, {
        FromStringShapeDeserializer: () => y2A,
        HttpBindingProtocol: () => xd9,
        HttpInterceptingShapeDeserializer: () => md9,
        HttpInterceptingShapeSerializer: () => cd9,
        RequestBuilder: () => k2A,
        RpcProtocol: () => bd9,
        ToStringShapeSerializer: () => _2A,
        collectBody: () => np,
        determineTimestampFormat: () => en1,
        extendedEncodeURIComponent: () => q91,
        requestBuilder: () => hd9,
        resolvedPath: () => j2A
    });
    x2A.exports = kd9(P2A);
    var sn1 = $k(),
        np = async (A = new Uint8Array, B) => {
            if (A instanceof Uint8Array) return sn1.Uint8ArrayBlobAdapter.mutate(A);
            if (!A) return sn1.Uint8ArrayBlobAdapter.mutate(new Uint8Array);
            let Q = B.streamCollector(A);
            return sn1.Uint8ArrayBlobAdapter.mutate(await Q)
        };

    function q91(A) {
        return encodeURIComponent(A).replace(/[!'()*]/g, function(B) {
            return "%" + B.charCodeAt(0).toString(16).toUpperCase()
        })
    }
    var w91 = gQ(),
        yd9 = zh(),
        DK1 = gQ(),
        L2A = X6(),
        M2A = zh(),
        _d9 = $k(),
        S2A = class {
            constructor(A) {
                this.options = A
            }
            getRequestType() {
                return M2A.HttpRequest
            }
            getResponseType() {
                return M2A.HttpResponse
            }
            setSerdeContext(A) {
                if (this.serdeContext = A, this.serializer.setSerdeContext(A), this.deserializer.setSerdeContext(A), this.getPayloadCodec()) this.getPayloadCodec().setSerdeContext(A)
            }
            updateServiceEndpoint(A, B) {
                if ("url" in B) {
                    A.protocol = B.url.protocol, A.hostname = B.url.hostname, A.port = B.url.port ? Number(B.url.port) : void 0, A.path = B.url.pathname, A.fragment = B.url.hash || void 0, A.username = B.url.username || void 0, A.password = B.url.password || void 0;
                    for (let [Q, Z] of B.url.searchParams.entries()) {
                        if (!A.query) A.query = {};
                        A.query[Q] = Z
                    }
                    return A
                } else return A.protocol = B.protocol, A.hostname = B.hostname, A.port = B.port ? Number(B.port) : void 0, A.path = B.path, A.query = {
                    ...B.query
                }, A
            }
            setHostPrefix(A, B, Q) {
                let Z = DK1.NormalizedSchema.of(B),
                    D = DK1.NormalizedSchema.of(B.input);
                if (Z.getMergedTraits().endpoint) {
                    let G = Z.getMergedTraits().endpoint?.[0];
                    if (typeof G === "string") {
                        let F = [...D.structIterator()].filter(([, I]) => I.getMergedTraits().hostLabel);
                        for (let [I] of F) {
                            let Y = Q[I];
                            if (typeof Y !== "string") throw new Error(`@smithy/core/schema - ${I} in input must be a string as hostLabel.`);
                            G = G.replace(`{${I}}`, Y)
                        }
                        A.hostname = G + A.hostname
                    }
                }
            }
            deserializeMetadata(A) {
                return {
                    httpStatusCode: A.statusCode,
                    requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
                    extendedRequestId: A.headers["x-amz-id-2"],
                    cfId: A.headers["x-amz-cf-id"]
                }
            }
            async deserializeHttpMessage(A, B, Q, Z, D) {
                let G;
                if (Z instanceof Set) G = D;
                else G = Z;
                let F = this.deserializer,
                    I = DK1.NormalizedSchema.of(A),
                    Y = [];
                for (let [W, J] of I.structIterator()) {
                    let X = J.getMemberTraits();
                    if (X.httpPayload) {
                        if (J.isStreaming())
                            if (J.isStructSchema()) {
                                let K = this.serdeContext;
                                if (!K.eventStreamMarshaller) throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
                                let H = J.getMemberSchemas();
                                G[W] = K.eventStreamMarshaller.deserialize(Q.body, async (z) => {
                                    let $ = Object.keys(z).find((L) => {
                                        return L !== "__type"
                                    }) ?? "";
                                    if ($ in H) {
                                        let L = H[$];
                                        return {
                                            [$]: await F.read(L, z[$].body)
                                        }
                                    } else return {
                                        $unknown: z
                                    }
                                })
                            } else G[W] = _d9.sdkStreamMixin(Q.body);
                        else if (Q.body) {
                            let C = await np(Q.body, B);
                            if (C.byteLength > 0) G[W] = await F.read(J, C)
                        }
                    } else if (X.httpHeader) {
                        let V = String(X.httpHeader).toLowerCase(),
                            C = Q.headers[V];
                        if (C != null)
                            if (J.isListSchema()) {
                                let K = J.getValueSchema(),
                                    H;
                                if (K.isTimestampSchema() && K.getSchema() === DK1.SCHEMA.TIMESTAMP_DEFAULT) H = L2A.splitEvery(C, ",", 2);
                                else H = L2A.splitHeader(C);
                                let z = [];
                                for (let $ of H) z.push(await F.read([K, {
                                    httpHeader: V
                                }], $.trim()));
                                G[W] = z
                            } else G[W] = await F.read(J, C)
                    } else if (X.httpPrefixHeaders !== void 0) {
                        G[W] = {};
                        for (let [V, C] of Object.entries(Q.headers))
                            if (V.startsWith(X.httpPrefixHeaders)) G[W][V.slice(X.httpPrefixHeaders.length)] = await F.read([J.getValueSchema(), {
                                httpHeader: V
                            }], C)
                    } else if (X.httpResponseCode) G[W] = Q.statusCode;
                    else Y.push(W)
                }
                return Y
            }
        },
        xd9 = class extends S2A {
            async serializeRequest(A, B, Q) {
                let Z = this.serializer,
                    D = {},
                    G = {},
                    F = await Q.endpoint(),
                    I = w91.NormalizedSchema.of(A?.input),
                    Y = I.getSchema(),
                    W = !1,
                    J, X = new yd9.HttpRequest({
                        protocol: "",
                        hostname: "",
                        port: void 0,
                        path: "",
                        fragment: void 0,
                        query: D,
                        headers: G,
                        body: void 0
                    });
                if (F) {
                    this.updateServiceEndpoint(X, F), this.setHostPrefix(X, A, B);
                    let C = w91.NormalizedSchema.translateTraits(A.traits);
                    if (C.http) {
                        X.method = C.http[0];
                        let [K, H] = C.http[1].split("?");
                        if (X.path == "/") X.path = K;
                        else X.path += K;
                        let z = new URLSearchParams(H ?? "");
                        Object.assign(D, Object.fromEntries(z))
                    }
                }
                let V = {
                    ...B
                };
                for (let C of Object.keys(V)) {
                    let K = I.getMemberSchema(C);
                    if (K === void 0) continue;
                    let H = K.getMergedTraits(),
                        z = V[C];
                    if (H.httpPayload)
                        if (K.isStreaming())
                            if (K.isStructSchema()) throw new Error("serialization of event streams is not yet implemented");
                            else J = z;
                    else Z.write(K, z), J = Z.flush();
                    else if (H.httpLabel) {
                        Z.write(K, z);
                        let $ = Z.flush();
                        if (X.path.includes(`{${C}+}`)) X.path = X.path.replace(`{${C}+}`, $.split("/").map(q91).join("/"));
                        else if (X.path.includes(`{${C}}`)) X.path = X.path.replace(`{${C}}`, q91($));
                        delete V[C]
                    } else if (H.httpHeader) Z.write(K, z), G[H.httpHeader.toLowerCase()] = String(Z.flush()), delete V[C];
                    else if (typeof H.httpPrefixHeaders === "string") {
                        for (let [$, L] of Object.entries(z)) {
                            let N = H.httpPrefixHeaders + $;
                            Z.write([K.getValueSchema(), {
                                httpHeader: N
                            }], L), G[N.toLowerCase()] = Z.flush()
                        }
                        delete V[C]
                    } else if (H.httpQuery || H.httpQueryParams) this.serializeQuery(K, z, D), delete V[C];
                    else W = !0
                }
                if (W && B) Z.write(Y, V), J = Z.flush();
                return X.headers = G, X.query = D, X.body = J, X
            }
            serializeQuery(A, B, Q) {
                let Z = this.serializer,
                    D = A.getMergedTraits();
                if (D.httpQueryParams) {
                    for (let [G, F] of Object.entries(B))
                        if (!(G in Q)) this.serializeQuery(w91.NormalizedSchema.of([A.getValueSchema(), {
                            ...D,
                            httpQuery: G,
                            httpQueryParams: void 0
                        }]), F, Q);
                    return
                }
                if (A.isListSchema()) {
                    let G = !!A.getMergedTraits().sparse,
                        F = [];
                    for (let I of B) {
                        Z.write([A.getValueSchema(), D], I);
                        let Y = Z.flush();
                        if (G || Y !== void 0) F.push(Y)
                    }
                    Q[D.httpQuery] = F
                } else Z.write([A, D], B), Q[D.httpQuery] = Z.flush()
            }
            async deserializeResponse(A, B, Q) {
                let Z = this.deserializer,
                    D = w91.NormalizedSchema.of(A.output),
                    G = {};
                if (Q.statusCode >= 300) {
                    let Y = await np(Q.body, B);
                    if (Y.byteLength > 0) Object.assign(G, await Z.read(w91.SCHEMA.DOCUMENT, Y));
                    throw await this.handleError(A, B, Q, G, this.deserializeMetadata(Q)), new Error("@smithy/core/protocols - HTTP Protocol error handler failed to throw.")
                }
                for (let Y in Q.headers) {
                    let W = Q.headers[Y];
                    delete Q.headers[Y], Q.headers[Y.toLowerCase()] = W
                }
                let F = await this.deserializeHttpMessage(D, B, Q, G);
                if (F.length) {
                    let Y = await np(Q.body, B);
                    if (Y.byteLength > 0) {
                        let W = await Z.read(D, Y);
                        for (let J of F) G[J] = W[J]
                    }
                }
                return {
                    $metadata: this.deserializeMetadata(Q),
                    ...G
                }
            }
        },
        rn1 = gQ(),
        vd9 = zh(),
        bd9 = class extends S2A {
            async serializeRequest(A, B, Q) {
                let Z = this.serializer,
                    D = {},
                    G = {},
                    F = await Q.endpoint(),
                    Y = rn1.NormalizedSchema.of(A?.input).getSchema(),
                    W, J = new vd9.HttpRequest({
                        protocol: "",
                        hostname: "",
                        port: void 0,
                        path: "/",
                        fragment: void 0,
                        query: D,
                        headers: G,
                        body: void 0
                    });
                if (F) this.updateServiceEndpoint(J, F), this.setHostPrefix(J, A, B);
                let X = {
                    ...B
                };
                if (B) Z.write(Y, X), W = Z.flush();
                return J.headers = G, J.query = D, J.body = W, J.method = "POST", J
            }
            async deserializeResponse(A, B, Q) {
                let Z = this.deserializer,
                    D = rn1.NormalizedSchema.of(A.output),
                    G = {};
                if (Q.statusCode >= 300) {
                    let Y = await np(Q.body, B);
                    if (Y.byteLength > 0) Object.assign(G, await Z.read(rn1.SCHEMA.DOCUMENT, Y));
                    throw await this.handleError(A, B, Q, G, this.deserializeMetadata(Q)), new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.")
                }
                for (let Y in Q.headers) {
                    let W = Q.headers[Y];
                    delete Q.headers[Y], Q.headers[Y.toLowerCase()] = W
                }
                let F = await np(Q.body, B);
                if (F.byteLength > 0) Object.assign(G, await Z.read(D, F));
                return {
                    $metadata: this.deserializeMetadata(Q),
                    ...G
                }
            }
        },
        fd9 = zh(),
        j2A = (A, B, Q, Z, D, G) => {
            if (B != null && B[Q] !== void 0) {
                let F = Z();
                if (F.length <= 0) throw new Error("Empty value provided for input HTTP label: " + Q + ".");
                A = A.replace(D, G ? F.split("/").map((I) => q91(I)).join("/") : q91(F))
            } else throw new Error("No value provided for input HTTP label: " + Q + ".");
            return A
        };

    function hd9(A, B) {
        return new k2A(A, B)
    }
    var k2A = class {
            constructor(A, B) {
                this.input = A, this.context = B, this.query = {}, this.method = "", this.headers = {}, this.path = "", this.body = null, this.hostname = "", this.resolvePathStack = []
            }
            async build() {
                let {
                    hostname: A,
                    protocol: B = "https",
                    port: Q,
                    path: Z
                } = await this.context.endpoint();
                this.path = Z;
                for (let D of this.resolvePathStack) D(this.path);
                return new fd9.HttpRequest({
                    protocol: B,
                    hostname: this.hostname || A,
                    port: Q,
                    method: this.method,
                    path: this.path,
                    query: this.query,
                    body: this.body,
                    headers: this.headers
                })
            }
            hn(A) {
                return this.hostname = A, this
            }
            bp(A) {
                return this.resolvePathStack.push((B) => {
                    this.path = `${B?.endsWith("/")?B.slice(0,-1):B||""}` + A
                }), this
            }
            p(A, B, Q, Z) {
                return this.resolvePathStack.push((D) => {
                    this.path = j2A(D, this.input, A, B, Q, Z)
                }), this
            }
            h(A) {
                return this.headers = A, this
            }
            q(A) {
                return this.query = A, this
            }
            b(A) {
                return this.body = A, this
            }
            m(A) {
                return this.method = A, this
            }
        },
        GK1 = gQ(),
        ip = X6(),
        R2A = an1(),
        gd9 = lB(),
        $91 = gQ();

    function en1(A, B) {
        if (B.timestampFormat.useTrait) {
            if (A.isTimestampSchema() && (A.getSchema() === $91.SCHEMA.TIMESTAMP_DATE_TIME || A.getSchema() === $91.SCHEMA.TIMESTAMP_HTTP_DATE || A.getSchema() === $91.SCHEMA.TIMESTAMP_EPOCH_SECONDS)) return A.getSchema()
        }
        let {
            httpLabel: Q,
            httpPrefixHeaders: Z,
            httpHeader: D,
            httpQuery: G
        } = A.getMergedTraits();
        return (B.httpBindings ? typeof Z === "string" || Boolean(D) ? $91.SCHEMA.TIMESTAMP_HTTP_DATE : Boolean(G) || Boolean(Q) ? $91.SCHEMA.TIMESTAMP_DATE_TIME : void 0 : void 0) ?? B.timestampFormat.default
    }
    var y2A = class {
            constructor(A) {
                this.settings = A
            }
            setSerdeContext(A) {
                this.serdeContext = A
            }
            read(A, B) {
                let Q = GK1.NormalizedSchema.of(A);
                if (Q.isListSchema()) return ip.splitHeader(B).map((Z) => this.read(Q.getValueSchema(), Z));
                if (Q.isBlobSchema()) return (this.serdeContext?.base64Decoder ?? R2A.fromBase64)(B);
                if (Q.isTimestampSchema()) switch (en1(Q, this.settings)) {
                    case GK1.SCHEMA.TIMESTAMP_DATE_TIME:
                        return ip.parseRfc3339DateTimeWithOffset(B);
                    case GK1.SCHEMA.TIMESTAMP_HTTP_DATE:
                        return ip.parseRfc7231DateTime(B);
                    case GK1.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
                        return ip.parseEpochTimestamp(B);
                    default:
                        return console.warn("Missing timestamp format, parsing value with Date constructor:", B), new Date(B)
                }
                if (Q.isStringSchema()) {
                    let Z = Q.getMergedTraits().mediaType,
                        D = B;
                    if (Z) {
                        if (Q.getMergedTraits().httpHeader) D = this.base64ToUtf8(D);
                        if (Z === "application/json" || Z.endsWith("+json")) D = ip.LazyJsonString.from(D);
                        return D
                    }
                }
                switch (!0) {
                    case Q.isNumericSchema():
                        return Number(B);
                    case Q.isBigIntegerSchema():
                        return BigInt(B);
                    case Q.isBigDecimalSchema():
                        return new ip.NumericValue(B, "bigDecimal");
                    case Q.isBooleanSchema():
                        return String(B).toLowerCase() === "true"
                }
                return B
            }
            base64ToUtf8(A) {
                return (this.serdeContext?.utf8Encoder ?? gd9.toUtf8)((this.serdeContext?.base64Decoder ?? R2A.fromBase64)(A))
            }
        },
        ud9 = gQ(),
        O2A = lB(),
        md9 = class {
            constructor(A, B) {
                this.codecDeserializer = A, this.stringDeserializer = new y2A(B)
            }
            setSerdeContext(A) {
                this.stringDeserializer.setSerdeContext(A), this.codecDeserializer.setSerdeContext(A), this.serdeContext = A
            }
            read(A, B) {
                let Q = ud9.NormalizedSchema.of(A),
                    Z = Q.getMergedTraits(),
                    D = this.serdeContext?.utf8Encoder ?? O2A.toUtf8;
                if (Z.httpHeader || Z.httpResponseCode) return this.stringDeserializer.read(Q, D(B));
                if (Z.httpPayload) {
                    if (Q.isBlobSchema()) {
                        let G = this.serdeContext?.utf8Decoder ?? O2A.fromUtf8;
                        if (typeof B === "string") return G(B);
                        return B
                    } else if (Q.isStringSchema()) {
                        if ("byteLength" in B) return D(B);
                        return B
                    }
                }
                return this.codecDeserializer.read(Q, B)
            }
        },
        dd9 = gQ(),
        FK1 = gQ(),
        on1 = X6(),
        T2A = an1(),
        _2A = class {
            constructor(A) {
                this.settings = A, this.stringBuffer = "", this.serdeContext = void 0
            }
            setSerdeContext(A) {
                this.serdeContext = A
            }
            write(A, B) {
                let Q = FK1.NormalizedSchema.of(A);
                switch (typeof B) {
                    case "object":
                        if (B === null) {
                            this.stringBuffer = "null";
                            return
                        }
                        if (Q.isTimestampSchema()) {
                            if (!(B instanceof Date)) throw new Error(`@smithy/core/protocols - received non-Date value ${B} when schema expected Date in ${Q.getName(!0)}`);
                            switch (en1(Q, this.settings)) {
                                case FK1.SCHEMA.TIMESTAMP_DATE_TIME:
                                    this.stringBuffer = B.toISOString().replace(".000Z", "Z");
                                    break;
                                case FK1.SCHEMA.TIMESTAMP_HTTP_DATE:
                                    this.stringBuffer = on1.dateToUtcString(B);
                                    break;
                                case FK1.SCHEMA.TIMESTAMP_EPOCH_SECONDS:
                                    this.stringBuffer = String(B.getTime() / 1000);
                                    break;
                                default:
                                    console.warn("Missing timestamp format, using epoch seconds", B), this.stringBuffer = String(B.getTime() / 1000)
                            }
                            return
                        }
                        if (Q.isBlobSchema() && "byteLength" in B) {
                            this.stringBuffer = (this.serdeContext?.base64Encoder ?? T2A.toBase64)(B);
                            return
                        }
                        if (Q.isListSchema() && Array.isArray(B)) {
                            let G = "";
                            for (let F of B) {
                                this.write([Q.getValueSchema(), Q.getMergedTraits()], F);
                                let I = this.flush(),
                                    Y = Q.getValueSchema().isTimestampSchema() ? I : on1.quoteHeader(I);
                                if (G !== "") G += ", ";
                                G += Y
                            }
                            this.stringBuffer = G;
                            return
                        }
                        this.stringBuffer = JSON.stringify(B, null, 2);
                        break;
                    case "string":
                        let Z = Q.getMergedTraits().mediaType,
                            D = B;
                        if (Z) {
                            if (Z === "application/json" || Z.endsWith("+json")) D = on1.LazyJsonString.from(D);
                            if (Q.getMergedTraits().httpHeader) {
                                this.stringBuffer = (this.serdeContext?.base64Encoder ?? T2A.toBase64)(D.toString());
                                return
                            }
                        }
                        this.stringBuffer = B;
                        break;
                    default:
                        this.stringBuffer = String(B)
                }
            }
            flush() {
                let A = this.stringBuffer;
                return this.stringBuffer = "", A
            }
        },
        cd9 = class {
            constructor(A, B, Q = new _2A(B)) {
                this.codecSerializer = A, this.stringSerializer = Q
            }
            setSerdeContext(A) {
                this.codecSerializer.setSerdeContext(A), this.stringSerializer.setSerdeContext(A)
            }
            write(A, B) {
                let Q = dd9.NormalizedSchema.of(A),
                    Z = Q.getMergedTraits();
                if (Z.httpHeader || Z.httpLabel || Z.httpQuery) {
                    this.stringSerializer.write(Q, B), this.buffer = this.stringSerializer.flush();
                    return
                }
                return this.codecSerializer.write(Q, B)
            }
            flush() {
                if (this.buffer !== void 0) {
                    let A = this.buffer;
                    return this.buffer = void 0, A
                }
                return this.codecSerializer.flush()
            }
        }
});