/* chunk:463 bytes:[10973316, 10994733) size:21417 source:unpacked-cli.js */
var Sf1 = E((UO3, ixB) => {
    ixB.exports = sF1;
    var $J = YW(),
        bK8 = kd(),
        dxB = Cf1(),
        Ab = f01(),
        fK8 = TM0(),
        hK8 = SM0(),
        aF1 = j01(),
        gK8 = kM0(),
        uK8 = _M0(),
        mK8 = rF1(),
        dK8 = GxB(),
        cK8 = XxB(),
        fxB = pF1(),
        hxB = Mf1(),
        gxB = Uf1(),
        lK8 = dM0(),
        Pf1 = Kf1(),
        sM0 = Tf1(),
        pK8 = aM0(),
        I5 = MD(),
        u01 = bxB(),
        d01 = I5.NAMESPACE,
        rM0 = Jf1().isApiWritable;

    function sF1(A, B) {
        dxB.call(this), this.nodeType = $J.DOCUMENT_NODE, this.isHTML = A, this._address = B || "about:blank", this.readyState = "loading", this.implementation = new mK8(this), this.ownerDocument = null, this._contentType = A ? "text/html" : "application/xml", this.doctype = null, this.documentElement = null, this._templateDocCache = null, this._nodeIterators = null, this._nid = 1, this._nextnid = 2, this._nodes = [null, this], this.byId = Object.create(null), this.modclock = 0
    }
    var iK8 = {
            event: "Event",
            customevent: "CustomEvent",
            uievent: "UIEvent",
            mouseevent: "MouseEvent"
        },
        nK8 = {
            events: "event",
            htmlevents: "event",
            mouseevents: "mouseevent",
            mutationevents: "mutationevent",
            uievents: "uievent"
        },
        m01 = function(A, B, Q) {
            return {
                get: function() {
                    var Z = A.call(this);
                    if (Z) return Z[B];
                    return Q
                },
                set: function(Z) {
                    var D = A.call(this);
                    if (D) D[B] = Z
                }
            }
        };

    function uxB(A, B) {
        var Q, Z, D;
        if (A === "") A = null;
        if (!Pf1.isValidQName(B)) I5.InvalidCharacterError();
        if (Q = null, Z = B, D = B.indexOf(":"), D >= 0) Q = B.substring(0, D), Z = B.substring(D + 1);
        if (Q !== null && A === null) I5.NamespaceError();
        if (Q === "xml" && A !== d01.XML) I5.NamespaceError();
        if ((Q === "xmlns" || B === "xmlns") && A !== d01.XMLNS) I5.NamespaceError();
        if (A === d01.XMLNS && !(Q === "xmlns" || B === "xmlns")) I5.NamespaceError();
        return {
            namespace: A,
            prefix: Q,
            localName: Z
        }
    }
    sF1.prototype = Object.create(dxB.prototype, {
        _setMutationHandler: {
            value: function(A) {
                this.mutationHandler = A
            }
        },
        _dispatchRendererEvent: {
            value: function(A, B, Q) {
                var Z = this._nodes[A];
                if (!Z) return;
                Z._dispatchEvent(new aF1(B, Q), !0)
            }
        },
        nodeName: {
            value: "#document"
        },
        nodeValue: {
            get: function() {
                return null
            },
            set: function() {}
        },
        documentURI: {
            get: function() {
                return this._address
            },
            set: I5.nyi
        },
        compatMode: {
            get: function() {
                return this._quirks ? "BackCompat" : "CSS1Compat"
            }
        },
        createTextNode: {
            value: function(A) {
                return new fK8(this, String(A))
            }
        },
        createComment: {
            value: function(A) {
                return new hK8(this, A)
            }
        },
        createDocumentFragment: {
            value: function() {
                return new gK8(this)
            }
        },
        createProcessingInstruction: {
            value: function(A, B) {
                if (!Pf1.isValidName(A) || B.indexOf("?>") !== -1) I5.InvalidCharacterError();
                return new uK8(this, A, B)
            }
        },
        createAttribute: {
            value: function(A) {
                if (A = String(A), !Pf1.isValidName(A)) I5.InvalidCharacterError();
                if (this.isHTML) A = I5.toASCIILowerCase(A);
                return new Ab._Attr(null, A, null, null, "")
            }
        },
        createAttributeNS: {
            value: function(A, B) {
                A = A === null || A === void 0 || A === "" ? null : String(A), B = String(B);
                var Q = uxB(A, B);
                return new Ab._Attr(null, Q.localName, Q.prefix, Q.namespace, "")
            }
        },
        createElement: {
            value: function(A) {
                if (A = String(A), !Pf1.isValidName(A)) I5.InvalidCharacterError();
                if (this.isHTML) {
                    if (/[A-Z]/.test(A)) A = I5.toASCIILowerCase(A);
                    return sM0.createElement(this, A, null)
                } else if (this.contentType === "application/xhtml+xml") return sM0.createElement(this, A, null);
                else return new Ab(this, A, null, null)
            },
            writable: rM0
        },
        createElementNS: {
            value: function(A, B) {
                A = A === null || A === void 0 || A === "" ? null : String(A), B = String(B);
                var Q = uxB(A, B);
                return this._createElementNS(Q.localName, Q.namespace, Q.prefix)
            },
            writable: rM0
        },
        _createElementNS: {
            value: function(A, B, Q) {
                if (B === d01.HTML) return sM0.createElement(this, A, Q);
                else if (B === d01.SVG) return pK8.createElement(this, A, Q);
                return new Ab(this, A, B, Q)
            }
        },
        createEvent: {
            value: function A(B) {
                B = B.toLowerCase();
                var Q = nK8[B] || B,
                    Z = lK8[iK8[Q]];
                if (Z) {
                    var D = new Z;
                    return D._initialized = !1, D
                } else I5.NotSupportedError()
            }
        },
        createTreeWalker: {
            value: function(A, B, Q) {
                if (!A) throw new TypeError("root argument is required");
                if (!(A instanceof $J)) throw new TypeError("root not a node");
                return B = B === void 0 ? fxB.SHOW_ALL : +B, Q = Q === void 0 ? null : Q, new dK8(A, B, Q)
            }
        },
        createNodeIterator: {
            value: function(A, B, Q) {
                if (!A) throw new TypeError("root argument is required");
                if (!(A instanceof $J)) throw new TypeError("root not a node");
                return B = B === void 0 ? fxB.SHOW_ALL : +B, Q = Q === void 0 ? null : Q, new cK8(A, B, Q)
            }
        },
        _attachNodeIterator: {
            value: function(A) {
                if (!this._nodeIterators) this._nodeIterators = [];
                this._nodeIterators.push(A)
            }
        },
        _detachNodeIterator: {
            value: function(A) {
                var B = this._nodeIterators.indexOf(A);
                this._nodeIterators.splice(B, 1)
            }
        },
        _preremoveNodeIterators: {
            value: function(A) {
                if (this._nodeIterators) this._nodeIterators.forEach(function(B) {
                    B._preremove(A)
                })
            }
        },
        _updateDocTypeElement: {
            value: function A() {
                this.doctype = this.documentElement = null;
                for (var B = this.firstChild; B !== null; B = B.nextSibling)
                    if (B.nodeType === $J.DOCUMENT_TYPE_NODE) this.doctype = B;
                    else if (B.nodeType === $J.ELEMENT_NODE) this.documentElement = B
            }
        },
        insertBefore: {
            value: function A(B, Q) {
                return $J.prototype.insertBefore.call(this, B, Q), this._updateDocTypeElement(), B
            }
        },
        replaceChild: {
            value: function A(B, Q) {
                return $J.prototype.replaceChild.call(this, B, Q), this._updateDocTypeElement(), Q
            }
        },
        removeChild: {
            value: function A(B) {
                return $J.prototype.removeChild.call(this, B), this._updateDocTypeElement(), B
            }
        },
        getElementById: {
            value: function(A) {
                var B = this.byId[A];
                if (!B) return null;
                if (B instanceof _S) return B.getFirst();
                return B
            }
        },
        _hasMultipleElementsWithId: {
            value: function(A) {
                return this.byId[A] instanceof _S
            }
        },
        getElementsByName: {
            value: Ab.prototype.getElementsByName
        },
        getElementsByTagName: {
            value: Ab.prototype.getElementsByTagName
        },
        getElementsByTagNameNS: {
            value: Ab.prototype.getElementsByTagNameNS
        },
        getElementsByClassName: {
            value: Ab.prototype.getElementsByClassName
        },
        adoptNode: {
            value: function A(B) {
                if (B.nodeType === $J.DOCUMENT_NODE) I5.NotSupportedError();
                if (B.nodeType === $J.ATTRIBUTE_NODE) return B;
                if (B.parentNode) B.parentNode.removeChild(B);
                if (B.ownerDocument !== this) pxB(B, this);
                return B
            }
        },
        importNode: {
            value: function A(B, Q) {
                return this.adoptNode(B.cloneNode(Q))
            },
            writable: rM0
        },
        origin: {
            get: function A() {
                return null
            }
        },
        characterSet: {
            get: function A() {
                return "UTF-8"
            }
        },
        contentType: {
            get: function A() {
                return this._contentType
            }
        },
        URL: {
            get: function A() {
                return this._address
            }
        },
        domain: {
            get: I5.nyi,
            set: I5.nyi
        },
        referrer: {
            get: I5.nyi
        },
        cookie: {
            get: I5.nyi,
            set: I5.nyi
        },
        lastModified: {
            get: I5.nyi
        },
        location: {
            get: function() {
                return this.defaultView ? this.defaultView.location : null
            },
            set: I5.nyi
        },
        _titleElement: {
            get: function() {
                return this.getElementsByTagName("title").item(0) || null
            }
        },
        title: {
            get: function() {
                var A = this._titleElement,
                    B = A ? A.textContent : "";
                return B.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "")
            },
            set: function(A) {
                var B = this._titleElement,
                    Q = this.head;
                if (!B && !Q) return;
                if (!B) B = this.createElement("title"), Q.appendChild(B);
                B.textContent = A
            }
        },
        dir: m01(function() {
            var A = this.documentElement;
            if (A && A.tagName === "HTML") return A
        }, "dir", ""),
        fgColor: m01(function() {
            return this.body
        }, "text", ""),
        linkColor: m01(function() {
            return this.body
        }, "link", ""),
        vlinkColor: m01(function() {
            return this.body
        }, "vLink", ""),
        alinkColor: m01(function() {
            return this.body
        }, "aLink", ""),
        bgColor: m01(function() {
            return this.body
        }, "bgColor", ""),
        charset: {
            get: function() {
                return this.characterSet
            }
        },
        inputEncoding: {
            get: function() {
                return this.characterSet
            }
        },
        scrollingElement: {
            get: function() {
                return this._quirks ? this.body : this.documentElement
            }
        },
        body: {
            get: function() {
                return mxB(this.documentElement, "body")
            },
            set: I5.nyi
        },
        head: {
            get: function() {
                return mxB(this.documentElement, "head")
            }
        },
        images: {
            get: I5.nyi
        },
        embeds: {
            get: I5.nyi
        },
        plugins: {
            get: I5.nyi
        },
        links: {
            get: I5.nyi
        },
        forms: {
            get: I5.nyi
        },
        scripts: {
            get: I5.nyi
        },
        applets: {
            get: function() {
                return []
            }
        },
        activeElement: {
            get: function() {
                return null
            }
        },
        innerHTML: {
            get: function() {
                return this.serialize()
            },
            set: I5.nyi
        },
        outerHTML: {
            get: function() {
                return this.serialize()
            },
            set: I5.nyi
        },
        write: {
            value: function(A) {
                if (!this.isHTML) I5.InvalidStateError();
                if (!this._parser) return;
                if (!this._parser);
                var B = arguments.join("");
                this._parser.parse(B)
            }
        },
        writeln: {
            value: function A(B) {
                this.write(Array.prototype.join.call(arguments, "") + `
`)
            }
        },
        open: {
            value: function() {
                this.documentElement = null
            }
        },
        close: {
            value: function() {
                if (this.readyState = "interactive", this._dispatchEvent(new aF1("readystatechange"), !0), this._dispatchEvent(new aF1("DOMContentLoaded"), !0), this.readyState = "complete", this._dispatchEvent(new aF1("readystatechange"), !0), this.defaultView) this.defaultView._dispatchEvent(new aF1("load"), !0)
            }
        },
        clone: {
            value: function A() {
                var B = new sF1(this.isHTML, this._address);
                return B._quirks = this._quirks, B._contentType = this._contentType, B
            }
        },
        cloneNode: {
            value: function A(B) {
                var Q = $J.prototype.cloneNode.call(this, !1);
                if (B)
                    for (var Z = this.firstChild; Z !== null; Z = Z.nextSibling) Q._appendChild(Q.importNode(Z, !0));
                return Q._updateDocTypeElement(), Q
            }
        },
        isEqual: {
            value: function A(B) {
                return !0
            }
        },
        mutateValue: {
            value: function(A) {
                if (this.mutationHandler) this.mutationHandler({
                    type: u01.VALUE,
                    target: A,
                    data: A.data
                })
            }
        },
        mutateAttr: {
            value: function(A, B) {
                if (this.mutationHandler) this.mutationHandler({
                    type: u01.ATTR,
                    target: A.ownerElement,
                    attr: A
                })
            }
        },
        mutateRemoveAttr: {
            value: function(A) {
                if (this.mutationHandler) this.mutationHandler({
                    type: u01.REMOVE_ATTR,
                    target: A.ownerElement,
                    attr: A
                })
            }
        },
        mutateRemove: {
            value: function(A) {
                if (this.mutationHandler) this.mutationHandler({
                    type: u01.REMOVE,
                    target: A.parentNode,
                    node: A
                });
                lxB(A)
            }
        },
        mutateInsert: {
            value: function(A) {
                if (cxB(A), this.mutationHandler) this.mutationHandler({
                    type: u01.INSERT,
                    target: A.parentNode,
                    node: A
                })
            }
        },
        mutateMove: {
            value: function(A) {
                if (this.mutationHandler) this.mutationHandler({
                    type: u01.MOVE,
                    target: A
                })
            }
        },
        addId: {
            value: function A(B, Q) {
                var Z = this.byId[B];
                if (!Z) this.byId[B] = Q;
                else {
                    if (!(Z instanceof _S)) Z = new _S(Z), this.byId[B] = Z;
                    Z.add(Q)
                }
            }
        },
        delId: {
            value: function A(B, Q) {
                var Z = this.byId[B];
                if (I5.assert(Z), Z instanceof _S) {
                    if (Z.del(Q), Z.length === 1) this.byId[B] = Z.downgrade()
                } else this.byId[B] = void 0
            }
        },
        _resolve: {
            value: function(A) {
                return new hxB(this._documentBaseURL).resolve(A)
            }
        },
        _documentBaseURL: {
            get: function() {
                var A = this._address;
                if (A === "about:blank") A = "/";
                var B = this.querySelector("base[href]");
                if (B) return new hxB(A).resolve(B.getAttribute("href"));
                return A
            }
        },
        _templateDoc: {
            get: function() {
                if (!this._templateDocCache) {
                    var A = new sF1(this.isHTML, this._address);
                    this._templateDocCache = A._templateDocCache = A
                }
                return this._templateDocCache
            }
        },
        querySelector: {
            value: function(A) {
                return gxB(A, this)[0]
            }
        },
        querySelectorAll: {
            value: function(A) {
                var B = gxB(A, this);
                return B.item ? B : new bK8(B)
            }
        }
    });
    var aK8 = ["abort", "canplay", "canplaythrough", "change", "click", "contextmenu", "cuechange", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "input", "invalid", "keydown", "keypress", "keyup", "loadeddata", "loadedmetadata", "loadstart", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "pause", "play", "playing", "progress", "ratechange", "readystatechange", "reset", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", "timeupdate", "volumechange", "waiting", "blur", "error", "focus", "load", "scroll"];
    aK8.forEach(function(A) {
        Object.defineProperty(sF1.prototype, "on" + A, {
            get: function() {
                return this._getEventHandler(A)
            },
            set: function(B) {
                this._setEventHandler(A, B)
            }
        })
    });

    function mxB(A, B) {
        if (A && A.isHTML) {
            for (var Q = A.firstChild; Q !== null; Q = Q.nextSibling)
                if (Q.nodeType === $J.ELEMENT_NODE && Q.localName === B && Q.namespaceURI === d01.HTML) return Q
        }
        return null
    }

    function sK8(A) {
        if (A._nid = A.ownerDocument._nextnid++, A.ownerDocument._nodes[A._nid] = A, A.nodeType === $J.ELEMENT_NODE) {
            var B = A.getAttribute("id");
            if (B) A.ownerDocument.addId(B, A);
            if (A._roothook) A._roothook()
        }
    }

    function rK8(A) {
        if (A.nodeType === $J.ELEMENT_NODE) {
            var B = A.getAttribute("id");
            if (B) A.ownerDocument.delId(B, A)
        }
        A.ownerDocument._nodes[A._nid] = void 0, A._nid = void 0
    }

    function cxB(A) {
        if (sK8(A), A.nodeType === $J.ELEMENT_NODE)
            for (var B = A.firstChild; B !== null; B = B.nextSibling) cxB(B)
    }

    function lxB(A) {
        rK8(A);
        for (var B = A.firstChild; B !== null; B = B.nextSibling) lxB(B)
    }

    function pxB(A, B) {
        if (A.ownerDocument = B, A._lastModTime = void 0, Object.prototype.hasOwnProperty.call(A, "_tagName")) A._tagName = void 0;
        for (var Q = A.firstChild; Q !== null; Q = Q.nextSibling) pxB(Q, B)
    }

    function _S(A) {
        this.nodes = Object.create(null), this.nodes[A._nid] = A, this.length = 1, this.firstNode = void 0
    }
    _S.prototype.add = function(A) {
        if (!this.nodes[A._nid]) this.nodes[A._nid] = A, this.length++, this.firstNode = void 0
    };
    _S.prototype.del = function(A) {
        if (this.nodes[A._nid]) delete this.nodes[A._nid], this.length--, this.firstNode = void 0
    };
    _S.prototype.getFirst = function() {
        if (!this.firstNode) {
            var A;
            for (A in this.nodes)
                if (this.firstNode === void 0 || this.firstNode.compareDocumentPosition(this.nodes[A]) & $J.DOCUMENT_POSITION_PRECEDING) this.firstNode = this.nodes[A]
        }
        return this.firstNode
    };
    _S.prototype.downgrade = function() {
        if (this.length === 1) {
            var A;
            for (A in this.nodes) return this.nodes[A]
        }
        return this
    }
});