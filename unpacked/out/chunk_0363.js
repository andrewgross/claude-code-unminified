/* chunk:363 bytes:[8537507, 8559217) size:21710 source:unpacked-cli.js */
var uK = E((hQB, gQB) => {
    (function() {
        var A, B, Q, Z, D, G, F, I, Y, W, J, X, V, C, K, H, z, $, L = {}.hasOwnProperty,
            N = [].splice;
        ({
            isObject: $,
            isFunction: z,
            isEmpty: H,
            getValue: K
        } = $M()), I = null, Q = null, Z = null, D = null, G = null, V = null, C = null, X = null, F = null, B = null, J = null, Y = null, A = null, gQB.exports = W = function() {
            class R {
                constructor(O) {
                    if (this.parent = O, this.parent) this.options = this.parent.options, this.stringify = this.parent.stringify;
                    if (this.value = null, this.children = [], this.baseURI = null, !I) I = rS1(), Q = oS1(), Z = tS1(), D = eS1(), G = Dj1(), V = Gj1(), C = Fj1(), X = Ij1(), F = jC0(), B = zG(), J = xQB(), Y = sS1(), A = fQB()
                }
                setParent(O) {
                    var P, j, f, k, c;
                    if (this.parent = O, O) this.options = O.options, this.stringify = O.stringify;
                    k = this.children, c = [];
                    for (j = 0, f = k.length; j < f; j++) P = k[j], c.push(P.setParent(this));
                    return c
                }
                element(O, P, j) {
                    var f, k, c, u, a, l, y, t, E1;
                    if (l = null, P === null && j == null)[P, j] = [{}, null];
                    if (P == null) P = {};
                    if (P = K(P), !$(P))[j, P] = [P, j];
                    if (O != null) O = K(O);
                    if (Array.isArray(O))
                        for (c = 0, y = O.length; c < y; c++) k = O[c], l = this.element(k);
                    else if (z(O)) l = this.element(O.apply());
                    else if ($(O))
                        for (a in O) {
                            if (!L.call(O, a)) continue;
                            if (E1 = O[a], z(E1)) E1 = E1.apply();
                            if (!this.options.ignoreDecorators && this.stringify.convertAttKey && a.indexOf(this.stringify.convertAttKey) === 0) l = this.attribute(a.substr(this.stringify.convertAttKey.length), E1);
                            else if (!this.options.separateArrayItems && Array.isArray(E1) && H(E1)) l = this.dummy();
                            else if ($(E1) && H(E1)) l = this.element(a);
                            else if (!this.options.keepNullNodes && E1 == null) l = this.dummy();
                            else if (!this.options.separateArrayItems && Array.isArray(E1))
                                for (u = 0, t = E1.length; u < t; u++) k = E1[u], f = {}, f[a] = k, l = this.element(f);
                            else if ($(E1))
                                if (!this.options.ignoreDecorators && this.stringify.convertTextKey && a.indexOf(this.stringify.convertTextKey) === 0) l = this.element(E1);
                                else l = this.element(a), l.element(E1);
                            else l = this.element(a, E1)
                        } else if (!this.options.keepNullNodes && j === null) l = this.dummy();
                        else if (!this.options.ignoreDecorators && this.stringify.convertTextKey && O.indexOf(this.stringify.convertTextKey) === 0) l = this.text(j);
                    else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && O.indexOf(this.stringify.convertCDataKey) === 0) l = this.cdata(j);
                    else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && O.indexOf(this.stringify.convertCommentKey) === 0) l = this.comment(j);
                    else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && O.indexOf(this.stringify.convertRawKey) === 0) l = this.raw(j);
                    else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && O.indexOf(this.stringify.convertPIKey) === 0) l = this.instruction(O.substr(this.stringify.convertPIKey.length), j);
                    else l = this.node(O, P, j);
                    if (l == null) throw new Error("Could not create any elements with: " + O + ". " + this.debugInfo());
                    return l
                }
                insertBefore(O, P, j) {
                    var f, k, c, u, a;
                    if (O != null ? O.type : void 0) {
                        if (c = O, u = P, c.setParent(this), u) k = children.indexOf(u), a = children.splice(k), children.push(c), Array.prototype.push.apply(children, a);
                        else children.push(c);
                        return c
                    } else {
                        if (this.isRoot) throw new Error("Cannot insert elements at root level. " + this.debugInfo(O));
                        return k = this.parent.children.indexOf(this), a = this.parent.children.splice(k), f = this.parent.element(O, P, j), Array.prototype.push.apply(this.parent.children, a), f
                    }
                }
                insertAfter(O, P, j) {
                    var f, k, c;
                    if (this.isRoot) throw new Error("Cannot insert elements at root level. " + this.debugInfo(O));
                    return k = this.parent.children.indexOf(this), c = this.parent.children.splice(k + 1), f = this.parent.element(O, P, j), Array.prototype.push.apply(this.parent.children, c), f
                }
                remove() {
                    var O, P;
                    if (this.isRoot) throw new Error("Cannot remove the root element. " + this.debugInfo());
                    return O = this.parent.children.indexOf(this), N.apply(this.parent.children, [O, O - O + 1].concat(P = [])), this.parent
                }
                node(O, P, j) {
                    var f;
                    if (O != null) O = K(O);
                    if (P || (P = {}), P = K(P), !$(P))[j, P] = [P, j];
                    if (f = new I(this, O, P), j != null) f.text(j);
                    return this.children.push(f), f
                }
                text(O) {
                    var P;
                    if ($(O)) this.element(O);
                    return P = new C(this, O), this.children.push(P), this
                }
                cdata(O) {
                    var P = new Q(this, O);
                    return this.children.push(P), this
                }
                comment(O) {
                    var P = new Z(this, O);
                    return this.children.push(P), this
                }
                commentBefore(O) {
                    var P, j, f;
                    return j = this.parent.children.indexOf(this), f = this.parent.children.splice(j), P = this.parent.comment(O), Array.prototype.push.apply(this.parent.children, f), this
                }
                commentAfter(O) {
                    var P, j, f;
                    return j = this.parent.children.indexOf(this), f = this.parent.children.splice(j + 1), P = this.parent.comment(O), Array.prototype.push.apply(this.parent.children, f), this
                }
                raw(O) {
                    var P = new V(this, O);
                    return this.children.push(P), this
                }
                dummy() {
                    var O = new F(this);
                    return O
                }
                instruction(O, P) {
                    var j, f, k, c, u;
                    if (O != null) O = K(O);
                    if (P != null) P = K(P);
                    if (Array.isArray(O))
                        for (c = 0, u = O.length; c < u; c++) j = O[c], this.instruction(j);
                    else if ($(O))
                        for (j in O) {
                            if (!L.call(O, j)) continue;
                            f = O[j], this.instruction(j, f)
                        } else {
                            if (z(P)) P = P.apply();
                            k = new X(this, O, P), this.children.push(k)
                        }
                    return this
                }
                instructionBefore(O, P) {
                    var j, f, k;
                    return f = this.parent.children.indexOf(this), k = this.parent.children.splice(f), j = this.parent.instruction(O, P), Array.prototype.push.apply(this.parent.children, k), this
                }
                instructionAfter(O, P) {
                    var j, f, k;
                    return f = this.parent.children.indexOf(this), k = this.parent.children.splice(f + 1), j = this.parent.instruction(O, P), Array.prototype.push.apply(this.parent.children, k), this
                }
                declaration(O, P, j) {
                    var f, k;
                    if (f = this.document(), k = new D(f, O, P, j), f.children.length === 0) f.children.unshift(k);
                    else if (f.children[0].type === B.Declaration) f.children[0] = k;
                    else f.children.unshift(k);
                    return f.root() || f
                }
                dtd(O, P) {
                    var j, f, k, c, u, a, l, y, t, E1;
                    f = this.document(), k = new G(f, O, P), t = f.children;
                    for (c = u = 0, l = t.length; u < l; c = ++u)
                        if (j = t[c], j.type === B.DocType) return f.children[c] = k, k;
                    E1 = f.children;
                    for (c = a = 0, y = E1.length; a < y; c = ++a)
                        if (j = E1[c], j.isRoot) return f.children.splice(c, 0, k), k;
                    return f.children.push(k), k
                }
                up() {
                    if (this.isRoot) throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
                    return this.parent
                }
                root() {
                    var O = this;
                    while (O)
                        if (O.type === B.Document) return O.rootObject;
                        else if (O.isRoot) return O;
                    else O = O.parent
                }
                document() {
                    var O = this;
                    while (O)
                        if (O.type === B.Document) return O;
                        else O = O.parent
                }
                end(O) {
                    return this.document().end(O)
                }
                prev() {
                    var O = this.parent.children.indexOf(this);
                    if (O < 1) throw new Error("Already at the first node. " + this.debugInfo());
                    return this.parent.children[O - 1]
                }
                next() {
                    var O = this.parent.children.indexOf(this);
                    if (O === -1 || O === this.parent.children.length - 1) throw new Error("Already at the last node. " + this.debugInfo());
                    return this.parent.children[O + 1]
                }
                importDocument(O) {
                    var P, j, f, k, c;
                    if (j = O.root().clone(), j.parent = this, j.isRoot = !1, this.children.push(j), this.type === B.Document) {
                        if (j.isRoot = !0, j.documentObject = this, this.rootObject = j, this.children) {
                            c = this.children;
                            for (f = 0, k = c.length; f < k; f++)
                                if (P = c[f], P.type === B.DocType) {
                                    P.name = j.name;
                                    break
                                }
                        }
                    }
                    return this
                }
                debugInfo(O) {
                    var P, j;
                    if (O = O || this.name, O == null && !((P = this.parent) != null ? P.name : void 0)) return "";
                    else if (O == null) return "parent: <" + this.parent.name + ">";
                    else if (!((j = this.parent) != null ? j.name : void 0)) return "node: <" + O + ">";
                    else return "node: <" + O + ">, parent: <" + this.parent.name + ">"
                }
                ele(O, P, j) {
                    return this.element(O, P, j)
                }
                nod(O, P, j) {
                    return this.node(O, P, j)
                }
                txt(O) {
                    return this.text(O)
                }
                dat(O) {
                    return this.cdata(O)
                }
                com(O) {
                    return this.comment(O)
                }
                ins(O, P) {
                    return this.instruction(O, P)
                }
                doc() {
                    return this.document()
                }
                dec(O, P, j) {
                    return this.declaration(O, P, j)
                }
                e(O, P, j) {
                    return this.element(O, P, j)
                }
                n(O, P, j) {
                    return this.node(O, P, j)
                }
                t(O) {
                    return this.text(O)
                }
                d(O) {
                    return this.cdata(O)
                }
                c(O) {
                    return this.comment(O)
                }
                r(O) {
                    return this.raw(O)
                }
                i(O, P) {
                    return this.instruction(O, P)
                }
                u() {
                    return this.up()
                }
                importXMLBuilder(O) {
                    return this.importDocument(O)
                }
                attribute(O, P) {
                    throw new Error("attribute() applies to element nodes only.")
                }
                att(O, P) {
                    return this.attribute(O, P)
                }
                a(O, P) {
                    return this.attribute(O, P)
                }
                removeAttribute(O) {
                    throw new Error("attribute() applies to element nodes only.")
                }
                replaceChild(O, P) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                removeChild(O) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                appendChild(O) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                hasChildNodes() {
                    return this.children.length !== 0
                }
                cloneNode(O) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                normalize() {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                isSupported(O, P) {
                    return !0
                }
                hasAttributes() {
                    return this.attribs.length !== 0
                }
                compareDocumentPosition(O) {
                    var P, j;
                    if (P = this, P === O) return 0;
                    else if (this.document() !== O.document()) {
                        if (j = A.Disconnected | A.ImplementationSpecific, Math.random() < 0.5) j |= A.Preceding;
                        else j |= A.Following;
                        return j
                    } else if (P.isAncestor(O)) return A.Contains | A.Preceding;
                    else if (P.isDescendant(O)) return A.Contains | A.Following;
                    else if (P.isPreceding(O)) return A.Preceding;
                    else return A.Following
                }
                isSameNode(O) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                lookupPrefix(O) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                isDefaultNamespace(O) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                lookupNamespaceURI(O) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                isEqualNode(O) {
                    var P, j, f;
                    if (O.nodeType !== this.nodeType) return !1;
                    if (O.children.length !== this.children.length) return !1;
                    for (P = j = 0, f = this.children.length - 1; 0 <= f ? j <= f : j >= f; P = 0 <= f ? ++j : --j)
                        if (!this.children[P].isEqualNode(O.children[P])) return !1;
                    return !0
                }
                getFeature(O, P) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                setUserData(O, P, j) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getUserData(O) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                contains(O) {
                    if (!O) return !1;
                    return O === this || this.isDescendant(O)
                }
                isDescendant(O) {
                    var P, j, f, k, c;
                    c = this.children;
                    for (f = 0, k = c.length; f < k; f++) {
                        if (P = c[f], O === P) return !0;
                        if (j = P.isDescendant(O), j) return !0
                    }
                    return !1
                }
                isAncestor(O) {
                    return O.isDescendant(this)
                }
                isPreceding(O) {
                    var P, j;
                    if (P = this.treePosition(O), j = this.treePosition(this), P === -1 || j === -1) return !1;
                    else return P < j
                }
                isFollowing(O) {
                    var P, j;
                    if (P = this.treePosition(O), j = this.treePosition(this), P === -1 || j === -1) return !1;
                    else return P > j
                }
                treePosition(O) {
                    var P, j;
                    if (j = 0, P = !1, this.foreachTreeNode(this.document(), function(f) {
                            if (j++, !P && f === O) return P = !0
                        }), P) return j;
                    else return -1
                }
                foreachTreeNode(O, P) {
                    var j, f, k, c, u;
                    O || (O = this.document()), c = O.children;
                    for (f = 0, k = c.length; f < k; f++)
                        if (j = c[f], u = P(j)) return u;
                        else if (u = this.foreachTreeNode(j, P), u) return u
                }
            }
            return Object.defineProperty(R.prototype, "nodeName", {
                get: function() {
                    return this.name
                }
            }), Object.defineProperty(R.prototype, "nodeType", {
                get: function() {
                    return this.type
                }
            }), Object.defineProperty(R.prototype, "nodeValue", {
                get: function() {
                    return this.value
                }
            }), Object.defineProperty(R.prototype, "parentNode", {
                get: function() {
                    return this.parent
                }
            }), Object.defineProperty(R.prototype, "childNodes", {
                get: function() {
                    if (!this.childNodeList || !this.childNodeList.nodes) this.childNodeList = new J(this.children);
                    return this.childNodeList
                }
            }), Object.defineProperty(R.prototype, "firstChild", {
                get: function() {
                    return this.children[0] || null
                }
            }), Object.defineProperty(R.prototype, "lastChild", {
                get: function() {
                    return this.children[this.children.length - 1] || null
                }
            }), Object.defineProperty(R.prototype, "previousSibling", {
                get: function() {
                    var O = this.parent.children.indexOf(this);
                    return this.parent.children[O - 1] || null
                }
            }), Object.defineProperty(R.prototype, "nextSibling", {
                get: function() {
                    var O = this.parent.children.indexOf(this);
                    return this.parent.children[O + 1] || null
                }
            }), Object.defineProperty(R.prototype, "ownerDocument", {
                get: function() {
                    return this.document() || null
                }
            }), Object.defineProperty(R.prototype, "textContent", {
                get: function() {
                    var O, P, j, f, k;
                    if (this.nodeType === B.Element || this.nodeType === B.DocumentFragment) {
                        k = "", f = this.children;
                        for (P = 0, j = f.length; P < j; P++)
                            if (O = f[P], O.textContent) k += O.textContent;
                        return k
                    } else return null
                },
                set: function(O) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
            }), R
        }.call(this)
    }).call(hQB)
});