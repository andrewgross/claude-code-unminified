/* chunk:444 bytes:[10601620, 10621387) size:19767 source:unpacked-cli.js */
var rM = E((XF3, pRB) => {
    class xq0 {
        constructor(A) {
            let B = {},
                Q = this._getOverriddenMethods(this, B);
            for (let Z of Object.keys(Q))
                if (typeof Q[Z] === "function") B[Z] = A[Z], A[Z] = Q[Z]
        }
        _getOverriddenMethods() {
            throw new Error("Not implemented")
        }
    }
    xq0.install = function(A, B, Q) {
        if (!A.__mixins) A.__mixins = [];
        for (let D = 0; D < A.__mixins.length; D++)
            if (A.__mixins[D].constructor === B) return A.__mixins[D];
        let Z = new B(A, Q);
        return A.__mixins.push(Z), Z
    };
    pRB.exports = xq0
});
var vq0 = E((VF3, nRB) => {
    var w58 = rM();
    class iRB extends w58 {
        constructor(A) {
            super(A);
            this.preprocessor = A, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.offset = 0, this.col = 0, this.line = 1
        }
        _getOverriddenMethods(A, B) {
            return {
                advance() {
                    let Q = this.pos + 1,
                        Z = this.html[Q];
                    if (A.isEol) A.isEol = !1, A.line++, A.lineStartPos = Q;
                    if (Z === `
` || Z === "\r" && this.html[Q + 1] !== `
`) A.isEol = !0;
                    return A.col = Q - A.lineStartPos + 1, A.offset = A.droppedBufferSize + Q, B.advance.call(this)
                },
                retreat() {
                    B.retreat.call(this), A.isEol = !1, A.col = this.pos - A.lineStartPos + 1
                },
                dropParsedChunk() {
                    let Q = this.pos;
                    B.dropParsedChunk.call(this);
                    let Z = Q - this.pos;
                    A.lineStartPos -= Z, A.droppedBufferSize += Z, A.offset = A.droppedBufferSize + this.pos
                }
            }
        }
    }
    nRB.exports = iRB
});
var fq0 = E((CF3, rRB) => {
    var aRB = rM(),
        bq0 = RG1(),
        $58 = vq0();
    class sRB extends aRB {
        constructor(A) {
            super(A);
            this.tokenizer = A, this.posTracker = aRB.install(A.preprocessor, $58), this.currentAttrLocation = null, this.ctLoc = null
        }
        _getCurrentLocation() {
            return {
                startLine: this.posTracker.line,
                startCol: this.posTracker.col,
                startOffset: this.posTracker.offset,
                endLine: -1,
                endCol: -1,
                endOffset: -1
            }
        }
        _attachCurrentAttrLocationInfo() {
            this.currentAttrLocation.endLine = this.posTracker.line, this.currentAttrLocation.endCol = this.posTracker.col, this.currentAttrLocation.endOffset = this.posTracker.offset;
            let A = this.tokenizer.currentToken,
                B = this.tokenizer.currentAttr;
            if (!A.location.attrs) A.location.attrs = Object.create(null);
            A.location.attrs[B.name] = this.currentAttrLocation
        }
        _getOverriddenMethods(A, B) {
            let Q = {
                _createStartTagToken() {
                    B._createStartTagToken.call(this), this.currentToken.location = A.ctLoc
                },
                _createEndTagToken() {
                    B._createEndTagToken.call(this), this.currentToken.location = A.ctLoc
                },
                _createCommentToken() {
                    B._createCommentToken.call(this), this.currentToken.location = A.ctLoc
                },
                _createDoctypeToken(Z) {
                    B._createDoctypeToken.call(this, Z), this.currentToken.location = A.ctLoc
                },
                _createCharacterToken(Z, D) {
                    B._createCharacterToken.call(this, Z, D), this.currentCharacterToken.location = A.ctLoc
                },
                _createEOFToken() {
                    B._createEOFToken.call(this), this.currentToken.location = A._getCurrentLocation()
                },
                _createAttr(Z) {
                    B._createAttr.call(this, Z), A.currentAttrLocation = A._getCurrentLocation()
                },
                _leaveAttrName(Z) {
                    B._leaveAttrName.call(this, Z), A._attachCurrentAttrLocationInfo()
                },
                _leaveAttrValue(Z) {
                    B._leaveAttrValue.call(this, Z), A._attachCurrentAttrLocationInfo()
                },
                _emitCurrentToken() {
                    let Z = this.currentToken.location;
                    if (this.currentCharacterToken) this.currentCharacterToken.location.endLine = Z.startLine, this.currentCharacterToken.location.endCol = Z.startCol, this.currentCharacterToken.location.endOffset = Z.startOffset;
                    if (this.currentToken.type === bq0.EOF_TOKEN) Z.endLine = Z.startLine, Z.endCol = Z.startCol, Z.endOffset = Z.startOffset;
                    else Z.endLine = A.posTracker.line, Z.endCol = A.posTracker.col + 1, Z.endOffset = A.posTracker.offset + 1;
                    B._emitCurrentToken.call(this)
                },
                _emitCurrentCharacterToken() {
                    let Z = this.currentCharacterToken && this.currentCharacterToken.location;
                    if (Z && Z.endOffset === -1) Z.endLine = A.posTracker.line, Z.endCol = A.posTracker.col, Z.endOffset = A.posTracker.offset;
                    B._emitCurrentCharacterToken.call(this)
                }
            };
            return Object.keys(bq0.MODE).forEach((Z) => {
                let D = bq0.MODE[Z];
                Q[D] = function(G) {
                    A.ctLoc = A._getCurrentLocation(), B[D].call(this, G)
                }
            }), Q
        }
    }
    rRB.exports = sRB
});
var eRB = E((KF3, tRB) => {
    var q58 = rM();
    class oRB extends q58 {
        constructor(A, B) {
            super(A);
            this.onItemPop = B.onItemPop
        }
        _getOverriddenMethods(A, B) {
            return {
                pop() {
                    A.onItemPop(this.current), B.pop.call(this)
                },
                popAllUpToHtmlElement() {
                    for (let Q = this.stackTop; Q > 0; Q--) A.onItemPop(this.items[Q]);
                    B.popAllUpToHtmlElement.call(this)
                },
                remove(Q) {
                    A.onItemPop(this.current), B.remove.call(this, Q)
                }
            }
        }
    }
    tRB.exports = oRB
});
var ZOB = E((HF3, QOB) => {
    var hq0 = rM(),
        AOB = RG1(),
        N58 = fq0(),
        L58 = eRB(),
        M58 = jv(),
        gq0 = M58.TAG_NAMES;
    class BOB extends hq0 {
        constructor(A) {
            super(A);
            this.parser = A, this.treeAdapter = this.parser.treeAdapter, this.posTracker = null, this.lastStartTagToken = null, this.lastFosterParentingLocation = null, this.currentToken = null
        }
        _setStartLocation(A) {
            let B = null;
            if (this.lastStartTagToken) B = Object.assign({}, this.lastStartTagToken.location), B.startTag = this.lastStartTagToken.location;
            this.treeAdapter.setNodeSourceCodeLocation(A, B)
        }
        _setEndLocation(A, B) {
            let Q = this.treeAdapter.getNodeSourceCodeLocation(A);
            if (Q) {
                if (B.location) {
                    let Z = B.location,
                        D = this.treeAdapter.getTagName(A);
                    if (B.type === AOB.END_TAG_TOKEN && D === B.tagName) Q.endTag = Object.assign({}, Z), Q.endLine = Z.endLine, Q.endCol = Z.endCol, Q.endOffset = Z.endOffset;
                    else Q.endLine = Z.startLine, Q.endCol = Z.startCol, Q.endOffset = Z.startOffset
                }
            }
        }
        _getOverriddenMethods(A, B) {
            return {
                _bootstrap(Q, Z) {
                    B._bootstrap.call(this, Q, Z), A.lastStartTagToken = null, A.lastFosterParentingLocation = null, A.currentToken = null;
                    let D = hq0.install(this.tokenizer, N58);
                    A.posTracker = D.posTracker, hq0.install(this.openElements, L58, {
                        onItemPop: function(G) {
                            A._setEndLocation(G, A.currentToken)
                        }
                    })
                },
                _runParsingLoop(Q) {
                    B._runParsingLoop.call(this, Q);
                    for (let Z = this.openElements.stackTop; Z >= 0; Z--) A._setEndLocation(this.openElements.items[Z], A.currentToken)
                },
                _processTokenInForeignContent(Q) {
                    A.currentToken = Q, B._processTokenInForeignContent.call(this, Q)
                },
                _processToken(Q) {
                    if (A.currentToken = Q, B._processToken.call(this, Q), Q.type === AOB.END_TAG_TOKEN && (Q.tagName === gq0.HTML || Q.tagName === gq0.BODY && this.openElements.hasInScope(gq0.BODY)))
                        for (let D = this.openElements.stackTop; D >= 0; D--) {
                            let G = this.openElements.items[D];
                            if (this.treeAdapter.getTagName(G) === Q.tagName) {
                                A._setEndLocation(G, Q);
                                break
                            }
                        }
                },
                _setDocumentType(Q) {
                    B._setDocumentType.call(this, Q);
                    let Z = this.treeAdapter.getChildNodes(this.document),
                        D = Z.length;
                    for (let G = 0; G < D; G++) {
                        let F = Z[G];
                        if (this.treeAdapter.isDocumentTypeNode(F)) {
                            this.treeAdapter.setNodeSourceCodeLocation(F, Q.location);
                            break
                        }
                    }
                },
                _attachElementToTree(Q) {
                    A._setStartLocation(Q), A.lastStartTagToken = null, B._attachElementToTree.call(this, Q)
                },
                _appendElement(Q, Z) {
                    A.lastStartTagToken = Q, B._appendElement.call(this, Q, Z)
                },
                _insertElement(Q, Z) {
                    A.lastStartTagToken = Q, B._insertElement.call(this, Q, Z)
                },
                _insertTemplate(Q) {
                    A.lastStartTagToken = Q, B._insertTemplate.call(this, Q);
                    let Z = this.treeAdapter.getTemplateContent(this.openElements.current);
                    this.treeAdapter.setNodeSourceCodeLocation(Z, null)
                },
                _insertFakeRootElement() {
                    B._insertFakeRootElement.call(this), this.treeAdapter.setNodeSourceCodeLocation(this.openElements.current, null)
                },
                _appendCommentNode(Q, Z) {
                    B._appendCommentNode.call(this, Q, Z);
                    let D = this.treeAdapter.getChildNodes(Z),
                        G = D[D.length - 1];
                    this.treeAdapter.setNodeSourceCodeLocation(G, Q.location)
                },
                _findFosterParentingLocation() {
                    return A.lastFosterParentingLocation = B._findFosterParentingLocation.call(this), A.lastFosterParentingLocation
                },
                _insertCharacters(Q) {
                    B._insertCharacters.call(this, Q);
                    let Z = this._shouldFosterParentOnInsertion(),
                        D = Z && A.lastFosterParentingLocation.parent || this.openElements.currentTmplContent || this.openElements.current,
                        G = this.treeAdapter.getChildNodes(D),
                        F = Z && A.lastFosterParentingLocation.beforeElement ? G.indexOf(A.lastFosterParentingLocation.beforeElement) - 1 : G.length - 1,
                        I = G[F],
                        Y = this.treeAdapter.getNodeSourceCodeLocation(I);
                    if (Y) Y.endLine = Q.location.endLine, Y.endCol = Q.location.endCol, Y.endOffset = Q.location.endOffset;
                    else this.treeAdapter.setNodeSourceCodeLocation(I, Q.location)
                }
            }
        }
    }
    QOB.exports = BOB
});
var gv1 = E((zF3, GOB) => {
    var R58 = rM();
    class DOB extends R58 {
        constructor(A, B) {
            super(A);
            this.posTracker = null, this.onParseError = B.onParseError
        }
        _setErrorLocation(A) {
            A.startLine = A.endLine = this.posTracker.line, A.startCol = A.endCol = this.posTracker.col, A.startOffset = A.endOffset = this.posTracker.offset
        }
        _reportError(A) {
            let B = {
                code: A,
                startLine: -1,
                startCol: -1,
                startOffset: -1,
                endLine: -1,
                endCol: -1,
                endOffset: -1
            };
            this._setErrorLocation(B), this.onParseError(B)
        }
        _getOverriddenMethods(A) {
            return {
                _err(B) {
                    A._reportError(B)
                }
            }
        }
    }
    GOB.exports = DOB
});
var YOB = E((EF3, IOB) => {
    var O58 = gv1(),
        T58 = vq0(),
        P58 = rM();
    class FOB extends O58 {
        constructor(A, B) {
            super(A, B);
            this.posTracker = P58.install(A, T58), this.lastErrOffset = -1
        }
        _reportError(A) {
            if (this.lastErrOffset !== this.posTracker.offset) this.lastErrOffset = this.posTracker.offset, super._reportError(A)
        }
    }
    IOB.exports = FOB
});
var XOB = E((UF3, JOB) => {
    var S58 = gv1(),
        j58 = YOB(),
        k58 = rM();
    class WOB extends S58 {
        constructor(A, B) {
            super(A, B);
            let Q = k58.install(A.preprocessor, j58, B);
            this.posTracker = Q.posTracker
        }
    }
    JOB.exports = WOB
});
var HOB = E((wF3, KOB) => {
    var y58 = gv1(),
        _58 = XOB(),
        x58 = fq0(),
        VOB = rM();
    class COB extends y58 {
        constructor(A, B) {
            super(A, B);
            this.opts = B, this.ctLoc = null, this.locBeforeToken = !1
        }
        _setErrorLocation(A) {
            if (this.ctLoc) A.startLine = this.ctLoc.startLine, A.startCol = this.ctLoc.startCol, A.startOffset = this.ctLoc.startOffset, A.endLine = this.locBeforeToken ? this.ctLoc.startLine : this.ctLoc.endLine, A.endCol = this.locBeforeToken ? this.ctLoc.startCol : this.ctLoc.endCol, A.endOffset = this.locBeforeToken ? this.ctLoc.startOffset : this.ctLoc.endOffset
        }
        _getOverriddenMethods(A, B) {
            return {
                _bootstrap(Q, Z) {
                    B._bootstrap.call(this, Q, Z), VOB.install(this.tokenizer, _58, A.opts), VOB.install(this.tokenizer, x58)
                },
                _processInputToken(Q) {
                    A.ctLoc = Q.location, B._processInputToken.call(this, Q)
                },
                _err(Q, Z) {
                    A.locBeforeToken = Z && Z.beforeToken, A._reportError(Q)
                }
            }
        }
    }
    KOB.exports = COB
});
var uq0 = E((f58) => {
    var {
        DOCUMENT_MODE: v58
    } = jv();
    f58.createDocument = function() {
        return {
            nodeName: "#document",
            mode: v58.NO_QUIRKS,
            childNodes: []
        }
    };
    f58.createDocumentFragment = function() {
        return {
            nodeName: "#document-fragment",
            childNodes: []
        }
    };
    f58.createElement = function(A, B, Q) {
        return {
            nodeName: A,
            tagName: A,
            attrs: Q,
            namespaceURI: B,
            childNodes: [],
            parentNode: null
        }
    };
    f58.createCommentNode = function(A) {
        return {
            nodeName: "#comment",
            data: A,
            parentNode: null
        }
    };
    var zOB = function(A) {
            return {
                nodeName: "#text",
                value: A,
                parentNode: null
            }
        },
        EOB = f58.appendChild = function(A, B) {
            A.childNodes.push(B), B.parentNode = A
        },
        b58 = f58.insertBefore = function(A, B, Q) {
            let Z = A.childNodes.indexOf(Q);
            A.childNodes.splice(Z, 0, B), B.parentNode = A
        };
    f58.setTemplateContent = function(A, B) {
        A.content = B
    };
    f58.getTemplateContent = function(A) {
        return A.content
    };
    f58.setDocumentType = function(A, B, Q, Z) {
        let D = null;
        for (let G = 0; G < A.childNodes.length; G++)
            if (A.childNodes[G].nodeName === "#documentType") {
                D = A.childNodes[G];
                break
            } if (D) D.name = B, D.publicId = Q, D.systemId = Z;
        else EOB(A, {
            nodeName: "#documentType",
            name: B,
            publicId: Q,
            systemId: Z
        })
    };
    f58.setDocumentMode = function(A, B) {
        A.mode = B
    };
    f58.getDocumentMode = function(A) {
        return A.mode
    };
    f58.detachNode = function(A) {
        if (A.parentNode) {
            let B = A.parentNode.childNodes.indexOf(A);
            A.parentNode.childNodes.splice(B, 1), A.parentNode = null
        }
    };
    f58.insertText = function(A, B) {
        if (A.childNodes.length) {
            let Q = A.childNodes[A.childNodes.length - 1];
            if (Q.nodeName === "#text") {
                Q.value += B;
                return
            }
        }
        EOB(A, zOB(B))
    };
    f58.insertTextBefore = function(A, B, Q) {
        let Z = A.childNodes[A.childNodes.indexOf(Q) - 1];
        if (Z && Z.nodeName === "#text") Z.value += B;
        else b58(A, zOB(B), Q)
    };
    f58.adoptAttributes = function(A, B) {
        let Q = [];
        for (let Z = 0; Z < A.attrs.length; Z++) Q.push(A.attrs[Z].name);
        for (let Z = 0; Z < B.length; Z++)
            if (Q.indexOf(B[Z].name) === -1) A.attrs.push(B[Z])
    };
    f58.getFirstChild = function(A) {
        return A.childNodes[0]
    };
    f58.getChildNodes = function(A) {
        return A.childNodes
    };
    f58.getParentNode = function(A) {
        return A.parentNode
    };
    f58.getAttrList = function(A) {
        return A.attrs
    };
    f58.getTagName = function(A) {
        return A.tagName
    };
    f58.getNamespaceURI = function(A) {
        return A.namespaceURI
    };
    f58.getTextNodeContent = function(A) {
        return A.value
    };
    f58.getCommentNodeContent = function(A) {
        return A.data
    };
    f58.getDocumentTypeNodeName = function(A) {
        return A.name
    };
    f58.getDocumentTypeNodePublicId = function(A) {
        return A.publicId
    };
    f58.getDocumentTypeNodeSystemId = function(A) {
        return A.systemId
    };
    f58.isTextNode = function(A) {
        return A.nodeName === "#text"
    };
    f58.isCommentNode = function(A) {
        return A.nodeName === "#comment"
    };
    f58.isDocumentTypeNode = function(A) {
        return A.nodeName === "#documentType"
    };
    f58.isElementNode = function(A) {
        return !!A.tagName
    };
    f58.setNodeSourceCodeLocation = function(A, B) {
        A.sourceCodeLocation = B
    };
    f58.getNodeSourceCodeLocation = function(A) {
        return A.sourceCodeLocation
    }
});
var mq0 = E((LF3, UOB) => {
    UOB.exports = function A(B, Q) {
        return Q = Q || Object.create(null), [B, Q].reduce((Z, D) => {
            return Object.keys(D).forEach((G) => {
                Z[G] = D[G]
            }), Z
        }, Object.create(null))
    }
});