/* chunk:316 bytes:[7315379, 7693055) size:377676 source:unpacked-cli.js */
var QP1 = E((vi2, bi2) => {
    Object.defineProperty(vi2, "__esModule", {
        value: !0
    });
    var i9 = uW0(),
        m0 = i9.Reader,
        J4 = i9.Writer,
        K1 = i9.util,
        J1 = i9.roots.default || (i9.roots.default = {});
    J1.opentelemetry = function() {
        var A = {};
        return A.proto = function() {
            var B = {};
            return B.common = function() {
                var Q = {};
                return Q.v1 = function() {
                    var Z = {};
                    return Z.AnyValue = function() {
                        function D(F) {
                            if (F) {
                                for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                    if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                            }
                        }
                        D.prototype.stringValue = null, D.prototype.boolValue = null, D.prototype.intValue = null, D.prototype.doubleValue = null, D.prototype.arrayValue = null, D.prototype.kvlistValue = null, D.prototype.bytesValue = null;
                        var G;
                        return Object.defineProperty(D.prototype, "value", {
                            get: K1.oneOfGetter(G = ["stringValue", "boolValue", "intValue", "doubleValue", "arrayValue", "kvlistValue", "bytesValue"]),
                            set: K1.oneOfSetter(G)
                        }), D.create = function F(I) {
                            return new D(I)
                        }, D.encode = function F(I, Y) {
                            if (!Y) Y = J4.create();
                            if (I.stringValue != null && Object.hasOwnProperty.call(I, "stringValue")) Y.uint32(10).string(I.stringValue);
                            if (I.boolValue != null && Object.hasOwnProperty.call(I, "boolValue")) Y.uint32(16).bool(I.boolValue);
                            if (I.intValue != null && Object.hasOwnProperty.call(I, "intValue")) Y.uint32(24).int64(I.intValue);
                            if (I.doubleValue != null && Object.hasOwnProperty.call(I, "doubleValue")) Y.uint32(33).double(I.doubleValue);
                            if (I.arrayValue != null && Object.hasOwnProperty.call(I, "arrayValue")) J1.opentelemetry.proto.common.v1.ArrayValue.encode(I.arrayValue, Y.uint32(42).fork()).ldelim();
                            if (I.kvlistValue != null && Object.hasOwnProperty.call(I, "kvlistValue")) J1.opentelemetry.proto.common.v1.KeyValueList.encode(I.kvlistValue, Y.uint32(50).fork()).ldelim();
                            if (I.bytesValue != null && Object.hasOwnProperty.call(I, "bytesValue")) Y.uint32(58).bytes(I.bytesValue);
                            return Y
                        }, D.encodeDelimited = function F(I, Y) {
                            return this.encode(I, Y).ldelim()
                        }, D.decode = function F(I, Y) {
                            if (!(I instanceof m0)) I = m0.create(I);
                            var W = Y === void 0 ? I.len : I.pos + Y,
                                J = new J1.opentelemetry.proto.common.v1.AnyValue;
                            while (I.pos < W) {
                                var X = I.uint32();
                                switch (X >>> 3) {
                                    case 1: {
                                        J.stringValue = I.string();
                                        break
                                    }
                                    case 2: {
                                        J.boolValue = I.bool();
                                        break
                                    }
                                    case 3: {
                                        J.intValue = I.int64();
                                        break
                                    }
                                    case 4: {
                                        J.doubleValue = I.double();
                                        break
                                    }
                                    case 5: {
                                        J.arrayValue = J1.opentelemetry.proto.common.v1.ArrayValue.decode(I, I.uint32());
                                        break
                                    }
                                    case 6: {
                                        J.kvlistValue = J1.opentelemetry.proto.common.v1.KeyValueList.decode(I, I.uint32());
                                        break
                                    }
                                    case 7: {
                                        J.bytesValue = I.bytes();
                                        break
                                    }
                                    default:
                                        I.skipType(X & 7);
                                        break
                                }
                            }
                            return J
                        }, D.decodeDelimited = function F(I) {
                            if (!(I instanceof m0)) I = new m0(I);
                            return this.decode(I, I.uint32())
                        }, D.verify = function F(I) {
                            if (typeof I !== "object" || I === null) return "object expected";
                            var Y = {};
                            if (I.stringValue != null && I.hasOwnProperty("stringValue")) {
                                if (Y.value = 1, !K1.isString(I.stringValue)) return "stringValue: string expected"
                            }
                            if (I.boolValue != null && I.hasOwnProperty("boolValue")) {
                                if (Y.value === 1) return "value: multiple values";
                                if (Y.value = 1, typeof I.boolValue !== "boolean") return "boolValue: boolean expected"
                            }
                            if (I.intValue != null && I.hasOwnProperty("intValue")) {
                                if (Y.value === 1) return "value: multiple values";
                                if (Y.value = 1, !K1.isInteger(I.intValue) && !(I.intValue && K1.isInteger(I.intValue.low) && K1.isInteger(I.intValue.high))) return "intValue: integer|Long expected"
                            }
                            if (I.doubleValue != null && I.hasOwnProperty("doubleValue")) {
                                if (Y.value === 1) return "value: multiple values";
                                if (Y.value = 1, typeof I.doubleValue !== "number") return "doubleValue: number expected"
                            }
                            if (I.arrayValue != null && I.hasOwnProperty("arrayValue")) {
                                if (Y.value === 1) return "value: multiple values";
                                Y.value = 1;
                                {
                                    var W = J1.opentelemetry.proto.common.v1.ArrayValue.verify(I.arrayValue);
                                    if (W) return "arrayValue." + W
                                }
                            }
                            if (I.kvlistValue != null && I.hasOwnProperty("kvlistValue")) {
                                if (Y.value === 1) return "value: multiple values";
                                Y.value = 1;
                                {
                                    var W = J1.opentelemetry.proto.common.v1.KeyValueList.verify(I.kvlistValue);
                                    if (W) return "kvlistValue." + W
                                }
                            }
                            if (I.bytesValue != null && I.hasOwnProperty("bytesValue")) {
                                if (Y.value === 1) return "value: multiple values";
                                if (Y.value = 1, !(I.bytesValue && typeof I.bytesValue.length === "number" || K1.isString(I.bytesValue))) return "bytesValue: buffer expected"
                            }
                            return null
                        }, D.fromObject = function F(I) {
                            if (I instanceof J1.opentelemetry.proto.common.v1.AnyValue) return I;
                            var Y = new J1.opentelemetry.proto.common.v1.AnyValue;
                            if (I.stringValue != null) Y.stringValue = String(I.stringValue);
                            if (I.boolValue != null) Y.boolValue = Boolean(I.boolValue);
                            if (I.intValue != null) {
                                if (K1.Long)(Y.intValue = K1.Long.fromValue(I.intValue)).unsigned = !1;
                                else if (typeof I.intValue === "string") Y.intValue = parseInt(I.intValue, 10);
                                else if (typeof I.intValue === "number") Y.intValue = I.intValue;
                                else if (typeof I.intValue === "object") Y.intValue = new K1.LongBits(I.intValue.low >>> 0, I.intValue.high >>> 0).toNumber()
                            }
                            if (I.doubleValue != null) Y.doubleValue = Number(I.doubleValue);
                            if (I.arrayValue != null) {
                                if (typeof I.arrayValue !== "object") throw TypeError(".opentelemetry.proto.common.v1.AnyValue.arrayValue: object expected");
                                Y.arrayValue = J1.opentelemetry.proto.common.v1.ArrayValue.fromObject(I.arrayValue)
                            }
                            if (I.kvlistValue != null) {
                                if (typeof I.kvlistValue !== "object") throw TypeError(".opentelemetry.proto.common.v1.AnyValue.kvlistValue: object expected");
                                Y.kvlistValue = J1.opentelemetry.proto.common.v1.KeyValueList.fromObject(I.kvlistValue)
                            }
                            if (I.bytesValue != null) {
                                if (typeof I.bytesValue === "string") K1.base64.decode(I.bytesValue, Y.bytesValue = K1.newBuffer(K1.base64.length(I.bytesValue)), 0);
                                else if (I.bytesValue.length >= 0) Y.bytesValue = I.bytesValue
                            }
                            return Y
                        }, D.toObject = function F(I, Y) {
                            if (!Y) Y = {};
                            var W = {};
                            if (I.stringValue != null && I.hasOwnProperty("stringValue")) {
                                if (W.stringValue = I.stringValue, Y.oneofs) W.value = "stringValue"
                            }
                            if (I.boolValue != null && I.hasOwnProperty("boolValue")) {
                                if (W.boolValue = I.boolValue, Y.oneofs) W.value = "boolValue"
                            }
                            if (I.intValue != null && I.hasOwnProperty("intValue")) {
                                if (typeof I.intValue === "number") W.intValue = Y.longs === String ? String(I.intValue) : I.intValue;
                                else W.intValue = Y.longs === String ? K1.Long.prototype.toString.call(I.intValue) : Y.longs === Number ? new K1.LongBits(I.intValue.low >>> 0, I.intValue.high >>> 0).toNumber() : I.intValue;
                                if (Y.oneofs) W.value = "intValue"
                            }
                            if (I.doubleValue != null && I.hasOwnProperty("doubleValue")) {
                                if (W.doubleValue = Y.json && !isFinite(I.doubleValue) ? String(I.doubleValue) : I.doubleValue, Y.oneofs) W.value = "doubleValue"
                            }
                            if (I.arrayValue != null && I.hasOwnProperty("arrayValue")) {
                                if (W.arrayValue = J1.opentelemetry.proto.common.v1.ArrayValue.toObject(I.arrayValue, Y), Y.oneofs) W.value = "arrayValue"
                            }
                            if (I.kvlistValue != null && I.hasOwnProperty("kvlistValue")) {
                                if (W.kvlistValue = J1.opentelemetry.proto.common.v1.KeyValueList.toObject(I.kvlistValue, Y), Y.oneofs) W.value = "kvlistValue"
                            }
                            if (I.bytesValue != null && I.hasOwnProperty("bytesValue")) {
                                if (W.bytesValue = Y.bytes === String ? K1.base64.encode(I.bytesValue, 0, I.bytesValue.length) : Y.bytes === Array ? Array.prototype.slice.call(I.bytesValue) : I.bytesValue, Y.oneofs) W.value = "bytesValue"
                            }
                            return W
                        }, D.prototype.toJSON = function F() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function F(I) {
                            if (I === void 0) I = "type.googleapis.com";
                            return I + "/opentelemetry.proto.common.v1.AnyValue"
                        }, D
                    }(), Z.ArrayValue = function() {
                        function D(G) {
                            if (this.values = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.values = K1.emptyArray, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.values != null && F.values.length)
                                for (var Y = 0; Y < F.values.length; ++Y) J1.opentelemetry.proto.common.v1.AnyValue.encode(F.values[Y], I.uint32(10).fork()).ldelim();
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.common.v1.ArrayValue;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.values && W.values.length)) W.values = [];
                                        W.values.push(J1.opentelemetry.proto.common.v1.AnyValue.decode(F, F.uint32()));
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.values != null && F.hasOwnProperty("values")) {
                                if (!Array.isArray(F.values)) return "values: array expected";
                                for (var I = 0; I < F.values.length; ++I) {
                                    var Y = J1.opentelemetry.proto.common.v1.AnyValue.verify(F.values[I]);
                                    if (Y) return "values." + Y
                                }
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.common.v1.ArrayValue) return F;
                            var I = new J1.opentelemetry.proto.common.v1.ArrayValue;
                            if (F.values) {
                                if (!Array.isArray(F.values)) throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: array expected");
                                I.values = [];
                                for (var Y = 0; Y < F.values.length; ++Y) {
                                    if (typeof F.values[Y] !== "object") throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: object expected");
                                    I.values[Y] = J1.opentelemetry.proto.common.v1.AnyValue.fromObject(F.values[Y])
                                }
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.values = [];
                            if (F.values && F.values.length) {
                                Y.values = [];
                                for (var W = 0; W < F.values.length; ++W) Y.values[W] = J1.opentelemetry.proto.common.v1.AnyValue.toObject(F.values[W], I)
                            }
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.common.v1.ArrayValue"
                        }, D
                    }(), Z.KeyValueList = function() {
                        function D(G) {
                            if (this.values = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.values = K1.emptyArray, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.values != null && F.values.length)
                                for (var Y = 0; Y < F.values.length; ++Y) J1.opentelemetry.proto.common.v1.KeyValue.encode(F.values[Y], I.uint32(10).fork()).ldelim();
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.common.v1.KeyValueList;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.values && W.values.length)) W.values = [];
                                        W.values.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(F, F.uint32()));
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.values != null && F.hasOwnProperty("values")) {
                                if (!Array.isArray(F.values)) return "values: array expected";
                                for (var I = 0; I < F.values.length; ++I) {
                                    var Y = J1.opentelemetry.proto.common.v1.KeyValue.verify(F.values[I]);
                                    if (Y) return "values." + Y
                                }
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.common.v1.KeyValueList) return F;
                            var I = new J1.opentelemetry.proto.common.v1.KeyValueList;
                            if (F.values) {
                                if (!Array.isArray(F.values)) throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: array expected");
                                I.values = [];
                                for (var Y = 0; Y < F.values.length; ++Y) {
                                    if (typeof F.values[Y] !== "object") throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: object expected");
                                    I.values[Y] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(F.values[Y])
                                }
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.values = [];
                            if (F.values && F.values.length) {
                                Y.values = [];
                                for (var W = 0; W < F.values.length; ++W) Y.values[W] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(F.values[W], I)
                            }
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.common.v1.KeyValueList"
                        }, D
                    }(), Z.KeyValue = function() {
                        function D(G) {
                            if (G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.key = null, D.prototype.value = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.key != null && Object.hasOwnProperty.call(F, "key")) I.uint32(10).string(F.key);
                            if (F.value != null && Object.hasOwnProperty.call(F, "value")) J1.opentelemetry.proto.common.v1.AnyValue.encode(F.value, I.uint32(18).fork()).ldelim();
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.common.v1.KeyValue;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.key = F.string();
                                        break
                                    }
                                    case 2: {
                                        W.value = J1.opentelemetry.proto.common.v1.AnyValue.decode(F, F.uint32());
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.key != null && F.hasOwnProperty("key")) {
                                if (!K1.isString(F.key)) return "key: string expected"
                            }
                            if (F.value != null && F.hasOwnProperty("value")) {
                                var I = J1.opentelemetry.proto.common.v1.AnyValue.verify(F.value);
                                if (I) return "value." + I
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.common.v1.KeyValue) return F;
                            var I = new J1.opentelemetry.proto.common.v1.KeyValue;
                            if (F.key != null) I.key = String(F.key);
                            if (F.value != null) {
                                if (typeof F.value !== "object") throw TypeError(".opentelemetry.proto.common.v1.KeyValue.value: object expected");
                                I.value = J1.opentelemetry.proto.common.v1.AnyValue.fromObject(F.value)
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.defaults) Y.key = "", Y.value = null;
                            if (F.key != null && F.hasOwnProperty("key")) Y.key = F.key;
                            if (F.value != null && F.hasOwnProperty("value")) Y.value = J1.opentelemetry.proto.common.v1.AnyValue.toObject(F.value, I);
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.common.v1.KeyValue"
                        }, D
                    }(), Z.InstrumentationScope = function() {
                        function D(G) {
                            if (this.attributes = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.name = null, D.prototype.version = null, D.prototype.attributes = K1.emptyArray, D.prototype.droppedAttributesCount = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.name != null && Object.hasOwnProperty.call(F, "name")) I.uint32(10).string(F.name);
                            if (F.version != null && Object.hasOwnProperty.call(F, "version")) I.uint32(18).string(F.version);
                            if (F.attributes != null && F.attributes.length)
                                for (var Y = 0; Y < F.attributes.length; ++Y) J1.opentelemetry.proto.common.v1.KeyValue.encode(F.attributes[Y], I.uint32(26).fork()).ldelim();
                            if (F.droppedAttributesCount != null && Object.hasOwnProperty.call(F, "droppedAttributesCount")) I.uint32(32).uint32(F.droppedAttributesCount);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.common.v1.InstrumentationScope;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.name = F.string();
                                        break
                                    }
                                    case 2: {
                                        W.version = F.string();
                                        break
                                    }
                                    case 3: {
                                        if (!(W.attributes && W.attributes.length)) W.attributes = [];
                                        W.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(F, F.uint32()));
                                        break
                                    }
                                    case 4: {
                                        W.droppedAttributesCount = F.uint32();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.name != null && F.hasOwnProperty("name")) {
                                if (!K1.isString(F.name)) return "name: string expected"
                            }
                            if (F.version != null && F.hasOwnProperty("version")) {
                                if (!K1.isString(F.version)) return "version: string expected"
                            }
                            if (F.attributes != null && F.hasOwnProperty("attributes")) {
                                if (!Array.isArray(F.attributes)) return "attributes: array expected";
                                for (var I = 0; I < F.attributes.length; ++I) {
                                    var Y = J1.opentelemetry.proto.common.v1.KeyValue.verify(F.attributes[I]);
                                    if (Y) return "attributes." + Y
                                }
                            }
                            if (F.droppedAttributesCount != null && F.hasOwnProperty("droppedAttributesCount")) {
                                if (!K1.isInteger(F.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.common.v1.InstrumentationScope) return F;
                            var I = new J1.opentelemetry.proto.common.v1.InstrumentationScope;
                            if (F.name != null) I.name = String(F.name);
                            if (F.version != null) I.version = String(F.version);
                            if (F.attributes) {
                                if (!Array.isArray(F.attributes)) throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: array expected");
                                I.attributes = [];
                                for (var Y = 0; Y < F.attributes.length; ++Y) {
                                    if (typeof F.attributes[Y] !== "object") throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: object expected");
                                    I.attributes[Y] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(F.attributes[Y])
                                }
                            }
                            if (F.droppedAttributesCount != null) I.droppedAttributesCount = F.droppedAttributesCount >>> 0;
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.attributes = [];
                            if (I.defaults) Y.name = "", Y.version = "", Y.droppedAttributesCount = 0;
                            if (F.name != null && F.hasOwnProperty("name")) Y.name = F.name;
                            if (F.version != null && F.hasOwnProperty("version")) Y.version = F.version;
                            if (F.attributes && F.attributes.length) {
                                Y.attributes = [];
                                for (var W = 0; W < F.attributes.length; ++W) Y.attributes[W] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(F.attributes[W], I)
                            }
                            if (F.droppedAttributesCount != null && F.hasOwnProperty("droppedAttributesCount")) Y.droppedAttributesCount = F.droppedAttributesCount;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.common.v1.InstrumentationScope"
                        }, D
                    }(), Z
                }(), Q
            }(), B.resource = function() {
                var Q = {};
                return Q.v1 = function() {
                    var Z = {};
                    return Z.Resource = function() {
                        function D(G) {
                            if (this.attributes = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.attributes = K1.emptyArray, D.prototype.droppedAttributesCount = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.attributes != null && F.attributes.length)
                                for (var Y = 0; Y < F.attributes.length; ++Y) J1.opentelemetry.proto.common.v1.KeyValue.encode(F.attributes[Y], I.uint32(10).fork()).ldelim();
                            if (F.droppedAttributesCount != null && Object.hasOwnProperty.call(F, "droppedAttributesCount")) I.uint32(16).uint32(F.droppedAttributesCount);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.resource.v1.Resource;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.attributes && W.attributes.length)) W.attributes = [];
                                        W.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(F, F.uint32()));
                                        break
                                    }
                                    case 2: {
                                        W.droppedAttributesCount = F.uint32();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.attributes != null && F.hasOwnProperty("attributes")) {
                                if (!Array.isArray(F.attributes)) return "attributes: array expected";
                                for (var I = 0; I < F.attributes.length; ++I) {
                                    var Y = J1.opentelemetry.proto.common.v1.KeyValue.verify(F.attributes[I]);
                                    if (Y) return "attributes." + Y
                                }
                            }
                            if (F.droppedAttributesCount != null && F.hasOwnProperty("droppedAttributesCount")) {
                                if (!K1.isInteger(F.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.resource.v1.Resource) return F;
                            var I = new J1.opentelemetry.proto.resource.v1.Resource;
                            if (F.attributes) {
                                if (!Array.isArray(F.attributes)) throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: array expected");
                                I.attributes = [];
                                for (var Y = 0; Y < F.attributes.length; ++Y) {
                                    if (typeof F.attributes[Y] !== "object") throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: object expected");
                                    I.attributes[Y] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(F.attributes[Y])
                                }
                            }
                            if (F.droppedAttributesCount != null) I.droppedAttributesCount = F.droppedAttributesCount >>> 0;
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.attributes = [];
                            if (I.defaults) Y.droppedAttributesCount = 0;
                            if (F.attributes && F.attributes.length) {
                                Y.attributes = [];
                                for (var W = 0; W < F.attributes.length; ++W) Y.attributes[W] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(F.attributes[W], I)
                            }
                            if (F.droppedAttributesCount != null && F.hasOwnProperty("droppedAttributesCount")) Y.droppedAttributesCount = F.droppedAttributesCount;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.resource.v1.Resource"
                        }, D
                    }(), Z
                }(), Q
            }(), B.trace = function() {
                var Q = {};
                return Q.v1 = function() {
                    var Z = {};
                    return Z.TracesData = function() {
                        function D(G) {
                            if (this.resourceSpans = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.resourceSpans = K1.emptyArray, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.resourceSpans != null && F.resourceSpans.length)
                                for (var Y = 0; Y < F.resourceSpans.length; ++Y) J1.opentelemetry.proto.trace.v1.ResourceSpans.encode(F.resourceSpans[Y], I.uint32(10).fork()).ldelim();
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.trace.v1.TracesData;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.resourceSpans && W.resourceSpans.length)) W.resourceSpans = [];
                                        W.resourceSpans.push(J1.opentelemetry.proto.trace.v1.ResourceSpans.decode(F, F.uint32()));
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.resourceSpans != null && F.hasOwnProperty("resourceSpans")) {
                                if (!Array.isArray(F.resourceSpans)) return "resourceSpans: array expected";
                                for (var I = 0; I < F.resourceSpans.length; ++I) {
                                    var Y = J1.opentelemetry.proto.trace.v1.ResourceSpans.verify(F.resourceSpans[I]);
                                    if (Y) return "resourceSpans." + Y
                                }
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.trace.v1.TracesData) return F;
                            var I = new J1.opentelemetry.proto.trace.v1.TracesData;
                            if (F.resourceSpans) {
                                if (!Array.isArray(F.resourceSpans)) throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: array expected");
                                I.resourceSpans = [];
                                for (var Y = 0; Y < F.resourceSpans.length; ++Y) {
                                    if (typeof F.resourceSpans[Y] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: object expected");
                                    I.resourceSpans[Y] = J1.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(F.resourceSpans[Y])
                                }
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.resourceSpans = [];
                            if (F.resourceSpans && F.resourceSpans.length) {
                                Y.resourceSpans = [];
                                for (var W = 0; W < F.resourceSpans.length; ++W) Y.resourceSpans[W] = J1.opentelemetry.proto.trace.v1.ResourceSpans.toObject(F.resourceSpans[W], I)
                            }
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.trace.v1.TracesData"
                        }, D
                    }(), Z.ResourceSpans = function() {
                        function D(G) {
                            if (this.scopeSpans = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.resource = null, D.prototype.scopeSpans = K1.emptyArray, D.prototype.schemaUrl = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.resource != null && Object.hasOwnProperty.call(F, "resource")) J1.opentelemetry.proto.resource.v1.Resource.encode(F.resource, I.uint32(10).fork()).ldelim();
                            if (F.scopeSpans != null && F.scopeSpans.length)
                                for (var Y = 0; Y < F.scopeSpans.length; ++Y) J1.opentelemetry.proto.trace.v1.ScopeSpans.encode(F.scopeSpans[Y], I.uint32(18).fork()).ldelim();
                            if (F.schemaUrl != null && Object.hasOwnProperty.call(F, "schemaUrl")) I.uint32(26).string(F.schemaUrl);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.trace.v1.ResourceSpans;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.resource = J1.opentelemetry.proto.resource.v1.Resource.decode(F, F.uint32());
                                        break
                                    }
                                    case 2: {
                                        if (!(W.scopeSpans && W.scopeSpans.length)) W.scopeSpans = [];
                                        W.scopeSpans.push(J1.opentelemetry.proto.trace.v1.ScopeSpans.decode(F, F.uint32()));
                                        break
                                    }
                                    case 3: {
                                        W.schemaUrl = F.string();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.resource != null && F.hasOwnProperty("resource")) {
                                var I = J1.opentelemetry.proto.resource.v1.Resource.verify(F.resource);
                                if (I) return "resource." + I
                            }
                            if (F.scopeSpans != null && F.hasOwnProperty("scopeSpans")) {
                                if (!Array.isArray(F.scopeSpans)) return "scopeSpans: array expected";
                                for (var Y = 0; Y < F.scopeSpans.length; ++Y) {
                                    var I = J1.opentelemetry.proto.trace.v1.ScopeSpans.verify(F.scopeSpans[Y]);
                                    if (I) return "scopeSpans." + I
                                }
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) {
                                if (!K1.isString(F.schemaUrl)) return "schemaUrl: string expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.trace.v1.ResourceSpans) return F;
                            var I = new J1.opentelemetry.proto.trace.v1.ResourceSpans;
                            if (F.resource != null) {
                                if (typeof F.resource !== "object") throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.resource: object expected");
                                I.resource = J1.opentelemetry.proto.resource.v1.Resource.fromObject(F.resource)
                            }
                            if (F.scopeSpans) {
                                if (!Array.isArray(F.scopeSpans)) throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: array expected");
                                I.scopeSpans = [];
                                for (var Y = 0; Y < F.scopeSpans.length; ++Y) {
                                    if (typeof F.scopeSpans[Y] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: object expected");
                                    I.scopeSpans[Y] = J1.opentelemetry.proto.trace.v1.ScopeSpans.fromObject(F.scopeSpans[Y])
                                }
                            }
                            if (F.schemaUrl != null) I.schemaUrl = String(F.schemaUrl);
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.scopeSpans = [];
                            if (I.defaults) Y.resource = null, Y.schemaUrl = "";
                            if (F.resource != null && F.hasOwnProperty("resource")) Y.resource = J1.opentelemetry.proto.resource.v1.Resource.toObject(F.resource, I);
                            if (F.scopeSpans && F.scopeSpans.length) {
                                Y.scopeSpans = [];
                                for (var W = 0; W < F.scopeSpans.length; ++W) Y.scopeSpans[W] = J1.opentelemetry.proto.trace.v1.ScopeSpans.toObject(F.scopeSpans[W], I)
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) Y.schemaUrl = F.schemaUrl;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.trace.v1.ResourceSpans"
                        }, D
                    }(), Z.ScopeSpans = function() {
                        function D(G) {
                            if (this.spans = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.scope = null, D.prototype.spans = K1.emptyArray, D.prototype.schemaUrl = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.scope != null && Object.hasOwnProperty.call(F, "scope")) J1.opentelemetry.proto.common.v1.InstrumentationScope.encode(F.scope, I.uint32(10).fork()).ldelim();
                            if (F.spans != null && F.spans.length)
                                for (var Y = 0; Y < F.spans.length; ++Y) J1.opentelemetry.proto.trace.v1.Span.encode(F.spans[Y], I.uint32(18).fork()).ldelim();
                            if (F.schemaUrl != null && Object.hasOwnProperty.call(F, "schemaUrl")) I.uint32(26).string(F.schemaUrl);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.trace.v1.ScopeSpans;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.scope = J1.opentelemetry.proto.common.v1.InstrumentationScope.decode(F, F.uint32());
                                        break
                                    }
                                    case 2: {
                                        if (!(W.spans && W.spans.length)) W.spans = [];
                                        W.spans.push(J1.opentelemetry.proto.trace.v1.Span.decode(F, F.uint32()));
                                        break
                                    }
                                    case 3: {
                                        W.schemaUrl = F.string();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.scope != null && F.hasOwnProperty("scope")) {
                                var I = J1.opentelemetry.proto.common.v1.InstrumentationScope.verify(F.scope);
                                if (I) return "scope." + I
                            }
                            if (F.spans != null && F.hasOwnProperty("spans")) {
                                if (!Array.isArray(F.spans)) return "spans: array expected";
                                for (var Y = 0; Y < F.spans.length; ++Y) {
                                    var I = J1.opentelemetry.proto.trace.v1.Span.verify(F.spans[Y]);
                                    if (I) return "spans." + I
                                }
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) {
                                if (!K1.isString(F.schemaUrl)) return "schemaUrl: string expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.trace.v1.ScopeSpans) return F;
                            var I = new J1.opentelemetry.proto.trace.v1.ScopeSpans;
                            if (F.scope != null) {
                                if (typeof F.scope !== "object") throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.scope: object expected");
                                I.scope = J1.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(F.scope)
                            }
                            if (F.spans) {
                                if (!Array.isArray(F.spans)) throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: array expected");
                                I.spans = [];
                                for (var Y = 0; Y < F.spans.length; ++Y) {
                                    if (typeof F.spans[Y] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: object expected");
                                    I.spans[Y] = J1.opentelemetry.proto.trace.v1.Span.fromObject(F.spans[Y])
                                }
                            }
                            if (F.schemaUrl != null) I.schemaUrl = String(F.schemaUrl);
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.spans = [];
                            if (I.defaults) Y.scope = null, Y.schemaUrl = "";
                            if (F.scope != null && F.hasOwnProperty("scope")) Y.scope = J1.opentelemetry.proto.common.v1.InstrumentationScope.toObject(F.scope, I);
                            if (F.spans && F.spans.length) {
                                Y.spans = [];
                                for (var W = 0; W < F.spans.length; ++W) Y.spans[W] = J1.opentelemetry.proto.trace.v1.Span.toObject(F.spans[W], I)
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) Y.schemaUrl = F.schemaUrl;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.trace.v1.ScopeSpans"
                        }, D
                    }(), Z.Span = function() {
                        function D(G) {
                            if (this.attributes = [], this.events = [], this.links = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.traceId = null, D.prototype.spanId = null, D.prototype.traceState = null, D.prototype.parentSpanId = null, D.prototype.name = null, D.prototype.kind = null, D.prototype.startTimeUnixNano = null, D.prototype.endTimeUnixNano = null, D.prototype.attributes = K1.emptyArray, D.prototype.droppedAttributesCount = null, D.prototype.events = K1.emptyArray, D.prototype.droppedEventsCount = null, D.prototype.links = K1.emptyArray, D.prototype.droppedLinksCount = null, D.prototype.status = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.traceId != null && Object.hasOwnProperty.call(F, "traceId")) I.uint32(10).bytes(F.traceId);
                            if (F.spanId != null && Object.hasOwnProperty.call(F, "spanId")) I.uint32(18).bytes(F.spanId);
                            if (F.traceState != null && Object.hasOwnProperty.call(F, "traceState")) I.uint32(26).string(F.traceState);
                            if (F.parentSpanId != null && Object.hasOwnProperty.call(F, "parentSpanId")) I.uint32(34).bytes(F.parentSpanId);
                            if (F.name != null && Object.hasOwnProperty.call(F, "name")) I.uint32(42).string(F.name);
                            if (F.kind != null && Object.hasOwnProperty.call(F, "kind")) I.uint32(48).int32(F.kind);
                            if (F.startTimeUnixNano != null && Object.hasOwnProperty.call(F, "startTimeUnixNano")) I.uint32(57).fixed64(F.startTimeUnixNano);
                            if (F.endTimeUnixNano != null && Object.hasOwnProperty.call(F, "endTimeUnixNano")) I.uint32(65).fixed64(F.endTimeUnixNano);
                            if (F.attributes != null && F.attributes.length)
                                for (var Y = 0; Y < F.attributes.length; ++Y) J1.opentelemetry.proto.common.v1.KeyValue.encode(F.attributes[Y], I.uint32(74).fork()).ldelim();
                            if (F.droppedAttributesCount != null && Object.hasOwnProperty.call(F, "droppedAttributesCount")) I.uint32(80).uint32(F.droppedAttributesCount);
                            if (F.events != null && F.events.length)
                                for (var Y = 0; Y < F.events.length; ++Y) J1.opentelemetry.proto.trace.v1.Span.Event.encode(F.events[Y], I.uint32(90).fork()).ldelim();
                            if (F.droppedEventsCount != null && Object.hasOwnProperty.call(F, "droppedEventsCount")) I.uint32(96).uint32(F.droppedEventsCount);
                            if (F.links != null && F.links.length)
                                for (var Y = 0; Y < F.links.length; ++Y) J1.opentelemetry.proto.trace.v1.Span.Link.encode(F.links[Y], I.uint32(106).fork()).ldelim();
                            if (F.droppedLinksCount != null && Object.hasOwnProperty.call(F, "droppedLinksCount")) I.uint32(112).uint32(F.droppedLinksCount);
                            if (F.status != null && Object.hasOwnProperty.call(F, "status")) J1.opentelemetry.proto.trace.v1.Status.encode(F.status, I.uint32(122).fork()).ldelim();
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.trace.v1.Span;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.traceId = F.bytes();
                                        break
                                    }
                                    case 2: {
                                        W.spanId = F.bytes();
                                        break
                                    }
                                    case 3: {
                                        W.traceState = F.string();
                                        break
                                    }
                                    case 4: {
                                        W.parentSpanId = F.bytes();
                                        break
                                    }
                                    case 5: {
                                        W.name = F.string();
                                        break
                                    }
                                    case 6: {
                                        W.kind = F.int32();
                                        break
                                    }
                                    case 7: {
                                        W.startTimeUnixNano = F.fixed64();
                                        break
                                    }
                                    case 8: {
                                        W.endTimeUnixNano = F.fixed64();
                                        break
                                    }
                                    case 9: {
                                        if (!(W.attributes && W.attributes.length)) W.attributes = [];
                                        W.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(F, F.uint32()));
                                        break
                                    }
                                    case 10: {
                                        W.droppedAttributesCount = F.uint32();
                                        break
                                    }
                                    case 11: {
                                        if (!(W.events && W.events.length)) W.events = [];
                                        W.events.push(J1.opentelemetry.proto.trace.v1.Span.Event.decode(F, F.uint32()));
                                        break
                                    }
                                    case 12: {
                                        W.droppedEventsCount = F.uint32();
                                        break
                                    }
                                    case 13: {
                                        if (!(W.links && W.links.length)) W.links = [];
                                        W.links.push(J1.opentelemetry.proto.trace.v1.Span.Link.decode(F, F.uint32()));
                                        break
                                    }
                                    case 14: {
                                        W.droppedLinksCount = F.uint32();
                                        break
                                    }
                                    case 15: {
                                        W.status = J1.opentelemetry.proto.trace.v1.Status.decode(F, F.uint32());
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.traceId != null && F.hasOwnProperty("traceId")) {
                                if (!(F.traceId && typeof F.traceId.length === "number" || K1.isString(F.traceId))) return "traceId: buffer expected"
                            }
                            if (F.spanId != null && F.hasOwnProperty("spanId")) {
                                if (!(F.spanId && typeof F.spanId.length === "number" || K1.isString(F.spanId))) return "spanId: buffer expected"
                            }
                            if (F.traceState != null && F.hasOwnProperty("traceState")) {
                                if (!K1.isString(F.traceState)) return "traceState: string expected"
                            }
                            if (F.parentSpanId != null && F.hasOwnProperty("parentSpanId")) {
                                if (!(F.parentSpanId && typeof F.parentSpanId.length === "number" || K1.isString(F.parentSpanId))) return "parentSpanId: buffer expected"
                            }
                            if (F.name != null && F.hasOwnProperty("name")) {
                                if (!K1.isString(F.name)) return "name: string expected"
                            }
                            if (F.kind != null && F.hasOwnProperty("kind")) switch (F.kind) {
                                default:
                                    return "kind: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                    break
                            }
                            if (F.startTimeUnixNano != null && F.hasOwnProperty("startTimeUnixNano")) {
                                if (!K1.isInteger(F.startTimeUnixNano) && !(F.startTimeUnixNano && K1.isInteger(F.startTimeUnixNano.low) && K1.isInteger(F.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
                            }
                            if (F.endTimeUnixNano != null && F.hasOwnProperty("endTimeUnixNano")) {
                                if (!K1.isInteger(F.endTimeUnixNano) && !(F.endTimeUnixNano && K1.isInteger(F.endTimeUnixNano.low) && K1.isInteger(F.endTimeUnixNano.high))) return "endTimeUnixNano: integer|Long expected"
                            }
                            if (F.attributes != null && F.hasOwnProperty("attributes")) {
                                if (!Array.isArray(F.attributes)) return "attributes: array expected";
                                for (var I = 0; I < F.attributes.length; ++I) {
                                    var Y = J1.opentelemetry.proto.common.v1.KeyValue.verify(F.attributes[I]);
                                    if (Y) return "attributes." + Y
                                }
                            }
                            if (F.droppedAttributesCount != null && F.hasOwnProperty("droppedAttributesCount")) {
                                if (!K1.isInteger(F.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
                            }
                            if (F.events != null && F.hasOwnProperty("events")) {
                                if (!Array.isArray(F.events)) return "events: array expected";
                                for (var I = 0; I < F.events.length; ++I) {
                                    var Y = J1.opentelemetry.proto.trace.v1.Span.Event.verify(F.events[I]);
                                    if (Y) return "events." + Y
                                }
                            }
                            if (F.droppedEventsCount != null && F.hasOwnProperty("droppedEventsCount")) {
                                if (!K1.isInteger(F.droppedEventsCount)) return "droppedEventsCount: integer expected"
                            }
                            if (F.links != null && F.hasOwnProperty("links")) {
                                if (!Array.isArray(F.links)) return "links: array expected";
                                for (var I = 0; I < F.links.length; ++I) {
                                    var Y = J1.opentelemetry.proto.trace.v1.Span.Link.verify(F.links[I]);
                                    if (Y) return "links." + Y
                                }
                            }
                            if (F.droppedLinksCount != null && F.hasOwnProperty("droppedLinksCount")) {
                                if (!K1.isInteger(F.droppedLinksCount)) return "droppedLinksCount: integer expected"
                            }
                            if (F.status != null && F.hasOwnProperty("status")) {
                                var Y = J1.opentelemetry.proto.trace.v1.Status.verify(F.status);
                                if (Y) return "status." + Y
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.trace.v1.Span) return F;
                            var I = new J1.opentelemetry.proto.trace.v1.Span;
                            if (F.traceId != null) {
                                if (typeof F.traceId === "string") K1.base64.decode(F.traceId, I.traceId = K1.newBuffer(K1.base64.length(F.traceId)), 0);
                                else if (F.traceId.length >= 0) I.traceId = F.traceId
                            }
                            if (F.spanId != null) {
                                if (typeof F.spanId === "string") K1.base64.decode(F.spanId, I.spanId = K1.newBuffer(K1.base64.length(F.spanId)), 0);
                                else if (F.spanId.length >= 0) I.spanId = F.spanId
                            }
                            if (F.traceState != null) I.traceState = String(F.traceState);
                            if (F.parentSpanId != null) {
                                if (typeof F.parentSpanId === "string") K1.base64.decode(F.parentSpanId, I.parentSpanId = K1.newBuffer(K1.base64.length(F.parentSpanId)), 0);
                                else if (F.parentSpanId.length >= 0) I.parentSpanId = F.parentSpanId
                            }
                            if (F.name != null) I.name = String(F.name);
                            switch (F.kind) {
                                default:
                                    if (typeof F.kind === "number") {
                                        I.kind = F.kind;
                                        break
                                    }
                                    break;
                                case "SPAN_KIND_UNSPECIFIED":
                                case 0:
                                    I.kind = 0;
                                    break;
                                case "SPAN_KIND_INTERNAL":
                                case 1:
                                    I.kind = 1;
                                    break;
                                case "SPAN_KIND_SERVER":
                                case 2:
                                    I.kind = 2;
                                    break;
                                case "SPAN_KIND_CLIENT":
                                case 3:
                                    I.kind = 3;
                                    break;
                                case "SPAN_KIND_PRODUCER":
                                case 4:
                                    I.kind = 4;
                                    break;
                                case "SPAN_KIND_CONSUMER":
                                case 5:
                                    I.kind = 5;
                                    break
                            }
                            if (F.startTimeUnixNano != null) {
                                if (K1.Long)(I.startTimeUnixNano = K1.Long.fromValue(F.startTimeUnixNano)).unsigned = !1;
                                else if (typeof F.startTimeUnixNano === "string") I.startTimeUnixNano = parseInt(F.startTimeUnixNano, 10);
                                else if (typeof F.startTimeUnixNano === "number") I.startTimeUnixNano = F.startTimeUnixNano;
                                else if (typeof F.startTimeUnixNano === "object") I.startTimeUnixNano = new K1.LongBits(F.startTimeUnixNano.low >>> 0, F.startTimeUnixNano.high >>> 0).toNumber()
                            }
                            if (F.endTimeUnixNano != null) {
                                if (K1.Long)(I.endTimeUnixNano = K1.Long.fromValue(F.endTimeUnixNano)).unsigned = !1;
                                else if (typeof F.endTimeUnixNano === "string") I.endTimeUnixNano = parseInt(F.endTimeUnixNano, 10);
                                else if (typeof F.endTimeUnixNano === "number") I.endTimeUnixNano = F.endTimeUnixNano;
                                else if (typeof F.endTimeUnixNano === "object") I.endTimeUnixNano = new K1.LongBits(F.endTimeUnixNano.low >>> 0, F.endTimeUnixNano.high >>> 0).toNumber()
                            }
                            if (F.attributes) {
                                if (!Array.isArray(F.attributes)) throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: array expected");
                                I.attributes = [];
                                for (var Y = 0; Y < F.attributes.length; ++Y) {
                                    if (typeof F.attributes[Y] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: object expected");
                                    I.attributes[Y] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(F.attributes[Y])
                                }
                            }
                            if (F.droppedAttributesCount != null) I.droppedAttributesCount = F.droppedAttributesCount >>> 0;
                            if (F.events) {
                                if (!Array.isArray(F.events)) throw TypeError(".opentelemetry.proto.trace.v1.Span.events: array expected");
                                I.events = [];
                                for (var Y = 0; Y < F.events.length; ++Y) {
                                    if (typeof F.events[Y] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.events: object expected");
                                    I.events[Y] = J1.opentelemetry.proto.trace.v1.Span.Event.fromObject(F.events[Y])
                                }
                            }
                            if (F.droppedEventsCount != null) I.droppedEventsCount = F.droppedEventsCount >>> 0;
                            if (F.links) {
                                if (!Array.isArray(F.links)) throw TypeError(".opentelemetry.proto.trace.v1.Span.links: array expected");
                                I.links = [];
                                for (var Y = 0; Y < F.links.length; ++Y) {
                                    if (typeof F.links[Y] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.links: object expected");
                                    I.links[Y] = J1.opentelemetry.proto.trace.v1.Span.Link.fromObject(F.links[Y])
                                }
                            }
                            if (F.droppedLinksCount != null) I.droppedLinksCount = F.droppedLinksCount >>> 0;
                            if (F.status != null) {
                                if (typeof F.status !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.status: object expected");
                                I.status = J1.opentelemetry.proto.trace.v1.Status.fromObject(F.status)
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.attributes = [], Y.events = [], Y.links = [];
                            if (I.defaults) {
                                if (I.bytes === String) Y.traceId = "";
                                else if (Y.traceId = [], I.bytes !== Array) Y.traceId = K1.newBuffer(Y.traceId);
                                if (I.bytes === String) Y.spanId = "";
                                else if (Y.spanId = [], I.bytes !== Array) Y.spanId = K1.newBuffer(Y.spanId);
                                if (Y.traceState = "", I.bytes === String) Y.parentSpanId = "";
                                else if (Y.parentSpanId = [], I.bytes !== Array) Y.parentSpanId = K1.newBuffer(Y.parentSpanId);
                                if (Y.name = "", Y.kind = I.enums === String ? "SPAN_KIND_UNSPECIFIED" : 0, K1.Long) {
                                    var W = new K1.Long(0, 0, !1);
                                    Y.startTimeUnixNano = I.longs === String ? W.toString() : I.longs === Number ? W.toNumber() : W
                                } else Y.startTimeUnixNano = I.longs === String ? "0" : 0;
                                if (K1.Long) {
                                    var W = new K1.Long(0, 0, !1);
                                    Y.endTimeUnixNano = I.longs === String ? W.toString() : I.longs === Number ? W.toNumber() : W
                                } else Y.endTimeUnixNano = I.longs === String ? "0" : 0;
                                Y.droppedAttributesCount = 0, Y.droppedEventsCount = 0, Y.droppedLinksCount = 0, Y.status = null
                            }
                            if (F.traceId != null && F.hasOwnProperty("traceId")) Y.traceId = I.bytes === String ? K1.base64.encode(F.traceId, 0, F.traceId.length) : I.bytes === Array ? Array.prototype.slice.call(F.traceId) : F.traceId;
                            if (F.spanId != null && F.hasOwnProperty("spanId")) Y.spanId = I.bytes === String ? K1.base64.encode(F.spanId, 0, F.spanId.length) : I.bytes === Array ? Array.prototype.slice.call(F.spanId) : F.spanId;
                            if (F.traceState != null && F.hasOwnProperty("traceState")) Y.traceState = F.traceState;
                            if (F.parentSpanId != null && F.hasOwnProperty("parentSpanId")) Y.parentSpanId = I.bytes === String ? K1.base64.encode(F.parentSpanId, 0, F.parentSpanId.length) : I.bytes === Array ? Array.prototype.slice.call(F.parentSpanId) : F.parentSpanId;
                            if (F.name != null && F.hasOwnProperty("name")) Y.name = F.name;
                            if (F.kind != null && F.hasOwnProperty("kind")) Y.kind = I.enums === String ? J1.opentelemetry.proto.trace.v1.Span.SpanKind[F.kind] === void 0 ? F.kind : J1.opentelemetry.proto.trace.v1.Span.SpanKind[F.kind] : F.kind;
                            if (F.startTimeUnixNano != null && F.hasOwnProperty("startTimeUnixNano"))
                                if (typeof F.startTimeUnixNano === "number") Y.startTimeUnixNano = I.longs === String ? String(F.startTimeUnixNano) : F.startTimeUnixNano;
                                else Y.startTimeUnixNano = I.longs === String ? K1.Long.prototype.toString.call(F.startTimeUnixNano) : I.longs === Number ? new K1.LongBits(F.startTimeUnixNano.low >>> 0, F.startTimeUnixNano.high >>> 0).toNumber() : F.startTimeUnixNano;
                            if (F.endTimeUnixNano != null && F.hasOwnProperty("endTimeUnixNano"))
                                if (typeof F.endTimeUnixNano === "number") Y.endTimeUnixNano = I.longs === String ? String(F.endTimeUnixNano) : F.endTimeUnixNano;
                                else Y.endTimeUnixNano = I.longs === String ? K1.Long.prototype.toString.call(F.endTimeUnixNano) : I.longs === Number ? new K1.LongBits(F.endTimeUnixNano.low >>> 0, F.endTimeUnixNano.high >>> 0).toNumber() : F.endTimeUnixNano;
                            if (F.attributes && F.attributes.length) {
                                Y.attributes = [];
                                for (var J = 0; J < F.attributes.length; ++J) Y.attributes[J] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(F.attributes[J], I)
                            }
                            if (F.droppedAttributesCount != null && F.hasOwnProperty("droppedAttributesCount")) Y.droppedAttributesCount = F.droppedAttributesCount;
                            if (F.events && F.events.length) {
                                Y.events = [];
                                for (var J = 0; J < F.events.length; ++J) Y.events[J] = J1.opentelemetry.proto.trace.v1.Span.Event.toObject(F.events[J], I)
                            }
                            if (F.droppedEventsCount != null && F.hasOwnProperty("droppedEventsCount")) Y.droppedEventsCount = F.droppedEventsCount;
                            if (F.links && F.links.length) {
                                Y.links = [];
                                for (var J = 0; J < F.links.length; ++J) Y.links[J] = J1.opentelemetry.proto.trace.v1.Span.Link.toObject(F.links[J], I)
                            }
                            if (F.droppedLinksCount != null && F.hasOwnProperty("droppedLinksCount")) Y.droppedLinksCount = F.droppedLinksCount;
                            if (F.status != null && F.hasOwnProperty("status")) Y.status = J1.opentelemetry.proto.trace.v1.Status.toObject(F.status, I);
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.trace.v1.Span"
                        }, D.SpanKind = function() {
                            var G = {},
                                F = Object.create(G);
                            return F[G[0] = "SPAN_KIND_UNSPECIFIED"] = 0, F[G[1] = "SPAN_KIND_INTERNAL"] = 1, F[G[2] = "SPAN_KIND_SERVER"] = 2, F[G[3] = "SPAN_KIND_CLIENT"] = 3, F[G[4] = "SPAN_KIND_PRODUCER"] = 4, F[G[5] = "SPAN_KIND_CONSUMER"] = 5, F
                        }(), D.Event = function() {
                            function G(F) {
                                if (this.attributes = [], F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.timeUnixNano = null, G.prototype.name = null, G.prototype.attributes = K1.emptyArray, G.prototype.droppedAttributesCount = null, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.timeUnixNano != null && Object.hasOwnProperty.call(I, "timeUnixNano")) Y.uint32(9).fixed64(I.timeUnixNano);
                                if (I.name != null && Object.hasOwnProperty.call(I, "name")) Y.uint32(18).string(I.name);
                                if (I.attributes != null && I.attributes.length)
                                    for (var W = 0; W < I.attributes.length; ++W) J1.opentelemetry.proto.common.v1.KeyValue.encode(I.attributes[W], Y.uint32(26).fork()).ldelim();
                                if (I.droppedAttributesCount != null && Object.hasOwnProperty.call(I, "droppedAttributesCount")) Y.uint32(32).uint32(I.droppedAttributesCount);
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.trace.v1.Span.Event;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            J.timeUnixNano = I.fixed64();
                                            break
                                        }
                                        case 2: {
                                            J.name = I.string();
                                            break
                                        }
                                        case 3: {
                                            if (!(J.attributes && J.attributes.length)) J.attributes = [];
                                            J.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(I, I.uint32()));
                                            break
                                        }
                                        case 4: {
                                            J.droppedAttributesCount = I.uint32();
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano")) {
                                    if (!K1.isInteger(I.timeUnixNano) && !(I.timeUnixNano && K1.isInteger(I.timeUnixNano.low) && K1.isInteger(I.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
                                }
                                if (I.name != null && I.hasOwnProperty("name")) {
                                    if (!K1.isString(I.name)) return "name: string expected"
                                }
                                if (I.attributes != null && I.hasOwnProperty("attributes")) {
                                    if (!Array.isArray(I.attributes)) return "attributes: array expected";
                                    for (var Y = 0; Y < I.attributes.length; ++Y) {
                                        var W = J1.opentelemetry.proto.common.v1.KeyValue.verify(I.attributes[Y]);
                                        if (W) return "attributes." + W
                                    }
                                }
                                if (I.droppedAttributesCount != null && I.hasOwnProperty("droppedAttributesCount")) {
                                    if (!K1.isInteger(I.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.trace.v1.Span.Event) return I;
                                var Y = new J1.opentelemetry.proto.trace.v1.Span.Event;
                                if (I.timeUnixNano != null) {
                                    if (K1.Long)(Y.timeUnixNano = K1.Long.fromValue(I.timeUnixNano)).unsigned = !1;
                                    else if (typeof I.timeUnixNano === "string") Y.timeUnixNano = parseInt(I.timeUnixNano, 10);
                                    else if (typeof I.timeUnixNano === "number") Y.timeUnixNano = I.timeUnixNano;
                                    else if (typeof I.timeUnixNano === "object") Y.timeUnixNano = new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber()
                                }
                                if (I.name != null) Y.name = String(I.name);
                                if (I.attributes) {
                                    if (!Array.isArray(I.attributes)) throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: array expected");
                                    Y.attributes = [];
                                    for (var W = 0; W < I.attributes.length; ++W) {
                                        if (typeof I.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: object expected");
                                        Y.attributes[W] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(I.attributes[W])
                                    }
                                }
                                if (I.droppedAttributesCount != null) Y.droppedAttributesCount = I.droppedAttributesCount >>> 0;
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.arrays || Y.defaults) W.attributes = [];
                                if (Y.defaults) {
                                    if (K1.Long) {
                                        var J = new K1.Long(0, 0, !1);
                                        W.timeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                    } else W.timeUnixNano = Y.longs === String ? "0" : 0;
                                    W.name = "", W.droppedAttributesCount = 0
                                }
                                if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano"))
                                    if (typeof I.timeUnixNano === "number") W.timeUnixNano = Y.longs === String ? String(I.timeUnixNano) : I.timeUnixNano;
                                    else W.timeUnixNano = Y.longs === String ? K1.Long.prototype.toString.call(I.timeUnixNano) : Y.longs === Number ? new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber() : I.timeUnixNano;
                                if (I.name != null && I.hasOwnProperty("name")) W.name = I.name;
                                if (I.attributes && I.attributes.length) {
                                    W.attributes = [];
                                    for (var X = 0; X < I.attributes.length; ++X) W.attributes[X] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(I.attributes[X], Y)
                                }
                                if (I.droppedAttributesCount != null && I.hasOwnProperty("droppedAttributesCount")) W.droppedAttributesCount = I.droppedAttributesCount;
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.trace.v1.Span.Event"
                            }, G
                        }(), D.Link = function() {
                            function G(F) {
                                if (this.attributes = [], F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.traceId = null, G.prototype.spanId = null, G.prototype.traceState = null, G.prototype.attributes = K1.emptyArray, G.prototype.droppedAttributesCount = null, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.traceId != null && Object.hasOwnProperty.call(I, "traceId")) Y.uint32(10).bytes(I.traceId);
                                if (I.spanId != null && Object.hasOwnProperty.call(I, "spanId")) Y.uint32(18).bytes(I.spanId);
                                if (I.traceState != null && Object.hasOwnProperty.call(I, "traceState")) Y.uint32(26).string(I.traceState);
                                if (I.attributes != null && I.attributes.length)
                                    for (var W = 0; W < I.attributes.length; ++W) J1.opentelemetry.proto.common.v1.KeyValue.encode(I.attributes[W], Y.uint32(34).fork()).ldelim();
                                if (I.droppedAttributesCount != null && Object.hasOwnProperty.call(I, "droppedAttributesCount")) Y.uint32(40).uint32(I.droppedAttributesCount);
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.trace.v1.Span.Link;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            J.traceId = I.bytes();
                                            break
                                        }
                                        case 2: {
                                            J.spanId = I.bytes();
                                            break
                                        }
                                        case 3: {
                                            J.traceState = I.string();
                                            break
                                        }
                                        case 4: {
                                            if (!(J.attributes && J.attributes.length)) J.attributes = [];
                                            J.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(I, I.uint32()));
                                            break
                                        }
                                        case 5: {
                                            J.droppedAttributesCount = I.uint32();
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.traceId != null && I.hasOwnProperty("traceId")) {
                                    if (!(I.traceId && typeof I.traceId.length === "number" || K1.isString(I.traceId))) return "traceId: buffer expected"
                                }
                                if (I.spanId != null && I.hasOwnProperty("spanId")) {
                                    if (!(I.spanId && typeof I.spanId.length === "number" || K1.isString(I.spanId))) return "spanId: buffer expected"
                                }
                                if (I.traceState != null && I.hasOwnProperty("traceState")) {
                                    if (!K1.isString(I.traceState)) return "traceState: string expected"
                                }
                                if (I.attributes != null && I.hasOwnProperty("attributes")) {
                                    if (!Array.isArray(I.attributes)) return "attributes: array expected";
                                    for (var Y = 0; Y < I.attributes.length; ++Y) {
                                        var W = J1.opentelemetry.proto.common.v1.KeyValue.verify(I.attributes[Y]);
                                        if (W) return "attributes." + W
                                    }
                                }
                                if (I.droppedAttributesCount != null && I.hasOwnProperty("droppedAttributesCount")) {
                                    if (!K1.isInteger(I.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.trace.v1.Span.Link) return I;
                                var Y = new J1.opentelemetry.proto.trace.v1.Span.Link;
                                if (I.traceId != null) {
                                    if (typeof I.traceId === "string") K1.base64.decode(I.traceId, Y.traceId = K1.newBuffer(K1.base64.length(I.traceId)), 0);
                                    else if (I.traceId.length >= 0) Y.traceId = I.traceId
                                }
                                if (I.spanId != null) {
                                    if (typeof I.spanId === "string") K1.base64.decode(I.spanId, Y.spanId = K1.newBuffer(K1.base64.length(I.spanId)), 0);
                                    else if (I.spanId.length >= 0) Y.spanId = I.spanId
                                }
                                if (I.traceState != null) Y.traceState = String(I.traceState);
                                if (I.attributes) {
                                    if (!Array.isArray(I.attributes)) throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: array expected");
                                    Y.attributes = [];
                                    for (var W = 0; W < I.attributes.length; ++W) {
                                        if (typeof I.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: object expected");
                                        Y.attributes[W] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(I.attributes[W])
                                    }
                                }
                                if (I.droppedAttributesCount != null) Y.droppedAttributesCount = I.droppedAttributesCount >>> 0;
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.arrays || Y.defaults) W.attributes = [];
                                if (Y.defaults) {
                                    if (Y.bytes === String) W.traceId = "";
                                    else if (W.traceId = [], Y.bytes !== Array) W.traceId = K1.newBuffer(W.traceId);
                                    if (Y.bytes === String) W.spanId = "";
                                    else if (W.spanId = [], Y.bytes !== Array) W.spanId = K1.newBuffer(W.spanId);
                                    W.traceState = "", W.droppedAttributesCount = 0
                                }
                                if (I.traceId != null && I.hasOwnProperty("traceId")) W.traceId = Y.bytes === String ? K1.base64.encode(I.traceId, 0, I.traceId.length) : Y.bytes === Array ? Array.prototype.slice.call(I.traceId) : I.traceId;
                                if (I.spanId != null && I.hasOwnProperty("spanId")) W.spanId = Y.bytes === String ? K1.base64.encode(I.spanId, 0, I.spanId.length) : Y.bytes === Array ? Array.prototype.slice.call(I.spanId) : I.spanId;
                                if (I.traceState != null && I.hasOwnProperty("traceState")) W.traceState = I.traceState;
                                if (I.attributes && I.attributes.length) {
                                    W.attributes = [];
                                    for (var J = 0; J < I.attributes.length; ++J) W.attributes[J] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(I.attributes[J], Y)
                                }
                                if (I.droppedAttributesCount != null && I.hasOwnProperty("droppedAttributesCount")) W.droppedAttributesCount = I.droppedAttributesCount;
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.trace.v1.Span.Link"
                            }, G
                        }(), D
                    }(), Z.Status = function() {
                        function D(G) {
                            if (G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.message = null, D.prototype.code = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.message != null && Object.hasOwnProperty.call(F, "message")) I.uint32(18).string(F.message);
                            if (F.code != null && Object.hasOwnProperty.call(F, "code")) I.uint32(24).int32(F.code);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.trace.v1.Status;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 2: {
                                        W.message = F.string();
                                        break
                                    }
                                    case 3: {
                                        W.code = F.int32();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.message != null && F.hasOwnProperty("message")) {
                                if (!K1.isString(F.message)) return "message: string expected"
                            }
                            if (F.code != null && F.hasOwnProperty("code")) switch (F.code) {
                                default:
                                    return "code: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.trace.v1.Status) return F;
                            var I = new J1.opentelemetry.proto.trace.v1.Status;
                            if (F.message != null) I.message = String(F.message);
                            switch (F.code) {
                                default:
                                    if (typeof F.code === "number") {
                                        I.code = F.code;
                                        break
                                    }
                                    break;
                                case "STATUS_CODE_UNSET":
                                case 0:
                                    I.code = 0;
                                    break;
                                case "STATUS_CODE_OK":
                                case 1:
                                    I.code = 1;
                                    break;
                                case "STATUS_CODE_ERROR":
                                case 2:
                                    I.code = 2;
                                    break
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.defaults) Y.message = "", Y.code = I.enums === String ? "STATUS_CODE_UNSET" : 0;
                            if (F.message != null && F.hasOwnProperty("message")) Y.message = F.message;
                            if (F.code != null && F.hasOwnProperty("code")) Y.code = I.enums === String ? J1.opentelemetry.proto.trace.v1.Status.StatusCode[F.code] === void 0 ? F.code : J1.opentelemetry.proto.trace.v1.Status.StatusCode[F.code] : F.code;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.trace.v1.Status"
                        }, D.StatusCode = function() {
                            var G = {},
                                F = Object.create(G);
                            return F[G[0] = "STATUS_CODE_UNSET"] = 0, F[G[1] = "STATUS_CODE_OK"] = 1, F[G[2] = "STATUS_CODE_ERROR"] = 2, F
                        }(), D
                    }(), Z
                }(), Q
            }(), B.collector = function() {
                var Q = {};
                return Q.trace = function() {
                    var Z = {};
                    return Z.v1 = function() {
                        var D = {};
                        return D.TraceService = function() {
                            function G(F, I, Y) {
                                i9.rpc.Service.call(this, F, I, Y)
                            }
                            return (G.prototype = Object.create(i9.rpc.Service.prototype)).constructor = G, G.create = function F(I, Y, W) {
                                return new this(I, Y, W)
                            }, Object.defineProperty(G.prototype.export = function F(I, Y) {
                                return this.rpcCall(F, J1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest, J1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse, I, Y)
                            }, "name", {
                                value: "Export"
                            }), G
                        }(), D.ExportTraceServiceRequest = function() {
                            function G(F) {
                                if (this.resourceSpans = [], F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.resourceSpans = K1.emptyArray, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.resourceSpans != null && I.resourceSpans.length)
                                    for (var W = 0; W < I.resourceSpans.length; ++W) J1.opentelemetry.proto.trace.v1.ResourceSpans.encode(I.resourceSpans[W], Y.uint32(10).fork()).ldelim();
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            if (!(J.resourceSpans && J.resourceSpans.length)) J.resourceSpans = [];
                                            J.resourceSpans.push(J1.opentelemetry.proto.trace.v1.ResourceSpans.decode(I, I.uint32()));
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.resourceSpans != null && I.hasOwnProperty("resourceSpans")) {
                                    if (!Array.isArray(I.resourceSpans)) return "resourceSpans: array expected";
                                    for (var Y = 0; Y < I.resourceSpans.length; ++Y) {
                                        var W = J1.opentelemetry.proto.trace.v1.ResourceSpans.verify(I.resourceSpans[Y]);
                                        if (W) return "resourceSpans." + W
                                    }
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest) return I;
                                var Y = new J1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
                                if (I.resourceSpans) {
                                    if (!Array.isArray(I.resourceSpans)) throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: array expected");
                                    Y.resourceSpans = [];
                                    for (var W = 0; W < I.resourceSpans.length; ++W) {
                                        if (typeof I.resourceSpans[W] !== "object") throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: object expected");
                                        Y.resourceSpans[W] = J1.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(I.resourceSpans[W])
                                    }
                                }
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.arrays || Y.defaults) W.resourceSpans = [];
                                if (I.resourceSpans && I.resourceSpans.length) {
                                    W.resourceSpans = [];
                                    for (var J = 0; J < I.resourceSpans.length; ++J) W.resourceSpans[J] = J1.opentelemetry.proto.trace.v1.ResourceSpans.toObject(I.resourceSpans[J], Y)
                                }
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest"
                            }, G
                        }(), D.ExportTraceServiceResponse = function() {
                            function G(F) {
                                if (F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.partialSuccess = null, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.partialSuccess != null && Object.hasOwnProperty.call(I, "partialSuccess")) J1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.encode(I.partialSuccess, Y.uint32(10).fork()).ldelim();
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            J.partialSuccess = J1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.decode(I, I.uint32());
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.partialSuccess != null && I.hasOwnProperty("partialSuccess")) {
                                    var Y = J1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.verify(I.partialSuccess);
                                    if (Y) return "partialSuccess." + Y
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse) return I;
                                var Y = new J1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse;
                                if (I.partialSuccess != null) {
                                    if (typeof I.partialSuccess !== "object") throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse.partialSuccess: object expected");
                                    Y.partialSuccess = J1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.fromObject(I.partialSuccess)
                                }
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.defaults) W.partialSuccess = null;
                                if (I.partialSuccess != null && I.hasOwnProperty("partialSuccess")) W.partialSuccess = J1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.toObject(I.partialSuccess, Y);
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse"
                            }, G
                        }(), D.ExportTracePartialSuccess = function() {
                            function G(F) {
                                if (F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.rejectedSpans = null, G.prototype.errorMessage = null, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.rejectedSpans != null && Object.hasOwnProperty.call(I, "rejectedSpans")) Y.uint32(8).int64(I.rejectedSpans);
                                if (I.errorMessage != null && Object.hasOwnProperty.call(I, "errorMessage")) Y.uint32(18).string(I.errorMessage);
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            J.rejectedSpans = I.int64();
                                            break
                                        }
                                        case 2: {
                                            J.errorMessage = I.string();
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.rejectedSpans != null && I.hasOwnProperty("rejectedSpans")) {
                                    if (!K1.isInteger(I.rejectedSpans) && !(I.rejectedSpans && K1.isInteger(I.rejectedSpans.low) && K1.isInteger(I.rejectedSpans.high))) return "rejectedSpans: integer|Long expected"
                                }
                                if (I.errorMessage != null && I.hasOwnProperty("errorMessage")) {
                                    if (!K1.isString(I.errorMessage)) return "errorMessage: string expected"
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess) return I;
                                var Y = new J1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess;
                                if (I.rejectedSpans != null) {
                                    if (K1.Long)(Y.rejectedSpans = K1.Long.fromValue(I.rejectedSpans)).unsigned = !1;
                                    else if (typeof I.rejectedSpans === "string") Y.rejectedSpans = parseInt(I.rejectedSpans, 10);
                                    else if (typeof I.rejectedSpans === "number") Y.rejectedSpans = I.rejectedSpans;
                                    else if (typeof I.rejectedSpans === "object") Y.rejectedSpans = new K1.LongBits(I.rejectedSpans.low >>> 0, I.rejectedSpans.high >>> 0).toNumber()
                                }
                                if (I.errorMessage != null) Y.errorMessage = String(I.errorMessage);
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.defaults) {
                                    if (K1.Long) {
                                        var J = new K1.Long(0, 0, !1);
                                        W.rejectedSpans = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                    } else W.rejectedSpans = Y.longs === String ? "0" : 0;
                                    W.errorMessage = ""
                                }
                                if (I.rejectedSpans != null && I.hasOwnProperty("rejectedSpans"))
                                    if (typeof I.rejectedSpans === "number") W.rejectedSpans = Y.longs === String ? String(I.rejectedSpans) : I.rejectedSpans;
                                    else W.rejectedSpans = Y.longs === String ? K1.Long.prototype.toString.call(I.rejectedSpans) : Y.longs === Number ? new K1.LongBits(I.rejectedSpans.low >>> 0, I.rejectedSpans.high >>> 0).toNumber() : I.rejectedSpans;
                                if (I.errorMessage != null && I.hasOwnProperty("errorMessage")) W.errorMessage = I.errorMessage;
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess"
                            }, G
                        }(), D
                    }(), Z
                }(), Q.metrics = function() {
                    var Z = {};
                    return Z.v1 = function() {
                        var D = {};
                        return D.MetricsService = function() {
                            function G(F, I, Y) {
                                i9.rpc.Service.call(this, F, I, Y)
                            }
                            return (G.prototype = Object.create(i9.rpc.Service.prototype)).constructor = G, G.create = function F(I, Y, W) {
                                return new this(I, Y, W)
                            }, Object.defineProperty(G.prototype.export = function F(I, Y) {
                                return this.rpcCall(F, J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest, J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse, I, Y)
                            }, "name", {
                                value: "Export"
                            }), G
                        }(), D.ExportMetricsServiceRequest = function() {
                            function G(F) {
                                if (this.resourceMetrics = [], F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.resourceMetrics = K1.emptyArray, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.resourceMetrics != null && I.resourceMetrics.length)
                                    for (var W = 0; W < I.resourceMetrics.length; ++W) J1.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(I.resourceMetrics[W], Y.uint32(10).fork()).ldelim();
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            if (!(J.resourceMetrics && J.resourceMetrics.length)) J.resourceMetrics = [];
                                            J.resourceMetrics.push(J1.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(I, I.uint32()));
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.resourceMetrics != null && I.hasOwnProperty("resourceMetrics")) {
                                    if (!Array.isArray(I.resourceMetrics)) return "resourceMetrics: array expected";
                                    for (var Y = 0; Y < I.resourceMetrics.length; ++Y) {
                                        var W = J1.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(I.resourceMetrics[Y]);
                                        if (W) return "resourceMetrics." + W
                                    }
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest) return I;
                                var Y = new J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
                                if (I.resourceMetrics) {
                                    if (!Array.isArray(I.resourceMetrics)) throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: array expected");
                                    Y.resourceMetrics = [];
                                    for (var W = 0; W < I.resourceMetrics.length; ++W) {
                                        if (typeof I.resourceMetrics[W] !== "object") throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: object expected");
                                        Y.resourceMetrics[W] = J1.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(I.resourceMetrics[W])
                                    }
                                }
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.arrays || Y.defaults) W.resourceMetrics = [];
                                if (I.resourceMetrics && I.resourceMetrics.length) {
                                    W.resourceMetrics = [];
                                    for (var J = 0; J < I.resourceMetrics.length; ++J) W.resourceMetrics[J] = J1.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(I.resourceMetrics[J], Y)
                                }
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest"
                            }, G
                        }(), D.ExportMetricsServiceResponse = function() {
                            function G(F) {
                                if (F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.partialSuccess = null, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.partialSuccess != null && Object.hasOwnProperty.call(I, "partialSuccess")) J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.encode(I.partialSuccess, Y.uint32(10).fork()).ldelim();
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            J.partialSuccess = J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.decode(I, I.uint32());
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.partialSuccess != null && I.hasOwnProperty("partialSuccess")) {
                                    var Y = J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.verify(I.partialSuccess);
                                    if (Y) return "partialSuccess." + Y
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse) return I;
                                var Y = new J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse;
                                if (I.partialSuccess != null) {
                                    if (typeof I.partialSuccess !== "object") throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse.partialSuccess: object expected");
                                    Y.partialSuccess = J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.fromObject(I.partialSuccess)
                                }
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.defaults) W.partialSuccess = null;
                                if (I.partialSuccess != null && I.hasOwnProperty("partialSuccess")) W.partialSuccess = J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.toObject(I.partialSuccess, Y);
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse"
                            }, G
                        }(), D.ExportMetricsPartialSuccess = function() {
                            function G(F) {
                                if (F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.rejectedDataPoints = null, G.prototype.errorMessage = null, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.rejectedDataPoints != null && Object.hasOwnProperty.call(I, "rejectedDataPoints")) Y.uint32(8).int64(I.rejectedDataPoints);
                                if (I.errorMessage != null && Object.hasOwnProperty.call(I, "errorMessage")) Y.uint32(18).string(I.errorMessage);
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            J.rejectedDataPoints = I.int64();
                                            break
                                        }
                                        case 2: {
                                            J.errorMessage = I.string();
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.rejectedDataPoints != null && I.hasOwnProperty("rejectedDataPoints")) {
                                    if (!K1.isInteger(I.rejectedDataPoints) && !(I.rejectedDataPoints && K1.isInteger(I.rejectedDataPoints.low) && K1.isInteger(I.rejectedDataPoints.high))) return "rejectedDataPoints: integer|Long expected"
                                }
                                if (I.errorMessage != null && I.hasOwnProperty("errorMessage")) {
                                    if (!K1.isString(I.errorMessage)) return "errorMessage: string expected"
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess) return I;
                                var Y = new J1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess;
                                if (I.rejectedDataPoints != null) {
                                    if (K1.Long)(Y.rejectedDataPoints = K1.Long.fromValue(I.rejectedDataPoints)).unsigned = !1;
                                    else if (typeof I.rejectedDataPoints === "string") Y.rejectedDataPoints = parseInt(I.rejectedDataPoints, 10);
                                    else if (typeof I.rejectedDataPoints === "number") Y.rejectedDataPoints = I.rejectedDataPoints;
                                    else if (typeof I.rejectedDataPoints === "object") Y.rejectedDataPoints = new K1.LongBits(I.rejectedDataPoints.low >>> 0, I.rejectedDataPoints.high >>> 0).toNumber()
                                }
                                if (I.errorMessage != null) Y.errorMessage = String(I.errorMessage);
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.defaults) {
                                    if (K1.Long) {
                                        var J = new K1.Long(0, 0, !1);
                                        W.rejectedDataPoints = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                    } else W.rejectedDataPoints = Y.longs === String ? "0" : 0;
                                    W.errorMessage = ""
                                }
                                if (I.rejectedDataPoints != null && I.hasOwnProperty("rejectedDataPoints"))
                                    if (typeof I.rejectedDataPoints === "number") W.rejectedDataPoints = Y.longs === String ? String(I.rejectedDataPoints) : I.rejectedDataPoints;
                                    else W.rejectedDataPoints = Y.longs === String ? K1.Long.prototype.toString.call(I.rejectedDataPoints) : Y.longs === Number ? new K1.LongBits(I.rejectedDataPoints.low >>> 0, I.rejectedDataPoints.high >>> 0).toNumber() : I.rejectedDataPoints;
                                if (I.errorMessage != null && I.hasOwnProperty("errorMessage")) W.errorMessage = I.errorMessage;
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess"
                            }, G
                        }(), D
                    }(), Z
                }(), Q.logs = function() {
                    var Z = {};
                    return Z.v1 = function() {
                        var D = {};
                        return D.LogsService = function() {
                            function G(F, I, Y) {
                                i9.rpc.Service.call(this, F, I, Y)
                            }
                            return (G.prototype = Object.create(i9.rpc.Service.prototype)).constructor = G, G.create = function F(I, Y, W) {
                                return new this(I, Y, W)
                            }, Object.defineProperty(G.prototype.export = function F(I, Y) {
                                return this.rpcCall(F, J1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest, J1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse, I, Y)
                            }, "name", {
                                value: "Export"
                            }), G
                        }(), D.ExportLogsServiceRequest = function() {
                            function G(F) {
                                if (this.resourceLogs = [], F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.resourceLogs = K1.emptyArray, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.resourceLogs != null && I.resourceLogs.length)
                                    for (var W = 0; W < I.resourceLogs.length; ++W) J1.opentelemetry.proto.logs.v1.ResourceLogs.encode(I.resourceLogs[W], Y.uint32(10).fork()).ldelim();
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            if (!(J.resourceLogs && J.resourceLogs.length)) J.resourceLogs = [];
                                            J.resourceLogs.push(J1.opentelemetry.proto.logs.v1.ResourceLogs.decode(I, I.uint32()));
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.resourceLogs != null && I.hasOwnProperty("resourceLogs")) {
                                    if (!Array.isArray(I.resourceLogs)) return "resourceLogs: array expected";
                                    for (var Y = 0; Y < I.resourceLogs.length; ++Y) {
                                        var W = J1.opentelemetry.proto.logs.v1.ResourceLogs.verify(I.resourceLogs[Y]);
                                        if (W) return "resourceLogs." + W
                                    }
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest) return I;
                                var Y = new J1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
                                if (I.resourceLogs) {
                                    if (!Array.isArray(I.resourceLogs)) throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: array expected");
                                    Y.resourceLogs = [];
                                    for (var W = 0; W < I.resourceLogs.length; ++W) {
                                        if (typeof I.resourceLogs[W] !== "object") throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: object expected");
                                        Y.resourceLogs[W] = J1.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(I.resourceLogs[W])
                                    }
                                }
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.arrays || Y.defaults) W.resourceLogs = [];
                                if (I.resourceLogs && I.resourceLogs.length) {
                                    W.resourceLogs = [];
                                    for (var J = 0; J < I.resourceLogs.length; ++J) W.resourceLogs[J] = J1.opentelemetry.proto.logs.v1.ResourceLogs.toObject(I.resourceLogs[J], Y)
                                }
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest"
                            }, G
                        }(), D.ExportLogsServiceResponse = function() {
                            function G(F) {
                                if (F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.partialSuccess = null, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.partialSuccess != null && Object.hasOwnProperty.call(I, "partialSuccess")) J1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.encode(I.partialSuccess, Y.uint32(10).fork()).ldelim();
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            J.partialSuccess = J1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.decode(I, I.uint32());
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.partialSuccess != null && I.hasOwnProperty("partialSuccess")) {
                                    var Y = J1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.verify(I.partialSuccess);
                                    if (Y) return "partialSuccess." + Y
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse) return I;
                                var Y = new J1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse;
                                if (I.partialSuccess != null) {
                                    if (typeof I.partialSuccess !== "object") throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse.partialSuccess: object expected");
                                    Y.partialSuccess = J1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.fromObject(I.partialSuccess)
                                }
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.defaults) W.partialSuccess = null;
                                if (I.partialSuccess != null && I.hasOwnProperty("partialSuccess")) W.partialSuccess = J1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.toObject(I.partialSuccess, Y);
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse"
                            }, G
                        }(), D.ExportLogsPartialSuccess = function() {
                            function G(F) {
                                if (F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.rejectedLogRecords = null, G.prototype.errorMessage = null, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.rejectedLogRecords != null && Object.hasOwnProperty.call(I, "rejectedLogRecords")) Y.uint32(8).int64(I.rejectedLogRecords);
                                if (I.errorMessage != null && Object.hasOwnProperty.call(I, "errorMessage")) Y.uint32(18).string(I.errorMessage);
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            J.rejectedLogRecords = I.int64();
                                            break
                                        }
                                        case 2: {
                                            J.errorMessage = I.string();
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.rejectedLogRecords != null && I.hasOwnProperty("rejectedLogRecords")) {
                                    if (!K1.isInteger(I.rejectedLogRecords) && !(I.rejectedLogRecords && K1.isInteger(I.rejectedLogRecords.low) && K1.isInteger(I.rejectedLogRecords.high))) return "rejectedLogRecords: integer|Long expected"
                                }
                                if (I.errorMessage != null && I.hasOwnProperty("errorMessage")) {
                                    if (!K1.isString(I.errorMessage)) return "errorMessage: string expected"
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess) return I;
                                var Y = new J1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess;
                                if (I.rejectedLogRecords != null) {
                                    if (K1.Long)(Y.rejectedLogRecords = K1.Long.fromValue(I.rejectedLogRecords)).unsigned = !1;
                                    else if (typeof I.rejectedLogRecords === "string") Y.rejectedLogRecords = parseInt(I.rejectedLogRecords, 10);
                                    else if (typeof I.rejectedLogRecords === "number") Y.rejectedLogRecords = I.rejectedLogRecords;
                                    else if (typeof I.rejectedLogRecords === "object") Y.rejectedLogRecords = new K1.LongBits(I.rejectedLogRecords.low >>> 0, I.rejectedLogRecords.high >>> 0).toNumber()
                                }
                                if (I.errorMessage != null) Y.errorMessage = String(I.errorMessage);
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.defaults) {
                                    if (K1.Long) {
                                        var J = new K1.Long(0, 0, !1);
                                        W.rejectedLogRecords = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                    } else W.rejectedLogRecords = Y.longs === String ? "0" : 0;
                                    W.errorMessage = ""
                                }
                                if (I.rejectedLogRecords != null && I.hasOwnProperty("rejectedLogRecords"))
                                    if (typeof I.rejectedLogRecords === "number") W.rejectedLogRecords = Y.longs === String ? String(I.rejectedLogRecords) : I.rejectedLogRecords;
                                    else W.rejectedLogRecords = Y.longs === String ? K1.Long.prototype.toString.call(I.rejectedLogRecords) : Y.longs === Number ? new K1.LongBits(I.rejectedLogRecords.low >>> 0, I.rejectedLogRecords.high >>> 0).toNumber() : I.rejectedLogRecords;
                                if (I.errorMessage != null && I.hasOwnProperty("errorMessage")) W.errorMessage = I.errorMessage;
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess"
                            }, G
                        }(), D
                    }(), Z
                }(), Q
            }(), B.metrics = function() {
                var Q = {};
                return Q.v1 = function() {
                    var Z = {};
                    return Z.MetricsData = function() {
                        function D(G) {
                            if (this.resourceMetrics = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.resourceMetrics = K1.emptyArray, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.resourceMetrics != null && F.resourceMetrics.length)
                                for (var Y = 0; Y < F.resourceMetrics.length; ++Y) J1.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(F.resourceMetrics[Y], I.uint32(10).fork()).ldelim();
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.metrics.v1.MetricsData;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.resourceMetrics && W.resourceMetrics.length)) W.resourceMetrics = [];
                                        W.resourceMetrics.push(J1.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(F, F.uint32()));
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.resourceMetrics != null && F.hasOwnProperty("resourceMetrics")) {
                                if (!Array.isArray(F.resourceMetrics)) return "resourceMetrics: array expected";
                                for (var I = 0; I < F.resourceMetrics.length; ++I) {
                                    var Y = J1.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(F.resourceMetrics[I]);
                                    if (Y) return "resourceMetrics." + Y
                                }
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.metrics.v1.MetricsData) return F;
                            var I = new J1.opentelemetry.proto.metrics.v1.MetricsData;
                            if (F.resourceMetrics) {
                                if (!Array.isArray(F.resourceMetrics)) throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: array expected");
                                I.resourceMetrics = [];
                                for (var Y = 0; Y < F.resourceMetrics.length; ++Y) {
                                    if (typeof F.resourceMetrics[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: object expected");
                                    I.resourceMetrics[Y] = J1.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(F.resourceMetrics[Y])
                                }
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.resourceMetrics = [];
                            if (F.resourceMetrics && F.resourceMetrics.length) {
                                Y.resourceMetrics = [];
                                for (var W = 0; W < F.resourceMetrics.length; ++W) Y.resourceMetrics[W] = J1.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(F.resourceMetrics[W], I)
                            }
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.metrics.v1.MetricsData"
                        }, D
                    }(), Z.ResourceMetrics = function() {
                        function D(G) {
                            if (this.scopeMetrics = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.resource = null, D.prototype.scopeMetrics = K1.emptyArray, D.prototype.schemaUrl = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.resource != null && Object.hasOwnProperty.call(F, "resource")) J1.opentelemetry.proto.resource.v1.Resource.encode(F.resource, I.uint32(10).fork()).ldelim();
                            if (F.scopeMetrics != null && F.scopeMetrics.length)
                                for (var Y = 0; Y < F.scopeMetrics.length; ++Y) J1.opentelemetry.proto.metrics.v1.ScopeMetrics.encode(F.scopeMetrics[Y], I.uint32(18).fork()).ldelim();
                            if (F.schemaUrl != null && Object.hasOwnProperty.call(F, "schemaUrl")) I.uint32(26).string(F.schemaUrl);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.metrics.v1.ResourceMetrics;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.resource = J1.opentelemetry.proto.resource.v1.Resource.decode(F, F.uint32());
                                        break
                                    }
                                    case 2: {
                                        if (!(W.scopeMetrics && W.scopeMetrics.length)) W.scopeMetrics = [];
                                        W.scopeMetrics.push(J1.opentelemetry.proto.metrics.v1.ScopeMetrics.decode(F, F.uint32()));
                                        break
                                    }
                                    case 3: {
                                        W.schemaUrl = F.string();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.resource != null && F.hasOwnProperty("resource")) {
                                var I = J1.opentelemetry.proto.resource.v1.Resource.verify(F.resource);
                                if (I) return "resource." + I
                            }
                            if (F.scopeMetrics != null && F.hasOwnProperty("scopeMetrics")) {
                                if (!Array.isArray(F.scopeMetrics)) return "scopeMetrics: array expected";
                                for (var Y = 0; Y < F.scopeMetrics.length; ++Y) {
                                    var I = J1.opentelemetry.proto.metrics.v1.ScopeMetrics.verify(F.scopeMetrics[Y]);
                                    if (I) return "scopeMetrics." + I
                                }
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) {
                                if (!K1.isString(F.schemaUrl)) return "schemaUrl: string expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.metrics.v1.ResourceMetrics) return F;
                            var I = new J1.opentelemetry.proto.metrics.v1.ResourceMetrics;
                            if (F.resource != null) {
                                if (typeof F.resource !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.resource: object expected");
                                I.resource = J1.opentelemetry.proto.resource.v1.Resource.fromObject(F.resource)
                            }
                            if (F.scopeMetrics) {
                                if (!Array.isArray(F.scopeMetrics)) throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: array expected");
                                I.scopeMetrics = [];
                                for (var Y = 0; Y < F.scopeMetrics.length; ++Y) {
                                    if (typeof F.scopeMetrics[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: object expected");
                                    I.scopeMetrics[Y] = J1.opentelemetry.proto.metrics.v1.ScopeMetrics.fromObject(F.scopeMetrics[Y])
                                }
                            }
                            if (F.schemaUrl != null) I.schemaUrl = String(F.schemaUrl);
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.scopeMetrics = [];
                            if (I.defaults) Y.resource = null, Y.schemaUrl = "";
                            if (F.resource != null && F.hasOwnProperty("resource")) Y.resource = J1.opentelemetry.proto.resource.v1.Resource.toObject(F.resource, I);
                            if (F.scopeMetrics && F.scopeMetrics.length) {
                                Y.scopeMetrics = [];
                                for (var W = 0; W < F.scopeMetrics.length; ++W) Y.scopeMetrics[W] = J1.opentelemetry.proto.metrics.v1.ScopeMetrics.toObject(F.scopeMetrics[W], I)
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) Y.schemaUrl = F.schemaUrl;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.metrics.v1.ResourceMetrics"
                        }, D
                    }(), Z.ScopeMetrics = function() {
                        function D(G) {
                            if (this.metrics = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.scope = null, D.prototype.metrics = K1.emptyArray, D.prototype.schemaUrl = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.scope != null && Object.hasOwnProperty.call(F, "scope")) J1.opentelemetry.proto.common.v1.InstrumentationScope.encode(F.scope, I.uint32(10).fork()).ldelim();
                            if (F.metrics != null && F.metrics.length)
                                for (var Y = 0; Y < F.metrics.length; ++Y) J1.opentelemetry.proto.metrics.v1.Metric.encode(F.metrics[Y], I.uint32(18).fork()).ldelim();
                            if (F.schemaUrl != null && Object.hasOwnProperty.call(F, "schemaUrl")) I.uint32(26).string(F.schemaUrl);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.metrics.v1.ScopeMetrics;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.scope = J1.opentelemetry.proto.common.v1.InstrumentationScope.decode(F, F.uint32());
                                        break
                                    }
                                    case 2: {
                                        if (!(W.metrics && W.metrics.length)) W.metrics = [];
                                        W.metrics.push(J1.opentelemetry.proto.metrics.v1.Metric.decode(F, F.uint32()));
                                        break
                                    }
                                    case 3: {
                                        W.schemaUrl = F.string();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.scope != null && F.hasOwnProperty("scope")) {
                                var I = J1.opentelemetry.proto.common.v1.InstrumentationScope.verify(F.scope);
                                if (I) return "scope." + I
                            }
                            if (F.metrics != null && F.hasOwnProperty("metrics")) {
                                if (!Array.isArray(F.metrics)) return "metrics: array expected";
                                for (var Y = 0; Y < F.metrics.length; ++Y) {
                                    var I = J1.opentelemetry.proto.metrics.v1.Metric.verify(F.metrics[Y]);
                                    if (I) return "metrics." + I
                                }
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) {
                                if (!K1.isString(F.schemaUrl)) return "schemaUrl: string expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.metrics.v1.ScopeMetrics) return F;
                            var I = new J1.opentelemetry.proto.metrics.v1.ScopeMetrics;
                            if (F.scope != null) {
                                if (typeof F.scope !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.scope: object expected");
                                I.scope = J1.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(F.scope)
                            }
                            if (F.metrics) {
                                if (!Array.isArray(F.metrics)) throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: array expected");
                                I.metrics = [];
                                for (var Y = 0; Y < F.metrics.length; ++Y) {
                                    if (typeof F.metrics[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: object expected");
                                    I.metrics[Y] = J1.opentelemetry.proto.metrics.v1.Metric.fromObject(F.metrics[Y])
                                }
                            }
                            if (F.schemaUrl != null) I.schemaUrl = String(F.schemaUrl);
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.metrics = [];
                            if (I.defaults) Y.scope = null, Y.schemaUrl = "";
                            if (F.scope != null && F.hasOwnProperty("scope")) Y.scope = J1.opentelemetry.proto.common.v1.InstrumentationScope.toObject(F.scope, I);
                            if (F.metrics && F.metrics.length) {
                                Y.metrics = [];
                                for (var W = 0; W < F.metrics.length; ++W) Y.metrics[W] = J1.opentelemetry.proto.metrics.v1.Metric.toObject(F.metrics[W], I)
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) Y.schemaUrl = F.schemaUrl;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.metrics.v1.ScopeMetrics"
                        }, D
                    }(), Z.Metric = function() {
                        function D(F) {
                            if (F) {
                                for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                    if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                            }
                        }
                        D.prototype.name = null, D.prototype.description = null, D.prototype.unit = null, D.prototype.gauge = null, D.prototype.sum = null, D.prototype.histogram = null, D.prototype.exponentialHistogram = null, D.prototype.summary = null;
                        var G;
                        return Object.defineProperty(D.prototype, "data", {
                            get: K1.oneOfGetter(G = ["gauge", "sum", "histogram", "exponentialHistogram", "summary"]),
                            set: K1.oneOfSetter(G)
                        }), D.create = function F(I) {
                            return new D(I)
                        }, D.encode = function F(I, Y) {
                            if (!Y) Y = J4.create();
                            if (I.name != null && Object.hasOwnProperty.call(I, "name")) Y.uint32(10).string(I.name);
                            if (I.description != null && Object.hasOwnProperty.call(I, "description")) Y.uint32(18).string(I.description);
                            if (I.unit != null && Object.hasOwnProperty.call(I, "unit")) Y.uint32(26).string(I.unit);
                            if (I.gauge != null && Object.hasOwnProperty.call(I, "gauge")) J1.opentelemetry.proto.metrics.v1.Gauge.encode(I.gauge, Y.uint32(42).fork()).ldelim();
                            if (I.sum != null && Object.hasOwnProperty.call(I, "sum")) J1.opentelemetry.proto.metrics.v1.Sum.encode(I.sum, Y.uint32(58).fork()).ldelim();
                            if (I.histogram != null && Object.hasOwnProperty.call(I, "histogram")) J1.opentelemetry.proto.metrics.v1.Histogram.encode(I.histogram, Y.uint32(74).fork()).ldelim();
                            if (I.exponentialHistogram != null && Object.hasOwnProperty.call(I, "exponentialHistogram")) J1.opentelemetry.proto.metrics.v1.ExponentialHistogram.encode(I.exponentialHistogram, Y.uint32(82).fork()).ldelim();
                            if (I.summary != null && Object.hasOwnProperty.call(I, "summary")) J1.opentelemetry.proto.metrics.v1.Summary.encode(I.summary, Y.uint32(90).fork()).ldelim();
                            return Y
                        }, D.encodeDelimited = function F(I, Y) {
                            return this.encode(I, Y).ldelim()
                        }, D.decode = function F(I, Y) {
                            if (!(I instanceof m0)) I = m0.create(I);
                            var W = Y === void 0 ? I.len : I.pos + Y,
                                J = new J1.opentelemetry.proto.metrics.v1.Metric;
                            while (I.pos < W) {
                                var X = I.uint32();
                                switch (X >>> 3) {
                                    case 1: {
                                        J.name = I.string();
                                        break
                                    }
                                    case 2: {
                                        J.description = I.string();
                                        break
                                    }
                                    case 3: {
                                        J.unit = I.string();
                                        break
                                    }
                                    case 5: {
                                        J.gauge = J1.opentelemetry.proto.metrics.v1.Gauge.decode(I, I.uint32());
                                        break
                                    }
                                    case 7: {
                                        J.sum = J1.opentelemetry.proto.metrics.v1.Sum.decode(I, I.uint32());
                                        break
                                    }
                                    case 9: {
                                        J.histogram = J1.opentelemetry.proto.metrics.v1.Histogram.decode(I, I.uint32());
                                        break
                                    }
                                    case 10: {
                                        J.exponentialHistogram = J1.opentelemetry.proto.metrics.v1.ExponentialHistogram.decode(I, I.uint32());
                                        break
                                    }
                                    case 11: {
                                        J.summary = J1.opentelemetry.proto.metrics.v1.Summary.decode(I, I.uint32());
                                        break
                                    }
                                    default:
                                        I.skipType(X & 7);
                                        break
                                }
                            }
                            return J
                        }, D.decodeDelimited = function F(I) {
                            if (!(I instanceof m0)) I = new m0(I);
                            return this.decode(I, I.uint32())
                        }, D.verify = function F(I) {
                            if (typeof I !== "object" || I === null) return "object expected";
                            var Y = {};
                            if (I.name != null && I.hasOwnProperty("name")) {
                                if (!K1.isString(I.name)) return "name: string expected"
                            }
                            if (I.description != null && I.hasOwnProperty("description")) {
                                if (!K1.isString(I.description)) return "description: string expected"
                            }
                            if (I.unit != null && I.hasOwnProperty("unit")) {
                                if (!K1.isString(I.unit)) return "unit: string expected"
                            }
                            if (I.gauge != null && I.hasOwnProperty("gauge")) {
                                Y.data = 1;
                                {
                                    var W = J1.opentelemetry.proto.metrics.v1.Gauge.verify(I.gauge);
                                    if (W) return "gauge." + W
                                }
                            }
                            if (I.sum != null && I.hasOwnProperty("sum")) {
                                if (Y.data === 1) return "data: multiple values";
                                Y.data = 1;
                                {
                                    var W = J1.opentelemetry.proto.metrics.v1.Sum.verify(I.sum);
                                    if (W) return "sum." + W
                                }
                            }
                            if (I.histogram != null && I.hasOwnProperty("histogram")) {
                                if (Y.data === 1) return "data: multiple values";
                                Y.data = 1;
                                {
                                    var W = J1.opentelemetry.proto.metrics.v1.Histogram.verify(I.histogram);
                                    if (W) return "histogram." + W
                                }
                            }
                            if (I.exponentialHistogram != null && I.hasOwnProperty("exponentialHistogram")) {
                                if (Y.data === 1) return "data: multiple values";
                                Y.data = 1;
                                {
                                    var W = J1.opentelemetry.proto.metrics.v1.ExponentialHistogram.verify(I.exponentialHistogram);
                                    if (W) return "exponentialHistogram." + W
                                }
                            }
                            if (I.summary != null && I.hasOwnProperty("summary")) {
                                if (Y.data === 1) return "data: multiple values";
                                Y.data = 1;
                                {
                                    var W = J1.opentelemetry.proto.metrics.v1.Summary.verify(I.summary);
                                    if (W) return "summary." + W
                                }
                            }
                            return null
                        }, D.fromObject = function F(I) {
                            if (I instanceof J1.opentelemetry.proto.metrics.v1.Metric) return I;
                            var Y = new J1.opentelemetry.proto.metrics.v1.Metric;
                            if (I.name != null) Y.name = String(I.name);
                            if (I.description != null) Y.description = String(I.description);
                            if (I.unit != null) Y.unit = String(I.unit);
                            if (I.gauge != null) {
                                if (typeof I.gauge !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.gauge: object expected");
                                Y.gauge = J1.opentelemetry.proto.metrics.v1.Gauge.fromObject(I.gauge)
                            }
                            if (I.sum != null) {
                                if (typeof I.sum !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.sum: object expected");
                                Y.sum = J1.opentelemetry.proto.metrics.v1.Sum.fromObject(I.sum)
                            }
                            if (I.histogram != null) {
                                if (typeof I.histogram !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.histogram: object expected");
                                Y.histogram = J1.opentelemetry.proto.metrics.v1.Histogram.fromObject(I.histogram)
                            }
                            if (I.exponentialHistogram != null) {
                                if (typeof I.exponentialHistogram !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.exponentialHistogram: object expected");
                                Y.exponentialHistogram = J1.opentelemetry.proto.metrics.v1.ExponentialHistogram.fromObject(I.exponentialHistogram)
                            }
                            if (I.summary != null) {
                                if (typeof I.summary !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.summary: object expected");
                                Y.summary = J1.opentelemetry.proto.metrics.v1.Summary.fromObject(I.summary)
                            }
                            return Y
                        }, D.toObject = function F(I, Y) {
                            if (!Y) Y = {};
                            var W = {};
                            if (Y.defaults) W.name = "", W.description = "", W.unit = "";
                            if (I.name != null && I.hasOwnProperty("name")) W.name = I.name;
                            if (I.description != null && I.hasOwnProperty("description")) W.description = I.description;
                            if (I.unit != null && I.hasOwnProperty("unit")) W.unit = I.unit;
                            if (I.gauge != null && I.hasOwnProperty("gauge")) {
                                if (W.gauge = J1.opentelemetry.proto.metrics.v1.Gauge.toObject(I.gauge, Y), Y.oneofs) W.data = "gauge"
                            }
                            if (I.sum != null && I.hasOwnProperty("sum")) {
                                if (W.sum = J1.opentelemetry.proto.metrics.v1.Sum.toObject(I.sum, Y), Y.oneofs) W.data = "sum"
                            }
                            if (I.histogram != null && I.hasOwnProperty("histogram")) {
                                if (W.histogram = J1.opentelemetry.proto.metrics.v1.Histogram.toObject(I.histogram, Y), Y.oneofs) W.data = "histogram"
                            }
                            if (I.exponentialHistogram != null && I.hasOwnProperty("exponentialHistogram")) {
                                if (W.exponentialHistogram = J1.opentelemetry.proto.metrics.v1.ExponentialHistogram.toObject(I.exponentialHistogram, Y), Y.oneofs) W.data = "exponentialHistogram"
                            }
                            if (I.summary != null && I.hasOwnProperty("summary")) {
                                if (W.summary = J1.opentelemetry.proto.metrics.v1.Summary.toObject(I.summary, Y), Y.oneofs) W.data = "summary"
                            }
                            return W
                        }, D.prototype.toJSON = function F() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function F(I) {
                            if (I === void 0) I = "type.googleapis.com";
                            return I + "/opentelemetry.proto.metrics.v1.Metric"
                        }, D
                    }(), Z.Gauge = function() {
                        function D(G) {
                            if (this.dataPoints = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.dataPoints = K1.emptyArray, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.dataPoints != null && F.dataPoints.length)
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) J1.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(F.dataPoints[Y], I.uint32(10).fork()).ldelim();
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.metrics.v1.Gauge;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.dataPoints && W.dataPoints.length)) W.dataPoints = [];
                                        W.dataPoints.push(J1.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(F, F.uint32()));
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.dataPoints != null && F.hasOwnProperty("dataPoints")) {
                                if (!Array.isArray(F.dataPoints)) return "dataPoints: array expected";
                                for (var I = 0; I < F.dataPoints.length; ++I) {
                                    var Y = J1.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(F.dataPoints[I]);
                                    if (Y) return "dataPoints." + Y
                                }
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.metrics.v1.Gauge) return F;
                            var I = new J1.opentelemetry.proto.metrics.v1.Gauge;
                            if (F.dataPoints) {
                                if (!Array.isArray(F.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: array expected");
                                I.dataPoints = [];
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) {
                                    if (typeof F.dataPoints[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: object expected");
                                    I.dataPoints[Y] = J1.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(F.dataPoints[Y])
                                }
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.dataPoints = [];
                            if (F.dataPoints && F.dataPoints.length) {
                                Y.dataPoints = [];
                                for (var W = 0; W < F.dataPoints.length; ++W) Y.dataPoints[W] = J1.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(F.dataPoints[W], I)
                            }
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.metrics.v1.Gauge"
                        }, D
                    }(), Z.Sum = function() {
                        function D(G) {
                            if (this.dataPoints = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.dataPoints = K1.emptyArray, D.prototype.aggregationTemporality = null, D.prototype.isMonotonic = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.dataPoints != null && F.dataPoints.length)
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) J1.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(F.dataPoints[Y], I.uint32(10).fork()).ldelim();
                            if (F.aggregationTemporality != null && Object.hasOwnProperty.call(F, "aggregationTemporality")) I.uint32(16).int32(F.aggregationTemporality);
                            if (F.isMonotonic != null && Object.hasOwnProperty.call(F, "isMonotonic")) I.uint32(24).bool(F.isMonotonic);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.metrics.v1.Sum;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.dataPoints && W.dataPoints.length)) W.dataPoints = [];
                                        W.dataPoints.push(J1.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(F, F.uint32()));
                                        break
                                    }
                                    case 2: {
                                        W.aggregationTemporality = F.int32();
                                        break
                                    }
                                    case 3: {
                                        W.isMonotonic = F.bool();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.dataPoints != null && F.hasOwnProperty("dataPoints")) {
                                if (!Array.isArray(F.dataPoints)) return "dataPoints: array expected";
                                for (var I = 0; I < F.dataPoints.length; ++I) {
                                    var Y = J1.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(F.dataPoints[I]);
                                    if (Y) return "dataPoints." + Y
                                }
                            }
                            if (F.aggregationTemporality != null && F.hasOwnProperty("aggregationTemporality")) switch (F.aggregationTemporality) {
                                default:
                                    return "aggregationTemporality: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break
                            }
                            if (F.isMonotonic != null && F.hasOwnProperty("isMonotonic")) {
                                if (typeof F.isMonotonic !== "boolean") return "isMonotonic: boolean expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.metrics.v1.Sum) return F;
                            var I = new J1.opentelemetry.proto.metrics.v1.Sum;
                            if (F.dataPoints) {
                                if (!Array.isArray(F.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: array expected");
                                I.dataPoints = [];
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) {
                                    if (typeof F.dataPoints[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: object expected");
                                    I.dataPoints[Y] = J1.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(F.dataPoints[Y])
                                }
                            }
                            switch (F.aggregationTemporality) {
                                default:
                                    if (typeof F.aggregationTemporality === "number") {
                                        I.aggregationTemporality = F.aggregationTemporality;
                                        break
                                    }
                                    break;
                                case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                                case 0:
                                    I.aggregationTemporality = 0;
                                    break;
                                case "AGGREGATION_TEMPORALITY_DELTA":
                                case 1:
                                    I.aggregationTemporality = 1;
                                    break;
                                case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                                case 2:
                                    I.aggregationTemporality = 2;
                                    break
                            }
                            if (F.isMonotonic != null) I.isMonotonic = Boolean(F.isMonotonic);
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.dataPoints = [];
                            if (I.defaults) Y.aggregationTemporality = I.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0, Y.isMonotonic = !1;
                            if (F.dataPoints && F.dataPoints.length) {
                                Y.dataPoints = [];
                                for (var W = 0; W < F.dataPoints.length; ++W) Y.dataPoints[W] = J1.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(F.dataPoints[W], I)
                            }
                            if (F.aggregationTemporality != null && F.hasOwnProperty("aggregationTemporality")) Y.aggregationTemporality = I.enums === String ? J1.opentelemetry.proto.metrics.v1.AggregationTemporality[F.aggregationTemporality] === void 0 ? F.aggregationTemporality : J1.opentelemetry.proto.metrics.v1.AggregationTemporality[F.aggregationTemporality] : F.aggregationTemporality;
                            if (F.isMonotonic != null && F.hasOwnProperty("isMonotonic")) Y.isMonotonic = F.isMonotonic;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.metrics.v1.Sum"
                        }, D
                    }(), Z.Histogram = function() {
                        function D(G) {
                            if (this.dataPoints = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.dataPoints = K1.emptyArray, D.prototype.aggregationTemporality = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.dataPoints != null && F.dataPoints.length)
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) J1.opentelemetry.proto.metrics.v1.HistogramDataPoint.encode(F.dataPoints[Y], I.uint32(10).fork()).ldelim();
                            if (F.aggregationTemporality != null && Object.hasOwnProperty.call(F, "aggregationTemporality")) I.uint32(16).int32(F.aggregationTemporality);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.metrics.v1.Histogram;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.dataPoints && W.dataPoints.length)) W.dataPoints = [];
                                        W.dataPoints.push(J1.opentelemetry.proto.metrics.v1.HistogramDataPoint.decode(F, F.uint32()));
                                        break
                                    }
                                    case 2: {
                                        W.aggregationTemporality = F.int32();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.dataPoints != null && F.hasOwnProperty("dataPoints")) {
                                if (!Array.isArray(F.dataPoints)) return "dataPoints: array expected";
                                for (var I = 0; I < F.dataPoints.length; ++I) {
                                    var Y = J1.opentelemetry.proto.metrics.v1.HistogramDataPoint.verify(F.dataPoints[I]);
                                    if (Y) return "dataPoints." + Y
                                }
                            }
                            if (F.aggregationTemporality != null && F.hasOwnProperty("aggregationTemporality")) switch (F.aggregationTemporality) {
                                default:
                                    return "aggregationTemporality: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.metrics.v1.Histogram) return F;
                            var I = new J1.opentelemetry.proto.metrics.v1.Histogram;
                            if (F.dataPoints) {
                                if (!Array.isArray(F.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: array expected");
                                I.dataPoints = [];
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) {
                                    if (typeof F.dataPoints[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: object expected");
                                    I.dataPoints[Y] = J1.opentelemetry.proto.metrics.v1.HistogramDataPoint.fromObject(F.dataPoints[Y])
                                }
                            }
                            switch (F.aggregationTemporality) {
                                default:
                                    if (typeof F.aggregationTemporality === "number") {
                                        I.aggregationTemporality = F.aggregationTemporality;
                                        break
                                    }
                                    break;
                                case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                                case 0:
                                    I.aggregationTemporality = 0;
                                    break;
                                case "AGGREGATION_TEMPORALITY_DELTA":
                                case 1:
                                    I.aggregationTemporality = 1;
                                    break;
                                case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                                case 2:
                                    I.aggregationTemporality = 2;
                                    break
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.dataPoints = [];
                            if (I.defaults) Y.aggregationTemporality = I.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                            if (F.dataPoints && F.dataPoints.length) {
                                Y.dataPoints = [];
                                for (var W = 0; W < F.dataPoints.length; ++W) Y.dataPoints[W] = J1.opentelemetry.proto.metrics.v1.HistogramDataPoint.toObject(F.dataPoints[W], I)
                            }
                            if (F.aggregationTemporality != null && F.hasOwnProperty("aggregationTemporality")) Y.aggregationTemporality = I.enums === String ? J1.opentelemetry.proto.metrics.v1.AggregationTemporality[F.aggregationTemporality] === void 0 ? F.aggregationTemporality : J1.opentelemetry.proto.metrics.v1.AggregationTemporality[F.aggregationTemporality] : F.aggregationTemporality;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.metrics.v1.Histogram"
                        }, D
                    }(), Z.ExponentialHistogram = function() {
                        function D(G) {
                            if (this.dataPoints = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.dataPoints = K1.emptyArray, D.prototype.aggregationTemporality = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.dataPoints != null && F.dataPoints.length)
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.encode(F.dataPoints[Y], I.uint32(10).fork()).ldelim();
                            if (F.aggregationTemporality != null && Object.hasOwnProperty.call(F, "aggregationTemporality")) I.uint32(16).int32(F.aggregationTemporality);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.metrics.v1.ExponentialHistogram;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.dataPoints && W.dataPoints.length)) W.dataPoints = [];
                                        W.dataPoints.push(J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.decode(F, F.uint32()));
                                        break
                                    }
                                    case 2: {
                                        W.aggregationTemporality = F.int32();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.dataPoints != null && F.hasOwnProperty("dataPoints")) {
                                if (!Array.isArray(F.dataPoints)) return "dataPoints: array expected";
                                for (var I = 0; I < F.dataPoints.length; ++I) {
                                    var Y = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.verify(F.dataPoints[I]);
                                    if (Y) return "dataPoints." + Y
                                }
                            }
                            if (F.aggregationTemporality != null && F.hasOwnProperty("aggregationTemporality")) switch (F.aggregationTemporality) {
                                default:
                                    return "aggregationTemporality: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.metrics.v1.ExponentialHistogram) return F;
                            var I = new J1.opentelemetry.proto.metrics.v1.ExponentialHistogram;
                            if (F.dataPoints) {
                                if (!Array.isArray(F.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: array expected");
                                I.dataPoints = [];
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) {
                                    if (typeof F.dataPoints[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: object expected");
                                    I.dataPoints[Y] = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.fromObject(F.dataPoints[Y])
                                }
                            }
                            switch (F.aggregationTemporality) {
                                default:
                                    if (typeof F.aggregationTemporality === "number") {
                                        I.aggregationTemporality = F.aggregationTemporality;
                                        break
                                    }
                                    break;
                                case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                                case 0:
                                    I.aggregationTemporality = 0;
                                    break;
                                case "AGGREGATION_TEMPORALITY_DELTA":
                                case 1:
                                    I.aggregationTemporality = 1;
                                    break;
                                case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                                case 2:
                                    I.aggregationTemporality = 2;
                                    break
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.dataPoints = [];
                            if (I.defaults) Y.aggregationTemporality = I.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                            if (F.dataPoints && F.dataPoints.length) {
                                Y.dataPoints = [];
                                for (var W = 0; W < F.dataPoints.length; ++W) Y.dataPoints[W] = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.toObject(F.dataPoints[W], I)
                            }
                            if (F.aggregationTemporality != null && F.hasOwnProperty("aggregationTemporality")) Y.aggregationTemporality = I.enums === String ? J1.opentelemetry.proto.metrics.v1.AggregationTemporality[F.aggregationTemporality] === void 0 ? F.aggregationTemporality : J1.opentelemetry.proto.metrics.v1.AggregationTemporality[F.aggregationTemporality] : F.aggregationTemporality;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.metrics.v1.ExponentialHistogram"
                        }, D
                    }(), Z.Summary = function() {
                        function D(G) {
                            if (this.dataPoints = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.dataPoints = K1.emptyArray, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.dataPoints != null && F.dataPoints.length)
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.encode(F.dataPoints[Y], I.uint32(10).fork()).ldelim();
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.metrics.v1.Summary;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.dataPoints && W.dataPoints.length)) W.dataPoints = [];
                                        W.dataPoints.push(J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.decode(F, F.uint32()));
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.dataPoints != null && F.hasOwnProperty("dataPoints")) {
                                if (!Array.isArray(F.dataPoints)) return "dataPoints: array expected";
                                for (var I = 0; I < F.dataPoints.length; ++I) {
                                    var Y = J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.verify(F.dataPoints[I]);
                                    if (Y) return "dataPoints." + Y
                                }
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.metrics.v1.Summary) return F;
                            var I = new J1.opentelemetry.proto.metrics.v1.Summary;
                            if (F.dataPoints) {
                                if (!Array.isArray(F.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: array expected");
                                I.dataPoints = [];
                                for (var Y = 0; Y < F.dataPoints.length; ++Y) {
                                    if (typeof F.dataPoints[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: object expected");
                                    I.dataPoints[Y] = J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.fromObject(F.dataPoints[Y])
                                }
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.dataPoints = [];
                            if (F.dataPoints && F.dataPoints.length) {
                                Y.dataPoints = [];
                                for (var W = 0; W < F.dataPoints.length; ++W) Y.dataPoints[W] = J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.toObject(F.dataPoints[W], I)
                            }
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.metrics.v1.Summary"
                        }, D
                    }(), Z.AggregationTemporality = function() {
                        var D = {},
                            G = Object.create(D);
                        return G[D[0] = "AGGREGATION_TEMPORALITY_UNSPECIFIED"] = 0, G[D[1] = "AGGREGATION_TEMPORALITY_DELTA"] = 1, G[D[2] = "AGGREGATION_TEMPORALITY_CUMULATIVE"] = 2, G
                    }(), Z.DataPointFlags = function() {
                        var D = {},
                            G = Object.create(D);
                        return G[D[0] = "DATA_POINT_FLAGS_DO_NOT_USE"] = 0, G[D[1] = "DATA_POINT_FLAGS_NO_RECORDED_VALUE_MASK"] = 1, G
                    }(), Z.NumberDataPoint = function() {
                        function D(F) {
                            if (this.attributes = [], this.exemplars = [], F) {
                                for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                    if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                            }
                        }
                        D.prototype.attributes = K1.emptyArray, D.prototype.startTimeUnixNano = null, D.prototype.timeUnixNano = null, D.prototype.asDouble = null, D.prototype.asInt = null, D.prototype.exemplars = K1.emptyArray, D.prototype.flags = null;
                        var G;
                        return Object.defineProperty(D.prototype, "value", {
                            get: K1.oneOfGetter(G = ["asDouble", "asInt"]),
                            set: K1.oneOfSetter(G)
                        }), D.create = function F(I) {
                            return new D(I)
                        }, D.encode = function F(I, Y) {
                            if (!Y) Y = J4.create();
                            if (I.startTimeUnixNano != null && Object.hasOwnProperty.call(I, "startTimeUnixNano")) Y.uint32(17).fixed64(I.startTimeUnixNano);
                            if (I.timeUnixNano != null && Object.hasOwnProperty.call(I, "timeUnixNano")) Y.uint32(25).fixed64(I.timeUnixNano);
                            if (I.asDouble != null && Object.hasOwnProperty.call(I, "asDouble")) Y.uint32(33).double(I.asDouble);
                            if (I.exemplars != null && I.exemplars.length)
                                for (var W = 0; W < I.exemplars.length; ++W) J1.opentelemetry.proto.metrics.v1.Exemplar.encode(I.exemplars[W], Y.uint32(42).fork()).ldelim();
                            if (I.asInt != null && Object.hasOwnProperty.call(I, "asInt")) Y.uint32(49).sfixed64(I.asInt);
                            if (I.attributes != null && I.attributes.length)
                                for (var W = 0; W < I.attributes.length; ++W) J1.opentelemetry.proto.common.v1.KeyValue.encode(I.attributes[W], Y.uint32(58).fork()).ldelim();
                            if (I.flags != null && Object.hasOwnProperty.call(I, "flags")) Y.uint32(64).uint32(I.flags);
                            return Y
                        }, D.encodeDelimited = function F(I, Y) {
                            return this.encode(I, Y).ldelim()
                        }, D.decode = function F(I, Y) {
                            if (!(I instanceof m0)) I = m0.create(I);
                            var W = Y === void 0 ? I.len : I.pos + Y,
                                J = new J1.opentelemetry.proto.metrics.v1.NumberDataPoint;
                            while (I.pos < W) {
                                var X = I.uint32();
                                switch (X >>> 3) {
                                    case 7: {
                                        if (!(J.attributes && J.attributes.length)) J.attributes = [];
                                        J.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(I, I.uint32()));
                                        break
                                    }
                                    case 2: {
                                        J.startTimeUnixNano = I.fixed64();
                                        break
                                    }
                                    case 3: {
                                        J.timeUnixNano = I.fixed64();
                                        break
                                    }
                                    case 4: {
                                        J.asDouble = I.double();
                                        break
                                    }
                                    case 6: {
                                        J.asInt = I.sfixed64();
                                        break
                                    }
                                    case 5: {
                                        if (!(J.exemplars && J.exemplars.length)) J.exemplars = [];
                                        J.exemplars.push(J1.opentelemetry.proto.metrics.v1.Exemplar.decode(I, I.uint32()));
                                        break
                                    }
                                    case 8: {
                                        J.flags = I.uint32();
                                        break
                                    }
                                    default:
                                        I.skipType(X & 7);
                                        break
                                }
                            }
                            return J
                        }, D.decodeDelimited = function F(I) {
                            if (!(I instanceof m0)) I = new m0(I);
                            return this.decode(I, I.uint32())
                        }, D.verify = function F(I) {
                            if (typeof I !== "object" || I === null) return "object expected";
                            var Y = {};
                            if (I.attributes != null && I.hasOwnProperty("attributes")) {
                                if (!Array.isArray(I.attributes)) return "attributes: array expected";
                                for (var W = 0; W < I.attributes.length; ++W) {
                                    var J = J1.opentelemetry.proto.common.v1.KeyValue.verify(I.attributes[W]);
                                    if (J) return "attributes." + J
                                }
                            }
                            if (I.startTimeUnixNano != null && I.hasOwnProperty("startTimeUnixNano")) {
                                if (!K1.isInteger(I.startTimeUnixNano) && !(I.startTimeUnixNano && K1.isInteger(I.startTimeUnixNano.low) && K1.isInteger(I.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
                            }
                            if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano")) {
                                if (!K1.isInteger(I.timeUnixNano) && !(I.timeUnixNano && K1.isInteger(I.timeUnixNano.low) && K1.isInteger(I.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
                            }
                            if (I.asDouble != null && I.hasOwnProperty("asDouble")) {
                                if (Y.value = 1, typeof I.asDouble !== "number") return "asDouble: number expected"
                            }
                            if (I.asInt != null && I.hasOwnProperty("asInt")) {
                                if (Y.value === 1) return "value: multiple values";
                                if (Y.value = 1, !K1.isInteger(I.asInt) && !(I.asInt && K1.isInteger(I.asInt.low) && K1.isInteger(I.asInt.high))) return "asInt: integer|Long expected"
                            }
                            if (I.exemplars != null && I.hasOwnProperty("exemplars")) {
                                if (!Array.isArray(I.exemplars)) return "exemplars: array expected";
                                for (var W = 0; W < I.exemplars.length; ++W) {
                                    var J = J1.opentelemetry.proto.metrics.v1.Exemplar.verify(I.exemplars[W]);
                                    if (J) return "exemplars." + J
                                }
                            }
                            if (I.flags != null && I.hasOwnProperty("flags")) {
                                if (!K1.isInteger(I.flags)) return "flags: integer expected"
                            }
                            return null
                        }, D.fromObject = function F(I) {
                            if (I instanceof J1.opentelemetry.proto.metrics.v1.NumberDataPoint) return I;
                            var Y = new J1.opentelemetry.proto.metrics.v1.NumberDataPoint;
                            if (I.attributes) {
                                if (!Array.isArray(I.attributes)) throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: array expected");
                                Y.attributes = [];
                                for (var W = 0; W < I.attributes.length; ++W) {
                                    if (typeof I.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: object expected");
                                    Y.attributes[W] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(I.attributes[W])
                                }
                            }
                            if (I.startTimeUnixNano != null) {
                                if (K1.Long)(Y.startTimeUnixNano = K1.Long.fromValue(I.startTimeUnixNano)).unsigned = !1;
                                else if (typeof I.startTimeUnixNano === "string") Y.startTimeUnixNano = parseInt(I.startTimeUnixNano, 10);
                                else if (typeof I.startTimeUnixNano === "number") Y.startTimeUnixNano = I.startTimeUnixNano;
                                else if (typeof I.startTimeUnixNano === "object") Y.startTimeUnixNano = new K1.LongBits(I.startTimeUnixNano.low >>> 0, I.startTimeUnixNano.high >>> 0).toNumber()
                            }
                            if (I.timeUnixNano != null) {
                                if (K1.Long)(Y.timeUnixNano = K1.Long.fromValue(I.timeUnixNano)).unsigned = !1;
                                else if (typeof I.timeUnixNano === "string") Y.timeUnixNano = parseInt(I.timeUnixNano, 10);
                                else if (typeof I.timeUnixNano === "number") Y.timeUnixNano = I.timeUnixNano;
                                else if (typeof I.timeUnixNano === "object") Y.timeUnixNano = new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber()
                            }
                            if (I.asDouble != null) Y.asDouble = Number(I.asDouble);
                            if (I.asInt != null) {
                                if (K1.Long)(Y.asInt = K1.Long.fromValue(I.asInt)).unsigned = !1;
                                else if (typeof I.asInt === "string") Y.asInt = parseInt(I.asInt, 10);
                                else if (typeof I.asInt === "number") Y.asInt = I.asInt;
                                else if (typeof I.asInt === "object") Y.asInt = new K1.LongBits(I.asInt.low >>> 0, I.asInt.high >>> 0).toNumber()
                            }
                            if (I.exemplars) {
                                if (!Array.isArray(I.exemplars)) throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: array expected");
                                Y.exemplars = [];
                                for (var W = 0; W < I.exemplars.length; ++W) {
                                    if (typeof I.exemplars[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: object expected");
                                    Y.exemplars[W] = J1.opentelemetry.proto.metrics.v1.Exemplar.fromObject(I.exemplars[W])
                                }
                            }
                            if (I.flags != null) Y.flags = I.flags >>> 0;
                            return Y
                        }, D.toObject = function F(I, Y) {
                            if (!Y) Y = {};
                            var W = {};
                            if (Y.arrays || Y.defaults) W.exemplars = [], W.attributes = [];
                            if (Y.defaults) {
                                if (K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.startTimeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.startTimeUnixNano = Y.longs === String ? "0" : 0;
                                if (K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.timeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.timeUnixNano = Y.longs === String ? "0" : 0;
                                W.flags = 0
                            }
                            if (I.startTimeUnixNano != null && I.hasOwnProperty("startTimeUnixNano"))
                                if (typeof I.startTimeUnixNano === "number") W.startTimeUnixNano = Y.longs === String ? String(I.startTimeUnixNano) : I.startTimeUnixNano;
                                else W.startTimeUnixNano = Y.longs === String ? K1.Long.prototype.toString.call(I.startTimeUnixNano) : Y.longs === Number ? new K1.LongBits(I.startTimeUnixNano.low >>> 0, I.startTimeUnixNano.high >>> 0).toNumber() : I.startTimeUnixNano;
                            if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano"))
                                if (typeof I.timeUnixNano === "number") W.timeUnixNano = Y.longs === String ? String(I.timeUnixNano) : I.timeUnixNano;
                                else W.timeUnixNano = Y.longs === String ? K1.Long.prototype.toString.call(I.timeUnixNano) : Y.longs === Number ? new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber() : I.timeUnixNano;
                            if (I.asDouble != null && I.hasOwnProperty("asDouble")) {
                                if (W.asDouble = Y.json && !isFinite(I.asDouble) ? String(I.asDouble) : I.asDouble, Y.oneofs) W.value = "asDouble"
                            }
                            if (I.exemplars && I.exemplars.length) {
                                W.exemplars = [];
                                for (var X = 0; X < I.exemplars.length; ++X) W.exemplars[X] = J1.opentelemetry.proto.metrics.v1.Exemplar.toObject(I.exemplars[X], Y)
                            }
                            if (I.asInt != null && I.hasOwnProperty("asInt")) {
                                if (typeof I.asInt === "number") W.asInt = Y.longs === String ? String(I.asInt) : I.asInt;
                                else W.asInt = Y.longs === String ? K1.Long.prototype.toString.call(I.asInt) : Y.longs === Number ? new K1.LongBits(I.asInt.low >>> 0, I.asInt.high >>> 0).toNumber() : I.asInt;
                                if (Y.oneofs) W.value = "asInt"
                            }
                            if (I.attributes && I.attributes.length) {
                                W.attributes = [];
                                for (var X = 0; X < I.attributes.length; ++X) W.attributes[X] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(I.attributes[X], Y)
                            }
                            if (I.flags != null && I.hasOwnProperty("flags")) W.flags = I.flags;
                            return W
                        }, D.prototype.toJSON = function F() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function F(I) {
                            if (I === void 0) I = "type.googleapis.com";
                            return I + "/opentelemetry.proto.metrics.v1.NumberDataPoint"
                        }, D
                    }(), Z.HistogramDataPoint = function() {
                        function D(F) {
                            if (this.attributes = [], this.bucketCounts = [], this.explicitBounds = [], this.exemplars = [], F) {
                                for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                    if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                            }
                        }
                        D.prototype.attributes = K1.emptyArray, D.prototype.startTimeUnixNano = null, D.prototype.timeUnixNano = null, D.prototype.count = null, D.prototype.sum = null, D.prototype.bucketCounts = K1.emptyArray, D.prototype.explicitBounds = K1.emptyArray, D.prototype.exemplars = K1.emptyArray, D.prototype.flags = null, D.prototype.min = null, D.prototype.max = null;
                        var G;
                        return Object.defineProperty(D.prototype, "_sum", {
                            get: K1.oneOfGetter(G = ["sum"]),
                            set: K1.oneOfSetter(G)
                        }), Object.defineProperty(D.prototype, "_min", {
                            get: K1.oneOfGetter(G = ["min"]),
                            set: K1.oneOfSetter(G)
                        }), Object.defineProperty(D.prototype, "_max", {
                            get: K1.oneOfGetter(G = ["max"]),
                            set: K1.oneOfSetter(G)
                        }), D.create = function F(I) {
                            return new D(I)
                        }, D.encode = function F(I, Y) {
                            if (!Y) Y = J4.create();
                            if (I.startTimeUnixNano != null && Object.hasOwnProperty.call(I, "startTimeUnixNano")) Y.uint32(17).fixed64(I.startTimeUnixNano);
                            if (I.timeUnixNano != null && Object.hasOwnProperty.call(I, "timeUnixNano")) Y.uint32(25).fixed64(I.timeUnixNano);
                            if (I.count != null && Object.hasOwnProperty.call(I, "count")) Y.uint32(33).fixed64(I.count);
                            if (I.sum != null && Object.hasOwnProperty.call(I, "sum")) Y.uint32(41).double(I.sum);
                            if (I.bucketCounts != null && I.bucketCounts.length) {
                                Y.uint32(50).fork();
                                for (var W = 0; W < I.bucketCounts.length; ++W) Y.fixed64(I.bucketCounts[W]);
                                Y.ldelim()
                            }
                            if (I.explicitBounds != null && I.explicitBounds.length) {
                                Y.uint32(58).fork();
                                for (var W = 0; W < I.explicitBounds.length; ++W) Y.double(I.explicitBounds[W]);
                                Y.ldelim()
                            }
                            if (I.exemplars != null && I.exemplars.length)
                                for (var W = 0; W < I.exemplars.length; ++W) J1.opentelemetry.proto.metrics.v1.Exemplar.encode(I.exemplars[W], Y.uint32(66).fork()).ldelim();
                            if (I.attributes != null && I.attributes.length)
                                for (var W = 0; W < I.attributes.length; ++W) J1.opentelemetry.proto.common.v1.KeyValue.encode(I.attributes[W], Y.uint32(74).fork()).ldelim();
                            if (I.flags != null && Object.hasOwnProperty.call(I, "flags")) Y.uint32(80).uint32(I.flags);
                            if (I.min != null && Object.hasOwnProperty.call(I, "min")) Y.uint32(89).double(I.min);
                            if (I.max != null && Object.hasOwnProperty.call(I, "max")) Y.uint32(97).double(I.max);
                            return Y
                        }, D.encodeDelimited = function F(I, Y) {
                            return this.encode(I, Y).ldelim()
                        }, D.decode = function F(I, Y) {
                            if (!(I instanceof m0)) I = m0.create(I);
                            var W = Y === void 0 ? I.len : I.pos + Y,
                                J = new J1.opentelemetry.proto.metrics.v1.HistogramDataPoint;
                            while (I.pos < W) {
                                var X = I.uint32();
                                switch (X >>> 3) {
                                    case 9: {
                                        if (!(J.attributes && J.attributes.length)) J.attributes = [];
                                        J.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(I, I.uint32()));
                                        break
                                    }
                                    case 2: {
                                        J.startTimeUnixNano = I.fixed64();
                                        break
                                    }
                                    case 3: {
                                        J.timeUnixNano = I.fixed64();
                                        break
                                    }
                                    case 4: {
                                        J.count = I.fixed64();
                                        break
                                    }
                                    case 5: {
                                        J.sum = I.double();
                                        break
                                    }
                                    case 6: {
                                        if (!(J.bucketCounts && J.bucketCounts.length)) J.bucketCounts = [];
                                        if ((X & 7) === 2) {
                                            var V = I.uint32() + I.pos;
                                            while (I.pos < V) J.bucketCounts.push(I.fixed64())
                                        } else J.bucketCounts.push(I.fixed64());
                                        break
                                    }
                                    case 7: {
                                        if (!(J.explicitBounds && J.explicitBounds.length)) J.explicitBounds = [];
                                        if ((X & 7) === 2) {
                                            var V = I.uint32() + I.pos;
                                            while (I.pos < V) J.explicitBounds.push(I.double())
                                        } else J.explicitBounds.push(I.double());
                                        break
                                    }
                                    case 8: {
                                        if (!(J.exemplars && J.exemplars.length)) J.exemplars = [];
                                        J.exemplars.push(J1.opentelemetry.proto.metrics.v1.Exemplar.decode(I, I.uint32()));
                                        break
                                    }
                                    case 10: {
                                        J.flags = I.uint32();
                                        break
                                    }
                                    case 11: {
                                        J.min = I.double();
                                        break
                                    }
                                    case 12: {
                                        J.max = I.double();
                                        break
                                    }
                                    default:
                                        I.skipType(X & 7);
                                        break
                                }
                            }
                            return J
                        }, D.decodeDelimited = function F(I) {
                            if (!(I instanceof m0)) I = new m0(I);
                            return this.decode(I, I.uint32())
                        }, D.verify = function F(I) {
                            if (typeof I !== "object" || I === null) return "object expected";
                            var Y = {};
                            if (I.attributes != null && I.hasOwnProperty("attributes")) {
                                if (!Array.isArray(I.attributes)) return "attributes: array expected";
                                for (var W = 0; W < I.attributes.length; ++W) {
                                    var J = J1.opentelemetry.proto.common.v1.KeyValue.verify(I.attributes[W]);
                                    if (J) return "attributes." + J
                                }
                            }
                            if (I.startTimeUnixNano != null && I.hasOwnProperty("startTimeUnixNano")) {
                                if (!K1.isInteger(I.startTimeUnixNano) && !(I.startTimeUnixNano && K1.isInteger(I.startTimeUnixNano.low) && K1.isInteger(I.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
                            }
                            if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano")) {
                                if (!K1.isInteger(I.timeUnixNano) && !(I.timeUnixNano && K1.isInteger(I.timeUnixNano.low) && K1.isInteger(I.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
                            }
                            if (I.count != null && I.hasOwnProperty("count")) {
                                if (!K1.isInteger(I.count) && !(I.count && K1.isInteger(I.count.low) && K1.isInteger(I.count.high))) return "count: integer|Long expected"
                            }
                            if (I.sum != null && I.hasOwnProperty("sum")) {
                                if (Y._sum = 1, typeof I.sum !== "number") return "sum: number expected"
                            }
                            if (I.bucketCounts != null && I.hasOwnProperty("bucketCounts")) {
                                if (!Array.isArray(I.bucketCounts)) return "bucketCounts: array expected";
                                for (var W = 0; W < I.bucketCounts.length; ++W)
                                    if (!K1.isInteger(I.bucketCounts[W]) && !(I.bucketCounts[W] && K1.isInteger(I.bucketCounts[W].low) && K1.isInteger(I.bucketCounts[W].high))) return "bucketCounts: integer|Long[] expected"
                            }
                            if (I.explicitBounds != null && I.hasOwnProperty("explicitBounds")) {
                                if (!Array.isArray(I.explicitBounds)) return "explicitBounds: array expected";
                                for (var W = 0; W < I.explicitBounds.length; ++W)
                                    if (typeof I.explicitBounds[W] !== "number") return "explicitBounds: number[] expected"
                            }
                            if (I.exemplars != null && I.hasOwnProperty("exemplars")) {
                                if (!Array.isArray(I.exemplars)) return "exemplars: array expected";
                                for (var W = 0; W < I.exemplars.length; ++W) {
                                    var J = J1.opentelemetry.proto.metrics.v1.Exemplar.verify(I.exemplars[W]);
                                    if (J) return "exemplars." + J
                                }
                            }
                            if (I.flags != null && I.hasOwnProperty("flags")) {
                                if (!K1.isInteger(I.flags)) return "flags: integer expected"
                            }
                            if (I.min != null && I.hasOwnProperty("min")) {
                                if (Y._min = 1, typeof I.min !== "number") return "min: number expected"
                            }
                            if (I.max != null && I.hasOwnProperty("max")) {
                                if (Y._max = 1, typeof I.max !== "number") return "max: number expected"
                            }
                            return null
                        }, D.fromObject = function F(I) {
                            if (I instanceof J1.opentelemetry.proto.metrics.v1.HistogramDataPoint) return I;
                            var Y = new J1.opentelemetry.proto.metrics.v1.HistogramDataPoint;
                            if (I.attributes) {
                                if (!Array.isArray(I.attributes)) throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: array expected");
                                Y.attributes = [];
                                for (var W = 0; W < I.attributes.length; ++W) {
                                    if (typeof I.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: object expected");
                                    Y.attributes[W] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(I.attributes[W])
                                }
                            }
                            if (I.startTimeUnixNano != null) {
                                if (K1.Long)(Y.startTimeUnixNano = K1.Long.fromValue(I.startTimeUnixNano)).unsigned = !1;
                                else if (typeof I.startTimeUnixNano === "string") Y.startTimeUnixNano = parseInt(I.startTimeUnixNano, 10);
                                else if (typeof I.startTimeUnixNano === "number") Y.startTimeUnixNano = I.startTimeUnixNano;
                                else if (typeof I.startTimeUnixNano === "object") Y.startTimeUnixNano = new K1.LongBits(I.startTimeUnixNano.low >>> 0, I.startTimeUnixNano.high >>> 0).toNumber()
                            }
                            if (I.timeUnixNano != null) {
                                if (K1.Long)(Y.timeUnixNano = K1.Long.fromValue(I.timeUnixNano)).unsigned = !1;
                                else if (typeof I.timeUnixNano === "string") Y.timeUnixNano = parseInt(I.timeUnixNano, 10);
                                else if (typeof I.timeUnixNano === "number") Y.timeUnixNano = I.timeUnixNano;
                                else if (typeof I.timeUnixNano === "object") Y.timeUnixNano = new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber()
                            }
                            if (I.count != null) {
                                if (K1.Long)(Y.count = K1.Long.fromValue(I.count)).unsigned = !1;
                                else if (typeof I.count === "string") Y.count = parseInt(I.count, 10);
                                else if (typeof I.count === "number") Y.count = I.count;
                                else if (typeof I.count === "object") Y.count = new K1.LongBits(I.count.low >>> 0, I.count.high >>> 0).toNumber()
                            }
                            if (I.sum != null) Y.sum = Number(I.sum);
                            if (I.bucketCounts) {
                                if (!Array.isArray(I.bucketCounts)) throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.bucketCounts: array expected");
                                Y.bucketCounts = [];
                                for (var W = 0; W < I.bucketCounts.length; ++W)
                                    if (K1.Long)(Y.bucketCounts[W] = K1.Long.fromValue(I.bucketCounts[W])).unsigned = !1;
                                    else if (typeof I.bucketCounts[W] === "string") Y.bucketCounts[W] = parseInt(I.bucketCounts[W], 10);
                                else if (typeof I.bucketCounts[W] === "number") Y.bucketCounts[W] = I.bucketCounts[W];
                                else if (typeof I.bucketCounts[W] === "object") Y.bucketCounts[W] = new K1.LongBits(I.bucketCounts[W].low >>> 0, I.bucketCounts[W].high >>> 0).toNumber()
                            }
                            if (I.explicitBounds) {
                                if (!Array.isArray(I.explicitBounds)) throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.explicitBounds: array expected");
                                Y.explicitBounds = [];
                                for (var W = 0; W < I.explicitBounds.length; ++W) Y.explicitBounds[W] = Number(I.explicitBounds[W])
                            }
                            if (I.exemplars) {
                                if (!Array.isArray(I.exemplars)) throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: array expected");
                                Y.exemplars = [];
                                for (var W = 0; W < I.exemplars.length; ++W) {
                                    if (typeof I.exemplars[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: object expected");
                                    Y.exemplars[W] = J1.opentelemetry.proto.metrics.v1.Exemplar.fromObject(I.exemplars[W])
                                }
                            }
                            if (I.flags != null) Y.flags = I.flags >>> 0;
                            if (I.min != null) Y.min = Number(I.min);
                            if (I.max != null) Y.max = Number(I.max);
                            return Y
                        }, D.toObject = function F(I, Y) {
                            if (!Y) Y = {};
                            var W = {};
                            if (Y.arrays || Y.defaults) W.bucketCounts = [], W.explicitBounds = [], W.exemplars = [], W.attributes = [];
                            if (Y.defaults) {
                                if (K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.startTimeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.startTimeUnixNano = Y.longs === String ? "0" : 0;
                                if (K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.timeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.timeUnixNano = Y.longs === String ? "0" : 0;
                                if (K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.count = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.count = Y.longs === String ? "0" : 0;
                                W.flags = 0
                            }
                            if (I.startTimeUnixNano != null && I.hasOwnProperty("startTimeUnixNano"))
                                if (typeof I.startTimeUnixNano === "number") W.startTimeUnixNano = Y.longs === String ? String(I.startTimeUnixNano) : I.startTimeUnixNano;
                                else W.startTimeUnixNano = Y.longs === String ? K1.Long.prototype.toString.call(I.startTimeUnixNano) : Y.longs === Number ? new K1.LongBits(I.startTimeUnixNano.low >>> 0, I.startTimeUnixNano.high >>> 0).toNumber() : I.startTimeUnixNano;
                            if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano"))
                                if (typeof I.timeUnixNano === "number") W.timeUnixNano = Y.longs === String ? String(I.timeUnixNano) : I.timeUnixNano;
                                else W.timeUnixNano = Y.longs === String ? K1.Long.prototype.toString.call(I.timeUnixNano) : Y.longs === Number ? new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber() : I.timeUnixNano;
                            if (I.count != null && I.hasOwnProperty("count"))
                                if (typeof I.count === "number") W.count = Y.longs === String ? String(I.count) : I.count;
                                else W.count = Y.longs === String ? K1.Long.prototype.toString.call(I.count) : Y.longs === Number ? new K1.LongBits(I.count.low >>> 0, I.count.high >>> 0).toNumber() : I.count;
                            if (I.sum != null && I.hasOwnProperty("sum")) {
                                if (W.sum = Y.json && !isFinite(I.sum) ? String(I.sum) : I.sum, Y.oneofs) W._sum = "sum"
                            }
                            if (I.bucketCounts && I.bucketCounts.length) {
                                W.bucketCounts = [];
                                for (var X = 0; X < I.bucketCounts.length; ++X)
                                    if (typeof I.bucketCounts[X] === "number") W.bucketCounts[X] = Y.longs === String ? String(I.bucketCounts[X]) : I.bucketCounts[X];
                                    else W.bucketCounts[X] = Y.longs === String ? K1.Long.prototype.toString.call(I.bucketCounts[X]) : Y.longs === Number ? new K1.LongBits(I.bucketCounts[X].low >>> 0, I.bucketCounts[X].high >>> 0).toNumber() : I.bucketCounts[X]
                            }
                            if (I.explicitBounds && I.explicitBounds.length) {
                                W.explicitBounds = [];
                                for (var X = 0; X < I.explicitBounds.length; ++X) W.explicitBounds[X] = Y.json && !isFinite(I.explicitBounds[X]) ? String(I.explicitBounds[X]) : I.explicitBounds[X]
                            }
                            if (I.exemplars && I.exemplars.length) {
                                W.exemplars = [];
                                for (var X = 0; X < I.exemplars.length; ++X) W.exemplars[X] = J1.opentelemetry.proto.metrics.v1.Exemplar.toObject(I.exemplars[X], Y)
                            }
                            if (I.attributes && I.attributes.length) {
                                W.attributes = [];
                                for (var X = 0; X < I.attributes.length; ++X) W.attributes[X] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(I.attributes[X], Y)
                            }
                            if (I.flags != null && I.hasOwnProperty("flags")) W.flags = I.flags;
                            if (I.min != null && I.hasOwnProperty("min")) {
                                if (W.min = Y.json && !isFinite(I.min) ? String(I.min) : I.min, Y.oneofs) W._min = "min"
                            }
                            if (I.max != null && I.hasOwnProperty("max")) {
                                if (W.max = Y.json && !isFinite(I.max) ? String(I.max) : I.max, Y.oneofs) W._max = "max"
                            }
                            return W
                        }, D.prototype.toJSON = function F() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function F(I) {
                            if (I === void 0) I = "type.googleapis.com";
                            return I + "/opentelemetry.proto.metrics.v1.HistogramDataPoint"
                        }, D
                    }(), Z.ExponentialHistogramDataPoint = function() {
                        function D(F) {
                            if (this.attributes = [], this.exemplars = [], F) {
                                for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                    if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                            }
                        }
                        D.prototype.attributes = K1.emptyArray, D.prototype.startTimeUnixNano = null, D.prototype.timeUnixNano = null, D.prototype.count = null, D.prototype.sum = null, D.prototype.scale = null, D.prototype.zeroCount = null, D.prototype.positive = null, D.prototype.negative = null, D.prototype.flags = null, D.prototype.exemplars = K1.emptyArray, D.prototype.min = null, D.prototype.max = null, D.prototype.zeroThreshold = null;
                        var G;
                        return Object.defineProperty(D.prototype, "_sum", {
                            get: K1.oneOfGetter(G = ["sum"]),
                            set: K1.oneOfSetter(G)
                        }), Object.defineProperty(D.prototype, "_min", {
                            get: K1.oneOfGetter(G = ["min"]),
                            set: K1.oneOfSetter(G)
                        }), Object.defineProperty(D.prototype, "_max", {
                            get: K1.oneOfGetter(G = ["max"]),
                            set: K1.oneOfSetter(G)
                        }), D.create = function F(I) {
                            return new D(I)
                        }, D.encode = function F(I, Y) {
                            if (!Y) Y = J4.create();
                            if (I.attributes != null && I.attributes.length)
                                for (var W = 0; W < I.attributes.length; ++W) J1.opentelemetry.proto.common.v1.KeyValue.encode(I.attributes[W], Y.uint32(10).fork()).ldelim();
                            if (I.startTimeUnixNano != null && Object.hasOwnProperty.call(I, "startTimeUnixNano")) Y.uint32(17).fixed64(I.startTimeUnixNano);
                            if (I.timeUnixNano != null && Object.hasOwnProperty.call(I, "timeUnixNano")) Y.uint32(25).fixed64(I.timeUnixNano);
                            if (I.count != null && Object.hasOwnProperty.call(I, "count")) Y.uint32(33).fixed64(I.count);
                            if (I.sum != null && Object.hasOwnProperty.call(I, "sum")) Y.uint32(41).double(I.sum);
                            if (I.scale != null && Object.hasOwnProperty.call(I, "scale")) Y.uint32(48).sint32(I.scale);
                            if (I.zeroCount != null && Object.hasOwnProperty.call(I, "zeroCount")) Y.uint32(57).fixed64(I.zeroCount);
                            if (I.positive != null && Object.hasOwnProperty.call(I, "positive")) J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(I.positive, Y.uint32(66).fork()).ldelim();
                            if (I.negative != null && Object.hasOwnProperty.call(I, "negative")) J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(I.negative, Y.uint32(74).fork()).ldelim();
                            if (I.flags != null && Object.hasOwnProperty.call(I, "flags")) Y.uint32(80).uint32(I.flags);
                            if (I.exemplars != null && I.exemplars.length)
                                for (var W = 0; W < I.exemplars.length; ++W) J1.opentelemetry.proto.metrics.v1.Exemplar.encode(I.exemplars[W], Y.uint32(90).fork()).ldelim();
                            if (I.min != null && Object.hasOwnProperty.call(I, "min")) Y.uint32(97).double(I.min);
                            if (I.max != null && Object.hasOwnProperty.call(I, "max")) Y.uint32(105).double(I.max);
                            if (I.zeroThreshold != null && Object.hasOwnProperty.call(I, "zeroThreshold")) Y.uint32(113).double(I.zeroThreshold);
                            return Y
                        }, D.encodeDelimited = function F(I, Y) {
                            return this.encode(I, Y).ldelim()
                        }, D.decode = function F(I, Y) {
                            if (!(I instanceof m0)) I = m0.create(I);
                            var W = Y === void 0 ? I.len : I.pos + Y,
                                J = new J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint;
                            while (I.pos < W) {
                                var X = I.uint32();
                                switch (X >>> 3) {
                                    case 1: {
                                        if (!(J.attributes && J.attributes.length)) J.attributes = [];
                                        J.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(I, I.uint32()));
                                        break
                                    }
                                    case 2: {
                                        J.startTimeUnixNano = I.fixed64();
                                        break
                                    }
                                    case 3: {
                                        J.timeUnixNano = I.fixed64();
                                        break
                                    }
                                    case 4: {
                                        J.count = I.fixed64();
                                        break
                                    }
                                    case 5: {
                                        J.sum = I.double();
                                        break
                                    }
                                    case 6: {
                                        J.scale = I.sint32();
                                        break
                                    }
                                    case 7: {
                                        J.zeroCount = I.fixed64();
                                        break
                                    }
                                    case 8: {
                                        J.positive = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(I, I.uint32());
                                        break
                                    }
                                    case 9: {
                                        J.negative = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(I, I.uint32());
                                        break
                                    }
                                    case 10: {
                                        J.flags = I.uint32();
                                        break
                                    }
                                    case 11: {
                                        if (!(J.exemplars && J.exemplars.length)) J.exemplars = [];
                                        J.exemplars.push(J1.opentelemetry.proto.metrics.v1.Exemplar.decode(I, I.uint32()));
                                        break
                                    }
                                    case 12: {
                                        J.min = I.double();
                                        break
                                    }
                                    case 13: {
                                        J.max = I.double();
                                        break
                                    }
                                    case 14: {
                                        J.zeroThreshold = I.double();
                                        break
                                    }
                                    default:
                                        I.skipType(X & 7);
                                        break
                                }
                            }
                            return J
                        }, D.decodeDelimited = function F(I) {
                            if (!(I instanceof m0)) I = new m0(I);
                            return this.decode(I, I.uint32())
                        }, D.verify = function F(I) {
                            if (typeof I !== "object" || I === null) return "object expected";
                            var Y = {};
                            if (I.attributes != null && I.hasOwnProperty("attributes")) {
                                if (!Array.isArray(I.attributes)) return "attributes: array expected";
                                for (var W = 0; W < I.attributes.length; ++W) {
                                    var J = J1.opentelemetry.proto.common.v1.KeyValue.verify(I.attributes[W]);
                                    if (J) return "attributes." + J
                                }
                            }
                            if (I.startTimeUnixNano != null && I.hasOwnProperty("startTimeUnixNano")) {
                                if (!K1.isInteger(I.startTimeUnixNano) && !(I.startTimeUnixNano && K1.isInteger(I.startTimeUnixNano.low) && K1.isInteger(I.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
                            }
                            if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano")) {
                                if (!K1.isInteger(I.timeUnixNano) && !(I.timeUnixNano && K1.isInteger(I.timeUnixNano.low) && K1.isInteger(I.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
                            }
                            if (I.count != null && I.hasOwnProperty("count")) {
                                if (!K1.isInteger(I.count) && !(I.count && K1.isInteger(I.count.low) && K1.isInteger(I.count.high))) return "count: integer|Long expected"
                            }
                            if (I.sum != null && I.hasOwnProperty("sum")) {
                                if (Y._sum = 1, typeof I.sum !== "number") return "sum: number expected"
                            }
                            if (I.scale != null && I.hasOwnProperty("scale")) {
                                if (!K1.isInteger(I.scale)) return "scale: integer expected"
                            }
                            if (I.zeroCount != null && I.hasOwnProperty("zeroCount")) {
                                if (!K1.isInteger(I.zeroCount) && !(I.zeroCount && K1.isInteger(I.zeroCount.low) && K1.isInteger(I.zeroCount.high))) return "zeroCount: integer|Long expected"
                            }
                            if (I.positive != null && I.hasOwnProperty("positive")) {
                                var J = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(I.positive);
                                if (J) return "positive." + J
                            }
                            if (I.negative != null && I.hasOwnProperty("negative")) {
                                var J = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(I.negative);
                                if (J) return "negative." + J
                            }
                            if (I.flags != null && I.hasOwnProperty("flags")) {
                                if (!K1.isInteger(I.flags)) return "flags: integer expected"
                            }
                            if (I.exemplars != null && I.hasOwnProperty("exemplars")) {
                                if (!Array.isArray(I.exemplars)) return "exemplars: array expected";
                                for (var W = 0; W < I.exemplars.length; ++W) {
                                    var J = J1.opentelemetry.proto.metrics.v1.Exemplar.verify(I.exemplars[W]);
                                    if (J) return "exemplars." + J
                                }
                            }
                            if (I.min != null && I.hasOwnProperty("min")) {
                                if (Y._min = 1, typeof I.min !== "number") return "min: number expected"
                            }
                            if (I.max != null && I.hasOwnProperty("max")) {
                                if (Y._max = 1, typeof I.max !== "number") return "max: number expected"
                            }
                            if (I.zeroThreshold != null && I.hasOwnProperty("zeroThreshold")) {
                                if (typeof I.zeroThreshold !== "number") return "zeroThreshold: number expected"
                            }
                            return null
                        }, D.fromObject = function F(I) {
                            if (I instanceof J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint) return I;
                            var Y = new J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint;
                            if (I.attributes) {
                                if (!Array.isArray(I.attributes)) throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: array expected");
                                Y.attributes = [];
                                for (var W = 0; W < I.attributes.length; ++W) {
                                    if (typeof I.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: object expected");
                                    Y.attributes[W] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(I.attributes[W])
                                }
                            }
                            if (I.startTimeUnixNano != null) {
                                if (K1.Long)(Y.startTimeUnixNano = K1.Long.fromValue(I.startTimeUnixNano)).unsigned = !1;
                                else if (typeof I.startTimeUnixNano === "string") Y.startTimeUnixNano = parseInt(I.startTimeUnixNano, 10);
                                else if (typeof I.startTimeUnixNano === "number") Y.startTimeUnixNano = I.startTimeUnixNano;
                                else if (typeof I.startTimeUnixNano === "object") Y.startTimeUnixNano = new K1.LongBits(I.startTimeUnixNano.low >>> 0, I.startTimeUnixNano.high >>> 0).toNumber()
                            }
                            if (I.timeUnixNano != null) {
                                if (K1.Long)(Y.timeUnixNano = K1.Long.fromValue(I.timeUnixNano)).unsigned = !1;
                                else if (typeof I.timeUnixNano === "string") Y.timeUnixNano = parseInt(I.timeUnixNano, 10);
                                else if (typeof I.timeUnixNano === "number") Y.timeUnixNano = I.timeUnixNano;
                                else if (typeof I.timeUnixNano === "object") Y.timeUnixNano = new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber()
                            }
                            if (I.count != null) {
                                if (K1.Long)(Y.count = K1.Long.fromValue(I.count)).unsigned = !1;
                                else if (typeof I.count === "string") Y.count = parseInt(I.count, 10);
                                else if (typeof I.count === "number") Y.count = I.count;
                                else if (typeof I.count === "object") Y.count = new K1.LongBits(I.count.low >>> 0, I.count.high >>> 0).toNumber()
                            }
                            if (I.sum != null) Y.sum = Number(I.sum);
                            if (I.scale != null) Y.scale = I.scale | 0;
                            if (I.zeroCount != null) {
                                if (K1.Long)(Y.zeroCount = K1.Long.fromValue(I.zeroCount)).unsigned = !1;
                                else if (typeof I.zeroCount === "string") Y.zeroCount = parseInt(I.zeroCount, 10);
                                else if (typeof I.zeroCount === "number") Y.zeroCount = I.zeroCount;
                                else if (typeof I.zeroCount === "object") Y.zeroCount = new K1.LongBits(I.zeroCount.low >>> 0, I.zeroCount.high >>> 0).toNumber()
                            }
                            if (I.positive != null) {
                                if (typeof I.positive !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.positive: object expected");
                                Y.positive = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(I.positive)
                            }
                            if (I.negative != null) {
                                if (typeof I.negative !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.negative: object expected");
                                Y.negative = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(I.negative)
                            }
                            if (I.flags != null) Y.flags = I.flags >>> 0;
                            if (I.exemplars) {
                                if (!Array.isArray(I.exemplars)) throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: array expected");
                                Y.exemplars = [];
                                for (var W = 0; W < I.exemplars.length; ++W) {
                                    if (typeof I.exemplars[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: object expected");
                                    Y.exemplars[W] = J1.opentelemetry.proto.metrics.v1.Exemplar.fromObject(I.exemplars[W])
                                }
                            }
                            if (I.min != null) Y.min = Number(I.min);
                            if (I.max != null) Y.max = Number(I.max);
                            if (I.zeroThreshold != null) Y.zeroThreshold = Number(I.zeroThreshold);
                            return Y
                        }, D.toObject = function F(I, Y) {
                            if (!Y) Y = {};
                            var W = {};
                            if (Y.arrays || Y.defaults) W.attributes = [], W.exemplars = [];
                            if (Y.defaults) {
                                if (K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.startTimeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.startTimeUnixNano = Y.longs === String ? "0" : 0;
                                if (K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.timeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.timeUnixNano = Y.longs === String ? "0" : 0;
                                if (K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.count = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.count = Y.longs === String ? "0" : 0;
                                if (W.scale = 0, K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.zeroCount = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.zeroCount = Y.longs === String ? "0" : 0;
                                W.positive = null, W.negative = null, W.flags = 0, W.zeroThreshold = 0
                            }
                            if (I.attributes && I.attributes.length) {
                                W.attributes = [];
                                for (var X = 0; X < I.attributes.length; ++X) W.attributes[X] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(I.attributes[X], Y)
                            }
                            if (I.startTimeUnixNano != null && I.hasOwnProperty("startTimeUnixNano"))
                                if (typeof I.startTimeUnixNano === "number") W.startTimeUnixNano = Y.longs === String ? String(I.startTimeUnixNano) : I.startTimeUnixNano;
                                else W.startTimeUnixNano = Y.longs === String ? K1.Long.prototype.toString.call(I.startTimeUnixNano) : Y.longs === Number ? new K1.LongBits(I.startTimeUnixNano.low >>> 0, I.startTimeUnixNano.high >>> 0).toNumber() : I.startTimeUnixNano;
                            if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano"))
                                if (typeof I.timeUnixNano === "number") W.timeUnixNano = Y.longs === String ? String(I.timeUnixNano) : I.timeUnixNano;
                                else W.timeUnixNano = Y.longs === String ? K1.Long.prototype.toString.call(I.timeUnixNano) : Y.longs === Number ? new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber() : I.timeUnixNano;
                            if (I.count != null && I.hasOwnProperty("count"))
                                if (typeof I.count === "number") W.count = Y.longs === String ? String(I.count) : I.count;
                                else W.count = Y.longs === String ? K1.Long.prototype.toString.call(I.count) : Y.longs === Number ? new K1.LongBits(I.count.low >>> 0, I.count.high >>> 0).toNumber() : I.count;
                            if (I.sum != null && I.hasOwnProperty("sum")) {
                                if (W.sum = Y.json && !isFinite(I.sum) ? String(I.sum) : I.sum, Y.oneofs) W._sum = "sum"
                            }
                            if (I.scale != null && I.hasOwnProperty("scale")) W.scale = I.scale;
                            if (I.zeroCount != null && I.hasOwnProperty("zeroCount"))
                                if (typeof I.zeroCount === "number") W.zeroCount = Y.longs === String ? String(I.zeroCount) : I.zeroCount;
                                else W.zeroCount = Y.longs === String ? K1.Long.prototype.toString.call(I.zeroCount) : Y.longs === Number ? new K1.LongBits(I.zeroCount.low >>> 0, I.zeroCount.high >>> 0).toNumber() : I.zeroCount;
                            if (I.positive != null && I.hasOwnProperty("positive")) W.positive = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(I.positive, Y);
                            if (I.negative != null && I.hasOwnProperty("negative")) W.negative = J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(I.negative, Y);
                            if (I.flags != null && I.hasOwnProperty("flags")) W.flags = I.flags;
                            if (I.exemplars && I.exemplars.length) {
                                W.exemplars = [];
                                for (var X = 0; X < I.exemplars.length; ++X) W.exemplars[X] = J1.opentelemetry.proto.metrics.v1.Exemplar.toObject(I.exemplars[X], Y)
                            }
                            if (I.min != null && I.hasOwnProperty("min")) {
                                if (W.min = Y.json && !isFinite(I.min) ? String(I.min) : I.min, Y.oneofs) W._min = "min"
                            }
                            if (I.max != null && I.hasOwnProperty("max")) {
                                if (W.max = Y.json && !isFinite(I.max) ? String(I.max) : I.max, Y.oneofs) W._max = "max"
                            }
                            if (I.zeroThreshold != null && I.hasOwnProperty("zeroThreshold")) W.zeroThreshold = Y.json && !isFinite(I.zeroThreshold) ? String(I.zeroThreshold) : I.zeroThreshold;
                            return W
                        }, D.prototype.toJSON = function F() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function F(I) {
                            if (I === void 0) I = "type.googleapis.com";
                            return I + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint"
                        }, D.Buckets = function() {
                            function F(I) {
                                if (this.bucketCounts = [], I) {
                                    for (var Y = Object.keys(I), W = 0; W < Y.length; ++W)
                                        if (I[Y[W]] != null) this[Y[W]] = I[Y[W]]
                                }
                            }
                            return F.prototype.offset = null, F.prototype.bucketCounts = K1.emptyArray, F.create = function I(Y) {
                                return new F(Y)
                            }, F.encode = function I(Y, W) {
                                if (!W) W = J4.create();
                                if (Y.offset != null && Object.hasOwnProperty.call(Y, "offset")) W.uint32(8).sint32(Y.offset);
                                if (Y.bucketCounts != null && Y.bucketCounts.length) {
                                    W.uint32(18).fork();
                                    for (var J = 0; J < Y.bucketCounts.length; ++J) W.uint64(Y.bucketCounts[J]);
                                    W.ldelim()
                                }
                                return W
                            }, F.encodeDelimited = function I(Y, W) {
                                return this.encode(Y, W).ldelim()
                            }, F.decode = function I(Y, W) {
                                if (!(Y instanceof m0)) Y = m0.create(Y);
                                var J = W === void 0 ? Y.len : Y.pos + W,
                                    X = new J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets;
                                while (Y.pos < J) {
                                    var V = Y.uint32();
                                    switch (V >>> 3) {
                                        case 1: {
                                            X.offset = Y.sint32();
                                            break
                                        }
                                        case 2: {
                                            if (!(X.bucketCounts && X.bucketCounts.length)) X.bucketCounts = [];
                                            if ((V & 7) === 2) {
                                                var C = Y.uint32() + Y.pos;
                                                while (Y.pos < C) X.bucketCounts.push(Y.uint64())
                                            } else X.bucketCounts.push(Y.uint64());
                                            break
                                        }
                                        default:
                                            Y.skipType(V & 7);
                                            break
                                    }
                                }
                                return X
                            }, F.decodeDelimited = function I(Y) {
                                if (!(Y instanceof m0)) Y = new m0(Y);
                                return this.decode(Y, Y.uint32())
                            }, F.verify = function I(Y) {
                                if (typeof Y !== "object" || Y === null) return "object expected";
                                if (Y.offset != null && Y.hasOwnProperty("offset")) {
                                    if (!K1.isInteger(Y.offset)) return "offset: integer expected"
                                }
                                if (Y.bucketCounts != null && Y.hasOwnProperty("bucketCounts")) {
                                    if (!Array.isArray(Y.bucketCounts)) return "bucketCounts: array expected";
                                    for (var W = 0; W < Y.bucketCounts.length; ++W)
                                        if (!K1.isInteger(Y.bucketCounts[W]) && !(Y.bucketCounts[W] && K1.isInteger(Y.bucketCounts[W].low) && K1.isInteger(Y.bucketCounts[W].high))) return "bucketCounts: integer|Long[] expected"
                                }
                                return null
                            }, F.fromObject = function I(Y) {
                                if (Y instanceof J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets) return Y;
                                var W = new J1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets;
                                if (Y.offset != null) W.offset = Y.offset | 0;
                                if (Y.bucketCounts) {
                                    if (!Array.isArray(Y.bucketCounts)) throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.bucketCounts: array expected");
                                    W.bucketCounts = [];
                                    for (var J = 0; J < Y.bucketCounts.length; ++J)
                                        if (K1.Long)(W.bucketCounts[J] = K1.Long.fromValue(Y.bucketCounts[J])).unsigned = !0;
                                        else if (typeof Y.bucketCounts[J] === "string") W.bucketCounts[J] = parseInt(Y.bucketCounts[J], 10);
                                    else if (typeof Y.bucketCounts[J] === "number") W.bucketCounts[J] = Y.bucketCounts[J];
                                    else if (typeof Y.bucketCounts[J] === "object") W.bucketCounts[J] = new K1.LongBits(Y.bucketCounts[J].low >>> 0, Y.bucketCounts[J].high >>> 0).toNumber(!0)
                                }
                                return W
                            }, F.toObject = function I(Y, W) {
                                if (!W) W = {};
                                var J = {};
                                if (W.arrays || W.defaults) J.bucketCounts = [];
                                if (W.defaults) J.offset = 0;
                                if (Y.offset != null && Y.hasOwnProperty("offset")) J.offset = Y.offset;
                                if (Y.bucketCounts && Y.bucketCounts.length) {
                                    J.bucketCounts = [];
                                    for (var X = 0; X < Y.bucketCounts.length; ++X)
                                        if (typeof Y.bucketCounts[X] === "number") J.bucketCounts[X] = W.longs === String ? String(Y.bucketCounts[X]) : Y.bucketCounts[X];
                                        else J.bucketCounts[X] = W.longs === String ? K1.Long.prototype.toString.call(Y.bucketCounts[X]) : W.longs === Number ? new K1.LongBits(Y.bucketCounts[X].low >>> 0, Y.bucketCounts[X].high >>> 0).toNumber(!0) : Y.bucketCounts[X]
                                }
                                return J
                            }, F.prototype.toJSON = function I() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, F.getTypeUrl = function I(Y) {
                                if (Y === void 0) Y = "type.googleapis.com";
                                return Y + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets"
                            }, F
                        }(), D
                    }(), Z.SummaryDataPoint = function() {
                        function D(G) {
                            if (this.attributes = [], this.quantileValues = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.attributes = K1.emptyArray, D.prototype.startTimeUnixNano = null, D.prototype.timeUnixNano = null, D.prototype.count = null, D.prototype.sum = null, D.prototype.quantileValues = K1.emptyArray, D.prototype.flags = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.startTimeUnixNano != null && Object.hasOwnProperty.call(F, "startTimeUnixNano")) I.uint32(17).fixed64(F.startTimeUnixNano);
                            if (F.timeUnixNano != null && Object.hasOwnProperty.call(F, "timeUnixNano")) I.uint32(25).fixed64(F.timeUnixNano);
                            if (F.count != null && Object.hasOwnProperty.call(F, "count")) I.uint32(33).fixed64(F.count);
                            if (F.sum != null && Object.hasOwnProperty.call(F, "sum")) I.uint32(41).double(F.sum);
                            if (F.quantileValues != null && F.quantileValues.length)
                                for (var Y = 0; Y < F.quantileValues.length; ++Y) J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.encode(F.quantileValues[Y], I.uint32(50).fork()).ldelim();
                            if (F.attributes != null && F.attributes.length)
                                for (var Y = 0; Y < F.attributes.length; ++Y) J1.opentelemetry.proto.common.v1.KeyValue.encode(F.attributes[Y], I.uint32(58).fork()).ldelim();
                            if (F.flags != null && Object.hasOwnProperty.call(F, "flags")) I.uint32(64).uint32(F.flags);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.metrics.v1.SummaryDataPoint;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 7: {
                                        if (!(W.attributes && W.attributes.length)) W.attributes = [];
                                        W.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(F, F.uint32()));
                                        break
                                    }
                                    case 2: {
                                        W.startTimeUnixNano = F.fixed64();
                                        break
                                    }
                                    case 3: {
                                        W.timeUnixNano = F.fixed64();
                                        break
                                    }
                                    case 4: {
                                        W.count = F.fixed64();
                                        break
                                    }
                                    case 5: {
                                        W.sum = F.double();
                                        break
                                    }
                                    case 6: {
                                        if (!(W.quantileValues && W.quantileValues.length)) W.quantileValues = [];
                                        W.quantileValues.push(J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.decode(F, F.uint32()));
                                        break
                                    }
                                    case 8: {
                                        W.flags = F.uint32();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.attributes != null && F.hasOwnProperty("attributes")) {
                                if (!Array.isArray(F.attributes)) return "attributes: array expected";
                                for (var I = 0; I < F.attributes.length; ++I) {
                                    var Y = J1.opentelemetry.proto.common.v1.KeyValue.verify(F.attributes[I]);
                                    if (Y) return "attributes." + Y
                                }
                            }
                            if (F.startTimeUnixNano != null && F.hasOwnProperty("startTimeUnixNano")) {
                                if (!K1.isInteger(F.startTimeUnixNano) && !(F.startTimeUnixNano && K1.isInteger(F.startTimeUnixNano.low) && K1.isInteger(F.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
                            }
                            if (F.timeUnixNano != null && F.hasOwnProperty("timeUnixNano")) {
                                if (!K1.isInteger(F.timeUnixNano) && !(F.timeUnixNano && K1.isInteger(F.timeUnixNano.low) && K1.isInteger(F.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
                            }
                            if (F.count != null && F.hasOwnProperty("count")) {
                                if (!K1.isInteger(F.count) && !(F.count && K1.isInteger(F.count.low) && K1.isInteger(F.count.high))) return "count: integer|Long expected"
                            }
                            if (F.sum != null && F.hasOwnProperty("sum")) {
                                if (typeof F.sum !== "number") return "sum: number expected"
                            }
                            if (F.quantileValues != null && F.hasOwnProperty("quantileValues")) {
                                if (!Array.isArray(F.quantileValues)) return "quantileValues: array expected";
                                for (var I = 0; I < F.quantileValues.length; ++I) {
                                    var Y = J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.verify(F.quantileValues[I]);
                                    if (Y) return "quantileValues." + Y
                                }
                            }
                            if (F.flags != null && F.hasOwnProperty("flags")) {
                                if (!K1.isInteger(F.flags)) return "flags: integer expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.metrics.v1.SummaryDataPoint) return F;
                            var I = new J1.opentelemetry.proto.metrics.v1.SummaryDataPoint;
                            if (F.attributes) {
                                if (!Array.isArray(F.attributes)) throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: array expected");
                                I.attributes = [];
                                for (var Y = 0; Y < F.attributes.length; ++Y) {
                                    if (typeof F.attributes[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: object expected");
                                    I.attributes[Y] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(F.attributes[Y])
                                }
                            }
                            if (F.startTimeUnixNano != null) {
                                if (K1.Long)(I.startTimeUnixNano = K1.Long.fromValue(F.startTimeUnixNano)).unsigned = !1;
                                else if (typeof F.startTimeUnixNano === "string") I.startTimeUnixNano = parseInt(F.startTimeUnixNano, 10);
                                else if (typeof F.startTimeUnixNano === "number") I.startTimeUnixNano = F.startTimeUnixNano;
                                else if (typeof F.startTimeUnixNano === "object") I.startTimeUnixNano = new K1.LongBits(F.startTimeUnixNano.low >>> 0, F.startTimeUnixNano.high >>> 0).toNumber()
                            }
                            if (F.timeUnixNano != null) {
                                if (K1.Long)(I.timeUnixNano = K1.Long.fromValue(F.timeUnixNano)).unsigned = !1;
                                else if (typeof F.timeUnixNano === "string") I.timeUnixNano = parseInt(F.timeUnixNano, 10);
                                else if (typeof F.timeUnixNano === "number") I.timeUnixNano = F.timeUnixNano;
                                else if (typeof F.timeUnixNano === "object") I.timeUnixNano = new K1.LongBits(F.timeUnixNano.low >>> 0, F.timeUnixNano.high >>> 0).toNumber()
                            }
                            if (F.count != null) {
                                if (K1.Long)(I.count = K1.Long.fromValue(F.count)).unsigned = !1;
                                else if (typeof F.count === "string") I.count = parseInt(F.count, 10);
                                else if (typeof F.count === "number") I.count = F.count;
                                else if (typeof F.count === "object") I.count = new K1.LongBits(F.count.low >>> 0, F.count.high >>> 0).toNumber()
                            }
                            if (F.sum != null) I.sum = Number(F.sum);
                            if (F.quantileValues) {
                                if (!Array.isArray(F.quantileValues)) throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: array expected");
                                I.quantileValues = [];
                                for (var Y = 0; Y < F.quantileValues.length; ++Y) {
                                    if (typeof F.quantileValues[Y] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: object expected");
                                    I.quantileValues[Y] = J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.fromObject(F.quantileValues[Y])
                                }
                            }
                            if (F.flags != null) I.flags = F.flags >>> 0;
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.quantileValues = [], Y.attributes = [];
                            if (I.defaults) {
                                if (K1.Long) {
                                    var W = new K1.Long(0, 0, !1);
                                    Y.startTimeUnixNano = I.longs === String ? W.toString() : I.longs === Number ? W.toNumber() : W
                                } else Y.startTimeUnixNano = I.longs === String ? "0" : 0;
                                if (K1.Long) {
                                    var W = new K1.Long(0, 0, !1);
                                    Y.timeUnixNano = I.longs === String ? W.toString() : I.longs === Number ? W.toNumber() : W
                                } else Y.timeUnixNano = I.longs === String ? "0" : 0;
                                if (K1.Long) {
                                    var W = new K1.Long(0, 0, !1);
                                    Y.count = I.longs === String ? W.toString() : I.longs === Number ? W.toNumber() : W
                                } else Y.count = I.longs === String ? "0" : 0;
                                Y.sum = 0, Y.flags = 0
                            }
                            if (F.startTimeUnixNano != null && F.hasOwnProperty("startTimeUnixNano"))
                                if (typeof F.startTimeUnixNano === "number") Y.startTimeUnixNano = I.longs === String ? String(F.startTimeUnixNano) : F.startTimeUnixNano;
                                else Y.startTimeUnixNano = I.longs === String ? K1.Long.prototype.toString.call(F.startTimeUnixNano) : I.longs === Number ? new K1.LongBits(F.startTimeUnixNano.low >>> 0, F.startTimeUnixNano.high >>> 0).toNumber() : F.startTimeUnixNano;
                            if (F.timeUnixNano != null && F.hasOwnProperty("timeUnixNano"))
                                if (typeof F.timeUnixNano === "number") Y.timeUnixNano = I.longs === String ? String(F.timeUnixNano) : F.timeUnixNano;
                                else Y.timeUnixNano = I.longs === String ? K1.Long.prototype.toString.call(F.timeUnixNano) : I.longs === Number ? new K1.LongBits(F.timeUnixNano.low >>> 0, F.timeUnixNano.high >>> 0).toNumber() : F.timeUnixNano;
                            if (F.count != null && F.hasOwnProperty("count"))
                                if (typeof F.count === "number") Y.count = I.longs === String ? String(F.count) : F.count;
                                else Y.count = I.longs === String ? K1.Long.prototype.toString.call(F.count) : I.longs === Number ? new K1.LongBits(F.count.low >>> 0, F.count.high >>> 0).toNumber() : F.count;
                            if (F.sum != null && F.hasOwnProperty("sum")) Y.sum = I.json && !isFinite(F.sum) ? String(F.sum) : F.sum;
                            if (F.quantileValues && F.quantileValues.length) {
                                Y.quantileValues = [];
                                for (var J = 0; J < F.quantileValues.length; ++J) Y.quantileValues[J] = J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.toObject(F.quantileValues[J], I)
                            }
                            if (F.attributes && F.attributes.length) {
                                Y.attributes = [];
                                for (var J = 0; J < F.attributes.length; ++J) Y.attributes[J] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(F.attributes[J], I)
                            }
                            if (F.flags != null && F.hasOwnProperty("flags")) Y.flags = F.flags;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.metrics.v1.SummaryDataPoint"
                        }, D.ValueAtQuantile = function() {
                            function G(F) {
                                if (F) {
                                    for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                        if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                                }
                            }
                            return G.prototype.quantile = null, G.prototype.value = null, G.create = function F(I) {
                                return new G(I)
                            }, G.encode = function F(I, Y) {
                                if (!Y) Y = J4.create();
                                if (I.quantile != null && Object.hasOwnProperty.call(I, "quantile")) Y.uint32(9).double(I.quantile);
                                if (I.value != null && Object.hasOwnProperty.call(I, "value")) Y.uint32(17).double(I.value);
                                return Y
                            }, G.encodeDelimited = function F(I, Y) {
                                return this.encode(I, Y).ldelim()
                            }, G.decode = function F(I, Y) {
                                if (!(I instanceof m0)) I = m0.create(I);
                                var W = Y === void 0 ? I.len : I.pos + Y,
                                    J = new J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile;
                                while (I.pos < W) {
                                    var X = I.uint32();
                                    switch (X >>> 3) {
                                        case 1: {
                                            J.quantile = I.double();
                                            break
                                        }
                                        case 2: {
                                            J.value = I.double();
                                            break
                                        }
                                        default:
                                            I.skipType(X & 7);
                                            break
                                    }
                                }
                                return J
                            }, G.decodeDelimited = function F(I) {
                                if (!(I instanceof m0)) I = new m0(I);
                                return this.decode(I, I.uint32())
                            }, G.verify = function F(I) {
                                if (typeof I !== "object" || I === null) return "object expected";
                                if (I.quantile != null && I.hasOwnProperty("quantile")) {
                                    if (typeof I.quantile !== "number") return "quantile: number expected"
                                }
                                if (I.value != null && I.hasOwnProperty("value")) {
                                    if (typeof I.value !== "number") return "value: number expected"
                                }
                                return null
                            }, G.fromObject = function F(I) {
                                if (I instanceof J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile) return I;
                                var Y = new J1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile;
                                if (I.quantile != null) Y.quantile = Number(I.quantile);
                                if (I.value != null) Y.value = Number(I.value);
                                return Y
                            }, G.toObject = function F(I, Y) {
                                if (!Y) Y = {};
                                var W = {};
                                if (Y.defaults) W.quantile = 0, W.value = 0;
                                if (I.quantile != null && I.hasOwnProperty("quantile")) W.quantile = Y.json && !isFinite(I.quantile) ? String(I.quantile) : I.quantile;
                                if (I.value != null && I.hasOwnProperty("value")) W.value = Y.json && !isFinite(I.value) ? String(I.value) : I.value;
                                return W
                            }, G.prototype.toJSON = function F() {
                                return this.constructor.toObject(this, i9.util.toJSONOptions)
                            }, G.getTypeUrl = function F(I) {
                                if (I === void 0) I = "type.googleapis.com";
                                return I + "/opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile"
                            }, G
                        }(), D
                    }(), Z.Exemplar = function() {
                        function D(F) {
                            if (this.filteredAttributes = [], F) {
                                for (var I = Object.keys(F), Y = 0; Y < I.length; ++Y)
                                    if (F[I[Y]] != null) this[I[Y]] = F[I[Y]]
                            }
                        }
                        D.prototype.filteredAttributes = K1.emptyArray, D.prototype.timeUnixNano = null, D.prototype.asDouble = null, D.prototype.asInt = null, D.prototype.spanId = null, D.prototype.traceId = null;
                        var G;
                        return Object.defineProperty(D.prototype, "value", {
                            get: K1.oneOfGetter(G = ["asDouble", "asInt"]),
                            set: K1.oneOfSetter(G)
                        }), D.create = function F(I) {
                            return new D(I)
                        }, D.encode = function F(I, Y) {
                            if (!Y) Y = J4.create();
                            if (I.timeUnixNano != null && Object.hasOwnProperty.call(I, "timeUnixNano")) Y.uint32(17).fixed64(I.timeUnixNano);
                            if (I.asDouble != null && Object.hasOwnProperty.call(I, "asDouble")) Y.uint32(25).double(I.asDouble);
                            if (I.spanId != null && Object.hasOwnProperty.call(I, "spanId")) Y.uint32(34).bytes(I.spanId);
                            if (I.traceId != null && Object.hasOwnProperty.call(I, "traceId")) Y.uint32(42).bytes(I.traceId);
                            if (I.asInt != null && Object.hasOwnProperty.call(I, "asInt")) Y.uint32(49).sfixed64(I.asInt);
                            if (I.filteredAttributes != null && I.filteredAttributes.length)
                                for (var W = 0; W < I.filteredAttributes.length; ++W) J1.opentelemetry.proto.common.v1.KeyValue.encode(I.filteredAttributes[W], Y.uint32(58).fork()).ldelim();
                            return Y
                        }, D.encodeDelimited = function F(I, Y) {
                            return this.encode(I, Y).ldelim()
                        }, D.decode = function F(I, Y) {
                            if (!(I instanceof m0)) I = m0.create(I);
                            var W = Y === void 0 ? I.len : I.pos + Y,
                                J = new J1.opentelemetry.proto.metrics.v1.Exemplar;
                            while (I.pos < W) {
                                var X = I.uint32();
                                switch (X >>> 3) {
                                    case 7: {
                                        if (!(J.filteredAttributes && J.filteredAttributes.length)) J.filteredAttributes = [];
                                        J.filteredAttributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(I, I.uint32()));
                                        break
                                    }
                                    case 2: {
                                        J.timeUnixNano = I.fixed64();
                                        break
                                    }
                                    case 3: {
                                        J.asDouble = I.double();
                                        break
                                    }
                                    case 6: {
                                        J.asInt = I.sfixed64();
                                        break
                                    }
                                    case 4: {
                                        J.spanId = I.bytes();
                                        break
                                    }
                                    case 5: {
                                        J.traceId = I.bytes();
                                        break
                                    }
                                    default:
                                        I.skipType(X & 7);
                                        break
                                }
                            }
                            return J
                        }, D.decodeDelimited = function F(I) {
                            if (!(I instanceof m0)) I = new m0(I);
                            return this.decode(I, I.uint32())
                        }, D.verify = function F(I) {
                            if (typeof I !== "object" || I === null) return "object expected";
                            var Y = {};
                            if (I.filteredAttributes != null && I.hasOwnProperty("filteredAttributes")) {
                                if (!Array.isArray(I.filteredAttributes)) return "filteredAttributes: array expected";
                                for (var W = 0; W < I.filteredAttributes.length; ++W) {
                                    var J = J1.opentelemetry.proto.common.v1.KeyValue.verify(I.filteredAttributes[W]);
                                    if (J) return "filteredAttributes." + J
                                }
                            }
                            if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano")) {
                                if (!K1.isInteger(I.timeUnixNano) && !(I.timeUnixNano && K1.isInteger(I.timeUnixNano.low) && K1.isInteger(I.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
                            }
                            if (I.asDouble != null && I.hasOwnProperty("asDouble")) {
                                if (Y.value = 1, typeof I.asDouble !== "number") return "asDouble: number expected"
                            }
                            if (I.asInt != null && I.hasOwnProperty("asInt")) {
                                if (Y.value === 1) return "value: multiple values";
                                if (Y.value = 1, !K1.isInteger(I.asInt) && !(I.asInt && K1.isInteger(I.asInt.low) && K1.isInteger(I.asInt.high))) return "asInt: integer|Long expected"
                            }
                            if (I.spanId != null && I.hasOwnProperty("spanId")) {
                                if (!(I.spanId && typeof I.spanId.length === "number" || K1.isString(I.spanId))) return "spanId: buffer expected"
                            }
                            if (I.traceId != null && I.hasOwnProperty("traceId")) {
                                if (!(I.traceId && typeof I.traceId.length === "number" || K1.isString(I.traceId))) return "traceId: buffer expected"
                            }
                            return null
                        }, D.fromObject = function F(I) {
                            if (I instanceof J1.opentelemetry.proto.metrics.v1.Exemplar) return I;
                            var Y = new J1.opentelemetry.proto.metrics.v1.Exemplar;
                            if (I.filteredAttributes) {
                                if (!Array.isArray(I.filteredAttributes)) throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: array expected");
                                Y.filteredAttributes = [];
                                for (var W = 0; W < I.filteredAttributes.length; ++W) {
                                    if (typeof I.filteredAttributes[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: object expected");
                                    Y.filteredAttributes[W] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(I.filteredAttributes[W])
                                }
                            }
                            if (I.timeUnixNano != null) {
                                if (K1.Long)(Y.timeUnixNano = K1.Long.fromValue(I.timeUnixNano)).unsigned = !1;
                                else if (typeof I.timeUnixNano === "string") Y.timeUnixNano = parseInt(I.timeUnixNano, 10);
                                else if (typeof I.timeUnixNano === "number") Y.timeUnixNano = I.timeUnixNano;
                                else if (typeof I.timeUnixNano === "object") Y.timeUnixNano = new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber()
                            }
                            if (I.asDouble != null) Y.asDouble = Number(I.asDouble);
                            if (I.asInt != null) {
                                if (K1.Long)(Y.asInt = K1.Long.fromValue(I.asInt)).unsigned = !1;
                                else if (typeof I.asInt === "string") Y.asInt = parseInt(I.asInt, 10);
                                else if (typeof I.asInt === "number") Y.asInt = I.asInt;
                                else if (typeof I.asInt === "object") Y.asInt = new K1.LongBits(I.asInt.low >>> 0, I.asInt.high >>> 0).toNumber()
                            }
                            if (I.spanId != null) {
                                if (typeof I.spanId === "string") K1.base64.decode(I.spanId, Y.spanId = K1.newBuffer(K1.base64.length(I.spanId)), 0);
                                else if (I.spanId.length >= 0) Y.spanId = I.spanId
                            }
                            if (I.traceId != null) {
                                if (typeof I.traceId === "string") K1.base64.decode(I.traceId, Y.traceId = K1.newBuffer(K1.base64.length(I.traceId)), 0);
                                else if (I.traceId.length >= 0) Y.traceId = I.traceId
                            }
                            return Y
                        }, D.toObject = function F(I, Y) {
                            if (!Y) Y = {};
                            var W = {};
                            if (Y.arrays || Y.defaults) W.filteredAttributes = [];
                            if (Y.defaults) {
                                if (K1.Long) {
                                    var J = new K1.Long(0, 0, !1);
                                    W.timeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                                } else W.timeUnixNano = Y.longs === String ? "0" : 0;
                                if (Y.bytes === String) W.spanId = "";
                                else if (W.spanId = [], Y.bytes !== Array) W.spanId = K1.newBuffer(W.spanId);
                                if (Y.bytes === String) W.traceId = "";
                                else if (W.traceId = [], Y.bytes !== Array) W.traceId = K1.newBuffer(W.traceId)
                            }
                            if (I.timeUnixNano != null && I.hasOwnProperty("timeUnixNano"))
                                if (typeof I.timeUnixNano === "number") W.timeUnixNano = Y.longs === String ? String(I.timeUnixNano) : I.timeUnixNano;
                                else W.timeUnixNano = Y.longs === String ? K1.Long.prototype.toString.call(I.timeUnixNano) : Y.longs === Number ? new K1.LongBits(I.timeUnixNano.low >>> 0, I.timeUnixNano.high >>> 0).toNumber() : I.timeUnixNano;
                            if (I.asDouble != null && I.hasOwnProperty("asDouble")) {
                                if (W.asDouble = Y.json && !isFinite(I.asDouble) ? String(I.asDouble) : I.asDouble, Y.oneofs) W.value = "asDouble"
                            }
                            if (I.spanId != null && I.hasOwnProperty("spanId")) W.spanId = Y.bytes === String ? K1.base64.encode(I.spanId, 0, I.spanId.length) : Y.bytes === Array ? Array.prototype.slice.call(I.spanId) : I.spanId;
                            if (I.traceId != null && I.hasOwnProperty("traceId")) W.traceId = Y.bytes === String ? K1.base64.encode(I.traceId, 0, I.traceId.length) : Y.bytes === Array ? Array.prototype.slice.call(I.traceId) : I.traceId;
                            if (I.asInt != null && I.hasOwnProperty("asInt")) {
                                if (typeof I.asInt === "number") W.asInt = Y.longs === String ? String(I.asInt) : I.asInt;
                                else W.asInt = Y.longs === String ? K1.Long.prototype.toString.call(I.asInt) : Y.longs === Number ? new K1.LongBits(I.asInt.low >>> 0, I.asInt.high >>> 0).toNumber() : I.asInt;
                                if (Y.oneofs) W.value = "asInt"
                            }
                            if (I.filteredAttributes && I.filteredAttributes.length) {
                                W.filteredAttributes = [];
                                for (var X = 0; X < I.filteredAttributes.length; ++X) W.filteredAttributes[X] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(I.filteredAttributes[X], Y)
                            }
                            return W
                        }, D.prototype.toJSON = function F() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function F(I) {
                            if (I === void 0) I = "type.googleapis.com";
                            return I + "/opentelemetry.proto.metrics.v1.Exemplar"
                        }, D
                    }(), Z
                }(), Q
            }(), B.logs = function() {
                var Q = {};
                return Q.v1 = function() {
                    var Z = {};
                    return Z.LogsData = function() {
                        function D(G) {
                            if (this.resourceLogs = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.resourceLogs = K1.emptyArray, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.resourceLogs != null && F.resourceLogs.length)
                                for (var Y = 0; Y < F.resourceLogs.length; ++Y) J1.opentelemetry.proto.logs.v1.ResourceLogs.encode(F.resourceLogs[Y], I.uint32(10).fork()).ldelim();
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.logs.v1.LogsData;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        if (!(W.resourceLogs && W.resourceLogs.length)) W.resourceLogs = [];
                                        W.resourceLogs.push(J1.opentelemetry.proto.logs.v1.ResourceLogs.decode(F, F.uint32()));
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.resourceLogs != null && F.hasOwnProperty("resourceLogs")) {
                                if (!Array.isArray(F.resourceLogs)) return "resourceLogs: array expected";
                                for (var I = 0; I < F.resourceLogs.length; ++I) {
                                    var Y = J1.opentelemetry.proto.logs.v1.ResourceLogs.verify(F.resourceLogs[I]);
                                    if (Y) return "resourceLogs." + Y
                                }
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.logs.v1.LogsData) return F;
                            var I = new J1.opentelemetry.proto.logs.v1.LogsData;
                            if (F.resourceLogs) {
                                if (!Array.isArray(F.resourceLogs)) throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: array expected");
                                I.resourceLogs = [];
                                for (var Y = 0; Y < F.resourceLogs.length; ++Y) {
                                    if (typeof F.resourceLogs[Y] !== "object") throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: object expected");
                                    I.resourceLogs[Y] = J1.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(F.resourceLogs[Y])
                                }
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.resourceLogs = [];
                            if (F.resourceLogs && F.resourceLogs.length) {
                                Y.resourceLogs = [];
                                for (var W = 0; W < F.resourceLogs.length; ++W) Y.resourceLogs[W] = J1.opentelemetry.proto.logs.v1.ResourceLogs.toObject(F.resourceLogs[W], I)
                            }
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.logs.v1.LogsData"
                        }, D
                    }(), Z.ResourceLogs = function() {
                        function D(G) {
                            if (this.scopeLogs = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.resource = null, D.prototype.scopeLogs = K1.emptyArray, D.prototype.schemaUrl = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.resource != null && Object.hasOwnProperty.call(F, "resource")) J1.opentelemetry.proto.resource.v1.Resource.encode(F.resource, I.uint32(10).fork()).ldelim();
                            if (F.scopeLogs != null && F.scopeLogs.length)
                                for (var Y = 0; Y < F.scopeLogs.length; ++Y) J1.opentelemetry.proto.logs.v1.ScopeLogs.encode(F.scopeLogs[Y], I.uint32(18).fork()).ldelim();
                            if (F.schemaUrl != null && Object.hasOwnProperty.call(F, "schemaUrl")) I.uint32(26).string(F.schemaUrl);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.logs.v1.ResourceLogs;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.resource = J1.opentelemetry.proto.resource.v1.Resource.decode(F, F.uint32());
                                        break
                                    }
                                    case 2: {
                                        if (!(W.scopeLogs && W.scopeLogs.length)) W.scopeLogs = [];
                                        W.scopeLogs.push(J1.opentelemetry.proto.logs.v1.ScopeLogs.decode(F, F.uint32()));
                                        break
                                    }
                                    case 3: {
                                        W.schemaUrl = F.string();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.resource != null && F.hasOwnProperty("resource")) {
                                var I = J1.opentelemetry.proto.resource.v1.Resource.verify(F.resource);
                                if (I) return "resource." + I
                            }
                            if (F.scopeLogs != null && F.hasOwnProperty("scopeLogs")) {
                                if (!Array.isArray(F.scopeLogs)) return "scopeLogs: array expected";
                                for (var Y = 0; Y < F.scopeLogs.length; ++Y) {
                                    var I = J1.opentelemetry.proto.logs.v1.ScopeLogs.verify(F.scopeLogs[Y]);
                                    if (I) return "scopeLogs." + I
                                }
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) {
                                if (!K1.isString(F.schemaUrl)) return "schemaUrl: string expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.logs.v1.ResourceLogs) return F;
                            var I = new J1.opentelemetry.proto.logs.v1.ResourceLogs;
                            if (F.resource != null) {
                                if (typeof F.resource !== "object") throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.resource: object expected");
                                I.resource = J1.opentelemetry.proto.resource.v1.Resource.fromObject(F.resource)
                            }
                            if (F.scopeLogs) {
                                if (!Array.isArray(F.scopeLogs)) throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: array expected");
                                I.scopeLogs = [];
                                for (var Y = 0; Y < F.scopeLogs.length; ++Y) {
                                    if (typeof F.scopeLogs[Y] !== "object") throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: object expected");
                                    I.scopeLogs[Y] = J1.opentelemetry.proto.logs.v1.ScopeLogs.fromObject(F.scopeLogs[Y])
                                }
                            }
                            if (F.schemaUrl != null) I.schemaUrl = String(F.schemaUrl);
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.scopeLogs = [];
                            if (I.defaults) Y.resource = null, Y.schemaUrl = "";
                            if (F.resource != null && F.hasOwnProperty("resource")) Y.resource = J1.opentelemetry.proto.resource.v1.Resource.toObject(F.resource, I);
                            if (F.scopeLogs && F.scopeLogs.length) {
                                Y.scopeLogs = [];
                                for (var W = 0; W < F.scopeLogs.length; ++W) Y.scopeLogs[W] = J1.opentelemetry.proto.logs.v1.ScopeLogs.toObject(F.scopeLogs[W], I)
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) Y.schemaUrl = F.schemaUrl;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.logs.v1.ResourceLogs"
                        }, D
                    }(), Z.ScopeLogs = function() {
                        function D(G) {
                            if (this.logRecords = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.scope = null, D.prototype.logRecords = K1.emptyArray, D.prototype.schemaUrl = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.scope != null && Object.hasOwnProperty.call(F, "scope")) J1.opentelemetry.proto.common.v1.InstrumentationScope.encode(F.scope, I.uint32(10).fork()).ldelim();
                            if (F.logRecords != null && F.logRecords.length)
                                for (var Y = 0; Y < F.logRecords.length; ++Y) J1.opentelemetry.proto.logs.v1.LogRecord.encode(F.logRecords[Y], I.uint32(18).fork()).ldelim();
                            if (F.schemaUrl != null && Object.hasOwnProperty.call(F, "schemaUrl")) I.uint32(26).string(F.schemaUrl);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.logs.v1.ScopeLogs;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.scope = J1.opentelemetry.proto.common.v1.InstrumentationScope.decode(F, F.uint32());
                                        break
                                    }
                                    case 2: {
                                        if (!(W.logRecords && W.logRecords.length)) W.logRecords = [];
                                        W.logRecords.push(J1.opentelemetry.proto.logs.v1.LogRecord.decode(F, F.uint32()));
                                        break
                                    }
                                    case 3: {
                                        W.schemaUrl = F.string();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.scope != null && F.hasOwnProperty("scope")) {
                                var I = J1.opentelemetry.proto.common.v1.InstrumentationScope.verify(F.scope);
                                if (I) return "scope." + I
                            }
                            if (F.logRecords != null && F.hasOwnProperty("logRecords")) {
                                if (!Array.isArray(F.logRecords)) return "logRecords: array expected";
                                for (var Y = 0; Y < F.logRecords.length; ++Y) {
                                    var I = J1.opentelemetry.proto.logs.v1.LogRecord.verify(F.logRecords[Y]);
                                    if (I) return "logRecords." + I
                                }
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) {
                                if (!K1.isString(F.schemaUrl)) return "schemaUrl: string expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.logs.v1.ScopeLogs) return F;
                            var I = new J1.opentelemetry.proto.logs.v1.ScopeLogs;
                            if (F.scope != null) {
                                if (typeof F.scope !== "object") throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.scope: object expected");
                                I.scope = J1.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(F.scope)
                            }
                            if (F.logRecords) {
                                if (!Array.isArray(F.logRecords)) throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: array expected");
                                I.logRecords = [];
                                for (var Y = 0; Y < F.logRecords.length; ++Y) {
                                    if (typeof F.logRecords[Y] !== "object") throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: object expected");
                                    I.logRecords[Y] = J1.opentelemetry.proto.logs.v1.LogRecord.fromObject(F.logRecords[Y])
                                }
                            }
                            if (F.schemaUrl != null) I.schemaUrl = String(F.schemaUrl);
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.logRecords = [];
                            if (I.defaults) Y.scope = null, Y.schemaUrl = "";
                            if (F.scope != null && F.hasOwnProperty("scope")) Y.scope = J1.opentelemetry.proto.common.v1.InstrumentationScope.toObject(F.scope, I);
                            if (F.logRecords && F.logRecords.length) {
                                Y.logRecords = [];
                                for (var W = 0; W < F.logRecords.length; ++W) Y.logRecords[W] = J1.opentelemetry.proto.logs.v1.LogRecord.toObject(F.logRecords[W], I)
                            }
                            if (F.schemaUrl != null && F.hasOwnProperty("schemaUrl")) Y.schemaUrl = F.schemaUrl;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.logs.v1.ScopeLogs"
                        }, D
                    }(), Z.SeverityNumber = function() {
                        var D = {},
                            G = Object.create(D);
                        return G[D[0] = "SEVERITY_NUMBER_UNSPECIFIED"] = 0, G[D[1] = "SEVERITY_NUMBER_TRACE"] = 1, G[D[2] = "SEVERITY_NUMBER_TRACE2"] = 2, G[D[3] = "SEVERITY_NUMBER_TRACE3"] = 3, G[D[4] = "SEVERITY_NUMBER_TRACE4"] = 4, G[D[5] = "SEVERITY_NUMBER_DEBUG"] = 5, G[D[6] = "SEVERITY_NUMBER_DEBUG2"] = 6, G[D[7] = "SEVERITY_NUMBER_DEBUG3"] = 7, G[D[8] = "SEVERITY_NUMBER_DEBUG4"] = 8, G[D[9] = "SEVERITY_NUMBER_INFO"] = 9, G[D[10] = "SEVERITY_NUMBER_INFO2"] = 10, G[D[11] = "SEVERITY_NUMBER_INFO3"] = 11, G[D[12] = "SEVERITY_NUMBER_INFO4"] = 12, G[D[13] = "SEVERITY_NUMBER_WARN"] = 13, G[D[14] = "SEVERITY_NUMBER_WARN2"] = 14, G[D[15] = "SEVERITY_NUMBER_WARN3"] = 15, G[D[16] = "SEVERITY_NUMBER_WARN4"] = 16, G[D[17] = "SEVERITY_NUMBER_ERROR"] = 17, G[D[18] = "SEVERITY_NUMBER_ERROR2"] = 18, G[D[19] = "SEVERITY_NUMBER_ERROR3"] = 19, G[D[20] = "SEVERITY_NUMBER_ERROR4"] = 20, G[D[21] = "SEVERITY_NUMBER_FATAL"] = 21, G[D[22] = "SEVERITY_NUMBER_FATAL2"] = 22, G[D[23] = "SEVERITY_NUMBER_FATAL3"] = 23, G[D[24] = "SEVERITY_NUMBER_FATAL4"] = 24, G
                    }(), Z.LogRecordFlags = function() {
                        var D = {},
                            G = Object.create(D);
                        return G[D[0] = "LOG_RECORD_FLAGS_DO_NOT_USE"] = 0, G[D[255] = "LOG_RECORD_FLAGS_TRACE_FLAGS_MASK"] = 255, G
                    }(), Z.LogRecord = function() {
                        function D(G) {
                            if (this.attributes = [], G) {
                                for (var F = Object.keys(G), I = 0; I < F.length; ++I)
                                    if (G[F[I]] != null) this[F[I]] = G[F[I]]
                            }
                        }
                        return D.prototype.timeUnixNano = null, D.prototype.observedTimeUnixNano = null, D.prototype.severityNumber = null, D.prototype.severityText = null, D.prototype.body = null, D.prototype.attributes = K1.emptyArray, D.prototype.droppedAttributesCount = null, D.prototype.flags = null, D.prototype.traceId = null, D.prototype.spanId = null, D.create = function G(F) {
                            return new D(F)
                        }, D.encode = function G(F, I) {
                            if (!I) I = J4.create();
                            if (F.timeUnixNano != null && Object.hasOwnProperty.call(F, "timeUnixNano")) I.uint32(9).fixed64(F.timeUnixNano);
                            if (F.severityNumber != null && Object.hasOwnProperty.call(F, "severityNumber")) I.uint32(16).int32(F.severityNumber);
                            if (F.severityText != null && Object.hasOwnProperty.call(F, "severityText")) I.uint32(26).string(F.severityText);
                            if (F.body != null && Object.hasOwnProperty.call(F, "body")) J1.opentelemetry.proto.common.v1.AnyValue.encode(F.body, I.uint32(42).fork()).ldelim();
                            if (F.attributes != null && F.attributes.length)
                                for (var Y = 0; Y < F.attributes.length; ++Y) J1.opentelemetry.proto.common.v1.KeyValue.encode(F.attributes[Y], I.uint32(50).fork()).ldelim();
                            if (F.droppedAttributesCount != null && Object.hasOwnProperty.call(F, "droppedAttributesCount")) I.uint32(56).uint32(F.droppedAttributesCount);
                            if (F.flags != null && Object.hasOwnProperty.call(F, "flags")) I.uint32(69).fixed32(F.flags);
                            if (F.traceId != null && Object.hasOwnProperty.call(F, "traceId")) I.uint32(74).bytes(F.traceId);
                            if (F.spanId != null && Object.hasOwnProperty.call(F, "spanId")) I.uint32(82).bytes(F.spanId);
                            if (F.observedTimeUnixNano != null && Object.hasOwnProperty.call(F, "observedTimeUnixNano")) I.uint32(89).fixed64(F.observedTimeUnixNano);
                            return I
                        }, D.encodeDelimited = function G(F, I) {
                            return this.encode(F, I).ldelim()
                        }, D.decode = function G(F, I) {
                            if (!(F instanceof m0)) F = m0.create(F);
                            var Y = I === void 0 ? F.len : F.pos + I,
                                W = new J1.opentelemetry.proto.logs.v1.LogRecord;
                            while (F.pos < Y) {
                                var J = F.uint32();
                                switch (J >>> 3) {
                                    case 1: {
                                        W.timeUnixNano = F.fixed64();
                                        break
                                    }
                                    case 11: {
                                        W.observedTimeUnixNano = F.fixed64();
                                        break
                                    }
                                    case 2: {
                                        W.severityNumber = F.int32();
                                        break
                                    }
                                    case 3: {
                                        W.severityText = F.string();
                                        break
                                    }
                                    case 5: {
                                        W.body = J1.opentelemetry.proto.common.v1.AnyValue.decode(F, F.uint32());
                                        break
                                    }
                                    case 6: {
                                        if (!(W.attributes && W.attributes.length)) W.attributes = [];
                                        W.attributes.push(J1.opentelemetry.proto.common.v1.KeyValue.decode(F, F.uint32()));
                                        break
                                    }
                                    case 7: {
                                        W.droppedAttributesCount = F.uint32();
                                        break
                                    }
                                    case 8: {
                                        W.flags = F.fixed32();
                                        break
                                    }
                                    case 9: {
                                        W.traceId = F.bytes();
                                        break
                                    }
                                    case 10: {
                                        W.spanId = F.bytes();
                                        break
                                    }
                                    default:
                                        F.skipType(J & 7);
                                        break
                                }
                            }
                            return W
                        }, D.decodeDelimited = function G(F) {
                            if (!(F instanceof m0)) F = new m0(F);
                            return this.decode(F, F.uint32())
                        }, D.verify = function G(F) {
                            if (typeof F !== "object" || F === null) return "object expected";
                            if (F.timeUnixNano != null && F.hasOwnProperty("timeUnixNano")) {
                                if (!K1.isInteger(F.timeUnixNano) && !(F.timeUnixNano && K1.isInteger(F.timeUnixNano.low) && K1.isInteger(F.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
                            }
                            if (F.observedTimeUnixNano != null && F.hasOwnProperty("observedTimeUnixNano")) {
                                if (!K1.isInteger(F.observedTimeUnixNano) && !(F.observedTimeUnixNano && K1.isInteger(F.observedTimeUnixNano.low) && K1.isInteger(F.observedTimeUnixNano.high))) return "observedTimeUnixNano: integer|Long expected"
                            }
                            if (F.severityNumber != null && F.hasOwnProperty("severityNumber")) switch (F.severityNumber) {
                                default:
                                    return "severityNumber: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                case 9:
                                case 10:
                                case 11:
                                case 12:
                                case 13:
                                case 14:
                                case 15:
                                case 16:
                                case 17:
                                case 18:
                                case 19:
                                case 20:
                                case 21:
                                case 22:
                                case 23:
                                case 24:
                                    break
                            }
                            if (F.severityText != null && F.hasOwnProperty("severityText")) {
                                if (!K1.isString(F.severityText)) return "severityText: string expected"
                            }
                            if (F.body != null && F.hasOwnProperty("body")) {
                                var I = J1.opentelemetry.proto.common.v1.AnyValue.verify(F.body);
                                if (I) return "body." + I
                            }
                            if (F.attributes != null && F.hasOwnProperty("attributes")) {
                                if (!Array.isArray(F.attributes)) return "attributes: array expected";
                                for (var Y = 0; Y < F.attributes.length; ++Y) {
                                    var I = J1.opentelemetry.proto.common.v1.KeyValue.verify(F.attributes[Y]);
                                    if (I) return "attributes." + I
                                }
                            }
                            if (F.droppedAttributesCount != null && F.hasOwnProperty("droppedAttributesCount")) {
                                if (!K1.isInteger(F.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
                            }
                            if (F.flags != null && F.hasOwnProperty("flags")) {
                                if (!K1.isInteger(F.flags)) return "flags: integer expected"
                            }
                            if (F.traceId != null && F.hasOwnProperty("traceId")) {
                                if (!(F.traceId && typeof F.traceId.length === "number" || K1.isString(F.traceId))) return "traceId: buffer expected"
                            }
                            if (F.spanId != null && F.hasOwnProperty("spanId")) {
                                if (!(F.spanId && typeof F.spanId.length === "number" || K1.isString(F.spanId))) return "spanId: buffer expected"
                            }
                            return null
                        }, D.fromObject = function G(F) {
                            if (F instanceof J1.opentelemetry.proto.logs.v1.LogRecord) return F;
                            var I = new J1.opentelemetry.proto.logs.v1.LogRecord;
                            if (F.timeUnixNano != null) {
                                if (K1.Long)(I.timeUnixNano = K1.Long.fromValue(F.timeUnixNano)).unsigned = !1;
                                else if (typeof F.timeUnixNano === "string") I.timeUnixNano = parseInt(F.timeUnixNano, 10);
                                else if (typeof F.timeUnixNano === "number") I.timeUnixNano = F.timeUnixNano;
                                else if (typeof F.timeUnixNano === "object") I.timeUnixNano = new K1.LongBits(F.timeUnixNano.low >>> 0, F.timeUnixNano.high >>> 0).toNumber()
                            }
                            if (F.observedTimeUnixNano != null) {
                                if (K1.Long)(I.observedTimeUnixNano = K1.Long.fromValue(F.observedTimeUnixNano)).unsigned = !1;
                                else if (typeof F.observedTimeUnixNano === "string") I.observedTimeUnixNano = parseInt(F.observedTimeUnixNano, 10);
                                else if (typeof F.observedTimeUnixNano === "number") I.observedTimeUnixNano = F.observedTimeUnixNano;
                                else if (typeof F.observedTimeUnixNano === "object") I.observedTimeUnixNano = new K1.LongBits(F.observedTimeUnixNano.low >>> 0, F.observedTimeUnixNano.high >>> 0).toNumber()
                            }
                            switch (F.severityNumber) {
                                default:
                                    if (typeof F.severityNumber === "number") {
                                        I.severityNumber = F.severityNumber;
                                        break
                                    }
                                    break;
                                case "SEVERITY_NUMBER_UNSPECIFIED":
                                case 0:
                                    I.severityNumber = 0;
                                    break;
                                case "SEVERITY_NUMBER_TRACE":
                                case 1:
                                    I.severityNumber = 1;
                                    break;
                                case "SEVERITY_NUMBER_TRACE2":
                                case 2:
                                    I.severityNumber = 2;
                                    break;
                                case "SEVERITY_NUMBER_TRACE3":
                                case 3:
                                    I.severityNumber = 3;
                                    break;
                                case "SEVERITY_NUMBER_TRACE4":
                                case 4:
                                    I.severityNumber = 4;
                                    break;
                                case "SEVERITY_NUMBER_DEBUG":
                                case 5:
                                    I.severityNumber = 5;
                                    break;
                                case "SEVERITY_NUMBER_DEBUG2":
                                case 6:
                                    I.severityNumber = 6;
                                    break;
                                case "SEVERITY_NUMBER_DEBUG3":
                                case 7:
                                    I.severityNumber = 7;
                                    break;
                                case "SEVERITY_NUMBER_DEBUG4":
                                case 8:
                                    I.severityNumber = 8;
                                    break;
                                case "SEVERITY_NUMBER_INFO":
                                case 9:
                                    I.severityNumber = 9;
                                    break;
                                case "SEVERITY_NUMBER_INFO2":
                                case 10:
                                    I.severityNumber = 10;
                                    break;
                                case "SEVERITY_NUMBER_INFO3":
                                case 11:
                                    I.severityNumber = 11;
                                    break;
                                case "SEVERITY_NUMBER_INFO4":
                                case 12:
                                    I.severityNumber = 12;
                                    break;
                                case "SEVERITY_NUMBER_WARN":
                                case 13:
                                    I.severityNumber = 13;
                                    break;
                                case "SEVERITY_NUMBER_WARN2":
                                case 14:
                                    I.severityNumber = 14;
                                    break;
                                case "SEVERITY_NUMBER_WARN3":
                                case 15:
                                    I.severityNumber = 15;
                                    break;
                                case "SEVERITY_NUMBER_WARN4":
                                case 16:
                                    I.severityNumber = 16;
                                    break;
                                case "SEVERITY_NUMBER_ERROR":
                                case 17:
                                    I.severityNumber = 17;
                                    break;
                                case "SEVERITY_NUMBER_ERROR2":
                                case 18:
                                    I.severityNumber = 18;
                                    break;
                                case "SEVERITY_NUMBER_ERROR3":
                                case 19:
                                    I.severityNumber = 19;
                                    break;
                                case "SEVERITY_NUMBER_ERROR4":
                                case 20:
                                    I.severityNumber = 20;
                                    break;
                                case "SEVERITY_NUMBER_FATAL":
                                case 21:
                                    I.severityNumber = 21;
                                    break;
                                case "SEVERITY_NUMBER_FATAL2":
                                case 22:
                                    I.severityNumber = 22;
                                    break;
                                case "SEVERITY_NUMBER_FATAL3":
                                case 23:
                                    I.severityNumber = 23;
                                    break;
                                case "SEVERITY_NUMBER_FATAL4":
                                case 24:
                                    I.severityNumber = 24;
                                    break
                            }
                            if (F.severityText != null) I.severityText = String(F.severityText);
                            if (F.body != null) {
                                if (typeof F.body !== "object") throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.body: object expected");
                                I.body = J1.opentelemetry.proto.common.v1.AnyValue.fromObject(F.body)
                            }
                            if (F.attributes) {
                                if (!Array.isArray(F.attributes)) throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: array expected");
                                I.attributes = [];
                                for (var Y = 0; Y < F.attributes.length; ++Y) {
                                    if (typeof F.attributes[Y] !== "object") throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: object expected");
                                    I.attributes[Y] = J1.opentelemetry.proto.common.v1.KeyValue.fromObject(F.attributes[Y])
                                }
                            }
                            if (F.droppedAttributesCount != null) I.droppedAttributesCount = F.droppedAttributesCount >>> 0;
                            if (F.flags != null) I.flags = F.flags >>> 0;
                            if (F.traceId != null) {
                                if (typeof F.traceId === "string") K1.base64.decode(F.traceId, I.traceId = K1.newBuffer(K1.base64.length(F.traceId)), 0);
                                else if (F.traceId.length >= 0) I.traceId = F.traceId
                            }
                            if (F.spanId != null) {
                                if (typeof F.spanId === "string") K1.base64.decode(F.spanId, I.spanId = K1.newBuffer(K1.base64.length(F.spanId)), 0);
                                else if (F.spanId.length >= 0) I.spanId = F.spanId
                            }
                            return I
                        }, D.toObject = function G(F, I) {
                            if (!I) I = {};
                            var Y = {};
                            if (I.arrays || I.defaults) Y.attributes = [];
                            if (I.defaults) {
                                if (K1.Long) {
                                    var W = new K1.Long(0, 0, !1);
                                    Y.timeUnixNano = I.longs === String ? W.toString() : I.longs === Number ? W.toNumber() : W
                                } else Y.timeUnixNano = I.longs === String ? "0" : 0;
                                if (Y.severityNumber = I.enums === String ? "SEVERITY_NUMBER_UNSPECIFIED" : 0, Y.severityText = "", Y.body = null, Y.droppedAttributesCount = 0, Y.flags = 0, I.bytes === String) Y.traceId = "";
                                else if (Y.traceId = [], I.bytes !== Array) Y.traceId = K1.newBuffer(Y.traceId);
                                if (I.bytes === String) Y.spanId = "";
                                else if (Y.spanId = [], I.bytes !== Array) Y.spanId = K1.newBuffer(Y.spanId);
                                if (K1.Long) {
                                    var W = new K1.Long(0, 0, !1);
                                    Y.observedTimeUnixNano = I.longs === String ? W.toString() : I.longs === Number ? W.toNumber() : W
                                } else Y.observedTimeUnixNano = I.longs === String ? "0" : 0
                            }
                            if (F.timeUnixNano != null && F.hasOwnProperty("timeUnixNano"))
                                if (typeof F.timeUnixNano === "number") Y.timeUnixNano = I.longs === String ? String(F.timeUnixNano) : F.timeUnixNano;
                                else Y.timeUnixNano = I.longs === String ? K1.Long.prototype.toString.call(F.timeUnixNano) : I.longs === Number ? new K1.LongBits(F.timeUnixNano.low >>> 0, F.timeUnixNano.high >>> 0).toNumber() : F.timeUnixNano;
                            if (F.severityNumber != null && F.hasOwnProperty("severityNumber")) Y.severityNumber = I.enums === String ? J1.opentelemetry.proto.logs.v1.SeverityNumber[F.severityNumber] === void 0 ? F.severityNumber : J1.opentelemetry.proto.logs.v1.SeverityNumber[F.severityNumber] : F.severityNumber;
                            if (F.severityText != null && F.hasOwnProperty("severityText")) Y.severityText = F.severityText;
                            if (F.body != null && F.hasOwnProperty("body")) Y.body = J1.opentelemetry.proto.common.v1.AnyValue.toObject(F.body, I);
                            if (F.attributes && F.attributes.length) {
                                Y.attributes = [];
                                for (var J = 0; J < F.attributes.length; ++J) Y.attributes[J] = J1.opentelemetry.proto.common.v1.KeyValue.toObject(F.attributes[J], I)
                            }
                            if (F.droppedAttributesCount != null && F.hasOwnProperty("droppedAttributesCount")) Y.droppedAttributesCount = F.droppedAttributesCount;
                            if (F.flags != null && F.hasOwnProperty("flags")) Y.flags = F.flags;
                            if (F.traceId != null && F.hasOwnProperty("traceId")) Y.traceId = I.bytes === String ? K1.base64.encode(F.traceId, 0, F.traceId.length) : I.bytes === Array ? Array.prototype.slice.call(F.traceId) : F.traceId;
                            if (F.spanId != null && F.hasOwnProperty("spanId")) Y.spanId = I.bytes === String ? K1.base64.encode(F.spanId, 0, F.spanId.length) : I.bytes === Array ? Array.prototype.slice.call(F.spanId) : F.spanId;
                            if (F.observedTimeUnixNano != null && F.hasOwnProperty("observedTimeUnixNano"))
                                if (typeof F.observedTimeUnixNano === "number") Y.observedTimeUnixNano = I.longs === String ? String(F.observedTimeUnixNano) : F.observedTimeUnixNano;
                                else Y.observedTimeUnixNano = I.longs === String ? K1.Long.prototype.toString.call(F.observedTimeUnixNano) : I.longs === Number ? new K1.LongBits(F.observedTimeUnixNano.low >>> 0, F.observedTimeUnixNano.high >>> 0).toNumber() : F.observedTimeUnixNano;
                            return Y
                        }, D.prototype.toJSON = function G() {
                            return this.constructor.toObject(this, i9.util.toJSONOptions)
                        }, D.getTypeUrl = function G(F) {
                            if (F === void 0) F = "type.googleapis.com";
                            return F + "/opentelemetry.proto.logs.v1.LogRecord"
                        }, D
                    }(), Z
                }(), Q
            }(), B
        }(), A
    }();
    bi2.exports = J1
});