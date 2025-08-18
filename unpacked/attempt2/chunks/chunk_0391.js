/* chunk:391 bytes:[9174888, 9193555) size:18667 source:unpacked-cli.js */
var cH0 = E((n23, kZB) => {
    var MZB = B7B(),
        bm = dk1(),
        U_6 = Z7B(),
        RZB = OH0(),
        w_6 = yH0(),
        $_6 = H7B(),
        q_6 = YZB(),
        OZB = XZB(),
        TZB = vm();
    kZB.exports = UD;
    UD.prototype.validate = L_6;
    UD.prototype.compile = M_6;
    UD.prototype.addSchema = R_6;
    UD.prototype.addMetaSchema = O_6;
    UD.prototype.validateSchema = T_6;
    UD.prototype.getSchema = S_6;
    UD.prototype.removeSchema = k_6;
    UD.prototype.addFormat = g_6;
    UD.prototype.errorsText = h_6;
    UD.prototype._addSchema = y_6;
    UD.prototype._compile = __6;
    UD.prototype.compileAsync = KZB();
    var ok1 = qZB();
    UD.prototype.addKeyword = ok1.add;
    UD.prototype.getKeyword = ok1.get;
    UD.prototype.removeKeyword = ok1.remove;
    UD.prototype.validateKeyword = ok1.validate;
    var PZB = ck1();
    UD.ValidationError = PZB.Validation;
    UD.MissingRefError = PZB.MissingRef;
    UD.$dataMetaSchema = OZB;
    var rk1 = "http://json-schema.org/draft-07/schema",
        LZB = ["removeAdditional", "useDefaults", "coerceTypes", "strictDefaults"],
        N_6 = ["/properties"];

    function UD(A) {
        if (!(this instanceof UD)) return new UD(A);
        if (A = this._opts = TZB.copy(A) || {}, p_6(this), this._schemas = {}, this._refs = {}, this._fragments = {}, this._formats = $_6(A.format), this._cache = A.cache || new U_6, this._loadingSchemas = {}, this._compilations = [], this.RULES = q_6(), this._getId = x_6(A), A.loopRequired = A.loopRequired || 1 / 0, A.errorDataPath == "property") A._errorDataPathProperty = !0;
        if (A.serialize === void 0) A.serialize = w_6;
        if (this._metaOpts = l_6(this), A.formats) d_6(this);
        if (A.keywords) c_6(this);
        if (u_6(this), typeof A.meta == "object") this.addMetaSchema(A.meta);
        if (A.nullable) this.addKeyword("nullable", {
            metaSchema: {
                type: "boolean"
            }
        });
        m_6(this)
    }

    function L_6(A, B) {
        var Q;
        if (typeof A == "string") {
            if (Q = this.getSchema(A), !Q) throw new Error('no schema with key or ref "' + A + '"')
        } else {
            var Z = this._addSchema(A);
            Q = Z.validate || this._compile(Z)
        }
        var D = Q(B);
        if (Q.$async !== !0) this.errors = Q.errors;
        return D
    }

    function M_6(A, B) {
        var Q = this._addSchema(A, void 0, B);
        return Q.validate || this._compile(Q)
    }

    function R_6(A, B, Q, Z) {
        if (Array.isArray(A)) {
            for (var D = 0; D < A.length; D++) this.addSchema(A[D], void 0, Q, Z);
            return this
        }
        var G = this._getId(A);
        if (G !== void 0 && typeof G != "string") throw new Error("schema id must be string");
        return B = bm.normalizeId(B || G), jZB(this, B), this._schemas[B] = this._addSchema(A, Q, Z, !0), this
    }

    function O_6(A, B, Q) {
        return this.addSchema(A, B, Q, !0), this
    }

    function T_6(A, B) {
        var Q = A.$schema;
        if (Q !== void 0 && typeof Q != "string") throw new Error("$schema must be a string");
        if (Q = Q || this._opts.defaultMeta || P_6(this), !Q) return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        var Z = this.validate(Q, A);
        if (!Z && B) {
            var D = "schema is invalid: " + this.errorsText();
            if (this._opts.validateSchema == "log") this.logger.error(D);
            else throw new Error(D)
        }
        return Z
    }

    function P_6(A) {
        var B = A._opts.meta;
        return A._opts.defaultMeta = typeof B == "object" ? A._getId(B) || B : A.getSchema(rk1) ? rk1 : void 0, A._opts.defaultMeta
    }

    function S_6(A) {
        var B = SZB(this, A);
        switch (typeof B) {
            case "object":
                return B.validate || this._compile(B);
            case "string":
                return this.getSchema(B);
            case "undefined":
                return j_6(this, A)
        }
    }

    function j_6(A, B) {
        var Q = bm.schema.call(A, {
            schema: {}
        }, B);
        if (Q) {
            var {
                schema: Z,
                root: D,
                baseId: G
            } = Q, F = MZB.call(A, Z, D, void 0, G);
            return A._fragments[B] = new RZB({
                ref: B,
                fragment: !0,
                schema: Z,
                root: D,
                baseId: G,
                validate: F
            }), F
        }
    }

    function SZB(A, B) {
        return B = bm.normalizeId(B), A._schemas[B] || A._refs[B] || A._fragments[B]
    }

    function k_6(A) {
        if (A instanceof RegExp) return sk1(this, this._schemas, A), sk1(this, this._refs, A), this;
        switch (typeof A) {
            case "undefined":
                return sk1(this, this._schemas), sk1(this, this._refs), this._cache.clear(), this;
            case "string":
                var B = SZB(this, A);
                if (B) this._cache.del(B.cacheKey);
                return delete this._schemas[A], delete this._refs[A], this;
            case "object":
                var Q = this._opts.serialize,
                    Z = Q ? Q(A) : A;
                this._cache.del(Z);
                var D = this._getId(A);
                if (D) D = bm.normalizeId(D), delete this._schemas[D], delete this._refs[D]
        }
        return this
    }

    function sk1(A, B, Q) {
        for (var Z in B) {
            var D = B[Z];
            if (!D.meta && (!Q || Q.test(Z))) A._cache.del(D.cacheKey), delete B[Z]
        }
    }

    function y_6(A, B, Q, Z) {
        if (typeof A != "object" && typeof A != "boolean") throw new Error("schema should be object or boolean");
        var D = this._opts.serialize,
            G = D ? D(A) : A,
            F = this._cache.get(G);
        if (F) return F;
        Z = Z || this._opts.addUsedSchema !== !1;
        var I = bm.normalizeId(this._getId(A));
        if (I && Z) jZB(this, I);
        var Y = this._opts.validateSchema !== !1 && !B,
            W;
        if (Y && !(W = I && I == bm.normalizeId(A.$schema))) this.validateSchema(A, !0);
        var J = bm.ids.call(this, A),
            X = new RZB({
                id: I,
                schema: A,
                localRefs: J,
                cacheKey: G,
                meta: Q
            });
        if (I[0] != "#" && Z) this._refs[I] = X;
        if (this._cache.put(G, X), Y && W) this.validateSchema(A, !0);
        return X
    }

    function __6(A, B) {
        if (A.compiling) {
            if (A.validate = D, D.schema = A.schema, D.errors = null, D.root = B ? B : D, A.schema.$async === !0) D.$async = !0;
            return D
        }
        A.compiling = !0;
        var Q;
        if (A.meta) Q = this._opts, this._opts = this._metaOpts;
        var Z;
        try {
            Z = MZB.call(this, A.schema, B, A.localRefs)
        } catch (G) {
            throw delete A.validate, G
        } finally {
            if (A.compiling = !1, A.meta) this._opts = Q
        }
        return A.validate = Z, A.refs = Z.refs, A.refVal = Z.refVal, A.root = Z.root, Z;

        function D() {
            var G = A.validate,
                F = G.apply(this, arguments);
            return D.errors = G.errors, F
        }
    }

    function x_6(A) {
        switch (A.schemaId) {
            case "auto":
                return f_6;
            case "id":
                return v_6;
            default:
                return b_6
        }
    }

    function v_6(A) {
        if (A.$id) this.logger.warn("schema $id ignored", A.$id);
        return A.id
    }

    function b_6(A) {
        if (A.id) this.logger.warn("schema id ignored", A.id);
        return A.$id
    }

    function f_6(A) {
        if (A.$id && A.id && A.$id != A.id) throw new Error("schema $id is different from id");
        return A.$id || A.id
    }

    function h_6(A, B) {
        if (A = A || this.errors, !A) return "No errors";
        B = B || {};
        var Q = B.separator === void 0 ? ", " : B.separator,
            Z = B.dataVar === void 0 ? "data" : B.dataVar,
            D = "";
        for (var G = 0; G < A.length; G++) {
            var F = A[G];
            if (F) D += Z + F.dataPath + " " + F.message + Q
        }
        return D.slice(0, -Q.length)
    }

    function g_6(A, B) {
        if (typeof B == "string") B = new RegExp(B);
        return this._formats[A] = B, this
    }

    function u_6(A) {
        var B;
        if (A._opts.$data) B = NZB(), A.addMetaSchema(B, B.$id, !0);
        if (A._opts.meta === !1) return;
        var Q = uH0();
        if (A._opts.$data) Q = OZB(Q, N_6);
        A.addMetaSchema(Q, rk1, !0), A._refs["http://json-schema.org/schema"] = rk1
    }

    function m_6(A) {
        var B = A._opts.schemas;
        if (!B) return;
        if (Array.isArray(B)) A.addSchema(B);
        else
            for (var Q in B) A.addSchema(B[Q], Q)
    }

    function d_6(A) {
        for (var B in A._opts.formats) {
            var Q = A._opts.formats[B];
            A.addFormat(B, Q)
        }
    }

    function c_6(A) {
        for (var B in A._opts.keywords) {
            var Q = A._opts.keywords[B];
            A.addKeyword(B, Q)
        }
    }

    function jZB(A, B) {
        if (A._schemas[B] || A._refs[B]) throw new Error('schema with key or id "' + B + '" already exists')
    }

    function l_6(A) {
        var B = TZB.copy(A._opts);
        for (var Q = 0; Q < LZB.length; Q++) delete B[LZB[Q]];
        return B
    }

    function p_6(A) {
        var B = A._opts.logger;
        if (B === !1) A.logger = {
            log: dH0,
            warn: dH0,
            error: dH0
        };
        else {
            if (B === void 0) B = console;
            if (!(typeof B == "object" && B.log && B.warn && B.error)) throw new Error("logger must implement log, warn and error methods");
            A.logger = B
        }
    }

    function dH0() {}
});
var nZB = E((TB3, iZB) => {
    var Hx6 = Tm(),
        zx6 = (A, B) => {
            let Q = Hx6(A, B);
            return Q ? Q.version : null
        };
    iZB.exports = zx6
});
var sZB = E((PB3, aZB) => {
    var Ex6 = Tm(),
        Ux6 = (A, B) => {
            let Q = Ex6(A.trim().replace(/^[=v]+/, ""), B);
            return Q ? Q.version : null
        };
    aZB.exports = Ux6
});
var tZB = E((SB3, oZB) => {
    var rZB = JJ(),
        wx6 = (A, B, Q, Z, D) => {
            if (typeof Q === "string") D = Z, Z = Q, Q = void 0;
            try {
                return new rZB(A instanceof rZB ? A.version : A, Q).inc(B, Z, D).version
            } catch (G) {
                return null
            }
        };
    oZB.exports = wx6
});
var BDB = E((jB3, ADB) => {
    var eZB = Tm(),
        $x6 = (A, B) => {
            let Q = eZB(A, null, !0),
                Z = eZB(B, null, !0),
                D = Q.compare(Z);
            if (D === 0) return null;
            let G = D > 0,
                F = G ? Q : Z,
                I = G ? Z : Q,
                Y = !!F.prerelease.length;
            if (!!I.prerelease.length && !Y) {
                if (!I.patch && !I.minor) return "major";
                if (I.compareMain(F) === 0) {
                    if (I.minor && !I.patch) return "minor";
                    return "patch"
                }
            }
            let J = Y ? "pre" : "";
            if (Q.major !== Z.major) return J + "major";
            if (Q.minor !== Z.minor) return J + "minor";
            if (Q.patch !== Z.patch) return J + "patch";
            return "prerelease"
        };
    ADB.exports = $x6
});
var ZDB = E((kB3, QDB) => {
    var qx6 = JJ(),
        Nx6 = (A, B) => new qx6(A, B).major;
    QDB.exports = Nx6
});
var GDB = E((yB3, DDB) => {
    var Lx6 = JJ(),
        Mx6 = (A, B) => new Lx6(A, B).minor;
    DDB.exports = Mx6
});
var IDB = E((_B3, FDB) => {
    var Rx6 = JJ(),
        Ox6 = (A, B) => new Rx6(A, B).patch;
    FDB.exports = Ox6
});
var WDB = E((xB3, YDB) => {
    var Tx6 = Tm(),
        Px6 = (A, B) => {
            let Q = Tx6(A, B);
            return Q && Q.prerelease.length ? Q.prerelease : null
        };
    YDB.exports = Px6
});
var XDB = E((vB3, JDB) => {
    var Sx6 = xE(),
        jx6 = (A, B, Q) => Sx6(B, A, Q);
    JDB.exports = jx6
});
var CDB = E((bB3, VDB) => {
    var kx6 = xE(),
        yx6 = (A, B) => kx6(A, B, !0);
    VDB.exports = yx6
});
var Gy1 = E((fB3, HDB) => {
    var KDB = JJ(),
        _x6 = (A, B, Q) => {
            let Z = new KDB(A, Q),
                D = new KDB(B, Q);
            return Z.compare(D) || Z.compareBuild(D)
        };
    HDB.exports = _x6
});
var EDB = E((hB3, zDB) => {
    var xx6 = Gy1(),
        vx6 = (A, B) => A.sort((Q, Z) => xx6(Q, Z, B));
    zDB.exports = vx6
});
var wDB = E((gB3, UDB) => {
    var bx6 = Gy1(),
        fx6 = (A, B) => A.sort((Q, Z) => bx6(Z, Q, B));
    UDB.exports = fx6
});
var qDB = E((uB3, $DB) => {
    var hx6 = vE(),
        gx6 = (A, B) => new hx6(A, B).set.map((Q) => Q.map((Z) => Z.value).join(" ").trim().split(" "));
    $DB.exports = gx6
});
var LDB = E((mB3, NDB) => {
    var ux6 = JJ(),
        mx6 = vE(),
        dx6 = (A, B, Q) => {
            let Z = null,
                D = null,
                G = null;
            try {
                G = new mx6(B, Q)
            } catch (F) {
                return null
            }
            return A.forEach((F) => {
                if (G.test(F)) {
                    if (!Z || D.compare(F) === -1) Z = F, D = new ux6(Z, Q)
                }
            }), Z
        };
    NDB.exports = dx6
});
var RDB = E((dB3, MDB) => {
    var cx6 = JJ(),
        lx6 = vE(),
        px6 = (A, B, Q) => {
            let Z = null,
                D = null,
                G = null;
            try {
                G = new lx6(B, Q)
            } catch (F) {
                return null
            }
            return A.forEach((F) => {
                if (G.test(F)) {
                    if (!Z || D.compare(F) === 1) Z = F, D = new cx6(Z, Q)
                }
            }), Z
        };
    MDB.exports = px6
});
var PDB = E((cB3, TDB) => {
    var Jz0 = JJ(),
        ix6 = vE(),
        ODB = AZ1(),
        nx6 = (A, B) => {
            A = new ix6(A, B);
            let Q = new Jz0("0.0.0");
            if (A.test(Q)) return Q;
            if (Q = new Jz0("0.0.0-0"), A.test(Q)) return Q;
            Q = null;
            for (let Z = 0; Z < A.set.length; ++Z) {
                let D = A.set[Z],
                    G = null;
                if (D.forEach((F) => {
                        let I = new Jz0(F.semver.version);
                        switch (F.operator) {
                            case ">":
                                if (I.prerelease.length === 0) I.patch++;
                                else I.prerelease.push(0);
                                I.raw = I.format();
                            case "":
                            case ">=":
                                if (!G || ODB(I, G)) G = I;
                                break;
                            case "<":
                            case "<=":
                                break;
                            default:
                                throw new Error(`Unexpected operation: ${F.operator}`)
                        }
                    }), G && (!Q || ODB(Q, G))) Q = G
            }
            if (Q && A.test(Q)) return Q;
            return null
        };
    TDB.exports = nx6
});
var jDB = E((lB3, SDB) => {
    var ax6 = vE(),
        sx6 = (A, B) => {
            try {
                return new ax6(A, B).range || "*"
            } catch (Q) {
                return null
            }
        };
    SDB.exports = sx6
});
var Fy1 = E((pB3, xDB) => {
    var rx6 = JJ(),
        _DB = QZ1(),
        {
            ANY: ox6
        } = _DB,
        tx6 = vE(),
        ex6 = ze(),
        kDB = AZ1(),
        yDB = $j1(),
        Av6 = qj1(),
        Bv6 = e71(),
        Qv6 = (A, B, Q, Z) => {
            A = new rx6(A, Z), B = new tx6(B, Z);
            let D, G, F, I, Y;
            switch (Q) {
                case ">":
                    D = kDB, G = Av6, F = yDB, I = ">", Y = ">=";
                    break;
                case "<":
                    D = yDB, G = Bv6, F = kDB, I = "<", Y = "<=";
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"')
            }
            if (ex6(A, B, Z)) return !1;
            for (let W = 0; W < B.set.length; ++W) {
                let J = B.set[W],
                    X = null,
                    V = null;
                if (J.forEach((C) => {
                        if (C.semver === ox6) C = new _DB(">=0.0.0");
                        if (X = X || C, V = V || C, D(C.semver, X.semver, Z)) X = C;
                        else if (F(C.semver, V.semver, Z)) V = C
                    }), X.operator === I || X.operator === Y) return !1;
                if ((!V.operator || V.operator === I) && G(A, V.semver)) return !1;
                else if (V.operator === Y && F(A, V.semver)) return !1
            }
            return !0
        };
    xDB.exports = Qv6
});
var bDB = E((iB3, vDB) => {
    var Zv6 = Fy1(),
        Dv6 = (A, B, Q) => Zv6(A, B, ">", Q);
    vDB.exports = Dv6
});
var hDB = E((nB3, fDB) => {
    var Gv6 = Fy1(),
        Fv6 = (A, B, Q) => Gv6(A, B, "<", Q);
    fDB.exports = Fv6
});
var mDB = E((aB3, uDB) => {
    var gDB = vE(),
        Iv6 = (A, B, Q) => {
            return A = new gDB(A, Q), B = new gDB(B, Q), A.intersects(B, Q)
        };
    uDB.exports = Iv6
});
var cDB = E((sB3, dDB) => {
    var Yv6 = ze(),
        Wv6 = xE();
    dDB.exports = (A, B, Q) => {
        let Z = [],
            D = null,
            G = null,
            F = A.sort((J, X) => Wv6(J, X, Q));
        for (let J of F)
            if (Yv6(J, B, Q)) {
                if (G = J, !D) D = J
            } else {
                if (G) Z.push([D, G]);
                G = null, D = null
            } if (D) Z.push([D, null]);
        let I = [];
        for (let [J, X] of Z)
            if (J === X) I.push(J);
            else if (!X && J === F[0]) I.push("*");
        else if (!X) I.push(`>=${J}`);
        else if (J === F[0]) I.push(`<=${X}`);
        else I.push(`${J} - ${X}`);
        let Y = I.join(" || "),
            W = typeof B.raw === "string" ? B.raw : String(B);
        return Y.length < W.length ? Y : B
    }
});