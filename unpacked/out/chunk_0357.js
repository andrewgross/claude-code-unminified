/* chunk:357 bytes:[8388459, 8421541) size:33082 source:unpacked-cli.js */
var qC0 = E((yM6) => {
    var oBB = f71(),
        EM = oBB.find,
        h71 = oBB.NAMESPACE;

    function wM6(A) {
        return A !== ""
    }

    function $M6(A) {
        return A ? A.split(/[\t\n\f\r ]+/).filter(wM6) : []
    }

    function qM6(A, B) {
        if (!A.hasOwnProperty(B)) A[B] = !0;
        return A
    }

    function lBB(A) {
        if (!A) return [];
        var B = $M6(A);
        return Object.keys(B.reduce(qM6, {}))
    }

    function NM6(A) {
        return function(B) {
            return A && A.indexOf(B) !== -1
        }
    }

    function u71(A, B) {
        for (var Q in A)
            if (Object.prototype.hasOwnProperty.call(A, Q)) B[Q] = A[Q]
    }

    function iV(A, B) {
        var Q = A.prototype;
        if (!(Q instanceof B)) {
            let D = function() {};
            var Z = D;
            D.prototype = B.prototype, D = new D, u71(Q, D), A.prototype = Q = D
        }
        if (Q.constructor != A) {
            if (typeof A != "function") console.error("unknown Class:" + A);
            Q.constructor = A
        }
    }
    var nV = {},
        K$ = nV.ELEMENT_NODE = 1,
        De = nV.ATTRIBUTE_NODE = 2,
        uS1 = nV.TEXT_NODE = 3,
        tBB = nV.CDATA_SECTION_NODE = 4,
        eBB = nV.ENTITY_REFERENCE_NODE = 5,
        LM6 = nV.ENTITY_NODE = 6,
        A9B = nV.PROCESSING_INSTRUCTION_NODE = 7,
        B9B = nV.COMMENT_NODE = 8,
        Q9B = nV.DOCUMENT_NODE = 9,
        Z9B = nV.DOCUMENT_TYPE_NODE = 10,
        vP = nV.DOCUMENT_FRAGMENT_NODE = 11,
        MM6 = nV.NOTATION_NODE = 12,
        WJ = {},
        MI = {},
        ks5 = WJ.INDEX_SIZE_ERR = (MI[1] = "Index size error", 1),
        ys5 = WJ.DOMSTRING_SIZE_ERR = (MI[2] = "DOMString size error", 2),
        pV = WJ.HIERARCHY_REQUEST_ERR = (MI[3] = "Hierarchy request error", 3),
        _s5 = WJ.WRONG_DOCUMENT_ERR = (MI[4] = "Wrong document", 4),
        xs5 = WJ.INVALID_CHARACTER_ERR = (MI[5] = "Invalid character", 5),
        vs5 = WJ.NO_DATA_ALLOWED_ERR = (MI[6] = "No data allowed", 6),
        bs5 = WJ.NO_MODIFICATION_ALLOWED_ERR = (MI[7] = "No modification allowed", 7),
        D9B = WJ.NOT_FOUND_ERR = (MI[8] = "Not found", 8),
        fs5 = WJ.NOT_SUPPORTED_ERR = (MI[9] = "Not supported", 9),
        pBB = WJ.INUSE_ATTRIBUTE_ERR = (MI[10] = "Attribute in use", 10),
        hs5 = WJ.INVALID_STATE_ERR = (MI[11] = "Invalid state", 11),
        gs5 = WJ.SYNTAX_ERR = (MI[12] = "Syntax error", 12),
        us5 = WJ.INVALID_MODIFICATION_ERR = (MI[13] = "Invalid modification", 13),
        ms5 = WJ.NAMESPACE_ERR = (MI[14] = "Invalid namespace", 14),
        ds5 = WJ.INVALID_ACCESS_ERR = (MI[15] = "Invalid access", 15);

    function HG(A, B) {
        if (B instanceof Error) var Q = B;
        else if (Q = this, Error.call(this, MI[A]), this.message = MI[A], Error.captureStackTrace) Error.captureStackTrace(this, HG);
        if (Q.code = A, B) this.message = this.message + ": " + B;
        return Q
    }
    HG.prototype = Error.prototype;
    u71(WJ, HG);

    function xP() {}
    xP.prototype = {
        length: 0,
        item: function(A) {
            return A >= 0 && A < this.length ? this[A] : null
        },
        toString: function(A, B) {
            for (var Q = [], Z = 0; Z < this.length; Z++) Ze(this[Z], Q, A, B);
            return Q.join("")
        },
        filter: function(A) {
            return Array.prototype.filter.call(this, A)
        },
        indexOf: function(A) {
            return Array.prototype.indexOf.call(this, A)
        }
    };

    function Ge(A, B) {
        this._node = A, this._refresh = B, CC0(this)
    }

    function CC0(A) {
        var B = A._node._inc || A._node.ownerDocument._inc;
        if (A._inc !== B) {
            var Q = A._refresh(A._node);
            if (z9B(A, "length", Q.length), !A.$$length || Q.length < A.$$length) {
                for (var Z = Q.length; Z in A; Z++)
                    if (Object.prototype.hasOwnProperty.call(A, Z)) delete A[Z]
            }
            u71(Q, A), A._inc = B
        }
    }
    Ge.prototype.item = function(A) {
        return CC0(this), this[A] || null
    };
    iV(Ge, xP);

    function mS1() {}

    function G9B(A, B) {
        var Q = A.length;
        while (Q--)
            if (A[Q] === B) return Q
    }

    function iBB(A, B, Q, Z) {
        if (Z) B[G9B(B, Z)] = Q;
        else B[B.length++] = Q;
        if (A) {
            Q.ownerElement = A;
            var D = A.ownerDocument;
            if (D) Z && Y9B(D, A, Z), RM6(D, A, Q)
        }
    }

    function nBB(A, B, Q) {
        var Z = G9B(B, Q);
        if (Z >= 0) {
            var D = B.length - 1;
            while (Z < D) B[Z] = B[++Z];
            if (B.length = D, A) {
                var G = A.ownerDocument;
                if (G) Y9B(G, A, Q), Q.ownerElement = null
            }
        } else throw new HG(D9B, new Error(A.tagName + "@" + Q))
    }
    mS1.prototype = {
        length: 0,
        item: xP.prototype.item,
        getNamedItem: function(A) {
            var B = this.length;
            while (B--) {
                var Q = this[B];
                if (Q.nodeName == A) return Q
            }
        },
        setNamedItem: function(A) {
            var B = A.ownerElement;
            if (B && B != this._ownerElement) throw new HG(pBB);
            var Q = this.getNamedItem(A.nodeName);
            return iBB(this._ownerElement, this, A, Q), Q
        },
        setNamedItemNS: function(A) {
            var B = A.ownerElement,
                Q;
            if (B && B != this._ownerElement) throw new HG(pBB);
            return Q = this.getNamedItemNS(A.namespaceURI, A.localName), iBB(this._ownerElement, this, A, Q), Q
        },
        removeNamedItem: function(A) {
            var B = this.getNamedItem(A);
            return nBB(this._ownerElement, this, B), B
        },
        removeNamedItemNS: function(A, B) {
            var Q = this.getNamedItemNS(A, B);
            return nBB(this._ownerElement, this, Q), Q
        },
        getNamedItemNS: function(A, B) {
            var Q = this.length;
            while (Q--) {
                var Z = this[Q];
                if (Z.localName == B && Z.namespaceURI == A) return Z
            }
            return null
        }
    };

    function F9B() {}
    F9B.prototype = {
        hasFeature: function(A, B) {
            return !0
        },
        createDocument: function(A, B, Q) {
            var Z = new m71;
            if (Z.implementation = this, Z.childNodes = new xP, Z.doctype = Q || null, Q) Z.appendChild(Q);
            if (B) {
                var D = Z.createElementNS(A, B);
                Z.appendChild(D)
            }
            return Z
        },
        createDocumentType: function(A, B, Q) {
            var Z = new lS1;
            return Z.name = A, Z.nodeName = A, Z.publicId = B || "", Z.systemId = Q || "", Z
        }
    };

    function e5() {}
    e5.prototype = {
        firstChild: null,
        lastChild: null,
        previousSibling: null,
        nextSibling: null,
        attributes: null,
        parentNode: null,
        childNodes: null,
        ownerDocument: null,
        nodeValue: null,
        namespaceURI: null,
        prefix: null,
        localName: null,
        insertBefore: function(A, B) {
            return dS1(this, A, B)
        },
        replaceChild: function(A, B) {
            if (dS1(this, A, B, J9B), B) this.removeChild(B)
        },
        removeChild: function(A) {
            return W9B(this, A)
        },
        appendChild: function(A) {
            return this.insertBefore(A, null)
        },
        hasChildNodes: function() {
            return this.firstChild != null
        },
        cloneNode: function(A) {
            return VC0(this.ownerDocument || this, this, A)
        },
        normalize: function() {
            var A = this.firstChild;
            while (A) {
                var B = A.nextSibling;
                if (B && B.nodeType == uS1 && A.nodeType == uS1) this.removeChild(B), A.appendData(B.data);
                else A.normalize(), A = B
            }
        },
        isSupported: function(A, B) {
            return this.ownerDocument.implementation.hasFeature(A, B)
        },
        hasAttributes: function() {
            return this.attributes.length > 0
        },
        lookupPrefix: function(A) {
            var B = this;
            while (B) {
                var Q = B._nsMap;
                if (Q) {
                    for (var Z in Q)
                        if (Object.prototype.hasOwnProperty.call(Q, Z) && Q[Z] === A) return Z
                }
                B = B.nodeType == De ? B.ownerDocument : B.parentNode
            }
            return null
        },
        lookupNamespaceURI: function(A) {
            var B = this;
            while (B) {
                var Q = B._nsMap;
                if (Q) {
                    if (Object.prototype.hasOwnProperty.call(Q, A)) return Q[A]
                }
                B = B.nodeType == De ? B.ownerDocument : B.parentNode
            }
            return null
        },
        isDefaultNamespace: function(A) {
            var B = this.lookupPrefix(A);
            return B == null
        }
    };

    function I9B(A) {
        return A == "<" && "&lt;" || A == ">" && "&gt;" || A == "&" && "&amp;" || A == '"' && "&quot;" || "&#" + A.charCodeAt() + ";"
    }
    u71(nV, e5);
    u71(nV, e5.prototype);

    function g71(A, B) {
        if (B(A)) return !0;
        if (A = A.firstChild)
            do
                if (g71(A, B)) return !0; while (A = A.nextSibling)
    }

    function m71() {
        this.ownerDocument = this
    }

    function RM6(A, B, Q) {
        A && A._inc++;
        var Z = Q.namespaceURI;
        if (Z === h71.XMLNS) B._nsMap[Q.prefix ? Q.localName : ""] = Q.value
    }

    function Y9B(A, B, Q, Z) {
        A && A._inc++;
        var D = Q.namespaceURI;
        if (D === h71.XMLNS) delete B._nsMap[Q.prefix ? Q.localName : ""]
    }

    function KC0(A, B, Q) {
        if (A && A._inc) {
            A._inc++;
            var Z = B.childNodes;
            if (Q) Z[Z.length++] = Q;
            else {
                var D = B.firstChild,
                    G = 0;
                while (D) Z[G++] = D, D = D.nextSibling;
                Z.length = G, delete Z[Z.length]
            }
        }
    }

    function W9B(A, B) {
        var {
            previousSibling: Q,
            nextSibling: Z
        } = B;
        if (Q) Q.nextSibling = Z;
        else A.firstChild = Z;
        if (Z) Z.previousSibling = Q;
        else A.lastChild = Q;
        return B.parentNode = null, B.previousSibling = null, B.nextSibling = null, KC0(A.ownerDocument, A), B
    }

    function OM6(A) {
        return A && (A.nodeType === e5.DOCUMENT_NODE || A.nodeType === e5.DOCUMENT_FRAGMENT_NODE || A.nodeType === e5.ELEMENT_NODE)
    }

    function TM6(A) {
        return A && (UM(A) || HC0(A) || bP(A) || A.nodeType === e5.DOCUMENT_FRAGMENT_NODE || A.nodeType === e5.COMMENT_NODE || A.nodeType === e5.PROCESSING_INSTRUCTION_NODE)
    }

    function bP(A) {
        return A && A.nodeType === e5.DOCUMENT_TYPE_NODE
    }

    function UM(A) {
        return A && A.nodeType === e5.ELEMENT_NODE
    }

    function HC0(A) {
        return A && A.nodeType === e5.TEXT_NODE
    }

    function aBB(A, B) {
        var Q = A.childNodes || [];
        if (EM(Q, UM) || bP(B)) return !1;
        var Z = EM(Q, bP);
        return !(B && Z && Q.indexOf(Z) > Q.indexOf(B))
    }

    function sBB(A, B) {
        var Q = A.childNodes || [];

        function Z(G) {
            return UM(G) && G !== B
        }
        if (EM(Q, Z)) return !1;
        var D = EM(Q, bP);
        return !(B && D && Q.indexOf(D) > Q.indexOf(B))
    }

    function PM6(A, B, Q) {
        if (!OM6(A)) throw new HG(pV, "Unexpected parent node type " + A.nodeType);
        if (Q && Q.parentNode !== A) throw new HG(D9B, "child not in parent");
        if (!TM6(B) || bP(B) && A.nodeType !== e5.DOCUMENT_NODE) throw new HG(pV, "Unexpected node type " + B.nodeType + " for parent node type " + A.nodeType)
    }

    function SM6(A, B, Q) {
        var Z = A.childNodes || [],
            D = B.childNodes || [];
        if (B.nodeType === e5.DOCUMENT_FRAGMENT_NODE) {
            var G = D.filter(UM);
            if (G.length > 1 || EM(D, HC0)) throw new HG(pV, "More than one element or text in fragment");
            if (G.length === 1 && !aBB(A, Q)) throw new HG(pV, "Element in fragment can not be inserted before doctype")
        }
        if (UM(B)) {
            if (!aBB(A, Q)) throw new HG(pV, "Only one element can be added and only after doctype")
        }
        if (bP(B)) {
            if (EM(Z, bP)) throw new HG(pV, "Only one doctype is allowed");
            var F = EM(Z, UM);
            if (Q && Z.indexOf(F) < Z.indexOf(Q)) throw new HG(pV, "Doctype can only be inserted before an element");
            if (!Q && F) throw new HG(pV, "Doctype can not be appended since element is present")
        }
    }

    function J9B(A, B, Q) {
        var Z = A.childNodes || [],
            D = B.childNodes || [];
        if (B.nodeType === e5.DOCUMENT_FRAGMENT_NODE) {
            var G = D.filter(UM);
            if (G.length > 1 || EM(D, HC0)) throw new HG(pV, "More than one element or text in fragment");
            if (G.length === 1 && !sBB(A, Q)) throw new HG(pV, "Element in fragment can not be inserted before doctype")
        }
        if (UM(B)) {
            if (!sBB(A, Q)) throw new HG(pV, "Only one element can be added and only after doctype")
        }
        if (bP(B)) {
            let Y = function(W) {
                return bP(W) && W !== Q
            };
            var I = Y;
            if (EM(Z, Y)) throw new HG(pV, "Only one doctype is allowed");
            var F = EM(Z, UM);
            if (Q && Z.indexOf(F) < Z.indexOf(Q)) throw new HG(pV, "Doctype can only be inserted before an element")
        }
    }

    function dS1(A, B, Q, Z) {
        if (PM6(A, B, Q), A.nodeType === e5.DOCUMENT_NODE)(Z || SM6)(A, B, Q);
        var D = B.parentNode;
        if (D) D.removeChild(B);
        if (B.nodeType === vP) {
            var G = B.firstChild;
            if (G == null) return B;
            var F = B.lastChild
        } else G = F = B;
        var I = Q ? Q.previousSibling : A.lastChild;
        if (G.previousSibling = I, F.nextSibling = Q, I) I.nextSibling = G;
        else A.firstChild = G;
        if (Q == null) A.lastChild = F;
        else Q.previousSibling = F;
        do G.parentNode = A; while (G !== F && (G = G.nextSibling));
        if (KC0(A.ownerDocument || A, A), B.nodeType == vP) B.firstChild = B.lastChild = null;
        return B
    }

    function jM6(A, B) {
        if (B.parentNode) B.parentNode.removeChild(B);
        if (B.parentNode = A, B.previousSibling = A.lastChild, B.nextSibling = null, B.previousSibling) B.previousSibling.nextSibling = B;
        else A.firstChild = B;
        return A.lastChild = B, KC0(A.ownerDocument, A, B), B
    }
    m71.prototype = {
        nodeName: "#document",
        nodeType: Q9B,
        doctype: null,
        documentElement: null,
        _inc: 1,
        insertBefore: function(A, B) {
            if (A.nodeType == vP) {
                var Q = A.firstChild;
                while (Q) {
                    var Z = Q.nextSibling;
                    this.insertBefore(Q, B), Q = Z
                }
                return A
            }
            if (dS1(this, A, B), A.ownerDocument = this, this.documentElement === null && A.nodeType === K$) this.documentElement = A;
            return A
        },
        removeChild: function(A) {
            if (this.documentElement == A) this.documentElement = null;
            return W9B(this, A)
        },
        replaceChild: function(A, B) {
            if (dS1(this, A, B, J9B), A.ownerDocument = this, B) this.removeChild(B);
            if (UM(A)) this.documentElement = A
        },
        importNode: function(A, B) {
            return H9B(this, A, B)
        },
        getElementById: function(A) {
            var B = null;
            return g71(this.documentElement, function(Q) {
                if (Q.nodeType == K$) {
                    if (Q.getAttribute("id") == A) return B = Q, !0
                }
            }), B
        },
        getElementsByClassName: function(A) {
            var B = lBB(A);
            return new Ge(this, function(Q) {
                var Z = [];
                if (B.length > 0) g71(Q.documentElement, function(D) {
                    if (D !== Q && D.nodeType === K$) {
                        var G = D.getAttribute("class");
                        if (G) {
                            var F = A === G;
                            if (!F) {
                                var I = lBB(G);
                                F = B.every(NM6(I))
                            }
                            if (F) Z.push(D)
                        }
                    }
                });
                return Z
            })
        },
        createElement: function(A) {
            var B = new Rm;
            B.ownerDocument = this, B.nodeName = A, B.tagName = A, B.localName = A, B.childNodes = new xP;
            var Q = B.attributes = new mS1;
            return Q._ownerElement = B, B
        },
        createDocumentFragment: function() {
            var A = new pS1;
            return A.ownerDocument = this, A.childNodes = new xP, A
        },
        createTextNode: function(A) {
            var B = new zC0;
            return B.ownerDocument = this, B.appendData(A), B
        },
        createComment: function(A) {
            var B = new EC0;
            return B.ownerDocument = this, B.appendData(A), B
        },
        createCDATASection: function(A) {
            var B = new UC0;
            return B.ownerDocument = this, B.appendData(A), B
        },
        createProcessingInstruction: function(A, B) {
            var Q = new $C0;
            return Q.ownerDocument = this, Q.tagName = Q.nodeName = Q.target = A, Q.nodeValue = Q.data = B, Q
        },
        createAttribute: function(A) {
            var B = new cS1;
            return B.ownerDocument = this, B.name = A, B.nodeName = A, B.localName = A, B.specified = !0, B
        },
        createEntityReference: function(A) {
            var B = new wC0;
            return B.ownerDocument = this, B.nodeName = A, B
        },
        createElementNS: function(A, B) {
            var Q = new Rm,
                Z = B.split(":"),
                D = Q.attributes = new mS1;
            if (Q.childNodes = new xP, Q.ownerDocument = this, Q.nodeName = B, Q.tagName = B, Q.namespaceURI = A, Z.length == 2) Q.prefix = Z[0], Q.localName = Z[1];
            else Q.localName = B;
            return D._ownerElement = Q, Q
        },
        createAttributeNS: function(A, B) {
            var Q = new cS1,
                Z = B.split(":");
            if (Q.ownerDocument = this, Q.nodeName = B, Q.name = B, Q.namespaceURI = A, Q.specified = !0, Z.length == 2) Q.prefix = Z[0], Q.localName = Z[1];
            else Q.localName = B;
            return Q
        }
    };
    iV(m71, e5);

    function Rm() {
        this._nsMap = {}
    }
    Rm.prototype = {
        nodeType: K$,
        hasAttribute: function(A) {
            return this.getAttributeNode(A) != null
        },
        getAttribute: function(A) {
            var B = this.getAttributeNode(A);
            return B && B.value || ""
        },
        getAttributeNode: function(A) {
            return this.attributes.getNamedItem(A)
        },
        setAttribute: function(A, B) {
            var Q = this.ownerDocument.createAttribute(A);
            Q.value = Q.nodeValue = "" + B, this.setAttributeNode(Q)
        },
        removeAttribute: function(A) {
            var B = this.getAttributeNode(A);
            B && this.removeAttributeNode(B)
        },
        appendChild: function(A) {
            if (A.nodeType === vP) return this.insertBefore(A, null);
            else return jM6(this, A)
        },
        setAttributeNode: function(A) {
            return this.attributes.setNamedItem(A)
        },
        setAttributeNodeNS: function(A) {
            return this.attributes.setNamedItemNS(A)
        },
        removeAttributeNode: function(A) {
            return this.attributes.removeNamedItem(A.nodeName)
        },
        removeAttributeNS: function(A, B) {
            var Q = this.getAttributeNodeNS(A, B);
            Q && this.removeAttributeNode(Q)
        },
        hasAttributeNS: function(A, B) {
            return this.getAttributeNodeNS(A, B) != null
        },
        getAttributeNS: function(A, B) {
            var Q = this.getAttributeNodeNS(A, B);
            return Q && Q.value || ""
        },
        setAttributeNS: function(A, B, Q) {
            var Z = this.ownerDocument.createAttributeNS(A, B);
            Z.value = Z.nodeValue = "" + Q, this.setAttributeNode(Z)
        },
        getAttributeNodeNS: function(A, B) {
            return this.attributes.getNamedItemNS(A, B)
        },
        getElementsByTagName: function(A) {
            return new Ge(this, function(B) {
                var Q = [];
                return g71(B, function(Z) {
                    if (Z !== B && Z.nodeType == K$ && (A === "*" || Z.tagName == A)) Q.push(Z)
                }), Q
            })
        },
        getElementsByTagNameNS: function(A, B) {
            return new Ge(this, function(Q) {
                var Z = [];
                return g71(Q, function(D) {
                    if (D !== Q && D.nodeType === K$ && (A === "*" || D.namespaceURI === A) && (B === "*" || D.localName == B)) Z.push(D)
                }), Z
            })
        }
    };
    m71.prototype.getElementsByTagName = Rm.prototype.getElementsByTagName;
    m71.prototype.getElementsByTagNameNS = Rm.prototype.getElementsByTagNameNS;
    iV(Rm, e5);

    function cS1() {}
    cS1.prototype.nodeType = De;
    iV(cS1, e5);

    function d71() {}
    d71.prototype = {
        data: "",
        substringData: function(A, B) {
            return this.data.substring(A, A + B)
        },
        appendData: function(A) {
            A = this.data + A, this.nodeValue = this.data = A, this.length = A.length
        },
        insertData: function(A, B) {
            this.replaceData(A, 0, B)
        },
        appendChild: function(A) {
            throw new Error(MI[pV])
        },
        deleteData: function(A, B) {
            this.replaceData(A, B, "")
        },
        replaceData: function(A, B, Q) {
            var Z = this.data.substring(0, A),
                D = this.data.substring(A + B);
            Q = Z + Q + D, this.nodeValue = this.data = Q, this.length = Q.length
        }
    };
    iV(d71, e5);

    function zC0() {}
    zC0.prototype = {
        nodeName: "#text",
        nodeType: uS1,
        splitText: function(A) {
            var B = this.data,
                Q = B.substring(A);
            B = B.substring(0, A), this.data = this.nodeValue = B, this.length = B.length;
            var Z = this.ownerDocument.createTextNode(Q);
            if (this.parentNode) this.parentNode.insertBefore(Z, this.nextSibling);
            return Z
        }
    };
    iV(zC0, d71);

    function EC0() {}
    EC0.prototype = {
        nodeName: "#comment",
        nodeType: B9B
    };
    iV(EC0, d71);

    function UC0() {}
    UC0.prototype = {
        nodeName: "#cdata-section",
        nodeType: tBB
    };
    iV(UC0, d71);

    function lS1() {}
    lS1.prototype.nodeType = Z9B;
    iV(lS1, e5);

    function X9B() {}
    X9B.prototype.nodeType = MM6;
    iV(X9B, e5);

    function V9B() {}
    V9B.prototype.nodeType = LM6;
    iV(V9B, e5);

    function wC0() {}
    wC0.prototype.nodeType = eBB;
    iV(wC0, e5);

    function pS1() {}
    pS1.prototype.nodeName = "#document-fragment";
    pS1.prototype.nodeType = vP;
    iV(pS1, e5);

    function $C0() {}
    $C0.prototype.nodeType = A9B;
    iV($C0, e5);

    function C9B() {}
    C9B.prototype.serializeToString = function(A, B, Q) {
        return K9B.call(A, B, Q)
    };
    e5.prototype.toString = K9B;

    function K9B(A, B) {
        var Q = [],
            Z = this.nodeType == 9 && this.documentElement || this,
            D = Z.prefix,
            G = Z.namespaceURI;
        if (G && D == null) {
            var D = Z.lookupPrefix(G);
            if (D == null) var F = [{
                namespace: G,
                prefix: null
            }]
        }
        return Ze(this, Q, A, B, F), Q.join("")
    }

    function rBB(A, B, Q) {
        var Z = A.prefix || "",
            D = A.namespaceURI;
        if (!D) return !1;
        if (Z === "xml" && D === h71.XML || D === h71.XMLNS) return !1;
        var G = Q.length;
        while (G--) {
            var F = Q[G];
            if (F.prefix === Z) return F.namespace !== D
        }
        return !0
    }

    function XC0(A, B, Q) {
        A.push(" ", B, '="', Q.replace(/[<>&"\t\n\r]/g, I9B), '"')
    }

    function Ze(A, B, Q, Z, D) {
        if (!D) D = [];
        if (Z)
            if (A = Z(A), A) {
                if (typeof A == "string") {
                    B.push(A);
                    return
                }
            } else return;
        switch (A.nodeType) {
            case K$:
                var G = A.attributes,
                    F = G.length,
                    $ = A.firstChild,
                    I = A.tagName;
                Q = h71.isHTML(A.namespaceURI) || Q;
                var Y = I;
                if (!Q && !A.prefix && A.namespaceURI) {
                    var W;
                    for (var J = 0; J < G.length; J++)
                        if (G.item(J).name === "xmlns") {
                            W = G.item(J).value;
                            break
                        } if (!W)
                        for (var X = D.length - 1; X >= 0; X--) {
                            var V = D[X];
                            if (V.prefix === "" && V.namespace === A.namespaceURI) {
                                W = V.namespace;
                                break
                            }
                        }
                    if (W !== A.namespaceURI)
                        for (var X = D.length - 1; X >= 0; X--) {
                            var V = D[X];
                            if (V.namespace === A.namespaceURI) {
                                if (V.prefix) Y = V.prefix + ":" + I;
                                break
                            }
                        }
                }
                B.push("<", Y);
                for (var C = 0; C < F; C++) {
                    var K = G.item(C);
                    if (K.prefix == "xmlns") D.push({
                        prefix: K.localName,
                        namespace: K.value
                    });
                    else if (K.nodeName == "xmlns") D.push({
                        prefix: "",
                        namespace: K.value
                    })
                }
                for (var C = 0; C < F; C++) {
                    var K = G.item(C);
                    if (rBB(K, Q, D)) {
                        var H = K.prefix || "",
                            z = K.namespaceURI;
                        XC0(B, H ? "xmlns:" + H : "xmlns", z), D.push({
                            prefix: H,
                            namespace: z
                        })
                    }
                    Ze(K, B, Q, Z, D)
                }
                if (I === Y && rBB(A, Q, D)) {
                    var H = A.prefix || "",
                        z = A.namespaceURI;
                    XC0(B, H ? "xmlns:" + H : "xmlns", z), D.push({
                        prefix: H,
                        namespace: z
                    })
                }
                if ($ || Q && !/^(?:meta|link|img|br|hr|input)$/i.test(I)) {
                    if (B.push(">"), Q && /^script$/i.test(I))
                        while ($) {
                            if ($.data) B.push($.data);
                            else Ze($, B, Q, Z, D.slice());
                            $ = $.nextSibling
                        } else
                            while ($) Ze($, B, Q, Z, D.slice()), $ = $.nextSibling;
                    B.push("</", Y, ">")
                } else B.push("/>");
                return;
            case Q9B:
            case vP:
                var $ = A.firstChild;
                while ($) Ze($, B, Q, Z, D.slice()), $ = $.nextSibling;
                return;
            case De:
                return XC0(B, A.name, A.value);
            case uS1:
                return B.push(A.data.replace(/[<&>]/g, I9B));
            case tBB:
                return B.push("<![CDATA[", A.data, "]]>");
            case B9B:
                return B.push("<!--", A.data, "-->");
            case Z9B:
                var {
                    publicId: L, systemId: N
                } = A;
                if (B.push("<!DOCTYPE ", A.name), L) {
                    if (B.push(" PUBLIC ", L), N && N != ".") B.push(" ", N);
                    B.push(">")
                } else if (N && N != ".") B.push(" SYSTEM ", N, ">");
                else {
                    var R = A.internalSubset;
                    if (R) B.push(" [", R, "]");
                    B.push(">")
                }
                return;
            case A9B:
                return B.push("<?", A.target, " ", A.data, "?>");
            case eBB:
                return B.push("&", A.nodeName, ";");
            default:
                B.push("??", A.nodeName)
        }
    }

    function H9B(A, B, Q) {
        var Z;
        switch (B.nodeType) {
            case K$:
                Z = B.cloneNode(!1), Z.ownerDocument = A;
            case vP:
                break;
            case De:
                Q = !0;
                break
        }
        if (!Z) Z = B.cloneNode(!1);
        if (Z.ownerDocument = A, Z.parentNode = null, Q) {
            var D = B.firstChild;
            while (D) Z.appendChild(H9B(A, D, Q)), D = D.nextSibling
        }
        return Z
    }

    function VC0(A, B, Q) {
        var Z = new B.constructor;
        for (var D in B)
            if (Object.prototype.hasOwnProperty.call(B, D)) {
                var G = B[D];
                if (typeof G != "object") {
                    if (G != Z[D]) Z[D] = G
                }
            } if (B.childNodes) Z.childNodes = new xP;
        switch (Z.ownerDocument = A, Z.nodeType) {
            case K$:
                var F = B.attributes,
                    I = Z.attributes = new mS1,
                    Y = F.length;
                I._ownerElement = Z;
                for (var W = 0; W < Y; W++) Z.setAttributeNode(VC0(A, F.item(W), !0));
                break;
            case De:
                Q = !0
        }
        if (Q) {
            var J = B.firstChild;
            while (J) Z.appendChild(VC0(A, J, Q)), J = J.nextSibling
        }
        return Z
    }

    function z9B(A, B, Q) {
        A[B] = Q
    }
    try {
        if (Object.defineProperty) {
            let A = function(B) {
                switch (B.nodeType) {
                    case K$:
                    case vP:
                        var Q = [];
                        B = B.firstChild;
                        while (B) {
                            if (B.nodeType !== 7 && B.nodeType !== 8) Q.push(A(B));
                            B = B.nextSibling
                        }
                        return Q.join("");
                    default:
                        return B.nodeValue
                }
            };
            kM6 = A, Object.defineProperty(Ge.prototype, "length", {
                get: function() {
                    return CC0(this), this.$$length
                }
            }), Object.defineProperty(e5.prototype, "textContent", {
                get: function() {
                    return A(this)
                },
                set: function(B) {
                    switch (this.nodeType) {
                        case K$:
                        case vP:
                            while (this.firstChild) this.removeChild(this.firstChild);
                            if (B || String(B)) this.appendChild(this.ownerDocument.createTextNode(B));
                            break;
                        default:
                            this.data = B, this.value = B, this.nodeValue = B
                    }
                }
            }), z9B = function(B, Q, Z) {
                B["$$" + Q] = Z
            }
        }
    } catch (A) {}
    var kM6;
    yM6.DocumentType = lS1;
    yM6.DOMException = HG;
    yM6.DOMImplementation = F9B;
    yM6.Element = Rm;
    yM6.Node = e5;
    yM6.NodeList = xP;
    yM6.XMLSerializer = C9B
});