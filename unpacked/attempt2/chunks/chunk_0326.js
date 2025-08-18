/* chunk:326 bytes:[7847730, 7866870) size:19140 source:unpacked-cli.js */
var Ao2 = E((Bp5, er2) => {
    var QK6 = 1 / 0,
        ZK6 = "[object Symbol]",
        DK6 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
        GK6 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
        TP1 = "\\ud800-\\udfff",
        fr2 = "\\u0300-\\u036f\\ufe20-\\ufe23",
        hr2 = "\\u20d0-\\u20f0",
        gr2 = "\\u2700-\\u27bf",
        ur2 = "a-z\\xdf-\\xf6\\xf8-\\xff",
        FK6 = "\\xac\\xb1\\xd7\\xf7",
        IK6 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
        YK6 = "\\u2000-\\u206f",
        WK6 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
        mr2 = "A-Z\\xc0-\\xd6\\xd8-\\xde",
        dr2 = "\\ufe0e\\ufe0f",
        cr2 = FK6 + IK6 + YK6 + WK6,
        bJ0 = "['’]",
        JK6 = "[" + TP1 + "]",
        jr2 = "[" + cr2 + "]",
        OP1 = "[" + fr2 + hr2 + "]",
        lr2 = "\\d+",
        XK6 = "[" + gr2 + "]",
        pr2 = "[" + ur2 + "]",
        ir2 = "[^" + TP1 + cr2 + lr2 + gr2 + ur2 + mr2 + "]",
        vJ0 = "\\ud83c[\\udffb-\\udfff]",
        VK6 = "(?:" + OP1 + "|" + vJ0 + ")",
        nr2 = "[^" + TP1 + "]",
        fJ0 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
        hJ0 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
        kt = "[" + mr2 + "]",
        ar2 = "\\u200d",
        kr2 = "(?:" + pr2 + "|" + ir2 + ")",
        CK6 = "(?:" + kt + "|" + ir2 + ")",
        yr2 = "(?:" + bJ0 + "(?:d|ll|m|re|s|t|ve))?",
        _r2 = "(?:" + bJ0 + "(?:D|LL|M|RE|S|T|VE))?",
        sr2 = VK6 + "?",
        rr2 = "[" + dr2 + "]?",
        KK6 = "(?:" + ar2 + "(?:" + [nr2, fJ0, hJ0].join("|") + ")" + rr2 + sr2 + ")*",
        or2 = rr2 + sr2 + KK6,
        HK6 = "(?:" + [XK6, fJ0, hJ0].join("|") + ")" + or2,
        zK6 = "(?:" + [nr2 + OP1 + "?", OP1, fJ0, hJ0, JK6].join("|") + ")",
        EK6 = RegExp(bJ0, "g"),
        UK6 = RegExp(OP1, "g"),
        wK6 = RegExp(vJ0 + "(?=" + vJ0 + ")|" + zK6 + or2, "g"),
        $K6 = RegExp([kt + "?" + pr2 + "+" + yr2 + "(?=" + [jr2, kt, "$"].join("|") + ")", CK6 + "+" + _r2 + "(?=" + [jr2, kt + kr2, "$"].join("|") + ")", kt + "?" + kr2 + "+" + yr2, kt + "+" + _r2, lr2, HK6].join("|"), "g"),
        qK6 = RegExp("[" + ar2 + TP1 + fr2 + hr2 + dr2 + "]"),
        NK6 = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
        LK6 = {
            "À": "A",
            "Á": "A",
            "Â": "A",
            "Ã": "A",
            "Ä": "A",
            "Å": "A",
            "à": "a",
            "á": "a",
            "â": "a",
            "ã": "a",
            "ä": "a",
            "å": "a",
            "Ç": "C",
            "ç": "c",
            "Ð": "D",
            "ð": "d",
            "È": "E",
            "É": "E",
            "Ê": "E",
            "Ë": "E",
            "è": "e",
            "é": "e",
            "ê": "e",
            "ë": "e",
            "Ì": "I",
            "Í": "I",
            "Î": "I",
            "Ï": "I",
            "ì": "i",
            "í": "i",
            "î": "i",
            "ï": "i",
            "Ñ": "N",
            "ñ": "n",
            "Ò": "O",
            "Ó": "O",
            "Ô": "O",
            "Õ": "O",
            "Ö": "O",
            "Ø": "O",
            "ò": "o",
            "ó": "o",
            "ô": "o",
            "õ": "o",
            "ö": "o",
            "ø": "o",
            "Ù": "U",
            "Ú": "U",
            "Û": "U",
            "Ü": "U",
            "ù": "u",
            "ú": "u",
            "û": "u",
            "ü": "u",
            "Ý": "Y",
            "ý": "y",
            "ÿ": "y",
            "Æ": "Ae",
            "æ": "ae",
            "Þ": "Th",
            "þ": "th",
            "ß": "ss",
            "Ā": "A",
            "Ă": "A",
            "Ą": "A",
            "ā": "a",
            "ă": "a",
            "ą": "a",
            "Ć": "C",
            "Ĉ": "C",
            "Ċ": "C",
            "Č": "C",
            "ć": "c",
            "ĉ": "c",
            "ċ": "c",
            "č": "c",
            "Ď": "D",
            "Đ": "D",
            "ď": "d",
            "đ": "d",
            "Ē": "E",
            "Ĕ": "E",
            "Ė": "E",
            "Ę": "E",
            "Ě": "E",
            "ē": "e",
            "ĕ": "e",
            "ė": "e",
            "ę": "e",
            "ě": "e",
            "Ĝ": "G",
            "Ğ": "G",
            "Ġ": "G",
            "Ģ": "G",
            "ĝ": "g",
            "ğ": "g",
            "ġ": "g",
            "ģ": "g",
            "Ĥ": "H",
            "Ħ": "H",
            "ĥ": "h",
            "ħ": "h",
            "Ĩ": "I",
            "Ī": "I",
            "Ĭ": "I",
            "Į": "I",
            "İ": "I",
            "ĩ": "i",
            "ī": "i",
            "ĭ": "i",
            "į": "i",
            "ı": "i",
            "Ĵ": "J",
            "ĵ": "j",
            "Ķ": "K",
            "ķ": "k",
            "ĸ": "k",
            "Ĺ": "L",
            "Ļ": "L",
            "Ľ": "L",
            "Ŀ": "L",
            "Ł": "L",
            "ĺ": "l",
            "ļ": "l",
            "ľ": "l",
            "ŀ": "l",
            "ł": "l",
            "Ń": "N",
            "Ņ": "N",
            "Ň": "N",
            "Ŋ": "N",
            "ń": "n",
            "ņ": "n",
            "ň": "n",
            "ŋ": "n",
            "Ō": "O",
            "Ŏ": "O",
            "Ő": "O",
            "ō": "o",
            "ŏ": "o",
            "ő": "o",
            "Ŕ": "R",
            "Ŗ": "R",
            "Ř": "R",
            "ŕ": "r",
            "ŗ": "r",
            "ř": "r",
            "Ś": "S",
            "Ŝ": "S",
            "Ş": "S",
            "Š": "S",
            "ś": "s",
            "ŝ": "s",
            "ş": "s",
            "š": "s",
            "Ţ": "T",
            "Ť": "T",
            "Ŧ": "T",
            "ţ": "t",
            "ť": "t",
            "ŧ": "t",
            "Ũ": "U",
            "Ū": "U",
            "Ŭ": "U",
            "Ů": "U",
            "Ű": "U",
            "Ų": "U",
            "ũ": "u",
            "ū": "u",
            "ŭ": "u",
            "ů": "u",
            "ű": "u",
            "ų": "u",
            "Ŵ": "W",
            "ŵ": "w",
            "Ŷ": "Y",
            "ŷ": "y",
            "Ÿ": "Y",
            "Ź": "Z",
            "Ż": "Z",
            "Ž": "Z",
            "ź": "z",
            "ż": "z",
            "ž": "z",
            "Ĳ": "IJ",
            "ĳ": "ij",
            "Œ": "Oe",
            "œ": "oe",
            "ŉ": "'n",
            "ſ": "ss"
        },
        MK6 = typeof global == "object" && global && global.Object === Object && global,
        RK6 = typeof self == "object" && self && self.Object === Object && self,
        OK6 = MK6 || RK6 || Function("return this")();

    function TK6(A, B, Q, Z) {
        var D = -1,
            G = A ? A.length : 0;
        if (Z && G) Q = A[++D];
        while (++D < G) Q = B(Q, A[D], D, A);
        return Q
    }

    function PK6(A) {
        return A.split("")
    }

    function SK6(A) {
        return A.match(DK6) || []
    }

    function jK6(A) {
        return function(B) {
            return A == null ? void 0 : A[B]
        }
    }
    var kK6 = jK6(LK6);

    function tr2(A) {
        return qK6.test(A)
    }

    function yK6(A) {
        return NK6.test(A)
    }

    function _K6(A) {
        return tr2(A) ? xK6(A) : PK6(A)
    }

    function xK6(A) {
        return A.match(wK6) || []
    }

    function vK6(A) {
        return A.match($K6) || []
    }
    var bK6 = Object.prototype,
        fK6 = bK6.toString,
        xr2 = OK6.Symbol,
        vr2 = xr2 ? xr2.prototype : void 0,
        br2 = vr2 ? vr2.toString : void 0;

    function hK6(A, B, Q) {
        var Z = -1,
            D = A.length;
        if (B < 0) B = -B > D ? 0 : D + B;
        if (Q = Q > D ? D : Q, Q < 0) Q += D;
        D = B > Q ? 0 : Q - B >>> 0, B >>>= 0;
        var G = Array(D);
        while (++Z < D) G[Z] = A[Z + B];
        return G
    }

    function gK6(A) {
        if (typeof A == "string") return A;
        if (lK6(A)) return br2 ? br2.call(A) : "";
        var B = A + "";
        return B == "0" && 1 / A == -QK6 ? "-0" : B
    }

    function uK6(A, B, Q) {
        var Z = A.length;
        return Q = Q === void 0 ? Z : Q, !B && Q >= Z ? A : hK6(A, B, Q)
    }

    function mK6(A) {
        return function(B) {
            B = PP1(B);
            var Q = tr2(B) ? _K6(B) : void 0,
                Z = Q ? Q[0] : B.charAt(0),
                D = Q ? uK6(Q, 1).join("") : B.slice(1);
            return Z[A]() + D
        }
    }

    function dK6(A) {
        return function(B) {
            return TK6(sK6(nK6(B).replace(EK6, "")), A, "")
        }
    }

    function cK6(A) {
        return !!A && typeof A == "object"
    }

    function lK6(A) {
        return typeof A == "symbol" || cK6(A) && fK6.call(A) == ZK6
    }

    function PP1(A) {
        return A == null ? "" : gK6(A)
    }
    var pK6 = dK6(function(A, B, Q) {
        return B = B.toLowerCase(), A + (Q ? iK6(B) : B)
    });

    function iK6(A) {
        return aK6(PP1(A).toLowerCase())
    }

    function nK6(A) {
        return A = PP1(A), A && A.replace(GK6, kK6).replace(UK6, "")
    }
    var aK6 = mK6("toUpperCase");

    function sK6(A, B, Q) {
        if (A = PP1(A), B = Q ? void 0 : B, B === void 0) return yK6(A) ? vK6(A) : SK6(A);
        return A.match(B) || []
    }
    er2.exports = pK6
});
var Qo2 = E((Qp5, Bo2) => {
    Bo2.exports = gJ0;

    function gJ0(A, B) {
        if (typeof A === "string") B = A, A = void 0;
        var Q = [];

        function Z(G) {
            if (typeof G !== "string") {
                var F = D();
                if (gJ0.verbose) console.log("codegen: " + F);
                if (F = "return " + F, G) {
                    var I = Object.keys(G),
                        Y = new Array(I.length + 1),
                        W = new Array(I.length),
                        J = 0;
                    while (J < I.length) Y[J] = I[J], W[J] = G[I[J++]];
                    return Y[J] = F, Function.apply(null, Y).apply(null, W)
                }
                return Function(F)()
            }
            var X = new Array(arguments.length - 1),
                V = 0;
            while (V < X.length) X[V] = arguments[++V];
            if (V = 0, G = G.replace(/%([%dfijs])/g, function C(K, H) {
                    var z = X[V++];
                    switch (H) {
                        case "d":
                        case "f":
                            return String(Number(z));
                        case "i":
                            return String(Math.floor(z));
                        case "j":
                            return JSON.stringify(z);
                        case "s":
                            return String(z)
                    }
                    return "%"
                }), V !== X.length) throw Error("parameter count mismatch");
            return Q.push(G), Z
        }

        function D(G) {
            return "function " + (G || B || "") + "(" + (A && A.join(",") || "") + `){
  ` + Q.join(`
  `) + `
}`
        }
        return Z.toString = D, Z
    }
    gJ0.verbose = !1
});
var Do2 = E((Zp5, Zo2) => {
    Zo2.exports = F71;
    var rK6 = MW0(),
        oK6 = OW0(),
        uJ0 = oK6("fs");

    function F71(A, B, Q) {
        if (typeof B === "function") Q = B, B = {};
        else if (!B) B = {};
        if (!Q) return rK6(F71, this, A, B);
        if (!B.xhr && uJ0 && uJ0.readFile) return uJ0.readFile(A, function Z(D, G) {
            return D && typeof XMLHttpRequest !== "undefined" ? F71.xhr(A, B, Q) : D ? Q(D) : Q(null, B.binary ? G : G.toString("utf8"))
        });
        return F71.xhr(A, B, Q)
    }
    F71.xhr = function A(B, Q, Z) {
        var D = new XMLHttpRequest;
        if (D.onreadystatechange = function G() {
                if (D.readyState !== 4) return;
                if (D.status !== 0 && D.status !== 200) return Z(Error("status " + D.status));
                if (Q.binary) {
                    var F = D.response;
                    if (!F) {
                        F = [];
                        for (var I = 0; I < D.responseText.length; ++I) F.push(D.responseText.charCodeAt(I) & 255)
                    }
                    return Z(null, typeof Uint8Array !== "undefined" ? new Uint8Array(F) : F)
                }
                return Z(null, D.responseText)
            }, Q.binary) {
            if ("overrideMimeType" in D) D.overrideMimeType("text/plain; charset=x-user-defined");
            D.responseType = "arraybuffer"
        }
        D.open("GET", B), D.send()
    }
});
var Io2 = E((Fo2) => {
    var dJ0 = Fo2,
        Go2 = dJ0.isAbsolute = function A(B) {
            return /^(?:\/|\w+:)/.test(B)
        },
        mJ0 = dJ0.normalize = function A(B) {
            B = B.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
            var Q = B.split("/"),
                Z = Go2(B),
                D = "";
            if (Z) D = Q.shift() + "/";
            for (var G = 0; G < Q.length;)
                if (Q[G] === "..")
                    if (G > 0 && Q[G - 1] !== "..") Q.splice(--G, 2);
                    else if (Z) Q.splice(G, 1);
            else ++G;
            else if (Q[G] === ".") Q.splice(G, 1);
            else ++G;
            return D + Q.join("/")
        };
    dJ0.resolve = function A(B, Q, Z) {
        if (!Z) Q = mJ0(Q);
        if (Go2(Q)) return Q;
        if (!Z) B = mJ0(B);
        return (B = B.replace(/(?:\/|^)[^/]+$/, "")).length ? mJ0(B + "/" + Q) : Q
    }
});
var Xm = E((Yo2) => {
    var I71 = Yo2,
        tK6 = qI(),
        eK6 = ["double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "bool", "string", "bytes"];

    function Y71(A, B) {
        var Q = 0,
            Z = {};
        B |= 0;
        while (Q < A.length) Z[eK6[Q + B]] = A[Q++];
        return Z
    }
    I71.basic = Y71([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]);
    I71.defaults = Y71([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, !1, "", tK6.emptyArray, null]);
    I71.long = Y71([0, 0, 0, 1, 1], 7);
    I71.mapKey = Y71([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2);
    I71.packed = Y71([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0])
});
var Xx = E((Fp5, Xo2) => {
    Xo2.exports = TE;
    var SP1 = Vm();
    ((TE.prototype = Object.create(SP1.prototype)).constructor = TE).className = "Field";
    var Wo2 = W$(),
        Jo2 = Xm(),
        QF = qI(),
        cJ0, AH6 = /^required|optional|repeated$/;
    TE.fromJSON = function A(B, Q) {
        return new TE(B, Q.id, Q.type, Q.rule, Q.extend, Q.options, Q.comment)
    };

    function TE(A, B, Q, Z, D, G, F) {
        if (QF.isObject(Z)) F = D, G = Z, Z = D = void 0;
        else if (QF.isObject(D)) F = G, G = D, D = void 0;
        if (SP1.call(this, A, G), !QF.isInteger(B) || B < 0) throw TypeError("id must be a non-negative integer");
        if (!QF.isString(Q)) throw TypeError("type must be a string");
        if (Z !== void 0 && !AH6.test(Z = Z.toString().toLowerCase())) throw TypeError("rule must be a string rule");
        if (D !== void 0 && !QF.isString(D)) throw TypeError("extend must be a string");
        if (Z === "proto3_optional") Z = "optional";
        this.rule = Z && Z !== "optional" ? Z : void 0, this.type = Q, this.id = B, this.extend = D || void 0, this.required = Z === "required", this.optional = !this.required, this.repeated = Z === "repeated", this.map = !1, this.message = null, this.partOf = null, this.typeDefault = null, this.defaultValue = null, this.long = QF.Long ? Jo2.long[Q] !== void 0 : !1, this.bytes = Q === "bytes", this.resolvedType = null, this.extensionField = null, this.declaringField = null, this._packed = null, this.comment = F
    }
    Object.defineProperty(TE.prototype, "packed", {
        get: function() {
            if (this._packed === null) this._packed = this.getOption("packed") !== !1;
            return this._packed
        }
    });
    TE.prototype.setOption = function A(B, Q, Z) {
        if (B === "packed") this._packed = null;
        return SP1.prototype.setOption.call(this, B, Q, Z)
    };
    TE.prototype.toJSON = function A(B) {
        var Q = B ? Boolean(B.keepComments) : !1;
        return QF.toObject(["rule", this.rule !== "optional" && this.rule || void 0, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", Q ? this.comment : void 0])
    };
    TE.prototype.resolve = function A() {
        if (this.resolved) return this;
        if ((this.typeDefault = Jo2.defaults[this.type]) === void 0)
            if (this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type), this.resolvedType instanceof cJ0) this.typeDefault = null;
            else this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
        else if (this.options && this.options.proto3_optional) this.typeDefault = null;
        if (this.options && this.options.default != null) {
            if (this.typeDefault = this.options.default, this.resolvedType instanceof Wo2 && typeof this.typeDefault === "string") this.typeDefault = this.resolvedType.values[this.typeDefault]
        }
        if (this.options) {
            if (this.options.packed === !0 || this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Wo2)) delete this.options.packed;
            if (!Object.keys(this.options).length) this.options = void 0
        }
        if (this.long) {
            if (this.typeDefault = QF.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u"), Object.freeze) Object.freeze(this.typeDefault)
        } else if (this.bytes && typeof this.typeDefault === "string") {
            var B;
            if (QF.base64.test(this.typeDefault)) QF.base64.decode(this.typeDefault, B = QF.newBuffer(QF.base64.length(this.typeDefault)), 0);
            else QF.utf8.write(this.typeDefault, B = QF.newBuffer(QF.utf8.length(this.typeDefault)), 0);
            this.typeDefault = B
        }
        if (this.map) this.defaultValue = QF.emptyObject;
        else if (this.repeated) this.defaultValue = QF.emptyArray;
        else this.defaultValue = this.typeDefault;
        if (this.parent instanceof cJ0) this.parent.ctor.prototype[this.name] = this.defaultValue;
        return SP1.prototype.resolve.call(this)
    };
    TE.d = function A(B, Q, Z, D) {
        if (typeof Q === "function") Q = QF.decorateType(Q).name;
        else if (Q && typeof Q === "object") Q = QF.decorateEnum(Q).name;
        return function G(F, I) {
            QF.decorateType(F.constructor).add(new TE(I, B, Q, Z, {
                default: D
            }))
        }
    };
    TE._configure = function A(B) {
        cJ0 = B
    }
});