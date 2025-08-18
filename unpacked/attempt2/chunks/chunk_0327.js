/* chunk:327 bytes:[7866871, 7884690) size:17819 source:unpacked-cli.js */
var yt = E((Ip5, Ko2) => {
    Ko2.exports = PE;
    var kP1 = Vm();
    ((PE.prototype = Object.create(kP1.prototype)).constructor = PE).className = "OneOf";
    var Vo2 = Xx(),
        jP1 = qI();

    function PE(A, B, Q, Z) {
        if (!Array.isArray(B)) Q = B, B = void 0;
        if (kP1.call(this, A, Q), !(B === void 0 || Array.isArray(B))) throw TypeError("fieldNames must be an Array");
        this.oneof = B || [], this.fieldsArray = [], this.comment = Z
    }
    PE.fromJSON = function A(B, Q) {
        return new PE(B, Q.oneof, Q.options, Q.comment)
    };
    PE.prototype.toJSON = function A(B) {
        var Q = B ? Boolean(B.keepComments) : !1;
        return jP1.toObject(["options", this.options, "oneof", this.oneof, "comment", Q ? this.comment : void 0])
    };

    function Co2(A) {
        if (A.parent) {
            for (var B = 0; B < A.fieldsArray.length; ++B)
                if (!A.fieldsArray[B].parent) A.parent.add(A.fieldsArray[B])
        }
    }
    PE.prototype.add = function A(B) {
        if (!(B instanceof Vo2)) throw TypeError("field must be a Field");
        if (B.parent && B.parent !== this.parent) B.parent.remove(B);
        return this.oneof.push(B.name), this.fieldsArray.push(B), B.partOf = this, Co2(this), this
    };
    PE.prototype.remove = function A(B) {
        if (!(B instanceof Vo2)) throw TypeError("field must be a Field");
        var Q = this.fieldsArray.indexOf(B);
        if (Q < 0) throw Error(B + " is not a member of " + this);
        if (this.fieldsArray.splice(Q, 1), Q = this.oneof.indexOf(B.name), Q > -1) this.oneof.splice(Q, 1);
        return B.partOf = null, this
    };
    PE.prototype.onAdd = function A(B) {
        kP1.prototype.onAdd.call(this, B);
        var Q = this;
        for (var Z = 0; Z < this.oneof.length; ++Z) {
            var D = B.get(this.oneof[Z]);
            if (D && !D.partOf) D.partOf = Q, Q.fieldsArray.push(D)
        }
        Co2(this)
    };
    PE.prototype.onRemove = function A(B) {
        for (var Q = 0, Z; Q < this.fieldsArray.length; ++Q)
            if ((Z = this.fieldsArray[Q]).parent) Z.parent.remove(Z);
        kP1.prototype.onRemove.call(this, B)
    };
    PE.d = function A() {
        var B = new Array(arguments.length),
            Q = 0;
        while (Q < arguments.length) B[Q] = arguments[Q++];
        return function Z(D, G) {
            jP1.decorateType(D.constructor).add(new PE(G, B)), Object.defineProperty(D, G, {
                get: jP1.oneOfGetter(B),
                set: jP1.oneOfSetter(B)
            })
        }
    }
});
var vt = E((Yp5, Uo2) => {
    Uo2.exports = G5;
    var lJ0 = Vm();
    ((G5.prototype = Object.create(lJ0.prototype)).constructor = G5).className = "Namespace";
    var Ho2 = Xx(),
        yP1 = qI(),
        BH6 = yt(),
        _t, W71, xt;
    G5.fromJSON = function A(B, Q) {
        return new G5(B, Q.options).addJSON(Q.nested)
    };

    function zo2(A, B) {
        if (!(A && A.length)) return;
        var Q = {};
        for (var Z = 0; Z < A.length; ++Z) Q[A[Z].name] = A[Z].toJSON(B);
        return Q
    }
    G5.arrayToJSON = zo2;
    G5.isReservedId = function A(B, Q) {
        if (B) {
            for (var Z = 0; Z < B.length; ++Z)
                if (typeof B[Z] !== "string" && B[Z][0] <= Q && B[Z][1] > Q) return !0
        }
        return !1
    };
    G5.isReservedName = function A(B, Q) {
        if (B) {
            for (var Z = 0; Z < B.length; ++Z)
                if (B[Z] === Q) return !0
        }
        return !1
    };

    function G5(A, B) {
        lJ0.call(this, A, B), this.nested = void 0, this._nestedArray = null
    }

    function Eo2(A) {
        return A._nestedArray = null, A
    }
    Object.defineProperty(G5.prototype, "nestedArray", {
        get: function() {
            return this._nestedArray || (this._nestedArray = yP1.toArray(this.nested))
        }
    });
    G5.prototype.toJSON = function A(B) {
        return yP1.toObject(["options", this.options, "nested", zo2(this.nestedArray, B)])
    };
    G5.prototype.addJSON = function A(B) {
        var Q = this;
        if (B)
            for (var Z = Object.keys(B), D = 0, G; D < Z.length; ++D) G = B[Z[D]], Q.add((G.fields !== void 0 ? _t.fromJSON : G.values !== void 0 ? xt.fromJSON : G.methods !== void 0 ? W71.fromJSON : G.id !== void 0 ? Ho2.fromJSON : G5.fromJSON)(Z[D], G));
        return this
    };
    G5.prototype.get = function A(B) {
        return this.nested && this.nested[B] || null
    };
    G5.prototype.getEnum = function A(B) {
        if (this.nested && this.nested[B] instanceof xt) return this.nested[B].values;
        throw Error("no such enum: " + B)
    };
    G5.prototype.add = function A(B) {
        if (!(B instanceof Ho2 && B.extend !== void 0 || B instanceof _t || B instanceof BH6 || B instanceof xt || B instanceof W71 || B instanceof G5)) throw TypeError("object must be a valid nested object");
        if (!this.nested) this.nested = {};
        else {
            var Q = this.get(B.name);
            if (Q)
                if (Q instanceof G5 && B instanceof G5 && !(Q instanceof _t || Q instanceof W71)) {
                    var Z = Q.nestedArray;
                    for (var D = 0; D < Z.length; ++D) B.add(Z[D]);
                    if (this.remove(Q), !this.nested) this.nested = {};
                    B.setOptions(Q.options, !0)
                } else throw Error("duplicate name '" + B.name + "' in " + this)
        }
        return this.nested[B.name] = B, B.onAdd(this), Eo2(this)
    };
    G5.prototype.remove = function A(B) {
        if (!(B instanceof lJ0)) throw TypeError("object must be a ReflectionObject");
        if (B.parent !== this) throw Error(B + " is not a member of " + this);
        if (delete this.nested[B.name], !Object.keys(this.nested).length) this.nested = void 0;
        return B.onRemove(this), Eo2(this)
    };
    G5.prototype.define = function A(B, Q) {
        if (yP1.isString(B)) B = B.split(".");
        else if (!Array.isArray(B)) throw TypeError("illegal path");
        if (B && B.length && B[0] === "") throw Error("path must be relative");
        var Z = this;
        while (B.length > 0) {
            var D = B.shift();
            if (Z.nested && Z.nested[D]) {
                if (Z = Z.nested[D], !(Z instanceof G5)) throw Error("path conflicts with non-namespace objects")
            } else Z.add(Z = new G5(D))
        }
        if (Q) Z.addJSON(Q);
        return Z
    };
    G5.prototype.resolveAll = function A() {
        var B = this.nestedArray,
            Q = 0;
        while (Q < B.length)
            if (B[Q] instanceof G5) B[Q++].resolveAll();
            else B[Q++].resolve();
        return this.resolve()
    };
    G5.prototype.lookup = function A(B, Q, Z) {
        if (typeof Q === "boolean") Z = Q, Q = void 0;
        else if (Q && !Array.isArray(Q)) Q = [Q];
        if (yP1.isString(B) && B.length) {
            if (B === ".") return this.root;
            B = B.split(".")
        } else if (!B.length) return this;
        if (B[0] === "") return this.root.lookup(B.slice(1), Q);
        var D = this.get(B[0]);
        if (D) {
            if (B.length === 1) {
                if (!Q || Q.indexOf(D.constructor) > -1) return D
            } else if (D instanceof G5 && (D = D.lookup(B.slice(1), Q, !0))) return D
        } else
            for (var G = 0; G < this.nestedArray.length; ++G)
                if (this._nestedArray[G] instanceof G5 && (D = this._nestedArray[G].lookup(B, Q, !0))) return D;
        if (this.parent === null || Z) return null;
        return this.parent.lookup(B, Q)
    };
    G5.prototype.lookupType = function A(B) {
        var Q = this.lookup(B, [_t]);
        if (!Q) throw Error("no such type: " + B);
        return Q
    };
    G5.prototype.lookupEnum = function A(B) {
        var Q = this.lookup(B, [xt]);
        if (!Q) throw Error("no such Enum '" + B + "' in " + this);
        return Q
    };
    G5.prototype.lookupTypeOrEnum = function A(B) {
        var Q = this.lookup(B, [_t, xt]);
        if (!Q) throw Error("no such Type or Enum '" + B + "' in " + this);
        return Q
    };
    G5.prototype.lookupService = function A(B) {
        var Q = this.lookup(B, [W71]);
        if (!Q) throw Error("no such Service '" + B + "' in " + this);
        return Q
    };
    G5._configure = function(A, B, Q) {
        _t = A, W71 = B, xt = Q
    }
});
var _P1 = E((Wp5, wo2) => {
    wo2.exports = RP;
    var pJ0 = Xx();
    ((RP.prototype = Object.create(pJ0.prototype)).constructor = RP).className = "MapField";
    var QH6 = Xm(),
        J71 = qI();

    function RP(A, B, Q, Z, D, G) {
        if (pJ0.call(this, A, B, Z, void 0, void 0, D, G), !J71.isString(Q)) throw TypeError("keyType must be a string");
        this.keyType = Q, this.resolvedKeyType = null, this.map = !0
    }
    RP.fromJSON = function A(B, Q) {
        return new RP(B, Q.id, Q.keyType, Q.type, Q.options, Q.comment)
    };
    RP.prototype.toJSON = function A(B) {
        var Q = B ? Boolean(B.keepComments) : !1;
        return J71.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", Q ? this.comment : void 0])
    };
    RP.prototype.resolve = function A() {
        if (this.resolved) return this;
        if (QH6.mapKey[this.keyType] === void 0) throw Error("invalid key type: " + this.keyType);
        return pJ0.prototype.resolve.call(this)
    };
    RP.d = function A(B, Q, Z) {
        if (typeof Z === "function") Z = J71.decorateType(Z).name;
        else if (Z && typeof Z === "object") Z = J71.decorateEnum(Z).name;
        return function D(G, F) {
            J71.decorateType(G.constructor).add(new RP(F, B, Q, Z))
        }
    }
});
var xP1 = E((Jp5, $o2) => {
    $o2.exports = Cm;
    var iJ0 = Vm();
    ((Cm.prototype = Object.create(iJ0.prototype)).constructor = Cm).className = "Method";
    var bt = qI();

    function Cm(A, B, Q, Z, D, G, F, I, Y) {
        if (bt.isObject(D)) F = D, D = G = void 0;
        else if (bt.isObject(G)) F = G, G = void 0;
        if (!(B === void 0 || bt.isString(B))) throw TypeError("type must be a string");
        if (!bt.isString(Q)) throw TypeError("requestType must be a string");
        if (!bt.isString(Z)) throw TypeError("responseType must be a string");
        iJ0.call(this, A, F), this.type = B || "rpc", this.requestType = Q, this.requestStream = D ? !0 : void 0, this.responseType = Z, this.responseStream = G ? !0 : void 0, this.resolvedRequestType = null, this.resolvedResponseType = null, this.comment = I, this.parsedOptions = Y
    }
    Cm.fromJSON = function A(B, Q) {
        return new Cm(B, Q.type, Q.requestType, Q.responseType, Q.requestStream, Q.responseStream, Q.options, Q.comment, Q.parsedOptions)
    };
    Cm.prototype.toJSON = function A(B) {
        var Q = B ? Boolean(B.keepComments) : !1;
        return bt.toObject(["type", this.type !== "rpc" && this.type || void 0, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", Q ? this.comment : void 0, "parsedOptions", this.parsedOptions])
    };
    Cm.prototype.resolve = function A() {
        if (this.resolved) return this;
        return this.resolvedRequestType = this.parent.lookupType(this.requestType), this.resolvedResponseType = this.parent.lookupType(this.responseType), iJ0.prototype.resolve.call(this)
    }
});
var vP1 = E((Xp5, No2) => {
    No2.exports = SE;
    var Vx = vt();
    ((SE.prototype = Object.create(Vx.prototype)).constructor = SE).className = "Service";
    var nJ0 = xP1(),
        X71 = qI(),
        ZH6 = hW0();

    function SE(A, B) {
        Vx.call(this, A, B), this.methods = {}, this._methodsArray = null
    }
    SE.fromJSON = function A(B, Q) {
        var Z = new SE(B, Q.options);
        if (Q.methods)
            for (var D = Object.keys(Q.methods), G = 0; G < D.length; ++G) Z.add(nJ0.fromJSON(D[G], Q.methods[D[G]]));
        if (Q.nested) Z.addJSON(Q.nested);
        return Z.comment = Q.comment, Z
    };
    SE.prototype.toJSON = function A(B) {
        var Q = Vx.prototype.toJSON.call(this, B),
            Z = B ? Boolean(B.keepComments) : !1;
        return X71.toObject(["options", Q && Q.options || void 0, "methods", Vx.arrayToJSON(this.methodsArray, B) || {}, "nested", Q && Q.nested || void 0, "comment", Z ? this.comment : void 0])
    };
    Object.defineProperty(SE.prototype, "methodsArray", {
        get: function() {
            return this._methodsArray || (this._methodsArray = X71.toArray(this.methods))
        }
    });

    function qo2(A) {
        return A._methodsArray = null, A
    }
    SE.prototype.get = function A(B) {
        return this.methods[B] || Vx.prototype.get.call(this, B)
    };
    SE.prototype.resolveAll = function A() {
        var B = this.methodsArray;
        for (var Q = 0; Q < B.length; ++Q) B[Q].resolve();
        return Vx.prototype.resolve.call(this)
    };
    SE.prototype.add = function A(B) {
        if (this.get(B.name)) throw Error("duplicate name '" + B.name + "' in " + this);
        if (B instanceof nJ0) return this.methods[B.name] = B, B.parent = this, qo2(this);
        return Vx.prototype.add.call(this, B)
    };
    SE.prototype.remove = function A(B) {
        if (B instanceof nJ0) {
            if (this.methods[B.name] !== B) throw Error(B + " is not a member of " + this);
            return delete this.methods[B.name], B.parent = null, qo2(this)
        }
        return Vx.prototype.remove.call(this, B)
    };
    SE.prototype.create = function A(B, Q, Z) {
        var D = new ZH6.Service(B, Q, Z);
        for (var G = 0, F; G < this.methodsArray.length; ++G) {
            var I = X71.lcFirst((F = this._methodsArray[G]).resolve().name).replace(/[^$\w_]/g, "");
            D[I] = X71.codegen(["r", "c"], X71.isReserved(I) ? I + "_" : I)("return this.rpcCall(m,q,s,r,c)")({
                m: F,
                q: F.resolvedRequestType.ctor,
                s: F.resolvedResponseType.ctor
            })
        }
        return D
    }
});
var bP1 = E((Vp5, Lo2) => {
    Lo2.exports = FM;
    var DH6 = QM();

    function FM(A) {
        if (A)
            for (var B = Object.keys(A), Q = 0; Q < B.length; ++Q) this[B[Q]] = A[B[Q]]
    }
    FM.create = function A(B) {
        return this.$type.create(B)
    };
    FM.encode = function A(B, Q) {
        return this.$type.encode(B, Q)
    };
    FM.encodeDelimited = function A(B, Q) {
        return this.$type.encodeDelimited(B, Q)
    };
    FM.decode = function A(B) {
        return this.$type.decode(B)
    };
    FM.decodeDelimited = function A(B) {
        return this.$type.decodeDelimited(B)
    };
    FM.verify = function A(B) {
        return this.$type.verify(B)
    };
    FM.fromObject = function A(B) {
        return this.$type.fromObject(B)
    };
    FM.toObject = function A(B, Q) {
        return this.$type.toObject(B, Q)
    };
    FM.prototype.toJSON = function A() {
        return this.$type.toObject(this, DH6.toJSONOptions)
    }
});
var aJ0 = E((Cp5, Ro2) => {
    Ro2.exports = IH6;
    var GH6 = W$(),
        OP = Xm(),
        Mo2 = qI();

    function FH6(A) {
        return "missing required '" + A.name + "'"
    }

    function IH6(A) {
        var B = Mo2.codegen(["r", "l"], A.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (A.fieldsArray.filter(function(I) {
            return I.map
        }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()");
        if (A.group) B("if((t&7)===4)")("break");
        B("switch(t>>>3){");
        var Q = 0;
        for (; Q < A.fieldsArray.length; ++Q) {
            var Z = A._fieldsArray[Q].resolve(),
                D = Z.resolvedType instanceof GH6 ? "int32" : Z.type,
                G = "m" + Mo2.safeProp(Z.name);
            if (B("case %i: {", Z.id), Z.map) {
                if (B("if(%s===util.emptyObject)", G)("%s={}", G)("var c2 = r.uint32()+r.pos"), OP.defaults[Z.keyType] !== void 0) B("k=%j", OP.defaults[Z.keyType]);
                else B("k=null");
                if (OP.defaults[D] !== void 0) B("value=%j", OP.defaults[D]);
                else B("value=null");
                if (B("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", Z.keyType)("case 2:"), OP.basic[D] === void 0) B("value=types[%i].decode(r,r.uint32())", Q);
                else B("value=r.%s()", D);
                if (B("break")("default:")("r.skipType(tag2&7)")("break")("}")("}"), OP.long[Z.keyType] !== void 0) B('%s[typeof k==="object"?util.longToHash(k):k]=value', G);
                else B("%s[k]=value", G)
            } else if (Z.repeated) {
                if (B("if(!(%s&&%s.length))", G, G)("%s=[]", G), OP.packed[D] !== void 0) B("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", G, D)("}else");
                if (OP.basic[D] === void 0) B(Z.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", G, Q);
                else B("%s.push(r.%s())", G, D)
            } else if (OP.basic[D] === void 0) B(Z.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", G, Q);
            else B("%s=r.%s()", G, D);
            B("break")("}")
        }
        B("default:")("r.skipType(t&7)")("break")("}")("}");
        for (Q = 0; Q < A._fieldsArray.length; ++Q) {
            var F = A._fieldsArray[Q];
            if (F.required) B("if(!m.hasOwnProperty(%j))", F.name)("throw util.ProtocolError(%j,{instance:m})", FH6(F))
        }
        return B("return m")
    }
});