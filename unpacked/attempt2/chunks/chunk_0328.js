/* chunk:328 bytes:[7884691, 7897593) size:12902 source:unpacked-cli.js */
var oJ0 = E((Kp5, Oo2) => {
    Oo2.exports = JH6;
    var YH6 = W$(),
        sJ0 = qI();

    function jE(A, B) {
        return A.name + ": " + B + (A.repeated && B !== "array" ? "[]" : A.map && B !== "object" ? "{k:" + A.keyType + "}" : "") + " expected"
    }

    function rJ0(A, B, Q, Z) {
        if (B.resolvedType)
            if (B.resolvedType instanceof YH6) {
                A("switch(%s){", Z)("default:")("return%j", jE(B, "enum value"));
                for (var D = Object.keys(B.resolvedType.values), G = 0; G < D.length; ++G) A("case %i:", B.resolvedType.values[D[G]]);
                A("break")("}")
            } else A("{")("var e=types[%i].verify(%s);", Q, Z)("if(e)")("return%j+e", B.name + ".")("}");
        else switch (B.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
                A("if(!util.isInteger(%s))", Z)("return%j", jE(B, "integer"));
                break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
                A("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", Z, Z, Z, Z)("return%j", jE(B, "integer|Long"));
                break;
            case "float":
            case "double":
                A('if(typeof %s!=="number")', Z)("return%j", jE(B, "number"));
                break;
            case "bool":
                A('if(typeof %s!=="boolean")', Z)("return%j", jE(B, "boolean"));
                break;
            case "string":
                A("if(!util.isString(%s))", Z)("return%j", jE(B, "string"));
                break;
            case "bytes":
                A('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', Z, Z, Z)("return%j", jE(B, "buffer"));
                break
        }
        return A
    }

    function WH6(A, B, Q) {
        switch (B.keyType) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
                A("if(!util.key32Re.test(%s))", Q)("return%j", jE(B, "integer key"));
                break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
                A("if(!util.key64Re.test(%s))", Q)("return%j", jE(B, "integer|Long key"));
                break;
            case "bool":
                A("if(!util.key2Re.test(%s))", Q)("return%j", jE(B, "boolean key"));
                break
        }
        return A
    }

    function JH6(A) {
        var B = sJ0.codegen(["m"], A.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected"),
            Q = A.oneofsArray,
            Z = {};
        if (Q.length) B("var p={}");
        for (var D = 0; D < A.fieldsArray.length; ++D) {
            var G = A._fieldsArray[D].resolve(),
                F = "m" + sJ0.safeProp(G.name);
            if (G.optional) B("if(%s!=null&&m.hasOwnProperty(%j)){", F, G.name);
            if (G.map) B("if(!util.isObject(%s))", F)("return%j", jE(G, "object"))("var k=Object.keys(%s)", F)("for(var i=0;i<k.length;++i){"), WH6(B, G, "k[i]"), rJ0(B, G, D, F + "[k[i]]")("}");
            else if (G.repeated) B("if(!Array.isArray(%s))", F)("return%j", jE(G, "array"))("for(var i=0;i<%s.length;++i){", F), rJ0(B, G, D, F + "[i]")("}");
            else {
                if (G.partOf) {
                    var I = sJ0.safeProp(G.partOf.name);
                    if (Z[G.partOf.name] === 1) B("if(p%s===1)", I)("return%j", G.partOf.name + ": multiple values");
                    Z[G.partOf.name] = 1, B("p%s=1", I)
                }
                rJ0(B, G, D, F)
            }
            if (G.optional) B("}")
        }
        return B("return null")
    }
});
var AX0 = E((Po2) => {
    var To2 = Po2,
        V71 = W$(),
        IM = qI();

    function tJ0(A, B, Q, Z) {
        var D = !1;
        if (B.resolvedType)
            if (B.resolvedType instanceof V71) {
                A("switch(d%s){", Z);
                for (var G = B.resolvedType.values, F = Object.keys(G), I = 0; I < F.length; ++I) {
                    if (G[F[I]] === B.typeDefault && !D) {
                        if (A("default:")('if(typeof(d%s)==="number"){m%s=d%s;break}', Z, Z, Z), !B.repeated) A("break");
                        D = !0
                    }
                    A("case%j:", F[I])("case %i:", G[F[I]])("m%s=%j", Z, G[F[I]])("break")
                }
                A("}")
            } else A('if(typeof d%s!=="object")', Z)("throw TypeError(%j)", B.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", Z, Q, Z);
        else {
            var Y = !1;
            switch (B.type) {
                case "double":
                case "float":
                    A("m%s=Number(d%s)", Z, Z);
                    break;
                case "uint32":
                case "fixed32":
                    A("m%s=d%s>>>0", Z, Z);
                    break;
                case "int32":
                case "sint32":
                case "sfixed32":
                    A("m%s=d%s|0", Z, Z);
                    break;
                case "uint64":
                    Y = !0;
                case "int64":
                case "sint64":
                case "fixed64":
                case "sfixed64":
                    A("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", Z, Z, Y)('else if(typeof d%s==="string")', Z)("m%s=parseInt(d%s,10)", Z, Z)('else if(typeof d%s==="number")', Z)("m%s=d%s", Z, Z)('else if(typeof d%s==="object")', Z)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", Z, Z, Z, Y ? "true" : "");
                    break;
                case "bytes":
                    A('if(typeof d%s==="string")', Z)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", Z, Z, Z)("else if(d%s.length >= 0)", Z)("m%s=d%s", Z, Z);
                    break;
                case "string":
                    A("m%s=String(d%s)", Z, Z);
                    break;
                case "bool":
                    A("m%s=Boolean(d%s)", Z, Z);
                    break
            }
        }
        return A
    }
    To2.fromObject = function A(B) {
        var Q = B.fieldsArray,
            Z = IM.codegen(["d"], B.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
        if (!Q.length) return Z("return new this.ctor");
        Z("var m=new this.ctor");
        for (var D = 0; D < Q.length; ++D) {
            var G = Q[D].resolve(),
                F = IM.safeProp(G.name);
            if (G.map) Z("if(d%s){", F)('if(typeof d%s!=="object")', F)("throw TypeError(%j)", G.fullName + ": object expected")("m%s={}", F)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", F), tJ0(Z, G, D, F + "[ks[i]]")("}")("}");
            else if (G.repeated) Z("if(d%s){", F)("if(!Array.isArray(d%s))", F)("throw TypeError(%j)", G.fullName + ": array expected")("m%s=[]", F)("for(var i=0;i<d%s.length;++i){", F), tJ0(Z, G, D, F + "[i]")("}")("}");
            else {
                if (!(G.resolvedType instanceof V71)) Z("if(d%s!=null){", F);
                if (tJ0(Z, G, D, F), !(G.resolvedType instanceof V71)) Z("}")
            }
        }
        return Z("return m")
    };

    function eJ0(A, B, Q, Z) {
        if (B.resolvedType)
            if (B.resolvedType instanceof V71) A("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", Z, Q, Z, Z, Q, Z, Z);
            else A("d%s=types[%i].toObject(m%s,o)", Z, Q, Z);
        else {
            var D = !1;
            switch (B.type) {
                case "double":
                case "float":
                    A("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", Z, Z, Z, Z);
                    break;
                case "uint64":
                    D = !0;
                case "int64":
                case "sint64":
                case "fixed64":
                case "sfixed64":
                    A('if(typeof m%s==="number")', Z)("d%s=o.longs===String?String(m%s):m%s", Z, Z, Z)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", Z, Z, Z, Z, D ? "true" : "", Z);
                    break;
                case "bytes":
                    A("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", Z, Z, Z, Z, Z);
                    break;
                default:
                    A("d%s=m%s", Z, Z);
                    break
            }
        }
        return A
    }
    To2.toObject = function A(B) {
        var Q = B.fieldsArray.slice().sort(IM.compareFieldsById);
        if (!Q.length) return IM.codegen()("return {}");
        var Z = IM.codegen(["m", "o"], B.name + "$toObject")("if(!o)")("o={}")("var d={}"),
            D = [],
            G = [],
            F = [],
            I = 0;
        for (; I < Q.length; ++I)
            if (!Q[I].partOf)(Q[I].resolve().repeated ? D : Q[I].map ? G : F).push(Q[I]);
        if (D.length) {
            Z("if(o.arrays||o.defaults){");
            for (I = 0; I < D.length; ++I) Z("d%s=[]", IM.safeProp(D[I].name));
            Z("}")
        }
        if (G.length) {
            Z("if(o.objects||o.defaults){");
            for (I = 0; I < G.length; ++I) Z("d%s={}", IM.safeProp(G[I].name));
            Z("}")
        }
        if (F.length) {
            Z("if(o.defaults){");
            for (I = 0; I < F.length; ++I) {
                var Y = F[I],
                    W = IM.safeProp(Y.name);
                if (Y.resolvedType instanceof V71) Z("d%s=o.enums===String?%j:%j", W, Y.resolvedType.valuesById[Y.typeDefault], Y.typeDefault);
                else if (Y.long) Z("if(util.Long){")("var n=new util.Long(%i,%i,%j)", Y.typeDefault.low, Y.typeDefault.high, Y.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", W)("}else")("d%s=o.longs===String?%j:%i", W, Y.typeDefault.toString(), Y.typeDefault.toNumber());
                else if (Y.bytes) {
                    var J = "[" + Array.prototype.slice.call(Y.typeDefault).join(",") + "]";
                    Z("if(o.bytes===String)d%s=%j", W, String.fromCharCode.apply(String, Y.typeDefault))("else{")("d%s=%s", W, J)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", W, W)("}")
                } else Z("d%s=%j", W, Y.typeDefault)
            }
            Z("}")
        }
        var X = !1;
        for (I = 0; I < Q.length; ++I) {
            var Y = Q[I],
                V = B._fieldsArray.indexOf(Y),
                W = IM.safeProp(Y.name);
            if (Y.map) {
                if (!X) X = !0, Z("var ks2");
                Z("if(m%s&&(ks2=Object.keys(m%s)).length){", W, W)("d%s={}", W)("for(var j=0;j<ks2.length;++j){"), eJ0(Z, Y, V, W + "[ks2[j]]")("}")
            } else if (Y.repeated) Z("if(m%s&&m%s.length){", W, W)("d%s=[]", W)("for(var j=0;j<m%s.length;++j){", W), eJ0(Z, Y, V, W + "[j]")("}");
            else if (Z("if(m%s!=null&&m.hasOwnProperty(%j)){", W, Y.name), eJ0(Z, Y, V, W), Y.partOf) Z("if(o.oneofs)")("d%s=%j", IM.safeProp(Y.partOf.name), Y.name);
            Z("}")
        }
        return Z("return d")
    }
});
var BX0 = E((So2) => {
    var XH6 = So2,
        VH6 = bP1();
    XH6[".google.protobuf.Any"] = {
        fromObject: function(A) {
            if (A && A["@type"]) {
                var B = A["@type"].substring(A["@type"].lastIndexOf("/") + 1),
                    Q = this.lookup(B);
                if (Q) {
                    var Z = A["@type"].charAt(0) === "." ? A["@type"].slice(1) : A["@type"];
                    if (Z.indexOf("/") === -1) Z = "/" + Z;
                    return this.create({
                        type_url: Z,
                        value: Q.encode(Q.fromObject(A)).finish()
                    })
                }
            }
            return this.fromObject(A)
        },
        toObject: function(A, B) {
            var Q = "type.googleapis.com/",
                Z = "",
                D = "";
            if (B && B.json && A.type_url && A.value) {
                D = A.type_url.substring(A.type_url.lastIndexOf("/") + 1), Z = A.type_url.substring(0, A.type_url.lastIndexOf("/") + 1);
                var G = this.lookup(D);
                if (G) A = G.decode(A.value)
            }
            if (!(A instanceof this.ctor) && A instanceof VH6) {
                var F = A.$type.toObject(A, B),
                    I = A.$type.fullName[0] === "." ? A.$type.fullName.slice(1) : A.$type.fullName;
                if (Z === "") Z = Q;
                return D = Z + I, F["@type"] = D, F
            }
            return this.toObject(A, B)
        }
    }
});