/* chunk:329 bytes:[7897594, 7915221) size:17627 source:unpacked-cli.js */
var gP1 = E((Ep5, ko2) => {
    ko2.exports = Y7;
    var J$ = vt();
    ((Y7.prototype = Object.create(J$.prototype)).constructor = Y7).className = "Type";
    var CH6 = W$(),
        DX0 = yt(),
        fP1 = Xx(),
        KH6 = _P1(),
        HH6 = vP1(),
        QX0 = bP1(),
        ZX0 = BP1(),
        zH6 = eT1(),
        YJ = qI(),
        EH6 = GX0(),
        UH6 = aJ0(),
        wH6 = oJ0(),
        jo2 = AX0(),
        $H6 = BX0();

    function Y7(A, B) {
        J$.call(this, A, B), this.fields = {}, this.oneofs = void 0, this.extensions = void 0, this.reserved = void 0, this.group = void 0, this._fieldsById = null, this._fieldsArray = null, this._oneofsArray = null, this._ctor = null
    }
    Object.defineProperties(Y7.prototype, {
        fieldsById: {
            get: function() {
                if (this._fieldsById) return this._fieldsById;
                this._fieldsById = {};
                for (var A = Object.keys(this.fields), B = 0; B < A.length; ++B) {
                    var Q = this.fields[A[B]],
                        Z = Q.id;
                    if (this._fieldsById[Z]) throw Error("duplicate id " + Z + " in " + this);
                    this._fieldsById[Z] = Q
                }
                return this._fieldsById
            }
        },
        fieldsArray: {
            get: function() {
                return this._fieldsArray || (this._fieldsArray = YJ.toArray(this.fields))
            }
        },
        oneofsArray: {
            get: function() {
                return this._oneofsArray || (this._oneofsArray = YJ.toArray(this.oneofs))
            }
        },
        ctor: {
            get: function() {
                return this._ctor || (this.ctor = Y7.generateConstructor(this)())
            },
            set: function(A) {
                var B = A.prototype;
                if (!(B instanceof QX0))(A.prototype = new QX0).constructor = A, YJ.merge(A.prototype, B);
                A.$type = A.prototype.$type = this, YJ.merge(A, QX0, !0), this._ctor = A;
                var Q = 0;
                for (; Q < this.fieldsArray.length; ++Q) this._fieldsArray[Q].resolve();
                var Z = {};
                for (Q = 0; Q < this.oneofsArray.length; ++Q) Z[this._oneofsArray[Q].resolve().name] = {
                    get: YJ.oneOfGetter(this._oneofsArray[Q].oneof),
                    set: YJ.oneOfSetter(this._oneofsArray[Q].oneof)
                };
                if (Q) Object.defineProperties(A.prototype, Z)
            }
        }
    });
    Y7.generateConstructor = function A(B) {
        var Q = YJ.codegen(["p"], B.name);
        for (var Z = 0, D; Z < B.fieldsArray.length; ++Z)
            if ((D = B._fieldsArray[Z]).map) Q("this%s={}", YJ.safeProp(D.name));
            else if (D.repeated) Q("this%s=[]", YJ.safeProp(D.name));
        return Q("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]")
    };

    function hP1(A) {
        return A._fieldsById = A._fieldsArray = A._oneofsArray = null, delete A.encode, delete A.decode, delete A.verify, A
    }
    Y7.fromJSON = function A(B, Q) {
        var Z = new Y7(B, Q.options);
        Z.extensions = Q.extensions, Z.reserved = Q.reserved;
        var D = Object.keys(Q.fields),
            G = 0;
        for (; G < D.length; ++G) Z.add((typeof Q.fields[D[G]].keyType !== "undefined" ? KH6.fromJSON : fP1.fromJSON)(D[G], Q.fields[D[G]]));
        if (Q.oneofs)
            for (D = Object.keys(Q.oneofs), G = 0; G < D.length; ++G) Z.add(DX0.fromJSON(D[G], Q.oneofs[D[G]]));
        if (Q.nested)
            for (D = Object.keys(Q.nested), G = 0; G < D.length; ++G) {
                var F = Q.nested[D[G]];
                Z.add((F.id !== void 0 ? fP1.fromJSON : F.fields !== void 0 ? Y7.fromJSON : F.values !== void 0 ? CH6.fromJSON : F.methods !== void 0 ? HH6.fromJSON : J$.fromJSON)(D[G], F))
            }
        if (Q.extensions && Q.extensions.length) Z.extensions = Q.extensions;
        if (Q.reserved && Q.reserved.length) Z.reserved = Q.reserved;
        if (Q.group) Z.group = !0;
        if (Q.comment) Z.comment = Q.comment;
        return Z
    };
    Y7.prototype.toJSON = function A(B) {
        var Q = J$.prototype.toJSON.call(this, B),
            Z = B ? Boolean(B.keepComments) : !1;
        return YJ.toObject(["options", Q && Q.options || void 0, "oneofs", J$.arrayToJSON(this.oneofsArray, B), "fields", J$.arrayToJSON(this.fieldsArray.filter(function(D) {
            return !D.declaringField
        }), B) || {}, "extensions", this.extensions && this.extensions.length ? this.extensions : void 0, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "group", this.group || void 0, "nested", Q && Q.nested || void 0, "comment", Z ? this.comment : void 0])
    };
    Y7.prototype.resolveAll = function A() {
        var B = this.fieldsArray,
            Q = 0;
        while (Q < B.length) B[Q++].resolve();
        var Z = this.oneofsArray;
        Q = 0;
        while (Q < Z.length) Z[Q++].resolve();
        return J$.prototype.resolveAll.call(this)
    };
    Y7.prototype.get = function A(B) {
        return this.fields[B] || this.oneofs && this.oneofs[B] || this.nested && this.nested[B] || null
    };
    Y7.prototype.add = function A(B) {
        if (this.get(B.name)) throw Error("duplicate name '" + B.name + "' in " + this);
        if (B instanceof fP1 && B.extend === void 0) {
            if (this._fieldsById ? this._fieldsById[B.id] : this.fieldsById[B.id]) throw Error("duplicate id " + B.id + " in " + this);
            if (this.isReservedId(B.id)) throw Error("id " + B.id + " is reserved in " + this);
            if (this.isReservedName(B.name)) throw Error("name '" + B.name + "' is reserved in " + this);
            if (B.parent) B.parent.remove(B);
            return this.fields[B.name] = B, B.message = this, B.onAdd(this), hP1(this)
        }
        if (B instanceof DX0) {
            if (!this.oneofs) this.oneofs = {};
            return this.oneofs[B.name] = B, B.onAdd(this), hP1(this)
        }
        return J$.prototype.add.call(this, B)
    };
    Y7.prototype.remove = function A(B) {
        if (B instanceof fP1 && B.extend === void 0) {
            if (!this.fields || this.fields[B.name] !== B) throw Error(B + " is not a member of " + this);
            return delete this.fields[B.name], B.parent = null, B.onRemove(this), hP1(this)
        }
        if (B instanceof DX0) {
            if (!this.oneofs || this.oneofs[B.name] !== B) throw Error(B + " is not a member of " + this);
            return delete this.oneofs[B.name], B.parent = null, B.onRemove(this), hP1(this)
        }
        return J$.prototype.remove.call(this, B)
    };
    Y7.prototype.isReservedId = function A(B) {
        return J$.isReservedId(this.reserved, B)
    };
    Y7.prototype.isReservedName = function A(B) {
        return J$.isReservedName(this.reserved, B)
    };
    Y7.prototype.create = function A(B) {
        return new this.ctor(B)
    };
    Y7.prototype.setup = function A() {
        var B = this.fullName,
            Q = [];
        for (var Z = 0; Z < this.fieldsArray.length; ++Z) Q.push(this._fieldsArray[Z].resolve().resolvedType);
        this.encode = EH6(this)({
            Writer: zH6,
            types: Q,
            util: YJ
        }), this.decode = UH6(this)({
            Reader: ZX0,
            types: Q,
            util: YJ
        }), this.verify = wH6(this)({
            types: Q,
            util: YJ
        }), this.fromObject = jo2.fromObject(this)({
            types: Q,
            util: YJ
        }), this.toObject = jo2.toObject(this)({
            types: Q,
            util: YJ
        });
        var D = $H6[B];
        if (D) {
            var G = Object.create(this);
            G.fromObject = this.fromObject, this.fromObject = D.fromObject.bind(G), G.toObject = this.toObject, this.toObject = D.toObject.bind(G)
        }
        return this
    };
    Y7.prototype.encode = function A(B, Q) {
        return this.setup().encode(B, Q)
    };
    Y7.prototype.encodeDelimited = function A(B, Q) {
        return this.encode(B, Q && Q.len ? Q.fork() : Q).ldelim()
    };
    Y7.prototype.decode = function A(B, Q) {
        return this.setup().decode(B, Q)
    };
    Y7.prototype.decodeDelimited = function A(B) {
        if (!(B instanceof ZX0)) B = ZX0.create(B);
        return this.decode(B, B.uint32())
    };
    Y7.prototype.verify = function A(B) {
        return this.setup().verify(B)
    };
    Y7.prototype.fromObject = function A(B) {
        return this.setup().fromObject(B)
    };
    Y7.prototype.toObject = function A(B, Q) {
        return this.setup().toObject(B, Q)
    };
    Y7.d = function A(B) {
        return function Q(Z) {
            YJ.decorateType(Z, B)
        }
    }
});
var dP1 = E((Up5, bo2) => {
    bo2.exports = hK;
    var mP1 = vt();
    ((hK.prototype = Object.create(mP1.prototype)).constructor = hK).className = "Root";
    var IX0 = Xx(),
        _o2 = W$(),
        qH6 = yt(),
        Cx = qI(),
        xo2, FX0, C71;

    function hK(A) {
        mP1.call(this, "", A), this.deferred = [], this.files = []
    }
    hK.fromJSON = function A(B, Q) {
        if (!Q) Q = new hK;
        if (B.options) Q.setOptions(B.options);
        return Q.addJSON(B.nested)
    };
    hK.prototype.resolvePath = Cx.path.resolve;
    hK.prototype.fetch = Cx.fetch;

    function vo2() {}
    hK.prototype.load = function A(B, Q, Z) {
        if (typeof Q === "function") Z = Q, Q = void 0;
        var D = this;
        if (!Z) return Cx.asPromise(A, D, B, Q);
        var G = Z === vo2;

        function F(C, K) {
            if (!Z) return;
            if (G) throw C;
            var H = Z;
            Z = null, H(C, K)
        }

        function I(C) {
            var K = C.lastIndexOf("google/protobuf/");
            if (K > -1) {
                var H = C.substring(K);
                if (H in C71) return H
            }
            return null
        }

        function Y(C, K) {
            try {
                if (Cx.isString(K) && K.charAt(0) === "{") K = JSON.parse(K);
                if (!Cx.isString(K)) D.setOptions(K.options).addJSON(K.nested);
                else {
                    FX0.filename = C;
                    var H = FX0(K, D, Q),
                        z, $ = 0;
                    if (H.imports) {
                        for (; $ < H.imports.length; ++$)
                            if (z = I(H.imports[$]) || D.resolvePath(C, H.imports[$])) W(z)
                    }
                    if (H.weakImports) {
                        for ($ = 0; $ < H.weakImports.length; ++$)
                            if (z = I(H.weakImports[$]) || D.resolvePath(C, H.weakImports[$])) W(z, !0)
                    }
                }
            } catch (L) {
                F(L)
            }
            if (!G && !J) F(null, D)
        }

        function W(C, K) {
            if (C = I(C) || C, D.files.indexOf(C) > -1) return;
            if (D.files.push(C), C in C71) {
                if (G) Y(C, C71[C]);
                else ++J, setTimeout(function() {
                    --J, Y(C, C71[C])
                });
                return
            }
            if (G) {
                var H;
                try {
                    H = Cx.fs.readFileSync(C).toString("utf8")
                } catch (z) {
                    if (!K) F(z);
                    return
                }
                Y(C, H)
            } else ++J, D.fetch(C, function(z, $) {
                if (--J, !Z) return;
                if (z) {
                    if (!K) F(z);
                    else if (!J) F(null, D);
                    return
                }
                Y(C, $)
            })
        }
        var J = 0;
        if (Cx.isString(B)) B = [B];
        for (var X = 0, V; X < B.length; ++X)
            if (V = D.resolvePath("", B[X])) W(V);
        if (G) return D;
        if (!J) F(null, D);
        return
    };
    hK.prototype.loadSync = function A(B, Q) {
        if (!Cx.isNode) throw Error("not supported");
        return this.load(B, Q, vo2)
    };
    hK.prototype.resolveAll = function A() {
        if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function(B) {
            return "'extend " + B.extend + "' in " + B.parent.fullName
        }).join(", "));
        return mP1.prototype.resolveAll.call(this)
    };
    var uP1 = /^[A-Z]/;

    function yo2(A, B) {
        var Q = B.parent.lookup(B.extend);
        if (Q) {
            var Z = new IX0(B.fullName, B.id, B.type, B.rule, void 0, B.options);
            if (Q.get(Z.name)) return !0;
            return Z.declaringField = B, B.extensionField = Z, Q.add(Z), !0
        }
        return !1
    }
    hK.prototype._handleAdd = function A(B) {
        if (B instanceof IX0) {
            if (B.extend !== void 0 && !B.extensionField) {
                if (!yo2(this, B)) this.deferred.push(B)
            }
        } else if (B instanceof _o2) {
            if (uP1.test(B.name)) B.parent[B.name] = B.values
        } else if (!(B instanceof qH6)) {
            if (B instanceof xo2)
                for (var Q = 0; Q < this.deferred.length;)
                    if (yo2(this, this.deferred[Q])) this.deferred.splice(Q, 1);
                    else ++Q;
            for (var Z = 0; Z < B.nestedArray.length; ++Z) this._handleAdd(B._nestedArray[Z]);
            if (uP1.test(B.name)) B.parent[B.name] = B
        }
    };
    hK.prototype._handleRemove = function A(B) {
        if (B instanceof IX0) {
            if (B.extend !== void 0)
                if (B.extensionField) B.extensionField.parent.remove(B.extensionField), B.extensionField = null;
                else {
                    var Q = this.deferred.indexOf(B);
                    if (Q > -1) this.deferred.splice(Q, 1)
                }
        } else if (B instanceof _o2) {
            if (uP1.test(B.name)) delete B.parent[B.name]
        } else if (B instanceof mP1) {
            for (var Z = 0; Z < B.nestedArray.length; ++Z) this._handleRemove(B._nestedArray[Z]);
            if (uP1.test(B.name)) delete B.parent[B.name]
        }
    };
    hK._configure = function(A, B, Q) {
        xo2 = A, FX0 = B, C71 = Q
    }
});
var qI = E((wp5, ho2) => {
    var CG = ho2.exports = QM(),
        fo2 = gW0(),
        YX0, WX0;
    CG.codegen = Qo2();
    CG.fetch = Do2();
    CG.path = Io2();
    CG.fs = CG.inquire("fs");
    CG.toArray = function A(B) {
        if (B) {
            var Q = Object.keys(B),
                Z = new Array(Q.length),
                D = 0;
            while (D < Q.length) Z[D] = B[Q[D++]];
            return Z
        }
        return []
    };
    CG.toObject = function A(B) {
        var Q = {},
            Z = 0;
        while (Z < B.length) {
            var D = B[Z++],
                G = B[Z++];
            if (G !== void 0) Q[D] = G
        }
        return Q
    };
    var NH6 = /\\/g,
        LH6 = /"/g;
    CG.isReserved = function A(B) {
        return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(B)
    };
    CG.safeProp = function A(B) {
        if (!/^[$\w_]+$/.test(B) || CG.isReserved(B)) return '["' + B.replace(NH6, "\\\\").replace(LH6, "\\\"") + '"]';
        return "." + B
    };
    CG.ucFirst = function A(B) {
        return B.charAt(0).toUpperCase() + B.substring(1)
    };
    var MH6 = /_([a-z])/g;
    CG.camelCase = function A(B) {
        return B.substring(0, 1) + B.substring(1).replace(MH6, function(Q, Z) {
            return Z.toUpperCase()
        })
    };
    CG.compareFieldsById = function A(B, Q) {
        return B.id - Q.id
    };
    CG.decorateType = function A(B, Q) {
        if (B.$type) {
            if (Q && B.$type.name !== Q) CG.decorateRoot.remove(B.$type), B.$type.name = Q, CG.decorateRoot.add(B.$type);
            return B.$type
        }
        if (!YX0) YX0 = gP1();
        var Z = new YX0(Q || B.name);
        return CG.decorateRoot.add(Z), Z.ctor = B, Object.defineProperty(B, "$type", {
            value: Z,
            enumerable: !1
        }), Object.defineProperty(B.prototype, "$type", {
            value: Z,
            enumerable: !1
        }), Z
    };
    var RH6 = 0;
    CG.decorateEnum = function A(B) {
        if (B.$type) return B.$type;
        if (!WX0) WX0 = W$();
        var Q = new WX0("Enum" + RH6++, B);
        return CG.decorateRoot.add(Q), Object.defineProperty(B, "$type", {
            value: Q,
            enumerable: !1
        }), Q
    };
    CG.setProperty = function A(B, Q, Z) {
        function D(G, F, I) {
            var Y = F.shift();
            if (Y === "__proto__" || Y === "prototype") return G;
            if (F.length > 0) G[Y] = D(G[Y] || {}, F, I);
            else {
                var W = G[Y];
                if (W) I = [].concat(W).concat(I);
                G[Y] = I
            }
            return G
        }
        if (typeof B !== "object") throw TypeError("dst must be an object");
        if (!Q) throw TypeError("path must be specified");
        return Q = Q.split("."), D(B, Q, Z)
    };
    Object.defineProperty(CG, "decorateRoot", {
        get: function() {
            return fo2.decorated || (fo2.decorated = new(dP1()))
        }
    })
});