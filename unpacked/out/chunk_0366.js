/* chunk:366 bytes:[8585674, 8605534) size:19860 source:unpacked-cli.js */
var tQB = E((rQB, oQB) => {
    (function() {
        var A, B, Q, Z, D, G, F, I, Y, W, J, X, V, C, K, H, z, $, L, N, R, O, P, j = {}.hasOwnProperty;
        ({
            isObject: O,
            isFunction: R,
            isPlainObject: P,
            getValue: N
        } = $M()), A = zG(), X = _C0(), C = rS1(), Z = oS1(), D = tS1(), H = Gj1(), L = Fj1(), K = Ij1(), W = eS1(), J = Dj1(), G = Aj1(), I = Bj1(), F = Qj1(), Y = Zj1(), Q = SC0(), $ = kC0(), z = Yj1(), B = s71(), oQB.exports = V = class f {
            constructor(k, c, u) {
                var a;
                if (this.name = "?xml", this.type = A.Document, k || (k = {}), a = {}, !k.writer) k.writer = new z;
                else if (P(k.writer)) a = k.writer, k.writer = new z;
                this.options = k, this.writer = k.writer, this.writerOptions = this.writer.filterOptions(a), this.stringify = new $(k), this.onDataCallback = c || function() {}, this.onEndCallback = u || function() {}, this.currentNode = null, this.currentLevel = -1, this.openTags = {}, this.documentStarted = !1, this.documentCompleted = !1, this.root = null
            }
            createChildNode(k) {
                var c, u, a, l, y, t, E1, C1;
                switch (k.type) {
                    case A.CData:
                        this.cdata(k.value);
                        break;
                    case A.Comment:
                        this.comment(k.value);
                        break;
                    case A.Element:
                        a = {}, E1 = k.attribs;
                        for (u in E1) {
                            if (!j.call(E1, u)) continue;
                            c = E1[u], a[u] = c.value
                        }
                        this.node(k.name, a);
                        break;
                    case A.Dummy:
                        this.dummy();
                        break;
                    case A.Raw:
                        this.raw(k.value);
                        break;
                    case A.Text:
                        this.text(k.value);
                        break;
                    case A.ProcessingInstruction:
                        this.instruction(k.target, k.value);
                        break;
                    default:
                        throw new Error("This XML node type is not supported in a JS object: " + k.constructor.name)
                }
                C1 = k.children;
                for (y = 0, t = C1.length; y < t; y++)
                    if (l = C1[y], this.createChildNode(l), l.type === A.Element) this.up();
                return this
            }
            dummy() {
                return this
            }
            node(k, c, u) {
                if (k == null) throw new Error("Missing node name.");
                if (this.root && this.currentLevel === -1) throw new Error("Document can only have one root node. " + this.debugInfo(k));
                if (this.openCurrent(), k = N(k), c == null) c = {};
                if (c = N(c), !O(c))[u, c] = [c, u];
                if (this.currentNode = new C(this, k, c), this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, u != null) this.text(u);
                return this
            }
            element(k, c, u) {
                var a, l, y, t, E1, C1;
                if (this.currentNode && this.currentNode.type === A.DocType) this.dtdElement(...arguments);
                else if (Array.isArray(k) || O(k) || R(k)) {
                    t = this.options.noValidation, this.options.noValidation = !0, C1 = new X(this.options).element("TEMP_ROOT"), C1.element(k), this.options.noValidation = t, E1 = C1.children;
                    for (l = 0, y = E1.length; l < y; l++)
                        if (a = E1[l], this.createChildNode(a), a.type === A.Element) this.up()
                } else this.node(k, c, u);
                return this
            }
            attribute(k, c) {
                var u, a;
                if (!this.currentNode || this.currentNode.children) throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(k));
                if (k != null) k = N(k);
                if (O(k))
                    for (u in k) {
                        if (!j.call(k, u)) continue;
                        a = k[u], this.attribute(u, a)
                    } else {
                        if (R(c)) c = c.apply();
                        if (this.options.keepNullAttributes && c == null) this.currentNode.attribs[k] = new Q(this, k, "");
                        else if (c != null) this.currentNode.attribs[k] = new Q(this, k, c)
                    }
                return this
            }
            text(k) {
                var c;
                return this.openCurrent(), c = new L(this, k), this.onData(this.writer.text(c, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            cdata(k) {
                var c;
                return this.openCurrent(), c = new Z(this, k), this.onData(this.writer.cdata(c, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            comment(k) {
                var c;
                return this.openCurrent(), c = new D(this, k), this.onData(this.writer.comment(c, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            raw(k) {
                var c;
                return this.openCurrent(), c = new H(this, k), this.onData(this.writer.raw(c, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            instruction(k, c) {
                var u, a, l, y, t;
                if (this.openCurrent(), k != null) k = N(k);
                if (c != null) c = N(c);
                if (Array.isArray(k))
                    for (u = 0, y = k.length; u < y; u++) a = k[u], this.instruction(a);
                else if (O(k))
                    for (a in k) {
                        if (!j.call(k, a)) continue;
                        l = k[a], this.instruction(a, l)
                    } else {
                        if (R(c)) c = c.apply();
                        t = new K(this, k, c), this.onData(this.writer.processingInstruction(t, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1)
                    }
                return this
            }
            declaration(k, c, u) {
                var a;
                if (this.openCurrent(), this.documentStarted) throw new Error("declaration() must be the first node.");
                return a = new W(this, k, c, u), this.onData(this.writer.declaration(a, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            doctype(k, c, u) {
                if (this.openCurrent(), k == null) throw new Error("Missing root node name.");
                if (this.root) throw new Error("dtd() must come before the root node.");
                return this.currentNode = new J(this, c, u), this.currentNode.rootNodeName = k, this.currentNode.children = !1, this.currentLevel++, this.openTags[this.currentLevel] = this.currentNode, this
            }
            dtdElement(k, c) {
                var u;
                return this.openCurrent(), u = new F(this, k, c), this.onData(this.writer.dtdElement(u, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            attList(k, c, u, a, l) {
                var y;
                return this.openCurrent(), y = new G(this, k, c, u, a, l), this.onData(this.writer.dtdAttList(y, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            entity(k, c) {
                var u;
                return this.openCurrent(), u = new I(this, !1, k, c), this.onData(this.writer.dtdEntity(u, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            pEntity(k, c) {
                var u;
                return this.openCurrent(), u = new I(this, !0, k, c), this.onData(this.writer.dtdEntity(u, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            notation(k, c) {
                var u;
                return this.openCurrent(), u = new Y(this, k, c), this.onData(this.writer.dtdNotation(u, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1), this
            }
            up() {
                if (this.currentLevel < 0) throw new Error("The document node has no parent.");
                if (this.currentNode) {
                    if (this.currentNode.children) this.closeNode(this.currentNode);
                    else this.openNode(this.currentNode);
                    this.currentNode = null
                } else this.closeNode(this.openTags[this.currentLevel]);
                return delete this.openTags[this.currentLevel], this.currentLevel--, this
            }
            end() {
                while (this.currentLevel >= 0) this.up();
                return this.onEnd()
            }
            openCurrent() {
                if (this.currentNode) return this.currentNode.children = !0, this.openNode(this.currentNode)
            }
            openNode(k) {
                var c, u, a, l;
                if (!k.isOpen) {
                    if (!this.root && this.currentLevel === 0 && k.type === A.Element) this.root = k;
                    if (u = "", k.type === A.Element) {
                        this.writerOptions.state = B.OpenTag, u = this.writer.indent(k, this.writerOptions, this.currentLevel) + "<" + k.name, l = k.attribs;
                        for (a in l) {
                            if (!j.call(l, a)) continue;
                            c = l[a], u += this.writer.attribute(c, this.writerOptions, this.currentLevel)
                        }
                        u += (k.children ? ">" : "/>") + this.writer.endline(k, this.writerOptions, this.currentLevel), this.writerOptions.state = B.InsideTag
                    } else {
                        if (this.writerOptions.state = B.OpenTag, u = this.writer.indent(k, this.writerOptions, this.currentLevel) + "<!DOCTYPE " + k.rootNodeName, k.pubID && k.sysID) u += ' PUBLIC "' + k.pubID + '" "' + k.sysID + '"';
                        else if (k.sysID) u += ' SYSTEM "' + k.sysID + '"';
                        if (k.children) u += " [", this.writerOptions.state = B.InsideTag;
                        else this.writerOptions.state = B.CloseTag, u += ">";
                        u += this.writer.endline(k, this.writerOptions, this.currentLevel)
                    }
                    return this.onData(u, this.currentLevel), k.isOpen = !0
                }
            }
            closeNode(k) {
                var c;
                if (!k.isClosed) {
                    if (c = "", this.writerOptions.state = B.CloseTag, k.type === A.Element) c = this.writer.indent(k, this.writerOptions, this.currentLevel) + "</" + k.name + ">" + this.writer.endline(k, this.writerOptions, this.currentLevel);
                    else c = this.writer.indent(k, this.writerOptions, this.currentLevel) + "]>" + this.writer.endline(k, this.writerOptions, this.currentLevel);
                    return this.writerOptions.state = B.None, this.onData(c, this.currentLevel), k.isClosed = !0
                }
            }
            onData(k, c) {
                return this.documentStarted = !0, this.onDataCallback(k, c + 1)
            }
            onEnd() {
                return this.documentCompleted = !0, this.onEndCallback()
            }
            debugInfo(k) {
                if (k == null) return "";
                else return "node: <" + k + ">"
            }
            ele() {
                return this.element(...arguments)
            }
            nod(k, c, u) {
                return this.node(k, c, u)
            }
            txt(k) {
                return this.text(k)
            }
            dat(k) {
                return this.cdata(k)
            }
            com(k) {
                return this.comment(k)
            }
            ins(k, c) {
                return this.instruction(k, c)
            }
            dec(k, c, u) {
                return this.declaration(k, c, u)
            }
            dtd(k, c, u) {
                return this.doctype(k, c, u)
            }
            e(k, c, u) {
                return this.element(k, c, u)
            }
            n(k, c, u) {
                return this.node(k, c, u)
            }
            t(k) {
                return this.text(k)
            }
            d(k) {
                return this.cdata(k)
            }
            c(k) {
                return this.comment(k)
            }
            r(k) {
                return this.raw(k)
            }
            i(k, c) {
                return this.instruction(k, c)
            }
            att() {
                if (this.currentNode && this.currentNode.type === A.DocType) return this.attList(...arguments);
                else return this.attribute(...arguments)
            }
            a() {
                if (this.currentNode && this.currentNode.type === A.DocType) return this.attList(...arguments);
                else return this.attribute(...arguments)
            }
            ent(k, c) {
                return this.entity(k, c)
            }
            pent(k, c) {
                return this.pEntity(k, c)
            }
            not(k, c) {
                return this.notation(k, c)
            }
        }
    }).call(rQB)
});
var B4B = E((eQB, A4B) => {
    (function() {
        var A, B, Q, Z, D = {}.hasOwnProperty;
        A = zG(), Z = yC0(), B = s71(), A4B.exports = Q = class G extends Z {
            constructor(F, I) {
                super(I);
                this.stream = F
            }
            endline(F, I, Y) {
                if (F.isLastRootNode && I.state === B.CloseTag) return "";
                else return super.endline(F, I, Y)
            }
            document(F, I) {
                var Y, W, J, X, V, C, K, H, z;
                K = F.children;
                for (W = J = 0, V = K.length; J < V; W = ++J) Y = K[W], Y.isLastRootNode = W === F.children.length - 1;
                I = this.filterOptions(I), H = F.children, z = [];
                for (X = 0, C = H.length; X < C; X++) Y = H[X], z.push(this.writeChildNode(Y, I, 0));
                return z
            }
            cdata(F, I, Y) {
                return this.stream.write(super.cdata(F, I, Y))
            }
            comment(F, I, Y) {
                return this.stream.write(super.comment(F, I, Y))
            }
            declaration(F, I, Y) {
                return this.stream.write(super.declaration(F, I, Y))
            }
            docType(F, I, Y) {
                var W, J, X, V;
                if (Y || (Y = 0), this.openNode(F, I, Y), I.state = B.OpenTag, this.stream.write(this.indent(F, I, Y)), this.stream.write("<!DOCTYPE " + F.root().name), F.pubID && F.sysID) this.stream.write(' PUBLIC "' + F.pubID + '" "' + F.sysID + '"');
                else if (F.sysID) this.stream.write(' SYSTEM "' + F.sysID + '"');
                if (F.children.length > 0) {
                    this.stream.write(" ["), this.stream.write(this.endline(F, I, Y)), I.state = B.InsideTag, V = F.children;
                    for (J = 0, X = V.length; J < X; J++) W = V[J], this.writeChildNode(W, I, Y + 1);
                    I.state = B.CloseTag, this.stream.write("]")
                }
                return I.state = B.CloseTag, this.stream.write(I.spaceBeforeSlash + ">"), this.stream.write(this.endline(F, I, Y)), I.state = B.None, this.closeNode(F, I, Y)
            }
            element(F, I, Y) {
                var W, J, X, V, C, K, H, z, $, L, N, R, O, P, j, f;
                if (Y || (Y = 0), this.openNode(F, I, Y), I.state = B.OpenTag, N = this.indent(F, I, Y) + "<" + F.name, I.pretty && I.width > 0) {
                    H = N.length, O = F.attribs;
                    for ($ in O) {
                        if (!D.call(O, $)) continue;
                        if (W = O[$], R = this.attribute(W, I, Y), J = R.length, H + J > I.width) f = this.indent(F, I, Y + 1) + R, N += this.endline(F, I, Y) + f, H = f.length;
                        else f = " " + R, N += f, H += f.length
                    }
                } else {
                    P = F.attribs;
                    for ($ in P) {
                        if (!D.call(P, $)) continue;
                        W = P[$], N += this.attribute(W, I, Y)
                    }
                }
                if (this.stream.write(N), V = F.children.length, C = V === 0 ? null : F.children[0], V === 0 || F.children.every(function(k) {
                        return (k.type === A.Text || k.type === A.Raw || k.type === A.CData) && k.value === ""
                    }))
                    if (I.allowEmpty) this.stream.write(">"), I.state = B.CloseTag, this.stream.write("</" + F.name + ">");
                    else I.state = B.CloseTag, this.stream.write(I.spaceBeforeSlash + "/>");
                else if (I.pretty && V === 1 && (C.type === A.Text || C.type === A.Raw || C.type === A.CData) && C.value != null) this.stream.write(">"), I.state = B.InsideTag, I.suppressPrettyCount++, L = !0, this.writeChildNode(C, I, Y + 1), I.suppressPrettyCount--, L = !1, I.state = B.CloseTag, this.stream.write("</" + F.name + ">");
                else {
                    this.stream.write(">" + this.endline(F, I, Y)), I.state = B.InsideTag, j = F.children;
                    for (K = 0, z = j.length; K < z; K++) X = j[K], this.writeChildNode(X, I, Y + 1);
                    I.state = B.CloseTag, this.stream.write(this.indent(F, I, Y) + "</" + F.name + ">")
                }
                return this.stream.write(this.endline(F, I, Y)), I.state = B.None, this.closeNode(F, I, Y)
            }
            processingInstruction(F, I, Y) {
                return this.stream.write(super.processingInstruction(F, I, Y))
            }
            raw(F, I, Y) {
                return this.stream.write(super.raw(F, I, Y))
            }
            text(F, I, Y) {
                return this.stream.write(super.text(F, I, Y))
            }
            dtdAttList(F, I, Y) {
                return this.stream.write(super.dtdAttList(F, I, Y))
            }
            dtdElement(F, I, Y) {
                return this.stream.write(super.dtdElement(F, I, Y))
            }
            dtdEntity(F, I, Y) {
                return this.stream.write(super.dtdEntity(F, I, Y))
            }
            dtdNotation(F, I, Y) {
                return this.stream.write(super.dtdNotation(F, I, Y))
            }
        }
    }).call(eQB)
});
var Z4B = E((Q4B, Px) => {
    (function() {
        var A, B, Q, Z, D, G, F, I, Y;
        ({
            assign: I,
            isFunction: Y
        } = $M()), Q = PC0(), Z = _C0(), D = tQB(), F = Yj1(), G = B4B(), A = zG(), B = s71(), Q4B.create = function(W, J, X, V) {
            var C, K;
            if (W == null) throw new Error("Root element needs a name.");
            if (V = I({}, J, X, V), C = new Z(V), K = C.element(W), !V.headless) {
                if (C.declaration(V), V.pubID != null || V.sysID != null) C.dtd(V)
            }
            return K
        }, Q4B.begin = function(W, J, X) {
            if (Y(W))[J, X] = [W, J], W = {};
            if (J) return new D(W, J, X);
            else return new Z(W)
        }, Q4B.stringWriter = function(W) {
            return new F(W)
        }, Q4B.streamWriter = function(W, J) {
            return new G(W, J)
        }, Q4B.implementation = new Q, Q4B.nodeType = A, Q4B.writerState = B
    }).call(Q4B)
});