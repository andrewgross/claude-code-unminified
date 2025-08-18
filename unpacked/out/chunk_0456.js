/* chunk:456 bytes:[10851171, 10856273) size:5102 source:unpacked-cli.js */
var wf1 = E((lR3, q_B) => {
    var iC8 = YW(),
        nC8 = oL0(),
        zM0 = function(A, B) {
            var Q = A.createDocumentFragment();
            for (var Z = 0; Z < B.length; Z++) {
                var D = B[Z],
                    G = D instanceof iC8;
                Q.appendChild(G ? D : A.createTextNode(String(D)))
            }
            return Q
        },
        aC8 = {
            after: {
                value: function A() {
                    var B = Array.prototype.slice.call(arguments),
                        Q = this.parentNode,
                        Z = this.nextSibling;
                    if (Q === null) return;
                    while (Z && B.some(function(G) {
                            return G === Z
                        })) Z = Z.nextSibling;
                    var D = zM0(this.doc, B);
                    Q.insertBefore(D, Z)
                }
            },
            before: {
                value: function A() {
                    var B = Array.prototype.slice.call(arguments),
                        Q = this.parentNode,
                        Z = this.previousSibling;
                    if (Q === null) return;
                    while (Z && B.some(function(F) {
                            return F === Z
                        })) Z = Z.previousSibling;
                    var D = zM0(this.doc, B),
                        G = Z ? Z.nextSibling : Q.firstChild;
                    Q.insertBefore(D, G)
                }
            },
            remove: {
                value: function A() {
                    if (this.parentNode === null) return;
                    if (this.doc) {
                        if (this.doc._preremoveNodeIterators(this), this.rooted) this.doc.mutateRemove(this)
                    }
                    this._remove(), this.parentNode = null
                }
            },
            _remove: {
                value: function A() {
                    var B = this.parentNode;
                    if (B === null) return;
                    if (B._childNodes) B._childNodes.splice(this.index, 1);
                    else if (B._firstChild === this)
                        if (this._nextSibling === this) B._firstChild = null;
                        else B._firstChild = this._nextSibling;
                    nC8.remove(this), B.modify()
                }
            },
            replaceWith: {
                value: function A() {
                    var B = Array.prototype.slice.call(arguments),
                        Q = this.parentNode,
                        Z = this.nextSibling;
                    if (Q === null) return;
                    while (Z && B.some(function(G) {
                            return G === Z
                        })) Z = Z.nextSibling;
                    var D = zM0(this.doc, B);
                    if (this.parentNode === Q) Q.replaceChild(D, this);
                    else Q.insertBefore(D, Z)
                }
            }
        };
    q_B.exports = aC8
});
var EM0 = E((pR3, L_B) => {
    var N_B = YW(),
        sC8 = {
            nextElementSibling: {
                get: function() {
                    if (this.parentNode) {
                        for (var A = this.nextSibling; A !== null; A = A.nextSibling)
                            if (A.nodeType === N_B.ELEMENT_NODE) return A
                    }
                    return null
                }
            },
            previousElementSibling: {
                get: function() {
                    if (this.parentNode) {
                        for (var A = this.previousSibling; A !== null; A = A.previousSibling)
                            if (A.nodeType === N_B.ELEMENT_NODE) return A
                    }
                    return null
                }
            }
        };
    L_B.exports = sC8
});
var UM0 = E((iR3, R_B) => {
    R_B.exports = M_B;
    var v01 = MD();

    function M_B(A) {
        this.element = A
    }
    Object.defineProperties(M_B.prototype, {
        length: {
            get: v01.shouldOverride
        },
        item: {
            value: v01.shouldOverride
        },
        getNamedItem: {
            value: function A(B) {
                return this.element.getAttributeNode(B)
            }
        },
        getNamedItemNS: {
            value: function A(B, Q) {
                return this.element.getAttributeNodeNS(B, Q)
            }
        },
        setNamedItem: {
            value: v01.nyi
        },
        setNamedItemNS: {
            value: v01.nyi
        },
        removeNamedItem: {
            value: function A(B) {
                var Q = this.element.getAttributeNode(B);
                if (Q) return this.element.removeAttribute(B), Q;
                v01.NotFoundError()
            }
        },
        removeNamedItemNS: {
            value: function A(B, Q) {
                var Z = this.element.getAttributeNodeNS(B, Q);
                if (Z) return this.element.removeAttributeNS(B, Q), Z;
                v01.NotFoundError()
            }
        }
    })
});