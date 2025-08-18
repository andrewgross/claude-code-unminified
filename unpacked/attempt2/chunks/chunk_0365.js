/* chunk:365 bytes:[8578709, 8585673) size:6964 source:unpacked-cli.js */
var _C0 = E((aQB, sQB) => {
    (function() {
        var A, B, Q, Z, D, G, F, I;
        ({
            isPlainObject: I
        } = $M()), Q = PC0(), B = o9B(), D = uK(), A = zG(), F = kC0(), G = Yj1(), sQB.exports = Z = function() {
            class Y extends D {
                constructor(W) {
                    super(null);
                    if (this.name = "#document", this.type = A.Document, this.documentURI = null, this.domConfig = new B, W || (W = {}), !W.writer) W.writer = new G;
                    this.options = W, this.stringify = new F(W)
                }
                end(W) {
                    var J = {};
                    if (!W) W = this.options.writer;
                    else if (I(W)) J = W, W = this.options.writer;
                    return W.document(this, W.filterOptions(J))
                }
                toString(W) {
                    return this.options.writer.document(this, this.options.writer.filterOptions(W))
                }
                createElement(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createDocumentFragment() {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createTextNode(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createComment(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createCDATASection(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createProcessingInstruction(W, J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createAttribute(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createEntityReference(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getElementsByTagName(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                importNode(W, J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createElementNS(W, J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createAttributeNS(W, J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getElementsByTagNameNS(W, J) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getElementById(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                adoptNode(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                normalizeDocument() {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                renameNode(W, J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                getElementsByClassName(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createEvent(W) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createRange() {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createNodeIterator(W, J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
                createTreeWalker(W, J, X) {
                    throw new Error("This DOM method is not implemented." + this.debugInfo())
                }
            }
            return Object.defineProperty(Y.prototype, "implementation", {
                value: new Q
            }), Object.defineProperty(Y.prototype, "doctype", {
                get: function() {
                    var W, J, X, V;
                    V = this.children;
                    for (J = 0, X = V.length; J < X; J++)
                        if (W = V[J], W.type === A.DocType) return W;
                    return null
                }
            }), Object.defineProperty(Y.prototype, "documentElement", {
                get: function() {
                    return this.rootObject || null
                }
            }), Object.defineProperty(Y.prototype, "inputEncoding", {
                get: function() {
                    return null
                }
            }), Object.defineProperty(Y.prototype, "strictErrorChecking", {
                get: function() {
                    return !1
                }
            }), Object.defineProperty(Y.prototype, "xmlEncoding", {
                get: function() {
                    if (this.children.length !== 0 && this.children[0].type === A.Declaration) return this.children[0].encoding;
                    else return null
                }
            }), Object.defineProperty(Y.prototype, "xmlStandalone", {
                get: function() {
                    if (this.children.length !== 0 && this.children[0].type === A.Declaration) return this.children[0].standalone === "yes";
                    else return !1
                }
            }), Object.defineProperty(Y.prototype, "xmlVersion", {
                get: function() {
                    if (this.children.length !== 0 && this.children[0].type === A.Declaration) return this.children[0].version;
                    else return "1.0"
                }
            }), Object.defineProperty(Y.prototype, "URL", {
                get: function() {
                    return this.documentURI
                }
            }), Object.defineProperty(Y.prototype, "origin", {
                get: function() {
                    return null
                }
            }), Object.defineProperty(Y.prototype, "compatMode", {
                get: function() {
                    return null
                }
            }), Object.defineProperty(Y.prototype, "characterSet", {
                get: function() {
                    return null
                }
            }), Object.defineProperty(Y.prototype, "contentType", {
                get: function() {
                    return null
                }
            }), Y
        }.call(this)
    }).call(aQB)
});