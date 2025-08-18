/* chunk:331 bytes:[7929506, 7945438) size:15932 source:unpacked-cli.js */
var Bt2 = E((Rp5, At2) => {
    At2.exports = TP;
    TP.filename = null;
    TP.defaults = {
        keepCase: !1
    };
    var hH6 = CX0(),
        ro2 = dP1(),
        oo2 = gP1(),
        to2 = Xx(),
        gH6 = _P1(),
        eo2 = yt(),
        uH6 = W$(),
        mH6 = vP1(),
        dH6 = xP1(),
        KX0 = Xm(),
        HX0 = qI(),
        cH6 = /^[1-9][0-9]*$/,
        lH6 = /^-?[1-9][0-9]*$/,
        pH6 = /^0[x][0-9a-fA-F]+$/,
        iH6 = /^-?0[x][0-9a-fA-F]+$/,
        nH6 = /^0[0-7]+$/,
        aH6 = /^-?0[0-7]+$/,
        sH6 = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
        WM = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
        JM = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
        rH6 = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;

    function TP(A, B, Q) {
        if (!(B instanceof ro2)) Q = B, B = new ro2;
        if (!Q) Q = TP.defaults;
        var Z = Q.preferTrailingComment || !1,
            D = hH6(A, Q.alternateCommentMode || !1),
            G = D.next,
            F = D.push,
            I = D.peek,
            Y = D.skip,
            W = D.cmnt,
            J = !0,
            X, V, C, K, H = !1,
            z = B,
            $ = Q.keepCase ? function(e) {
                return e
            } : HX0.camelCase;

        function L(e, Z1, I1) {
            var U1 = TP.filename;
            if (!I1) TP.filename = null;
            return Error("illegal " + (Z1 || "token") + " '" + e + "' (" + (U1 ? U1 + ", " : "") + "line " + D.line + ")")
        }

        function N() {
            var e = [],
                Z1;
            do {
                if ((Z1 = G()) !== '"' && Z1 !== "'") throw L(Z1);
                e.push(G()), Y(Z1), Z1 = I()
            } while (Z1 === '"' || Z1 === "'");
            return e.join("")
        }

        function R(e) {
            var Z1 = G();
            switch (Z1) {
                case "'":
                case '"':
                    return F(Z1), N();
                case "true":
                case "TRUE":
                    return !0;
                case "false":
                case "FALSE":
                    return !1
            }
            try {
                return P(Z1, !0)
            } catch (I1) {
                if (e && JM.test(Z1)) return Z1;
                throw L(Z1, "value")
            }
        }

        function O(e, Z1) {
            var I1, U1;
            do
                if (Z1 && ((I1 = I()) === '"' || I1 === "'")) e.push(N());
                else e.push([U1 = j(G()), Y("to", !0) ? j(G()) : U1]); while (Y(",", !0));
            var O1 = {
                options: void 0
            };
            O1.setOption = function(B1, x1) {
                if (this.options === void 0) this.options = {};
                this.options[B1] = x1
            }, a(O1, function B1(x1) {
                if (x1 === "option") W0(O1, x1), Y(";");
                else throw L(x1)
            }, function B1() {
                k1(O1)
            })
        }

        function P(e, Z1) {
            var I1 = 1;
            if (e.charAt(0) === "-") I1 = -1, e = e.substring(1);
            switch (e) {
                case "inf":
                case "INF":
                case "Inf":
                    return I1 * (1 / 0);
                case "nan":
                case "NAN":
                case "Nan":
                case "NaN":
                    return NaN;
                case "0":
                    return 0
            }
            if (cH6.test(e)) return I1 * parseInt(e, 10);
            if (pH6.test(e)) return I1 * parseInt(e, 16);
            if (nH6.test(e)) return I1 * parseInt(e, 8);
            if (sH6.test(e)) return I1 * parseFloat(e);
            throw L(e, "number", Z1)
        }

        function j(e, Z1) {
            switch (e) {
                case "max":
                case "MAX":
                case "Max":
                    return 536870911;
                case "0":
                    return 0
            }
            if (!Z1 && e.charAt(0) === "-") throw L(e, "id");
            if (lH6.test(e)) return parseInt(e, 10);
            if (iH6.test(e)) return parseInt(e, 16);
            if (aH6.test(e)) return parseInt(e, 8);
            throw L(e, "id")
        }

        function f() {
            if (X !== void 0) throw L("package");
            if (X = G(), !JM.test(X)) throw L(X, "name");
            z = z.define(X), Y(";")
        }

        function k() {
            var e = I(),
                Z1;
            switch (e) {
                case "weak":
                    Z1 = C || (C = []), G();
                    break;
                case "public":
                    G();
                default:
                    Z1 = V || (V = []);
                    break
            }
            e = N(), Y(";"), Z1.push(e)
        }

        function c() {
            if (Y("="), K = N(), H = K === "proto3", !H && K !== "proto2") throw L(K, "syntax");
            B.setOption("syntax", K), Y(";")
        }

        function u(e, Z1) {
            switch (Z1) {
                case "option":
                    return W0(e, Z1), Y(";"), !0;
                case "message":
                    return l(e, Z1), !0;
                case "enum":
                    return _1(e, Z1), !0;
                case "service":
                    return H1(e, Z1), !0;
                case "extend":
                    return V0(e, Z1), !0
            }
            return !1
        }

        function a(e, Z1, I1) {
            var U1 = D.line;
            if (e) {
                if (typeof e.comment !== "string") e.comment = W();
                e.filename = TP.filename
            }
            if (Y("{", !0)) {
                var O1;
                while ((O1 = G()) !== "}") Z1(O1);
                Y(";", !0)
            } else {
                if (I1) I1();
                if (Y(";"), e && (typeof e.comment !== "string" || Z)) e.comment = W(U1) || e.comment
            }
        }

        function l(e, Z1) {
            if (!WM.test(Z1 = G())) throw L(Z1, "type name");
            var I1 = new oo2(Z1);
            a(I1, function U1(O1) {
                if (u(I1, O1)) return;
                switch (O1) {
                    case "map":
                        E1(I1, O1);
                        break;
                    case "required":
                    case "repeated":
                        y(I1, O1);
                        break;
                    case "optional":
                        if (H) y(I1, "proto3_optional");
                        else y(I1, "optional");
                        break;
                    case "oneof":
                        C1(I1, O1);
                        break;
                    case "extensions":
                        O(I1.extensions || (I1.extensions = []));
                        break;
                    case "reserved":
                        O(I1.reserved || (I1.reserved = []), !0);
                        break;
                    default:
                        if (!H || !JM.test(O1)) throw L(O1);
                        F(O1), y(I1, "optional");
                        break
                }
            }), e.add(I1)
        }

        function y(e, Z1, I1) {
            var U1 = G();
            if (U1 === "group") {
                t(e, Z1);
                return
            }
            while (U1.endsWith(".") || I().startsWith(".")) U1 += G();
            if (!JM.test(U1)) throw L(U1, "type");
            var O1 = G();
            if (!WM.test(O1)) throw L(O1, "name");
            O1 = $(O1), Y("=");
            var B1 = new to2(O1, j(G()), U1, Z1, I1);
            if (a(B1, function c1(a1) {
                    if (a1 === "option") W0(B1, a1), Y(";");
                    else throw L(a1)
                }, function c1() {
                    k1(B1)
                }), Z1 === "proto3_optional") {
                var x1 = new eo2("_" + O1);
                B1.setOption("proto3_optional", !0), x1.add(B1), e.add(x1)
            } else e.add(B1);
            if (!H && B1.repeated && (KX0.packed[U1] !== void 0 || KX0.basic[U1] === void 0)) B1.setOption("packed", !1, !0)
        }

        function t(e, Z1) {
            var I1 = G();
            if (!WM.test(I1)) throw L(I1, "name");
            var U1 = HX0.lcFirst(I1);
            if (I1 === U1) I1 = HX0.ucFirst(I1);
            Y("=");
            var O1 = j(G()),
                B1 = new oo2(I1);
            B1.group = !0;
            var x1 = new to2(U1, O1, I1, Z1);
            x1.filename = TP.filename, a(B1, function c1(a1) {
                switch (a1) {
                    case "option":
                        W0(B1, a1), Y(";");
                        break;
                    case "required":
                    case "repeated":
                        y(B1, a1);
                        break;
                    case "optional":
                        if (H) y(B1, "proto3_optional");
                        else y(B1, "optional");
                        break;
                    case "message":
                        l(B1, a1);
                        break;
                    case "enum":
                        _1(B1, a1);
                        break;
                    default:
                        throw L(a1)
                }
            }), e.add(B1).add(x1)
        }

        function E1(e) {
            Y("<");
            var Z1 = G();
            if (KX0.mapKey[Z1] === void 0) throw L(Z1, "type");
            Y(",");
            var I1 = G();
            if (!JM.test(I1)) throw L(I1, "type");
            Y(">");
            var U1 = G();
            if (!WM.test(U1)) throw L(U1, "name");
            Y("=");
            var O1 = new gH6($(U1), j(G()), Z1, I1);
            a(O1, function B1(x1) {
                if (x1 === "option") W0(O1, x1), Y(";");
                else throw L(x1)
            }, function B1() {
                k1(O1)
            }), e.add(O1)
        }

        function C1(e, Z1) {
            if (!WM.test(Z1 = G())) throw L(Z1, "name");
            var I1 = new eo2($(Z1));
            a(I1, function U1(O1) {
                if (O1 === "option") W0(I1, O1), Y(";");
                else F(O1), y(I1, "optional")
            }), e.add(I1)
        }

        function _1(e, Z1) {
            if (!WM.test(Z1 = G())) throw L(Z1, "name");
            var I1 = new uH6(Z1);
            a(I1, function U1(O1) {
                switch (O1) {
                    case "option":
                        W0(I1, O1), Y(";");
                        break;
                    case "reserved":
                        O(I1.reserved || (I1.reserved = []), !0);
                        break;
                    default:
                        F0(I1, O1)
                }
            }), e.add(I1)
        }

        function F0(e, Z1) {
            if (!WM.test(Z1)) throw L(Z1, "name");
            Y("=");
            var I1 = j(G(), !0),
                U1 = {
                    options: void 0
                };
            U1.setOption = function(O1, B1) {
                if (this.options === void 0) this.options = {};
                this.options[O1] = B1
            }, a(U1, function O1(B1) {
                if (B1 === "option") W0(U1, B1), Y(";");
                else throw L(B1)
            }, function O1() {
                k1(U1)
            }), e.add(Z1, I1, U1.comment, U1.options)
        }

        function W0(e, Z1) {
            var I1 = Y("(", !0);
            if (!JM.test(Z1 = G())) throw L(Z1, "name");
            var U1 = Z1,
                O1 = U1,
                B1;
            if (I1) {
                if (Y(")"), U1 = "(" + U1 + ")", O1 = U1, Z1 = I(), rH6.test(Z1)) B1 = Z1.slice(1), U1 += Z1, G()
            }
            Y("=");
            var x1 = g1(e, U1);
            Q1(e, O1, x1, B1)
        }

        function g1(e, Z1) {
            if (Y("{", !0)) {
                var I1 = {};
                while (!Y("}", !0)) {
                    if (!WM.test(o1 = G())) throw L(o1, "name");
                    if (o1 === null) throw L(o1, "end of input");
                    var U1, O1 = o1;
                    if (Y(":", !0), I() === "{") U1 = g1(e, Z1 + "." + o1);
                    else if (I() === "[") {
                        U1 = [];
                        var B1;
                        if (Y("[", !0)) {
                            do B1 = R(!0), U1.push(B1); while (Y(",", !0));
                            if (Y("]"), typeof B1 !== "undefined") w1(e, Z1 + "." + o1, B1)
                        }
                    } else U1 = R(!0), w1(e, Z1 + "." + o1, U1);
                    var x1 = I1[O1];
                    if (x1) U1 = [].concat(x1).concat(U1);
                    I1[O1] = U1, Y(",", !0), Y(";", !0)
                }
                return I1
            }
            var c1 = R(!0);
            return w1(e, Z1, c1), c1
        }

        function w1(e, Z1, I1) {
            if (e.setOption) e.setOption(Z1, I1)
        }

        function Q1(e, Z1, I1, U1) {
            if (e.setParsedOption) e.setParsedOption(Z1, I1, U1)
        }

        function k1(e) {
            if (Y("[", !0)) {
                do W0(e, "option"); while (Y(",", !0));
                Y("]")
            }
            return e
        }

        function H1(e, Z1) {
            if (!WM.test(Z1 = G())) throw L(Z1, "service name");
            var I1 = new mH6(Z1);
            a(I1, function U1(O1) {
                if (u(I1, O1)) return;
                if (O1 === "rpc") A0(I1, O1);
                else throw L(O1)
            }), e.add(I1)
        }

        function A0(e, Z1) {
            var I1 = W(),
                U1 = Z1;
            if (!WM.test(Z1 = G())) throw L(Z1, "name");
            var O1 = Z1,
                B1, x1, c1, a1;
            if (Y("("), Y("stream", !0)) x1 = !0;
            if (!JM.test(Z1 = G())) throw L(Z1);
            if (B1 = Z1, Y(")"), Y("returns"), Y("("), Y("stream", !0)) a1 = !0;
            if (!JM.test(Z1 = G())) throw L(Z1);
            c1 = Z1, Y(")");
            var C0 = new dH6(O1, U1, B1, c1, x1, a1);
            C0.comment = I1, a(C0, function K0(R0) {
                if (R0 === "option") W0(C0, R0), Y(";");
                else throw L(R0)
            }), e.add(C0)
        }

        function V0(e, Z1) {
            if (!JM.test(Z1 = G())) throw L(Z1, "reference");
            var I1 = Z1;
            a(null, function U1(O1) {
                switch (O1) {
                    case "required":
                    case "repeated":
                        y(e, O1, I1);
                        break;
                    case "optional":
                        if (H) y(e, "proto3_optional", I1);
                        else y(e, "optional", I1);
                        break;
                    default:
                        if (!H || !JM.test(O1)) throw L(O1);
                        F(O1), y(e, "optional", I1);
                        break
                }
            })
        }
        var o1;
        while ((o1 = G()) !== null) switch (o1) {
            case "package":
                if (!J) throw L(o1);
                f();
                break;
            case "import":
                if (!J) throw L(o1);
                k();
                break;
            case "syntax":
                if (!J) throw L(o1);
                c();
                break;
            case "option":
                W0(z, o1), Y(";");
                break;
            default:
                if (u(z, o1)) {
                    J = !1;
                    continue
                }
                throw L(o1)
        }
        return TP.filename = null, {
            package: X,
            imports: V,
            weakImports: C,
            syntax: K,
            root: B
        }
    }
});