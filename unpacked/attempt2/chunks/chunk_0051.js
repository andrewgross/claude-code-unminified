/* chunk:51 bytes:[1309026, 1326481) size:17455 source:unpacked-cli.js */
var gQ = E((le8, F2A) => {
    var {
        defineProperty: _n1,
        getOwnPropertyDescriptor: Fm9,
        getOwnPropertyNames: Im9
    } = Object, Ym9 = Object.prototype.hasOwnProperty, Wm9 = (A, B) => {
        for (var Q in B) _n1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Jm9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Im9(B))
                if (!Ym9.call(A, D) && D !== Q) _n1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Fm9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Xm9 = (A) => Jm9(_n1({}, "__esModule", {
        value: !0
    }), A), B2A = {};
    Wm9(B2A, {
        ErrorSchema: () => G2A,
        ListSchema: () => xn1,
        MapSchema: () => vn1,
        NormalizedSchema: () => Mm9,
        OperationSchema: () => D2A,
        SCHEMA: () => pD,
        Schema: () => dp,
        SimpleSchema: () => bn1,
        StructureSchema: () => AK1,
        TypeRegistry: () => Eh,
        deref: () => C91,
        deserializerMiddlewareOption: () => Q2A,
        error: () => Nm9,
        getSchemaSerdePlugin: () => Em9,
        list: () => Um9,
        map: () => wm9,
        op: () => $m9,
        serializerMiddlewareOption: () => Z2A,
        sim: () => Lm9,
        struct: () => qm9
    });
    F2A.exports = Xm9(B2A);
    var C91 = (A) => {
            if (typeof A === "function") return A();
            return A
        },
        Vm9 = zh(),
        Cm9 = E5(),
        Km9 = (A) => (B, Q) => async (Z) => {
            let {
                response: D
            } = await B(Z), {
                operationSchema: G
            } = Cm9.getSmithyContext(Q);
            try {
                let F = await A.protocol.deserializeResponse(G, {
                    ...A,
                    ...Q
                }, D);
                return {
                    response: D,
                    output: F
                }
            } catch (F) {
                if (Object.defineProperty(F, "$response", {
                        value: D
                    }), !("$metadata" in F)) {
                    try {
                        F.message += `
  Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`
                    } catch (Y) {
                        if (!Q.logger || Q.logger?.constructor?.name === "NoOpLogger") console.warn("Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.");
                        else Q.logger?.warn?.("Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.")
                    }
                    if (typeof F.$responseBodyText !== "undefined") {
                        if (F.$response) F.$response.body = F.$responseBodyText
                    }
                    try {
                        if (Vm9.HttpResponse.isInstance(D)) {
                            let {
                                headers: Y = {}
                            } = D, W = Object.entries(Y);
                            F.$metadata = {
                                httpStatusCode: D.statusCode,
                                requestId: yn1(/^x-[\w-]+-request-?id$/, W),
                                extendedRequestId: yn1(/^x-[\w-]+-id-2$/, W),
                                cfId: yn1(/^x-[\w-]+-cf-id$/, W)
                            }
                        }
                    } catch (Y) {}
                }
                throw F
            }
        }, yn1 = (A, B) => {
            return (B.find(([Q]) => {
                return Q.match(A)
            }) || [void 0, void 0])[1]
        }, Hm9 = E5(), zm9 = (A) => (B, Q) => async (Z) => {
            let {
                operationSchema: D
            } = Hm9.getSmithyContext(Q), G = Q.endpointV2?.url && A.urlParser ? async () => A.urlParser(Q.endpointV2.url): A.endpoint, F = await A.protocol.serializeRequest(D, Z.input, {
                ...A,
                ...Q,
                endpoint: G
            });
            return B({
                ...Z,
                request: F
            })
        }, Q2A = {
            name: "deserializerMiddleware",
            step: "deserialize",
            tags: ["DESERIALIZER"],
            override: !0
        }, Z2A = {
            name: "serializerMiddleware",
            step: "serialize",
            tags: ["SERIALIZER"],
            override: !0
        };

    function Em9(A) {
        return {
            applyToStack: (B) => {
                B.add(zm9(A), Z2A), B.add(Km9(A), Q2A), A.protocol.setSerdeContext(A)
            }
        }
    }
    var Eh = class A {
            constructor(B, Q = new Map) {
                this.namespace = B, this.schemas = Q
            }
            static {
                this.registries = new Map
            }
            static
            for (B) {
                if (!A.registries.has(B)) A.registries.set(B, new A(B));
                return A.registries.get(B)
            }
            register(B, Q) {
                let Z = this.normalizeShapeId(B);
                A.for(this.getNamespace(B)).schemas.set(Z, Q)
            }
            getSchema(B) {
                let Q = this.normalizeShapeId(B);
                if (!this.schemas.has(Q)) throw new Error(`@smithy/core/schema - schema not found for ${Q}`);
                return this.schemas.get(Q)
            }
            getBaseException() {
                for (let [B, Q] of this.schemas.entries())
                    if (B.startsWith("smithy.ts.sdk.synthetic.") && B.endsWith("ServiceException")) return Q;
                return
            }
            find(B) {
                return [...this.schemas.values()].find(B)
            }
            destroy() {
                A.registries.delete(this.namespace), this.schemas.clear()
            }
            normalizeShapeId(B) {
                if (B.includes("#")) return B;
                return this.namespace + "#" + B
            }
            getNamespace(B) {
                return this.normalizeShapeId(B).split("#")[0]
            }
        },
        dp = class {
            constructor(A, B) {
                this.name = A, this.traits = B
            }
        },
        xn1 = class extends dp {
            constructor(A, B, Q) {
                super(A, B);
                this.name = A, this.traits = B, this.valueSchema = Q
            }
        };

    function Um9(A, B, Q = {}, Z) {
        let D = new xn1(A + "#" + B, Q, typeof Z === "function" ? Z() : Z);
        return Eh.for(A).register(B, D), D
    }
    var vn1 = class extends dp {
        constructor(A, B, Q, Z) {
            super(A, B);
            this.name = A, this.traits = B, this.keySchema = Q, this.valueSchema = Z
        }
    };

    function wm9(A, B, Q = {}, Z, D) {
        let G = new vn1(A + "#" + B, Q, Z, typeof D === "function" ? D() : D);
        return Eh.for(A).register(B, G), G
    }
    var D2A = class extends dp {
        constructor(A, B, Q, Z) {
            super(A, B);
            this.name = A, this.traits = B, this.input = Q, this.output = Z
        }
    };

    function $m9(A, B, Q = {}, Z, D) {
        let G = new D2A(A + "#" + B, Q, Z, D);
        return Eh.for(A).register(B, G), G
    }
    var AK1 = class extends dp {
        constructor(A, B, Q, Z) {
            super(A, B);
            this.name = A, this.traits = B, this.memberNames = Q, this.memberList = Z, this.members = {};
            for (let D = 0; D < Q.length; ++D) this.members[Q[D]] = Array.isArray(Z[D]) ? Z[D] : [Z[D], 0]
        }
    };

    function qm9(A, B, Q, Z, D) {
        let G = new AK1(A + "#" + B, Q, Z, D);
        return Eh.for(A).register(B, G), G
    }
    var G2A = class extends AK1 {
        constructor(A, B, Q, Z, D) {
            super(A, B, Q, Z);
            this.name = A, this.traits = B, this.memberNames = Q, this.memberList = Z, this.ctor = D
        }
    };

    function Nm9(A, B, Q = {}, Z, D, G) {
        let F = new G2A(A + "#" + B, Q, Z, D, G);
        return Eh.for(A).register(B, F), F
    }
    var pD = {
            BLOB: 21,
            STREAMING_BLOB: 42,
            BOOLEAN: 2,
            STRING: 0,
            NUMERIC: 1,
            BIG_INTEGER: 17,
            BIG_DECIMAL: 19,
            DOCUMENT: 15,
            TIMESTAMP_DEFAULT: 4,
            TIMESTAMP_DATE_TIME: 5,
            TIMESTAMP_HTTP_DATE: 6,
            TIMESTAMP_EPOCH_SECONDS: 7,
            LIST_MODIFIER: 64,
            MAP_MODIFIER: 128
        },
        bn1 = class extends dp {
            constructor(A, B, Q) {
                super(A, Q);
                this.name = A, this.schemaRef = B, this.traits = Q
            }
        };

    function Lm9(A, B, Q, Z) {
        let D = new bn1(A + "#" + B, Q, Z);
        return Eh.for(A).register(B, D), D
    }
    var Mm9 = class A {
        constructor(B, Q) {
            this.ref = B, this.memberName = Q;
            let Z = [],
                D = B,
                G = B;
            this._isMemberSchema = !1;
            while (Array.isArray(D)) Z.push(D[1]), D = D[0], G = C91(D), this._isMemberSchema = !0;
            if (Z.length > 0) {
                this.memberTraits = {};
                for (let F = Z.length - 1; F >= 0; --F) {
                    let I = Z[F];
                    Object.assign(this.memberTraits, A.translateTraits(I))
                }
            } else this.memberTraits = 0;
            if (G instanceof A) {
                this.name = G.name, this.traits = G.traits, this._isMemberSchema = G._isMemberSchema, this.schema = G.schema, this.memberTraits = Object.assign({}, G.getMemberTraits(), this.getMemberTraits()), this.normalizedTraits = void 0, this.ref = G.ref, this.memberName = Q ?? G.memberName;
                return
            }
            if (this.schema = C91(G), this.schema && typeof this.schema === "object") this.traits = this.schema?.traits ?? {};
            else this.traits = 0;
            if (this.name = (typeof this.schema === "object" ? this.schema?.name : void 0) ?? this.memberName ?? this.getSchemaName(), this._isMemberSchema && !Q) throw new Error(`@smithy/core/schema - NormalizedSchema member schema ${this.getName(!0)} must initialize with memberName argument.`)
        }
        static of (B, Q) {
            if (B instanceof A) return B;
            return new A(B, Q)
        }
        static translateTraits(B) {
            if (typeof B === "object") return B;
            B = B | 0;
            let Q = {};
            if ((B & 1) === 1) Q.httpLabel = 1;
            if ((B >> 1 & 1) === 1) Q.idempotent = 1;
            if ((B >> 2 & 1) === 1) Q.idempotencyToken = 1;
            if ((B >> 3 & 1) === 1) Q.sensitive = 1;
            if ((B >> 4 & 1) === 1) Q.httpPayload = 1;
            if ((B >> 5 & 1) === 1) Q.httpResponseCode = 1;
            if ((B >> 6 & 1) === 1) Q.httpQueryParams = 1;
            return Q
        }
        static memberFrom(B, Q) {
            if (B instanceof A) return B.memberName = Q, B._isMemberSchema = !0, B;
            return new A(B, Q)
        }
        getSchema() {
            if (this.schema instanceof A) return this.schema = this.schema.getSchema();
            if (this.schema instanceof bn1) return C91(this.schema.schemaRef);
            return C91(this.schema)
        }
        getName(B = !1) {
            if (!B) {
                if (this.name && this.name.includes("#")) return this.name.split("#")[1]
            }
            return this.name || void 0
        }
        getMemberName() {
            if (!this.isMemberSchema()) throw new Error(`@smithy/core/schema - cannot get member name on non-member schema: ${this.getName(!0)}`);
            return this.memberName
        }
        isMemberSchema() {
            return this._isMemberSchema
        }
        isUnitSchema() {
            return this.getSchema() === "unit"
        }
        isListSchema() {
            let B = this.getSchema();
            if (typeof B === "number") return B >= pD.LIST_MODIFIER && B < pD.MAP_MODIFIER;
            return B instanceof xn1
        }
        isMapSchema() {
            let B = this.getSchema();
            if (typeof B === "number") return B >= pD.MAP_MODIFIER && B <= 255;
            return B instanceof vn1
        }
        isDocumentSchema() {
            return this.getSchema() === pD.DOCUMENT
        }
        isStructSchema() {
            let B = this.getSchema();
            return B !== null && typeof B === "object" && "members" in B || B instanceof AK1
        }
        isBlobSchema() {
            return this.getSchema() === pD.BLOB || this.getSchema() === pD.STREAMING_BLOB
        }
        isTimestampSchema() {
            let B = this.getSchema();
            return typeof B === "number" && B >= pD.TIMESTAMP_DEFAULT && B <= pD.TIMESTAMP_EPOCH_SECONDS
        }
        isStringSchema() {
            return this.getSchema() === pD.STRING
        }
        isBooleanSchema() {
            return this.getSchema() === pD.BOOLEAN
        }
        isNumericSchema() {
            return this.getSchema() === pD.NUMERIC
        }
        isBigIntegerSchema() {
            return this.getSchema() === pD.BIG_INTEGER
        }
        isBigDecimalSchema() {
            return this.getSchema() === pD.BIG_DECIMAL
        }
        isStreaming() {
            if (!!this.getMergedTraits().streaming) return !0;
            return this.getSchema() === pD.STREAMING_BLOB
        }
        getMergedTraits() {
            if (this.normalizedTraits) return this.normalizedTraits;
            return this.normalizedTraits = {
                ...this.getOwnTraits(),
                ...this.getMemberTraits()
            }, this.normalizedTraits
        }
        getMemberTraits() {
            return A.translateTraits(this.memberTraits)
        }
        getOwnTraits() {
            return A.translateTraits(this.traits)
        }
        getKeySchema() {
            if (this.isDocumentSchema()) return A.memberFrom([pD.DOCUMENT, 0], "key");
            if (!this.isMapSchema()) throw new Error(`@smithy/core/schema - cannot get key schema for non-map schema: ${this.getName(!0)}`);
            let B = this.getSchema();
            if (typeof B === "number") return A.memberFrom([63 & B, 0], "key");
            return A.memberFrom([B.keySchema, 0], "key")
        }
        getValueSchema() {
            let B = this.getSchema();
            if (typeof B === "number") {
                if (this.isMapSchema()) return A.memberFrom([63 & B, 0], "value");
                else if (this.isListSchema()) return A.memberFrom([63 & B, 0], "member")
            }
            if (B && typeof B === "object") {
                if (this.isStructSchema()) throw new Error(`cannot call getValueSchema() with StructureSchema ${this.getName(!0)}`);
                let Q = B;
                if ("valueSchema" in Q) {
                    if (this.isMapSchema()) return A.memberFrom([Q.valueSchema, 0], "value");
                    else if (this.isListSchema()) return A.memberFrom([Q.valueSchema, 0], "member")
                }
            }
            if (this.isDocumentSchema()) return A.memberFrom([pD.DOCUMENT, 0], "value");
            throw new Error(`@smithy/core/schema - the schema ${this.getName(!0)} does not have a value member.`)
        }
        getMemberSchema(B) {
            if (this.isStructSchema()) {
                let Q = this.getSchema();
                if (!(B in Q.members)) throw new Error(`@smithy/core/schema - the schema ${this.getName(!0)} does not have a member with name=${B}.`);
                return A.memberFrom(Q.members[B], B)
            }
            if (this.isDocumentSchema()) return A.memberFrom([pD.DOCUMENT, 0], B);
            throw new Error(`@smithy/core/schema - the schema ${this.getName(!0)} does not have members.`)
        }
        getMemberSchemas() {
            let {
                schema: B
            } = this, Q = B;
            if (!Q || typeof Q !== "object") return {};
            if ("members" in Q) {
                let Z = {};
                for (let D of Q.memberNames) Z[D] = this.getMemberSchema(D);
                return Z
            }
            return {}
        }* structIterator() {
            if (this.isUnitSchema()) return;
            if (!this.isStructSchema()) throw new Error("@smithy/core/schema - cannot acquire structIterator on non-struct schema.");
            let B = this.getSchema();
            for (let Q = 0; Q < B.memberNames.length; ++Q) yield [B.memberNames[Q], A.memberFrom([B.memberList[Q], 0], B.memberNames[Q])]
        }
        getSchemaName() {
            let B = this.getSchema();
            if (typeof B === "number") {
                let Q = 63 & B,
                    Z = 192 & B,
                    D = Object.entries(pD).find(([, G]) => {
                        return G === Q
                    })?.[0] ?? "Unknown";
                switch (Z) {
                    case pD.MAP_MODIFIER:
                        return `${D}Map`;
                    case pD.LIST_MODIFIER:
                        return `${D}List`;
                    case 0:
                        return D
                }
            }
            return "Unknown"
        }
    }
});