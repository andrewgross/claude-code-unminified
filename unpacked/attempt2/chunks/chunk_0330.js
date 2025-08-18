/* chunk:330 bytes:[7915222, 7929505) size:14283 source:unpacked-cli.js */
var Vm = E(($p5, go2) => {
    go2.exports = gK;
    gK.className = "ReflectionObject";
    var cP1 = qI(),
        lP1;

    function gK(A, B) {
        if (!cP1.isString(A)) throw TypeError("name must be a string");
        if (B && !cP1.isObject(B)) throw TypeError("options must be an object");
        this.options = B, this.parsedOptions = null, this.name = A, this.parent = null, this.resolved = !1, this.comment = null, this.filename = null
    }
    Object.defineProperties(gK.prototype, {
        root: {
            get: function() {
                var A = this;
                while (A.parent !== null) A = A.parent;
                return A
            }
        },
        fullName: {
            get: function() {
                var A = [this.name],
                    B = this.parent;
                while (B) A.unshift(B.name), B = B.parent;
                return A.join(".")
            }
        }
    });
    gK.prototype.toJSON = function A() {
        throw Error()
    };
    gK.prototype.onAdd = function A(B) {
        if (this.parent && this.parent !== B) this.parent.remove(this);
        this.parent = B, this.resolved = !1;
        var Q = B.root;
        if (Q instanceof lP1) Q._handleAdd(this)
    };
    gK.prototype.onRemove = function A(B) {
        var Q = B.root;
        if (Q instanceof lP1) Q._handleRemove(this);
        this.parent = null, this.resolved = !1
    };
    gK.prototype.resolve = function A() {
        if (this.resolved) return this;
        if (this.root instanceof lP1) this.resolved = !0;
        return this
    };
    gK.prototype.getOption = function A(B) {
        if (this.options) return this.options[B];
        return
    };
    gK.prototype.setOption = function A(B, Q, Z) {
        if (!Z || !this.options || this.options[B] === void 0)(this.options || (this.options = {}))[B] = Q;
        return this
    };
    gK.prototype.setParsedOption = function A(B, Q, Z) {
        if (!this.parsedOptions) this.parsedOptions = [];
        var D = this.parsedOptions;
        if (Z) {
            var G = D.find(function(Y) {
                return Object.prototype.hasOwnProperty.call(Y, B)
            });
            if (G) {
                var F = G[B];
                cP1.setProperty(F, Z, Q)
            } else G = {}, G[B] = cP1.setProperty({}, Z, Q), D.push(G)
        } else {
            var I = {};
            I[B] = Q, D.push(I)
        }
        return this
    };
    gK.prototype.setOptions = function A(B, Q) {
        if (B)
            for (var Z = Object.keys(B), D = 0; D < Z.length; ++D) this.setOption(Z[D], B[Z[D]], Q);
        return this
    };
    gK.prototype.toString = function A() {
        var B = this.constructor.className,
            Q = this.fullName;
        if (Q.length) return B + " " + Q;
        return B
    };
    gK._configure = function(A) {
        lP1 = A
    }
});
var W$ = E((qp5, do2) => {
    do2.exports = YM;
    var uo2 = Vm();
    ((YM.prototype = Object.create(uo2.prototype)).constructor = YM).className = "Enum";
    var mo2 = vt(),
        pP1 = qI();

    function YM(A, B, Q, Z, D, G) {
        if (uo2.call(this, A, Q), B && typeof B !== "object") throw TypeError("values must be an object");
        if (this.valuesById = {}, this.values = Object.create(this.valuesById), this.comment = Z, this.comments = D || {}, this.valuesOptions = G, this.reserved = void 0, B) {
            for (var F = Object.keys(B), I = 0; I < F.length; ++I)
                if (typeof B[F[I]] === "number") this.valuesById[this.values[F[I]] = B[F[I]]] = F[I]
        }
    }
    YM.fromJSON = function A(B, Q) {
        var Z = new YM(B, Q.values, Q.options, Q.comment, Q.comments);
        return Z.reserved = Q.reserved, Z
    };
    YM.prototype.toJSON = function A(B) {
        var Q = B ? Boolean(B.keepComments) : !1;
        return pP1.toObject(["options", this.options, "valuesOptions", this.valuesOptions, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "comment", Q ? this.comment : void 0, "comments", Q ? this.comments : void 0])
    };
    YM.prototype.add = function A(B, Q, Z, D) {
        if (!pP1.isString(B)) throw TypeError("name must be a string");
        if (!pP1.isInteger(Q)) throw TypeError("id must be an integer");
        if (this.values[B] !== void 0) throw Error("duplicate name '" + B + "' in " + this);
        if (this.isReservedId(Q)) throw Error("id " + Q + " is reserved in " + this);
        if (this.isReservedName(B)) throw Error("name '" + B + "' is reserved in " + this);
        if (this.valuesById[Q] !== void 0) {
            if (!(this.options && this.options.allow_alias)) throw Error("duplicate id " + Q + " in " + this);
            this.values[B] = Q
        } else this.valuesById[this.values[B] = Q] = B;
        if (D) {
            if (this.valuesOptions === void 0) this.valuesOptions = {};
            this.valuesOptions[B] = D || null
        }
        return this.comments[B] = Z || null, this
    };
    YM.prototype.remove = function A(B) {
        if (!pP1.isString(B)) throw TypeError("name must be a string");
        var Q = this.values[B];
        if (Q == null) throw Error("name '" + B + "' does not exist in " + this);
        if (delete this.valuesById[Q], delete this.values[B], delete this.comments[B], this.valuesOptions) delete this.valuesOptions[B];
        return this
    };
    YM.prototype.isReservedId = function A(B) {
        return mo2.isReservedId(this.reserved, B)
    };
    YM.prototype.isReservedName = function A(B) {
        return mo2.isReservedName(this.reserved, B)
    }
});
var GX0 = E((Np5, lo2) => {
    lo2.exports = TH6;
    var OH6 = W$(),
        JX0 = Xm(),
        XX0 = qI();

    function co2(A, B, Q, Z) {
        return B.resolvedType.group ? A("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", Q, Z, (B.id << 3 | 3) >>> 0, (B.id << 3 | 4) >>> 0) : A("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", Q, Z, (B.id << 3 | 2) >>> 0)
    }

    function TH6(A) {
        var B = XX0.codegen(["m", "w"], A.name + "$encode")("if(!w)")("w=Writer.create()"),
            Q, Z, D = A.fieldsArray.slice().sort(XX0.compareFieldsById);
        for (var Q = 0; Q < D.length; ++Q) {
            var G = D[Q].resolve(),
                F = A._fieldsArray.indexOf(G),
                I = G.resolvedType instanceof OH6 ? "int32" : G.type,
                Y = JX0.basic[I];
            if (Z = "m" + XX0.safeProp(G.name), G.map) {
                if (B("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", Z, G.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", Z)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (G.id << 3 | 2) >>> 0, 8 | JX0.mapKey[G.keyType], G.keyType), Y === void 0) B("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", F, Z);
                else B(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | Y, I, Z);
                B("}")("}")
            } else if (G.repeated) {
                if (B("if(%s!=null&&%s.length){", Z, Z), G.packed && JX0.packed[I] !== void 0) B("w.uint32(%i).fork()", (G.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", Z)("w.%s(%s[i])", I, Z)("w.ldelim()");
                else if (B("for(var i=0;i<%s.length;++i)", Z), Y === void 0) co2(B, G, F, Z + "[i]");
                else B("w.uint32(%i).%s(%s[i])", (G.id << 3 | Y) >>> 0, I, Z);
                B("}")
            } else {
                if (G.optional) B("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", Z, G.name);
                if (Y === void 0) co2(B, G, F, Z);
                else B("w.uint32(%i).%s(%s)", (G.id << 3 | Y) >>> 0, I, Z)
            }
        }
        return B("return w")
    }
});
var io2 = E((Lp5, po2) => {
    var V8 = po2.exports = uW0();
    V8.build = "light";

    function PH6(A, B, Q) {
        if (typeof B === "function") Q = B, B = new V8.Root;
        else if (!B) B = new V8.Root;
        return B.load(A, Q)
    }
    V8.load = PH6;

    function SH6(A, B) {
        if (!B) B = new V8.Root;
        return B.loadSync(A)
    }
    V8.loadSync = SH6;
    V8.encoder = GX0();
    V8.decoder = aJ0();
    V8.verifier = oJ0();
    V8.converter = AX0();
    V8.ReflectionObject = Vm();
    V8.Namespace = vt();
    V8.Root = dP1();
    V8.Enum = W$();
    V8.Type = gP1();
    V8.Field = Xx();
    V8.OneOf = yt();
    V8.MapField = _P1();
    V8.Service = vP1();
    V8.Method = xP1();
    V8.Message = bP1();
    V8.wrappers = BX0();
    V8.types = Xm();
    V8.util = qI();
    V8.ReflectionObject._configure(V8.Root);
    V8.Namespace._configure(V8.Type, V8.Service, V8.Enum);
    V8.Root._configure(V8.Type);
    V8.Field._configure(V8.Type)
});
var CX0 = E((Mp5, so2) => {
    so2.exports = ao2;
    var VX0 = /[\s{}=;:[\],'"()<>]/g,
        jH6 = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
        kH6 = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
        yH6 = /^ *[*/]+ */,
        _H6 = /^\s*\*?\/*/,
        xH6 = /\n/g,
        vH6 = /\s/,
        bH6 = /\\(.?)/g,
        fH6 = {
            "0": "\x00",
            r: "\r",
            n: `
`,
            t: "\t"
        };

    function no2(A) {
        return A.replace(bH6, function(B, Q) {
            switch (Q) {
                case "\\":
                case "":
                    return Q;
                default:
                    return fH6[Q] || ""
            }
        })
    }
    ao2.unescape = no2;

    function ao2(A, B) {
        A = A.toString();
        var Q = 0,
            Z = A.length,
            D = 1,
            G = 0,
            F = {},
            I = [],
            Y = null;

        function W(R) {
            return Error("illegal " + R + " (line " + D + ")")
        }

        function J() {
            var R = Y === "'" ? kH6 : jH6;
            R.lastIndex = Q - 1;
            var O = R.exec(A);
            if (!O) throw W("string");
            return Q = R.lastIndex, z(Y), Y = null, no2(O[1])
        }

        function X(R) {
            return A.charAt(R)
        }

        function V(R, O, P) {
            var j = {
                    type: A.charAt(R++),
                    lineEmpty: !1,
                    leading: P
                },
                f;
            if (B) f = 2;
            else f = 3;
            var k = R - f,
                c;
            do
                if (--k < 0 || (c = A.charAt(k)) === `
`) {
                    j.lineEmpty = !0;
                    break
                } while (c === " " || c === "\t");
            var u = A.substring(R, O).split(xH6);
            for (var a = 0; a < u.length; ++a) u[a] = u[a].replace(B ? _H6 : yH6, "").trim();
            j.text = u.join(`
`).trim(), F[D] = j, G = D
        }

        function C(R) {
            var O = K(R),
                P = A.substring(R, O),
                j = /^\s*\/\//.test(P);
            return j
        }

        function K(R) {
            var O = R;
            while (O < Z && X(O) !== `
`) O++;
            return O
        }

        function H() {
            if (I.length > 0) return I.shift();
            if (Y) return J();
            var R, O, P, j, f, k = Q === 0;
            do {
                if (Q === Z) return null;
                R = !1;
                while (vH6.test(P = X(Q))) {
                    if (P === `
`) k = !0, ++D;
                    if (++Q === Z) return null
                }
                if (X(Q) === "/") {
                    if (++Q === Z) throw W("comment");
                    if (X(Q) === "/")
                        if (!B) {
                            f = X(j = Q + 1) === "/";
                            while (X(++Q) !== `
`)
                                if (Q === Z) return null;
                            if (++Q, f) V(j, Q - 1, k), k = !0;
                            ++D, R = !0
                        } else {
                            if (j = Q, f = !1, C(Q - 1)) {
                                f = !0;
                                do {
                                    if (Q = K(Q), Q === Z) break;
                                    if (Q++, !k) break
                                } while (C(Q))
                            } else Q = Math.min(Z, K(Q) + 1);
                            if (f) V(j, Q, k), k = !0;
                            D++, R = !0
                        }
                    else if ((P = X(Q)) === "*") {
                        j = Q + 1, f = B || X(j) === "*";
                        do {
                            if (P === `
`) ++D;
                            if (++Q === Z) throw W("comment");
                            O = P, P = X(Q)
                        } while (O !== "*" || P !== "/");
                        if (++Q, f) V(j, Q - 2, k), k = !0;
                        R = !0
                    } else return "/"
                }
            } while (R);
            var c = Q;
            VX0.lastIndex = 0;
            var u = VX0.test(X(c++));
            if (!u)
                while (c < Z && !VX0.test(X(c))) ++c;
            var a = A.substring(Q, Q = c);
            if (a === '"' || a === "'") Y = a;
            return a
        }

        function z(R) {
            I.push(R)
        }

        function $() {
            if (!I.length) {
                var R = H();
                if (R === null) return null;
                z(R)
            }
            return I[0]
        }

        function L(R, O) {
            var P = $(),
                j = P === R;
            if (j) return H(), !0;
            if (!O) throw W("token '" + P + "', '" + R + "' expected");
            return !1
        }

        function N(R) {
            var O = null,
                P;
            if (R === void 0) {
                if (P = F[D - 1], delete F[D - 1], P && (B || P.type === "*" || P.lineEmpty)) O = P.leading ? P.text : null
            } else {
                if (G < R) $();
                if (P = F[R], delete F[R], P && !P.lineEmpty && (B || P.type === "/")) O = P.leading ? null : P.text
            }
            return O
        }
        return Object.defineProperty({
            next: H,
            peek: $,
            push: z,
            skip: L,
            cmnt: N
        }, "line", {
            get: function() {
                return D
            }
        })
    }
});