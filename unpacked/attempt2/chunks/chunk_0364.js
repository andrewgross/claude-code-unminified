/* chunk:364 bytes:[8559218, 8578708) size:19490 source:unpacked-cli.js */
var kC0 = E((uQB, mQB) => {
    (function() {
        var A, B = {}.hasOwnProperty;
        mQB.exports = A = function() {
            class Q {
                constructor(Z) {
                    var D, G, F;
                    if (this.assertLegalChar = this.assertLegalChar.bind(this), this.assertLegalName = this.assertLegalName.bind(this), Z || (Z = {}), this.options = Z, !this.options.version) this.options.version = "1.0";
                    G = Z.stringify || {};
                    for (D in G) {
                        if (!B.call(G, D)) continue;
                        F = G[D], this[D] = F
                    }
                }
                name(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalName("" + Z || "")
                }
                text(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar(this.textEscape("" + Z || ""))
                }
                cdata(Z) {
                    if (this.options.noValidation) return Z;
                    return Z = "" + Z || "", Z = Z.replace("]]>", "]]]]><![CDATA[>"), this.assertLegalChar(Z)
                }
                comment(Z) {
                    if (this.options.noValidation) return Z;
                    if (Z = "" + Z || "", Z.match(/--/)) throw new Error("Comment text cannot contain double-hypen: " + Z);
                    return this.assertLegalChar(Z)
                }
                raw(Z) {
                    if (this.options.noValidation) return Z;
                    return "" + Z || ""
                }
                attValue(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar(this.attEscape(Z = "" + Z || ""))
                }
                insTarget(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar("" + Z || "")
                }
                insValue(Z) {
                    if (this.options.noValidation) return Z;
                    if (Z = "" + Z || "", Z.match(/\?>/)) throw new Error("Invalid processing instruction value: " + Z);
                    return this.assertLegalChar(Z)
                }
                xmlVersion(Z) {
                    if (this.options.noValidation) return Z;
                    if (Z = "" + Z || "", !Z.match(/1\.[0-9]+/)) throw new Error("Invalid version number: " + Z);
                    return Z
                }
                xmlEncoding(Z) {
                    if (this.options.noValidation) return Z;
                    if (Z = "" + Z || "", !Z.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) throw new Error("Invalid encoding: " + Z);
                    return this.assertLegalChar(Z)
                }
                xmlStandalone(Z) {
                    if (this.options.noValidation) return Z;
                    if (Z) return "yes";
                    else return "no"
                }
                dtdPubID(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar("" + Z || "")
                }
                dtdSysID(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar("" + Z || "")
                }
                dtdElementValue(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar("" + Z || "")
                }
                dtdAttType(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar("" + Z || "")
                }
                dtdAttDefault(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar("" + Z || "")
                }
                dtdEntityValue(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar("" + Z || "")
                }
                dtdNData(Z) {
                    if (this.options.noValidation) return Z;
                    return this.assertLegalChar("" + Z || "")
                }
                assertLegalChar(Z) {
                    var D, G;
                    if (this.options.noValidation) return Z;
                    if (this.options.version === "1.0") {
                        if (D = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g, this.options.invalidCharReplacement !== void 0) Z = Z.replace(D, this.options.invalidCharReplacement);
                        else if (G = Z.match(D)) throw new Error(`Invalid character in string: ${Z} at index ${G.index}`)
                    } else if (this.options.version === "1.1") {
                        if (D = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g, this.options.invalidCharReplacement !== void 0) Z = Z.replace(D, this.options.invalidCharReplacement);
                        else if (G = Z.match(D)) throw new Error(`Invalid character in string: ${Z} at index ${G.index}`)
                    }
                    return Z
                }
                assertLegalName(Z) {
                    var D;
                    if (this.options.noValidation) return Z;
                    if (Z = this.assertLegalChar(Z), D = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/, !Z.match(D)) throw new Error(`Invalid character in name: ${Z}`);
                    return Z
                }
                textEscape(Z) {
                    var D;
                    if (this.options.noValidation) return Z;
                    return D = this.options.noDoubleEncoding ? /(?!&(lt|gt|amp|apos|quot);)&/g : /&/g, Z.replace(D, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;")
                }
                attEscape(Z) {
                    var D;
                    if (this.options.noValidation) return Z;
                    return D = this.options.noDoubleEncoding ? /(?!&(lt|gt|amp|apos|quot);)&/g : /&/g, Z.replace(D, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;")
                }
            }
            return Q.prototype.convertAttKey = "@", Q.prototype.convertPIKey = "?", Q.prototype.convertTextKey = "#text", Q.prototype.convertCDataKey = "#cdata", Q.prototype.convertCommentKey = "#comment", Q.prototype.convertRawKey = "#raw", Q
        }.call(this)
    }).call(uQB)
});
var s71 = E((dQB, cQB) => {
    (function() {
        cQB.exports = {
            None: 0,
            OpenTag: 1,
            InsideTag: 2,
            CloseTag: 3
        }
    }).call(dQB)
});
var yC0 = E((lQB, pQB) => {
    (function() {
        var A, B, Q, Z, D, G, F, I, Y, W, J, X, V, C, K, H, z, $ = {}.hasOwnProperty;
        ({
            assign: z
        } = $M()), A = zG(), Y = eS1(), W = Dj1(), Q = oS1(), Z = tS1(), X = rS1(), C = Gj1(), K = Fj1(), V = Ij1(), J = jC0(), D = Aj1(), G = Qj1(), F = Bj1(), I = Zj1(), B = s71(), pQB.exports = H = class L {
            constructor(N) {
                var R, O, P;
                N || (N = {}), this.options = N, O = N.writer || {};
                for (R in O) {
                    if (!$.call(O, R)) continue;
                    P = O[R], this["_" + R] = this[R], this[R] = P
                }
            }
            filterOptions(N) {
                var R, O, P, j, f, k, c, u, a;
                if (N || (N = {}), N = z({}, this.options, N), R = {
                        writer: this
                    }, R.pretty = N.pretty || !1, R.allowEmpty = N.allowEmpty || !1, R.indent = (O = N.indent) != null ? O : "  ", R.newline = (P = N.newline) != null ? P : `
`, R.offset = (j = N.offset) != null ? j : 0, R.width = (f = N.width) != null ? f : 0, R.dontPrettyTextNodes = (k = (c = N.dontPrettyTextNodes) != null ? c : N.dontprettytextnodes) != null ? k : 0, R.spaceBeforeSlash = (u = (a = N.spaceBeforeSlash) != null ? a : N.spacebeforeslash) != null ? u : "", R.spaceBeforeSlash === !0) R.spaceBeforeSlash = " ";
                return R.suppressPrettyCount = 0, R.user = {}, R.state = B.None, R
            }
            indent(N, R, O) {
                var P;
                if (!R.pretty || R.suppressPrettyCount) return "";
                else if (R.pretty) {
                    if (P = (O || 0) + R.offset + 1, P > 0) return new Array(P).join(R.indent)
                }
                return ""
            }
            endline(N, R, O) {
                if (!R.pretty || R.suppressPrettyCount) return "";
                else return R.newline
            }
            attribute(N, R, O) {
                var P;
                if (this.openAttribute(N, R, O), R.pretty && R.width > 0) P = N.name + '="' + N.value + '"';
                else P = " " + N.name + '="' + N.value + '"';
                return this.closeAttribute(N, R, O), P
            }
            cdata(N, R, O) {
                var P;
                return this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O) + "<![CDATA[", R.state = B.InsideTag, P += N.value, R.state = B.CloseTag, P += "]]>" + this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            comment(N, R, O) {
                var P;
                return this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O) + "<!-- ", R.state = B.InsideTag, P += N.value, R.state = B.CloseTag, P += " -->" + this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            declaration(N, R, O) {
                var P;
                if (this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O) + "<?xml", R.state = B.InsideTag, P += ' version="' + N.version + '"', N.encoding != null) P += ' encoding="' + N.encoding + '"';
                if (N.standalone != null) P += ' standalone="' + N.standalone + '"';
                return R.state = B.CloseTag, P += R.spaceBeforeSlash + "?>", P += this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            docType(N, R, O) {
                var P, j, f, k, c;
                if (O || (O = 0), this.openNode(N, R, O), R.state = B.OpenTag, k = this.indent(N, R, O), k += "<!DOCTYPE " + N.root().name, N.pubID && N.sysID) k += ' PUBLIC "' + N.pubID + '" "' + N.sysID + '"';
                else if (N.sysID) k += ' SYSTEM "' + N.sysID + '"';
                if (N.children.length > 0) {
                    k += " [", k += this.endline(N, R, O), R.state = B.InsideTag, c = N.children;
                    for (j = 0, f = c.length; j < f; j++) P = c[j], k += this.writeChildNode(P, R, O + 1);
                    R.state = B.CloseTag, k += "]"
                }
                return R.state = B.CloseTag, k += R.spaceBeforeSlash + ">", k += this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), k
            }
            element(N, R, O) {
                var P, j, f, k, c, u, a, l, y, t, E1, C1, _1, F0, W0, g1, w1, Q1, k1;
                if (O || (O = 0), C1 = !1, this.openNode(N, R, O), R.state = B.OpenTag, _1 = this.indent(N, R, O) + "<" + N.name, R.pretty && R.width > 0) {
                    l = _1.length, W0 = N.attribs;
                    for (E1 in W0) {
                        if (!$.call(W0, E1)) continue;
                        if (P = W0[E1], F0 = this.attribute(P, R, O), j = F0.length, l + j > R.width) k1 = this.indent(N, R, O + 1) + F0, _1 += this.endline(N, R, O) + k1, l = k1.length;
                        else k1 = " " + F0, _1 += k1, l += k1.length
                    }
                } else {
                    g1 = N.attribs;
                    for (E1 in g1) {
                        if (!$.call(g1, E1)) continue;
                        P = g1[E1], _1 += this.attribute(P, R, O)
                    }
                }
                if (k = N.children.length, c = k === 0 ? null : N.children[0], k === 0 || N.children.every(function(H1) {
                        return (H1.type === A.Text || H1.type === A.Raw || H1.type === A.CData) && H1.value === ""
                    }))
                    if (R.allowEmpty) _1 += ">", R.state = B.CloseTag, _1 += "</" + N.name + ">" + this.endline(N, R, O);
                    else R.state = B.CloseTag, _1 += R.spaceBeforeSlash + "/>" + this.endline(N, R, O);
                else if (R.pretty && k === 1 && (c.type === A.Text || c.type === A.Raw || c.type === A.CData) && c.value != null) _1 += ">", R.state = B.InsideTag, R.suppressPrettyCount++, C1 = !0, _1 += this.writeChildNode(c, R, O + 1), R.suppressPrettyCount--, C1 = !1, R.state = B.CloseTag, _1 += "</" + N.name + ">" + this.endline(N, R, O);
                else {
                    if (R.dontPrettyTextNodes) {
                        w1 = N.children;
                        for (u = 0, y = w1.length; u < y; u++)
                            if (f = w1[u], (f.type === A.Text || f.type === A.Raw || f.type === A.CData) && f.value != null) {
                                R.suppressPrettyCount++, C1 = !0;
                                break
                            }
                    }
                    _1 += ">" + this.endline(N, R, O), R.state = B.InsideTag, Q1 = N.children;
                    for (a = 0, t = Q1.length; a < t; a++) f = Q1[a], _1 += this.writeChildNode(f, R, O + 1);
                    if (R.state = B.CloseTag, _1 += this.indent(N, R, O) + "</" + N.name + ">", C1) R.suppressPrettyCount--;
                    _1 += this.endline(N, R, O), R.state = B.None
                }
                return this.closeNode(N, R, O), _1
            }
            writeChildNode(N, R, O) {
                switch (N.type) {
                    case A.CData:
                        return this.cdata(N, R, O);
                    case A.Comment:
                        return this.comment(N, R, O);
                    case A.Element:
                        return this.element(N, R, O);
                    case A.Raw:
                        return this.raw(N, R, O);
                    case A.Text:
                        return this.text(N, R, O);
                    case A.ProcessingInstruction:
                        return this.processingInstruction(N, R, O);
                    case A.Dummy:
                        return "";
                    case A.Declaration:
                        return this.declaration(N, R, O);
                    case A.DocType:
                        return this.docType(N, R, O);
                    case A.AttributeDeclaration:
                        return this.dtdAttList(N, R, O);
                    case A.ElementDeclaration:
                        return this.dtdElement(N, R, O);
                    case A.EntityDeclaration:
                        return this.dtdEntity(N, R, O);
                    case A.NotationDeclaration:
                        return this.dtdNotation(N, R, O);
                    default:
                        throw new Error("Unknown XML node type: " + N.constructor.name)
                }
            }
            processingInstruction(N, R, O) {
                var P;
                if (this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O) + "<?", R.state = B.InsideTag, P += N.target, N.value) P += " " + N.value;
                return R.state = B.CloseTag, P += R.spaceBeforeSlash + "?>", P += this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            raw(N, R, O) {
                var P;
                return this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O), R.state = B.InsideTag, P += N.value, R.state = B.CloseTag, P += this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            text(N, R, O) {
                var P;
                return this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O), R.state = B.InsideTag, P += N.value, R.state = B.CloseTag, P += this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            dtdAttList(N, R, O) {
                var P;
                if (this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O) + "<!ATTLIST", R.state = B.InsideTag, P += " " + N.elementName + " " + N.attributeName + " " + N.attributeType, N.defaultValueType !== "#DEFAULT") P += " " + N.defaultValueType;
                if (N.defaultValue) P += ' "' + N.defaultValue + '"';
                return R.state = B.CloseTag, P += R.spaceBeforeSlash + ">" + this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            dtdElement(N, R, O) {
                var P;
                return this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O) + "<!ELEMENT", R.state = B.InsideTag, P += " " + N.name + " " + N.value, R.state = B.CloseTag, P += R.spaceBeforeSlash + ">" + this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            dtdEntity(N, R, O) {
                var P;
                if (this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O) + "<!ENTITY", R.state = B.InsideTag, N.pe) P += " %";
                if (P += " " + N.name, N.value) P += ' "' + N.value + '"';
                else {
                    if (N.pubID && N.sysID) P += ' PUBLIC "' + N.pubID + '" "' + N.sysID + '"';
                    else if (N.sysID) P += ' SYSTEM "' + N.sysID + '"';
                    if (N.nData) P += " NDATA " + N.nData
                }
                return R.state = B.CloseTag, P += R.spaceBeforeSlash + ">" + this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            dtdNotation(N, R, O) {
                var P;
                if (this.openNode(N, R, O), R.state = B.OpenTag, P = this.indent(N, R, O) + "<!NOTATION", R.state = B.InsideTag, P += " " + N.name, N.pubID && N.sysID) P += ' PUBLIC "' + N.pubID + '" "' + N.sysID + '"';
                else if (N.pubID) P += ' PUBLIC "' + N.pubID + '"';
                else if (N.sysID) P += ' SYSTEM "' + N.sysID + '"';
                return R.state = B.CloseTag, P += R.spaceBeforeSlash + ">" + this.endline(N, R, O), R.state = B.None, this.closeNode(N, R, O), P
            }
            openNode(N, R, O) {}
            closeNode(N, R, O) {}
            openAttribute(N, R, O) {}
            closeAttribute(N, R, O) {}
        }
    }).call(lQB)
});
var Yj1 = E((iQB, nQB) => {
    (function() {
        var A, B;
        B = yC0(), nQB.exports = A = class Q extends B {
            constructor(Z) {
                super(Z)
            }
            document(Z, D) {
                var G, F, I, Y, W;
                D = this.filterOptions(D), Y = "", W = Z.children;
                for (F = 0, I = W.length; F < I; F++) G = W[F], Y += this.writeChildNode(G, D, 0);
                if (D.pretty && Y.slice(-D.newline.length) === D.newline) Y = Y.slice(0, -D.newline.length);
                return Y
            }
        }
    }).call(iQB)
});