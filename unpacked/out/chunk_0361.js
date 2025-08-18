/* chunk:361 bytes:[8505634, 8523974) size:18340 source:unpacked-cli.js */
var SC0 = E((AQB, BQB) => {
    (function() {
        var A, B, Q;
        A = zG(), Q = uK(), BQB.exports = B = function() {
            class Z {
                constructor(D, G, F) {
                    if (this.parent = D, this.parent) this.options = this.parent.options, this.stringify = this.parent.stringify;
                    if (G == null) throw new Error("Missing attribute name. " + this.debugInfo(G));
                    this.name = this.stringify.name(G), this.value = this.stringify.attValue(F), this.type = A.Attribute, this.isId = !1, this.schemaTypeInfo = null
                }
                clone() {
                    return Object.create(this)
                }
                toString(D) {
                    return this.options.writer.attribute(this, this.options.writer.filterOptions(D))
                }
                debugInfo(D) {
                    if (D = D || this.name, D == null) return "parent: <" + this.parent.name + ">";
                    else return "attribute: {" + D + "}, parent: <" + this.parent.name + ">"
                }
                isEqualNode(D) {
                    if (D.namespaceURI !== this.namespaceURI) return !1;
                    if (D.prefix !== this.prefix) return !1;
                    if (D.localName !== this.localName) return !1;
                    if (D.value !== this.value) return !1;
                    return !0
                }
            }
            return Object.defineProperty(Z.prototype, "nodeType", {
                get: function() {
                    return this.type
                }
            }), Object.defineProperty(Z.prototype, "ownerElement", {
                get: function() {
                    return this.parent
                }
            }), Object.defineProperty(Z.prototype, "textContent", {
                get: function() {
                    return this.value
                },
                set: function(D) {
                    return this.value = D || ""
                }
            }), Object.defineProperty(Z.prototype, "namespaceURI", {
                get: function() {
                    return ""
                }
            }), Object.defineProperty(Z.prototype, "prefix", {
                get: function() {
                    return ""
                }
            }), Object.defineProperty(Z.prototype, "localName", {
                get: function() {
                    return this.name
                }
            }), Object.defineProperty(Z.prototype, "specified", {
                get: function() {
                    return !0
                }
            }), Z
        }.call(this)
    }).call(AQB)
});
var sS1 = E((QQB, ZQB) => {
    (function() {
        var A;
        ZQB.exports = A = function() {
            class B {
                constructor(Q) {
                    this.nodes = Q
                }
                clone() {
                    return this.nodes = null
                }
                getNamedItem(Q) {
                    return this.nodes[Q]
                }
                setNamedItem(Q) {
                    var Z = this.nodes[Q.nodeName];
                    return this.nodes[Q.nodeName] = Q, Z || null
                }
                removeNamedItem(Q) {
                    var Z = this.nodes[Q];
                    return delete this.nodes[Q], Z || null
                }
                item(Q) {
                    return this.nodes[Object.keys(this.nodes)[Q]] || null
                }
                getNamedItemNS(Q, Z) {
                    throw new Error("This DOM method is not implemented.")
                }
                setNamedItemNS(Q) {
                    throw new Error("This DOM method is not implemented.")
                }
                removeNamedItemNS(Q, Z) {
                    throw new Error("This DOM method is not implemented.")
                }
            }
            return Object.defineProperty(B.prototype, "length", {
                get: function() {
                    return Object.keys(this.nodes).length || 0
                }
            }), B
        }.call(this)
    }).call(QQB)
});
var rS1 = E((DQB, GQB) => {
    (function() {
        var A, B, Q, Z, D, G, F, I, Y = {}.hasOwnProperty;
        ({
            isObject: I,
            isFunction: F,
            getValue: G
        } = $M()), D = uK(), A = zG(), B = SC0(), Z = sS1(), GQB.exports = Q = function() {
            class W extends D {
                constructor(J, X, V) {
                    var C, K, H, z;
                    super(J);
                    if (X == null) throw new Error("Missing element name. " + this.debugInfo());
                    if (this.name = this.stringify.name(X), this.type = A.Element, this.attribs = {}, this.schemaTypeInfo = null, V != null) this.attribute(V);
                    if (J.type === A.Document) {
                        if (this.isRoot = !0, this.documentObject = J, J.rootObject = this, J.children) {
                            z = J.children;
                            for (K = 0, H = z.length; K < H; K++)
                                if (C = z[K], C.type === A.DocType) {
                                    C.name = this.name;
                                    break
                                }
                        }
                    }
                }
                clone() {
                    var J, X, V, C;
                    if (V = Object.create(this), V.isRoot) V.documentObject = null;
                    V.attribs = {}, C = this.attribs;
                    for (X in C) {
                        if (!Y.call(C, X)) continue;
                        J = C[X], V.attribs[X] = J.clone()
                    }
                    return V.children = [], this.children.forEach(function(K) {
                        var H = K.clone();
                        return H.parent = V, V.children.push(H)
                    }), V
                }
                attribute(J, X) {
                    var V, C;
                    if (J != null) J = G(J);
                    if (I(J))
                        for (V in J) {
                            if (!Y.call(J, V)) continue;
                            C = J[V], this.attribute(V, C)
                        } else {
                            if (F(X)) X = X.apply();
                            if (this.options.keepNullAttributes && X == null) this.attribs[J] = new B(this, J, "");
                            else if (X != null) this.attribs[J] = new B(this, J, X)
                        }
                    return this
                }
                removeAttribute(J) {
                    var X, V, C;
                    if (J == null) throw new Error("Missing attribute name. " + this.debugInfo());
                    if (J = G(J), Array.isArray(J))
                        for (V = 0, C = J.length; V < C; V++) X = J[V], delete this.attribs[X];
                    else delete this.attribs[J];
                    return this
                }
                toString(J) {
                    return this.options.writer.element(this, this.options.writer.filterOptions(J))
                }
                att(J, X) {
                    return this.attribute(J, X)
                }
                a(J, X) {
                    return this.attribute(J, X)
                }
                getAttribute(J) {
                    if (this.attribs.hasOwnProperty(J)) return this.attribs[J].value;
                    else return null
                }
                setAttribute(J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getAttributeNode(J) {
                    if (this.attribs.hasOwnProperty(J)) return this.attribs[J];
                    else return null
                }
                setAttributeNode(J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                removeAttributeNode(J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getElementsByTagName(J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getAttributeNS(J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                setAttributeNS(J, X, V) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                removeAttributeNS(J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getAttributeNodeNS(J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                setAttributeNodeNS(J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getElementsByTagNameNS(J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                hasAttribute(J) {
                    return this.attribs.hasOwnProperty(J)
                }
                hasAttributeNS(J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                setIdAttribute(J, X) {
                    if (this.attribs.hasOwnProperty(J)) return this.attribs[J].isId;
                    else return X
                }
                setIdAttributeNS(J, X, V) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                setIdAttributeNode(J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getElementsByTagName(J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getElementsByTagNameNS(J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getElementsByClassName(J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                isEqualNode(J) {
                    var X, V, C;
                    if (!super.isEqualNode(J)) return !1;
                    if (J.namespaceURI !== this.namespaceURI) return !1;
                    if (J.prefix !== this.prefix) return !1;
                    if (J.localName !== this.localName) return !1;
                    if (J.attribs.length !== this.attribs.length) return !1;
                    for (X = V = 0, C = this.attribs.length - 1; 0 <= C ? V <= C : V >= C; X = 0 <= C ? ++V : --V)
                        if (!this.attribs[X].isEqualNode(J.attribs[X])) return !1;
                    return !0
                }
            }
            return Object.defineProperty(W.prototype, "tagName", {
                get: function() {
                    return this.name
                }
            }), Object.defineProperty(W.prototype, "namespaceURI", {
                get: function() {
                    return ""
                }
            }), Object.defineProperty(W.prototype, "prefix", {
                get: function() {
                    return ""
                }
            }), Object.defineProperty(W.prototype, "localName", {
                get: function() {
                    return this.name
                }
            }), Object.defineProperty(W.prototype, "id", {
                get: function() {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
            }), Object.defineProperty(W.prototype, "className", {
                get: function() {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
            }), Object.defineProperty(W.prototype, "classList", {
                get: function() {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
            }), Object.defineProperty(W.prototype, "attributes", {
                get: function() {
                    if (!this.attributeMap || !this.attributeMap.nodes) this.attributeMap = new Z(this.attribs);
                    return this.attributeMap
                }
            }), W
        }.call(this)
    }).call(DQB)
});
var a71 = E((FQB, IQB) => {
    (function() {
        var A, B;
        B = uK(), IQB.exports = A = function() {
            class Q extends B {
                constructor(Z) {
                    super(Z);
                    this.value = ""
                }
                clone() {
                    return Object.create(this)
                }
                substringData(Z, D) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                appendData(Z) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                insertData(Z, D) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                deleteData(Z, D) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                replaceData(Z, D, G) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                isEqualNode(Z) {
                    if (!super.isEqualNode(Z)) return !1;
                    if (Z.data !== this.data) return !1;
                    return !0
                }
            }
            return Object.defineProperty(Q.prototype, "data", {
                get: function() {
                    return this.value
                },
                set: function(Z) {
                    return this.value = Z || ""
                }
            }), Object.defineProperty(Q.prototype, "length", {
                get: function() {
                    return this.value.length
                }
            }), Object.defineProperty(Q.prototype, "textContent", {
                get: function() {
                    return this.value
                },
                set: function(Z) {
                    return this.value = Z || ""
                }
            }), Q
        }.call(this)
    }).call(FQB)
});
var oS1 = E((YQB, WQB) => {
    (function() {
        var A, B, Q;
        A = zG(), Q = a71(), WQB.exports = B = class Z extends Q {
            constructor(D, G) {
                super(D);
                if (G == null) throw new Error("Missing CDATA text. " + this.debugInfo());
                this.name = "#cdata-section", this.type = A.CData, this.value = this.stringify.cdata(G)
            }
            clone() {
                return Object.create(this)
            }
            toString(D) {
                return this.options.writer.cdata(this, this.options.writer.filterOptions(D))
            }
        }
    }).call(YQB)
});
var tS1 = E((JQB, XQB) => {
    (function() {
        var A, B, Q;
        A = zG(), B = a71(), XQB.exports = Q = class Z extends B {
            constructor(D, G) {
                super(D);
                if (G == null) throw new Error("Missing comment text. " + this.debugInfo());
                this.name = "#comment", this.type = A.Comment, this.value = this.stringify.comment(G)
            }
            clone() {
                return Object.create(this)
            }
            toString(D) {
                return this.options.writer.comment(this, this.options.writer.filterOptions(D))
            }
        }
    }).call(JQB)
});
var eS1 = E((VQB, CQB) => {
    (function() {
        var A, B, Q, Z;
        ({
            isObject: Z
        } = $M()), Q = uK(), A = zG(), CQB.exports = B = class D extends Q {
            constructor(G, F, I, Y) {
                super(G);
                if (Z(F))({
                    version: F,
                    encoding: I,
                    standalone: Y
                } = F);
                if (!F) F = "1.0";
                if (this.type = A.Declaration, this.version = this.stringify.xmlVersion(F), I != null) this.encoding = this.stringify.xmlEncoding(I);
                if (Y != null) this.standalone = this.stringify.xmlStandalone(Y)
            }
            toString(G) {
                return this.options.writer.declaration(this, this.options.writer.filterOptions(G))
            }
        }
    }).call(VQB)
});
var Aj1 = E((KQB, HQB) => {
    (function() {
        var A, B, Q;
        Q = uK(), A = zG(), HQB.exports = B = class Z extends Q {
            constructor(D, G, F, I, Y, W) {
                super(D);
                if (G == null) throw new Error("Missing DTD element name. " + this.debugInfo());
                if (F == null) throw new Error("Missing DTD attribute name. " + this.debugInfo(G));
                if (!I) throw new Error("Missing DTD attribute type. " + this.debugInfo(G));
                if (!Y) throw new Error("Missing DTD attribute default. " + this.debugInfo(G));
                if (Y.indexOf("#") !== 0) Y = "#" + Y;
                if (!Y.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(G));
                if (W && !Y.match(/^(#FIXED|#DEFAULT)$/)) throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(G));
                if (this.elementName = this.stringify.name(G), this.type = A.AttributeDeclaration, this.attributeName = this.stringify.name(F), this.attributeType = this.stringify.dtdAttType(I), W) this.defaultValue = this.stringify.dtdAttDefault(W);
                this.defaultValueType = Y
            }
            toString(D) {
                return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(D))
            }
        }
    }).call(KQB)
});