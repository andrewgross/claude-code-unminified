/* chunk:362 bytes:[8523975, 8537506) size:13531 source:unpacked-cli.js */
var Bj1 = E((zQB, EQB) => {
    (function() {
        var A, B, Q, Z;
        ({
            isObject: Z
        } = $M()), Q = uK(), A = zG(), EQB.exports = B = function() {
            class D extends Q {
                constructor(G, F, I, Y) {
                    super(G);
                    if (I == null) throw new Error("Missing DTD entity name. " + this.debugInfo(I));
                    if (Y == null) throw new Error("Missing DTD entity value. " + this.debugInfo(I));
                    if (this.pe = !!F, this.name = this.stringify.name(I), this.type = A.EntityDeclaration, !Z(Y)) this.value = this.stringify.dtdEntityValue(Y), this.internal = !0;
                    else {
                        if (!Y.pubID && !Y.sysID) throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(I));
                        if (Y.pubID && !Y.sysID) throw new Error("System identifier is required for a public external entity. " + this.debugInfo(I));
                        if (this.internal = !1, Y.pubID != null) this.pubID = this.stringify.dtdPubID(Y.pubID);
                        if (Y.sysID != null) this.sysID = this.stringify.dtdSysID(Y.sysID);
                        if (Y.nData != null) this.nData = this.stringify.dtdNData(Y.nData);
                        if (this.pe && this.nData) throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(I))
                    }
                }
                toString(G) {
                    return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(G))
                }
            }
            return Object.defineProperty(D.prototype, "publicId", {
                get: function() {
                    return this.pubID
                }
            }), Object.defineProperty(D.prototype, "systemId", {
                get: function() {
                    return this.sysID
                }
            }), Object.defineProperty(D.prototype, "notationName", {
                get: function() {
                    return this.nData || null
                }
            }), Object.defineProperty(D.prototype, "inputEncoding", {
                get: function() {
                    return null
                }
            }), Object.defineProperty(D.prototype, "xmlEncoding", {
                get: function() {
                    return null
                }
            }), Object.defineProperty(D.prototype, "xmlVersion", {
                get: function() {
                    return null
                }
            }), D
        }.call(this)
    }).call(zQB)
});
var Qj1 = E((UQB, wQB) => {
    (function() {
        var A, B, Q;
        Q = uK(), A = zG(), wQB.exports = B = class Z extends Q {
            constructor(D, G, F) {
                super(D);
                if (G == null) throw new Error("Missing DTD element name. " + this.debugInfo());
                if (!F) F = "(#PCDATA)";
                if (Array.isArray(F)) F = "(" + F.join(",") + ")";
                this.name = this.stringify.name(G), this.type = A.ElementDeclaration, this.value = this.stringify.dtdElementValue(F)
            }
            toString(D) {
                return this.options.writer.dtdElement(this, this.options.writer.filterOptions(D))
            }
        }
    }).call(UQB)
});
var Zj1 = E(($QB, qQB) => {
    (function() {
        var A, B, Q;
        Q = uK(), A = zG(), qQB.exports = B = function() {
            class Z extends Q {
                constructor(D, G, F) {
                    super(D);
                    if (G == null) throw new Error("Missing DTD notation name. " + this.debugInfo(G));
                    if (!F.pubID && !F.sysID) throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(G));
                    if (this.name = this.stringify.name(G), this.type = A.NotationDeclaration, F.pubID != null) this.pubID = this.stringify.dtdPubID(F.pubID);
                    if (F.sysID != null) this.sysID = this.stringify.dtdSysID(F.sysID)
                }
                toString(D) {
                    return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(D))
                }
            }
            return Object.defineProperty(Z.prototype, "publicId", {
                get: function() {
                    return this.pubID
                }
            }), Object.defineProperty(Z.prototype, "systemId", {
                get: function() {
                    return this.sysID
                }
            }), Z
        }.call(this)
    }).call($QB)
});
var Dj1 = E((NQB, LQB) => {
    (function() {
        var A, B, Q, Z, D, G, F, I, Y;
        ({
            isObject: Y
        } = $M()), I = uK(), A = zG(), B = Aj1(), Z = Bj1(), Q = Qj1(), D = Zj1(), F = sS1(), LQB.exports = G = function() {
            class W extends I {
                constructor(J, X, V) {
                    var C, K, H, z;
                    super(J);
                    if (this.type = A.DocType, J.children) {
                        z = J.children;
                        for (K = 0, H = z.length; K < H; K++)
                            if (C = z[K], C.type === A.Element) {
                                this.name = C.name;
                                break
                            }
                    }
                    if (this.documentObject = J, Y(X))({
                        pubID: X,
                        sysID: V
                    } = X);
                    if (V == null)[V, X] = [X, V];
                    if (X != null) this.pubID = this.stringify.dtdPubID(X);
                    if (V != null) this.sysID = this.stringify.dtdSysID(V)
                }
                element(J, X) {
                    var V = new Q(this, J, X);
                    return this.children.push(V), this
                }
                attList(J, X, V, C, K) {
                    var H = new B(this, J, X, V, C, K);
                    return this.children.push(H), this
                }
                entity(J, X) {
                    var V = new Z(this, !1, J, X);
                    return this.children.push(V), this
                }
                pEntity(J, X) {
                    var V = new Z(this, !0, J, X);
                    return this.children.push(V), this
                }
                notation(J, X) {
                    var V = new D(this, J, X);
                    return this.children.push(V), this
                }
                toString(J) {
                    return this.options.writer.docType(this, this.options.writer.filterOptions(J))
                }
                ele(J, X) {
                    return this.element(J, X)
                }
                att(J, X, V, C, K) {
                    return this.attList(J, X, V, C, K)
                }
                ent(J, X) {
                    return this.entity(J, X)
                }
                pent(J, X) {
                    return this.pEntity(J, X)
                }
                not(J, X) {
                    return this.notation(J, X)
                }
                up() {
                    return this.root() || this.documentObject
                }
                isEqualNode(J) {
                    if (!super.isEqualNode(J)) return !1;
                    if (J.name !== this.name) return !1;
                    if (J.publicId !== this.publicId) return !1;
                    if (J.systemId !== this.systemId) return !1;
                    return !0
                }
            }
            return Object.defineProperty(W.prototype, "entities", {
                get: function() {
                    var J, X, V, C, K;
                    C = {}, K = this.children;
                    for (X = 0, V = K.length; X < V; X++)
                        if (J = K[X], J.type === A.EntityDeclaration && !J.pe) C[J.name] = J;
                    return new F(C)
                }
            }), Object.defineProperty(W.prototype, "notations", {
                get: function() {
                    var J, X, V, C, K;
                    C = {}, K = this.children;
                    for (X = 0, V = K.length; X < V; X++)
                        if (J = K[X], J.type === A.NotationDeclaration) C[J.name] = J;
                    return new F(C)
                }
            }), Object.defineProperty(W.prototype, "publicId", {
                get: function() {
                    return this.pubID
                }
            }), Object.defineProperty(W.prototype, "systemId", {
                get: function() {
                    return this.sysID
                }
            }), Object.defineProperty(W.prototype, "internalSubset", {
                get: function() {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
            }), W
        }.call(this)
    }).call(NQB)
});
var Gj1 = E((MQB, RQB) => {
    (function() {
        var A, B, Q;
        A = zG(), B = uK(), RQB.exports = Q = class Z extends B {
            constructor(D, G) {
                super(D);
                if (G == null) throw new Error("Missing raw text. " + this.debugInfo());
                this.type = A.Raw, this.value = this.stringify.raw(G)
            }
            clone() {
                return Object.create(this)
            }
            toString(D) {
                return this.options.writer.raw(this, this.options.writer.filterOptions(D))
            }
        }
    }).call(MQB)
});
var Fj1 = E((OQB, TQB) => {
    (function() {
        var A, B, Q;
        A = zG(), B = a71(), TQB.exports = Q = function() {
            class Z extends B {
                constructor(D, G) {
                    super(D);
                    if (G == null) throw new Error("Missing element text. " + this.debugInfo());
                    this.name = "#text", this.type = A.Text, this.value = this.stringify.text(G)
                }
                clone() {
                    return Object.create(this)
                }
                toString(D) {
                    return this.options.writer.text(this, this.options.writer.filterOptions(D))
                }
                splitText(D) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                replaceWholeText(D) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
            }
            return Object.defineProperty(Z.prototype, "isElementContentWhitespace", {
                get: function() {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
            }), Object.defineProperty(Z.prototype, "wholeText", {
                get: function() {
                    var D, G, F;
                    F = "", G = this.previousSibling;
                    while (G) F = G.data + F, G = G.previousSibling;
                    F += this.data, D = this.nextSibling;
                    while (D) F = F + D.data, D = D.nextSibling;
                    return F
                }
            }), Z
        }.call(this)
    }).call(OQB)
});
var Ij1 = E((PQB, SQB) => {
    (function() {
        var A, B, Q;
        A = zG(), B = a71(), SQB.exports = Q = class Z extends B {
            constructor(D, G, F) {
                super(D);
                if (G == null) throw new Error("Missing instruction target. " + this.debugInfo());
                if (this.type = A.ProcessingInstruction, this.target = this.stringify.insTarget(G), this.name = this.target, F) this.value = this.stringify.insValue(F)
            }
            clone() {
                return Object.create(this)
            }
            toString(D) {
                return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(D))
            }
            isEqualNode(D) {
                if (!super.isEqualNode(D)) return !1;
                if (D.target !== this.target) return !1;
                return !0
            }
        }
    }).call(PQB)
});
var jC0 = E((jQB, kQB) => {
    (function() {
        var A, B, Q;
        Q = uK(), A = zG(), kQB.exports = B = class Z extends Q {
            constructor(D) {
                super(D);
                this.type = A.Dummy
            }
            clone() {
                return Object.create(this)
            }
            toString(D) {
                return ""
            }
        }
    }).call(jQB)
});
var xQB = E((yQB, _QB) => {
    (function() {
        var A;
        _QB.exports = A = function() {
            class B {
                constructor(Q) {
                    this.nodes = Q
                }
                clone() {
                    return this.nodes = null
                }
                item(Q) {
                    return this.nodes[Q] || null
                }
            }
            return Object.defineProperty(B.prototype, "length", {
                get: function() {
                    return this.nodes.length || 0
                }
            }), B
        }.call(this)
    }).call(yQB)
});
var fQB = E((vQB, bQB) => {
    (function() {
        bQB.exports = {
            Disconnected: 1,
            Preceding: 2,
            Following: 4,
            Contains: 8,
            ContainedBy: 16,
            ImplementationSpecific: 32
        }
    }).call(vQB)
});