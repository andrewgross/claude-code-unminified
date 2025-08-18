/* chunk:334 bytes:[7984173, 8001318) size:17145 source:unpacked-cli.js */
var Jt2 = E((Z6, Wt2) => {
    var GX = iP1();
    Wt2.exports = Z6 = GX.descriptor = GX.Root.fromJSON(zX0()).lookup(".google.protobuf");
    var {
        Namespace: Ft2,
        Root: K71,
        Enum: PP,
        Type: Hx,
        Field: zx,
        MapField: eH6,
        OneOf: nP1,
        Service: H71,
        Method: aP1
    } = GX;
    K71.fromDescriptor = function A(B) {
        if (typeof B.length === "number") B = Z6.FileDescriptorSet.decode(B);
        var Q = new K71;
        if (B.file) {
            var Z, D;
            for (var G = 0, F; G < B.file.length; ++G) {
                if (D = Q, (Z = B.file[G]).package && Z.package.length) D = Q.define(Z.package);
                if (Z.name && Z.name.length) Q.files.push(D.filename = Z.name);
                if (Z.messageType)
                    for (F = 0; F < Z.messageType.length; ++F) D.add(Hx.fromDescriptor(Z.messageType[F], Z.syntax));
                if (Z.enumType)
                    for (F = 0; F < Z.enumType.length; ++F) D.add(PP.fromDescriptor(Z.enumType[F]));
                if (Z.extension)
                    for (F = 0; F < Z.extension.length; ++F) D.add(zx.fromDescriptor(Z.extension[F]));
                if (Z.service)
                    for (F = 0; F < Z.service.length; ++F) D.add(H71.fromDescriptor(Z.service[F]));
                var I = ft(Z.options, Z6.FileOptions);
                if (I) {
                    var Y = Object.keys(I);
                    for (F = 0; F < Y.length; ++F) D.setOption(Y[F], I[Y[F]])
                }
            }
        }
        return Q
    };
    K71.prototype.toDescriptor = function A(B) {
        var Q = Z6.FileDescriptorSet.create();
        return It2(this, Q.file, B), Q
    };

    function It2(A, B, Q) {
        var Z = Z6.FileDescriptorProto.create({
            name: A.filename || (A.fullName.substring(1).replace(/\./g, "_") || "root") + ".proto"
        });
        if (Q) Z.syntax = Q;
        if (!(A instanceof K71)) Z.package = A.fullName.substring(1);
        for (var D = 0, G; D < A.nestedArray.length; ++D)
            if ((G = A._nestedArray[D]) instanceof Hx) Z.messageType.push(G.toDescriptor(Q));
            else if (G instanceof PP) Z.enumType.push(G.toDescriptor());
        else if (G instanceof zx) Z.extension.push(G.toDescriptor(Q));
        else if (G instanceof H71) Z.service.push(G.toDescriptor());
        else if (G instanceof Ft2) It2(G, B, Q);
        if (Z.options = ht(A.options, Z6.FileOptions), Z.messageType.length + Z.enumType.length + Z.extension.length + Z.service.length) B.push(Z)
    }
    var Az6 = 0;
    Hx.fromDescriptor = function A(B, Q) {
        if (typeof B.length === "number") B = Z6.DescriptorProto.decode(B);
        var Z = new Hx(B.name.length ? B.name : "Type" + Az6++, ft(B.options, Z6.MessageOptions)),
            D;
        if (B.oneofDecl)
            for (D = 0; D < B.oneofDecl.length; ++D) Z.add(nP1.fromDescriptor(B.oneofDecl[D]));
        if (B.field)
            for (D = 0; D < B.field.length; ++D) {
                var G = zx.fromDescriptor(B.field[D], Q);
                if (Z.add(G), B.field[D].hasOwnProperty("oneofIndex")) Z.oneofsArray[B.field[D].oneofIndex].add(G)
            }
        if (B.extension)
            for (D = 0; D < B.extension.length; ++D) Z.add(zx.fromDescriptor(B.extension[D], Q));
        if (B.nestedType) {
            for (D = 0; D < B.nestedType.length; ++D)
                if (Z.add(Hx.fromDescriptor(B.nestedType[D], Q)), B.nestedType[D].options && B.nestedType[D].options.mapEntry) Z.setOption("map_entry", !0)
        }
        if (B.enumType)
            for (D = 0; D < B.enumType.length; ++D) Z.add(PP.fromDescriptor(B.enumType[D]));
        if (B.extensionRange && B.extensionRange.length) {
            Z.extensions = [];
            for (D = 0; D < B.extensionRange.length; ++D) Z.extensions.push([B.extensionRange[D].start, B.extensionRange[D].end])
        }
        if (B.reservedRange && B.reservedRange.length || B.reservedName && B.reservedName.length) {
            if (Z.reserved = [], B.reservedRange)
                for (D = 0; D < B.reservedRange.length; ++D) Z.reserved.push([B.reservedRange[D].start, B.reservedRange[D].end]);
            if (B.reservedName)
                for (D = 0; D < B.reservedName.length; ++D) Z.reserved.push(B.reservedName[D])
        }
        return Z
    };
    Hx.prototype.toDescriptor = function A(B) {
        var Q = Z6.DescriptorProto.create({
                name: this.name
            }),
            Z;
        for (Z = 0; Z < this.fieldsArray.length; ++Z) {
            var D;
            if (Q.field.push(D = this._fieldsArray[Z].toDescriptor(B)), this._fieldsArray[Z] instanceof eH6) {
                var G = EX0(this._fieldsArray[Z].keyType, this._fieldsArray[Z].resolvedKeyType),
                    F = EX0(this._fieldsArray[Z].type, this._fieldsArray[Z].resolvedType),
                    I = F === 11 || F === 14 ? this._fieldsArray[Z].resolvedType && Yt2(this.parent, this._fieldsArray[Z].resolvedType) || this._fieldsArray[Z].type : void 0;
                Q.nestedType.push(Z6.DescriptorProto.create({
                    name: D.typeName,
                    field: [Z6.FieldDescriptorProto.create({
                        name: "key",
                        number: 1,
                        label: 1,
                        type: G
                    }), Z6.FieldDescriptorProto.create({
                        name: "value",
                        number: 2,
                        label: 1,
                        type: F,
                        typeName: I
                    })],
                    options: Z6.MessageOptions.create({
                        mapEntry: !0
                    })
                }))
            }
        }
        for (Z = 0; Z < this.oneofsArray.length; ++Z) Q.oneofDecl.push(this._oneofsArray[Z].toDescriptor());
        for (Z = 0; Z < this.nestedArray.length; ++Z)
            if (this._nestedArray[Z] instanceof zx) Q.field.push(this._nestedArray[Z].toDescriptor(B));
            else if (this._nestedArray[Z] instanceof Hx) Q.nestedType.push(this._nestedArray[Z].toDescriptor(B));
        else if (this._nestedArray[Z] instanceof PP) Q.enumType.push(this._nestedArray[Z].toDescriptor());
        if (this.extensions)
            for (Z = 0; Z < this.extensions.length; ++Z) Q.extensionRange.push(Z6.DescriptorProto.ExtensionRange.create({
                start: this.extensions[Z][0],
                end: this.extensions[Z][1]
            }));
        if (this.reserved)
            for (Z = 0; Z < this.reserved.length; ++Z)
                if (typeof this.reserved[Z] === "string") Q.reservedName.push(this.reserved[Z]);
                else Q.reservedRange.push(Z6.DescriptorProto.ReservedRange.create({
                    start: this.reserved[Z][0],
                    end: this.reserved[Z][1]
                }));
        return Q.options = ht(this.options, Z6.MessageOptions), Q
    };
    var Bz6 = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;
    zx.fromDescriptor = function A(B, Q) {
        if (typeof B.length === "number") B = Z6.DescriptorProto.decode(B);
        if (typeof B.number !== "number") throw Error("missing field id");
        var Z;
        if (B.typeName && B.typeName.length) Z = B.typeName;
        else Z = Fz6(B.type);
        var D;
        switch (B.label) {
            case 1:
                D = void 0;
                break;
            case 2:
                D = "required";
                break;
            case 3:
                D = "repeated";
                break;
            default:
                throw Error("illegal label: " + B.label)
        }
        var G = B.extendee;
        if (B.extendee !== void 0) G = G.length ? G : void 0;
        var F = new zx(B.name.length ? B.name : "field" + B.number, B.number, Z, D, G);
        if (F.options = ft(B.options, Z6.FieldOptions), B.defaultValue && B.defaultValue.length) {
            var I = B.defaultValue;
            switch (I) {
                case "true":
                case "TRUE":
                    I = !0;
                    break;
                case "false":
                case "FALSE":
                    I = !1;
                    break;
                default:
                    var Y = Bz6.exec(I);
                    if (Y) I = parseInt(I);
                    break
            }
            F.setOption("default", I)
        }
        if (Iz6(B.type)) {
            if (Q === "proto3") {
                if (B.options && !B.options.packed) F.setOption("packed", !1)
            } else if (!(B.options && B.options.packed)) F.setOption("packed", !1)
        }
        return F
    };
    zx.prototype.toDescriptor = function A(B) {
        var Q = Z6.FieldDescriptorProto.create({
            name: this.name,
            number: this.id
        });
        if (this.map) Q.type = 11, Q.typeName = GX.util.ucFirst(this.name), Q.label = 3;
        else {
            switch (Q.type = EX0(this.type, this.resolve().resolvedType)) {
                case 10:
                case 11:
                case 14:
                    Q.typeName = this.resolvedType ? Yt2(this.parent, this.resolvedType) : this.type;
                    break
            }
            switch (this.rule) {
                case "repeated":
                    Q.label = 3;
                    break;
                case "required":
                    Q.label = 2;
                    break;
                default:
                    Q.label = 1;
                    break
            }
        }
        if (Q.extendee = this.extensionField ? this.extensionField.parent.fullName : this.extend, this.partOf) {
            if ((Q.oneofIndex = this.parent.oneofsArray.indexOf(this.partOf)) < 0) throw Error("missing oneof")
        }
        if (this.options) {
            if (Q.options = ht(this.options, Z6.FieldOptions), this.options.default != null) Q.defaultValue = String(this.options.default)
        }
        if (B === "proto3") {
            if (!this.packed)(Q.options || (Q.options = Z6.FieldOptions.create())).packed = !1
        } else if (this.packed)(Q.options || (Q.options = Z6.FieldOptions.create())).packed = !0;
        return Q
    };
    var Qz6 = 0;
    PP.fromDescriptor = function A(B) {
        if (typeof B.length === "number") B = Z6.EnumDescriptorProto.decode(B);
        var Q = {};
        if (B.value)
            for (var Z = 0; Z < B.value.length; ++Z) {
                var D = B.value[Z].name,
                    G = B.value[Z].number || 0;
                Q[D && D.length ? D : "NAME" + G] = G
            }
        return new PP(B.name && B.name.length ? B.name : "Enum" + Qz6++, Q, ft(B.options, Z6.EnumOptions))
    };
    PP.prototype.toDescriptor = function A() {
        var B = [];
        for (var Q = 0, Z = Object.keys(this.values); Q < Z.length; ++Q) B.push(Z6.EnumValueDescriptorProto.create({
            name: Z[Q],
            number: this.values[Z[Q]]
        }));
        return Z6.EnumDescriptorProto.create({
            name: this.name,
            value: B,
            options: ht(this.options, Z6.EnumOptions)
        })
    };
    var Zz6 = 0;
    nP1.fromDescriptor = function A(B) {
        if (typeof B.length === "number") B = Z6.OneofDescriptorProto.decode(B);
        return new nP1(B.name && B.name.length ? B.name : "oneof" + Zz6++)
    };
    nP1.prototype.toDescriptor = function A() {
        return Z6.OneofDescriptorProto.create({
            name: this.name
        })
    };
    var Dz6 = 0;
    H71.fromDescriptor = function A(B) {
        if (typeof B.length === "number") B = Z6.ServiceDescriptorProto.decode(B);
        var Q = new H71(B.name && B.name.length ? B.name : "Service" + Dz6++, ft(B.options, Z6.ServiceOptions));
        if (B.method)
            for (var Z = 0; Z < B.method.length; ++Z) Q.add(aP1.fromDescriptor(B.method[Z]));
        return Q
    };
    H71.prototype.toDescriptor = function A() {
        var B = [];
        for (var Q = 0; Q < this.methodsArray.length; ++Q) B.push(this._methodsArray[Q].toDescriptor());
        return Z6.ServiceDescriptorProto.create({
            name: this.name,
            method: B,
            options: ht(this.options, Z6.ServiceOptions)
        })
    };
    var Gz6 = 0;
    aP1.fromDescriptor = function A(B) {
        if (typeof B.length === "number") B = Z6.MethodDescriptorProto.decode(B);
        return new aP1(B.name && B.name.length ? B.name : "Method" + Gz6++, "rpc", B.inputType, B.outputType, Boolean(B.clientStreaming), Boolean(B.serverStreaming), ft(B.options, Z6.MethodOptions))
    };
    aP1.prototype.toDescriptor = function A() {
        return Z6.MethodDescriptorProto.create({
            name: this.name,
            inputType: this.resolvedRequestType ? this.resolvedRequestType.fullName : this.requestType,
            outputType: this.resolvedResponseType ? this.resolvedResponseType.fullName : this.responseType,
            clientStreaming: this.requestStream,
            serverStreaming: this.responseStream,
            options: ht(this.options, Z6.MethodOptions)
        })
    };

    function Fz6(A) {
        switch (A) {
            case 1:
                return "double";
            case 2:
                return "float";
            case 3:
                return "int64";
            case 4:
                return "uint64";
            case 5:
                return "int32";
            case 6:
                return "fixed64";
            case 7:
                return "fixed32";
            case 8:
                return "bool";
            case 9:
                return "string";
            case 12:
                return "bytes";
            case 13:
                return "uint32";
            case 15:
                return "sfixed32";
            case 16:
                return "sfixed64";
            case 17:
                return "sint32";
            case 18:
                return "sint64"
        }
        throw Error("illegal type: " + A)
    }

    function Iz6(A) {
        switch (A) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
                return !0
        }
        return !1
    }

    function EX0(A, B) {
        switch (A) {
            case "double":
                return 1;
            case "float":
                return 2;
            case "int64":
                return 3;
            case "uint64":
                return 4;
            case "int32":
                return 5;
            case "fixed64":
                return 6;
            case "fixed32":
                return 7;
            case "bool":
                return 8;
            case "string":
                return 9;
            case "bytes":
                return 12;
            case "uint32":
                return 13;
            case "sfixed32":
                return 15;
            case "sfixed64":
                return 16;
            case "sint32":
                return 17;
            case "sint64":
                return 18
        }
        if (B instanceof PP) return 14;
        if (B instanceof Hx) return B.group ? 10 : 11;
        throw Error("illegal type: " + A)
    }

    function ft(A, B) {
        if (!A) return;
        var Q = [];
        for (var Z = 0, D, G, F; Z < B.fieldsArray.length; ++Z)
            if ((G = (D = B._fieldsArray[Z]).name) !== "uninterpretedOption") {
                if (A.hasOwnProperty(G)) {
                    if (F = A[G], D.resolvedType instanceof PP && typeof F === "number" && D.resolvedType.valuesById[F] !== void 0) F = D.resolvedType.valuesById[F];
                    Q.push(Yz6(G), F)
                }
            } return Q.length ? GX.util.toObject(Q) : void 0
    }

    function ht(A, B) {
        if (!A) return;
        var Q = [];
        for (var Z = 0, D = Object.keys(A), G, F; Z < D.length; ++Z) {
            if (F = A[G = D[Z]], G === "default") continue;
            var I = B.fields[G];
            if (!I && !(I = B.fields[G = GX.util.camelCase(G)])) continue;
            Q.push(G, F)
        }
        return Q.length ? B.fromObject(GX.util.toObject(Q)) : void 0
    }

    function Yt2(A, B) {
        var Q = A.fullName.split("."),
            Z = B.fullName.split("."),
            D = 0,
            G = 0,
            F = Z.length - 1;
        if (!(A instanceof K71) && B instanceof Ft2)
            while (D < Q.length && G < F && Q[D] === Z[G]) {
                var I = B.lookup(Q[D++], !0);
                if (I !== null && I !== B) break;
                ++G
            } else
                for (; D < Q.length && G < F && Q[D] === Z[G]; ++D, ++G);
        return Z.slice(G).join(".")
    }

    function Yz6(A) {
        return A.substring(0, 1) + A.substring(1).replace(/([A-Z])(?=[a-z]|$)/g, function(B, Q) {
            return "_" + Q.toLowerCase()
        })
    }
});