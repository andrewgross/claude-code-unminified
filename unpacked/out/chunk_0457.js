/* chunk:457 bytes:[10856274, 10886077) size:29803 source:unpacked-cli.js */
var f01 = E((nR3, j_B) => {
    j_B.exports = ev;
    var wM0 = Kf1(),
        tZ = MD(),
        ZR = tZ.NAMESPACE,
        qf1 = JM0(),
        i$ = YW(),
        $M0 = kd(),
        rC8 = tL0(),
        $f1 = X_B(),
        b01 = Wf1(),
        oC8 = VM0(),
        qM0 = Uf1(),
        T_B = Cf1(),
        tC8 = wf1(),
        eC8 = EM0(),
        P_B = UM0(),
        O_B = Object.create(null);

    function ev(A, B, Q, Z) {
        T_B.call(this), this.nodeType = i$.ELEMENT_NODE, this.ownerDocument = A, this.localName = B, this.namespaceURI = Q, this.prefix = Z, this._tagName = void 0, this._attrsByQName = Object.create(null), this._attrsByLName = Object.create(null), this._attrKeys = []
    }

    function NM0(A, B) {
        if (A.nodeType === i$.TEXT_NODE) B.push(A._data);
        else
            for (var Q = 0, Z = A.childNodes.length; Q < Z; Q++) NM0(A.childNodes[Q], B)
    }
    ev.prototype = Object.create(T_B.prototype, {
        isHTML: {
            get: function A() {
                return this.namespaceURI === ZR.HTML && this.ownerDocument.isHTML
            }
        },
        tagName: {
            get: function A() {
                if (this._tagName === void 0) {
                    var B;
                    if (this.prefix === null) B = this.localName;
                    else B = this.prefix + ":" + this.localName;
                    if (this.isHTML) {
                        var Q = O_B[B];
                        if (!Q) O_B[B] = Q = tZ.toASCIIUpperCase(B);
                        B = Q
                    }
                    this._tagName = B
                }
                return this._tagName
            }
        },
        nodeName: {
            get: function() {
                return this.tagName
            }
        },
        nodeValue: {
            get: function() {
                return null
            },
            set: function() {}
        },
        textContent: {
            get: function() {
                var A = [];
                return NM0(this, A), A.join("")
            },
            set: function(A) {
                if (this.removeChildren(), A !== null && A !== void 0 && A !== "") this._appendChild(this.ownerDocument.createTextNode(A))
            }
        },
        innerText: {
            get: function() {
                var A = [];
                return NM0(this, A), A.join("").replace(/[ \t\n\f\r]+/g, " ").trim()
            },
            set: function(A) {
                if (this.removeChildren(), A !== null && A !== void 0 && A !== "") this._appendChild(this.ownerDocument.createTextNode(A))
            }
        },
        innerHTML: {
            get: function() {
                return this.serialize()
            },
            set: tZ.nyi
        },
        outerHTML: {
            get: function() {
                return rC8.serializeOne(this, {
                    nodeType: 0
                })
            },
            set: function(A) {
                var B = this.ownerDocument,
                    Q = this.parentNode;
                if (Q === null) return;
                if (Q.nodeType === i$.DOCUMENT_NODE) tZ.NoModificationAllowedError();
                if (Q.nodeType === i$.DOCUMENT_FRAGMENT_NODE) Q = Q.ownerDocument.createElement("body");
                var Z = B.implementation.mozHTMLParser(B._address, Q);
                Z.parse(A === null ? "" : String(A), !0), this.replaceWith(Z._asDocumentFragment())
            }
        },
        _insertAdjacent: {
            value: function A(B, Q) {
                var Z = !1;
                switch (B) {
                    case "beforebegin":
                        Z = !0;
                    case "afterend":
                        var D = this.parentNode;
                        if (D === null) return null;
                        return D.insertBefore(Q, Z ? this : this.nextSibling);
                    case "afterbegin":
                        Z = !0;
                    case "beforeend":
                        return this.insertBefore(Q, Z ? this.firstChild : null);
                    default:
                        return tZ.SyntaxError()
                }
            }
        },
        insertAdjacentElement: {
            value: function A(B, Q) {
                if (Q.nodeType !== i$.ELEMENT_NODE) throw new TypeError("not an element");
                return B = tZ.toASCIILowerCase(String(B)), this._insertAdjacent(B, Q)
            }
        },
        insertAdjacentText: {
            value: function A(B, Q) {
                var Z = this.ownerDocument.createTextNode(Q);
                B = tZ.toASCIILowerCase(String(B)), this._insertAdjacent(B, Z)
            }
        },
        insertAdjacentHTML: {
            value: function A(B, Q) {
                B = tZ.toASCIILowerCase(String(B)), Q = String(Q);
                var Z;
                switch (B) {
                    case "beforebegin":
                    case "afterend":
                        if (Z = this.parentNode, Z === null || Z.nodeType === i$.DOCUMENT_NODE) tZ.NoModificationAllowedError();
                        break;
                    case "afterbegin":
                    case "beforeend":
                        Z = this;
                        break;
                    default:
                        tZ.SyntaxError()
                }
                if (!(Z instanceof ev) || Z.ownerDocument.isHTML && Z.localName === "html" && Z.namespaceURI === ZR.HTML) Z = Z.ownerDocument.createElementNS(ZR.HTML, "body");
                var D = this.ownerDocument.implementation.mozHTMLParser(this.ownerDocument._address, Z);
                D.parse(Q, !0), this._insertAdjacent(B, D._asDocumentFragment())
            }
        },
        children: {
            get: function() {
                if (!this._children) this._children = new S_B(this);
                return this._children
            }
        },
        attributes: {
            get: function() {
                if (!this._attributes) this._attributes = new MM0(this);
                return this._attributes
            }
        },
        firstElementChild: {
            get: function() {
                for (var A = this.firstChild; A !== null; A = A.nextSibling)
                    if (A.nodeType === i$.ELEMENT_NODE) return A;
                return null
            }
        },
        lastElementChild: {
            get: function() {
                for (var A = this.lastChild; A !== null; A = A.previousSibling)
                    if (A.nodeType === i$.ELEMENT_NODE) return A;
                return null
            }
        },
        childElementCount: {
            get: function() {
                return this.children.length
            }
        },
        nextElement: {
            value: function(A) {
                if (!A) A = this.ownerDocument.documentElement;
                var B = this.firstElementChild;
                if (!B) {
                    if (this === A) return null;
                    B = this.nextElementSibling
                }
                if (B) return B;
                for (var Q = this.parentElement; Q && Q !== A; Q = Q.parentElement)
                    if (B = Q.nextElementSibling, B) return B;
                return null
            }
        },
        getElementsByTagName: {
            value: function A(B) {
                var Q;
                if (!B) return new $M0;
                if (B === "*") Q = function() {
                    return !0
                };
                else if (this.isHTML) Q = AK8(B);
                else Q = LM0(B);
                return new $f1(this, Q)
            }
        },
        getElementsByTagNameNS: {
            value: function A(B, Q) {
                var Z;
                if (B === "*" && Q === "*") Z = function() {
                    return !0
                };
                else if (B === "*") Z = LM0(Q);
                else if (Q === "*") Z = BK8(B);
                else Z = QK8(B, Q);
                return new $f1(this, Z)
            }
        },
        getElementsByClassName: {
            value: function A(B) {
                if (B = String(B).trim(), B === "") {
                    var Q = new $M0;
                    return Q
                }
                return B = B.split(/[ \t\r\n\f]+/), new $f1(this, ZK8(B))
            }
        },
        getElementsByName: {
            value: function A(B) {
                return new $f1(this, DK8(String(B)))
            }
        },
        clone: {
            value: function A() {
                var B;
                if (this.namespaceURI !== ZR.HTML || this.prefix || !this.ownerDocument.isHTML) B = this.ownerDocument.createElementNS(this.namespaceURI, this.prefix !== null ? this.prefix + ":" + this.localName : this.localName);
                else B = this.ownerDocument.createElement(this.localName);
                for (var Q = 0, Z = this._attrKeys.length; Q < Z; Q++) {
                    var D = this._attrKeys[Q],
                        G = this._attrsByLName[D],
                        F = G.cloneNode();
                    F._setOwnerElement(B), B._attrsByLName[D] = F, B._addQName(F)
                }
                return B._attrKeys = this._attrKeys.concat(), B
            }
        },
        isEqual: {
            value: function A(B) {
                if (this.localName !== B.localName || this.namespaceURI !== B.namespaceURI || this.prefix !== B.prefix || this._numattrs !== B._numattrs) return !1;
                for (var Q = 0, Z = this._numattrs; Q < Z; Q++) {
                    var D = this._attr(Q);
                    if (!B.hasAttributeNS(D.namespaceURI, D.localName)) return !1;
                    if (B.getAttributeNS(D.namespaceURI, D.localName) !== D.value) return !1
                }
                return !0
            }
        },
        _lookupNamespacePrefix: {
            value: function A(B, Q) {
                if (this.namespaceURI && this.namespaceURI === B && this.prefix !== null && Q.lookupNamespaceURI(this.prefix) === B) return this.prefix;
                for (var Z = 0, D = this._numattrs; Z < D; Z++) {
                    var G = this._attr(Z);
                    if (G.prefix === "xmlns" && G.value === B && Q.lookupNamespaceURI(G.localName) === B) return G.localName
                }
                var F = this.parentElement;
                return F ? F._lookupNamespacePrefix(B, Q) : null
            }
        },
        lookupNamespaceURI: {
            value: function A(B) {
                if (B === "" || B === void 0) B = null;
                if (this.namespaceURI !== null && this.prefix === B) return this.namespaceURI;
                for (var Q = 0, Z = this._numattrs; Q < Z; Q++) {
                    var D = this._attr(Q);
                    if (D.namespaceURI === ZR.XMLNS) {
                        if (D.prefix === "xmlns" && D.localName === B || B === null && D.prefix === null && D.localName === "xmlns") return D.value || null
                    }
                }
                var G = this.parentElement;
                return G ? G.lookupNamespaceURI(B) : null
            }
        },
        getAttribute: {
            value: function A(B) {
                var Q = this.getAttributeNode(B);
                return Q ? Q.value : null
            }
        },
        getAttributeNS: {
            value: function A(B, Q) {
                var Z = this.getAttributeNodeNS(B, Q);
                return Z ? Z.value : null
            }
        },
        getAttributeNode: {
            value: function A(B) {
                if (B = String(B), /[A-Z]/.test(B) && this.isHTML) B = tZ.toASCIILowerCase(B);
                var Q = this._attrsByQName[B];
                if (!Q) return null;
                if (Array.isArray(Q)) Q = Q[0];
                return Q
            }
        },
        getAttributeNodeNS: {
            value: function A(B, Q) {
                B = B === void 0 || B === null ? "" : String(B), Q = String(Q);
                var Z = this._attrsByLName[B + "|" + Q];
                return Z ? Z : null
            }
        },
        hasAttribute: {
            value: function A(B) {
                if (B = String(B), /[A-Z]/.test(B) && this.isHTML) B = tZ.toASCIILowerCase(B);
                return this._attrsByQName[B] !== void 0
            }
        },
        hasAttributeNS: {
            value: function A(B, Q) {
                B = B === void 0 || B === null ? "" : String(B), Q = String(Q);
                var Z = B + "|" + Q;
                return this._attrsByLName[Z] !== void 0
            }
        },
        hasAttributes: {
            value: function A() {
                return this._numattrs > 0
            }
        },
        toggleAttribute: {
            value: function A(B, Q) {
                if (B = String(B), !wM0.isValidName(B)) tZ.InvalidCharacterError();
                if (/[A-Z]/.test(B) && this.isHTML) B = tZ.toASCIILowerCase(B);
                var Z = this._attrsByQName[B];
                if (Z === void 0) {
                    if (Q === void 0 || Q === !0) return this._setAttribute(B, ""), !0;
                    return !1
                } else {
                    if (Q === void 0 || Q === !1) return this.removeAttribute(B), !1;
                    return !0
                }
            }
        },
        _setAttribute: {
            value: function A(B, Q) {
                var Z = this._attrsByQName[B],
                    D;
                if (!Z) Z = this._newattr(B), D = !0;
                else if (Array.isArray(Z)) Z = Z[0];
                if (Z.value = Q, this._attributes) this._attributes[B] = Z;
                if (D && this._newattrhook) this._newattrhook(B, Q)
            }
        },
        setAttribute: {
            value: function A(B, Q) {
                if (B = String(B), !wM0.isValidName(B)) tZ.InvalidCharacterError();
                if (/[A-Z]/.test(B) && this.isHTML) B = tZ.toASCIILowerCase(B);
                this._setAttribute(B, String(Q))
            }
        },
        _setAttributeNS: {
            value: function A(B, Q, Z) {
                var D = Q.indexOf(":"),
                    G, F;
                if (D < 0) G = null, F = Q;
                else G = Q.substring(0, D), F = Q.substring(D + 1);
                if (B === "" || B === void 0) B = null;
                var I = (B === null ? "" : B) + "|" + F,
                    Y = this._attrsByLName[I],
                    W;
                if (!Y) {
                    if (Y = new uF1(this, F, G, B), W = !0, this._attrsByLName[I] = Y, this._attributes) this._attributes[this._attrKeys.length] = Y;
                    this._attrKeys.push(I), this._addQName(Y)
                }
                if (Y.value = Z, W && this._newattrhook) this._newattrhook(Q, Z)
            }
        },
        setAttributeNS: {
            value: function A(B, Q, Z) {
                if (B = B === null || B === void 0 || B === "" ? null : String(B), Q = String(Q), !wM0.isValidQName(Q)) tZ.InvalidCharacterError();
                var D = Q.indexOf(":"),
                    G = D < 0 ? null : Q.substring(0, D);
                if (G !== null && B === null || G === "xml" && B !== ZR.XML || (Q === "xmlns" || G === "xmlns") && B !== ZR.XMLNS || B === ZR.XMLNS && !(Q === "xmlns" || G === "xmlns")) tZ.NamespaceError();
                this._setAttributeNS(B, Q, String(Z))
            }
        },
        setAttributeNode: {
            value: function A(B) {
                if (B.ownerElement !== null && B.ownerElement !== this) throw new b01(b01.INUSE_ATTRIBUTE_ERR);
                var Q = null,
                    Z = this._attrsByQName[B.name];
                if (Z) {
                    if (!Array.isArray(Z)) Z = [Z];
                    if (Z.some(function(D) {
                            return D === B
                        })) return B;
                    else if (B.ownerElement !== null) throw new b01(b01.INUSE_ATTRIBUTE_ERR);
                    Z.forEach(function(D) {
                        this.removeAttributeNode(D)
                    }, this), Q = Z[0]
                }
                return this.setAttributeNodeNS(B), Q
            }
        },
        setAttributeNodeNS: {
            value: function A(B) {
                if (B.ownerElement !== null) throw new b01(b01.INUSE_ATTRIBUTE_ERR);
                var Q = B.namespaceURI,
                    Z = (Q === null ? "" : Q) + "|" + B.localName,
                    D = this._attrsByLName[Z];
                if (D) this.removeAttributeNode(D);
                if (B._setOwnerElement(this), this._attrsByLName[Z] = B, this._attributes) this._attributes[this._attrKeys.length] = B;
                if (this._attrKeys.push(Z), this._addQName(B), this._newattrhook) this._newattrhook(B.name, B.value);
                return D || null
            }
        },
        removeAttribute: {
            value: function A(B) {
                if (B = String(B), /[A-Z]/.test(B) && this.isHTML) B = tZ.toASCIILowerCase(B);
                var Q = this._attrsByQName[B];
                if (!Q) return;
                if (Array.isArray(Q))
                    if (Q.length > 2) Q = Q.shift();
                    else this._attrsByQName[B] = Q[1], Q = Q[0];
                else this._attrsByQName[B] = void 0;
                var Z = Q.namespaceURI,
                    D = (Z === null ? "" : Z) + "|" + Q.localName;
                this._attrsByLName[D] = void 0;
                var G = this._attrKeys.indexOf(D);
                if (this._attributes) Array.prototype.splice.call(this._attributes, G, 1), this._attributes[B] = void 0;
                this._attrKeys.splice(G, 1);
                var F = Q.onchange;
                if (Q._setOwnerElement(null), F) F.call(Q, this, Q.localName, Q.value, null);
                if (this.rooted) this.ownerDocument.mutateRemoveAttr(Q)
            }
        },
        removeAttributeNS: {
            value: function A(B, Q) {
                B = B === void 0 || B === null ? "" : String(B), Q = String(Q);
                var Z = B + "|" + Q,
                    D = this._attrsByLName[Z];
                if (!D) return;
                this._attrsByLName[Z] = void 0;
                var G = this._attrKeys.indexOf(Z);
                if (this._attributes) Array.prototype.splice.call(this._attributes, G, 1);
                this._attrKeys.splice(G, 1), this._removeQName(D);
                var F = D.onchange;
                if (D._setOwnerElement(null), F) F.call(D, this, D.localName, D.value, null);
                if (this.rooted) this.ownerDocument.mutateRemoveAttr(D)
            }
        },
        removeAttributeNode: {
            value: function A(B) {
                var Q = B.namespaceURI,
                    Z = (Q === null ? "" : Q) + "|" + B.localName;
                if (this._attrsByLName[Z] !== B) tZ.NotFoundError();
                return this.removeAttributeNS(Q, B.localName), B
            }
        },
        getAttributeNames: {
            value: function A() {
                var B = this;
                return this._attrKeys.map(function(Q) {
                    return B._attrsByLName[Q].name
                })
            }
        },
        _getattr: {
            value: function A(B) {
                var Q = this._attrsByQName[B];
                return Q ? Q.value : null
            }
        },
        _setattr: {
            value: function A(B, Q) {
                var Z = this._attrsByQName[B],
                    D;
                if (!Z) Z = this._newattr(B), D = !0;
                if (Z.value = String(Q), this._attributes) this._attributes[B] = Z;
                if (D && this._newattrhook) this._newattrhook(B, Q)
            }
        },
        _newattr: {
            value: function A(B) {
                var Q = new uF1(this, B, null, null),
                    Z = "|" + B;
                if (this._attrsByQName[B] = Q, this._attrsByLName[Z] = Q, this._attributes) this._attributes[this._attrKeys.length] = Q;
                return this._attrKeys.push(Z), Q
            }
        },
        _addQName: {
            value: function(A) {
                var B = A.name,
                    Q = this._attrsByQName[B];
                if (!Q) this._attrsByQName[B] = A;
                else if (Array.isArray(Q)) Q.push(A);
                else this._attrsByQName[B] = [Q, A];
                if (this._attributes) this._attributes[B] = A
            }
        },
        _removeQName: {
            value: function(A) {
                var B = A.name,
                    Q = this._attrsByQName[B];
                if (Array.isArray(Q)) {
                    var Z = Q.indexOf(A);
                    if (tZ.assert(Z !== -1), Q.length === 2) {
                        if (this._attrsByQName[B] = Q[1 - Z], this._attributes) this._attributes[B] = this._attrsByQName[B]
                    } else if (Q.splice(Z, 1), this._attributes && this._attributes[B] === A) this._attributes[B] = Q[0]
                } else if (tZ.assert(Q === A), this._attrsByQName[B] = void 0, this._attributes) this._attributes[B] = void 0
            }
        },
        _numattrs: {
            get: function() {
                return this._attrKeys.length
            }
        },
        _attr: {
            value: function(A) {
                return this._attrsByLName[this._attrKeys[A]]
            }
        },
        id: qf1.property({
            name: "id"
        }),
        className: qf1.property({
            name: "class"
        }),
        classList: {
            get: function() {
                var A = this;
                if (this._classList) return this._classList;
                var B = new oC8(function() {
                    return A.className || ""
                }, function(Q) {
                    A.className = Q
                });
                return this._classList = B, B
            },
            set: function(A) {
                this.className = A
            }
        },
        matches: {
            value: function(A) {
                return qM0.matches(this, A)
            }
        },
        closest: {
            value: function(A) {
                var B = this;
                do {
                    if (B.matches && B.matches(A)) return B;
                    B = B.parentElement || B.parentNode
                } while (B !== null && B.nodeType === i$.ELEMENT_NODE);
                return null
            }
        },
        querySelector: {
            value: function(A) {
                return qM0(A, this)[0]
            }
        },
        querySelectorAll: {
            value: function(A) {
                var B = qM0(A, this);
                return B.item ? B : new $M0(B)
            }
        }
    });
    Object.defineProperties(ev.prototype, tC8);
    Object.defineProperties(ev.prototype, eC8);
    qf1.registerChangeHandler(ev, "id", function(A, B, Q, Z) {
        if (A.rooted) {
            if (Q) A.ownerDocument.delId(Q, A);
            if (Z) A.ownerDocument.addId(Z, A)
        }
    });
    qf1.registerChangeHandler(ev, "class", function(A, B, Q, Z) {
        if (A._classList) A._classList._update()
    });

    function uF1(A, B, Q, Z, D) {
        this.localName = B, this.prefix = Q === null || Q === "" ? null : "" + Q, this.namespaceURI = Z === null || Z === "" ? null : "" + Z, this.data = D, this._setOwnerElement(A)
    }
    uF1.prototype = Object.create(Object.prototype, {
        ownerElement: {
            get: function() {
                return this._ownerElement
            }
        },
        _setOwnerElement: {
            value: function A(B) {
                if (this._ownerElement = B, this.prefix === null && this.namespaceURI === null && B) this.onchange = B._attributeChangeHandlers[this.localName];
                else this.onchange = null
            }
        },
        name: {
            get: function() {
                return this.prefix ? this.prefix + ":" + this.localName : this.localName
            }
        },
        specified: {
            get: function() {
                return !0
            }
        },
        value: {
            get: function() {
                return this.data
            },
            set: function(A) {
                var B = this.data;
                if (A = A === void 0 ? "" : A + "", A === B) return;
                if (this.data = A, this.ownerElement) {
                    if (this.onchange) this.onchange(this.ownerElement, this.localName, B, A);
                    if (this.ownerElement.rooted) this.ownerElement.ownerDocument.mutateAttr(this, B)
                }
            }
        },
        cloneNode: {
            value: function A(B) {
                return new uF1(null, this.localName, this.prefix, this.namespaceURI, this.data)
            }
        },
        nodeType: {
            get: function() {
                return i$.ATTRIBUTE_NODE
            }
        },
        nodeName: {
            get: function() {
                return this.name
            }
        },
        nodeValue: {
            get: function() {
                return this.value
            },
            set: function(A) {
                this.value = A
            }
        },
        textContent: {
            get: function() {
                return this.value
            },
            set: function(A) {
                if (A === null || A === void 0) A = "";
                this.value = A
            }
        },
        innerText: {
            get: function() {
                return this.value
            },
            set: function(A) {
                if (A === null || A === void 0) A = "";
                this.value = A
            }
        }
    });
    ev._Attr = uF1;

    function MM0(A) {
        P_B.call(this, A);
        for (var B in A._attrsByQName) this[B] = A._attrsByQName[B];
        for (var Q = 0; Q < A._attrKeys.length; Q++) this[Q] = A._attrsByLName[A._attrKeys[Q]]
    }
    MM0.prototype = Object.create(P_B.prototype, {
        length: {
            get: function() {
                return this.element._attrKeys.length
            },
            set: function() {}
        },
        item: {
            value: function(A) {
                if (A = A >>> 0, A >= this.length) return null;
                return this.element._attrsByLName[this.element._attrKeys[A]]
            }
        }
    });
    if (globalThis.Symbol?.iterator) MM0.prototype[globalThis.Symbol.iterator] = function() {
        var A = 0,
            B = this.length,
            Q = this;
        return {
            next: function() {
                if (A < B) return {
                    value: Q.item(A++)
                };
                return {
                    done: !0
                }
            }
        }
    };

    function S_B(A) {
        this.element = A, this.updateCache()
    }
    S_B.prototype = Object.create(Object.prototype, {
        length: {
            get: function() {
                return this.updateCache(), this.childrenByNumber.length
            }
        },
        item: {
            value: function A(B) {
                return this.updateCache(), this.childrenByNumber[B] || null
            }
        },
        namedItem: {
            value: function A(B) {
                return this.updateCache(), this.childrenByName[B] || null
            }
        },
        namedItems: {
            get: function() {
                return this.updateCache(), this.childrenByName
            }
        },
        updateCache: {
            value: function A() {
                var B = /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
                if (this.lastModTime !== this.element.lastModTime) {
                    this.lastModTime = this.element.lastModTime;
                    var Q = this.childrenByNumber && this.childrenByNumber.length || 0;
                    for (var Z = 0; Z < Q; Z++) this[Z] = void 0;
                    this.childrenByNumber = [], this.childrenByName = Object.create(null);
                    for (var D = this.element.firstChild; D !== null; D = D.nextSibling)
                        if (D.nodeType === i$.ELEMENT_NODE) {
                            this[this.childrenByNumber.length] = D, this.childrenByNumber.push(D);
                            var G = D.getAttribute("id");
                            if (G && !this.childrenByName[G]) this.childrenByName[G] = D;
                            var F = D.getAttribute("name");
                            if (F && this.element.namespaceURI === ZR.HTML && B.test(this.element.localName) && !this.childrenByName[F]) this.childrenByName[G] = D
                        }
                }
            }
        }
    });

    function LM0(A) {
        return function(B) {
            return B.localName === A
        }
    }

    function AK8(A) {
        var B = tZ.toASCIILowerCase(A);
        if (B === A) return LM0(A);
        return function(Q) {
            return Q.isHTML ? Q.localName === B : Q.localName === A
        }
    }

    function BK8(A) {
        return function(B) {
            return B.namespaceURI === A
        }
    }

    function QK8(A, B) {
        return function(Q) {
            return Q.namespaceURI === A && Q.localName === B
        }
    }

    function ZK8(A) {
        return function(B) {
            return A.every(function(Q) {
                return B.classList.contains(Q)
            })
        }
    }

    function DK8(A) {
        return function(B) {
            if (B.namespaceURI !== ZR.HTML) return !1;
            return B.getAttribute("name") === A
        }
    }
});